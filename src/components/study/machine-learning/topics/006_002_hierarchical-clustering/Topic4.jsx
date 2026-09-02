import React, { useState, useId } from "react";
import clsx from "clsx";
import { InlineMath, BlockMath } from "react-katex";
import PythonFileLoader from "../../../../../common/PythonFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import labCode from "./topic4_files/linkage_criteria_lab.py?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions.js";

export default function Topic4() {
  const [activeTab, setActiveTab] = useState("theory");
  const [sliderVal, setSliderVal] = useState(3);
  const svgId = useId();

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
              BCAC701B • Advanced ML • Module 006_002 • Topic 4
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Linkage Foundations
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Cluster Linkage Criteria & Inter-Cluster Dissimilarity
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl leading-relaxed">
            Master the fundamental concept of inter-cluster linkage functions. Learn how distance between entire sets of points D(C_A, C_B) is computed using the Lance-Williams recurrence relation.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: "theory", label: "1. Core Concept & Story" },
              { id: "diagram", label: "2. Visual Architecture" },
              { id: "interactive", label: "3. Interactive Studio" },
              { id: "caseStudies", label: "4. Regional Cases" },
              { id: "bestPractices", label: "5. Best Practices" }
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
      <section id="theory" className="scroll-mt-6 bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-900 border-2 border-indigo-500/30 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
        <div className="flex items-center gap-3 border-b border-indigo-500/20 pb-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-300 text-xl border border-indigo-500/30">
            🧑‍🏫
          </span>
          <div>
            <h2 className="text-2xl font-black text-indigo-200 tracking-tight">
              Teacher's Corner: The Neighboring Village Boundary Analogy
            </h2>
            <p className="text-xs text-indigo-300/80">
              Classroom lesson &amp; storytelling by Sukanta Hui (Coder &amp; AccoTax, Barrackpore)
            </p>
          </div>
        </div>

        <div className="space-y-5 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            Welcome students! Today we master <strong>Inter-Cluster Linkage</strong>. Let's step into our Barrackpore ML Lab and see how hierarchical structures organize data points into meaningful nested families without requiring a fixed pre-set cluster count!
          </p>

          {/* Interactive Classroom Narrative */}
          <div className="p-4 bg-indigo-950/30 rounded-2xl border border-indigo-800/40 space-y-2">
            <h3 className="font-bold text-indigo-200 text-sm md:text-base flex items-center gap-2">
              <span>💬</span> Classroom Discussion at Barrackpore ML Lab
            </h3>
            <p className="text-xs md:text-sm text-slate-300">
              <strong>Sukanta Hui:</strong> "Suppose <strong>Sachin</strong> is organizing student records in our Barrackpore center. Should he group them into fixed rigid buckets, or build a flexible nested folder tree where you can expand or collapse levels as needed?"
            </p>
            <p className="text-xs md:text-sm text-slate-300">
              <strong>Sachin:</strong> "A nested tree is far better! At the top level, we see broad batches; as we zoom in, we see specific project teams and individual students!"
            </p>
            <p className="text-xs md:text-sm text-slate-300">
              <strong>Sukanta Hui:</strong> "Exactly! That nested tree is precisely a <strong>Dendrogram</strong> in Hierarchical Clustering! <strong>Debangshu</strong>, how do we decide which clusters to merge first?"
            </p>
            <p className="text-xs md:text-sm text-slate-300">
              <strong>Debangshu:</strong> "We calculate the smallest inter-cluster dissimilarity distance <InlineMath math="D(C_A, C_B)" /> and merge the closest pair step by step!"
            </p>
          </div>

          {/* 4 Real-Life Teacher Stories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-950/90 rounded-2xl border border-indigo-800/60 space-y-2">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block">
                🏙️ Story 1 • Metro Infrastructure
              </span>
              <h3 className="font-bold text-white text-sm">Barrackpore School District Cluster Merging</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Swadeep used linkage criteria to evaluate geographical distance between school clusters.
              </p>
            </div>

            <div className="p-4 bg-slate-950/90 rounded-2xl border border-amber-800/60 space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                📂 Story 2 • Document Taxonomy
              </span>
              <h3 className="font-bold text-white text-sm">Kolkata IT Park Office Hub Integration</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Abhronila calculated inter-cluster dissimilarity between IT company building clusters.
              </p>
            </div>

            <div className="p-4 bg-slate-950/90 rounded-2xl border border-emerald-800/60 space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                🧬 Story 3 • Biological Subtypes
              </span>
              <h3 className="font-bold text-white text-sm">Jadavpur Environmental Pollution Zones</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Mahima measured pollution metric dissimilarity across municipal air quality monitor clusters.
              </p>
            </div>

            <div className="p-4 bg-slate-950/90 rounded-2xl border border-rose-800/60 space-y-2">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                🛍️ Story 4 • Retail Taxonomy
              </span>
              <h3 className="font-bold text-white text-sm">Naihati Logistics Freight Hub Selection</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Sachin evaluated cluster linkage between distribution depot clusters.
              </p>
            </div>
          </div>

          {/* 4-Step Friendly Teacher CNAT Breakdown (What, Why, How, When) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="bg-slate-950 p-4 rounded-xl border border-indigo-800/50 space-y-1.5">
              <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider">❓ WHAT is Inter-Cluster Linkage?</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                A clustering method that builds a nested hierarchy of clusters represented as a binary tree (dendrogram) without choosing <InlineMath math="K" /> beforehand.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-cyan-800/50 space-y-1.5">
              <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">💡 WHY Use Hierarchical Clustering?</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                It reveals taxonomy at all granularity levels simultaneously and works with any custom distance metric without requiring mean vectors.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-amber-800/50 space-y-1.5">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">⚙️ HOW is it Computed?</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Compute initial <InlineMath math="N \times N" /> distance matrix <InlineMath math="D" />, find minimum entry <InlineMath math="d(C_A, C_B)" />, merge clusters, and update matrix using linkage rules.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-emerald-800/50 space-y-1.5">
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">⏰ WHEN to Apply in Production?</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Ideal for small-to-medium datasets (<InlineMath math="N \le 5,000" />) where exploratory taxonomy discovery or dendrogram visual inspection is required.
              </p>
            </div>
          </div>

          {/* Teacher's Golden Rule */}
          <div className="p-4 bg-amber-950/30 rounded-2xl border border-amber-800/50 flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h4 className="font-bold text-amber-200 text-sm">Teacher's Golden Rule of Hierarchical Clustering</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                "Hierarchical clustering doesn't force a single partition—it gives you an entire map of possibilities! Cut the dendrogram high for broad macro-trends, or low for fine micro-details." — Sukanta Hui
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Semantic Visual SVG Diagram */}
      <section id="diagram" className="scroll-mt-6 space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>⚙️</span> Semantic Visual Diagram: Inter-Cluster Linkage Evaluation Between Cluster A and Cluster B
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto shadow-inner">
          <svg viewBox="0 0 920 300" className="w-full min-w-[750px] font-sans">
            <text x="460" y="25" textAnchor="middle" fill="#38bdf8" className="font-bold text-sm">
              Inter-Cluster Linkage Evaluation Between Cluster A and Cluster B
            </text>

            {/* Dendrogram Tree Visualization */}
            <g transform="translate(100, 50)">
              {/* Leaf Nodes */}
              <circle cx="60" cy="180" r="8" fill="#38bdf8" />
              <text x="60" y="205" textAnchor="middle" fill="#7dd3fc" className="text-xs font-mono font-bold">P1</text>

              <circle cx="160" cy="180" r="8" fill="#38bdf8" />
              <text x="160" y="205" textAnchor="middle" fill="#7dd3fc" className="text-xs font-mono font-bold">P2</text>

              <circle cx="280" cy="180" r="8" fill="#10b981" />
              <text x="280" y="205" textAnchor="middle" fill="#6ee7b7" className="text-xs font-mono font-bold">P3</text>

              <circle cx="380" cy="180" r="8" fill="#10b981" />
              <text x="380" y="205" textAnchor="middle" fill="#6ee7b7" className="text-xs font-mono font-bold">P4</text>

              {/* Merge 1: P1 & P2 */}
              <line x1="60" y1="180" x2="60" y2="130" stroke="#38bdf8" strokeWidth="2" />
              <line x1="160" y1="180" x2="160" y2="130" stroke="#38bdf8" strokeWidth="2" />
              <line x1="60" y1="130" x2="160" y2="130" stroke="#38bdf8" strokeWidth="2" />
              <text x="110" y="125" textAnchor="middle" fill="#38bdf8" className="text-[10px] font-mono">Merge 1 (d=1.5)</text>

              {/* Merge 2: P3 & P4 */}
              <line x1="280" y1="180" x2="280" y2="140" stroke="#10b981" strokeWidth="2" />
              <line x1="380" y1="180" x2="380" y2="140" stroke="#10b981" strokeWidth="2" />
              <line x1="280" y1="140" x2="380" y2="140" stroke="#10b981" strokeWidth="2" />
              <text x="330" y="135" textAnchor="middle" fill="#10b981" className="text-[10px] font-mono">Merge 2 (d=2.1)</text>

              {/* Root Merge */}
              <line x1="110" y1="130" x2="110" y2="60" stroke="#a855f7" strokeWidth="2.5" />
              <line x1="330" y1="140" x2="330" y2="60" stroke="#a855f7" strokeWidth="2.5" />
              <line x1="110" y1="60" x2="330" y2="60" stroke="#a855f7" strokeWidth="2.5" />
              <text x="220" y="50" textAnchor="middle" fill="#c084fc" className="text-xs font-mono font-bold">Root Merge (d=5.8)</text>

              {/* Cut Line */}
              <line x1="20" y1="100" x2="420" y2="100" stroke="#f43f5e" strokeWidth="2" strokeDasharray="5,5" />
              <text x="430" y="104" textAnchor="start" fill="#f43f5e" className="text-xs font-mono font-bold">Cut Line (K=2)</text>
            </g>

            {/* Right Side Info Panel */}
            <g transform="translate(580, 60)">
              <rect x="0" y="0" width="260" height="180" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1" />
              <text x="130" y="30" textAnchor="middle" fill="#38bdf8" className="text-xs font-bold font-mono">Tree Key Properties</text>
              <text x="20" y="65" fill="#cbd5e1" className="text-xs font-mono">• Leaves: Individual Points</text>
              <text x="20" y="95" fill="#cbd5e1" className="text-xs font-mono">• Height: Dissimilarity Distance</text>
              <text x="20" y="125" fill="#cbd5e1" className="text-xs font-mono">• Horizontal Cut: Returns K Clusters</text>
              <text x="20" y="155" fill="#cbd5e1" className="text-xs font-mono">• Non-Overlapping Subtrees</text>
            </g>

            {/* Explanatory footer */}
            <rect x="60" y="260" width="800" height="30" rx="6" fill="#0f172a" stroke="#334155" />
            <text x="460" y="279" textAnchor="middle" fill="#38bdf8" className="text-xs font-mono">
              • Hierarchical Agglomeration: Iteratively joins the two closest sub-clusters until 1 root remains
            </text>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">
            01
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Mathematical Formulations &amp; The Lance-Williams Recurrence Formula
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Rigorous equation definitions and algorithmic properties
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Distance Matrix &amp; Linkage Update</span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              For any two clusters <InlineMath math="C_A" /> and <InlineMath math="C_B" />, the inter-cluster dissimilarity <InlineMath math="D(C_A, C_B)" /> governs the merge sequence:
            </p>
            <div className="text-sm md:text-base font-mono text-indigo-300 bg-indigo-950/40 p-4 rounded-xl border border-indigo-800/60 shadow-inner flex justify-center items-center overflow-x-auto py-3">
              <BlockMath math="D(C_A, C_B) = \min_{x \in C_A, y \in C_B} d(x, y)" />
            </div>
            <p className="text-xs text-slate-400">
              Distance values increase monotonically as merges progress up the tree (<InlineMath math="h_1 \le h_2 \le \dots \le h_{N-1}" />).
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Computational Complexity</span>
            <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
              <li><strong>Time Complexity:</strong> <InlineMath math="O(N^3)" /> naive implementation, reducible to <InlineMath math="O(N^2 \log N)" /> with priority queues.</li>
              <li><strong>Space Complexity:</strong> <InlineMath math="O(N^2)" /> required to store the full symmetric distance matrix.</li>
              <li><strong>Monotonicity:</strong> Height values increase strictly without inversions under standard metrics.</li>
              <li><strong>Deterministic:</strong> Produces identical dendrogram trees across multiple runs on identical data.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Live Interactive Studio */}
      <section id="interactive" className="scroll-mt-6 bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-bold text-lg">
            02
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Interactive Dendrogram Height Threshold Simulator
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Adjust the horizontal cut threshold height <InlineMath math="h" /> to observe dynamic cluster partition splitting
            </p>
          </div>
        </div>

        <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-slate-300">Dendrogram Cut Height (<InlineMath math="h" />):</span>
            <span className="text-cyan-400 font-bold">h = {sliderVal.toFixed(1)}</span>
          </div>

          <input
            type="range"
            min="1"
            max="6"
            step="0.1"
            value={sliderVal}
            onChange={(e) => setSliderVal(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="bg-slate-900 p-4 rounded-lg border border-sky-900/50 space-y-1">
              <span className="text-[11px] font-bold text-sky-400 uppercase">Selected Cut Height</span>
              <div className="text-2xl font-bold font-mono text-sky-300">{sliderVal.toFixed(1)} units</div>
            </div>

            <div className="bg-slate-900 p-4 rounded-lg border border-emerald-900/50 space-y-1">
              <span className="text-[11px] font-bold text-emerald-400 uppercase">Resulting Cluster Count (K)</span>
              <div className="text-2xl font-bold font-mono text-emerald-300">
                {sliderVal < 1.5 ? 4 : sliderVal < 2.2 ? 3 : sliderVal < 5.8 ? 2 : 1} Clusters
              </div>
            </div>

            <div className="bg-slate-900 p-4 rounded-lg border border-indigo-900/50 space-y-1">
              <span className="text-[11px] font-bold text-indigo-400 uppercase">Partition Granularity</span>
              <div className="text-sm font-bold font-mono text-indigo-300">
                {sliderVal < 1.5 ? "Fine Micro-Clusters" : sliderVal < 5.8 ? "Balanced Macro-Clusters" : "Single Root Cluster"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Real-World Regional Industrial Case Studies */}
      <section id="caseStudies" className="scroll-mt-6 bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-bold text-lg">
            03
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Real-World Regional Industrial Case Studies
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Applied hierarchical clustering pipelines across West Bengal business infrastructure
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase">Case 1 • Barrackpore School District Cluster Merging</span>
            <h3 className="text-base font-bold text-white">Infrastructure &amp; Zonation</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Swadeep used linkage criteria to evaluate geographical distance between school clusters.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Case 2 • Kolkata IT Park Office Hub Integration</span>
            <h3 className="text-base font-bold text-white">Financial &amp; Enterprise Governance</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Abhronila calculated inter-cluster dissimilarity between IT company building clusters.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase">Case 3 • Jadavpur Environmental Pollution Zones</span>
            <h3 className="text-base font-bold text-white">Healthcare &amp; Genomic Discovery</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Mahima measured pollution metric dissimilarity across municipal air quality monitor clusters.
            </p>
          </div>

          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono font-bold text-rose-400 uppercase">Case 4 • Naihati Logistics Freight Hub Selection</span>
            <h3 className="text-base font-bold text-white">Retail &amp; E-Commerce Cataloging</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Sachin evaluated cluster linkage between distribution depot clusters.
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
              Key engineering guidelines for hierarchical clustering in production
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-950 p-5 rounded-xl border border-rose-900/40 space-y-3">
            <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
              <span>⚠️</span> Common Pitfalls
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li>Applying hierarchical clustering to massive datasets (<InlineMath math="N > 20,000" />) causing memory crash due to <InlineMath math="O(N^2)" /> distance matrix.</li>
              <li>Failing to standardize continuous features before calculating dissimilarity matrices.</li>
              <li>Blindly using Single Linkage without checking for noisy outlier bridging (chaining effect).</li>
            </ul>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-emerald-900/40 space-y-3">
            <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <span>✔</span> Best Practices
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li>Compute the Cophenetic Correlation Coefficient (CPCC) to validate dendrogram tree fidelity.</li>
              <li>Use Ward's Minimum Variance method for balanced commercial customer segmentation.</li>
              <li>Pre-cluster large datasets using K-Means before building hierarchical dendrograms on cluster centroids.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 8. Hint Section */}
      <section className="space-y-4 bg-amber-950/20 border border-amber-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
          <span>🤔</span> Think About This...
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          How does the choice of linkage criterion drastically alter the geometric shape of the resulting dendrogram tree?
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
              Interactive standalone lab script for Inter-Cluster Linkage
            </p>
          </div>
        </div>

        <PythonFileLoader
          fileModule={labCode}
          title="linkage_criteria_lab.py"
          highlightLines={[10, 15, 20, 25]}
        />
      </section>

      {/* 10. FAQ Section */}
      <section className="space-y-4">
        <FAQTemplate
          title="Cluster Linkage Criteria & Inter-Cluster Dissimilarity — Frequently Asked Questions"
          questions={questions}
        />
      </section>

      {/* 11. Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Cluster Linkage Criteria & Inter-Cluster Dissimilarity"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 4 Note"
          downloadFileName="module_006_002_topic4_note.txt"
        />
      </section>

      {/* 12. Teacher Note */}
      <section>
        <Teacher
          note="Inter-Cluster Linkage provides an intuitive, deterministic multi-scale view of data structure. Master linkage criteria and dendrogram interpretation, and you can unlock deep nested insights across any dataset! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
