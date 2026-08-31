// src/components/study/quantitative-analysis/topics/003_001_hungarian-method-for-assignment-problems/Topic16.jsx
// React 19 Function-based Component
// Module: 003_001_hungarian-method-for-assignment-problems
// Topic 16: Numerical exercises

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic16_files/topic16_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic16_files/topic16_note.txt?raw';

const Topic16 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [activeExercise, setActiveExercise] = useState(0); // 0: Ex 1 (Balanced 4x4), 1: Ex 2 (Unbalanced 3x4 Big-M), 2: Ex 3 (Maximization 4x4), 3: Ex 4 (Complex 5x5)

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

  const exercises = [
    {
      id: 0,
      title: 'Exercise 1: Balanced 4x4 Foundry Casting Minimization',
      lead: 'Debangshu (Barrackpore Heavy Engineering Foundry)',
      typeBadge: 'Balanced 4x4 Minimization',
      typeBadgeColor: 'bg-sky-950 text-sky-300 border-sky-800',
      matrixLabels: {
        rows: ['Debangshu (W1)', 'Susmita (W2)', 'Mamata (W3)', 'Mahima (W4)'],
        cols: ['Mould 1', 'Mould 2', 'Mould 3', 'Mould 4'],
      },
      rawMatrix: [
        ['₹10', '₹15', '₹12', '₹18'],
        ['₹13', '₹12', '₹14', '₹16'],
        ['₹15', '₹14', '₹17', '₹12'],
        ['₹11', '₹13', '₹15', '₹14'],
      ],
      steps: [
        '1. Row Reduction: u = [10, 12, 12, 11] subtracted across rows.',
        '2. Column Reduction: v = [0, 0, 2, 0] subtracted down Column 3.',
        '3. Line Covering: Initial L = 3 < 4 (Lines: R1, R2, C4). Smallest uncovered e = 1.',
        '4. Additional Reduction: Uncovered − 1, Intersections + 1 ➔ L = 4 = n (Optimal!).',
        '5. Assigned: (W1➔M3)=₹12, (W2➔M2)=₹12, (W3➔M4)=₹12, (W4➔M1)=₹11.',
      ],
      finalResult: 'Z* = 12 + 12 + 12 + 11 = ₹46 (Zero Duality Gap Verified)',
    },
    {
      id: 1,
      title: 'Exercise 2: Unbalanced 3x4 Clinic Van with Prohibited Cell (Big-M)',
      lead: 'Susmita (Ichapur Health Distribution Hub)',
      typeBadge: 'Unbalanced 3x4 + Big-M',
      typeBadgeColor: 'bg-rose-950 text-rose-300 border-rose-800',
      matrixLabels: {
        rows: ['Van 1 (W1)', 'Van 2 (W2)', 'Van 3 (W3)', 'Dummy Van 4 (₹0)'],
        cols: ['Clinic 1', 'Clinic 2', 'Clinic 3', 'Clinic 4'],
      },
      rawMatrix: [
        ['₹12', '₹10', 'M (₹99k)', '₹22'],
        ['₹14', '₹20', '₹18', '₹12'],
        ['₹16', '₹11', '₹13', '₹14'],
        ['₹0', '₹0', '₹0', '₹0'],
      ],
      steps: [
        '1. Added 1 Dummy Row W4 with ₹0 rates across all 4 clinics.',
        '2. Set prohibited route Cell (1, 3) = M (Big-M).',
        '3. Row Reduction: u = [10, 12, 11, 0]. Column minimums are all 0.',
        '4. Line Covering: L = 4 = n (Optimal!).',
        '5. Assigned: (W1➔C2)=₹10, (W2➔C4)=₹12, (W3➔C3)=₹13, (W4➔C1)=₹0 (Clinic 1 Outsourced!).',
      ],
      finalResult: 'Z* = 10 + 12 + 13 + 0 = ₹35 (Clinic 1 is outsourced to ambulance service)',
    },
    {
      id: 2,
      title: 'Exercise 3: Maximization 4x4 Sales Revenue Problem',
      lead: 'Mamata & Mahima (Kolkata Commercial Sales Directorate)',
      typeBadge: 'Maximization 4x4',
      typeBadgeColor: 'bg-amber-950 text-amber-300 border-amber-800',
      matrixLabels: {
        rows: ['Debangshu (S1)', 'Susmita (S2)', 'Mamata (S3)', 'Mahima (S4)'],
        cols: ['Territory 1', 'Territory 2', 'Territory 3', 'Territory 4'],
      },
      rawMatrix: [
        ['₹32 L', '₹38 L', '₹40 L', '₹28 L'],
        ['₹40 L', '₹24 L', '₹28 L', '₹21 L'],
        ['₹41 L', '₹27 L', '₹33 L', '₹30 L'],
        ['₹22 L', '₹38 L', '₹41 L', '₹36 L'],
      ],
      steps: [
        '1. Identified global maximum element M_max = ₹41 Lakhs.',
        '2. Formed Relative Regret Matrix C_regret = 41 − P.',
        '3. Executed standard 5-step Hungarian solver on the regret matrix.',
        '4. Extracted optimal zero coordinates: (S1➔T3), (S2➔T1), (S3➔T4), (S4➔T2).',
        '5. Looked up original profit rates: S1➔T3 (40), S2➔T1 (40), S3➔T4 (30), S4➔T2 (38).',
      ],
      finalResult: 'Z* = 40 + 40 + 30 + 38 = ₹148 Lakhs (Maximum Sales Turnover)',
    },
    {
      id: 3,
      title: 'Exercise 4: Complex 5x5 Textbook Printing Press Run',
      lead: 'Abhronila (Jadavpur Educational Press Directorate)',
      typeBadge: 'Complex 5x5 Multi-Pass',
      typeBadgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-800',
      matrixLabels: {
        rows: ['Press 1', 'Press 2', 'Press 3', 'Press 4', 'Press 5'],
        cols: ['Book 1', 'Book 2', 'Book 3', 'Book 4', 'Book 5'],
      },
      rawMatrix: [
        ['₹14', '₹18', '₹20', '₹17', '₹15'],
        ['₹18', '₹15', '₹16', '₹22', '₹19'],
        ['₹21', '₹24', '₹17', '₹14', '₹18'],
        ['₹19', '₹16', '₹21', '₹18', '₹15'],
        ['₹16', '₹20', '₹18', '₹19', '₹14'],
      ],
      steps: [
        '1. Row Reduction: u = [14, 15, 14, 15, 14] subtracted across rows.',
        '2. Column Reduction: v = [0, 0, 1, 0, 0] subtracted down Column 3.',
        '3. Multi-Pass Line Covering & Additional Reductions (e1 = 1, e2 = 1) ➔ L = 5 = n.',
        '4. Assigned: (P1➔B1)=₹14, (P2➔B2)=₹15, (P3➔B4)=₹14, (P4➔B3)=₹21, (P5➔B5)=₹14.',
      ],
      finalResult: 'Z* = 14 + 15 + 14 + 21 + 14 = ₹78 (Full 5x5 Strong Duality Certified)',
    },
  ];

  const currentEx = exercises[activeExercise];

  // Case Studies
  const caseStudies = [
    {
      title: '1. Foundry Operations Policy Audit (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Executed Exercise 1 to allocate Barrackpore casting personnel with zero scheduling overlap, locking in minimal spend of ₹46.',
      lesson: 'Balanced models provide predictable linear optimization execution.',
    },
    {
      title: '2. Cold-Chain Vaccine Fleet Dispatch Policy (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Executed Exercise 2 to route vaccine vans while protecting restricted medical routes, identifying the exact clinic to outsource.',
      lesson: 'Big-M barriers prevent hazardous route assignments in emergency logistics.',
    },
    {
      title: '3. Supermarket FMCG Sales Turnover Maximization (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Executed Exercise 3 to convert branch revenue into opportunity loss, achieving certified maximum turnover of ₹148 Lakhs.',
      lesson: 'Regret conversion maximizes gross operating margin effortlessly.',
    },
    {
      title: '4. Educational Press Tender Compliance Audit (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Executed Exercise 4 on 5 textbook printing lines, presenting the certified audit trail to state regulators in Jadavpur.',
      lesson: 'Multi-pass Hungarian proofs satisfy all legal procurement standards.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes numGlow {
          0%, 100% { border-color: rgba(56, 189, 248, 0.3); }
          50% { border-color: rgba(56, 189, 248, 0.8); }
        }
        .glow-num {
          animation: numGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Segment 3 • Module 003_001 • Topic 16
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Multi-Tiered Worked Problems & Full Solution Suites
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
            Numerical Exercises
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive master collection of <span className="text-sky-400 font-semibold">Four Multi-Tiered Worked Numerical Problems</span>: solving Balanced Minimization, Unbalanced with <span className="text-rose-400 font-semibold">Big-M Prohibitions</span>, <span className="text-amber-400 font-semibold">Maximization Sales Turnovers</span>, and Complex <span className="text-emerald-400 font-semibold">5×5 Multi-Pass Hungarian Iterations</span> in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'problem-taxonomy', label: '1. Problem Taxonomy' },
              { id: 'interactive-solver', label: '2. Interactive Problem Solver' },
              { id: 'solution-suites', label: '3. Full Solution Suites' },
              { id: 'svg-flow', label: '4. Solution Decision Tree SVG' },
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

        {/* SECTION 1: Problem Taxonomy */}
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
                Assignment Problem Numerical Taxonomy
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-sky-300 font-bold">1. Balanced Minimization</span>
                <p className="text-slate-300">m = n, standard 5-step execution without dummy overhead.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-rose-300 font-bold">2. Unbalanced + Big-M</span>
                <p className="text-slate-300">Augment ₹0 dummy lines and enforce Big-M route restrictions.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-amber-300 font-bold">3. Maximization Revenue</span>
                <p className="text-slate-300">M_max − P regret transformation to optimize gross turnover.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-emerald-300 font-bold">4. Complex Multi-Pass</span>
                <p className="text-slate-300">5×5 higher order matrices requiring multiple Step 4b reductions.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Interactive Problem Solver */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-num">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                  02
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Interactive Problem Solver Suite
                </h2>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {exercises.map((ex) => (
                  <button
                    key={ex.id}
                    onClick={() => setActiveExercise(ex.id)}
                    className={clsx(
                      'px-2.5 py-1 rounded text-xs font-semibold transition-all border',
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
                <h3 className="text-base font-bold text-white">{currentEx.title}</h3>
                <span className="text-xs text-slate-400">{currentEx.lead}</span>
              </div>
              <span className={clsx('px-3 py-1 rounded-full text-xs font-mono font-bold border', currentEx.typeBadgeColor)}>
                {currentEx.typeBadge}
              </span>
            </div>

            {/* Matrix View */}
            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-center border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2 text-left font-semibold text-slate-300 font-sans">Assignees \ Tasks</th>
                    {currentEx.matrixLabels.cols.map((colName, idx) => (
                      <th key={idx} className="p-2 font-semibold text-cyan-300 font-sans">
                        {colName}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {currentEx.matrixLabels.rows.map((rowName, rIdx) => (
                    <tr key={rIdx}>
                      <td className="p-2 text-left font-medium text-slate-200 font-sans">{rowName}</td>
                      {currentEx.rawMatrix[rIdx].map((cellVal, cIdx) => (
                        <td key={cIdx} className="p-2">
                          <div className="p-2.5 rounded-lg font-bold bg-slate-900 text-slate-300 border border-slate-800">
                            {cellVal}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Step Walkthrough */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2 text-xs sm:text-sm">
              <span className="text-sky-300 font-bold font-sans">Step-by-Step Mathematical Walkthrough:</span>
              <div className="flex flex-col space-y-1 text-slate-300">
                {currentEx.steps.map((st, sIdx) => (
                  <div key={sIdx} className="flex items-start space-x-2">
                    <span className="text-emerald-400">➔</span>
                    <span>{st}</span>
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t border-slate-800 font-mono text-emerald-400 font-bold text-sm">
                Certified Solution: {currentEx.finalResult}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Full Solution Suites */}
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
                Summary of Certified Numerical Solutions
              </h2>
            </div>

            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold font-sans">
                    <th className="p-2.5">Exercise</th>
                    <th className="p-2.5">Problem Type</th>
                    <th className="p-2.5">Optimal Allocation Set</th>
                    <th className="p-2.5 text-emerald-300">Certified Objective (Z*)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="p-2.5 font-sans font-medium text-white">Exercise 1</td>
                    <td className="p-2.5 font-sans text-sky-300">Balanced 4x4 Min</td>
                    <td className="p-2.5">(1➔3), (2➔2), (3➔4), (4➔1)</td>
                    <td className="p-2.5 text-emerald-400 font-bold">Z* = ₹46</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-sans font-medium text-white">Exercise 2</td>
                    <td className="p-2.5 font-sans text-rose-300">Unbalanced 3x4 + Big-M</td>
                    <td className="p-2.5">(1➔2), (2➔4), (3➔3), (Dummy➔1)</td>
                    <td className="p-2.5 text-emerald-400 font-bold">Z* = ₹35 (C1 Outsourced)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-sans font-medium text-white">Exercise 3</td>
                    <td className="p-2.5 font-sans text-amber-300">Maximization 4x4</td>
                    <td className="p-2.5">(1➔3), (2➔1), (3➔4), (4➔2)</td>
                    <td className="p-2.5 text-emerald-400 font-bold">Z* = ₹148 Lakhs</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-sans font-medium text-white">Exercise 4</td>
                    <td className="p-2.5 font-sans text-emerald-300">Complex 5x5 Multi-Pass</td>
                    <td className="p-2.5">(1➔1), (2➔2), (3➔4), (4➔3), (5➔5)</td>
                    <td className="p-2.5 text-emerald-400 font-bold">Z* = ₹78</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 4: Solution Decision Tree SVG */}
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
                Numerical Exercise Decision Protocol
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 180"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                <rect x="20" y="50" width="160" height="80" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="100" y="80" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">1. Classify Type</text>
                <text x="100" y="105" fill="#cbd5e1" fontSize="9" textAnchor="middle">Min vs Max • Bal vs Unbal</text>

                <rect x="200" y="50" width="160" height="80" rx="8" fill="#1e293b" stroke="#fbbf24" strokeWidth="2" />
                <text x="280" y="80" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">2. Pre-process</text>
                <text x="280" y="105" fill="#cbd5e1" fontSize="9" textAnchor="middle">Dummies / M_max − P</text>

                <rect x="380" y="50" width="160" height="80" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <text x="460" y="80" fill="#f43f5e" fontSize="11" fontWeight="bold" textAnchor="middle">3. Hungarian Solve</text>
                <text x="460" y="105" fill="#cbd5e1" fontSize="9" textAnchor="middle">Reductions & Line Test</text>

                <rect x="560" y="50" width="160" height="80" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="640" y="80" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">4. Certified Z*</text>
                <text x="640" y="105" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">Pull Orig Rates (₹)</text>
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
                Bengal Operations Research Exercise Case Studies
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
                  trap: 'Forgetting to Check if Problem is Balanced Before Solving',
                  fix: 'Always check if m = n; if non-square, augment with ₹0 dummy rows or columns first.',
                },
                {
                  trap: 'Summing Zeros from the Reduced Matrix Instead of Original Rates',
                  fix: 'Always pull unit rates from the INITIAL cost/profit matrix in Indian Rupees (₹).',
                },
                {
                  trap: 'Forgetting to State Which Jobs are Outsourced in Dummy Solutions',
                  fix: 'Explicitly state in your conclusion which real destination is assigned to the dummy row.',
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
                  Think of numerical exercises as following a standardized recipe: whether you have 3 workers or 5 workers, minimization or maximization, the exact same 5 Hungarian steps lead to mathematical certainty!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully that Strong Duality (Z* = W*) gives you a self-checking mechanism on every single exam problem!
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
                Student Revision Checklist (Topic 16)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Solved Exercise 1: Standard 4x4 Balanced Minimization (Z* = ₹46)',
                'Solved Exercise 2: Unbalanced 3x4 with Big-M Prohibited Cell (Z* = ₹35)',
                'Solved Exercise 3: Maximization 4x4 Sales Revenue (Z* = ₹148 Lakhs)',
                'Solved Exercise 4: Complex 5x5 Multi-Pass Hungarian Iteration (Z* = ₹78)',
                'Verified all numerical solutions via Strong Duality (Z* == W*)',
                'Reported all final figures with Indian Rupee (₹) currency symbols',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: working through these 4 multi-tiered numerical exercises builds the muscle memory you need to ace any operations research examination! In our final topic for this module (Topic 17: Short Questions), we will review 30 rapid-fire conceptual and viva questions covering the entire module."
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Numerical Exercises FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Numerical Exercises (Hungarian Method)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic17_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic16;
