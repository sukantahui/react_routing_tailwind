// src/components/study/quantitative-analysis/topics/002_004_vogel-approximation-method/Topic0.jsx
// React 19 Function-based Component
// Module: 002_004_vogel-approximation-method
// Topic 0: Concept of penalty

import React, { useState, useEffect, useRef, useMemo } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic0_files/topic0_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic0_files/topic0_note.txt?raw';

const Topic0 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [activeTab, setActiveTab] = useState('concept');
  const [interactiveMatrixIdx, setInteractiveMatrixIdx] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedCol, setSelectedCol] = useState(null);
  const [showTieModal, setShowTieModal] = useState(false);

  const sectionRefs = useRef([]);

  // Intersection Observer for active section highlighting
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index, 10);
            if (!isNaN(index)) {
              setActiveSection(index);
            }
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  // Pre-configured real-world case studies in Bengal
  const realWorldCaseStudies = [
    {
      id: 'fasteners',
      title: '1. Engineering Fasteners & Foundry Logistics (Ichapur to Kolkata)',
      manager: 'Debangshu (Lead Operations Engineer)',
      origins: [
        { name: 'Barrackpore Depot (S1)', supply: 60 },
        { name: 'Ichapur Foundry (S2)', supply: 80 },
      ],
      destinations: [
        { name: 'Kolkata Port (D1)', demand: 50 },
        { name: 'Jadavpur Depot (D2)', demand: 50 },
        { name: 'Salt Lake Hub (D3)', demand: 40 },
      ],
      matrix: [
        [12, 18, 14],
        [6, 26, 10],
      ],
      rowPenalties: ['₹14 - ₹12 = ₹2', '₹10 - ₹6 = ₹4'],
      colPenalties: ['₹12 - ₹6 = ₹6', '₹26 - ₹18 = ₹8 (MAX)', '₹14 - ₹10 = ₹4'],
      maxPenaltyLocation: 'Column 2 (Jadavpur Depot) with Penalty = ₹8',
      actionTaken: 'Allocate maximum possible 50 tons to lowest cost cell in Col 2 &rarr; Cell (S1, D2) @ ₹18/ton.',
      financialImpact: 'Shields Jadavpur from paying the exorbitant ₹26 route from Ichapur. Immediate savings: 50 × ₹8 = ₹400.',
      summary: 'Without penalty evaluation, a greedy method would grab Ichapur → Kolkata (₹6), leaving Jadavpur stranded with a ₹26/ton nightmare.',
    },
    {
      id: 'vaccines',
      title: '2. Cold-Chain Vaccine Distribution Network (Greater Kolkata)',
      manager: 'Mamata & Mahima (Health Supply Chain Directors)',
      origins: [
        { name: 'Kolkata Central Storage (S1)', supply: 100 },
        { name: 'Barrackpore Bio-Depot (S2)', supply: 120 },
      ],
      destinations: [
        { name: 'Howrah Hospital (D1)', demand: 80 },
        { name: 'Barasat Health Center (D2)', demand: 70 },
        { name: 'Jadavpur Medical Hub (D3)', demand: 70 },
      ],
      matrix: [
        [5, 15, 8],
        [4, 22, 18],
      ],
      rowPenalties: ['₹8 - ₹5 = ₹3', '₹18 - ₹4 = ₹14 (MAX)'],
      colPenalties: ['₹5 - ₹4 = ₹1', '₹22 - ₹15 = ₹7', '₹18 - ₹8 = ₹10'],
      maxPenaltyLocation: 'Row 2 (Barrackpore Bio-Depot) with Penalty = ₹14',
      actionTaken: 'Allocate 80 boxes to lowest cost in Row 2 -> Cell (S2, D1) @ ₹4/box.',
      financialImpact: 'Locks in the ₹4 rate for 80 units, preventing a massive ₹14/box regret on the Barrackpore stock.',
      summary: 'Row 2 had an alarming penalty gap of ₹14/box between ₹4 and ₹18. VAM solved this bottleneck on step 1.',
    },
    {
      id: 'fmcg',
      title: '3. Packaged FMCG Supermarket Fulfillment (Barrackpore & Ichapur)',
      manager: 'Susmita (Regional Distribution Coordinator)',
      origins: [
        { name: 'Barrackpore Warehouse (S1)', supply: 40 },
        { name: 'Ichapur Logistics Hub (S2)', supply: 50 },
        { name: 'Kolkata Depot (S3)', supply: 30 },
      ],
      destinations: [
        { name: 'Shyambazar Mart (D1)', demand: 45 },
        { name: 'Salt Lake Sector V (D2)', demand: 35 },
        { name: 'Gariahat Supercenter (D3)', demand: 40 },
      ],
      matrix: [
        [3, 7, 9],
        [6, 4, 8],
        [5, 6, 2],
      ],
      rowPenalties: ['₹7 - ₹3 = ₹4', '₹6 - ₹4 = ₹2', '₹5 - ₹2 = ₹3'],
      colPenalties: ['₹5 - ₹3 = ₹2', '₹6 - ₹4 = ₹2', '₹8 - ₹2 = ₹6 (MAX)'],
      maxPenaltyLocation: 'Column 3 (Gariahat Supercenter) with Penalty = ₹6',
      actionTaken: 'Allocate min(30, 40) = 30 pallets to lowest cost cell in Col 3 -> Cell (S3, D3) @ ₹2/pallet.',
      financialImpact: 'Exhausts Kolkata Depot directly at ₹2/pallet, avoiding Gariahat taking pallets at ₹8 or ₹9.',
      summary: 'Gariahat had the highest penalty hazard (₹6). Fulfilling 30 pallets @ ₹2 saved ₹180 immediately.',
    },
    {
      id: 'printing',
      title: '4. Academic Publishing & Test Paper Logistics (Bengal Universities)',
      manager: 'Abhronila (Supply Chain & Educational Press Lead)',
      origins: [
        { name: 'Barrackpore Central Press (S1)', supply: 75 },
        { name: 'Kolkata Digital Hub (S2)', supply: 65 },
        { name: 'Ichapur Book Warehouse (S3)', supply: 60 },
      ],
      destinations: [
        { name: 'Jadavpur University Cell (D1)', demand: 60 },
        { name: 'College Street Depot (D2)', demand: 80 },
        { name: 'Barasat Campus Center (D3)', demand: 60 },
      ],
      matrix: [
        [10, 2, 16],
        [7, 11, 4],
        [8, 14, 12],
      ],
      rowPenalties: ['₹10 - ₹2 = ₹8 (MAX)', '₹7 - ₹4 = ₹3', '₹12 - ₹8 = ₹4'],
      colPenalties: ['₹8 - ₹7 = ₹1', '₹11 - ₹2 = ₹9 (MAX GLOBAL)', '₹12 - ₹4 = ₹8'],
      maxPenaltyLocation: 'Column 2 (College Street Depot) with Penalty = ₹9',
      actionTaken: 'Allocate min(75, 80) = 75 bundles to lowest cost in Col 2 -> Cell (S1, D2) @ ₹2/bundle.',
      financialImpact: 'Secures 75 bundles at ₹2, preventing College Street from taking costly ₹11 or ₹14 alternatives.',
      summary: 'Column 2 had a massive ₹9 penalty gap. Allocating S1 completely saturated the cheapest route.',
    },
  ];

  // Sample Interactive Matrices for the live Penalty Explorer
  const interactivePresets = [
    {
      name: 'Preset A: 3 Origins × 3 Destinations (Classic VAM Tableau)',
      origins: ['Barrackpore (S1)', 'Ichapur (S2)', 'Kolkata (S3)'],
      destinations: ['Jadavpur (D1)', 'Salt Lake (D2)', 'Howrah (D3)'],
      supplies: [30, 50, 20],
      demands: [30, 40, 30],
      matrix: [
        [6, 8, 4],
        [4, 9, 3],
        [8, 5, 2],
      ],
    },
    {
      name: 'Preset B: High-Penalty Risk Scenario (Trap for Pure Greedy)',
      origins: ['Ichapur Works (S1)', 'Barrackpore Yard (S2)', 'Kolkata Hub (S3)'],
      destinations: ['Barasat (D1)', 'Jadavpur (D2)', 'Airport Zone (D3)'],
      supplies: [50, 40, 60],
      demands: [40, 70, 40],
      matrix: [
        [2, 28, 30],
        [7, 8, 9],
        [15, 6, 12],
      ],
    },
    {
      name: 'Preset C: Identical Costs Case (Zero Penalty Showcase)',
      origins: ['Plant North (S1)', 'Plant Central (S2)', 'Plant South (S3)'],
      destinations: ['Market A (D1)', 'Market B (D2)', 'Market C (D3)'],
      supplies: [45, 55, 30],
      demands: [50, 40, 40],
      matrix: [
        [5, 5, 12],
        [8, 14, 8],
        [10, 10, 10],
      ],
    },
  ];

  const currentPreset = interactivePresets[interactiveMatrixIdx];

  // Helper function to calculate penalties for any matrix
  const calculatePenalties = (mat) => {
    const rowPens = mat.map((row) => {
      const sorted = [...row].sort((a, b) => a - b);
      const min1 = sorted[0];
      const min2 = sorted.length > 1 ? sorted[1] : sorted[0];
      return {
        min1,
        min2,
        penalty: min2 - min1,
        minColIdx: row.indexOf(min1),
      };
    });

    const numCols = mat[0].length;
    const colPens = [];
    for (let j = 0; j < numCols; j++) {
      const colValues = mat.map((r) => r[j]);
      const sorted = [...colValues].sort((a, b) => a - b);
      const min1 = sorted[0];
      const min2 = sorted.length > 1 ? sorted[1] : sorted[0];
      colPens.push({
        min1,
        min2,
        penalty: min2 - min1,
        minRowIdx: colValues.indexOf(min1),
      });
    }

    // Find global max penalty
    let maxP = -1;
    let maxType = null;
    let maxIdx = -1;

    rowPens.forEach((rp, idx) => {
      if (rp.penalty > maxP) {
        maxP = rp.penalty;
        maxType = 'row';
        maxIdx = idx;
      }
    });

    colPens.forEach((cp, idx) => {
      if (cp.penalty > maxP) {
        maxP = cp.penalty;
        maxType = 'col';
        maxIdx = idx;
      }
    });

    return { rowPens, colPens, maxP, maxType, maxIdx };
  };

  const { rowPens, colPens, maxP, maxType, maxIdx } = useMemo(
    () => calculatePenalties(currentPreset.matrix),
    [currentPreset]
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Inline Scoped Keyframes */}
      <style>{`
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 15px rgba(16, 185, 129, 0.2); }
          50% { box-shadow: 0 0 25px rgba(16, 185, 129, 0.45); }
        }
        @keyframes penaltyPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.04); }
        }
        .animate-penalty-pulse {
          animation: penaltyPulse 2.5s infinite ease-in-out;
        }
        .glow-emerald {
          animation: pulseGlow 3s infinite;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
              Module 002_004 • Topic 0
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-cyan-950/80 text-cyan-400 border border-cyan-800/60">
              Initial Basic Feasible Solution (IBFS)
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Concept of Penalty in Vogel's Approximation Method
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            Unraveling the mathematical and economic foundation of <span className="text-emerald-400 font-semibold">Line Penalties</span> (also known as <span className="text-amber-400 font-semibold">Opportunity Cost</span> or <span className="text-rose-400 font-semibold">Regret Cost</span>). Discover why measuring the penalty gap between the best and second-best shipping routes enables VAM to consistently outperform greedy heuristics like Matrix Minima and coordinate-based rules like NWCR.
          </p>

          {/* Quick Navigation Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'summary', label: '1. Executive Summary' },
              { id: 'math-def', label: '2. Mathematical Formulation' },
              { id: 'regret-principle', label: '3. The Regret Principle' },
              { id: 'interactive-explorer', label: '4. Interactive Matrix Explorer' },
              { id: 'svg-flow', label: '5. Penalty Architecture & SVG' },
              { id: 'case-studies', label: '6. Bengal Case Studies' },
              { id: 'edge-cases', label: '7. Edge Cases & Ties' },
              { id: 'comparison', label: '8. Method Comparison' },
              { id: 'pitfalls', label: '9. Beginner Pitfalls' },
              { id: 'hints', label: '10. Guided Hints' },
              { id: 'best-practices', label: '11. Best Practices' },
              { id: 'checklist', label: '12. Student Checklist' },
            ].map((item, idx) => (
              <button
                key={item.id}
                onClick={() => {
                  sectionRefs.current[idx]?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={clsx(
                  'px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 border',
                  activeSection === idx
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-900/40'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
                )}
              &gt;
                {item.label}
              </button>
            ))}
          </div>
        </header>

        {/* SECTION 1: Executive Summary & Foundational Intuition */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                01
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Executive Summary: What is a Penalty in VAM?
              </h2>
            </div>

            <div className="flex flex-col space-y-4 text-slate-300 leading-relaxed text-sm sm:text-base">
              <p>
                In the study of Linear Programming and Operations Research, the <strong>Transportation Problem</strong> seeks to satisfy destination demands from origin warehouses at minimal total freight cost <span className="font-mono text-emerald-400">min Z = ∑ ∑ cᵢⱼ · xᵢⱼ</span>. Before executing optimality algorithms like MODI or Stepping-Stone, we must construct an Initial Basic Feasible Solution (IBFS).
              </p>
              
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80 flex flex-col space-y-2">
                <span className="text-emerald-300 font-semibold text-base flex items-center gap-2">
                  <span className="text-lg">💡</span> The Core Core Heuristic Rule of VAM
                </span>
                <p className="text-slate-300 text-sm">
                  <strong>Vogel's Approximation Method (VAM)</strong> constructs this initial solution by evaluating the financial consequence of <em>delaying an allocation</em>. For every row and column, it calculates a <strong>Penalty</strong>: the difference between the <strong>absolute lowest unit cost</strong> and the <strong>second lowest unit cost</strong>.
                </p>
              </div>

              <div className="flex flex-col space-y-3">
                <h3 className="text-lg font-semibold text-white">Why Penalty Changes the Game</h3>
                <div className="flex flex-col space-y-2">
                  <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-700/50 flex items-start space-x-3">
                    <span className="text-emerald-400 font-bold mt-0.5">•</span>
                    <div>
                      <span className="text-slate-200 font-medium">Quantifies Risk of Procrastination:</span> A line with a huge penalty (e.g. ₹50/ton gap) will severely punish the budget if its best route is lost.
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-700/50 flex items-start space-x-3">
                    <span className="text-cyan-400 font-bold mt-0.5">•</span>
                    <div>
                      <span className="text-slate-200 font-medium">Symmetric Bidirectional Scan:</span> Computes penalties across both supply rows and demand destinations simultaneously.
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-700/50 flex items-start space-x-3">
                    <span className="text-amber-400 font-bold mt-0.5">•</span>
                    <div>
                      <span className="text-slate-200 font-medium">Lookahead Advantage:</span> Unlike pure greedy algorithms that grab any small cheap cell, VAM prioritizes the route whose alternative is the most disastrous.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Mathematical Formulation */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-600/20 text-cyan-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Mathematical Formulation of Line Penalties
              </h2>
            </div>

            <div className="flex flex-col space-y-6">
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Consider an <span className="font-mono">m × n</span> transportation tableau with cost coefficients <span className="font-mono">cᵢⱼ ≥ 0</span>. Let <span className="font-mono">A</span> denote the set of active (unallocated and non-crossed-out) cells at any given iteration.
              </p>

              {/* Formula Cards */}
              <div className="flex flex-col space-y-4">
                {/* Row Penalty Formula */}
                <div className="p-5 rounded-xl bg-slate-800/50 border border-cyan-800/40 flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-cyan-300 font-semibold text-base">Row Penalty (Pᵢ) for Supply Origin i</span>
                    <span className="px-2.5 py-0.5 rounded text-xs font-mono bg-cyan-950 text-cyan-400 border border-cyan-800">
                      Row Opportunity Cost
                    </span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-lg font-mono text-cyan-300 text-sm sm:text-base overflow-x-auto">
                    Pᵢ = c_(i, 2nd lowest) - c_(i, lowest) &nbsp;= &nbsp;c_(i, (2)) - c_(i, (1))
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Where <span className="font-mono text-slate-200">c_(i, (1))</span> is the minimum unit cost among active columns in Row i, and <span className="font-mono text-slate-200">c_(i, (2))</span> is the second-smallest unit cost in Row i.
                  </p>
                </div>

                {/* Column Penalty Formula */}
                <div className="p-5 rounded-xl bg-slate-800/50 border border-emerald-800/40 flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-300 font-semibold text-base">Column Penalty (Pⱼ) for Demand Destination j</span>
                    <span className="px-2.5 py-0.5 rounded text-xs font-mono bg-emerald-950 text-emerald-400 border border-emerald-800">
                      Column Opportunity Cost
                    </span>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-lg font-mono text-emerald-300 text-sm sm:text-base overflow-x-auto">
                    Pⱼ = c_(2nd lowest, j) - c_(lowest, j) &nbsp;= &nbsp;c_((2), j) - c_((1), j)
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Where <span className="font-mono text-slate-200">c_((1), j)</span> is the minimum unit cost among active rows in Column j, and <span className="font-mono text-slate-200">c_((2), j)</span> is the second-smallest unit cost in Column j.
                  </p>
                </div>
              </div>

              {/* Mathematical Invariance Properties */}
              <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/60 flex flex-col space-y-3">
                <h4 className="text-white font-semibold text-sm">Key Mathematical Invariance Axioms:</h4>
                <div className="flex flex-col space-y-2 text-xs sm:text-sm text-slate-300">
                  <div className="flex items-start space-x-2">
                    <span className="text-emerald-400">✔</span>
                    <span><strong>Non-negativity:</strong> Because <span className="font-mono">c_(2) ≥ c_(1)</span>, penalty <span className="font-mono">P ≥ 0</span> unconditionally for all lines.</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-emerald-400">✔</span>
                    <span><strong>Additive Invariance:</strong> Adding a fixed surcharge <span className="font-mono">C</span> to all entries leaves all penalties unchanged: <span className="font-mono">(c₂ + C) - (c₁ + C) = c₂ - c₁</span>.</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-emerald-400">✔</span>
                    <span><strong>Positive Multiplicative Scaling:</strong> Multiplying all costs by scalar <span className="font-mono">k &gt; 0</span> scales all penalties by <span className="font-mono">k</span> without altering selection order.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: The Regret Principle (Why Pure Greedy Fails) */}
        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          data-index="2"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-600/20 text-rose-400 font-bold text-sm">
                03
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                The Regret Principle: Why Pure Greedy Fails & Penalty Saves
              </h2>
            </div>

            <div className="flex flex-col space-y-4 text-slate-300 leading-relaxed text-sm sm:text-base">
              <p>
                To understand why penalty is superior to standard greedy selection (Matrix Minima), study the classic <em>High Hazard vs Low Hazard</em> dilemma below:
              </p>

              {/* Comparison Boxes: Low Regret vs High Regret */}
              <div className="flex flex-col space-y-4">
                
                {/* Scenario A: Low Hazard Line */}
                <div className="p-5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-400 font-bold text-base flex items-center gap-2">
                      <span>🟢</span> Origin Line A: Low Hazard (Negligible Regret)
                    </span>
                    <span className="text-xs px-2 py-1 bg-emerald-950 text-emerald-300 rounded border border-emerald-800 font-mono">
                      Penalty = ₹1/ton
                    </span>
                  </div>
                  <p className="text-sm text-slate-300">
                    Route 1 = <span className="font-mono text-emerald-400 font-bold">₹2/ton</span> (cheapest), Route 2 = <span className="font-mono text-slate-300">₹3/ton</span> (backup).
                  </p>
                  <div className="p-3 bg-slate-950/70 rounded-lg text-xs text-slate-400">
                    <strong>Consequence if delayed:</strong> If you do not allocate to Route 1 right now and are forced to use Route 2 later, your extra cost is only <span className="text-emerald-400 font-mono font-bold">₹3 - ₹2 = ₹1 per ton</span>. This line can safely wait.
                  </div>
                </div>

                {/* Scenario B: High Hazard Line */}
                <div className="p-5 rounded-xl bg-slate-800/40 border border-rose-800/60 flex flex-col space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-rose-400 font-bold text-base flex items-center gap-2">
                      <span>🔴</span> Origin Line B: High Hazard (Catastrophic Regret)
                    </span>
                    <span className="text-xs px-2 py-1 bg-rose-950 text-rose-300 rounded border border-rose-800 font-mono animate-penalty-pulse">
                      Penalty = ₹46/ton (CRITICAL)
                    </span>
                  </div>
                  <p className="text-sm text-slate-300">
                    Route 1 = <span className="font-mono text-amber-400 font-bold">₹4/ton</span> (cheapest), Route 2 = <span className="font-mono text-rose-400 font-bold">₹50/ton</span> (backup).
                  </p>
                  <div className="p-3 bg-slate-950/70 rounded-lg text-xs text-slate-400">
                    <strong>Consequence if delayed:</strong> If you chase Line A's ₹2 route first and exhaust warehouse capacity, Line B is forced onto its ₹50 route. Shipping 50 tons via Route 2 causes an avoidable loss of <span className="text-rose-400 font-mono font-bold">50 × ₹46 = ₹2,300</span>!
                  </div>
                </div>

              </div>

              {/* The Verdict */}
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/60 flex items-start space-x-3">
                <span className="text-emerald-400 text-xl font-bold">⚖️</span>
                <div className="text-xs sm:text-sm text-slate-200">
                  <strong>The VAM Resolution:</strong> Matrix Minima blindly picks Line A because ₹2 &lt; ₹4. In contrast, <strong>VAM picks Line B</strong> because its penalty of <span className="text-rose-400 font-bold">₹46</span> dwarfs Line A's penalty of <span className="text-emerald-400 font-bold">₹1</span>. VAM neutralizes high-regret threats before they can trigger financial damage.
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 4: Interactive Penalty Explorer */}
        <section
          ref={(el) => (sectionRefs.current[3] = el)}
          data-index="3"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-emerald">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                  04
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Interactive Matrix Penalty Explorer
                </h2>
              </div>
              <span className="text-xs text-emerald-400 font-mono px-3 py-1 bg-emerald-950 rounded-full border border-emerald-800">
                Live Calculation Engine
              </span>
            </div>

            <p className="text-slate-300 text-sm">
              Select a transportation problem preset below. Observe how row and column penalties are automatically computed, how the maximum penalty line is identified, and which least-cost cell receives the initial allocation.
            </p>

            {/* Preset Selector Buttons */}
            <div className="flex flex-wrap gap-2">
              {interactivePresets.map((preset, pIdx) => (
                <button
                  key={pIdx}
                  onClick={() => {
                    setInteractiveMatrixIdx(pIdx);
                    setSelectedRow(null);
                    setSelectedCol(null);
                  }}
                  className={clsx(
                    'px-3.5 py-2 rounded-lg text-xs font-semibold transition-all border text-left',
                    interactiveMatrixIdx === pIdx
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-lg'
                      : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
                  )}
                &gt;
                  {preset.name}
                </button>
              ))}
            </div>

            {/* Matrix Display Tableau */}
            <div className="overflow-x-auto bg-slate-950/80 rounded-xl p-4 border border-slate-800 flex flex-col space-y-4">
              <table className="w-full text-center border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2 text-left font-semibold text-slate-300">Origins \ Dests</th>
                    {currentPreset.destinations.map((d, dIdx) => (
                      <th key={dIdx} className="p-2 font-semibold text-cyan-300">
                        {d}
                      </th>
                    ))}
                    <th className="p-2 font-semibold text-amber-300">Supply</th>
                    <th className="p-2 font-bold text-emerald-400 bg-emerald-950/30 border-l border-slate-800">
                      Row Penalty (Pᵢ)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentPreset.matrix.map((row, rIdx) => {
                    const isMaxRow = maxType === 'row' && maxIdx === rIdx;
                    return (
                      <tr
                        key={rIdx}
                        className={clsx(
                          'border-b border-slate-800/60 transition-colors',
                          isMaxRow ? 'bg-emerald-950/30' : 'hover:bg-slate-900/50'
                        )}
                      >
                        <td className="p-2.5 text-left font-medium text-slate-200 flex items-center gap-1.5">
                          {isMaxRow && <span className="text-emerald-400 text-xs">👉</span>}
                          {currentPreset.origins[rIdx]}
                        </td>
                        {row.map((cost, cIdx) => {
                          const isMinInRow = rowPens[rIdx].min1 === cost;
                          const isMaxPenaltyCell =
                            (isMaxRow && isMinInRow) ||
                            (maxType === 'col' && maxIdx === cIdx && colPens[cIdx].min1 === cost);

                          return (
                            <td key={cIdx} className="p-2">
                              <div
                                className={clsx(
                                  'p-2 rounded-lg font-mono font-bold transition-all border',
                                  isMaxPenaltyCell
                                    ? 'bg-emerald-500 text-slate-950 border-emerald-300 shadow-md scale-105 animate-penalty-pulse'
                                    : isMinInRow
                                    ? 'bg-slate-800 text-cyan-300 border-cyan-700/50'
                                    : 'bg-slate-900 text-slate-300 border-slate-800'
                                )}
                              >
                                ₹{cost}
                              </div>
                            </td>
                          );
                        })}
                        <td className="p-2 font-mono font-semibold text-amber-300">
                          {currentPreset.supplies[rIdx]}
                        </td>
                        <td
                          className={clsx(
                            'p-2 font-mono font-bold border-l border-slate-800',
                            isMaxRow
                              ? 'text-emerald-300 bg-emerald-900/40 text-sm font-extrabold'
                              : 'text-slate-300'
                          )}
                        >
                          <div className="flex flex-col items-center">
                            <span>₹{rowPens[rIdx].penalty}</span>
                            <span className="text-[10px] text-slate-400 font-normal">
                              ({rowPens[rIdx].min2} - {rowPens[rIdx].min1})
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}

                  {/* Demand Row */}
                  <tr className="border-b border-slate-800 text-slate-300 bg-slate-900/30">
                    <td className="p-2.5 text-left font-semibold text-amber-300">Demand</td>
                    {currentPreset.demands.map((dm, dmIdx) => (
                      <td key={dmIdx} className="p-2 font-mono font-semibold text-amber-300">
                        {dm}
                      </td>
                    ))}
                    <td className="p-2 font-mono font-bold text-slate-400">
                      ∑ {currentPreset.supplies.reduce((a, b) => a + b, 0)}
                    </td>
                    <td className="p-2 bg-slate-900/50 border-l border-slate-800 text-slate-500 text-xs">
                      —
                    </td>
                  </tr>

                  {/* Column Penalty Row */}
                  <tr className="bg-cyan-950/20 text-cyan-300 font-mono font-bold">
                    <td className="p-2.5 text-left text-cyan-400 font-bold">
                      Col Penalty (Pⱼ)
                    </td>
                    {colPens.map((cp, cIdx) => {
                      const isMaxCol = maxType === 'col' && maxIdx === cIdx;
                      return (
                        <td
                          key={cIdx}
                          className={clsx(
                            'p-2 text-center border-t border-slate-800',
                            isMaxCol
                              ? 'bg-emerald-900/40 text-emerald-300 font-extrabold text-sm'
                              : 'text-slate-300'
                          )}
                        >
                          <div className="flex flex-col items-center">
                            <span>₹{cp.penalty}</span>
                            <span className="text-[10px] text-slate-400 font-normal">
                              ({cp.min2} - {cp.min1})
                            </span>
                          </div>
                        </td>
                      );
                    })}
                    <td className="p-2 text-slate-500 text-xs">—</td>
                    <td className="p-2 text-emerald-400 font-bold text-xs bg-emerald-950/40 border-l border-slate-800">
                      MAX = ₹{maxP}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Analysis Callout Card */}
            <div className="p-4 rounded-xl bg-slate-800/60 border border-emerald-800/40 flex flex-col space-y-3">
              <div className="flex items-center space-x-2 text-emerald-300 font-semibold text-sm">
                <span>🎯</span>
                <span>VAM Step 1 Allocation Analysis for this Preset:</span>
              </div>
              <div className="text-xs sm:text-sm text-slate-300 flex flex-col space-y-1.5">
                <p>
                  1. <strong>Maximum Penalty:</strong> Evaluated across all rows and columns is <span className="font-mono text-emerald-400 font-bold">₹{maxP}</span> located at <span className="font-semibold text-white">{maxType === 'row' ? `Row ${maxIdx + 1} (${currentPreset.origins[maxIdx]})` : `Column ${maxIdx + 1} (${currentPreset.destinations[maxIdx]})`}</span>.
                </p>
                <p>
                  2. <strong>Target Cell Selection:</strong> Inside the winning {maxType}, find the cell with the absolute lowest unit cost (<span className="text-emerald-400 font-mono font-bold">highlighted in bright green</span>).
                </p>
                <p>
                  3. <strong>Immediate Capacity Allocation:</strong> Allocate <span className="font-mono text-amber-300 font-bold">x = min(Supply, Demand)</span> to this target cell. Then adjust remaining balances and strike out the exhausted line.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: SVG Diagram & Algorithmic Architecture */}
        <section
          ref={(el) => (sectionRefs.current[4] = el)}
          data-index="4"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-violet-600/20 text-violet-400 font-bold text-sm">
                05
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Penalty Calculation Architecture & Decision Flowchart
              </h2>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              The diagram below visualizes the cyclical engine of Vogel's Approximation Method: from row/column extraction to penalty sorting, regret maximization, and capacity decrementing.
            </p>

            {/* Semantic Animated SVG Flowchart */}
            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 820 420"
                className="w-full max-w-4xl h-auto select-none"
                style={{ minWidth: '680px' }}
              >
                <defs>
                  <linearGradient id="gradEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#059669" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                  <linearGradient id="gradCyan" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0891b2" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                  <linearGradient id="gradViolet" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7c3aed" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                  <linearGradient id="gradAmber" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#d97706" />
                    <stop offset="100%" stopColor="#f59e0b" />
                  </linearGradient>
                  <filter id="shadowBox" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.5" />
                  </filter>
                </defs>

                {/* Stage 1: Active Matrix Extraction */}
                <g filter="url(#shadowBox)">
                  <rect x="30" y="40" width="210" height="90" rx="12" fill="#1e293b" stroke="#334155" strokeWidth="2" />
                  <rect x="30" y="40" width="210" height="6" rx="3" fill="url(#gradCyan)" />
                  <text x="135" y="75" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">
                    STAGE 1: Matrix Scan
                  </text>
                  <text x="135" y="98" fill="#94a3b8" fontSize="11" textAnchor="middle">
                    Identify unallocated cells
                  </text>
                  <text x="135" y="115" fill="#cbd5e1" fontSize="10" fontFamily="monospace" textAnchor="middle">
                    Active A = &#123;(i,j) : Sᵢ &gt; 0, Dⱼ &gt; 0&#125;
                  </text>
                </g>

                {/* Connector 1 &rarr; 2 */}
                <path d="M 240 85 L 290 85" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 4">
                  <animate attributeName="stroke-dashoffset" values="8;0" dur="1.2s" repeatCount="indefinite" />
                </path>
                <polygon points="290,85 282,80 282,90" fill="#38bdf8" />

                {/* Stage 2: Dual Penalty Computation */}
                <g filter="url(#shadowBox)">
                  <rect x="300" y="30" width="230" height="110" rx="12" fill="#1e293b" stroke="#334155" strokeWidth="2" />
                  <rect x="300" y="30" width="230" height="6" rx="3" fill="url(#gradEmerald)" />
                  <text x="415" y="65" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">
                    STAGE 2: Line Penalties
                  </text>
                  <text x="415" y="88" fill="#94a3b8" fontSize="11" textAnchor="middle">
                    Pᵢ = c_(i,2) - c_(i,1) (Row)
                  </text>
                  <text x="415" y="108" fill="#94a3b8" fontSize="11" textAnchor="middle">
                    Pⱼ = c_(2,j) - c_(1,j) (Col)
                  </text>
                  <text x="415" y="128" fill="#10b981" fontSize="10" fontWeight="bold" textAnchor="middle">
                    Evaluate m rows + n cols
                  </text>
                </g>

                {/* Connector 2 &rarr; 3 */}
                <path d="M 530 85 L 580 85" stroke="#34d399" strokeWidth="2" strokeDasharray="4 4">
                  <animate attributeName="stroke-dashoffset" values="8;0" dur="1.2s" repeatCount="indefinite" />
                </path>
                <polygon points="580,85 572,80 572,90" fill="#34d399" />

                {/* Stage 3: Maximum Penalty Selection */}
                <g filter="url(#shadowBox)">
                  <rect x="590" y="40" width="200" height="90" rx="12" fill="#1e293b" stroke="#334155" strokeWidth="2" />
                  <rect x="590" y="40" width="200" height="6" rx="3" fill="url(#gradViolet)" />
                  <text x="690" y="75" fill="#a78bfa" fontSize="13" fontWeight="bold" textAnchor="middle">
                    STAGE 3: Max Penalty
                  </text>
                  <text x="690" y="98" fill="#cbd5e1" fontSize="11" fontFamily="monospace" textAnchor="middle">
                    L* = argmax(Pᵢ, Pⱼ)
                  </text>
                  <text x="690" y="116" fill="#f43f5e" fontSize="10" fontWeight="bold" textAnchor="middle">
                    Identifies Highest Regret Line
                  </text>
                </g>

                {/* Vertical Connector 3 &rarr; 4 */}
                <path d="M 690 130 L 690 220" stroke="#a78bfa" strokeWidth="2" strokeDasharray="4 4">
                  <animate attributeName="stroke-dashoffset" values="8;0" dur="1.2s" repeatCount="indefinite" />
                </path>
                <polygon points="690,220 685,212 695,212" fill="#a78bfa" />

                {/* Stage 4: Allocation in Chosen Line */}
                <g filter="url(#shadowBox)">
                  <rect x="570" y="230" width="230" height="100" rx="12" fill="#1e293b" stroke="#334155" strokeWidth="2" />
                  <rect x="570" y="230" width="230" height="6" rx="3" fill="url(#gradAmber)" />
                  <text x="685" y="265" fill="#fbbf24" fontSize="13" fontWeight="bold" textAnchor="middle">
                    STAGE 4: Min Cost Allocation
                  </text>
                  <text x="685" y="288" fill="#94a3b8" fontSize="11" textAnchor="middle">
                    Pick min(c_kl) inside line L*
                  </text>
                  <text x="685" y="308" fill="#38bdf8" fontSize="10" fontFamily="monospace" textAnchor="middle">
                    x_kl = min(S_k, D_l)
                  </text>
                </g>

                {/* Connector 4 &rarr; 5 */}
                <path d="M 570 280 L 510 280" stroke="#fbbf24" strokeWidth="2" strokeDasharray="4 4">
                  <animate attributeName="stroke-dashoffset" values="8;0" dur="1.2s" repeatCount="indefinite" />
                </path>
                <polygon points="510,280 518,275 518,285" fill="#fbbf24" />

                {/* Stage 5: Balance Decrement & Cross-Out */}
                <g filter="url(#shadowBox)">
                  <rect x="270" y="230" width="230" height="100" rx="12" fill="#1e293b" stroke="#334155" strokeWidth="2" />
                  <rect x="270" y="230" width="230" height="6" rx="3" fill="url(#gradEmerald)" />
                  <text x="385" y="265" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">
                    STAGE 5: Update Capacities
                  </text>
                  <text x="385" y="288" fill="#cbd5e1" fontSize="10" fontFamily="monospace" textAnchor="middle">
                    S_k ← S_k - x_kl, D_l ← D_l - x_kl
                  </text>
                  <text x="385" y="308" fill="#94a3b8" fontSize="11" textAnchor="middle">
                    Cross out exhausted line
                  </text>
                </g>

                {/* Decision Branch & Loop Back */}
                <path d="M 270 280 L 140 280 L 140 140" stroke="#64748b" strokeWidth="2" strokeDasharray="5 5">
                  <animate attributeName="stroke-dashoffset" values="10;0" dur="1.5s" repeatCount="indefinite" />
                </path>
                <polygon points="140,140 135,148 145,148" fill="#64748b" />
                <rect x="150" y="200" width="100" height="30" rx="6" fill="#0f172a" stroke="#475569" />
                <text x="200" y="220" fill="#94a3b8" fontSize="10" textAnchor="middle">
                  Repeat if active &gt; 0
                </text>
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 6: Four Real-World Bengal Case Studies */}
        <section
          ref={(el) => (sectionRefs.current[5] = el)}
          data-index="5"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 font-bold text-sm">
                06
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Real-World Bengal Logistics Case Studies
              </h2>
            </div>

            <p className="text-slate-300 text-sm">
              Explore four operational scenarios across West Bengal illustrating how penalty analysis prevents costly allocation missteps in foundry operations, pharmaceutical cold-chains, retail distribution, and university publishing.
            </p>

            {/* Case Study Tab Buttons */}
            <div className="flex flex-wrap gap-2">
              {realWorldCaseStudies.map((cs, idx) => (
                <button
                  key={cs.id}
                  onClick={() => setSelectedExample(idx)}
                  className={clsx(
                    'px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 border text-left flex items-center gap-2',
                    selectedExample === idx
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/80 shadow-lg shadow-amber-950/40'
                      : 'bg-slate-800/60 text-slate-400 border-slate-700 hover:text-slate-200 hover:bg-slate-800'
                  )}
                &gt;
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                  {cs.title.split('(')[0]}
                </button>
              ))}
            </div>

            {/* Selected Case Study Details */}
            {(() => {
              const cs = realWorldCaseStudies[selectedExample];
              return (
                <div className="p-6 rounded-xl bg-slate-950/90 border border-slate-800 flex flex-col space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-3 gap-1">
                    <h3 className="text-lg font-bold text-white">{cs.title}</h3>
                    <span className="text-xs text-amber-400 font-mono bg-amber-950/60 px-3 py-1 rounded-full border border-amber-800/60">
                      Lead: {cs.manager}
                    </span>
                  </div>

                  {/* Tableau Representation */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-center border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400">
                          <th className="p-2 text-left font-semibold">Origin / Dest</th>
                          {cs.destinations.map((d, dIdx) => (
                            <th key={dIdx} className="p-2 font-semibold text-cyan-300">
                              {d.name}
                            </th>
                          ))}
                          <th className="p-2 font-semibold text-amber-300">Supply</th>
                          <th className="p-2 font-semibold text-emerald-400 bg-emerald-950/30 border-l border-slate-800">
                            Row Penalty
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {cs.matrix.map((r, rIdx) => (
                          <tr key={rIdx} className="border-b border-slate-800/60">
                            <td className="p-2 text-left font-medium text-slate-200">
                              {cs.origins[rIdx].name}
                            </td>
                            {r.map((cost, cIdx) => (
                              <td key={cIdx} className="p-2 font-mono font-bold text-slate-300">
                                <span className="px-2 py-1 bg-slate-900 rounded border border-slate-800 inline-block">
                                  ₹{cost}
                                </span>
                              </td>
                            ))}
                            <td className="p-2 font-mono font-semibold text-amber-300">
                              {cs.origins[rIdx].supply}
                            </td>
                            <td className="p-2 font-mono font-semibold text-emerald-300 border-l border-slate-800">
                              {cs.rowPenalties[rIdx]}
                            </td>
                          </tr>
                        ))}
                        <tr className="bg-cyan-950/20">
                          <td className="p-2 text-left font-semibold text-cyan-400">Col Penalty</td>
                          {cs.colPenalties.map((cp, cIdx) => (
                            <td key={cIdx} className="p-2 font-mono font-semibold text-cyan-300">
                              {cp}
                            </td>
                          ))}
                          <td className="p-2 text-slate-500">—</td>
                          <td className="p-2 text-emerald-400 font-bold border-l border-slate-800 text-xs">
                            {cs.maxPenaltyLocation.split('with')[0]}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Strategic Insights */}
                  <div className="flex flex-col space-y-3 text-xs sm:text-sm">
                    <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 flex flex-col space-y-1">
                      <span className="text-amber-400 font-semibold">⚡ Max Penalty Identified:</span>
                      <p className="text-slate-300">{cs.maxPenaltyLocation}</p>
                    </div>
                    <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 flex flex-col space-y-1">
                      <span className="text-emerald-400 font-semibold">🚚 Action Taken:</span>
                      <p className="text-slate-300">{cs.actionTaken}</p>
                    </div>
                    <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 flex flex-col space-y-1">
                      <span className="text-cyan-400 font-semibold">💰 Financial Savings:</span>
                      <p className="text-slate-300">{cs.financialImpact}</p>
                    </div>
                    <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 flex flex-col space-y-1">
                      <span className="text-violet-400 font-semibold">💡 Key Managerial Lesson:</span>
                      <p className="text-slate-300">{cs.summary}</p>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </section>

        {/* SECTION 7: Edge Cases & Special Conditions */}
        <section
          ref={(el) => (sectionRefs.current[6] = el)}
          data-index="6"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 font-bold text-sm">
                07
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Penalty Edge Cases & Tricky Scenarios
              </h2>
            </div>

            <div className="flex flex-col space-y-4">
              {/* Edge Case 1: Identical lowest costs */}
              <div className="p-5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-2">
                <span className="text-indigo-300 font-semibold text-sm sm:text-base">
                  Case 1: Multiple Identical Minimum Costs in a Row or Column
                </span>
                <p className="text-xs sm:text-sm text-slate-300">
                  If the costs in a row are <span className="font-mono text-emerald-400">[₹4, ₹12, ₹4, ₹9]</span>, the lowest cost is ₹4 and the second-lowest cost is also ₹4.
                </p>
                <div className="p-3 bg-slate-950 rounded-lg font-mono text-xs text-indigo-300">
                  Sorted: [₹4, ₹4, ₹9, ₹12] ➔ Penalty = c_(2) - c_(1) = ₹4 - ₹4 = ₹0
                </div>
                <p className="text-xs text-slate-400">
                  <strong>Interpretation:</strong> A penalty of ₹0 means there is zero immediate financial regret, as an alternative route of the exact same rate is readily available.
                </p>
              </div>

              {/* Edge Case 2: Only one active cell remaining */}
              <div className="p-5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-2">
                <span className="text-cyan-300 font-semibold text-sm sm:text-base">
                  Case 2: Only One Active Cell Left in a Line
                </span>
                <p className="text-xs sm:text-sm text-slate-300">
                  When other rows/columns are exhausted, a line may contain only a single unallocated cell.
                </p>
                <div className="p-3 bg-slate-950 rounded-lg font-mono text-xs text-cyan-300">
                  Single element left: c_13 = ₹8 ➔ Mark penalty as '—' (or treat as forced assignment)
                </div>
                <p className="text-xs text-slate-400">
                  <strong>Interpretation:</strong> Without a second candidate route to compare, no penalty gap exists; the remaining supply/demand must be assigned to this final cell.
                </p>
              </div>

              {/* Edge Case 3: Ties in Maximum Penalty */}
              <div className="p-5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-2">
                <span className="text-amber-300 font-semibold text-sm sm:text-base">
                  Case 3: Tie-Breaking Hierarchy for Maximum Penalty
                </span>
                <p className="text-xs sm:text-sm text-slate-300">
                  If Row 1 and Column 3 both share the highest penalty (e.g. both have <span className="font-mono text-amber-400">P = ₹8</span>):
                </p>
                <div className="flex flex-col space-y-1.5 pl-2 text-xs text-slate-300">
                  <div className="flex items-start space-x-2">
                    <span className="text-amber-400 font-bold">1. Primary Rule:</span>
                    <span>Choose the tied line that contains the <strong>smaller minimum unit cost</strong> min(cᵢⱼ).</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-amber-400 font-bold">2. Secondary Rule:</span>
                    <span>If minimum unit costs are also equal, choose the cell that accommodates the <strong>larger allocation quantity</strong> min(Sᵢ, Dⱼ).</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-amber-400 font-bold">3. Tertiary Rule:</span>
                    <span>If still tied, select arbitrarily.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: Method Comparison */}
        <section
          ref={(el) => (sectionRefs.current[7] = el)}
          data-index="7"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-600/20 text-teal-400 font-bold text-sm">
                08
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Comprehensive Method Comparison: NWCR vs Matrix Minima vs VAM
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-300 bg-slate-950/60">
                    <th className="p-3 font-semibold">Evaluation Criteria</th>
                    <th className="p-3 font-semibold text-rose-300">North-West Corner (NWCR)</th>
                    <th className="p-3 font-semibold text-amber-300">Matrix Minima (Least Cost)</th>
                    <th className="p-3 font-semibold text-emerald-300">VAM (Penalty Method)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="p-3 font-medium text-white">Selection Engine</td>
                    <td className="p-3 text-slate-400">Position index (1, 1) top-left</td>
                    <td className="p-3 text-slate-400">Global minimum cell min(cᵢⱼ)</td>
                    <td className="p-3 text-emerald-300 font-semibold">Maximum line penalty max(Pᵢ, Pⱼ)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-white">Cost Awareness</td>
                    <td className="p-3 text-rose-400">Completely Blind (0% awareness)</td>
                    <td className="p-3 text-amber-400">Single-cell greedy (Local only)</td>
                    <td className="p-3 text-emerald-400">Regret-aware (Global penalty gradient)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-white">Initial Solution Quality</td>
                    <td className="p-3 text-slate-400">Poor (Far from optimal)</td>
                    <td className="p-3 text-slate-400">Moderate (15-30% off optimal)</td>
                    <td className="p-3 text-emerald-300 font-bold">Excellent (0-5% off optimal)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-white">MODI Iterations Needed</td>
                    <td className="p-3 text-slate-400">4 to 10+ iterations</td>
                    <td className="p-3 text-slate-400">2 to 5 iterations</td>
                    <td className="p-3 text-emerald-300 font-semibold">0 to 2 iterations (often optimal)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-white">Hand Calculation Speed</td>
                    <td className="p-3 text-emerald-400">Fastest (no cost sorting)</td>
                    <td className="p-3 text-slate-400">Moderate (scan for min)</td>
                    <td className="p-3 text-slate-400">Requires line-by-line differences</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 9: Beginner Pitfalls */}
        <section
          ref={(el) => (sectionRefs.current[8] = el)}
          data-index="8"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-600/20 text-rose-400 font-bold text-sm">
                09
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Common Beginner Mistakes & How to Avoid Them
              </h2>
            </div>

            <div className="flex flex-col space-y-3">
              {[
                {
                  trap: 'Trap 1: Calculating Range (Max - Min) Instead of Penalty',
                  danger: 'Subtracting the largest cost from the smallest cost across a line.',
                  fix: 'Penalty is ALWAYS the 2nd smallest minus 1st smallest (c_(2) - c_(1)). It measures immediate slip, not total spread.',
                },
                {
                  trap: 'Trap 2: Forgetting to Recalculate Penalties After Cross-Out',
                  danger: 'Using the initial Step 1 penalties for subsequent allocation steps.',
                  fix: 'Crossing out a row removes candidates from all intersecting columns. You MUST recalculate new penalties in each iteration.',
                },
                {
                  trap: 'Trap 3: Picking the Highest Cost Cell in the Max Penalty Line',
                  danger: 'Confusing the maximum penalty line with the cell allocation choice.',
                  fix: 'First select the line with the HIGHEST penalty; then inside that line, pick the cell with the LOWEST unit cost!',
                },
                {
                  trap: 'Trap 4: Skipping ₹0 Cells in Unbalanced Dummy Lines',
                  danger: 'Ignoring ₹0 dummy entries during penalty calculations.',
                  fix: 'Dummy cells are valid active routes. A dummy row makes ₹0 the smallest cost in every column it spans.',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1.5 hover:border-rose-800/50 transition-colors"
                >
                  <span className="text-rose-400 font-semibold text-sm">{item.trap}</span>
                  <p className="text-xs text-slate-300"><strong>The Error:</strong> {item.danger}</p>
                  <p className="text-xs text-emerald-400"><strong>The Fix:</strong> {item.fix}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 10: Guided Hints Section */}
        <section
          ref={(el) => (sectionRefs.current[9] = el)}
          data-index="9"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 font-bold text-sm">
                10
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Guided Hints for Conceptual Mastery
              </h2>
            </div>

            <div className="flex flex-col space-y-3">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-amber-300 font-semibold text-sm">💡 Think about…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Think about what happens to a column's penalty when the factory offering its cheapest rate runs out of stock. Does the destination's regret increase or decrease for remaining suppliers?
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how a single extreme outlier cost (e.g. ₹80 in a row of ₹4, ₹6, ₹80) does NOT alter the initial penalty because only the two lowest entries (₹6 - ₹4 = ₹2) determine the immediate decision gradient.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-emerald-300 font-semibold text-sm">🧪 Try changing this…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Try swapping two unit costs in Preset B in the interactive explorer above. Observe which line takes over as the maximum penalty and how the initial allocation shifts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 11: Best Practices & Pro Tips */}
        <section
          ref={(el) => (sectionRefs.current[10] = el)}
          data-index="10"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                11
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Professional Best Practices & Classroom Tips
              </h2>
            </div>

            <div className="flex flex-col space-y-3">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-emerald-300 font-semibold text-sm">1. Explicit Margin Annotations</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Always write row penalties in bracketed columns to the right (e.g. <span className="font-mono text-white">[P₁] [P₂] [P₃]</span>) and column penalties beneath the table. Cross out old penalties with a single diagonal slash when refreshing.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">2. Circle the Winning Penalty</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  In every iteration, draw a clear circle around the global maximum penalty value. This provides an unambiguous audit trail for examiners and colleagues.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-violet-300 font-semibold text-sm">3. Basis Count Sanity Verification</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Before calculating total cost Z, count all allocated cells. Confirm that total basic allocations equal exactly <span className="font-mono text-emerald-400">m + n - 1</span> without forming closed loops.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 12: Mini Checklist */}
        <section
          ref={(el) => (sectionRefs.current[11] = el)}
          data-index="11"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                12
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Student Revision Checklist (Concept of Penalty)
              </h2>
            </div>

            <div className="flex flex-col space-y-2.5">
              {[
                { title: 'Balance Verified', desc: 'Checked ∑ Supply = ∑ Demand (or introduced ₹0 dummy line)' },
                { title: 'Row Penalties Calculated', desc: 'Pᵢ = c_(i,2) - c_(i,1) for every active supply origin' },
                { title: 'Column Penalties Calculated', desc: 'Pⱼ = c_(2,j) - c_(1,j) for every active demand destination' },
                { title: 'Global Max Penalty Selected', desc: 'Located the line corresponding to max { Pᵢ, Pⱼ }' },
                { title: 'Lowest Cost Cell Targeted', desc: 'Identified the minimum cost cell within that winning line' },
                { title: 'Maximum Feasible Allocation', desc: 'Allocated x_kl = min(S_k, D_l) to the target cell' },
                { title: 'Capacities Updated & Line Crossed Out', desc: 'Subtracted allocated units and struck out exhausted row or column' },
                { title: 'Penalties Refreshed', desc: 'Recomputed all line differences for the reduced sub-tableau' },
                { title: 'm + n - 1 Basic Cells Verified', desc: 'Confirmed full basis count and non-degeneracy condition' },
                { title: 'Total Initial Cost Computed', desc: 'Evaluated Z = ∑ ∑ cᵢⱼ · xᵢⱼ in Indian Rupees (₹)' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60 flex items-start space-x-3 hover:bg-slate-800/70 transition-colors"
                >
                  <span className="text-emerald-400 text-base mt-0.5">✅</span>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200">{item.title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 13: Teacher's Note */}
        <section className="flex flex-col space-y-6">
          <Teacher
            note={
              "When I teach Vogel's Approximation Method to my students in Barrackpore and Kolkata, I emphasize to Mamata, Mahima, Debangshu, Susmita, and Abhronila that VAM is not just another mechanical table algorithm—it is the embodiment of economic regret theory! In real-world freight scheduling across West Bengal (whether moving foundry steel from Ichapur, cold-chain vaccines to Howrah, or books to Jadavpur), a naive greedy approach that grabs the ₹2 rate often leaves a distant warehouse facing a crippling ₹50 route later. The Penalty method acts like an intelligent radar: it measures how badly you will suffer if you miss your first choice. Remember my golden rule: always find the highest penalty line first, but allocate to its lowest cost cell. Master this difference, and your initial basic feasible solutions will routinely be within 1% to 2% of the global optimum!"
            }
          />
        </section>

        {/* SECTION 14: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Concept of Penalty FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 15: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Concept of Penalty (Vogel's Approximation Method Foundation)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic1_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic0;
