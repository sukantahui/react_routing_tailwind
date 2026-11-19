import React, { useState, useId, useMemo } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import labCode from "./topic5_files/train_test_split_lab.py?raw";
import noteText from "./topic5_files/topic5_note.txt?raw";
import questions from "./topic5_files/topic5_questions.js";

// =============================================================================
// JADAVPUR CLINICAL COHORT FOR TOPOLOGY ARENA
// =============================================================================

const CLINICAL_SAMPLES = [
  { id: 1, patient: "Mamata (Barrackpore)", beat: "Beat 1", time: 10, hr: 88, arrhythmia: 1 },
  { id: 2, patient: "Mamata (Barrackpore)", beat: "Beat 2", time: 15, hr: 89, arrhythmia: 1 },
  { id: 3, patient: "Mamata (Barrackpore)", beat: "Beat 3", time: 20, hr: 87, arrhythmia: 1 },
  { id: 4, patient: "Mamata (Barrackpore)", beat: "Beat 4", time: 25, hr: 88, arrhythmia: 1 },
  { id: 5, patient: "Mahima (Kolkata)", beat: "Beat 1", time: 30, hr: 72, arrhythmia: 0 },
  { id: 6, patient: "Mahima (Kolkata)", beat: "Beat 2", time: 35, hr: 73, arrhythmia: 0 },
  { id: 7, patient: "Mahima (Kolkata)", beat: "Beat 3", time: 40, hr: 71, arrhythmia: 0 },
  { id: 8, patient: "Mahima (Kolkata)", beat: "Beat 4", time: 45, hr: 72, arrhythmia: 0 },
  { id: 9, patient: "Susmita (Ichapur)", beat: "Beat 1", time: 50, hr: 70, arrhythmia: 0 },
  { id: 10, patient: "Susmita (Ichapur)", beat: "Beat 2", time: 55, hr: 69, arrhythmia: 0 },
  { id: 11, patient: "Susmita (Ichapur)", beat: "Beat 3", time: 60, hr: 71, arrhythmia: 0 },
  { id: 12, patient: "Susmita (Ichapur)", beat: "Beat 4", time: 65, hr: 70, arrhythmia: 0 },
  { id: 13, patient: "Debangshu (Salt Lake)", beat: "Beat 1", time: 70, hr: 92, arrhythmia: 1 },
  { id: 14, patient: "Debangshu (Salt Lake)", beat: "Beat 2", time: 75, hr: 94, arrhythmia: 1 },
  { id: 15, patient: "Debangshu (Salt Lake)", beat: "Beat 3", time: 80, hr: 91, arrhythmia: 1 },
  { id: 16, patient: "Debangshu (Salt Lake)", beat: "Beat 4", time: 85, hr: 93, arrhythmia: 1 }
];

// =============================================================================
// DIAGNOSTIC ASSESSMENT QUESTIONS (5 MULTI-STAGE SCENARIO QUESTIONS)
// =============================================================================

const DIAGNOSTIC_QUESTIONS = [
  {
    id: 1,
    scenario: "At AMRI Salt Lake, 5,000 ECG beats from 50 cardiology patients are randomly split 80/20. The test accuracy is 99.1%. When deployed on new patients at Jadavpur Medical Hub, accuracy plunges to 71.5%.",
    question: "What specific architectural vulnerability caused this catastrophic out-of-hospital performance drop?",
    options: [
      { label: "A", text: "The neural network learning rate decayed too quickly." },
      { label: "B", text: "Identity Leakage: Random splitting allowed heartbeats from the same patients to appear in both train and test folds, allowing the model to memorize patient-specific baseline anatomy rather than general pathology." },
      { label: "C", text: "The test set was too large, causing excessive evaluation variance." },
      { label: "D", text: "Electrocardiogram voltages violate the central limit theorem." }
    ],
    correct: "B",
    explanation: "When repeated records from the same patient or user exist, uniform random splitting causes identity leakage. The model learns individual anatomical baselines. On unseen patients, this memorization is useless, causing accuracy to collapse. GroupShuffleSplit by Patient ID is mandatory."
  },
  {
    id: 2,
    scenario: "A data engineer in Barrackpore is building an electricity demand forecaster for WBSEDCL using 365 days of 15-minute load readings. A colleague suggests shuffling the records randomly before splitting 80/20.",
    question: "Why does random shuffling on chronological time-series data produce deceptive, invalid performance metrics?",
    options: [
      { label: "A", text: "Random shuffling requires continuous variables to be scaled to [0, 1]." },
      { label: "B", text: "Temporal Lookahead Leakage: Shuffling mixes future timestamps into the training set, allowing the model to predict past events using future observations that will never exist in live production." },
      { label: "C", text: "Electricity grid data cannot be partitioned into numerical arrays." },
      { label: "D", text: "Shuffling increases the empirical training loss to infinity." }
    ],
    correct: "B",
    explanation: "In time-series data, the future must never train the past. Shuffling turns forecasting into interpolation (e.g. interpolating July 15 morning load using July 15 evening and July 16 readings). In live deployment, tomorrow is completely unknown, causing models to fail."
  },
  {
    id: 3,
    scenario: "An ML model is evaluated on a tiny holdout test set of N_test = 25 samples, scoring 84.0% accuracy (21 correct out of 25).",
    question: "Using the Wald 95% confidence interval formula, what is the approximate margin of error on this test accuracy score?",
    options: [
      { label: "A", text: "Approximately ±1.5%." },
      { label: "B", text: "Approximately ±14.3% (95% CI: [69.7%, 98.3%]); small test sets have massive evaluation variance." },
      { label: "C", text: "Exactly 0.0% because sample accuracy is an unbiased estimator." },
      { label: "D", text: "Approximately ±50.0%." }
    ],
    correct: "B",
    explanation: "Standard Error SE = √(0.84 * 0.16 / 25) = √(0.005376) ≈ 0.0733 (7.33%). The 95% margin of error is 1.96 * 7.33% ≈ ±14.37%. With only 25 test samples, the true accuracy is anywhere between 69.7% and 98.3%, making fine-grained model comparisons impossible."
  },
  {
    id: 4,
    scenario: "A micro-finance dataset in Bankura contains 50,000 borrower loan histories with a 1.20% default rate. A junior analyst uses unstratified random splitting.",
    question: "What sampling hazard threatens the test partition when unstratified splitting is applied to heavily imbalanced data?",
    options: [
      { label: "A", text: "The test set variance will become strictly negative." },
      { label: "B", text: "Class Imbalance Skew: Finite-sample random variation can severely alter the test fold's default prevalence, potentially resulting in zero defaults or an artificial 3x surge." },
      { label: "C", text: "Random splits automatically balance class distributions using SMOTE." },
      { label: "D", text: "All borrower names will be scrambled into random integers." }
    ],
    correct: "B",
    explanation: "With extreme imbalance (1.2% defaults), uniform random shuffling easily results in test folds with zero minority instances or extreme distribution drift. Stratified splitting guarantees that both train and test partitions mirror the true population prevalence exactly."
  },
  {
    id: 5,
    scenario: "An engineer normalizes features using `scaler.fit_transform(X)` on the full dataset BEFORE calling `train_test_split(X, y)`.",
    question: "What methodological violation occurred, and what is the proper engineering sequence?",
    options: [
      { label: "A", text: "The scaler used the wrong optimization algorithm." },
      { label: "B", text: "Data Leakage: The test set's mean and standard deviation leaked into the scaler; the proper fix is to split FIRST, fit the scaler on X_train only, and then transform both X_train and X_test." },
      { label: "C", text: "The target variable should have been scaled instead of the features." },
      { label: "D", text: "The test set should have been scaled using standard normal quantiles." }
    ],
    correct: "B",
    explanation: "Fitting any preprocessing transformer (imputer, scaler, encoder, feature selector) on the combined dataset leaks test set distribution parameters into training. Transformers must be fitted strictly on X_train only (`scaler.fit(X_train)`)."
  }
];

const Topic5 = () => {
  const svgId = useId();

  // Navigation & UI States
  const [activeTab, setActiveTab] = useState("theory"); // 'theory' | 'code'
  const [studioMode, setStudioMode] = useState("confidence"); // 'confidence' | 'topology' | 'vault'

  // Studio Mode 1: Split Ratio & Confidence Interval Simulator
  const [datasetSizeN, setDatasetSizeN] = useState(500);
  const [trainRatio, setTrainRatio] = useState(80); // e.g. 80%
  const [observedAcc, setObservedAcc] = useState(85); // 85%

  const splitMetrics = useMemo(() => {
    const n = datasetSizeN;
    const trRatio = trainRatio / 100;
    const teRatio = 1.0 - trRatio;

    const nTrain = Math.round(n * trRatio);
    const nTest = n - nTrain;

    const p = observedAcc / 100;
    const se = nTest > 0 ? Math.sqrt((p * (1 - p)) / nTest) : 0;
    const margin = 1.96 * se;

    const ciLower = Math.max(0, (p - margin) * 100).toFixed(1);
    const ciUpper = Math.min(100, (p + margin) * 100).toFixed(1);

    // Model estimation bias proxy (higher when nTrain is small)
    const estimationBiasScore = Math.max(2, Math.round(350 / Math.sqrt(nTrain)));

    return {
      nTrain,
      nTest,
      sePct: (se * 100).toFixed(2),
      marginPct: (margin * 100).toFixed(2),
      ciLower,
      ciUpper,
      estimationBiasScore
    };
  }, [datasetSizeN, trainRatio, observedAcc]);

  // Studio Mode 2: Topology Arena
  const [selectedTopology, setSelectedTopology] = useState("random"); // 'random' | 'stratified' | 'temporal' | 'group'

  const topologySplitResult = useMemo(() => {
    const total = CLINICAL_SAMPLES.length;
    let train = [];
    let test = [];

    if (selectedTopology === "random") {
      // Split by alternating or seeded index: odd indices test
      test = CLINICAL_SAMPLES.filter((_, idx) => [1, 5, 8, 12].includes(idx));
      train = CLINICAL_SAMPLES.filter(s => !test.includes(s));
    } else if (selectedTopology === "stratified") {
      // 8 arrhythmia (Mamata 4, Debangshu 4), 8 normal (Mahima 4, Susmita 4)
      // Pick 2 arrhythmia and 2 normal for 25% test
      test = [CLINICAL_SAMPLES[0], CLINICAL_SAMPLES[12], CLINICAL_SAMPLES[4], CLINICAL_SAMPLES[8]];
      train = CLINICAL_SAMPLES.filter(s => !test.includes(s));
    } else if (selectedTopology === "temporal") {
      // Chronological: first 12 train, last 4 test
      train = CLINICAL_SAMPLES.slice(0, 12);
      test = CLINICAL_SAMPLES.slice(12);
    } else if (selectedTopology === "group") {
      // Group by Patient: Hold out Debangshu completely (all 4 beats)
      test = CLINICAL_SAMPLES.filter(s => s.patient.includes("Debangshu"));
      train = CLINICAL_SAMPLES.filter(s => !s.patient.includes("Debangshu"));
    }

    // Diagnostics
    const trainArrhythmiaRate = ((train.filter(s => s.arrhythmia === 1).length / train.length) * 100).toFixed(1);
    const testArrhythmiaRate = ((test.filter(s => s.arrhythmia === 1).length / test.length) * 100).toFixed(1);

    const trainPatients = new Set(train.map(s => s.patient));
    const testPatients = new Set(test.map(s => s.patient));
    const leakedPatients = [...testPatients].filter(p => trainPatients.has(p));

    return {
      train,
      test,
      trainRate: trainArrhythmiaRate,
      testRate: testArrhythmiaRate,
      leakedPatients,
      hasLeakage: leakedPatients.length > 0
    };
  }, [selectedTopology]);

  // Studio Mode 3: Data Leakage & Test Vault Simulation
  const [leakageScenario, setLeakageScenario] = useState("proper"); // 'proper' | 'pre_scaling' | 'test_snooping'

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
              Topic 5 of 16
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              MAKAUT BCAC701B Masterclass
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Train-Test Split
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Deconstruct the statistical mechanics of out-of-sample generalization. Master Empirical Risk Minimization,
            Wald confidence intervals, split ratio bias-variance trade-offs, and critical splitting topologies: Random,
            Stratified, Temporal Forward Chaining, and Group-Aware partitioning.
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
            The Novice Masterclass: Why We Split Data
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Three real-world mental models explaining the holdout paradigm, data leakage, and why training score is an illusion.
          </p>
        </div>

        {/* 3 Everyday Metaphors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Metaphor 1 */}
          <div className="p-5 rounded-2xl bg-slate-950/70 border border-indigo-900/40 space-y-3 relative overflow-hidden">
            <div className="text-2xl">📝</div>
            <h4 className="text-base font-bold text-indigo-300">
              1. The Madhyamik Board Examination
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Studying for school board exams in West Bengal:
            </p>
            <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-4">
              <li><strong className="text-slate-200">Textbook Exercises (Train):</strong> You solve all problems at home. You can memorize answers word-for-word.</li>
              <li><strong className="text-slate-200">Pre-Board Mock Test (Validation):</strong> Teacher tests you on unseen problems to tune your study plan.</li>
              <li><strong className="text-slate-200">Final Board Exam (Test):</strong> Locked in a sealed vault. If you peek at it beforehand, your high score is fraudulent (Data Leakage)!</li>
            </ul>
          </div>

          {/* Metaphor 2 */}
          <div className="p-5 rounded-2xl bg-slate-950/70 border border-cyan-900/40 space-y-3 relative overflow-hidden">
            <div className="text-2xl">🍲</div>
            <h4 className="text-base font-bold text-cyan-300">
              2. The Barrackpore Biryani Tasting Spoon
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Checking flavor before serving a wedding feast:
            </p>
            <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-4">
              <li><strong className="text-slate-200">Stratified Spoonful:</strong> You stir the Handi so your spoon gets rice, potato, and mutton in true proportions.</li>
              <li><strong className="text-slate-200">Unstratified Mistake:</strong> Tasting only the plain yellow rice at the very top. You declare the spice perfect, but the mutton at the bottom is scorched!</li>
            </ul>
          </div>

          {/* Metaphor 3 */}
          <div className="p-5 rounded-2xl bg-slate-950/70 border border-emerald-900/40 space-y-3 relative overflow-hidden">
            <div className="text-2xl">🔍</div>
            <h4 className="text-base font-bold text-emerald-300">
              3. The Lalbazar Fingerprint Vault
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Evaluating biometric crime recognition algorithms:
            </p>
            <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-4">
              <li><strong className="text-slate-200">Group Leakage Trap:</strong> Putting Suspect A's left thumb in Train and their right thumb in Test. The AI matches the person's skin ridges, not crime features!</li>
              <li><strong className="text-slate-200">Group-Aware Split:</strong> All prints for Suspect A must reside entirely in Train OR entirely in Test.</li>
            </ul>
          </div>
        </div>

        {/* Splitting Topologies Table */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">
            Splitting Topologies Comparison Matrix
          </h4>
          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-300 border-b border-slate-800">
                <tr>
                  <th className="p-3 font-semibold">Topology</th>
                  <th className="p-3 font-semibold">Mechanism</th>
                  <th className="p-3 font-semibold">Mathematical Guarantee</th>
                  <th className="p-3 font-semibold">Primary Vulnerability</th>
                  <th className="p-3 font-semibold">Mandatory Usage Context</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-400">
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-bold text-emerald-300">Random Shuffle Split</td>
                  <td className="p-3 text-slate-300">Uniform pseudo-random index permutation</td>
                  <td className="p-3 font-mono text-cyan-300">I.I.D. sample assumption</td>
                  <td className="p-3 text-rose-400">Class collapse; time leakage; group identity contamination</td>
                  <td className="p-3 text-slate-300">Standard balanced cross-sectional tabular data</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-bold text-indigo-300">Stratified Split</td>
                  <td className="p-3 text-slate-300">Partitioned within each distinct class label</td>
                  <td className="p-3 font-mono text-cyan-300">P(Y=c|Train) = P(Y=c|Test)</td>
                  <td className="p-3 text-amber-300">Requires discrete target labels; unsuited for regression</td>
                  <td className="p-3 text-indigo-300 font-semibold">Imbalanced classification (fraud, cancer, churn)</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-bold text-cyan-300">Temporal Forward Split</td>
                  <td className="p-3 text-slate-300">Strict chronological split: t_train &lt; t_test</td>
                  <td className="p-3 font-mono text-cyan-300">Zero lookahead time leakage</td>
                  <td className="p-3 text-amber-300">Model estimation bias if historical regime changes</td>
                  <td className="p-3 text-cyan-300 font-semibold">Time-series, stock market, energy load forecasting</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-bold text-purple-300">Group-Aware Split</td>
                  <td className="p-3 text-slate-300">Entities (patients/users) partitioned exclusively</td>
                  <td className="p-3 font-mono text-cyan-300">G_train ∩ G_test = ∅</td>
                  <td className="p-3 text-amber-300">Unequal fold sizes if entity cluster sizes vary widely</td>
                  <td className="p-3 text-purple-300 font-semibold">Medical ECG/EEG, audio speech, multi-visit customers</td>
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
              <span className="font-bold text-cyan-300 block mb-1">Empirical Risk Minimization:</span>
              Minimizing the average loss over the observed training samples: {"R̂_S(h) = (1/N) ∑ L(h(x_i), y_i)"}.
            </div>
            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <span className="font-bold text-cyan-300 block mb-1">Wald Confidence Interval:</span>
              The statistical error margin around test accuracy: {"p̂ ± 1.96 √(p̂(1-p̂)/N_test)"}.
            </div>
            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <span className="font-bold text-cyan-300 block mb-1">Data Snooping:</span>
              Repeatedly tweaking model hyperparameters based on the test set, destroying holdout independence.
            </div>
            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <span className="font-bold text-cyan-300 block mb-1">Covariate Shift:</span>
              When the input distribution P(X) shifts between the test set and production environment over time.
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
              The Generalization &amp; Splitting Topology Workbench
            </h3>
          </div>

          {/* Mode Switcher */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "confidence", label: "Mode 1: Split Ratio & Confidence", badge: "Wald Error Bounds" },
              { id: "topology", label: "Mode 2: Splitting Topology Arena", badge: "Leakage Prevention" },
              { id: "vault", label: "Mode 3: The Test Vault Simulator", badge: "Data Snooping Trap" }
            ].map(m => (
              <button
                key={m.id}
                onClick={() => setStudioMode(m.id)}
                className={clsx(
                  "px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border flex flex-col text-left cursor-pointer",
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
        {/* MODE 1: SPLIT RATIO & CONFIDENCE INTERVAL SIMULATOR                 */}
        {/* ------------------------------------------------------------------- */}
        {studioMode === "confidence" && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-900/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <span className="font-bold text-indigo-300">Statistical Uncertainty &amp; Test Set Size Simulator</span>
                <p className="text-slate-400">
                  Adjust dataset size N and split ratio. Notice how small test sets yield massive ±12% error margins.
                  A reported 85% test accuracy could easily be 73% or 97% in reality!
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">Dataset Total Size (N):</span>
                  <span className="font-mono text-cyan-400 font-bold">{datasetSizeN} samples</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="5000"
                  step="50"
                  value={datasetSizeN}
                  onChange={e => setDatasetSizeN(Number(e.target.value))}
                  className="w-full accent-cyan-500"
                />
                <span className="text-[10px] text-slate-500">More data shrinks estimation variance</span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">Train Split Ratio:</span>
                  <span className="font-mono text-indigo-400 font-bold">{trainRatio}% Train / {100 - trainRatio}% Test</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="95"
                  step="5"
                  value={trainRatio}
                  onChange={e => setTrainRatio(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
                <span className="text-[10px] text-slate-500">Standard: 80/20 or 75/25</span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">Observed Test Accuracy:</span>
                  <span className="font-mono text-emerald-400 font-bold">{observedAcc}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="99"
                  step="1"
                  value={observedAcc}
                  onChange={e => setObservedAcc(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
                <span className="text-[10px] text-slate-500">Point accuracy on test fold</span>
              </div>
            </div>

            {/* Dashboard Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase text-slate-400 font-semibold block">Partition Sizes</span>
                <span className="text-xl font-bold font-mono text-white">
                  {splitMetrics.nTrain} <span className="text-xs text-slate-500">tr</span> / {splitMetrics.nTest} <span className="text-xs text-slate-500">te</span>
                </span>
                <span className="text-[10px] text-slate-400 block">Samples in partitions</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase text-slate-400 font-semibold block">Standard Error (SE)</span>
                <span className="text-2xl font-bold font-mono text-amber-400">{splitMetrics.sePct}%</span>
                <span className="text-[10px] text-amber-300/80 block">√(p(1-p)/N_test)</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase text-slate-400 font-semibold block">95% Error Margin</span>
                <span className="text-2xl font-bold font-mono text-rose-400">±{splitMetrics.marginPct}%</span>
                <span className="text-[10px] text-rose-300/80 block">1.96 × SE</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase text-slate-400 font-semibold block">True Accuracy Band</span>
                <span className="text-lg font-bold font-mono text-cyan-400">
                  [{splitMetrics.ciLower}%, {splitMetrics.ciUpper}%]
                </span>
                <span className="text-[10px] text-cyan-300/80 block">95% Wald CI</span>
              </div>
            </div>

            {/* Visual Confidence Band Bar */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-white uppercase tracking-wider">
                  Test Metric Confidence Band (N_test = {splitMetrics.nTest})
                </span>
                <span className="font-mono text-cyan-400 text-xs">
                  Observed: {observedAcc}% ± {splitMetrics.marginPct}%
                </span>
              </div>

              <div className="h-10 w-full bg-slate-900 rounded-xl relative flex items-center px-4 border border-slate-800 overflow-hidden">
                {/* Confidence Interval span */}
                <div
                  style={{
                    left: `${Math.max(0, Number(splitMetrics.ciLower))}%`,
                    width: `${Math.min(100, Number(splitMetrics.ciUpper) - Number(splitMetrics.ciLower))}%`
                  }}
                  className="absolute h-6 bg-indigo-500/30 border-y border-indigo-400 rounded-md"
                />

                {/* Point accuracy pin */}
                <div
                  style={{ left: `${observedAcc}%` }}
                  className="absolute w-1.5 h-8 bg-cyan-400 shadow-md shadow-cyan-400/50 -ml-0.5 rounded-full z-10"
                />
              </div>

              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>0% Accuracy</span>
                <span>50% Baseline</span>
                <span>100% Perfect</span>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* MODE 2: SPLITTING TOPOLOGY ARENA                                    */}
        {/* ------------------------------------------------------------------- */}
        {studioMode === "topology" && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-900/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <span className="font-bold text-indigo-300">Splitting Topology Arena (Jadavpur Clinical ECG Cohort)</span>
                <p className="text-slate-400">
                  Switch between splitting strategies below. Observe how naive Random splitting leaks patient identity
                  into both folds, while Group-Aware splitting enforces total zero-leakage independence.
                </p>
              </div>
            </div>

            {/* Topology Switcher */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              {[
                { id: "random", label: "1. Random Shuffle", badge: "Identity Leakage Hazard" },
                { id: "stratified", label: "2. Stratified Split", badge: "Class Balance Preserved" },
                { id: "temporal", label: "3. Temporal Split", badge: "Chronological Order" },
                { id: "group", label: "4. Group-Aware Split", badge: "Zero Patient Leakage" }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTopology(t.id)}
                  className={clsx(
                    "p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between",
                    selectedTopology === t.id
                      ? "bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-600/30"
                      : "bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
                  )}
                >
                  <span className="font-bold block mb-1">{t.label}</span>
                  <span className={clsx("text-[10px]", selectedTopology === t.id ? "text-indigo-200" : "text-slate-500")}>
                    {t.badge}
                  </span>
                </button>
              ))}
            </div>

            {/* Diagnostic Alert Banner */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className={clsx(
                "p-4 rounded-2xl border flex items-start gap-3",
                topologySplitResult.hasLeakage
                  ? "bg-rose-950/30 border-rose-800/40 text-rose-300"
                  : "bg-emerald-950/30 border-emerald-800/40 text-emerald-300"
              )}>
                <span className="text-lg">{topologySplitResult.hasLeakage ? "🚨" : "🛡️"}</span>
                <div>
                  <strong className="block text-slate-200">Patient Identity Leakage:</strong>
                  {topologySplitResult.hasLeakage
                    ? `LEAKED: ${topologySplitResult.leakedPatients.join(", ")} exist in BOTH Train and Test!`
                    : "ZERO LEAKAGE: Patient cohorts are strictly disjoint across folds."}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase text-slate-400 font-semibold block">Arrhythmia Rate Balance</span>
                <span className="font-mono text-sm block">
                  Train: <strong className="text-cyan-400">{topologySplitResult.trainRate}%</strong> | Test: <strong className="text-indigo-400">{topologySplitResult.testRate}%</strong>
                </span>
                <span className="text-[10px] text-slate-500">True population rate: 50.0%</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase text-slate-400 font-semibold block">Samples in Folds</span>
                <span className="font-mono text-sm block">
                  Train: <strong className="text-white">{topologySplitResult.train.length}</strong> | Test: <strong className="text-white">{topologySplitResult.test.length}</strong>
                </span>
                <span className="text-[10px] text-slate-500">Total samples: 16 beats</span>
              </div>
            </div>

            {/* Visual Cohort Matrix */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Clinical Beats Partition Table
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {CLINICAL_SAMPLES.map(sample => {
                  const isTest = topologySplitResult.test.some(s => s.id === sample.id);
                  const isLeaked = topologySplitResult.leakedPatients.includes(sample.patient);

                  return (
                    <div
                      key={sample.id}
                      className={clsx(
                        "p-2.5 rounded-xl border text-[11px] space-y-1 transition-all",
                        isTest
                          ? "bg-indigo-950/60 border-indigo-500/50 text-indigo-200"
                          : "bg-slate-900/60 border-slate-800 text-slate-300",
                        isLeaked && isTest && "ring-1 ring-rose-500"
                      )}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-[10px] font-mono">{sample.patient.split(" ")[0]}</span>
                        <span className={clsx(
                          "px-1.5 py-0.2 rounded text-[9px] font-bold font-mono",
                          isTest ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-400"
                        )}>
                          {isTest ? "TEST" : "TRAIN"}
                        </span>
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span>{sample.beat}</span>
                        <span className={sample.arrhythmia ? "text-rose-400 font-bold" : "text-emerald-400"}>
                          {sample.arrhythmia ? "Arrhythmia" : "Normal"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* MODE 3: THE TEST VAULT & DATA SNOOPING STRESS-TESTER               */}
        {/* ------------------------------------------------------------------- */}
        {studioMode === "vault" && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-900/30 space-y-1 text-xs">
              <span className="font-bold text-indigo-300 text-sm">
                The Data Snooping Trap: Why Test Sets Must Be Locked in a Vault
              </span>
              <p className="text-slate-400">
                Observe what happens when an engineer tunes hyperparameters directly on the test set. The reported
                offline test accuracy rises to 96%, but real-world production accuracy collapses to 78% due to test set overfitting!
              </p>
            </div>

            {/* Scenario Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {[
                { id: "proper", title: "1. Proper 3-Way Partition", subtitle: "Train / Val / Locked Test" },
                { id: "pre_scaling", title: "2. Pre-Split Scaler Leakage", subtitle: "Scaler fit on full data" },
                { id: "test_snooping", title: "3. Direct Test Set Tuning", subtitle: "Hyperparameters tuned on Test" }
              ].map(sc => (
                <button
                  key={sc.id}
                  onClick={() => setLeakageScenario(sc.id)}
                  className={clsx(
                    "p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between",
                    leakageScenario === sc.id
                      ? "bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-600/30"
                      : "bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
                  )}
                >
                  <span className="font-bold text-xs block mb-1">{sc.title}</span>
                  <span className={clsx("text-[10px]", leakageScenario === sc.id ? "text-indigo-200" : "text-slate-500")}>
                    {sc.subtitle}
                  </span>
                </button>
              ))}
            </div>

            {/* Side-by-Side Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1 text-xs">
                <span className="text-[10px] uppercase text-slate-400 font-semibold block">Reported Test Accuracy</span>
                <span className="text-2xl font-bold font-mono text-cyan-400">
                  {leakageScenario === "proper" ? "82.5%" : leakageScenario === "pre_scaling" ? "89.4%" : "96.2%"}
                </span>
                <span className="text-[10px] text-slate-500 block">Offline test score</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1 text-xs">
                <span className="text-[10px] uppercase text-slate-400 font-semibold block">True Production Accuracy</span>
                <span className="text-2xl font-bold font-mono text-emerald-400">
                  {leakageScenario === "proper" ? "81.8%" : leakageScenario === "pre_scaling" ? "81.0%" : "78.4%"}
                </span>
                <span className="text-[10px] text-slate-500 block">Live customer deployment</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1 text-xs">
                <span className="text-[10px] uppercase text-slate-400 font-semibold block">Generalization Gap</span>
                <span className={clsx(
                  "text-2xl font-bold font-mono",
                  leakageScenario === "proper" ? "text-emerald-400" : "text-rose-400"
                )}>
                  {leakageScenario === "proper" ? "0.7% (Honest)" : leakageScenario === "pre_scaling" ? "+8.4% (Leakage)" : "+17.8% (CRITICAL FAILURE)"}
                </span>
                <span className="text-[10px] text-slate-500 block">Reported vs Real divergence</span>
              </div>
            </div>

            {/* Explanatory Panel */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-2">
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
                Architectural Diagnosis &amp; Remediation:
              </h4>
              {leakageScenario === "proper" && (
                <p className="text-emerald-300 leading-relaxed">
                  ✓ <strong>Golden Standard:</strong> Hyperparameters were tuned on the validation set. The test set was locked in the vault until final evaluation. Reported test accuracy (82.5%) perfectly matches production reality (81.8%).
                </p>
              )}
              {leakageScenario === "pre_scaling" && (
                <p className="text-amber-300 leading-relaxed">
                  ⚠️ <strong>Preprocessing Leakage:</strong> The scaler was fit on the full dataset before splitting. The test set mean and standard deviation leaked into training, producing a false +8.4% optimistic test boost that vanishes in production.
                </p>
              )}
              {leakageScenario === "test_snooping" && (
                <p className="text-rose-300 leading-relaxed">
                  🚫 <strong>Severe Data Snooping:</strong> The engineer tuned tree depth directly against the test set. The model memorized the test set noise, yielding a fake 96.2% offline score that plummeted to 78.4% when real users touched it!
                </p>
              )}
            </div>
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
            Formal Equations &amp; Generalization Bounds
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Mathematical definitions for empirical risk, Vapnik-Chervonenkis generalization bounds, and Wald confidence intervals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          {/* Card 1: Empirical Risk vs True Risk */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
            <h4 className="text-sm font-bold text-indigo-300 uppercase tracking-wider">
              1. Empirical Risk &amp; VC Generalization Bounds
            </h4>
            <div className="space-y-3 text-slate-300 leading-relaxed font-mono">
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                <span className="text-emerald-400 font-bold block">True Risk vs Empirical Risk:</span>
                <span>{"R(h) = E_{(x,y)~D} [ L(h(x), y) ]"}</span>
                <span>{"R̂_S(h) = (1 / N) ∑_{i=1}^N L(h(x_i), y_i)"}</span>
                <span className="text-slate-400 text-[11px] font-sans block pt-1">
                  Empirical Risk Minimization (ERM) minimizes training loss over finite sample S.
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                <span className="text-indigo-400 font-bold block">Vapnik-Chervonenkis (VC) Generalization Bound:</span>
                <span>{"R(h) ≤ R̂_S(h) + √[ (d_VC (ln(2N/d_VC) + 1) - ln(δ/4)) / N ]"}</span>
                <span className="text-slate-400 text-[11px] font-sans block pt-1">
                  Guarantees that as {"N → ∞"}, empirical error converges uniformly to true generalization error.
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Holdout Uncertainty & Confidence Intervals */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
            <h4 className="text-sm font-bold text-cyan-300 uppercase tracking-wider">
              2. Test Uncertainty &amp; Wald Confidence Intervals
            </h4>
            <div className="space-y-3 text-slate-300 leading-relaxed font-mono">
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                <span className="text-cyan-400 font-bold block">Standard Error of Test Accuracy:</span>
                <span>{"Var(p̂) = p * (1 - p) / N_test"}</span>
                <span>{"SE = √[ p̂ * (1 - p̂) / N_test ]"}</span>
                <span className="text-slate-400 text-[11px] font-sans block pt-1">
                  Uncertainty in test score scales as {"1 / √N_test"}.
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                <span className="text-purple-400 font-bold block">Wald 95% Confidence Interval:</span>
                <span>{"CI_{95%} = p̂ ± 1.96 * √[ p̂ * (1 - p̂) / N_test ]"}</span>
                <span className="text-slate-400 text-[11px] font-sans block pt-1">
                  Defines the statistical margin of error for holdout evaluation benchmarks.
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
            Real enterprise case studies demonstrating train-test splitting topologies and leakage prevention across West Bengal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          {/* Case 1: Jadavpur Cardiology */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-indigo-300 uppercase tracking-wider">
                Case 1: AMRI Salt Lake &amp; Jadavpur ECG Hub
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                Clinical Healthcare
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              <strong>Objective:</strong> Arrhythmia detection using 5,000 ECG beats across 100 cardiology patients.
            </p>
            <div className="space-y-1.5 pt-1">
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-rose-400 font-bold">Random Split Failure:</span> Leaked beats from same patient into both folds (false 99.4% accuracy).
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-emerald-400 font-bold">Group-Aware Fix:</span> GroupShuffleSplit by Patient ID ensured zero patient overlap.
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-cyan-400 font-bold">Clinical Generalization:</span> Model achieved an honest, FDA-compliant 82.5% on unseen hospital patients.
              </div>
            </div>
          </div>

          {/* Case 2: WBSEDCL Smart Grid */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-cyan-300 uppercase tracking-wider">
                Case 2: Substation Grid Time-Series (Barrackpore)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                Power Distribution
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              <strong>Objective:</strong> 15-minute interval distribution substation MW load forecasting over 365 days.
            </p>
            <div className="space-y-1.5 pt-1">
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-rose-400 font-bold">Lookahead Leakage:</span> Random shuffling used July 15 evening to predict July 15 morning load.
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-emerald-400 font-bold">Temporal Forward Slicing:</span> Train on Jan-Sept (past), Test strictly on Oct-Dec (future).
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-purple-400 font-bold">Operational RMSE:</span> Realistic RMSE of 1.84 MW simulated live production accurately.
              </div>
            </div>
          </div>

          {/* Case 3: Bankura Micro-Finance */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-300 uppercase tracking-wider">
                Case 3: Rural Credit Default Prediction (Bankura)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                Fintech Micro-Lending
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              <strong>Objective:</strong> Loan repayment default risk modeling across 50,000 self-help group borrowers.
            </p>
            <div className="space-y-1.5 pt-1">
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-rose-400 font-bold">Severe Imbalance:</span> True population default rate is only 1.20% (600 defaults in 50,000).
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-indigo-400 font-bold">Random Split Hazard:</span> Unstratified test fold received only 4 defaults (0.04%), breaking recall.
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-emerald-400 font-bold">Stratified Solution:</span> StratifiedShuffleSplit enforced exact 1.20% default rate in both partitions.
              </div>
            </div>
          </div>

          {/* Case 4: Kolkata Metro Commuter Retention */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-purple-300 uppercase tracking-wider">
                Case 4: Metro Pass Churn Forecasting (Green Line)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                Transit Informatics
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              <strong>Objective:</strong> Monthly commuter pass retention modeling across 100,000 smartcard accounts.
            </p>
            <div className="space-y-1.5 pt-1">
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-purple-400 font-bold">Out-of-Time Window:</span> Months 1-4 history trained to predict Month 5; tested on Month 6.
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-indigo-400 font-bold">Smartcard Grouping:</span> Group-aware split by Card UID prevented individual user memorization.
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-emerald-400 font-bold">Business Retention:</span> Targeted SMS offers increased commuter renewal by 18.5%.
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
              Topic 5 Diagnostic Assessment Quiz
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
            Six architectural traps that compromise the validity of train-test splits in production deployments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-xs">
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-rose-900/30 space-y-2">
            <span className="font-bold text-rose-300 flex items-center gap-2 text-sm">
              <span>🗂️</span> 1. Pre-Split Preprocessing Leakage
            </span>
            <p className="text-slate-400 leading-relaxed">
              Fitting StandardScaler, SimpleImputer, or target encoders on the entire dataset before splitting. Leaks test distribution parameters into training.
            </p>
            <span className="text-[11px] text-cyan-400 font-mono block pt-1">Fix: Fit transformers strictly on X_train inside a Pipeline.</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-rose-900/30 space-y-2">
            <span className="font-bold text-rose-300 flex items-center gap-2 text-sm">
              <span>⏳</span> 2. Random Shuffling on Time-Series
            </span>
            <p className="text-slate-400 leading-relaxed">
              Shuffling time series datasets randomly. The model trains on future timestamps to predict the past, manufacturing fake 99% accuracy that collapses in live deployment.
            </p>
            <span className="text-[11px] text-cyan-400 font-mono block pt-1">Fix: Enforce strict chronological forward splitting.</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-rose-900/30 space-y-2">
            <span className="font-bold text-rose-300 flex items-center gap-2 text-sm">
              <span>🆔</span> 3. Repeated Measurement Identity Leakage
            </span>
            <p className="text-slate-400 leading-relaxed">
              Randomly splitting datasets with multiple rows per patient, customer, or IoT device. The model memorizes individual entity baselines instead of generalizable patterns.
            </p>
            <span className="text-[11px] text-cyan-400 font-mono block pt-1">Fix: Deploy GroupShuffleSplit by entity group ID.</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-rose-900/30 space-y-2">
            <span className="font-bold text-rose-300 flex items-center gap-2 text-sm">
              <span>📉</span> 4. Microscopic Test Sets (N_test &lt; 50)
            </span>
            <p className="text-slate-400 leading-relaxed">
              Testing models on 25 samples. The 95% confidence interval margin of error is ±14%, making fine-grained model comparisons completely meaningless noise.
            </p>
            <span className="text-[11px] text-cyan-400 font-mono block pt-1">Fix: Maintain at least 150-300 test samples or use K-fold CV.</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-rose-900/30 space-y-2">
            <span className="font-bold text-rose-300 flex items-center gap-2 text-sm">
              <span>🕵️</span> 5. Test Set Snooping &amp; Tuning
            </span>
            <p className="text-slate-400 leading-relaxed">
              Iteratively tweaking hyperparameters (e.g. tree depth) until test set score improves. The test set ceases to be an independent holdout.
            </p>
            <span className="text-[11px] text-cyan-400 font-mono block pt-1">Fix: Lock test set in a vault; tune only on validation set.</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-rose-900/30 space-y-2">
            <span className="font-bold text-rose-300 flex items-center gap-2 text-sm">
              <span>⚖️</span> 6. Unstratified Imbalance Collapse
            </span>
            <p className="text-slate-400 leading-relaxed">
              Failing to stratify datasets with rare classes (&lt; 2% prevalence). Random sampling can produce test sets with zero minority positive instances.
            </p>
            <span className="text-[11px] text-cyan-400 font-mono block pt-1">Fix: Always enforce `stratify=y` on classification datasets.</span>
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
              Study Notes (topic5_note.txt)
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
              Python Lab (train_test_split_lab.py)
            </button>
          </div>
        </div>

        {activeTab === "code" ? (
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>File: <code className="text-cyan-300 font-mono">train_test_split_lab.py</code></span>
              <span>Pure Python 3 • Zero Dependencies • Exit Code 0</span>
            </div>
            <PythonFileLoader
              code={labCode}
              fileName="train_test_split_lab.py"
              title="Train-Test Split Laboratory Benchmark"
            />
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>File: <code className="text-cyan-300 font-mono">topic5_note.txt</code></span>
              <span>280 Lines of Comprehensive Academic Notes</span>
            </div>
            <PlainTextPrint
              content={noteText}
              fileName="topic5_note.txt"
              title="Topic 5: Academic Study Notes (BCAC701B)"
            />
          </div>
        )}
      </section>

      {/* ===================================================================== */}
      {/* 9. MAKAUT VIVA VOCE EXAMINATION FAQ & TEACHER SIGNATURE               */}
      {/* ===================================================================== */}
      <section id="faq" className="space-y-8">
        <FAQTemplate
          title="Topic 5: MAKAUT Master Viva &amp; Technical Interview Questions"
          subtitle="30 Graded Analytical Questions with Comprehensive Theoretical Rationales"
          questions={questions}
        />

        <Teacher />
      </section>
    </div>
  );
};

export default Topic5;
