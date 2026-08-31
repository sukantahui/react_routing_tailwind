// src/components/study/quantitative-analysis/topics/005_003_principle-of-dominance/Topic0.jsx
// React 19 Function-based Component
// Module: 005_003_principle-of-dominance
// Topic 0: Principle of dominance

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

  // Dominance Step: 0 = Initial 3x3, 1 = Row 3 Eliminated, 2 = Col 3 Eliminated (Final 2x2)
  const [reductionStep, setReductionStep] = useState(0);

  const initialMatrix = [
    [20, 30, 40],
    [35, 45, 50],
    [15, 25, 30],
  ];

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
      title: '1. Foundry Supplier Reduction via Dominance (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Evaluated a 4x4 metal alloy bidding game in Barrackpore. Iterative dominance eliminated 3 inferior shifts, reducing the matrix to a single 1x1 saddle point of ₹40,000 profit.',
      lesson: 'Dominance reduction quickly isolates optimal strategies in complex procurement bids.',
    },
    {
      title: '2. Cold-Chain Hospital Route Pruning (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Pruned 2 expensive delivery routes in Kolkata that were strictly dominated by express highway couriers, reducing a 3x3 logistics game to a solvable 2x2 matrix.',
      lesson: 'Pruning dominated delivery routes protects cold-chain operational budgets.',
    },
    {
      title: '3. Supermarket FMCG Retail Promotional Pruning (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Eliminated a loss-making weekend coupon scheme in Ichapur that was weakly dominated by bundle discounts, protecting retail margins by ₹18,000.',
      lesson: 'Dominance rules prevent retail marketing managers from launching self-defeating promotions.',
    },
    {
      title: '4. Educational High-Tech Lab Licensing Pruning (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Used dominance reduction in Jadavpur to eliminate 2 high-risk litigation rows, streamlining a 4x3 university royalty negotiation down to an equitable 2x2 matrix.',
      lesson: 'Eliminating dominated legal postures accelerates institutional licensing agreements.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes domGlow {
          0%, 100% { border-color: rgba(59, 130, 246, 0.3); }
          50% { border-color: rgba(59, 130, 246, 0.8); }
        }
        .glow-dom {
          animation: domGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-blue-950/80 text-blue-400 border border-blue-800/60">
              Segment 5 • Module 005_003 • Topic 0
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-blue-950/80 text-blue-400 border border-blue-800/60">
              Rational Elimination • Asymmetric Rules • Dimensionality Reduction
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
            Principle of Dominance
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive foundation on the <span className="text-blue-400 font-semibold">Principle of Dominance</span>: eliminating inferior strategies without altering the <span className="text-emerald-400 font-semibold">Value of the Game (v*)</span>, understanding asymmetric row vs column elimination rules, and performing step-by-step matrix reduction in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'dom-philosophy', label: '1. Dominance Philosophy' },
              { id: 'interactive-reducer', label: '2. Interactive Dominance Reducer' },
              { id: 'asymmetric-rules', label: '3. Asymmetric Elimination Rules' },
              { id: 'svg-pipeline', label: '4. Dominance Reduction Architecture SVG' },
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
              >
                {item.label}
              </button>
            ))}
          </div>
        </header>

        {/* SECTION 1: Dominance Philosophy */}
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
                Principle of Dominance Foundations
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-rose-400 font-bold">1. Row Player (Maximizer)</span>
                <p className="text-slate-300 text-xs">
                  If Row i ≥ Row j across all columns, Row j is dominated. <strong>Delete the smaller Row j!</strong>
                </p>
                <span className="text-rose-400 font-mono text-[11px]">Eliminate inferior payoffs</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-bold">2. Column Player (Minimizer)</span>
                <p className="text-slate-300 text-xs">
                  If Column r ≤ Column s across all rows, Column s is dominated. <strong>Delete the LARGER Column s!</strong>
                </p>
                <span className="text-sky-400 font-mono text-[11px]">Eliminate higher liabilities</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-bold">3. Invariance of Game Value</span>
                <p className="text-slate-300 text-xs">
                  Eliminating dominated strategies preserves the exact Value of the Game (v* in ₹).
                </p>
                <span className="text-emerald-400 font-mono text-[11px]">v*_reduced == v*_original</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Interactive Dominance Reducer */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-dom">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 font-bold text-sm">
                  02
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Interactive Dominance Reduction Simulator
                </h2>
              </div>
              <span className="text-xs font-mono text-amber-400 font-semibold">
                Step {reductionStep} of 2
              </span>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Watch how the 3x3 game matrix (in ₹ Thousands) is reduced step-by-step by eliminating inferior strategies:
            </p>

            {/* Matrix View with dynamic strike-throughs */}
            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3 font-mono text-xs sm:text-sm">
              <table className="w-full text-center border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2 text-left">A \ B</th>
                    <th className="p-2 text-sky-400">B₁</th>
                    <th className="p-2 text-sky-400">B₂</th>
                    <th className={clsx('p-2', reductionStep >= 2 ? 'line-through text-rose-500 bg-rose-950/20' : 'text-sky-400')}>
                      B₃ {reductionStep >= 2 ? '(Eliminated)' : ''}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-200">
                  <tr>
                    <td className="p-2 text-left font-bold text-rose-300">A₁</td>
                    <td className="p-2">₹{initialMatrix[0][0]}k</td>
                    <td className="p-2">₹{initialMatrix[0][1]}k</td>
                    <td className={clsx('p-2', reductionStep >= 2 ? 'line-through text-slate-600' : '')}>₹{initialMatrix[0][2]}k</td>
                  </tr>
                  <tr className="bg-emerald-950/20">
                    <td className="p-2 text-left font-bold text-emerald-400">A₂ (Dominating Row)</td>
                    <td className="p-2 font-bold text-emerald-300">₹{initialMatrix[1][0]}k</td>
                    <td className="p-2 font-bold text-emerald-300">₹{initialMatrix[1][1]}k</td>
                    <td className={clsx('p-2 font-bold', reductionStep >= 2 ? 'line-through text-slate-600' : 'text-emerald-300')}>₹{initialMatrix[1][2]}k</td>
                  </tr>
                  <tr className={clsx(reductionStep >= 1 ? 'line-through text-rose-500 bg-rose-950/30' : '')}>
                    <td className="p-2 text-left font-bold text-rose-400">
                      A₃ {reductionStep >= 1 ? '(Eliminated)' : '(Dominated by A₂)'}
                    </td>
                    <td className="p-2">₹{initialMatrix[2][0]}k</td>
                    <td className="p-2">₹{initialMatrix[2][1]}k</td>
                    <td className="p-2">₹{initialMatrix[2][2]}k</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Explanation & Stepper Controls */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2 text-xs sm:text-sm">
              <span className="text-amber-400 font-bold text-sm">
                {reductionStep === 0 && 'Initial State: Compare Row A₂ and Row A₃ (35>15, 45>25, 50>30). Row A₃ is strictly dominated!'}
                {reductionStep === 1 && 'Step 1 Complete: Row A₃ is deleted. In the 2x3 matrix, compare Col B₁ and Col B₃ (20<40, 35<50). Col B₃ is strictly dominated!'}
                {reductionStep === 2 && 'Step 2 Complete: Col B₃ is deleted. Matrix is now reduced to a compact 2x2 game!'}
              </span>
              <p className="text-slate-300">
                {reductionStep === 2
                  ? 'Final 2x2 Matrix: A₁ = [20, 30], A₂ = [35, 45]. Row A₂ strictly dominates Row A₁, reducing directly to saddle point (A₂, B₁) = ₹35,000!'
                  : 'Click Step Forward to eliminate the next dominated strategy.'}
              </p>
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={() => setReductionStep((prev) => Math.max(0, prev - 1))}
                disabled={reductionStep === 0}
                className={clsx(
                  'px-4 py-2 rounded-xl text-xs font-semibold border transition-all',
                  reductionStep === 0
                    ? 'opacity-40 cursor-not-allowed bg-slate-900 text-slate-500 border-slate-800'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                )}
              >
                ◀ Step Back
              </button>
              <button
                onClick={() => setReductionStep((prev) => Math.min(2, prev + 1))}
                disabled={reductionStep === 2}
                className={clsx(
                  'px-4 py-2 rounded-xl text-xs font-semibold border transition-all',
                  reductionStep === 2
                    ? 'opacity-40 cursor-not-allowed bg-slate-900 text-slate-500 border-slate-800'
                    : 'bg-blue-600 text-white border-blue-500 hover:bg-blue-500'
                )}
              >
                Step Forward ▶
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 3: Asymmetric Elimination Rules */}
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
                Asymmetric Elimination Rules Summary
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                <span className="text-rose-400 font-bold text-sm">Row Dominance Rule (Player A):</span>
                <p className="text-slate-300 text-xs">
                  If every entry of Row i ≥ Row j (with at least one strict &gt;), delete <strong>Row j (Smaller Row)</strong>. Player A maximizes payoff, so lower payoffs are inferior.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                <span className="text-sky-400 font-bold text-sm">Column Dominance Rule (Player B):</span>
                <p className="text-slate-300 text-xs">
                  If every entry of Column r ≤ Column s (with at least one strict &lt;), delete <strong>Column s (Larger Column)</strong>. Player B minimizes payout, so higher liabilities are inferior.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Dominance Reduction Architecture SVG */}
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
                Dominance Reduction & Dimensionality Pruning Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 180"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Large Matrix */}
                <rect x="30" y="35" width="160" height="110" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <text x="110" y="60" fill="#f43f5e" fontSize="11" fontWeight="bold" textAnchor="middle">Initial m × n Matrix</text>
                <text x="110" y="85" fill="#cbd5e1" fontSize="8" textAnchor="middle">All Feasible Moves</text>
                <text x="110" y="105" fill="#cbd5e1" fontSize="8" textAnchor="middle">Identify Dominated Rows</text>
                <text x="110" y="125" fill="#f87171" fontSize="8" textAnchor="middle">Delete Smaller Rows</text>

                <line x1="190" y1="90" x2="270" y2="90" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="270,90 260,85 260,95" fill="#38bdf8" />

                {/* Reduced Matrix */}
                <rect x="270" y="35" width="180" height="110" rx="8" fill="#1e293b" stroke="#818cf8" strokeWidth="2" />
                <text x="360" y="60" fill="#818cf8" fontSize="11" fontWeight="bold" textAnchor="middle">Intermediate Reduction</text>
                <text x="360" y="85" fill="#cbd5e1" fontSize="8" textAnchor="middle">Inspect Remaining Columns</text>
                <text x="360" y="105" fill="#cbd5e1" fontSize="8" textAnchor="middle">Identify Dominated Cols</text>
                <text x="360" y="125" fill="#818cf8" fontSize="8" textAnchor="middle">Delete Larger Columns</text>

                <line x1="450" y1="90" x2="530" y2="90" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="530,90 520,85 520,95" fill="#38bdf8" />

                {/* Final 2x2 or 1x1 */}
                <rect x="530" y="35" width="180" height="110" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="620" y="60" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">Final 2 × 2 / 1 × 1</text>
                <text x="620" y="85" fill="#cbd5e1" fontSize="8" textAnchor="middle">Solvable via Algebra / Saddle</text>
                <text x="620" y="105" fill="#fde68a" fontSize="8" textAnchor="middle">Exact Value v* Preserved in ₹</text>
                <text x="620" y="125" fill="#a7f3d0" fontSize="8" textAnchor="middle">Dominated Strategies p=0</text>
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
                Bengal Operations Research Dominance Case Studies
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
                  trap: 'Eliminating the Larger Row instead of the Smaller Row',
                  fix: 'Player A is a Maximizer; always eliminate the row with SMALLER entries.',
                },
                {
                  trap: 'Eliminating the Smaller Column instead of the Larger Column',
                  fix: 'Player B is a Minimizer; always eliminate the column with LARGER entries (higher liabilities).',
                },
                {
                  trap: 'Eliminating a Row/Col when Dominance Holds for only SOME Cells',
                  fix: 'Dominance must hold across EVERY single cell in the row or column without exception.',
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
                  Think of the Principle of Dominance like cleaning a closet: if one jacket is warmer, cheaper, and more durable than another in every single weather condition, you can safely discard the inferior jacket!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how deleting a row changes the column comparison: columns that were not dominated before may now become dominated in the smaller matrix!
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
                Student Revision Checklist (Topic 0)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Understood the rationality premise of the Principle of Dominance',
                'Applied the Row Dominance rule (delete smaller row for Player A)',
                'Applied the Column Dominance rule (delete larger column for Player B)',
                'Differentiated strict dominance from weak dominance',
                'Executed Iterated Elimination of Dominated Strategies (IEDS)',
                'Reported reduced matrix payoffs and game values in Indian Rupees (₹)',
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
              "Welcome to Module 005_003 (Principle of Dominance), Debangshu, Mamata, Mahima, Susmita, and Abhronila! Dominance is your master pruning tool for taming large, intimidating game matrices. Remember the cardinal rule: delete smaller rows for Player A and larger columns for Player B! In our next topic (Topic 1), we will examine Row Dominance rules in rigorous detail!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Principle of Dominance FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Principle of Dominance (Game Theory)"
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
