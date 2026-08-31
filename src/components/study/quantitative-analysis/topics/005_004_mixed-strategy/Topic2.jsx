// src/components/study/quantitative-analysis/topics/005_004_mixed-strategy/Topic2.jsx
// React 19 Function-based Component
// Module: 005_004_mixed-strategy
// Topic 2: Expected payoff

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

  // 2x2 Matrix Payoffs (in ₹ Thousands)
  const [matrix, setMatrix] = useState([
    [30, 10],
    [10, 40],
  ]);

  // Mixed strategy probabilities
  const [p1, setP1] = useState(0.6);
  const [q1, setQ1] = useState(0.5);

  const p2 = 1 - p1;
  const q2 = 1 - q1;

  const updateCell = (r, c, val) => {
    const next = matrix.map((row, ri) =>
      row.map((cell, ci) => (ri === r && ci === c ? Number(val) : cell))
    );
    setMatrix(next);
  };

  // Expected payoffs vs pure moves
  const expVsB1 = p1 * matrix[0][0] + p2 * matrix[1][0];
  const expVsB2 = p1 * matrix[0][1] + p2 * matrix[1][1];

  const expVsA1 = q1 * matrix[0][0] + q2 * matrix[0][1];
  const expVsA2 = q1 * matrix[1][0] + q2 * matrix[1][1];

  // Overall Joint Bilinear Expected Payoff E(p, q) = p^T A q
  const totalExpectedPayoff =
    p1 * q1 * matrix[0][0] +
    p1 * q2 * matrix[0][1] +
    p2 * q1 * matrix[1][0] +
    p2 * q2 * matrix[1][1];

  const isIndifferentA = Math.abs(expVsB1 - expVsB2) < 0.2;

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
      title: '1. Foundry Expected Profit Evaluation (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Evaluated a casting game in Barrackpore with matrix [[₹40k, ₹10k], [₹10k, ₹50k]]. With p = (0.5, 0.5) and q = (0.5, 0.5), the calculated expected return was E(p, q) = ₹27,500.',
      lesson: 'Bilinear expected value models joint probabilistic operational profit.',
    },
    {
      title: '2. Cold-Chain Transport Routing Expected Cost (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Modeled transport breakdowns in Kolkata with [[₹30k, ₹15k], [₹10k, ₹40k]]. Testing mixed fleet schedules yielded an expected operational expenditure of ₹23,750.',
      lesson: 'Expected payoff calculation helps managers budget for stochastic breakdowns.',
    },
    {
      title: '3. Supermarket FMCG Retail Expected Footfall (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Analyzed mixed weekend discounting [[₹50k, ₹20k], [₹10k, ₹60k]] in Ichapur, predicting an expected monthly campaign payoff of ₹35,000.',
      lesson: 'Expected payoff quantifies the expected return of competitor pricing interactions.',
    },
    {
      title: '4. Educational High-Tech Lab Patent Valuation (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Calculated expected licensing revenues under randomized legal postures in Jadavpur, locking in a steady long-run expected valuation of ₹18 Lakh.',
      lesson: 'The indifference principle ensures fair institutional valuation settlements.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes expGlow {
          0%, 100% { border-color: rgba(16, 185, 129, 0.3); }
          50% { border-color: rgba(16, 185, 129, 0.8); }
        }
        .glow-exp {
          animation: expGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
              Segment 5 • Module 005_004 • Topic 2
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
              Expected Payoff • Bilinear Form E(p, q) = pᵀAq • Indifference
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
            Expected Payoff
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive formulation of the <span className="text-emerald-400 font-semibold">Expected Payoff Function</span>: computing joint bilinear products (<span className="text-amber-400 font-mono">E(p, q) = pᵀAq</span>), evaluating payoffs against opponent pure actions, and mastering the Indifference Principle in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'expected-theory', label: '1. Expected Payoff Formula' },
              { id: 'interactive-calculator', label: '2. Bilinear Payoff Calculator' },
              { id: 'indifference-principle', label: '3. Indifference Principle' },
              { id: 'svg-pipeline', label: '4. Bilinear Product Architecture SVG' },
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

        {/* SECTION 1: Expected Payoff Formula */}
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
                Bilinear Expected Payoff Mathematical Formulation
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-bold">1. Bilinear Definition</span>
                <p className="text-slate-300 text-xs">
                  E(p, q) = pᵀAq = Σ Σ p_i · a_ij · q_j across all rows and columns.
                </p>
                <span className="text-emerald-400 font-mono text-[11px]">pᵀAq (Bilinear product)</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-bold">2. Payoff vs Pure Actions</span>
                <p className="text-slate-300 text-xs">
                  E(p, B₁) = p₁ a₁₁ + p₂ a₂₁ &nbsp;|&nbsp; E(p, B₂) = p₁ a₁₂ + p₂ a₂₂.
                </p>
                <span className="text-sky-400 font-mono text-[11px]">Column weighted payoffs</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-300 font-bold">3. Equalization at Nash</span>
                <p className="text-slate-300 text-xs">
                  At equilibrium p*, E(p*, B₁) = E(p*, B₂) = v* in Indian Rupees (₹).
                </p>
                <span className="text-amber-300 font-mono text-[11px]">Indifference property</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Bilinear Payoff Calculator */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-exp">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Bilinear Expected Payoff Studio (E = pᵀAq)
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Adjust the 2x2 matrix cells (in ₹ Thousands) and the probability sliders for Player A (p) and Player B (q):
            </p>

            {/* Matrix Input View */}
            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3 font-mono text-xs sm:text-sm">
              <table className="w-full text-center border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2 text-left">A \ B</th>
                    <th className="p-2 text-sky-400">B₁ (q₁ = {q1.toFixed(2)})</th>
                    <th className="p-2 text-sky-400">B₂ (q₂ = {q2.toFixed(2)})</th>
                    <th className="p-2 text-amber-400">Exp vs Player A Move</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-200">
                  <tr>
                    <td className="p-2 text-left font-bold text-rose-300">A₁ (p₁ = {p1.toFixed(2)})</td>
                    <td className="p-2">
                      <input
                        type="number"
                        value={matrix[0][0]}
                        onChange={(e) => updateCell(0, 0, e.target.value)}
                        className="w-16 px-2 py-1 text-center bg-slate-900 border border-slate-700 rounded text-emerald-300 font-bold"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        value={matrix[0][1]}
                        onChange={(e) => updateCell(0, 1, e.target.value)}
                        className="w-16 px-2 py-1 text-center bg-slate-900 border border-slate-700 rounded text-emerald-300 font-bold"
                      />
                    </td>
                    <td className="p-2 text-sky-300 font-bold">E(A₁, q) = ₹{expVsA1.toFixed(1)}k</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-left font-bold text-rose-300">A₂ (p₂ = {p2.toFixed(2)})</td>
                    <td className="p-2">
                      <input
                        type="number"
                        value={matrix[1][0]}
                        onChange={(e) => updateCell(1, 0, e.target.value)}
                        className="w-16 px-2 py-1 text-center bg-slate-900 border border-slate-700 rounded text-emerald-300 font-bold"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        value={matrix[1][1]}
                        onChange={(e) => updateCell(1, 1, e.target.value)}
                        className="w-16 px-2 py-1 text-center bg-slate-900 border border-slate-700 rounded text-emerald-300 font-bold"
                      />
                    </td>
                    <td className="p-2 text-sky-300 font-bold">E(A₂, q) = ₹{expVsA2.toFixed(1)}k</td>
                  </tr>
                  <tr className="border-t-2 border-slate-700 bg-slate-900/40">
                    <td className="p-2 text-left font-bold text-amber-400">Exp vs Player B Move</td>
                    <td className="p-2 text-rose-300 font-bold">E(p, B₁) = ₹{expVsB1.toFixed(1)}k</td>
                    <td className="p-2 text-rose-300 font-bold">E(p, B₂) = ₹{expVsB2.toFixed(1)}k</td>
                    <td className="p-2 text-emerald-400 font-bold">
                      {isIndifferentA ? '🎯 Indifference Achieved!' : 'Not Equalized'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                <div className="flex justify-between items-center text-rose-400 font-bold">
                  <span>Player A: p₁ (A₁) = {p1.toFixed(2)}</span>
                  <span>p₂ (A₂) = {p2.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.02"
                  value={p1}
                  onChange={(e) => setP1(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                />
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                <div className="flex justify-between items-center text-sky-400 font-bold">
                  <span>Player B: q₁ (B₁) = {q1.toFixed(2)}</span>
                  <span>q₂ (B₂) = {q2.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.02"
                  value={q1}
                  onChange={(e) => setQ1(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
                />
              </div>
            </div>

            {/* Overall Bilinear Expected Payoff Result */}
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-600 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs sm:text-sm">
              <div>
                <span className="text-slate-300 font-semibold block">Overall Joint Bilinear Expected Payoff:</span>
                <span className="font-mono text-xs text-emerald-300">
                  E(p, q) = p₁q₁a₁₁ + p₁q₂a₁₂ + p₂q₁a₂₁ + p₂q₂a₂₂
                </span>
              </div>
              <div className="font-mono font-extrabold text-2xl text-emerald-300">
                E(p, q) = +₹{(totalExpectedPayoff * 1000).toLocaleString('en-IN')}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Indifference Principle */}
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
                The Indifference Principle at Nash Equilibrium
              </h2>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-3 text-xs sm:text-sm">
              <p className="text-slate-300 leading-relaxed">
                Why does Player A play mixed strategy <span className="text-emerald-400 font-mono font-bold">p*</span>? Not to maximize payoff against one specific move, but to make Player B <strong>INDIFFERENT</strong> between playing Column B₁ and Column B₂:
              </p>
              <div className="p-3 bg-slate-900 rounded-lg text-center font-mono font-bold text-amber-300">
                E(p*, B₁) = E(p*, B₂) = v* &nbsp; (in ₹)
              </div>
              <p className="text-slate-300 leading-relaxed">
                When expected payoffs are equalized across all opponent choices, Player B has NO incentive to exploit any specific column, stabilizing the game at equilibrium!
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Bilinear Product Architecture SVG */}
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
                Bilinear Product Multiplier Pipeline
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 180"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Vector pT */}
                <rect x="30" y="55" width="130" height="70" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <text x="95" y="85" fill="#f43f5e" fontSize="11" fontWeight="bold" textAnchor="middle">pᵀ = [p₁, p₂]</text>
                <text x="95" y="105" fill="#cbd5e1" fontSize="8" textAnchor="middle">Player A Mix</text>

                <line x1="160" y1="90" x2="220" y2="90" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="220,90 210,85 210,95" fill="#38bdf8" />

                {/* Matrix A */}
                <rect x="220" y="40" width="160" height="100" rx="8" fill="#1e293b" stroke="#818cf8" strokeWidth="2" />
                <text x="300" y="65" fill="#818cf8" fontSize="11" fontWeight="bold" textAnchor="middle">Payoff Matrix A</text>
                <text x="300" y="90" fill="#cbd5e1" fontSize="9" textAnchor="middle">[[a₁₁, a₁₂], [a₂₁, a₂₂]]</text>
                <text x="300" y="115" fill="#fde68a" fontSize="8" textAnchor="middle">Payoffs in ₹</text>

                <line x1="380" y1="90" x2="440" y2="90" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="440,90 430,85 430,95" fill="#38bdf8" />

                {/* Vector q */}
                <rect x="440" y="55" width="110" height="70" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="495" y="85" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">q = [q₁, q₂]ᵀ</text>
                <text x="495" y="105" fill="#cbd5e1" fontSize="8" textAnchor="middle">Player B Mix</text>

                <line x1="550" y1="90" x2="600" y2="90" stroke="#34d399" strokeWidth="2" />
                <polygon points="600,90 590,85 590,95" fill="#34d399" />

                {/* Scalar E */}
                <rect x="600" y="45" width="120" height="90" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="660" y="75" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">Scalar E(p, q)</text>
                <text x="660" y="95" fill="#ffffff" fontSize="9" textAnchor="middle">pᵀAq in ₹</text>
                <text x="660" y="115" fill="#a7f3d0" fontSize="8" textAnchor="middle">Expected Return</text>
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
                Bengal Operations Research Expected Payoff Case Studies
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
                  trap: 'Forgetting the Cross-Terms (p₁q₂ and p₂q₁) in E(p, q)',
                  fix: 'Full bilinear calculation requires all 4 products: p₁q₁a₁₁ + p₁q₂a₁₂ + p₂q₁a₂₁ + p₂q₂a₂₂.',
                },
                {
                  trap: 'Calculating Expected Payoff Exceeding Matrix Maximum or Below Minimum',
                  fix: 'Expected payoff is a weighted average; it must strictly lie in the interval [min(a_ij), max(a_ij)].',
                },
                {
                  trap: 'Confusing Expected Payoff vs Pure Move with Joint Bilinear Payoff',
                  fix: 'E(p, B₁) evaluates Player A vs pure B₁; E(p, q) evaluates joint mixed play by both players.',
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
                  Think of expected payoff like calculating your weighted semester GPA: each course grade is multiplied by its credit weight and summed together!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how finding the equilibrium p* makes E(p*, B₁) and E(p*, B₂) exactly equal, making Player B completely indifferent to how they play!
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
                'Mastered the bilinear formula: E(p, q) = pᵀ A q',
                'Computed expected payoffs against pure column strategies: E(p, B₁) and E(p, B₂)',
                'Computed expected payouts against pure row strategies: E(A₁, q) and E(A₂, q)',
                'Verified the Indifference Principle at equilibrium: E(p*, B₁) = E(p*, B₂) = v*',
                'Reported all expected returns and game valuations in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: Expected payoff is your compass in mixed games! The golden insight to remember is the Indifference Principle: at equilibrium, your optimal strategy p* makes your opponent's expected payoffs identical across all their active options. In our next topic (Topic 3), we will derive the closed-form algebraic formulas for solving 2x2 games!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Expected Payoff FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Expected Payoff (Game Theory)"
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
