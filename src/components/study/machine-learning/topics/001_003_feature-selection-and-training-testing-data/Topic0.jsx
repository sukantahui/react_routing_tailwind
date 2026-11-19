import React, { useState, useId, useMemo } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import labCode from "./topic0_files/meaning_of_features_and_target_lab.py?raw";
import noteText from "./topic0_files/topic0_note.txt?raw";
import questions from "./topic0_files/topic0_questions.js";

// =============================================================================
// WEST BENGAL STUDENT COHORT DATASET (SUPERVISED LEARNING BENCHMARK)
// =============================================================================

const WB_STUDENT_COHORT = [
  {
    id: "WB-STU-01",
    name: "Mamata",
    institution: "Barrackpore Academy",
    attendance: 94.0,
    internalMarks: 88.0,
    studyHours: 24.0,
    mockTests: 18,
    commuteMins: 25.0,
    interviewCleared: 1, // Target leakage proxy for placement
    semesterScore: 91.5, // Continuous Regression Target
    placementStatus: 1   // Binary Classification Target
  },
  {
    id: "WB-STU-02",
    name: "Mahima",
    institution: "Kolkata Tech Hub",
    attendance: 91.0,
    internalMarks: 85.0,
    studyHours: 22.0,
    mockTests: 15,
    commuteMins: 45.0,
    interviewCleared: 1,
    semesterScore: 87.0,
    placementStatus: 1
  },
  {
    id: "WB-STU-03",
    name: "Susmita",
    institution: "Ichapur FinTech Lab",
    attendance: 86.0,
    internalMarks: 78.0,
    studyHours: 18.0,
    mockTests: 12,
    commuteMins: 15.0,
    interviewCleared: 1,
    semesterScore: 82.5,
    placementStatus: 1
  },
  {
    id: "WB-STU-04",
    name: "Debangshu",
    institution: "Salt Lake Sector V",
    attendance: 68.0,
    internalMarks: 60.0,
    studyHours: 10.0,
    mockTests: 5,
    commuteMins: 60.0,
    interviewCleared: 0,
    semesterScore: 62.0,
    placementStatus: 0
  },
  {
    id: "WB-STU-05",
    name: "Abhronila",
    institution: "Jadavpur University",
    attendance: 96.0,
    internalMarks: 94.0,
    studyHours: 28.0,
    mockTests: 22,
    commuteMins: 30.0,
    interviewCleared: 1,
    semesterScore: 95.0,
    placementStatus: 1
  },
  {
    id: "WB-STU-06",
    name: "Rohan",
    institution: "Hooghly Engg College",
    attendance: 62.0,
    internalMarks: 54.0,
    studyHours: 8.0,
    mockTests: 4,
    commuteMins: 40.0,
    interviewCleared: 0,
    semesterScore: 56.0,
    placementStatus: 0
  },
  {
    id: "WB-STU-07",
    name: "Subhajit",
    institution: "Siliguri Analytics Inst",
    attendance: 78.0,
    internalMarks: 72.0,
    studyHours: 15.0,
    mockTests: 10,
    commuteMins: 20.0,
    interviewCleared: 1,
    semesterScore: 74.0,
    placementStatus: 1
  }
];

// Helper: Statistical Moments
function calcStats(arr) {
  if (!arr || arr.length === 0) return { mean: 0, variance: 0, std: 1 };
  const n = arr.length;
  const mean = arr.reduce((a, b) => a + b, 0) / n;
  const variance = n > 1 ? arr.reduce((acc, v) => acc + (v - mean) ** 2, 0) / (n - 1) : 0;
  const std = Math.sqrt(variance) || 1e-5;
  return { mean, variance, std };
}

// Helper: Pearson Correlation Coefficient
function calcPearson(xArr, yArr) {
  const n = xArr.length;
  if (n !== yArr.length || n < 2) return 0;
  const xStats = calcStats(xArr);
  const yStats = calcStats(yArr);
  let cov = 0;
  for (let i = 0; i < n; i++) {
    cov += (xArr[i] - xStats.mean) * (yArr[i] - yStats.mean);
  }
  const denom = (n - 1) * xStats.std * yStats.std;
  return denom === 0 ? 0 : cov / denom;
}

// =============================================================================
// MAIN COMPONENT: TOPIC 0 MASTERCLASS
// =============================================================================

const Topic0 = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const svgId = useId();

  // Studio Mode: "inspector" | "leakage" | "loss_surface"
  const [studioMode, setStudioMode] = useState("inspector");

  // Mode 1: Inspector State
  const [targetType, setTargetType] = useState("regression"); // "regression" | "classification"
  const [inspectedCandidateId, setInspectedCandidateId] = useState("WB-STU-01");

  // Mode 2: Leakage Arena State
  const [activeFeatures, setActiveFeatures] = useState({
    attendance: true,
    internalMarks: true,
    studyHours: true,
    mockTests: true,
    commuteMins: false,
    interviewCleared: false // The critical target leakage feature
  });

  // Mode 3: Conditional Expectation & Loss Surface State
  const [userSlope, setUserSlope] = useState(1.00);
  const [userIntercept, setUserIntercept] = useState(2.00);
  const [lossMetric, setLossMetric] = useState("l2"); // "l2" (MSE) | "l1" (MAE)

  // Jargon Glossary Filter
  const [jargonQuery, setJargonQuery] = useState("");

  // Diagnostic Quiz State
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Resource Tab
  const [resourceTab, setResourceTab] = useState("lab");

  // ---------------------------------------------------------------------------
  // COMPUTATIONS: MODE 1 (Feature vs Target Correlations)
  // ---------------------------------------------------------------------------
  const featureAudits = useMemo(() => {
    const yArr = WB_STUDENT_COHORT.map(s =>
      targetType === "regression" ? s.semesterScore : s.placementStatus
    );

    const featureKeys = [
      { key: "attendance", label: "Attendance (%)", unit: "%" },
      { key: "internalMarks", label: "Internal Marks", unit: "/100" },
      { key: "studyHours", label: "Weekly Study Hours", unit: "hrs" },
      { key: "mockTests", label: "Mock Tests Solved", unit: "tests" },
      { key: "commuteMins", label: "Commute Time", unit: "mins" },
      { key: "interviewCleared", label: "Interview Cleared (Flag)", unit: "0/1" }
    ];

    return featureKeys.map(f => {
      const xArr = WB_STUDENT_COHORT.map(s => s[f.key]);
      const stats = calcStats(xArr);
      const corr = calcPearson(xArr, yArr);

      let relevance = "Strong Predictor";
      let statusColor = "text-emerald-400 bg-emerald-950/40 border-emerald-800/40";
      let isLeakage = false;

      if (f.key === "interviewCleared" && targetType === "classification") {
        relevance = "CRITICAL TARGET LEAKAGE ⚠";
        statusColor = "text-rose-400 bg-rose-950/40 border-rose-800/40";
        isLeakage = true;
      } else if (Math.abs(corr) >= 0.85) {
        relevance = "Strong Predictor";
        statusColor = "text-emerald-400 bg-emerald-950/40 border-emerald-800/40";
      } else if (Math.abs(corr) >= 0.50) {
        relevance = "Moderate Predictor";
        statusColor = "text-indigo-300 bg-indigo-950/40 border-indigo-800/40";
      } else {
        relevance = "Weak / Noise Feature";
        statusColor = "text-slate-400 bg-slate-900 border-slate-800";
      }

      return {
        ...f,
        mean: stats.mean.toFixed(1),
        variance: stats.variance.toFixed(1),
        std: stats.std.toFixed(2),
        corr: corr.toFixed(4),
        absCorr: Math.abs(corr),
        relevance,
        statusColor,
        isLeakage
      };
    }).sort((a, b) => b.absCorr - a.absCorr);
  }, [targetType]);

  // ---------------------------------------------------------------------------
  // COMPUTATIONS: MODE 2 (Target Leakage Arena)
  // ---------------------------------------------------------------------------
  const leakageMetrics = useMemo(() => {
    const isLeakActive = activeFeatures.interviewCleared;
    let offlineR2 = 0.892;
    let onlineExpectedAcc = 0.854;

    if (isLeakActive) {
      offlineR2 = 0.999;
      onlineExpectedAcc = 0.512; // Collapses in production
    } else {
      // Calculate realistic combined R^2 based on active features
      let activeCount = Object.values(activeFeatures).filter(Boolean).length;
      if (activeCount === 0) offlineR2 = 0.0;
      else if (activeFeatures.internalMarks && activeFeatures.attendance) offlineR2 = 0.892;
      else if (activeFeatures.internalMarks) offlineR2 = 0.825;
      else offlineR2 = 0.650;
      onlineExpectedAcc = 0.840;
    }

    return { isLeakActive, offlineR2, onlineExpectedAcc };
  }, [activeFeatures]);

  // ---------------------------------------------------------------------------
  // COMPUTATIONS: MODE 3 (Loss Surface & Residuals)
  // ---------------------------------------------------------------------------
  const lossSurfaceMetrics = useMemo(() => {
    let sumSquaredLoss = 0;
    let sumAbsLoss = 0;
    const n = WB_STUDENT_COHORT.length;

    const yVals = WB_STUDENT_COHORT.map(s => s.semesterScore);
    const yMean = yVals.reduce((a, b) => a + b, 0) / n;
    const ssTotal = yVals.reduce((acc, y) => acc + (y - yMean) ** 2, 0);

    const points = WB_STUDENT_COHORT.map(s => {
      const pred = userIntercept + userSlope * s.internalMarks;
      const residual = s.semesterScore - pred;
      sumSquaredLoss += residual ** 2;
      sumAbsLoss += Math.abs(residual);
      return {
        ...s,
        pred,
        residual
      };
    });

    const mse = sumSquaredLoss / n;
    const mae = sumAbsLoss / n;
    const r2 = Math.max(0, 1.0 - (sumSquaredLoss / (ssTotal || 1)));

    return { points, mse, mae, r2 };
  }, [userSlope, userIntercept]);

  // ---------------------------------------------------------------------------
  // JARGON GLOSSARY
  // ---------------------------------------------------------------------------
  const JARGON_TERMS = [
    {
      term: "Feature Space (X)",
      definition: "The d-dimensional geometric space X subset of R^d containing all measurable explanatory covariates or predictors used to represent an entity.",
      relevance: "Defines the input domain for machine learning mapping functions f: X -> Y."
    },
    {
      term: "Target Space (Y)",
      definition: "The mathematical domain containing the dependent variable (ground truth label) that the model is tasked with predicting.",
      relevance: "Continuous R for regression; discrete {0, 1, ..., C-1} for classification."
    },
    {
      term: "Bayes Optimal Regressor",
      definition: "The theoretical upper bound on regression predictive fidelity under L2 squared error loss: f*(x) = E[Y | X = x].",
      relevance: "Approximating this conditional expectation is the fundamental objective of supervised learning."
    },
    {
      term: "Target Leakage",
      definition: "The catastrophic design flaw where an input feature contains information about the target that is unavailable at inference time in production.",
      relevance: "Generates artificially perfect offline validation metrics that collapse when deployed."
    },
    {
      term: "Temporal Precedence Invariant",
      definition: "The foundational causality rule requiring that every feature timestamp(x_j) must strictly precede the target timestamp(y).",
      relevance: "Eliminates post-event features and contemporaneous proxies from training data."
    },
    {
      term: "Empirical Risk Minimization (ERM)",
      definition: "The operational optimization framework that estimates the theoretical risk by minimizing the average loss across the training cohort: R_emp(f) = (1/N) sum L(f(x_i), y_i).",
      relevance: "The computational core of model fitting across linear regression, SVMs, and neural networks."
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
  // DIAGNOSTIC QUIZ QUESTIONS (5 Scenario-Based Assessment Questions)
  // ---------------------------------------------------------------------------
  const DIAGNOSTIC_QUESTIONS = [
    {
      id: 1,
      scenario: "During an audit of an automated underwriting system at a Salt Lake fintech startup, you discover that the model was trained using 'Account Sent to Collections Agency' as an input feature predicting 'Loan Default Status'. What catastrophic flaw exists?",
      options: [
        { label: "A", text: "Computational latency only; validation scores remain unbiased." },
        { label: "B", text: "Severe Target Leakage: Accounts are only sent to collections AFTER default has occurred. In production, new applicants have never been sent to collections, causing model collapse." },
        { label: "C", text: "The dummy variable trap, causing gradient descent to fail." },
        { label: "D", text: "Covariate shift, converting continuous salary metrics into discrete ordinal ranks." }
      ],
      correct: "B",
      explanation: "A feature that occurs contemporaneously with or after the target event constitutes severe target leakage. It produces near-perfect offline training accuracy but renders the model completely useless on new applicants."
    },
    {
      id: 2,
      scenario: "Why is a student's unique Database Registration ID or PAN Number strictly prohibited from being passed as an input feature into a Decision Tree?",
      options: [
        { label: "A", text: "Decision trees cannot process integers greater than 1000." },
        { label: "B", text: "Primary keys are unique non-generalizable identifiers; the tree creates pure leaf nodes by memorizing individual IDs, yielding 100% training accuracy but failing completely on unseen test IDs." },
        { label: "C", text: "Because primary keys have zero variance across instances." },
        { label: "D", text: "Because IDs violate Stevens' ratio measurement scale." }
      ],
      correct: "B",
      explanation: "Unique identifiers allow tree algorithms to memorize individual training rows without discovering generalizable patterns in the feature space. Unseen test IDs will be routed arbitrarily."
    },
    {
      id: 3,
      scenario: "Under squared error loss L(y, y_hat) = (y - y_hat)^2, what is the mathematically proven theoretical Bayes Optimal Predictor?",
      options: [
        { label: "A", text: "The sample mode of the feature space: Mode(X)." },
        { label: "B", text: "The conditional expectation of the target given the feature vector: f*(x) = E[Y | X = x]." },
        { label: "C", text: "The median of the unconditioned target distribution: Median(Y)." },
        { label: "D", text: "The inverse covariance matrix: (X^T X)^(-1)." }
      ],
      correct: "B",
      explanation: "Minimizing the expected squared prediction error E[(Y - f(X))^2] analytically yields the conditional expectation f*(x) = E[Y | X = x]. The remaining variance Var(Y | X) represents irreducible error."
    },
    {
      id: 4,
      scenario: "Why does Pearson's correlation coefficient r(x_j, y) sometimes fail to detect a feature that has a deterministic, 100% predictable relationship with the target?",
      options: [
        { label: "A", text: "Pearson correlation is strictly bounded between 0 and 1." },
        { label: "B", text: "Pearson correlation measures strictly linear relationships; non-linear symmetrical dependencies (e.g. y = x^2 centered at 0) yield r = 0 despite complete deterministic predictability." },
        { label: "C", text: "Because Pearson correlation requires categorical targets." },
        { label: "D", text: "Because correlation cannot be computed on continuous variables." }
      ],
      correct: "B",
      explanation: "Covariance between x and x^2 over a symmetric interval centered at zero is identically zero. While linear correlation is r = 0, Mutual Information I(X; Y) detects the strong non-linear dependency."
    },
    {
      id: 5,
      scenario: "In a production customer churn model, feature engineering aggregates each customer's 'Total Transaction Value over the Last 90 Days'. What subtle bug causes retrospective target leakage?",
      options: [
        { label: "A", text: "Using 90 days instead of 30 days." },
        { label: "B", text: "Calculating the 90-day window using data after the customer's churn date; churned customers naturally have zero spend post-churn, creating artificial leakage." },
        { label: "C", text: "Using sum instead of average." },
        { label: "D", text: "Normalizing transaction values using StandardScaler." }
      ],
      correct: "B",
      explanation: "If the aggregation window extends past the event date, the feature captures the consequence of the churn (zero transactions) rather than the predictive signal preceding it."
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
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 whitespace-nowrap">
            Topic 0 Ontology
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
              BCAC701B • Feature Selection &amp; Train/Test • Topic 0
            </span>
            <span className="px-3.5 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Foundational ML Ontology
            </span>
            <span className="px-3.5 py-1 text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Supervised Learning Framework
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Meaning of Features and Target
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl leading-relaxed">
            Establish the foundational epistemological boundary between the input Feature Space &Chi; &sube; &Ropf;<sup>d</sup> and the Target Space &Yopf;.
            Understand how supervised learning approximates the true conditional expectation &Eopf;[Y | X], differentiate continuous regression from discrete classification,
            quantify feature relevance hierarchies, and eliminate fatal target leakage across West Bengal industrial deployments.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800/80">
            <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
              <div className="text-xs text-slate-400 font-medium">Feature Space &Chi;</div>
              <div className="text-sm sm:text-base font-bold text-indigo-300">Design Matrix X &isin; &Ropf;<sup>N&times;d</sup></div>
              <div className="text-xs text-slate-500">Explanatory Covariates</div>
            </div>
            <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
              <div className="text-xs text-slate-400 font-medium">Target Space &Yopf;</div>
              <div className="text-sm sm:text-base font-bold text-cyan-300">Continuous vs Discrete</div>
              <div className="text-xs text-slate-500">Regression &amp; Classification</div>
            </div>
            <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
              <div className="text-xs text-slate-400 font-medium">Bayes Regressor</div>
              <div className="text-sm sm:text-base font-bold text-emerald-300">f*(x) = &Eopf;[Y | X=x]</div>
              <div className="text-xs text-slate-500">Empirical Risk Minimizer</div>
            </div>
            <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
              <div className="text-xs text-slate-400 font-medium">Cardinal Sin</div>
              <div className="text-sm sm:text-base font-bold text-rose-300">Target Leakage</div>
              <div className="text-xs text-slate-500">Post-Event Proxies</div>
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
            What is a Feature and What is a Target?
          </h3>
          <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-4xl">
            In traditional programming, you provide the recipe (rules) and ingredients (data) to bake a cake (output).
            In machine learning, you provide thousands of cakes and their ingredient lists, and the machine figures out the recipe.
            The ingredient measurements are the <strong className="text-indigo-300">Features</strong>; the cake quality is the <strong className="text-cyan-300">Target</strong>.
          </p>
        </div>

        {/* 3 Real-World Metaphors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/80 p-5 rounded-2xl border border-indigo-500/20 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-lg">
              🔍
            </div>
            <h4 className="text-base font-bold text-white">The Detective&apos;s Clues vs Verdict</h4>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              A detective at Lalbazar inspects crime scenes gathering clues: footprints, fingerprint smudges, CCTV timestamps, and cell tower pings. These clues are <code className="text-indigo-300 font-mono">Features (X)</code>. The final judicial verdict (Guilty vs Innocent) is the <code className="text-cyan-300 font-mono">Target (y)</code>. You cannot use the judge&apos;s future verdict as a clue to find the suspect!
            </p>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-2xl border border-cyan-500/20 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-lg">
              🚇
            </div>
            <h4 className="text-base font-bold text-white">The Metro Route vs Destination</h4>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Riding the East-West Green Line from Sector V, you pass through intermediate landmarks: Karunamoyee, Central Park, City Center, and Bengal Chemical. These navigational waypoints are <code className="text-indigo-300 font-mono">Features (X)</code>. The final terminal destination (Howrah Maidan) is the <code className="text-cyan-300 font-mono">Target (y)</code>.
            </p>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-2xl border border-emerald-500/20 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg">
              🩺
            </div>
            <h4 className="text-base font-bold text-white">The Blood Panel vs Diagnosis</h4>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              At a diagnostic lab in Barrackpore, a patient provides a blood sample. The automated analyzer measures Hemoglobin (13.5 g/dL), Fasting Blood Glucose (142 mg/dL), and HbA1c (7.2%). These clinical markers are <code className="text-indigo-300 font-mono">Features (X)</code>. The physician&apos;s diagnosis (Type-2 Diabetes: Positive) is the <code className="text-cyan-300 font-mono">Target (y)</code>.
            </p>
          </div>
        </div>

        {/* Feature vs Target Taxonomy Table */}
        <div className="space-y-4">
          <h4 className="text-base font-bold text-white">
            Core Ontological Comparison: Feature Space vs Target Space
          </h4>
          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300">
              <thead className="bg-slate-950/80 text-slate-400 uppercase text-[11px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-3.5">Property</th>
                  <th className="p-3.5">Feature Space (X)</th>
                  <th className="p-3.5">Target Space (y)</th>
                  <th className="p-3.5">Mathematical Formalism</th>
                  <th className="p-3.5">Architectural Boundary</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3.5 font-bold text-indigo-400">Ontological Role</td>
                  <td className="p-3.5 text-slate-200">Explanatory Inputs / Predictors</td>
                  <td className="p-3.5 text-cyan-300 font-semibold">Dependent Outcome / Label</td>
                  <td className="p-3.5 font-mono text-xs">{"X \\in \\mathbb{R}^{N \\times d}, \\; y \\in \\mathcal{Y}^N"}</td>
                  <td className="p-3.5 text-emerald-400">Strictly Separate</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3.5 font-bold text-indigo-400">Dimensionality</td>
                  <td className="p-3.5 text-slate-200">Multi-dimensional (d &ge; 1 columns)</td>
                  <td className="p-3.5 text-cyan-300 font-semibold">Univariate (1 column) or Vector</td>
                  <td className="p-3.5 font-mono text-xs">{"d \\text{ features per row}"}</td>
                  <td className="p-3.5 text-emerald-400">Matrix vs Vector</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3.5 font-bold text-indigo-400">Continuous Form</td>
                  <td className="p-3.5 text-slate-200">Continuous Real Values (Age, Income)</td>
                  <td className="p-3.5 text-cyan-300 font-semibold">Regression Target (y &isin; &Ropf;)</td>
                  <td className="p-3.5 font-mono text-xs">{"\\mathcal{L}(y, \\hat{y}) = (y - \\hat{y})^2"}</td>
                  <td className="p-3.5 text-emerald-400">L2 / L1 Loss Optimization</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3.5 font-bold text-indigo-400">Discrete Form</td>
                  <td className="p-3.5 text-slate-200">Categorical Encodings (One-Hot, Binary)</td>
                  <td className="p-3.5 text-cyan-300 font-semibold">Classification Target (y &isin; &#123;0, 1&#125;)</td>
                  <td className="p-3.5 font-mono text-xs">{"\\mathcal{L}_{\\text{CE}} = -[y\\log p + (1-y)\\log(1-p)]"}</td>
                  <td className="p-3.5 text-emerald-400">Cross-Entropy Loss</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3.5 font-bold text-indigo-400">Inference Availability</td>
                  <td className="p-3.5 text-slate-200">Must be 100% available at inference</td>
                  <td className="p-3.5 text-cyan-300 font-semibold">Unknown / Missing at inference time</td>
                  <td className="p-3.5 font-mono text-xs">{"\\text{timestamp}(x) < \\text{timestamp}(y)"}</td>
                  <td className="p-3.5 text-rose-400">Leakage if Available</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Interactive Jargon Buster */}
        <div className="space-y-4 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-base font-bold text-white">Interactive Jargon Glossary</h4>
              <p className="text-xs text-slate-400">Search key machine learning concepts and mathematical terms</p>
            </div>
            <input
              type="text"
              value={jargonQuery}
              onChange={(e) => setJargonQuery(e.target.value)}
              placeholder="Search terms (e.g. leakage, bayes, space)..."
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
      {/* 3. INTERACTIVE LABORATORY STUDIO (3 DYNAMIC MODES)                    */}
      {/* ===================================================================== */}
      <section id="studio" className="space-y-8 bg-slate-900/60 p-6 sm:p-8 rounded-3xl border border-indigo-900/40 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-ping" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                Interactive Engineering Studio
              </h2>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Feature-Target Diagnostics &amp; Leakage Sandbox
            </h3>
          </div>

          {/* Mode Switcher */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "inspector", label: "Mode 1: Feature vs Target Inspector", badge: "Pearson & Variance" },
              { id: "leakage", label: "Mode 2: Target Leakage Arena", badge: "Offline vs Online" },
              { id: "loss_surface", label: "Mode 3: Conditional Expectation", badge: "ERM Loss & Residuals" }
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
        {/* MODE 1: FEATURE VS TARGET INSPECTOR                                 */}
        {/* ------------------------------------------------------------------- */}
        {studioMode === "inspector" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-950/70 p-5 rounded-2xl border border-indigo-500/30 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <span>Feature Correlation &amp; Variance Audit</span>
                    <span className="text-xs px-2.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-mono">
                      Target: {targetType === "regression" ? "Semester Score % (Continuous R)" : "Placement Status (Discrete {0, 1})"}
                    </span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Observe how candidate features exhibit varying degrees of linear relevance (Pearson r) and variance across target modalities.
                  </p>
                </div>

                {/* Target Modality Toggle */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-medium">Target Modality:</span>
                  <button
                    onClick={() => setTargetType("regression")}
                    className={clsx(
                      "px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all",
                      targetType === "regression" ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30" : "bg-slate-800 text-slate-400 hover:text-white"
                    )}
                  >
                    Continuous (Regression)
                  </button>
                  <button
                    onClick={() => setTargetType("classification")}
                    className={clsx(
                      "px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all",
                      targetType === "classification" ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/30" : "bg-slate-800 text-slate-400 hover:text-white"
                    )}
                  >
                    Discrete (Classification)
                  </button>
                </div>
              </div>

              {/* Feature Ranking Table */}
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="p-3">Feature Name</th>
                      <th className="p-3">Sample Mean</th>
                      <th className="p-3">Variance (&sigma;<sup>2</sup>)</th>
                      <th className="p-3">Pearson Correlation (r)</th>
                      <th className="p-3">Relevance Verdict</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 bg-slate-950/40">
                    {featureAudits.map(f => (
                      <tr key={f.key} className="hover:bg-slate-900/40 transition-colors">
                        <td className="p-3 font-semibold text-white flex items-center gap-1.5">
                          <span>{f.label}</span>
                          <span className="text-[10px] text-slate-500 font-mono">({f.unit})</span>
                        </td>
                        <td className="p-3 font-mono text-slate-300">{f.mean}</td>
                        <td className="p-3 font-mono text-slate-300">{f.variance}</td>
                        <td className="p-3 font-mono">
                          <span className={clsx("font-bold", Math.abs(parseFloat(f.corr)) >= 0.85 ? "text-emerald-400" : Math.abs(parseFloat(f.corr)) >= 0.50 ? "text-indigo-300" : "text-slate-500")}>
                            {f.corr}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className={clsx("px-2 py-0.5 rounded text-[11px] font-semibold border", f.statusColor)}>
                            {f.relevance}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Cohort Explorer Card */}
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                    Inspect Observation Vector x<sub>i</sub> &isin; X:
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">Select Student:</span>
                    <select
                      value={inspectedCandidateId}
                      onChange={(e) => setInspectedCandidateId(e.target.value)}
                      className="px-2.5 py-1 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white font-medium focus:outline-none focus:border-cyan-400 cursor-pointer"
                    >
                      {WB_STUDENT_COHORT.map(s => (
                        <option key={s.id} value={s.id}>
                          {s.name} ({s.institution})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {(() => {
                  const student = WB_STUDENT_COHORT.find(s => s.id === inspectedCandidateId);
                  if (!student) return null;
                  return (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div className="p-2.5 rounded bg-slate-950 border border-slate-800/80">
                        <div className="text-[10px] text-slate-400">Attendance</div>
                        <div className="text-sm font-bold font-mono text-indigo-300">{student.attendance}%</div>
                      </div>
                      <div className="p-2.5 rounded bg-slate-950 border border-slate-800/80">
                        <div className="text-[10px] text-slate-400">Internal Marks</div>
                        <div className="text-sm font-bold font-mono text-indigo-300">{student.internalMarks}/100</div>
                      </div>
                      <div className="p-2.5 rounded bg-slate-950 border border-slate-800/80">
                        <div className="text-[10px] text-slate-400">Study Hours/Wk</div>
                        <div className="text-sm font-bold font-mono text-indigo-300">{student.studyHours} hrs</div>
                      </div>
                      <div className="p-2.5 rounded bg-slate-950 border border-slate-800/80">
                        <div className="text-[10px] text-slate-400">Semester Score (Target y)</div>
                        <div className="text-sm font-bold font-mono text-emerald-400">{student.semesterScore}%</div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* MODE 2: TARGET LEAKAGE ARENA                                        */}
        {/* ------------------------------------------------------------------- */}
        {studioMode === "leakage" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-950/70 p-5 rounded-2xl border border-rose-500/30 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <span>The Target Leakage Arena &amp; Proxy Simulator</span>
                    <span className={clsx(
                      "text-xs px-2.5 py-0.5 rounded font-mono font-bold border",
                      leakageMetrics.isLeakActive ? "bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse" : "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                    )}>
                      {leakageMetrics.isLeakActive ? "CRITICAL TARGET LEAKAGE ACTIVE ⚠" : "CLEAN FEATURE GATING ✓"}
                    </span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Toggle candidate features to observe how contemporaneous proxies create near-perfect offline metrics that fail online.
                  </p>
                </div>
              </div>

              {/* Feature Selection Toggles */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { key: "attendance", label: "Attendance (%)", desc: "Pre-exam historical record" },
                  { key: "internalMarks", label: "Internal Marks", desc: "Legitimate academic covariate" },
                  { key: "studyHours", label: "Study Hours Weekly", desc: "Self-reported student behavior" },
                  { key: "mockTests", label: "Mock Tests Solved", desc: "Practice exam preparation count" },
                  { key: "commuteMins", label: "Commute Time (Mins)", desc: "Low-signal noise feature" },
                  { key: "interviewCleared", label: "Interview Cleared (Flag)", desc: "⚠ Post-event target proxy!", isDangerous: true }
                ].map(f => (
                  <button
                    key={f.key}
                    onClick={() => setActiveFeatures(prev => ({ ...prev, [f.key]: !prev[f.key] }))}
                    className={clsx(
                      "p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between",
                      activeFeatures[f.key]
                        ? f.isDangerous
                          ? "bg-rose-950/60 border-rose-500 text-rose-200"
                          : "bg-indigo-950/60 border-indigo-500 text-indigo-200"
                        : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700"
                    )}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className="text-xs font-bold">{f.label}</span>
                      <span className="text-xs font-mono font-bold">
                        {activeFeatures[f.key] ? "ENABLED" : "OFF"}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1">{f.desc}</span>
                  </button>
                ))}
              </div>

              {/* Offline vs Online Performance Metrics Comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Offline Validation Score (R<sup>2</sup> / Accuracy)
                  </div>
                  <div className={clsx(
                    "text-2xl font-mono font-extrabold",
                    leakageMetrics.isLeakActive ? "text-rose-400" : "text-emerald-400"
                  )}>
                    {(leakageMetrics.offlineR2 * 100).toFixed(1)}%
                  </div>
                  <div className="text-xs text-slate-400 leading-relaxed">
                    {leakageMetrics.isLeakActive
                      ? "Unrealistically perfect score! The model learned the identity mapping from 'interview_cleared' to 'placement_status'."
                      : "Honest empirical generalization score achieved through causal predictive features."}
                  </div>
                </div>

                <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Live Production Generalization (True Accuracy)
                  </div>
                  <div className={clsx(
                    "text-2xl font-mono font-extrabold",
                    leakageMetrics.isLeakActive ? "text-rose-500" : "text-cyan-400"
                  )}>
                    {(leakageMetrics.onlineExpectedAcc * 100).toFixed(1)}%
                  </div>
                  <div className="text-xs text-slate-400 leading-relaxed">
                    {leakageMetrics.isLeakActive
                      ? "Catastrophic collapse! In real-time production, 'interview_cleared' has not occurred yet, collapsing predictions to random guessing."
                      : "Robust production stability: Model accurately identifies at-risk students before the semester concludes."}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* MODE 3: CONDITIONAL EXPECTATION & LOSS SURFACE                      */}
        {/* ------------------------------------------------------------------- */}
        {studioMode === "loss_surface" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-950/70 p-5 rounded-2xl border border-emerald-500/30 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <span>Conditional Expectation &amp; Empirical Risk Minimization</span>
                    <span className="text-xs px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono">
                      R<sup>2</sup>: {(lossSurfaceMetrics.r2 * 100).toFixed(1)}% | MSE: {lossSurfaceMetrics.mse.toFixed(2)}
                    </span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Adjust the linear hypothesis parameters w<sub>1</sub> (Slope) and w<sub>0</sub> (Intercept) to observe empirical loss minimization.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setUserSlope(1.0041);
                      setUserIntercept(2.11);
                    }}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all shadow-md cursor-pointer"
                  >
                    Auto-Fit OLS Optimal (w*)
                  </button>
                </div>
              </div>

              {/* Sliders for Slope and Intercept */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-300">Slope Parameter (w<sub>1</sub>):</span>
                    <span className="font-mono text-emerald-400 font-bold">{userSlope.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.40"
                    max="1.60"
                    step="0.01"
                    value={userSlope}
                    onChange={(e) => setUserSlope(parseFloat(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>

                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-300">Intercept Parameter (w<sub>0</sub>):</span>
                    <span className="font-mono text-indigo-400 font-bold">{userIntercept.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="-20.0"
                    max="30.0"
                    step="0.5"
                    value={userIntercept}
                    onChange={(e) => setUserIntercept(parseFloat(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                </div>
              </div>

              {/* Scatter Plot with Regression Line & Residual Connectors */}
              <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Feature X (Internal Marks) vs Target y (Semester Score %):
                </div>
                <div className="h-48 w-full relative bg-slate-950 rounded-xl overflow-hidden border border-slate-800/80">
                  <svg className="w-full h-full" viewBox="0 0 500 200">
                    {/* Grid lines */}
                    <line x1="40" y1="20" x2="480" y2="20" stroke="#334155" strokeDasharray="3 3" />
                    <line x1="40" y1="100" x2="480" y2="100" stroke="#334155" strokeDasharray="3 3" />
                    <line x1="40" y1="170" x2="480" y2="170" stroke="#475569" />
                    <line x1="40" y1="20" x2="40" y2="170" stroke="#475569" />

                    {/* Fitted Line */}
                    {(() => {
                      // Map Internal Marks [50, 100] to X [50, 470]
                      // Map Score [50, 100] to Y [170, 20]
                      const x1 = 50;
                      const y1 = userIntercept + userSlope * 50;
                      const x2 = 100;
                      const y2 = userIntercept + userSlope * 100;

                      const svgX1 = 40 + ((x1 - 50) / 50) * 430;
                      const svgY1 = 170 - ((y1 - 50) / 50) * 140;
                      const svgX2 = 40 + ((x2 - 50) / 50) * 430;
                      const svgY2 = 170 - ((y2 - 50) / 50) * 140;

                      return (
                        <line
                          x1={svgX1}
                          y1={svgY1}
                          x2={svgX2}
                          y2={svgY2}
                          stroke="#10b981"
                          strokeWidth="2.5"
                        />
                      );
                    })()}

                    {/* Data Points and Residual Lines */}
                    {lossSurfaceMetrics.points.map(p => {
                      const svgX = 40 + ((p.internalMarks - 50) / 50) * 430;
                      const svgYActual = 170 - ((p.semesterScore - 50) / 50) * 140;
                      const svgYPred = 170 - ((p.pred - 50) / 50) * 140;

                      return (
                        <g key={p.id}>
                          {/* Residual connector */}
                          <line
                            x1={svgX}
                            y1={svgYActual}
                            x2={svgX}
                            y2={svgYPred}
                            stroke="#f43f5e"
                            strokeWidth="1.5"
                            strokeDasharray="2 2"
                          />
                          {/* Actual point */}
                          <circle
                            cx={svgX}
                            cy={svgYActual}
                            r="4.5"
                            fill="#38bdf8"
                            stroke="#0284c7"
                            strokeWidth="1"
                          />
                        </g>
                      );
                    })}
                  </svg>
                </div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Internal: 50.0 Marks</span>
                  <span className="text-emerald-400 font-mono font-bold">
                    Hypothesis: y_hat = {userIntercept.toFixed(2)} + {userSlope.toFixed(2)} &times; Internal
                  </span>
                  <span>Internal: 100.0 Marks</span>
                </div>
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
            Formal Foundations of Supervised Learning
          </h3>
          <p className="text-sm text-slate-300 mt-1 max-w-4xl">
            A comprehensive reference of the key equations governing feature space geometry, conditional expectation, loss formulations, and causality invariants.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-indigo-500/20 space-y-3">
            <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              1. The Feature Space &amp; Design Matrix
            </div>
            <div className="p-3 bg-slate-900/90 rounded-xl font-mono text-xs text-indigo-200 border border-indigo-900/40">
              {"X = [\\mathbf{x}_1, \\mathbf{x}_2, \\dots, \\mathbf{x}_N]^T \\in \\mathbb{R}^{N \\times d}, \\quad \\mathbf{y} \\in \\mathcal{Y}^N"}
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every instance is a real vector x<sub>i</sub> &isin; &Ropf;<sup>d</sup>. The collection of N observations forms the design matrix X, while targets form vector y in continuous &Ropf; or discrete &#123;0, 1, ..., C-1&#125;.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-cyan-500/20 space-y-3">
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              2. The Bayes Optimal Regressor
            </div>
            <div className="p-3 bg-slate-900/90 rounded-xl font-mono text-xs text-cyan-200 border border-cyan-900/40">
              {"f^*(\mathbf{x}) = \\mathbb{E}[Y \\mid \\mathbf{X} = \\mathbf{x}] = \\int_{\\mathcal{Y}} y \\cdot P(y \\mid \\mathbf{x}) \\, dy"}
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Under squared error loss, the conditional expectation represents the theoretical best predictor. Any residual error Var(Y | X) is irreducible variance inherent to the phenomenon.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-emerald-500/20 space-y-3">
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              3. Empirical Risk Minimization (ERM)
            </div>
            <div className="p-3 bg-slate-900/90 rounded-xl font-mono text-xs text-emerald-200 border border-emerald-900/40">
              {"\\min_{f \\in \\mathcal{H}} \\left\\{ \\frac{1}{N} \\sum_{i=1}^N \\mathcal{L}(f(\\mathbf{x}_i), y_i) + \\lambda \\Omega(f) \\right\\}"}
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Supervised algorithms approximate theoretical risk by minimizing average empirical loss over training pairs, augmented by a structural complexity penalty &Omega;(f) to avoid overfitting.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-amber-500/20 space-y-3">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              4. The Temporal Precedence Invariant
            </div>
            <div className="p-3 bg-slate-900/90 rounded-xl font-mono text-xs text-amber-200 border border-amber-900/40">
              {"\\forall j \\in \\{1, \\dots, d\\}, \\quad \\text{timestamp}(x_{ij}) < \\text{timestamp}(y_i)"}
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              To eliminate target leakage, every feature must be generated strictly before the target outcome in physical time. Violating this invariant causes catastrophic offline-to-online collapse.
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
              West Bengal Regional Deployments
            </h2>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Industrial Feature &amp; Target Formulations
          </h3>
          <p className="text-sm text-slate-300 mt-1 max-w-4xl">
            Real-world deployments across academic analytics, commercial real estate, quick-commerce logistics, and clinical triage in West Bengal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Case 1 */}
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Barrackpore &amp; Ichapur</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">Academic Analytics</span>
            </div>
            <h4 className="text-base font-bold text-white">MAKAUT Semester &amp; Placement Predictor</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Predicting university semester percentage (continuous y<sub>1</sub>) and Tier-1 placement clearance (binary y<sub>2</sub>) across 1,200 MCA students. An early prototype included &quot;Drive Admit Card Issued&quot; as a feature, achieving 99.8% offline accuracy due to target leakage. Removing post-admit card variables yielded an honest, production-stable R<sup>2</sup> = 0.892.
            </p>
          </div>

          {/* Case 2 */}
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Salt Lake Sector V &amp; New Town</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">PropTech Valuation</span>
            </div>
            <h4 className="text-base font-bold text-white">Commercial Office Tower Lease Valuation</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Valuing office spaces in New Town Action Area I. Developers inadvertently included &quot;Security Deposit&quot; in the feature matrix. Because Bengal commercial leases legally mandate a deposit equal to exactly 6 months of base rent, the model learned the trivial identity y = Deposit / 6. Purging deposit inputs restored honest valuation with MAPE of 6.2%.
            </p>
          </div>

          {/* Case 3 */}
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Howrah &amp; Shibpur</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">Quick-Commerce Logistics</span>
            </div>
            <h4 className="text-base font-bold text-white">10-Minute Dark Store Delivery ETA Engine</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Predicting order delivery transit seconds across 20 dark stores. Developers inadvertently fed &quot;Rider Cash Collection Timestamp&quot; into features, making predictions impossible at customer checkout. Enforcing temporal feature gating restricted features to cart checkout time, lowering delivery variance by 24%.
            </p>
          </div>

          {/* Case 4 */}
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Kolkata &amp; Jadavpur</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">Clinical Emergency Triage</span>
            </div>
            <h4 className="text-base font-bold text-white">Cardiopulmonary ICU Admission Triage</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Predicting 24-hour ICU admission requirements for acute patients. Features like &quot;Intravenous Vasopressor Administered&quot; leaked the outcome because vasopressors are only started in ICU shock. Restricting inputs to baseline vital signs raised early sepsis detection sensitivity by 28.4%.
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
                Diagnostic Verification
              </h2>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Topic 0 Diagnostic Assessment Quiz
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
              Production Vulnerabilities &amp; Anti-Patterns
            </h2>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Architecture Hazards in Feature-Target Definitions
          </h3>
          <p className="text-sm text-slate-300 mt-1 max-w-4xl">
            Critical production bugs that escape offline unit testing and trigger silent model collapse upon live deployment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-rose-500/20 space-y-2.5">
            <div className="text-xs font-bold text-rose-400 uppercase tracking-wider">
              Pitfall 1: Contemporaneous Target Leakage
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong className="text-slate-200">The Bug:</strong> Passing features that are generated simultaneously with or after the target event occurs (e.g., &quot;Interview Cleared&quot; predicting &quot;Placement Status&quot;).
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong className="text-slate-200">Consequence:</strong> Artificially inflated offline test scores (R<sup>2</sup> &approx; 1.0) that collapse to random guessing in live production when predicting prospective entities.
            </p>
            <p className="text-[11px] text-emerald-400 bg-emerald-950/30 p-2 rounded border border-emerald-800/30">
              <strong>Production Fix:</strong> Enforce strict temporal gating: verify timestamp(x) &lt; timestamp(y) for all feature columns.
            </p>
          </div>

          <div className="bg-slate-950/80 p-5 rounded-2xl border border-rose-500/20 space-y-2.5">
            <div className="text-xs font-bold text-rose-400 uppercase tracking-wider">
              Pitfall 2: Identifier Memorization in Decision Trees
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong className="text-slate-200">The Bug:</strong> Retaining database primary keys, student registration numbers, or UUIDs inside feature matrix X.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong className="text-slate-200">Consequence:</strong> Tree models split on individual ID thresholds, memorizing training instances with 100% accuracy and failing completely on new unseen IDs.
            </p>
            <p className="text-[11px] text-emerald-400 bg-emerald-950/30 p-2 rounded border border-emerald-800/30">
              <strong>Production Fix:</strong> Automatically drop all high-cardinality unique identifier columns during feature engineering.
            </p>
          </div>

          <div className="bg-slate-950/80 p-5 rounded-2xl border border-rose-500/20 space-y-2.5">
            <div className="text-xs font-bold text-rose-400 uppercase tracking-wider">
              Pitfall 3: Leaking Target into Feature Imputation
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong className="text-slate-200">The Bug:</strong> Passing target column y into feature transformers like <code className="text-rose-300 font-mono">SimpleImputer()</code> or KNN imputers.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong className="text-slate-200">Consequence:</strong> Missing feature entries are reconstructed using ground truth labels, creating circular target leakage.
            </p>
            <p className="text-[11px] text-emerald-400 bg-emerald-950/30 p-2 rounded border border-emerald-800/30">
              <strong>Production Fix:</strong> Fit transformers strictly on X_train. Never pass target labels into feature transformation pipelines.
            </p>
          </div>

          <div className="bg-slate-950/80 p-5 rounded-2xl border border-rose-500/20 space-y-2.5">
            <div className="text-xs font-bold text-rose-400 uppercase tracking-wider">
              Pitfall 4: Metric Mismatch on Ordinal Targets
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong className="text-slate-200">The Bug:</strong> Treating multi-class ordered grades (A, B, C, D, F) as nominal categorical classes under 0-1 loss.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong className="text-slate-200">Consequence:</strong> Misclassifying an &apos;A&apos; student as &apos;F&apos; receives the exact same penalty as misclassifying &apos;A&apos; as &apos;B&apos;, discarding distance semantics.
            </p>
            <p className="text-[11px] text-emerald-400 bg-emerald-950/30 p-2 rounded border border-emerald-800/30">
              <strong>Production Fix:</strong> Deploy ordinal regression or continuous score modeling to preserve metric distance ordering.
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
              <span>File: <code className="text-indigo-300 font-mono">meaning_of_features_and_target_lab.py</code> (Exit Code 0 Verified)</span>
              <span>Pure Python Benchmark</span>
            </div>
            <PythonFileLoader
              code={labCode}
              fileName="meaning_of_features_and_target_lab.py"
              title="Meaning of Features and Target Laboratory"
            />
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>File: <code className="text-cyan-300 font-mono">topic0_note.txt</code></span>
              <span>275 Lines of Comprehensive Academic Notes</span>
            </div>
            <PlainTextPrint
              content={noteText}
              title="Topic 0 Academic Handbook &amp; Study Notes"
            />
          </div>
        )}
      </section>

      {/* ===================================================================== */}
      {/* 9. MAKAUT VIVA Q&A & TEACHER PROFILE                                  */}
      {/* ===================================================================== */}
      <section id="faq" className="space-y-8">
        <FAQTemplate
          title="Topic 0: MAKAUT Master Viva &amp; Technical Interview Questions"
          subtitle="30 Graded Analytical Questions with Comprehensive Theoretical Rationales"
          questions={questions}
        />

        <Teacher />
      </section>
    </div>
  );
};

export default Topic0;
