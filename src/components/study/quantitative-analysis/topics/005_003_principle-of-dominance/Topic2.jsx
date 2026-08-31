// src/components/study/quantitative-analysis/topics/005_003_principle-of-dominance/Topic2.jsx
// React 19 Function-based Component
// Module: 005_003_principle-of-dominance
// Topic 2: Column dominance rules

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

  // 3x3 Payoff Matrix State (in ₹ Thousands) - Default: Col 1 dominates Col 3
  const [matrix, setMatrix] = useState([
    [20, 35, 45],
    [30, 40, 55],
    [25, 30, 40],
  ]);

  const [eliminatedCols, setEliminatedCols] = useState([]);

  const updateCell = (r, c, val) => {
    const next = matrix.map((row, ri) =>
      row.map((cell, ci) => (ri === r && ci === c ? Number(val) : cell))
    );
    setMatrix(next);
    setEliminatedCols([]); // Reset elimination on edit
  };

  // Check pairwise column dominance
  const colDominancePairs = [];
  for (let r = 0; r < 3; r++) {
    for (let s = 0; s < 3; s++) {
      if (r !== s) {
        const isDom =
          matrix.every((row) => row[r] <= row[s]) &&
          matrix.some((row) => row[r] < row[s]);
        if (isDom) {
          colDominancePairs.push({ dominant: r, dominated: s });
        }
      }
    }
  }

  const toggleEliminateCol = (cIdx) => {
    if (eliminatedCols.includes(cIdx)) {
      setEliminatedCols(eliminatedCols.filter((c) => c !== cIdx));
    } else {
      setEliminatedCols([...eliminatedCols, cIdx]);
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
      title: '1. Foundry Supply Route Column Dominance (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Evaluated 2 raw material delivery options for Player B in Barrackpore: Col 1 = [₹20k, ₹30k] vs Col 2 = [₹40k, ₹50k]. Since Col 1 yielded strictly lower liabilities, Col 2 was eliminated immediately.',
      lesson: 'Column dominance prunes high-liability supplier logistics.',
    },
    {
      title: '2. Cold-Chain Warehousing Column Dominance (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Compared Dedicated Cold Hub (Col 1 = [₹25k, ₹35k]) against Emergency Backup Hub (Col 2 = [₹50k, ₹60k]) in Kolkata, deleting the expensive Col 2.',
      lesson: 'Player B maximizes cost savings by eliminating columns with higher payoffs.',
    },
    {
      title: '3. Supermarket FMCG Retail Column Dominance (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Analyzed competitor advertising reactions in Ichapur: Column B1 (Local Print) strictly dominated Column B3 (Mass TV blitz) in cost-efficiency, pruning Column B3.',
      lesson: 'Minimizing column liability protects corporate promotional budgets.',
    },
    {
      title: '4. Educational High-Tech Lab Licensing Column Dominance (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Compared Institutional Settlement (Col 1) against Expensive Arbitration (Col 2) in Jadavpur, proving that Col 1 capped payout liabilities by ₹25 Lakh across all scenarios.',
      lesson: 'Column dominance clarifies optimal legal defense strategies.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes colDomGlow {
          0%, 100% { border-color: rgba(56, 189, 248, 0.3); }
          50% { border-color: rgba(56, 189, 248, 0.8); }
        }
        .glow-col-dom {
          animation: colDomGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Segment 5 • Module 005_003 • Topic 2
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Column Dominance • Player B Minimization • Delete Larger Columns
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
            Column Dominance Rules
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive study of <span className="text-sky-400 font-semibold">Column Dominance Rules</span> for Player B (Column Minimizer): mathematical criteria (<span className="text-amber-400 font-mono">a_kr ≤ a_ks ∀ k</span>), pairwise comparison algorithms, deleting the LARGER column, and zero probability assignment in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'col-dom-criteria', label: '1. Column Dominance Criteria' },
              { id: 'interactive-inspector', label: '2. Pairwise Dominance Inspector' },
              { id: 'step-algorithm', label: '3. Pairwise Comparison Protocol' },
              { id: 'svg-gate', label: '4. Column Elimination Gate SVG' },
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

        {/* SECTION 1: Column Dominance Criteria */}
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
                Column Dominance Mathematical Criteria
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-bold">1. Inequality Condition</span>
                <p className="text-slate-300 text-xs">
                  Column r dominates Column s if a_kr ≤ a_ks for ALL rows k = 1, ..., m.
                </p>
                <span className="text-sky-400 font-mono text-[11px]">a_kr ≤ a_ks ∀ k</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-300 font-bold">2. Elimination Directive</span>
                <p className="text-slate-300 text-xs">
                  Player B is a Minimizer. <strong>Delete the LARGER column (Column s)</strong>!
                </p>
                <span className="text-amber-300 font-mono text-[11px]">Retain lower liability Column r.</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-bold">3. Zero Weight in Vector</span>
                <p className="text-slate-300 text-xs">
                  Eliminated Column s receives probability q_s* = 0 in the equilibrium mixed vector.
                </p>
                <span className="text-emerald-400 font-mono text-[11px]">q_s* = 0.0</span>
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
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-col-dom">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Pairwise Column Dominance Inspector
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Edit the matrix cells below (in ₹ Thousands). The system scans all pairwise column combinations and reveals which column dominates another:
            </p>

            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-center border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2 text-left">Player A \ Player B</th>
                    {[0, 1, 2].map((cIdx) => {
                      const isElim = eliminatedCols.includes(cIdx);
                      const isDominant = colDominancePairs.some((p) => p.dominant === cIdx);
                      const isDominated = colDominancePairs.some((p) => p.dominated === cIdx);
                      return (
                        <th
                          key={cIdx}
                          className={clsx(
                            'p-2',
                            isElim
                              ? 'line-through text-slate-600 bg-rose-950/20'
                              : isDominant
                              ? 'text-emerald-400 font-bold'
                              : isDominated
                              ? 'text-rose-400 font-bold'
                              : 'text-sky-400'
                          )}
                        >
                          B_{cIdx + 1} {isDominant ? '👑 (Dominant)' : isDominated ? '⚠️ (Dominated)' : ''}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {matrix.map((row, rIdx) => (
                    <tr key={rIdx}>
                      <td className="p-2 text-left font-bold text-rose-300">A_{rIdx + 1}</td>
                      {row.map((cell, cIdx) => {
                        const isElim = eliminatedCols.includes(cIdx);
                        const isDominant = colDominancePairs.some((p) => p.dominant === cIdx);
                        const isDominated = colDominancePairs.some((p) => p.dominated === cIdx);
                        return (
                          <td key={cIdx} className={clsx('p-2', isElim ? 'line-through text-slate-600 bg-rose-950/20' : '')}>
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
                        );
                      })}
                    </tr>
                  ))}
                  <tr className="border-t-2 border-slate-700 bg-slate-900/40">
                    <td className="p-2 text-left font-bold text-slate-400">Actions</td>
                    {[0, 1, 2].map((cIdx) => {
                      const isDominated = colDominancePairs.some((p) => p.dominated === cIdx);
                      const isElim = eliminatedCols.includes(cIdx);
                      return (
                        <td key={cIdx} className="p-2">
                          {isDominated ? (
                            <button
                              onClick={() => toggleEliminateCol(cIdx)}
                              className={clsx(
                                'px-2.5 py-1 rounded text-xs font-semibold border transition-all',
                                isElim
                                  ? 'bg-slate-800 text-slate-400 border-slate-700'
                                  : 'bg-rose-600 text-white border-rose-500 hover:bg-rose-500'
                              )}
                            >
                              {isElim ? 'Restore ↩️' : 'Eliminate ❌'}
                            </button>
                          ) : (
                            <span className="text-slate-500 text-xs">Active</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Dominance Detection Findings */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2 text-xs sm:text-sm font-mono">
              <span className="text-amber-400 font-sans font-bold">Pairwise Column Dominance Analysis:</span>
              {colDominancePairs.length > 0 ? (
                colDominancePairs.map((pair, idx) => (
                  <p key={idx} className="text-emerald-300">
                    ✅ <strong>Column B_{pair.dominant + 1}</strong> dominates <strong>Column B_{pair.dominated + 1}</strong> because all entries ({matrix.map((r) => `₹${r[pair.dominant]}k`).join(', ')}) ≤ ({matrix.map((r) => `₹${r[pair.dominated]}k`).join(', ')}). ➔ <em>Delete Column B_{pair.dominated + 1} (Larger Column)!</em>
                  </p>
                ))
              ) : (
                <p className="text-slate-400 font-sans">No strict column dominance detected between current columns.</p>
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
                Pairwise Column Comparison Protocol & Combinatorics
              </h2>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-3 text-xs sm:text-sm">
              <p className="text-slate-300 leading-relaxed">
                To test column dominance in an n-column matrix, perform <span className="text-cyan-300 font-bold font-mono">n(n − 1) / 2</span> pairwise comparisons:
              </p>
              <ul className="text-slate-300 space-y-1 list-disc list-inside">
                <li>For 3 columns: 3(2)/2 = <strong>3 comparisons</strong> (B₁ vs B₂, B₁ vs B₃, B₂ vs B₃).</li>
                <li>For 4 columns: 4(3)/2 = <strong>6 comparisons</strong>.</li>
                <li>For 5 columns: 5(4)/2 = <strong>10 comparisons</strong>.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 4: Column Elimination Gate SVG */}
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
                Column Dominance Gate Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 180"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Comparing Two Columns */}
                <rect x="50" y="35" width="220" height="110" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="160" y="60" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Pairwise Comparison</text>
                <text x="160" y="85" fill="#34d399" fontSize="9" textAnchor="middle">Col r = [20, 30, 25]ᵀ</text>
                <text x="160" y="105" fill="#f87171" fontSize="9" textAnchor="middle">Col s = [45, 55, 40]ᵀ</text>
                <text x="160" y="125" fill="#cbd5e1" fontSize="8" textAnchor="middle">Test: a_kr ≤ a_ks ∀ k</text>

                <line x1="270" y1="90" x2="380" y2="90" stroke="#f59e0b" strokeWidth="2" />
                <polygon points="380,90 370,85 370,95" fill="#f59e0b" />
                <text x="325" y="80" fill="#f59e0b" fontSize="9" textAnchor="middle">Dominance Gate</text>

                {/* Verdict & Pruning */}
                <rect x="380" y="35" width="310" height="110" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="535" y="60" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">Pruning Action (Player B Minimizer)</text>
                <text x="535" y="85" fill="#ffffff" fontSize="9" textAnchor="middle">👑 Retain Col r (Lower Liabilities)</text>
                <text x="535" y="105" fill="#fca5a5" fontSize="9" textAnchor="middle">❌ ELIMINATE Col s (Larger Column)</text>
                <text x="535" y="125" fill="#fde68a" fontSize="8" textAnchor="middle">Assign q_s* = 0 in Strategy Vector</text>
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
                Bengal Operations Research Column Dominance Case Studies
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
                  trap: 'Deleting the Smaller Column instead of the Larger Column',
                  fix: 'Player B is a Minimizer; always delete the column with LARGER entries (higher liabilities).',
                },
                {
                  trap: 'Claiming Column Dominance When One Row Fails (e.g. 45 > 35 in one row)',
                  fix: 'Inequality a_kr ≤ a_ks must hold down EVERY single row without exception.',
                },
                {
                  trap: 'Applying Row Dominance Rules to Columns',
                  fix: 'Row Player deletes SMALLER rows; Column Player deletes LARGER columns.',
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
                  Think of column dominance like shopping for raw materials: if Supplier B charges higher prices than Supplier A across every product specification, you will delete Supplier B from your vendor list!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how eliminating a dominated column immediately narrows down the possible moves Player B can consider, making the entire game easier to solve!
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
                'Mastered the mathematical condition: a_kr ≤ a_ks for all k',
                'Applied the elimination directive: Delete LARGER Column s',
                'Performed pairwise column comparisons across all n columns',
                'Set optimal probability q_s* = 0 for eliminated columns',
                'Reported column liabilities and game values in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: Column dominance is Player B's loss-capping pruning tool! Remember: Player B wants lower payouts, so whenever Column r ≤ Column s, eliminate the larger Column s immediately. In our next topic (Topic 3), we will explore the powerful Modified Dominance Rule using convex combinations of rows and columns!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Column Dominance Rules FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Column Dominance Rules (Game Theory)"
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
