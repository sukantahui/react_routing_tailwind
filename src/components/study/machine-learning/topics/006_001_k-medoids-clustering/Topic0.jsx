import React, { useState, useId } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import labCode from "./topic0_files/k_medoids_concept_lab.py?raw";
import noteText from "./topic0_files/topic0_note.txt?raw";
import questions from "./topic0_files/topic0_questions.js";

export default function Topic0() {
  const [activeTab, setActiveTab] = useState("theory");
  const [outlierDistance, setOutlierDistance] = useState(25);
  const svgId = useId();

  // Simulated live calculation of Centroid (mean) vs Medoid (actual data point) under outlier pull
  const normalPoints = [2, 3, 4, 8, 9];
  const centroidVal = (normalPoints.reduce((a, b) => a + b, 0) + outlierDistance) / 6;
  const medoidVal = 4; // Stable median-like exemplar

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-6xl mx-auto pb-12">
      {/* 1. Header Section */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              BCAC701B • Advanced ML • Module 006_001 • Topic 0
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Robust Clustering Exemplars
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            K-Medoids Clustering Concept &amp; Mathematical Foundations
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl">
            Discover partitional clustering built on real data exemplars. Understand how K-Medoids eliminates centroid distortion, minimizes total absolute dissimilarity, and provides extreme robustness against high-variance noise and real-world outliers.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "theory", label: "1. Core Conceptual Foundations" },
              { id: "interactive", label: "2. Outlier Resistance Studio" },
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
              Teacher's Corner: The Representative Class Captain vs The Artificial Average
            </h2>
            <p className="text-xs text-indigo-300/80">
              Classroom discussion by Sukanta Hui (Coder &amp; AccoTax, Barrackpore)
            </p>
          </div>
        </div>

        <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            In our machine learning lab, <strong>Sachin</strong> and <strong>Mahima</strong> clustered student performance metrics using K-Means. However, when an extreme outlier student scored 100/100 while others scored around 40, the K-Means centroid shifted to 55—a score that no real student achieved!
          </p>
          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2">
            <h3 className="font-bold text-amber-300 text-sm md:text-base">
              🎯 Why K-Medoids? The Real Exemplar Guarantee
            </h3>
            <p className="text-xs md:text-sm text-slate-300">
              <strong>K-Medoids</strong> solves this problem by selecting an <em>actual real data instance</em> (the Medoid) as the cluster center. Instead of an imaginary mathematical average (Centroid), K-Medoids designates the actual student who is most central to the group, minimizing the sum of absolute pairwise distances!
            </p>
          </div>
        </div>
      </section>

      {/* 3. Semantic Visual SVG Diagram */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>⚙️</span> Semantic Visual Diagram: K-Means Centroid Drift vs K-Medoids Stability
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto shadow-inner">
          <svg viewBox="0 0 920 280" className="w-full min-w-[750px] font-sans">
            <text x="460" y="25" textAnchor="middle" fill="#38bdf8" className="font-bold text-sm">
              Comparative Impact of Extreme Outliers on Cluster Center Placement
            </text>

            {/* Left: K-Means with Outlier */}
            <g transform="translate(40, 50)">
              <rect x="0" y="0" width="390" height="180" rx="10" fill="#1e293b" stroke="#e11d48" strokeWidth="1.5" />
              <text x="195" y="25" textAnchor="middle" fill="#f43f5e" className="font-bold text-xs font-mono">K-Means: Centroid Pulled by Outlier</text>
              
              {/* Cluster Points */}
              <circle cx="50" cy="90" r="6" fill="#38bdf8" />
              <circle cx="70" cy="110" r="6" fill="#38bdf8" />
              <circle cx="90" cy="80" r="6" fill="#38bdf8" />
              <circle cx="100" cy="130" r="6" fill="#38bdf8" />
              <circle cx="120" cy="100" r="6" fill="#38bdf8" />

              {/* Extreme Outlier */}
              <circle cx="340" cy="100" r="8" fill="#e11d48" />
              <text x="340" y="75" textAnchor="middle" fill="#fda4af" className="text-[10px] font-bold">Outlier Point</text>

              {/* Shifted Centroid */}
              <polygon points="200,90 210,110 190,110" fill="#f59e0b" />
              <text x="200" y="130" textAnchor="middle" fill="#fcd34d" className="text-[11px] font-mono font-bold">
                Centroid (Pulled to 200, 100)
              </text>
              <line x1="120" y1="100" x2="200" y2="100" stroke="#f59e0b" strokeDasharray="3,3" />
            </g>

            {/* Right: K-Medoids with Outlier */}
            <g transform="translate(490, 50)">
              <rect x="0" y="0" width="390" height="180" rx="10" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
              <text x="195" y="25" textAnchor="middle" fill="#34d399" className="font-bold text-xs font-mono">K-Medoids: Medoid Remains Grounded</text>
              
              {/* Cluster Points */}
              <circle cx="50" cy="90" r="6" fill="#38bdf8" />
              <circle cx="70" cy="110" r="6" fill="#38bdf8" />
              
              {/* Medoid Point */}
              <circle cx="90" cy="80" r="9" fill="#10b981" stroke="#fff" strokeWidth="2" />
              <text x="90" y="60" textAnchor="middle" fill="#6ee7b7" className="text-[11px] font-mono font-bold">
                Medoid (Actual Point #3)
              </text>

              <circle cx="100" cy="130" r="6" fill="#38bdf8" />
              <circle cx="120" cy="100" r="6" fill="#38bdf8" />

              {/* Extreme Outlier */}
              <circle cx="340" cy="100" r="8" fill="#e11d48" />
              <text x="340" y="75" textAnchor="middle" fill="#fda4af" className="text-[10px] font-bold">Outlier Point</text>
            </g>

            {/* Explanatory footer */}
            <rect x="40" y="240" width="840" height="35" rx="6" fill="#0f172a" stroke="#334155" />
            <text x="460" y="262" textAnchor="middle" fill="#38bdf8" className="text-xs font-mono">
              • Medoids are real dataset elements: cost minimizes \sum |x_i - m_k| without quadratic penalty!
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
              Mathematical Formulation of K-Medoids
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Dissimilarity objective function, distance metrics, and exemplar optimization
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Total Dissimilarity Cost</span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Given a dataset $X = \{x_1, x_2, \dots, x_N\}$ partitioned into $K$ clusters $\{C_1, C_2, \dots, C_K\}$, K-Medoids minimizes the total absolute distance from each point to its assigned cluster medoid $m_k \in X$:
            </p>
            <div className="text-[12px] font-mono text-indigo-300 bg-slate-900 p-3 rounded-lg border border-slate-800">
              J = \sum_{k=1}^K \sum_{x_i \in C_k} D(x_i, m_k)
            </div>
            <p className="text-xs text-slate-400">
              Where $D(x_i, m_k)$ is any chosen distance function (Manhattan $L_1$, Euclidean $L_2$, or Cosine distance).
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Medoid Definition</span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              A medoid $m_k$ of cluster $C_k$ is the specific point $y \in C_k$ that minimizes the intra-cluster dissimilarity:
            </p>
            <div className="text-[12px] font-mono text-emerald-300 bg-slate-900 p-3 rounded-lg border border-slate-800">
              m_k = \arg\min_{y \in C_k} \sum_{x \in C_k} D(x, y)
            </div>
            <p className="text-xs text-slate-400">
              Because $m_k \in X$, the cluster representative is guaranteed to be a valid, physically observable observation.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Interactive Outlier Resistance Studio */}
      <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">
            02
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Live Simulation: Outlier Impact on Centroid vs. Medoid
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Adjust the outlier magnitude and watch how K-Means centroid breaks down while K-Medoids remains locked on the true center!
            </p>
          </div>
        </div>

        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-slate-300">Outlier Position (Data point X6):</span>
            <span className="text-cyan-400 font-bold">X6 = {outlierDistance}</span>
          </div>

          <input
            type="range"
            min="10"
            max="150"
            value={outlierDistance}
            onChange={(e) => setOutlierDistance(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-slate-900 p-4 rounded-lg border border-rose-900/50 space-y-1">
              <span className="text-[11px] font-bold text-rose-400 uppercase">K-Means Centroid (Mean)</span>
              <div className="text-2xl font-bold font-mono text-rose-300">{centroidVal.toFixed(2)}</div>
              <p className="text-[11px] text-slate-400">
                🚨 Drastically skewed away from the true student cohort (2, 3, 4, 8, 9).
              </p>
            </div>

            <div className="bg-slate-900 p-4 rounded-lg border border-emerald-900/50 space-y-1">
              <span className="text-[11px] font-bold text-emerald-400 uppercase">K-Medoids Center (Medoid)</span>
              <div className="text-2xl font-bold font-mono text-emerald-300">{medoidVal}</div>
              <p className="text-[11px] text-slate-400">
                ✅ 100% stable! Medoid stays locked on actual central student record #3.
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
              Applied deployments across diagnostics, logistics, academic profiling, and customer intelligence
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase">Case 1 • Barrackpore Academic Lab</span>
            <h3 className="text-base font-bold text-white">Student Learning Profile Clustering</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Sachin and Susmita applied K-Medoids on student quiz attempt patterns. By picking actual representative students as medoids, teachers could consult real student exam papers to design targeted remedial lesson plans.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Case 2 • Kolkata Salt Lake Sector V</span>
            <h3 className="text-base font-bold text-white">Customer Transaction Persona Segmentation</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Debangshu clustered 50,000 corporate procurement accounts with transaction values in ₹ Lakhs. K-Medoids isolated extreme billionaire outlier corporations without distorting mid-market business customer profiles.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase">Case 3 • Shyamnagar &amp; Naihati Logistics</span>
            <h3 className="text-base font-bold text-white">Optimal Warehouse Location Planning</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Swadeep and Tuhina utilized K-Medoids to place Amazon fulfillment hubs. Because medoids must be real candidate addresses, the algorithm selected actual industrial land plots rather than unusable river coordinates.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase">Case 4 • Jadavpur Medical Research Hub</span>
            <h3 className="text-base font-bold text-white">Clinical Patient Case Exemplars</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Abhronila clustered clinical vital logs. Unlike K-Means, which produces artificial fractional blood pressures, K-Medoids selected actual patient files for doctor case reviews.
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
              Key engineering guidelines for K-Medoids clustering systems
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-5 rounded-xl border border-rose-900/40 space-y-3">
            <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
              <span>⚠️</span> Common Mistakes
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li>Running exhaustive PAM on massive datasets ($N &gt; 100,000$) leading to $O(N^2)$ memory exhaustion (Use CLARA instead).</li>
              <li>Assuming K-Medoids guarantees a global optimum (It finds a local optimum depending on initial medoids).</li>
              <li>Using Euclidean distance blindly when Manhattan ($L_1$) distance provides superior median-like robustness.</li>
            </ul>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-emerald-900/40 space-y-3">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>✔</span> Best Practices
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li>Run multiple random restarts (`n_init=10`) to avoid poor local minima.</li>
              <li>Standardize / scale continuous features before computing distance matrices.</li>
              <li>Inspect `medoid_indices_` to interpret real exemplar instances for domain stakeholders.</li>
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
          Why does the median of five numbers $(2, 3, 4, 8, 1000)$ remain $4$, while the mean explodes to $203.4$? How does this exact mathematical property explain why K-Medoids protects machine learning models from noisy real-world data corruption?
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
              Interactive standalone lab script for K-Medoids Dissimilarity Minimization
            </p>
          </div>
        </div>

        <PythonFileLoader
          fileModule={labCode}
          title="k_medoids_concept_lab.py"
          highlightLines={[22, 23, 24, 45, 55]}
        />
      </section>

      {/* 10. FAQ Template */}
      <section className="space-y-4">
        <FAQTemplate
          title="K-Medoids Clustering Concept — Frequently Asked Questions"
          questions={questions}
        />
      </section>

      {/* 11. Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="K-Medoids Clustering Concept & Foundations"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 0 Note"
          downloadFileName="module_006_001_topic0_note.txt"
        />
      </section>

      {/* 12. Teacher Note */}
      <section>
        <Teacher
          note="Whenever your dataset contains noisy sensor spikes, financial outliers, or requires physical exemplar interpretability (like picking real warehouse locations or representative clinical patients), K-Medoids is your algorithm of choice. Remember: A medoid is always a real person, place, or observation! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
