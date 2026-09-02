import React, { useState, useId } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import labCode from "./topic4_files/cluster_assignment_lab.py?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions.js";

export default function Topic4() {
  const [activeTab, setActiveTab] = useState("theory");
  const [queryX, setQueryX] = useState(8);
  const svgId = useId();

  // Two fixed 1D medoids at M1 = 3 and M2 = 14
  const m1 = 3;
  const m2 = 14;
  const distM1 = Math.abs(queryX - m1);
  const distM2 = Math.abs(queryX - m2);
  const assignedCluster = distM1 <= distM2 ? 0 : 1;
  const boundaryMidpoint = (m1 + m2) / 2; // 8.5

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-6xl mx-auto pb-12">
      {/* 1. Header Section */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              BCAC701B • Advanced ML • Module 006_001 • Topic 4
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Voronoi Partitioning
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Cluster Assignment &amp; Voronoi Partitioning
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl">
            Understand the mechanics of cluster membership. Learn how non-medoid observations evaluate proximity, how Voronoi cells divide multi-dimensional feature space, and how deterministic tie-breaking ensures cluster stability.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "theory", label: "1. Assignment Principles" },
              { id: "interactive", label: "2. Decision Boundary Studio" },
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
              Teacher's Corner: The Polling Station Territory Analogy
            </h2>
            <p className="text-xs text-indigo-300/80">
              Classroom discussion by Sukanta Hui (Coder &amp; AccoTax, Barrackpore)
            </p>
          </div>
        </div>

        <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            In our lab, <strong>Sachin</strong> asked: <em>"Once medoids are chosen, how does every point decide which team it belongs to?"</em>
          </p>
          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2">
            <h3 className="font-bold text-amber-300 text-sm md:text-base">
              🗳️ The Polling Booth Territory
            </h3>
            <p className="text-xs md:text-sm text-slate-300">
              Imagine two polling booths in Barrackpore: Booth A at the Railway Station and Booth B at Anandapuri.
            </p>
            <p className="text-xs md:text-sm text-slate-300">
              Every citizen simply walks to the booth that is physically closest to their home. The line where the distance to Booth A equals the distance to Booth B is the <strong>Decision Boundary (Voronoi cell border)</strong>!
            </p>
          </div>
        </div>
      </section>

      {/* 3. Semantic Visual SVG Diagram */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>⚙️</span> Semantic Visual Diagram: Voronoi Decision Boundary Partitioning
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto shadow-inner">
          <svg viewBox="0 0 920 280" className="w-full min-w-[750px] font-sans">
            <text x="460" y="25" textAnchor="middle" fill="#38bdf8" className="font-bold text-sm">
              Voronoi Partitioning: Data Points Assigned to Nearest Exemplar Medoids
            </text>

            {/* Left Cluster Cell 0 */}
            <g transform="translate(60, 50)">
              <rect x="0" y="0" width="380" height="180" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="190" y="25" textAnchor="middle" fill="#38bdf8" className="font-bold text-xs font-mono">Cluster 0 Voronoi Cell (Anchor: Medoid P1)</text>

              {/* Medoid P1 */}
              <circle cx="120" cy="100" r="10" fill="#38bdf8" stroke="#fff" strokeWidth="2" />
              <text x="120" y="80" textAnchor="middle" fill="#7dd3fc" className="text-xs font-bold font-mono">Medoid P1(3, 4)</text>

              {/* Cluster 0 Points */}
              <circle cx="60" cy="80" r="6" fill="#38bdf8" />
              <line x1="60" y1="80" x2="120" y2="100" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3,3" />

              <circle cx="80" cy="140" r="6" fill="#38bdf8" />
              <line x1="80" y1="140" x2="120" y2="100" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3,3" />

              <circle cx="180" cy="60" r="6" fill="#38bdf8" />
              <line x1="180" y1="60" x2="120" y2="100" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3,3" />

              <circle cx="190" cy="130" r="6" fill="#38bdf8" />
              <line x1="190" y1="130" x2="120" y2="100" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3,3" />
            </g>

            {/* Decision Boundary Line */}
            <line x1="450" y1="50" x2="450" y2="230" stroke="#f43f5e" strokeWidth="3" strokeDasharray="6,4" />
            <text x="450" y="40" textAnchor="middle" fill="#f43f5e" className="font-mono text-xs font-bold">Decision Boundary</text>

            {/* Right Cluster Cell 1 */}
            <g transform="translate(460, 50)">
              <rect x="0" y="0" width="380" height="180" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
              <text x="190" y="25" textAnchor="middle" fill="#34d399" className="font-bold text-xs font-mono">Cluster 1 Voronoi Cell (Anchor: Medoid P5)</text>

              {/* Medoid P5 */}
              <circle cx="240" cy="100" r="10" fill="#10b981" stroke="#fff" strokeWidth="2" />
              <text x="240" y="80" textAnchor="middle" fill="#6ee7b7" className="text-xs font-bold font-mono">Medoid P5(14, 15)</text>

              {/* Cluster 1 Points */}
              <circle cx="170" cy="70" r="6" fill="#10b981" />
              <line x1="170" y1="70" x2="240" y2="100" stroke="#10b981" strokeWidth="1" strokeDasharray="3,3" />

              <circle cx="190" cy="140" r="6" fill="#10b981" />
              <line x1="190" y1="140" x2="240" y2="100" stroke="#10b981" strokeWidth="1" strokeDasharray="3,3" />

              <circle cx="310" cy="80" r="6" fill="#10b981" />
              <line x1="310" y1="80" x2="240" y2="100" stroke="#10b981" strokeWidth="1" strokeDasharray="3,3" />

              <circle cx="300" cy="140" r="6" fill="#10b981" />
              <line x1="300" y1="140" x2="240" y2="100" stroke="#10b981" strokeWidth="1" strokeDasharray="3,3" />
            </g>

            {/* Explanatory footer */}
            <rect x="60" y="240" width="800" height="35" rx="6" fill="#0f172a" stroke="#334155" />
            <text x="460" y="262" textAnchor="middle" fill="#38bdf8" className="text-xs font-mono">
              • Assignment Rule: Point x assigned to Cluster k if $D(x, m_k) \le D(x, m_j)$ for all $j \ne k$
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
              Cluster Assignment Mathematical Formalism
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Formulation, distance lookup mechanics, and tie-breaking algorithms
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Assignment Objective Function</span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              For a fixed set of medoid indices $\{m_1, m_2, \dots, m_K\}$, each point $x_i$ receives cluster label $y_i$:
            </p>
            <div className="text-[12px] font-mono text-indigo-300 bg-slate-900 p-3 rounded-lg border border-slate-800">
              y_i = \arg\min_{k \in \{1 \dots K\}} D(x_i, m_k)
            </div>
            <p className="text-xs text-slate-400">
              Computational complexity is $O(N \cdot K \cdot d)$ using coordinates or $O(N \cdot K)$ using a precomputed distance matrix.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Non-Empty Guarantee</span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Because each medoid point $m_k$ is an element of the dataset, its distance to itself is zero:
            </p>
            <div className="text-[12px] font-mono text-emerald-300 bg-slate-900 p-3 rounded-lg border border-slate-800">
              D(m_k, m_k) = 0 \le D(m_k, m_j) \quad \forall j
            </div>
            <p className="text-xs text-slate-400">
              Thus, every cluster is mathematically guaranteed to contain at least its own medoid point.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Live Interactive Decision Boundary Studio */}
      <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">
            02
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Live Query Point Cluster Assignment Simulator
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Slide the Query Point $X$ across the 1D axis ($M_1 = 3$ and $M_2 = 14$) to observe the exact decision boundary flip point ($X = 8.5$)
            </p>
          </div>
        </div>

        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-slate-300">Query Point Coordinate ($X$):</span>
            <span className="text-cyan-400 font-bold">X = {queryX}</span>
          </div>

          <input
            type="range"
            min="0"
            max="18"
            value={queryX}
            onChange={(e) => setQueryX(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="bg-slate-900 p-4 rounded-lg border border-sky-900/50 space-y-1">
              <span className="text-[11px] font-bold text-sky-400 uppercase">Distance to Medoid 1 (M1 = 3)</span>
              <div className="text-2xl font-bold font-mono text-sky-300">{distM1.toFixed(1)} units</div>
            </div>

            <div className="bg-slate-900 p-4 rounded-lg border border-emerald-900/50 space-y-1">
              <span className="text-[11px] font-bold text-emerald-400 uppercase">Distance to Medoid 2 (M2 = 14)</span>
              <div className="text-2xl font-bold font-mono text-emerald-300">{distM2.toFixed(1)} units</div>
            </div>

            <div className={clsx(
              "p-4 rounded-lg border space-y-1 transition-all",
              assignedCluster === 0
                ? "bg-sky-950/40 border-sky-500/50"
                : "bg-emerald-950/40 border-emerald-500/50"
            )}>
              <span className="text-[11px] font-bold uppercase text-slate-300">Assigned Cluster</span>
              <div className="text-xl font-bold font-mono text-white">
                Cluster {assignedCluster} (Medoid {assignedCluster === 0 ? "M1" : "M2"})
              </div>
              <p className="text-[10px] text-slate-400">
                {queryX <= boundaryMidpoint ? "Point is left of boundary (8.5)" : "Point is right of boundary (8.5)"}
              </p>
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
              Applied cluster assignment pipelines across Bengal business logistics and healthcare
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase">Case 1 • Shyamnagar Courier Dispatch</span>
            <h3 className="text-base font-bold text-white">Dynamic Parcel Delivery Routing</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Sachin assigned 2,500 daily e-commerce packages to 4 regional delivery vans by calculating distance to van anchor medoids, ensuring balanced parcel payloads.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Case 2 • Kolkata Salt Lake Sector V</span>
            <h3 className="text-base font-bold text-white">Online Banking Security Alerts</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Debangshu assigned live credit card transactions to learned user spending persona medoids. Transactions falling far from any medoid triggered instant fraud verification SMS.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase">Case 3 • Jadavpur Medical Hub</span>
            <h3 className="text-base font-bold text-white">Triage Emergency Assignment</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Mahima assigned incoming emergency ward patient vitals to the closest clinical trauma medoids to automatically flag critical intensive care needs.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase">Case 4 • Barrackpore Academic Lab</span>
            <h3 className="text-base font-bold text-white">Automated Study Group Grouping</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Susmita assigned 120 student programming test profiles to 3 mentor medoids, ensuring peer groups received specialized tutorial attention.
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
              Key engineering guidelines for cluster assignment in production
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-5 rounded-xl border border-rose-900/40 space-y-3">
            <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
              <span>⚠️</span> Common Mistakes
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li>Using non-deterministic tie-breaking leading to bouncing cluster assignments between runs.</li>
              <li>Evaluating test points without applying the exact training feature scalers.</li>
              <li>Failing to monitor cluster assignment proportions for degenerate singleton clusters.</li>
            </ul>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-emerald-900/40 space-y-3">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>✔</span> Best Practices
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li>Vectorize distance comparisons across medoid matrices using NumPy broadcasting.</li>
              <li>Calculate silhouette scores across assignments to detect misclassified boundary points.</li>
              <li>Use `kmedoids.predict()` for fast out-of-sample inference in production APIs.</li>
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
          If a new patient walks into a hospital, why can you classify them in $O(K)$ time simply by measuring their distance to the $K$ fitted medoids, without retraining the clustering model?
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
              Interactive standalone lab script for Point-by-Point Cluster Assignment
            </p>
          </div>
        </div>

        <PythonFileLoader
          fileModule={labCode}
          title="cluster_assignment_lab.py"
          highlightLines={[12, 13, 14, 15, 30]}
        />
      </section>

      {/* 10. FAQ Template */}
      <section className="space-y-4">
        <FAQTemplate
          title="Cluster Assignment &amp; Partitioning — Frequently Asked Questions"
          questions={questions}
        />
      </section>

      {/* 11. Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Cluster Assignment & Voronoi Partitioning"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 4 Note"
          downloadFileName="module_006_001_topic4_note.txt"
        />
      </section>

      {/* 12. Teacher Note */}
      <section>
        <Teacher
          note="Cluster assignment is where abstract medoids turn into practical decisions. Whether assigning voters to booths, packages to delivery hubs, or transactions to personas, the nearest-medoid rule delivers clean, interpretable partitions! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
