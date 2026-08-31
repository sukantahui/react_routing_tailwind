// src/components/study/quantitative-analysis/topics/005_005_reduction-of-mxn-game/Topic0.jsx
// React 19 Function-based Component
// Module: 005_005_reduction-of-mxn-game
// Topic 0: Need for reducing larger payoff matrices

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

  // Stepper: 0 = Full 5x4 Grid (20 cells), 1 = Pruned Rows to 2x4 (8 cells), 2 = Pruned Cols to 2x2 (4 cells), 3 = Instant Solution
  const [streamlineStep, setStreamlineStep] = useState(0);

  const initial5x4 = [
    [40, 20, 50, 60], // A1 (Retained)
    [50, 30, 60, 70], // A2 (Dominating Row, Retained)
    [20, 10, 30, 40], // A3 (Dominated by A1)
    [25, 15, 35, 45], // A4 (Dominated by A2)
    [30, 10, 40, 50], // A5 (Dominated by A1)
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
      title: '1. Foundry 5x4 Alloy Bidding Grid Streamlining (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Evaluated 5 production schedules against 4 rival bids in Barrackpore. Dimensionality reduction eliminated 3 dominated rows and 2 dominated columns, shrinking the grid to 2x2 and locking in ₹35,000 profit without Simplex LP.',
      lesson: 'Pre-reduction transforms heavy multi-tableau LP problems into instant calculations.',
    },
    {
      title: '2. Cold-Chain Multi-City Route Pruning (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Pruned a 4x4 regional vaccine distribution matrix in Kolkata down to a solvable 2x2 fleet game, saving ₹1.2 Lakh in software consulting and modeling fees.',
      lesson: 'Dimensionality reduction saves computational overhead and consultant costs.',
    },
    {
      title: '3. Supermarket FMCG Retail Promotional Trimming (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Reduced an unmanageable 6x4 retail discount matrix in Ichapur down to 2 core promotional moves, eliminating margin bleed and securing ₹28,000 in weekly revenue.',
      lesson: 'Pruning uncovers core strategic trade-offs in retail campaigns.',
    },
    {
      title: '4. Educational High-Tech Lab Licensing Streamlining (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Reduced a 5x5 institutional negotiation matrix in Jadavpur down to a 2x2 arbitration game, creating an equitable ₹20 Lakh university licensing settlement.',
      lesson: 'Matrix reduction produces auditable and transparent dispute settlements.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes streamGlow {
          0%, 100% { border-color: rgba(59, 130, 246, 0.3); }
          50% { border-color: rgba(59, 130, 246, 0.8); }
        }
        .glow-stream {
          animation: streamGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-blue-950/80 text-blue-400 border border-blue-800/60">
              Segment 5 • Module 005_005 • Topic 0
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-blue-950/80 text-blue-400 border border-blue-800/60">
              m×n Reduction • Computational Complexity • Streamlining
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
            Need for Reducing Larger Payoff Matrices
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive foundation on the <span className="text-blue-400 font-semibold">Need for Matrix Dimensionality Reduction</span>: overcoming computational bottlenecks of large <span className="text-amber-400 font-mono">m × n</span> payoff matrices, avoiding bulky Simplex tableaus, isolating equilibrium strategy supports, and preserving the Game Value in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'computational-bottleneck', label: '1. The Complexity Bottleneck' },
              { id: 'interactive-streamliner', label: '2. 5x4 Grid Streamliner Studio' },
              { id: 'target-architectures', label: '3. Reduction Target Architectures' },
              { id: 'svg-pipeline', label: '4. Dimensionality Flowchart SVG' },
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

        {/* SECTION 1: The Complexity Bottleneck */}
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
                The Computational Bottleneck of Large m × n Games
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-rose-400 font-bold">1. Without Reduction</span>
                <p className="text-slate-300 text-xs">
                  Solving general m×n games directly requires heavy Linear Programming Simplex tableaus.
                </p>
                <span className="text-rose-400 font-mono text-[11px]">m+n variables + Simplex LP</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-bold">2. With Reduction</span>
                <p className="text-slate-300 text-xs">
                  Pruning dominated rows/cols reduces the game to 2×2, 2×n, or 1×1 in seconds!
                </p>
                <span className="text-sky-400 font-mono text-[11px]">Closed-form 2x2 or Graphical</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-bold">3. Invariance Theorem</span>
                <p className="text-slate-300 text-xs">
                  The optimal Game Value v* and non-zero strategy probabilities remain 100% invariant in ₹.
                </p>
                <span className="text-emerald-400 font-mono text-[11px]">v*_reduced == v*_original</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: 5x4 Grid Streamliner Studio */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-stream">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 font-bold text-sm">
                  02
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Interactive 5 × 4 Enterprise Grid Streamliner Studio
                </h2>
              </div>
              <span className="text-xs font-mono text-amber-400 font-semibold">
                Step {streamlineStep} of 3 (
                {streamlineStep === 0 && '20 Cells Raw Grid'}
                {streamlineStep === 1 && '8 Cells (Rows Pruned)'}
                {streamlineStep === 2 && '4 Cells (2x2 Solvable)'}
                {streamlineStep === 3 && 'Instant Closed-Form Solution'}
                )
              </span>
            </div>

            {/* Matrix View with dynamic pruning */}
            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3 font-mono text-xs sm:text-sm">
              <table className="w-full text-center border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2 text-left">A \ B</th>
                    <th className="p-2 text-sky-400">B₁</th>
                    <th className="p-2 text-sky-400">B₂</th>
                    <th className={clsx('p-2', streamlineStep >= 2 ? 'line-through text-slate-600 bg-rose-950/20' : 'text-sky-400')}>
                      B₃ {streamlineStep >= 2 ? '(Pruned)' : ''}
                    </th>
                    <th className={clsx('p-2', streamlineStep >= 2 ? 'line-through text-slate-600 bg-rose-950/20' : 'text-sky-400')}>
                      B₄ {streamlineStep >= 2 ? '(Pruned)' : ''}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-200">
                  {initial5x4.map((row, rIdx) => {
                    const isRowDead = streamlineStep >= 1 && (rIdx === 2 || rIdx === 3 || rIdx === 4);
                    return (
                      <tr key={rIdx} className={clsx(isRowDead ? 'line-through bg-rose-950/30 text-slate-600' : '')}>
                        <td className="p-2 text-left font-bold text-rose-300">
                          A_{rIdx + 1} {isRowDead ? '(Pruned)' : ''}
                        </td>
                        {row.map((cell, cIdx) => {
                          const isColDead = streamlineStep >= 2 && (cIdx === 2 || cIdx === 3);
                          const isDead = isRowDead || isColDead;
                          return (
                            <td
                              key={cIdx}
                              className={clsx(
                                'p-2 font-bold',
                                isDead
                                  ? 'text-slate-600'
                                  : streamlineStep === 3 && rIdx < 2 && cIdx < 2
                                  ? 'bg-emerald-950/40 text-emerald-300 ring-1 ring-emerald-500 rounded'
                                  : 'text-slate-200'
                              )}
                            >
                              ₹{cell}k
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Stepper Description Banner */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2 text-xs sm:text-sm">
              <span className="text-amber-400 font-bold text-sm">
                {streamlineStep === 0 && 'Raw 5×4 Matrix: 20 decision cells. Direct solution requires setting up a 9-variable Simplex LP.'}
                {streamlineStep === 1 && 'Step 1 (Row Pruning): Rows A₃, A₄, and A₅ are strictly dominated by Row A₁ and Row A₂. Pruned to a 2×4 matrix (8 cells)!'}
                {streamlineStep === 2 && 'Step 2 (Column Pruning): In the 2×4 matrix, Col B₁ [40, 50] and Col B₂ [20, 30] dominate Col B₃ and Col B₄. Pruned to 2×2 (4 cells)!'}
                {streamlineStep === 3 && 'Step 3 (Instant Solution): Surviving 2×2 matrix has dominant Row A₂ [50, 30] and Col B₂ (30), yielding instant game value v* = +₹30,000!'}
              </span>
              <p className="text-slate-300">
                {streamlineStep === 3
                  ? 'Total Simplex Tableaus Saved: 5 iterations! Problem solved in under 10 seconds.'
                  : 'Click Next Step to watch the matrix shrink systematically.'}
              </p>
            </div>

            {/* Stepper Navigation */}
            <div className="flex justify-between items-center">
              <button
                onClick={() => setStreamlineStep((prev) => Math.max(0, prev - 1))}
                disabled={streamlineStep === 0}
                className={clsx(
                  'px-4 py-2 rounded-xl text-xs font-semibold border transition-all',
                  streamlineStep === 0
                    ? 'opacity-40 cursor-not-allowed bg-slate-900 text-slate-500 border-slate-800'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                )}
              >
                ◀ Previous Step
              </button>
              <button
                onClick={() => setStreamlineStep((prev) => Math.min(3, prev + 1))}
                disabled={streamlineStep === 3}
                className={clsx(
                  'px-4 py-2 rounded-xl text-xs font-semibold border transition-all',
                  streamlineStep === 3
                    ? 'opacity-40 cursor-not-allowed bg-slate-900 text-slate-500 border-slate-800'
                    : 'bg-blue-600 text-white border-blue-500 hover:bg-blue-500'
                )}
              >
                Next Step ▶
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 3: Reduction Target Architectures */}
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
                The Three Target Reduction Architectures
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                <span className="text-emerald-400 font-sans font-bold">Target 1: 1 × 1 Saddle Point</span>
                <p className="text-slate-300 text-xs">
                  Occurs in dominance-solvable strictly determined games. The game reduces directly to a single cell value v* in ₹.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                <span className="text-indigo-400 font-sans font-bold">Target 2: 2 × 2 Submatrix</span>
                <p className="text-slate-300 text-xs">
                  Solvable via closed-form algebraic formulas: Δ = (a₁₁+a₂₂) − (a₁₂+a₂₁), p*, q*, and v* = det(A)/Δ.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                <span className="text-sky-400 font-sans font-bold">Target 3: 2 × n / m × 2 Submatrix</span>
                <p className="text-slate-300 text-xs">
                  Solvable via the 2D Graphical Method by plotting expected payoff lines and finding lower/upper envelopes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Dimensionality Flowchart SVG */}
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
                Dimensionality Bottleneck vs Streamlined Pipeline
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 180"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Unreduced Bottleneck */}
                <rect x="30" y="30" width="310" height="120" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <text x="185" y="55" fill="#f43f5e" fontSize="11" fontWeight="bold" textAnchor="middle">Unreduced Path (High Overhead)</text>
                <text x="185" y="80" fill="#fca5a5" fontSize="9" textAnchor="middle">5 × 5 Raw Matrix (25 Cells)</text>
                <text x="185" y="100" fill="#fca5a5" fontSize="9" textAnchor="middle">Dual Linear Programming + 10 Slack Variables</text>
                <text x="185" y="120" fill="#f87171" fontSize="9" textAnchor="middle">⚠️ Complex Simplex Tableaus & Time Loss</text>

                {/* Streamlined Reduction Pipeline */}
                <rect x="400" y="30" width="310" height="120" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="555" y="55" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">Streamlined Reduction Pipeline</text>
                <text x="555" y="80" fill="#ffffff" fontSize="9" textAnchor="middle">5 × 5 ➔ 2 × 4 ➔ 2 × 2 (4 Core Cells)</text>
                <text x="555" y="100" fill="#ffffff" fontSize="9" textAnchor="middle">Instant Closed-Form Formula v* = det(A)/Δ</text>
                <text x="555" y="120" fill="#fde68a" fontSize="9" textAnchor="middle">🎯 100% Exact Value Preserved in ₹!</text>
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
                Bengal Operations Research Matrix Streamlining Case Studies
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
                  trap: 'Immediately Setting Up a Large Linear Program Without Checking for Dominance',
                  fix: 'Always attempt multi-pass dominance reduction first; 80% of textbook games shrink to 2x2 or 1x1.',
                },
                {
                  trap: 'Believing that Matrix Reduction Changes the Optimal Game Value',
                  fix: 'The Value of the Game v* is strictly identical before and after dominance reduction in ₹.',
                },
                {
                  trap: 'Forgetting to Re-Index and Map 0.0 Probabilities to Eliminated Strategies',
                  fix: 'Keep track of original row/col indices and assign probability 0.0 to all pruned actions.',
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
                  Think of matrix reduction like pruning a fruit tree: cutting away dead branches allows the tree to focus its energy on the core fruit-bearing limbs (the active strategy support)!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how reducing the 5x4 matrix down to 2x2 saved five full Simplex tableau iterations without sacrificing a single decimal of precision!
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
                'Recognized the computational bottlenecks of large unreduced m x n matrices',
                'Understood the 3 reduction targets: 1x1 (Saddle), 2x2 (Algebraic), and 2xn/mx2 (Graphical)',
                'Understood how reduction isolates the strategy support supp(p*) and supp(q*)',
                'Verified that the Value of the Game v* is invariant under all valid reductions',
                'Reported all matrix payoffs and game values in Indian Rupees (₹)',
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
              "Welcome to Module 005_005 (Reduction of m×n Games), Debangshu, Mamata, Mahima, Susmita, and Abhronila! Never jump straight to heavy Linear Programming tableaus when dealing with large matrices. Always look to reduce and prune first! In our next topic (Topic 1), we will formalize the complete reduction of m×n games!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Need for Matrix Reduction FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Need for Reducing Larger Payoff Matrices"
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
