import React, { useState, useId, useMemo, useEffect } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";
import { BlockMath, InlineMath } from "../../../../../common/MathView";

import labCode from "./topic26_files/master_quiz_and_certification_lab.py?raw";
import noteText from "./topic26_files/topic26_note.txt?raw";
import questions from "./topic26_files/topic26_questions.js";

// =============================================================================
// WEST BENGAL CANDIDATE COHORTS & MASTER COMPETENCY DOMAINS
// =============================================================================

const COMPETENCY_DOMAINS = [
  { id: "D1", name: "Stevens Measurement Taxonomy & Data Types", weight: 0.15, topics: "0-4" },
  { id: "D2", name: "Missing Data Remediation & Rubin's Taxonomy", weight: 0.20, topics: "5-9, 22" },
  { id: "D3", name: "Categorical Encoding & Matrix Singularity", weight: 0.20, topics: "10-14, 23" },
  { id: "D4", name: "Feature Scaling, Normalization & Outliers", weight: 0.20, topics: "15-18, 24" },
  { id: "D5", name: "Advanced Cleaning, Fuzzy Matching & Splitting", weight: 0.15, topics: "19-21, 25" },
  { id: "D6", name: "Pipeline Invariants & Production Deployment", weight: 0.10, topics: "All (Capstone)" }
];

const WB_CANDIDATE_COHORT = [
  { id: "C1", name: "Mamata", institution: "Barrackpore Academy", scores: { D1: 95, D2: 92, D3: 96, D4: 90, D5: 94, D6: 98 } },
  { id: "C2", name: "Mahima", institution: "Kolkata Tech Hub", scores: { D1: 88, D2: 94, D3: 90, D4: 86, D5: 92, D6: 90 } },
  { id: "C3", name: "Susmita", institution: "Ichapur FinTech Lab", scores: { D1: 92, D2: 85, D3: 88, D4: 94, D5: 82, D6: 89 } },
  { id: "C4", name: "Debangshu", institution: "Salt Lake Sector V", scores: { D1: 78, D2: 72, D3: 65, D4: 80, D5: 70, D6: 75 } },
  { id: "C5", name: "Abhronila", institution: "Jadavpur University", scores: { D1: 96, D2: 98, D3: 94, D4: 92, D5: 95, D6: 96 } },
  { id: "C6", name: "Rohan", institution: "Hooghly Engineering College", scores: { D1: 70, D2: 68, D3: 74, D4: 62, D5: 75, D6: 66 } },
  { id: "C7", name: "Subhajit", institution: "Siliguri Analytics Institute", scores: { D1: 85, D2: 80, D3: 82, D4: 78, D5: 84, D6: 82 } },
];

// =============================================================================
// MAIN COMPONENT: TOPIC 26 MASTERCLASS
// =============================================================================

const Topic26 = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const svgId = useId();

  // Studio Mode: "radar" | "timed_mock" | "dag_sequencer"
  const [studioMode, setStudioMode] = useState("radar");

  // Mode 1: Competency Radar State
  const [selectedCandidateId, setSelectedCandidateId] = useState("C1");
  const [customDomainScores, setCustomDomainScores] = useState({
    D1: 95, D2: 92, D3: 96, D4: 90, D5: 94, D6: 98
  });

  // When candidate changes, sync domain scores
  useEffect(() => {
    const cand = WB_CANDIDATE_COHORT.find(c => c.id === selectedCandidateId);
    if (cand) {
      setCustomDomainScores({ ...cand.scores });
    }
  }, [selectedCandidateId]);

  // Mode 2: Timed Mock Certification State
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(180); // 3-minute speed mock
  const [mockAnswers, setMockAnswers] = useState({});
  const [mockSubmitted, setMockSubmitted] = useState(false);
  const [candidateNameInput, setCandidateNameInput] = useState("Mamata Banerjee");

  useEffect(() => {
    let interval = null;
    if (timerActive && timeLeftSeconds > 0 && !mockSubmitted) {
      interval = setInterval(() => {
        setTimeLeftSeconds(prev => prev - 1);
      }, 1000);
    } else if (timeLeftSeconds === 0 && !mockSubmitted) {
      setMockSubmitted(true);
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeftSeconds, mockSubmitted]);

  // Mode 3: DAG Pipeline Flaw Injector State
  const [injectedFlaws, setInjectedFlaws] = useState({
    fitBeforeSplit: false,
    allDummyTrap: false,
    csrDensification: false,
    noColdStartGuard: false
  });

  // Jargon Glossary Filter
  const [jargonQuery, setJargonQuery] = useState("");

  // Diagnostic Quiz State
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Resource Tab
  const [resourceTab, setResourceTab] = useState("lab");

  // ---------------------------------------------------------------------------
  // COMPUTATIONS: COMPETENCY RADAR & CERTIFICATION
  // ---------------------------------------------------------------------------
  const certificationResults = useMemo(() => {
    let weightedSum = 0;
    const domainDetails = COMPETENCY_DOMAINS.map(d => {
      const raw = customDomainScores[d.id] ?? 0;
      const weighted = raw * d.weight;
      weightedSum += weighted;
      const status = raw >= 85 ? "Mastered" : raw >= 70 ? "Competent" : "Needs Review";
      return {
        ...d,
        raw,
        weighted: weighted.toFixed(2),
        status
      };
    });

    const finalPct = Math.round(weightedSum * 10) / 10;
    let tier = "Remediation Required (Uncertified)";
    let badgeColor = "bg-rose-500/20 text-rose-300 border-rose-500/40";
    if (finalPct >= 85.0) {
      tier = "First Class with Distinction (Honors)";
      badgeColor = "bg-emerald-500/20 text-emerald-300 border-emerald-500/40";
    } else if (finalPct >= 70.0) {
      tier = "Certified Preprocessing Practitioner (Pass)";
      badgeColor = "bg-indigo-500/20 text-indigo-300 border-indigo-500/40";
    }

    const remediationList = domainDetails
      .filter(d => d.raw < 75)
      .map(d => `Revisit Topics ${d.topics} to strengthen ${d.name} (Current: ${d.raw}%)`);

    return { finalPct, tier, badgeColor, domainDetails, remediationList };
  }, [customDomainScores]);

  // ---------------------------------------------------------------------------
  // COMPUTATIONS: DAG PIPELINE HEALTH
  // ---------------------------------------------------------------------------
  const pipelineHealth = useMemo(() => {
    let score = 100;
    const issues = [];

    if (injectedFlaws.fitBeforeSplit) {
      score -= 35;
      issues.push("CRITICAL DATA LEAKAGE: Transformers fitted before train_test_split() invalidate offline validation estimates!");
    }
    if (injectedFlaws.allDummyTrap) {
      score -= 30;
      issues.push("MATRIX SINGULARITY: Full one-hot encoding with intercept creates det(X^T X) = 0 and infinite condition number!");
    }
    if (injectedFlaws.csrDensification) {
      score -= 25;
      issues.push("FATAL OUT-OF-MEMORY: StandardScaler(with_mean=True) converts sparse CSR matrix into dense gigabyte array!");
    }
    if (injectedFlaws.noColdStartGuard) {
      score -= 20;
      issues.push("MICROSERVICE EXCEPTION: handle_unknown='error' crashes API server upon encountering novel category levels!");
    }

    const clampedScore = Math.max(0, score);
    const status = clampedScore >= 90 ? "Production-Ready Architecture" : clampedScore >= 60 ? "Degraded Pipeline" : "Fatal Architecture Collapse";
    return { score: clampedScore, status, issues };
  }, [injectedFlaws]);

  // ---------------------------------------------------------------------------
  // TIMED MOCK CERTIFICATION QUESTIONS (5 Core Capstone Scenarios)
  // ---------------------------------------------------------------------------
  const MOCK_QUESTIONS = [
    {
      id: "M1",
      scenario: "A fintech startup in Barrackpore trains a credit default model. The engineering team applies SimpleImputer(strategy='mean') and StandardScaler() across the complete database before performing a 5-fold cross-validation split. What mathematical flaw invalidates the system?",
      options: [
        { label: "A", text: "Computational latency only; validation scores remain unbiased." },
        { label: "B", text: "Fit-before-split data leakage: Test fold distributions bleed into training scalers, yielding optimistically biased offline scores." },
        { label: "C", text: "The dummy variable trap, causing gradient descent to fail." },
        { label: "D", text: "Covariate shift, converting continuous salary metrics into discrete ordinal ranks." }
      ],
      correct: "B",
      explanation: "Fitting transformers prior to cross-validation splits leaks future information about the test distribution into the training weights, violating the Fundamental Pipeline Invariant."
    },
    {
      id: "M2",
      scenario: "In an unregularized linear regression model with an intercept column, a nominal feature 'City' with 4 levels (Kolkata, Howrah, Siliguri, Durgapur) is encoded with 4 dummy columns. Why does ordinary least squares collapse?",
      options: [
        { label: "A", text: "The design matrix columns are orthogonal, producing identity matrices." },
        { label: "B", text: "The sum of all dummy columns identically equals the intercept column, yielding rank(X) <= 4 < 5, det(X^T X) = 0, and infinite condition number." },
        { label: "C", text: "The model runs out of GPU memory." },
        { label: "D", text: "The condition number kappa becomes zero." }
      ],
      correct: "B",
      explanation: "Because sum(d_k) = 1, perfect multicollinearity exists. The Gram matrix X^T X is rank-deficient and singular, making (X^T X)^(-1) undefined."
    },
    {
      id: "M3",
      scenario: "A retail database contains annual incomes ranging from ₹3.0 LPA to ₹120.0 LPA. Executive Subhajit earns ₹120.0 LPA. Why is RobustScaler mathematically superior to MinMaxScaler for KNN classification?",
      options: [
        { label: "A", text: "MinMaxScaler is non-differentiable." },
        { label: "B", text: "MinMaxScaler uses sample max which has a 0% breakdown point, crushing 90% of ordinary applicants into [0.0, 0.15], whereas RobustScaler uses Median (50% breakdown point) and IQR (25% breakdown point)." },
        { label: "C", text: "RobustScaler maps all values strictly to [-1, 1]." },
        { label: "D", text: "RobustScaler eliminates categorical cold-start exceptions." }
      ],
      correct: "B",
      explanation: "MinMaxScaler expands the denominator (x_max - x_min), compressing normal applicant variances. RobustScaler's IQR denominator is immune to extreme outliers in the tails."
    },
    {
      id: "M4",
      scenario: "A user submits 'barackpore' to a North 24 Parganas administrative portal. How does the Jaro-Winkler engine match it to 'Barrackpore' with a high score of ~0.979?",
      options: [
        { label: "A", text: "By converting both strings into ASCII bitvectors." },
        { label: "B", text: "High character overlap within matching window W plus Winkler's prefix scaling bonus l * p * (1 - d_j) for the 3 matching leading characters 'bar'." },
        { label: "C", text: "By using Euclidean distance on character counts." },
        { label: "D", text: "By translating both words to Bengali unicode glyphs." }
      ],
      correct: "B",
      explanation: "Winkler's prefix modification adds l * p * (1 - d_j) where l=3 common prefix characters, elevating the raw Jaro similarity d_j=0.970 to 0.9788 (~0.979)."
    },
    {
      id: "M5",
      scenario: "A production microservice processes incoming customer transactions from unseen postal towns using OneHotEncoder. What setting prevents runtime 500 server crashes?",
      options: [
        { label: "A", text: "handle_unknown='error'" },
        { label: "B", text: "handle_unknown='ignore', which maps unseen levels to an all-zeros vector that absorbs into the reference baseline." },
        { label: "C", text: "drop=None" },
        { label: "D", text: "sparse_output=False" }
      ],
      correct: "B",
      explanation: "handle_unknown='ignore' outputs an all-zeros dummy vector for unlisted tokens, allowing inference to default safely to the reference baseline without throwing exceptions."
    }
  ];

  const handleSelectMockOption = (qId, optionLabel) => {
    if (mockSubmitted) return;
    setMockAnswers(prev => ({ ...prev, [qId]: optionLabel }));
  };

  const mockScore = useMemo(() => {
    if (!mockSubmitted) return 0;
    let score = 0;
    MOCK_QUESTIONS.forEach(q => {
      if (mockAnswers[q.id] === q.correct) score++;
    });
    return score;
  }, [mockSubmitted, mockAnswers]);

  // ---------------------------------------------------------------------------
  // JARGON GLOSSARY
  // ---------------------------------------------------------------------------
  const JARGON_TERMS = [
    {
      term: "Fundamental Pipeline Invariant",
      definition: "The strict architectural rule requiring all parameters (mean, std, median, min, max, vocabularies) to be estimated strictly on X_train and applied to test/validation sets via transform() without refitting.",
      relevance: "Violating this invariant produces data leakage, inflating offline validation metrics while causing model collapse in production."
    },
    {
      term: "Gram Matrix Singularity (det(X^T X) = 0)",
      definition: "The mathematical condition where design matrix columns are linearly dependent, causing the square Gram matrix to have a zero determinant and infinite condition number.",
      relevance: "Ordinary least squares w = (X^T X)^(-1) X^T y collapses; resolved by dropping the reference category in one-hot encoding."
    },
    {
      term: "Breakdown Point (epsilon*)",
      definition: "The minimum fraction of arbitrary adversarial outlier contamination a statistical estimator can withstand before outputting an arbitrarily large or incorrect value.",
      relevance: "Mean and Variance have a 0% breakdown point, while Median has 50% and IQR has 25% breakdown points, making RobustScaler resilient."
    },
    {
      term: "Rubin's Missingness Taxonomy",
      definition: "Formal categorization of missing data mechanisms into MCAR (independent of all variables), MAR (dependent on observed covariates), and MNAR (dependent on unobserved value).",
      relevance: "Dictates whether listwise deletion introduces bias and whether stratified group imputation restores unbiasedness."
    },
    {
      term: "Distance Domination Ratio (rho)",
      definition: "The squared ratio between features of differing scales (Delta x_high)^2 / (Delta x_low)^2, which can exceed 10^10 in multi-dimensional Euclidean distance calculations.",
      relevance: "Causes KNN and K-Means to ignore low-magnitude features (like Age) in favor of high-magnitude features (like Income)."
    },
    {
      term: "Cold-Start Serving Guard",
      definition: "An encoding safety policy (e.g. handle_unknown='ignore') that maps novel, previously unseen categorical tokens at test time to an all-zeros representation rather than crashing.",
      relevance: "Prevents production microservice crashes when an applicant checks out from a previously unrecorded postal town."
    }
  ];

  const filteredJargon = useMemo(() => {
    if (!jargonQuery.trim()) return JARGON_TERMS;
    const q = jargonQuery.toLowerCase();
    return JARGON_TERMS.filter(
      item => item.term.toLowerCase().includes(q) || item.definition.toLowerCase().includes(q) || item.relevance.toLowerCase().includes(q)
    );
  }, [jargonQuery]);

  // ---------------------------------------------------------------------------
  // DIAGNOSTIC QUIZ QUESTIONS (5 Scenario-Based Viva Exam Questions)
  // ---------------------------------------------------------------------------
  const DIAGNOSTIC_QUESTIONS = [
    {
      id: 1,
      scenario: "During an audit of an automated underwriting system at Salt Lake Sector V, you discover that 'MinMaxScaler' was fitted on the entire 50,000-applicant database before an 80/20 train/test split. What catastrophic flaw exists?",
      options: [
        { label: "A", text: "Computational inefficiency only; mathematical expectations remain unbiased." },
        { label: "B", text: "Data leakage: The test set's maximum income leaked into X_train scaling parameters, producing optimistically biased validation scores." },
        { label: "C", text: "The dummy variable trap, causing gradient descent to oscillate indefinitely." },
        { label: "D", text: "Covariate shift, converting continuous salary metrics into discrete ordinal ranks." }
      ],
      correct: "B",
      explanation: "Fitting any preprocessing transformer across the full dataset before partitioning violates the Fundamental Pipeline Invariant. Information regarding test set extreme bounds leaks into training normalization, invalidating offline generalization estimates."
    },
    {
      id: 2,
      scenario: "In Rubin's taxonomy, high-earning executives withhold their salary due to income-tax sensitivity. Why is listwise deletion (dropping non-respondents) disastrous?",
      options: [
        { label: "A", text: "Because executive missingness is MCAR, dropping rows slows gradient descent." },
        { label: "B", text: "Because this represents an MNAR mechanism; dropping non-respondents systematically deletes the highest earners, truncating the distribution tail and causing severe survivor bias." },
        { label: "C", text: "Because listwise deletion converts design matrices into singular Gram matrices with det(X^T X) = 0." },
        { label: "D", text: "Because dropping rows causes the condition number kappa to become complex-valued." }
      ],
      correct: "B",
      explanation: "MNAR missingness depends on the unobserved value itself. Deleting non-respondents systematically deletes the highest earners, truncating the upper distribution tail and introducing severe downward bias into downstream predictive models."
    },
    {
      id: 3,
      scenario: "Why does applying StandardScaler(with_mean=True) to high-cardinality one-hot encoded sparse matrices cause fatal server crashes in production?",
      options: [
        { label: "A", text: "It causes eigenvalues to become negative." },
        { label: "B", text: "Sparse matrix densification: Subtracting a non-zero mean from structural zeroes converts the sparse CSR matrix into a dense array, triggering fatal Out-Of-Memory (OOM) crashes." },
        { label: "C", text: "It violates Stevens' ratio measurement scale." },
        { label: "D", text: "It causes Jaro-Winkler similarity to collapse to zero." }
      ],
      correct: "B",
      explanation: "Subtracting the mean from structural zero entries forces every zero to become non-zero, expanding the matrix footprint from megabytes to gigabytes and exhausting server RAM."
    },
    {
      id: 4,
      scenario: "Why does the sample median minimize L1 loss (Mean Absolute Error) while the arithmetic mean minimizes L2 loss (Mean Squared Error)?",
      options: [
        { label: "A", text: "The median derivative is sum(y - c) = 0 while the mean derivative is sum(y - c)^2 = 0." },
        { label: "B", text: "Taking the derivative of sum |y_i - c| yields sum sign(y_i - c) = 0, satisfied only when equal sample counts lie above and below c (the median); L2 derivative is 2*sum(y_i - c) = 0 (the mean)." },
        { label: "C", text: "Because L1 loss requires categorical variables." },
        { label: "D", text: "Because median is an interval statistic while mean is a nominal statistic." }
      ],
      correct: "B",
      explanation: "For L1 loss, each data point exerts equal gradient pull (+1 or -1) regardless of distance, so the minimum is at the 50th percentile. For L2 loss, each point exerts force proportional to its distance (2*(y_i - c)), heavily weighting outliers."
    },
    {
      id: 5,
      scenario: "Why does Bayesian target encoding with empirical Bayes m-estimate smoothing outperform raw category means on low-frequency levels?",
      options: [
        { label: "A", text: "It converts categoricals into continuous integers." },
        { label: "B", text: "It shrinks noisy category means toward the global target mean: S_c = (n_c * y_bar + m * mu) / (n_c + m), preventing overfitting on rare categories." },
        { label: "C", text: "It sets the determinant of the Gram matrix to zero." },
        { label: "D", text: "It eliminates the need for cross-validation." }
      ],
      correct: "B",
      explanation: "Categories with few samples have high variance. The m-estimate smoothly blends the category mean with the prior global mean, providing high stability on tail categories."
    }
  ];

  const handleSelectQuizOption = (questionId, optionLabel) => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({ ...prev, [questionId]: optionLabel }));
  };

  const handleQuizSubmit = () => {
    if (Object.keys(quizAnswers).length < DIAGNOSTIC_QUESTIONS.length) return;
    setQuizSubmitted(true);
  };

  const quizScore = useMemo(() => {
    if (!quizSubmitted) return 0;
    let score = 0;
    DIAGNOSTIC_QUESTIONS.forEach(q => {
      if (quizAnswers[q.id] === q.correct) score++;
    });
    return score;
  }, [quizSubmitted, quizAnswers]);

  return (
    <div className="space-y-12 text-slate-200 leading-relaxed max-w-7xl mx-auto pb-16 px-4 sm:px-6">
      {/* ===================================================================== */}
      {/* QUICK JUMP NAVIGATION BAR                                             */}
      {/* ===================================================================== */}
      <nav aria-label="Topic navigation" className="sticky top-4 z-50 bg-slate-900/90 backdrop-blur-md p-2.5 rounded-2xl border border-indigo-500/30 shadow-xl flex items-center justify-between gap-2 overflow-x-auto">
        <div className="flex items-center gap-2 pl-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 whitespace-nowrap">
            Topic 26 Capstone Exam
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-medium">
          {[
            { id: "hero", label: "Overview" },
            { id: "novice", label: "Novice" },
            { id: "studio", label: "Studio" },
            { id: "math", label: "Mathematics" },
            { id: "casestudies", label: "Cases" },
            { id: "quiz", label: "Assessment" },
            { id: "pitfalls", label: "Pitfalls" },
            { id: "loaders", label: "Laboratory" },
            { id: "faq", label: "Viva Q&A" }
          ].map(tab => (
            <a
              key={tab.id}
              href={`#${tab.id}`}
              onClick={() => setActiveSection(tab.id)}
              className={clsx(
                "px-3 py-1.5 rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer",
                activeSection === tab.id
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
              )}
            >
              {tab.label}
            </a>
          ))}
        </div>
      </nav>

      {/* ===================================================================== */}
      {/* 1. HERO SECTION                                                       */}
      {/* ===================================================================== */}
      <header id="hero" className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 sm:p-10 rounded-3xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              BCAC701B • Data Types and Preprocessing • Topic 26
            </span>
            <span className="px-3.5 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Master Certification &amp; Capstone
            </span>
            <span className="px-3.5 py-1 text-xs font-medium bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full">
              6 Preprocessing Competency Domains
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Master Assessment &amp; Certification Exam
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl leading-relaxed">
            The culminating capstone evaluation for the entire Data Types and Preprocessing curriculum.
            Assess theoretical mastery, mathematical derivations, algorithmic mechanics, and production pipeline
            architectures across all 26 topics with interactive competency radar analytics, timed mock certification,
            and DAG architecture stress-testing.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800/80">
            <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
              <div className="text-xs text-slate-400 font-medium">Domain 1 &amp; 2</div>
              <div className="text-sm sm:text-base font-bold text-indigo-300">Stevens &amp; Rubin</div>
              <div className="text-xs text-slate-500">Taxonomies &amp; Imputation</div>
            </div>
            <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
              <div className="text-xs text-slate-400 font-medium">Domain 3</div>
              <div className="text-sm sm:text-base font-bold text-cyan-300">Encoding &amp; Singularity</div>
              <div className="text-xs text-slate-500">{"det(X^T X)=0 & Target"}</div>
            </div>
            <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
              <div className="text-xs text-slate-400 font-medium">Domain 4</div>
              <div className="text-sm sm:text-base font-bold text-emerald-300">Scaling &amp; Outliers</div>
              <div className="text-xs text-slate-500">Breakdown Points &amp; KNN</div>
            </div>
            <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
              <div className="text-xs text-slate-400 font-medium">Domain 5 &amp; 6</div>
              <div className="text-sm sm:text-base font-bold text-amber-300">Pipeline Invariants</div>
              <div className="text-xs text-slate-500">Leakage &amp; Cold-Starts</div>
            </div>
          </div>
        </div>
      </header>

      {/* ===================================================================== */}
      {/* 2. NOVICE MASTERCLASS: METAPHORS, TAXONOMY, JARGON BUSTER              */}
      {/* ===================================================================== */}
      <section id="novice" className="space-y-8 bg-slate-900/50 p-6 sm:p-8 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Novice Masterclass Foundations
            </h2>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            The Complete Preprocessing Lifecycle in Production
          </h3>
          <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-4xl">
            Machine learning models are mathematical optimization engines that blindly trust the geometric and statistical
            properties of the input design matrix. If the preprocessing pipeline leaks test distributions, introduces matrix
            singularities, or crushes feature variance, no model architecture or hyperparameter search can salvage performance.
          </p>
        </div>

        {/* 3 Real-World Metaphors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/80 p-5 rounded-2xl border border-indigo-500/20 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-lg">
              🩺
            </div>
            <h4 className="text-base font-bold text-white">The Medical Board Licensing Exam</h4>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Before a doctor is licensed at RG Kar Medical College, they must demonstrate diagnostic competence across every human organ system. In machine learning, a data scientist must diagnose data flaws: identifying Stevens scale levels, categorizing Rubin missing mechanisms, and anticipating Dummy Variable Traps before writing code.
            </p>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-2xl border border-cyan-500/20 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-lg">
              🚂
            </div>
            <h4 className="text-base font-bold text-white">The Chittaranjan Locomotive Gate</h4>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              At the locomotive manufacturing works in Chittaranjan, electric rail engines undergo comprehensive multi-point load tests. Every axle must withstand dynamic torque without cracking. Similarly, an industrial preprocessing pipeline must withstand cold-start category tokens and out-of-bounds streaming numbers without crashing.
            </p>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-2xl border border-emerald-500/20 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg">
              ✈
            </div>
            <h4 className="text-base font-bold text-white">The Netaji Subhash Airport Simulator</h4>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Commercial airline pilots are tested in full-motion flight simulators on emergency engine failures and monsoon wind-shear over Dum Dum airport. Topic 26 serves as your flight simulator: verifying whether you can detect fit-before-split data leakage, resolve sparse matrix memory explosions, and prevent model crashes under pressure.
            </p>
          </div>
        </div>

        {/* 6-Domain Competency Framework Table */}
        <div className="space-y-4">
          <h4 className="text-base font-bold text-white">
            The 6 Preprocessing Competency Evaluation Domains
          </h4>
          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300">
              <thead className="bg-slate-950/80 text-slate-400 uppercase text-[11px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-3.5">Domain</th>
                  <th className="p-3.5">Competency Title</th>
                  <th className="p-3.5">Syllabus Scope</th>
                  <th className="p-3.5">Weight</th>
                  <th className="p-3.5">Core Invariant</th>
                  <th className="p-3.5">Production Failure Mode</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3.5 font-bold text-indigo-400">D1</td>
                  <td className="p-3.5 font-semibold text-white">Stevens Taxonomy &amp; Data Types</td>
                  <td className="p-3.5 text-slate-400">Topics 0-4</td>
                  <td className="p-3.5 font-mono text-cyan-300">15%</td>
                  <td className="p-3.5 font-mono text-emerald-300">f(x) Scale Admissibility</td>
                  <td className="p-3.5 text-rose-400">Spurious linear weights on nominal codes</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3.5 font-bold text-indigo-400">D2</td>
                  <td className="p-3.5 font-semibold text-white">Missing Data &amp; Rubin Taxonomy</td>
                  <td className="p-3.5 text-slate-400">Topics 5-9, 22</td>
                  <td className="p-3.5 font-mono text-cyan-300">20%</td>
                  <td className="p-3.5 font-mono text-emerald-300">P(M | Y_obs, Y_mis)</td>
                  <td className="p-3.5 text-rose-400">Survivor truncation bias under MNAR</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3.5 font-bold text-indigo-400">D3</td>
                  <td className="p-3.5 font-semibold text-white">Categorical Encoding &amp; Singularity</td>
                  <td className="p-3.5 text-slate-400">Topics 10-14, 23</td>
                  <td className="p-3.5 font-mono text-cyan-300">20%</td>
                  <td className="p-3.5 font-mono text-emerald-300">det(X^T X) &gt; 0 (Drop-First)</td>
                  <td className="p-3.5 text-rose-400">Dummy Variable Trap, OLS collapse</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3.5 font-bold text-indigo-400">D4</td>
                  <td className="p-3.5 font-semibold text-white">Scaling, Normalization &amp; Outliers</td>
                  <td className="p-3.5 text-slate-400">Topics 15-18, 24</td>
                  <td className="p-3.5 font-mono text-cyan-300">20%</td>
                  <td className="p-3.5 font-mono text-emerald-300">Breakdown Point &epsilon;*</td>
                  <td className="p-3.5 text-rose-400">Distance domination, outlier compression</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3.5 font-bold text-indigo-400">D5</td>
                  <td className="p-3.5 font-semibold text-white">Fuzzy Matching &amp; Entity Resolution</td>
                  <td className="p-3.5 text-slate-400">Topics 19-21, 25</td>
                  <td className="p-3.5 font-mono text-cyan-300">15%</td>
                  <td className="p-3.5 font-mono text-emerald-300">d_w = d_j + l*p*(1-d_j)</td>
                  <td className="p-3.5 text-rose-400">Sparse dummy explosion from dirty strings</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3.5 font-bold text-indigo-400">D6</td>
                  <td className="p-3.5 font-semibold text-white">Pipeline Invariants &amp; Deployment</td>
                  <td className="p-3.5 text-slate-400">All (Capstone)</td>
                  <td className="p-3.5 font-mono text-cyan-300">10%</td>
                  <td className="p-3.5 font-mono text-emerald-300">&theta; from X_train strictly</td>
                  <td className="p-3.5 text-rose-400">Fit-before-split data leakage, API 500 crash</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Interactive Jargon Buster */}
        <div className="space-y-4 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-base font-bold text-white">Master Assessment Jargon Glossary</h4>
              <p className="text-xs text-slate-400">Search core theoretical definitions across all 26 topics</p>
            </div>
            <input
              type="text"
              value={jargonQuery}
              onChange={(e) => setJargonQuery(e.target.value)}
              placeholder="Search terms (e.g. trap, breakdown, leakage)..."
              className="px-3.5 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 w-full sm:w-64"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredJargon.map((item, idx) => (
              <div key={idx} className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-2 hover:border-indigo-500/40 transition-colors">
                <div className="text-sm font-bold text-indigo-300">{item.term}</div>
                <div className="text-xs text-slate-300 leading-relaxed">{item.definition}</div>
                <div className="text-[11px] text-cyan-400/90 bg-cyan-950/30 px-2 py-1 rounded border border-cyan-800/30 font-medium">
                  {item.relevance}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 3. INTERACTIVE LABORATORY STUDIO (3 CAPSTONE MODES)                   */}
      {/* ===================================================================== */}
      <section id="studio" className="space-y-8 bg-slate-900/60 p-6 sm:p-8 rounded-3xl border border-indigo-900/40 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Interactive Certification Studio
              </h2>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              The Capstone Evaluation &amp; Pipeline Arena
            </h3>
          </div>

          {/* Mode Switcher */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "radar", label: "Mode 1: Competency Radar", badge: "Skill Matrix" },
              { id: "timed_mock", label: "Mode 2: Timed Mock Exam", badge: "Speed Test" },
              { id: "dag_sequencer", label: "Mode 3: Pipeline Flaw Injector", badge: "Stress Test" }
            ].map(m => (
              <button
                key={m.id}
                onClick={() => setStudioMode(m.id)}
                className={clsx(
                  "px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5",
                  studioMode === m.id
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700/60"
                )}
              >
                <span>{m.label}</span>
                <span className={clsx(
                  "text-[10px] px-1.5 py-0.5 rounded font-mono",
                  studioMode === m.id ? "bg-indigo-900/60 text-indigo-200" : "bg-slate-900 text-slate-400"
                )}>
                  {m.badge}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ------------------------------------------------------------------- */}
        {/* MODE 1: COMPETENCY RADAR & CERTIFICATION EVALUATION                 */}
        {/* ------------------------------------------------------------------- */}
        {studioMode === "radar" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-950/70 p-5 sm:p-6 rounded-2xl border border-indigo-500/30 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <span>Candidate Diagnostic Competency Radar</span>
                    <span className={clsx("text-xs px-2.5 py-0.5 rounded font-bold border", certificationResults.badgeColor)}>
                      {certificationResults.finalPct.toFixed(1)}% — {certificationResults.tier}
                    </span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Select a student candidate from West Bengal or adjust individual domain scores to compute weighted certification honors.
                  </p>
                </div>

                {/* Candidate Selector */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-medium whitespace-nowrap">Candidate:</span>
                  <select
                    value={selectedCandidateId}
                    onChange={(e) => setSelectedCandidateId(e.target.value)}
                    className="px-3 py-1.5 text-xs bg-slate-900 border border-indigo-500/40 rounded-xl text-white font-medium focus:outline-none focus:border-indigo-400 cursor-pointer"
                  >
                    {WB_CANDIDATE_COHORT.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.institution})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 6 Domain Score Sliders & Visual Bars */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certificationResults.domainDetails.map(d => (
                  <div key={d.id} className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-white">
                        [{d.id}] {d.name}
                      </span>
                      <span className="font-mono text-indigo-300 font-bold">
                        {d.raw}% (Weight: {(d.weight * 100).toFixed(0)}%)
                      </span>
                    </div>

                    <input
                      type="range"
                      min="40"
                      max="100"
                      step="1"
                      value={d.raw}
                      onChange={(e) => setCustomDomainScores(prev => ({
                        ...prev,
                        [d.id]: parseInt(e.target.value, 10)
                      }))}
                      className="w-full accent-indigo-500 cursor-pointer"
                    />

                    <div className="flex justify-between items-center text-[11px] text-slate-400">
                      <span>Weighted: +{d.weighted}%</span>
                      <span className={clsx(
                        "px-1.5 py-0.5 rounded text-[10px] font-semibold",
                        d.status === "Mastered" ? "text-emerald-400 bg-emerald-950/40" :
                        d.status === "Competent" ? "text-indigo-300 bg-indigo-950/40" :
                        "text-rose-400 bg-rose-950/40"
                      )}>
                        {d.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Remediation Plan Readout */}
              <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Targeted Remediation &amp; Syllabus Study Plan:
                </div>
                {certificationResults.remediationList.length === 0 ? (
                  <div className="text-xs text-emerald-400 font-medium">
                    ✓ Full Competency Achieved Across All 6 Domains! Eligible for First Class with Distinction Honors.
                  </div>
                ) : (
                  <ul className="text-xs text-slate-300 space-y-1 pl-4 list-disc">
                    {certificationResults.remediationList.map((plan, idx) => (
                      <li key={idx} className="text-amber-300/90">{plan}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* MODE 2: TIMED MOCK CERTIFICATION SIMULATOR                          */}
        {/* ------------------------------------------------------------------- */}
        {studioMode === "timed_mock" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-950/70 p-5 sm:p-6 rounded-2xl border border-cyan-500/30 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <span>3-Minute Speed Certification Simulator</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono">
                      Pass: 4/5 (80%)
                    </span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Test your speed and precision under exam pressure across 5 multi-domain scenario questions.
                  </p>
                </div>

                {/* Countdown Timer Display */}
                <div className="flex items-center gap-3">
                  <div className="bg-slate-900 px-3.5 py-1.5 rounded-xl border border-cyan-500/40 text-center">
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">Time Remaining</div>
                    <div className="font-mono text-lg font-bold text-cyan-300">
                      {Math.floor(timeLeftSeconds / 60)}:{(timeLeftSeconds % 60).toString().padStart(2, "0")}
                    </div>
                  </div>

                  {!timerActive && !mockSubmitted ? (
                    <button
                      onClick={() => setTimerActive(true)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
                    >
                      Start Timer
                    </button>
                  ) : timerActive ? (
                    <button
                      onClick={() => setTimerActive(false)}
                      className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
                    >
                      Pause
                    </button>
                  ) : null}
                </div>
              </div>

              {/* Questions List */}
              <div className="space-y-5">
                {MOCK_QUESTIONS.map((q, idx) => {
                  const selectedOpt = mockAnswers[q.id];
                  const isCorrect = selectedOpt === q.correct;

                  return (
                    <div key={q.id} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                      <div className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-md bg-cyan-900/60 text-cyan-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 font-mono">
                          {idx + 1}
                        </span>
                        <div className="text-xs sm:text-sm font-semibold text-slate-200 leading-relaxed">
                          {q.scenario}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-2 pl-7">
                        {q.options.map(opt => {
                          const isSelected = selectedOpt === opt.label;
                          let btnStyle = "bg-slate-900/90 border-slate-800 text-slate-300 hover:border-slate-700";

                          if (mockSubmitted) {
                            if (opt.label === q.correct) {
                              btnStyle = "bg-emerald-950/60 border-emerald-500 text-emerald-200 font-medium";
                            } else if (isSelected && !isCorrect) {
                              btnStyle = "bg-rose-950/60 border-rose-500 text-rose-200";
                            }
                          } else if (isSelected) {
                            btnStyle = "bg-cyan-950/70 border-cyan-500 text-cyan-200 font-medium";
                          }

                          return (
                            <button
                              key={opt.label}
                              disabled={mockSubmitted}
                              onClick={() => handleSelectMockOption(q.id, opt.label)}
                              className={clsx(
                                "w-full text-left p-2.5 rounded-lg border text-xs transition-all flex items-start gap-2 cursor-pointer",
                                btnStyle
                              )}
                            >
                              <span className="font-mono font-bold shrink-0">{opt.label}.</span>
                              <span>{opt.text}</span>
                            </button>
                          );
                        })}
                      </div>

                      {mockSubmitted && (
                        <div className="pl-7 pt-1">
                          <div className={clsx(
                            "p-2.5 rounded-lg text-xs leading-relaxed border",
                            isCorrect ? "bg-emerald-950/30 border-emerald-800/40 text-emerald-300" : "bg-rose-950/30 border-rose-800/40 text-rose-300"
                          )}>
                            <strong>{isCorrect ? "✓ Correct: " : `✗ Incorrect (Correct: ${q.correct}): `}</strong>
                            {q.explanation}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Submit & Certificate Generator */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Candidate Name for Certificate:</span>
                  <input
                    type="text"
                    value={candidateNameInput}
                    onChange={(e) => setCandidateNameInput(e.target.value)}
                    className="px-3 py-1 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white font-medium focus:outline-none focus:border-cyan-400"
                  />
                </div>

                {!mockSubmitted ? (
                  <button
                    onClick={() => {
                      setMockSubmitted(true);
                      setTimerActive(false);
                    }}
                    disabled={Object.keys(mockAnswers).length < MOCK_QUESTIONS.length}
                    className={clsx(
                      "px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md cursor-pointer",
                      Object.keys(mockAnswers).length === MOCK_QUESTIONS.length
                        ? "bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-600/30"
                        : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
                    )}
                  >
                    Submit Mock Exam
                  </button>
                ) : (
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-cyan-300">
                      Score: {mockScore} / {MOCK_QUESTIONS.length} ({mockScore >= 4 ? "PASSED WITH HONORS" : "FAILED — REVIEW SYLLABUS"})
                    </span>
                    <button
                      onClick={() => {
                        setMockSubmitted(false);
                        setMockAnswers({});
                        setTimeLeftSeconds(180);
                        setTimerActive(false);
                      }}
                      className="px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition-colors"
                    >
                      Reset Mock
                    </button>
                  </div>
                )}
              </div>

              {/* Live Rendered Certificate of Competency (If Passed) */}
              {mockSubmitted && mockScore >= 4 && (
                <div className="mt-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-2 border-amber-500/60 shadow-2xl text-center space-y-3 relative overflow-hidden">
                  <div className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                    Official Certificate of Master Competency
                  </div>
                  <h3 className="text-xl font-extrabold text-white">
                    Data Types and Preprocessing (BCAC701B)
                  </h3>
                  <div className="text-xs text-slate-300">
                    This certifies that <strong className="text-cyan-300 underline font-serif text-sm">{candidateNameInput}</strong> has successfully completed the rigorous 26-topic capstone assessment with a score of {((mockScore / 5) * 100).toFixed(0)}%.
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-slate-400 pt-2 border-t border-slate-800">
                    <span>Accreditation: MAKAUT Aligned Syllabus</span>
                    <span>Issued: Coder &amp; AccoTax AI Academy • Barrackpore</span>
                    <span>Verification: CERT-ML-2026-WB</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* MODE 3: DAG PIPELINE FLAW INJECTOR (STRESS TESTING)                */}
        {/* ------------------------------------------------------------------- */}
        {studioMode === "dag_sequencer" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-950/70 p-5 sm:p-6 rounded-2xl border border-emerald-500/30 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <span>Interactive DAG Pipeline Architecture Stress-Tester</span>
                    <span className={clsx(
                      "text-xs px-2.5 py-0.5 rounded font-mono font-bold border",
                      pipelineHealth.score >= 90 ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40" :
                      pipelineHealth.score >= 60 ? "bg-amber-500/20 text-amber-300 border-amber-500/40" :
                      "bg-rose-500/20 text-rose-300 border-rose-500/40"
                    )}>
                      Health: {pipelineHealth.score}/100 — {pipelineHealth.status}
                    </span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Toggle production anti-patterns to observe how architectural flaws destroy mathematical invariants.
                  </p>
                </div>
              </div>

              {/* 4 Injected Flaw Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => setInjectedFlaws(prev => ({ ...prev, fitBeforeSplit: !prev.fitBeforeSplit }))}
                  className={clsx(
                    "p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3",
                    injectedFlaws.fitBeforeSplit ? "bg-rose-950/50 border-rose-500 text-rose-200" : "bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700"
                  )}
                >
                  <span className="text-base font-mono font-bold mt-0.5">
                    {injectedFlaws.fitBeforeSplit ? "⚠" : "✓"}
                  </span>
                  <div>
                    <div className="text-xs font-bold">Sin 1: Fit-Before-Split Leakage</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {injectedFlaws.fitBeforeSplit ? "Active: Scaler fitted before train_test_split()!" : "Clean: Scalers fitted strictly on X_train."}
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setInjectedFlaws(prev => ({ ...prev, allDummyTrap: !prev.allDummyTrap }))}
                  className={clsx(
                    "p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3",
                    injectedFlaws.allDummyTrap ? "bg-rose-950/50 border-rose-500 text-rose-200" : "bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700"
                  )}
                >
                  <span className="text-base font-mono font-bold mt-0.5">
                    {injectedFlaws.allDummyTrap ? "⚠" : "✓"}
                  </span>
                  <div>
                    <div className="text-xs font-bold">Sin 3: The Dummy Variable Trap</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {injectedFlaws.allDummyTrap ? "Active: All K dummy columns + intercept (det=0)!" : "Clean: Drop-first reference dummy omitted."}
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setInjectedFlaws(prev => ({ ...prev, csrDensification: !prev.csrDensification }))}
                  className={clsx(
                    "p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3",
                    injectedFlaws.csrDensification ? "bg-rose-950/50 border-rose-500 text-rose-200" : "bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700"
                  )}
                >
                  <span className="text-base font-mono font-bold mt-0.5">
                    {injectedFlaws.csrDensification ? "⚠" : "✓"}
                  </span>
                  <div>
                    <div className="text-xs font-bold">Sin 2: Sparse Matrix Densification</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {injectedFlaws.csrDensification ? "Active: StandardScaler(with_mean=True) on CSR (OOM)!" : "Clean: with_mean=False preserves matrix sparsity."}
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setInjectedFlaws(prev => ({ ...prev, noColdStartGuard: !prev.noColdStartGuard }))}
                  className={clsx(
                    "p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3",
                    injectedFlaws.noColdStartGuard ? "bg-rose-950/50 border-rose-500 text-rose-200" : "bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700"
                  )}
                >
                  <span className="text-base font-mono font-bold mt-0.5">
                    {injectedFlaws.noColdStartGuard ? "⚠" : "✓"}
                  </span>
                  <div>
                    <div className="text-xs font-bold">Sin 4: Unhandled Cold-Start Tokens</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {injectedFlaws.noColdStartGuard ? "Active: handle_unknown='error' crashes API server!" : "Clean: handle_unknown='ignore' defaults to baseline."}
                    </div>
                  </div>
                </button>
              </div>

              {/* Real-time Diagnostics Log */}
              <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  Architectural Diagnostics &amp; Invariant Log:
                </div>
                {pipelineHealth.issues.length === 0 ? (
                  <div className="text-xs text-emerald-400 font-medium">
                    ✓ All 6 Pipeline Stages Pass Production Invariants! System is mathematically sound and memory safe.
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    {pipelineHealth.issues.map((issue, idx) => (
                      <div key={idx} className="text-xs text-rose-300 bg-rose-950/30 p-2 rounded border border-rose-800/30 font-mono">
                        {issue}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ===================================================================== */}
      {/* 4. MATHEMATICAL FORMULATIONS                                          */}
      {/* ===================================================================== */}
      <section id="math" className="space-y-8 bg-slate-900/50 p-6 sm:p-8 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-indigo-400" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Rigorous Mathematical Formulary
            </h2>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Core Analytical Formulations of Data Preprocessing
          </h3>
          <p className="text-sm text-slate-300 mt-1 max-w-4xl">
            A comprehensive reference of the key equations governing scales of measurement, missingness probability, matrix singularities, breakdown points, and fuzzy string similarity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-indigo-500/20 space-y-3">
            <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              1. Stevens Measurement Scale Admissibility
            </div>
            <div className="p-3 bg-slate-900/90 rounded-xl text-indigo-200 border border-indigo-900/40">
              <BlockMath math="\text{Ratio: } f(x) = cx, \quad \text{Interval: } f(x) = ax + b, \quad \text{Ordinal: } f(x_1) > f(x_2) \iff x_1 > x_2" />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Transformations on features must preserve their scale invariants. Multiplying nominal codes by weights is meaningless; Z-score standardization is strictly valid on interval and ratio scales.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-cyan-500/20 space-y-3">
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              2. Rubin Missingness &amp; Conditional Independence
            </div>
            <div className="p-3 bg-slate-900/90 rounded-xl text-cyan-200 border border-cyan-900/40">
              <BlockMath math="\text{MAR: } P(M \mid Y_{\text{obs}}, Y_{\text{mis}}) = P(M \mid Y_{\text{obs}}), \quad \text{MNAR: } P(M \mid Y) \neq P(M \mid Y_{\text{obs}})" />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Under MAR, conditioning on observed covariates restores unbiased estimation via stratified group medians. Under MNAR, listwise deletion deletes non-respondents, creating survivor truncation bias.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-emerald-500/20 space-y-3">
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              3. Dummy Variable Singularity Proof
            </div>
            <div className="p-3 bg-slate-900/90 rounded-xl text-emerald-200 border border-emerald-900/40">
              <BlockMath math="\sum_{k=1}^K \mathbf{d}_k = \mathbf{1} \implies 1 \cdot \mathbf{1} - \sum_{k=1}^K \mathbf{d}_k = \mathbf{0} \implies \det(X^T X) = 0" />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Because all dummy columns sum to the intercept column, column rank is deficient (rank(X) &le; K &lt; K+1). The Gram matrix cannot be inverted; solved by dropping the reference dummy column.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-amber-500/20 space-y-3">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              4. Breakdown Points &amp; Robust Scaling
            </div>
            <div className="p-3 bg-slate-900/90 rounded-xl text-amber-200 border border-amber-900/40">
              <BlockMath math="x_{\text{rob}} = \frac{x - \text{Median}}{\text{IQR}}, \quad \varepsilon^*_{\text{mean}} = 0\%, \; \varepsilon^*_{\text{median}} = 50\%, \; \varepsilon^*_{\text{IQR}} = 25\%" />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              While a single outlier destroys the mean and standard deviation, RobustScaler leverages the 50% breakdown point of the sample median and the 25% breakdown point of the IQR, preventing scale compression.
            </p>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 5. REGIONAL INDUSTRIAL CASE STUDIES                                   */}
      {/* ===================================================================== */}
      <section id="casestudies" className="space-y-8 bg-slate-900/50 p-6 sm:p-8 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              West Bengal Regional Capstone Deployments
            </h2>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Industrial Preprocessing Implementations
          </h3>
          <p className="text-sm text-slate-300 mt-1 max-w-4xl">
            Real-world deployments across fintech, commercial real estate, quick-commerce dark stores, and clinical healthcare systems in West Bengal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Case 1 */}
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Barrackpore &amp; Ichapur</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">FinTech Underwriting</span>
            </div>
            <h4 className="text-base font-bold text-white">NBFC Retail Loan Underwriting System</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Along Old Calcutta Road, applicants submitted handwritten addresses with frequent typos (&quot;barackpore&quot;, &quot;Ichhapore&quot;) and missing income slips. Deploying Jaro-Winkler entity resolution and stratified median imputation slashed loan approval turnaround time from 4 hours to 12 seconds, reducing 90-day NPA defaults by 24.2%.
            </p>
          </div>

          {/* Case 2 */}
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">New Town &amp; Rajarhat</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">Commercial Real Estate</span>
            </div>
            <h4 className="text-base font-bold text-white">Commercial Office Tower Lease Valuation</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tenant payroll declarations in New Town Action Area II suffered heavy Pareto skew (startups with ₹20L payroll vs multinational tech firms with ₹40 Crores). Unscaled gradients oscillated wildly with Hessian condition numbers &gt; 10^8. Implementing Log1p transformation followed by Z-Score standardization enabled smooth convergence in 130 epochs.
            </p>
          </div>

          {/* Case 3 */}
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Howrah &amp; Kalyani</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">Quick-Commerce Logistics</span>
            </div>
            <h4 className="text-base font-bold text-white">Dark Store Perishable Inventory Replenishment</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Predicting hourly dark store orders across 180+ postal wards caused severe Random Forest feature importance dilution under sparse one-hot dummy columns. Replaced OHE with Bayesian Target Encoding (m=5.0 smoothing), cutting LightGBM training latency by 74% and reducing stockouts by 18.6%.
            </p>
          </div>

          {/* Case 4 */}
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Siliguri &amp; Darjeeling</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">Clinical Triage</span>
            </div>
            <h4 className="text-base font-bold text-white">Tea Garden Health Screening Triage</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              In rural health centers, inconsistent clinical abbreviations and extreme scale differences between blood pressure and biomarker counts caused SVM models with RBF kernels to collapse completely. Standardization and fuzzy matching raised diagnostic triage sensitivity from 52% to 89.6%.
            </p>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 6. DIAGNOSTIC ASSESSMENT QUIZ                                         */}
      {/* ===================================================================== */}
      <section id="quiz" className="space-y-6 bg-slate-900/60 p-6 sm:p-8 rounded-3xl border border-indigo-900/30">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Diagnostic Master Verification
              </h2>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Topic 26 Capstone Diagnostic Quiz
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Answer all 5 multi-stage scenario questions to evaluate your engineering intuition.
            </p>
          </div>

          {quizSubmitted && (
            <div className="flex items-center gap-3 bg-slate-950 px-4 py-2 rounded-xl border border-indigo-500/40">
              <span className="text-xs text-slate-400">Your Score:</span>
              <span className="text-lg font-bold font-mono text-cyan-300">
                {quizScore} / {DIAGNOSTIC_QUESTIONS.length}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                {quizScore === 5 ? "Distinction" : quizScore >= 3 ? "Pass" : "Review Needed"}
              </span>
            </div>
          )}
        </div>

        <div className="space-y-5">
          {DIAGNOSTIC_QUESTIONS.map(q => {
            const isAnswered = quizAnswers[q.id] !== undefined;
            const selectedOpt = quizAnswers[q.id];
            const isCorrect = selectedOpt === q.correct;

            return (
              <div key={q.id} className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-4">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-lg bg-indigo-900/60 text-indigo-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 font-mono">
                    {q.id}
                  </span>
                  <div className="text-sm font-semibold text-slate-200 leading-relaxed">
                    {q.scenario}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2.5 pl-9">
                  {q.options.map(opt => {
                    const isSelected = selectedOpt === opt.label;
                    let btnStyle = "bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700";

                    if (quizSubmitted) {
                      if (opt.label === q.correct) {
                        btnStyle = "bg-emerald-950/60 border-emerald-500 text-emerald-200 font-medium";
                      } else if (isSelected && !isCorrect) {
                        btnStyle = "bg-rose-950/60 border-rose-500 text-rose-200";
                      }
                    } else if (isSelected) {
                      btnStyle = "bg-indigo-950/70 border-indigo-500 text-indigo-200 font-medium";
                    }

                    return (
                      <button
                        key={opt.label}
                        disabled={quizSubmitted}
                        onClick={() => handleSelectQuizOption(q.id, opt.label)}
                        className={clsx(
                          "w-full text-left p-3 rounded-xl border text-xs transition-all flex items-start gap-2.5 cursor-pointer",
                          btnStyle
                        )}
                      >
                        <span className="font-mono font-bold shrink-0">{opt.label}.</span>
                        <span>{opt.text}</span>
                      </button>
                    );
                  })}
                </div>

                {quizSubmitted && (
                  <div className="pl-9 pt-2">
                    <div className={clsx(
                      "p-3 rounded-xl text-xs leading-relaxed border",
                      isCorrect ? "bg-emerald-950/30 border-emerald-800/40 text-emerald-300" : "bg-rose-950/30 border-rose-800/40 text-rose-300"
                    )}>
                      <div className="font-bold mb-1">
                        {isCorrect ? "✓ Correct Analysis" : `✗ Incorrect (Correct Answer: ${q.correct})`}
                      </div>
                      <div className="text-slate-400">{q.explanation}</div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex justify-end pt-2">
          {!quizSubmitted ? (
            <button
              onClick={handleQuizSubmit}
              disabled={Object.keys(quizAnswers).length < DIAGNOSTIC_QUESTIONS.length}
              className={clsx(
                "px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-lg cursor-pointer",
                Object.keys(quizAnswers).length === DIAGNOSTIC_QUESTIONS.length
                  ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30"
                  : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
              )}
            >
              Submit Diagnostic Assessment
            </button>
          ) : (
            <button
              onClick={() => {
                setQuizAnswers({});
                setQuizSubmitted(false);
              }}
              className="px-5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
            >
              Reset Assessment
            </button>
          )}
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 7. PRODUCTION PITFALLS & ARCHITECTURAL VULNERABILITIES                */}
      {/* ===================================================================== */}
      <section id="pitfalls" className="space-y-6 bg-slate-900/50 p-6 sm:p-8 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-rose-400" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-rose-400">
              The 10 Deadly Pipeline Anti-Patterns
            </h2>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Architecture Hazards in End-to-End Preprocessing
          </h3>
          <p className="text-sm text-slate-300 mt-1 max-w-4xl">
            Critical production bugs that escape offline unit testing and trigger silent data corruption in production pipelines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-rose-500/20 space-y-2.5">
            <div className="text-xs font-bold text-rose-400 uppercase tracking-wider">
              Pitfall 1: Fit-Before-Split Data Leakage
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong className="text-slate-200">The Bug:</strong> Executing <code className="text-rose-300 font-mono">scaler.fit_transform(X)</code> on the entire dataset before calling <code className="text-rose-300 font-mono">train_test_split()</code>.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong className="text-slate-200">Consequence:</strong> Information regarding test set means, extremes, and distributions bleeds into training transformations, yielding artificially optimistic offline scores that collapse in production.
            </p>
            <p className="text-[11px] text-emerald-400 bg-emerald-950/30 p-2 rounded border border-emerald-800/30">
              <strong>Production Fix:</strong> Fit only on X_train. Transform X_test strictly using training parameters via scikit-learn Pipeline.
            </p>
          </div>

          <div className="bg-slate-950/80 p-5 rounded-2xl border border-rose-500/20 space-y-2.5">
            <div className="text-xs font-bold text-rose-400 uppercase tracking-wider">
              Pitfall 2: Sparse Matrix Densification (with_mean=True)
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong className="text-slate-200">The Bug:</strong> Applying <code className="text-rose-300 font-mono">StandardScaler(with_mean=True)</code> on large CSR matrices generated by high-cardinality One-Hot Encoding.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong className="text-slate-200">Consequence:</strong> Subtracting the mean from structural zero entries forces every zero to become non-zero, triggering catastrophic Out-Of-Memory (OOM) fatal crashes.
            </p>
            <p className="text-[11px] text-emerald-400 bg-emerald-950/30 p-2 rounded border border-emerald-800/30">
              <strong>Production Fix:</strong> Configure <code className="font-mono">StandardScaler(with_mean=False)</code> or deploy <code className="font-mono">MaxAbsScaler()</code>.
            </p>
          </div>

          <div className="bg-slate-950/80 p-5 rounded-2xl border border-rose-500/20 space-y-2.5">
            <div className="text-xs font-bold text-rose-400 uppercase tracking-wider">
              Pitfall 3: Silent Cold-Start Microservice Exceptions
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong className="text-slate-200">The Bug:</strong> Leaving default <code className="text-rose-300 font-mono">OneHotEncoder(handle_unknown=&apos;error&apos;)</code> active on production inference endpoints.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong className="text-slate-200">Consequence:</strong> The very first user registering from a previously unrecorded pin code crashes the payment checkout microservice with an unhandled exception.
            </p>
            <p className="text-[11px] text-emerald-400 bg-emerald-950/30 p-2 rounded border border-emerald-800/30">
              <strong>Production Fix:</strong> Enforce <code className="font-mono">handle_unknown=&apos;ignore&apos;</code> or bundle low-frequency tail categories into an &quot;Other&quot; bucket.
            </p>
          </div>

          <div className="bg-slate-950/80 p-5 rounded-2xl border border-rose-500/20 space-y-2.5">
            <div className="text-xs font-bold text-rose-400 uppercase tracking-wider">
              Pitfall 4: Redundant Normalization on Tree Ensembles
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong className="text-slate-200">The Bug:</strong> Standardizing or normalizing continuous features before passing them into XGBoost, LightGBM, or CatBoost.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong className="text-slate-200">Consequence:</strong> Adds unnecessary CPU overhead and floating-point roundoff errors with zero accuracy benefit, because decision trees split strictly on rank ordering.
            </p>
            <p className="text-[11px] text-emerald-400 bg-emerald-950/30 p-2 rounded border border-emerald-800/30">
              <strong>Production Fix:</strong> Reserve scaling for distance-based (KNN, K-Means, SVM) and gradient-based (Logistic Regression, Neural Nets) models.
            </p>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 8. CODE LABORATORY & STUDY NOTES LOADERS                              */}
      {/* ===================================================================== */}
      <section id="loaders" className="space-y-6 bg-slate-900/60 p-6 sm:p-8 rounded-3xl border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Verified Python Lab &amp; Study Notes
              </h2>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Executable Laboratory &amp; Comprehensive Handbook
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setResourceTab("lab")}
              className={clsx(
                "px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer",
                resourceTab === "lab"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "bg-slate-800 text-slate-400 hover:text-white"
              )}
            >
              Python Lab Code
            </button>
            <button
              onClick={() => setResourceTab("notes")}
              className={clsx(
                "px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer",
                resourceTab === "notes"
                  ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/30"
                  : "bg-slate-800 text-slate-400 hover:text-white"
              )}
            >
              Study Notes (Handbook)
            </button>
          </div>
        </div>

        {resourceTab === "lab" ? (
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>File: <code className="text-indigo-300 font-mono">master_quiz_and_certification_lab.py</code> (Exit Code 0 Verified)</span>
              <span>6 Preprocessing Competency Domains</span>
            </div>
            <PythonFileLoader
              code={labCode}
              fileName="master_quiz_and_certification_lab.py"
              title="Master Assessment Laboratory Benchmark"
            />
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>File: <code className="text-cyan-300 font-mono">topic26_note.txt</code></span>
              <span>275 Lines of Comprehensive Academic Notes</span>
            </div>
            <PlainTextPrint
              content={noteText}
              title="Topic 26 Academic Handbook &amp; Study Notes"
            />
          </div>
        )}
      </section>

      {/* ===================================================================== */}
      {/* 9. MAKAUT VIVA Q&A & TEACHER PROFILE                                  */}
      {/* ===================================================================== */}
      <section id="faq" className="space-y-8">
        <FAQTemplate
          title="Topic 26: MAKAUT Master Viva &amp; Certification Questions"
          subtitle="30 Graded Analytical Questions with Comprehensive Theoretical Rationales"
          questions={questions}
        />

        <Teacher />
      </section>
    </div>
  );
};

export default Topic26;
