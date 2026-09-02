import React, { useState, useId } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import labCode from "./topic8_files/advantages_limitations_lab.py?raw";
import noteText from "./topic8_files/topic8_note.txt?raw";
import questions from "./topic8_files/topic8_questions.js";

export default function Topic8() {
  const [activeTab, setActiveTab] = useState("theory");
  const [datasetSizeN, setDatasetSizeN] = useState(500);
  const svgId = useId();

  // Computational resource scaling calculations
  const distanceMatrixRamMB = (datasetSizeN * datasetSizeN * 8) / (1024 * 1024);
  const estimatedPamOpsMillion = (2 * (datasetSizeN - 2) * (datasetSizeN - 2)) / 1000000;

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-6xl mx-auto pb-12">
      {/* 1. Header Section */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              BCAC701B • Advanced ML • Module 006_001 • Topic 8
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Complexity &amp; Trade-Offs
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Advantages, Limitations &amp; Engineering Trade-Offs
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl">
            Evaluate the practical strengths and architectural bottlenecks of K-Medoids. Understand quadratic memory scaling, computational complexity mitigation via CLARA/FastPAM, and domain selection criteria for production deployment.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "theory", label: "1. Core Trade-Offs" },
              { id: "interactive", label: "2. Scalability Profiler" },
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
              Teacher's Corner: The Heavy Armor Trade-Off
            </h2>
            <p className="text-xs text-indigo-300/80">
              Classroom discussion by Sukanta Hui (Coder &amp; AccoTax, Barrackpore)
            </p>
          </div>
        </div>

        <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            In our lab, <strong>Debangshu</strong> asked: <em>"Why does K-Medoids take more memory than K-Means as our dataset grows?"</em>
          </p>
          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2">
            <h3 className="font-bold text-amber-300 text-sm md:text-base">
              🛡️ The Knight in Full Plate Armor
            </h3>
            <p className="text-xs md:text-sm text-slate-300">
              K-Medoids wears heavy armor: it computes all pairwise distances to ensure 100% immunity to noise and guarantee real exemplars.
            </p>
            <p className="text-xs md:text-sm text-slate-300">
              That armor is heavy ($O(N^2)$ memory). For modest datasets ($N &lt; 10,000$), modern RAM handles it effortlessly. For massive big data, we use <strong>CLARA</strong> (sampling scouts) to keep the armor light!
            </p>
          </div>
        </div>
      </section>

      {/* 3. Semantic Visual SVG Diagram */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>⚙️</span> Semantic Visual Diagram: Pros vs. Cons Balance Architecture
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto shadow-inner">
          <svg viewBox="0 0 920 280" className="w-full min-w-[750px] font-sans">
            <text x="460" y="25" textAnchor="middle" fill="#38bdf8" className="font-bold text-sm">
              Architectural Balance: Key Strengths vs. Computational Bottlenecks
            </text>

            {/* Left Card: Core Advantages */}
            <g transform="translate(60, 50)">
              <rect x="0" y="0" width="370" height="180" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
              <text x="185" y="25" textAnchor="middle" fill="#34d399" className="font-bold text-xs font-mono">CORE ADVANTAGES (Strengths)</text>

              <rect x="15" y="40" width="340" height="30" rx="4" fill="#064e3b" />
              <text x="25" y="60" fill="#a7f3d0" className="text-[11px] font-mono font-bold">✓ 50% Breakdown Point (Outlier Immunity)</text>

              <rect x="15" y="75" width="340" height="30" rx="4" fill="#064e3b" />
              <text x="25" y="95" fill="#a7f3d0" className="text-[11px] font-mono font-bold">✓ Arbitrary Non-Euclidean Metrics (Cosine/Graph)</text>

              <rect x="15" y="110" width="340" height="30" rx="4" fill="#064e3b" />
              <text x="25" y="130" fill="#a7f3d0" className="text-[11px] font-mono font-bold">✓ 100% Authentic Exemplar Records</text>

              <rect x="15" y="145" width="340" height="25" rx="4" fill="#0f172a" />
              <text x="25" y="162" fill="#6ee7b7" className="text-[10px] font-mono">✓ Discrete / Categorical Data Friendly</text>
            </g>

            {/* Right Card: Core Limitations */}
            <g transform="translate(490, 50)">
              <rect x="0" y="0" width="370" height="180" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="1.5" />
              <text x="185" y="25" textAnchor="middle" fill="#f43f5e" className="font-bold text-xs font-mono">CORE LIMITATIONS (Bottlenecks)</text>

              <rect x="15" y="40" width="340" height="30" rx="4" fill="#4c0519" />
              <text x="25" y="60" fill="#fecdd3" className="text-[11px] font-mono font-bold">⚠ Quadratic Memory Overhead $O(N^2)$</text>

              <rect x="15" y="75" width="340" height="30" rx="4" fill="#4c0519" />
              <text x="25" y="95" fill="#fecdd3" className="text-[11px] font-mono font-bold">⚠ Slower Runtime on Large $N$ ($O(K(N-K)^2)$)</text>

              <rect x="15" y="110" width="340" height="30" rx="4" fill="#4c0519" />
              <text x="25" y="130" fill="#fecdd3" className="text-[11px] font-mono font-bold">⚠ Struggles on Complex Non-Convex Manifolds</text>

              <rect x="15" y="145" width="340" height="25" rx="4" fill="#0f172a" />
              <text x="25" y="162" fill="#fda4af" className="text-[10px] font-mono">⚠ Requires Pre-Specifying Number of Clusters $K$</text>
            </g>

            {/* Explanatory footer */}
            <rect x="60" y="240" width="800" height="35" rx="6" fill="#0f172a" stroke="#334155" />
            <text x="460" y="262" textAnchor="middle" fill="#38bdf8" className="text-xs font-mono">
              • Scalability Solution: Use CLARA (Sampling PAM) when dataset size $N &gt; 10,000$ observations!
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
              Computational Complexity &amp; Scalability Analysis
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Mathematical complexity orders and sampling remedies across K-Medoids variants
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase">Standard PAM</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Exhaustive exact pairwise search.
            </p>
            <div className="text-[11px] font-mono text-amber-300 bg-slate-900 p-2 rounded border border-slate-800">
              Time: $O(K \cdot (N - K)^2)$<br />
              Space: $O(N^2)$ RAM
            </div>
            <p className="text-[11px] text-slate-400">Optimal for $N &lt; 5,000$.</p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">FastPAM</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Caches 2nd-closest medoids for $O(N)$ speedup.
            </p>
            <div className="text-[11px] font-mono text-cyan-300 bg-slate-900 p-2 rounded border border-slate-800">
              Time: $O(K \cdot (N - K))$<br />
              Space: $O(N^2)$ RAM
            </div>
            <p className="text-[11px] text-slate-400">Exact mathematical output.</p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">CLARA (Sampling)</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Multiple random subsamples of size $s$.
            </p>
            <div className="text-[11px] font-mono text-emerald-300 bg-slate-900 p-2 rounded border border-slate-800">
              Time: $O(K \cdot s^2 + K \cdot N)$<br />
              Space: $O(s^2)$ RAM
            </div>
            <p className="text-[11px] text-slate-400">Scales to $N &gt; 1,000,000$.</p>
          </div>
        </div>
      </section>

      {/* 5. Live Interactive Scalability Profiler */}
      <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">
            02
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Live K-Medoids Computational Resource Estimator
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Adjust dataset size $N$ to evaluate distance matrix RAM requirements and PAM swap operations in real-time
            </p>
          </div>
        </div>

        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-slate-300">Dataset Size ($N$ observations):</span>
            <span className="text-cyan-400 font-bold">N = {datasetSizeN.toLocaleString()} records</span>
          </div>

          <input
            type="range"
            min="100"
            max="5000"
            step="100"
            value={datasetSizeN}
            onChange={(e) => setDatasetSizeN(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Distance Matrix Memory</span>
              <div className="text-2xl font-bold font-mono text-cyan-300">
                {distanceMatrixRamMB.toFixed(2)} MB
              </div>
              <p className="text-[10px] text-slate-400">Float64 storage ($N \times N \times 8$ B)</p>
            </div>

            <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase">PAM Swap Operations / Iter</span>
              <div className="text-2xl font-bold font-mono text-amber-300">
                {estimatedPamOpsMillion.toFixed(2)} Million
              </div>
              <p className="text-[10px] text-slate-400">For $K=2$ clusters</p>
            </div>

            <div className={clsx(
              "p-4 rounded-lg border space-y-1",
              datasetSizeN <= 2000
                ? "bg-emerald-950/40 border-emerald-500/50"
                : "bg-amber-950/40 border-amber-500/50"
            )}>
              <span className="text-[11px] font-bold uppercase text-slate-300">Recommended Engine</span>
              <div className="text-lg font-bold font-mono text-white">
                {datasetSizeN <= 2000 ? "✅ Standard PAM (Fast & Exact)" : "⚡ Switch to CLARA or FastPAM"}
              </div>
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
              How Bengal enterprises leverage K-Medoids advantages while engineering around limitations
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase">Case 1 • Jadavpur Cancer Research</span>
            <h3 className="text-base font-bold text-white">Biopsy Gene Expression Analysis</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Mahima clustered 400 patient tumor microarray profiles using K-Medoids. Exact medoid patients provided clear physical tissue biopsy specimens for clinical laboratory drug sensitivity testing.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Case 2 • Kolkata Salt Lake Sector V</span>
            <h3 className="text-base font-bold text-white">CLARA Customer Base Scaling</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Debangshu scaled K-Medoids to 250,000 banking clients using CLARA with 5 random subsamples, achieving 100% outlier resilience in 12 seconds of runtime.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase">Case 3 • Shyamnagar E-Commerce</span>
            <h3 className="text-base font-bold text-white">Delivery Locker Candidate Selection</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Sachin clustered 1,200 pickup requests using road Manhattan distance. K-Medoids selected actual retail storefronts from candidate lists with zero coordinate averaging artifacts.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase">Case 4 • Barrackpore Academic Lab</span>
            <h3 className="text-base font-bold text-white">Student Code Style Archetypes</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Susmita clustered student Python assignments using AST tree edit distance. Medoids provided real, readable student Python files as exemplary code archetypes.
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
              Key engineering guidelines for K-Medoids production pipelines
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-5 rounded-xl border border-rose-900/40 space-y-3">
            <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
              <span>⚠️</span> Common Mistakes
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li>Running full PAM on massive datasets ($N &gt; 20,000$), triggering out-of-memory errors.</li>
              <li>Assuming K-Medoids can detect concentric ring clusters (use DBSCAN or Spectral clustering).</li>
              <li>Failing to standardize continuous attributes before calculating pairwise distance matrices.</li>
            </ul>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-emerald-900/40 space-y-3">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>✔</span> Best Practices
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li>Use standard PAM for $N &lt; 5,000$ and switch to CLARA when $N$ expands.</li>
              <li>Verify cluster quality using Silhouette Analysis ($s &gt; 0.5$).</li>
              <li>Present `medoid_indices_` as real, transparent exemplars to business stakeholders.</li>
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
          Why does a 50% breakdown point make K-Medoids the gold standard for financial fraud detection and clinical outlier isolation, even if it runs slightly slower than K-Means?
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
              Interactive standalone lab script for K-Medoids Scalability &amp; Complexity Profiling
            </p>
          </div>
        </div>

        <PythonFileLoader
          fileModule={labCode}
          title="advantages_limitations_lab.py"
          highlightLines={[15, 20, 30, 40]}
        />
      </section>

      {/* 10. FAQ Template */}
      <section className="space-y-4">
        <FAQTemplate
          title="Advantages &amp; Limitations — Frequently Asked Questions"
          questions={questions}
        />
      </section>

      {/* 11. Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Advantages and Limitations of K-Medoids"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 8 Note"
          downloadFileName="module_006_001_topic8_note.txt"
        />
      </section>

      {/* 12. Teacher Note */}
      <section>
        <Teacher
          note="Knowing the limitations of an algorithm is just as important as knowing its strengths. K-Medoids gives you unmatched outlier resistance and authentic exemplars. When data grows large, scale it with CLARA—and you have the ultimate robust clustering toolkit! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
