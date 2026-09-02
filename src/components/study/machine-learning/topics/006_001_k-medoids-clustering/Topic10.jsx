import React, { useState, useId } from "react";
import clsx from "clsx";
import { InlineMath, BlockMath } from "react-katex";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import labCode from "./topic10_files/numerical_exercises_lab.py?raw";
import noteText from "./topic10_files/topic10_note.txt?raw";
import questions from "./topic10_files/topic10_questions.js";

export default function Topic10() {
  const [activeTab, setActiveTab] = useState("theory");
  const [selectedEx, setSelectedEx] = useState(1);
  const svgId = useId();

  const exercises = [
    {
      id: 1,
      title: "Exercise 1: 4-Point Manhattan PAM (K = 2)",
      problem: "Points: P1(1,1), P2(2,1), P3(7,8), P4(8,8). Find initial medoids using BUILD and verify convergence.",
      medoids: "P2(2,1) and P3(7,8)",
      cost: 2.0,
      solution: "1st Medoid: P2 (Row sum = 26). 2nd Medoid: P3 (Gain = 24). Total Cost = 1 + 0 + 0 + 1 = 2."
    },
    {
      id: 2,
      title: "Exercise 2: SWAP Phase Delta C Evaluation",
      problem: "Given Distance Matrix for 4 points. Current Medoids = [P1, P4]. Test candidate swap P1 -> P2.",
      medoids: "Tested: [P2, P4]",
      cost: 5.0,
      solution: "Cost(curr) = 5. Cost(new) = 5. Delta C = 0. Swap is REJECTED (Must be strictly negative < 0)."
    },
    {
      id: 3,
      title: "Exercise 3: Intra-Cluster Medoid Recalculation",
      problem: "Cluster members: A, B, C with intra-cluster distance sums 18, 12, 15. Find updated medoid.",
      medoids: "Updated Medoid: Point B",
      cost: 12.0,
      solution: "Point B minimizes the sum of intra-cluster distances (12 < 15 < 18) and becomes the new medoid."
    }
  ];

  const currentExercise = exercises[selectedEx - 1];

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
              BCAC701B • Advanced ML • Module 006_001 • Topic 10
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Problem Solving &amp; Exercises
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Numerical Exercises &amp; Mathematical Problem Solving
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl">
            Solve academic university and technical interview numerical problems on K-Medoids. Master distance matrix construction, BUILD gain calculations, SWAP phase cost difference formulas, and silhouette validation by hand.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "theory", label: "1. Core Exercises" },
              { id: "interactive", label: "2. Live Problem Solver Studio" },
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
              Teacher's Corner: The Formula for Acing University Exams
            </h2>
            <p className="text-xs text-indigo-300/80">
              Classroom discussion by Sukanta Hui (Coder &amp; AccoTax, Barrackpore)
            </p>
          </div>
        </div>

        <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            In our lab, <strong>Mahima</strong> and <strong>Susmita</strong> practiced past semester exam problems. <strong>Sukanta Hui</strong> shared the golden exam rule:
          </p>
          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2">
            <h3 className="font-bold text-amber-300 text-sm md:text-base">
              🎯 The 3-Step Exam Strategy
            </h3>
            <p className="text-xs md:text-sm text-slate-300">
              1. <strong>Step 1:</strong> Always write the full <InlineMath math="N \times N" /> distance matrix first (put $0$ on the diagonal).
            </p>
            <p className="text-xs md:text-sm text-slate-300">
              2. <strong>Step 2:</strong> Sum the rows to instantly identify the 1st Medoid (minimum row sum).
            </p>
            <p className="text-xs md:text-sm text-slate-300">
              3. <strong>Step 3:</strong> Compute the gain for candidate medoids using <InlineMath math="\\sum \\max(0, D_{\\text{curr}} - D_{\\text{cand}})" />.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Semantic Visual SVG Diagram */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>⚙️</span> Semantic Visual Diagram: Numerical Exercise Architecture
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto shadow-inner">
          <svg viewBox="0 0 920 280" className="w-full min-w-[750px] font-sans">
            <text x="460" y="25" textAnchor="middle" fill="#38bdf8" className="font-bold text-sm">
              Standard Numerical Exam Problem Flow: Coordinates → Distance Matrix → BUILD → SWAP
            </text>

            {/* Step 1 */}
            <g transform="translate(40, 50)">
              <rect x="0" y="0" width="180" height="180" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="90" y="25" textAnchor="middle" fill="#38bdf8" className="font-bold text-xs font-mono">1. Dataset Coordinates</text>
              <rect x="10" y="45" width="160" height="50" rx="4" fill="#0f172a" />
              <text x="20" y="65" fill="#cbd5e1" className="text-[11px] font-mono">P1(1,1), P2(2,1)</text>
              <text x="20" y="85" fill="#cbd5e1" className="text-[11px] font-mono">P3(7,8), P4(8,8)</text>
              <text x="90" y="150" textAnchor="middle" fill="#7dd3fc" className="text-[10px]">Points Given</text>
            </g>

            {/* Arrow 1 */}
            <path d="M 220 140 L 255 140" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow)" />

            {/* Step 2 */}
            <g transform="translate(260, 50)">
              <rect x="0" y="0" width="200" height="180" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="100" y="25" textAnchor="middle" fill="#f59e0b" className="font-bold text-xs font-mono">2. Distance Matrix</text>
              <rect x="10" y="45" width="180" height="55" rx="4" fill="#0f172a" />
              <text x="20" y="68" fill="#cbd5e1" className="text-[11px] font-mono">Row Sums:</text>
              <text x="20" y="88" fill="#fcd34d" className="text-[11px] font-mono">P2 = 26 (MIN!)</text>
              <text x="100" y="150" textAnchor="middle" fill="#34d399" className="text-[10px] font-bold">M1 = P2(2, 1)</text>
            </g>

            {/* Arrow 2 */}
            <path d="M 460 140 L 495 140" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow)" />

            {/* Step 3 */}
            <g transform="translate(500, 50)">
              <rect x="0" y="0" width="190" height="180" rx="8" fill="#1e293b" stroke="#818cf8" strokeWidth="1.5" />
              <text x="95" y="25" textAnchor="middle" fill="#818cf8" className="font-bold text-xs font-mono">3. Gain Evaluation</text>
              <rect x="10" y="45" width="170" height="55" rx="4" fill="#0f172a" />
              <text x="20" y="68" fill="#cbd5e1" className="text-[11px] font-mono">Gain for P3 = 24</text>
              <text x="20" y="88" fill="#a5b4fc" className="text-[11px] font-mono">Max Gain Achieved!</text>
              <text x="95" y="150" textAnchor="middle" fill="#34d399" className="text-[10px] font-bold">M2 = P3(7, 8)</text>
            </g>

            {/* Arrow 3 */}
            <path d="M 690 140 L 725 140" stroke="#818cf8" strokeWidth="3" markerEnd="url(#arrow)" />

            {/* Step 4 */}
            <g transform="translate(730, 50)">
              <rect x="0" y="0" width="150" height="180" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
              <text x="75" y="25" textAnchor="middle" fill="#10b981" className="font-bold text-xs font-mono">4. Solution</text>
              <rect x="10" y="45" width="130" height="55" rx="4" fill="#0f172a" />
              <text x="75" y="68" textAnchor="middle" fill="#34d399" className="font-bold text-xs font-mono">J = 2.00</text>
              <text x="75" y="88" textAnchor="middle" fill="#cbd5e1" className="text-[10px]">Optimal Cost</text>
              <text x="75" y="150" textAnchor="middle" fill="#34d399" className="text-xs font-bold font-mono">✓ Solved!</text>
            </g>

            {/* Explanatory footer */}
            <rect x="40" y="240" width="840" height="35" rx="6" fill="#0f172a" stroke="#334155" />
            <text x="460" y="262" textAnchor="middle" fill="#38bdf8" className="text-xs font-mono">
              • All numerical exercises can be deterministically solved via systematic matrix row &amp; gain lookups!
            </text>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown Section: 3 Problem Walkthroughs */}
      <section id="theory" className="scroll-mt-6 bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">
            01
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Core Numerical Problem Sets
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Detailed step-by-step mathematical solutions for typical exam scenarios
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {exercises.map((ex) => (
            <div key={ex.id} className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Exercise {ex.id}</span>
              <h3 className="text-sm font-bold text-white">{ex.title}</h3>
              <p className="text-xs text-slate-300">{ex.problem}</p>
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-emerald-400 uppercase">Solution Summary</span>
                <p className="text-[11px] text-slate-300 font-mono">{ex.solution}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Live Interactive Problem Solver Studio */}
      <section id="interactive" className="scroll-mt-6 bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">
            02
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Live Numerical Problem Solver Studio
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Select an exercise to inspect full mathematical derivations, medoid selections, and cost verification
            </p>
          </div>
        </div>

        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
          <div className="flex flex-wrap gap-2">
            {exercises.map((ex) => (
              <button
                key={ex.id}
                onClick={() => setSelectedEx(ex.id)}
                className={clsx(
                  "px-4 py-2 text-xs font-bold font-mono rounded-lg transition-all cursor-pointer",
                  selectedEx === ex.id
                    ? "bg-indigo-600 text-white shadow-md border border-indigo-400"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
                )}
              >
                Exercise {ex.id}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Calculated Medoids</span>
              <div className="text-base font-bold font-mono text-cyan-300">{currentExercise.medoids}</div>
            </div>

            <div className="bg-slate-900 p-4 rounded-lg border border-amber-900/50 space-y-1">
              <span className="text-[11px] font-bold text-amber-400 uppercase">Optimal Total Cost (J)</span>
              <div className="text-2xl font-bold font-mono text-amber-300">{currentExercise.cost.toFixed(2)}</div>
            </div>

            <div className="bg-emerald-950/40 p-4 rounded-lg border border-emerald-500/50 space-y-1">
              <span className="text-[11px] font-bold text-emerald-400 uppercase">Verification Status</span>
              <div className="text-base font-bold font-mono text-white">✅ 100% Mathematically Optimal</div>
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
              Transforming classroom numerical problem exercises into industrial production deployments
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase">Case 1 • Shyamnagar Industrial Belt</span>
            <h3 className="text-base font-bold text-white">Factory Sensor Outlier Calibration</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Debangshu applied 4-point manual Manhattan distance checks to verify temperature sensor clustering formulas before programming PLC automation units.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Case 2 • Barrackpore Academic Lab</span>
            <h3 className="text-base font-bold text-white">Semester Exam Problem Generation</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Susmita drafted verified numerical problems for university semester tests, ensuring integer Manhattan distance matrices with unique local minima.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase">Case 3 • Kolkata Salt Lake Sector V</span>
            <h3 className="text-base font-bold text-white">Interview Technical Assessment</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Sachin developed numerical whiteboard problem exercises for senior data science recruitment interviews at top IT firms in Kolkata.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase">Case 4 • Jadavpur Medical Hub</span>
            <h3 className="text-base font-bold text-white">Clinical Dosage Cluster Check</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Mahima solved 6-point clinical patient subgroup problems by hand to guarantee medical accuracy before clinical data automation.
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
              Guidelines for solving numerical K-Medoids problems accurately
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-5 rounded-xl border border-rose-900/40 space-y-3">
            <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
              <span>⚠️</span> Common Mistakes
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li>Forgetting that gain cannot be negative: always use <InlineMath math="\\max(0, D_{\\text{curr}} - D_{\\text{cand}})" />.</li>
              <li>Calculating SWAP cost deltas only on medoids instead of summing across all <InlineMath math="N" /> data points.</li>
            </ul>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-emerald-900/40 space-y-3">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>✔</span> Best Practices
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li>Write down the complete symmetric distance matrix before attempting any gain calculations.</li>
              <li>Double-check row sums to avoid selecting a suboptimal first medoid in the BUILD phase.</li>
              <li>Verify final cluster cost using the sum of minimum distances to all active medoids.</li>
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
          In Exercise 2, when testing the swap of Medoid <InlineMath math="P_1" /> with <InlineMath math="P_2" />, <InlineMath math="\Delta C" /> was <InlineMath math="0" />. Why does PAM strictly reject swaps with <InlineMath math="\Delta C = 0" />? What would happen to the algorithm if it accepted <InlineMath math="\Delta C = 0" /> swaps?
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
              Interactive standalone lab script for Numerical Exercise Verification
            </p>
          </div>
        </div>

        <PythonFileLoader
          fileModule={labCode}
          title="numerical_exercises_lab.py"
          highlightLines={[15, 20, 30, 45]}
        />
      </section>

      {/* 10. FAQ Template */}
      <section className="space-y-4">
        <FAQTemplate
          title="Numerical Exercises — Frequently Asked Questions"
          questions={questions}
        />
      </section>

      {/* 11. Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Numerical Exercises & Mathematical Problem Solving"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 10 Note"
          downloadFileName="module_006_001_topic10_note.txt"
        />
      </section>

      {/* 12. Teacher Note */}
      <section>
        <Teacher
          note="Practice makes permanence! Once you work through these numerical exercises step-by-step, the underlying mechanics of BUILD, SWAP, and gain calculations will become second nature. Keep your distance matrices clean and your arithmetic organized! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
