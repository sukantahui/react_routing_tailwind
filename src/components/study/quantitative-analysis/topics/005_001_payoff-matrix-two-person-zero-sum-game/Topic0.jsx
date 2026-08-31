// src/components/study/quantitative-analysis/topics/005_001_payoff-matrix-two-person-zero-sum-game/Topic0.jsx
// React 19 Function-based Component
// Module: 005_001_payoff-matrix-two-person-zero-sum-game
// Topic 0: Introduction to Game Theory

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
  const [playerAStrategy, setPlayerAStrategy] = useState(0); // 0: Aggressive (A1), 1: Conservative (A2)
  const [playerBStrategy, setPlayerBStrategy] = useState(0); // 0: High Price (B1), 1: Low Price (B2)

  // 2x2 Payoff Matrix: Values are payoff to Player A in ₹
  // A1, B1: +₹50,000 | A1, B2: -₹20,000
  // A2, B1: +₹30,000 | A2, B2: +₹10,000
  const payoffMatrix = [
    [50000, -20000],
    [30000, 10000],
  ];

  const currentPayoffA = payoffMatrix[playerAStrategy][playerBStrategy];
  const currentPayoffB = -currentPayoffA; // Zero-Sum Game: Payoff B = -Payoff A

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

  const gameTaxonomy = [
    {
      title: '1. Zero-Sum vs Non-Zero-Sum',
      badge: 'Payoff Conservation',
      badgeColor: 'bg-rose-950 text-rose-300 border-rose-800',
      desc: 'In zero-sum games, sum of payoffs is strictly zero (Gain + Loss = 0). In non-zero-sum games, cooperation can create mutual gains or destructive price wars.',
      example: 'Tender bidding for fixed market share vs joint venture supply chain alliances.',
    },
    {
      title: '2. Cooperative vs Non-Cooperative',
      badge: 'Binding Contracts',
      badgeColor: 'bg-sky-950 text-sky-300 border-sky-800',
      desc: 'Non-cooperative games study independent, self-interested choices without binding agreements. Cooperative games allow enforceable legal contracts.',
      example: 'Antitrust market competition vs legal joint patent licensing.',
    },
    {
      title: '3. Simultaneous vs Sequential',
      badge: 'Move Timing',
      badgeColor: 'bg-purple-950 text-purple-300 border-purple-800',
      desc: 'Simultaneous games involve hidden, concurrent choices (Payoff Matrix). Sequential games involve turn-based visibility (Game Tree).',
      example: 'Sealed-bid auction vs chess or sequential commercial entry.',
    },
    {
      title: '4. Symmetric vs Asymmetric',
      badge: 'Strategy Uniformity',
      badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-800',
      desc: 'Symmetric games offer identical strategy choices and payoff structures to all players. Asymmetric games feature different roles and capacities.',
      example: 'Evenly matched retail chains vs dominant supplier negotiating with a local distributor.',
    },
  ];

  // Case Studies
  const caseStudies = [
    {
      title: '1. Foundry Tender Bidding War (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Modeled a two-firm competitive bidding tender for an Indian Railways casting contract in Barrackpore as a 2x2 zero-sum game, identifying optimal pricing in ₹ Lakhs.',
      lesson: 'Game theory enables contractors to anticipate rival bids and avoid the winner’s curse.',
    },
    {
      title: '2. Cold-Chain Vaccine Contract Negotiation (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Structured a commercial dispute over hospital vaccine cold-chain refrigeration breaches in Kolkata as a strategic game, analyzing settlement vs litigation outcomes in ₹.',
      lesson: 'Payoff matrices quantify settlement options to prevent costly courtroom litigation.',
    },
    {
      title: '3. Supermarket FMCG Retail Price Competition (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Analyzed competitive promotional discounts between two retail chains in Ichapur, proving that an uncoordinated price war caused non-zero-sum mutual margin erosion.',
      lesson: 'Strategic game analysis reveals destructive price war traps in competitive retail markets.',
    },
    {
      title: '4. Educational High-Tech Lab Patent Licensing (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Analyzed a university patent licensing dispute in Jadavpur, constructing a payoff matrix to negotiate a ₹55 Lakh cross-licensing royalty agreement.',
      lesson: 'Formal strategic modeling establishes win-win boundaries in intellectual property negotiation.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes gameGlow {
          0%, 100% { border-color: rgba(244, 63, 94, 0.3); }
          50% { border-color: rgba(244, 63, 94, 0.8); }
        }
        .glow-game {
          animation: gameGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-rose-950/80 text-rose-400 border border-rose-800/60">
              Segment 5 • Module 005_001 • Topic 0
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-rose-950/80 text-rose-400 border border-rose-800/60">
              Strategic Interaction • Game Taxonomy • Normal Form Matrices
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
            Introduction to Game Theory
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive foundation in <span className="text-rose-400 font-semibold">Game Theory</span>: understanding strategic interdependence among rational players, classifying <span className="text-sky-400 font-semibold">Zero-Sum vs Non-Zero-Sum Games</span>, constructing <span className="text-amber-400 font-semibold">Normal Form Payoff Matrices</span>, and analyzing strategic payoffs in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'game-theory-intro', label: '1. What is Game Theory?' },
              { id: 'interactive-simulator', label: '2. Strategic Decision Simulator' },
              { id: 'game-taxonomy', label: '3. Game Classifications' },
              { id: 'svg-normal-form', label: '4. Normal Form Architecture SVG' },
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
                    ? 'bg-rose-600 text-white border-rose-500 shadow-md shadow-rose-900/40'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </header>

        {/* SECTION 1: What is Game Theory? */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-600/20 text-rose-400 font-bold text-sm">
                01
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Foundations & Principles of Game Theory
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-rose-300 font-bold">1. Strategic Interdependence</span>
                <p className="text-slate-300">Your payoff depends directly on what opponents choose.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-sky-300 font-bold">2. Rationality Axiom</span>
                <p className="text-slate-300">Every player maximizes their own self-interested utility.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-amber-300 font-bold">3. Normal Form Matrix</span>
                <p className="text-slate-300">Compact m×n matrix displaying strategies and payoffs.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-emerald-300 font-bold">4. Zero-Sum Property</span>
                <p className="text-slate-300">Gain to Player A + Loss to Player B = 0 strictly.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Strategic Decision Simulator */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-game">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-600/20 text-rose-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Strategic Decision & Zero-Sum Payoff Sandbox
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Select strategies for Player A (Row Player) and Player B (Column Player) to explore the resulting payoff outcome:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                <span className="text-xs font-semibold text-rose-400">Player A Strategy (Row):</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPlayerAStrategy(0)}
                    className={clsx(
                      'w-1/2 py-2 rounded-lg text-xs font-semibold transition-all border',
                      playerAStrategy === 0
                        ? 'bg-rose-600 text-white border-rose-400 shadow-md'
                        : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
                    )}
                  >
                    A₁: Aggressive Bidding
                  </button>
                  <button
                    onClick={() => setPlayerAStrategy(1)}
                    className={clsx(
                      'w-1/2 py-2 rounded-lg text-xs font-semibold transition-all border',
                      playerAStrategy === 1
                        ? 'bg-rose-600 text-white border-rose-400 shadow-md'
                        : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
                    )}
                  >
                    A₂: Conservative Bidding
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                <span className="text-xs font-semibold text-sky-400">Player B Strategy (Column):</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPlayerBStrategy(0)}
                    className={clsx(
                      'w-1/2 py-2 rounded-lg text-xs font-semibold transition-all border',
                      playerBStrategy === 0
                        ? 'bg-sky-600 text-white border-sky-400 shadow-md'
                        : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
                    )}
                  >
                    B₁: High Price
                  </button>
                  <button
                    onClick={() => setPlayerBStrategy(1)}
                    className={clsx(
                      'w-1/2 py-2 rounded-lg text-xs font-semibold transition-all border',
                      playerBStrategy === 1
                        ? 'bg-sky-600 text-white border-sky-400 shadow-md'
                        : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
                    )}
                  >
                    B₂: Low Price
                  </button>
                </div>
              </div>
            </div>

            {/* Payoff Matrix Display */}
            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-center border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2 text-left">Player A \ Player B</th>
                    <th className={clsx('p-2', playerBStrategy === 0 ? 'text-sky-300 font-bold' : '')}>B₁ (High Price)</th>
                    <th className={clsx('p-2', playerBStrategy === 1 ? 'text-sky-300 font-bold' : '')}>B₂ (Low Price)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  <tr className={clsx(playerAStrategy === 0 ? 'bg-rose-950/20' : '')}>
                    <td className="p-3 text-left font-bold text-rose-300">A₁ (Aggressive)</td>
                    <td className={clsx('p-3 font-bold', playerAStrategy === 0 && playerBStrategy === 0 ? 'bg-rose-600/30 text-emerald-400 border-2 border-emerald-500 rounded' : 'text-slate-300')}>
                      +₹50,000
                    </td>
                    <td className={clsx('p-3 font-bold', playerAStrategy === 0 && playerBStrategy === 1 ? 'bg-rose-600/30 text-rose-400 border-2 border-rose-500 rounded' : 'text-slate-300')}>
                      −₹20,000
                    </td>
                  </tr>
                  <tr className={clsx(playerAStrategy === 1 ? 'bg-rose-950/20' : '')}>
                    <td className="p-3 text-left font-bold text-rose-300">A₂ (Conservative)</td>
                    <td className={clsx('p-3 font-bold', playerAStrategy === 1 && playerBStrategy === 0 ? 'bg-rose-600/30 text-emerald-400 border-2 border-emerald-500 rounded' : 'text-slate-300')}>
                      +₹30,000
                    </td>
                    <td className={clsx('p-3 font-bold', playerAStrategy === 1 && playerBStrategy === 1 ? 'bg-rose-600/30 text-emerald-400 border-2 border-emerald-500 rounded' : 'text-slate-300')}>
                      +₹10,000
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Zero-Sum Payoff Result Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs sm:text-sm">
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <span className="text-slate-400 font-sans text-xs">Player A Payoff:</span>
                <span className={clsx('font-bold text-lg', currentPayoffA >= 0 ? 'text-emerald-400' : 'text-rose-400')}>
                  {currentPayoffA >= 0 ? `+₹${currentPayoffA.toLocaleString()}` : `−₹${Math.abs(currentPayoffA).toLocaleString()}`}
                </span>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <span className="text-slate-400 font-sans text-xs">Player B Payoff:</span>
                <span className={clsx('font-bold text-lg', currentPayoffB >= 0 ? 'text-emerald-400' : 'text-rose-400')}>
                  {currentPayoffB >= 0 ? `+₹${currentPayoffB.toLocaleString()}` : `−₹${Math.abs(currentPayoffB).toLocaleString()}`}
                </span>
              </div>

              <div className="p-3.5 bg-emerald-950/60 rounded-xl border border-emerald-600 flex flex-col space-y-1">
                <span className="text-slate-300 font-sans text-xs">Zero-Sum Conservation:</span>
                <span className="text-emerald-300 font-bold text-lg">Payoff A + Payoff B = ₹0 ✅</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Game Classifications */}
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
                Taxonomy & Classifications of Strategic Games
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {gameTaxonomy.map((gt, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2 text-xs sm:text-sm">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <h3 className="font-bold text-white text-sm">{gt.title}</h3>
                    <span className={clsx('px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold border', gt.badgeColor)}>
                      {gt.badge}
                    </span>
                  </div>
                  <p className="text-slate-300">{gt.desc}</p>
                  <span className="text-amber-300 font-mono text-xs">🏷️ <strong>Example:</strong> {gt.example}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: Normal Form Architecture SVG */}
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
                Strategic Interaction & Normal Form Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 200"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Player A Box */}
                <rect x="50" y="40" width="160" height="120" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <text x="130" y="65" fill="#f43f5e" fontSize="11" fontWeight="bold" textAnchor="middle">PLAYER A (Row)</text>
                <text x="130" y="90" fill="#cbd5e1" fontSize="9" textAnchor="middle">Strategy A₁ (Aggressive)</text>
                <text x="130" y="110" fill="#cbd5e1" fontSize="9" textAnchor="middle">Strategy A₂ (Conservative)</text>
                <text x="130" y="140" fill="#a7f3d0" fontSize="9" textAnchor="middle">Maximin Utility</text>

                {/* Interaction Arrow */}
                <line x1="215" y1="100" x2="310" y2="100" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="310,100 300,95 300,105" fill="#38bdf8" />
                <text x="260" y="90" fill="#38bdf8" fontSize="9" textAnchor="middle">Strategic</text>
                <text x="260" y="115" fill="#38bdf8" fontSize="9" textAnchor="middle">Conflict</text>

                {/* Normal Form Matrix Box */}
                <rect x="320" y="30" width="220" height="140" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="430" y="55" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">2×2 PAYOFF MATRIX (₹)</text>
                <text x="380" y="90" fill="#ffffff" fontSize="10" fontFamily="monospace">a₁₁ = +₹50k</text>
                <text x="480" y="90" fill="#ffffff" fontSize="10" fontFamily="monospace">a₁₂ = −₹20k</text>
                <text x="380" y="130" fill="#ffffff" fontSize="10" fontFamily="monospace">a₂₁ = +₹30k</text>
                <text x="480" y="130" fill="#ffffff" fontSize="10" fontFamily="monospace">a₂₂ = +₹10k</text>

                {/* Interaction Arrow */}
                <line x1="635" y1="100" x2="545" y2="100" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="545,100 555,95 555,105" fill="#38bdf8" />

                {/* Player B Box */}
                <rect x="640" y="40" width="160" height="120" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="720" y="65" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">PLAYER B (Col)</text>
                <text x="720" y="90" fill="#cbd5e1" fontSize="9" textAnchor="middle">Strategy B₁ (High Price)</text>
                <text x="720" y="110" fill="#cbd5e1" fontSize="9" textAnchor="middle">Strategy B₂ (Low Price)</text>
                <text x="720" y="140" fill="#a7f3d0" fontSize="9" textAnchor="middle">Minimax Defense</text>
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
                Bengal Strategic Game Theory Case Studies
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
                  trap: 'Assuming Competitors Will Make Mistakes or Irrational Choices',
                  fix: 'Game theory assumes all players are completely rational and will choose the optimal counter-strategy against your move.',
                },
                {
                  trap: 'Confusing Zero-Sum Games with Non-Zero-Sum Games',
                  fix: 'In zero-sum games, sum of payoffs is strictly zero (pure conflict); in non-zero-sum games, cooperation can create win-win outcomes.',
                },
                {
                  trap: 'Misinterpreting Negative Payoffs in the Matrix',
                  fix: 'In standard two-person zero-sum matrices, matrix entry a_ij always represents Player A’s payoff; negative entries mean Player A pays Player B.',
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
                  Think of game theory as playing chess against a grandmaster: you cannot simply choose a move that works only if your opponent blunders; you must choose a move that is solid even when they make their best possible counter-move!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how the payoff matrix coordinates two independent minds into a single quantitative decision table in Indian Rupees (₹)!
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
                'Defined Game Theory and distinguished strategic interaction from single-agent optimization',
                'Identified the 5 core elements of a game: Players, Strategies, Information, Payoffs, Rationality',
                'Classified Zero-Sum vs Non-Zero-Sum, Cooperative vs Non-Cooperative, and Simultaneous vs Sequential games',
                'Understood the Normal Form Payoff Matrix convention for two-person zero-sum games',
                'Expressed all game payoffs and commercial values in Indian Rupees (₹)',
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
              "Welcome to Segment 5 (Game Theory), Debangshu, Mamata, Mahima, Susmita, and Abhronila! In Linear Programming and CPM/PERT, you optimized against passive nature. In Game Theory, you optimize against intelligent, rational human competitors! Master the Normal Form matrix and the Zero-Sum principle. In our next topic (Topic 1), we will dissect Players and Strategies in detail!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Introduction to Game Theory FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Introduction to Game Theory"
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
