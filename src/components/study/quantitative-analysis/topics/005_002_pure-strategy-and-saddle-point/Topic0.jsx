// src/components/study/quantitative-analysis/topics/005_002_pure-strategy-and-saddle-point/Topic0.jsx
// React 19 Function-based Component
// Module: 005_002_pure-strategy-and-saddle-point
// Topic 0: Pure strategy

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic0_files/topic0_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic0_files/topic0_note.txt?raw';

const Topic0 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);

  // Selected Pure Strategy: Row i (0, 1, 2) and Col j (0, 1, 2)
  const [pureRow, setPureRow] = useState(1); // Default to A2
  const [pureCol, setPureCol] = useState(0); // Default to B1

  // 3x3 Payoff Matrix (in ₹ Thousands) - Has a pure saddle point at (A2, B1) = ₹30k
  const matrix = [
    [10, 20, 15],
    [30, 40, 35],
    [20, 25, 22],
  ];

  const currentPayoff = matrix[pureRow][pureCol];
  const isSaddlePoint = pureRow === 1 && pureCol === 0;

  // Probability Vectors for Pure Strategies
  const probVectorA = [0, 0, 0];
  probVectorA[pureRow] = 1.0;

  const probVectorB = [0, 0, 0];
  probVectorB[pureCol] = 1.0;

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
      title: '1. Foundry Fixed Furnace Schedule Pure Strategy (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Evaluated a pure strategy of continuous induction melting (Strategy A1) in Barrackpore, guaranteeing a ₹40,000 net profit because a pure saddle point existed against competitor shift patterns.',
      lesson: 'Deterministic pure strategies eliminate managerial complexity when a saddle point exists.',
    },
    {
      title: '2. Cold-Chain Vaccine Facility Dedicated Solar Backup (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Adopted a pure strategy of deploying dedicated solar refrigeration units (Strategy A2) in Kolkata, which strictly dominated diesel generators by ₹25,000.',
      lesson: 'Strictly dominant pure strategies should always be executed with 100% commitment.',
    },
    {
      title: '3. Supermarket FMCG Retail Weekend Discount Pure Strategy (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Analyzed a 3x3 promotional game in Ichapur, identifying that a pure weekend loyalty campaign (Strategy A1) locked in ₹18,000 profit at a pure saddle point.',
      lesson: 'Pure strategy equilibria prevent promotional price volatility in retail markets.',
    },
    {
      title: '4. Educational High-Tech Lab Patent Licensing Pure Strategy (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Evaluated patent licensing agreements in Jadavpur, proving that a pure cross-licensing strategy (Strategy A1) provided an unexploitable equilibrium of ₹55 Lakh in research value.',
      lesson: 'Pure equilibrium agreements eliminate costly trial and error in corporate negotiations.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes pureGlow {
          0%, 100% { border-color: rgba(56, 189, 248, 0.3); }
          50% { border-color: rgba(56, 189, 248, 0.8); }
        }
        .glow-pure {
          animation: pureGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Segment 5 • Module 005_002 • Topic 0
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Deterministic Decision Rules • Unit Basis Vectors • Equilibrium Stability
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
            Pure Strategy
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A rigorous study of <span className="text-sky-400 font-semibold">Pure Strategies</span> in Game Theory: understanding deterministic choices (<span className="text-amber-400 font-mono">p = 1.0</span>), standard basis probability vectors, strategic stability when a <span className="text-emerald-400 font-semibold">Saddle Point</span> exists, and pure payoffs in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'pure-concept', label: '1. Pure Strategy Foundations' },
              { id: 'interactive-explorer', label: '2. Pure Strategy Selection Studio' },
              { id: 'stability-theory', label: '3. Strategic Stability & Simplex' },
              { id: 'svg-simplex', label: '4. Strategy Simplex Architecture SVG' },
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

        {/* SECTION 1: Pure Strategy Foundations */}
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
                Pure Strategy Foundations & Mathematical Properties
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-bold">1. Deterministic Selection</span>
                <p className="text-slate-300 text-xs">
                  A player commits 100% probability to a single specific action (p_k = 1.0).
                </p>
                <span className="text-sky-400 font-mono text-[11px]">p = (0, ..., 1, ..., 0)ᵀ</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-bold">2. Simplex Vertex</span>
                <p className="text-slate-300 text-xs">
                  Geometrically, pure strategies form the extreme corner vertices of the strategy simplex.
                </p>
                <span className="text-emerald-400 font-mono text-[11px]">Degenerate mixed strategy.</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-300 font-bold">3. Unexploitable at Saddle Point</span>
                <p className="text-slate-300 text-xs">
                  If Maximin = Minimax = v*, pure strategies form a self-enforcing Nash equilibrium.
                </p>
                <span className="text-amber-300 font-mono text-[11px]">No incentive to deviate!</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Pure Strategy Selection Studio */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-pure">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Pure Strategy Selection & Equilibrium Studio
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Select pure strategies for Player A and Player B to inspect the resulting vector representations, matrix intersection, and equilibrium status:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                <span className="text-xs font-semibold text-rose-400">Select Player A Pure Strategy:</span>
                <div className="flex gap-2">
                  {['A₁', 'A₂ (Optimal)', 'A₃'].map((label, idx) => (
                    <button
                      key={idx}
                      onClick={() => setPureRow(idx)}
                      className={clsx(
                        'flex-1 py-2 rounded-lg text-xs font-semibold transition-all border',
                        pureRow === idx
                          ? 'bg-rose-600 text-white border-rose-400 shadow-md'
                          : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <span className="text-[11px] font-mono text-slate-400">
                  Basis Vector p = [{probVectorA.join(', ')}]ᵀ
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                <span className="text-xs font-semibold text-sky-400">Select Player B Pure Strategy:</span>
                <div className="flex gap-2">
                  {['B₁ (Optimal)', 'B₂', 'B₃'].map((label, idx) => (
                    <button
                      key={idx}
                      onClick={() => setPureCol(idx)}
                      className={clsx(
                        'flex-1 py-2 rounded-lg text-xs font-semibold transition-all border',
                        pureCol === idx
                          ? 'bg-sky-600 text-white border-sky-400 shadow-md'
                          : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <span className="text-[11px] font-mono text-slate-400">
                  Basis Vector q = [{probVectorB.join(', ')}]ᵀ
                </span>
              </div>
            </div>

            {/* Matrix View */}
            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-center border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2 text-left">Player A \ Player B</th>
                    <th className={clsx('p-2', pureCol === 0 ? 'text-sky-300 font-bold bg-sky-950/30' : '')}>B₁</th>
                    <th className={clsx('p-2', pureCol === 1 ? 'text-sky-300 font-bold bg-sky-950/30' : '')}>B₂</th>
                    <th className={clsx('p-2', pureCol === 2 ? 'text-sky-300 font-bold bg-sky-950/30' : '')}>B₃</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {matrix.map((row, rIdx) => (
                    <tr key={rIdx} className={clsx(pureRow === rIdx ? 'bg-rose-950/20' : '')}>
                      <td className="p-2 text-left font-bold text-rose-300">A_{rIdx + 1}</td>
                      {row.map((cell, cIdx) => {
                        const isSelected = pureRow === rIdx && pureCol === cIdx;
                        return (
                          <td
                            key={cIdx}
                            className={clsx(
                              'p-2 font-bold transition-all',
                              isSelected
                                ? isSaddlePoint
                                  ? 'bg-emerald-950 text-emerald-300 border-2 border-emerald-400 rounded ring-2 ring-emerald-500'
                                  : 'bg-rose-900/60 text-white border-2 border-rose-400 rounded'
                                : 'text-slate-300'
                            )}
                          >
                            ₹{cell}k
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Payoff & Equilibrium Verdict */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs sm:text-sm">
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <span className="text-slate-400 font-sans text-xs">Deterministic Payoff to Player A:</span>
                <span className="text-emerald-400 font-bold text-lg">u_A(A_{pureRow + 1}, B_{pureCol + 1}) = +₹{currentPayoff * 1000}</span>
              </div>

              <div className={clsx('p-3.5 rounded-xl border flex flex-col space-y-1', isSaddlePoint ? 'bg-emerald-950/60 border-emerald-600' : 'bg-amber-950/60 border-amber-600')}>
                <span className="text-slate-300 font-sans text-xs">Equilibrium Verdict:</span>
                <span className={clsx('font-bold text-sm', isSaddlePoint ? 'text-emerald-300' : 'text-amber-300')}>
                  {isSaddlePoint ? 'Stable Pure Saddle Point (v* = ₹30k) ⭐' : 'Out-of-Equilibrium Choice (Opponent can exploit!) ⚠️'}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Strategic Stability & Simplex */}
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
                Pure Strategy Simplex Representation & Stability
              </h2>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-3 text-xs sm:text-sm">
              <p className="text-slate-300 leading-relaxed">
                In an m-strategy game, the set of all mixed strategies forms a probability simplex:
              </p>
              <div className="font-mono text-cyan-300 font-bold text-center py-2 bg-slate-900 rounded-lg border border-slate-800">
                Δ_m = {`{ p ∈ ℝᵐ | p_i ≥ 0, Σ_{i=1}^m p_i = 1 }`}
              </div>
              <p className="text-slate-300 leading-relaxed">
                Every <strong>Pure Strategy</strong> represents an extreme vertex of this simplex. While mixed strategies reside in the interior, pure strategies represent 100% decisive commitments to a single plan of action.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Strategy Simplex Architecture SVG */}
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
                Pure Strategy Simplex Vertex Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 180"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* 3-Vertex Simplex Triangle */}
                <polygon points="370,30 230,150 510,150" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />

                {/* Vertex 1: Pure A1 */}
                <circle cx="370" cy="30" r="8" fill="#f43f5e" />
                <text x="370" y="18" fill="#f43f5e" fontSize="10" fontWeight="bold" textAnchor="middle">Pure A₁: p = (1, 0, 0)</text>

                {/* Vertex 2: Pure A2 */}
                <circle cx="230" cy="150" r="8" fill="#34d399" />
                <text x="200" y="165" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">Pure A₂: p = (0, 1, 0)</text>

                {/* Vertex 3: Pure A3 */}
                <circle cx="510" cy="150" r="8" fill="#f59e0b" />
                <text x="540" y="165" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">Pure A₃: p = (0, 0, 1)</text>

                {/* Interior: Mixed Strategies */}
                <circle cx="370" cy="110" r="5" fill="#a855f7" />
                <text x="370" y="105" fill="#a855f7" fontSize="9" fontWeight="bold" textAnchor="middle">Mixed Interior</text>
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
                Bengal Operations Research Pure Strategy Case Studies
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
                  trap: 'Playing a Pure Strategy when No Saddle Point Exists (Maximin < Minimax)',
                  fix: 'If no saddle point exists, deterministic pure play makes you predictable; you MUST use mixed strategies.',
                },
                {
                  trap: 'Assuming Pure Strategies and Mixed Strategies are Completely Unrelated',
                  fix: 'A pure strategy is simply an extreme boundary case of a mixed strategy where p_k = 1.0.',
                },
                {
                  trap: 'Deviating from an Optimal Pure Strategy at a Saddle Point',
                  fix: 'At a saddle point, unilateral deviation strictly decreases your payoff or increases your loss.',
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
                  Think of a pure strategy like locking in a fixed interest rate: you know exactly what you will get without any probabilistic dice-rolling!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how selecting the saddle point row and column creates a stable equilibrium where neither player has any reason to move!
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
                Student Revision Checklist (Topic 0)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Defined Pure Strategy as a deterministic decision with probability p = 1.0',
                'Understood pure strategies as extreme vertices of the strategy simplex',
                'Identified the condition for pure strategy stability (Saddle Point existence)',
                'Mapped pure strategy pairs (A_i, B_j) directly to matrix cells a_ij',
                'Reported pure strategy payoffs and values in Indian Rupees (₹)',
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
              "Welcome to Module 005_002 (Pure Strategy and Saddle Point), Debangshu, Mamata, Mahima, Susmita, and Abhronila! In this module, we will explore the exact mathematical mechanics of finding and exploiting Saddle Points. Remember: a pure strategy is a standard basis vector p = e_k. In our next topic (Topic 1), we will examine the Maximin Principle in microscopic detail!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Pure Strategy FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Pure Strategy (Game Theory)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic1_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic0;
