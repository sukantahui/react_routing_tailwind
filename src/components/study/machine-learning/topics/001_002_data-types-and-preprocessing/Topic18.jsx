import React, { useState, useId, useMemo } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import labCode from "./topic18_files/encoding_categorical_variables_lab.py?raw";
import noteText from "./topic18_files/topic18_note.txt?raw";
import questions from "./topic18_files/topic18_questions.js";

// -----------------------------------------------------------------------------
// HELPER HASHING & STATISTICAL FUNCTIONS
// -----------------------------------------------------------------------------

function simpleHash(str, buckets) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash) % buckets;
}

// -----------------------------------------------------------------------------
// MAIN MASTERCLASS COMPONENT
// -----------------------------------------------------------------------------

const Topic18 = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const svgId = useId();

  // Studio Mode: "comparator" | "smoothing" | "hashing"
  const [studioMode, setStudioMode] = useState("comparator");

  // Mode A: Strategy Comparator Controls
  const [selectedFeature, setSelectedFeature] = useState("city"); // "city" | "degree" | "pincode"
  const [selectedStrategy, setSelectedStrategy] = useState("ohe_full"); // "ordinal" | "ohe_full" | "ohe_drop" | "freq" | "target"

  // Mode B: Target Smoothing Controls
  const [smoothingM, setSmoothingM] = useState(10); // m in [0, 50]

  // Mode C: Hashing Arena Controls
  const [hashBuckets, setHashBuckets] = useState(6); // B in [2, 16]

  // Jargon Search Query
  const [jargonQuery, setJargonQuery] = useState("");

  // Quiz State
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // ---------------------------------------------------------------------------
  // DATASETS FOR INTERACTIVE STUDIO
  // ---------------------------------------------------------------------------

  // Mode A Datasets
  const featureDatasets = {
    city: {
      name: "West Bengal City Hub (Nominal)",
      type: "Nominal",
      items: [
        { id: 1, name: "Susmita", val: "Barrackpore", salary: 8.5 },
        { id: 2, name: "Debangshu", val: "Salt Lake", salary: 14.0 },
        { id: 3, name: "Mahima", val: "Kolkata", salary: 5.2 },
        { id: 4, name: "Mamata", val: "Barrackpore", salary: 9.2 },
        { id: 5, name: "Abhronila", val: "Kolkata", salary: 15.5 },
        { id: 6, name: "Rohan", val: "Siliguri", salary: 3.8 },
      ],
      categories: ["Barrackpore", "Kolkata", "Salt Lake", "Siliguri"],
      ordinalMap: { "Barrackpore": 0, "Kolkata": 1, "Salt Lake": 2, "Siliguri": 3 },
      targetMeans: { "Barrackpore": 8.85, "Kolkata": 10.35, "Salt Lake": 14.0, "Siliguri": 3.8 },
      globalMean: 9.37,
    },
    degree: {
      name: "Applicant Qualification (Ordinal)",
      type: "Ordinal",
      items: [
        { id: 1, name: "Subhajit", val: "HS", salary: 3.2 },
        { id: 2, name: "Priyanka", val: "BCA", salary: 6.0 },
        { id: 3, name: "Susmita", val: "MCA", salary: 8.5 },
        { id: 4, name: "Debangshu", val: "MTech", salary: 14.0 },
        { id: 5, name: "Sourav", val: "PhD", salary: 22.0 },
        { id: 6, name: "Mahima", val: "BCA", salary: 5.2 },
      ],
      categories: ["HS", "BCA", "MCA", "MTech", "PhD"],
      ordinalMap: { "HS": 0, "BCA": 1, "MCA": 2, "MTech": 3, "PhD": 4 },
      targetMeans: { "HS": 3.2, "BCA": 5.6, "MCA": 8.5, "MTech": 14.0, "PhD": 22.0 },
      globalMean: 9.82,
    },
    pincode: {
      name: "Hyperlocal Pincode (High Cardinality)",
      type: "High-Cardinality",
      items: [
        { id: 1, name: "Dispatch A", val: "700001 (Kolkata GPO)", salary: 11.2 },
        { id: 2, name: "Dispatch B", val: "700091 (Sector V)", salary: 16.5 },
        { id: 3, name: "Dispatch C", val: "743122 (Ichapur)", salary: 6.8 },
        { id: 4, name: "Dispatch D", val: "743127 (Shyamnagar)", salary: 5.5 },
        { id: 5, name: "Dispatch E", val: "734001 (Siliguri)", salary: 4.2 },
        { id: 6, name: "Dispatch F", val: "713201 (Durgapur)", salary: 7.9 },
      ],
      categories: [
        "700001 (Kolkata GPO)",
        "700091 (Sector V)",
        "713201 (Durgapur)",
        "734001 (Siliguri)",
        "743122 (Ichapur)",
        "743127 (Shyamnagar)"
      ],
      ordinalMap: {
        "700001 (Kolkata GPO)": 0,
        "700091 (Sector V)": 1,
        "713201 (Durgapur)": 2,
        "734001 (Siliguri)": 3,
        "743122 (Ichapur)": 4,
        "743127 (Shyamnagar)": 5,
      },
      targetMeans: {
        "700001 (Kolkata GPO)": 11.2,
        "700091 (Sector V)": 16.5,
        "713201 (Durgapur)": 7.9,
        "734001 (Siliguri)": 4.2,
        "743122 (Ichapur)": 6.8,
        "743127 (Shyamnagar)": 5.5,
      },
      globalMean: 8.68,
    },
  };

  // Mode A Computations
  const modeAData = useMemo(() => {
    const ds = featureDatasets[selectedFeature];
    const n = ds.items.length;
    const cats = ds.categories;
    const K = cats.length;

    // Frequencies
    const counts = {};
    ds.items.forEach((it) => {
      counts[it.val] = (counts[it.val] || 0) + 1;
    });

    const encodedRows = ds.items.map((it) => {
      let vec = [];
      let label = "";

      if (selectedStrategy === "ordinal") {
        const code = ds.ordinalMap[it.val] ?? 0;
        vec = [code];
        label = `Rank: ${code}`;
      } else if (selectedStrategy === "ohe_full") {
        vec = cats.map((c) => (c === it.val ? 1 : 0));
        label = `[${vec.join(", ")}]`;
      } else if (selectedStrategy === "ohe_drop") {
        // Drop first category
        const activeCats = cats.slice(1);
        vec = activeCats.map((c) => (c === it.val ? 1 : 0));
        label = `[${vec.join(", ")}]`;
      } else if (selectedStrategy === "freq") {
        const freq = Number((counts[it.val] / n).toFixed(3));
        vec = [freq];
        label = `Freq: ${freq}`;
      } else if (selectedStrategy === "target") {
        const count = counts[it.val] || 1;
        const rawMean = ds.targetMeans[it.val] || ds.globalMean;
        const smoothed = (count * rawMean + 10 * ds.globalMean) / (count + 10);
        vec = [Number(smoothed.toFixed(2))];
        label = `₹${smoothed.toFixed(2)} LPA`;
      }

      return {
        ...it,
        vec,
        label,
      };
    });

    // Sample 0 vs Sample 1 distance
    const v0 = encodedRows[0].vec;
    const v1 = encodedRows[1].vec;
    let dist = 0;
    for (let i = 0; i < v0.length; i++) {
      dist += Math.pow(v0[i] - v1[i], 2);
    }
    const euclidDist = Number(Math.sqrt(dist).toFixed(3));

    // Dimensionality and Sparsity
    const numCols = v0.length;
    let totalZeroes = 0;
    let totalEntries = 0;
    encodedRows.forEach((r) => {
      r.vec.forEach((val) => {
        totalEntries++;
        if (val === 0) totalZeroes++;
      });
    });
    const sparsityPct = Number(((totalZeroes / totalEntries) * 100).toFixed(1));

    return {
      encodedRows,
      numCols,
      sparsityPct,
      sample0: encodedRows[0],
      sample1: encodedRows[1],
      euclidDist,
      cats,
      K,
    };
  }, [selectedFeature, selectedStrategy]);

  // Mode B: Target Smoothing Simulation Data (Micro-Lending in West Bengal)
  const modeBData = useMemo(() => {
    const globalMean = 0.12; // 12% global default rate
    const cohorts = [
      { name: "Salt Lake IT Software", count: 100, rawRate: 0.04 },
      { name: "Barrackpore Govt Service", count: 80, rawRate: 0.02 },
      { name: "Kolkata Retail Trade", count: 40, rawRate: 0.15 },
      { name: "Siliguri Tea Plantation Contractor", count: 8, rawRate: 0.25 },
      { name: "Sundarbans Eco-Artisan (Rare Category)", count: 1, rawRate: 1.0 },
    ];

    const m = smoothingM;
    const results = cohorts.map((c) => {
      const smoothed = (c.count * c.rawRate + m * globalMean) / (c.count + m);
      const shrinkage = Math.abs(c.rawRate - smoothed);
      return {
        ...c,
        smoothedRate: Number((smoothed * 100).toFixed(1)),
        rawRatePct: Number((c.rawRate * 100).toFixed(1)),
        shrinkagePct: Number((shrinkage * 100).toFixed(1)),
      };
    });

    return {
      globalMeanPct: Number((globalMean * 100).toFixed(1)),
      results,
    };
  }, [smoothingM]);

  // Mode C: Hashing Arena Simulation
  const modeCData = useMemo(() => {
    const cities = [
      "Kolkata",
      "Barrackpore",
      "Salt Lake",
      "Siliguri",
      "Ichapur",
      "Shyamnagar",
      "Durgapur",
      "Asansol",
    ];
    const B = hashBuckets;
    const buckets = Array.from({ length: B }, () => []);

    cities.forEach((c) => {
      const bucketIdx = simpleHash(c, B);
      buckets[bucketIdx].push(c);
    });

    let collisions = 0;
    buckets.forEach((items) => {
      if (items.length > 1) {
        collisions += items.length - 1;
      }
    });

    const collisionRate = Number(((collisions / cities.length) * 100).toFixed(1));
    // Theoretical collision probability via Birthday Paradox: 1 - exp(- K^2 / (2B))
    const K = cities.length;
    const theoreticalProb = Number(
      ((1 - Math.exp(-(K * K) / (2 * B))) * 100).toFixed(1)
    );

    return {
      buckets,
      collisions,
      collisionRate,
      theoreticalProb,
      totalItems: cities.length,
      B,
    };
  }, [hashBuckets]);

  // Diagnostic Quiz Questions
  const diagnosticQuestions = [
    {
      id: 1,
      question:
        "Why is applying Scikit-Learn's `LabelEncoder` directly to multi-column nominal feature matrices considered a severe anti-pattern?",
      options: [
        "Because LabelEncoder is designed strictly for 1D target vectors (y); using it on nominal features injects an arbitrary Euclidean metric hierarchy that corrupts linear and distance-based models.",
        "Because LabelEncoder consumes 100x more RAM than OneHotEncoder.",
        "Because LabelEncoder automatically removes missing values without notice.",
        "Because LabelEncoder converts all integers into complex imaginary numbers.",
      ],
      correctIndex: 0,
      explanation:
        "Scikit-Learn documentation explicitly clarifies that LabelEncoder expects a 1D target array (y). When applied to nominal features (like cities or colors), it assigns arbitrary integers (0, 1, 2) that linear models interpret as mathematical magnitudes (2 > 1 > 0), forcing non-existent linear trends and metric distances.",
      practicalTip:
        "Use `OrdinalEncoder` with explicitly calibrated category orders for ordinal features, and `OneHotEncoder` for nominal features.",
    },
    {
      id: 2,
      question:
        "What is the mathematical root cause of the 'Dummy Variable Trap' in Ordinary Least Squares (OLS) regression?",
      options: [
        "The Gram matrix (X^T X) is strictly diagonally dominant and cannot converge.",
        "The sum of all K one-hot indicator columns identically equals the intercept column of 1s, causing perfect multicollinearity and det(X^T X) = 0.",
        "The categorical column contains negative numbers that break the log-likelihood objective.",
        "One-hot encoding triples the condition number without changing matrix rank.",
      ],
      correctIndex: 1,
      explanation:
        "Because every observation belongs to exactly one category, sum_{k=1}^K x_{ik} = 1. This linear combination matches the intercept vector identically, rendering the design matrix rank-deficient (rank K instead of K+1). As a result, det(X^T X) = 0, and the normal equation beta = (X^T X)^(-1) X^T y cannot be solved.",
      practicalTip:
        "Always pass `drop='first'` to `OneHotEncoder` when using unregularized linear regression.",
    },
    {
      id: 3,
      question:
        "How does the M-estimate smoothing formula S_k = (n_k * y_bar_k + m * y_bar_global) / (n_k + m) protect models against rare category overfitting?",
      options: [
        "It forces rare categories to be dropped completely from the training dataset.",
        "It applies L1 lasso regularization directly on the category labels.",
        "As category count n_k approaches zero, the encoded value gracefully reverts to the global dataset mean, preventing single-sample target memorization.",
        "It inverts the categorical distribution using a Fast Fourier Transform.",
      ],
      correctIndex: 2,
      explanation:
        "Naive target encoding sets rare categories with 1 sample to 1.0 or 0.0, allowing decision trees to trivially memorize training targets. Under M-estimate smoothing, when n_k is small (e.g. 1 sample), the term m * y_bar_global dominates the numerator, safely shrinking the encoded estimate toward the empirical population prior.",
      practicalTip:
        "In production pipelines, set m between 10 and 50 to prevent rare categories from dominating gradient updates.",
    },
    {
      id: 4,
      question:
        "Why is Weight of Evidence (WoE) transformation universally preferred in RBI and Basel II/III credit scorecards?",
      options: [
        "It converts category risk directly onto the log-odds scale, linearizing the logit link function in Logistic Regression and providing explainable score points.",
        "It guarantees 100% test accuracy without requiring training labels.",
        "It eliminates the need for cross-validation in banking credit models.",
        "It is the only encoder compatible with deep Convolutional Neural Networks.",
      ],
      correctIndex: 0,
      explanation:
        "WoE is defined as ln((% Good) / (% Bad)), which is the empirical log-odds of good credit behavior. When fed into Logistic Regression, the predictor is on the exact scale of the logit link function, yielding clean linear coefficients (ideally -1.0) and allowing transparent translation into integer scorecard points for regulatory adverse action explanations.",
      practicalTip:
        "Pair WoE with Information Value (IV); reject features with IV < 0.02 and audit features with IV > 0.5 for target leakage.",
    },
    {
      id: 5,
      question:
        "A machine learning engineer notices an API crash with HTTP 500 when a user enters an unlisted postal district. What configuration was missing in OneHotEncoder?",
      options: [
        "sparse_output=False",
        "drop='first'",
        "handle_unknown='ignore'",
        "dtype=np.float32",
      ],
      correctIndex: 2,
      explanation:
        "By default, Scikit-Learn's `OneHotEncoder` sets `handle_unknown='error'`. When an inference request includes a category never seen during training, it raises a ValueError. Setting `handle_unknown='ignore'` assigns an all-zero vector, safely falling back to the model's intercept without crashing.",
      practicalTip:
        "Always specify `handle_unknown='ignore'` when deploying categorical encoders into production serving microservices.",
    },
  ];

  // Jargon Glossary
  const jargonTerms = [
    {
      term: "Categorical Encoding",
      definition:
        "The formal mathematical mapping Phi: C -> R^d that translates qualitative discrete symbols into numerical coordinate vectors suitable for linear algebra and optimization.",
    },
    {
      term: "Nominal Feature",
      definition:
        "A qualitative variable with no intrinsic order (e.g., West Bengal cities, payment modes, blood types). Only equality tests (c_i == c_j) are valid.",
    },
    {
      term: "Ordinal Feature",
      definition:
        "A qualitative variable with a natural, transitive monotonic order (e.g., HS < BCA < MCA < PhD), but without calibrated or equal numerical intervals between levels.",
    },
    {
      term: "High Cardinality",
      definition:
        "A categorical feature with a massive number of unique levels (K > 100 up to 100,000+), such as Indian postal pincodes or product SKUs, where OHE causes memory exhaustion.",
    },
    {
      term: "Dummy Variable Trap",
      definition:
        "A state of perfect multicollinearity occurring in linear regression when all K one-hot indicator columns are included with an intercept, making (X^T X) non-invertible.",
    },
    {
      term: "M-Estimate Smoothing",
      definition:
        "An empirical Bayesian regularization technique for target encoding that shrinks small-sample category averages toward the global population mean: S_k = (n_k y_bar_k + m y_bar_global) / (n_k + m).",
    },
    {
      term: "Weight of Evidence (WoE)",
      definition:
        "A logarithmic transformation used in credit scoring: WoE = ln((% Non-Events) / (% Events)), mapping categorical bins directly onto the linear log-odds scale.",
    },
    {
      term: "Information Value (IV)",
      definition:
        "A statistic measuring the diagnostic predictive power of a categorical variable in binary classification: IV = sum((% Good - % Bad) * WoE).",
    },
    {
      term: "Feature Hashing",
      definition:
        "The 'Hashing Trick' that applies a deterministic hash function modulo B to map unbounded qualitative strings into a fixed-size vector space without a vocabulary dictionary.",
    },
    {
      term: "Out-of-Fold (OOF) Encoding",
      definition:
        "A cross-validation target encoding architecture where each observation's encoded value is calculated strictly using out-of-fold partitions, eliminating target leakage.",
    },
  ];

  const filteredJargon = useMemo(() => {
    if (!jargonQuery.trim()) return jargonTerms;
    const q = jargonQuery.toLowerCase();
    return jargonTerms.filter(
      (j) => j.term.toLowerCase().includes(q) || j.definition.toLowerCase().includes(q)
    );
  }, [jargonQuery]);

  const quizScore = useMemo(() => {
    let score = 0;
    diagnosticQuestions.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correctIndex) score++;
    });
    return score;
  }, [quizAnswers]);

  return (
    <div className="space-y-12 text-slate-200 leading-relaxed max-w-6xl mx-auto pb-16 px-4 sm:px-6">
      {/* ----------------------------------------------------------------- */}
      {/* HERO SECTION */}
      {/* ----------------------------------------------------------------- */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 sm:p-10 rounded-3xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              BCAC701B • Data Types and Preprocessing • Topic 18
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Masterclass Standard
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Pure Python Lab Verified
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Encoding Categorical Variables: Taxonomy, Geometry &amp; Leakage Architecture
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-4xl leading-relaxed">
            Machine learning algorithms compute inner products, Euclidean distances, and hyperplane splits that are mathematically undefined over raw strings. Master the formal mathematical taxonomy from Nominal and Ordinal to High-Cardinality spaces. Uncover why Label Encoding on nominal data creates false metric distances, explore One-Hot orthogonal basis vectors, eliminate the Dummy Variable Trap, master M-estimate Target Encoding with K-Fold leakage protection, and harness the Hashing Trick for massive West Bengal industrial scale.
          </p>

          {/* Quick Jump Navigation */}
          <div className="pt-4 border-t border-indigo-900/50">
            <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider block mb-2">
              Curriculum Roadmap Jump Navigation:
            </span>
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                { id: "#novice", label: "1. Novice Masterclass" },
                { id: "#taxonomy", label: "2. Taxonomy & Jargon" },
                { id: "#studio", label: "3. Interactive Studio" },
                { id: "#math", label: "4. Mathematical Formulations" },
                { id: "#cases", label: "5. Regional Cases" },
                { id: "#pitfalls", label: "6. Production Pitfalls" },
                { id: "#quiz", label: "7. Diagnostic Quiz" },
                { id: "#handbook", label: "8. Academic Notes" },
                { id: "#lab", label: "9. Python Lab" },
                { id: "#teacher", label: "10. Teacher Guidance" },
              ].map((item) => (
                <a
                  key={item.id}
                  href={item.id}
                  className="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-indigo-600 text-slate-300 hover:text-white border border-slate-700/60 transition-all font-medium"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ----------------------------------------------------------------- */}
      {/* SECTION 1: NOVICE MASTERCLASS & MENTAL MODELS */}
      {/* ----------------------------------------------------------------- */}
      <section id="novice" className="space-y-8">
        <div className="border-b border-slate-800 pb-3">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
            Foundational Pedagogy
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            1. Novice Masterclass: Intuitive Mental Models
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* METAPHOR 1 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-indigo-900/40 shadow-xl space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-2xl">
                🌐
              </div>
              <h3 className="text-base font-bold text-white">
                Metaphor 1: The Diplomatic Translator
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Machine learning models are like international delegates who strictly speak the language of numbers and coordinates. Strings like &apos;Barrackpore&apos; or &apos;Salt Lake&apos; are foreign dialects. The categorical encoder is the official diplomatic translator that translates qualitative words into numerical coordinates without corrupting or falsifying the underlying meaning.
              </p>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-indigo-300 font-mono">
              Phi(&quot;Barrackpore&quot;) -&gt; [1.0, 0.0, 0.0]
            </div>
          </div>

          {/* METAPHOR 2 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-cyan-900/40 shadow-xl space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-2xl">
                🎨
              </div>
              <h3 className="text-base font-bold text-white">
                Metaphor 2: The Color Palette vs The Staircase
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Assigning numbers 0, 1, 2 to Red, Green, Blue forces an artificial staircase where Blue &gt; Green &gt; Red, just like asserting Siliguri &gt; Kolkata &gt; Barrackpore. Ordinal features (BCA &lt; MCA &lt; PhD) already have a natural elevation staircase; nominal features are like colors on an artist&apos;s palette—each needs its own independent axis!
              </p>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-cyan-300 font-mono">
              Colors = Orthogonal Axes (OHE) | Degrees = Natural Stairs
            </div>
          </div>

          {/* METAPHOR 3 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-emerald-900/40 shadow-xl space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-2xl">
                📦
              </div>
              <h3 className="text-base font-bold text-white">
                Metaphor 3: The Address Book vs Hashing Locker
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                When an e-commerce platform has 2,500 postal pincodes, giving each pincode its own personal warehouse room (One-Hot) crashes the computer&apos;s RAM. Feature Hashing and Target Encoding act like numbered parcel lockers: they compress thousands of unique addresses into a compact, fixed-size shelf while preserving critical delivery signals.
              </p>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-emerald-300 font-mono">
              2,500 Pincodes -&gt; B=16 Hashed Buckets
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* SECTION 2: CATEGORICAL TAXONOMY & JARGON BUSTER */}
      {/* ----------------------------------------------------------------- */}
      <section id="taxonomy" className="space-y-8">
        <div className="border-b border-slate-800 pb-3">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
            Architectural Classification
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            2. Formal Categorical Taxonomy &amp; Jargon Buster
          </h2>
        </div>

        {/* TAXONOMY TABLE */}
        <div className="overflow-x-auto rounded-2xl border border-slate-800 shadow-xl">
          <table className="w-full text-xs text-left text-slate-300 bg-slate-900/90">
            <thead className="bg-slate-950 text-indigo-300 uppercase tracking-wider text-[11px] border-b border-slate-800">
              <tr>
                <th className="p-4">Taxonomy Class</th>
                <th className="p-4">Mathematical Property</th>
                <th className="p-4">West Bengal Examples</th>
                <th className="p-4">Recommended Encoding</th>
                <th className="p-4">Dangerous Anti-Pattern</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="p-4 font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  Nominal
                </td>
                <td className="p-4">No ordering. Only equality (c_i == c_j) holds.</td>
                <td className="p-4">City (Barrackpore, Kolkata), Payment Mode, Blood Group</td>
                <td className="p-4 text-emerald-400 font-semibold">One-Hot Encoding (drop_first if linear)</td>
                <td className="p-4 text-rose-400">Arbitrary Integer / Label Encoding</td>
              </tr>
              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="p-4 font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-400" />
                  Ordinal
                </td>
                <td className="p-4">Strict monotonic order (c_1 &lt; c_2 &lt; c_3); unequal gaps.</td>
                <td className="p-4">Degree (BCA &lt; MCA &lt; PhD), Risk Tier, Survey Rating</td>
                <td className="p-4 text-emerald-400 font-semibold">OrdinalEncoder(categories=calibrated_ranks)</td>
                <td className="p-4 text-rose-400">Alphabetical LabelEncoder (BCA=0, MCA=2, PhD=3)</td>
              </tr>
              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="p-4 font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  Binary
                </td>
                <td className="p-4">Exactly two states (K = 2).</td>
                <td className="p-4">Loan Default (Yes/No), Subscription Active (True/False)</td>
                <td className="p-4 text-emerald-400 font-semibold">Single Indicator Column {`{0, 1}`}</td>
                <td className="p-4 text-rose-400">Two redundant one-hot columns</td>
              </tr>
              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="p-4 font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  Cyclic
                </td>
                <td className="p-4">Periodic boundary wrap-around (t_max is adjacent to t_0).</td>
                <td className="p-4">Hour of Day (0..23), Day of Week, Month of Year</td>
                <td className="p-4 text-emerald-400 font-semibold">Sin/Cos Projection: [sin(2pi t/T), cos(2pi t/T)]</td>
                <td className="p-4 text-rose-400">Integer 0..23 (makes 23:00 and 00:00 maximally far)</td>
              </tr>
              <tr className="hover:bg-slate-800/40 transition-colors">
                <td className="p-4 font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-400" />
                  High-Cardinality
                </td>
                <td className="p-4">Massive level count (K &gt; 100 up to 100,000+).</td>
                <td className="p-4">Postal Pincodes (700001, 743122), User IDs, Product SKUs</td>
                <td className="p-4 text-emerald-400 font-semibold">M-estimate Target Enc, WoE, Feature Hashing</td>
                <td className="p-4 text-rose-400">Dense One-Hot Encoding (RAM exhaustion / OOM)</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* JARGON BUSTER */}
        <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white">Engineering Jargon Buster</h3>
              <p className="text-xs text-slate-400">
                Filter key academic and industrial terms for quick revision
              </p>
            </div>
            <input
              type="text"
              placeholder="Search terms (e.g. OOF, Dummy Trap, WoE)..."
              value={jargonQuery}
              onChange={(e) => setJargonQuery(e.target.value)}
              className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500 w-full sm:w-64"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {filteredJargon.map((j) => (
              <div key={j.term} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-xs font-bold text-indigo-300">{j.term}</span>
                <p className="text-xs text-slate-300 leading-relaxed">{j.definition}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* SECTION 3: INTERACTIVE STUDIO */}
      {/* ----------------------------------------------------------------- */}
      <section id="studio" className="space-y-8">
        <div className="border-b border-slate-800 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              Simulation Sandbox
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              3. Interactive Categorical Encoding Laboratory Studio
            </h2>
          </div>

          {/* STUDIO MODE TABS */}
          <div className="flex gap-2">
            {[
              { id: "comparator", label: "Mode A: Strategy Comparator" },
              { id: "smoothing", label: "Mode B: Target Smoothing" },
              { id: "hashing", label: "Mode C: Hashing Arena" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStudioMode(tab.id)}
                className={clsx(
                  "px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer",
                  studioMode === tab.id
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400"
                    : "bg-slate-800 text-slate-400 hover:text-white border border-slate-700"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* --------------------------------------------------------------- */}
        {/* STUDIO MODE A: STRATEGY COMPARATOR & VECTOR GEOMETRY */}
        {/* --------------------------------------------------------------- */}
        {studioMode === "comparator" && (
          <div className="bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-indigo-900/40 shadow-2xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-cyan-400">📐</span> Encoding Strategy Matrix &amp; Vector Geometry
                </h3>
                <p className="text-xs text-slate-400">
                  Observe how different encoders transform qualitative tokens into numerical coordinate spaces
                </p>
              </div>

              {/* CONTROLS */}
              <div className="flex flex-wrap gap-2">
                <select
                  value={selectedFeature}
                  onChange={(e) => setSelectedFeature(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  <option value="city">Feature: West Bengal City (Nominal)</option>
                  <option value="degree">Feature: Education Degree (Ordinal)</option>
                  <option value="pincode">Feature: Postal Pincode (High Cardinality)</option>
                </select>

                <select
                  value={selectedStrategy}
                  onChange={(e) => setSelectedStrategy(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-slate-950 border border-indigo-700 text-xs text-indigo-300 font-semibold focus:outline-none focus:border-indigo-400 cursor-pointer"
                >
                  <option value="ordinal">Label / Ordinal Encoding</option>
                  <option value="ohe_full">One-Hot Encoding (drop_first=False)</option>
                  <option value="ohe_drop">One-Hot Encoding (drop_first=True)</option>
                  <option value="freq">Frequency / Count Encoding</option>
                  <option value="target">Smoothed Target Encoding (M-estimate)</option>
                </select>
              </div>
            </div>

            {/* METRICS ROW */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500">Feature Typology</span>
                <div className="text-sm font-bold text-white">{featureDatasets[selectedFeature].type}</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500">Output Dimensions</span>
                <div className="text-sm font-bold font-mono text-cyan-400">{modeAData.numCols} Columns</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500">Matrix Sparsity</span>
                <div className="text-sm font-bold font-mono text-indigo-400">{modeAData.sparsityPct}% Zeros</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500">Sample 0 vs 1 Distance</span>
                <div className="text-sm font-bold font-mono text-emerald-400">||d|| = {modeAData.euclidDist}</div>
              </div>
            </div>

            {/* ENCODED SAMPLES TABLE */}
            <div className="overflow-x-auto rounded-2xl border border-slate-800">
              <table className="w-full text-xs text-left text-slate-300 bg-slate-950/60">
                <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="p-3">Sample ID</th>
                    <th className="p-3">Candidate / Record</th>
                    <th className="p-3">Raw Categorical Value</th>
                    <th className="p-3">Target (CTC LPA)</th>
                    <th className="p-3">Encoded Numeric Vector (Phi(x))</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono">
                  {modeAData.encodedRows.map((r, idx) => (
                    <tr key={r.id} className={idx < 2 ? "bg-indigo-950/20" : ""}>
                      <td className="p-3 text-slate-400">#{r.id}</td>
                      <td className="p-3 font-sans font-bold text-white">{r.name}</td>
                      <td className="p-3 text-cyan-300">{r.val}</td>
                      <td className="p-3 text-emerald-400">₹{r.salary.toFixed(1)} LPA</td>
                      <td className="p-3 text-indigo-300 font-bold">{r.label}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* METRIC DISTANCE AUDIT NOTE */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-2">
              <span className="text-indigo-400 font-bold uppercase text-[10px] tracking-wider block">
                Geometric Metric Interpretation:
              </span>
              {selectedStrategy === "ordinal" && (
                <p>
                  ⚠️ <strong>Artificial Distance Trap:</strong> In Ordinal Encoding, the distance between {modeAData.sample0.name} ({modeAData.sample0.val}) and {modeAData.sample1.name} ({modeAData.sample1.val}) is calculated as <strong>||d|| = {modeAData.euclidDist}</strong>. For nominal data, this imposes an arbitrary alphabetical distance that biases linear and distance models!
                </p>
              )}
              {selectedStrategy === "ohe_full" && (
                <p>
                  ✔ <strong>Orthogonal Equidistance:</strong> Under full One-Hot Encoding, distinct categories have an inner product of 0 and a strictly uniform Euclidean distance of <strong>||d|| = sqrt(2) approx 1.414</strong>. No category is artificially closer to another in feature space!
                </p>
              )}
              {selectedStrategy === "ohe_drop" && (
                <p>
                  ✔ <strong>Dummy Trap Avoidance:</strong> One reference category was dropped. The intercept captures the reference category baseline, eliminating perfect multicollinearity and making (X^T X) safely invertible.
                </p>
              )}
              {selectedStrategy === "freq" && (
                <p>
                  ℹ️ <strong>Frequency Alignment:</strong> Categories are mapped to their occurrence probability. Risk: If two distinct categories appear the exact same number of times, their Euclidean distance collapses to <strong>0.000</strong> (frequency collision)!
                </p>
              )}
              {selectedStrategy === "target" && (
                <p>
                  ⭐ <strong>Target Aligned Manifold:</strong> Each category is encoded by its smoothed expected target LPA. Gradient descent can split directly on expected economic value, maximizing signal for tree models and linear regressors.
                </p>
              )}
            </div>
          </div>
        )}

        {/* --------------------------------------------------------------- */}
        {/* STUDIO MODE B: TARGET SMOOTHING & LEAKAGE PLAYGROUND */}
        {/* --------------------------------------------------------------- */}
        {studioMode === "smoothing" && (
          <div className="bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-indigo-900/40 shadow-2xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-emerald-400">🛡️</span> M-Estimate Target Smoothing &amp; Prior Shrinkage
                </h3>
                <p className="text-xs text-slate-400">
                  Simulating West Bengal micro-lending default rates across frequent and rare applicant segments
                </p>
              </div>

              {/* SLIDER FOR M */}
              <div className="flex items-center gap-3 bg-slate-950 p-2.5 rounded-2xl border border-slate-800">
                <span className="text-xs font-bold text-indigo-300">Smoothing Weight m:</span>
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="1"
                  value={smoothingM}
                  onChange={(e) => setSmoothingM(Number(e.target.value))}
                  className="w-32 accent-indigo-500 cursor-pointer"
                />
                <span className="text-xs font-mono font-bold text-white w-8 text-right">
                  {smoothingM}
                </span>
              </div>
            </div>

            <div className="p-3 bg-indigo-950/40 rounded-xl border border-indigo-800/40 text-xs text-indigo-200">
              <strong>Global Baseline Default Rate:</strong> {modeBData.globalMeanPct}% (Across all training loans)
            </div>

            {/* RESULTS TABLE */}
            <div className="overflow-x-auto rounded-2xl border border-slate-800">
              <table className="w-full text-xs text-left text-slate-300 bg-slate-950/60">
                <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="p-3">Borrower Category</th>
                    <th className="p-3">Applicant Count (n)</th>
                    <th className="p-3">Raw Empirical Default Rate</th>
                    <th className="p-3">Smoothed Encoded Feature Value</th>
                    <th className="p-3">Bayesian Shrinkage Effect</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono">
                  {modeBData.results.map((row) => (
                    <tr
                      key={row.name}
                      className={row.count === 1 ? "bg-amber-950/20" : "hover:bg-slate-800/30"}
                    >
                      <td className="p-3 font-sans font-bold text-white">{row.name}</td>
                      <td className="p-3 text-cyan-400">{row.count} applicants</td>
                      <td className="p-3 text-rose-400">{row.rawRatePct}%</td>
                      <td className="p-3 text-emerald-400 font-bold">{row.smoothedRate}%</td>
                      <td className="p-3 font-sans text-xs">
                        {row.count === 1 ? (
                          <span className="text-amber-300 font-semibold">
                            ⚠️ Rare Category Shrunk {row.shrinkagePct}% towards Global Prior!
                          </span>
                        ) : (
                          <span className="text-slate-400">High Confidence (n={row.count})</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
              <p>
                <strong>Mathematical Mechanism:</strong> At <code>m = 0</code>, the rare Eco-Artisan (1 applicant who defaulted) receives an encoded default rate of <strong>100%</strong>. A decision tree would immediately memorize this borrower as a guaranteed default. By raising <code>m = {smoothingM}</code>, the encoded risk is smoothly shrunk down to <strong>{modeBData.results[4].smoothedRate}%</strong>, safely grounding the prediction in the global population average while preserving empirical distinction for large sample cohorts!
              </p>
            </div>
          </div>
        )}

        {/* --------------------------------------------------------------- */}
        {/* STUDIO MODE C: HIGH-CARDINALITY HASHING ARENA */}
        {/* --------------------------------------------------------------- */}
        {studioMode === "hashing" && (
          <div className="bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-indigo-900/40 shadow-2xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-purple-400">⚡</span> The Hashing Trick: Fixed Dimension Bucket Allocation
                </h3>
                <p className="text-xs text-slate-400">
                  Simulating MurmurHash / MD5 feature hashing on West Bengal delivery hubs without an in-memory dictionary
                </p>
              </div>

              {/* SLIDER FOR BUCKETS */}
              <div className="flex items-center gap-3 bg-slate-950 p-2.5 rounded-2xl border border-slate-800">
                <span className="text-xs font-bold text-indigo-300">Hash Buckets B:</span>
                <input
                  type="range"
                  min="2"
                  max="16"
                  step="1"
                  value={hashBuckets}
                  onChange={(e) => setHashBuckets(Number(e.target.value))}
                  className="w-32 accent-purple-500 cursor-pointer"
                />
                <span className="text-xs font-mono font-bold text-white w-8 text-right">
                  {hashBuckets}
                </span>
              </div>
            </div>

            {/* METRICS ROW */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500">Total Entities</span>
                <div className="text-sm font-bold text-white">{modeCData.totalItems} Hubs</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500">Allocated Buckets (B)</span>
                <div className="text-sm font-bold font-mono text-purple-400">{modeCData.B} Features</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500">Detected Collisions</span>
                <div className={clsx("text-sm font-bold font-mono", modeCData.collisions > 0 ? "text-rose-400" : "text-emerald-400")}>
                  {modeCData.collisions} Collisions
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500">Birthday Collision Prob</span>
                <div className="text-sm font-bold font-mono text-amber-400">{modeCData.theoreticalProb}%</div>
              </div>
            </div>

            {/* BUCKET GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {modeCData.buckets.map((items, bIdx) => (
                <div
                  key={bIdx}
                  className={clsx(
                    "p-4 rounded-2xl border transition-all space-y-2",
                    items.length > 1
                      ? "bg-rose-950/20 border-rose-800/60 shadow-lg shadow-rose-950/20"
                      : items.length === 1
                      ? "bg-slate-950 border-slate-800"
                      : "bg-slate-950/40 border-slate-800/40 opacity-60"
                  )}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="font-bold text-indigo-300">Bucket #{bIdx}</span>
                    <span
                      className={clsx(
                        "px-2 py-0.5 rounded-full text-[10px] font-bold",
                        items.length > 1
                          ? "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                          : items.length === 1
                          ? "bg-emerald-500/20 text-emerald-300"
                          : "text-slate-600"
                      )}
                    >
                      {items.length > 1 ? "Collision!" : items.length === 1 ? "Unique" : "Empty"}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs">
                    {items.length === 0 ? (
                      <span className="text-slate-600 italic">No items mapped</span>
                    ) : (
                      items.map((it) => (
                        <div key={it} className="font-bold text-white flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                          {it}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
              <p>
                <strong>The Birthday Paradox in Production:</strong> Notice how even with {modeCData.B} buckets for only 8 cities, the collision probability is <strong>{modeCData.theoreticalProb}%</strong>! In streaming systems, signed hashing (multiplying by {-1, +1}) guarantees that collisions cancel out in expectation (zero-mean variance), allowing high-throughput models like Vowpal Wabbit to operate at extreme scale with zero RAM vocabulary lookups.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* SECTION 4: MATHEMATICAL FORMULATIONS */}
      {/* ----------------------------------------------------------------- */}
      <section id="math" className="space-y-8">
        <div className="border-b border-slate-800 pb-3">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
            Formal Foundations
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            4. Comprehensive Mathematical Formulations
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* FORMULATION 1: ONE HOT BASIS & ORTHOGONALITY */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                Basis Vector Geometry
              </span>
              <span className="text-xs font-mono text-slate-500">R^K Orthogonal Basis</span>
            </div>
            <h3 className="text-base font-bold text-white">One-Hot Geometry &amp; Equidistance</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every distinct category c_k is mapped to a standard basis vector e_k in R^K. For any two distinct categories c_i != c_j:
            </p>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300 space-y-1">
              <div>Inner Product: &lt;e_i, e_j&gt; = 0  (Strict Orthogonality)</div>
              <div>Euclidean Distance: ||e_i - e_j||_2 = sqrt(1^2 + (-1)^2) = sqrt(2)</div>
              <div>Cosine Similarity: cos(theta) = 0.0</div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              This geometric symmetry eliminates any arbitrary metric proximity, treating every nominal entity as equally distinct.
            </p>
          </div>

          {/* FORMULATION 2: DUMMY VARIABLE TRAP */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                Linear Dependency Proof
              </span>
              <span className="text-xs font-mono text-slate-500">Rank Deficiency</span>
            </div>
            <h3 className="text-base font-bold text-white">The Dummy Variable Trap</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              When all K one-hot indicator columns are included alongside an intercept beta_0:
            </p>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-rose-300 space-y-1">
              <div>x_intercept = sum_{`{k=1}`}^K x_k = 1  (Perfect Collinearity)</div>
              <div>det(X^T X) = 0  (Singular Gram Matrix)</div>
              <div>beta_hat = (X^T X)^(-1) X^T y  --&gt; UNDEFINED / FAILS</div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dropping one reference category restores full column rank K, allowing unique OLS solution calculation.
            </p>
          </div>

          {/* FORMULATION 3: M-ESTIMATE TARGET ENCODING */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Empirical Bayesian Shrinkage
              </span>
              <span className="text-xs font-mono text-slate-500">Micci-Barreca / M-Estimate</span>
            </div>
            <h3 className="text-base font-bold text-white">Smoothed Target Encoding Equation</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Combines category empirical target average with global prior to prevent rare-category memorization:
            </p>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 space-y-1">
              <div>S_k = (n_k * y_bar_k + m * y_bar_global) / (n_k + m)</div>
              <div>lambda(n_k) = n_k / (n_k + m)</div>
              <div>lim_{`{n_k -> inf}`} S_k = y_bar_k  |  lim_{`{n_k -> 0}`} S_k = y_bar_global</div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Where n_k is category sample count, y_bar_k is category sample mean, and m is the smoothing pseudo-count.
            </p>
          </div>

          {/* FORMULATION 4: WEIGHT OF EVIDENCE & IV */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Basel II / III Banking Compliance
              </span>
              <span className="text-xs font-mono text-slate-500">Logit Linearization</span>
            </div>
            <h3 className="text-base font-bold text-white">Weight of Evidence (WoE) &amp; Information Value</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Transforms categorical bins into log-odds of good credit outcomes:
            </p>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-amber-300 space-y-1">
              <div>WoE_k = ln( (n_{`{k,0}`} / N_0) / (n_{`{k,1}`} / N_1) )</div>
              <div>IV = sum_{`{k=1}`}^K [ (n_{`{k,0}`} / N_0) - (n_{`{k,1}`} / N_1) ] * WoE_k</div>
              <div>Rule: IV &lt; 0.02 (Drop) | 0.3 - 0.5 (Strong) | &gt; 0.5 (Leakage Risk)</div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Directly linearizes the logistic regression link function, producing explainable credit scorecards.
            </p>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* SECTION 5: REGIONAL INDUSTRIAL CASE STUDIES */}
      {/* ----------------------------------------------------------------- */}
      <section id="cases" className="space-y-8">
        <div className="border-b border-slate-800 pb-3">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
            Industrial Grounding
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            5. Real-World Regional Industrial Case Studies (West Bengal)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CASE 1 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-indigo-900/40 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 rounded-full border border-indigo-500/40">
                Tech Staffing Engine
              </span>
              <span className="text-xs text-slate-400">Barrackpore &amp; Salt Lake Sector V</span>
            </div>
            <h3 className="text-base font-bold text-white">
              Resume Screening Engine: College vs Tech Stack Encoding
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Susmita and Debangshu built an AI resume evaluator for Kolkata IT staffing agencies. The dataset had candidate qualifications (BCA &lt; MCA &lt; MTech), undergraduate colleges (MAKAUT, Jadavpur, Kalyani Govt Engg, Heritage, Techno India), and primary programming languages. They applied calibrated Ordinal Encoding to degrees, One-Hot Encoding (drop_first=True) to primary skills, and Smoothed Target Encoding (m=10) to regional engineering colleges, avoiding false metric rankings while preventing small suburban institutes from overfitting.
            </p>
          </div>

          {/* CASE 2 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-cyan-900/40 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-500/40">
                FinTech Micro-Lending
              </span>
              <span className="text-xs text-slate-400">Salt Lake Sector V, Kolkata</span>
            </div>
            <h3 className="text-base font-bold text-white">
              Borrower Occupation &amp; Weight of Evidence (WoE) Scorecards
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Mamata spearheaded underwriting risk at a Kolkata-based NBFC. The applicant dataset held &apos;Borrower Occupation&apos; (Govt Employee, IT Professional, Retail Shop Owner, Daily Wage Earner). Applying Weight of Evidence (WoE) transformation directly linearized the logistic log-odds (WoE_Govt = +1.91, WoE_DailyWage = -2.48). Information Value (IV) was calculated at 0.38, confirming prime predictive power while meeting Reserve Bank of India (RBI) adverse-action audit explainability requirements.
            </p>
          </div>

          {/* CASE 3 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-emerald-900/40 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/40">
                Hyperlocal Logistics
              </span>
              <span className="text-xs text-slate-400">Ichapur &amp; Shyamnagar Suburban Hubs</span>
            </div>
            <h3 className="text-base font-bold text-white">
              E-Commerce Pincode Routing: Defeating OOM with Feature Hashing
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Mahima manages supply chain dispatch for an online grocery aggregator operating across North 24 Parganas and Hooghly. The &apos;Delivery Pincode&apos; feature had 2,400 distinct levels. Generating dense one-hot vectors across 500,000 daily orders created a 1.2 billion-element matrix requiring 9.6 GB RAM, repeatedly triggering Out-Of-Memory (OOM) pod crashes. Mahima migrated to Feature Hashing with B=64 buckets, dropping memory to 256 MB while effortlessly routing new postal sub-branches without model retraining.
            </p>
          </div>

          {/* CASE 4 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-rose-900/40 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 rounded-full border border-rose-500/40">
                Diagnostic Oncology
              </span>
              <span className="text-xs text-slate-400">Jadavpur Medical Research Hub</span>
            </div>
            <h3 className="text-base font-bold text-white">
              Blood Group LabelEncoding Disaster in Colorectal Cancer Survival
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Abhronila audited a colorectal cancer recurrence model developed by a junior researcher. The intern had run Scikit-Learn&apos;s `LabelEncoder` on patient blood groups (A=0, AB=1, B=2, O=3). A Cox survival model assigned a positive hazard coefficient beta = +0.42 to Blood Group, falsely claiming that Blood Group O patients suffered 3x worse cancer mortality purely because of alphabetical indexing! Abhronila replaced it with One-Hot Encoding, proving blood group had zero biological correlation with recurrence.
            </p>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* SECTION 6: CRITICAL PRODUCTION PITFALLS */}
      {/* ----------------------------------------------------------------- */}
      <section id="pitfalls" className="space-y-8">
        <div className="border-b border-slate-800 pb-3">
          <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
            Defensive Architecture
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            6. Critical Production Pitfalls &amp; Anti-Patterns
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-slate-900/90 p-5 rounded-2xl border border-rose-900/40 space-y-3">
            <div className="text-rose-400 font-bold text-xs flex items-center gap-2">
              <span>⚠️</span> Pitfall 1: LabelEncoder on Input Features
            </div>
            <h4 className="text-sm font-bold text-white">Misusing Target Encoder on X</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              `LabelEncoder` is strictly designed for 1D target arrays (y). Passing multi-column features X injects an artificial numeric hierarchy into nominal categories. For features, always use `OrdinalEncoder` or `OneHotEncoder`.
            </p>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-rose-900/40 space-y-3">
            <div className="text-rose-400 font-bold text-xs flex items-center gap-2">
              <span>⚠️</span> Pitfall 2: In-Sample Target Leakage
            </div>
            <h4 className="text-sm font-bold text-white">Fitting Target Encoder Pre-Split</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Fitting a target encoder on the whole dataset before train_test_split leaks validation targets into training representations. Model achieves 0.98 ROC-AUC offline but collapses to 0.55 in live production. Use Out-of-Fold encoding!
            </p>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-rose-900/40 space-y-3">
            <div className="text-rose-400 font-bold text-xs flex items-center gap-2">
              <span>⚠️</span> Pitfall 3: Unseen Cold-Start Categories
            </div>
            <h4 className="text-sm font-bold text-white">Crashing Live Inference APIs</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Default `handle_unknown=&apos;error&apos;` throws a ValueError on novel categories in live production requests. Always configure `handle_unknown=&apos;ignore&apos;` to assign all zeros safely to unseen levels.
            </p>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-amber-900/40 space-y-3">
            <div className="text-amber-400 font-bold text-xs flex items-center gap-2">
              <span>⚠️</span> Pitfall 4: RAM Exhaustion from Dense OHE
            </div>
            <h4 className="text-sm font-bold text-white">Ignoring Scipy CSR Sparsity</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              One-hot encoding 1,000 categories across 100,000 rows as a dense float array consumes 800 MB RAM. A Scipy CSR sparse matrix stores only non-zero coordinates, consuming just 3.2 MB (a 99.6% RAM saving).
            </p>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-amber-900/40 space-y-3">
            <div className="text-amber-400 font-bold text-xs flex items-center gap-2">
              <span>⚠️</span> Pitfall 5: Multicollinearity in OLS
            </div>
            <h4 className="text-sm font-bold text-white">The Full OHE Dummy Trap</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Feeding all K one-hot columns into unregularized linear regression causes singular Gram matrix inversion (det=0). Set `drop=&apos;first&apos;` so the intercept serves as the reference category baseline.
            </p>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-cyan-900/40 space-y-3">
            <div className="text-cyan-400 font-bold text-xs flex items-center gap-2">
              <span>💡</span> Production Rule: Cyclic Boundaries
            </div>
            <h4 className="text-sm font-bold text-white">Sinusoidal Circle Encoding</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Never encode hours (0..23) or months (1..12) as scalar integers. Project them onto the 2D unit circle using [sin(2pi t/T), cos(2pi t/T)] so that 23:00 and 00:00 remain smoothly adjacent in Euclidean space.
            </p>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* SECTION 7: DIAGNOSTIC ASSESSMENT QUIZ */}
      {/* ----------------------------------------------------------------- */}
      <section id="quiz" className="space-y-8">
        <div className="border-b border-slate-800 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              Knowledge Verification
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              7. Diagnostic Assessment: Categorical Encoding Mastery
            </h2>
          </div>
          {quizSubmitted && (
            <div className="px-4 py-2 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs font-bold">
              Score: {quizScore} / {diagnosticQuestions.length} ({Math.round((quizScore / diagnosticQuestions.length) * 100)}%)
            </div>
          )}
        </div>

        <div className="space-y-6">
          {diagnosticQuestions.map((q, idx) => (
            <div
              key={q.id}
              className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-sm font-bold text-white leading-relaxed">
                  <span className="text-indigo-400 mr-2">Q{idx + 1}.</span>
                  {q.question}
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-2 pt-2">
                {q.options.map((opt, optIdx) => {
                  const isSelected = quizAnswers[idx] === optIdx;
                  const isCorrect = optIdx === q.correctIndex;

                  let btnStyle = "bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300";
                  if (quizSubmitted) {
                    if (isCorrect) {
                      btnStyle = "bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold";
                    } else if (isSelected && !isCorrect) {
                      btnStyle = "bg-rose-950/60 border-rose-500 text-rose-200";
                    }
                  } else if (isSelected) {
                    btnStyle = "bg-indigo-950/80 border-indigo-500 text-white font-medium";
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={quizSubmitted}
                      onClick={() => setQuizAnswers({ ...quizAnswers, [idx]: optIdx })}
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
      {/* SECTION 8: ACADEMIC REVISION NOTES & VIVA HANDBOOK */}
      {/* ----------------------------------------------------------------- */}
      <section id="handbook" className="space-y-6">
        <div className="border-b border-slate-800 pb-3">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
            Academic Reference
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            8. Academic Revision Handbook &amp; Viva Voce Q&amp;A
          </h2>
        </div>
        <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-xl">
          <PlainTextPrint content={noteText} filename="Topic18_Encoding_Categorical_Variables_Notes.txt" />
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* SECTION 9: PURE PYTHON LABORATORY */}
      {/* ----------------------------------------------------------------- */}
      <section id="lab" className="space-y-6">
        <div className="border-b border-slate-800 pb-3">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
            Hands-On Code
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            9. Pure Python Laboratory: Categorical Encoding Engines
          </h2>
        </div>
        <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-xl">
          <PythonFileLoader
            code={labCode}
            filename="encoding_categorical_variables_lab.py"
            runnable={true}
          />
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* SECTION 10: TEACHER CONSULTATION & GUIDANCE */}
      {/* ----------------------------------------------------------------- */}
      <section id="teacher" className="space-y-6">
        <div className="border-b border-slate-800 pb-3">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
            Faculty Mentorship
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            10. Teacher Consultation &amp; Viva Guidance
          </h2>
        </div>
        <Teacher />
      </section>
    </div>
  );
};

export default Topic18;
