// src/components/study/quantitative-analysis/topics/003_001_hungarian-method-for-assignment-problems/Topic5.jsx
// React 19 Function-based Component
// Module: 003_001_hungarian-method-for-assignment-problems
// Topic 5: Unbalanced assignment problems

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic5_files/topic5_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic5_files/topic5_note.txt?raw';

const Topic5 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [scenario, setScenario] = useState('rows'); // 'rows' (3x4 -> add dummy row), 'cols' (4x3 -> add dummy col)
  const [showBalanced, setShowBalanced] = useState(false);

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

  // Scenario Data
  // Scenario A: 3 Vans vs 4 Clinics (3x4) -> Add Dummy Row
  const raw3x4 = [
    [12, 10, 15, 22],
    [14, 20, 18, 12],
    [16, 11, 13, 14],
  ];
  const balanced4x4 = [
    [12, 10, 15, 22],
    [14, 20, 18, 12],
    [16, 11, 13, 14],
    [0, 0, 0, 0], // Dummy Row
  ];

  // Scenario B: 4 Supervisors vs 3 Furnaces (4x3) -> Add Dummy Col
  const raw4x3 = [
    [25, 40, 35],
    [30, 20, 25],
    [40, 30, 20],
    [15, 25, 30],
  ];
  const balanced4x4Col = [
    [25, 40, 35, 0],
    [30, 20, 25, 0],
    [40, 30, 20, 0],
    [15, 25, 30, 0],
  ];

  // Case Studies
  const caseStudies = [
    {
      title: '1. Foundry Supervisor Surplus (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Had 4 supervisors and 3 furnaces in Barrackpore (4x3). Added 1 dummy column with ₹0 rate; the solver assigned 3 supervisors to furnaces and benched 1 supervisor with minimal marginal impact.',
      lesson: 'Dummy columns identify the most cost-effective personnel to place on standby.',
    },
    {
      title: '2. Cold-Chain Vaccine Vehicle Shortage (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Had 3 refrigerated vans and 4 clinics in Kolkata (3x4). Added 1 dummy row; internal vans took the 3 most expensive lanes and identified the optimal clinic (J1) to outsource.',
      lesson: 'Dummy rows identify which destination order to outsource at lowest penalty.',
    },
    {
      title: '3. Supermarket FMCG Store Manager Surplus (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Balanced 5 store managers against 3 hypermarkets (5x3) using 2 dummy columns, ensuring core outlets had top managers while 2 managers handled regional supplier audits.',
      lesson: 'Unbalanced models provide structured workforce rotation planning.',
    },
    {
      title: '4. Educational Press Printing Machine Shortage (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Scheduled 3 book-binding lines for 5 high-volume textbook orders (3x5). Added 2 dummy rows to schedule 3 internal production runs and outsource 2 orders at minimal freight.',
      lesson: 'Dummy balancing satisfies strict procurement audit standards for outsourced jobs.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes unbalGlow {
          0%, 100% { border-color: rgba(244, 63, 94, 0.3); }
          50% { border-color: rgba(244, 63, 94, 0.8); }
        }
        .glow-unbal {
          animation: unbalGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-rose-950/80 text-rose-400 border border-rose-800/60">
              Segment 3 • Module 003_001 • Topic 5
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-rose-950/80 text-rose-400 border border-rose-800/60">
              Non-Square Matrices & Dummy Balancing
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Unbalanced Assignment Problems
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            Managing real-world resource asymmetries (<span className="text-rose-400 font-mono">m ≠ n</span>): resolving <span className="text-amber-400 font-semibold">Labor Surplus</span> (<span className="text-amber-400 font-mono">m &gt; n</span>) by adding <span className="text-emerald-400 font-semibold">Dummy Columns</span>, resolving <span className="text-cyan-400 font-semibold">Task Deficit</span> (<span className="text-cyan-400 font-mono">m &lt; n</span>) by adding <span className="text-emerald-400 font-semibold">Dummy Rows</span> with <span className="text-emerald-400 font-bold">₹0</span> rates, and interpreting idle vs outsourced operations.
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'unbalanced-concept', label: '1. Unbalanced Taxonomy' },
              { id: 'interactive-balancer', label: '2. Interactive Dimension Balancer' },
              { id: 'dummy-interpretation', label: '3. Dummy Economic Meaning' },
              { id: 'svg-balancing', label: '4. Dummy Augmentation SVG' },
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
                    ? 'bg-rose-600 text-white border-rose-500 shadow-md shadow-rose-900/40'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </header>

        {/* SECTION 1: Unbalanced Taxonomy */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-600/20 text-rose-400 font-bold text-sm">
                01
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                The Two Operational Asymmetries
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-amber-300 font-bold">Scenario A: Labor Surplus (m &gt; n)</span>
                  <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 font-mono text-[10px] border border-amber-800">
                    Add Dummy Cols
                  </span>
                </div>
                <p className="text-slate-300">
                  More workers/machines than tasks. Exactly <span className="font-mono text-amber-300 font-bold">(m − n)</span> workers must remain idle on standby.
                </p>
                <div className="p-2 bg-slate-950 rounded font-mono text-emerald-400 text-xs">
                  Augmentation: Add (m − n) Dummy Columns with ₹0 freight rates.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-cyan-300 font-bold">Scenario B: Task Deficit (m &lt; n)</span>
                  <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono text-[10px] border border-cyan-800">
                    Add Dummy Rows
                  </span>
                </div>
                <p className="text-slate-300">
                  More tasks than workers. Exactly <span className="font-mono text-cyan-300 font-bold">(n − m)</span> tasks must remain unperformed or outsourced.
                </p>
                <div className="p-2 bg-slate-950 rounded font-mono text-emerald-400 text-xs">
                  Augmentation: Add (n − m) Dummy Rows with ₹0 freight rates.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Interactive Dimension Balancer */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-unbal">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-600/20 text-rose-400 font-bold text-sm">
                  02
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Interactive Dimension Balancer
                </h2>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    setScenario('rows');
                    setShowBalanced(false);
                  }}
                  className={clsx(
                    'px-3 py-1 rounded text-xs font-semibold transition-all border',
                    scenario === 'rows'
                      ? 'bg-rose-600 text-white border-rose-400 shadow-md'
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                  )}
                >
                  3 × 4 (Task Deficit)
                </button>
                <button
                  onClick={() => {
                    setScenario('cols');
                    setShowBalanced(false);
                  }}
                  className={clsx(
                    'px-3 py-1 rounded text-xs font-semibold transition-all border',
                    scenario === 'cols'
                      ? 'bg-rose-600 text-white border-rose-400 shadow-md'
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                  )}
                >
                  4 × 3 (Labor Surplus)
                </button>
              </div>
            </div>

            {/* Toggle Balanced View */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-slate-300 font-medium">Matrix View State:</span>
                <span className="text-slate-400 text-xs">
                  {showBalanced ? '4x4 Augmented Balanced Square Matrix' : 'Raw Non-Square Matrix'}
                </span>
              </div>
              <button
                onClick={() => setShowBalanced(!showBalanced)}
                className={clsx(
                  'px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all border',
                  showBalanced
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-600 shadow-md'
                    : 'bg-amber-950 text-amber-300 border-amber-600'
                )}
              >
                {showBalanced ? '✓ Dummy Lines Active (4x4 Balanced)' : '⚡ Click to Augment Dummy Lines (₹0)'}
              </button>
            </div>

            {/* Matrix Table */}
            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-center border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2.5 text-left font-semibold text-slate-300 font-sans">Assignees \ Tasks</th>
                    <th className="p-2.5 font-semibold text-cyan-300 font-sans">Task 1</th>
                    <th className="p-2.5 font-semibold text-cyan-300 font-sans">Task 2</th>
                    <th className="p-2.5 font-semibold text-cyan-300 font-sans">Task 3</th>
                    {(scenario === 'rows' || (scenario === 'cols' && showBalanced)) && (
                      <th className="p-2.5 font-semibold text-emerald-300 font-sans">
                        {scenario === 'rows' ? 'Task 4' : 'Dummy Col (₹0)'}
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {scenario === 'rows' ? (
                    (showBalanced ? balanced4x4 : raw3x4).map((row, rIdx) => {
                      const isDummyRow = rIdx === 3;
                      return (
                        <tr key={rIdx} className={isDummyRow ? 'bg-emerald-950/20' : ''}>
                          <td className="p-2.5 text-left font-medium text-slate-200 font-sans">
                            {isDummyRow ? 'Dummy Nurse W4 (₹0)' : `Nurse W${rIdx + 1}`}
                          </td>
                          {row.map((val, cIdx) => (
                            <td key={cIdx} className="p-2">
                              <div
                                className={clsx(
                                  'p-2 rounded-lg font-bold transition-all border flex items-center justify-center',
                                  isDummyRow
                                    ? 'bg-emerald-950 text-emerald-300 border-emerald-700 animate-pulse'
                                    : 'bg-slate-900 text-slate-300 border-slate-800'
                                )}
                              >
                                ₹{val}
                              </div>
                            </td>
                          ))}
                        </tr>
                      );
                    })
                  ) : (
                    (showBalanced ? balanced4x4Col : raw4x3).map((row, rIdx) => (
                      <tr key={rIdx}>
                        <td className="p-2.5 text-left font-medium text-slate-200 font-sans">
                          Supervisor W{rIdx + 1}
                        </td>
                        {row.map((val, cIdx) => {
                          const isDummyCol = cIdx === 3;
                          return (
                            <td key={cIdx} className="p-2">
                              <div
                                className={clsx(
                                  'p-2 rounded-lg font-bold transition-all border flex items-center justify-center',
                                  isDummyCol
                                    ? 'bg-emerald-950 text-emerald-300 border-emerald-700 animate-pulse'
                                    : 'bg-slate-900 text-slate-300 border-slate-800'
                                )}
                              >
                                ₹{val}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 text-xs sm:text-sm text-slate-300">
              {showBalanced
                ? '⚡ Matrix is now balanced (4x4)! Standard Hungarian row/col reduction and line covering can proceed immediately.'
                : '⚠️ Non-Square Matrix: Direct Hungarian execution is invalid. Click the augment button to add ₹0 dummy lines!'}
            </div>
          </div>
        </section>

        {/* SECTION 3: Dummy Economic Meaning */}
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
                Operational Interpretation of Dummy Assignments
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-2">
                <span className="text-amber-300 font-bold">Worker Assigned to Dummy Column</span>
                <p className="text-slate-300">
                  Worker <span className="font-mono text-white font-bold">Wᵢ ➔ Dummy Col</span> means Worker i is placed on standby / bench. Contributes ₹0 to total freight, identifying the optimal staff member to preserve for backup shifts.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-2">
                <span className="text-cyan-300 font-bold">Dummy Row Assigned to Task</span>
                <p className="text-slate-300">
                  Task <span className="font-mono text-white font-bold">Dummy Row ➔ Task Jⱼ</span> means Task j cannot be handled internally and must be outsourced or scheduled in the next production cycle.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Dummy Augmentation SVG */}
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
                Dummy Augmentation Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 220"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Left Side: 3x4 with Dummy Row */}
                <rect x="40" y="30" width="310" height="160" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="195" y="55" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">TASK DEFICIT (3 × 4 ➔ 4 × 4)</text>
                <rect x="60" y="70" width="270" height="65" fill="#0f172a" stroke="#475569" />
                <text x="195" y="105" fill="#cbd5e1" fontSize="10" textAnchor="middle">3 Real Worker Rows</text>
                <rect x="60" y="140" width="270" height="30" fill="#064e3b" stroke="#34d399" strokeWidth="1.5" />
                <text x="195" y="160" fill="#34d399" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">+ 1 DUMMY ROW (₹0 RATES)</text>

                {/* Right Side: 4x3 with Dummy Col */}
                <rect x="390" y="30" width="310" height="160" rx="8" fill="#1e293b" stroke="#fbbf24" strokeWidth="2" />
                <text x="545" y="55" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">LABOR SURPLUS (4 × 3 ➔ 4 × 4)</text>
                <rect x="410" y="70" width="190" height="100" fill="#0f172a" stroke="#475569" />
                <text x="505" y="125" fill="#cbd5e1" fontSize="10" textAnchor="middle">3 Real Task Cols</text>
                <rect x="605" y="70" width="75" height="100" fill="#064e3b" stroke="#34d399" strokeWidth="1.5" />
                <text x="642" y="125" fill="#34d399" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">+ DUMMY</text>
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
                Bengal Logistics Unbalanced Assignment Case Studies
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
                  trap: 'Assigning Positive Costs to Dummy Cells',
                  fix: 'Dummy lines represent zero physical production charges and MUST have costs of exactly ₹0 across all entries.',
                },
                {
                  trap: 'Attempting Row/Col Reductions on Non-Square Matrices',
                  fix: 'Always augment with dummy rows or dummy columns first to make the matrix square before starting reductions.',
                },
                {
                  trap: 'Adding Both Dummy Rows and Dummy Columns Simultaneously',
                  fix: 'Only add dummy lines to the deficit dimension: dummy rows if m < n, dummy columns if m > n.',
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
                  Think about the managerial intelligence of the dummy allocation: when the solver pairs a real worker with a dummy column, it is telling you mathematically that this worker is the least cost-effective person to deploy on today’s active jobs!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully that when you add a dummy row of all 0s, every single column minimum becomes 0, so column reduction skips directly to line covering!
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
                Student Revision Checklist (Topic 5)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Identified unbalanced condition: m != n (non-square matrix)',
                'Added |m - n| dummy rows (if m < n) or dummy columns (if m > n) with ₹0 rates',
                'Interpreted dummy assignments: Dummy Col = Idle Worker; Dummy Row = Outsourced Task',
                'Executed row and column reductions on the augmented square matrix',
                'Extracted optimal 1-to-1 matching and identified real vs dummy assignments',
                'Calculated certified minimum cost Z* using original rates in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: in real-world West Bengal industry, assignment problems are almost ALWAYS unbalanced! You might have 5 delivery vans and 3 hospital wards, or 4 lawyers and 6 emergency briefs. Never panic when you see m ≠ n. Simply ask yourself: 'Am I short on rows or columns?' Add your ₹0 dummy lines to make the matrix square, execute your Hungarian solver, and celebrate your victory! In our next topic, we will take a deep dive into the precise mathematical mechanics of adding dummy rows and columns."
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Unbalanced Assignment Problems FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Unbalanced Assignment Problems (Hungarian Method)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic6_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic5;
