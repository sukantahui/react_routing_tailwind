// src/components/study/quantitative-analysis/topics/005_003_principle-of-dominance/Topic3.jsx
// React 19 Function-based Component
// Module: 005_003_principle-of-dominance
// Topic 3: Modified dominance rule (convex combination)

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

  // Weight lambda for convex combination of Row 1 and Row 2
  const [lambda, setLambda] = useState(0.5);

  // Deadlocked 3x2 Matrix (₹ Thousands)
  const row1 = [40, 20];
  const row2 = [20, 40];
  const targetRow = [25, 25]; // Row 3

  // Synthetic Convex Row = lambda * row1 + (1 - lambda) * row2
  const syntheticCol1 = lambda * row1[0] + (1 - lambda) * row2[0];
  const syntheticCol2 = lambda * row1[1] + (1 - lambda) * row2[1];

  const dominatesTarget =
    syntheticCol1 >= targetRow[0] &&
    syntheticCol2 >= targetRow[1] &&
    (syntheticCol1 > targetRow[0] || syntheticCol2 > targetRow[1]);

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
      title: '1. Foundry Alloy Blending Modified Dominance (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Had 3 casting schedules in Barrackpore. Pure dominance failed. A 50-50 average of Schedule 1 [₹40k, ₹20k] and Schedule 2 [₹20k, ₹40k] yielded [₹30k, ₹30k], strictly dominating Schedule 3 [₹25k, ₹25k] and breaking the operational deadlock.',
      lesson: 'Modified dominance breaks deadlocks when pure dominance fails.',
    },
    {
      title: '2. Cold-Chain Vaccine Hybrid Transport Dominance (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Averaged Reefer Truck (Col 1) and Air Courier (Col 2) in Kolkata to synthesize a hybrid route [₹30k, ₹30k] that dominated Expensive Multi-Modal Transport (Col 3 = [₹35k, ₹35k]).',
      lesson: 'Convex combination dominance eliminates redundant logistical options.',
    },
    {
      title: '3. Supermarket FMCG Retail Modified Dominance (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Eliminated a stagnant loyalty scheme (Strategy A3) in Ichapur by proving that an equal blend of Strategy A1 (Bundle Discount) and Strategy A2 (Weekend Flash) dominated A3 by ₹5,000.',
      lesson: 'Blended promotional strategies expose and eliminate underperforming campaigns.',
    },
    {
      title: '4. Educational High-Tech Lab Patent Modified Dominance (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Used convex combination dominance in Jadavpur to prove that a 60-40 blend of two standard licensing terms strictly dominated an aggressive arbitration clause.',
      lesson: 'Convex dominance provides mathematical justification for hybrid legal settlements.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes modDomGlow {
          0%, 100% { border-color: rgba(168, 85, 247, 0.3); }
          50% { border-color: rgba(168, 85, 247, 0.8); }
        }
        .glow-mod-dom {
          animation: modDomGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-purple-950/80 text-purple-400 border border-purple-800/60">
              Segment 5 • Module 005_003 • Topic 3
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-purple-950/80 text-purple-400 border border-purple-800/60">
              Modified Dominance • Convex Combination • Deadlock Breaker
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Modified Dominance Rule
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive study of the <span className="text-purple-400 font-semibold">Modified Dominance Rule (Convex Combination)</span>: resolving deadlocks when pure dominance fails, synthesizing weighted average strategies (<span className="text-amber-400 font-mono">λ R₁ + (1−λ) R₂ ≥ R₃</span>), and pruning inferior choices in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'mod-theory', label: '1. Modified Dominance Concept' },
              { id: 'interactive-convex', label: '2. Convex Combination Studio' },
              { id: 'deadlock-breaker', label: '3. Deadlock Breaking Mechanics' },
              { id: 'svg-synthesis', label: '4. Convex Synthesis Architecture SVG' },
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

        {/* SECTION 1: Modified Dominance Concept */}
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
                Modified Dominance Principles & Convex Formulation
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-rose-400 font-bold">1. Deadlock Challenge</span>
                <p className="text-slate-300 text-xs">
                  Occurs when no single pure row dominates another row, stalling standard reduction.
                </p>
                <span className="text-rose-400 font-mono text-[11px]">Pure dominance fails</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-purple-400 font-bold">2. Convex Combination</span>
                <p className="text-slate-300 text-xs">
                  Construct a synthetic strategy: λ R₁ + (1−λ) R₂ (with 0 ≤ λ ≤ 1).
                </p>
                <span className="text-purple-400 font-mono text-[11px]">Weighted average strategy</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-bold">3. Elimination Power</span>
                <p className="text-slate-300 text-xs">
                  If synthetic row ≥ Row 3 across all columns, Row 3 is eliminated!
                </p>
                <span className="text-emerald-400 font-mono text-[11px]">Prunes inferior rows</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Convex Combination Studio */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-mod-dom">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-600/20 text-purple-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Convex Combination Dominance Studio
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              In this matrix, neither Row A₁ [40, 20] nor Row A₂ [20, 40] dominates Row A₃ [25, 25] individually. Adjust the slider to synthesize a convex combination of A₁ and A₂:
            </p>

            {/* Slider Controls */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-purple-400 font-bold">Convex Weight λ = {lambda.toFixed(2)} (Row A₁)</span>
                <span className="text-sky-400 font-bold">Weight (1 − λ) = {(1 - lambda).toFixed(2)} (Row A₂)</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={lambda}
                onChange={(e) => setLambda(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
            </div>

            {/* Matrix Table with Synthetic Row */}
            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3 font-mono text-xs sm:text-sm">
              <table className="w-full text-center border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2 text-left">Strategy Description</th>
                    <th className="p-2 text-sky-400">B₁</th>
                    <th className="p-2 text-sky-400">B₂</th>
                    <th className="p-2 text-amber-400">Dominance Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-200">
                  <tr>
                    <td className="p-2 text-left font-bold text-rose-300">A₁ (Pure Strategy 1)</td>
                    <td className="p-2 font-bold">₹{row1[0]}k</td>
                    <td className="p-2 font-bold">₹{row1[1]}k</td>
                    <td className="p-2 text-slate-400">Pure Strategy</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-left font-bold text-rose-300">A₂ (Pure Strategy 2)</td>
                    <td className="p-2 font-bold">₹{row2[0]}k</td>
                    <td className="p-2 font-bold">₹{row2[1]}k</td>
                    <td className="p-2 text-slate-400">Pure Strategy</td>
                  </tr>
                  <tr className="bg-purple-950/30 border-y-2 border-purple-500/50">
                    <td className="p-2 text-left font-bold text-purple-300">
                      Synthetic Row: {lambda.toFixed(2)} A₁ + {(1 - lambda).toFixed(2)} A₂
                    </td>
                    <td className="p-2 font-bold text-purple-300">₹{syntheticCol1.toFixed(1)}k</td>
                    <td className="p-2 font-bold text-purple-300">₹{syntheticCol2.toFixed(1)}k</td>
                    <td className="p-2 text-purple-400 font-bold">Convex Combination</td>
                  </tr>
                  <tr className={clsx(dominatesTarget ? 'line-through text-rose-400 bg-rose-950/20' : '')}>
                    <td className="p-2 text-left font-bold text-rose-400">
                      A₃ (Target Row) {dominatesTarget ? '❌ (DOMINATED)' : ''}
                    </td>
                    <td className="p-2">₹{targetRow[0]}k</td>
                    <td className="p-2">₹{targetRow[1]}k</td>
                    <td className={clsx('p-2 font-bold', dominatesTarget ? 'text-rose-400' : 'text-slate-400')}>
                      {dominatesTarget ? 'Eliminated by Convex Row!' : 'Not Dominated'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Analysis Findings */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2 text-xs sm:text-sm font-mono">
              <span className="text-amber-400 font-sans font-bold">Convex Analysis Verdict:</span>
              <p className={clsx('font-bold', dominatesTarget ? 'text-emerald-300' : 'text-amber-300')}>
                {dominatesTarget
                  ? `✅ At λ = ${lambda.toFixed(2)}, Synthetic Row [₹${syntheticCol1.toFixed(1)}k, ₹${syntheticCol2.toFixed(1)}k] strictly exceeds Row A₃ [₹25k, ₹25k] across ALL columns! Row A₃ is safely ELIMINATED!`
                  : `⚠️ At λ = ${lambda.toFixed(2)}, Synthetic Row does NOT exceed Row A₃ across both columns. Move slider closer to 0.50!`}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: Deadlock Breaking Mechanics */}
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
                Modified Column Dominance Formula
              </h2>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2 text-xs sm:text-sm font-mono">
              <span className="text-sky-400 font-sans font-bold">Column Player (Minimizer) Modified Dominance:</span>
              <p className="text-slate-300 text-xs">
                If a weighted average of two columns satisfies:
              </p>
              <div className="p-3 bg-slate-900 rounded-lg text-center text-sky-300 font-bold">
                μ · Col₁ + (1 − μ) · Col₂ ≤ Col_target &nbsp; ∀ rows
              </div>
              <p className="text-slate-300 text-xs">
                Then <strong>Col_target</strong> imposes higher liabilities than the convex blend and is <strong>ELIMINATED</strong>!
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Convex Synthesis Architecture SVG */}
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
                Convex Combination Synthesis Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 180"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Inputs */}
                <rect x="30" y="30" width="180" height="50" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <text x="120" y="55" fill="#f43f5e" fontSize="10" fontWeight="bold" textAnchor="middle">Row A₁: [40, 20] (λ = 0.5)</text>

                <rect x="30" y="100" width="180" height="50" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="120" y="125" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">Row A₂: [20, 40] (1−λ = 0.5)</text>

                {/* Synthesis Hub */}
                <circle cx="320" cy="90" r="30" fill="#4c1d95" stroke="#a855f7" strokeWidth="2" />
                <text x="320" y="93" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Blend 0.5</text>

                <line x1="210" y1="55" x2="295" y2="75" stroke="#a855f7" strokeWidth="2" />
                <line x1="210" y1="125" x2="295" y2="105" stroke="#a855f7" strokeWidth="2" />

                <line x1="350" y1="90" x2="430" y2="90" stroke="#34d399" strokeWidth="2" />
                <polygon points="430,90 420,85 420,95" fill="#34d399" />

                {/* Synthetic Row vs Target */}
                <rect x="430" y="35" width="280" height="110" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="570" y="60" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">Convex Dominance Comparator</text>
                <text x="570" y="85" fill="#ffffff" fontSize="9" textAnchor="middle">Synthetic Row = [30, 30]</text>
                <text x="570" y="105" fill="#fca5a5" fontSize="9" textAnchor="middle">Target Row A₃ = [25, 25]  ➔  [30, 30] &gt; [25, 25]</text>
                <text x="570" y="125" fill="#fde68a" fontSize="8" textAnchor="middle">✅ Target Row A₃ ELIMINATED!</text>
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
                Bengal Operations Research Modified Dominance Case Studies
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
                  trap: 'Giving Up when Pure Dominance Fails (Missing Convex Combinations)',
                  fix: 'When pure dominance fails, ALWAYS test the 50-50 simple average of pairs of rows or columns.',
                },
                {
                  trap: 'Using Weights that Do Not Sum to 1.0 (e.g. λ = 0.6 and (1−λ) = 0.6)',
                  fix: 'Weights must satisfy λ₁ + λ₂ = 1 and λ_i ≥ 0 for a valid convex combination.',
                },
                {
                  trap: 'Applying Row Convex Rules to Columns (Direction Confusion)',
                  fix: 'For columns, the synthetic average must be LESS THAN OR EQUAL TO the target column to eliminate it.',
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
                  Think of modified dominance like a diversified stock portfolio: mixing 50% of Stock A and 50% of Stock B beats a mediocre Stock C in every market scenario!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how the 50-50 average is almost always the key that unlocks deadlocked matrices in examination questions!
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
                'Understood why modified dominance is needed when pure dominance stalls',
                'Computed the convex combination of two rows: λ R₁ + (1−λ) R₂',
                'Computed the convex combination of two columns: μ C₁ + (1−μ) C₂',
                'Applied the 50-50 arithmetic mean test to break matrix reduction deadlocks',
                'Reported convex payoffs and game values in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: The Modified Dominance Rule is your secret deadlock breaker! When pure row and column comparisons stall, never give up: take the 50-50 average of two rows (or two columns) and compare it against the remaining rows (or columns). In our next topic (Topic 4), we will formalize full matrix size reduction!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Modified Dominance Rule FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Modified Dominance Rule (Game Theory)"
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
