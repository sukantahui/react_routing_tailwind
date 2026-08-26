// src/components/study/quantitative-analysis/topics/005_002_pure-strategy-and-saddle-point/Topic1.jsx
// React 19 Function-based Component
// Module: 005_002_pure-strategy-and-saddle-point
// Topic 1: Maximin principle

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

  // 3x3 Payoff Matrix State (in ₹ Thousands)
  const [matrix, setMatrix] = useState([
    [15, 25, 20],
    [40, 50, 45],
    [25, 30, 28],
  ]);

  const [simulatedCol, setSimulatedCol] = useState(0); // Test adversary move

  const updateCell = (r, c, val) => {
    const next = matrix.map((row, ri) =>
      row.map((cell, ci) => (ri === r && ci === c ? Number(val) : cell))
    );
    setMatrix(next);
  };

  // Computations
  const rowMins = matrix.map((row) => Math.min(...row));
  const maximin = Math.max(...rowMins);
  const maximinRow = rowMins.indexOf(maximin);

  // Adversary Test Result
  const actualPayoffUnderMaximin = matrix[maximinRow][simulatedCol];

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
      title: '1. Foundry Scrap Purchase Maximin Rule (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Evaluated 3 scrap metal suppliers against fluctuating market prices in Barrackpore. Row Minima = [₹15k, ₹40k, ₹25k]. Maximin = ₹40,000, securing a guaranteed profit floor of ₹40k.',
      lesson: 'The Maximin principle guarantees an ironclad bottom-line profit floor.',
    },
    {
      title: '2. Cold-Chain Hospital Vaccine Contract Security Floor (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Computed Row Minima for 2 transport vendors in Kolkata (R1 = ₹20k, R2 = ₹35k). Maximin = ₹35,000, establishing a minimum guaranteed service delivery level.',
      lesson: 'Hospital logistics directors use Maximin to protect critical medical supply chains.',
    },
    {
      title: '3. Supermarket FMCG Retail Discount Floor (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Analyzed 3 discount campaigns in Ichapur (R1 = ₹10k, R2 = ₹18k, R3 = ₹12k). Maximin = ₹18,000, ensuring store profit never dipped below ₹18k even under heavy rival advertising.',
      lesson: 'Maximin eliminates retail vulnerability during aggressive competitor promotional blitzes.',
    },
    {
      title: '4. Educational High-Tech Lab Research Grant Protection (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Evaluated university patent licensing terms in Jadavpur, using the Maximin criterion to guarantee that research royalties would never fall below ₹55 Lakh.',
      lesson: 'Maximin negotiation strategies secure non-negotiable minimum grant funding.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes maximinGlow {
          0%, 100% { border-color: rgba(244, 63, 94, 0.3); }
          50% { border-color: rgba(244, 63, 94, 0.8); }
        }
        .glow-maximin {
          animation: maximinGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-rose-950/80 text-rose-400 border border-rose-800/60">
              Segment 5 • Module 005_002 • Topic 1
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-rose-950/80 text-rose-400 border border-rose-800/60">
              Maximin Criterion • Row Minima • Security Floor v_lower
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Maximin Principle
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive study of the <span className="text-rose-400 font-semibold">Maximin Principle</span>: Player A’s pessimistic security-first criterion, calculating <span className="text-amber-400 font-semibold">Row Minima (min a_ij)</span>, maximizing the guaranteed security floor (<span className="text-emerald-400 font-mono">v_lower = α</span>), and testing adversary resilience in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'maximin-theory', label: '1. Maximin Foundations' },
              { id: 'interactive-calculator', label: '2. Interactive Maximin Calculator' },
              { id: 'adversary-test', label: '3. Adversary Resilience Test' },
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
                    ? 'bg-rose-600 text-white border-rose-500 shadow-md shadow-rose-900/40'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </header>

        {/* SECTION 1: Maximin Foundations */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-600/20 text-rose-400 font-bold text-sm">
                01
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Maximin Philosophy & 2-Stage Algorithm
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-rose-400 font-bold">1. Pessimistic Premise</span>
                <p className="text-slate-300 text-xs">
                  Player A assumes Player B will choose the column that minimizes Player A’s payoff.
                </p>
                <span className="text-rose-400 font-mono text-[11px]">Security-first decision rule.</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-300 font-bold">2. Row Minima (Stage 1)</span>
                <p className="text-slate-300 text-xs">
                  Compute min_j a_ij horizontally across each row i to find guaranteed floors.
                </p>
                <span className="text-amber-300 font-mono text-[11px]">Row Min_i = min_j a_ij</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-bold">3. Maximize Floor (Stage 2)</span>
                <p className="text-slate-300 text-xs">
                  Choose the row that maximizes these minima: α = max_i (Row Min_i) = v_lower.
                </p>
                <span className="text-emerald-400 font-mono text-[11px]">Guarantees ≥ v_lower in ₹.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Interactive Maximin Calculator */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-maximin">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-600/20 text-rose-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Maximin Calculator & Security Floor Inspector
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Edit the matrix cells below (in ₹ Thousands) to observe how horizontal row minima and the vertical Maximin value update in real time:
            </p>

            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-center border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2 text-left">Player A \ Player B</th>
                    <th className="p-2 text-sky-400">B₁</th>
                    <th className="p-2 text-sky-400">B₂</th>
                    <th className="p-2 text-sky-400">B₃</th>
                    <th className="p-2 text-rose-400 font-bold bg-rose-950/30">Row Minimum (min a_ij)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {matrix.map((row, rIdx) => {
                    const isMaximin = rIdx === maximinRow;
                    return (
                      <tr key={rIdx} className={clsx(isMaximin ? 'bg-rose-950/20' : '')}>
                        <td className="p-2 text-left font-bold text-rose-300">
                          A_{rIdx + 1} {isMaximin ? '⭐ (Maximin Strategy)' : ''}
                        </td>
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="p-2">
                            <input
                              type="number"
                              value={cell}
                              onChange={(e) => updateCell(rIdx, cIdx, e.target.value)}
                              className={clsx(
                                'w-16 px-2 py-1 text-center rounded bg-slate-900 border font-mono text-xs',
                                isMaximin
                                  ? 'border-rose-500 text-white font-bold'
                                  : 'border-slate-700 text-slate-300'
                              )}
                            />
                          </td>
                        ))}
                        <td className={clsx('p-2 font-bold', isMaximin ? 'text-emerald-400 bg-emerald-950/40 ring-1 ring-emerald-500 rounded' : 'text-rose-400 bg-rose-950/20')}>
                          ₹{rowMins[rIdx]}k
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Maximin Result Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-slate-400 font-sans text-xs">Maximin Calculation:</span>
                <span className="text-white font-bold text-base">
                  α = max(Row Mins) = max({rowMins.map((v) => `₹${v}k`).join(', ')})
                </span>
                <span className="text-emerald-400 font-bold text-lg">
                  Maximin Value (v_lower) = +₹{maximin * 1000}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-600 flex flex-col space-y-1">
                <span className="text-slate-300 font-sans text-xs">Player A Optimal Strategy:</span>
                <span className="text-emerald-300 font-bold text-lg">Choose Strategy A_{maximinRow + 1}</span>
                <span className="text-white text-xs">
                  Guarantees a minimum payoff floor of at least ₹{maximin * 1000} regardless of Player B's move!
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Adversary Resilience Test */}
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
                Adversary Resilience Simulation: Proving Actual Payoff ≥ v_lower
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Simulate Player B's counter-move against Player A's Maximin strategy (A_{maximinRow + 1}):
            </p>

            <div className="flex gap-3">
              {['B₁', 'B₂', 'B₃'].map((bLabel, cIdx) => (
                <button
                  key={cIdx}
                  onClick={() => setSimulatedCol(cIdx)}
                  className={clsx(
                    'flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all border',
                    simulatedCol === cIdx
                      ? 'bg-sky-600 text-white border-sky-400 shadow-md'
                      : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
                  )}
                >
                  Simulate Player B choosing {bLabel}
                </button>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm flex flex-col space-y-2">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <span className="text-slate-300 font-sans">Actual Payoff for Pair (A_{maximinRow + 1}, B_{simulatedCol + 1}):</span>
                <span className="text-emerald-400 font-bold text-lg">+₹{actualPayoffUnderMaximin * 1000}</span>
              </div>
              <p className="text-slate-400 font-sans text-xs">
                Verification: Actual Payoff (+₹{actualPayoffUnderMaximin * 1000}) ≥ Guaranteed Floor v_lower (+₹{maximin * 1000}) ➔ <strong className="text-emerald-300">Inequality Holds Perfectly! ✅</strong>
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
                Two-Stage Maximin Filter Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 180"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Stage 1: Horizontal Minima */}
                <rect x="50" y="35" width="260" height="110" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <text x="180" y="60" fill="#f43f5e" fontSize="11" fontWeight="bold" textAnchor="middle">STAGE 1: Row Minima (Horizontal)</text>
                <text x="180" y="85" fill="#cbd5e1" fontSize="9" textAnchor="middle">Row 1 Min: min(a₁₁, a₁₂, ...)</text>
                <text x="180" y="105" fill="#cbd5e1" fontSize="9" textAnchor="middle">Row 2 Min: min(a₂₁, a₂₂, ...)</text>
                <text x="180" y="125" fill="#cbd5e1" fontSize="9" textAnchor="middle">Row 3 Min: min(a₃₁, a₃₂, ...)</text>

                {/* Arrow */}
                <line x1="310" y1="90" x2="410" y2="90" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="410,90 400,85 400,95" fill="#38bdf8" />
                <text x="360" y="80" fill="#38bdf8" fontSize="9" textAnchor="middle">max_i</text>

                {/* Stage 2: Vertical Maximin */}
                <rect x="410" y="35" width="280" height="110" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="550" y="60" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">STAGE 2: Maximin Value (Vertical)</text>
                <text x="550" y="90" fill="#ffffff" fontSize="11" fontFamily="monospace" textAnchor="middle">α = max_i [ Row Min_i ]</text>
                <text x="550" y="115" fill="#a7f3d0" fontSize="9" textAnchor="middle">Lower Value of Game: v_lower in ₹</text>
                <text x="550" y="135" fill="#fde68a" fontSize="8" textAnchor="middle">Guaranteed Security Floor for Player A</text>
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
                Bengal Operations Research Maximin Case Studies
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
                  <p className="text-rose-300 font-semibold">💡 <strong>Operations Takeaway:</strong> {cs.lesson}</p>
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
                  trap: 'Taking the Maximum Across Rows and Then Minimizing (Confusing with Minimax)',
                  fix: 'Player A ALWAYS finds the MINIMUM across rows first (worst case), then takes the MAXIMUM of those minima (Maximin).',
                },
                {
                  trap: 'Assuming Actual Payoff Cannot Exceed v_lower',
                  fix: 'v_lower is the guaranteed MINIMUM floor; if Player B makes a sub-optimal move, Player A receives strictly more than v_lower.',
                },
                {
                  trap: 'Forgetting That Maximin Works for Negative Payoffs',
                  fix: 'When all cells are negative, Maximin selects the least negative row minimum, which minimizes worst-case loss in ₹.',
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
                  Think of the Maximin principle as building a dike against a flood: you measure the lowest point of each embankment (Row Min), and you build the one whose lowest point is highest above water!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how the Maximin strategy protects you completely from disaster, even if your competitor hires the best consultant in the world!
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
                'Understood the pessimistic security-first premise of the Maximin Principle',
                'Computed Row Minima (min_j a_ij) horizontally for every row',
                'Computed the Maximin Value: α = max_i (Row Min_i) = v_lower',
                'Identified Player A\'s optimal Maximin pure strategy row i*',
                'Verified the mathematical guarantee: u_A(A_i*, B_j) ≥ v_lower',
                'Reported security floors and values in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: The Maximin Principle is Player A's fundamental security armor! Extract Row Minima horizontally and select the maximum vertically: α = max_i (min_j a_ij). This guarantees you will never receive less than v_lower in Indian Rupees (₹). In our next topic (Topic 2), we will examine Player B's mirror counterpart: the Minimax Principle!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Maximin Principle FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Maximin Principle (Game Theory)"
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
