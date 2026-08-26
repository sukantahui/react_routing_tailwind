// src/components/study/quantitative-analysis/topics/003_001_hungarian-method-for-assignment-problems/Topic4.jsx
// React 19 Function-based Component
// Module: 003_001_hungarian-method-for-assignment-problems
// Topic 4: Balanced assignment problems

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic4_files/topic4_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic4_files/topic4_note.txt?raw';

const Topic4 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [stepIndex, setStepIndex] = useState(0); // 0 to 4

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

  const stepsData = [
    {
      step: 0,
      title: 'Step 1: Raw Cost Matrix & Balance Verification',
      badge: 'm = n = 3 (Square Matrix)',
      badgeColor: 'bg-indigo-950 text-indigo-300 border-indigo-800',
      description: 'Matrix order is 3x3. All 3 workers and 3 tasks are balanced. Direct Hungarian method is applicable without dummy lines.',
      matrix: [
        ['₹9', '₹26', '₹15'],
        ['₹13', '₹27', '₹6'],
        ['₹35', '₹20', '₹15'],
      ],
      annotations: 'Row Mins: Row 1 = ₹9, Row 2 = ₹6, Row 3 = ₹15.',
    },
    {
      step: 1,
      title: 'Step 2: Row Reduction (Subtract Row Minimums)',
      badge: 'Row Reductions Applied',
      badgeColor: 'bg-sky-950 text-sky-300 border-sky-800',
      description: 'Subtracting row minimums [9, 6, 15] guarantees that every row contains at least one zero candidate.',
      matrix: [
        ['0', '17', '6'],
        ['7', '21', '0'],
        ['20', '5', '0'],
      ],
      annotations: 'Column Mins: Col 1 = 0, Col 2 = 5, Col 3 = 0.',
    },
    {
      step: 2,
      title: 'Step 3: Column Reduction (Subtract Column Minimums)',
      badge: 'Fully Reduced Matrix',
      badgeColor: 'bg-cyan-950 text-cyan-300 border-cyan-800',
      description: 'Subtracting Column 2 minimum (5) yields the final reduced opportunity cost matrix with zeros in every row and column.',
      matrix: [
        ['0', '12', '6'],
        ['7', '16', '0'],
        ['20', '0', '0'],
      ],
      annotations: 'Total Shift = 9 + 6 + 15 + 5 = ₹35.',
    },
    {
      step: 3,
      title: 'Step 4: Minimum Line Covering Test (König’s Theorem)',
      badge: 'L = 3 = n (Optimal! ⭐)',
      badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-800',
      description: 'Minimum lines required to cover all zeros is L = 3. Since L equals matrix order n = 3, global optimality is mathematically certified!',
      matrix: [
        ['[0] (Line 1)', '12', '6'],
        ['7', '16', '[0] (Line 2)'],
        ['20', '[0] (Line 3)', '[0] (Line 3)'],
      ],
      annotations: '3 Horizontal Lines cover all zeros. L = n = 3.',
    },
    {
      step: 4,
      title: 'Step 5: Final 1-to-1 Optimal Assignment & Cost Audit',
      badge: 'Certified Min Z* = ₹35',
      badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-800',
      description: 'Assigned: Debangshu➔Job 1 (₹9), Susmita➔Job 3 (₹6), Mamata➔Job 2 (₹20). Certified Minimum Total Cost Z* = ₹35.',
      matrix: [
        ['x₁₁ = 1 (₹9)', '0', '0'],
        ['0', '0', 'x₂₃ = 1 (₹6)'],
        ['0', 'x₃₂ = 1 (₹20)', '0'],
      ],
      annotations: 'Total Spend = 9 + 6 + 20 = ₹35 (Zero Duality Gap Verified).',
    },
  ];

  const currentStep = stepsData[stepIndex];

  // Case Studies
  const caseStudies = [
    {
      title: '1. Foundry Balanced Job Scheduling (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Solved a balanced 4x4 foundry roster in Barrackpore, assigning 4 senior metallurgists to 4 melting jobs with total minimal expenditure of ₹120.',
      lesson: 'Balanced square matrices execute the 5-step Hungarian pipeline with zero dummy overhead.',
    },
    {
      title: '2. Cold-Chain Vaccine Balanced Clinic Match (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Matched 4 refrigerated vans to 4 emergency hospital clinics in Kolkata, achieving optimal dispatching at ₹85 total transit cost.',
      lesson: 'Balanced fleet models guarantee 100% capacity utilization without idle vehicles.',
    },
    {
      title: '3. Supermarket FMCG Supervisor Roster (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Structured a balanced 4x4 retail roster for store supervisors, minimizing weekly administrative labor expenditure by ₹2,400.',
      lesson: 'Direct 5-step solving streamlines weekly staff scheduling.',
    },
    {
      title: '4. Educational Press Textbook Production Line (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Scheduled 3 industrial book-binding lines for 3 high-volume textbook orders in Jadavpur, locking in the certified minimal processing cost of ₹35.',
      lesson: 'König line covering guarantees that the final matching achieves absolute cost minimality.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes balGlow {
          0%, 100% { border-color: rgba(56, 189, 248, 0.3); }
          50% { border-color: rgba(56, 189, 248, 0.8); }
        }
        .glow-bal {
          animation: balGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Segment 3 • Module 003_001 • Topic 4
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Square Matrices & 5-Step Solver Walkthrough
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Balanced Assignment Problems
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive step-by-step masterclass on <span className="text-sky-400 font-semibold">Balanced (n × n) Assignment Problems</span>: executing row and column reductions, applying <span className="text-amber-400 font-semibold">König’s Line Covering Theorem</span> (<span className="text-emerald-400 font-mono">L = n</span>), allocating independent zeros, and certifying the <span className="text-emerald-400 font-semibold">Minimum Total Cost (Z*)</span> in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'balanced-concept', label: '1. Balanced Definition' },
              { id: 'interactive-stepper', label: '2. 5-Step Interactive Stepper' },
              { id: 'solution-manifest', label: '3. Final Assignment Manifest' },
              { id: 'svg-pipeline', label: '4. 5-Step Pipeline SVG' },
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

        {/* SECTION 1: Balanced Definition */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                01
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                What Makes an Assignment Problem Balanced?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-sky-300 font-bold">1. Square Matrix (m = n)</span>
                <p className="text-slate-300">Number of assignees exactly equals number of tasks (e.g. 3 workers and 3 machines).</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-emerald-300 font-bold">2. Zero Dummy Lines Needed</span>
                <p className="text-slate-300">Eligible for direct row and column reduction without augmenting artificial dummy rows or columns.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-amber-300 font-bold">3. Complete Resource Utilization</span>
                <p className="text-slate-300">Total capacity = Total demand = n units. Every single worker is assigned and every task fulfilled.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: 5-Step Interactive Stepper */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-bal">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                  02
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  5-Step Hungarian Method Interactive Stepper
                </h2>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[0, 1, 2, 3, 4].map((idx) => (
                  <button
                    key={idx}
                    onClick={() => setStepIndex(idx)}
                    className={clsx(
                      'px-2.5 py-1 rounded text-xs font-semibold transition-all border',
                      stepIndex === idx
                        ? 'bg-sky-600 text-white border-sky-400 shadow-md'
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                    )}
                  >
                    Step {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-white">{currentStep.title}</h3>
                <span className="text-xs text-slate-400">{currentStep.description}</span>
              </div>
              <span className={clsx('px-3 py-1 rounded-full text-xs font-mono font-bold border', currentStep.badgeColor)}>
                {currentStep.badge}
              </span>
            </div>

            {/* Matrix View */}
            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-center border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2.5 text-left font-semibold text-slate-300 font-sans">Workers \ Tasks</th>
                    <th className="p-2.5 font-semibold text-cyan-300 font-sans">Job 1</th>
                    <th className="p-2.5 font-semibold text-cyan-300 font-sans">Job 2</th>
                    <th className="p-2.5 font-semibold text-cyan-300 font-sans">Job 3</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {['Debangshu (W1)', 'Susmita (W2)', 'Mamata (W3)'].map((wName, rIdx) => (
                    <tr key={rIdx}>
                      <td className="p-2.5 text-left font-medium text-slate-200 font-sans">{wName}</td>
                      {currentStep.matrix[rIdx].map((cellText, cIdx) => (
                        <td key={cIdx} className="p-2">
                          <div
                            className={clsx(
                              'p-2.5 rounded-lg font-bold transition-all border flex items-center justify-center',
                              cellText.includes('x₁₁') || cellText.includes('x₂₃') || cellText.includes('x₃₂')
                                ? 'bg-emerald-950 text-emerald-300 border-emerald-500 shadow-md shadow-emerald-950/60 scale-105'
                                : cellText === '0' || cellText.includes('[0]')
                                ? 'bg-emerald-950/60 text-emerald-400 border-emerald-700'
                                : 'bg-slate-900 text-slate-300 border-slate-800'
                            )}
                          >
                            {cellText}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex items-center justify-between text-xs sm:text-sm">
              <span className="text-amber-300 font-semibold font-mono">⚡ Working Annotation:</span>
              <span className="text-slate-200">{currentStep.annotations}</span>
            </div>

            {/* Next/Prev Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setStepIndex((prev) => (prev > 0 ? prev - 1 : 4))}
                className="px-3.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 text-xs font-semibold"
              >
                ◀ Previous Step
              </button>
              <button
                onClick={() => setStepIndex((prev) => (prev < 4 ? prev + 1 : 0))}
                className="px-3.5 py-1.5 rounded-lg bg-sky-600 text-white border border-sky-500 hover:bg-sky-500 text-xs font-semibold"
              >
                Next Step ▶
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 3: Final Assignment Manifest */}
        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          data-index="2"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                03
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Optimal Assignment Manifest & Duality Proof
              </h2>
            </div>

            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2.5 font-semibold">Assignee</th>
                    <th className="p-2.5 font-semibold">Assigned Task</th>
                    <th className="p-2.5 font-semibold text-cyan-300">Original Cell</th>
                    <th className="p-2.5 font-semibold text-emerald-300">Unit Cost (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300 font-mono">
                  <tr>
                    <td className="p-2.5 font-medium text-white font-sans">Debangshu (W1)</td>
                    <td className="p-2.5 text-white font-sans">Furnace Job 1</td>
                    <td className="p-2.5 text-cyan-300">Cell (1, 1)</td>
                    <td className="p-2.5 text-emerald-400 font-bold">₹9</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-white font-sans">Susmita (W2)</td>
                    <td className="p-2.5 text-white font-sans">Press Case 3</td>
                    <td className="p-2.5 text-cyan-300">Cell (2, 3)</td>
                    <td className="p-2.5 text-emerald-400 font-bold">₹6</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-white font-sans">Mamata (W3)</td>
                    <td className="p-2.5 text-white font-sans">Clinic Task 2</td>
                    <td className="p-2.5 text-cyan-300">Cell (3, 2)</td>
                    <td className="p-2.5 text-emerald-400 font-bold">₹20</td>
                  </tr>
                  <tr className="bg-slate-900/60 text-white font-bold">
                    <td colSpan="3" className="p-3 text-right font-sans text-emerald-300">
                      CERTIFIED MINIMUM TOTAL ASSIGNMENT COST (Z*):
                    </td>
                    <td className="p-3 text-emerald-400 text-base">₹35</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 4: 5-Step Pipeline SVG */}
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
                The 5-Step Balanced Hungarian Flow
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 200"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* 5 Process Nodes */}
                <rect x="20" y="50" width="125" height="100" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="82" y="80" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">1. Balance Check</text>
                <text x="82" y="105" fill="#cbd5e1" fontSize="9" textAnchor="middle">m = n = 3</text>
                <text x="82" y="125" fill="#a7f3d0" fontSize="9" textAnchor="middle">Square Matrix</text>

                <rect x="165" y="50" width="125" height="100" rx="8" fill="#1e293b" stroke="#818cf8" strokeWidth="2" />
                <text x="227" y="80" fill="#818cf8" fontSize="11" fontWeight="bold" textAnchor="middle">2. Row Reduce</text>
                <text x="227" y="105" fill="#cbd5e1" fontSize="9" textAnchor="middle">cᵢⱼ − min(Row)</text>
                <text x="227" y="125" fill="#a7f3d0" fontSize="9" textAnchor="middle">u = [9, 6, 15]</text>

                <rect x="310" y="50" width="125" height="100" rx="8" fill="#1e293b" stroke="#fbbf24" strokeWidth="2" />
                <text x="372" y="80" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">3. Col Reduce</text>
                <text x="372" y="105" fill="#cbd5e1" fontSize="9" textAnchor="middle">cᵢⱼ' − min(Col)</text>
                <text x="372" y="125" fill="#a7f3d0" fontSize="9" textAnchor="middle">v = [0, 5, 0]</text>

                <rect x="455" y="50" width="125" height="100" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <text x="517" y="80" fill="#f43f5e" fontSize="11" fontWeight="bold" textAnchor="middle">4. Line Cover</text>
                <text x="517" y="105" fill="#cbd5e1" fontSize="9" textAnchor="middle">L = 3 lines</text>
                <text x="517" y="125" fill="#a7f3d0" fontSize="9" textAnchor="middle">L = n ➔ Optimal!</text>

                <rect x="600" y="50" width="125" height="100" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="662" y="80" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">5. Final Z*</text>
                <text x="662" y="105" fill="#cbd5e1" fontSize="9" textAnchor="middle">Assign Zeros</text>
                <text x="662" y="125" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">Z* = ₹35</text>
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
                Bengal Logistics Balanced Assignment Case Studies
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
                  trap: 'Forgetting to Check if L == n During Line Covering',
                  fix: 'If minimum covering lines L < n, you cannot assign yet; execute the additional reduction step first.',
                },
                {
                  trap: 'Summing Costs from the Reduced Matrix',
                  fix: 'Never sum the 0s from the reduced matrix! Always pull the unit rates from the ORIGINAL cost matrix to get Z*.',
                },
                {
                  trap: 'Failing to Cross Out Conflicting Zeros',
                  fix: 'When assigning a zero in cell (i, j), immediately cross out all other zeros in row i and column j.',
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
                  Think about why balanced problems are so clean to solve: because m = n, row reduction and column reduction symmetrically create the exact potential field needed for König’s theorem to fire!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully that the sum of row minimums (30) plus column minimums (5) equals exactly ₹35—the certified minimal cost Z*!
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
                Student Revision Checklist (Topic 4)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Verified balanced condition: m = n (square matrix)',
                'Executed row reduction: c_ij\' = c_ij - min(Row i)',
                'Executed column reduction: c_ij\'\' = c_ij\' - min(Col j)',
                'Tested minimum line covering condition L == n',
                'Assigned independent zeros and crossed out conflicting zeros',
                'Calculated final minimum cost Z* in Indian Rupees (₹) and verified via Strong Duality',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: balanced assignment problems are the bread and butter of operations research examinations! Always follow the 5-step pipeline: (1) Verify m = n, (2) Row Minimum Subtraction, (3) Column Minimum Subtraction, (4) Line Covering Test L = n, and (5) Assign Independent Zeros. In our next topic, we will explore what to do when m ≠ n—the Unbalanced Assignment Problem!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Balanced Assignment Problems FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Balanced Assignment Problems (Hungarian Method)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic5_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic4;
