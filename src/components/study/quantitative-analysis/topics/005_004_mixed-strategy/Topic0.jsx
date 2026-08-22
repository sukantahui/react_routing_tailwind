// src/components/study/quantitative-analysis/topics/005_004_mixed-strategy/Topic0.jsx
// React 19 Function-based Component
// Module: 005_004_mixed-strategy
// Topic 0: Need for mixed strategies

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

  // Mode: 'deterministic' vs 'randomized'
  const [playMode, setPlayMode] = useState('deterministic');
  const [pureChoice, setPureChoice] = useState('A1');
  const [p1Probability, setP1Probability] = useState(0.5);

  // 2x2 Non-saddle payoff matrix (₹ Thousands)
  // A1: [20, -10], A2: [-10, 20]
  const matrix = [
    [20, -10],
    [-10, 20],
  ];

  // Expected payoffs under mixed strategy (p1, 1 - p1)
  const expAgainstB1 = p1Probability * matrix[0][0] + (1 - p1Probability) * matrix[1][0];
  const expAgainstB2 = p1Probability * matrix[0][1] + (1 - p1Probability) * matrix[1][1];

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
      title: '1. Foundry Night Patrol & Scrap Security (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Had 2 security patrol routes in Barrackpore. Deterministic patrols allowed metal thieves to steal alloy scrap. Randomizing patrols (50% Route 1, 50% Route 2) eliminated scrap theft completely, saving ₹40,000 monthly.',
      lesson: 'Randomized patrolling denies adversaries predictable windows of opportunity.',
    },
    {
      title: '2. Cold-Chain Vaccine Temperature Auditing (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Randomized hospital refrigerator audits (60% Morning, 40% Evening) in Kolkata. Hospital staff could no longer anticipate inspection hours, keeping compliance at 100% and preserving ₹2 Lakh vaccines.',
      lesson: 'Randomized inspection schedules maximize regulatory compliance.',
    },
    {
      title: '3. Supermarket FMCG Surprise Flash Sales (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Faced a rival retail chain in Ichapur. Deterministic weekend sales were matched and undercut. Randomizing surprise flash discounts (40% Friday, 60% Sunday) kept the competitor off-balance and boosted revenue by ₹25,000.',
      lesson: 'Mixed retail promotion schedules prevent competitor counter-pricing.',
    },
    {
      title: '4. Educational High-Tech Lab Patent Bidding (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Randomized patent claim defense postures (70% Technical, 30% Commercial) in Jadavpur, preventing the opposing legal team from anticipating litigation tactics and settling at ₹15 Lakh.',
      lesson: 'Mixed legal strategy profiles prevent strategic counter-adaptation.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes mixGlow {
          0%, 100% { border-color: rgba(14, 165, 233, 0.3); }
          50% { border-color: rgba(14, 165, 233, 0.8); }
        }
        .glow-mix {
          animation: mixGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Segment 5 • Module 005_004 • Topic 0
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Mixed Strategies • Non-Saddle Games • Randomization & Immunity
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Need for Mixed Strategies
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A foundational investigation into <span className="text-sky-400 font-semibold">Mixed Strategies</span>: understanding why pure strategies fail when <span className="text-amber-400 font-mono">Maximin &lt; Minimax</span>, overcoming predictability vulnerability through randomized play, and achieving informational immunity in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'mixed-philosophy', label: '1. Why Pure Strategies Fail' },
              { id: 'interactive-simulator', label: '2. Predictability vs Randomization' },
              { id: 'minimax-theorem', label: '3. Von Neumann Minimax Theorem' },
              { id: 'svg-instability', label: '4. Regret Cycle vs Mixed Stability SVG' },
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

        {/* SECTION 1: Why Pure Strategies Fail */}
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
                Why Pure Strategies Break Down (Maximin &lt; Minimax)
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-rose-400 font-bold">1. Non-Saddle Condition</span>
                <p className="text-slate-300 text-xs">
                  When Maximin (α) &lt; Minimax (β), no pure saddle point exists.
                </p>
                <span className="text-rose-400 font-mono text-[11px]">α &lt; β ⟹ Pure Nash Fails</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-300 font-bold">2. Information Leakage</span>
                <p className="text-slate-300 text-xs">
                  Playing deterministically allows the opponent to predict and minimize your payoff.
                </p>
                <span className="text-amber-300 font-mono text-[11px]">Deterministic = Exploitable</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-bold">3. Randomized Immunity</span>
                <p className="text-slate-300 text-xs">
                  Randomizing moves according to optimal probability p* guarantees expected value v*.
                </p>
                <span className="text-emerald-400 font-mono text-[11px]">Unpredictable = Secure in ₹</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Predictability vs Randomization Simulator */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-mix">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                  02
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Interactive Predictability vs Randomization Simulator
                </h2>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setPlayMode('deterministic')}
                  className={clsx(
                    'px-3 py-1 rounded-lg text-xs font-semibold border transition-all',
                    playMode === 'deterministic'
                      ? 'bg-rose-600 text-white border-rose-500'
                      : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
                  )}
                >
                  1. Deterministic Mode
                </button>
                <button
                  onClick={() => setPlayMode('randomized')}
                  className={clsx(
                    'px-3 py-1 rounded-lg text-xs font-semibold border transition-all',
                    playMode === 'randomized'
                      ? 'bg-emerald-600 text-white border-emerald-500'
                      : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
                  )}
                >
                  2. Randomized Mode
                </button>
              </div>
            </div>

            {/* Payoff Matrix Table */}
            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3 font-mono text-xs sm:text-sm">
              <table className="w-full text-center border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2 text-left">Player A \ Player B</th>
                    <th className="p-2 text-sky-400">B₁ (Action 1)</th>
                    <th className="p-2 text-sky-400">B₂ (Action 2)</th>
                    <th className="p-2 text-slate-400">Row Minimum</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-200">
                  <tr className={clsx(playMode === 'deterministic' && pureChoice === 'A1' ? 'bg-rose-950/40' : '')}>
                    <td className="p-2 text-left font-bold text-rose-300">A₁</td>
                    <td className="p-2 font-bold text-emerald-400">+₹20k</td>
                    <td className="p-2 font-bold text-rose-400">-₹10k</td>
                    <td className="p-2 text-rose-400">-₹10k</td>
                  </tr>
                  <tr className={clsx(playMode === 'deterministic' && pureChoice === 'A2' ? 'bg-rose-950/40' : '')}>
                    <td className="p-2 text-left font-bold text-rose-300">A₂</td>
                    <td className="p-2 font-bold text-rose-400">-₹10k</td>
                    <td className="p-2 font-bold text-emerald-400">+₹20k</td>
                    <td className="p-2 text-rose-400">-₹10k</td>
                  </tr>
                  <tr className="border-t-2 border-slate-700 bg-slate-900/40 font-bold">
                    <td className="p-2 text-left text-slate-400">Col Maximum</td>
                    <td className="p-2 text-sky-400">+₹20k</td>
                    <td className="p-2 text-sky-400">+₹20k</td>
                    <td className="p-2 text-amber-400">Maximin: -₹10k &lt; Minimax: +₹20k</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Interactive Mode Content */}
            {playMode === 'deterministic' ? (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-3 text-xs sm:text-sm">
                <span className="text-rose-400 font-bold text-sm">Deterministic Strategy Test:</span>
                <p className="text-slate-300">
                  Select Player A's fixed deterministic choice. The rational opponent will anticipate and counter it:
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setPureChoice('A1')}
                    className={clsx(
                      'px-4 py-2 rounded-xl text-xs font-semibold border transition-all',
                      pureChoice === 'A1'
                        ? 'bg-rose-600 text-white border-rose-500'
                        : 'bg-slate-900 text-slate-400 border-slate-700'
                    )}
                  >
                    Play Pure Strategy A₁ Always
                  </button>
                  <button
                    onClick={() => setPureChoice('A2')}
                    className={clsx(
                      'px-4 py-2 rounded-xl text-xs font-semibold border transition-all',
                      pureChoice === 'A2'
                        ? 'bg-rose-600 text-white border-rose-500'
                        : 'bg-slate-900 text-slate-400 border-slate-700'
                    )}
                  >
                    Play Pure Strategy A₂ Always
                  </button>
                </div>
                <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-800/60 text-rose-300 font-mono text-xs">
                  ⚠️ <strong>Adversary Exploitation:</strong> When you deterministically play <strong>{pureChoice}</strong>, Player B plays <strong>{pureChoice === 'A1' ? 'B₂' : 'B₁'}</strong>. ➔ Result: You lose <strong>₹10,000</strong> every single round!
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-sky-400 font-bold">Probability p₁ (Play A₁) = {p1Probability.toFixed(2)}</span>
                  <span className="text-purple-400 font-bold">Probability (1 − p₁) (Play A₂) = {(1 - p1Probability).toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={p1Probability}
                  onChange={(e) => setP1Probability(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-mono text-xs">
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col">
                    <span className="text-slate-400">Expected Payoff vs Player B playing B₁:</span>
                    <span className={clsx('font-bold text-sm', expAgainstB1 >= 0 ? 'text-emerald-400' : 'text-rose-400')}>
                      {expAgainstB1 >= 0 ? `+₹${expAgainstB1.toFixed(1)}k` : `-₹${Math.abs(expAgainstB1).toFixed(1)}k`}
                    </span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col">
                    <span className="text-slate-400">Expected Payoff vs Player B playing B₂:</span>
                    <span className={clsx('font-bold text-sm', expAgainstB2 >= 0 ? 'text-emerald-400' : 'text-rose-400')}>
                      {expAgainstB2 >= 0 ? `+₹${expAgainstB2.toFixed(1)}k` : `-₹${Math.abs(expAgainstB2).toFixed(1)}k`}
                    </span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-800/60 text-emerald-300 font-mono text-xs">
                  {p1Probability === 0.5 ? (
                    <span>
                      🎯 <strong>Optimal Equilibrium:</strong> At p₁* = 0.50, Expected Payoff is <strong>+₹5,000</strong> against BOTH B₁ and B₂! Player B can no longer exploit you!
                    </span>
                  ) : (
                    <span>
                      Move slider to <strong>0.50</strong> to equalize expected payoffs and achieve perfect equilibrium immunity!
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* SECTION 3: Von Neumann Minimax Theorem */}
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
                John von Neumann's Minimax Theorem (1928)
              </h2>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-3 text-xs sm:text-sm">
              <p className="text-slate-300 leading-relaxed">
                The Minimax Theorem guarantees that for <strong>every finite two-person zero-sum game</strong>, there exist optimal mixed strategies <span className="text-emerald-400 font-mono font-bold">p*</span> and <span className="text-sky-400 font-mono font-bold">q*</span> such that:
              </p>
              <div className="p-3 bg-slate-900 rounded-lg text-center font-mono font-bold text-amber-300 text-sm">
                max_p min_q E(p, q) = min_q max_p E(p, q) = v* &nbsp; (in ₹)
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Regret Cycle vs Mixed Stability SVG */}
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
                Pure Strategy Regret Cycle vs Mixed Strategy Equilibrium
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 180"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Left: Pure Regret Cycle */}
                <rect x="30" y="30" width="310" height="120" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <text x="185" y="55" fill="#f43f5e" fontSize="11" fontWeight="bold" textAnchor="middle">Pure Strategy Regret Loop (α &lt; β)</text>
                <text x="185" y="80" fill="#fca5a5" fontSize="9" textAnchor="middle">A plays A₁ ➔ B counters B₂ (-₹10k)</text>
                <text x="185" y="100" fill="#fca5a5" fontSize="9" textAnchor="middle">A shifts A₂ ➔ B counters B₁ (-₹10k)</text>
                <text x="185" y="120" fill="#f87171" fontSize="9" textAnchor="middle">🔄 Endless Unilateral Deviation Cycle</text>

                {/* Right: Mixed Equilibrium */}
                <rect x="400" y="30" width="310" height="120" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="555" y="55" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">Mixed Strategy Equilibrium Stability</text>
                <text x="555" y="80" fill="#ffffff" fontSize="9" textAnchor="middle">Player A plays p* = [0.5, 0.5]ᵀ</text>
                <text x="555" y="100" fill="#ffffff" fontSize="9" textAnchor="middle">Player B plays q* = [0.5, 0.5]ᵀ</text>
                <text x="555" y="120" fill="#fde68a" fontSize="9" textAnchor="middle">🎯 Expected Value v* = +₹5,000 Guaranteed!</text>
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
                Bengal Operations Research Mixed Strategy Case Studies
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
                  trap: 'Playing a Pure Strategy in a Non-Saddle Game (Maximin < Minimax)',
                  fix: 'When no saddle point exists, pure strategies are vulnerable to prediction; you must randomize play.',
                },
                {
                  trap: 'Confusing Mixed Strategies with Erratic Guessing',
                  fix: 'A mixed strategy is executing mathematically calculated optimal probabilities (p1*, p2*) using a randomizing device.',
                },
                {
                  trap: 'Using Probabilities that Do Not Sum to 1.0',
                  fix: 'Probabilities must satisfy p1 + p2 = 1.0 and p_i ≥ 0.',
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
                  Think of rock-paper-scissors: if you always throw 'Rock', your opponent will always throw 'Paper' and win every time! The only defense is randomizing with 1/3 probability each!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how randomizing at p₁* = 0.50 equalizes your expected payoff across all opponent moves, rendering opponent prediction completely useless!
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
                'Recognized the failure of pure strategies when Maximin < Minimax',
                'Understood information leakage and predictability vulnerability',
                'Defined the probability mixture vectors p and q on the unit simplex',
                'Understood how randomization provides informational immunity',
                'Reported expected payoffs and game values in Indian Rupees (₹)',
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
              "Welcome to Module 005_004 (Mixed Strategies), Debangshu, Mamata, Mahima, Susmita, and Abhronila! When Maximin < Minimax, pure strategies fail due to predictability. Mixed strategies are your mathematical armor: randomize your moves according to optimal probabilities, and you will guarantee the Expected Value of the Game in ₹. In our next topic (Topic 1), we will formalize Probability Distributions over strategy sets!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Need for Mixed Strategies FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Need for Mixed Strategies (Game Theory)"
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
