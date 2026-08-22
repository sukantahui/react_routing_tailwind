// src/components/study/quantitative-analysis/topics/005_002_pure-strategy-and-saddle-point/Topic2.jsx
// React 19 Function-based Component
// Module: 005_002_pure-strategy-and-saddle-point
// Topic 2: Minimax principle

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic2_files/topic2_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic2_files/topic2_note.txt?raw';

const Topic2 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);

  // 3x3 Payoff Matrix State (in ₹ Thousands)
  const [matrix, setMatrix] = useState([
    [15, 25, 20],
    [40, 50, 45],
    [25, 30, 28],
  ]);

  const [simulatedRow, setSimulatedRow] = useState(0); // Test adversary move

  const updateCell = (r, c, val) => {
    const next = matrix.map((row, ri) =>
      row.map((cell, ci) => (ri === r && ci === c ? Number(val) : cell))
    );
    setMatrix(next);
  };

  // Computations
  const colMaxs = [0, 1, 2].map((c) => Math.max(...matrix.map((row) => row[c])));
  const minimax = Math.min(...colMaxs);
  const minimaxCol = colMaxs.indexOf(minimax);

  // Adversary Test Result
  const actualPayoutUnderMinimax = matrix[simulatedRow][minimaxCol];

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
      title: '1. Foundry Competitor Bidding Minimax Rule (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Evaluated 3 rival bidding strategies to cap procurement expenses in Barrackpore. Col Maxima = [₹50k, ₹30k, ₹45k]. Minimax = ₹30,000, capping maximum payout at ₹30k.',
      lesson: 'The Minimax principle provides an airtight liability ceiling for cost-control.',
    },
    {
      title: '2. Cold-Chain Hospital Vaccine Contract Liability Ceiling (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Computed Column Maxima for 3 refrigeration vendor bids in Kolkata (C1 = ₹40k, C2 = ₹25k, C3 = ₹35k). Minimax = ₹25,000, capping emergency delay liabilities.',
      lesson: 'Health administrators use Minimax to guarantee that vendor costs never exceed budgetary limits.',
    },
    {
      title: '3. Supermarket FMCG Retail Discount Liability Optimization (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Analyzed rival supermarket promotional pricing in Ichapur, identifying that Column B2 capped store margin loss at ₹18,000 even during aggressive festival sales.',
      lesson: 'Minimax protects retail margins from unpredictable competitor sales tactics.',
    },
    {
      title: '4. Educational High-Tech Lab Research Patent Royalty Ceiling (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Evaluated university patent licensing terms in Jadavpur, using the Minimax criterion to guarantee that licensee royalty payouts would never exceed ₹55 Lakh.',
      lesson: 'Minimax modeling ensures institutional licensing contracts remain within fiscal bounds.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes minimaxGlow {
          0%, 100% { border-color: rgba(14, 165, 233, 0.3); }
          50% { border-color: rgba(14, 165, 233, 0.8); }
        }
        .glow-minimax {
          animation: minimaxGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Segment 5 • Module 005_002 • Topic 2
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Minimax Criterion • Column Maxima • Liability Ceiling v_upper
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Minimax Principle
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive study of the <span className="text-sky-400 font-semibold">Minimax Principle</span>: Player B’s loss-capping liability criterion, calculating <span className="text-amber-400 font-semibold">Column Maxima (max a_ij)</span>, minimizing the maximum payout ceiling (<span className="text-emerald-400 font-mono">v_upper = β</span>), and testing adversary resilience in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'minimax-theory', label: '1. Minimax Foundations' },
              { id: 'interactive-calculator', label: '2. Interactive Minimax Calculator' },
              { id: 'adversary-test', label: '3. Adversary Ceiling Test' },
              { id: 'svg-filter', label: '4. Two-Stage Filter SVG' },
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
                    ? 'bg-sky-600 text-white border-sky-500 shadow-md shadow-sky-900/40'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </header>

        {/* SECTION 1: Minimax Foundations */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                01
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Minimax Philosophy & 2-Stage Algorithm
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-bold">1. Loss-Capping Premise</span>
                <p className="text-slate-300 text-xs">
                  Player B assumes Player A will choose the row that maximizes Player A’s payoff.
                </p>
                <span className="text-sky-400 font-mono text-[11px]">Liability-minimizing decision rule.</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-300 font-bold">2. Column Maxima (Stage 1)</span>
                <p className="text-slate-300 text-xs">
                  Compute max_i a_ij vertically down each column j to find maximum payout liabilities.
                </p>
                <span className="text-amber-300 font-mono text-[11px]">Col Max_j = max_i a_ij</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-bold">3. Minimize Liability (Stage 2)</span>
                <p className="text-slate-300 text-xs">
                  Choose the column that minimizes these maxima: β = min_j (Col Max_j) = v_upper.
                </p>
                <span className="text-emerald-400 font-mono text-[11px]">Guarantees payout ≤ v_upper in ₹.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Interactive Minimax Calculator */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-minimax">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Minimax Calculator & Liability Ceiling Inspector
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Edit the matrix cells below (in ₹ Thousands) to observe how vertical column maxima and the horizontal Minimax value update in real time:
            </p>

            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-center border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2 text-left">Player A \ Player B</th>
                    {colMaxs.map((_, cIdx) => (
                      <th key={cIdx} className={clsx('p-2', cIdx === minimaxCol ? 'text-sky-300 font-bold bg-sky-950/40' : 'text-sky-400')}>
                        B_{cIdx + 1} {cIdx === minimaxCol ? '⭐' : ''}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {matrix.map((row, rIdx) => (
                    <tr key={rIdx}>
                      <td className="p-2 text-left font-bold text-rose-300">A_{rIdx + 1}</td>
                      {row.map((cell, cIdx) => {
                        const isMinimaxCol = cIdx === minimaxCol;
                        return (
                          <td key={cIdx} className="p-2">
                            <input
                              type="number"
                              value={cell}
                              onChange={(e) => updateCell(rIdx, cIdx, e.target.value)}
                              className={clsx(
                                'w-16 px-2 py-1 text-center rounded bg-slate-900 border font-mono text-xs',
                                isMinimaxCol
                                  ? 'border-sky-500 text-white font-bold'
                                  : 'border-slate-700 text-slate-300'
                              )}
                            />
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                  <tr className="border-t-2 border-slate-700 bg-sky-950/30">
                    <td className="p-2 text-left font-bold text-sky-400">Column Maximum (max a_ij)</td>
                    {colMaxs.map((cMax, cIdx) => {
                      const isMinimax = cIdx === minimaxCol;
                      return (
                        <td key={cIdx} className={clsx('p-2 font-bold', isMinimax ? 'text-emerald-400 bg-emerald-950/40 ring-1 ring-emerald-500 rounded' : 'text-sky-300')}>
                          ₹{cMax}k
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Minimax Result Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-slate-400 font-sans text-xs">Minimax Calculation:</span>
                <span className="text-white font-bold text-base">
                  β = min(Col Maxs) = min({colMaxs.map((v) => `₹${v}k`).join(', ')})
                </span>
                <span className="text-emerald-400 font-bold text-lg">
                  Minimax Value (v_upper) = +₹{minimax * 1000}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-600 flex flex-col space-y-1">
                <span className="text-slate-300 font-sans text-xs">Player B Optimal Strategy:</span>
                <span className="text-emerald-300 font-bold text-lg">Choose Strategy B_{minimaxCol + 1}</span>
                <span className="text-white text-xs">
                  Guarantees that maximum payout conceded will NEVER exceed ₹{minimax * 1000} regardless of Player A's move!
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Adversary Ceiling Test */}
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
                Adversary Attack Simulation: Proving Actual Payout ≤ v_upper
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Simulate Player A's attack row against Player B's Minimax strategy (B_{minimaxCol + 1}):
            </p>

            <div className="flex gap-3">
              {['A₁', 'A₂', 'A₃'].map((aLabel, rIdx) => (
                <button
                  key={rIdx}
                  onClick={() => setSimulatedRow(rIdx)}
                  className={clsx(
                    'flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all border',
                    simulatedRow === rIdx
                      ? 'bg-rose-600 text-white border-rose-400 shadow-md'
                      : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
                  )}
                >
                  Simulate Player A choosing {aLabel}
                </button>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm flex flex-col space-y-2">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <span className="text-slate-300 font-sans">Actual Payout for Pair (A_{simulatedRow + 1}, B_{minimaxCol + 1}):</span>
                <span className="text-sky-400 font-bold text-lg">+₹{actualPayoutUnderMinimax * 1000}</span>
              </div>
              <p className="text-slate-400 font-sans text-xs">
                Verification: Actual Payout (+₹{actualPayoutUnderMinimax * 1000}) ≤ Guaranteed Ceiling v_upper (+₹{minimax * 1000}) ➔ <strong className="text-emerald-300">Liability Ceiling Holds Perfectly! ✅</strong>
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Two-Stage Filter SVG */}
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
                Two-Stage Minimax Filter Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 180"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Stage 1: Vertical Maxima */}
                <rect x="50" y="35" width="260" height="110" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="180" y="60" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">STAGE 1: Column Maxima (Vertical)</text>
                <text x="180" y="85" fill="#cbd5e1" fontSize="9" textAnchor="middle">Col 1 Max: max(a₁₁, a₂₁, ...)</text>
                <text x="180" y="105" fill="#cbd5e1" fontSize="9" textAnchor="middle">Col 2 Max: max(a₁₂, a₂₂, ...)</text>
                <text x="180" y="125" fill="#cbd5e1" fontSize="9" textAnchor="middle">Col 3 Max: max(a₁₃, a₂₃, ...)</text>

                {/* Arrow */}
                <line x1="310" y1="90" x2="410" y2="90" stroke="#f59e0b" strokeWidth="2" />
                <polygon points="410,90 400,85 400,95" fill="#f59e0b" />
                <text x="360" y="80" fill="#f59e0b" fontSize="9" textAnchor="middle">min_j</text>

                {/* Stage 2: Horizontal Minimax */}
                <rect x="410" y="35" width="280" height="110" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="550" y="60" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">STAGE 2: Minimax Value (Horizontal)</text>
                <text x="550" y="90" fill="#ffffff" fontSize="11" fontFamily="monospace" textAnchor="middle">β = min_j [ Col Max_j ]</text>
                <text x="550" y="115" fill="#a7f3d0" fontSize="9" textAnchor="middle">Upper Value of Game: v_upper in ₹</text>
                <text x="550" y="135" fill="#fde68a" fontSize="8" textAnchor="middle">Guaranteed Liability Ceiling for Player B</text>
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
                Bengal Operations Research Minimax Case Studies
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
                  <p className="text-sky-300 font-semibold">💡 <strong>Operations Takeaway:</strong> {cs.lesson}</p>
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
                  trap: 'Taking the Minimum Down Columns and Then Maximizing (Confusing with Maximin)',
                  fix: 'Player B ALWAYS finds the MAXIMUM down columns first (worst liability), then takes the MINIMUM of those maxima (Minimax).',
                },
                {
                  trap: 'Assuming Player B Always Concedes Exactly v_upper',
                  fix: 'v_upper is the MAXIMUM ceiling; if Player A plays sub-optimally, Player B’s payout will be strictly less than v_upper.',
                },
                {
                  trap: 'Forgetting That Minimax Works for Negative Payoffs',
                  fix: 'When all cells are negative, Minimax selects the most negative column maximum, which maximizes Player B’s net gain in ₹.',
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
                  Think of the Minimax principle like purchasing insurance: you check the maximum damage of each policy option (Column Max), and you choose the policy that caps your maximum out-of-pocket loss to the absolute minimum!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how Player B's Minimax strategy creates a defensive roof that Player A cannot punch through, no matter which row they pick!
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
                Student Revision Checklist (Topic 2)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Understood the loss-capping premise of the Minimax Principle',
                'Computed Column Maxima (max_i a_ij) vertically for every column',
                'Computed the Minimax Value: β = min_j (Col Max_j) = v_upper',
                'Identified Player B\'s optimal Minimax pure strategy column j*',
                'Verified the mathematical guarantee: u_A(A_i, B_j*) ≤ v_upper',
                'Reported liability ceilings and values in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: The Minimax Principle is Player B's loss-capping shield! Extract Column Maxima vertically and select the minimum horizontally: β = min_j (max_i a_ij). This guarantees you will never concede more than v_upper in Indian Rupees (₹). In our next topic (Topic 3), we will see what happens when the Maximin armor and Minimax shield meet at a Saddle Point!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Minimax Principle FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Minimax Principle (Game Theory)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic3_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic2;
