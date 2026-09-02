import React, { useState, useId } from "react";
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
  const [activeTab, setActiveTab] = useState("theory");

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

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-6xl mx-auto pt-6 pb-12">
      {/* 1. Header Section */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              BCAC701B • Advanced ML • Module 001_001 • Special Topic 21
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Plain Vector &amp; ML Foundations
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Vector Foundations: From Plain Mathematics &amp; Physics to Machine Learning
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl leading-relaxed">
            Understand the plain concept of a vector first! Learn how scalars differ from vectors, how magnitude and direction define geometric arrows, and how physical 2D/3D vectors naturally expand into multi-dimensional Machine Learning feature vectors <InlineMath math="\mathbf{x} \in \mathbb{R}^d" />.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "theory", label: "1. Plain Vector Foundations" },
              { id: "diagram", label: "2. Vector Space Architecture" },
              { id: "interactive", label: "3. Vector Dot Product Studio" },
              { id: "math", label: "4. Mathematical Formulations" },
              { id: "caseStudies", label: "5. Regional Cases" },
              { id: "bestPractices", label: "6. Best Practices" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={clsx(
                  "px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-300 cursor-pointer",
                  activeTab === tab.id
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400"
                    : "bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 border border-slate-700/60"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* 2. Plain Vector Concept First + Teacher's Corner */}
      <section id="theory" className="scroll-mt-6 bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-900 border-2 border-indigo-500/30 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
        <div className="flex items-center gap-3 border-b border-indigo-500/20 pb-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-300 text-xl border border-indigo-500/30">
            🧑‍🏫
          </span>
          <div>
            <h2 className="text-2xl font-black text-indigo-200 tracking-tight">
              Teacher's Corner: Plain Vector Concept (Scalar vs. Vector)
            </h2>
            <p className="text-xs text-indigo-300/80">
              Classroom lesson &amp; storytelling by Teacher (Coder &amp; AccoTax, Barrackpore)
            </p>
          </div>
        </div>

        <div className="space-y-6 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            Welcome students! Before we discuss Machine Learning algorithms, feature spaces, or gradient descent, we must start at the very beginning: <strong>What is a Plain Vector in pure mathematics and physics?</strong>
          </p>

          {/* 1. Plain Scalar vs Vector Explanation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-slate-950 rounded-2xl border border-sky-800/50 space-y-3">
              <h3 className="font-bold text-sky-300 text-base flex items-center gap-2">
                <span>📏</span> 1. What is a Scalar? (Magnitude Only)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                A <strong>Scalar</strong> is a single numerical quantity that has <strong>magnitude (size) only</strong>, but NO direction in space.
              </p>
              <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside bg-slate-900 p-3 rounded-lg border border-slate-800">
                <li>Temperature: <InlineMath math="32^\circ\text{C}" /></li>
                <li>Mass: <InlineMath math="65 \text{ kg}" /></li>
                <li>Speed: <InlineMath math="40 \text{ km/h}" /></li>
                <li>Price of rice in Barrackpore: <InlineMath math="\text{INR }50\text{/kg}" /></li>
              </ul>
            </div>

            <div className="p-5 bg-slate-950 rounded-2xl border border-emerald-800/50 space-y-3">
              <h3 className="font-bold text-emerald-300 text-base flex items-center gap-2">
                <span>🏹</span> 2. What is a Plain Vector? (Magnitude + Direction)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                A <strong>Vector</strong> is a quantity that possesses BOTH <strong>magnitude (length)</strong> AND <strong>direction</strong> in space. Visually, it is drawn as a directed arrow pointing from a tail (origin) to a head (tip).
              </p>
              <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside bg-slate-900 p-3 rounded-lg border border-slate-800">
                <li>Velocity: <InlineMath math="40 \text{ km/h}" /> heading <strong>North-East</strong></li>
                <li>Displacement: <InlineMath math="5 \text{ km}" /> towards <strong>Barrackpore Station</strong></li>
                <li>Force: <InlineMath math="10 \text{ N}" /> directed <strong>downward</strong></li>
                <li>Position in 2D plane: Arrow from origin to <InlineMath math="(x, y) = (4, 3)" /></li>
              </ul>
            </div>
          </div>

          {/* Interactive Classroom Narrative */}
          <div className="p-5 bg-indigo-950/30 rounded-2xl border border-indigo-800/40 space-y-3">
            <h3 className="font-bold text-indigo-200 text-base flex items-center gap-2">
              <span>💬</span> Classroom Discussion at Barrackpore ML Lab
            </h3>
            <p className="text-xs md:text-sm text-slate-300">
              <strong>Teacher:</strong> "If I tell <strong>Swadeep</strong> that a train is traveling at 60 km/h, is that a scalar or a vector?"
            </p>
            <p className="text-xs md:text-sm text-slate-300">
              <strong>Swadeep:</strong> "That's a scalar speed, sir! Because it only tells us how fast it moves, not where it is heading!"
            </p>
            <p className="text-xs md:text-sm text-slate-300">
              <strong>Teacher:</strong> "Correct! Now, what if I tell <strong>Debangshu</strong> that the train is traveling at 60 km/h on a heading of 45 degrees towards Sealdah station?"
            </p>
            <p className="text-xs md:text-sm text-slate-300">
              <strong>Debangshu:</strong> "That's a velocity vector! It has both speed (magnitude) and heading (direction). On graph paper, we draw an arrow starting at the origin and stepping 4 units right and 3 units up: <InlineMath math="\mathbf{v} = [4, 3]^T = 4\mathbf{i} + 3\mathbf{j}" />!"
            </p>
            <p className="text-xs md:text-sm text-slate-300">
              <strong>Teacher:</strong> "Brilliant! And how do we bridge from this plain physical arrow to <strong>Machine Learning</strong>?"
            </p>
            <p className="text-xs md:text-sm text-slate-300">
              <strong>Sachin:</strong> "In physics, the dimensions are spatial axes <InlineMath math="(X, Y, Z)" />. In Machine Learning, the dimensions are customer features <InlineMath math="(\text{Age}, \text{Salary}, \text{Credit Score})" />! A data row in a spreadsheet is simply a vector in feature space!"
            </p>
          </div>

          {/* Bridge: Plain Vector -> ML Feature Vector Grid */}
          <div className="p-5 bg-slate-950 rounded-2xl border border-purple-800/50 space-y-4">
            <div className="flex items-center gap-2 text-purple-300">
              <span className="text-xl">🌉</span>
              <h3 className="font-bold text-base md:text-lg">
                The Bridge: Plain Vector <span className="text-purple-400 font-mono">→</span> ML Feature Vector
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              How does a simple physical arrow generalize into artificial intelligence? Look at how the mathematical definition remains identical while the domain expands:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
              <div className="p-4 bg-slate-900 rounded-xl border border-sky-800/60 space-y-2">
                <span className="font-bold text-sky-400 text-sm block">1D Plain Vector</span>
                <p className="text-slate-300">A single point or offset on a number line:</p>
                <div className="font-mono text-sky-300 bg-slate-950 p-2 rounded border border-slate-800 flex justify-center">
                  <InlineMath math="\mathbf{x} = [x_1] \in \mathbb{R}^1" />
                </div>
                <div className="text-[11px] text-slate-400 pt-1">
                  <strong>ML Feature Mapping:</strong> Single feature attribute (e.g. Student Exam Mark = <InlineMath math="[78]" />).
                </div>
              </div>

              <div className="p-4 bg-slate-900 rounded-xl border border-emerald-800/60 space-y-2">
                <span className="font-bold text-emerald-400 text-sm block">2D Plain Vector</span>
                <p className="text-slate-300">A directed arrow on a 2D Cartesian plane:</p>
                <div className="font-mono text-emerald-300 bg-slate-950 p-2 rounded border border-slate-800 flex justify-center">
                  <InlineMath math="\mathbf{x} = [x_1, x_2]^T \in \mathbb{R}^2" />
                </div>
                <div className="text-[11px] text-slate-400 pt-1">
                  <strong>ML Feature Mapping:</strong> 2-attribute data point (e.g. House Vector = <InlineMath math="[\text{Area}, \text{Price}]^T" />).
                </div>
              </div>

              <div className="p-4 bg-slate-900 rounded-xl border border-purple-500/70 space-y-2">
                <span className="font-bold text-purple-400 text-sm block">d-Dimensional ML Vector</span>
                <p className="text-slate-300">An observation point in d-dimensional space:</p>
                <div className="font-mono text-purple-300 bg-slate-950 p-2 rounded border border-slate-800 flex justify-center">
                  <InlineMath math="\mathbf{x} = [x_1, x_2, \dots, x_d]^T \in \mathbb{R}^d" />
                </div>
                <div className="text-[11px] text-slate-400 pt-1">
                  <strong>ML Feature Mapping:</strong> Full customer profile (e.g. <InlineMath math="[\text{Age}, \text{Income}, \text{Credit Score}, \text{Debt}]^T" />).
                </div>
              </div>
            </div>

            {/* Critical Feature Scaling Insight Box */}
            <div className="p-3.5 bg-purple-950/40 rounded-xl border border-purple-800/60 flex items-start gap-3">
              <span className="text-lg">⚖️</span>
              <div className="space-y-1">
                <h4 className="font-bold text-purple-200 text-xs sm:text-sm">Critical Insight: Why Feature Vectors Require Scaling</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  In plain physics, all vector components share the exact same physical unit (e.g. meters along X, meters along Y). But in a Machine Learning feature vector, <InlineMath math="x_1" /> might be <strong>Age (years)</strong> while <InlineMath math="x_2" /> is <strong>Salary (₹50,000)</strong>! Because raw Salary numbers dominate Euclidean distance, we must <strong>scale/standardize</strong> feature vectors before training models.
                </p>
              </div>
            </div>
          </div>

          {/* 4 Real-Life Teacher Stories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-950/90 rounded-2xl border border-indigo-800/60 space-y-2">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block">
                🚗 Story 1 • GPS Commuter Navigation
              </span>
              <h3 className="font-bold text-white text-sm">Displacement Vectors</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Navigation systems combine distance magnitude and heading angle into a 2D displacement vector <InlineMath math="\mathbf{v} = [\Delta x, \Delta y]^T" /> to guide cars through Barrackpore trunk road.
              </p>
            </div>

            <div className="p-4 bg-slate-950/90 rounded-2xl border border-amber-800/60 space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                📄 Story 2 • Text Document TF-IDF
              </span>
              <h3 className="font-bold text-white text-sm">Word Embedding Vectors</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Spam filters convert emails into high-dimensional word frequency vectors <InlineMath math="\mathbf{x} \in \mathbb{R}^{10000}" /> where each dimension represents a dictionary word score.
              </p>
            </div>

            <div className="p-4 bg-slate-950/90 rounded-2xl border border-emerald-800/60 space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                🛒 Story 3 • Retail Shopper Persona
              </span>
              <h3 className="font-bold text-white text-sm">Purchasing Profile Vector</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Supermarkets in Ichapur represent shopper habits as feature vectors <InlineMath math="\mathbf{x} = [\text{Groceries}, \text{Apparel}, \text{Electronics}]^T" /> to auto-recommend coupons.
              </p>
            </div>

            <div className="p-4 bg-slate-950/90 rounded-2xl border border-rose-800/60 space-y-2">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                🖼️ Story 4 • Image Pixel Flattening
              </span>
              <h3 className="font-bold text-white text-sm">Pixel Feature Vectors</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Digit recognition models unroll a <InlineMath math="28 \times 28" /> pixel grid into a single 784-dimensional continuous pixel intensity vector <InlineMath math="\mathbf{x} \in \mathbb{R}^{784}" />.
              </p>
            </div>
          </div>

          {/* 4-Step Friendly Teacher CNAT Breakdown (What, Why, How, When) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="bg-slate-950 p-4 rounded-xl border border-indigo-800/50 space-y-1.5">
              <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider">❓ WHAT is a Vector?</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Geometrically, a directed arrow with magnitude and direction. Algebraically, an ordered container of <InlineMath math="d" /> numbers <InlineMath math="\mathbf{x} = [x_1, \dots, x_d]^T" />.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-cyan-800/50 space-y-1.5">
              <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">💡 WHY are Vectors Essential in ML?</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Vectorizing code allows CPUs and GPUs to perform hardware SIMD parallel matrix operations, running 50x–1000x faster than traditional Python <InlineMath math="\text{for}" /> loops.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-amber-800/50 space-y-1.5">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">⚙️ HOW do Vector Operations Work?</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Linear models use the dot product <InlineMath math="\mathbf{w}^T \mathbf{x} + b" />. Norms <InlineMath math="\|\mathbf{x}\|_2" /> give geometric length, and cosine similarity <InlineMath math="\cos\theta = \frac{\mathbf{a} \cdot \mathbf{b}}{\|\mathbf{a}\| \|\mathbf{b}\|}" /> gives angle alignment.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-emerald-800/50 space-y-1.5">
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">⏰ WHEN to Standardize Vectors?</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Always scale feature vector components before computing distances (e.g. KNN, K-Means, SVM) so large-magnitude features (Salary ₹) do not drown smaller ones (Age).
              </p>
            </div>
          </div>

          {/* Teacher's Golden Rule */}
          <div className="p-4 bg-amber-950/30 rounded-2xl border border-amber-800/50 flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h4 className="font-bold text-amber-200 text-sm">Teacher's Golden Rule of Vectors in ML</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                "Vectors turn raw real-world data into geometry! Once your data is expressed as vectors, Machine Learning algorithms can compute lengths, measure angles, draw hyperplanes, and optimize loss surfaces." — Teacher
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Semantic Visual SVG Diagram */}
      <section id="diagram" className="scroll-mt-6 space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>⚙️</span> Semantic Visual Diagram: 2D Vector Space &amp; Vector Addition / Dot Product
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto shadow-inner">
          <svg viewBox="0 0 920 320" className="w-full min-w-[750px] font-sans">
            <text x="460" y="25" textAnchor="middle" fill="#38bdf8" className="font-bold text-sm">
              Vector Space Geometry: Vectors A(4, 3) and B(1, 5) in R^2
            </text>

            {/* Coordinate Grid Background */}
            <g transform="translate(100, 50)">
              {/* Axes Grid Lines */}
              <line x1="0" y1="200" x2="400" y2="200" stroke="#334155" strokeWidth="2" />
              <line x1="40" y1="0" x2="40" y2="240" stroke="#334155" strokeWidth="2" />
              <text x="400" y="215" fill="#94a3b8" className="text-xs font-mono">Feature X1</text>
              <text x="45" y="15" fill="#94a3b8" className="text-xs font-mono">Feature X2</text>
              <text x="25" y="215" fill="#94a3b8" className="text-xs font-mono font-bold">O(0,0)</text>

              {/* Grid Tick Marks */}
              <line x1="120" y1="195" x2="120" y2="205" stroke="#475569" strokeWidth="1" />
              <text x="120" y="220" textAnchor="middle" fill="#64748b" className="text-[10px] font-mono">2</text>
              <line x1="200" y1="195" x2="200" y2="205" stroke="#475569" strokeWidth="1" />
              <text x="200" y="220" textAnchor="middle" fill="#64748b" className="text-[10px] font-mono">4</text>
              <line x1="280" y1="195" x2="280" y2="205" stroke="#475569" strokeWidth="1" />
              <text x="280" y="220" textAnchor="middle" fill="#64748b" className="text-[10px] font-mono">6</text>

              <line x1="35" y1="140" x2="45" y2="140" stroke="#475569" strokeWidth="1" />
              <text x="25" y="144" textAnchor="end" fill="#64748b" className="text-[10px] font-mono">3</text>
              <line x1="35" y1="80" x2="45" y2="80" stroke="#475569" strokeWidth="1" />
              <text x="25" y="84" textAnchor="end" fill="#64748b" className="text-[10px] font-mono">6</text>

              {/* Vector A Arrow (from (40,200) to (200, 110)) -> (4, 3) */}
              <line x1="40" y1="200" x2="200" y2="110" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow-sky)" />
              <circle cx="200" cy="110" r="5" fill="#38bdf8" />
              <text x="215" y="110" fill="#7dd3fc" className="text-xs font-bold font-mono">Vector A = [4, 3]^T (||A|| = 5.0)</text>

              {/* Vector B Arrow (from (40,200) to (80, 50)) -> (1, 5) */}
              <line x1="40" y1="200" x2="80" y2="50" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrow-emerald)" />
              <circle cx="80" cy="50" r="5" fill="#10b981" />
              <text x="90" y="45" fill="#6ee7b7" className="text-xs font-bold font-mono">Vector B = [1, 5]^T (||B|| = 5.1)</text>

              {/* Resultant Vector A + B (from (40, 200) to (240, 40)) -> (5, 8) */}
              <line x1="200" y1="110" x2="240" y2="40" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="4,4" />
              <line x1="80" y1="50" x2="240" y2="40" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="4,4" />
              <line x1="40" y1="200" x2="240" y2="40" stroke="#a855f7" strokeWidth="2.5" />
              <circle cx="240" cy="40" r="5" fill="#a855f7" />
              <text x="250" y="35" fill="#c084fc" className="text-xs font-bold font-mono">Sum A + B = [5, 8]^T</text>

              {/* Angle Arc */}
              <path d="M 80 178 A 35 35 0 0 0 52 155" fill="none" stroke="#fbbf24" strokeWidth="2" />
              <text x="85" y="160" fill="#fbbf24" className="text-[11px] font-bold font-mono">θ ≈ 41.6°</text>
            </g>

            {/* Right Side Info Box */}
            <g transform="translate(600, 50)">
              <rect x="0" y="0" width="260" height="200" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1" />
              <text x="130" y="30" textAnchor="middle" fill="#38bdf8" className="text-xs font-bold font-mono">Vector Metrics Summary</text>
              <text x="20" y="65" fill="#cbd5e1" className="text-xs font-mono">• Vector A Dot B: 4×1 + 3×5 = 19</text>
              <text x="20" y="95" fill="#cbd5e1" className="text-xs font-mono">• Norm ||A||: √(4² + 3²) = 5.0</text>
              <text x="20" y="125" fill="#cbd5e1" className="text-xs font-mono">• Norm ||B||: √(1² + 5²) = 5.1</text>
              <text x="20" y="155" fill="#cbd5e1" className="text-xs font-mono">• Cosine Similarity: 19 / 25.5 = 0.745</text>
              <text x="20" y="185" fill="#34d399" className="text-xs font-mono font-bold">• Orientation: Acute Angle (&lt; 90°)</text>
            </g>

            {/* Explanatory footer */}
            <rect x="60" y="275" width="800" height="30" rx="6" fill="#0f172a" stroke="#334155" />
            <text x="460" y="294" textAnchor="middle" fill="#38bdf8" className="text-xs font-mono">
              • Vector Fundamentals: Data points are vectors in R^d; Dot products compute alignment; Norms give length
            </text>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown Section */}
      <section id="math" className="scroll-mt-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">
            01
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Mathematical Formulations &amp; Vector Operations
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Rigorous equation definitions for vector dot products, norms, cosine similarity, and hyperplanes
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Box 1: Dot Product & Linear Model */}
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">1. Dot Product &amp; Linear Prediction</span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              The dot product (inner product) multiplies matching vector components and sums the result. It defines the core prediction equation of linear models:
            </p>
            <div className="text-sm md:text-base font-mono text-indigo-300 bg-indigo-950/40 p-4 rounded-xl border border-indigo-800/60 shadow-inner flex justify-center items-center overflow-x-auto py-3">
              <BlockMath math="\mathbf{a} \cdot \mathbf{b} = \mathbf{a}^T \mathbf{b} = \sum_{i=1}^d a_i b_i = \|\mathbf{a}\| \|\mathbf{b}\| \cos\theta" />
            </div>
            <div className="text-sm md:text-base font-mono text-emerald-300 bg-emerald-950/40 p-3 rounded-xl border border-emerald-800/60 flex justify-center items-center overflow-x-auto">
              <BlockMath math="\hat{y} = \mathbf{w}^T \mathbf{x} + b = w_1 x_1 + w_2 x_2 + \dots + w_d x_d + b" />
            </div>
          </div>

          {/* Box 2: Norms & Distance */}
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">2. Vector Norms (L2 Euclidean &amp; L1 Manhattan)</span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Norms measure vector magnitude (length). The <InlineMath math="L_2" /> Euclidean norm gives straight-line distance; <InlineMath math="L_1" /> Manhattan norm gives grid distance:
            </p>
            <div className="text-sm md:text-base font-mono text-indigo-300 bg-indigo-950/40 p-3 rounded-xl border border-indigo-800/60 flex justify-center items-center overflow-x-auto">
              <BlockMath math="\|\mathbf{x}\|_2 = \sqrt{\mathbf{x}^T \mathbf{x}} = \sqrt{\sum_{i=1}^d x_i^2}" />
            </div>
            <div className="text-sm md:text-base font-mono text-cyan-300 bg-cyan-950/40 p-3 rounded-xl border border-cyan-800/60 flex justify-center items-center overflow-x-auto">
              <BlockMath math="\|\mathbf{x}\|_1 = \sum_{i=1}^d |x_i|" />
            </div>
          </div>

          {/* Box 3: Cosine Similarity */}
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase">3. Cosine Similarity &amp; Cosine Distance</span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Cosine similarity measures directional alignment independent of magnitude. Used heavily in NLP embeddings and recommendation engines:
            </p>
            <div className="text-sm md:text-base font-mono text-purple-300 bg-purple-950/40 p-4 rounded-xl border border-purple-800/60 shadow-inner flex justify-center items-center overflow-x-auto py-3">
              <BlockMath math="\text{CosSim}(\mathbf{a}, \mathbf{b}) = \cos\theta = \frac{\mathbf{a} \cdot \mathbf{b}}{\|\mathbf{a}\|_2 \|\mathbf{b}\|_2}" />
            </div>
            <p className="text-xs text-slate-400">
              Cosine Distance = <InlineMath math="1 - \text{CosSim}(\mathbf{a}, \mathbf{b})" />. Values range from 0 (identical direction) to 2 (opposite direction).
            </p>
          </div>

          {/* Box 4: Unit Vector Normalization */}
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase">4. Unit Vector Normalization</span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Normalizing a vector divides it by its own <InlineMath math="L_2" /> norm to yield a unit vector <InlineMath math="\hat{\mathbf{x}}" /> with length exactly 1.0:
            </p>
            <div className="text-sm md:text-base font-mono text-amber-300 bg-amber-950/40 p-4 rounded-xl border border-amber-800/60 shadow-inner flex justify-center items-center overflow-x-auto py-3">
              <BlockMath math="\hat{\mathbf{x}} = \frac{\mathbf{x}}{\|\mathbf{x}\|_2} \implies \|\hat{\mathbf{x}}\|_2 = 1.0" />
            </div>
            <p className="text-xs text-slate-400">
              When vectors are normalized, dot product equals cosine similarity: <InlineMath math="\hat{\mathbf{a}} \cdot \hat{\mathbf{b}} = \cos\theta" />.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Live Interactive Vector Studio */}
      <section id="interactive" className="scroll-mt-6 bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">
            02
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Live Interactive 2D Vector Simulator
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Adjust vector components for Vector A <InlineMath math="\mathbf{A} = [x_1, y_1]" /> and Vector B <InlineMath math="\mathbf{B} = [x_2, y_2]" /> to see real-time dot products, norms, and angles
            </p>
          </div>
        </div>

        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Vector A Controls */}
            <div className="bg-slate-900 p-4 rounded-xl border border-sky-800/50 space-y-3">
              <div className="text-xs font-bold text-sky-400 uppercase">Vector A Components: A = [{vecAx}, {vecAy}]</div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>x1 component:</span>
                  <span className="font-mono font-bold text-sky-300">{vecAx}</span>
                </div>
                <input
                  type="range"
                  min="-10"
                  max="10"
                  value={vecAx}
                  onChange={(e) => setVecAx(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>y1 component:</span>
                  <span className="font-mono font-bold text-sky-300">{vecAy}</span>
                </div>
                <input
                  type="range"
                  min="-10"
                  max="10"
                  value={vecAy}
                  onChange={(e) => setVecAy(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
                />
              </div>

              <div className="text-xs font-mono text-slate-400 pt-1">
                L2 Length ||A|| = <span className="text-sky-300 font-bold">{normA.toFixed(2)}</span>
              </div>
            </div>

            {/* Vector B Controls */}
            <div className="bg-slate-900 p-4 rounded-xl border border-emerald-800/50 space-y-3">
              <div className="text-xs font-bold text-emerald-400 uppercase">Vector B Components: B = [{vecBx}, {vecBy}]</div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>x2 component:</span>
                  <span className="font-mono font-bold text-emerald-300">{vecBx}</span>
                </div>
                <input
                  type="range"
                  min="-10"
                  max="10"
                  value={vecBx}
                  onChange={(e) => setVecBx(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>y2 component:</span>
                  <span className="font-mono font-bold text-emerald-300">{vecBy}</span>
                </div>
                <input
                  type="range"
                  min="-10"
                  max="10"
                  value={vecBy}
                  onChange={(e) => setVecBy(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              <div className="text-xs font-mono text-slate-400 pt-1">
                L2 Length ||B|| = <span className="text-emerald-300 font-bold">{normB.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Computed Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
            <div className="bg-slate-900 p-4 rounded-lg border border-indigo-900/50 space-y-1">
              <span className="text-[11px] font-bold text-indigo-400 uppercase">Dot Product (A . B)</span>
              <div className="text-2xl font-bold font-mono text-indigo-300">{dotProduct.toFixed(1)}</div>
              <p className="text-[10px] text-slate-400">({vecAx}×{vecBx}) + ({vecAy}×{vecBy})</p>
            </div>

            <div className="bg-slate-900 p-4 rounded-lg border border-cyan-900/50 space-y-1">
              <span className="text-[11px] font-bold text-cyan-400 uppercase">Cosine Similarity</span>
              <div className="text-2xl font-bold font-mono text-cyan-300">{cosSim.toFixed(3)}</div>
              <p className="text-[10px] text-slate-400">cos(θ) ∈ [-1, +1]</p>
            </div>

            <div className="bg-slate-900 p-4 rounded-lg border border-amber-900/50 space-y-1">
              <span className="text-[11px] font-bold text-amber-400 uppercase">Angle Between Vectors</span>
              <div className="text-2xl font-bold font-mono text-amber-300">{angleDeg.toFixed(1)}°</div>
              <p className="text-[10px] text-slate-400">θ = arccos(cosSim)</p>
            </div>

            <div className="bg-slate-900 p-4 rounded-lg border border-emerald-900/50 space-y-1">
              <span className="text-[11px] font-bold text-emerald-400 uppercase">Orientation Status</span>
              <div className="text-sm font-bold font-mono text-emerald-300">
                {angleDeg === 0 ? "Identical Direction (0°)" :
                 angleDeg < 90 ? "Acute Angle (< 90°)" :
                 angleDeg === 90 ? "Orthogonal (90°)" :
                 angleDeg < 180 ? "Obtuse Angle (> 90°)" : "Opposite Direction (180°)"}
              </div>
              <p className="text-[10px] text-slate-400">
                {angleDeg < 90 ? "Positively Correlated" : angleDeg === 90 ? "Independent (Uncorrelated)" : "Negatively Correlated"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Real-World Regional Industrial Case Studies */}
      <section id="caseStudies" className="scroll-mt-6 bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold text-lg">
            03
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Real-World Regional Industrial Applications
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Applied feature vector pipelines across West Bengal business infrastructure
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase">Case 1 • Barrackpore Bank Credit Scoring Vector</span>
            <h3 className="text-base font-bold text-white">Loan Risk Classification</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              The Teacher represented customer profiles as 4D vectors <InlineMath math="\mathbf{x} = [\text{Age}, \text{Salary (INR )}, \text{Credit Score}, \text{Debt}]^T" /> to automate credit risk predictions using vector dot products.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Case 2 • Kolkata Salt Lake IT Resume Matcher</span>
            <h3 className="text-base font-bold text-white">NLP Word Embedding Vectors</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Debangshu built 1,000-dimensional TF-IDF word vectors for job applicant resumes and matched them to job descriptions by computing cosine similarity.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase">Case 3 • Jadavpur Hospital Health Vector</span>
            <h3 className="text-base font-bold text-white">Multi-Metric Emergency Triage</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Mahima represented emergency patient vital signs as health metric vectors to classify ICU admission priority via KNN vector distance matching.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase">Case 4 • Shyamnagar Retail Recommender</span>
            <h3 className="text-base font-bold text-white">Shopping Basket Preference Embeddings</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Tuhina created customer item preference vectors to identify shoppers with high cosine similarity and auto-generate personalized discounts.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Common Pitfalls & Best Practices */}
      <section id="bestPractices" className="scroll-mt-6 bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400 font-bold text-lg">
            04
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Common Pitfalls &amp; Engineering Best Practices
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Key engineering guidelines for working with vectors in production Python ML
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-5 rounded-xl border border-rose-900/40 space-y-3">
            <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
              <span>⚠️</span> Common Pitfalls
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li>Writing slow Python <InlineMath math="\text{for}" /> loops over feature arrays instead of using NumPy vectorized operations.</li>
              <li>Mixing up row vector shape <InlineMath math="(1, d)" /> and column vector shape <InlineMath math="(d, 1)" />, causing matrix multiplication shape errors.</li>
              <li>Computing Euclidean distances on un-standardized raw vectors where large-magnitude features dominate.</li>
            </ul>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-emerald-900/40 space-y-3">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>✔</span> Best Practices
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li>Always use <InlineMath math="\text{np.dot(w, x)}" /> or the <InlineMath math="\text{@}" /> operator for fast SIMD hardware vector multiplication.</li>
              <li>Normalize feature vectors to unit length (<InlineMath math="\|\mathbf{x}\|_2 = 1.0" />) when evaluating cosine similarity in text &amp; embeddings.</li>
              <li>Use standard scalar preprocessors (<InlineMath math="\text{StandardScaler}" />) to ensure zero mean and unit variance across vector components.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 8. Hint Section */}
      <section className="space-y-4 bg-amber-950/20 border border-amber-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
          <span>🤔</span> Think About This...
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          Why is the linear regression equation <InlineMath math="\hat{y} = w_1 x_1 + w_2 x_2 + \dots + w_d x_d + b" /> far more elegantly expressed as the single dot product <InlineMath math="\hat{y} = \mathbf{w}^T \mathbf{x} + b" />?
        </p>
      </section>

      {/* 9. Executable Python Laboratory */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">
            05
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

      {/* 10. FAQ Section */}
      <section className="space-y-4">
        <FAQTemplate
          title="Vector Foundations &amp; Applications — Frequently Asked Questions"
          questions={questions}
        />
      </section>

      {/* 11. Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Vector Foundations: From Math &amp; Physics to Machine Learning"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 21 Note"
          downloadFileName="module_001_001_topic21_note.txt"
        />
      </section>

      {/* 12. Teacher Note */}
      <section>
        <Teacher
          note="Starting with plain vectors—scalars vs vectors, arrows, magnitude, and direction—builds rock-solid mathematical intuition. Once you master plain vectors, transition into high-dimensional feature vectors becomes effortless! — Teacher"
        />
      </section>
    </div>
  );
}
