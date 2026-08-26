// src/components/study/quantitative-analysis/topics/005_003_principle-of-dominance/Topic6.jsx
// React 19 Function-based Component
// Module: 005_003_principle-of-dominance
// Topic 6: Short Questions

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic6_files/topic6_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic6_files/topic6_note.txt?raw';

const Topic6 = () => {
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
      topic: 'Topic 0: Principle of Dominance',
      q: 'What is the Principle of Dominance and why does it preserve the Value of the Game?',
      a: 'Rational players never choose inferior strategies yielding worse payoffs in all states. Pruning dominated strategies simplifies matrices while keeping the equilibrium Value of the Game v* in ₹ 100% invariant.',
      formula: 'v*(Original m × n) == v*(Reduced 2 × 2)',
    },
    {
      topic: 'Topic 1: Row Dominance Rules',
      q: 'What is the Row Dominance Rule for Player A and which row is deleted?',
      a: 'If a_ik ≥ a_jk for ALL columns k (with at least one strict >), Row j is dominated. Player A is a Maximizer, so ELIMINATE THE SMALLER ROW (Row j). Assign p_j* = 0 in strategy vector.',
      formula: 'a_ik ≥ a_jk ∀ k ⟹ Delete Smaller Row j (p_j* = 0)',
    },
    {
      topic: 'Topic 2: Column Dominance Rules',
      q: 'What is the Column Dominance Rule for Player B and which column is deleted?',
      a: 'If a_kr ≤ a_ks for ALL rows k (with at least one strict <), Column s is dominated. Player B is a Minimizer, so ELIMINATE THE LARGER COLUMN (Column s). Assign q_s* = 0 in strategy vector.',
      formula: 'a_kr ≤ a_ks ∀ k ⟹ Delete Larger Column s (q_s* = 0)',
    },
    {
      topic: 'Topic 3: Modified Dominance (Convex Combination)',
      q: 'What is Modified Dominance and how does it break matrix reduction deadlocks?',
      a: 'When pure dominance fails, test if a weighted convex combination of two strategies dominates a third (e.g. 0.5 R₁ + 0.5 R₂ ≥ R₃). If so, the target strategy is safely eliminated.',
      formula: 'λ R₁ + (1−λ) R₂ ≥ R_target ⟹ Delete R_target',
    },
    {
      topic: 'Topic 4: Reducing Matrix Size',
      q: 'Why must rows be re-inspected after columns are deleted in multi-pass reduction?',
      a: 'Because deleting columns removes opponent moves, which frequently creates NEW row dominances in the trimmed sub-matrix, cascading reduction all the way to 2×2 or 1×1.',
      formula: 'Cascading Reduction: Col Deletion ➔ New Row Dominance',
    },
    {
      topic: 'Topic 5: Strategy Vector Reconstruction',
      q: 'How are the full-dimensional strategy vectors reconstructed from the reduced 2×2 solution?',
      a: 'Assign the calculated 2×2 probabilities to the surviving strategy indices, and assign 0.0 to all previously pruned rows and columns, verifying that Σ p_i = 1.0 and Σ q_j = 1.0.',
      formula: 'p* = [p₁*, p₂*, 0.0, 0.0]ᵀ | q* = [q₁*, q₂*, 0.0, 0.0]ᵀ',
    },
  ];

  const currentCard = flashcards[flashcardIndex];

  // Case Studies
  const caseStudies = [
    {
      title: '1. Foundry Master Casting Tender (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Reduced a 4x4 metal casting bidding matrix to a 2x2 game in 3 iterative passes in Barrackpore, solving it in 2 minutes to lock in a ₹35,000 game value.',
      lesson: 'Iterative dominance eliminates complex linear programming dependencies.',
    },
    {
      title: '2. Cold-Chain Vaccine Facility Multi-Modal Route Reduction (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Pruned a 4x3 transport grid down to a 2x2 game in Kolkata, identifying the optimal mixed freight ratio without using complex linear programming tableaus.',
      lesson: 'Dominance reduction streamlines corporate logistics decision-making.',
    },
    {
      title: '3. Supermarket FMCG Retail Promotional Matrix Shrinking (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Reduced a 3x3 weekend marketing competition to a 2x2 matrix in Ichapur, calculating the exact mixed discount probabilities to protect retail footfall.',
      lesson: 'Pruning dominated promotional moves prevents retail margin erosion.',
    },
    {
      title: '4. Educational High-Tech Lab Institutional Negotiation Shrinking (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Reduced a 5x4 university cross-licensing game down to a 2x2 matrix in Jadavpur, providing legal auditors with a transparent 2-page mathematical settlement.',
      lesson: 'Dominance reduction produces auditable and transparent commercial agreements.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes masterGlow3 {
          0%, 100% { border-color: rgba(59, 130, 246, 0.3); }
          50% { border-color: rgba(59, 130, 246, 0.8); }
        }
        .glow-master3 {
          animation: masterGlow3 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-blue-950/80 text-blue-400 border border-blue-800/60">
              Segment 5 • Module 005_003 • Topic 6 (Final Master Review)
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-blue-950/80 text-blue-400 border border-blue-800/60">
              Comprehensive Viva Voce • 7-Topic Master Blueprint • Flashcards
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Short Questions & Master Synthesis
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            The grand capstone and master review for <span className="text-blue-400 font-semibold">Module 005_003 (Principle of Dominance)</span>: comprehensive <span className="text-emerald-400 font-semibold">Viva Voce Flashcards</span> covering all 6 prior topics, the <span className="text-amber-400 font-semibold">Master Formula & Dominance Reference Table</span>, and complete strategic governance in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'flashcard-deck', label: '1. Master Flashcard Deck' },
              { id: 'formula-matrix', label: '2. Master Dominance Table' },
              { id: 'module-blueprint', label: '3. 7-Topic Architecture SVG' },
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
                    ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-900/40'
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
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-master3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 font-bold text-sm">
                  01
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Interactive Master Flashcard Deck (6 Topics)
                </h2>
              </div>
              <span className="text-xs font-mono text-amber-400 font-semibold">
                Card {flashcardIndex + 1} of {flashcards.length}
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs uppercase tracking-wider font-bold text-blue-400 font-mono">
                  {currentCard.topic}
                </span>
                <button
                  onClick={() => setShowAnswer(!showAnswer)}
                  className="px-3 py-1 bg-blue-950 text-blue-300 border border-blue-800 rounded-lg text-xs font-semibold hover:bg-blue-900 transition-all"
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
                className="px-4 py-2 rounded-xl bg-blue-600 text-white border-blue-500 hover:bg-blue-500 text-xs font-semibold"
              >
                Next Card ▶
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 2: Master Dominance Table */}
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
                Master Dominance Rules Reference Table
              </h2>
            </div>

            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold font-sans">
                    <th className="p-2.5">Rule / Operation</th>
                    <th className="p-2.5 text-blue-400">Mathematical Formulation / Pruning Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Row Dominance (Player A)</td>
                    <td className="p-2.5 text-rose-300">a_ik ≥ a_jk  ∀ k  ==&gt;  DELETE SMALLER ROW j</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Column Dominance (Player B)</td>
                    <td className="p-2.5 text-sky-300">a_kr ≤ a_ks  ∀ k  ==&gt;  DELETE LARGER COLUMN s</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Modified Row Dominance</td>
                    <td className="p-2.5 text-purple-300">λ · R₁ + (1−λ) · R₂ ≥ R_target  ==&gt;  DELETE R_target</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Modified Column Dominance</td>
                    <td className="p-2.5 text-cyan-300">μ · C₁ + (1−μ) · C₂ ≤ C_target  ==&gt;  DELETE C_target</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Standard Test Weights</td>
                    <td className="p-2.5 text-amber-300">λ = 0.5,  μ = 0.5 (Simple Arithmetic Mean)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Eliminated Strategy Weight</td>
                    <td className="p-2.5 text-emerald-400 font-bold">p_eliminated* = 0.0,  q_eliminated* = 0.0</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Value Invariance Theorem</td>
                    <td className="p-2.5 text-emerald-400 font-bold">v*(Original m × n) == v*(Reduced 2 × 2) in ₹</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 3: 7-Topic Architecture SVG */}
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
                Complete 7-Topic Principle of Dominance Architecture
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
                <text x="100" y="65" fill="#cbd5e1" fontSize="8" textAnchor="middle">Topic 0</text>
                <text x="100" y="85" fill="#94a3b8" fontSize="7" textAnchor="middle">Rationality, Asymmetry</text>

                <rect x="200" y="20" width="160" height="85" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <text x="280" y="45" fill="#f43f5e" fontSize="10" fontWeight="bold" textAnchor="middle">2. Row & Col Rules</text>
                <text x="280" y="65" fill="#cbd5e1" fontSize="8" textAnchor="middle">Topics 1 - 2</text>
                <text x="280" y="85" fill="#94a3b8" fontSize="7" textAnchor="middle">Delete Smaller Rows, Larger Cols</text>

                <rect x="380" y="20" width="160" height="85" rx="8" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
                <text x="460" y="45" fill="#a855f7" fontSize="10" fontWeight="bold" textAnchor="middle">3. Modified Dominance</text>
                <text x="460" y="65" fill="#cbd5e1" fontSize="8" textAnchor="middle">Topic 3</text>
                <text x="460" y="85" fill="#94a3b8" fontSize="7" textAnchor="middle">Convex Combinations, Deadlocks</text>

                <rect x="560" y="20" width="160" height="85" rx="8" fill="#1e293b" stroke="#34d399" strokeWidth="2" />
                <text x="640" y="45" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">4. Reduction & Synthesis</text>
                <text x="640" y="65" fill="#cbd5e1" fontSize="8" textAnchor="middle">Topics 4 - 6</text>
                <text x="640" y="85" fill="#94a3b8" fontSize="7" textAnchor="middle">Multi-Pass 4x4➔2x2, Vector Maps</text>

                {/* Unifying Banner */}
                <rect x="20" y="125" width="700" height="75" rx="8" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2" />
                <text x="370" y="155" fill="#93c5fd" fontSize="13" fontWeight="bold" textAnchor="middle">
                  COMPLETE MODULE 005_003 PRINCIPLE OF DOMINANCE MASTERY
                </text>
                <text x="370" y="180" fill="#ffffff" fontSize="10" textAnchor="middle">
                  Asymmetric Pruning • Convex Combination Deadlock Breakers • Matrix Dimensionality Reduction in Indian Rupees (₹)
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
                Bengal Master Dominance Case Studies
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
                  <p className="text-blue-300 font-semibold">💡 <strong>Operations Takeaway:</strong> {cs.lesson}</p>
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
                Top 4 Master Traps in Principle of Dominance
              </h2>
            </div>

            <div className="flex flex-col space-y-2.5">
              {[
                {
                  trap: 'Deleting the Larger Row Instead of the Smaller Row',
                  fix: 'Player A is a Maximizer; always delete the row with SMALLER entries.',
                },
                {
                  trap: 'Deleting the Smaller Column Instead of the Larger Column',
                  fix: 'Player B is a Minimizer; always delete the column with LARGER entries (higher liabilities).',
                },
                {
                  trap: 'Giving Up when Pure Dominance Stalls (Missing Convex Combinations)',
                  fix: 'Always test 50-50 averages of row pairs and column pairs to break reduction deadlocks.',
                },
                {
                  trap: 'Stopping After a Single Pass Without Cascading Re-evaluations',
                  fix: 'Deleting columns removes opponent actions and creates new row dominances; repeat multi-pass cycles until irreducible.',
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
                Master Module Certification Checklist (Topics 0 to 6)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Understood the rational elimination axiom of the Principle of Dominance',
                'Applied Row Dominance: Delete smaller rows for Player A (Maximizer)',
                'Applied Column Dominance: Delete larger columns for Player B (Minimizer)',
                'Differentiated strict dominance from weak dominance',
                'Applied Modified Dominance (50-50 convex combinations) to break deadlocks',
                'Executed multi-pass matrix reductions (4x4 to 2x2) with cascading re-evaluations',
                'Reconstructed full-dimensional probability vectors p* and q* (0.0 on pruned moves)',
                'Verified that Value of the Game v* is 100% invariant under all dominance reductions',
                'Reported all game payoffs and values in Indian Rupees (₹)',
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
              "Heartiest congratulations to Debangshu, Mamata, Mahima, Susmita, and Abhronila! You have completed all 7 topics of Module 005_003 (Principle of Dominance) with 100% mathematical, operational, and financial rigor. You are now masters of row dominance, column dominance, convex combinations, and multi-pass matrix shrinking. In our next module (Module 005_004), we will explore Mixed Strategies for 2x2 games without a saddle point!"
            }
          />
        </section>

        {/* SECTION 8: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Principle of Dominance Master FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 9: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Principle of Dominance Short Questions"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic7_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic6;
