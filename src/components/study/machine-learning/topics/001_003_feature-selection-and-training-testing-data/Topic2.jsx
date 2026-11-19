import React, { useState, useId, useMemo } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import labCode from "./topic2_files/relevant_and_irrelevant_features_lab.py?raw";
import noteText from "./topic2_files/topic2_note.txt?raw";
import questions from "./topic2_files/topic2_questions.js";

// =============================================================================
// WEST BENGAL SMART GRID SUBSTATION TELEMETRY DATASET
// =============================================================================

const SMART_GRID_FEATURES = [
  {
    id: "active_kw",
    name: "Active Power (kW)",
    symbol: "X₁",
    nature: "Physical Load",
    description: "Primary electrical work performed across Barrackpore feeders.",
    defaultCategory: "Strongly Relevant",
    univariateMI: 0.82,
    pearsonR: 0.88,
    isCollinearWith: null,
    isXorPart: false,
    isNoise: false
  },
  {
    id: "ambient_temp",
    name: "Ambient Temp (°C)",
    symbol: "X₂",
    nature: "Environmental Stress",
    description: "Barrackpore summer ambient air temperature driving cooling limits.",
    defaultCategory: "Strongly Relevant",
    univariateMI: 0.65,
    pearsonR: 0.74,
    isCollinearWith: null,
    isXorPart: false,
    isNoise: false
  },
  {
    id: "active_hp",
    name: "Active Power (HP)",
    symbol: "X₃",
    nature: "Redundant Duplicate",
    description: "Exact mechanical equivalent (1 kW = 1.341 HP) measured by secondary meter.",
    defaultCategory: "Weakly Relevant (Redundant)",
    univariateMI: 0.82,
    pearsonR: 0.88,
    isCollinearWith: "active_kw",
    isXorPart: false,
    isNoise: false
  },
  {
    id: "breaker_a",
    name: "Feeder 1 Breaker State",
    symbol: "X₄",
    nature: "XOR Interaction Bit 1",
    description: "Binary switch state (0/1) for primary feeder bus line.",
    defaultCategory: "Weakly Relevant (Interactive)",
    univariateMI: 0.01,
    pearsonR: 0.03,
    isCollinearWith: null,
    isXorPart: true,
    pairedWith: "breaker_b",
    isNoise: false
  },
  {
    id: "breaker_b",
    name: "Feeder 2 Breaker State",
    symbol: "X₅",
    nature: "XOR Interaction Bit 2",
    description: "Binary switch state (0/1) for secondary bus tie line.",
    defaultCategory: "Weakly Relevant (Interactive)",
    univariateMI: 0.01,
    pearsonR: 0.02,
    isCollinearWith: null,
    isXorPart: true,
    pairedWith: "breaker_a",
    isNoise: false
  },
  {
    id: "cust_lottery",
    name: "Customer Lottery ID",
    symbol: "X₆",
    nature: "Pure Stochastic Noise",
    description: "Billing lottery draw number randomly assigned by CRM software.",
    defaultCategory: "Irrelevant",
    univariateMI: 0.00,
    pearsonR: 0.01,
    isCollinearWith: null,
    isXorPart: false,
    isNoise: true
  },
  {
    id: "chassis_hash",
    name: "Meter Chassis Hash",
    symbol: "X₇",
    nature: "Deterministic Non-Signal",
    description: "Hardware manufacturer serial number hash stamped on metal enclosure.",
    defaultCategory: "Irrelevant",
    univariateMI: 0.00,
    pearsonR: -0.02,
    isCollinearWith: null,
    isXorPart: false,
    isNoise: true
  }
];

// =============================================================================
// DIAGNOSTIC ASSESSMENT QUESTIONS (5 MULTI-STAGE SCENARIO QUESTIONS)
// =============================================================================

const DIAGNOSTIC_QUESTIONS = [
  {
    id: 1,
    scenario: "An ML engineer is designing an automated feature filtration pipeline. A colleague proposes discarding any feature with a univariate Pearson correlation |r| < 0.05.",
    question: "Why is a strict univariate correlation threshold fundamentally flawed according to the Kohavi-John taxonomy?",
    options: [
      { label: "A", text: "Pearson correlation only evaluates linear dependence; non-linear and synergistic features (such as XOR pairs) with r = 0 will be erroneously discarded." },
      { label: "B", text: "Pearson correlation is mathematically bounded by the dataset sample size rather than feature relevance." },
      { label: "C", text: "Univariate filters can only be executed on continuous target variables and fail on binary outcomes." },
      { label: "D", text: "Discarding features with low correlation increases the computational time complexity of subsequent matrix inversions." }
    ],
    correct: "A",
    explanation: "Univariate filters evaluate each feature in isolation. In non-linear relationships (e.g. y = x²) or interactive couplings (e.g. y = x₁ ⊕ x₂), individual Pearson correlation is exactly zero, yet these features carry 100% predictive information jointly."
  },
  {
    id: 2,
    scenario: "At the WBSEDCL smart grid substation, 'Active Power (kW)' and 'Active Power (HP)' are both included in a linear regression model. Both correlate r = 0.88 with transformer load.",
    question: "Under the formal Kohavi-John definition, how are these two features classified with respect to each other?",
    options: [
      { label: "A", text: "Both are Strongly Relevant because they exhibit high mutual information with the target." },
      { label: "B", text: "Both are Weakly Relevant (Redundant), because either feature's information is completely subsumed when the other is present." },
      { label: "C", text: "Active Power (kW) is Strongly Relevant and Active Power (HP) is Irrelevant by definition." },
      { label: "D", text: "Both are Irrelevant because collinear features cancel each other out in the covariance matrix." }
    ],
    correct: "B",
    explanation: "Neither feature is strongly relevant because removing one leaves the other intact to provide the exact same conditional probability distribution P(Y | S). They are weakly relevant redundant duplicates."
  },
  {
    id: 3,
    scenario: "In an XOR classification task (Y = X₁ ⊕ X₂), a researcher observes that I(X₁; Y) = 0 bits and I(X₂; Y) = 0 bits, but I(X₁, X₂; Y) = 1.0 bit.",
    question: "What term describes the phenomenon where individual features appear useless in isolation but provide complete information in combination?",
    options: [
      { label: "A", text: "Spurious Multi-collinearity." },
      { label: "B", text: "Information Synergy (Negative Interaction Information)." },
      { label: "C", text: "Homoscedasticity Collapse." },
      { label: "D", text: "Orthogonal Projection Divergence." }
    ],
    correct: "B",
    explanation: "When joint mutual information I(X₁, X₂; Y) strictly exceeds the sum of individual mutual informations I(X₁; Y) + I(X₂; Y), the feature pair exhibits positive synergy (or negative interaction information in McGill's formulation)."
  },
  {
    id: 4,
    scenario: "A diagnostic clinic in Salt Lake includes 40 random Gaussian noise columns alongside 3 clinical biomarkers. A k-Nearest Neighbors (KNN) classifier's test accuracy drops from 88% to 54%.",
    question: "What geometric breakdown causes KNN to fail when irrelevant noise dimensions are added?",
    options: [
      { label: "A", text: "Noise features cause the Euclidean distance to accumulate random variance, making all pairwise sample distances nearly equal and destroying neighborhood structure." },
      { label: "B", text: "Noise features invert the metric space, making nearest neighbors become farthest neighbors." },
      { label: "C", text: "KNN automatically assigns negative weights to noise dimensions, causing distance underflow." },
      { label: "D", text: "The Bayes optimal error rate drops to zero, making classification impossible." }
    ],
    correct: "A",
    explanation: "In high-dimensional noise spaces, the ratio (dist_max - dist_min) / dist_min approaches 0. Points become equidistant, rendering proximity metrics completely meaningless."
  },
  {
    id: 5,
    scenario: "A data scientist fits an Ordinary Least Squares (OLS) model: y = Xβ + ε. Twenty orthogonal random noise columns are appended to X.",
    question: "What is the theoretical effect on the parameter covariance matrix Var(β̂) = σ²(XᵀX)⁻¹?",
    options: [
      { label: "A", text: "The variance of parameter estimates shrinks because degrees of freedom increase." },
      { label: "B", text: "The trace of (XᵀX)⁻¹ expands, inflating the estimation variance of all regression coefficients." },
      { label: "C", text: "The matrix becomes non-invertible due to zero determinant." },
      { label: "D", text: "The parameter estimates become strictly biased toward zero." }
    ],
    correct: "B",
    explanation: "Adding irrelevant columns expands the parameter space without increasing true signal. In finite samples, the trace of (XᵀX)⁻¹ grows, which inflates the variance of estimated coefficients across all features."
  }
];

const Topic2 = () => {
  const svgId = useId();

  // Navigation & UI States
  const [activeTab, setActiveTab] = useState("theory"); // 'theory' | 'code'
  const [studioMode, setStudioMode] = useState("classifier"); // 'classifier' | 'xor_paradox' | 'noise_injection'

  // Studio Mode 1: Kohavi-John Feature Classifier
  const [selectedFeatures, setSelectedFeatures] = useState({
    active_kw: true,
    ambient_temp: true,
    active_hp: false,
    breaker_a: true,
    breaker_b: true,
    cust_lottery: false,
    chassis_hash: false
  });

  const toggleFeature = (id) => {
    setSelectedFeatures(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Compute dynamic stats for selected subset
  const subsetMetrics = useMemo(() => {
    const activeList = SMART_GRID_FEATURES.filter(f => selectedFeatures[f.id]);
    const hasKw = selectedFeatures["active_kw"];
    const hasHp = selectedFeatures["active_hp"];
    const hasA = selectedFeatures["breaker_a"];
    const hasB = selectedFeatures["breaker_b"];
    const hasNoise = selectedFeatures["cust_lottery"] || selectedFeatures["chassis_hash"];

    // Dynamic Bayes Error approximation
    let baseBayesError = 42.0; // empty model
    if (hasKw || hasHp) baseBayesError -= 22.0;
    if (selectedFeatures["ambient_temp"]) baseBayesError -= 10.0;
    if (hasA && hasB) {
      baseBayesError -= 8.0; // XOR synergy unlocked!
    } else if (hasA || hasB) {
      baseBayesError -= 0.5; // negligible univariate effect
    }

    // Variance inflation penalty from noise
    let noisePenalty = 0.0;
    if (selectedFeatures["cust_lottery"]) noisePenalty += 4.5;
    if (selectedFeatures["chassis_hash"]) noisePenalty += 4.5;

    // Redundancy penalty (collinearity inflation)
    let redundancyPenalty = 0.0;
    if (hasKw && hasHp) redundancyPenalty += 3.0;

    const testError = Math.max(2.0, baseBayesError + noisePenalty + redundancyPenalty);
    const trainError = Math.max(1.0, baseBayesError - (noisePenalty * 0.8)); // noise overfits training

    return {
      activeCount: activeList.length,
      trainError: trainError.toFixed(1),
      testError: testError.toFixed(1),
      genGap: Math.max(0, testError - trainError).toFixed(1),
      hasRedundancy: hasKw && hasHp,
      hasXorSynergy: hasA && hasB,
      hasXorBlindspot: (hasA && !hasB) || (!hasA && hasB),
      hasNoiseContamination: hasNoise
    };
  }, [selectedFeatures]);

  // Studio Mode 2: XOR Paradox Simulator
  const [xorThreshold, setXorThreshold] = useState(0.5);
  const [xorNoiseProb, setXorNoiseProb] = useState(0.0);

  // Studio Mode 3: Noise Injection & Degradation Simulator
  const [informativeCount, setInformativeCount] = useState(3);
  const [noiseDimensionCount, setNoiseDimensionCount] = useState(15);
  const [sampleSizeN, setSampleSizeN] = useState(200);

  // Computed degradation curves
  const noiseSimulationStats = useMemo(() => {
    const k = informativeCount;
    const p = noiseDimensionCount;
    const n = sampleSizeN;

    // Theoretical model accuracy curves
    // Training accuracy increases with p due to memorization
    const trainAcc = Math.min(99.5, 70 + (k * 6.0) + (p * 0.45) - (n * 0.005));
    // Test generalization accuracy drops with p due to variance inflation
    const penalty = (p * 0.65) * (150 / n);
    const testAcc = Math.max(48.0, 70 + (k * 5.8) - penalty);

    // Distance contrast ratio: (dist_max - dist_min) / dist_min
    // In d dimensions, contrast ratio scales as 1 / sqrt(d)
    const totalD = k + p;
    const contrastRatio = (2.2 / Math.sqrt(totalD)).toFixed(3);

    return {
      trainAcc: trainAcc.toFixed(1),
      testAcc: testAcc.toFixed(1),
      overfitGap: Math.max(0, trainAcc - testAcc).toFixed(1),
      contrastRatio
    };
  }, [informativeCount, noiseDimensionCount, sampleSizeN]);

  // Diagnostic Quiz State
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
              Topic 2 of 16
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              MAKAUT BCAC701B Masterclass
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Relevant and Irrelevant Features
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Master the mathematical taxonomy of Ron Kohavi &amp; George H. John (1997). Demystify Strong Relevance,
            Weak Relevance (Redundant vs Synergistic/XOR), and Pure Irrelevance. Uncover why univariate filters fail
            on multivariate interactions and quantify the devastating cost of noise injection on generalization.
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
            The Novice Masterclass: Understanding Feature Relevance
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Three real-world mental models to firmly anchor the Kohavi-John taxonomy before delving into formal information theory.
          </p>
        </div>

        {/* 3 Everyday Metaphors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Metaphor 1 */}
          <div className="p-5 rounded-2xl bg-slate-950/70 border border-indigo-900/40 space-y-3 relative overflow-hidden">
            <div className="text-2xl">🏏</div>
            <h4 className="text-base font-bold text-indigo-300">
              1. The Eden Gardens Cricket Selector
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              When picking the playing XI:
            </p>
            <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-4">
              <li><strong className="text-slate-200">Strong Relevance:</strong> Jasprit Bumrah's death bowling. Nobody else can replicate his yorkers. Indispensable.</li>
              <li><strong className="text-slate-200">Weak (Redundant):</strong> Selecting two identical right-arm 125 km/h seamers. You only need one in the XI.</li>
              <li><strong className="text-slate-200">Weak (Synergistic):</strong> The opening batting pair who run singles between wickets. Neither can build the stand alone.</li>
              <li><strong className="text-slate-200">Irrelevant:</strong> The bus driver's watch color. Zero causal impact on the match result.</li>
            </ul>
          </div>

          {/* Metaphor 2 */}
          <div className="p-5 rounded-2xl bg-slate-950/70 border border-cyan-900/40 space-y-3 relative overflow-hidden">
            <div className="text-2xl">🍲</div>
            <h4 className="text-base font-bold text-cyan-300">
              2. The Barrackpore Biryani Handi
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Cooking authentic Kolkata Biryani:
            </p>
            <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-4">
              <li><strong className="text-slate-200">Strong Relevance:</strong> Saffron and Biryani Attar (Meetha Ittar). The signature aroma cannot be substituted.</li>
              <li><strong className="text-slate-200">Weak (Redundant):</strong> Adding both pure cow Ghee and Vanaspati fat. Ghee already provides the rich fatty emulsion.</li>
              <li><strong className="text-slate-200">Weak (Synergistic):</strong> Green Cardamom and Mace (Javitri). Release aroma only when sealed together under slow dum!</li>
              <li><strong className="text-slate-200">Irrelevant:</strong> The serial number stamped on the LPG cooking cylinder. Pure unrelated noise.</li>
            </ul>
          </div>

          {/* Metaphor 3 */}
          <div className="p-5 rounded-2xl bg-slate-950/70 border border-emerald-900/40 space-y-3 relative overflow-hidden">
            <div className="text-2xl">🔍</div>
            <h4 className="text-base font-bold text-emerald-300">
              3. The Lalbazar Crime Detective
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Investigating an incident in Kolkata:
            </p>
            <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-4">
              <li><strong className="text-slate-200">Strong Relevance:</strong> Unmatched DNA evidence found at the crime scene. Directly points to the culprit.</li>
              <li><strong className="text-slate-200">Weak (Redundant):</strong> Two CCTV cameras recording the exact same doorway from 5 degrees apart.</li>
              <li><strong className="text-slate-200">Weak (Synergistic):</strong> Two halves of a torn receipt. Neither half alone means anything; together they match!</li>
              <li><strong className="text-slate-200">Irrelevant:</strong> The suspect's astrological sun sign or favorite tea brand.</li>
            </ul>
          </div>
        </div>

        {/* The Kohavi-John Taxonomy Comparison Table */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">
            The Kohavi-John Relevance Taxonomy Matrix
          </h4>
          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-300 border-b border-slate-800">
                <tr>
                  <th className="p-3 font-semibold">Classification</th>
                  <th className="p-3 font-semibold">Probabilistic Condition</th>
                  <th className="p-3 font-semibold">Info-Theoretic Signature</th>
                  <th className="p-3 font-semibold">Bayes Impact</th>
                  <th className="p-3 font-semibold">Recommended Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-400">
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-bold text-emerald-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Strongly Relevant
                  </td>
                  <td className="p-3 font-mono text-slate-300">P(Y|Xᵢ,Sᵢ) ≠ P(Y|Sᵢ)</td>
                  <td className="p-3 font-mono text-cyan-300">I(Xᵢ; Y | Sᵢ) &gt; 0</td>
                  <td className="p-3 text-slate-300">Dropping strictly increases Bayes error rate</td>
                  <td className="p-3 text-emerald-400 font-semibold">MUST RETAIN ALWAYS</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-bold text-indigo-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-indigo-400" />
                    Weakly Relevant (Redundant)
                  </td>
                  <td className="p-3 font-mono text-slate-300">P(Y|Xᵢ,Sᵢ) = P(Y|Sᵢ), but ∃S' s.t. P(Y|Xᵢ,S') ≠ P(Y|S')</td>
                  <td className="p-3 font-mono text-cyan-300">I(Xᵢ; Y) &gt; 0, but I(Xᵢ; Y | Sᵢ) = 0</td>
                  <td className="p-3 text-slate-300">Duplicated by other features; no Bayes loss if duplicate kept</td>
                  <td className="p-3 text-indigo-400 font-semibold">SAFE TO PRUNE (Deduplicate)</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-bold text-amber-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    Weakly Relevant (Synergistic / XOR)
                  </td>
                  <td className="p-3 font-mono text-slate-300">P(Y|Xᵢ) = P(Y), but P(Y|Xᵢ, Xⱼ) ≠ P(Y|Xⱼ)</td>
                  <td className="p-3 font-mono text-cyan-300">I(Xᵢ; Y) ≈ 0, but I(Xᵢ, Xⱼ; Y) ≫ 0</td>
                  <td className="p-3 text-slate-300">Fatal Bayes penalty if either partner dropped</td>
                  <td className="p-3 text-amber-400 font-semibold">MUST KEEP IN PAIR (Use Non-Linear/Trees)</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-bold text-rose-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-400" />
                    Completely Irrelevant
                  </td>
                  <td className="p-3 font-mono text-slate-300">∀ S' ⊆ Sᵢ: P(Y|Xᵢ,S') = P(Y|S')</td>
                  <td className="p-3 font-mono text-cyan-300">∀ S' ⊆ Sᵢ: I(Xᵢ; Y | S') = 0</td>
                  <td className="p-3 text-slate-300">Zero predictive power; inflates parameter variance</td>
                  <td className="p-3 text-rose-400 font-semibold">ELIMINATE IMMEDIATELY</td>
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
              <span className="font-bold text-cyan-300 block mb-1">Bayes Error Rate:</span>
              The irreducible minimum error rate achievable by any decision rule, given the true underlying class distributions.
            </div>
            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <span className="font-bold text-cyan-300 block mb-1">Mutual Information:</span>
              A non-linear measure of the amount of information that one random variable contains about another (measured in bits).
            </div>
            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <span className="font-bold text-cyan-300 block mb-1">Spurious Correlation:</span>
              A mathematical correlation between two variables caused purely by finite sample noise or an unobserved confounding variable.
            </div>
            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <span className="font-bold text-cyan-300 block mb-1">Curse of Dimensionality:</span>
              The exponential volume growth of hyperspace as dimensions increase, causing data points to become sparsely scattered and equidistant.
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
              The Kohavi-John Laboratory &amp; Relevance Workbench
            </h3>
          </div>

          {/* Mode Switcher */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "classifier", label: "Mode 1: Feature Classifier & Venn", badge: "Kohavi-John Taxonomy" },
              { id: "xor_paradox", label: "Mode 2: The XOR Interaction Paradox", badge: "Univariate Blindness" },
              { id: "noise_injection", label: "Mode 3: Noise Injection Stress-Tester", badge: "Variance Inflation" }
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
        {/* MODE 1: THE KOHAVI-JOHN FEATURE CLASSIFIER & VENN WORKBENCH         */}
        {/* ------------------------------------------------------------------- */}
        {studioMode === "classifier" && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-900/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <span className="font-bold text-indigo-300">WBSEDCL Substation Grid Feature Matrix</span>
                <p className="text-slate-400">
                  Toggle features ON or OFF in your active conditioning set <span className="font-mono text-cyan-300">S</span>.
                  Observe how the Kohavi-John taxonomy dynamically classifies each feature and calculates Bayes error impact.
                </p>
              </div>
              <div className="flex items-center gap-4 bg-slate-950 px-3.5 py-1.5 rounded-xl border border-slate-800 shrink-0">
                <div>
                  <span className="text-[10px] uppercase text-slate-500 block">Selected</span>
                  <span className="font-mono font-bold text-cyan-400">{subsetMetrics.activeCount} / 7</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-slate-500 block">Est. Test Error</span>
                  <span className="font-mono font-bold text-emerald-400">{subsetMetrics.testError}%</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-slate-500 block">Gen. Gap</span>
                  <span className="font-mono font-bold text-amber-400">+{subsetMetrics.genGap}%</span>
                </div>
              </div>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {SMART_GRID_FEATURES.map(feat => {
                const isActive = selectedFeatures[feat.id];
                return (
                  <div
                    key={feat.id}
                    onClick={() => toggleFeature(feat.id)}
                    className={clsx(
                      "p-4 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between space-y-3",
                      isActive
                        ? "bg-slate-900/90 border-indigo-500/60 shadow-lg shadow-indigo-950/50"
                        : "bg-slate-950/50 border-slate-800/80 hover:border-slate-700 opacity-60 hover:opacity-90"
                    )}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-indigo-400 text-xs px-2 py-0.5 rounded bg-indigo-950 border border-indigo-800">
                            {feat.symbol}
                          </span>
                          <span className="font-bold text-sm text-white">{feat.name}</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={isActive}
                          onChange={() => {}}
                          className="rounded border-slate-700 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                        />
                      </div>
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-cyan-400 block mb-1">
                        {feat.nature}
                      </span>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {feat.description}
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-800/70 text-[11px]">
                      <div className="flex justify-between text-slate-400">
                        <span>Univariate MI:</span>
                        <span className="font-mono text-cyan-300 font-semibold">{feat.univariateMI.toFixed(2)} bits</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Pearson |r|:</span>
                        <span className="font-mono text-slate-300">{feat.pearsonR.toFixed(2)}</span>
                      </div>
                      <div className="pt-1">
                        <span className={clsx(
                          "px-2 py-0.5 rounded text-[10px] font-bold block text-center",
                          feat.defaultCategory === "Strongly Relevant" ? "bg-emerald-950/70 text-emerald-300 border border-emerald-800/40" :
                          feat.defaultCategory.includes("Weakly") ? "bg-indigo-950/70 text-indigo-300 border border-indigo-800/40" :
                          "bg-rose-950/70 text-rose-300 border border-rose-800/40"
                        )}>
                          {feat.defaultCategory}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Dynamic Status Banner & Diagnostic Feedback */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <span className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">
                Conditioning Set Diagnostics &amp; Operational Warnings:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                <div className={clsx(
                  "p-3 rounded-xl border flex items-start gap-2",
                  subsetMetrics.hasRedundancy
                    ? "bg-amber-950/20 border-amber-800/40 text-amber-300"
                    : "bg-slate-900/50 border-slate-800 text-slate-400"
                )}>
                  <span>⚠️</span>
                  <div>
                    <strong className="block text-slate-200">Redundancy / Collinearity:</strong>
                    {subsetMetrics.hasRedundancy
                      ? "Both kW and HP are active! Prune one to stabilize matrix inversion."
                      : "No redundant duplicate features active in model."}
                  </div>
                </div>

                <div className={clsx(
                  "p-3 rounded-xl border flex items-start gap-2",
                  subsetMetrics.hasXorSynergy
                    ? "bg-emerald-950/20 border-emerald-800/40 text-emerald-300"
                    : subsetMetrics.hasXorBlindspot
                    ? "bg-rose-950/20 border-rose-800/40 text-rose-300"
                    : "bg-slate-900/50 border-slate-800 text-slate-400"
                )}>
                  <span>⚡</span>
                  <div>
                    <strong className="block text-slate-200">XOR Interaction Pair:</strong>
                    {subsetMetrics.hasXorSynergy
                      ? "Both Switch A & B active! Non-linear synergy unlocked (-8% error)."
                      : subsetMetrics.hasXorBlindspot
                      ? "Blindspot: Only 1 switch active! Carry zero univariate signal alone."
                      : "Neither switch active; normal baseline."}
                  </div>
                </div>

                <div className={clsx(
                  "p-3 rounded-xl border flex items-start gap-2",
                  subsetMetrics.hasNoiseContamination
                    ? "bg-rose-950/20 border-rose-800/40 text-rose-300"
                    : "bg-slate-900/50 border-slate-800 text-slate-400"
                )}>
                  <span>🛡️</span>
                  <div>
                    <strong className="block text-slate-200">Noise Contamination:</strong>
                    {subsetMetrics.hasNoiseContamination
                      ? "Irrelevant noise columns active! Generalization gap widening (+4.5%)."
                      : "Clean feature subset; no pure noise columns detected."}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* MODE 2: THE XOR / CONTEXT INTERACTION PARADOX ARENA                 */}
        {/* ------------------------------------------------------------------- */}
        {studioMode === "xor_paradox" && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-900/30 space-y-1 text-xs">
              <span className="font-bold text-indigo-300 text-sm">
                The Non-Monotonicity of Feature Relevance: The XOR Paradox
              </span>
              <p className="text-slate-400">
                Demonstrating why univariate filters fail. Target <span className="font-mono text-cyan-300">Y = X₁ ⊕ X₂</span>.
                Individually, each feature has correlation <span className="font-mono text-cyan-300">r = 0.00</span> and
                mutual information <span className="font-mono text-cyan-300">I(X; Y) = 0.00 bits</span>.
                A filter will discard both as useless, yet together they achieve 100% deterministic accuracy!
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              {/* 2D Interactive Truth Table Grid */}
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center justify-between">
                  <span>Interactive 2D Parity Grid</span>
                  <span className="text-xs font-mono text-indigo-400">P(Y=1) = 0.50</span>
                </h4>

                <div className="grid grid-cols-2 gap-3 aspect-square max-w-xs mx-auto p-2 bg-slate-900/90 rounded-2xl border border-slate-800">
                  {/* Top-Left: X1=0, X2=1 -> Y=1 */}
                  <div className="bg-cyan-950/60 border border-cyan-500/50 rounded-xl flex flex-col items-center justify-center p-3 text-center">
                    <span className="font-mono text-[10px] text-slate-400">X₁=0, X₂=1</span>
                    <span className="text-2xl font-black text-cyan-400">Y = 1</span>
                    <span className="text-[10px] text-cyan-300 font-semibold">Overload Trip</span>
                  </div>

                  {/* Top-Right: X1=1, X2=1 -> Y=0 */}
                  <div className="bg-slate-950 border border-slate-800 rounded-xl flex flex-col items-center justify-center p-3 text-center">
                    <span className="font-mono text-[10px] text-slate-400">X₁=1, X₂=1</span>
                    <span className="text-2xl font-black text-slate-500">Y = 0</span>
                    <span className="text-[10px] text-slate-500 font-semibold">Normal Grid</span>
                  </div>

                  {/* Bottom-Left: X1=0, X2=0 -> Y=0 */}
                  <div className="bg-slate-950 border border-slate-800 rounded-xl flex flex-col items-center justify-center p-3 text-center">
                    <span className="font-mono text-[10px] text-slate-400">X₁=0, X₂=0</span>
                    <span className="text-2xl font-black text-slate-500">Y = 0</span>
                    <span className="text-[10px] text-slate-500 font-semibold">Normal Grid</span>
                  </div>

                  {/* Bottom-Right: X1=1, X2=0 -> Y=1 */}
                  <div className="bg-cyan-950/60 border border-cyan-500/50 rounded-xl flex flex-col items-center justify-center p-3 text-center">
                    <span className="font-mono text-[10px] text-slate-400">X₁=1, X₂=0</span>
                    <span className="text-2xl font-black text-cyan-400">Y = 1</span>
                    <span className="text-[10px] text-cyan-300 font-semibold">Overload Trip</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 text-center">
                  Notice that no single horizontal or vertical line can separate Y=1 from Y=0 (Linear Inseparability).
                </div>
              </div>

              {/* Side-by-Side Filter vs Joint Analysis */}
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-800/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-rose-300 text-xs uppercase tracking-wider">
                      1. Univariate Filter Perspective (Individual Evaluation)
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-rose-900/60 text-rose-200 font-bold">
                      CATASTROPHIC FAILURE
                    </span>
                  </div>
                  <div className="space-y-1.5 text-xs text-slate-300 font-mono">
                    <div className="flex justify-between bg-slate-950/60 p-2 rounded-lg">
                      <span>r(X₁, Y):</span>
                      <span className="text-rose-400 font-bold">0.0000 (Drop!)</span>
                    </div>
                    <div className="flex justify-between bg-slate-950/60 p-2 rounded-lg">
                      <span>r(X₂, Y):</span>
                      <span className="text-rose-400 font-bold">0.0000 (Drop!)</span>
                    </div>
                    <div className="flex justify-between bg-slate-950/60 p-2 rounded-lg">
                      <span>I(X₁; Y) = H(Y) - H(Y|X₁):</span>
                      <span className="text-rose-400 font-bold">1.0 - 1.0 = 0.00 bits</span>
                    </div>
                  </div>
                  <p className="text-xs text-rose-200/80 pt-1">
                    Filter conclusion: "Neither X₁ nor X₂ provides any information about target Y. Eliminate both."
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-800/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-300 text-xs uppercase tracking-wider">
                      2. Joint Multivariate Perspective (Kohavi-John Weak Relevance)
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-200 font-bold">
                      100% DETERMINISTIC
                    </span>
                  </div>
                  <div className="space-y-1.5 text-xs text-slate-300 font-mono">
                    <div className="flex justify-between bg-slate-950/60 p-2 rounded-lg">
                      <span>H(Y | X₁, X₂):</span>
                      <span className="text-emerald-400 font-bold">0.00 bits (Zero Uncertainty!)</span>
                    </div>
                    <div className="flex justify-between bg-slate-950/60 p-2 rounded-lg">
                      <span>Joint MI I(X₁, X₂; Y):</span>
                      <span className="text-emerald-400 font-bold">1.0000 bit (Maximum Possible)</span>
                    </div>
                    <div className="flex justify-between bg-slate-950/60 p-2 rounded-lg">
                      <span>Synergistic Information Gain:</span>
                      <span className="text-emerald-400 font-bold">+1.0000 bit</span>
                    </div>
                  </div>
                  <p className="text-xs text-emerald-200/80 pt-1">
                    Multivariate conclusion: "Both features are essential weakly relevant synergistic partners. Retain both!"
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* MODE 3: NOISE INJECTION & MODEL DEGRADATION STRESS-TESTER           */}
        {/* ------------------------------------------------------------------- */}
        {studioMode === "noise_injection" && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-900/30 space-y-1 text-xs">
              <span className="font-bold text-indigo-300 text-sm">
                The Mathematical Cost of Irrelevant Noise: Variance Inflation &amp; Distance Dilution
              </span>
              <p className="text-slate-400">
                Simulate what happens when irrelevant Gaussian noise dimensions are appended to a dataset.
                Watch empirical training accuracy artificially rise (overfitting memorization) while test generalization
                accuracy plunges, and Euclidean contrast ratio collapses to 0.
              </p>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">True Informative Features:</span>
                  <span className="font-mono text-cyan-400 font-bold">{informativeCount} features</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={informativeCount}
                  onChange={e => setInformativeCount(Number(e.target.value))}
                  className="w-full accent-cyan-500"
                />
                <span className="text-[10px] text-slate-500">Physical biomarkers / electrical signals</span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">Irrelevant Noise Dimensions:</span>
                  <span className="font-mono text-rose-400 font-bold">{noiseDimensionCount} noise cols</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="2"
                  value={noiseDimensionCount}
                  onChange={e => setNoiseDimensionCount(Number(e.target.value))}
                  className="w-full accent-rose-500"
                />
                <span className="text-[10px] text-slate-500">Pure random Gaussian N(0, 1) columns</span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">Dataset Sample Size (N):</span>
                  <span className="font-mono text-indigo-400 font-bold">{sampleSizeN} samples</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="1000"
                  step="50"
                  value={sampleSizeN}
                  onChange={e => setSampleSizeN(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
                <span className="text-[10px] text-slate-500">More samples mitigate noise variance</span>
              </div>
            </div>

            {/* Metrics Dashboard */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase text-slate-400 font-semibold block">Training Accuracy</span>
                <span className="text-2xl font-bold font-mono text-cyan-400">{noiseSimulationStats.trainAcc}%</span>
                <span className="text-[10px] text-cyan-300/80 block">Memorizes noise splits</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase text-slate-400 font-semibold block">Test Generalization</span>
                <span className="text-2xl font-bold font-mono text-rose-400">{noiseSimulationStats.testAcc}%</span>
                <span className="text-[10px] text-rose-300/80 block">Real-world performance</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase text-slate-400 font-semibold block">Overfitting Gap</span>
                <span className="text-2xl font-bold font-mono text-amber-400">+{noiseSimulationStats.overfitGap}%</span>
                <span className="text-[10px] text-amber-300/80 block">Train vs Test divergence</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase text-slate-400 font-semibold block">Distance Contrast</span>
                <span className="text-2xl font-bold font-mono text-purple-400">{noiseSimulationStats.contrastRatio}</span>
                <span className="text-[10px] text-purple-300/80 block">Bellman's curse ratio</span>
              </div>
            </div>

            {/* Dynamic Visual Performance Curve */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white uppercase tracking-wider">
                  Empirical Generalization Trajectory as Noise Dimensions Increase
                </span>
                <div className="flex items-center gap-4 text-[11px]">
                  <span className="flex items-center gap-1.5 text-cyan-400">
                    <span className="w-2.5 h-0.5 bg-cyan-400 inline-block" /> Train Accuracy
                  </span>
                  <span className="flex items-center gap-1.5 text-rose-400">
                    <span className="w-2.5 h-0.5 bg-rose-400 inline-block" /> Test Accuracy
                  </span>
                </div>
              </div>

              <div className="h-40 w-full relative flex items-end border-b border-l border-slate-800 px-2 pt-4">
                {/* Visual SVG curve representation */}
                <svg className="w-full h-full overflow-visible" viewBox="0 0 500 120" preserveAspectRatio="none">
                  {/* Grid lines */}
                  <line x1="0" y1="30" x2="500" y2="30" stroke="#334155" strokeDasharray="3 3" strokeWidth="0.5" />
                  <line x1="0" y1="70" x2="500" y2="70" stroke="#334155" strokeDasharray="3 3" strokeWidth="0.5" />

                  {/* Training Accuracy line (rising upward to the right) */}
                  <path
                    d={`M 0,${100 - (70 * 0.8)} Q 250,${100 - (85 * 0.8)} 500,${100 - (Number(noiseSimulationStats.trainAcc) * 0.95)}`}
                    fill="none"
                    stroke="#22d3ee"
                    strokeWidth="3"
                  />

                  {/* Test Accuracy line (falling downward to the right) */}
                  <path
                    d={`M 0,${100 - (75 * 0.8)} Q 200,${100 - (70 * 0.8)} 500,${100 - (Number(noiseSimulationStats.testAcc) * 0.8)}`}
                    fill="none"
                    stroke="#f43f5e"
                    strokeWidth="3"
                  />

                  {/* Current Position Marker */}
                  <line
                    x1={(noiseDimensionCount / 50) * 500}
                    y1="0"
                    x2={(noiseDimensionCount / 50) * 500}
                    y2="120"
                    stroke="#818cf8"
                    strokeWidth="1.5"
                    strokeDasharray="4 2"
                  />
                </svg>
              </div>

              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>0 Noise Features</span>
                <span>Current Noise: {noiseDimensionCount} Dimensions</span>
                <span>50 Noise Features</span>
              </div>
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
            Formal Definitions &amp; Information-Theoretic Equivalence
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Rigorous mathematical definitions of feature relevance and theoretical proofs of why strong relevance is indispensable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          {/* Card 1: Kohavi-John Formal Definitions */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
            <h4 className="text-sm font-bold text-indigo-300 uppercase tracking-wider">
              1. Probabilistic Definitions (Kohavi-John 1997)
            </h4>
            <div className="space-y-3 text-slate-300 leading-relaxed font-mono">
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                <span className="text-emerald-400 font-bold block">Definition 1: Strong Relevance</span>
                <span>{"P(Y = y | Xᵢ = xᵢ, Sᵢ = sᵢ) ≠ P(Y = y | Sᵢ = sᵢ)"}</span>
                <span className="text-slate-400 text-[11px] font-sans block pt-1">
                  for some {"xᵢ, y, sᵢ"} with {"P(Xᵢ = xᵢ, Sᵢ = sᵢ) > 0"}. Indispensable for Bayes error rate.
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                <span className="text-indigo-400 font-bold block">Definition 2: Weak Relevance</span>
                <span>{"∃ S'ᵢ ⊂ Sᵢ : P(Y = y | Xᵢ = xᵢ, S'ᵢ = s'ᵢ) ≠ P(Y = y | S'ᵢ = s'ᵢ)"}</span>
                <span className="text-slate-400 text-[11px] font-sans block pt-1">
                  while {"P(Y | Xᵢ, Sᵢ) = P(Y | Sᵢ)"}. Information is duplicated or conditionally interactive.
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                <span className="text-rose-400 font-bold block">Definition 3: Irrelevance</span>
                <span>{"∀ S'ᵢ ⊆ Sᵢ : P(Y = y | Xᵢ = xᵢ, S'ᵢ = s'ᵢ) = P(Y = y | S'ᵢ = s'ᵢ)"}</span>
                <span className="text-slate-400 text-[11px] font-sans block pt-1">
                  Strict conditional independence {"Y ⊥ Xᵢ | S'"} across all possible feature subsets.
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Information Theory Equivalence */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
            <h4 className="text-sm font-bold text-cyan-300 uppercase tracking-wider">
              2. Information Theory Formulations
            </h4>
            <div className="space-y-3 text-slate-300 leading-relaxed font-mono">
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                <span className="text-cyan-400 font-bold block">Shannon Entropy &amp; Mutual Information:</span>
                <span>{"H(Y) = - ∑ P(y) log₂ P(y)"}</span>
                <span>{"I(Xᵢ; Y) = H(Y) - H(Y | Xᵢ)"}</span>
                <span>{"I(Xᵢ; Y | S) = H(Y | S) - H(Y | Xᵢ, S)"}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                <span className="text-purple-400 font-bold block">OLS Variance Inflation Theorem:</span>
                <span>{"Var(β̂) = σ² (Xᵀ X)⁻¹"}</span>
                <span className="text-slate-400 text-[11px] font-sans block pt-1">
                  Appending {"p"} irrelevant noise columns expands {"(XᵀX)⁻¹"}, inflating estimation variance of all valid weights.
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                <span className="text-amber-400 font-bold block">Bellman's Distance Dilution Limit:</span>
                <span>{"lim_{d → ∞} (dist_max - dist_min) / dist_min = 0"}</span>
                <span className="text-slate-400 text-[11px] font-sans block pt-1">
                  As noise dimensions {"d"} increase, nearest neighbors become equidistant from random points.
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
            Real-world enterprise telemetry schemas and feature categorization audits from West Bengal industries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          {/* Case 1: WBSEDCL */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-indigo-300 uppercase tracking-wider">
                Case 1: WBSEDCL Smart Meter Grid (Barrackpore)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                Energy Distribution
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              <strong>Objective:</strong> Predict 33/11 kV distribution transformer core temperature &amp; summer overload burnout.
            </p>
            <div className="space-y-1.5 pt-1">
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-emerald-400 font-bold">Strongly Relevant:</span> Active Power (kW), Reactive Power (kVAR), Ambient Barrackpore summer temp (°C).
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-indigo-400 font-bold">Weakly Relevant (Redundant):</span> Apparent Power (kVA = √(kW² + kVAR²)), Secondary oil temp probe.
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-rose-400 font-bold">Irrelevant (Pure Noise):</span> Consumer billing lottery number, meter casing paint batch ID.
              </div>
            </div>
          </div>

          {/* Case 2: Cardiac & Metabolic Diagnostics */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-cyan-300 uppercase tracking-wider">
                Case 2: Cardiac Risk Diagnostics (Salt Lake &amp; Jadavpur)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                Healthcare Informatics
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              <strong>Objective:</strong> 5-year Acute Myocardial Infarction (AMI) risk scoring in tertiary cardiology care.
            </p>
            <div className="space-y-1.5 pt-1">
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-emerald-400 font-bold">Strongly Relevant:</span> HbA1c (%), High-sensitivity CRP (mg/L), Systolic BP, Patient Age.
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-indigo-400 font-bold">Weakly Relevant (Redundant):</span> Total Cholesterol (subsumed by Friedewald formula: LDL + HDL + TG/5).
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-rose-400 font-bold">Irrelevant (Pure Noise):</span> Hospital outpatient token number, Ward bed allocation barcode.
              </div>
            </div>
          </div>

          {/* Case 3: Hooghly Jute & Textile Mills */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-300 uppercase tracking-wider">
                Case 3: Jute Yarn Tensile Tenacity (Serampore, Hooghly)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                Textile Manufacturing
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              <strong>Objective:</strong> Predict breaking tenacity (cN/tex) during automated high-speed yarn spinning.
            </p>
            <div className="space-y-1.5 pt-1">
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-emerald-400 font-bold">Strongly Relevant:</span> Jute batch moisture regain (%), Spindle RPM, Sliver linear density (ktex).
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-amber-400 font-bold">Weakly Relevant (Interactive):</span> Retting enzyme dosage (g/L) and soaking duration (hours) (XOR synergy).
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-rose-400 font-bold">Irrelevant (Pure Noise):</span> Spinning frame motor chassis paint color, Supervisor punch-card badge ID.
              </div>
            </div>
          </div>

          {/* Case 4: Kolkata Metro East-West Line */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-purple-300 uppercase tracking-wider">
                Case 4: Metro Station Gate Surges (Sealdah &amp; Howrah)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                Transit Telemetry
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              <strong>Objective:</strong> 15-minute passenger headway volume forecasting at peak interchange stations.
            </p>
            <div className="space-y-1.5 pt-1">
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-emerald-400 font-bold">Strongly Relevant:</span> Eastern Railway suburban train arrival delay (mins), Alipore radar rain intensity.
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-indigo-400 font-bold">Weakly Relevant (Redundant):</span> Optical turnstile barrier passage pulses (redundant with RFID taps).
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-rose-400 font-bold">Irrelevant (Pure Noise):</span> Commuter smartcard RFID production batch ID, Gate coin hopper weight.
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
              Topic 2 Diagnostic Assessment Quiz
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
            Six architectural traps that cause feature selection pipelines to fail in production deployments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-xs">
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-rose-900/30 space-y-2">
            <span className="font-bold text-rose-300 flex items-center gap-2 text-sm">
              <span>🚫</span> 1. Univariate Filtering Fallacy
            </span>
            <p className="text-slate-400 leading-relaxed">
              Using individual Pearson |r| or univariate ANOVA to prune columns. This blindly deletes essential XOR interactions and non-linear couplings.
            </p>
            <span className="text-[11px] text-cyan-400 font-mono block pt-1">Fix: Pair filters with Mutual Info or Tree importances.</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-rose-900/30 space-y-2">
            <span className="font-bold text-rose-300 flex items-center gap-2 text-sm">
              <span>📉</span> 2. Collinear Variance Explosion
            </span>
            <p className="text-slate-400 leading-relaxed">
              Retaining duplicate measurements (e.g. Celsius &amp; Fahrenheit or dual sensors) in linear/logistic models. Inflates parameter standard errors and flips signs.
            </p>
            <span className="text-[11px] text-cyan-400 font-mono block pt-1">Fix: Check VIF &gt;= 10 and apply L1 Lasso regularization.</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-rose-900/30 space-y-2">
            <span className="font-bold text-rose-300 flex items-center gap-2 text-sm">
              <span>🆔</span> 3. High-Cardinality ID Memorization
            </span>
            <p className="text-slate-400 leading-relaxed">
              Feeding UUIDs, order numbers, or meter serials into decision trees. Trees split on unique IDs to achieve 100% train accuracy, resulting in 0% test generalization.
            </p>
            <span className="text-[11px] text-cyan-400 font-mono block pt-1">Fix: Drop unique identifiers at data ingestion gateway.</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-rose-900/30 space-y-2">
            <span className="font-bold text-rose-300 flex items-center gap-2 text-sm">
              <span>🎲</span> 4. Small-N Spurious Correlation
            </span>
            <p className="text-slate-400 leading-relaxed">
              When sample size N is small (e.g. N = 40), random Gaussian noise features can exhibit sample correlations of |r| ≈ 0.35 purely by statistical chance.
            </p>
            <span className="text-[11px] text-cyan-400 font-mono block pt-1">Fix: Enforce Bonferroni adjusted p-values and 10-fold CV.</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-rose-900/30 space-y-2">
            <span className="font-bold text-rose-300 flex items-center gap-2 text-sm">
              <span>📏</span> 5. Distance Metric Noise Dilution
            </span>
            <p className="text-slate-400 leading-relaxed">
              Applying KNN or RBF SVM with 50 noise features. Euclidean distance becomes dominated by noise terms, making all instances appear equidistant.
            </p>
            <span className="text-[11px] text-cyan-400 font-mono block pt-1">Fix: Perform feature pruning before any distance-based model.</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-rose-900/30 space-y-2">
            <span className="font-bold text-rose-300 flex items-center gap-2 text-sm">
              <span>✂️</span> 6. Premature Pruning of Weak Features
            </span>
            <p className="text-slate-400 leading-relaxed">
              Discarding weakly relevant features before knowing model architecture. Weak features redundant in linear models may be vital for orthogonal tree splits.
            </p>
            <span className="text-[11px] text-cyan-400 font-mono block pt-1">Fix: Perform model-aware embedded or wrapper selection.</span>
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
              Study Notes (topic2_note.txt)
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
              Python Lab (relevant_and_irrelevant_features_lab.py)
            </button>
          </div>
        </div>

        {activeTab === "code" ? (
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>File: <code className="text-cyan-300 font-mono">relevant_and_irrelevant_features_lab.py</code></span>
              <span>Pure Python 3 • Zero Dependencies • Exit Code 0</span>
            </div>
            <PythonFileLoader
              code={labCode}
              fileName="relevant_and_irrelevant_features_lab.py"
              title="Relevant and Irrelevant Features Laboratory Benchmark"
            />
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>File: <code className="text-cyan-300 font-mono">topic2_note.txt</code></span>
              <span>305 Lines of Comprehensive Academic Notes</span>
            </div>
            <PlainTextPrint
              content={noteText}
              fileName="topic2_note.txt"
              title="Topic 2: Academic Study Notes (BCAC701B)"
            />
          </div>
        )}
      </section>

      {/* ===================================================================== */}
      {/* 9. MAKAUT VIVA VOCE EXAMINATION FAQ & TEACHER SIGNATURE               */}
      {/* ===================================================================== */}
      <section id="faq" className="space-y-8">
        <FAQTemplate
          title="Topic 2: MAKAUT Master Viva &amp; Technical Interview Questions"
          subtitle="30 Graded Analytical Questions with Comprehensive Theoretical Rationales"
          questions={questions}
        />

        <Teacher />
      </section>
    </div>
  );
};

export default Topic2;
