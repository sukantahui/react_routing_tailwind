// src/components/study/quantitative-analysis/topics/005_006_2xn-and-m-x-2-cases-graphical-and-algebraic-methods/Topic9.jsx
// React 19 Function-based Component
// Module: 005_006_2xn-and-m-x-2-cases-graphical-and-algebraic-methods
// Topic 9: Short Questions

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic9_files/topic9_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic9_files/topic9_note.txt?raw';

const Topic9 = () => {
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
      topic: 'Topic 0: 2×n Games Formulation',
      q: 'How does parameterizing Player A’s mixed strategy as p = [p₁, 1−p₁]ᵀ transform a 2×n game?',
      a: 'It converts n strategy payoff functions into continuous straight lines on a 1D probability simplex [0, 1]. Player B minimizes Player A’s return to create a Lower Envelope, which Player A maximizes at the Maximin Peak.',
      formula: 'Lower Envelope: f_lower(p₁) = min_j [ (a₁ⱼ − a₂ⱼ)p₁ + a₂ⱼ ]',
    },
    {
      topic: 'Topic 1: m×2 Games Formulation',
      q: 'How does parameterizing Player B’s mixed strategy as q = [q₁, 1−q₁]ᵀ transform an m×2 game?',
      a: 'It converts m payout functions into continuous straight lines on a 1D probability simplex [0, 1]. Player A maximizes payoff (Player B’s loss) to create an Upper Envelope, which Player B minimizes at the Minimax Trough.',
      formula: 'Upper Envelope: f_upper(q₁) = max_i [ (a_i1 − a_i2)q₁ + a_i2 ]',
    },
    {
      topic: 'Topic 2: The Graphical Method',
      q: 'Why can 2×n and m×2 games be solved graphically while 3×3 games cannot without reduction?',
      a: 'Because a 2-action player has exactly 1 degree of freedom (1D simplex), enabling 2D line plotting. A 3-action player has 2 degrees of freedom (p₁+p₂+p₃=1), requiring 3D planes and volumetric optimization.',
      formula: 'Simplex Dimension = n_strategies − 1 = 2 − 1 = 1D Line',
    },
    {
      topic: 'Topic 3: Plotting Strategy Lines',
      q: 'What are the exact endpoint coordinates when plotting Column B_j on the dual vertical axes?',
      a: 'Mark (0, a₂ⱼ) on the Left Axis (p₁=0, pure strategy A₂) and (1, a₁ⱼ) on the Right Axis (p₁=1, pure strategy A₁). Connect with a straight line of slope m = a₁ⱼ − a₂ⱼ.',
      formula: 'Endpoints: (0, a₂ⱼ) on Left Axis ➔ (1, a₁ⱼ) on Right Axis',
    },
    {
      topic: 'Topic 4: Finding Optimal Strategies Graphically',
      q: 'How do you extract and solve the active 2×2 submatrix from an envelope vertex?',
      a: 'Identify the two lines with opposite slopes intersecting at the apex (peak or trough). Extract their coefficients into a 2×2 submatrix, solve using closed-form determinant formulas, and assign 0.0 to all inactive options.',
      formula: 'Active Extraction: Apex Lines {B_j, B_k} ➔ Solvable 2×2 Submatrix',
    },
    {
      topic: 'Topic 5: The Algebraic Method',
      q: 'What is the Algebraic Method and how does it filter candidate 2×2 submatrices?',
      a: 'It evaluates all C(n, 2) or C(m, 2) submatrices combinatorially, filtering them through two gates: 1. Probability Admissibility (p, q ∈ [0, 1]), and 2. Global Minimax Optimality across all original options.',
      formula: 'Filter: C(n, 2) Pairs ➔ [0 ≤ p, q ≤ 1] ➔ [E(p*, B_j) ≥ v* ∀ j]',
    },
    {
      topic: 'Topic 6: Solving Probability Equations',
      q: 'What is the Indifference Principle and how is Cramer’s determinant Δ formulated?',
      a: 'Each player randomizes so the opponent’s expected payoffs across all active strategies are strictly equal. The determinant Δ = (a₁₁ + a₂₂) − (a₁₂ + a₂₁) produces p₁* = (a₂₂ − a₂₁)/Δ and q₁* = (a₂₂ − a₁₂)/Δ.',
      formula: 'Determinant Δ = (Main Diagonal Sum) − (Off-Diagonal Sum)',
    },
    {
      topic: 'Topic 7: Determining the Value of the Game',
      q: 'What is the Shift-Invariance Theorem and how does it apply to financial payoffs in ₹?',
      a: 'Adding a constant C to every cell in matrix A increases the Game Value by exactly +C (v_new* = v_old* + C), while the optimal strategy distributions p* and q* remain 100% invariant.',
      formula: 'Shift Invariance: v*(A + C) = v*(A) + C &nbsp; (p*, q* unchanged)',
    },
    {
      topic: 'Topic 8: Numerical Exercises & Solution Topologies',
      q: 'What are the 4 standard 2×n and m×2 numerical solution topologies?',
      a: '1. 2×n Graphical Lower Envelope Maximin; 2. m×2 Graphical Upper Envelope Minimax; 3. 2×n Algebraic Combinatorial Enumeration; 4. m×2 Algebraic Submatrix Filtering.',
      formula: 'Topologies: 2×n Graphical, m×2 Graphical, 2×n Algebraic, m×2 Filtering',
    },
  ];

  const currentCard = flashcards[flashcardIndex];

  // Case Studies
  const caseStudies = [
    {
      title: '1. Precision Foundry Master Schedule Governance (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Debangshu in Barrackpore evaluated 2 casting processes against 4 tender bids, locking in ₹30,000 daily margin (₹9.0 Lakh monthly return) with zero LP Simplex overhead.',
      lesson: 'Graphical and algebraic methods transform multi-variable game models into immediate decisions.',
    },
    {
      title: '2. Cold-Chain Vaccine Transport Optimization (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Mamata and Mahima in Kolkata modeled 4 emergency corridors against 2 fuel tiers, capping transport expenditure at ₹30,000 per transit cycle.',
      lesson: 'Minimax upper envelope troughs protect public health budgets against logistics inflation.',
    },
    {
      title: '3. Supermarket FMCG Promotional War Streamlining (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Reduced a 2x4 retail promotion grid down to active columns {1, 2} in Ichapur, securing an equilibrium revenue of ₹32,000 per campaign and eliminating marketing bleed.',
      lesson: 'Defunding inactive promotional channels concentrates marketing capital effectively.',
    },
    {
      title: '4. Educational High-Tech Lab Patent Royalties Settlement (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Abhronila solved a 5x2 arbitration matrix in Jadavpur, securing an unambiguous ₹26.67 Lakh royalty settlement for university research labs.',
      lesson: 'Algebraic submatrix filtering provides bulletproof evidence in legal arbitrations.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes grandGlow6 {
          0%, 100% { border-color: rgba(99, 102, 241, 0.3); }
          50% { border-color: rgba(99, 102, 241, 0.8); }
        }
        .glow-grand6 {
          animation: grandGlow6 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-indigo-950/80 text-indigo-400 border border-indigo-800/60">
              Segment 5 • Module 005_006 • Topic 9 (Segment 5 Grand Capstone)
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-indigo-950/80 text-indigo-400 border border-indigo-800/60">
              Grand Viva Voce • 10-Topic Master Blueprint • Decision Matrix
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Short Questions & Grand Capstone Synthesis
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            The grand capstone review for <span className="text-indigo-400 font-semibold">Module 005_006 and Segment 5 (Game Theory)</span>: comprehensive <span className="text-emerald-400 font-semibold">Viva Voce Flashcards</span> covering all 9 prior topics, the <span className="text-amber-400 font-semibold">Master 2×n & m×2 Decision Matrix</span>, and complete financial auditing in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'flashcard-deck', label: '1. Master Flashcard Deck' },
              { id: 'decision-table', label: '2. Master Decision Matrix' },
              { id: 'module-blueprint', label: '3. 10-Topic Architecture SVG' },
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
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-900/40'
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
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-grand6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 font-bold text-sm">
                  01
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Interactive Master Flashcard Deck (9 Topics)
                </h2>
              </div>
              <span className="text-xs font-mono text-amber-400 font-semibold">
                Card {flashcardIndex + 1} of {flashcards.length}
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs uppercase tracking-wider font-bold text-indigo-400 font-mono">
                  {currentCard.topic}
                </span>
                <button
                  onClick={() => setShowAnswer(!showAnswer)}
                  className="px-3 py-1 bg-indigo-950 text-indigo-300 border border-indigo-800 rounded-lg text-xs font-semibold hover:bg-indigo-900 transition-all"
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
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white border-indigo-500 hover:bg-indigo-500 text-xs font-semibold"
              >
                Next Card ▶
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 2: Master Decision Matrix */}
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
                Master 2×n & m×2 Decision Matrix
              </h2>
            </div>

            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold font-sans">
                    <th className="p-2.5">Dimension</th>
                    <th className="p-2.5 text-indigo-400">Parameter</th>
                    <th className="p-2.5 text-amber-400">Envelope Boundary</th>
                    <th className="p-2.5 text-rose-400">Optimal Apex</th>
                    <th className="p-2.5 text-emerald-400">Solution Output</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">2 × n Game</td>
                    <td className="p-2.5 text-indigo-300">p₁ ∈ [0, 1]</td>
                    <td className="p-2.5 text-amber-300">Lower Envelope floor</td>
                    <td className="p-2.5 text-rose-300">Maximin Peak</td>
                    <td className="p-2.5 text-emerald-300">p* (2D), q* (nD), v* in ₹</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">m × 2 Game</td>
                    <td className="p-2.5 text-indigo-300">q₁ ∈ [0, 1]</td>
                    <td className="p-2.5 text-amber-300">Upper Envelope ceiling</td>
                    <td className="p-2.5 text-rose-300">Minimax Trough</td>
                    <td className="p-2.5 text-emerald-300">p* (mD), q* (2D), v* in ₹</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Algebraic Submatrices</td>
                    <td className="p-2.5 text-indigo-300">C(n,2) / C(m,2) Pairs</td>
                    <td className="p-2.5 text-amber-300">Determinant Δ ≠ 0</td>
                    <td className="p-2.5 text-rose-300">p, q ∈ [0, 1]</td>
                    <td className="p-2.5 text-emerald-400 font-bold">Audited in Indian Rupees (₹)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 3: 10-Topic Architecture SVG */}
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
                Complete 10-Topic Module 005_006 & Segment 5 Blueprint
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 220"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* 4 Pillars */}
                <rect x="20" y="20" width="160" height="85" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="100" y="45" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">1. Foundations & Formulation</text>
                <text x="100" y="65" fill="#cbd5e1" fontSize="8" textAnchor="middle">Topics 0 - 1</text>
                <text x="100" y="85" fill="#94a3b8" fontSize="7" textAnchor="middle">2×n & m×2 Parameterization</text>

                <rect x="200" y="20" width="160" height="85" rx="8" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
                <text x="280" y="45" fill="#a855f7" fontSize="10" fontWeight="bold" textAnchor="middle">2. Graphical Methods</text>
                <text x="280" y="65" fill="#cbd5e1" fontSize="8" textAnchor="middle">Topics 2 - 4</text>
                <text x="280" y="85" fill="#94a3b8" fontSize="7" textAnchor="middle">Dual Envelopes & Apex Discovery</text>

                <rect x="380" y="20" width="160" height="85" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <text x="460" y="45" fill="#f43f5e" fontSize="10" fontWeight="bold" textAnchor="middle">3. Algebraic & Equations</text>
                <text x="460" y="65" fill="#cbd5e1" fontSize="8" textAnchor="middle">Topics 5 - 7</text>
                <text x="460" y="85" fill="#94a3b8" fontSize="7" textAnchor="middle">Submatrices, Indifference, v* in ₹</text>

                <rect x="560" y="20" width="160" height="85" rx="8" fill="#1e293b" stroke="#34d399" strokeWidth="2" />
                <text x="640" y="45" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">4. Exercises & Capstone</text>
                <text x="640" y="65" fill="#cbd5e1" fontSize="8" textAnchor="middle">Topics 8 - 9</text>
                <text x="640" y="85" fill="#94a3b8" fontSize="7" textAnchor="middle">Grand Segment 5 Synthesis</text>

                {/* Banner */}
                <rect x="20" y="125" width="700" height="75" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                <text x="370" y="155" fill="#a5b4fc" fontSize="13" fontWeight="bold" textAnchor="middle">
                  SEGMENT 5 GAME THEORY COMPLETE CURRICULUM MASTERY
                </text>
                <text x="370" y="180" fill="#ffffff" fontSize="10" textAnchor="middle">
                  Modules 005_001 to 005_006: Payoffs • Saddles • Dominance • Mixed • Reduction • Graphical in Indian Rupees (₹)
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
                Bengal Master 2×n & m×2 Case Studies
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
                  <p className="text-indigo-300 font-semibold">💡 <strong>Operations Takeaway:</strong> {cs.lesson}</p>
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
                Top 4 Master Traps in 2×n & m×2 Methods
              </h2>
            </div>

            <div className="flex flex-col space-y-2.5">
              {[
                {
                  trap: 'Plotting the Upper Envelope for 2xn Games (or Lower Envelope for mx2 Games)',
                  fix: '2xn games require the LOWER envelope (Maximin peak); mx2 games require the UPPER envelope (Minimax trough).',
                },
                {
                  trap: 'Reversing Left and Right Axis Endpoints',
                  fix: 'Left axis is p₁=0 (Row 2 payoff a₂ⱼ); Right axis is p₁=1 (Row 1 payoff a₁ⱼ).',
                },
                {
                  trap: 'Reporting Reduced 2D Vectors Instead of Full Original Dimensional Vectors',
                  fix: 'Assign 0.0 to all inactive strategies to reconstruct the full mD/nD vectors.',
                },
                {
                  trap: 'Skipping the Global Optimality Audit on Inactive Strategies',
                  fix: 'Verify that E(p*, B_j) ≥ v* for ALL columns in 2xn and E(A_i, q*) ≤ v* for ALL rows in mx2.',
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
                Master Module & Segment 5 Certification Checklist
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Mastered 1D probability simplex parameterization (p₁, 1−p₁) and (q₁, 1−q₁)',
                'Traced 2xn lower envelopes (Maximin) and mx2 upper envelopes (Minimax)',
                'Plotted line endpoints accurately on dual vertical axes',
                'Extracted active 2x2 submatrices and solved exact indifference equations',
                'Enumerated and filtered candidate submatrices algebraically',
                'Reconstructed full-dimensional probability vectors (p*, q*)',
                'Verified global optimality and shift-invariance in Indian Rupees (₹)',
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
              "Heartiest congratulations to Debangshu, Mamata, Mahima, Susmita, and Abhronila! You have completed all 10 topics of Module 005_006 and FULLY CONQUERED SEGMENT 5 (INTRODUCTION TO GAME THEORY)! From payoff matrices and pure saddle points, to principles of dominance, 2x2 mixed strategies, m x n reductions, and graphical/algebraic 2xn and mx2 solutions, you possess master-level theoretical, graphical, and computational mastery in Indian Rupees (₹). Outstanding work!"
            }
          />
        </section>

        {/* SECTION 8: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="2xn & mx2 Master FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 9: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="2×n and m×2 Cases Short Questions"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic10_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic9;
