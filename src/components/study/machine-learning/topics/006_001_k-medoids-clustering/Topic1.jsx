import React, { useState, useId } from "react";
import clsx from "clsx";
import { InlineMath, BlockMath } from "react-katex";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import labCode from "./topic1_files/medoid_vs_centroid_lab.py?raw";
import noteText from "./topic1_files/topic1_note.txt?raw";
import questions from "./topic1_files/topic1_questions.js";

export default function Topic1() {
  const [activeTab, setActiveTab] = useState("theory");
  const [outlierY, setOutlierY] = useState(200);
  const svgId = useId();

  // Simulated live calculation of Centroid coordinates vs Medoid
  const basePoints = [
    { x: 72, y: 120 },
    { x: 75, y: 122 },
    { x: 70, y: 118 },
    { x: 74, y: 121 },
    { x: 71, y: 119 },
  ];

  const centroidX = (basePoints.reduce((acc, p) => acc + p.x, 0) + 190) / 6;
  const centroidY = (basePoints.reduce((acc, p) => acc + p.y, 0) + outlierY) / 6;
  const medoidPt = { x: 74, y: 121 }; // Robust actual central patient point

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
              BCAC701B • Advanced ML • Module 006_001 • Topic 1
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Centroid vs. Medoid Anatomy
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Medoid and Centroid Comprehensive Comparison
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl leading-relaxed">
            Welcome back! Today, let's explore the fundamental difference between a <strong>Centroid</strong> and a <strong>Medoid</strong> through friendly teacher stories and real-world examples. Discover why picking a calculated average (Centroid) can give impossible answers in real life, while picking an actual dataset item (Medoid) keeps your machine learning models grounded in physical reality!
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "theory", label: "1. Core Conceptual Foundations" },
              { id: "interactive", label: "2. Centroid Drift Visualizer" },
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
              Teacher's Corner: Calculated Imaginary Averages vs. Real Physical Exemplars
            </h2>
            <p className="text-xs text-indigo-300/80">
              Classroom lesson &amp; storytelling by Sukanta Hui (Coder &amp; AccoTax, Barrackpore)
            </p>
          </div>
        </div>

        <div className="space-y-5 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            Welcome back! Today, let's explore the fundamental difference between a <strong>Centroid</strong> and a <strong>Medoid</strong> through friendly teacher stories and real-world examples. In statistics and machine learning, taking a simple calculated "average" doesn't always make sense. Discover why picking a calculated average (Centroid) can give impossible answers in real life, while picking an actual dataset item (Medoid) keeps your machine learning models grounded in physical reality!
          </p>

          {/* Interactive Classroom Narrative */}
          <div className="p-4 bg-indigo-950/30 rounded-2xl border border-indigo-800/40 space-y-2">
            <h3 className="font-bold text-indigo-200 text-sm md:text-base flex items-center gap-2">
              <span>💬</span> Classroom Discussion at Barrackpore ML Lab
            </h3>
            <p className="text-xs md:text-sm text-slate-300">
              <strong>Sukanta Hui:</strong> "Suppose <strong>Sachin</strong>, <strong>Mahima</strong>, and <strong>Swadeep</strong> are analyzing family sizes in Barrackpore. If the mathematical average turns out to be 2.4 children, can we construct a representative family with 0.4 of a child?"
            </p>
            <p className="text-xs md:text-sm text-slate-300">
              <strong>Mahima:</strong> "Of course not, Sir! A real family can only have 2 or 3 children."
            </p>
            <p className="text-xs md:text-sm text-slate-300">
              <strong>Sukanta Hui:</strong> "Spot on! That is exactly why K-Means (Centroid) fails when physical reality requires a real instance, and why K-Medoids (Medoid) steps in to pick an actual existing family from our survey!"
            </p>
          </div>

          {/* 3 Real-Life Teacher Stories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Story 1 */}
            <div className="p-4 bg-slate-950/90 rounded-2xl border border-indigo-800/60 space-y-2">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block">
                👨‍👩‍👧‍👦 Story 1 • The Demographics Fallacy
              </span>
              <h3 className="font-bold text-white text-sm">Fractional Children</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                In demographic surveys, the calculated <strong>Centroid (Mean)</strong> of a neighborhood says the average family has <strong>2.4 children and 1.3 cars</strong>. But no real family in Kolkata has 0.4 of a child! A <strong>Medoid</strong> selects an actual real family (e.g. 2 children, 1 car) as the cluster representative.
              </p>
            </div>

            {/* Story 2 */}
            <div className="p-4 bg-slate-950/90 rounded-2xl border border-rose-800/60 space-y-2">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                🏥 Story 2 • Hospital ICU Patient Vitals
              </span>
              <h3 className="font-bold text-white text-sm">Ghost Patient Charts</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                If you average patient vital signs, a <strong>Centroid</strong> creates a synthetic patient profile (e.g. BP 136.6/90). Doctors can't treat a ghost average! A <strong>Medoid</strong> selects an actual living patient's medical file from the database so physicians can review a real case history.
              </p>
            </div>

            {/* Story 3 */}
            <div className="p-4 bg-slate-950/90 rounded-2xl border border-emerald-800/60 space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                📦 Story 3 • Warehouse Location
              </span>
              <h3 className="font-bold text-white text-sm">Warehouse in a River!</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                When picking a warehouse location for Naihati deliveries, a <strong>Centroid</strong> averages GPS coordinates and places the hub <strong>right in the middle of the Hooghly River</strong>! A <strong>Medoid</strong> restricts choices to real property listings on land.
              </p>
            </div>
          </div>

          {/* 4-Step Friendly Teacher CNAT Breakdown (What, Why, How, When) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="bg-slate-950 p-4 rounded-xl border border-indigo-800/50 space-y-1.5">
              <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider">❓ WHAT is the Difference?</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                A <strong>Centroid</strong> is an artificial mathematical mean vector <InlineMath math="\mu" />. A <strong>Medoid</strong> is a 100% real, physically existing data point <InlineMath math="m \in \mathcal{D}" /> chosen directly from your dataset.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-cyan-800/50 space-y-1.5">
              <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">💡 WHY Pick a Medoid?</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Medoids prevent impossible "ghost averages", resist extreme outliers, and work with non-Euclidean metrics like Manhattan distance, travel times, DNA sequences, and text similarity.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-amber-800/50 space-y-1.5">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">⚙️ HOW is Each Calculated?</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Centroid computes arithmetic averages: <InlineMath math="\mu = \frac{1}{|C_k|}\sum x_i" />. Medoid searches for the point that minimizes total pairwise dissimilarity: <InlineMath math="m_k = \arg\min_{y \in C_k} \sum d(x, y)" />.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-emerald-800/50 space-y-1.5">
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">⏰ WHEN to Use Which?</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Use <strong>Centroids</strong> for fast, large, clean continuous numeric data. Use <strong>Medoids</strong> when domain rules demand real physical entities, categorical features, or outlier robustness.
              </p>
            </div>
          </div>

          {/* Teacher's Golden Rule */}
          <div className="p-4 bg-amber-950/30 rounded-2xl border border-amber-800/50 flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h4 className="font-bold text-amber-200 text-sm">Teacher's Golden Takeaway</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                "A <strong>Centroid</strong> asks: <em>'Where is the theoretical center in space?'</em> A <strong>Medoid</strong> asks: <em>'Which actual member of our group is the best candidate to represent all of us?'</em> In business, law, and medicine, stakeholders trust real exemplars over calculated ghosts every single time!" — Sukanta Hui
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Semantic Visual SVG Diagram */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>⚙️</span> Visual Diagram: Centroid (Virtual Mean) vs Medoid (Actual Real Exemplar)
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto shadow-inner">
          <svg viewBox="0 0 920 280" className="w-full min-w-[750px] font-sans">
            <text x="460" y="25" textAnchor="middle" fill="#38bdf8" className="font-bold text-sm">
              Structural Comparison: Continuous Mean Vector vs. Discrete Sample Exemplar
            </text>

            {/* Left Box: Centroid */}
            <g transform="translate(60, 50)">
              <rect x="0" y="0" width="360" height="180" rx="10" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="180" y="25" textAnchor="middle" fill="#fbbf24" className="font-bold text-xs font-mono">Centroid: Synthetic Virtual Center</text>
              
              <circle cx="80" cy="80" r="6" fill="#38bdf8" />
              <text x="80" y="100" textAnchor="middle" fill="#94a3b8" className="text-[10px] font-mono">P1(2, 3)</text>
              
              <circle cx="120" cy="140" r="6" fill="#38bdf8" />
              <text x="120" y="160" textAnchor="middle" fill="#94a3b8" className="text-[10px] font-mono">P2(4, 5)</text>

              <circle cx="280" cy="60" r="6" fill="#38bdf8" />
              <text x="280" y="80" textAnchor="middle" fill="#94a3b8" className="text-[10px] font-mono">P3(9, 7)</text>

              {/* Centroid Point */}
              <polygon points="160,85 170,105 150,105" fill="#f59e0b" />
              <text x="160" y="125" textAnchor="middle" fill="#fcd34d" className="text-[11px] font-mono font-bold">
                Centroid: μ = (5.0, 5.0)
              </text>
              <text x="160" y="145" textAnchor="middle" fill="#fda4af" className="text-[10px] italic">
                (Synthetic point: Not in dataset!)
              </text>
            </g>

            {/* Right Box: Medoid */}
            <g transform="translate(500, 50)">
              <rect x="0" y="0" width="360" height="180" rx="10" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
              <text x="180" y="25" textAnchor="middle" fill="#34d399" className="font-bold text-xs font-mono">Medoid: Real Dataset Instance</text>
              
              <circle cx="80" cy="80" r="6" fill="#38bdf8" />
              <text x="80" y="100" textAnchor="middle" fill="#94a3b8" className="text-[10px] font-mono">P1(2, 3)</text>
              
              {/* Medoid Point */}
              <circle cx="120" cy="140" r="10" fill="#10b981" stroke="#fff" strokeWidth="2" />
              <text x="120" y="120" textAnchor="middle" fill="#6ee7b7" className="text-[11px] font-mono font-bold">
                Medoid = P2(4, 5)
              </text>

              <circle cx="280" cy="60" r="6" fill="#38bdf8" />
              <text x="280" y="80" textAnchor="middle" fill="#94a3b8" className="text-[10px] font-mono">P3(9, 7)</text>

              <text x="180" y="165" textAnchor="middle" fill="#a7f3d0" className="text-[10px] font-bold">
                ✓ 100% Real Observed Data Instance!
              </text>
            </g>

            {/* Explanatory footer */}
            <rect x="60" y="240" width="800" height="35" rx="6" fill="#0f172a" stroke="#334155" />
            <text x="460" y="262" textAnchor="middle" fill="#38bdf8" className="text-xs font-mono">
              • Centroid = Arithmetic Mean | Medoid = Real Observation minimizing total pairwise distances
            </text>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown Section: Comparison Matrix & Hand Calculation */}
      <section id="theory" className="scroll-mt-6 bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">
            01
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Hand-Calculated 2D Dataset Example: Centroid vs. Medoid
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Step-by-step arithmetic proof showing how Centroids create synthetic points while Medoids pick real points
            </p>
          </div>
        </div>

        {/* Hand-Calculated Walkthrough Box */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-indigo-800/50 space-y-4">
          <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
            📍 Given 2D Dataset (3 Points): P1(2, 3), P2(4, 5), P3(9, 7)
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Centroid Step */}
            <div className="p-4 bg-slate-900 rounded-xl border border-rose-900/50 space-y-2">
              <span className="text-xs font-bold text-rose-400 block">1️⃣ K-Means Centroid Calculation</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Take the arithmetic mean of X coordinates and Y coordinates:
              </p>
              <div className="p-2.5 bg-slate-950 text-center font-mono text-xs text-rose-300 rounded border border-slate-800">
                <InlineMath math="\mu_x = \frac{2+4+9}{3} = 5.0, \quad \mu_y = \frac{3+5+7}{3} = 5.0" />
                <div className="pt-1 font-bold">Centroid = (5.0, 5.0)</div>
              </div>
              <p className="text-[11px] text-rose-300/80">
                ❌ Point (5.0, 5.0) is an imaginary coordinate. It does not exist in our dataset!
              </p>
            </div>

            {/* Medoid Step */}
            <div className="p-4 bg-slate-900 rounded-xl border border-emerald-900/50 space-y-2">
              <span className="text-xs font-bold text-emerald-400 block">2️⃣ K-Medoids Selection (Manhattan Distance)</span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Calculate total Manhattan distance <InlineMath math="d(A, B) = |A_x - B_x| + |A_y - B_y|" /> for each point:
              </p>
              <ul className="space-y-1 text-[11px] font-mono text-slate-300 list-disc list-inside">
                <li>For P1(2,3): 0 + (|2-4|+|3-5|) + (|2-9|+|3-7|) = 0 + 4 + 11 = <strong>15</strong></li>
                <li className="text-emerald-300 font-bold">For P2(4,5): 4 + 0 + (|4-9|+|5-7|) = 4 + 0 + 7 = <strong>11 (MINIMUM!)</strong></li>
                <li>For P3(9,7): 11 + 7 + 0 = <strong>18</strong></li>
              </ul>
              <p className="text-[11px] text-emerald-300 font-bold pt-1">
                ✅ Winner: Medoid = P2(4, 5). Point P2 is a 100% real data point!
              </p>
            </div>
          </div>
        </div>

        {/* Feature Table */}
        <div className="overflow-x-auto pt-2">
          <table className="w-full text-xs sm:text-sm text-left border border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-950 text-slate-300 font-mono text-xs uppercase border-b border-slate-800">
              <tr>
                <th className="p-3.5">Dimension</th>
                <th className="p-3.5 text-amber-400">Centroid (K-Means)</th>
                <th className="p-3.5 text-emerald-400">Medoid (K-Medoids)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/40">
                <td className="p-3.5 font-bold text-white">Mathematical Origin</td>
                <td className="p-3.5">Arithmetic mean of coordinate vectors</td>
                <td className="p-3.5">Combinatorial minimum dissimilarity element</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="p-3.5 font-bold text-white">Physical Existence</td>
                <td className="p-3.5 text-rose-400 font-mono">Virtual (Synthesized)</td>
                <td className="p-3.5 text-emerald-400 font-mono">Real (Exact dataset instance)</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="p-3.5 font-bold text-white">Loss Function</td>
                <td className="p-3.5">Sum of Squared Errors (SSE / <InlineMath math="L_2^2" />)</td>
                <td className="p-3.5">Total Absolute Dissimilarity (<InlineMath math="L_1" /> / General <InlineMath math="D" />)</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="p-3.5 font-bold text-white">Outlier Robustness</td>
                <td className="p-3.5 text-rose-400">Low (Dramatically pulled)</td>
                <td className="p-3.5 text-emerald-400">Extreme (High breakdown point)</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="p-3.5 font-bold text-white">Supported Metrics</td>
                <td className="p-3.5">Strictly Euclidean distance</td>
                <td className="p-3.5">Any arbitrary metric (Manhattan, Cosine, Graph)</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="p-3.5 font-bold text-white">Update Complexity</td>
                <td className="p-3.5 font-mono text-cyan-400"><InlineMath math="O(N_k \cdot d)" /> (Linear mean)</td>
                <td className="p-3.5 font-mono text-indigo-400"><InlineMath math="O(N_k^2 \cdot d)" /> (Pairwise matrix)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Interactive Studio */}
      <section id="interactive" className="scroll-mt-6 bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">
            02
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Centroid Drift &amp; Medoid Stability Simulator
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Alter outlier blood pressure and observe how K-Means centroid breaks medical reality while K-Medoids remains grounded
            </p>
          </div>
        </div>

        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-slate-300">Outlier Patient P5 Blood Pressure:</span>
            <span className="text-cyan-400 font-bold">{outlierY} mmHg</span>
          </div>

          <input
            type="range"
            min="120"
            max="300"
            value={outlierY}
            onChange={(e) => setOutlierY(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-slate-900 p-4 rounded-lg border border-amber-900/50 space-y-1">
              <span className="text-[11px] font-bold text-amber-400 uppercase">Centroid Vitals (Mean)</span>
              <div className="text-2xl font-bold font-mono text-amber-300">
                HR: {centroidX.toFixed(1)} bpm, BP: {centroidY.toFixed(1)} mmHg
              </div>
              <p className="text-[11px] text-slate-400">
                🚨 Skewed by emergency patient P5! No normal patient has this vital combination.
              </p>
            </div>

            <div className="bg-slate-900 p-4 rounded-lg border border-emerald-900/50 space-y-1">
              <span className="text-[11px] font-bold text-emerald-400 uppercase">Medoid Vitals (Real Patient)</span>
              <div className="text-2xl font-bold font-mono text-emerald-300">
                HR: {medoidPt.x} bpm, BP: {medoidPt.y} mmHg
              </div>
              <p className="text-[11px] text-slate-400">
                ✅ Exact physical record of Patient P3 in Barrackpore clinical cohort.
              </p>
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
              Applied deployments across hospital analytics, logistics, legal document summarization, and banking
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase">Case 1 • Jadavpur Medical Hub</span>
            <h3 className="text-base font-bold text-white">Clinical Patient Case Exemplars</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Debangshu and Mahima clustered patient ICU vitals. Because medoids represent real patients, physicians could review the medoid patient's physical chart to devise ICU protocols rather than relying on synthetic averages.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Case 2 • Kolkata Salt Lake Sector V</span>
            <h3 className="text-base font-bold text-white">Legal Contract Summarization</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Sachin clustered 10,000 corporate agreement clauses. A centroid TF-IDF vector is unreadable gibberish, but a medoid clause is a real, grammatically coherent legal paragraph that served as the cluster summary.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase">Case 3 • Shyamnagar &amp; Naihati Logistics</span>
            <h3 className="text-base font-bold text-white">Physical Hub Site Selection</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Susmita placed regional delivery lockers. A centroid average placed a locker in the middle of a railway track, while K-Medoids selected an actual retail store address from the candidate list.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase">Case 4 • Barrackpore Academic Lab</span>
            <h3 className="text-base font-bold text-white">Curriculum Difficulty Calibration</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Tuhina and Swadeep clustered programming exam question attempt times. Medoids identified the exact benchmark question representing average student difficulty.
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
              Key engineering guidelines for Centroid vs. Medoid selection
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-5 rounded-xl border border-rose-900/40 space-y-3">
            <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
              <span>⚠️</span> Common Mistakes
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li>Using centroids for categorical or discrete count data where averages make no domain sense.</li>
              <li>Assuming medoids are always fast to compute (Medoids require quadratic $O(N_k^2)$ distance evaluations).</li>
              <li>Neglecting feature scaling when computing pairwise dissimilarity matrices.</li>
            </ul>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-emerald-900/40 space-y-3">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>✔</span> Best Practices
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li>Use Centroids (K-Means) for rapid prototyping on massive clean continuous datasets ($N &gt; 1,000,000$).</li>
              <li>Use Medoids (K-Medoids) when interpretability, non-Euclidean metrics, or outlier resistance are required.</li>
              <li>Inspect `kmedoids.medoid_indices_` to extract actual DataFrame exemplar rows for stakeholders.</li>
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
          If you are building a music recommendation engine based on user playlists, can you compute the 'average song' as a centroid? Why is picking a real representative song (medoid) using Jaccard playlist distance the only mathematically and artistically valid approach?
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
              Interactive standalone lab script for Centroid vs. Medoid mathematical computation
            </p>
          </div>
        </div>

        <PythonFileLoader
          fileModule={labCode}
          title="medoid_vs_centroid_lab.py"
          highlightLines={[10, 11, 22, 23, 45, 55]}
        />
      </section>

      {/* 10. FAQ Template */}
      <section className="space-y-4">
        <FAQTemplate
          title="Medoid vs. Centroid — Frequently Asked Questions"
          questions={questions}
        />
      </section>

      {/* 11. Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Medoid vs Centroid Comparison"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 1 Note"
          downloadFileName="module_006_001_topic1_note.txt"
        />
      </section>

      {/* 12. Teacher Note */}
      <section>
        <Teacher
          note="Always remember: A Centroid is a mathematical calculation (mean), whereas a Medoid is an actual observed fact (exemplar). In business and medicine, people trust real examples far more than abstract averages! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
