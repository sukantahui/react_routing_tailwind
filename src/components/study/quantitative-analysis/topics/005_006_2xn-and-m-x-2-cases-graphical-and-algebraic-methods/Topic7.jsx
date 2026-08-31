// src/components/study/quantitative-analysis/topics/005_006_2xn-and-m-x-2-cases-graphical-and-algebraic-methods/Topic7.jsx
// React 19 Function-based Component
// Module: 005_006_2xn-and-m-x-2-cases-graphical-and-algebraic-methods
// Topic 7: Determining the value of the game

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic7_files/topic7_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic7_files/topic7_note.txt?raw';

const Topic7 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);

  // Shift & Scale Controls
  const [constantShiftC, setConstantShiftC] = useState(0); // in ₹ Thousands
  const [scaleFactorK, setScaleFactorK] = useState(1);

  // Base 2x2 Submatrix (in ₹ Thousands)
  const baseA11 = 20;
  const baseA12 = 50;
  const baseA21 = 40;
  const baseA22 = 10;

  // Transformed Matrix Cells
  const a11 = scaleFactorK * (baseA11 + constantShiftC);
  const a12 = scaleFactorK * (baseA12 + constantShiftC);
  const a21 = scaleFactorK * (baseA21 + constantShiftC);
  const a22 = scaleFactorK * (baseA22 + constantShiftC);

  // Computations
  const delta = (a11 + a22) - (a12 + a21);
  const p1 = (a22 - a21) / delta;
  const p2 = 1 - p1;
  const q1 = (a22 - a12) / delta;
  const q2 = 1 - q1;

  const vStar = (a11 * a22 - a12 * a21) / delta;
  const vStarRupees = (vStar * 1000).toLocaleString('en-IN');

  const baseVStar = 30; // ₹30k
  const expectedTransformedVStar = scaleFactorK * (baseVStar + constantShiftC);

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
      title: '1. Foundry Shift Valuation Governance (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Debangshu in Barrackpore evaluated A_sub = [[20, 50], [40, 10]]. Determinant formula gave v* = (200 − 2000)/-60 = +₹30,000. Verified via inner product p^T A q = ₹30,000.',
      lesson: 'Dual determination paths ensure 100% error-free financial auditing.',
    },
    {
      title: '2. Cold-Chain Shift-Invariance Audit (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Evaluated a fuel surcharge of +₹5,000 across all routes in Kolkata. The baseline game value shifted from ₹24,000 to ₹29,000 with zero change in fleet dispatch ratios.',
      lesson: 'Shift-invariance confirms that universal price inflation leaves optimal strategy mixes intact.',
    },
    {
      title: '3. Supermarket FMCG Promotional Valuation (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Determined v* = ₹32,000 across a 2x4 promotional grid in Ichapur, using the value to establish the department monthly revenue benchmark of ₹9.6 Lakh.',
      lesson: 'Game Value v* establishes reliable quarterly revenue projections.',
    },
    {
      title: '4. Educational High-Tech Lab Patent Royalties (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Used the exact game value of ₹20 Lakh in Jadavpur to convince university executives that accepting the settlement eliminated variance risk with zero loss in expectation.',
      lesson: 'The theoretical game value is the gold standard for dispute buyouts.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes valGlow7 {
          0%, 100% { border-color: rgba(16, 185, 129, 0.3); }
          50% { border-color: rgba(16, 185, 129, 0.8); }
        }
        .glow-val7 {
          animation: valGlow7 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
              Segment 5 • Module 005_006 • Topic 7
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
              Determining Game Value v* • Determinants • Shift-Invariance in ₹
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
            Determining the Value of the Game
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive study on <span className="text-emerald-400 font-semibold">Determining the Value of the Game (v*)</span>: evaluating the closed-form determinant formula (<span className="text-amber-400 font-mono">v* = (a₁₁a₂₂ − a₁₂a₂₁)/Δ</span>), verifying bilinear inner products (<span className="text-sky-400 font-mono">pᵀAq</span>), and mastering <span className="text-emerald-400 font-semibold">Shift-Invariance Theorems</span> in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'value-formulations', label: '1. 3 Value Formulations' },
              { id: 'interactive-studio', label: '2. Shift-Invariance Studio' },
              { id: 'financial-meaning', label: '3. Economic Meaning of v*' },
              { id: 'svg-pipeline', label: '4. 3 Determination Paths SVG' },
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

        {/* SECTION 1: 3 Value Formulations */}
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
                The 3 Equivalent Formulations of Game Value v*
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-400 font-sans font-bold">1. Determinant Formula</span>
                <p className="text-slate-300 text-xs">v* = (a₁₁a₂₂ − a₁₂a₂₁) / Δ</p>
                <span className="text-amber-400 text-[11px]">Direct closed-form arithmetic</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-sans font-bold">2. Equal Payoff Principle</span>
                <p className="text-slate-300 text-xs">v* = E(p*, B₁) = p₁*a₁₁ + p₂*a₂₁</p>
                <span className="text-sky-400 text-[11px]">Evaluated on active column lines</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-sans font-bold">3. Bilinear Matrix Form</span>
                <p className="text-slate-300 text-xs">v* = p*ᵀ A q* = ∑∑ p_i a_ij q_j</p>
                <span className="text-emerald-400 text-[11px]">Bilinear inner product in ₹</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Shift-Invariance Studio */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-val7">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Shift & Scale Invariance Studio
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Add a constant <span className="text-amber-400 font-mono font-bold">+C</span> or multiply by <span className="text-sky-400 font-mono font-bold">×k</span>. Observe how Game Value shifts while strategy probabilities <span className="text-emerald-400 font-mono font-bold">p*, q*</span> remain strictly invariant:
            </p>

            {/* Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                <div className="flex justify-between items-center text-amber-400 font-bold">
                  <span>Constant Addition: C = +₹{constantShiftC}k</span>
                </div>
                <input
                  type="range"
                  min="-10"
                  max="40"
                  step="5"
                  value={constantShiftC}
                  onChange={(e) => setConstantShiftC(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                <div className="flex justify-between items-center text-sky-400 font-bold">
                  <span>Scalar Multiplier: k = {scaleFactorK}×</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={scaleFactorK}
                  onChange={(e) => setScaleFactorK(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
                />
              </div>
            </div>

            {/* Transformed Matrix Display */}
            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3 font-mono text-xs sm:text-sm">
              <div className="flex justify-between items-center text-slate-400 font-sans text-xs">
                <span>Transformed Payoff Matrix A' = k · (A + C):</span>
                <span className="text-emerald-400 font-bold">Base Game Value: ₹30,000</span>
              </div>
              <table className="w-full text-center border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2 text-left">A \ B</th>
                    <th className="p-2 text-sky-400">B₁ (q₁ = {q1.toFixed(2)})</th>
                    <th className="p-2 text-sky-400">B₂ (q₂ = {q2.toFixed(2)})</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-200">
                  <tr>
                    <td className="p-2 text-left font-bold text-rose-300">A₁ (p₁ = {p1.toFixed(2)})</td>
                    <td className="p-2 font-bold text-amber-300">₹{a11}k</td>
                    <td className="p-2 font-bold text-amber-300">₹{a12}k</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-left font-bold text-rose-300">A₂ (p₂ = {p2.toFixed(2)})</td>
                    <td className="p-2 font-bold text-amber-300">₹{a21}k</td>
                    <td className="p-2 font-bold text-amber-300">₹{a22}k</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Invariance Verification Card */}
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-3 font-mono text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-slate-400 font-sans text-xs">Player A Strategy:</span>
                  <span className="text-rose-300 font-bold">p* = [0.50, 0.50]ᵀ (Invariant!)</span>
                </div>

                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-slate-400 font-sans text-xs">Player B Strategy:</span>
                  <span className="text-sky-300 font-bold">q* = [2/3, 1/3]ᵀ (Invariant!)</span>
                </div>

                <div className="p-3 bg-emerald-950/60 rounded-lg border border-emerald-600 flex flex-col space-y-1">
                  <span className="text-slate-300 font-sans text-xs">Transformed Game Value:</span>
                  <span className="text-emerald-300 font-bold text-base">+₹{vStarRupees}</span>
                </div>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg text-slate-300 text-xs">
                ✨ <strong>Theorem Verification:</strong> v_new* = {scaleFactorK} × (₹30k + ₹{constantShiftC}k) = ₹{expectedTransformedVStar}k (+₹{vStarRupees}).
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Economic Meaning of v* */}
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
                Economic & Strategic Interpretations of Game Value v*
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm font-mono">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-sans font-bold">Positive Value (v* &gt; 0)</span>
                <p className="text-slate-300 text-xs">Player A holds structural market advantage; receives positive expected transfer from Player B.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-sans font-bold">Strictly Fair Game (v* = 0)</span>
                <p className="text-slate-300 text-xs">Perfect symmetry; neither player possesses an inherent expected financial advantage.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-rose-400 font-sans font-bold">Negative Value (v* &lt; 0)</span>
                <p className="text-slate-300 text-xs">Player B holds market advantage, forcing net expected loss on Player A under optimal play.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: 3 Determination Paths SVG */}
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
                3 Equivalent Paths to Determine Value of the Game Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 180"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Path 1 */}
                <rect x="20" y="45" width="200" height="90" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="120" y="70" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">1. Determinant Path</text>
                <text x="120" y="95" fill="#cbd5e1" fontSize="8" textAnchor="middle">v* = (a₁₁a₂₂ − a₁₂a₂₁) / Δ</text>
                <text x="120" y="115" fill="#fde68a" fontSize="7" textAnchor="middle">Exact 2×2 Closed-Form</text>

                {/* Path 2 */}
                <rect x="270" y="45" width="200" height="90" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="370" y="70" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">2. Expected Payoff Path</text>
                <text x="370" y="95" fill="#cbd5e1" fontSize="8" textAnchor="middle">v* = E(p*, B₁) = p₁*a₁₁ + p₂*a₂₁</text>
                <text x="370" y="115" fill="#c7d2fe" fontSize="7" textAnchor="middle">Active Column Line Check</text>

                {/* Path 3 */}
                <rect x="520" y="45" width="200" height="90" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="620" y="70" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">3. Matrix Inner Product</text>
                <text x="620" y="95" fill="#ffffff" fontSize="8" textAnchor="middle">v* = p*ᵀ A q*</text>
                <text x="620" y="115" fill="#a7f3d0" fontSize="7" textAnchor="middle">Universal Bilinear Value in ₹</text>
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
                Bengal Operations Research Game Value Determination Case Studies
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
                  trap: 'Forgetting That Constant Shift Changes v* But Leaves p* and q* Unchanged',
                  fix: 'Adding +C increases the game value by exactly +C; optimal mixed strategy probabilities remain 100% invariant.',
                },
                {
                  trap: 'Calculating v* on Inactive (Pruned) Strategies',
                  fix: 'Game Value v* is only equal to expected payoffs on ACTIVE support strategies; inactive options yield worse payouts for the opponent.',
                },
                {
                  trap: 'Arithmetic Sign Errors When Determinant Δ is Negative',
                  fix: 'If Δ = −60, the numerator (a₁₁a₂₂ − a₁₂a₂₁) is typically also negative (e.g. −1800), resulting in a positive value v* = +₹30k.',
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
                  Think of the Game Value v* like the guaranteed baseline dividend of an investment strategy: whether evaluated by determinants or inner products, the bottom-line yield is identical!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how adding +₹10,000 shifts the Game Value from ₹30,000 to ₹40,000 while leaving p* = [0.5, 0.5] and q* = [2/3, 1/3] completely untouched!
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
                Student Revision Checklist (Topic 7)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Computed v* via closed-form determinant formula',
                'Verified v* via inner product pᵀ A q and expected payoff lines',
                'Applied shift-invariance (v_new* = v_old* + C) and scale-invariance',
                'Interpreted v* as long-run guaranteed cycle return',
                'Reported all financial valuations and balances in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: Determining the value of the game provides the ultimate financial summary of strategic confrontation. In our next topic (Topic 8), we will work through comprehensive Numerical Exercises!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Determining Value of the Game FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Determining the Value of the Game"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic8_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic7;
