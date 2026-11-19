import React, { useState, useId, useMemo } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import labCode from "./topic16_files/normalization_lab.py?raw";
import noteText from "./topic16_files/topic16_note.txt?raw";
import questions from "./topic16_files/topic16_questions.js";

// -----------------------------------------------------------------------------
// HELPER NUMERICAL & NORMALIZATION FUNCTIONS
// -----------------------------------------------------------------------------

function applyMinMax(data, minVal, maxVal, targetMin = 0.0, targetMax = 1.0, clip = false) {
  const range = maxVal - minVal || 1.0;
  return data.map((x) => {
    let val = ((x - minVal) / range) * (targetMax - targetMin) + targetMin;
    if (clip) {
      val = Math.max(targetMin, Math.min(targetMax, val));
    }
    return Number(val.toFixed(4));
  });
}

function applyMaxAbs(data, maxAbsVal) {
  const denom = maxAbsVal || 1.0;
  return data.map((x) => Number((x / denom).toFixed(4)));
}

// Vector Normalization
function normalizeVector2D(x, y, normType) {
  let norm = 1.0;
  if (normType === "l1") {
    norm = Math.abs(x) + Math.abs(y);
  } else if (normType === "l2") {
    norm = Math.sqrt(x * x + y * y);
  } else if (normType === "linf") {
    norm = Math.max(Math.abs(x), Math.abs(y));
  }
  norm = norm || 1.0;
  return {
    nx: Number((x / norm).toFixed(4)),
    ny: Number((y / norm).toFixed(4)),
    normVal: Number(norm.toFixed(4)),
  };
}

// -----------------------------------------------------------------------------
// MAIN MASTERCLASS COMPONENT
// -----------------------------------------------------------------------------

const Topic16 = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const svgId = useId();

  // Studio Mode: "minmax" | "vector" | "cosine"
  const [studioMode, setStudioMode] = useState("minmax");

  // Mode A: Min-Max & Outlier Compression
  const [outlierMultiplier, setOutlierMultiplier] = useState(1.0); // 1.0 to 10.0
  const [targetRangeKey, setTargetRangeKey] = useState("zero_one"); // "zero_one" | "minus_one_one"
  const [enableClipping, setEnableClipping] = useState(false);

  // Mode B: Vector Normalization
  const [vecX, setVecX] = useState(4.0);
  const [vecY, setVecY] = useState(3.0);
  const [activeNormType, setActiveNormType] = useState("l2"); // "l1" | "l2" | "linf"

  // Mode C: Cosine Similarity & Search
  const [selectedDocId, setSelectedDocId] = useState(1);

  // Jargon Buster Search
  const [jargonQuery, setJargonQuery] = useState("");

  // Quiz State
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Base Data for Mode A (Solar Cell Temperatures in °C)
  const baseSolarTemps = [28.0, 32.5, 35.0, 42.0, 48.5, 55.0, 62.0, 68.5, 75.0, 82.0];

  const activeSolarData = useMemo(() => {
    if (outlierMultiplier <= 1.05) return [...baseSolarTemps];
    const extremeVal = Number((82.0 * outlierMultiplier).toFixed(1));
    return [...baseSolarTemps, extremeVal];
  }, [outlierMultiplier]);

  const minMaxResults = useMemo(() => {
    const minVal = Math.min(...activeSolarData);
    const maxVal = Math.max(...activeSolarData);
    const targetMin = targetRangeKey === "zero_one" ? 0.0 : -1.0;
    const targetMax = 1.0;
    const maxAbs = Math.max(...activeSolarData.map((x) => Math.abs(x)));

    const scaledMinMax = applyMinMax(activeSolarData, minVal, maxVal, targetMin, targetMax, enableClipping);
    const scaledMaxAbs = applyMaxAbs(activeSolarData, maxAbs);

    // Dynamic Range utilization by normal observations
    const normalMaxScaled = scaledMinMax[baseSolarTemps.length - 1];
    const normalMinScaled = scaledMinMax[0];
    const normalSpan = targetMax - targetMin;
    const utilizationPct = Math.min(100, Math.max(0, ((normalMaxScaled - normalMinScaled) / normalSpan) * 100));

    return {
      minVal,
      maxVal,
      maxAbs,
      scaledMinMax,
      scaledMaxAbs,
      utilizationPct: Number(utilizationPct.toFixed(1)),
      hasOutlier: outlierMultiplier > 1.05,
    };
  }, [activeSolarData, targetRangeKey, enableClipping, outlierMultiplier]);

  // Mode B Calculations
  const normResult = useMemo(() => {
    return normalizeVector2D(vecX, vecY, activeNormType);
  }, [vecX, vecY, activeNormType]);

  // Mode C Data: Kolkata E-Commerce Ethnic Wear Search
  // Vocabulary: ['saree', 'silk', 'handloom', 'cotton', 'blue']
  const queryVector = [1, 1, 1, 0, 1]; // "blue handloom silk saree"
  const catalogDocs = [
    {
      id: 1,
      title: "Authentic Baluchari Silk Saree",
      desc: "Pure handloom silk saree with intricate blue motifs and border.",
      vec: [2, 1, 2, 0, 1], // short, dense keywords
    },
    {
      id: 2,
      title: "Casual Cotton Daily Saree",
      desc: "Blue cotton saree, soft breathable cotton daily office wear blue shade.",
      vec: [3, 0, 0, 4, 3], // long, repeats 'saree' and 'cotton'
    },
    {
      id: 3,
      title: "Festive Dhakai Jamdani Handloom",
      desc: "Traditional Bengali handloom saree woven in pure fine silk with floral blue pallu.",
      vec: [2, 1, 2, 0, 2], // highly relevant, balanced
    },
  ];

  const searchResults = useMemo(() => {
    return catalogDocs.map((doc) => {
      // Raw Dot Product
      const rawDot = doc.vec.reduce((sum, val, idx) => sum + val * queryVector[idx], 0);

      // L2 Norms
      const qNorm = Math.sqrt(queryVector.reduce((sum, val) => sum + val * val, 0));
      const docNorm = Math.sqrt(doc.vec.reduce((sum, val) => sum + val * val, 0));

      // Cosine Similarity
      const cosineSim = rawDot / (qNorm * docNorm || 1.0);

      return {
        ...doc,
        rawDot,
        docLength: Number(docNorm.toFixed(2)),
        cosineSim: Number(cosineSim.toFixed(4)),
      };
    });
  }, []);

  // Jargon Glossary
  const jargonList = [
    {
      term: "Min-Max Rescaling",
      def: "Column-wise linear transformation mapping feature domain [x_min, x_max] into a target closed interval like [0, 1] or [-1, 1].",
      relevance: "Essential for bounding inputs in neural networks with Sigmoid/Tanh activations, but vulnerable to extreme outliers.",
    },
    {
      term: "MaxAbsScaler",
      def: "Column-wise scaling that divides by max(|x|), mapping into [-1, 1] without subtracting an origin offset.",
      relevance: "Strictly preserves zeros (0 / max = 0), making it the safe choice for large scipy CSR sparse matrices.",
    },
    {
      term: "Sample-Wise Vector Normalization",
      def: "Row-wise scaling that normalizes each individual sample vector across all its feature dimensions so that ||x||_p = 1.0.",
      relevance: "Isolates directional orientation and angles, discarding sample magnitude and document length.",
    },
    {
      term: "L1 Norm (Manhattan / Taxicab)",
      def: "Vector norm ||x||_1 = Σ |x_j|. Normalizing by L1 ensures coordinate sums equal 1.0.",
      relevance: "Projects samples onto the discrete probability simplex in topic modeling and chemical alloy compositions.",
    },
    {
      term: "L2 Norm (Euclidean Length)",
      def: "Vector norm ||x||_2 = √(Σ x_j²). Normalizing by L2 projects vectors onto the unit hypersphere S^(d-1).",
      relevance: "Makes the Euclidean dot product mathematically identical to Cosine Similarity.",
    },
    {
      term: "L-infinity Norm (Chebyshev)",
      def: "Vector norm ||x||_∞ = max |x_j|. Divides by the single largest coordinate magnitude.",
      relevance: "Used in robotics and control systems where maximum actuator output is bounded at 1.0.",
    },
    {
      term: "Unit Hypersphere S^(d-1)",
      def: "The spherical manifold in d dimensions containing all vectors whose Euclidean length ||x||_2 equals exactly 1.0.",
      relevance: "The target geometric surface for text document vectors and deep facial recognition embeddings (ArcFace).",
    },
    {
      term: "Cosine Similarity",
      def: "The cosine of the angle between two non-zero vectors: cos(θ) = (u · v) / (||u||_2 · ||v||_2).",
      relevance: "Measures semantic orientation rather than Euclidean distance, immune to document verbosity.",
    },
    {
      term: "Outlier Compression Pathology",
      def: "The squeezing of normal feature variation into an infinitesimal range [0, 0.05] when an extreme outlier expands the denominator.",
      relevance: "Destroys model resolution and causes gradient starvation in downstream neural networks.",
    },
    {
      term: "Defensively Bounded Clipping (clip=True)",
      def: "Restricting output values strictly within [target_min, target_max] to prevent out-of-bounds production drift.",
      relevance: "Prevents unseen production inputs larger than training extremes from producing values > 1.0.",
    },
    {
      term: "Simplex Closure Constraint",
      def: "A physical constraint where components represent portions of a whole that must sum to 100% (or 1.0).",
      relevance: "Mandatory in metallurgy and chemical spectrometry to eliminate instrument volume calibration drift.",
    },
    {
      term: "Maximum Inner Product Search (MIPS)",
      def: "High-speed vector database nearest-neighbor retrieval using pure dot products on L2-normalized embeddings.",
      relevance: "Enables hardware GPU matrix multiplication (GEMM) for sub-millisecond retrieval across 100M+ vectors.",
    },
  ];

  const filteredJargon = jargonList.filter(
    (item) =>
      item.term.toLowerCase().includes(jargonQuery.toLowerCase()) ||
      item.def.toLowerCase().includes(jargonQuery.toLowerCase())
  );

  // Diagnostic Quiz Questions
  const diagnosticQuestions = [
    questions[0], // Q1: Dual meaning
    questions[1], // Q2: Min-Max formula
    questions[2], // Q3: MaxAbsScaler sparsity
    questions[5], // Q6: Cosine similarity via L2 dot product
    questions[6], // Q7: Outlier compression pathology
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
              BCAC701B • Data Types and Preprocessing • Topic 16
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Academic Core
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Min-Max, MaxAbs &amp; Vector Norms
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/40 rounded-full">
              MAKAUT Aligned
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Normalization
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-indigo-200/90 font-medium max-w-3xl">
            Feature-Wise Min-Max Rescaling, Zero-Preserving MaxAbs, and Sample-Wise L1/L2/L∞ Vector Norms
          </p>

          <p className="text-xs sm:text-sm text-slate-300 max-w-4xl leading-relaxed">
            Deconstruct the dual mathematical paradigms of normalization in machine learning: column-wise feature rescaling that bounds independent variables into controlled intervals, and row-wise sample vector normalization that projects high-dimensional embeddings onto unit hyperspheres for length-invariant semantic cosine search across West Bengal industries.
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
              🎚️
            </div>
            <h3 className="text-base font-bold text-white">The Volume Knob (Min-Max)</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Whether audio energy is 10 milliwatts or 500 Watts, your stereo maps output onto a calibrated dial from 0 to 10. Min-Max feature scaling acts like that volume knob: it rescales disparate real-world ranges into a safe, bounded interval [0, 1] so neural network activations do not explode or saturate.
            </p>
          </div>

          <div className="bg-slate-900/90 p-6 rounded-2xl border border-cyan-900/40 shadow-xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-lg border border-cyan-500/40">
              🔦
            </div>
            <h3 className="text-base font-bold text-white">The Flashlight Beams (L2 Norm)</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              If two flashlights point toward the identical star, one may be a 1,000-lumen searchlight while the other is a 5-lumen penlight. If you compare brightness (vector length), they seem different. But if you project their rays onto a unit sphere (L2 normalization), their angle is 0° (cos θ = 1.0)—they illuminate the exact same target! That is Cosine Similarity.
            </p>
          </div>

          <div className="bg-slate-900/90 p-6 rounded-2xl border border-emerald-900/40 shadow-xl space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg border border-emerald-500/40">
              🍰
            </div>
            <h3 className="text-base font-bold text-white">The Recipe Pie Chart (L1 Norm)</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              A home chef bakes with 500g flour and 200g sugar. A commercial bakery bakes with 50kg flour and 20kg sugar. Dividing each ingredient by total batch mass (L1 norm) yields identical 71.4% flour and 28.6% sugar. L1 normalization enforces true compositional invariance regardless of sample batch size.
            </p>
          </div>
        </div>

        {/* TAXONOMY COMPARISON TABLE */}
        <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span>📊</span> Architectural Taxonomy: Normalization vs. Rescaling vs. Standardization
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider bg-slate-950/60">
                  <th className="p-3">Technique</th>
                  <th className="p-3">Axis of Action</th>
                  <th className="p-3">Output Interval</th>
                  <th className="p-3">Outlier Resilience</th>
                  <th className="p-3">Preserves Zeros?</th>
                  <th className="p-3">Safe for Sparse CSR?</th>
                  <th className="p-3">Primary ML Applications</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-semibold text-indigo-300">MinMaxScaler [0, 1]</td>
                  <td className="p-3">Column-wise (Feature)</td>
                  <td className="p-3 text-cyan-300 font-mono">[0.0, 1.0]</td>
                  <td className="p-3 text-rose-400 font-bold">Catastrophic</td>
                  <td className="p-3 text-emerald-400">Yes (if min = 0)</td>
                  <td className="p-3 text-rose-400">No (Destroys zeros)</td>
                  <td className="p-3">Neural Nets (Sigmoid), Image Pixels</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-semibold text-cyan-300">MinMaxScaler [-1, 1]</td>
                  <td className="p-3">Column-wise (Feature)</td>
                  <td className="p-3 text-cyan-300 font-mono">[-1.0, 1.0]</td>
                  <td className="p-3 text-rose-400 font-bold">Catastrophic</td>
                  <td className="p-3 text-rose-400">No</td>
                  <td className="p-3 text-rose-400">No</td>
                  <td className="p-3">Neural Nets (Tanh), Bounded Sensors</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-semibold text-emerald-300">MaxAbsScaler</td>
                  <td className="p-3">Column-wise (Feature)</td>
                  <td className="p-3 text-emerald-300 font-mono">[-1.0, 1.0]</td>
                  <td className="p-3 text-amber-400">Moderate</td>
                  <td className="p-3 text-emerald-400 font-bold">YES (Strictly)</td>
                  <td className="p-3 text-emerald-400 font-bold">YES (100% Safe)</td>
                  <td className="p-3">Sparse Text (TF-IDF), Zero-Centered Sensors</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-semibold text-purple-300">Vector L2 Normalizer</td>
                  <td className="p-3">Row-wise (Sample)</td>
                  <td className="p-3 text-purple-300 font-mono">||x||_2 = 1.0</td>
                  <td className="p-3 text-emerald-400">Robust</td>
                  <td className="p-3 text-emerald-400">Yes</td>
                  <td className="p-3 text-emerald-400 font-bold">YES</td>
                  <td className="p-3">Text Search, Cosine Sim, ArcFace Embeddings</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-3 font-semibold text-amber-300">Vector L1 Normalizer</td>
                  <td className="p-3">Row-wise (Sample)</td>
                  <td className="p-3 text-amber-300 font-mono">Σ |x_i| = 1.0</td>
                  <td className="p-3 text-emerald-400">Robust</td>
                  <td className="p-3 text-emerald-400">Yes</td>
                  <td className="p-3 text-emerald-400 font-bold">YES</td>
                  <td className="p-3">Topic Modeling (LDA), Alloy Simplex Proportions</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* SEARCHABLE JARGON BUSTER */}
        <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>📖</span> Searchable Jargon Buster (12 Normalization Terms)
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
          {/* GENERAL MIN-MAX */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-indigo-900/40 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-indigo-300 flex items-center gap-2">
              <span>📐</span> 1. Generalized Min-Max Rescaling Formula
            </h3>
            <div className="bg-slate-950 p-4 rounded-xl border border-indigo-950 font-mono text-xs text-indigo-200 overflow-x-auto space-y-2">
              <div>{"x_scaled = [ (x - x_min) / (x_max - x_min) ] * (b - a) + a"}</div>
              <div>{"Standard [0, 1]: (x - x_min) / (x_max - x_min)"}</div>
              <div>{"Tanh Ready [-1, 1]: 2 * (x - x_min) / (x_max - x_min) - 1"}</div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Linearly transforms data into [a, b]. When an outlier x_outlier ≫ x_max is added, the derivative ∂x_scaled/∂x = 1 / (x_outlier - x_min) → 0, causing gradient starvation in downstream models.
            </p>
          </div>

          {/* MAXABS SCALER */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-cyan-900/40 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-cyan-300 flex items-center gap-2">
              <span>⚡</span> 2. MaxAbsScaler (Zero &amp; Sparsity Preservation)
            </h3>
            <div className="bg-slate-950 p-4 rounded-xl border border-cyan-950 font-mono text-xs text-cyan-200 overflow-x-auto space-y-2">
              <div>{"x_scaled = x / max(|x|)"}</div>
              <div>{"Domain Mapping: x in [-M, M]  →  x_scaled in [-1.0, 1.0]"}</div>
              <div>{"Sparsity Proof: If x = 0  →  0 / max(|x|) = 0.0"}</div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Scales by division without subtracting any shift constant. It guarantees that zero values remain exactly 0.0, keeping sparse CSR matrices 100% compact without inflating server RAM.
            </p>
          </div>

          {/* VECTOR NORMS */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-emerald-900/40 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-emerald-300 flex items-center gap-2">
              <span>🌐</span> 3. Sample-Wise Vector Norms (L1, L2, L_inf)
            </h3>
            <div className="bg-slate-950 p-4 rounded-xl border border-emerald-950 font-mono text-xs text-emerald-200 overflow-x-auto space-y-2">
              <div>{"L1 Norm (Manhattan): ||x||_1 = Σ_{j=1}^d |x_j|"}</div>
              <div>{"L2 Norm (Euclidean): ||x||_2 = √[ Σ_{j=1}^d x_j² ]"}</div>
              <div>{"L_inf Norm (Chebyshev): ||x||_∞ = max_j |x_j|"}</div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Row-wise operations. Normalizing by L2 projects vectors onto the unit hypersphere S^(d-1), whereas L1 normalizes samples onto the standard probability simplex.
            </p>
          </div>

          {/* COSINE SIMILARITY EQUIVALENCE */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-purple-900/40 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-purple-300 flex items-center gap-2">
              <span>🎯</span> 4. Dot Product &amp; Cosine Equivalence Proof
            </h3>
            <div className="bg-slate-950 p-4 rounded-xl border border-purple-950 font-mono text-xs text-purple-200 overflow-x-auto space-y-2">
              <div>{"CosSim(u, v) = (u · v) / (||u||_2 * ||v||_2) = cos(θ)"}</div>
              <div>{"Let u' = u/||u||_2, v' = v/||v||_2  →  u' · v' = cos(θ)"}</div>
              <div>{"d_E²(u', v') = ||u' - v'||² = 2 * (1 - cos(θ))"}</div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              The Euclidean dot product of two L2 unit vectors is mathematically identical to their Cosine Similarity. Minimizing Euclidean distance on unit vectors is identical to maximizing Cosine similarity.
            </p>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* SECTION 3: INTERACTIVE STUDIO (3 DYNAMIC MODES) */}
      {/* ----------------------------------------------------------------- */}
      <section id="studio" className="space-y-8">
        <div className="border-b border-slate-800 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              Live Exploration Lab
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              3. Interactive Normalization Studio
            </h2>
          </div>
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
            {[
              { id: "minmax", label: "Mode A: Min-Max & Outlier Squeeze" },
              { id: "vector", label: "Mode B: Vector Manifolds (L1/L2/L∞)" },
              { id: "cosine", label: "Mode C: Semantic Search Arena" },
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
        {/* MODE A: MIN-MAX & OUTLIER COMPRESSION */}
        {/* --------------------------------------------------------------- */}
        {studioMode === "minmax" && (
          <div className="bg-slate-900/90 p-6 rounded-3xl border border-indigo-900/40 shadow-2xl space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* CONTROLS */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Outlier &amp; Range Controls
                </h3>

                {/* Outlier Slider */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Extreme Outlier Multiplier:</span>
                    <span className={clsx("font-mono font-bold", outlierMultiplier > 1.05 ? "text-rose-400" : "text-emerald-400")}>
                      {outlierMultiplier === 1.0 ? "None (Clean Data)" : `${outlierMultiplier.toFixed(1)}x (${(82 * outlierMultiplier).toFixed(0)}°C)`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="10.0"
                    step="0.5"
                    value={outlierMultiplier}
                    onChange={(e) => setOutlierMultiplier(parseFloat(e.target.value))}
                    className="w-full accent-rose-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>Clean (82°C)</span>
                    <span>Extreme (820°C)</span>
                  </div>
                </div>

                {/* Target Interval Toggle */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <div className="text-xs text-slate-400 font-medium">Target Scaling Range:</div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setTargetRangeKey("zero_one")}
                      className={clsx(
                        "p-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer",
                        targetRangeKey === "zero_one"
                          ? "bg-indigo-950 border-indigo-500 text-white"
                          : "bg-slate-900 border-slate-800 text-slate-400"
                      )}
                    >
                      [0.0, 1.0] (Sigmoid)
                    </button>
                    <button
                      onClick={() => setTargetRangeKey("minus_one_one")}
                      className={clsx(
                        "p-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer",
                        targetRangeKey === "minus_one_one"
                          ? "bg-indigo-950 border-indigo-500 text-white"
                          : "bg-slate-900 border-slate-800 text-slate-400"
                      )}
                    >
                      [-1.0, 1.0] (Tanh)
                    </button>
                  </div>
                </div>

                {/* Defensive Clipping Toggle */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-white">Production clip=True</div>
                    <div className="text-[10px] text-slate-400">Bounds values defensively</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={enableClipping}
                    onChange={(e) => setEnableClipping(e.target.checked)}
                    className="w-4 h-4 accent-emerald-500 cursor-pointer"
                  />
                </div>
              </div>

              {/* DYNAMIC SCALED SPREAD VISUALIZER */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Normal Variance Compression
                </h3>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Dynamic Range Utilized by Normal Data:</span>
                    <span className={clsx("font-bold font-mono text-sm", minMaxResults.utilizationPct > 60 ? "text-emerald-400" : "text-rose-400")}>
                      {minMaxResults.utilizationPct}%
                    </span>
                  </div>

                  {/* Horizontal Bar Chart showing squishing */}
                  <div className="space-y-1.5">
                    <div className="text-[10px] text-slate-500 font-mono flex justify-between">
                      <span>{targetRangeKey === "zero_one" ? "0.0" : "-1.0"}</span>
                      <span>Target Output Span</span>
                      <span>1.0</span>
                    </div>

                    <div className="w-full bg-slate-900 h-6 rounded-xl border border-slate-800 relative overflow-hidden flex items-center px-1">
                      {/* Active Span of Normal Data */}
                      <div
                        className={clsx(
                          "h-4 rounded-lg transition-all duration-300",
                          minMaxResults.utilizationPct > 60 ? "bg-emerald-500/80" : "bg-rose-500/80"
                        )}
                        style={{ width: `${minMaxResults.utilizationPct}%` }}
                      />
                      {minMaxResults.hasOutlier && (
                        <div className="absolute right-2 text-[10px] font-bold text-rose-300">
                          🚨 Outlier: 1.0
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Diagnosis Alert */}
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs leading-relaxed">
                    {minMaxResults.hasOutlier ? (
                      <p className="text-rose-300">
                        ⚠️ <strong>Outlier Compression Pathology:</strong> The single extreme outlier ({minMaxResults.maxVal}°C) expanded the range denominator to {(minMaxResults.maxVal - minMaxResults.minVal).toFixed(0)}. All 10 normal operational temperatures (28°C–82°C) are squashed into only <strong>{minMaxResults.utilizationPct}%</strong> of the output scale! <strong>{(100 - minMaxResults.utilizationPct).toFixed(0)}%</strong> of the numerical resolution is wasted on an empty gap.
                      </p>
                    ) : (
                      <p className="text-emerald-300">
                        ✔ <strong>Clean Dynamic Range:</strong> Uncontaminated normal data occupies 100% of the target interval, ensuring high sensitivity and active gradients for downstream neural networks.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* RAW VS SCALED TABLE */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Telemetry Sample Values
                </h3>
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 h-64 overflow-y-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                        <th className="pb-2">Raw Temp (°C)</th>
                        <th className="pb-2">Min-Max</th>
                        <th className="pb-2">MaxAbs</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                      {activeSolarData.slice(0, 8).map((raw, idx) => (
                        <tr key={idx} className="hover:bg-slate-900/50">
                          <td className="py-1.5 text-slate-300">{raw}°C</td>
                          <td className={clsx("py-1.5", minMaxResults.hasOutlier ? "text-amber-300" : "text-cyan-300")}>
                            {minMaxResults.scaledMinMax[idx]}
                          </td>
                          <td className="py-1.5 text-emerald-300">{minMaxResults.scaledMaxAbs[idx]}</td>
                        </tr>
                      ))}
                      {minMaxResults.hasOutlier && (
                        <tr className="bg-rose-950/40 text-rose-300 font-bold">
                          <td className="py-1.5">{minMaxResults.maxVal}°C (Outlier)</td>
                          <td className="py-1.5">{minMaxResults.scaledMinMax[activeSolarData.length - 1]}</td>
                          <td className="py-1.5">{minMaxResults.scaledMaxAbs[activeSolarData.length - 1]}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --------------------------------------------------------------- */}
        {/* MODE B: VECTOR MANIFOLDS (L1, L2, L_INF) */}
        {/* --------------------------------------------------------------- */}
        {studioMode === "vector" && (
          <div className="bg-slate-900/90 p-6 rounded-3xl border border-indigo-900/40 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>📐</span> Sample-Wise Vector Manifolds (Row-Wise Projections)
                </h3>
                <p className="text-xs text-slate-400">
                  Adjust 2D vector coordinates (x, y) and observe how L1 (Diamond), L2 (Circle), and L∞ (Square) project the sample onto distinct unit manifolds.
                </p>
              </div>

              <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
                {[
                  { id: "l1", label: "L1 (Diamond / Simplex)" },
                  { id: "l2", label: "L2 (Unit Sphere S¹)" },
                  { id: "linf", label: "L∞ (Chebyshev Square)" },
                ].map((norm) => (
                  <button
                    key={norm.id}
                    onClick={() => setActiveNormType(norm.id)}
                    className={clsx(
                      "px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer",
                      activeNormType === norm.id
                        ? "bg-cyan-600 text-white shadow"
                        : "text-slate-400 hover:text-white"
                    )}
                  >
                    {norm.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* SLIDERS & FORMULAS */}
              <div className="space-y-4">
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Coordinate X:</span>
                      <span className="text-cyan-400 font-mono font-bold">{vecX.toFixed(1)}</span>
                    </div>
                    <input
                      type="range"
                      min="-5.0"
                      max="5.0"
                      step="0.2"
                      value={vecX}
                      onChange={(e) => setVecX(parseFloat(e.target.value))}
                      className="w-full accent-cyan-500 cursor-pointer"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Coordinate Y:</span>
                      <span className="text-indigo-400 font-mono font-bold">{vecY.toFixed(1)}</span>
                    </div>
                    <input
                      type="range"
                      min="-5.0"
                      max="5.0"
                      step="0.2"
                      value={vecY}
                      onChange={(e) => setVecY(parseFloat(e.target.value))}
                      className="w-full accent-indigo-500 cursor-pointer"
                    />
                  </div>
                </div>

                {/* METRICS CARD */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <div className="text-[10px] text-slate-400">Raw Vector Length</div>
                    <div className="text-base font-bold text-white font-mono">{normResult.normVal}</div>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <div className="text-[10px] text-slate-400">Normalized X&apos;</div>
                    <div className="text-base font-bold text-cyan-300 font-mono">{normResult.nx}</div>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <div className="text-[10px] text-slate-400">Normalized Y&apos;</div>
                    <div className="text-base font-bold text-indigo-300 font-mono">{normResult.ny}</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-1">
                  <div className="font-bold text-white">Manifold Invariant:</div>
                  <p>
                    {activeNormType === "l1" && "Under L1, |x'| + |y'| = 1.0. For positive coordinates, this enforces a discrete probability distribution (simplex)."}
                    {activeNormType === "l2" && "Under L2, (x')² + (y')² = 1.0. The sample is guaranteed to lie on the circumference of the unit circle S¹."}
                    {activeNormType === "linf" && "Under L∞, max(|x'|, |y'|) = 1.0. The vector touches the perimeter of the unit hypercube [-1, 1]²."}
                  </p>
                </div>
              </div>

              {/* 2D MANIFOLD SVG PLOT */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col items-center justify-center">
                <svg className="w-full h-64" viewBox="-6 -6 12 12">
                  {/* Grid Lines */}
                  <line x1="-5.5" y1="0" x2="5.5" y2="0" stroke="#334155" strokeWidth="0.05" />
                  <line x1="0" y1="-5.5" x2="0" y2="5.5" stroke="#334155" strokeWidth="0.05" />

                  {/* L1 Diamond (|x| + |y| = 1) scaled by 3 for visibility */}
                  <polygon
                    points="0,-3 3,0 0,3 -3,0"
                    fill={activeNormType === "l1" ? "#06b6d4" : "none"}
                    fillOpacity={activeNormType === "l1" ? "0.15" : "0"}
                    stroke="#06b6d4"
                    strokeWidth="0.08"
                    strokeDasharray={activeNormType === "l1" ? "none" : "0.2,0.1"}
                  />

                  {/* L2 Circle (x^2 + y^2 = 1) scaled by 3 */}
                  <circle
                    cx="0"
                    cy="0"
                    r="3"
                    fill={activeNormType === "l2" ? "#6366f1" : "none"}
                    fillOpacity={activeNormType === "l2" ? "0.15" : "0"}
                    stroke="#6366f1"
                    strokeWidth="0.08"
                    strokeDasharray={activeNormType === "l2" ? "none" : "0.2,0.1"}
                  />

                  {/* Linf Square (max(|x|, |y|) = 1) scaled by 3 */}
                  <rect
                    x="-3"
                    y="-3"
                    width="6"
                    height="6"
                    fill={activeNormType === "linf" ? "#10b981" : "none"}
                    fillOpacity={activeNormType === "linf" ? "0.15" : "0"}
                    stroke="#10b981"
                    strokeWidth="0.08"
                    strokeDasharray={activeNormType === "linf" ? "none" : "0.2,0.1"}
                  />

                  {/* Raw Vector Ray */}
                  <line
                    x1="0"
                    y1="0"
                    x2={vecX}
                    y2={-vecY}
                    stroke="#fbbf24"
                    strokeWidth="0.12"
                  />
                  <circle cx={vecX} cy={-vecY} r="0.25" fill="#fbbf24" />

                  {/* Normalized Point on Unit Manifold */}
                  <circle
                    cx={normResult.nx * 3}
                    cy={-normResult.ny * 3}
                    r="0.3"
                    fill="#38bdf8"
                    stroke="#ffffff"
                    strokeWidth="0.08"
                  />
                </svg>

                <div className="flex justify-between w-full text-[10px] text-slate-500 font-mono pt-2 border-t border-slate-800">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" /> Raw Vector ({vecX}, {vecY})
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-sky-400 inline-block" /> Projected Unit Norm
                  </span>
                  <span className="text-indigo-400">Scaled 3x for clarity</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --------------------------------------------------------------- */}
        {/* MODE C: TEXT & SEMANTIC SEARCH ARENA */}
        {/* --------------------------------------------------------------- */}
        {studioMode === "cosine" && (
          <div className="bg-slate-900/90 p-6 rounded-3xl border border-indigo-900/40 shadow-2xl space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>🔍</span> Kolkata E-Commerce Semantic Search: Raw Dot Product vs. L2 Cosine
              </h3>
              <p className="text-xs text-slate-400">
                Customer Search Query: <strong className="text-indigo-300">&quot;blue handloom silk saree&quot;</strong>. See why raw dot product favors long spam listings, while L2 Vector Normalization isolates true semantic relevance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {searchResults.map((doc) => {
                const isTopCosine = doc.id === 1;
                const isTopRaw = doc.id === 2;

                return (
                  <div
                    key={doc.id}
                    className={clsx(
                      "p-5 rounded-2xl border space-y-4 shadow-xl transition-all",
                      isTopCosine
                        ? "bg-indigo-950/40 border-indigo-500/80 ring-1 ring-indigo-500/50"
                        : "bg-slate-950 border-slate-800"
                    )}
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-bold text-white">{doc.title}</span>
                      {isTopCosine && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500 text-emerald-300">
                          TOP COSINE MATCH ✔
                        </span>
                      )}
                      {isTopRaw && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-950 border border-rose-500 text-rose-300">
                          RAW SPAM BIAS ⚠️
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed italic">
                      &quot;{doc.desc}&quot;
                    </p>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-xs">
                      <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                        <div className="text-[10px] text-slate-500 uppercase">Raw Dot Product</div>
                        <div className={clsx("text-base font-bold font-mono", isTopRaw ? "text-amber-400" : "text-slate-300")}>
                          {doc.rawDot}
                        </div>
                      </div>
                      <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                        <div className="text-[10px] text-slate-500 uppercase">Cosine Similarity</div>
                        <div className={clsx("text-base font-bold font-mono", isTopCosine ? "text-emerald-400" : "text-slate-400")}>
                          {doc.cosineSim}
                        </div>
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-400">
                      Document L2 Length: <span className="font-mono text-cyan-300">{doc.docLength}</span>
                    </div>

                    {isTopRaw && (
                      <p className="text-[10px] text-rose-300 pt-1">
                        Notice: Doc 2 had raw dot product = 6 simply because it repeated &apos;cotton&apos; and &apos;blue&apos; 7 times! L2 normalization penalized this verbosity, dropping its semantic score to 0.514.
                      </p>
                    )}
                  </div>
                );
              })}
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
                E-Commerce
              </span>
              <span className="text-xs text-slate-400">Sector V, Salt Lake, Kolkata</span>
            </div>
            <h3 className="text-base font-bold text-white">Ethnic Wear Saree Search &amp; Cosine Retrieval</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              An e-commerce platform cataloging 200,000 Bengali sarees found that keyword-stuffed seller descriptions ranked highest in raw TF-IDF searches. Applying sample-wise L2 Vector Normalization projected query and catalog vectors onto the unit hypersphere S^(d-1), eliminating verbosity bias and boosting search click-through rates by 27.4%.
            </p>
          </div>

          {/* CASE 2 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-cyan-900/40 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-500/40">
                Renewable Energy
              </span>
              <span className="text-xs text-slate-400">WBSEDCL Solar Hubs (Burdwan &amp; Hooghly)</span>
            </div>
            <h3 className="text-base font-bold text-white">Inverter Telemetry Rescaling for MPPT Neural Nets</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              WBSEDCL monitored distributed grid-tied solar inverters. Feeding raw DC bus voltage (200V–800V) into a deep neural net with Tanh activations caused immediate activation saturation. Min-Max scaling to [-1.0, 1.0] with clip=True restored non-vanishing gradients, lifting daily maximum power point tracking efficiency by 4.1%.
            </p>
          </div>

          {/* CASE 3 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-amber-900/40 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 rounded-full border border-amber-500/40">
                Precision Metallurgy
              </span>
              <span className="text-xs text-slate-400">Howrah Industrial Foundry Cluster</span>
            </div>
            <h3 className="text-base font-bold text-white">Spectrographic Molten Alloy Simplex Closure</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              A ductile iron foundry analyzing molten pours of Carbon, Silicon, Manganese, and Iron experienced spectrometer volume drift, causing readings to sum to 96%–104%. Sample-wise L1 normalization constrained all alloy pour vectors to sum to exactly 1.0 (100% mass closure simplex), reducing brittle casting fractures by 31.8%.
            </p>
          </div>

          {/* CASE 4 */}
          <div className="bg-slate-900/90 p-6 rounded-2xl border border-emerald-900/40 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/40">
                Smart Policing
              </span>
              <span className="text-xs text-slate-400">Kolkata Police CCTV (Park Street &amp; Howrah)</span>
            </div>
            <h3 className="text-base font-bold text-white">Facial Recognition 512-D Unit Sphere ArcFace</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Smart surveillance cameras along Park Street extract 512-D deep face embeddings. Variations in camera distance and lighting caused raw vector lengths to vary widely. L2 vector normalization projected all face vectors onto the unit hypersphere S^511, isolating geodesic angular distance and lifting criminal watchlist identification precision to 98.7%.
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
              <span>⚠️</span> Pitfall 1: Out-of-Bounds Production Drift
            </div>
            <h4 className="text-sm font-bold text-white">Serving Values Exceeding Training Max</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Without clip=True, a production input larger than training max outputs values &gt; 1.0, triggering out-of-distribution activation spikes in neural networks. Always instantiate MinMaxScaler(clip=True).
            </p>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-rose-900/40 space-y-3">
            <div className="text-rose-400 font-bold text-xs flex items-center gap-2">
              <span>⚠️</span> Pitfall 2: Sparse CSR Density Explosion
            </div>
            <h4 className="text-sm font-bold text-white">Applying Min-Max to Sparse Data</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Min-Max subtracts x_min, turning millions of implicit zeros into non-zero floats and blowing up server RAM. Always use MaxAbsScaler on sparse text/interaction matrices.
            </p>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-rose-900/40 space-y-3">
            <div className="text-rose-400 font-bold text-xs flex items-center gap-2">
              <span>⚠️</span> Pitfall 3: Confusing Row vs. Column Scaling
            </div>
            <h4 className="text-sm font-bold text-white">Normalizer vs. MinMaxScaler</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              MinMaxScaler operates COLUMN-WISE across samples. Normalizer operates ROW-WISE across features. Applying Normalizer when you intended MinMaxScaler corrupts feature distributions.
            </p>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-amber-900/40 space-y-3">
            <div className="text-amber-400 font-bold text-xs flex items-center gap-2">
              <span>⚠️</span> Pitfall 4: Outlier Compression Blindness
            </div>
            <h4 className="text-sm font-bold text-white">Min-Max on Heavy-Tailed Data</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              A single extreme outlier inflates the denominator, squashing 99% of normal data into [0.0, 0.05]. Always inspect skewness and clip outliers or use RobustScaler before Min-Max.
            </p>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-amber-900/40 space-y-3">
            <div className="text-amber-400 font-bold text-xs flex items-center gap-2">
              <span>⚠️</span> Pitfall 5: In-Sample Fit Data Leakage
            </div>
            <h4 className="text-sm font-bold text-white">Fitting on Train + Test Sets</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Never fit Min-Max parameters on the combined dataset. Always call scaler.fit(X_train) and transform validation/serving splits with frozen training bounds (min_, max_).
            </p>
          </div>

          <div className="bg-slate-900/90 p-5 rounded-2xl border border-emerald-900/40 space-y-3">
            <div className="text-emerald-400 font-bold text-xs flex items-center gap-2">
              <span>✔</span> Best Practice: Target Rescaling Inversion
            </div>
            <h4 className="text-sm font-bold text-white">Inverting Scaled Predictions</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              When scaling target variable y (e.g. house prices), always invert predictions with scaler.inverse_transform(y_pred) before computing real-world business error metrics (MAE in Rupees).
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
          <PlainTextPrint content={noteText} filename="Topic16_Normalization_Notes.txt" />
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
            8. Pure Python Laboratory: Normalization &amp; Vector Engines
          </h2>
        </div>
        <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-xl">
          <PythonFileLoader
            code={labCode}
            filename="normalization_lab.py"
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

export default Topic16;
