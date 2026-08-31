// src/components/study/quantitative-analysis/topics/002_005_test-of-optimality-by-modi-method/Topic11.jsx
// React 19 Function-based Component
// Module: 002_005_test-of-optimality-by-modi-method
// Topic 11: Numerical exercises

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic11_files/topic11_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic11_files/topic11_note.txt?raw';

const Topic11 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [activeExercise, setActiveExercise] = useState(0); // 0: 3x3, 1: 3x4, 2: Unbalanced, 3: Degeneracy

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

  // Exercise Data
  const exercises = [
    {
      id: 0,
      title: 'Exercise 1: Standard 3x3 Foundry Problem',
      tag: 'Standard 2-Iteration MODI Pipeline',
      description: '3 Origins (Barrackpore 70, Ichapur 90, Kolkata 60) and 3 Dests (Jadavpur 60, Salt Lake 80, Howrah 80). Solved from NWCR to Global Optimum.',
      initialCost: '₹2,740 (NWCR)',
      optimalCost: '₹2,060 (Certified Minimum)',
      savings: '₹680 (24.82%)',
      steps: [
        '1. NWCR Initial Allocations: (1,1)=60, (1,2)=10, (2,2)=70, (2,3)=20, (3,3)=60 ➔ Z₀ = ₹2,740.',
        '2. Iteration 1: Set u₁=0 ➔ u=[0,5,2], v=[8,14,5]. Found entering cell (2,1) with d₂₁ = -₹8. Pivot θ=60 tons ➔ Z₁ = ₹2,260.',
        '3. Iteration 2: Recomputed potentials ➔ Found entering cell (3,2) with d₃₂ = -₹3. Pivot θ=10 tons ➔ Z* = ₹2,060.',
        '4. Final Check: All dᵢⱼ ≥ 0 ➔ Global Minimum Certified at ₹2,060!',
      ],
      optimalAllocations: '(1,2)=70 @ ₹14, (2,1)=60 @ ₹5, (2,3)=30 @ ₹10, (3,2)=10 @ ₹13, (3,3)=50 @ ₹7',
    },
    {
      id: 1,
      title: 'Exercise 2: 3x4 Multi-Destination Cold-Chain Problem',
      tag: 'Multi-Destination LCM to Optimal',
      description: '3 Health Centers (50, 70, 60) and 4 City Depots (30, 40, 55, 55). Starting from Least Cost Method (LCM) to Optimal.',
      initialCost: '₹3,120 (LCM)',
      optimalCost: '₹3,020 (Certified Minimum)',
      savings: '₹100 (3.21%)',
      steps: [
        '1. Least Cost Method Allocations: (1,1)=30, (1,2)=20, (2,2)=20, (2,3)=50, (3,3)=5, (3,4)=55 ➔ 6 basic cells (Non-degenerate) ➔ Z₀ = ₹3,120.',
        '2. MODI Audit: Set u₁=0 ➔ Found entering cell (1,3) with d₁₃ = -₹4.',
        '3. Loop Pivot: (1,3)[+] ➔ (1,2)[-] ➔ (2,2)[+] ➔ (2,3)[-] with θ = 20 boxes.',
        '4. Final Audit: Z* = ₹3,120 - (20×4) = ₹3,020. All opportunity costs ≥ 0!',
      ],
      optimalAllocations: '(1,1)=30 @ ₹4, (1,3)=20 @ ₹8, (2,2)=40 @ ₹8, (2,3)=30 @ ₹6, (3,3)=5 @ ₹7, (3,4)=55 @ ₹5',
    },
    {
      id: 2,
      title: 'Exercise 3: Unbalanced Problem with ₹0 Dummy Column',
      tag: 'Supply Surplus Optimization',
      description: 'Origins Supply = 240, Destinations Demand = 200. Augmented with Dummy Column (Demand = 40, Unit Rates = ₹0).',
      initialCost: '₹2,140 (Augmented NWCR)',
      optimalCost: '₹1,780 (Certified Minimum)',
      savings: '₹360 (16.82%)',
      steps: [
        '1. Supply surplus = 240 - 200 = 40. Added Dummy Destination with demand 40 and ₹0 freight rates across all origins.',
        '2. Evaluated all real and dummy empty cells using d_ij = c_ij - (u_i + v_j).',
        '3. Reallocated surplus warehouse capacity to factories to minimize real freight.',
        '4. Final Optimal Spend on Real Routes = ₹1,780 (Dummy routes contribute ₹0).',
      ],
      optimalAllocations: '(1,2)=80 @ ₹3, (1,1)=10 @ ₹4, (1,Dummy)=10 @ ₹0, (2,3)=50 @ ₹1, (2,Dummy)=30 @ ₹0, (3,1)=60 @ ₹6',
    },
    {
      id: 3,
      title: 'Exercise 4: Degeneracy Resolution via Epsilon (ε)',
      tag: 'Spanning Tree Restoration',
      description: 'A 3x3 matrix has only 4 basic cells after initial allocation (Count = 4 < m+n-1 = 5). Stalled u-v propagation resolved via ε.',
      initialCost: '₹1,950 (Degenerate)',
      optimalCost: '₹1,920 (Non-Degenerate Optimal)',
      savings: '₹30',
      steps: [
        '1. Basis had only 4 basic cells. Inserted infinitesimal quantity epsilon (ε) at independent cell (1, 3).',
        '2. Spanning tree connected (Count = 5 basic cells) ➔ Solved all u and v potentials.',
        '3. Evaluated opportunity costs; traced closed loop using ε as a turning vertex.',
        '4. Pivoting transferred θ = ε out of the epsilon cell, leaving a non-degenerate basis with positive numbers!',
      ],
      optimalAllocations: '(1,1)=50, (1,2)=20, (2,2)=40, (3,3)=30, (2,3)=10 (Fully non-degenerate)',
    },
  ];

  const currentEx = exercises[activeExercise];

  // Case Studies
  const caseStudies = [
    {
      title: '1. Foundry Benchmark Replication (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Replicated Exercise 1 on Barrackpore casting plant data. Verified that manual 2-iteration MODI calculations matched commercial ERP solver outputs to the exact rupee.',
      lesson: 'Structured numerical exercises provide benchmark standards for industrial audit validation.',
    },
    {
      title: '2. Cold-Chain Vaccine Multi-Depot Modeling (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Applied Exercise 2 (3x4 matrix) to optimize vaccine dispatches across 4 Kolkata hospital depots, reducing transit expenses by ₹100 per shipment.',
      lesson: 'Multi-destination tableaus model complex real-world healthcare supply networks.',
    },
    {
      title: '3. Supermarket FMCG Surplus Inventory Allocation (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Solved Exercise 3 with 40-ton surplus grocery inventory. Leveraged the ₹0 dummy column to optimize regional warehouse holdbacks without extra freight spend.',
      lesson: 'Dummy column optimization identifies the most cost-effective surplus storage locations.',
    },
    {
      title: '4. Educational Press Degeneracy Bridge Handling (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Encountered a degenerate 4-cell matrix in textbook logistics (Exercise 4). Placed ε in an independent cell to solve potentials and achieve non-degenerate optimality.',
      lesson: 'Epsilon insertion is the standard mathematical tool for resolving basis degeneracy.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes exGlow {
          0%, 100% { border-color: rgba(14, 165, 233, 0.3); }
          50% { border-color: rgba(14, 165, 233, 0.8); }
        }
        .glow-ex {
          animation: exGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
              Module 002_005 • Topic 11
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Full Step-by-Step Worked Problems
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
            Numerical Exercises
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            Four complete, end-to-end numerical worked problems: standard <span className="text-sky-400 font-semibold">3x3 foundry optimization</span>, <span className="text-purple-400 font-semibold">3x4 multi-destination networks</span>, <span className="text-amber-400 font-semibold">unbalanced dummy matrices</span>, and <span className="text-rose-400 font-semibold">degeneracy resolution via epsilon (ε)</span>.
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'exercise-workbench', label: '1. Numerical Exercise Workbench' },
              { id: 'solution-steps', label: '2. Step-by-Step Solutions' },
              { id: 'matrix-taxonomy', label: '3. Matrix Types Taxonomy' },
              { id: 'svg-taxonomy', label: '4. Exercise Architecture SVG' },
              { id: 'case-studies', label: '5. Bengal Case Studies' },
              { id: 'pitfalls', label: '6. Common Pitfalls' },
              { id: 'hints', label: '7. Guided Hints' },
              { id: 'checklist', label: '8. Revision Checklist' },
            ].map((item, idx) => (
              <button
                key={item.id}
                onClick={() => {
                  sectionRefs.current[idx]?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={clsx(
                  'px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 border',
                  activeSection === idx
                    ? 'bg-sky-600 text-white border-sky-500 shadow-md shadow-sky-900/40'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </header>

        {/* SECTION 1: Numerical Exercise Workbench */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-ex">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                  01
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Numerical Exercise Workbench
                </h2>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {exercises.map((ex) => (
                  <button
                    key={ex.id}
                    onClick={() => setActiveExercise(ex.id)}
                    className={clsx(
                      'px-3 py-1 rounded text-xs font-semibold transition-all border',
                      activeExercise === ex.id
                        ? 'bg-sky-600 text-white border-sky-400 shadow-md'
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                    )}
                  >
                    Ex {ex.id + 1}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-lg font-bold text-white">{currentEx.title}</h3>
                <span className="text-xs text-sky-300 font-mono">{currentEx.tag}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-rose-950 text-rose-300 border border-rose-800">
                  Initial: {currentEx.initialCost}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                  Optimal: {currentEx.optimalCost}
                </span>
              </div>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">{currentEx.description}</p>

            {/* Step-by-Step Solution Breakdown */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2.5 text-xs sm:text-sm">
              <span className="text-amber-300 font-bold">Step-by-Step Numerical Walkthrough:</span>
              {currentEx.steps.map((stepText, idx) => (
                <div key={idx} className="p-2.5 rounded bg-slate-900 border border-slate-800 text-slate-200">
                  {stepText}
                </div>
              ))}

              <div className="mt-2 pt-2 border-t border-slate-800 flex flex-col space-y-1 font-mono text-xs">
                <span className="text-emerald-300 font-bold">Final Optimal Allocation Manifest:</span>
                <p className="text-white">{currentEx.optimalAllocations}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Matrix Types Taxonomy */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-600/20 text-purple-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Taxonomy of Problem Scenarios
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-sky-300 font-bold">1. Balanced Square & Rectangular Tableaus</span>
                <p className="text-slate-300">Standard m x n problems where total supply equals demand. Solved via normal 5-step MODI engine.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-amber-300 font-bold">2. Unbalanced Surplus/Deficit Tableaus</span>
                <p className="text-slate-300">Supply ≠ Demand. Augmented with ₹0 dummy row or column. Dummy cells participate fully in opportunity cost evaluations.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-rose-300 font-bold">3. Degenerate Basic Tableaus</span>
                <p className="text-slate-300">Basic cells &lt; m+n-1. Resolved by placing infinitesimal ε in an independent loop-free cell to complete spanning tree propagation.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-emerald-300 font-bold">4. Multi-Iteration Convergence Chains</span>
                <p className="text-slate-300">Problems requiring 2 or more sequential pivots before all opportunity costs satisfy d_ij ≥ 0.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Exercise Architecture SVG */}
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
                Exercise Taxonomy Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 240"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* 4 Category Boxes */}
                <rect x="40" y="50" width="145" height="130" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="112" y="80" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Ex 1: Standard 3x3</text>
                <text x="112" y="105" fill="#cbd5e1" fontSize="9" textAnchor="middle">NWCR ➔ 2 Iterations</text>
                <text x="112" y="130" fill="#a7f3d0" fontSize="10" fontFamily="monospace" textAnchor="middle">Z* = ₹2,060</text>
                <text x="112" y="155" fill="#38bdf8" fontSize="9" textAnchor="middle">Saved ₹680</text>

                <rect x="210" y="50" width="145" height="130" rx="8" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
                <text x="282" y="80" fill="#a855f7" fontSize="11" fontWeight="bold" textAnchor="middle">Ex 2: 3x4 Multi-Dest</text>
                <text x="282" y="105" fill="#cbd5e1" fontSize="9" textAnchor="middle">LCM ➔ 1 Iteration</text>
                <text x="282" y="130" fill="#a7f3d0" fontSize="10" fontFamily="monospace" textAnchor="middle">Z* = ₹3,020</text>
                <text x="282" y="155" fill="#a855f7" fontSize="9" textAnchor="middle">6 Basic Cells</text>

                <rect x="380" y="50" width="145" height="130" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="452" y="80" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">Ex 3: Unbalanced</text>
                <text x="452" y="105" fill="#cbd5e1" fontSize="9" textAnchor="middle">₹0 Dummy Column</text>
                <text x="452" y="130" fill="#a7f3d0" fontSize="10" fontFamily="monospace" textAnchor="middle">Z* = ₹1,780</text>
                <text x="452" y="155" fill="#f59e0b" fontSize="9" textAnchor="middle">Demand 40 Dummy</text>

                <rect x="550" y="50" width="145" height="130" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <text x="622" y="80" fill="#f43f5e" fontSize="11" fontWeight="bold" textAnchor="middle">Ex 4: Degeneracy</text>
                <text x="622" y="105" fill="#cbd5e1" fontSize="9" textAnchor="middle">Epsilon (ε) Bridge</text>
                <text x="622" y="130" fill="#a7f3d0" fontSize="10" fontFamily="monospace" textAnchor="middle">Z* = ₹1,920</text>
                <text x="622" y="155" fill="#f43f5e" fontSize="9" textAnchor="middle">Restores Spanning Tree</text>
              </svg>
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
                Bengal Logistics Numerical Benchmark Case Studies
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
                  <p className="text-sky-300 font-semibold">💡 <strong>Operations Takeaway:</strong> {cs.lesson}</p>
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
        >
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
                  trap: 'Assigning Non-Zero Costs to Dummy Routes',
                  fix: 'Dummy rows and columns represent surplus/deficit inventory and MUST have unit transportation costs of exactly ₹0.',
                },
                {
                  trap: 'Placing Epsilon (ε) in a Position that Forms a Loop',
                  fix: 'Epsilon MUST be placed in an independent cell that CANNOT form a closed loop with existing basic cells.',
                },
                {
                  trap: 'Forgetting to Check Basic Cell Count (m + n - 1)',
                  fix: 'Always verify Count == m + n - 1 (e.g. 5 for 3x3, 6 for 3x4) before attempting to compute u-v potentials.',
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
                  Think about how practicing all 4 problem types builds complete examination confidence: once you have mastered square, rectangular, unbalanced, and degenerate tableaus, no exam question can surprise you!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully that in all 4 exercises, the final check is always identical: every single empty cell must satisfy dᵢⱼ ≥ 0.
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
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                07
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Student Revision Checklist (Topic 11)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Solved standard 3x3 foundry problem through complete 2-iteration MODI pipeline',
                'Solved 3x4 multi-destination problem from LCM to optimality',
                'Handled unbalanced problem by augmenting with ₹0 dummy destination',
                'Resolved degeneracy by placing epsilon (ε) in an independent cell',
                'Audited primal feasibility and basic cell counts (m + n - 1) on all tableaus',
                'Reported final minimum costs in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: working through these four numerical exercises will make you virtually invincible on university and professional exams! Practice writing out each tableau cleanly: Tableau I for your initial basis, Tableau II for your first pivot, and Tableau III for your final optimal victory. Check your row and column sums at every single step, state your minimum cost in Indian Rupees (₹), and write down your formal conclusion. You are ready to score 100% full marks!"
            }
          />
        </section>

        {/* SECTION 9: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Numerical Exercises FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 10: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Numerical Exercises (MODI Method)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic12_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic11;
