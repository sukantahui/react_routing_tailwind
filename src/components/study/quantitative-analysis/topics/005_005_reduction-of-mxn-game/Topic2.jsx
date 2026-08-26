// src/components/study/quantitative-analysis/topics/005_005_reduction-of-mxn-game/Topic2.jsx
// React 19 Function-based Component
// Module: 005_005_reduction-of-mxn-game
// Topic 2: Use of dominance for reduction

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
  const [domType, setDomType] = useState('convex'); // 'strict' | 'weak' | 'convex'
  const [lambda, setLambda] = useState(0.5);

  // 3x3 Matrix for testing Convex Dominance (in ₹ Thousands)
  const matrix3x3 = [
    [40, 10, 30], // R1
    [10, 50, 30], // R2
    [20, 25, 25], // R3 (Target to be dominated by lambda R1 + (1-lambda) R2)
  ];

  // Synthetic blended row: lambda * R1 + (1 - lambda) * R2
  const blendedRow = [
    lambda * matrix3x3[0][0] + (1 - lambda) * matrix3x3[1][0],
    lambda * matrix3x3[0][1] + (1 - lambda) * matrix3x3[1][1],
    lambda * matrix3x3[0][2] + (1 - lambda) * matrix3x3[1][2],
  ];

  const dominatesR3 =
    blendedRow[0] &ge; matrix3x3[2][0] &&
    blendedRow[1] >= matrix3x3[2][1] &&
    blendedRow[2] >= matrix3x3[2][2];

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
      title: '1. Foundry Convex Shift Reduction (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Evaluated a deadlocked 3x3 casting matrix in Barrackpore. Taking the 50-50 average of Row 1 [₹40k, ₹10k, ₹30k] and Row 2 [₹10k, ₹50k, ₹30k] yielded [₹25k, ₹30k, ₹30k], dominating Row 3 [₹20k, ₹25k, ₹25k] and unlocking the 2x2 solution.',
      lesson: 'Convex blends break deadlocks when pure dominance fails.',
    },
    {
      title: '2. Cold-Chain Logistics Weak Dominance Pruning (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Pruned weakly dominated transport options in a 4x3 logistics grid in Kolkata, reducing operational complexity without altering the guaranteed ₹24,000 baseline.',
      lesson: 'Weak dominance prunes redundant routes safely.',
    },
    {
      title: '3. Supermarket FMCG Retail Promotional Convex Pruning (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Used a 60-40 convex blend of weekend promotions in Ichapur to eliminate a mediocre mid-week discount flyer, concentrating marketing spend on the highest ROI campaigns.',
      lesson: 'Convex dominance isolates optimal mixed marketing portfolios.',
    },
    {
      title: '4. Educational High-Tech Lab Patent Arbitration (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Used strict dominance in Jadavpur to eliminate 2 unviable legal claims, focusing arbitration talks on the 2 core patent categories to secure ₹22 Lakh.',
      lesson: 'Strict dominance accelerates high-stakes legal negotiations.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes domUseGlow {
          0%, 100% { border-color: rgba(245, 158, 11, 0.3); }
          50% { border-color: rgba(245, 158, 11, 0.8); }
        }
        .glow-dom-use {
          animation: domUseGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-amber-950/80 text-amber-400 border border-amber-800/60">
              Segment 5 • Module 005_005 • Topic 2
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-amber-950/80 text-amber-400 border border-amber-800/60">
              Dominance Applications • Strict vs Weak • Convex Blends in ₹
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Use of Dominance for Reduction
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive study of <span className="text-amber-400 font-semibold">Dominance Principles in Matrix Reduction</span>: distinguishing between <span className="text-rose-400 font-semibold">Strict Dominance</span>, <span className="text-sky-400 font-semibold">Weak Dominance</span>, and synthetic <span className="text-emerald-400 font-semibold">Convex Combinations (Modified Dominance)</span> in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'dominance-taxonomy', label: '1. Dominance Taxonomy' },
              { id: 'interactive-inspector', label: '2. Convex Combination Studio' },
              { id: 'deadlock-resolution', label: '3. Deadlock Resolution' },
              { id: 'svg-hierarchy', label: '4. Dominance Hierarchy SVG' },
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
                    ? 'bg-amber-600 text-white border-amber-500 shadow-md shadow-amber-900/40'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
                )}
              &gt;
                {item.label}
              </button>
            ))}
          </div>
        </header>

        {/* SECTION 1: Dominance Taxonomy */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 font-bold text-sm">
                01
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                The 3-Tier Dominance Reduction Taxonomy
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-rose-400 font-sans font-bold">1. Strict Dominance</span>
                <p className="text-slate-300 text-xs">Row: a_ik &gt; a_jk ∀ k; Col: a_kr &lt; a_ks ∀ k.</p>
                <span className="text-rose-400 text-[11px]">Strict inequality in ALL cells</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-sans font-bold">2. Weak Dominance</span>
                <p className="text-slate-300 text-xs">Row: a_ik ≥ a_jk ∀ k; Col: a_kr ≤ a_ks ∀ k.</p>
                <span className="text-sky-400 text-[11px]">Equalities allowed; v* invariant</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-sans font-bold">3. Convex Combinations</span>
                <p className="text-slate-300 text-xs">λ R₁ + (1−λ) R₂ ≥ R₃ (Modified dominance).</p>
                <span className="text-emerald-400 text-[11px]">Breaks pure dominance deadlocks</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Convex Combination Studio */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-dom-use">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Convex Combination Blender Studio
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Adjust the weight <span className="text-amber-400 font-mono font-bold">λ</span> to synthesize a blended strategy from Row 1 and Row 2. Observe whether the synthetic row dominates Row 3:
            </p>

            {/* Matrix View */}
            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3 font-mono text-xs sm:text-sm">
              <table className="w-full text-center border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2 text-left">Strategy</th>
                    <th className="p-2 text-sky-400">B₁</th>
                    <th className="p-2 text-sky-400">B₂</th>
                    <th className="p-2 text-sky-400">B₃</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-200">
                  <tr>
                    <td className="p-2 text-left font-bold text-rose-300">R₁ (Weight λ = {lambda.toFixed(2)})</td>
                    <td className="p-2">₹{matrix3x3[0][0]}k</td>
                    <td className="p-2">₹{matrix3x3[0][1]}k</td>
                    <td className="p-2">₹{matrix3x3[0][2]}k</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-left font-bold text-rose-300">R₂ (Weight 1−λ = {(1 - lambda).toFixed(2)})</td>
                    <td className="p-2">₹{matrix3x3[1][0]}k</td>
                    <td className="p-2">₹{matrix3x3[1][1]}k</td>
                    <td className="p-2">₹{matrix3x3[1][2]}k</td>
                  </tr>
                  <tr className="bg-amber-950/20 border-t-2 border-amber-600/40">
                    <td className="p-2 text-left font-bold text-amber-300">Synthetic Blend λR₁ + (1−λ)R₂</td>
                    <td className="p-2 font-bold text-amber-300">₹{blendedRow[0].toFixed(1)}k</td>
                    <td className="p-2 font-bold text-amber-300">₹{blendedRow[1].toFixed(1)}k</td>
                    <td className="p-2 font-bold text-amber-300">₹{blendedRow[2].toFixed(1)}k</td>
                  </tr>
                  <tr className={clsx(dominatesR3 ? 'line-through text-slate-500 bg-rose-950/20' : 'bg-slate-900/40')}>
                    <td className="p-2 text-left font-bold text-rose-400">
                      R₃ (Target) {dominatesR3 ? '(Dominated & Pruned!)' : '(Not Dominated)'}
                    </td>
                    <td className="p-2 font-bold">₹{matrix3x3[2][0]}k</td>
                    <td className="p-2 font-bold">₹{matrix3x3[2][1]}k</td>
                    <td className="p-2 font-bold">₹{matrix3x3[2][2]}k</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Slider */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2 font-mono text-xs">
              <div className="flex justify-between items-center text-amber-400 font-bold">
                <span>Row 1 Weight: λ = {lambda.toFixed(2)}</span>
                <span>Row 2 Weight: 1 − λ = {(1 - lambda).toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={lambda}
                onChange={(e) => setLambda(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              /&gt;
            </div>

            {/* Status Banner */}
            <div
              className={clsx(
                'p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs sm:text-sm',
                dominatesR3
                  ? 'bg-emerald-950/40 border-emerald-600 text-emerald-300'
                  : 'bg-rose-950/40 border-rose-600 text-rose-300'
              )}
            >
              <div>
                <span className="font-bold block">
                  {dominatesR3
                    ? '🎯 Convex Dominance Achieved!'
                    : '❌ Dominance Condition Not Satisfied'}
                </span>
                <span className="font-mono text-xs">
                  {dominatesR3
                    ? `[${blendedRow[0].toFixed(1)}, ${blendedRow[1].toFixed(1)}, ${blendedRow[2].toFixed(1)}] ≥ [20, 25, 25] in all 3 columns!`
                    : 'Synthetic blend must be greater than or equal to Row 3 in every column.'}
                </span>
              </div>
              <div className="font-mono font-bold">
                {dominatesR3 ? 'Row 3 Pruned ➔ Matrix becomes 2×3!' : 'Adjust λ Slider'}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Deadlock Resolution */}
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
                Deadlock Resolution Protocol
              </h2>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-3 text-xs sm:text-sm">
              <p className="text-slate-300 leading-relaxed">
                When pure pairwise comparisons fail on a <span className="text-indigo-400 font-mono font-bold">3 × 3</span> matrix:
              </p>
              <div className="p-3 bg-slate-900 rounded-lg font-mono text-xs text-amber-300 flex flex-col space-y-1">
                <span>1. Test 50-50 row average: (R₁ + R₂)/2 ≥ R₃</span>
                <span>2. Test 50-50 col average: (C₁ + C₂)/2 ≤ C₃</span>
                <span>3. If average works, eliminate the dominated row/column and proceed to 2×2!</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Dominance Hierarchy SVG */}
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
                Dominance Rule Hierarchy
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 180"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Strict */}
                <rect x="30" y="45" width="200" height="90" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <text x="130" y="70" fill="#f43f5e" fontSize="11" fontWeight="bold" textAnchor="middle">1. Strict Dominance</text>
                <text x="130" y="90" fill="#cbd5e1" fontSize="9" textAnchor="middle">a_ik &gt; a_jk (Rows)</text>
                <text x="130" y="110" fill="#cbd5e1" fontSize="9" textAnchor="middle">a_kr &lt; a_ks (Cols)</text>

                <line x1="230" y1="90" x2="270" y2="90" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="270,90 260,85 260,95" fill="#38bdf8" />

                {/* Weak */}
                <rect x="270" y="45" width="200" height="90" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="370" y="70" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">2. Weak Dominance</text>
                <text x="370" y="90" fill="#cbd5e1" fontSize="9" textAnchor="middle">a_ik ≥ a_jk (Rows)</text>
                <text x="370" y="110" fill="#cbd5e1" fontSize="9" textAnchor="middle">a_kr ≤ a_ks (Cols)</text>

                <line x1="470" y1="90" x2="510" y2="90" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="510,90 500,85 500,95" fill="#38bdf8" />

                {/* Convex */}
                <rect x="510" y="45" width="200" height="90" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="610" y="70" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">3. Convex Blends</text>
                <text x="610" y="90" fill="#ffffff" fontSize="9" textAnchor="middle">λ R₁ + (1−λ) R₂ ≥ R₃</text>
                <text x="610" y="110" fill="#fde68a" fontSize="8" textAnchor="middle">Breaks Pure Deadlocks in ₹</text>
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
                Bengal Operations Research Dominance Applications Case Studies
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
                  <p className="text-amber-300 font-semibold">💡 <strong>Operations Takeaway:</strong> {cs.lesson}</p>
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
                  trap: 'Deleting Row 3 When Synthetic Row is Greater in Only 2 Out of 3 Columns',
                  fix: 'Convex dominance requires the synthetic row to be ≥ Row 3 in ALL columns simultaneously.',
                },
                {
                  trap: 'Player B Deleting the Smaller Column in Convex Combinations',
                  fix: 'Player B deletes the LARGER column: μ C₁ + (1−μ) C₂ ≤ C₃ ➔ C₃ is deleted.',
                },
                {
                  trap: 'Giving Up on Matrix Reduction When Pure Pairwise Dominance Fails',
                  fix: 'Always test the 50-50 average convex blend before resorting to Linear Programming!',
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
                  Think of convex dominance like building an investment portfolio: even if stock 1 or stock 2 alone doesn't beat benchmark 3, a 50-50 balanced blend beats it consistently across all market conditions!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how setting λ = 0.50 yields [25, 30, 30] which comfortably beats [20, 25, 25] in every single column!
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
                Student Revision Checklist (Topic 2)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Distinguished between strict, weak, and convex combination dominance',
                'Applied the 50-50 average test to resolve pure dominance deadlocks',
                'Verified row maximization (delete smaller) vs column minimization (delete larger)',
                'Verified that Game Value v* is invariant under all dominance reductions',
                'Reported all matrix payoffs and game values in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: When pure dominance seems to hit a brick wall, never surrender to heavy LP tableaus! The 50-50 convex average test is your secret weapon. In our next topic (Topic 3), we will explore full Reduction to 2×2 Games!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Use of Dominance FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Use of Dominance for Reduction"
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
