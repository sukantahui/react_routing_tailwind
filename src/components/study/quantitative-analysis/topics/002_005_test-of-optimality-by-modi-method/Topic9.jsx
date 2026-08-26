// src/components/study/quantitative-analysis/topics/002_005_test-of-optimality-by-modi-method/Topic9.jsx
// React 19 Function-based Component
// Module: 002_005_test-of-optimality-by-modi-method
// Topic 9: Repeated MODI iterations

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic9_files/topic9_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic9_files/topic9_note.txt?raw';

const Topic9 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [iterStep, setIterStep] = useState(0); // 0, 1, 2

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

  // Multi-Iteration Walkthrough Data
  const iterationStages = [
    {
      iter: 0,
      name: 'Iteration 0: Initial NWCR Tableau (Pre-Audit)',
      cost: '₹2,740',
      savings: '₹0',
      badge: 'Sub-Optimal (Pre-Optimization)',
      badgeColor: 'bg-rose-950 text-rose-300 border-rose-800',
      description: 'Initial NWCR allocations: (1,1)=60, (1,2)=10, (2,2)=70, (2,3)=20, (3,3)=60. MODI audit reveals entering candidate cell (2, 1) with d₂₁ = -₹8.',
      allocations: [
        [ { qty: 60, cost: 8, isBasic: true }, { qty: 10, cost: 14, isBasic: true }, { qty: 0, cost: 12, isBasic: false, d: '+₹7' } ],
        [ { qty: 0, cost: 5, isBasic: false, d: '-₹8 (ENTER ⭐)' }, { qty: 70, cost: 19, isBasic: true }, { qty: 20, cost: 10, isBasic: true } ],
        [ { qty: 0, cost: 11, isBasic: false, d: '+₹1' }, { qty: 0, cost: 13, isBasic: false, d: '-₹3' }, { qty: 60, cost: 7, isBasic: true } ],
      ],
      pivotAction: 'Pivot 1: Trace loop for (2, 1) ➔ θ = 60 tons ➔ Saves ₹480!',
    },
    {
      iter: 1,
      name: 'Iteration 1: Intermediate Improved Tableau',
      cost: '₹2,260',
      savings: '₹480 (17.52%)',
      badge: 'Intermediate (Sub-Optimal)',
      badgeColor: 'bg-amber-950 text-amber-300 border-amber-800',
      description: 'After Pivot 1, cell (2, 1) has 60 tons and cell (1, 1) dropped to 0. Re-computing u-v potentials reveals another negative evaluation: cell (3, 2) with d₃₂ = -₹3!',
      allocations: [
        [ { qty: 0, cost: 8, isBasic: false, d: '+₹8' }, { qty: 70, cost: 14, isBasic: true }, { qty: 0, cost: 12, isBasic: false, d: '+₹7' } ],
        [ { qty: 60, cost: 5, isBasic: true }, { qty: 10, cost: 19, isBasic: true }, { qty: 20, cost: 10, isBasic: true } ],
        [ { qty: 0, cost: 11, isBasic: false, d: '+₹9' }, { qty: 0, cost: 13, isBasic: false, d: '-₹3 (ENTER ⭐)' }, { qty: 60, cost: 7, isBasic: true } ],
      ],
      pivotAction: 'Pivot 2: Trace loop for (3, 2) ➔ θ = 10 tons ➔ Saves ₹200 more!',
    },
    {
      iter: 2,
      name: 'Iteration 2: Final Optimal Tableau (Global Minimum)',
      cost: '₹2,060',
      savings: '₹680 Total (24.82%)',
      badge: 'Certified Global Minimum ⭐',
      badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-800',
      description: 'After Pivot 2, cell (3, 2) has 10 tons and cell (2, 2) dropped to 0. All empty opportunity costs evaluate to d ≥ 0 (+₹8, +₹7, +₹5, +₹2). OPTIMALITY PROVEN!',
      allocations: [
        [ { qty: 0, cost: 8, isBasic: false, d: '+₹8' }, { qty: 70, cost: 14, isBasic: true }, { qty: 0, cost: 12, isBasic: false, d: '+₹7' } ],
        [ { qty: 60, cost: 5, isBasic: true }, { qty: 0, cost: 19, isBasic: false, d: '+₹3' }, { qty: 30, cost: 10, isBasic: true } ],
        [ { qty: 0, cost: 11, isBasic: false, d: '+₹9' }, { qty: 10, cost: 13, isBasic: true }, { qty: 50, cost: 7, isBasic: true } ],
      ],
      pivotAction: 'TERMINATE: All d_ij ≥ 0. Minimum Total Cost Z = ₹2,060.',
    },
  ];

  const currentStage = iterationStages[iterStep];

  // Case Studies
  const caseStudies = [
    {
      title: '1. Foundry 2-Iteration Global Minimum (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Executed 2 sequential MODI iterations starting from NWCR: ₹2,740 ➔ ₹2,260 (Iter 1) ➔ ₹2,060 (Iter 2). Achieved verified cost minimization saving ₹680 (24.8%) per batch.',
      lesson: 'Multi-pass iterations systematically unlock optimal network routing.',
    },
    {
      title: '2. Cold-Chain Vaccine Sequential Optimization (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Ran 2 iterations on a regional health logistics matrix, saving ₹120 in pass 1 and ₹60 in pass 2 to reach certified minimal expenditure of ₹2,190.',
      lesson: 'Sequential pivots ensure complete fiduciary compliance for hospital budgets.',
    },
    {
      title: '3. Supermarket FMCG Iteration Count Comparison (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Compared initial methods: NWCR took 2 iterations, LCM took 1 iteration, and VAM took 0 iterations, proving VAM saves maximum computation time in retail logistics.',
      lesson: 'High-quality starting heuristics minimize the number of required MODI iterations.',
    },
    {
      title: '4. Educational Press Complete Audit Trail (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Delivered full multi-tableau documentation (Tableau 0, Tableau 1, Tableau 2) to university procurement auditors, proving 100% mathematical optimality.',
      lesson: 'Multi-iteration audit trails provide irrefutable evidence of lowest-cost procurement.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes iterGlow {
          0%, 100% { border-color: rgba(59, 130, 246, 0.3); }
          50% { border-color: rgba(59, 130, 246, 0.8); }
        }
        .glow-iter {
          animation: iterGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
              Module 002_005 • Topic 9
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-blue-950/80 text-blue-400 border border-blue-800/60">
              Convergence Dynamics & Multi-Pass Solving
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Repeated MODI Iterations
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            Mastering the multi-pass optimization cycle: executing sequential simplex transitions (<span className="text-blue-400 font-mono">T₀ ➔ T₁ ➔ T₂</span>), recomputing dual potentials at each pass, tracking <span className="text-emerald-400 font-semibold">monotonic cost convergence</span>, and certifying final termination.
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'pipeline', label: '1. Multi-Pass Pipeline' },
              { id: 'interactive-simulator', label: '2. Multi-Iteration Simulator' },
              { id: 'method-comparison', label: '3. Initial Method Comparison' },
              { id: 'svg-convergence', label: '4. Convergence Landscape SVG' },
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
                    ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-900/40'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
                )}
              &gt;
                {item.label}
              </button>
            ))}
          </div>
        </header>

        {/* SECTION 1: Multi-Pass Pipeline */}
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
                The Multi-Pass Iterative Pipeline
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Industrial transportation problems require sequential passes until every single empty cell satisfies <span className="font-mono text-emerald-400">dᵢⱼ ≥ 0</span>:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-rose-400 font-bold">Pass 0: Initial Basis</span>
                <p className="text-slate-300">Initial NWCR plan costing ₹2,740. Audit finds d₂₁ = -₹8 (Sub-optimal).</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-amber-400 font-bold">Pass 1: Intermediate Basis</span>
                <p className="text-slate-300">Pivots θ = 60 tons ➔ Cost drops to ₹2,260. Re-audit finds d₃₂ = -₹3.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-emerald-400 font-bold">Pass 2: Certified Optimum</span>
                <p className="text-slate-300">Pivots θ = 10 tons ➔ Cost drops to ₹2,060. All dᵢⱼ ≥ 0 ➔ Terminate!</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Interactive Multi-Iteration Simulator */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-iter">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 font-bold text-sm">
                  02
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Interactive Multi-Iteration Simulator
                </h2>
              </div>
              <div className="flex items-center gap-1.5">
                {[0, 1, 2].map((st) => (
                  <button
                    key={st}
                    onClick={() => setIterStep(st)}
                    className={clsx(
                      'px-3 py-1 rounded text-xs font-semibold transition-all border',
                      iterStep === st
                        ? 'bg-blue-600 text-white border-blue-400 shadow-md'
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                    )}
                  &gt;
                    Iteration {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-white">{currentStage.name}</h3>
                <span className="text-xs text-slate-400">{currentStage.description}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={clsx('px-3 py-1 rounded-full text-xs font-mono font-bold border', currentStage.badgeColor)}>
                  Cost: {currentStage.cost}
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold">
                  (Savings: {currentStage.savings})
                </span>
              </div>
            </div>

            {/* Tableau */}
            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-center border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2 text-left font-semibold text-slate-300">Origins \ Dests</th>
                    <th className="p-2 font-semibold text-cyan-300">Jadavpur (D1)</th>
                    <th className="p-2 font-semibold text-cyan-300">Salt Lake (D2)</th>
                    <th className="p-2 font-semibold text-cyan-300">Howrah (D3)</th>
                    <th className="p-2 font-semibold text-amber-300">Supply</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Barrackpore (S1)', s: 70 },
                    { name: 'Ichapur (S2)', s: 90 },
                    { name: 'Kolkata (S3)', s: 60 },
                  ].map((row, rIdx) => (
                    <tr key={rIdx} className="border-b border-slate-800/60">
                      <td className="p-2.5 text-left font-medium text-slate-200">{row.name}</td>
                      {currentStage.allocations[rIdx].map((cell, cIdx) => (
                        <td key={cIdx} className="p-2">
                          <div
                            className={clsx(
                              'p-2 rounded-lg font-mono font-bold transition-all border flex flex-col items-center justify-center',
                              cell.isBasic
                                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-600'
                                : cell.d && cell.d.includes('-')
                                ? 'bg-rose-950 text-rose-300 border-rose-500 animate-pulse'
                                : 'bg-slate-900 text-slate-400 border-slate-800'
                            )}
                          >
                            {cell.isBasic && (
                              <span className="text-[10px] font-extrabold bg-slate-950 text-amber-300 px-1.5 py-0.5 rounded mb-1">
                                x = {cell.qty} tons
                              </span>
                            )}
                            {cell.d && (
                              <span className="text-[10px] font-extrabold bg-slate-950 text-rose-300 px-1.5 py-0.5 rounded mb-1 border border-rose-800">
                                d = {cell.d}
                              </span>
                            )}
                            <span>₹{cell.cost}</span>
                          </div>
                        </td>
                      ))}
                      <td className="p-2 font-mono font-bold text-amber-300">{row.s}</td>
                    </tr>
                  ))}
                  <tr className="bg-slate-900/40 text-slate-300 font-mono">
                    <td className="p-2.5 text-left font-semibold text-amber-300">Demand</td>
                    <td className="p-2 font-bold text-amber-300">60</td>
                    <td className="p-2 font-bold text-amber-300">80</td>
                    <td className="p-2 font-bold text-amber-300">80</td>
                    <td className="p-2 font-bold text-white">∑ 220</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Pivot Action Summary */}
            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex items-center justify-between text-xs sm:text-sm">
              <span className="text-emerald-300 font-semibold">⚡ Iteration Action:</span>
              <span className="font-mono text-white">{currentStage.pivotAction}</span>
            </div>
          </div>
        </section>

        {/* SECTION 3: Initial Method Comparison */}
        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          data-index="2"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-600/20 text-purple-400 font-bold text-sm">
                03
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Initial Heuristic Convergence Comparison
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-300 bg-slate-950">
                    <th className="p-3 font-semibold">Initial Heuristic Method</th>
                    <th className="p-3 font-semibold text-amber-300">Initial Cost (Z₀)</th>
                    <th className="p-3 font-semibold text-cyan-300">MODI Iterations Needed</th>
                    <th className="p-3 font-semibold text-emerald-300">Total Computational Overhead</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="p-3 font-medium text-white">North-West Corner Rule</td>
                    <td className="p-3 font-mono text-rose-300">₹2,740</td>
                    <td className="p-3 font-mono text-amber-300">2 Iterations</td>
                    <td className="p-3 text-rose-300">Heavy (2 loops, 2 u-v recalculations)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-white">Least Cost Method</td>
                    <td className="p-3 font-mono text-amber-300">₹2,480</td>
                    <td className="p-3 font-mono text-cyan-300">1 Iteration</td>
                    <td className="p-3 text-amber-300">Moderate (1 loop pivot)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-white">Vogel's Approximation (VAM)</td>
                    <td className="p-3 font-mono text-emerald-300 font-bold">₹2,060</td>
                    <td className="p-3 font-mono text-emerald-300 font-bold">0 Iterations</td>
                    <td className="p-3 text-emerald-300 font-bold">Zero (Instantly Optimal on Step 1!)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 4: Convergence Landscape SVG */}
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
                Monotonic Convergence Down the Cost Landscape
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 260"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Step 0 */}
                <circle cx="120" cy="60" r="16" fill="#be123c" stroke="#fb7185" strokeWidth="2" />
                <text x="120" y="95" fill="#fb7185" fontSize="11" fontWeight="bold" textAnchor="middle">T₀ (NWCR)</text>
                <text x="120" y="112" fill="#cbd5e1" fontSize="10" fontFamily="monospace" textAnchor="middle">Z = ₹2,740</text>

                {/* Arrow 1 */}
                <line x1="136" y1="65" x2="350" y2="120" stroke="#f59e0b" strokeWidth="3" />
                <polygon points="350,120 338,115 342,125" fill="#f59e0b" />
                <text x="240" y="80" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">Iter 1: Saves ₹480</text>

                {/* Step 1 */}
                <circle cx="370" cy="130" r="16" fill="#d97706" stroke="#fde047" strokeWidth="2" />
                <text x="370" y="165" fill="#fde047" fontSize="11" fontWeight="bold" textAnchor="middle">T₁ (Iter 1)</text>
                <text x="370" y="182" fill="#cbd5e1" fontSize="10" fontFamily="monospace" textAnchor="middle">Z = ₹2,260</text>

                {/* Arrow 2 */}
                <line x1="386" y1="135" x2="590" y2="190" stroke="#10b981" strokeWidth="3" />
                <polygon points="590,190 578,185 582,195" fill="#10b981" />
                <text x="490" y="150" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">Iter 2: Saves ₹200</text>

                {/* Step 2 (Terminal Optimal) */}
                <circle cx="610" cy="200" r="18" fill="#064e3b" stroke="#34d399" strokeWidth="2.5" />
                <text x="610" y="235" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">T₂ (Optimal ⭐)</text>
                <text x="610" y="250" fill="#ffffff" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">Min Z = ₹2,060</text>
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
                Bengal Logistics Multi-Iteration Case Studies
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
                  <p className="text-blue-300 font-semibold">💡 <strong>Operations Takeaway:</strong> {cs.lesson}</p>
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
                  trap: 'Stopping Optimization Early After 1 Iteration',
                  fix: 'Do not stop just because the cost dropped! Continue iterating until ALL opportunity costs satisfy d_ij ≥ 0.',
                },
                {
                  trap: 'Forgetting to Compute Fresh Potentials for Tableau II',
                  fix: 'Every iteration tableau represents a new basis and MUST have its own dedicated u\' and v\' potentials computed.',
                },
                {
                  trap: 'Failing to Number Iteration Tableaus Clearly',
                  fix: 'Label tableaus sequentially as Tableau 0, Tableau 1, Tableau 2 to keep working steps organized for examiners.',
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
                  Think about why VAM is so universally preferred by logistics consultants: starting with VAM often skips all intermediate iterations, taking you straight to Tableau 2 on step 1!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully that in Iteration 2, cell (3, 2) became the entering candidate because changing the basis in Iteration 1 shifted the dual potentials, turning cell (3, 2) negative!
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
                Student Revision Checklist (Topic 9)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Tracked multi-pass convergence pipeline (T_0 ➔ T_1 ➔ T_2)',
                'Solved fresh u\' and v\' potentials for each new iteration tableau',
                'Evaluated opportunity costs d\'_{ij} at each iteration pass',
                'Executed loop pivoting and flow updates for each sub-optimal state',
                'Verified monotonic cost decrease across iterations (Z_0 &gt; Z_1 > Z_2)',
                'Terminated when all d_ij ≥ 0 and certified final minimum cost Z',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: mastering repeated MODI iterations is what separates an amateur from a true quantitative operations master! When you finish Iteration 1 and see that another opportunity cost is negative, do not get discouraged. That negative sign is your roadmap to even greater savings! Recompute your potentials, trace your second loop, and pivot again. When you reach that final tableau where every single dᵢⱼ is non-negative, you have reached the summit of mathematical cost leadership!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Repeated MODI Iterations FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Repeated MODI Iterations (MODI Method)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic10_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic9;
