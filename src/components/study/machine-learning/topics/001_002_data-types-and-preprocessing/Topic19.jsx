import React, { useState, useId, useMemo } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import labCode from "./topic19_files/one_hot_encoding_lab.py?raw";
import noteText from "./topic19_files/topic19_note.txt?raw";
import questions from "./topic19_files/topic19_questions.js";

// -----------------------------------------------------------------------------
// MAIN MASTERCLASS COMPONENT
// -----------------------------------------------------------------------------

const Topic19 = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const svgId = useId();

  // Studio Mode: "trap" | "memory" | "infrequent"
  const [studioMode, setStudioMode] = useState("trap");

  // Mode A: Dummy Trap Controls
  const [trapConfig, setTrapConfig] = useState("drop_first"); // "full_intercept" | "drop_first" | "no_intercept"

  // Mode B: Memory Scaling Controls
  const [sampleCount, setSampleCount] = useState(250000); // N in [10000, 1000000]
  const [categoryCount, setCategoryCount] = useState(500); // K in [5, 2500]

  // Mode C: Infrequent Category Controls
  const [minFreqThreshold, setMinFreqThreshold] = useState(2); // tau in [1, 5]
  const [testUnseenCategory, setTestUnseenCategory] = useState(false);

  // Jargon Search Query
  const [jargonQuery, setJargonQuery] = useState("");

  // Quiz State
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // ---------------------------------------------------------------------------
  // DATASETS & COMPUTATIONS FOR INTERACTIVE STUDIO
  // ---------------------------------------------------------------------------

  // Mode A: Kolkata Metro Procurement Departments
  const departments = [
    { name: "Civil Engineering (Ref)", count: 3, meanBudget: 43.1 },
    { name: "Electrical Systems", count: 2, meanBudget: 27.25 },
    { name: "Signalling & Telecom", count: 2, meanBudget: 32.6 },
    { name: "Rolling-Stock", count: 2, meanBudget: 60.25 },
    { name: "Trackwork", count: 2, meanBudget: 18.15 },
  ];

  const modeAData = useMemo(() => {
    let det = 0;
    let isInvertible = false;
    let statusText = "";
    let coefficients = [];

    if (trapConfig === "full_intercept") {
      det = 0.0;
      isInvertible = false;
      statusText = "SINGULAR MATRIX DET = 0 (OLS FAILS)";
      coefficients = [
        { label: "Intercept (beta_0)", val: "UNDEFINED", note: "Multicollinearity with column sum" },
        { label: "Civil (beta_1)", val: "NaN", note: "Rank-deficient" },
        { label: "Electrical (beta_2)", val: "NaN", note: "Rank-deficient" },
        { label: "Signalling (beta_3)", val: "NaN", note: "Rank-deficient" },
        { label: "Rolling-Stock (beta_4)", val: "NaN", note: "Rank-deficient" },
        { label: "Trackwork (beta_5)", val: "NaN", note: "Rank-deficient" },
      ];
    } else if (trapConfig === "drop_first") {
      det = 32.0;
      isInvertible = true;
      statusText = "STRICTLY INVERTIBLE DET = 32.0 (OLS OPTIMAL)";
      coefficients = [
        { label: "Intercept (beta_0)", val: "₹43.10 Cr", note: "Civil Baseline Expected Mean" },
        { label: "Electrical (beta_1)", val: "-₹15.85 Cr", note: "Contrast relative to Civil" },
        { label: "Signalling (beta_2)", val: "-₹10.50 Cr", note: "Contrast relative to Civil" },
        { label: "Rolling-Stock (beta_3)", val: "+₹17.15 Cr", note: "Contrast relative to Civil" },
        { label: "Trackwork (beta_4)", val: "-₹24.95 Cr", note: "Contrast relative to Civil" },
      ];
    } else {
      // no_intercept
      det = 72.0;
      isInvertible = true;
      statusText = "INVERTIBLE DET = 72.0 (NO BASELINE INTERCEPT)";
      coefficients = [
        { label: "Civil (beta_1)", val: "₹43.10 Cr", note: "Absolute Mean (No Intercept)" },
        { label: "Electrical (beta_2)", val: "₹27.25 Cr", note: "Absolute Mean (No Intercept)" },
        { label: "Signalling (beta_3)", val: "₹32.60 Cr", note: "Absolute Mean (No Intercept)" },
        { label: "Rolling-Stock (beta_4)", val: "₹60.25 Cr", note: "Absolute Mean (No Intercept)" },
        { label: "Trackwork (beta_5)", val: "₹18.15 Cr", note: "Absolute Mean (No Intercept)" },
      ];
    }

    return { det, isInvertible, statusText, coefficients };
  }, [trapConfig]);

  // Mode B: Memory Scaling Computations
  const modeBData = useMemo(() => {
    const N = sampleCount;
    const K = categoryCount;

    // Dense: N * K * 8 bytes
    const denseBytes = N * K * 8;
    const denseMB = Number((denseBytes / (1024 * 1024)).toFixed(1));
    const denseGB = Number((denseBytes / (1024 * 1024 * 1024)).toFixed(2));

    // CSR: 16 * N + 4 bytes
    const csrBytes = 16 * N + 4;
    const csrMB = Number((csrBytes / (1024 * 1024)).toFixed(2));

    const savingsPct = Number(((1 - csrBytes / denseBytes) * 100).toFixed(2));
    const sparsityPct = Number((((K - 1) / K) * 100).toFixed(2));

    // 2 GB container limit check
    const containerLimitMB = 2048;
    const oomRisk =
      denseMB > containerLimitMB
        ? "CRITICAL (OOM KILLER TERMINATION)"
        : denseMB > 1024
        ? "WARNING (HIGH MEMORY PRESSURE)"
        : "SAFE";

    return {
      denseMB,
      denseGB,
      csrMB,
      savingsPct,
      sparsityPct,
      oomRisk,
      N,
      K,
    };
  }, [sampleCount, categoryCount]);

  // Mode C: Infrequent Category & Cold-Start Playground
  const modeCData = useMemo(() => {
    const rawCategories = [
      { name: "Civil Engineering", count: 6 },
      { name: "Electrical Works", count: 4 },
      { name: "Track Alignment", count: 3 },
      { name: "Subway Ventilation", count: 1 }, // Rare
      { name: "Geothermal Shielding", count: 1 }, // Rare
    ];

    const tau = minFreqThreshold;
    const retained = [];
    const pooled = [];

    rawCategories.forEach((cat) => {
      if (cat.count >= tau) {
        retained.push(cat.name);
      } else {
        pooled.push(cat.name);
      }
    });

    const finalColumns = [...retained];
    if (pooled.length > 0) {
      finalColumns.push("infrequent_other");
    }

    // Encoding sample: "Subway Ventilation"
    let sampleVector = finalColumns.map((col) => {
      if (retained.includes("Subway Ventilation")) {
        return col === "Subway Ventilation" ? 1 : 0;
      } else {
        return col === "infrequent_other" ? 1 : 0;
      }
    });

    // Unseen test sample: "Aerospace Avionics"
    let unseenVector = finalColumns.map(() => 0);

    return {
      retained,
      pooled,
      finalColumns,
      sampleVector,
      unseenVector,
      tau,
    };
  }, [minFreqThreshold]);

  // Diagnostic Quiz Questions
  const diagnosticQuestions = [
    {
      id: 1,
      question:
        "What is the mathematical reason that the Gram matrix (X^T X) has det = 0 in unregularized Ordinary Least Squares when an intercept is included with all K one-hot columns?",
      options: [
        "Because the columns of X are linearly dependent: sum_{k=1}^K x_{ik} = 1.0 = x_{i,intercept}, rendering X rank-deficient (rank <= K < K+1).",
        "Because one-hot vectors have zero eigenvalues in the Fourier domain.",
        "Because standard basis vectors have negative inner products.",
        "Because one-hot encoding doubles the condition number of the target vector.",
      ],
      correctIndex: 0,
      explanation:
        "Every row in a one-hot matrix sums to exactly 1.0. This identical linear combination matches the constant intercept column of 1s, causing perfect multicollinearity. The Gram matrix (X^T X) has rank at most K, meaning det(X^T X) = 0 and (X^T X)^(-1) does not exist.",
      practicalTip:
        "Always pass `drop='first'` to `OneHotEncoder` when using unregularized linear regression or statsmodels OLS.",
    },
    {
      id: 2,
      question:
        "In drop-first linear regression where 'Civil' is the reference category, the intercept beta_0 = 43.10 and the coefficient for 'Rolling-Stock' beta_rs = +17.15. What is the expected budget for a Rolling-Stock contract?",
      options: [
        "₹17.15 Crores",
        "₹43.10 Crores",
        "₹60.25 Crores (43.10 + 17.15)",
        "₹25.95 Crores (43.10 - 17.15)",
      ],
      correctIndex: 2,
      explanation:
        "Under drop-first encoding, beta_0 captures the baseline mean of the reference category ('Civil' = ₹43.10 Cr), and beta_rs represents the differential contrast relative to that baseline. The expected value for Rolling-Stock is beta_0 + beta_rs = 43.10 + 17.15 = ₹60.25 Cr.",
      practicalTip:
        "In corporate econometric reports, explain beta coefficients as differential premiums or discounts relative to the designated reference group.",
    },
    {
      id: 3,
      question:
        "Why is the memory footprint of a Compressed Sparse Row (CSR) one-hot matrix completely independent of the cardinality K?",
      options: [
        "Because CSR stores only non-zero values; every row contains exactly ONE non-zero entry (1.0), so NNZ = N regardless of whether K is 10 or 100,000.",
        "Because CSR compresses strings using gzip.",
        "Because CSR removes all duplicate rows automatically.",
        "Because CSR uses 1-bit booleans instead of floating-point numbers.",
      ],
      correctIndex: 0,
      explanation:
        "A CSR matrix stores `data` (N floats), `indices` (N integers), and `indptr` (N+1 integers). Because each observation belongs to only one category, there is exactly one non-zero entry per row (NNZ = N). The memory is strictly 16*N + 4 bytes, completely unaffected by how many columns K exist.",
      practicalTip:
        "Keep `sparse_output=True` in Scikit-Learn; never call `.toarray()` on high-cardinality feature matrices.",
    },
    {
      id: 4,
      question:
        "Why does dropping the first category (`drop='first'`) harm Decision Trees and Random Forests, even though it is required for linear models?",
      options: [
        "Decision trees cannot split on floating-point numbers.",
        "Dropping the category forces the tree to make an inverse multi-condition split across K-1 columns just to isolate the reference category, wasting tree depth and increasing variance.",
        "Random Forests require all Gram matrices to have non-zero determinants.",
        "Decision trees automatically invert feature matrices using gradient descent.",
      ],
      correctIndex: 1,
      explanation:
        "Trees split on individual columns (e.g. x_col <= 0.5). If a reference category has no column, the tree can only identify it when all other K-1 columns are simultaneously zero, requiring K-1 sequential tree splits! Trees do not suffer from multicollinearity, so they should always receive all K columns (`drop=None`).",
      practicalTip:
        "Use `drop='first'` for linear/logistic models, but keep `drop=None` for XGBoost, LightGBM, and Random Forest.",
    },
    {
      id: 5,
      question:
        "Why is `pd.get_dummies()` considered a risky anti-pattern in production machine learning pipelines?",
      options: [
        "It lacks persistent state: if the inference dataset has different categories from the training set, column counts and orderings will mismatch, crashing the model.",
        "It only works on integer data types.",
        "It permanently modifies the input DataFrame in place.",
        "It requires a GPU to execute.",
      ],
      correctIndex: 0,
      explanation:
        "Unlike Scikit-Learn's `OneHotEncoder`, `pd.get_dummies()` does not retain a learned schema. If an inference payload has fewer or more categories than the training set, `pd.get_dummies()` produces a DataFrame with different columns, causing immediate shape mismatch errors in production.",
      practicalTip:
        "Always fit `sklearn.preprocessing.OneHotEncoder` on training data and use `.transform()` on production payloads.",
    },
  ];

  // Jargon Glossary
  const jargonTerms = [
    {
      term: "One-Hot Encoding (OHE)",
      definition:
        "A categorical encoding method mapping each of K unique levels into a standard basis vector e_k in R^K containing a single 1 and K-1 zeros.",
    },
    {
      term: "Orthogonal Basis",
      definition:
        "A set of basis vectors whose pairwise inner products are strictly zero (<e_i, e_j> = 0 for i != j), ensuring zero geometric correlation between categories.",
    },
    {
      term: "Equidistance Metric",
      definition:
        "The mathematical property where every pair of distinct one-hot categories has the exact same Euclidean distance: ||e_i - e_j||_2 = sqrt(2) approx 1.4142.",
    },
    {
      term: "Dummy Variable Trap",
      definition:
        "A condition of perfect multicollinearity occurring when all K one-hot columns are included alongside an intercept, making (X^T X) rank-deficient and singular (det=0).",
    },
    {
      term: "Reference Category (Baseline)",
      definition:
        "The single category omitted in K-1 encoding; its expected outcome is captured by the regression intercept beta_0, while active dummy coefficients measure contrast differences.",
    },
    {
      term: "Compressed Sparse Row (CSR)",
      definition:
        "A memory-efficient matrix format storing only non-zero coordinates via three 1D arrays (`data`, `indices`, `indptr`), reducing memory by up to 99.9% on one-hot data.",
    },
    {
      term: "Infrequent Category Pooling",
      definition:
        "The technique of grouping rare categories occurring fewer than `min_frequency` times into a single consolidated 'infrequent_other' column to control feature explosion.",
    },
    {
      term: "mtry Subsampling Dilution",
      definition:
        "A degradation in Random Forests where hundreds of sparse one-hot binary columns dilute the random feature selection process, starving the tree of substantive continuous predictors.",
    },
    {
      term: "handle_unknown='ignore'",
      definition:
        "A Scikit-Learn production parameter that encodes unseen categories during inference as an all-zero vector, safely defaulting to the baseline intercept without crashing.",
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
              BCAC701B • Data Types and Preprocessing • Topic 19
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Masterclass Standard
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Linear Algebra &amp; CSR Verified
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            One-Hot Encoding (OHE): Orthogonal Geometry, The Dummy Trap &amp; CSR Scaling
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-4xl leading-relaxed">
            Dive into the definitive mathematical mechanics of One-Hot Encoding. Understand why mapping qualitative symbols to standard basis vectors e_k in R^K guarantees mutual orthogonality and uniform sqrt(2) Euclidean distance. Master the algebraic proof of the Dummy Variable Trap that makes unregularized linear models singular (det=0), discover how drop-first K-1 encoding unlocks interpretable contrast coefficients, and uncover how Compressed Sparse Row (CSR) matrices slash memory by 99.9% with zero dependence on category cardinality K.
          </p>

          {/* Quick Jump Navigation */}
          <div className="pt-4 border-t border-indigo-900/50">
            <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider block mb-2">
              Curriculum Roadmap Jump Navigation:
            </span>
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                { id: "#novice", label: "1. Novice Masterclass" },
                { id: "#jargon", label: "2. Basis & Jargon" },
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
                💡
              </div>
              <h3 className="text-base font-bold text-white">
                Metaphor 1: The Dedicated Switch Panel
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Imagine a home with 5 rooms. If you control them with a single rotary dial (0=Living Room, 1=Kitchen, 2=Bedroom, 3=Balcony), you are forcing a bizarre rule where Balcony is &quot;three times brighter&quot; than Kitchen! One-Hot Encoding replaces the rotary dial with 5 dedicated on/off toggle switches. Each room gets its own independent light switch!
              </p>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-indigo-300 font-mono">
              Bedroom ON -&gt; [0, 0, 1, 0, 0]
            </div>
          </div>

          {/* METAPHOR 2 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-cyan-900/40 shadow-xl space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-2xl">
                📐
              </div>
              <h3 className="text-base font-bold text-white">
                Metaphor 2: Perpendicular 90-Degree Axes
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                In geometry, if two arrows point at 90 degrees to each other, walking along the X-axis changes nothing about your Y position. One-Hot Encoding erects K perpendicular axes in high-dimensional space. The inner product between any two distinct categories is 0, and the Euclidean distance is strictly sqrt(2) approx 1.414. Nobody is closer, nobody is farther!
              </p>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-cyan-300 font-mono">
              &lt;e_civil, e_electrical&gt; = 0 | ||e_i - e_j|| = sqrt(2)
            </div>
          </div>

          {/* METAPHOR 3 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-emerald-900/40 shadow-xl space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-2xl">
                📦
              </div>
              <h3 className="text-base font-bold text-white">
                Metaphor 3: The Warehouse Packing Paradox
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Suppose a warehouse stores 1,000 bins, but every customer shipment contains only 1 item. A dense array stores 999 empty air-filled boxes alongside the 1 item, filling a 20 GB warehouse. A Compressed Sparse Row (CSR) matrix stores only the single parcel tag, cutting warehouse volume down to 15 MB (a 99.9% space saving)!
              </p>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-emerald-300 font-mono">
              Dense = 20 GB | CSR Sparse = 15 MB (99.9% Saved)
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* SECTION 2: ORTHOGONAL BASIS & JARGON BUSTER */}
      {/* ----------------------------------------------------------------- */}
      <section id="jargon" className="space-y-8">
        <div className="border-b border-slate-800 pb-3">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
            Geometric Vocabulary
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            2. The Orthogonal Basis &amp; Jargon Glossary
          </h2>
        </div>

        {/* JARGON SEARCH & GRID */}
        <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white">OHE Academic Jargon Buster</h3>
              <p className="text-xs text-slate-400">
                Search and explore formal mathematical definitions for university examinations and interviews
              </p>
            </div>
            <input
              type="text"
              placeholder="Search concepts (e.g. CSR, Dummy Trap, Equidistance)..."
              value={jargonQuery}
              onChange={(e) => setJargonQuery(e.target.value)}
              className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500 w-full sm:w-64"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
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
              3. Interactive One-Hot Encoding Laboratory Studio
            </h2>
          </div>

          {/* STUDIO MODE TABS */}
          <div className="flex gap-2">
            {[
              { id: "trap", label: "Mode A: Dummy Trap Arena" },
              { id: "memory", label: "Mode B: CSR Memory Scaler" },
              { id: "infrequent", label: "Mode C: Infrequent Pooling" },
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
        {/* STUDIO MODE A: THE DUMMY VARIABLE TRAP ARENA */}
        {/* --------------------------------------------------------------- */}
        {studioMode === "trap" && (
          <div className="bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-indigo-900/40 shadow-2xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-rose-400">⚠️</span> The Dummy Variable Trap &amp; Matrix Rank Playground
                </h3>
                <p className="text-xs text-slate-400">
                  Simulating OLS normal equations on Kolkata Metro Rail tender budget estimations
                </p>
              </div>

              {/* CONTROLS */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: "full_intercept", label: "Intercept + All K Columns (TRAP)" },
                  { id: "drop_first", label: "Intercept + K-1 Columns (SAFE)" },
                  { id: "no_intercept", label: "No Intercept + All K Columns" },
                ].map((btn) => (
                  <button
                    key={btn.id}
                    onClick={() => setTrapConfig(btn.id)}
                    className={clsx(
                      "px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer",
                      trapConfig === btn.id
                        ? "bg-indigo-600 text-white shadow-md border border-indigo-400"
                        : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                    )}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>

            {/* METRICS ROW */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500">Gram Matrix Status</span>
                <div
                  className={clsx(
                    "text-xs font-bold font-mono",
                    modeAData.isInvertible ? "text-emerald-400" : "text-rose-400"
                  )}
                >
                  {modeAData.statusText}
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500">Determinant det(X^T X)</span>
                <div
                  className={clsx(
                    "text-sm font-bold font-mono",
                    modeAData.det === 0 ? "text-rose-400" : "text-emerald-400"
                  )}
                >
                  {modeAData.det.toFixed(2)}
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500">OLS Invertibility</span>
                <div className="text-sm font-bold text-white font-mono">
                  {modeAData.isInvertible ? "Invertible (Unique Solution)" : "Singular (Zero Inverse)"}
                </div>
              </div>
            </div>

            {/* FITTED COEFFICIENTS TABLE */}
            <div className="overflow-x-auto rounded-2xl border border-slate-800">
              <table className="w-full text-xs text-left text-slate-300 bg-slate-950/60">
                <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="p-3">Model Parameter</th>
                    <th className="p-3">Fitted Coefficient (beta)</th>
                    <th className="p-3">Econometric &amp; Statistical Interpretation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono">
                  {modeAData.coefficients.map((row) => (
                    <tr key={row.label} className={row.val === "NaN" ? "bg-rose-950/20" : ""}>
                      <td className="p-3 font-sans font-bold text-white">{row.label}</td>
                      <td
                        className={clsx(
                          "p-3 font-bold",
                          row.val.includes("-")
                            ? "text-cyan-400"
                            : row.val.includes("+")
                            ? "text-emerald-400"
                            : row.val === "NaN" || row.val === "UNDEFINED"
                            ? "text-rose-400"
                            : "text-indigo-300"
                        )}
                      >
                        {row.val}
                      </td>
                      <td className="p-3 font-sans text-xs text-slate-400">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* EDUCATIONAL CALLOUT */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
              {trapConfig === "full_intercept" ? (
                <p className="text-rose-300">
                  ❌ <strong>Dummy Trap Active:</strong> The sum of all 5 department indicator columns identically equals the constant intercept column: <code>sum_{`{k=1}`}^5 x_k = 1.0 = x_intercept</code>. This creates perfect multicollinearity, making <code>(X^T X)</code> singular (det = 0). OLS cannot compute a unique solution!
                </p>
              ) : trapConfig === "drop_first" ? (
                <p className="text-emerald-300">
                  ✔ <strong>Drop-First Optimal:</strong> By omitting &apos;Civil Engineering&apos; as the reference baseline, the intercept beta_0 captures the baseline mean contract price (₹43.10 Cr). Every active coefficient represents a direct contrast: Electrical tenders average ₹15.85 Cr less than Civil, while Rolling-Stock tenders average ₹17.15 Cr more!
                </p>
              ) : (
                <p className="text-cyan-300">
                  ℹ️ <strong>No Intercept Model:</strong> Removing the intercept restores matrix invertibility without dropping a category. Each beta_k now represents the absolute mean of that category directly, though standard R^2 calculations become non-standard.
                </p>
              )}
            </div>
          </div>
        )}

        {/* --------------------------------------------------------------- */}
        {/* STUDIO MODE B: CSR SPARSE VS DENSE MEMORY SCALER */}
        {/* --------------------------------------------------------------- */}
        {studioMode === "memory" && (
          <div className="bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-indigo-900/40 shadow-2xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-emerald-400">💾</span> Compressed Sparse Row (CSR) vs Dense RAM Scaler
                </h3>
                <p className="text-xs text-slate-400">
                  Simulate memory consumption for massive industrial datasets (e.g. West Bengal e-commerce delivery pincodes)
                </p>
              </div>

              <div
                className={clsx(
                  "px-3 py-1.5 rounded-xl text-xs font-bold border",
                  modeBData.denseMB > 2048
                    ? "bg-rose-500/20 text-rose-300 border-rose-500/40"
                    : modeBData.denseMB > 1024
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                    : "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                )}
              >
                2GB Docker Status: {modeBData.oomRisk}
              </div>
            </div>

            {/* SLIDERS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-slate-300">Dataset Rows (N):</span>
                  <span className="font-mono font-bold text-cyan-400">
                    {modeBData.N.toLocaleString()} orders
                  </span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="1000000"
                  step="10000"
                  value={sampleCount}
                  onChange={(e) => setSampleCount(Number(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-slate-300">Category Cardinality (K):</span>
                  <span className="font-mono font-bold text-indigo-400">
                    {modeBData.K.toLocaleString()} unique pincodes
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="2500"
                  step="25"
                  value={categoryCount}
                  onChange={(e) => setCategoryCount(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>
            </div>

            {/* COMPARISON METRICS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500">Dense 2D NumPy Array</span>
                <div className="text-base font-bold font-mono text-rose-400">
                  {modeBData.denseMB > 1024 ? `${modeBData.denseGB} GB` : `${modeBData.denseMB} MB`}
                </div>
                <span className="text-[10px] text-slate-500">N * K * 8 bytes (float64)</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500">Scipy CSR Sparse Matrix</span>
                <div className="text-base font-bold font-mono text-emerald-400">
                  {modeBData.csrMB} MB
                </div>
                <span className="text-[10px] text-slate-500">16 * N + 4 bytes (Constant vs K!)</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500">RAM Savings</span>
                <div className="text-base font-bold font-mono text-cyan-400">
                  {modeBData.savingsPct}%
                </div>
                <span className="text-[10px] text-slate-500">Memory Saved via Sparsity</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-500">Matrix Sparsity</span>
                <div className="text-base font-bold font-mono text-purple-400">
                  {modeBData.sparsityPct}%
                </div>
                <span className="text-[10px] text-slate-500">Proportion of Zero Coordinates</span>
              </div>
            </div>

            {/* VISUAL BAR COMPARISON */}
            <div className="space-y-3 bg-slate-950 p-5 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-300 block">Relative Memory Footprint Bar:</span>
              <div className="space-y-2">
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-rose-400 font-bold">Dense Array (100% capacity)</span>
                    <span className="font-mono text-slate-400">{modeBData.denseMB} MB</span>
                  </div>
                  <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-500 rounded-full w-full" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-emerald-400 font-bold">CSR Sparse Representation</span>
                    <span className="font-mono text-slate-400">{modeBData.csrMB} MB</span>
                  </div>
                  <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                      style={{ width: `${Math.max(0.5, (modeBData.csrMB / modeBData.denseMB) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
              <p>
                <strong>Architectural Insight:</strong> Notice how moving the cardinality slider from K=5 to K=2,500 causes the dense memory to skyrocket from {((modeBData.N * 5 * 8)/(1024*1024)).toFixed(1)} MB up to {((modeBData.N * 2500 * 8)/(1024*1024*1024)).toFixed(1)} GB, while the CSR matrix memory stays <strong>completely rock-solid at {modeBData.csrMB} MB</strong>! This is because CSR stores only the 1 non-zero entry per row, rendering its storage cost 100% immune to cardinality explosion.
              </p>
            </div>
          </div>
        )}

        {/* --------------------------------------------------------------- */}
        {/* STUDIO MODE C: INFREQUENT POOLING & UNSEEN COLD START */}
        {/* --------------------------------------------------------------- */}
        {studioMode === "infrequent" && (
          <div className="bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-indigo-900/40 shadow-2xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="text-purple-400">🛡️</span> Infrequent Category Pooling &amp; Cold-Start Defense
                </h3>
                <p className="text-xs text-slate-400">
                  Scikit-Learn 1.2+ `min_frequency` pooling and `handle_unknown=&apos;ignore&apos;` all-zero fallback
                </p>
              </div>

              {/* SLIDER FOR MIN_FREQUENCY */}
              <div className="flex items-center gap-3 bg-slate-950 p-2.5 rounded-2xl border border-slate-800">
                <span className="text-xs font-bold text-indigo-300">min_frequency (tau):</span>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={minFreqThreshold}
                  onChange={(e) => setMinFreqThreshold(Number(e.target.value))}
                  className="w-24 accent-purple-500 cursor-pointer"
                />
                <span className="text-xs font-mono font-bold text-white w-6 text-right">
                  {minFreqThreshold}
                </span>
              </div>
            </div>

            {/* POOLING BREAKDOWN */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-[10px] uppercase font-bold text-emerald-400">
                  Retained Dominant Columns ({modeCData.retained.length})
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {modeCData.retained.map((c) => (
                    <span
                      key={c}
                      className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-[10px] uppercase font-bold text-amber-400">
                  Pooled Rare Categories ({modeCData.pooled.length})
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {modeCData.pooled.length > 0 ? (
                    modeCData.pooled.map((c) => (
                      <span
                        key={c}
                        className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30"
                      >
                        {c}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-500 italic">No categories below threshold</span>
                  )}
                </div>
              </div>
            </div>

            {/* TRANSFORMATION OF RARE VS UNSEEN RECORD */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4 font-mono text-xs">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-indigo-300 font-bold">
                  <span>Sample Record: &quot;Subway Ventilation&quot; (Rare Category, count=1)</span>
                  <span className="text-[10px] uppercase text-slate-500">Encoded Vector</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-cyan-300">
                  [{modeCData.sampleVector.join(", ")}]
                </div>
                <span className="text-[11px] font-sans text-slate-400 block pt-0.5">
                  Mapped to column:{" "}
                  <strong className="text-white">
                    {modeCData.finalColumns[modeCData.sampleVector.indexOf(1)]}
                  </strong>
                </span>
              </div>

              <div className="space-y-1 pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between text-rose-300 font-bold">
                  <span>Novel Inference Category: &quot;Aerospace Avionics&quot; (Unseen in Training)</span>
                  <span className="text-[10px] uppercase text-emerald-400">handle_unknown=&apos;ignore&apos;</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-emerald-300">
                  [{modeCData.unseenVector.join(", ")}]
                </div>
                <span className="text-[11px] font-sans text-slate-400 block pt-0.5">
                  Status:{" "}
                  <strong className="text-emerald-300">
                    All-Zero Vector Assigned (Safely defaults to baseline intercept beta_0 without API crash!)
                  </strong>
                </span>
              </div>
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
          {/* FORMULATION 1 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                Euclidean Geometry
              </span>
              <span className="text-xs font-mono text-slate-500">Metric Equidistance</span>
            </div>
            <h3 className="text-base font-bold text-white">Proof of sqrt(2) Equidistance</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Let e_i and e_j be two distinct standard basis vectors in R^K (i != j):
            </p>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300 space-y-1">
              <div>||e_i - e_j||_2 = sqrt( sum_{`{m=1}`}^K (e_{`{im}`} - e_{`{jm}`})^2 )</div>
              <div>= sqrt( (1 - 0)^2 + (0 - 1)^2 + 0 )</div>
              <div>= sqrt(1 + 1) = sqrt(2) approx 1.4142</div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every distinct category pair resides at the identical Euclidean distance, completely eliminating artificial alphabetical proximity.
            </p>
          </div>

          {/* FORMULATION 2 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                Linear Algebra
              </span>
              <span className="text-xs font-mono text-slate-500">Collinearity Proof</span>
            </div>
            <h3 className="text-base font-bold text-white">Dummy Variable Trap Singularity</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              When all K columns are included with intercept column 1_N:
            </p>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-rose-300 space-y-1">
              <div>1_N - sum_{`{k=1}`}^K x_{`{*, k}`} = 0_N  (Linear Dependency)</div>
              <div>rank(X) &lt;= K &lt; K + 1  (Rank Deficient)</div>
              <div>det(X^T X) = 0  --&gt; (X^T X)^(-1) DOES NOT EXIST</div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dropping one reference category restores rank(X_safe) = K, guaranteeing positive definite invertibility.
            </p>
          </div>

          {/* FORMULATION 3 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Econometric Contrast
              </span>
              <span className="text-xs font-mono text-slate-500">OLS Regression Weights</span>
            </div>
            <h3 className="text-base font-bold text-white">Differential Contrast Interpretation</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Under drop-first encoding with reference category c_1:
            </p>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 space-y-1">
              <div>E[ Y | C = c_1 ] = beta_0  (Reference Group Baseline)</div>
              <div>E[ Y | C = c_k ] = beta_0 + beta_k  (Active Group Mean)</div>
              <div>beta_k = E[ Y | C = c_k ] - E[ Y | C = c_1 ]  (Differential Contrast)</div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Coefficients measure pure differential premiums or discounts against the baseline group.
            </p>
          </div>

          {/* FORMULATION 4 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                Sparse Storage Complexity
              </span>
              <span className="text-xs font-mono text-slate-500">Big-O Memory Scaling</span>
            </div>
            <h3 className="text-base font-bold text-white">CSR Memory Invariance Law</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              In one-hot encoding, each row has exactly 1 non-zero entry (NNZ = N):
            </p>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-purple-300 space-y-1">
              <div>Memory_dense = N * K * 8 bytes  (Scales linearly with K)</div>
              <div>Memory_csr = N*8 + N*4 + (N+1)*4 = 16*N + 4 bytes</div>
              <div>d(Memory_csr) / dK = 0  (COMPLETELY INDEPENDENT OF K!)</div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Matrix-vector multiplication FLOPs collapse from O(N * K) down to O(N).
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
                Metro Infrastructure
              </span>
              <span className="text-xs text-slate-400">KMRC East-West Metro, Kolkata</span>
            </div>
            <h3 className="text-base font-bold text-white">
              Vendor Tender Costing &amp; Dummy Trap Elimination
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Susmita engineered procurement tender forecasting for Kolkata Metro tunneling contractors across Civil, Electrical, Signalling, Trackwork, and Rolling-Stock. Fitting OLS with all 5 columns caused a singular matrix error (det=0). Setting `OneHotEncoder(drop=&apos;first&apos;)` designated Civil as the reference baseline (₹43.10 Cr), producing clear differential contract estimates (Electrical: -₹15.85 Cr, Rolling-Stock: +₹17.15 Cr) that satisfied state audit scrutiny.
            </p>
          </div>

          {/* CASE 2 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-cyan-900/40 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-500/40">
                InsurTech Actuarial
              </span>
              <span className="text-xs text-slate-400">Salt Lake Sector V, Kolkata</span>
            </div>
            <h3 className="text-base font-bold text-white">
              Vehicle Claim Severity GLMs &amp; IRLS Divergence
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Debangshu modeled collision claim severity across vehicle body types (Hatchback, Sedan, SUV, Commercial-Truck, Two-Wheeler) using a Gamma Generalized Linear Model (GLM). Retaining all dummy columns caused the Iteratively Reweighted Least Squares (IRLS) optimizer to diverge due to a singular Fisher Information matrix. Dropping &apos;Hatchback&apos; as the reference group enabled rapid convergence in 6 iterations, proving Commercial-Trucks incur +142% higher claim severity.
            </p>
          </div>

          {/* CASE 3 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-emerald-900/40 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/40">
                Industrial Edge IoT
              </span>
              <span className="text-xs text-slate-400">Barrackpore &amp; Titagarh Textile Belt</span>
            </div>
            <h3 className="text-base font-bold text-white">
              Raspberry Pi Loom Telemetry: CSR Saves Edge Gateway
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Mamata deployed predictive maintenance sensors across 250 loom machinery models in Barrackpore textile mills on Raspberry Pi 4 edge gateways (2 GB RAM). Calling `.toarray()` on 100,000 batch rows consumed 200 MB per batch, causing Linux OOM killer shutdowns when 3 threads executed. Migrating to native Scipy CSR sparse matrices dropped memory to 1.6 MB per batch (a 99.2% reduction), enabling 10 concurrent threads at 45% CPU utilization.
            </p>
          </div>

          {/* CASE 4 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-rose-900/40 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 rounded-full border border-rose-500/40">
                Clinical Healthcare
              </span>
              <span className="text-xs text-slate-400">Barasat District Hospital, North 24 Pgs</span>
            </div>
            <h3 className="text-base font-bold text-white">
              Emergency Ward Triage: Eliminating Alphabetical Bias
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Abhronila audited a triage priority model where chief complaints were encoded with `LabelEncoder` (Cardiac=0, Gastro=1, Neuro=2, Trauma=4). The model assigned severe trauma patients the highest priority and critical cardiac arrests the lowest solely because &apos;Cardiac&apos; started with &apos;C&apos;! Abhronila rebuilt the pipeline with One-Hot Encoding, ensuring independent weights calibrated strictly by physiological urgency.
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
              <span>⚠️</span> Pitfall 1: Calling `.toarray()` in Production
            </div>
            <h4 className="text-sm font-bold text-white">The Container OOM Killer</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Converting a Scipy CSR sparse matrix into a dense NumPy array with `.toarray()` forces RAM allocation for all zeros. In production with K=2,500, memory explodes from 16 MB to 20 GB, triggering immediate container termination.
            </p>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-rose-900/40 space-y-3">
            <div className="text-rose-400 font-bold text-xs flex items-center gap-2">
              <span>⚠️</span> Pitfall 2: `drop='first'` on Tree Ensembles
            </div>
            <h4 className="text-sm font-bold text-white">Tree Depth &amp; Variance Inflation</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Dropping the first column forces decision trees to test K-1 conditions simultaneously to isolate the reference category. While required for linear models, always keep `drop=None` for XGBoost, LightGBM, and Random Forest.
            </p>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-rose-900/40 space-y-3">
            <div className="text-rose-400 font-bold text-xs flex items-center gap-2">
              <span>⚠️</span> Pitfall 3: `pd.get_dummies()` Schema Drift
            </div>
            <h4 className="text-sm font-bold text-white">Stateless Pipeline Failures</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              `pd.get_dummies()` does not persist learned schemas. If an inference batch lacks one category, it outputs fewer columns, causing immediate shape mismatch crashes. Always use `sklearn.preprocessing.OneHotEncoder`.
            </p>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-amber-900/40 space-y-3">
            <div className="text-amber-400 font-bold text-xs flex items-center gap-2">
              <span>⚠️</span> Pitfall 4: Missing `handle_unknown='ignore'`
            </div>
            <h4 className="text-sm font-bold text-white">API HTTP 500 Crashes</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Default `handle_unknown=&apos;error&apos;` raises a ValueError on novel production categories. Specifying `handle_unknown=&apos;ignore&apos;` assigns an all-zero vector, safely defaulting to the baseline intercept without crashing.
            </p>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-amber-900/40 space-y-3">
            <div className="text-amber-400 font-bold text-xs flex items-center gap-2">
              <span>⚠️</span> Pitfall 5: Random Forest `mtry` Dilution
            </div>
            <h4 className="text-sm font-bold text-white">Feature Subsampling Starvation</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              High-cardinality OHE creates hundreds of binary columns containing mostly zeros. When Random Forest samples sqrt(D) features, it repeatedly selects uninformative zeros, starving the tree of real continuous predictors.
            </p>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-cyan-900/40 space-y-3">
            <div className="text-cyan-400 font-bold text-xs flex items-center gap-2">
              <span>💡</span> Engineering Rule: `drop='if_binary'`
            </div>
            <h4 className="text-sm font-bold text-white">Automatic Multi-Type Resolution</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Use `OneHotEncoder(drop=&apos;if_binary&apos;)` to automatically drop the redundant second column for binary features (K=2) while preserving all K columns for multi-class variables without manual column slicing.
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
              7. Diagnostic Assessment: One-Hot Encoding Mastery
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
          <PlainTextPrint content={noteText} filename="Topic19_One_Hot_Encoding_Notes.txt" />
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
            9. Pure Python Laboratory: One-Hot Encoding &amp; CSR Engines
          </h2>
        </div>
        <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-xl">
          <PythonFileLoader
            code={labCode}
            filename="one_hot_encoding_lab.py"
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

export default Topic19;
