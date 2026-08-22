// src/components/study/quantitative-analysis/topics/002_005_test-of-optimality-by-modi-method/Topic1.jsx
// React 19 Function-based Component
// Module: 002_005_test-of-optimality-by-modi-method
// Topic 1: MODI method overview

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic1_files/topic1_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic1_files/topic1_note.txt?raw';

const Topic1 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);

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

  // 5-Step MODI Interactive Walkthrough Data
  const modiSteps = [
    {
      step: 1,
      title: 'Step 1: Non-Degeneracy & Basis Check',
      headline: 'Count Basic Cells: m + n - 1 = 3 + 3 - 1 = 5 basic cells.',
      description: 'The initial NWCR tableau has exactly 5 occupied cells at (1,1)=60, (1,2)=10, (2,2)=70, (2,3)=20, (3,3)=60. The solution is non-degenerate and loop-free.',
      uVals: ['?', '?', '?'],
      vVals: ['?', '?', '?'],
      dValues: [],
      highlightLoop: false,
      costStatus: 'Current Initial Cost Z = ₹2,740 (Pre-Audit)',
    },
    {
      step: 2,
      title: 'Step 2: Calculate Row Potentials (uᵢ) & Column Potentials (vⱼ)',
      headline: 'Set u₁ = 0 arbitrarily. Solve uᵢ + vⱼ = cᵢⱼ for all basic cells.',
      description: '• u₁=0 ➔ v₁=8 (c₁₁=8), v₂=14 (c₁₂=14). • From (2,2): u₂+14=19 ➔ u₂=5. • From (2,3): 5+v₃=10 ➔ v₃=5. • From (3,3): u₃+5=7 ➔ u₃=2.',
      uVals: ['0', '5', '2'],
      vVals: ['8', '14', '5'],
      dValues: [],
      highlightLoop: false,
      costStatus: 'Dual Potentials established: u = [0, 5, 2], v = [8, 14, 5]',
    },
    {
      step: 3,
      title: 'Step 3: Calculate Opportunity Costs (dᵢⱼ = cᵢⱼ - uᵢ - vⱼ)',
      headline: 'Evaluate all unoccupied non-basic cells for potential savings.',
      description: '• (1,3): d₁₃ = 12 - (0+5) = +₹7. • (2,1): d₂₁ = 5 - (5+8) = -₹8. • (3,1): d₃₁ = 11 - (2+8) = +₹1. • (3,2): d₃₂ = 13 - (2+14) = -₹3.',
      uVals: ['0', '5', '2'],
      vVals: ['8', '14', '5'],
      dValues: [
        { r: 0, c: 2, d: '+₹7' },
        { r: 1, c: 0, d: '-₹8' },
        { r: 2, c: 0, d: '+₹1' },
        { r: 2, c: 1, d: '-₹3' },
      ],
      highlightLoop: false,
      costStatus: 'Opportunity costs computed. Found negative evaluations (d < 0)!',
    },
    {
      step: 4,
      title: 'Step 4: Global Optimality Check & Entering Cell Selection',
      headline: 'Solution is NOT optimal because d₂₁ = -₹8 and d₃₂ = -₹3 are negative!',
      description: 'Cell (2, 1) has the MOST NEGATIVE opportunity cost (d₂₁ = -₹8). It is selected as the Entering Cell to enter the basis.',
      uVals: ['0', '5', '2'],
      vVals: ['8', '14', '5'],
      dValues: [
        { r: 0, c: 2, d: '+₹7' },
        { r: 1, c: 0, d: '-₹8 (ENTERING CELL ⭐)' },
        { r: 2, c: 0, d: '+₹1' },
        { r: 2, c: 1, d: '-₹3' },
      ],
      highlightLoop: false,
      costStatus: 'Entering Variable chosen: Cell (S2, D1) with d₂₁ = -₹8',
    },
    {
      step: 5,
      title: 'Step 5: Stepping-Stone Closed Loop & Flow Pivot',
      headline: 'Trace Loop: (2,1)[+θ] ➔ (1,1)[-θ] ➔ (1,2)[+θ] ➔ (2,2)[-θ].',
      description: 'Minus corners are (1,1)=60 and (2,2)=70. Maximum transfer θ = min(60, 70) = 60 tons. Pivoting drops total cost Z by 60 × ₹8 = ₹480!',
      uVals: ['0', '5', '2'],
      vVals: ['8', '14', '5'],
      dValues: [],
      highlightLoop: true,
      costStatus: 'New Total Cost Z = ₹2,740 - ₹480 = ₹2,260 (Iteration 1 complete!)',
    },
  ];

  const currentModiStep = modiSteps[currentStep - 1];

  // Case Studies
  const caseStudies = [
    {
      title: '1. Foundry Supply Optimization (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Barrackpore heavy foundry audited a 3x3 casting network using the 5-step MODI algorithm. Identifying entering cell (2,1) reduced costs by ₹480 in Iteration 1 and reached global minimum Z = ₹2,060 on Iteration 2.',
      impact: 'Total ₹680 (24.8%) saved per batch.',
    },
    {
      title: '2. Cold-Chain Vaccine Distribution (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Applied MODI on an initial Least-Cost plan. Computed u-v potentials in 2 minutes, discovered entering cell (1,3) with d_13 = -₹3, and pivoted θ = 20 boxes to save ₹60 on emergency dispatch.',
      impact: '100% certified optimal vaccine distribution.',
    },
    {
      title: '3. Supermarket FMCG Immediate Certification (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Tested an initial VAM grocery distribution matrix. All d_ij values evaluated to ≥ +₹1 on step 1, certifying global optimality with 0 loop pivots required.',
      impact: 'Zero iteration overhead; instant executive approval.',
    },
    {
      title: '4. Educational Press Textbook Distribution (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Audited textbook printing logistics with MODI. Found d_22 = 0, proving an alternative optimal route existed with identical minimal cost of ₹9,400.',
      impact: 'Gave the press flexibility to avoid congested highways at zero cost penalty.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes modiGlow {
          0%, 100% { border-color: rgba(56, 189, 248, 0.3); }
          50% { border-color: rgba(56, 189, 248, 0.8); }
        }
        .glow-modi {
          animation: modiGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
              Module 002_005 • Topic 1
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-cyan-950/80 text-cyan-400 border border-cyan-800/60">
              The u-v Method & Algorithm Architecture
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            MODI Method Overview
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive architectural blueprint of the <span className="text-cyan-400 font-semibold">Modified Distribution (MODI / u-v) Method</span>: understanding dual potentials (<span className="text-emerald-400 font-mono">uᵢ + vⱼ = cᵢⱼ</span>), evaluating opportunity costs (<span className="text-amber-400 font-mono">dᵢⱼ = cᵢⱼ - uᵢ - vⱼ</span>), and mastering the 5-step closed-loop optimization cycle.
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'engine', label: '1. 5-Step Execution Engine' },
              { id: 'interactive-stepper', label: '2. Interactive MODI Stepper' },
              { id: 'modi-vs-stepping', label: '3. MODI vs Stepping-Stone' },
              { id: 'svg-architecture', label: '4. Algorithm Architecture SVG' },
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
                    ? 'bg-cyan-600 text-white border-cyan-500 shadow-md shadow-cyan-900/40'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </header>

        {/* SECTION 1: 5-Step Execution Engine */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-600/20 text-cyan-400 font-bold text-sm">
                01
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                The 5-Step MODI Execution Engine
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              {[
                {
                  step: 'Step 1: Non-Degeneracy Check',
                  formula: 'Count(Basic Cells) == m + n - 1',
                  desc: 'Confirm exactly m + n - 1 basic cells exist in loop-free positions; place ε if degenerate.',
                },
                {
                  step: 'Step 2: Dual Potentials (uᵢ, vⱼ)',
                  formula: 'uᵢ + vⱼ = cᵢⱼ (for all basic cells)',
                  desc: 'Set u₁ = 0 arbitrarily; solve for all row potentials uᵢ and column potentials vⱼ.',
                },
                {
                  step: 'Step 3: Opportunity Costs (dᵢⱼ)',
                  formula: 'dᵢⱼ = cᵢⱼ - (uᵢ + vⱼ) (for non-basic cells)',
                  desc: 'Calculate the net evaluation index for every unoccupied shipping route in the tableau.',
                },
                {
                  step: 'Step 4: Optimality Audit',
                  formula: 'All dᵢⱼ ≥ 0 ➔ Global Minimum',
                  desc: 'If all dᵢⱼ ≥ 0, stop—plan is optimal! If any dᵢⱼ < 0, select the most negative cell to enter.',
                },
                {
                  step: 'Step 5: Closed Loop Flow Pivot',
                  formula: 'θ = min { x_ij | (-) loop corners }',
                  desc: 'Trace stepping-stone loop (+, -), transfer θ units, update allocations, and return to Step 2.',
                },
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1.5">
                  <div className="flex items-center justify-between border-b border-slate-700/60 pb-1.5">
                    <span className="text-cyan-300 font-bold">{item.step}</span>
                  </div>
                  <div className="p-1.5 bg-slate-950 rounded font-mono text-emerald-300 text-xs">
                    {item.formula}
                  </div>
                  <p className="text-slate-300 text-xs">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2: Interactive MODI Stepper */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-modi">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-600/20 text-cyan-400 font-bold text-sm">
                  02
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Interactive 5-Step MODI Stepper
                </h2>
              </div>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((sNum) => (
                  <button
                    key={sNum}
                    onClick={() => setCurrentStep(sNum)}
                    className={clsx(
                      'px-3 py-1 rounded text-xs font-semibold transition-all border',
                      currentStep === sNum
                        ? 'bg-cyan-600 text-white border-cyan-400 shadow-md'
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                    )}
                  >
                    Step {sNum}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col space-y-1">
              <h3 className="text-base font-bold text-cyan-300">{currentModiStep.title}</h3>
              <p className="text-xs sm:text-sm text-slate-200 font-medium">{currentModiStep.headline}</p>
              <p className="text-xs text-slate-400">{currentModiStep.description}</p>
            </div>

            {/* Tableau */}
            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-4">
              <table className="w-full text-center border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2 text-left font-semibold text-slate-300">Origins \ Dests</th>
                    <th className="p-2 font-semibold text-cyan-300">
                      Jadavpur (D1)<br />
                      <span className="font-mono text-emerald-400 text-xs">v₁ = {currentModiStep.vVals[0]}</span>
                    </th>
                    <th className="p-2 font-semibold text-cyan-300">
                      Salt Lake (D2)<br />
                      <span className="font-mono text-emerald-400 text-xs">v₂ = {currentModiStep.vVals[1]}</span>
                    </th>
                    <th className="p-2 font-semibold text-cyan-300">
                      Howrah (D3)<br />
                      <span className="font-mono text-emerald-400 text-xs">v₃ = {currentModiStep.vVals[2]}</span>
                    </th>
                    <th className="p-2 font-semibold text-amber-300">Supply</th>
                    <th className="p-2 font-semibold text-purple-400">Dual uᵢ</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Barrackpore (S1)', costs: [8, 14, 12], s: 70, u: currentModiStep.uVals[0] },
                    { name: 'Ichapur (S2)', costs: [5, 19, 10], s: 90, u: currentModiStep.uVals[1] },
                    { name: 'Kolkata (S3)', costs: [11, 13, 7], s: 60, u: currentModiStep.uVals[2] },
                  ].map((row, rIdx) => (
                    <tr key={rIdx} className="border-b border-slate-800/60">
                      <td className="p-2.5 text-left font-medium text-slate-200">{row.name}</td>
                      {row.costs.map((cost, cIdx) => {
                        let allocQty = null;
                        let loopSign = null;

                        if (rIdx === 0 && cIdx === 0) { allocQty = 60; loopSign = '-θ (60)'; }
                        if (rIdx === 0 && cIdx === 1) { allocQty = 10; loopSign = '+θ (10)'; }
                        if (rIdx === 1 && cIdx === 1) { allocQty = 70; loopSign = '-θ (70)'; }
                        if (rIdx === 1 && cIdx === 2) { allocQty = 20; }
                        if (rIdx === 2 && cIdx === 2) { allocQty = 60; }
                        if (rIdx === 1 && cIdx === 0 && currentModiStep.highlightLoop) { loopSign = '+θ (ENTER)'; }

                        const dValObj = currentModiStep.dValues.find((d) => d.r === rIdx && d.c === cIdx);

                        return (
                          <td key={cIdx} className="p-2">
                            <div
                              className={clsx(
                                'p-2 rounded-lg font-mono font-bold transition-all border flex flex-col items-center justify-center',
                                currentModiStep.highlightLoop && loopSign
                                  ? 'bg-purple-950 text-purple-200 border-purple-400 shadow-md scale-105'
                                  : allocQty !== null
                                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-600'
                                  : dValObj && dValObj.d.includes('-')
                                  ? 'bg-rose-950 text-rose-300 border-rose-500 animate-pulse'
                                  : 'bg-slate-900 text-slate-400 border-slate-800'
                              )}
                            >
                              {allocQty !== null && (
                                <span className="text-[10px] font-extrabold bg-slate-950 text-amber-300 px-1.5 py-0.5 rounded mb-1">
                                  x = {allocQty}
                                </span>
                              )}
                              {dValObj && (
                                <span className="text-[10px] font-extrabold bg-slate-950 text-rose-300 px-1.5 py-0.5 rounded mb-1 border border-rose-800">
                                  d = {dValObj.d}
                                </span>
                              )}
                              {currentModiStep.highlightLoop && loopSign && (
                                <span className="text-[9px] font-extrabold bg-purple-900 text-white px-1 py-0.5 rounded mb-1">
                                  {loopSign}
                                </span>
                              )}
                              <span>₹{cost}</span>
                            </div>
                          </td>
                        );
                      })}
                      <td className="p-2 font-mono font-bold text-amber-300">{row.s}</td>
                      <td className="p-2 font-mono font-bold text-purple-400">u_{rIdx + 1} = {row.u}</td>
                    </tr>
                  ))}
                  <tr className="bg-slate-900/40 text-slate-300 font-mono">
                    <td className="p-2.5 text-left font-semibold text-amber-300">Demand</td>
                    <td className="p-2 font-bold text-amber-300">60</td>
                    <td className="p-2 font-bold text-amber-300">80</td>
                    <td className="p-2 font-bold text-amber-300">80</td>
                    <td className="p-2 font-bold text-white">∑ 220</td>
                    <td className="p-2 text-slate-600 text-xs">—</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Status Footer */}
            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1 text-xs sm:text-sm">
              <span className="text-emerald-300 font-semibold">⚡ Operational Status:</span>
              <p className="text-slate-200">{currentModiStep.costStatus}</p>
            </div>
          </div>
        </section>

        {/* SECTION 3: MODI vs Stepping-Stone */}
        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          data-index="2"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-600/20 text-purple-400 font-bold text-sm">
                03
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Architectural Comparison: MODI vs. Stepping-Stone
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-300 bg-slate-950">
                    <th className="p-3 font-semibold">Feature Dimension</th>
                    <th className="p-3 font-semibold text-rose-300">Stepping-Stone Method</th>
                    <th className="p-3 font-semibold text-emerald-300">MODI (u-v) Method</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="p-3 font-medium text-white">Evaluation Mechanism</td>
                    <td className="p-3 text-rose-300">Draws separate geometric loops for EVERY empty cell</td>
                    <td className="p-3 text-emerald-300 font-bold">Evaluates all empty cells via simple uᵢ + vⱼ addition</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-white">Loops Drawn per Pass</td>
                    <td className="p-3 text-rose-300">(m - 1)(n - 1) loops (e.g. 12 loops in 4x5)</td>
                    <td className="p-3 text-emerald-300 font-bold">Exactly 1 loop (for winning entering cell only)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-white">Computational Speed</td>
                    <td className="p-3 text-rose-300">Slow: O((m·n)²) per iteration</td>
                    <td className="p-3 text-emerald-300 font-bold">Blazing Fast: O(m·n) per iteration</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-white">Human Error Risk</td>
                    <td className="p-3 text-rose-300">High (complex visual tracking of multiple loops)</td>
                    <td className="p-3 text-emerald-300 font-bold">Minimal (simple scalar algebra)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 4: Algorithm Architecture SVG */}
        <section
          ref={(el) => (sectionRefs.current[3] = el)}
          data-index="3"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-600/20 text-teal-400 font-bold text-sm">
                04
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                MODI Cyclic Execution Flowchart
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 760 300"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Step 1 */}
                <rect x="20" y="80" width="130" height="70" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="2" />
                <text x="85" y="110" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">1. Basis Check</text>
                <text x="85" y="130" fill="#94a3b8" fontSize="9" textAnchor="middle">m + n - 1 cells</text>

                <line x1="150" y1="115" x2="170" y2="115" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="170,115 163,110 163,120" fill="#38bdf8" />

                {/* Step 2 */}
                <rect x="170" y="80" width="130" height="70" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="2" />
                <text x="235" y="110" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">2. Find u & v</text>
                <text x="235" y="130" fill="#94a3b8" fontSize="9" textAnchor="middle">uᵢ + vⱼ = cᵢⱼ</text>

                <line x1="300" y1="115" x2="320" y2="115" stroke="#34d399" strokeWidth="2" />
                <polygon points="320,115 313,110 313,120" fill="#34d399" />

                {/* Step 3 */}
                <rect x="320" y="80" width="130" height="70" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="2" />
                <text x="385" y="110" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">3. Eval dᵢⱼ</text>
                <text x="385" y="130" fill="#94a3b8" fontSize="9" textAnchor="middle">cᵢⱼ - (uᵢ + vⱼ)</text>

                <line x1="450" y1="115" x2="470" y2="115" stroke="#fbbf24" strokeWidth="2" />
                <polygon points="470,115 463,110 463,120" fill="#fbbf24" />

                {/* Step 4 */}
                <rect x="470" y="80" width="130" height="70" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="2" />
                <text x="535" y="110" fill="#f43f5e" fontSize="11" fontWeight="bold" textAnchor="middle">4. All d ≥ 0 ?</text>
                <text x="535" y="130" fill="#94a3b8" fontSize="9" textAnchor="middle">Optimality Audit</text>

                <line x1="600" y1="115" x2="620" y2="115" stroke="#10b981" strokeWidth="2" />
                <polygon points="620,115 613,110 613,120" fill="#10b981" />

                {/* Terminal Certified Box */}
                <rect x="620" y="80" width="120" height="70" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                <text x="680" y="110" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">Optimal!</text>
                <text x="680" y="130" fill="#ffffff" fontSize="9" fontFamily="monospace" textAnchor="middle">Min Cost Z</text>

                {/* Loop Back (Step 5) */}
                <path d="M 535 150 L 535 220 L 235 220 L 235 150" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 4" fill="none" />
                <polygon points="235,150 230,158 240,158" fill="#f43f5e" />
                <text x="385" y="240" fill="#f43f5e" fontSize="10" textAnchor="middle">
                  Step 5: Any d &lt; 0 ➔ Trace loop, pivot θ flow, and recompute u-v
                </text>
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 5: Real-World Bengal Case Studies */}
        <section
          ref={(el) => (sectionRefs.current[4] = el)}
          data-index="4"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 font-bold text-sm">
                05
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Bengal Logistics MODI Case Studies
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
                  <p className="text-emerald-300 font-semibold">💡 <strong>Financial Impact:</strong> {cs.impact}</p>
                </div>
              );
            })()}
          </div>
        </section>

        {/* SECTION 6: Common Pitfalls */}
        <section
          ref={(el) => (sectionRefs.current[5] = el)}
          data-index="5"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-600/20 text-rose-400 font-bold text-sm">
                06
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Common Beginner Mistakes
              </h2>
            </div>

            <div className="flex flex-col space-y-2.5">
              {[
                {
                  trap: 'Forgetting to Set u₁ = 0 Before Solving Potentials',
                  fix: 'Anchor the linear system by setting one dual variable to 0 (typically u₁ = 0 or the row with the most basic cells).',
                },
                {
                  trap: 'Reversing the Opportunity Cost Subtraction Formula',
                  fix: 'Always use d_ij = c_ij - (u_i + v_j). Subtracting c_ij from (u_i + v_j) reverses all signs and ruins entering cell selection.',
                },
                {
                  trap: 'Picking θ from the Plus (+) Corners of the Loop',
                  fix: 'The maximum allowable transfer θ is strictly the MINIMUM of the allocated values among the MINUS (-) corners.',
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

        {/* SECTION 7: Guided Hints */}
        <section
          ref={(el) => (sectionRefs.current[6] = el)}
          data-index="6"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 font-bold text-sm">
                07
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Guided Hints
              </h2>
            </div>

            <div className="flex flex-col space-y-3">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-amber-300 font-semibold text-sm">💡 Think about…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Think about why MODI is so much faster than Stepping-Stone: calculating m+n potentials evaluates all empty cells in one sweep, needing only one loop when a pivot is actually performed!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully that dual potentials uᵢ and vⱼ can be negative numbers—always apply standard signed arithmetic when evaluating uᵢ + vⱼ.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: Revision Checklist */}
        <section
          ref={(el) => (sectionRefs.current[7] = el)}
          data-index="7"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                08
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Student Revision Checklist (Topic 1)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Confirmed non-degeneracy condition (Count = m + n - 1)',
                'Set u₁ = 0 (or row with maximum basic allocations) to anchor potentials',
                'Solved uᵢ + vⱼ = cᵢⱼ for all basic cells',
                'Computed opportunity costs dᵢⱼ = cᵢⱼ - (uᵢ + vⱼ) for all empty cells',
                'Identified optimality criterion: all dᵢⱼ ≥ 0',
                'Selected entering cell with the most negative dᵢⱼ',
                'Constructed closed loop with alternating (+θ, -θ) signs',
                'Calculated θ = min(x_minus) and updated total transportation cost Z',
              ].map((text, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-800/40 border border-slate-700/60 flex items-center space-x-3">
                  <span className="text-emerald-400">✅</span>
                  <span className="text-xs sm:text-sm text-slate-300">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 9: Teacher's Note */}
        <section className="flex flex-col space-y-6">
          <Teacher
            note={
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: the MODI method is the crown jewel of transportation modeling! Think of row potentials uᵢ and column potentials vⱼ as the dual temperature gauges of your network. Once you set u₁ = 0 and solve for the basic cells, all empty cells are evaluated instantly with simple addition. If all dᵢⱼ ≥ 0, you have mathematically proven that your logistics plan is the cheapest possible on planet Earth! If any dᵢⱼ < 0, you trace just one clean stepping-stone loop, transfer θ units, and watch your total cost drop. Master these 5 steps, and you master the transportation simplex method!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="MODI Method Overview FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="MODI Method Overview"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic2_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic1;
