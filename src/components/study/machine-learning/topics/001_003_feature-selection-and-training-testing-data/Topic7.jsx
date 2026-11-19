import React, { useState, useId, useMemo } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import labCode from "./topic7_files/testing_dataset_lab.py?raw";
import noteText from "./topic7_files/topic7_note.txt?raw";
import questions from "./topic7_files/topic7_questions.js";

// =============================================================================
// REGIONAL DOMAIN PRESETS FOR MODE 3 (OOD STRESS-TESTER)
// =============================================================================

const REGIONAL_SCENARIOS = {
  cesc: {
    title: "CESC Kolkata Smart Grid (Nor'wester Monsoon Surge)",
    sector: "Power Utilities",
    baselineAcc: 94.5,
    description: "Evaluates anomaly sentries trained on dry pre-monsoon telemetry when subjected to violent Nor'wester storm outages and lightning transients across North Kolkata."
  },
  airport: {
    title: "CCU Airport Baggage Scanner (High-Clutter Electronics)",
    sector: "Aviation Security",
    baselineAcc: 96.2,
    description: "Evaluates carry-on contraband classifiers trained on light traveler bags when tested against dense festive luggage containing brass artifacts and layered lithium batteries."
  },
  bank: {
    title: "Bandhan Bank MSME Lending (Macroeconomic Inflation Shift)",
    sector: "Financial Inclusion",
    baselineAcc: 91.8,
    description: "Evaluates credit risk scoring models trained during stable interest cycles against an Out-of-Time (OOT) festival quarter with sudden wholesale raw material inflation."
  },
  swiggy: {
    title: "Swiggy / Zomato Durga Puja Night Delivery SLA",
    sector: "Hyperlocal Logistics",
    baselineAcc: 93.0,
    description: "Stress-tests delivery time regression models during Saptami through Dashami nocturnal road barricades near mega-pandals in South Kolkata (Suruchi Sangha / Ekdalia)."
  }
};

const Topic7 = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [studioMode, setStudioMode] = useState("peeking"); // 'peeking' | 'precision' | 'ood'

  // MODE 1 STATE: The Peeking Paradox Simulator
  const [candidateModelsCount, setCandidateModelsCount] = useState(25); // M in [1, 100]
  const [testSampleSize, setTestSampleSize] = useState(80); // N_test in [30, 500]
  const [nullCapability, setNullCapability] = useState("null"); // 'null' (50%) | 'mild' (65%) | 'strong' (85%)

  // MODE 2 STATE: Wald Confidence Interval & Statistical Power
  const [observedAcc, setObservedAcc] = useState(0.88); // 0.60 to 0.98
  const [ciNTest, setCiNTest] = useState(150); // 20 to 2500
  const [confidenceLevel, setConfidenceLevel] = useState(0.95); // 0.90, 0.95, 0.99
  const [competitorDelta, setCompetitorDelta] = useState(0.03); // Model A vs Model B delta (e.g. 3%)

  // MODE 3 STATE: Out-of-Distribution Shift Stress-Tester
  const [selectedScenarioKey, setSelectedScenarioKey] = useState("cesc");
  const [shiftMagnitude, setShiftMagnitude] = useState(1.4); // 0.0 to 3.0
  const [stressSeverity, setStressSeverity] = useState(1.2); // 0.5 to 2.5

  // QUIZ STATE
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [revealedAnswers, setRevealedAnswers] = useState({});

  const svgId1 = useId();
  const svgId2 = useId();
  const svgId3 = useId();

  // ---------------------------------------------------------------------------
  // COMPUTATIONS FOR MODE 1: PEEKING PARADOX
  // ---------------------------------------------------------------------------
  const { modelDistribution, avgScore, maxScore, theoreticalMax, inflationDelta } = useMemo(() => {
    const baseTrue = nullCapability === "null" ? 0.50 : nullCapability === "mild" ? 0.65 : 0.85;
    const stdNull = Math.sqrt((baseTrue * (1 - baseTrue)) / testSampleSize);

    // Deterministic pseudo-random generation of M candidate model scores
    const models = [];
    let sumAcc = 0;
    for (let m = 1; m <= candidateModelsCount; m++) {
      // Deterministic spread using sinusoidal pseudo-hash
      const pseudoZ = Math.sin(m * 17.3 + testSampleSize * 0.1) * 1.8 + Math.cos(m * 5.7) * 0.5;
      const acc = Math.min(0.99, Math.max(0.05, baseTrue + pseudoZ * stdNull));
      models.push({ id: m, acc });
      sumAcc += acc;
    }

    const calculatedAvg = sumAcc / candidateModelsCount;
    const calculatedMax = Math.max(...models.map((m) => m.acc));

    // Extreme Value Theory theoretical max approximation: mu + sigma * sqrt(2 * ln(M))
    const theoMax = Math.min(0.99, baseTrue + stdNull * Math.sqrt(2.0 * Math.log(Math.max(2, candidateModelsCount))));
    const inflation = calculatedMax - baseTrue;

    return {
      modelDistribution: models,
      avgScore: calculatedAvg,
      maxScore: calculatedMax,
      theoreticalMax: theoMax,
      inflationDelta: Math.max(0, inflation)
    };
  }, [candidateModelsCount, testSampleSize, nullCapability]);

  // ---------------------------------------------------------------------------
  // COMPUTATIONS FOR MODE 2: WALD CONFIDENCE INTERVALS & POWER
  // ---------------------------------------------------------------------------
  const { marginOfError, ciLower, ciUpper, zStat, pValue, isSignificant } = useMemo(() => {
    const zMap = { 0.90: 1.645, 0.95: 1.960, 0.99: 2.576 };
    const zCrit = zMap[confidenceLevel] || 1.960;

    const stdErr = Math.sqrt((observedAcc * (1 - observedAcc)) / ciNTest);
    const me = zCrit * stdErr;
    const lower = Math.max(0, observedAcc - me);
    const upper = Math.min(1, observedAcc + me);

    // Two-proportion z-test between Model A (observedAcc) and Model B (observedAcc - competitorDelta)
    const pA = observedAcc;
    const pB = Math.max(0.1, observedAcc - competitorDelta);
    const pPooled = (pA + pB) / 2;
    const sePooled = Math.sqrt(pPooled * (1 - pPooled) * (2 / ciNTest));
    const calcZ = (pA - pB) / (sePooled || 1e-6);

    // Approx normal CDF (Abramowitz & Stegun erf)
    const erf = (x) => {
      const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429, pVal = 0.3275911;
      const sign = x < 0 ? -1 : 1;
      const absX = Math.abs(x);
      const t = 1.0 / (1.0 + pVal * absX);
      const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-absX * absX);
      return sign * y;
    };
    const cdf = (z) => 0.5 * (1 + erf(z / Math.sqrt(2)));
    const pValTwoTailed = 2 * (1 - cdf(Math.abs(calcZ)));

    return {
      marginOfError: me,
      ciLower: lower,
      ciUpper: upper,
      zStat: calcZ,
      pValue: pValTwoTailed,
      isSignificant: pValTwoTailed < (1 - confidenceLevel)
    };
  }, [observedAcc, ciNTest, confidenceLevel, competitorDelta]);

  // ---------------------------------------------------------------------------
  // COMPUTATIONS FOR MODE 3: OOD STRESS-TEST
  // ---------------------------------------------------------------------------
  const { currentScenario, oodAcc, dropPct, calibrationError, oodDiagnosis } = useMemo(() => {
    const sc = REGIONAL_SCENARIOS[selectedScenarioKey] || REGIONAL_SCENARIOS.cesc;
    const base = sc.baselineAcc;

    // Simulated degradation based on shift magnitude and stress severity
    const degradation = (shiftMagnitude * 5.2) + (stressSeverity * 3.8);
    const shifted = Math.max(45.0, base - degradation);
    const drop = base - shifted;
    const ece = (0.04 + (shiftMagnitude * 0.08) + (stressSeverity * 0.05)).toFixed(3);

    let diag = {
      label: "Operational Alignment Maintained",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/30",
      desc: "Model holds steady under mild operational variance. Generalization bounds remain certified for deployment."
    };

    if (drop > 15.0) {
      diag = {
        label: "Catastrophic OOD Failure",
        color: "text-rose-400",
        bg: "bg-rose-500/10 border-rose-500/30",
        desc: "Severe distribution drift has completely broken linear decision boundaries. Model outputs unreliable high-confidence errors."
      };
    } else if (drop > 6.0) {
      diag = {
        label: "Moderate Covariate Drift",
        color: "text-amber-400",
        bg: "bg-amber-500/10 border-amber-500/30",
        desc: "Noticeable performance degradation in tail feature regions. Recalibration or domain adaptation required before sign-off."
      };
    }

    return {
      currentScenario: sc,
      oodAcc: shifted.toFixed(1),
      dropPct: drop.toFixed(1),
      calibrationError: ece,
      oodDiagnosis: diag
    };
  }, [selectedScenarioKey, shiftMagnitude, stressSeverity]);

  // ---------------------------------------------------------------------------
  // DIAGNOSTIC ASSESSMENT QUIZ DEFINITIONS
  // ---------------------------------------------------------------------------
  const QUIZ_QUESTIONS = [
    {
      id: 1,
      title: "Diagnostic 1: The Test Set Peeking Fallacy",
      scenario: "A junior ML engineer at Salt Lake Sector V evaluates 40 different candidate XGBoost models on the sealed testing dataset and proudly announces that Model #27 achieved 94.2% test accuracy, compared to the 86% average of other models.",
      question: "Why does the lead data architect reject this benchmark result as statistically invalid?",
      options: [
        { label: "XGBoost requires GPUs, whereas test evaluations must be performed on CPUs.", isCorrect: false },
        { label: "Multiple hypothesis testing on a fixed test set causes Extreme Value inflation: Model #27 likely won by stochastic luck, overfitting the test set.", isCorrect: true },
        { label: "The test dataset should have been normalized with L1 norm rather than L2 norm.", isCorrect: false },
        { label: "Testing datasets can only be evaluated with Decision Trees, not ensemble models.", isCorrect: false }
      ],
      explanation: "Evaluating M=40 models on the exact same test dataset and choosing the highest score violates unbiased risk estimation. Extreme value theory proves that the maximum of multiple null models inflates as mu + sigma*sqrt(2 ln M). The test set was turned into an overfitted validation set."
    },
    {
      id: 2,
      title: "Diagnostic 2: Underpowered Test Sets & Confidence Interval Bands",
      scenario: "A biometric health startup in Kolkata tests an arrhythmia classifier on N_test = 40 patient ECG strips and claims a breakthrough 92.5% accuracy. A rival vendor claims their model achieved 87.5% on the same 40 strips.",
      question: "Based on the 95% Wald Confidence Interval and two-proportion z-test, what is the scientific reality?",
      options: [
        { label: "Model 1 is definitively superior because 92.5% is 5% higher than 87.5%.", isCorrect: false },
        { label: "The sample size is too underpowered: with N=40, the margin of error is +/- 8.1% and the p-value is 0.46, making the two models statistically indistinguishable.", isCorrect: true },
        { label: "A test set of 40 samples violates the Central Limit Theorem because N must be >= 10,000.", isCorrect: false },
        { label: "ECG data cannot be tested with classification accuracy.", isCorrect: false }
      ],
      explanation: "With N_test = 40, the standard error of test accuracy is ~4.16% and the 95% confidence interval spans [84.3%, 100%]. A two-sample z-test gives z = 0.73 (p-value = 0.46). The 5% gap is completely engulfed by sampling variance and cannot prove superiority."
    },
    {
      id: 3,
      title: "Diagnostic 3: Out-of-Time (OOT) Temporal Integrity",
      scenario: "In building a micro-loan default prediction model for rural Bandhan Bank branches in Nadia, an engineer proposes using a random 80/20 shuffle split across all 3 years of borrower history.",
      question: "Why does the model risk governance committee demand an Out-of-Time (OOT) chronological test split instead?",
      options: [
        { label: "Random shuffling allows future macroeconomic cycles and post-harvest liquidity states to leak into historical training data, generating illusory accuracy.", isCorrect: true },
        { label: "Chronological splits run 10 times faster in Python than random shuffle splits.", isCorrect: false },
        { label: "Banks are legally prohibited from training on records collected in autumn.", isCorrect: false },
        { label: "Random shuffle splitting alters the categorical feature names.", isCorrect: false }
      ],
      explanation: "Financial data is non-stationary and auto-correlated. Random shuffling creates lookahead bias: future interest rates and post-harvest economic booms leak into training. An Out-of-Time split (e.g. training on months 1-24, testing on months 25-36) honestly tests whether the model survives future macroeconomic cycles."
    },
    {
      id: 4,
      title: "Diagnostic 4: Preprocessing Contamination via Test Sets",
      scenario: "Before computing test metrics on an image classifier at CCU Airport, an intern writes: `scaler = StandardScaler(); X_test_scaled = scaler.fit_transform(X_test)`.",
      question: "What catastrophic error was committed?",
      options: [
        { label: "StandardScaler cannot process negative values.", isCorrect: false },
        { label: "Calling .fit_transform() on the test set recalculates scaling parameters from test data, destroying the baseline calibration learned during training.", isCorrect: true },
        { label: "The intern should have called scaler.fit() three times.", isCorrect: false },
        { label: "The test set was enlarged by 50% automatically.", isCorrect: false }
      ],
      explanation: "The Golden Rule dictates: `fit` on training data, `transform` ONLY on test data. Calling `fit_transform` on X_test recalibrates mean and variance to the test set, masking distributional shifts and distorting the decision boundary."
    },
    {
      id: 5,
      title: "Diagnostic 5: Air-Gapped Blind Test Vault Architecture",
      scenario: "To evaluate AI vendors competing for CESC's smart grid anomaly detection contract, the utility company refuses to send the test CSV file to the vendors, requiring them to submit Docker containers instead.",
      question: "What core ML governance problem does this air-gapped test vault solve?",
      options: [
        { label: "It reduces the electricity consumed by the data science laptops.", isCorrect: false },
        { label: "It guarantees zero peeking, zero data leakage, and enforces a strict one-shot evaluation policy where vendors cannot tune models against test labels.", isCorrect: true },
        { label: "It allows CESC to run the model without paying the vendor license fees.", isCorrect: false },
        { label: "It converts tabular smart meter telemetry into image files.", isCorrect: false }
      ],
      explanation: "Air-gapped blind evaluation vaults keep test labels and features locked inside an isolated audit sandbox. Vendors submit compiled inference packages that run in a black box, eliminating manual test inspection, hyperparameter p-hacking, and reverse-engineering of holdout benchmarks."
    }
  ];

  const handleSelectQuizOption = (qId, optionIdx) => {
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const handleToggleRevealQuiz = (qId) => {
    setRevealedAnswers((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  return (
    <div className="space-y-12 text-slate-200 leading-relaxed max-w-6xl mx-auto pb-16 px-4 sm:px-6">
      {/* ===================================================================== */}
      {/* HERO SECTION WITH QUICK JUMP NAV */}
      {/* ===================================================================== */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              BCAC701B • Feature Selection and Training & Testing Data • Topic 7
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Masterclass Standard
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Testing Dataset: Unbiased Generalization, Statistical Power & Governance Vault
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl">
            Master the mathematics of unbiased risk estimation, Wald confidence intervals, the Test Set Peeking Paradox, two-model significance testing, and air-gapped holdout governance across West Bengal enterprise ecosystems.
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
        <div className="space-y-1 border-b border-slate-800 pb-3">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-indigo-400">1.</span> Novice Masterclass: The Sanctity of the Testing Dataset
          </h2>
          <p className="text-sm text-slate-400">
            Intuitive mental models, statistical governance pillars, and jargon clarification for BCA/MCA students.
          </p>
        </div>

        {/* 3 Intuitive Mental Models */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-4 hover:border-indigo-500/50 transition-colors shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 text-2xl font-bold">
              🔒
            </div>
            <h3 className="text-lg font-bold text-white">Metaphor 1: The Sealed Exam Vault</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              The testing dataset is the sealed MAKAUT final semester examination paper locked in the university controller's safe. It is opened only once on the day of the exam. If the professor opens the envelope a month early to show sample questions or adjust classroom lessons (hyperparameter tuning on test), the marks become a fraudulent measure of student intellect.
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-4 hover:border-cyan-500/50 transition-colors shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 text-2xl font-bold">
              💊
            </div>
            <h3 className="text-lg font-bold text-white">Metaphor 2: Double-Blind Clinical Trial</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              In clinical vaccine trials at Kolkata Medical College, the test patient group receives the drug in a sealed double-blind setup. If doctors peek at interim test results and modify the chemical formulation midway to cure those specific test subjects, the entire clinical trial is disqualified by health regulators for statistical contamination.
            </p>
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-4 hover:border-emerald-500/50 transition-colors shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-2xl font-bold">
              🚗
            </div>
            <h3 className="text-lg font-bold text-white">Metaphor 3: The Automotive Crash Barrier</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Automotive safety engineers test a brand-new car by crashing it into a standardized barrier. If the engineers reinforce only the exact two square inches where that specific barrier impacts (overfitting to the test scenario), the vehicle will pass the test lab with 5 stars but crumple fatally in a real highway collision.
            </p>
          </div>
        </div>

        {/* Core Governance Pillars */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span>🏛️</span> The Four Governance Pillars of the Testing Dataset
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="bg-slate-950/80 border border-slate-800/80 rounded-lg p-4 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Pillar 1</span>
              <h4 className="text-sm font-semibold text-white">Unbiased Risk Estimation</h4>
              <p className="text-xs text-slate-300">
                Mathematically guarantees that the expected empirical test error equals the true population generalization risk: <code className="text-indigo-300 font-mono">E[R_hat_test] = R_true</code>.
              </p>
            </div>
            <div className="bg-slate-950/80 border border-slate-800/80 rounded-lg p-4 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Pillar 2</span>
              <h4 className="text-sm font-semibold text-white">Sample Size Power (N_test)</h4>
              <p className="text-xs text-slate-300">
                Ensures the test set contains sufficient instances to shrink the Wald confidence interval band <code className="text-cyan-300 font-mono">SE ∝ 1/√N_test</code> and distinguish genuine signal from luck.
              </p>
            </div>
            <div className="bg-slate-950/80 border border-slate-800/80 rounded-lg p-4 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Pillar 3</span>
              <h4 className="text-sm font-semibold text-white">The One-Shot Policy</h4>
              <p className="text-xs text-slate-300">
                Prohibits evaluating M candidate models iteratively on D_test, neutralizing the Multiple Testing Fallacy and Extreme Value inflation.
              </p>
            </div>
            <div className="bg-slate-950/80 border border-slate-800/80 rounded-lg p-4 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Pillar 4</span>
              <h4 className="text-sm font-semibold text-white">Operational Shift Stress-Testing</h4>
              <p className="text-xs text-slate-300">
                Audits model survival under Out-of-Time (OOT) forward temporal splits and Out-of-Distribution (OOD) extreme operational edge cases.
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
              <span className="font-semibold text-indigo-300">Wald Confidence Interval:</span>
              <p className="text-slate-300 text-xs mt-1">
                The statistical interval <code className="text-slate-200 font-mono">p_hat ± 1.96 * √(p(1-p)/N)</code> bounding the true population accuracy at the 95% confidence level.
              </p>
            </div>
            <div className="bg-slate-950/60 p-3.5 rounded-lg border border-slate-800">
              <span className="font-semibold text-cyan-300">Test Set Peeking:</span>
              <p className="text-slate-300 text-xs mt-1">
                The anti-pattern of using test set feedback to guide modeling decisions, hyperparameter tuning, or model selection, corrupting the test set into an overfitted validation set.
              </p>
            </div>
            <div className="bg-slate-950/60 p-3.5 rounded-lg border border-slate-800">
              <span className="font-semibold text-amber-300">McNemar's Paired Test:</span>
              <p className="text-slate-300 text-xs mt-1">
                A non-parametric statistical hypothesis test specifically designed for paired binary classifications to determine if Model A significantly outperforms Model B on identical test samples.
              </p>
            </div>
            <div className="bg-slate-950/60 p-3.5 rounded-lg border border-slate-800">
              <span className="font-semibold text-rose-300">Out-of-Time (OOT) Holdout:</span>
              <p className="text-slate-300 text-xs mt-1">
                A test dataset harvested chronologically after the training cutoff period, explicitly measuring resilience against temporal macroeconomic shifts and concept drift.
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
              Simulate test peeking hazards, confidence interval precision scaling, and operational distribution shifts.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex p-1 bg-slate-900 border border-slate-800 rounded-xl">
            <button
              onClick={() => setStudioMode("peeking")}
              className={clsx(
                "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                studioMode === "peeking"
                  ? "bg-indigo-600 text-white shadow"
                  : "text-slate-400 hover:text-slate-200"
              )}
            >
              Mode 1: Peeking Paradox
            </button>
            <button
              onClick={() => setStudioMode("precision")}
              className={clsx(
                "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                studioMode === "precision"
                  ? "bg-indigo-600 text-white shadow"
                  : "text-slate-400 hover:text-slate-200"
              )}
            >
              Mode 2: Sample Size & Power
            </button>
            <button
              onClick={() => setStudioMode("ood")}
              className={clsx(
                "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                studioMode === "ood"
                  ? "bg-indigo-600 text-white shadow"
                  : "text-slate-400 hover:text-slate-200"
              )}
            >
              Mode 3: OOD Stress-Tester
            </button>
          </div>
        </div>

        {/* ------------------------------------------------------------------- */}
        {/* MODE 1: THE TEST SET PEEKING PARADOX SIMULATOR */}
        {/* ------------------------------------------------------------------- */}
        {studioMode === "peeking" && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>🎲</span> Mode 1: The Test Set Peeking Paradox (Multiple Testing Fallacy)
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Evaluate M candidate models on a fixed test set of size N_test. Observe how maximum apparent accuracy inflates purely via stochastic luck.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Inflation Delta:</span>
                <span className={clsx(
                  "px-2.5 py-1 rounded text-xs font-bold font-mono",
                  inflationDelta > 0.10 ? "bg-rose-500/20 text-rose-300" : "bg-emerald-500/20 text-emerald-300"
                )}>
                  +{(inflationDelta * 100).toFixed(1)}% Spurious
                </span>
              </div>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-300">
                  <span>Candidate Models Evaluated (M):</span>
                  <span className="text-cyan-400 font-mono">{candidateModelsCount} models</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="80"
                  step="1"
                  value={candidateModelsCount}
                  onChange={(e) => setCandidateModelsCount(parseInt(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
                <span className="text-[10px] text-slate-400 block">Number of times D_test is peeked</span>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-300">
                  <span>Fixed Test Set Size (N_test):</span>
                  <span className="text-indigo-400 font-mono">{testSampleSize} samples</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="400"
                  step="10"
                  value={testSampleSize}
                  onChange={(e) => setTestSampleSize(parseInt(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
                <span className="text-[10px] text-slate-400 block">Smaller test sets inflate variance</span>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Underlying Model Signal Level</label>
                <div className="grid grid-cols-3 gap-1">
                  {[
                    { id: "null", label: "Null (50%)" },
                    { id: "mild", label: "Mild (65%)" },
                    { id: "strong", label: "Strong (85%)" }
                  ].map((sig) => (
                    <button
                      key={sig.id}
                      onClick={() => setNullCapability(sig.id)}
                      className={clsx(
                        "py-1 text-xs font-semibold rounded border transition-colors",
                        nullCapability === sig.id
                          ? "bg-amber-600 border-amber-400 text-white"
                          : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
                      )}
                    >
                      {sig.label}
                    </button>
                  ))}
                </div>
                <span className="text-[10px] text-slate-400 block">True population accuracy</span>
              </div>
            </div>

            {/* Visual Bar Chart of Evaluated Models */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded bg-cyan-500" /> Candidate Models (1 to {candidateModelsCount})
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="w-4 h-0.5 bg-blue-400 border-dashed" /> True Population Mean ({nullCapability === "null" ? "50%" : nullCapability === "mild" ? "65%" : "85%"})
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="w-4 h-0.5 bg-rose-500" /> Spurious Max Performer ({(maxScore * 100).toFixed(1)}%)
                  </span>
                </span>
                <span className="font-mono text-[11px] text-slate-500">Vertical: Test Accuracy %</span>
              </div>

              <div className="relative bg-slate-950 rounded-xl border border-slate-800 p-4 overflow-hidden flex items-center justify-center">
                <svg
                  viewBox="0 0 600 200"
                  className="w-full h-auto max-h-[220px]"
                  id={svgId1}
                >
                  {/* Axis */}
                  <line x1="30" y1="170" x2="570" y2="170" stroke="#334155" strokeWidth="1" />
                  <line x1="30" y1="20" x2="30" y2="170" stroke="#334155" strokeWidth="1" />

                  {/* True Mean Reference Line */}
                  {(() => {
                    const baseTrue = nullCapability === "null" ? 0.50 : nullCapability === "mild" ? 0.65 : 0.85;
                    const yTrue = 170 - baseTrue * 140;
                    const yMax = 170 - maxScore * 140;
                    const barWidth = Math.max(3, Math.min(18, 520 / candidateModelsCount - 2));

                    return (
                      <>
                        <line x1="30" y1={yTrue} x2="570" y2={yTrue} stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="4 4" />
                        <line x1="30" y1={yMax} x2="570" y2={yMax} stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="2 2" />

                        {/* Model bars */}
                        {modelDistribution.map((m, idx) => {
                          const x = 40 + idx * ((530 - barWidth) / Math.max(1, candidateModelsCount - 1));
                          const height = m.acc * 140;
                          const y = 170 - height;
                          const isWinner = m.acc === maxScore;

                          return (
                            <rect
                              key={m.id}
                              x={x}
                              y={y}
                              width={barWidth}
                              height={height}
                              fill={isWinner ? "#f43f5e" : "#06b6d4"}
                              opacity={isWinner ? 1.0 : 0.65}
                              rx="1.5"
                            >
                              <title>{`Model #${m.id}: Accuracy ${(m.acc * 100).toFixed(1)}%`}</title>
                            </rect>
                          );
                        })}
                      </>
                    );
                  })()}
                </svg>
              </div>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 uppercase font-semibold">True Population Accuracy</span>
                <div className="text-2xl font-black text-blue-400 font-mono">
                  {nullCapability === "null" ? "50.0%" : nullCapability === "mild" ? "65.0%" : "85.0%"}
                </div>
                <span className="text-[11px] text-slate-400">Actual predictive capability</span>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 uppercase font-semibold">Spurious Max Test Score</span>
                <div className="text-2xl font-black text-rose-400 font-mono">{(maxScore * 100).toFixed(1)}%</div>
                <span className="text-[11px] text-slate-400">Best performer selected by peeking</span>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 uppercase font-semibold">Theoretical Max Bound</span>
                <div className="text-2xl font-black text-amber-400 font-mono">{(theoreticalMax * 100).toFixed(1)}%</div>
                <span className="text-[11px] text-slate-400 font-mono">μ + σ √(2 ln M) Extreme Value</span>
              </div>
            </div>

            {/* Insight Box */}
            <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-500/10 text-xs sm:text-sm text-rose-200">
              <span className="font-bold text-white block mb-1">⚠️ Mathematical Truth:</span>
              <p className="leading-relaxed">
                By evaluating {candidateModelsCount} candidate models on the exact same test set of N={testSampleSize}, the best model appears to score {(maxScore * 100).toFixed(1)}%, creating an artificial +{(inflationDelta * 100).toFixed(1)}% illusion. If deployed, this model will immediately revert to its true capability in production.
              </p>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* MODE 2: TEST SAMPLE SIZE & WALD CONFIDENCE INTERVAL LAB */}
        {/* ------------------------------------------------------------------- */}
        {studioMode === "precision" && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>📏</span> Mode 2: Test Set Sample Size (N_test) & Wald Confidence Interval Precision
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Adjust test sample size N_test and observed accuracy to visually inspect how the confidence interval shrinks and controls statistical power.
                </p>
              </div>

              <div className="flex gap-1.5">
                {[0.90, 0.95, 0.99].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setConfidenceLevel(lvl)}
                    className={clsx(
                      "px-2.5 py-1 text-xs font-bold rounded border transition-colors",
                      confidenceLevel === lvl
                        ? "bg-indigo-600 border-indigo-400 text-white"
                        : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
                    )}
                  >
                    {(lvl * 100).toFixed(0)}% CI
                  </button>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-300">
                  <span>Observed Test Accuracy (p_hat):</span>
                  <span className="text-cyan-400 font-mono">{(observedAcc * 100).toFixed(1)}%</span>
                </div>
                <input
                  type="range"
                  min="0.60"
                  max="0.98"
                  step="0.01"
                  value={observedAcc}
                  onChange={(e) => setObservedAcc(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
                <span className="text-[10px] text-slate-400 block">Measured score on holdout D_test</span>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-300">
                  <span>Test Sample Size (N_test):</span>
                  <span className="text-emerald-400 font-mono">{ciNTest} samples</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="2000"
                  step="20"
                  value={ciNTest}
                  onChange={(e) => setCiNTest(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>N=20</span>
                  <span>N=1000</span>
                  <span>N=2000</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-300">
                  <span>Competitor Gap Delta:</span>
                  <span className="text-amber-400 font-mono">{(competitorDelta * 100).toFixed(1)}% gap</span>
                </div>
                <input
                  type="range"
                  min="0.01"
                  max="0.08"
                  step="0.005"
                  value={competitorDelta}
                  onChange={(e) => setCompetitorDelta(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <span className="text-[10px] text-slate-400 block">Performance delta vs rival model</span>
              </div>
            </div>

            {/* Visual SVG Confidence Band */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-cyan-400 border border-slate-900" /> Observed Accuracy {(observedAcc * 100).toFixed(1)}%
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="w-6 h-2 rounded bg-indigo-500/40 border border-indigo-400" /> {(confidenceLevel * 100).toFixed(0)}% Confidence Band
                  </span>
                </span>
                <span className="font-mono text-[11px] text-slate-500">Margin of Error: ±{(marginOfError * 100).toFixed(2)}%</span>
              </div>

              <div className="relative bg-slate-950 rounded-xl border border-slate-800 p-6 overflow-hidden flex items-center justify-center">
                <svg
                  viewBox="0 0 600 120"
                  className="w-full h-auto max-h-[140px]"
                  id={svgId2}
                >
                  {/* Axis line 50% to 100% */}
                  <line x1="50" y1="60" x2="550" y2="60" stroke="#334155" strokeWidth="2" />

                  {/* Tick marks */}
                  {[0.5, 0.6, 0.7, 0.8, 0.9, 1.0].map((t) => {
                    const tx = 50 + ((t - 0.5) / 0.5) * 500;
                    return (
                      <g key={t}>
                        <line x1={tx} y1="52" x2={tx} y2="68" stroke="#475569" strokeWidth="1.5" />
                        <text x={tx} y="85" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                          {`${(t * 100).toFixed(0)}%`}
                        </text>
                      </g>
                    );
                  })}

                  {/* Confidence Interval Band */}
                  {(() => {
                    const toX = (val) => 50 + ((val - 0.5) / 0.5) * 500;
                    const xLow = Math.max(50, toX(ciLower));
                    const xHigh = Math.min(550, toX(ciUpper));
                    const xCenter = toX(observedAcc);

                    return (
                      <>
                        {/* Shaded Band */}
                        <rect
                          x={xLow}
                          y="42"
                          width={Math.max(2, xHigh - xLow)}
                          height="36"
                          fill="rgba(99, 102, 241, 0.25)"
                          stroke="#818cf8"
                          strokeWidth="1.5"
                          rx="4"
                        />

                        {/* End cap lines */}
                        <line x1={xLow} y1="36" x2={xLow} y2="84" stroke="#818cf8" strokeWidth="2" />
                        <line x1={xHigh} y1="36" x2={xHigh} y2="84" stroke="#818cf8" strokeWidth="2" />

                        {/* Point Estimate Circle */}
                        <circle cx={xCenter} cy="60" r="6" fill="#22d3ee" stroke="#0f172a" strokeWidth="2" />
                      </>
                    );
                  })()}
                </svg>
              </div>
            </div>

            {/* Metrics & Statistical Power Card */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 uppercase font-semibold">Confidence Interval Band</span>
                <div className="text-xl font-black text-cyan-400 font-mono">
                  [{(ciLower * 100).toFixed(1)}%, {(ciUpper * 100).toFixed(1)}%]
                </div>
                <span className="text-[11px] text-slate-400">Total band width: {((ciUpper - ciLower) * 100).toFixed(1)}%</span>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 uppercase font-semibold">Margin of Error (ME)</span>
                <div className="text-2xl font-black text-emerald-400 font-mono">±{(marginOfError * 100).toFixed(2)}%</div>
                <span className="text-[11px] text-slate-400">Precision at {(confidenceLevel * 100).toFixed(0)}% level</span>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 uppercase font-semibold">Model Superiority Verdict</span>
                <div className={clsx("text-lg font-black font-mono flex items-center gap-1.5", isSignificant ? "text-emerald-400" : "text-amber-400")}>
                  {isSignificant ? "SIGNIFICANT ✔" : "NO EVIDENCE ❌"}
                </div>
                <span className="text-[11px] text-slate-400 font-mono">
                  z = {zStat.toFixed(2)}, p = {pValue.toFixed(4)}
                </span>
              </div>
            </div>

            {/* Statistical Guidance */}
            <div className="p-4 rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-xs sm:text-sm text-indigo-200">
              <span className="font-bold text-white block mb-1">💡 Instructor Note on Statistical Power:</span>
              <p className="leading-relaxed">
                {isSignificant
                  ? `With N_test = ${ciNTest}, the margin of error is tightly constrained to ±${(marginOfError * 100).toFixed(2)}%. The ${(competitorDelta * 100).toFixed(1)}% performance advantage over the competitor model achieves p = ${pValue.toFixed(4)} < ${(1 - confidenceLevel).toFixed(2)}, mathematically proving genuine superiority.`
                  : `Notice that even though your model scored ${(competitorDelta * 100).toFixed(1)}% higher, the test set size N_test = ${ciNTest} produces a wide margin of error (±${(marginOfError * 100).toFixed(2)}%). Because p = ${pValue.toFixed(4)} >= ${(1 - confidenceLevel).toFixed(2)}, you CANNOT reject the null hypothesis. Increase N_test to at least 450 to statistically prove this delta!`}
              </p>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* MODE 3: OUT-OF-DISTRIBUTION OPERATIONAL SHIFT STRESS-TESTER */}
        {/* ------------------------------------------------------------------- */}
        {studioMode === "ood" && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>⛈️</span> Mode 3: Out-of-Distribution (OOD) & Operational Shift Stress-Tester
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Subject certified models to real-world West Bengal distribution shifts: weather spikes, airport luggage clutter, inflation shifts, and pandal road closures.
                </p>
              </div>

              <div className={clsx("px-3.5 py-1.5 rounded-lg border text-xs font-bold", oodDiagnosis.bg, oodDiagnosis.color)}>
                {oodDiagnosis.label}
              </div>
            </div>

            {/* Regional Scenarios Selector */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {Object.entries(REGIONAL_SCENARIOS).map(([key, sc]) => (
                <button
                  key={key}
                  onClick={() => setSelectedScenarioKey(key)}
                  className={clsx(
                    "p-3 rounded-xl border text-left text-xs transition-all",
                    selectedScenarioKey === key
                      ? "bg-indigo-600/30 border-indigo-400 text-white shadow-md shadow-indigo-500/20"
                      : "bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800"
                  )}
                >
                  <span className="text-[10px] uppercase font-bold text-indigo-400 block">{sc.sector}</span>
                  <span className="font-bold line-clamp-1">{sc.title.split("(")[0]}</span>
                </button>
              ))}
            </div>

            {/* Shift Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-300">
                  <span>Covariate Shift Distance (Wasserstein Proxy):</span>
                  <span className="text-amber-400 font-mono">{shiftMagnitude.toFixed(2)} sigma</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="3.0"
                  step="0.1"
                  value={shiftMagnitude}
                  onChange={(e) => setShiftMagnitude(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <span className="text-[10px] text-slate-400 block">Distance between training and test distributions</span>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-300">
                  <span>Tail Non-Linearity / Clutter Noise:</span>
                  <span className="text-rose-400 font-mono">{stressSeverity.toFixed(2)}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2.5"
                  step="0.1"
                  value={stressSeverity}
                  onChange={(e) => setStressSeverity(parseFloat(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer"
                />
                <span className="text-[10px] text-slate-400 block">Operational disturbance intensity</span>
              </div>
            </div>

            {/* Visual SVG Distribution Curves: In-Dist vs Shifted OOD */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1">
                    <span className="w-3 h-0.5 bg-cyan-400" /> In-Distribution Training P_train(X)
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="w-3 h-0.5 bg-rose-400 border-dashed" /> Shifted Operational Test P_test(X)
                  </span>
                </span>
                <span className="text-slate-500 font-mono text-[11px]">Feature Space Coordinate X</span>
              </div>

              <div className="relative bg-slate-950 rounded-xl border border-slate-800 p-2 overflow-hidden flex items-center justify-center">
                <svg
                  viewBox="0 0 600 180"
                  className="w-full h-auto max-h-[200px]"
                  id={svgId3}
                >
                  <line x1="30" y1="150" x2="570" y2="150" stroke="#334155" strokeWidth="1.5" />

                  {/* Draw Gaussian curves for In-dist and OOD */}
                  {(() => {
                    const gaussian = (x, mu, sig) => Math.exp(-0.5 * ((x - mu) / sig) ** 2);
                    const ptsIn = [];
                    const ptsOod = [];
                    for (let x = -4; x <= 6; x += 0.2) {
                      const sx = 30 + ((x + 4) / 10) * 540;
                      const yIn = 150 - gaussian(x, 0, 1.2) * 120;
                      const yOod = 150 - gaussian(x, shiftMagnitude * 1.5, 1.2 * stressSeverity) * 110;
                      ptsIn.push(`${sx},${yIn}`);
                      ptsOod.push(`${sx},${yOod}`);
                    }

                    return (
                      <>
                        <path d={`M 30,150 L ${ptsIn.join(" L ")} L 570,150`} fill="rgba(6, 182, 212, 0.12)" />
                        <path d={`M ${ptsIn.join(" L ")}`} fill="none" stroke="#06b6d4" strokeWidth="2.5" />

                        <path d={`M 30,150 L ${ptsOod.join(" L ")} L 570,150`} fill="rgba(244, 63, 94, 0.12)" />
                        <path d={`M ${ptsOod.join(" L ")}`} fill="none" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="4 4" />
                      </>
                    );
                  })()}
                </svg>
              </div>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 uppercase font-semibold">In-Distribution Baseline</span>
                <div className="text-2xl font-black text-cyan-400 font-mono">{currentScenario.baselineAcc}%</div>
                <span className="text-[11px] text-slate-400">Score on clean i.i.d. holdout</span>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 uppercase font-semibold">OOD Stress-Test Accuracy</span>
                <div className={clsx("text-2xl font-black font-mono", parseFloat(oodAcc) < 75 ? "text-rose-400" : "text-amber-400")}>
                  {oodAcc}%
                </div>
                <span className="text-[11px] text-slate-400">Degradation: -{dropPct}%</span>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 uppercase font-semibold">Expected Calibration Error (ECE)</span>
                <div className="text-2xl font-black text-rose-400 font-mono">{calibrationError}</div>
                <span className="text-[11px] text-slate-400">Model confidence over-estimation</span>
              </div>
            </div>

            {/* Scenario Description */}
            <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 text-xs sm:text-sm text-amber-200">
              <span className="font-bold text-white block mb-1">🏢 Regional Scenario Context ({currentScenario.title}):</span>
              <p className="leading-relaxed">{currentScenario.description}</p>
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
            Unbiased risk proofs, Wald confidence intervals, and extreme value peeking scaling laws.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Unbiased Risk Expectation */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="text-indigo-400">1.</span> Mathematical Proof of Unbiased Risk Expectation
            </h3>
            <p className="text-xs text-slate-300">
              Because D_test is drawn i.i.d. and chosen independently of hypothesis h*:
            </p>
            <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 font-mono text-cyan-300 text-xs sm:text-sm overflow-x-auto text-center">
              {"E_{D_test}[ R̂_test(h*) ] = (1 / N) ∑_{k=1}^N E[ L(h*(x_k), y_k) ] = R_true(h*)"}
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Proves that the mathematical bias <code className="text-slate-300 font-mono">Bias = E[R̂_test] - R_true ≡ 0</code> if and only if h* never peeked at D_test.
            </p>
          </div>

          {/* Card 2: Wald Binomial Confidence Interval */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="text-cyan-400">2.</span> Wald 95% Binomial Confidence Interval
            </h3>
            <p className="text-xs text-slate-300">
              Bounds the true population accuracy given observed sample accuracy p̂ on N_test:
            </p>
            <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 font-mono text-cyan-300 text-xs sm:text-sm overflow-x-auto text-center">
              {"CI_95 = p̂ ± 1.960 · √[ (p̂ (1 - p̂)) / N_test ]"}
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Demonstrates that the standard error decays as <code className="text-slate-300 font-mono">O(1 / √N_test)</code>, requiring 4x more test data to halve the margin of error.
            </p>
          </div>

          {/* Card 3: Extreme Value Peeking Scaling Law */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="text-amber-400">3.</span> Extreme Value Scaling of Test Peeking Fallacy
            </h3>
            <p className="text-xs text-slate-300">
              Expected maximum test score when evaluating M random null models on fixed D_test:
            </p>
            <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 font-mono text-amber-300 text-xs sm:text-sm overflow-x-auto text-center">
              {"E[ max_{m=1..M} p̂_m ] ≈ μ + σ · √(2 ln M)"}
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Proves why evaluating 50 dummy models on a 100-sample test set mathematically inflates apparent top score from 50% to over 64% purely by chance.
            </p>
          </div>

          {/* Card 4: McNemar's Paired Contingency Test */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400">4.</span> McNemar's Paired Chi-Square Test
            </h3>
            <p className="text-xs text-slate-300">
              Tests whether Model A outperforms Model B using discordant prediction pairs:
            </p>
            <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 font-mono text-emerald-300 text-xs sm:text-sm overflow-x-auto text-center">
              {"χ² = ( |n_01 - n_10| - 1 )² / ( n_01 + n_10 ) ~ χ²(df = 1)"}
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Where <code className="text-slate-300 font-mono">n_01</code> is Model A wrong & Model B right, and <code className="text-slate-300 font-mono">n_10</code> is Model A right & Model B wrong. Significant if χ² &gt; 3.841 (p &lt; 0.05).
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
            How enterprise engineering teams across Kolkata and Bengal safeguard testing dataset integrity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Case 1: CESC */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-4 hover:border-indigo-500/40 transition-colors shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 uppercase">
                Power Grid Sentry
              </span>
              <span className="text-xs text-slate-400 font-mono">50,000 Smart Meters</span>
            </div>
            <h3 className="text-lg font-bold text-white">CESC Central Kolkata Meter Theft Sentry</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              CESC created an "Air-Gapped Blind Test Vault" managed by an independent audit committee. Competing vendors submit containerized Docker models that execute in a secure sandbox. Test labels are never visible to engineers, preventing iterative p-hacking and guaranteeing that the certified 91.4% theft detection accuracy translates directly into preserved grid revenue.
            </p>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs text-indigo-300">
              <strong>Governance Protocol:</strong> Air-gapped blind execution vault with one-shot metric reporting.
            </div>
          </div>

          {/* Case 2: CCU Airport */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-4 hover:border-cyan-500/40 transition-colors shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 uppercase">
                Aviation Security
              </span>
              <span className="text-xs text-slate-400 font-mono">12,000 Baggage CT Scans</span>
            </div>
            <h3 className="text-lg font-bold text-white">CCU Airport Carry-On Contraband Detection</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              To certify AI models for Kolkata Airport baggage scanners, BCAS enforces a strict "One-Shot Evaluation Policy". Vendors are not allowed to submit multiple iterations to adjust detection thresholds against the certified threat library. This ensures vendors cannot tune their models to memorize specific brass or wire artifacts present in the test baggage.
            </p>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs text-cyan-300">
              <strong>Governance Protocol:</strong> Single-pass evaluation threshold; multiple test submissions barred.
            </div>
          </div>

          {/* Case 3: Bandhan Bank */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-4 hover:border-amber-500/40 transition-colors shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">
                Micro-Banking
              </span>
              <span className="text-xs text-slate-400 font-mono">25,000 Loan Records</span>
            </div>
            <h3 className="text-lg font-bold text-white">Bandhan Bank Out-of-Time (OOT) Credit Risk Audit</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Bandhan Bank strictly forbids random shuffle splitting for MSME credit underwriting models in Nadia and Hooghly. Instead, models trained on Q1-Q3 disbursement files are tested exclusively on Q4 Out-of-Time (OOT) records. This chronological partitioning verifies whether the model withstands seasonal agricultural harvest shifts and raw material price spikes.
            </p>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs text-amber-300">
              <strong>Governance Protocol:</strong> Temporal OOT holdout to stress-test against macroeconomic drift.
            </div>
          </div>

          {/* Case 4: Swiggy Durga Puja */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-4 hover:border-emerald-500/40 transition-colors shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase">
                Logistics Routing
              </span>
              <span className="text-xs text-slate-400 font-mono">45,000 Night Dispatches</span>
            </div>
            <h3 className="text-lg font-bold text-white">Swiggy / Zomato Kolkata Durga Puja Night SLA</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Hyperlocal delivery logistics teams created a dedicated "Festival Stress Holdout Partition". By testing routing latency predictions during Saptami through Dashami nights, engineers evaluated how severe pedestrian road blockades near Bagbazar and Gariahat distorted transit times, guiding dynamic surge buffer allocations.
            </p>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs text-emerald-300">
              <strong>Governance Protocol:</strong> Curated extreme edge-case holdout partition for operational safety.
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
            Test your mastery of test set integrity, peeking hazards, confidence intervals, and governance vaults.
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

                {/* Reveal & Check */}
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
                      {q.options[userChoice]?.isCorrect ? "Correct! 🎯 Flawless statistical deduction." : "Incorrect. Review the detailed statistical rationale below."}
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
            Critical anti-patterns to prevent test set pollution and flawed model sign-offs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900/90 border border-rose-500/30 rounded-xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-base">
              <span>⚠️</span> Pitfall 1: Iterating Hyperparameters on D_test
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>The Mistake:</strong> Evaluating 30 learning rates or tree depths directly against D_test and selecting the top scorer.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong>The Remedy:</strong> Enforce 3-way data partitioning (Train / Validation / Test). Hyperparameter tuning belongs exclusively in D_val; D_test must be executed strictly once.
            </p>
          </div>

          <div className="bg-slate-900/90 border border-rose-500/30 rounded-xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-base">
              <span>⚠️</span> Pitfall 2: Underpowered Test Sample Sizes (N_test &lt; 100)
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>The Mistake:</strong> Claiming an algorithm achieved 95% accuracy on a test set of only 20 samples.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong>The Remedy:</strong> Calculate required sample sizes using binomial standard error formulas. For a precision margin of ±2%, maintain at least N_test &gt;= 2,400 samples.
            </p>
          </div>

          <div className="bg-slate-900/90 border border-rose-500/30 rounded-xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-base">
              <span>⚠️</span> Pitfall 3: Calling fit_transform() on Test Sets
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>The Mistake:</strong> Writing <code className="text-rose-300 font-mono">StandardScaler().fit_transform(X_test)</code> in evaluation scripts.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong>The Remedy:</strong> Strictly call <code className="text-emerald-300 font-mono">.transform(X_test)</code> using transformers fit exclusively on D_train, or wrap all stages inside a Scikit-Learn Pipeline.
            </p>
          </div>

          <div className="bg-slate-900/90 border border-rose-500/30 rounded-xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-base">
              <span>⚠️</span> Pitfall 4: Ignoring Subject Identity Clustering
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>The Mistake:</strong> Splitting multiple patient radiographs or commuter journeys randomly across train and test.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong>The Remedy:</strong> Implement <code className="text-emerald-300 font-mono">GroupShuffleSplit</code> by entity ID, ensuring all scans from a single human subject reside wholly in train or test.
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
              <span>🐍</span> Python Simulation Laboratory (<code className="text-cyan-300 font-mono text-sm">testing_dataset_lab.py</code>)
            </h3>
            <PythonFileLoader
              code={labCode}
              filename="testing_dataset_lab.py"
              moduleName="Topic 7: Testing Dataset Laboratory Simulator"
            />
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <span>📄</span> Academic Lecture Reference Transcript (<code className="text-indigo-300 font-mono text-sm">topic7_note.txt</code>)
            </h3>
            <PlainTextPrint
              content={noteText}
              filename="topic7_note.txt"
              title="Topic 7: Testing Dataset Academic Study Notes"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Topic7;
