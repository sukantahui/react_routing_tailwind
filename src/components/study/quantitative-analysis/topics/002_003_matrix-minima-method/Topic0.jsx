// Topic0.jsx
import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic0_files/topic0_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic0_files/topic0_note.txt?raw';

const Topic0 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [hoveredCell, setHoveredCell] = useState(null);
  const sectionRefs = useRef([]);

  // Intersection Observer for scroll tracking
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

  const realWorldExamples = [
    {
      id: 'fasteners',
      title: '1. Fasteners Distribution (Kolkata & Barrackpore)',
      manager: 'Debangshu (Logistics Operations Lead)',
      origins: [
        { name: 'Barrackpore Plant (S1)', supply: 50 },
        { name: 'Ichapur Foundry (S2)', supply: 70 },
      ],
      destinations: [
        { name: 'Kolkata Hub (D1)', demand: 40 },
        { name: 'Jadavpur Depot (D2)', demand: 50 },
        { name: 'Salt Lake Center (D3)', demand: 30 },
      ],
      matrix: [
        [4, 8, 6],
        [7, 3, 5],
      ],
      allocations: [
        { step: 1, cell: 'Ichapur → Jadavpur', rate: '₹3', qty: 50, subtotal: '₹150', note: 'Cheapest rate in table; satisfies Jadavpur fully' },
        { step: 2, cell: 'Barrackpore → Kolkata', rate: '₹4', qty: 40, subtotal: '₹160', note: 'Next cheapest; satisfies Kolkata fully' },
        { step: 3, cell: 'Ichapur → Salt Lake', rate: '₹5', qty: 20, subtotal: '₹100', note: 'Exhausts remaining Ichapur supply (20 units)' },
        { step: 4, cell: 'Barrackpore → Salt Lake', rate: '₹6', qty: 10, subtotal: '₹60', note: 'Fulfills final Salt Lake requirement' },
      ],
      totalCost: '₹470',
      nwcrCost: '₹670',
      savings: '₹200 (30% immediate savings)',
      lesson: 'Prioritizing the ₹3/unit route directly cut the freight bill by 30% compared to arbitrary top-left routing.',
    },
    {
      id: 'fmcg',
      title: '2. Bengal FMCG Packaged Goods Delivery',
      manager: 'Mamata (Regional Supply Chain Director)',
      origins: [
        { name: 'Kolkata Central (S1)', supply: 60 },
        { name: 'Barrackpore Depot (S2)', supply: 80 },
        { name: 'Ichapur Warehouse (S3)', supply: 60 },
      ],
      destinations: [
        { name: 'Jadavpur Retail (D1)', demand: 80 },
        { name: 'Howrah Hub (D2)', demand: 70 },
        { name: 'Barasat Mart (D3)', demand: 50 },
      ],
      matrix: [
        [2, 5, 7],
        [6, 3, 4],
        [5, 8, 1],
      ],
      allocations: [
        { step: 1, cell: 'Ichapur → Barasat', rate: '₹1', qty: 50, subtotal: '₹50', note: 'Lowest cost ₹1/unit; fulfills Barasat completely' },
        { step: 2, cell: 'Kolkata → Jadavpur', rate: '₹2', qty: 60, subtotal: '₹120', note: 'Lowest rate ₹2/unit; exhausts Kolkata inventory' },
        { step: 3, cell: 'Barrackpore → Howrah', rate: '₹3', qty: 70, subtotal: '₹210', note: 'Lowest remaining rate ₹3; satisfies Howrah' },
        { step: 4, cell: 'Ichapur → Jadavpur', rate: '₹5', qty: 10, subtotal: '₹50', note: 'Consumes leftover 10 units from Ichapur' },
        { step: 5, cell: 'Barrackpore → Jadavpur', rate: '₹6', qty: 10, subtotal: '₹60', note: 'Completes final 10 units demand for Jadavpur' },
      ],
      totalCost: '₹490',
      nwcrCost: '₹840',
      savings: '₹350 (41.7% cost reduction)',
      lesson: 'Selecting rates ₹1, ₹2, and ₹3 early prevented high-cost shipping to outer retail stores.',
    },
    {
      id: 'medical',
      title: '3. Cold-Chain Medical Oxygen Logistics',
      manager: 'Susmita (Healthcare Logistics Coordinator)',
      origins: [
        { name: 'Kolkata Central Depot (S1)', supply: 100 },
        { name: 'Barrackpore Station (S2)', supply: 150 },
      ],
      destinations: [
        { name: 'Jadavpur Medical (D1)', demand: 120 },
        { name: 'Ichapur General Hospital (D2)', demand: 130 },
      ],
      matrix: [
        [6, 9],
        [11, 5],
      ],
      allocations: [
        { step: 1, cell: 'Barrackpore → Ichapur', rate: '₹5', qty: 130, subtotal: '₹650', note: 'Cheapest medical route; fulfills Ichapur requirement' },
        { step: 2, cell: 'Kolkata → Jadavpur', rate: '₹6', qty: 100, subtotal: '₹600', note: 'Exhausts Kolkata medical buffer' },
        { step: 3, cell: 'Barrackpore → Jadavpur', rate: '₹11', qty: 20, subtotal: '₹220', note: 'Supplies final 20 cylinders to Jadavpur' },
      ],
      totalCost: '₹1,470',
      nwcrCost: '₹2,030',
      savings: '₹560 (27.6% savings)',
      lesson: 'Emergency medical supplies must maintain budget feasibility while satisfying life-critical quotas.',
    },
    {
      id: 'courier',
      title: '4. E-Commerce Parcel Locker Network',
      manager: 'Abhronila & Mahima (Network Optimization Engineers)',
      origins: [
        { name: 'Barrackpore Sort Center (S1)', supply: 40 },
        { name: 'Kolkata Mega Hub (S2)', supply: 60 },
      ],
      destinations: [
        { name: 'Ichapur Smart Locker (D1)', demand: 30 },
        { name: 'Jadavpur Smart Locker (D2)', demand: 40 },
        { name: 'Salt Lake Delivery Point (D3)', demand: 30 },
      ],
      matrix: [
        [8, 4, 9],
        [3, 7, 5],
      ],
      allocations: [
        { step: 1, cell: 'Kolkata → Ichapur', rate: '₹3', qty: 30, subtotal: '₹90', note: 'Direct route selected first' },
        { step: 2, cell: 'Barrackpore → Jadavpur', rate: '₹4', qty: 40, subtotal: '₹160', note: 'Best rate for Barrackpore' },
        { step: 3, cell: 'Kolkata → Salt Lake', rate: '₹5', qty: 30, subtotal: '₹150', note: 'Final remaining demand fulfilled' },
      ],
      totalCost: '₹400',
      nwcrCost: '₹630',
      savings: '₹230 (36.5% savings)',
      lesson: 'Sorting hubs achieve lower dispatch latency and expenditure by coupling low-cost delivery vectors.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 transition-colors duration-300 font-sans">
      {/* Header Banner */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-b border-slate-800/80">
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-blue-500/10 text-blue-400 border border-blue-500/30 mb-4 shadow-sm">
            Quantitative Analysis • Transportation Models • Topic 0
          </span>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white mb-4 bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
            Least-Cost Allocation Concept
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
            Master the economic principles, greedy heuristics, and step-by-step matrix evaluation rules of the Matrix Minima Method for constructing near-optimal Initial Basic Feasible Solutions.
          </p>
        </div>
      </div>

      {/* Main Container - Stacked Vertical Sections */}
      <div className="max-w-4xl mx-auto px-4 py-10 sm:px-6 lg:px-8 flex flex-col space-y-12">
        
        {/* Section 1: Conceptual Foundations */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 font-bold text-sm">
                01
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Foundations & The Economic Philosophy
              </h2>
            </div>

            <p className="text-slate-300 leading-relaxed text-base">
              The <strong className="text-blue-400 font-semibold">Least-Cost Allocation Concept</strong> (also known as the <strong className="text-indigo-400 font-semibold">Matrix Minima Method</strong>) is an economic greedy heuristic designed to generate an Initial Basic Feasible Solution (IBFS) for transportation linear programming models.
            </p>

            <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-slate-900 rounded-xl border border-blue-800/40 flex flex-col space-y-2">
              <div className="flex items-center space-x-2 text-blue-400 font-semibold text-sm">
                <span>💡</span>
                <span>Core Engineering Insight</span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                In classical operations research, shipping items along an arbitrary geometric path (like the North-West Corner Rule) creates massive financial waste. The Matrix Minima approach acts like an astute logistics planner: it surveys the <em>entire global cost grid</em> and commits maximum cargo to the lowest rate first, aggressively suppressing overall shipping cost right from Step 1.
              </p>
            </div>

            <div className="flex flex-col space-y-4">
              <h3 className="text-lg font-semibold text-slate-200">The 3 Fundamental Feasibility Pillars</h3>
              
              <div className="flex flex-col space-y-3">
                <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:bg-slate-800/90 transition-all duration-200 flex flex-col space-y-1">
                  <span className="text-emerald-400 font-semibold text-sm">1. Full Supply & Demand Fulfillment (Feasibility)</span>
                  <p className="text-slate-400 text-xs sm:text-sm">
                    Every factory origin must exhaust its exact stock <span className="text-slate-200 font-mono">∑ⱼ xᵢⱼ = Sᵢ</span>, and every retail destination must receive its exact requirement <span className="text-slate-200 font-mono">∑ᵢ xᵢⱼ = Dⱼ</span> with zero negative allocations (<span className="text-slate-200 font-mono">xᵢⱼ ≥ 0</span>).
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:bg-slate-800/90 transition-all duration-200 flex flex-col space-y-1">
                  <span className="text-blue-400 font-semibold text-sm">2. Exact Basic Variable Count (m + n - 1 Rule)</span>
                  <p className="text-slate-400 text-xs sm:text-sm">
                    For an <span className="font-mono text-slate-200">m × n</span> matrix, a valid basis must possess exactly <span className="font-mono text-blue-300">m + n - 1</span> non-negative allocated cells forming an acyclic spanning tree across the transportation network.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:bg-slate-800/90 transition-all duration-200 flex flex-col space-y-1">
                  <span className="text-amber-400 font-semibold text-sm">3. Greedily Minimized Objective Value</span>
                  <p className="text-slate-400 text-xs sm:text-sm">
                    The starting objective value <span className="text-slate-200 font-mono">Z = ∑ᵢ ∑ⱼ (cᵢⱼ · xᵢⱼ)</span> is kept as low as possible, drastically reducing the subsequent MODI (Modified Distribution) optimization iterations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Mathematical Formulation */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Mathematical Model & Allocation Rules
              </h2>
            </div>

            <p className="text-slate-300 leading-relaxed text-base">
              The transportation linear program seeks to distribute homogeneous goods from <span className="text-slate-100 font-mono">m</span> supply points to <span className="text-slate-100 font-mono">n</span> demand sinks at minimum total freight cost.
            </p>

            {/* Formula Block */}
            <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-sm text-slate-300 flex flex-col space-y-3">
              <div className="text-indigo-400 font-semibold">Mathematical Optimization Problem:</div>
              <div className="pl-3 border-l-2 border-indigo-500 flex flex-col space-y-1">
                <span className="text-white font-bold">Minimize Z = ∑ᵢ₌₁ᵐ ∑ⱼ₌₁ⁿ (cᵢⱼ · xᵢⱼ)</span>
                <span className="text-slate-400 text-xs">Where cᵢⱼ = unit shipping cost in ₹, xᵢⱼ = allocated volume</span>
              </div>
              <div className="text-xs text-slate-400 pt-2 border-t border-slate-900">
                Subject to Constraints:
                <br />
                • Supply Balance: <span className="text-slate-200">{"∑ⱼ₌₁ⁿ xᵢⱼ = Sᵢ"}</span> {"for all i ∈ {1, ..., m}"}
                <br />
                • Demand Balance: <span className="text-slate-200">{"∑ᵢ₌₁ᵐ xᵢⱼ = Dⱼ"}</span> {"for all j ∈ {1, ..., n}"}
                <br />
                • Conservation Law: <span className="text-slate-200">{"∑ᵢ₌₁ᵐ Sᵢ = ∑ⱼ₌₁ⁿ Dⱼ"}</span> (Total Supply = Total Demand)
              </div>
            </div>

            {/* Step-by-Step Rule Cards */}
            <div className="flex flex-col space-y-3">
              <h3 className="text-lg font-semibold text-slate-200">The 4-Step Algorithmic Pipeline</h3>

              <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-700/50 flex flex-col space-y-2 hover:bg-slate-800/70 transition-all duration-200">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-blue-400 text-sm">Step 1: Cell Search & Selection</span>
                  <span className="text-xs px-2 py-0.5 bg-blue-950 text-blue-300 rounded border border-blue-800">Greedy Scan</span>
                </div>
                <p className="text-slate-300 text-xs sm:text-sm">
                  {"Identify active cell "}<span className="font-mono text-cyan-300">(k, l)</span>{" with absolute minimum unit cost: "}<span className="font-mono text-slate-200">{"c_kl = min { c_ij | S_i > 0, D_j > 0 }"}</span>.
                </p>
              </div>

              <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-700/50 flex flex-col space-y-2 hover:bg-slate-800/70 transition-all duration-200">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-emerald-400 text-sm">Step 2: Capacity Allocation</span>
                  <span className="text-xs px-2 py-0.5 bg-emerald-950 text-emerald-300 rounded border border-emerald-800">Volume Cap</span>
                </div>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Allocate <span className="font-mono text-cyan-300">x_kl = min(S_k, D_l)</span>. This absorbs the maximum possible capacity without violating inventory limits.
                </p>
              </div>

              <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-700/50 flex flex-col space-y-2 hover:bg-slate-800/70 transition-all duration-200">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-purple-400 text-sm">Step 3: Line Balance Update & Elimination</span>
                  <span className="text-xs px-2 py-0.5 bg-purple-950 text-purple-300 rounded border border-purple-800">State Reduction</span>
                </div>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Compute updated balances: <span className="font-mono text-slate-200">S_k ← S_k - x_kl</span> and <span className="font-mono text-slate-200">D_l ← D_l - x_kl</span>. Cross out exhausted row <span className="font-mono">k</span> (if <span className="font-mono">S_k = 0</span>) or column <span className="font-mono">l</span> (if <span className="font-mono">D_l = 0</span>).
                </p>
              </div>

              <div className="p-4 bg-slate-800/40 rounded-xl border border-slate-700/50 flex flex-col space-y-2 hover:bg-slate-800/70 transition-all duration-200">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-amber-400 text-sm">Step 4: Convergence or Iteration</span>
                  <span className="text-xs px-2 py-0.5 bg-amber-950 text-amber-300 rounded border border-amber-800">Termination Check</span>
                </div>
                <p className="text-slate-300 text-xs sm:text-sm">
                  If all supplies and demands are zero, the process terminates with <span className="font-mono text-slate-200">m + n - 1</span> basic variables. Otherwise, repeat from Step 1 on remaining active cells.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Semantic SVG Visualizer */}
        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          data-index="2"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-600/20 text-cyan-400 font-bold text-sm">
                03
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Concept Map & Matrix Flow
              </h2>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              Hover over the animated nodes in the diagram below to inspect how the Least-Cost heuristic systematically isolates the minimum rate cell, exhausts demand, and eliminates the column to reduce the search space.
            </p>

            {/* Semantic SVG Diagram */}
            <div className="p-4 sm:p-6 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center justify-center">
              <svg
                viewBox="0 0 760 380"
                className="w-full h-auto max-w-2xl select-none"
                aria-label="Least-Cost Matrix Minima Allocation Workflow"
              >
                <defs>
                  <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#1d4ed8" />
                  </linearGradient>
                  <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#047857" />
                  </linearGradient>
                  <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#6d28d9" />
                  </linearGradient>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Background Grid Lines */}
                <path d="M 50 190 H 710" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M 230 70 V 310" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M 530 70 V 310" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />

                {/* Stage 1: Global Scan */}
                <g
                  className="cursor-pointer transition-all duration-300"
                  onMouseEnter={() => setHoveredCell('scan')}
                  onMouseLeave={() => setHoveredCell(null)}
                >
                  <rect
                    x="40"
                    y="110"
                    width="180"
                    height="160"
                    rx="14"
                    fill="#0f172a"
                    stroke={hoveredCell === 'scan' ? '#60a5fa' : '#1e293b'}
                    strokeWidth="2"
                    filter={hoveredCell === 'scan' ? 'url(#glow)' : undefined}
                  />
                  <rect x="55" y="125" width="150" height="28" rx="6" fill="url(#blueGrad)" />
                  <text x="130" y="144" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                    1. Global Cost Scan
                  </text>
                  <text x="60" y="180" fill="#94a3b8" fontSize="11">• Inspect active c_ij</text>
                  <text x="60" y="202" fill="#94a3b8" fontSize="11">• Find absolute min</text>
                  <text x="60" y="224" fill="#38bdf8" fontSize="11" fontWeight="bold">{"c_kl = min { c_ij }"}</text>
                  <text x="60" y="248" fill="#64748b" fontSize="10">e.g. Ichapur→Jadavpur (₹3)</text>
                </g>

                {/* Arrow 1 → 2 */}
                <g>
                  <line x1="225" y1="190" x2="285" y2="190" stroke="#60a5fa" strokeWidth="3" />
                  <polygon points="290,190 280,184 280,196" fill="#60a5fa" />
                  <text x="257" y="178" fill="#93c5fd" fontSize="10" textAnchor="middle">Min Found</text>
                </g>

                {/* Stage 2: Greedy Allocation */}
                <g
                  className="cursor-pointer transition-all duration-300"
                  onMouseEnter={() => setHoveredCell('alloc')}
                  onMouseLeave={() => setHoveredCell(null)}
                >
                  <rect
                    x="290"
                    y="110"
                    width="180"
                    height="160"
                    rx="14"
                    fill="#0f172a"
                    stroke={hoveredCell === 'alloc' ? '#34d399' : '#1e293b'}
                    strokeWidth="2"
                    filter={hoveredCell === 'alloc' ? 'url(#glow)' : undefined}
                  />
                  <rect x="305" y="125" width="150" height="28" rx="6" fill="url(#emeraldGrad)" />
                  <text x="380" y="144" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                    2. Max Permissible
                  </text>
                  <text x="310" y="180" fill="#94a3b8" fontSize="11">• Check Supply S_k</text>
                  <text x="310" y="202" fill="#94a3b8" fontSize="11">• Check Demand D_l</text>
                  <text x="310" y="224" fill="#34d399" fontSize="11" fontWeight="bold">x_kl = min(S_k, D_l)</text>
                  <text x="310" y="248" fill="#64748b" fontSize="10">Assign 50 units @ ₹3</text>
                </g>

                {/* Arrow 2 → 3 */}
                <g>
                  <line x1="475" y1="190" x2="535" y2="190" stroke="#34d399" strokeWidth="3" />
                  <polygon points="540,190 530,184 530,196" fill="#34d399" />
                  <text x="507" y="178" fill="#a7f3d0" fontSize="10" textAnchor="middle">Deduct</text>
                </g>

                {/* Stage 3: Matrix Shrink */}
                <g
                  className="cursor-pointer transition-all duration-300"
                  onMouseEnter={() => setHoveredCell('eliminate')}
                  onMouseLeave={() => setHoveredCell(null)}
                >
                  <rect
                    x="540"
                    y="110"
                    width="180"
                    height="160"
                    rx="14"
                    fill="#0f172a"
                    stroke={hoveredCell === 'eliminate' ? '#a78bfa' : '#1e293b'}
                    strokeWidth="2"
                    filter={hoveredCell === 'eliminate' ? 'url(#glow)' : undefined}
                  />
                  <rect x="555" y="125" width="150" height="28" rx="6" fill="url(#purpleGrad)" />
                  <text x="630" y="144" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                    3. Line Elimination
                  </text>
                  <text x="560" y="180" fill="#94a3b8" fontSize="11">• S_k = S_k - x_kl</text>
                  <text x="560" y="202" fill="#94a3b8" fontSize="11">• D_l = D_l - x_kl</text>
                  <text x="560" y="224" fill="#c084fc" fontSize="11" fontWeight="bold">Cross Exhausted Line</text>
                  <text x="560" y="248" fill="#64748b" fontSize="10">Repeat on Remainder</text>
                </g>

                {/* Top Status Banner inside SVG */}
                <rect x="180" y="30" width="400" height="36" rx="18" fill="#1e293b" stroke="#334155" />
                <text x="380" y="53" fill="#cbd5e1" fontSize="12" textAnchor="middle" fontWeight="bold">
                  Matrix Minima Heuristic Engine: Greedy State Machine
                </text>
              </svg>

              <div className="w-full text-center mt-3 text-xs text-slate-400">
                {hoveredCell === 'scan' && 'Step 1: Identifies the lowest unit shipping cost in active matrix rows and columns.'}
                {hoveredCell === 'alloc' && 'Step 2: Assigns maximum possible physical quantity without generating negative inventory.'}
                {hoveredCell === 'eliminate' && 'Step 3: Deducts allocation from capacities and eliminates satisfied rows or columns.'}
                {!hoveredCell && 'Hover over any card in the diagram to inspect algorithmic details.'}
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Tie-Breaking & Degeneracy */}
        <section
          ref={(el) => (sectionRefs.current[3] = el)}
          data-index="3"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 font-bold text-sm">
                04
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Tie-Breaking Protocols & Degeneracy Prevention
              </h2>
            </div>

            <p className="text-slate-300 leading-relaxed text-base">
              Real-world cost matrices frequently feature duplicate minimum values or simultaneous line exhaustion. The following standard rules ensure consistency and prevent computational stalling.
            </p>

            <div className="flex flex-col space-y-4">
              {/* Tie-breaking rule */}
              <div className="p-5 bg-slate-800/40 rounded-xl border border-slate-700/60 flex flex-col space-y-3">
                <div className="flex items-center space-x-2 text-amber-400 font-semibold text-sm">
                  <span>⚖️</span>
                  <span>Handling Cost Ties (c_ab = c_cd = Minimum Cost)</span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  When two or more cells share the identical minimum rate (e.g., both <span className="font-mono text-amber-300">c₁₂ = ₹3</span> and <span className="font-mono text-amber-300">c₃₄ = ₹3</span>):
                </p>
                <div className="flex flex-col space-y-2 text-xs sm:text-sm text-slate-300 pl-4 border-l-2 border-amber-500/50">
                  <div>
                    <strong className="text-white">Rule 1 (Max Allocation Volume):</strong> Choose the cell with higher allocation capacity <span className="font-mono text-cyan-300">{"max { min(S_a, D_b), min(S_c, D_d) }"}</span>. Moving larger cargo at lowest cost yields greater immediate rupee savings.
                  </div>
                  <div>
                    <strong className="text-white">Rule 2 (Capacity Dominance):</strong> If allocation amounts are also equal, pick the cell associated with the higher remaining line capacity.
                  </div>
                  <div>
                    <strong className="text-white">Rule 3 (Arbitrary Tie-Break):</strong> If completely identical, pick arbitrarily. Feasibility is fully preserved.
                  </div>
                </div>
              </div>

              {/* Degeneracy rule */}
              <div className="p-5 bg-slate-800/40 rounded-xl border border-slate-700/60 flex flex-col space-y-3">
                <div className="flex items-center space-x-2 text-red-400 font-semibold text-sm">
                  <span>⚠️</span>
                  <span>Simultaneous Capacity Exhaustion (Degeneracy Risk)</span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  If <span className="font-mono text-red-300">S_k = D_l</span> simultaneously, a single allocation satisfies both row <span className="font-mono">k</span> and column <span className="font-mono">l</span>.
                </p>
                <div className="p-3 bg-red-950/30 rounded-lg border border-red-900/40 text-xs sm:text-sm text-red-200 leading-relaxed">
                  <strong>Strict Correction Protocol:</strong> Do NOT cross out both row and column simultaneously! Cross out only row <span className="font-mono">k</span>, and mark remaining demand in column <span className="font-mono">l</span> as 0. Then, allocate an infinitesimal basic zero (<span className="font-mono text-white font-bold">ε</span>) to an independent uncrossed cell in column <span className="font-mono">l</span> before crossing it out. This guarantees that total basic allocations remain exactly <span className="font-mono font-bold text-white">m + n - 1</span>.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: 4 Real-World Case Studies */}
        <section
          ref={(el) => (sectionRefs.current[4] = el)}
          data-index="4"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                05
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                4 Real-World Case Studies (Bengal Logistics Corridor)
              </h2>
            </div>

            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              Explore 4 realistic industrial logistics scenarios across Kolkata, Barrackpore, Ichapur, and Jadavpur showcasing how students and practitioners apply the Matrix Minima Method.
            </p>

            {/* Example Selector Tabs */}
            <div className="flex flex-col space-y-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Select Scenario:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {realWorldExamples.map((ex, idx) => (
                  <button
                    key={ex.id}
                    onClick={() => setSelectedExample(idx)}
                    className={clsx(
                      'px-4 py-3 rounded-xl text-left text-xs sm:text-sm font-semibold transition-all duration-200 border',
                      selectedExample === idx
                        ? 'bg-blue-600/20 border-blue-500 text-blue-300 shadow-md'
                        : 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    )}
                  >
                    {ex.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Example Card */}
            {(() => {
              const currentEx = realWorldExamples[selectedExample];
              return (
                <div className="p-5 sm:p-6 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
                    <div>
                      <h3 className="text-lg font-bold text-white">{currentEx.title}</h3>
                      <p className="text-xs text-indigo-400 mt-0.5">Analyst in Charge: {currentEx.manager}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        {currentEx.savings}
                      </span>
                    </div>
                  </div>

                  {/* Origins & Destinations Badges */}
                  <div className="flex flex-col sm:flex-row gap-4 text-xs">
                    <div className="flex-1 p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="font-semibold text-blue-400 block mb-2">Supply Sources (Origins):</span>
                      <ul className="space-y-1 text-slate-300">
                        {currentEx.origins.map((o, idx) => (
                          <li key={idx} className="flex justify-between">
                            <span>{o.name}</span>
                            <span className="font-mono text-slate-400">{o.supply} units</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex-1 p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="font-semibold text-emerald-400 block mb-2">Demand Sinks (Destinations):</span>
                      <ul className="space-y-1 text-slate-300">
                        {currentEx.destinations.map((d, idx) => (
                          <li key={idx} className="flex justify-between">
                            <span>{d.name}</span>
                            <span className="font-mono text-slate-400">{d.demand} units</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Step by step allocation table */}
                  <div className="flex flex-col space-y-2">
                    <span className="text-xs font-semibold text-slate-300">Step-by-Step Allocation Log:</span>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-slate-800 text-slate-400 bg-slate-900/50">
                            <th className="py-2 px-3">Step</th>
                            <th className="py-2 px-3">Assigned Route</th>
                            <th className="py-2 px-3">Unit Rate</th>
                            <th className="py-2 px-3">Quantity</th>
                            <th className="py-2 px-3">Cost Contribution</th>
                            <th className="py-2 px-3">Operational Rationale</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60">
                          {currentEx.allocations.map((a, i) => (
                            <tr key={i} className="hover:bg-slate-900/40 transition-colors">
                              <td className="py-2.5 px-3 font-mono text-indigo-400 font-bold">{a.step}</td>
                              <td className="py-2.5 px-3 font-medium text-slate-200">{a.cell}</td>
                              <td className="py-2.5 px-3 font-mono text-emerald-400">{a.rate}</td>
                              <td className="py-2.5 px-3 font-mono text-slate-300">{a.qty}</td>
                              <td className="py-2.5 px-3 font-mono text-white font-semibold">{a.subtotal}</td>
                              <td className="py-2.5 px-3 text-slate-400 text-xs">{a.note}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Comparison Summary */}
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-3">
                    <div className="flex items-center space-x-4 text-xs">
                      <div>
                        <span className="text-slate-400 block">Least-Cost IBFS:</span>
                        <span className="text-base font-extrabold text-emerald-400 font-mono">{currentEx.totalCost}</span>
                      </div>
                      <div className="border-l border-slate-700 pl-4">
                        <span className="text-slate-400 block">NWCR Baseline:</span>
                        <span className="text-base font-extrabold text-rose-400 font-mono line-through">{currentEx.nwcrCost}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-300 text-right sm:max-w-xs leading-relaxed italic">
                      "{currentEx.lesson}"
                    </p>
                  </div>
                </div>
              );
            })()}
          </div>
        </section>

        {/* Section 6: Matrix Minima vs. NWCR */}
        <section
          ref={(el) => (sectionRefs.current[5] = el)}
          data-index="5"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-pink-600/20 text-pink-400 font-bold text-sm">
                06
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Comparison: Matrix Minima vs. North-West Corner Rule
              </h2>
            </div>

            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              Understanding why industry professionals rarely rely on the North-West Corner Rule for serious logistics optimization:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950 text-slate-300">
                    <th className="py-3 px-4 font-semibold">Evaluation Criteria</th>
                    <th className="py-3 px-4 font-semibold text-rose-400">North-West Corner Rule</th>
                    <th className="py-3 px-4 font-semibold text-emerald-400">Matrix Minima (Least-Cost)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-slate-300">
                  <tr className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-medium text-slate-200">Allocation Driver</td>
                    <td className="py-3 px-4 text-slate-400">Grid position index (Row 1, Col 1 down)</td>
                    <td className="py-3 px-4 text-emerald-300 font-medium">Economic unit cost (Lowest ₹/unit)</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-medium text-slate-200">Cost Matrix Awareness</td>
                    <td className="py-3 px-4 text-slate-400">Completely Blind (Ignores all rates)</td>
                    <td className="py-3 px-4 text-emerald-300 font-medium">Fully Cost-Aware (Global Matrix Scan)</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-medium text-slate-200">Starting Solution Quality</td>
                    <td className="py-3 px-4 text-slate-400">Very Poor (High initial freight cost)</td>
                    <td className="py-3 px-4 text-emerald-300 font-medium">Good to Near-Optimal (Low initial cost)</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-medium text-slate-200">Optimization Cycles (MODI)</td>
                    <td className="py-3 px-4 text-slate-400">High (6 to 12 iterations typically)</td>
                    <td className="py-3 px-4 text-emerald-300 font-medium">Low (1 to 3 iterations typically)</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 font-medium text-slate-200">Manual Calculation Complexity</td>
                    <td className="py-3 px-4 text-slate-400">Trivial (Direct top-left traversal)</td>
                    <td className="py-3 px-4 text-emerald-300 font-medium">Moderate (Simple matrix min searches)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 7: Hints & Conceptual Prompts */}
        <section
          ref={(el) => (sectionRefs.current[6] = el)}
          data-index="6"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-600/20 text-teal-400 font-bold text-sm">
                07
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Pedagogical Hints & Conceptual Reflections
              </h2>
            </div>

            <div className="flex flex-col space-y-3">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1 hover:bg-slate-800/70 transition-all duration-200">
                <span className="text-cyan-400 font-semibold text-sm">🤔 Think about...</span>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Why does a purely greedy strategy occasionally produce a higher cost than Vogel's Approximation Method? Think about whether taking the cheapest cell right now might force a large remaining demand into an exorbitantly expensive route later.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1 hover:bg-slate-800/70 transition-all duration-200">
                <span className="text-amber-400 font-semibold text-sm">🔍 Observe carefully...</span>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Look at the allocation count after completing the table. If you have <span className="font-mono text-white">3 origins</span> and <span className="font-mono text-white">4 destinations</span>, you must have exactly <span className="font-mono text-cyan-300">3 + 4 - 1 = 6</span> basic allocated cells before running MODI multipliers.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1 hover:bg-slate-800/70 transition-all duration-200">
                <span className="text-emerald-400 font-semibold text-sm">⚙️ Try changing this...</span>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  If two cells tie at ₹4/unit, try breaking the tie by allocating to the one with smaller capacity first versus the one with larger capacity. Notice how the total starting freight bill changes!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 8: Professional Tips & Industry Tricks */}
        <section
          ref={(el) => (sectionRefs.current[7] = el)}
          data-index="7"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 font-bold text-sm">
                08
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Professional Tips & Practical Tricks
              </h2>
            </div>

            <div className="flex flex-col space-y-3">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-blue-300 font-semibold text-sm">1. Visual Distinction Between Rates and Volumes</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  In manual working, write unit rates in the top-right corner of each cell and place allocated volume in a bold circle or square at the center. This prevents accidental summation of rates instead of quantities.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-blue-300 font-semibold text-sm">2. Priority Queue Data Structure for Coding Interviews & Software</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  When implementing Matrix Minima in Python or JavaScript, insert all matrix cells into a Min-Heap (<span className="font-mono text-cyan-300">O(mn log(mn))</span>) to extract the smallest available rate in <span className="font-mono text-cyan-300">O(log(mn))</span> time instead of repeatedly scanning 2D arrays.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-blue-300 font-semibold text-sm">3. The Big-M Penalty for Blocked Routes</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  If road maintenance closes the Ichapur to Salt Lake route, assign <span className="font-mono text-cyan-300">c₂₃ = M</span> (e.g. ₹999,999). The greedy search will strictly bypass this route as long as finite cells exist.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 9: Common Mistakes & Pitfalls */}
        <section
          ref={(el) => (sectionRefs.current[8] = el)}
          data-index="8"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-600/20 text-rose-400 font-bold text-sm">
                09
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Common Mistakes & Conceptual Pitfalls
              </h2>
            </div>

            <div className="flex flex-col space-y-3">
              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 flex flex-col space-y-1">
                <span className="text-rose-400 font-semibold text-sm">❌ Mistake 1: Forgetting to Subtract Capacity After Allocation</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Students often allocate 40 units to cell (1, 1) and then allocate from the original 50 units in cell (1, 2) rather than the remaining 10 units. Always cross out the old total and write the new balance immediately.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 flex flex-col space-y-1">
                <span className="text-rose-400 font-semibold text-sm">❌ Mistake 2: Assuming the IBFS is Automatically Optimal</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Matrix Minima delivers a high-quality initial draft, but it is <em>not guaranteed</em> to be optimal. An optimality test (MODI method) must always be performed to check for negative net evaluation index (<span className="font-mono text-cyan-300">Δᵢⱼ &lt; 0</span>).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 flex flex-col space-y-1">
                <span className="text-rose-400 font-semibold text-sm">❌ Mistake 3: Creating Closed Loops During Manual Allocation</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  If an exhausted row is not crossed out, a student might allocate to another cell in that row, creating an illegal cyclical dependency that breaks the basic feasible tree structure.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 10: Best Practices */}
        <section
          ref={(el) => (sectionRefs.current[9] = el)}
          data-index="9"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-violet-600/20 text-violet-400 font-bold text-sm">
                10
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Best Practices for Classroom & Production
              </h2>
            </div>

            <div className="flex flex-col space-y-3">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-violet-300 font-semibold text-sm">1. Pre-Flight Balance Validation</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Always calculate <span className="font-mono text-cyan-300">Total Supply</span> and <span className="font-mono text-cyan-300">Total Demand</span> before touching any cost cells. If unbalanced, append a dummy row or column with unit cost ₹0.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-violet-300 font-semibold text-sm">2. Transparent Line Striking</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Draw a clean single line through satisfied columns and exhausted rows. This visual barrier prevents searching dead cells and speeds up subsequent iterations.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-violet-300 font-semibold text-sm">3. Basis Count Sanity Verification</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Before calculating the total cost Z, count all populated cells. If count &lt; <span className="font-mono">m + n - 1</span>, allocate <span className="font-mono text-white">ε</span> to an independent zero-cost cell immediately.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 11: Mini Checklist */}
        <section
          ref={(el) => (sectionRefs.current[10] = el)}
          data-index="10"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                11
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Student Revision Checklist
              </h2>
            </div>

            <div className="flex flex-col space-y-2.5">
              {[
                { title: 'Balance Checked', desc: 'Verified that ∑ Sᵢ = ∑ Dⱼ (or added ₹0 dummy line)' },
                { title: 'Global Min Identified', desc: 'Scanned entire active matrix for lowest unit cost in ₹' },
                { title: 'Max Allocation Assigned', desc: 'Allocated x_kl = min(S_k, D_l) to the cheapest cell' },
                { title: 'Capacities Updated', desc: 'Subtracted allocated units from both origin and destination balances' },
                { title: 'Exhausted Line Struck Out', desc: 'Crossed out only one line if supply and demand hit zero simultaneously' },
                { title: 'Basic Cells Verified', desc: 'Confirmed exactly m + n - 1 allocations with no closed loops' },
                { title: 'Initial Cost Computed', desc: 'Accurately calculated Z = ∑ (cᵢⱼ · xᵢⱼ) in ₹ currency' },
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

        {/* Section 12: Teacher's Note */}
        <section className="flex flex-col space-y-6">
          <Teacher
            note={
              "When I introduce the Matrix Minima Method to my students in Kolkata and Barrackpore, I always tell Mamata, Mahima, and Debangshu to imagine being in charge of an actual freight fleet. In real life, nobody starts allocating trucks from the top-left corner of an excel sheet if that route costs ₹15/km and another route costs ₹2/km! Susmita and Abhronila observed this during our industrial logistics workshop in Ichapur: the Matrix Minima method immediately cuts down initial transportation costs by 25% to 45% compared to the North-West Corner Rule. However, remember my golden rule: Matrix Minima is a greedy heuristic, not an optimality proof. Always verify your IBFS with the MODI method before signing off on final factory shipments!"
            }
          />
        </section>

        {/* Section 13: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Least-Cost Allocation Concept FAQs"
            questions={questions}
          />
        </section>

        {/* Section 14: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Least-Cost Allocation Concept (Matrix Minima Foundation)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic0_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic0;
