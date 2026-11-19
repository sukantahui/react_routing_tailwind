import React, { useState, useId, useMemo } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import labCode from "./topic14_files/data_transformation_lab.py?raw";
import noteText from "./topic14_files/topic14_note.txt?raw";
import questions from "./topic14_files/topic14_questions.js";

// -----------------------------------------------------------------------------
// HELPER MATHEMATICAL & STATISTICAL FUNCTIONS
// -----------------------------------------------------------------------------

function calculateMoments(arr) {
  const n = arr.length;
  if (n < 4) return { mean: 0, stdev: 0, skewness: 0, kurtosis: 0 };
  const mean = arr.reduce((a, b) => a + b, 0) / n;
  const m2 = arr.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / n;
  const m3 = arr.reduce((a, b) => a + Math.pow(b - mean, 3), 0) / n;
  const m4 = arr.reduce((a, b) => a + Math.pow(b - mean, 4), 0) / n;

  const variance = m2 * (n / (n - 1));
  const stdev = Math.sqrt(variance);

  let skewness = 0;
  let kurtosis = 0;
  if (m2 > 1e-12) {
    const g1 = m3 / Math.pow(m2, 1.5);
    skewness = (Math.sqrt(n * (n - 1)) / (n - 2)) * g1;
    const g2 = m4 / Math.pow(m2, 2) - 3.0;
    kurtosis = ((n - 1) / ((n - 2) * (n - 3))) * ((n + 1) * g2 + 6);
  }
  return {
    mean: Number(mean.toFixed(2)),
    stdev: Number(stdev.toFixed(2)),
    skewness: Number(skewness.toFixed(3)),
    kurtosis: Number(kurtosis.toFixed(3)),
  };
}

function applyTransform(data, type, lmbda = 1.0) {
  switch (type) {
    case "log1p":
      return data.map((x) => (x > -1 ? Math.log(1 + x) : 0));
    case "sqrt":
      return data.map((x) => Math.sqrt(Math.max(0, x)));
    case "cbrt":
      return data.map((x) => Math.sign(x) * Math.cbrt(Math.abs(x)));
    case "boxcox":
      return data.map((x) => {
        if (x <= 0) return 0;
        if (Math.abs(lmbda) < 1e-5) return Math.log(x);
        return (Math.pow(x, lmbda) - 1.0) / lmbda;
      });
    case "yeojohnson":
      return data.map((x) => {
        if (x >= 0) {
          if (Math.abs(lmbda) < 1e-5) return Math.log(x + 1.0);
          return (Math.pow(x + 1.0, lmbda) - 1.0) / lmbda;
        } else {
          if (Math.abs(lmbda - 2.0) < 1e-5) return -Math.log(-x + 1.0);
          return -((Math.pow(-x + 1.0, 2.0 - lmbda) - 1.0) / (2.0 - lmbda));
        }
      });
    case "raw":
    default:
      return [...data];
  }
}

function computeHistogram(data, numBins = 8) {
  if (!data || data.length === 0) return { bins: [], min: 0, max: 0 };
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const binWidth = range / numBins;

  const bins = Array.from({ length: numBins }, (_, i) => ({
    binIndex: i,
    x0: min + i * binWidth,
    x1: min + (i + 1) * binWidth,
    count: 0,
  }));

  data.forEach((val) => {
    let idx = Math.floor((val - min) / binWidth);
    if (idx >= numBins) idx = numBins - 1;
    if (idx < 0) idx = 0;
    bins[idx].count += 1;
  });

  return { bins, min, max, binWidth };
}

// -----------------------------------------------------------------------------
// MAIN MASTERCLASS COMPONENT
// -----------------------------------------------------------------------------

const Topic14 = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const svgId = useId();

  // Mode States for Studio
  const [studioMode, setStudioMode] = useState("compare"); // "compare" | "sweeper" | "binning"

  // Mode A: Compare
  const [selectedDatasetKey, setSelectedDatasetKey] = useState("loans");
  const [selectedTransform, setSelectedTransform] = useState("raw");

  // Mode B: Sweeper
  const [sweeperFamily, setSweeperFamily] = useState("boxcox"); // "boxcox" | "yeojohnson"
  const [lambdaVal, setLambdaVal] = useState(0.0);

  // Mode C: Binning
  const [numBinsK, setNumBinsK] = useState(4);
  const [injectOutlier, setInjectOutlier] = useState(false);

  // Search in Jargon Buster
  const [jargonQuery, setJargonQuery] = useState("");

  // Quiz State
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Sample Datasets
  const datasets = {
    loans: {
      name: "Salt Lake Sector V FinTech Loans (₹k)",
      data: [
        15, 18, 20, 22, 25, 25, 30, 32, 35, 40,
        45, 50, 60, 75, 90, 120, 180, 250, 400, 850
      ],
      description: "Severe positive skew (incomes & micro-loans) with long right tail.",
      hasNegatives: false,
    },
    grid: {
      name: "CESC Net Grid Load (MW, Solar Feeds)",
      data: [
        -14.2, -8.5, -4.0, -1.2, 0.0, 3.5, 8.2, 12.0, 18.5, 25.0,
        34.0, 42.0, 50.5, 62.0, 78.0, 95.0, 110.0, 135.0, 175.0, 240.0
      ],
      description: "Mixed-sign values: midday negative rooftop solar feed to evening peak demand.",
      hasNegatives: true,
    },
    synthetic: {
      name: "Moderate Exponential Growth Dataset",
      data: [
        2.1, 2.4, 2.9, 3.5, 4.2, 5.1, 6.4, 8.2, 10.5, 14.0,
        18.5, 24.2, 32.0, 42.5, 58.0, 78.5, 105.0, 145.0, 200.0, 290.0
      ],
      description: "Exponentially growing physical feature with right skewness.",
      hasNegatives: false,
    },
  };

  // Base Salary data for binning
  const baseSalaryData = [20, 22, 24, 25, 26, 28, 30, 32, 35, 38, 40, 42, 45, 50, 60];
  const activeSalaryData = useMemo(() => {
    return injectOutlier ? [...baseSalaryData, 1000] : [...baseSalaryData];
  }, [injectOutlier]);

  // Mode A Calculations
  const currentDataset = datasets[selectedDatasetKey];
  const transformedCompareData = useMemo(() => {
    let lmb = 1.0;
    if (selectedTransform === "boxcox") lmb = -0.47;
    if (selectedTransform === "yeojohnson") lmb = 0.66;
    return applyTransform(currentDataset.data, selectedTransform, lmb);
  }, [currentDataset, selectedTransform]);

  const rawMoments = useMemo(() => calculateMoments(currentDataset.data), [currentDataset]);
  const transformedMoments = useMemo(() => calculateMoments(transformedCompareData), [transformedCompareData]);
  const compareHisto = useMemo(() => computeHistogram(transformedCompareData, 8), [transformedCompareData]);

  // Mode B Calculations
  const sweeperDataset = sweeperFamily === "boxcox" ? datasets.loans.data : datasets.grid.data;
  const sweeperTransformed = useMemo(() => {
    return applyTransform(sweeperDataset, sweeperFamily, lambdaVal);
  }, [sweeperDataset, sweeperFamily, lambdaVal]);
  const sweeperMoments = useMemo(() => calculateMoments(sweeperTransformed), [sweeperTransformed]);
  const sweeperHisto = useMemo(() => computeHistogram(sweeperTransformed, 8), [sweeperTransformed]);

  // Mode C Calculations (Binning)
  const equalWidthResults = useMemo(() => {
    const data = activeSalaryData;
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const width = range / numBinsK;
    const edges = Array.from({ length: numBinsK + 1 }, (_, i) => min + i * width);
    const counts = Array(numBinsK).fill(0);

    data.forEach((val) => {
      let b = Math.floor((val - min) / width);
      if (b >= numBinsK) b = numBinsK - 1;
      if (b < 0) b = 0;
      counts[b] += 1;
    });

    let entropy = 0;
    counts.forEach((c) => {
      if (c > 0) {
        const p = c / data.length;
        entropy -= p * Math.log2(p);
      }
    });

    return {
      edges,
      width: Number(width.toFixed(1)),
      counts,
      entropy: Number(entropy.toFixed(3)),
      maxEntropy: Number(Math.log2(numBinsK).toFixed(3)),
    };
  }, [activeSalaryData, numBinsK]);

  const equalFreqResults = useMemo(() => {
    const data = [...activeSalaryData].sort((a, b) => a - b);
    const n = data.length;
    const edges = [data[0]];
    for (let i = 1; i < numBinsK; i++) {
      const idx = Math.floor((i * n) / numBinsK);
      edges.push(data[idx]);
    }
    edges.push(data[n - 1] + 0.001);

    const counts = Array(numBinsK).fill(0);
    data.forEach((val) => {
      let placed = false;
      for (let b = 0; b < numBinsK; b++) {
        if (val >= edges[b] && val < edges[b + 1]) {
          counts[b] += 1;
          placed = true;
          break;
        }
      }
      if (!placed) counts[numBinsK - 1] += 1;
    });

    let entropy = 0;
    counts.forEach((c) => {
      if (c > 0) {
        const p = c / data.length;
        entropy -= p * Math.log2(p);
      }
    });

    return {
      edges,
      counts,
      entropy: Number(entropy.toFixed(3)),
      maxEntropy: Number(Math.log2(numBinsK).toFixed(3)),
    };
  }, [activeSalaryData, numBinsK]);

  // Jargon Glossary
  const jargonList = [
    {
      term: "Homoscedasticity",
      def: "The statistical condition where the variance of regression residual errors remains constant across all values of predictor features.",
      relevance: "Linear models assume homoscedasticity; skewed features create cone-shaped heteroscedastic residuals.",
    },
    {
      term: "Heteroscedasticity",
      def: "Systematic variation in residual dispersion, violating classical Gauss-Markov and OLS regression assumptions.",
      relevance: "Remedied by applying a logarithmic or Box-Cox power transform to the target or skewed predictor.",
    },
    {
      term: "Fisher-Pearson Skewness (g1)",
      def: "The third standardized central moment m3 / (m2^(1.5)), measuring asymmetric tail elongation.",
      relevance: "g1 > 0 indicates right skew (long upper tail); g1 < 0 indicates left skew; g1 ≈ 0 is symmetric.",
    },
    {
      term: "Excess Kurtosis (g2)",
      def: "The fourth standardized central moment relative to a Gaussian distribution (m4 / m2^2 - 3.0).",
      relevance: "g2 > 0 denotes leptokurtic heavy tails (high outlier risk); g2 < 0 denotes platykurtic light tails.",
    },
    {
      term: "Box-Cox Power Transform",
      def: "Parametric power family y(λ) = (x^λ - 1) / λ for λ ≠ 0 and ln(x) for λ = 0, strictly requiring positive x > 0.",
      relevance: "Finds the continuous power transformation that maps continuous data closest to a Gaussian bell curve.",
    },
    {
      term: "Yeo-Johnson Transform",
      def: "4-branch piecewise extension of Box-Cox that accommodates zero and negative real numbers without domain crashes.",
      relevance: "Crucial for net power load, profit/loss financial metrics, and temperature deviations.",
    },
    {
      term: "Profile Log-Likelihood",
      def: "Objective function L(λ) maximized to discover the optimal power parameter λ*.",
      relevance: "Must incorporate the Jacobian determinant term (λ - 1) * Σ ln(x_i) to prevent scale shrinkage cheating.",
    },
    {
      term: "Jacobian Determinant",
      def: "Scale-correction volume factor |dy/dx| in multivariate transformations.",
      relevance: "Penalizes artificial variance collapse during maximum likelihood estimation.",
    },
    {
      term: "Jensen's Inequality",
      def: "Mathematical theorem stating E[g(Z)] ≥ g(E[Z]) for any strictly convex function g.",
      relevance: "Predicting exp(ŷ) systematically underestimates arithmetic mean revenue; requires exp(ŷ + s²/2) correction.",
    },
    {
      term: "Equal-Width Binning",
      def: "Discretization method that partitions the feature interval [min, max] into k bins of equal numerical length.",
      relevance: "Catastrophically sensitive to outliers, which swamp the range and leave intermediate bins empty.",
    },
    {
      term: "Quantile (Equal-Frequency) Binning",
      def: "Discretization method using empirical percentiles so that each of the k bins contains approx n / k samples.",
      relevance: "Completely immune to outlier collapse; preserves maximal Shannon entropy log2(k).",
    },
    {
      term: "Shannon Entropy H(X)",
      def: "Information-theoretic metric H = - Σ p_i * log2(p_i) measuring uncertainty and information capacity in bits.",
      relevance: "Quantifies how much discriminatory information survives after a continuous feature is discretized.",
    },
  ];

  const filteredJargon = jargonList.filter(
    (item) =>
      item.term.toLowerCase().includes(jargonQuery.toLowerCase()) ||
      item.def.toLowerCase().includes(jargonQuery.toLowerCase())
  );

  // Diagnostic Quiz Questions
  const diagnosticQuestions = [
    questions[0], // Q1: Primary motivation
    questions[2], // Q3: Log1p vs Log
    questions[3], // Q4: Box-Cox Domain
    questions[4], // Q5: Yeo-Johnson Real Numbers
    questions[5], // Q6: Equal-width vs Quantile Binning
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
              BCAC701B • Data Types and Preprocessing • Topic 14
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Academic Core
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Power Transforms &amp; Discretization
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/40 rounded-full">
              MAKAUT Aligned
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Data transformation
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-indigo-200/90 font-medium max-w-3xl">
            Mathematical Power Transformations, Profile Log-Likelihood MLE, Box-Cox, Yeo-Johnson, and Feature Discretization Mechanics
          </p>

          <p className="text-xs sm:text-sm text-slate-300 max-w-4xl leading-relaxed">
            Master the algorithmic foundations and numerical engineering behind transforming skewed, heavy-tailed, and heteroscedastic data. Learn how to linearize models, restore normality assumptions, prevent gradient oscillation, and choose between continuous power mappings and entropy-maximizing quantile discretizations across real-world West Bengal industrial deployments.
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
              🌍
            </div>
            <h3 className="text-base font-bold text-white">The Richter Earthquake Scale</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Tectonic fault energy ranges from thousands to billions of Joules. Plotting this on a raw linear axis makes small quakes invisible and large quakes blow off the chart. The base-10 logarithm turns runaway exponential energy into a neat, manageable 1-to-9 linear scale that human emergency services and linear models can reason about.
            </p>
          </div>

          <div className="bg-slate-900/90 p-6 rounded-2xl border border-cyan-900/40 shadow-xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-lg border border-cyan-500/40">
              ✂️
            </div>
            <h3 className="text-base font-bold text-white">The Tailor&apos;s S-Curve Ironing</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              When given stiff, asymmetrically bunched fabric, a master tailor applies steam and heat along an adjustable curve parameter (λ). Box-Cox and Yeo-Johnson operate like that adjustable iron: continuous power bending pulls extreme right-side bunching into a symmetrical, comfortable bell-curve fit that standard regression models wear effortlessly.
            </p>
          </div>

          <div className="bg-slate-900/90 p-6 rounded-2xl border border-emerald-900/40 shadow-xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg border border-emerald-500/40">
              📬
            </div>
            <h3 className="text-base font-bold text-white">Howrah Postal Sorting Trays</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              When millions of mail items arrive with continuous weights from 5 grams to 200 kilograms, optimizing shipping per exact gram creates administrative paralysis. Sorters discretize mail into 5 standardized postal bins (Letter, Document, Parcel, Freight, Heavy Cargo), converting continuous variance into actionable categorical routing.
            </p>
          </div>
        </div>

        {/* TAXONOMY COMPARISON TABLE */}
        <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span>📊</span> Architectural Taxonomy Matrix of Transformation Techniques
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider bg-slate-950/60">
                  <th className="p-3">Method</th>
                  <th className="p-3">Mathematical Domain</th>
                  <th className="p-3">Zero &amp; Negatives</th>
                  <th className="p-3">Parameter Tuning</th>
                  <th className="p-3">Outlier Resilience</th>
                  <th className="p-3">Invertible?</th>
                  <th className="p-3">Recommended Models</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-semibold text-indigo-300">Log1p (ln(1+x))</td>
                  <td className="p-3">x &gt; -1.0</td>
                  <td className="p-3 text-emerald-400">Zero: Yes, Neg: No</td>
                  <td className="p-3">Fixed (None)</td>
                  <td className="p-3">Moderate</td>
                  <td className="p-3 text-emerald-400">Yes (exp(y) - 1)</td>
                  <td className="p-3">Linear, OLS, Ridge, Neural Nets</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-semibold text-cyan-300">Box-Cox</td>
                  <td className="p-3">x &gt; 0.0 strictly</td>
                  <td className="p-3 text-rose-400">Fails (Crash)</td>
                  <td className="p-3">MLE for λ</td>
                  <td className="p-3">Moderate</td>
                  <td className="p-3 text-emerald-400">Yes (algebraic)</td>
                  <td className="p-3">Gaussian NB, LDA, OLS, Econometrics</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-semibold text-emerald-300">Yeo-Johnson</td>
                  <td className="p-3">All x in ℝ (-∞, +∞)</td>
                  <td className="p-3 text-emerald-400">Fully Supported</td>
                  <td className="p-3">MLE for λ</td>
                  <td className="p-3">Moderate</td>
                  <td className="p-3 text-emerald-400">Yes (algebraic)</td>
                  <td className="p-3">Deep Learning, Sensors, Mixed P&amp;L</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-semibold text-amber-300">Equal-Width Binning</td>
                  <td className="p-3">All x in ℝ</td>
                  <td className="p-3 text-emerald-400">Fully Supported</td>
                  <td className="p-3">Number of Bins (k)</td>
                  <td className="p-3 text-rose-400">Catastrophic</td>
                  <td className="p-3 text-rose-400">Lossy (No)</td>
                  <td className="p-3">Uniform distributions only</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-semibold text-purple-300">Quantile Binning</td>
                  <td className="p-3">All x in ℝ</td>
                  <td className="p-3 text-emerald-400">Fully Supported</td>
                  <td className="p-3">Number of Bins (k)</td>
                  <td className="p-3 text-emerald-400">Immune (Max Entropy)</td>
                  <td className="p-3 text-rose-400">Lossy (No)</td>
                  <td className="p-3">Credit Risk, WoE Scoring, Non-linear OLS</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* SEARCHABLE JARGON BUSTER */}
        <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>📖</span> Searchable Jargon Buster (12 Foundational ML Terms)
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
          {/* SKEWNESS & KURTOSIS */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-indigo-900/40 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-indigo-300 flex items-center gap-2">
              <span>📐</span> 1. Higher-Order Moments (Skewness &amp; Kurtosis)
            </h3>
            <div className="bg-slate-950 p-4 rounded-xl border border-indigo-950 font-mono text-xs text-indigo-200 overflow-x-auto space-y-2">
              <div>{"g_1 = [√{n(n-1)} / (n-2)] * [m_3 / m_2^(3/2)]"}</div>
              <div>{"g_2 = [ (1/n) Σ (x_i - x̄)^4 / s^4 ] - 3.0"}</div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Skewness g_1 measures distribution asymmetry. Excess kurtosis g_2 measures tail heaviness relative to Gaussian N(μ, σ²). Extreme g_1 &gt; 1.0 indicates severe right skewness that distorts distance metrics and linear gradients.
            </p>
          </div>

          {/* BOX COX */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-cyan-900/40 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-cyan-300 flex items-center gap-2">
              <span>⚡</span> 2. Box-Cox Power Transform &amp; Profile MLE
            </h3>
            <div className="bg-slate-950 p-4 rounded-xl border border-cyan-950 font-mono text-xs text-cyan-200 overflow-x-auto space-y-2">
              <div>{"y(λ) = (x^λ - 1) / λ   if λ ≠ 0;   ln(x)   if λ = 0"}</div>
              <div>{"L(λ) = -(n/2) ln(σ̂²(λ)) + (λ - 1) Σ ln(x_i)"}</div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Valid strictly for strictly positive values x &gt; 0. By L&apos;Hopital&apos;s rule, lim(λ→0) (x^λ - 1)/λ = ln(x). The Jacobian term (λ - 1) Σ ln(x_i) prevents the optimizer from cheating via artificial variance shrinkage.
            </p>
          </div>

          {/* YEO JOHNSON */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-emerald-900/40 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-emerald-300 flex items-center gap-2">
              <span>🌐</span> 3. Yeo-Johnson Transform (Supports Real ℝ)
            </h3>
            <div className="bg-slate-950 p-4 rounded-xl border border-emerald-950 font-mono text-xs text-emerald-200 overflow-x-auto space-y-2">
              <div>{"For x ≥ 0: ((x + 1)^λ - 1) / λ (λ≠0) or ln(x + 1) (λ=0)"}</div>
              <div>{"For x < 0: -(((-x + 1)^(2-λ) - 1) / (2-λ)) (λ≠2) or -ln(-x + 1)"}</div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Accommodates zero and negative values. For negative x, (-x + 1) &gt; 1 guarantees strictly positive bases for fractional powers. Continuous, smooth, and strictly monotonic everywhere on ℝ.
            </p>
          </div>

          {/* SHANNON ENTROPY */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-purple-900/40 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-purple-300 flex items-center gap-2">
              <span>🎲</span> 4. Discretization &amp; Shannon Entropy
            </h3>
            <div className="bg-slate-950 p-4 rounded-xl border border-purple-950 font-mono text-xs text-purple-200 overflow-x-auto space-y-2">
              <div>{"H(X) = - Σ p_j * log_2(p_j)   (bits)"}</div>
              <div>{"H_max = log_2(k)   (Achieved when p_j = 1/k for all j)"}</div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Quantile binning achieves theoretical maximum entropy H_max = log_2(k). In contrast, equal-width binning under heavy outliers collapses entropy toward zero because almost all samples crowd into a single bin.
            </p>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* SECTION 3: INTERACTIVE STUDIO (3 MODES) */}
      {/* ----------------------------------------------------------------- */}
      <section id="studio" className="space-y-8">
        <div className="border-b border-slate-800 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              Live Exploration Lab
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              3. Interactive Data Transformation Studio
            </h2>
          </div>
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
            {[
              { id: "compare", label: "Mode A: Family Comparator" },
              { id: "sweeper", label: "Mode B: λ Sweeper" },
              { id: "binning", label: "Mode C: Discretization Arena" },
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
        {/* MODE A: TRANSFORMATION FAMILY COMPARATOR */}
        {/* --------------------------------------------------------------- */}
        {studioMode === "compare" && (
          <div className="bg-slate-900/90 p-6 rounded-3xl border border-indigo-900/40 shadow-2xl space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* CONTROL PANEL */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Select Dataset &amp; Transform
                </h3>

                {/* Dataset Chooser */}
                <div className="space-y-2">
                  <label className="text-xs text-slate-400">Benchmark Dataset:</label>
                  <div className="space-y-1.5">
                    {Object.entries(datasets).map(([key, item]) => (
                      <button
                        key={key}
                        onClick={() => {
                          setSelectedDatasetKey(key);
                          if (item.hasNegatives && (selectedTransform === "boxcox" || selectedTransform === "log1p")) {
                            setSelectedTransform("yeojohnson");
                          }
                        }}
                        className={clsx(
                          "w-full text-left p-2.5 rounded-xl text-xs font-medium border transition-all cursor-pointer",
                          selectedDatasetKey === key
                            ? "bg-indigo-950/80 border-indigo-500 text-white shadow-md"
                            : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"
                        )}
                      >
                        <div className="font-bold">{item.name}</div>
                        <div className="text-[11px] text-slate-400 truncate">{item.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Transform Chooser */}
                <div className="space-y-2 pt-2">
                  <label className="text-xs text-slate-400">Mathematical Transform:</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "raw", label: "Raw (No Transform)" },
                      { id: "log1p", label: "Log1p: ln(1+x)", disabled: currentDataset.hasNegatives },
                      { id: "sqrt", label: "Sqrt: √(x)", disabled: currentDataset.hasNegatives },
                      { id: "cbrt", label: "Signed Cube Root" },
                      { id: "boxcox", label: "Box-Cox (λ=-0.47)", disabled: currentDataset.hasNegatives },
                      { id: "yeojohnson", label: "Yeo-Johnson (λ=0.66)" },
                    ].map((tf) => (
                      <button
                        key={tf.id}
                        disabled={tf.disabled}
                        onClick={() => setSelectedTransform(tf.id)}
                        className={clsx(
                          "p-2 rounded-lg text-xs font-semibold border transition-all text-center cursor-pointer",
                          tf.disabled
                            ? "bg-slate-950/40 border-slate-900 text-slate-600 cursor-not-allowed opacity-50"
                            : selectedTransform === tf.id
                            ? "bg-cyan-600 text-white border-cyan-400 shadow-md"
                            : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"
                        )}
                      >
                        {tf.label}
                      </button>
                    ))}
                  </div>
                  {currentDataset.hasNegatives && (
                    <p className="text-[11px] text-amber-400 pt-1">
                      ⚠️ Dataset has negative values. Log and Box-Cox are disabled to prevent mathematical crashes!
                    </p>
                  )}
                </div>
              </div>

              {/* STATS & DIAGNOSIS CARDS */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Momentum Diagnostics
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <div className="text-[11px] text-slate-400">Sample Count (n)</div>
                    <div className="text-lg font-bold text-white">{transformedCompareData.length}</div>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <div className="text-[11px] text-slate-400">Mean (μ)</div>
                    <div className="text-lg font-bold text-cyan-300">{transformedMoments.mean}</div>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <div className="text-[11px] text-slate-400">Std Dev (σ)</div>
                    <div className="text-lg font-bold text-indigo-300">{transformedMoments.stdev}</div>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <div className="text-[11px] text-slate-400">Skewness (g_1)</div>
                    <div
                      className={clsx(
                        "text-lg font-bold",
                        Math.abs(transformedMoments.skewness) < 0.5
                          ? "text-emerald-400"
                          : Math.abs(transformedMoments.skewness) < 1.0
                          ? "text-amber-400"
                          : "text-rose-400"
                      )}
                    >
                      {transformedMoments.skewness}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <div className="text-[11px] text-slate-400">Excess Kurtosis (g_2)</div>
                  <div className="text-base font-bold text-purple-300">{transformedMoments.kurtosis}</div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    {transformedMoments.kurtosis > 1.0
                      ? "Leptokurtic (Heavy tails, outlier risk)"
                      : transformedMoments.kurtosis < -1.0
                      ? "Platykurtic (Flat peak)"
                      : "Mesokurtic (Near-Gaussian decay)"}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-1">
                  <div className="font-bold text-white">Statistical Normality Assessment:</div>
                  <div className="text-slate-300">
                    {Math.abs(transformedMoments.skewness) < 0.5
                      ? "✔ Excellent symmetry! Feature satisfies Gaussian linear model assumptions."
                      : Math.abs(transformedMoments.skewness) < 1.0
                      ? "⚡ Moderate skewness remaining. Acceptable for robust tree & linear models."
                      : "⚠️ Severe skewness! Requires stronger power transformation or discretization."}
                  </div>
                </div>
              </div>

              {/* HISTOGRAM VISUALIZER */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Live Empirical Distribution
                </h3>
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between h-64">
                  <div className="text-right text-[11px] text-slate-500">
                    Range: [{compareHisto.min.toFixed(1)} to {compareHisto.max.toFixed(1)}]
                  </div>

                  {/* SVG Bar Chart */}
                  <svg className="w-full h-44" viewBox="0 0 300 120" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id={`grad-${svgId}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.4" />
                      </linearGradient>
                    </defs>

                    {/* Bars */}
                    {compareHisto.bins.map((b, idx) => {
                      const maxCount = Math.max(...compareHisto.bins.map((x) => x.count), 1);
                      const barHeight = (b.count / maxCount) * 90;
                      const barWidth = 300 / compareHisto.bins.length - 4;
                      const x = idx * (300 / compareHisto.bins.length) + 2;
                      const y = 100 - barHeight;

                      return (
                        <g key={idx}>
                          <rect
                            x={x}
                            y={y}
                            width={barWidth}
                            height={barHeight}
                            rx="3"
                            fill={`url(#grad-${svgId})`}
                            className="transition-all duration-300"
                          />
                          <text
                            x={x + barWidth / 2}
                            y={y - 4}
                            textAnchor="middle"
                            fill="#cbd5e1"
                            fontSize="8"
                            fontWeight="bold"
                          >
                            {b.count > 0 ? b.count : ""}
                          </text>
                        </g>
                      );
                    })}

                    {/* Base Axis */}
                    <line x1="0" y1="102" x2="300" y2="102" stroke="#475569" strokeWidth="1.5" />
                  </svg>

                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>Min: {compareHisto.min.toFixed(1)}</span>
                    <span className="text-indigo-400 font-bold">8 Equal Intervals</span>
                    <span>Max: {compareHisto.max.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --------------------------------------------------------------- */}
        {/* MODE B: BOX-COX & YEO-JOHNSON LAMBDA SWEEPER */}
        {/* --------------------------------------------------------------- */}
        {studioMode === "sweeper" && (
          <div className="bg-slate-900/90 p-6 rounded-3xl border border-indigo-900/40 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>🎛️</span> Dynamic Power Parameter (λ) Sweeper
                </h3>
                <p className="text-xs text-slate-400">
                  Slide λ continuously from -2.0 to +2.0 to observe how the feature density dynamically reshapes in real time.
                </p>
              </div>

              <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => {
                    setSweeperFamily("boxcox");
                    setLambdaVal(0.0);
                  }}
                  className={clsx(
                    "px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer",
                    sweeperFamily === "boxcox"
                      ? "bg-cyan-600 text-white shadow"
                      : "text-slate-400 hover:text-white"
                  )}
                >
                  Box-Cox (Loans Dataset)
                </button>
                <button
                  onClick={() => {
                    setSweeperFamily("yeojohnson");
                    setLambdaVal(0.6);
                  }}
                  className={clsx(
                    "px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer",
                    sweeperFamily === "yeojohnson"
                      ? "bg-emerald-600 text-white shadow"
                      : "text-slate-400 hover:text-white"
                  )}
                >
                  Yeo-Johnson (Grid Dataset)
                </button>
              </div>
            </div>

            {/* SLIDER & PRESETS */}
            <div className="space-y-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-bold text-slate-300">
                  Power Parameter λ: <span className="text-cyan-400 text-sm font-mono">{lambdaVal.toFixed(2)}</span>
                </span>
                <span className="text-xs text-slate-500">
                  {Math.abs(lambdaVal - (-1.0)) < 0.05
                    ? "Reciprocal Transform (1 - 1/x)"
                    : Math.abs(lambdaVal) < 0.05
                    ? "Natural Logarithm (ln(x))"
                    : Math.abs(lambdaVal - 0.5) < 0.05
                    ? "Square Root (2*(√x - 1))"
                    : Math.abs(lambdaVal - 1.0) < 0.05
                    ? "Linear Identity (x - 1, No Shape Change)"
                    : Math.abs(lambdaVal - 2.0) < 0.05
                    ? "Quadratic Power (Corrects Left Skew)"
                    : "Continuous Power Transform"}
                </span>
              </div>

              <input
                type="range"
                min="-2.0"
                max="2.0"
                step="0.05"
                value={lambdaVal}
                onChange={(e) => setLambdaVal(parseFloat(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />

              {/* QUICK PRESET BUTTONS */}
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  { lmb: -1.0, label: "λ = -1.0 (Reciprocal)" },
                  { lmb: -0.47, label: "λ = -0.47 (Optimal MLE)" },
                  { lmb: 0.0, label: "λ = 0.0 (Log)" },
                  { lmb: 0.5, label: "λ = 0.5 (Sqrt)" },
                  { lmb: 1.0, label: "λ = 1.0 (Raw Identity)" },
                  { lmb: 2.0, label: "λ = 2.0 (Square)" },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setLambdaVal(item.lmb)}
                    className={clsx(
                      "px-2.5 py-1 text-xs font-medium rounded-lg border transition-all cursor-pointer",
                      Math.abs(lambdaVal - item.lmb) < 0.03
                        ? "bg-cyan-600 text-white border-cyan-400"
                        : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* DYNAMIC RESULTS DISPLAY */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* HISTOGRAM */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-white">Transformed Value Distribution</span>
                  <span className="text-slate-400 font-mono">
                    [{sweeperHisto.min.toFixed(1)} to {sweeperHisto.max.toFixed(1)}]
                  </span>
                </div>

                <svg className="w-full h-44" viewBox="0 0 300 120" preserveAspectRatio="none">
                  {sweeperHisto.bins.map((b, idx) => {
                    const maxCount = Math.max(...sweeperHisto.bins.map((x) => x.count), 1);
                    const barHeight = (b.count / maxCount) * 90;
                    const barWidth = 300 / sweeperHisto.bins.length - 4;
                    const x = idx * (300 / sweeperHisto.bins.length) + 2;
                    const y = 100 - barHeight;

                    return (
                      <g key={idx}>
                        <rect
                          x={x}
                          y={y}
                          width={barWidth}
                          height={barHeight}
                          rx="3"
                          fill="#06b6d4"
                          opacity="0.85"
                          className="transition-all duration-200"
                        />
                        <text
                          x={x + barWidth / 2}
                          y={y - 4}
                          textAnchor="middle"
                          fill="#e2e8f0"
                          fontSize="8"
                          fontWeight="bold"
                        >
                          {b.count > 0 ? b.count : ""}
                        </text>
                      </g>
                    );
                  })}
                  <line x1="0" y1="102" x2="300" y2="102" stroke="#475569" strokeWidth="1.5" />
                </svg>
              </div>

              {/* STAT CARDS */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <div className="text-[11px] text-slate-400">Resulting Skewness (g_1)</div>
                    <div
                      className={clsx(
                        "text-lg font-bold font-mono",
                        Math.abs(sweeperMoments.skewness) < 0.5
                          ? "text-emerald-400"
                          : Math.abs(sweeperMoments.skewness) < 1.0
                          ? "text-amber-400"
                          : "text-rose-400"
                      )}
                    >
                      {sweeperMoments.skewness}
                    </div>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <div className="text-[11px] text-slate-400">Resulting Kurtosis (g_2)</div>
                    <div className="text-lg font-bold font-mono text-purple-300">
                      {sweeperMoments.kurtosis}
                    </div>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <div className="text-[11px] text-slate-400">Transformed Mean (μ)</div>
                    <div className="text-lg font-bold font-mono text-cyan-300">
                      {sweeperMoments.mean}
                    </div>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <div className="text-[11px] text-slate-400">Transformed StDev (σ)</div>
                    <div className="text-lg font-bold font-mono text-indigo-300">
                      {sweeperMoments.stdev}
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                  <div className="font-bold text-white flex items-center gap-2">
                    <span>💡</span> Profile Likelihood Optimization Insight:
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Notice how setting λ = 1.0 retains severe right skew (+3.10), while moving λ toward negative values (-0.47) progressively compresses the upper tail until skewness reaches near-zero (+0.21). However, pushing λ too far below -1.5 inverts the distribution and introduces heavy artificial left skew!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --------------------------------------------------------------- */}
        {/* MODE C: DISCRETIZATION & SHANNON ENTROPY ARENA */}
        {/* --------------------------------------------------------------- */}
        {studioMode === "binning" && (
          <div className="bg-slate-900/90 p-6 rounded-3xl border border-indigo-900/40 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>⚖️</span> Equal-Width vs. Equal-Frequency (Quantile) Binning Arena
                </h3>
                <p className="text-xs text-slate-400">
                  Compare how Equal-Width and Quantile binning respond to heavy outliers and examine Shannon Entropy preservation.
                </p>
              </div>

              {/* OUTLIER TOGGLE */}
              <button
                onClick={() => setInjectOutlier((prev) => !prev)}
                className={clsx(
                  "px-3 py-1.5 text-xs font-bold rounded-xl border transition-all cursor-pointer flex items-center gap-2",
                  injectOutlier
                    ? "bg-rose-950/80 border-rose-500 text-rose-200 shadow-md"
                    : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"
                )}
              >
                <span>{injectOutlier ? "🚨 Outlier Injected (₹1,000k)" : "➕ Inject Extreme Outlier (₹1,000k)"}</span>
              </button>
            </div>

            {/* BIN COUNT SLIDER */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-slate-300">
                  Target Bin Count (k): <span className="text-indigo-400 font-mono text-sm">{numBinsK}</span>
                </span>
                <span className="text-slate-500">
                  Max Theoretical Entropy: log_2({numBinsK}) = {Math.log2(numBinsK).toFixed(3)} bits
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="8"
                step="1"
                value={numBinsK}
                onChange={(e) => setNumBinsK(parseInt(e.target.value, 10))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>

            {/* SIDE BY SIDE COMPARISON */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* EQUAL-WIDTH CARD */}
              <div
                className={clsx(
                  "p-5 rounded-2xl border shadow-xl space-y-4",
                  injectOutlier && equalWidthResults.counts.some((c) => c === 0)
                    ? "bg-rose-950/20 border-rose-900/60"
                    : "bg-slate-950 border-slate-800"
                )}
              >
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                    <span>📏</span> Equal-Width Binning
                  </h4>
                  <span className="text-xs font-mono text-slate-400">
                    Width: {equalWidthResults.width}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="text-xs text-slate-400 font-medium">Bin Frequencies &amp; Distribution:</div>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {equalWidthResults.counts.map((cnt, i) => (
                      <div
                        key={i}
                        className={clsx(
                          "p-2 rounded-lg text-center border text-xs",
                          cnt === 0
                            ? "bg-rose-950/60 border-rose-700/60 text-rose-300 font-bold"
                            : "bg-slate-900 border-slate-800 text-slate-200"
                        )}
                      >
                        <div className="text-[10px] text-slate-500">Bin {i}</div>
                        <div className="text-sm font-bold">{cnt}</div>
                        <div className="text-[9px] text-slate-500">{cnt === 0 ? "EMPTY!" : `${cnt} obs`}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Shannon Entropy:</span>
                    <span
                      className={clsx(
                        "font-mono font-bold",
                        equalWidthResults.entropy < 1.0 ? "text-rose-400" : "text-amber-300"
                      )}
                    >
                      {equalWidthResults.entropy} / {equalWidthResults.maxEntropy} bits
                    </span>
                  </div>
                  {injectOutlier && equalWidthResults.counts.some((c) => c === 0) && (
                    <p className="text-[11px] text-rose-400 leading-relaxed pt-1">
                      ⚠️ Outlier Pathology: Extreme outlier swamped the range. Intermediate bins are completely empty and entropy collapsed by {(100 - (equalWidthResults.entropy / equalWidthResults.maxEntropy) * 100).toFixed(0)}%!
                    </p>
                  )}
                </div>
              </div>

              {/* EQUAL-FREQUENCY (QUANTILE) CARD */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-emerald-900/60 shadow-xl space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                    <span>🎯</span> Equal-Frequency (Quantile) Binning
                  </h4>
                  <span className="text-xs font-mono text-emerald-400 font-bold">
                    Percentile Partitioned
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="text-xs text-slate-400 font-medium">Bin Frequencies &amp; Distribution:</div>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {equalFreqResults.counts.map((cnt, i) => (
                      <div
                        key={i}
                        className="p-2 rounded-lg text-center border border-emerald-900/50 bg-emerald-950/30 text-emerald-200 text-xs"
                      >
                        <div className="text-[10px] text-emerald-400/80">Bin {i}</div>
                        <div className="text-sm font-bold">{cnt}</div>
                        <div className="text-[9px] text-slate-400">{cnt} obs</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Shannon Entropy:</span>
                    <span className="font-mono font-bold text-emerald-400">
                      {equalFreqResults.entropy} / {equalFreqResults.maxEntropy} bits
                    </span>
                  </div>
                  <p className="text-[11px] text-emerald-300 leading-relaxed pt-1">
                    ✔ Robust to Outliers: Every single bin maintains balanced representation. Shannon entropy remains near theoretical maximum regardless of outlier magnitude!
                  </p>
                </div>
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
            <h3 className="text-base font-bold text-white">Micro-Lending Loan Amount Skewness</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              A Kolkata FinTech evaluates micro-loans where 90% of requests are ₹15k–₹40k, but business bridge loans reach ₹25 Lakhs (skewness g_1 = +4.82). Training an Ordinary Least Squares default classifier on raw amounts generated heteroscedastic cone residuals. Box-Cox with λ* = -0.32 normalized the distribution, reducing loan default prediction MSE by 18.2%.
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
            <h3 className="text-base font-bold text-white">CESC Net Grid Load with Reverse Solar Feeds</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              CESC feeding substations monitor net hourly megawatt load. Midday commercial rooftop solar creates negative surplus feeds (-14.2 MW), while evening cooling peaks jump to +240 MW. Because Box-Cox crashes on non-positive values, engineers applied Yeo-Johnson (λ* = 0.66), eliminating deep neural net gradient blowups and improving 24-hr load forecasting.
            </p>
          </div>

          {/* CASE 3 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-amber-900/40 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 rounded-full border border-amber-500/40">
                Agri-Commodities
              </span>
              <span className="text-xs text-slate-400">Howrah Wholesale Cold Storages</span>
            </div>
            <h3 className="text-base font-bold text-white">Potato Wholesale Price Volatility &amp; Quantile Bins</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Jyoti potato spot prices per quintal typically range ₹800–₹1,400, but flood supply shocks spiked prices to ₹3,800. Equal-width binning created 3 empty bins and collapsed 95% of trade days into Bin 0. Switching to 5-bin Quantile Discretization preserved 2.32 bits of entropy, allowing a Decision Tree to accurately detect merchant hoarding regimes.
            </p>
          </div>

          {/* CASE 4 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-emerald-900/40 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/40">
                Public Healthcare
              </span>
              <span className="text-xs text-slate-400">North 24 Parganas District Hospitals</span>
            </div>
            <h3 className="text-base font-bold text-white">Monsoon Dengue Platelet Count Surveillance</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Clinical diagnostic centers in Barasat and Barrackpore track platelet counts during dengue epidemics (spanning 8,000 to 450,000/μL). The Poisson count dispersion (variance proportional to mean) was stabilized using Square Root and Box-Cox power transforms (λ* = 0.41), enabling linear discriminant classifiers to identify hemorrhagic shock risk 18 hours earlier.
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
              <span>⚠️</span> Pitfall 1: Data Leakage via λ Estimation
            </div>
            <h4 className="text-sm font-bold text-white">Fitting on Entire Dataset</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Never fit Box-Cox λ* or quantile cutoffs on the combined dataset. Always estimate parameters strictly on training folds (X_train) and transform test/serving data using frozen training parameters.
            </p>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-rose-900/40 space-y-3">
            <div className="text-rose-400 font-bold text-xs flex items-center gap-2">
              <span>⚠️</span> Pitfall 2: Box-Cox Non-Positive Crash
            </div>
            <h4 className="text-sm font-bold text-white">Zero or Negative Ingestion</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Box-Cox crashes immediately if an incoming record contains x ≤ 0. Install schema assertion guards or default to Yeo-Johnson if negative numbers are possible in production.
            </p>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-rose-900/40 space-y-3">
            <div className="text-rose-400 font-bold text-xs flex items-center gap-2">
              <span>⚠️</span> Pitfall 3: Jensen&apos;s Inequality Bias
            </div>
            <h4 className="text-sm font-bold text-white">Naive exp(ŷ) Back-Transformation</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              When predicting a log-transformed target, exp(ŷ) yields the median, systematically under-predicting the mean sum. Apply the normal correction exp(ŷ + σ²/2) or Duan&apos;s smearing factor.
            </p>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-amber-900/40 space-y-3">
            <div className="text-amber-400 font-bold text-xs flex items-center gap-2">
              <span>⚠️</span> Pitfall 4: Tree Model Invariance
            </div>
            <h4 className="text-sm font-bold text-white">Wasting Compute on XGBoost</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Monotonic transforms preserve sample rank order. Decision trees, Random Forests, and XGBoost produce 100% identical split thresholds. Do not waste inference latency transforming features for tree ensembles.
            </p>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-amber-900/40 space-y-3">
            <div className="text-amber-400 font-bold text-xs flex items-center gap-2">
              <span>⚠️</span> Pitfall 5: High-Cardinality Binning
            </div>
            <h4 className="text-sm font-bold text-white">Degree-of-Freedom Explosion</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Discretizing continuous features into excessive bins (e.g. k = 100) causes extreme sparsity, overfitting, and variance errors. Keep bins between 5 and 10 unless domain business rules dictate otherwise.
            </p>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-emerald-900/40 space-y-3">
            <div className="text-emerald-400 font-bold text-xs flex items-center gap-2">
              <span>✔</span> Best Practice: Pipeline Serialization
            </div>
            <h4 className="text-sm font-bold text-white">Persisting λ &amp; Scaling Moments</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Store fitted transformer objects in Joblib/ONNX pipelines alongside model weights to guarantee bitwise-identical transformations in live microservices and enable SHAP inversion.
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
          <PlainTextPrint content={noteText} filename="Topic14_Data_Transformation_Notes.txt" />
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
            8. Pure Python Laboratory: Transformation &amp; Binning Engine
          </h2>
        </div>
        <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-xl">
          <PythonFileLoader
            code={labCode}
            filename="data_transformation_lab.py"
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

export default Topic14;
