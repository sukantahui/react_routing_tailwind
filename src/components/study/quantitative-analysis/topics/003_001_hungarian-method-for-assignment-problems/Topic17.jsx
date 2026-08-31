// src/components/study/quantitative-analysis/topics/003_001_hungarian-method-for-assignment-problems/Topic17.jsx
// React 19 Function-based Component
// Module: 003_001_hungarian-method-for-assignment-problems
// Topic 17: Short Questions

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic17_files/topic17_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic17_files/topic17_note.txt?raw';

const Topic17 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [revealedAnswers, setRevealedAnswers] = useState({});

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

  const toggleReveal = (idx) => {
    setRevealedAnswers((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const flashcards = [
    {
      category: 'foundations',
      q: '1. What is an Assignment Problem?',
      a: 'A 1-to-1 linear matching optimization problem that pairs n resources to n tasks at minimum total cost (or maximum profit), ensuring no double-booking.',
      tag: 'Foundations',
    },
    {
      category: 'foundations',
      q: '2. Why is the Assignment model a degenerate Transportation problem?',
      a: 'It requires 2n − 1 basic variables, but has only n positive allocations (xᵢⱼ = 1), leaving n − 1 basic variables with zero value (extreme degeneracy).',
      tag: 'Foundations',
    },
    {
      category: 'foundations',
      q: '3. What is the time complexity of the Hungarian Method?',
      a: 'O(n³) polynomial time, compared to brute-force factorial search O(n!).',
      tag: 'Foundations',
    },
    {
      category: 'reductions',
      q: '4. What is Kőnig’s Theorem (1931)?',
      a: 'The MINIMUM number of horizontal/vertical lines (L) needed to cover all zeros EQUALS the MAXIMUM number of independent zeros (M).',
      tag: 'Reductions & Lines',
    },
    {
      category: 'reductions',
      q: '5. When is the reduced matrix certified as GLOBALLY OPTIMAL?',
      a: 'When the minimum lines covering all zeros equals the matrix order: L = n.',
      tag: 'Reductions & Lines',
    },
    {
      category: 'reductions',
      q: '6. What is the 3-part Step 4b rule (Additional Reductions)?',
      a: '1. Uncovered cells subtract e; 2. Intersections add e; 3. Single-covered cells remain completely UNCHANGED.',
      tag: 'Reductions & Lines',
    },
    {
      category: 'maximization',
      q: '7. How do you convert a Maximization Problem into Minimization?',
      a: 'Find M_max = max(P) across the entire matrix and subtract every entry from it: cᵢⱼ = M_max − pᵢⱼ (Relative Regret Matrix).',
      tag: 'Maximization & Unbalanced',
    },
    {
      category: 'maximization',
      q: '8. How do you balance an Unbalanced Problem (m ≠ n)?',
      a: 'Add |m − n| dummy rows (if m < n) or dummy columns (if m > n) with unit costs of exactly ₹0.',
      tag: 'Maximization & Unbalanced',
    },
    {
      category: 'allocation',
      q: '9. What is the Box [0] & Cross-Out (X) Protocol in Step 5?',
      a: 'Scan rows/cols with 1 zero ➔ Box [0] (assign xᵢⱼ = 1) ➔ Cross out (X) conflicting zeros in the same column/row to prevent double-booking.',
      tag: 'Allocation & Duality',
    },
    {
      category: 'allocation',
      q: '10. How does Strong Duality verify global optimality?',
      a: 'Certified Minimum Primal Cost Z* exactly equals Total Dual Potential W* = ∑ uᵢ + ∑ vⱼ + ∑ ΔW (Zero Duality Gap).',
      tag: 'Allocation & Duality',
    },
  ];

  const filteredCards =
    selectedCategory === 'all'
      ? flashcards
      : flashcards.filter((c) => c.category === selectedCategory);

  // Case Studies
  const caseStudies = [
    {
      title: '1. Foundry Operations Policy Audit (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Mastered all 18 topics across balanced, unbalanced, and restricted foundry scenarios in Barrackpore, achieving certified cost leadership (Z* = ₹46).',
      lesson: 'Complete mastery of Hungarian method principles guarantees optimal operational engineering.',
    },
    {
      title: '2. Cold-Chain Vaccine Emergency Logistics (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Optimized pediatric immunization dispatches across Kolkata, ensuring 100% clinic coverage with zero redundant ambulance runs.',
      lesson: 'Operations research assignments save lives in emergency medical logistics.',
    },
    {
      title: '3. Supermarket FMCG Retail Operations Directorate (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Managed store manager rosters and maximized gross sales turnover to ₹148 Lakhs in Ichapur using the regret matrix transformation.',
      lesson: 'Theoretical knowledge transforms into real-world commercial turnover.',
    },
    {
      title: '4. Educational Press Tender Compliance Audit (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Audited textbook production lines in Jadavpur, proving zero duality gap and 100% fiduciary tender compliance for West Bengal schools.',
      lesson: 'Strong Duality provides airtight audit compliance for government tenders.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes vivaGlow {
          0%, 100% { border-color: rgba(168, 85, 247, 0.3); }
          50% { border-color: rgba(168, 85, 247, 0.8); }
        }
        .glow-viva {
          animation: vivaGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-purple-950/80 text-purple-400 border border-purple-800/60">
              Segment 3 • Module 003_001 • Topic 17 (Final Topic!)
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-purple-950/80 text-purple-400 border border-purple-800/60">
              Module 003_001 Master Revision & Viva Review
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
            Short Questions & Viva-Voce Review
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            The grand master review of <span className="text-purple-400 font-semibold">Module 003_001 (Hungarian Method for Assignment Problems)</span>: rapid-fire flashcards, conceptual interview questions, theoretical proofs (<span className="text-sky-400 font-mono">TUM, König, Egerváry</span>), and complete examination cheat sheets in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'viva-flashcards', label: '1. Interactive Viva Flashcards' },
              { id: 'master-summary-svg', label: '2. Module Master Architecture SVG' },
              { id: 'case-studies', label: '3. Bengal Case Studies Summary' },
              { id: 'pitfalls', label: '4. Master Pitfalls' },
              { id: 'hints', label: '5. Master Guided Hints' },
              { id: 'checklist', label: '6. Master Revision Checklist' },
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

        {/* SECTION 1: Interactive Viva Flashcards */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-viva">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-600/20 text-purple-400 font-bold text-sm">
                  01
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Interactive Viva-Voce Flashcard Workbench
                </h2>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'all', label: 'All Topics' },
                  { id: 'foundations', label: 'Foundations' },
                  { id: 'reductions', label: 'Reductions & Lines' },
                  { id: 'maximization', label: 'Max & Dummies' },
                  { id: 'allocation', label: 'Allocation & Duality' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedCategory(item.id)}
                    className={clsx(
                      'px-2.5 py-1 rounded text-xs font-semibold transition-all border',
                      selectedCategory === item.id
                        ? 'bg-purple-600 text-white border-purple-400 shadow-md'
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Click on any flashcard to toggle between the question and the verified answer:
            </p>

            {/* Flashcard Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCards.map((card, idx) => {
                const isRevealed = revealedAnswers[idx];
                return (
                  <div
                    key={idx}
                    onClick={() => toggleReveal(idx)}
                    className={clsx(
                      'p-4 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col space-y-2 select-none',
                      isRevealed
                        ? 'bg-slate-900 border-purple-600/80 shadow-md shadow-purple-950/40'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-950 text-purple-300 border border-purple-800">
                        {card.tag}
                      </span>
                      <span className="text-xs text-slate-500 font-mono">
                        {isRevealed ? '▲ Hide Answer' : '▼ Reveal Answer'}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white leading-snug">{card.q}</h3>

                    {isRevealed && (
                      <div className="pt-2 border-t border-slate-800 text-xs text-slate-300 leading-relaxed font-sans animate-fade-in">
                        <strong className="text-emerald-400">Answer: </strong>
                        {card.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 2: Module Master Architecture SVG */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-600/20 text-teal-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Complete Assignment Track Master Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 240"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* 5 Main Stages */}
                <rect x="20" y="30" width="130" height="85" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="85" y="55" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">1. INPUT & PRE-PROC</text>
                <text x="85" y="75" fill="#cbd5e1" fontSize="9" textAnchor="middle">Balance m = n</text>
                <text x="85" y="95" fill="#a7f3d0" fontSize="9" textAnchor="middle">Regret M_max − P</text>

                <rect x="165" y="30" width="130" height="85" rx="8" fill="#1e293b" stroke="#818cf8" strokeWidth="2" />
                <text x="230" y="55" fill="#818cf8" fontSize="11" fontWeight="bold" textAnchor="middle">2. REDUCTIONS</text>
                <text x="230" y="75" fill="#cbd5e1" fontSize="9" textAnchor="middle">Row min (uᵢ)</text>
                <text x="230" y="95" fill="#cbd5e1" fontSize="9" textAnchor="middle">Col min (vⱼ)</text>

                <rect x="310" y="30" width="130" height="85" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <text x="375" y="55" fill="#f43f5e" fontSize="11" fontWeight="bold" textAnchor="middle">3. KÖNIG LINES</text>
                <text x="375" y="75" fill="#cbd5e1" fontSize="9" textAnchor="middle">L = n Lines?</text>
                <text x="375" y="95" fill="#fecdd3" fontSize="9" textAnchor="middle">Step 4b (e adjustment)</text>

                <rect x="455" y="30" width="130" height="85" rx="8" fill="#1e293b" stroke="#fbbf24" strokeWidth="2" />
                <text x="520" y="55" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">4. ZERO ALLOC</text>
                <text x="520" y="75" fill="#cbd5e1" fontSize="9" textAnchor="middle">Box [0] & Cross (X)</text>
                <text x="520" y="95" fill="#fde68a" fontSize="9" textAnchor="middle">Independent Zeros</text>

                <rect x="600" y="30" width="120" height="85" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="660" y="55" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">5. AUDIT & Z*</text>
                <text x="660" y="75" fill="#cbd5e1" fontSize="9" textAnchor="middle">Strong Duality</text>
                <text x="660" y="95" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">Z* in ₹ (Gap = 0)</text>

                {/* Footer Caption */}
                <rect x="20" y="145" width="700" height="50" rx="8" fill="#0f172a" stroke="#334155" />
                <text x="370" y="175" fill="#e2e8f0" fontSize="11" fontWeight="bold" textAnchor="middle">
                  COMPLETE 18-TOPIC HUNGARIAN ALGORITHM PIPELINE • ZERO SIMPLEX DEGENERACY
                </text>
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 3: Bengal Case Studies Summary */}
        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          data-index="2"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 font-bold text-sm">
                03
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Module 003_001 Bengal Operations Research Case Studies
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
                  <p className="text-purple-300 font-semibold">💡 <strong>Operations Takeaway:</strong> {cs.lesson}</p>
                </div>
              );
            })()}
          </div>
        </section>

        {/* SECTION 4: Master Pitfalls */}
        <section
          ref={(el) => (sectionRefs.current[3] = el)}
          data-index="3"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-600/20 text-rose-400 font-bold text-sm">
                04
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Top 5 Examination Traps to Avoid
              </h2>
            </div>

            <div className="flex flex-col space-y-2.5">
              {[
                {
                  trap: 'Summing Zeros as Final Answer',
                  fix: 'Never sum the 0s from the reduced matrix; always pull unit rates from the initial cost/profit matrix in Indian Rupees (₹).',
                },
                {
                  trap: 'Forgetting to Add e at Line Intersections in Step 4b',
                  fix: 'Uncovered subtract e, but cells covered by 2 lines MUST have e added to them (c_ij + e).',
                },
                {
                  trap: 'Adding Dummy Lines Before Converting to Regret in Maximization',
                  fix: 'Convert to regret matrix first (c_ij = M_max - p_ij), and THEN augment dummy lines with ₹0 regret costs.',
                },
                {
                  trap: 'Drawing Diagonal Lines in König’s Test',
                  fix: 'Lines must be strictly HORIZONTAL or strictly VERTICAL.',
                },
                {
                  trap: 'Double-Booking Workers or Tasks',
                  fix: 'When boxing a zero [0], immediately cross out (X) all other zeros in that same row and column.',
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

        {/* SECTION 5: Master Guided Hints */}
        <section
          ref={(el) => (sectionRefs.current[4] = el)}
          data-index="4"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 font-bold text-sm">
                05
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Master Guided Hints
              </h2>
            </div>

            <div className="flex flex-col space-y-3">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-amber-300 font-semibold text-sm">💡 Master Mantra…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  "Balance square ➔ Regret if max ➔ Row min ➔ Col min ➔ König lines ➔ Step 4b if L &lt; n ➔ Box [0] and Cross (X) ➔ State Z* in Indian Rupees (₹)!"
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Exam Verification Secret…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Always verify that your primal spend Z* matches the sum of all row reductions, column reductions, and additional reduction shifts (Z* = W*).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: Master Revision Checklist */}
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
                Module 003_001 Complete Master Checklist
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Mastered 1-to-1 bijection constraints and permutation matrices (n!)',
                'Formulated Primal and Dual Linear Programs for Assignment Models',
                'Understood Total Unimodularity (TUM) and Birkhoff-von Neumann Theorem',
                'Balanced non-square matrices using ₹0 dummy rows or dummy columns',
                'Enforced Big-M barriers on restricted workforce cells (c_ij = M)',
                'Executed Row Reductions (c_ij\' = c_ij - u_i) and Column Reductions (c_ij\'\' = c_ij\' - v_j)',
                'Applied König’s Line Covering Test (L == n) and Step 4b Additional Reductions (e)',
                'Executed Box [0] and Cross-Out (X) Independent Zero Allocation Protocol',
                'Converted Maximization problems via Relative Regret Transformation (M_max - P)',
                'Verified all solutions via Strong Duality (Z* == W*) in Indian Rupees (₹)',
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
              "CONGRATULATIONS to Debangshu, Mamata, Mahima, Susmita, and Abhronila! You have completed all 18 topics of Module 003_001 (Hungarian Method for Assignment Problems)! From fundamental linear programming theory and Total Unimodularity to balanced, unbalanced, maximization, and multi-pass Hungarian algorithms, you now possess world-class expertise in Assignment Optimization. Keep practicing your numerical problems, maintain your mathematical rigor, and lead your operations with confidence!"
            }
          />
        </section>

        {/* SECTION 8: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Short Questions & Viva FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 9: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Short Questions & Viva Review (Hungarian Method)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic18_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic17;
