// src/components/study/quantitative-analysis/topics/005_003_principle-of-dominance/Topic1.jsx
// React 19 Function-based Component
// Module: 005_003_principle-of-dominance
// Topic 1: Row dominance rules

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

  // 3x3 Payoff Matrix State (in ₹ Thousands) - Default: Row 2 dominates Row 3
  const [matrix, setMatrix] = useState([
    [20, 30, 25],
    [40, 50, 45],
    [15, 25, 20],
  ]);

  const [eliminatedRows, setEliminatedRows] = useState([]);

  const updateCell = (r, c, val) => {
    const next = matrix.map((row, ri) =>
      row.map((cell, ci) => (ri === r && ci === c ? Number(val) : cell))
    );
    setMatrix(next);
    setEliminatedRows([]); // Reset elimination on edit
  };

  // Check pairwise row dominance
  const rowDominancePairs = [];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      if (i !== j) {
        const isDom =
          matrix[i].every((val, k) => val >= matrix[j][k]) &&
          matrix[i].some((val, k) => val > matrix[j][k]);
        if (isDom) {
          rowDominancePairs.push({ dominant: i, dominated: j });
        }
      }
    }
  }

  const toggleEliminateRow = (rIdx) => {
    if (eliminatedRows.includes(rIdx)) {
      setEliminatedRows(eliminatedRows.filter((r) => r !== rIdx));
    } else {
      setEliminatedRows([...eliminatedRows, rIdx]);
    }
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
      title: '1. Foundry Furnace Shift Row Dominance (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Compared Row 1 [₹40k, ₹50k] against Row 2 [₹20k, ₹30k] in Barrackpore. Since 40 > 20 and 50 > 30, Row 1 strictly dominated Row 2, eliminating Row 2 from tender consideration.',
      lesson: 'Row dominance prunes inferior operational plans with mathematical certainty.',
    },
    {
      title: '2. Cold-Chain Transport Shift Row Dominance (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Compared Dedicated Reefer Transport (Row 1 = [₹35k, ₹45k]) against Uninsulated Van Transport (Row 2 = [₹10k, ₹20k]) in Kolkata, eliminating Row 2 completely.',
      lesson: 'Eliminating dominated logistics options guarantees service quality.',
    },
    {
      title: '3. Supermarket FMCG Retail Promotion Row Dominance (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Analyzed 3 promotional strategies in Ichapur: Strategy A1 (Bundle Loyalty) dominated Strategy A3 (Discount Coupon) across all rival pricing states, pruning Row A3.',
      lesson: 'Retail managers use row dominance to prevent self-defeating promotional discounts.',
    },
    {
      title: '4. Educational High-Tech Lab Patent Negotiation (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Compared Joint Development (Row 1) against Outright Litigation (Row 2) in Jadavpur, proving that Row 1 dominated Row 2 by ₹25 Lakh across all legal scenarios.',
      lesson: 'Row dominance provides clear legal justification for constructive commercial settlement.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes rowDomGlow {
          0%, 100% { border-color: rgba(244, 63, 94, 0.3); }
          50% { border-color: rgba(244, 63, 94, 0.8); }
        }
        .glow-row-dom {
          animation: rowDomGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-rose-950/80 text-rose-400 border border-rose-800/60">
              Segment 5 • Module 005_003 • Topic 1
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-rose-950/80 text-rose-400 border border-rose-800/60">
              Row Dominance • Player A Maximization • Delete Smaller Rows
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
            Row Dominance Rules
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive study of <span className="text-rose-400 font-semibold">Row Dominance Rules</span> for Player A (Row Maximizer): mathematical criteria (<span className="text-amber-400 font-mono">a_ik ≥ a_jk ∀ k</span>), pairwise comparison algorithms, deleting the smaller row, and zero probability assignment in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'row-dom-criteria', label: '1. Row Dominance Criteria' },
              { id: 'interactive-inspector', label: '2. Pairwise Dominance Inspector' },
              { id: 'step-algorithm', label: '3. Pairwise Comparison Protocol' },
              { id: 'svg-gate', label: '4. Row Elimination Gate SVG' },
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

        {/* SECTION 1: Row Dominance Criteria */}
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
                Row Dominance Mathematical Criteria
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-rose-400 font-bold">1. Inequality Condition</span>
                <p className="text-slate-300 text-xs">
                  Row i dominates Row j if a_ik ≥ a_jk for ALL columns k = 1, ..., n.
                </p>
                <span className="text-rose-400 font-mono text-[11px]">a_ik ≥ a_jk ∀ k</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-300 font-bold">2. Elimination Directive</span>
                <p className="text-slate-300 text-xs">
                  Player A is a Maximizer. <strong>Delete the SMALLER row (Row j)</strong>!
                </p>
                <span className="text-amber-300 font-mono text-[11px]">Retain higher payoff Row i.</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-bold">3. Zero Weight in Vector</span>
                <p className="text-slate-300 text-xs">
                  Eliminated Row j receives probability p_j* = 0 in the equilibrium mixed vector.
                </p>
                <span className="text-emerald-400 font-mono text-[11px]">p_j* = 0.0</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Pairwise Dominance Inspector */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-row-dom">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-600/20 text-rose-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Pairwise Row Dominance Inspector
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Edit the matrix cells below (in ₹ Thousands). The system scans all pairwise row combinations and reveals which row dominates another:
            </p>

            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-center border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2 text-left">Player A \ Player B</th>
                    <th className="p-2 text-sky-400">B₁</th>
                    <th className="p-2 text-sky-400">B₂</th>
                    <th className="p-2 text-sky-400">B₃</th>
                    <th className="p-2 text-rose-400">Dominance Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {matrix.map((row, rIdx) => {
                    const isElim = eliminatedRows.includes(rIdx);
                    const isDominant = rowDominancePairs.some((p) => p.dominant === rIdx);
                    const isDominated = rowDominancePairs.some((p) => p.dominated === rIdx);

                    return (
                      <tr key={rIdx} className={clsx(isElim ? 'line-through bg-rose-950/30 text-slate-600' : '')}>
                        <td className="p-2 text-left font-bold text-rose-300">
                          A_{rIdx + 1} {isDominant ? '👑 (Dominant)' : isDominated ? '⚠️ (Dominated)' : ''}
                        </td>
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className="p-2">
                            <input
                              type="number"
                              value={cell}
                              disabled={isElim}
                              onChange={(e) => updateCell(rIdx, cIdx, e.target.value)}
                              className={clsx(
                                'w-16 px-2 py-1 text-center rounded bg-slate-900 border font-mono text-xs',
                                isDominant ? 'border-emerald-500 text-emerald-300 font-bold' : isDominated ? 'border-rose-500 text-rose-300' : 'border-slate-700 text-slate-300'
                              )}
                            />
                          </td>
                        ))}
                        <td className="p-2">
                          {isDominated ? (
                            <button
                              onClick={() => toggleEliminateRow(rIdx)}
                              className={clsx(
                                'px-3 py-1 rounded text-xs font-semibold border transition-all',
                                isElim
                                  ? 'bg-slate-800 text-slate-400 border-slate-700'
                                  : 'bg-rose-600 text-white border-rose-500 hover:bg-rose-500'
                              )}
                            >
                              {isElim ? 'Restore Row ↩️' : 'Eliminate Row ❌'}
                            </button>
                          ) : (
                            <span className="text-slate-500 text-xs">Active</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Dominance Detection Findings */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2 text-xs sm:text-sm font-mono">
              <span className="text-amber-400 font-sans font-bold">Pairwise Dominance Analysis:</span>
              {rowDominancePairs.length > 0 ? (
                rowDominancePairs.map((pair, idx) => (
                  <p key={idx} className="text-emerald-300">
                    ✅ <strong>Row A_{pair.dominant + 1}</strong> dominates <strong>Row A_{pair.dominated + 1}</strong> because all entries ({matrix[pair.dominant].map((v) => `₹${v}k`).join(', ')}) ≥ ({matrix[pair.dominated].map((v) => `₹${v}k`).join(', ')}). ➔ <em>Delete Row A_{pair.dominated + 1}!</em>
                  </p>
                ))
              ) : (
                <p className="text-slate-400 font-sans">No strict row dominance detected between current rows.</p>
              )}
            </div>
          </div>
        </section>

        {/* SECTION 3: Pairwise Comparison Protocol */}
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
                Pairwise Comparison Protocol & Combinatorics
              </h2>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-3 text-xs sm:text-sm">
              <p className="text-slate-300 leading-relaxed">
                To test row dominance in an m-row matrix, perform <span className="text-cyan-300 font-bold font-mono">m(m − 1) / 2</span> pairwise comparisons:
              </p>
              <ul className="text-slate-300 space-y-1 list-disc list-inside">
                <li>For 3 rows: 3(2)/2 = <strong>3 comparisons</strong> (A₁ vs A₂, A₁ vs A₃, A₂ vs A₃).</li>
                <li>For 4 rows: 4(3)/2 = <strong>6 comparisons</strong>.</li>
                <li>For 5 rows: 5(4)/2 = <strong>10 comparisons</strong>.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 4: Row Elimination Gate SVG */}
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
                Row Dominance Gate Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 180"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Comparing Two Rows */}
                <rect x="50" y="35" width="220" height="110" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <text x="160" y="60" fill="#f43f5e" fontSize="11" fontWeight="bold" textAnchor="middle">Pairwise Comparison</text>
                <text x="160" y="85" fill="#34d399" fontSize="9" textAnchor="middle">Row i = [40, 50, 45]</text>
                <text x="160" y="105" fill="#f87171" fontSize="9" textAnchor="middle">Row j = [15, 25, 20]</text>
                <text x="160" y="125" fill="#cbd5e1" fontSize="8" textAnchor="middle">Test: a_ik ≥ a_jk ∀ k</text>

                <line x1="270" y1="90" x2="380" y2="90" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="380,90 370,85 370,95" fill="#38bdf8" />
                <text x="325" y="80" fill="#38bdf8" fontSize="9" textAnchor="middle">Dominance Gate</text>

                {/* Verdict & Pruning */}
                <rect x="380" y="35" width="310" height="110" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="535" y="60" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">Pruning Action (Player A Maximizer)</text>
                <text x="535" y="85" fill="#ffffff" fontSize="9" textAnchor="middle">👑 Retain Row i (Higher Payoffs)</text>
                <text x="535" y="105" fill="#fca5a5" fontSize="9" textAnchor="middle">❌ ELIMINATE Row j (Smaller Row)</text>
                <text x="535" y="125" fill="#fde68a" fontSize="8" textAnchor="middle">Assign p_j* = 0 in Strategy Vector</text>
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
                Bengal Operations Research Row Dominance Case Studies
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
                  trap: 'Deleting the Dominant (Larger) Row Instead of the Dominated Row',
                  fix: 'Player A wants higher payoffs; always delete the row with SMALLER entries.',
                },
                {
                  trap: 'Claiming Dominance When One Cell Fails (e.g. 20 < 40 in one col)',
                  fix: 'Inequality a_ik ≥ a_jk must hold across EVERY single column without exception.',
                },
                {
                  trap: 'Confusing Row Dominance with Column Dominance',
                  fix: 'Rows delete smaller entries (Player A); columns delete LARGER entries (Player B).',
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
                  Think of row dominance like choosing an investment portfolio: if Portfolio A pays more interest than Portfolio B across every economic condition, why would you ever invest a single Rupee in Portfolio B?
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how eliminating a dominated row reduces matrix complexity without losing the game's true optimal value!
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
                'Mastered the mathematical condition: a_ik ≥ a_jk for all k',
                'Applied the elimination directive: Delete smaller Row j',
                'Performed pairwise row comparisons across all m rows',
                'Set optimal probability p_j* = 0 for eliminated rows',
                'Reported row payoffs and margins in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: Row dominance is Player A's pruning tool! Compare rows pairwise: if Row i ≥ Row j across every single column, delete Row j immediately. In our next topic (Topic 2), we will explore Player B's mirror counterpart: Column Dominance rules!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Row Dominance Rules FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Row Dominance Rules (Game Theory)"
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
