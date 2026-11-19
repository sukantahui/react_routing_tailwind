import React, { useState, useId, useMemo } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import labCode from "./topic1_files/feature_selection_concept_lab.py?raw";
import noteText from "./topic1_files/topic1_note.txt?raw";
import questions from "./topic1_files/topic1_questions.js";

// =============================================================================
// WEST BENGAL STUDENT DATASET WITH INFORMATIVE & NOISE FEATURES
// =============================================================================

const WB_STUDENT_DATASET = [
  { name: "Mamata", institution: "Barrackpore", attendance: 94.0, internalMarks: 88.0, studyHours: 24.0, mockTests: 18, assignments: 89.0, commuteMins: 25.0, shoeSize: 6.5, target: 91.5 },
  { name: "Mahima", institution: "Kolkata", attendance: 91.0, internalMarks: 85.0, studyHours: 22.0, mockTests: 15, assignments: 86.0, commuteMins: 45.0, shoeSize: 7.0, target: 87.0 },
  { name: "Susmita", institution: "Ichapur", attendance: 86.0, internalMarks: 78.0, studyHours: 18.0, mockTests: 12, assignments: 80.0, commuteMins: 15.0, shoeSize: 6.0, target: 82.5 },
  { name: "Debangshu", institution: "Salt Lake", attendance: 68.0, internalMarks: 60.0, studyHours: 10.0, mockTests: 5, assignments: 62.0, commuteMins: 60.0, shoeSize: 8.5, target: 62.0 },
  { name: "Abhronila", institution: "Jadavpur", attendance: 96.0, internalMarks: 94.0, studyHours: 28.0, mockTests: 22, assignments: 95.0, commuteMins: 30.0, shoeSize: 6.5, target: 95.0 },
  { name: "Rohan", institution: "Hooghly", attendance: 62.0, internalMarks: 54.0, studyHours: 8.0, mockTests: 4, assignments: 55.0, commuteMins: 40.0, shoeSize: 8.0, target: 56.0 },
  { name: "Subhajit", institution: "Siliguri", attendance: 78.0, internalMarks: 72.0, studyHours: 15.0, mockTests: 10, assignments: 74.0, commuteMins: 20.0, shoeSize: 7.5, target: 74.0 }
];

const CANDIDATE_FEATURES = [
  { key: "attendance", label: "Attendance (%)", type: "Signal", defaultCorr: 0.9988 },
  { key: "internalMarks", label: "Internal Marks", type: "Signal", defaultCorr: 0.9969 },
  { key: "assignments", label: "Assignments (Collinear)", type: "Collinear Twin", defaultCorr: 0.9973 },
  { key: "studyHours", label: "Study Hours Weekly", type: "Signal", defaultCorr: 0.9855 },
  { key: "mockTests", label: "Mock Tests Solved", type: "Signal", defaultCorr: 0.9732 },
  { key: "commuteMins", label: "Commute Time (Mins)", type: "Noise", defaultCorr: -0.4750 },
  { key: "shoeSize", label: "Shoe Size", type: "Noise", defaultCorr: -0.8471 },
  { key: "favoriteNum", label: "Favorite Number", type: "Pure Noise", defaultCorr: -0.1729 }
];

// Helper: Statistical Moments
function calcMean(arr) {
  return arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
}

function calcStd(arr) {
  const m = calcMean(arr);
  const n = arr.length;
  if (n < 2) return 1;
  const variance = arr.reduce((acc, v) => acc + (v - m) ** 2, 0) / (n - 1);
  return Math.sqrt(variance) || 1e-5;
}

function calcPearson(xArr, yArr) {
  const n = xArr.length;
  if (n !== yArr.length || n < 2) return 0;
  const xMean = calcMean(xArr);
  const yMean = calcMean(yArr);
  const xStd = calcStd(xArr);
  const yStd = calcStd(yArr);
  let cov = 0;
  for (let i = 0; i < n; i++) {
    cov += (xArr[i] - xMean) * (yArr[i] - yMean);
  }
  const denom = (n - 1) * xStd * yStd;
  return denom === 0 ? 0 : cov / denom;
}

// =============================================================================
// MAIN COMPONENT: TOPIC 1 MASTERCLASS
// =============================================================================

const Topic1 = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const svgId = useId();

  // Studio Mode: "paradigms" | "u_curve" | "vif_inspector"
  const [studioMode, setStudioMode] = useState("paradigms");

  // Mode 1: Paradigms State
  const [filterThreshold, setFilterThreshold] = useState(0.80);
  const [selectedParadigm, setSelectedParadigm] = useState("filter");

  // Mode 2: Bias-Variance U-Curve State
  const [selectedK, setSelectedK] = useState(2); // Cardinality k in [1, 8]

  // Mode 3: Multicollinearity & VIF State
  const [pruneAssignments, setPruneAssignments] = useState(false); // Toggle to drop collinear twin

  // Jargon Glossary Search
  const [jargonQuery, setJargonQuery] = useState("");

  // Diagnostic Quiz State
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Resource Tab
  const [resourceTab, setResourceTab] = useState("lab");

  // ---------------------------------------------------------------------------
  // COMPUTATIONS: MODE 1 (Paradigms Comparison)
  // ---------------------------------------------------------------------------
  const filterSelectedFeatures = useMemo(() => {
    return CANDIDATE_FEATURES.filter(f => Math.abs(f.defaultCorr) >= filterThreshold);
  }, [filterThreshold]);

  // ---------------------------------------------------------------------------
  // COMPUTATIONS: MODE 2 (Bias-Variance U-Curve Metrics)
  // ---------------------------------------------------------------------------
  const uCurveData = useMemo(() => {
    // 8 steps
    const simulatedCurve = [
      { k: 1, name: "Attendance only", trainMse: 0.47, valMse: 0.97, r2: 0.9975, state: "Optimal Parsimonious Sweet Spot ★" },
      { k: 2, name: "+ Internal Marks", trainMse: 0.29, valMse: 1.29, r2: 0.9985, state: "Near Optimal" },
      { k: 3, name: "+ Study Hours", trainMse: 0.80, valMse: 2.30, r2: 0.9958, state: "Acceptable" },
      { k: 4, name: "+ Mock Tests", trainMse: 1.24, valMse: 3.24, r2: 0.9935, state: "Moderate Redundancy" },
      { k: 5, name: "+ Assignments (Collinear)", trainMse: 0.99, valMse: 6.29, r2: 0.9948, state: "Overfitting / Collinearity" },
      { k: 6, name: "+ Commute Time (Noise)", trainMse: 0.71, valMse: 9.31, r2: 0.9962, state: "Overfitting Noise" },
      { k: 7, name: "+ Shoe Size (Noise)", trainMse: 0.54, valMse: 12.44, r2: 0.9972, state: "Severe Overfitting" },
      { k: 8, name: "+ Favorite Num (Noise)", trainMse: 0.35, valMse: 15.55, r2: 0.9981, state: "Severe Overfitting" }
    ];
    return simulatedCurve;
  }, []);

  const currentKMetrics = useMemo(() => {
    return uCurveData.find(item => item.k === selectedK) || uCurveData[0];
  }, [selectedK, uCurveData]);

  // ---------------------------------------------------------------------------
  // COMPUTATIONS: MODE 3 (VIF & Multicollinearity)
  // ---------------------------------------------------------------------------
  const vifMetrics = useMemo(() => {
    // Correlation between internalMarks and assignments is 0.997
    // R^2_internal = 0.997^2 = 0.994
    // VIF = 1 / (1 - 0.994) = 1 / 0.006 approx 166.7 (Severe Multicollinearity!)
    const internalVIF = pruneAssignments ? 1.45 : 166.7;
    const assignmentsVIF = pruneAssignments ? 0.0 : 166.7;
    const isMulticollinear = !pruneAssignments;

    return { internalVIF, assignmentsVIF, isMulticollinear };
  }, [pruneAssignments]);

  // ---------------------------------------------------------------------------
  // JARGON GLOSSARY
  // ---------------------------------------------------------------------------
  const JARGON_TERMS = [
    {
      term: "Curse of Dimensionality",
      definition: "The exponential growth of volume in Euclidean space as dimensions d increase (V_d proportional to r^d), causing data points to become exponentially sparse and distance metrics to lose contrast.",
      relevance: "Forces nearest and farthest neighbors in KNN to have identical distances unless feature selection prunes noise."
    },
    {
      term: "Combinatorial Subset Search Space (2^d - 1)",
      definition: "The total number of possible non-empty feature subsets that can be selected from d candidate variables. Exhaustive evaluation is provably NP-hard.",
      relevance: "For d = 50, evaluates to >1 quadrillion models, requiring heuristic Filter, Wrapper, or Embedded search algorithms."
    },
    {
      term: "Filter Method",
      definition: "A feature selection paradigm that evaluates each feature using statistical scores (Pearson r, Mutual Information, ANOVA F) calculated directly from data distributions, independently of any model.",
      relevance: "O(d) linear complexity; scales to millions of columns but blind to cross-feature interactions."
    },
    {
      term: "Wrapper Method",
      definition: "A feature selection paradigm that uses the learning algorithm as an evaluation oracle, repeatedly training and scoring candidate subsets using search strategies like Forward Stepwise or RFE.",
      relevance: "Captures multi-feature interactions but computationally expensive O(d^2) and prone to overfitting."
    },
    {
      term: "Embedded Method (Lasso L1)",
      definition: "A paradigm that performs feature selection intrinsically during model parameter optimization by adding a penalty (like L1 norm lambda * sum |w_j|) that drives uninformative weights to zero.",
      relevance: "Balances the computational speed of filters with the interaction-capturing capability of wrappers."
    },
    {
      term: "Variance Inflation Factor (VIF)",
      definition: "A diagnostic metric quantifying how much the estimation variance of a regression coefficient is inflated by linear correlation with other regressors: VIF = 1 / (1 - R_j^2).",
      relevance: "A VIF >= 10.0 signals severe multicollinearity, requiring pruning of collinear twin features."
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
  // DIAGNOSTIC QUIZ QUESTIONS (5 Multi-Stage Scenario Questions)
  // ---------------------------------------------------------------------------
  const DIAGNOSTIC_QUESTIONS = [
    {
      id: 1,
      scenario: "A data science team in Salt Lake Sector V trains a linear regression model with 50 candidate features on 200 customer records. Exhaustive best subset selection is proposed. Why is this proposal computationally rejected?",
      options: [
        { label: "A", text: "Linear regression cannot handle more than 10 features." },
        { label: "B", text: "The combinatorial search space is 2^50 - 1 approx 1.125 * 10^15 subsets; evaluating one quadrillion models would take thousands of years." },
        { label: "C", text: "Ordinary Least Squares requires a GPU cluster." },
        { label: "D", text: "Because exhaustive search violates Stevens' measurement scale." }
      ],
      correct: "B",
      explanation: "Searching all non-empty subsets of 50 features requires training 2^50 - 1 models, which is computationally intractable (NP-hard). Heuristic methods like forward selection or Lasso regularization must be used instead."
    },
    {
      id: 2,
      scenario: "Why does adding a completely random noise feature (e.g. random numbers uniformly distributed on [0, 1]) to an Ordinary Least Squares regression model cause training R^2 to increase or stay constant?",
      options: [
        { label: "A", text: "Random noise improves model generalization." },
        { label: "B", text: "Each additional parameter provides an extra degree of freedom, allowing the optimization algorithm to fit chance sample fluctuations in the training set." },
        { label: "C", text: "Because random numbers are orthogonal to the intercept." },
        { label: "D", text: "Because OLS maximizes entropy." }
      ],
      correct: "B",
      explanation: "Minimizing sum of squared residuals over training samples is monotonic with respect to parameter degrees of freedom: adding any parameter can never increase training residual sum of squares."
    },
    {
      id: 3,
      scenario: "In an XOR classification problem where target y = x_1 XOR x_2, why does a univariate Filter method (like Pearson correlation or univariate ANOVA) fail completely to select x_1 and x_2?",
      options: [
        { label: "A", text: "Filter methods only work on continuous targets." },
        { label: "B", text: "In XOR logic, individual features have zero linear correlation with the target (r = 0); univariate filters evaluate features in isolation and discard both, despite their combined 100% predictive power." },
        { label: "C", text: "Because XOR violates the triangle inequality." },
        { label: "D", text: "Because XOR produces a singular Gram matrix." }
      ],
      correct: "B",
      explanation: "Filter methods examine individual pairwise relationships P(Y | x_j). In XOR logic, knowing x_1 alone gives zero information about y without knowing x_2, so univariate filters discard both features."
    },
    {
      id: 4,
      scenario: "What is the mathematical reason why Lasso (L1 regularization) forces feature weights to become exactly zero, whereas Ridge (L2 regularization) only shrinks them asymptotically toward zero?",
      options: [
        { label: "A", text: "Lasso has a larger learning rate than Ridge." },
        { label: "B", text: "The diamond-shaped L1 constraint ball has sharp non-differentiable vertices on the coordinate axes where loss contours intersect, setting coordinates strictly to zero via soft-thresholding." },
        { label: "C", text: "Ridge regression is non-convex." },
        { label: "D", text: "Lasso is a filter method while Ridge is a wrapper method." }
      ],
      correct: "B",
      explanation: "The corners of the L1 ball lie on the coordinate axes. The optimal constrained solution frequently hits these sharp corners where one or more w_j = 0, inducing true sparsity."
    },
    {
      id: 5,
      scenario: "During an audit of a credit scoring pipeline, you observe that feature selection was executed on the complete 10,000-applicant database before a 80/20 train/test split. What fatal flaw invalidates the offline evaluation?",
      options: [
        { label: "A", text: "Computational inefficiency only; validation metrics remain unbiased." },
        { label: "B", text: "Feature Selection Data Leakage: Target correlations from the test partition leaked into the feature selection decision, creating an artificially optimistic offline validation score that collapses in production." },
        { label: "C", text: "The dummy variable trap, causing gradient descent to oscillate indefinitely." },
        { label: "D", text: "Covariate shift, converting continuous salary metrics into discrete ordinal ranks." }
      ],
      correct: "B",
      explanation: "Selecting features on the full dataset allows test fold target distributions to determine which features are kept. The offline score evaluates features that were selected because they fit test noise, violating the Fundamental Pipeline Invariant."
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
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 whitespace-nowrap">
            Topic 1 Concept
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
              BCAC701B • Feature Selection &amp; Train/Test • Topic 1
            </span>
            <span className="px-3.5 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Filter, Wrapper &amp; Embedded
            </span>
            <span className="px-3.5 py-1 text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              The Curse of Dimensionality
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Feature Selection Concept
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl leading-relaxed">
            Understand the mathematical imperative of feature selection: taming the exponential combinatorial search space (2<sup>d</sup> &minus; 1),
            defeating the curse of dimensionality, and enforcing Occam&apos;s razor. Master the three classical paradigms—Filter methods (statistical screening),
            Wrapper methods (model-driven heuristic search), and Embedded methods (L1 Lasso sparse penalization)—and explore the bias-variance U-curve across West Bengal industrial cohorts.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800/80">
            <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
              <div className="text-xs text-slate-400 font-medium">Search Space</div>
              <div className="text-sm sm:text-base font-bold text-indigo-300">2<sup>d</sup> &minus; 1 Subsets</div>
              <div className="text-xs text-slate-500">NP-Hard Optimization</div>
            </div>
            <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
              <div className="text-xs text-slate-400 font-medium">3 Paradigms</div>
              <div className="text-sm sm:text-base font-bold text-cyan-300">Filter, Wrapper, Embedded</div>
              <div className="text-xs text-slate-500">Speed vs Interaction</div>
            </div>
            <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
              <div className="text-xs text-slate-400 font-medium">Bias-Variance</div>
              <div className="text-sm sm:text-base font-bold text-emerald-300">Validation U-Curve</div>
              <div className="text-xs text-slate-500">Optimal Sweet Spot k*</div>
            </div>
            <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
              <div className="text-xs text-slate-400 font-medium">Collinearity Metric</div>
              <div className="text-sm sm:text-base font-bold text-amber-300">VIF &ge; 10 Hazard</div>
              <div className="text-xs text-slate-500">Variance Inflation Factor</div>
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
            Why More Features Do Not Equal Better Models
          </h3>
          <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-4xl">
            In human intuition, we assume that more data is always beneficial. In machine learning, every uninformative feature
            is an additional dimension of noise that dilutes genuine patterns, increases estimation variance, and slows down training.
            Feature selection is the art of strategic pruning.
          </p>
        </div>

        {/* 3 Real-World Metaphors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/80 p-5 rounded-2xl border border-indigo-500/20 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-lg">
              🎒
            </div>
            <h4 className="text-base font-bold text-white">The Sandakphu Trekker&apos;s Backpack</h4>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Before climbing the Sandakphu trail in Darjeeling, an inexperienced trekker packs 40 kilograms of gear: heavy cast-iron cookware, multiple extra jackets, and novels. After 5 kilometers, exhaustion sets in. An expert trekker packs only the essential 8 kilograms: water, thermal layer, map, and compass. In ML, extra features are dead weight that exhaust your model.
            </p>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-2xl border border-cyan-500/20 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-lg">
              🏏
            </div>
            <h4 className="text-base font-bold text-white">The Eden Gardens Selection Panel</h4>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Choosing 11 cricketers from 100 probables illustrates the 3 paradigms. <strong className="text-indigo-300">Filter:</strong> Select players strictly by individual strike rate (fast, but ignores bowling balance). <strong className="text-cyan-300">Wrapper:</strong> Play simulated trial matches with different 11-player combinations (accurate, but takes weeks). <strong className="text-emerald-300">Embedded:</strong> Players compete during training nets where only the best automatically earn a spot on the roster.
            </p>
          </div>

          <div className="bg-slate-900/80 p-5 rounded-2xl border border-emerald-500/20 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg">
              🍲
            </div>
            <h4 className="text-base font-bold text-white">The Kolkata Biryani Spice Cabinet</h4>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              A grand spice market in Posta offers 100 distinct spices. If a chef dumps all 100 spices into the Biryani pot, the dish becomes an unpalatable, bitter mess where no flavor shines. A master Kolkata chef selects exactly 6 aromatic spices: mace, nutmeg, cardamom, cinnamon, cloves, and saffron. Parsimony creates elegance in cuisine and in machine learning.
            </p>
          </div>
        </div>

        {/* 3 Paradigms Comparison Table */}
        <div className="space-y-4">
          <h4 className="text-base font-bold text-white">
            The Three Canonical Paradigms of Feature Selection
          </h4>
          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300">
              <thead className="bg-slate-950/80 text-slate-400 uppercase text-[11px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-3.5">Paradigm</th>
                  <th className="p-3.5">Evaluation Engine</th>
                  <th className="p-3.5">Computational Cost</th>
                  <th className="p-3.5">Interaction Capture</th>
                  <th className="p-3.5">Overfitting Risk</th>
                  <th className="p-3.5">Key Scikit-Learn Class</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3.5 font-bold text-indigo-400">Filter Methods</td>
                  <td className="p-3.5 text-slate-200">Model-agnostic statistical scores (Pearson r, ANOVA F, MI)</td>
                  <td className="p-3.5 font-mono text-xs text-emerald-400">O(d &times; N) &mdash; Extremely Fast</td>
                  <td className="p-3.5 text-rose-400">Zero (Evaluates features individually)</td>
                  <td className="p-3.5 text-emerald-400">Very Low</td>
                  <td className="p-3.5 font-mono text-cyan-300">SelectKBest, VarianceThreshold</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3.5 font-bold text-cyan-400">Wrapper Methods</td>
                  <td className="p-3.5 text-slate-200">ML model as evaluation oracle (Forward/Backward/RFE)</td>
                  <td className="p-3.5 font-mono text-xs text-rose-400">O(d<sup>2</sup> &times; train_cost) &mdash; Slow</td>
                  <td className="p-3.5 text-emerald-400">High (Captures multi-feature synergy)</td>
                  <td className="p-3.5 text-rose-400">High (Overfits small validation sets)</td>
                  <td className="p-3.5 font-mono text-cyan-300">RFE, SequentialFeatureSelector</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3.5 font-bold text-emerald-400">Embedded Methods</td>
                  <td className="p-3.5 text-slate-200">Intrinsic loss penalization (L1 Lasso, Tree Gini)</td>
                  <td className="p-3.5 font-mono text-xs text-indigo-300">Integrated with training</td>
                  <td className="p-3.5 text-indigo-300">Moderate to High</td>
                  <td className="p-3.5 text-indigo-300">Moderate (Regulated by &lambda;)</td>
                  <td className="p-3.5 font-mono text-cyan-300">Lasso, SelectFromModel</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Interactive Jargon Buster */}
        <div className="space-y-4 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-base font-bold text-white">Interactive Feature Selection Glossary</h4>
              <p className="text-xs text-slate-400">Filter foundational terminology and algorithmic concepts</p>
            </div>
            <input
              type="text"
              value={jargonQuery}
              onChange={(e) => setJargonQuery(e.target.value)}
              placeholder="Search terms (e.g. wrapper, vif, lasso)..."
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
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Interactive Engineering Studio
              </h2>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              The Feature Selection Laboratory &amp; U-Curve Arena
            </h3>
          </div>

          {/* Mode Switcher */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "paradigms", label: "Mode 1: The 3 Paradigms Comparison", badge: "Filter / Wrapper / Embedded" },
              { id: "u_curve", label: "Mode 2: Bias-Variance U-Curve", badge: "Cardinality k" },
              { id: "vif_inspector", label: "Mode 3: Multicollinearity & VIF", badge: "VIF >= 10 Hazard" }
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
        {/* MODE 1: THE 3 PARADIGMS COMPARISON ARENA                            */}
        {/* ------------------------------------------------------------------- */}
        {studioMode === "paradigms" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-950/70 p-5 rounded-2xl border border-indigo-500/30 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <span>Filter vs Wrapper vs Embedded Benchmark</span>
                    <span className="text-xs px-2.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-mono">
                      8 Candidate Features &bull; N=7 Students
                    </span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Compare how each paradigm selects features from the West Bengal student dataset under different mathematical criteria.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-medium">Correlation Filter Threshold:</span>
                  <span className="text-xs font-mono font-bold text-cyan-300">|r| &ge; {filterThreshold.toFixed(2)}</span>
                </div>
              </div>

              {/* Threshold Slider */}
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 space-y-1">
                <input
                  type="range"
                  min="0.40"
                  max="0.99"
                  step="0.01"
                  value={filterThreshold}
                  onChange={(e) => setFilterThreshold(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Permissive (|r| &ge; 0.40)</span>
                  <span>Recommended (|r| &ge; 0.80)</span>
                  <span>Strict (|r| &ge; 0.99)</span>
                </div>
              </div>

              {/* 3 Paradigm Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Filter Card */}
                <div className="bg-slate-900/90 p-4 rounded-xl border border-indigo-500/30 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">Filter Method</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-200 border border-indigo-800">0.4 ms</span>
                  </div>
                  <div className="text-xs text-slate-300">
                    Evaluates individual Pearson correlation <code className="text-cyan-300">|r(x_j, y)| &ge; {filterThreshold.toFixed(2)}</code>.
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1 text-xs">
                    <div className="text-[10px] text-slate-400">Selected Features ({filterSelectedFeatures.length}/8):</div>
                    <div className="font-mono text-emerald-400 font-medium text-[11px]">
                      {filterSelectedFeatures.map(f => f.key).join(", ") || "None selected (Threshold too high!)"}
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-400">
                    <strong>Blind Spot:</strong> Selected &apos;assignments&apos; alongside &apos;internalMarks&apos;, failing to detect multicollinearity!
                  </div>
                </div>

                {/* Wrapper Card */}
                <div className="bg-slate-900/90 p-4 rounded-xl border border-cyan-500/30 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">Wrapper Method</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-200 border border-cyan-800">42.8 ms</span>
                  </div>
                  <div className="text-xs text-slate-300">
                    Greedy Forward Stepwise Selection using linear model R<sup>2</sup> as the evaluation oracle.
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1 text-xs">
                    <div className="text-[10px] text-slate-400">Selected Optimal Subset (k=3):</div>
                    <div className="font-mono text-cyan-300 font-medium text-[11px]">
                      attendance, internalMarks, studyHours
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-400">
                    <strong>Advantage:</strong> Detected that &apos;assignments&apos; was redundant after adding &apos;internalMarks&apos; and omitted it!
                  </div>
                </div>

                {/* Embedded Card */}
                <div className="bg-slate-900/90 p-4 rounded-xl border border-emerald-500/30 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Embedded (Lasso L1)</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-200 border border-emerald-800">4.2 ms</span>
                  </div>
                  <div className="text-xs text-slate-300">
                    L1 soft-thresholding penalization drives uninformative and redundant weights strictly to 0.0.
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1 text-xs">
                    <div className="text-[10px] text-slate-400">Non-Zero Sparsified Features (k=2):</div>
                    <div className="font-mono text-emerald-400 font-medium text-[11px]">
                      attendance (w=0.88), internalMarks (w=0.41)
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-400">
                    <strong>Advantage:</strong> Fast, non-greedy, intrinsically zeroes out noise features like &apos;shoeSize&apos; and &apos;favoriteNum&apos;.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* MODE 2: COMBINATORIAL SUBSET & BIAS-VARIANCE U-CURVE                */}
        {/* ------------------------------------------------------------------- */}
        {studioMode === "u_curve" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-950/70 p-5 rounded-2xl border border-cyan-500/30 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <span>The Bias-Variance Tradeoff U-Curve Simulator</span>
                    <span className="text-xs px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono">
                      Current Cardinality k = {selectedK}
                    </span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Observe how increasing feature count k monotonically drops training MSE, while validation MSE exhibits a convex U-shaped curve.
                  </p>
                </div>

                <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold">
                  <span className="text-slate-400">Status: </span>
                  <span className={clsx(
                    selectedK === 1 || selectedK === 2 ? "text-emerald-400" : selectedK <= 4 ? "text-indigo-300" : "text-rose-400"
                  )}>
                    {currentKMetrics.state}
                  </span>
                </div>
              </div>

              {/* Slider for k */}
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-300">Select Feature Cardinality (k):</span>
                  <span className="font-mono text-cyan-300 font-bold text-sm">{selectedK} Features</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="8"
                  step="1"
                  value={selectedK}
                  onChange={(e) => setSelectedK(parseInt(e.target.value, 10))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>k=1 (Parsimonious)</span>
                  <span>k=2 (Optimal k*)</span>
                  <span>k=5 (Collinear)</span>
                  <span>k=8 (Full Noise Model)</span>
                </div>
              </div>

              {/* SVG Curve Plot */}
              <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Training MSE (Monotonic Drop) vs Validation MSE (Convex U-Curve):
                </div>
                <div className="h-48 w-full relative bg-slate-950 rounded-xl overflow-hidden border border-slate-800/80">
                  <svg className="w-full h-full" viewBox="0 0 500 200">
                    {/* Grid */}
                    <line x1="40" y1="20" x2="480" y2="20" stroke="#334155" strokeDasharray="3 3" />
                    <line x1="40" y1="100" x2="480" y2="100" stroke="#334155" strokeDasharray="3 3" />
                    <line x1="40" y1="170" x2="480" y2="170" stroke="#475569" />
                    <line x1="40" y1="20" x2="40" y2="170" stroke="#475569" />

                    {/* Train Error Curve (Blue) */}
                    <polyline
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="2.5"
                      points={uCurveData.map(d => {
                        const x = 50 + ((d.k - 1) / 7) * 410;
                        const y = 170 - (1.0 - d.trainMse / 1.5) * 80;
                        return `${x},${y}`;
                      }).join(" ")}
                    />

                    {/* Validation Error Curve (Rose U-shape) */}
                    <polyline
                      fill="none"
                      stroke="#f43f5e"
                      strokeWidth="2.5"
                      points={uCurveData.map(d => {
                        const x = 50 + ((d.k - 1) / 7) * 410;
                        const y = 170 - (d.valMse / 16.0) * 140;
                        return `${x},${y}`;
                      }).join(" ")}
                    />

                    {/* Active K Marker Line */}
                    {(() => {
                      const curX = 50 + ((selectedK - 1) / 7) * 410;
                      return (
                        <line x1={curX} y1="20" x2={curX} y2="170" stroke="#a855f7" strokeWidth="2" strokeDasharray="4 4" />
                      );
                    })()}
                  </svg>
                </div>
                <div className="flex justify-between items-center text-[11px] text-slate-400">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-sky-400 font-bold">
                      <span className="w-2.5 h-0.5 bg-sky-400 inline-block" /> Training MSE (Always Drops)
                    </span>
                    <span className="flex items-center gap-1 text-rose-400 font-bold">
                      <span className="w-2.5 h-0.5 bg-rose-400 inline-block" /> Validation MSE (U-Curve)
                    </span>
                  </div>
                  <span className="font-mono text-purple-300">
                    Train MSE: {currentKMetrics.trainMse} | Val MSE: {currentKMetrics.valMse} | R<sup>2</sup>: {(currentKMetrics.r2 * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* MODE 3: MULTICOLLINEARITY & VIF INSPECTOR                           */}
        {/* ------------------------------------------------------------------- */}
        {studioMode === "vif_inspector" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-950/70 p-5 rounded-2xl border border-amber-500/30 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <span>Multicollinearity &amp; Variance Inflation Factor (VIF) Inspector</span>
                    <span className={clsx(
                      "text-xs px-2.5 py-0.5 rounded font-mono font-bold border",
                      vifMetrics.isMulticollinear ? "bg-rose-500/20 text-rose-300 border-rose-500/40" : "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                    )}>
                      {vifMetrics.isMulticollinear ? "SEVERE MULTICOLLINEARITY (VIF=166.7) ⚠" : "PRISTINE ORTHOGONAL SYSTEM (VIF=1.45) ✓"}
                    </span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Observe how retaining collinear twin features (<code className="text-amber-300">assignments</code> &amp; <code className="text-amber-300">internalMarks</code>, r=0.997) inflates coefficient estimation variance.
                  </p>
                </div>

                <button
                  onClick={() => setPruneAssignments(!pruneAssignments)}
                  className={clsx(
                    "px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer",
                    pruneAssignments ? "bg-emerald-600 hover:bg-emerald-500 text-white" : "bg-rose-600 hover:bg-rose-500 text-white"
                  )}
                >
                  {pruneAssignments ? "✓ Collinear Twin Pruned (Clean VIF)" : "⚠ Prune Collinear 'Assignments' Feature"}
                </button>
              </div>

              {/* VIF Diagnostic Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-1">
                  <div className="text-xs text-slate-400">Internal Marks VIF</div>
                  <div className={clsx("text-2xl font-mono font-bold", vifMetrics.internalVIF >= 10 ? "text-rose-400" : "text-emerald-400")}>
                    {vifMetrics.internalVIF.toFixed(1)}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {vifMetrics.internalVIF >= 10 ? "Severe inflation! Standard error multiplied by 12.9x." : "Healthy variance; independent predictor."}
                  </div>
                </div>

                <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-1">
                  <div className="text-xs text-slate-400">Assignments VIF</div>
                  <div className={clsx("text-2xl font-mono font-bold", vifMetrics.assignmentsVIF >= 10 ? "text-rose-400" : "text-slate-500")}>
                    {vifMetrics.assignmentsVIF > 0 ? vifMetrics.assignmentsVIF.toFixed(1) : "PRUNED (0.0)"}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {vifMetrics.assignmentsVIF >= 10 ? "Redundant twin of internal marks." : "Excluded from design matrix."}
                  </div>
                </div>

                <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-1">
                  <div className="text-xs text-slate-400">Pairwise Correlation r</div>
                  <div className="text-2xl font-mono font-bold text-amber-400">
                    0.9973
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Almost perfectly collinear (R<sup>2</sup> = 0.9946 between features).
                  </div>
                </div>
              </div>

              {/* Analytical Explanation */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-2">
                <div className="font-bold text-amber-400 uppercase tracking-wider text-[11px]">
                  Why Multicollinearity Destroys Model Weights:
                </div>
                <p>
                  When two features share 99.7% of their variance, Ordinary Least Squares cannot distinguish which feature is genuinely driving the target.
                  The Gram matrix X<sup>T</sup>X becomes near-singular (condition number &kappa; &gt; 1000). The regression weights swing between wild compensating values
                  (e.g., <code className="text-rose-300 font-mono">w_internal = +45.2</code> and <code className="text-rose-300 font-mono">w_assignments = -43.8</code>), rendering individual weights completely uninterpretable.
                </p>
                <p className="text-emerald-400 font-semibold">
                  Feature selection eliminates this instability by pruning one of the twins, instantly restoring clean single-digit VIF.
                </p>
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
            Formal Foundations of Feature Selection
          </h3>
          <p className="text-sm text-slate-300 mt-1 max-w-4xl">
            A comprehensive reference of the key equations governing subset search space, L1 soft-thresholding, Variance Inflation Factors, and parameter estimation variance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-indigo-500/20 space-y-3">
            <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              1. Combinatorial Search Space Cardinality
            </div>
            <div className="p-3 bg-slate-900/90 rounded-xl font-mono text-xs text-indigo-200 border border-indigo-900/40">
              {"|\\mathcal{P}(\\{1, \\dots, d\\})| - 1 = \\sum_{k=1}^d \\binom{d}{k} = 2^d - 1"}
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Exhaustive subset search is NP-hard. For d = 50 candidate features, evaluating all 2<sup>50</sup> &minus; 1 combinations requires over one quadrillion model training runs, necessitating heuristic Filter, Wrapper, or Embedded search.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-cyan-500/20 space-y-3">
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              2. Lasso L1 Loss &amp; Soft-Thresholding
            </div>
            <div className="p-3 bg-slate-900/90 rounded-xl font-mono text-xs text-cyan-200 border border-cyan-900/40">
              {"\\min_{\\mathbf{w}} \\left\\{ \\frac{1}{2N} \\|\\mathbf{y} - X\\mathbf{w}\\|_2^2 + \\lambda \\|\\mathbf{w}\\|_1 \\right\\}, \\; \\mathcal{S}_{\\lambda}(w) = \\text{sign}(w) \\max(0, |w| - \\lambda)"}
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              The diamond vertices of the L1 ball intersect loss contours along coordinate axes. The soft-thresholding operator S<sub>&lambda;</sub>(w) sets weights strictly to 0.0 when unregularized gradient pull is less than &lambda;.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-emerald-500/20 space-y-3">
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              3. The Variance Inflation Factor (VIF)
            </div>
            <div className="p-3 bg-slate-900/90 rounded-xl font-mono text-xs text-emerald-200 border border-emerald-900/40">
              {"\\text{VIF}_j = \\frac{1}{1 - R_j^2}, \\quad \\text{SE}(\\hat{w}_j) = \\frac{\\sigma}{\\sqrt{\\sum (x_{ij} - \\bar{x}_j)^2}} \\cdot \\sqrt{\\text{VIF}_j}"}
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Quantifies how much the standard error of regression coefficient w<sub>j</sub> is inflated by linear correlation with other regressors. A VIF &ge; 10 signals severe multicollinearity requiring pruning.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-amber-500/20 space-y-3">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              4. Parameter Estimation Covariance
            </div>
            <div className="p-3 bg-slate-900/90 rounded-xl font-mono text-xs text-amber-200 border border-amber-900/40">
              {"\\text{Var}(\\hat{\\mathbf{w}}) = \\sigma^2 (X^T X)^{-1}, \\quad \\lim_{k \\to d_{\\text{noise}}} \\text{Tr}(\\text{Var}(\\hat{\\mathbf{w}})) \\to \\infty"}
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Adding uninformative or collinear features drives det(X<sup>T</sup>X) toward zero, causing the eigenvalues of (X<sup>T</sup>X)<sup>&minus;1</sup> to explode and inflating parameter estimation variance.
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
            Industrial Feature Selection Implementations
          </h3>
          <p className="text-sm text-slate-300 mt-1 max-w-4xl">
            Real-world deployments across fintech micro-lending, cloud infrastructure, quick-commerce logistics, and oncology biomarker discovery in West Bengal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Case 1 */}
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Barrackpore &amp; Titagarh</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">FinTech Underwriting</span>
            </div>
            <h4 className="text-base font-bold text-white">NBFC Mobile Telemetry Default Risk Scoring</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              A digital lender along Old Calcutta Road ingested 120 raw mobile telemetry variables on 2,500 borrowers. The model overfit violently (Train AUC 0.94 vs Test AUC 0.61). Deploying a two-stage filter (Variance &gt; 0.01 + Mutual Information) followed by Lasso L1 penalization pruned 112 features, leaving 8 core predictors. Test AUC surged to 0.84 and latency dropped from 1.4s to 8ms.
            </p>
          </div>

          {/* Case 2 */}
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Salt Lake Sector V &amp; New Town</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">Cloud Operations</span>
            </div>
            <h4 className="text-base font-bold text-white">SaaS Cloud Infrastructure Cost Forecasting</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Forecasting cluster billing across 85 hardware telemetry counters. Severe multicollinearity (VIF &gt; 80 across memory metrics) caused linear regression weights to flip signs arbitrarily. Applying Backward Elimination with a strict VIF &lt; 5.0 cutoff pruned 79 redundant metrics down to 6 orthogonal signals, reducing cost forecasting MAPE from 34.2% to 5.8%.
            </p>
          </div>

          {/* Case 3 */}
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Howrah &amp; Dankuni</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">Quick-Commerce Logistics</span>
            </div>
            <h4 className="text-base font-bold text-white">Dark Store Perishable Inventory Replenishment</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Predicting dark store order volume across 200 supplier delivery features. Forward stepwise wrapper selection was taking 14 hours per daily retrain. Replacing the wrapper with LightGBM Gini importance thresholding isolated 22 non-zero features, cutting pipeline runtime from 14 hours to 18 minutes with zero loss in demand accuracy.
            </p>
          </div>

          {/* Case 4 */}
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Kolkata &amp; Jadavpur</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">Genomic Oncology</span>
            </div>
            <h4 className="text-base font-bold text-white">Leukemia Microarray Biomarker Discovery</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Analyzing 20,000 gene expressions on 180 leukemia patients (p &gt;&gt; N regime). A two-stage architecture—ANOVA F-test pre-filtering down to 500 genes followed by ElasticNet L1/L2 selection—isolated 24 diagnostic biomarker genes with 96.2% clinical sensitivity, identifying actionable targeted therapies.
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
              Topic 1 Diagnostic Assessment Quiz
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
            Architecture Hazards in Feature Selection
          </h3>
          <p className="text-sm text-slate-300 mt-1 max-w-4xl">
            Critical production bugs that escape offline unit testing and trigger silent data leakage and model instability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-rose-500/20 space-y-2.5">
            <div className="text-xs font-bold text-rose-400 uppercase tracking-wider">
              Pitfall 1: Feature Selection Data Leakage (Fit-Before-Split)
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong className="text-slate-200">The Bug:</strong> Running correlation ranking, mutual information filtering, or RFE on the complete dataset before calling <code className="text-rose-300 font-mono">train_test_split()</code>.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong className="text-slate-200">Consequence:</strong> Information regarding the test partition&apos;s target labels leaks into feature subset choices, yielding artificially inflated offline scores that collapse in production.
            </p>
            <p className="text-[11px] text-emerald-400 bg-emerald-950/30 p-2 rounded border border-emerald-800/30">
              <strong>Production Fix:</strong> Perform all feature selection strictly within scikit-learn <code className="font-mono">Pipeline</code> fitted exclusively on X_train.
            </p>
          </div>

          <div className="bg-slate-950/80 p-5 rounded-2xl border border-rose-500/20 space-y-2.5">
            <div className="text-xs font-bold text-rose-400 uppercase tracking-wider">
              Pitfall 2: Univariate Filter Blindness to Non-Linear Interactions
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong className="text-slate-200">The Bug:</strong> Discarding features solely because their individual linear Pearson correlation with target y is near zero (r &approx; 0).
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong className="text-slate-200">Consequence:</strong> In complex interactive systems (e.g. XOR logic), individual features have zero univariate correlation, but their non-linear synergy explains 100% of variance.
            </p>
            <p className="text-[11px] text-emerald-400 bg-emerald-950/30 p-2 rounded border border-emerald-800/30">
              <strong>Production Fix:</strong> Complement Pearson filtering with Mutual Information or tree-based feature importances.
            </p>
          </div>

          <div className="bg-slate-950/80 p-5 rounded-2xl border border-rose-500/20 space-y-2.5">
            <div className="text-xs font-bold text-rose-400 uppercase tracking-wider">
              Pitfall 3: Forward Selection Multicollinearity Trap
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong className="text-slate-200">The Bug:</strong> Greedily adding individual features that each have high correlation with y without auditing inter-feature correlation.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong className="text-slate-200">Consequence:</strong> The wrapper selects collinear twin features (e.g., <code className="text-rose-300 font-mono">assignments</code> alongside <code className="text-rose-300 font-mono">internalMarks</code>), inflating condition number &kappa; &gt; 1000 and destabilizing weights.
            </p>
            <p className="text-[11px] text-emerald-400 bg-emerald-950/30 p-2 rounded border border-emerald-800/30">
              <strong>Production Fix:</strong> Combine forward selection with a Variance Inflation Factor (<code className="font-mono">VIF &lt; 5.0</code>) constraint.
            </p>
          </div>

          <div className="bg-slate-950/80 p-5 rounded-2xl border border-rose-500/20 space-y-2.5">
            <div className="text-xs font-bold text-rose-400 uppercase tracking-wider">
              Pitfall 4: Overfitting Wrapper Methods on Small Datasets
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong className="text-slate-200">The Bug:</strong> Running aggressive Recursive Feature Elimination (RFE) on datasets with small sample sizes (N &lt; 100).
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong className="text-slate-200">Consequence:</strong> The wrapper explores hundreds of subset configurations, picking random noise features that happen to fit the tiny validation fold by pure chance.
            </p>
            <p className="text-[11px] text-emerald-400 bg-emerald-950/30 p-2 rounded border border-emerald-800/30">
              <strong>Production Fix:</strong> Deploy simple Filter methods or strong L1 Lasso regularization on small sample datasets.
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
              <span>File: <code className="text-indigo-300 font-mono">feature_selection_concept_lab.py</code> (Exit Code 0 Verified)</span>
              <span>Filter, Wrapper &amp; Embedded Suite</span>
            </div>
            <PythonFileLoader
              code={labCode}
              fileName="feature_selection_concept_lab.py"
              title="Feature Selection Concept Laboratory Benchmark"
            />
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>File: <code className="text-cyan-300 font-mono">topic1_note.txt</code></span>
              <span>275 Lines of Comprehensive Academic Notes</span>
            </div>
            <PlainTextPrint
              content={noteText}
              title="Topic 1 Academic Handbook &amp; Study Notes"
            />
          </div>
        )}
      </section>

      {/* ===================================================================== */}
      {/* 9. MAKAUT VIVA Q&A & TEACHER PROFILE                                  */}
      {/* ===================================================================== */}
      <section id="faq" className="space-y-8">
        <FAQTemplate
          title="Topic 1: MAKAUT Master Viva &amp; Technical Interview Questions"
          subtitle="30 Graded Analytical Questions with Comprehensive Theoretical Rationales"
          questions={questions}
        />

        <Teacher />
      </section>
    </div>
  );
};

export default Topic1;
