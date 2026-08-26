// src/components/study/quantitative-analysis/topics/003_001_hungarian-method-for-assignment-problems/Topic7.jsx
// React 19 Function-based Component
// Module: 003_001_hungarian-method-for-assignment-problems
// Topic 7: Hungarian Method

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
  const [currentStep, setCurrentStep] = useState(0); // 0 to 4

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
      title: 'Step 1: Balance Verification & Initial Cost Matrix',
      badge: 'm = n = 4 (Square Balanced)',
      badgeColor: 'bg-indigo-950 text-indigo-300 border-indigo-800',
      description: 'The 4x4 matrix represents 4 technicians and 4 foundry jobs. All supplies = 1 and demands = 1. Ready for row reduction.',
      matrix: [
        ['₹10', '₹15', '₹12', '₹18'],
        ['₹13', '₹12', '₹14', '₹16'],
        ['₹15', '₹14', '₹17', '₹12'],
        ['₹11', '₹13', '₹15', '₹14'],
      ],
      annotations: 'Row Mins: R1=10, R2=12, R3=12, R4=11.',
    },
    {
      step: 1,
      title: 'Step 2: Row Reduction (Subtract Row Minimums)',
      badge: 'Row Mins Subtracted',
      badgeColor: 'bg-sky-950 text-sky-300 border-sky-800',
      description: 'Subtracting row minimums [10, 12, 12, 11] creates at least one zero in every single row.',
      matrix: [
        ['0', '5', '2', '8'],
        ['1', '0', '2', '4'],
        ['3', '2', '5', '0'],
        ['0', '2', '4', '3'],
      ],
      annotations: 'Col Mins: C1=0, C2=0, C3=2, C4=0.',
    },
    {
      step: 2,
      title: 'Step 3: Column Reduction (Subtract Column Minimums)',
      badge: 'Column Mins Subtracted',
      badgeColor: 'bg-cyan-950 text-cyan-300 border-cyan-800',
      description: 'Subtracting Column 3 minimum (2) guarantees that every row AND every column contains at least one zero.',
      matrix: [
        ['0', '5', '0', '8'],
        ['1', '0', '0', '4'],
        ['3', '2', '3', '0'],
        ['0', '2', '2', '3'],
      ],
      annotations: 'Total Shift = (10+12+12+11) + (0+0+2+0) = 45 + 2 = ₹47.',
    },
    {
      step: 3,
      title: 'Step 4: Line Covering Test & Additional Reduction (e = 1)',
      badge: 'L = 4 = n (Optimal! ⭐)',
      badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-800',
      description: 'Initial covering took L = 3 lines. Smallest uncovered element was e = 1. After adjusting uncovered (-1) and intersections (+1), L = 4 lines are required!',
      matrix: [
        ['[0] (Line 1)', '4', '0', '7'],
        ['1', '[0] (Line 2)', '0', '4'],
        ['3', '1', '2', '[0] (Line 3)'],
        ['[0] (Line 4)', '1', '1', '2'],
      ],
      annotations: 'Minimum Covering Lines L = 4 == n = 4. Optimality Certified!',
    },
    {
      step: 4,
      title: 'Step 5: Independent Zero Assignment & Cost Report',
      badge: 'Certified Min Z* = ₹46',
      badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-800',
      description: 'Allocations: Debangshu➔Job 3 (₹12), Susmita➔Job 2 (₹12), Mamata➔Job 4 (₹12), Mahima➔Job 1 (₹11). Certified Total Cost Z* = ₹46.',
      matrix: [
        ['0', '0', 'x₁₃ = 1 (₹12)', '0'],
        ['0', 'x₂₂ = 1 (₹12)', '0', '0'],
        ['0', '0', '0', 'x₃₄ = 1 (₹12)'],
        ['x₄₁ = 1 (₹11)', '0', '0', '0'],
      ],
      annotations: 'Total Spend = 12 + 12 + 12 + 11 = ₹46 (Zero Duality Gap Verified).',
    },
  ];

  const stepObj = stepsData[currentStep];

  // Case Studies
  const caseStudies = [
    {
      title: '1. Foundry Full Hungarian Pipeline (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Executed the complete 5-step Hungarian algorithm on Barrackpore casting personnel. Resolved 1 additional reduction step (e = ₹1) to lock in certified minimal spend of ₹46.',
      lesson: 'The Hungarian algorithm delivers verified mathematical cost leadership in polynomial time.',
    },
    {
      title: '2. Cold-Chain Vaccine Multi-Pass Optimization (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Applied the 5-step Hungarian solver across 4 Kolkata hospital clinics, saving ₹18 per delivery cycle while maintaining strict temperature cold-chain integrity.',
      lesson: 'Kuhn-Munkres matching guarantees zero scheduling overlap in emergency healthcare.',
    },
    {
      title: '3. Supermarket FMCG Store Manager Allocation (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Structured a balanced 4x4 retail roster in Ichapur, applying König line covering (L = 4) to assign 4 store managers with 100% operational transparency.',
      lesson: 'Clear algorithmic assignments eliminate workplace friction and management disputes.',
    },
    {
      title: '4. Educational Press Tender Compliance Audit (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Presented the complete 5-step Hungarian mathematical audit trail (Z* = ₹46) to state university auditors, achieving 100% fiduciary tender compliance.',
      lesson: 'Hungarian method mathematical proofs provide unassailable audit protection.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes masterGlow {
          0%, 100% { border-color: rgba(99, 102, 241, 0.3); }
          50% { border-color: rgba(99, 102, 241, 0.8); }
        }
        .glow-master {
          animation: masterGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-indigo-950/80 text-indigo-400 border border-indigo-800/60">
              Segment 3 • Module 003_001 • Topic 7
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-indigo-950/80 text-indigo-400 border border-indigo-800/60">
              Kuhn-Munkres Algorithm Master Overview
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            The Hungarian Method
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            The complete master overview of the <span className="text-indigo-400 font-semibold">Kuhn-Munkres Hungarian Algorithm</span>: exploring its historical foundation (Kuhn, Kőnig, Egerváry), mastering the <span className="text-sky-400 font-semibold">5-Step Execution Engine</span> in <span className="text-emerald-400 font-mono">O(n³)</span> time, executing <span className="text-amber-400 font-semibold">Additional Reductions</span>, and certifying minimal expenditure in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'engine-overview', label: '1. 5-Step Engine Overview' },
              { id: 'interactive-master', label: '2. Master Hungarian Stepper' },
              { id: 'solution-report', label: '3. Final Assignment Report' },
              { id: 'svg-flowchart', label: '4. Complete Engine Flowchart SVG' },
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
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-900/40'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
                )}
              &gt;
                {item.label}
              </button>
            ))}
          </div>
        </header>

        {/* SECTION 1: 5-Step Engine Overview */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 font-bold text-sm">
                01
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                The 5-Step Master Execution Engine
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-indigo-300 font-bold">1. Balance Check</span>
                <p className="text-slate-300">Ensure m = n; add ₹0 dummy lines if non-square.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-sky-300 font-bold">2. Row Reduce</span>
                <p className="text-slate-300">Subtract min(Row i) from each row.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-bold">3. Col Reduce</span>
                <p className="text-slate-300">Subtract min(Col j) from each column.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-amber-300 font-bold">4. König Line Test</span>
                <p className="text-slate-300">If L = n ➔ Step 5. If L &lt; n ➔ Adjust by e.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-emerald-800/80 flex flex-col space-y-1">
                <span className="text-emerald-300 font-bold">5. Zero Assign</span>
                <p className="text-slate-300">Extract n independent zeros; report Z* in ₹.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Master Hungarian Stepper */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-master">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 font-bold text-sm">
                  02
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Master Hungarian Algorithm Stepper
                </h2>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[0, 1, 2, 3, 4].map((idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentStep(idx)}
                    className={clsx(
                      'px-2.5 py-1 rounded text-xs font-semibold transition-all border',
                      currentStep === idx
                        ? 'bg-indigo-600 text-white border-indigo-400 shadow-md'
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                    )}
                  &gt;
                    Step {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-white">{stepObj.title}</h3>
                <span className="text-xs text-slate-400">{stepObj.description}</span>
              </div>
              <span className={clsx('px-3 py-1 rounded-full text-xs font-mono font-bold border', stepObj.badgeColor)}>
                {stepObj.badge}
              </span>
            </div>

            {/* Matrix View */}
            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-center border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2 text-left font-semibold text-slate-300 font-sans">Technicians \ Jobs</th>
                    <th className="p-2 font-semibold text-cyan-300 font-sans">Job 1</th>
                    <th className="p-2 font-semibold text-cyan-300 font-sans">Job 2</th>
                    <th className="p-2 font-semibold text-cyan-300 font-sans">Job 3</th>
                    <th className="p-2 font-semibold text-cyan-300 font-sans">Job 4</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {['Debangshu (W1)', 'Susmita (W2)', 'Mamata (W3)', 'Mahima (W4)'].map((wName, rIdx) => (
                    <tr key={rIdx}>
                      <td className="p-2 text-left font-medium text-slate-200 font-sans">{wName}</td>
                      {stepObj.matrix[rIdx].map((cellText, cIdx) => (
                        <td key={cIdx} className="p-2">
                          <div
                            className={clsx(
                              'p-2.5 rounded-lg font-bold transition-all border flex items-center justify-center',
                              cellText.includes('x₁₃') || cellText.includes('x₂₂') || cellText.includes('x₃₄') || cellText.includes('x₄₁')
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
              <span className="text-slate-200">{stepObj.annotations}</span>
            </div>

            {/* Next/Prev Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentStep((prev) => (prev > 0 ? prev - 1 : 4))}
                className="px-3.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 text-xs font-semibold"
              >
                ◀ Previous Step
              </button>
              <button
                onClick={() => setCurrentStep((prev) => (prev < 4 ? prev + 1 : 0))}
                className="px-3.5 py-1.5 rounded-lg bg-indigo-600 text-white border border-indigo-500 hover:bg-indigo-500 text-xs font-semibold"
              >
                Next Step ▶
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 3: Final Assignment Report */}
        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          data-index="2"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                03
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Optimal Assignment Manifest & Economic Audit
              </h2>
            </div>

            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2.5 font-semibold">Technician</th>
                    <th className="p-2.5 font-semibold">Assigned Task</th>
                    <th className="p-2.5 font-semibold text-cyan-300">Original Cell</th>
                    <th className="p-2.5 font-semibold text-emerald-300">Unit Cost (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300 font-mono">
                  <tr>
                    <td className="p-2.5 font-medium text-white font-sans">Debangshu (W1)</td>
                    <td className="p-2.5 text-white font-sans">Job 3</td>
                    <td className="p-2.5 text-cyan-300">Cell (1, 3)</td>
                    <td className="p-2.5 text-emerald-400 font-bold">₹12</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-white font-sans">Susmita (W2)</td>
                    <td className="p-2.5 text-white font-sans">Job 2</td>
                    <td className="p-2.5 text-cyan-300">Cell (2, 2)</td>
                    <td className="p-2.5 text-emerald-400 font-bold">₹12</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-white font-sans">Mamata (W3)</td>
                    <td className="p-2.5 text-white font-sans">Job 4</td>
                    <td className="p-2.5 text-cyan-300">Cell (3, 4)</td>
                    <td className="p-2.5 text-emerald-400 font-bold">₹12</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-white font-sans">Mahima (W4)</td>
                    <td className="p-2.5 text-white font-sans">Job 1</td>
                    <td className="p-2.5 text-cyan-300">Cell (4, 1)</td>
                    <td className="p-2.5 text-emerald-400 font-bold">₹11</td>
                  </tr>
                  <tr className="bg-slate-900/60 text-white font-bold">
                    <td colSpan="3" className="p-3 text-right font-sans text-emerald-300">
                      CERTIFIED MINIMUM TOTAL ASSIGNMENT COST (Z*):
                    </td>
                    <td className="p-3 text-emerald-400 text-base">₹46</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 4: Complete Engine Flowchart SVG */}
        <section
          ref={(el) => (sectionRefs.current[3] = el)}
          data-index="3"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-600/20 text-teal-400 font-bold text-sm">
                04
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Hungarian Method Complete Engine Flowchart
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 240"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* 5 Process Boxes */}
                <rect x="30" y="30" width="120" height="70" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="90" y="60" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">1. Balance Check</text>
                <text x="90" y="80" fill="#cbd5e1" fontSize="9" textAnchor="middle">Add ₹0 Dummies</text>

                <rect x="175" y="30" width="120" height="70" rx="8" fill="#1e293b" stroke="#818cf8" strokeWidth="2" />
                <text x="235" y="60" fill="#818cf8" fontSize="11" fontWeight="bold" textAnchor="middle">2. Row Reduce</text>
                <text x="235" y="80" fill="#cbd5e1" fontSize="9" textAnchor="middle">cᵢⱼ − min(Row)</text>

                <rect x="320" y="30" width="120" height="70" rx="8" fill="#1e293b" stroke="#fbbf24" strokeWidth="2" />
                <text x="380" y="60" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">3. Col Reduce</text>
                <text x="380" y="80" fill="#cbd5e1" fontSize="9" textAnchor="middle">cᵢⱼ' − min(Col)</text>

                <rect x="465" y="30" width="120" height="70" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <text x="525" y="60" fill="#f43f5e" fontSize="11" fontWeight="bold" textAnchor="middle">4. König Line Test</text>
                <text x="525" y="80" fill="#cbd5e1" fontSize="9" textAnchor="middle">L = n Lines?</text>

                <rect x="610" y="30" width="110" height="70" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="665" y="60" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">5. Final Z*</text>
                <text x="665" y="80" fill="#ffffff" fontSize="9" textAnchor="middle">Assign Zeros</text>

                {/* Additional Reduction Loopback */}
                <rect x="465" y="140" width="120" height="60" rx="8" fill="#4c0519" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 3" />
                <text x="525" y="165" fill="#fecdd3" fontSize="10" fontWeight="bold" textAnchor="middle">Additional Reduce</text>
                <text x="525" y="183" fill="#fda4af" fontSize="9" textAnchor="middle">Uncovered − e / Int + e</text>

                {/* Loop Arrow */}
                <line x1="525" y1="100" x2="525" y2="140" stroke="#f43f5e" strokeWidth="2" />
                <line x1="465" y1="170" x2="400" y2="170" stroke="#f43f5e" strokeWidth="2" />
                <line x1="400" y1="170" x2="400" y2="100" stroke="#f43f5e" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 5: Real-World Bengal Case Studies */}
        <section
          ref={(el) => (sectionRefs.current[4] = el)}
          data-index="4"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 font-bold text-sm">
                05
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Bengal Operations Research Hungarian Case Studies
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
                  <p className="text-indigo-300 font-semibold">💡 <strong>Operations Takeaway:</strong> {cs.lesson}</p>
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
        &gt;
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
                  trap: 'Calculating Total Cost Z* from the Reduced Matrix',
                  fix: 'Never sum the 0s! Pull the unit rates from the ORIGINAL cost matrix in Indian Rupees (₹).',
                },
                {
                  trap: 'Forgetting to Add e at Line Intersections',
                  fix: 'In the additional reduction step: subtract e from uncovered, but ALWAYS add e to elements covered by two lines (intersections).',
                },
                {
                  trap: 'Assigning More Than One Zero in Any Row or Column',
                  fix: 'When assigning cell (i, j), immediately cross out (X) all other zeros in row i and column j.',
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
        &gt;
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
                  Think of the Hungarian Method as a laser scanner: it systematically reduces row and column noise until pure zero-cost pathways reveal the global optimum!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully that whenever you make an assignment, you cross out other zeros in that column to prevent task contestation.
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
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                08
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Student Revision Checklist (Topic 7)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Memorized the complete 5-step Hungarian Method pipeline',
                'Executed row reduction: c_ij\' = c_ij - min(Row i)',
                'Executed column reduction: c_ij\'\' = c_ij\' - min(Col j)',
                'Tested König line covering condition L == n',
                'Executed additional reduction: uncovered - e, intersections + e',
                'Assigned independent zeros and certified final minimum cost Z* in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: the Hungarian Method is one of the crowning achievements of 20th-century mathematics! You have now mastered the master execution engine. In our upcoming topics (Topics 8 through 13), we will zoom in with microscope precision on every single step—from row reductions and column reductions to the subtle art of covering zeros and making additional reductions. Keep your pencil sharp and your mind focused!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="The Hungarian Method Master FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="The Hungarian Method (Master Overview)"
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
