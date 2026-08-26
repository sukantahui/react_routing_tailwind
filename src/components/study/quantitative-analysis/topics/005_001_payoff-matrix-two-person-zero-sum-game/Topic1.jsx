// src/components/study/quantitative-analysis/topics/005_001_payoff-matrix-two-person-zero-sum-game/Topic1.jsx
// React 19 Function-based Component
// Module: 005_001_payoff-matrix-two-person-zero-sum-game
// Topic 1: Players and strategies

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

  // Mixed Strategy Probabilities
  const [probA1, setProbA1] = useState(0.6); // Player A plays A1 with prob p, A2 with (1-p)
  const [probB1, setProbB1] = useState(0.5); // Player B plays B1 with prob q, B2 with (1-q)

  const probA2 = 1 - probA1;
  const probB2 = 1 - probB1;

  // Payoff Matrix (₹)
  // A1, B1: ₹50,000 | A1, B2: -₹20,000
  // A2, B1: ₹30,000 | A2, B2: ₹10,000
  const a11 = 50000;
  const a12 = -20000;
  const a21 = 30000;
  const a22 = 10000;

  // Expected Value Calculation: E(p, q) = p*q*a11 + p*(1-q)*a12 + (1-p)*q*a21 + (1-p)*(1-q)*a22
  const expectedPayoffA =
    probA1 * probB1 * a11 +
    probA1 * probB2 * a12 +
    probA2 * probB1 * a21 +
    probA2 * probB2 * a22;

  const expectedPayoffB = -expectedPayoffA;

  const isPureA = probA1 === 1 || probA1 === 0;
  const isPureB = probB1 === 1 || probB1 === 0;

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
      title: '1. Foundry Tender Bidding Strategy (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Evaluated a pure strategy (fixed discount bidding) vs a mixed strategy (randomizing discounts between ₹20,000 and ₹50,000) in Barrackpore, preventing competitors from guessing bids.',
      lesson: 'Randomizing mixed strategies prevents competitors from predicting and undercutting pricing.',
    },
    {
      title: '2. Cold-Chain Vaccine Facility Supplier Strategy (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Modeled backup refrigeration vendor options as a 2x2 strategic game in Kolkata, identifying a dominant strategy in backup solar generators over diesel engines.',
      lesson: 'Strictly dominant strategies eliminate decision ambiguity and protect patient lives.',
    },
    {
      title: '3. Supermarket FMCG Retail Marketing Mix Strategy (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Analyzed promotional discount schedules between two competing supermarkets in Ichapur, proving that adopting a mixed advertising strategy (60% weekend vs 40% weekday) stabilized footfall revenue.',
      lesson: 'Mixed strategy probability distributions smooth out customer demand fluctuations.',
    },
    {
      title: '4. Educational High-Tech Lab Research Grant Consortium (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Analyzed strategy sets for university patent licensing in Jadavpur, identifying that cross-licensing strictly dominated litigation in a ₹55 Lakh nanotechnology dispute.',
      lesson: 'Dominance elimination clarifies optimal paths in complex legal intellectual property negotiations.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes stratGlow {
          0%, 100% { border-color: rgba(56, 189, 248, 0.3); }
          50% { border-color: rgba(56, 189, 248, 0.8); }
        }
        .glow-strat {
          animation: stratGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Segment 5 • Module 005_001 • Topic 1
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Player Roles • Pure vs Mixed Strategies • Dominance Principles
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Players and Strategies
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive study of <span className="text-sky-400 font-semibold">Players and Strategies</span> in Game Theory: distinguishing the <span className="text-rose-400 font-semibold">Row Maximizer (Player A)</span> from the <span className="text-cyan-400 font-semibold">Column Minimizer (Player B)</span>, mastering <span className="text-amber-400 font-semibold">Pure vs Mixed Strategies</span>, and calculating Expected Payoffs in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'player-roles', label: '1. Player Roles & Strategy Concepts' },
              { id: 'mixed-strategy-sim', label: '2. Pure vs Mixed Strategy Simulator' },
              { id: 'dominance-concept', label: '3. Dominant vs Dominated Strategies' },
              { id: 'svg-strategies', label: '4. Strategy Space SVG' },
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

        {/* SECTION 1: Player Roles & Strategy Concepts */}
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
                Player Roles & Strategy Classifications
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-rose-300 font-bold">1. Player A (Row Maximizer)</span>
                <p className="text-slate-300">Aims to maximize the minimum gain (Maximin Criterion).</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-sky-300 font-bold">2. Player B (Col Minimizer)</span>
                <p className="text-slate-300">Aims to minimize the maximum payout (Minimax Criterion).</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-amber-300 font-bold">3. Pure Strategy (p = 1.0)</span>
                <p className="text-slate-300">Deterministic selection of a single action with certainty.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-emerald-300 font-bold">4. Mixed Strategy (Σ p_i = 1)</span>
                <p className="text-slate-300">Randomizing over actions to eliminate predictability.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Pure vs Mixed Strategy Simulator */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-strat">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Pure vs Mixed Strategy Expected Payoff Simulator
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Adjust probability sliders for Player A (p) and Player B (q) to observe the resulting Expected Payoff in Indian Rupees (₹):
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-rose-400">Player A Strategy Probability (p):</span>
                  <span className="font-mono text-white font-bold">
                    p(A₁) = {(probA1 * 100).toFixed(0)}% | p(A₂) = {(probA2 * 100).toFixed(0)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={probA1}
                  onChange={(e) => setProbA1(Number(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer"
                />
                <span className="text-[11px] text-slate-400 font-mono">
                  {isPureA ? '⚡ Player A is playing a PURE STRATEGY' : '🎲 Player A is playing a MIXED STRATEGY'}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-sky-400">Player B Strategy Probability (q):</span>
                  <span className="font-mono text-white font-bold">
                    q(B₁) = {(probB1 * 100).toFixed(0)}% | q(B₂) = {(probB2 * 100).toFixed(0)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={probB1}
                  onChange={(e) => setProbB1(Number(e.target.value))}
                  className="w-full accent-sky-500 cursor-pointer"
                />
                <span className="text-[11px] text-slate-400 font-mono">
                  {isPureB ? '⚡ Player B is playing a PURE STRATEGY' : '🎲 Player B is playing a MIXED STRATEGY'}
                </span>
              </div>
            </div>

            {/* Expected Payoff Results */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs sm:text-sm">
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <span className="text-slate-400 font-sans text-xs">Expected Payoff to Player A:</span>
                <span className={clsx('font-bold text-lg', expectedPayoffA >= 0 ? 'text-emerald-400' : 'text-rose-400')}>
                  {expectedPayoffA >= 0 ? `+₹${expectedPayoffA.toLocaleString(undefined, { maximumFractionDigits: 0 })}` : `−₹${Math.abs(expectedPayoffA).toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
                </span>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <span className="text-slate-400 font-sans text-xs">Expected Payoff to Player B:</span>
                <span className={clsx('font-bold text-lg', expectedPayoffB >= 0 ? 'text-emerald-400' : 'text-rose-400')}>
                  {expectedPayoffB >= 0 ? `+₹${expectedPayoffB.toLocaleString(undefined, { maximumFractionDigits: 0 })}` : `−₹${Math.abs(expectedPayoffB).toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
                </span>
              </div>

              <div className="p-3.5 bg-emerald-950/60 rounded-xl border border-emerald-600 flex flex-col space-y-1">
                <span className="text-slate-300 font-sans text-xs">Zero-Sum Expectation:</span>
                <span className="text-emerald-300 font-bold text-lg">E(A) + E(B) = ₹0 ✅</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Dominant vs Dominated Strategies */}
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
                Dominant vs Dominated Strategies
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                <span className="text-emerald-400 font-bold">1. Strictly Dominant Strategy</span>
                <p className="text-slate-300 text-xs">
                  A strategy that yields a strictly higher payoff than any alternative strategy against EVERY possible opponent choice.
                </p>
                <span className="text-amber-300 font-mono text-[11px]">Rule: Rational players ALWAYS play dominant strategies.</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                <span className="text-rose-400 font-bold">2. Dominated Strategy</span>
                <p className="text-slate-300 text-xs">
                  A strategy that yields an equal or worse payoff than another strategy across all opponent actions.
                </p>
                <span className="text-cyan-300 font-mono text-[11px]">Rule: Can be safely ELIMINATED from the payoff matrix.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Strategy Space SVG */}
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
                Pure vs Mixed Strategy Space Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 200"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Pure Strategy Representation */}
                <rect x="50" y="40" width="280" height="120" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="190" y="65" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">PURE STRATEGY (Deterministic)</text>
                <text x="190" y="95" fill="#cbd5e1" fontSize="9" textAnchor="middle">Probability Vector: p = (1.0, 0.0)</text>
                <text x="190" y="120" fill="#a7f3d0" fontSize="9" textAnchor="middle">100% Certain Choice of Action A₁</text>
                <text x="190" y="145" fill="#fde68a" fontSize="8" textAnchor="middle">Used when Saddle Point exists!</text>

                {/* Mixed Strategy Representation */}
                <rect x="410" y="40" width="280" height="120" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="550" y="65" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">MIXED STRATEGY (Probabilistic)</text>
                <text x="550" y="95" fill="#cbd5e1" fontSize="9" textAnchor="middle">Probability Vector: p = (p₁, p₂) with Σ pᵢ = 1</text>
                <text x="550" y="120" fill="#a7f3d0" fontSize="9" textAnchor="middle">Randomizes actions (e.g. 60% A₁, 40% A₂)</text>
                <text x="550" y="145" fill="#fde68a" fontSize="8" textAnchor="middle">Eliminates predictability in games without saddle point!</text>
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
                Bengal Operations Research Strategy Case Studies
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
                  trap: 'Violating Probability Normalization (Probabilities Not Summing to 1.0)',
                  fix: 'Every mixed strategy vector p MUST satisfy sum(p_i) = 1.0 exactly with all p_i ≥ 0.',
                },
                {
                  trap: 'Confusing Player A (Row Maximizer) and Player B (Column Minimizer) Objectives',
                  fix: 'Player A aims to MAXIMIZE payoffs; Player B aims to MINIMIZE payouts.',
                },
                {
                  trap: 'Playing Dominated Strategies in Competitive Games',
                  fix: 'Dominated strategies should be removed from the matrix because rational players will never choose them.',
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
                  Think of mixed strategies like a football penalty shootout: if the kicker always kicks to the left (pure strategy), the goalkeeper will simply dive left! The kicker MUST randomize to keep the goalkeeper guessing.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how setting p₁ = 1.0 converts the mixed strategy into a pure strategy: pure strategies are simply extreme corner points of the mixed strategy space!
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
                'Defined Player and distinguished Row Maximizer (Player A) vs Column Minimizer (Player B)',
                'Defined Strategy as a complete pre-formulated contingency plan',
                'Distinguished Pure Strategy (p = 1.0) vs Mixed Strategy (Σ p_i = 1.0)',
                'Identified Strictly Dominant and Dominated strategies',
                'Calculated expected payoffs E(p, q) in Indian Rupees (₹)',
                'Verified zero-sum conservation: E(A) + E(B) = 0',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: mastering Players and Strategies is your gateway to game-theoretic thinking! Remember: Player A maximizes using Maximin, Player B minimizes using Minimax, and mixed strategies introduce deliberate randomness to eliminate predictability. In our next topic (Topic 2), we will explore the formal Payoff Concept in depth!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Players and Strategies FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Players and Strategies (Game Theory)"
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
