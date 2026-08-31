// src/components/study/quantitative-analysis/topics/005_004_mixed-strategy/Topic5.jsx
// React 19 Function-based Component
// Module: 005_004_mixed-strategy
// Topic 5: Finding the value of the game

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

  // Delta & Determinant
  const delta = (a11 + a22) - (a12 + a21);
  const detA = a11 * a22 - a12 * a21;

  // Optimal probabilities
  const p1Star = delta !== 0 ? (a22 - a21) / delta : 0.5;
  const p2Star = delta !== 0 ? (a11 - a12) / delta : 0.5;

  // Oddments
  const oddmentRow1 = Math.abs(a21 - a22);
  const oddmentRow2 = Math.abs(a11 - a12);
  const totalRowOddments = oddmentRow1 + oddmentRow2;

  // 3 Method Evaluations
  const vMethod1 = delta !== 0 ? detA / delta : 0; // det(A) / Delta
  const vMethod2 = p1Star * a11 + p2Star * a21; // Substitution p* A[:, 0]
  const vMethod3 =
    totalRowOddments > 0 ? (a11 * oddmentRow1 + a21 * oddmentRow2) / totalRowOddments : 0; // Oddments product

  // Bounds
  const rowMin1 = Math.min(a11, a12);
  const rowMin2 = Math.min(a21, a22);
  const maximin = Math.max(rowMin1, rowMin2);

  const colMax1 = Math.max(a11, a21);
  const colMax2 = Math.max(a12, a22);
  const minimax = Math.min(colMax1, colMax2);

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
      title: '1. Foundry Expected Margin Valuation (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Solved A = [[₹40k, ₹10k], [₹10k, ₹50k]] in Barrackpore. det(A) = 1900, Delta = 70. Value of Game v* = ₹27,142.86, representing exact expected profit per shift.',
      lesson: 'The Value of the Game provides a solid financial benchmark for bidding negotiations.',
    },
    {
      title: '2. Cold-Chain Fair Contract Design (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Adjusted courier penalties in Kolkata to create a strictly Fair Game (v* = ₹0), ensuring equitable risk sharing between health clinics and transport providers.',
      lesson: 'A game value of ₹0 guarantees contract fairness across all stakeholder parties.',
    },
    {
      title: '3. Supermarket FMCG Retail Promotional Valuation (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Analyzed A = [[₹50k, ₹20k], [₹10k, ₹60k]] in Ichapur. det(A) = 2800, Delta = 80. Value of Game v* = ₹35,000, securing retail revenues.',
      lesson: 'Expected game value quantifies long-term marketing ROI.',
    },
    {
      title: '4. Educational High-Tech Lab Patent Valuation (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Used the expected payoff substitution method in Jadavpur on A = [[₹25L, ₹5L], [₹10L, ₹30L]], proving to university trustees that the optimal license value was ₹17.5 Lakh.',
      lesson: 'Multi-method game value validation ensures audit-proof institutional deals.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes valGlow {
          0%, 100% { border-color: rgba(52, 211, 153, 0.3); }
          50% { border-color: rgba(52, 211, 153, 0.8); }
        }
        .glow-val {
          animation: valGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
              Segment 5 • Module 005_004 • Topic 5
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
              Game Value (v*) • Multi-Method Calculation • Fair Games in ₹
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
            Finding the Value of the Game
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive study of <span className="text-emerald-400 font-semibold">Finding the Value of the Game (v*)</span>: mastering 3 equivalent analytical calculation methods (<span className="text-amber-400 font-mono">det(A)/Δ, Substitution, Oddments</span>), validating security bounds (<span className="text-sky-400 font-mono">α ≤ v* ≤ β</span>), and identifying Fair Games in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'three-methods', label: '1. Three Equivalent Methods' },
              { id: 'interactive-calculator', label: '2. Multi-Method Live Calculator' },
              { id: 'bounds-validation', label: '3. Maximin/Minimax Bounds' },
              { id: 'svg-pipeline', label: '4. Value Convergence SVG' },
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
              >
                {item.label}
              </button>
            ))}
          </div>
        </header>

        {/* SECTION 1: Three Equivalent Methods */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                01
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Three Equivalent Methods for Computing the Value of the Game (v*)
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-rose-400 font-sans font-bold">Method 1: Matrix Determinant</span>
                <p className="text-slate-300 text-xs">v* = det(A) / Δ</p>
                <p className="text-slate-400 text-[11px]">(a₁₁a₂₂ − a₁₂a₂₁) / Δ</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-sans font-bold">Method 2: Payoff Substitution</span>
                <p className="text-slate-300 text-xs">v* = p₁* a₁₁ + p₂* a₂₁</p>
                <p className="text-slate-400 text-[11px]">E(p*, B₁) = E(p*, B₂)</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-sans font-bold">Method 3: Oddments Product</span>
                <p className="text-slate-300 text-xs">v* = (a₁₁ O_A1 + a₂₁ O_A2) / O_A</p>
                <p className="text-emerald-300 text-[11px]">Weighted oddments sum in ₹</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Multi-Method Live Calculator */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-val">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Multi-Method Game Value Studio
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Edit the matrix entries below (in ₹ Thousands). All 3 methods compute and verify the exact same Game Value v*:
            </p>

            {/* Matrix View */}
            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3 font-mono text-xs sm:text-sm">
              <table className="w-full text-center border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2 text-left">A \ B</th>
                    <th className="p-2 text-sky-400">B₁</th>
                    <th className="p-2 text-sky-400">B₂</th>
                    <th className="p-2 text-slate-400">Row Min</th>
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
                        className="w-16 px-2 py-1 text-center bg-slate-900 border border-slate-700 rounded text-emerald-300 font-bold"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        value={a12}
                        onChange={(e) => updateCell(0, 1, e.target.value)}
                        className="w-16 px-2 py-1 text-center bg-slate-900 border border-slate-700 rounded text-emerald-300 font-bold"
                      />
                    </td>
                    <td className="p-2 text-rose-400 font-bold">{rowMin1}k</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-left font-bold text-rose-300">A₂</td>
                    <td className="p-2">
                      <input
                        type="number"
                        value={a21}
                        onChange={(e) => updateCell(1, 0, e.target.value)}
                        className="w-16 px-2 py-1 text-center bg-slate-900 border border-slate-700 rounded text-emerald-300 font-bold"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        value={a22}
                        onChange={(e) => updateCell(1, 1, e.target.value)}
                        className="w-16 px-2 py-1 text-center bg-slate-900 border border-slate-700 rounded text-emerald-300 font-bold"
                      />
                    </td>
                    <td className="p-2 text-rose-400 font-bold">{rowMin2}k</td>
                  </tr>
                  <tr className="border-t-2 border-slate-700 bg-slate-900/40">
                    <td className="p-2 text-left font-bold text-slate-400">Col Max</td>
                    <td className="p-2 text-sky-400 font-bold">{colMax1}k</td>
                    <td className="p-2 text-sky-400 font-bold">{colMax2}k</td>
                    <td className="p-2 text-amber-400 font-bold">α = {maximin}k, β = {minimax}k</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 3 Method Verification Blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <span className="text-rose-400 font-sans font-bold">Method 1 (Determinant):</span>
                <span className="text-slate-300">({a11 * a22} − {a12 * a21}) / {delta}</span>
                <span className="text-rose-300 font-bold text-sm">v* = +₹{(vMethod1 * 1000).toFixed(0)}</span>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-sans font-bold">Method 2 (Substitution):</span>
                <span className="text-slate-300">
                  {p1Star.toFixed(2)}({a11}) + {p2Star.toFixed(2)}({a21})
                </span>
                <span className="text-sky-300 font-bold text-sm">v* = +₹{(vMethod2 * 1000).toFixed(0)}</span>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-sans font-bold">Method 3 (Oddments):</span>
                <span className="text-slate-300">
                  ({a11}·{oddmentRow1} + {a21}·{oddmentRow2}) / {totalRowOddments}
                </span>
                <span className="text-emerald-300 font-bold text-sm">v* = +₹{(vMethod3 * 1000).toFixed(0)}</span>
              </div>
            </div>

            {/* Final Game Value Verdict & Classification Banner */}
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-600 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs sm:text-sm">
              <div>
                <span className="text-slate-300 font-semibold block">Game Value Assessment:</span>
                <span className="font-mono text-xs text-emerald-300">
                  Security Bounds: ₹{maximin}k (Maximin) ≤ v* ≤ ₹{minimax}k (Minimax)
                </span>
              </div>
              <div className="text-right">
                <div className="font-mono font-extrabold text-2xl text-emerald-300">
                  v* = +₹{(vMethod1 * 1000).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                </div>
                <span className="text-amber-300 text-xs font-semibold">
                  {vMethod1 > 0 ? '🏆 Favorable to Player A' : vMethod1 < 0 ? '🛡️ Favorable to Player B' : '⚖️ Strictly Fair Game (v* = ₹0)'}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Maximin/Minimax Bounds */}
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
                Security Floor & Liability Ceiling Bounds (α ≤ v* ≤ β)
              </h2>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-3 text-xs sm:text-sm">
              <p className="text-slate-300 leading-relaxed">
                The equilibrium Game Value <span className="text-emerald-400 font-mono font-bold">v*</span> is mathematically bounded between Player A's pure security floor (<span className="text-rose-400 font-mono">Maximin α</span>) and Player B's pure liability ceiling (<span className="text-sky-400 font-mono">Minimax β</span>):
              </p>
              <div className="p-3 bg-slate-900 rounded-lg text-center font-mono font-bold text-amber-300">
                Maximin (α) ≤ v* ≤ Minimax (β)
              </div>
              <p className="text-slate-300 leading-relaxed">
                By randomizing, Player A secures an expected return <strong>strictly higher than or equal to the worst-case pure floor α</strong>, while Player B caps liabilities at or below β!
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Value Convergence SVG */}
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
                Multi-Method Value Convergence Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 180"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Method 1 */}
                <rect x="30" y="20" width="200" height="40" rx="6" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <text x="130" y="45" fill="#f43f5e" fontSize="9" fontWeight="bold" textAnchor="middle">Method 1: det(A) / Δ</text>

                {/* Method 2 */}
                <rect x="30" y="70" width="200" height="40" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="130" y="95" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle">Method 2: pᵀ · A[:, 0]</text>

                {/* Method 3 */}
                <rect x="30" y="120" width="200" height="40" rx="6" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
                <text x="130" y="145" fill="#a855f7" fontSize="9" fontWeight="bold" textAnchor="middle">Method 3: Oddments Product</text>

                {/* Convergence Lines */}
                <line x1="230" y1="40" x2="350" y2="85" stroke="#34d399" strokeWidth="2" />
                <line x1="230" y1="90" x2="350" y2="90" stroke="#34d399" strokeWidth="2" />
                <line x1="230" y1="140" x2="350" y2="95" stroke="#34d399" strokeWidth="2" />

                {/* Central Value Node */}
                <circle cx="380" cy="90" r="30" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="380" y="95" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">v*</text>

                <line x1="410" y1="90" x2="490" y2="90" stroke="#34d399" strokeWidth="2" />
                <polygon points="490,90 480,85 480,95" fill="#34d399" />

                {/* Bounds & Rupee Output */}
                <rect x="490" y="40" width="220" height="100" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="600" y="65" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">Equilibrium Game Value</text>
                <text x="600" y="90" fill="#ffffff" fontSize="9" textAnchor="middle">Maximin (α) ≤ v* ≤ Minimax (β)</text>
                <text x="600" y="115" fill="#fde68a" fontSize="9" textAnchor="middle">Reported in Indian Rupees (₹)</text>
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
                Bengal Operations Research Game Value Case Studies
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
                  trap: 'Forgetting to Subtract Off-Diagonal Product (a₁₂ · a₂₁) in det(A)',
                  fix: 'Matrix determinant is a₁₁a₂₂ MINUS a₁₂a₂₁.',
                },
                {
                  trap: 'Calculating a Game Value Outside the Interval [Maximin, Minimax]',
                  fix: 'The equilibrium value v* must always satisfy α ≤ v* ≤ β.',
                },
                {
                  trap: 'Assuming Negative v* Means an Insoluble Game',
                  fix: 'Negative v* simply means the game favors Player B (Column Minimizer) in Indian Rupees (₹).',
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
                  Think of the Value of the Game like the final settlement amount in a legal dispute: having 3 separate calculation methods that all arrive at the exact same Rupee figure guarantees 100% mathematical certainty!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how when det(A) = 0, the game value v* becomes exactly ₹0, creating a perfectly balanced Fair Game!
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
                Student Revision Checklist (Topic 5)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Mastered the 3 methods: det(A)/Δ, expected payoff substitution, and oddments product',
                'Interpreted the sign of v*: positive (A wins), negative (B wins), zero (Fair Game)',
                'Verified bounds: Maximin ≤ v* ≤ Minimax',
                'Verified shift and scale properties of game values',
                'Reported all final game values in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: The Value of the Game v* is your bottom line! You now have 3 distinct methods to calculate and cross-verify it. In our next topic (Topic 6), we will apply all these tools to comprehensive Numerical Exercises across various industrial applications!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Finding the Value of the Game FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Finding the Value of the Game"
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
