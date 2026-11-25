import React, { useState, useId, useMemo } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";
import { BlockMath, InlineMath } from "../../../../../common/MathView";

import labCode from "./topic6_files/data_preprocessing_concept_lab.py?raw";
import noteText from "./topic6_files/topic6_note.txt?raw";
import questions from "./topic6_files/topic6_questions.js";

// =============================================================================
// SYNTHETIC INTERACTIVE DATASETS & UTILITIES
// =============================================================================

const INITIAL_RAW_ROWS = [
  { id: "WB-BDN-101", region: "Bidhannagar", load_kw: 5.0, kwh: 320.5, meter: "Smart_IoT", status: "Paid", isDuplicate: false, isOutlier: false, isMissing: false },
  { id: "WB-RJH-102", region: "Rajarhat", load_kw: 3.0, kwh: null, meter: "Smart_IoT", status: "Overdue", isDuplicate: false, isOutlier: false, isMissing: true },
  { id: "WB-BKP-103", region: "barrackpore", load_kw: 4.5, kwh: 9999.0, meter: "Electromechanical", status: "Paid", isDuplicate: false, isOutlier: true, isMissing: false },
  { id: "WB-BDN-101", region: "Bidhannagar", load_kw: 5.0, kwh: 320.5, meter: "Smart_IoT", status: "Paid", isDuplicate: true, isOutlier: false, isMissing: false },
  { id: "WB-HOW-104", region: "Howrah", load_kw: 6.0, kwh: 410.0, meter: "Electronic", status: "Overdue", isDuplicate: false, isOutlier: false, isMissing: false },
  { id: "WB-KOL-105", region: "Kolkata", load_kw: 2.5, kwh: 185.0, meter: null, status: "Paid", isDuplicate: false, isOutlier: false, isMissing: true },
  { id: "WB-RJH-106", region: "Rajarhat", load_kw: 7.5, kwh: 550.0, meter: "Smart_IoT", status: "Pending", isDuplicate: false, isOutlier: false, isMissing: false },
  { id: "WB-BKP-107", region: "Barrackpore", load_kw: 1.5, kwh: 95.0, meter: "Electromechanical", status: "Overdue", isDuplicate: false, isOutlier: false, isMissing: false },
];

const JARGON_TERMS = [
  { term: "GIGO (Garbage In, Garbage Out)", tag: "Fundamental Law", desc: "If training data contains errors, noise, or biases, the ML model's calibrated parameters will inherently output flawed predictions." },
  { term: "Data Leakage", tag: "Architectural Bug", desc: "When information from the validation or test set unintentionally influences the training transformation parameters, creating false optimism." },
  { term: "Imputation", tag: "Cleaning", desc: "The mathematical replacement of missing values using statistically estimated quantities (mean, median, mode, or MICE models)." },
  { term: "Min-Max Normalization", tag: "Scaling", desc: "Rescaling numerical attributes linearly into a bounded interval [0, 1] via (x - min) / (max - min)." },
  { term: "Z-Score Standardization", tag: "Scaling", desc: "Transforming features to have zero mean and unit variance via (x - mu) / sigma, preserving outlier distances." },
  { term: "Robust Scaler (IQR)", tag: "Outlier Scaling", desc: "Rescaling features using median and Interquartile Range (Q3 - Q1), making it impervious to extreme outliers." },
  { term: "One-Hot Encoding", tag: "Encoding", desc: "Representing nominal categories as orthogonal binary indicators (0 or 1), preventing false ordinal math assumptions." },
  { term: "Ordinal Encoding", tag: "Encoding", desc: "Mapping ordered categories into rank-preserving integers (e.g., Low=0, Medium=1, High=2)." },
  { term: "Outlier Fencing (Tukey)", tag: "Sanitization", desc: "Detecting anomalous observations outside the bounds [Q1 - 1.5*IQR, Q3 + 1.5*IQR]." },
  { term: "Condition Number κ(H)", tag: "Optimization", desc: "The ratio of maximum to minimum eigenvalues of the loss Hessian; high κ from unscaled features stalls gradient descent." },
  { term: "Training-Serving Skew", tag: "Production", desc: "The discrepancy in feature computation between offline training pipelines and online real-time inference APIs." },
  { term: "Scikit-Learn Pipeline", tag: "Architecture", desc: "An architectural construct that chains transformers and models, enforcing fit-on-train and transform-on-test." },
];

const ALGORITHM_SENSITIVITY_DATA = {
  knn: {
    name: "k-Nearest Neighbors (k-NN)",
    family: "Instance-Based Distance Metric",
    scalingReq: "CRITICAL (Mandatory)",
    missingTol: "Zero Tolerance (Crashes)",
    outlierSens: "Extreme (Distorts Neighbors)",
    score: 95,
    summary: "Computes Euclidean distances in R^d. An unscaled feature with scale 10,000 completely drowns out a feature of scale 1.0, rendering other features mathematically invisible.",
    formula: "d(\\mathbf{p}, \\mathbf{q}) = \\sqrt{\\sum_{i=1}^d (p_i - q_i)^2}"
  },
  svm: {
    name: "Support Vector Machines (SVM)",
    family: "Maximum Margin Classifier",
    scalingReq: "CRITICAL (Mandatory)",
    missingTol: "Zero Tolerance (Crashes)",
    outlierSens: "High (Affects Support Vectors)",
    score: 90,
    summary: "Maximizes the geometric margin 2 / ||w||. In RBF kernels, gamma * ||x - z||^2 is dominated by the largest feature, destroying non-linear boundary projection.",
    formula: "K(\\mathbf{x}, \\mathbf{z}) = \\exp(-\\gamma \\|\\mathbf{x} - \\mathbf{z}\\|^2)"
  },
  linear: {
    name: "Linear / Logistic Regression",
    family: "Parametric Generalized Linear",
    scalingReq: "Strongly Recommended (Mandatory with L1/L2)",
    missingTol: "Zero Tolerance (NaNs break dot products)",
    outlierSens: "High (High Leverage Points)",
    score: 80,
    summary: "Without scaling, gradient descent oscillates along steep canyon walls. With L1/L2 regularization, the penalty lambda * sum(w^2) unfairly suppresses weights of smaller-scale features.",
    formula: "\\min_{\\mathbf{w}} \\frac{1}{N}\\sum L(h(\\mathbf{x}_i), y_i) + \\lambda \\|\\mathbf{w}\\|^2"
  },
  neural: {
    name: "Deep Neural Networks (MLP)",
    family: "Differentiable Computation Graph",
    scalingReq: "CRITICAL (Mandatory for Stability)",
    missingTol: "Zero Tolerance (NaN propagation)",
    outlierSens: "High (Gradient Explosions)",
    score: 92,
    summary: "Unscaled inputs cause saturation in activation functions (Sigmoid/Tanh) or exploding gradients in ReLU, stalling backpropagation across deep layers.",
    formula: "\\mathbf{z}^{[l]} = \\mathbf{W}^{[l]}\\mathbf{a}^{[l-1]} + \\mathbf{b}^{[l]}"
  },
  tree: {
    name: "Decision Trees & Random Forests",
    family: "Axis-Aligned Recursive Partitioning",
    scalingReq: "NOT REQUIRED (Scale Invariant)",
    missingTol: "High (Native Split Surrogate in XGBoost)",
    outlierSens: "Low (Monotonic Split Invariant)",
    score: 15,
    summary: "Trees evaluate split thresholds based on sorted rank order (x_i <= threshold). Multiplying a feature by 10,000 does not alter the sorted ordering or Information Gain.",
    formula: "\\Delta I = I(D) - \\frac{|D_L|}{|D|}I(D_L) - \\frac{|D_R|}{|D|}I(D_R)"
  }
};

const DIAGNOSTIC_QUIZ_QUESTIONS = [
  {
    id: 1,
    scenario: "An ML engineer at Salt Lake Sector V scales their training dataset using StandardScaler, fits a model, and achieves 96% accuracy. In production, however, live accuracy drops to 71%. What preprocessing defect likely caused this?",
    options: [
      { id: "A", text: "They used MinMax scaling instead of Robust scaling." },
      { id: "B", text: "They called scaler.fit_transform(X) on the whole dataset before splitting into train/test, causing severe Data Leakage." },
      { id: "C", text: "They omitted one-hot encoding on numerical features." },
      { id: "D", text: "They used Median imputation instead of Mean imputation." }
    ],
    correct: "B",
    explanation: "Fitting a scaler or transformer on the entire dataset leaks distribution parameters (mean and standard deviation) from the test set into the training phase. The model overfits to the leaked test distribution, giving deceptively high cross-validation scores that collapse in production.",
    mentorTip: "Sukanta Hui says: Always wrap your preprocessors in a Scikit-Learn Pipeline! The pipeline strictly calls .fit() during training and .transform() during evaluation."
  },
  {
    id: 2,
    scenario: "You are analyzing smart meter telemetry for WBSEDCL in Bidhannagar. 98% of power consumption values range between 100 kWh and 600 kWh, but lightning strikes produced several readings of 9999.0 kWh. Which imputation and scaling strategy is optimal?",
    options: [
      { id: "A", text: "Mean imputation + Min-Max Normalization" },
      { id: "B", text: "Median imputation + RobustScaler (or IQR clipping + StandardScaler)" },
      { id: "C", text: "Drop all rows with values above 500 kWh + Ordinal Encoding" },
      { id: "D", text: "Mode imputation + Log-odds scaling" }
    ],
    correct: "B",
    explanation: "Extreme electrical spikes (9999 kWh) heavily distort the arithmetic mean and compress Min-Max scaling into a tiny near-zero band. The median is non-parametric and resistant to outliers, and RobustScaler uses the Interquartile Range (IQR) so normal consumption values retain healthy variance.",
    mentorTip: "Remember: Mean and MinMax are fragile. Median and RobustScaler are bulletproof when dealing with real-world sensor spikes."
  },
  {
    id: 3,
    scenario: "Why does the k-Nearest Neighbors (k-NN) algorithm require feature scaling, while Decision Trees run perfectly on raw unscaled features?",
    options: [
      { id: "A", text: "k-NN is an iterative gradient descent algorithm, whereas Decision Trees use linear algebra." },
      { id: "B", text: "k-NN computes geometric distances (Euclidean norm) where large-magnitude features dominate; Decision Trees perform rank-order orthogonal threshold splits invariant to scale." },
      { id: "C", text: "Decision Trees automatically convert all features into categorical probabilities before splitting." },
      { id: "D", text: "k-NN cannot handle continuous floating-point numbers without normalization." }
    ],
    correct: "B",
    explanation: "In Euclidean distance d(p, q) = sqrt(sum(p_i - q_i)^2), a difference of Rs 5,000 in salary produces a term of 25,000,000, rendering a 5-year age difference negligible. Decision trees only evaluate whether x_i <= threshold; monotonic scaling preserves identical sample sorting.",
    mentorTip: "Keep this rule locked in memory: Distance-based models (k-NN, SVM, k-Means) and Gradient-based models REQUIRE scaling. Tree-based models DO NOT."
  },
  {
    id: 4,
    scenario: "A data scientist at Kolkata Metro Rail Corporation wants to encode the 'hour_of_departure' (integers 0 to 23). What happens if they use standard integer encoding?",
    options: [
      { id: "A", text: "The model runs faster with no mathematical consequences." },
      { id: "B", text: "The model incorrectly assumes 23:00 and 00:00 are separated by a massive distance of 23 hours rather than 1 hour." },
      { id: "C", text: "The dataset memory footprint expands by 24x." },
      { id: "D", text: "It causes immediate gradient divergence in linear regression." }
    ],
    correct: "B",
    explanation: "Temporal features are cyclical. Hour 23 (11 PM) and Hour 0 (midnight) are contiguous in physical reality (1 hour apart), but integer encoding creates a giant numerical cliff (23 vs 0). Cyclical sine/cosine transformation projects hours onto the unit circle to preserve continuity.",
    mentorTip: "Always transform circular features (hours 0-23, days of week 0-6, wind direction 0-360 deg) into sin and cos pairs!"
  },
  {
    id: 5,
    scenario: "In an e-commerce platform in Barrackpore, a feature 'delivery_pin_code' contains 4,500 distinct postal codes. What risk arises from blindly applying One-Hot Encoding?",
    options: [
      { id: "A", text: "Zero division errors during matrix multiplication." },
      { id: "B", text: "Cardinality explosion causing severe sparsity, memory bloat, and tree overfitting (Curse of Dimensionality)." },
      { id: "C", text: "It converts numerical features into text strings." },
      { id: "D", text: "It forces the loss function to become non-convex." }
    ],
    correct: "B",
    explanation: "One-Hot Encoding a feature with 4,500 unique categories creates 4,500 new sparse binary columns. This triggers the curse of dimensionality, inflates memory by orders of magnitude, and causes tree models to construct deep, fragile branches. Target encoding or frequency encoding is required.",
    mentorTip: "If cardinality > 15-20, avoid One-Hot Encoding! Use Frequency Encoding, Target Encoding with smoothing, or Entity Embeddings."
  }
];

// =============================================================================
// MAIN COMPONENT: TOPIC 6 MASTERCLASS
// =============================================================================

const Topic6 = () => {
  // Navigation State
  const [activeSection, setActiveSection] = useState("noviceMasterclass");

  // Novice Classrooms Subtab State
  const [noviceSubtab, setNoviceSubtab] = useState("metaphor");
  const [jargonSearch, setJargonSearch] = useState("");

  // Studio Mode State
  const [studioMode, setStudioMode] = useState("pipelineFlow"); // 'pipelineFlow' | 'leakage' | 'sensitivity'

  // Pipeline Flow Step State (0 = Raw, 1 = Deduplicate/Clean, 2 = Impute, 3 = Outliers, 4 = Scaled/Encoded)
  const [pipelineStep, setPipelineStep] = useState(0);

  // Leakage Sandbox State
  const [testLeakageRatio, setTestLeakageRatio] = useState(30); // 30% test size
  const [leakageMode, setLeakageMode] = useState("leaky"); // 'leaky' | 'strict'

  // Algorithm Sensitivity State
  const [selectedAlgo, setSelectedAlgo] = useState("knn");

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
  // PIPELINE FLOW COMPUTATION
  // ---------------------------------------------------------------------------
  const computedPipelineRows = useMemo(() => {
    let rows = INITIAL_RAW_ROWS.map((r) => ({ ...r }));

    // Step 1: Deduplication & String standardizing
    if (pipelineStep >= 1) {
      const seen = new Set();
      rows = rows.filter((r) => {
        if (seen.has(r.id)) return false;
        seen.add(r.id);
        return true;
      });
      rows = rows.map((r) => ({
        ...r,
        region: r.region.charAt(0).toUpperCase() + r.region.slice(1).toLowerCase(),
      }));
    }

    // Step 2: Missing Value Imputation (Median for kWh, Mode for meter)
    if (pipelineStep >= 2) {
      rows = rows.map((r) => ({
        ...r,
        kwh: r.kwh === null ? 365.0 : r.kwh, // Imputed median
        meter: r.meter === null ? "Smart_IoT" : r.meter, // Imputed mode
        isMissing: false,
      }));
    }

    // Step 3: Outlier Capping (IQR bounds [95, 600])
    if (pipelineStep >= 3) {
      rows = rows.map((r) => ({
        ...r,
        kwh: r.kwh > 800.0 ? 550.0 : r.kwh, // Capped
        isOutlier: false,
      }));
    }

    // Step 4: Min-Max Scaling on load_kw & kwh [0, 1]
    if (pipelineStep >= 4) {
      const kwhVals = rows.map((r) => r.kwh);
      const minK = Math.min(...kwhVals);
      const maxK = Math.max(...kwhVals);
      const spanK = maxK - minK || 1;

      const loadVals = rows.map((r) => r.load_kw);
      const minL = Math.min(...loadVals);
      const maxL = Math.max(...loadVals);
      const spanL = maxL - minL || 1;

      rows = rows.map((r) => ({
        ...r,
        kwh_scaled: Number(((r.kwh - minK) / spanK).toFixed(3)),
        load_scaled: Number(((r.load_kw - minL) / spanL).toFixed(3)),
        isOneHot: true,
      }));
    }

    return rows;
  }, [pipelineStep]);

  // Health Score Calculation based on Pipeline Step
  const healthScore = useMemo(() => {
    switch (pipelineStep) {
      case 0: return { score: 38, label: "Raw & Corrupted", color: "text-red-400", bg: "bg-red-500" };
      case 1: return { score: 60, label: "Deduplicated & Cleaned", color: "text-amber-400", bg: "bg-amber-500" };
      case 2: return { score: 78, label: "Nulls Imputed", color: "text-yellow-300", bg: "bg-yellow-500" };
      case 3: return { score: 90, label: "Outliers Fenced", color: "text-cyan-400", bg: "bg-cyan-500" };
      case 4: return { score: 100, label: "Scaled & Production Ready", color: "text-emerald-400", bg: "bg-emerald-500" };
      default: return { score: 38, label: "Raw", color: "text-red-400", bg: "bg-red-500" };
    }
  }, [pipelineStep]);

  // ---------------------------------------------------------------------------
  // DATA LEAKAGE CALCULATOR
  // ---------------------------------------------------------------------------
  const leakageStats = useMemo(() => {
    // True underlying distribution: Train has normal power, Test has summer peak power
    const trainTrueMean = 320.0;
    const trainTrueStd = 45.0;
    const testTrueMean = 580.0; // Higher mean in test!
    const testTrueStd = 60.0;

    const testWeight = testLeakageRatio / 100;
    const trainWeight = 1 - testWeight;
    const leakedGlobalMean = trainTrueMean * trainWeight + testTrueMean * testWeight;

    // In a leaky pipeline, test distribution leaks into training scaler
    const optimisticTestAcc = (94.5 + testWeight * 4).toFixed(1);
    const realisticProdAcc = (94.5 - testWeight * 14).toFixed(1);
    const leakageDelta = (optimisticTestAcc - realisticProdAcc).toFixed(1);

    return {
      trainTrueMean,
      testTrueMean,
      leakedGlobalMean: leakedGlobalMean.toFixed(1),
      optimisticTestAcc,
      realisticProdAcc,
      leakageDelta,
    };
  }, [testLeakageRatio]);

  // Handle Quiz Option Selection
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
              BCAC701B • Data Types and Preprocessing • Topic 6
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Academic Masterclass
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full">
              Production Gateway
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Data Preprocessing Concept &amp; Pipeline Architecture
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-4xl">
            Master the foundational engineering discipline that transforms noisy, unscaled, and missing 
            enterprise records into mathematically optimal feature tensors. Discover the GIGO imperative, 
            the 6-pillar preprocessing lifecycle, strict anti-leakage hygiene, and loss landscape optimization.
          </p>

          <div className="flex flex-wrap gap-4 pt-2 text-xs font-medium text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-400" />
              West Bengal Telemetry Datasets
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              Interactive 5-Stage Pipeline Simulator
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Anti-Leakage Sandbox
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
          { id: "interactiveStudio", label: "2. Pipeline Studio" },
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
              Build rock-solid intuition before touching mathematical equations or code.
            </p>
          </div>

          <div className="flex bg-slate-800/80 p-1 rounded-xl border border-slate-700 text-xs font-semibold">
            {[
              { id: "metaphor", label: "Real-World Metaphors" },
              { id: "lifecycle", label: "5-Stage Lifecycle" },
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
                ⛏️
              </div>
              <h3 className="text-lg font-bold text-white">Gold Ore Refining</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Raw data is like crude, unrefined gold ore extracted from the earth: full of dirt, rubble, 
                and toxic impurities. Just as jewelers cannot mold unrefined rocks into ornaments, machine 
                learning models cannot fit mathematical weights to noisy, uncalibrated raw datasets without refining.
              </p>
              <div className="pt-2 text-xs text-amber-300/80 font-mono">
                Formula: Crude Ore (Raw) → Smelting (Cleaning) → 24K Bullion (Engineered Matrix)
              </div>
            </div>

            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800/80 hover:border-cyan-500/40 transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center justify-center text-2xl font-bold">
                💧
              </div>
              <h3 className="text-lg font-bold text-white">Palta Water Filtration Plant</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Raw Hooghly River water entering the Palta Waterworks near Barrackpore flows through sedimentation 
                tanks (deduplication), chemical flocculation (imputation), sand filtration (outlier removal), 
                and chlorination (normalization) before being safe for municipal drinking across Kolkata.
              </p>
              <div className="pt-2 text-xs text-cyan-300/80 font-mono">
                Formula: River Inflow → Coagulation → Sand Filter → Pure Potable Water
              </div>
            </div>

            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800/80 hover:border-emerald-500/40 transition-all space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center text-2xl font-bold">
                👨‍🍳
              </div>
              <h3 className="text-lg font-bold text-white">Chef's "Mise en Place"</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                A master chef at a fine dining restaurant in Park Street never cooks with unwashed, uncut vegetables. 
                Everything is peeled, weighed, partitioned, and prepped in advance (mise en place). In ML, preprocessing 
                ensures that training algorithms focus 100% on optimization rather than tripping over bad ingredients.
              </p>
              <div className="pt-2 text-xs text-emerald-300/80 font-mono">
                Formula: Raw Vegetables → Washed, Diced, Measured → Michelin Star Dish
              </div>
            </div>
          </div>
        )}

        {/* SUBTAB 2: LIFECYCLE MATRIX */}
        {noviceSubtab === "lifecycle" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {[
                { stage: "Stage 1", name: "Data Quality Audit", icon: "🔍", action: "Profile nulls, cardinality, schema drift & duplicate ratios." },
                { stage: "Stage 2", name: "Data Cleaning", icon: "🧹", action: "Deduplicate rows, impute missing values, cap outliers via IQR." },
                { stage: "Stage 3", name: "Transformation", icon: "⚡", action: "Log transforms on skewed tails, Box-Cox, cyclical sin/cos." },
                { stage: "Stage 4", name: "Feature Scaling", icon: "📐", action: "Min-Max normalization [0, 1] or Z-score standardization N(0, 1)." },
                { stage: "Stage 5", name: "Encoding & Packing", icon: "🗂️", action: "One-Hot encode nominal categories, assemble numeric matrix X." },
              ].map((item, idx) => (
                <div key={idx} className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">{item.stage}</span>
                    <span className="text-lg">{item.icon}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{item.name}</h4>
                  <p className="text-xs text-slate-300">{item.action}</p>
                </div>
              ))}
            </div>

            <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 text-xs sm:text-sm text-slate-300 space-y-2">
              <h4 className="font-bold text-indigo-300 flex items-center gap-2">
                <span>⚠️</span> The Golden Law of Preprocessing Order
              </h4>
              <p>
                Never scale before cleaning! If you attempt Min-Max scaling on a column containing an outlier of <code className="text-cyan-300 font-mono">9999.0</code>, 
                the denominator <code className="text-cyan-300 font-mono">(max - min)</code> expands massively, compressing legitimate data into an unrecoverable sliver near 0.0. 
                Always follow the sequence: <strong className="text-white">Audit → Clean &amp; Impute → Clip Outliers → Scale → Encode</strong>.
              </p>
            </div>
          </div>
        )}

        {/* SUBTAB 3: JARGON BUSTER */}
        {noviceSubtab === "jargon" && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Search vocabulary terms (e.g. leakage, imputation, GIGO, z-score)..."
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
      {/* SECTION 2: INTERACTIVE PIPELINE & TRANSFORMATION STUDIO */}
      {/* ===================================================================== */}
      <section id="interactiveStudio" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-sm font-bold border border-cyan-500/30">
                02
              </span>
              Interactive Pipeline &amp; Transformation Studio
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Step through live data transformation, visualize data leakage risks, and compare algorithm sensitivities.
            </p>
          </div>

          <div className="flex bg-slate-800/80 p-1 rounded-xl border border-slate-700 text-xs font-semibold">
            {[
              { id: "pipelineFlow", label: "Live Pipeline Flow" },
              { id: "leakage", label: "Anti-Leakage Sandbox" },
              { id: "sensitivity", label: "Algorithm Sensitivity" },
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

        {/* MODE A: LIVE PIPELINE FLOW */}
        {studioMode === "pipelineFlow" && (
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-6">
            {/* Pipeline Stage Buttons */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Select Pipeline Processing Stage:
                </span>
                <span className={clsx("text-xs font-bold px-2.5 py-1 rounded-full", healthScore.color, "bg-slate-800")}>
                  Dataset Health: {healthScore.score}% ({healthScore.label})
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={clsx("h-full transition-all duration-500", healthScore.bg)}
                  style={{ width: `${healthScore.score}%` }}
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
                {[
                  { step: 0, title: "0. Raw Ingest", subtitle: "Corrupted records" },
                  { step: 1, title: "1. Deduplicate", subtitle: "Remove duplicates & fix casing" },
                  { step: 2, title: "2. Imputation", subtitle: "Fill nulls (Median & Mode)" },
                  { step: 3, title: "3. Outlier Fencing", subtitle: "Cap 9999.0 kWh via IQR" },
                  { step: 4, title: "4. Scale & Vectorize", subtitle: "MinMax [0, 1] normalization" },
                ].map((s) => (
                  <button
                    key={s.step}
                    onClick={() => setPipelineStep(s.step)}
                    className={clsx(
                      "p-2.5 rounded-xl text-left border transition-all",
                      pipelineStep === s.step
                        ? "bg-cyan-950/80 border-cyan-500/60 shadow-lg shadow-cyan-950/50"
                        : "bg-slate-800/60 border-slate-700/60 hover:bg-slate-800"
                    )}
                  >
                    <div className="text-xs font-bold text-white">{s.title}</div>
                    <div className="text-[10px] text-slate-400 truncate">{s.subtitle}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Live Interactive Data Table */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Active Table: {computedPipelineRows.length} Consumer Telemetry Records</span>
                <span className="font-mono text-cyan-300">
                  {pipelineStep === 0 && "Showing raw anomalies: duplicate BDN-101, missing RJH-102 & KOL-105, spike BKP-103"}
                  {pipelineStep === 1 && "Duplicate BDN-101 evicted. Region casings normalized."}
                  {pipelineStep === 2 && "Missing values imputed: kWh → 365.0 (median), meter → Smart_IoT (mode)"}
                  {pipelineStep === 3 && "Outlier 9999.0 kWh capped to 550.0 kWh (upper IQR boundary)"}
                  {pipelineStep === 4 && "All features scaled to [0.0, 1.0] interval. Ready for model ingestion."}
                </span>
              </div>

              <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950/60">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-900 border-b border-slate-800 text-slate-400">
                    <tr>
                      <th className="p-2.5">Consumer ID</th>
                      <th className="p-2.5">Region</th>
                      <th className="p-2.5">Sanctioned Load (kW)</th>
                      <th className="p-2.5">Monthly Cons (kWh)</th>
                      <th className="p-2.5">Meter Hardware</th>
                      <th className="p-2.5">Bill Status</th>
                      {pipelineStep >= 4 && <th className="p-2.5 text-cyan-400">kwh_scaled [0-1]</th>}
                      {pipelineStep >= 4 && <th className="p-2.5 text-cyan-400">load_scaled [0-1]</th>}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {computedPipelineRows.map((row, idx) => (
                      <tr
                        key={idx}
                        className={clsx(
                          "transition-colors",
                          row.isDuplicate && "bg-red-950/30 text-red-300",
                          row.isOutlier && "bg-amber-950/30 text-amber-300",
                          row.isMissing && "bg-purple-950/30 text-purple-300"
                        )}
                      >
                        <td className="p-2.5 font-bold text-white flex items-center gap-1.5">
                          {row.id}
                          {row.isDuplicate && <span className="text-[10px] bg-red-500/20 px-1.5 py-0.5 rounded text-red-300">DUPE</span>}
                        </td>
                        <td className="p-2.5">{row.region}</td>
                        <td className="p-2.5">{row.load_kw} kW</td>
                        <td className="p-2.5">
                          {row.kwh === null ? (
                            <span className="text-purple-400 font-bold">NULL (Missing)</span>
                          ) : (
                            <span className={clsx(row.isOutlier && "text-amber-400 font-bold")}>
                              {row.kwh} kWh {row.isOutlier && "⚡ SPIKE"}
                            </span>
                          )}
                        </td>
                        <td className="p-2.5">
                          {row.meter === null ? (
                            <span className="text-purple-400 font-bold">NULL (Missing)</span>
                          ) : (
                            row.meter
                          )}
                        </td>
                        <td className="p-2.5">
                          <span
                            className={clsx(
                              "px-2 py-0.5 rounded-full text-[10px] font-semibold",
                              row.status === "Paid" && "bg-emerald-500/20 text-emerald-300",
                              row.status === "Pending" && "bg-yellow-500/20 text-yellow-300",
                              row.status === "Overdue" && "bg-rose-500/20 text-rose-300"
                            )}
                          >
                            {row.status}
                          </span>
                        </td>
                        {pipelineStep >= 4 && (
                          <td className="p-2.5 font-bold text-cyan-300 bg-cyan-950/20">{row.kwh_scaled}</td>
                        )}
                        {pipelineStep >= 4 && (
                          <td className="p-2.5 font-bold text-cyan-300 bg-cyan-950/20">{row.load_scaled}</td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* MODE B: DATA LEAKAGE SANDBOX */}
        {studioMode === "leakage" && (
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>🔬</span> Simulating Data Leakage Dynamics
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Data Leakage happens when global statistics (like dataset mean or standard deviation) are 
                  computed across both Train and Test splits simultaneously. In this simulation, notice how 
                  the training scaler becomes contaminated as the test partition size changes.
                </p>

                <div className="space-y-2 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-400">Test Split Proportion:</span>
                    <span className="text-cyan-300 font-mono">{testLeakageRatio}% Test / {100 - testLeakageRatio}% Train</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    step="5"
                    value={testLeakageRatio}
                    onChange={(e) => setTestLeakageRatio(Number(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>10% (Small Test)</span>
                    <span>30% (Standard)</span>
                    <span>50% (Equal Split)</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setLeakageMode("leaky")}
                    className={clsx(
                      "flex-1 p-3 rounded-xl border text-xs font-bold transition-all",
                      leakageMode === "leaky"
                        ? "bg-rose-950/60 border-rose-500 text-rose-300 shadow-md shadow-rose-950/40"
                        : "bg-slate-800/60 border-slate-700 text-slate-400 hover:text-white"
                    )}
                  >
                    ❌ Leaky Architecture (fit_transform on whole X)
                  </button>
                  <button
                    onClick={() => setLeakageMode("strict")}
                    className={clsx(
                      "flex-1 p-3 rounded-xl border text-xs font-bold transition-all",
                      leakageMode === "strict"
                        ? "bg-emerald-950/60 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-950/40"
                        : "bg-slate-800/60 border-slate-700 text-slate-400 hover:text-white"
                    )}
                  >
                    ✅ Anti-Leakage (fit strictly on X_train)
                  </button>
                </div>
              </div>

              {/* Leakage Metrics Dashboard */}
              <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 space-y-4 font-mono">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800 pb-2">
                  Distribution &amp; Accuracy Metrics
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                    <div className="text-slate-500">True Train Mean (μ_train)</div>
                    <div className="text-base font-bold text-white mt-1">{leakageStats.trainTrueMean} kWh</div>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                    <div className="text-slate-500">True Test Mean (μ_test)</div>
                    <div className="text-base font-bold text-white mt-1">{leakageStats.testTrueMean} kWh</div>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                    <div className="text-slate-500">Scaler Ingested Mean</div>
                    <div className={clsx("text-base font-bold mt-1", leakageMode === "leaky" ? "text-rose-400" : "text-emerald-400")}>
                      {leakageMode === "leaky" ? `${leakageStats.leakedGlobalMean} kWh (Leaked!)` : `${leakageStats.trainTrueMean} kWh (Clean)`}
                    </div>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                    <div className="text-slate-500">Deceptive Evaluation Bias</div>
                    <div className="text-base font-bold text-amber-400 mt-1">
                      {leakageMode === "leaky" ? `+${leakageStats.leakageDelta}% Fake Boost` : "0.0% (Unbiased)"}
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-lg text-xs leading-relaxed border bg-slate-900/90 border-slate-800">
                  {leakageMode === "leaky" ? (
                    <div className="text-rose-300">
                      <strong>CRITICAL FAILURE:</strong> The training scaler absorbed summer peak consumption data 
                      from the test set. Test evaluation accuracy is deceptively inflated to <strong>{leakageStats.optimisticTestAcc}%</strong>, 
                      but real-world production accuracy will collapse to <strong>{leakageStats.realisticProdAcc}%</strong>!
                    </div>
                  ) : (
                    <div className="text-emerald-300">
                      <strong>PRODUCTION SAFE:</strong> Preprocessing parameters were frozen strictly on X_train. 
                      Test set evaluation accuracy is a realistic, honest <strong>{leakageStats.realisticProdAcc}%</strong> with zero distribution contamination.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODE C: ALGORITHM SENSITIVITY COMPARATOR */}
        {studioMode === "sensitivity" && (
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-6">
            <div className="flex flex-wrap gap-2">
              {Object.keys(ALGORITHM_SENSITIVITY_DATA).map((key) => {
                const item = ALGORITHM_SENSITIVITY_DATA[key];
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedAlgo(key)}
                    className={clsx(
                      "px-3.5 py-2 rounded-xl text-xs font-bold border transition-all",
                      selectedAlgo === key
                        ? "bg-cyan-600 border-cyan-400 text-white shadow-md shadow-cyan-600/30"
                        : "bg-slate-800/60 border-slate-700 text-slate-400 hover:text-white"
                    )}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>

            {/* Selected Algorithm Deep Dive */}
            {(() => {
              const current = ALGORITHM_SENSITIVITY_DATA[selectedAlgo];
              return (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                  <div className="md:col-span-2 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div>
                        <h3 className="text-xl font-bold text-white">{current.name}</h3>
                        <span className="text-xs text-cyan-400 font-mono">{current.family}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-400">Preprocessing Sensitivity</div>
                        <div className="text-xl font-extrabold text-amber-400">{current.score} / 100</div>
                      </div>
                    </div>

                    <p className="text-sm text-slate-300 leading-relaxed">{current.summary}</p>

                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                      <div className="text-xs text-slate-500 font-mono uppercase">Core Mathematical Dependency:</div>
                      <div className="overflow-x-auto py-1">
                        <BlockMath math={current.formula} className="text-cyan-300" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 space-y-3 font-mono text-xs">
                    <div className="text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800 pb-2">
                      Pipeline Requirements
                    </div>

                    <div>
                      <div className="text-slate-500">Feature Scaling:</div>
                      <div className="font-bold text-white">{current.scalingReq}</div>
                    </div>

                    <div>
                      <div className="text-slate-500">Missing Values:</div>
                      <div className="font-bold text-white">{current.missingTol}</div>
                    </div>

                    <div>
                      <div className="text-slate-500">Outlier Vulnerability:</div>
                      <div className="font-bold text-white">{current.outlierSens}</div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </section>

      {/* ===================================================================== */}
      {/* SECTION 3: MATHEMATICAL THEORY & CONVERGENCE DYNAMICS */}
      {/* ===================================================================== */}
      <section id="theory" className="space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center text-sm font-bold border border-purple-500/30">
              03
            </span>
            Mathematical Foundations &amp; Convergence Dynamics
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Understand why data preprocessing is fundamentally an optimization requirement for loss convergence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Scaling Formulations */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-indigo-400 flex items-center gap-2">
              <span>📐</span> 1. Normalization vs. Standardization Formulas
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-slate-300">
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <span className="text-xs font-bold text-cyan-300">Min-Max Normalization (Bounded [0, 1]):</span>
                <div className="py-1">
                  <BlockMath math="x' = \frac{x - x_{\min}}{x_{\max} - x_{\min}}" className="text-white" />
                </div>
                <p className="text-[11px] text-slate-400">
                  Maps all observations into a rigid [0, 1] hypercube. Highly vulnerable to maximum sensor outliers.
                </p>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <span className="text-xs font-bold text-emerald-300">Z-Score Standardization (Gaussian N(0, 1)):</span>
                <div className="py-1">
                  <BlockMath math="z = \frac{x - \mu}{\sigma}, \quad \mu = \frac{1}{N}\sum_{i=1}^N x_i, \quad \sigma = \sqrt{\frac{1}{N}\sum_{i=1}^N (x_i - \mu)^2}" className="text-white" />
                </div>
                <p className="text-[11px] text-slate-400">
                  Preserves zero center and variance. Outliers retain proportional relative distance in units of standard deviations.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Hessian Condition Number */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-purple-400 flex items-center gap-2">
              <span>⚡</span> 2. Loss Surface Curvature &amp; Gradient Descent
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-slate-300">
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <span className="text-xs font-bold text-amber-300">Hessian Condition Number κ(H):</span>
                <div className="py-1">
                  <BlockMath math="\kappa = \frac{\lambda_{\max}(H)}{\lambda_{\min}(H)}, \quad H = \nabla^2 J(\mathbf{w}) = \mathbf{X}^T \mathbf{X}" className="text-white" />
                </div>
                <p className="text-[11px] text-slate-400">
                  If features have disparate scales (e.g. 1 vs 10,000), κ exceeds 10^6, turning loss contours into narrow, steep canyons.
                </p>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <span className="text-xs font-bold text-purple-300">Convergence Rate Inequality:</span>
                <div className="py-1">
                  <BlockMath math="\| \mathbf{w}^{(t)} - \mathbf{w}^* \| \le \left( \frac{\kappa - 1}{\kappa + 1} \right)^t \| \mathbf{w}^{(0)} - \mathbf{w}^* \|" className="text-white" />
                </div>
                <p className="text-[11px] text-slate-400">
                  When standardized, κ ≈ 1, enabling spherical contours and fast, direct gradient steps without zig-zag oscillations!
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
            Real enterprise data pipelines deployed across Kolkata, Bidhannagar, Howrah, and Barrackpore.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Case 1 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400">ENERGY &amp; IOT TELEMETRY</span>
              <span className="text-xs text-slate-500 font-mono">Bidhannagar / Rajarhat</span>
            </div>
            <h3 className="text-lg font-bold text-white">WBSEDCL Smart Meter Grid Preprocessing</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>The Problem:</strong> Over 150,000 smart meters stream voltage and power consumption every 15 minutes. 
              Monsoon thunderstorms cause cellular packet loss (missing readings) and lightning spikes register erroneous 
              readings of 9999.0 kWh.
            </p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono text-cyan-300 space-y-1">
              <div>Pipeline Solution:</div>
              <div className="text-slate-400">• Forward-fill (LOCF) for temporal gaps &lt; 2 hours</div>
              <div className="text-slate-400">• Tukey IQR Fencing [Q1 - 1.5*IQR, Q3 + 1.5*IQR] to clip lightning spikes</div>
              <div className="text-slate-400">• RobustScaler to standardize heavy-tailed industrial power consumption</div>
            </div>
          </div>

          {/* Case 2 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-400">URBAN TRANSIT &amp; AFC</span>
              <span className="text-xs text-slate-500 font-mono">Kolkata Metro Rail (KMRC)</span>
            </div>
            <h3 className="text-lg font-bold text-white">Metro Smart Card AFC Ingestion Pipeline</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>The Problem:</strong> Automated Fair Collection gates record passenger tap-in and tap-out logs. 
              Rapid passenger card bounces create duplicate logs within 200 milliseconds, and midnight train departures (23:45 to 00:15) 
              create extreme numerical discontinuity in standard integer hours.
            </p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono text-cyan-300 space-y-1">
              <div>Pipeline Solution:</div>
              <div className="text-slate-400">• Deduplication window with delta_t &lt; 2.0 seconds</div>
              <div className="text-slate-400">• Cyclical projection: sin(2π·hour / 24) and cos(2π·hour / 24)</div>
              <div className="text-slate-400">• Target encoding for high-cardinality transit station pairs</div>
            </div>
          </div>

          {/* Case 3 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400">PUBLIC HEALTH INFORMATICS</span>
              <span className="text-xs text-slate-500 font-mono">North 24 Parganas</span>
            </div>
            <h3 className="text-lg font-bold text-white">Swasthya Sathi Hospital Claims Standardization</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>The Problem:</strong> Claims from 200+ district and rural hospitals contained messy diagnosis strings: 
              "Type 2 Diabetes", "T2D", "Diabetic Mellitus", and "type-II diabetes". Manual entry errors also left patient 
              age blank or entered as sentinel value 999.
            </p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono text-cyan-300 space-y-1">
              <div>Pipeline Solution:</div>
              <div className="text-slate-400">• Fuzzy Levenshtein string matching to canonical ICD-10 ontology</div>
              <div className="text-slate-400">• Conditional median age imputation grouped by diagnostic category</div>
              <div className="text-slate-400">• Frequency encoding for 200+ distinct hospital IDs</div>
            </div>
          </div>

          {/* Case 4 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-400">MANUFACTURING &amp; INDUSTRY 4.0</span>
              <span className="text-xs text-slate-500 font-mono">Barrackpore Industrial Belt</span>
            </div>
            <h3 className="text-lg font-bold text-white">Jute &amp; Textile Mill Loom Vibration Telemetry</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>The Problem:</strong> Century-old mechanical weaving looms fitted with IoT accelerometer sensors 
              suffer from thermal sensor drift during high-humidity monsoon months, producing non-stationary baseline offsets.
            </p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono text-cyan-300 space-y-1">
              <div>Pipeline Solution:</div>
              <div className="text-slate-400">• Moving average high-pass filtering to remove low-frequency thermal drift</div>
              <div className="text-slate-400">• Per-machine baseline Z-score standardization rather than global scaling</div>
              <div className="text-slate-400">• Fast Fourier Transform (FFT) spectrogram feature extraction</div>
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
              Test your mastery of data cleaning, feature scaling, and anti-leakage architecture.
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
            Avoid the catastrophic silent bugs that break machine learning models in production.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="text-rose-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <span>⚠️</span> Pitfall 1: Silent Null Sentinels
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Legacy systems write <code className="text-rose-300 font-mono">-999</code> or <code className="text-rose-300 font-mono">9999</code> for missing sensor values. 
              Python does not consider these as <code className="text-rose-300 font-mono">NaN</code>. Always audit domain min/max bounds and execute explicit replacements before scaling.
            </p>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="text-rose-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <span>⚠️</span> Pitfall 2: High-Cardinality One-Hot
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Applying One-Hot Encoding to a ZIP code column with 5,000 values explodes matrix dimensions, creating 
              severe sparsity and runaway tree depths. Use Target Encoding with Laplace smoothing or Entity Embeddings instead.
            </p>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="text-rose-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <span>⚠️</span> Pitfall 3: Inseparable Pipelines
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Writing ad-hoc preprocessing functions in Jupyter cells guarantees training-serving skew. Always package 
              transformations inside a serializable Scikit-Learn Pipeline (<code className="text-cyan-300 font-mono">joblib.dump(pipeline)</code>) for live inference.
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
            Executable pure Python implementation of the complete Data Quality Auditor, Cleaning Transformer, 
            Min-Max Scaler, and Anti-Leakage Preprocessing Pipeline.
          </p>
        </div>

        <PythonFileLoader
          code={labCode}
          fileName="data_preprocessing_concept_lab.py"
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
            30 comprehensive questions and answers covering conceptual, mathematical, and production engineering aspects.
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
          fileName="topic6_data_preprocessing_concept_handbook.txt"
        />
      </section>

      {/* ===================================================================== */}
      {/* SECTION 10: TEACHER SUKANTA HUI MENTOR NOTE */}
      {/* ===================================================================== */}
      <Teacher />
    </div>
  );
};

export default Topic6;
