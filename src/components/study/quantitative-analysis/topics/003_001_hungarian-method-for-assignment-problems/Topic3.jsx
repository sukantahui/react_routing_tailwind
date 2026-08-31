// src/components/study/quantitative-analysis/topics/003_001_hungarian-method-for-assignment-problems/Topic3.jsx
// React 19 Function-based Component
// Module: 003_001_hungarian-method-for-assignment-problems
// Topic 3: Cost matrix

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic3_files/topic3_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic3_files/topic3_note.txt?raw';

const Topic3 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);

  // Transformation Stage: 0 (Raw), 1 (Row Reduced), 2 (Column Reduced / Final Opportunity Cost)
  const [stage, setStage] = useState(0);
  const [isProhibited, setIsProhibited] = useState(false); // Toggle cell (0, 2) as Big-M

  const rawMatrix = [
    [12, 10, isProhibited ? 999 : 15],
    [8, 14, 11],
    [16, 9, 13],
  ];

  const workerLabels = ['Debangshu (Barrackpore)', 'Susmita (Ichapur)', 'Mamata (Kolkata)'];
  const taskLabels = ['Furnace Job 1', 'Clinic Task 2', 'Press Case 3'];

  // Row reductions
  const rowMins = rawMatrix.map((row) => Math.min(...row));
  const rowReduced = rawMatrix.map((row, rIdx) =>
    row.map((val) => (val >= 999 ? 999 : val - rowMins[rIdx]))
  );

  // Col reductions on rowReduced
  const colMins = [0, 1, 2].map((cIdx) =>
    Math.min(...rowReduced.map((row) => row[cIdx]))
  );
  const fullyReduced = rowReduced.map((row) =>
    row.map((val, cIdx) => (val >= 999 ? 999 : val - colMins[cIdx]))
  );

  const displayedMatrix =
    stage === 0 ? rawMatrix : stage === 1 ? rowReduced : fullyReduced;

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

  // Case Studies
  const caseStudies = [
    {
      title: '1. Foundry Prohibited Route Handling (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Assigned Big-M (₹99,999) to cell (1, 3) because Supervisor 1 lacked induction furnace certification. The Hungarian solver successfully rerouted assignments to certified personnel with zero safety violations.',
      lesson: 'Big-M penalty barriers prevent dangerous or illegal workforce assignments.',
    },
    {
      title: '2. Cold-Chain Vaccine Transit Time Matrix (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Modeled an asymmetric 4x4 matrix representing transit minutes across congested Kolkata traffic sectors, minimizing total exposure time for sensitive vaccine vials.',
      lesson: 'Asymmetric cost matrices accurately model real-world directional traffic congestion.',
    },
    {
      title: '3. Supermarket FMCG Store Manager Wage Matrix (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Structured a 4x4 wage and relocation cost matrix in Indian Rupees (₹), optimizing store manager assignments to save ₹18,500 in monthly administrative overhead.',
      lesson: 'Cost matrices convert disparate operational variables into standardized financial metrics.',
    },
    {
      title: '4. Educational Press Misprint Penalty Matrix (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Used historical misprint rates per printing machine as penalty cost entries c_ij, minimizing total textbook defects across Calcutta University print shops.',
      lesson: 'Effectiveness matrices optimize quality parameters as effectively as monetary costs.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes costGlow {
          0%, 100% { border-color: rgba(245, 158, 11, 0.3); }
          50% { border-color: rgba(245, 158, 11, 0.8); }
        }
        .glow-cost {
          animation: costGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-amber-950/80 text-amber-400 border border-amber-800/60">
              Segment 3 • Module 003_001 • Topic 3
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-amber-950/80 text-amber-400 border border-amber-800/60">
              Effectiveness Matrix & Matrix Reductions
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
            The Cost Matrix
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            Mastering the <span className="text-amber-400 font-semibold">Effectiveness Matrix</span> (<span className="text-cyan-400 font-mono">C = [cᵢⱼ]</span>): understanding monetary rates (<span className="text-emerald-400 font-bold">₹</span>), labor hours, distance, defect penalties, <span className="text-rose-400 font-semibold">Big-M Prohibited Cells</span>, and proving why <span className="text-sky-400 font-semibold">Matrix Reductions</span> preserve optimal assignments.
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'matrix-anatomy', label: '1. Matrix Structure' },
              { id: 'interactive-transformer', label: '2. Matrix Reduction Transformer' },
              { id: 'invariance-theorem', label: '3. Matrix Invariance Theorem' },
              { id: 'svg-pipeline', label: '4. Reduction Pipeline SVG' },
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
                    ? 'bg-amber-600 text-white border-amber-500 shadow-md shadow-amber-900/40'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </header>

        {/* SECTION 1: Matrix Structure */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 font-bold text-sm">
                01
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Cost Matrix Operational Dimensions
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-emerald-300 font-bold">1. Financial Expense (₹)</span>
                <p className="text-slate-300">Wages, shipping rates, and tool depreciation per assignment pairing.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-bold">2. Time & Distance (Hours / Km)</span>
                <p className="text-slate-300">Machining durations, patient transit times, or vehicle delivery kilometers.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-rose-300 font-bold">3. Big-M Prohibited Cells</span>
                <p className="text-slate-300">cᵢⱼ = M — Prohibits unqualified personnel or physically impossible pairings.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Matrix Reduction Transformer */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-cost">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 font-bold text-sm">
                  02
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Interactive Cost Matrix Reduction Transformer
                </h2>
              </div>
              <div className="flex items-center gap-1.5">
                {[
                  { id: 0, label: '1. Raw Matrix (C)' },
                  { id: 1, label: '2. Row Reduced (C - u)' },
                  { id: 2, label: '3. Column Reduced (Final C\')' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setStage(item.id)}
                    className={clsx(
                      'px-3 py-1 rounded text-xs font-semibold transition-all border',
                      stage === item.id
                        ? 'bg-amber-600 text-white border-amber-400 shadow-md'
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Big-M Prohibition Switcher */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-slate-300 font-medium">Toggle Prohibited Pairing (Big-M):</span>
                <span className="text-slate-400 text-xs">Debangshu ➔ Press Case 3</span>
              </div>
              <button
                onClick={() => setIsProhibited(!isProhibited)}
                className={clsx(
                  'px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all border',
                  isProhibited
                    ? 'bg-rose-950 text-rose-300 border-rose-600 shadow-md shadow-rose-950/60'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                )}
              >
                {isProhibited ? '⛔ Cell (1, 3) = M (PROHIBITED)' : '✓ Cell (1, 3) = Normal (₹15)'}
              </button>
            </div>

            {/* Matrix Display */}
            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-center border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2.5 text-left font-semibold text-slate-300">Assignees \ Tasks</th>
                    {taskLabels.map((t, idx) => (
                      <th key={idx} className="p-2.5 font-semibold text-cyan-300">
                        {t}
                      </th>
                    ))}
                    {stage >= 1 && <th className="p-2.5 font-semibold text-amber-300">Row Min Subtracted</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {workerLabels.map((wName, rIdx) => (
                    <tr key={rIdx}>
                      <td className="p-2.5 text-left font-medium text-slate-200 font-sans">{wName}</td>
                      {displayedMatrix[rIdx].map((val, cIdx) => (
                        <td key={cIdx} className="p-2">
                          <div
                            className={clsx(
                              'p-2.5 rounded-lg font-bold transition-all border flex flex-col items-center justify-center',
                              val === 0
                                ? 'bg-emerald-950 text-emerald-300 border-emerald-500 shadow-md shadow-emerald-950/40 animate-pulse'
                                : val >= 999
                                ? 'bg-rose-950 text-rose-300 border-rose-700'
                                : 'bg-slate-900 text-slate-300 border-slate-800'
                            )}
                          >
                            {val === 0 && (
                              <span className="text-[9px] font-extrabold bg-emerald-500 text-slate-950 px-1 rounded mb-0.5">
                                ZERO CANDIDATE ⭐
                              </span>
                            )}
                            {val >= 999 ? 'M (∞)' : `₹${val}`}
                          </div>
                        </td>
                      ))}
                      {stage >= 1 && (
                        <td className="p-2 text-amber-300 font-bold">− ₹{rowMins[rIdx]}</td>
                      )}
                    </tr>
                  ))}
                  {stage === 2 && (
                    <tr className="bg-slate-900/60 text-slate-300 font-mono text-xs">
                      <td className="p-2.5 text-left font-semibold text-amber-300 font-sans">Col Min Subtracted</td>
                      {colMins.map((cMin, cIdx) => (
                        <td key={cIdx} className="p-2 font-bold text-amber-300">
                          − ₹{cMin}
                        </td>
                      ))}
                      <td className="p-2 text-emerald-400 font-bold">
                        ∑ ₹{rowMins.reduce((a, b) => a + b, 0) + colMins.reduce((a, b) => a + b, 0)} Total Shift
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 text-xs sm:text-sm text-slate-300">
              {stage === 0 && '⚡ Stage 1: Raw initial effectiveness matrix showing direct pairing costs in Indian Rupees (₹).'}
              {stage === 1 && '⚡ Stage 2: Row Reduction completed. Every row now contains at least one zero.'}
              {stage === 2 && '⚡ Stage 3: Column Reduction completed. Matrix is fully reduced; green zero cells identify optimal pairing candidates!'}
            </div>
          </div>
        </section>

        {/* SECTION 3: Matrix Invariance Theorem */}
        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          data-index="2"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 font-bold text-sm">
                03
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Matrix Invariance Theorem & Proof
              </h2>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2 font-mono text-xs sm:text-sm">
              <span className="text-indigo-300 font-bold font-sans">Linear Transformation Proof:</span>
              <p className="text-slate-300">
                Let cᵢⱼ' = cᵢⱼ − uᵢ − vⱼ. &nbsp; Then the new total cost Z' is:
              </p>
              <p className="text-white">
                Z' = ∑∑ (cᵢⱼ − uᵢ − vⱼ) · xᵢⱼ = ∑∑ cᵢⱼ xᵢⱼ − ∑ uᵢ(1) − ∑ vⱼ(1) = Z − (Constant Shift)
              </p>
              <p className="text-emerald-300 pt-1 font-sans">
                Because the constant shift is identical for all valid permutations, minimizing Z' mathematically guarantees minimizing the original cost Z!
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Reduction Pipeline SVG */}
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
                Cost Matrix Reduction Pipeline
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 220"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Step 1 */}
                <rect x="40" y="40" width="180" height="130" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="130" y="70" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle">1. Raw Cost Matrix C</text>
                <text x="130" y="95" fill="#cbd5e1" fontSize="10" textAnchor="middle">Original Rates in ₹</text>
                <text x="130" y="115" fill="#fb7185" fontSize="10" textAnchor="middle">Big-M for Prohibited</text>
                <text x="130" y="140" fill="#fde047" fontSize="9" textAnchor="middle">Non-negative entries</text>

                {/* Arrow 1 */}
                <line x1="225" y1="105" x2="275" y2="105" stroke="#94a3b8" strokeWidth="2" />
                <polygon points="275,105 265,100 265,110" fill="#94a3b8" />

                {/* Step 2 */}
                <rect x="280" y="40" width="180" height="130" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="370" y="70" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">2. Row Reduction</text>
                <text x="370" y="95" fill="#cbd5e1" fontSize="10" textAnchor="middle">cᵢⱼ' = cᵢⱼ − min(Row i)</text>
                <text x="370" y="115" fill="#a7f3d0" fontSize="10" textAnchor="middle">≥ 1 zero per row</text>
                <text x="370" y="140" fill="#38bdf8" fontSize="9" textAnchor="middle">Dual Shift: uᵢ = min</text>

                {/* Arrow 2 */}
                <line x1="465" y1="105" x2="515" y2="105" stroke="#94a3b8" strokeWidth="2" />
                <polygon points="515,105 505,100 505,110" fill="#94a3b8" />

                {/* Step 3 */}
                <rect x="520" y="40" width="180" height="130" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="610" y="70" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">3. Column Reduction</text>
                <text x="610" y="95" fill="#cbd5e1" fontSize="10" textAnchor="middle">cᵢⱼ'' = cᵢⱼ' − min(Col j)</text>
                <text x="610" y="115" fill="#a7f3d0" fontSize="10" textAnchor="middle">≥ 1 zero per col</text>
                <text x="610" y="140" fill="#ffffff" fontSize="9" textAnchor="middle">Reduced Opportunity Matrix</text>
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
                Bengal Operations Research Cost Matrix Case Studies
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
                  <p className="text-amber-300 font-semibold">💡 <strong>Operations Takeaway:</strong> {cs.lesson}</p>
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
                  trap: 'Dividing Rows or Columns by Constants',
                  fix: 'Never divide or multiply matrix rows; only linear subtractions/additions preserve optimal permutations.',
                },
                {
                  trap: 'Forgetting to Calculate Final Cost from the ORIGINAL Matrix',
                  fix: 'Once optimal zero positions are selected, always pull unit rates from the ORIGINAL cost matrix to compute Z*.',
                },
                {
                  trap: 'Treating Big-M as a Regular Number During Subtractions',
                  fix: 'Big-M is a fixed barrier infinity (M - k = M); leave M intact during row and column reductions.',
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
                  Think about what a "0" in the reduced matrix means: it represents a pairing that achieves the absolute lowest baseline expense for that worker and task!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully that row reduction guarantees every row has a zero, and column reduction guarantees every column has a zero.
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
                Student Revision Checklist (Topic 3)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Defined Cost / Effectiveness Matrix C = [c_ij] in Indian Rupees (₹)',
                'Identified symmetric vs asymmetric matrix structures',
                'Handled prohibited assignments using Big-M (c_ij = M)',
                'Mastered Matrix Invariance Theorem: row/col scalar shifts preserve optimal pairings',
                'Executed row reduction: c_ij\' = c_ij - min(Row i)',
                'Executed column reduction: c_ij\'\' = c_ij\' - min(Col j)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: the Cost Matrix is where mathematics meets the real world! When you subtract row and column minimums, you are stripping away baseline fixed expenses to reveal the pure opportunity cost landscape. Remember: never calculate your final answer from the reduced matrix—always return to the original cost matrix with your Indian Rupee (₹) rates to calculate the final minimum cost Z*!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="The Cost Matrix FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="The Cost Matrix (Hungarian Method)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic4_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic3;
