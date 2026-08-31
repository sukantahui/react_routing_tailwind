// src/components/study/quantitative-analysis/topics/005_005_reduction-of-mxn-game/Topic7.jsx
// React 19 Function-based Component
// Module: 005_005_reduction-of-mxn-game
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
      topic: 'Topic 0: Need for Matrix Reduction',
      q: 'Why is dimensionality reduction essential when analyzing large m x n game matrices?',
      a: 'Large m×n matrices require complex Linear Programming Simplex tableaus. Matrix reduction prunes redundant branches, isolates the active strategy support, and enables fast closed-form (2×2) or graphical (2×n/m×2) solutions without changing the Game Value v* in ₹.',
      formula: 'Dimensionality Reduction: m × n ➔ 2 × 2 / 2 × n / 1 × 1',
    },
    {
      topic: 'Topic 1: Reduction of m×n Games',
      q: 'Why is a cascading feedback loop necessary during iterative matrix reduction?',
      a: 'Deleting a column removes constraints on row comparisons, often revealing newly dominant rows that were not dominant in the original matrix. Repeated passes ensure all redundant actions are eliminated.',
      formula: 'Cascading Loop: Col deletions expose new Row dominance',
    },
    {
      topic: 'Topic 2: Use of Dominance for Reduction',
      q: 'What is Modified Dominance (Convex Combinations) and how does it resolve deadlocks?',
      a: 'When no single pure row dominates another, a weighted blend of two rows (λ R₁ + (1−λ) R₂ ≥ R₃) dominates a third row. The simple 50-50 average test ((R₁+R₂)/2 ≥ R₃) breaks deadlocks instantly.',
      formula: 'Convex Blend: λ R₁ + (1−λ) R₂ ≥ R₃',
    },
    {
      topic: 'Topic 3: Reduction to 2×2 Games',
      q: 'How do you conduct a Global Optimality Audit after solving an extracted 2×2 submatrix?',
      a: 'Verify that the reconstructed strategy vector p* yields an expected payoff E(p*, B_j) ≥ v* for ALL columns in the original unreduced matrix, with exact equality on active columns.',
      formula: 'Global Audit: E(p*, B_j) ≥ v* ∀ j ∈ {1, ..., n}',
    },
    {
      topic: 'Topic 4: Reduction to 2×n and m×2 Cases',
      q: 'Why do 2×n games use the Lower Envelope (Maximin) while m×2 games use the Upper Envelope (Minimax)?',
      a: 'In 2×n games, Player B minimizes Player A’s return (lower floor), so Player A maximizes (Maximin peak). In m×2 games, Player A maximizes Player B’s loss (upper ceiling), so Player B minimizes (Minimax trough).',
      formula: '2×n ➔ Lower Envelope Maximin | m×2 ➔ Upper Envelope Minimax',
    },
    {
      topic: 'Topic 5: Interpreting the Reduced Game',
      q: 'How do you translate an optimal mixed strategy vector p* into operational enterprise directives?',
      a: 'Multiply the probabilities p_i* by total operational days or capital budget to schedule active shifts, while completely defunding pruned strategies (0.0 probability = ₹0 budget).',
      formula: 'Allocated Capital = Total Budget × p_i* (in ₹)',
    },
    {
      topic: 'Topic 6: Numerical Exercises & Topologies',
      q: 'What are the 4 standard reduction topologies encountered in operations research exams?',
      a: '1. Cascading 4×4 pure dominance; 2. 3×3 convex combination deadlock break; 3. Asymmetric 4×3 to 2×2; 4. Direct 5×4 saddle point collapse.',
      formula: 'Topologies: 4×4 Cascading, 3×3 Convex, 4×3 Asymmetric, 5×4 Saddle',
    },
  ];

  const currentCard = flashcards[flashcardIndex];

  // Case Studies
  const caseStudies = [
    {
      title: '1. Foundry Master Bidding Reduction (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Debangshu in Barrackpore reduced a 4x4 alloy bidding matrix to a 2x2 submatrix, locking in ₹25,000 daily margin (₹7.5 Lakh monthly return) without Simplex LP tableaus.',
      lesson: 'Matrix reduction transforms multi-variable LP problems into instant calculations.',
    },
    {
      title: '2. Cold-Chain Vaccine Multi-Modal Optimization (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Mamata and Mahima in Kolkata resolved a 3x3 route deadlock via a 50-50 convex blend, stabilizing hospital vaccine transport costs at ₹27,142.86 per cycle.',
      lesson: 'Convex combination dominance ensures optimal multi-modal logistics planning.',
    },
    {
      title: '3. Supermarket FMCG Retail Promotional Streamlining (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Reduced a 4x3 retail matrix in Ichapur down to 2 active promotions, securing an equilibrium revenue of ₹22,000 per campaign and eliminating marketing bleed.',
      lesson: 'Defunding dominated promotions concentrates capital on high-ROI channels.',
    },
    {
      title: '4. Educational High-Tech Lab Patent Arbitration (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Abhronila reduced a 5x4 institutional grid directly to a pure saddle point in Jadavpur, securing an unambiguous ₹40 Lakh licensing settlement for university research labs.',
      lesson: 'Dominance checks reveal pure saddle points in large enterprise matrices.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes masterGlow5 {
          0%, 100% { border-color: rgba(99, 102, 241, 0.3); }
          50% { border-color: rgba(99, 102, 241, 0.8); }
        }
        .glow-master5 {
          animation: masterGlow5 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-indigo-950/80 text-indigo-400 border border-indigo-800/60">
              Segment 5 • Module 005_005 • Topic 7 (Final Master Review)
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-indigo-950/80 text-indigo-400 border border-indigo-800/60">
              Comprehensive Viva Voce • 8-Topic Master Blueprint • Flashcards
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
            Short Questions & Master Synthesis
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            The grand capstone and master review for <span className="text-indigo-400 font-semibold">Module 005_005 (Reduction of m×n Games)</span>: comprehensive <span className="text-emerald-400 font-semibold">Viva Voce Flashcards</span> covering all 7 prior topics, the <span className="text-amber-400 font-semibold">Master Reduction Reference Table</span>, and full financial governance in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'flashcard-deck', label: '1. Master Flashcard Deck' },
              { id: 'reduction-table', label: '2. Master Reduction Table' },
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
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-master5">
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

        {/* SECTION 2: Master Reduction Table */}
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
                Master Matrix Reduction Reference Table
              </h2>
            </div>

            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold font-sans">
                    <th className="p-2.5">Matrix Scenario</th>
                    <th className="p-2.5 text-indigo-400">Reduction Method & Target</th>
                    <th className="p-2.5 text-emerald-400">Solution Technique</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Pure Saddle Point Exists</td>
                    <td className="p-2.5 text-amber-300">Reduce to 1×1 Saddle Cell</td>
                    <td className="p-2.5 text-emerald-300">Direct pure choice v*</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">m×n with Dominated Rows/Cols</td>
                    <td className="p-2.5 text-rose-300">Iterative Sweeps to 2×2 Submatrix</td>
                    <td className="p-2.5 text-emerald-300">Closed-form: Δ, p*, q*, v*</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">3×3 with No Pure Dominance</td>
                    <td className="p-2.5 text-purple-300">50-50 Convex Average Blend</td>
                    <td className="p-2.5 text-emerald-300">Prunes 1 row/col ➔ reduces to 2×2</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Asymmetric 2×n (n ≥ 3 cols)</td>
                    <td className="p-2.5 text-sky-300">2×n Graphical Lower Envelope</td>
                    <td className="p-2.5 text-emerald-300">Maximin Peak at line intersection</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Asymmetric m×2 (m ≥ 3 rows)</td>
                    <td className="p-2.5 text-sky-300">m×2 Graphical Upper Envelope</td>
                    <td className="p-2.5 text-emerald-300">Minimax Trough at line intersection</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Full-Vector Reconstruction</td>
                    <td className="p-2.5 text-amber-300">p_i* = p_sub* (active), 0.0 (pruned)</td>
                    <td className="p-2.5 text-emerald-300">Full mD/nD vector sum = 1.0</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Global Optimality Audit</td>
                    <td className="p-2.5 text-indigo-300">E(p*, B_j) ≥ v* for all cols j</td>
                    <td className="p-2.5 text-emerald-400 font-bold">Verified in Indian Rupees (₹)</td>
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
                Complete 8-Topic m×n Matrix Reduction Blueprint
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
                <text x="100" y="45" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">1. Motivation & Sweeps</text>
                <text x="100" y="65" fill="#cbd5e1" fontSize="8" textAnchor="middle">Topics 0 - 1</text>
                <text x="100" y="85" fill="#94a3b8" fontSize="7" textAnchor="middle">5-Phase Cascading Loop</text>

                <rect x="200" y="20" width="160" height="85" rx="8" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
                <text x="280" y="45" fill="#a855f7" fontSize="10" fontWeight="bold" textAnchor="middle">2. Dominance Applications</text>
                <text x="280" y="65" fill="#cbd5e1" fontSize="8" textAnchor="middle">Topic 2</text>
                <text x="280" y="85" fill="#94a3b8" fontSize="7" textAnchor="middle">Strict, Weak, Convex Blends</text>

                <rect x="380" y="20" width="160" height="85" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <text x="460" y="45" fill="#f43f5e" fontSize="10" fontWeight="bold" textAnchor="middle">3. Reduction Targets</text>
                <text x="460" y="65" fill="#cbd5e1" fontSize="8" textAnchor="middle">Topics 3 - 4</text>
                <text x="460" y="85" fill="#94a3b8" fontSize="7" textAnchor="middle">2×2 Closed-Form & 2×n/m×2</text>

                <rect x="560" y="20" width="160" height="85" rx="8" fill="#1e293b" stroke="#34d399" strokeWidth="2" />
                <text x="640" y="45" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">4. Interpretation & Viva</text>
                <text x="640" y="65" fill="#cbd5e1" fontSize="8" textAnchor="middle">Topics 5 - 7</text>
                <text x="640" y="85" fill="#94a3b8" fontSize="7" textAnchor="middle">Resource Allocation in ₹</text>

                {/* Banner */}
                <rect x="20" y="125" width="700" height="75" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                <text x="370" y="155" fill="#a5b4fc" fontSize="13" fontWeight="bold" textAnchor="middle">
                  COMPLETE MODULE 005_005 m×n MATRIX REDUCTION MASTERY
                </text>
                <text x="370" y="180" fill="#ffffff" fontSize="10" textAnchor="middle">
                  Iterative Sweeps • Convex Blends • 2×2 Extraction • Global Auditing in Indian Rupees (₹)
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
                Bengal Master m×n Reduction Case Studies
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
                Top 4 Master Traps in m×n Reduction
              </h2>
            </div>

            <div className="flex flex-col space-y-2.5">
              {[
                {
                  trap: 'Stopping After 1 Pass (Missing Newly Dominant Rows Exposed by Column Deletions)',
                  fix: 'Always loop back! Re-check row dominance after every column deletion until steady state.',
                },
                {
                  trap: 'Player B Deleting the Smaller Column Instead of the Larger Column',
                  fix: 'Player B is a MINIMIZER and deletes LARGER columns (higher costs/losses).',
                },
                {
                  trap: 'Reporting Reduced Sub-Game Probabilities Instead of Full mD/nD Vectors',
                  fix: 'Reconstruct full vectors: assign 0.0 to all pruned rows and columns.',
                },
                {
                  trap: 'Skipping the Global Optimality Audit on Original Columns',
                  fix: 'Verify that E(p*, B_j) ≥ v* for ALL columns in the original unreduced matrix.',
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
                'Recognized the computational bottlenecks of unreduced m x n matrices',
                'Mastered the 5-phase iterative reduction algorithm with cascading feedback loops',
                'Applied strict, weak, and convex combination dominance',
                'Solved 2xn and mx2 games via graphical lower and upper envelopes',
                'Reconstructed full m-dimensional and n-dimensional strategy vectors',
                'Executed global optimality audits against all original matrix cells',
                'Reported all corporate valuations and budgets in Indian Rupees (₹)',
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
              "Heartiest congratulations to Debangshu, Mamata, Mahima, Susmita, and Abhronila! You have completed all 8 topics of Module 005_005 (Reduction of m×n Games) with total mathematical, graphical, and managerial mastery. You know how to sweep rows and columns, break deadlocks with convex blends, extract 2x2 sub-games, solve 2xn/mx2 envelopes, and audit solutions in Indian Rupees (₹). In our final Segment 5 module (Module 005_006), we will dive deep into 2×n and m×2 Cases: Graphical & Algebraic Methods!"
            }
          />
        </section>

        {/* SECTION 8: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="mxn Reduction Master FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 9: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Reduction of m×n Games Short Questions"
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
