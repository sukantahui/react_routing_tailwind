// Topic7.jsx
import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic7_files/topic7_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic7_files/topic7_note.txt?raw';

const Topic7 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExercise, setSelectedExercise] = useState(0);
  const sectionRefs = useRef([]);

  // Intersection observer for section tracking
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

  const exercises = [
    {
      id: 'ex1',
      title: 'Exercise 1: 3×3 Balanced FMCG Network (Mamata)',
      difficulty: 'Intermediate',
      matrixType: '3×3 Balanced Grid (200 Crates)',
      costMatrix: [
        ['₹2', '₹5', '₹7'],
        ['₹6', '₹3', '₹4'],
        ['₹5', '₹8', '₹1'],
      ],
      origins: ['Kolkata (60)', 'Barrackpore (80)', 'Ichapur (60)'],
      destinations: ['Jadavpur (80)', 'Howrah (70)', 'Barasat (50)'],
      steps: [
        { step: 1, action: 'Min cost ₹1 at (Ichapur, Barasat) → Allocate min(60, 50) = 50 crates. Barasat satisfied.', subtotal: '₹50' },
        { step: 2, action: 'Min cost ₹2 at (Kolkata, Jadavpur) → Allocate min(60, 80) = 60 crates. Kolkata exhausted.', subtotal: '₹120' },
        { step: 3, action: 'Min cost ₹3 at (Barrackpore, Howrah) → Allocate min(80, 70) = 70 crates. Howrah satisfied.', subtotal: '₹210' },
        { step: 4, action: 'Min cost ₹5 at (Ichapur, Jadavpur) → Allocate min(10, 20) = 10 crates. Ichapur exhausted.', subtotal: '₹50' },
        { step: 5, action: 'Final cell ₹6 at (Barrackpore, Jadavpur) → Allocate min(10, 10) = 10 crates. All satisfied.', subtotal: '₹60' },
      ],
      totalCost: '₹490',
      nwcrCost: '₹840',
      savings: '₹350 (41.7% Savings)',
      takeaway: '5 basic allocations achieved 41.7% savings by locking in rates ₹1, ₹2, and ₹3 first.',
    },
    {
      id: 'ex2',
      title: 'Exercise 2: 2×3 Fasteners Production Model (Debangshu)',
      difficulty: 'Standard Practice',
      matrixType: '2×3 Balanced Table (120 Tons)',
      costMatrix: [
        ['₹4', '₹8', '₹6'],
        ['₹7', '₹3', '₹5'],
      ],
      origins: ['Barrackpore (50)', 'Ichapur (70)'],
      destinations: ['Kolkata (40)', 'Jadavpur (50)', 'Salt Lake (30)'],
      steps: [
        { step: 1, action: 'Min cost ₹3 at (Ichapur, Jadavpur) → Allocate min(70, 50) = 50 tons. Jadavpur satisfied.', subtotal: '₹150' },
        { step: 2, action: 'Min cost ₹4 at (Barrackpore, Kolkata) → Allocate min(50, 40) = 40 tons. Kolkata satisfied.', subtotal: '₹160' },
        { step: 3, action: 'Min cost ₹5 at (Ichapur, Salt Lake) → Allocate min(20, 30) = 20 tons. Ichapur exhausted.', subtotal: '₹100' },
        { step: 4, action: 'Final cell ₹6 at (Barrackpore, Salt Lake) → Allocate min(10, 10) = 10 tons. All satisfied.', subtotal: '₹60' },
      ],
      totalCost: '₹470',
      nwcrCost: '₹670',
      savings: '₹200 (29.8% Savings)',
      takeaway: 'Exact m + n - 1 = 4 basic variables formed a non-degenerate starting basis.',
    },
    {
      id: 'ex3',
      title: 'Exercise 3: 3×4 Unbalanced Regional Model (Dummy Column)',
      difficulty: 'Advanced / Exam Grade',
      matrixType: '3×4 Unbalanced (Supply 150 > Demand 120 + 30 Dummy)',
      costMatrix: [
        ['₹6', '₹3', '₹5', '₹0'],
        ['₹4', '₹9', '₹2', '₹0'],
        ['₹8', '₹7', '₹4', '₹0'],
      ],
      origins: ['Plant 1 (50)', 'Plant 2 (60)', 'Plant 3 (40)'],
      destinations: ['City A (40)', 'City B (50)', 'City C (30)', 'Dummy (30)'],
      steps: [
        { step: 1, action: 'Min cost ₹0 at (Plant 2, Dummy) → Allocate min(60, 30) = 30 units. Dummy closed.', subtotal: '₹0' },
        { step: 2, action: 'Min cost ₹2 at (Plant 2, City C) → Allocate min(30, 30) = 30 units. Plant 2 & City C closed (Epsilon added).', subtotal: '₹60' },
        { step: 3, action: 'Min cost ₹3 at (Plant 1, City B) → Allocate min(50, 50) = 50 units. Plant 1 & City B closed.', subtotal: '₹150' },
        { step: 4, action: 'Final cell ₹8 at (Plant 3, City A) → Allocate min(40, 40) = 40 units. All closed.', subtotal: '₹320' },
      ],
      totalCost: '₹530',
      nwcrCost: '₹790',
      savings: '₹260 (32.9% Savings)',
      takeaway: 'Dummy cells with ₹0 cost absorb factory surplus without incurring financial freight charges.',
    },
    {
      id: 'ex4',
      title: 'Exercise 4: Medical Cold-Chain Big-M Link (Susmita)',
      difficulty: 'Special Constraint',
      matrixType: '2×2 Big-M Healthcare Network (250 Cylinders)',
      costMatrix: [
        ['₹6', '₹9'],
        ['M (₹999k)', '₹5'],
      ],
      origins: ['Kolkata (100 cyl)', 'Barrackpore (150 cyl)'],
      destinations: ['Jadavpur Medical (120)', 'Ichapur General (130)'],
      steps: [
        { step: 1, action: 'Min cost ₹5 at (Barrackpore, Ichapur) → Allocate min(150, 130) = 130 cyl. Ichapur closed.', subtotal: '₹650' },
        { step: 2, action: 'Min cost ₹6 at (Kolkata, Jadavpur) → Allocate min(100, 120) = 100 cyl. Kolkata closed.', subtotal: '₹600' },
        { step: 3, action: 'Remaining link: 20 cyl must detour via emergency transshipment to bypass Big-M link.', subtotal: 'Detour Active' },
      ],
      totalCost: '₹1,470 (Standard)',
      nwcrCost: '₹2,030',
      savings: '₹560 (27.6% Savings)',
      takeaway: 'Big-M penalty prevents the algorithm from assigning deliveries along impassable broken-bridge routes.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 transition-colors duration-300 font-sans">
      {/* Header Banner */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-b border-slate-800/80">
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-blue-500/10 text-blue-400 border border-blue-500/30 mb-4 shadow-sm">
            Quantitative Analysis • Transportation Models • Topic 7
          </span>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white mb-4 bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Numerical Exercises & Solved Problem Sets
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
            Step-by-step fully-worked numerical solutions covering balanced matrices, unbalanced dummy grids, tie-breaking, and Big-M constraints.
          </p>
        </div>
      </div>

      {/* Main Container - Stacked Vertical Sections */}
      <div className="max-w-4xl mx-auto px-4 py-10 sm:px-6 lg:px-8 flex flex-col space-y-12">
        
        {/* Section 1: Problem Explorer */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-600/20 text-teal-400 font-bold text-sm">
                01
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Multi-Problem Workshop
              </h2>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              Select any of the 4 complete numerical exercises to view its full tableau, sequential allocation trace, and financial auditing breakdown:
            </p>

            {/* Problem Navigation Tabs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {exercises.map((ex, idx) => (
                <button
                  key={ex.id}
                  onClick={() => setSelectedExercise(idx)}
                  className={clsx(
                    'py-3 px-4 rounded-xl text-left text-xs sm:text-sm font-semibold transition-all duration-200 border',
                    selectedExercise === idx
                      ? 'bg-teal-600/20 border-teal-500 text-teal-300 shadow-md'
                      : 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  )}
                >
                  <div className="flex justify-between items-center">
                    <span>{ex.title.split(':')[0]}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                      {ex.difficulty}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 font-normal">{ex.title.split(':')[1]}</p>
                </button>
              ))}
            </div>

            {/* Active Exercise Detail Card */}
            {(() => {
              const cur = exercises[selectedExercise];
              return (
                <div className="p-5 sm:p-6 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col space-y-5">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-slate-800 pb-3 gap-2">
                    <div>
                      <h3 className="text-lg font-bold text-white">{cur.title}</h3>
                      <p className="text-xs text-teal-400 mt-0.5">{cur.matrixType}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono">
                        {cur.savings}
                      </span>
                    </div>
                  </div>

                  {/* Tableau Representation */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-center text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400 bg-slate-900/60">
                          <th className="py-2.5 px-3 text-left">Origin \ Destination</th>
                          {cur.destinations.map((d, j) => (
                            <th key={j} className="py-2.5 px-3 text-slate-200">{d}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {cur.origins.map((r, i) => (
                          <tr key={i} className="hover:bg-slate-900/30">
                            <td className="py-2.5 px-3 text-left font-medium text-slate-300">{r}</td>
                            {cur.costMatrix[i].map((cost, j) => (
                              <td key={j} className="py-2.5 px-3 font-mono text-emerald-400 font-semibold">
                                {cost}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Step-by-Step Resolution */}
                  <div className="flex flex-col space-y-2">
                    <span className="text-xs font-semibold text-slate-300">Step-by-Step Allocation Sequence:</span>
                    <div className="space-y-2">
                      {cur.steps.map((s, i) => (
                        <div
                          key={i}
                          className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center text-xs"
                        >
                          <div className="flex items-center space-x-2">
                            <span className="w-5 h-5 rounded-full bg-teal-600/30 text-teal-300 flex items-center justify-center font-mono font-bold text-[10px]">
                              {s.step}
                            </span>
                            <span className="text-slate-300">{s.action}</span>
                          </div>
                          <span className="font-mono text-white font-bold ml-2">{s.subtotal}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Financial Summary */}
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
                    <div className="flex items-center space-x-4">
                      <div>
                        <span className="text-slate-400 block">Matrix Minima Z:</span>
                        <span className="text-base font-extrabold text-emerald-400 font-mono">{cur.totalCost}</span>
                      </div>
                      <div className="border-l border-slate-700 pl-4">
                        <span className="text-slate-400 block">NWCR Baseline:</span>
                        <span className="text-base font-extrabold text-rose-400 font-mono line-through">{cur.nwcrCost}</span>
                      </div>
                    </div>
                    <p className="text-slate-300 italic text-right sm:max-w-xs leading-relaxed">
                      "{cur.takeaway}"
                    </p>
                  </div>
                </div>
              );
            })()}
          </div>
        </section>

        {/* Section 2: Hints & Conceptual Prompts */}
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
                Pedagogical Hints & Deep Thinking Prompts
              </h2>
            </div>

            <div className="flex flex-col space-y-3">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1 hover:bg-slate-800/70 transition-all duration-200">
                <span className="text-cyan-400 font-semibold text-sm">🤔 Think about...</span>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  In Exercise 3, why did we add a dummy column with ₹0 cost? Think about what happens if you try to ship 150 units of supply to cities that only require 120 units total!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1 hover:bg-slate-800/70 transition-all duration-200">
                <span className="text-amber-400 font-semibold text-sm">🔍 Observe carefully...</span>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Notice how in Exercise 1, three different cells tie for the lowest remaining cost at various steps. Applying the maximum volume rule guaranteed the cheapest initial cost.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1 hover:bg-slate-800/70 transition-all duration-200">
                <span className="text-emerald-400 font-semibold text-sm">⚙️ Try changing this...</span>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Try solving Exercise 2 using the North-West Corner Rule on a sheet of paper. Compare the total time taken and notice how Matrix Minima saves ₹200 immediately!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Professional Tips */}
        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          data-index="2"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 font-bold text-sm">
                03
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Professional Tips & Exam Shortcuts
              </h2>
            </div>

            <div className="flex flex-col space-y-3">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-blue-300 font-semibold text-sm">1. 30-Second Pre-Flight Check</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Always add supply and demand totals first. If they differ, add a ₹0 dummy immediately before inspecting any freight costs.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-blue-300 font-semibold text-sm">2. Draw Clean Line Strikes</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Use a ruler or straight line to strike out eliminated rows/columns. This visual block keeps your eyes focused only on active cells.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-blue-300 font-semibold text-sm">3. Basis Count Sanity Rule</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Always count allocated cells at the end: <span className="font-mono text-cyan-300">count === m + n - 1</span>. If short, insert <span className="font-mono text-white">ε</span>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Common Pitfalls */}
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
                Common Mistakes in Numerical Exercises
              </h2>
            </div>

            <div className="flex flex-col space-y-3">
              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 flex flex-col space-y-1">
                <span className="text-rose-400 font-semibold text-sm">❌ Forgetting to Re-Balance Unbalanced Tables</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Starting without a dummy column causes the algorithm to stall before all customer demands are fulfilled.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 flex flex-col space-y-1">
                <span className="text-rose-400 font-semibold text-sm">❌ Over-Allocating Above Available Supply</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Assigning destination demand when factory stock is smaller. Always use <span className="font-mono text-cyan-300">min(S, D)</span>.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 flex flex-col space-y-1">
                <span className="text-rose-400 font-semibold text-sm">❌ Omitting Basic Product Terms</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Skipping an allocation during total cost summation, producing an incorrect Z value.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Best Practices */}
        <section
          ref={(el) => (sectionRefs.current[4] = el)}
          data-index="4"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-violet-600/20 text-violet-400 font-bold text-sm">
                05
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Best Practices & Coding Guidelines
              </h2>
            </div>

            <div className="flex flex-col space-y-3">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-violet-300 font-semibold text-sm">1. Clean Test Fixture Architecture</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Store reference exercises in JSON fixtures for automated regression testing and validation against solver libraries.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-violet-300 font-semibold text-sm">2. Non-Degenerate Assertion</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Assert that <span className="font-mono text-cyan-300">allocations.length === m + n - 1</span> on every solved problem.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-violet-300 font-semibold text-sm">3. Label Rupee Currency</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Format all monetary outputs with <span className="font-mono text-emerald-300">₹</span> for professional clarity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Mini Checklist */}
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
                Student Revision Checklist
              </h2>
            </div>

            <div className="flex flex-col space-y-2.5">
              {[
                { title: 'Checked Supply & Demand Balance', desc: 'Verified ∑ S_i = ∑ D_j before starting' },
                { title: 'Scanned for Lowest Rate', desc: 'Identified absolute minimum cost across active cells' },
                { title: 'Allocated min(S, D)', desc: 'Committed maximum feasible volume without over-allocation' },
                { title: 'Updated Balances', desc: 'Deducted allocated quantity from origin and destination' },
                { title: 'Crossed Out Zero Line', desc: 'Eliminated satisfied row or column' },
                { title: 'Verified Basis Size', desc: 'Confirmed exactly m + n - 1 basic variables' },
                { title: 'Calculated Cost in ₹', desc: 'Summed all product terms to obtain grand total Z' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60 flex items-start space-x-3 hover:bg-slate-800/70 transition-colors"
                >
                  <span className="text-emerald-400 text-base mt-0.5">✅</span>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200">{item.title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 7: Teacher's Note */}
        <section className="flex flex-col space-y-6">
          <Teacher
            note={
              "In our hands-on numerical workshops across Kolkata, Barrackpore, and Ichapur, I always tell Debangshu, Susmita, Mamata, and Mahima that solving numerical transportation problems is like playing a game of chess. If you develop a disciplined opening routine—verifying table balance, circling your allocations, and crossing out zero lines neatly—you will never get confused by large 4×5 or 5×6 tables. Practice these 4 solved exercises until you can solve any 3×3 table in under 3 minutes with 100% accuracy!"
            }
          />
        </section>

        {/* Section 8: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Numerical Exercises FAQs"
            questions={questions}
          />
        </section>

        {/* Section 9: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Numerical Exercises"
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

export default Topic7;
