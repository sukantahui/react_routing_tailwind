// src/components/study/quantitative-analysis/topics/002_005_test-of-optimality-by-modi-method/Topic12.jsx
// React 19 Function-based Component
// Module: 002_005_test-of-optimality-by-modi-method
// Topic 12: Short Questions

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic12_files/topic12_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic12_files/topic12_note.txt?raw';

const Topic12 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [activeCard, setActiveCard] = useState(0);
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

  // Flashcards for Rapid-Fire Review
  const flashcards = [
    {
      q: '1. What is the fundamental basic cell governing equation in MODI?',
      a: 'uᵢ + vⱼ = cᵢⱼ for all basic (occupied) cells where xᵢⱼ > 0 (by Complementary Slackness).',
      tag: 'Dual Equation',
    },
    {
      q: '2. What is the formula for Opportunity Cost / Net Evaluation Index (dᵢⱼ)?',
      a: 'dᵢⱼ = cᵢⱼ - (uᵢ + vⱼ) for all unoccupied non-basic cells.',
      tag: 'Opportunity Cost',
    },
    {
      q: '3. What exact condition proves global cost minimality in MODI?',
      a: 'All dᵢⱼ ≥ 0 (every non-basic cell has non-negative opportunity cost).',
      tag: 'Optimality Criterion',
    },
    {
      q: '4. How is the entering variable selected when multiple dᵢⱼ < 0 exist?',
      a: "Entering Cell = argmin { dᵢⱼ | dᵢⱼ < 0 } (Dantzig's Most Negative Opportunity Cost Simplex Rule).",
      tag: 'Entering Rule',
    },
    {
      q: '5. How is the maximum transfer flow θ calculated along the closed loop?',
      a: 'θ = min { xᵢⱼ | (i, j) is a MINUS (-) corner vertex of the loop }.',
      tag: 'Flow Pivoting',
    },
    {
      q: '6. How does Strong Duality verify that the optimal cost is 100% correct?',
      a: 'By confirming that Primal Min Cost Z* exactly equals Dual Max Objective W* (Zero Duality Gap).',
      tag: 'Strong Duality',
    },
  ];

  const currentCard = flashcards[activeCard];

  // Case Studies
  const caseStudies = [
    {
      title: '1. Foundry Exam Review & Viva Mastery (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Mastered the 8 core formulas and 30 conceptual viva questions. Answered questions on dual shadow prices (u and v) and Invariance Theorem with 100% accuracy.',
      lesson: 'Short questions solidify theoretical comprehension for technical job interviews.',
    },
    {
      title: '2. Cold-Chain Vaccine Rapid-Fire Diagnostics (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Used flashcard drills to train healthcare dispatch officers to instantly identify entering cells and verify non-negativity across regional hospital tableaus.',
      lesson: 'Flashcard practice builds lightning-fast matrix analysis skills.',
    },
    {
      title: '3. Supermarket FMCG Viva Prep for Managers (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Trained retail store managers on alternative optima (d_ij = 0) and degeneracy resolution using epsilon (ε), enabling flexible freight reassignments.',
      lesson: 'Conceptual depth empowers supply chain leaders to handle unexpected field anomalies.',
    },
    {
      title: '4. Educational Press Tender Concluding Statements (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Drafted formal concluding statements for state university textbook freight tenders: "Since all d_ij ≥ 0, Certified Minimum Total Cost Z* = ₹9,400."',
      lesson: 'Formal concluding statements guarantee full compliance with government audit standards.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes cardGlow {
          0%, 100% { border-color: rgba(245, 158, 11, 0.3); }
          50% { border-color: rgba(245, 158, 11, 0.8); }
        }
        .glow-card {
          animation: cardGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
              Module 002_005 • Topic 12 (Final Topic)
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-amber-950/80 text-amber-400 border border-amber-800/60">
              Viva-Voce & Conceptual Revision
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Short Questions & Conceptual Exam Review
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive rapid-fire revision suite for the entire MODI module: interactive <span className="text-amber-400 font-semibold">Concept Flashcards</span>, the <span className="text-emerald-400 font-semibold">8-Point Master Cheatsheet</span>, viva-voce interview questions, and final examination preparation.
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'flashcards', label: '1. Interactive Concept Flashcards' },
              { id: 'cheatsheet', label: '2. 8-Point Formula Cheatsheet' },
              { id: 'knowledge-map', label: '3. Complete MODI Knowledge Map' },
              { id: 'case-studies', label: '4. Bengal Case Studies' },
              { id: 'pitfalls', label: '5. Common Pitfalls' },
              { id: 'hints', label: '6. Guided Hints' },
              { id: 'checklist', label: '7. Revision Checklist' },
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
              &gt;
                {item.label}
              </button>
            ))}
          </div>
        </header>

        {/* SECTION 1: Interactive Concept Flashcards */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-card">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 font-bold text-sm">
                  01
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Rapid-Fire Concept Flashcard Workbench
                </h2>
              </div>
              <div className="flex items-center gap-1.5">
                {flashcards.map((fc, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveCard(idx);
                      setShowAnswer(false);
                    }}
                    className={clsx(
                      'px-2.5 py-1 rounded text-xs font-semibold transition-all border',
                      activeCard === idx
                        ? 'bg-amber-600 text-white border-amber-400 shadow-md'
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                    )}
                  &gt;
                    Card {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Flashcard Box */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col space-y-4 min-h-[160px] justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  Topic: {currentCard.tag}
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  {activeCard + 1} of {flashcards.length}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
                {currentCard.q}
              </h3>

              {showAnswer ? (
                <div className="p-4 rounded-xl bg-slate-900 border border-emerald-800/80 text-emerald-300 text-xs sm:text-sm font-medium">
                  {currentCard.a}
                </div>
              ) : (
                <button
                  onClick={() => setShowAnswer(true)}
                  className="py-2.5 px-4 rounded-xl bg-slate-900 text-slate-400 border border-slate-800 hover:bg-slate-800 hover:text-white transition-all text-xs font-semibold"
                &gt;
                  💡 Click to Reveal Answer
                </button>
              )}
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  setActiveCard((prev) => (prev > 0 ? prev - 1 : flashcards.length - 1));
                  setShowAnswer(false);
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 text-xs font-semibold"
              >
                ◀ Previous Card
              </button>
              <button
                onClick={() => {
                  setActiveCard((prev) => (prev < flashcards.length - 1 ? prev + 1 : 0));
                  setShowAnswer(false);
                }}
                className="px-4 py-2 rounded-xl bg-amber-600 text-white border border-amber-500 hover:bg-amber-500 text-xs font-semibold"
              >
                Next Card ▶
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 2: 8-Point Formula Cheatsheet */}
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
                The 8-Point Master Formula Cheatsheet
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              {[
                { title: '1. Basic Cell Equation', formula: 'uᵢ + vⱼ = cᵢⱼ', desc: 'Satisfied by all occupied basic cells where xᵢⱼ &gt; 0.' },
                { title: '2. Opportunity Cost Formula', formula: 'dᵢⱼ = cᵢⱼ - (uᵢ + vⱼ)', desc: 'Evaluated for all unoccupied non-basic cells.' },
                { title: '3. Global Optimality Criterion', formula: 'all dᵢⱼ ≥ 0', desc: 'Equivalent to LP Dual Feasibility uᵢ + vⱼ ≤ cᵢⱼ.' },
                { title: '4. Entering Variable Rule', formula: 'argmin { dᵢⱼ | dᵢⱼ < 0 }', desc: "Dantzig's steepest descent simplex pivot rule." },
                { title: '5. Transfer Quantity (Theta)', formula: 'θ = min(x_minus)', desc: 'Minimum allocation among minus corners of the closed loop.' },
                { title: '6. Total Cost Reduction', formula: 'ΔZ = θ · |d_enter|', desc: 'Exact cost savings achieved on a single iteration.' },
                { title: '7. Strong Duality Audit', formula: 'Z* === W*', desc: 'Primal Min Cost Z* equals Dual Max Objective W*.' },
                { title: '8. Non-Degeneracy Condition', formula: 'Count = m + n - 1', desc: 'Guarantees spanning tree connectivity on bipartite graph.' },
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1.5">
                  <span className="text-amber-300 font-bold">{item.title}</span>
                  <div className="p-2 bg-slate-950 rounded font-mono text-emerald-300 font-bold text-xs sm:text-sm">
                    {item.formula}
                  </div>
                  <p className="text-slate-300 text-xs">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: Complete MODI Knowledge Map SVG */}
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
                Complete MODI Method Knowledge Map
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 260"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Core Concept Nodes */}
                <rect x="50" y="40" width="180" height="70" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="140" y="70" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">1. Dual LP Foundations</text>
                <text x="140" y="90" fill="#cbd5e1" fontSize="10" textAnchor="middle">uᵢ + vⱼ = cᵢⱼ • u₁ = 0</text>

                <rect x="280" y="40" width="180" height="70" rx="8" fill="#1e293b" stroke="#fbbf24" strokeWidth="2" />
                <text x="370" y="70" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">2. Opportunity Costs</text>
                <text x="370" y="90" fill="#cbd5e1" fontSize="10" textAnchor="middle">dᵢⱼ = cᵢⱼ − (uᵢ + vⱼ)</text>

                <rect x="510" y="40" width="180" height="70" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <text x="600" y="70" fill="#f43f5e" fontSize="12" fontWeight="bold" textAnchor="middle">3. Optimality & Entry</text>
                <text x="600" y="90" fill="#cbd5e1" fontSize="10" textAnchor="middle">all d ≥ 0? • argmin(d &lt; 0)</text>

                <rect x="160" y="150" width="190" height="70" rx="8" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
                <text x="255" y="180" fill="#a855f7" fontSize="12" fontWeight="bold" textAnchor="middle">4. Closed Loops & Pivot</text>
                <text x="255" y="200" fill="#cbd5e1" fontSize="10" textAnchor="middle">90° turns • θ = min(x_minus)</text>

                <rect x="400" y="150" width="190" height="70" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                <text x="495" y="180" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">5. Final Certified Z*</text>
                <text x="495" y="200" fill="#ffffff" fontSize="10" fontFamily="monospace" textAnchor="middle">Min Z = ₹2,060 (Z* = W*)</text>

                {/* Connecting Flow Lines */}
                <line x1="230" y1="75" x2="280" y2="75" stroke="#94a3b8" strokeWidth="2" />
                <line x1="460" y1="75" x2="510" y2="75" stroke="#94a3b8" strokeWidth="2" />
                <line x1="600" y1="110" x2="255" y2="150" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 3" />
                <line x1="350" y1="185" x2="400" y2="185" stroke="#10b981" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 4: Real-World Bengal Case Studies */}
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
                Bengal Logistics Concept Review Case Studies
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
                  <p className="text-amber-300 font-semibold">💡 <strong>Operations Takeaway:</strong> {cs.lesson}</p>
                </div>
              );
            })()}
          </div>
        </section>

        {/* SECTION 5: Common Pitfalls */}
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
                Common Beginner Mistakes
              </h2>
            </div>

            <div className="flex flex-col space-y-2.5">
              {[
                {
                  trap: 'Forgetting to Set u₁ = 0 Before Solving Potentials',
                  fix: 'Anchor the linear system by setting one dual variable to 0 (typically u₁ = 0).',
                },
                {
                  trap: 'Reversing the Opportunity Cost Formula',
                  fix: 'The formula is strictly d_ij = c_ij - (u_i + v_j), NOT (u_i + v_j) - c_ij.',
                },
                {
                  trap: 'Picking θ from the Plus (+) Corners',
                  fix: 'θ is strictly the minimum among MINUS (-) corners: θ = min(x_minus).',
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

        {/* SECTION 6: Guided Hints */}
        <section
          ref={(el) => (sectionRefs.current[5] = el)}
          data-index="5"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 font-bold text-sm">
                06
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Guided Hints
              </h2>
            </div>

            <div className="flex flex-col space-y-3">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-amber-300 font-semibold text-sm">💡 Think about…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Think of the MODI method as a closed-loop feedback engine: calculate potentials, evaluate opportunity costs, pivot along the closed loop, and repeat until all errors are eliminated!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully that having alternative optima (d_ij = 0) is a gift to operations managers—it allows rerouting without spending a single extra rupee.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: Revision Checklist */}
        <section
          ref={(el) => (sectionRefs.current[6] = el)}
          data-index="6"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                07
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Complete Module 002_005 Revision Checklist
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Topic 0: Understood the necessity of testing optimality over initial heuristics',
                'Topic 1: Mastered the 5-step MODI execution engine',
                'Topic 2: Solved u-v dual potential variables using u_i + v_j = c_ij and proved invariance',
                'Topic 3: Computed opportunity costs d_ij = c_ij - (u_i + v_j)',
                'Topic 4: Mastered the optimality condition: all d_ij ≥ 0',
                'Topic 5: Identified entering cells using Dantzig\'s most negative rule and tie protocols',
                'Topic 6: Traced closed stepping-stone loops on basic cells',
                'Topic 7: Applied plus-minus sign alternation and θ = min(x_minus) transfer',
                'Topic 8: Improved transportation solutions and verified post-pivot invariants',
                'Topic 9: Tracked repeated MODI iterations and monotonic convergence',
                'Topic 10: Certified final minimum transportation cost Z* in Indian Rupees (₹)',
                'Topic 11: Solved standard, multi-destination, unbalanced, and degenerate exercises',
                'Topic 12: Answered all 30 conceptual viva-voce short questions',
              ].map((text, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-800/40 border border-slate-700/60 flex items-center space-x-3">
                  <span className="text-emerald-400">✅</span>
                  <span className="text-xs sm:text-sm text-slate-300">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 8: Teacher's Note */}
        <section className="flex flex-col space-y-6">
          <Teacher
            note={
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: congratulations on completing the entire Module 002_005 on the Test of Optimality by the MODI Method! You now have a complete mathematical understanding of linear programming duality, potential propagation, opportunity cost gradients, stepping-stone cycles, flow pivoting, and final cost certification in Indian Rupees (₹). Keep this 8-point cheatsheet close to your heart, practice your 4 numerical problem types, and you will achieve absolute mastery in both academic examinations and real-world industrial operations!"
            }
          />
        </section>

        {/* SECTION 9: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Short Questions & Viva-Voce FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 10: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Short Questions (MODI Method)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic13_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic12;
