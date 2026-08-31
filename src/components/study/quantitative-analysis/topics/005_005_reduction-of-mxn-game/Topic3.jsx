// src/components/study/quantitative-analysis/topics/005_005_reduction-of-mxn-game/Topic3.jsx
// React 19 Function-based Component
// Module: 005_005_reduction-of-mxn-game
// Topic 3: Reduction to 2×2 games

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic3_files/topic3_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic3_files/topic3_note.txt?raw';

const Topic3 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [reductionStep, setReductionStep] = useState(0);

  // Initial 4x3 Matrix in ₹ Thousands
  const initial4x3 = [
    [30, 10, 40], // A1 (Retained in 2x2)
    [20, 5, 25],  // A2 (Dominated by A1)
    [10, 40, 50], // A3 (Retained in 2x2)
    [5, 30, 20],  // A4 (Dominated by A3)
  ];

  // Surviving 2x2: Rows {A1, A3} and Cols {B1, B2}
  // [[30, 10], [10, 40]]
  const a11 = 30, a12 = 10, a21 = 10, a22 = 40;
  const deltaSub = (a11 + a22) - (a12 + a21); // (30+40) - (10+10) = 50
  const p1Sub = (a22 - a21) / deltaSub; // (40-10)/50 = 0.6
  const p2Sub = (a11 - a12) / deltaSub; // (30-10)/50 = 0.4
  const q1Sub = (a22 - a12) / deltaSub; // (40-10)/50 = 0.6
  const q2Sub = (a11 - a21) / deltaSub; // (30-10)/50 = 0.4
  const vStar = (a11 * a22 - a12 * a21) / deltaSub; // (1200-100)/50 = 22

  // Expected payoffs against original 3 columns
  const expVsB1 = p1Sub * 30 + 0 + p2Sub * 10 + 0; // 0.6(30) + 0.4(10) = 18 + 4 = 22
  const expVsB2 = p1Sub * 10 + 0 + p2Sub * 40 + 0; // 0.6(10) + 0.4(40) = 6 + 16 = 22
  const expVsB3 = p1Sub * 40 + 0 + p2Sub * 50 + 0; // 0.6(40) + 0.4(50) = 24 + 20 = 44 (>= 22, valid!)

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
      title: '1. Foundry 4x3 Grid Reduction to 2x2 (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Debangshu in Barrackpore reduced a 4x3 bidding matrix to Rows {1, 3} and Cols {1, 2}. A_sub = [[₹30k, ₹10k], [₹10k, ₹40k]]. Delta = 50. p* = [0.6, 0, 0.4, 0], q* = [0.6, 0.4, 0], securing an exact game value v* = ₹22,000.',
      lesson: 'Extracting clean 2x2 cores simplifies complex manufacturing bidding games.',
    },
    {
      title: '2. Cold-Chain Logistics 3x4 Grid Reduction to 2x2 (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Reduced a 3x4 fleet matrix to Rows {1, 2} and Cols {1, 3} in Kolkata. A_sub = [[₹40k, ₹20k], [₹10k, ₹50k]]. Reconstructed vectors secured v* = ₹30,000, validated against all 4 destination hubs.',
      lesson: 'Global audit checks confirm that pruned routes cannot undercut optimal solutions.',
    },
    {
      title: '3. Supermarket FMCG Retail 4x4 Grid Reduction to 2x2 (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Reduced a 4x4 retail matrix to Rows {2, 4} and Cols {1, 4} in Ichapur. A_sub = [[₹50k, ₹20k], [₹10k, ₹60k]]. Delta = 80. p* = [0, 5/8, 0, 3/8], q* = [5/8, 0, 0, 3/8], locking in ₹35,000 revenue.',
      lesson: 'Reduction to 2x2 identifies the highest ROI marketing pairs.',
    },
    {
      title: '4. Educational High-Tech Lab 5x3 Grid Reduction to 2x2 (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Reduced a 5x3 patent dispute matrix in Jadavpur down to a 2x2 arbitration game, proving global indifference across all 5 university departments and settling at ₹25 Lakh.',
      lesson: 'Closed-form 2x2 reduction produces verifiable settlement formulas.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes red22Glow {
          0%, 100% { border-color: rgba(52, 211, 153, 0.3); }
          50% { border-color: rgba(52, 211, 153, 0.8); }
        }
        .glow-red22 {
          animation: red22Glow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
              Segment 5 • Module 005_005 • Topic 3
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
              Reduction to 2×2 Submatrix • Closed-Form • Global Auditing
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
            Reduction to 2×2 Games
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive study of <span className="text-emerald-400 font-semibold">Reducing Larger m×n Matrices to 2×2 Games</span>: extracting surviving submatrices, applying analytical closed-form formulas (<span className="text-amber-400 font-mono">Δ, p*, q*, v*</span>), reconstructing full probability vectors, and executing Global Optimality Audits in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'five-step-pipeline', label: '1. 5-Step Pipeline' },
              { id: 'interactive-studio', label: '2. 4x3 to 2x2 Reduction Studio' },
              { id: 'global-auditing', label: '3. Global Optimality Auditing' },
              { id: 'svg-flow', label: '4. Reduction & Audit Flowchart SVG' },
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

        {/* SECTION 1: 5-Step Pipeline */}
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
                The 5-Step Reduction to 2×2 Pipeline
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-400 font-bold">1. Prune to 2x2</span>
                <p className="text-slate-300 text-[11px]">Iteratively prune until 2 rows and 2 cols survive.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-rose-400 font-bold">2. Extract Submatrix</span>
                <p className="text-slate-300 text-[11px]">Form 2x2 submatrix A_sub from surviving cells.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-bold">3. Solve Closed-Form</span>
                <p className="text-slate-300 text-[11px]">Apply Δ_sub, p_sub*, q_sub*, and v* = det/Δ.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-purple-300 font-bold">4. Vector Mapping</span>
                <p className="text-slate-300 text-[11px]">Map to full mD/nD vectors; assign 0.0 to pruned moves.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-bold">5. Global Audit</span>
                <p className="text-slate-300 text-[11px]">Verify E(p*, Bj) &gt;= v* for ALL original columns.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: 4x3 to 2x2 Reduction Studio */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-red22">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                  02
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Interactive 4 × 3 to 2 × 2 Reduction & Solution Studio
                </h2>
              </div>
              <span className="text-xs font-mono text-amber-400 font-semibold">
                Stage {reductionStep} of 4 (
                {reductionStep === 0 && 'Initial 4x3 Grid'}
                {reductionStep === 1 && 'Rows A2 & A4 Pruned (2x3)'}
                {reductionStep === 2 && 'Col B3 Pruned (2x2)'}
                {reductionStep === 3 && 'Solved 2x2 Submatrix'}
                {reductionStep === 4 && 'Global Optimality Verified'}
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
                    <th className="p-2 text-sky-400">B₂</th>
                    <th className={clsx('p-2', reductionStep >= 2 ? 'line-through text-slate-600 bg-rose-950/20' : 'text-sky-400')}>
                      B₃ {reductionStep >= 2 ? '(Pruned)' : ''}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-200">
                  {initial4x3.map((row, rIdx) => {
                    const isRowDead = reductionStep >= 1 && (rIdx === 1 || rIdx === 3);
                    return (
                      <tr key={rIdx} className={clsx(isRowDead ? 'line-through bg-rose-950/30 text-slate-600' : '')}>
                        <td className="p-2 text-left font-bold text-rose-300">
                          A_{rIdx + 1} {isRowDead ? '(Pruned)' : ''}
                        </td>
                        {row.map((cell, cIdx) => {
                          const isColDead = reductionStep >= 2 && cIdx === 2;
                          const isDead = isRowDead || isColDead;
                          const isSurvivingCell = reductionStep >= 2 && (rIdx === 0 || rIdx === 2) && (cIdx === 0 || cIdx === 1);
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

            {/* Stage Description Banner */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2 text-xs sm:text-sm">
              <span className="text-amber-400 font-bold text-sm">
                {reductionStep === 0 && 'Initial 4×3 Matrix (12 cells): No pure saddle point exists.'}
                {reductionStep === 1 && 'Stage 1 (Row Dominance): Row A₁ [30, 10, 40] dominates Row A₂ [20, 5, 25], and Row A₃ [10, 40, 50] dominates Row A₄ [5, 30, 20]. Rows A₂ & A₄ deleted! (Matrix: 2×3)'}
                {reductionStep === 2 && 'Stage 2 (Column Dominance): In the 2×3 matrix [[30, 10, 40], [10, 40, 50]], Col B₁ [30, 10] dominates Col B₃ [40, 50]. Col B₃ deleted! Matrix reduces to 2×2: [[30, 10], [10, 40]]!'}
                {reductionStep === 3 && 'Stage 3 (2×2 Closed-Form Solution): Δ = (30+40) − (10+10) = 50. p_sub* = [0.60, 0.40], q_sub* = [0.60, 0.40]. Game Value v* = (1200 − 100)/50 = +₹22,000!'}
                {reductionStep === 4 && 'Stage 4 (Full 4D Vector Mapping & Global Audit): p* = [0.60, 0.00, 0.40, 0.00]ᵀ, q* = [0.60, 0.40, 0.00]ᵀ. vs B₁ = ₹22k, vs B₂ = ₹22k, vs B₃ = ₹44k (≥ ₹22k). Global optimality 100% verified!'}
              </span>
            </div>

            {/* Reconstructed Vectors & Global Audit Grid (Stages 3 & 4) */}
            {reductionStep >= 3 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                  <span className="text-rose-400 font-sans font-bold">Full 4D Vector p*:</span>
                  <span className="text-slate-200">p* = [0.60, 0.00, 0.40, 0.00]ᵀ</span>
                  <span className="text-slate-400 text-[11px]">Rows A₂ & A₄ get 0.0</span>
                </div>

                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                  <span className="text-sky-400 font-sans font-bold">Full 3D Vector q*:</span>
                  <span className="text-slate-200">q* = [0.60, 0.40, 0.00]ᵀ</span>
                  <span className="text-slate-400 text-[11px]">Col B₃ gets 0.0</span>
                </div>

                <div className="p-3.5 bg-emerald-950/60 rounded-xl border border-emerald-600 flex flex-col space-y-1">
                  <span className="text-emerald-400 font-sans font-bold">Value of Game v*:</span>
                  <span className="text-emerald-300 font-bold text-base">+₹22,000</span>
                  <span className="text-emerald-400 text-[11px]">Global Optimum in ₹</span>
                </div>
              </div>
            )}

            {/* Stepper Navigation */}
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
                ◀ Previous Stage
              </button>
              <button
                onClick={() => setReductionStep((prev) => Math.min(4, prev + 1))}
                disabled={reductionStep === 4}
                className={clsx(
                  'px-4 py-2 rounded-xl text-xs font-semibold border transition-all',
                  reductionStep === 4
                    ? 'opacity-40 cursor-not-allowed bg-slate-900 text-slate-500 border-slate-800'
                    : 'bg-emerald-600 text-white border-emerald-500 hover:bg-emerald-500'
                )}
              >
                Next Stage ▶
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 3: Global Optimality Auditing */}
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
                Global Optimality Audit Table
              </h2>
            </div>

            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3 font-mono text-xs sm:text-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2">Original Column</th>
                    <th className="p-2">Expected Payoff E(p*, B_j)</th>
                    <th className="p-2">Condition (≥ v* = ₹22k)</th>
                    <th className="p-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-200">
                  <tr>
                    <td className="p-2 font-bold text-sky-300">Column B₁ (Active in 2x2)</td>
                    <td className="p-2">0.6(30) + 0.4(10) = ₹22,000</td>
                    <td className="p-2">₹22k == ₹22k (Exact Indifference)</td>
                    <td className="p-2 text-emerald-400 font-bold">✅ Optimal</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-sky-300">Column B₂ (Active in 2x2)</td>
                    <td className="p-2">0.6(10) + 0.4(40) = ₹22,000</td>
                    <td className="p-2">₹22k == ₹22k (Exact Indifference)</td>
                    <td className="p-2 text-emerald-400 font-bold">✅ Optimal</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-slate-400">Column B₃ (Pruned)</td>
                    <td className="p-2">0.6(40) + 0.4(50) = ₹44,000</td>
                    <td className="p-2">₹44k ≥ ₹22k (Player B avoids this column)</td>
                    <td className="p-2 text-emerald-400 font-bold">✅ Strictly Suboptimal for B</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 4: Reduction & Audit Flowchart SVG */}
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
                Reduction to 2×2 & Global Audit Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 180"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* m x n */}
                <rect x="20" y="45" width="130" height="90" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <text x="85" y="75" fill="#f43f5e" fontSize="11" fontWeight="bold" textAnchor="middle">m × n Matrix</text>
                <text x="85" y="95" fill="#cbd5e1" fontSize="8" textAnchor="middle">4 × 3 Raw Grid</text>
                <text x="85" y="115" fill="#fca5a5" fontSize="8" textAnchor="middle">Dominance Sweeps</text>

                <line x1="150" y1="90" x2="200" y2="90" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="200,90 190,85 190,95" fill="#38bdf8" />

                {/* 2x2 Submatrix */}
                <rect x="200" y="45" width="150" height="90" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="275" y="70" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">2 × 2 Submatrix</text>
                <text x="275" y="90" fill="#cbd5e1" fontSize="8" textAnchor="middle">[[30, 10], [10, 40]]</text>
                <text x="275" y="110" fill="#fde68a" fontSize="8" textAnchor="middle">Δ=50, p_sub*, q_sub*</text>

                <line x1="350" y1="90" x2="400" y2="90" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="400,90 390,85 390,95" fill="#38bdf8" />

                {/* Vector Reconstruction */}
                <rect x="400" y="45" width="160" height="90" rx="8" fill="#1e293b" stroke="#818cf8" strokeWidth="2" />
                <text x="480" y="70" fill="#818cf8" fontSize="11" fontWeight="bold" textAnchor="middle">Full Vector Mapping</text>
                <text x="480" y="90" fill="#cbd5e1" fontSize="8" textAnchor="middle">p* = [0.6, 0, 0.4, 0]ᵀ</text>
                <text x="480" y="110" fill="#c7d2fe" fontSize="8" textAnchor="middle">q* = [0.6, 0.4, 0]ᵀ</text>

                <line x1="560" y1="90" x2="600" y2="90" stroke="#34d399" strokeWidth="2" />
                <polygon points="600,90 590,85 590,95" fill="#34d399" />

                {/* Global Audit */}
                <rect x="600" y="45" width="120" height="90" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="660" y="75" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">Global Audit</text>
                <text x="660" y="95" fill="#ffffff" fontSize="9" textAnchor="middle">E(p*, B) ≥ v*</text>
                <text x="660" y="115" fill="#a7f3d0" fontSize="8" textAnchor="middle">v* = ₹22,000</text>
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
                Bengal Operations Research 2×2 Reduction Case Studies
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
                  trap: 'Forgetting to Test Global Optimality (E(p*, B_j) ≥ v* for All Original Columns)',
                  fix: 'Always test reconstructed p* against every column of the original unreduced matrix.',
                },
                {
                  trap: 'Mismatched Index Mapping in Strategy Vectors (e.g. Swapping p₁ with p₃)',
                  fix: 'Carefully map sub-game probabilities to their exact surviving row/column indices.',
                },
                {
                  trap: 'Assuming an Eliminated Column Can Yield an Expected Payoff Less than v*',
                  fix: 'If E(p*, B_j) < v*, Player B would exploit column j, proving an error in reduction.',
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
                  Think of the 2x2 reduction like finding the two load-bearing columns in a building: once identified, calculating the structural equilibrium becomes straightforward!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how against Column B₃, Player A receives ₹44,000, which is higher than the equilibrium value ₹22,000, confirming why Player B will never play B₃!
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
                Student Revision Checklist (Topic 3)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Mastered the 5-step pipeline for reducing m x n games to 2x2',
                'Extracted the 2x2 submatrix and applied closed-form formulas',
                'Reconstructed full m-dimensional and n-dimensional strategy vectors',
                'Conducted global optimality checks against all original rows and columns',
                'Reported all financial results in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: When you reduce an m x n game to 2x2, always complete Step 5: the Global Audit check! Checking that E(p*, Bj) >= v* across all original columns guarantees your solution is rock-solid. In our next topic (Topic 4), we will explore Reduction to 2×n and m×2 Cases!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Reduction to 2x2 Games FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Reduction to 2×2 Games"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic4_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic3;
