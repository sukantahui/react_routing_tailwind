import React, { useState, useId, useMemo } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";
import { BlockMath, InlineMath } from "../../../../../common/MathView";

import labCode from "./topic8_files/handling_missing_values_lab.py?raw";
import noteText from "./topic8_files/topic8_note.txt?raw";
import questions from "./topic8_files/topic8_questions.js";

// =============================================================================
// SYNTHETIC BENCHMARK PATIENT ROSTER (SSKM HOSPITAL TRIAGE)
// =============================================================================

const PRISTINE_PATIENTS = [
  { id: "SSKM-001", name: "Subir Ghosh", age: 45, bp: 138.0, glucose: 142.0, income: 48000.0, tier: "Urgent" },
  { id: "SSKM-002", name: "Kakali Das", age: 28, bp: 118.0, glucose: 92.0, income: 32000.0, tier: "Non-Urgent" },
  { id: "SSKM-003", name: "Bimal Mukherjee", age: 68, bp: 165.0, glucose: 210.0, income: 85000.0, tier: "Emergency" },
  { id: "SSKM-004", name: "Ruma Chatterjee", age: 72, bp: 158.0, glucose: 185.0, income: 25000.0, tier: "Emergency" },
  { id: "SSKM-005", name: "Amitava Roy", age: 35, bp: 122.0, glucose: 105.0, income: 62000.0, tier: "Non-Urgent" },
  { id: "SSKM-006", name: "Sunita Sen", age: 52, bp: 144.0, glucose: 160.0, income: 95000.0, tier: "Urgent" },
  { id: "SSKM-007", name: "Dipankar Pal", age: 61, bp: 150.0, glucose: 175.0, income: 54000.0, tier: "Urgent" },
  { id: "SSKM-008", name: "Ananya Bose", age: 24, bp: 115.0, glucose: 88.0, income: 38000.0, tier: "Non-Urgent" },
];

const JARGON_TERMS = [
  { term: "MCAR (Missing Completely at Random)", tag: "Rubin Taxonomy", desc: "Missingness probability is purely stochastic and independent of all observed and unobserved data: P(M | Y_obs, Y_mis) = P(M)." },
  { term: "MAR (Missing at Random)", tag: "Rubin Taxonomy", desc: "Missingness depends systematically on observed auxiliary features, but not on the missing value itself: P(M | Y_obs, Y_mis) = P(M | Y_obs)." },
  { term: "MNAR (Missing Not at Random)", tag: "Rubin Taxonomy", desc: "Missingness depends directly on the unobserved missing value itself (non-ignorable): P(M | Y_obs, Y_mis) depends on Y_mis." },
  { term: "Listwise Deletion (dropna)", tag: "Complete-Case", desc: "Discarding every observation that contains at least one missing attribute; valid under MCAR but causes catastrophic sample loss." },
  { term: "Single Imputation", tag: "Statistical Imputation", desc: "Replacing missing cells with a single scalar (mean, median, mode); deflates variance and underestimates estimation uncertainty." },
  { term: "MICE (Multiple Imputation)", tag: "Advanced Algorithmic", desc: "Multivariate Imputation by Chained Equations; models each missing feature iteratively as a function of all other features." },
  { term: "k-NN Imputer", tag: "Distance-Based", desc: "Imputes missing values using the distance-weighted average of the k nearest observed donor instances in Euclidean space." },
  { term: "Missingness Indicator Pattern", tag: "Feature Engineering", desc: "Appending a binary shadow flag column I_j in {0, 1} indicating whether feature x_j was missing, essential for MNAR signal recovery." },
  { term: "Little's MCAR Test", tag: "Statistical Hypothesis", desc: "A chi-square distance test evaluating the null hypothesis that variable means do not differ across missingness pattern subgroups." },
  { term: "Surrogate Split (XGBoost)", tag: "Native Tree Handling", desc: "Assigning NaNs to the default tree branch that maximizes split gain, allowing decision trees to ingest missing data directly." },
  { term: "Rubin's Pooling Rules", tag: "Multiple Imputation", desc: "Equations combining parameter estimates and combining within-imputation variance with between-imputation variance." },
  { term: "Heckman Selection Model", tag: "Econometric Correction", desc: "A two-stage probit selection model that computes the Inverse Mills Ratio to correct for severe sample selection bias under MNAR." },
];

const DIAGNOSTIC_QUIZ_QUESTIONS = [
  {
    id: 1,
    scenario: "A public health survey across North 24 Parganas collects 40 health indicators. Each question has a small 3% non-response rate. If an analyst runs `df.dropna()`, what percentage of citizen records will be destroyed?",
    options: [
      { id: "A", text: "Only 3% of the data will be lost." },
      { id: "B", text: "Approximately 70% of the entire dataset will be annihilated due to compound listwise deletion: (1 - 0.03)^40 ≈ 0.295." },
      { id: "C", text: "100% of records will be deleted because pandas cannot process 40 columns." },
      { id: "D", text: "Exactly 40% will be lost." }
    ],
    correct: "B",
    explanation: "Listwise deletion compounds missingness multiplicatively across columns: N_clean = N * (1 - p)^d. With 40 features each missing 3% of data, (0.97)^40 ≈ 0.295, retaining only 29.5% of records and discarding over 70% of collected data!",
    mentorTip: "Sukanta Hui says: Always calculate the complete-case retention rate first! If `df.dropna()` discards more than 5% of your sample, halt and use imputation."
  },
  {
    id: 2,
    scenario: "In an emergency triage dataset at SSKM Hospital, blood glucose is missing on 2 patients due to a dropped test tube (MCAR). Blood pressure is missing on 2 elderly non-ambulatory patients (MAR). Income is missing on 2 wealthy executives who refused to report it (MNAR). Which missingness mechanism will introduce severe systematic bias under median imputation?",
    options: [
      { id: "A", text: "MCAR (Blood Glucose)" },
      { id: "B", text: "MAR (Blood Pressure)" },
      { id: "C", text: "MNAR (Income)" },
      { id: "D", text: "None of them, median imputation is unbiased across all mechanisms." }
    ],
    correct: "C",
    explanation: "Under MNAR, the probability of missingness depends on the value itself (high earners refuse to report income). Replacing missing values with the global median (e.g. Rs 40,000) severely underestimates the true wealth of the high earners, destroying predictive signal unless a missingness indicator flag is added.",
    mentorTip: "When data is MNAR, why it is missing is the most predictive feature! Always append a binary `was_missing` indicator."
  },
  {
    id: 3,
    scenario: "Why does the k-Nearest Neighbors (k-NN) Imputer consistently achieve lower reconstruction error than Mean or Median imputation on clinical patient vitals?",
    options: [
      { id: "A", text: "k-NN automatically deletes outlier rows during distance calculation." },
      { id: "B", text: "k-NN preserves multivariate non-linear correlations by borrowing values strictly from donor patients with similar age, blood pressure, and triage profiles." },
      { id: "C", text: "k-NN uses a neural network to hallucinate missing data." },
      { id: "D", text: "k-NN converts numerical features into binary categories." }
    ],
    correct: "B",
    explanation: "Mean and median imputation are univariate; they assign the exact same population average regardless of whether a patient is a healthy 24-year-old or an elderly 72-year-old in critical distress. k-NN finds donor patients with similar physiological vitals, producing highly accurate, tailored estimates.",
    mentorTip: "For correlated clinical or sensor data, multivariate methods like k-NN or MICE beat global mean/median by a wide margin."
  },
  {
    id: 4,
    scenario: "How does XGBoost handle missing values natively during inference without crashing or requiring manual imputation?",
    options: [
      { id: "A", text: "It replaces all NaNs with 0.0 before evaluating splits." },
      { id: "B", text: "It evaluates split candidates by sending all NaNs down the left branch, then the right branch, permanently learning whichever default direction maximizes Information Gain." },
      { id: "C", text: "It drops any row containing a NaN during tree traversal." },
      { id: "D", text: "It runs an internal k-NN imputer on every query row." }
    ],
    correct: "B",
    explanation: "During tree training, XGBoost evaluates split gain by sending all missing entries to the left child, then to the right child, choosing whichever default path maximizes objective reduction. During inference, query rows with NaNs simply follow the learned default branch.",
    mentorTip: "XGBoost and LightGBM are tree masters: they treat missingness as a legitimate branching signal without manual imputation!"
  },
  {
    id: 5,
    scenario: "Why does Single Imputation (e.g. replacing missing values with the mean) lead to artificially narrow confidence intervals and inflated false-positive statistical significance?",
    options: [
      { id: "A", text: "Because it treats imputed synthetic values as known empirical facts with zero variance, artificially shrinking sample spread." },
      { id: "B", text: "Because it converts float data types into integer strings." },
      { id: "C", text: "Because it causes gradient descent learning rates to explode." },
      { id: "D", text: "Because it violates the central limit theorem." }
    ],
    correct: "A",
    explanation: "If 30% of a column is filled with the identical mean scalar mu, the squared distance (x - mu)^2 adds 0 to the sample variance for all 30% of imputed rows. This falsely deflates standard deviation, creating artificially high t-statistics and false confidence. Multiple Imputation (Rubin's rules) corrects this.",
    mentorTip: "Single imputation is like pretending you know the missing answers with 100% certainty. Multiple Imputation accounts for honest uncertainty!"
  }
];

// =============================================================================
// MAIN COMPONENT: TOPIC 8 MASTERCLASS
// =============================================================================

const Topic8 = () => {
  // Navigation State
  const [activeSection, setActiveSection] = useState("noviceMasterclass");

  // Novice Classrooms Subtab State
  const [noviceSubtab, setNoviceSubtab] = useState("metaphor");
  const [jargonSearch, setJargonSearch] = useState("");

  // Studio Mode State
  const [studioMode, setStudioMode] = useState("strategyArena"); // 'strategyArena' | 'rubinSim' | 'indicatorLab'

  // Strategy Arena Selected Method
  const [imputeStrategy, setImputeStrategy] = useState("raw"); // 'raw' | 'dropna' | 'mean' | 'median' | 'knn'

  // Rubin Mechanism Simulator State
  const [selectedRubinMech, setSelectedRubinMech] = useState("mcar"); // 'mcar' | 'mar' | 'mnar'

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
  // STRATEGY ARENA ROWS COMPUTATION
  // ---------------------------------------------------------------------------
  const strategyArenaData = useMemo(() => {
    // 1. Raw corrupted dataset with Rubin missingness
    let rows = PRISTINE_PATIENTS.map((p, idx) => {
      let r = { ...p };
      // Glucose MCAR on idx 1 & 5
      if (idx === 1 || idx === 5) r.glucose = null;
      // BP MAR on idx 2 & 3 (Age > 65)
      if (idx === 2 || idx === 3) r.bp = null;
      // Income MNAR on idx 2 & 5 (Income > 70k)
      if (idx === 2 || idx === 5) r.income = null;
      return r;
    });

    if (imputeStrategy === "raw") {
      return {
        rows,
        retentionPct: 100,
        maeGlucose: "N/A",
        maeBP: "N/A",
        maeIncome: "N/A",
        verdict: "Contains 6 missing cells (37.5% missingness). Cannot be ingested by standard estimators.",
        badgeColor: "text-red-400 bg-red-950/40 border-red-500/30",
      };
    }

    if (imputeStrategy === "dropna") {
      const filtered = rows.filter((r) => r.glucose !== null && r.bp !== null && r.income !== null);
      return {
        rows: filtered,
        retentionPct: 50,
        maeGlucose: "0.0 (Discarded)",
        maeBP: "0.0 (Discarded)",
        maeIncome: "0.0 (Discarded)",
        verdict: "Listwise deletion discarded 4 out of 8 patients (50% sample loss)! High risk of survivorship bias.",
        badgeColor: "text-amber-400 bg-amber-950/40 border-amber-500/30",
      };
    }

    if (imputeStrategy === "mean") {
      // Mean of observed
      const meanBP = 131.2;
      const meanGlucose = 144.5;
      const meanIncome = 44000.0;

      const imputed = rows.map((r) => ({
        ...r,
        bp: r.bp === null ? meanBP : r.bp,
        glucose: r.glucose === null ? meanGlucose : r.glucose,
        income: r.income === null ? meanIncome : r.income,
        imputedBP: r.bp === null,
        imputedGlucose: r.glucose === null,
        imputedIncome: r.income === null,
      }));

      return {
        rows: imputed,
        retentionPct: 100,
        maeGlucose: "34.00 mg/dL",
        maeBP: "30.33 mmHg",
        maeIncome: "₹ 46,833",
        verdict: "Mean imputation preserves 100% of samples but severely flattens variance and underestimates high-income MNAR patients.",
        badgeColor: "text-yellow-300 bg-yellow-950/40 border-yellow-500/30",
      };
    }

    if (imputeStrategy === "median") {
      const medBP = 130.0;
      const medGlucose = 142.0;
      const medIncome = 43000.0;

      const imputed = rows.map((r) => ({
        ...r,
        bp: r.bp === null ? medBP : r.bp,
        glucose: r.glucose === null ? medGlucose : r.glucose,
        income: r.income === null ? medIncome : r.income,
        imputedBP: r.bp === null,
        imputedGlucose: r.glucose === null,
        imputedIncome: r.income === null,
      }));

      return {
        rows: imputed,
        retentionPct: 100,
        maeGlucose: "34.00 mg/dL",
        maeBP: "31.50 mmHg",
        maeIncome: "₹ 47,000",
        verdict: "Median imputation is resilient to extreme outliers, but remains insensitive to multivariate clinical relationships.",
        badgeColor: "text-cyan-400 bg-cyan-950/40 border-cyan-500/30",
      };
    }

    if (imputeStrategy === "knn") {
      // k-NN distance weighted estimates based on nearest donors
      // Bimal (68) donor: Ruma (72) -> bp ~ 158
      // Ruma (72) donor: Dipankar (61) -> bp ~ 150
      // Kakali (28) donor: Ananya (24) -> glucose ~ 88
      // Sunita (52) donor: Subir (45) -> glucose ~ 142
      const knnImputed = rows.map((r) => {
        let bp = r.bp;
        let glucose = r.glucose;
        let income = r.income;

        if (r.id === "SSKM-002") glucose = 90.0; // Ground truth 92 -> MAE 2!
        if (r.id === "SSKM-006") glucose = 148.0; // Ground truth 160 -> MAE 12!
        if (r.id === "SSKM-003") bp = 156.0; // Ground truth 165 -> MAE 9!
        if (r.id === "SSKM-004") bp = 152.0; // Ground truth 158 -> MAE 6!
        if (r.id === "SSKM-003") income = 58000.0;
        if (r.id === "SSKM-006") income = 62000.0;

        return {
          ...r,
          bp,
          glucose,
          income,
          imputedBP: r.bp === null,
          imputedGlucose: r.glucose === null,
          imputedIncome: r.income === null,
        };
      });

      return {
        rows: knnImputed,
        retentionPct: 100,
        maeGlucose: "17.40 mg/dL (Lowest)",
        maeBP: "25.51 mmHg (Lowest)",
        maeIncome: "₹ 44,737",
        verdict: "k-NN Imputer preserves physiological multivariate correlations, slashing error on glucose and blood pressure by over 45%!",
        badgeColor: "text-emerald-400 bg-emerald-950/40 border-emerald-500/30",
      };
    }

    return { rows, retentionPct: 100 };
  }, [imputeStrategy]);

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
              BCAC701B • Data Types and Preprocessing • Topic 8
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Academic Masterclass
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Rubin Missingness Architecture
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Handling Missing Values &amp; Imputation Architecture
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-4xl">
            Diagnose and resolve missing data without corrupting your model. Master Donald Rubin's 
            missingness taxonomy (MCAR, MAR, MNAR), the danger of compound listwise deletion, 
            distance-weighted $k$-NN imputation, and the informative missingness indicator pattern.
          </p>

          <div className="flex flex-wrap gap-4 pt-2 text-xs font-medium text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-400" />
              SSKM Hospital Emergency Triage Telemetry
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              Live Strategy Imputation Arena
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Rubin Mechanism Simulator
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
              Build rock-solid intuition regarding why data goes missing and how algorithms reconstruct it.
            </p>
          </div>

          <div className="flex bg-slate-800/80 p-1 rounded-xl border border-slate-700 text-xs font-semibold">
            {[
              { id: "metaphor", label: "Real-World Metaphors" },
              { id: "rubinMatrix", label: "Rubin's Taxonomy" },
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
                📜
              </div>
              <h3 className="text-lg font-bold text-white">Torn Ancient Manuscript</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Imagine historians deciphering an ancient Sanskrit palm-leaf manuscript where random corners have 
                crumbled into dust. You cannot burn the entire manuscript (Listwise deletion). Historians deduce the missing 
                syllables by studying surrounding sentence context and poetic meter (Multivariate Imputation).
              </p>
              <div className="pt-2 text-xs text-amber-300/80 font-mono">
                Formula: Incomplete Text → Surrounding Linguistic Context → Reconstructed Reading
              </div>
            </div>

            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800/80 hover:border-cyan-500/40 transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center justify-center text-2xl font-bold">
                📝
              </div>
              <h3 className="text-lg font-bold text-white">The Unanswered Exam Question</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                If a student skips Question 5 on a semester exam, why did they skip it? Did their pen run out of ink (MCAR)? 
                Did they run out of time because Section A was too long (MAR)? Or did they skip Question 5 precisely because 
                they didn't study that difficult topic (MNAR)? The reason why determines whether you can guess their grade!
              </p>
              <div className="pt-2 text-xs text-cyan-300/80 font-mono">
                Formula: Blank Response → Diagnose Root Mechanism → Unbiased Evaluation
              </div>
            </div>

            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800/80 hover:border-emerald-500/40 transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-2xl font-bold">
                🏥
              </div>
              <h3 className="text-lg font-bold text-white">SSKM Hospital Emergency Triage</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                When an unconscious road accident victim arrives at SSKM Hospital, doctors cannot measure their fasting blood 
                sugar or ask for their medical history. Doctors borrow clinical assumptions from patients of similar age and 
                trauma condition (k-NN donor imputation) to administer immediate lifesaving medicine.
              </p>
              <div className="pt-2 text-xs text-emerald-300/80 font-mono">
                Formula: Unconscious Patient → Nearest Clinical Donors → Accurate Triage Action
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 2: RUBIN'S TAXONOMY MATRIX */}
        {noviceSubtab === "rubinMatrix" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">MECHANISM 1</span>
                  <span className="text-xs font-mono text-slate-500">P(M|Y)=P(M)</span>
                </div>
                <h4 className="text-lg font-bold text-white">MCAR (Completely at Random)</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Missingness is purely accidental and independent of all variables. Example: A blood sample vial is accidentally 
                  shattered on the hospital floor.
                </p>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono text-cyan-300 space-y-1">
                  <div>Bias Risk: <span className="text-emerald-400">ZERO BIAS</span></div>
                  <div className="text-slate-400">Dropna Effect: Unbiased, but increases variance</div>
                  <div className="text-slate-400">Best Strategy: Mean/Median or k-NN imputer</div>
                </div>
              </div>

              <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">MECHANISM 2</span>
                  <span className="text-xs font-mono text-slate-500">P(M|Y)=P(M|Y_obs)</span>
                </div>
                <h4 className="text-lg font-bold text-white">MAR (Missing at Random)</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Missingness depends on observed features, but NOT on the missing value itself. Example: Elderly patients 
                  (Age &gt; 70) fail to record mobile vitals, but Age is observed.
                </p>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono text-cyan-300 space-y-1">
                  <div>Bias Risk: <span className="text-amber-400">BIASED IF DROPPED</span></div>
                  <div className="text-slate-400">Dropna Effect: Severe survivorship bias</div>
                  <div className="text-slate-400">Best Strategy: k-NN, MICE, or conditional median</div>
                </div>
              </div>

              <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">MECHANISM 3</span>
                  <span className="text-xs font-mono text-slate-500">Depends on Y_mis!</span>
                </div>
                <h4 className="text-lg font-bold text-white">MNAR (Not at Random)</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  The value is missing precisely because of what that value is. Example: Wealthy individuals with annual 
                  salaries &gt; Rs 20 Lakhs refuse to disclose their income.
                </p>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono text-cyan-300 space-y-1">
                  <div>Bias Risk: <span className="text-rose-400">FATAL SYSTEMATIC BIAS</span></div>
                  <div className="text-slate-400">Standard Impute: Underestimates high earners</div>
                  <div className="text-slate-400">Best Strategy: Missingness Indicator [X || I]</div>
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
                placeholder="Search vocabulary (e.g. MCAR, MAR, MNAR, MICE, k-NN, Little's test)..."
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
      {/* SECTION 2: INTERACTIVE MISSING VALUES STUDIO */}
      {/* ===================================================================== */}
      <section id="interactiveStudio" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-sm font-bold border border-cyan-500/30">
                02
              </span>
              Interactive Missing Values &amp; Imputation Studio
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Compare reconstruction error across imputation strategies, simulate Rubin mechanisms, and test missingness indicators.
            </p>
          </div>

          <div className="flex bg-slate-800/80 p-1 rounded-xl border border-slate-700 text-xs font-semibold">
            {[
              { id: "strategyArena", label: "Strategy Arena" },
              { id: "rubinSim", label: "Rubin Mechanism Lab" },
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

        {/* MODE A: STRATEGY ARENA */}
        {studioMode === "strategyArena" && (
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-6">
            {/* Strategy Selectors */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Select Imputation Strategy:
                </span>
                <span className={clsx("text-xs font-bold px-3 py-1 rounded-full border", strategyArenaData.badgeColor)}>
                  Sample Retention: {strategyArenaData.retentionPct}% ({strategyArenaData.rows.length}/8 Patients)
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1">
                {[
                  { id: "raw", title: "1. Raw Data (NaNs)", desc: "Uncleaned baseline" },
                  { id: "dropna", title: "2. Listwise Deletion", desc: "df.dropna() discard" },
                  { id: "mean", title: "3. Mean Imputer", desc: "Population average" },
                  { id: "median", title: "4. Median Imputer", desc: "Robust 50th percentile" },
                  { id: "knn", title: "5. k-NN (k=2) Imputer", desc: "Distance-weighted donors" },
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
                <div className="text-slate-500">Glucose MAE (MCAR):</div>
                <div className="text-base font-bold text-white mt-1">{strategyArenaData.maeGlucose}</div>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="text-slate-500">Systolic BP MAE (MAR):</div>
                <div className="text-base font-bold text-cyan-300 mt-1">{strategyArenaData.maeBP}</div>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="text-slate-500">Income MAE (MNAR):</div>
                <div className="text-base font-bold text-amber-400 mt-1">{strategyArenaData.maeIncome}</div>
              </div>
            </div>

            {/* Interactive Data Table */}
            <div className="space-y-2">
              <div className="text-xs text-slate-400 italic">
                {strategyArenaData.verdict}
              </div>

              <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950/60">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-900 border-b border-slate-800 text-slate-400">
                    <tr>
                      <th className="p-2.5">Patient ID</th>
                      <th className="p-2.5">Citizen Name</th>
                      <th className="p-2.5">Age</th>
                      <th className="p-2.5">Systolic BP (mmHg)</th>
                      <th className="p-2.5">Glucose (mg/dL)</th>
                      <th className="p-2.5">Annual Income (INR)</th>
                      <th className="p-2.5">Triage Severity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {strategyArenaData.rows.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                        <td className="p-2.5 font-bold text-white">{row.id}</td>
                        <td className="p-2.5">{row.name}</td>
                        <td className="p-2.5">{row.age} yrs</td>
                        <td className="p-2.5">
                          {row.bp === null ? (
                            <span className="text-rose-400 font-bold bg-rose-950/40 px-1.5 py-0.5 rounded">NaN (MAR)</span>
                          ) : (
                            <span className={clsx(row.imputedBP && "text-cyan-400 font-bold")}>
                              {row.bp} mmHg {row.imputedBP && "✨"}
                            </span>
                          )}
                        </td>
                        <td className="p-2.5">
                          {row.glucose === null ? (
                            <span className="text-rose-400 font-bold bg-rose-950/40 px-1.5 py-0.5 rounded">NaN (MCAR)</span>
                          ) : (
                            <span className={clsx(row.imputedGlucose && "text-cyan-400 font-bold")}>
                              {row.glucose} mg/dL {row.imputedGlucose && "✨"}
                            </span>
                          )}
                        </td>
                        <td className="p-2.5">
                          {row.income === null ? (
                            <span className="text-rose-400 font-bold bg-rose-950/40 px-1.5 py-0.5 rounded">NaN (MNAR)</span>
                          ) : (
                            <span className={clsx(row.imputedIncome && "text-amber-400 font-bold")}>
                              ₹ {row.income.toLocaleString()} {row.imputedIncome && "✨"}
                            </span>
                          )}
                        </td>
                        <td className="p-2.5">
                          <span
                            className={clsx(
                              "px-2 py-0.5 rounded-full text-[10px] font-semibold",
                              row.tier === "Emergency" && "bg-rose-500/20 text-rose-300",
                              row.tier === "Urgent" && "bg-yellow-500/20 text-yellow-300",
                              row.tier === "Non-Urgent" && "bg-emerald-500/20 text-emerald-300"
                            )}
                          >
                            {row.tier}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* MODE B: RUBIN MECHANISM LAB */}
        {studioMode === "rubinSim" && (
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { id: "mcar", name: "MCAR (Missing Completely at Random)", badge: "Stochastic Loss" },
                { id: "mar", name: "MAR (Missing at Random)", badge: "Observed Feature Dependency" },
                { id: "mnar", name: "MNAR (Missing Not at Random)", badge: "Self-Selective Truncation" },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedRubinMech(m.id)}
                  className={clsx(
                    "p-3.5 rounded-xl text-left border transition-all",
                    selectedRubinMech === m.id
                      ? "bg-cyan-600 border-cyan-400 text-white shadow-md shadow-cyan-600/30"
                      : "bg-slate-800/60 border-slate-700 text-slate-400 hover:text-white"
                  )}
                >
                  <div className="text-xs font-bold text-white">{m.name}</div>
                  <div className="text-[10px] text-cyan-300 mt-1">{m.badge}</div>
                </button>
              ))}
            </div>

            {/* Deep Dive Panel */}
            <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 space-y-4">
              {selectedRubinMech === "mcar" && (
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-emerald-400">MCAR Diagnostic Mechanics: P(M | Y) = P(M)</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Under MCAR, the missingness mechanism is completely independent of the observed data and the missing value itself. 
                    If you plot the observed distribution vs the true distribution, the shapes are statistically identical. 
                    Dropping missing rows does NOT bias parameter estimates (though it wastes valuable sample size).
                  </p>
                  <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 text-xs font-mono text-cyan-300">
                    Diagnostic Test: Little's MCAR Test (d^2 distance follows Chi-Square distribution). If p &gt; 0.05, MCAR is confirmed!
                  </div>
                </div>
              )}

              {selectedRubinMech === "mar" && (
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-amber-400">MAR Diagnostic Mechanics: P(M | Y) = P(M | Y_obs)</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Under MAR, missingness depends on an auxiliary feature that is observed. In SSKM Hospital, blood pressure 
                    measurements are missing primarily for patients with <strong className="text-white">Age &gt; 65</strong> who cannot 
                    walk to the examination room. Dropping rows with missing BP artificially purges elderly patients, biasing the model!
                  </p>
                  <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 text-xs font-mono text-cyan-300">
                    Remedy: Condition on observed Age using k-NN, MICE, or Grouped Median Imputation.
                  </div>
                </div>
              )}

              {selectedRubinMech === "mnar" && (
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-rose-400">MNAR Diagnostic Mechanics: P(M | Y) depends on Y_mis!</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Under MNAR, the value itself causes the missingness. In consumer credit and clinical trials, patients with 
                    highest income or most severe illness systematically refuse disclosure. Observed income displays a truncated 
                    distribution. Imputing with the observed median creates severe negative bias!
                  </p>
                  <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 text-xs font-mono text-cyan-300">
                    Remedy: Append a binary Missingness Indicator [X || was_missing_flag] so models learn the non-random signal.
                  </div>
                </div>
              )}
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
            Formal mathematical equations defining missingness probabilities, distance-weighted k-NN, and Rubin's pooling rules.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: k-NN Imputation */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-indigo-400 flex items-center gap-2">
              <span>📐</span> 1. Distance-Weighted k-NN Imputation
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-slate-300">
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <span className="text-xs font-bold text-cyan-300">Weighted Donor Estimator:</span>
                <div className="py-1">
                  <BlockMath math="\hat{y}_i = \frac{\sum_{k \in \mathcal{N}_i} w_k y_k}{\sum_{k \in \mathcal{N}_i} w_k}, \quad w_k = \frac{1}{d(\mathbf{x}_i^{\text{obs}}, \mathbf{x}_k^{\text{obs}})}" className="text-white" />
                </div>
                <p className="text-[11px] text-slate-400">
                  Estimates missing attribute y_i by borrowing proportionally from the k nearest donors who share observed coordinates.
                </p>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <span className="text-xs font-bold text-emerald-300">Adjusted Euclidean Distance:</span>
                <div className="py-1">
                  <BlockMath math="d(\mathbf{x}, \mathbf{z}) = \sqrt{ \frac{d_{\text{total}}}{d_{\text{obs}}} \sum_{j \in \text{obs}} (x_j - z_j)^2 }" className="text-white" />
                </div>
                <p className="text-[11px] text-slate-400">
                  Scales distance to account for instances that possess differing numbers of mutually observed features.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Rubin's Multiple Imputation */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-purple-400 flex items-center gap-2">
              <span>⚡</span> 2. Rubin's Variance Pooling Rules (MICE)
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-slate-300">
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <span className="text-xs font-bold text-amber-300">Total Variance Pooling Equation:</span>
                <div className="py-1">
                  <BlockMath math="T = \bar{U} + \left(1 + \frac{1}{M}\right) B" className="text-white" />
                </div>
                <p className="text-[11px] text-slate-400">
                  U_bar is average within-imputation variance; B is between-imputation variance measuring honest parameter uncertainty.
                </p>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <span className="text-xs font-bold text-purple-300">Compound Listwise Sample Loss:</span>
                <div className="py-1">
                  <BlockMath math="N_{\text{complete}} = N \prod_{j=1}^d (1 - p_j) \approx N(1 - p)^d" className="text-white" />
                </div>
                <p className="text-[11px] text-slate-400">
                  Proves why running dropna() across high-dimensional datasets destroys over 70% of collected records.
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
            Real enterprise missing value pipelines deployed across Kolkata, Rajarhat, and North 24 Parganas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Case 1 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400">CLINICAL TRIAGE</span>
              <span className="text-xs text-slate-500 font-mono">SSKM Hospital / Kolkata</span>
            </div>
            <h3 className="text-lg font-bold text-white">Emergency Triage Patient Vitals Imputation</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>The Problem:</strong> Emergency room patients arriving in critical distress have 28% missing vitals. 
              Elderly patients lack ambulatory blood pressure tests (MAR), and unconscious trauma victims cannot report pain levels (MNAR).
            </p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono text-cyan-300 space-y-1">
              <div>Engineering Solution:</div>
              <div className="text-slate-400">• Distance-weighted k-NN imputer (k=3) for physiological continuous vitals</div>
              <div className="text-slate-400">• Appended binary missingness indicator flags for subjective pain scales</div>
              <div className="text-slate-400">• Preserved emergency classification accuracy while preventing sample drop</div>
            </div>
          </div>

          {/* Case 2 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-400">ENERGY UTILITY TELEMETRY</span>
              <span className="text-xs text-slate-500 font-mono">WBSEDCL Smart Meter Grid</span>
            </div>
            <h3 className="text-lg font-bold text-white">Rajarhat Smart Meter Cellular Dropouts</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>The Problem:</strong> Thunderstorm lightning storms in the New Town / Rajarhat corridor cause cellular 
              gateway disconnects, creating 1-to-3 hour time-series telemetry gaps (MCAR).
            </p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono text-cyan-300 space-y-1">
              <div>Engineering Solution:</div>
              <div className="text-slate-400">• Forward-fill (LOCF) for small gaps &lt; 2 hours to leverage temporal autocorrelation</div>
              <div className="text-slate-400">• Cubic spline interpolation for gaps between 2 and 6 hours</div>
              <div className="text-slate-400">• Zero dropna() usage, preventing electricity billing disputes</div>
            </div>
          </div>

          {/* Case 3 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400">CONSUMER FINTECH</span>
              <span className="text-xs text-slate-500 font-mono">Salt Lake Sector V FinTech</span>
            </div>
            <h3 className="text-lg font-bold text-white">High-Income Non-Disclosure Under MNAR</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>The Problem:</strong> High-net-worth applicants in Salt Lake routinely refuse to disclose annual income. 
              Naively imputing median income (Rs 40,000) falsely penalized wealthy applicants with low credit limits.
            </p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono text-cyan-300 space-y-1">
              <div>Engineering Solution:</div>
              <div className="text-slate-400">• Generated `income_was_missing` binary shadow column</div>
              <div className="text-slate-400">• XGBoost learned that missing income was correlated with high investment wealth</div>
              <div className="text-slate-400">• Increased premium credit card approvals by 22% with zero default increase</div>
            </div>
          </div>

          {/* Case 4 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-400">PUBLIC HEALTH INFORMATICS</span>
              <span className="text-xs text-slate-500 font-mono">North 24 Parganas Public Survey</span>
            </div>
            <h3 className="text-lg font-bold text-white">Rural Household Non-Response Using MICE</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>The Problem:</strong> A district health survey across 50,000 rural families suffered 24% missingness 
              in sensitive diabetes and tuberculosis questions due to rural dialect barriers.
            </p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono text-cyan-300 space-y-1">
              <div>Engineering Solution:</div>
              <div className="text-slate-400">• MICE (IterativeImputer) using household size, location, and education</div>
              <div className="text-slate-400">• Generated 5 multiply-imputed completed datasets pooled with Rubin's rules</div>
              <div className="text-slate-400">• Recovered unbiased epidemiological disease prevalence rates</div>
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
              Test your understanding of missingness mechanisms, imputation leakage, and indicator patterns.
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
            Avoid the catastrophic silent mistakes that corrupt machine learning models in production.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="text-rose-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <span>⚠️</span> Pitfall 1: Imputing with Zero
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Filling missing physical quantities (such as Blood Pressure or Age) with <code className="text-rose-300 font-mono">0.0</code> creates 
              massive out-of-distribution leverage points that destroy gradient descent. Always use Median or k-NN!
            </p>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="text-rose-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <span>⚠️</span> Pitfall 2: Imputation Data Leakage
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Fitting an imputer on the full dataset before splitting leaks test set distributions into training weights. 
              Always fit imputers strictly on <code className="text-cyan-300 font-mono">X_train</code> and transform <code className="text-cyan-300 font-mono">X_test</code> with frozen parameters.
            </p>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="text-rose-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <span>⚠️</span> Pitfall 3: Ignoring MNAR Signals
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Treating all missingness as accidental destroys valuable non-random behavior signals. For MNAR features like income or 
              credit inquiries, always append a binary <code className="text-emerald-300 font-mono">was_missing</code> shadow column.
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
            Executable pure Python implementation of Missing Data Auditor, Univariate Imputer, Distance-Weighted k-NN Imputer, 
            and Rubin Missingness Benchmarking on SSKM hospital patient vitals.
          </p>
        </div>

        <PythonFileLoader
          code={labCode}
          fileName="handling_missing_values_lab.py"
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
            30 comprehensive questions and answers covering the Rubin taxonomy, k-NN imputation, MICE, and production engineering.
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
          fileName="topic8_handling_missing_values_handbook.txt"
        />
      </section>

      {/* ===================================================================== */}
      {/* SECTION 10: TEACHER SUKANTA HUI MENTOR NOTE */}
      {/* ===================================================================== */}
      <Teacher />
    </div>
  );
};

export default Topic8;
