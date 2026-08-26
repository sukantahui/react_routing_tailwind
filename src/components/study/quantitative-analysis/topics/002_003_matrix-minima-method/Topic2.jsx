// Topic2.jsx
import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic2_files/topic2_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic2_files/topic2_note.txt?raw';

const Topic2 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedTieBreaker, setSelectedTieBreaker] = useState(0);
  const [selectedCase, setSelectedCase] = useState(0);
  const sectionRefs = useRef([]);

  // Intersection observer for section tracking
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

  const tieBreakScenarios = [
    {
      title: 'Scenario A: Max Volume Rule (Recommended)',
      cost1: 'Cell (1, 2) = ₹3/unit (Supply: 20, Demand: 60 → Vol = 20)',
      cost2: 'Cell (3, 1) = ₹3/unit (Supply: 70, Demand: 80 → Vol = 70)',
      decision: 'Select Cell (3, 1) to allocate 70 units immediately @ ₹3.',
      rationale: 'Moving 70 units at ₹3 locks in ₹210 of low-cost freight immediately, far superior to locking in only 20 units at that rate.',
      outcome: 'Result: Lower overall starting cost Z and fewer MODI optimization cycles.',
    },
    {
      title: 'Scenario B: Capacity Dominance Rule',
      cost1: 'Cell (1, 3) = ₹4/unit (Alloc = 30, S1 = 30, D3 = 50)',
      cost2: 'Cell (2, 2) = ₹4/unit (Alloc = 30, S2 = 90, D2 = 30)',
      decision: 'Select Cell (2, 2) because Origin S2 has a massive 90-unit inventory.',
      rationale: 'Relieving high-capacity depots early prevents large surplus stocks from getting stranded in expensive downstream cells.',
      outcome: 'Result: Balances depot inventory strain and eliminates regional bottlenecks.',
    },
    {
      title: 'Scenario C: Prohibited Route Filter (Big-M Method)',
      cost1: 'Cell (1, 1) = ₹4/unit (Standard Open Route)',
      cost2: 'Cell (2, 3) = M (₹999,999/unit - Broken Bridge / Prohibited)',
      decision: 'The argmin operator strictly ignores Cell (2, 3) and picks Cell (1, 1).',
      rationale: 'Setting c_ij = M makes prohibited routes mathematically invisible to the greedy minimum scanner.',
      outcome: 'Result: Physically invalid shipping links are 100% prevented from allocation.',
    },
  ];

  const caseStudies = [
    {
      title: 'Case 1: Heavy Fasteners Logistics (Debangshu)',
      origins: 'Barrackpore (50 tons), Ichapur (70 tons)',
      destinations: 'Kolkata (40), Jadavpur (50), Salt Lake (30)',
      allocations: [
        { step: '1', cell: 'Ichapur → Jadavpur', rate: '₹3', qty: 50, cost: '₹150', status: 'Global Minimum' },
        { step: '2', cell: 'Barrackpore → Kolkata', rate: '₹4', qty: 40, cost: '₹160', status: 'Submatrix Min' },
        { step: '3', cell: 'Ichapur → Salt Lake', rate: '₹5', qty: 20, cost: '₹100', status: 'Column Min' },
        { step: '4', cell: 'Barrackpore → Salt Lake', rate: '₹6', qty: 10, cost: '₹60', status: 'Final Cell' },
      ],
      totalCost: '₹470',
      lesson: 'Debangshu systematically targeted the lowest cell at each stage, reducing freight costs by ₹200 vs NWCR.',
    },
    {
      title: 'Case 2: Bengal FMCG Distribution (Mamata)',
      origins: 'Kolkata (60), Barrackpore (80), Ichapur (60)',
      destinations: 'Jadavpur (80), Howrah (70), Barasat (50)',
      allocations: [
        { step: '1', cell: 'Ichapur → Barasat', rate: '₹1', qty: 50, cost: '₹50', status: 'Global Minimum' },
        { step: '2', cell: 'Kolkata → Jadavpur', rate: '₹2', qty: 60, cost: '₹120', status: 'Submatrix Min' },
        { step: '3', cell: 'Barrackpore → Howrah', rate: '₹3', qty: 70, cost: '₹210', status: 'Submatrix Min' },
        { step: '4', cell: 'Ichapur → Jadavpur', rate: '₹5', qty: 10, cost: '₹50', status: 'Active Remainder' },
        { step: '5', cell: 'Barrackpore → Jadavpur', rate: '₹6', qty: 10, cost: '₹60', status: 'Final Cell' },
      ],
      totalCost: '₹490',
      lesson: 'Mamata selected rates ₹1, ₹2, and ₹3 in order, avoiding high retail surcharge routes.',
    },
    {
      title: 'Case 3: Hospital Oxygen Fleet (Susmita)',
      origins: 'Kolkata Central (100 cyl), Barrackpore Station (150 cyl)',
      destinations: 'Jadavpur Medical (120), Ichapur General (130)',
      allocations: [
        { step: '1', cell: 'Barrackpore → Ichapur', rate: '₹5', qty: 130, cost: '₹650', status: 'Global Minimum' },
        { step: '2', cell: 'Kolkata → Jadavpur', rate: '₹6', qty: 100, cost: '₹600', status: 'Submatrix Min' },
        { step: '3', cell: 'Barrackpore → Jadavpur', rate: '₹11', qty: 20, cost: '₹220', status: 'Final Remainder' },
      ],
      totalCost: '₹1,470',
      lesson: 'Susmita secured critical hospital quotas while strictly adhering to municipal health budgets.',
    },
    {
      title: 'Case 4: E-Commerce Locker Routing (Abhronila & Mahima)',
      origins: 'Barrackpore Hub (40), Kolkata Mega Center (60)',
      destinations: 'Ichapur (30), Jadavpur (40), Salt Lake (30)',
      allocations: [
        { step: '1', cell: 'Kolkata → Ichapur', rate: '₹3', qty: 30, cost: '₹90', status: 'Global Minimum' },
        { step: '2', cell: 'Barrackpore → Jadavpur', rate: '₹4', qty: 40, cost: '₹160', status: 'Submatrix Min' },
        { step: '3', cell: 'Kolkata → Salt Lake', rate: '₹5', qty: 30, cost: '₹150', status: 'Final Cell' },
      ],
      totalCost: '₹400',
      lesson: 'Abhronila and Mahima captured exact customer delivery windows with lowest per-kilometer fuel spend.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 transition-colors duration-300 font-sans">
      {/* Header Banner */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-b border-slate-800/80">
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-blue-500/10 text-blue-400 border border-blue-500/30 mb-4 shadow-sm">
            Quantitative Analysis • Transportation Models • Topic 2
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Selecting the Minimum Cost Cell
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
            Master global matrix inspection, multi-tier tie-breaking heuristics, prohibited route filters (Big-M), and active submatrix candidate evaluation.
          </p>
        </div>
      </div>

      {/* Main Container - Stacked Vertical Sections */}
      <div className="max-w-4xl mx-auto px-4 py-10 sm:px-6 lg:px-8 flex flex-col space-y-12">
        
        {/* Section 1: Selection Mechanics */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-600/20 text-teal-400 font-bold text-sm">
                01
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                The Global Inspection Operator
              </h2>
            </div>

            <p className="text-slate-300 leading-relaxed text-base">
              The core engine of the Matrix Minima Method relies on the <strong className="text-teal-400 font-semibold">global argmin operator</strong>, which evaluates all active cells across the 2D grid rather than fixing attention to a static row, column, or diagonal.
            </p>

            {/* Formula Card */}
            <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-sm text-slate-300 flex flex-col space-y-3">
              <div className="text-teal-400 font-semibold">Formal Cell Selection Equation:</div>
              <div className="pl-3 border-l-2 border-teal-500 flex flex-col space-y-1">
                <span className="text-white font-bold">{"(k, l) = argmin_{(i, j) ∈ Active} { cᵢⱼ }"}</span>
                <span className="text-slate-400 text-xs">
                  {"Where Active = { (i, j) : RowActive[i] == true AND ColActive[j] == true }"}
                </span>
              </div>
            </div>

            <div className="flex flex-col space-y-3">
              <h3 className="text-lg font-semibold text-slate-200">The 3 Inspection Rules</h3>

              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-teal-400 font-semibold text-sm">1. Global 2D Visibility</span>
                <p className="text-slate-400 text-xs sm:text-sm">
                  Every unexhausted origin <span className="font-mono text-slate-200">Sᵢ &gt; 0</span> and unsatisfied destination <span className="font-mono text-slate-200">Dⱼ &gt; 0</span> is visible in the search space.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-cyan-400 font-semibold text-sm">2. Immediate Submatrix Pruning</span>
                <p className="text-slate-400 text-xs sm:text-sm">
                  As soon as a line is eliminated, all its cells are permanently removed from future inspection passes, shrinking the candidate pool.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-blue-400 font-semibold text-sm">3. Non-Negative Unit Cost Guarantee</span>
                <p className="text-slate-400 text-xs sm:text-sm">
                  The algorithm strictly selects the lowest numerical value in ₹, naturally choosing ₹0 dummy cells first in unbalanced models.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Interactive Tie-Breaking Scenarios */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-600/20 text-cyan-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Tie-Breaking & Route Filtering
              </h2>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              Explore how professional logistics analysts resolve duplicate minimum costs and filter prohibited routes:
            </p>

            {/* Tie-breaker Tabs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {tieBreakScenarios.map((sc, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedTieBreaker(idx)}
                  className={clsx(
                    'py-2.5 px-3 rounded-xl text-xs font-semibold transition-all duration-200 border text-center',
                    selectedTieBreaker === idx
                      ? 'bg-cyan-600/30 border-cyan-500 text-cyan-300 shadow-md font-bold'
                      : 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  )}
                >
                  {sc.title.split(':')[0]}
                </button>
              ))}
            </div>

            {/* Active Tie-Breaker Card */}
            {(() => {
              const cur = tieBreakScenarios[selectedTieBreaker];
              return (
                <div className="p-5 sm:p-6 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col space-y-4">
                  <h3 className="text-base font-bold text-white">{cur.title}</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-amber-400 font-semibold block mb-1">Candidate Option 1:</span>
                      <p className="text-slate-300 font-mono">{cur.cost1}</p>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-emerald-400 font-semibold block mb-1">Candidate Option 2:</span>
                      <p className="text-slate-300 font-mono">{cur.cost2}</p>
                    </div>
                  </div>

                  <div className="p-3.5 bg-blue-950/40 rounded-xl border border-blue-800/50 flex flex-col space-y-1">
                    <span className="text-xs font-bold text-blue-300">Decision Rule:</span>
                    <p className="text-xs sm:text-sm text-slate-200">{cur.decision}</p>
                  </div>

                  <div className="text-xs text-slate-400 flex flex-col space-y-1 pt-1">
                    <p><strong className="text-slate-300">Rationale:</strong> {cur.rationale}</p>
                    <p className="text-emerald-400 font-semibold">{cur.outcome}</p>
                  </div>
                </div>
              );
            })()}
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
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 font-bold text-sm">
                03
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Visual Inspection & Selection Heatmap
              </h2>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              This diagram shows how the algorithm prioritizes the lowest cost cell, flags ties for capacity checks, and excludes dead lines:
            </p>

            {/* Semantic SVG Diagram */}
            <div className="p-4 sm:p-6 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center justify-center">
              <svg
                viewBox="0 0 720 340"
                className="w-full h-auto max-w-2xl select-none"
                aria-label="Minimum Cost Cell Selection Heatmap"
              >
                <defs>
                  <linearGradient id="minCellGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#047857" />
                  </linearGradient>
                  <linearGradient id="prohibGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="100%" stopColor="#991b1b" />
                  </linearGradient>
                </defs>

                {/* Table Header */}
                <rect x="40" y="30" width="640" height="35" rx="8" fill="#1e293b" />
                <text x="140" y="52" fill="#94a3b8" fontSize="12" textAnchor="middle">Kolkata (D1)</text>
                <text x="290" y="52" fill="#94a3b8" fontSize="12" textAnchor="middle">Jadavpur (D2)</text>
                <text x="440" y="52" fill="#94a3b8" fontSize="12" textAnchor="middle">Salt Lake (D3)</text>
                <text x="590" y="52" fill="#f59e0b" fontSize="12" textAnchor="middle" fontWeight="bold">Supply Balance</text>

                {/* Row 1: Barrackpore */}
                <rect x="40" y="75" width="640" height="75" rx="10" fill="#0f172a" stroke="#334155" />
                <text x="50" y="115" fill="#e2e8f0" fontSize="11" fontWeight="bold">Barrackpore (S1)</text>
                
                {/* Cell 1,1 */}
                <rect x="180" y="85" width="80" height="55" rx="8" fill="#1e293b" stroke="#475569" />
                <text x="220" y="115" fill="#f8fafc" fontSize="13" fontWeight="bold" textAnchor="middle">₹4</text>
                <text x="220" y="132" fill="#94a3b8" fontSize="9" textAnchor="middle">Available</text>

                {/* Cell 1,2 */}
                <rect x="330" y="85" width="80" height="55" rx="8" fill="#1e293b" stroke="#475569" />
                <text x="370" y="115" fill="#f8fafc" fontSize="13" fontWeight="bold" textAnchor="middle">₹8</text>
                <text x="370" y="132" fill="#94a3b8" fontSize="9" textAnchor="middle">High Cost</text>

                {/* Cell 1,3 */}
                <rect x="480" y="85" width="80" height="55" rx="8" fill="#1e293b" stroke="#475569" />
                <text x="520" y="115" fill="#f8fafc" fontSize="13" fontWeight="bold" textAnchor="middle">₹6</text>
                <text x="520" y="132" fill="#94a3b8" fontSize="9" textAnchor="middle">Available</text>

                <text x="590" y="118" fill="#fbbf24" fontSize="13" fontWeight="bold" textAnchor="middle">50 units</text>

                {/* Row 2: Ichapur */}
                <rect x="40" y="160" width="640" height="75" rx="10" fill="#0f172a" stroke="#334155" />
                <text x="50" y="200" fill="#e2e8f0" fontSize="11" fontWeight="bold">Ichapur (S2)</text>

                {/* Cell 2,1 */}
                <rect x="180" y="170" width="80" height="55" rx="8" fill="#1e293b" stroke="#475569" />
                <text x="220" y="200" fill="#f8fafc" fontSize="13" fontWeight="bold" textAnchor="middle">₹7</text>
                <text x="220" y="217" fill="#94a3b8" fontSize="9" textAnchor="middle">Available</text>

                {/* Cell 2,2 (SELECTED WINNER) */}
                <rect x="330" y="170" width="80" height="55" rx="8" fill="url(#minCellGrad)" stroke="#34d399" strokeWidth="2" />
                <text x="370" y="198" fill="#ffffff" fontSize="15" fontWeight="bold" textAnchor="middle">₹3</text>
                <text x="370" y="216" fill="#a7f3d0" fontSize="9" fontWeight="bold" textAnchor="middle">★ GLOBAL MIN</text>

                {/* Cell 2,3 */}
                <rect x="480" y="170" width="80" height="55" rx="8" fill="#1e293b" stroke="#475569" />
                <text x="520" y="200" fill="#f8fafc" fontSize="13" fontWeight="bold" textAnchor="middle">₹5</text>
                <text x="520" y="217" fill="#94a3b8" fontSize="9" textAnchor="middle">Next Candidate</text>

                <text x="590" y="203" fill="#fbbf24" fontSize="13" fontWeight="bold" textAnchor="middle">70 units</text>

                {/* Demand Bottom Row */}
                <rect x="40" y="245" width="640" height="40" rx="8" fill="#1e293b" />
                <text x="100" y="270" fill="#34d399" fontSize="11" fontWeight="bold">Demand:</text>
                <text x="220" y="270" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">40 units</text>
                <text x="370" y="270" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">50 units</text>
                <text x="520" y="270" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">30 units</text>
                <text x="590" y="270" fill="#cbd5e1" fontSize="11" textAnchor="middle">Total: 120</text>

                {/* Bottom Callout */}
                <text x="360" y="315" fill="#38bdf8" fontSize="11" textAnchor="middle" fontWeight="bold">
                  Selection Action: Target Cell (Ichapur, Jadavpur) @ ₹3/unit &rarr; Allocate min(70, 50) = 50 units
                </text>
              </svg>
            </div>
          </div>
        </section>

        {/* Section 4: 4 Real-World Case Studies */}
        <section
          ref={(el) => (sectionRefs.current[3] = el)}
          data-index="3"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                04
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                4 Industrial Case Demonstrations
              </h2>
            </div>

            {/* Case Selector Tabs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {caseStudies.map((cs, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedCase(idx)}
                  className={clsx(
                    'py-3 px-4 rounded-xl text-left text-xs sm:text-sm font-semibold transition-all duration-200 border',
                    selectedCase === idx
                      ? 'bg-teal-600/20 border-teal-500 text-teal-300 shadow-md'
                      : 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  )}
                >
                  {cs.title}
                </button>
              ))}
            </div>

            {/* Active Case Card */}
            {(() => {
              const curCase = caseStudies[selectedCase];
              return (
                <div className="p-5 sm:p-6 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col space-y-5">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-slate-800 pb-3 gap-2">
                    <h3 className="text-lg font-bold text-white">{curCase.title}</h3>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-500/10 text-teal-400 border border-teal-500/30 font-mono">
                      Cost: {curCase.totalCost}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-blue-400 font-semibold block mb-1">Origins:</span>
                      <p className="text-slate-300">{curCase.origins}</p>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-emerald-400 font-semibold block mb-1">Destinations:</span>
                      <p className="text-slate-300">{curCase.destinations}</p>
                    </div>
                  </div>

                  {/* Allocation Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400 bg-slate-900/40">
                          <th className="py-2 px-3">Selection Step</th>
                          <th className="py-2 px-3">Selected Link</th>
                          <th className="py-2 px-3">Unit Rate</th>
                          <th className="py-2 px-3">Volume</th>
                          <th className="py-2 px-3">Cost (₹)</th>
                          <th className="py-2 px-3">Selection Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {curCase.allocations.map((a, i) => (
                          <tr key={i} className="hover:bg-slate-900/40">
                            <td className="py-2.5 px-3 font-mono text-teal-400 font-bold">{a.step}</td>
                            <td className="py-2.5 px-3 font-medium text-slate-200">{a.cell}</td>
                            <td className="py-2.5 px-3 font-mono text-emerald-400">{a.rate}</td>
                            <td className="py-2.5 px-3 font-mono text-slate-300">{a.qty}</td>
                            <td className="py-2.5 px-3 font-mono text-white font-bold">{a.cost}</td>
                            <td className="py-2.5 px-3 text-slate-400 text-xs">{a.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <p className="text-xs text-slate-300 italic p-3 bg-slate-900 rounded-xl border border-slate-800">
                    💡 <strong>Key Takeaway:</strong> {curCase.lesson}
                  </p>
                </div>
              );
            })()}
          </div>
        </section>

        {/* Section 5: Hints & Conceptual Prompts */}
        <section
          ref={(el) => (sectionRefs.current[4] = el)}
          data-index="4"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-600/20 text-teal-400 font-bold text-sm">
                05
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Pedagogical Hints & Deep Thinking Prompts
              </h2>
            </div>

            <div className="flex flex-col space-y-3">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1 hover:bg-slate-800/70 transition-all duration-200">
                <span className="text-cyan-400 font-semibold text-sm">🤔 Think about...</span>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Why is it mathematically impossible for the minimum cost cell selection to choose an exhausted line? If <span className="font-mono text-cyan-300">S_i = 0</span>, what would <span className="font-mono text-cyan-300">min(0, D_j)</span> evaluate to?
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1 hover:bg-slate-800/70 transition-all duration-200">
                <span className="text-amber-400 font-semibold text-sm">🔍 Observe carefully...</span>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  When a tie occurs at ₹3/unit, always compute <span className="font-mono text-amber-300">min(S_i, D_j)</span> for every tied cell before writing your allocation on paper. The cell that can absorb the largest quantity should always win!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1 hover:bg-slate-800/70 transition-all duration-200">
                <span className="text-emerald-400 font-semibold text-sm">⚙️ Try changing this...</span>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Change the cost of a route to ₹999,999 (Big-M). Notice how the algorithm automatically routes all goods through the alternative routes without crashing!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Professional Tips */}
        <section
          ref={(el) => (sectionRefs.current[5] = el)}
          data-index="5"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 font-bold text-sm">
                06
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Professional Tips & Practical Tricks
              </h2>
            </div>

            <div className="flex flex-col space-y-3">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-blue-300 font-semibold text-sm">1. Systematic Row-by-Row Minimum Checklist</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  In large matrices (e.g. 5×6), scan row by row to record the minimum of each row first, then take the minimum of those minimums. This prevents missing a tiny number tucked away in the bottom corner.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-blue-300 font-semibold text-sm">2. Big-M Value Selection in Software</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  In JavaScript or Python, do not use `Infinity` directly if arithmetic operations might produce `NaN`. Use a large finite integer like `1e8` (₹100,000,000) for clean mathematical operations.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-blue-300 font-semibold text-sm">3. Pre-Sorting Cells with Min-Heap</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  If automating Matrix Minima for thousands of locations, pre-sort all matrix cells into a priority queue to achieve <span className="font-mono text-cyan-300">O(mn log(mn))</span> performance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Common Pitfalls */}
        <section
          ref={(el) => (sectionRefs.current[6] = el)}
          data-index="6"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-600/20 text-rose-400 font-bold text-sm">
                07
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Common Mistakes & Pitfalls
              </h2>
            </div>

            <div className="flex flex-col space-y-3">
              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 flex flex-col space-y-1">
                <span className="text-rose-400 font-semibold text-sm">❌ Selecting Cells in Struck-Out Lines</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Accidentally selecting an attractive ₹1 cost in a row that was already exhausted. Always maintain a physical strike-through line on paper.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 flex flex-col space-y-1">
                <span className="text-rose-400 font-semibold text-sm">❌ Ignoring Max-Volume on Ties</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Selecting tied cells arbitrarily without checking capacity, leading to an unnecessarily expensive initial solution.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 flex flex-col space-y-1">
                <span className="text-rose-400 font-semibold text-sm">❌ Neglecting Unbalanced Model Dummies</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Failing to include ₹0 dummy cells when <span className="font-mono text-slate-200">∑ S_i ≠ ∑ D_j</span>, which causes the algorithm to stall before fulfilling all constraints.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 8: Best Practices */}
        <section
          ref={(el) => (sectionRefs.current[7] = el)}
          data-index="7"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-violet-600/20 text-violet-400 font-bold text-sm">
                08
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Best Practices & Coding Guidelines
              </h2>
            </div>

            <div className="flex flex-col space-y-3">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-violet-300 font-semibold text-sm">1. Clean Index Tracking</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Maintain an explicit mapping of `{'{ row, col, cost }'}` so that allocations can be audited directly against the original warehouse locations.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-violet-300 font-semibold text-sm">2. Deterministic Tie-Breaker Ladder</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Always implement the 3-tier ladder (Cost &rarr; Volume &rarr; Capacity Dominance) to ensure reproducible and optimal starting tables.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-violet-300 font-semibold text-sm">3. Basis Count Validation</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Ensure total selected cells equal <span className="font-mono text-cyan-300">m + n - 1</span> before proceeding to MODI optimality checks.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 9: Mini Checklist */}
        <section
          ref={(el) => (sectionRefs.current[8] = el)}
          data-index="8"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                09
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Student Revision Checklist
              </h2>
            </div>

            <div className="flex flex-col space-y-2.5">
              {[
                { title: 'Global Scan Completed', desc: 'Inspected entire 2D active matrix for the lowest unit cost in ₹' },
                { title: 'Eliminated Lines Bypassed', desc: 'Excluded all exhausted rows and satisfied columns' },
                { title: 'Ties Resolved by Volume', desc: 'Prioritized cell with higher min(S_i, D_j) allocation quantity' },
                { title: 'Big-M Routes Filtered', desc: 'Assigned M to prohibited links so they are never chosen' },
                { title: 'Dummy Rates Evaluated', desc: 'Properly incorporated ₹0 dummy entries in unbalanced scenarios' },
                { title: 'Basis Count Verified', desc: 'Confirmed exactly m + n - 1 basic variables generated' },
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

        {/* Section 10: Teacher's Note */}
        <section className="flex flex-col space-y-6">
          <Teacher
            note={
              "When Debangshu, Susmita, Mamata, and Mahima work through transportation tables in our Kolkata and Barrackpore classroom sessions, the most common trap is rushing through tie-breaks. If two routes both offer ₹4/unit, do not simply pick the first one your eyes land on! Take five seconds to evaluate min(Supply, Demand) for both. Moving 80 units at ₹4 saves ₹320, whereas moving 10 units at ₹4 saves only ₹40. Always let cargo volume drive your tie-breaking decisions!"
            }
          />
        </section>

        {/* Section 11: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Selecting the Minimum Cost Cell FAQs"
            questions={questions}
          />
        </section>

        {/* Section 12: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Selecting the Minimum Cost Cell"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic2_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic2;
