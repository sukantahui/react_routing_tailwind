// src/components/study/quantitative-analysis/topics/005_005_reduction-of-mxn-game/Topic6.jsx
// React 19 Function-based Component
// Module: 005_005_reduction-of-mxn-game
// Topic 6: Numerical exercises

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
  const [selectedExerciseIdx, setSelectedExerciseIdx] = useState(0);

  const exercises = [
    {
      title: 'Exercise 1: 4×4 Cascading Pure Dominance Reduction',
      context: 'Debangshu Precision Alloy Bidding in Barrackpore (₹ Thousands)',
      initialSize: '4 × 4 (16 Cells)',
      matrix: [
        [30, 40, 20, 50],
        [40, 50, 10, 60],
        [20, 30, 10, 40],
        [10, 20, 10, 30],
      ],
      reducedSize: '2 × 2 Submatrix: [[30, 20], [40, 10]]',
      pStar: '[0.75, 0.25, 0.00, 0.00]ᵀ (4D)',
      qStar: '[0.25, 0.00, 0.75, 0.00]ᵀ (4D)',
      vStarFormatted: '+₹25,000',
      steps: [
        '1. Pass 1: Row A₁ [30, 40, 20, 50] dominates Row A₄ [10, 20, 10, 30] ➔ Row A₄ deleted (3×4).',
        '2. Pass 2: Col B₁ [30, 40, 20] dominates Col B₂ [40, 50, 30]; Col B₃ [20, 10, 10] dominates Col B₄ [50, 60, 40] ➔ Cols B₂ & B₄ deleted (3×2).',
        '3. Pass 3: In 3×2, Row A₁ [30, 20] dominates Row A₃ [20, 10] ➔ Row A₃ deleted (2×2).',
        '4. Surviving 2×2: [[30, 20], [40, 10]]. Δ = -20, p_sub* = [0.75, 0.25], q_sub* = [0.25, 0.75].',
        '5. Game Value: v* = (300 − 800)/-20 = +₹25,000.',
        '6. Reconstructed 4D Vectors: p* = [0.75, 0.25, 0, 0]ᵀ, q* = [0.25, 0, 0.75, 0]ᵀ. Verified!',
      ],
    },
    {
      title: 'Exercise 2: 3×3 Convex Combination Dominance Reduction',
      context: 'Mamata & Mahima Cold-Chain Vaccine Transport in Kolkata (₹ Thousands)',
      initialSize: '3 × 3 (9 Cells)',
      matrix: [
        [40, 10, 30],
        [10, 50, 30],
        [20, 25, 25],
      ],
      reducedSize: '2 × 2 Submatrix: [[40, 10], [10, 50]]',
      pStar: '[4/7, 3/7, 0.00]ᵀ (57.1%, 42.9%, 0%)',
      qStar: '[4/7, 3/7, 0.00]ᵀ (57.1%, 42.9%, 0%)',
      vStarFormatted: '+₹27,142.86',
      steps: [
        '1. Saddle Check: Maximin = 20, Minimax = 30 ➔ No pure saddle point.',
        '2. Pure Dominance: Fails across all pairs of rows and columns.',
        '3. Convex Blend: 50-50 average of Rows 1 & 2 = [25, 30, 30] ≥ Row 3 [20, 25, 25] ➔ Row 3 deleted (2×3).',
        '4. In 2×3, 50-50 blend of Cols 1 & 2 = [25, 30] ≤ Col 3 [30, 30] ➔ Col 3 deleted (2×2).',
        '5. Surviving 2×2: [[40, 10], [10, 50]]. Δ = 70, p_sub* = [4/7, 3/7], q_sub* = [4/7, 3/7].',
        '6. Game Value: v* = (2000 − 100)/70 = ₹27,142.86. Reconstructed 3D vectors verified!',
      ],
    },
    {
      title: 'Exercise 3: 4×3 Matrix Reduction to 2×2',
      context: 'Susmita Supermarket Retail Pricing War in Ichapur (₹ Thousands)',
      initialSize: '4 × 3 (12 Cells)',
      matrix: [
        [30, 10, 40],
        [20, 5, 25],
        [10, 40, 50],
        [5, 30, 20],
      ],
      reducedSize: '2 × 2 Submatrix: [[30, 10], [10, 40]]',
      pStar: '[0.60, 0.00, 0.40, 0.00]ᵀ (4D)',
      qStar: '[0.60, 0.40, 0.00]ᵀ (3D)',
      vStarFormatted: '+₹22,000',
      steps: [
        '1. Pass 1: Row A₁ dominates Row A₂; Row A₃ dominates Row A₄ ➔ Rows A₂ & A₄ deleted (2×3).',
        '2. Pass 2: In 2×3 [[30, 10, 40], [10, 40, 50]], Col B₁ [30, 10] dominates Col B₃ [40, 50] ➔ Col B₃ deleted (2×2).',
        '3. Surviving 2×2: [[30, 10], [10, 40]]. Δ = 50, p_sub* = [0.60, 0.40], q_sub* = [0.60, 0.40].',
        '4. Game Value: v* = (1200 − 100)/50 = +₹22,000.',
        '5. Global Audit: vs B₁ = ₹22k, vs B₂ = ₹22k, vs B₃ = ₹44k (≥ ₹22k). Optimality verified!',
      ],
    },
    {
      title: 'Exercise 4: 5×4 Matrix Direct Reduction to 1×1 Saddle Point',
      context: 'Abhronila Educational Press Patent Licensing in Jadavpur (₹ Thousands)',
      initialSize: '5 × 4 (20 Cells)',
      matrix: [
        [10, 20, 15, 30],
        [40, 40, 40, 40],
        [20, 30, 25, 35],
        [15, 25, 20, 30],
        [5, 10, 10, 15],
      ],
      reducedSize: '1 × 1 Saddle Point (Row 2)',
      pStar: '[0.00, 1.00, 0.00, 0.00, 0.00]ᵀ (5D)',
      qStar: '[1.00, 0.00, 0.00, 0.00]ᵀ (4D)',
      vStarFormatted: '+₹40,000 (Pure Saddle)',
      steps: [
        '1. Pass 1: Row A₂ [40, 40, 40, 40] strictly dominates Rows A₁, A₃, A₄, and A₅.',
        '2. All inferior rows are deleted, reducing the entire 5×4 matrix to 1×4: [40, 40, 40, 40].',
        '3. Player A plays pure strategy Row A₂ (100%).',
        '4. Value of the Game: v* = +₹40,000 (Pure Saddle Point).',
        '5. Dominance-solvability reduced 20 cells to 1 in a single sweep!',
      ],
    },
  ];

  const currentEx = exercises[selectedExerciseIdx];

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
      title: '1. Foundry 4x4 Grid Multi-Pass Solver (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Executed a 3-pass cascading reduction on a 4x4 grid in Barrackpore, shrinking it to 2x2 and locking in ₹25,000 profit in under 10 seconds without Simplex LP.',
      lesson: 'Structured step-by-step reduction traces ensure audit-proof procurement decisions.',
    },
    {
      title: '2. Cold-Chain Convex Blend Solver (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Resolved a deadlocked 3x3 logistics matrix in Kolkata via a 50-50 convex average, yielding p* = [4/7, 3/7, 0] and stabilizing transport expenditure at ₹27,142.86.',
      lesson: 'Convex blends break deadlocks when pure dominance fails.',
    },
    {
      title: '3. Supermarket FMCG Retail 4x3 Pricing Solver (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Reduced a 4x3 retail matrix in Ichapur to 2x2, proving global indifference and securing ₹22,000 in weekly campaign profit.',
      lesson: 'Global audit checks confirm that pruned promotions cannot be exploited by rivals.',
    },
    {
      title: '4. Educational High-Tech Lab Direct 1x1 Saddle Solver (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Reduced a 5x4 enterprise grid in Jadavpur directly to a 1x1 pure saddle point, securing an unambiguous ₹40 Lakh patent license deal.',
      lesson: 'Dominance checks instantly reveal pure saddle points in large grids.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes numRedGlow {
          0%, 100% { border-color: rgba(234, 179, 8, 0.3); }
          50% { border-color: rgba(234, 179, 8, 0.8); }
        }
        .glow-num-red {
          animation: numRedGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-amber-950/80 text-amber-400 border border-amber-800/60">
              Segment 5 • Module 005_005 • Topic 6
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-amber-950/80 text-amber-400 border border-amber-800/60">
              Worked Reduction Exercises • Pure & Convex • Vector Reconstruction in ₹
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Numerical Exercises (m×n Matrix Reduction)
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive workshop of <span className="text-amber-400 font-semibold">Worked Numerical Reduction Exercises</span>: solving cascading 4×4 pure dominance, 3×3 convex combination blends, 4×3 to 2×2 reductions, and 5×4 direct saddle collapses in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'solution-pipeline', label: '1. Reduction Protocol' },
              { id: 'interactive-studio', label: '2. Worked Exercises Studio' },
              { id: 'vector-reconstruction', label: '3. Vector Reconstruction Table' },
              { id: 'svg-topologies', label: '4. Reduction Topologies SVG' },
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

        {/* SECTION 1: Reduction Protocol */}
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
                Master 5-Step Matrix Reduction Protocol
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-rose-400 font-bold">1. Pure Dominance</span>
                <p className="text-slate-300 text-[11px]">Scan rows (keep larger) and cols (keep smaller).</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-purple-300 font-bold">2. Convex Blends</span>
                <p className="text-slate-300 text-[11px]">If deadlocked, test 50-50 row/col averages.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-bold">3. Sub-Game Solve</span>
                <p className="text-slate-300 text-[11px]">Solve surviving 2x2, 2xn, or 1x1 submatrix.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-400 font-bold">4. Vector Map</span>
                <p className="text-slate-300 text-[11px]">Reconstruct full mD/nD vectors (0.0 for pruned).</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-bold">5. Audit in ₹</span>
                <p className="text-slate-300 text-[11px]">Verify E(p*, Bj) ≥ v* for all original columns.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Worked Exercises Studio */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-num-red">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Worked Numerical Reduction Studio
              </h2>
            </div>

            {/* Exercise Tabs */}
            <div className="flex flex-wrap gap-2">
              {exercises.map((ex, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedExerciseIdx(idx)}
                  className={clsx(
                    'px-4 py-2 rounded-xl text-xs font-semibold transition-all border text-left',
                    selectedExerciseIdx === idx
                      ? 'bg-amber-600 text-white border-amber-400 shadow-md'
                      : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
                  )}
                &gt;
                  {ex.title.split(':')[0]}
                </button>
              ))}
            </div>

            {/* Exercise Header */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2 text-xs sm:text-sm">
              <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-2 gap-2">
                <span className="text-white font-bold text-base">{currentEx.title}</span>
                <span className="text-amber-400 font-mono font-semibold">{currentEx.context}</span>
              </div>
              <div className="flex flex-wrap gap-3 text-xs font-mono text-slate-300 pt-1">
                <span>Initial: <strong className="text-rose-400">{currentEx.initialSize}</strong></span>
                <span>➔ Reduced: <strong className="text-emerald-400">{currentEx.reducedSize}</strong></span>
              </div>
            </div>

            {/* Step-by-Step Reduction Trace */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2 text-xs sm:text-sm">
              <span className="text-emerald-400 font-bold text-sm">Full Step-by-Step Reduction & Solution Trace:</span>
              <div className="flex flex-col space-y-1.5 font-mono text-xs">
                {currentEx.steps.map((st, sIdx) => (
                  <div key={sIdx} className="p-2 rounded bg-slate-900 border border-slate-800/80 text-slate-300">
                    {st}
                  </div>
                ))}
              </div>
            </div>

            {/* Solution Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs sm:text-sm">
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <span className="text-slate-400 font-sans text-xs">Full Vector p*:</span>
                <span className="text-rose-400 font-bold text-xs sm:text-sm">{currentEx.pStar}</span>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <span className="text-slate-400 font-sans text-xs">Full Vector q*:</span>
                <span className="text-sky-400 font-bold text-xs sm:text-sm">{currentEx.qStar}</span>
              </div>

              <div className="p-3.5 bg-emerald-950/60 rounded-xl border border-emerald-600 flex flex-col space-y-1">
                <span className="text-slate-300 font-sans text-xs">Value of the Game:</span>
                <span className="text-emerald-300 font-bold text-base">{currentEx.vStarFormatted}</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Vector Reconstruction Table */}
        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          data-index="2"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 font-bold text-sm">
                03
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Strategy Vector Reconstruction Standard
              </h2>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-3 text-xs sm:text-sm font-mono">
              <p className="text-slate-300 font-sans leading-relaxed">
                In examination solutions, always write out the full probability vector explicitly:
              </p>
              <div className="p-3 bg-slate-900 rounded-lg text-emerald-300 font-bold">
                p* = [p₁, p₂, ..., p_m]ᵀ &nbsp; where p_i = 0.0 for all eliminated rows i
              </div>
              <div className="p-3 bg-slate-900 rounded-lg text-sky-300 font-bold">
                q* = [q₁, q₂, ..., q_n]ᵀ &nbsp; where q_j = 0.0 for all eliminated cols j
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Reduction Topologies SVG */}
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
                4 Reduction Problem Topologies Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 180"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* 4x4 */}
                <rect x="30" y="40" width="150" height="90" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <text x="105" y="65" fill="#f43f5e" fontSize="10" fontWeight="bold" textAnchor="middle">1. 4×4 Cascading</text>
                <text x="105" y="85" fill="#cbd5e1" fontSize="8" textAnchor="middle">3 Pure Sweeps</text>
                <text x="105" y="105" fill="#34d399" fontSize="8" textAnchor="middle">4×4 ➔ 3×4 ➔ 3×2 ➔ 2×2</text>

                {/* 3x3 */}
                <rect x="210" y="40" width="150" height="90" rx="8" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
                <text x="285" y="65" fill="#a855f7" fontSize="10" fontWeight="bold" textAnchor="middle">2. 3×3 Convex</text>
                <text x="285" y="85" fill="#cbd5e1" fontSize="8" textAnchor="middle">50-50 Row Blend</text>
                <text x="285" y="105" fill="#fde68a" fontSize="8" textAnchor="middle">Deadlock Broken ➔ 2×2</text>

                {/* 4x3 */}
                <rect x="390" y="40" width="150" height="90" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="465" y="65" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">3. 4×3 Asymmetric</text>
                <text x="465" y="85" fill="#cbd5e1" fontSize="8" textAnchor="middle">2 Rows + 1 Col Pruned</text>
                <text x="465" y="105" fill="#c7d2fe" fontSize="8" textAnchor="middle">Reduces to Clean 2×2</text>

                {/* 5x4 */}
                <rect x="570" y="40" width="140" height="90" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="640" y="65" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">4. 5×4 Saddle</text>
                <text x="640" y="85" fill="#cbd5e1" fontSize="8" textAnchor="middle">Row 2 Dominates All</text>
                <text x="640" y="105" fill="#a7f3d0" fontSize="8" textAnchor="middle">Direct 1×1 Saddle in ₹</text>
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 5: Bengal Case Studies */}
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
                Bengal Operations Research Numerical Reduction Case Studies
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
                  trap: 'Reporting Reduced 2D Vector Instead of Full Original Dimensional Vector',
                  fix: 'If the game was 4x4, report full 4D vectors p* and q* with 0.0 for eliminated strategies.',
                },
                {
                  trap: 'Forgetting to Test Convex Blends When Pure Dominance Stops',
                  fix: 'Test the 50-50 average (R₁ + R₂)/2 or (C₁ + C₂)/2 to break pure deadlocks.',
                },
                {
                  trap: 'Skipping the Saddle Point Check on Large Matrices',
                  fix: 'Always check Maximin == Minimax first! Some 5x5 grids collapse instantly to a single saddle point.',
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
                  Think of working through numerical reduction exercises like solving a Sudoku puzzle: each eliminated number (row/column) reveals the next logical constraint until the entire solution snaps into place!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how in Exercise 1, three simple subtraction passes transformed a 16-variable LP problem into a 10-second mental calculation!
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
                'Mastered cascading pure dominance reduction traces',
                'Applied convex combination dominance to break deadlocks',
                'Reconstructed full m-dimensional and n-dimensional strategy vectors',
                'Verified global optimality and indifference across all original matrix cells',
                'Reported all numerical solutions and game values in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: You have now conquered the most rigorous numerical reduction topologies in operations research! In our final master topic for this module (Topic 7), we will conduct a comprehensive Short Questions and viva voce synthesis!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="mxn Reduction Numerical Exercises FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Reduction of m×n Games Numerical Exercises"
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
