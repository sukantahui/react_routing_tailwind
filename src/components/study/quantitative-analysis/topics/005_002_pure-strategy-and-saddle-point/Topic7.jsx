// src/components/study/quantitative-analysis/topics/005_002_pure-strategy-and-saddle-point/Topic7.jsx
// React 19 Function-based Component
// Module: 005_002_pure-strategy-and-saddle-point
// Topic 7: Short Questions

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
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

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

  const flashcards = [
    {
      topic: 'Topic 0: Pure Strategy',
      q: 'What is a Pure Strategy and how is it represented mathematically?',
      a: 'A deterministic decision rule where a player commits 100% probability to a single action (p = 1.0), represented as a standard unit basis vector p = e_k. It represents an extreme corner vertex of the strategy simplex.',
      formula: 'p = (0, ..., 1, ..., 0)ᵀ | p_k = 1.0',
    },
    {
      topic: 'Topic 1: Maximin Principle',
      q: 'What is the Maximin Principle and how does Player A use it to guarantee security?',
      a: 'Adopted by Player A (Row Maximizer): calculates row minima min_j a_ij horizontally, then selects the maximum: Maximin (α) = max_i [ min_j a_ij ] = v_lower in ₹. Guarantees actual payoff ≥ v_lower.',
      formula: 'α = max_i [ min_j a_ij ] = v_lower (Security Floor)',
    },
    {
      topic: 'Topic 2: Minimax Principle',
      q: 'What is the Minimax Principle and how does Player B use it to cap liability?',
      a: 'Adopted by Player B (Column Minimizer): calculates column maxima max_i a_ij vertically, then selects the minimum: Minimax (β) = min_j [ max_i a_ij ] = v_upper in ₹. Guarantees actual payout ≤ v_upper.',
      formula: 'β = min_j [ max_i a_ij ] = v_upper (Liability Ceiling)',
    },
    {
      topic: 'Topic 3: Saddle Point',
      q: 'What are the defining mathematical criteria and Nash stability conditions of a Saddle Point?',
      a: 'A cell (i*, j*) whose entry is simultaneously the minimum in its row and maximum in its column, satisfying: Maximin = Minimax = a_i*j* = v*. Nash stability: a_i,j* ≤ a_i*,j* ≤ a_i*,j.',
      formula: 'Maximin == Minimax == v* | a_i,j* ≤ v* ≤ a_i*,j',
    },
    {
      topic: 'Topic 4: Value of the Game',
      q: 'What is the Value of the Game (v*) and how are Fair Games defined?',
      a: 'v* is the expected monetary return under mutual optimal play in ₹, bounded by v_lower ≤ v* ≤ v_upper. A game is strictly FAIR if and only if v* = ₹0.',
      formula: 'v_lower ≤ v* ≤ v_upper | Fair Game: v* = ₹0',
    },
    {
      topic: 'Topic 5: Optimal Pure Strategies',
      q: 'What is the 5-step algorithm to extract Optimal Pure Strategies?',
      a: '1. Row Minima ➔ 2. Maximin row i* ➔ 3. Col Maxima ➔ 4. Minimax col j* ➔ 5. Verify α == β == v*. Then (A_i*, B_j*) is optimal with basis vectors p* = e_i* and q* = e_j*.',
      formula: 'Profile: (A_i*, B_j*) | Vectors: p* = e_i*, q* = e_j*',
    },
    {
      topic: 'Topic 6: Numerical Resolution',
      q: 'How are multiple saddle points and negative payoffs resolved in numerical matrix games?',
      a: 'Negative payoffs are evaluated using standard real number inequalities (-20 < -10 < +5). Multiple saddle points form an interchangeable equilibrium grid, all yielding the exact same game value v*.',
      formula: 'Multi-Saddles: v*(Saddle₁) == v*(Saddle₂) == ... == v*',
    },
  ];

  const currentCard = flashcards[flashcardIndex];

  // Case Studies
  const caseStudies = [
    {
      title: '1. Precision Foundry Master Casting Tender (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Evaluated a ₹5 Lakh casting tender in Barrackpore, using the 5-step algorithm to identify optimal strategy A2 (Medium Overtime), locking in ₹30,000 pure profit.',
      lesson: 'Complete module synthesis ensures optimal real-world decision-making.',
    },
    {
      title: '2. Cold-Chain Vaccine Facility Damage Settlement (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Proved that a pure saddle point of ₹25,000 at (A2, B2) in Kolkata established an equitable out-of-court settlement, saving ₹50,000 in litigation fees.',
      lesson: 'Pure strategy equilibria resolve high-stakes institutional disputes.',
    },
    {
      title: '3. Supermarket FMCG Retail Multi-Saddle Campaign (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Analyzed twin saddle points in Ichapur yielding identical ₹40,000 returns, giving store management operational flexibility during weekend promotions.',
      lesson: 'Multiple saddle points offer managerial choice with zero loss of expected return.',
    },
    {
      title: '4. Educational High-Tech Lab Patent Licensing Royalties (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Calculated a pure saddle point of ₹55 Lakh in mutual research value in Jadavpur, providing university auditors with a certified mathematical settlement.',
      lesson: 'Rigorous game-theoretic modeling provides audit-proof commercial terms.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes masterGlow2 {
          0%, 100% { border-color: rgba(234, 179, 8, 0.3); }
          50% { border-color: rgba(234, 179, 8, 0.8); }
        }
        .glow-master2 {
          animation: masterGlow2 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-amber-950/80 text-amber-400 border border-amber-800/60">
              Segment 5 • Module 005_002 • Topic 7 (Final Master Review)
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-amber-950/80 text-amber-400 border border-amber-800/60">
              Comprehensive Viva Voce • 8-Topic Master Blueprint • Flashcards
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Short Questions & Master Synthesis
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            The grand capstone and master review for <span className="text-amber-400 font-semibold">Module 005_002 (Pure Strategy & Saddle Point)</span>: comprehensive <span className="text-emerald-400 font-semibold">Viva Voce Flashcards</span> covering all 7 prior topics, the <span className="text-sky-400 font-semibold">Master Formula & Theorem Reference Table</span>, and complete strategic governance in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'flashcard-deck', label: '1. Master Flashcard Deck' },
              { id: 'formula-matrix', label: '2. Master Formula Table' },
              { id: 'module-blueprint', label: '3. 8-Topic Architecture SVG' },
              { id: 'case-studies', label: '4. Master Case Studies' },
              { id: 'pitfalls', label: '5. Master Traps & Pitfalls' },
              { id: 'checklist', label: '6. Master Certification Checklist' },
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
              >
                {item.label}
              </button>
            ))}
          </div>
        </header>

        {/* SECTION 1: Master Flashcard Deck */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-master2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 font-bold text-sm">
                  01
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Interactive Master Flashcard Deck (7 Topics)
                </h2>
              </div>
              <span className="text-xs font-mono text-amber-400 font-semibold">
                Card {flashcardIndex + 1} of {flashcards.length}
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs uppercase tracking-wider font-bold text-amber-400 font-mono">
                  {currentCard.topic}
                </span>
                <button
                  onClick={() => setShowAnswer(!showAnswer)}
                  className="px-3 py-1 bg-amber-950 text-amber-300 border border-amber-800 rounded-lg text-xs font-semibold hover:bg-amber-900 transition-all"
                >
                  {showAnswer ? 'Hide Answer 👁️' : 'Reveal Answer 🔍'}
                </button>
              </div>

              <p className="text-base sm:text-lg font-semibold text-white leading-relaxed">
                {currentCard.q}
              </p>

              {showAnswer && (
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col space-y-2 text-xs sm:text-sm">
                  <p className="text-emerald-300 leading-relaxed font-sans">{currentCard.a}</p>
                  <div className="pt-2 border-t border-slate-800 text-amber-300 font-mono text-xs">
                    📐 <strong>Governing Formulation:</strong> {currentCard.formula}
                  </div>
                </div>
              )}
            </div>

            {/* Flashcard Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  setShowAnswer(false);
                  setFlashcardIndex((prev) => (prev > 0 ? prev - 1 : flashcards.length - 1));
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 text-xs font-semibold"
              >
                ◀ Previous Card
              </button>
              <button
                onClick={() => {
                  setShowAnswer(false);
                  setFlashcardIndex((prev) => (prev < flashcards.length - 1 ? prev + 1 : 0));
                }}
                className="px-4 py-2 rounded-xl bg-amber-600 text-white border border-amber-500 hover:bg-amber-500 text-xs font-semibold"
              >
                Next Card ▶
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 2: Master Formula Table */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Master Mathematical Formula & Theorem Reference Table
              </h2>
            </div>

            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold font-sans">
                    <th className="p-2.5">Concept / Parameter</th>
                    <th className="p-2.5 text-amber-400">Mathematical Formula / Governing Theorem</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Pure Strategy Basis Vector (A)</td>
                    <td className="p-2.5 text-emerald-300">p = (0, ..., 1, ..., 0)ᵀ  (where p_i* = 1.0)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Pure Strategy Basis Vector (B)</td>
                    <td className="p-2.5 text-sky-300">q = (0, ..., 1, ..., 0)ᵀ  (where q_j* = 1.0)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Row Minimum (Security Floor)</td>
                    <td className="p-2.5 text-rose-300">Row Min_i = min_j a_ij</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Column Maximum (Liability Ceiling)</td>
                    <td className="p-2.5 text-purple-300">Col Max_j = max_i a_ij</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Maximin Value (v_lower)</td>
                    <td className="p-2.5 text-rose-400 font-bold">α = max_i [ min_j a_ij ]</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Minimax Value (v_upper)</td>
                    <td className="p-2.5 text-sky-400 font-bold">β = min_j [ max_i a_ij ]</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Universal Invariant Inequality</td>
                    <td className="p-2.5 text-amber-400 font-bold">Maximin ≤ Minimax   &lt;==&gt;   v_lower ≤ v_upper</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Saddle Point Condition</td>
                    <td className="p-2.5 text-emerald-400 font-bold">Maximin == Minimax == v*   (at cell (i*, j*))</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Nash Stability Condition</td>
                    <td className="p-2.5 text-cyan-300">a_i,j* ≤ a_i*,j* ≤ a_i*,j   ∀ i, j</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Fair Game Condition</td>
                    <td className="p-2.5 text-amber-300 font-bold">Value of the Game v* = ₹0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 3: 8-Topic Architecture SVG */}
        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          data-index="2"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-600/20 text-teal-400 font-bold text-sm">
                03
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Complete 8-Topic Pure Strategy & Saddle Point Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 220"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* 4 Thematic Pillars */}
                <rect x="20" y="20" width="160" height="85" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="100" y="45" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">1. Pure Strategy</text>
                <text x="100" y="65" fill="#cbd5e1" fontSize="8" textAnchor="middle">Topic 0</text>
                <text x="100" y="85" fill="#94a3b8" fontSize="7" textAnchor="middle">Deterministic p=1.0, Basis e_k</text>

                <rect x="200" y="20" width="160" height="85" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <text x="280" y="45" fill="#f43f5e" fontSize="10" fontWeight="bold" textAnchor="middle">2. Maximin & Minimax</text>
                <text x="280" y="65" fill="#cbd5e1" fontSize="8" textAnchor="middle">Topics 1 - 2</text>
                <text x="280" y="85" fill="#94a3b8" fontSize="7" textAnchor="middle">Row Mins, Col Maxs, Bounds</text>

                <rect x="380" y="20" width="160" height="85" rx="8" fill="#1e293b" stroke="#34d399" strokeWidth="2" />
                <text x="460" y="45" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">3. Saddle & Game Value</text>
                <text x="460" y="65" fill="#cbd5e1" fontSize="8" textAnchor="middle">Topics 3 - 4</text>
                <text x="460" y="85" fill="#94a3b8" fontSize="7" textAnchor="middle">Maximin=Minimax=v*, Fairness</text>

                <rect x="560" y="20" width="160" height="85" rx="8" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
                <text x="640" y="45" fill="#a855f7" fontSize="10" fontWeight="bold" textAnchor="middle">4. Optimal & Numerical</text>
                <text x="640" y="65" fill="#cbd5e1" fontSize="8" textAnchor="middle">Topics 5 - 7</text>
                <text x="640" y="85" fill="#94a3b8" fontSize="7" textAnchor="middle">5-Step Algo, Worked Matrices</text>

                {/* Unifying Banner */}
                <rect x="20" y="125" width="700" height="75" rx="8" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />
                <text x="370" y="155" fill="#fde68a" fontSize="13" fontWeight="bold" textAnchor="middle">
                  COMPLETE MODULE 005_002 PURE STRATEGY & SADDLE POINT MASTERY
                </text>
                <text x="370" y="180" fill="#ffffff" fontSize="10" textAnchor="middle">
                  Deterministic Basis Vectors • 2-Stage Security Filters • Saddle Point Equilibrium in Indian Rupees (₹)
                </text>
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 4: Master Case Studies */}
        <section
          ref={(el) => (sectionRefs.current[3] = el)}
          data-index="3"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 font-bold text-sm">
                04
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Bengal Master Pure Strategy Case Studies
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
                  <p className="text-amber-300 font-semibold">💡 <strong>Operations Takeaway:</strong> {cs.lesson}</p>
                </div>
              );
            })()}
          </div>
        </section>

        {/* SECTION 5: Master Traps & Pitfalls */}
        <section
          ref={(el) => (sectionRefs.current[4] = el)}
          data-index="4"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-600/20 text-rose-400 font-bold text-sm">
                05
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Top 4 Master Traps in Pure Strategy & Saddle Point Analysis
              </h2>
            </div>

            <div className="flex flex-col space-y-2.5">
              {[
                {
                  trap: 'Forcing a Saddle Point when Maximin < Minimax',
                  fix: 'If Maximin != Minimax, NO pure saddle point exists; the game must be solved with mixed strategies.',
                },
                {
                  trap: 'Selecting a Row based solely on its Maximum Cell Entry',
                  fix: 'A rational opponent will avoid your maximum; always choose the strategy that maximizes the row MINIMUM.',
                },
                {
                  trap: 'Assuming Multiple Saddle Points Can Have Different Game Values',
                  fix: 'All saddle points in the same game MUST have the exact same payoff value v*.',
                },
                {
                  trap: 'Deviating from an Optimal Pure Strategy at Equilibrium',
                  fix: 'At a saddle point, unilateral deviation strictly decreases your return or increases your payout liability.',
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

        {/* SECTION 6: Master Certification Checklist */}
        <section
          ref={(el) => (sectionRefs.current[5] = el)}
          data-index="5"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                06
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Master Module Certification Checklist (Topics 0 to 7)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Defined Pure Strategy as a deterministic choice (p = 1.0, basis vector e_k)',
                'Computed Row Minima horizontally and identified Maximin value (v_lower)',
                'Computed Column Maxima vertically and identified Minimax value (v_upper)',
                'Verified the universal invariant inequality: Maximin ≤ Minimax',
                'Identified pure strategy saddle points where Maximin == Minimax == v*',
                'Proved Nash Equilibrium stability: a_i,j* ≤ a_i*,j* ≤ a_i*,j',
                'Evaluated game fairness and calculated side-payment equalizers for v* != ₹0',
                'Executed the 5-step optimal pure strategy extraction algorithm',
                'Solved numerical matrix games across 2x2, 3x3, rectangular, and negative payoff structures',
                'Reported all game payoffs, security floors, and values in Indian Rupees (₹)',
              ].map((text, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-800/40 border border-slate-700/60 flex items-center space-x-3">
                  <span className="text-emerald-400">✅</span>
                  <span className="text-xs sm:text-sm text-slate-300">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: Teacher's Note */}
        <section className="flex flex-col space-y-6">
          <Teacher
            note={
              "Heartiest congratulations to Debangshu, Mamata, Mahima, Susmita, and Abhronila! You have completed all 8 topics of Module 005_002 (Pure Strategy and Saddle Point) with 100% mathematical, operational, and financial rigor. You have mastered the Maximin/Minimax algorithms, saddle point mechanics, and optimal pure strategy profiles. In our next module (Module 005_003), we will explore the Principle of Dominance for simplifying large matrix games!"
            }
          />
        </section>

        {/* SECTION 8: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Pure Strategy & Saddle Point Master FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 9: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Pure Strategy & Saddle Point Short Questions"
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
