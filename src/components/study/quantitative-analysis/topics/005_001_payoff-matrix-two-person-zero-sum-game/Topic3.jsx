// src/components/study/quantitative-analysis/topics/005_001_payoff-matrix-two-person-zero-sum-game/Topic3.jsx
// React 19 Function-based Component
// Module: 005_001_payoff-matrix-two-person-zero-sum-game
// Topic 3: Payoff matrix

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

  // 3x3 Payoff Matrix State (in ₹ Thousands or ₹)
  const [matrix, setMatrix] = useState([
    [10, 20, 15],
    [30, 40, 25],
    [20, 10, 35],
  ]);

  const updateCell = (r, c, val) => {
    const next = matrix.map((row, ri) =>
      row.map((cell, ci) => (ri === r && ci === c ? Number(val) : cell))
    );
    setMatrix(next);
  };

  // Calculations
  const rowMins = matrix.map((row) => Math.min(...row));
  const colMaxs = [0, 1, 2].map((c) => Math.max(...matrix.map((row) => row[c])));

  const maximin = Math.max(...rowMins);
  const minimax = Math.min(...colMaxs);

  const hasSaddlePoint = maximin === minimax;
  const maximinRow = rowMins.indexOf(maximin);
  const minimaxCol = colMaxs.indexOf(minimax);

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
      title: '1. Foundry Tender Matrix Analysis (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Evaluated a 3x3 casting tender payoff matrix in ₹ Thousands in Barrackpore: Row Minima = [10, 30, 20]; Column Maxima = [30, 40, 35]. Maximin = ₹30k and Minimax = ₹30k, discovering a stable pure saddle point at (A2, B1).',
      lesson: 'Row minima and column maxima isolate pure saddle points instantly.',
    },
    {
      title: '2. Cold-Chain Vaccine Facility Dispute Payoff Matrix (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Structured a 2x3 commercial dispute matrix in Kolkata, computing Maximin = ₹20,000 and Minimax = ₹25,000; since Maximin < Minimax, they identified the necessity of a mixed-strategy negotiation buffer.',
      lesson: 'When Maximin < Minimax, mixed strategies provide optimal risk hedging.',
    },
    {
      title: '3. Supermarket FMCG Retail Advertising Matrix (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Analyzed a 3x2 promotional campaign matrix in Ichapur, computing Maximin = ₹15,000 and Minimax = ₹15,000, locking in a pure strategy weekend discount.',
      lesson: 'Saddle points prevent unnecessary advertising expenditure.',
    },
    {
      title: '4. Educational High-Tech Lab Research Patent Matrix (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Analyzed a ₹55 Lakh university patent licensing matrix in Jadavpur, verifying v_lower <= v_upper and negotiating an optimal royalty schedule.',
      lesson: 'Matrix structuring ensures transparency in multi-party technology licensing.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes matrixGlow {
          0%, 100% { border-color: rgba(168, 85, 247, 0.3); }
          50% { border-color: rgba(168, 85, 247, 0.8); }
        }
        .glow-matrix {
          animation: matrixGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-purple-950/80 text-purple-400 border border-purple-800/60">
              Segment 5 • Module 005_001 • Topic 3
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-purple-950/80 text-purple-400 border border-purple-800/60">
              Matrix Structure • Row Minima • Col Maxima • Maximin ≤ Minimax
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Payoff Matrix
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive study of the <span className="text-purple-400 font-semibold">Payoff Matrix Architecture</span> in Game Theory: analyzing <span className="text-rose-400 font-semibold">Row Minima (min a_ij)</span> and <span className="text-sky-400 font-semibold">Column Maxima (max a_ij)</span>, computing <span className="text-emerald-400 font-semibold">Maximin (α)</span> and <span className="text-amber-400 font-semibold">Minimax (β)</span> values, and testing for saddle points in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'matrix-anatomy', label: '1. Payoff Matrix Anatomy' },
              { id: 'interactive-workbench', label: '2. Interactive 3×3 Matrix Workbench' },
              { id: 'maximin-theorem', label: '3. Maximin ≤ Minimax Invariant' },
              { id: 'svg-architecture', label: '4. Matrix Anatomy SVG' },
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
                    ? 'bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-900/40'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </header>

        {/* SECTION 1: Payoff Matrix Anatomy */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-600/20 text-purple-400 font-bold text-sm">
                01
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Payoff Matrix Anatomy & Definitions
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-rose-300 font-bold">1. Row Minima (min a_ij)</span>
                <p className="text-slate-300">Worst-case security level for Player A for each row.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-sky-300 font-bold">2. Column Maxima (max a_ij)</span>
                <p className="text-slate-300">Worst-case payout liability for Player B for each column.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-emerald-300 font-bold">3. Maximin (α / v_lower)</span>
                <p className="text-slate-300">max(Row Minima): Guaranteed floor for Player A.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-amber-300 font-bold">4. Minimax (β / v_upper)</span>
                <p className="text-slate-300">min(Column Maxima): Guaranteed ceiling on Player B.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Interactive 3x3 Matrix Workbench */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-matrix">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-600/20 text-purple-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive 3×3 Payoff Matrix & Saddle Point Inspector
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Edit the matrix cells below (in ₹ Thousands). The system dynamically computes the Row Minima, Column Maxima, Maximin, Minimax, and checks for Saddle Point existence:
            </p>

            {/* Interactive Grid Table */}
            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-center border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2 text-left">Player A \ Player B</th>
                    <th className="p-2 text-sky-400">B₁</th>
                    <th className="p-2 text-sky-400">B₂</th>
                    <th className="p-2 text-sky-400">B₃</th>
                    <th className="p-2 text-rose-400 font-bold bg-rose-950/30">Row Min</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {matrix.map((row, rIdx) => (
                    <tr key={rIdx}>
                      <td className="p-2 text-left font-bold text-rose-300">A_{rIdx + 1}</td>
                      {row.map((cell, cIdx) => {
                        const isSaddle = hasSaddlePoint && rIdx === maximinRow && cIdx === minimaxCol;
                        return (
                          <td key={cIdx} className="p-2">
                            <input
                              type="number"
                              value={cell}
                              onChange={(e) => updateCell(rIdx, cIdx, e.target.value)}
                              className={clsx(
                                'w-16 px-2 py-1 text-center rounded bg-slate-900 border font-mono text-xs',
                                isSaddle
                                  ? 'bg-emerald-950 border-emerald-500 text-emerald-300 font-bold ring-2 ring-emerald-400'
                                  : 'border-slate-700 text-white'
                              )}
                            />
                          </td>
                        );
                      })}
                      <td className="p-2 font-bold text-rose-400 bg-rose-950/20">
                        {rowMins[rIdx]}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-slate-700 bg-sky-950/20">
                    <td className="p-2 text-left font-bold text-sky-400">Col Max</td>
                    {colMaxs.map((maxVal, cIdx) => (
                      <td key={cIdx} className="p-2 font-bold text-sky-300">
                        {maxVal}
                      </td>
                    ))}
                    <td className="p-2 font-bold text-amber-400 bg-slate-900">
                      —
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Maximin vs Minimax Results */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs sm:text-sm">
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <span className="text-slate-400 font-sans text-xs">Maximin Value (α = v_lower):</span>
                <span className="text-rose-400 font-bold text-lg">
                  max({rowMins.join(', ')}) = ₹{maximin}k
                </span>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <span className="text-slate-400 font-sans text-xs">Minimax Value (β = v_upper):</span>
                <span className="text-sky-400 font-bold text-lg">
                  min({colMaxs.join(', ')}) = ₹{minimax}k
                </span>
              </div>

              <div className={clsx('p-3.5 rounded-xl border flex flex-col space-y-1', hasSaddlePoint ? 'bg-emerald-950/60 border-emerald-600' : 'bg-amber-950/60 border-amber-600')}>
                <span className="text-slate-300 font-sans text-xs">Saddle Point Status:</span>
                <span className={clsx('font-bold text-base', hasSaddlePoint ? 'text-emerald-300' : 'text-amber-300')}>
                  {hasSaddlePoint ? `Saddle Point at (A_${maximinRow + 1}, B_${minimaxCol + 1}) = ₹${maximin}k ⭐` : `No Pure Saddle Point (Maximin < Minimax) 🎲`}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Maximin <= Minimax Invariant */}
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
                The Universal Invariant Theorem: Maximin ≤ Minimax
              </h2>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-3 text-xs sm:text-sm">
              <div className="font-mono text-cyan-300 font-bold text-base">
                max_i min_j a_ij ≤ min_j max_i a_ij &nbsp; ⟺ &nbsp; v_lower ≤ v_upper
              </div>
              <p className="text-slate-300 leading-relaxed">
                This invariant inequality guarantees that the maximum floor Player A can secure can NEVER exceed the minimum ceiling Player B can concede. When equality holds (Maximin = Minimax), the game possesses a stable Nash equilibrium in pure strategies.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Matrix Anatomy SVG */}
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
                Payoff Matrix Two-Pass Extraction Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 200"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Main Matrix Box */}
                <rect x="100" y="30" width="360" height="110" rx="8" fill="#1e293b" stroke="#818cf8" strokeWidth="2" />
                <text x="280" y="55" fill="#818cf8" fontSize="11" fontWeight="bold" textAnchor="middle">m × n PAYOFF MATRIX (₹)</text>
                <text x="180" y="85" fill="#cbd5e1" fontSize="9" textAnchor="middle">Row 1: [a₁₁, a₁₂, ...]</text>
                <text x="180" y="115" fill="#cbd5e1" fontSize="9" textAnchor="middle">Row 2: [a₂₁, a₂₂, ...]</text>

                {/* Row Minima Vector */}
                <rect x="490" y="30" width="180" height="110" rx="8" fill="#4c0519" stroke="#f43f5e" strokeWidth="2" />
                <text x="580" y="55" fill="#f43f5e" fontSize="10" fontWeight="bold" textAnchor="middle">Row Minima Vector</text>
                <text x="580" y="85" fill="#fca5a5" fontSize="9" textAnchor="middle">min_j a₁j</text>
                <text x="580" y="105" fill="#fca5a5" fontSize="9" textAnchor="middle">min_j a₂j</text>
                <text x="580" y="125" fill="#fde047" fontSize="9" fontWeight="bold" textAnchor="middle">➔ Maximin (α)</text>

                {/* Col Maxima Vector */}
                <rect x="100" y="150" width="360" height="40" rx="8" fill="#082f49" stroke="#38bdf8" strokeWidth="2" />
                <text x="280" y="175" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">Column Maxima Vector ➔ Minimax (β)</text>
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
                Bengal Operations Research Payoff Matrix Case Studies
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
                  <p className="text-purple-300 font-semibold">💡 <strong>Operations Takeaway:</strong> {cs.lesson}</p>
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
                  trap: 'Calculating Max of Rows and Min of Columns (Reversing the Logic)',
                  fix: 'Player A takes MIN of rows (worst case) and then MAX (Maximin); Player B takes MAX of columns (worst liability) and then MIN (Minimax).',
                },
                {
                  trap: 'Violating the Maximin ≤ Minimax Invariant',
                  fix: 'Maximin can NEVER exceed Minimax; if your calculation yields Maximin > Minimax, you have an arithmetic error.',
                },
                {
                  trap: 'Confusing Row Indices with Column Indices in Matrix Notation',
                  fix: 'In a_ij, the first index i refers strictly to rows (Player A), and the second index j refers to columns (Player B).',
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
                  Think of the row minima as your safety net: it represents the absolute worst outcome that can happen to you if you pick that row. Finding Maximin is picking the highest safety net!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how changing a single cell in the matrix can instantly create or destroy a saddle point equilibrium!
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
                'Structured an m × n Payoff Matrix with row and column strategies',
                'Computed Row Minima (min_j a_ij) for every row',
                'Computed Column Maxima (max_i a_ij) for every column',
                'Calculated Maximin = max(Row Minima) and Minimax = min(Column Maxima)',
                'Verified the invariant inequality: Maximin ≤ Minimax',
                'Identified saddle points when Maximin == Minimax',
                'Reported game payoffs and values in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: The Payoff Matrix is the foundational canvas of strategic game theory! Always extract Row Minima horizontally and Column Maxima vertically. Maximin is max of row mins, Minimax is min of col maxes, and Maximin ≤ Minimax strictly. In our next topic (Topic 4), we will dive into the rigorous mechanics of Two-Person Zero-Sum Games!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Payoff Matrix FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Payoff Matrix (Game Theory)"
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
