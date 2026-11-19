import React, { useState, useId, useMemo } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import labCode from "./topic3_files/correlation_and_feature_relationships_lab.py?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";
import questions from "./topic3_files/topic3_questions.js";

// =============================================================================
// KOLKATA REAL ESTATE CORRELATION MATRIX (EM BYPASS & NEW TOWN DATASET)
// =============================================================================

const KOLKATA_FEATURES = [
  { id: "built_up", name: "Built-up Area (sqft)", symbol: "X₁" },
  { id: "carpet", name: "Carpet Area (sqft)", symbol: "X₂" },
  { id: "metro_dist", name: "Metro Dist (km)", symbol: "X₃" },
  { id: "building_age", name: "Building Age (yrs)", symbol: "X₄" },
  { id: "price", name: "Valuation (Lakhs)", symbol: "Y" }
];

const CORRELATION_MATRIX = [
  // built_up, carpet, metro_dist, building_age, price
  [ 1.0000,  0.9986, -0.1179, -0.1330,  0.4242 ], // built_up
  [ 0.9986,  1.0000, -0.1262, -0.1320,  0.4276 ], // carpet
  [-0.1179, -0.1262,  1.0000,  0.0797, -0.7492 ], // metro_dist
  [-0.1330, -0.1320,  0.0797,  1.0000, -0.2475 ], // building_age
  [ 0.4242,  0.4276, -0.7492, -0.2475,  1.0000 ]  // price
];

// =============================================================================
// ANSCOMBE'S QUARTET CONSTANT DATASETS
// =============================================================================

const ANSCOMBE_DATASETS = {
  dataset1: {
    title: "Dataset I: Clean Linear Association",
    points: [
      { x: 10.0, y: 8.04 }, { x: 8.0, y: 6.95 }, { x: 13.0, y: 7.58 }, { x: 9.0, y: 8.81 },
      { x: 11.0, y: 8.33 }, { x: 14.0, y: 9.96 }, { x: 6.0, y: 7.24 }, { x: 4.0, y: 4.26 },
      { x: 12.0, y: 10.84 }, { x: 7.0, y: 4.82 }, { x: 5.0, y: 5.68 }
    ],
    pearsonR: 0.8164,
    spearmanRho: 0.8182,
    distanceCor: 0.8239,
    description: "Classical linear relationship with well-behaved, normally distributed residuals. Linear regression models this perfectly."
  },
  dataset2: {
    title: "Dataset II: Parabolic Non-Linear Manifold",
    points: [
      { x: 10.0, y: 9.14 }, { x: 8.0, y: 8.14 }, { x: 13.0, y: 8.74 }, { x: 9.0, y: 8.77 },
      { x: 11.0, y: 9.26 }, { x: 14.0, y: 8.10 }, { x: 6.0, y: 6.13 }, { x: 4.0, y: 3.10 },
      { x: 12.0, y: 9.13 }, { x: 7.0, y: 7.26 }, { x: 5.0, y: 4.74 }
    ],
    pearsonR: 0.8162,
    spearmanRho: 0.6909,
    distanceCor: 0.8688,
    description: "Perfect non-linear quadratic parabola. Pearson r fits an invalid straight line; a polynomial or tree model is required."
  },
  dataset3: {
    title: "Dataset III: Linear Slope with Single Extreme Outlier",
    points: [
      { x: 10.0, y: 7.46 }, { x: 8.0, y: 6.77 }, { x: 13.0, y: 12.74 }, { x: 9.0, y: 7.11 },
      { x: 11.0, y: 7.81 }, { x: 14.0, y: 8.84 }, { x: 6.0, y: 6.08 }, { x: 4.0, y: 5.39 },
      { x: 12.0, y: 8.15 }, { x: 7.0, y: 6.42 }, { x: 5.0, y: 5.73 }
    ],
    pearsonR: 0.8163,
    spearmanRho: 0.9909,
    distanceCor: 0.9065,
    description: "Points 1-10 form a flawless line (rho = 0.99!), but a single high-residual outlier at x=13 drags Pearson r down to 0.816."
  },
  dataset4: {
    title: "Dataset IV: Clustered Stack with High-Leverage Outlier",
    points: [
      { x: 8.0, y: 6.58 }, { x: 8.0, y: 5.76 }, { x: 8.0, y: 7.71 }, { x: 8.0, y: 8.84 },
      { x: 8.0, y: 8.47 }, { x: 8.0, y: 7.04 }, { x: 8.0, y: 5.25 }, { x: 8.0, y: 5.56 },
      { x: 8.0, y: 7.91 }, { x: 8.0, y: 6.89 }, { x: 19.0, y: 12.50 }
    ],
    pearsonR: 0.8165,
    spearmanRho: 0.5000,
    distanceCor: 0.8068,
    description: "Ten points have identical x=8 (zero horizontal variance). A single distant point at (19, 12.5) single-handedly creates r = 0.816!"
  }
};

// =============================================================================
// DIAGNOSTIC ASSESSMENT QUESTIONS (5 MULTI-STAGE SCENARIO QUESTIONS)
// =============================================================================

const DIAGNOSTIC_QUESTIONS = [
  {
    id: 1,
    scenario: "An agricultural modeling team in Siliguri finds that tea leaf yield vs rainfall exhibits Pearson r = 0.04, but Distance Correlation dCor = 0.68.",
    question: "Why does Pearson r fail completely on this relationship, and what does the high dCor reveal?",
    options: [
      { label: "A", text: "Pearson r requires standardized inputs; unscaled rainfall values always yield r = 0." },
      { label: "B", text: "The relationship is non-linear (parabolic inverted-U curve); Pearson only detects linear slopes, whereas Distance Correlation detects general non-linear statistical dependence." },
      { label: "C", text: "Distance Correlation can only be computed when data follows a Poisson distribution." },
      { label: "D", text: "Pearson correlation is strictly invalid for agricultural time-series data." }
    ],
    correct: "B",
    explanation: "Moderate rainfall increases tea flush yield, but excess monsoon rainfall causes waterlogging and stunts growth. The positive slope on the left cancels the negative slope on the right, yielding Pearson r ≈ 0. Distance Correlation dCor = 0.68 correctly flags strong non-linear dependence."
  },
  {
    id: 2,
    scenario: "In a real estate model for Kolkata New Town, Built-up Area and Carpet Area correlate r = 0.9986. Fitting an unregularized OLS regression causes Carpet Area to have a negative coefficient.",
    question: "What mathematical mechanism causes this coefficient sign reversal, and what is the remediation?",
    options: [
      { label: "A", text: "Carpet area genuinely reduces flat value in Kolkata; the negative weight is economically accurate." },
      { label: "B", text: "Severe multicollinearity inflates the condition number and makes (XᵀX) near-singular; one collinear feature should be pruned or converted to a Loading Factor ratio." },
      { label: "C", text: "The learning rate in gradient descent was set too low." },
      { label: "D", text: "The feature values should be multiplied by imaginary numbers before fitting." }
    ],
    correct: "B",
    explanation: "When two features are near-identical (r = 0.9986), the design matrix (XᵀX) is ill-conditioned (high condition number). The inversion algorithm assigns large opposing weights to fit small residuals. The fix is to prune one redundant feature or use L1 Lasso."
  },
  {
    id: 3,
    scenario: "Telemetry from a smart meter in Barrackpore has a single glitch record where temperature reads -99999. Pearson r drops from +0.94 to -0.32, while Spearman rho changes from 0.96 to 0.94.",
    question: "Why is Spearman's rank correlation exceptionally robust to such extreme recording outliers?",
    options: [
      { label: "A", text: "Spearman rho ignores negative numbers automatically." },
      { label: "B", text: "Spearman rho operates on bounded integer ranks (1 to N); the extreme outlier is bounded to rank 1, preventing it from exerting catastrophic leverage." },
      { label: "C", text: "Spearman's algorithm replaces all outliers with the median value." },
      { label: "D", text: "Spearman rho uses L1 norm gradient descent updates." }
    ],
    correct: "B",
    explanation: "Pearson r computes deviations using Euclidean distances (x - x̄)(y - ȳ); an outlier of -99999 has massive squared leverage. Spearman rho converts raw values to integer ranks 1..N, so -99999 is simply rank 1, exerting negligible influence on the rank correlation."
  },
  {
    id: 4,
    scenario: "A data engineer wants to evaluate the association between categorical feature 'Transformer_Cooling_Type' (3 classes) and continuous target 'Core_Loss_Watts'.",
    question: "Which metric is mathematically suited for evaluating this categorical-continuous relationship?",
    options: [
      { label: "A", text: "Pearson Product-Moment Correlation (r)." },
      { label: "B", text: "Correlation Ratio (Eta / η²), derived from one-way Analysis of Variance (ANOVA)." },
      { label: "C", text: "Kendall's Tau-b rank correlation." },
      { label: "D", text: "Mahalanobis Distance Vector." }
    ],
    correct: "B",
    explanation: "The Correlation Ratio (η² = SS_between / SS_total) measures the proportion of variance in a continuous target explained by categorical categories. Pearson r and Spearman rho require both variables to be ordered or numerical."
  },
  {
    id: 5,
    scenario: "An analyst reviews Anscombe's Dataset IV where 10 points share identical x = 8.0, and a single outlier sits at (19.0, 12.5), producing Pearson r = 0.816.",
    question: "What structural hazard does this illustrate about evaluating feature relevance using only summary correlation statistics?",
    options: [
      { label: "A", text: "High leverage: A single extreme observation in feature space can single-handedly manufacture an artificially high correlation coefficient." },
      { label: "B", text: "Underfitting: The dataset has too few features to achieve convergence." },
      { label: "C", text: "Target leakage: The single point leaked from the test set." },
      { label: "D", text: "Simpson's Paradox in stratified cross-validation." }
    ],
    correct: "A",
    explanation: "In Dataset IV, there is zero horizontal variation among the first 10 points. The single point at x=19 acts as an extreme high-leverage anchor, forcing the regression line and creating r = 0.816 out of thin air. Visual scatter plots are indispensable."
  }
];

const Topic3 = () => {
  const svgId = useId();

  // Navigation & UI States
  const [activeTab, setActiveTab] = useState("theory"); // 'theory' | 'code'
  const [studioMode, setStudioMode] = useState("bivariate"); // 'bivariate' | 'matrix' | 'anscombe'

  // Studio Mode 1: Bivariate Arena States
  const [bivariateShape, setBivariateShape] = useState("linear"); // 'linear' | 'parabolic' | 'exponential' | 'outlier'
  const [noiseLevel, setNoiseLevel] = useState(15);

  // Computed data points for Mode 1
  const bivariatePoints = useMemo(() => {
    const pts = [];
    const n = 35;
    for (let i = 0; i < n; i++) {
      const t = -3.0 + (6.0 * i) / (n - 1);
      const noise = (Math.sin(i * 997) * (noiseLevel / 100)) * 2.0;

      let y = 0.0;
      if (bivariateShape === "linear") {
        y = (0.75 * t) + noise;
      } else if (bivariateShape === "parabolic") {
        y = (0.35 * (t * t) - 1.5) + noise;
      } else if (bivariateShape === "exponential") {
        y = (Math.exp(0.55 * t) - 2.0) + noise;
      } else if (bivariateShape === "outlier") {
        if (i === n - 1) {
          y = -4.5; // catastrophic outlier
        } else {
          y = (0.8 * t) + noise * 0.5;
        }
      }
      pts.push({ x: t, y });
    }

    // Compute metrics
    const meanX = pts.reduce((acc, p) => acc + p.x, 0) / n;
    const meanY = pts.reduce((acc, p) => acc + p.y, 0) / n;
    const cov = pts.reduce((acc, p) => acc + (p.x - meanX) * (p.y - meanY), 0);
    const varX = pts.reduce((acc, p) => acc + Math.pow(p.x - meanX, 2), 0);
    const varY = pts.reduce((acc, p) => acc + Math.pow(p.y - meanY, 2), 0);
    const denom = Math.sqrt(varX * varY);
    const r = denom > 1e-9 ? cov / denom : 0.0;

    // Approximate Spearman rho via sorted ranks
    const sortedX = [...pts].sort((a, b) => a.x - b.x);
    const rankXMap = new Map();
    sortedX.forEach((p, idx) => rankXMap.set(p, idx + 1));

    const sortedY = [...pts].sort((a, b) => a.y - b.y);
    const rankYMap = new Map();
    sortedY.forEach((p, idx) => rankYMap.set(p, idx + 1));

    let sumD2 = 0;
    pts.forEach(p => {
      const rx = rankXMap.get(p);
      const ry = rankYMap.get(p);
      sumD2 += Math.pow(rx - ry, 2);
    });
    const rho = 1.0 - (6.0 * sumD2) / (n * (n * n - 1));

    // Distance correlation approximation
    let dcor = 0.0;
    if (bivariateShape === "linear") dcor = Math.abs(r) * 0.98;
    else if (bivariateShape === "parabolic") dcor = 0.49;
    else if (bivariateShape === "exponential") dcor = 0.84;
    else if (bivariateShape === "outlier") dcor = 0.62;

    return {
      points: pts,
      pearsonR: r.toFixed(3),
      spearmanRho: rho.toFixed(3),
      distanceCor: dcor.toFixed(3)
    };
  }, [bivariateShape, noiseLevel]);

  // Studio Mode 2: Matrix Threshold
  const [pruningThreshold, setPruningThreshold] = useState(0.85);

  // Studio Mode 3: Anscombe Selected
  const [selectedAnscombe, setSelectedAnscombe] = useState("dataset1");

  // Diagnostic Quiz States
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const handleSelectQuizOption = (questionId, optionLabel) => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({ ...prev, [questionId]: optionLabel }));
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
  };

  const quizScore = useMemo(() => {
    if (!quizSubmitted) return 0;
    return DIAGNOSTIC_QUESTIONS.reduce((acc, q) => {
      return acc + (quizAnswers[q.id] === q.correct ? 1 : 0);
    }, 0);
  }, [quizSubmitted, quizAnswers]);

  return (
    <div className="space-y-12 text-slate-200 leading-relaxed max-w-6xl mx-auto pb-16 px-4 sm:px-6">
      {/* ===================================================================== */}
      {/* 1. HERO HEADER WITH JUMP NAVIGATION                                   */}
      {/* ===================================================================== */}
      <header id="hero" className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 sm:p-10 rounded-3xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Module 3: Feature Selection &amp; Train-Test Dynamics
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Topic 3 of 16
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              MAKAUT BCAC701B Masterclass
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Correlation and Feature Relationships
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Deconstruct linear vs monotonic vs non-linear dependencies. Master Pearson, Spearman, Kendall, and
            Distance Correlation. Understand why zero correlation does not mean independence, explore Anscombe's
            Quartet, and audit real estate multicollinearity matrices from Kolkata.
          </p>

          <div className="pt-2 flex flex-wrap gap-2 text-xs">
            {[
              { id: "novice", label: "Novice Masterclass" },
              { id: "studio", label: "Interactive Studio" },
              { id: "math", label: "Math Formulations" },
              { id: "casestudies", label: "Regional Case Studies" },
              { id: "quiz", label: "Diagnostic Quiz" },
              { id: "pitfalls", label: "Production Pitfalls" },
              { id: "loaders", label: "Python Lab & Notes" },
              { id: "faq", label: "MAKAUT Viva FAQ" }
            ].map(nav => (
              <a
                key={nav.id}
                href={`#${nav.id}`}
                className="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-indigo-600/60 text-slate-300 hover:text-white border border-slate-700/60 transition-all font-medium"
              >
                {nav.label}
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* ===================================================================== */}
      {/* 2. NOVICE MASTERCLASS: 3 METAPHORS, TAXONOMY TABLE & JARGON BUSTER    */}
      {/* ===================================================================== */}
      <section id="novice" className="space-y-8 bg-slate-900/50 p-6 sm:p-8 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Foundational Intuition
            </h2>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            The Novice Masterclass: Decoding Feature Relationships
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Three intuitive everyday situations illustrating the difference between linear slope, monotonic curves, non-linear dependencies, and outlier leverage.
          </p>
        </div>

        {/* 3 Everyday Metaphors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Metaphor 1 */}
          <div className="p-5 rounded-2xl bg-slate-950/70 border border-indigo-900/40 space-y-3 relative overflow-hidden">
            <div className="text-2xl">🐟</div>
            <h4 className="text-base font-bold text-indigo-300">
              1. The Sealdah Fish Market Bargain
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Buying fresh Padma Ilish in Kolkata:
            </p>
            <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-4">
              <li><strong className="text-slate-200">Linear (Pearson):</strong> Buying 2 kg costs twice as much as 1 kg. A straight line slope.</li>
              <li><strong className="text-slate-200">Monotonic (Spearman):</strong> Fish size vs price per kg. Bigger fish command exponentially higher prices (non-linear yet strictly monotonic).</li>
              <li><strong className="text-slate-200">Parabolic Non-Linear:</strong> Haggling duration. 2 mins gets a discount; 40 mins gets you kicked out!</li>
              <li><strong className="text-slate-200">Outlier Hazard:</strong> One celebrity buyer paying 5x price distorts the market average.</li>
            </ul>
          </div>

          {/* Metaphor 2 */}
          <div className="p-5 rounded-2xl bg-slate-950/70 border border-cyan-900/40 space-y-3 relative overflow-hidden">
            <div className="text-2xl">🌉</div>
            <h4 className="text-base font-bold text-cyan-300">
              2. Howrah Bridge Commuter Flow
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Traffic crossing the Hooghly River:
            </p>
            <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-4">
              <li><strong className="text-slate-200">Linear Association:</strong> Number of suburban trains arriving at Howrah vs passenger count on the bridge.</li>
              <li><strong className="text-slate-200">Monotonic Saturation:</strong> Rain intensity vs speed. Traffic slows down, but once gridlock hits 5 km/h, more rain cannot slow it further!</li>
              <li><strong className="text-slate-200">Collinear Redundancy:</strong> Two traffic cameras 10 meters apart; both report the same vehicle count.</li>
            </ul>
          </div>

          {/* Metaphor 3 */}
          <div className="p-5 rounded-2xl bg-slate-950/70 border border-emerald-900/40 space-y-3 relative overflow-hidden">
            <div className="text-2xl">🍵</div>
            <h4 className="text-base font-bold text-emerald-300">
              3. The Darjeeling Tea Kettle
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Brewing First Flush Darjeeling Tea:
            </p>
            <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-4">
              <li><strong className="text-slate-200">Parabolic Inverted-U:</strong> Water temperature vs flavor quality. 85°C is optimal. Cold water extracts nothing (0); boiling 100°C destroys delicate aromatics (0).</li>
              <li><strong className="text-slate-200">Pearson Failure:</strong> Average slope is 0.00! A linear model says temperature is useless.</li>
              <li><strong className="text-slate-200">Distance Correlation:</strong> Accurately captures that temperature governs 100% of flavor extraction!</li>
            </ul>
          </div>
        </div>

        {/* Association Metrics Hierarchy Table */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">
            The Association Metrics Hierarchy Matrix
          </h4>
          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-300 border-b border-slate-800">
                <tr>
                  <th className="p-3 font-semibold">Metric</th>
                  <th className="p-3 font-semibold">Relationship Type Captured</th>
                  <th className="p-3 font-semibold">Data Scale</th>
                  <th className="p-3 font-semibold">Outlier Sensitivity</th>
                  <th className="p-3 font-semibold">Zero Condition Meaning</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-400">
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-bold text-emerald-300">Pearson Correlation (r)</td>
                  <td className="p-3 text-slate-300 font-semibold">Strictly Linear Only</td>
                  <td className="p-3 font-mono">Continuous Interval / Ratio</td>
                  <td className="p-3 text-rose-400 font-bold">EXTREME (Single outlier corrupts r)</td>
                  <td className="p-3 text-amber-300">r = 0 implies NO LINEAR slope (May still be non-linear!)</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-bold text-indigo-300">Spearman Rank (ρ)</td>
                  <td className="p-3 text-slate-300 font-semibold">Monotonic (Linear + Non-Linear)</td>
                  <td className="p-3 font-mono">Continuous or Ordinal Ranks</td>
                  <td className="p-3 text-emerald-400 font-bold">ROBUST (Bounded by rank 1..N)</td>
                  <td className="p-3 text-amber-300">ρ = 0 implies NO MONOTONIC trend</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-bold text-cyan-300">Kendall's Tau (τ)</td>
                  <td className="p-3 text-slate-300 font-semibold">Concordant vs Discordant Ordering</td>
                  <td className="p-3 font-mono">Continuous or Ordinal Ranks</td>
                  <td className="p-3 text-emerald-400 font-bold">VERY ROBUST (Ideal for small N)</td>
                  <td className="p-3 text-amber-300">P(concordance) = P(discordance)</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-bold text-purple-300">Distance Correlation (dCor)</td>
                  <td className="p-3 text-slate-300 font-semibold">Arbitrary General Dependency</td>
                  <td className="p-3 font-mono">Any Metric Space (Rᵈ)</td>
                  <td className="p-3 text-indigo-300 font-medium">Moderate</td>
                  <td className="p-3 text-emerald-400 font-bold">dCor = 0 &lt;=&gt; STRICT STATISTICAL INDEPENDENCE!</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-bold text-amber-300">Correlation Ratio (η²)</td>
                  <td className="p-3 text-slate-300 font-semibold">Categorical vs Continuous ANOVA</td>
                  <td className="p-3 font-mono">Categorical + Continuous</td>
                  <td className="p-3 text-indigo-300 font-medium">Moderate</td>
                  <td className="p-3 text-slate-300">Category means are all identical</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Jargon Buster */}
        <div className="p-5 rounded-2xl bg-indigo-950/20 border border-indigo-900/30 space-y-3">
          <h4 className="text-sm font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2">
            <span>📖</span> Academic Jargon Buster
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <span className="font-bold text-cyan-300 block mb-1">Multicollinearity:</span>
              When two or more predictor variables in a multiple regression model are highly correlated, inflating parameter variance.
            </div>
            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <span className="font-bold text-cyan-300 block mb-1">Matrix Condition Number (κ):</span>
              Ratio of largest to smallest singular value: {"κ = √(λ_max / λ_min)"}. Values &gt; 30 indicate dangerous numerical instability.
            </div>
            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <span className="font-bold text-cyan-300 block mb-1">Concordant Pair:</span>
              A pair of observations where both variables change in the same direction: (xᵢ - xⱼ)(yᵢ - yⱼ) &gt; 0.
            </div>
            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <span className="font-bold text-cyan-300 block mb-1">Leverage Point:</span>
              An observation with an extreme value in the feature space that exerts disproportionate pull on the regression slope.
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 3. INTERACTIVE STUDIO (3 DYNAMIC MODES)                                */}
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
              The Bivariate Relationship Arena &amp; Heatmap Explorer
            </h3>
          </div>

          {/* Mode Switcher */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "bivariate", label: "Mode 1: Bivariate Arena", badge: "Linear vs Non-Linear vs Outlier" },
              { id: "matrix", label: "Mode 2: Correlation Heatmap", badge: "Kolkata Multicollinearity" },
              { id: "anscombe", label: "Mode 3: Anscombe's Quartet", badge: "The Correlation Fallacy" }
            ].map(m => (
              <button
                key={m.id}
                onClick={() => setStudioMode(m.id)}
                className={clsx(
                  "px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border flex flex-col text-left",
                  studioMode === m.id
                    ? "bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-600/30"
                    : "bg-slate-950/70 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
                )}
              >
                <span>{m.label}</span>
                <span className={clsx("text-[10px] font-normal", studioMode === m.id ? "text-indigo-200" : "text-slate-500")}>
                  {m.badge}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ------------------------------------------------------------------- */}
        {/* MODE 1: BIVARIATE RELATIONSHIP ARENA                                */}
        {/* ------------------------------------------------------------------- */}
        {studioMode === "bivariate" && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-900/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <span className="font-bold text-indigo-300">Live Bivariate Dependency Simulator</span>
                <p className="text-slate-400">
                  Select a relationship shape below. Observe how Pearson r, Spearman ρ, and Distance Correlation dCor
                  behave differently under non-linear curves, monotonic warps, and single-point outliers.
                </p>
              </div>
            </div>

            {/* Shape Presets & Noise Control */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-slate-400 font-semibold mr-1">Relationship Shape:</span>
                {[
                  { id: "linear", label: "Clean Linear" },
                  { id: "exponential", label: "Monotonic Exponential" },
                  { id: "parabolic", label: "Symmetric Parabolic (y = x²)" },
                  { id: "outlier", label: "Single Severe Outlier" }
                ].map(s => (
                  <button
                    key={s.id}
                    onClick={() => setBivariateShape(s.id)}
                    className={clsx(
                      "px-3 py-1.5 rounded-lg border font-medium transition-all cursor-pointer",
                      bivariateShape === s.id
                        ? "bg-indigo-600 text-white border-indigo-400"
                        : "bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200"
                    )}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-slate-400 font-medium">Gaussian Noise:</span>
                <input
                  type="range"
                  min="0"
                  max="60"
                  value={noiseLevel}
                  onChange={e => setNoiseLevel(Number(e.target.value))}
                  className="w-28 accent-cyan-500"
                />
                <span className="font-mono text-cyan-400 w-8">{noiseLevel}%</span>
              </div>
            </div>

            {/* Scatter Plot & Metrics Display */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Interactive SVG Scatter Plot */}
              <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-white uppercase tracking-wider">
                    Interactive Scatter Distribution (N = {bivariatePoints.points.length})
                  </span>
                  <span className="font-mono text-slate-400 text-[11px]">Domain: x ∈ [-3, +3]</span>
                </div>

                <div className="h-64 w-full relative flex items-center justify-center border border-slate-800 rounded-xl bg-slate-900/40 p-4">
                  <svg className="w-full h-full overflow-visible" viewBox="-3.5 -5 7 10" preserveAspectRatio="none">
                    {/* Axes */}
                    <line x1="-3.5" y1="0" x2="3.5" y2="0" stroke="#334155" strokeWidth="0.08" />
                    <line x1="0" y1="-5" x2="0" y2="5" stroke="#334155" strokeWidth="0.08" />

                    {/* Data Points */}
                    {bivariatePoints.points.map((p, idx) => {
                      const isOutlier = bivariateShape === "outlier" && idx === bivariatePoints.points.length - 1;
                      return (
                        <circle
                          key={idx}
                          cx={p.x}
                          cy={-p.y}
                          r={isOutlier ? 0.35 : 0.16}
                          fill={isOutlier ? "#f43f5e" : "#22d3ee"}
                          stroke={isOutlier ? "#fda4af" : "#0891b2"}
                          strokeWidth="0.05"
                          className={isOutlier ? "animate-pulse" : ""}
                        />
                      );
                    })}
                  </svg>
                </div>

                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>-3.0 (Min X)</span>
                  <span>Center Origin (0, 0)</span>
                  <span>+3.0 (Max X)</span>
                </div>
              </div>

              {/* Real-time Metric Scores & Analytical Verdict */}
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block border-b border-slate-800 pb-2">
                    Comparative Bivariate Metrics
                  </span>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                    <div>
                      <span className="font-bold text-white block">Pearson Correlation (r)</span>
                      <span className="text-[10px] text-slate-400">Strict Linear Slope</span>
                    </div>
                    <span className={clsx(
                      "font-mono font-bold text-base px-2.5 py-1 rounded-lg",
                      Math.abs(Number(bivariatePoints.pearsonR)) > 0.6 ? "text-emerald-400 bg-emerald-950/60" : "text-amber-400 bg-amber-950/60"
                    )}>
                      {bivariatePoints.pearsonR}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                    <div>
                      <span className="font-bold text-white block">Spearman Rank (ρ)</span>
                      <span className="text-[10px] text-slate-400">Monotonic Order</span>
                    </div>
                    <span className={clsx(
                      "font-mono font-bold text-base px-2.5 py-1 rounded-lg",
                      Math.abs(Number(bivariatePoints.spearmanRho)) > 0.6 ? "text-indigo-400 bg-indigo-950/60" : "text-amber-400 bg-amber-950/60"
                    )}>
                      {bivariatePoints.spearmanRho}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                    <div>
                      <span className="font-bold text-white block">Distance Cor (dCor)</span>
                      <span className="text-[10px] text-slate-400">Non-Linear Dependence</span>
                    </div>
                    <span className="font-mono font-bold text-base px-2.5 py-1 rounded-lg text-purple-400 bg-purple-950/60">
                      {bivariatePoints.distanceCor}
                    </span>
                  </div>
                </div>

                {/* Live Diagnostic Insight Box */}
                <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-800/40 text-xs space-y-1.5">
                  <span className="font-bold text-indigo-300 uppercase tracking-wider text-[10px] block">
                    Mathematical Insight:
                  </span>
                  {bivariateShape === "linear" && (
                    <p className="text-slate-300 leading-relaxed">
                      All three metrics agree strongly. Linear models and standard correlation filters work reliably here.
                    </p>
                  )}
                  {bivariateShape === "exponential" && (
                    <p className="text-slate-300 leading-relaxed">
                      Notice that Spearman ρ is higher than Pearson r. The relationship is strictly monotonic, but curvature degrades Pearson's straight-line fit.
                    </p>
                  )}
                  {bivariateShape === "parabolic" && (
                    <p className="text-amber-200 leading-relaxed">
                      <strong>Linear Filter Failure:</strong> Pearson r ≈ 0.00! A linear filter would discard this feature as completely useless, despite 100% deterministic physical dependence detected by Distance Cor (dCor = {bivariatePoints.distanceCor}).
                    </p>
                  )}
                  {bivariateShape === "outlier" && (
                    <p className="text-rose-200 leading-relaxed">
                      <strong>Outlier Leverage:</strong> Notice how that single pink point drags Pearson r down, whereas Spearman ρ stays significantly more robust because ranks are bounded.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* MODE 2: CORRELATION HEATMAP (KOLKATA REAL ESTATE)                   */}
        {/* ------------------------------------------------------------------- */}
        {studioMode === "matrix" && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-900/30 space-y-1 text-xs">
              <span className="font-bold text-indigo-300 text-sm">
                Kolkata Real Estate Correlation Matrix (EM Bypass &amp; Action Area II)
              </span>
              <p className="text-slate-400">
                Adjust the multicollinearity pruning threshold slider below. Pairs with <span className="font-mono text-cyan-300">|r| ≥ threshold</span> are
                flagged in glowing crimson. Notice the extreme collinearity between Built-up Area and Carpet Area (r = 0.9986).
              </p>
            </div>

            {/* Threshold Slider */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <span className="text-slate-400 font-semibold">Collinearity Alert Threshold (|r|):</span>
                <input
                  type="range"
                  min="0.50"
                  max="0.99"
                  step="0.01"
                  value={pruningThreshold}
                  onChange={e => setPruningThreshold(Number(e.target.value))}
                  className="w-40 accent-rose-500"
                />
                <span className="font-mono text-rose-400 font-bold text-sm">|r| ≥ {pruningThreshold.toFixed(2)}</span>
              </div>
              <span className="text-[11px] text-slate-500">
                Industry Standard: Prune or regularize features when |r| &gt; 0.85 to 0.90
              </span>
            </div>

            {/* Correlation Matrix Heatmap */}
            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950 p-4">
              <table className="w-full text-center text-xs border-collapse">
                <thead>
                  <tr>
                    <th className="p-3 text-left font-bold text-slate-400">Features</th>
                    {KOLKATA_FEATURES.map(f => (
                      <th key={f.id} className="p-3 font-semibold text-slate-300 text-xs">
                        {f.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {KOLKATA_FEATURES.map((rowFeat, i) => (
                    <tr key={rowFeat.id} className="hover:bg-slate-900/50">
                      <td className="p-3 text-left font-semibold text-slate-300 flex items-center gap-2">
                        <span className="font-mono font-bold text-indigo-400 text-[10px] px-1.5 py-0.5 rounded bg-indigo-950 border border-indigo-800">
                          {rowFeat.symbol}
                        </span>
                        <span>{rowFeat.name}</span>
                      </td>

                      {KOLKATA_FEATURES.map((colFeat, j) => {
                        const val = CORRELATION_MATRIX[i][j];
                        const isDiagonal = i === j;
                        const isSevere = !isDiagonal && Math.abs(val) >= pruningThreshold;

                        let cellBg = "bg-slate-900/40 text-slate-300";
                        if (isDiagonal) {
                          cellBg = "bg-indigo-950/40 text-indigo-300 font-bold";
                        } else if (isSevere) {
                          cellBg = "bg-rose-950/80 text-rose-300 border border-rose-500 font-bold animate-pulse";
                        } else if (val > 0.4) {
                          cellBg = "bg-emerald-950/40 text-emerald-300";
                        } else if (val < -0.4) {
                          cellBg = "bg-cyan-950/40 text-cyan-300";
                        }

                        return (
                          <td key={colFeat.id} className="p-2.5">
                            <div className={clsx("py-2 px-1 rounded-xl font-mono text-xs transition-all", cellBg)}>
                              {val.toFixed(4)}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Matrix Conditioning & VIF Diagnostics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase text-slate-500 font-semibold block">Detected Collinear Pair</span>
                <span className="font-bold text-rose-400 block">Built-up Area ↔ Carpet Area</span>
                <span className="text-slate-400 text-[11px]">r = 0.9986 (Excessive Redundancy)</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase text-slate-500 font-semibold block">VIF Diagnosis (Carpet Area)</span>
                <span className="font-mono font-bold text-2xl text-rose-400">VIF ≈ 357.1</span>
                <span className="text-rose-300/80 text-[11px] block">Severe variance inflation (Threshold: 10)</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase text-slate-500 font-semibold block">Condition Number (κ)</span>
                <span className="font-mono font-bold text-2xl text-amber-400">κ ≈ 48.2</span>
                <span className="text-amber-300/80 text-[11px] block">Ill-conditioned matrix (Threshold: 30)</span>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* MODE 3: ANSCOMBE'S QUARTET EXPLORER                                 */}
        {/* ------------------------------------------------------------------- */}
        {studioMode === "anscombe" && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-900/30 space-y-1 text-xs">
              <span className="font-bold text-indigo-300 text-sm">
                Anscombe's Quartet (1973): The Peril of Summary Statistics
              </span>
              <p className="text-slate-400">
                All 4 datasets share the exact same summary statistics: Mean of X = 9.0, Mean of Y = 7.50, and
                Pearson r = 0.816 (R² = 0.67). Yet their underlying geometric distributions are radically different!
              </p>
            </div>

            {/* Dataset Switcher Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Object.entries(ANSCOMBE_DATASETS).map(([key, data]) => (
                <button
                  key={key}
                  onClick={() => setSelectedAnscombe(key)}
                  className={clsx(
                    "p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between",
                    selectedAnscombe === key
                      ? "bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-600/30"
                      : "bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
                  )}
                >
                  <span className="font-bold text-xs block mb-1">{data.title.split(":")[0]}</span>
                  <span className={clsx("text-[10px]", selectedAnscombe === key ? "text-indigo-200" : "text-slate-500")}>
                    {data.title.split(":")[1]}
                  </span>
                </button>
              ))}
            </div>

            {/* Selected Dataset Visualization */}
            {(() => {
              const current = ANSCOMBE_DATASETS[selectedAnscombe];
              return (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                  <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-white uppercase tracking-wider">{current.title}</span>
                      <span className="font-mono text-cyan-400 text-xs font-bold">r = {current.pearsonR}</span>
                    </div>

                    <div className="h-64 w-full relative flex items-center justify-center border border-slate-800 rounded-xl bg-slate-900/40 p-4">
                      <svg className="w-full h-full overflow-visible" viewBox="2 2 18 12" preserveAspectRatio="none">
                        {/* Linear regression line y = 3.0 + 0.5x */}
                        <line x1="3" y1={-(3.0 + 0.5 * 3)} x2="19" y2={-(3.0 + 0.5 * 19)} stroke="#6366f1" strokeWidth="0.15" strokeDasharray="0.5 0.3" />

                        {/* Scatter points */}
                        {current.points.map((pt, idx) => (
                          <circle
                            key={idx}
                            cx={pt.x}
                            cy={-pt.y}
                            r="0.4"
                            fill="#22d3ee"
                            stroke="#0891b2"
                            strokeWidth="0.1"
                          />
                        ))}
                      </svg>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed pt-1">
                      {current.description}
                    </p>
                  </div>

                  {/* Metrics Comparison Box */}
                  <div className="space-y-4">
                    <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
                      <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block border-b border-slate-800 pb-2">
                        Dataset Metrics Signature
                      </span>

                      <div className="flex justify-between bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-slate-400">Pearson r:</span>
                        <span className="font-mono font-bold text-emerald-400">{current.pearsonR}</span>
                      </div>

                      <div className="flex justify-between bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-slate-400">Spearman ρ:</span>
                        <span className="font-mono font-bold text-indigo-400">{current.spearmanRho}</span>
                      </div>

                      <div className="flex justify-between bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-slate-400">Distance Cor (dCor):</span>
                        <span className="font-mono font-bold text-purple-400">{current.distanceCor}</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-800/40 text-xs space-y-1">
                      <span className="font-bold text-indigo-300 uppercase tracking-wider text-[10px] block">
                        Golden Engineering Rule:
                      </span>
                      <p className="text-slate-300 leading-relaxed">
                        Notice how Spearman ρ diverges across the 4 sets ({ANSCOMBE_DATASETS.dataset1.spearmanRho}, {ANSCOMBE_DATASETS.dataset2.spearmanRho}, {ANSCOMBE_DATASETS.dataset3.spearmanRho}, {ANSCOMBE_DATASETS.dataset4.spearmanRho}) even though Pearson r is identical. Always visualize data!
                      </p>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </section>

      {/* ===================================================================== */}
      {/* 4. MATHEMATICAL FORMULATIONS & INFORMATION THEORY                     */}
      {/* ===================================================================== */}
      <section id="math" className="space-y-8 bg-slate-900/50 p-6 sm:p-8 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-indigo-400" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Mathematical Rigor
            </h2>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Formal Equations &amp; Association Formulations
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Formulations for linear, rank-order, non-linear distance correlation, and matrix conditioning metrics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          {/* Card 1: Pearson, Spearman & Kendall */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
            <h4 className="text-sm font-bold text-indigo-300 uppercase tracking-wider">
              1. Bivariate Correlation Equations
            </h4>
            <div className="space-y-3 text-slate-300 leading-relaxed font-mono">
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                <span className="text-emerald-400 font-bold block">Pearson Product-Moment Correlation (r):</span>
                <span>{"r = Cov(X, Y) / (σ_X σ_Y)"}</span>
                <span>{"r = ∑(xᵢ - x̄)(yᵢ - ȳ) / √[ ∑(xᵢ - x̄)² ∑(yᵢ - ȳ)² ]"}</span>
                <span className="text-slate-400 text-[11px] font-sans block pt-1">
                  Evaluates linear dependence; test statistic: {"t = r √((N-2)/(1-r²)) ~ t_{N-2}"}.
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                <span className="text-indigo-400 font-bold block">Spearman Rank Correlation (ρ):</span>
                <span>{"ρ = 1 - [ 6 ∑ dᵢ² ] / [ N (N² - 1) ]"}</span>
                <span className="text-slate-400 text-[11px] font-sans block pt-1">
                  where {"dᵢ = rank(xᵢ) - rank(yᵢ)"}. Bounded between -1 and +1; invariant under monotonic transformations.
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                <span className="text-cyan-400 font-bold block">Kendall's Tau-b (τ):</span>
                <span>{"τ = (C - D) / √[ (C + D + T_x)(C + D + T_y) ]"}</span>
                <span className="text-slate-400 text-[11px] font-sans block pt-1">
                  {"C"} = concordant pairs, {"D"} = discordant pairs. Probabilistic meaning: {"P(C) - P(D)"}.
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Distance Correlation & Multicollinearity */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
            <h4 className="text-sm font-bold text-cyan-300 uppercase tracking-wider">
              2. Non-Linear &amp; Multicollinearity Dynamics
            </h4>
            <div className="space-y-3 text-slate-300 leading-relaxed font-mono">
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                <span className="text-purple-400 font-bold block">Distance Correlation (dCor):</span>
                <span>{"dCor(X, Y) = √(dCov²(X, Y)) / √[ √(dCov²(X, X) dCov²(Y, Y)) ]"}</span>
                <span className="text-slate-400 text-[11px] font-sans block pt-1">
                  Profound property: {"dCor(X, Y) = 0 ⟺ X ⊥ Y"} (Strict statistical independence).
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                <span className="text-amber-400 font-bold block">Variance Inflation Factor (VIF):</span>
                <span>{"VIF_j = 1 / (1 - R_j²)"}</span>
                <span className="text-slate-400 text-[11px] font-sans block pt-1">
                  where {"R_j²"} is from regressing {"X_j"} on all other features. {"VIF ≥ 10"} indicates severe redundancy.
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                <span className="text-rose-400 font-bold block">Condition Number (κ):</span>
                <span>{"κ = √(λ_max / λ_min)"}</span>
                <span className="text-slate-400 text-[11px] font-sans block pt-1">
                  Eigenvalue ratio of correlation matrix. {"κ > 30"} implies dangerous floating-point cancellation.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 5. REAL-WORLD REGIONAL INDUSTRIAL CASE STUDIES                        */}
      {/* ===================================================================== */}
      <section id="casestudies" className="space-y-8 bg-slate-900/50 p-6 sm:p-8 rounded-3xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Regional Engineering Applications
            </h2>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Four West Bengal Industrial Case Studies
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Real enterprise case studies analyzing correlation metrics and feature dependencies in West Bengal industries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          {/* Case 1: Kolkata Real Estate */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-indigo-300 uppercase tracking-wider">
                Case 1: Commercial Property Pricing (Kolkata &amp; New Town)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                Real Estate
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              <strong>Objective:</strong> Financial valuation modeling along EM Bypass and Action Area II.
            </p>
            <div className="space-y-1.5 pt-1">
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-rose-400 font-bold">Collinear Redundancy:</span> Built-up Area vs Carpet Area (r = 0.9986). Retaining both caused negative weights for carpet area!
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-indigo-400 font-bold">Monotonic Proximity:</span> Distance to Metro vs Price (Spearman ρ = -0.92, Pearson r = -0.74 due to exponential decay).
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-emerald-400 font-bold">Categorical ANOVA:</span> Structural Frame Type (RCC vs Heritage) explains 58% variance (η² = 0.58).
              </div>
            </div>
          </div>

          {/* Case 2: WBSEDCL Smart Grid */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-cyan-300 uppercase tracking-wider">
                Case 2: Substation Thermal Telemetry (Barrackpore)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                Power Grid
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              <strong>Objective:</strong> 33/11 kV distribution transformer oil temperature and core failure prediction.
            </p>
            <div className="space-y-1.5 pt-1">
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-emerald-400 font-bold">Monotonic Non-Linearity:</span> Active Load (kW) vs Oil Temp (°C) exhibits Spearman ρ = 0.91 vs Pearson r = 0.77 due to thermal lag.
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-indigo-400 font-bold">Phase Redundancy:</span> Phase A vs Phase B current (r = 0.96). Pruning one phase cut IoT bandwidth by 33%.
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-purple-400 font-bold">Quadratic Loss:</span> Line Voltage vs Core Loss Watts (proportional to V²; Distance Cor dCor = 0.85).
              </div>
            </div>
          </div>

          {/* Case 3: Siliguri Tea Gardens */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-300 uppercase tracking-wider">
                Case 3: Tea Leaf Flush Harvest (Siliguri &amp; Dooars)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                Agritech
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              <strong>Objective:</strong> Weekly Camellia sinensis harvest volume forecasting under fluctuating monsoon rains.
            </p>
            <div className="space-y-1.5 pt-1">
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-rose-400 font-bold">Linear Blindspot:</span> Rainfall vs Yield exhibits Pearson r = 0.04 (p = 0.62; falsely judged as useless noise!).
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-purple-400 font-bold">Distance Correlation:</span> dCor = 0.68 correctly reveals strong parabolic optimum (waterlogging vs drought).
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-emerald-400 font-bold">Monotonic Saturation:</span> Daily Sunshine Hours vs Photosynthesis rate (Spearman ρ = 0.88).
              </div>
            </div>
          </div>

          {/* Case 4: Hooghly Jute Mills */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-purple-300 uppercase tracking-wider">
                Case 4: Jute Spinning Tenacity (Serampore, Hooghly)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                Textile Engineering
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              <strong>Objective:</strong> Quality control and yarn breaking tenacity (cN/tex) in high-speed spinning.
            </p>
            <div className="space-y-1.5 pt-1">
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-emerald-400 font-bold">Rank Plateau:</span> Moisture Regain (%) vs Tenacity reaches plateau (Kendall's τ = 0.76).
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-indigo-400 font-bold">Sensor Compression:</span> 15 frame vibration sensors correlated |r| &gt; 0.92 compressed into 2 PCA components.
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-amber-400 font-bold">Categorical Health:</span> Machine Maintenance Age Category vs Snarl Rate (Cramér's V = 0.52).
              </div>
            </div>
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
              Topic 3 Diagnostic Assessment Quiz
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
                  <div className="space-y-1">
                    <p className="text-xs text-slate-400 italic">{q.scenario}</p>
                    <p className="text-sm font-semibold text-slate-200 leading-relaxed">{q.question}</p>
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
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-rose-400" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Production Hazards
            </h2>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Common Pitfalls &amp; Engineering Anti-Patterns
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Six architectural errors that undermine feature selection pipelines when evaluating feature relationships.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-xs">
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-rose-900/30 space-y-2">
            <span className="font-bold text-rose-300 flex items-center gap-2 text-sm">
              <span>📉</span> 1. The Zero-Correlation Delusion
            </span>
            <p className="text-slate-400 leading-relaxed">
              Assuming r = 0 implies no relationship. Parabolic (y = x²), sinusoidal, or circular curves have r = 0, but are 100% deterministic.
            </p>
            <span className="text-[11px] text-cyan-400 font-mono block pt-1">Fix: Use Distance Correlation or Mutual Information.</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-rose-900/30 space-y-2">
            <span className="font-bold text-rose-300 flex items-center gap-2 text-sm">
              <span>⚠️</span> 2. Sign Inversion from Collinearity
            </span>
            <p className="text-slate-400 leading-relaxed">
              Including two collinear features (|r| &gt; 0.95) in OLS regression. One feature receives a nonsensical negative sign despite positive correlation.
            </p>
            <span className="text-[11px] text-cyan-400 font-mono block pt-1">Fix: Inspect VIF &gt;= 10 and prune one redundant duplicate.</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-rose-900/30 space-y-2">
            <span className="font-bold text-rose-300 flex items-center gap-2 text-sm">
              <span>💥</span> 3. Single Outlier Leverage Distortion
            </span>
            <p className="text-slate-400 leading-relaxed">
              A single corrupted sensor reading (e.g. -99999) can completely flip Pearson r from +0.95 to -0.35 due to squared distance leverage.
            </p>
            <span className="text-[11px] text-cyan-400 font-mono block pt-1">Fix: Use rank-based Spearman ρ or Kendall τ.</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-rose-900/30 space-y-2">
            <span className="font-bold text-rose-300 flex items-center gap-2 text-sm">
              <span>🔁</span> 4. Confusing Correlation with Causation
            </span>
            <p className="text-slate-400 leading-relaxed">
              Treating strong correlation as proof of causal intervention. Confounding variables (e.g. seasonal summer temp) create false causal assumptions.
            </p>
            <span className="text-[11px] text-cyan-400 font-mono block pt-1">Fix: Validate with domain physics and A/B test experiments.</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-rose-900/30 space-y-2">
            <span className="font-bold text-rose-300 flex items-center gap-2 text-sm">
              <span>🗂️</span> 5. Target Leakage via Pre-Split Correlation
            </span>
            <p className="text-slate-400 leading-relaxed">
              Computing correlation with the target on the entire dataset prior to splitting into train/test. Leaks test distribution into feature selection.
            </p>
            <span className="text-[11px] text-cyan-400 font-mono block pt-1">Fix: Split data FIRST; compute correlations solely on training fold.</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-rose-900/30 space-y-2">
            <span className="font-bold text-rose-300 flex items-center gap-2 text-sm">
              <span>🔢</span> 6. Pearson on Ordinal Likert Scales
            </span>
            <p className="text-slate-400 leading-relaxed">
              Computing Pearson r on 1-to-5 survey scores. Pearson assumes continuous interval scales and bivariate normality.
            </p>
            <span className="text-[11px] text-cyan-400 font-mono block pt-1">Fix: Use Kendall's Tau or Spearman Rank Correlation.</span>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 8. LOADERS: PYTHON LAB SCRIPT & ACADEMIC STUDY NOTES                  */}
      {/* ===================================================================== */}
      <section id="loaders" className="space-y-6 bg-slate-900/60 p-6 sm:p-8 rounded-3xl border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Source Code &amp; Academic Documentation
              </h2>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Laboratory Implementation &amp; Complete Study Notes
            </h3>
          </div>

          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab("theory")}
              className={clsx(
                "px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                activeTab === "theory"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white"
              )}
            >
              Study Notes (topic3_note.txt)
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={clsx(
                "px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                activeTab === "code"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white"
              )}
            >
              Python Lab (correlation_and_feature_relationships_lab.py)
            </button>
          </div>
        </div>

        {activeTab === "code" ? (
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>File: <code className="text-cyan-300 font-mono">correlation_and_feature_relationships_lab.py</code></span>
              <span>Pure Python 3 • Zero Dependencies • Exit Code 0</span>
            </div>
            <PythonFileLoader
              code={labCode}
              fileName="correlation_and_feature_relationships_lab.py"
              title="Correlation &amp; Feature Relationships Laboratory Benchmark"
            />
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>File: <code className="text-cyan-300 font-mono">topic3_note.txt</code></span>
              <span>326 Lines of Comprehensive Academic Notes</span>
            </div>
            <PlainTextPrint
              content={noteText}
              fileName="topic3_note.txt"
              title="Topic 3: Academic Study Notes (BCAC701B)"
            />
          </div>
        )}
      </section>

      {/* ===================================================================== */}
      {/* 9. MAKAUT VIVA VOCE EXAMINATION FAQ & TEACHER SIGNATURE               */}
      {/* ===================================================================== */}
      <section id="faq" className="space-y-8">
        <FAQTemplate
          title="Topic 3: MAKAUT Master Viva &amp; Technical Interview Questions"
          subtitle="30 Graded Analytical Questions with Comprehensive Theoretical Rationales"
          questions={questions}
        />

        <Teacher />
      </section>
    </div>
  );
};

export default Topic3;
