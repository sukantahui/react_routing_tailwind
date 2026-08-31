// src/components/study/quantitative-analysis/topics/005_002_pure-strategy-and-saddle-point/Topic4.jsx
// React 19 Function-based Component
// Module: 005_002_pure-strategy-and-saddle-point
// Topic 4: Value of the game

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
  const [selectedPreset, setSelectedPreset] = useState(0);

  const presets = [
    {
      title: '1. Biased toward Player A (v* = +₹30k)',
      matrix: [
        [10, 20],
        [30, 40],
      ],
      vStar: 30000,
      status: 'Biased in Favor of Player A (+₹30,000)',
      statusColor: 'text-emerald-400',
      sidePayment: 'Player A must pay ₹30,000 to Player B upfront to make the game fair.',
    },
    {
      title: '2. Strictly Fair Game (v* = ₹0)',
      matrix: [
        [15, -15],
        [0, 20],
      ],
      vStar: 0,
      status: 'Strictly Fair Game (v* = ₹0)',
      statusColor: 'text-sky-300',
      sidePayment: 'No side payment required; the game is inherently equitable.',
    },
    {
      title: '3. Biased toward Player B (v* = −₹20k)',
      matrix: [
        [-20, -10],
        [-30, -25],
      ],
      vStar: -20000,
      status: 'Biased in Favor of Player B (Player A loses ₹20,000)',
      statusColor: 'text-rose-400',
      sidePayment: 'Player B must pay ₹20,000 to Player A upfront to make the game fair.',
    },
  ];

  const currentPre = presets[selectedPreset];
  const mat = currentPre.matrix;

  // Computations
  const rMins = mat.map((row) => Math.min(...row));
  const cMaxs = [0, 1].map((c) => Math.max(...mat.map((row) => row[c])));
  const vLower = Math.max(...rMins);
  const vUpper = Math.min(...cMaxs);

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
      title: '1. Foundry Tender Value Valuation (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Calculated v* = +₹30,000 for an Indian Railways casting tender in Barrackpore, proving that his foundry held a structural ₹30,000 competitive edge under optimal bidding.',
      lesson: 'The Value of the Game quantifies competitive advantage before bidding starts.',
    },
    {
      title: '2. Cold-Chain Vaccine Fair Contract Formulation (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Adjusted liquidated delay penalties in Kolkata to achieve a Fair Game (v* = ₹0), ensuring that neither the hospital nor the transport vendor suffered structural bias.',
      lesson: 'Fair games (v* = 0) create sustainable, long-term commercial partnerships.',
    },
    {
      title: '3. Supermarket FMCG Retail Advantage Valuation (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Analyzed promotional competition in Ichapur, determining v* = +₹18,000 in favor of Supermarket A due to superior prime retail real estate.',
      lesson: 'Structural physical advantages translate into positive game values.',
    },
    {
      title: '4. Educational High-Tech Lab Patent Licensing Royalties (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Calculated v* = ₹55 Lakh for a university nanotechnology patent licensing agreement in Jadavpur, securing a fair royalty distribution.',
      lesson: 'Objective game value determination simplifies institutional royalty audits.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes valueGlow {
          0%, 100% { border-color: rgba(56, 189, 248, 0.3); }
          50% { border-color: rgba(56, 189, 248, 0.8); }
        }
        .glow-value {
          animation: valueGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Segment 5 • Module 005_002 • Topic 4
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Game Value v* • Bounds v_lower ≤ v* ≤ v_upper • Fairness Spectrum
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
            Value of the Game
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive study of the <span className="text-sky-400 font-semibold">Value of the Game (v*)</span>: mathematical bounding (<span className="text-amber-400 font-mono">v_lower ≤ v* ≤ v_upper</span>), classifying <span className="text-emerald-400 font-semibold">Fair Games (v* = ₹0)</span> vs biased games, and side-payment compensation in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'vstar-foundations', label: '1. Value of Game Foundations' },
              { id: 'interactive-studio', label: '2. Fairness Spectrum Studio' },
              { id: 'bounding-theorems', label: '3. Fundamental Bounds & Shift' },
              { id: 'svg-spectrum', label: '4. Value Spectrum Architecture SVG' },
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

        {/* SECTION 1: Value of Game Foundations */}
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
                Value of the Game (v*) & Mathematical Properties
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-bold">1. Optimal Expected Return</span>
                <p className="text-slate-300 text-xs">
                  The expected payoff when both players play their optimal strategies.
                </p>
                <span className="text-sky-400 font-mono text-[11px]">v* = p*ᵀ A q*</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-300 font-bold">2. Bounding Interval</span>
                <p className="text-slate-300 text-xs">
                  v* is always bounded by v_lower (Maximin) and v_upper (Minimax).
                </p>
                <span className="text-amber-300 font-mono text-[11px]">v_lower ≤ v* ≤ v_upper</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-bold">3. Fairness Classification</span>
                <p className="text-slate-300 text-xs">
                  Fair if v* = ₹0; favors Player A if v* &gt; 0; favors Player B if v* &lt; 0.
                </p>
                <span className="text-emerald-400 font-mono text-[11px]">Equitable compensation benchmark.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Fairness Spectrum Studio */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-value">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Value of the Game & Fairness Studio
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {presets.map((pr, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedPreset(idx)}
                  className={clsx(
                    'px-4 py-2 rounded-xl text-xs font-semibold transition-all border text-left',
                    selectedPreset === idx
                      ? 'bg-sky-600 text-white border-sky-400 shadow-md'
                      : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
                  )}
                >
                  {pr.title}
                </button>
              ))}
            </div>

            {/* Matrix Display */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2 font-mono text-xs">
                <span className="text-sky-400 font-sans font-semibold">Payoff Matrix A (₹ Thousands):</span>
                <table className="w-full text-center border-collapse">
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

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2 text-xs sm:text-sm">
                <span className="text-xs font-semibold text-emerald-400">Game Valuation Summary:</span>
                <p className="text-slate-300 font-mono">
                  Lower Bound (v_lower): <span className="text-rose-400 font-bold">₹{vLower}k</span> | Upper Bound (v_upper): <span className="text-sky-400 font-bold">₹{vUpper}k</span>
                </p>
                <p className="text-white font-bold text-base font-mono">
                  Value of the Game (v*): <span className={currentPre.statusColor}>{currentPre.vStar >= 0 ? `+₹${currentPre.vStar.toLocaleString()}` : `−₹${Math.abs(currentPre.vStar).toLocaleString()}`}</span>
                </p>
                <p className="text-slate-300"><strong>Fairness Status:</strong> <span className={currentPre.statusColor}>{currentPre.status}</span></p>
                <div className="pt-2 border-t border-slate-800 text-amber-300 text-xs">
                  ⚖️ <strong>Side-Payment Equalizer:</strong> {currentPre.sidePayment}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Fundamental Bounds & Shift */}
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
                Fundamental Bounding Theorem & Shift Invariance
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                <span className="text-cyan-300 font-bold font-mono">v_lower ≤ v* ≤ v_upper</span>
                <p className="text-slate-300 text-xs">
                  The true game value is always trapped between the Maximin security floor and the Minimax liability ceiling.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                <span className="text-purple-300 font-bold font-mono">v'*(k, c) = k·v* + c</span>
                <p className="text-slate-300 text-xs">
                  Scaling all cells by k &gt; 0 and shifting by c transforms the game value linearly while preserving all optimal strategies.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Value Spectrum Architecture SVG */}
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
                Value of the Game Spectrum Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 160"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Number Line */}
                <line x1="80" y1="80" x2="660" y2="80" stroke="#475569" strokeWidth="4" />

                {/* v_lower Marker */}
                <circle cx="200" cy="80" r="8" fill="#f43f5e" />
                <text x="200" y="55" fill="#f43f5e" fontSize="10" fontWeight="bold" textAnchor="middle">v_lower (Maximin)</text>
                <text x="200" y="110" fill="#cbd5e1" fontSize="9" textAnchor="middle">Player A Floor</text>

                {/* Fair Point v=0 */}
                <line x1="370" y1="60" x2="370" y2="100" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3,3" />
                <text x="370" y="45" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">Fair Game (v* = ₹0)</text>

                {/* v_upper Marker */}
                <circle cx="540" cy="80" r="8" fill="#38bdf8" />
                <text x="540" y="55" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">v_upper (Minimax)</text>
                <text x="540" y="110" fill="#cbd5e1" fontSize="9" textAnchor="middle">Player B Ceiling</text>

                {/* Optimal v* Region */}
                <rect x="200" y="76" width="340" height="8" fill="#34d399" opacity="0.6" />
                <text x="370" y="135" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">
                  Interval of Possible Game Values: v_lower ≤ v* ≤ v_upper
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
                Bengal Operations Research Game Valuation Case Studies
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
                  trap: 'Assuming a Positive Value Means Player B Always Loses in Every Single Round',
                  fix: 'v* is the EXPECTED average value per round under optimal play; individual rounds can fluctuate.',
                },
                {
                  trap: 'Violating the Bound v_lower ≤ v* ≤ v_upper',
                  fix: 'The true game value MUST fall within [v_lower, v_upper]; any other result is an arithmetic error.',
                },
                {
                  trap: 'Forgetting That Fair Games Require Exactly v* = 0',
                  fix: 'A game is only strictly fair if v* = 0 in Indian Rupees (₹).',
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
                  Think of the Value of the Game like the fair ticket price to enter a game: if v* = +₹30k, Player A should pay an entrance fee of ₹30k to Player B to make the match completely fair!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how in strictly determined games, the lower bound and upper bound collapse into a single point: v_lower = v_upper = v*!
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
                'Defined Value of the Game v* as expected payoff under mutual optimal play',
                'Verified the fundamental bounds: v_lower ≤ v* ≤ v_upper',
                'Evaluated game fairness (Fair if v* = 0, biased toward A if v* > 0, toward B if v* < 0)',
                'Calculated the effect of linear transformations on game value: v\' = k·v* + c',
                'Reported game values and side payments in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: The Value of the Game v* is the definitive bottom line in strategic decision-making! Always verify that v_lower ≤ v* ≤ v_upper, and remember that fair games have v* = ₹0. In our next topic (Topic 5), we will formalize the exact extraction of Optimal Pure Strategies!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Value of the Game FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Value of the Game (Game Theory)"
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
