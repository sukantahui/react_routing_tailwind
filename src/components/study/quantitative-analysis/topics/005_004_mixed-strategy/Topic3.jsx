// src/components/study/quantitative-analysis/topics/005_004_mixed-strategy/Topic3.jsx
// React 19 Function-based Component
// Module: 005_004_mixed-strategy
// Topic 3: Mixed strategy solution for 2×2 games

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

  // 2x2 Matrix Payoffs (in ₹ Thousands) - Default: [[40, 10], [10, 50]]
  const [matrix, setMatrix] = useState([
    [40, 10],
    [10, 50],
  ]);

  const updateCell = (r, c, val) => {
    const next = matrix.map((row, ri) =>
      row.map((cell, ci) => (ri === r && ci === c ? Number(val) : cell))
    );
    setMatrix(next);
  };

  const a11 = matrix[0][0];
  const a12 = matrix[0][1];
  const a21 = matrix[1][0];
  const a22 = matrix[1][1];

  // Delta = (a11 + a22) - (a12 + a21)
  const delta = (a11 + a22) - (a12 + a21);

  // Optimal probabilities
  const p1Star = delta !== 0 ? (a22 - a21) / delta : 0.5;
  const p2Star = delta !== 0 ? (a11 - a12) / delta : 0.5;

  const q1Star = delta !== 0 ? (a22 - a12) / delta : 0.5;
  const q2Star = delta !== 0 ? (a11 - a21) / delta : 0.5;

  // Game value v* = det(A) / delta
  const vStar = delta !== 0 ? (a11 * a22 - a12 * a21) / delta : 0;

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
      title: '1. Foundry 2x2 Tender Solution (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Solved A = [[₹40k, ₹10k], [₹10k, ₹50k]] in Barrackpore. Delta = 70. p* = [4/7, 3/7], q* = [4/7, 3/7], securing an exact game value of ₹27,142.86.',
      lesson: 'Analytical 2x2 formulas provide instant, exact decimal probability allocations.',
    },
    {
      title: '2. Cold-Chain Vaccine Facility 2x2 Routing (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Solved A = [[₹30k, ₹15k], [₹10k, ₹40k]] in Kolkata. Delta = 45. Optimal fleet mix q* = [5/9, 4/9] stabilized expected transportation expenditure at ₹23,333.33.',
      lesson: 'Closed-form formulas optimize mixed logistical route allocations.',
    },
    {
      title: '3. Supermarket FMCG Retail Pricing (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Solved A = [[₹50k, ₹20k], [₹10k, ₹60k]] in Ichapur. Delta = 80. p* = [5/8, 3/8], locking in an equilibrium campaign value of ₹35,000.',
      lesson: 'Closed-form solutions eliminate guess-work in retail pricing wars.',
    },
    {
      title: '4. Educational High-Tech Lab Patent Terms (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Solved a 2x2 arbitration game in Jadavpur with A = [[₹25L, ₹5L], [₹10L, ₹30L]]. Delta = 40. p* = [0.50, 0.50], yielding a fair value v* = ₹17.5 Lakh.',
      lesson: 'Analytical formulas provide equitable dispute settlement benchmarks.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes solveGlow {
          0%, 100% { border-color: rgba(99, 102, 241, 0.3); }
          50% { border-color: rgba(99, 102, 241, 0.8); }
        }
        .glow-solve {
          animation: solveGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-indigo-950/80 text-indigo-400 border border-indigo-800/60">
              Segment 5 • Module 005_004 • Topic 3
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-indigo-950/80 text-indigo-400 border border-indigo-800/60">
              2×2 Solution System • Closed-Form Formulas • Derivations
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Mixed Strategy Solution for 2×2 Games
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive study of the <span className="text-indigo-400 font-semibold">2×2 Closed-Form Solution System</span>: calculating the universal denominator (<span className="text-amber-400 font-mono">Δ = (a₁₁+a₂₂) − (a₁₂+a₂₁)</span>), determining optimal mixed probabilities (<span className="text-emerald-400 font-mono">p*, q*</span>), and evaluating the Value of the Game in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'master-formulas', label: '1. Master 2x2 Formulas' },
              { id: 'interactive-solver', label: '2. Live 2x2 Algebraic Solver' },
              { id: 'algebraic-derivation', label: '3. First-Principles Derivation' },
              { id: 'svg-flowchart', label: '4. Solution Flowchart SVG' },
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

        {/* SECTION 1: Master 2x2 Formulas */}
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
                Master 2×2 Closed-Form Solution Formulas
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs sm:text-sm font-mono">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-400 font-sans font-bold">1. Universal Denominator</span>
                <p className="text-slate-300 text-xs">Δ = (a₁₁ + a₂₂) − (a₁₂ + a₂₁)</p>
                <span className="text-slate-400 text-[11px]">Diag sum − Off-diag sum</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-rose-400 font-sans font-bold">2. Player A Probabilities</span>
                <p className="text-slate-300 text-xs">p₁* = (a₂₂ − a₂₁) / Δ</p>
                <p className="text-slate-300 text-xs">p₂* = (a₁₁ − a₁₂) / Δ</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-sans font-bold">3. Player B Probabilities</span>
                <p className="text-slate-300 text-xs">q₁* = (a₂₂ − a₁₂) / Δ</p>
                <p className="text-slate-300 text-xs">q₂* = (a₁₁ − a₂₁) / Δ</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-sans font-bold">4. Value of the Game</span>
                <p className="text-emerald-300 text-xs font-bold">v* = (a₁₁a₂₂ − a₁₂a₂₁) / Δ</p>
                <span className="text-emerald-400 text-[11px]">v* = det(A) / Δ (in ₹)</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Live 2x2 Algebraic Solver */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-solve">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Live 2×2 Analytical Algebraic Solver
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Edit the 2x2 matrix cells below (in ₹ Thousands). The solver evaluates Δ, optimal probability vectors p* and q*, and the Game Value v* in real-time:
            </p>

            {/* Matrix Inputs */}
            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3 font-mono text-xs sm:text-sm">
              <table className="w-full text-center border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2 text-left">A \ B</th>
                    <th className="p-2 text-sky-400">B₁ (Action 1)</th>
                    <th className="p-2 text-sky-400">B₂ (Action 2)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  <tr>
                    <td className="p-2 text-left font-bold text-rose-300">A₁</td>
                    <td className="p-2">
                      <input
                        type="number"
                        value={a11}
                        onChange={(e) => updateCell(0, 0, e.target.value)}
                        className="w-20 px-2 py-1 text-center bg-slate-900 border border-slate-700 rounded text-emerald-300 font-bold"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        value={a12}
                        onChange={(e) => updateCell(0, 1, e.target.value)}
                        className="w-20 px-2 py-1 text-center bg-slate-900 border border-slate-700 rounded text-emerald-300 font-bold"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 text-left font-bold text-rose-300">A₂</td>
                    <td className="p-2">
                      <input
                        type="number"
                        value={a21}
                        onChange={(e) => updateCell(1, 0, e.target.value)}
                        className="w-20 px-2 py-1 text-center bg-slate-900 border border-slate-700 rounded text-emerald-300 font-bold"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        value={a22}
                        onChange={(e) => updateCell(1, 1, e.target.value)}
                        className="w-20 px-2 py-1 text-center bg-slate-900 border border-slate-700 rounded text-emerald-300 font-bold"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Calculations Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-400 font-sans font-bold">Denominator Δ:</span>
                <span className="text-slate-200">({a11} + {a22}) − ({a12} + {a21})</span>
                <span className="text-amber-300 font-bold text-base">Δ = {delta}</span>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <span className="text-rose-400 font-sans font-bold">Player A Strategy p*:</span>
                <span className="text-slate-200">p₁* = ({a22} − {a21}) / {delta}</span>
                <span className="text-rose-300 font-bold text-sm">
                  p* = [{(p1Star * 100).toFixed(1)}%, {(p2Star * 100).toFixed(1)}%]ᵀ
                </span>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-sans font-bold">Player B Strategy q*:</span>
                <span className="text-slate-200">q₁* = ({a22} − {a12}) / {delta}</span>
                <span className="text-sky-300 font-bold text-sm">
                  q* = [{(q1Star * 100).toFixed(1)}%, {(q2Star * 100).toFixed(1)}%]ᵀ
                </span>
              </div>

              <div className="p-3.5 bg-emerald-950/60 rounded-xl border border-emerald-600 flex flex-col space-y-1">
                <span className="text-emerald-400 font-sans font-bold">Value of Game v*:</span>
                <span className="text-slate-300">det(A) / {delta} = ({a11 * a22} − {a12 * a21}) / {delta}</span>
                <span className="text-emerald-300 font-bold text-base">
                  v* = +₹{(vStar * 1000).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: First-Principles Derivation */}
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
                First-Principles Algebraic Derivation of p₁*
              </h2>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2 text-xs sm:text-sm font-mono">
              <p className="text-slate-300 font-sans">
                By the Indifference Principle, Player A chooses p₁ such that expected payoffs against Column 1 and Column 2 are identical:
              </p>
              <div className="p-2 rounded bg-slate-900 text-sky-300 font-bold">
                p₁ a₁₁ + (1 − p₁) a₂₁ = p₁ a₁₂ + (1 − p₁) a₂₂
              </div>
              <p className="text-slate-300 font-sans">Rearranging like terms:</p>
              <div className="p-2 rounded bg-slate-900 text-purple-300">
                p₁ a₁₁ − p₁ a₂₁ − p₁ a₁₂ + p₁ a₂₂ = a₂₂ − a₂₁
              </div>
              <div className="p-2 rounded bg-slate-900 text-emerald-400 font-bold">
                p₁ [ (a₁₁ + a₂₂) − (a₁₂ + a₂₁) ] = a₂₂ − a₂₁ &nbsp;⟹&nbsp; p₁* = (a₂₂ − a₂₁) / Δ &nbsp; (Q.E.D.)
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Solution Flowchart SVG */}
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
                2×2 Analytical Solution Flowchart
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 180"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* 2x2 Matrix Input */}
                <rect x="20" y="45" width="140" height="90" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <text x="90" y="70" fill="#f43f5e" fontSize="11" fontWeight="bold" textAnchor="middle">2 × 2 Matrix</text>
                <text x="90" y="95" fill="#cbd5e1" fontSize="9" textAnchor="middle">[[a₁₁, a₁₂], [a₂₁, a₂₂]]</text>
                <text x="90" y="115" fill="#fca5a5" fontSize="8" textAnchor="middle">No Saddle Point (α &lt; β)</text>

                <line x1="160" y1="90" x2="220" y2="90" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="220,90 210,85 210,95" fill="#38bdf8" />

                {/* Compute Delta */}
                <rect x="220" y="45" width="150" height="90" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="295" y="70" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">Compute Δ</text>
                <text x="295" y="95" fill="#fde68a" fontSize="9" textAnchor="middle">(a₁₁+a₂₂) − (a₁₂+a₂₁)</text>
                <text x="295" y="115" fill="#cbd5e1" fontSize="8" textAnchor="middle">Universal Denominator</text>

                <line x1="370" y1="90" x2="430" y2="90" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="430,90 420,85 420,95" fill="#38bdf8" />

                {/* Calculate Probabilities */}
                <rect x="430" y="45" width="150" height="90" rx="8" fill="#1e293b" stroke="#818cf8" strokeWidth="2" />
                <text x="505" y="70" fill="#818cf8" fontSize="11" fontWeight="bold" textAnchor="middle">Calculate p* & q*</text>
                <text x="505" y="95" fill="#cbd5e1" fontSize="8" textAnchor="middle">p₁* = (a₂₂−a₂₁)/Δ</text>
                <text x="505" y="115" fill="#cbd5e1" fontSize="8" textAnchor="middle">q₁* = (a₂₂−a₁₂)/Δ</text>

                <line x1="580" y1="90" x2="630" y2="90" stroke="#34d399" strokeWidth="2" />
                <polygon points="630,90 620,85 620,95" fill="#34d399" />

                {/* Value v* in ₹ */}
                <rect x="630" y="45" width="90" height="90" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="675" y="75" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">Value v*</text>
                <text x="675" y="95" fill="#ffffff" fontSize="9" textAnchor="middle">det(A) / Δ</text>
                <text x="675" y="115" fill="#a7f3d0" fontSize="8" textAnchor="middle">in ₹</text>
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
                Bengal Operations Research 2×2 Solution Case Studies
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
                  trap: 'Applying Mixed Strategy Formulas to a Game with a Pure Saddle Point',
                  fix: 'Always check Maximin == Minimax first! If a saddle point exists, use pure strategies.',
                },
                {
                  trap: 'Swapping Numerator Terms (e.g. Using a₁₂ − a₂₂ instead of a₂₂ − a₂₁)',
                  fix: 'Remember p₁* = (a₂₂ − a₂₁) / Δ and q₁* = (a₂₂ − a₁₂) / Δ.',
                },
                {
                  trap: 'Calculating Denominator Δ as Main Diag PLUS Off-Diag',
                  fix: 'Δ = (a₁₁ + a₂₂) MINUS (a₁₂ + a₂₁).',
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
                  Think of the 2x2 formula like Cramer's Rule for simultaneous linear equations: calculating Δ first gives you the key that unlocks all probabilities and the game value!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how p₁* and p₂* always sum to exactly 1.0, and how v* always sits comfortably between the lowest and highest payoffs in the matrix!
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
                'Mastered the formula for Δ = (a₁₁ + a₂₂) − (a₁₂ + a₂₁)',
                'Calculated Player A probabilities: p₁* = (a₂₂ − a₂₁)/Δ and p₂* = (a₁₁ − a₁₂)/Δ',
                'Calculated Player B probabilities: q₁* = (a₂₂ − a₁₂)/Δ and q₂* = (a₁₁ − a₂₁)/Δ',
                'Calculated Value of the Game: v* = (a₁₁a₂₂ − a₁₂a₂₁)/Δ',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: The 2x2 closed-form system is your primary algebraic weapon for mixed games! Always calculate the denominator Δ first, and verify that p1 + p2 = 1. In our next topic (Topic 4), we will focus in granular depth on Determining Optimal Probabilities across diverse matrix architectures!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="2x2 Mixed Strategy Solution FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="2x2 Mixed Strategy Solutions"
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
