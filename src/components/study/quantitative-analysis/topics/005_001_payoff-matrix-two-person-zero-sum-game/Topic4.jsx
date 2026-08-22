// src/components/study/quantitative-analysis/topics/005_001_payoff-matrix-two-person-zero-sum-game/Topic4.jsx
// React 19 Function-based Component
// Module: 005_001_payoff-matrix-two-person-zero-sum-game
// Topic 4: Two-person zero-sum game

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic4_files/topic4_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic4_files/topic4_note.txt?raw';

const Topic4 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [gamePreset, setGamePreset] = useState(0); // 0: Strictly Determined, 1: Non-Strictly Determined, 2: Fair Game

  const presetGames = [
    {
      name: '1. Strictly Determined Game (Saddle Point at ₹30k)',
      matrix: [
        [10, 20],
        [30, 40],
      ],
      type: 'Strictly Determined (Pure Saddle Point)',
      vStar: 30000,
      pStar: 'Pure A₂ (100%)',
      qStar: 'Pure B₁ (100%)',
      desc: 'Maximin = ₹30k, Minimax = ₹30k. Stable equilibrium at (A₂, B₁).',
    },
    {
      name: '2. Non-Strictly Determined Game (Mixed Equilibrium)',
      matrix: [
        [40, 20],
        [30, 50],
      ],
      type: 'Non-Strictly Determined (Mixed Strategies)',
      vStar: 35000,
      pStar: 'p(A₁) = 0.50, p(A₂) = 0.50',
      qStar: 'q(B₁) = 0.75, q(B₂) = 0.25',
      desc: 'Maximin = ₹30k < Minimax = ₹40k. Players randomize over strategies.',
    },
    {
      name: '3. Fair Game (Value of Game = ₹0)',
      matrix: [
        [20, -20],
        [-20, 20],
      ],
      type: 'Fair Game (v* = ₹0)',
      vStar: 0,
      pStar: 'p(A₁) = 0.50, p(A₂) = 0.50',
      qStar: 'q(B₁) = 0.50, q(B₂) = 0.50',
      desc: 'Expected payoff is exactly ₹0. Neither player holds a structural edge.',
    },
  ];

  const currentGame = presetGames[gamePreset];
  const mat = currentGame.matrix;

  // Calculations
  const rMins = mat.map((row) => Math.min(...row));
  const cMaxs = [0, 1].map((c) => Math.max(...mat.map((row) => row[c])));
  const maximinVal = Math.max(...rMins);
  const minimaxVal = Math.min(...cMaxs);

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
      title: '1. Foundry Supply Contract Zero-Sum Bidding (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Evaluated a ₹2.5 Lakh zero-sum procurement tender in Barrackpore, identifying v* = +₹30,000 for Player A via a pure strategy saddle point at (A2, B1).',
      lesson: 'Strictly determined zero-sum games provide unambiguous pricing confidence.',
    },
    {
      title: '2. Cold-Chain Vaccine Facility Dispute (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Modeled a commercial liquidated damage claim of ₹50,000 in Kolkata, verifying that a pure saddle point prevented expensive courtroom litigation.',
      lesson: 'Zero-sum dispute modeling establishes fair settlement boundaries.',
    },
    {
      title: '3. Supermarket FMCG Retail Price Rivalry (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Analyzed a 2x2 retail promotion game in Ichapur with no saddle point (v_lower < v_upper), calculating the mixed strategy game value v* = ₹35,000.',
      lesson: 'Mixed strategy equilibrium eliminates market share volatility.',
    },
    {
      title: '4. Educational High-Tech Lab Research Patent Royalty Share (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Analyzed a ₹55 Lakh university patent licensing game in Jadavpur, verifying Minimax theorem equilibrium and establishing a fair settlement (v* = ₹0).',
      lesson: 'Fair games (v* = 0) represent perfectly balanced commercial partnerships.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes tpzsgGlow {
          0%, 100% { border-color: rgba(14, 165, 233, 0.3); }
          50% { border-color: rgba(14, 165, 233, 0.8); }
        }
        .glow-tpzsg {
          animation: tpzsgGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Segment 5 • Module 005_001 • Topic 4
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              TPZSG Axioms • Minimax Theorem • Strictly Determined Games
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Two-Person Zero-Sum Game
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A mathematical exploration of <span className="text-sky-400 font-semibold">Two-Person Zero-Sum Games (TPZSG)</span>: understanding total wealth conservation (<span className="text-rose-400 font-mono">u_A + u_B = 0</span>), John von Neumann’s <span className="text-emerald-400 font-semibold">Minimax Theorem</span>, strictly determined vs non-strictly determined games, and fair game valuation in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'tpzsg-axioms', label: '1. TPZSG Axioms & Theorem' },
              { id: 'interactive-simulator', label: '2. Zero-Sum Equilibrium Simulator' },
              { id: 'game-types', label: '3. Game Determinations & Fairness' },
              { id: 'svg-balance', label: '4. Zero-Sum Balance Scale SVG' },
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

        {/* SECTION 1: TPZSG Axioms & Theorem */}
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
                TPZSG Mathematical Axioms & Minimax Theorem
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-rose-400 font-bold">1. Zero-Sum Axiom</span>
                <p className="text-slate-300 text-xs">
                  u_A(s) + u_B(s) = 0 strictly for every strategy profile.
                </p>
                <span className="text-rose-400 font-mono text-[11px]">u_B = −u_A</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-bold">2. Minimax Theorem</span>
                <p className="text-slate-300 text-xs">
                  max_p min_q (pᵀ A q) = min_q max_p (pᵀ A q) = v*.
                </p>
                <span className="text-emerald-400 font-mono text-[11px]">Guarantees unique game value v*.</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-300 font-bold">3. Game Value v* in ₹</span>
                <p className="text-slate-300 text-xs">
                  Fair if v* = ₹0; favors Player A if v* &gt; 0; favors Player B if v* &lt; 0.
                </p>
                <span className="text-amber-300 font-mono text-[11px]">Monetary equilibrium benchmark.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Zero-Sum Equilibrium Simulator */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-tpzsg">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Two-Person Zero-Sum Game Simulator
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {presetGames.map((g, idx) => (
                <button
                  key={idx}
                  onClick={() => setGamePreset(idx)}
                  className={clsx(
                    'px-4 py-2 rounded-xl text-xs font-semibold transition-all border text-left',
                    gamePreset === idx
                      ? 'bg-sky-600 text-white border-sky-400 shadow-md'
                      : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
                  )}
                >
                  {g.name}
                </button>
              ))}
            </div>

            {/* Matrix & Analytical Display */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                <span className="text-xs font-semibold text-sky-400">Payoff Matrix A (₹ Thousands):</span>
                <div className="overflow-x-auto">
                  <table className="w-full text-center border-collapse font-mono text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400">
                        <th className="p-2 text-left">A \ B</th>
                        <th className="p-2">B₁</th>
                        <th className="p-2">B₂</th>
                        <th className="p-2 text-rose-400">Row Min</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-200">
                      <tr>
                        <td className="p-2 text-left font-bold text-rose-300">A₁</td>
                        <td className="p-2">{mat[0][0]}</td>
                        <td className="p-2">{mat[0][1]}</td>
                        <td className="p-2 font-bold text-rose-400">{rMins[0]}</td>
                      </tr>
                      <tr>
                        <td className="p-2 text-left font-bold text-rose-300">A₂</td>
                        <td className="p-2">{mat[1][0]}</td>
                        <td className="p-2">{mat[1][1]}</td>
                        <td className="p-2 font-bold text-rose-400">{rMins[1]}</td>
                      </tr>
                      <tr className="border-t-2 border-slate-700 text-sky-400">
                        <td className="p-2 text-left font-bold">Col Max</td>
                        <td className="p-2 font-bold">{cMaxs[0]}</td>
                        <td className="p-2 font-bold">{cMaxs[1]}</td>
                        <td className="p-2 text-slate-600">—</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2 text-xs sm:text-sm">
                <span className="text-xs font-semibold text-emerald-400">Equilibrium Analysis:</span>
                <p className="text-slate-300"><strong>Game Nature:</strong> <span className="text-amber-300 font-bold">{currentGame.type}</span></p>
                <p className="text-slate-300"><strong>Player A Optimal Strategy:</strong> <span className="text-rose-300 font-mono font-bold">{currentGame.pStar}</span></p>
                <p className="text-slate-300"><strong>Player B Optimal Strategy:</strong> <span className="text-sky-300 font-mono font-bold">{currentGame.qStar}</span></p>
                <p className="text-slate-300"><strong>Value of the Game (v*):</strong> <span className="text-emerald-400 font-mono font-bold">{currentGame.vStar >= 0 ? `+₹${currentGame.vStar.toLocaleString()}` : `−₹${Math.abs(currentGame.vStar).toLocaleString()}`}</span></p>
                <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                  {currentGame.desc}
                </div>
              </div>
            </div>

            {/* Zero-Sum Balance Banner */}
            <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-600 flex items-center justify-between font-mono text-xs sm:text-sm">
              <span className="text-emerald-300 font-bold">Zero-Sum Principle:</span>
              <span className="text-white">Player A Payoff (+₹{currentGame.vStar.toLocaleString()}) + Player B Payoff (−₹{currentGame.vStar.toLocaleString()}) = ₹0 ✅</span>
            </div>
          </div>
        </section>

        {/* SECTION 3: Game Determinations & Fairness */}
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
                Strict Determination & Game Fairness Criteria
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-bold">Strictly Determined Games</span>
                <p className="text-slate-300 text-xs">
                  Games where Maximin = Minimax. Stable pure strategy saddle point exists at (i*, j*) with game value v* = a_i*j*.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-300 font-bold">Non-Strictly Determined Games</span>
                <p className="text-slate-300 text-xs">
                  Games where Maximin &lt; Minimax. Players randomize with optimal probability distributions p* and q*.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Zero-Sum Balance Scale SVG */}
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
                Two-Person Zero-Sum Conservation Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 180"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Balance Fulcrum */}
                <polygon points="370,110 350,150 390,150" fill="#475569" />
                <line x1="370" y1="110" x2="370" y2="150" stroke="#334155" strokeWidth="3" />

                {/* Balance Beam */}
                <line x1="150" y1="100" x2="590" y2="100" stroke="#38bdf8" strokeWidth="4" />

                {/* Left Pan: Player A */}
                <rect x="90" y="40" width="140" height="60" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <text x="160" y="65" fill="#f43f5e" fontSize="11" fontWeight="bold" textAnchor="middle">Player A Gain</text>
                <text x="160" y="85" fill="#ffffff" fontSize="10" fontFamily="monospace" textAnchor="middle">+₹v*</text>

                {/* Right Pan: Player B */}
                <rect x="510" y="40" width="140" height="60" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="580" y="65" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Player B Loss</text>
                <text x="580" y="85" fill="#ffffff" fontSize="10" fontFamily="monospace" textAnchor="middle">−₹v*</text>

                {/* Central Conservation Label */}
                <text x="370" y="80" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">
                  Sum = ₹0
                </text>
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
                Bengal Operations Research TPZSG Case Studies
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
                  trap: 'Assuming Every Zero-Sum Game Has a Pure Strategy Saddle Point',
                  fix: 'Many zero-sum games have Maximin < Minimax and require mixed strategies (randomization) to reach equilibrium.',
                },
                {
                  trap: 'Confusing Fair Games (v* = 0) with Symmetrical Games',
                  fix: 'A fair game has game value v* = 0; a symmetrical game has identical payoff matrices across players.',
                },
                {
                  trap: 'Forgetting that What Player A Wins, Player B Loses',
                  fix: 'Never create a separate payoff matrix for Player B in a zero-sum game; Player B’s payoff is strictly -a_ij.',
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
                  Think of the Minimax Theorem like a mathematical guarantee: no matter how cunning your opponent is, playing your optimal strategy guarantees that you will never receive less than v* in Indian Rupees (₹)!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how in a strictly determined game, neither player can gain by secretly changing their strategy: it is a rock-solid Nash equilibrium!
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
                Student Revision Checklist (Topic 4)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Defined Two-Person Zero-Sum Game and verified u_A + u_B = 0',
                'Understood John von Neumann’s Minimax Theorem: max min = min max = v*',
                'Distinguished Strictly Determined (saddle point) vs Non-Strictly Determined games',
                'Evaluated the Value of the Game v* and classified Fair Games (v* = 0)',
                'Converted Constant-Sum games to Zero-Sum games',
                'Stated strategic payoffs and game values in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: The Two-Person Zero-Sum Game is the crown jewel of classic Game Theory! Always remember: u_A + u_B = 0, the Minimax theorem guarantees a unique value v*, and fair games have v* = ₹0. In our next topic (Topic 5), we will explore the Interpretation of Payoff Entries in detail!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Two-Person Zero-Sum Game FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Two-Person Zero-Sum Game"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic5_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic4;
