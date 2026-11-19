import React, { useState, useId, useMemo } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import labCode from "./topic13_files/basic_outlier_detection_lab.py?raw";
import noteText from "./topic13_files/topic13_note.txt?raw";
import questions from "./topic13_files/topic13_questions.js";

// =============================================================================
// BENCHMARK DATASET: SALT LAKE & KOLKATA REAL ESTATE PROPERTY VALUATION
// =============================================================================

const PROPERTY_ROSTER = [
  { id: "PROP-01", location: "New Town Action Area I", sqft: 1250, priceSqft: 4500, type: "normal" },
  { id: "PROP-02", location: "Rajarhat Main Road", sqft: 1100, priceSqft: 4800, type: "normal" },
  { id: "PROP-03", location: "Kestopur VIP Road", sqft: 950, priceSqft: 5100, type: "normal" },
  { id: "PROP-04", location: "Salt Lake Sector II", sqft: 1400, priceSqft: 5200, type: "normal" },
  { id: "PROP-05", location: "New Town Action Area II", sqft: 1350, priceSqft: 5400, type: "normal" },
  { id: "PROP-06", location: "Salt Lake Sector I", sqft: 1600, priceSqft: 5600, type: "normal" },
  { id: "PROP-07", location: "EM Bypass Kasba Connector", sqft: 1500, priceSqft: 5800, type: "normal" },
  { id: "PROP-08", location: "Salt Lake Sector III", sqft: 1750, priceSqft: 6000, type: "normal" },
  { id: "PROP-09", location: "Dum Dum Park", sqft: 1050, priceSqft: 6200, type: "normal" },
  { id: "PROP-10", location: "Lake Town Block B", sqft: 1300, priceSqft: 6500, type: "normal" },
  { id: "PROP-11", location: "Ballygunge Circular Road", sqft: 1850, priceSqft: 7200, type: "normal" },
  { id: "PROP-12", location: "Alipore Park Place", sqft: 2200, priceSqft: 8000, type: "normal" },
  // Anomaly 1: Lower-tail clerical typo (dropped a zero: Rs 450 instead of 4,500)
  { id: "PROP-13", location: "Barrackpore Station Road", sqft: 900, priceSqft: 450, type: "clerical_typo", note: "Clerical typo: dropped a trailing zero" },
  // Anomaly 2: Upper-tail ultra-luxury penthouse
  { id: "PROP-14", location: "Park Street Penthouse Tower", sqft: 4500, priceSqft: 28000, type: "luxury_outlier", note: "Ultra-luxury high-rise penthouse" },
  // Anomaly 3: Upper-tail luxury penthouse creating MASKING
  { id: "PROP-15", location: "Salt Lake Sector V Luxury Suite", sqft: 5200, priceSqft: 32000, type: "luxury_outlier", note: "Clustered luxury penthouse" }
];

// =============================================================================
// JARGON & TAXONOMY DATA
// =============================================================================

const JARGON_TERMS = [
  {
    term: "Classical Z-Score",
    tag: "Parametric",
    desc: "Measures the signed distance from the sample mean in units of standard deviation: z = (x - mu) / sigma. Cutoff is typically |z| >= 3.0."
  },
  {
    term: "3-Sigma Rule (68-95-99.7)",
    tag: "Gaussian Theory",
    desc: "Under perfect normality, 99.73% of observations fall within 3 standard deviations of the mean. Tail probability beyond 3 sigmas is only 0.27%."
  },
  {
    term: "Tukey's Inner Fences",
    tag: "Non-Parametric",
    desc: "Established at [Q1 - 1.5*IQR, Q3 + 1.5*IQR]. Values outside inner fences are classified as Mild Outliers (plotted as hollow points in boxplots)."
  },
  {
    term: "Tukey's Outer Fences",
    tag: "Non-Parametric",
    desc: "Established at [Q1 - 3.0*IQR, Q3 + 3.0*IQR]. Values outside outer fences are classified as Extreme Outliers requiring aggressive audit."
  },
  {
    term: "Interquartile Range (IQR)",
    tag: "Order Statistics",
    desc: "The spread between the 75th percentile (Q3) and 25th percentile (Q1): IQR = Q3 - Q1. Possesses a 25% breakdown point."
  },
  {
    term: "Median Absolute Deviation (MAD)",
    tag: "Robust Scale",
    desc: "Median(|x_i - Median(X)|). Multiplied by 1.4826 (1/0.6745), it yields a consistent estimator of sigma with a 50% breakdown point."
  },
  {
    term: "Modified Z-Score",
    tag: "Robust Detection",
    desc: "Formulated by Iglewicz & Hoaglin: M_i = 0.6745 * (x_i - Median) / MAD. Standard cutoff is |M_i| >= 3.5, immune to clustered masking."
  },
  {
    term: "Quantile Trimming",
    tag: "Data Pipeline",
    desc: "Establishing fixed empirical percentile thresholds (e.g. 1st and 99th percentiles) and filtering or dropping records outside these boundaries."
  },
  {
    term: "Winsorization (Capping)",
    tag: "Remediation",
    desc: "Clamping extreme tail values to designated percentiles (e.g. 5th and 95th), preserving full sample size N while bounding feature variance."
  },
  {
    term: "Zero-MAD Pathology",
    tag: "Numerical Defect",
    desc: "When > 50% of observations in a column are identical (e.g. sparse zeros), MAD evaluates to 0, causing division-by-zero crashes."
  },
  {
    term: "Medcouple (MC)",
    tag: "Skewed Boxplot",
    desc: "A robust skewness estimator in [-1, 1] used in the Adjusted Boxplot to expand the upper fence and contract the lower fence on asymmetric data."
  },
  {
    term: "Preprocessing Data Leakage",
    tag: "MLOps Architecture",
    desc: "Computing outlier fences on the full dataset before splitting into train/test, corrupting model evaluation with test distribution leakage."
  }
];

// =============================================================================
// DIAGNOSTIC SCENARIO QUIZ
// =============================================================================

const DIAGNOSTIC_QUESTIONS = [
  {
    id: "scen-1",
    scenario: "Real Estate Masking Disaster",
    question: "Kolkata Municipal Corporation audits property valuations. 12 standard apartments range from ₹ 4,500 to ₹ 8,000/sq.ft., but two luxury penthouses are priced at ₹ 32,000/sq.ft. When applying a classical Z-score (|z| >= 3.0), ZERO outliers are detected. Why did Z-score fail?",
    options: [
      "Because the database had a missing index.",
      "Masking Pathology: The two penthouses inflated the sample standard deviation from ₹ 1,100 to ₹ 8,830, expanding the denominator of z = (x - mean)/s and artificially suppressing their own Z-scores below 3.0.",
      "Because Z-scores can only be computed on floating-point numbers.",
      "Because luxury penthouses are legally exempt from outlier detection."
    ],
    correctIndex: 1,
    rationale: "Classical standard deviation squares deviations from the mean. Extreme outliers inflate the denominator s so massively that computed Z-scores shrink (Masking). Tukey's IQR and Modified Z-Score (MAD) do not rely on sample variance and catch both penthouses easily.",
    mentorTip: "Sukanta Hui's Law: Never trust a classical Z-score when multiple clustered outliers are present in the same tail!"
  },
  {
    id: "scen-2",
    scenario: "Skewed Salary Asymmetric Fences",
    question: "In Salt Lake Sector V, software engineer salaries follow a heavy right-skewed distribution (Skewness = 2.4). An engineer applies symmetric Tukey fences: [Q1 - 1.5*IQR, Q3 + 1.5*IQR]. What operational failure occurs in production?",
    options: [
      "The lower fence becomes negative, while the upper fence cuts aggressively into the legitimate natural long tail, falsely discarding talented senior engineers.",
      "The algorithm enters an infinite loop.",
      "The salary column is converted to text strings.",
      "The median salary becomes zero."
    ],
    correctIndex: 0,
    rationale: "Symmetric fences assume a symmetric distribution. On heavily right-skewed data, Q3 + 1.5*IQR is too low for the long tail (falsely flagging normal high earners), while Q1 - 1.5*IQR produces an impossible negative threshold. The fix is the Medcouple Adjusted Boxplot or Log-Transformation.",
    mentorTip: "Always inspect skewness: If skewness > 1.0, use the Medcouple adjusted boxplot or log-transform before fencing."
  },
  {
    id: "scen-3",
    scenario: "Production Pipeline Zero-MAD Crash",
    question: "An automated feature engineering pipeline in a Kolkata FinTech firm runs Modified Z-Score: M_i = 0.6745 * (x_i - Median) / MAD on a `num_late_payments` column where 70% of customers have 0 late payments. The pipeline crashes with `ZeroDivisionError`. What happened?",
    options: [
      "Python 3.12 deprecated floating-point division.",
      "Because more than 50% of the values are zero, the median is 0, and the median of absolute deviations is also exactly 0! Dividing by MAD causes a ZeroDivisionError.",
      "Late payments cannot be processed using statistical methods.",
      "The GPU experienced memory exhaustion."
    ],
    correctIndex: 1,
    rationale: "The 'Zero-MAD Pathology' occurs when any single value constitutes > 50% of the dataset. Since the median deviation is 0, MAD = 0. Production code must include a fallback to Mean Absolute Deviation from the median or Tukey IQR.",
    mentorTip: "Always guard Modified Z-score with: `if mad == 0: mad = mean_absolute_deviation(x)`."
  },
  {
    id: "scen-4",
    scenario: "Cross-Validation Data Leakage",
    question: "A data scientist computes Tukey's fences on an entire customer dataset of 100,000 rows, drops 2,000 outliers, and THEN runs `train_test_split(df, test_size=0.2)`. Why does this violate production machine learning integrity?",
    options: [
      "Because test size should always be exactly 10%.",
      "Preprocessing Data Leakage: Outlier fences were computed using information from the test set, allowing test distribution properties to contaminate the training envelope and producing over-optimistic evaluation metrics.",
      "Because 2,000 rows is too small to matter.",
      "Because Tukey's method is only licensed for academic use."
    ],
    correctIndex: 1,
    rationale: "Any calculation that touches the entire dataset before splitting leaks test set distributional parameters into the training pipeline. Fences must be computed strictly on X_train, and those frozen boundaries must be applied to X_test.",
    mentorTip: "Golden Rule of Preprocessing: Split FIRST, fit fences on X_train ONLY, transform X_test using frozen boundaries."
  },
  {
    id: "scen-5",
    scenario: "Remediation Strategy Selection",
    question: "In training a PyTorch Deep Neural Network for loan risk assessment, transaction amounts exhibit occasional extreme spikes (₹ 10 Lakhs vs typical ₹ 2,000). The business team forbids deleting any customer transactions. What remediation preserves all rows while stabilizing gradients?",
    options: [
      "Multiply all transaction amounts by zero.",
      "Winsorization (Percentile Capping) at the 99th percentile: clamps extreme values to the 99th percentile value, preserving sample size N and customer history while eliminating gradient-exploding variance.",
      "Convert all numbers into categorical one-hot encoded vectors.",
      "Switch from PyTorch to Microsoft Excel."
    ],
    correctIndex: 1,
    rationale: "Winsorization bounds feature leverage and prevents exploding loss gradients without dropping a single customer record, satisfying both business retention requirements and deep learning numerical stability.",
    mentorTip: "When you cannot delete data, Winsorize at the 99th percentile and add an `is_capped_flag = 1` feature!"
  }
];

// =============================================================================
// MAIN COMPONENT: TOPIC 13
// =============================================================================

const Topic13 = () => {
  // Navigation & Studio State
  const [activeTab, setActiveTab] = useState("studio"); // 'studio', 'math', 'cases', 'pitfalls', 'workbench'
  const [studioMode, setStudioMode] = useState("arena"); // 'arena', 'playground', 'skewness'
  const [selectedMethod, setSelectedMethod] = useState("raw"); // 'raw', 'zscore', 'tukey', 'mad', 'winsorized'

  // Threshold Playground State (Mode B)
  const [zCutoff, setZCutoff] = useState(3.0);
  const [iqrMultiplier, setIqrMultiplier] = useState(1.5);
  const [madCutoff, setMadCutoff] = useState(3.5);

  // Skewness Challenge State (Mode C)
  const [distributionType, setDistributionType] = useState("skewed"); // 'skewed', 'gaussian'

  // Jargon search filter
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("ALL");

  // Diagnostic Quiz State
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const svgId = useId();

  // ---------------------------------------------------------------------------
  // REACTIVE COMPUTATIONS: MULTI-METHOD DETECTION ARENA
  // ---------------------------------------------------------------------------
  const arenaStats = useMemo(() => {
    const rawPrices = PROPERTY_ROSTER.map((p) => p.priceSqft);
    const n = rawPrices.length;
    const sorted = [...rawPrices].sort((a, b) => a - b);

    // Mean & StDev
    const mean = rawPrices.reduce((a, b) => a + b, 0) / n;
    const variance = rawPrices.reduce((a, b) => a + (b - mean) ** 2, 0) / (n - 1);
    const stdev = Math.sqrt(variance);

    // Median & MAD
    const median = n % 2 === 0 ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2 : sorted[Math.floor(n / 2)];
    const absDevs = rawPrices.map((x) => Math.abs(x - median)).sort((a, b) => a - b);
    const mad = n % 2 === 0 ? (absDevs[n / 2 - 1] + absDevs[n / 2]) / 2 : absDevs[Math.floor(n / 2)];

    // Tukey Quartiles (using linear interpolation)
    const getP = (p) => {
      const rank = (p / 100.0) * (n - 1);
      const k = Math.floor(rank);
      const d = rank - k;
      if (k >= n - 1) return sorted[n - 1];
      return sorted[k] + d * (sorted[k + 1] - sorted[k]);
    };
    const q1 = getP(25.0);
    const q3 = getP(75.0);
    const iqr = q3 - q1;

    // Fences
    const zLower = mean - zCutoff * stdev;
    const zUpper = mean + zCutoff * stdev;

    const iqrLower = q1 - iqrMultiplier * iqr;
    const iqrUpper = q3 + iqrMultiplier * iqr;

    const madOffset = (madCutoff * mad) / 0.6745;
    const madLower = median - madOffset;
    const madUpper = median + madOffset;

    // Winsorization (5th and 95th percentiles)
    const p5 = getP(5.0);
    const p95 = getP(95.0);
    const winsorizedPrices = rawPrices.map((x) => Math.min(Math.max(x, p5), p95));
    const winMean = winsorizedPrices.reduce((a, b) => a + b, 0) / n;
    const winVariance = winsorizedPrices.reduce((a, b) => a + (b - winMean) ** 2, 0) / (n - 1);
    const varReductionPct = ((1.0 - winVariance / variance) * 100).toFixed(1);

    // Count outliers for each method
    const zOutliers = rawPrices.filter((x) => x < zLower || x > zUpper).length;
    const iqrOutliers = rawPrices.filter((x) => x < iqrLower || x > iqrUpper).length;
    const madOutliers = rawPrices.filter((x) => x < madLower || x > madUpper).length;

    return {
      mean: mean.toFixed(1),
      stdev: stdev.toFixed(1),
      median: median.toFixed(1),
      mad: mad.toFixed(1),
      q1: q1.toFixed(1),
      q3: q3.toFixed(1),
      iqr: iqr.toFixed(1),
      zLower: zLower.toFixed(0),
      zUpper: zUpper.toFixed(0),
      iqrLower: iqrLower.toFixed(0),
      iqrUpper: iqrUpper.toFixed(0),
      madLower: madLower.toFixed(0),
      madUpper: madUpper.toFixed(0),
      zOutliers,
      iqrOutliers,
      madOutliers,
      varReductionPct
    };
  }, [zCutoff, iqrMultiplier, madCutoff]);

  // ---------------------------------------------------------------------------
  // JARGON FILTER
  // ---------------------------------------------------------------------------
  const filteredJargon = useMemo(() => {
    return JARGON_TERMS.filter((item) => {
      const matchesSearch =
        item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = selectedTag === "ALL" || item.tag === selectedTag;
      return matchesSearch && matchesTag;
    });
  }, [searchTerm, selectedTag]);

  const uniqueTags = useMemo(() => {
    const set = new Set(JARGON_TERMS.map((j) => j.tag));
    return ["ALL", ...Array.from(set)];
  }, []);

  // ---------------------------------------------------------------------------
  // QUIZ HANDLERS
  // ---------------------------------------------------------------------------
  const handleSelectOption = (qId, optionIdx) => {
    if (quizSubmitted) return;
    setQuizAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const quizScore = useMemo(() => {
    let score = 0;
    DIAGNOSTIC_QUESTIONS.forEach((q) => {
      if (quizAnswers[q.id] === q.correctIndex) score++;
    });
    return score;
  }, [quizAnswers]);

  return (
    <div className="space-y-12 text-slate-200 leading-relaxed max-w-7xl mx-auto pb-20 font-sans">
      {/* =====================================================================
          HERO BANNER & ACADEMIC HEADER
          ===================================================================== */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 sm:p-10 rounded-3xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full shadow-inner">
              BCAC701B • Data Types and Preprocessing • Topic 13
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Univariate &amp; Robust Detection
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              MAKAUT &amp; Gate CS Aligned
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Basic Outlier Detection Algorithms &amp; Fencing Mechanics
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl leading-relaxed">
            Master the four foundational univariate outlier detection engines: the Gaussian <strong>Classical Z-Score</strong>{" "}
            (3-sigma rule), John Tukey's non-parametric <strong>IQR Fences</strong> (1.5x and 3.0x), Boris Iglewicz &amp;
            David Hoaglin's robust <strong>Modified Z-Score</strong> (MAD), and <strong>Winsorization</strong> across real-world
            West Bengal property valuations and FinTech fraud gateways.
          </p>

          {/* STICKY NAVIGATION JUMP BAR */}
          <div className="pt-4 border-t border-indigo-800/30">
            <nav className="flex flex-wrap gap-2 text-xs sm:text-sm font-medium">
              {[
                { id: "#novice-metaphors", label: "1. Novice Masterclass" },
                { id: "#taxonomy-flow", label: "2. Detection Taxonomy" },
                { id: "#interactive-studio", label: "3. Detection Studio" },
                { id: "#math-formulation", label: "4. Mathematical Theorems" },
                { id: "#skewness-lab", label: "5. Skewness & Masking Lab" },
                { id: "#case-studies", label: "6. Regional Case Studies" },
                { id: "#diagnostic-quiz", label: "7. Diagnostic Assessment" },
                { id: "#production-pitfalls", label: "8. Engineering Pitfalls" },
                { id: "#practical-workbench", label: "9. Practical Workbench" }
              ].map((link) => (
                <a
                  key={link.id}
                  href={link.id}
                  className="px-3 py-1.5 rounded-lg bg-slate-800/70 hover:bg-indigo-600 hover:text-white text-slate-300 border border-slate-700/60 transition-colors duration-150"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* =====================================================================
          SECTION 1: NOVICE MASTERCLASS (METAPHORS & JARGON BUSTER)
          ===================================================================== */}
      <section id="novice-metaphors" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-8 bg-indigo-500 rounded-full" />
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
            1. Novice Masterclass: Core Intuition &amp; Jargon Buster
          </h2>
        </div>

        {/* METAPHORS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/80 p-6 rounded-2xl border border-indigo-900/40 shadow-lg space-y-3 relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-lg">
              📏
            </div>
            <h3 className="text-lg font-bold text-indigo-200">The Bell Curve Ruler</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              The <strong>Classical Z-Score</strong> measures distance in units of standard deviation from the average.
              It assumes data behaves like an orderly Gaussian bell curve where 99.73% of points live within 3 standard
              deviations. However, if an extreme giant walks into the room, the ruler itself expands, blinding the detector!
            </p>
            <div className="text-xs text-indigo-400 font-mono bg-indigo-950/60 p-2.5 rounded-lg border border-indigo-800/40">
              Analogy: Z-Score = A flexible rubber ruler that stretches whenever giants are present.
            </div>
          </div>

          <div className="bg-slate-900/80 p-6 rounded-2xl border border-cyan-900/40 shadow-lg space-y-3 relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-lg">
              🚧
            </div>
            <h3 className="text-lg font-bold text-cyan-200">The Boxplot Electric Fence</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              <strong>Tukey's IQR Fences</strong> ignore extreme values entirely by focusing strictly on the middle 50%
              of data (between the 25th and 75th percentiles). Fences are placed at 1.5x the box height. Anything
              leaping over the fence is declared an outlier, completely immune to single-point variance distortion.
            </p>
            <div className="text-xs text-cyan-400 font-mono bg-cyan-950/60 p-2.5 rounded-lg border border-cyan-800/40">
              Analogy: Tukey IQR = A rigid fence built using the height of average citizens, ignoring giants.
            </div>
          </div>

          <div className="bg-slate-900/80 p-6 rounded-2xl border border-emerald-900/40 shadow-lg space-y-3 relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg">
              🛡️
            </div>
            <h3 className="text-lg font-bold text-emerald-200">The Bodyguard Scale</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              The <strong>Modified Z-Score (MAD)</strong> uses the Median and the Median Absolute Deviation.
              Even if up to 50% of the entire dataset is corrupted by extreme clustered outliers, the bodyguard scale
              refuses to break, successfully isolating masked anomalies that deceive standard Z-scores.
            </p>
            <div className="text-xs text-emerald-400 font-mono bg-emerald-950/60 p-2.5 rounded-lg border border-emerald-800/40">
              Analogy: MAD Scale = An armored scale with a 50% breakdown point proof against sabotage.
            </div>
          </div>
        </div>

        {/* SEARCHABLE JARGON BUSTER */}
        <div className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-5">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>📚</span> Searchable Jargon Buster (12 Core Terms)
              </h3>
              <p className="text-xs text-slate-400">
                Filter by topic tag or search any outlier detection, fencing, or scale estimation concept.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search detection concept..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-950 border border-slate-700 text-sm px-3.5 py-1.5 rounded-lg text-white focus:outline-none focus:border-indigo-500 w-full sm:w-64"
              />
            </div>
          </div>

          {/* TAG PILLS */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {uniqueTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={clsx(
                  "px-3 py-1 text-xs rounded-full font-semibold transition-colors duration-150",
                  selectedTag === tag
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-slate-700/60"
                )}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* JARGON CARDS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {filteredJargon.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80 hover:border-indigo-500/40 transition-colors duration-200 space-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-sm font-bold text-indigo-300">{item.term}</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-indigo-400 border border-slate-700">
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 2: DETECTION METHOD TAXONOMY & COMPARISON MATRIX
          ===================================================================== */}
      <section id="taxonomy-flow" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-8 bg-cyan-500 rounded-full" />
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
            2. Foundational Detection Engines: Architectural Comparison
          </h2>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-800 shadow-xl bg-slate-900/90">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-950 text-slate-300 uppercase font-semibold text-[11px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Algorithm</th>
                <th className="p-4">Distribution Assumption</th>
                <th className="p-4">Breakdown Point (ε*)</th>
                <th className="p-4">Standard Cutoff</th>
                <th className="p-4">Masking Vulnerability</th>
                <th className="p-4">Best Used For</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr className="hover:bg-slate-800/30">
                <td className="p-4 font-bold text-indigo-300">
                  Classical Z-Score
                  <div className="text-xs text-slate-400 font-normal">z = (x - μ) / σ</div>
                </td>
                <td className="p-4 text-xs font-mono text-cyan-300">Gaussian Normal N(μ, σ²)</td>
                <td className="p-4 text-xs font-mono text-red-400 font-bold">0% (Fragile)</td>
                <td className="p-4 text-xs font-mono">|z| &ge; 3.0 (or 2.5)</td>
                <td className="p-4 text-xs text-red-400 font-semibold">Severe (Variance explodes)</td>
                <td className="p-4 text-xs">Symmetric, unpolluted Gaussian telemetry</td>
              </tr>

              <tr className="hover:bg-slate-800/30">
                <td className="p-4 font-bold text-cyan-300">
                  Tukey's IQR Fences
                  <div className="text-xs text-slate-400 font-normal">[Q1 - 1.5*IQR, Q3 + 1.5*IQR]</div>
                </td>
                <td className="p-4 text-xs font-mono text-emerald-400 font-bold">Distribution-Free (Non-parametric)</td>
                <td className="p-4 text-xs font-mono text-emerald-400 font-bold">25% (Robust)</td>
                <td className="p-4 text-xs font-mono">1.5x Mild / 3.0x Extreme</td>
                <td className="p-4 text-xs text-emerald-400 font-semibold">Low (Immune up to 25%)</td>
                <td className="p-4 text-xs">Exploratory analysis, boxplots, general tabular data</td>
              </tr>

              <tr className="hover:bg-slate-800/30">
                <td className="p-4 font-bold text-emerald-300">
                  Modified Z-Score (MAD)
                  <div className="text-xs text-slate-400 font-normal">M_i = 0.6745*(x - Med) / MAD</div>
                </td>
                <td className="p-4 text-xs font-mono text-emerald-400 font-bold">Heavy Contamination Resilience</td>
                <td className="p-4 text-xs font-mono text-emerald-400 font-bold">50% (Maximal)</td>
                <td className="p-4 text-xs font-mono">|M_i| &ge; 3.5 (NIST)</td>
                <td className="p-4 text-xs text-emerald-400 font-semibold">Zero (Immune to Masking)</td>
                <td className="p-4 text-xs">Clustered outliers, sensor spikes, small datasets</td>
              </tr>

              <tr className="hover:bg-slate-800/30">
                <td className="p-4 font-bold text-purple-300">
                  Quantile Trimming
                  <div className="text-xs text-slate-400 font-normal">[P_1%, P_99%]</div>
                </td>
                <td className="p-4 text-xs font-mono text-emerald-400">Distribution-Free Empirical</td>
                <td className="p-4 text-xs font-mono text-cyan-300">Equal to trimming fraction α</td>
                <td className="p-4 text-xs font-mono">1st &amp; 99th Percentiles</td>
                <td className="p-4 text-xs text-cyan-400 font-semibold">None (Pre-fixed bounds)</td>
                <td className="p-4 text-xs">High-throughput streaming, latency telemetry</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* =====================================================================
          SECTION 3: INTERACTIVE OUTLIER DETECTION STUDIO (3 MODES)
          ===================================================================== */}
      <section id="interactive-studio" className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-8 bg-indigo-500 rounded-full" />
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                3. Interactive Outlier Detection Studio
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Compare detection engines on Kolkata real estate, tune threshold sliders, and observe skewness resilience.
              </p>
            </div>
          </div>

          {/* STUDIO MODE TABS */}
          <div className="flex p-1 bg-slate-900 border border-slate-800 rounded-xl">
            {[
              { id: "arena", label: "Mode A: Multi-Method Arena" },
              { id: "playground", label: "Mode B: Threshold Playground" },
              { id: "skewness", label: "Mode C: Skewness Challenge" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStudioMode(tab.id)}
                className={clsx(
                  "px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all duration-150",
                  studioMode === tab.id
                    ? "bg-indigo-600 text-white shadow"
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* -------------------------------------------------------------------
            MODE A: MULTI-METHOD DETECTION ARENA (KOLKATA REAL ESTATE)
            ------------------------------------------------------------------- */}
        {studioMode === "arena" && (
          <div className="bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-indigo-900/40 shadow-2xl space-y-6">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>🏢</span> Kolkata Real Estate Property Valuation Arena (₹ / Sq.Ft.)
                </h3>
                <p className="text-xs text-slate-400">
                  Contains 12 standard flats (₹ 4,500 - 8,000), 1 lower-tail typo (₹ 450), and 2 luxury penthouses (₹ 28,000 &amp; 32,000).
                </p>
              </div>

              {/* METHOD SELECTOR */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: "raw", label: "1. Raw Telemetry" },
                  { id: "zscore", label: "2. Classical Z-Score (|z| ≥ 3.0)" },
                  { id: "tukey", label: "3. Tukey IQR (1.5x Fences)" },
                  { id: "mad", label: "4. Modified Z-Score (MAD ≥ 3.5)" },
                  { id: "winsorized", label: "5. Winsorized (5th/95th Capped)" }
                ].map((btn) => (
                  <button
                    key={btn.id}
                    onClick={() => setSelectedMethod(btn.id)}
                    className={clsx(
                      "px-3 py-1.5 text-xs font-semibold rounded-lg transition-all border",
                      selectedMethod === btn.id
                        ? "bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/30"
                        : "bg-slate-950 text-slate-300 border-slate-800 hover:border-indigo-500/50"
                    )}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>

            {/* DYNAMIC TELEMETRY BOARD */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Outliers Flagged</span>
                <span className={clsx(
                  "text-2xl font-extrabold font-mono",
                  selectedMethod === "zscore" ? "text-amber-400" : selectedMethod === "raw" ? "text-slate-400" : "text-emerald-400"
                )}>
                  {selectedMethod === "raw" ? "0 (Unfiltered)" : selectedMethod === "zscore" ? `${arenaStats.zOutliers} (Masked!)` : selectedMethod === "tukey" ? `${arenaStats.iqrOutliers} Outliers` : selectedMethod === "mad" ? `${arenaStats.madOutliers} Outliers` : "0 (Capped)"}
                </span>
                <span className="text-[10px] text-slate-500 block">
                  {selectedMethod === "zscore" ? "Classical Z-Score fails due to Masking" : "Identifies clerical typo & penthouses"}
                </span>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Lower Boundary Fence</span>
                <span className="text-2xl font-extrabold text-cyan-400 font-mono">
                  {selectedMethod === "zscore" ? `₹ ${arenaStats.zLower}` : selectedMethod === "tukey" ? `₹ ${arenaStats.iqrLower}` : selectedMethod === "mad" ? `₹ ${arenaStats.madLower}` : "₹ 4,500 (P5)"}
                </span>
                <span className="text-[10px] text-slate-500 block">
                  {selectedMethod === "zscore" ? "Nonsensical negative lower bound!" : "Robust lower fence"}
                </span>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Upper Boundary Fence</span>
                <span className="text-2xl font-extrabold text-indigo-400 font-mono">
                  {selectedMethod === "zscore" ? `₹ ${arenaStats.zUpper}` : selectedMethod === "tukey" ? `₹ ${arenaStats.iqrUpper}` : selectedMethod === "mad" ? `₹ ${arenaStats.madUpper}` : "₹ 29,200 (P95)"}
                </span>
                <span className="text-[10px] text-slate-500 block">
                  {selectedMethod === "zscore" ? "Inflated to ₹ 35k by penthouses!" : "Upper threshold cuts off outliers"}
                </span>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Variance Stabilization</span>
                <span className="text-2xl font-extrabold text-emerald-400 font-mono">
                  {selectedMethod === "winsorized" ? `-${arenaStats.varReductionPct}%` : "0.0%"}
                </span>
                <span className="text-[10px] text-slate-500 block">
                  {selectedMethod === "winsorized" ? "Explosive variance successfully capped" : "Raw variance: 77.9M"}
                </span>
              </div>
            </div>

            {/* PROPERTY TABLE */}
            <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-900 text-slate-300 uppercase font-semibold text-[11px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">Property ID</th>
                    <th className="p-3.5">Neighborhood / Location</th>
                    <th className="p-3.5">Area (Sq.Ft.)</th>
                    <th className="p-3.5">Raw Price / Sq.Ft.</th>
                    <th className="p-3.5">Processed Value</th>
                    <th className="p-3.5">Detection Verdict</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-sans">
                  {PROPERTY_ROSTER.map((prop) => {
                    const isTypo = prop.priceSqft === 450;
                    const isPenthouse = prop.priceSqft >= 28000;
                    const isAnomaly = isTypo || isPenthouse;

                    let isFlagged = false;
                    let displayVal = prop.priceSqft;
                    let badgeText = "NORMAL INLIER";
                    let badgeClass = "bg-emerald-500/20 text-emerald-300 border-emerald-500/40";

                    if (selectedMethod === "zscore") {
                      // Classical Z-score fails due to masking (flags 0)
                      isFlagged = false;
                      if (isAnomaly) {
                        badgeText = "MASKED BY INFLATED STDEV (Escaped Detection!)";
                        badgeClass = "bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold";
                      }
                    } else if (selectedMethod === "tukey") {
                      if (isTypo) {
                        isFlagged = true;
                        badgeText = "MILD OUTLIER (< Lower Fence ₹ 2,600)";
                        badgeClass = "bg-red-500/20 text-red-300 border-red-500/40 font-bold";
                      } else if (isPenthouse) {
                        isFlagged = true;
                        badgeText = "EXTREME OUTLIER (> Upper Fence ₹ 9,400)";
                        badgeClass = "bg-red-500/20 text-red-300 border-red-500/40 font-bold";
                      }
                    } else if (selectedMethod === "mad") {
                      if (isTypo) {
                        isFlagged = true;
                        badgeText = "CAUGHT BY MAD (|M_i| = 5.16 >= 3.5)";
                        badgeClass = "bg-red-500/20 text-red-300 border-red-500/40 font-bold";
                      } else if (isPenthouse) {
                        isFlagged = true;
                        badgeText = "CAUGHT BY MAD (|M_i| >= 21.4 >= 3.5)";
                        badgeClass = "bg-red-500/20 text-red-300 border-red-500/40 font-bold";
                      }
                    } else if (selectedMethod === "winsorized") {
                      if (isTypo) {
                        displayVal = 4620; // Capped at P5
                        badgeText = "WINSORIZED: Capped from ₹ 450 to ₹ 4,620";
                        badgeClass = "bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-bold";
                      } else if (isPenthouse) {
                        displayVal = 29200; // Capped at P95
                        badgeText = `WINSORIZED: Capped from ₹ ${prop.priceSqft.toLocaleString()} to ₹ 29,200`;
                        badgeClass = "bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-bold";
                      }
                    }

                    return (
                      <tr
                        key={prop.id}
                        className={clsx(
                          "transition-colors duration-150",
                          isFlagged && "bg-red-950/20 border-l-4 border-red-500",
                          !isFlagged && isAnomaly && selectedMethod === "zscore" && "bg-amber-950/20 border-l-4 border-amber-500",
                          !isAnomaly && "hover:bg-slate-900/50"
                        )}
                      >
                        <td className="p-3.5 font-mono text-slate-400">{prop.id}</td>
                        <td className="p-3.5 font-semibold text-white">{prop.location}</td>
                        <td className="p-3.5 font-mono text-slate-300">{prop.sqft} sq.ft</td>
                        <td className="p-3.5 font-mono text-cyan-300 font-bold">₹ {prop.priceSqft.toLocaleString()}</td>
                        <td className="p-3.5 font-mono text-emerald-300 font-bold">₹ {displayVal.toLocaleString()}</td>
                        <td className="p-3.5">
                          <span className={clsx("px-2.5 py-0.5 rounded-full text-[10px] font-bold border", badgeClass)}>
                            {badgeText}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-indigo-900/30 text-xs text-slate-300 space-y-2">
              <span className="text-indigo-400 font-bold block">💡 Critical Engineering Insight:</span>
              <p>
                Notice what happens when selecting <strong>2. Classical Z-Score</strong>: exactly <strong>ZERO outliers are detected</strong>!
                The two luxury penthouses (₹ 28,000 and ₹ 32,000) inflated the sample standard deviation to ₹ 8,830, pushing the 3-sigma upper boundary all the way to <strong>₹ 35,206</strong>!
                Meanwhile, the lower bound became <strong>-₹ 17,773</strong> (a physical impossibility for real estate prices), completely missing the clerical typo of ₹ 450.
                Switching to <strong>3. Tukey IQR</strong> or <strong>4. Modified Z-Score (MAD)</strong> instantly detects all 3 anomalies because their order-statistic estimators cannot be sabotaged by extreme variance!
              </p>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------------
            MODE B: INTERACTIVE THRESHOLD PLAYGROUND
            ------------------------------------------------------------------- */}
        {studioMode === "playground" && (
          <div className="bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-cyan-900/40 shadow-2xl space-y-6">
            <div className="pb-4 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>🎛️</span> Dynamic Threshold &amp; Cutoff Tuner
              </h3>
              <p className="text-xs text-slate-400">
                Adjust cutoffs to watch how tightening or loosening decision boundaries alters anomaly sensitivity in real time.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-300">Z-Score Cutoff (k_z):</span>
                  <span className="text-indigo-400 font-mono">|z| &ge; {zCutoff.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="1.5"
                  max="4.0"
                  step="0.1"
                  value={zCutoff}
                  onChange={(e) => setZCutoff(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500"
                />
                <span className="text-[10px] text-slate-500 block">Flagged Outliers: {arenaStats.zOutliers}</span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-300">Tukey IQR Multiplier (k):</span>
                  <span className="text-cyan-400 font-mono">{iqrMultiplier.toFixed(1)}x IQR</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="3.5"
                  step="0.1"
                  value={iqrMultiplier}
                  onChange={(e) => setIqrMultiplier(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500"
                />
                <span className="text-[10px] text-slate-500 block">Flagged Outliers: {arenaStats.iqrOutliers}</span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-300">Modified Z Cutoff:</span>
                  <span className="text-emerald-400 font-mono">|M_i| &ge; {madCutoff.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="2.0"
                  max="5.0"
                  step="0.1"
                  value={madCutoff}
                  onChange={(e) => setMadCutoff(parseFloat(e.target.value))}
                  className="w-full accent-emerald-500"
                />
                <span className="text-[10px] text-slate-500 block">Flagged Outliers: {arenaStats.madOutliers}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-950/80 p-4 rounded-xl border border-indigo-950 space-y-1">
                <span className="text-xs font-bold text-indigo-300 block">Z-Score Envelope:</span>
                <span className="text-lg font-mono font-extrabold text-white">[{arenaStats.zLower}, {arenaStats.zUpper}]</span>
                <span className="text-[11px] text-slate-400 block">Width: {(parseFloat(arenaStats.zUpper) - parseFloat(arenaStats.zLower)).toLocaleString()}</span>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-xl border border-cyan-950 space-y-1">
                <span className="text-xs font-bold text-cyan-300 block">Tukey Fences:</span>
                <span className="text-lg font-mono font-extrabold text-white">[{arenaStats.iqrLower}, {arenaStats.iqrUpper}]</span>
                <span className="text-[11px] text-slate-400 block">Width: {(parseFloat(arenaStats.iqrUpper) - parseFloat(arenaStats.iqrLower)).toLocaleString()}</span>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-xl border border-emerald-950 space-y-1">
                <span className="text-xs font-bold text-emerald-300 block">MAD Effective Bounds:</span>
                <span className="text-lg font-mono font-extrabold text-white">[{arenaStats.madLower}, {arenaStats.madUpper}]</span>
                <span className="text-[11px] text-slate-400 block">Width: {(parseFloat(arenaStats.madUpper) - parseFloat(arenaStats.madLower)).toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------------
            MODE C: SKEWNESS & MASKING CHALLENGE
            ------------------------------------------------------------------- */}
        {studioMode === "skewness" && (
          <div className="bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-emerald-900/40 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>📉</span> The Skewness Pathology: Normal vs Log-Normal
                </h3>
                <p className="text-xs text-slate-400">
                  Compare how symmetrical Gaussian data vs skewed real-world data affects boundary fences.
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setDistributionType("gaussian")}
                  className={clsx(
                    "px-3 py-1.5 text-xs font-semibold rounded-lg border",
                    distributionType === "gaussian"
                      ? "bg-emerald-600 text-white border-emerald-500 shadow-md"
                      : "bg-slate-950 text-slate-400 border-slate-800"
                  )}
                >
                  Symmetric Gaussian
                </button>
                <button
                  onClick={() => setDistributionType("skewed")}
                  className={clsx(
                    "px-3 py-1.5 text-xs font-semibold rounded-lg border",
                    distributionType === "skewed"
                      ? "bg-emerald-600 text-white border-emerald-500 shadow-md"
                      : "bg-slate-950 text-slate-400 border-slate-800"
                  )}
                >
                  Heavily Right-Skewed (Bengal Real Estate)
                </button>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              {distributionType === "gaussian" ? (
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-emerald-400">✔ Symmetrical Gaussian Distribution</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Under a true normal distribution (e.g. Mean = 50.0, StDev = 5.0), the Classical Z-Score, Tukey's IQR, and Modified Z-Score all produce concordant fences!
                    The 3-sigma fence is [35.0, 65.0], capturing 99.73% of data. Masking does not occur because variance is modest and uncontaminated.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-amber-400">⚠️ Heavily Right-Skewed Empirical Distribution</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    When data represents income or property prices, the long right tail inflates the sample variance, dragging the mean to the right.
                    Classical Z-score produces a negative lower bound (<strong>-₹ 17,773</strong>) and an over-inflated upper bound (<strong>₹ 35,206</strong>).
                    Tukey's IQR and Modified Z-Score stay anchored to order statistics, establishing robust bounds at ~₹ 2,600 and ~₹ 9,400.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* =====================================================================
          SECTION 4: MATHEMATICAL FORMULATIONS & PROOFS
          ===================================================================== */}
      <section id="math-formulation" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-8 bg-indigo-500 rounded-full" />
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
            4. Mathematical Formulations &amp; Theoretical Proofs
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Z SCORE */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-indigo-900/40 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-indigo-300 flex items-center gap-2">
              <span>📐</span> 1. Classical Z-Score Formulation
            </h3>
            <div className="bg-slate-950 p-4 rounded-xl border border-indigo-950 font-mono text-xs text-indigo-200 overflow-x-auto">
              {"z_i = (x_i - μ) / σ,   Decision: |z_i| ≥ 3.0"}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Assumes Gaussian normality X ~ N(μ, σ²). In practical computing, μ and σ are estimated by sample mean x̄ and sample standard deviation s, giving the estimator a 0% breakdown point.
            </p>
          </div>

          {/* TUKEY IQR */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-cyan-900/40 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-cyan-300 flex items-center gap-2">
              <span>🔄</span> 2. Tukey's Interquartile Range Fences
            </h3>
            <div className="bg-slate-950 p-4 rounded-xl border border-cyan-950 font-mono text-xs text-cyan-200 overflow-x-auto whitespace-pre">
{"IQR = Q3 - Q1\nInner Fences: [ Q1 - 1.5·IQR,  Q3 + 1.5·IQR ]\nOuter Fences: [ Q1 - 3.0·IQR,  Q3 + 3.0·IQR ]"}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Order statistics Q1 and Q3 possess a 25% finite sample breakdown point. Distribution-free and resistant to tail variance spikes.
            </p>
          </div>

          {/* MODIFIED Z SCORE */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-emerald-900/40 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-emerald-300 flex items-center gap-2">
              <span>✍️</span> 3. Modified Z-Score (Iglewicz &amp; Hoaglin, 1993)
            </h3>
            <div className="bg-slate-950 p-4 rounded-xl border border-emerald-950 font-mono text-xs text-emerald-200 overflow-x-auto">
              {"M_i = [ 0.6745 · (x_i - x̃) ] / MAD,   where MAD = median( |x_i - x̃| )"}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              The constant 0.6745 = 1 / 1.4826 corresponds to the 75th percentile of N(0, 1), ensuring MAD is a consistent estimator of σ. 50% breakdown point.
            </p>
          </div>

          {/* WINSORIZATION */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-purple-900/40 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-purple-300 flex items-center gap-2">
              <span>🛡️</span> 4. Winsorization (Percentile Clamping)
            </h3>
            <div className="bg-slate-950 p-4 rounded-xl border border-purple-950 font-mono text-xs text-purple-200 overflow-x-auto whitespace-pre">
{"x_winsor = min( max(x_i, P_α), P_{1-α} )"}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Clamps extreme values to the α and (1 - α) percentiles. Preserves sample size N and degrees of freedom while bounding empirical variance.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 5: REGIONAL WEST BENGAL INDUSTRIAL CASE STUDIES
          ===================================================================== */}
      <section id="case-studies" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-8 bg-cyan-500 rounded-full" />
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
            5. Real-World Regional Industrial Case Studies (West Bengal)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Case 1: Real Estate Valuation
              </span>
              <span className="text-xs text-slate-500">Salt Lake Sector V</span>
            </div>
            <h3 className="text-base font-bold text-white">Salt Lake &amp; New Town Commercial Property Pricing</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Context:</strong> Automated real estate valuation portals analyzed 15,000 apartment listings. Clustered luxury towers (₹ 32,000/sq.ft.) inflated the standard deviation by 8x, masking clerical typos (₹ 450/sq.ft.) under classical Z-scores.
            </p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-1">
              <div className="text-indigo-400 font-semibold">Solution Implemented:</div>
              <div className="text-slate-300">Replaced Z-score with Tukey's Inner Fences (Upper: ₹ 9,400) and Modified Z-score.</div>
              <div className="text-emerald-400 font-semibold mt-1">Impact: Successfully flagged 412 listing anomalies; reduced appraisal pricing error by 34%.</div>
            </div>
          </div>

          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Case 2: Agricultural Analytics
              </span>
              <span className="text-xs text-slate-500">North 24 Parganas</span>
            </div>
            <h3 className="text-base font-bold text-white">Barrackpore &amp; Naihati Agricultural Paddy Crop Yields</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Context:</strong> Crop yield prediction per bigha across 4,200 farms suffered from localized river flooding dropouts (extreme lower tail outliers near 0.8 quintals).
            </p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-1">
              <div className="text-cyan-400 font-semibold">Solution Implemented:</div>
              <div className="text-slate-300">Tukey Lower Fence [Q1 - 1.5*IQR] isolated flood-damaged farms for disaster relief claims.</div>
              <div className="text-emerald-400 font-semibold mt-1">Impact: Expedited ₹ 8.2 Cr in crop insurance settlements with zero false rejections.</div>
            </div>
          </div>

          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Case 3: FinTech Gateway
              </span>
              <span className="text-xs text-slate-500">Sector V Tech Park</span>
            </div>
            <h3 className="text-base font-bold text-white">FinTech Transaction Fraud Monitoring &amp; Winsorization</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Context:</strong> Credit card payment streams had occasional legitimate impulse transactions of ₹ 5,00,000 that triggered gradient explosions in PyTorch neural networks under MSE loss.
            </p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-1">
              <div className="text-emerald-400 font-semibold">Solution Implemented:</div>
              <div className="text-slate-300">99th percentile Winsorization (clamping at ₹ 42,000) combined with an `is_high_value_flag = 1` indicator.</div>
              <div className="text-emerald-400 font-semibold mt-1">Impact: Reduced neural training variance by 78% while preserving fraud recall.</div>
            </div>
          </div>

          <div className="bg-slate-900/90 p-6 rounded-2xl border border-purple-500/20 text-purple-300 border border-purple-500/30">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Case 4: Meteorology
              </span>
              <span className="text-xs text-slate-500">Alipore AWS</span>
            </div>
            <h3 className="text-base font-bold text-white">Automated Weather Station (AWS) Impulse Spike Filtering</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Context:</strong> Roadside environmental sensors experienced optical solar reflection artifacts, sending spurious temperature spikes of 65°C.
            </p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-1">
              <div className="text-purple-400 font-semibold">Solution Implemented:</div>
              <div className="text-slate-300">5-minute rolling Hampel Filter (rolling MAD) on the edge micro-controller.</div>
              <div className="text-emerald-400 font-semibold mt-1">Impact: Cleaned 100% of telemetry spikes before ingestion into the IMD regional model.</div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 6: DIAGNOSTIC SELF-ASSESSMENT QUIZ
          ===================================================================== */}
      <section id="diagnostic-quiz" className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-8 bg-indigo-500 rounded-full" />
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                6. Diagnostic Self-Assessment Quiz (Scenario Challenge)
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                5 authentic engineering scenarios testing detection algorithms, fencing boundaries, and remediation strategies.
              </p>
            </div>
          </div>

          {quizSubmitted && (
            <div className="flex items-center gap-2 bg-indigo-950 border border-indigo-700 px-4 py-2 rounded-xl">
              <span className="text-xs text-slate-300">Your Score:</span>
              <span className="text-lg font-extrabold text-cyan-300">
                {quizScore} / {DIAGNOSTIC_QUESTIONS.length}
              </span>
              <button
                onClick={() => {
                  setQuizAnswers({});
                  setQuizSubmitted(false);
                }}
                className="ml-3 text-xs text-indigo-400 underline hover:text-indigo-200"
              >
                Reset
              </button>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {DIAGNOSTIC_QUESTIONS.map((q, qIdx) => (
            <div
              key={q.id}
              className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 space-y-4 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  Scenario {qIdx + 1}: {q.scenario}
                </span>
                {quizSubmitted && (
                  <span className={clsx(
                    "text-xs font-bold px-2.5 py-0.5 rounded-full border",
                    quizAnswers[q.id] === q.correctIndex
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                      : "bg-red-500/20 text-red-300 border-red-500/50"
                  )}>
                    {quizAnswers[q.id] === q.correctIndex ? "✔ Correct" : "✖ Incorrect"}
                  </span>
                )}
              </div>

              <p className="text-sm font-semibold text-white leading-relaxed">{q.question}</p>

              {/* OPTIONS */}
              <div className="grid grid-cols-1 gap-2.5">
                {q.options.map((opt, optIdx) => {
                  const isSelected = quizAnswers[q.id] === optIdx;
                  const isCorrect = q.correctIndex === optIdx;

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      disabled={quizSubmitted}
                      className={clsx(
                        "p-3.5 rounded-xl text-xs sm:text-sm text-left transition-all duration-150 border flex items-center justify-between",
                        !quizSubmitted && isSelected && "bg-indigo-900/40 border-indigo-500 text-white shadow-md",
                        !quizSubmitted && !isSelected && "bg-slate-950/60 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-slate-950",
                        quizSubmitted && isCorrect && "bg-emerald-950/40 border-emerald-500 text-emerald-200 font-semibold",
                        quizSubmitted && isSelected && !isCorrect && "bg-red-950/40 border-red-500 text-red-200 line-through",
                        quizSubmitted && !isSelected && !isCorrect && "bg-slate-950/40 border-slate-900 text-slate-500"
                      )}
                    >
                      <span>{opt}</span>
                      <span className="font-mono text-xs opacity-60">[{String.fromCharCode(65 + optIdx)}]</span>
                    </button>
                  );
                })}
              </div>

              {/* FEEDBACK */}
              {quizSubmitted && (
                <div className="pt-3 border-t border-slate-800 text-xs space-y-1.5">
                  <div className="text-slate-300">
                    <strong className="text-cyan-300">Rationale: </strong>
                    {q.rationale}
                  </div>
                  <div className="text-indigo-400 font-mono bg-indigo-950/50 p-2 rounded-lg border border-indigo-900/40">
                    💬 {q.mentorTip}
                  </div>
                </div>
              )}
            </div>
          ))}

          {!quizSubmitted && (
            <div className="text-center pt-2">
              <button
                onClick={() => setQuizSubmitted(true)}
                disabled={Object.keys(quizAnswers).length < DIAGNOSTIC_QUESTIONS.length}
                className={clsx(
                  "px-8 py-3 rounded-xl font-bold text-sm tracking-wide transition-all shadow-xl",
                  Object.keys(quizAnswers).length === DIAGNOSTIC_QUESTIONS.length
                    ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30 cursor-pointer"
                    : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
                )}
              >
                Submit Diagnostic Assessment ({Object.keys(quizAnswers).length}/{DIAGNOSTIC_QUESTIONS.length} Answered)
              </button>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================================
          SECTION 7: PRODUCTION PITFALLS & ANTI-PATTERNS
          ===================================================================== */}
      <section id="production-pitfalls" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-8 bg-red-500 rounded-full" />
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
            7. Production Engineering Pitfalls &amp; Anti-Patterns
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/90 p-5 rounded-2xl border border-red-900/30 space-y-3">
            <div className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>⚠️</span> Anti-Pattern 1
            </div>
            <h3 className="text-sm font-bold text-white">The Preprocessing Leakage Trap</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Computing outlier boundaries (mean, std, Q1, Q3) on the full dataset before splitting leaks test distribution information into the training pipeline.
            </p>
            <div className="text-[11px] font-mono text-emerald-400 bg-slate-950 p-2 rounded border border-slate-800">
              Rule: Always compute fences strictly on X_train and freeze them for X_test.
            </div>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-red-900/30 space-y-3">
            <div className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>⚠️</span> Anti-Pattern 2
            </div>
            <h3 className="text-sm font-bold text-white">The Zero-MAD Crash</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              When &gt; 50% of values are identical (e.g. sparse counts), MAD evaluates to 0.0, causing unhandled division-by-zero crashes in Modified Z-score.
            </p>
            <div className="text-[11px] font-mono text-emerald-400 bg-slate-950 p-2 rounded border border-slate-800">
              Rule: Fallback to Mean Absolute Deviation or Tukey IQR when MAD is zero.
            </div>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-red-900/30 space-y-3">
            <div className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>⚠️</span> Anti-Pattern 3
            </div>
            <h3 className="text-sm font-bold text-white">Symmetric Fences on Skewed Data</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Applying symmetric [Q1 - 1.5*IQR, Q3 + 1.5*IQR] on heavy right-skewed data produces nonsensical negative lower bounds and cuts into normal tail observations.
            </p>
            <div className="text-[11px] font-mono text-emerald-400 bg-slate-950 p-2 rounded border border-slate-800">
              Rule: Use Medcouple Adjusted Boxplot or log-transform prior to fencing.
            </div>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-red-900/30 space-y-3">
            <div className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>⚠️</span> Anti-Pattern 4
            </div>
            <h3 className="text-sm font-bold text-white">Trimming Minority Fraud Labels</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Blindly deleting outlier rows in fraud detection or rare disease datasets deletes the exact positive target class (y = 1) needed for training.
            </p>
            <div className="text-[11px] font-mono text-emerald-400 bg-slate-950 p-2 rounded border border-slate-800">
              Rule: Use Winsorization + binary indicator flags (`is_outlier = 1`).
            </div>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-red-900/30 space-y-3">
            <div className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>⚠️</span> Anti-Pattern 5
            </div>
            <h3 className="text-sm font-bold text-white">Univariate Multi-Collinear Blindspot</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Univariate filters check features independently, missing points that are individually normal but impossible in bivariate combinations (e.g. Age 21, Exp 15).
            </p>
            <div className="text-[11px] font-mono text-emerald-400 bg-slate-950 p-2 rounded border border-slate-800">
              Rule: Combine univariate fences with Mahalanobis distance or Isolation Forest.
            </div>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-red-900/30 space-y-3">
            <div className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>⚠️</span> Anti-Pattern 6
            </div>
            <h3 className="text-sm font-bold text-white">Stale Static Fences in Streaming</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Using static fences in real-time streaming causes concept drift degradation as seasonal or economic shifts trigger false-positive outlier floods.
            </p>
            <div className="text-[11px] font-mono text-emerald-400 bg-slate-950 p-2 rounded border border-slate-800">
              Rule: Deploy rolling quantile trackers (Hampel filter / t-digest) in streaming.
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 8: PRACTICAL WORKBENCH & INTEGRATED LOADERS
          ===================================================================== */}
      <section id="practical-workbench" className="space-y-8 pt-4">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-8 bg-indigo-500 rounded-full" />
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
              8. Practical Workbench &amp; Academic Resources
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Access the pure Python simulation lab, comprehensive study handbook, and 30 graded examination questions.
            </p>
          </div>
        </div>

        {/* WORKBENCH SUB-TABS */}
        <div className="flex border-b border-slate-800">
          {[
            { id: "python", label: "🐍 Python Simulation Engine" },
            { id: "handbook", label: "📖 Academic Handbook (Note)" },
            { id: "qbank", label: "🎯 30 Graded Questions (Q-Bank)" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={clsx(
                "px-5 py-3 text-xs sm:text-sm font-bold transition-all border-b-2 -mb-px",
                activeTab === tab.id
                  ? "border-indigo-500 text-indigo-300 bg-indigo-500/10"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* CONTENT TABS */}
        {activeTab === "python" && (
          <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Pure Python Outlier Detection Laboratory</h3>
                <p className="text-xs text-slate-400">
                  Zero external dependencies. Contains Classical Z-Score, Tukey IQR, Modified Z-Score (MAD), and Winsorization.
                </p>
              </div>
            </div>
            <PythonFileLoader
              fileName="basic_outlier_detection_lab.py"
              code={labCode}
            />
          </div>
        )}

        {activeTab === "handbook" && (
          <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Comprehensive Revision Notes &amp; Handbook</h3>
                <p className="text-xs text-slate-400">
                  Z-score, Tukey fences, Iglewicz-Hoaglin MAD equations, Medcouple skewness adjustments, and West Bengal case studies.
                </p>
              </div>
            </div>
            <PlainTextPrint
              fileName="topic13_note.txt"
              content={noteText}
            />
          </div>
        )}

        {activeTab === "qbank" && (
          <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">30 Graded Questions &amp; Viva-Voce Bank</h3>
                <p className="text-xs text-slate-400">
                  Structured across 4 mastery tiers (Foundation, Mechanics, Architecture, Scalability) with detailed solutions and practical tips.
                </p>
              </div>
            </div>
            <FAQTemplate
              title="Topic 13: Basic Outlier Detection — Graded Examination Bank"
              questions={questions}
            />
          </div>
        )}
      </section>

      {/* =====================================================================
          MENTOR SIGNATURE COMPONENT
          ===================================================================== */}
      <Teacher />
    </div>
  );
};

export default Topic13;
