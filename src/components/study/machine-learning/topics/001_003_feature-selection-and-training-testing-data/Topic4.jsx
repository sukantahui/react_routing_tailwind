import React, { useState, useId, useMemo } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import labCode from "./topic4_files/basic_feature_selection_techniques_lab.py?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions.js";

// =============================================================================
// KOLKATA METRO GREEN LINE COMMUTER DATASET FEATURES
// =============================================================================

const METRO_CANDIDATE_FEATURES = [
  {
    id: "rfid_taps",
    name: "Platform RFID Smartcard Taps",
    symbol: "X₁",
    type: "Continuous Numerical",
    variance: 12100.0,
    isBinary: false,
    pVal: null,
    anovaF: 124.38,
    chi2: 118.5,
    mutualInfo: 0.84,
    description: "Tap-in count per 15-min window across Sealdah interchange gates.",
    collinearWith: "optical_pulses",
    pairwiseR: 0.9997
  },
  {
    id: "optical_pulses",
    name: "Platform Optical Barrier Pulses",
    symbol: "X₂",
    type: "Continuous Numerical",
    variance: 11850.0,
    isBinary: false,
    pVal: null,
    anovaF: 123.77,
    chi2: 116.8,
    mutualInfo: 0.83,
    description: "Optical turnstile beam interruption count (redundant with RFID taps).",
    collinearWith: "rfid_taps",
    pairwiseR: 0.9997
  },
  {
    id: "train_gap",
    name: "Train Arrival Headway (mins)",
    symbol: "X₃",
    type: "Continuous Numerical",
    variance: 4.12,
    isBinary: false,
    pVal: null,
    anovaF: 21.89,
    chi2: 32.4,
    mutualInfo: 0.42,
    description: "Scheduled vs actual Eastern Railway train arrival gap at Sealdah.",
    collinearWith: null,
    pairwiseR: 0.12
  },
  {
    id: "rain_intensity",
    name: "Rainfall Intensity (mm/hr)",
    symbol: "X₄",
    type: "Continuous Numerical",
    variance: 86.4,
    isBinary: false,
    pVal: null,
    anovaF: 22.08,
    chi2: 35.1,
    mutualInfo: 0.45,
    description: "Alipore meteorological radar rain gauge precipitation index.",
    collinearWith: null,
    pairwiseR: 0.08
  },
  {
    id: "currency_code",
    name: "AFC Gate Currency Code",
    symbol: "X₅",
    type: "Constant Numerical",
    variance: 0.0000,
    isBinary: false,
    pVal: null,
    anovaF: 0.00,
    chi2: 0.0,
    mutualInfo: 0.00,
    description: "Domestic fare currency ISO code (356 for INR across 100% of rows).",
    collinearWith: null,
    pairwiseR: 0.00
  },
  {
    id: "kolkata_resident",
    name: "Kolkata Resident Flag",
    symbol: "X₆",
    type: "Binary Quasi-Constant",
    variance: 0.00498, // p = 0.995 => p*(1-p) = 0.004975
    isBinary: true,
    pVal: 0.995,
    anovaF: 0.42,
    chi2: 0.38,
    mutualInfo: 0.01,
    description: "Smartcard KYC domestic resident indicator (99.5% are residents).",
    collinearWith: null,
    pairwiseR: 0.02
  },
  {
    id: "station_zone",
    name: "Station Interchange Zone Category",
    symbol: "X₇",
    type: "Categorical Discrete",
    variance: 0.67,
    isBinary: false,
    pVal: null,
    anovaF: 48.65,
    chi2: 96.8,
    mutualInfo: 0.58,
    description: "Discrete zone ID: 0 = Howrah Maidan, 1 = Sealdah, 2 = Salt Lake Sector V.",
    collinearWith: null,
    pairwiseR: 0.15
  },
  {
    id: "random_hash",
    name: "Smartcard Crypto Token Hash",
    symbol: "X₈",
    type: "Continuous Noise",
    variance: 0.0833, // Uniform(0, 1) variance = 1/12 ≈ 0.0833
    isBinary: false,
    pVal: null,
    anovaF: 0.20,
    chi2: 0.15,
    mutualInfo: 0.00,
    description: "Pseudo-random cryptographic session nonce generated on card tap.",
    collinearWith: null,
    pairwiseR: -0.01
  }
];

// =============================================================================
// DIAGNOSTIC ASSESSMENT QUESTIONS (5 MULTI-STAGE SCENARIO QUESTIONS)
// =============================================================================

const DIAGNOSTIC_QUESTIONS = [
  {
    id: 1,
    scenario: "An ML engineer applies VarianceThreshold(0.01) on an unscaled dataset containing salary in INR (variance = 4.2 × 10⁸) and customer age in years (variance = 0.008 in standard units). Age is deleted.",
    question: "What core architectural error occurred during this unsupervised variance thresholding step?",
    options: [
      { label: "A", text: "Customer age is mathematically non-linear and cannot have variance." },
      { label: "B", text: "Variance is unit-dependent (scale-sensitive); without feature normalization, features with small numerical units are erroneously dropped regardless of predictive power." },
      { label: "C", text: "VarianceThreshold can only be executed on integer count variables." },
      { label: "D", text: "The threshold of 0.01 was too high for continuous features." }
    ],
    correct: "B",
    explanation: "Sample variance s² scales with the square of feature units. A variable measured in small units will naturally have tiny variance, causing unscaled VarianceThreshold to discard it. Standardization (or unit-aware filtering) is mandatory before applying numerical variance cutoffs."
  },
  {
    id: 2,
    scenario: "In an automated pipeline, a data scientist uses SelectKBest with `chi2` to rank features, but passes z-score standardized features (which contain negative values).",
    question: "Why does scikit-learn's `chi2` function throw an immediate ValueError on standardized inputs?",
    options: [
      { label: "A", text: "Chi-Square requires features to follow a Cauchy distribution." },
      { label: "B", text: "Pearson's Chi-Square test is mathematically formulated on non-negative contingency frequencies; negative numbers violate its probabilistic axioms." },
      { label: "C", text: "Standardized features cause floating-point underflow in GPU memory." },
      { label: "D", text: "Chi-Square is an unsupervised clustering algorithm." }
    ],
    correct: "B",
    explanation: "Pearson's chi-square test evaluates (Observed - Expected)² / Expected. It requires non-negative frequencies, counts, or min-max scaled [0, 1] values. Standard scaling produces negative values for all observations below the mean, triggering ValueError: Input X must be non-negative."
  },
  {
    id: 3,
    scenario: "At the WBSEDCL smart grid substation, 'Phase_A_Current_Probe_1' and 'Phase_A_Current_Probe_2' have Pearson r = 0.9997. Both are evaluated by `SelectKBest(f_classif, k=5)`.",
    question: "How does univariate `SelectKBest` handle these two near-identical duplicate sensors?",
    options: [
      { label: "A", text: "It detects the collinearity and automatically drops Probe 2." },
      { label: "B", text: "Because univariate filters evaluate each feature in isolation, both receive virtually identical top F-scores and BOTH get selected, wasting 2 of the 5 available feature slots on redundant duplicate information." },
      { label: "C", text: "It combines both probes into an arithmetic mean." },
      { label: "D", text: "It crashes due to a singular covariance matrix." }
    ],
    correct: "B",
    explanation: "Univariate filters cannot detect feature-to-feature relationships. Both probes have strong individual correlation with the target, so both receive high scores and both are selected. A correlation deduplication step is required to prune redundancy."
  },
  {
    id: 4,
    scenario: "In a clinical cancer diagnostic task, an ultra-rare genetic mutation flag `has_brca_variant` occurs in only 0.3% of patient samples (p = 0.003).",
    question: "Why would applying an unsupervised `VarianceThreshold(0.01)` be medically disastrous in this pipeline?",
    options: [
      { label: "A", text: "The mutation has negative variance." },
      { label: "B", text: "The Bernoulli variance is p*(1-p) = 0.003 * 0.997 = 0.00299 < 0.01; VarianceThreshold will delete this life-saving diagnostic marker because it mistakes rarity for uselessness!" },
      { label: "C", text: "Genetic features must only be filtered using cosine similarity." },
      { label: "D", text: "The algorithm will convert the genetic mutation into a continuous float." }
    ],
    correct: "B",
    explanation: "Unsupervised variance filters judge features solely by diversity of values. In rare anomaly detection, critical life-saving flags are quasi-constant (present in < 1% of rows). VarianceThreshold will permanently discard them unless rare anomaly features are exempt."
  },
  {
    id: 5,
    scenario: "A data pipeline tests 10,000 candidate NLP n-grams against customer churn using individual hypothesis tests at alpha = 0.05.",
    question: "What statistical procedure should be applied to control the proportion of false positive features among all selected features?",
    options: [
      { label: "A", text: "Benjamini-Hochberg False Discovery Rate (FDR) control (SelectFdr)." },
      { label: "B", text: "K-Means clustering on the residuals." },
      { label: "C", text: "Min-Max normalization to [-1, 1]." },
      { label: "D", text: "Ordinary Least Squares polynomial expansion." }
    ],
    correct: "A",
    explanation: "In high-dimensional testing (m = 10,000), testing at alpha = 0.05 on noise yields ~500 false discoveries by chance. The Benjamini-Hochberg procedure controls the False Discovery Rate (FDR), guaranteeing that the proportion of false discoveries does not exceed a chosen threshold Q."
  }
];

const Topic4 = () => {
  const svgId = useId();

  // Navigation & UI States
  const [activeTab, setActiveTab] = useState("theory"); // 'theory' | 'code'
  const [studioMode, setStudioMode] = useState("variance"); // 'variance' | 'ranker' | 'dedup'

  // Studio Mode 1: Variance Thresholding State
  const [varianceThreshold, setVarianceThreshold] = useState(0.01);

  const varianceFilterResults = useMemo(() => {
    const retained = [];
    const dropped = [];

    METRO_CANDIDATE_FEATURES.forEach(feat => {
      if (feat.variance > varianceThreshold) {
        retained.push(feat);
      } else {
        dropped.push(feat);
      }
    });

    const memoryReduction = ((dropped.length / METRO_CANDIDATE_FEATURES.length) * 100).toFixed(0);

    return {
      retained,
      dropped,
      memoryReduction
    };
  }, [varianceThreshold]);

  // Studio Mode 2: Supervised Ranker (SelectKBest)
  const [scoringMetric, setScoringMetric] = useState("anova"); // 'anova' | 'chi2' | 'mutual_info'
  const [kCount, setKCount] = useState(4);

  const rankedFeatures = useMemo(() => {
    const scoredList = METRO_CANDIDATE_FEATURES.map(feat => {
      let score = 0.0;
      if (scoringMetric === "anova") score = feat.anovaF;
      else if (scoringMetric === "chi2") score = feat.chi2;
      else if (scoringMetric === "mutual_info") score = feat.mutualInfo;

      return {
        ...feat,
        activeScore: score
      };
    });

    // Sort descending
    scoredList.sort((a, b) => b.activeScore - a.activeScore);

    const selectedK = scoredList.slice(0, kCount);
    const unselected = scoredList.slice(kCount);

    return {
      allSorted: scoredList,
      selectedK,
      unselected
    };
  }, [scoringMetric, kCount]);

  // Studio Mode 3: Greedy Deduplication
  const [dedupThreshold, setDedupThreshold] = useState(0.85);

  const deduplicationResults = useMemo(() => {
    // Greedy deduplication logic
    const dropped = new Set();
    const pairs = [];

    METRO_CANDIDATE_FEATURES.forEach((f1, i) => {
      if (dropped.has(f1.id)) return;
      METRO_CANDIDATE_FEATURES.forEach((f2, j) => {
        if (j <= i || dropped.has(f2.id)) return;

        if (f1.collinearWith === f2.id && f1.pairwiseR >= dedupThreshold) {
          dropped.add(f2.id);
          pairs.push({
            kept: f1.name,
            dropped: f2.name,
            r: f1.pairwiseR
          });
        }
      });
    });

    const retained = METRO_CANDIDATE_FEATURES.filter(f => !dropped.has(f.id));

    return {
      retained,
      droppedCount: dropped.size,
      pairs
    };
  }, [dedupThreshold]);

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
              Topic 4 of 16
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              MAKAUT BCAC701B Masterclass
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Basic Feature Selection Techniques
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Master the foundational filter tier of modern data engineering pipelines. Explore unsupervised
            VarianceThreshold for constant and quasi-constant pruning, supervised ranking via ANOVA F-test and
            Chi-Square (SelectKBest / SelectPercentile), and greedy pairwise correlation deduplication.
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
            The Novice Masterclass: Understanding Basic Feature Filters
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Three intuitive everyday mental models illustrating how variance sieves, statistical tests, and deduplication clean raw data.
          </p>
        </div>

        {/* 3 Everyday Metaphors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Metaphor 1 */}
          <div className="p-5 rounded-2xl bg-slate-950/70 border border-indigo-900/40 space-y-3 relative overflow-hidden">
            <div className="text-2xl">🥭</div>
            <h4 className="text-base font-bold text-indigo-300">
              1. The Malda Mango Sorting Depot
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Grading fruit at a West Bengal orchard:
            </p>
            <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-4">
              <li><strong className="text-slate-200">Zero Variance:</strong> If every single fruit in the crate is a Himsagar, the 'Fruit_Variety' label has zero variance. Useless for grading.</li>
              <li><strong className="text-slate-200">Quasi-Constant:</strong> If 99.8% are yellow and 0.2% green, color provides negligible discriminatory spread.</li>
              <li><strong className="text-slate-200">ANOVA F-test:</strong> Sugar Brix level across Premium vs Standard crates (high between-group spread).</li>
              <li><strong className="text-slate-200">Deduplication:</strong> Measuring weight in grams vs ounces. Keep one scale!</li>
            </ul>
          </div>

          {/* Metaphor 2 */}
          <div className="p-5 rounded-2xl bg-slate-950/70 border border-cyan-900/40 space-y-3 relative overflow-hidden">
            <div className="text-2xl">🎪</div>
            <h4 className="text-base font-bold text-cyan-300">
              2. Deshapriya Park Durga Puja Gate
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Crowd security screening in Kolkata:
            </p>
            <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-4">
              <li><strong className="text-slate-200">Constant Filter:</strong> Everyone entering is human; 'Species: Homo sapiens' is filtered out immediately.</li>
              <li><strong className="text-slate-200">SelectKBest:</strong> Frisking guards prioritize top 3 high-threat signals: metal detector beeps, oversized bag, no VIP wristband.</li>
              <li><strong className="text-slate-200">Correlation Deduplication:</strong> Two optical cameras 5 inches apart; check one monitor, ignore the second.</li>
            </ul>
          </div>

          {/* Metaphor 3 */}
          <div className="p-5 rounded-2xl bg-slate-950/70 border border-emerald-900/40 space-y-3 relative overflow-hidden">
            <div className="text-2xl">🌾</div>
            <h4 className="text-base font-bold text-emerald-300">
              3. The Sealdah Grain Sieve
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Sifting wholesale basmati rice:
            </p>
            <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-4">
              <li><strong className="text-slate-200">Mechanical Sieve (Threshold):</strong> The wire mesh has a fixed hole diameter (θ). Dust and broken husks fall through; full grains remain.</li>
              <li><strong className="text-slate-200">Supervised Inspection:</strong> Picking grains based on aroma and grain length (SelectKBest).</li>
              <li><strong className="text-slate-200">Speed Advantage:</strong> Shaking a sieve takes 2 seconds (O(N) filter) compared to hand-inspecting each grain under a microscope (wrapper).</li>
            </ul>
          </div>
        </div>

        {/* Basic Techniques Comparison Table */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">
            The Basic Feature Selection Taxonomy Matrix
          </h4>
          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-300 border-b border-slate-800">
                <tr>
                  <th className="p-3 font-semibold">Technique</th>
                  <th className="p-3 font-semibold">Supervision</th>
                  <th className="p-3 font-semibold">Target Variable Type</th>
                  <th className="p-3 font-semibold">Mathematical Criterion</th>
                  <th className="p-3 font-semibold">Primary Industrial Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-400">
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-bold text-emerald-300">VarianceThreshold</td>
                  <td className="p-3 text-slate-300">Unsupervised</td>
                  <td className="p-3 font-mono">None (Target-agnostic)</td>
                  <td className="p-3 font-mono text-cyan-300">s² &gt; θ or p(1-p) &gt; θ</td>
                  <td className="p-3 text-slate-300">Pruning zero-variance constants &amp; quasi-constant flags</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-bold text-indigo-300">ANOVA F-test (f_classif)</td>
                  <td className="p-3 text-slate-300">Supervised</td>
                  <td className="p-3 font-mono">Discrete Categorical</td>
                  <td className="p-3 font-mono text-cyan-300">F = MS_between / MS_within</td>
                  <td className="p-3 text-slate-300">Ranking continuous features in multiclass classification</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-bold text-cyan-300">Chi-Square (chi2)</td>
                  <td className="p-3 text-slate-300">Supervised</td>
                  <td className="p-3 font-mono">Discrete Categorical</td>
                  <td className="p-3 font-mono text-cyan-300">χ² = ∑ (O - E)² / E</td>
                  <td className="p-3 text-slate-300">Non-negative count/binary feature independence test</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-bold text-purple-300">F-Regression (f_regression)</td>
                  <td className="p-3 text-slate-300">Supervised</td>
                  <td className="p-3 font-mono">Continuous Numerical</td>
                  <td className="p-3 font-mono text-cyan-300">F = (r² / (1-r²)) * (N - 2)</td>
                  <td className="p-3 text-slate-300">Testing linear slope significance in continuous regression</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="p-3 font-bold text-amber-300">Correlation Deduplication</td>
                  <td className="p-3 text-slate-300">Unsupervised</td>
                  <td className="p-3 font-mono">None</td>
                  <td className="p-3 font-mono text-cyan-300">|r(Xⱼ, Xₖ)| &lt; θ (e.g. 0.85)</td>
                  <td className="p-3 text-slate-300">Eliminating collinear duplicate sensors and redundant features</td>
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
              <span className="font-bold text-cyan-300 block mb-1">Quasi-Constant:</span>
              A feature where a single value dominates 99%+ of rows. Its Bernoulli variance falls below 0.01.
            </div>
            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <span className="font-bold text-cyan-300 block mb-1">Univariate Filter:</span>
              An algorithm that evaluates each feature in isolation against target Y without considering interactions.
            </div>
            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <span className="font-bold text-cyan-300 block mb-1">False Discovery Rate (FDR):</span>
              The expected proportion of false positive features among all selected features, controlled by Benjamini-Hochberg.
            </div>
            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <span className="font-bold text-cyan-300 block mb-1">SelectKBest:</span>
              A transformer that retains the top k features with highest test scores, enforcing a strict feature budget.
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
              The Basic Feature Selection Laboratory
            </h3>
          </div>

          {/* Mode Switcher */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "variance", label: "Mode 1: Variance Thresholding", badge: "Constant / Quasi-Constant" },
              { id: "ranker", label: "Mode 2: Supervised SelectKBest", badge: "ANOVA F / Chi² / MI" },
              { id: "dedup", label: "Mode 3: Correlation Deduplication", badge: "Collinear Pruning" }
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
        {/* MODE 1: VARIANCE THRESHOLDING & QUASI-CONSTANT PRUNING              */}
        {/* ------------------------------------------------------------------- */}
        {studioMode === "variance" && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-900/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <span className="font-bold text-indigo-300">Unsupervised Variance Sieve (Kolkata Metro Ingestion)</span>
                <p className="text-slate-400">
                  Adjust the variance threshold cutoff <span className="font-mono text-cyan-300">θ</span>. Features with
                  variance <span className="font-mono text-rose-300">s² ≤ θ</span> are stripped. Watch constant currency codes
                  and 99.5% quasi-constant resident flags get cleanly excised.
                </p>
              </div>
              <div className="flex items-center gap-4 bg-slate-950 px-3.5 py-1.5 rounded-xl border border-slate-800 shrink-0">
                <div>
                  <span className="text-[10px] uppercase text-slate-500 block">Retained</span>
                  <span className="font-mono font-bold text-emerald-400">
                    {varianceFilterResults.retained.length} / {METRO_CANDIDATE_FEATURES.length}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-slate-500 block">Dropped</span>
                  <span className="font-mono font-bold text-rose-400">
                    {varianceFilterResults.dropped.length} features
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-slate-500 block">Payload Drop</span>
                  <span className="font-mono font-bold text-cyan-400">
                    -{varianceFilterResults.memoryReduction}%
                  </span>
                </div>
              </div>
            </div>

            {/* Threshold Slider */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <span className="text-slate-400 font-semibold">Variance Cutoff Threshold (θ):</span>
                <input
                  type="range"
                  min="0.000"
                  max="0.050"
                  step="0.002"
                  value={varianceThreshold}
                  onChange={e => setVarianceThreshold(Number(e.target.value))}
                  className="w-48 accent-cyan-500"
                />
                <span className="font-mono text-cyan-400 font-bold text-sm">θ = {varianceThreshold.toFixed(4)}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setVarianceThreshold(0.000)}
                  className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 hover:text-white text-slate-400"
                >
                  θ = 0.0 (Constants Only)
                </button>
                <button
                  onClick={() => setVarianceThreshold(0.010)}
                  className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 hover:text-white text-slate-400"
                >
                  θ = 0.01 (99% Dominance)
                </button>
              </div>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {METRO_CANDIDATE_FEATURES.map(feat => {
                const isRetained = feat.variance > varianceThreshold;
                return (
                  <div
                    key={feat.id}
                    className={clsx(
                      "p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3",
                      isRetained
                        ? "bg-slate-900/90 border-emerald-500/50 shadow-md shadow-emerald-950/30"
                        : "bg-slate-950/60 border-rose-900/40 opacity-70"
                    )}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono font-bold text-indigo-400 text-xs px-2 py-0.5 rounded bg-indigo-950 border border-indigo-800">
                          {feat.symbol}
                        </span>
                        <span className={clsx(
                          "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                          isRetained ? "bg-emerald-950 text-emerald-300 border border-emerald-800" : "bg-rose-950 text-rose-300 border border-rose-800"
                        )}>
                          {isRetained ? "RETAINED ✓" : "DROPPED ✗"}
                        </span>
                      </div>
                      <h4 className="font-bold text-xs text-white mb-0.5">{feat.name}</h4>
                      <span className="text-[10px] text-cyan-400 block mb-1 font-mono">{feat.type}</span>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        {feat.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80 text-[11px] space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Sample Variance:</span>
                        <span className={clsx(
                          "font-mono font-bold",
                          isRetained ? "text-emerald-400" : "text-rose-400"
                        )}>
                          {feat.variance.toFixed(4)}
                        </span>
                      </div>
                      {feat.isBinary && (
                        <div className="text-[10px] text-slate-500">
                          Bernoulli: p(1-p) = {(feat.pVal * (1 - feat.pVal)).toFixed(4)}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* MODE 2: SUPERVISED FEATURE RANKER & SELECTKBEST                     */}
        {/* ------------------------------------------------------------------- */}
        {studioMode === "ranker" && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-900/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <span className="font-bold text-indigo-300">Supervised Feature Ranker &amp; SelectKBest Simulator</span>
                <p className="text-slate-400">
                  Select a scoring criterion and adjust <span className="font-mono text-cyan-300">k</span>. Features with the top
                  k scores are highlighted and selected into the model training pipeline.
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-slate-400 font-semibold mr-1">Scoring Metric:</span>
                {[
                  { id: "anova", label: "ANOVA F-Score (f_classif)" },
                  { id: "chi2", label: "Chi-Square (chi2)" },
                  { id: "mutual_info", label: "Mutual Info (bits)" }
                ].map(s => (
                  <button
                    key={s.id}
                    onClick={() => setScoringMetric(s.id)}
                    className={clsx(
                      "px-3 py-1.5 rounded-lg border font-medium transition-all cursor-pointer",
                      scoringMetric === s.id
                        ? "bg-indigo-600 text-white border-indigo-400"
                        : "bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200"
                    )}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-slate-400 font-semibold">Select Top k Features:</span>
                <input
                  type="range"
                  min="1"
                  max="7"
                  value={kCount}
                  onChange={e => setKCount(Number(e.target.value))}
                  className="w-32 accent-indigo-500"
                />
                <span className="font-mono text-indigo-400 font-bold text-base">k = {kCount}</span>
              </div>
            </div>

            {/* Dynamic Ranking Bar Chart */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-white uppercase tracking-wider">
                  Feature Importance Rankings ({scoringMetric.toUpperCase()})
                </span>
                <span className="font-mono text-slate-400 text-[11px]">
                  Selected: Top {kCount} of {rankedFeatures.allSorted.length}
                </span>
              </div>

              <div className="space-y-3">
                {rankedFeatures.allSorted.map((feat, rank) => {
                  const isSelected = rank < kCount;
                  const maxScore = rankedFeatures.allSorted[0].activeScore || 1.0;
                  const barWidth = Math.max(3, (feat.activeScore / maxScore) * 100);

                  return (
                    <div key={feat.id} className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <div className="flex items-center gap-2">
                          <span className={clsx(
                            "w-5 h-5 rounded flex items-center justify-center font-mono text-[10px] font-bold",
                            isSelected ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-500"
                          )}>
                            #{rank + 1}
                          </span>
                          <span className={clsx("font-semibold", isSelected ? "text-white" : "text-slate-400")}>
                            {feat.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 font-mono text-xs">
                          <span className={clsx("font-bold", isSelected ? "text-cyan-400" : "text-slate-500")}>
                            Score: {feat.activeScore.toFixed(2)}
                          </span>
                          <span className={clsx(
                            "text-[10px] font-semibold px-2 py-0.5 rounded",
                            isSelected ? "bg-emerald-950/70 text-emerald-300 border border-emerald-800/40" : "bg-slate-900 text-slate-500"
                          )}>
                            {isSelected ? "SELECTKBEST ✓" : "PRUNED ✗"}
                          </span>
                        </div>
                      </div>

                      <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                        <div
                          style={{ width: `${barWidth}%` }}
                          className={clsx(
                            "h-full rounded-full transition-all duration-300",
                            isSelected ? "bg-gradient-to-r from-indigo-500 to-cyan-400" : "bg-slate-700"
                          )}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-900/40 text-xs text-slate-300 leading-relaxed">
                <strong>Critical Engineering Observation:</strong> Notice how <span className="font-mono text-cyan-300">RFID Taps</span> and <span className="font-mono text-cyan-300">Optical Pulses</span> rank #1 and #2 right beside each other. Because univariate ranking evaluates features in isolation, both redundant duplicates get picked, wasting two of your {kCount} feature slots!
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* MODE 3: GREEDY CORRELATION DEDUPLICATION                            */}
        {/* ------------------------------------------------------------------- */}
        {studioMode === "dedup" && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-900/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <span className="font-bold text-indigo-300">Greedy Pairwise Correlation Deduplication Arena</span>
                <p className="text-slate-400">
                  Set the collinearity pruning threshold <span className="font-mono text-cyan-300">|r| ≥ θ</span>.
                  When two features have pairwise correlation exceeding this threshold, the greedy algorithm drops the
                  redundant duplicate feature to eliminate multicollinearity.
                </p>
              </div>
              <div className="flex items-center gap-4 bg-slate-950 px-3.5 py-1.5 rounded-xl border border-slate-800 shrink-0">
                <div>
                  <span className="text-[10px] uppercase text-slate-500 block">Clean Features</span>
                  <span className="font-mono font-bold text-emerald-400">
                    {deduplicationResults.retained.length}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-slate-500 block">Pruned Duplicates</span>
                  <span className="font-mono font-bold text-rose-400">
                    {deduplicationResults.droppedCount}
                  </span>
                </div>
              </div>
            </div>

            {/* Threshold Slider */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <span className="text-slate-400 font-semibold">Collinear Drop Cutoff (|r|):</span>
                <input
                  type="range"
                  min="0.70"
                  max="0.99"
                  step="0.01"
                  value={dedupThreshold}
                  onChange={e => setDedupThreshold(Number(e.target.value))}
                  className="w-44 accent-rose-500"
                />
                <span className="font-mono text-rose-400 font-bold text-sm">|r| ≥ {dedupThreshold.toFixed(2)}</span>
              </div>
              <span className="text-[11px] text-slate-500">
                Recommended threshold: 0.85 to 0.90 for industrial pipelines
              </span>
            </div>

            {/* Action Table */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                Deduplication Action Summary
              </h4>

              {deduplicationResults.pairs.length > 0 ? (
                <div className="space-y-3">
                  {deduplicationResults.pairs.map((pair, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/40 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 rounded bg-rose-900 text-rose-200 font-bold text-[10px]">
                            COLLINEAR DUPLICATE DETECTED
                          </span>
                          <span className="font-mono text-slate-300 font-bold">|r| = {pair.r}</span>
                        </div>
                        <p className="text-slate-300">
                          <strong className="text-emerald-400">{pair.kept}</strong> carries the exact same signal as <strong className="text-rose-400">{pair.dropped}</strong>.
                        </p>
                      </div>

                      <div className="shrink-0 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 text-[11px] font-mono">
                        Action: <span className="text-rose-400 font-bold">PRUNED '{pair.dropped}'</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400">
                  No pairs exceed |r| ≥ {dedupThreshold.toFixed(2)}. All features are sufficiently non-collinear.
                </div>
              )}

              <div className="pt-2 text-xs text-slate-400">
                <strong>Retained Clean Subset ({deduplicationResults.retained.length} features):</strong>
                <div className="flex flex-wrap gap-2 pt-2">
                  {deduplicationResults.retained.map(f => (
                    <span key={f.id} className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 font-mono text-[11px]">
                      {f.name}
                    </span>
                  ))}
                </div>
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
            Formal Equations &amp; Statistical Filter Decompositions
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Mathematical formulations for variance cutoffs, One-Way ANOVA F-tests, Pearson Chi-Square, and Multiple Testing FDR control.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          {/* Card 1: Variance & ANOVA F-test */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
            <h4 className="text-sm font-bold text-indigo-300 uppercase tracking-wider">
              1. Variance Thresholding &amp; ANOVA F-Test
            </h4>
            <div className="space-y-3 text-slate-300 leading-relaxed font-mono">
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                <span className="text-emerald-400 font-bold block">Continuous &amp; Bernoulli Variance:</span>
                <span>{"s² = [ 1 / (N - 1) ] ∑ (xᵢ - x̄)²"}</span>
                <span>{"Var(X_binary) = p * (1 - p)"}</span>
                <span className="text-slate-400 text-[11px] font-sans block pt-1">
                  Threshold for 99% quasi-constant: {"θ = 0.99 * 0.01 = 0.0099"}.
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                <span className="text-indigo-400 font-bold block">One-Way ANOVA F-Statistic:</span>
                <span>{"SS_B = ∑ n_k (x̄_k - x̄)²   (df_B = K - 1)"}</span>
                <span>{"SS_W = ∑∑ (x_{ki} - x̄_k)²  (df_W = N - K)"}</span>
                <span>{"F = [ SS_B / (K - 1) ] / [ SS_W / (N - K) ] ~ F_{K-1, N-K}"}</span>
                <span className="text-slate-400 text-[11px] font-sans block pt-1">
                  Measures between-class group separation relative to within-class internal variance.
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Chi-Square & Multiple Testing FDR */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
            <h4 className="text-sm font-bold text-cyan-300 uppercase tracking-wider">
              2. Chi-Square &amp; Multiple Testing Control
            </h4>
            <div className="space-y-3 text-slate-300 leading-relaxed font-mono">
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                <span className="text-cyan-400 font-bold block">Pearson Chi-Square Test (χ²):</span>
                <span>{"E_{ij} = (Row_i * Col_j) / N"}</span>
                <span>{"χ² = ∑∑ [ (O_{ij} - E_{ij})² / E_{ij} ] ~ χ²_{(r-1)(c-1)}"}</span>
                <span className="text-slate-400 text-[11px] font-sans block pt-1">
                  Requires non-negative counts. Measures deviation from statistical independence.
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                <span className="text-purple-400 font-bold block">Benjamini-Hochberg FDR Control:</span>
                <span>{"P_{(k)} ≤ (k / m) * Q"}</span>
                <span className="text-slate-400 text-[11px] font-sans block pt-1">
                  Controls the False Discovery Rate at rate {"Q"} across {"m"} candidate hypothesis tests.
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
            Real enterprise case studies demonstrating basic feature selection pipelines deployed across West Bengal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          {/* Case 1: Kolkata Metro Green Line */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-indigo-300 uppercase tracking-wider">
                Case 1: Metro AFC Gate Telemetry (Sealdah &amp; Howrah)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                Transit Telemetry
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              <strong>Objective:</strong> Automated passenger surge forecasting across 40 gathered edge telemetry fields.
            </p>
            <div className="space-y-1.5 pt-1">
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-rose-400 font-bold">Variance Filter (θ = 0.01):</span> Pruned currency code (all 356) and resident flag (99.5% yes; Var = 0.0049).
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-indigo-400 font-bold">Correlation Deduplication:</span> Optical pulses dropped due to |r| = 0.9997 with RFID taps.
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-emerald-400 font-bold">SelectKBest (ANOVA):</span> Retained top 3 non-collinear features (RFID taps, rainfall, train headway).
              </div>
            </div>
          </div>

          {/* Case 2: WBSEDCL Smart Grid */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-cyan-300 uppercase tracking-wider">
                Case 2: Substation Telemetry Cleansing (Barrackpore)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                Power Grid
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              <strong>Objective:</strong> Pruning 32 smart meter channels to meet cellular edge gateway transmission bandwidth limits.
            </p>
            <div className="space-y-1.5 pt-1">
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-emerald-400 font-bold">Zero-Variance Stripping:</span> 3 fixed firmware configuration register flags dropped instantly.
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-indigo-400 font-bold">CT Deduplication:</span> Secondary Current Transformer CT-2 pruned (|r| = 0.992 with CT-1).
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-cyan-400 font-bold">SelectPercentile (40%):</span> ANOVA F-score selects active kW, kVAR, ambient temp, and THD harmonic distortion.
              </div>
            </div>
          </div>

          {/* Case 3: Siliguri Tea Hyperspectral Assay */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-300 uppercase tracking-wider">
                Case 3: Tea Leaf Hyperspectral Imaging (Siliguri)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                Agritech Spectroscopy
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              <strong>Objective:</strong> Reducing 120 contiguous narrow optical wavelengths (400-1000 nm) to 10 key wavelengths.
            </p>
            <div className="space-y-1.5 pt-1">
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-rose-400 font-bold">Contiguous Collinearity:</span> Neighboring spectral bands (680 vs 682 nm) exhibit |r| &gt; 0.995.
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-amber-400 font-bold">Greedy Deduplication:</span> Collapsed 120 overlapping bands into 26 distinct spectral windows.
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-emerald-400 font-bold">SelectKBest (f_regression):</span> Selected top 8 chlorophyll and theaflavin absorption peaks.
              </div>
            </div>
          </div>

          {/* Case 4: Serampore Jute Mill Machinery */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-purple-300 uppercase tracking-wider">
                Case 4: Jute Spinning Frame Vibration (Serampore)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                Factory Edge IoT
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              <strong>Objective:</strong> Real-time spindle bearing failure detection under strict 20 ms inference latency.
            </p>
            <div className="space-y-1.5 pt-1">
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-emerald-400 font-bold">Scale Awareness:</span> Accelerometer signals scaled before variance testing (preventing deletion).
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-indigo-400 font-bold">Chi-Square Test:</span> Maintenance status categories evaluated for bearing snarl association.
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-purple-400 font-bold">Edge Latency:</span> Reducing 45 raw sensors to 12 optimal features dropped inference time from 180 ms to 14 ms!
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
              Topic 4 Diagnostic Assessment Quiz
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
            Six architectural traps that cause basic feature selection pipelines to delete valid signals or leak data.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-xs">
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-rose-900/30 space-y-2">
            <span className="font-bold text-rose-300 flex items-center gap-2 text-sm">
              <span>📏</span> 1. Unscaled Variance Filtering
            </span>
            <p className="text-slate-400 leading-relaxed">
              Applying VarianceThreshold across features with different physical units (e.g. salary in INR vs age). Variables in small units get deleted regardless of signal.
            </p>
            <span className="text-[11px] text-cyan-400 font-mono block pt-1">Fix: Standardize continuous features before variance thresholding.</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-rose-900/30 space-y-2">
            <span className="font-bold text-rose-300 flex items-center gap-2 text-sm">
              <span>🗂️</span> 2. Data Leakage via Pre-Split Selection
            </span>
            <p className="text-slate-400 leading-relaxed">
              Running ANOVA F-score or SelectKBest on the entire dataset before train/test splitting. Leaks test distribution and creates overly optimistic validation results.
            </p>
            <span className="text-[11px] text-cyan-400 font-mono block pt-1">Fix: Enclose SelectKBest in a Pipeline fitted solely on train folds.</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-rose-900/30 space-y-2">
            <span className="font-bold text-rose-300 flex items-center gap-2 text-sm">
              <span>♊</span> 3. Blind Collinear Redundancy Selection
            </span>
            <p className="text-slate-400 leading-relaxed">
              SelectKBest picks features with top scores independently. If feature 1 and 2 are near-identical, both get picked, wasting slots on duplicate information.
            </p>
            <span className="text-[11px] text-cyan-400 font-mono block pt-1">Fix: Run CorrelationDeduplicator before SelectKBest.</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-rose-900/30 space-y-2">
            <span className="font-bold text-rose-300 flex items-center gap-2 text-sm">
              <span>➖</span> 4. Negative Values in Chi-Square
            </span>
            <p className="text-slate-400 leading-relaxed">
              Passing StandardScaler z-scores into chi2. Standard scaling creates negative values, which violates contingency frequency assumptions and crashes with ValueError.
            </p>
            <span className="text-[11px] text-cyan-400 font-mono block pt-1">Fix: Use MinMaxScaler([0, 1]) or ANOVA F-test for continuous data.</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-rose-900/30 space-y-2">
            <span className="font-bold text-rose-300 flex items-center gap-2 text-sm">
              <span>🩺</span> 5. Deleting Rare Anomaly Indicators
            </span>
            <p className="text-slate-400 leading-relaxed">
              In clinical or fraud datasets, rare indicators appear in only 0.2% of rows (Var = 0.002). VarianceThreshold(0.01) deletes them, wiping out key positive signals!
            </p>
            <span className="text-[11px] text-cyan-400 font-mono block pt-1">Fix: Whitelist rare binary flags from unsupervised variance sieves.</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/70 border border-rose-900/30 space-y-2">
            <span className="font-bold text-rose-300 flex items-center gap-2 text-sm">
              <span>⚡</span> 6. The Univariate XOR Trap
            </span>
            <p className="text-slate-400 leading-relaxed">
              Univariate scoring methods evaluate single features in isolation. Features forming synergistic XOR interactions will have F-score ≈ 0 and will be dropped.
            </p>
            <span className="text-[11px] text-cyan-400 font-mono block pt-1">Fix: Pre-engineer interaction features or use embedded tree models.</span>
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
              Study Notes (topic4_note.txt)
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
              Python Lab (basic_feature_selection_techniques_lab.py)
            </button>
          </div>
        </div>

        {activeTab === "code" ? (
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>File: <code className="text-cyan-300 font-mono">basic_feature_selection_techniques_lab.py</code></span>
              <span>Pure Python 3 • Zero Dependencies • Exit Code 0</span>
            </div>
            <PythonFileLoader
              code={labCode}
              fileName="basic_feature_selection_techniques_lab.py"
              title="Basic Feature Selection Techniques Laboratory Benchmark"
            />
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>File: <code className="text-cyan-300 font-mono">topic4_note.txt</code></span>
              <span>288 Lines of Comprehensive Academic Notes</span>
            </div>
            <PlainTextPrint
              content={noteText}
              fileName="topic4_note.txt"
              title="Topic 4: Academic Study Notes (BCAC701B)"
            />
          </div>
        )}
      </section>

      {/* ===================================================================== */}
      {/* 9. MAKAUT VIVA VOCE EXAMINATION FAQ & TEACHER SIGNATURE               */}
      {/* ===================================================================== */}
      <section id="faq" className="space-y-8">
        <FAQTemplate
          title="Topic 4: MAKAUT Master Viva &amp; Technical Interview Questions"
          subtitle="30 Graded Analytical Questions with Comprehensive Theoretical Rationales"
          questions={questions}
        />

        <Teacher />
      </section>
    </div>
  );
};

export default Topic4;
