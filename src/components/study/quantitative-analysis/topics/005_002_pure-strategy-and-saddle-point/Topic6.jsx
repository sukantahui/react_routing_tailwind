// src/components/study/quantitative-analysis/topics/005_002_pure-strategy-and-saddle-point/Topic6.jsx
// React 19 Function-based Component
// Module: 005_002_pure-strategy-and-saddle-point
// Topic 6: Numerical examples

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
  const [selectedNumExample, setSelectedNumExample] = useState(0);

  const numExamples = [
    {
      title: 'Example 1: Classic 2x2 Matrix Game with Unique Saddle Point',
      context: 'Debangshu vs Rival Foundry in Barrackpore (₹ Thousands)',
      rowLabels: ['A₁: Standard Melt', 'A₂: High Induction'],
      colLabels: ['B₁: Standard Melt', 'B₂: High Induction'],
      matrix: [
        [20, 10],
        [40, 30],
      ],
      desc: 'Demonstrates a standard 2x2 matrix game with a unique pure saddle point at (A2, B2).',
      vStar: 30,
      hasSaddle: true,
      saddles: [{ r: 1, c: 1 }],
      optimalMsg: 'Player A chooses A₂, Player B chooses B₂. Value of the Game v* = +₹30,000.',
    },
    {
      title: 'Example 2: 3x3 Matrix Game with Negative Entries',
      context: 'Mamata & Mahima Cold-Chain Vaccine Logistics in Kolkata (₹ Thousands)',
      rowLabels: ['A₁: Road Freight', 'A₂: Dedicated Reefer', 'A₃: Air Cargo'],
      colLabels: ['B₁: Standard Warehousing', 'B₂: Deep Freeze Hub', 'B₃: Solar Transit'],
      matrix: [
        [-10, 15, -20],
        [5, 25, 10],
        [-5, 0, -15],
      ],
      desc: 'Demonstrates how negative payoffs are handled without sign errors, yielding a positive saddle value.',
      vStar: 5,
      hasSaddle: true,
      saddles: [{ r: 1, c: 0 }],
      optimalMsg: 'Player A chooses A₂, Player B chooses B₁. Value of the Game v* = +₹5,000.',
    },
    {
      title: 'Example 3: 2x2 Matrix Game with Multiple (Alternate) Saddle Points',
      context: 'Susmita Supermarket Weekend Loyalty Campaign in Ichapur (₹ Thousands)',
      rowLabels: ['A₁: Multi-Buy Promo', 'A₂: Flash Coupon'],
      colLabels: ['B₁: Multi-Buy Promo', 'B₂: Flash Coupon'],
      matrix: [
        [40, 40],
        [20, 40],
      ],
      desc: 'Demonstrates alternate optimal pure strategies sharing the exact same game value.',
      vStar: 40,
      hasSaddle: true,
      saddles: [{ r: 0, c: 0 }, { r: 0, c: 1 }],
      optimalMsg: 'Player A chooses A₁; Player B can choose B₁ or B₂. Value of the Game v* = +₹40,000.',
    },
    {
      title: 'Example 4: 2x2 Non-Strictly Determined Matrix Game',
      context: 'Abhronila High-Tech Patent Cleanroom Dispute in Jadavpur (₹ Thousands)',
      rowLabels: ['A₁: Aggressive Litigate', 'A₂: Standard Settle'],
      colLabels: ['B₁: Aggressive Litigate', 'B₂: Standard Settle'],
      matrix: [
        [10, -10],
        [-10, 10],
      ],
      desc: 'Demonstrates why Maximin < Minimax prevents pure saddle points, requiring mixed strategies.',
      vStar: null,
      hasSaddle: false,
      saddles: [],
      optimalMsg: 'Maximin (-₹10k) < Minimax (+₹10k). No pure saddle point exists; mixed strategies required!',
    },
  ];

  const currentNum = numExamples[selectedNumExample];
  const mat = currentNum.matrix;

  // Computations
  const rMins = mat.map((row) => Math.min(...row));
  const cMaxs = currentNum.colLabels.map((_, cIdx) =>
    Math.max(...mat.map((row) => row[cIdx]))
  );
  const maximin = Math.max(...rMins);
  const minimax = Math.min(...cMaxs);

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
      title: '1. Foundry Shift Strategy Optimization (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Solved a 2x2 casting tender in Barrackpore, verifying a pure saddle point of ₹30,000 at (A2, B2) using the 4-step numerical method.',
      lesson: 'Systematic numerical verification guarantees error-free tender submissions.',
    },
    {
      title: '2. Cold-Chain Vaccine Logistics Optimization (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Evaluated a 3x3 temperature damage matrix in Kolkata with negative cells, isolating the +₹5,000 saddle value at (A2, B1).',
      lesson: 'Proper algebraic handling of negative entries ensures accurate cost analysis.',
    },
    {
      title: '3. Supermarket FMCG Retail Alternate Saddle Points (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Identified twin saddle points in Ichapur yielding identical ₹40,000 returns, giving management strategic operational flexibility.',
      lesson: 'Multiple saddle points offer managerial choice without compromising expected profit.',
    },
    {
      title: '4. Educational High-Tech Lab Non-Strict Game (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Proved that a 2x2 patent dispute in Jadavpur had Maximin < Minimax, routing the negotiation to mixed strategy arbitration.',
      lesson: 'Recognizing non-strictly determined games prevents costly deterministic missteps.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes numGlow {
          0%, 100% { border-color: rgba(234, 179, 8, 0.3); }
          50% { border-color: rgba(234, 179, 8, 0.8); }
        }
        .glow-num {
          animation: numGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-amber-950/80 text-amber-400 border border-amber-800/60">
              Segment 5 • Module 005_002 • Topic 6
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-amber-950/80 text-amber-400 border border-amber-800/60">
              Worked 2x2 & 3x3 Matrices • Negative Payoffs • Multiple Saddles
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Numerical Examples
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive workshop of <span className="text-amber-400 font-semibold">Worked Numerical Examples</span>: solving 2x2, 3x3, and rectangular matrix games, handling negative payoffs, analyzing <span className="text-emerald-400 font-semibold">Multiple Saddle Points</span>, and diagnosing non-strictly determined games in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'num-methodology', label: '1. Master Numerical Methodology' },
              { id: 'interactive-studio', label: '2. Numerical Examples Studio' },
              { id: 'solution-breakdown', label: '3. Step-by-Step Breakdown' },
              { id: 'svg-taxonomy', label: '4. Matrix Taxonomy Architecture SVG' },
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

        {/* SECTION 1: Master Numerical Methodology */}
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
                4-Step Master Numerical Resolution Protocol
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-rose-400 font-bold">1. Row Minima</span>
                <p className="text-slate-300">Compute min_j a_ij horizontally across each row i.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-bold">2. Column Maxima</span>
                <p className="text-slate-300">Compute max_i a_ij vertically down each column j.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-300 font-bold">3. Maximin vs Minimax</span>
                <p className="text-slate-300">Find α = max(Row Mins) and β = min(Col Maxs).</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-bold">4. Equilibrium Verdict</span>
                <p className="text-slate-300">If α == β, declare saddle point (A_i*, B_j*) and v* in ₹.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Numerical Examples Studio */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-num">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Numerical Examples Studio
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {numExamples.map((ex, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedNumExample(idx)}
                  className={clsx(
                    'px-4 py-2 rounded-xl text-xs font-semibold transition-all border text-left',
                    selectedNumExample === idx
                      ? 'bg-amber-600 text-white border-amber-400 shadow-md'
                      : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
                  )}
                >
                  {ex.title.split(':')[0]}
                </button>
              ))}
            </div>

            {/* Example Header */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2 text-xs sm:text-sm">
              <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-2 gap-2">
                <span className="text-white font-bold text-base">{currentNum.title}</span>
                <span className="text-amber-400 font-mono font-semibold">{currentNum.context}</span>
              </div>
              <p className="text-slate-300">{currentNum.desc}</p>
            </div>

            {/* Matrix View */}
            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-center border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2 text-left">Player A \ Player B</th>
                    {currentNum.colLabels.map((cl, cIdx) => (
                      <th key={cIdx} className="p-2 text-sky-400">{cl}</th>
                    ))}
                    <th className="p-2 text-rose-400 bg-rose-950/30">Row Min</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-200">
                  {mat.map((row, rIdx) => (
                    <tr key={rIdx}>
                      <td className="p-2 text-left font-bold text-rose-300">{currentNum.rowLabels[rIdx]}</td>
                      {row.map((cell, cIdx) => {
                        const isSaddle = currentNum.saddles.some((sp) => sp.r === rIdx && sp.c === cIdx);
                        return (
                          <td
                            key={cIdx}
                            className={clsx(
                              'p-2 font-bold',
                              isSaddle
                                ? 'bg-emerald-950 text-emerald-300 border-2 border-emerald-400 rounded ring-2 ring-emerald-500'
                                : cell > 0
                                ? 'text-emerald-400'
                                : cell < 0
                                ? 'text-rose-400'
                                : 'text-slate-400'
                            )}
                          >
                            {cell >= 0 ? `+${cell}` : cell}
                          </td>
                        );
                      })}
                      <td className="p-2 font-bold text-rose-400 bg-rose-950/20">{rMins[rIdx]}</td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-slate-700 bg-sky-950/30">
                    <td className="p-2 text-left font-bold text-sky-400">Col Max</td>
                    {cMaxs.map((cm, cIdx) => (
                      <td key={cIdx} className="p-2 font-bold text-sky-300">{cm}</td>
                    ))}
                    <td className="p-2 text-slate-600">—</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Numerical Solution Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs sm:text-sm">
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <span className="text-slate-400 font-sans text-xs">Maximin (α):</span>
                <span className="text-rose-400 font-bold text-lg">₹{maximin}k</span>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <span className="text-slate-400 font-sans text-xs">Minimax (β):</span>
                <span className="text-sky-400 font-bold text-lg">₹{minimax}k</span>
              </div>

              <div className={clsx('p-3.5 rounded-xl border flex flex-col space-y-1', currentNum.hasSaddle ? 'bg-emerald-950/60 border-emerald-600' : 'bg-amber-950/60 border-amber-600')}>
                <span className="text-slate-300 font-sans text-xs">Equilibrium Verdict:</span>
                <span className={clsx('font-bold text-xs sm:text-sm', currentNum.hasSaddle ? 'text-emerald-300' : 'text-amber-300')}>
                  {currentNum.optimalMsg}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Step-by-Step Breakdown */}
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
                Key Algebraic Takeaways Across Matrix Structures
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-bold">1. Negative Matrix Entries</span>
                <p className="text-slate-300 text-xs">
                  Negative entries are handled with standard order relations: -20 &lt; -10 &lt; +5. The Maximin algorithm works identically without requiring shifts.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-bold">2. Multiple Alternate Saddle Points</span>
                <p className="text-slate-300 text-xs">
                  When multiple cells satisfy Row Min and Col Max equality, they form an interchangeable equilibrium grid, all yielding the exact same game value v*.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Matrix Taxonomy Architecture SVG */}
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
                Matrix Dimension Taxonomy & Resolution Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 180"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* 2x2 Case */}
                <rect x="30" y="40" width="150" height="90" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <text x="105" y="65" fill="#f43f5e" fontSize="11" fontWeight="bold" textAnchor="middle">2 × 2 Square Games</text>
                <text x="105" y="85" fill="#cbd5e1" fontSize="8" textAnchor="middle">Direct Saddle Test</text>
                <text x="105" y="105" fill="#cbd5e1" fontSize="8" textAnchor="middle">Or Algebraic Mixed</text>

                {/* 3x3 Case */}
                <rect x="210" y="40" width="150" height="90" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="285" y="65" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">3 × 3 Square Games</text>
                <text x="285" y="85" fill="#cbd5e1" fontSize="8" textAnchor="middle">Row Min / Col Max</text>
                <text x="285" y="105" fill="#cbd5e1" fontSize="8" textAnchor="middle">Or Dominance Reduction</text>

                {/* m x n Rectangular Case */}
                <rect x="390" y="40" width="160" height="90" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="470" y="65" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">m × n Rectangular</text>
                <text x="470" y="85" fill="#cbd5e1" fontSize="8" textAnchor="middle">4-Step Numerical Protocol</text>
                <text x="470" y="105" fill="#cbd5e1" fontSize="8" textAnchor="middle">Saddle or Simplex / LP</text>

                {/* Equilibrium Output */}
                <rect x="580" y="40" width="130" height="90" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="645" y="65" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">Game Value v*</text>
                <text x="645" y="85" fill="#cbd5e1" fontSize="8" textAnchor="middle">Reported in ₹</text>
                <text x="645" y="105" fill="#fde68a" fontSize="8" textAnchor="middle">Optimal Profile</text>
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
                Bengal Operations Research Numerical Case Studies
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
                  trap: 'Comparing Negative Numbers Incorrectly (e.g. Thinking -20 > -10)',
                  fix: 'In standard arithmetic, -10 is GREATER than -20; min(-10, -20) = -20.',
                },
                {
                  trap: 'Claiming a Non-Existent Saddle Point when Maximin < Minimax',
                  fix: 'If Maximin != Minimax, NO pure saddle point exists; do not select an arbitrary cell.',
                },
                {
                  trap: 'Assuming Multiple Saddle Points Have Different Game Values',
                  fix: 'All saddle points in the same game MUST have the exact same payoff value v*.',
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
                  Think of working through numerical examples like balancing an accounting ledger: systematic row-by-row and col-by-col extraction guarantees complete mathematical accuracy!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how even with negative entries, the saddle point is immediately obvious once the Row Minima and Column Maxima are written alongside the matrix!
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
                Student Revision Checklist (Topic 6)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Solved 2x2, 3x3, and rectangular matrix games systematically',
                'Computed Row Minima and Column Maxima with 100% precision',
                'Verified whether Maximin == Minimax for pure saddle point existence',
                'Handled negative matrix entries without algebraic sign errors',
                'Handled multiple alternate saddle points and confirmed identical game values',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: Practicing these worked numerical examples transforms theoretical knowledge into instant examination intuition! In our final topic for this module (Topic 7), we will conduct a comprehensive Short Questions and viva review across all pure strategy and saddle point concepts!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Numerical Examples FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Numerical Examples (Game Theory)"
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
