import React, { useState, useId, useMemo } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import labCode from "./topic6_files/training_dataset_lab.py?raw";
import noteText from "./topic6_files/topic6_note.txt?raw";
import questions from "./topic6_files/topic6_questions.js";

// =============================================================================
// SYNTHETIC DATA ENGINE FOR MODE 1 & MODE 2 SIMULATIONS
// =============================================================================

// Ground-truth function: y = 1.2*x - 1.5*x^2 + 0.4*x^3
const EVAL_POINTS = [-1.8, -1.4, -1.0, -0.6, -0.2, 0.2, 0.6, 1.0, 1.4, 1.8];

const GENERATE_TRAIN_POINTS = (noiseFactor = 0.35) => [
  { id: 1, x: -1.7, y: -0.85 + (noiseFactor * 0.4), isOutlier: false },
  { id: 2, x: -1.5, y: -2.35 - (noiseFactor * 0.5), isOutlier: false },
  { id: 3, x: -1.2, y: -3.80 + (noiseFactor * 0.3), isOutlier: false },
  { id: 4, x: -0.9, y: -2.75 - (noiseFactor * 0.6), isOutlier: false },
  { id: 5, x: -0.6, y: -1.35 + (noiseFactor * 0.2), isOutlier: false },
  { id: 6, x: -0.3, y: -0.52 - (noiseFactor * 0.4), isOutlier: false },
  { id: 7, x: 0.0, y: 0.05 + (noiseFactor * 0.3), isOutlier: false },
  { id: 8, x: 0.3, y: 0.22 - (noiseFactor * 0.2), isOutlier: false },
  { id: 9, x: 0.6, y: -0.15 + (noiseFactor * 0.5), isOutlier: false },
  { id: 10, x: 0.9, y: -0.68 - (noiseFactor * 0.4), isOutlier: false },
  { id: 11, x: 1.2, y: -0.95 + (noiseFactor * 0.3), isOutlier: false },
  { id: 12, x: 1.5, y: -0.42 - (noiseFactor * 0.7), isOutlier: false },
  { id: 13, x: 1.7, y: 0.55 + (noiseFactor * 0.5), isOutlier: false },
  { id: 14, x: -0.7, y: 1.85, isOutlier: true } // intentional noise sample
];

const TEST_HOLDOUT_POINTS = [
  { id: 101, x: -1.6, y: -1.60 },
  { id: 102, x: -1.1, y: -3.30 },
  { id: 103, x: -0.5, y: -1.02 },
  { id: 104, x: 0.2, y: 0.18 },
  { id: 105, x: 0.8, y: -0.50 },
  { id: 106, x: 1.4, y: -0.65 }
];

const Topic6 = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [studioMode, setStudioMode] = useState("erm"); // 'erm' | 'learning_curve' | 'noise_sieve'

  // MODE 1 STATE: ERM Loss Surface & Polynomial Complexity
  const [polyDegree, setPolyDegree] = useState(2); // 1, 2, 3, 5
  const [lambdaReg, setLambdaReg] = useState(0.01);
  const [trainingEpochs, setTrainingEpochs] = useState(150);
  const [noiseStd, setNoiseStd] = useState(0.35);

  // MODE 2 STATE: Learning Curves & Sample Size Scaling
  const [modelFamily, setModelFamily] = useState("high_variance"); // 'high_bias' | 'high_variance'
  const [nSamples, setNSamples] = useState(60); // 15 to 500
  const [curveNoise, setCurveNoise] = useState(0.3);

  // MODE 3 STATE: Contamination, Label Noise & Cost-Sensitive Sieve
  const [labelNoisePct, setLabelNoisePct] = useState(10); // 0 to 40%
  const [classImbalanceRatio, setClassImbalanceRatio] = useState("90:10"); // 50:50, 80:20, 90:10, 95:5
  const [lossStrategy, setLossStrategy] = useState("huber"); // 'mse', 'huber', 'cost_sensitive'

  // QUIZ STATE
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [revealedAnswers, setRevealedAnswers] = useState({});

  const svgId1 = useId();
  const svgId2 = useId();

  // ---------------------------------------------------------------------------
  // COMPUTATIONS FOR MODE 1: POLYNOMIAL ERM FITTING
  // ---------------------------------------------------------------------------
  const { trainData, fittedCurvePoints, trueCurvePoints, eIn, eOut, regimeDiagnosis } = useMemo(() => {
    const rawTrain = GENERATE_TRAIN_POINTS(noiseStd);

    // Compute synthetic polynomial predictions based on degree and regularization
    const trueFn = (x) => 1.2 * x - 1.5 * (x ** 2) + 0.4 * (x ** 3);

    // Approximate model curve based on settings
    const modelFn = (x) => {
      if (polyDegree === 1) {
        // Linear Underfitting
        return -0.8 * x - 1.2;
      }
      if (polyDegree === 2) {
        // Quadratic
        const shrinkage = 1 / (1 + lambdaReg * 5);
        return (0.9 * x - 1.45 * (x ** 2)) * shrinkage - 0.2;
      }
      if (polyDegree === 3) {
        // Cubic: Near optimal ground truth fit
        const shrinkage = 1 / (1 + lambdaReg * 3);
        return (1.18 * x - 1.48 * (x ** 2) + 0.38 * (x ** 3)) * shrinkage;
      }
      // Degree 5: High Variance Overfitting
      if (lambdaReg > 0.05) {
        // Regularization tames degree 5
        return 1.1 * x - 1.4 * (x ** 2) + 0.35 * (x ** 3) + Math.sin(x * 4) * 0.15;
      }
      // Unregularized degree 5 memorizes points, including outlier
      return 1.2 * x - 1.5 * (x ** 2) + 0.4 * (x ** 3) + Math.sin(x * 5) * 1.8 * (trainingEpochs / 150);
    };

    const truePoints = EVAL_POINTS.map((x) => ({ x, y: trueFn(x) }));
    const fittedPoints = EVAL_POINTS.map((x) => ({ x, y: modelFn(x) }));

    // Evaluate Empirical In-sample Error (E_in)
    let sumIn = 0;
    rawTrain.forEach((p) => {
      const pred = modelFn(p.x);
      sumIn += (pred - p.y) ** 2;
    });
    const calcEIn = sumIn / rawTrain.length;

    // Evaluate Out-of-sample Error (E_out)
    let sumOut = 0;
    TEST_HOLDOUT_POINTS.forEach((p) => {
      const pred = modelFn(p.x);
      sumOut += (pred - p.y) ** 2;
    });
    const calcEOut = sumOut / TEST_HOLDOUT_POINTS.length;

    let diagnosis = {
      label: "Optimal Balance (Goldilocks)",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/30",
      desc: "Empirical error and generalization risk are tightly coupled. Model captures the polynomial structure without memorizing stochastic noise."
    };

    if (polyDegree === 1) {
      diagnosis = {
        label: "Severe Underfitting (High Bias)",
        color: "text-amber-400",
        bg: "bg-amber-500/10 border-amber-500/30",
        desc: "Hypothesis class lacks expressive capacity. Both training and validation errors are intolerably high. More data will not resolve this."
      };
    } else if (polyDegree === 5 && lambdaReg < 0.03) {
      diagnosis = {
        label: "Catastrophic Overfitting (High Variance)",
        color: "text-rose-400",
        bg: "bg-rose-500/10 border-rose-500/30",
        desc: "Hypothesis has warped to interpolate individual noisy artifacts. Training error is suppressed near zero, but test error explodes."
      };
    } else if (polyDegree === 5 && lambdaReg >= 0.03) {
      diagnosis = {
        label: "Regularized High-Capacity (L2 Shrinkage)",
        color: "text-cyan-400",
        bg: "bg-cyan-500/10 border-cyan-500/30",
        desc: "L2 weight penalty successfully restricts hypothesis curvature, mitigating runaway variance on degree-5 polynomial."
      };
    }

    return {
      trainData: rawTrain,
      fittedCurvePoints: fittedPoints,
      trueCurvePoints: truePoints,
      eIn: calcEIn,
      eOut: calcEOut,
      regimeDiagnosis: diagnosis
    };
  }, [polyDegree, lambdaReg, trainingEpochs, noiseStd]);

  // ---------------------------------------------------------------------------
  // COMPUTATIONS FOR MODE 2: LEARNING CURVES SCALING
  // ---------------------------------------------------------------------------
  const { curveData, currentEIn, currentEOut, gap, asymptoticRecommendation } = useMemo(() => {
    // Generate simulated points across N from 15 to 500
    const steps = [15, 30, 60, 100, 180, 280, 400, 500];
    const data = steps.map((n) => {
      let inErr, outErr;
      if (modelFamily === "high_bias") {
        // High bias: E_in rises rapidly to a high plateau; E_out falls to meet it
        inErr = 3.2 - (1.5 / Math.sqrt(n / 10)) + curveNoise * 0.5;
        outErr = 3.4 + (2.5 / (n / 10)) + curveNoise * 0.5;
      } else {
        // High variance: E_in starts very low; E_out starts huge and converges as N grows
        inErr = 0.2 + (0.6 * (1 - Math.exp(-n / 80))) + curveNoise * 0.2;
        outErr = 0.9 + (12.0 / Math.sqrt(n)) + curveNoise * 0.3;
      }
      return { n, inErr: Math.max(0.1, inErr), outErr: Math.max(0.2, outErr) };
    });

    // Interpolate current values for nSamples
    let cIn, cOut;
    if (modelFamily === "high_bias") {
      cIn = 3.2 - (1.5 / Math.sqrt(nSamples / 10)) + curveNoise * 0.5;
      cOut = 3.4 + (2.5 / (nSamples / 10)) + curveNoise * 0.5;
    } else {
      cIn = 0.2 + (0.6 * (1 - Math.exp(-nSamples / 80))) + curveNoise * 0.2;
      cOut = 0.9 + (12.0 / Math.sqrt(nSamples)) + curveNoise * 0.3;
    }

    const calcGap = Math.abs(cOut - cIn);

    let rec = "";
    if (modelFamily === "high_bias") {
      rec = "High Bias Regime Detected: Notice how E_in and E_out plateau and converge early. Increasing N_train beyond 100 yields near-zero performance improvement. Solution: Increase hypothesis capacity (add polynomial features, expand network depth, or reduce regularization).";
    } else {
      if (nSamples < 100) {
        rec = "High Variance Under-Sampled: Severe generalization gap (E_out >> E_in). The model has insufficient training constraints. Solution: Increasing N_train from " + nSamples + " to 400+ will pull test error down by ~65%, directly closing the gap!";
      } else {
        rec = "High Capacity Adequately Constrained: As N_train scaled up to " + nSamples + ", the empirical evidence sufficiently constrained the hypothesis space, narrowing the generalization gap to " + calcGap.toFixed(2) + ".";
      }
    }

    return {
      curveData: data,
      currentEIn: Math.max(0.1, cIn),
      currentEOut: Math.max(0.2, cOut),
      gap: calcGap,
      asymptoticRecommendation: rec
    };
  }, [modelFamily, nSamples, curveNoise]);

  // ---------------------------------------------------------------------------
  // COMPUTATIONS FOR MODE 3: NOISE & IMBALANCE SIEVE
  // ---------------------------------------------------------------------------
  const { sampleGrid, stabilityPct, apparentAcc, trueGenAcc, lossInsight } = useMemo(() => {
    // Generate 20 representative tokens
    const total = 20;
    const minorityCount = classImbalanceRatio === "50:50" ? 10 : classImbalanceRatio === "80:20" ? 4 : classImbalanceRatio === "90:10" ? 2 : 1;
    const noisyCount = Math.round((total * labelNoisePct) / 100);

    const tokens = [];
    for (let i = 0; i < total; i++) {
      const isMinority = i < minorityCount;
      const isCorrupted = i < noisyCount;
      tokens.push({
        id: i + 1,
        cls: isMinority ? "Minority (Default/Fraud)" : "Majority (Repaid/Legit)",
        corrupted: isCorrupted,
        status: isCorrupted ? "Label Corrupted" : "Authentic Ground Truth"
      });
    }

    let stab = 96 - (labelNoisePct * 1.4);
    let appAcc = 98.5;
    let trueAcc = 94.0;

    if (lossStrategy === "mse") {
      stab -= (labelNoisePct * 0.8);
      appAcc = 99.2;
      trueAcc = Math.max(52.0, 93.0 - (labelNoisePct * 1.1) - (minorityCount <= 2 ? 15 : 0));
    } else if (lossStrategy === "huber") {
      stab += 8;
      appAcc = 96.0;
      trueAcc = Math.max(78.0, 95.0 - (labelNoisePct * 0.35));
    } else if (lossStrategy === "cost_sensitive") {
      stab += 5;
      appAcc = 94.5;
      trueAcc = Math.max(84.0, 96.0 - (labelNoisePct * 0.45));
    }

    let insight = "";
    if (lossStrategy === "mse") {
      insight = "Standard MSE Loss suffers quadratic gradient amplification on the " + noisyCount + " corrupted training labels. The optimizer skews the decision hyperplane toward outliers, causing genuine test generalization to collapse to " + trueAcc.toFixed(1) + "%.";
    } else if (lossStrategy === "huber") {
      insight = "Huber Loss transitions from quadratic to linear penalty for residuals exceeding delta=1.35. The " + noisyCount + " corrupted training samples have bounded gradients, shielding model parameters and sustaining " + trueAcc.toFixed(1) + "% test generalization.";
    } else {
      insight = "Cost-Sensitive ERM assigns 10x-20x higher penalty weight to the " + minorityCount + " minority training instances. This prevents the majority class from overwhelming empirical risk, ensuring robust recall on rare mission-critical events.";
    }

    return {
      sampleGrid: tokens,
      stabilityPct: Math.min(100, Math.max(25, Math.round(stab))),
      apparentAcc: appAcc.toFixed(1),
      trueGenAcc: trueAcc.toFixed(1),
      lossInsight: insight
    };
  }, [labelNoisePct, classImbalanceRatio, lossStrategy]);

  // ---------------------------------------------------------------------------
  // DIAGNOSTIC ASSESSMENT QUIZ DEFINITIONS
  // ---------------------------------------------------------------------------
  const QUIZ_QUESTIONS = [
    {
      id: 1,
      title: "Diagnostic 1: Preprocessing Pipeline Encapsulation",
      scenario: "A data scientist at Kolkata Salt Lake Tech Park fits a StandardScaler on the entire dataset of 5,000 customers before invoking train_test_split(test_size=0.2). In cross-validation, the model achieves 93% accuracy, but crashes to 79% when deployed on live streaming bank transactions.",
      question: "What exact methodological pathology caused this failure?",
      options: [
        { label: "High variance caused by excessive polynomial features in the logistic regression model.", isCorrect: false },
        { label: "Data leakage: computing mean and standard deviation globally contaminated D_train with test distribution parameters.", isCorrect: true },
        { label: "The test split was too large; a 99:1 split should have been used instead.", isCorrect: false },
        { label: "Failure to apply SMOTE resampling to the test dataset before normalization.", isCorrect: false }
      ],
      explanation: "StandardScaler learns mu and sigma. When computed globally before partitioning, future test distributions bleed into the training representations. The model learns over artificially harmonized feature scales, producing spuriously optimistic validation scores that collapse in production."
    },
    {
      id: 2,
      title: "Diagnostic 2: Learning Curve High Bias Signature",
      scenario: "During the training of a power demand forecasting model for WBSEDCL Barasat, the ML engineer plots the learning curve from N=50 to N=5,000 SCADA intervals. The training MSE quickly rises to 18.5 kW and plateaus, while test MSE drops to 19.1 kW and plateaus. The gap is only 0.6 kW.",
      question: "What is the correct diagnosis and remedial action?",
      options: [
        { label: "High Bias (Underfitting): The hypothesis class is too restrictive. Collecting more training SCADA data will not help; the engineer must add non-linear features or increase model complexity.", isCorrect: true },
        { label: "High Variance (Overfitting): The model is memorizing noise and needs 10,000 additional training records.", isCorrect: false },
        { label: "Severe Label Leakage: The tiny gap proves the test labels leaked directly into the training matrix.", isCorrect: false },
        { label: "Optimal Model: Since the gap is under 1 kW, no further engineering is required.", isCorrect: false }
      ],
      explanation: "When both E_in and E_out plateau at an unacceptably high error with an almost nonexistent generalization gap, the model suffers from High Bias. The hypothesis space H cannot capture the underlying generator. Increasing N_train simply reaffirms the inability to fit; model expressiveness must be enhanced."
    },
    {
      id: 3,
      title: "Diagnostic 3: Vapnik-Chervonenkis Sample Complexity Scaling",
      scenario: "An academic research group at Jadavpur University upgrades a medical diagnostic classifier from a linear hypothesis space (VC dimension d_VC = 12) to a deep neural network architecture with VC dimension d_VC = 480, keeping the training sample size fixed at N_train = 500.",
      question: "According to VC generalization bounds, what will happen to the model's test performance?",
      options: [
        { label: "Test performance will improve strictly because larger VC dimension always guarantees lower generalization risk.", isCorrect: false },
        { label: "The generalization bound explodes because N_train is no longer >> d_VC; the model can achieve near-zero training error while test error spikes catastrophically.", isCorrect: true },
        { label: "The empirical risk will increase to infinity because gradient descent cannot optimize models with d_VC > N.", isCorrect: false },
        { label: "VC dimension has no theoretical connection to required training sample size.", isCorrect: false }
      ],
      explanation: "The VC generalization bound scales as O(sqrt(d_VC / N_train)). To maintain an error bound epsilon with high probability, N_train must scale linearly with d_VC (typically N >= 10 * d_VC to 50 * d_VC). If d_VC = 480 with only N = 500, the bound is vacuous (>1.0), leading to rampant overfitting."
    },
    {
      id: 4,
      title: "Diagnostic 4: Severe Class Imbalance in Microfinance Credit Scoring",
      scenario: "In a Nadia District SHG loan portfolio of 4,000 borrowers, 3,920 repay successfully (98%) and 80 default (2%). A standard unweighted Logistic Regression model trained via Empirical Risk Minimization outputs 98% training accuracy.",
      question: "Why is this training outcome clinically and commercially catastrophic?",
      options: [
        { label: "The training set has too many features relative to the number of defaulted rows.", isCorrect: false },
        { label: "Standard ERM treated all errors equally, so the optimizer converged to the trivial majority rule (predicting non-default for 100% of loans), yielding 0% recall on actual defaults.", isCorrect: true },
        { label: "The logistic sigmoid function cannot process binary labels with values 0 and 1.", isCorrect: false },
        { label: "The learning rate was too high, causing gradient oscillation.", isCorrect: false }
      ],
      explanation: "Under severe class imbalance, trivial majority classification minimizes unweighted empirical risk (1/N * sum L_i) with 98% accuracy. However, every single defaulting borrower is misclassified (0% recall), exposing the SHG revolving fund to catastrophic capital loss. Cost-Sensitive ERM or class weighting must be applied."
    },
    {
      id: 5,
      title: "Diagnostic 5: Out-of-Core Training Architecture",
      scenario: "The Kolkata Metro AFC telemetry logs 250 million smartcard tap events (120 GB of uncompressed CSVs). The training workstation has only 16 GB of system RAM. Loading pd.read_csv('afc_logs.csv') crashes with a fatal MemoryError.",
      question: "What is the architecturally sound industrial pattern to train a classifier on this dataset?",
      options: [
        { label: "Discard 99% of the records randomly so the file fits inside 1 GB of RAM.", isCorrect: false },
        { label: "Implement Out-of-Core Incremental Learning by streaming chunks using pd.read_csv(chunksize=...) and updating an estimator supporting .partial_fit().", isCorrect: true },
        { label: "Convert the CSV to an Excel XLSX workbook to compress the rows.", isCorrect: false },
        { label: "Increase the virtual memory swap file to 500 GB on the mechanical hard drive and train standard OLS.", isCorrect: false }
      ],
      explanation: "Out-of-core learning processes massive datasets sequentially in memory-sized batches. By iterating over chunks with `partial_fit()` (e.g. `SGDClassifier` or `MiniBatchKMeans`), the model updates internal parameter matrices iteratively without ever holding the entire corpus in volatile memory."
    }
  ];

  const handleSelectQuizOption = (qId, optionIdx) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const handleToggleRevealQuiz = (qId) => {
    setRevealedAnswers((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  // Convert coordinate points to SVG path for Mode 1
  // Domain: x in [-2, 2], Range: y in [-4.5, 2.5]
  const svgWidth = 600;
  const svgHeight = 280;
  const mapX = (x) => ((x + 2) / 4) * (svgWidth - 60) + 30;
  const mapY = (y) => svgHeight - 30 - ((y + 4.5) / 7) * (svgHeight - 60);

  const fittedPath = fittedCurvePoints.reduce((acc, pt, idx) => {
    const px = mapX(pt.x);
    const py = mapY(pt.y);
    return idx === 0 ? `M ${px} ${py}` : `${acc} L ${px} ${py}`;
  }, "");

  const truePath = trueCurvePoints.reduce((acc, pt, idx) => {
    const px = mapX(pt.x);
    const py = mapY(pt.y);
    return idx === 0 ? `M ${px} ${py}` : `${acc} L ${px} ${py}`;
  }, "");

  return (
    <div className="space-y-12 text-slate-200 leading-relaxed max-w-6xl mx-auto pb-16 px-4 sm:px-6">
      {/* ===================================================================== */}
      {/* HERO SECTION WITH JUMP NAVIGATION */}
      {/* ===================================================================== */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              BCAC701B • Feature Selection and Training & Testing Data • Topic 6
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Masterclass Standard
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Training Dataset: Mechanics, Empirical Risk & Generalization
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl">
            Unpack the foundational role of <code className="text-cyan-300 font-mono">D_train</code> in Empirical Risk Minimization (ERM), sample complexity scaling, Vapnik-Chervonenkis bounds, learning curve trajectories, and rigorous pipeline encapsulation across industrial ecosystems in West Bengal.
          </p>

          {/* Quick Jump Navigation Bar */}
          <div className="pt-4 flex flex-wrap gap-2 text-xs font-semibold">
            {[
              { id: "novice", label: "1. Novice Masterclass" },
              { id: "studio", label: "2. Interactive Studio (3 Modes)" },
              { id: "math", label: "3. Mathematical Rigor" },
              { id: "cases", label: "4. West Bengal Industrial Cases" },
              { id: "quiz", label: "5. Diagnostic Assessment Quiz" },
              { id: "pitfalls", label: "6. Production Pitfalls" },
              { id: "faq", label: "7. Viva Voce & Sukanta Hui" },
              { id: "lab", label: "8. Python Engine & Notes" }
            ].map((nav) => (
              <a
                key={nav.id}
                href={`#${nav.id}`}
                onClick={() => setActiveSection(nav.id)}
                className={clsx(
                  "px-3 py-1.5 rounded-lg border transition-all duration-200 flex items-center gap-1.5",
                  activeSection === nav.id
                    ? "bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-600/30"
                    : "bg-slate-800/80 text-slate-300 border-slate-700/70 hover:bg-slate-700/80 hover:text-white"
                )}
              >
                {nav.label}
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* ===================================================================== */}
      {/* SECTION 1: NOVICE MASTERCLASS (METAPHORS, TAXONOMY & JARGON) */}
      {/* ===================================================================== */}
      <section id="novice" className="space-y-8 scroll-mt-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-indigo-400">1.</span> Novice Masterclass: Demystifying the Training Dataset
            </h2>
            <p className="text-sm text-slate-400">
              Intuitive mental models, conceptual taxonomy, and jargon eradication for BCA/MCA students.
            </p>
          </div>
        </div>

        {/* 3 Intuitive Mental Models */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-4 hover:border-indigo-500/50 transition-colors shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 text-2xl font-bold">
              📚
            </div>
            <h3 className="text-lg font-bold text-white">Metaphor 1: The Practice Textbook vs Final Exam</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Think of <code className="text-indigo-300 font-mono">D_train</code> as the textbook and homework questions with solutions provided in the back. A diligent student learns underlying mathematical concepts. If they merely memorize every exact punctuation mark without understanding, they get 100% on homework but fail the final unseen exam paper (<code className="text-rose-300 font-mono">D_test</code>).
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-4 hover:border-cyan-500/50 transition-colors shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-2xl font-bold">
              🧵
            </div>
            <h3 className="text-lg font-bold text-white">Metaphor 2: The Tailor's Mannequin</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              The training dataset is a wooden mannequin in a Barrackpore tailor shop. If the tailor stitches a blazer so tightly that it fits every unique scratch, dent, and asymmetrical curve of that wooden dummy, no living human customer in Kolkata will ever be able to wear it comfortably.
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-4 hover:border-emerald-500/50 transition-colors shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-2xl font-bold">
              🏗️
            </div>
            <h3 className="text-lg font-bold text-white">Metaphor 3: The Skyscraper's Bedrock Foundation</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              If the soil foundation (<code className="text-emerald-300 font-mono">D_train</code>) is contaminated with sinkholes (label noise) or biased toward marshy silt (class imbalance), the skyscraper built on top will collapse upon occupancy, regardless of how luxurious the architectural ensemble or deep neural network is.
            </p>
          </div>
        </div>

        {/* Core Taxonomy Grid */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span>🏷️</span> The Four Architectural Pillars of the Training Dataset
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="bg-slate-950/80 border border-slate-800/80 rounded-lg p-4 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Pillar 1</span>
              <h4 className="text-sm font-semibold text-white">Empirical Risk Minimization</h4>
              <p className="text-xs text-slate-300">
                The formal mathematical optimization paradigm where model weights are updated iteratively to minimize average loss over training pairs <code className="text-indigo-300 font-mono">(x_i, y_i)</code>.
              </p>
            </div>
            <div className="bg-slate-950/80 border border-slate-800/80 rounded-lg p-4 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Pillar 2</span>
              <h4 className="text-sm font-semibold text-white">Sample Complexity & VC Scaling</h4>
              <p className="text-xs text-slate-300">
                The minimum sample size <code className="text-cyan-300 font-mono">N_train</code> required to guarantee that generalization error remains bounded within epsilon tolerance of empirical loss.
              </p>
            </div>
            <div className="bg-slate-950/80 border border-slate-800/80 rounded-lg p-4 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Pillar 3</span>
              <h4 className="text-sm font-semibold text-white">Pipeline Encapsulation</h4>
              <p className="text-xs text-slate-300">
                The unbreakable rule that all transformations (scalers, encoders, imputers, PCA) must compute statistics exclusively from <code className="text-amber-300 font-mono">D_train</code> and freeze them.
              </p>
            </div>
            <div className="bg-slate-950/80 border border-slate-800/80 rounded-lg p-4 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Pillar 4</span>
              <h4 className="text-sm font-semibold text-white">Robustness & Cost Weighting</h4>
              <p className="text-xs text-slate-300">
                Mitigating label noise via robust losses (Huber loss) and defending against class imbalance using cost-sensitive error multipliers.
              </p>
            </div>
          </div>
        </div>

        {/* Jargon Buster */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span>⚡</span> Jargon Buster: Essential Exam Terminology
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-slate-950/60 p-3.5 rounded-lg border border-slate-800">
              <span className="font-semibold text-indigo-300">Empirical Risk (R_emp / E_in):</span>
              <p className="text-slate-300 text-xs mt-1">
                The measurable average loss calculated directly over the training dataset. It almost always underestimates true risk due to optimization optimism.
              </p>
            </div>
            <div className="bg-slate-950/60 p-3.5 rounded-lg border border-slate-800">
              <span className="font-semibold text-cyan-300">True Risk (R_true / Generalization Risk):</span>
              <p className="text-slate-300 text-xs mt-1">
                The theoretical expected loss over all possible samples from the true population distribution P(X, Y). Directly uncomputable in practice.
              </p>
            </div>
            <div className="bg-slate-950/60 p-3.5 rounded-lg border border-slate-800">
              <span className="font-semibold text-amber-300">Generalization Gap:</span>
              <p className="text-slate-300 text-xs mt-1">
                The absolute difference between out-of-sample error and in-sample error: |E_out - E_in|. A large gap signals overfitting.
              </p>
            </div>
            <div className="bg-slate-950/60 p-3.5 rounded-lg border border-slate-800">
              <span className="font-semibold text-rose-300">Inductive Bias:</span>
              <p className="text-slate-300 text-xs mt-1">
                The set of mathematical assumptions an algorithm employs to prioritize one hypothesis over another when multiple functions fit D_train equally well.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 2: INTERACTIVE LABORATORY STUDIO (3 DYNAMIC MODES) */}
      {/* ===================================================================== */}
      <section id="studio" className="space-y-8 scroll-mt-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-indigo-400">2.</span> Interactive Laboratory Studio
            </h2>
            <p className="text-sm text-slate-400">
              Simulate parameter optimization, learning curve dynamics, and label noise filtration in real time.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex p-1 bg-slate-900 border border-slate-800 rounded-xl">
            <button
              onClick={() => setStudioMode("erm")}
              className={clsx(
                "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                studioMode === "erm"
                  ? "bg-indigo-600 text-white shadow"
                  : "text-slate-400 hover:text-slate-200"
              )}
            >
              Mode 1: ERM Fitter
            </button>
            <button
              onClick={() => setStudioMode("learning_curve")}
              className={clsx(
                "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                studioMode === "learning_curve"
                  ? "bg-indigo-600 text-white shadow"
                  : "text-slate-400 hover:text-slate-200"
              )}
            >
              Mode 2: Learning Curves
            </button>
            <button
              onClick={() => setStudioMode("noise_sieve")}
              className={clsx(
                "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                studioMode === "noise_sieve"
                  ? "bg-indigo-600 text-white shadow"
                  : "text-slate-400 hover:text-slate-200"
              )}
            >
              Mode 3: Contamination Sieve
            </button>
          </div>
        </div>

        {/* ------------------------------------------------------------------- */}
        {/* MODE 1: ERM LOSS SURFACE & POLYNOMIAL COMPLEXITY FITTER */}
        {/* ------------------------------------------------------------------- */}
        {studioMode === "erm" && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>🎯</span> Mode 1: Empirical Risk Minimization & Polynomial Hypothesis Capacity
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Adjust polynomial degree and L2 regularization to observe how parameter fitting on D_train affects in-sample error vs out-of-sample generalization.
                </p>
              </div>

              {/* Status Badge */}
              <div className={clsx("px-3.5 py-1.5 rounded-lg border text-xs font-bold", regimeDiagnosis.bg, regimeDiagnosis.color)}>
                {regimeDiagnosis.label}
              </div>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Hypothesis Degree (Capacity): <span className="text-cyan-400 font-bold">{polyDegree}</span>
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {[1, 2, 3, 5].map((deg) => (
                    <button
                      key={deg}
                      onClick={() => setPolyDegree(deg)}
                      className={clsx(
                        "py-1 text-xs font-bold rounded border transition-colors",
                        polyDegree === deg
                          ? "bg-cyan-600 border-cyan-400 text-white"
                          : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
                      )}
                    >
                      d={deg}
                    </button>
                  ))}
                </div>
                <span className="text-[10px] text-slate-400 block">
                  {polyDegree === 1 ? "Linear (High Bias)" : polyDegree === 2 || polyDegree === 3 ? "Polynomial (Well-matched)" : "Degree-5 (High Variance)"}
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-300">
                  <span>Regularization lambda:</span>
                  <span className="text-indigo-400 font-mono">{lambdaReg.toFixed(3)}</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="0.10"
                  step="0.005"
                  value={lambdaReg}
                  onChange={(e) => setLambdaReg(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
                <span className="text-[10px] text-slate-400 block">
                  {lambdaReg === 0 ? "Unconstrained ERM (Zero penalty)" : "L2 Ridge Penalty restricts curvature"}
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-300">
                  <span>Training Epochs:</span>
                  <span className="text-emerald-400 font-mono">{trainingEpochs}</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="300"
                  step="30"
                  value={trainingEpochs}
                  onChange={(e) => setTrainingEpochs(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <span className="text-[10px] text-slate-400 block">Gradient descent iterations on D_train</span>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-300">
                  <span>Data Noise Factor:</span>
                  <span className="text-amber-400 font-mono">{noiseStd.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="0.8"
                  step="0.05"
                  value={noiseStd}
                  onChange={(e) => setNoiseStd(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <span className="text-[10px] text-slate-400 block">Inherent stochastic jitter in D_train</span>
              </div>
            </div>

            {/* Live Visual SVG Visualization */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" /> Training Set (D_train, N=14)
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded bg-amber-400" /> Test Holdout (D_test, N=6)
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="w-4 h-0.5 bg-blue-400 border-dashed" /> True Latent Signal
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="w-4 h-0.5 bg-emerald-400" /> Fitted Hypothesis h_theta(x)
                  </span>
                </span>
                <span className="font-mono text-[11px] text-slate-500">Cartesian Domain: [-1.8, 1.8]</span>
              </div>

              <div className="relative bg-slate-950 rounded-xl border border-slate-800 p-2 overflow-hidden flex items-center justify-center">
                <svg
                  viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                  className="w-full h-auto max-h-[300px]"
                  id={svgId1}
                >
                  {/* Grid lines */}
                  <line x1="30" y1={svgHeight - 30} x2={svgWidth - 30} y2={svgHeight - 30} stroke="#334155" strokeWidth="1" />
                  <line x1="30" y1="30" x2="30" y2={svgHeight - 30} stroke="#334155" strokeWidth="1" />
                  <line x1="30" y1={mapY(0)} x2={svgWidth - 30} y2={mapY(0)} stroke="#1e293b" strokeDasharray="3 3" />

                  {/* True signal line */}
                  <path d={truePath} fill="none" stroke="#60a5fa" strokeWidth="2" strokeDasharray="4 4" opacity="0.75" />

                  {/* Fitted model curve */}
                  <path
                    d={fittedPath}
                    fill="none"
                    stroke={polyDegree === 5 && lambdaReg < 0.03 ? "#f43f5e" : "#10b981"}
                    strokeWidth="2.5"
                  />

                  {/* Training points */}
                  {trainData.map((pt) => {
                    const cx = mapX(pt.x);
                    const cy = mapY(pt.y);
                    return (
                      <circle
                        key={pt.id}
                        cx={cx}
                        cy={cy}
                        r={pt.isOutlier ? "5" : "3.5"}
                        fill={pt.isOutlier ? "#f43f5e" : "#22d3ee"}
                        stroke="#0f172a"
                        strokeWidth="1.5"
                      >
                        <title>{`Train pt: x=${pt.x.toFixed(2)}, y=${pt.y.toFixed(2)}${pt.isOutlier ? " (Outlier)" : ""}`}</title>
                      </circle>
                    );
                  })}

                  {/* Test points */}
                  {TEST_HOLDOUT_POINTS.map((pt) => {
                    const rx = mapX(pt.x) - 3;
                    const ry = mapY(pt.y) - 3;
                    return (
                      <rect
                        key={pt.id}
                        x={rx}
                        y={ry}
                        width="6"
                        height="6"
                        fill="#fbbf24"
                        stroke="#0f172a"
                        strokeWidth="1.5"
                      >
                        <title>{`Test pt: x=${pt.x.toFixed(2)}, y=${pt.y.toFixed(2)}`}</title>
                      </rect>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 uppercase font-semibold">Empirical Training Loss (E_in)</span>
                <div className="text-2xl font-black text-cyan-400 font-mono">{eIn.toFixed(4)}</div>
                <span className="text-[11px] text-slate-400">Mean Squared Error on visible D_train</span>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 uppercase font-semibold">True Test Loss (E_out)</span>
                <div className={clsx("text-2xl font-black font-mono", eOut > 3.0 ? "text-rose-400" : "text-emerald-400")}>
                  {eOut.toFixed(4)}
                </div>
                <span className="text-[11px] text-slate-400">Mean Squared Error on holdout D_test</span>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 uppercase font-semibold">Generalization Gap |E_out - E_in|</span>
                <div className="text-2xl font-black text-amber-400 font-mono">{Math.abs(eOut - eIn).toFixed(4)}</div>
                <span className="text-[11px] text-slate-400">Divergence between in-sample and out-of-sample</span>
              </div>
            </div>

            {/* Dynamic Regime Diagnosis Commentary */}
            <div className={clsx("p-4 rounded-xl border text-sm", regimeDiagnosis.bg)}>
              <span className={clsx("font-bold block mb-1", regimeDiagnosis.color)}>
                Academic Analysis: {regimeDiagnosis.label}
              </span>
              <p className="text-slate-300 text-xs leading-relaxed">{regimeDiagnosis.desc}</p>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* MODE 2: TRAINING SAMPLE SIZE & LEARNING CURVES ARENA */}
        {/* ------------------------------------------------------------------- */}
        {studioMode === "learning_curve" && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>📈</span> Mode 2: Sample Size Scaling & Learning Curves Arena (E_in vs E_out)
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Scale N_train from 15 to 500 instances to visually verify how empirical training error and validation risk converge under different model capacities.
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setModelFamily("high_bias")}
                  className={clsx(
                    "px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors",
                    modelFamily === "high_bias"
                      ? "bg-amber-500/20 text-amber-300 border-amber-500/50"
                      : "bg-slate-800 text-slate-400 border-slate-700 hover:text-white"
                  )}
                >
                  High Bias (Linear Model)
                </button>
                <button
                  onClick={() => setModelFamily("high_variance")}
                  className={clsx(
                    "px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors",
                    modelFamily === "high_variance"
                      ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/50"
                      : "bg-slate-800 text-slate-400 border-slate-700 hover:text-white"
                  )}
                >
                  High Variance (Degree-5 Model)
                </button>
              </div>
            </div>

            {/* Slider Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-300">
                  <span>Training Sample Size (N_train):</span>
                  <span className="text-cyan-400 font-mono text-sm">{nSamples} samples</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="500"
                  step="5"
                  value={nSamples}
                  onChange={(e) => setNSamples(parseInt(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>N=15 (Data-starved)</span>
                  <span>N=250</span>
                  <span>N=500 (Asymptote)</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-300">
                  <span>Irreducible Bayes Noise:</span>
                  <span className="text-amber-400 font-mono text-sm">{curveNoise.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="0.8"
                  step="0.05"
                  value={curveNoise}
                  onChange={(e) => setCurveNoise(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <span className="text-[10px] text-slate-400 block">Intrinsic stochastic noise floor</span>
              </div>
            </div>

            {/* SVG Learning Curve Graph */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1">
                    <span className="w-3 h-0.5 bg-cyan-400" /> Training Error (E_in)
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="w-3 h-0.5 bg-rose-400" /> Validation/Test Error (E_out)
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 border border-slate-900" /> Current Operating Point (N={nSamples})
                  </span>
                </span>
                <span className="text-slate-500 font-mono text-[11px]">Horizontal: N_train | Vertical: Error (MSE)</span>
              </div>

              <div className="relative bg-slate-950 rounded-xl border border-slate-800 p-2 overflow-hidden flex items-center justify-center">
                <svg
                  viewBox="0 0 600 240"
                  className="w-full h-auto max-h-[260px]"
                  id={svgId2}
                >
                  {/* Axis */}
                  <line x1="40" y1="200" x2="570" y2="200" stroke="#334155" strokeWidth="1.5" />
                  <line x1="40" y1="20" x2="40" y2="200" stroke="#334155" strokeWidth="1.5" />

                  {/* Curve mapping helpers */}
                  {/* x from 15 to 500 mapped to 40..570 */}
                  {/* y error from 0 to 8 mapped to 200..20 */}
                  {(() => {
                    const mx = (n) => 40 + ((n - 15) / (500 - 15)) * 530;
                    const my = (err) => 200 - Math.min(180, (err / 6.5) * 180);

                    const inPath = curveData.reduce((acc, d, i) => `${acc} ${i === 0 ? "M" : "L"} ${mx(d.n)} ${my(d.inErr)}`, "");
                    const outPath = curveData.reduce((acc, d, i) => `${acc} ${i === 0 ? "M" : "L"} ${mx(d.n)} ${my(d.outErr)}`, "");

                    const curX = mx(nSamples);
                    const curYIn = my(currentEIn);
                    const curYOut = my(currentEOut);

                    return (
                      <>
                        {/* Shaded Generalization Gap */}
                        <path
                          d={`${inPath} L ${mx(500)} ${my(curveData[curveData.length - 1].outErr)} ${outPath.replace("M", "L")} Z`}
                          fill="rgba(244, 63, 94, 0.08)"
                        />

                        {/* In-sample error line (E_in) */}
                        <path d={inPath} fill="none" stroke="#22d3ee" strokeWidth="2.5" />

                        {/* Out-of-sample error line (E_out) */}
                        <path d={outPath} fill="none" stroke="#f43f5e" strokeWidth="2.5" />

                        {/* Vertical line at current N */}
                        <line x1={curX} y1="20" x2={curX} y2="200" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="3 3" />

                        {/* Current point markers */}
                        <circle cx={curX} cy={curYIn} r="4.5" fill="#22d3ee" stroke="#0f172a" strokeWidth="1.5" />
                        <circle cx={curX} cy={curYOut} r="4.5" fill="#f43f5e" stroke="#0f172a" strokeWidth="1.5" />
                      </>
                    );
                  })()}
                </svg>
              </div>
            </div>

            {/* Current Metrics Box */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 uppercase font-semibold">Training Error E_in(N)</span>
                <div className="text-2xl font-black text-cyan-400 font-mono">{currentEIn.toFixed(3)}</div>
                <span className="text-[11px] text-slate-400">Sample average loss on current D_train</span>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 uppercase font-semibold">Validation Error E_out(N)</span>
                <div className="text-2xl font-black text-rose-400 font-mono">{currentEOut.toFixed(3)}</div>
                <span className="text-[11px] text-slate-400">Expected error on unseen validation holdout</span>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 uppercase font-semibold">Generalization Gap |E_out - E_in|</span>
                <div className="text-2xl font-black text-amber-400 font-mono">{gap.toFixed(3)}</div>
                <span className="text-[11px] text-slate-400">
                  {gap > 1.5 ? "Excessive gap (High Variance)" : "Tight gap (Model is well-bounded)"}
                </span>
              </div>
            </div>

            {/* Asymptotic Recommendation */}
            <div className="p-4 rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-xs sm:text-sm text-indigo-200">
              <span className="font-bold text-white block mb-1">💡 Instructor Recommendation & Mathematical Guidance:</span>
              <p className="leading-relaxed">{asymptoticRecommendation}</p>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* MODE 3: CONTAMINATION, LABEL NOISE & COST-SENSITIVE SIEVE */}
        {/* ------------------------------------------------------------------- */}
        {studioMode === "noise_sieve" && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>🛡️</span> Mode 3: Contamination, Label Noise & Cost-Sensitive Loss Sieve
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Evaluate how training set corruption (human mislabeling) and severe class imbalance affect empirical gradient updates under MSE vs Huber vs Cost-Sensitive losses.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Parameter Stability:</span>
                <span className={clsx(
                  "px-2.5 py-1 rounded text-xs font-bold font-mono",
                  stabilityPct > 80 ? "bg-emerald-500/20 text-emerald-300" : stabilityPct > 60 ? "bg-amber-500/20 text-amber-300" : "bg-rose-500/20 text-rose-300"
                )}>
                  {stabilityPct}%
                </span>
              </div>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-300">
                  <span>Injected Label Noise:</span>
                  <span className="text-rose-400 font-mono">{labelNoisePct}% corrupted</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="40"
                  step="5"
                  value={labelNoisePct}
                  onChange={(e) => setLabelNoisePct(parseInt(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer"
                />
                <span className="text-[10px] text-slate-400 block">Mislabeled instances in D_train</span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Class Distribution (Majority:Minority)</label>
                <div className="grid grid-cols-4 gap-1.5">
                  {["50:50", "80:20", "90:10", "95:5"].map((ratio) => (
                    <button
                      key={ratio}
                      onClick={() => setClassImbalanceRatio(ratio)}
                      className={clsx(
                        "py-1 text-xs font-bold rounded border transition-colors",
                        classImbalanceRatio === ratio
                          ? "bg-amber-600 border-amber-400 text-white"
                          : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
                      )}
                    >
                      {ratio}
                    </button>
                  ))}
                </div>
                <span className="text-[10px] text-slate-400 block">Imbalance prevalence in training corpus</span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Empirical Loss Objective</label>
                <div className="flex flex-col gap-1">
                  {[
                    { id: "mse", label: "Standard MSE (L2 Loss)" },
                    { id: "huber", label: "Robust Huber Loss (Delta=1.35)" },
                    { id: "cost_sensitive", label: "Cost-Sensitive Weighted ERM" }
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setLossStrategy(s.id)}
                      className={clsx(
                        "text-left px-2.5 py-1 text-xs font-semibold rounded border transition-colors",
                        lossStrategy === s.id
                          ? "bg-indigo-600 border-indigo-400 text-white"
                          : "bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700"
                      )}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Visual Sample Matrix Representation */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-300 block">
                Representative Batch of 20 Training Instances in D_train:
              </span>
              <div className="grid grid-cols-4 sm:grid-cols-10 gap-2">
                {sampleGrid.map((item) => (
                  <div
                    key={item.id}
                    className={clsx(
                      "p-2 rounded-lg border text-center text-[10px] font-mono transition-transform hover:scale-105",
                      item.corrupted
                        ? "bg-rose-500/20 border-rose-500 text-rose-300 shadow-md shadow-rose-500/20"
                        : item.cls.startsWith("Minority")
                        ? "bg-amber-500/20 border-amber-500 text-amber-300"
                        : "bg-slate-950 border-slate-700 text-slate-300"
                    )}
                  >
                    <div className="font-bold">#{item.id}</div>
                    <div className="text-[9px] truncate">{item.corrupted ? "CORRUPT" : item.cls.startsWith("Minority") ? "MINORITY" : "NORMAL"}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Metrics Comparison */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 uppercase font-semibold">Apparent Training Accuracy (On D_train)</span>
                <div className="text-2xl font-black text-cyan-400 font-mono">{apparentAcc}%</div>
                <span className="text-[11px] text-slate-400">Flattering illusion created by fitting corrupt/majority data</span>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 uppercase font-semibold">Genuine Generalization Accuracy (On D_test)</span>
                <div className={clsx("text-2xl font-black font-mono", parseFloat(trueGenAcc) < 75 ? "text-rose-400" : "text-emerald-400")}>
                  {trueGenAcc}%
                </div>
                <span className="text-[11px] text-slate-400">Actual performance on clean, unseen real-world records</span>
              </div>
            </div>

            {/* Explanatory Insight */}
            <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 text-xs sm:text-sm text-amber-200">
              <span className="font-bold text-white block mb-1">⚡ Engineering Insight:</span>
              <p className="leading-relaxed">{lossInsight}</p>
            </div>
          </div>
        )}
      </section>

      {/* ===================================================================== */}
      {/* SECTION 3: FORMAL MATHEMATICAL FORMULATIONS */}
      {/* ===================================================================== */}
      <section id="math" className="space-y-8 scroll-mt-6">
        <div className="space-y-1 border-b border-slate-800 pb-3">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-indigo-400">3.</span> Formal Mathematical Formulations
          </h2>
          <p className="text-sm text-slate-400">
            Statistical learning foundations, VC generalization bounds, and regularized objective functions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: ERM Principle */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="text-indigo-400">1.</span> Regularized Empirical Risk Minimization
            </h3>
            <p className="text-xs text-slate-300">
              The parameter vector theta is chosen to minimize empirical loss plus a structural complexity penalty:
            </p>
            <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 font-mono text-cyan-300 text-xs sm:text-sm overflow-x-auto text-center">
              {"θ̂ = argmin_θ [ (1 / N) ∑_{i=1}^N L(f(x_i; θ), y_i) + λ Ω(θ) ]"}
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Where <code className="text-slate-300 font-mono">L(., .)</code> is the pointwise loss (e.g. squared error or cross-entropy) and <code className="text-slate-300 font-mono">Ω(θ)</code> is the L2/L1 penalty bounding hypothesis capacity.
            </p>
          </div>

          {/* Card 2: VC Generalization Bound */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="text-cyan-400">2.</span> Vapnik-Chervonenkis (VC) Generalization Bound
            </h3>
            <p className="text-xs text-slate-300">
              With probability at least 1 - δ over the random draw of D_train:
            </p>
            <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 font-mono text-cyan-300 text-xs sm:text-sm overflow-x-auto text-center">
              R_true(h) ≤ R_emp(h) + √[ (8 / N) ( d_VC ln(2eN / d_VC) + ln(4 / δ) ) ]
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Demonstrates that as training sample size <code className="text-slate-300 font-mono">N</code> grows large relative to VC dimension <code className="text-slate-300 font-mono">d_VC</code>, empirical risk asymptotically converges to true generalization risk.
            </p>
          </div>

          {/* Card 3: Standard Error of Sample Mean */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="text-amber-400">3.</span> Central Limit Standard Error of Training Estimates
            </h3>
            <p className="text-xs text-slate-300">
              The variance of estimated parameters scales inversely with the size of D_train:
            </p>
            <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 font-mono text-amber-300 text-xs sm:text-sm overflow-x-auto text-center">
              SE(θ̂) = σ / √N_train  ⟹  Var(θ̂) ∝ 1 / N_train
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Doubling parameter estimation precision requires quadrupling the training dataset size <code className="text-slate-300 font-mono">N_train</code>.
            </p>
          </div>

          {/* Card 4: Robust Huber Loss Formulation */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400">4.</span> Robust Huber Loss for Label Noise Resistance
            </h3>
            <p className="text-xs text-slate-300">
              Transitions smoothly from quadratic L2 loss to linear L1 loss when error residual exceeds delta:
            </p>
            <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 font-mono text-emerald-300 text-xs sm:text-sm overflow-x-auto text-center">
              L_δ(e) = (1/2) e² if |e| ≤ δ,  else δ (|e| - (1/2) δ)
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Prevents noisy training instances from generating explosive quadratic gradients that hijack the parameter vector.
            </p>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 4: REAL-WORLD REGIONAL INDUSTRIAL CASE STUDIES */}
      {/* ===================================================================== */}
      <section id="cases" className="space-y-8 scroll-mt-6">
        <div className="space-y-1 border-b border-slate-800 pb-3">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-indigo-400">4.</span> Real-World Regional Industrial Case Studies (West Bengal)
          </h2>
          <p className="text-sm text-slate-400">
            Authentic training dataset curation, partitioning, and sanitization across Bengal enterprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Case 1: WBSEDCL */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-4 hover:border-indigo-500/40 transition-colors shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 uppercase">
                Power Distribution
              </span>
              <span className="text-xs text-slate-400 font-mono">35,040 SCADA Intervals</span>
            </div>
            <h3 className="text-lg font-bold text-white">WBSEDCL Smart Grid Peak Load Forecasting</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Engineers training load forecasting models across Bidhannagar & Barasat 33kV substations strictly prohibited random shuffle splits. Shuffling would allow future weather telemetries to leak into historical training data. Instead, a chronological forward split was enforced, and seasonal Durga Puja carnival lighting surges were marked with holiday contextual flags rather than purged as noise.
            </p>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs text-indigo-300">
              <strong>Key Protocol:</strong> Chronological training split + pre-monsoon baseline normalization.
            </div>
          </div>

          {/* Case 2: Kolkata Metro Green Line */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-4 hover:border-cyan-500/40 transition-colors shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 uppercase">
                Transit Mobility
              </span>
              <span className="text-xs text-slate-400 font-mono">1,250,000 Smartcard Taps</span>
            </div>
            <h3 className="text-lg font-bold text-white">KMRC Automatic Fare Collection (AFC) Turnstiles</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Modeling passenger flow across Howrah Maidan, Esplanade, and Salt Lake Sector V required Group-Aware Splitting by passenger smartcard ID. Assigning morning peak taps from commuter Mamata to D_train while her evening return tap landed in D_test caused 99% artificial test accuracy that failed on new commuters. Group-aware isolation preserved genuine generalizability.
            </p>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs text-cyan-300">
              <strong>Key Protocol:</strong> GroupKFold by commuter ID to prevent identity leakage across gates.
            </div>
          </div>

          {/* Case 3: Nadia SHG Microfinance */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-4 hover:border-amber-500/40 transition-colors shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">
                Financial Inclusion
              </span>
              <span className="text-xs text-slate-400 font-mono">4,800 Borrower Records</span>
            </div>
            <h3 className="text-lg font-bold text-white">Nadia District Women SHG Credit Default Scoring</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              With 97.4% on-time repayment and only 2.6% default rate across rural self-help groups, unweighted ERM converged to predicting zero defaults for all borrowers. Implementing Cost-Sensitive ERM with a 15x penalty multiplier on default misclassifications forced the optimizer to allocate parameter capacity to high-risk repayment indicators, safeguarding revolving funds.
            </p>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs text-amber-300">
              <strong>Key Protocol:</strong> Cost-Sensitive class weighting inside D_train without oversampling test sets.
            </div>
          </div>

          {/* Case 4: Siliguri Tea Auction */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-4 hover:border-emerald-500/40 transition-colors shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase">
                Agro-Tech
              </span>
              <span className="text-xs text-slate-400 font-mono">1,240 Harvest Batches</span>
            </div>
            <h3 className="text-lg font-bold text-white">Dooars & Darjeeling Tea Quality Auction Scoring</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              NIR spectroscopy grading suffered from subjective human master-taster variance, injecting approximately 12% label noise into training targets. Replacing ordinary least squares with Huber Loss (delta = 1.2) bounded the gradient pull of erratic sensory scores, allowing spectral absorption peak coefficients to generalize cleanly across seasonal flushes.
            </p>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs text-emerald-300">
              <strong>Key Protocol:</strong> Robust Huber objective to inoculate regression weights against label noise.
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 5: DIAGNOSTIC ASSESSMENT QUIZ (5 SCENARIO QUESTIONS) */}
      {/* ===================================================================== */}
      <section id="quiz" className="space-y-8 scroll-mt-6">
        <div className="space-y-1 border-b border-slate-800 pb-3">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-indigo-400">5.</span> Diagnostic Assessment Quiz (Scenario-Based)
          </h2>
          <p className="text-sm text-slate-400">
            Test your mastery of training set hygiene, learning curves, and leakage prevention with five multi-stage industrial engineering challenges.
          </p>
        </div>

        <div className="space-y-6">
          {QUIZ_QUESTIONS.map((q) => {
            const userChoice = selectedAnswers[q.id];
            const isRevealed = revealedAnswers[q.id];

            return (
              <div
                key={q.id}
                className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl"
              >
                <div className="space-y-1">
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">{q.title}</span>
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs sm:text-sm text-slate-300 italic">
                    "{q.scenario}"
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white pt-2">{q.question}</h3>
                </div>

                {/* Options */}
                <div className="space-y-2">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = userChoice === optIdx;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectQuizOption(q.id, optIdx)}
                        className={clsx(
                          "w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all duration-200 flex items-start gap-3",
                          isSelected
                            ? "bg-indigo-600/20 border-indigo-500 text-white shadow-md shadow-indigo-500/10"
                            : "bg-slate-950/70 border-slate-800 text-slate-300 hover:bg-slate-800/60 hover:text-white"
                        )}
                      >
                        <span className={clsx(
                          "w-5 h-5 rounded-full border flex items-center justify-center text-xs font-bold shrink-0 mt-0.5",
                          isSelected ? "border-indigo-400 bg-indigo-500 text-white" : "border-slate-600 text-slate-400"
                        )}>
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Reveal & Explanation */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <button
                    onClick={() => handleToggleRevealQuiz(q.id)}
                    className="px-4 py-1.5 rounded-lg text-xs font-bold bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                  >
                    {isRevealed ? "Hide Explanation" : "Check Answer & Rationale"}
                  </button>

                  {userChoice !== undefined && isRevealed && (
                    <span className={clsx(
                      "text-xs font-bold",
                      q.options[userChoice]?.isCorrect ? "text-emerald-400" : "text-rose-400"
                    )}>
                      {q.options[userChoice]?.isCorrect ? "Correct! 🎯 Outstanding understanding." : "Incorrect. Review the statistical proof below."}
                    </span>
                  )}
                </div>

                {isRevealed && (
                  <div className="p-4 rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-xs sm:text-sm text-slate-300 space-y-1">
                    <span className="font-bold text-white block">Detailed Rationale:</span>
                    <p className="leading-relaxed">{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 6: PRODUCTION PITFALLS & INDUSTRIAL BEST PRACTICES */}
      {/* ===================================================================== */}
      <section id="pitfalls" className="space-y-8 scroll-mt-6">
        <div className="space-y-1 border-b border-slate-800 pb-3">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-rose-400">6.</span> Production Pitfalls & Industrial Best Practices
          </h2>
          <p className="text-sm text-slate-400">
            Crucial anti-patterns to avoid when constructing and operating on training datasets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900/90 border border-rose-500/30 rounded-xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-base">
              <span>⚠️</span> Pitfall 1: Preprocessing Before Train-Test Partition
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>The Mistake:</strong> Executing <code className="text-rose-300 font-mono">StandardScaler().fit_transform(X)</code> or categorical encoding on the full dataset before splitting.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong>The Remedy:</strong> Embed all scalers and encoders inside a Scikit-Learn <code className="text-emerald-300 font-mono">Pipeline</code>. Ensure <code className="text-emerald-300 font-mono">.fit()</code> is invoked strictly on D_train, and <code className="text-emerald-300 font-mono">.transform()</code> on test holdouts.
            </p>
          </div>

          <div className="bg-slate-900/90 border border-rose-500/30 rounded-xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-base">
              <span>⚠️</span> Pitfall 2: High Dimensionality Under-Sampling (p &gt; N)
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>The Mistake:</strong> Training a 120-feature ensemble on only 80 training samples.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong>The Remedy:</strong> Maintain the golden rule of at least 15 to 20 samples per feature for linear models, or apply L1 Lasso regularization and PCA dimensionality reduction fit exclusively on D_train.
            </p>
          </div>

          <div className="bg-slate-900/90 border border-rose-500/30 rounded-xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-base">
              <span>⚠️</span> Pitfall 3: Global Resampling (SMOTE Contamination)
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>The Mistake:</strong> Applying SMOTE to balance minority samples across the full dataset prior to train-test splitting.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong>The Remedy:</strong> Use <code className="text-emerald-300 font-mono">imblearn.pipeline.Pipeline</code> so synthetic instances are generated solely within training folds. Never alter the test set's natural distribution.
            </p>
          </div>

          <div className="bg-slate-900/90 border border-rose-500/30 rounded-xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-base">
              <span>⚠️</span> Pitfall 4: Covariate Shift Blindness
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>The Mistake:</strong> Training a credit scoring model on urban Salt Lake professionals and deploying to rural Sundarbans without importance weighting.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong>The Remedy:</strong> Monitor Population Stability Index (PSI &gt; 0.2 signals severe shift) and apply importance weighting <code className="text-emerald-300 font-mono">w(x) = P_test(x) / P_train(x)</code>.
            </p>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 7: VIVA VOCE & TEACHER SUKANTA HUI */}
      {/* ===================================================================== */}
      <section id="faq" className="space-y-8 scroll-mt-6">
        <div className="space-y-1 border-b border-slate-800 pb-3">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-indigo-400">7.</span> Academic Viva Voce Questions & Teacher Guidance
          </h2>
          <p className="text-sm text-slate-400">
            Official MAKAUT university examination questions answered by Senior Instructor Sukanta Hui.
          </p>
        </div>

        <Teacher />

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6">
          <FAQTemplate questions={questions} />
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SECTION 8: FULL PYTHON LAB ENGINE & PLAIN TEXT NOTES */}
      {/* ===================================================================== */}
      <section id="lab" className="space-y-8 scroll-mt-6">
        <div className="space-y-1 border-b border-slate-800 pb-3">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-indigo-400">8.</span> Pure Python Laboratory Engine & Comprehensive Lecture Notes
          </h2>
          <p className="text-sm text-slate-400">
            Zero-dependency academic simulation script and printable full-length lecture transcript.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <span>🐍</span> Python Simulation Laboratory (<code className="text-cyan-300 font-mono text-sm">training_dataset_lab.py</code>)
            </h3>
            <PythonFileLoader
              code={labCode}
              filename="training_dataset_lab.py"
              moduleName="Topic 6: Training Dataset Laboratory Simulator"
            />
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <span>📄</span> Academic Lecture Reference Transcript (<code className="text-indigo-300 font-mono text-sm">topic6_note.txt</code>)
            </h3>
            <PlainTextPrint
              content={noteText}
              filename="topic6_note.txt"
              title="Topic 6: Training Dataset Academic Study Notes"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Topic6;
