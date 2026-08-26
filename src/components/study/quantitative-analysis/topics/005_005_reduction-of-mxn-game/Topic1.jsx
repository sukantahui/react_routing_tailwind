// src/components/study/quantitative-analysis/topics/005_005_reduction-of-mxn-game/Topic1.jsx
// React 19 Function-based Component
// Module: 005_005_reduction-of-mxn-game
// Topic 1: Reduction of m×n games

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic1_files/topic1_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic1_files/topic1_note.txt?raw';

const Topic1 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);

  // Stepper state: 0 to 4
  const [reductionPass, setReductionPass] = useState(0);

  // Full 4x4 initial matrix (in ₹ Thousands)
  const initial4x4 = [
    [30, 40, 20, 50], // A1
    [40, 50, 10, 60], // A2
    [20, 30, 10, 40], // A3 (Dominated in Pass 3)
    [10, 20, 10, 30], // A4 (Dominated in Pass 1)
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
      title: '1. Foundry 4x4 Grid Multi-Pass Reduction (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Executed a 3-pass reduction on a 4x4 bidding grid in Barrackpore: Pass 1 (pruned Row 4) ➔ Pass 2 (pruned Cols 2 & 4) ➔ Pass 3 (pruned Row 3), solving 2x2 to p* = [0.6, 0.4, 0, 0] and securing ₹28,000 profit.',
      lesson: 'Iterative reduction breaks high-dimensional deadlock into solvable 2x2 pieces.',
    },
    {
      title: '2. Cold-Chain Transport 3x4 Route Optimization (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Reduced a 3x4 logistics matrix in Kolkata to a 2x2 fleet allocation across 2 passes, determining optimal truck splits and stabilizing transport costs at ₹22,500.',
      lesson: 'Column deletions expose newly dominant fleet routes.',
    },
    {
      title: '3. Supermarket FMCG Retail 4x3 Multi-Tier Campaign (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Reduced a 4x3 retail pricing matrix down to 2 active weekend strategies in Ichapur, eliminating 2 unprofitable promotional moves and securing ₹32,000 in revenue.',
      lesson: 'Multi-pass pruning eliminates unprofitable promotions.',
    },
    {
      title: '4. Educational High-Tech Lab 4x4 Patent Arbitration (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Reduced a 4x4 arbitration matrix in Jadavpur down to a 2x2 legal game, calculating exact 50-50 strategy weights and securing ₹18 Lakh for university research.',
      lesson: 'Full-vector reconstruction maps sub-game solutions directly to original institutional options.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes mxnRedGlow {
          0%, 100% { border-color: rgba(99, 102, 241, 0.3); }
          50% { border-color: rgba(99, 102, 241, 0.8); }
        }
        .glow-mxn {
          animation: mxnRedGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-indigo-950/80 text-indigo-400 border border-indigo-800/60">
              Segment 5 • Module 005_005 • Topic 1
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-indigo-950/80 text-indigo-400 border border-indigo-800/60">
              m×n Reduction Algorithm • Cascading Feedback Loop • Vector Mapping
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Reduction of m×n Games
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive study of the <span className="text-indigo-400 font-semibold">Systematic m×n Reduction Algorithm</span>: mastering iterative row/column sweeps, managing the cascading feedback loop, reconstructing full <span className="text-emerald-400 font-mono">m</span>-dimensional and <span className="text-sky-400 font-mono">n</span>-dimensional strategy vectors, and evaluating Game Values in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'five-phase-algorithm', label: '1. 5-Phase Reduction Algorithm' },
              { id: 'interactive-engine', label: '2. Multi-Pass 4x4 Reduction Engine' },
              { id: 'vector-reconstruction', label: '3. Full-Vector Reconstruction' },
              { id: 'svg-feedback-loop', label: '4. Cascading Loop Architecture SVG' },
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
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-900/40'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </header>

        {/* SECTION 1: 5-Phase Reduction Algorithm */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 font-bold text-sm">
                01
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                The 5-Phase Systematic Reduction Algorithm
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-400 font-bold">1. Saddle Check</span>
                <p className="text-slate-300 text-[11px]">Check if Maximin == Minimax. If not, proceed to reduce.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-rose-400 font-bold">2. Row Sweeps</span>
                <p className="text-slate-300 text-[11px]">Delete Row R_j if R_i &gt;= R_j in all columns.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-bold">3. Column Sweeps</span>
                <p className="text-slate-300 text-[11px]">Delete Col C_s if C_r &lt;= C_s in all rows.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-purple-300 font-bold">4. Feedback Loop</span>
                <p className="text-slate-300 text-[11px]">Repeat sweeps until zero further deletions occur.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-bold">5. Convex Blend</span>
                <p className="text-slate-300 text-[11px]">If deadlocked, test convex combination of rows/cols.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Multi-Pass 4x4 Reduction Engine */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-mxn">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 font-bold text-sm">
                  02
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Interactive 4 × 4 Multi-Pass Cascading Reduction Engine
                </h2>
              </div>
              <span className="text-xs font-mono text-amber-400 font-semibold">
                Pass {reductionPass} of 4 (
                {reductionPass === 0 && 'Initial 4x4'}
                {reductionPass === 1 && '3x4 Matrix (Row 4 Dead)'}
                {reductionPass === 2 && '3x2 Matrix (Cols 2 & 4 Dead)'}
                {reductionPass === 3 && '2x2 Matrix (Row 3 Dead)'}
                {reductionPass === 4 && 'Solved & 4D Vector Reconstructed'}
                )
              </span>
            </div>

            {/* Matrix View */}
            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3 font-mono text-xs sm:text-sm">
              <table className="w-full text-center border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2 text-left">A \ B</th>
                    <th className="p-2 text-sky-400">B₁</th>
                    <th className={clsx('p-2', reductionPass >= 2 ? 'line-through text-slate-600 bg-rose-950/20' : 'text-sky-400')}>
                      B₂ {reductionPass >= 2 ? '(Pruned)' : ''}
                    </th>
                    <th className="p-2 text-sky-400">B₃</th>
                    <th className={clsx('p-2', reductionPass >= 2 ? 'line-through text-slate-600 bg-rose-950/20' : 'text-sky-400')}>
                      B₄ {reductionPass >= 2 ? '(Pruned)' : ''}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-200">
                  {initial4x4.map((row, rIdx) => {
                    const isRow4Dead = reductionPass >= 1 && rIdx === 3;
                    const isRow3Dead = reductionPass >= 3 && rIdx === 2;
                    const isRowDead = isRow4Dead || isRow3Dead;
                    return (
                      <tr key={rIdx} className={clsx(isRowDead ? 'line-through bg-rose-950/30 text-slate-600' : '')}>
                        <td className="p-2 text-left font-bold text-rose-300">
                          A_{rIdx + 1} {isRowDead ? '(Pruned)' : ''}
                        </td>
                        {row.map((cell, cIdx) => {
                          const isColDead = reductionPass >= 2 && (cIdx === 1 || cIdx === 3);
                          const isDead = isRowDead || isColDead;
                          const isSurvivingCell = reductionPass >= 3 && (rIdx === 0 || rIdx === 1) && (cIdx === 0 || cIdx === 2);
                          return (
                            <td
                              key={cIdx}
                              className={clsx(
                                'p-2 font-bold',
                                isDead
                                  ? 'text-slate-600'
                                  : isSurvivingCell
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

            {/* Pass Description */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2 text-xs sm:text-sm">
              <span className="text-amber-400 font-bold text-sm">
                {reductionPass === 0 && 'Initial 4×4 Matrix (16 cells): Maximin = 10, Minimax = 30 ➔ No pure saddle point.'}
                {reductionPass === 1 && 'Pass 1 (Row Sweep): Row A₁ [30, 40, 20, 50] strictly dominates Row A₄ [10, 20, 10, 30]. Row A₄ is deleted! (Matrix: 3×4)'}
                {reductionPass === 2 && 'Pass 2 (Column Sweep): In the 3×4 matrix, Col B₁ [30, 40, 20] dominates Col B₂ [40, 50, 30], and Col B₃ [20, 10, 10] dominates Col B₄ [50, 60, 40]. Cols B₂ & B₄ deleted! (Matrix: 3×2)'}
                {reductionPass === 3 && 'Pass 3 (Cascading Row Sweep): In the 3×2 matrix, Row A₁ [30, 20] dominates Row A₃ [20, 10]! Row A₃ is deleted! Matrix shrinks to 2×2: [[30, 20], [40, 10]]!'}
                {reductionPass === 4 && 'Pass 4 (Solved & Reconstructed): Δ = (30+10) − (20+40) = -20. Sub-game p_sub* = [0.75, 0.25], q_sub* = [0.25, 0.75]. det(A) = 300 - 800 = -500. Game Value v* = -500/-20 = +₹25,000!'}
              </span>
            </div>

            {/* Reconstructed Full-Vector Display (in Pass 4) */}
            {reductionPass === 4 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                  <span className="text-rose-400 font-sans font-bold">Full 4D Vector p*:</span>
                  <span className="text-slate-200">p* = [0.75, 0.25, 0.00, 0.00]ᵀ</span>
                  <span className="text-slate-400 text-[11px]">Rows A₃ & A₄ receive 0.0</span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                  <span className="text-sky-400 font-sans font-bold">Full 4D Vector q*:</span>
                  <span className="text-slate-200">q* = [0.25, 0.00, 0.75, 0.00]ᵀ</span>
                  <span className="text-slate-400 text-[11px]">Cols B₂ & B₄ receive 0.0</span>
                </div>

                <div className="p-3.5 bg-emerald-950/60 rounded-xl border border-emerald-600 flex flex-col space-y-1">
                  <span className="text-emerald-400 font-sans font-bold">Value of Game v*:</span>
                  <span className="text-emerald-300 font-bold text-base">+₹25,000</span>
                  <span className="text-emerald-400 text-[11px]">100% Invariant in ₹</span>
                </div>
              </div>
            )}

            {/* Stepper Navigation */}
            <div className="flex justify-between items-center">
              <button
                onClick={() => setReductionPass((prev) => Math.max(0, prev - 1))}
                disabled={reductionPass === 0}
                className={clsx(
                  'px-4 py-2 rounded-xl text-xs font-semibold border transition-all',
                  reductionPass === 0
                    ? 'opacity-40 cursor-not-allowed bg-slate-900 text-slate-500 border-slate-800'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                )}
              >
                ◀ Previous Pass
              </button>
              <button
                onClick={() => setReductionPass((prev) => Math.min(4, prev + 1))}
                disabled={reductionPass === 4}
                className={clsx(
                  'px-4 py-2 rounded-xl text-xs font-semibold border transition-all',
                  reductionPass === 4
                    ? 'opacity-40 cursor-not-allowed bg-slate-900 text-slate-500 border-slate-800'
                    : 'bg-indigo-600 text-white border-indigo-500 hover:bg-indigo-500'
                )}
              >
                Next Pass ▶
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 3: Full-Vector Reconstruction */}
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
                Full-Vector Probability Reconstruction Principle
              </h2>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-3 text-xs sm:text-sm">
              <p className="text-slate-300 leading-relaxed">
                When an <span className="text-indigo-400 font-mono font-bold">m × n</span> matrix is reduced to a smaller <span className="text-emerald-400 font-mono font-bold">2 × 2</span> submatrix, you must map the 2-dimensional probabilities back to the original <span className="text-amber-400 font-mono font-bold">m</span>-dimensional and <span className="text-sky-400 font-mono font-bold">n</span>-dimensional vectors:
              </p>
              <div className="p-3 bg-slate-900 rounded-lg text-center font-mono font-bold text-emerald-300">
                p_i* = p_sub,1* &nbsp;(if i == r₁), &nbsp; p_sub,2* &nbsp;(if i == r₂), &nbsp; 0.0 &nbsp;(otherwise)
              </div>
              <p className="text-slate-400 text-xs">
                All eliminated strategies receive probability 0.0, ensuring the full vector sums to 1.0 (100%).
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Cascading Loop Architecture SVG */}
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
                Cascading Feedback Loop Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 180"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* 4x4 */}
                <rect x="20" y="45" width="110" height="90" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <text x="75" y="75" fill="#f43f5e" fontSize="11" fontWeight="bold" textAnchor="middle">4 × 4 Grid</text>
                <text x="75" y="95" fill="#cbd5e1" fontSize="9" textAnchor="middle">16 Cells</text>
                <text x="75" y="115" fill="#fca5a5" fontSize="8" textAnchor="middle">Pass 0</text>

                <line x1="130" y1="90" x2="180" y2="90" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="180,90 170,85 170,95" fill="#38bdf8" />

                {/* 3x4 */}
                <rect x="180" y="45" width="110" height="90" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="235" y="75" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">3 × 4 Grid</text>
                <text x="235" y="95" fill="#cbd5e1" fontSize="9" textAnchor="middle">Row 4 Pruned</text>
                <text x="235" y="115" fill="#fde68a" fontSize="8" textAnchor="middle">Pass 1</text>

                <line x1="290" y1="90" x2="340" y2="90" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="340,90 330,85 330,95" fill="#38bdf8" />

                {/* 3x2 */}
                <rect x="340" y="45" width="110" height="90" rx="8" fill="#1e293b" stroke="#818cf8" strokeWidth="2" />
                <text x="395" y="75" fill="#818cf8" fontSize="11" fontWeight="bold" textAnchor="middle">3 × 2 Grid</text>
                <text x="395" y="95" fill="#cbd5e1" fontSize="9" textAnchor="middle">Cols 2 & 4 Pruned</text>
                <text x="395" y="115" fill="#c7d2fe" fontSize="8" textAnchor="middle">Pass 2</text>

                <line x1="450" y1="90" x2="500" y2="90" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="500,90 490,85 490,95" fill="#38bdf8" />

                {/* 2x2 */}
                <rect x="500" y="45" width="110" height="90" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="555" y="75" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">2 × 2 Matrix</text>
                <text x="555" y="95" fill="#ffffff" fontSize="9" textAnchor="middle">Row 3 Pruned</text>
                <text x="555" y="115" fill="#a7f3d0" fontSize="8" textAnchor="middle">Pass 3</text>

                <line x1="610" y1="90" x2="650" y2="90" stroke="#34d399" strokeWidth="2" />
                <polygon points="650,90 640,85 640,95" fill="#34d399" />

                {/* Solved v* */}
                <rect x="650" y="55" width="70" height="70" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="685" y="85" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">v* in ₹</text>
                <text x="685" y="105" fill="#fde68a" fontSize="8" textAnchor="middle">₹25,000</text>
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
                Bengal Operations Research m×n Reduction Case Studies
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
                  <p className="text-indigo-300 font-semibold">💡 <strong>Operations Takeaway:</strong> {cs.lesson}</p>
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
                  trap: 'Stopping After 1 Pass (Failing to Re-Evaluate Rows After Column Deletions)',
                  fix: 'Always loop back! Column deletions remove constraints and often expose newly dominant rows.',
                },
                {
                  trap: 'Player B Deleting Smaller Columns Instead of Larger Columns',
                  fix: 'Player B is a MINIMIZER and deletes LARGER columns (higher payouts/costs).',
                },
                {
                  trap: 'Reporting Only the 2D Sub-Game Probabilities Instead of Full mD/nD Vectors',
                  fix: 'Reconstruct full vectors: assign 0.0 to all pruned rows and columns.',
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
                  Think of the cascading loop like playing tournament knockout rounds: each round eliminates weaker contenders until only the true championship finalists remain (the 2x2 core)!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how Row 3 was NOT dominated in the 4x4 grid, but became strictly dominated after Columns 2 and 4 were eliminated in Pass 2!
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
                Student Revision Checklist (Topic 1)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Mastered the 5-phase reduction algorithm',
                'Understood the cascading feedback loop mechanism',
                'Reconstructed full m-dimensional and n-dimensional strategy vectors (p*, q*)',
                'Verified that eliminated actions receive probability 0.0',
                'Reported all game values and payoffs in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: Cascading sweeps are the heart of matrix reduction! Always re-check row dominance after every column deletion. In our next topic (Topic 2), we will examine advanced Use of Dominance for Reduction!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Reduction of mxn Games FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Reduction of m×n Games"
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

export default Topic1;
