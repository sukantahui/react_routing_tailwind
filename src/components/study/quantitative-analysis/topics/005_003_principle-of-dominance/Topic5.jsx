// src/components/study/quantitative-analysis/topics/005_003_principle-of-dominance/Topic5.jsx
// React 19 Function-based Component
// Module: 005_003_principle-of-dominance
// Topic 5: Step-by-step dominance reduction examples

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic5_files/topic5_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic5_files/topic5_note.txt?raw';

const Topic5 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedCaseIdx, setSelectedCaseIdx] = useState(0);

  const workedCases = [
    {
      title: 'Example 1: 3 × 3 Reduced to 2 × 2 & Pure Saddle Point',
      context: 'Debangshu vs Rival Foundry in Barrackpore (₹ Thousands)',
      rowLabels: ['A₁', 'A₂', 'A₃'],
      colLabels: ['B₁', 'B₂', 'B₃'],
      matrix: [
        [20, 30, 40],
        [35, 45, 50],
        [15, 25, 30],
      ],
      steps: [
        'Pass 1: Row A₂ strictly dominates Row A₃ (35>15, 45>25, 50>30) ➔ Delete Row A₃.',
        'Pass 2: In 2×3 submatrix, Col B₁ strictly dominates Col B₃ (20<40, 35<50) ➔ Delete Col B₃.',
        'Pass 3: Surviving 2×2 is [[20, 30], [35, 45]]. Row A₂ dominates Row A₁; Col B₁ dominates Col B₂.',
        'Final Solution: Pure Saddle Point at (A₂, B₁) with Value of Game v* = +₹35,000.',
      ],
      pVector: '[0, 1, 0]ᵀ',
      qVector: '[1, 0, 0]ᵀ',
      vStar: 35,
    },
    {
      title: 'Example 2: 4 × 4 Reduced in 5 Passes to a Pure Saddle Point',
      context: 'Mamata & Mahima Vaccine Transport in Kolkata (₹ Thousands)',
      rowLabels: ['A₁', 'A₂', 'A₃', 'A₄'],
      colLabels: ['B₁', 'B₂', 'B₃', 'B₄'],
      matrix: [
        [30, 20, 40, 50],
        [40, 30, 50, 60],
        [20, 15, 30, 40],
        [25, 20, 35, 45],
      ],
      steps: [
        'Pass 1: Row A₁ strictly dominates Row A₃ (30>20, 20>15, 40>30, 50>40) ➔ Delete Row A₃.',
        'Pass 2: Col B₂ [20, 30, 20] dominates Col B₄ [50, 60, 45] ➔ Delete Col B₄.',
        'Pass 3: Row A₂ [40, 30, 50] dominates Row A₄ [25, 20, 35] ➔ Delete Row A₄.',
        'Pass 4: Col B₁ [30, 40] dominates Col B₃ [40, 50] ➔ Delete Col B₃.',
        'Pass 5: In 2×2 [[30, 20], [40, 30]], Row A₂ dominates Row A₁; Col B₂ dominates Col B₁.',
        'Final Solution: Pure Saddle Point at (A₂, B₂) with Value of Game v* = +₹30,000.',
      ],
      pVector: '[0, 1, 0, 0]ᵀ',
      qVector: '[0, 1, 0, 0]ᵀ',
      vStar: 30,
    },
    {
      title: 'Example 3: 3 × 2 Matrix Solved via Convex Combination',
      context: 'Susmita Supermarket Promotion in Ichapur (₹ Thousands)',
      rowLabels: ['A₁', 'A₂', 'A₃'],
      colLabels: ['B₁', 'B₂'],
      matrix: [
        [40, 20],
        [20, 40],
        [25, 25],
      ],
      steps: [
        'Pass 1: Pure dominance check fails between all individual rows.',
        'Pass 2: Apply Modified Dominance: 50-50 average of Row A₁ and Row A₂ is [30, 30].',
        'Pass 3: Since [30, 30] > [25, 25] across both columns, Row A₃ is eliminated!',
        'Final Solution: Surviving 2×2 [[40, 20], [20, 40]] has mixed strategy p* = [0.5, 0.5, 0], v* = +₹30,000.',
      ],
      pVector: '[0.5, 0.5, 0]ᵀ',
      qVector: '[0.5, 0.5]ᵀ',
      vStar: 30,
    },
    {
      title: 'Example 4: 4 × 3 Rectangular Matrix with Negative Payoffs',
      context: 'Abhronila Educational Press Patent Litigation in Jadavpur (₹ Thousands)',
      rowLabels: ['A₁', 'A₂', 'A₃', 'A₄'],
      colLabels: ['B₁', 'B₂', 'B₃'],
      matrix: [
        [10, -10, 20],
        [20, 0, 30],
        [-15, -20, 5],
        [15, -5, 25],
      ],
      steps: [
        'Pass 1: Row A₂ [20, 0, 30] dominates Row A₃ [-15, -20, 5] and Row A₄ [15, -5, 25] ➔ Delete A₃ & A₄.',
        'Pass 2: In 2×3 [[10, -10, 20], [20, 0, 30]], Col B₂ [-10, 0] dominates Col B₃ [20, 30] ➔ Delete Col B₃.',
        'Pass 3: Surviving 2×2 is [[10, -10], [20, 0]]. Row A₂ dominates Row A₁ (20>10, 0>-10) ➔ Delete Row A₁.',
        'Pass 4: In Row A₂ [20, 0], Col B₂ (0) dominates Col B₁ (20) ➔ Delete Col B₁.',
        'Final Solution: Pure Saddle Point at (A₂, B₂) with Value of Game v* = ₹0 (Strictly Fair Game!).',
      ],
      pVector: '[0, 1, 0, 0]ᵀ',
      qVector: '[0, 1, 0]ᵀ',
      vStar: 0,
    },
  ];

  const currentCase = workedCases[selectedCaseIdx];

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

  // Case Studies
  const caseStudies = [
    {
      title: '1. Precision Foundry Worked Reduction (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Executed step-by-step dominance reduction on a 3x3 casting tender in Barrackpore, isolating optimal strategy A2 and game value ₹35,000.',
      lesson: 'Step-by-step reduction provides audit-ready operational proofs.',
    },
    {
      title: '2. Cold-Chain 4x4 Worked Matrix Shrinking (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Shrank a 4x4 medical cold-chain logistics grid to a 1x1 saddle point of ₹30,000 in 5 sequential passes in Kolkata.',
      lesson: 'Sequential dominance eliminates complex LP solver dependencies.',
    },
    {
      title: '3. Supermarket FMCG Convex Combination Resolution (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Resolved a deadlocked 3x2 retail matrix in Ichapur by applying a 50-50 convex average, unlocking a ₹30,000 game value.',
      lesson: 'Convex dominance breaks practical managerial deadlocks.',
    },
    {
      title: '4. Educational High-Tech Lab Fair Dispute Resolution (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Reduced a 4x3 negative payoff patent matrix to a Fair Game (v* = ₹0) at (A2, B2) in Jadavpur, creating an equitable corporate settlement.',
      lesson: 'Dominance reduction accurately handles negative signed payoffs.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes stepDomGlow {
          0%, 100% { border-color: rgba(234, 179, 8, 0.3); }
          50% { border-color: rgba(234, 179, 8, 0.8); }
        }
        .glow-step-dom {
          animation: stepDomGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-amber-950/80 text-amber-400 border border-amber-800/60">
              Segment 5 • Module 005_003 • Topic 5
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-amber-950/80 text-amber-400 border border-amber-800/60">
              Worked 3x3 & 4x4 Reductions • Convex Deadlocks • Vector Mapping
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
            Step-by-Step Dominance Reduction Examples
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive workshop of <span className="text-amber-400 font-semibold">Worked Step-by-Step Dominance Examples</span>: reducing 3×3, 4×4, and rectangular matrices, resolving convex combination deadlocks, and mapping surviving probabilities to full strategy vectors in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'reduction-protocol', label: '1. Master Reduction Protocol' },
              { id: 'interactive-studio', label: '2. Worked Examples Studio' },
              { id: 'vector-reconstruction', label: '3. Vector Reconstruction' },
              { id: 'svg-topologies', label: '4. Solution Topologies Architecture SVG' },
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
              >
                {item.label}
              </button>
            ))}
          </div>
        </header>

        {/* SECTION 1: Master Reduction Protocol */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 font-bold text-sm">
                01
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                5-Step Dominance Reduction & Resolution Protocol
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-rose-400 font-bold">1. Row Pass</span>
                <p className="text-slate-300">Compare row pairs ➔ Delete smaller dominated rows.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-bold">2. Col Pass</span>
                <p className="text-slate-300">Compare col pairs ➔ Delete larger dominated cols.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-300 font-bold">3. Re-evaluate</span>
                <p className="text-slate-300">Re-inspect rows; column deletions create new dominances!</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-purple-300 font-bold">4. Convex Blend</span>
                <p className="text-slate-300">Apply 50-50 averages if pure dominance stalls.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-bold">5. Solve & Map</span>
                <p className="text-slate-300">Solve 2×2/1×1 matrix; map weights to full vector in ₹.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Worked Examples Studio */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-step-dom">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Worked Dominance Examples Studio
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {workedCases.map((wc, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedCaseIdx(idx)}
                  className={clsx(
                    'px-4 py-2 rounded-xl text-xs font-semibold transition-all border text-left',
                    selectedCaseIdx === idx
                      ? 'bg-amber-600 text-white border-amber-400 shadow-md'
                      : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
                  )}
                >
                  {wc.title.split(':')[0]}
                </button>
              ))}
            </div>

            {/* Example Header */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2 text-xs sm:text-sm">
              <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-2 gap-2">
                <span className="text-white font-bold text-base">{currentCase.title}</span>
                <span className="text-amber-400 font-mono font-semibold">{currentCase.context}</span>
              </div>
            </div>

            {/* Matrix View */}
            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3 font-mono text-xs sm:text-sm">
              <table className="w-full text-center border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2 text-left">A \ B</th>
                    {currentCase.colLabels.map((cl, cIdx) => (
                      <th key={cIdx} className="p-2 text-sky-400">{cl}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-200">
                  {currentCase.matrix.map((row, rIdx) => (
                    <tr key={rIdx}>
                      <td className="p-2 text-left font-bold text-rose-300">{currentCase.rowLabels[rIdx]}</td>
                      {row.map((cell, cIdx) => (
                        <td
                          key={cIdx}
                          className={clsx(
                            'p-2 font-bold',
                            cell >= 0 ? 'text-emerald-400' : 'text-rose-400'
                          )}
                        >
                          {cell >= 0 ? `+${cell}` : cell}k
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Step Progression */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2 text-xs sm:text-sm">
              <span className="text-emerald-400 font-bold text-sm">Step-by-Step Reduction Sequence:</span>
              <div className="flex flex-col space-y-1.5 font-mono text-xs">
                {currentCase.steps.map((st, sIdx) => (
                  <div key={sIdx} className="p-2 rounded bg-slate-900 border border-slate-800/80 text-slate-300">
                    {st}
                  </div>
                ))}
              </div>
            </div>

            {/* Equilibrium Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs sm:text-sm">
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <span className="text-slate-400 font-sans text-xs">Full Strategy Vector p*:</span>
                <span className="text-rose-400 font-bold text-base">{currentCase.pVector}</span>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <span className="text-slate-400 font-sans text-xs">Full Strategy Vector q*:</span>
                <span className="text-sky-400 font-bold text-base">{currentCase.qVector}</span>
              </div>

              <div className="p-3.5 bg-emerald-950/60 rounded-xl border border-emerald-600 flex flex-col space-y-1">
                <span className="text-slate-300 font-sans text-xs">Value of the Game:</span>
                <span className="text-emerald-300 font-bold text-base">v* = +₹{currentCase.vStar * 1000}</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Vector Reconstruction */}
        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          data-index="2"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 font-bold text-sm">
                03
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Strategy Vector Zero-Weight Invariance
              </h2>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2 text-xs sm:text-sm">
              <p className="text-slate-300 leading-relaxed">
                When mapping the surviving 2×2 probabilities back to the original full m-strategy space, all eliminated rows and columns receive an exact weight of <strong>0.0</strong>:
              </p>
              <div className="font-mono text-center text-cyan-300 font-bold py-2 bg-slate-900 rounded border border-slate-800">
                p_eliminated* = 0.0 &nbsp;|&nbsp; q_eliminated* = 0.0 &nbsp;|&nbsp; Σ p_i = 1.0 &nbsp;|&nbsp; Σ q_j = 1.0
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Solution Topologies Architecture SVG */}
        <section
          ref={(el) => (sectionRefs.current[3] = el)}
          data-index="3"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-600/20 text-teal-400 font-bold text-sm">
                04
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Dominance Solution Topologies Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 180"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* 3x3 to 1x1 Topology */}
                <rect x="30" y="40" width="200" height="90" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <text x="130" y="65" fill="#f43f5e" fontSize="11" fontWeight="bold" textAnchor="middle">Topology 1: Direct 1×1</text>
                <text x="130" y="85" fill="#cbd5e1" fontSize="8" textAnchor="middle">3 × 3 ➔ 2 × 3 ➔ 2 × 2 ➔ 1 × 1</text>
                <text x="130" y="105" fill="#34d399" fontSize="8" textAnchor="middle">Pure Saddle Point v*</text>

                {/* 4x4 to 2x2 Topology */}
                <rect x="270" y="40" width="200" height="90" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="370" y="65" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Topology 2: Multi-Pass 2×2</text>
                <text x="370" y="85" fill="#cbd5e1" fontSize="8" textAnchor="middle">4 × 4 ➔ 3 × 4 ➔ 3 × 3 ➔ 2 × 2</text>
                <text x="370" y="105" fill="#fde68a" fontSize="8" textAnchor="middle">Algebraic 2×2 Mixed Formula</text>

                {/* Convex Deadlock Topology */}
                <rect x="510" y="40" width="200" height="90" rx="8" fill="#064e3b" stroke="#a855f7" strokeWidth="2" />
                <text x="610" y="65" fill="#a855f7" fontSize="11" fontWeight="bold" textAnchor="middle">Topology 3: Convex Blend</text>
                <text x="610" y="85" fill="#cbd5e1" fontSize="8" textAnchor="middle">Deadlock ➔ 0.5 R₁ + 0.5 R₂</text>
                <text x="610" y="105" fill="#ffffff" fontSize="8" textAnchor="middle">Prunes Dominated Row</text>
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 5: Bengal Case Studies */}
        <section
          ref={(el) => (sectionRefs.current[4] = el)}
          data-index="4"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 font-bold text-sm">
                05
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Bengal Operations Research Dominance Worked Case Studies
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
                  <p className="text-slate-300">{cs.desc}</p>
                  <p className="text-amber-300 font-semibold">💡 <strong>Operations Takeaway:</strong> {cs.lesson}</p>
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
        >
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
                  trap: 'Forgetting to Check for Cascading Dominances After Every Column Deletion',
                  fix: 'Deleting a column changes the row comparisons; always re-scan rows after deleting columns.',
                },
                {
                  trap: 'Losing Track of Original Strategy Labels During Multiple Passes',
                  fix: 'Label rows and columns explicitly (A₁, A₂, B₁, B₂) throughout all reduction passes.',
                },
                {
                  trap: 'Assigning Non-Zero Probabilities to Eliminated Dominated Strategies',
                  fix: 'Eliminated strategies MUST receive probability 0.0 in the final full-dimensional vectors.',
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
        >
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
                  Think of working through dominance examples like navigating a labyrinth: each deleted wall narrows your options until the direct path to the exit (the 2x2 or 1x1 solution) is obvious!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how even 4x4 matrices with positive and negative numbers can reduce completely to a single saddle point in just 4 or 5 clean passes!
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
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                08
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Student Revision Checklist (Topic 5)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Mastered the 5-step reduction and resolution protocol',
                'Successfully reduced 3x3, 4x4, and rectangular matrices',
                'Handled cascading dominance re-scans after column deletions',
                'Applied modified dominance to break reduction deadlocks',
                'Reconstructed full original probability vectors p* and q*',
                'Reported numerical game values in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: Working through these diverse reduction examples builds instant visual agility! In our final master topic for this module (Topic 6), we will conduct a comprehensive Short Questions and viva review across all dominance concepts!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Step-by-Step Dominance Reduction FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Step-by-Step Dominance Reduction Examples"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic6_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic5;
