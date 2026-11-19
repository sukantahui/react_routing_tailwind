import React, { useState, useId, useMemo } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import labCode from "./topic17_files/standardization_lab.py?raw";
import noteText from "./topic17_files/topic17_note.txt?raw";
import questions from "./topic17_files/topic17_questions.js";

// -----------------------------------------------------------------------------
// HELPER NUMERICAL & STATISTICAL FUNCTIONS
// -----------------------------------------------------------------------------

function computeMeanAndStd(arr) {
  const n = arr.length;
  if (n === 0) return { mean: 0, std: 1 };
  const mean = arr.reduce((a, b) => a + b, 0) / n;
  const variance = arr.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / n;
  return { mean, std: Math.sqrt(variance) || 1.0 };
}

function computeQuantile(sortedArr, q) {
  const n = sortedArr.length;
  if (n === 0) return 0;
  if (n === 1) return sortedArr[0];
  const pos = (n - 1) * q;
  const idx = Math.floor(pos);
  const frac = pos - idx;
  if (idx + 1 < n) {
    return sortedArr[idx] + frac * (sortedArr[idx + 1] - sortedArr[idx]);
  }
  return sortedArr[idx];
}

function computeMedianAndIQR(arr) {
  const sorted = [...arr].sort((a, b) => a - b);
  const q1 = computeQuantile(sorted, 0.25);
  const median = computeQuantile(sorted, 0.5);
  const q3 = computeQuantile(sorted, 0.75);
  const iqr = q3 - q1 || 1.0;
  return { median, q1, q3, iqr };
}

// -----------------------------------------------------------------------------
// MAIN MASTERCLASS COMPONENT
// -----------------------------------------------------------------------------

const Topic17 = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const svgId = useId();

  // Studio Mode: "stress" | "whitening" | "weights"
  const [studioMode, setStudioMode] = useState("stress");

  // Mode A: Outlier Stress Test Controls
  const [outlierHardness, setOutlierHardness] = useState(215.0); // 215 (normal) to 900 (severe slag)

  // Mode B: Covariance Whitening View
  const [whiteningView, setWhiteningView] = useState("raw"); // "raw" | "standardized" | "whitened"

  // Mode C: Regression Weights View
  const [useStandardizedWeights, setUseStandardizedWeights] = useState(true);

  // Jargon Search Query
  const [jargonQuery, setJargonQuery] = useState("");

  // Quiz State
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Mode A Dataset (Asansol Steel Rolling Mill Vickers Hardness HV)
  const baseHardness = [182.0, 188.0, 192.0, 198.0, 202.0, 205.0, 210.0, 215.0, 222.0];

  const activeHardness = useMemo(() => {
    return [...baseHardness, outlierHardness];
  }, [outlierHardness]);

  const stressResults = useMemo(() => {
    // StandardScaler moments
    const { mean, std } = computeMeanAndStd(activeHardness);
    // RobustScaler moments
    const { median, iqr } = computeMedianAndIQR(activeHardness);

    // Scaled coordinates of sample #0 (182.0 HV)
    const sample0 = baseHardness[0];
    const zStd = Number(((sample0 - mean) / std).toFixed(3));
    const zRob = Number(((sample0 - median) / iqr).toFixed(3));

    // Scaled coordinates of the outlier
    const outlierZStd = Number(((outlierHardness - mean) / std).toFixed(3));
    const outlierZRob = Number(((outlierHardness - median) / iqr).toFixed(3));

    return {
      mean: Number(mean.toFixed(1)),
      std: Number(std.toFixed(1)),
      median: Number(median.toFixed(1)),
      iqr: Number(iqr.toFixed(1)),
      zStd,
      zRob,
      outlierZStd,
      outlierZRob,
      isPolluted: outlierHardness > 240.0,
    };
  }, [activeHardness, outlierHardness]);

  // Mode B Dataset: KMRC Tunnel Telemetry (Pressure bar, Vibration Hz)
  const kmrcRaw = [
    { p: 82.0, v: 22.0 },
    { p: 88.0, v: 24.5 },
    { p: 95.0, v: 28.0 },
    { p: 102.0, v: 31.0 },
    { p: 110.0, v: 35.5 },
    { p: 118.0, v: 39.0 },
    { p: 125.0, v: 42.5 },
    { p: 135.0, v: 48.0 },
  ];

  const kmrcTransformed = useMemo(() => {
    // Means and Stds
    const pMom = computeMeanAndStd(kmrcRaw.map((d) => d.p));
    const vMom = computeMeanAndStd(kmrcRaw.map((d) => d.v));

    return kmrcRaw.map((d) => {
      // 1. Raw Centered
      const cp = d.p - pMom.mean;
      const cv = d.v - vMom.mean;

      // 2. Standardized
      const sp = cp / pMom.std;
      const sv = cv / vMom.std;

      // 3. Whitened (De-correlated via PCA projection and eigenvalue scaling)
      // Since r ≈ 0.999, principal axis is along (1, 1)/√2
      const wp = (sp + sv) / Math.sqrt(2 * 1.999);
      const wv = (sp - sv) / Math.sqrt(2 * 0.001); // orthogonal minor axis

      return {
        raw: { x: cp * 0.1, y: cv * 0.2 },
        standardized: { x: sp * 1.2, y: sv * 1.2 },
        whitened: { x: wp * 1.8, y: wv * 1.8 },
      };
    });
  }, []);

  // Mode C Data: Salt Lake FinTech Credit Risk Model Weights
  const regressionFeatures = [
    {
      name: "CIBIL Score (Points)",
      rawUnit: "300 - 900",
      rawWeight: "-0.0007",
      stdWeight: "-0.420",
      rank: 1,
      impact: "Dominant Risk Reducer (-0.420 per 1σ)",
    },
    {
      name: "Debt-to-Income (DTI)",
      rawUnit: "0.10 - 0.75",
      rawWeight: "+2.533",
      stdWeight: "+0.380",
      rank: 2,
      impact: "Major Risk Multiplier (+0.380 per 1σ)",
    },
    {
      name: "Applicant Age (Years)",
      rawUnit: "18 - 65",
      rawWeight: "-0.0035",
      stdWeight: "-0.045",
      rank: 3,
      impact: "Negligible Marginal Effect (-0.045 per 1σ)",
    },
  ];

  // Jargon Glossary
  const jargonList = [
    {
      term: "Z-Score (Standardized Score)",
      def: "The signed fractional number of standard deviations an observation lies above or below the mean: z = (x - μ) / σ.",
      relevance: "Expresses observations in universal standard deviation units, allowing comparison across disparate features.",
    },
    {
      term: "StandardScaler",
      def: "The standard linear transformation centering each feature at mean 0 and scaling to unit variance (N(0, 1)).",
      relevance: "Essential for linear models, regularized regression, and PCA, but vulnerable to extreme outliers.",
    },
    {
      term: "RobustScaler",
      def: "An outlier-resilient scaler that centers by the median and scales by the Interquartile Range (IQR = Q3 - Q1).",
      relevance: "Achieves a 50% breakdown point, ensuring extreme outliers do not corrupt normal feature scaling.",
    },
    {
      term: "Breakdown Point (ε*)",
      def: "The minimum proportion of arbitrarily corrupted observations an estimator can tolerate before yielding invalid estimates.",
      relevance: "Mean and variance have 0% breakdown point; Median and IQR have 50% breakdown point.",
    },
    {
      term: "Covariance Whitening (Sphericization)",
      def: "A multivariate linear transformation Z = Σ^(-1/2) (X - μ) yielding an identity covariance matrix Cov(Z) = I.",
      relevance: "Removes all cross-feature correlations and equalizes orthogonal variances into an isotropic sphere.",
    },
    {
      term: "Standardized Effect Size (β*)",
      def: "Regression coefficient obtained when both features and target are standardized to unit variance.",
      relevance: "Allows direct ranking of feature importance independently of native measurement units.",
    },
    {
      term: "Bessel's Correction",
      def: "Dividing by N - 1 instead of N to obtain an unbiased estimate of population variance from a sample.",
      relevance: "Scikit-learn uses ddof=0 for population scaling, while classical hypothesis testing uses ddof=1.",
    },
    {
      term: "Outlier Masking Pathology",
      def: "When an extreme outlier inflates the sample standard deviation, shrinking the Z-scores of all clean samples toward zero.",
      relevance: "Blinds 3-sigma anomaly detectors from identifying true defects.",
    },
    {
      term: "Isotropic Covariance",
      def: "A geometric state where variance is identical in all orthogonal directions with zero cross-correlation.",
      relevance: "Guarantees that gradient descent steps point directly to the optimal parameter minimum.",
    },
    {
      term: "Correlation Matrix Decomposition",
      def: "The mathematical proof that Principal Component Analysis on standardized data diagonalizes the correlation matrix R.",
      relevance: "Prevents features with large raw variances from monopolizing the first principal component.",
    },
    {
      term: "Sparse Density Explosion",
      def: "The conversion of a compact sparse matrix into a dense matrix when StandardScaler with with_mean=True subtracts the mean.",
      relevance: "Must be avoided on text/sparse data by setting with_mean=False or using MaxAbsScaler.",
    },
    {
      term: "Zero-Variance Feature Guard",
      def: "Defensive logic to prevent division by zero when standardizing constant features where σ = 0.",
      relevance: "Must be filtered out using VarianceThreshold prior to running scaling pipelines.",
    },
  ];

  const filteredJargon = jargonList.filter(
    (item) =>
      item.term.toLowerCase().includes(jargonQuery.toLowerCase()) ||
      item.def.toLowerCase().includes(jargonQuery.toLowerCase())
  );

  // Diagnostic Quiz Questions
  const diagnosticQuestions = [
    questions[0], // Q1: Definition
    questions[1], // Q2: Moments (0, 1)
    questions[3], // Q4: Breakdown point 0%
    questions[4], // Q5: RobustScaler 50%
    questions[5], // Q6: Skewness linearity fallacy
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
              BCAC701B • Data Types and Preprocessing • Topic 17
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Academic Core
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Z-Score, RobustScaler &amp; Whitening
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/40 rounded-full">
              MAKAUT Aligned
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Standardization
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-indigo-200/90 font-medium max-w-3xl">
            Z-Score Normalization, RobustScaler (Median/IQR), Covariance Sphericization, and Standardized Effect Sizes
          </p>

          <p className="text-xs sm:text-sm text-slate-300 max-w-4xl leading-relaxed">
            Master the mathematical mechanics of centering features to zero mean and scaling to unit variance. Understand why Z-scores do not alter distribution skewness, discover how RobustScaler protects against outlier breakdown with a 50% breakdown point, explore multivariate covariance whitening, and unlock direct effect-size ranking for West Bengal industrial pipelines.
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
              🎓
            </div>
            <h3 className="text-base font-bold text-white">The University Grading Curve</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              On a brutal calculus exam, the class average is 45/100 (σ = 10). A student scoring 65 (+2σ) is in the top 2.5% of the university! On an easy exam with average 85 (σ = 5), scoring 65 (-4σ) is failing. Standardization translates raw scores into universal standard deviations from average.
            </p>
          </div>

          <div className="bg-slate-900/90 p-6 rounded-2xl border border-cyan-900/40 shadow-xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-lg border border-cyan-500/40">
              🛡️
            </div>
            <h3 className="text-base font-bold text-white">The Barometer vs. The Lightning Strike</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              A weather station tracks daily temperature (25°C–35°C). Suddenly, lightning strikes the probe, registering 5,000°C! Calculating the classical mean and standard deviation makes the whole week look like an active volcano. RobustScaler uses the median and middle 50% (IQR)—the lightning spike is ignored and the true climate trend remains crystal clear.
            </p>
          </div>

          <div className="bg-slate-900/90 p-6 rounded-2xl border border-emerald-900/40 shadow-xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg border border-emerald-500/40">
              🧶
            </div>
            <h3 className="text-base font-bold text-white">The Tangled Puppet Strings (Whitening)</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Two marionette puppet strings (e.g. motor hydraulic pressure and vibration) are knotted together: moving one jerks the other. Standardizing individual strings adjusts their lengths, but they still pull each other diagonally. Covariance Whitening untangles the strings into independent, orthogonal controls so each feature operates in pure spherical freedom.
            </p>
          </div>
        </div>

        {/* TAXONOMY COMPARISON TABLE */}
        <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span>📊</span> Architectural Taxonomy: StandardScaler vs. RobustScaler vs. Rescalers
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider bg-slate-950/60">
                  <th className="p-3">Scaler Technique</th>
                  <th className="p-3">Centering Metric</th>
                  <th className="p-3">Scaling Metric</th>
                  <th className="p-3">Breakdown Point</th>
                  <th className="p-3">Bounded?</th>
                  <th className="p-3">Sparse CSR Safe?</th>
                  <th className="p-3">Primary ML Applications</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-semibold text-indigo-300">StandardScaler</td>
                  <td className="p-3">Mean (μ)</td>
                  <td className="p-3">Standard Deviation (σ)</td>
                  <td className="p-3 text-rose-400 font-bold">0% (Vulnerable)</td>
                  <td className="p-3">No (-∞, +∞)</td>
                  <td className="p-3 text-rose-400">No (with_mean=True)</td>
                  <td className="p-3">Ridge/Lasso, PCA, OLS, Logistic, SVM</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-semibold text-emerald-300">RobustScaler</td>
                  <td className="p-3">Median (Q2)</td>
                  <td className="p-3">Interquartile Range (IQR)</td>
                  <td className="p-3 text-emerald-400 font-bold">50% (High Resilience)</td>
                  <td className="p-3">No (-∞, +∞)</td>
                  <td className="p-3 text-rose-400">No</td>
                  <td className="p-3">Heavy-Tailed Data, Sensor Spikes, Fraud Data</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-semibold text-cyan-300">MinMaxScaler</td>
                  <td className="p-3">Minimum (x_min)</td>
                  <td className="p-3">Range (x_max - x_min)</td>
                  <td className="p-3 text-rose-400 font-bold">0% (Catastrophic)</td>
                  <td className="p-3 text-cyan-300 font-mono">[0, 1]</td>
                  <td className="p-3 text-rose-400">No</td>
                  <td className="p-3">Image Pixels [0, 255], Neural Net Activations</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-semibold text-purple-300">Covariance Whitening</td>
                  <td className="p-3">Mean Vector (μ)</td>
                  <td className="p-3">Inv Covariance Σ^(-1/2)</td>
                  <td className="p-3">0% (Spectral)</td>
                  <td className="p-3">No (-∞, +∞)</td>
                  <td className="p-3 text-rose-400">No</td>
                  <td className="p-3">De-correlation, KMRC Telemetry, Signal Processing</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* SEARCHABLE JARGON BUSTER */}
        <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>📖</span> Searchable Jargon Buster (12 Standardization Terms)
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
          {/* Z SCORE FORMULA */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-indigo-900/40 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-indigo-300 flex items-center gap-2">
              <span>📐</span> 1. Classical Z-Score Transformation Proof
            </h3>
            <div className="bg-slate-950 p-4 rounded-xl border border-indigo-950 font-mono text-xs text-indigo-200 overflow-x-auto space-y-2">
              <div>{"z_i = (x_i - μ) / σ"}</div>
              <div>{"E[z] = (E[x] - μ) / σ = (μ - μ) / σ = 0.0"}</div>
              <div>{"Var(z) = (1 / σ²) * Var(x) = σ² / σ² = 1.0"}</div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Guarantees zero mean and unit variance. Because it is a strictly linear affine transformation (z = a*x + b), standardized features retain the exact skewness and kurtosis of the original feature.
            </p>
          </div>

          {/* ROBUST SCALER */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-emerald-900/40 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-emerald-300 flex items-center gap-2">
              <span>🛡️</span> 2. RobustScaler (Median &amp; IQR Formulation)
            </h3>
            <div className="bg-slate-950 p-4 rounded-xl border border-emerald-950 font-mono text-xs text-emerald-200 overflow-x-auto space-y-2">
              <div>{"x_robust = (x - Q_2) / (Q_3 - Q_1) = (x - Median) / IQR"}</div>
              <div>{"Gaussian Alignment: IQR ≈ 1.349 * σ"}</div>
              <div>{"Breakdown Point: ε* = 50% (Order Statistics)"}</div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Centers data at the median (Q2) and scales by the Interquartile Range. Unlike the sample mean and variance (0% breakdown point), up to 50% of the dataset can be extreme outliers without corrupting the scaler parameters.
            </p>
          </div>

          {/* COVARIANCE WHITENING */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-cyan-900/40 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-cyan-300 flex items-center gap-2">
              <span>🌐</span> 3. Covariance Whitening (Sphericization)
            </h3>
            <div className="bg-slate-950 p-4 rounded-xl border border-cyan-950 font-mono text-xs text-cyan-200 overflow-x-auto space-y-2">
              <div>{"Z_white = Σ^(-1/2) * (X - μ)"}</div>
              <div>{"Cov(Z_white) = Σ^(-1/2) * Σ * Σ^(-1/2) = I_d"}</div>
              <div>{"Spectral: Z_PCA = Λ^(-1/2) * Vᵀ * (X - μ)"}</div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Univariate standardization scales axes independently, leaving cross-feature correlations intact. Covariance whitening multiplies by Σ^(-1/2), forcing the entire multivariate covariance matrix to equal the identity matrix I.
            </p>
          </div>

          {/* CORRELATION MATRIX DECOMPOSITION */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-purple-900/40 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-purple-300 flex items-center gap-2">
              <span>📊</span> 4. PCA on Standardized Features Proof
            </h3>
            <div className="bg-slate-950 p-4 rounded-xl border border-purple-950 font-mono text-xs text-purple-200 overflow-x-auto space-y-2">
              <div>{"Let Z = X * D^(-1),  where D = diag(σ_1, ..., σ_d)"}</div>
              <div>{"Σ_Z = (1/n) Zᵀ Z = D^(-1) [ (1/n) Xᵀ X ] D^(-1)"}</div>
              <div>{"Σ_Z = D^(-1) * Σ * D^(-1) = R   (Correlation Matrix)"}</div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Proves that PCA on standardized data diagonalizes the Pearson correlation matrix R. This guarantees that high-variance measurement units cannot artificially hijack the dominant principal components.
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
              3. Interactive Standardization Studio
            </h2>
          </div>
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
            {[
              { id: "stress", label: "Mode A: Outlier Breakdown Test" },
              { id: "whitening", label: "Mode B: Covariance Whitening" },
              { id: "weights", label: "Mode C: Regression Effect Sizes" },
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
        {/* MODE A: OUTLIER BREAKDOWN STRESS TEST */}
        {/* --------------------------------------------------------------- */}
        {studioMode === "stress" && (
          <div className="bg-slate-900/90 p-6 rounded-3xl border border-indigo-900/40 shadow-2xl space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* SLIDER & CONTROLS */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Industrial Hardness Slag Defect
                </h3>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Sample #9 Hardness (HV):</span>
                    <span className={clsx("font-mono font-bold text-sm", stressResults.isPolluted ? "text-rose-400" : "text-emerald-400")}>
                      {outlierHardness.toFixed(0)} HV
                    </span>
                  </div>
                  <input
                    type="range"
                    min="215.0"
                    max="900.0"
                    step="15.0"
                    value={outlierHardness}
                    onChange={(e) => setOutlierHardness(parseFloat(e.target.value))}
                    className="w-full accent-rose-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>215 HV (Normal Batch)</span>
                    <span>900 HV (Extreme Slag Defect)</span>
                  </div>
                </div>

                {/* PRESETS */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    onClick={() => setOutlierHardness(215.0)}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-950/80 border border-emerald-500 text-emerald-300 hover:bg-emerald-900 cursor-pointer"
                  >
                    ✔ Clean Batch (215 HV)
                  </button>
                  <button
                    onClick={() => setOutlierHardness(450.0)}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-950/80 border border-amber-500 text-amber-300 hover:bg-amber-900 cursor-pointer"
                  >
                    ⚡ Moderate Slag (450 HV)
                  </button>
                  <button
                    onClick={() => setOutlierHardness(850.0)}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-rose-950/80 border border-rose-500 text-rose-300 hover:bg-rose-900 cursor-pointer"
                  >
                    🚨 Severe Slag Defect (850 HV)
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-2">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span>💡</span> Breakdown Point Insight:
                  </div>
                  <p>
                    {stressResults.isPolluted ? (
                      <span className="text-rose-300">
                        Notice how the single {outlierHardness.toFixed(0)} HV defect inflated the standard deviation from 12.3 HV to <strong>{stressResults.std} HV</strong> (a {(stressResults.std / 12.3).toFixed(1)}x blowup)! StandardScaler&apos;s center shifted by {(stressResults.mean - 201.6).toFixed(1)} HV. Meanwhile, RobustScaler&apos;s median and IQR remained rock-solid!
                      </span>
                    ) : (
                      <span className="text-emerald-300">
                        On clean data, both StandardScaler and RobustScaler capture the true distribution cleanly.
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {/* STAT COMPARISON CARDS */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Fitted Moments Comparison
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  {/* StandardScaler Card */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-indigo-900/60 space-y-2">
                    <div className="text-xs font-bold text-indigo-300 flex items-center justify-between">
                      <span>StandardScaler</span>
                      <span className="text-[10px] text-rose-400">0% Breakdown</span>
                    </div>
                    <div className="space-y-1 text-xs font-mono">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Mean (μ):</span>
                        <span className={clsx("font-bold", stressResults.isPolluted ? "text-rose-400" : "text-white")}>
                          {stressResults.mean} HV
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">StDev (σ):</span>
                        <span className={clsx("font-bold", stressResults.isPolluted ? "text-rose-400" : "text-white")}>
                          {stressResults.std} HV
                        </span>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-slate-800 text-cyan-300">
                        <span>Sample #0 Z:</span>
                        <span className="font-bold">{stressResults.zStd}</span>
                      </div>
                    </div>
                  </div>

                  {/* RobustScaler Card */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-emerald-900/60 space-y-2">
                    <div className="text-xs font-bold text-emerald-300 flex items-center justify-between">
                      <span>RobustScaler</span>
                      <span className="text-[10px] text-emerald-400">50% Breakdown</span>
                    </div>
                    <div className="space-y-1 text-xs font-mono">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Median (Q2):</span>
                        <span className="font-bold text-emerald-400">{stressResults.median} HV</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">IQR (Q3-Q1):</span>
                        <span className="font-bold text-emerald-400">{stressResults.iqr} HV</span>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-slate-800 text-emerald-300">
                        <span>Sample #0 Z:</span>
                        <span className="font-bold">{stressResults.zRob}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-white">Tracking Clean Sample #0 (182.0 HV):</div>
                  <div className="text-xs text-slate-300 leading-relaxed">
                    Under clean conditions, 182 HV sits at z = -1.60. But when the slag outlier is injected:
                    <ul className="list-disc list-inside pt-1 space-y-1 text-slate-400 font-mono text-[11px]">
                      <li>StandardScaler Z shifts to <strong className="text-rose-400">{stressResults.zStd}</strong> (Variance masking: clean sample appears near zero!)</li>
                      <li>RobustScaler Z stays at <strong className="text-emerald-400">{stressResults.zRob}</strong> (Preserved resolution!)</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* VISUAL DOT PLOT */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Distribution Spread on Scaled Axis
                </h3>
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between h-64">
                  <div className="text-[11px] text-slate-400 pb-1">
                    StandardScaler Spread: [-3.0 to +3.0 σ]
                  </div>

                  {/* SVG Dot Axis */}
                  <svg className="w-full h-36" viewBox="-4 -2 8 4">
                    {/* Zero Line */}
                    <line x1="0" y1="-1.5" x2="0" y2="1.5" stroke="#334155" strokeWidth="0.08" strokeDasharray="0.1,0.1" />
                    {/* Axis */}
                    <line x1="-3.5" y1="0" x2="3.5" y2="0" stroke="#475569" strokeWidth="0.06" />

                    {/* Clean Samples */}
                    {baseHardness.map((val, idx) => {
                      const z = (val - stressResults.mean) / stressResults.std;
                      return (
                        <circle
                          key={idx}
                          cx={Math.max(-3.4, Math.min(3.4, z))}
                          cy="0"
                          r="0.18"
                          fill="#38bdf8"
                          opacity="0.8"
                          className="transition-all duration-300"
                        />
                      );
                    })}

                    {/* Outlier Dot */}
                    <circle
                      cx={Math.max(-3.4, Math.min(3.4, stressResults.outlierZStd))}
                      cy="0"
                      r="0.25"
                      fill="#f43f5e"
                      className="transition-all duration-300"
                    />
                  </svg>

                  <div className="flex justify-between text-[10px] text-slate-500 font-mono border-t border-slate-800 pt-2">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-sky-400 inline-block" /> Clean Samples
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" /> Slag Outlier (z={stressResults.outlierZStd})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --------------------------------------------------------------- */}
        {/* MODE B: COVARIANCE WHITENING LAB */}
        {/* --------------------------------------------------------------- */}
        {studioMode === "whitening" && (
          <div className="bg-slate-900/90 p-6 rounded-3xl border border-indigo-900/40 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>🌐</span> KMRC Tunnel Bore Telemetry: Covariance Whitening (Sphericization)
                </h3>
                <p className="text-xs text-slate-400">
                  Observe how Hydraulic Pressure and Vibration Frequency transform from a narrow collinear ellipse into an isotropic sphere.
                </p>
              </div>

              <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
                {[
                  { id: "raw", label: "1. Raw Correlated (r=0.999)" },
                  { id: "standardized", label: "2. Univariate Standardized" },
                  { id: "whitened", label: "3. Covariance Whitened (I)" },
                ].map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setWhiteningView(v.id)}
                    className={clsx(
                      "px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer",
                      whiteningView === v.id
                        ? "bg-cyan-600 text-white shadow"
                        : "text-slate-400 hover:text-white"
                    )}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 2D SCATTER PLOT */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col items-center justify-center">
                <svg className="w-full h-64" viewBox="-5 -5 10 10">
                  {/* Grid Lines */}
                  <line x1="-4.5" y1="0" x2="4.5" y2="0" stroke="#334155" strokeWidth="0.05" />
                  <line x1="0" y1="-4.5" x2="0" y2="4.5" stroke="#334155" strokeWidth="0.05" />

                  {/* Level Curve Ellipse / Circle */}
                  {whiteningView === "raw" && (
                    <ellipse
                      cx="0"
                      cy="0"
                      rx="4.0"
                      ry="0.5"
                      transform="rotate(-45)"
                      fill="#6366f1"
                      fillOpacity="0.1"
                      stroke="#6366f1"
                      strokeWidth="0.08"
                    />
                  )}
                  {whiteningView === "standardized" && (
                    <ellipse
                      cx="0"
                      cy="0"
                      rx="3.2"
                      ry="0.6"
                      transform="rotate(-45)"
                      fill="#06b6d4"
                      fillOpacity="0.1"
                      stroke="#06b6d4"
                      strokeWidth="0.08"
                    />
                  )}
                  {whiteningView === "whitened" && (
                    <circle
                      cx="0"
                      cy="0"
                      r="2.8"
                      fill="#10b981"
                      fillOpacity="0.15"
                      stroke="#10b981"
                      strokeWidth="0.08"
                    />
                  )}

                  {/* Data Points */}
                  {kmrcTransformed.map((pt, i) => {
                    const coords = pt[whiteningView];
                    return (
                      <circle
                        key={i}
                        cx={coords.x}
                        cy={-coords.y}
                        r="0.22"
                        fill={
                          whiteningView === "whitened"
                            ? "#10b981"
                            : whiteningView === "standardized"
                            ? "#06b6d4"
                            : "#818cf8"
                        }
                        className="transition-all duration-300"
                      />
                    );
                  })}
                </svg>

                <div className="flex justify-between w-full text-[10px] text-slate-500 font-mono pt-2 border-t border-slate-800">
                  <span>Axis X: Component 1</span>
                  <span className="text-cyan-400 font-bold">
                    {whiteningView === "whitened" ? "Covariance = Identity I" : "Correlation r ≈ 0.999"}
                  </span>
                  <span>Axis Y: Component 2</span>
                </div>
              </div>

              {/* COVARIANCE MATRIX & EXPLANATION */}
              <div className="space-y-4">
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                  <div className="text-xs font-bold text-white flex justify-between">
                    <span>Multivariate Covariance Matrix:</span>
                    <span className="font-mono text-cyan-300 uppercase">{whiteningView}</span>
                  </div>

                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-xs text-indigo-200">
                    {whiteningView === "raw" && (
                      <div className="space-y-1">
                        <div>{"[[ 341.8,  167.4 ],"}</div>
                        <div>{" [ 167.4,   82.1 ]]"}</div>
                        <div className="text-[10px] text-amber-400 pt-1">Condition number κ &gt; 1,000 (Extreme Collinearity)</div>
                      </div>
                    )}
                    {whiteningView === "standardized" && (
                      <div className="space-y-1">
                        <div>{"[[ 1.000,  0.999 ],"}</div>
                        <div>{" [ 0.999,  1.000 ]]"}</div>
                        <div className="text-[10px] text-amber-400 pt-1">Variances = 1.0, but Correlation r = 0.999 still remains!</div>
                      </div>
                    )}
                    {whiteningView === "whitened" && (
                      <div className="space-y-1 text-emerald-300">
                        <div>{"[[ 1.000,  0.000 ],"}</div>
                        <div>{" [ 0.000,  1.000 ]]"}</div>
                        <div className="text-[10px] text-emerald-400 pt-1">✔ Covariance is now Identity I! Perfect isotropic sphere!</div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-2">
                  <div className="font-bold text-white">Why Whitening is Necessary:</div>
                  <p>
                    StandardScaler scales each column independently—it cannot remove correlations between features. Because pressure and vibration are 99.9% correlated, any Euclidean distance metric collapses along the diagonal. Covariance Whitening rotates the coordinate frame using eigenvectors V and scales by Λ^(-1/2), allowing anomaly detectors to catch subtle subterranean void leaks!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --------------------------------------------------------------- */}
        {/* MODE C: REGRESSION EFFECT SIZES */}
        {/* --------------------------------------------------------------- */}
        {studioMode === "weights" && (
          <div className="bg-slate-900/90 p-6 rounded-3xl border border-indigo-900/40 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>⚖️</span> FinTech Credit Scoring: Unstandardized vs. Standardized Weights
                </h3>
                <p className="text-xs text-slate-400">
                  See why unstandardized coefficients mislead loan underwriters, whereas standardized effect sizes allow direct legal ranking for RBI compliance.
                </p>
              </div>

              <button
                onClick={() => setUseStandardizedWeights((prev) => !prev)}
                className={clsx(
                  "px-4 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer",
                  useStandardizedWeights
                    ? "bg-emerald-950 border-emerald-500 text-emerald-200 shadow-md"
                    : "bg-amber-950 border-amber-500 text-amber-200 shadow-md"
                )}
              >
                {useStandardizedWeights ? "✔ Standardized Effect Sizes (Rankable)" : "⚠️ Raw Unstandardized Weights (Misleading)"}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {regressionFeatures.map((feat) => {
                const weight = useStandardizedWeights ? feat.stdWeight : feat.rawWeight;
                const absWeight = Math.abs(parseFloat(weight));

                return (
                  <div
                    key={feat.rank}
                    className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 shadow-xl"
                  >
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-white">{feat.name}</span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-900 text-slate-400 font-mono text-[10px]">
                        Rank #{feat.rank}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-400">
                      Native Physical Range: <span className="font-mono text-cyan-300">{feat.rawUnit}</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                      <div className="text-[10px] text-slate-500 uppercase">
                        {useStandardizedWeights ? "Standardized Coefficient (β*)" : "Raw Unscaled Coefficient (β)"}
                      </div>
                      <div className={clsx("text-xl font-bold font-mono", parseFloat(weight) < 0 ? "text-cyan-400" : "text-rose-400")}>
                        {weight}
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-300 leading-relaxed pt-1">
                      {feat.impact}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
              {!useStandardizedWeights ? (
                <p className="text-amber-300">
                  ⚠️ <strong>Underwriter Illusion:</strong> Looking at raw coefficients, Debt-to-Income (+2.533) appears 3,600 times more influential than CIBIL Score (-0.0007), simply because DTI is measured in decimals while CIBIL is counted in hundreds!
                </p>
              ) : (
                <p className="text-emerald-300">
                  ✔ <strong>True Effect Sizes:</strong> After standardizing all features to unit variance, CIBIL Score (-0.420) is revealed as the single most powerful predictor of loan default risk, followed closely by DTI (+0.380), while Age (-0.045) is negligible!
                </p>
              )}
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
            <h3 className="text-base font-bold text-white">Credit Risk Standardized Effect Sizes for RBI Audits</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              A Sector V FinTech lending platform trained Logistic Regression to evaluate personal loan approvals. Raw unstandardized regression weights could not be compared to prove non-discriminatory lending practices. Standardizing continuous features enabled direct ranking of standardized coefficients (Beta_CIBIL = -0.42, Beta_DTI = +0.38), satisfying Reserve Bank of India model audit criteria.
            </p>
          </div>

          {/* CASE 2 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-cyan-900/40 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-500/40">
                Subway Infrastructure
              </span>
              <span className="text-xs text-slate-400">KMRC East-West Metro (Hooghly River)</span>
            </div>
            <h3 className="text-base font-bold text-white">Tunnel Boring Telemetry &amp; Covariance Whitening</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Tunnel Boring Machines operating under heritage buildings in central Kolkata experienced 99.9% correlation between hydraulic thrust pressure (bar) and motor vibration (Hz). Univariate standardization left the collinearity intact. Applying Covariance Whitening de-coupled the sensor streams, detecting subterranean water seepage voids 3.5 hours before surface subsidence.
            </p>
          </div>

          {/* CASE 3 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-amber-900/40 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 rounded-full border border-amber-500/40">
                Steel Metallurgy
              </span>
              <span className="text-xs text-slate-400">Asansol–Durgapur Steel Rolling Belt</span>
            </div>
            <h3 className="text-base font-bold text-white">Vickers Hardness Defect Testing &amp; RobustScaler</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Structural steel rolling mills in Durgapur test Vickers Hardness (180–225 HV). Microscopic slag inclusions occasionally spiked readings to 850 HV, inflating StandardScaler&apos;s standard deviation 15-fold and blinding quality classifiers. Switching to RobustScaler (Median and IQR) leveraged its 50% breakdown point to isolate defects without corrupting calibration.
            </p>
          </div>

          {/* CASE 4 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-emerald-900/40 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/40">
                Environmental Science
              </span>
              <span className="text-xs text-slate-400">West Bengal Pollution Control Board</span>
            </div>
            <h3 className="text-base font-bold text-white">Urban Winter Smog Multi-Pollutant K-Means Clustering</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              WBPCB monitors PM2.5, PM10, SO2, and NO2 across Kolkata. Winter inversion smogs spike PM10 to 450 μg/m³ while toxic SO2 remains at 12 μg/m³. Unstandardized K-Means clustered monitoring stations purely by particulate dust. Standardizing all gaseous and particulate pollutants allowed K-Means to identify hazardous chemical emission plumes independently of dust.
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
            <h4 className="text-sm font-bold text-white">Fitting on Combined Datasets</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Never call scaler.fit() on the entire dataset. Always call scaler.fit(X_train) and transform validation and live production payloads with frozen training moments (μ, σ).
            </p>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-rose-900/40 space-y-3">
            <div className="text-rose-400 font-bold text-xs flex items-center gap-2">
              <span>⚠️</span> Pitfall 2: Sparse CSR Density Blowup
            </div>
            <h4 className="text-sm font-bold text-white">Centering High-D Sparse Matrices</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              StandardScaler(with_mean=True) converts implicit zeros into non-zero floats (-μ), turning a 50MB sparse matrix into a 32GB dense array and crashing servers. Use with_mean=False or MaxAbsScaler.
            </p>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-rose-900/40 space-y-3">
            <div className="text-rose-400 font-bold text-xs flex items-center gap-2">
              <span>⚠️</span> Pitfall 3: The Normality Fallacy
            </div>
            <h4 className="text-sm font-bold text-white">Believing Z-Scores Make Data Gaussian</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Standardization is linear: z = a*x + b. It preserves exact relative spacing, skewness, and kurtosis. If your data is skewed, Z-score will NOT make it Gaussian; use Box-Cox or Yeo-Johnson.
            </p>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-amber-900/40 space-y-3">
            <div className="text-amber-400 font-bold text-xs flex items-center gap-2">
              <span>⚠️</span> Pitfall 4: Correlation Blindness
            </div>
            <h4 className="text-sm font-bold text-white">Univariate Scaling Leaves Collinearity Intact</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              StandardScaler equalizes individual variances to 1.0, but does not alter correlation coefficients r_xy. If features are collinear, deploy PCA or Covariance Whitening.
            </p>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-amber-900/40 space-y-3">
            <div className="text-amber-400 font-bold text-xs flex items-center gap-2">
              <span>⚠️</span> Pitfall 5: Standardizing Binary Columns
            </div>
            <h4 className="text-sm font-bold text-white">Centering 0/1 Dummy Columns</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Do not apply StandardScaler to binary indicator columns. Centering converts 0/1 into arbitrary floats (-0.35, +2.41), destroying interpretability. Use ColumnTransformer to passthrough one-hot columns.
            </p>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-emerald-900/40 space-y-3">
            <div className="text-emerald-400 font-bold text-xs flex items-center gap-2">
              <span>✔</span> Best Practice: Pipeline Serialization
            </div>
            <h4 className="text-sm font-bold text-white">Bundle Scaler &amp; Estimator Together</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Package scalers and models into a single Scikit-Learn Pipeline or ONNX graph so inference requests cannot accidentally bypass standardization before reaching model weights.
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
          <PlainTextPrint content={noteText} filename="Topic17_Standardization_Notes.txt" />
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
            8. Pure Python Laboratory: Standardization &amp; Whitening Engines
          </h2>
        </div>
        <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-xl">
          <PythonFileLoader
            code={labCode}
            filename="standardization_lab.py"
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

export default Topic17;
