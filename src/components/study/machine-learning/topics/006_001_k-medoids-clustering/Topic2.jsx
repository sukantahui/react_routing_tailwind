import React, { useState, useId } from "react";
import clsx from "clsx";
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

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-6xl mx-auto pb-12">
      {/* 1. Header Section */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              BCAC701B • Advanced ML • Module 006_001 • Topic 2
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Metric Space &amp; Geometry
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Distance-Based Clustering &amp; Metric Topology
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl">
            Master the mathematics of proximity. Understand Euclidean ($L_2$), Manhattan ($L_1$), Chebyshev ($L_\infty$), and Cosine distances, construct $N \times N$ pairwise dissimilarity matrices, and discover how distance choices shape cluster boundaries in K-Medoids.
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
                onClick={() => setActiveTab(tab.id)}
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
              Teacher's Corner: Flying Like a Crow vs Walking Through Barrackpore Bazaar
            </h2>
            <p className="text-xs text-indigo-300/80">
              Classroom discussion by Sukanta Hui (Coder &amp; AccoTax, Barrackpore)
            </p>
          </div>
        </div>

        <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            When <strong>Swadeep</strong> and <strong>Tuhina</strong> calculated delivery distances in Barrackpore, <strong>Sukanta Hui</strong> asked: <em>"If you want to go from Barrackpore Railway Station to Chandan Pukur, can you walk in a straight diagonal line through houses?"</em>
          </p>
          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2">
            <h3 className="font-bold text-amber-300 text-sm md:text-base">
              🏙️ The Geometric Reality of Distances
            </h3>
            <p className="text-xs md:text-sm text-slate-300">
              <strong>Euclidean Distance ($L_2$)</strong> is "as the crow flies"—straight through walls.
            </p>
            <p className="text-xs md:text-sm text-slate-300">
              <strong>Manhattan Distance ($L_1$)</strong> follows the street grid ($\Delta x + \Delta y$), making it the true metric for city routing, delivery clustering, and outlier-resistant machine learning!
            </p>
          </div>
        </div>
      </section>

      {/* 3. Semantic Visual SVG Diagram */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>⚙️</span> Semantic Visual Diagram: Geometric Geometry of $L_1$, $L_2$, and $L_\infty$ Distance Norms
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto shadow-inner">
          <svg viewBox="0 0 920 280" className="w-full min-w-[750px] font-sans">
            <text x="460" y="25" textAnchor="middle" fill="#38bdf8" className="font-bold text-sm">
              Geometric Paths from Point A(0, 0) to Point B(4, 3) across Metric Spaces
            </text>

            {/* Coordinate Grid */}
            <g transform="translate(100, 50)">
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
              <text x="100" y="80" fill="#fcd34d" className="font-mono text-xs font-bold bg-slate-900">
                L2 (Euclidean) = 5.00
              </text>

              {/* L1 Manhattan Stepped Grid Path */}
              <path d="M 0 180 L 240 180 L 240 0" stroke="#f43f5e" strokeWidth="2.5" fill="none" strokeDasharray="4,4" />
              <text x="130" y="200" fill="#f43f5e" className="font-mono text-xs font-bold">
                L1 (Manhattan) = 4 + 3 = 7.00
              </text>
            </g>

            {/* Right Metric Overview Box */}
            <g transform="translate(480, 50)">
              <rect x="0" y="0" width="380" height="180" rx="10" fill="#1e293b" stroke="#818cf8" strokeWidth="1.5" />
              <text x="190" y="25" textAnchor="middle" fill="#a5b4fc" className="font-bold text-xs font-mono">Distance Metric Comparison Summary</text>

              <rect x="20" y="40" width="340" height="36" rx="6" fill="#0f172a" />
              <text x="35" y="63" fill="#fbbf24" className="font-mono text-xs font-bold">Euclidean ($L_2$):</text>
              <text x="170" y="63" fill="#cbd5e1" className="font-mono text-xs">$\sqrt{4^2 + 3^2} = 5.00$</text>

              <rect x="20" y="85" width="340" height="36" rx="6" fill="#0f172a" />
              <text x="35" y="108" fill="#f43f5e" className="font-mono text-xs font-bold">Manhattan ($L_1$):</text>
              <text x="170" y="108" fill="#cbd5e1" className="font-mono text-xs">$|4| + |3| = 7.00$</text>

              <rect x="20" y="130" width="340" height="36" rx="6" fill="#0f172a" />
              <text x="35" y="153" fill="#34d399" className="font-mono text-xs font-bold">Chebyshev ($L_\infty$):</text>
              <text x="170" y="153" fill="#cbd5e1" className="font-mono text-xs">$\max(|4|, |3|) = 4.00$</text>
            </g>

            {/* Explanatory footer */}
            <rect x="60" y="240" width="800" height="35" rx="6" fill="#0f172a" stroke="#334155" />
            <text x="460" y="262" textAnchor="middle" fill="#38bdf8" className="text-xs font-mono">
              • In K-Medoids: You can supply ANY metric as an N x N matrix without computing coordinate averages!
            </text>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown Section */}
      <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">
            01
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Mathematical Distance Formulations
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Metric formulas, properties, and applications in K-Medoids clustering
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Minkowski ($L_p$) Family</span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Generalized distance parameterized by order $p$:
            </p>
            <div className="text-[12px] font-mono text-indigo-300 bg-slate-900 p-3 rounded-lg border border-slate-800">
              D_p(x, y) = \left( \sum_{i=1}^d |x_i - y_i|^p \right)^{1/p}
            </div>
            <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
              <li>$p = 1$: Manhattan (City-block) Distance</li>
              <li>$p = 2$: Euclidean Straight-line Distance</li>
              <li>$p \to \infty$: Chebyshev Maximum Coordinate Distance</li>
            </ul>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Cosine &amp; Jaccard Metrics</span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Non-Euclidean distances for text and discrete sets:
            </p>
            <div className="text-[12px] font-mono text-emerald-300 bg-slate-900 p-3 rounded-lg border border-slate-800">
              D_{\text{Cosine}}(x, y) = 1 - \frac{x \cdot y}{\|x\| \|y\|}
            </div>
            <p className="text-xs text-slate-400">
              Cosine distance measures angular alignment independent of magnitude, making it ideal for text document clustering.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Live Interactive Metric Simulator */}
      <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">
            02
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Live Coordinate Difference Metric Simulator
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Adjust $\Delta x$ and $\Delta y$ offsets and compare the response of all major distance metrics in real-time
            </p>
          </div>
        </div>

        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Horizontal Offset ($\Delta x$):</span>
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
                <span className="text-slate-300">Vertical Offset ($\Delta y$):</span>
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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="bg-slate-900 p-4 rounded-lg border border-amber-900/50 space-y-1">
              <span className="text-[11px] font-bold text-amber-400 uppercase">Euclidean ($L_2$)</span>
              <div className="text-2xl font-bold font-mono text-amber-300">{l2_euclidean.toFixed(2)}</div>
              <p className="text-[10px] text-slate-400">Direct diagonal straight line.</p>
            </div>

            <div className="bg-slate-900 p-4 rounded-lg border border-rose-900/50 space-y-1">
              <span className="text-[11px] font-bold text-rose-400 uppercase">Manhattan ($L_1$)</span>
              <div className="text-2xl font-bold font-mono text-rose-300">{l1_manhattan.toFixed(2)}</div>
              <p className="text-[10px] text-slate-400">Orthogonal grid step distance.</p>
            </div>

            <div className="bg-slate-900 p-4 rounded-lg border border-emerald-900/50 space-y-1">
              <span className="text-[11px] font-bold text-emerald-400 uppercase">Chebyshev ($L_\infty$)</span>
              <div className="text-2xl font-bold font-mono text-emerald-300">{l_chebyshev.toFixed(2)}</div>
              <p className="text-[10px] text-slate-400">Maximum coordinate difference.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Regional Industrial Case Studies */}
      <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
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
      <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
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
