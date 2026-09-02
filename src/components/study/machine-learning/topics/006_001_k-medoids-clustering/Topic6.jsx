import React, { useState, useId } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import labCode from "./topic6_files/iteration_convergence_lab.py?raw";
import noteText from "./topic6_files/topic6_note.txt?raw";
import questions from "./topic6_files/topic6_questions.js";

export default function Topic6() {
  const [activeTab, setActiveTab] = useState("theory");
  const [currentIter, setCurrentIter] = useState(3);
  const svgId = useId();

  // Simulated convergence trajectory across 5 iterations
  const iterationLogs = [
    { iter: 1, cost: 48.2, medoids: "[0, 4, 8]", delta: "N/A (Initialization)", status: "Active Learning" },
    { iter: 2, cost: 26.5, medoids: "[1, 5, 9]", delta: "-21.70", status: "Rapid Descent" },
    { iter: 3, cost: 18.0, medoids: "[2, 6, 10]", delta: "-8.50", status: "Fine Tuning" },
    { iter: 4, cost: 16.4, medoids: "[2, 6, 10]", delta: "-1.60", status: "Stabilizing" },
    { iter: 5, cost: 16.4, medoids: "[2, 6, 10]", delta: "0.00", status: "CONVERGED ✓" }
  ];

  const activeLog = iterationLogs[currentIter - 1];

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-6xl mx-auto pb-12">
      {/* 1. Header Section */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              BCAC701B • Advanced ML • Module 006_001 • Topic 6
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Optimization &amp; Stability
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Iteration and Convergence Dynamics
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl">
            Understand how K-Medoids converges to stable local optima. Master convergence trajectories, termination criteria, finite state guarantees, tolerance thresholds, and multi-restart strategies (`n_init`) to avoid poor local minima.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "theory", label: "1. Convergence Theory" },
              { id: "interactive", label: "2. Live Trajectory Simulator" },
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
              Teacher's Corner: The Pendulum Settling Into Equilibrium
            </h2>
            <p className="text-xs text-indigo-300/80">
              Classroom discussion by Sukanta Hui (Coder &amp; AccoTax, Barrackpore)
            </p>
          </div>
        </div>

        <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            In our lab, <strong>Tuhina</strong> asked: <em>"Can K-Medoids keep looping forever without stopping?"</em>
          </p>
          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2">
            <h3 className="font-bold text-amber-300 text-sm md:text-base">
              ⏳ The Finite State Equilibrium
            </h3>
            <p className="text-xs md:text-sm text-slate-300">
              Like a pendulum swinging in friction, each iteration strictly reduces the total distance cost.
            </p>
            <p className="text-xs md:text-sm text-slate-300">
              Because there are only a finite number of combinations of choosing $K$ medoids from $N$ points, the algorithm <strong>cannot loop infinitely</strong> and is mathematically guaranteed to come to a complete rest at a local minimum!
            </p>
          </div>
        </div>
      </section>

      {/* 3. Semantic Visual SVG Diagram */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>⚙️</span> Semantic Visual Diagram: Monotonic Cost Reduction Convergence Curve
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto shadow-inner">
          <svg viewBox="0 0 920 280" className="w-full min-w-[750px] font-sans">
            <text x="460" y="25" textAnchor="middle" fill="#38bdf8" className="font-bold text-sm">
              Total Clustering Cost Monotonic Decay: Rapid Early Drop $\to$ Asymptotic Plateau $\to$ Convergence
            </text>

            {/* Axes */}
            <g transform="translate(80, 40)">
              {/* Y Axis */}
              <line x1="0" y1="0" x2="0" y2="180" stroke="#475569" strokeWidth="2" />
              <text x="-10" y="10" textAnchor="end" fill="#94a3b8" className="font-mono text-xs font-bold">Total Cost J</text>

              {/* X Axis */}
              <line x1="0" y1="180" x2="720" y2="180" stroke="#475569" strokeWidth="2" />
              <text x="720" y="200" textAnchor="end" fill="#94a3b8" className="font-mono text-xs font-bold">Iteration Number (t)</text>

              {/* Grid Lines */}
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <line key={`gx${i}`} x1={i * 140} y1="0" x2={i * 140} y2="180" stroke="#1e293b" strokeDasharray="3,3" />
              ))}

              {/* Convergence Trajectory Curve */}
              <path
                d="M 0 20 Q 140 110, 280 145 T 420 160 T 560 160 T 700 160"
                fill="none"
                stroke="#10b981"
                strokeWidth="3.5"
              />

              {/* Iteration Points */}
              <circle cx="0" cy="20" r="6" fill="#f43f5e" />
              <text x="15" y="25" fill="#fda4af" className="font-mono text-xs">t=1 (Cost=48.2)</text>

              <circle cx="140" cy="115" r="6" fill="#f59e0b" />
              <text x="150" y="105" fill="#fcd34d" className="font-mono text-xs">t=2 (Cost=26.5)</text>

              <circle cx="280" cy="148" r="6" fill="#38bdf8" />
              <text x="290" y="140" fill="#7dd3fc" className="font-mono text-xs">t=3 (Cost=18.0)</text>

              <circle cx="420" cy="160" r="6" fill="#10b981" />
              <text x="430" y="150" fill="#6ee7b7" className="font-mono text-xs">t=4 (Cost=16.4)</text>

              <circle cx="560" cy="160" r="8" fill="#10b981" stroke="#fff" strokeWidth="2" />
              <text x="560" y="140" textAnchor="middle" fill="#34d399" className="font-mono text-xs font-bold">
                t=5 (CONVERGED ✓)
              </text>
            </g>

            {/* Explanatory footer */}
            <rect x="60" y="240" width="800" height="35" rx="6" fill="#0f172a" stroke="#334155" />
            <text x="460" y="262" textAnchor="middle" fill="#38bdf8" className="text-xs font-mono">
              • Convergence Guarantee: Total cost is strictly non-increasing ($J^{(t+1)} \le J^{(t)}$) across all steps!
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
              Mathematical Convergence Criteria
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Stopping thresholds, discrete state bounds, and Lyapunov stability
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Termination Thresholds</span>
            <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
              <li><strong>Medoid Set Equality:</strong> $M^{(t+1)} = M^{(t)}$ (No medoid moved).</li>
              <li><strong>Absolute Cost Tolerance:</strong> $|J^{(t)} - J^{(t+1)}| &lt; \text{tol}$ (e.g. $10^{-6}$).</li>
              <li><strong>Maximum Iteration Limit:</strong> $t \ge \text{max\_iter}$ (Prevents runaway execution).</li>
            </ul>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Multi-Restart Strategy (`n_init`)</span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Because K-Medoids converges to a local minimum, standard practice runs $R$ independent initializations:
            </p>
            <div className="text-[12px] font-mono text-emerald-300 bg-slate-900 p-3 rounded-lg border border-slate-800">
              M^* = \arg\min_{r \in \{1 \dots R\}} J(M_r^{\text{converged}})
            </div>
            <p className="text-xs text-slate-400">
              Running `n_init=10` ensures an optimal local minimum close to the global optimum.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Live Interactive Trajectory Simulator */}
      <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">
            02
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Live Iteration-by-Iteration Convergence Stepper
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Step through iterations 1 to 5 to observe how medoid indices stabilize and total dissimilarity cost locks onto its minimum
            </p>
          </div>
        </div>

        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-slate-300">Active Iteration:</span>
            <span className="text-cyan-400 font-bold">Iteration {currentIter} of 5 ({activeLog.status})</span>
          </div>

          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((iter) => (
              <button
                key={iter}
                onClick={() => setCurrentIter(iter)}
                className={clsx(
                  "flex-1 py-2 text-xs font-bold font-mono rounded-lg transition-all cursor-pointer",
                  currentIter === iter
                    ? "bg-indigo-600 text-white shadow-md border border-indigo-400"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700 border border-slate-700"
                )}
              >
                Iter {iter}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="bg-slate-900 p-4 rounded-lg border border-indigo-900/50 space-y-1">
              <span className="text-[11px] font-bold text-indigo-400 uppercase">Active Medoid Indices</span>
              <div className="text-xl font-bold font-mono text-indigo-200">{activeLog.medoids}</div>
            </div>

            <div className="bg-slate-900 p-4 rounded-lg border border-amber-900/50 space-y-1">
              <span className="text-[11px] font-bold text-amber-400 uppercase">Total Dissimilarity Cost</span>
              <div className="text-2xl font-bold font-mono text-amber-300">{activeLog.cost.toFixed(2)}</div>
            </div>

            <div className={clsx(
              "p-4 rounded-lg border space-y-1",
              currentIter === 5
                ? "bg-emerald-950/50 border-emerald-500/50"
                : "bg-slate-900 border-slate-800"
            )}>
              <span className="text-[11px] font-bold uppercase text-slate-300">Convergence State</span>
              <div className="text-lg font-bold font-mono text-white">
                {currentIter === 5 ? "✅ CONVERGED (Delta = 0.00)" : `Iterating (Delta = ${activeLog.delta})`}
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
              Applied convergence monitoring across Bengal enterprise analytics
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase">Case 1 • Kolkata Banking Cloud</span>
            <h3 className="text-base font-bold text-white">Automated Batch Fraud Clustering</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Debangshu monitored nightly clustering of 100,000 transaction vectors. Implementing tolerance-based early stopping reduced cluster compute runtimes from 45 minutes to 8 minutes.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Case 2 • Shyamnagar Supply Chain</span>
            <h3 className="text-base font-bold text-white">Multi-Restart Route Stability</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Sachin executed K-Medoids with `n_init=15` on delivery addresses, avoiding poor local minima that would have routed vans across unnecessary railway crossings.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase">Case 3 • Jadavpur Medical Hub</span>
            <h3 className="text-base font-bold text-white">Clinical Phenotype Convergence</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Mahima validated that patient vital sign clusters converged consistently across 20 bootstrap data splits, proving the medical reliability of the discovered phenotypes.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase">Case 4 • Barrackpore Academic Lab</span>
            <h3 className="text-base font-bold text-white">Student Quiz Cluster Stability</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Susmita tracked convergence across 120 student test profiles, finding that medoids stabilized within just 4 iterations.
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
              Key engineering guidelines for convergence management
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-5 rounded-xl border border-rose-900/40 space-y-3">
            <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
              <span>⚠️</span> Common Mistakes
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li>Running only a single initialization (`n_init=1`), risking getting stuck in poor local minima.</li>
              <li>Setting `max_iter` too low, cutting off iterations before convergence is reached.</li>
              <li>Relying on non-deterministic tie-breaking, causing infinite oscillation loops.</li>
            </ul>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-emerald-900/40 space-y-3">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>✔</span> Best Practices
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li>Always set `n_init >= 10` for production clustering pipelines.</li>
              <li>Inspect `kmedoids.n_iter_` to verify whether the algorithm stopped via convergence or `max_iter`.</li>
              <li>Use K-Medoids++ distance-weighted probabilistic initialization for faster convergence.</li>
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
          Why does K-Medoids with K-Medoids++ initialization converge nearly $2\times$ faster than uniform random initialization? How does seeding initial medoids far apart from each other accelerate convergence?
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
              Interactive standalone lab script for Iteration Tracking &amp; Convergence Analysis
            </p>
          </div>
        </div>

        <PythonFileLoader
          fileModule={labCode}
          title="iteration_convergence_lab.py"
          highlightLines={[25, 30, 40, 45, 55]}
        />
      </section>

      {/* 10. FAQ Template */}
      <section className="space-y-4">
        <FAQTemplate
          title="Iteration and Convergence — Frequently Asked Questions"
          questions={questions}
        />
      </section>

      {/* 11. Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Iteration and Convergence Dynamics"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 6 Note"
          downloadFileName="module_006_001_topic6_note.txt"
        />
      </section>

      {/* 12. Teacher Note */}
      <section>
        <Teacher
          note="Convergence is your assurance of stability. When the medoids stop shifting, your model has discovered the optimal discrete exemplars for your data. Always use n_init=10 to ensure you land in the best possible local minimum! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
