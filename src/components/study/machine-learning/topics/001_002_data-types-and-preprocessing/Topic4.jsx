import React, { useState, useId, useMemo } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import labCode from "./topic4_files/discrete_and_continuous_variables_lab.py?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions.js";

// =============================================================================
// MATHEMATICAL HELPER FUNCTIONS (PMF, PDF, CDF, ERROR FUNCTION)
// =============================================================================

const factorial = (n) => {
  if (n <= 1) return 1;
  let res = 1;
  for (let i = 2; i <= n; i++) res *= i;
  return res;
};

const poissonPmf = (k, lambda) => {
  if (k < 0) return 0;
  return (Math.pow(lambda, k) * Math.exp(-lambda)) / factorial(k);
};

const gaussianPdf = (x, mu, sigma) => {
  if (sigma <= 0) return 0;
  return (
    (1 / (sigma * Math.sqrt(2 * Math.PI))) *
    Math.exp(-0.5 * Math.pow((x - mu) / sigma, 2))
  );
};

// Numerical approximation of error function (Abramowitz & Stegun formula 7.1.26)
const erf = (x) => {
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const sign = x < 0 ? -1 : 1;
  const absX = Math.abs(x);
  const t = 1.0 / (1.0 + p * absX);
  const y =
    1.0 -
    ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) *
      t *
      Math.exp(-absX * absX);
  return sign * y;
};

const normalCdf = (x, mu, sigma) => {
  if (sigma <= 0) return x >= mu ? 1 : 0;
  return 0.5 * (1 + erf((x - mu) / (sigma * Math.SQRT2)));
};

// Fixed sample continuous clinical dataset: Hospital stay duration (hours)
const CLINICAL_STAYS = [
  12.4, 14.8, 16.2, 18.5, 19.1, 21.3, 22.8, 23.4, 24.0, 24.5,
  25.2, 26.8, 27.5, 29.1, 30.0, 31.4, 32.2, 33.8, 35.1, 36.5,
  38.2, 40.0, 42.5, 44.1, 46.8, 48.2, 51.0, 53.5, 56.2, 59.8,
  62.1, 65.4, 68.9, 72.0, 75.6, 79.2, 83.5, 88.0, 92.4, 96.8,
  101.5, 107.2, 114.0, 120.5, 128.4, 134.2, 140.0, 148.5, 155.0, 168.0
];

const Topic4 = () => {
  const [activeTab, setActiveTab] = useState("noviceMasterclass");

  // Novice Classroom State
  const [selectedLessonTab, setSelectedLessonTab] = useState("intuition");
  const [selectedJargonCategory, setSelectedJargonCategory] = useState("all");
  const [jargonSearchQuery, setJargonSearchQuery] = useState("");

  // Interactive Studio State
  const [studioMode, setStudioMode] = useState("pmfPdf"); // "pmfPdf" | "binningLab"
  
  // PMF / PDF Visualizer State
  const [poissonLambda, setPoissonLambda] = useState(4);
  const [poissonRangeMin, setPoissonRangeMin] = useState(2);
  const [poissonRangeMax, setPoissonRangeMax] = useState(6);

  const [gaussianMean, setGaussianMean] = useState(20);
  const [gaussianStd, setGaussianStd] = useState(3.5);
  const [gaussianRangeMin, setGaussianRangeMin] = useState(16.5);
  const [gaussianRangeMax, setGaussianRangeMax] = useState(23.5);

  // Discretization & Binning State
  const [binningStrategy, setBinningStrategy] = useState("equalWidth"); // "equalWidth" | "equalFreq"
  const [numBins, setNumBins] = useState(4);

  // Diagnostic Quiz State
  const [selectedQuizIndex, setSelectedQuizIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const svgId = useId();

  // Smooth scroll handler
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    const element = document.getElementById(tabId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // ---------------------------------------------------------------------------
  // JARGON BUSTER VOCABULARY
  // ---------------------------------------------------------------------------
  const jargonList = [
    {
      term: "Probability Mass Function (PMF)",
      category: "probability",
      pronunciation: "P-M-F",
      shortDef: "A mathematical function giving the exact probability P(X = k) for discrete countable outcomes.",
      deepExplanation: "For any discrete random variable X, the PMF assigns a discrete probability mass to each value in its countable support set. Axioms require that each p(k) >= 0 and the sum of all masses across the entire support exactly equals 1.0 (∑ p(k) = 1.0).",
      equation: "P(X = k) = p_k, \\quad \\sum_{k} p_k = 1.0"
    },
    {
      term: "Probability Density Function (PDF)",
      category: "probability",
      pronunciation: "P-D-F",
      shortDef: "A continuous curve representing the relative likelihood density per unit interval for continuous variables.",
      deepExplanation: "Unlike a PMF, the value of a continuous PDF f(x) is not a probability—it is a density! The height f(x) can legally exceed 1.0. Probability is defined strictly as the area under the PDF curve across an interval [a, b]. The probability of any single exact point is mathematically zero.",
      equation: "P(a \\le X \\le b) = \\int_{a}^{b} f(x) \\, dx, \\quad \\int_{-\\infty}^{\\infty} f(x) \\, dx = 1.0"
    },
    {
      term: "The Zero-Probability Paradox",
      category: "probability",
      pronunciation: "Con-tin-u-ous P = 0",
      shortDef: "The counter-intuitive mathematical truth that for any continuous variable, P(X = exact c) = 0.",
      deepExplanation: "Because a continuous interval contains an uncountably infinite number of real values, the probability of selecting one infinitesimal point is 1 / ∞ = 0. We can only compute probabilities for continuous variables over non-zero intervals.",
      equation: "P(X = c) = \\int_{c}^{c} f(x) \\, dx = 0"
    },
    {
      term: "Cumulative Distribution Function (CDF)",
      category: "probability",
      pronunciation: "C-D-F",
      shortDef: "The function F(x) = P(X <= x) giving accumulated probability up to value x.",
      deepExplanation: "For discrete variables, the CDF is a step-function (staircase) with jump discontinuities equal to the probability masses. For continuous variables, the CDF is a smooth, continuous, monotonically non-decreasing S-curve.",
      equation: "F(x) = P(X \\le x) = \\sum_{k \\le x} p_k \\quad \\text{vs} \\quad F(x) = \\int_{-\\infty}^{x} f(u) \\, du"
    },
    {
      term: "Equal-Width Binning",
      category: "binning",
      pronunciation: "E-qual Width",
      shortDef: "Dividing the continuous numerical range [min, max] into k intervals of identical span width W.",
      deepExplanation: "Width W = (max - min) / k. It is simple and intuitive, but highly sensitive to outliers. A single extreme outlier will stretch the range, producing many empty intermediate bins and squashing typical observations into one single bucket.",
      equation: "W = \\frac{x_{\\max} - x_{\\min}}{k}, \\quad \\text{Cut points: } c_j = x_{\\min} + j \\cdot W"
    },
    {
      term: "Equal-Frequency (Quantile) Binning",
      category: "binning",
      pronunciation: "Quan-tile Bin-ning",
      shortDef: "Dividing continuous data into k buckets such that every bucket contains an equal number of data points.",
      deepExplanation: "Cut points are calculated using empirical percentiles / quantiles (e.g. quartiles Q1, Q2, Q3 for k=4). This guarantees balanced sample representation per bucket and handles skewed distributions gracefully, but creates intervals of wildly varying physical widths.",
      equation: "c_j = Q_{j/k}(X) \\implies \\text{Count in Bin } j \\approx \\frac{N}{k}"
    },
    {
      term: "Overdispersion",
      category: "modeling",
      pronunciation: "O-ver-dis-per-sion",
      shortDef: "When empirical variance significantly exceeds the empirical mean in count data.",
      deepExplanation: "The standard Poisson distribution strictly enforces equidispersion: Var(X) = E[X] = λ. In real-world engineering (e.g. peak metro passenger rushes, emergency room admissions), variance frequently dwarfs the mean (Var > Mean). Forcing a Poisson model causes under-estimated standard errors; Negative Binomial GLM must be used instead.",
      equation: "\\mathrm{Var}(Y) > \\mathbb{E}[Y] \\implies \\text{Poisson Assumption Broken!}"
    },
    {
      term: "Zero-Inflated Poisson (ZIP)",
      category: "modeling",
      pronunciation: "Z-I-P Model",
      shortDef: "A two-stage mixture model for count targets characterized by excessive zero-count observations.",
      deepExplanation: "In many industrial datasets (e.g. insurance claims, factory machine breakdowns, website purchases), a vast majority of rows are 0. ZIP models two separate processes: a logistic regression predicting whether the count is structurally zero, and a Poisson regression predicting positive counts.",
      equation: "P(Y=0) = \\pi + (1-\\pi)e^{-\\lambda}, \\quad P(Y=k) = (1-\\pi)\\frac{\\lambda^k e^{-\\lambda}}{k!}"
    },
    {
      term: "Kolmogorov-Smirnov (K-S) Test",
      category: "modeling",
      pronunciation: "K-S Test",
      shortDef: "A non-parametric statistical hypothesis test comparing continuous sample distributions without binning.",
      deepExplanation: "Quantifies the supremum distance D between the empirical CDF of sample data and a theoretical reference CDF. Because it operates directly on individual continuous measurements without binning, it avoids arbitrary bin-width artifacts inherent in Chi-Square tests.",
      equation: "D = \\sup_{x} |F_n(x) - F_0(x)|"
    }
  ];

  // Filtered Jargon List
  const filteredJargon = useMemo(() => {
    return jargonList.filter((item) => {
      const matchesCategory =
        selectedJargonCategory === "all" || item.category === selectedJargonCategory;
      const matchesSearch =
        item.term.toLowerCase().includes(jargonSearchQuery.toLowerCase()) ||
        item.shortDef.toLowerCase().includes(jargonSearchQuery.toLowerCase()) ||
        item.deepExplanation.toLowerCase().includes(jargonSearchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedJargonCategory, jargonSearchQuery]);

  // ---------------------------------------------------------------------------
  // INTERACTIVE STUDIO CALCULATIONS (MODE A: PMF vs PDF)
  // ---------------------------------------------------------------------------
  
  // Poisson calculations
  const maxPoissonK = Math.max(12, Math.round(poissonLambda * 2.2));
  const poissonData = useMemo(() => {
    const list = [];
    let sumInterval = 0;
    for (let k = 0; k <= maxPoissonK; k++) {
      const p = poissonPmf(k, poissonLambda);
      const inInterval = k >= poissonRangeMin && k <= poissonRangeMax;
      if (inInterval) sumInterval += p;
      list.push({ k, p, inInterval });
    }
    return { list, sumInterval };
  }, [poissonLambda, poissonRangeMin, poissonRangeMax, maxPoissonK]);

  // Gaussian calculations
  const gaussianCurveData = useMemo(() => {
    const xMin = gaussianMean - 3.8 * gaussianStd;
    const xMax = gaussianMean + 3.8 * gaussianStd;
    const pointsCount = 100;
    const step = (xMax - xMin) / pointsCount;
    const points = [];
    let maxDensity = 0;

    for (let i = 0; i <= pointsCount; i++) {
      const x = xMin + i * step;
      const density = gaussianPdf(x, gaussianMean, gaussianStd);
      if (density > maxDensity) maxDensity = density;
      const inInterval = x >= gaussianRangeMin && x <= gaussianRangeMax;
      points.push({ x, density, inInterval });
    }

    // Interval probability using analytic normal CDF
    const pInterval = Math.max(
      0,
      normalCdf(gaussianRangeMax, gaussianMean, gaussianStd) -
        normalCdf(gaussianRangeMin, gaussianMean, gaussianStd)
    );

    return { points, maxDensity, xMin, xMax, pInterval };
  }, [gaussianMean, gaussianStd, gaussianRangeMin, gaussianRangeMax]);

  // ---------------------------------------------------------------------------
  // INTERACTIVE STUDIO CALCULATIONS (MODE B: DISCRETIZATION & BINNING)
  // ---------------------------------------------------------------------------
  const binningAnalysis = useMemo(() => {
    const data = [...CLINICAL_STAYS].sort((a, b) => a - b);
    const minVal = data[0];
    const maxVal = data[data.length - 1];
    const k = numBins;

    let cuts = [];
    let bins = [];

    if (binningStrategy === "equalWidth") {
      const width = (maxVal - minVal) / k;
      for (let i = 0; i <= k; i++) {
        cuts.push(minVal + i * width);
      }
      for (let i = 0; i < k; i++) {
        const lower = cuts[i];
        const upper = cuts[i + 1];
        // Upper edge inclusive for the last bin
        const count = data.filter((v) =>
          i === k - 1 ? v >= lower && v <= upper : v >= lower && v < upper
        ).length;
        bins.push({
          binIndex: i + 1,
          label: `[${lower.toFixed(1)}, ${upper.toFixed(1)}${i === k - 1 ? "]" : ")"}`,
          lower,
          upper,
          width: upper - lower,
          count,
          pct: ((count / data.length) * 100).toFixed(1)
        });
      }
    } else {
      // Equal Frequency (Quantile)
      cuts.push(minVal);
      for (let i = 1; i < k; i++) {
        const idx = Math.floor((i / k) * data.length);
        cuts.push(data[idx]);
      }
      cuts.push(maxVal);

      for (let i = 0; i < k; i++) {
        const lower = cuts[i];
        const upper = cuts[i + 1];
        const count = data.filter((v) =>
          i === k - 1 ? v >= lower && v <= upper : v >= lower && v < upper
        ).length;
        bins.push({
          binIndex: i + 1,
          label: `[${lower.toFixed(1)}, ${upper.toFixed(1)}${i === k - 1 ? "]" : ")"}`,
          lower,
          upper,
          width: upper - lower,
          count,
          pct: ((count / data.length) * 100).toFixed(1)
        });
      }
    }

    // Diagnostics
    const counts = bins.map((b) => b.count);
    const avgCount = data.length / k;
    const countVariance =
      counts.reduce((acc, c) => acc + Math.pow(c - avgCount, 2), 0) / k;
    const countStd = Math.sqrt(countVariance);

    const widths = bins.map((b) => b.width);
    const avgWidth = widths.reduce((acc, w) => acc + w, 0) / k;
    const widthVariance =
      widths.reduce((acc, w) => acc + Math.pow(w - avgWidth, 2), 0) / k;
    const widthStd = Math.sqrt(widthVariance);

    const emptyBinsCount = bins.filter((b) => b.count === 0).length;

    return {
      cuts,
      bins,
      countStd,
      widthStd,
      emptyBinsCount,
      minVal,
      maxVal,
      data
    };
  }, [binningStrategy, numBins]);

  // ---------------------------------------------------------------------------
  // 5 DIAGNOSTIC QUIZ QUESTIONS
  // ---------------------------------------------------------------------------
  const quizData = [
    {
      id: 1,
      scenario: "Infinitesimal Probability in Continuous Systems",
      question:
        "A continuous temperature sensor at Durgapur Steel Plant has a Gaussian PDF. What is the exact mathematical probability that at 2:00 PM the temperature is exactly 38.00000000... °C?",
      options: [
        { label: "A", text: "f(38.0), which is the height of the normal bell curve (approx 0.125)" },
        { label: "B", text: "Exactly 0, because the integral of a continuous density at a single point has zero width" },
        { label: "C", text: "1.0, because temperature is guaranteed to exist at some point" },
        { label: "D", text: "Undefined, because continuous variables cannot be measured in the physical world" }
      ],
      correct: "B",
      explanation:
        "For any continuous random variable, P(X = c) = ∫_c^c f(x) dx = 0. The height f(x) is probability density, not probability. Only intervals have non-zero probability.",
      mentorTip:
        "Never confuse density height f(x) with probability mass P(X = x). On continuous distributions, probability exists solely as the area under the curve across an interval [a, b]!"
    },
    {
      id: 2,
      scenario: "Ordinary Least Squares (OLS) Failure on Count Targets",
      question:
        "An engineer trains a standard Linear Regression model (OLS with Mean Squared Error) to predict the number of prior hospital visits (0, 1, 2, ...). What catastrophic failure mode will occur?",
      options: [
        { label: "A", text: "The model will train normally with zero mathematical flaws" },
        { label: "B", text: "The model can predict negative visits (e.g. -1.8 visits) and fractional patients (e.g. 2.41 visits), violating the non-negative integer domain" },
        { label: "C", text: "The model will automatically convert all predictions into One-Hot vectors" },
        { label: "D", text: "The gradient will vanish instantly during the first epoch of training" }
      ],
      correct: "B",
      explanation:
        "Linear regression models y = w^T x assume a continuous Gaussian target y ∈ (-∞, ∞). For discrete count targets y ∈ {0, 1, 2, ...}, OLS generates nonsensical negative predictions and violates the homoscedasticity assumption because count variance naturally scales with the mean.",
      mentorTip:
        "Always use a Poisson or Negative Binomial Generalized Linear Model (GLM) with a log-link function (λ = exp(w^T x)) when your target represents non-negative integer counts!"
    },
    {
      id: 3,
      scenario: "Discretization Strategy on Right-Skewed Data",
      question:
        "In a patient dataset where 90% of hospital stays are under 48 hours, but a few ICU cases stay up to 400 hours, what happens if you apply Equal-Width binning with k=5?",
      options: [
        { label: "A", text: "All bins will have an equal number of patient records" },
        { label: "B", text: "The first bin will contain 90%+ of all records, while intermediate bins between 100-300 hours will be nearly empty" },
        { label: "C", text: "The model accuracy will increase by 40% across all classes" },
        { label: "D", text: "The extreme outliers will be automatically deleted from the dataset" }
      ],
      correct: "B",
      explanation:
        "Equal-Width binning divides the total span (400 - 0 = 400 hours) into equal 80-hour spans. The first bin [0, 80) absorbs almost all patients, while the upper bins are virtually deserted. Equal-Frequency (Quantile) binning is far superior for skewed data.",
      mentorTip:
        "Outliers distort Equal-Width binning severely! When dealing with heavy-tailed distributions like wealth, server latency, or ICU stays, always prefer Quantile Binning or log transforms."
    },
    {
      id: 4,
      scenario: "Detecting Overdispersion in Count Data",
      question:
        "You analyze Kolkata Metro station entry turnstiles during peak office hours. The sample mean passenger count is 4.2 per minute, but the sample variance is 28.5 per minute squared. Which model is required?",
      options: [
        { label: "A", text: "Standard Poisson GLM (because turnstile entries are counts)" },
        { label: "B", text: "Negative Binomial GLM (because Var >> Mean proves severe Overdispersion)" },
        { label: "C", text: "Logistic Regression (because entries are binary)" },
        { label: "D", text: "K-Means Clustering on raw timestamps" }
      ],
      correct: "B",
      explanation:
        "Standard Poisson models strictly require Var(Y) = Mean(Y). Here, the variance (28.5) is nearly 7 times the mean (4.2). This extreme overdispersion causes Poisson standard errors to be severely underestimated. A Negative Binomial model introduces a dispersion parameter α to accommodate excess variance.",
      mentorTip:
        "Always calculate the Dispersion Ratio = Sample Variance / Sample Mean before fitting a Poisson model. If the ratio > 1.5, switch to Negative Binomial immediately!"
    },
    {
      id: 5,
      scenario: "Interpreting Cumulative Distribution Functions (CDF)",
      question:
        "When plotting the Cumulative Distribution Function F(x) = P(X <= x), you observe an abrupt vertical jump discontinuity at x = 3. What does this jump indicate?",
      options: [
        { label: "A", text: "The sensor experienced a hardware failure and recorded an invalid NaN" },
        { label: "B", text: "There is an isolated discrete point probability mass located at x = 3" },
        { label: "C", text: "The variable is guaranteed to be strictly continuous Gaussian" },
        { label: "D", text: "The integral of the probability density function is divergent" }
      ],
      correct: "B",
      explanation:
        "In a CDF, a vertical jump of height ΔF at point x_0 represents an exact discrete probability mass: P(X = x_0) = ΔF. A strictly continuous variable has an unbroken, smooth CDF with zero jump discontinuities.",
      mentorTip:
        "Look at the shape of the CDF! A smooth curve means purely continuous; a staircase means purely discrete; a curve with occasional jumps indicates a mixed random variable (like rainfall: mass at 0 mm, continuous for > 0 mm)."
    }
  ];

  const handleQuizSelect = (optLabel) => {
    setUserAnswer(optLabel);
    setShowFeedback(true);
  };

  const currentQuiz = quizData[selectedQuizIndex];
  const isCorrect = userAnswer === currentQuiz.correct;

  return (
    <div className="space-y-10 text-slate-200 leading-relaxed max-w-6xl mx-auto pb-16">
      {/* ========================================================================= */}
      {/* HERO HEADER */}
      {/* ========================================================================= */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              BCAC701B • Data Types and Preprocessing • Topic 4
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              MAKAUT Master Syllabus
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/40 rounded-full">
              Senior Mentor: Sukanta Hui
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Discrete and Continuous Variables: Counting vs Measuring
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-4xl">
            Distinguish countable isolated states (integers in{" "}
            <span className="text-cyan-400 font-mono">{"\\mathbb{Z}"}</span>) governed by{" "}
            <span className="text-indigo-400 font-semibold">Probability Mass Functions (PMF)</span>{" "}
            from uncountable continuous intervals (reals in{" "}
            <span className="text-cyan-400 font-mono">{"\\mathbb{R}"}</span>) governed by{" "}
            <span className="text-purple-400 font-semibold">Probability Density Functions (PDF)</span>.
            Master the continuous zero-probability paradox, count GLM log-link architectures, and optimal
            equal-width vs quantile discretization.
          </p>

          {/* Quick-Navigation Anchor Tabs */}
          <div className="flex flex-wrap gap-2 pt-3">
            {[
              { id: "noviceMasterclass", label: "1. Novice Masterclass & Jargon" },
              { id: "interactiveStudio", label: "2. Dual-Mode Visual Studio" },
              { id: "theory", label: "3. Mathematical Formulations" },
              { id: "caseStudies", label: "4. Regional Case Studies" },
              { id: "diagnosticQuiz", label: "5. Diagnostic Checkpoint Quiz" },
              { id: "bestPractices", label: "6. Pitfalls & Architecture" },
              { id: "labSection", label: "7. Executable Python Lab" },
              { id: "faqSection", label: "8. 30 Exam FAQs" },
              { id: "notesSection", label: "9. Printable Notes" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border",
                  activeTab === tab.id
                    ? "bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-600/30"
                    : "bg-slate-900/80 text-slate-300 border-slate-700/70 hover:bg-slate-800 hover:text-white"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* SECTION 1: NOVICE MASTERCLASS & JARGON BUSTER */}
      {/* ========================================================================= */}
      <section id="noviceMasterclass" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">
            01
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Novice Masterclass &amp; Concept Intuition
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Intuitive mental models, real-world analogies, and foundational terminology
            </p>
          </div>
        </div>

        {/* Intuition Lesson Sub-tabs */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4">
            {[
              { id: "intuition", label: "Lesson 1: The Elevator vs The Ramp" },
              { id: "zeroParadox", label: "Lesson 2: The Infinite Point Paradox (P=0)" },
              { id: "countHazard", label: "Lesson 3: The Linear Model Catastrophe on Counts" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedLessonTab(tab.id)}
                className={clsx(
                  "px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all",
                  selectedLessonTab === tab.id
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "bg-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {selectedLessonTab === "intuition" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-4">
                <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-cyan-950/80 text-cyan-400 border border-cyan-800">
                  Mental Model Analogy
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  The Elevator vs The Wheelchair Ramp
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Imagine an elevator in a building in Salt Lake Sector V. The elevator stops only at
                  discrete levels: Floor 0 (Ground), Floor 1, Floor 2, Floor 3. You cannot ask the
                  elevator to drop you off at <span className="text-cyan-400 font-mono">Floor 2.417</span>.
                  The states are isolated, separate, and countable with your fingers. This is a{" "}
                  <strong className="text-cyan-300">Discrete Variable</strong>.
                </p>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Now imagine walking up a smooth accessibility ramp outside the building. At any instant,
                  your exact altitude above sea level could be{" "}
                  <span className="text-purple-400 font-mono">12.3847291... meters</span>. There are
                  infinitely many possible altitudes between 12 meters and 13 meters, limited solely
                  by the precision of your laser altimeter. This is a{" "}
                  <strong className="text-purple-300">Continuous Variable</strong>.
                </p>
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400">
                  <strong className="text-indigo-400">Master Rule:</strong> If you measure a quantity
                  using a whole-number counting process (e.g. number of students, server errors, prior hospital visits),
                  it is <span className="text-cyan-400 font-bold">Discrete</span>. If you measure it with
                  an instrument along an unbroken continuum (e.g. temperature, blood pressure, duration in seconds),
                  it is <span className="text-purple-400 font-bold">Continuous</span>.
                </div>
              </div>

              {/* Visual Elevator vs Ramp Diagram */}
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Visual Architecture Comparison
                </div>
                <div className="grid grid-cols-2 gap-3 text-center text-xs">
                  <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/60 space-y-2">
                    <div className="text-2xl">🏢 🪜</div>
                    <div className="font-bold text-cyan-300">Discrete States</div>
                    <div className="text-slate-400 text-[11px]">
                      Countable steps: {"{0, 1, 2, 3, 4}"}
                    </div>
                    <div className="p-1.5 bg-cyan-900/30 rounded text-[11px] text-cyan-200 font-mono">
                      Gap between values &gt; 0
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Governed by PMF: P(X = k)
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-800/60 space-y-2">
                    <div className="text-2xl">📈 🌊</div>
                    <div className="font-bold text-purple-300">Continuous Spectrum</div>
                    <div className="text-slate-400 text-[11px]">
                      Unbroken continuum: [0.0, ∞)
                    </div>
                    <div className="p-1.5 bg-purple-900/30 rounded text-[11px] text-purple-200 font-mono">
                      Infinite real points in interval
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Governed by PDF: f(x)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedLessonTab === "zeroParadox" && (
            <div className="space-y-4">
              <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-purple-950/80 text-purple-400 border border-purple-800">
                Mathematical Paradox Explained
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Why {"P(X = 25.00000000...) = 0"} on Continuous Measurements
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                One of the most mind-bending statistical facts for machine learning engineers is that
                for any continuous variable (like temperature or weight), the probability of observing
                any <em>single exact mathematical point</em> is strictly zero!
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-amber-400 uppercase">
                    The Infinite Geometry Explanation
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Think of probability on a continuous curve as the <strong>area under the curve</strong>.
                    The formula for the area of a rectangle is{" "}
                    <span className="font-mono text-cyan-300">Width × Height</span>.
                    What is the width of a single mathematical point on a real number line?
                    The width is exactly <span className="font-mono text-red-400">0</span>!
                    Therefore:
                  </p>
                  <div className="p-2.5 bg-slate-900 rounded font-mono text-center text-xs text-indigo-300 border border-slate-800">
                    Area = Width (0) × Density (f(x)) = 0
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-emerald-400 uppercase">
                    How We Actually Measure Continuous Probabilities
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Because individual points have zero probability, we always integrate over a
                    meaningful tolerance interval <span className="font-mono text-emerald-300">[a, b]</span>:
                  </p>
                  <div className="p-2.5 bg-slate-900 rounded font-mono text-center text-xs text-emerald-300 border border-slate-800">
                    P(24.95 ≤ Temp ≤ 25.05) = ∫ f(x) dx &gt; 0
                  </div>
                  <p className="text-[11px] text-slate-400">
                    When someone says "the patient's temperature is 38.2°C", they actually mean the
                    measurement lies in the interval [38.15°C, 38.25°C] due to sensor quantization.
                  </p>
                </div>
              </div>
            </div>
          )}

          {selectedLessonTab === "countHazard" && (
            <div className="space-y-4">
              <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-rose-950/80 text-rose-400 border border-rose-800">
                Production Architecture Warning
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Why Standard Linear Regression Fails on Discrete Count Targets
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Suppose you are building a predictive model for Barrackpore Medicare Hospital to forecast
                the <em>number of emergency readmissions</em> for each discharged patient.
                Novice developers often blindly fit Ordinary Least Squares (OLS) or Mean Squared Error (MSE)
                loss: <span className="font-mono text-cyan-300">y_hat = w^T x + b</span>. This causes three fatal flaws:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-800/50 space-y-1.5">
                  <div className="font-bold text-rose-300 text-xs">1. Negative Predictions</div>
                  <p className="text-xs text-slate-400">
                    Linear models have support (-∞, ∞). For healthy patients, the line can predict{" "}
                    <span className="text-rose-400 font-mono">-1.8 readmissions</span>, which is physically impossible.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-800/50 space-y-1.5">
                  <div className="font-bold text-rose-300 text-xs">2. Homoscedasticity Violation</div>
                  <p className="text-xs text-slate-400">
                    OLS assumes constant residual variance. But in count data, high-risk cohorts naturally have
                    much higher variance than low-risk cohorts (Var scales with Mean).
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-800/50 space-y-1.5">
                  <div className="font-bold text-rose-300 text-xs">3. The Solution: Poisson GLM</div>
                  <p className="text-xs text-slate-400">
                    Use a Poisson Generalized Linear Model with a <strong>log-link function</strong>:
                    <br />
                    <span className="text-cyan-300 font-mono">λ = exp(w^T x)</span>. Since exp() &gt; 0, predictions
                    are guaranteed strictly non-negative!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Jargon Buster Interactive Dictionary */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>📚</span> Interactive Jargon Buster &amp; Exam Terminology
              </h3>
              <p className="text-xs text-slate-400">
                Search and filter core theoretical terms across probability, modeling, and binning
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search terms (e.g. Poisson, PDF, Binning)..."
                value={jargonSearchQuery}
                onChange={(e) => setJargonSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              {jargonSearchQuery && (
                <button
                  onClick={() => setJargonSearchQuery("")}
                  className="absolute right-2.5 top-2 text-xs text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: "All Concepts" },
              { id: "probability", label: "Probability & Distributions" },
              { id: "modeling", label: "Count Modeling & Loss" },
              { id: "binning", label: "Discretization & Binning" }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedJargonCategory(cat.id)}
                className={clsx(
                  "px-3 py-1 rounded-lg text-xs font-medium transition-all border",
                  selectedJargonCategory === cat.id
                    ? "bg-indigo-600/90 text-white border-indigo-400"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Jargon Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredJargon.map((item) => (
              <div
                key={item.term}
                className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-indigo-500/50 transition-all space-y-2 flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-white text-xs sm:text-sm">
                      {item.term}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-400">
                      {item.pronunciation}
                    </span>
                  </div>
                  <p className="text-xs text-indigo-300 font-medium">
                    {item.shortDef}
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.deepExplanation}
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-900">
                  <code className="text-[11px] font-mono text-cyan-300 bg-slate-900/90 px-2 py-1 rounded block overflow-x-auto">
                    {item.equation}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: DUAL-MODE VISUAL STUDIO */}
      {/* ========================================================================= */}
      <section id="interactiveStudio" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">
            02
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Dual-Mode Visual Laboratory Studio
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Interactive SVG distribution simulator (PMF vs PDF) and real-time discretization binning engine
            </p>
          </div>
        </div>

        {/* Studio Mode Switcher */}
        <div className="flex gap-2 p-1.5 bg-slate-900 rounded-xl border border-slate-800 max-w-md">
          <button
            onClick={() => setStudioMode("pmfPdf")}
            className={clsx(
              "flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all",
              studioMode === "pmfPdf"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "text-slate-400 hover:text-white"
            )}
          >
            Mode A: Discrete PMF vs Continuous PDF
          </button>
          <button
            onClick={() => setStudioMode("binningLab")}
            className={clsx(
              "flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all",
              studioMode === "binningLab"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "text-slate-400 hover:text-white"
            )}
          >
            Mode B: Discretization &amp; Binning Engine
          </button>
        </div>

        {/* ===================================================================== */}
        {/* STUDIO MODE A: PMF vs PDF */}
        {/* ===================================================================== */}
        {studioMode === "pmfPdf" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* PANEL 1: DISCRETE POISSON PMF */}
            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    Discrete Distribution: Poisson PMF
                  </h3>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300">
                  Support: {"k ∈ {0, 1, 2, ...}"}
                </span>
              </div>

              {/* Slider Controls */}
              <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800/80">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Arrival Rate (λ):</span>
                  <span className="font-mono text-cyan-400 font-bold">{poissonLambda}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="12"
                  step="0.5"
                  value={poissonLambda}
                  onChange={(e) => setPoissonLambda(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />

                <div className="pt-2 border-t border-slate-900 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-slate-400 block text-[11px]">Interval Min (k_a):</label>
                    <input
                      type="number"
                      min="0"
                      max={poissonRangeMax}
                      value={poissonRangeMin}
                      onChange={(e) => setPoissonRangeMin(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block text-[11px]">Interval Max (k_b):</label>
                    <input
                      type="number"
                      min={poissonRangeMin}
                      max={maxPoissonK}
                      value={poissonRangeMax}
                      onChange={(e) => setPoissonRangeMax(Math.min(maxPoissonK, parseInt(e.target.value) || 0))}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Live SVG Bar Chart */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="text-[11px] text-slate-400 flex justify-between pb-2">
                  <span>Probability Mass P(X = k)</span>
                  <span className="text-cyan-400 font-mono">
                    Interval Sum P({poissonRangeMin} ≤ X ≤ {poissonRangeMax}) ={" "}
                    <strong>{(poissonData.sumInterval * 100).toFixed(2)}%</strong>
                  </span>
                </div>

                <div className="h-48 w-full flex items-end gap-1.5 sm:gap-2 px-2 pt-6 pb-2 border-b border-l border-slate-800">
                  {poissonData.list.map((item) => {
                    const maxP = Math.max(...poissonData.list.map((d) => d.p));
                    const heightPct = (item.p / (maxP || 1)) * 88;
                    return (
                      <div
                        key={item.k}
                        className="flex-1 flex flex-col items-center justify-end h-full group relative"
                      >
                        {/* Tooltip on hover */}
                        <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 border border-slate-700 text-[10px] text-white px-1.5 py-0.5 rounded shadow pointer-events-none whitespace-nowrap z-20">
                          P(X={item.k}) = {item.p.toFixed(4)}
                        </div>

                        {/* Stem Bar */}
                        <div
                          style={{ height: `${Math.max(4, heightPct)}%` }}
                          className={clsx(
                            "w-full rounded-t transition-all duration-200",
                            item.inInterval
                              ? "bg-cyan-500 shadow-sm shadow-cyan-500/50"
                              : "bg-slate-700/60 hover:bg-slate-600"
                          )}
                        />
                        <span className="text-[9px] sm:text-[10px] text-slate-400 mt-1 font-mono">
                          {item.k}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Mathematical Insights Box */}
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 text-xs space-y-1">
                <div className="text-cyan-300 font-bold text-[11px] uppercase">
                  Discrete PMF Properties:
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-mono pt-1">
                  <div className="p-1.5 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-400">E[X] = λ: </span>
                    <strong className="text-white">{poissonLambda}</strong>
                  </div>
                  <div className="p-1.5 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-400">Var(X) = λ: </span>
                    <strong className="text-white">{poissonLambda}</strong>
                  </div>
                  <div className="p-1.5 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-400">Mode: </span>
                    <strong className="text-white">{Math.floor(poissonLambda)}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* PANEL 2: CONTINUOUS GAUSSIAN PDF */}
            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-purple-400 animate-pulse" />
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    Continuous Distribution: Gaussian PDF
                  </h3>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-purple-950 border border-purple-800 text-purple-300">
                  Support: {"x ∈ (-∞, ∞)"}
                </span>
              </div>

              {/* Slider Controls */}
              <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800/80">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="text-slate-400">Mean (μ):</span>
                      <span className="font-mono text-purple-400 font-bold">{gaussianMean}</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="30"
                      step="1"
                      value={gaussianMean}
                      onChange={(e) => setGaussianMean(parseFloat(e.target.value))}
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="text-slate-400">Std Dev (σ):</span>
                      <span className="font-mono text-purple-400 font-bold">{gaussianStd}</span>
                    </div>
                    <input
                      type="range"
                      min="1.5"
                      max="7.0"
                      step="0.5"
                      value={gaussianStd}
                      onChange={(e) => setGaussianStd(parseFloat(e.target.value))}
                      className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-900 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-slate-400 block text-[11px]">Interval Lower (a):</label>
                    <input
                      type="number"
                      step="0.5"
                      value={gaussianRangeMin}
                      onChange={(e) => setGaussianRangeMin(parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block text-[11px]">Interval Upper (b):</label>
                    <input
                      type="number"
                      step="0.5"
                      value={gaussianRangeMax}
                      onChange={(e) => setGaussianRangeMax(parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Live SVG Smooth Curve & Shaded Area */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="text-[11px] text-slate-400 flex justify-between pb-2">
                  <span>Continuous Density f(x)</span>
                  <span className="text-purple-400 font-mono">
                    Area P({gaussianRangeMin} ≤ X ≤ {gaussianRangeMax}) ={" "}
                    <strong>{(gaussianCurveData.pInterval * 100).toFixed(2)}%</strong>
                  </span>
                </div>

                <div className="h-48 w-full relative border-b border-l border-slate-800 px-1 pt-4 pb-2">
                  <svg
                    viewBox="0 0 500 180"
                    className="w-full h-full overflow-visible"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient id={`${svgId}-purpleGrad`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#a855f7" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#a855f7" stopOpacity="0.05" />
                      </linearGradient>
                    </defs>

                    {/* Shaded Area Polygon under [a, b] */}
                    {(() => {
                      const { points, maxDensity, xMin, xMax } = gaussianCurveData;
                      const intervalPts = points.filter((pt) => pt.inInterval);
                      if (intervalPts.length >= 2) {
                        const first = intervalPts[0];
                        const last = intervalPts[intervalPts.length - 1];
                        const toSvgX = (x) => ((x - xMin) / (xMax - xMin)) * 500;
                        const toSvgY = (y) => 180 - (y / (maxDensity * 1.15)) * 170;

                        const pathCoords = intervalPts
                          .map((pt) => `${toSvgX(pt.x)},${toSvgY(pt.density)}`)
                          .join(" ");

                        const polyPoints = `${toSvgX(first.x)},180 ${pathCoords} ${toSvgX(
                          last.x
                        )},180`;
                        return (
                          <polygon
                            points={polyPoints}
                            fill={`url(#${svgId}-purpleGrad)`}
                            stroke="#c084fc"
                            strokeWidth="1.5"
                          />
                        );
                      }
                      return null;
                    })()}

                    {/* Full Gaussian Curve Line */}
                    {(() => {
                      const { points, maxDensity, xMin, xMax } = gaussianCurveData;
                      const toSvgX = (x) => ((x - xMin) / (xMax - xMin)) * 500;
                      const toSvgY = (y) => 180 - (y / (maxDensity * 1.15)) * 170;

                      const d = points
                        .map(
                          (pt, idx) =>
                            `${idx === 0 ? "M" : "L"} ${toSvgX(pt.x)} ${toSvgY(pt.density)}`
                        )
                        .join(" ");

                      return (
                        <path
                          d={d}
                          fill="none"
                          stroke="#a855f7"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                      );
                    })()}
                  </svg>
                </div>

                <div className="flex justify-between text-[10px] text-slate-500 font-mono pt-1">
                  <span>{gaussianCurveData.xMin.toFixed(1)}</span>
                  <span className="text-purple-400 font-bold">μ = {gaussianMean}</span>
                  <span>{gaussianCurveData.xMax.toFixed(1)}</span>
                </div>
              </div>

              {/* Paradox Callout Box */}
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 text-xs space-y-1">
                <div className="text-purple-300 font-bold text-[11px] uppercase">
                  Continuous PDF Paradox Note:
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Notice that <span className="text-white font-mono">P(X = {gaussianMean}.0000) = 0</span>.
                  The curve height at the peak is{" "}
                  <span className="text-purple-300 font-mono">
                    f({gaussianMean}) = {gaussianPdf(gaussianMean, gaussianMean, gaussianStd).toFixed(3)}
                  </span>{" "}
                  (a density), while non-zero probability is exclusively measured over the shaded area
                  between <span className="text-white font-mono">{gaussianRangeMin}</span> and{" "}
                  <span className="text-white font-mono">{gaussianRangeMax}</span>.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================== */}
        {/* STUDIO MODE B: DISCRETIZATION & BINNING ENGINE */}
        {/* ===================================================================== */}
        {studioMode === "binningLab" && (
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <span>⚙️</span> Continuous Feature Discretizer (Barrackpore Medicare Cohort)
                </h3>
                <p className="text-xs text-slate-400">
                  Simulating 50 real-world emergency patient lengths of stay (hours) binned via Equal-Width vs Equal-Frequency
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Bin Strategy Radio */}
                <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
                  <button
                    onClick={() => setBinningStrategy("equalWidth")}
                    className={clsx(
                      "px-3 py-1 rounded-lg font-medium transition-all",
                      binningStrategy === "equalWidth"
                        ? "bg-indigo-600 text-white"
                        : "text-slate-400 hover:text-white"
                    )}
                  >
                    Equal-Width
                  </button>
                  <button
                    onClick={() => setBinningStrategy("equalFreq")}
                    className={clsx(
                      "px-3 py-1 rounded-lg font-medium transition-all",
                      binningStrategy === "equalFreq"
                        ? "bg-indigo-600 text-white"
                        : "text-slate-400 hover:text-white"
                    )}
                  >
                    Equal-Frequency (Quantile)
                  </button>
                </div>

                {/* Number of Bins Selector */}
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400">Bins (k):</span>
                  <select
                    value={numBins}
                    onChange={(e) => setNumBins(parseInt(e.target.value))}
                    className="bg-slate-950 border border-slate-700 text-cyan-300 font-bold rounded-lg px-2.5 py-1 text-xs"
                  >
                    <option value="3">3 Bins</option>
                    <option value="4">4 Bins (Quartiles)</option>
                    <option value="5">5 Bins (Quintiles)</option>
                    <option value="6">6 Bins</option>
                    <option value="8">8 Bins</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Continuous Strip Plot with Cut Points */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span className="font-semibold text-slate-300">
                  1D Continuous Strip Plot &amp; Cut Boundaries
                </span>
                <span className="text-[11px] font-mono">
                  Min: {binningAnalysis.minVal}h — Max: {binningAnalysis.maxVal}h
                </span>
              </div>

              {/* Strip Axis */}
              <div className="relative h-14 w-full bg-slate-900/60 rounded-lg border border-slate-800/80 px-3 flex items-center">
                {/* Data Points */}
                {binningAnalysis.data.map((val, idx) => {
                  const pct =
                    ((val - binningAnalysis.minVal) /
                      (binningAnalysis.maxVal - binningAnalysis.minVal)) *
                    96 + 2;
                  return (
                    <div
                      key={idx}
                      style={{ left: `${pct}%` }}
                      className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400/70 border border-cyan-300/40 hover:scale-150 transition-transform cursor-pointer"
                      title={`${val} hours`}
                    />
                  );
                })}

                {/* Vertical Cut Boundaries */}
                {binningAnalysis.cuts.map((cut, idx) => {
                  const pct =
                    ((cut - binningAnalysis.minVal) /
                      (binningAnalysis.maxVal - binningAnalysis.minVal)) *
                    96 + 2;
                  return (
                    <div
                      key={`cut-${idx}`}
                      style={{ left: `${pct}%` }}
                      className="absolute top-0 bottom-0 w-0.5 bg-rose-500 z-10 flex flex-col justify-between"
                    >
                      <span className="text-[9px] font-mono text-rose-400 font-bold -translate-x-1/2 -translate-y-3 bg-slate-950 px-1 rounded border border-rose-900/50">
                        {cut.toFixed(1)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Resulting Bin Histogram & Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Histogram Columns */}
              <div className="md:col-span-2 bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="text-xs font-bold text-slate-300 uppercase">
                  Discretized Bucket Distribution (N = {binningAnalysis.data.length})
                </div>

                <div className="space-y-2.5">
                  {binningAnalysis.bins.map((bin) => {
                    const maxCount = Math.max(...binningAnalysis.bins.map((b) => b.count));
                    const widthPct = (bin.count / (maxCount || 1)) * 100;
                    return (
                      <div key={bin.binIndex} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="font-mono text-slate-300">
                            Bin {bin.binIndex}: <strong className="text-cyan-400">{bin.label}</strong>
                          </span>
                          <span className="font-mono text-slate-400">
                            {bin.count} pts ({bin.pct}%) • Width: {bin.width.toFixed(1)}h
                          </span>
                        </div>
                        <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                          <div
                            style={{ width: `${Math.max(2, widthPct)}%` }}
                            className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full transition-all duration-300"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Diagnostic Comparison Card */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                    Strategy Diagnostics
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs space-y-1">
                    <div className="text-slate-400">Bin Count Std Dev:</div>
                    <div className="font-mono text-white font-bold">
                      {binningAnalysis.countStd.toFixed(2)} pts
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {binningStrategy === "equalFreq"
                        ? "Optimal ~0 (Balanced frequency)"
                        : "High variance due to skewed distribution"}
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs space-y-1">
                    <div className="text-slate-400">Bin Width Std Dev:</div>
                    <div className="font-mono text-white font-bold">
                      {binningAnalysis.widthStd.toFixed(2)} hours
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {binningStrategy === "equalWidth"
                        ? "Zero (Identical span across all bins)"
                        : "Varies dynamically to balance observation counts"}
                    </div>
                  </div>

                  {binningAnalysis.emptyBinsCount > 0 && (
                    <div className="p-2 rounded bg-amber-950/40 border border-amber-800/60 text-[11px] text-amber-300">
                      ⚠️ <strong>{binningAnalysis.emptyBinsCount} empty bin(s)</strong> detected!
                      Equal-width binning is suffering from outlier stretch.
                    </div>
                  )}
                </div>

                <div className="p-2.5 bg-indigo-950/30 rounded-lg border border-indigo-800/40 text-[11px] text-indigo-300">
                  <strong className="text-white">Recommendation:</strong>{" "}
                  {binningStrategy === "equalWidth"
                    ? "Equal-Width is ideal for uniformly distributed variables like exam score bands (0-20, 21-40...)."
                    : "Quantile binning is essential for skewed medical or financial durations to avoid creating empty or sparse buckets."}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: MATHEMATICAL FORMULATIONS */}
      {/* ========================================================================= */}
      <section id="theory" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-400 font-bold text-lg">
            03
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Rigorous Mathematical Foundations &amp; Formulations
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Axiomatic probability spaces, continuous integration, GLM link functions, and loss derivations
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* MATH CARD 1: DISCRETE PROBABILITY SPACE */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base">
                1. Discrete Random Variables &amp; PMF Axioms
              </h3>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                Summation: ∑
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Let random variable X take values in a countable support set{" "}
              <span className="text-cyan-400 font-mono">{"\\mathcal{X} = \\{x_1, x_2, \\dots\\} \\subseteq \\mathbb{Z}"}</span>.
              The Probability Mass Function assigns direct point probabilities satisfying Kolmogorov axioms:
            </p>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-cyan-300 space-y-2">
              <div>{"p(x_k) = P(X = x_k) \ge 0, \quad \forall x_k \in \mathcal{X}"}</div>
              <div>{"\sum_{k=1}^{\infty} p(x_k) = 1.0"}</div>
              <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-900">
                {"Expectation: E[X] = \sum x_k \cdot p(x_k)"}
                <br />
                {"Variance: Var(X) = \sum (x_k - \mu)^2 \cdot p(x_k)"}
              </div>
            </div>

            <p className="text-xs text-slate-400">
              The Cumulative Distribution Function (CDF) is a monotonic staircase step function with
              isolated jump discontinuities:
            </p>
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs text-slate-300">
              {"F(x) = P(X \le x) = \sum_{x_k \le x} p(x_k)"}
            </div>
          </div>

          {/* MATH CARD 2: CONTINUOUS PROBABILITY SPACE */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base">
                2. Continuous Random Variables &amp; PDF Axioms
              </h3>
              <span className="text-xs font-mono text-purple-400 bg-purple-950 px-2 py-0.5 rounded border border-purple-800">
                Integration: ∫
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Let random variable X take values in an uncountable continuum{" "}
              <span className="text-purple-400 font-mono">{"\\mathcal{X} \\subseteq \\mathbb{R}"}</span>.
              The Probability Density Function (PDF) f(x) represents infinitesimal density per unit length:
            </p>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-purple-300 space-y-2">
              <div>{"f(x) \ge 0, \quad \forall x \in \mathbb{R}"}</div>
              <div>{"\int_{-\infty}^{\infty} f(x) \, dx = 1.0"}</div>
              <div>{"P(a \le X \le b) = \int_{a}^{b} f(x) \, dx"}</div>
              <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-900">
                {"Expectation: E[X] = \int_{-\infty}^{\infty} x \cdot f(x) \, dx"}
              </div>
            </div>

            <p className="text-xs text-slate-400">
              The continuous CDF is smooth and continuously differentiable almost everywhere, with the
              fundamental relation:
            </p>
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs text-slate-300">
              {"F(x) = \int_{-\infty}^{x} f(u) \, du \implies f(x) = \frac{d}{dx} F(x)"}
            </div>
          </div>
        </div>

        {/* MATH CARD 3: COUNT TARGETS & GLM FORMULATION */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-white text-base">
              3. Generalized Linear Models (GLM) for Discrete Count Targets
            </h3>
            <span className="text-xs font-mono text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
              Log-Link: ln(λ) = w^T x
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3 text-xs text-slate-300">
              <p>
                When the target variable <span className="font-mono text-white">Y</span> represents discrete counts
                (e.g., number of traffic accidents, website visits, server faults), the Ordinary Least Squares (OLS)
                linear hypothesis <span className="font-mono text-red-400">y_hat = w^T x</span> fails because it assumes
                a Gaussian error distribution and can output negative values.
              </p>
              <p>
                In a <strong>Poisson GLM</strong>, we assume the conditional distribution is Poisson:
                <br />
                <span className="font-mono text-cyan-300">Y_i | X_i ~ Poisson(λ_i)</span>.
                To enforce strictly positive expected rates <span className="font-mono text-white">λ_i &gt; 0</span>,
                we apply the natural logarithm as the canonical link function:
              </p>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-center text-cyan-400">
                {"\ln(\lambda_i) = w^T x_i + b \iff \lambda_i = \exp(w^T x_i + b)"}
              </div>
            </div>

            <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-slate-300">
              <div className="text-amber-400 font-bold font-sans">Poisson Log-Likelihood Loss Derivation:</div>
              <p className="text-[11px] text-slate-400 font-sans">
                The joint likelihood of observing counts y_1, ..., y_N is:
              </p>
              <div className="text-amber-300 text-[11px]">
                {"L(w) = \prod_{i=1}^N \frac{\lambda_i^{y_i} e^{-\lambda_i}}{y_i!}"}
              </div>
              <p className="text-[11px] text-slate-400 font-sans">
                Taking the negative logarithm yields the convex Negative Log-Likelihood loss function minimized during gradient descent:
              </p>
              <div className="p-2.5 bg-slate-900 rounded border border-slate-800 text-emerald-400 text-[11px]">
                {"J(w) = \sum_{i=1}^N \left( \exp(w^T x_i) - y_i (w^T x_i) + \ln(y_i!) \right)"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: REGIONAL INDUSTRIAL CASE STUDIES */}
      {/* ========================================================================= */}
      <section id="caseStudies" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold text-lg">
            04
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Industrial Case Studies in West Bengal
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Real-world implementations across transportation, healthcare, and power utility grids
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* CASE 1 */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-cyan-950 text-cyan-400 border border-cyan-800">
                Transit Logistics
              </span>
              <h3 className="font-bold text-white text-sm sm:text-base">
                Kolkata Metro Turnstile Entry Flow (Esplanade Station)
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                <strong>Problem:</strong> Forecasting passenger arrivals per minute across 16 AFC smart-card turnstiles.
                Passenger counts are discrete integers (k = 0, 1, 2, ...).
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                <strong>Failure Mode:</strong> Fitting standard linear regression produced negative passenger predictions (-3.2 passengers/min) during late-night hours. Furthermore, during Durga Puja evening rush hours, the sample variance was 4.8× the mean (severe overdispersion).
              </p>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-cyan-300">
              <strong>Architectural Fix:</strong> Switched from Poisson to Negative Binomial GLM with dispersion parameter α = 0.42. Test set root mean squared error reduced by 28% with zero impossible negative predictions.
            </div>
          </div>

          {/* CASE 2 */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-purple-950 text-purple-400 border border-purple-800">
                Clinical Healthcare
              </span>
              <h3 className="font-bold text-white text-sm sm:text-base">
                Barrackpore Medicare Emergency ICU Stay Duration
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                <strong>Problem:</strong> Patient Length of Stay (LOS) is continuous (hours in [4.0, 360.0]). Clinicians required automated operational alerts for bed vacancy management.
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                <strong>Binning Decision:</strong> Equal-width binning with 4 bins created an empty upper bucket [270h, 360h] with only 1 patient. The hospital transitioned to Quantile Binning (Quartiles) defining 4 balanced triage cohorts: Rapid (≤18h), Moderate (18-36h), Extended (36-72h), and Critical (>72h).
              </p>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-purple-300">
              <strong>Architectural Fix:</strong> Quantile discretization allowed XGBoost to generate balanced decision thresholds without sparse-leaf overfitting in prolonged ICU stays.
            </div>
          </div>

          {/* CASE 3 */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-950 text-amber-400 border border-amber-800">
                Electrical Power Grid
              </span>
              <h3 className="font-bold text-white text-sm sm:text-base">
                WBSEDCL 33kV Substation Surge Trip Prediction
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                <strong>Problem:</strong> Predicting transformer fault trip counts per week in Durgapur-Asansol industrial belt. Continuous telemetry inputs: Voltage RMS (kV), Ambient Temp (°C). Target: Discrete trip count.
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                <strong>Sparsity Challenge:</strong> In 84% of substation weeks, zero trips occurred. Standard Poisson regression suffered from severe zero-deflation bias.
              </p>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-amber-300">
              <strong>Architectural Fix:</strong> Deployed a Zero-Inflated Poisson (ZIP) dual-stage model: Logistic classification identifies structural zero-trip states; Poisson regression estimates fault count for active surge states.
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: DIAGNOSTIC CHECKPOINT QUIZ */}
      {/* ========================================================================= */}
      <section id="diagnosticQuiz" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 font-bold text-lg">
            05
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Diagnostic Knowledge Checkpoint
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Verify your operational intuition with 5 scenario-based examination questions
            </p>
          </div>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-6">
          {/* Question Selector Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-4">
            {quizData.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => {
                  setSelectedQuizIndex(idx);
                  setUserAnswer(null);
                  setShowFeedback(false);
                }}
                className={clsx(
                  "px-3 py-1.5 rounded-xl text-xs font-semibold transition-all",
                  selectedQuizIndex === idx
                    ? "bg-amber-600 text-white shadow-md shadow-amber-600/30"
                    : "bg-slate-800/80 text-slate-400 hover:text-white"
                )}
              >
                Question {idx + 1}
              </button>
            ))}
          </div>

          {/* Active Question Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Scenario: {currentQuiz.scenario}
              </span>
            </div>

            <p className="text-sm sm:text-base text-white font-medium">
              {currentQuiz.question}
            </p>

            {/* Options */}
            <div className="grid grid-cols-1 gap-2.5 pt-2">
              {currentQuiz.options.map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => handleQuizSelect(opt.label)}
                  disabled={showFeedback}
                  className={clsx(
                    "text-left p-3.5 rounded-xl text-xs sm:text-sm border transition-all flex items-start gap-3",
                    showFeedback
                      ? opt.label === currentQuiz.correct
                        ? "bg-emerald-950/60 border-emerald-500 text-emerald-200"
                        : opt.label === userAnswer
                        ? "bg-rose-950/60 border-rose-500 text-rose-200"
                        : "bg-slate-950/50 border-slate-800 text-slate-500 opacity-60"
                      : "bg-slate-950 hover:bg-slate-800/80 border-slate-800 text-slate-300 hover:border-slate-700"
                  )}
                >
                  <span
                    className={clsx(
                      "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0",
                      showFeedback && opt.label === currentQuiz.correct
                        ? "bg-emerald-500 text-white"
                        : showFeedback && opt.label === userAnswer
                        ? "bg-rose-500 text-white"
                        : "bg-slate-800 text-slate-300"
                    )}
                  >
                    {opt.label}
                  </span>
                  <span>{opt.text}</span>
                </button>
              ))}
            </div>

            {/* Feedback Box */}
            {showFeedback && (
              <div
                className={clsx(
                  "p-4 rounded-xl border space-y-2 transition-all duration-300 animate-fadeIn",
                  isCorrect
                    ? "bg-emerald-950/40 border-emerald-500/50 text-emerald-300"
                    : "bg-rose-950/40 border-rose-500/50 text-rose-300"
                )}
              >
                <div className="flex items-center gap-2 font-bold text-sm">
                  <span>{isCorrect ? "✅ Correct Architecture Choice!" : "❌ Conceptual Misalignment"}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentQuiz.explanation}
                </p>
                <div className="pt-2 border-t border-slate-800/60 flex items-start gap-2 text-xs text-amber-300">
                  <span className="font-bold shrink-0">Sukanta Hui Mentor Tip:</span>
                  <span>{currentQuiz.mentorTip}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: ARCHITECTURE HAZARDS & BEST PRACTICES */}
      {/* ========================================================================= */}
      <section id="bestPractices" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400 font-bold text-lg">
            06
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Critical Architecture Pitfalls &amp; Engineering Best Practices
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Defensive data preparation guidelines for production machine learning systems
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 3 FATAL PITFALLS */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm sm:text-base border-b border-slate-800 pb-3">
              <span>⛔</span> 3 Fatal Preprocessing &amp; Modeling Pitfalls
            </div>

            <div className="space-y-3.5">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-rose-900/30 space-y-1">
                <div className="font-bold text-xs text-rose-300">
                  1. OLS / MSE on Integer Count Targets
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Fitting Ordinary Least Squares (Linear Regression) to predict counts can produce impossible
                  negative predictions and invalid confidence intervals due to variance heteroscedasticity.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-rose-900/30 space-y-1">
                <div className="font-bold text-xs text-rose-300">
                  2. Treating High-Precision Continuous Sensors as Categorical Classes
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Feeding unbinned continuous sensor values (e.g. temperature rounded to 0.001°C) into One-Hot Encoders
                  causes astronomical cardinality explosion, sparse matrices, and fatal out-of-memory crashes.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-rose-900/30 space-y-1">
                <div className="font-bold text-xs text-rose-300">
                  3. Indiscriminate Equal-Width Binning on Skewed Data
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Dividing long-tailed variables (e.g. server latencies, financial wealth) into equal-width buckets
                  creates nearly empty bins at the high end and dumps 95% of data into the first bin, destroying model variance.
                </p>
              </div>
            </div>
          </div>

          {/* 3 PRODUCTION BEST PRACTICES */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm sm:text-base border-b border-slate-800 pb-3">
              <span>🛡️</span> 3 Production Architecture Best Practices
            </div>

            <div className="space-y-3.5">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-900/30 space-y-1">
                <div className="font-bold text-xs text-emerald-300">
                  1. Deploy Poisson or Negative Binomial GLM / Tweedie Loss
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  For non-negative count targets, use Generalized Linear Models with a log-link function
                  (λ = exp(w^T x)) or XGBoost/LightGBM with <code className="text-cyan-400">objective='count:poisson'</code>.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-900/30 space-y-1">
                <div className="font-bold text-xs text-emerald-300">
                  2. Quantile Binning or Decision Tree Cut-Points for Discretization
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  When business scorecards require binning continuous features, use Quantile (equal-frequency)
                  binning or a shallow single-feature Decision Tree to find information-optimal boundary thresholds.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-900/30 space-y-1">
                <div className="font-bold text-xs text-emerald-300">
                  3. Verify Distribution Continuity with Kolmogorov-Smirnov (K-S) Tests
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Before fitting continuous models, test goodness-of-fit against theoretical reference CDFs using
                  non-parametric K-S tests or Q-Q plots to detect hidden quantization artifacts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: EXECUTABLE PYTHON LABORATORY */}
      {/* ========================================================================= */}
      <section id="labSection" className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">
            07
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Executable Python Laboratory Simulation
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Interactive standalone lab script executing PMF vs PDF evaluations, OLS failure demonstration, and binning transformations
            </p>
          </div>
        </div>

        <PythonFileLoader
          fileModule={labCode}
          title="discrete_and_continuous_variables_lab.py"
          highlightLines={[25, 65, 115, 155, 205, 245]}
        />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 8: FAQ TEMPLATE */}
      {/* ========================================================================= */}
      <section id="faqSection" className="space-y-4">
        <FAQTemplate
          title="Discrete and Continuous Variables — Frequently Asked Questions"
          questions={questions}
        />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 9: PRINTABLE REVISION NOTES */}
      {/* ========================================================================= */}
      <section id="notesSection" className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Discrete and Continuous Variables Study Notes"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 4 Note"
          downloadFileName="topic4_note.txt"
        />
      </section>

      {/* ========================================================================= */}
      {/* SECTION 10: TEACHER SUKANTA HUI MENTOR REFLECTION */}
      {/* ========================================================================= */}
      <section>
        <Teacher
          note="In machine learning and statistical engineering, the taxonomy between Discrete and Continuous variables is not merely a descriptive label—it dictates your entire loss function architecture. When modeling discrete events, respect the integrity of countable integers: never force a Gaussian square-error loss onto a process governed by Poisson arrival rates. When handling continuous measurements, respect the infinite spectrum: never commit the fallacy of expecting positive point mass probabilities, and bin with quantile intelligence rather than arbitrary equal spans. Master this foundation, and your models will stand rock-solid in production."
        />
      </section>
    </div>
  );
};

export default Topic4;
