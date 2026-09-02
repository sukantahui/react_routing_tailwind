import React, { useState, useId } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import labCode from "./topic9_files/worked_example_kmedoids_lab.py?raw";
import noteText from "./topic9_files/topic9_note.txt?raw";
import questions from "./topic9_files/topic9_questions.js";

export default function Topic9() {
  const [activeTab, setActiveTab] = useState("theory");
  const [testedSwap, setTestedSwap] = useState("none");
  const svgId = useId();

  // Step-by-step swap evaluation data
  const swapOptions = {
    none: { medoids: "B(2,3) & E(9,8)", cost: 6, delta: "0 (Base Configuration)", status: "OPTIMAL BASE" },
    swap_B_A: { medoids: "A(1,2) & E(9,8)", cost: 8, delta: "+2 (Cost Increases!)", status: "REJECTED ❌" },
    swap_B_C: { medoids: "C(3,2) & E(9,8)", cost: 6, delta: "0 (Equal Cost)", status: "REJECTED (No Gain)" },
    swap_E_D: { medoids: "B(2,3) & D(8,7)", cost: 6, delta: "0 (Equal Cost)", status: "REJECTED (No Gain)" }
  };

  const currentSwap = swapOptions[testedSwap];

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-6xl mx-auto pb-12">
      {/* 1. Header Section */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              BCAC701B • Advanced ML • Module 006_001 • Topic 9
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Worked Numerical Walkthrough
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Worked Example 1: K-Medoids with a Small Dataset
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl">
            Step through a comprehensive pen-and-paper numerical walkthrough of K-Medoids ($K=2$). Construct pairwise distance matrices, compute BUILD phase initial medoids, evaluate SWAP phase cost deltas ($\Delta C$), and verify convergence.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "theory", label: "1. Step-by-Step Derivation" },
              { id: "interactive", label: "2. Live SWAP Evaluation Lab" },
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
              Teacher's Corner: The 5-Point Manual Calculation on Paper
            </h2>
            <p className="text-xs text-indigo-300/80">
              Classroom discussion by Sukanta Hui (Coder &amp; AccoTax, Barrackpore)
            </p>
          </div>
        </div>

        <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            In our lab, <strong>Abhronila</strong> and <strong>Swadeep</strong> sat down with pen and paper to manually calculate a 5-point dataset: $A(1,2), B(2,3), C(3,2), D(8,7), E(9,8)$ for $K=2$.
          </p>
          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2">
            <h3 className="font-bold text-amber-300 text-sm md:text-base">
              📝 Why Solve It by Hand First?
            </h3>
            <p className="text-xs md:text-sm text-slate-300">
              When you compute the $5 \times 5$ distance matrix, sum the rows to find the first medoid $B(2,3)$, and calculate the cost reduction gain for $E(9,8)$, the entire abstract algorithm becomes crystal clear!
            </p>
          </div>
        </div>
      </section>

      {/* 3. Semantic Visual SVG Diagram: The 5-Point Geometry */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>⚙️</span> Semantic Visual Diagram: Geometric Space of 5 Dataset Points
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto shadow-inner">
          <svg viewBox="0 0 920 280" className="w-full min-w-[750px] font-sans">
            <text x="460" y="25" textAnchor="middle" fill="#38bdf8" className="font-bold text-sm">
              Point Geometry in 2D Space: Cluster 1 {`{A, B, C}`} vs. Cluster 2 {`{D, E}`}
            </text>

            {/* Left Box: 2D Plane */}
            <g transform="translate(80, 50)">
              <rect x="0" y="0" width="360" height="180" rx="8" fill="#1e293b" stroke="#334155" />

              {/* Cluster 1 Points (Near origin) */}
              <circle cx="40" cy="140" r="6" fill="#38bdf8" />
              <text x="40" y="160" textAnchor="middle" fill="#7dd3fc" className="text-[11px] font-mono">A(1, 2)</text>

              {/* Medoid 1: Point B */}
              <circle cx="70" cy="110" r="10" fill="#10b981" stroke="#fff" strokeWidth="2" />
              <text x="70" y="95" textAnchor="middle" fill="#6ee7b7" className="text-xs font-bold font-mono">Medoid B(2, 3)</text>

              <circle cx="100" cy="140" r="6" fill="#38bdf8" />
              <text x="100" y="160" textAnchor="middle" fill="#7dd3fc" className="text-[11px] font-mono">C(3, 2)</text>

              {/* Cluster 2 Points (Far) */}
              <circle cx="280" cy="50" r="6" fill="#f59e0b" />
              <text x="280" y="70" textAnchor="middle" fill="#fcd34d" className="text-[11px] font-mono">D(8, 7)</text>

              {/* Medoid 2: Point E */}
              <circle cx="320" cy="30" r="10" fill="#10b981" stroke="#fff" strokeWidth="2" />
              <text x="320" y="15" textAnchor="middle" fill="#6ee7b7" className="text-xs font-bold font-mono">Medoid E(9, 8)</text>

              {/* Boundary separator */}
              <line x1="190" y1="0" x2="190" y2="180" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4,4" />
            </g>

            {/* Right Box: Distance Matrix */}
            <g transform="translate(480, 50)">
              <rect x="0" y="0" width="380" height="180" rx="8" fill="#1e293b" stroke="#818cf8" strokeWidth="1.5" />
              <text x="190" y="25" textAnchor="middle" fill="#a5b4fc" className="font-bold text-xs font-mono">5x5 Manhattan Distance Matrix</text>

              {[
                { row: "A", vals: [0, 2, 2, 12, 14], sum: 30 },
                { row: "B", vals: [2, 0, 2, 10, 12], sum: 26, highlight: true },
                { row: "C", vals: [2, 2, 0, 10, 12], sum: 26 },
                { row: "D", vals: [12, 10, 10, 0, 2], sum: 34 },
                { row: "E", vals: [14, 12, 12, 2, 0], sum: 40 },
              ].map((r, idx) => (
                <g key={idx} transform={`translate(20, ${38 + idx * 26})`}>
                  <rect x="0" y="0" width="340" height="22" rx="4" fill={r.highlight ? "#064e3b" : "#0f172a"} />
                  <text x="10" y="15" fill={r.highlight ? "#34d399" : "#38bdf8"} className="text-xs font-mono font-bold">{r.row}:</text>
                  <text x="40" y="15" fill="#cbd5e1" className="text-xs font-mono">{r.vals.map(v => String(v).padStart(2, " ")).join("  ")}</text>
                  <text x="240" y="15" fill={r.highlight ? "#a7f3d0" : "#94a3b8"} className="text-[11px] font-mono">Sum = {r.sum} {r.highlight ? "(MIN -> M1)" : ""}</text>
                </g>
              ))}
            </g>

            {/* Explanatory footer */}
            <rect x="60" y="240" width="800" height="35" rx="6" fill="#0f172a" stroke="#334155" />
            <text x="460" y="262" textAnchor="middle" fill="#38bdf8" className="text-xs font-mono">
              • Initial Medoids: B(2,3) and E(9,8) | Total Clustering Cost: J = 2 + 0 + 2 + 2 + 0 = 6.00
            </text>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown Section: Step-by-Step Derivation */}
      <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">
            01
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Mathematical Step-by-Step PAM Derivation
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              BUILD phase cost reduction gains and SWAP evaluation deltas
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">1. BUILD Phase Step 2 (Gain Calculation)</span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              With $M_1 = B(2, 3)$, we evaluate the distance savings if candidate $h$ is added as $M_2$:
            </p>
            <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
              <li>Candidate A: Gain = $2$</li>
              <li>Candidate C: Gain = $2$</li>
              <li>Candidate D: Gain = $\max(0, 10-0) + \max(0, 12-2) = 20$</li>
              <li>Candidate E: Gain = $\max(0, 10-2) + \max(0, 12-0) = 20$</li>
            </ul>
            <p className="text-xs text-emerald-400 font-bold">
              Candidate E achieves maximum gain (20) and is chosen as Medoid 2!
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">2. SWAP Phase Evaluation ($\Delta C$)</span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Base Medoids: $[B, E]$ with Total Cost $J = 6.00$.
            </p>
            <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
              <li>Swap $B \to A$: New Cost = $8 \implies \Delta C = +2$ (Rejected)</li>
              <li>Swap $B \to C$: New Cost = $6 \implies \Delta C = 0$ (No gain)</li>
              <li>Swap $E \to D$: New Cost = $6 \implies \Delta C = 0$ (No gain)</li>
            </ul>
            <p className="text-xs text-emerald-400 font-bold">
              No swap yields $\Delta C &lt; 0$. Initial configuration $[B, E]$ is converged!
            </p>
          </div>
        </div>
      </section>

      {/* 5. Live Interactive SWAP Evaluation Lab */}
      <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">
            02
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Live SWAP Evaluation Verification Lab
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Select candidate point swaps to verify why PAM rejects them and converges on $[B(2,3), E(9,8)]$
            </p>
          </div>
        </div>

        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
          <div className="flex flex-wrap gap-2">
            {[
              { id: "none", label: "Base: [B, E]" },
              { id: "swap_B_A", label: "Test Swap B -> A" },
              { id: "swap_B_C", label: "Test Swap B -> C" },
              { id: "swap_E_D", label: "Test Swap E -> D" },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setTestedSwap(opt.id)}
                className={clsx(
                  "px-4 py-2 text-xs font-bold font-mono rounded-lg transition-all cursor-pointer",
                  testedSwap === opt.id
                    ? "bg-indigo-600 text-white shadow-md border border-indigo-400"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Active Medoids</span>
              <div className="text-lg font-bold font-mono text-white">{currentSwap.medoids}</div>
            </div>

            <div className="bg-slate-900 p-4 rounded-lg border border-amber-900/50 space-y-1">
              <span className="text-[11px] font-bold text-amber-400 uppercase">Total Clustering Cost</span>
              <div className="text-2xl font-bold font-mono text-amber-300">{currentSwap.cost.toFixed(2)}</div>
            </div>

            <div className={clsx(
              "p-4 rounded-lg border space-y-1",
              testedSwap === "none"
                ? "bg-emerald-950/50 border-emerald-500/50"
                : "bg-slate-900 border-slate-800"
            )}>
              <span className="text-[11px] font-bold uppercase text-slate-300">SWAP Decision</span>
              <div className="text-base font-bold font-mono text-white">{currentSwap.status}</div>
              <p className="text-[10px] text-slate-400">Delta Cost = {currentSwap.delta}</p>
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
              Applying the small-scale manual methodology to real-world operational problems
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase">Case 1 • Shyamnagar Courier Dispatch</span>
            <h3 className="text-base font-bold text-white">Manual Verification of Depot Nodes</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Sachin manually verified 5 candidate delivery hub plots in Shyamnagar before deploying automated routing scripts, ensuring physical road connectivity matched distance matrices.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Case 2 • Barrackpore Academic Lab</span>
            <h3 className="text-base font-bold text-white">Classroom Exam Benchmark Calibration</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Tuhina hand-calculated distance matrices across 5 student test scores to prove that student B's exam paper was the exact mathematical median exemplar for the batch.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase">Case 3 • Kolkata Salt Lake Sector V</span>
            <h3 className="text-base font-bold text-white">Unit Test Validation of Clustering Microservices</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Debangshu coded this 5-point dataset as a deterministic unit test in CI/CD pipelines to verify that newly deployed C++ clustering microservices returned exact medoids $[1, 4]$.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase">Case 4 • Jadavpur Medical Hub</span>
            <h3 className="text-base font-bold text-white">Pilot Clinical Trial Validation</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Mahima validated a 5-patient pilot clinical trial dataset by hand to verify medication dosage subgroupings before scaling to 1,000 hospital patients.
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
              Key insights from manual calculation to prevent implementation bugs
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-5 rounded-xl border border-rose-900/40 space-y-3">
            <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
              <span>⚠️</span> Common Mistakes
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li>Summing columns instead of rows (though symmetric, helps avoid off-by-one index bugs).</li>
              <li>Forgetting that distance from a point to itself is zero ($D[i, i] = 0$).</li>
              <li>Accepting a swap when $\Delta C = 0$ (causes infinite swap oscillations).</li>
            </ul>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-emerald-900/40 space-y-3">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>✔</span> Best Practices
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li>Always execute a manual calculation on a 5-point dummy dataset before writing production code.</li>
              <li>Require strictly negative $\Delta C &lt; -10^{-6}$ before accepting a candidate swap.</li>
              <li>Use NumPy matrix operations to verify manual matrix derivations in automated test suites.</li>
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
          In this worked example, Points $B(2,3)$ and $C(3,2)$ had identical row sums ($26$). If $C$ was chosen as Medoid 1 instead of $B$, why would the total clustering cost and final cluster assignments remain identical?
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
              Interactive standalone lab script for the complete Worked Numerical Example
            </p>
          </div>
        </div>

        <PythonFileLoader
          fileModule={labCode}
          title="worked_example_kmedoids_lab.py"
          highlightLines={[25, 30, 45, 50, 60]}
        />
      </section>

      {/* 10. FAQ Template */}
      <section className="space-y-4">
        <FAQTemplate
          title="Worked Example 1 — Frequently Asked Questions"
          questions={questions}
        />
      </section>

      {/* 11. Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Worked Example 1: K-Medoids Step-by-Step"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 9 Note"
          downloadFileName="module_006_001_topic9_note.txt"
        />
      </section>

      {/* 12. Teacher Note */}
      <section>
        <Teacher
          note="Solving a clustering algorithm by hand with a 5-point dataset is the ultimate masterclass in algorithm literacy. Once you see the matrix rows and gain calculations with your own eyes, no clustering question on any exam or interview can ever intimidate you! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
