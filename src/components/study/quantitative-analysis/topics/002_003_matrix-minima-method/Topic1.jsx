// Topic1.jsx
import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic1_files/topic1_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic1_files/topic1_note.txt?raw';

const Topic1 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
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

  const interactiveSteps = [
    {
      step: 1,
      title: 'Step 1: Global Minimum Scan & Allocation',
      description: 'The algorithm inspects all active cells and finds the absolute lowest cost: ₹3 at (Ichapur, Jadavpur).',
      action: 'Allocate x_22 = min(70, 50) = 50 units. Column D2 (Jadavpur) demand becomes 0 and is satisfied!',
      activeCell: { r: 1, c: 1 },
      rowStatus: ['Supply: 50', 'Supply: 20 (70-50)'],
      colStatus: ['Demand: 40', 'Demand: 0 (Satisfied)', 'Demand: 30'],
      eliminatedCol: [false, true, false],
      eliminatedRow: [false, false],
    },
    {
      step: 2,
      title: 'Step 2: Scan Remaining Uneliminated Submatrix',
      description: 'In active columns (Kolkata, Salt Lake), the lowest remaining unit rate is ₹4 at (Barrackpore, Kolkata).',
      action: 'Allocate x_11 = min(50, 40) = 40 units. Column D1 (Kolkata) demand is fully satisfied!',
      activeCell: { r: 0, c: 0 },
      rowStatus: ['Supply: 10 (50-40)', 'Supply: 20'],
      colStatus: ['Demand: 0 (Satisfied)', 'Demand: 0 (Satisfied)', 'Demand: 30'],
      eliminatedCol: [true, true, false],
      eliminatedRow: [false, false],
    },
    {
      step: 3,
      title: 'Step 3: Allocate to Next Minimum in Active Column',
      description: 'Only Column D3 (Salt Lake) remains. The cheapest route is ₹5 at (Ichapur, Salt Lake).',
      action: 'Allocate x_23 = min(20, 30) = 20 units. Row S2 (Ichapur) supply is now completely exhausted!',
      activeCell: { r: 1, c: 2 },
      rowStatus: ['Supply: 10', 'Supply: 0 (Exhausted)'],
      colStatus: ['Demand: 0 (Satisfied)', 'Demand: 0 (Satisfied)', 'Demand: 10 (30-20)'],
      eliminatedCol: [true, true, false],
      eliminatedRow: [false, true],
    },
    {
      step: 4,
      title: 'Step 4: Final Cell Fulfillment & Termination',
      description: 'The sole remaining active cell is (Barrackpore, Salt Lake) at ₹6.',
      action: 'Allocate x_13 = min(10, 10) = 10 units. Both Barrackpore supply and Salt Lake demand reach 0 simultaneously.',
      activeCell: { r: 0, c: 2 },
      rowStatus: ['Supply: 0 (Exhausted)', 'Supply: 0 (Exhausted)'],
      colStatus: ['Demand: 0 (Satisfied)', 'Demand: 0 (Satisfied)', 'Demand: 0 (Satisfied)'],
      eliminatedCol: [true, true, true],
      eliminatedRow: [true, true],
    },
  ];

  const caseStudies = [
    {
      title: 'Case 1: Heavy Fasteners Logistics (Debangshu)',
      origins: 'Barrackpore (50 tons), Ichapur (70 tons)',
      destinations: 'Kolkata (40), Jadavpur (50), Salt Lake (30)',
      allocations: [
        { cell: 'Ichapur → Jadavpur', rate: '₹3', qty: 50, cost: '₹150' },
        { cell: 'Barrackpore → Kolkata', rate: '₹4', qty: 40, cost: '₹160' },
        { cell: 'Ichapur → Salt Lake', rate: '₹5', qty: 20, cost: '₹100' },
        { cell: 'Barrackpore → Salt Lake', rate: '₹6', qty: 10, cost: '₹60' },
      ],
      totalCost: '₹470',
      nwcrCost: '₹670',
      savings: '₹200 (29.8% Savings)',
      insight: 'Debangshu eliminated expensive cross-river hauls by anchoring 50 tons at the ₹3 rate.',
    },
    {
      title: 'Case 2: Packaged Goods Network (Mamata)',
      origins: 'Kolkata (60), Barrackpore (80), Ichapur (60)',
      destinations: 'Jadavpur (80), Howrah (70), Barasat (50)',
      allocations: [
        { cell: 'Ichapur → Barasat', rate: '₹1', qty: 50, cost: '₹50' },
        { cell: 'Kolkata → Jadavpur', rate: '₹2', qty: 60, cost: '₹120' },
        { cell: 'Barrackpore → Howrah', rate: '₹3', qty: 70, cost: '₹210' },
        { cell: 'Ichapur → Jadavpur', rate: '₹5', qty: 10, cost: '₹50' },
        { cell: 'Barrackpore → Jadavpur', rate: '₹6', qty: 10, cost: '₹60' },
      ],
      totalCost: '₹490',
      nwcrCost: '₹840',
      savings: '₹350 (41.7% Savings)',
      insight: 'Mamata locked in rates ₹1, ₹2, and ₹3 first, preventing massive freight penalties in outer retail.',
    },
    {
      title: 'Case 3: Hospital Medical Oxygen Fleet (Susmita)',
      origins: 'Kolkata Central (100 cyl), Barrackpore Station (150 cyl)',
      destinations: 'Jadavpur Medical (120), Ichapur General (130)',
      allocations: [
        { cell: 'Barrackpore → Ichapur', rate: '₹5', qty: 130, cost: '₹650' },
        { cell: 'Kolkata → Jadavpur', rate: '₹6', qty: 100, cost: '₹600' },
        { cell: 'Barrackpore → Jadavpur', rate: '₹11', qty: 20, cost: '₹220' },
      ],
      totalCost: '₹1,470',
      nwcrCost: '₹2,030',
      savings: '₹560 (27.6% Savings)',
      insight: 'Susmita secured emergency hospital quotas while adhering strictly to municipal healthcare budgets.',
    },
    {
      title: 'Case 4: E-Commerce Locker Routing (Abhronila & Mahima)',
      origins: 'Barrackpore Hub (40), Kolkata Mega Center (60)',
      destinations: 'Ichapur (30), Jadavpur (40), Salt Lake (30)',
      allocations: [
        { cell: 'Kolkata → Ichapur', rate: '₹3', qty: 30, cost: '₹90' },
        { cell: 'Barrackpore → Jadavpur', rate: '₹4', qty: 40, cost: '₹160' },
        { cell: 'Kolkata → Salt Lake', rate: '₹5', qty: 30, cost: '₹150' },
      ],
      totalCost: '₹400',
      nwcrCost: '₹630',
      savings: '₹230 (36.5% Savings)',
      insight: 'Abhronila and Mahima achieved same-day dispatch SLA with minimal per-kilometer fuel spend.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 transition-colors duration-300 font-sans">
      {/* Header Banner */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-b border-slate-800/80">
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-blue-500/10 text-blue-400 border border-blue-500/30 mb-4 shadow-sm">
            Quantitative Analysis • Transportation Models • Topic 1
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
            The Matrix Minima Method
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
            Step-by-step algorithmic mechanics, tableau state reduction, capacity updating, and complete matrix execution workflows for transportation optimization.
          </p>
        </div>
      </div>

      {/* Main Container - Stacked Vertical Sections */}
      <div className="max-w-4xl mx-auto px-4 py-10 sm:px-6 lg:px-8 flex flex-col space-y-12">
        
        {/* Section 1: Overview & Algorithmic Blueprint */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 font-bold text-sm">
                01
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Algorithm Overview & Theoretical Principles
              </h2>
            </div>

            <p className="text-slate-300 leading-relaxed text-base">
              The <strong className="text-blue-400 font-semibold">Matrix Minima Method</strong> (also known as the <strong className="text-cyan-400 font-semibold">Least-Cost Method</strong> or <strong className="text-indigo-400 font-semibold">Inspection Method</strong>) is a global heuristic algorithm designed to produce an Initial Basic Feasible Solution (IBFS).
            </p>

            <div className="p-5 bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-slate-900 rounded-xl border border-blue-800/40 flex flex-col space-y-2">
              <div className="flex items-center space-x-2 text-blue-400 font-semibold text-sm">
                <span>⚡</span>
                <span>The Core Algorithmic Loop</span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                Rather than confining allocations to the top-left corner (NWCR) or to individual rows/columns, Matrix Minima repeatedly identifies the global minimum element <span className="font-mono text-cyan-300">{"c_kl = min { c_ij }"}</span> across all active rows and columns, allocates <span className="font-mono text-emerald-300">min(S_k, D_l)</span>, and removes the exhausted row or satisfied column from the search space.
              </p>
            </div>

            <div className="flex flex-col space-y-3">
              <h3 className="text-lg font-semibold text-slate-200">The 4 Key Algorithmic Invariants</h3>
              
              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-emerald-400 font-semibold text-sm">1. Non-Negativity & Feasibility</span>
                <p className="text-slate-400 text-xs sm:text-sm">
                  At every iteration, <span className="font-mono text-slate-200">x_kl = min(S_k, D_l) ≥ 0</span>, ensuring that remaining supply and demand never drop below zero.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-blue-400 font-semibold text-sm">2. Exact Basic Cell Count (m + n - 1)</span>
                <p className="text-slate-400 text-xs sm:text-sm">
                  The algorithm eliminates exactly one row or one column per allocation step, terminating in at most <span className="font-mono text-blue-300">m + n - 1</span> steps with a spanning tree basis.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-purple-400 font-semibold text-sm">3. Independence (No Closed Loops)</span>
                <p className="text-slate-400 text-xs sm:text-sm">
                  Eliminating satisfied lines prevents allocated cells from forming cyclical dependencies (loops), preserving linear independence of the basis vectors.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-amber-400 font-semibold text-sm">4. Aggressive Initial Cost Suppression</span>
                <p className="text-slate-400 text-xs sm:text-sm">
                  By routing cargo over the cheapest routes first, the total starting cost <span className="font-mono text-slate-200">Z = ∑ c_ij x_ij</span> is drastically reduced compared to arbitrary geometric methods.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Step-by-Step Interactive Matrix Reduction */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Step-by-Step Tableau Execution
              </h2>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              Step through the actual execution of Matrix Minima on a 2×3 industrial problem (Debangshu's Barrackpore-Ichapur fasteners factory). Click the step buttons to see the matrix update in real time:
            </p>

            {/* Step Selector Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {interactiveSteps.map((s, idx) => (
                <button
                  key={s.step}
                  onClick={() => setActiveStep(idx)}
                  className={clsx(
                    'py-2.5 px-3 rounded-xl text-xs font-semibold transition-all duration-200 border text-center',
                    activeStep === idx
                      ? 'bg-blue-600/30 border-blue-500 text-blue-300 shadow-md font-bold'
                      : 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  )}
                &gt;
                  Step {s.step}
                </button>
              ))}
            </div>

            {/* Interactive Tableau Display */}
            {(() => {
              const cur = interactiveSteps[activeStep];
              const costData = [
                ['₹4', '₹8', '₹6'],
                ['₹7', '₹3', '₹5'],
              ];
              const rowLabels = ['Barrackpore (S1)', 'Ichapur (S2)'];
              const colLabels = ['Kolkata (D1)', 'Jadavpur (D2)', 'Salt Lake (D3)'];

              return (
                <div className="p-5 sm:p-6 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 gap-2">
                    <h3 className="text-base font-bold text-white flex items-center space-x-2">
                      <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">
                        {cur.step}
                      </span>
                      <span>{cur.title}</span>
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300">{cur.description}</p>
                  
                  <div className="p-3 bg-blue-950/30 rounded-xl border border-blue-900/50 text-xs text-blue-300 font-medium">
                    ⚡ {cur.action}
                  </div>

                  {/* 2D Tableau */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-center text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400 bg-slate-900/60">
                          <th className="py-2.5 px-3 text-left">Origin \ Destination</th>
                          {colLabels.map((c, j) => (
                            <th
                              key={j}
                              className={clsx(
                                'py-2.5 px-3 transition-colors',
                                cur.eliminatedCol[j] ? 'text-slate-600 line-through' : 'text-slate-200'
                              )}
                            >
                              {c}
                            </th>
                          ))}
                          <th className="py-2.5 px-3 text-amber-400">Remaining Supply</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {rowLabels.map((r, i) => (
                          <tr
                            key={i}
                            className={clsx(
                              'transition-colors',
                              cur.eliminatedRow[i] ? 'bg-slate-950 text-slate-600' : 'bg-slate-900/20'
                            )}
                          >
                            <td
                              className={clsx(
                                'py-3 px-3 text-left font-medium',
                                cur.eliminatedRow[i] ? 'line-through text-slate-600' : 'text-slate-300'
                              )}
                            >
                              {r}
                            </td>
                            {costData[i].map((cost, j) => {
                              const isTarget = cur.activeCell.r === i && cur.activeCell.c === j;
                              const isDead = cur.eliminatedRow[i] || cur.eliminatedCol[j];

                              return (
                                <td
                                  key={j}
                                  className={clsx(
                                    'py-3 px-3 font-mono transition-all',
                                    isTarget
                                      ? 'bg-blue-600/30 border-2 border-blue-400 font-bold text-white rounded-lg shadow-lg'
                                      : isDead
                                      ? 'text-slate-600 line-through'
                                      : 'text-slate-300 hover:bg-slate-800/40'
                                  )}
                                >
                                  {cost}
                                  {isTarget && (
                                    <span className="block text-[10px] text-emerald-400 font-sans font-semibold mt-0.5">
                                      [Selected Cell]
                                    </span>
                                  )}
                                </td>
                              );
                            })}
                            <td className="py-3 px-3 font-mono font-bold text-amber-400">
                              {cur.rowStatus[i]}
                            </td>
                          </tr>
                        ))}
                        {/* Demand Row */}
                        <tr className="border-t-2 border-slate-800 bg-slate-900/50 font-mono">
                          <td className="py-2.5 px-3 text-left font-semibold text-emerald-400">
                            Remaining Demand
                          </td>
                          {cur.colStatus.map((st, j) => (
                            <td
                              key={j}
                              className={clsx(
                                'py-2.5 px-3 font-bold',
                                cur.eliminatedCol[j] ? 'text-slate-600 line-through' : 'text-emerald-300'
                              )}
                            >
                              {st}
                            </td>
                          ))}
                          <td className="py-2.5 px-3 text-slate-500 font-sans text-[11px]">∑ Balance</td>
                        </tr>
                      </tbody>
                    </table>
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
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-600/20 text-cyan-400 font-bold text-sm">
                03
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Visual Flowchart: The Matrix Minima Engine
              </h2>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              This flowchart illustrates how the Matrix Minima algorithm handles unexhausted submatrices, branches on line elimination, and enforces non-degeneracy:
            </p>

            {/* Semantic Animated SVG Flowchart */}
            <div className="p-4 sm:p-6 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center justify-center">
              <svg
                viewBox="0 0 740 420"
                className="w-full h-auto max-w-2xl select-none"
                aria-label="Matrix Minima Method Decision Logic"
              >
                <defs>
                  <linearGradient id="headerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0284c7" />
                    <stop offset="100%" stopColor="#0369a1" />
                  </linearGradient>
                  <linearGradient id="nodeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1e293b" />
                    <stop offset="100%" stopColor="#0f172a" />
                  </linearGradient>
                </defs>

                {/* Start Node */}
                <rect x="295" y="20" width="150" height="38" rx="19" fill="url(#headerGrad)" stroke="#38bdf8" strokeWidth="2" />
                <text x="370" y="44" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                  Start: Balance Checked
                </text>

                {/* Line 1 */}
                <line x1="370" y1="58" x2="370" y2="90" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="370,95 365,85 375,85" fill="#38bdf8" />

                {/* Node: Scan Active Cells */}
                <rect x="250" y="95" width="240" height="50" rx="10" fill="url(#nodeGrad)" stroke="#475569" strokeWidth="1.5" />
                <text x="370" y="117" fill="#f8fafc" fontSize="11" fontWeight="bold" textAnchor="middle">
                  Scan Active Submatrix
                </text>
                <text x="370" y="133" fill="#94a3b8" fontSize="10" textAnchor="middle">
                  {"Find (k, l) = argmin { c_ij }"}
                </text>

                {/* Line 2 */}
                <line x1="370" y1="145" x2="370" y2="175" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="370,180 365,170 375,170" fill="#38bdf8" />

                {/* Node: Allocate */}
                <rect x="250" y="180" width="240" height="50" rx="10" fill="url(#nodeGrad)" stroke="#10b981" strokeWidth="1.5" />
                <text x="370" y="202" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">
                  Allocate x_kl = min(S_k, D_l)
                </text>
                <text x="370" y="218" fill="#94a3b8" fontSize="10" textAnchor="middle">
                  S_k = S_k - x_kl &nbsp;|&nbsp; D_l = D_l - x_kl
                </text>

                {/* Line 3 &rarr; Branch Decision */}
                <line x1="370" y1="230" x2="370" y2="260" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="370,265 365,255 375,255" fill="#38bdf8" />

                {/* Diamond Decision */}
                <polygon points="370,265 470,305 370,345 270,305" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
                <text x="370" y="303" fill="#fbbf24" fontSize="10" fontWeight="bold" textAnchor="middle">
                  Exhaustion State?
                </text>

                {/* Branch Left: S_k == 0 only */}
                <line x1="270" y1="305" x2="140" y2="305" stroke="#94a3b8" strokeWidth="1.5" />
                <polyline points="140,305 140,340" stroke="#94a3b8" strokeWidth="1.5" />
                <polygon points="140,345 136,337 144,337" fill="#94a3b8" />
                <text x="195" y="298" fill="#cbd5e1" fontSize="9" textAnchor="middle">S_k = 0</text>

                <rect x="70" y="345" width="140" height="42" rx="8" fill="#1e293b" stroke="#334155" />
                <text x="140" y="364" fill="#e2e8f0" fontSize="10" textAnchor="middle">Cross Out Row k</text>
                <text x="140" y="378" fill="#64748b" fontSize="9" textAnchor="middle">Col l remains active</text>

                {/* Branch Right: D_l == 0 only */}
                <line x1="470" y1="305" x2="600" y2="305" stroke="#94a3b8" strokeWidth="1.5" />
                <polyline points="600,305 600,340" stroke="#94a3b8" strokeWidth="1.5" />
                <polygon points="600,345 596,337 604,337" fill="#94a3b8" />
                <text x="545" y="298" fill="#cbd5e1" fontSize="9" textAnchor="middle">D_l = 0</text>

                <rect x="530" y="345" width="140" height="42" rx="8" fill="#1e293b" stroke="#334155" />
                <text x="600" y="364" fill="#e2e8f0" fontSize="10" textAnchor="middle">Cross Out Col l</text>
                <text x="600" y="378" fill="#64748b" fontSize="9" textAnchor="middle">Row k remains active</text>

                {/* Feedback Loop to Step 1 */}
                <polyline points="140,387 140,410 40,410 40,120 245,120" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 4" />
                <polygon points="250,120 242,116 242,124" fill="#38bdf8" />
                <text x="90" y="405" fill="#38bdf8" fontSize="9">Repeat for Remainder</text>
              </svg>
            </div>
          </div>
        </section>

        {/* Section 4: 4 Real-World Case Studies */}
        <section
          ref={(el) => (sectionRefs.current[3] = el)}
          data-index="3"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                04
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                4 Industrial Applications & Case Solutions
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
                      ? 'bg-blue-600/20 border-blue-500 text-blue-300 shadow-md'
                      : 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  )}
                &gt;
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
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      {curCase.savings}
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
                          <th className="py-2 px-3">Route Link</th>
                          <th className="py-2 px-3">Unit Rate</th>
                          <th className="py-2 px-3">Volume</th>
                          <th className="py-2 px-3">Subtotal (₹)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {curCase.allocations.map((a, i) => (
                          <tr key={i} className="hover:bg-slate-900/40">
                            <td className="py-2.5 px-3 font-medium text-slate-200">{a.cell}</td>
                            <td className="py-2.5 px-3 font-mono text-emerald-400">{a.rate}</td>
                            <td className="py-2.5 px-3 font-mono text-slate-300">{a.qty}</td>
                            <td className="py-2.5 px-3 font-mono text-white font-bold">{a.cost}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Financial Comparison */}
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-3">
                    <div className="flex items-center space-x-4 text-xs">
                      <div>
                        <span className="text-slate-400 block">Matrix Minima IBFS:</span>
                        <span className="text-base font-extrabold text-emerald-400 font-mono">{curCase.totalCost}</span>
                      </div>
                      <div className="border-l border-slate-700 pl-4">
                        <span className="text-slate-400 block">NWCR Baseline:</span>
                        <span className="text-base font-extrabold text-rose-400 font-mono line-through">{curCase.nwcrCost}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-300 text-right sm:max-w-xs leading-relaxed italic">
                      "{curCase.insight}"
                    </p>
                  </div>
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
        &gt;
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
                  What happens when you have two cells with the same lowest cost ₹2? If one cell has a potential volume of 100 units and another has a volume of 10 units, why does choosing the 100-unit cell first save far more money overall?
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1 hover:bg-slate-800/70 transition-all duration-200">
                <span className="text-amber-400 font-semibold text-sm">🔍 Observe carefully...</span>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  When a row is crossed out, none of its remaining cells can ever be allocated, even if they have low unit costs. This is why you must update remaining capacities on paper cleanly before scanning for the next minimum.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1 hover:bg-slate-800/70 transition-all duration-200">
                <span className="text-emerald-400 font-semibold text-sm">⚙️ Try changing this...</span>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Try adding a flat surcharge of ₹10 to every single cell in the cost matrix. Notice that the cell selection sequence stays exactly identical! This demonstrates translation invariance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Tips & Tricks */}
        <section
          ref={(el) => (sectionRefs.current[5] = el)}
          data-index="5"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 font-bold text-sm">
                06
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Professional Tips & Operational Shortcuts
              </h2>
            </div>

            <div className="flex flex-col space-y-3">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-blue-300 font-semibold text-sm">1. Use Colored Pencils or Distinct Marks for Allocations</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Write the unit cost in small script in the upper-right corner of each cell, and place the allocated units in a bold blue circle in the center. This eliminates confusion during final cost summation.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-blue-300 font-semibold text-sm">2. Instant Degeneracy Flagging</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  If an allocation satisfies both a row and column simultaneously, write <span className="font-mono text-cyan-300">ε</span> immediately in an independent zero-cost cell. Do not wait until the MODI step to fix missing basic variables.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-blue-300 font-semibold text-sm">3. Pre-Calculate Expected Basic Variable Count</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Before starting, write <span className="font-mono text-amber-300">m + n - 1 = ...</span> at the top of your worksheet. Once finished, count your circled allocations to ensure an exact match.
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
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-600/20 text-rose-400 font-bold text-sm">
                07
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Common Mistakes Made by Beginners
              </h2>
            </div>

            <div className="flex flex-col space-y-3">
              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 flex flex-col space-y-1">
                <span className="text-rose-400 font-semibold text-sm">❌ Scanning Eliminated Cells</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Picking a ₹1 cost in a row that was already crossed out in Step 1. Always physically draw a line through exhausted rows/columns.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 flex flex-col space-y-1">
                <span className="text-rose-400 font-semibold text-sm">❌ Over-Allocating Above Remaining Capacity</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Allocating the full destination demand when the remaining origin supply is smaller. Always use <span className="font-mono text-cyan-300">min(S_k, D_l)</span>.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 flex flex-col space-y-1">
                <span className="text-rose-400 font-semibold text-sm">❌ Forgetting to Check Problem Balance</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Starting Matrix Minima without confirming <span className="font-mono text-slate-200">∑ S_i = ∑ D_j</span>. If unbalanced, a dummy row or column with cost ₹0 must be appended first.
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
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-violet-600/20 text-violet-400 font-bold text-sm">
                08
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Best Practices & Coding Standards
              </h2>
            </div>

            <div className="flex flex-col space-y-3">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-violet-300 font-semibold text-sm">1. Clean Matrix Representation</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Maintain active indices with boolean vectors (`rowActive: boolean[]`, `colActive: boolean[]`) for efficient <span className="font-mono text-cyan-300">O(1)</span> candidate validation.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-violet-300 font-semibold text-sm">2. Audit Logging</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Record an array of allocation records containing `{'{ step, cell, rate, qty, cost }'}` for full transparency and reproducible testing.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-violet-300 font-semibold text-sm">3. Automated Unit Testing</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Assert that row sums equal supply, column sums equal demand, and total cost matches expected analytical results on standard benchmarks.
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
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                09
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Quick Mastery Checklist
              </h2>
            </div>

            <div className="flex flex-col space-y-2.5">
              {[
                { title: 'Balance Confirmed', desc: 'Checked ∑ Supply = ∑ Demand (or added ₹0 dummy row/col)' },
                { title: 'Global Min Found', desc: 'Scanned active cells and selected minimum unit cost in ₹' },
                { title: 'Capacity Allocated', desc: 'Assigned x_kl = min(S_k, D_l) to the chosen cell' },
                { title: 'Balances Adjusted', desc: 'Subtracted allocated units from row and column quotas' },
                { title: 'Line Eliminated', desc: 'Crossed out exhausted row or satisfied column' },
                { title: 'Degeneracy Checked', desc: 'Verified exactly m + n - 1 basic variables exist' },
                { title: 'Cost Computed', desc: 'Calculated Z = ∑ (c_ij × x_ij) in ₹ currency accurately' },
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
              "In our quantitative analysis lectures across Kolkata, Barrackpore, and Jadavpur, I constantly remind Debangshu, Susmita, Mamata, and Mahima that the Matrix Minima Method is the workhorse of intuitive logistics. It converts an abstract mathematical linear program into an actionable, common-sense freight plan. Remember: when two cells tie for minimum cost, always allocate to the cell that moves more cargo! Moving 70 crates at ₹2 saves far more than moving 10 crates at ₹2. Keep your working clean, cross out exhausted lines neatly, and ensure your basic variable count equals m + n - 1 before applying MODI optimality tests!"
            }
          />
        </section>

        {/* Section 11: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Matrix Minima Method FAQs"
            questions={questions}
          />
        </section>

        {/* Section 12: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Matrix Minima Method"
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

export default Topic1;
