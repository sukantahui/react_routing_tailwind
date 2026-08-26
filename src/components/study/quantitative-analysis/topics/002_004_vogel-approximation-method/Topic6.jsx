// src/components/study/quantitative-analysis/topics/002_004_vogel-approximation-method/Topic6.jsx
// React 19 Function-based Component
// Module: 002_004_vogel-approximation-method
// Topic 6: Balanced and unbalanced examples

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic6_files/topic6_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic6_files/topic6_note.txt?raw';

const Topic6 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedScenarioIdx, setSelectedScenarioIdx] = useState(0);

  const sectionRefs = useRef([]);

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

  // Scenarios for balancing simulator
  const scenarios = [
    {
      name: 'Scenario A: Naturally Balanced Network (∑ S = ∑ D = 220 tons)',
      type: 'balanced',
      badge: 'Balanced (Standard)',
      origins: ['Barrackpore Heavy (S1)', 'Ichapur Casting (S2)', 'Kolkata Yard (S3)'],
      destinations: ['Jadavpur Works (D1)', 'Salt Lake Hub (D2)', 'Howrah Rail (D3)'],
      supplies: [70, 90, 60],
      demands: [60, 80, 80],
      matrix: [
        [8, 14, 12],
        [5, 19, 10],
        [11, 13, 7],
      ],
      dummyAdded: 'None required (Total Supply 220 == Total Demand 220)',
      allocations: [
        { r: 1, c: 0, qty: 60, cost: 5 },
        { r: 1, c: 2, qty: 30, cost: 10 },
        { r: 2, c: 2, qty: 50, cost: 7 },
        { r: 2, c: 1, qty: 10, cost: 13 },
        { r: 0, c: 1, qty: 70, cost: 14 },
      ],
      totalCost: '₹2,060',
      basisCheck: '5 basic cells (matches 3 + 3 - 1 = 5)',
      managerialNote: 'All manufactured steel is fully dispatched; all project requirements are met.',
    },
    {
      name: 'Scenario B: Excess Supply (∑ S = 200 > ∑ D = 170 ➔ Dummy Column)',
      type: 'excess_supply',
      badge: 'Unbalanced: Surplus Supply',
      origins: ['Barrackpore (S1)', 'Ichapur (S2)', 'Kolkata (S3)'],
      destinations: ['Jadavpur (D1)', 'Salt Lake (D2)', 'Howrah (D3)', 'Dummy D4 (Surplus)'],
      supplies: [50, 70, 80],
      demands: [60, 50, 60, 30],
      matrix: [
        [8, 14, 12, 0],
        [5, 19, 10, 0],
        [11, 13, 7, 0],
      ],
      dummyAdded: 'Dummy Column D4 with Demand = 30 tons & rate ₹0',
      allocations: [
        { r: 0, c: 3, qty: 30, cost: 0, isDummy: true },
        { r: 0, c: 0, qty: 20, cost: 8 },
        { r: 1, c: 0, qty: 40, cost: 5 },
        { r: 1, c: 1, qty: 30, cost: 19 },
        { r: 2, c: 1, qty: 20, cost: 13 },
        { r: 2, c: 2, qty: 60, cost: 7 },
      ],
      totalCost: '₹1,780 (excluding ₹0 dummy flow)',
      basisCheck: '6 basic cells (matches 3 + 4 - 1 = 6)',
      managerialNote: '30 tons allocated to Dummy D4 represents unsold surplus inventory retained in Barrackpore storage.',
    },
    {
      name: 'Scenario C: Excess Demand (∑ D = 120 > ∑ S = 100 ➔ Dummy Row)',
      type: 'excess_demand',
      badge: 'Unbalanced: Supply Deficit',
      origins: ['Kolkata Central (S1)', 'Barrackpore Depot (S2)', 'Dummy S3 (Shortage)'],
      destinations: ['Howrah Hospital (D1)', 'Barasat Health (D2)', 'Jadavpur Hub (D3)'],
      supplies: [60, 40, 20],
      demands: [50, 40, 30],
      matrix: [
        [6, 18, 9],
        [4, 25, 15],
        [0, 0, 0],
      ],
      dummyAdded: 'Dummy Row S3 with Supply = 20 boxes & rate ₹0',
      allocations: [
        { r: 1, c: 0, qty: 40, cost: 4 },
        { r: 0, c: 0, qty: 10, cost: 6 },
        { r: 0, c: 2, qty: 30, cost: 9 },
        { r: 0, c: 1, qty: 20, cost: 18 },
        { r: 2, c: 1, qty: 20, cost: 0, isDummy: true },
      ],
      totalCost: '₹1,410 (excluding ₹0 dummy flow)',
      basisCheck: '5 basic cells (matches 3 + 3 - 1 = 5)',
      managerialNote: '20 boxes allocated from Dummy S3 indicates Barasat Health Center experiences a 20-box vaccine deficit.',
    },
  ];

  const currentScenario = scenarios[selectedScenarioIdx];

  // Case Studies
  const caseStudies = [
    {
      title: '1. Foundry Excess Steel Dispatch (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Factory supply exceeded customer orders by 30 tons. Debangshu added Dummy Destination D4 with ₹0 cost. VAM allocated 30 tons to (S1, D4), revealing Barrackpore as the optimal location to hold buffer inventory.',
      impact: 'Total Real Freight Cost Z = ₹1,780; zero inventory holding penalties.',
    },
    {
      title: '2. Cold-Chain Vaccine Shortage Allocation (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'District hospital demand (120 boxes) exceeded bio-depot stock (100 boxes). Added Dummy Row S3 (20 boxes @ ₹0). VAM assigned the 20-box deficit to Barasat, safeguarding Howrah and Jadavpur priority centers.',
      impact: 'Total Real Freight Cost Z = ₹1,410; optimal deficit rationing.',
    },
    {
      title: '3. Supermarket FMCG Balanced Fleet (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Naturally balanced 3x3 logistics network (150 pallets supply == 150 pallets demand). Direct 5-pass VAM execution without dummy lines.',
      impact: 'Total Freight Cost Z = ₹570; 5 basic cells populated.',
    },
    {
      title: '4. Educational Press Textbook Distribution (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Unbalanced university distribution network solved with full basis verification and non-degeneracy audits.',
      impact: 'Basis count verified with augmented dimension (m + n_augmented - 1).',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes dummyGlow {
          0%, 100% { border-color: rgba(245, 158, 11, 0.3); }
          50% { border-color: rgba(245, 158, 11, 0.8); }
        }
        .glow-dummy {
          animation: dummyGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
              Module 002_004 • Topic 6
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-cyan-950/80 text-cyan-400 border border-cyan-800/60">
              Dummy Line Mechanics
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Balanced and Unbalanced Examples
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive guide to resolving transportation discrepancies in Vogel's Approximation Method: constructing <span className="text-amber-400 font-semibold">Dummy Columns</span> for surplus supply, inserting <span className="text-cyan-400 font-semibold">Dummy Rows</span> for supply deficits, calculating penalties with <span className="text-emerald-400 font-mono font-semibold">₹0 unit costs</span>, and interpreting real-world shortage/surplus allocations.
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'theory', label: '1. Balancing Principles' },
              { id: 'interactive', label: '2. Interactive Scenario Simulator' },
              { id: 'managerial-meaning', label: '3. Managerial Interpretation' },
              { id: 'svg-diagram', label: '4. Dummy Mechanics SVG' },
              { id: 'case-studies', label: '5. Bengal Case Studies' },
              { id: 'pitfalls', label: '6. Common Pitfalls' },
              { id: 'hints', label: '7. Guided Hints' },
              { id: 'checklist', label: '8. Revision Checklist' },
            ].map((item, idx) => (
              <button
                key={item.id}
                onClick={() => {
                  sectionRefs.current[idx]?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={clsx(
                  'px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 border',
                  activeSection === idx
                    ? 'bg-amber-600 text-white border-amber-500 shadow-md shadow-amber-900/40'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
                )}
              &gt;
                {item.label}
              </button>
            ))}
          </div>
        </header>

        {/* SECTION 1: Balancing Principles */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 font-bold text-sm">
                01
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Balancing Principles & Mathematical Conditions
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Standard transportation linear programming models require exact equality between total origin capacity and total destination demand. When imbalance occurs, fictitious dummy lines re-establish feasibility:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-emerald-800/40 flex flex-col space-y-2">
                <span className="text-emerald-300 font-bold">1. Balanced Problem</span>
                <div className="p-2 bg-slate-950 rounded font-mono text-emerald-300 text-xs">
                  ∑ Sᵢ = ∑ Dⱼ
                </div>
                <p className="text-slate-300">
                  Total factory capacity equals total market demand. VAM runs directly on the original tableau without modification.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-amber-800/40 flex flex-col space-y-2">
                <span className="text-amber-300 font-bold">2. Excess Supply (Surplus)</span>
                <div className="p-2 bg-slate-950 rounded font-mono text-amber-300 text-xs">
                  ∑ Sᵢ &gt; ∑ Dⱼ ➔ Add Dummy Col
                </div>
                <p className="text-slate-300">
                  Add Dummy Destination <span className="font-mono text-white">D_(n+1)</span> with <span className="font-mono text-white">Demand = ∑ Sᵢ - ∑ Dⱼ</span> and unit costs <span className="font-mono text-amber-400">c_i,dummy = ₹0</span>.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-cyan-800/40 flex flex-col space-y-2">
                <span className="text-cyan-300 font-bold">3. Excess Demand (Deficit)</span>
                <div className="p-2 bg-slate-950 rounded font-mono text-cyan-300 text-xs">
                  ∑ Dⱼ &gt; ∑ Sᵢ ➔ Add Dummy Row
                </div>
                <p className="text-slate-300">
                  Add Dummy Origin <span className="font-mono text-white">S_(m+1)</span> with <span className="font-mono text-white">Supply = ∑ Dⱼ - ∑ Sᵢ</span> and unit costs <span className="font-mono text-cyan-400">c_dummy,j = ₹0</span>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Interactive Scenario Simulator */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-dummy">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 font-bold text-sm">
                  02
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Interactive Balancing & VAM Simulator
                </h2>
              </div>
              <span className="text-xs text-amber-400 font-mono bg-amber-950 px-3 py-1 rounded-full border border-amber-800">
                {currentScenario.badge}
              </span>
            </div>

            {/* Scenario Selector */}
            <div className="flex flex-wrap gap-2">
              {scenarios.map((sc, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedScenarioIdx(idx)}
                  className={clsx(
                    'px-3.5 py-2 rounded-lg text-xs font-semibold transition-all border text-left',
                    selectedScenarioIdx === idx
                      ? 'bg-amber-600 text-white border-amber-400 shadow-md'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                  )}
                &gt;
                  {sc.name.split('(')[0]}
                </button>
              ))}
            </div>

            <p className="text-xs sm:text-sm text-slate-300">
              <strong className="text-white">{currentScenario.name}</strong>
            </p>

            {/* Tableau */}
            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-4">
              <table className="w-full text-center border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2 text-left font-semibold text-slate-300">Origins \ Dests</th>
                    {currentScenario.destinations.map((d, dIdx) => (
                      <th
                        key={dIdx}
                        className={clsx(
                          'p-2 font-semibold',
                          d.includes('Dummy') ? 'text-amber-400 bg-amber-950/40 rounded-t' : 'text-cyan-300'
                        )}
                      >
                        {d}
                      </th>
                    ))}
                    <th className="p-2 font-semibold text-amber-300">Supply</th>
                  </tr>
                </thead>
                <tbody>
                  {currentScenario.origins.map((orig, rIdx) => {
                    const isDummyRow = orig.includes('Dummy');
                    return (
                      <tr key={rIdx} className={clsx('border-b border-slate-800/60', isDummyRow && 'bg-amber-950/20')}>
                        <td className={clsx('p-2.5 text-left font-medium', isDummyRow ? 'text-amber-400' : 'text-slate-200')}>
                          {orig}
                        </td>
                        {currentScenario.matrix[rIdx].map((cost, cIdx) => {
                          const matchingAlloc = currentScenario.allocations.find((a) => a.r === rIdx && a.c === cIdx);
                          const isDummyCell = matchingAlloc && matchingAlloc.isDummy;

                          return (
                            <td key={cIdx} className="p-2">
                              <div
                                className={clsx(
                                  'p-2 rounded-lg font-mono font-bold transition-all border flex flex-col items-center justify-center',
                                  isDummyCell
                                    ? 'bg-amber-950 text-amber-300 border-amber-600 shadow-md'
                                    : matchingAlloc
                                    ? 'bg-emerald-950/80 text-emerald-300 border-emerald-600'
                                    : 'bg-slate-900 text-slate-400 border-slate-800'
                                )}
                              >
                                {matchingAlloc && (
                                  <span className="text-[10px] font-extrabold bg-slate-950 text-white px-1.5 py-0.5 rounded mb-1">
                                    Alloc: {matchingAlloc.qty}
                                  </span>
                                )}
                                <span>₹{cost}</span>
                              </div>
                            </td>
                          );
                        })}
                        <td className="p-2 font-mono font-bold text-amber-300">
                          {currentScenario.supplies[rIdx]}
                        </td>
                      </tr>
                    );
                  })}
                  <tr className="bg-slate-900/40 text-slate-300 font-mono">
                    <td className="p-2.5 text-left font-semibold text-amber-300">Demand</td>
                    {currentScenario.demands.map((dm, dmIdx) => (
                      <td key={dmIdx} className="p-2 font-bold text-amber-300">
                        {dm}
                      </td>
                    ))}
                    <td className="p-2 font-bold text-white">
                      ∑ {currentScenario.supplies.reduce((a, b) => a + b, 0)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Scenario Breakdown Card */}
            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-2 text-xs sm:text-sm">
              <p className="text-slate-300">• <strong>Balancing Action:</strong> {currentScenario.dummyAdded}</p>
              <p className="text-slate-300">• <strong>Total Real Transportation Cost Z:</strong> <span className="font-mono text-emerald-400 font-bold">{currentScenario.totalCost}</span></p>
              <p className="text-slate-300">• <strong>Basis Count Verification:</strong> {currentScenario.basisCheck}</p>
              <p className="text-amber-300">• <strong>Managerial Interpretation:</strong> {currentScenario.managerialNote}</p>
            </div>
          </div>
        </section>

        {/* SECTION 3: Managerial Interpretation */}
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
                Managerial Meaning of Dummy Allocations
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-amber-800/40 flex flex-col space-y-2">
                <span className="text-amber-300 font-bold">Allocation to Dummy Destination (Column)</span>
                <p className="text-slate-300">
                  Indicates <strong>surplus warehouse inventory</strong> that will remain in factory storage and will not be dispatched. Helps operations directors decide which plant should dial down production.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-cyan-800/40 flex flex-col space-y-2">
                <span className="text-cyan-300 font-bold">Allocation from Dummy Origin (Row)</span>
                <p className="text-slate-300">
                  Indicates an <strong>unmet customer shortage</strong> (deficit). Informs commercial managers which markets will receive partial shipments or backorders during supply shortages.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Dummy Mechanics SVG */}
        <section
          ref={(el) => (sectionRefs.current[3] = el)}
          data-index="3"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-600/20 text-teal-400 font-bold text-sm">
                04
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Dummy Balancing Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 280"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Imbalance Decision Block */}
                <rect x="50" y="90" width="180" height="90" rx="10" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="140" y="125" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle">Balance Audit</text>
                <text x="140" y="150" fill="#cbd5e1" fontSize="11" fontFamily="monospace" textAnchor="middle">∑ Sᵢ ≠ ∑ Dⱼ</text>

                {/* Arrow to Supply Excess */}
                <path d="M 230 115 L 320 65" stroke="#f59e0b" strokeWidth="2" />
                <polygon points="320,65 310,65 315,73" fill="#f59e0b" />
                <text x="280" y="80" fill="#94a3b8" fontSize="10">Supply &gt; Demand</text>

                {/* Supply Excess Action */}
                <rect x="330" y="30" width="360" height="70" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                <text x="510" y="55" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">Add Dummy Destination Column D_(n+1)</text>
                <text x="510" y="75" fill="#ffffff" fontSize="10" fontFamily="monospace" textAnchor="middle">Demand = ∑ Sᵢ - ∑ Dⱼ | Cost c_i,dummy = ₹0</text>

                {/* Arrow to Demand Excess */}
                <path d="M 230 155 L 320 205" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="320,205 315,197 310,205" fill="#38bdf8" />
                <text x="280" y="195" fill="#94a3b8" fontSize="10">Demand &gt; Supply</text>

                {/* Demand Excess Action */}
                <rect x="330" y="170" width="360" height="70" rx="8" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="2" />
                <text x="510" y="195" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">Add Dummy Origin Row S_(m+1)</text>
                <text x="510" y="215" fill="#ffffff" fontSize="10" fontFamily="monospace" textAnchor="middle">Supply = ∑ Dⱼ - ∑ Sᵢ | Cost c_dummy,j = ₹0</text>
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 5: Real-World Bengal Case Studies */}
        <section
          ref={(el) => (sectionRefs.current[4] = el)}
          data-index="4"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 font-bold text-sm">
                05
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Bengal Logistics Case Studies
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {caseStudies.map((cs, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedExample(idx)}
                  className={clsx(
                    'px-4 py-2.5 rounded-xl text-xs font-semibold transition-all border text-left',
                    selectedExample === idx
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500 shadow-md'
                      : 'bg-slate-800/60 text-slate-400 border-slate-700 hover:bg-slate-800'
                  )}
                &gt;
                  {cs.title.split('(')[0]}
                </button>
              ))}
            </div>

            {(() => {
              const cs = caseStudies[selectedExample];
              return (
                <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-3 text-xs sm:text-sm">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <h3 className="font-bold text-white text-base">{cs.title}</h3>
                    <span className="text-amber-400 font-mono">{cs.lead}</span>
                  </div>
                  <p className="text-slate-300">{cs.desc}</p>
                  <p className="text-emerald-300 font-semibold">{cs.impact}</p>
                </div>
              );
            })()}
          </div>
        </section>

        {/* SECTION 6: Common Pitfalls */}
        <section
          ref={(el) => (sectionRefs.current[5] = el)}
          data-index="5"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-600/20 text-rose-400 font-bold text-sm">
                06
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Common Beginner Mistakes
              </h2>
            </div>

            <div className="flex flex-col space-y-2.5">
              {[
                {
                  trap: 'Forgetting to Include ₹0 in Line Penalties',
                  fix: 'When a dummy line is present, ₹0 is the smallest entry. In rows/cols intersecting the dummy, penalty = old lowest cost - ₹0.',
                },
                {
                  trap: 'Adding Dummy Costs into Total Cost Z',
                  fix: 'Shipments allocated to dummy cells have unit rate ₹0 and contribute ₹0 to the final bill.',
                },
                {
                  trap: 'Using Wrong Basis Count Formula',
                  fix: 'Remember to count the dummy line as an additional dimension: Basis Count = m + n_augmented - 1.',
                },
              ].map((p, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1">
                  <span className="text-rose-400 font-semibold text-xs sm:text-sm">⚠️ {p.trap}</span>
                  <p className="text-xs text-slate-300"><strong>Correction:</strong> {p.fix}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: Guided Hints */}
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
                Guided Hints
              </h2>
            </div>

            <div className="flex flex-col space-y-3">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-amber-300 font-semibold text-sm">💡 Think about…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Think about why a dummy column has penalty ₹0: since all its cells are ₹0, the allocator has no preference among factories for holding inventory.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully that adding a dummy line converts any unbalanced problem into an exact mathematical balance, ensuring full feasibility throughout all VAM iterations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: Revision Checklist */}
        <section
          ref={(el) => (sectionRefs.current[7] = el)}
          data-index="7"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                08
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Student Revision Checklist (Topic 6)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Verified Sum(Supply) and Sum(Demand)',
                'Added Dummy Column for excess supply with rate ₹0',
                'Added Dummy Row for excess demand with rate ₹0',
                'Factored ₹0 into row/column penalty calculations',
                'Executed VAM allocations on augmented matrix',
                'Excluded ₹0 dummy shipments from total cost Z',
                'Confirmed basis count equals m + n_augmented - 1',
              ].map((text, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-800/40 border border-slate-700/60 flex items-center space-x-3">
                  <span className="text-emerald-400">✅</span>
                  <span className="text-xs sm:text-sm text-slate-300">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 9: Teacher's Note */}
        <section className="flex flex-col space-y-6">
          <Teacher
            note={
              "In real-world logistics across West Bengal, supply and demand are rarely equal on paper! Factories in Barrackpore may produce 200 tons while Kolkata and Jadavpur only need 170 tons. I teach Debangshu, Mamata, Mahima, Susmita, and Abhronila to welcome unbalanced problems with confidence. Introducing a ₹0 dummy column or dummy row takes less than 30 seconds, and VAM will automatically tell you where to store your unsold surplus or which customer will face a temporary delay. Always remember: dummy shipments cost ₹0, but they are full citizens of your basic feasible solution!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Balanced and Unbalanced Examples FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Balanced and Unbalanced Examples (Vogel's Approximation Method)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic7_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic6;
