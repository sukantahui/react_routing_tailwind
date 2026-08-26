// src/components/study/quantitative-analysis/topics/002_004_vogel-approximation-method/Topic8.jsx
// React 19 Function-based Component
// Module: 002_004_vogel-approximation-method
// Topic 8: Numerical exercises

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic8_files/topic8_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic8_files/topic8_note.txt?raw';

const Topic8 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [activeExerciseIdx, setActiveExerciseIdx] = useState(0);
  const [showSolution, setShowSolution] = useState(false);

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

  // Exercise Data Sets
  const exercises = [
    {
      id: 'ex1',
      name: 'Exercise 1: Standard Balanced 3 × 3 Network',
      type: 'Balanced 3x3',
      origins: ['Barrackpore (S1)', 'Ichapur (S2)', 'Kolkata (S3)'],
      destinations: ['Jadavpur (D1)', 'Salt Lake (D2)', 'Howrah (D3)'],
      supplies: [30, 50, 20],
      demands: [30, 40, 30],
      matrix: [
        [6, 8, 4],
        [4, 9, 3],
        [8, 5, 2],
      ],
      solutionSteps: [
        'Pass 1: Max Penalty = ₹3 at Row 3. Allocate x_33 = min(20, 30) = 20 @ ₹2. Row 3 struck out.',
        'Pass 2: Max Penalty = ₹5 at Row 2. Allocate x_23 = min(50, 10) = 10 @ ₹3. Col 3 struck out.',
        'Pass 3: Allocate x_21 = min(40, 30) = 30 @ ₹4. Col 1 struck out.',
        'Pass 4: Allocate x_22 = 10 @ ₹9 and x_12 = 30 @ ₹8.',
      ],
      allocations: [
        { r: 0, c: 1, qty: 30, cost: 8 },
        { r: 1, c: 0, qty: 30, cost: 4 },
        { r: 1, c: 1, qty: 10, cost: 9 },
        { r: 1, c: 2, qty: 10, cost: 3 },
        { r: 2, c: 2, qty: 20, cost: 2 },
      ],
      totalCost: '₹520',
      nwcrCost: '₹760',
      savings: '₹240 (31.6% savings over NWCR)',
      basisCheck: '5 basic cells (matches 3 + 3 - 1 = 5)',
    },
    {
      id: 'ex2',
      name: 'Exercise 2: Degenerate 2 × 3 Network (Simultaneous Zero)',
      type: 'Degenerate 2x3',
      origins: ['Depot North (S1)', 'Depot South (S2)'],
      destinations: ['Market A (D1)', 'Market B (D2)', 'Market C (D3)'],
      supplies: [60, 40],
      demands: [30, 40, 30],
      matrix: [
        [3, 8, 5],
        [6, 4, 7],
      ],
      solutionSteps: [
        'Pass 1: Max Penalty = ₹4 at Col 2. Allocate x_22 = min(40, 40) = 40 @ ₹4. Cross Row 2 only; leave Col 2 active with 0.',
        'Pass 2: Allocate x_11 = 30 @ ₹3, x_13 = 30 @ ₹5, and x_12 = ε @ ₹8 in independent cell.',
      ],
      allocations: [
        { r: 0, c: 0, qty: 30, cost: 3 },
        { r: 0, c: 1, qty: 'ε', cost: 8, isEpsilon: true },
        { r: 0, c: 2, qty: 30, cost: 5 },
        { r: 1, c: 1, qty: 40, cost: 4 },
      ],
      totalCost: '₹400',
      nwcrCost: '₹580',
      savings: '₹180 (31.0% savings over NWCR)',
      basisCheck: '4 basic cells (matches 2 + 3 - 1 = 4 with ε)',
    },
    {
      id: 'ex3',
      name: 'Exercise 3: Unbalanced Surplus Supply (Dummy Column)',
      type: 'Unbalanced (Dummy Col)',
      origins: ['Plant 1 (S1)', 'Plant 2 (S2)'],
      destinations: ['Retail 1 (D1)', 'Retail 2 (D2)', 'Retail 3 (D3)', 'Dummy D4 (Surplus)'],
      supplies: [50, 70],
      demands: [40, 30, 20, 30],
      matrix: [
        [4, 7, 6, 0],
        [8, 5, 9, 0],
      ],
      solutionSteps: [
        'Total Supply = 120, Total Demand = 90. Added Dummy Column D4 with demand 30 @ ₹0.',
        'Pass 1: Max Penalty = ₹5 at Row 2. Allocate x_24 = min(70, 30) = 30 @ ₹0. Col D4 struck out.',
        'Pass 2: Allocate x_22 = 30 @ ₹5, x_21 = 10 @ ₹8, x_11 = 30 @ ₹4, x_13 = 20 @ ₹6.',
      ],
      allocations: [
        { r: 0, c: 0, qty: 30, cost: 4 },
        { r: 0, c: 2, qty: 20, cost: 6 },
        { r: 1, c: 0, qty: 10, cost: 8 },
        { r: 1, c: 1, qty: 30, cost: 5 },
        { r: 1, c: 3, qty: 30, cost: 0, isDummy: true },
      ],
      totalCost: '₹470',
      nwcrCost: '₹620',
      savings: '₹150 (24.2% savings over NWCR)',
      basisCheck: '5 basic cells (matches 2 + 4 - 1 = 5)',
    },
    {
      id: 'ex4',
      name: 'Exercise 4: Complex 3 × 3 Bengal Network (Susmita)',
      type: 'Complex 3x3',
      origins: ['Barrackpore Hub (S1)', 'Ichapur Depot (S2)', 'Kolkata Works (S3)'],
      destinations: ['Shyambazar (D1)', 'Salt Lake V (D2)', 'Gariahat (D3)'],
      supplies: [50, 40, 60],
      demands: [40, 50, 60],
      matrix: [
        [2, 7, 4],
        [3, 3, 1],
        [5, 4, 7],
      ],
      solutionSteps: [
        'Pass 1: Max Penalty = ₹3 at Col 3. Allocate x_23 = min(40, 60) = 40 @ ₹1. Row 2 struck out.',
        'Pass 2: Allocate x_11 = 40 @ ₹2, x_13 = 10 @ ₹4, x_32 = 50 @ ₹4, x_33 = 10 @ ₹7.',
      ],
      allocations: [
        { r: 0, c: 0, qty: 40, cost: 2 },
        { r: 0, c: 2, qty: 10, cost: 4 },
        { r: 1, c: 2, qty: 40, cost: 1 },
        { r: 2, c: 1, qty: 50, cost: 4 },
        { r: 2, c: 2, qty: 10, cost: 7 },
      ],
      totalCost: '₹430',
      nwcrCost: '₹690',
      savings: '₹260 (37.7% savings over NWCR)',
      basisCheck: '5 basic cells (matches 3 + 3 - 1 = 5)',
    },
  ];

  const currentEx = exercises[activeExerciseIdx];

  // Case Studies
  const caseStudies = [
    {
      title: '1. Foundry Batch Scheduling Workshop (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Tested 5 diverse foundry freight configurations with multi-tier tie-breaking. VAM matched global MODI optimality on 4 out of 5 tests on step 1.',
      savings: 'Average 28.5% cost reduction across all test batches.',
    },
    {
      title: '2. Cold-Chain Vaccine Simulation (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Simulated shortage and surplus vaccine distributions with dummy constraints and epsilon handling.',
      savings: 'Guaranteed 100% feasibility and zero stockout penalties.',
    },
    {
      title: '3. Supermarket FMCG Tie-Breaker Audits (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Audited Tier 1 (min unit cost) and Tier 2 (max allocation volume) tie-breaker performance under heavy retail freight volumes.',
      savings: 'Captured lowest available freight rates consistently.',
    },
    {
      title: '4. Educational Press Optimality Verification (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'End-to-end benchmark comparisons proving VAM outclasses Matrix Minima by 12% and NWCR by 35% on average.',
      savings: 'Verified basis rank and non-degeneracy across all exercises.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes labGlow {
          0%, 100% { border-color: rgba(56, 189, 248, 0.3); }
          50% { border-color: rgba(56, 189, 248, 0.8); }
        }
        .glow-lab {
          animation: labGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
              Module 002_004 • Topic 8
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-cyan-950/80 text-cyan-400 border border-cyan-800/60">
              Practice Workshop
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Numerical Exercises
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive problem-solving laboratory featuring balanced tableaus, degenerate matrices with <span className="text-emerald-400 font-mono">ε-perturbation</span>, unbalanced dummy formulations, and competitive cost benchmarks comparing <span className="text-emerald-400 font-semibold">VAM vs. Matrix Minima vs. NWCR</span>.
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'practice-lab', label: '1. Interactive Practice Lab' },
              { id: 'benchmarks', label: '2. Method Cost Benchmarks' },
              { id: 'case-studies', label: '3. Bengal Case Studies' },
              { id: 'pitfalls', label: '4. Common Pitfalls' },
              { id: 'hints', label: '5. Guided Hints' },
              { id: 'checklist', label: '6. Revision Checklist' },
            ].map((item, idx) => (
              <button
                key={item.id}
                onClick={() => {
                  sectionRefs.current[idx]?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={clsx(
                  'px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 border',
                  activeSection === idx
                    ? 'bg-cyan-600 text-white border-cyan-500 shadow-md shadow-cyan-900/40'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </header>

        {/* SECTION 1: Interactive Practice Lab */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-lab">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-600/20 text-cyan-400 font-bold text-sm">
                  01
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Interactive Practice Workshop Lab
                </h2>
              </div>
              <button
                onClick={() => setShowSolution(!showSolution)}
                className={clsx(
                  'px-4 py-1.5 rounded-lg text-xs font-semibold transition-all border',
                  showSolution
                    ? 'bg-emerald-600 text-white border-emerald-400'
                    : 'bg-slate-800 text-cyan-300 border-cyan-700 hover:bg-slate-700'
                )}
              >
                {showSolution ? 'Hide Solution' : 'Show Full Solution'}
              </button>
            </div>

            {/* Exercise Selector */}
            <div className="flex flex-wrap gap-2">
              {exercises.map((ex, idx) => (
                <button
                  key={ex.id}
                  onClick={() => {
                    setActiveExerciseIdx(idx);
                    setShowSolution(false);
                  }}
                  className={clsx(
                    'px-3.5 py-2 rounded-lg text-xs font-semibold transition-all border text-left',
                    activeExerciseIdx === idx
                      ? 'bg-cyan-600 text-white border-cyan-400 shadow-md'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                  )}
                >
                  {ex.name.split(':')[0]}
                </button>
              ))}
            </div>

            <p className="text-xs sm:text-sm text-slate-300">
              <strong className="text-white">{currentEx.name}</strong> ({currentEx.type})
            </p>

            {/* Tableau */}
            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-4">
              <table className="w-full text-center border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2 text-left font-semibold text-slate-300">Origins \ Dests</th>
                    {currentEx.destinations.map((d, dIdx) => (
                      <th key={dIdx} className="p-2 font-semibold text-cyan-300">
                        {d}
                      </th>
                    ))}
                    <th className="p-2 font-semibold text-amber-300">Supply</th>
                  </tr>
                </thead>
                <tbody>
                  {currentEx.origins.map((orig, rIdx) => (
                    <tr key={rIdx} className="border-b border-slate-800/60">
                      <td className="p-2.5 text-left font-medium text-slate-200">{orig}</td>
                      {currentEx.matrix[rIdx].map((cost, cIdx) => {
                        const alloc = showSolution ? currentEx.allocations.find((a) => a.r === rIdx && a.c === cIdx) : null;

                        return (
                          <td key={cIdx} className="p-2">
                            <div
                              className={clsx(
                                'p-2 rounded-lg font-mono font-bold transition-all border flex flex-col items-center justify-center',
                                alloc
                                  ? 'bg-emerald-950 text-emerald-300 border-emerald-500 shadow-md'
                                  : 'bg-slate-900 text-slate-400 border-slate-800'
                              )}
                            >
                              {alloc && (
                                <span className="text-[10px] font-extrabold bg-slate-950 text-amber-300 px-1.5 py-0.5 rounded mb-1">
                                  x = {alloc.qty}
                                </span>
                              )}
                              <span>₹{cost}</span>
                            </div>
                          </td>
                        );
                      })}
                      <td className="p-2 font-mono font-bold text-amber-300">
                        {currentEx.supplies[rIdx]}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-slate-900/40 text-slate-300 font-mono">
                    <td className="p-2.5 text-left font-semibold text-amber-300">Demand</td>
                    {currentEx.demands.map((dm, dmIdx) => (
                      <td key={dmIdx} className="p-2 font-bold text-amber-300">
                        {dm}
                      </td>
                    ))}
                    <td className="p-2 font-bold text-white">
                      ∑ {currentEx.supplies.reduce((a, b) => a + b, 0)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Solution Details (Revealed when Show Solution is clicked) */}
            {showSolution ? (
              <div className="p-4 rounded-xl bg-slate-800/60 border border-emerald-800/60 flex flex-col space-y-3 text-xs sm:text-sm">
                <span className="text-emerald-300 font-bold text-sm">✅ Full Worked Solution & Analysis:</span>
                <div className="flex flex-col space-y-1.5 text-slate-300">
                  {currentEx.solutionSteps.map((stepText, sIdx) => (
                    <p key={sIdx}>• {stepText}</p>
                  ))}
                </div>
                <div className="p-3 bg-slate-950 rounded-lg flex flex-wrap items-center justify-between gap-2 border border-slate-800">
                  <span className="text-white font-bold">Total Initial Cost Z: <span className="text-emerald-400 font-mono">{currentEx.totalCost}</span></span>
                  <span className="text-slate-400">NWCR Cost: <span className="text-rose-400 font-mono line-through">{currentEx.nwcrCost}</span></span>
                  <span className="text-cyan-300 font-bold">{currentEx.savings}</span>
                </div>
              </div>
            ) : (
              <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                <span>💡 Click "Show Full Solution" above to reveal pass-by-pass allocations and total cost Z.</span>
              </div>
            )}
          </div>
        </section>

        {/* SECTION 2: Method Cost Benchmarks */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Comparative Cost Benchmark Summary
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-300 bg-slate-950">
                    <th className="p-3 font-semibold">Exercise Scenario</th>
                    <th className="p-3 font-semibold text-rose-300">North-West Corner (NWCR)</th>
                    <th className="p-3 font-semibold text-amber-300">Matrix Minima (Least Cost)</th>
                    <th className="p-3 font-semibold text-emerald-300">VAM (Penalty Method)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="p-3 font-medium text-white">Exercise 1 (Standard 3x3)</td>
                    <td className="p-3 text-rose-400">₹760</td>
                    <td className="p-3 text-amber-400">₹590</td>
                    <td className="p-3 text-emerald-400 font-bold">₹520 (Optimal!)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-white">Exercise 2 (Degenerate 2x3)</td>
                    <td className="p-3 text-rose-400">₹580</td>
                    <td className="p-3 text-amber-400">₹450</td>
                    <td className="p-3 text-emerald-400 font-bold">₹400 (Optimal!)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-white">Exercise 3 (Dummy Column)</td>
                    <td className="p-3 text-rose-400">₹620</td>
                    <td className="p-3 text-amber-400">₹510</td>
                    <td className="p-3 text-emerald-400 font-bold">₹470 (Optimal!)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-white">Exercise 4 (Complex 3x3)</td>
                    <td className="p-3 text-rose-400">₹690</td>
                    <td className="p-3 text-amber-400">₹490</td>
                    <td className="p-3 text-emerald-400 font-bold">₹430 (Optimal!)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 3: Real-World Bengal Case Studies */}
        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          data-index="2"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 font-bold text-sm">
                03
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
                >
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
                  <p className="text-slate-300"><strong>Workshop Context:</strong> {cs.desc}</p>
                  <p className="text-emerald-300 font-semibold">{cs.savings}</p>
                </div>
              );
            })()}
          </div>
        </section>

        {/* SECTION 4: Common Pitfalls */}
        <section
          ref={(el) => (sectionRefs.current[3] = el)}
          data-index="3"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-600/20 text-rose-400 font-bold text-sm">
                04
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Common Beginner Mistakes
              </h2>
            </div>

            <div className="flex flex-col space-y-2.5">
              {[
                {
                  trap: 'Arithmetic Subtraction Slips in Multi-Pass Tables',
                  fix: 'Audit row supply and column demand subtractions immediately after writing each allocation.',
                },
                {
                  trap: 'Miscalculating Penalties with Dummy Lines',
                  fix: 'Remember that ₹0 is the smallest element in lines intersecting the dummy; penalty = old minimum - ₹0.',
                },
                {
                  trap: 'Forgetting Epsilon on Simultaneous Zero Balances',
                  fix: 'If S_k = D_l, cross out only ONE line to maintain the required m + n - 1 basic cells.',
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

        {/* SECTION 5: Guided Hints */}
        <section
          ref={(el) => (sectionRefs.current[4] = el)}
          data-index="4"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 font-bold text-sm">
                05
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Guided Hints
              </h2>
            </div>

            <div className="flex flex-col space-y-3">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-amber-300 font-semibold text-sm">💡 Think about…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Think about how practicing across balanced, unbalanced, and degenerate problem sets prepares you for any question variant on professional and university exams!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully that VAM consistently outperforms NWCR by 25% to 40% across every single numerical test case.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: Revision Checklist */}
        <section
          ref={(el) => (sectionRefs.current[5] = el)}
          data-index="5"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                06
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Student Revision Checklist (Topic 8)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Solved standard balanced 3x3 problems with multi-pass penalty tables',
                'Solved degenerate 2x3 problem with epsilon perturbation',
                'Solved unbalanced problem with dummy column and ₹0 rates',
                'Applied Tier 1 and Tier 2 tie-breaking rules successfully',
                'Verified basis count equals m + n - 1 across all exercises',
                'Calculated total initial transportation cost Z in Indian Rupees (₹)',
              ].map((text, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-800/40 border border-slate-700/60 flex items-center space-x-3">
                  <span className="text-emerald-400">✅</span>
                  <span className="text-xs sm:text-sm text-slate-300">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: Teacher's Note */}
        <section className="flex flex-col space-y-6">
          <Teacher
            note={
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: the only true way to master Vogel's Approximation Method is through pen-and-paper numerical practice! When you work through these 5 exercises, pay close attention to how the penalties guide your hand. In Exercise 1, VAM saved ₹240 compared to NWCR; in Exercise 4, it saved ₹260! Master the multi-pass margin columns, watch out for simultaneous zero balances, and always double-check your total cost Z. Flawless execution on these practice exercises guarantees total mastery in your university exams and corporate logistics careers!"
            }
          />
        </section>

        {/* SECTION 8: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Numerical Exercises FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 9: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Numerical Exercises (Vogel's Approximation Method)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic9_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic8;
