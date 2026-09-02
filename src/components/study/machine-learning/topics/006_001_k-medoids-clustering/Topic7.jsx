import React, { useState, useId } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import labCode from "./topic7_files/kmeans_vs_kmedoids_lab.py?raw";
import noteText from "./topic7_files/topic7_note.txt?raw";
import questions from "./topic7_files/topic7_questions.js";

export default function Topic7() {
  const [activeTab, setActiveTab] = useState("theory");
  const [outlierMagnitude, setOutlierMagnitude] = useState(60);
  const svgId = useId();

  // Simulated live calculation of Centroid shift vs Medoid stability
  // Cluster 2 points: (8, 9), (9, 8), (8, 10), (10, 9) + Outlier (outlierMagnitude, outlierMagnitude)
  const kmeansCentroidX = (8 + 9 + 8 + 10 + outlierMagnitude) / 5;
  const kmedoidsMedoidX = 9; // Fixed real central point

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-6xl mx-auto pb-12">
      {/* 1. Header Section */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              BCAC701B • Advanced ML • Module 006_001 • Topic 7
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Head-to-Head Benchmark
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            K-Means vs. K-Medoids: Comprehensive Benchmark
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl">
            Evaluate the decisive architectural differences between K-Means and K-Medoids. Compare mathematical loss formulations, computational complexity, memory footprints, outlier breakdown points, and domain selection criteria.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "theory", label: "1. Benchmark Matrix" },
              { id: "interactive", label: "2. Outlier Leverage Studio" },
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
              Teacher's Corner: The Bullet Train vs The Armored Off-Road 4x4
            </h2>
            <p className="text-xs text-indigo-300/80">
              Classroom discussion by Sukanta Hui (Coder &amp; AccoTax, Barrackpore)
            </p>
          </div>
        </div>

        <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            In our lab, <strong>Sachin</strong> asked: <em>"If K-Medoids is so robust, why don't we use it for every single clustering task?"</em>
          </p>
          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2">
            <h3 className="font-bold text-amber-300 text-sm md:text-base">
              🚆 The High-Speed Train vs The Armored Jeep
            </h3>
            <p className="text-xs md:text-sm text-slate-300">
              <strong>K-Means</strong> is a high-speed bullet train: it glides over millions of clean continuous data points in seconds ($O(N \cdot K \cdot d)$), but if there is an obstacle (outlier) on the track, it derails!
            </p>
            <p className="text-xs md:text-sm text-slate-300">
              <strong>K-Medoids</strong> is an armored 4x4 off-roader: it travels over rough rocky terrain, handles broken paths (outliers, non-Euclidean metrics), and always delivers you safely, but moves at a measured speed ($O(N^2)$).
            </p>
          </div>
        </div>
      </section>

      {/* 3. Semantic Visual SVG Diagram */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>⚙️</span> Semantic Visual Diagram: Head-to-Head Trade-Off Architecture
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto shadow-inner">
          <svg viewBox="0 0 920 280" className="w-full min-w-[750px] font-sans">
            <text x="460" y="25" textAnchor="middle" fill="#38bdf8" className="font-bold text-sm">
              Architectural Trade-Off: Scalability &amp; Speed vs. Robustness &amp; Metric Flexibility
            </text>

            {/* Left Card: K-Means */}
            <g transform="translate(60, 50)">
              <rect x="0" y="0" width="370" height="180" rx="10" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="185" y="25" textAnchor="middle" fill="#fbbf24" className="font-bold text-xs font-mono">K-MEANS (Speed Champion)</text>

              <rect x="20" y="40" width="330" height="30" rx="4" fill="#0f172a" />
              <text x="35" y="60" fill="#cbd5e1" className="text-[11px] font-mono">Time Complexity: <strong className="text-emerald-400">$O(N \cdot K \cdot d)$ (Linear!)</strong></text>

              <rect x="20" y="75" width="330" height="30" rx="4" fill="#0f172a" />
              <text x="35" y="95" fill="#cbd5e1" className="text-[11px] font-mono">Outlier Resistance: <strong className="text-rose-400">Poor ($0\%$ Breakdown)</strong></text>

              <rect x="20" y="110" width="330" height="30" rx="4" fill="#0f172a" />
              <text x="35" y="130" fill="#cbd5e1" className="text-[11px] font-mono">Metric: <strong className="text-amber-300">Euclidean Only</strong></text>

              <text x="185" y="165" textAnchor="middle" fill="#94a3b8" className="text-[10px]">Best for: Massive clean numerical big data</text>
            </g>

            {/* Right Card: K-Medoids */}
            <g transform="translate(490, 50)">
              <rect x="0" y="0" width="370" height="180" rx="10" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
              <text x="185" y="25" textAnchor="middle" fill="#34d399" className="font-bold text-xs font-mono">K-MEDOIDS (Robustness Champion)</text>

              <rect x="20" y="40" width="330" height="30" rx="4" fill="#0f172a" />
              <text x="35" y="60" fill="#cbd5e1" className="text-[11px] font-mono">Time Complexity: <strong className="text-amber-400">$O(N^2)$ or $O(K(N-K)^2)$</strong></text>

              <rect x="20" y="75" width="330" height="30" rx="4" fill="#0f172a" />
              <text x="35" y="95" fill="#cbd5e1" className="text-[11px] font-mono">Outlier Resistance: <strong className="text-emerald-400">Extreme ($50\%$ Breakdown)</strong></text>

              <rect x="20" y="110" width="330" height="30" rx="4" fill="#0f172a" />
              <text x="35" y="130" fill="#cbd5e1" className="text-[11px] font-mono">Metric: <strong className="text-emerald-400">Any Arbitrary Distance</strong></text>

              <text x="185" y="165" textAnchor="middle" fill="#a7f3d0" className="text-[10px] font-bold">Best for: Noisy data, real exemplars &amp; graphs</text>
            </g>

            {/* Explanatory footer */}
            <rect x="60" y="240" width="800" height="35" rx="6" fill="#0f172a" stroke="#334155" />
            <text x="460" y="262" textAnchor="middle" fill="#38bdf8" className="text-xs font-mono">
              • Decision Rule: Use K-Means for massive clean continuous scale; use K-Medoids when robustness matters!
            </text>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown Section: Benchmark Matrix */}
      <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">
            01
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Full Head-to-Head Benchmark Matrix
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Systematic comparison across 8 core architectural dimensions
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm text-left border border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-950 text-slate-300 font-mono text-xs uppercase border-b border-slate-800">
              <tr>
                <th className="p-3.5">Comparison Dimension</th>
                <th className="p-3.5 text-amber-400">K-Means</th>
                <th className="p-3.5 text-emerald-400">K-Medoids</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/40">
                <td className="p-3.5 font-bold text-white">Cluster Center Identity</td>
                <td className="p-3.5 text-amber-300">Virtual Centroid (Arithmetic Mean)</td>
                <td className="p-3.5 text-emerald-300 font-bold">Real Medoid (Actual Data Instance)</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="p-3.5 font-bold text-white">Mathematical Loss</td>
                <td className="p-3.5">Sum of Squared Errors ($\text{SSE} = \sum \|x - \mu\|^2$)</td>
                <td className="p-3.5">Total Absolute Dissimilarity ($J = \sum D(x, m)$)</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="p-3.5 font-bold text-white">Outlier Breakdown Point</td>
                <td className="p-3.5 text-rose-400 font-mono">0% (1 outlier corrupts center)</td>
                <td className="p-3.5 text-emerald-400 font-mono">50% (Resistant to up to 50% noise)</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="p-3.5 font-bold text-white">Supported Input Data</td>
                <td className="p-3.5">Continuous numerical vector coordinates only</td>
                <td className="p-3.5 text-emerald-300">Numerical, Categorical, Graphs, Text</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="p-3.5 font-bold text-white">Distance Matrix Support</td>
                <td className="p-3.5 text-rose-400">Cannot use precomputed matrices</td>
                <td className="p-3.5 text-emerald-300">Accepts arbitrary $N \times N$ matrix</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="p-3.5 font-bold text-white">Time Complexity</td>
                <td className="p-3.5 text-emerald-400 font-mono">$O(N \cdot K \cdot d)$ (Linear speed)</td>
                <td className="p-3.5 text-amber-400 font-mono">$O(K(N-K)^2)$ or $O(N^2)$</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="p-3.5 font-bold text-white">Memory Complexity</td>
                <td className="p-3.5 text-emerald-400 font-mono">$O(N \cdot d)$ (Minimal)</td>
                <td className="p-3.5 font-mono text-slate-300">$O(N^2)$ (Distance Matrix)</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="p-3.5 font-bold text-white">Primary Python Tool</td>
                <td className="p-3.5 font-mono text-cyan-300">`sklearn.cluster.KMeans`</td>
                <td className="p-3.5 font-mono text-indigo-300">`sklearn_extra.cluster.KMedoids`</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Live Interactive Outlier Leverage Studio */}
      <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">
            02
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Live Head-to-Head Outlier Leverage Visualizer
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Drag the outlier coordinate slider and watch K-Means centroid drift into empty space while K-Medoids remains rock-solid!
            </p>
          </div>
        </div>

        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-slate-300">Outlier Point Position ($P_{\text{outlier}}$):</span>
            <span className="text-cyan-400 font-bold">[{outlierMagnitude}, {outlierMagnitude}]</span>
          </div>

          <input
            type="range"
            min="10"
            max="200"
            value={outlierMagnitude}
            onChange={(e) => setOutlierMagnitude(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-slate-900 p-4 rounded-lg border border-amber-900/50 space-y-1">
              <span className="text-[11px] font-bold text-amber-400 uppercase">K-Means Centroid Coordinate</span>
              <div className="text-2xl font-bold font-mono text-amber-300">
                X = {kmeansCentroidX.toFixed(2)}
              </div>
              <p className="text-[11px] text-slate-400">
                🚨 Centroid was pulled away from the true cluster (mean of 8, 9, 8, 10 is 8.75).
              </p>
            </div>

            <div className="bg-slate-900 p-4 rounded-lg border border-emerald-900/50 space-y-1">
              <span className="text-[11px] font-bold text-emerald-400 uppercase">K-Medoids Medoid Coordinate</span>
              <div className="text-2xl font-bold font-mono text-emerald-300">
                X = {kmedoidsMedoidX}
              </div>
              <p className="text-[11px] text-slate-400">
                ✅ 100% stable! Medoid stays locked on actual central point P(9, 8).
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
              When to select K-Means vs. K-Medoids in enterprise engineering deployments
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase">K-Means Deployment • Kolkata FinTech</span>
            <h3 className="text-base font-bold text-white">High-Throughput Card Anomaly Detection</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Debangshu deployed K-Means on 5,000,000 continuous transaction vectors per hour in Salt Lake Sector V, taking advantage of linear $O(N \cdot K \cdot d)$ GPU acceleration for sub-millisecond response.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">K-Medoids Deployment • Jadavpur Medical Hub</span>
            <h3 className="text-base font-bold text-white">ICU Patient Profile Exemplars</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Mahima deployed K-Medoids on 2,000 patient vitals containing severe heart rate spikes. The medoids provided real patient charts for doctor review, completely immune to outlier distortion.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase">K-Medoids Deployment • Shyamnagar Logistics</span>
            <h3 className="text-base font-bold text-white">Physical Hub Site Selection</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Sachin clustered road-network delivery addresses using Manhattan distance in K-Medoids, selecting actual warehouse buildings rather than virtual midpoint coordinates.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase">K-Means Deployment • Barrackpore Academic Lab</span>
            <h3 className="text-base font-bold text-white">Continuous Feature Exploration</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Susmita used K-Means to rapidly explore 50,000 standardized exam submission timestamps, finding high-level clustering trends in seconds.
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
              Key engineering guidelines when deciding between K-Means and K-Medoids
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-5 rounded-xl border border-rose-900/40 space-y-3">
            <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
              <span>⚠️</span> Common Mistakes
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li>Using K-Means on categorical or mixed data where arithmetic means are meaningless.</li>
              <li>Attempting raw PAM K-Medoids on $N &gt; 50,000$ points (causes memory exhaustion).</li>
              <li>Assuming K-Means and K-Medoids will produce identical cluster boundaries on clean data.</li>
            </ul>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-emerald-900/40 space-y-3">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>✔</span> Best Practices
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li>Profile dataset size and noise levels before choosing your clustering engine.</li>
              <li>Use K-Means when $N &gt; 100,000$ and data is clean continuous numerical vectors.</li>
              <li>Use K-Medoids when stakeholders require authentic real-world exemplar instances.</li>
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
          If you are clustering 10,000 customer survey responses where answers are categorical ratings ("Agree", "Neutral", "Disagree"), why does K-Means completely fail while K-Medoids with Hamming/Jaccard distance succeeds effortlessly?
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
              Interactive standalone lab script for Head-to-Head K-Means vs. K-Medoids Benchmark
            </p>
          </div>
        </div>

        <PythonFileLoader
          fileModule={labCode}
          title="kmeans_vs_kmedoids_lab.py"
          highlightLines={[10, 20, 45, 50]}
        />
      </section>

      {/* 10. FAQ Template */}
      <section className="space-y-4">
        <FAQTemplate
          title="K-Means vs. K-Medoids — Frequently Asked Questions"
          questions={questions}
        />
      </section>

      {/* 11. Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="K-Means vs K-Medoids Benchmark"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 7 Note"
          downloadFileName="module_006_001_topic7_note.txt"
        />
      </section>

      {/* 12. Teacher Note */}
      <section>
        <Teacher
          note="In machine learning engineering, there is no single 'best' algorithm—only the right tool for the job. Use K-Means for raw speed on big continuous data; use K-Medoids for robustness, non-Euclidean spaces, and authentic real-world exemplars! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
