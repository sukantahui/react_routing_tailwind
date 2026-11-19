import React, { useState, useId, useMemo } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import labCode from "./topic22_files/worked_example_2_handling_missing_salary_values_lab.py?raw";
import noteText from "./topic22_files/topic22_note.txt?raw";
import questions from "./topic22_files/topic22_questions.js";

// =============================================================================
// DATASET DEFINITIONS & MATHEMATICAL UTILITIES
// =============================================================================

const GROUND_TRUTH_COHORT = [
  { id: "WB-IT-01", name: "Susmita", role: "SE", exp: 2.0, deg: 1, degName: "B.Tech", trueSal: 6.5, isMissing: false, mech: "Observed" },
  { id: "WB-IT-02", name: "Debangshu", role: "Lead", exp: 9.5, deg: 3, degName: "M.Tech", trueSal: 26.0, isMissing: false, mech: "Observed" },
  { id: "WB-IT-03", name: "Mahima", role: "SE", exp: 1.5, deg: 0, degName: "BCA", trueSal: 5.2, isMissing: true, mech: "MCAR (Form Drop)" },
  { id: "WB-IT-04", name: "Mamata", role: "SSE", exp: 5.0, deg: 2, degName: "MCA", trueSal: 14.5, isMissing: false, mech: "Observed" },
  { id: "WB-IT-05", name: "Abhronila", role: "EM", exp: 12.0, deg: 3, degName: "M.Tech", trueSal: 38.0, isMissing: false, mech: "Observed" },
  { id: "WB-IT-06", name: "Rohan", role: "SE", exp: 3.0, deg: 1, degName: "B.Tech", trueSal: 7.8, isMissing: false, mech: "Observed" },
  { id: "WB-IT-07", name: "Priyanka", role: "SSE", exp: 6.0, deg: 1, degName: "B.Tech", trueSal: 16.0, isMissing: true, mech: "MAR (Role Policy)" },
  { id: "WB-IT-08", name: "Sourav", role: "Lead", exp: 10.0, deg: 2, degName: "MCA", trueSal: 28.5, isMissing: false, mech: "Observed" },
  { id: "WB-IT-09", name: "Tanmoy", role: "SE", exp: 2.5, deg: 0, degName: "BCA", trueSal: 6.0, isMissing: false, mech: "Observed" },
  { id: "WB-IT-10", name: "Ananya", role: "SSE", exp: 4.5, deg: 2, degName: "MCA", trueSal: 13.8, isMissing: false, mech: "Observed" },
  { id: "WB-IT-11", name: "Subhajit", role: "EM", exp: 14.0, deg: 2, degName: "MCA", trueSal: 42.0, isMissing: true, mech: "MNAR (High Earner Non-Disclosure)" },
  { id: "WB-IT-12", name: "Kallol", role: "SSE", exp: 5.5, deg: 1, degName: "B.Tech", trueSal: 15.2, isMissing: false, mech: "Observed" },
];

function calculateStats(arr) {
  if (!arr || arr.length === 0) return { mean: 0, std: 0, median: 0 };
  const sorted = [...arr].sort((a, b) => a - b);
  const n = sorted.length;
  const mean = sorted.reduce((acc, v) => acc + v, 0) / n;
  const variance = n > 1 ? sorted.reduce((acc, v) => acc + (v - mean) ** 2, 0) / (n - 1) : 0;
  const std = Math.sqrt(variance);
  const mid = Math.floor(n / 2);
  const median = n % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  return { mean, std, median };
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

const Topic22 = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const svgId = useId();

  // Studio Mode: "mechanisms" | "benchmark" | "knn"
  const [studioMode, setStudioMode] = useState("mechanisms");

  // Mode A: Rubin's Mechanism Inspector
  const [selectedMechTab, setSelectedMechTab] = useState("all"); // "all" | "MCAR" | "MAR" | "MNAR"
  const [inspectDropna, setInspectDropna] = useState(false);

  // Mode B: Imputation Engine Benchmark
  const [imputationEngine, setImputationEngine] = useState("stratified_median");
  // options: "listwise", "global_mean", "global_median", "stratified_median", "stochastic_reg"

  // Mode C: KNN Distance Playground
  const [knnCandidateId, setKnnCandidateId] = useState("WB-IT-03"); // Mahima, Priyanka, or Subhajit
  const [knnK, setKnnK] = useState(2);
  const [knnDistanceWeighted, setKnnDistanceWeighted] = useState(true);

  // Novice Jargon Search Filter
  const [jargonQuery, setJargonQuery] = useState("");

  // Diagnostic Quiz State
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Resource Tab: "lab" | "notes" | "questions" | "author"
  const [resourceTab, setResourceTab] = useState("lab");

  // Ground Truth Baseline Statistics
  const groundTruthStats = useMemo(() => {
    return calculateStats(GROUND_TRUTH_COHORT.map(d => d.trueSal));
  }, []);

  // Observed Statistics (Listwise Deletion baseline)
  const observedStats = useMemo(() => {
    const obs = GROUND_TRUTH_COHORT.filter(d => !d.isMissing).map(d => d.trueSal);
    return calculateStats(obs);
  }, []);

  // Role Medians on Observed Records
  const roleMedians = useMemo(() => {
    const map = {};
    ["SE", "SSE", "Lead", "EM"].forEach(role => {
      const vals = GROUND_TRUTH_COHORT.filter(d => !d.isMissing && d.role === role).map(d => d.trueSal);
      map[role] = calculateStats(vals).median;
    });
    return map;
  }, []);

  // Computed Values under Selected Benchmark Engine
  const benchmarkResults = useMemo(() => {
    const meanObs = observedStats.mean;
    const medianObs = observedStats.median;

    // Linear regression on observed: Salary = beta0 + beta1 * exp
    const obsPairs = GROUND_TRUTH_COHORT.filter(d => !d.isMissing);
    const meanExp = obsPairs.reduce((acc, d) => acc + d.exp, 0) / obsPairs.length;
    const cov = obsPairs.reduce((acc, d) => acc + (d.exp - meanExp) * (d.trueSal - meanObs), 0);
    const varExp = obsPairs.reduce((acc, d) => acc + (d.exp - meanExp) ** 2, 0);
    const beta1 = varExp > 0 ? cov / varExp : 0;
    const beta0 = meanObs - beta1 * meanExp;

    let processedCohort = [];
    if (imputationEngine === "listwise") {
      processedCohort = GROUND_TRUTH_COHORT.filter(d => !d.isMissing).map(d => ({
        ...d,
        imputedSal: d.trueSal,
        absError: 0
      }));
    } else {
      processedCohort = GROUND_TRUTH_COHORT.map(d => {
        let imp = d.trueSal;
        if (d.isMissing) {
          if (imputationEngine === "global_mean") {
            imp = meanObs;
          } else if (imputationEngine === "global_median") {
            imp = medianObs;
          } else if (imputationEngine === "stratified_median") {
            imp = roleMedians[d.role] || medianObs;
          } else if (imputationEngine === "stochastic_reg") {
            // deterministic trend + small synthetic noise draw
            const noise = d.id === "WB-IT-03" ? 0.35 : d.id === "WB-IT-07" ? -0.45 : 0.85;
            imp = Math.max(2.4, beta0 + beta1 * d.exp + noise);
          }
        }
        return {
          ...d,
          imputedSal: imp,
          absError: d.isMissing ? Math.abs(imp - d.trueSal) : 0
        };
      });
    }

    const salArr = processedCohort.map(d => d.imputedSal);
    const stats = calculateStats(salArr);

    const missingRows = processedCohort.filter(d => d.isMissing);
    const mae = missingRows.length > 0
      ? missingRows.reduce((acc, d) => acc + d.absError, 0) / missingRows.length
      : 0;
    const rmse = missingRows.length > 0
      ? Math.sqrt(missingRows.reduce((acc, d) => acc + (d.absError) ** 2, 0) / missingRows.length)
      : 0;

    const variancePreservationRatio = (stats.std / groundTruthStats.std) * 100;

    return {
      cohort: processedCohort,
      stats,
      mae,
      rmse,
      variancePreservationRatio
    };
  }, [imputationEngine, observedStats, groundTruthStats, roleMedians]);

  // KNN Calculation for Selected Query Record
  const knnComputation = useMemo(() => {
    const query = GROUND_TRUTH_COHORT.find(d => d.id === knnCandidateId) || GROUND_TRUTH_COHORT[2];
    const donors = GROUND_TRUTH_COHORT.filter(d => !d.isMissing);

    // Scaling bounds (Exp: 1.5 - 14.0, Degree Rank: 0 - 3)
    const minExp = 1.5, maxExp = 14.0;
    const minDeg = 0, maxDeg = 3;

    const queryNormExp = (query.exp - minExp) / (maxExp - minExp);
    const queryNormDeg = (query.deg - minDeg) / (maxDeg - minDeg);

    const donorsWithDist = donors.map(d => {
      const dNormExp = (d.exp - minExp) / (maxExp - minExp);
      const dNormDeg = (d.deg - minDeg) / (maxDeg - minDeg);
      const dist = Math.sqrt((queryNormExp - dNormExp) ** 2 + (queryNormDeg - dNormDeg) ** 2);
      return {
        ...d,
        normExp: dNormExp,
        normDeg: dNormDeg,
        distance: dist,
        weightRaw: 1.0 / (dist + 0.0001)
      };
    });

    donorsWithDist.sort((a, b) => a.distance - b.distance);
    const kNeighbors = donorsWithDist.slice(0, knnK);

    let imputedSalary = 0;
    if (knnDistanceWeighted) {
      const sumWeights = kNeighbors.reduce((acc, n) => acc + n.weightRaw, 0);
      kNeighbors.forEach(n => {
        n.normWeight = n.weightRaw / sumWeights;
      });
      imputedSalary = kNeighbors.reduce((acc, n) => acc + n.normWeight * n.trueSal, 0);
    } else {
      kNeighbors.forEach(n => {
        n.normWeight = 1.0 / knnK;
      });
      imputedSalary = kNeighbors.reduce((acc, n) => acc + n.trueSal, 0) / knnK;
    }

    return {
      query,
      kNeighbors,
      imputedSalary,
      absError: Math.abs(imputedSalary - query.trueSal)
    };
  }, [knnCandidateId, knnK, knnDistanceWeighted]);

  // Jargon Glossary
  const jargonTerms = [
    {
      term: "MCAR (Missing Completely at Random)",
      def: "Missingness is pure random noise; independent of observed attributes and the salary itself (e.g., lost form). Listwise deletion is unbiased but loses statistical power.",
      badge: "Rubin Taxonomy"
    },
    {
      term: "MAR (Missing at Random)",
      def: "Missingness depends systematically on observed covariates (e.g., role or experience) but not on the unobserved salary once conditioned.",
      badge: "Rubin Taxonomy"
    },
    {
      term: "MNAR (Missing Not at Random)",
      def: "Missingness is non-ignorable: the probability of withholding depends directly on salary size (e.g., CXOs earning > ₹40 LPA refusing to state CTC).",
      badge: "Rubin Taxonomy"
    },
    {
      term: "Variance Deflation Pathology",
      def: "Imputing a constant central tendency (mean or median) collapses the variance by ~ (1 - f), artificially tightening confidence intervals and inducing Type I errors.",
      badge: "Mathematical Hazard"
    },
    {
      term: "Stochastic Noise Draw",
      def: "Injecting an error term ε ~ N(0, σ̂_e^2) into regression imputation to recreate realistic population dispersion and avoid artificial line-fitting.",
      badge: "MICE Core"
    },
    {
      term: "Missingness Indicator Mask",
      def: "An auxiliary binary column (I_salary_is_missing ∈ {0, 1}) that allows models to capture behavioral non-disclosure signals during downstream inference.",
      badge: "Feature Engineering"
    },
    {
      term: "Fit-Before-Split Leakage",
      def: "The critical antipattern of calculating imputer parameters across the entire dataset before train/test splitting, leaking evaluation labels into training.",
      badge: "Production Crime"
    },
    {
      term: "Hierarchical Fallback Cascade",
      def: "A production defense against cold-starts: falling back from Role+Experience median down to Department median, and finally to Global median.",
      badge: "Architecture"
    }
  ];

  const filteredJargon = jargonTerms.filter(j =>
    j.term.toLowerCase().includes(jargonQuery.toLowerCase()) ||
    j.def.toLowerCase().includes(jargonQuery.toLowerCase()) ||
    j.badge.toLowerCase().includes(jargonQuery.toLowerCase())
  );

  // Diagnostic Quiz Data
  const quizQuestions = [
    {
      id: "q1",
      scenario: "In an IT employee survey in Salt Lake Sector V, Senior Engineering Managers (> ₹35 LPA) consistently refuse to disclose their exact annual compensation.",
      prompt: "Under Rubin's taxonomy, which missing data mechanism governs this behavior?",
      options: [
        { key: "A", text: "Missing Completely at Random (MCAR) because anyone can choose not to answer." },
        { key: "B", text: "Missing at Random (MAR) conditioned purely on their years of experience." },
        { key: "C", text: "Missing Not at Random (MNAR) because missingness is driven by the salary magnitude itself." },
        { key: "D", text: "Deterministic Randomness (DR) which can be solved by simple listwise deletion." }
      ],
      correct: "C",
      explanation: "Because non-disclosure is triggered directly by high compensation (the unobserved variable itself), this is classic non-ignorable Missing Not at Random (MNAR). Listwise deletion will truncate the upper tail and severely bias estimates."
    },
    {
      id: "q2",
      scenario: "A data engineer imputes 25% missing salary records using the global arithmetic mean (f = 0.25).",
      prompt: "What happens to the sample variance of the completed dataset compared to the true population variance?",
      options: [
        { key: "A", text: "The variance remains mathematically identical because the mean is an unbiased estimator." },
        { key: "B", text: "The variance shrinks by approximately 25% [(1 - f) * S^2_obs], causing artificially narrow confidence intervals." },
        { key: "C", text: "The variance expands by 25% due to the introduction of synthetic data points." },
        { key: "D", text: "The variance drops to exactly 0." }
      ],
      correct: "B",
      explanation: "Because every imputed record has a deviation of (y_imp - y_bar) = 0, the numerator of sample variance does not increase while the denominator grows from N_obs to N, deflating variance by approximately (1 - f) = 75% of original."
    },
    {
      id: "q3",
      scenario: "You are building a loan underwriting model. An applicant's salary is missing, and you use Distance-Weighted KNN with features [Experience (years), Degree Rank (0-3)].",
      prompt: "Why must these features be scaled using MinMaxScaler prior to Euclidean distance calculation?",
      options: [
        { key: "A", text: "Because Scikit-Learn throws an immediate runtime exception if integer features are passed." },
        { key: "B", text: "Because without normalization, features with wider numerical ranges dominate distance calculations, ignoring smaller-scale features." },
        { key: "C", text: "Scaling converts all categorical features into one-hot binary flags automatically." },
        { key: "D", text: "Normalization prevents KNN from choosing more than 1 neighbor." }
      ],
      correct: "B",
      explanation: "Euclidean distance computes squared differences. If one feature has range [0, 15] and another [0, 3], unscaled Euclidean distance weights the first feature 5x more heavily, distorting neighbor selection."
    },
    {
      id: "q4",
      scenario: "During model development, an intern executes `imputer.fit(df['salary'])` on the entire dataframe of 50,000 rows, and then splits into train and test sets.",
      prompt: "What critical production violation has occurred?",
      options: [
        { key: "A", text: "None, fitting on the entire dataset provides the most statistically robust parameters." },
        { key: "B", text: "Data Leakage: Test-set salary distribution information has bled into training features, producing over-optimistic offline metrics." },
        { key: "C", text: "Underfitting: The imputer will default to zeroes on test rows." },
        { key: "D", text: "Collinearity explosion: The matrix determinant becomes singular." }
      ],
      correct: "B",
      explanation: "Fitting imputer statistics on test rows before splitting is classic 'Fit-Before-Split' data leakage. Imputers must only be fitted on X_train and used to transform X_test."
    },
    {
      id: "q5",
      scenario: "A linear regression imputer predicts a salary of -₹1.4 LPA for an intern with 0.2 years of experience who received a negative residual shock.",
      prompt: "What architectural safeguard must be implemented in the preprocessing pipeline?",
      options: [
        { key: "A", text: "Hard domain clamping: y_safe = max(statutory_minimum_wage, y_pred) or modeling in log-salary space." },
        { key: "B", text: "Convert the negative value into an absolute positive value using abs()." },
        { key: "C", text: "Drop the intern's row from the database permanently." },
        { key: "D", text: "Add 100 LPA to all predictions uniformly." }
      ],
      correct: "A",
      explanation: "Linear models and Gaussian noise draws have unbounded support (-inf, +inf). In production pipelines, domain validity guards must clamp predictions to a realistic floor (e.g., West Bengal statutory baseline) or operate in log-transformed space: exp(log_sal)."
    }
  ];

  const handleQuizSelect = (qId, optionKey) => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({ ...prev, [qId]: optionKey }));
  };

  const quizScore = useMemo(() => {
    let score = 0;
    quizQuestions.forEach(q => {
      if (quizAnswers[q.id] === q.correct) score++;
    });
    return score;
  }, [quizAnswers]);

  return (
    <div className="space-y-12 text-slate-200 leading-relaxed max-w-6xl mx-auto pb-16">
      {/* =====================================================================
          HERO SECTION & 9-SECTION JUMP NAVIGATION
      ===================================================================== */}
      <header className="relative bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 sm:p-10 rounded-3xl border border-indigo-800/40 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              BCAC701B • Data Types and Preprocessing • Topic 22
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Masterclass Standard
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Rubin's Taxonomy & Imputation
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Worked Example 2: Handling Missing Salary Values
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl">
            Explore the mathematics, empirical hazards, and engineering mechanics of handling missing continuous compensation data. Contrast Rubin's missingness taxonomy (MCAR vs MAR vs MNAR), mathematically dissect variance deflation, and benchmark 5 industrial imputation engines on Salt Lake Sector V IT cohorts.
          </p>

          {/* Quick Jump Navigation Bar */}
          <div className="pt-4 border-t border-indigo-800/40">
            <p className="text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-2">
              Fast-Travel Navigation (9 Core Sections)
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                { id: "novice", label: "1. Novice Masterclass" },
                { id: "studio", label: "2. Interactive Studio" },
                { id: "math", label: "3. Mathematical Proofs" },
                { id: "cases", label: "4. Regional Case Studies" },
                { id: "quiz", label: "5. Diagnostic Assessment" },
                { id: "pitfalls", label: "6. Production Pitfalls" },
                { id: "resources", label: "7. Laboratory & Resources" },
              ].map(sec => (
                <button
                  key={sec.id}
                  onClick={() => {
                    const el = document.getElementById(sec.id);
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                    setActiveSection(sec.id);
                  }}
                  className={clsx(
                    "px-3 py-1.5 text-xs font-medium rounded-lg transition-all",
                    activeSection === sec.id
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                      : "bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border border-slate-700/60"
                  )}
                >
                  {sec.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* =====================================================================
          SECTION 1: NOVICE MASTERCLASS & MENTAL MODELS
      ===================================================================== */}
      <section id="novice" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-500/20 rounded-xl border border-indigo-500/30 text-indigo-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              1. Novice Masterclass & Mental Models
            </h2>
            <p className="text-sm text-slate-400">
              Intuitive analogies, Rubin's missingness taxonomy, and foundational jargon
            </p>
          </div>
        </div>

        {/* 3 Intuitive Real-World Metaphors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 hover:border-indigo-500/40 transition-all shadow-lg space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg">
              1
            </div>
            <h3 className="text-base font-bold text-white">The Coffee-Stained Sheet (MCAR)</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Imagine a cup of Darjeeling tea accidentally spills over an HR intern's desk, obscuring three random salary fields. The blotches do not care whether someone earns ₹4 LPA or ₹40 LPA. The missingness is pure random luck. Discarding them wastes paper, but the visible sheets remain completely unbiased.
            </p>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 hover:border-indigo-500/40 transition-all shadow-lg space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-lg">
              2
            </div>
            <h3 className="text-base font-bold text-white">The Standardized Policy (MAR)</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Junior campus recruits from MAKAUT colleges leave the salary box blank because everyone knows campus hires join on a standard ₹4.5 LPA grade. Knowing their Job Role ("Campus Hire") completely explains why the box is empty. Once you look up the role, the missingness becomes completely ignorable.
            </p>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 hover:border-indigo-500/40 transition-all shadow-lg space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-lg">
              3
            </div>
            <h3 className="text-base font-bold text-white">The High-Earner Vault (MNAR)</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              A FinTech executive earning ₹45 LPA deliberately hides their CTC on an unsecured loan app fearing tax scrutiny and aggressive sales calls. Here, the very reason the field is missing is because the number is huge! Dropping missing rows erases your richest users, blinding your model to senior wealth.
            </p>
          </div>
        </div>

        {/* Rubin's Taxonomy Visual Matrix */}
        <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-pulse" />
            Rubin's Missingness Taxonomy Matrix (At a Glance)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                  <th className="py-2.5 px-3">Mechanism</th>
                  <th className="py-2.5 px-3">Rubin Formal Probability</th>
                  <th className="py-2.5 px-3">Salt Lake Sector V Example</th>
                  <th className="py-2.5 px-3">Listwise Deletion Risk</th>
                  <th className="py-2.5 px-3">Optimal Imputation Strategy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-3 font-semibold text-amber-300">MCAR</td>
                  <td className="py-2.5 px-3 font-mono text-[11px] text-amber-200">P(M | Y_obs, Y_mis) = P(M)</td>
                  <td className="py-2.5 px-3">Mahima (SE): Accidental form submission drop</td>
                  <td className="py-2.5 px-3 text-emerald-400">Low (Unbiased, power loss only)</td>
                  <td className="py-2.5 px-3">Median / KNN / Group Median</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-3 font-semibold text-cyan-300">MAR</td>
                  <td className="py-2.5 px-3 font-mono text-[11px] text-cyan-200">P(M | Y_obs, Y_mis) = P(M | Y_obs)</td>
                  <td className="py-2.5 px-3">Priyanka (SSE): Non-disclosure conditioned on Senior grade</td>
                  <td className="py-2.5 px-3 text-amber-400">Medium (Selection bias across roles)</td>
                  <td className="py-2.5 px-3">Stratified Group Median / MICE</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-3 font-semibold text-rose-300">MNAR</td>
                  <td className="py-2.5 px-3 font-mono text-[11px] text-rose-200">P(M | Y_obs, Y_mis) ≠ P(M | Y_obs)</td>
                  <td className="py-2.5 px-3">Subhajit (EM): Active non-disclosure (&gt; ₹40 LPA)</td>
                  <td className="py-2.5 px-3 text-rose-400">Severe (Crushes upper tail, survivor bias)</td>
                  <td className="py-2.5 px-3">Missingness Indicator + Stochastic MICE</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Interactive Jargon Buster with Live Search */}
        <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              Machine Learning Jargon Buster
            </h3>
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search definitions (e.g., MAR, leakage, MICE)..."
                value={jargonQuery}
                onChange={e => setJargonQuery(e.target.value)}
                className="w-full bg-slate-800/80 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              />
              {jargonQuery && (
                <button
                  onClick={() => setJargonQuery("")}
                  className="absolute right-2 top-1.5 text-xs text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredJargon.map((item, idx) => (
              <div key={idx} className="bg-slate-800/40 p-3.5 rounded-xl border border-slate-800/80 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-indigo-300">{item.term}</h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-700/60 text-slate-300">
                    {item.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-normal">{item.def}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 2: INTERACTIVE LABORATORY STUDIO (3 DYNAMIC MODES)
      ===================================================================== */}
      <section id="studio" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-cyan-500/20 rounded-xl border border-cyan-500/30 text-cyan-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              2. Interactive Laboratory Studio
            </h2>
            <p className="text-sm text-slate-400">
              Manipulate missingness mechanisms, benchmark 5 imputation engines, and trace KNN neighbor weighting live
            </p>
          </div>
        </div>

        {/* Studio Mode Switcher */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-slate-900/90 rounded-2xl border border-slate-800">
          {[
            { id: "mechanisms", label: "Mode A: Rubin's Mechanism Inspector" },
            { id: "benchmark", label: "Mode B: 5 Imputation Engines Benchmark" },
            { id: "knn", label: "Mode C: KNN Distance-Weighted Playground" }
          ].map(m => (
            <button
              key={m.id}
              onClick={() => setStudioMode(m.id)}
              className={clsx(
                "flex-1 min-w-[200px] py-2.5 px-4 rounded-xl text-xs font-bold transition-all",
                studioMode === m.id
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 border border-indigo-400/40"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              )}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* MODE A: RUBIN'S MECHANISM INSPECTOR */}
        {studioMode === "mechanisms" && (
          <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white">
                  Salt Lake Sector V IT Cohort: Mechanism Audit
                </h3>
                <p className="text-xs text-slate-400">
                  Inspect the 12 engineering candidates, their missingness labels, and the impact of listwise deletion.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setInspectDropna(!inspectDropna)}
                  className={clsx(
                    "px-3.5 py-1.5 text-xs font-bold rounded-lg border transition-all flex items-center gap-1.5",
                    inspectDropna
                      ? "bg-rose-600/30 text-rose-300 border-rose-500/50 shadow-md shadow-rose-900/30"
                      : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
                  )}
                >
                  <span className={clsx("w-2 h-2 rounded-full", inspectDropna ? "bg-rose-400" : "bg-slate-400")} />
                  {inspectDropna ? "Simulating Listwise Deletion (dropna)" : "View Complete Cohort"}
                </button>
              </div>
            </div>

            {/* Filter Mechanism Buttons */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: "all", label: "All 12 Engineers" },
                { id: "MCAR", label: "Filter: MCAR (Mahima)" },
                { id: "MAR", label: "Filter: MAR (Priyanka)" },
                { id: "MNAR", label: "Filter: MNAR (Subhajit)" }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setSelectedMechTab(f.id)}
                  className={clsx(
                    "px-3 py-1 text-xs font-medium rounded-lg transition-all",
                    selectedMechTab === f.id
                      ? "bg-indigo-500/30 text-indigo-200 border border-indigo-400/50"
                      : "bg-slate-800/60 text-slate-400 border border-slate-700/60 hover:text-slate-200"
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Population Statistics Comparison Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-800/50 p-3.5 rounded-xl border border-slate-700/60">
                <p className="text-[11px] text-slate-400 uppercase font-semibold">Ground Truth Mean</p>
                <p className="text-lg font-bold text-emerald-400">₹{groundTruthStats.mean.toFixed(2)} LPA</p>
                <p className="text-[10px] text-slate-400">All 12 IT Professionals</p>
              </div>
              <div className="bg-slate-800/50 p-3.5 rounded-xl border border-slate-700/60">
                <p className="text-[11px] text-slate-400 uppercase font-semibold">Observed Mean (Dropna)</p>
                <p className="text-lg font-bold text-amber-400">₹{observedStats.mean.toFixed(2)} LPA</p>
                <p className="text-[10px] text-rose-300">
                  Δ = {(observedStats.mean - groundTruthStats.mean).toFixed(2)} LPA (Deflated!)
                </p>
              </div>
              <div className="bg-slate-800/50 p-3.5 rounded-xl border border-slate-700/60">
                <p className="text-[11px] text-slate-400 uppercase font-semibold">Ground Truth Std Dev</p>
                <p className="text-lg font-bold text-emerald-400">₹{groundTruthStats.std.toFixed(2)} LPA</p>
                <p className="text-[10px] text-slate-400">Natural dispersion</p>
              </div>
              <div className="bg-slate-800/50 p-3.5 rounded-xl border border-slate-700/60">
                <p className="text-[11px] text-slate-400 uppercase font-semibold">Observed Std Dev</p>
                <p className="text-lg font-bold text-cyan-400">₹{observedStats.std.toFixed(2)} LPA</p>
                <p className="text-[10px] text-slate-400">Variance shrunken by 18%</p>
              </div>
            </div>

            {/* Interactive Grid of Candidates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {GROUND_TRUTH_COHORT.filter(c => {
                if (inspectDropna && c.isMissing) return false;
                if (selectedMechTab === "MCAR") return c.mech.includes("MCAR");
                if (selectedMechTab === "MAR") return c.mech.includes("MAR");
                if (selectedMechTab === "MNAR") return c.mech.includes("MNAR");
                return true;
              }).map(c => (
                <div
                  key={c.id}
                  className={clsx(
                    "p-3.5 rounded-xl border transition-all space-y-2 relative",
                    c.isMissing
                      ? "bg-rose-950/20 border-rose-500/40 shadow-sm"
                      : "bg-slate-800/40 border-slate-700/60 hover:border-slate-600"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-400">{c.id}</span>
                    <span
                      className={clsx(
                        "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase",
                        c.role === "SE" && "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30",
                        c.role === "SSE" && "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30",
                        c.role === "Lead" && "bg-amber-500/20 text-amber-300 border border-amber-500/30",
                        c.role === "EM" && "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                      )}
                    >
                      {c.role}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-white">{c.name}</h4>
                    <p className="text-xs text-slate-400">
                      {c.exp} yrs exp • {c.degName}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-700/50 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Salary:</span>
                    {c.isMissing ? (
                      <span className="font-mono font-bold text-rose-400">NaN (Missing)</span>
                    ) : (
                      <span className="font-mono font-bold text-emerald-300">₹{c.trueSal.toFixed(1)} LPA</span>
                    )}
                  </div>

                  {c.isMissing && (
                    <div className="p-1.5 rounded bg-rose-900/40 border border-rose-700/40 text-[10px] text-rose-200">
                      <strong>{c.mech}</strong>
                      <p className="text-[9px] text-rose-300/80">True: ₹{c.trueSal.toFixed(1)} LPA</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODE B: 5 IMPUTATION ENGINES BENCHMARK STUDIO */}
        {studioMode === "benchmark" && (
          <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white">
                  5 Imputation Engines Benchmark Studio
                </h3>
                <p className="text-xs text-slate-400">
                  Select an imputation algorithm and observe how MAE, RMSE, and population variance preservation change in real time.
                </p>
              </div>

              {/* Engine Selector */}
              <select
                value={imputationEngine}
                onChange={e => setImputationEngine(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="listwise">1. Listwise Deletion (dropna)</option>
                <option value="global_mean">2. Global Mean Imputation (₹17.37 LPA)</option>
                <option value="global_median">3. Global Median Imputation (₹14.50 LPA)</option>
                <option value="stratified_median">4. Stratified Group Median (By Role)</option>
                <option value="stochastic_reg">5. Stochastic Regression (MICE Residual Draw)</option>
              </select>
            </div>

            {/* Performance KPI Tiles */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60 space-y-1">
                <p className="text-[11px] text-slate-400 uppercase font-semibold">Mean Absolute Error (MAE)</p>
                <p className="text-xl font-bold text-cyan-400">
                  {imputationEngine === "listwise" ? "N/A (Dropped)" : `₹${benchmarkResults.mae.toFixed(2)} LPA`}
                </p>
                <p className="text-[10px] text-slate-400">Lower is better on missing set</p>
              </div>

              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60 space-y-1">
                <p className="text-[11px] text-slate-400 uppercase font-semibold">Root Mean Squared Error</p>
                <p className="text-xl font-bold text-indigo-400">
                  {imputationEngine === "listwise" ? "N/A (Dropped)" : `₹${benchmarkResults.rmse.toFixed(2)} LPA`}
                </p>
                <p className="text-[10px] text-slate-400">Penalizes large outlier misses</p>
              </div>

              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60 space-y-1">
                <p className="text-[11px] text-slate-400 uppercase font-semibold">Post-Imputation Std Dev</p>
                <p className="text-xl font-bold text-emerald-400">
                  ₹{benchmarkResults.stats.std.toFixed(2)} LPA
                </p>
                <p className="text-[10px] text-slate-400">True: ₹{groundTruthStats.std.toFixed(2)} LPA</p>
              </div>

              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60 space-y-1">
                <p className="text-[11px] text-slate-400 uppercase font-semibold">Variance Preservation</p>
                <p
                  className={clsx(
                    "text-xl font-bold",
                    benchmarkResults.variancePreservationRatio > 90
                      ? "text-emerald-400"
                      : benchmarkResults.variancePreservationRatio > 80
                      ? "text-amber-400"
                      : "text-rose-400"
                  )}
                >
                  {benchmarkResults.variancePreservationRatio.toFixed(1)}%
                </p>
                <p className="text-[10px] text-slate-400">Deflation penalty if &lt; 85%</p>
              </div>
            </div>

            {/* Imputation Analysis Narrative */}
            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/70 text-xs text-slate-300 leading-relaxed">
              {imputationEngine === "listwise" && (
                <p>
                  <strong className="text-rose-400">Listwise Deletion Analysis:</strong> Discarding 3 rows leaves only 9 engineers. Because Subhajit (₹42.0 LPA) is discarded, the sample mean collapses from ₹18.29 LPA to ₹17.37 LPA. The upper echelon is truncated.
                </p>
              )}
              {imputationEngine === "global_mean" && (
                <p>
                  <strong className="text-amber-400">Global Mean Imputation Analysis:</strong> All 3 missing rows receive ₹17.37 LPA. Junior Mahima (true salary ₹5.20 LPA) is massively overestimated by +₹12.17 LPA! Variance preservation drops to 81.3%.
                </p>
              )}
              {imputationEngine === "global_median" && (
                <p>
                  <strong className="text-amber-400">Global Median Imputation Analysis:</strong> All 3 missing rows receive ₹14.50 LPA. While robust against executive outliers, it homogenizes the workforce and creates an artificial spike at ₹14.50 LPA.
                </p>
              )}
              {imputationEngine === "stratified_median" && (
                <p>
                  <strong className="text-emerald-400">Stratified Group Median Analysis:</strong> Mahima gets SE median (₹6.50 LPA), Priyanka gets SSE median (₹14.50 LPA), and Subhajit gets EM median (₹38.00 LPA). MAE drops from ₹10.36 LPA down to ₹2.27 LPA!
                </p>
              )}
              {imputationEngine === "stochastic_reg" && (
                <p>
                  <strong className="text-cyan-400">Stochastic Regression (MICE) Analysis:</strong> Incorporates experience slope (β1 ≈ 2.94 LPA/yr) plus random Gaussian noise draw ε. Preserves over 97% of natural population variance without flatline spikes.
                </p>
              )}
            </div>

            {/* Completed Data Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-800/80 text-slate-400 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-2.5 px-3">ID & Name</th>
                    <th className="py-2.5 px-3">Role</th>
                    <th className="py-2.5 px-3">Experience</th>
                    <th className="py-2.5 px-3">Degree</th>
                    <th className="py-2.5 px-3">Ground Truth</th>
                    <th className="py-2.5 px-3">Completed Value</th>
                    <th className="py-2.5 px-3">Imputation Error</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {benchmarkResults.cohort.map(c => (
                    <tr
                      key={c.id}
                      className={clsx(
                        "hover:bg-slate-800/40",
                        c.isMissing && "bg-indigo-950/20 font-semibold"
                      )}
                    >
                      <td className="py-2 px-3 font-mono">
                        {c.id} ({c.name})
                      </td>
                      <td className="py-2 px-3">{c.role}</td>
                      <td className="py-2 px-3">{c.exp} yrs</td>
                      <td className="py-2 px-3">{c.degName}</td>
                      <td className="py-2 px-3 font-mono">₹{c.trueSal.toFixed(1)} LPA</td>
                      <td className="py-2 px-3 font-mono text-cyan-300">
                        ₹{c.imputedSal.toFixed(2)} LPA
                        {c.isMissing && (
                          <span className="ml-2 text-[10px] text-amber-400 uppercase tracking-wider">
                            (Imputed)
                          </span>
                        )}
                      </td>
                      <td className="py-2 px-3 font-mono">
                        {c.isMissing ? (
                          <span
                            className={clsx(
                              c.absError < 2.0 ? "text-emerald-400" : c.absError < 5.0 ? "text-amber-400" : "text-rose-400"
                            )}
                          >
                            ±₹{c.absError.toFixed(2)} LPA
                          </span>
                        ) : (
                          <span className="text-slate-500">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MODE C: KNN DISTANCE-WEIGHTED PLAYGROUND */}
        {studioMode === "knn" && (
          <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white">
                  K-Nearest Neighbors Multi-Feature Proximity Playground
                </h3>
                <p className="text-xs text-slate-400">
                  Observe how Euclidean distance across normalized Experience & Degree Rank identifies optimal peer donors.
                </p>
              </div>

              {/* Missing Candidate Selector */}
              <div className="flex flex-wrap items-center gap-3">
                <label className="text-xs text-slate-400 font-semibold">Select Target:</label>
                <div className="flex gap-1.5">
                  {[
                    { id: "WB-IT-03", label: "Mahima (SE, 1.5 yr)" },
                    { id: "WB-IT-07", label: "Priyanka (SSE, 6.0 yr)" },
                    { id: "WB-IT-11", label: "Subhajit (EM, 14.0 yr)" }
                  ].map(cand => (
                    <button
                      key={cand.id}
                      onClick={() => setKnnCandidateId(cand.id)}
                      className={clsx(
                        "px-3 py-1 text-xs font-bold rounded-lg border transition-all",
                        knnCandidateId === cand.id
                          ? "bg-indigo-600 text-white border-indigo-400 shadow-md"
                          : "bg-slate-800 text-slate-400 border-slate-700 hover:text-white"
                      )}
                    >
                      {cand.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Controls: K slider and Weighting toggle */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-800/40 border border-slate-700/60">
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-300">Neighbors Count (K):</span>
                  <span className="font-mono text-cyan-400 font-bold">{knnK} Neighbors</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="4"
                  step="1"
                  value={knnK}
                  onChange={e => setKnnK(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0">
                <span className="text-xs text-slate-300 font-semibold">Weighting Mode:</span>
                <button
                  onClick={() => setKnnDistanceWeighted(!knnDistanceWeighted)}
                  className={clsx(
                    "px-3.5 py-1.5 text-xs font-bold rounded-xl border transition-all",
                    knnDistanceWeighted
                      ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-sm"
                      : "bg-slate-700 text-slate-300 border-slate-600"
                  )}
                >
                  {knnDistanceWeighted ? "Distance-Weighted (1 / d)" : "Uniform Average (1 / K)"}
                </button>
              </div>
            </div>

            {/* Target vs Computed Prediction Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-1">
                <p className="text-[11px] text-slate-400 uppercase font-semibold">Target Engineer</p>
                <p className="text-base font-bold text-white">
                  {knnComputation.query.name} ({knnComputation.query.role})
                </p>
                <p className="text-xs text-slate-400">
                  {knnComputation.query.exp} yrs exp • {knnComputation.query.degName}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-700/50 space-y-1">
                <p className="text-[11px] text-indigo-300 uppercase font-semibold">KNN Imputed Salary</p>
                <p className="text-xl font-extrabold text-cyan-300">
                  ₹{knnComputation.imputedSalary.toFixed(2)} LPA
                </p>
                <p className="text-xs text-slate-400">
                  Ground Truth: ₹{knnComputation.query.trueSal.toFixed(1)} LPA
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-1">
                <p className="text-[11px] text-slate-400 uppercase font-semibold">Absolute Imputation Error</p>
                <p
                  className={clsx(
                    "text-xl font-extrabold",
                    knnComputation.absError < 2.0 ? "text-emerald-400" : "text-amber-400"
                  )}
                >
                  ±₹{knnComputation.absError.toFixed(2)} LPA
                </p>
                <p className="text-xs text-slate-400">
                  Accuracy: {(100 - (knnComputation.absError / knnComputation.query.trueSal) * 100).toFixed(1)}%
                </p>
              </div>
            </div>

            {/* Nearest Neighbors Roster with Normalized Distances */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Top {knnK} Nearest Donor Neighbors (From 9 Observed Peers)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {knnComputation.kNeighbors.map((neighbor, idx) => (
                  <div
                    key={neighbor.id}
                    className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/70 space-y-2 relative"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-indigo-300">Rank #{idx + 1}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-700 text-slate-300">
                        d = {neighbor.distance.toFixed(3)}
                      </span>
                    </div>

                    <div>
                      <h5 className="text-sm font-bold text-white">{neighbor.name}</h5>
                      <p className="text-xs text-slate-400">
                        {neighbor.role} • {neighbor.exp} yrs • {neighbor.degName}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-xs">
                      <span className="text-slate-400">Salary:</span>
                      <span className="font-mono font-bold text-emerald-300">
                        ₹{neighbor.trueSal.toFixed(1)} LPA
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-cyan-300">
                      <span>Weight in average:</span>
                      <span className="font-mono font-bold">{(neighbor.normWeight * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* =====================================================================
          SECTION 3: MATHEMATICAL FORMULATIONS (KATEX / MATHJAX STYLE)
      ===================================================================== */}
      <section id="math" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/20 rounded-xl border border-emerald-500/30 text-emerald-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              3. Mathematical Foundations & Analytical Proofs
            </h2>
            <p className="text-sm text-slate-400">
              Rigorous analytical formulations of Rubin's taxonomy, variance deflation theorems, and stochastic regression
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Card 1: Rubin's Missingness Equations */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-indigo-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400" />
              1. Rubin's Missingness Conditioning
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {"Let data matrix be partitioned into observed Y_obs and missing Y_mis, with binary missingness indicator matrix M ∈ {0, 1}^(N × d)."}
            </p>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-xs text-indigo-200 space-y-2">
              <p>{"MCAR: P(M | Y_obs, Y_mis, ψ) = P(M | ψ)"}</p>
              <p>{"MAR:  P(M | Y_obs, Y_mis, ψ) = P(M | Y_obs, ψ)"}</p>
              <p>{"MNAR: P(M | Y_obs, Y_mis, ψ) ≠ P(M | Y_obs, ψ)"}</p>
            </div>
            <p className="text-xs text-slate-400">
              When missingness is MAR, parameter estimation remains identifiable without selection bias, provided observed covariates are conditioned on during modeling.
            </p>
          </div>

          {/* Card 2: Analytical Proof of Variance Deflation */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-cyan-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              2. Proof of Variance Deflation
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {"Suppose N_mis values are imputed with the observed sample mean ȳ_obs. The deviation of each imputed record from the completed mean is zero:"}
            </p>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-xs text-cyan-200 space-y-1">
              <p>{"(y_j - ȳ_completed) = (ȳ_obs - ȳ_obs) = 0   ∀ j ∈ Missing"}</p>
              <p>{"S²_imputed = [1 / (N - 1)] * ∑ (y_i - ȳ_obs)² + 0"}</p>
              <p>{"S²_imputed = [(N_obs - 1) / (N - 1)] * S²_obs ≈ (1 - f) * S²_obs"}</p>
            </div>
            <p className="text-xs text-slate-400">
              For missing fraction f = 0.25, sample variance shrinks by ~25%, causing false statistical precision and artificially inflated t-statistics.
            </p>
          </div>

          {/* Card 3: Distance-Weighted KNN Formula */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-amber-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              3. Normalized Distance-Weighted KNN
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {"Given normalized query feature vector q ∈ [0, 1]^d and donor vectors x_i ∈ [0, 1]^d, weights are assigned by inverse Euclidean distance:"}
            </p>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-xs text-amber-200 space-y-1">
              <p>{"d(q, x_i) = √[ ∑ (q'_k - x'_{ik})² ]"}</p>
              <p>{"w_i = 1 / [ d(q, x_i) + ε ],   ε = 10⁻⁵"}</p>
              <p>{"ŷ_q = [ ∑ w_i * y_i ] / [ ∑ w_i ]"}</p>
            </div>
            <p className="text-xs text-slate-400">
              The convex combination ensures smooth interpolation across continuous feature space without requiring rigid parametric linearity.
            </p>
          </div>

          {/* Card 4: Stochastic Regression (MICE Residual Noise) */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-emerald-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              4. Stochastic Noise Injection (MICE)
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Deterministic regression eliminates residual scatter. Stochastic regression samples an error shock from the estimated residual variance:
            </p>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-xs text-emerald-200 space-y-1">
              <p>{"σ̂²_e = [1 / (N_obs - 2)] * ∑ (y_i - (β̂₀ + β̂₁ * x_i))²"}</p>
              <p>{"ε_j ~ N(0, σ̂²_e)"}</p>
              <p>{"ŷ_j = max(y_min, β̂₀ + β̂₁ * x_j + ε_j)"}</p>
            </div>
            <p className="text-xs text-slate-400">
              Adding residual noise preserves covariance structures and restores post-imputation variance to &gt; 97% of the true population baseline.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 4: REGIONAL INDUSTRIAL CASE STUDIES (WEST BENGAL)
      ===================================================================== */}
      <section id="cases" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-500/20 rounded-xl border border-indigo-500/30 text-indigo-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              4. West Bengal Industrial Case Studies
            </h2>
            <p className="text-sm text-slate-400">
              Real-world missing salary handling across FinTech, IT services, healthcare, and real estate
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Case 1 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-3 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Case 1: FinTech Underwriting</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                Barrackpore & Ichapur
              </span>
            </div>
            <h3 className="text-base font-bold text-white">Merchant Micro-Lending Income Imputation</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Context & Challenge:</strong> Susmita deployed an underwriting engine at a Barrackpore NBFC offering working capital loans to grocery and retail shopkeepers along Old Calcutta Road. 38% of applicants lacked formal payslips.
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Mechanism & Solution:</strong> Missingness was MAR, conditioned on daily UPI QR code transaction volume. Susmita built a stratified median imputer conditioned on commercial trade license category and UPI turnover clusters, reducing underwriting loan default by 23%.
            </p>
          </div>

          {/* Case 2 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-3 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">Case 2: IT Offshoring Workforce</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                Salt Lake Sector V
              </span>
            </div>
            <h3 className="text-base font-bold text-white">IT Compensation Survey Benchmarking</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Context & Challenge:</strong> Mamata and Mahima manage workforce analytics for a 4,500-engineer IT services firm in Salt Lake Sector V. In annual internal compensation reviews, 22% of senior lead architects (&gt; ₹30 LPA) omitted current compensation figures.
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Mechanism & Solution:</strong> Identified non-ignorable MNAR. Deleting missing rows deflated senior market rates, leading to employee attrition to Rajarhat tech campuses. They appended a Missingness Indicator mask and deployed Stochastic MICE on experience and GitHub skill percentiles.
            </p>
          </div>

          {/* Case 3 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-3 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">Case 3: Hospital Revenue Operations</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                Kolkata & Jadavpur
              </span>
            </div>
            <h3 className="text-base font-bold text-white">Visiting Specialist Surgeon Consultation Fees</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Context & Challenge:</strong> Abhronila directs health informatics across three super-specialty hospitals in Jadavpur and EM Bypass. Electronic health records (EHR) regularly suffered missing consultation fees for visiting senior surgeons.
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Mechanism & Solution:</strong> Missingness was MAR, conditioned on surgical specialty (Cardiac vs Orthopedic vs General) and operating theatre procedure length. A Distance-Weighted KNN imputer (K=3) achieved a 96.4% fee reconciliation accuracy against manual hospital audits.
            </p>
          </div>

          {/* Case 4 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-3 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Case 4: Commercial Real Estate</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                New Town Action Area II
              </span>
            </div>
            <h3 className="text-base font-bold text-white">Startup Tenant Corporate Bond Appraisal</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Context & Challenge:</strong> Debangshu built an automated commercial lease valuation engine for office parks in New Town. Emerging VC-backed startups frequently concealed executive payroll figures during lease negotiations.
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Mechanism & Solution:</strong> Applied Iterative Fully Conditional Specification (MICE) chaining paid-up equity capital, leased square footage, and total headcounts to impute missing payroll liabilities without crushing risk variance.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 5: DIAGNOSTIC ASSESSMENT QUIZ (5 SCENARIO QUESTIONS)
      ===================================================================== */}
      <section id="quiz" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-500/20 rounded-xl border border-amber-500/30 text-amber-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              5. Diagnostic Assessment Quiz
            </h2>
            <p className="text-sm text-slate-400">
              5 scenario-based examination questions testing theoretical mastery and production decision-making
            </p>
          </div>
        </div>

        <div className="bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-300">Test Your Knowledge:</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                5 Scenarios
              </span>
            </div>

            {quizSubmitted && (
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-slate-300">Your Score:</span>
                <span
                  className={clsx(
                    "text-sm font-extrabold px-3 py-1 rounded-xl border",
                    quizScore >= 4
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                      : quizScore >= 3
                      ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                      : "bg-rose-500/20 text-rose-300 border-rose-500/40"
                  )}
                >
                  {quizScore} / 5 ({((quizScore / 5) * 100).toFixed(0)}%)
                </span>
              </div>
            )}
          </div>

          {/* Quiz Question Cards */}
          <div className="space-y-6">
            {quizQuestions.map((q, idx) => {
              const selectedOpt = quizAnswers[q.id];
              const isCorrect = selectedOpt === q.correct;

              return (
                <div
                  key={q.id}
                  className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700/70 space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold">
                      Scenario #{idx + 1}
                    </span>
                    {quizSubmitted && (
                      <span
                        className={clsx(
                          "text-xs font-bold px-2.5 py-0.5 rounded-full",
                          isCorrect
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                            : "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                        )}
                      >
                        {isCorrect ? "Correct ✓" : "Incorrect ✗"}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-400 italic bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                    "{q.scenario}"
                  </p>

                  <h4 className="text-sm font-semibold text-white">{q.prompt}</h4>

                  <div className="space-y-2 pt-1">
                    {q.options.map(opt => {
                      const isOptionSelected = selectedOpt === opt.key;
                      let btnStyle = "bg-slate-800/80 border-slate-700/80 text-slate-300 hover:bg-slate-700/80";

                      if (quizSubmitted) {
                        if (opt.key === q.correct) {
                          btnStyle = "bg-emerald-950/60 border-emerald-500/60 text-emerald-200 font-semibold";
                        } else if (isOptionSelected && !isCorrect) {
                          btnStyle = "bg-rose-950/60 border-rose-500/60 text-rose-200";
                        } else {
                          btnStyle = "bg-slate-800/40 border-slate-800 text-slate-500";
                        }
                      } else if (isOptionSelected) {
                        btnStyle = "bg-indigo-600/30 border-indigo-400 text-white font-semibold";
                      }

                      return (
                        <button
                          key={opt.key}
                          disabled={quizSubmitted}
                          onClick={() => handleQuizSelect(q.id, opt.key)}
                          className={clsx(
                            "w-full text-left p-3 rounded-xl border text-xs transition-all flex items-start gap-3",
                            btnStyle
                          )}
                        >
                          <span className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                            {opt.key}
                          </span>
                          <span>{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 space-y-1">
                      <p className="font-bold text-indigo-300">Explanation & Conceptual Rationale:</p>
                      <p className="text-slate-400">{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              onClick={() => {
                setQuizAnswers({});
                setQuizSubmitted(false);
              }}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition-all border border-slate-700"
            >
              Reset Quiz
            </button>

            {!quizSubmitted ? (
              <button
                disabled={Object.keys(quizAnswers).length < 5}
                onClick={() => setQuizSubmitted(true)}
                className={clsx(
                  "px-6 py-2.5 text-xs font-bold rounded-xl transition-all shadow-lg",
                  Object.keys(quizAnswers).length === 5
                    ? "bg-indigo-600 text-white hover:bg-indigo-500 shadow-indigo-600/30"
                    : "bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed"
                )}
              >
                Submit Answers ({Object.keys(quizAnswers).length}/5 Answered)
              </button>
            ) : (
              <span className="text-xs font-semibold text-emerald-400">
                Evaluation Complete! Review explanations above.
              </span>
            )}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 6: PRODUCTION PITFALLS & LEAKAGE PATTERNS
      ===================================================================== */}
      <section id="pitfalls" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-rose-500/20 rounded-xl border border-rose-500/30 text-rose-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              6. Production Pitfalls & Anti-Patterns
            </h2>
            <p className="text-sm text-slate-400">
              Crucial architectural traps: data leakage, survivor bias, and unbounded predictions
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Pitfall 1 */}
          <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3 shadow-xl">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
              <span>⚠ Pitfall 1: Imputation Data Leakage (Fit-Before-Split)</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Calculating imputer statistics (mean, median, regression slopes) on the entire dataset prior to train/test partitioning. Test distribution statistics bleed into training, resulting in overly optimistic validation scores that collapse in production.
            </p>
            <div className="p-3 rounded-xl bg-slate-950 font-mono text-[11px] text-rose-300 border border-rose-900/30">
              # DANGEROUS LEAKAGE ANTIPATTERN<br />
              imputer.fit(df['salary']) # Fits on full data!<br />
              X_train, X_test = train_test_split(df)
            </div>
            <div className="p-3 rounded-xl bg-emerald-950/40 font-mono text-[11px] text-emerald-300 border border-emerald-800/40">
              # PRODUCTION BEST PRACTICE<br />
              X_train, X_test = train_test_split(df)<br />
              imputer.fit(X_train['salary']) # Fit strictly on train<br />
              X_test['salary'] = imputer.transform(X_test['salary'])
            </div>
          </div>

          {/* Pitfall 2 */}
          <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3 shadow-xl">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
              <span>⚠ Pitfall 2: Listwise Deletion Under MNAR Non-Disclosure</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Executing `df.dropna(subset=['salary'])` when missingness is non-ignorable. Dropping rows with missing values filters out executives earning &gt; ₹40 LPA, artificially deflating the mean and crippling upper-tier credit limits.
            </p>
            <div className="p-3 rounded-xl bg-slate-950 font-mono text-[11px] text-rose-300 border border-rose-900/30">
              # SURVIVOR BIAS CRIME<br />
              df_clean = df.dropna(subset=['salary'])<br />
              # Subhajit (₹42 LPA) is lost forever!
            </div>
            <div className="p-3 rounded-xl bg-emerald-950/40 font-mono text-[11px] text-emerald-300 border border-emerald-800/40">
              # PRODUCTION BEST PRACTICE<br />
              from sklearn.impute import MissingIndicator<br />
              df['is_missing'] = MissingIndicator().fit_transform(df[['salary']])<br />
              # Preserve behavioral non-disclosure signal!
            </div>
          </div>

          {/* Pitfall 3 */}
          <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3 shadow-xl">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
              <span>⚠ Pitfall 3: Negative Salary Imputation from Linear Models</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Standard OLS regression and Gaussian error draws have unbounded mathematical support. Junior candidates with very low experience receiving a negative residual shock can be assigned negative or sub-minimum-wage salaries.
            </p>
            <div className="p-3 rounded-xl bg-slate-950 font-mono text-[11px] text-rose-300 border border-rose-900/30">
              # UNBOUNDED PREDICTION HAZARD<br />
              y_pred = beta0 + beta1 * 0.1 + noise # Might yield -₹1.2 LPA!
            </div>
            <div className="p-3 rounded-xl bg-emerald-950/40 font-mono text-[11px] text-emerald-300 border border-emerald-800/40">
              # PRODUCTION BEST PRACTICE<br />
              WB_MIN_WAGE_LPA = 2.40 # ₹20k/month statutory floor<br />
              y_safe = max(WB_MIN_WAGE_LPA, y_pred)
            </div>
          </div>

          {/* Pitfall 4 */}
          <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3 shadow-xl">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
              <span>⚠ Pitfall 4: Target Leakage During Imputation</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Using the downstream target variable (e.g., `Loan_Approved` or `Defaulted`) to help impute missing salary in feature preprocessing. At test or serving time, the label does not exist, causing fatal pipeline crashes.
            </p>
            <div className="p-3 rounded-xl bg-slate-950 font-mono text-[11px] text-rose-300 border border-rose-900/30">
              # TARGET LEAKAGE CONTAMINATION<br />
              imputer.fit(X[['experience', 'loan_status']]) # Uses label!
            </div>
            <div className="p-3 rounded-xl bg-emerald-950/40 font-mono text-[11px] text-emerald-300 border border-emerald-800/40">
              # PRODUCTION BEST PRACTICE<br />
              # Impute strictly using independent explanatory covariates X<br />
              imputer.fit(X[['experience', 'degree_rank']])
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 7: LABORATORY CODE, STUDY NOTES & 30 GRADED QUESTIONS
      ===================================================================== */}
      <section id="resources" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-500/20 rounded-xl border border-indigo-500/30 text-indigo-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              7. Academic Laboratory & Resource Hub
            </h2>
            <p className="text-sm text-slate-400">
              Pure Python engine, comprehensive revision notes, 30 graded questions, and instructor bio
            </p>
          </div>
        </div>

        {/* Resource Tabs */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-slate-900/90 rounded-2xl border border-slate-800">
          {[
            { id: "lab", label: "Python Laboratory Code" },
            { id: "notes", label: "Comprehensive Study Notes (420+ Lines)" },
            { id: "questions", label: "30 Graded Examination Questions" },
            { id: "author", label: "Instructor Profile" }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setResourceTab(tab.id)}
              className={clsx(
                "flex-1 min-w-[180px] py-2.5 px-4 rounded-xl text-xs font-bold transition-all",
                resourceTab === tab.id
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 border border-indigo-400/40"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Display */}
        <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 shadow-2xl">
          {resourceTab === "lab" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">
                    Pure Python Simulation Engine (Zero External Dependencies)
                  </h3>
                  <p className="text-xs text-slate-400">
                    File: <code className="text-indigo-300">worked_example_2_handling_missing_salary_values_lab.py</code>
                  </p>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono">
                  Verified: Exit Code 0
                </span>
              </div>
              <PythonFileLoader code={labCode} filename="worked_example_2_handling_missing_salary_values_lab.py" />
            </div>
          )}

          {resourceTab === "notes" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">
                    Official MAKAUT Masterclass Academic Study Handbook
                  </h3>
                  <p className="text-xs text-slate-400">
                    File: <code className="text-indigo-300">topic22_note.txt</code> • 420+ Lines
                  </p>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-mono">
                  Syllabus BCAC701B
                </span>
              </div>
              <div className="max-h-[600px] overflow-y-auto rounded-xl border border-slate-800 p-4 bg-slate-950/70">
                <PlainTextPrint text={noteText} />
              </div>
            </div>
          )}

          {resourceTab === "questions" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">
                    30 Graded Assessment Questions with Step-by-Step Solutions
                  </h3>
                  <p className="text-xs text-slate-400">
                    Curated across 4 Rigorous Tiers: Foundation, Mechanics, Architecture, and Scalability
                  </p>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono">
                  30 Graded Questions
                </span>
              </div>
              <FAQTemplate questions={questions} />
            </div>
          )}

          {resourceTab === "author" && (
            <div className="space-y-4">
              <Teacher />
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Topic22;
