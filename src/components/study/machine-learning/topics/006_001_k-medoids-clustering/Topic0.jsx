import React, { useState, useId } from "react";
import clsx from "clsx";
import { InlineMath, BlockMath } from "react-katex";
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
              BCAC701B • Advanced ML • Module 006_001 • Topic 0
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Robust Clustering Exemplars
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            K-Medoids Clustering Concept &amp; Mathematical Foundations
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-4xl leading-relaxed">
            Learn K-Medoids in plain English! Unlike K-Means (which invents imaginary average points that don't exist in real life), <strong>K-Medoids</strong> picks actual real items from your dataset to represent each group (called <em>"Medoids"</em>). This simple change makes clustering immune to crazy outliers, works with any distance measurement, and produces results you can easily explain to anyone!
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
              Teacher's Corner: The Representative Class Captain vs The Artificial Average
            </h2>
            <p className="text-xs text-indigo-300/80">
              Classroom story by Sukanta Hui (Coder &amp; AccoTax, Barrackpore)
            </p>
          </div>
        </div>

        <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            Imagine <strong>Sachin</strong> and <strong>Mahima</strong> in our Barrackpore ML lab trying to select a <strong>Class Representative</strong> for a group of 6 students. Five of the students scored around <strong>40/100</strong> on a test, while one extreme genius outlier scored <strong>100/100</strong>!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-2">
              <h3 className="font-bold text-rose-300 text-sm md:text-base flex items-center gap-2">
                <span>❌</span> K-Means Way (The Ghost Average)
              </h3>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                K-Means calculates the mathematical mean: <InlineMath math="\frac{40+40+40+40+40+100}{6} = 50" />.
                K-Means invents an imaginary student scoring <strong>50</strong> as the cluster center. But <em>no real student in the room scored 50</em>! If you need a real human class representative, K-Means fails because its "Centroid" is a mathematical ghost point that doesn't exist in the real world.
              </p>
            </div>

            <div className="p-4 bg-emerald-950/40 rounded-2xl border border-emerald-800/60 space-y-2">
              <h3 className="font-bold text-emerald-300 text-sm md:text-base flex items-center gap-2">
                <span>✅</span> K-Medoids Way (The Real Human Representative)
              </h3>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                K-Medoids insists: <strong>"No imaginary ghost points allowed!"</strong> It picks an <em>actual real student in the classroom</em> who is closest to everyone else (scoring 40). The 100-mark outlier student does NOT pull the representative away. You get a real, living student as your leader who truly represents the group!
              </p>
            </div>
          </div>

          {/* 4-Step Plain English Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="bg-slate-950 p-4 rounded-xl border border-indigo-800/50 space-y-1.5">
              <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider">❓ WHAT is a Medoid?</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                A <strong>Medoid</strong> is a real data point selected from your dataset to act as the central leader of a cluster because it has the smallest total distance to all other cluster members.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-cyan-800/50 space-y-1.5">
              <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">💡 WHY use K-Medoids?</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Because K-Means breaks when you have extreme outliers or non-numeric data. K-Medoids is 100% outlier-resistant and works with any distance metric (travel time, DNA, text similarity).
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-amber-800/50 space-y-1.5">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">⚙️ HOW does it work?</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Pick $K$ initial real items as Medoids $\rightarrow$ assign points to nearest Medoid $\rightarrow$ try swapping Medoids with non-medoids $\rightarrow$ keep swaps that reduce total distance cost!
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-emerald-800/50 space-y-1.5">
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">🎯 WHEN to use it?</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Use it when your cluster center MUST be a real physical location (e.g. real warehouse site, real patient medical record) or when your dataset has wild noisy outliers!
              </p>
            </div>
          </div>

          {/* Explicit Medoid Definition Callout */}
          <div className="p-5 bg-gradient-to-r from-emerald-950/60 via-slate-900 to-indigo-950/60 rounded-2xl border-2 border-emerald-500/40 shadow-lg space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-black tracking-wider uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
                FORMAL DEFINITION &amp; ETYMOLOGY
              </span>
            </div>
            <h3 className="font-extrabold text-white text-base md:text-lg flex items-center gap-2">
              <span>📖</span> What does the word "Medoid" mean?
            </h3>
            <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
              <strong>Word Origin:</strong> <em>Medoid</em> = <strong>Median</strong> + <strong>-oid</strong> (meaning <em>"resembling a median"</em>). Just as a 1D median is an actual middle number in a sorted list (unlike the mean which is a calculated average), a <strong>Medoid</strong> is the multidimensional version of a median—an actual data point from your dataset that sits right at the center of a group.
            </p>
            <div className="p-4 bg-slate-950/90 rounded-xl border border-emerald-800/50 space-y-2">
              <span className="text-xs font-bold text-emerald-400 block">Formal Definition:</span>
              <p className="text-xs text-slate-300">
                A <strong>Medoid</strong> of cluster <InlineMath math="C_k" /> is the specific candidate data point <InlineMath math="m_k \in C_k" /> that minimizes the total sum of distances to all other data points in that cluster:
              </p>
              <div className="py-2 text-center text-emerald-300 font-mono text-xs md:text-sm bg-emerald-950/40 rounded-lg border border-emerald-800/40">
                <InlineMath math="m_k = \operatorname*{arg\,min}_{y \in C_k} \sum_{x \in C_k} D(x, y)" />
              </div>
              <p className="text-[11px] text-slate-400">
                💡 <strong>In Plain English:</strong> "Test every point $y$ in the group as a candidate leader. The point $y$ that gives the smallest total distance to everyone else wins and becomes the Medoid!"
              </p>
            </div>
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
              {"• Medoids are real dataset elements: cost minimizes \\sum |x_i - m_k| without quadratic penalty!"}
            </text>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown Section */}
      <section id="theory" className="scroll-mt-6 bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 font-bold text-lg">
            01
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Mathematical Formulation of K-Medoids (Explained Simply)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Dissimilarity objective function, distance metrics, and exemplar optimization
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Total Dissimilarity Cost */}
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                Total Dissimilarity Cost (Objective Function)
              </span>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 rounded">
                Global Minimization
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Given a dataset <InlineMath math="X = \{x_1, x_2, \dots, x_N\}" /> split into <InlineMath math="K" /> groups <InlineMath math="\{C_1, C_2, \dots, C_K\}" />, K-Medoids minimizes the total distance cost <InlineMath math="J" /> across all data points:
            </p>

            {/* Rendered Math Formula Box */}
            <div className="text-sm md:text-base font-mono text-indigo-300 bg-indigo-950/40 p-4 rounded-xl border border-indigo-800/60 shadow-inner flex justify-center items-center overflow-x-auto py-3">
              <BlockMath math="J = \sum_{k=1}^K \sum_{x_i \in C_k} D(x_i, m_k)" />
            </div>

            <div className="p-3 bg-indigo-950/30 rounded-lg border border-indigo-800/40 text-xs text-indigo-200">
              <strong>💡 In Plain English:</strong> "Add up the distances from every single data point to its assigned group leader (Medoid <InlineMath math="m_k" />). The algorithm tries to make this total distance sum as small as possible!"
            </div>

            <div className="bg-slate-900/90 p-3.5 rounded-lg border border-slate-800 space-y-2 text-xs text-slate-300">
              <span className="font-bold text-amber-300 block">Variable Breakdown:</span>
              <ul className="space-y-1 text-slate-400 list-disc list-inside">
                <li><strong className="text-cyan-300"><InlineMath math="J" /></strong>: Total distance score (the lower, the better!)</li>
                <li><strong className="text-cyan-300"><InlineMath math="C_k" /></strong>: The $k$-th cluster group</li>
                <li><strong className="text-cyan-300"><InlineMath math="m_k \in X" /></strong>: The real data point acting as Medoid for cluster $k$</li>
                <li><strong className="text-cyan-300"><InlineMath math="D(x_i, m_k)" /></strong>: Distance between point $x_i$ and Medoid $m_k$ (Manhattan, Euclidean, etc.)</li>
              </ul>
            </div>
          </div>

          {/* Card 2: Medoid Definition */}
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                Medoid Exemplar Definition
              </span>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 rounded">
                Real Point Constraint
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              A medoid <InlineMath math="m_k" /> of cluster <InlineMath math="C_k" /> is defined as the candidate point <InlineMath math="y \in C_k" /> that minimizes intra-cluster distance:
            </p>

            {/* Rendered Math Formula Box */}
            <div className="text-sm md:text-base font-mono text-emerald-300 bg-emerald-950/40 p-4 rounded-xl border border-emerald-800/60 shadow-inner flex justify-center items-center overflow-x-auto py-3">
              <BlockMath math="m_k = \arg\min_{y \in C_k} \sum_{x \in C_k} D(x, y)" />
            </div>

            <div className="p-3 bg-emerald-950/30 rounded-lg border border-emerald-800/40 text-xs text-emerald-200">
              <strong>💡 In Plain English:</strong> "To pick the leader of a group, try every person in the group one by one. Whichever person gives the lowest total travel distance to everyone else becomes the Medoid!"
            </div>

            <div className="bg-slate-900/90 p-3.5 rounded-lg border border-slate-800 space-y-2 text-xs text-slate-300">
              <span className="font-bold text-emerald-300 block">Crucial Property: Physical Grounding</span>
              <p className="text-slate-400 leading-relaxed">
                Because <InlineMath math="m_k \in X" />, the cluster center is guaranteed to be a real, physically existing data observation (e.g. an actual patient record, an actual warehouse site), unlike K-Means centroids (<InlineMath math="\mu_k \notin X" />) which produce virtual mathematical averages.
              </p>
            </div>
          </div>
        </div>

        {/* Concrete Step-by-Step Dataset Example */}
        <div className="bg-slate-950 p-6 rounded-2xl border-2 border-indigo-500/40 shadow-xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-indigo-500/20 pb-3">
            <h3 className="text-base sm:text-lg font-extrabold text-white flex items-center gap-2">
              <span>🔢</span> Concrete Step-by-Step Dataset Example
            </h3>
            <span className="px-3 py-1 text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 rounded-full">
              Hand-Calculated Walkthrough
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Let's work through a simple 1D dataset of 5 numbers to see <strong>exactly how a Medoid is selected</strong> step-by-step, and why it beats a K-Means Centroid when an outlier is present.
          </p>

          {/* Dataset Definition */}
          <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-amber-300 block">Given Dataset X (5 Data Points):</span>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              <span className="px-2.5 py-1 bg-slate-800 text-sky-300 rounded border border-slate-700">Point A = 2</span>
              <span className="px-2.5 py-1 bg-slate-800 text-sky-300 rounded border border-slate-700">Point B = 3</span>
              <span className="px-2.5 py-1 bg-slate-800 text-sky-300 rounded border border-slate-700">Point C = 4</span>
              <span className="px-2.5 py-1 bg-slate-800 text-sky-300 rounded border border-slate-700">Point D = 8</span>
              <span className="px-2.5 py-1 bg-rose-950 text-rose-300 rounded border border-rose-800/80 font-bold">Point E = 50 (Extreme Outlier!)</span>
            </div>
          </div>

          {/* Side-by-Side Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            {/* Left: K-Means Centroid */}
            <div className="bg-slate-900 p-4 rounded-xl border border-rose-900/50 space-y-3">
              <div className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1">
                <span>1️⃣</span> K-Means Centroid Calculation (Mean)
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                K-Means calculates the arithmetic mean of all 5 numbers:
              </p>
              <div className="p-3 bg-slate-950 text-center font-mono text-xs md:text-sm text-rose-300 rounded-lg border border-slate-800">
                <InlineMath math="\text{Centroid } \mu = \frac{2 + 3 + 4 + 8 + 50}{5} = \frac{67}{5} = \mathbf{13.4}" />
              </div>
              <p className="text-xs text-rose-300/90 leading-relaxed">
                🚨 <strong>Problem:</strong> The Centroid is <strong>13.4</strong>. No data point in the dataset equals 13.4, and it is far away from the main cluster <InlineMath math="\{2, 3, 4, 8\}" /> because outlier 50 pulled it!
              </p>
            </div>

            {/* Right: K-Medoids Calculation */}
            <div className="bg-slate-900 p-4 rounded-xl border border-emerald-900/50 space-y-3">
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                <span>2️⃣</span> K-Medoids Selection (Min Total Distance)
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                K-Medoids tests every real point <InlineMath math="y \in X" /> to find which candidate gives the smallest total absolute distance <InlineMath math="S(y) = \sum |x_i - y|" />:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[11px] font-mono border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="p-1.5">Candidate (y)</th>
                      <th className="p-1.5">Sum of Absolute Distances S(y)</th>
                      <th className="p-1.5">Total Cost</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    <tr>
                      <td className="p-1.5 text-cyan-300">y = 2</td>
                      <td className="p-1.5">|2-2| + |3-2| + |4-2| + |8-2| + |50-2| = 0+1+2+6+48</td>
                      <td className="p-1.5 text-slate-400">57</td>
                    </tr>
                    <tr>
                      <td className="p-1.5 text-cyan-300">y = 3</td>
                      <td className="p-1.5">|2-3| + |3-3| + |4-3| + |8-3| + |50-3| = 1+0+1+5+47</td>
                      <td className="p-1.5 text-slate-400">54</td>
                    </tr>
                    <tr className="bg-emerald-950/40 font-bold">
                      <td className="p-1.5 text-emerald-300">y = 4 ⭐</td>
                      <td className="p-1.5 text-emerald-200">|2-4| + |3-4| + |4-4| + |8-4| + |50-4| = 2+1+0+4+46</td>
                      <td className="p-1.5 text-emerald-300 font-bold">53 (MINIMUM!)</td>
                    </tr>
                    <tr>
                      <td className="p-1.5 text-cyan-300">y = 8</td>
                      <td className="p-1.5">|2-8| + |3-8| + |4-8| + |8-8| + |50-8| = 6+5+4+0+42</td>
                      <td className="p-1.5 text-slate-400">57</td>
                    </tr>
                    <tr>
                      <td className="p-1.5 text-cyan-300">y = 50</td>
                      <td className="p-1.5">|2-50| + |3-50| + |4-50| + |8-50| + |50-50| = 48+47+46+42+0</td>
                      <td className="p-1.5 text-slate-400">183</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-emerald-300/90 leading-relaxed">
                ✅ <strong>Winner:</strong> Candidate <strong>y = 4</strong> gives the lowest total cost (53). Thus, <strong>Medoid = 4</strong>! Point 4 is a real observation sitting right at the center of the true cluster <InlineMath math="\{2, 3, 4, 8\}" />, completely unaffected by outlier 50!
              </p>
            </div>
          </div>
        </div>

        {/* Deep Conceptual Comparison Matrix */}
        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
          <h3 className="text-sm font-bold text-indigo-300 flex items-center gap-2">
            <span>📊</span> Centroid (K-Means) vs Medoid (K-Medoids) Mathematical Comparison
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono">
                  <th className="p-3">Feature</th>
                  <th className="p-3 text-rose-400">K-Means Centroid (<InlineMath math="\mu_k" />)</th>
                  <th className="p-3 text-emerald-400">K-Medoids Exemplar (<InlineMath math="m_k" />)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-slate-200">Mathematical Definition</td>
                  <td className="p-3 font-mono text-rose-300"><InlineMath math="\mu_k = \frac{1}{|C_k|} \sum_{x \in C_k} x" /></td>
                  <td className="p-3 font-mono text-emerald-300"><InlineMath math="m_k = \arg\min_{y \in C_k} \sum_{x \in C_k} D(x, y)" /></td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-slate-200">Data Membership</td>
                  <td className="p-3 text-slate-400">Artificial point (<InlineMath math="\mu_k \notin X" />)</td>
                  <td className="p-3 text-emerald-400 font-semibold">Strict real point (<InlineMath math="m_k \in X" />)</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-slate-200">Objective Function</td>
                  <td className="p-3 font-mono text-slate-400">Squared Euclidean Distance (<InlineMath math="L_2^2" />)</td>
                  <td className="p-3 font-mono text-emerald-400">Arbitrary Metric <InlineMath math="D(x, y)" /> (<InlineMath math="L_1" />, Cosine, etc.)</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-3 font-semibold text-slate-200">Outlier Sensitivity</td>
                  <td className="p-3 text-rose-400 font-bold">High (Mean shifts drastically)</td>
                  <td className="p-3 text-emerald-400 font-bold">Extremely Robust (Median-like stability)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. Interactive Outlier Resistance Studio */}
      <section id="interactive" className="scroll-mt-6 bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
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
