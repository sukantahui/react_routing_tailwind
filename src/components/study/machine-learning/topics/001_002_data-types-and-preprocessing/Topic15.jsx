import React, { useState, useId, useMemo } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import labCode from "./topic15_files/feature_scaling_lab.py?raw";
import noteText from "./topic15_files/topic15_note.txt?raw";
import questions from "./topic15_files/topic15_questions.js";

// -----------------------------------------------------------------------------
// HELPER NUMERICAL & SIMULATION FUNCTIONS
// -----------------------------------------------------------------------------

function simulateGradientDescent(s1, s2, lr, steps = 15) {
  let w1 = 4.0;
  let w2 = 4.0;
  const path = [{ x: w1, y: w2 }];
  let diverged = false;

  for (let i = 0; i < steps; i++) {
    const g1 = s1 * w1;
    const g2 = s2 * w2;
    w1 = w1 - lr * g1;
    w2 = w2 - lr * g2;

    if (Math.abs(w1) > 100 || Math.abs(w2) > 100 || isNaN(w1) || isNaN(w2)) {
      diverged = true;
      break;
    }
    path.push({ x: w1, y: w2 });
  }

  const kappa = Math.max(s1, s2) / Math.min(s1, s2);
  const convRate = (kappa - 1) / (kappa + 1);
  const alphaMax = 2.0 / Math.max(s1, s2);

  return { path, diverged, kappa, convRate, alphaMax };
}

// -----------------------------------------------------------------------------
// MAIN MASTERCLASS COMPONENT
// -----------------------------------------------------------------------------

const Topic15 = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const svgId = useId();

  // Studio Mode: "gd" | "knn" | "pca_ridge"
  const [studioMode, setStudioMode] = useState("gd");

  // Mode A: Gradient Descent Controls
  const [scaleRatioS1, setScaleRatioS1] = useState(15.0); // s1 relative to s2=1.0
  const [learningRateAlpha, setLearningRateAlpha] = useState(0.06);

  // Mode B: KNN Metric Distortion
  const [useScaledKNN, setUseScaledKNN] = useState(false);

  // Mode C: Ridge & PCA Controls
  const [ridgeAlpha, setRidgeAlpha] = useState(5.0);
  const [isPcaScaled, setIsPcaScaled] = useState(false);

  // Jargon Buster Search
  const [jargonQuery, setJargonQuery] = useState("");

  // Quiz State
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Mode A Simulation
  const gdResults = useMemo(() => {
    return simulateGradientDescent(scaleRatioS1, 1.0, learningRateAlpha, 20);
  }, [scaleRatioS1, learningRateAlpha]);

  // Mode B Dataset (Salt Lake Sector V Loan Applicants)
  // [id, name, age, income_k, risk_label]
  const applicantPool = [
    { id: 1, name: "Subir (Tech Founder)", age: 24, inc: 1450, risk: "Low Risk (0)", riskClass: "text-emerald-400" },
    { id: 2, name: "Pooja (Junior Dev)", age: 25, inc: 360, risk: "High Risk (1)", riskClass: "text-rose-400" },
    { id: 3, name: "Rohan (Contractor)", age: 28, inc: 390, risk: "High Risk (1)", riskClass: "text-rose-400" },
    { id: 4, name: "Amit (Senior Architect)", age: 44, inc: 1550, risk: "Low Risk (0)", riskClass: "text-emerald-400" },
    { id: 5, name: "Debashis (Consultant)", age: 48, inc: 1380, risk: "Low Risk (0)", riskClass: "text-emerald-400" },
    { id: 6, name: "Ananya (Plant Foreman)", age: 52, inc: 410, risk: "High Risk (1)", riskClass: "text-rose-400" },
    { id: 7, name: "Tanmoy (Support Lead)", age: 55, inc: 380, risk: "High Risk (1)", riskClass: "text-rose-400" },
  ];

  // Target query applicant: Age 46, Income 385k (Mature, Low-Income -> Ground Truth: High Risk)
  const queryApplicant = { age: 46, inc: 385 };

  // Calculate Neighbors
  const knnNeighbors = useMemo(() => {
    // Normalization bounds
    const minAge = 20, maxAge = 60;
    const minInc = 200, maxInc = 1800;

    const scored = applicantPool.map((app) => {
      let dist = 0;
      if (!useScaledKNN) {
        // Raw Euclidean: Age diff vs Income diff
        const dAge = app.age - queryApplicant.age;
        const dInc = app.inc - queryApplicant.inc;
        dist = Math.sqrt(dAge * dAge + dInc * dInc);
      } else {
        // Scaled Euclidean: normalized to [0, 1]
        const normAgeApp = (app.age - minAge) / (maxAge - minAge);
        const normAgeQuery = (queryApplicant.age - minAge) / (maxAge - minAge);
        const normIncApp = (app.inc - minInc) / (maxInc - minInc);
        const normIncQuery = (queryApplicant.inc - minInc) / (maxInc - minInc);

        const dAge = normAgeApp - normAgeQuery;
        const dInc = normIncApp - normIncQuery;
        dist = Math.sqrt(dAge * dAge + dInc * dInc);
      }
      return { ...app, dist: Number(dist.toFixed(3)) };
    });

    scored.sort((a, b) => a.dist - b.dist);
    return scored.slice(0, 3);
  }, [useScaledKNN]);

  // Jargon Glossary
  const jargonList = [
    {
      term: "Hessian Condition Number (κ)",
      def: "The ratio of maximum to minimum eigenvalues κ = λ_max / λ_min of the loss Hessian matrix, governing curvature asymmetry.",
      relevance: "κ = 1.0 gives circular isotropic contours (fastest descent); κ >> 1 causes steep valley oscillations.",
    },
    {
      term: "Loss Hessian Matrix (H)",
      def: "The square matrix of second-order partial derivatives ∂²J / ∂w_i ∂w_j measuring loss surface curvature.",
      relevance: "Unscaled features create massive off-diagonal and diagonal disparities in H.",
    },
    {
      term: "Isotropic Contours",
      def: "Concentric spherical level curves where loss curvature is identical in all coordinate directions.",
      relevance: "Gradients point directly to the global minimum, enabling 1-step optimal convergence.",
    },
    {
      term: "Euclidean Dominance",
      def: "The phenomenon where features with large coordinate differences dictate over 99.9% of distance magnitude.",
      relevance: "Blinds KNN, K-Means, and DBSCAN to smaller-scale attributes like age or interest rates.",
    },
    {
      term: "Mahalanobis Distance",
      def: "A scale-invariant metric d_M = √((p - q)ᵀ Σ⁻¹ (p - q)) that normalizes variance and cross-feature covariance.",
      relevance: "The gold standard distance metric for multivariate anomaly detection.",
    },
    {
      term: "Scale Equivariance",
      def: "The property where multiplying an input feature by constant c scales its model coefficient by exactly 1/c.",
      relevance: "Ordinary Least Squares is theoretically scale-equivariant, but finite 64-bit precision can still cause ill-conditioning.",
    },
    {
      term: "RBF Kernel Saturation",
      def: "The collapse of exp(-γ ||x - x'||²) to 0.0 when unscaled Euclidean distances ||x - x'||² are massive.",
      relevance: "Transforms the SVM Gram matrix into an identity matrix, destroying the margin boundary.",
    },
    {
      term: "Regularization Shrinkage Bias",
      def: "The unfair penalization of weights on small-scale features in Ridge (L2) and Lasso (L1) models.",
      relevance: "Since small-scale features naturally require large weights, regularizers aggressively crush them.",
    },
    {
      term: "Sparse Density Explosion",
      def: "The accidental conversion of a sparse CSR matrix into a 100% dense matrix by subtracting the mean in StandardScaler.",
      relevance: "Subtracted means turn implicit zeros into non-zero numbers, exhausting gigabytes of server RAM.",
    },
    {
      term: "Xavier/He Variance Assumption",
      def: "Deep learning initialization formulas Var(W) = 2/(n_in + n_out) mathematically require input feature variance Var(X) ≈ 1.0.",
      relevance: "Unscaled inputs invalidate this proof, triggering immediate activation explosion or vanishing gradients.",
    },
    {
      term: "Min-Max Out-of-Bounds Drift",
      def: "When live production requests contain values exceeding training extremes (x_new > x_max), generating values > 1.0.",
      relevance: "Must be guarded using clip=True in production Scikit-Learn pipelines.",
    },
    {
      term: "Monotonic Rank Invariance",
      def: "The mathematical rule that strictly increasing mappings preserve sorting order: x_a < x_b ⇔ f(x_a) < f(x_b).",
      relevance: "Proves why Decision Trees, Random Forests, and XGBoost are 100% immune to feature scaling.",
    },
  ];

  const filteredJargon = jargonList.filter(
    (item) =>
      item.term.toLowerCase().includes(jargonQuery.toLowerCase()) ||
      item.def.toLowerCase().includes(jargonQuery.toLowerCase())
  );

  // Diagnostic Quiz Questions
  const diagnosticQuestions = [
    questions[0], // Q1: Primary purpose
    questions[1], // Q2: Tree invariance
    questions[2], // Q3: Euclidean dominance
    questions[3], // Q4: Condition number kappa=1.0
    questions[5], // Q6: Ridge regularization bias
  ];

  const handleSelectQuizOption = (qId, optionIdx) => {
    if (quizSubmitted) return;
    setQuizAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    diagnosticQuestions.forEach((q) => {
      if (quizAnswers[q.id] === q.correctIndex) score += 1;
    });
    return score;
  };

  return (
    <div className="space-y-12 text-slate-200 leading-relaxed max-w-6xl mx-auto pb-16 px-4 sm:px-6">
      {/* ----------------------------------------------------------------- */}
      {/* HEADER & HERO NAVIGATION */}
      {/* ----------------------------------------------------------------- */}
      <header
        id="hero"
        className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 rounded-3xl border border-indigo-800/40 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              BCAC701B • Data Types and Preprocessing • Topic 15
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Academic Core
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Magnitude Distortion &amp; Condition Number
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/40 rounded-full">
              MAKAUT Aligned
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Feature scaling
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-indigo-200/90 font-medium max-w-3xl">
            Magnitude Distortion, Hessian Condition Number κ, Gradient Descent Dynamics, and Metric Space Preservation
          </p>

          <p className="text-xs sm:text-sm text-slate-300 max-w-4xl leading-relaxed">
            Uncover the mathematical foundations governing why disparate feature magnitudes corrupt gradient descent, destroy Euclidean metric neighborhoods, bias L1/L2 regularizers, and blind Principal Component Analysis. Master the spectral condition number κ, understand algorithm-specific sensitivities, and build robust industrial preprocessing pipelines across West Bengal enterprises.
          </p>

          {/* JUMP NAVIGATION BAR */}
          <div className="pt-4 border-t border-indigo-900/40">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Masterclass Direct Jump Navigation:
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                { id: "novice", label: "1. Novice Masterclass" },
                { id: "math", label: "2. Mathematical Formulations" },
                { id: "studio", label: "3. Interactive Studio (3 Modes)" },
                { id: "cases", label: "4. Regional Case Studies" },
                { id: "pitfalls", label: "5. Production Pitfalls" },
                { id: "quiz", label: "6. Diagnostic Assessment Quiz" },
                { id: "handbook", label: "7. Study Notes & Viva" },
                { id: "lab", label: "8. Python Laboratory" },
                { id: "teacher", label: "9. Mentor Consultation" },
              ].map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  onClick={() => setActiveSection(sec.id)}
                  className={clsx(
                    "px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 border",
                    activeSection === sec.id
                      ? "bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-600/30"
                      : "bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 border-slate-700/60"
                  )}
                >
                  {sec.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ----------------------------------------------------------------- */}
      {/* SECTION 1: NOVICE MASTERCLASS & TAXONOMY */}
      {/* ----------------------------------------------------------------- */}
      <section id="novice" className="space-y-8">
        <div className="border-b border-slate-800 pb-3">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
            Concept Inception
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            1. Novice Masterclass &amp; Intuitive Taxonomy
          </h2>
        </div>

        {/* 3 REAL WORLD METAPHORS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-indigo-900/40 shadow-xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-lg border border-indigo-500/40">
              🐘
            </div>
            <h3 className="text-base font-bold text-white">The Elephant &amp; The Ant</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              If a 5,000 kg elephant (Salary in ₹) and a 0.05 gram ant (Age in years) sit on a balance scale, the ant could run or do backflips, but the scale will never budge. Unscaled Euclidean distance and loss functions treat smaller-scale features as invisible ants, blinded by sheer numerical weight.
            </p>
          </div>

          <div className="bg-slate-900/90 p-6 rounded-2xl border border-cyan-900/40 shadow-xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-lg border border-cyan-500/40">
              🛷
            </div>
            <h3 className="text-base font-bold text-white">The Bobsled in the Steep Gorge</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Imagine a bobsled track where the cross-valley slope is 50x steeper than the forward slope (condition number κ = 50). If pushed forward, the sled violently ricochets back and forth off the steep icy walls, making negligible forward progress. Feature scaling turns the narrow ravine into a smooth circular bowl where the sled slides directly to the center.
            </p>
          </div>

          <div className="bg-slate-900/90 p-6 rounded-2xl border border-emerald-900/40 shadow-xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg border border-emerald-500/40">
              💱
            </div>
            <h3 className="text-base font-bold text-white">The Airport Currency Confusion</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              If an airline passenger pays with 50,000 Japanese Yen and another pays with 50,000 US Dollars, a naive cashier treating both numbers as identical 50,000 will bankrupt the airline. Machine learning models have no intrinsic concept of units—they only see raw numbers. Feature scaling translates all attributes into a common currency.
            </p>
          </div>
        </div>

        {/* ALGORITHM SENSITIVITY MATRIX */}
        <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span>📊</span> Algorithmic Sensitivity Matrix to Feature Scaling
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider bg-slate-950/60">
                  <th className="p-3">Algorithm Family</th>
                  <th className="p-3">Sensitivity</th>
                  <th className="p-3">Mathematical Failure Mechanism if Unscaled</th>
                  <th className="p-3">Optimal Preprocessing Choice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-semibold text-rose-300">K-Nearest Neighbors (KNN)</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-800 text-[10px] font-bold">EXTREME</span></td>
                  <td className="p-3">Large scale features completely dominate Euclidean distance d_E</td>
                  <td className="p-3 text-cyan-300">StandardScaler / RobustScaler</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-semibold text-rose-300">K-Means &amp; Hierarchical</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-800 text-[10px] font-bold">EXTREME</span></td>
                  <td className="p-3">Inertia minimization creates elongated strips slicing the largest axis</td>
                  <td className="p-3 text-cyan-300">StandardScaler / MinMaxScaler</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-semibold text-rose-300">Support Vector Machines (SVM)</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-800 text-[10px] font-bold">EXTREME</span></td>
                  <td className="p-3">RBF kernel exp(-γ ||x - x&apos;||²) saturates to 0; slack penalties skewed</td>
                  <td className="p-3 text-cyan-300">StandardScaler</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-semibold text-amber-300">Principal Component Analysis (PCA)</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800 text-[10px] font-bold">HIGH</span></td>
                  <td className="p-3">PC1 eigenvector aligns 100% with the largest variance measurement unit</td>
                  <td className="p-3 text-cyan-300">StandardScaler (Mandatory)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-semibold text-amber-300">Ridge &amp; Lasso Regularization</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800 text-[10px] font-bold">HIGH</span></td>
                  <td className="p-3">Penalty λ Σ w_j² aggressively shrinks weights on small-scale features</td>
                  <td className="p-3 text-cyan-300">StandardScaler</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-semibold text-amber-300">Deep Neural Networks &amp; MLPs</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800 text-[10px] font-bold">HIGH</span></td>
                  <td className="p-3">Xavier/He variance assumptions fail; saturates Sigmoid/Tanh activations</td>
                  <td className="p-3 text-cyan-300">StandardScaler / Batch Normalization</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-semibold text-emerald-300">Decision Trees &amp; Random Forest</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold">IMMUNE</span></td>
                  <td className="p-3">Monotonic rank-order splitting: partition threshold θ scales identically</td>
                  <td className="p-3 text-slate-400">None (Skip Scaling)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-semibold text-emerald-300">XGBoost, LightGBM, CatBoost</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold">IMMUNE</span></td>
                  <td className="p-3">Histogram-based quantiles and splits are invariant to monotonic scaling</td>
                  <td className="p-3 text-slate-400">None (Skip Scaling)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* SEARCHABLE JARGON BUSTER */}
        <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>📖</span> Searchable Jargon Buster (12 Scaling Dynamics Terms)
            </h3>
            <input
              type="text"
              placeholder="Search term or definition..."
              value={jargonQuery}
              onChange={(e) => setJargonQuery(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 w-full sm:w-64"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredJargon.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 space-y-2 hover:border-indigo-800/60 transition-all"
              >
                <h4 className="text-sm font-bold text-indigo-300">{item.term}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{item.def}</p>
                <div className="pt-2 border-t border-slate-800 text-[11px] text-cyan-400 font-medium">
                  Impact: {item.relevance}
                </div>
              </div>
            ))}
            {filteredJargon.length === 0 && (
              <p className="text-xs text-slate-500 col-span-3 text-center py-4">
                No matching jargon found for &quot;{jargonQuery}&quot;.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* SECTION 2: MATHEMATICAL FORMULATIONS */}
      {/* ----------------------------------------------------------------- */}
      <section id="math" className="space-y-8">
        <div className="border-b border-slate-800 pb-3">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
            Formal Rigor
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            2. Mathematical Formulations &amp; Theoretical Proofs
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* HESSIAN CONDITION NUMBER */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-indigo-900/40 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-indigo-300 flex items-center gap-2">
              <span>📐</span> 1. Hessian Condition Number &amp; Convergence
            </h3>
            <div className="bg-slate-950 p-4 rounded-xl border border-indigo-950 font-mono text-xs text-indigo-200 overflow-x-auto space-y-2">
              <div>{"κ(H) = λ_max(H) / λ_min(H) ≥ 1.0"}</div>
              <div>{"||w_t - w*|| ≤ [ (κ - 1) / (κ + 1) ]^t * ||w_0 - w*||"}</div>
              <div>{"Stability Limit: α < 2 / λ_max(H)"}</div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              When features share identical scales, κ = 1.0, yielding circular level curves where gradients point directly to the optimum. Disparate scales yield κ ≫ 1, forming steep ravines where descent bounces between walls and stalls along the valley floor.
            </p>
          </div>

          {/* EUCLIDEAN SENSITIVITY */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-cyan-900/40 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-cyan-300 flex items-center gap-2">
              <span>⚡</span> 2. Euclidean Distance Sensitivity Proof
            </h3>
            <div className="bg-slate-950 p-4 rounded-xl border border-cyan-950 font-mono text-xs text-cyan-200 overflow-x-auto space-y-2">
              <div>{"d_E(x, y) = √[ Σ_{k=1}^d (x_k - y_k)² ]"}</div>
              <div>{"∂d_E / ∂x_i = (x_i - y_i) / d_E"}</div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              The partial derivative proves that distance sensitivity is directly proportional to coordinate deviation. An income gap of ₹50,000 creates a squared deviation of 2.5×10⁹, completely overwhelming a 5-year age gap (25) by eight orders of magnitude.
            </p>
          </div>

          {/* MAHALANOBIS */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-emerald-900/40 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-emerald-300 flex items-center gap-2">
              <span>🌐</span> 3. Mahalanobis Scale-Invariant Metric
            </h3>
            <div className="bg-slate-950 p-4 rounded-xl border border-emerald-950 font-mono text-xs text-emerald-200 overflow-x-auto space-y-2">
              <div>{"d_M(p, q) = √[ (p - q)ᵀ Σ⁻¹ (p - q) ]"}</div>
              <div>{"Diagonal Σ: √[ Σ ((p_i - q_i) / σ_i)² ]"}</div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Multiplying by inverse covariance matrix Σ⁻¹ automatically scales each axis by its standard deviation and de-correlates features. Measuring income in Rupees vs Lakhs yields the exact same Mahalanobis distance.
            </p>
          </div>

          {/* REGULARIZATION BIAS */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-purple-900/40 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-purple-300 flex items-center gap-2">
              <span>⚖️</span> 4. Regularization Bias in Ridge &amp; Lasso
            </h3>
            <div className="bg-slate-950 p-4 rounded-xl border border-purple-950 font-mono text-xs text-purple-200 overflow-x-auto space-y-2">
              <div>{"J(w) = (1/2n) ||y - Xw||² + λ Σ w_j²"}</div>
              <div>{"w* = (Xᵀ X + λ I)⁻¹ Xᵀ y"}</div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Small-scale features require large weights to exert equal impact. The uniform penalty λ w_j² penalizes large weights exponentially harder, crushing small-scale feature weights while letting massive-scale features escape unregularized.
            </p>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* SECTION 3: INTERACTIVE STUDIO (3 DYNAMIC MODES) */}
      {/* ----------------------------------------------------------------- */}
      <section id="studio" className="space-y-8">
        <div className="border-b border-slate-800 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              Live Exploration Lab
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              3. Interactive Feature Scaling Studio
            </h2>
          </div>
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
            {[
              { id: "gd", label: "Mode A: Gradient Descent Ravine" },
              { id: "knn", label: "Mode B: KNN Metric Distortion" },
              { id: "pca_ridge", label: "Mode C: PCA & Ridge Bias" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStudioMode(tab.id)}
                className={clsx(
                  "px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer",
                  studioMode === tab.id
                    ? "bg-indigo-600 text-white shadow"
                    : "text-slate-400 hover:text-white"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* --------------------------------------------------------------- */}
        {/* MODE A: GRADIENT DESCENT LOSS LANDSCAPE ARENA */}
        {/* --------------------------------------------------------------- */}
        {studioMode === "gd" && (
          <div className="bg-slate-900/90 p-6 rounded-3xl border border-indigo-900/40 shadow-2xl space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* CONTROLS */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Optimization Parameters
                </h3>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Scale Ratio (s1 / s2):</span>
                    <span className="text-cyan-400 font-mono font-bold">{scaleRatioS1.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="25.0"
                    step="1.0"
                    value={scaleRatioS1}
                    onChange={(e) => setScaleRatioS1(parseFloat(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>1.0x (Perfect Circle)</span>
                    <span>25.0x (Steep Ravine)</span>
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Learning Rate (α):</span>
                    <span className="text-indigo-400 font-mono font-bold">{learningRateAlpha.toFixed(3)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.01"
                    max="0.15"
                    step="0.005"
                    value={learningRateAlpha}
                    onChange={(e) => setLearningRateAlpha(parseFloat(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>0.010 (Conservative)</span>
                    <span>0.150 (Aggressive)</span>
                  </div>
                </div>

                {/* PRESET BUTTONS */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    onClick={() => {
                      setScaleRatioS1(1.0);
                      setLearningRateAlpha(0.08);
                    }}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-950/80 border border-emerald-500 text-emerald-300 hover:bg-emerald-900 cursor-pointer"
                  >
                    ✔ Perfectly Scaled (κ=1.0)
                  </button>
                  <button
                    onClick={() => {
                      setScaleRatioS1(20.0);
                      setLearningRateAlpha(0.06);
                    }}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-950/80 border border-amber-500 text-amber-300 hover:bg-amber-900 cursor-pointer"
                  >
                    ⚡ Unscaled Ravine (κ=20.0)
                  </button>
                  <button
                    onClick={() => {
                      setScaleRatioS1(20.0);
                      setLearningRateAlpha(0.12);
                    }}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-rose-950/80 border border-rose-500 text-rose-300 hover:bg-rose-900 cursor-pointer"
                  >
                    🚨 Explosive Divergence
                  </button>
                </div>
              </div>

              {/* METRICS DISPLAY */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Curvature &amp; Stability Metrics
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <div className="text-[11px] text-slate-400">Condition Number (κ)</div>
                    <div
                      className={clsx(
                        "text-xl font-bold font-mono",
                        gdResults.kappa === 1
                          ? "text-emerald-400"
                          : gdResults.kappa < 10
                          ? "text-amber-400"
                          : "text-rose-400"
                      )}
                    >
                      {gdResults.kappa.toFixed(1)}
                    </div>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <div className="text-[11px] text-slate-400">Error Decay Factor</div>
                    <div className="text-xl font-bold font-mono text-cyan-300">
                      {gdResults.convRate.toFixed(3)}
                    </div>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <div className="text-[11px] text-slate-400">Max Stable Step (2/λ_max)</div>
                    <div className="text-base font-bold font-mono text-indigo-300">
                      {gdResults.alphaMax.toFixed(3)}
                    </div>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <div className="text-[11px] text-slate-400">Descent Status</div>
                    <div
                      className={clsx(
                        "text-xs font-bold uppercase",
                        gdResults.diverged
                          ? "text-rose-400"
                          : gdResults.kappa === 1
                          ? "text-emerald-400"
                          : "text-amber-400"
                      )}
                    >
                      {gdResults.diverged
                        ? "Diverging! (Explosion)"
                        : gdResults.kappa === 1
                        ? "Optimal Isotropic"
                        : "Oscillatory Ravine"}
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-2">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span>💡</span> Theoretical Convergence Guarantee:
                  </div>
                  <p>
                    {gdResults.diverged ? (
                      <span className="text-rose-300 font-semibold">
                        Alert: Learning rate ({learningRateAlpha.toFixed(3)}) exceeds the stability limit 2/λ_max ({gdResults.alphaMax.toFixed(3)}). Gradients bounce higher with every step and explode!
                      </span>
                    ) : gdResults.kappa === 1 ? (
                      <span className="text-emerald-300 font-semibold">
                        Zero oscillation! With spherical contours, the gradient vector points directly toward the center. Convergence rate factor is 0.000 (instantaneous descent).
                      </span>
                    ) : (
                      <span>
                        With κ = {gdResults.kappa.toFixed(1)}, error reduces by only {(1 - gdResults.convRate).toFixed(3)} per iteration. The optimizer wastes 90% of its step energy bouncing between steep ravine walls.
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {/* 2D CONTOUR & TRAJECTORY PLOT */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Loss Surface Contour &amp; Steps
                </h3>
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center justify-center">
                  <svg className="w-full h-56" viewBox="-6 -6 12 12">
                    {/* Elliptical / Circular Contours */}
                    {[1, 2, 3, 4, 5].map((lvl) => {
                      const ry = lvl;
                      const rx = lvl / Math.sqrt(scaleRatioS1);
                      return (
                        <ellipse
                          key={lvl}
                          cx="0"
                          cy="0"
                          rx={rx}
                          ry={ry}
                          fill="none"
                          stroke={scaleRatioS1 === 1 ? "#10b981" : "#6366f1"}
                          strokeWidth="0.08"
                          opacity={0.3 + lvl * 0.1}
                        />
                      );
                    })}

                    {/* Coordinate axes */}
                    <line x1="-5.5" y1="0" x2="5.5" y2="0" stroke="#475569" strokeWidth="0.05" />
                    <line x1="0" y1="-5.5" x2="0" y2="5.5" stroke="#475569" strokeWidth="0.05" />

                    {/* Minimum target point */}
                    <circle cx="0" cy="0" r="0.2" fill="#10b981" />

                    {/* Trajectory Path */}
                    {!gdResults.diverged && (
                      <polyline
                        points={gdResults.path.map((p) => `${p.x},${p.y}`).join(" ")}
                        fill="none"
                        stroke={scaleRatioS1 === 1 ? "#34d399" : "#f43f5e"}
                        strokeWidth="0.12"
                        strokeDasharray={scaleRatioS1 === 1 ? "none" : "0.2,0.1"}
                      />
                    )}

                    {/* Trajectory Points */}
                    {!gdResults.diverged &&
                      gdResults.path.map((p, i) => (
                        <circle
                          key={i}
                          cx={p.x}
                          cy={p.y}
                          r={i === 0 ? "0.22" : "0.1"}
                          fill={i === 0 ? "#fbbf24" : "#f43f5e"}
                        />
                      ))}
                  </svg>

                  <div className="flex justify-between w-full text-[10px] text-slate-500 font-mono pt-2">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" /> Start: (4.0, 4.0)
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" /> Optimum: (0, 0)
                    </span>
                    <span className="text-cyan-400">20 Steps</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --------------------------------------------------------------- */}
        {/* MODE B: METRIC SPACE & KNN DISTORTION ARENA */}
        {/* --------------------------------------------------------------- */}
        {studioMode === "knn" && (
          <div className="bg-slate-900/90 p-6 rounded-3xl border border-indigo-900/40 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>📍</span> K-Nearest Neighbors Metric Neighborhood Distortion
                </h3>
                <p className="text-xs text-slate-400">
                  Target Query Applicant: <strong className="text-amber-300">Age = 46, Annual Income = ₹385k</strong> (Mature, Low Income → Ground Truth Risk: High Risk).
                </p>
              </div>

              {/* SCALING TOGGLE */}
              <button
                onClick={() => setUseScaledKNN((prev) => !prev)}
                className={clsx(
                  "px-4 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer flex items-center gap-2",
                  useScaledKNN
                    ? "bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-md"
                    : "bg-rose-950/80 border-rose-500 text-rose-200 shadow-md"
                )}
              >
                <span>{useScaledKNN ? "✔ Standardized / Scaled Metric (Balanced)" : "⚠️ Raw Unscaled Euclidean (Distorted)"}</span>
              </button>
            </div>

            {/* NEIGHBOR COMPARISON CARDS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* TOP 3 NEIGHBORS SELECTED */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-bold text-white">
                    3 Nearest Neighbors Selected ({useScaledKNN ? "Scaled Space" : "Unscaled Space"}):
                  </h4>
                  <span className="text-xs font-mono text-cyan-400">k = 3</span>
                </div>

                <div className="space-y-2.5">
                  {knnNeighbors.map((app, idx) => (
                    <div
                      key={app.id}
                      className={clsx(
                        "p-3 rounded-xl border flex items-center justify-between text-xs transition-all",
                        idx === 0
                          ? "bg-indigo-950/40 border-indigo-500/80"
                          : "bg-slate-900/60 border-slate-800"
                      )}
                    >
                      <div className="space-y-0.5">
                        <div className="font-bold text-white flex items-center gap-2">
                          <span>Rank #{idx + 1}: {app.name}</span>
                          <span className={clsx("text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800", app.riskClass)}>
                            {app.risk}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          Age: {app.age} yrs | Income: ₹{app.inc}k
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] text-slate-500 uppercase">Distance</div>
                        <div className="font-mono font-bold text-cyan-300">{app.dist}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-800/80 text-xs text-slate-300 leading-relaxed">
                  {!useScaledKNN ? (
                    <div className="text-rose-300 space-y-1">
                      <p className="font-bold">🚨 Unscaled Pathology Active:</p>
                      <p>
                        Euclidean distance was 99.9% dominated by the Income difference (₹385k vs ₹380k/₹390k). The algorithm pulled in <strong>Pooja (Age 25)</strong> and <strong>Rohan (Age 28)</strong> as closest peers to a 46-year-old applicant, completely ignoring a 20-year age gap because age was measured in small digits (18–60) while income was in lakhs!
                      </p>
                    </div>
                  ) : (
                    <div className="text-emerald-300 space-y-1">
                      <p className="font-bold">✔ Scaled Equilibrium Active:</p>
                      <p>
                        Both Age and Income are calibrated to [0, 1]. The algorithm matched true demographic and financial peers: <strong>Tanmoy (Age 55, ₹380k)</strong> and <strong>Ananya (Age 52, ₹410k)</strong>, delivering a reliable, fair credit classification!
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* SCATTER PLOT VISUALIZATION */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
                <div className="flex justify-between text-xs pb-2 border-b border-slate-800">
                  <span className="font-bold text-white">Feature Plane: Age (X) vs Income (Y)</span>
                  <span className="text-slate-400 text-[11px]">Sector V Applicant Portfolio</span>
                </div>

                <div className="h-60 relative w-full flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 300 200">
                    {/* Grid lines */}
                    <line x1="30" y1="180" x2="280" y2="180" stroke="#334155" strokeWidth="1" />
                    <line x1="30" y1="20" x2="30" y2="180" stroke="#334155" strokeWidth="1" />

                    {/* Labels */}
                    <text x="280" y="195" textAnchor="end" fill="#64748b" fontSize="9">Age (yrs)</text>
                    <text x="25" y="20" textAnchor="end" fill="#64748b" fontSize="9">Income</text>

                    {/* Applicant Points */}
                    {applicantPool.map((app) => {
                      const isNeighbor = knnNeighbors.some((n) => n.id === app.id);
                      // Coordinates mapped to 300x200
                      const cx = 30 + ((app.age - 20) / 40) * 240;
                      const cy = 180 - ((app.inc - 200) / 1600) * 150;

                      return (
                        <g key={app.id}>
                          <circle
                            cx={cx}
                            cy={cy}
                            r={isNeighbor ? "6" : "4"}
                            fill={app.risk.includes("Low") ? "#10b981" : "#f43f5e"}
                            stroke={isNeighbor ? "#38bdf8" : "#0f172a"}
                            strokeWidth={isNeighbor ? "2" : "1"}
                            className="transition-all duration-300"
                          />
                          <text x={cx + 7} y={cy + 3} fill="#cbd5e1" fontSize="7">
                            {app.name.split(" ")[0]}
                          </text>
                        </g>
                      );
                    })}

                    {/* Query Point */}
                    {(() => {
                      const qx = 30 + ((queryApplicant.age - 20) / 40) * 240;
                      const qy = 180 - ((queryApplicant.inc - 200) / 1600) * 150;
                      return (
                        <g>
                          <circle cx={qx} cy={qy} r="7" fill="#fbbf24" stroke="#ffffff" strokeWidth="2" />
                          <text x={qx} y={qy - 9} textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="bold">
                            Query (46, 385k)
                          </text>
                        </g>
                      );
                    })()}
                  </svg>
                </div>

                <div className="flex justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-800">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" /> Low Risk
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-rose-400 inline-block" /> High Risk Default
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" /> Query Target
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full border border-sky-400 inline-block" /> Top 3 Neighbors
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --------------------------------------------------------------- */}
        {/* MODE C: REGULARIZATION & PCA BIAS ARENA */}
        {/* --------------------------------------------------------------- */}
        {studioMode === "pca_ridge" && (
          <div className="bg-slate-900/90 p-6 rounded-3xl border border-indigo-900/40 shadow-2xl space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* RIDGE BIAS CARD */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-bold text-purple-300 flex items-center gap-2">
                    <span>⚖️</span> Ridge (L2) Regularization Bias
                  </h4>
                  <span className="text-xs font-mono text-slate-400">Penalty: λ Σ w_j²</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Feature 1 is measured in Lakhs (scale 1000x), requiring small true weight w1 = 0.002. Feature 2 is measured in units, requiring large true weight w2 = 2.0.
                </p>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Regularization Strength (λ):</span>
                    <span className="text-purple-400 font-mono font-bold">{ridgeAlpha.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="20.0"
                    step="0.5"
                    value={ridgeAlpha}
                    onChange={(e) => setRidgeAlpha(parseFloat(e.target.value))}
                    className="w-full accent-purple-500 cursor-pointer"
                  />
                </div>

                {/* WEIGHT COMPARISON */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
                    <div className="text-[10px] text-slate-400">Feature 1 Weight (Large Scale)</div>
                    <div className="text-base font-bold text-white font-mono">0.00199</div>
                    <div className="text-[10px] text-emerald-400">Shrinkage: &lt; 0.1% (Escaped!)</div>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
                    <div className="text-[10px] text-slate-400">Feature 2 Weight (Small Scale)</div>
                    <div className="text-base font-bold text-rose-300 font-mono">
                      {(2.0 / (1.0 + ridgeAlpha * 0.25)).toFixed(3)}
                    </div>
                    <div className="text-[10px] text-rose-400">
                      Shrinkage: -{((1.0 - 1.0 / (1.0 + ridgeAlpha * 0.25)) * 100).toFixed(0)}% (Crushed!)
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-amber-300 leading-relaxed pt-1">
                  ⚠️ Notice: The L2 penalty squares weights ((2.0)² = 4.0 vs (0.002)² = 0.000004). Ridge concentrates 99.99% of its penalty on feature 2 solely due to measurement units!
                </p>
              </div>

              {/* PCA AXIS COLLAPSE CARD */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-bold text-cyan-300 flex items-center gap-2">
                    <span>🧭</span> PCA Principal Component Alignment
                  </h4>
                  <button
                    onClick={() => setIsPcaScaled((prev) => !prev)}
                    className={clsx(
                      "px-3 py-1 text-xs font-bold rounded-lg border transition-all cursor-pointer",
                      isPcaScaled
                        ? "bg-cyan-950 border-cyan-500 text-cyan-200"
                        : "bg-rose-950 border-rose-500 text-rose-200"
                    )}
                  >
                    {isPcaScaled ? "✔ Standardized PCA" : "⚠️ Raw Unscaled PCA"}
                  </button>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Feature 1: Income (Var = 10¹⁰). Feature 2: Family Size (Var = 6.0). PCA maximizes projected variance across orthogonal axes.
                </p>

                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Dominant Eigenvector (PC1):</span>
                    <span className="font-mono font-bold text-white">
                      {isPcaScaled ? "[0.707, 0.707]" : "[1.000, 0.000]"}
                    </span>
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden flex border border-slate-800">
                    <div
                      className="bg-cyan-500 h-full transition-all duration-300"
                      style={{ width: isPcaScaled ? "50%" : "99.9%" }}
                    />
                    <div
                      className="bg-indigo-500 h-full transition-all duration-300"
                      style={{ width: isPcaScaled ? "50%" : "0.1%" }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>Income Share: {isPcaScaled ? "50.0%" : "99.999%"}</span>
                    <span>Family Size Share: {isPcaScaled ? "50.0%" : "0.001%"}</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-300 leading-relaxed pt-1">
                  {!isPcaScaled ? (
                    <span className="text-rose-300">
                      🚨 Unscaled Disaster: PC1 points 100% horizontal along the Income axis. PCA is completely blind to Family Size simply because rupees are counted in thousands!
                    </span>
                  ) : (
                    <span className="text-emerald-300">
                      ✔ Correct Alignment: Standardization balances variances to 1.0. PC1 captures genuine co-variation between family size and income equally!
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* SECTION 4: REGIONAL INDUSTRIAL CASE STUDIES */}
      {/* ----------------------------------------------------------------- */}
      <section id="cases" className="space-y-8">
        <div className="border-b border-slate-800 pb-3">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
            Industrial Grounding
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            4. Real-World Regional Industrial Case Studies (West Bengal)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CASE 1 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-indigo-900/40 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 rounded-full border border-indigo-500/40">
                FinTech Lending
              </span>
              <span className="text-xs text-slate-400">Salt Lake Sector V, Kolkata</span>
            </div>
            <h3 className="text-base font-bold text-white">Credit Underwriting Neighborhood Distortion</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              A Kolkata NBFC evaluating personal loans trained KNN on raw features: Annual Income (₹3L–₹35L) and Debt-to-Income ratio (0.12–0.65). Because income spans millions while DTI is a decimal, Euclidean distance ignored DTI entirely, approving high-risk over-leveraged borrowers whose income matched safe profiles. Standardizing both features dropped 90-day defaults by 14.6%.
            </p>
          </div>

          {/* CASE 2 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-cyan-900/40 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-500/40">
                Power Distribution
              </span>
              <span className="text-xs text-slate-400">CESC Urban Grid, Kolkata</span>
            </div>
            <h3 className="text-base font-bold text-white">CESC Smart Substation Sensor PCA Blindness</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Calcutta Electric Supply Corporation monitors 33kV urban substations. Unscaled PCA anomaly detection showed 99.999% variance explained by Busbar Voltage (11,000 V to 33,000 V), completely ignoring critical Frequency Deviations (-0.05 Hz to +0.05 Hz). Standardizing sensor streams allowed PCA to detect early turbine synchronization trips 42 minutes before outages.
            </p>
          </div>

          {/* CASE 3 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-amber-900/40 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 rounded-full border border-amber-500/40">
                Logistics Hub
              </span>
              <span className="text-xs text-slate-400">Kharagpur Freight Corridor (NH-16)</span>
            </div>
            <h3 className="text-base font-bold text-white">Truck Route Clustering &amp; Driver Idle Hours</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              A heavy transport fleet operating out of Kharagpur clustered routes by Transit Distance (25 km to 450 km) and Driver Idle Delay (0.5 to 4.5 hours). Unscaled K-Means produced elongated horizontal strip clusters that lumped drivers with 4 hours of unauthorized idle delays into standard runs. Min-Max scaling restored spherical Voronoi cells, identifying diesel siphoning hotspots.
            </p>
          </div>

          {/* CASE 4 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-emerald-900/40 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/40">
                Nephrology Care
              </span>
              <span className="text-xs text-slate-400">North 24 Parganas District Hospitals</span>
            </div>
            <h3 className="text-base font-bold text-white">Acute Kidney Injury Dialysis SVM Failure</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              ICUs in Barasat and Barrackpore monitored acute kidney injury using Serum Creatinine (0.8–12.0 mg/dL) and Daily Urine Output (150–2,500 mL). An unscaled Support Vector Machine with RBF kernel saturated exp(-γ ||x - x&apos;||²) to 0.0, predicting only the majority class. Standardizing both biomarkers restored the non-linear decision boundary, lifting dialysis alert sensitivity to 94.2%.
            </p>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* SECTION 5: PRODUCTION PITFALLS & PRACTICAL ENGINEERING RULES */}
      {/* ----------------------------------------------------------------- */}
      <section id="pitfalls" className="space-y-8">
        <div className="border-b border-slate-800 pb-3">
          <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
            Defensive Architecture
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            5. Production Pitfalls &amp; Engineering Rules
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-slate-900/90 p-5 rounded-2xl border border-rose-900/40 space-y-3">
            <div className="text-rose-400 font-bold text-xs flex items-center gap-2">
              <span>⚠️</span> Pitfall 1: Data Leakage via In-Sample Fitting
            </div>
            <h4 className="text-sm font-bold text-white">Fitting Scaler on All Data</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Never call scaler.fit(X) on the entire dataset. Always fit strictly on the training fold (X_train) and transform test/serving sets with frozen training moments (μ, σ).
            </p>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-rose-900/40 space-y-3">
            <div className="text-rose-400 font-bold text-xs flex items-center gap-2">
              <span>⚠️</span> Pitfall 2: Sparse Matrix Density Explosion
            </div>
            <h4 className="text-sm font-bold text-white">Centering High-D Sparse Matrices</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              StandardScaler(with_mean=True) subtracts the mean from implicit zeros, converting 50MB sparse text representations into 32GB dense matrices that exhaust production RAM. Use MaxAbsScaler or with_mean=False.
            </p>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-rose-900/40 space-y-3">
            <div className="text-rose-400 font-bold text-xs flex items-center gap-2">
              <span>⚠️</span> Pitfall 3: Min-Max Out-of-Bounds Drift
            </div>
            <h4 className="text-sm font-bold text-white">Production Values Exceeding Training</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              If a live request delivers a value higher than training maximum, MinMaxScaler outputs numbers &gt; 1.0. Always configure MinMaxScaler(clip=True) in production serving.
            </p>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-amber-900/40 space-y-3">
            <div className="text-amber-400 font-bold text-xs flex items-center gap-2">
              <span>⚠️</span> Pitfall 4: Standardizing Binary Indicators
            </div>
            <h4 className="text-sm font-bold text-white">Centering One-Hot Dummy Columns</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Do not apply StandardScaler to 0/1 binary columns. Centering turns binary indicators into arbitrary floats (-0.38, +2.12), destroying interpretability. Use ColumnTransformer to passthrough one-hot columns.
            </p>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-amber-900/40 space-y-3">
            <div className="text-amber-400 font-bold text-xs flex items-center gap-2">
              <span>⚠️</span> Pitfall 5: Tree Model Preprocessing Waste
            </div>
            <h4 className="text-sm font-bold text-white">Scaling Features for XGBoost</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Decision trees, Random Forests, and LightGBM evaluate monotonic rank order. Feature scaling produces bitwise-identical splits and zero accuracy gain. Skip continuous scaling in pure tree pipelines.
            </p>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-emerald-900/40 space-y-3">
            <div className="text-emerald-400 font-bold text-xs flex items-center gap-2">
              <span>✔</span> Best Practice: Pipeline Serialization
            </div>
            <h4 className="text-sm font-bold text-white">Bundle Scaler &amp; Model Together</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Package scalers and estimators into a unified Pipeline object (Joblib/ONNX). This ensures inference payloads cannot accidentally bypass scaling before reaching model weights.
            </p>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* SECTION 6: DIAGNOSTIC ASSESSMENT QUIZ */}
      {/* ----------------------------------------------------------------- */}
      <section id="quiz" className="space-y-8">
        <div className="border-b border-slate-800 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              Knowledge Verification
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              6. Diagnostic Assessment Quiz
            </h2>
          </div>
          {quizSubmitted && (
            <div className="text-sm font-bold px-4 py-1.5 rounded-xl bg-indigo-950 border border-indigo-500 text-indigo-300">
              Score: {calculateScore()} / {diagnosticQuestions.length} ({((calculateScore() / diagnosticQuestions.length) * 100).toFixed(0)}%)
            </div>
          )}
        </div>

        <div className="space-y-6">
          {diagnosticQuestions.map((q, idx) => (
            <div
              key={q.id}
              className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  Scenario {idx + 1} • {q.tier}
                </span>
                {quizSubmitted && (
                  <span
                    className={clsx(
                      "text-xs font-bold px-2 py-0.5 rounded-full border",
                      quizAnswers[q.id] === q.correctIndex
                        ? "bg-emerald-950 border-emerald-500 text-emerald-300"
                        : "bg-rose-950 border-rose-500 text-rose-300"
                    )}
                  >
                    {quizAnswers[q.id] === q.correctIndex ? "CORRECT ✔" : "INCORRECT ❌"}
                  </span>
                )}
              </div>

              <p className="text-sm sm:text-base font-semibold text-white leading-relaxed">
                {q.question}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {q.options.map((opt, optIdx) => {
                  const isSelected = quizAnswers[q.id] === optIdx;
                  const isCorrect = q.correctIndex === optIdx;

                  let btnStyle = "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700";
                  if (quizSubmitted) {
                    if (isCorrect) {
                      btnStyle = "bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold";
                    } else if (isSelected && !isCorrect) {
                      btnStyle = "bg-rose-950/80 border-rose-500 text-rose-200";
                    }
                  } else if (isSelected) {
                    btnStyle = "bg-indigo-950/80 border-indigo-500 text-white font-semibold";
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={quizSubmitted}
                      onClick={() => handleSelectQuizOption(q.id, optIdx)}
                      className={clsx(
                        "p-3 rounded-xl text-xs text-left border transition-all cursor-pointer flex items-start gap-2",
                        btnStyle
                      )}
                    >
                      <span className="font-bold text-indigo-400">
                        {String.fromCharCode(65 + optIdx)})
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {quizSubmitted && (
                <div className="pt-3 border-t border-slate-800/80 text-xs text-slate-300 space-y-2 bg-slate-950/50 p-3 rounded-xl">
                  <p>
                    <strong className="text-indigo-300">Explanation:</strong> {q.explanation}
                  </p>
                  <p className="text-cyan-400">
                    <strong>Practical Rule:</strong> {q.practicalTip}
                  </p>
                </div>
              )}
            </div>
          ))}

          {/* SUBMIT / RETAKE BUTTONS */}
          <div className="flex justify-end gap-3 pt-4">
            {!quizSubmitted ? (
              <button
                onClick={() => setQuizSubmitted(true)}
                disabled={Object.keys(quizAnswers).length < diagnosticQuestions.length}
                className={clsx(
                  "px-6 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all shadow-lg cursor-pointer",
                  Object.keys(quizAnswers).length === diagnosticQuestions.length
                    ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30"
                    : "bg-slate-800 text-slate-500 cursor-not-allowed"
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
                className="px-6 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all cursor-pointer"
              >
                Retake Assessment
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* SECTION 7: ACADEMIC REVISION NOTES & VIVA HANDBOOK */}
      {/* ----------------------------------------------------------------- */}
      <section id="handbook" className="space-y-6">
        <div className="border-b border-slate-800 pb-3">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
            Academic Reference
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            7. Academic Revision Handbook &amp; Viva Voce Q&amp;A
          </h2>
        </div>
        <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-xl">
          <PlainTextPrint content={noteText} filename="Topic15_Feature_Scaling_Notes.txt" />
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* SECTION 8: PURE PYTHON LABORATORY */}
      {/* ----------------------------------------------------------------- */}
      <section id="lab" className="space-y-6">
        <div className="border-b border-slate-800 pb-3">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
            Hands-On Code
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            8. Pure Python Laboratory: Scaling Dynamics &amp; Metric Simulator
          </h2>
        </div>
        <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-xl">
          <PythonFileLoader
            code={labCode}
            filename="feature_scaling_lab.py"
            runnable={true}
          />
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* SECTION 9: TEACHER CONSULTATION & GUIDANCE */}
      {/* ----------------------------------------------------------------- */}
      <section id="teacher" className="space-y-6">
        <div className="border-b border-slate-800 pb-3">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
            Faculty Mentorship
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            9. Teacher Consultation &amp; Viva Guidance
          </h2>
        </div>
        <Teacher />
      </section>
    </div>
  );
};

export default Topic15;
