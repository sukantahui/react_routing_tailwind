// src/components/study/quantitative-analysis/topics/005_001_payoff-matrix-two-person-zero-sum-game/Topic7.jsx
// React 19 Function-based Component
// Module: 005_001_payoff-matrix-two-person-zero-sum-game
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
      topic: 'Topic 0: Introduction to Game Theory',
      q: 'What is Game Theory and what are the 5 foundational structural elements of a game?',
      a: 'Game Theory is the mathematical study of strategic interaction between rational players. Elements: 1. Players; 2. Strategy Sets; 3. Information Structure; 4. Payoff Functions in ₹; 5. Rationality Axiom.',
      formula: 'G = (N, {S_i}, {u_i}) in Indian Rupees (₹)',
    },
    {
      topic: 'Topic 1: Players & Strategies',
      q: 'What are the roles of Player A and Player B, and what differentiates Pure from Mixed strategies?',
      a: 'Player A is the Row Maximizer (Maximin); Player B is the Column Minimizer (Minimax). Pure strategies are deterministic (p=1.0); mixed strategies randomize with probabilities summing to 1.0.',
      formula: 'Pure: p_k = 1.0 | Mixed: Σ p_i = 1.0, p_i ≥ 0',
    },
    {
      topic: 'Topic 2: Payoff Concept & VNM Utility',
      q: 'How is the Expected Payoff E(p, q) computed in a Two-Person Zero-Sum Game?',
      a: 'E(p, q) = Σ Σ p_i * q_j * a_ij = pᵀ A q. Under zero-sum conservation, E_A(p, q) + E_B(p, q) = 0 strictly for all probability vectors.',
      formula: 'E(p, q) = pᵀ A q | E_A + E_B = ₹0',
    },
    {
      topic: 'Topic 3: Payoff Matrix & Extremes',
      q: 'What are Row Minima, Column Maxima, Maximin, and Minimax?',
      a: 'Row Min = min_j a_ij (Player A security level); Col Max = max_i a_ij (Player B liability). Maximin = max(Row Mins); Minimax = min(Col Maxs). Universal invariant: Maximin ≤ Minimax strictly.',
      formula: 'Maximin (α) ≤ Minimax (β) ⟺ v_lower ≤ v_upper',
    },
    {
      topic: 'Topic 4: Two-Person Zero-Sum Games',
      q: 'What is John von Neumann’s Minimax Theorem and when is a game Strictly Determined?',
      a: 'The Minimax Theorem guarantees a unique game value v* such that max min = min max = v*. A game is strictly determined if a pure saddle point exists (Maximin = Minimax = v*).',
      formula: 'max_p min_q (pᵀ A q) = min_q max_p (pᵀ A q) = v*',
    },
    {
      topic: 'Topic 5: Interpretation & Linear Transformations',
      q: 'What does the Linear Transformation Invariance Theorem state for Payoff Matrices?',
      a: 'Transforming matrix entries via a\'_ij = k·a_ij + c (where k > 0) preserves all optimal strategy vectors (p*, q*) and saddle point positions, while scaling game value to v\'* = k·v* + c.',
      formula: 'a\' = k·a + c ⟹ v\'* = k·v* + c (Strategies Invariant)',
    },
    {
      topic: 'Topic 6: 4-Step Formulation Pipeline',
      q: 'What are the 4 steps to formulate any real-world business conflict into a game matrix?',
      a: '1. Identify Players (A & B); 2. Define exhaustive strategy sets; 3. Calculate net payoffs in ₹ (Revenue − Costs); 4. Assemble m×n normal form matrix and extract Row Mins / Col Maxs.',
      formula: 'Players ➔ Strategies ➔ Net Payoffs (₹) ➔ m×n Matrix',
    },
  ];

  const currentCard = flashcards[flashcardIndex];

  // Case Studies
  const caseStudies = [
    {
      title: '1. Foundry Master Tender Governance (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Evaluated a ₹5 Lakh sealed-bid casting tender in Barrackpore using a 3x3 payoff matrix, identifying a stable pure saddle point at ₹4.2 Lakh (Med Bid).',
      lesson: 'Complete mastery of game matrix formulation guarantees flawless procurement bidding.',
    },
    {
      title: '2. Cold-Chain Vaccine Facility Dispute Resolution (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Structured liquidated temperature damage claims as a zero-sum matrix in Kolkata, applying positive linear shifting (+₹25k) to achieve an equitable settlement.',
      lesson: 'Linear transformations simplify algebraic solutions without changing negotiation strategies.',
    },
    {
      title: '3. Supermarket FMCG Retail Promotion Governance (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Analyzed competitive discounting between two supermarket chains in Ichapur, formulating a 2x2 matrix that stabilized weekend footfall revenue in Indian Rupees (₹).',
      lesson: 'Zero-sum matrix modeling protects retail profit margins against destructive price wars.',
    },
    {
      title: '4. Educational High-Tech Lab Patent Licensing Agreement (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Presented a certified game matrix blueprint to university auditors in Jadavpur, using expected payoff formulas to negotiate a ₹55 Lakh cross-licensing royalty schedule.',
      lesson: 'Formal operations research documentation establishes transparent institutional settlements.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes masterGameGlow {
          0%, 100% { border-color: rgba(244, 63, 94, 0.3); }
          50% { border-color: rgba(244, 63, 94, 0.8); }
        }
        .glow-master-game {
          animation: masterGameGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-rose-950/80 text-rose-400 border border-rose-800/60">
              Segment 5 • Module 005_001 • Topic 7 (Final Master Review)
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-rose-950/80 text-rose-400 border border-rose-800/60">
              Comprehensive Viva Voce • 8-Topic Master Blueprint • Flashcards
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Short Questions & Master Synthesis
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            The grand capstone and master review for <span className="text-rose-400 font-semibold">Module 005_001 (Payoff Matrix & Two-Person Zero-Sum Game)</span>: comprehensive <span className="text-amber-400 font-semibold">Viva Voce Flashcards</span> covering all 7 prior topics, the <span className="text-emerald-400 font-semibold">Master Mathematical Formula Matrix</span>, and complete strategic governance in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
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
                    ? 'bg-rose-600 text-white border-rose-500 shadow-md shadow-rose-900/40'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
                )}
              &gt;
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
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-master-game">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-600/20 text-rose-400 font-bold text-sm">
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
                <span className="text-xs uppercase tracking-wider font-bold text-rose-400 font-mono">
                  {currentCard.topic}
                </span>
                <button
                  onClick={() => setShowAnswer(!showAnswer)}
                  className="px-3 py-1 bg-rose-950 text-rose-300 border border-rose-800 rounded-lg text-xs font-semibold hover:bg-rose-900 transition-all"
                &gt;
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
                className="px-4 py-2 rounded-xl bg-rose-600 text-white border border-rose-500 hover:bg-rose-500 text-xs font-semibold"
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
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Master Mathematical Formula & Theorem Reference
              </h2>
            </div>

            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold font-sans">
                    <th className="p-2.5">Concept / Parameter</th>
                    <th className="p-2.5 text-rose-400">Mathematical Formula / Governing Theorem</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Zero-Sum Axiom</td>
                    <td className="p-2.5 text-emerald-300">u_A(s) + u_B(s) = 0   ==>   u_B(s) = −u_A(s)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Expected Payoff (Mixed)</td>
                    <td className="p-2.5 text-amber-300">E(p, q) = Σ_{'{i=1}'}^m Σ_{'{j=1}'}^n p_i * q_j * a_ij = pᵀ A q</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Row Minimum (Security Level)</td>
                    <td className="p-2.5 text-cyan-300">Row Min_i = min_j a_ij</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Column Maximum (Liability)</td>
                    <td className="p-2.5 text-purple-300">Col Max_j = max_i a_ij</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Maximin Value (v_lower)</td>
                    <td className="p-2.5 text-rose-300">α = max_i [ min_j a_ij ]</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Minimax Value (v_upper)</td>
                    <td className="p-2.5 text-sky-300">β = min_j [ max_i a_ij ]</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Universal Invariant Inequality</td>
                    <td className="p-2.5 text-emerald-400 font-bold">Maximin ≤ Minimax   <==>   v_lower ≤ v_upper</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Saddle Point Condition</td>
                    <td className="p-2.5 text-amber-400 font-bold">Maximin == Minimax == v*   (at cell (i*, j*))</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">von Neumann Minimax Theorem</td>
                    <td className="p-2.5 text-purple-300 font-bold">max_p min_q (pᵀ A q) = min_q max_p (pᵀ A q) = v*</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Linear Transformation Invariance</td>
                    <td className="p-2.5 text-cyan-400">a'_ij = k·a_ij + c (k &gt; 0)   ==>   v'* = k·v* + c</td>
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
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-600/20 text-teal-400 font-bold text-sm">
                03
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Complete 8-Topic Payoff Matrix & Zero-Sum Game Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 220"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* 4 Thematic Pillars */}
                <rect x="20" y="20" width="160" height="85" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <text x="100" y="45" fill="#f43f5e" fontSize="10" fontWeight="bold" textAnchor="middle">1. Foundations & Players</text>
                <text x="100" y="65" fill="#cbd5e1" fontSize="8" textAnchor="middle">Topics 0 - 1</text>
                <text x="100" y="85" fill="#94a3b8" fontSize="7" textAnchor="middle">Interdependence, Pure/Mixed</text>

                <rect x="200" y="20" width="160" height="85" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="280" y="45" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">2. Payoffs & Matrix</text>
                <text x="280" y="65" fill="#cbd5e1" fontSize="8" textAnchor="middle">Topics 2 - 3</text>
                <text x="280" y="85" fill="#94a3b8" fontSize="7" textAnchor="middle">pᵀ A q, Row Mins, Col Maxs</text>

                <rect x="380" y="20" width="160" height="85" rx="8" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
                <text x="460" y="45" fill="#a855f7" fontSize="10" fontWeight="bold" textAnchor="middle">3. TPZSG & Minimax</text>
                <text x="460" y="65" fill="#cbd5e1" fontSize="8" textAnchor="middle">Topic 4</text>
                <text x="460" y="85" fill="#94a3b8" fontSize="7" textAnchor="middle">Minimax Theorem, v*, Fairness</text>

                <rect x="560" y="20" width="160" height="85" rx="8" fill="#1e293b" stroke="#34d399" strokeWidth="2" />
                <text x="640" y="45" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">4. Interpretation & Synthesis</text>
                <text x="640" y="65" fill="#cbd5e1" fontSize="8" textAnchor="middle">Topics 5 - 7</text>
                <text x="640" y="85" fill="#94a3b8" fontSize="7" textAnchor="middle">Linear Transforms, 4-Step Pipeline</text>

                {/* Unifying Banner */}
                <rect x="20" y="125" width="700" height="75" rx="8" fill="#4c0519" stroke="#f43f5e" strokeWidth="2" />
                <text x="370" y="155" fill="#f43f5e" fontSize="13" fontWeight="bold" textAnchor="middle">
                  COMPLETE MODULE 005_001 GAME THEORY MASTERY BLUEPRINT
                </text>
                <text x="370" y="180" fill="#ffffff" fontSize="10" textAnchor="middle">
                  Strategic Interdependence • Payoff Normal Form • Maximin ≤ Minimax • von Neumann Equilibrium in Indian Rupees (₹)
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
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 font-bold text-sm">
                04
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Bengal Master Game Theory Case Studies
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
                &gt;
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
                  <p className="text-rose-300 font-semibold">💡 <strong>Operations Takeaway:</strong> {cs.lesson}</p>
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
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-600/20 text-rose-400 font-bold text-sm">
                05
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Top 4 Master Traps in Zero-Sum Game Theory
              </h2>
            </div>

            <div className="flex flex-col space-y-2.5">
              {[
                {
                  trap: 'Inverting the Polarity of Matrix Entries',
                  fix: 'Matrix entries a_ij ALWAYS represent payoffs to Player A (Row Player); positive is gain to A, negative is payout to B.',
                },
                {
                  trap: 'Violating the Maximin ≤ Minimax Inequality',
                  fix: 'The lower value of the game can NEVER exceed the upper value; if Maximin &gt; Minimax, re-check your calculations.',
                },
                {
                  trap: 'Using a Negative Multiplier (k < 0) During Linear Transformations',
                  fix: 'Negative multipliers invert player roles; only positive multipliers (k > 0) preserve game equivalence.',
                },
                {
                  trap: 'Applying Mixed Strategy Formulas to Games with Saddle Points',
                  fix: 'If Maximin = Minimax, the game is strictly determined; do not use mixed strategy formulas as the saddle point is the exact solution.',
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
        &gt;
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
                'Defined Game Theory and differentiated strategic interdependence from single-agent optimization',
                'Identified the 5 structural elements of a game and classified game types',
                'Differentiated Player A (Row Maximizer) and Player B (Column Minimizer)',
                'Distinguished Pure Strategies from Mixed Strategies and verified probability normalization',
                'Computed expected payoffs E(p, q) = pᵀ A q and verified zero-sum conservation',
                'Constructed m × n Payoff Matrices and extracted Row Minima and Column Maxima',
                'Verified the universal invariant inequality: Maximin ≤ Minimax',
                'Identified pure strategy saddle points in strictly determined games',
                'Applied John von Neumann’s Minimax Theorem to determine game value v*',
                'Interpreted signed matrix entries and applied linear transformations (a\' = k·a + c)',
                'Formulated real-world business conflicts into game matrices using the 4-step pipeline',
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
              "Heartiest congratulations to Debangshu, Mamata, Mahima, Susmita, and Abhronila! You have completed all 8 topics of Module 005_001 (Payoff Matrix & Two-Person Zero-Sum Game) with 100% mathematical, operational, and financial rigor. You are now fully equipped to formulate, analyze, and solve strategic matrix games. In our next module (Module 005_002), we will explore Pure Strategy and Saddle Point solutions in even greater depth!"
            }
          />
        </section>

        {/* SECTION 8: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Payoff Matrix & Zero-Sum Game Master FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 9: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Payoff Matrix & Zero-Sum Game Short Questions"
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
