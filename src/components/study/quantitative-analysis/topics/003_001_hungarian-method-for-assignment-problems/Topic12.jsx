// src/components/study/quantitative-analysis/topics/003_001_hungarian-method-for-assignment-problems/Topic12.jsx
// React 19 Function-based Component
// Module: 003_001_hungarian-method-for-assignment-problems
// Topic 12: Selecting independent zeros

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
  const [allocStep, setAllocStep] = useState(0); // 0 to 4

  const workerNames = ['Debangshu (W1)', 'Susmita (W2)', 'Mamata (W3)', 'Mahima (W4)'];
  const taskNames = ['Job 1', 'Job 2', 'Job 3', 'Job 4'];

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
      title: 'Initial Optimal Zero Landscape (L = 4 = n)',
      badge: 'Step 5 Ready',
      badgeColor: 'bg-indigo-950 text-indigo-300 border-indigo-800',
      description: 'The matrix contains multiple zeros. We scan rows with exactly ONE zero first.',
      matrix: [
        ['0', '5', '0', '9'],
        ['1', '0', '0', '5'],
        ['2', '1', '2', '0'],
        ['0', '1', '1', '2'],
      ],
      annotations: 'Row 3 has 1 zero at (3,4). Row 4 has 1 zero at (4,1).',
    },
    {
      step: 1,
      title: 'Assignment 1: Row 3 has ONE zero at Cell (3, 4)',
      badge: 'Mamata ➔ Job 4 Assigned',
      badgeColor: 'bg-sky-950 text-sky-300 border-sky-800',
      description: 'Box Cell (3, 4) [0]. Cross out other zeros in Column 4 (None exist).',
      matrix: [
        ['0', '5', '0', '9'],
        ['1', '0', '0', '5'],
        ['2', '1', '2', '[0] ⭐ (₹12)'],
        ['0', '1', '1', '2'],
      ],
      annotations: 'Mamata is assigned to Job 4. No conflicting zeros in Column 4.',
    },
    {
      step: 2,
      title: 'Assignment 2: Row 4 has ONE zero at Cell (4, 1)',
      badge: 'Mahima ➔ Job 1 Assigned',
      badgeColor: 'bg-sky-950 text-sky-300 border-sky-800',
      description: 'Box Cell (4, 1) [0]. Cross out conflicting zero in Column 1: Cell (1, 1) becomes (X)!',
      matrix: [
        ['(X) ❌', '5', '0', '9'],
        ['1', '0', '0', '5'],
        ['2', '1', '2', '[0] ⭐ (₹12)'],
        ['[0] ⭐ (₹11)', '1', '1', '2'],
      ],
      annotations: 'Mahima is assigned to Job 1. Cell (1, 1) is crossed out to prevent double-booking Job 1.',
    },
    {
      step: 3,
      title: 'Assignment 3: Row 1 now has only ONE zero at Cell (1, 3)',
      badge: 'Debangshu ➔ Job 3 Assigned',
      badgeColor: 'bg-cyan-950 text-cyan-300 border-cyan-800',
      description: 'Box Cell (1, 3) [0]. Cross out conflicting zero in Column 3: Cell (2, 3) becomes (X)!',
      matrix: [
        ['(X) ❌', '5', '[0] ⭐ (₹12)', '9'],
        ['1', '0', '(X) ❌', '5'],
        ['2', '1', '2', '[0] ⭐ (₹12)'],
        ['[0] ⭐ (₹11)', '1', '1', '2'],
      ],
      annotations: 'Debangshu is assigned to Job 3. Cell (2, 3) is crossed out to prevent double-booking Job 3.',
    },
    {
      step: 4,
      title: 'Assignment 4: Row 2 now has only ONE zero at Cell (2, 2)',
      badge: 'All 4 Assigned (Z* = ₹46)',
      badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-800',
      description: 'Box Cell (2, 2) [0]. All 4 workers and 4 jobs are perfectly matched with zero conflicts!',
      matrix: [
        ['(X) ❌', '5', '[0] ⭐ (₹12)', '9'],
        ['1', '[0] ⭐ (₹12)', '(X) ❌', '5'],
        ['2', '1', '2', '[0] ⭐ (₹12)'],
        ['[0] ⭐ (₹11)', '1', '1', '2'],
      ],
      annotations: 'Complete 1-to-1 bijection achieved! Total Certified Minimum Spend Z* = ₹46.',
    },
  ];

  const currentStepObj = stepsData[allocStep];

  // Case Studies
  const caseStudies = [
    {
      title: '1. Foundry Independent Allocation (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Executed the 4-step row/col scan on Barrackpore casting personnel. Crossing out Cell (2, 3) prevented double-booking Job 3, locking in minimal spend of ₹46.',
      lesson: 'The cross-out rule strictly prevents catastrophic machine double-booking.',
    },
    {
      title: '2. Cold-Chain Vaccine Dispatch Allocation (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Assigned 4 refrigerated vans in Kolkata, systematically boxing single zeros and crossing out duplicate clinic runs to ensure 100% emergency medical coverage.',
      lesson: 'Sequential scanning guarantees every hospital destination receives exactly one van.',
    },
    {
      title: '3. Supermarket FMCG Multiple Optima Discovery (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Encountered arbitrary branching in Ichapur and discovered 2 alternative optimal pairings with identical minimal wage cost (₹35), choosing the route with lowest traffic delay.',
      lesson: 'Multiple optima provide managerial flexibility to optimize secondary criteria (like travel comfort).',
    },
    {
      title: '4. Educational Press Tender Compliance Audit (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Audited the 4 independent zeros [0] in Jadavpur, verifying that no two boxed zeros shared any row or column, passing university fiduciary compliance audits.',
      lesson: 'Independent zero sets provide airtight mathematical proof of bijection integrity.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes zeroGlow {
          0%, 100% { border-color: rgba(16, 185, 129, 0.3); }
          50% { border-color: rgba(16, 185, 129, 0.8); }
        }
        .glow-zero {
          animation: zeroGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
              Segment 3 • Module 003_001 • Topic 12
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
              Step 5 of Hungarian Method • Box [0] & Cross-Out (X) Protocol
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Selecting Independent Zeros
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A precise procedural walkthrough of <span className="text-emerald-400 font-semibold">Step 5 (Independent Zero Allocation)</span>: executing row and column scans, enclosing single zeros in <span className="text-emerald-400 font-mono font-bold">[0]</span>, crossing out conflicting zeros <span className="text-rose-400 font-mono font-bold">(X)</span>, handling arbitrary branching for <span className="text-amber-400 font-semibold">Alternative Optima</span>, and calculating the final cost in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'allocation-protocol', label: '1. Allocation Protocol' },
              { id: 'interactive-allocator', label: '2. Interactive Allocation Stepper' },
              { id: 'solution-manifest', label: '3. Final Assignment Manifest' },
              { id: 'svg-protocol', label: '4. Selection Protocol SVG' },
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
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-900/40'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
                )}
              &gt;
                {item.label}
              </button>
            ))}
          </div>
        </header>

        {/* SECTION 1: Allocation Protocol */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                01
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                The Box [0] & Cross-Out (X) Rules
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-2">
                <span className="text-emerald-300 font-bold">1. Row Scanning Rule</span>
                <p className="text-slate-300">
                  Scan rows from 1 to n. If a row contains <span className="text-amber-300 font-bold">EXACTLY ONE ZERO</span>, enclose it in a box <span className="font-mono text-emerald-400 font-bold">[0]</span> and cross out <span className="font-mono text-rose-400 font-bold">(X)</span> all other zeros in that <strong>SAME COLUMN</strong>.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-2">
                <span className="text-cyan-300 font-bold">2. Column Scanning Rule</span>
                <p className="text-slate-300">
                  Scan columns from 1 to n. If a column contains <span className="text-amber-300 font-bold">EXACTLY ONE ZERO</span>, enclose it in a box <span className="font-mono text-emerald-400 font-bold">[0]</span> and cross out <span className="font-mono text-rose-400 font-bold">(X)</span> all other zeros in that <strong>SAME ROW</strong>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Interactive Allocation Stepper */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-zero">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                  02
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Interactive Zero Allocation Stepper
                </h2>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[0, 1, 2, 3, 4].map((idx) => (
                  <button
                    key={idx}
                    onClick={() => setAllocStep(idx)}
                    className={clsx(
                      'px-2.5 py-1 rounded text-xs font-semibold transition-all border',
                      allocStep === idx
                        ? 'bg-emerald-600 text-white border-emerald-400 shadow-md'
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                    )}
                  &gt;
                    Step {idx}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-white">{currentStepObj.title}</h3>
                <span className="text-xs text-slate-400">{currentStepObj.description}</span>
              </div>
              <span className={clsx('px-3 py-1 rounded-full text-xs font-mono font-bold border', currentStepObj.badgeColor)}>
                {currentStepObj.badge}
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
                  {workerNames.map((wName, rIdx) => (
                    <tr key={rIdx}>
                      <td className="p-2 text-left font-medium text-slate-200 font-sans">{wName}</td>
                      {currentStepObj.matrix[rIdx].map((cellText, cIdx) => (
                        <td key={cIdx} className="p-2">
                          <div
                            className={clsx(
                              'p-2.5 rounded-lg font-bold transition-all border flex items-center justify-center',
                              cellText.includes('[0]')
                                ? 'bg-emerald-950 text-emerald-300 border-emerald-500 shadow-md shadow-emerald-950/60 scale-105 animate-pulse'
                                : cellText.includes('(X)')
                                ? 'bg-rose-950/80 text-rose-400 border-rose-800 line-through opacity-80'
                                : cellText === '0'
                                ? 'bg-slate-900 text-emerald-400 border-slate-700'
                                : 'bg-slate-900 text-slate-400 border-slate-800'
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
              <span className="text-amber-300 font-semibold font-mono">⚡ Action Log:</span>
              <span className="text-slate-200">{currentStepObj.annotations}</span>
            </div>

            {/* Next/Prev Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setAllocStep((prev) => (prev > 0 ? prev - 1 : 4))}
                className="px-3.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 text-xs font-semibold"
              >
                ◀ Previous Scan
              </button>
              <button
                onClick={() => setAllocStep((prev) => (prev < 4 ? prev + 1 : 0))}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-600 text-white border border-emerald-500 hover:bg-emerald-500 text-xs font-semibold"
              >
                Next Scan ▶
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 3: Final Assignment Manifest */}
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
                Optimal Assignment Manifest (Z* = ₹46)
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
                      CERTIFIED MINIMUM TOTAL COST (Z*):
                    </td>
                    <td className="p-3 text-emerald-400 text-base">₹46</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 4: Selection Protocol SVG */}
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
                Box [0] & Cross-Out (X) Protocol Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 200"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* 3 Step Protocol */}
                <rect x="40" y="40" width="200" height="120" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="140" y="70" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">1. Find 1-Zero Row/Col</text>
                <text x="140" y="100" fill="#ffffff" fontSize="14" fontFamily="monospace" fontWeight="bold" textAnchor="middle">[ 0 ] ⭐</text>
                <text x="140" y="130" fill="#cbd5e1" fontSize="10" textAnchor="middle">Make Assignment xᵢⱼ = 1</text>

                <rect x="270" y="40" width="200" height="120" rx="8" fill="#4c0519" stroke="#f43f5e" strokeWidth="2" />
                <text x="370" y="70" fill="#f43f5e" fontSize="12" fontWeight="bold" textAnchor="middle">2. Cross-Out (X)</text>
                <text x="370" y="100" fill="#fecdd3" fontSize="14" fontFamily="monospace" fontWeight="bold" textAnchor="middle">( X ) ❌</text>
                <text x="370" y="130" fill="#fecdd3" fontSize="10" textAnchor="middle">Cross conflicting row/col zeros</text>

                <rect x="500" y="40" width="200" height="120" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="600" y="70" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">3. Repeat Until n Boxed</text>
                <text x="600" y="100" fill="#ffffff" fontSize="14" fontFamily="monospace" fontWeight="bold" textAnchor="middle">Count([0]) = n</text>
                <text x="600" y="130" fill="#a7f3d0" fontSize="10" textAnchor="middle">Certified 1-to-1 Bijection</text>
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
                Bengal Operations Research Zero Selection Case Studies
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
                  <p className="text-emerald-300 font-semibold">💡 <strong>Operations Takeaway:</strong> {cs.lesson}</p>
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
                  trap: 'Forgetting to Cross Out (X) Conflicting Zeros in the Same Column/Row',
                  fix: 'Immediately cross out all other zeros in that column or row to prevent worker double-booking.',
                },
                {
                  trap: 'Summing Zeros (0 + 0 + 0 = 0) as the Final Cost',
                  fix: 'Always pull the cost entries from the INITIAL matrix in Indian Rupees (₹) to compute Z*.',
                },
                {
                  trap: 'Boxing More Than One Zero in Any Row or Column',
                  fix: 'Each row and column must contain EXACTLY ONE boxed zero [0].',
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
                  Think of the Box [0] and Cross-Out (X) protocol as a game of Sudoku: placing a number in a cell immediately eliminates that number from that entire row and column!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully that starting with rows that have only ONE zero eliminates ambiguity, forcing subsequent rows to simplify down to single zeros as well!
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
                Student Revision Checklist (Topic 12)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Scanned rows with 1 zero: boxed [0] and crossed out (X) column zeros',
                'Scanned columns with 1 zero: boxed [0] and crossed out (X) row zeros',
                'Handled arbitrary branching for alternative optimal solutions',
                'Verified that exactly n independent zeros [0] are boxed',
                'Verified that no row or column contains more than one boxed zero',
                'Summed original cost entries in Indian Rupees (₹) to compute final Z*',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: Selecting Independent Zeros is the grand finale of the Hungarian Method! Always start with rows containing only ONE zero. Box that zero [0] and immediately cross out (X) all other zeros in that column. Once all n workers have their boxed zeros, return to your original cost matrix to state your final minimum cost in Indian Rupees (₹). In our next topic, we will synthesize everything to formally determine the optimal assignment schedule!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Selecting Independent Zeros FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Selecting Independent Zeros (Hungarian Method)"
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
