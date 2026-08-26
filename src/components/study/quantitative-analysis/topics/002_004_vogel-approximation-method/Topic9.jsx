// src/components/study/quantitative-analysis/topics/002_004_vogel-approximation-method/Topic9.jsx
// React 19 Function-based Component
// Module: 002_004_vogel-approximation-method
// Topic 9: Short Questions & Rapid Revision

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic9_files/topic9_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic9_files/topic9_note.txt?raw';

const Topic9 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedCardIdx, setSelectedCardIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [selectedExample, setSelectedExample] = useState(0);

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

  // Flashcards for Rapid-Fire Revision
  const flashcards = [
    {
      topic: '1. What is Vogel\'s Approximation Method?',
      question: 'What is the core working principle of VAM?',
      answer: 'VAM calculates the penalty (opportunity cost) of missing the cheapest shipping route in each row and column, selecting the line with the MAXIMUM penalty to allocate to its LOWEST cost cell.',
      keyFormula: 'Penalty = (Second Lowest Cost) - (Lowest Cost)',
      badge: 'Core Concept',
    },
    {
      topic: '2. Maximum Penalty Selection',
      question: 'Why do we choose the MAXIMUM penalty rather than the minimum?',
      answer: 'The line with the largest penalty represents the greatest financial danger (regret). Protecting this route first prevents paying severe cost penalties later.',
      keyFormula: 'Winning Line L* = argmax { P_rows, P_cols }',
      badge: 'Selection Rule',
    },
    {
      topic: '3. Tie-Breaking Hierarchy',
      question: 'How are ties broken when two or more lines share the max penalty?',
      answer: 'Tier 1: Select the line with the smaller minimum unit cost min(c_ij). Tier 2: Select the cell with larger allocation volume min(S_i, D_j). Tier 3: Choose arbitrarily.',
      keyFormula: 'Tier 1: min(c_ij) ➔ Tier 2: max(volume)',
      badge: 'Tie-Breaker',
    },
    {
      topic: '4. Dynamic Recalculation',
      question: 'Why must penalties be recalculated after every allocation pass?',
      answer: 'Crossing out an exhausted row or column alters the active candidate set, shifting the lowest and second-lowest costs in intersecting lines.',
      keyFormula: 'P_i\' = c_(i,2)\' - c_(i,1)\' on reduced matrix',
      badge: 'Algorithm Step',
    },
    {
      topic: '5. Balancing Unbalanced Models',
      question: 'How are excess supply and excess demand handled before running VAM?',
      answer: 'Excess Supply: Add Dummy Column D_(n+1) with rate ₹0. Excess Demand: Add Dummy Row S_(m+1) with rate ₹0. Allocate using standard rules; dummy shipments cost ₹0.',
      keyFormula: 'Dummy Cost c_ij = ₹0; Z = real freight bill only',
      badge: 'Balancing',
    },
    {
      topic: '6. Basis Count & Non-Degeneracy',
      question: 'What is the exact formula for required basic cells in an m × n matrix?',
      answer: 'Exactly m + n - 1 basic cells. If fewer exist, the solution is degenerate, and an epsilon (ε > 0) must be placed in an independent, cheap cell for MODI testing.',
      keyFormula: 'Required Basic Cells = m + n - 1',
      badge: 'Basis Audit',
    },
    {
      topic: '7. Epsilon (ε) Placement Rule',
      question: 'Where can epsilon (ε) be safely placed in a degenerate tableau?',
      answer: 'In an unallocated cell that does NOT form a closed rectangular loop with existing basic cells, prioritizing the cell with the lowest unit rate min(c_ij).',
      keyFormula: 'Place ε at argmin { c_ij | acyclic }',
      badge: 'Perturbation',
    },
    {
      topic: '8. Total Cost Formulation',
      question: 'How is total initial transportation cost Z calculated?',
      answer: 'Z = ∑ ∑ c_ij · x_ij across all occupied basic cells in Indian Rupees (₹). Dummy cells contribute 0 rupees.',
      keyFormula: 'Z = ∑_{(i,j) ∈ Basis} (c_ij · x_ij) in ₹',
      badge: 'Objective Z',
    },
  ];

  const currentCard = flashcards[selectedCardIdx];

  // Case Studies
  const caseStudies = [
    {
      title: '1. Barrackpore Heavy Foundry Rapid Audit (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Rapidly verified 3x3 balance, calculated multi-pass margins, confirmed 5 basic cells (3+3-1=5), and verified total initial cost Z = ₹2,060.',
      vivaTip: 'In viva exams, always state your m+n-1 basis count immediately after calculating Z!',
    },
    {
      title: '2. Greater Kolkata Vaccine Shortage Defense (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Demonstrated why dummy row allocations represent unmet patient shortages with zero direct logistics expenditure.',
      vivaTip: 'Explain that dummy costs are ₹0 because they represent deferred shipments, not physical transport.',
    },
    {
      title: '3. Supermarket FMCG Tie-Breaker Presentation (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Summarized the 3-tier tie-breaking protocol under corporate executive review, showing how Tier 1 and Tier 2 protect company budgets.',
      vivaTip: 'Memorize the 3 tiers: Tier 1 (min unit cost) -> Tier 2 (max allocation volume) -> Tier 3 (arbitrary).',
    },
    {
      title: '4. Educational Press Optimality Verification (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Reviewed the entire VAM pipeline from initial data formulation to loop testing and MODI readiness.',
      vivaTip: 'Highlight that VAM solutions are already globally optimal in over 80% of textbook problems.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes flashGlow {
          0%, 100% { border-color: rgba(168, 85, 247, 0.3); }
          50% { border-color: rgba(168, 85, 247, 0.8); }
        }
        .glow-flash {
          animation: flashGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
              Module 002_004 • Topic 9
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-purple-950/80 text-purple-400 border border-purple-800/60">
              Rapid Revision & Viva Prep
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Short Questions & Rapid Revision
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            High-yield conceptual revision and viva preparation for <span className="text-purple-400 font-semibold">Vogel's Approximation Method</span>: interactive flashcards, key formulas, comparison matrix (<span className="text-emerald-400 font-semibold">VAM vs. NWCR vs. Matrix Minima</span>), common exam traps, and full procedural checklists.
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'flashcards', label: '1. Interactive Flashcard Lab' },
              { id: 'commandments', label: '2. 10 Commandments of VAM' },
              { id: 'comparison-matrix', label: '3. Comparative Summary' },
              { id: 'case-studies', label: '4. Bengal Case Studies' },
              { id: 'pitfalls', label: '5. Viva Pitfalls' },
              { id: 'hints', label: '6. Guided Hints' },
              { id: 'checklist', label: '7. Final Exam Checklist' },
            ].map((item, idx) => (
              <button
                key={item.id}
                onClick={() => {
                  sectionRefs.current[idx]?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={clsx(
                  'px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 border',
                  activeSection === idx
                    ? 'bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-900/40'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </header>

        {/* SECTION 1: Interactive Flashcard Lab */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-flash">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-600/20 text-purple-400 font-bold text-sm">
                  01
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Interactive Rapid-Fire Flashcard Lab
                </h2>
              </div>
              <span className="text-xs text-purple-400 font-mono bg-purple-950 px-3 py-1 rounded-full border border-purple-800">
                Card {selectedCardIdx + 1} of {flashcards.length} • {currentCard.badge}
              </span>
            </div>

            {/* Flashcard Selector */}
            <div className="flex flex-wrap gap-2">
              {flashcards.map((fc, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedCardIdx(idx);
                    setRevealed(false);
                  }}
                  className={clsx(
                    'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border text-left',
                    selectedCardIdx === idx
                      ? 'bg-purple-600 text-white border-purple-400 shadow-md'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                  )}
                >
                  {fc.topic.split('.')[0]}
                </button>
              ))}
            </div>

            {/* Flashcard Body */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col space-y-4">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">{currentCard.topic}</span>
              <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">{currentCard.question}</h3>

              <div className="pt-2">
                {revealed ? (
                  <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 flex flex-col space-y-2">
                    <span className="text-emerald-300 font-bold text-xs uppercase tracking-wide">Detailed Answer:</span>
                    <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">{currentCard.answer}</p>
                    <div className="p-2 bg-slate-950 rounded font-mono text-amber-300 text-xs mt-2 border border-slate-800">
                      Formula: {currentCard.keyFormula}
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setRevealed(true)}
                    className="w-full py-4 rounded-xl bg-slate-900 border border-purple-800/40 text-purple-300 hover:text-white hover:bg-purple-950/60 transition-all font-semibold text-xs sm:text-sm flex items-center justify-center space-x-2"
                  >
                    <span>🔍 Click to Reveal Detailed Model Answer & Formula</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: The 10 Commandments of VAM */}
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
                The 10 Commandments of Vogel's Approximation Method
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
              {[
                { num: '1', title: 'Balance Verification', text: 'Confirm ∑ Sᵢ = ∑ Dⱼ before calculating any penalties.' },
                { num: '2', title: 'Dummy Insertion', text: 'Add ₹0 dummy col for excess supply; add ₹0 dummy row for excess demand.' },
                { num: '3', title: 'Dual Penalty Formula', text: 'Penalty = (Second Lowest Cost) - (Lowest Cost) in each line.' },
                { num: '4', title: 'Max Penalty Priority', text: 'Always select the line with global maximum penalty: L* = argmax(P).' },
                { num: '5', title: 'Least-Cost Cell Assignment', text: 'Inside line L*, allocate x = min(S, D) to the cheapest cell.' },
                { num: '6', title: 'Tie-Breaking Protocol', text: 'Tier 1: min unit cost min(cᵢⱼ) ➔ Tier 2: max allocation volume.' },
                { num: '7', title: 'Single Line Strike-Out', text: 'If S_k = D_l, cross out only ONE line to avoid degeneracy.' },
                { num: '8', title: 'Dynamic Recalculation', text: 'Recompute penalties on the active sub-matrix after every pass.' },
                { num: '9', title: 'Basis Verification', text: 'Confirm exactly m + n - 1 basic cells exist; add ε if degenerate.' },
                { num: '10', title: 'Total Cost Objective', text: 'Calculate Z = ∑ ∑ cᵢⱼ · xᵢⱼ in Indian Rupees (₹).' },
              ].map((cmd) => (
                <div key={cmd.num} className="p-3 rounded-xl bg-slate-800/40 border border-slate-700 flex items-start space-x-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-600/30 text-purple-300 font-bold text-xs mt-0.5">
                    {cmd.num}
                  </span>
                  <div>
                    <h4 className="text-white font-semibold text-xs sm:text-sm">{cmd.title}</h4>
                    <p className="text-slate-300 text-xs mt-0.5">{cmd.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: Comparative Summary */}
        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          data-index="2"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-600/20 text-cyan-400 font-bold text-sm">
                03
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Transportation Methods Comparative Matrix
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-300 bg-slate-950">
                    <th className="p-3 font-semibold">Evaluation Criteria</th>
                    <th className="p-3 font-semibold text-rose-300">North-West Corner (NWCR)</th>
                    <th className="p-3 font-semibold text-amber-300">Matrix Minima (Least Cost)</th>
                    <th className="p-3 font-semibold text-emerald-300">Vogel's Method (VAM)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="p-3 font-medium text-white">Cost Awareness</td>
                    <td className="p-3 text-rose-400">Zero (Cost-blind)</td>
                    <td className="p-3 text-amber-400">Greedy (1-cell focus)</td>
                    <td className="p-3 text-emerald-400 font-bold">Dual Opportunity Cost</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-white">Penalty Evaluation</td>
                    <td className="p-3 text-rose-400">None</td>
                    <td className="p-3 text-amber-400">None</td>
                    <td className="p-3 text-emerald-400 font-bold">Row & Column Penaltie</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-white">Solution Quality</td>
                    <td className="p-3 text-rose-400">Poor (Arbitrary)</td>
                    <td className="p-3 text-amber-400">Moderate</td>
                    <td className="p-3 text-emerald-400 font-bold">Near-Optimal (1-2% gap)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-white">Average Cost Savings</td>
                    <td className="p-3 text-rose-400">Baseline (0%)</td>
                    <td className="p-3 text-amber-400">10% - 15% savings</td>
                    <td className="p-3 text-emerald-400 font-bold">25% - 40% savings</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-white">MODI Optimality Pivots</td>
                    <td className="p-3 text-rose-400">4 - 8 pivots required</td>
                    <td className="p-3 text-amber-400">2 - 4 pivots required</td>
                    <td className="p-3 text-emerald-400 font-bold">0 - 1 pivot (Often Optimal)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 4: Real-World Bengal Case Studies */}
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
                Bengal Logistics Viva Review Case Studies
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
                  <p className="text-purple-300 font-semibold">💡 <strong>Viva Answer Tip:</strong> {cs.vivaTip}</p>
                </div>
              );
            })()}
          </div>
        </section>

        {/* SECTION 5: Viva Pitfalls */}
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
                Top 3 Viva Exam Pitfalls to Avoid
              </h2>
            </div>

            <div className="flex flex-col space-y-2.5">
              {[
                {
                  trap: 'Saying VAM "Guarantees Global Optimality"',
                  fix: 'Clarify that VAM is a heuristic for Initial Basic Feasible Solutions (IBFS). While near-optimal, it must be verified with MODI.',
                },
                {
                  trap: 'Forgetting that Dummy Cost is Always ₹0',
                  fix: 'Explain that dummy routes are fictitious mathematical variables that add zero financial cost to the real shipping budget.',
                },
                {
                  trap: 'Stating that Degeneracy Breaks the Initial Solution',
                  fix: 'Explain that degeneracy simply means fewer than m + n - 1 basic cells, easily cured with epsilon (ε) perturbation.',
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
        >
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
                  Think about how every step in VAM serves a dual purpose: immediate cost reduction (min cell cost) paired with strategic risk defense (max penalty selection)!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully that having 30 short questions in your revision toolkit gives you rapid recall for any viva, midterm, or final exam question.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: Final Exam Revision Checklist */}
        <section
          ref={(el) => (sectionRefs.current[6] = el)}
          data-index="6"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                07
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Final Exam Revision Checklist (Topic 9 Master)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Defined penalty as difference between second lowest and lowest unit cost',
                'Memorized 3-tier tie-breaking protocol (Tier 1 min cost ➔ Tier 2 max volume)',
                'Understood ₹0 dummy line insertion for excess supply and excess demand',
                'Demonstrated single-line cross-out to avoid degeneracy on simultaneous zero',
                'Verified loop-free epsilon (ε) placement rule to maintain basis count m + n - 1',
                'Compared VAM savings against Matrix Minima (15%) and NWCR (35%)',
                'Expressed final total transportation cost Z in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: you have now completed all 10 topics in Vogel's Approximation Method! From understanding the psychological philosophy of economic regret in Topic 0 to mastering the complete 6-phase procedure, dummy line mechanics, degeneracy epsilon perturbation, and rapid-fire short questions, you possess the complete toolkit of an expert operations analyst. When sitting for your exams or designing supply chains in Barrackpore, Kolkata, Ichapur, and Jadavpur, carry this structured discipline with you. State your assumptions, audit your margins, verify m + n - 1 basic cells, and calculate your total cost Z in ₹ with total confidence!"
            }
          />
        </section>

        {/* SECTION 9: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Short Questions FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 10: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Short Questions (Vogel's Approximation Method)"
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
