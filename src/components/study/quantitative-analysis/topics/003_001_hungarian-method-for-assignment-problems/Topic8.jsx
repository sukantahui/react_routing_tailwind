// src/components/study/quantitative-analysis/topics/003_001_hungarian-method-for-assignment-problems/Topic8.jsx
// React 19 Function-based Component
// Module: 003_001_hungarian-method-for-assignment-problems
// Topic 8: Row reduction

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic8_files/topic8_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic8_files/topic8_note.txt?raw';

const Topic8 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [reducedRowsCount, setReducedRowsCount] = useState(0); // 0 (None), 1 (Row 1), 2 (Row 1+2), 3 (Row 1+2+3), 4 (All 4)

  const rawMatrix = [
    [10, 15, 12, 18], // Debangshu (min = 10)
    [13, 12, 14, 16], // Susmita (min = 12)
    [15, 14, 17, 12], // Mamata (min = 12)
    [11, 13, 15, 14], // Mahima (min = 11)
  ];

  const rowMins = [10, 12, 12, 11];
  const workerNames = ['Debangshu (Barrackpore)', 'Susmita (Ichapur)', 'Mamata (Kolkata)', 'Mahima (Jadavpur)'];
  const taskNames = ['Furnace Job 1', 'Clinic Task 2', 'Store Case 3', 'Press Case 4'];

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

  // Compute current display matrix based on how many rows are reduced
  const currentMatrix = rawMatrix.map((row, rIdx) => {
    if (rIdx < reducedRowsCount) {
      const minVal = rowMins[rIdx];
      return row.map((val) => val - minVal);
    }
    return row;
  });

  // Sum of dual row potentials subtracted so far
  const totalRowShift = rowMins
    .slice(0, reducedRowsCount)
    .reduce((a, b) => a + b, 0);

  // Case Studies
  const caseStudies = [
    {
      title: '1. Foundry Supervisor Row Reduction (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Subtracted row minimums [10, 12, 12, 11] from a 4x4 casting matrix in Barrackpore, creating 4 zero candidates and establishing ₹45 of baseline dual potential shift.',
      lesson: 'Row reduction strips away fixed baseline expenses to reveal pure comparative advantages.',
    },
    {
      title: '2. Cold-Chain Vaccine Transit Hours Row Shift (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Subtracted minimum transit durations [15m, 20m, 12m] across 3 Kolkata medical logistics routes, creating initial zero-exposure paths for sensitive vaccine vials.',
      lesson: 'Row reduction identifies each transport asset’s fastest possible route.',
    },
    {
      title: '3. Supermarket FMCG Store Manager Wage Matrix (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Reduced a 4x4 manager compensation matrix in Ichapur, establishing baseline equal opportunity costs across 4 retail branches in North 24 Parganas.',
      lesson: 'Horizontal scalar subtractions normalize cross-branch wage variances.',
    },
    {
      title: '4. Educational Press Binding Run Audit (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Audited row reduction on 3 printing presses in Jadavpur, verifying that subtracting row minimums [₹10, ₹10, ₹11] created zeros in every column directly!',
      lesson: 'Sometimes row reduction alone creates all necessary zeros across all columns.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes rowGlow {
          0%, 100% { border-color: rgba(56, 189, 248, 0.3); }
          50% { border-color: rgba(56, 189, 248, 0.8); }
        }
        .glow-row {
          animation: rowGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Segment 3 • Module 003_001 • Topic 8
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Step 2 of Hungarian Method • Dual Potential uᵢ
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Row Reduction
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A microscopic study of <span className="text-sky-400 font-semibold">Row Reduction</span>: identifying row minimums (<span className="text-amber-400 font-mono">uᵢ = min cᵢⱼ</span>), executing horizontal scalar subtractions (<span className="text-cyan-400 font-mono">cᵢⱼ′ = cᵢⱼ − uᵢ</span>), guaranteeing at least one <span className="text-emerald-400 font-semibold">zero candidate</span> per row, and tracking the <span className="text-emerald-400 font-mono">Dual Potential Shift (∑ uᵢ)</span> in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'reduction-math', label: '1. Mathematical Definition' },
              { id: 'interactive-stepper', label: '2. Interactive Row Stepper' },
              { id: 'dual-interpretation', label: '3. Dual Potential Shift uᵢ' },
              { id: 'svg-operation', label: '4. Row Reduction SVG' },
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

        {/* SECTION 1: Mathematical Definition */}
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
                Row Reduction Mathematical Mechanics
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Row Reduction is executed by finding the minimum value in each row and subtracting it from every entry across that row:
            </p>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2 font-mono text-xs sm:text-sm">
              <div className="text-sky-300 font-bold">
                1. Identify Row Minimum: &nbsp; uᵢ = min&#123; cᵢ₁, cᵢ₂, ..., cᵢₙ &#125;
              </div>
              <div className="text-white">
                2. Subtract Across Row: &nbsp; cᵢⱼ′ = cᵢⱼ − uᵢ &nbsp; (for all j = 1, 2, ..., n)
              </div>
              <div className="text-emerald-300 pt-1">
                3. Non-Negativity Property: &nbsp; cᵢⱼ′ ≥ 0 &nbsp; (with at least one cell having cᵢₖ′ = 0)
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Interactive Row Stepper */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-row">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                  02
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Interactive Row Reduction Stepper
                </h2>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[0, 1, 2, 3, 4].map((cnt) => (
                  <button
                    key={cnt}
                    onClick={() => setReducedRowsCount(cnt)}
                    className={clsx(
                      'px-2.5 py-1 rounded text-xs font-semibold transition-all border',
                      reducedRowsCount === cnt
                        ? 'bg-sky-600 text-white border-sky-400 shadow-md'
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                    )}
                  >
                    {cnt === 0 ? 'Raw Matrix' : `Reduce Row ${cnt}`}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Step through the reduction row-by-row. Notice how the row minimum is subtracted horizontally, creating at least one green zero in every reduced row!
            </p>

            {/* Matrix View */}
            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-center border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2 text-left font-semibold text-slate-300 font-sans">Technicians \ Tasks</th>
                    {taskNames.map((t, idx) => (
                      <th key={idx} className="p-2 font-semibold text-cyan-300 font-sans">
                        {t}
                      </th>
                    ))}
                    <th className="p-2 font-semibold text-amber-300 font-sans">Row Min (uᵢ)</th>
                    <th className="p-2 font-semibold text-sky-300 font-sans">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {workerNames.map((wName, rIdx) => {
                    const isReduced = rIdx < reducedRowsCount;
                    const minVal = rowMins[rIdx];
                    return (
                      <tr key={rIdx} className={isReduced ? 'bg-sky-950/20' : ''}>
                        <td className="p-2 text-left font-medium text-slate-200 font-sans">{wName}</td>
                        {currentMatrix[rIdx].map((val, cIdx) => (
                          <td key={cIdx} className="p-2">
                            <div
                              className={clsx(
                                'p-2.5 rounded-lg font-bold transition-all border flex items-center justify-center',
                                val === 0
                                  ? 'bg-emerald-950 text-emerald-300 border-emerald-500 shadow-md shadow-emerald-950/60 animate-pulse'
                                  : isReduced
                                  ? 'bg-slate-900 text-sky-200 border-sky-800'
                                  : 'bg-slate-900 text-slate-300 border-slate-800'
                              )}
                            >
                              {val === 0 ? '0 ⭐' : `₹${val}`}
                            </div>
                          </td>
                        ))}
                        <td className="p-2 text-amber-300 font-bold">
                          u_{rIdx + 1} = ₹{minVal}
                        </td>
                        <td className="p-2 text-xs font-sans">
                          {isReduced ? (
                            <span className="text-emerald-400 font-bold">✓ Reduced (−₹{minVal})</span>
                          ) : (
                            <span className="text-slate-500">Pending</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Status Footer */}
            <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs sm:text-sm">
              <span className="text-slate-300">
                Progress: <strong className="text-sky-300">{reducedRowsCount} of 4 Rows Reduced</strong>
              </span>
              <div className="font-mono text-emerald-400 font-bold">
                Total Dual Shift: ∑ uᵢ = ₹{totalRowShift}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Dual Potential Shift uᵢ */}
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
                Dual Potential Interpretation of uᵢ
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-amber-300 font-bold">Initial Dual Feasibility Guarantee</span>
                <p className="text-slate-300">
                  Because uᵢ = min(cᵢⱼ) ≤ cᵢⱼ, setting vⱼ = 0 guarantees that uᵢ + vⱼ ≤ cᵢⱼ is satisfied for all entries.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-emerald-300 font-bold">Dual Objective Lower Bound</span>
                <p className="text-slate-300">
                  Sum of row minimums (10 + 12 + 12 + 11 = ₹45) establishes the foundational lower bound for the total minimal cost Z*.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Row Reduction SVG */}
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
                Horizontal Row Reduction Operation
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 180"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Before Row */}
                <rect x="40" y="50" width="260" height="80" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="170" y="80" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">Row 1: [ 10, 15, 12, 18 ]</text>
                <text x="170" y="105" fill="#fde047" fontSize="11" textAnchor="middle">min = 10 (u₁ = ₹10)</text>

                {/* Operation Arrow */}
                <line x1="315" y1="90" x2="415" y2="90" stroke="#94a3b8" strokeWidth="3" />
                <polygon points="415,90 405,85 405,95" fill="#94a3b8" />
                <text x="365" y="75" fill="#a7f3d0" fontSize="10" fontWeight="bold" textAnchor="middle">− u₁ (10)</text>

                {/* After Row */}
                <rect x="430" y="50" width="270" height="80" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="565" y="80" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">Reduced: [ 0, 5, 2, 8 ]</text>
                <text x="565" y="105" fill="#ffffff" fontSize="11" textAnchor="middle">Cell (1, 1) = 0 ⭐</text>
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
                Bengal Operations Research Row Reduction Case Studies
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
                  trap: 'Subtracting Vertically Across Columns Instead of Horizontally',
                  fix: 'Row reduction is strictly horizontal: find the minimum of Row i and subtract it across Row i.',
                },
                {
                  trap: 'Subtracting a Value Larger than the Row Minimum',
                  fix: 'Never subtract a number larger than the minimum; all reduced entries must remain non-negative (≥ 0).',
                },
                {
                  trap: 'Picking Big-M as the Row Minimum',
                  fix: 'Ignore Big-M when identifying the row minimum; M is infinity and M − u_i remains M.',
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
                  Think of Row Reduction as giving each worker a customized baseline: by subtracting their best performance rate, you measure how much extra it costs to assign them to their second or third choice task!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully that after Row Reduction, every single row is mathematically guaranteed to contain at least one zero.
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
                Student Revision Checklist (Topic 8)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Identified row minimum u_i = min(Row i) for each row i = 1..n',
                'Subtracted u_i from every entry in row i',
                'Verified that all reduced entries are non-negative (c_ij\' ≥ 0)',
                'Verified that every row contains at least one zero candidate',
                'Preserved Big-M infinity barriers properly (M - u_i = M)',
                'Tracked total dual row shift ∑ u_i in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: Row Reduction is your first tactical strike in the Hungarian Method! By finding the minimum of each row and subtracting it across that row, you create your first zero-cost options. In our next topic, we will execute Column Reduction to ensure every column has its own zero!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Row Reduction FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Row Reduction (Hungarian Method)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic9_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic8;
