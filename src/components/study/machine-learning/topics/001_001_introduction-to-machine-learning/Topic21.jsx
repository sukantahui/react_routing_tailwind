import React, { useState, useId, useMemo } from "react";
import clsx from "clsx";
import { InlineMath, BlockMath } from "react-katex";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import labCode from "./topic21_files/vector_in_ml_lab.py?raw";
import noteText from "./topic21_files/topic21_note.txt?raw";
import questions from "./topic21_files/topic21_questions.js";

export default function Topic21() {
  const [activeTab, setActiveTab] = useState("noviceMasterclass");

  // Novice Classroom State
  const [selectedLessonTab, setSelectedLessonTab] = useState("intuition");
  const [selectedJargonCategory, setSelectedJargonCategory] = useState("all");
  const [jargonSearchQuery, setJargonSearchQuery] = useState("");
  const [selectedQuizIndex, setSelectedQuizIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // Live Interactive 2D Vector Simulator State
  const [vecAx, setVecAx] = useState(4);
  const [vecAy, setVecAy] = useState(3);
  const [vecBx, setVecBx] = useState(1);
  const [vecBy, setVecBy] = useState(5);

  const svgId = useId();

  // Vector Math Computations
  const normA = Math.sqrt(vecAx * vecAx + vecAy * vecAy);
  const normB = Math.sqrt(vecBx * vecBx + vecBy * vecBy);
  const dotProduct = vecAx * vecBx + vecAy * vecBy;
  const cosSim = normA > 0 && normB > 0 ? Math.min(1, Math.max(-1, dotProduct / (normA * normB))) : 0;
  const angleRad = Math.acos(cosSim);
  const angleDeg = (angleRad * 180) / Math.PI;

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    const element = document.getElementById(tabId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Comprehensive Jargon Glossary
  const jargonTerms = [
    {
      id: "vector-vs-scalar",
      term: "Scalar vs Vector",
      category: "core",
      badge: "Core Physics & Math",
      badgeColor: "bg-indigo-950 text-indigo-300 border-indigo-800",
      pronunciation: "ˈskeɪ.lər vɜː.səs ˈvɛk.tər",
      plainEnglish: "Scalar has magnitude (size) only (e.g. 35°C temperature). Vector has both magnitude (length) and spatial direction (e.g. 40 km/h heading North-East).",
      everydayAnalogy: "Scalar = Telling a taxi driver 'drive 5 km'; Vector = Telling them 'drive 5 km towards Barrackpore Station'.",
      whyItMatters: "All data observations in Machine Learning are represented as vectors in multi-dimensional space."
    },
    {
      id: "dot-product",
      term: "Dot Product (Inner Product ⟨a, b⟩)",
      category: "operations",
      badge: "Linear Algebra",
      badgeColor: "bg-cyan-950 text-cyan-300 border-cyan-800",
      pronunciation: "dɒt ˈprɒd.ʌkt",
      plainEnglish: "Multiplying corresponding coordinates of two vectors and summing the results: a · b = a₁b₁ + a₂b₂ + ... + a_db_d = ||a|| ||b|| cos(θ).",
      everydayAnalogy: "Measuring how much two people's musical tastes point in the exact same direction.",
      whyItMatters: "Computes predictions in linear models (w · x + b) and powers recommendation engines."
    },
    {
      id: "euclidean-norm",
      term: "L2 Norm (Euclidean Magnitude ||x||₂)",
      category: "norms",
      badge: "Vector Length",
      badgeColor: "bg-emerald-950 text-emerald-300 border-emerald-800",
      pronunciation: "juːˈklɪd.i.ən nɔːm",
      plainEnglish: "The straight-line length of a vector from origin to tip, calculated using the Pythagorean theorem: ||x||₂ = √(x₁² + x₂² + ... + x_d²).",
      everydayAnalogy: "Measuring the physical distance between two cities on a map with a ruler.",
      whyItMatters: "Used to compute distances in KNN and k-Means clustering and penalties in Ridge regression."
    },
    {
      id: "cosine-similarity",
      term: "Cosine Similarity cos(θ)",
      category: "metrics",
      badge: "Angle Metric",
      badgeColor: "bg-purple-950 text-purple-300 border-purple-800",
      pronunciation: "ˈkəʊ.saɪn ˌsɪm.ɪˈlær.ə.ti",
      plainEnglish: "A score between -1.0 and +1.0 measuring the angle between two vectors, regardless of their length.",
      everydayAnalogy: "Two arrows pointing in the exact same direction have cos(θ) = 1.0; perpendicular arrows have cos(θ) = 0.0.",
      whyItMatters: "The primary similarity metric for comparing text documents and AI embeddings."
    },
    {
      id: "vectorization-simd",
      term: "Hardware Vectorization (SIMD)",
      category: "engineering",
      badge: "High Performance",
      badgeColor: "bg-amber-950 text-amber-300 border-amber-800",
      pronunciation: "ˌvɛk.tər.aɪˈzeɪ.ʃən",
      plainEnglish: "Running mathematical operations on entire vector arrays simultaneously using CPU SIMD (Single Instruction Multiple Data) registers rather than slow Python loops.",
      everydayAnalogy: "A stamp printing an entire 100-word page in 1 stamp press instead of handwriting words one letter at a time.",
      whyItMatters: "Speeds up machine learning training by 50x to 200x in NumPy and PyTorch."
    }
  ];

  // Diagnostic Quiz Questions
  const quizQuestions = [
    {
      question: "If two non-zero vectors a and b are perpendicular (orthogonal, at a 90° angle), what is their dot product a · b?",
      options: [
        "1.0",
        "0.0 because cos(90°) = 0.",
        "+∞",
        "-1.0"
      ],
      correctIndex: 1,
      explanation: "a · b = ||a|| ||b|| cos(90°). Since cos(90°) = 0, the dot product of any two orthogonal (perpendicular) vectors is exactly zero."
    },
    {
      question: "Why is Cosine Similarity preferred over Euclidean distance when comparing text document word embeddings?",
      options: [
        "Cosine similarity is faster to type in Python.",
        "Cosine similarity evaluates document topic orientation (angle) independent of document length / word count.",
        "Euclidean distance cannot handle negative numbers.",
        "Cosine similarity only works on English words."
      ],
      correctIndex: 1,
      explanation: "A short 100-word article and a long 5,000-word essay on the same topic will have vastly different Euclidean vector lengths, but their direction vectors point in the exact same angle (high cosine similarity)."
    },
    {
      question: "Why is writing 'for' loops in pure Python slow compared to NumPy vectorized operations like 'np.dot(w, x)'?",
      options: [
        "Python loops delete variables after every iteration.",
        "NumPy delegates vector operations to optimized C/Fortran libraries using CPU SIMD hardware instructions.",
        "NumPy converts numbers to text before multiplying.",
        "Python loops only run on 1 bit of memory."
      ],
      correctIndex: 1,
      explanation: "NumPy vectorized operations execute compiled C code with SIMD (Single Instruction Multiple Data) processor registers, computing 8 to 16 floating-point multiplications per clock cycle without Python bytecode overhead."
    }
  ];

  // Filtered Jargon Glossary
  const filteredJargon = useMemo(() => {
    return jargonTerms.filter((item) => {
      const matchesCategory =
        selectedJargonCategory === "all" || item.category === selectedJargonCategory;
      const matchesSearch =
        item.term.toLowerCase().includes(jargonSearchQuery.toLowerCase()) ||
        item.plainEnglish.toLowerCase().includes(jargonSearchQuery.toLowerCase()) ||
        item.everydayAnalogy.toLowerCase().includes(jargonSearchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedJargonCategory, jargonSearchQuery]);

  return (
    <div className="space-y-10 text-slate-200 leading-relaxed max-w-6xl mx-auto pb-16 px-4 sm:px-6">
      {/* 1. Header Section */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 rounded-3xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              BCAC701B • Advanced ML • Module 001_001 • Special Topic 21
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Plain Vector &amp; ML Foundations
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-full">
              Linear Algebra Core
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Vector Foundations: From Math &amp; Physics to Machine Learning
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl leading-relaxed">
            Understand vectors from the ground up! Learn how scalars differ from vectors, how magnitude and direction define geometric arrows, and how physical 2D/3D vectors naturally expand into multi-dimensional Machine Learning feature vectors <InlineMath math="\mathbf{x} \in \mathbb{R}^d" />.
          </p>

          <div className="flex flex-wrap gap-2 pt-3">
            {[
              { id: "noviceMasterclass", label: "🎓 Master Teacher's Classroom", icon: "👨‍🏫" },
              { id: "interactiveStudio", label: "⚡ Interactive Vector Studio", icon: "🔬" },
              { id: "math", label: "📐 Mathematical Formulations", icon: "⚙️" },
              { id: "caseStudies", label: "🏭 Regional Industrial Cases", icon: "🏢" },
              { id: "diagnosticQuiz", label: "📝 Knowledge Diagnostic Check", icon: "✨" },
              { id: "bestPractices", label: "🛡️ Pitfalls & Best Practices", icon: "⚠️" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={clsx(
                  "px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-300 flex items-center gap-2 cursor-pointer",
                  activeTab === tab.id
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/40 border border-indigo-400"
                    : "bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 border border-slate-700/60"
                )}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* SECTION 0: MASTER TEACHER'S CLASSROOM */}
      <section
        id="noviceMasterclass"
        className="bg-slate-900/95 p-6 sm:p-10 rounded-3xl border border-indigo-900/50 shadow-2xl space-y-8 relative overflow-hidden"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-2xl shadow-lg shadow-indigo-600/30">
              👨‍🏫
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 font-mono">
                Teacher Sukanta Hui's Foundational Lecture
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Plain Vector Foundations: From Physics Arrows to ML Feature Space
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-slate-800/90 px-4 py-2 rounded-xl border border-slate-700 text-xs text-slate-300 font-mono">
            <span>⏱️ 14 min math guide</span>
          </div>
        </div>

        {/* Teacher's Welcome Dialogue */}
        <div className="bg-gradient-to-r from-indigo-950/60 via-slate-900 to-indigo-950/60 p-6 rounded-2xl border border-indigo-800/40 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
            <span>👋 Welcome, student! Let us build rock-solid intuition for the fundamental object of linear algebra: the Vector.</span>
          </div>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            In physics, a vector is a directed arrow pointing from the origin to a destination with a specific length (magnitude) and angle (direction). In Machine Learning, we generalize this concept: a student's profile [Attendance: 90%, Study Hours: 17h, Quiz Score: 88%] is simply an arrow living in a 3-dimensional coordinate space!
          </p>
        </div>

        {/* Sub-Lesson Tabs */}
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
            {[
              { id: "intuition", label: "1. Scalar vs Vector", icon: "🏹" },
              { id: "dotIntuition", label: "2. The Dot Product Meaning", icon: "📐" },
              { id: "jargon", label: "3. Jargon Buster Glossary", icon: "📖" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedLessonTab(tab.id)}
                className={clsx(
                  "px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer",
                  selectedLessonTab === tab.id
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "bg-slate-800 text-slate-400 hover:text-slate-200"
                )}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {selectedLessonTab === "intuition" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-5 bg-slate-950 rounded-2xl border border-sky-800/50 space-y-3">
                <h3 className="font-bold text-sky-300 text-base flex items-center gap-2">
                  <span>📏</span> 1. What is a Scalar? (Magnitude Only)
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  A Scalar is a single number describing size or amount without any spatial direction.
                </p>
                <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside bg-slate-900 p-3 rounded-lg border border-slate-800 font-mono">
                  <li>Temperature: 32°C</li>
                  <li>Mass: 65 kg</li>
                  <li>Speed: 40 km/h</li>
                  <li>Price of rice: ₹50/kg</li>
                </ul>
              </div>

              <div className="p-5 bg-slate-950 rounded-2xl border border-emerald-800/50 space-y-3">
                <h3 className="font-bold text-emerald-300 text-base flex items-center gap-2">
                  <span>🏹</span> 2. What is a Vector? (Magnitude + Direction)
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  A Vector has both magnitude (length) and a specific spatial pointing angle.
                </p>
                <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside bg-slate-900 p-3 rounded-lg border border-slate-800 font-mono">
                  <li>Velocity: 40 km/h heading North-East</li>
                  <li>Displacement: 5 km towards Barrackpore Station</li>
                  <li>Force: 10 N directed downward</li>
                  <li>ML Feature: [Attendance=90, Hours=17, Quiz=88]^T</li>
                </ul>
              </div>
            </div>
          )}

          {selectedLessonTab === "dotIntuition" && (
            <div className="space-y-4 pt-2">
              <div className="bg-slate-950 p-6 rounded-2xl border border-indigo-900/40 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>📐</span> What the Dot Product ⟨a, b⟩ Actually Measures
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  The dot product multiplies the length of vector a by the length of vector b and their directional alignment:
                </p>
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-center font-mono text-cyan-300 text-base">
                  {"a · b = ||a|| · ||b|| · cos(θ)"}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono text-center">
                  <div className="bg-emerald-950/60 p-3 rounded-xl border border-emerald-800 text-emerald-300">
                    θ = 0° (Same Direction) ➔ a·b = Maximum Positive
                  </div>
                  <div className="bg-amber-950/60 p-3 rounded-xl border border-amber-800 text-amber-300">
                    θ = 90° (Perpendicular) ➔ a·b = Exactly 0
                  </div>
                  <div className="bg-rose-950/60 p-3 rounded-xl border border-rose-800 text-rose-300">
                    θ = 180° (Opposite) ➔ a·b = Maximum Negative
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedLessonTab === "jargon" && (
            <div className="space-y-6 pt-2">
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: "all", label: "All Terms" },
                    { id: "core", label: "Core Vectors" },
                    { id: "operations", label: "Operations" },
                    { id: "norms", label: "Norms & Length" },
                    { id: "metrics", label: "Similarity" }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedJargonCategory(cat.id)}
                      className={clsx(
                        "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                        selectedJargonCategory === cat.id
                          ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                          : "bg-slate-800 text-slate-400 hover:text-slate-200"
                      )}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search vector jargon..."
                    value={jargonSearchQuery}
                    onChange={(e) => setJargonSearchQuery(e.target.value)}
                    className="w-full sm:w-64 bg-slate-950 border border-slate-700 text-xs px-3.5 py-2 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                  {jargonSearchQuery && (
                    <button
                      onClick={() => setJargonSearchQuery("")}
                      className="absolute right-3 top-2 text-xs text-slate-400 hover:text-white"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredJargon.map((item) => (
                  <div
                    key={item.id}
                    className="bg-slate-950 p-5 rounded-2xl border border-slate-800 hover:border-indigo-500/50 transition-all space-y-3 shadow-lg"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-sm font-bold text-white tracking-wide">{item.term}</h4>
                        <span className="text-[11px] font-mono text-slate-400">{item.pronunciation}</span>
                      </div>
                      <span className={clsx("px-2 py-0.5 text-[10px] font-mono uppercase font-bold rounded border", item.badgeColor)}>
                        {item.badge}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <div>
                        <strong className="text-cyan-400 font-medium">Simple Meaning: </strong>
                        <span className="text-slate-300">{item.plainEnglish}</span>
                      </div>
                      <div>
                        <strong className="text-amber-400 font-medium">Everyday Analogy: </strong>
                        <span className="text-slate-300">{item.everydayAnalogy}</span>
                      </div>
                      <div>
                        <strong className="text-indigo-400 font-medium">Why It Matters: </strong>
                        <span className="text-slate-400">{item.whyItMatters}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 1: INTERACTIVE 2D VECTOR STUDIO */}
      <section
        id="interactiveStudio"
        className="bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6"
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">
            01
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Interactive 2D Vector Geometry &amp; Dot Product Studio
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Drag vector coordinate sliders, visualize live arrows on the Cartesian plane, and compute Euclidean norms and Cosine similarity
            </p>
          </div>
        </div>

        {/* Sliders & Math Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono">
              Vector a Controls: <InlineMath math="\mathbf{a} = [a_x, a_y]^T" />
            </h3>

            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">a_x:</span>
                  <span className="text-cyan-400 font-bold">{vecAx}</span>
                </div>
                <input
                  type="range"
                  min="-6"
                  max="6"
                  value={vecAx}
                  onChange={(e) => setVecAx(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">a_y:</span>
                  <span className="text-cyan-400 font-bold">{vecAy}</span>
                </div>
                <input
                  type="range"
                  min="-6"
                  max="6"
                  value={vecAy}
                  onChange={(e) => setVecAy(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </div>
            </div>

            <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono pt-2 border-t border-slate-800">
              Vector b Controls: <InlineMath math="\mathbf{b} = [b_x, b_y]^T" />
            </h3>

            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">b_x:</span>
                  <span className="text-emerald-400 font-bold">{vecBx}</span>
                </div>
                <input
                  type="range"
                  min="-6"
                  max="6"
                  value={vecBx}
                  onChange={(e) => setVecBx(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">b_y:</span>
                  <span className="text-emerald-400 font-bold">{vecBy}</span>
                </div>
                <input
                  type="range"
                  min="-6"
                  max="6"
                  value={vecBy}
                  onChange={(e) => setVecBy(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Right: Live Vector Metrics */}
          <div className="lg:col-span-6 bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
              Calculated Vector Algebra Metrics
            </span>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400">Norm ||a||₂:</span>
                <div className="text-cyan-400 font-bold text-base">{normA.toFixed(2)}</div>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400">Norm ||b||₂:</span>
                <div className="text-emerald-400 font-bold text-base">{normB.toFixed(2)}</div>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400">Dot Product ⟨a, b⟩:</span>
                <div className="text-amber-400 font-bold text-base">{dotProduct.toFixed(1)}</div>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400">Cosine Similarity:</span>
                <div className="text-purple-400 font-bold text-base">{cosSim.toFixed(3)}</div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 flex justify-between items-center">
              <span>Angle Between Vectors (θ):</span>
              <span className="text-white font-bold">{angleDeg.toFixed(1)}°</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: MATHEMATICAL FORMULATIONS */}
      <section
        id="math"
        className="bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6"
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">
            02
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Mathematical Formulations &amp; Norm Taxonomy
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Formal mathematical representations of dot products, Euclidean norms, and cosine distance
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">1. The Inner Product &amp; Angle Relation</span>
            <div className="text-xs font-mono text-indigo-300 bg-slate-900 p-3 rounded-lg border border-slate-800 overflow-x-auto">
              {"\\mathbf{a} \\cdot \\mathbf{b} = \\sum_{i=1}^d a_i b_i = \\|\\mathbf{a}\\|_2 \\|\\mathbf{b}\\|_2 \\cos(\\theta)"}
            </div>
            <p className="text-xs text-slate-400">
              When vectors are normalized (<InlineMath math="\|\mathbf{a}\| = \|\mathbf{b}\| = 1" />), the dot product equals the cosine similarity.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">2. Vector L_p Norm Family</span>
            <div className="text-xs font-mono text-emerald-300 bg-slate-900 p-3 rounded-lg border border-slate-800 overflow-x-auto">
              {"\\|\\mathbf{x}\\|_p = \\left( \\sum_{i=1}^d |x_i|^p \\right)^{1/p}"}
            </div>
            <p className="text-xs text-slate-400">
              <InlineMath math="p=1" /> gives Manhattan Norm (L1 Lasso); <InlineMath math="p=2" /> gives Euclidean Norm (L2 Ridge).
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: REGIONAL INDUSTRIAL CASE STUDIES */}
      <section
        id="caseStudies"
        className="bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6"
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold text-lg">
            03
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Real-World Regional Industrial Applications
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Applied high-dimensional vector search and embeddings in West Bengal
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase">Case 1 • Salt Lake Sector V AI Search</span>
            <h3 className="text-base font-bold text-white">Dense Vector Embeddings &amp; HNSW Search</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Debangshu engineered a 768-dimensional dense vector search engine utilizing cosine similarity and HNSW indexing, querying 10 million legal contracts in 15ms.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Case 2 • Barrackpore Academic Lab</span>
            <h3 className="text-base font-bold text-white">Student Academic Vector Closeness</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Mamata and Mahima mapped 1,200 student profiles into normalized 4D vectors, using Euclidean distance to form balanced study partner peer groups.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase">Case 3 • Ichapur Retail Center</span>
            <h3 className="text-base font-bold text-white">Customer RFM Feature Vectors</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Susmita constructed 3D RFM customer vectors, standardizing coordinates with StandardScaler to ensure fair geometric clustering in k-Means.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase">Case 4 • Jadavpur Medical Imaging Hub</span>
            <h3 className="text-base font-bold text-white">Pathology Image Feature Embeddings</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Abhronila extracted 512-dimensional bottleneck feature vectors from deep ResNet models to find visually similar historical biopsy scans via cosine distance.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: DIAGNOSTIC QUIZ */}
      <section
        id="diagnosticQuiz"
        className="bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6"
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-400 font-bold text-lg">
            04
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Interactive Knowledge Diagnostic Check
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Test your understanding of linear algebra vectors, dot products, and cosine similarity
            </p>
          </div>
        </div>

        <div className="bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
          <div className="flex justify-between items-center text-xs font-mono text-slate-400 border-b border-slate-800 pb-3">
            <span>Question {selectedQuizIndex + 1} of {quizQuestions.length}</span>
            <span className="text-indigo-400 font-bold">Vector Concept Check</span>
          </div>

          <p className="text-base sm:text-lg font-bold text-white">
            {quizQuestions[selectedQuizIndex].question}
          </p>

          <div className="space-y-3">
            {quizQuestions[selectedQuizIndex].options.map((opt, idx) => {
              const isSelected = userAnswer === idx;
              const isCorrect = idx === quizQuestions[selectedQuizIndex].correctIndex;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setUserAnswer(idx);
                    setShowFeedback(true);
                  }}
                  className={clsx(
                    "w-full text-left p-4 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between",
                    showFeedback
                      ? isCorrect
                        ? "bg-emerald-950/80 border-emerald-500 text-emerald-200"
                        : isSelected
                        ? "bg-rose-950/80 border-rose-500 text-rose-200"
                        : "bg-slate-900 border-slate-800 text-slate-400"
                      : isSelected
                      ? "bg-indigo-600/30 border-indigo-400 text-white"
                      : "bg-slate-900 hover:bg-slate-850 border-slate-800 text-slate-300"
                  )}
                >
                  <span>{opt}</span>
                  {showFeedback && isCorrect && <span className="font-bold text-emerald-400">✔ Correct</span>}
                  {showFeedback && isSelected && !isCorrect && <span className="font-bold text-rose-400">❌ Incorrect</span>}
                </button>
              );
            })}
          </div>

          {showFeedback && (
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase font-mono">Teacher's Explanation:</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {quizQuestions[selectedQuizIndex].explanation}
              </p>
            </div>
          )}

          <div className="flex justify-between items-center pt-2">
            <button
              onClick={() => {
                setSelectedQuizIndex((prev) => Math.max(0, prev - 1));
                setUserAnswer(null);
                setShowFeedback(false);
              }}
              disabled={selectedQuizIndex === 0}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-xs font-semibold rounded-lg border border-slate-700 text-slate-300 cursor-pointer"
            >
              ← Previous Question
            </button>
            <button
              onClick={() => {
                setSelectedQuizIndex((prev) => Math.min(quizQuestions.length - 1, prev + 1));
                setUserAnswer(null);
                setShowFeedback(false);
              }}
              disabled={selectedQuizIndex === quizQuestions.length - 1}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-xs font-semibold rounded-lg text-white cursor-pointer"
            >
              Next Question →
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 5: PITFALLS & BEST PRACTICES */}
      <section
        id="bestPractices"
        className="bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6"
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400 font-bold text-lg">
            05
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Vector Algebra Pitfalls &amp; Best Practices
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Crucial engineering rules for working with vectors in high-performance Python
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-2xl border border-rose-900/40 space-y-3">
            <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
              <span>⚠️</span> 4 Dangerous Vector Traps
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li><strong className="text-rose-300">Slow Python For Loops:</strong> Iterating over vector elements instead of calling NumPy vectorized operations.</li>
              <li><strong className="text-rose-300">Dimension Shape Mismatch:</strong> Multiplying row vector (1, d) against (1, d) instead of column transpose (d, 1).</li>
              <li><strong className="text-rose-300">Unscaled Euclidean Distances:</strong> Letting large salary coordinates overpower smaller age coordinates.</li>
              <li><strong className="text-rose-300">Dividing by Zero in Cosine Sim:</strong> Forgetting to handle zero vectors with norm ||x|| = 0.</li>
            </ul>
          </div>

          <div className="bg-slate-950 p-6 rounded-2xl border border-emerald-900/40 space-y-3">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>✔</span> 4 Best Practice Vector Rules
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li><strong className="text-emerald-300">Use NumPy &amp; SIMD Hardware:</strong> Compute dot products with <code className="text-cyan-300 bg-slate-900 px-1 rounded">np.dot(w, x)</code> or the <code className="text-cyan-300 bg-slate-900 px-1 rounded">@</code> operator.</li>
              <li><strong className="text-emerald-300">Normalize to Unit Length:</strong> Scale vectors to unit norm (<InlineMath math="\|\mathbf{x}\|_2 = 1.0" />) for cosine distance search.</li>
              <li><strong className="text-emerald-300">Standardize Features First:</strong> Use <code className="text-cyan-300 bg-slate-900 px-1 rounded">StandardScaler</code> before measuring Euclidean distances.</li>
              <li><strong className="text-emerald-300">Check Matrix Orientations:</strong> Verify design matrix dimensions match <InlineMath math="\mathbf{X} \in \mathbb{R}^{N \times d}" />.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* PYTHON LABORATORY */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">
            06
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Executable Python Laboratory Simulation
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Interactive standalone lab script for Plain Vector Concepts, Vector Operations &amp; Vectorization Speedup
            </p>
          </div>
        </div>

        <PythonFileLoader
          fileModule={labCode}
          title="vector_in_ml_lab.py"
          highlightLines={[12, 25, 36, 45, 58]}
        />
      </section>

      {/* FAQ TEMPLATE */}
      <section className="space-y-4">
        <FAQTemplate
          title="Vector Foundations & Applications — Frequently Asked Questions"
          questions={questions}
        />
      </section>

      {/* PRINTABLE NOTE */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Vector Foundations: From Math & Physics to Machine Learning"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 21 Note"
          downloadFileName="module_001_001_topic21_note.txt"
        />
      </section>

      {/* TEACHER NOTE */}
      <section>
        <Teacher
          note="Starting with plain vectors—scalars vs vectors, arrows, magnitude, and direction—builds rock-solid mathematical intuition. Once you master plain vectors, transitioning into high-dimensional feature vectors becomes effortless! — Teacher Sukanta Hui"
        />
      </section>
    </div>
  );
}
