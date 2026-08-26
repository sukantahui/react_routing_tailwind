// src/components/study/quantitative-analysis/topics/002_005_test-of-optimality-by-modi-method/Topic8.jsx
// React 19 Function-based Component
// Module: 002_005_test-of-optimality-by-modi-method
// Topic 8: Improving the transportation solution

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic8_files/topic8_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic8_files/topic8_note.txt?raw';

const Topic8 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [viewState, setViewState] = useState('after'); // 'before', 'after', 'delta'

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

  // Data for Before vs After comparison
  const tableauData = {
    before: {
      title: 'Tableau 0 (Pre-Improvement / Initial NWCR Plan)',
      cost: '₹2,740',
      status: 'Sub-Optimal (Opportunity Cost d₂₁ = -₹8)',
      badgeColor: 'bg-rose-950 text-rose-300 border-rose-800',
      allocations: [
        [ { qty: 60, cost: 8, isBasic: true }, { qty: 10, cost: 14, isBasic: true }, { qty: 0, cost: 12, isBasic: false, d: '+₹7' } ],
        [ { qty: 0, cost: 5, isBasic: false, d: '-₹8 (ENTER ⭐)' }, { qty: 70, cost: 19, isBasic: true }, { qty: 20, cost: 10, isBasic: true } ],
        [ { qty: 0, cost: 11, isBasic: false, d: '+₹1' }, { qty: 0, cost: 13, isBasic: false, d: '-₹3' }, { qty: 60, cost: 7, isBasic: true } ],
      ],
      breakdown: '(60×8) + (10×14) + (70×19) + (20×10) + (60×7) = 480 + 140 + 1330 + 200 + 420 = ₹2,740',
    },
    after: {
      title: 'Tableau 1 (Post-Improvement / Iteration 1 Plan)',
      cost: '₹2,260',
      status: 'Improved Plan (₹480 Saved, 17.52% Cost Reduction)',
      badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-800',
      allocations: [
        [ { qty: 0, cost: 8, isBasic: false, d: 'Dropped' }, { qty: 70, cost: 14, isBasic: true }, { qty: 0, cost: 12, isBasic: false } ],
        [ { qty: 60, cost: 5, isBasic: true, isNew: true }, { qty: 10, cost: 19, isBasic: true }, { qty: 20, cost: 10, isBasic: true } ],
        [ { qty: 0, cost: 11, isBasic: false }, { qty: 0, cost: 13, isBasic: false }, { qty: 60, cost: 7, isBasic: true } ],
      ],
      breakdown: '(70×14) + (60×5) + (10×19) + (20×10) + (60×7) = 980 + 300 + 190 + 200 + 420 = ₹2,260',
    },
  };

  const currentTableau = tableauData[viewState === 'delta' ? 'after' : viewState];

  // Case Studies
  const caseStudies = [
    {
      title: '1. Foundry Step 1 Freight Reduction (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Transitioned from Tableau 0 (₹2,740) to Tableau 1 (₹2,260) in Barrackpore. Replaced 60 tons of ₹8 freight with ₹5 direct shipping, locking in a ₹480 saving in 1 step.',
      lesson: 'Pivoting along the steepest gradient delivers maximum immediate cost reduction.',
    },
    {
      title: '2. Cold-Chain Vaccine Multi-Iteration Transition (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Executed Iteration 1 (saving ₹120) and Iteration 2 (saving ₹60) in Kolkata, systematically reducing emergency hospital logistics expenditure from ₹2,370 to ₹2,190.',
      lesson: 'Sequential improvement iterations steadily converge toward minimal spend.',
    },
    {
      title: '3. Supermarket FMCG Basis Invariant Verification (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Audited post-pivot invariants on the improved tableau: verified 100% row/column conservation and confirmed exactly m+n-1 = 5 basic cells.',
      lesson: 'Auditing invariants prevents accidental basis corruption between iterations.',
    },
    {
      title: '4. Educational Press Contract Savings Audit (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Documented a verified ₹1,200 freight saving across 2 MODI iterations for the state university textbook publishing board.',
      lesson: 'Clear iteration audit trails provide irrefutable fiduciary proof to executive stakeholders.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes improveGlow {
          0%, 100% { border-color: rgba(16, 185, 129, 0.3); }
          50% { border-color: rgba(16, 185, 129, 0.8); }
        }
        .glow-improve {
          animation: improveGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
              Module 002_005 • Topic 8
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
              Basis Evolution & Iteration Updates
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Improving the Transportation Solution
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            Transitioning between iterations in the MODI method: constructing the <span className="text-emerald-400 font-semibold">Improved Tableau (Tₖ₊₁)</span>, verifying the <span className="text-cyan-400 font-semibold">Three Post-Pivot Invariants</span>, quantifying cost reduction (<span className="text-amber-400 font-mono">Zₖ₊₁ = Zₖ - θ · |d_enter|</span>), and preparing for the next audit.
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'lifecycle', label: '1. Improvement Lifecycle' },
              { id: 'interactive-comparator', label: '2. Before vs. After Comparator' },
              { id: 'three-invariants', label: '3. Three Post-Pivot Invariants' },
              { id: 'svg-transition', label: '4. Basis Transition SVG' },
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
              &gt;
                {item.label}
              </button>
            ))}
          </div>
        </header>

        {/* SECTION 1: Improvement Lifecycle */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                01
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                The Iteration Transition Lifecycle
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              When a sub-optimal tableau is pivoted, one variable enters (+θ), one variable leaves (drops to 0), and total cost strictly decreases:
            </p>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-2">
              <span className="text-emerald-300 font-bold text-sm">Total Cost Reduction Formula</span>
              <div className="p-3 bg-slate-900 rounded font-mono text-emerald-300 text-sm sm:text-base">
                Z_{`k+1`} = Z_k - (θ · |d_enter|)
              </div>
              <p className="text-xs text-slate-400">
                Monotonic descent guarantees <span className="font-mono text-white">Z_{`k+1`} &lt; Z_k</span> at every non-degenerate iteration until all opportunity costs satisfy <span className="font-mono text-emerald-400">dᵢⱼ ≥ 0</span>.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Interactive Before vs After Comparator */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-improve">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                  02
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Interactive Before-vs-After Improvement Comparator
                </h2>
              </div>
              <div className="flex items-center gap-1.5">
                {[
                  { id: 'before', label: '1. Tableau 0 (Pre-Pivot Z = ₹2,740)' },
                  { id: 'after', label: '2. Tableau 1 (Post-Pivot Z = ₹2,260)' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setViewState(item.id)}
                    className={clsx(
                      'px-3 py-1 rounded text-xs font-semibold transition-all border',
                      viewState === item.id
                        ? 'bg-emerald-600 text-white border-emerald-400 shadow-md'
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                    )}
                  &gt;
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-white">{currentTableau.title}</h3>
                <span className="text-xs text-slate-400 font-mono">{currentTableau.status}</span>
              </div>
              <span className={clsx('px-3 py-1 rounded-full text-xs font-mono font-bold border', currentTableau.badgeColor)}>
                Total Cost: {currentTableau.cost}
              </span>
            </div>

            {/* Tableau */}
            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-center border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2 text-left font-semibold text-slate-300">Origins \ Dests</th>
                    <th className="p-2 font-semibold text-cyan-300">Jadavpur (D1)</th>
                    <th className="p-2 font-semibold text-cyan-300">Salt Lake (D2)</th>
                    <th className="p-2 font-semibold text-cyan-300">Howrah (D3)</th>
                    <th className="p-2 font-semibold text-amber-300">Supply</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Barrackpore (S1)', s: 70 },
                    { name: 'Ichapur (S2)', s: 90 },
                    { name: 'Kolkata (S3)', s: 60 },
                  ].map((row, rIdx) => (
                    <tr key={rIdx} className="border-b border-slate-800/60">
                      <td className="p-2.5 text-left font-medium text-slate-200">{row.name}</td>
                      {currentTableau.allocations[rIdx].map((cell, cIdx) => (
                        <td key={cIdx} className="p-2">
                          <div
                            className={clsx(
                              'p-2 rounded-lg font-mono font-bold transition-all border flex flex-col items-center justify-center',
                              cell.isNew
                                ? 'bg-amber-950/80 text-amber-300 border-amber-500 shadow-md scale-105 animate-pulse'
                                : cell.isBasic
                                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-600'
                                : cell.d && cell.d.includes('-')
                                ? 'bg-rose-950 text-rose-300 border-rose-500'
                                : 'bg-slate-900 text-slate-500 border-slate-800'
                            )}
                          >
                            {cell.isBasic && (
                              <span className="text-[10px] font-extrabold bg-slate-950 text-amber-300 px-1.5 py-0.5 rounded mb-1">
                                x = {cell.qty} tons {cell.isNew ? '(NEW ⭐)' : ''}
                              </span>
                            )}
                            {cell.d && (
                              <span className="text-[10px] font-extrabold bg-slate-950 text-rose-300 px-1.5 py-0.5 rounded mb-1 border border-rose-800">
                                d = {cell.d}
                              </span>
                            )}
                            <span>₹{cell.cost}</span>
                          </div>
                        </td>
                      ))}
                      <td className="p-2 font-mono font-bold text-amber-300">{row.s}</td>
                    </tr>
                  ))}
                  <tr className="bg-slate-900/40 text-slate-300 font-mono">
                    <td className="p-2.5 text-left font-semibold text-amber-300">Demand</td>
                    <td className="p-2 font-bold text-amber-300">60</td>
                    <td className="p-2 font-bold text-amber-300">80</td>
                    <td className="p-2 font-bold text-amber-300">80</td>
                    <td className="p-2 font-bold text-white">∑ 220</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Arithmetic Breakdown Callout */}
            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1 text-xs sm:text-sm">
              <span className="text-emerald-300 font-semibold">Direct Cost Arithmetic Breakdown:</span>
              <p className="font-mono text-slate-200">{currentTableau.breakdown}</p>
            </div>
          </div>
        </section>

        {/* SECTION 3: Three Post-Pivot Invariants */}
        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          data-index="2"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-600/20 text-cyan-400 font-bold text-sm">
                03
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                The Three Post-Pivot Invariants
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-emerald-300 font-bold">1. Primal Feasibility</span>
                <p className="text-slate-300">Every row sum exactly matches supply Sᵢ, and every column sum matches demand Dⱼ with all xᵢⱼ ≥ 0.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-bold">2. Basis Count = m + n - 1</span>
                <p className="text-slate-300">Exactly 5 basic cells exist in a 3x3 matrix (1 variable entered, 1 variable left).</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-purple-300 font-bold">3. Spanning Acyclicity</span>
                <p className="text-slate-300">Basic cells form an acyclic connected tree, enabling fresh u-v potential calculations for the next pass.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Basis Transition SVG */}
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
                Basis Polytope Transition Lifecycle
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 240"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Tableau 0 Node */}
                <rect x="50" y="70" width="220" height="100" rx="10" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <text x="160" y="100" fill="#f43f5e" fontSize="13" fontWeight="bold" textAnchor="middle">Tableau 0 (Basis 0)</text>
                <text x="160" y="125" fill="#cbd5e1" fontSize="11" textAnchor="middle">Initial Cost Z = ₹2,740</text>
                <text x="160" y="150" fill="#fda4af" fontSize="10" fontFamily="monospace" textAnchor="middle">Cell (2,1) enters (d = −₹8)</text>

                {/* Transition Arrow */}
                <line x1="270" y1="120" x2="460" y2="120" stroke="#f59e0b" strokeWidth="3" />
                <polygon points="460,120 450,114 450,126" fill="#f59e0b" />
                <text x="365" y="105" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">θ = 60 tons pivot</text>
                <text x="365" y="140" fill="#a7f3d0" fontSize="10" textAnchor="middle">Saves ₹480</text>

                {/* Tableau 1 Node */}
                <rect x="470" y="70" width="220" height="100" rx="10" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                <text x="580" y="100" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">Tableau 1 (Basis 1)</text>
                <text x="580" y="125" fill="#ffffff" fontSize="12" fontFamily="monospace" fontWeight="bold" textAnchor="middle">Improved Z = ₹2,260</text>
                <text x="580" y="150" fill="#a7f3d0" fontSize="10" textAnchor="middle">Ready for Iteration 2 Audit</text>
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 5: Real-World Bengal Case Studies */}
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
                Bengal Logistics Solution Improvement Case Studies
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
                  trap: 'Reusing Old Potentials (u and v) on the New Tableau',
                  fix: 'The basis has changed! You MUST compute a completely new set of row potentials u_i\' and column potentials v_j\' for Tableau II.',
                },
                {
                  trap: 'Forgetting to Audit Row and Column Sums Post-Pivot',
                  fix: 'Always check that the new allocations sum to exact supplies S_i and demands D_j before calculating new potentials.',
                },
                {
                  trap: 'Overwriting Numbers Directly on the Old Tableau',
                  fix: 'Draw a clean, separate tableau for Tableau II; crossing out numbers on Tableau I leads to severe exam grading penalties.',
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
                  Think about why calculating the direct cost sum on Tableau II is so satisfying: it immediately proves that your ₹480 theoretical savings matches the physical shipment invoice down to the single rupee!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully that the leaving cell (1, 1) has now become an empty non-basic cell and will be evaluated for its opportunity cost in the next iteration.
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
                Student Revision Checklist (Topic 8)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Constructed clean Tableau II with updated allocations',
                'Audited row sums == S_i and column sums == D_j',
                'Verified exactly m + n - 1 basic cells in the new basis',
                'Calculated new total cost Z_1 and verified Delta Z = θ × |d_enter|',
                'Computed fresh u_i\' and v_j\' potentials on the new basic cells',
                'Evaluated new opportunity costs d_ij\' for the Iteration 2 audit',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: congratulations on completing your first full MODI iteration! You took an initial NWCR plan costing ₹2,740 and systematically pivoted it down to ₹2,260, saving ₹480 in a single step! Draw your Tableau II with pride. Check your row and column sums, solve your brand-new u' and v' potentials on the new basic cells, and check your new opportunity costs. You are on the expressway to the certified global minimum!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Improving the Transportation Solution FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Improving the Transportation Solution (MODI Method)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic9_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic8;
