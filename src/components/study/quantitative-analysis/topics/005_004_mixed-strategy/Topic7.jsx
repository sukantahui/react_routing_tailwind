// src/components/study/quantitative-analysis/topics/005_004_mixed-strategy/Topic7.jsx
// React 19 Function-based Component
// Module: 005_004_mixed-strategy
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
      topic: 'Topic 0: Need for Mixed Strategies',
      q: 'Why do pure strategies fail when Maximin < Minimax, and what is the role of randomization?',
      a: 'Deterministic choices suffer from information leakage and opponent exploitation. Randomizing moves according to optimal probabilities p* grants informational immunity and guarantees the Expected Value of the Game in ₹.',
      formula: 'Maximin (α) < Minimax (β) ⟹ Randomize over Simplex',
    },
    {
      topic: 'Topic 1: Probability Distribution',
      q: 'What are the two fundamental probability axioms required for any mixed strategy vector p?',
      a: '1. Normalization: Σ p_i = 1.0 (100% total probability); 2. Non-negativity: p_i ≥ 0.0 for all actions. Pure strategies are the corner basis vectors e_k of the probability simplex.',
      formula: 'Σ p_i = 1.0  and  p_i ≥ 0 ∀ i',
    },
    {
      topic: 'Topic 2: Expected Payoff',
      q: 'What is the bilinear formula for Expected Payoff E(p, q) and what does the Indifference Principle state?',
      a: 'E(p, q) = pᵀAq. At equilibrium p*, Player A makes Player B completely indifferent across all active column choices: E(p*, B₁) = E(p*, B₂) = v* in Indian Rupees (₹).',
      formula: 'E(p*, B₁) = E(p*, B₂) = v*',
    },
    {
      topic: 'Topic 3: 2×2 Closed-Form Solution',
      q: 'What are the analytical formulas for Δ, p₁*, q₁*, and v* in a 2×2 game?',
      a: 'Δ = (a₁₁+a₂₂) − (a₁₂+a₂₁); p₁* = (a₂₂−a₂₁)/Δ; q₁* = (a₂₂−a₁₂)/Δ; v* = (a₁₁a₂₂ − a₁₂a₂₁)/Δ = det(A)/Δ in Indian Rupees (₹).',
      formula: 'v* = det(A) / [(a₁₁+a₂₂) − (a₁₂+a₂₁)]',
    },
    {
      topic: 'Topic 4: Determining Optimal Probabilities',
      q: 'How does the Oddments Method calculate optimal strategy probabilities without algebra?',
      a: 'Take cross-row differences for Player A (|a₂₁−a₂₂| for Row 1, |a₁₁−a₁₂| for Row 2) and cross-column differences for Player B, then normalize by the total sum O_A = O_B = |Δ|.',
      formula: 'p₁* = |a₂₁ − a₂₂| / (|a₂₁ − a₂₂| + |a₁₁ − a₁₂|)',
    },
    {
      topic: 'Topic 5: Finding the Value of the Game',
      q: 'What are the bounds on the Game Value v* and what characterizes a Strictly Fair Game?',
      a: 'Maximin (α) ≤ v* ≤ Minimax (β). If v* > 0, the game favors Player A; if v* < 0, it favors Player B; if v* = ₹0 (det(A) = 0), it is a Strictly Fair Game.',
      formula: 'Maximin (α) ≤ v* ≤ Minimax (β) | Fair Game: v* = ₹0',
    },
    {
      topic: 'Topic 6: Numerical Exercises & Verification',
      q: 'How do you handle negative Δ in numerical problems, and how do you audit your final solution?',
      a: 'When Δ < 0, the numerators are also negative and the signs cancel out, preserving positive probabilities. Verify by checking E(p*, B₁) == E(p*, B₂) == v*.',
      formula: 'Audit: E(p*, B₁) === E(p*, B₂) === v*',
    },
  ];

  const currentCard = flashcards[flashcardIndex];

  // Case Studies
  const caseStudies = [
    {
      title: '1. Foundry Master Casting Tender Optimization (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Solved A = [[₹40k, ₹10k], [₹10k, ₹50k]] in Barrackpore. Delta = 70. Optimal mix p* = [4/7, 3/7], securing an exact game value of ₹27,142.86.',
      lesson: 'Closed-form 2x2 solutions provide instant, auditable procurement tender optimizations.',
    },
    {
      title: '2. Cold-Chain Vaccine Multi-Modal Routing Optimization (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Solved A = [[₹30k, ₹15k], [₹10k, ₹40k]] in Kolkata. Delta = 45. Optimal fleet mix q* = [5/9, 4/9] stabilized expected transportation expenditure at ₹23,333.33.',
      lesson: 'Mixed strategy probability ratios minimize long-term logistics variance.',
    },
    {
      title: '3. Supermarket FMCG Retail Promotional Pricing Optimization (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Solved A = [[₹50k, ₹20k], [₹10k, ₹60k]] in Ichapur. Delta = 80. Optimal mix p* = [5/8, 3/8], locking in an equilibrium campaign value of ₹35,000.',
      lesson: 'Mixed promotional pricing eliminates predictable competitor undercut responses.',
    },
    {
      title: '4. Educational High-Tech Lab Patent Arbitration Settlement (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Solved a 2x2 arbitration game in Jadavpur with A = [[₹25L, ₹5L], [₹10L, ₹30L]]. Delta = 40. p* = [0.50, 0.50], yielding a fair value v* = ₹17.5 Lakh.',
      lesson: 'The indifference principle provides transparent institutional settlement benchmarks.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes masterGlow4 {
          0%, 100% { border-color: rgba(99, 102, 241, 0.3); }
          50% { border-color: rgba(99, 102, 241, 0.8); }
        }
        .glow-master4 {
          animation: masterGlow4 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-indigo-950/80 text-indigo-400 border border-indigo-800/60">
              Segment 5 • Module 005_004 • Topic 7 (Final Master Review)
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-indigo-950/80 text-indigo-400 border border-indigo-800/60">
              Comprehensive Viva Voce • 8-Topic Master Blueprint • Flashcards
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Short Questions & Master Synthesis
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            The grand capstone and master review for <span className="text-indigo-400 font-semibold">Module 005_004 (Mixed Strategy for 2×2 Games)</span>: comprehensive <span className="text-emerald-400 font-semibold">Viva Voce Flashcards</span> covering all 7 prior topics, the <span className="text-amber-400 font-semibold">Master Formula Quick Reference Table</span>, and complete financial governance in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
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
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-master4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 font-bold text-sm">
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
                Master 2×2 Mixed Strategy Formula Reference Table
              </h2>
            </div>

            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold font-sans">
                    <th className="p-2.5">Concept / Quantity</th>
                    <th className="p-2.5 text-indigo-400">Mathematical Closed-Form Formula</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Universal Denominator (Δ)</td>
                    <td className="p-2.5 text-amber-300">Δ = (a₁₁ + a₂₂) − (a₁₂ + a₂₁)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Player A Optimal p₁*</td>
                    <td className="p-2.5 text-rose-300">p₁* = (a₂₂ − a₂₁) / Δ &nbsp;|&nbsp; p₂* = 1 − p₁* = (a₁₁ − a₁₂) / Δ</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Player B Optimal q₁*</td>
                    <td className="p-2.5 text-sky-300">q₁* = (a₂₂ − a₁₂) / Δ &nbsp;|&nbsp; q₂* = 1 − q₁* = (a₁₁ − a₂₁) / Δ</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Value of the Game (v*)</td>
                    <td className="p-2.5 text-emerald-400 font-bold">v* = (a₁₁a₂₂ − a₁₂a₂₁) / Δ = det(A) / Δ in ₹</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Row Oddments (Player A)</td>
                    <td className="p-2.5 text-rose-300">O_A1 = |a₂₁ − a₂₂|, &nbsp; O_A2 = |a₁₁ − a₁₂|</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Column Oddments (Player B)</td>
                    <td className="p-2.5 text-sky-300">O_B1 = |a₁₂ − a₂₂|, &nbsp; O_B2 = |a₁₁ − a₂₁|</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Expected Payoff Bilinear Form</td>
                    <td className="p-2.5 text-purple-300">E(p, q) = p₁q₁a₁₁ + p₁q₂a₁₂ + p₂q₁a₂₁ + p₂q₂a₂₂</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Indifference Principle at Nash</td>
                    <td className="p-2.5 text-emerald-400 font-bold">E(p*, B₁) = E(p*, B₂) = v* in ₹</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Security Bounds</td>
                    <td className="p-2.5 text-amber-300">Maximin (α) ≤ v* ≤ Minimax (β)</td>
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
                Complete 8-Topic Mixed Strategy Architecture Blueprint
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
                <text x="100" y="45" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">1. Foundations</text>
                <text x="100" y="65" fill="#cbd5e1" fontSize="8" textAnchor="middle">Topics 0 - 1</text>
                <text x="100" y="85" fill="#94a3b8" fontSize="7" textAnchor="middle">Non-Saddle, Simplex Δ₁/Δ₂</text>

                <rect x="200" y="20" width="160" height="85" rx="8" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
                <text x="280" y="45" fill="#a855f7" fontSize="10" fontWeight="bold" textAnchor="middle">2. Expected Payoff</text>
                <text x="280" y="65" fill="#cbd5e1" fontSize="8" textAnchor="middle">Topic 2</text>
                <text x="280" y="85" fill="#94a3b8" fontSize="7" textAnchor="middle">E(p, q) = pᵀAq, Indifference</text>

                <rect x="380" y="20" width="160" height="85" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <text x="460" y="45" fill="#f43f5e" fontSize="10" fontWeight="bold" textAnchor="middle">3. 2×2 Formulas</text>
                <text x="460" y="65" fill="#cbd5e1" fontSize="8" textAnchor="middle">Topics 3 - 5</text>
                <text x="460" y="85" fill="#94a3b8" fontSize="7" textAnchor="middle">Δ, p*, q*, v*, Oddments</text>

                <rect x="560" y="20" width="160" height="85" rx="8" fill="#1e293b" stroke="#34d399" strokeWidth="2" />
                <text x="640" y="45" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">4. Numerical Mastery</text>
                <text x="640" y="65" fill="#cbd5e1" fontSize="8" textAnchor="middle">Topics 6 - 7</text>
                <text x="640" y="85" fill="#94a3b8" fontSize="7" textAnchor="middle">Worked Exercises, Viva</text>

                {/* Unifying Banner */}
                <rect x="20" y="125" width="700" height="75" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                <text x="370" y="155" fill="#a5b4fc" fontSize="13" fontWeight="bold" textAnchor="middle">
                  COMPLETE MODULE 005_004 MIXED STRATEGY MASTERY
                </text>
                <text x="370" y="180" fill="#ffffff" fontSize="10" textAnchor="middle">
                  Bilinear Formulation • 2×2 Closed-Form Solutions • Oddments Method • Game Valuation in Indian Rupees (₹)
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
                Bengal Master Mixed Strategy Case Studies
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
                Top 4 Master Traps in Mixed Strategy Games
              </h2>
            </div>

            <div className="flex flex-col space-y-2.5">
              {[
                {
                  trap: 'Applying Mixed Strategy Formulas to a Matrix with a Pure Saddle Point',
                  fix: 'Always check Maximin == Minimax first! If a saddle point exists, use pure strategies.',
                },
                {
                  trap: 'Swapping Oddments Cross-Assignment (Placing Row 1 diff on Row 1)',
                  fix: 'Row 1 gets the magnitude difference of Row 2; Row 2 gets the magnitude difference of Row 1.',
                },
                {
                  trap: 'Calculating Denominator Δ as Main Diag PLUS Off-Diag',
                  fix: 'Δ = (a₁₁ + a₂₂) MINUS (a₁₂ + a₂₁).',
                },
                {
                  trap: 'Panic When Denominator Δ is Negative in Zero-Diagonal Games',
                  fix: 'When Δ < 0, numerators are ALSO negative and negative signs cancel out, yielding positive probabilities in [0, 1].',
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
                'Understood why mixed strategies are mandatory when Maximin < Minimax',
                'Applied probability axioms: Σ p_i = 1.0 and p_i ≥ 0',
                'Computed bilinear expected payoffs E(p, q) = pᵀ A q',
                'Computed Δ, p*, q*, and v* using closed-form 2×2 formulas',
                'Applied the Oddments Method for rapid arithmetic solutions',
                'Cross-verified solutions using the Indifference Principle',
                'Reported all game values and payoffs in Indian Rupees (₹)',
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
              "Heartiest congratulations to Debangshu, Mamata, Mahima, Susmita, and Abhronila! You have completed all 8 topics of Module 005_004 (Mixed Strategy for 2×2 Games) with 100% mathematical, algorithmic, and financial rigor. You are now masters of bilinear expected payoffs, closed-form 2x2 formulas, oddments methods, and indifference verification. In our next module (Module 005_005), we will explore the Reduction of m×n Games!"
            }
          />
        </section>

        {/* SECTION 8: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Mixed Strategy Master FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 9: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Mixed Strategy Short Questions"
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
