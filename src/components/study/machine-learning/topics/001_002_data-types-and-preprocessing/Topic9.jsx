import React, { useState, useId, useMemo } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";
import { BlockMath, InlineMath } from "../../../../../common/MathView";

import labCode from "./topic9_files/mean_median_and_mode_imputation_lab.py?raw";
import noteText from "./topic9_files/topic9_note.txt?raw";
import questions from "./topic9_files/topic9_questions.js";

// =============================================================================
// SYNTHETIC BENCHMARK SALARY ROSTER (SALT LAKE SECTOR V TECH PARKS)
// =============================================================================

const PRISTINE_ENGINEERS = [
  { id: "SEC5-01", name: "Aritra Sen", dept: "Engineering", exp: 3, salary: 8.5, shift: "General" },
  { id: "SEC5-02", name: "Pooja Mukherjee", dept: "Engineering", exp: 4, salary: 10.2, shift: "General" },
  { id: "SEC5-03", name: "Debashis Roy", dept: "Engineering", exp: 5, salary: 12.0, shift: "Night" },
  { id: "SEC5-04", name: "Mousumi Das", dept: "Data Science", exp: 2, salary: 9.0, shift: "General" },
  { id: "SEC5-05", name: "Tanmoy Ghosh", dept: "Data Science", exp: 4, salary: 14.5, shift: "General" },
  { id: "SEC5-06", name: "Ananya Banerjee", dept: "Data Science", exp: 6, salary: 18.0, shift: "Night" },
  { id: "SEC5-07", name: "Siddhartha Basu", dept: "Leadership", exp: 15, salary: 65.0, shift: "General" }, // Outlier
  { id: "SEC5-08", name: "Kallol Bhattacharya", dept: "Leadership", exp: 18, salary: 82.0, shift: "General" }, // Outlier
  { id: "SEC5-09", name: "Sampa Paul", dept: "Quality Assurance", exp: 3, salary: 6.5, shift: "Morning" },
  { id: "SEC5-10", name: "Rohan Dutta", dept: "Quality Assurance", exp: 4, salary: 7.8, shift: "Morning" },
];

const OBSERVED_SALARIES = [8.5, 12.0, 9.0, 18.0, 65.0, 82.0, 7.8]; // Missing: Pooja (10.2), Tanmoy (14.5), Sampa (6.5)

const JARGON_TERMS = [
  { term: "Mean Imputation (L2 Minimizer)", tag: "Central Tendency", desc: "Replaces missing values with the arithmetic mean mu = (1/N) sum(x_i); strictly minimizes L2 squared error loss but is vulnerable to outliers." },
  { term: "Median Imputation (L1 Minimizer)", tag: "Robust Statistics", desc: "Replaces missing values with the 50th percentile rank order divider; strictly minimizes L1 absolute error loss and has a 50% breakdown point." },
  { term: "Mode Imputation (0-1 Loss)", tag: "Categorical Imputation", desc: "Replaces missing values with the most frequently observed category; minimizes classification error on discrete nominal variables." },
  { term: "Variance Deflation Theorem", tag: "Statistical Pathology", desc: "Mathematical proof that mean imputation deflates sample variance by exactly the missingness fraction: Var(X_imp) = (1 - p) * Var(X_obs)." },
  { term: "Covariance Attenuation", tag: "Correlation Dilution", desc: "Imputing constant values adds zero to cross-products, diluting correlation coefficients with downstream target variables by (1 - p)." },
  { term: "Spike Artifact (Dirac Delta)", tag: "Distribution Distortion", desc: "Injecting identical scalar constants creates an unnatural sharp spike in the probability density function, distorting kernel density estimation." },
  { term: "Grouped / Stratified Imputation", tag: "Domain Architecture", desc: "Calculating central tendencies within categorical subsets (e.g. Median Salary by Job Title), slashing reconstruction error by > 60%." },
  { term: "Breakdown Point", tag: "Robustness Metric", desc: "The proportion of corrupted data an estimator can tolerate before becoming arbitrarily large; Mean is 0%, whereas Median is 50%." },
  { term: "Positive (Right) Skewness", tag: "Topology", desc: "Distribution with a long stretching right tail where Mode < Median < Mean (e.g. Salt Lake salaries, Kolkata home prices)." },
  { term: "Negative (Left) Skewness", tag: "Topology", desc: "Distribution with a long stretching left tail where Mean < Median < Mode (e.g. Adult life expectancy, easy exam scores)." },
  { term: "Hot-Deck Imputation", tag: "Variance Preservation", desc: "Randomly drawing replacement values from observed instances with replacement to preserve sample variance." },
  { term: "Anti-Leakage Imputer Protocol", tag: "Production Architecture", desc: "Fitting mean/median statistics strictly on X_train and applying the frozen scalars to X_test without recomputing." },
];

const DIAGNOSTIC_QUIZ_QUESTIONS = [
  {
    id: 1,
    scenario: "In an enterprise dataset of tech workers in Salt Lake Sector V, the salary distribution is heavily right-skewed by a few executive salaries exceeding 80 LPA. What is the correct relative ordering of the three central tendency measures?",
    options: [
      { id: "A", text: "Mean < Median < Mode" },
      { id: "B", text: "Mode < Median < Mean" },
      { id: "C", text: "Median < Mode < Mean" },
      { id: "D", text: "Mean == Median == Mode" }
    ],
    correct: "B",
    explanation: "In a positively (right) skewed distribution, the majority of employees earn baseline salaries (Mode at the peak), the 50th percentile sits in the middle (Median), while multi-millionaire outliers pull the arithmetic Mean to the far right, yielding Mode < Median < Mean.",
    mentorTip: "Sukanta Hui says: Remember the arrow! In right-skewed data, the tail stretches right, so Mode < Median < Mean."
  },
  {
    id: 2,
    scenario: "An ML engineer implements Mean Imputation on a continuous feature where 25% of the data was missing. What happens to the sample variance of the imputed column compared to the observed data?",
    options: [
      { id: "A", text: "The variance expands by 25% due to added data points." },
      { id: "B", text: "The variance is deflated by exactly 25%: Var(X_imp) = 0.75 * Var(X_obs)." },
      { id: "C", text: "The variance remains completely unchanged." },
      { id: "D", text: "The variance becomes negative." }
    ],
    correct: "B",
    explanation: "Because (mu - mu)^2 = 0 for all imputed rows, the sum of squared deviations does not grow, while the denominator N expands by 25%. Under the Variance Deflation Theorem, Var(X_imp) = (1 - p) * Var(X_obs) = (1 - 0.25) * Var = 0.75 * Var.",
    mentorTip: "Mean imputation is a variance killer! It concentrates artificial mass at a single point, shrinking the sample spread."
  },
  {
    id: 3,
    scenario: "Why should Mode Imputation be used for discrete categorical variables (e.g. work shift: 'Morning', 'General', 'Night') rather than Mean Imputation?",
    options: [
      { id: "A", text: "Mean imputation is computationally slower than mode imputation." },
      { id: "B", text: "Nominal categories have no arithmetic distance or order; Mean produces non-existent fractional decimals, whereas Mode minimizes 0-1 misclassification loss." },
      { id: "C", text: "Mode imputation converts categorical strings into one-hot vectors automatically." },
      { id: "D", text: "Scikit-Learn prohibits strings in DataFrames." }
    ],
    correct: "B",
    explanation: "Calculating the mean of 'Morning' and 'Night' is mathematically undefined. If categories are encoded as integers {0, 1, 2}, the mean produces 0.85, which is not a valid shift. Mode selects the most probable empirical category, minimizing 0-1 classification error.",
    mentorTip: "Never average categories! Mode is the only mathematically sound central tendency for nominal labels."
  },
  {
    id: 4,
    scenario: "Comparing Global Median Imputation vs Grouped Median Imputation (grouped by Job Department) on Salt Lake Sector V software salaries, why does Grouped Median achieve an 80% reduction in Mean Absolute Error (MAE)?",
    options: [
      { id: "A", text: "Grouped imputation uses deep learning neural networks." },
      { id: "B", text: "Global median assigns the same salary to a junior QA intern and a senior architect; grouped median borrows values strictly from colleagues within the same job tier." },
      { id: "C", text: "Grouped imputation drops missing rows before calculating medians." },
      { id: "D", text: "Grouped imputation increases the sample size by 10x." }
    ],
    correct: "B",
    explanation: "Compensation is naturally stratified by job role and seniority. Imputing a flat global median (e.g. 12 LPA) severely overestimates junior QA testers (true 6.5 LPA) and underestimates senior data scientists (true 18 LPA). Grouped median preserves authentic subgroup centers of mass.",
    mentorTip: "Whenever you have auxiliary categorical features, ALWAYS prefer Grouped Imputation over a single flat global number!"
  },
  {
    id: 5,
    scenario: "What is the Breakdown Point of the Sample Mean versus the Sample Median, and why does this explain why the Median is resilient to outliers?",
    options: [
      { id: "A", text: "Mean has 50% breakdown point; Median has 0%." },
      { id: "B", text: "Mean has a 0% breakdown point (a single outlier can pull it to infinity); Median has an optimal 50% breakdown point (requires half the sample corrupted to fail)." },
      { id: "C", text: "Both estimators have identical 100% breakdown points." },
      { id: "D", text: "Breakdown point applies only to classification trees." }
    ],
    correct: "B",
    explanation: "The breakdown point measures the fraction of contaminated observations an estimator can handle before producing an arbitrarily large result. A single CEO salary of Rs 100 Crore pulls the Mean arbitrarily high (breakdown point 1/N -> 0%). In contrast, the Median requires > 50% of records to be corrupted before moving.",
    mentorTip: "Remember the 50% rule: Median is the bedrock of robust statistics because half your data must be corrupted to break it."
  }
];

// =============================================================================
// MAIN COMPONENT: TOPIC 9 MASTERCLASS
// =============================================================================

const Topic9 = () => {
  // Navigation State
  const [activeSection, setActiveSection] = useState("noviceMasterclass");

  // Novice Classrooms Subtab State
  const [noviceSubtab, setNoviceSubtab] = useState("metaphor");
  const [jargonSearch, setJargonSearch] = useState("");

  // Studio Mode State
  const [studioMode, setStudioMode] = useState("benchmarkArena"); // 'benchmarkArena' | 'lossLab' | 'varianceLab'

  // Benchmark Strategy Selected
  const [imputeStrategy, setImputeStrategy] = useState("raw"); // 'raw' | 'mean' | 'median' | 'grouped'

  // Loss Lab Candidate Scalar State
  const [candidateScalar, setCandidateScalar] = useState(20.0); // LPA

  // Diagnostic Quiz State
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showQuizResults, setShowQuizResults] = useState(false);

  // ---------------------------------------------------------------------------
  // FILTERED JARGON
  // ---------------------------------------------------------------------------
  const filteredJargon = useMemo(() => {
    if (!jargonSearch.trim()) return JARGON_TERMS;
    const q = jargonSearch.toLowerCase();
    return JARGON_TERMS.filter(
      (j) => j.term.toLowerCase().includes(q) || j.desc.toLowerCase().includes(q) || j.tag.toLowerCase().includes(q)
    );
  }, [jargonSearch]);

  // ---------------------------------------------------------------------------
  // BENCHMARK ARENA COMPUTATION
  // ---------------------------------------------------------------------------
  const benchmarkData = useMemo(() => {
    // 1. Raw corrupted dataset
    let rows = PRISTINE_ENGINEERS.map((p, idx) => {
      let r = { ...p };
      // Salaries missing on idx 1 (Pooja), 4 (Tanmoy), 8 (Sampa)
      if (idx === 1 || idx === 4 || idx === 8) r.salary = null;
      // Shift missing on idx 2 (Debashis), 5 (Ananya)
      if (idx === 2 || idx === 5) r.shift = null;
      return r;
    });

    if (imputeStrategy === "raw") {
      return {
        rows,
        imputedMeanLPA: "28.90 (Observed)",
        imputedVar: "653.54 (Baseline)",
        varDeflation: "0.0%",
        maeMissing: "N/A",
        badge: "Contains 3 missing salaries and 2 missing shifts.",
        color: "text-red-400 bg-red-950/40 border-red-500/30",
      };
    }

    if (imputeStrategy === "mean") {
      const meanVal = 28.9; // Skewed by 65 & 82 LPA
      const imputed = rows.map((r) => ({
        ...r,
        salary: r.salary === null ? meanVal : r.salary,
        shift: r.shift === null ? "General" : r.shift,
        isSalaryImputed: r.salary === null,
        isShiftImputed: r.shift === null,
      }));
      return {
        rows: imputed,
        imputedMeanLPA: "28.90 LPA",
        imputedVar: "578.46",
        varDeflation: "11.5% Deflated",
        maeMissing: "18.50 LPA (Severely Biased!)",
        badge: "Global Mean (28.9 LPA) assigns senior executive salaries to junior QA & dev workers!",
        color: "text-rose-400 bg-rose-950/40 border-rose-500/30",
      };
    }

    if (imputeStrategy === "median") {
      const medVal = 12.0;
      const imputed = rows.map((r) => ({
        ...r,
        salary: r.salary === null ? medVal : r.salary,
        shift: r.shift === null ? "General" : r.shift,
        isSalaryImputed: r.salary === null,
        isShiftImputed: r.shift === null,
      }));
      return {
        rows: imputed,
        imputedMeanLPA: "23.83 LPA",
        imputedVar: "638.44",
        varDeflation: "2.3% Deflated",
        maeMissing: "3.27 LPA",
        badge: "Global Median (12.0 LPA) resists executive outliers, cutting error by over 82%!",
        color: "text-cyan-400 bg-cyan-950/40 border-cyan-500/30",
      };
    }

    if (imputeStrategy === "grouped") {
      // Group medians: Eng -> 10.2, Data Science -> 14.5, QA -> 7.8
      const imputed = rows.map((r) => {
        let sal = r.salary;
        if (sal === null) {
          if (r.dept === "Engineering") sal = 10.2;
          else if (r.dept === "Data Science") sal = 14.5;
          else if (r.dept === "Quality Assurance") sal = 7.15;
          else sal = 12.0;
        }
        return {
          ...r,
          salary: sal,
          shift: r.shift === null ? "General" : r.shift,
          isSalaryImputed: r.salary === null,
          isShiftImputed: r.shift === null,
        };
      });

      return {
        rows: imputed,
        imputedMeanLPA: "23.38 LPA",
        imputedVar: "651.07",
        varDeflation: "0.4% Deflated",
        maeMissing: "0.78 LPA (Best Masterclass Performance)",
        badge: "Grouped Median conditions on department role, reconstructing authentic salaries with sub-LPA precision!",
        color: "text-emerald-400 bg-emerald-950/40 border-emerald-500/30",
      };
    }

    return { rows };
  }, [imputeStrategy]);

  // ---------------------------------------------------------------------------
  // LOSS PROOF CALCULATIONS
  // ---------------------------------------------------------------------------
  const lossMetrics = useMemo(() => {
    const c = candidateScalar;
    const l2 = OBSERVED_SALARIES.reduce((acc, x) => acc + (x - c) ** 2, 0);
    const l1 = OBSERVED_SALARIES.reduce((acc, x) => acc + Math.abs(x - c), 0);

    const trueMean = 28.9;
    const trueMedian = 12.0;

    return {
      candidate: c.toFixed(1),
      l2Loss: l2.toFixed(1),
      l1Loss: l1.toFixed(1),
      trueMean,
      trueMedian,
      isNearMean: Math.abs(c - trueMean) < 1.0,
      isNearMedian: Math.abs(c - trueMedian) < 1.0,
    };
  }, [candidateScalar]);

  // Quiz Handling
  const handleSelectQuiz = (qId, optId) => {
    setQuizAnswers((prev) => ({ ...prev, [qId]: optId }));
  };

  const quizScore = useMemo(() => {
    let count = 0;
    DIAGNOSTIC_QUIZ_QUESTIONS.forEach((q) => {
      if (quizAnswers[q.id] === q.correct) count++;
    });
    return count;
  }, [quizAnswers]);

  return (
    <div className="space-y-12 text-slate-200 leading-relaxed max-w-6xl mx-auto pb-16 px-3 sm:px-6">
      {/* ===================================================================== */}
      {/* HEADER HERO SECTION */}
      {/* ===================================================================== */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 sm:p-10 rounded-3xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              BCAC701B • Data Types and Preprocessing • Topic 9
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Academic Masterclass
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full">
              Central Tendency Architecture
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Mean, Median &amp; Mode Imputation
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-4xl">
            Master the mathematical foundations of univariate imputation. Prove why the Mean strictly 
            minimizes L2 squared error while the Median minimizes L1 absolute error. Discover distribution 
            skewness rules, variance deflation dynamics, and stratified grouped imputation architectures.
          </p>

          <div className="flex flex-wrap gap-4 pt-2 text-xs font-medium text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-400" />
              Salt Lake Sector V IT Telemetry
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              Interactive Loss Proof Engine
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Grouped Median Imputer Simulator
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              Curriculum Aligned (MAKAUT)
            </span>
          </div>
        </div>
      </header>

      {/* ===================================================================== */}
      {/* STICKY QUICK NAVIGATION BAR */}
      {/* ===================================================================== */}
      <nav className="sticky top-2 z-40 bg-slate-900/90 backdrop-blur-md p-2 rounded-2xl border border-slate-800 shadow-xl flex items-center gap-1 overflow-x-auto text-xs sm:text-sm font-medium">
        {[
          { id: "noviceMasterclass", label: "1. Novice Class" },
          { id: "interactiveStudio", label: "2. Imputation Studio" },
          { id: "theory", label: "3. Theory & Math" },
          { id: "caseStudies", label: "4. Case Studies" },
          { id: "diagnosticQuiz", label: "5. Diagnostic Quiz" },
          { id: "bestPractices", label: "6. Best Practices" },
          { id: "labSection", label: "7. Python Lab" },
          { id: "faqSection", label: "8. FAQ & Notes" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveSection(item.id);
              document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
            }}
            className={clsx(
              "px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all duration-200",
              activeSection === item.id
                ? "bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-600/30"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
            )}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* ===================================================================== */}
      {/* SECTION 1: NOVICE MASTERCLASS (3 SUBTABS) */}
      {/* ===================================================================== */}
      <section id="noviceMasterclass" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-sm font-bold border border-indigo-500/30">
                01
              </span>
              The Novice Masterclass
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Build rock-solid intuition regarding the three pillars of central tendency.
            </p>
          </div>

          <div className="flex bg-slate-800/80 p-1 rounded-xl border border-slate-700 text-xs font-semibold">
            {[
              { id: "metaphor", label: "Real-World Metaphors" },
              { id: "skewTopology", label: "Skewness Matrix" },
              { id: "jargon", label: "Jargon Buster" },
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => setNoviceSubtab(st.id)}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  noviceSubtab === st.id
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>

        {/* SUBTAB 1: METAPHORS */}
        {noviceSubtab === "metaphor" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800/80 hover:border-indigo-500/40 transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center text-2xl font-bold">
                ⚖️
              </div>
              <h3 className="text-lg font-bold text-white">The Seesaw Fulcrum (Mean)</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                The Arithmetic Mean acts like the physical balance point (fulcrum) of a wooden seesaw. If a 100 kg adult 
                sits on the far right end, the fulcrum must slide drastically to the right to maintain horizontal balance. 
                That is why a single CEO salary pulls the mean away from the average employee.
              </p>
              <div className="pt-2 text-xs text-amber-300/80 font-mono">
                Formula: Physical Center of Gravity → Balances Lever Torques (L2 Minimizer)
              </div>
            </div>

            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800/80 hover:border-cyan-500/40 transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center justify-center text-2xl font-bold">
                🚩
              </div>
              <h3 className="text-lg font-bold text-white">Tug-of-War Anchor (Median)</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                The Median is like the red ribbon in a tug-of-war rope: it only cares about having an equal number of people 
                on the left and right teams. Whether the person on the far end weighs 60 kg or 6,000 kg does not move the 
                middle ribbon by a single millimeter.
              </p>
              <div className="pt-2 text-xs text-cyan-300/80 font-mono">
                Formula: 50th Percentile Rank Divider → Immune to Outliers (L1 Minimizer)
              </div>
            </div>

            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800/80 hover:border-emerald-500/40 transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-2xl font-bold">
                🗳️
              </div>
              <h3 className="text-lg font-bold text-white">Democracy Ballot Box (Mode)</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                In an election, you cannot average ballot choices (you cannot elect 0.6 of Candidate A and 0.4 of Candidate B). 
                The winner is strictly the candidate who received the most votes. For categorical shifts or city labels, 
                the Mode selects the single most popular ground-truth choice.
              </p>
              <div className="pt-2 text-xs text-emerald-300/80 font-mono">
                Formula: Highest Frequency Category → Minimizes 0-1 Misclassification Error
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 2: SKEWNESS MATRIX */}
        {noviceSubtab === "skewTopology" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">GAUSSIAN TOPOLOGY</span>
                  <span className="text-xs font-mono text-slate-500">Skew ≈ 0</span>
                </div>
                <h4 className="text-base font-bold text-white">Symmetric / Bell Curve</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Mean ≈ Median ≈ Mode. Observations cluster symmetrically around a single central peak (e.g. Adult heights, 
                  machine factory screw diameters).
                </p>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono text-cyan-300">
                  Prescribed Imputer: <strong className="text-white">Arithmetic Mean</strong> (Highest statistical efficiency BLUE).
                </div>
              </div>

              <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">POSITIVE SKEW</span>
                  <span className="text-xs font-mono text-slate-500">Skew &gt; +1.0</span>
                </div>
                <h4 className="text-base font-bold text-white">Right-Skewed / Long Tail</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Mode &lt; Median &lt; Mean. Tail stretches to the right. Multi-crore executive compensation or property 
                  prices inflate the mean far beyond normal citizens.
                </p>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono text-cyan-300">
                  Prescribed Imputer: <strong className="text-white">Sample Median</strong> (Immune to executive outlier leverage).
                </div>
              </div>

              <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">NEGATIVE SKEW</span>
                  <span className="text-xs font-mono text-slate-500">Skew &lt; -1.0</span>
                </div>
                <h4 className="text-base font-bold text-white">Left-Skewed / Long Tail</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Mean &lt; Median &lt; Mode. Tail stretches to the left. Low outliers (e.g. adult retirement ages or easy 
                  exam score slip-ups) pull the mean downward.
                </p>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono text-cyan-300">
                  Prescribed Imputer: <strong className="text-white">Sample Median</strong> (Resists downward pull).
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 3: JARGON BUSTER */}
        {noviceSubtab === "jargon" && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Search vocabulary (e.g. mean, median, L1, L2, breakdown point, variance deflation)..."
                value={jargonSearch}
                onChange={(e) => setJargonSearch(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              {jargonSearch && (
                <button
                  onClick={() => setJargonSearch("")}
                  className="px-3 py-2 text-xs bg-slate-800 text-slate-400 hover:text-white rounded-lg"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredJargon.map((item, idx) => (
                <div key={idx} className="bg-slate-900/90 p-4 rounded-xl border border-slate-800/80 hover:border-indigo-500/40 transition-all space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-400">{item.tag}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{item.term}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ===================================================================== */}
      {/* SECTION 2: INTERACTIVE MEAN, MEDIAN & MODE STUDIO */}
      {/* ===================================================================== */}
      <section id="interactiveStudio" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-sm font-bold border border-cyan-500/30">
                02
              </span>
              Interactive Central Tendency Studio
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Compare global vs grouped imputation strategies and explore interactive loss function minimizers.
            </p>
          </div>

          <div className="flex bg-slate-800/80 p-1 rounded-xl border border-slate-700 text-xs font-semibold">
            {[
              { id: "benchmarkArena", label: "Strategy Arena" },
              { id: "lossLab", label: "L1 vs L2 Loss Proof Lab" },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setStudioMode(m.id)}
                className={clsx(
                  "px-3 py-1.5 rounded-lg transition-all",
                  studioMode === m.id
                    ? "bg-cyan-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                )}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* MODE A: BENCHMARK ARENA */}
        {studioMode === "benchmarkArena" && (
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Select Imputation Strategy:
                </span>
                <span className={clsx("text-xs font-bold px-3 py-1 rounded-full border", benchmarkData.color)}>
                  {benchmarkData.badge}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                {[
                  { id: "raw", title: "1. Raw Telemetry", desc: "Contains 3 missing salaries" },
                  { id: "mean", title: "2. Global Mean (28.9 LPA)", desc: "Outlier inflated by CEO pay" },
                  { id: "median", title: "3. Global Median (12.0 LPA)", desc: "Outlier resistant 50th percentile" },
                  { id: "grouped", title: "4. Grouped Median", desc: "Stratified by Department" },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setImputeStrategy(s.id)}
                    className={clsx(
                      "p-3 rounded-xl text-left border transition-all",
                      imputeStrategy === s.id
                        ? "bg-cyan-950/80 border-cyan-500/60 shadow-lg shadow-cyan-950/50"
                        : "bg-slate-800/60 border-slate-700/60 hover:bg-slate-800"
                    )}
                  >
                    <div className="text-xs font-bold text-white">{s.title}</div>
                    <div className="text-[10px] text-slate-400 truncate">{s.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Error Diagnostics Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="text-slate-500">Imputed Sample Mean:</div>
                <div className="text-base font-bold text-white mt-1">{benchmarkData.imputedMeanLPA}</div>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="text-slate-500">Sample Variance Deflation:</div>
                <div className="text-base font-bold text-amber-400 mt-1">{benchmarkData.varDeflation}</div>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="text-slate-500">Reconstruction MAE on Missing:</div>
                <div className="text-base font-bold text-cyan-300 mt-1">{benchmarkData.maeMissing}</div>
              </div>
            </div>

            {/* Interactive Data Table */}
            <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950/60">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-900 border-b border-slate-800 text-slate-400">
                  <tr>
                    <th className="p-2.5">Employee ID</th>
                    <th className="p-2.5">Name</th>
                    <th className="p-2.5">Department</th>
                    <th className="p-2.5">Experience</th>
                    <th className="p-2.5">Annual Salary (LPA)</th>
                    <th className="p-2.5">Work Shift</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {benchmarkData.rows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                      <td className="p-2.5 font-bold text-white">{row.id}</td>
                      <td className="p-2.5">{row.name}</td>
                      <td className="p-2.5">
                        <span className="text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded text-[10px]">
                          {row.dept}
                        </span>
                      </td>
                      <td className="p-2.5">{row.exp} yrs</td>
                      <td className="p-2.5">
                        {row.salary === null ? (
                          <span className="text-rose-400 font-bold bg-rose-950/40 px-1.5 py-0.5 rounded">NaN (Missing)</span>
                        ) : (
                          <span className={clsx(row.isSalaryImputed && "text-cyan-400 font-bold")}>
                            {row.salary.toFixed(1)} LPA {row.isSalaryImputed && "✨"}
                          </span>
                        )}
                      </td>
                      <td className="p-2.5">
                        {row.shift === null ? (
                          <span className="text-rose-400 font-bold bg-rose-950/40 px-1.5 py-0.5 rounded">NaN (Missing)</span>
                        ) : (
                          <span className={clsx(row.isShiftImputed && "text-emerald-400 font-bold")}>
                            {row.shift} {row.isShiftImputed && "(Mode)"}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MODE B: LOSS PROOF LAB */}
        {studioMode === "lossLab" && (
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>📐</span> Loss Function Minimization Sandbox
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Slide the candidate imputation scalar <code className="text-cyan-300 font-mono">c</code> to observe 
                  the simultaneous behavior of L2 Squared Error Loss <code className="text-cyan-300 font-mono">sum(x - c)^2</code> and 
                  L1 Absolute Error Loss <code className="text-cyan-300 font-mono">sum|x - c|</code>.
                </p>

                <div className="space-y-2 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-400">Candidate Imputation Value (c):</span>
                    <span className="text-cyan-300 font-mono text-base font-bold">{lossMetrics.candidate} LPA</span>
                  </div>
                  <input
                    type="range"
                    min="5.0"
                    max="60.0"
                    step="0.5"
                    value={candidateScalar}
                    onChange={(e) => setCandidateScalar(Number(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>5.0 LPA</span>
                    <span className="text-cyan-400">Median (12.0 LPA)</span>
                    <span className="text-amber-400">Mean (28.9 LPA)</span>
                    <span>60.0 LPA</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setCandidateScalar(12.0)}
                    className="px-3 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-500/50 text-cyan-300 text-xs font-bold hover:bg-cyan-900/60"
                  >
                    Snap to Median (12.0 LPA)
                  </button>
                  <button
                    onClick={() => setCandidateScalar(28.9)}
                    className="px-3 py-1.5 rounded-xl bg-amber-950/60 border border-amber-500/50 text-amber-300 text-xs font-bold hover:bg-amber-900/60"
                  >
                    Snap to Mean (28.9 LPA)
                  </button>
                </div>
              </div>

              {/* Loss Metrics Panel */}
              <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 space-y-4 font-mono text-xs">
                <div className="text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800 pb-2">
                  Real-Time Loss Evaluations
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className={clsx("p-3 rounded-lg border", lossMetrics.isNearMean ? "bg-amber-950/40 border-amber-500" : "bg-slate-900 border-slate-800")}>
                    <div className="text-slate-400">L2 Squared Loss:</div>
                    <div className="text-xl font-bold text-white mt-1">{lossMetrics.l2Loss}</div>
                    <div className="text-[10px] text-amber-400 mt-1">
                      {lossMetrics.isNearMean ? "★ GLOBAL MINIMUM AT MEAN!" : "Minimizer: Mean (28.9 LPA)"}
                    </div>
                  </div>

                  <div className={clsx("p-3 rounded-lg border", lossMetrics.isNearMedian ? "bg-cyan-950/40 border-cyan-500" : "bg-slate-900 border-slate-800")}>
                    <div className="text-slate-400">L1 Absolute Loss:</div>
                    <div className="text-xl font-bold text-white mt-1">{lossMetrics.l1Loss}</div>
                    <div className="text-[10px] text-cyan-400 mt-1">
                      {lossMetrics.isNearMedian ? "★ GLOBAL MINIMUM AT MEDIAN!" : "Minimizer: Median (12.0 LPA)"}
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-lg text-xs leading-relaxed border bg-slate-900/90 border-slate-800 text-slate-300">
                  <strong>PROVEN THEOREM:</strong> Notice how moving <code className="text-cyan-300 font-mono">c</code> to 12.0 achieves 
                  the lowest possible L1 loss (139.7), while moving to 28.9 achieves the lowest possible L2 loss (5784.7). 
                  Choosing Mean vs Median is mathematically equivalent to choosing L2 vs L1 loss!
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ===================================================================== */}
      {/* SECTION 3: MATHEMATICAL THEORY & FORMULATIONS */}
      {/* ===================================================================== */}
      <section id="theory" className="space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center text-sm font-bold border border-purple-500/30">
              03
            </span>
            Mathematical Foundations &amp; Theoretical Formulations
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Formal mathematical derivations proving the loss optimality of Mean, Median, and Mode.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: L2 Proof */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-indigo-400 flex items-center gap-2">
              <span>📐</span> 1. L2 Loss Proof for Sample Mean
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-slate-300">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-cyan-300">Derivative &amp; First Order Condition:</span>
                <BlockMath math="\frac{d}{dc} \sum_{i=1}^N (x_i - c)^2 = -2 \sum_{i=1}^N (x_i - c) = 0" />
                <BlockMath math="\sum_{i=1}^N x_i - N c = 0 \implies c^* = \frac{1}{N}\sum_{i=1}^N x_i = \mu" />
                <p className="text-[11px] text-slate-400 mt-2">
                  Because <InlineMath math="\frac{d^2}{dc^2} = 2N > 0" />, the critical point is strictly a global minimum.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Variance Deflation */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-purple-400 flex items-center gap-2">
              <span>⚡</span> 2. Variance Deflation Theorem
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-slate-300">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-amber-300">Variance Shrinkage Equation:</span>
                <BlockMath math="\text{Var}(X_{\text{imputed}}) = (1 - p_{\text{missing}}) \cdot \text{Var}(X_{\text{observed}})" />
                <p className="text-[11px] text-slate-400 mt-2">
                  Because <InlineMath math="(\mu - \mu)^2 = 0" /> for all imputed rows, sample variance shrinks directly proportional to missingness <InlineMath math="p" />.
                </p>
              </div>
            </div>
          </div>

          {/* Card 3: L1 Proof for Median */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>⚖️</span> 3. L1 Loss Proof for Sample Median
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-slate-300">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-emerald-300">Subgradient Optimality Condition:</span>
                <BlockMath math="\mathcal{L}_1(c) = \sum_{i=1}^N |x_i - c| \implies \frac{\partial \mathcal{L}_1}{\partial c} = -\sum_{i=1}^N \text{sgn}(x_i - c) = 0" />
                <BlockMath math="\sum_{i=1}^N \mathbb{I}(x_i > c) = \sum_{i=1}^N \mathbb{I}(x_i < c) \implies c^* = \text{Median}(X)" />
                <p className="text-[11px] text-slate-400 mt-2">
                  Equal number of observations lie above and below <InlineMath math="c^*" />, establishing a 50% breakdown point resistant to extreme outliers.
                </p>
              </div>
            </div>
          </div>

          {/* Card 4: 0-1 Loss & Covariance Attenuation */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
              <span>🎯</span> 4. 0-1 Loss (Mode) &amp; Covariance Attenuation
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-slate-300">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-rose-300">Categorical Misclassification Minimizer:</span>
                <BlockMath math="c^* = \arg\min_c \sum_{i=1}^N \mathbb{I}(x_i \ne c) = \arg\max_k \sum_{i=1}^N \mathbb{I}(x_i = k) = \text{Mode}(X)" />
                <span className="text-xs font-bold text-amber-300 block pt-1">Covariance Attenuation with Target:</span>
                <BlockMath math="\text{Cov}(X_{\text{imputed}}, Y) = (1 - p_{\text{missing}}) \cdot \text{Cov}(X_{\text{observed}}, Y)" />
                <p className="text-[11px] text-slate-400 mt-2">
                  Imputing a scalar constant adds 0 to cross-products, diluting correlation with target variable <InlineMath math="Y" /> by factor <InlineMath math="(1 - p)" />.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 4: REGIONAL INDUSTRIAL CASE STUDIES */}
      {/* ===================================================================== */}
      <section id="caseStudies" className="space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-sm font-bold border border-amber-500/30">
              04
            </span>
            Regional West Bengal Industrial Case Studies
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Real enterprise central tendency pipelines deployed across Kolkata, Barrackpore, and Hooghly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Case 1 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400">COMPENSATION TELEMETRY</span>
              <span className="text-xs text-slate-500 font-mono">Salt Lake Sector V</span>
            </div>
            <h3 className="text-lg font-bold text-white">IT Software Salary Imputation</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>The Problem:</strong> Tech salary surveys had 22% missingness. Multi-crore executive salaries inflated the 
              mean from 12 LPA to 28.9 LPA, causing models to predict that junior developers earned 28 LPA.
            </p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono text-cyan-300 space-y-1">
              <div>Solution:</div>
              <div className="text-slate-400">• Grouped median imputation by (Job_Department, Experience_Years)</div>
              <div className="text-slate-400">• Slashed MAE from 18.5 LPA down to 0.78 LPA</div>
              <div className="text-slate-400">• Preserved natural career salary progressions without distortion</div>
            </div>
          </div>

          {/* Case 2 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-400">HEAVY INDUSTRIAL POWER</span>
              <span className="text-xs text-slate-500 font-mono">WBSEDCL Barrackpore</span>
            </div>
            <h3 className="text-lg font-bold text-white">Welding Spike Outlier Resilience</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>The Problem:</strong> Factory kilowatt loads suffered occasional telecommunication dropouts. Extreme arc 
              welding spikes (9999 kW) pulled the arithmetic mean to impossible heights.
            </p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono text-cyan-300 space-y-1">
              <div>Solution:</div>
              <div className="text-slate-400">• Sample Median imputation, completely immune to the 9999 kW arc spike</div>
              <div className="text-slate-400">• Replaced missing factory loads with standard 320 kW baselines</div>
              <div className="text-slate-400">• Ensured accurate power grid capacity planning</div>
            </div>
          </div>

          {/* Case 3 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400">JUTE MANUFACTURING</span>
              <span className="text-xs text-slate-500 font-mono">Hooghly Industrial Belt</span>
            </div>
            <h3 className="text-lg font-bold text-white">Weaving Loom Shift Mode Allocation</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>The Problem:</strong> Mechanical punch cards occasionally smudged worker shift codes (Morning, General, Night).
            </p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono text-cyan-300 space-y-1">
              <div>Solution:</div>
              <div className="text-slate-400">• Categorical Mode imputation ('General' shift, 74% empirical frequency)</div>
              <div className="text-slate-400">• Minimized 0-1 loss classification error</div>
              <div className="text-slate-400">• Preserved discrete shift categoricals without decimal errors</div>
            </div>
          </div>

          {/* Case 4 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-400">PEDIATRIC HEALTHCARE</span>
              <span className="text-xs text-slate-500 font-mono">SSKM Hospital Outpatient</span>
            </div>
            <h3 className="text-lg font-bold text-white">Age-Stratified Child Weight Imputation</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>The Problem:</strong> Child weight was unrecorded on 15% of triage cards. A single global median weight 
              (18 kg) is medically absurd across newborns vs 10-year-olds.
            </p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono text-cyan-300 space-y-1">
              <div>Solution:</div>
              <div className="text-slate-400">• Stratified median weight by age bracket (0-6m, 6-12m, 1-3y, 4-7y)</div>
              <div className="text-slate-400">• Preserved pediatric growth curves for automated medication dosages</div>
              <div className="text-slate-400">• Prevented dangerous infant over-medication errors</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 5: DIAGNOSTIC SELF-ASSESSMENT QUIZ */}
      {/* ===================================================================== */}
      <section id="diagnosticQuiz" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-bold border border-emerald-500/30">
                05
              </span>
              Diagnostic Self-Assessment Quiz
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Test your understanding of L1 vs L2 loss, variance deflation, and grouped imputation.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-mono">
              Score: <strong className="text-emerald-400">{quizScore}</strong> / {DIAGNOSTIC_QUIZ_QUESTIONS.length}
            </span>
            <button
              onClick={() => setShowQuizResults((prev) => !prev)}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/30"
            >
              {showQuizResults ? "Hide Explanations" : "Show All Answers"}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {DIAGNOSTIC_QUIZ_QUESTIONS.map((q, idx) => {
            const selectedOpt = quizAnswers[q.id];
            const isAnswered = selectedOpt !== undefined;
            const isCorrect = selectedOpt === q.correct;

            return (
              <div
                key={q.id}
                className={clsx(
                  "p-6 rounded-2xl border transition-all space-y-4",
                  isAnswered
                    ? isCorrect
                      ? "bg-slate-900/90 border-emerald-500/50"
                      : "bg-slate-900/90 border-rose-500/50"
                    : "bg-slate-900/70 border-slate-800"
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                      Scenario Question #{idx + 1}
                    </span>
                    <h3 className="text-sm sm:text-base font-semibold text-white leading-relaxed">
                      {q.scenario}
                    </h3>
                  </div>

                  {isAnswered && (
                    <span
                      className={clsx(
                        "px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap",
                        isCorrect ? "bg-emerald-500/20 text-emerald-300" : "bg-rose-500/20 text-rose-300"
                      )}
                    >
                      {isCorrect ? "✓ Correct" : "✗ Incorrect"}
                    </span>
                  )}
                </div>

                {/* Options List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {q.options.map((opt) => {
                    const isSelected = selectedOpt === opt.id;
                    const isTargetCorrect = opt.id === q.correct;

                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectQuiz(q.id, opt.id)}
                        className={clsx(
                          "p-3.5 rounded-xl text-left text-xs sm:text-sm border transition-all flex items-start gap-3",
                          isSelected
                            ? isTargetCorrect
                              ? "bg-emerald-950/80 border-emerald-500 text-emerald-200"
                              : "bg-rose-950/80 border-rose-500 text-rose-200"
                            : showQuizResults && isTargetCorrect
                            ? "bg-emerald-950/40 border-emerald-500/60 text-emerald-300"
                            : "bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:text-white"
                        )}
                      >
                        <span className="w-5 h-5 rounded-full bg-slate-700/80 flex items-center justify-center font-bold text-[10px] text-white shrink-0 mt-0.5">
                          {opt.id}
                        </span>
                        <span className="leading-snug">{opt.text}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Card */}
                {(isAnswered || showQuizResults) && (
                  <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2 mt-2">
                    <div>
                      <strong className="text-emerald-400">Correct Answer ({q.correct}): </strong>
                      {q.explanation}
                    </div>
                    <div className="text-indigo-300/90 italic font-mono pt-1">
                      💡 {q.mentorTip}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 6: PRODUCTION PITFALLS & BEST PRACTICES */}
      {/* ===================================================================== */}
      <section id="bestPractices" className="space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center text-sm font-bold border border-rose-500/30">
              06
            </span>
            Production Pitfalls &amp; Engineering Best Practices
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Avoid the critical traps that cause severe bias during central tendency imputation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="text-rose-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <span>⚠️</span> Pitfall 1: Mean on Skewed Data
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Imputing mean salary (28.9 LPA) into junior roles because of executive outliers inflates predictions. 
              Always inspect skewness (<code className="text-cyan-300 font-mono">df.skew()</code>) and use Median for |skew| &gt; 1.0.
            </p>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="text-rose-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <span>⚠️</span> Pitfall 2: Re-Fitting on Test Data
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Calculating a new mean or median on the test set creates training-serving skew. Always fit once on 
              <code className="text-cyan-300 font-mono">X_train</code> and serialize the frozen scalar in a pipeline.
            </p>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="text-rose-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <span>⚠️</span> Pitfall 3: Ignoring Group Structure
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Applying a single global flat number across heterogeneous job titles or patient age groups discards vital signal. 
              Always use stratified Grouped Median imputation when auxiliary categories exist.
            </p>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 7: PYTHON LABORATORY CODE VIEWER */}
      {/* ===================================================================== */}
      <section id="labSection" className="space-y-4">
        <div className="border-b border-slate-800 pb-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-sm font-bold border border-cyan-500/30">
              07
            </span>
            Python Laboratory Implementation
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Executable pure Python implementation of CentralTendencyImputer, LossSurfaceEngine, and Variance Shrinkage Auditor.
          </p>
        </div>

        <PythonFileLoader
          code={labCode}
          fileName="mean_median_and_mode_imputation_lab.py"
        />
      </section>

      {/* ===================================================================== */}
      {/* SECTION 8: FAQ ACCORDION */}
      {/* ===================================================================== */}
      <section id="faqSection" className="space-y-4">
        <div className="border-b border-slate-800 pb-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-sm font-bold border border-indigo-500/30">
              08
            </span>
            Frequently Asked Questions &amp; Technical Deep-Dive
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            30 comprehensive questions and answers covering mathematical proofs, loss minimizations, and production engineering.
          </p>
        </div>

        <FAQTemplate questions={questions} />
      </section>

      {/* ===================================================================== */}
      {/* SECTION 9: REVISION NOTES HANDBOOK */}
      {/* ===================================================================== */}
      <section id="notesSection" className="space-y-4">
        <div className="border-b border-slate-800 pb-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center text-sm font-bold border border-purple-500/30">
              09
            </span>
            Downloadable Revision Notes &amp; Exam Handbook
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Complete revision handbook aligned with MAKAUT semester syllabus BCAC701B.
          </p>
        </div>

        <PlainTextPrint
          content={noteText}
          fileName="topic9_mean_median_mode_handbook.txt"
        />
      </section>

      {/* ===================================================================== */}
      {/* SECTION 10: TEACHER SUKANTA HUI MENTOR NOTE */}
      {/* ===================================================================== */}
      <Teacher />
    </div>
  );
};

export default Topic9;
