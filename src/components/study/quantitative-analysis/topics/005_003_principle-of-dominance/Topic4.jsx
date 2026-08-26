// src/components/study/quantitative-analysis/topics/005_003_principle-of-dominance/Topic4.jsx
// React 19 Function-based Component
// Module: 005_003_principle-of-dominance
// Topic 4: Reducing matrix size using dominance

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic4_files/topic4_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic4_files/topic4_note.txt?raw';

const Topic4 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);

  // Multi-pass reduction stepper: 0 = 4x4, 1 = 3x4 (Del A3), 2 = 3x3 (Del B4), 3 = 2x3 (Del A4), 4 = 2x2 (Del B3)
  const [passStep, setPassStep] = useState(0);

  const initial4x4 = [
    [30, 20, 40, 50],
    [40, 30, 50, 60],
    [20, 15, 30, 40], // Dominated by Row 1
    [25, 20, 35, 45], // Dominated by Row 2 later
  ];

  const stepsInfo = [
    {
      title: 'Pass 0: Initial 4 × 4 Game Matrix',
      desc: 'Compare all row pairs. Notice that Row A₁ [30, 20, 40, 50] strictly dominates Row A₃ [20, 15, 30, 40] across all 4 columns.',
      action: 'Delete Row A₃.',
      deletedRow: null,
      deletedCol: null,
      size: '4 × 4',
      pVector: ['p₁', 'p₂', 'p₃', 'p₄'],
      qVector: ['q₁', 'q₂', 'q₃', 'q₄'],
    },
    {
      title: 'Pass 1: Row A₃ Deleted ➔ Matrix is now 3 × 4',
      desc: 'In the surviving 3 × 4 matrix, inspect all column pairs for Player B. Notice that Column B₂ [20, 30, 20] strictly dominates Column B₄ [50, 60, 45] (B₂ has lower liabilities across all 3 rows).',
      action: 'Delete Column B₄ (Larger Column).',
      deletedRow: 2, // A3
      deletedCol: null,
      size: '3 × 4',
      pVector: ['p₁', 'p₂', '0.0', 'p₄'],
      qVector: ['q₁', 'q₂', 'q₃', 'q₄'],
    },
    {
      title: 'Pass 2: Column B₄ Deleted ➔ Matrix is now 3 × 3',
      desc: 'In the surviving 3 × 3 matrix, re-evaluate rows! Notice that Row A₂ [40, 30, 50] now strictly dominates Row A₄ [25, 20, 35] across all 3 remaining columns.',
      action: 'Delete Row A₄ (Smaller Row).',
      deletedRow: 2,
      deletedCol: 3, // B4
      size: '3 × 3',
      pVector: ['p₁', 'p₂', '0.0', 'p₄'],
      qVector: ['q₁', 'q₂', 'q₃', '0.0'],
    },
    {
      title: 'Pass 3: Row A₄ Deleted ➔ Matrix is now 2 × 3',
      desc: 'In the surviving 2 × 3 matrix, inspect the remaining columns: Column B₁ [30, 40] strictly dominates Column B₃ [40, 50] for Player B.',
      action: 'Delete Column B₃ (Larger Column).',
      deletedRow: 3, // A4 also deleted
      deletedCol: 3,
      size: '2 × 3',
      pVector: ['p₁', 'p₂', '0.0', '0.0'],
      qVector: ['q₁', 'q₂', 'q₃', '0.0'],
    },
    {
      title: 'Pass 4: Column B₃ Deleted ➔ Final Reduced 2 × 2 Matrix!',
      desc: 'The original 4 × 4 matrix is now reduced to a compact 2 × 2 matrix with surviving rows (A₁, A₂) and surviving columns (B₁, B₂): A₁ = [30, 20], A₂ = [40, 30].',
      action: 'Matrix successfully reduced! Ready for closed-form algebraic 2x2 solution.',
      deletedRow: 3,
      deletedCol: 2, // B3 also deleted
      size: '2 × 2',
      pVector: ['p₁*', 'p₂*', '0.0', '0.0'],
      qVector: ['q₁*', 'q₂*', '0.0', '0.0'],
    },
  ];

  const currentInfo = stepsInfo[passStep];

  const isRowDeleted = (rIdx) => {
    if (rIdx === 2 && passStep >= 1) return true;
    if (rIdx === 3 && passStep >= 3) return true;
    return false;
  };

  const isColDeleted = (cIdx) => {
    if (cIdx === 3 && passStep >= 2) return true;
    if (cIdx === 2 && passStep >= 4) return true;
    return false;
  };

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
      title: '1. Foundry Multi-Pass Bidding Reduction (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Reduced a 4x4 metal casting bidding matrix to a 2x2 game in 3 iterative passes in Barrackpore, solving it in 2 minutes to lock in a ₹35,000 game value.',
      lesson: 'Multi-pass reduction transforms complex bids into fast, closed-form calculations.',
    },
    {
      title: '2. Cold-Chain Multi-Modal Route Reduction (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Pruned a 4x3 transport grid down to a 2x2 game in Kolkata, identifying the optimal mixed freight ratio without using complex linear programming tableaus.',
      lesson: 'Systematic reduction saves significant consulting and computing time.',
    },
    {
      title: '3. Supermarket FMCG Retail Matrix Shrinking (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Reduced a 3x3 weekend marketing competition to a 2x2 matrix in Ichapur, calculating the exact mixed discount probabilities to protect retail footfall.',
      lesson: 'Iterated dominance isolates core promotional strategies.',
    },
    {
      title: '4. Educational High-Tech Lab Negotiation Shrinking (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Reduced a 5x4 university cross-licensing game down to a 2x2 matrix in Jadavpur, providing legal auditors with a transparent 2-page mathematical settlement.',
      lesson: 'Shrinking matrices simplifies institutional legal negotiations.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes reduceGlow {
          0%, 100% { border-color: rgba(52, 211, 153, 0.3); }
          50% { border-color: rgba(52, 211, 153, 0.8); }
        }
        .glow-reduce {
          animation: reduceGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
              Segment 5 • Module 005_003 • Topic 4
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
              Multi-Pass Reduction • Cascading Pruning • Vector Reconstruction
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Reducing Matrix Size Using Dominance
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive study of <span className="text-emerald-400 font-semibold">Matrix Size Reduction</span>: mastering the multi-pass elimination pipeline (<span className="text-sky-400 font-mono">4×4 ➔ 3×4 ➔ 3×3 ➔ 2×3 ➔ 2×2</span>), cascading dominance re-evaluations, and full strategy vector reconstruction in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'reduction-pipeline', label: '1. Multi-Pass Reduction Pipeline' },
              { id: 'interactive-studio', label: '2. 4x4 Reduction Studio' },
              { id: 'vector-mapping', label: '3. Strategy Vector Reconstruction' },
              { id: 'svg-flowchart', label: '4. Dimensionality Flowchart SVG' },
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
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-900/40'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </header>

        {/* SECTION 1: Multi-Pass Reduction Pipeline */}
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
                The 4-Pass Iterative Matrix Reduction Pipeline
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-rose-400 font-bold">Pass 1: Row Pruning</span>
                <p className="text-slate-300">Scan row pairs and delete all dominated smaller rows.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-bold">Pass 2: Column Pruning</span>
                <p className="text-slate-300">In trimmed matrix, scan column pairs and delete larger cols.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-300 font-bold">Pass 3: Cascading Re-scan</span>
                <p className="text-slate-300">Re-inspect rows; column deletions create new row dominances!</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-bold">Pass 4: 2×2 / 1×1 Outcome</span>
                <p className="text-slate-300">Solve compact 2×2 matrix and map probabilities to full vector.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: 4x4 Reduction Studio */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-reduce">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                  02
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Interactive 4 × 4 Multi-Pass Reduction Studio
                </h2>
              </div>
              <span className="text-xs font-mono text-amber-400 font-semibold">
                Current Size: {currentInfo.size} (Step {passStep} of 4)
              </span>
            </div>

            {/* Matrix View */}
            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3 font-mono text-xs sm:text-sm">
              <table className="w-full text-center border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2 text-left">A \ B</th>
                    {['B₁', 'B₂', 'B₃', 'B₄'].map((bLabel, cIdx) => {
                      const isDeleted = isColDeleted(cIdx);
                      return (
                        <th
                          key={cIdx}
                          className={clsx(
                            'p-2',
                            isDeleted ? 'line-through text-slate-600 bg-rose-950/20' : 'text-sky-400 font-bold'
                          )}
                        >
                          {bLabel} {isDeleted ? '(Pruned)' : ''}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-200">
                  {initial4x4.map((row, rIdx) => {
                    const isRowDel = isRowDeleted(rIdx);
                    return (
                      <tr key={rIdx} className={clsx(isRowDel ? 'line-through bg-rose-950/30 text-slate-600' : '')}>
                        <td className="p-2 text-left font-bold text-rose-300">
                          A_{rIdx + 1} {isRowDel ? '(Pruned)' : ''}
                        </td>
                        {row.map((cell, cIdx) => {
                          const isColDel = isColDeleted(cIdx);
                          const isCellDead = isRowDel || isColDel;
                          return (
                            <td
                              key={cIdx}
                              className={clsx(
                                'p-2 font-bold',
                                isCellDead
                                  ? 'text-slate-600'
                                  : passStep === 4 && rIdx < 2 && cIdx < 2
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

            {/* Step Explanation Banner */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2 text-xs sm:text-sm">
              <span className="text-emerald-400 font-bold text-base">{currentInfo.title}</span>
              <p className="text-slate-300">{currentInfo.desc}</p>
              <div className="pt-2 border-t border-slate-800 text-amber-300 font-mono text-xs">
                ✂️ <strong>Action:</strong> {currentInfo.action}
              </div>
            </div>

            {/* Stepper Navigation Controls */}
            <div className="flex justify-between items-center">
              <button
                onClick={() => setPassStep((prev) => Math.max(0, prev - 1))}
                disabled={passStep === 0}
                className={clsx(
                  'px-4 py-2 rounded-xl text-xs font-semibold border transition-all',
                  passStep === 0
                    ? 'opacity-40 cursor-not-allowed bg-slate-900 text-slate-500 border-slate-800'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                )}
              >
                ◀ Previous Pass
              </button>
              <button
                onClick={() => setPassStep((prev) => Math.min(4, prev + 1))}
                disabled={passStep === 4}
                className={clsx(
                  'px-4 py-2 rounded-xl text-xs font-semibold border transition-all',
                  passStep === 4
                    ? 'opacity-40 cursor-not-allowed bg-slate-900 text-slate-500 border-slate-800'
                    : 'bg-emerald-600 text-white border-emerald-500 hover:bg-emerald-500'
                )}
              >
                Next Pass ▶
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 3: Strategy Vector Reconstruction */}
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
                Full 4-Dimensional Probability Vector Mapping
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                <span className="text-rose-400 font-sans font-bold">Player A Full Strategy Vector p*:</span>
                <div className="p-3 bg-slate-900 rounded-lg text-emerald-400 font-bold text-center">
                  p* = [{currentInfo.pVector.join(', ')}]ᵀ
                </div>
                <p className="text-slate-400 font-sans text-xs">
                  Pruned rows (A₃, A₄) receive exactly 0.0 probability in equilibrium.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                <span className="text-sky-400 font-sans font-bold">Player B Full Strategy Vector q*:</span>
                <div className="p-3 bg-slate-900 rounded-lg text-sky-300 font-bold text-center">
                  q* = [{currentInfo.qVector.join(', ')}]ᵀ
                </div>
                <p className="text-slate-400 font-sans text-xs">
                  Pruned columns (B₃, B₄) receive exactly 0.0 probability in equilibrium.
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
                Multi-Pass Dimensionality Reduction Flowchart
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 160"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* 4x4 */}
                <rect x="20" y="45" width="110" height="70" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <text x="75" y="75" fill="#f43f5e" fontSize="11" fontWeight="bold" textAnchor="middle">4 × 4</text>
                <text x="75" y="95" fill="#cbd5e1" fontSize="8" textAnchor="middle">Initial Grid</text>

                <line x1="130" y1="80" x2="160" y2="80" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="160,80 150,75 150,85" fill="#38bdf8" />

                {/* 3x4 */}
                <rect x="160" y="45" width="110" height="70" rx="8" fill="#1e293b" stroke="#818cf8" strokeWidth="2" />
                <text x="215" y="75" fill="#818cf8" fontSize="11" fontWeight="bold" textAnchor="middle">3 × 4</text>
                <text x="215" y="95" fill="#fca5a5" fontSize="8" textAnchor="middle">Del Row A₃</text>

                <line x1="270" y1="80" x2="300" y2="80" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="300,80 290,75 290,85" fill="#38bdf8" />

                {/* 3x3 */}
                <rect x="300" y="45" width="110" height="70" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="355" y="75" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">3 × 3</text>
                <text x="355" y="95" fill="#93c5fd" fontSize="8" textAnchor="middle">Del Col B₄</text>

                <line x1="410" y1="80" x2="440" y2="80" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="440,80 430,75 430,85" fill="#38bdf8" />

                {/* 2x3 */}
                <rect x="440" y="45" width="110" height="70" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="495" y="75" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">2 × 3</text>
                <text x="495" y="95" fill="#fde68a" fontSize="8" textAnchor="middle">Del Row A₄</text>

                <line x1="550" y1="80" x2="580" y2="80" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="580,80 570,75 570,85" fill="#38bdf8" />

                {/* 2x2 */}
                <rect x="580" y="45" width="130" height="70" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="645" y="75" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">2 × 2 Final</text>
                <text x="645" y="95" fill="#a7f3d0" fontSize="8" textAnchor="middle">Del Col B₃ ➔ Solved!</text>
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
                Bengal Operations Research Matrix Shrinking Case Studies
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
                  <p className="text-emerald-300 font-semibold">💡 <strong>Operations Takeaway:</strong> {cs.lesson}</p>
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
                  trap: 'Stopping After a Single Pass Without Re-Inspecting the Trimmed Matrix',
                  fix: 'Deleting columns often creates brand new row dominances; always run multi-pass cycles until no further reduction is possible.',
                },
                {
                  trap: 'Mapping Reduced Probabilities to the Wrong Original Strategy Indices',
                  fix: 'Keep track of original index labels (e.g. A₁, A₂) so probabilities are assigned to the correct actions in vector p*.',
                },
                {
                  trap: 'Assuming Matrix Reduction Alters the Value of the Game',
                  fix: 'The Value of the Game v* is strictly identical before and after dominance reduction in ₹.',
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
                  Think of matrix reduction like carving a sculpture: each pass chips away unnecessary stone until the clean, elegant 2x2 solution is revealed!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how deleting Column B₄ in Pass 2 immediately unmasked Row A₄ as dominated in Pass 3: this cascading effect is the true power of iterative dominance!
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
                Student Revision Checklist (Topic 4)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Mastered the 4-pass iterative matrix reduction pipeline',
                'Cascaded reductions by re-inspecting rows after column deletions',
                'Reconstructed full-dimensional probability vectors p* and q*',
                'Verified that Value of the Game v* is invariant under all reduction passes',
                'Reported reduced matrix values in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: Matrix size reduction is your operational shortcut to solving large games! Shrink from 4x4 to 2x2 systematically, re-evaluating after every cut. In our next topic (Topic 5), we will work through comprehensive step-by-step reduction examples across diverse matrix architectures!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Reducing Matrix Size FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Reducing Matrix Size (Game Theory)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic5_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic4;
