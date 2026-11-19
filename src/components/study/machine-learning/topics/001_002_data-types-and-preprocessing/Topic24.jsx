import React, { useState, useId, useMemo } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import labCode from "./topic24_files/worked_example_4_scaling_age_and_income_features_lab.py?raw";
import noteText from "./topic24_files/topic24_note.txt?raw";
import questions from "./topic24_files/topic24_questions.js";

// =============================================================================
// WEST BENGAL RETAIL CREDIT APPLICANTS COHORT
// =============================================================================

const WB_CREDIT_COHORT = [
  { id: "WB-LOAN-01", name: "Susmita", age: 24, incomeLPA: 4.5, target: 0 },
  { id: "WB-LOAN-02", name: "Debangshu", age: 45, incomeLPA: 28.0, target: 0 },
  { id: "WB-LOAN-03", name: "Mahima", age: 22, incomeLPA: 3.8, target: 1 },
  { id: "WB-LOAN-04", name: "Mamata", age: 35, incomeLPA: 14.5, target: 0 },
  { id: "WB-LOAN-05", name: "Abhronila", age: 50, incomeLPA: 38.0, target: 0 },
  { id: "WB-LOAN-06", name: "Rohan", age: 28, incomeLPA: 6.2, target: 1 },
  { id: "WB-LOAN-07", name: "Priyanka", age: 32, incomeLPA: 11.0, target: 0 },
  { id: "WB-LOAN-08", name: "Sourav", age: 42, incomeLPA: 26.5, target: 0 },
  { id: "WB-LOAN-09", name: "Tanmoy", age: 25, incomeLPA: 4.0, target: 1 },
  { id: "WB-LOAN-10", name: "Ananya", age: 23, incomeLPA: 3.2, target: 1 },
  { id: "WB-LOAN-11", name: "Subhajit", age: 58, incomeLPA: 48.0, target: 0 }, // Outlier senior high-earner
  { id: "WB-LOAN-12", name: "Kallol", age: 36, incomeLPA: 15.0, target: 0 },
];

function calculateStats(arr) {
  if (!arr || arr.length === 0) return { mean: 0, std: 1, min: 0, max: 1, median: 0, q1: 0, q3: 0, iqr: 1 };
  const sorted = [...arr].sort((a, b) => a - b);
  const n = sorted.length;
  const mean = sorted.reduce((acc, v) => acc + v, 0) / n;
  const variance = n > 1 ? sorted.reduce((acc, v) => acc + (v - mean) ** 2, 0) / (n - 1) : 0;
  const std = Math.sqrt(variance) || 1e-5;
  const min = sorted[0];
  const max = sorted[n - 1];

  const getPercentile = p => {
    const idx = p * (n - 1);
    const lower = Math.floor(idx);
    const upper = Math.ceil(idx);
    const weight = idx - lower;
    return (1.0 - weight) * sorted[lower] + weight * sorted[upper];
  };

  const median = getPercentile(0.5);
  const q1 = getPercentile(0.25);
  const q3 = getPercentile(0.75);
  const iqr = Math.max(q3 - q1, 1e-5);

  return { mean, std, min, max, median, q1, q3, iqr };
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

const Topic24 = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const svgId = useId();

  // Studio Mode: "distance_domination" | "loss_surface" | "scaler_benchmark"
  const [studioMode, setStudioMode] = useState("distance_domination");

  // Mode A: Distance Domination
  const [distanceScalingMode, setDistanceScalingMode] = useState("unscaled"); // "unscaled" | "standard" | "minmax"
  const [selectedApplicantId, setSelectedApplicantId] = useState("WB-LOAN-09"); // Tanmoy

  // Mode B: Loss Surface & Gradient Descent
  const [contourMode, setContourMode] = useState("standardized"); // "unscaled" | "standardized"
  const [learningRate, setLearningRate] = useState(0.05);

  // Mode C: 4-Way Scaler Benchmark & Outlier Resilience
  const [subhajitIncomeSlider, setSubhajitIncomeSlider] = useState(48.0); // LPA
  const [testApplicantIncome, setTestApplicantIncome] = useState(60.0); // Out-of-bounds test

  // Jargon Glossary Search
  const [jargonQuery, setJargonQuery] = useState("");

  // Diagnostic Quiz State
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Resource Tab
  const [resourceTab, setResourceTab] = useState("lab");

  // Cohort with Dynamic Subhajit Income for Outlier Testing
  const dynamicCohort = useMemo(() => {
    return WB_CREDIT_COHORT.map(c => {
      if (c.id === "WB-LOAN-11") {
        return { ...c, incomeLPA: subhajitIncomeSlider };
      }
      return c;
    });
  }, [subhajitIncomeSlider]);

  const ageStats = useMemo(() => calculateStats(dynamicCohort.map(c => c.age)), [dynamicCohort]);
  const incomeStats = useMemo(() => calculateStats(dynamicCohort.map(c => c.incomeLPA)), [dynamicCohort]);

  // Scaler Transformations across Dynamic Cohort
  const scaledCohort = useMemo(() => {
    return dynamicCohort.map(c => {
      // Age Scalers
      const ageMM = (c.age - ageStats.min) / (ageStats.max - ageStats.min);
      const ageStd = (c.age - ageStats.mean) / ageStats.std;
      const ageRob = (c.age - ageStats.median) / ageStats.iqr;

      // Income Scalers
      const incMM = (c.incomeLPA - incomeStats.min) / (incomeStats.max - incomeStats.min);
      const incStd = (c.incomeLPA - incomeStats.mean) / incomeStats.std;
      const incRob = (c.incomeLPA - incomeStats.median) / incomeStats.iqr;
      const incLog = Math.log1p(c.incomeLPA);

      return {
        ...c,
        ageMM,
        ageStd,
        ageRob,
        incMM,
        incStd,
        incRob,
        incLog
      };
    });
  }, [dynamicCohort, ageStats, incomeStats]);

  // Mode A: Euclidean Distance Domination Computation
  const distanceResults = useMemo(() => {
    const query = scaledCohort.find(c => c.id === selectedApplicantId) || scaledCohort[8];

    const neighbors = scaledCohort
      .filter(c => c.id !== query.id)
      .map(c => {
        let dAge = 0;
        let dInc = 0;

        if (distanceScalingMode === "unscaled") {
          // Unscaled: Age in years, Income in ₹ Lakhs (e.g. 4.0 vs 28.0)
          dAge = (c.age - query.age) ** 2;
          dInc = (c.incomeLPA - query.incomeLPA) ** 2;
        } else if (distanceScalingMode === "standard") {
          dAge = (c.ageStd - query.ageStd) ** 2;
          dInc = (c.incStd - query.incStd) ** 2;
        } else if (distanceScalingMode === "minmax") {
          dAge = (c.ageMM - query.ageMM) ** 2;
          dInc = (c.incMM - query.incMM) ** 2;
        }

        const totalDist = Math.sqrt(dAge + dInc);
        const incPct = dAge + dInc > 0 ? (dInc / (dAge + dInc)) * 100 : 0;
        const agePct = 100 - incPct;

        return {
          ...c,
          dAge,
          dInc,
          totalDist,
          incPct,
          agePct
        };
      });

    neighbors.sort((a, b) => a.totalDist - b.totalDist);
    return { query, neighbors };
  }, [scaledCohort, selectedApplicantId, distanceScalingMode]);

  // Mode C: Out-of-Bounds Test Applicant Computation
  const testApplicantScaled = useMemo(() => {
    const rawInc = testApplicantIncome;
    const mm = (rawInc - incomeStats.min) / (incomeStats.max - incomeStats.min);
    const std = (rawInc - incomeStats.mean) / incomeStats.std;
    const rob = (rawInc - incomeStats.median) / incomeStats.iqr;
    return { rawInc, mm, std, rob };
  }, [testApplicantIncome, incomeStats]);

  // Jargon Glossary Terms
  const jargonTerms = [
    {
      term: "Scale Disparity Pathology",
      def: "The numerical mismatch where features with large ranges (e.g., Income ₹50L) overpower features with compact ranges (Age 20-60) in distance calculations and gradient updates.",
      badge: "Geometric Hazard"
    },
    {
      term: "Hessian Condition Number (κ)",
      def: "The ratio of maximum to minimum eigenvalues κ = λ_max / λ_min of the loss curvature matrix. High κ creates an eccentric elliptical canyon causing gradient zig-zagging.",
      badge: "Optimization Math"
    },
    {
      term: "Min-Max Normalization",
      def: "Rescaling continuous features into the strict interval [0, 1]. Highly vulnerable to compression collapse when extreme outliers inflate the range denominator.",
      badge: "Bounded Scaler"
    },
    {
      term: "Z-Score Standardization",
      def: "Transforming a feature to mean 0 and unit variance (σ=1). Converts loss surfaces into spherical concentric contours for optimal gradient descent.",
      badge: "L2 Scaler"
    },
    {
      term: "RobustScaler (IQR Normalization)",
      def: "Rescaling using the Median (50% breakdown point) and IQR = Q3 - Q1 (25% breakdown point), making it completely immune to executive wealth outliers.",
      badge: "L1 Robust Scaler"
    },
    {
      term: "Out-of-Bounds Scaling Hazard",
      def: "When live inference encounters a feature exceeding training x_max, MinMaxScaler outputs x' > 1.0, potentially violating neural network bounded expectations.",
      badge: "Production Serving"
    },
    {
      term: "Sparse Densification Trap",
      def: "Executing StandardScaler(with_mean=True) on a sparse matrix subtracts μ from structural zeroes, turning zeroes into dense floats and causing fatal OOM crashes.",
      badge: "Memory Hazard"
    },
    {
      term: "Monotonic Tree Invariance",
      def: "Decision trees, Random Forests, and XGBoost evaluate splits based on sorted ranks, making them 100% immune to feature scaling (scaling adds zero accuracy benefit).",
      badge: "Ensemble Theory"
    }
  ];

  const filteredJargon = jargonTerms.filter(j =>
    j.term.toLowerCase().includes(jargonQuery.toLowerCase()) ||
    j.def.toLowerCase().includes(jargonQuery.toLowerCase()) ||
    j.badge.toLowerCase().includes(jargonQuery.toLowerCase())
  );

  // Diagnostic Quiz Scenarios
  const quizQuestions = [
    {
      id: "q1",
      scenario: "A data scientist clusters customer profiles using K-Means on Age (20-60 yrs) and Annual Income (₹3,00,000 to ₹50,00,000) without scaling.",
      prompt: "What will the resulting cluster boundaries look like visually in 2D space?",
      options: [
        { key: "A", text: "Spherical clusters that equally balance age cohorts and income brackets." },
        { key: "B", text: "Parallel horizontal or vertical slices determined almost 100% by Income, completely ignoring Age." },
        { key: "C", text: "Diagonal clusters splitting applicants by their exact ratio of Income to Age." },
        { key: "D", text: "K-Means will raise an immediate runtime convergence exception." }
      ],
      correct: "B",
      explanation: "Because squared income differences are millions of times larger than squared age differences, K-Means minimizes distance strictly along the Income dimension. Cluster centroids split purely along income tiers, ignoring age."
    },
    {
      id: "q2",
      scenario: "During Gradient Descent for linear regression on unscaled Age and Income, the learning rate η that works for Income causes divergence on Age, and vice-versa.",
      prompt: "What mathematical property of the loss surface causes this oscillatory failure?",
      options: [
        { key: "A", text: "A massive condition number of the Hessian matrix (κ >> 1), creating an eccentric elliptical canyon." },
        { key: "B", text: "The loss surface becomes non-convex with thousands of saddle points." },
        { key: "C", text: "The Gram matrix determinant becomes exactly zero." },
        { key: "D", text: "Floating point underflow in the bias term." }
      ],
      correct: "A",
      explanation: "The Hessian matrix of second derivatives H = (1/N) * X^T X reflects feature variances. When income variance dwarfs age variance, the eigenvalue ratio κ = λ_max / λ_min is huge, creating steep canyon walls that force gradients to oscillate wildly."
    },
    {
      id: "q3",
      scenario: "You are building a loan underwriting model. The dataset contains 10,000 retail applicants earning ₹3L to ₹15L, plus two corporate CEOs earning ₹80 LPA.",
      prompt: "Which scaler should you deploy on Annual Income to prevent variance compression?",
      options: [
        { key: "A", text: "MinMaxScaler, because bounding data to [0, 1] is always required." },
        { key: "B", text: "RobustScaler, because its median center and IQR scale are immune to extreme wealth outliers." },
        { key: "C", text: "StandardScaler with with_mean=False." },
        { key: "D", text: "Binarizer with threshold at ₹50 LPA." }
      ],
      correct: "B",
      explanation: "MinMaxScaler squashes normal applicants into [0.0, 0.15] due to the ₹80L denominator. StandardScaler's mean and variance are also skewed. RobustScaler calculates parameters strictly from the middle 50% (Q1 to Q3), protecting middle-class resolution."
    },
    {
      id: "q4",
      scenario: "A data engineer applies `StandardScaler(with_mean=True)` to a 100,000 x 50,000 sparse CSR matrix of text TF-IDF tokens.",
      prompt: "What critical production failure will occur?",
      options: [
        { key: "A", text: "The model accuracy will drop by exactly 50%." },
        { key: "B", text: "Out-Of-Memory (OOM) crash: Subtracting a non-zero mean from zeroes converts the sparse matrix into a massive dense matrix." },
        { key: "C", text: "The matrix rank collapses to 1." },
        { key: "D", text: "No failure, Scikit-Learn handles sparse centering automatically." }
      ],
      correct: "B",
      explanation: "Sparse CSR matrices store only non-zero coordinates. Subtracting the mean μ from zero entries yields -μ (a non-zero float), instantly converting billions of zeroes into stored floats and crashing system memory."
    },
    {
      id: "q5",
      scenario: "A machine learning pipeline trains a Gradient Boosted Decision Tree (XGBoost) on raw tabular data containing Age (20-60) and Income (₹3L-₹50L).",
      prompt: "Will applying StandardScaler improve the XGBoost model's classification accuracy?",
      options: [
        { key: "A", text: "No, tree models evaluate split thresholds based on sorted order ranks, making them invariant to monotonic scaling." },
        { key: "B", text: "Yes, it will improve accuracy by at least 15% due to faster tree convergence." },
        { key: "C", text: "Yes, because decision trees calculate Euclidean distance at each leaf." },
        { key: "D", text: "No, XGBoost will throw an exception if scaled features are passed." }
      ],
      correct: "A",
      explanation: "Decision trees make axis-aligned step cuts based strictly on relative orderings. Since standardization is a strictly monotonic linear transformation, the optimal split points remain mathematically equivalent."
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
              BCAC701B • Data Types and Preprocessing • Topic 24
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Masterclass Standard
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Scale Disparity & Optimization
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Worked Example 4: Scaling Age and Income Features
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl">
            Demystify the geometric, mathematical, and optimization pathologies of feature scale disparity. Discover why unscaled Income completely obliterates Age in Euclidean distance, mathematically analyze Hessian condition numbers in gradient descent, and benchmark 4 production scaling engines on West Bengal credit cohorts.
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
              Analogies for scale disparity, algorithm sensitivity, and essential vocabulary
            </p>
          </div>
        </div>

        {/* 3 Intuitive Real-World Metaphors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 hover:border-indigo-500/40 transition-all shadow-lg space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg">
              1
            </div>
            <h3 className="text-base font-bold text-white">The Elephant and the Ant (Distance)</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              If you weigh an elephant (5,000 kg) carrying an ant (5 mg) and measure the total weight in milligrams, the elephant's weight is 5,000,000,000 mg. An ant walking on or off changes nothing. In unscaled Euclidean distance, Income is the elephant and Age is the ant!
            </p>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 hover:border-indigo-500/40 transition-all shadow-lg space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-lg">
              2
            </div>
            <h3 className="text-base font-bold text-white">The Himalayan Gorge (Optimization)</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Imagine descending a steep mountain gorge where the north-south slope is a gentle incline, but the east-west walls are vertical cliffs. Walking forward throws you into opposite cliff walls. Scaling reshapes the gorge into a round bowl where walking forward heads straight to the bottom!
            </p>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 hover:border-indigo-500/40 transition-all shadow-lg space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-lg">
              3
            </div>
            <h3 className="text-base font-bold text-white">The Stretched Rubber Band (Outliers)</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              MinMax scaling stretches a rubber band from the poorest person (₹3 LPA) to the richest billionaire (₹100 LPA). 95% of normal middle-class citizens are squashed into a microscopic smudge between 0.0 and 0.1! RobustScaler ignores the billionaire and measures using the solid middle 50%.
            </p>
          </div>
        </div>

        {/* Algorithm Scale Sensitivity Matrix */}
        <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-pulse" />
            Machine Learning Algorithm Sensitivity Matrix
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                  <th className="py-2.5 px-3">Algorithm Family</th>
                  <th className="py-2.5 px-3">Examples</th>
                  <th className="py-2.5 px-3">Scaling Sensitive?</th>
                  <th className="py-2.5 px-3">Underlying Mathematical Cause</th>
                  <th className="py-2.5 px-3">Recommended Scaler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-3 font-semibold text-rose-300">Distance-Based</td>
                  <td className="py-2.5 px-3">KNN, K-Means, DBSCAN</td>
                  <td className="py-2.5 px-3 font-bold text-rose-400">CRITICAL (Must Scale)</td>
                  <td className="py-2.5 px-3">Euclidean distance d = √[∑(x_i - x_j)²] dominated by large range</td>
                  <td className="py-2.5 px-3 text-cyan-300 font-mono">StandardScaler / RobustScaler</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-3 font-semibold text-amber-300">Gradient-Based</td>
                  <td className="py-2.5 px-3">Logistic Regression, SGD, Neural Nets</td>
                  <td className="py-2.5 px-3 font-bold text-amber-400">HIGH (Severe Slowdown)</td>
                  <td className="py-2.5 px-3">High Hessian condition number &kappa; &gt;&gt; 1 causes gradient oscillation</td>
                  <td className="py-2.5 px-3 text-cyan-300 font-mono">StandardScaler (Zero mean, unit var)</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-3 font-semibold text-amber-300">Kernel / Projection</td>
                  <td className="py-2.5 px-3">SVM (RBF Kernel), PCA</td>
                  <td className="py-2.5 px-3 font-bold text-rose-400">CRITICAL (Must Scale)</td>
                  <td className="py-2.5 px-3">RBF kernel exp(-γ||x - x'||²) collapses; PCA variance dominance</td>
                  <td className="py-2.5 px-3 text-cyan-300 font-mono">StandardScaler</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-3 font-semibold text-emerald-300">Tree-Based Ensembles</td>
                  <td className="py-2.5 px-3">Decision Trees, Random Forest, XGBoost</td>
                  <td className="py-2.5 px-3 font-bold text-emerald-400">INVARIANT (No Scaling Needed)</td>
                  <td className="py-2.5 px-3">Splits evaluated on sorted rank orders; invariant to monotonic g(x)</td>
                  <td className="py-2.5 px-3 text-slate-500 font-mono">None (Raw features optimal)</td>
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
                placeholder="Search definitions (e.g., condition number, robust, sparse)..."
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
              Observe Euclidean distance domination, simulate gradient descent loss contours, and benchmark 4 scalers live
            </p>
          </div>
        </div>

        {/* Studio Mode Switcher */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-slate-900/90 rounded-2xl border border-slate-800">
          {[
            { id: "distance_domination", label: "Mode A: Scale Disparity & Distance Domination Arena" },
            { id: "loss_surface", label: "Mode B: Gradient Descent Loss Surface & Contour Simulator" },
            { id: "scaler_benchmark", label: "Mode C: 4-Way Scaler Benchmark & Outlier Resilience Arena" }
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

        {/* MODE A: DISTANCE DOMINATION ARENA */}
        {studioMode === "distance_domination" && (
          <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white">
                  Euclidean Distance Domination in Metric Space
                </h3>
                <p className="text-xs text-slate-400">
                  Select a query applicant and switch scaling modes to see how unscaled Income completely overwhelms Age in nearest-neighbor selection.
                </p>
              </div>

              {/* Scaling Mode Switcher */}
              <div className="flex gap-2">
                {[
                  { id: "unscaled", label: "1. Raw Unscaled (Dominated!)" },
                  { id: "standard", label: "2. StandardScaler (Balanced)" },
                  { id: "minmax", label: "3. MinMaxScaler ([0, 1])" }
                ].map(s => (
                  <button
                    key={s.id}
                    onClick={() => setDistanceScalingMode(s.id)}
                    className={clsx(
                      "px-3 py-1.5 text-xs font-bold rounded-xl border transition-all",
                      distanceScalingMode === s.id
                        ? "bg-indigo-600 text-white border-indigo-400 shadow-md"
                        : "bg-slate-800 text-slate-400 border-slate-700 hover:text-white"
                    )}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Query Applicant Selector */}
            <div className="flex flex-wrap items-center gap-2 p-3 bg-slate-800/50 rounded-2xl border border-slate-700/60">
              <span className="text-xs text-slate-400 font-semibold">Select Query Applicant:</span>
              {scaledCohort.map(c => (
                <button
                  key={c.id}
                  onClick={() => setSelectedApplicantId(c.id)}
                  className={clsx(
                    "px-2.5 py-1 text-xs rounded-lg font-mono transition-all",
                    selectedApplicantId === c.id
                      ? "bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/30"
                      : "bg-slate-800 text-slate-400 border border-slate-700 hover:text-white"
                  )}
                >
                  {c.name} ({c.age}y, ₹{c.incomeLPA}L)
                </button>
              ))}
            </div>

            {/* Target Query Profile Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-1">
                <p className="text-[11px] text-slate-400 uppercase font-semibold">Query Target Applicant</p>
                <p className="text-base font-bold text-white">
                  {distanceResults.query.name} ({distanceResults.query.id})
                </p>
                <p className="text-xs text-cyan-300 font-mono">
                  Age: {distanceResults.query.age} yrs • Income: ₹{distanceResults.query.incomeLPA.toFixed(1)} LPA
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-1">
                <p className="text-[11px] text-slate-400 uppercase font-semibold">#1 Nearest Neighbor</p>
                <p className="text-base font-bold text-emerald-400">
                  {distanceResults.neighbors[0].name} (Dist: {distanceResults.neighbors[0].totalDist.toFixed(3)})
                </p>
                <p className="text-xs text-slate-400 font-mono">
                  Age: {distanceResults.neighbors[0].age}y • Income: ₹{distanceResults.neighbors[0].incomeLPA.toFixed(1)}L
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-1">
                <p className="text-[11px] text-slate-400 uppercase font-semibold">Metric Domination Ratio</p>
                <p
                  className={clsx(
                    "text-lg font-extrabold",
                    distanceScalingMode === "unscaled" ? "text-rose-400" : "text-emerald-400"
                  )}
                >
                  {distanceScalingMode === "unscaled"
                    ? `Income: ${distanceResults.neighbors[0].incPct.toFixed(1)}% vs Age: ${distanceResults.neighbors[0].agePct.toFixed(1)}%`
                    : `Income: ${distanceResults.neighbors[0].incPct.toFixed(1)}% vs Age: ${distanceResults.neighbors[0].agePct.toFixed(1)}% (Balanced)`}
                </p>
                <p className="text-[10px] text-slate-400">
                  {distanceScalingMode === "unscaled"
                    ? "Age is almost completely ignored!"
                    : "Both dimensions contribute equally to distance"}
                </p>
              </div>
            </div>

            {/* Ranked Nearest Neighbors Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-800/80 text-slate-400 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-2.5 px-3">Rank</th>
                    <th className="py-2.5 px-3">Applicant Name</th>
                    <th className="py-2.5 px-3">Age (Δ from Query)</th>
                    <th className="py-2.5 px-3">Income (Δ from Query)</th>
                    <th className="py-2.5 px-3">Total Euclidean Distance</th>
                    <th className="py-2.5 px-3">Income % of Distance</th>
                    <th className="py-2.5 px-3">Age % of Distance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {distanceResults.neighbors.map((n, idx) => (
                    <tr
                      key={n.id}
                      className={clsx(
                        "hover:bg-slate-800/40",
                        idx === 0 && "bg-emerald-950/20 font-semibold"
                      )}
                    >
                      <td className="py-2 px-3 font-mono font-bold text-indigo-300">#{idx + 1}</td>
                      <td className="py-2 px-3 font-bold text-white">{n.name}</td>
                      <td className="py-2 px-3 font-mono">
                        {n.age} yrs <span className="text-slate-500">({n.age - distanceResults.query.age >= 0 ? `+${n.age - distanceResults.query.age}` : n.age - distanceResults.query.age}y)</span>
                      </td>
                      <td className="py-2 px-3 font-mono">
                        ₹{n.incomeLPA.toFixed(1)}L <span className="text-slate-500">({(n.incomeLPA - distanceResults.query.incomeLPA).toFixed(1)}L)</span>
                      </td>
                      <td className="py-2 px-3 font-mono text-cyan-300 font-bold">{n.totalDist.toFixed(3)}</td>
                      <td className="py-2 px-3 font-mono text-rose-300">{n.incPct.toFixed(1)}%</td>
                      <td className="py-2 px-3 font-mono text-emerald-300">{n.agePct.toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MODE B: GRADIENT DESCENT LOSS SURFACE & CONTOURS */}
        {studioMode === "loss_surface" && (
          <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white">
                  Gradient Descent Loss Surface & Contour Geometry Simulator
                </h3>
                <p className="text-xs text-slate-400">
                  Compare how unscaled elliptical canyon contours cause violent parameter oscillation compared to standardized spherical contours.
                </p>
              </div>

              {/* Mode Toggle */}
              <div className="flex gap-2">
                <button
                  onClick={() => setContourMode("unscaled")}
                  className={clsx(
                    "px-3 py-1.5 text-xs font-bold rounded-xl border transition-all",
                    contourMode === "unscaled"
                      ? "bg-rose-600 text-white border-rose-400 shadow-md"
                      : "bg-slate-800 text-slate-400 border-slate-700 hover:text-white"
                  )}
                >
                  Unscaled (Elliptical Canyon: κ ≈ 1.6 * 10³)
                </button>
                <button
                  onClick={() => setContourMode("standardized")}
                  className={clsx(
                    "px-3 py-1.5 text-xs font-bold rounded-xl border transition-all",
                    contourMode === "standardized"
                      ? "bg-emerald-600 text-white border-emerald-400 shadow-md"
                      : "bg-slate-800 text-slate-400 border-slate-700 hover:text-white"
                  )}
                >
                  Standardized (Spherical Contours: κ ≈ 1.0)
                </button>
              </div>
            </div>

            {/* Mathematical Diagnostics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60 space-y-1">
                <p className="text-[11px] text-slate-400 uppercase font-semibold">Hessian Condition Number κ</p>
                <p
                  className={clsx(
                    "text-2xl font-extrabold",
                    contourMode === "unscaled" ? "text-rose-400" : "text-emerald-400"
                  )}
                >
                  {contourMode === "unscaled" ? "1,642.4" : "1.02"}
                </p>
                <p className="text-[10px] text-slate-400">
                  {contourMode === "unscaled" ? "Violent curvature disparity" : "Optimal spherical geometry"}
                </p>
              </div>

              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60 space-y-1">
                <p className="text-[11px] text-slate-400 uppercase font-semibold">Gradient Vector Alignment</p>
                <p
                  className={clsx(
                    "text-2xl font-extrabold",
                    contourMode === "unscaled" ? "text-rose-400" : "text-cyan-400"
                  )}
                >
                  {contourMode === "unscaled" ? "Perpendicular Oscillation" : "Direct Orthogonal Path"}
                </p>
                <p className="text-[10px] text-slate-400">
                  {contourMode === "unscaled" ? "Zig-zags across steep walls" : "Points directly at global minimum"}
                </p>
              </div>

              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60 space-y-1">
                <p className="text-[11px] text-slate-400 uppercase font-semibold">Convergence Epochs</p>
                <p className="text-2xl font-extrabold text-indigo-400">
                  {contourMode === "unscaled" ? "> 2,500 Epochs" : "~ 120 Epochs (20x Faster!)"}
                </p>
                <p className="text-[10px] text-slate-400">
                  {contourMode === "unscaled" ? "Extremely slow on flat Age axis" : "Rapid uniform descent"}
                </p>
              </div>
            </div>

            {/* Visual SVG Loss Contour Representation */}
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col items-center justify-center space-y-3">
              <svg width="400" height="220" viewBox="0 0 400 220" className="overflow-visible">
                {contourMode === "unscaled" ? (
                  // Elliptical Canyon Contours
                  <g>
                    <ellipse cx="200" cy="110" rx="180" ry="25" fill="none" stroke="#475569" strokeWidth="1.5" />
                    <ellipse cx="200" cy="110" rx="140" ry="20" fill="none" stroke="#64748b" strokeWidth="1.5" />
                    <ellipse cx="200" cy="110" rx="100" ry="14" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
                    <ellipse cx="200" cy="110" rx="60" ry="8" fill="none" stroke="#38bdf8" strokeWidth="2" />
                    <circle cx="200" cy="110" r="4" fill="#34d399" />
                    {/* Zig zag trajectory */}
                    <path
                      d="M 50 180 L 120 70 L 160 140 L 180 85 L 195 125 L 200 110"
                      fill="none"
                      stroke="#f43f5e"
                      strokeWidth="2.5"
                      strokeDasharray="4,4"
                    />
                    <text x="50" y="200" fill="#f43f5e" fontSize="11" fontFamily="monospace">
                      Zig-zagging Gradient Trajectory (Severe Oscillation)
                    </text>
                  </g>
                ) : (
                  // Concentric Spherical Contours
                  <g>
                    <circle cx="200" cy="110" r="90" fill="none" stroke="#475569" strokeWidth="1.5" />
                    <circle cx="200" cy="110" r="65" fill="none" stroke="#64748b" strokeWidth="1.5" />
                    <circle cx="200" cy="110" r="40" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
                    <circle cx="200" cy="110" r="18" fill="none" stroke="#38bdf8" strokeWidth="2" />
                    <circle cx="200" cy="110" r="4" fill="#34d399" />
                    {/* Direct straight trajectory */}
                    <path
                      d="M 60 180 Q 130 145 200 110"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="3"
                    />
                    <text x="60" y="205" fill="#10b981" fontSize="11" fontFamily="monospace">
                      Direct Orthogonal Descent (Optimal Minimal Path)
                    </text>
                  </g>
                )}
              </svg>

              <div className="text-center text-xs text-slate-400 max-w-lg">
                {contourMode === "unscaled"
                  ? "Unscaled features create an eccentric elliptical canyon where gradients point almost perpendicular to the true minimum, forcing the optimizer into slow zig-zag updates."
                  : "Standardization rescales variances to unity, transforming contours into concentric spheres. Gradient vectors point directly at the global minimum w*."}
              </div>
            </div>
          </div>
        )}

        {/* MODE C: 4-WAY SCALER BENCHMARK & OUTLIER RESILIENCE ARENA */}
        {studioMode === "scaler_benchmark" && (
          <div className="bg-slate-900/90 p-6 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white">
                  4-Way Scaler Benchmark & Outlier Resilience Arena
                </h3>
                <p className="text-xs text-slate-400">
                  Inject an extreme income outlier into Subhajit's profile and observe how MinMaxScaler collapses middle-class variance while RobustScaler remains stable.
                </p>
              </div>

              {/* Slider for Outlier Subhajit Income */}
              <div className="flex items-center gap-3 bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700">
                <label className="text-xs font-semibold text-slate-300">
                  Subhajit's Outlier Income: <span className="text-rose-400 font-mono font-bold">₹{subhajitIncomeSlider.toFixed(0)} LPA</span>
                </label>
                <input
                  type="range"
                  min="20.0"
                  max="120.0"
                  step="5.0"
                  value={subhajitIncomeSlider}
                  onChange={e => setSubhajitIncomeSlider(Number(e.target.value))}
                  className="accent-rose-500 cursor-pointer w-28"
                />
              </div>
            </div>

            {/* Outlier Impact Analysis Tiles */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-800/50 p-3.5 rounded-xl border border-slate-700/60">
                <p className="text-[11px] text-slate-400 uppercase font-semibold">Cohort Max Income</p>
                <p className="text-lg font-bold text-rose-400">₹{incomeStats.max.toFixed(1)} LPA</p>
                <p className="text-[10px] text-slate-400">Subhajit's dynamic value</p>
              </div>

              <div className="bg-slate-800/50 p-3.5 rounded-xl border border-slate-700/60">
                <p className="text-[11px] text-slate-400 uppercase font-semibold">Cohort Median Income</p>
                <p className="text-lg font-bold text-cyan-400">₹{incomeStats.median.toFixed(1)} LPA</p>
                <p className="text-[10px] text-emerald-400">100% Unaffected by Outlier!</p>
              </div>

              <div className="bg-slate-800/50 p-3.5 rounded-xl border border-slate-700/60">
                <p className="text-[11px] text-slate-400 uppercase font-semibold">Cohort IQR (Q3 - Q1)</p>
                <p className="text-lg font-bold text-cyan-400">₹{incomeStats.iqr.toFixed(1)} LPA</p>
                <p className="text-[10px] text-emerald-400">100% Stable (RobustScaler)</p>
              </div>

              <div className="bg-slate-800/50 p-3.5 rounded-xl border border-slate-700/60">
                <p className="text-[11px] text-slate-400 uppercase font-semibold">Mamata (₹14.5L) MinMax</p>
                <p
                  className={clsx(
                    "text-lg font-bold",
                    subhajitIncomeSlider > 60 ? "text-rose-400" : "text-amber-400"
                  )}
                >
                  {((14.5 - incomeStats.min) / (incomeStats.max - incomeStats.min)).toFixed(3)}
                </p>
                <p className="text-[10px] text-slate-400">
                  {subhajitIncomeSlider > 60 ? "Squashed toward zero!" : "Normal range"}
                </p>
              </div>
            </div>

            {/* Out-of-Bounds Test Serving Panel */}
            <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-700/70 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Out-of-Bounds Production Inference Test (Applicant Earning &gt; Training Max)
                </h4>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">New Applicant Income:</span>
                  <input
                    type="number"
                    value={testApplicantIncome}
                    onChange={e => setTestApplicantIncome(Number(e.target.value))}
                    className="w-20 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white font-mono"
                  />
                  <span className="text-xs text-slate-400">LPA</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <p className="text-[11px] text-slate-400 uppercase font-semibold">MinMaxScaler Output</p>
                  <p
                    className={clsx(
                      "text-base font-mono font-bold",
                      testApplicantScaled.mm > 1.0 ? "text-rose-400" : "text-emerald-400"
                    )}
                  >
                    {testApplicantScaled.mm.toFixed(4)}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    {testApplicantScaled.mm > 1.0
                      ? "OUT OF BOUNDS (> 1.0! Needs clipping!)"
                      : "Within unit interval"}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <p className="text-[11px] text-slate-400 uppercase font-semibold">StandardScaler Output</p>
                  <p className="text-base font-mono font-bold text-cyan-300">
                    {testApplicantScaled.std.toFixed(4)} σ
                  </p>
                  <p className="text-[10px] text-slate-400">Natural z-score distance from training mean</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <p className="text-[11px] text-slate-400 uppercase font-semibold">RobustScaler Output</p>
                  <p className="text-base font-mono font-bold text-emerald-300">
                    {testApplicantScaled.rob.toFixed(4)} IQR
                  </p>
                  <p className="text-[10px] text-slate-400">Measured stably relative to training median</p>
                </div>
              </div>
            </div>

            {/* 12 Applicant 4-Way Comparison Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-800/80 text-slate-400 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-2.5 px-3">Applicant Name</th>
                    <th className="py-2.5 px-3">Age (yrs)</th>
                    <th className="py-2.5 px-3">Income (₹ LPA)</th>
                    <th className="py-2.5 px-3">MinMax [0, 1]</th>
                    <th className="py-2.5 px-3">StandardScaler (z)</th>
                    <th className="py-2.5 px-3">RobustScaler (IQR)</th>
                    <th className="py-2.5 px-3">Log1p(Income)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {scaledCohort.map(c => (
                    <tr
                      key={c.id}
                      className={clsx(
                        "hover:bg-slate-800/40",
                        c.id === "WB-LOAN-11" && "bg-rose-950/20 font-semibold"
                      )}
                    >
                      <td className="py-2 px-3 font-bold text-white">
                        {c.name} {c.id === "WB-LOAN-11" && "(Outlier)"}
                      </td>
                      <td className="py-2 px-3 font-mono">{c.age}</td>
                      <td className="py-2 px-3 font-mono text-cyan-300 font-bold">₹{c.incomeLPA.toFixed(1)}L</td>
                      <td className="py-2 px-3 font-mono">{c.incMM.toFixed(4)}</td>
                      <td className="py-2 px-3 font-mono">{c.incStd.toFixed(4)}</td>
                      <td className="py-2 px-3 font-mono text-emerald-300">{c.incRob.toFixed(4)}</td>
                      <td className="py-2 px-3 font-mono text-indigo-300">{c.incLog.toFixed(4)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
              Rigorous analytical formulations of Euclidean metric domination, Hessian condition numbers, and robust scaling
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Card 1: Euclidean Distance Domination */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-indigo-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400" />
              1. Euclidean Distance Domination Theorem
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {"Let feature x^(1) represent Age and x^(2) represent Annual Income in raw Rupees. The squared Euclidean distance expands as:"}
            </p>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-xs text-indigo-200 space-y-2">
              <p>{"d²(x_i, x_j) = (Δ Age)² + (Δ Income)²"}</p>
              <p>{"ρ = [ (Δ Income)² ] / [ (Δ Age)² ] ≈ (10⁶)² / (10¹)² = 10¹⁰"}</p>
            </div>
            <p className="text-xs text-slate-400">
              The squared contribution of Income exceeds that of Age by a factor of 10 billion, functionally collapsing the algorithm into a 1D model operating on income alone.
            </p>
          </div>

          {/* Card 2: Hessian Condition Number in Gradient Descent */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-cyan-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              2. Hessian Matrix Condition Number
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {"The Hessian matrix H = ∇²J(w) of the quadratic loss surface determines the curvature aspect ratio of the contours:"}
            </p>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-xs text-cyan-200 space-y-1">
              <p>{"H = (1 / N) * X^T X = [ [ Var(Age), Cov(Age, Inc) ], [ Cov(Age, Inc), Var(Inc) ] ]"}</p>
              <p>{"κ(H) = λ_max / λ_min ≈ Var(Income) / Var(Age) >> 10⁴   (Unscaled Canyon)"}</p>
              <p>{"κ(H_std) = (1 + r) / (1 - r) ≈ 1.0   (Spherical Symmetrical Contours)"}</p>
            </div>
            <p className="text-xs text-slate-400">
              Standardization rescales eigenvalues to unity, ensuring gradients point directly at the minimum w* without oscillatory overshooting.
            </p>
          </div>

          {/* Card 3: 4 Scaler Transformation Equations */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-amber-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              3. The 4 Core Scaling Formulations
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {"Mathematical transformations mapping continuous feature x into normalized representation x':"}
            </p>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-xs text-amber-200 space-y-1">
              <p>{"MinMax:   x' = (x - x_min) / (x_max - x_min) ∈ [0, 1]"}</p>
              <p>{"Standard: z  = (x - μ) / σ ~ N(0, 1)"}</p>
              <p>{"Robust:   x_rob = (x - Median) / (Q₃ - Q₁) = (x - Q₂) / IQR"}</p>
              <p>{"Log1p:    x_log = ln(1 + x) ==> z_log = (x_log - μ_log) / σ_log"}</p>
            </div>
            <p className="text-xs text-slate-400">
              MinMax provides hard bounds [0, 1]; StandardScaler provides unit variance; RobustScaler resists outliers; Log1p linearizes Pareto right-tails.
            </p>
          </div>

          {/* Card 4: Breakdown Point Resilience */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-emerald-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              4. Breakdown Point of Robust Estimators
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {"Breakdown point ε* measures the proportion of arbitrary corrupted outliers an estimator can withstand before outputting infinity:"}
            </p>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-xs text-emerald-200 space-y-1">
              <p>{"ε*(Mean, StdDev) = 0%   (Non-robust L2 statistics: 1 outlier ruins them)"}</p>
              <p>{"ε*(Median)       = 50%  (Highest possible robustness)"}</p>
              <p>{"ε*(IQR)          = 25%  (Resists up to 25% extreme wealth outliers)"}</p>
            </div>
            <p className="text-xs text-slate-400">
              RobustScaler achieves mathematical resilience against executive wealth concentrations in Indian financial cohorts.
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
              Real-world deployment of feature scaling across FinTech, commercial real estate, grocery, and healthcare
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Case 1 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-3 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Case 1: FinTech Micro-Lending</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                Barrackpore & Ichapur
              </span>
            </div>
            <h3 className="text-base font-bold text-white">Credit-Risk Peer Matching with KNN</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Context & Challenge:</strong> Susmita oversees underwriting for an NBFC in Barrackpore offering unsecured working capital. Evaluating applicants using KNN (K=5) on Age (22-58) and Income (₹3.5L-₹18L). Unscaled distance caused 23-year-olds with ₹14 LPA to be paired with 54-year-olds nearing retirement purely because of similar salary tiers.
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Implementation & Impact:</strong> Implemented `StandardScaler` inside a Scikit-Learn `Pipeline`. Age and Income were standardized to unit variance. KNN neighbor selection shifted to demographically coherent peers, reducing credit default classification error by 27.4%.
            </p>
          </div>

          {/* Case 2 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-3 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">Case 2: Commercial Real Estate</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                New Town Action Area II
              </span>
            </div>
            <h3 className="text-base font-bold text-white">Commercial Lease Valuation Gradient Descent</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Context & Challenge:</strong> Debangshu built an automated valuation model for commercial office towers in New Town. Features included Building Age (2-25 yrs) and Tenant Payroll (₹15 Lakhs to ₹35 Crores). Gradient descent failed to converge within 5,000 iterations, oscillating wildly due to a Hessian condition number κ &gt; 10⁸.
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Implementation & Impact:</strong> Applied `RobustScaler` on Payroll to handle VC-funded startup outliers, and `StandardScaler` on Building Age. Gradient descent converged stably in 140 epochs.
            </p>
          </div>

          {/* Case 3 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-3 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">Case 3: Quick-Commerce CLV Clustering</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                Howrah & Central Kolkata
              </span>
            </div>
            <h3 className="text-base font-bold text-white">Customer Segmentation with K-Means</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Context & Challenge:</strong> Mahima directs customer segmentation on Age (20-60) and Monthly Grocery Spend (₹2,000 to ₹85,000). Unscaled K-Means produced vertical stripe clusters based purely on grocery spend, completely ignoring customer age cohorts.
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Implementation & Impact:</strong> Applied `MinMaxScaler` with hard boundary clipping [0, 1]. K-Means successfully segmented customers into 4 distinct quadrants: Young Budget, Young Gourmet, Family Bulk, and Senior Traditional.
            </p>
          </div>

          {/* Case 4 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-3 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Case 4: Epidemiological Risk Modeling</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                Siliguri & Jadavpur
              </span>
            </div>
            <h3 className="text-base font-bold text-white">Cardiovascular Health Triage with SVM RBF</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Context & Challenge:</strong> Abhronila manages predictive triage for tea garden workers and urban patients. Predicting cardiovascular risk using Age (30-80) and Household Income (₹40,000 to ₹12,00,000). SVM with RBF kernel achieved only 52% accuracy (random guessing).
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Implementation & Impact:</strong> The RBF kernel exponent γ||x - x'||² was overwhelmed by income squared differences. Log-transformed household income and applied Z-Score standardization. SVM RBF accuracy jumped to 89.6%.
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
              Crucial architectural traps: sparse matrix densification, outlier squashing, and unnecessary scaling
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Pitfall 1 */}
          <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3 shadow-xl">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
              <span>⚠ Pitfall 1: Densifying Sparse Matrices (with_mean=True)</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Applying `StandardScaler(with_mean=True)` on sparse CSR matrices. Subtracting the mean μ from zero coordinates turns millions of structural zeroes into dense floats, causing catastrophic Out-Of-Memory (OOM) crashes.
            </p>
            <div className="p-3 rounded-xl bg-slate-950 font-mono text-[11px] text-rose-300 border border-rose-900/30">
              # FATAL OOM DENSIFICATION CRIME<br />
              scaler = StandardScaler(with_mean=True)<br />
              X_dense = scaler.fit_transform(X_sparse) # Explodes 50MB to 32GB!
            </div>
            <div className="p-3 rounded-xl bg-emerald-950/40 font-mono text-[11px] text-emerald-300 border border-emerald-800/40">
              # PRODUCTION BEST PRACTICE<br />
              scaler = StandardScaler(with_mean=False) # Preserves zeroes!<br />
              # Or use MaxAbsScaler(): x' = x / |max|
            </div>
          </div>

          {/* Pitfall 2 */}
          <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3 shadow-xl">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
              <span>⚠ Pitfall 2: Outlier Variance Squashing in MinMaxScaler</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Using `MinMaxScaler` on heavy-tailed income features with extreme executive outliers. The outlier inflates the denominator, compressing 90% of ordinary applicants into an indistinguishable narrow band [0.0, 0.15].
            </p>
            <div className="p-3 rounded-xl bg-slate-950 font-mono text-[11px] text-rose-300 border border-rose-900/30">
              # SQUASHING DISTORTION ANTIPATTERN<br />
              # CEO earning ₹100 LPA squashes ₹15 LPA down to 0.12!
            </div>
            <div className="p-3 rounded-xl bg-emerald-950/40 font-mono text-[11px] text-emerald-300 border border-emerald-800/40">
              # PRODUCTION BEST PRACTICE<br />
              from sklearn.preprocessing import RobustScaler<br />
              scaler = RobustScaler() # Scales by Median and IQR!
            </div>
          </div>

          {/* Pitfall 3 */}
          <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3 shadow-xl">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
              <span>⚠ Pitfall 3: Unnecessary Scaling on Tree Models</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Spending pipeline CPU cycles and serialization overhead standardizing features before feeding them into Random Forest, XGBoost, or LightGBM. Decision trees split based on sorted rank order, making them 100% invariant to scaling.
            </p>
            <div className="p-3 rounded-xl bg-slate-950 font-mono text-[11px] text-rose-300 border border-rose-900/30">
              # REDUNDANT COMPUTATIONAL WASTE<br />
              X_scaled = StandardScaler().fit_transform(X)<br />
              XGBClassifier().fit(X_scaled, y) # Zero accuracy benefit!
            </div>
            <div className="p-3 rounded-xl bg-emerald-950/40 font-mono text-[11px] text-emerald-300 border border-emerald-800/40">
              # PRODUCTION BEST PRACTICE<br />
              XGBClassifier().fit(X_raw, y) # Native raw features optimal!
            </div>
          </div>

          {/* Pitfall 4 */}
          <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-3 shadow-xl">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
              <span>⚠ Pitfall 4: Out-of-Bounds Inference Serving without Clipping</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Deploying `MinMaxScaler` without `clip=True`. When a streaming customer arrives with an income higher than training set x_max, the transformed value exceeds 1.0, causing unexpected saturation in sigmoid/softmax neural layers.
            </p>
            <div className="p-3 rounded-xl bg-slate-950 font-mono text-[11px] text-rose-300 border border-rose-900/30">
              # UNBOUNDED INFERENCE HAZARD<br />
              scaler = MinMaxScaler() # Defaults to clip=False<br />
              scaler.transform([[60.0]]) # Yields 1.268 (&gt; 1.0)!
            </div>
            <div className="p-3 rounded-xl bg-emerald-950/40 font-mono text-[11px] text-emerald-300 border border-emerald-800/40">
              # PRODUCTION BEST PRACTICE<br />
              scaler = MinMaxScaler(clip=True) # Clamps strictly to [0.0, 1.0]
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
              Pure Python simulation engine, comprehensive study handbook, 30 graded questions, and instructor bio
            </p>
          </div>
        </div>

        {/* Resource Tabs */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-slate-900/90 rounded-2xl border border-slate-800">
          {[
            { id: "lab", label: "Python Laboratory Code" },
            { id: "notes", label: "Comprehensive Study Notes (350+ Lines)" },
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
                    File: <code className="text-indigo-300">worked_example_4_scaling_age_and_income_features_lab.py</code>
                  </p>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono">
                  Verified: Exit Code 0
                </span>
              </div>
              <PythonFileLoader code={labCode} filename="worked_example_4_scaling_age_and_income_features_lab.py" />
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
                    File: <code className="text-indigo-300">topic24_note.txt</code> • 350+ Lines
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

export default Topic24;
