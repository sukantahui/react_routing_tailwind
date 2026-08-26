// src/components/study/quantitative-analysis/topics/003_001_hungarian-method-for-assignment-problems/Topic9.jsx
// React 19 Function-based Component
// Module: 003_001_hungarian-method-for-assignment-problems
// Topic 9: Column reduction

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic9_files/topic9_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic9_files/topic9_note.txt?raw';

const Topic9 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [reducedColsCount, setReducedColsCount] = useState(0); // 0 (None), 1 (Col 1), 2 (Col 1+2), 3 (Col 1+2+3), 4 (All 4)

  const rowReducedMatrix = [
    [0, 5, 2, 8],
    [1, 0, 2, 4],
    [3, 2, 5, 0],
    [0, 2, 4, 3],
  ];

  const colMins = [0, 0, 2, 0];
  const workerNames = ['Debangshu (Barrackpore)', 'Susmita (Ichapur)', 'Mamata (Kolkata)', 'Mahima (Jadavpur)'];
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

  // Compute current display matrix based on how many columns are reduced
  const currentMatrix = rowReducedMatrix.map((row) =>
    row.map((val, cIdx) => {
      if (cIdx < reducedColsCount) {
        return val - colMins[cIdx];
      }
      return val;
    })
  );

  // Sum of dual col potentials subtracted so far
  const totalColShift = colMins
    .slice(0, reducedColsCount)
    .reduce((a, b) => a + b, 0);

  // Case Studies
  const caseStudies = [
    {
      title: '1. Foundry Maintenance Repair Column Reduction (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Found that Column 3 in the row-reduced matrix had entries [2, 2, 5, 4] with min v_3 = ₹2. Subtracted ₹2 down Column 3, creating 2 new zero candidates at (1, 3) and (2, 3).',
      lesson: 'Column reduction creates task-specific opportunity zeros without disturbing existing row zeros.',
    },
    {
      title: '2. Cold-Chain Vaccine Transit Time Column Reduction (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Subtracted 5 minutes down Clinic Column 2 across 4 Kolkata hospital clinics, establishing zero-cost options for emergency vaccine dispatchers.',
      lesson: 'Vertical column subtractions identify which tasks carry the highest excess baseline transit time.',
    },
    {
      title: '3. Supermarket FMCG Store Manager Scheduling (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Reduced an asymmetric branch matrix in Ichapur, confirming that Columns 1, 2, and 4 were untouched (v = 0) while Column 3 was reduced by ₹15.',
      lesson: 'Columns with existing zeros require zero extra arithmetic (v_j = 0).',
    },
    {
      title: '4. Educational Press Binding Run Audit (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Audited a 4x4 matrix in Jadavpur where all column minimums were v = [0, 0, 0, 0], verifying that Column Reduction skipped directly to line covering.',
      lesson: 'When row reduction produces zeros in every column, column reduction is an instantaneous no-op.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes colGlow {
          0%, 100% { border-color: rgba(34, 211, 238, 0.3); }
          50% { border-color: rgba(34, 211, 238, 0.8); }
        }
        .glow-col {
          animation: colGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-cyan-950/80 text-cyan-400 border border-cyan-800/60">
              Segment 3 • Module 003_001 • Topic 9
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-cyan-950/80 text-cyan-400 border border-cyan-800/60">
              Step 3 of Hungarian Method • Dual Potential vⱼ
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Column Reduction
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A microscopic examination of <span className="text-cyan-400 font-semibold">Column Reduction</span>: finding column minimums (<span className="text-amber-400 font-mono">vⱼ = min cᵢⱼ′</span>), executing vertical subtractions (<span className="text-sky-400 font-mono">cᵢⱼ″ = cᵢⱼ′ − vⱼ</span>), understanding why columns with existing zeros have <span className="text-emerald-400 font-mono">vⱼ = 0</span>, and completing the <span className="text-emerald-400 font-semibold">Reduced Opportunity Cost Matrix</span>.
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'reduction-math', label: '1. Mathematical Definition' },
              { id: 'interactive-stepper', label: '2. Interactive Column Stepper' },
              { id: 'dual-interpretation', label: '3. Dual Potential Shift vⱼ' },
              { id: 'svg-operation', label: '4. Column Reduction SVG' },
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
              &gt;
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
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-600/20 text-cyan-400 font-bold text-sm">
                01
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Column Reduction Mathematical Mechanics
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Column Reduction operates on the <span className="text-sky-300 font-semibold">Row-Reduced Matrix C′</span> to ensure that every single column also contains at least one zero candidate:
            </p>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2 font-mono text-xs sm:text-sm">
              <div className="text-cyan-300 font-bold">
                1. Identify Column Minimum: &nbsp; vⱼ = min&#123; c₁ⱼ′, c₂ⱼ′, ..., cₙⱼ′ &#125;
              </div>
              <div className="text-white">
                2. Subtract Down Column: &nbsp; cᵢⱼ″ = cᵢⱼ′ − vⱼ &nbsp; (for all i = 1, 2, ..., n)
              </div>
              <div className="text-emerald-300 pt-1">
                3. Zero-Preservation Rule: &nbsp; If column j already has a zero, vⱼ = 0 (column is unchanged).
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Interactive Column Stepper */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-col">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-600/20 text-cyan-400 font-bold text-sm">
                  02
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Interactive Column Reduction Stepper
                </h2>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[0, 1, 2, 3, 4].map((cnt) => (
                  <button
                    key={cnt}
                    onClick={() => setReducedColsCount(cnt)}
                    className={clsx(
                      'px-2.5 py-1 rounded text-xs font-semibold transition-all border',
                      reducedColsCount === cnt
                        ? 'bg-cyan-600 text-white border-cyan-400 shadow-md'
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                    )}
                  &gt;
                    {cnt === 0 ? 'Row-Reduced' : `Reduce Col ${cnt}`}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Watch how Column 3 subtracts <span className="font-mono text-amber-300 font-bold">v₃ = ₹2</span> down all 4 rows, creating 2 brand new zeros at cells (1, 3) and (2, 3)!
            </p>

            {/* Matrix View */}
            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-center border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2 text-left font-semibold text-slate-300 font-sans">Technicians \ Tasks</th>
                    {taskNames.map((t, cIdx) => {
                      const isColReduced = cIdx < reducedColsCount;
                      return (
                        <th
                          key={cIdx}
                          className={clsx(
                            'p-2 font-semibold font-sans transition-all',
                            isColReduced ? 'text-emerald-300 bg-cyan-950/20' : 'text-cyan-300'
                          )}
                        >
                          {t}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {workerNames.map((wName, rIdx) => (
                    <tr key={rIdx}>
                      <td className="p-2 text-left font-medium text-slate-200 font-sans">{wName}</td>
                      {currentMatrix[rIdx].map((val, cIdx) => {
                        const isColReduced = cIdx < reducedColsCount;
                        return (
                          <td key={cIdx} className={clsx('p-2', isColReduced ? 'bg-cyan-950/10' : '')}>
                            <div
                              className={clsx(
                                'p-2.5 rounded-lg font-bold transition-all border flex items-center justify-center',
                                val === 0
                                  ? 'bg-emerald-950 text-emerald-300 border-emerald-500 shadow-md shadow-emerald-950/60 animate-pulse'
                                  : isColReduced
                                  ? 'bg-slate-900 text-cyan-200 border-cyan-800'
                                  : 'bg-slate-900 text-slate-300 border-slate-800'
                              )}
                            >
                              {val === 0 ? '0 ⭐' : `₹${val}`}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                  <tr className="bg-slate-900/60 text-slate-300 font-mono text-xs">
                    <td className="p-2 text-left font-semibold text-amber-300 font-sans">Column Min (vⱼ)</td>
                    {colMins.map((cMin, cIdx) => (
                      <td key={cIdx} className="p-2 font-bold text-amber-300">
                        v_{cIdx + 1} = ₹{cMin}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Status Footer */}
            <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs sm:text-sm">
              <span className="text-slate-300">
                Progress: <strong className="text-cyan-300">{reducedColsCount} of 4 Columns Reduced</strong>
              </span>
              <div className="font-mono text-emerald-400 font-bold">
                Total Dual Column Shift: ∑ vⱼ = ₹{totalColShift} (Total Dual W = ₹{45 + totalColShift})
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Dual Potential Shift vⱼ */}
        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          data-index="2"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 font-bold text-sm">
                03
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Dual Potential Interpretation of vⱼ
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-amber-300 font-bold">Dual Column Price Adjustment</span>
                <p className="text-slate-300">
                  Subtracting vⱼ establishes the dual task valuation, ensuring that uᵢ + vⱼ ≤ cᵢⱼ holds across all cells while driving the duality gap toward zero.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-emerald-300 font-bold">Complete Matrix Opportunity Landscape</span>
                <p className="text-slate-300">
                  After Column Reduction, the opportunity cost landscape is fully revealed: every row has a zero and every column has a zero!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Column Reduction SVG */}
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
                Vertical Column Reduction Operation
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 220"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Before Col */}
                <rect x="60" y="30" width="180" height="160" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="150" y="55" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">Col 3 in C′</text>
                <text x="150" y="80" fill="#cbd5e1" fontSize="11" textAnchor="middle">[ 2 ] (R1)</text>
                <text x="150" y="105" fill="#cbd5e1" fontSize="11" textAnchor="middle">[ 2 ] (R2)</text>
                <text x="150" y="130" fill="#cbd5e1" fontSize="11" textAnchor="middle">[ 5 ] (R3)</text>
                <text x="150" y="155" fill="#cbd5e1" fontSize="11" textAnchor="middle">[ 4 ] (R4)</text>
                <text x="150" y="180" fill="#fde047" fontSize="10" fontWeight="bold" textAnchor="middle">min = 2 (v₃ = ₹2)</text>

                {/* Operation Arrow */}
                <line x1="260" y1="110" x2="360" y2="110" stroke="#94a3b8" strokeWidth="3" />
                <polygon points="360,110 350,105 350,115" fill="#94a3b8" />
                <text x="310" y="95" fill="#a7f3d0" fontSize="10" fontWeight="bold" textAnchor="middle">− v₃ (2)</text>

                {/* After Col */}
                <rect x="380" y="30" width="180" height="160" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="470" y="55" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">Reduced Col 3</text>
                <text x="470" y="80" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">[ 0 ] ⭐ (R1)</text>
                <text x="470" y="105" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">[ 0 ] ⭐ (R2)</text>
                <text x="470" y="130" fill="#cbd5e1" fontSize="11" textAnchor="middle">[ 3 ] (R3)</text>
                <text x="470" y="155" fill="#cbd5e1" fontSize="11" textAnchor="middle">[ 2 ] (R4)</text>
                <text x="470" y="180" fill="#a7f3d0" fontSize="10" textAnchor="middle">2 New Zeros Created!</text>
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
                Bengal Operations Research Column Reduction Case Studies
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
                  <p className="text-cyan-300 font-semibold">💡 <strong>Operations Takeaway:</strong> {cs.lesson}</p>
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
                  trap: 'Performing Column Reduction on the Raw Matrix Instead of the Row-Reduced Matrix',
                  fix: 'Always perform Column Reduction on the ROW-REDUCED matrix C′ (Step 3 follows Step 2).',
                },
                {
                  trap: 'Subtracting a Positive Number from a Column that Already Contains a Zero',
                  fix: 'If a column already has a zero, its minimum is 0 (v_j = 0); subtracting 0 leaves it unchanged.',
                },
                {
                  trap: 'Forgetting to Track Column Shifts v_j for Duality Verification',
                  fix: 'Record all column shifts v_j to verify that the final minimum cost Z* equals ∑ u_i + ∑ v_j + ∑ e.',
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
                  Think of Column Reduction as balancing the scales for the tasks: if a particular job was universally difficult/expensive for all workers, Column Reduction strips away that general penalty!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully that after Step 3, every single row AND every single column contains at least one zero.
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
                Student Revision Checklist (Topic 9)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Identified column minimum v_j = min(Col j) on the row-reduced matrix C\'',
                'Subtracted v_j down column j (if v_j &gt; 0)',
                'Verified that columns with existing zeros have v_j = 0 and remain unchanged',
                'Verified that every row AND every column contains at least one zero',
                'Preserved Big-M infinity barriers properly (M - v_j = M)',
                'Tracked total dual column shift ∑ v_j in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: Column Reduction completes the creation of your opportunity cost matrix! Always remember: you only subtract down columns that lack a zero. If a column already has a zero, its minimum is 0 and you leave it untouched. In our next topic, we will draw horizontal and vertical lines across these zeros to test for global optimality using König's Theorem!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Column Reduction FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Column Reduction (Hungarian Method)"
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
