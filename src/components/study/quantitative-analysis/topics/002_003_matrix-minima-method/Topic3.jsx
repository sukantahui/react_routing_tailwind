// Topic3.jsx
import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic3_files/topic3_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic3_files/topic3_note.txt?raw';

const Topic3 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedScenario, setSelectedScenario] = useState(0);
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

  const allocationScenarios = [
    {
      title: 'Scenario 1: S_k < D_l (Origin Supply Exhaustion)',
      supply: 'S_k = 40 units (Barrackpore)',
      demand: 'D_l = 60 units (Jadavpur)',
      allocation: 'x_kl = min(40, 60) = 40 units',
      newSupply: 'S_k = 40 - 40 = 0 (Row k Exhausted & Eliminated)',
      newDemand: 'D_l = 60 - 40 = 20 units (Col l remains Active)',
      insight: 'Origin k has completely emptied its warehouse; Destination l will receive its remaining 20 units from other origins.',
    },
    {
      title: 'Scenario 2: S_k > D_l (Destination Demand Satisfaction)',
      supply: 'S_k = 70 units (Ichapur)',
      demand: 'D_l = 50 units (Kolkata)',
      allocation: 'x_kl = min(70, 50) = 50 units',
      newSupply: 'S_k = 70 - 50 = 20 units (Row k remains Active)',
      newDemand: 'D_l = 50 - 50 = 0 (Col l Satisfied & Eliminated)',
      insight: 'Destination l has received its 100% quota; Origin k retains 20 units of surplus capacity for other destinations.',
    },
    {
      title: 'Scenario 3: S_k == D_l (Simultaneous Exhaustion / Degeneracy)',
      supply: 'S_k = 50 units (Kolkata)',
      demand: 'D_l = 50 units (Salt Lake)',
      allocation: 'x_kl = min(50, 50) = 50 units',
      newSupply: 'S_k = 0 & D_l = 0 Simultaneously',
      newDemand: 'Degeneracy Protocol: Eliminate Row k, insert ε in Col l before closing',
      insight: 'Crucial: Never cross out both lines at once! Add an infinitesimal zero (ε) to an unassigned cell to maintain m + n - 1 basic variables.',
    },
  ];

  const caseStudies = [
    {
      title: 'Case 1: Industrial Fasteners Distribution (Debangshu)',
      origins: 'Barrackpore (50 tons), Ichapur (70 tons)',
      destinations: 'Kolkata (40), Jadavpur (50), Salt Lake (30)',
      allocations: [
        { step: 1, route: 'Ichapur → Jadavpur', math: 'min(70, 50) = 50', rate: '₹3', cost: '₹150', impact: 'Jadavpur demand becomes 0 (Eliminated)' },
        { step: 2, route: 'Barrackpore → Kolkata', math: 'min(50, 40) = 40', rate: '₹4', cost: '₹160', impact: 'Kolkata demand becomes 0 (Eliminated)' },
        { step: 3, route: 'Ichapur → Salt Lake', math: 'min(20, 30) = 20', rate: '₹5', cost: '₹100', impact: 'Ichapur supply becomes 0 (Eliminated)' },
        { step: 4, route: 'Barrackpore → Salt Lake', math: 'min(10, 10) = 10', rate: '₹6', cost: '₹60', impact: 'Both hit 0 (Final Balance)' },
      ],
      totalCost: '₹470',
      lesson: 'Debangshu executed 4 clean allocations, ensuring all 120 tons were dispatched with zero stock discrepancy.',
    },
    {
      title: 'Case 2: Bengal FMCG Packaged Goods (Mamata)',
      origins: 'Kolkata (60), Barrackpore (80), Ichapur (60)',
      destinations: 'Jadavpur (80), Howrah (70), Barasat (50)',
      allocations: [
        { step: 1, route: 'Ichapur → Barasat', math: 'min(60, 50) = 50', rate: '₹1', cost: '₹50', impact: 'Barasat satisfied' },
        { step: 2, route: 'Kolkata → Jadavpur', math: 'min(60, 80) = 60', rate: '₹2', cost: '₹120', impact: 'Kolkata exhausted' },
        { step: 3, route: 'Barrackpore → Howrah', math: 'min(80, 70) = 70', rate: '₹3', cost: '₹210', impact: 'Howrah satisfied' },
        { step: 4, route: 'Ichapur → Jadavpur', math: 'min(10, 20) = 10', rate: '₹5', cost: '₹50', impact: 'Ichapur exhausted' },
        { step: 5, route: 'Barrackpore → Jadavpur', math: 'min(10, 10) = 10', rate: '₹6', cost: '₹60', impact: 'All lines satisfied' },
      ],
      totalCost: '₹490',
      lesson: 'Mamata locked in 5 basic allocations, maintaining exact balance across all 200 crates.',
    },
    {
      title: 'Case 3: Hospital Oxygen Fleet (Susmita)',
      origins: 'Kolkata Central (100 cyl), Barrackpore Station (150 cyl)',
      destinations: 'Jadavpur Medical (120), Ichapur General (130)',
      allocations: [
        { step: 1, route: 'Barrackpore → Ichapur', math: 'min(150, 130) = 130', rate: '₹5', cost: '₹650', impact: 'Ichapur Hospital 100% fulfilled' },
        { step: 2, route: 'Kolkata → Jadavpur', math: 'min(100, 120) = 100', rate: '₹6', cost: '₹600', impact: 'Kolkata Central emptied' },
        { step: 3, route: 'Barrackpore → Jadavpur', math: 'min(20, 20) = 20', rate: '₹11', cost: '₹220', impact: 'Jadavpur Hospital fulfilled' },
      ],
      totalCost: '₹1,470',
      lesson: 'Susmita ensured life-critical oxygen deliveries reached hospitals without stock deficits.',
    },
    {
      title: 'Case 4: E-Commerce Locker Routing (Abhronila & Mahima)',
      origins: 'Barrackpore Hub (40), Kolkata Mega Center (60)',
      destinations: 'Ichapur (30), Jadavpur (40), Salt Lake (30)',
      allocations: [
        { step: 1, route: 'Kolkata → Ichapur', math: 'min(60, 30) = 30', rate: '₹3', cost: '₹90', impact: 'Ichapur locker filled' },
        { step: 2, route: 'Barrackpore → Jadavpur', math: 'min(40, 40) = 40', rate: '₹4', cost: '₹160', impact: 'Barrackpore & Jadavpur done' },
        { step: 3, route: 'Kolkata → Salt Lake', math: 'min(30, 30) = 30', rate: '₹5', cost: '₹150', impact: 'Salt Lake locker filled' },
      ],
      totalCost: '₹400',
      lesson: 'Abhronila and Mahima completed all 100 parcel deliveries within expected SLA at lowest freight cost.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 transition-colors duration-300 font-sans">
      {/* Header Banner */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-b border-slate-800/80">
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-blue-500/10 text-blue-400 border border-blue-500/30 mb-4 shadow-sm">
            Quantitative Analysis • Transportation Models • Topic 3
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
            The Allocation Procedure
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
            Master the mathematical mechanics of capacity assignment, line balance updates, feasibility bounds, and state transition rules.
          </p>
        </div>
      </div>

      {/* Main Container - Stacked Vertical Sections */}
      <div className="max-w-4xl mx-auto px-4 py-10 sm:px-6 lg:px-8 flex flex-col space-y-12">
        
        {/* Section 1: The Allocation Operator */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                01
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                The Core Allocation Operator: min(S_k, D_l)
              </h2>
            </div>

            <p className="text-slate-300 leading-relaxed text-base">
              Once the candidate cell <span className="font-mono text-cyan-300">(k, l)</span> is selected, the allocation procedure commits the maximum feasible physical volume to that route without violating any inventory constraints.
            </p>

            {/* Formula Block */}
            <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-sm text-slate-300 flex flex-col space-y-3">
              <div className="text-emerald-400 font-semibold">Mathematical Allocation Formula:</div>
              <div className="pl-3 border-l-2 border-emerald-500 flex flex-col space-y-1">
                <span className="text-white font-bold">x_kl = min(S_k, D_l)</span>
                <span className="text-slate-400 text-xs">
                  Where S_k = remaining supply at origin k, D_l = remaining demand at destination l
                </span>
              </div>
              <div className="text-xs text-slate-400 pt-2 border-t border-slate-900">
                State Transition:
                <br />
                • New Supply: <span className="text-amber-300">S_k(new) = S_k(old) - x_kl</span>
                <br />
                • New Demand: <span className="text-teal-300">D_l(new) = D_l(old) - x_kl</span>
                <br />
                • Cost Contribution: <span className="text-white">ΔZ = c_kl · x_kl (in ₹)</span>
              </div>
            </div>

            <div className="flex flex-col space-y-3">
              <h3 className="text-lg font-semibold text-slate-200">Why the min() Operator is Inviolable</h3>

              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-rose-400 font-semibold text-sm">Why Not Allocate More? (x_kl &gt; min(S_k, D_l))</span>
                <p className="text-slate-400 text-xs sm:text-sm">
                  Allocating more than <span className="font-mono">S_k</span> results in negative inventory (<span className="font-mono text-rose-300">S_k - x_kl &lt; 0</span>), meaning a factory attempts to ship non-existent physical goods.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-amber-400 font-semibold text-sm">Why Not Allocate Less? (x_kl &lt; min(S_k, D_l))</span>
                <p className="text-slate-400 text-xs sm:text-sm">
                  Allocating less leaves remaining capacity on both origin and destination (<span className="font-mono text-amber-300">S_k &gt; 0, D_l &gt; 0</span>), failing to eliminate either line and corrupting the <span className="font-mono">m + n - 1</span> basic spanning tree.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Interactive Allocation Scenarios */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-600/20 text-teal-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Capacity Assignment Scenarios
              </h2>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              Explore how different capacity conditions trigger distinct line elimination and degeneracy protocols:
            </p>

            {/* Scenario Tabs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {allocationScenarios.map((sc, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedScenario(idx)}
                  className={clsx(
                    'py-2.5 px-3 rounded-xl text-xs font-semibold transition-all duration-200 border text-center',
                    selectedScenario === idx
                      ? 'bg-emerald-600/30 border-emerald-500 text-emerald-300 shadow-md font-bold'
                      : 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  )}
                >
                  {sc.title.split(':')[0]}
                </button>
              ))}
            </div>

            {/* Active Scenario Card */}
            {(() => {
              const cur = allocationScenarios[selectedScenario];
              return (
                <div className="p-5 sm:p-6 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col space-y-4">
                  <h3 className="text-base font-bold text-white">{cur.title}</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-amber-400 font-semibold block mb-1">Origin Capacity:</span>
                      <p className="text-slate-300 font-mono">{cur.supply}</p>
                      <p className="text-slate-400 mt-1">{cur.newSupply}</p>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-teal-400 font-semibold block mb-1">Destination Requirement:</span>
                      <p className="text-slate-300 font-mono">{cur.demand}</p>
                      <p className="text-slate-400 mt-1">{cur.newDemand}</p>
                    </div>
                  </div>

                  <div className="p-3.5 bg-emerald-950/40 rounded-xl border border-emerald-800/50 flex flex-col space-y-1">
                    <span className="text-xs font-bold text-emerald-300">Committed Allocation:</span>
                    <p className="text-xs sm:text-sm text-slate-200 font-mono font-bold">{cur.allocation}</p>
                  </div>

                  <p className="text-xs text-slate-400 italic">
                    💡 {cur.insight}
                  </p>
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
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-600/20 text-cyan-400 font-bold text-sm">
                03
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Visual Flow: Capacity Deduction & Line Closure
              </h2>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              This diagram shows the simultaneous deduction of shipment quantities from origin inventory and destination requirement:
            </p>

            {/* Semantic SVG Diagram */}
            <div className="p-4 sm:p-6 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center justify-center">
              <svg
                viewBox="0 0 720 320"
                className="w-full h-auto max-w-2xl select-none"
                aria-label="Allocation Capacity Deduction Diagram"
              >
                <defs>
                  <linearGradient id="allocGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>

                {/* Supply Origin Box (Left) */}
                <rect x="40" y="80" width="180" height="140" rx="12" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
                <rect x="55" y="95" width="150" height="26" rx="6" fill="#78350f" />
                <text x="130" y="113" fill="#fef3c7" fontSize="11" fontWeight="bold" textAnchor="middle">
                  Origin S2 (Ichapur)
                </text>
                <text x="60" y="145" fill="#cbd5e1" fontSize="11">Initial Stock: 70 tons</text>
                <text x="60" y="170" fill="#ef4444" fontSize="11" fontWeight="bold">- 50 tons shipped</text>
                <line x1="60" y1="180" x2="200" y2="180" stroke="#334155" />
                <text x="60" y="200" fill="#10b981" fontSize="11" fontWeight="bold">Balance: 20 tons</text>

                {/* Center Allocation Pipe */}
                <g>
                  <rect x="270" y="110" width="180" height="80" rx="12" fill="url(#allocGrad)" stroke="#34d399" strokeWidth="2" />
                  <text x="360" y="138" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">
                    Commit: x_22 = 50
                  </text>
                  <text x="360" y="158" fill="#d1fae5" fontSize="10" textAnchor="middle">
                    min(70 tons, 50 tons)
                  </text>
                  <text x="360" y="176" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                    Cost = 50 × ₹3 = ₹150
                  </text>

                  {/* Flow Arrows */}
                  <line x1="220" y1="150" x2="265" y2="150" stroke="#10b981" strokeWidth="3" />
                  <polygon points="270,150 260,144 260,156" fill="#10b981" />

                  <line x1="450" y1="150" x2="495" y2="150" stroke="#10b981" strokeWidth="3" />
                  <polygon points="500,150 490,144 490,156" fill="#10b981" />
                </g>

                {/* Demand Destination Box (Right) */}
                <rect x="500" y="80" width="180" height="140" rx="12" fill="#0f172a" stroke="#06b6d4" strokeWidth="2" />
                <rect x="515" y="95" width="150" height="26" rx="6" fill="#164e63" />
                <text x="590" y="113" fill="#cffafe" fontSize="11" fontWeight="bold" textAnchor="middle">
                  Destination D2 (Jadavpur)
                </text>
                <text x="520" y="145" fill="#cbd5e1" fontSize="11">Initial Need: 50 tons</text>
                <text x="520" y="170" fill="#10b981" fontSize="11" fontWeight="bold">- 50 tons received</text>
                <line x1="520" y1="180" x2="660" y2="180" stroke="#334155" />
                <text x="520" y="200" fill="#a855f7" fontSize="11" fontWeight="bold">Balance: 0 (Satisfied!)</text>

                {/* Bottom Status Banner */}
                <rect x="160" y="260" width="400" height="34" rx="17" fill="#1e293b" stroke="#334155" />
                <text x="360" y="282" fill="#38bdf8" fontSize="11" textAnchor="middle" fontWeight="bold">
                  Column D2 is Closed &rarr; Active Search Space Reduced
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
                4 Industrial Allocation Logs
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
                      ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300 shadow-md'
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
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono">
                      Total: {curCase.totalCost}
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
                          <th className="py-2 px-3">Step</th>
                          <th className="py-2 px-3">Assigned Route</th>
                          <th className="py-2 px-3">min(S, D) Math</th>
                          <th className="py-2 px-3">Rate</th>
                          <th className="py-2 px-3">Cost (₹)</th>
                          <th className="py-2 px-3">Line Impact</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {curCase.allocations.map((a, i) => (
                          <tr key={i} className="hover:bg-slate-900/40">
                            <td className="py-2.5 px-3 font-mono text-emerald-400 font-bold">{a.step}</td>
                            <td className="py-2.5 px-3 font-medium text-slate-200">{a.route}</td>
                            <td className="py-2.5 px-3 font-mono text-cyan-300">{a.math}</td>
                            <td className="py-2.5 px-3 font-mono text-slate-300">{a.rate}</td>
                            <td className="py-2.5 px-3 font-mono text-white font-bold">{a.cost}</td>
                            <td className="py-2.5 px-3 text-slate-400 text-xs">{a.impact}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <p className="text-xs text-slate-300 italic p-3 bg-slate-900 rounded-xl border border-slate-800">
                    💡 <strong>Operational Summary:</strong> {curCase.lesson}
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
                  Why does the final allocation step always have <span className="font-mono text-cyan-300">S_final === D_final</span>? Think about how conservation of total flow ensures that all previous subtractions leave the exact same remainder.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1 hover:bg-slate-800/70 transition-all duration-200">
                <span className="text-amber-400 font-semibold text-sm">🔍 Observe carefully...</span>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Every time you commit <span className="font-mono text-amber-300">x_kl = min(S_k, D_l)</span>, at least one of the two numbers becomes exactly zero. That zero is your physical trigger to cross out that line!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1 hover:bg-slate-800/70 transition-all duration-200">
                <span className="text-emerald-400 font-semibold text-sm">⚙️ Try changing this...</span>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Try deliberately allocating 10 units less than the minimum in Step 1. Observe how you are unable to eliminate either row or column, resulting in an invalid basis with too many basic cells.
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
                <span className="text-blue-300 font-semibold text-sm">1. The "Circle & Scratch" Examination Method</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Circle the allocated value in the center of the cell, then immediately scratch out the old supply and demand balances in the margin and write the new balances.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-blue-300 font-semibold text-sm">2. Real-Time Running Cost Accumulation</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Keep a running total of freight cost: <span className="font-mono text-cyan-300">Z += qty * rate</span>. This avoids recalculating the entire product sum from scratch at the end.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-blue-300 font-semibold text-sm">3. Degeneracy Epsilon Placement</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  When simultaneous zeroing occurs, place <span className="font-mono text-amber-300">ε</span> in an unallocated cell with the lowest unit rate in that column/row to keep the initial basis near-optimal.
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
                Common Mistakes Made by Beginners
              </h2>
            </div>

            <div className="flex flex-col space-y-3">
              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 flex flex-col space-y-1">
                <span className="text-rose-400 font-semibold text-sm">❌ Allocating max(S, D) Instead of min(S, D)</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Assigning 70 units when the factory only has 50. This creates an illegal negative stock balance.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 flex flex-col space-y-1">
                <span className="text-rose-400 font-semibold text-sm">❌ Deducting from One Side Only</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Subtracting the allocated amount from the factory supply but forgetting to subtract from the city demand, leading to an arithmetic mismatch at the final step.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 flex flex-col space-y-1">
                <span className="text-rose-400 font-semibold text-sm">❌ Eliminating Both Lines Without Epsilon</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Striking out both row and column simultaneously when <span className="font-mono text-slate-200">S_k = D_l</span>, leaving only <span className="font-mono">m + n - 2</span> basic cells.
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
                Best Practices for Execution & Code
              </h2>
            </div>

            <div className="flex flex-col space-y-3">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-violet-300 font-semibold text-sm">1. Strict Atomic Allocation Operations</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Treat allocation as an atomic transaction: write decision variable, decrement origin, decrement destination, and update line activity flags in one unified block.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-violet-300 font-semibold text-sm">2. Integer Arithmetic Validation</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Assert that <span className="font-mono text-cyan-300">Number.isInteger(x_kl)</span> and <span className="font-mono text-cyan-300">x_kl &gt;= 0</span> to catch accidental NaN or floating-point division issues.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-violet-300 font-semibold text-sm">3. Basis Count Check</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Verify that the total count of allocations matches <span className="font-mono text-cyan-300">m + n - 1</span> before evaluating dual potentials.
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
                { title: 'Calculated x_kl', desc: 'Assigned x_kl = min(S_k, D_l) exactly' },
                { title: 'Deducted from Supply', desc: 'Computed S_k(new) = S_k - x_kl' },
                { title: 'Deducted from Demand', desc: 'Computed D_l(new) = D_l - x_kl' },
                { title: 'Recorded Allocation', desc: 'Circled x_kl in cell center' },
                { title: 'Eliminated Closed Line', desc: 'Crossed out row if S_k=0 or column if D_l=0' },
                { title: 'Protected Basis Count', desc: 'Injected ε if both reached zero simultaneously' },
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
              "During our operations research practicals in Barrackpore and Kolkata, Susmita and Debangshu discovered that writing down allocations with a disciplined three-beat rhythm—'Take the minimum, deduct from both margins, and strike the zero line'—eliminates 99% of student arithmetic errors. Never allocate in your head without writing the decremented balance on paper immediately. Remember: in the final step, your remaining supply and remaining demand must match to the exact integer. If they don't, you made a subtraction error earlier!"
            }
          />
        </section>

        {/* Section 11: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Allocation Procedure FAQs"
            questions={questions}
          />
        </section>

        {/* Section 12: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Allocation Procedure"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic3_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic3;
