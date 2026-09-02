import React, { useState, useId } from "react";
import clsx from "clsx";
import { InlineMath, BlockMath } from "react-katex";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import labCode from "./topic2_files/distance_metrics_lab.py?raw";
import noteText from "./topic2_files/topic2_note.txt?raw";
import questions from "./topic2_files/topic2_questions.js";

export default function Topic2() {
  const [activeTab, setActiveTab] = useState("theory");
  const [deltaX, setDeltaX] = useState(3);
  const [deltaY, setDeltaY] = useState(4);
  const svgId = useId();

  // Calculated distance metrics
  const l2_euclidean = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  const l1_manhattan = Math.abs(deltaX) + Math.abs(deltaY);
  const l_chebyshev = Math.max(Math.abs(deltaX), Math.abs(deltaY));

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
              BCAC701B • Advanced ML • Module 006_001 • Topic 2
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Metric Space &amp; Proximity Geometry
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Distance-Based Clustering &amp; Metric Topology
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl leading-relaxed">
            Welcome! Today, let's explore the beautiful geometry of closeness. Master the mathematics of proximity across <strong>Euclidean (<InlineMath math="L_2" />)</strong>, <strong>Manhattan (<InlineMath math="L_1" />)</strong>, <strong>Chebyshev (<InlineMath math="L_\infty" />)</strong>, and <strong>Cosine</strong> distances, learn how to construct <InlineMath math="N \times N" /> dissimilarity matrices, and discover how distance choices shape cluster boundaries in K-Medoids.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "theory", label: "1. Core Metric Mathematics" },
              { id: "interactive", label: "2. Live Metric Simulator" },
              { id: "caseStudies", label: "3. Regional Industrial Cases" },
              { id: "bestPractices", label: "4. Pitfalls & Best Practices" }
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

      {/* 2. Dedicated Topic Description (What, Why, How, When) + CNAT Classroom */}
      <section className="bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-900 border-2 border-indigo-500/30 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
        <div className="flex items-center gap-3 border-b border-indigo-500/20 pb-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-300 text-xl border border-indigo-500/30">
            🧑‍🏫
          </span>
          <div>
            <h2 className="text-2xl font-black text-indigo-200 tracking-tight">
              Teacher's Corner: Crow Flights, City Streets &amp; Chessboard Kings
            </h2>
            <p className="text-xs text-indigo-300/80">
              Classroom lesson &amp; storytelling by Sukanta Hui (Coder &amp; AccoTax, Barrackpore)
            </p>
          </div>
        </div>

        <div className="space-y-5 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            Hello students! Measuring distance seems simple when using a ruler on paper, but in machine learning, distance depends entirely on the world your data lives in! Let's explore how different distance metrics reshape physical and mathematical reality.
          </p>

          {/* Interactive Classroom Narrative */}
          <div className="p-4 bg-indigo-950/30 rounded-2xl border border-indigo-800/40 space-y-2">
            <h3 className="font-bold text-indigo-200 text-sm md:text-base flex items-center gap-2">
              <span>💬</span> Classroom Discussion at Barrackpore ML Lab
            </h3>
            <p className="text-xs md:text-sm text-slate-300">
              <strong>Sukanta Hui:</strong> "Imagine <strong>Swadeep</strong> wants to walk from Barrackpore Railway Station to Anandapuri Market. Can he fly in a straight diagonal line through buildings and trees?"
            </p>
            <p className="text-xs md:text-sm text-slate-300">
              <strong>Tuhina:</strong> "No, Sir! Unless Swadeep is a crow, he must walk along the rectangular streets of Barrackpore Bazaar!"
            </p>
            <p className="text-xs md:text-sm text-slate-300">
              <strong>Sukanta Hui:</strong> "Exactly! That straight-line crow path is <strong>Euclidean Distance (<InlineMath math="L_2" />)</strong>, while the street grid walk is <strong>Manhattan Distance (<InlineMath math="L_1" />)</strong>. And if <strong>Debangshu</strong> is playing chess, the King moves 1 step diagonally just as easily as 1 step forward—that is <strong>Chebyshev Distance (<InlineMath math="L_\infty" />)</strong>!"
            </p>
          </div>

          {/* 4 Real-Life Teacher Stories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Story 1 */}
            <div className="p-4 bg-slate-950/90 rounded-2xl border border-indigo-800/60 space-y-2">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block">
                🐦 Story 1 • Crow vs. Commuter
              </span>
              <h3 className="font-bold text-white text-sm">Euclidean (<InlineMath math="L_2" />) vs. Manhattan (<InlineMath math="L_1" />)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Euclidean measures straight-line hypotenuse distance <InlineMath math="\sqrt{\Delta x^2 + \Delta y^2}" />. Manhattan measures grid steps <InlineMath math="|\Delta x| + |\Delta y|" />, making it ideal for city logistics and outlier-robust clustering.
              </p>
            </div>

            {/* Story 2 */}
            <div className="p-4 bg-slate-950/90 rounded-2xl border border-amber-800/60 space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                👑 Story 2 • The Chessboard King
              </span>
              <h3 className="font-bold text-white text-sm">Chebyshev Distance (<InlineMath math="L_\infty" />)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                In chess, a King takes 1 turn to move from (0,0) to (1,1). The metric is defined by the maximum single coordinate shift <InlineMath math="\max(|\Delta x|, |\Delta y|)" />, crucial for warehouse crane &amp; 8-way movement routing.
              </p>
            </div>

            {/* Story 3 */}
            <div className="p-4 bg-slate-950/90 rounded-2xl border border-emerald-800/60 space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                📚 Story 3 • The Document Storyteller
              </span>
              <h3 className="font-bold text-white text-sm">Cosine Angle Distance</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                When <strong>Sachin</strong> clusters legal contracts, document length varies wildy. Cosine distance measures the <em>angle between word frequency vectors</em>, ignoring length so a 5-page summary clusters with a 500-page book on the same topic!
              </p>
            </div>

            {/* Story 4 */}
            <div className="p-4 bg-slate-950/90 rounded-2xl border border-rose-800/60 space-y-2">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                🧬 Story 4 • DNA &amp; Shopping Baskets
              </span>
              <h3 className="font-bold text-white text-sm">Non-Euclidean Dissimilarities</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                When <strong>Susmita</strong> compares gene sequences or retail customer baskets, there are no Cartesian coordinates. K-Medoids accepts arbitrary edit (Levenshtein) or Jaccard distances via an <InlineMath math="N \times N" /> matrix!
              </p>
            </div>
          </div>

          {/* 4-Step Friendly Teacher CNAT Breakdown (What, Why, How, When) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="bg-slate-950 p-4 rounded-xl border border-indigo-800/50 space-y-1.5">
              <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider">❓ WHAT is a Metric Space?</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                A formal mathematical rule <InlineMath math="D(x, y)" /> satisfying 4 axioms: Non-negativity (<InlineMath math="D \ge 0" />), Identity (<InlineMath math="D(x,y)=0 \iff x=y" />), Symmetry (<InlineMath math="D(x,y)=D(y,x)" />), and Triangle Inequality (<InlineMath math="D(x,z) \le D(x,y)+D(y,z)" />).
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-cyan-800/50 space-y-1.5">
              <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">💡 WHY Does Choice Matter?</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                The distance metric defines the <strong>geometry of cluster borders</strong>! Euclidean creates circles, Manhattan forms diamonds, Chebyshev creates squares, and Cosine creates angular cone slices.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-amber-800/50 space-y-1.5">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">⚙️ HOW Are They Formulated?</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Minkowski family <InlineMath math="D_p = (\sum |x_i - y_i|^p)^{1/p}" /> unifies <InlineMath math="p=1" /> (Manhattan), <InlineMath math="p=2" /> (Euclidean), and <InlineMath math="p \to \infty" /> (Chebyshev). Cosine uses dot product <InlineMath math="1 - \frac{x \cdot y}{\|x\| \|y\|}" />.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-emerald-800/50 space-y-1.5">
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">⏰ WHEN to Use Which?</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Use <strong>Euclidean</strong> for continuous physical space; <strong>Manhattan</strong> for street/grid networks and noisy data; <strong>Cosine</strong> for text/NLP; <strong>Jaccard/Edit</strong> for discrete sets and sequences.
              </p>
            </div>
          </div>

          {/* Teacher's Golden Rule */}
          <div className="p-4 bg-amber-950/30 rounded-2xl border border-amber-800/50 flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h4 className="font-bold text-amber-200 text-sm">Teacher's Soothing Takeaway</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                "Class, remember: there is no single 'universally superior' distance metric. The best distance metric is the one that faithfully represents the physical, economic, or semantic geometry of your specific real-world domain!" — Sukanta Hui
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Semantic Visual SVG Diagram */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>⚙️</span> Visual Topology Diagram: Geometry of <InlineMath math="L_1" />, <InlineMath math="L_2" />, <InlineMath math="L_\infty" /> &amp; Cosine Metric Spaces
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto shadow-inner">
          <svg viewBox="0 0 920 300" className="w-full min-w-[750px] font-sans">
            <text x="460" y="25" textAnchor="middle" fill="#38bdf8" className="font-bold text-sm">
              Geometric Path Comparison from Origin A(0, 0) to Target B(4, 3) across Metric Norms
            </text>

            {/* Left Grid Section */}
            <g transform="translate(80, 50)">
              {/* Grid lines */}
              {[0, 1, 2, 3, 4].map((i) => (
                <line key={`v${i}`} x1={i * 60} y1="0" x2={i * 60} y2="180" stroke="#334155" strokeWidth="1" strokeDasharray="3,3" />
              ))}
              {[0, 1, 2, 3].map((i) => (
                <line key={`h${i}`} x1="0" y1={i * 60} x2="240" y2={i * 60} stroke="#334155" strokeWidth="1" strokeDasharray="3,3" />
              ))}

              {/* Point A (0, 0) */}
              <circle cx="0" cy="180" r="8" fill="#38bdf8" />
              <text x="-15" y="200" fill="#38bdf8" className="font-mono text-xs font-bold">A(0, 0)</text>

              {/* Point B (4, 3) */}
              <circle cx="240" cy="0" r="8" fill="#10b981" />
              <text x="255" y="0" fill="#10b981" className="font-mono text-xs font-bold">B(4, 3)</text>

              {/* L2 Euclidean Straight Line */}
              <line x1="0" y1="180" x2="240" y2="0" stroke="#f59e0b" strokeWidth="3" />
              <text x="90" y="80" fill="#fcd34d" className="font-mono text-xs font-bold">
                L2 (Euclidean) = 5.00
              </text>

              {/* L1 Manhattan Stepped Grid Path */}
              <path d="M 0 180 L 240 180 L 240 0" stroke="#f43f5e" strokeWidth="2.5" fill="none" strokeDasharray="4,4" />
              <text x="110" y="200" fill="#f43f5e" className="font-mono text-xs font-bold">
                L1 (Manhattan) = 4 + 3 = 7.00
              </text>

              {/* L_infinity Chebyshev Maximum Box */}
              <rect x="0" y="0" width="240" height="180" fill="none" stroke="#34d399" strokeWidth="1.5" strokeDasharray="2,2" />
              <text x="5" y="15" fill="#34d399" className="font-mono text-[10px]">
                L∞ (Chebyshev) = max(4,3) = 4.00
              </text>

              {/* Cosine Angle Arc */}
              <path d="M 40 180 A 40 40 0 0 0 32 156" fill="none" stroke="#38bdf8" strokeWidth="2" />
              <text x="45" y="165" fill="#7dd3fc" className="font-mono text-[10px] font-bold">θ = 36.87°</text>
            </g>

            {/* Right Metric Overview Cards */}
            <g transform="translate(480, 50)">
              <rect x="0" y="0" width="380" height="200" rx="10" fill="#1e293b" stroke="#818cf8" strokeWidth="1.5" />
              <text x="190" y="25" textAnchor="middle" fill="#a5b4fc" className="font-bold text-xs font-mono">Distance Metric Calculation Summary</text>

              <rect x="20" y="38" width="340" height="34" rx="6" fill="#0f172a" />
              <text x="30" y="60" fill="#fbbf24" className="font-mono text-xs font-bold">Euclidean (L2):</text>
              <text x="170" y="60" fill="#cbd5e1" className="font-mono text-xs">√(4² + 3²) = 5.00</text>

              <rect x="20" y="78" width="340" height="34" rx="6" fill="#0f172a" />
              <text x="30" y="100" fill="#f43f5e" className="font-mono text-xs font-bold">Manhattan (L1):</text>
              <text x="170" y="100" fill="#cbd5e1" className="font-mono text-xs">|4| + |3| = 7.00</text>

              <rect x="20" y="118" width="340" height="34" rx="6" fill="#0f172a" />
              <text x="30" y="140" fill="#34d399" className="font-mono text-xs font-bold">Chebyshev (L∞):</text>
              <text x="170" y="140" fill="#cbd5e1" className="font-mono text-xs">max(|4|, |3|) = 4.00</text>

              <rect x="20" y="158" width="340" height="34" rx="6" fill="#0f172a" />
              <text x="30" y="180" fill="#38bdf8" className="font-mono text-xs font-bold">Cosine Dist:</text>
              <text x="170" y="180" fill="#cbd5e1" className="font-mono text-xs">1 - cos(36.87°) = 0.20</text>
            </g>

            {/* Explanatory footer */}
            <rect x="60" y="260" width="800" height="32" rx="6" fill="#0f172a" stroke="#334155" />
            <text x="460" y="281" textAnchor="middle" fill="#38bdf8" className="text-xs font-mono">
              • In K-Medoids: Supply ANY metric via an N x N matrix without calculating synthetic coordinate averages!
            </text>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown Section */}
      <section id="theory" className="scroll-mt-6 bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">
            01
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Mathematical Formulations &amp; Pairwise Dissimilarity Matrix
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Rigorous metric definitions, distance formulas, and structural properties of the <InlineMath math="N \times N" /> dissimilarity matrix
            </p>
          </div>
        </div>

        {/* Hand-Calculated Step-by-Step Box */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-indigo-800/50 space-y-4">
          <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
            📍 Hand-Calculation Example: Distance from A(0, 0) to B(4, 3) across 4 Metrics
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Euclidean */}
            <div className="p-4 bg-slate-900 rounded-xl border border-amber-900/50 space-y-1.5">
              <span className="text-xs font-bold text-amber-400 block">1️⃣ Euclidean (<InlineMath math="L_2" />)</span>
              <div className="p-2 bg-slate-950 text-center font-mono text-xs text-amber-300 rounded border border-slate-800">
                <InlineMath math="D_2 = \sqrt{4^2 + 3^2} = \sqrt{25} = 5.0" />
              </div>
              <p className="text-[11px] text-slate-400">Straight diagonal line as the crow flies.</p>
            </div>

            {/* Manhattan */}
            <div className="p-4 bg-slate-900 rounded-xl border border-rose-900/50 space-y-1.5">
              <span className="text-xs font-bold text-rose-400 block">2️⃣ Manhattan (<InlineMath math="L_1" />)</span>
              <div className="p-2 bg-slate-950 text-center font-mono text-xs text-rose-300 rounded border border-slate-800">
                <InlineMath math="D_1 = |4-0| + |3-0| = 7.0" />
              </div>
              <p className="text-[11px] text-slate-400">Grid street step walking distance.</p>
            </div>

            {/* Chebyshev */}
            <div className="p-4 bg-slate-900 rounded-xl border border-emerald-900/50 space-y-1.5">
              <span className="text-xs font-bold text-emerald-400 block">3️⃣ Chebyshev (<InlineMath math="L_\infty" />)</span>
              <div className="p-2 bg-slate-950 text-center font-mono text-xs text-emerald-300 rounded border border-slate-800">
                <InlineMath math="D_\infty = \max(|4|, |3|) = 4.0" />
              </div>
              <p className="text-[11px] text-slate-400">Maximum coordinate difference.</p>
            </div>

            {/* Cosine */}
            <div className="p-4 bg-slate-900 rounded-xl border border-cyan-900/50 space-y-1.5">
              <span className="text-xs font-bold text-cyan-400 block">4️⃣ Cosine Distance</span>
              <div className="p-2 bg-slate-950 text-center font-mono text-xs text-cyan-300 rounded border border-slate-800">
                <InlineMath math="1 - \frac{4(1) + 3(0)}{5 \times 1} = 0.20" />
              </div>
              <p className="text-[11px] text-slate-400">Angular discrepancy between vectors.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Minkowski (<InlineMath math="L_p" />) Metric Family</span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Generalized vector distance parameterized by order <InlineMath math="p \ge 1" />:
            </p>
            <div className="text-sm md:text-base font-mono text-indigo-300 bg-indigo-950/40 p-4 rounded-xl border border-indigo-800/60 shadow-inner flex justify-center items-center overflow-x-auto py-3">
              <BlockMath math="D_p(x, y) = \left( \sum_{i=1}^d |x_i - y_i|^p \right)^{1/p}" />
            </div>
            <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
              <li><InlineMath math="p = 1" />: Manhattan (City-block) Distance</li>
              <li><InlineMath math="p = 2" />: Euclidean Straight-line Distance</li>
              <li><InlineMath math="p \to \infty" />: Chebyshev Maximum Coordinate Distance</li>
            </ul>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Pairwise Dissimilarity Matrix (<InlineMath math="N \times N" />)</span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              K-Medoids requires only an <InlineMath math="N \times N" /> distance matrix <InlineMath math="\mathbf{D}" /> where <InlineMath math="D_{ij} = D(x_i, x_j)" />:
            </p>
            <div className="text-sm md:text-base font-mono text-emerald-300 bg-emerald-950/40 p-4 rounded-xl border border-emerald-800/60 shadow-inner flex justify-center items-center overflow-x-auto py-3">
              <BlockMath math="\mathbf{D} = \begin{bmatrix} 0 & d_{12} & \dots & d_{1N} \\ d_{21} & 0 & \dots & d_{2N} \\ \vdots & \vdots & \ddots & \vdots \\ d_{N1} & d_{N2} & \dots & 0 \end{bmatrix}" />
            </div>
            <p className="text-xs text-slate-400">
              Properties: Symmetric (<InlineMath math="d_{ij} = d_{ji}" />), Zero Diagonal (<InlineMath math="d_{ii} = 0" />). Allows clustering on graphs, DNA sequences, and non-vector objects!
            </p>
          </div>
        </div>
      </section>

      {/* 5. Live Interactive Metric Simulator */}
      <section id="interactive" className="scroll-mt-6 bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">
            02
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Live Coordinate Difference Metric Simulator
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Adjust <InlineMath math="\Delta x" /> and <InlineMath math="\Delta y" /> offsets and compare the response of all major distance metrics in real-time
            </p>
          </div>
        </div>

        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Horizontal Offset (<InlineMath math="\Delta x" />):</span>
                <span className="text-cyan-400 font-bold">{deltaX} units</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={deltaX}
                onChange={(e) => setDeltaX(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Vertical Offset (<InlineMath math="\Delta y" />):</span>
                <span className="text-cyan-400 font-bold">{deltaY} units</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={deltaY}
                onChange={(e) => setDeltaY(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="bg-slate-900 p-4 rounded-xl border border-amber-900/50 space-y-1">
              <span className="text-[11px] font-bold text-amber-400 uppercase">Euclidean (<InlineMath math="L_2" />)</span>
              <div className="text-2xl font-bold font-mono text-amber-300">{l2_euclidean.toFixed(2)}</div>
              <p className="text-[10px] text-slate-400">Direct diagonal straight line distance.</p>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-rose-900/50 space-y-1">
              <span className="text-[11px] font-bold text-rose-400 uppercase">Manhattan (<InlineMath math="L_1" />)</span>
              <div className="text-2xl font-bold font-mono text-rose-300">{l1_manhattan.toFixed(2)}</div>
              <p className="text-[10px] text-slate-400">Orthogonal street grid step distance.</p>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-emerald-900/50 space-y-1">
              <span className="text-[11px] font-bold text-emerald-400 uppercase">Chebyshev (<InlineMath math="L_\infty" />)</span>
              <div className="text-2xl font-bold font-mono text-emerald-300">{l_chebyshev.toFixed(2)}</div>
              <p className="text-[10px] text-slate-400">Maximum single coordinate diff.</p>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl border border-cyan-900/50 space-y-1">
              <span className="text-[11px] font-bold text-cyan-400 uppercase">Cosine Distance</span>
              <div className="text-2xl font-bold font-mono text-cyan-300">
                {(l2_euclidean === 0 ? 0 : 1 - deltaX / l2_euclidean).toFixed(2)}
              </div>
              <p className="text-[10px] text-slate-400">Angular distance from horizontal axis.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Regional Industrial Case Studies */}
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
              How metric choices drive domain-specific machine learning systems across West Bengal
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase">Case 1 • Kolkata NLP &amp; Legal Tech</span>
            <h3 className="text-base font-bold text-white">Document Thematic Clustering</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Sachin clustered 10,000 corporate patent documents using Cosine Distance. This ensured 50-page technical filings clustered accurately with 2-page patent abstracts on the same topic.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Case 2 • Shyamnagar Supply Chain Hub</span>
            <h3 className="text-base font-bold text-white">Warehouse Grid Routing</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Debangshu modeled automated robotic pickers inside warehouse aisles using Manhattan Distance. Automated carts clustered order bins by exact aisle turns.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase">Case 3 • Jadavpur Bioinformatics Lab</span>
            <h3 className="text-base font-bold text-white">Genetic Sequence Homology</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Susmita clustered viral protein mutations using Levenshtein Edit Distance in K-Medoids without needing coordinate embeddings.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase">Case 4 • Barrackpore Academic Lab</span>
            <h3 className="text-base font-bold text-white">Student Exam Profile Similarity</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Mahima applied standardized Euclidean distance across coding speed, logic accuracy, and debugging times to identify homogeneous peer study groups.
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
              Key guidelines for distance calculation and metric space engineering
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-5 rounded-xl border border-rose-900/40 space-y-3">
            <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
              <span>⚠️</span> Common Mistakes
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li>Computing Euclidean distance on unscaled features (features with large ranges dominate 99% of distance).</li>
              <li>Using Euclidean distance on sparse high-dimensional text (use Cosine Distance instead).</li>
              <li>Recomputing distance matrices inside inner loops instead of precomputing an $N \times N$ matrix.</li>
            </ul>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-emerald-900/40 space-y-3">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>✔</span> Best Practices
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li>Always scale features using `StandardScaler` or `MinMaxScaler` prior to distance clustering.</li>
              <li>Use `scipy.spatial.distance.cdist` for high-performance C-accelerated distance computation.</li>
              <li>Select the metric that matches the physical geometry of your data collection pipeline.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 8. Thinking & Hints Section */}
      <section className="space-y-4 bg-amber-950/20 border border-amber-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
          <span>🤔</span> Think About This...
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          Why does the distance between all pairs of random points in a 1,000-dimensional space converge to nearly the same value (the Curse of Dimensionality)? How can dimensionality reduction (PCA) restore meaningful distance contrast before clustering?
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
              Interactive standalone lab script for Distance-Based Metric Matrix Calculations
            </p>
          </div>
        </div>

        <PythonFileLoader
          fileModule={labCode}
          title="distance_metrics_lab.py"
          highlightLines={[9, 13, 17, 21, 45, 55]}
        />
      </section>

      {/* 10. FAQ Template */}
      <section className="space-y-4">
        <FAQTemplate
          title="Distance-Based Clustering — Frequently Asked Questions"
          questions={questions}
        />
      </section>

      {/* 11. Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Distance-Based Clustering & Metric Mathematics"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 2 Note"
          downloadFileName="module_006_001_topic2_note.txt"
        />
      </section>

      {/* 12. Teacher Note */}
      <section>
        <Teacher
          note="Distance is the heart and soul of unsupervised machine learning. Choose the wrong metric, and the algorithm groups meaningless noise. Choose the right metric (like Manhattan for grid routing or Cosine for text), and patterns emerge effortlessly! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
