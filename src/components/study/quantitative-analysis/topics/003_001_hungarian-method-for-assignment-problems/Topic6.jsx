// src/components/study/quantitative-analysis/topics/003_001_hungarian-method-for-assignment-problems/Topic6.jsx
// React 19 Function-based Component
// Module: 003_001_hungarian-method-for-assignment-problems
// Topic 6: Adding dummy rows or columns

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic6_files/topic6_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic6_files/topic6_note.txt?raw';

const Topic6 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [activeStep, setActiveStep] = useState(0); // 0: Raw 4x5, 1: Augmented 5x5, 2: Prohibited Big-M on J4, 3: Final Manifest
  const [isJ4Prohibited, setIsJ4Prohibited] = useState(false);

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

  const raw4x5 = [
    [10, 15, 12, 18, 14],
    [13, 12, 14, 16, 11],
    [15, 14, 17, 12, 16],
    [11, 13, 15, 14, 12],
  ];

  const workerLabels = ['Debangshu (W1)', 'Susmita (W2)', 'Mamata (W3)', 'Mahima (W4)'];
  const taskLabels = ['Job 1', 'Job 2', 'Job 3', 'Job 4', 'Job 5'];

  // Case Studies
  const caseStudies = [
    {
      title: '1. Foundry Maintenance Repair Scheduling (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Augmented 1 dummy row to solve a 4x5 furnace maintenance problem in Barrackpore, identifying Job 2 as the optimal task to outsource to external contractors at ₹46 total spend.',
      lesson: 'Dummy augmentation identifies the precise job to outsource with minimum cost penalty.',
    },
    {
      title: '2. Cold-Chain Vaccine Critical ICU Ward Protection (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Assigned c_Dummy,4 = M (₹99,999) because Clinic Ward 4 held critical ICU patients, ensuring internal staff were assigned to Ward 4 while non-critical Ward 2 was outsourced.',
      lesson: 'Big-M dummy barriers protect essential medical services from being outsourced.',
    },
    {
      title: '3. Supermarket FMCG Store Manager Surplus (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Augmented 2 dummy columns to match 5 managers to 3 hypermarket branches in Ichapur, identifying 2 managers for regional supplier audits at zero additional wage penalty.',
      lesson: 'Dummy columns provide structured workforce rotation planning.',
    },
    {
      title: '4. Educational Press Textbook Production Line (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Augmented 2 dummy rows to schedule 3 binding lines for 5 textbook orders in Jadavpur, satisfying state procurement audit guidelines for textbook outsourcing.',
      lesson: 'Formal dummy modeling guarantees compliance with government procurement laws.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes dummyGlow {
          0%, 100% { border-color: rgba(234, 179, 8, 0.3); }
          50% { border-color: rgba(234, 179, 8, 0.8); }
        }
        .glow-dummy {
          animation: dummyGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-amber-950/80 text-amber-400 border border-amber-800/60">
              Segment 3 • Module 003_001 • Topic 6
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-amber-950/80 text-amber-400 border border-amber-800/60">
              Augmentation Mechanics & Big-M Barriers
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
            Adding Dummy Rows or Columns
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A precise procedural guide on <span className="text-amber-400 font-semibold">Dummy Augmentation</span>: calculating deficit dimensions (<span className="text-cyan-400 font-mono">|m − n|</span>), assigning zero rates (<span className="text-emerald-400 font-bold">₹0</span>), applying <span className="text-rose-400 font-semibold">Big-M Prohibitions</span> on dummy cells, and executing the Hungarian solver.
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'augmentation-rules', label: '1. Augmentation Rules' },
              { id: 'interactive-simulator', label: '2. Dummy Augmentation Simulator' },
              { id: 'prohibited-outsourcing', label: '3. Prohibiting Dummy Tasks' },
              { id: 'svg-flow', label: '4. Dummy Decision Tree SVG' },
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

        {/* SECTION 1: Augmentation Rules */}
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
                The Two Golden Rules of Dummy Augmentation
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-2">
                <span className="text-cyan-300 font-bold">Rule 1: Task Deficit (m &lt; n)</span>
                <p className="text-slate-300">
                  Augment <span className="font-mono text-cyan-300 font-bold">k = (n − m)</span> Dummy Rows.
                </p>
                <div className="p-2.5 bg-slate-950 rounded font-mono text-emerald-300 text-xs">
                  c[dummy][j] = ₹0 &nbsp; (for all j = 1..n)
                </div>
                <p className="text-slate-400 text-xs">Result: Column reduction is automatically bypassed because all col minimums = 0.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-2">
                <span className="text-amber-300 font-bold">Rule 2: Labor Surplus (m &gt; n)</span>
                <p className="text-slate-300">
                  Augment <span className="font-mono text-amber-300 font-bold">k = (m − n)</span> Dummy Columns.
                </p>
                <div className="p-2.5 bg-slate-950 rounded font-mono text-emerald-300 text-xs">
                  c[i][dummy] = ₹0 &nbsp; (for all i = 1..m)
                </div>
                <p className="text-slate-400 text-xs">Result: Row reduction is automatically bypassed because all row minimums = 0.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Dummy Augmentation Simulator */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-dummy">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 font-bold text-sm">
                  02
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  4 × 5 Dummy Augmentation Simulator
                </h2>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 0, label: '1. Raw 4x5 Matrix' },
                  { id: 1, label: '2. Augmented 5x5 Matrix' },
                  { id: 2, label: '3. Final Optimal Manifest' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveStep(item.id)}
                    className={clsx(
                      'px-2.5 py-1 rounded text-xs font-semibold transition-all border',
                      activeStep === item.id
                        ? 'bg-amber-600 text-white border-amber-400 shadow-md'
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Prohibited Big-M Switch */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-slate-300 font-medium">Prohibit Outsourcing of Critical Job 4:</span>
                <span className="text-slate-400 text-xs">(Forces internal technician to take Job 4)</span>
              </div>
              <button
                onClick={() => setIsJ4Prohibited(!isJ4Prohibited)}
                className={clsx(
                  'px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all border',
                  isJ4Prohibited
                    ? 'bg-rose-950 text-rose-300 border-rose-600 shadow-md'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                )}
              >
                {isJ4Prohibited ? '⛔ Cell (Dummy, J4) = M (PROHIBITED)' : '✓ Cell (Dummy, J4) = ₹0 (Outsourceable)'}
              </button>
            </div>

            {/* Matrix View */}
            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-center border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2 text-left font-semibold text-slate-300 font-sans">Technicians \ Jobs</th>
                    {taskLabels.map((t, idx) => (
                      <th key={idx} className="p-2 font-semibold text-cyan-300 font-sans">
                        {t}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {raw4x5.map((row, rIdx) => (
                    <tr key={rIdx}>
                      <td className="p-2 text-left font-medium text-slate-200 font-sans">{workerLabels[rIdx]}</td>
                      {row.map((val, cIdx) => (
                        <td key={cIdx} className="p-2">
                          <div className="p-2 rounded-lg font-bold bg-slate-900 text-slate-300 border border-slate-800">
                            ₹{val}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                  {activeStep >= 1 && (
                    <tr className="bg-emerald-950/30">
                      <td className="p-2 text-left font-medium text-emerald-300 font-sans">
                        Dummy Tech W5 (₹0)
                      </td>
                      {[0, 1, 2, 3, 4].map((cIdx) => {
                        const isM = isJ4Prohibited && cIdx === 3;
                        return (
                          <td key={cIdx} className="p-2">
                            <div
                              className={clsx(
                                'p-2 rounded-lg font-bold border flex items-center justify-center',
                                isM
                                  ? 'bg-rose-950 text-rose-300 border-rose-700'
                                  : 'bg-emerald-950 text-emerald-300 border-emerald-700 animate-pulse'
                              )}
                            >
                              {isM ? 'M (∞)' : '₹0'}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Manifest Summary */}
            {activeStep === 2 && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2 text-xs sm:text-sm">
                <span className="text-emerald-300 font-bold font-sans">Optimal 5x5 Assignment Manifest:</span>
                <p className="text-slate-300">
                  • W1 (Debangshu) ➔ Job 3 (@ ₹12)<br />
                  • W2 (Susmita) ➔ Job 5 (@ ₹11)<br />
                  • W3 (Mamata) ➔ Job 4 (@ ₹12)<br />
                  • W4 (Mahima) ➔ Job 1 (@ ₹11)<br />
                  • W5 (Dummy) ➔ <strong>Job 2 (@ ₹0) — Job 2 is OUTSOURCED!</strong>
                </p>
                <div className="pt-2 border-t border-slate-800 flex justify-between items-center font-mono">
                  <span className="text-slate-400 font-sans">Certified Minimum Total Spend:</span>
                  <span className="text-emerald-400 font-bold text-base">Z* = ₹46</span>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* SECTION 3: Prohibiting Dummy Tasks */}
        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          data-index="2"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-600/20 text-rose-400 font-bold text-sm">
                03
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Prohibiting Outsourcing on Sensitive Tasks (Big-M)
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              When a government regulation, patient safety mandate, or proprietary trade secret prevents a task from being outsourced, assign <span className="font-mono text-rose-400 font-bold">c_Dummy,j = M</span>:
            </p>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2 font-mono text-xs sm:text-sm">
              <span className="text-rose-400 font-bold font-sans">Mathematical Barrier Effect:</span>
              <p className="text-white">
                c[Dummy][j] = M (where M ≫ max(C), e.g. ₹99,999)
              </p>
              <p className="text-slate-400 font-sans">
                The minimization engine will never select a cell with cost M, guaranteeing that internal human staff are allocated to Task j without exception.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Dummy Decision Tree SVG */}
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
                Dummy Augmentation Decision Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 220"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Decision Node */}
                <rect x="270" y="20" width="200" height="50" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="370" y="50" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">Compare Dimensions (m vs n)</text>

                {/* Left Branch */}
                <line x1="320" y1="70" x2="160" y2="120" stroke="#94a3b8" strokeWidth="2" />
                <rect x="60" y="120" width="200" height="80" rx="8" fill="#082f49" stroke="#38bdf8" strokeWidth="2" />
                <text x="160" y="145" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">m &lt; n (Task Deficit)</text>
                <text x="160" y="165" fill="#cbd5e1" fontSize="10" textAnchor="middle">Add (n − m) Dummy Rows</text>
                <text x="160" y="185" fill="#a7f3d0" fontSize="9" textAnchor="middle">Cost = ₹0 • Tasks Outsourced</text>

                {/* Right Branch */}
                <line x1="420" y1="70" x2="580" y2="120" stroke="#94a3b8" strokeWidth="2" />
                <rect x="480" y="120" width="200" height="80" rx="8" fill="#451a03" stroke="#fbbf24" strokeWidth="2" />
                <text x="580" y="145" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">m &gt; n (Labor Surplus)</text>
                <text x="580" y="165" fill="#cbd5e1" fontSize="10" textAnchor="middle">Add (m − n) Dummy Cols</text>
                <text x="580" y="185" fill="#a7f3d0" fontSize="9" textAnchor="middle">Cost = ₹0 • Workers Idle</text>
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
                Bengal Logistics Dummy Augmentation Case Studies
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
                  trap: 'Assigning Non-Zero Costs to Standard Dummy Entries',
                  fix: 'Standard dummy rows and columns must have unit costs of exactly ₹0 across all entries.',
                },
                {
                  trap: 'Subtracting Constants from Big-M Cells',
                  fix: 'Big-M is a fixed barrier infinity (M - k = M); leave M intact during row and column reductions.',
                },
                {
                  trap: 'Forgetting to Document Which Real Tasks are Outsourced',
                  fix: 'Always explicitly list which real tasks are assigned to the dummy row in your final conclusion.',
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
                  Think about how elegant the Big-M technique is on dummy cells: by making c_Dummy,4 = M, you prevent Job 4 from ever being outsourced without changing any code in your Hungarian solver!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully that when you add a dummy row, all column minimums are 0, so column reduction takes zero extra calculation time!
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
                Student Revision Checklist (Topic 6)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Mastered Condition 1: m < n ➔ add n - m dummy rows with ₹0 rates',
                'Mastered Condition 2: m > n ➔ add m - n dummy columns with ₹0 rates',
                'Understood why column reduction is a no-op when dummy rows are present',
                'Applied Big-M (c_dummy,j = M) to prohibit outsourcing of sensitive tasks',
                'Executed 5-step Hungarian solver on augmented square matrices',
                'Reported final certified minimum cost Z* in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: mastering dummy augmentation makes you ready for any real-world logistics challenge! Whether you are short on technicians or short on machines, adding your ₹0 dummy rows or columns restores mathematical symmetry. In our next topic, we will dive deep into the complete, formal Hungarian Method algorithm from start to finish!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Adding Dummy Rows or Columns FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Adding Dummy Rows or Columns (Hungarian Method)"
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

export default Topic6;
