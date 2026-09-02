import React, { useState, useId } from "react";
import clsx from "clsx";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import labCode from "./topic3_files/pam_algorithm_lab.py?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";
import questions from "./topic3_files/topic3_questions.js";

export default function Topic3() {
  const [activeTab, setActiveTab] = useState("theory");
  const [pamStep, setPamStep] = useState(1);
  const svgId = useId();

  // Simulated PAM lifecycle cost steps
  const pamSteps = [
    { step: 1, title: "BUILD Phase Initialization", medoids: ["P1 (3, 4)", "P7 (7, 4)"], cost: 24.5, delta: "N/A (Start)" },
    { step: 2, title: "SWAP Iteration 1", medoids: ["P3 (4, 7)", "P7 (7, 4)"], cost: 19.0, delta: "-5.50 (Swap P1 -> P3)" },
    { step: 3, title: "SWAP Iteration 2", medoids: ["P3 (4, 7)", "P8 (8, 5)"], cost: 16.2, delta: "-2.80 (Swap P7 -> P8)" },
    { step: 4, title: "Convergence Reached", medoids: ["P3 (4, 7)", "P8 (8, 5)"], cost: 16.2, delta: "0.00 (Local Optimum!)" }
  ];

  const currentPam = pamSteps[pamStep - 1];

  return (
    <div className="space-y-8 text-slate-200 leading-relaxed max-w-6xl mx-auto pb-12">
      {/* 1. Header Section */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 rounded-2xl border border-indigo-800/40 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 text-xs font-bold tracking-wider uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              BCAC701B • Advanced ML • Module 006_001 • Topic 3
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              The Classic PAM Engine
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            The PAM (Partitioning Around Medoids) Algorithm
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl">
            Explore the complete mathematical mechanics of the PAM algorithm (Kaufman &amp; Rousseeuw, 1987). Master the greedy BUILD phase initialization, pairwise SWAP evaluations, total cost change ($\Delta C$) optimization, and local convergence criteria.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "theory", label: "1. Core PAM Lifecycle" },
              { id: "interactive", label: "2. Live SWAP Stepper Studio" },
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
              Teacher's Corner: The Boardroom Seat Exchange Analogy
            </h2>
            <p className="text-xs text-indigo-300/80">
              Classroom discussion by Sukanta Hui (Coder &amp; AccoTax, Barrackpore)
            </p>
          </div>
        </div>

        <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            In our lab, <strong>Debangshu</strong> asked: <em>"How does PAM systematically find the best medoids without checking all $\binom{N}{K}$ combinations?"</em>
          </p>
          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2">
            <h3 className="font-bold text-amber-300 text-sm md:text-base">
              🪑 The Boardroom Seat Exchange
            </h3>
            <p className="text-xs md:text-sm text-slate-300">
              Imagine $K$ committee chairs seated at the center table (BUILD phase). In the <strong>SWAP phase</strong>, a chair steps down and invites a person from the audience to take their place.
            </p>
            <p className="text-xs md:text-sm text-slate-300">
              If the audience as a whole is happier (total distance $\Delta C &lt; 0$), the swap is kept permanently! The process repeats until no further seat exchange can improve total satisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Semantic Visual SVG Diagram */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>⚙️</span> Semantic Visual Diagram: The Two-Phase PAM Workflow (BUILD &amp; SWAP)
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto shadow-inner">
          <svg viewBox="0 0 920 280" className="w-full min-w-[750px] font-sans">
            <text x="460" y="25" textAnchor="middle" fill="#38bdf8" className="font-bold text-sm">
              The PAM Algorithm Execution Lifecycle: BUILD Phase $\to$ SWAP Iterations $\to$ Convergence
            </text>

            {/* Stage 1: BUILD */}
            <g transform="translate(40, 50)">
              <rect x="0" y="0" width="240" height="180" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="120" y="25" textAnchor="middle" fill="#38bdf8" className="font-bold text-xs font-mono">1. BUILD Phase (Greedy)</text>
              <rect x="15" y="40" width="210" height="40" rx="4" fill="#0f172a" />
              <text x="25" y="65" fill="#cbd5e1" className="text-[11px] font-mono">1st: Global Min Distance</text>
              <rect x="15" y="90" width="210" height="40" rx="4" fill="#0f172a" />
              <text x="25" y="115" fill="#cbd5e1" className="text-[11px] font-mono">2nd..K: Max Cost Gain</text>
              <text x="120" y="160" textAnchor="middle" fill="#34d399" className="text-[10px] font-bold">Initial K Medoids Fixed</text>
            </g>

            {/* Arrow 1 */}
            <path d="M 280 140 L 330 140" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow)" />

            {/* Stage 2: SWAP Evaluation */}
            <g transform="translate(340, 50)">
              <rect x="0" y="0" width="260" height="180" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="130" y="25" textAnchor="middle" fill="#f59e0b" className="font-bold text-xs font-mono">2. SWAP Phase (Optimization)</text>
              <rect x="15" y="40" width="230" height="45" rx="4" fill="#0f172a" />
              <text x="25" y="62" fill="#cbd5e1" className="text-[11px] font-mono">Test all pairs (m, h):</text>
              <text x="25" y="78" fill="#fcd34d" className="text-[10px] font-mono">ΔC = Cost(new) - Cost(curr)</text>
              <rect x="15" y="95" width="230" height="45" rx="4" fill="#0f172a" />
              <text x="25" y="117" fill="#cbd5e1" className="text-[11px] font-mono">If min(ΔC) &lt; 0:</text>
              <text x="25" y="132" fill="#34d399" className="text-[10px] font-mono">Execute Best Swap &amp; Repeat</text>
            </g>

            {/* Arrow 2 */}
            <path d="M 600 140 L 650 140" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrow)" />

            {/* Stage 3: Convergence */}
            <g transform="translate(660, 50)">
              <rect x="0" y="0" width="220" height="180" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
              <text x="110" y="25" textAnchor="middle" fill="#10b981" className="font-bold text-xs font-mono">3. Convergence State</text>
              <rect x="15" y="45" width="190" height="55" rx="4" fill="#0f172a" />
              <text x="105" y="70" textAnchor="middle" fill="#f43f5e" className="font-bold text-xs font-mono">min(ΔC) $\ge$ 0</text>
              <text x="105" y="90" textAnchor="middle" fill="#94a3b8" className="text-[10px]">No swap can reduce cost</text>
              <text x="110" y="145" textAnchor="middle" fill="#34d399" className="text-xs font-mono font-bold">
                ✓ Local Optimum Found!
              </text>
            </g>

            {/* Explanatory footer */}
            <rect x="40" y="240" width="840" height="35" rx="6" fill="#0f172a" stroke="#334155" />
            <text x="460" y="262" textAnchor="middle" fill="#38bdf8" className="text-xs font-mono">
              • Complexity per iteration: $O(K \cdot (N - K)^2)$ | Precomputed Distance Matrix: $O(N^2)$
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
              The Mathematical Cost Difference Formulation ($\Delta C_{m \to h}$)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Evaluating the exact total dissimilarity impact of replacing medoid $m$ with non-medoid $h$
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Total Cost Change $\Delta C$</span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              When swapping medoid $m$ with non-medoid $h$, the change in total clustering cost is the sum of point-wise dissimilarity changes over all $N$ data objects:
            </p>
            <div className="text-[12px] font-mono text-indigo-300 bg-slate-900 p-3 rounded-lg border border-slate-800">
              \Delta C_{m \to h} = \sum_{j=1}^N C_{jmh}
            </div>
            <p className="text-xs text-slate-400">
              Where $C_{jmh}$ is the change in distance for point $j$ resulting from the swap.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">The 4 Transition Cases</span>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
              <li><strong>Case 1:</strong> Point $j$ was in $m$'s cluster and is closer to $h \implies C_{jmh} = d(j, h) - d(j, m)$.</li>
              <li><strong>Case 2:</strong> Point $j$ was in $m$'s cluster but closer to 2nd-best medoid $m_2 \implies C_{jmh} = d(j, m_2) - d(j, m)$.</li>
              <li><strong>Case 3:</strong> Point $j$ was in another cluster but now closer to $h \implies C_{jmh} = d(j, h) - d(j, m_j)$.</li>
              <li><strong>Case 4:</strong> Point $j$ remains in its original other cluster $\implies C_{jmh} = 0$.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Live Interactive SWAP Stepper Studio */}
      <section className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">
            02
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Live PAM Step-by-Step Execution Simulator
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Step through the BUILD initialization and SWAP iterations to observe monotonic cost reduction in real-time
            </p>
          </div>
        </div>

        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-slate-300">Current Step:</span>
            <span className="text-cyan-400 font-bold">Step {pamStep} of 4: {currentPam.title}</span>
          </div>

          <div className="flex gap-2">
            {[1, 2, 3, 4].map((step) => (
              <button
                key={step}
                onClick={() => setPamStep(step)}
                className={clsx(
                  "flex-1 py-2 text-xs font-bold font-mono rounded-lg transition-all cursor-pointer",
                  pamStep === step
                    ? "bg-indigo-600 text-white shadow-md border border-indigo-400"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700 border border-slate-700"
                )}
              >
                Step {step}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="bg-slate-900 p-4 rounded-lg border border-indigo-900/50 space-y-1">
              <span className="text-[11px] font-bold text-indigo-400 uppercase">Active Medoids</span>
              <div className="text-sm font-bold font-mono text-indigo-200">
                {currentPam.medoids.join(" & ")}
              </div>
            </div>

            <div className="bg-slate-900 p-4 rounded-lg border border-amber-900/50 space-y-1">
              <span className="text-[11px] font-bold text-amber-400 uppercase">Total Dissimilarity Cost</span>
              <div className="text-2xl font-bold font-mono text-amber-300">{currentPam.cost.toFixed(2)}</div>
            </div>

            <div className="bg-slate-900 p-4 rounded-lg border border-emerald-900/50 space-y-1">
              <span className="text-[11px] font-bold text-emerald-400 uppercase">Cost Delta ($\Delta C$)</span>
              <div className="text-sm font-bold font-mono text-emerald-300">{currentPam.delta}</div>
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
              Applied PAM deployments across West Bengal enterprise systems
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase">Case 1 • Shyamnagar Supply Chain</span>
            <h3 className="text-base font-bold text-white">E-Commerce Depot Optimization</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Sachin and Susmita used PAM to select 3 optimal delivery hub addresses across 500 retail pickup points, minimizing total driver transit time in kilometers.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Case 2 • Kolkata Salt Lake Sector V</span>
            <h3 className="text-base font-bold text-white">Financial Portfolio Diversification</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Debangshu clustered 2,000 equity assets using correlation distance. PAM identified the exact benchmark stock ticker for each asset sector.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase">Case 3 • Jadavpur Medical Hub</span>
            <h3 className="text-base font-bold text-white">Clinical Trial Patient Stratification</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Mahima clustered 800 diabetic clinical records using PAM. Medoids served as representative trial candidates for new insulin therapy dosage testing.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase">Case 4 • Barrackpore Academic Lab</span>
            <h3 className="text-base font-bold text-white">Exam Question Difficulty Calibration</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Tuhina clustered 150 programming test problems to select 5 benchmark questions that accurately represented all difficulty tiers.
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
              Key engineering guidelines for PAM algorithm execution
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-5 rounded-xl border border-rose-900/40 space-y-3">
            <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
              <span>⚠️</span> Common Mistakes
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li>Running raw PAM on datasets with $N &gt; 20,000$ without subsampling (causes excessive runtime).</li>
              <li>Forgetting that PAM finds a local minimum—running only a single initialization start.</li>
              <li>Re-allocating distance matrices on every swap instead of reusing precomputed lookup tables.</li>
            </ul>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-emerald-900/40 space-y-3">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>✔</span> Best Practices
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li>Precompute the full $N \times N$ pairwise distance matrix once using `scipy.spatial.distance.cdist`.</li>
              <li>Use `scikit-learn-extra` with `method='pam'` for optimized C-accelerated swap testing.</li>
              <li>Use CLARA (Clustering Large Applications) when $N$ exceeds 10,000 observations.</li>
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
          Why does standard PAM evaluate $K \times (N - K)$ candidate swaps during every iteration? How does caching the second-closest medoid for each point allow modern FastPAM to eliminate an entire loop and run $O(N)$ faster?
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
              Interactive standalone lab script for the complete BUILD &amp; SWAP PAM lifecycle
            </p>
          </div>
        </div>

        <PythonFileLoader
          fileModule={labCode}
          title="pam_algorithm_lab.py"
          highlightLines={[25, 26, 40, 50, 70]}
        />
      </section>

      {/* 10. FAQ Template */}
      <section className="space-y-4">
        <FAQTemplate
          title="The PAM Algorithm — Frequently Asked Questions"
          questions={questions}
        />
      </section>

      {/* 11. Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="The PAM Algorithm Complete Lifecycle"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 3 Note"
          downloadFileName="module_006_001_topic3_note.txt"
        />
      </section>

      {/* 12. Teacher Note */}
      <section>
        <Teacher
          note="The beauty of PAM lies in its deterministic BUILD phase followed by greedy SWAP optimization. Always remember: PAM guarantees that every swap strictly decreases total cost. When no swap yields a negative Delta C, you have arrived at your local optimal cluster configuration! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
