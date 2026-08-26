// src/components/study/quantitative-analysis/topics/005_002_pure-strategy-and-saddle-point/Topic5.jsx
// React 19 Function-based Component
// Module: 005_002_pure-strategy-and-saddle-point
// Topic 5: Optimal pure strategies

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic5_files/topic5_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic5_files/topic5_note.txt?raw';

const Topic5 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);

  // 3x3 Payoff Matrix State (in ₹ Thousands) - Has saddle point at (A2, B1) = ₹30k
  const [matrix, setMatrix] = useState([
    [10, 20, 15],
    [30, 40, 35],
    [20, 25, 22],
  ]);

  const [testedRow, setTestedRow] = useState(0); // For deviation testing
  const [testedCol, setTestedCol] = useState(1); // For deviation testing

  const updateCell = (r, c, val) => {
    const next = matrix.map((row, ri) =>
      row.map((cell, ci) => (ri === r && ci === c ? Number(val) : cell))
    );
    setMatrix(next);
  };

  // Computations
  const rowMins = matrix.map((row) => Math.min(...row));
  const colMaxs = [0, 1, 2].map((c) => Math.max(...matrix.map((row) => row[c])));
  const maximin = Math.max(...rowMins);
  const minimax = Math.min(...colMaxs);
  const hasSaddle = maximin === minimax;

  const optimalRowIdx = rowMins.indexOf(maximin);
  const optimalColIdx = colMaxs.indexOf(minimax);

  // Deviation Penalty Calculations
  // If Player A deviates to testedRow while B plays optimalColIdx
  const playerAPayoffUnderDeviation = matrix[testedRow][optimalColIdx];
  const playerAPenalty = maximin - playerAPayoffUnderDeviation;

  // If Player B deviates to testedCol while A plays optimalRowIdx
  const playerBConcededUnderDeviation = matrix[optimalRowIdx][testedCol];
  const playerBPenalty = playerBConcededUnderDeviation - minimax;

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
      title: '1. Foundry Shift Strategy Optimization (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Executed the 5-step algorithm for a 3x3 casting tender in Barrackpore, identifying A2 (Medium Overtime) as his optimal pure strategy, locking in ₹40,000 profit.',
      lesson: 'The 5-step algorithm extracts self-enforcing optimal strategies.',
    },
    {
      title: '2. Cold-Chain Vaccine Vendor Strategy Optimization (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Identified B2 (Direct Highway Courier) as the vendor\'s optimal pure strategy in Kolkata, capping hospital delivery liabilities at ₹25,000.',
      lesson: 'Optimal pure strategies remove ambiguity from corporate logistics contracts.',
    },
    {
      title: '3. Supermarket FMCG Retail Strategy Optimization (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Analyzed promotional competition in Ichapur, determining that Strategy A1 (Bundle Discounts) was strictly optimal, securing ₹18,000 weekend profit.',
      lesson: 'Executing optimal pure strategies prevents margin erosion during retail campaigns.',
    },
    {
      title: '4. Educational High-Tech Lab Licensing Strategy Optimization (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Executed the 5-step algorithm in Jadavpur, proving that Strategy A1 (Standard Research Cross-Licensing) yielded a stable ₹55 Lakh institutional equilibrium.',
      lesson: 'Equilibrium strategy extraction protects high-value intellectual property.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes optGlow {
          0%, 100% { border-color: rgba(168, 85, 247, 0.3); }
          50% { border-color: rgba(168, 85, 247, 0.8); }
        }
        .glow-opt {
          animation: optGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-purple-950/80 text-purple-400 border border-purple-800/60">
              Segment 5 • Module 005_002 • Topic 5
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-purple-950/80 text-purple-400 border border-purple-800/60">
              5-Step Algorithm • Unit Basis Vectors • Deviation Penalties
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Optimal Pure Strategies
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive masterclass on <span className="text-purple-400 font-semibold">Optimal Pure Strategies</span>: mastering the <span className="text-emerald-400 font-semibold">5-Step Extraction Algorithm</span>, expressing strategies as unit basis vectors (<span className="text-amber-400 font-mono">p* = e_i*, q* = e_j*</span>), and quantifying deviation penalties in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: '5step-algo', label: '1. 5-Step Extraction Algorithm' },
              { id: 'interactive-workbench', label: '2. Interactive Strategy Workbench' },
              { id: 'deviation-sandbox', label: '3. Deviation Penalty Sandbox' },
              { id: 'svg-pipeline', label: '4. Strategy Extraction Pipeline SVG' },
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
              &gt;
                {item.label}
              </button>
            ))}
          </div>
        </header>

        {/* SECTION 1: 5-Step Extraction Algorithm */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-600/20 text-purple-400 font-bold text-sm">
                01
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                The 5-Step Optimal Pure Strategy Extraction Algorithm
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-rose-400 font-bold">Step 1: Row Minima</span>
                <p className="text-slate-300">Compute min_j a_ij horizontally across each row.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-300 font-bold">Step 2: Maximin Row i*</span>
                <p className="text-slate-300">Find row i* that maximizes row minima (Maximin α).</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-bold">Step 3: Col Maxima</span>
                <p className="text-slate-300">Compute max_i a_ij vertically down each column.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-indigo-300 font-bold">Step 4: Minimax Col j*</span>
                <p className="text-slate-300">Find column j* that minimizes column maxima (Minimax β).</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-bold">Step 5: Verify Saddle</span>
                <p className="text-slate-300">If α == β, declare (A_i*, B_j*) optimal with value v*.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Interactive Strategy Workbench */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-opt">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-600/20 text-purple-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Optimal Strategy Extraction Studio
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Edit the matrix cells below (in ₹ Thousands) to see how the system dynamically identifies Player A’s optimal row strategy (A_{optimalRowIdx + 1}) and Player B’s optimal column strategy (B_{optimalColIdx + 1}):
            </p>

            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-center border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2 text-left">Player A \ Player B</th>
                    {colMaxs.map((_, cIdx) => (
                      <th
                        key={cIdx}
                        className={clsx(
                          'p-2',
                          cIdx === optimalColIdx ? 'text-purple-300 font-bold bg-purple-950/40' : 'text-sky-400'
                        )}
                      >
                        B_{cIdx + 1} {cIdx === optimalColIdx ? '⭐ (q*)' : ''}
                      </th>
                    ))}
                    <th className="p-2 text-rose-400 bg-rose-950/30">Row Min</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {matrix.map((row, rIdx) => {
                    const isOptimalRow = rIdx === optimalRowIdx;
                    return (
                      <tr key={rIdx} className={clsx(isOptimalRow ? 'bg-purple-950/20' : '')}>
                        <td className="p-2 text-left font-bold text-rose-300">
                          A_{rIdx + 1} {isOptimalRow ? '⭐ (p*)' : ''}
                        </td>
                        {row.map((cell, cIdx) => {
                          const isSaddleCell = isOptimalRow && cIdx === optimalColIdx;
                          return (
                            <td key={cIdx} className="p-2">
                              <input
                                type="number"
                                value={cell}
                                onChange={(e) => updateCell(rIdx, cIdx, e.target.value)}
                                className={clsx(
                                  'w-16 px-2 py-1 text-center rounded bg-slate-900 border font-mono text-xs',
                                  isSaddleCell
                                    ? 'bg-emerald-950 border-emerald-400 text-emerald-300 font-bold ring-2 ring-emerald-500 shadow-lg'
                                    : 'border-slate-700 text-slate-300'
                                )}
                              /&gt;
                            </td>
                          );
                        })}
                        <td className="p-2 font-bold text-rose-400 bg-rose-950/20">₹{rowMins[rIdx]}k</td>
                      </tr>
                    );
                  })}
                  <tr className="border-t-2 border-slate-700 bg-sky-950/30">
                    <td className="p-2 text-left font-bold text-sky-400">Col Max</td>
                    {colMaxs.map((cMax, cIdx) => (
                      <td key={cIdx} className="p-2 font-bold text-sky-300">₹{cMax}k</td>
                    ))}
                    <td className="p-2 text-slate-600">—</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Optimal Strategy Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs sm:text-sm">
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <span className="text-slate-400 font-sans text-xs">Player A Optimal Strategy:</span>
                <span className="text-rose-400 font-bold text-base">Choose Strategy A_{optimalRowIdx + 1}</span>
                <span className="text-slate-400 text-[11px]">Vector p* = [{[0, 1, 2].map((i) => (i === optimalRowIdx ? '1' : '0')).join(', ')}]ᵀ</span>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <span className="text-slate-400 font-sans text-xs">Player B Optimal Strategy:</span>
                <span className="text-sky-400 font-bold text-base">Choose Strategy B_{optimalColIdx + 1}</span>
                <span className="text-slate-400 text-[11px]">Vector q* = [{[0, 1, 2].map((j) => (j === optimalColIdx ? '1' : '0')).join(', ')}]ᵀ</span>
              </div>

              <div className={clsx('p-3.5 rounded-xl border flex flex-col space-y-1', hasSaddle ? 'bg-emerald-950/60 border-emerald-600' : 'bg-amber-950/60 border-amber-600')}>
                <span className="text-slate-300 font-sans text-xs">Optimal Equilibrium Value:</span>
                <span className={clsx('font-bold text-base', hasSaddle ? 'text-emerald-300' : 'text-amber-300')}>
                  {hasSaddle ? `v* = +₹${maximin * 1000} (at A_${optimalRowIdx + 1}, B_${optimalColIdx + 1}) ⭐` : `Mixed Strategy Solution Required 🎲`}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Deviation Penalty Sandbox */}
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
                Unilateral Deviation Penalty Sandbox
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Test what happens when either player deviates from their optimal pure strategy against their rational opponent:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              {/* Player A Deviation Test */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-3 font-mono">
                <span className="text-rose-400 font-sans font-bold">1. Test Player A Deviation (Row Switch):</span>
                <div className="flex gap-2">
                  {[0, 1, 2].map((rIdx) => (
                    <button
                      key={rIdx}
                      onClick={() => setTestedRow(rIdx)}
                      className={clsx(
                        'flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all border',
                        testedRow === rIdx
                          ? 'bg-rose-600 text-white border-rose-400 shadow-md'
                          : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
                      )}
                    &gt;
                      Row A_{rIdx + 1}
                    </button>
                  ))}
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-slate-300 font-sans text-xs">Resulting Payoff against B_{optimalColIdx + 1}:</span>
                  <span className="text-white font-bold">Payoff = +₹{playerAPayoffUnderDeviation * 1000}</span>
                  <span className={clsx('font-bold text-xs', playerAPenalty > 0 ? 'text-rose-400' : 'text-emerald-400')}&gt;
                    {playerAPenalty > 0 ? `⚠️ Penalty: Loss of ₹${playerAPenalty * 1000}` : `Optimal Payoff Preserved (₹0 Penalty)`}
                  </span>
                </div>
              </div>

              {/* Player B Deviation Test */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-3 font-mono">
                <span className="text-sky-400 font-sans font-bold">2. Test Player B Deviation (Column Switch):</span>
                <div className="flex gap-2">
                  {[0, 1, 2].map((cIdx) => (
                    <button
                      key={cIdx}
                      onClick={() => setTestedCol(cIdx)}
                      className={clsx(
                        'flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all border',
                        testedCol === cIdx
                          ? 'bg-sky-600 text-white border-sky-400 shadow-md'
                          : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
                      )}
                    &gt;
                      Col B_{cIdx + 1}
                    </button>
                  ))}
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-slate-300 font-sans text-xs">Payout Conceded against A_{optimalRowIdx + 1}:</span>
                  <span className="text-white font-bold">Payout = +₹{playerBConcededUnderDeviation * 1000}</span>
                  <span className={clsx('font-bold text-xs', playerBPenalty > 0 ? 'text-rose-400' : 'text-emerald-400')}&gt;
                    {playerBPenalty > 0 ? `⚠️ Penalty: Concedes extra ₹${playerBPenalty * 1000}` : `Optimal Payout Preserved (₹0 Penalty)`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Strategy Extraction Pipeline SVG */}
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
                Optimal Pure Strategy Extraction Pipeline Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 180"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Stage 1: Row/Col Extrema */}
                <rect x="20" y="40" width="200" height="90" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <text x="120" y="65" fill="#f43f5e" fontSize="10" fontWeight="bold" textAnchor="middle">1. Extrema Extraction</text>
                <text x="120" y="85" fill="#cbd5e1" fontSize="8" textAnchor="middle">Row Mins: min_j a_ij</text>
                <text x="120" y="105" fill="#cbd5e1" fontSize="8" textAnchor="middle">Col Maxs: max_i a_ij</text>

                <line x1="220" y1="85" x2="260" y2="85" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="260,85 250,80 250,90" fill="#38bdf8" />

                {/* Stage 2: Maximin & Minimax */}
                <rect x="260" y="40" width="200" height="90" rx="8" fill="#1e293b" stroke="#818cf8" strokeWidth="2" />
                <text x="360" y="65" fill="#818cf8" fontSize="10" fontWeight="bold" textAnchor="middle">2. Index Identification</text>
                <text x="360" y="85" fill="#cbd5e1" fontSize="8" textAnchor="middle">i* = argmax(Row Mins)</text>
                <text x="360" y="105" fill="#cbd5e1" fontSize="8" textAnchor="middle">j* = argmin(Col Maxs)</text>

                <line x1="460" y1="85" x2="500" y2="85" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="500,85 490,80 490,90" fill="#38bdf8" />

                {/* Stage 3: Optimal Profile */}
                <rect x="500" y="40" width="220" height="90" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="610" y="65" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">3. Optimal Strategy Profile</text>
                <text x="610" y="85" fill="#cbd5e1" fontSize="8" textAnchor="middle">Profile: (A_i*, B_j*)</text>
                <text x="610" y="105" fill="#fde68a" fontSize="8" textAnchor="middle">Game Value: v* = a_i*j* in ₹</text>
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
                Bengal Operations Research Strategy Optimization Case Studies
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
                  trap: 'Picking a Row with the Single Highest Cell Value (Ignoring Security Floor)',
                  fix: 'A rational opponent will avoid the highest cell; always select the strategy that maximizes the row MINIMUM.',
                },
                {
                  trap: 'Assuming Strategy Choices Change if Opponent Learns Your Move',
                  fix: 'At a saddle point equilibrium, pure strategies are completely unexploitable even with full advance disclosure.',
                },
                {
                  trap: 'Forgetting That Both Players Must Play Optimally to Realize v*',
                  fix: 'If Player B makes an error, Player A will receive even MORE than v*.',
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
                  Think of the optimal pure strategy like aiming crosshairs: Player A's horizontal line at row i* and Player B's vertical line at column j* lock onto the saddle point bullseye!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how switching away from the optimal row immediately drops your return: the math actively protects your best choice!
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
                Student Revision Checklist (Topic 5)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Mastered the 5-step optimal pure strategy extraction algorithm',
                'Extracted optimal indices i* (Row Maximizer) and j* (Column Minimizer)',
                'Verified that a_i*j* == Maximin == Minimax == v*',
                'Proved unilateral deviation penalties for both players',
                'Reported optimal strategy returns and game values in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: The 5-step extraction algorithm is your trusted compass for finding optimal pure strategies! Remember that A_i* and B_j* form a self-enforcing Nash equilibrium. In our next topic (Topic 6), we will work through comprehensive numerical examples across 2x2, 3x3, and rectangular matrices!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Optimal Pure Strategies FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Optimal Pure Strategies (Game Theory)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic6_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic5;
