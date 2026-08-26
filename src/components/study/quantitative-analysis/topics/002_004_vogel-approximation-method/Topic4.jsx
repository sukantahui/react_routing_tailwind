// src/components/study/quantitative-analysis/topics/002_004_vogel-approximation-method/Topic4.jsx
// React 19 Function-based Component
// Module: 002_004_vogel-approximation-method
// Topic 4: Updating penalties after allocation

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
  const [activePass, setActivePass] = useState(1);

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

  // Multi-pass Dynamic Recalculation Data
  const passData = [
    {
      pass: 1,
      title: 'Pass 1: Full 3 × 3 Initial Tableau',
      summary: 'All 3 rows and 3 columns are active. 6 total penalties computed.',
      rowPenalties: ['₹14 - ₹8 = ₹6', '₹10 - ₹5 = ₹5', '₹11 - ₹7 = ₹4'],
      colPenalties: ['₹8 - ₹5 = ₹3', '₹14 - ₹13 = ₹1', '₹10 - ₹7 = ₹3'],
      maxPenalty: 'Row 1 (Barrackpore Heavy) with P = ₹6',
      targetAllocation: 'Cell (S1, D1) @ ₹8/ton for 60 tons',
      crossedOut: 'Column 1 (Jadavpur Works) is satisfied and crossed out',
      activeRows: [0, 1, 2],
      activeCols: [1, 2],
      supplies: [10, 90, 60],
      demands: [0, 80, 80],
    },
    {
      pass: 2,
      title: 'Pass 2: 3 × 2 Reduced Sub-Matrix (Col 1 Crossed Out)',
      summary: 'Jadavpur is crossed out. Notice Row 2 penalty jumps from ₹5 to ₹9 because ₹5 cell was eliminated!',
      rowPenalties: ['₹14 - ₹12 = ₹2', '₹19 - ₹10 = ₹9 (JUMP!)', '₹13 - ₹7 = ₹6'],
      colPenalties: ['—', '₹14 - ₹13 = ₹1', '₹10 - ₹7 = ₹3'],
      maxPenalty: 'Row 2 (Ichapur Casting) with P = ₹9',
      targetAllocation: 'Cell (S2, D3) @ ₹10/ton for 80 tons',
      crossedOut: 'Column 3 (Howrah Rail) is satisfied and crossed out',
      activeRows: [0, 1, 2],
      activeCols: [1],
      supplies: [10, 10, 60],
      demands: [0, 80, 0],
    },
    {
      pass: 3,
      title: 'Pass 3: 3 × 1 Single-Column Sub-Matrix (Salt Lake Remaining)',
      summary: 'Only Column 2 remains active. No further penalty differences exist; direct allocations satisfy remaining 80 tons demand.',
      rowPenalties: ['—', '—', '—'],
      colPenalties: ['—', 'Direct Assignment', '—'],
      maxPenalty: 'Direct Final Distribution',
      targetAllocation: 'Allocate S1 (10 tons) @ ₹14, S2 (10 tons) @ ₹19, S3 (60 tons) @ ₹13',
      crossedOut: 'All remaining rows and Column 2 satisfied (Tableau Complete)',
      activeRows: [],
      activeCols: [],
      supplies: [0, 0, 0],
      demands: [0, 0, 0],
    },
  ];

  const currentPassData = passData[activePass - 1];

  // Real-World Case Studies
  const caseStudies = [
    {
      title: '1. Precision Casting Dynamic Shifts (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'In Pass 1, Row 2 (Ichapur) had P = ₹5 (₹10 - ₹5). When Jadavpur (Col 1) was satisfied, Ichapur lost its ₹5 route. In Pass 2, remaining costs were [19, 10], causing penalty to jump to ₹9 (₹19 - ₹10).',
      lesson: 'The sudden penalty surge from ₹5 to ₹9 alerted Debangshu to prioritize Ichapur in Pass 2 before its remaining steel was forced onto the ₹19 route.',
    },
    {
      title: '2. Greater Kolkata Vaccine Recalculation (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Eliminating Howrah (Col 1) removed the ₹4 rate for Barrackpore Depot. Remaining routes were Barasat (₹25) and Jadavpur (₹15). Updated penalty P_R2(2) = ₹10 (₹25 - ₹15).',
      lesson: 'Recalculation captured the new emergency immediately, locking in the ₹15 route for the second delivery batch.',
    },
    {
      title: '3. Supermarket FMCG Margin Tracking (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Demonstrates maintaining multi-column margins: P_R(1), P_R(2), P_R(3) on the right and P_C(1), P_C(2), P_C(3) at the bottom for total audit visibility.',
      lesson: 'Preserving old penalty columns side-by-side allows operations auditors to verify every single routing decision in seconds.',
    },
    {
      title: '4. Higher Education Paper Press Fleet (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Tracks complete 4-pass penalty tableaus from initial full matrix down to 1x1 terminal state with zero arithmetic errors.',
      lesson: 'Dynamic penalty updating is the exact mechanism that guarantees VAM solutions reach 98%+ optimality.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes pulseRecalc {
          0%, 100% { border-color: rgba(16, 185, 129, 0.3); }
          50% { border-color: rgba(16, 185, 129, 0.8); }
        }
        .glow-recalc {
          animation: pulseRecalc 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
              Module 002_004 • Topic 4
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-cyan-950/80 text-cyan-400 border border-cyan-800/60">
              Dynamic Sub-Matrix Dynamics
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Updating Penalties After Allocation
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            Unveiling the adaptive engine of Vogel's Approximation Method: why line eliminations alter the candidate pool, how penalty differences shift dynamically (surging, dropping, or terminating), and how to record multi-pass margin headers <span className="text-cyan-400 font-mono">P(1), P(2), P(3)</span> with total mathematical rigor.
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'recalculation-principle', label: '1. Why Recalculate?' },
              { id: 'math-transitions', label: '2. Cost Transition Scenarios' },
              { id: 'interactive', label: '3. Interactive Multi-Pass Engine' },
              { id: 'margin-columns', label: '4. Margin Tracking Standards' },
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

        {/* SECTION 1: Why Recalculate? */}
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
                The Principle of Dynamic Recalculation
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              In static heuristics, decisions are made on pre-computed values. In contrast, <strong>VAM is an adaptive heuristic</strong>. When Row k is exhausted and crossed out, its cells are permanently removed from all intersecting columns.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1.5">
                <span className="text-cyan-300 font-semibold">1. Candidate Pool Shift</span>
                <p className="text-slate-300">
                  Surviving columns lose candidate cells, promoting previous second-choice routes into first-choice routes.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1.5">
                <span className="text-rose-300 font-semibold">2. Risk Escalation</span>
                <p className="text-slate-300">
                  Losing an intermediate backup route causes penalty differences to jump sharply, alerting VAM to prioritize the threatened line.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1.5">
                <span className="text-emerald-300 font-semibold">3. Dimension Contraction</span>
                <p className="text-slate-300">
                  The active matrix contracts step-by-step from <span className="font-mono text-emerald-400">m × n</span> down to a terminal single line.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Cost Transition Scenarios */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-600/20 text-cyan-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Mathematical Line Transition Scenarios
              </h2>
            </div>

            <div className="flex flex-col space-y-3 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold">Case A: Lowest Cost c_(1) Was Eliminated</span>
                <p className="text-slate-300">
                  Old <span className="font-mono text-white">c_(2)</span> becomes new <span className="font-mono text-emerald-400">c_(1)'</span>, and old <span className="font-mono text-white">c_(3)</span> becomes new <span className="font-mono text-amber-400">c_(2)'</span>. New penalty: <span className="font-mono text-cyan-300">P' = c_(3) - c_(2)</span>.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-rose-800/50 flex flex-col space-y-1">
                <span className="text-rose-300 font-semibold">Case B: Second-Lowest Cost c_(2) Was Eliminated (Penalty Surge!)</span>
                <p className="text-slate-300">
                  Lowest cost <span className="font-mono text-white">c_(1)</span> remains, but old <span className="font-mono text-white">c_(3)</span> becomes new <span className="font-mono text-rose-400">c_(2)'</span>. The gap widens dramatically: <span className="font-mono text-rose-300">P' = c_(3) - c_(1)</span>.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-slate-300 font-semibold">Case C: Higher Cost c_(3+) Was Eliminated</span>
                <p className="text-slate-400">
                  Top two lowest costs are undisturbed; penalty remains identical: <span className="font-mono text-slate-200">P' = P</span>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Interactive Multi-Pass Engine */}
        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          data-index="2"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-recalc">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                  03
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Interactive Dynamic Recalculation Engine
                </h2>
              </div>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3].map((pNum) => (
                  <button
                    key={pNum}
                    onClick={() => setActivePass(pNum)}
                    className={clsx(
                      'px-3 py-1 rounded text-xs font-semibold transition-all border',
                      activePass === pNum
                        ? 'bg-emerald-600 text-white border-emerald-400 shadow-md'
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                    )}
                  &gt;
                    Pass {pNum}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300">
              <strong className="text-white">{currentPassData.title}</strong> — {currentPassData.summary}
            </p>

            {/* Tableau with Multi-Pass Margin Columns */}
            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-4">
              <table className="w-full text-center border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2 text-left font-semibold text-slate-300">Origins \ Dests</th>
                    <th className={clsx('p-2 font-semibold', activePass >= 2 ? 'line-through text-slate-600' : 'text-cyan-300')}&gt;
                      Jadavpur (D1)
                    </th>
                    <th className="p-2 font-semibold text-cyan-300">Salt Lake (D2)</th>
                    <th className={clsx('p-2 font-semibold', activePass >= 3 ? 'line-through text-slate-600' : 'text-cyan-300')}&gt;
                      Howrah (D3)
                    </th>
                    <th className="p-2 font-semibold text-amber-300">Supply</th>
                    <th className={clsx('p-2 font-bold border-l border-slate-800', activePass === 1 ? 'text-emerald-400 bg-emerald-950/40' : 'text-slate-500')}>
                      P_R(1)
                    </th>
                    <th className={clsx('p-2 font-bold border-l border-slate-800', activePass === 2 ? 'text-emerald-400 bg-emerald-950/40' : 'text-slate-500')}>
                      P_R(2)
                    </th>
                    <th className={clsx('p-2 font-bold border-l border-slate-800', activePass === 3 ? 'text-emerald-400 bg-emerald-950/40' : 'text-slate-500')}>
                      P_R(3)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Barrackpore (S1)', costs: [8, 14, 12], p1: '₹6', p2: '₹2', p3: '—' },
                    { name: 'Ichapur (S2)', costs: [5, 19, 10], p1: '₹5', p2: '₹9 (★)', p3: '—' },
                    { name: 'Kolkata (S3)', costs: [11, 13, 7], p1: '₹4', p2: '₹6', p3: '—' },
                  ].map((row, rIdx) => (
                    <tr key={rIdx} className="border-b border-slate-800/60">
                      <td className="p-2.5 text-left font-medium text-slate-200">{row.name}</td>
                      {row.costs.map((cost, cIdx) => {
                        const isCrossed = (cIdx === 0 && activePass &ge; 2) || (cIdx === 2 && activePass >= 3);
                        return (
                          <td key={cIdx} className="p-2">
                            <div
                              className={clsx(
                                'p-2 rounded-lg font-mono font-bold border text-center transition-all',
                                isCrossed
                                  ? 'bg-slate-900/40 text-slate-600 line-through border-slate-800'
                                  : 'bg-slate-900 text-slate-300 border-slate-800'
                              )}
                            >
                              ₹{cost}
                            </div>
                          </td>
                        );
                      })}
                      <td className="p-2 font-mono font-bold text-amber-300">
                        {currentPassData.supplies[rIdx]} tons
                      </td>
                      <td className={clsx('p-2 font-mono border-l border-slate-800', activePass === 1 ? 'text-emerald-300 font-bold' : 'text-slate-500')}>
                        {row.p1}
                      </td>
                      <td className={clsx('p-2 font-mono border-l border-slate-800', activePass === 2 ? 'text-emerald-300 font-bold' : 'text-slate-500')}>
                        {row.p2}
                      </td>
                      <td className={clsx('p-2 font-mono border-l border-slate-800', activePass === 3 ? 'text-emerald-300 font-bold' : 'text-slate-500')}>
                        {row.p3}
                      </td>
                    </tr>
                  ))}

                  {/* Demand Row */}
                  <tr className="bg-slate-900/40 text-slate-300 font-mono">
                    <td className="p-2.5 text-left font-semibold text-amber-300">Demand</td>
                    {currentPassData.demands.map((dm, dmIdx) => (
                      <td key={dmIdx} className={clsx('p-2 font-bold', dm === 0 ? 'text-slate-600 line-through' : 'text-amber-300')}>
                        {dm} tons
                      </td>
                    ))}
                    <td className="p-2 text-slate-600 text-xs">—</td>
                    <td className="p-2 border-l border-slate-800 text-slate-600 text-xs">—</td>
                    <td className="p-2 border-l border-slate-800 text-slate-600 text-xs">—</td>
                    <td className="p-2 border-l border-slate-800 text-slate-600 text-xs">—</td>
                  </tr>

                  {/* Column Penalties */}
                  <tr className="bg-emerald-950/20 text-emerald-300 font-mono font-bold">
                    <td className="p-2.5 text-left text-emerald-400 font-bold">P_C({activePass})</td>
                    {currentPassData.colPenalties.map((cp, cIdx) => (
                      <td key={cIdx} className="p-2 text-center border-t border-slate-800">
                        {cp}
                      </td>
                    ))}
                    <td className="p-2 text-slate-600 text-xs">—</td>
                    <td colSpan="3" className="p-2 border-l border-slate-800 text-xs text-emerald-400 font-bold">
                      {currentPassData.maxPenalty}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Pass Audit Card */}
            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-2 text-xs sm:text-sm">
              <span className="text-emerald-300 font-semibold">⚡ Dynamic Audit for Pass {currentPassData.pass}:</span>
              <p className="text-slate-300">• <strong>Winning Line:</strong> {currentPassData.maxPenalty}</p>
              <p className="text-slate-300">• <strong>Target Action:</strong> {currentPassData.targetAllocation}</p>
              <p className="text-amber-300">• <strong>Line Eliminated:</strong> {currentPassData.crossedOut}</p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Margin Tracking Standards */}
        <section
          ref={(el) => (sectionRefs.current[3] = el)}
          data-index="3"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-violet-600/20 text-violet-400 font-bold text-sm">
                04
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Professional Multi-Pass Margin Standards
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-2">
                <span className="text-violet-300 font-semibold">Right Margin Tracking</span>
                <p className="text-slate-300">
                  Maintain vertical columns <span className="font-mono text-cyan-300">P_R(1), P_R(2), P_R(3)</span>. When Row k is exhausted, place a dashed line <span className="font-mono text-slate-500">—</span> in all subsequent columns for Row k.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-2">
                <span className="text-emerald-300 font-semibold">Bottom Margin Tracking</span>
                <p className="text-slate-300">
                  Maintain horizontal rows <span className="font-mono text-emerald-300">P_C(1), P_C(2), P_C(3)</span>. When Column l is satisfied, place <span className="font-mono text-slate-500">—</span> in all subsequent rows for Column l.
                </p>
              </div>
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
                Bengal Logistics Dynamic Recalculation Case Studies
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
                  <p className="text-slate-300"><strong>Dynamic Shift:</strong> {cs.desc}</p>
                  <p className="text-emerald-300"><strong>Managerial Lesson:</strong> {cs.lesson}</p>
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
                  trap: 'Reusing Pass 1 Penalties in Pass 2',
                  fix: 'Never reuse old penalties; crossing out a line permanently changes the lowest and second-lowest costs in surviving lines.',
                },
                {
                  trap: 'Including Crossed-Out Cells in New Minimum Calculations',
                  fix: 'Strictly ignore crossed-out rows and columns when finding new minimums.',
                },
                {
                  trap: 'Erasing Old Penalty Margins',
                  fix: 'Keep multi-pass penalty columns P_1, P_2, P_3 side-by-side to preserve the full mathematical audit trail.',
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
                  Think about how eliminating a factory's cheapest customer forces its second customer to become its primary option, causing its penalty to shift immediately.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully that when only a single column remains active (Pass 3), no penalty differences can be computed, and distribution is executed directly by capacity equality.
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
                Student Revision Checklist (Topic 4)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Created new margin headers P_R(p+1) and P_C(p+1) for each pass',
                'Placed dash (—) in all exhausted lines',
                'Recomputed penalties using strictly uncrossed active cells',
                'Identified new global maximum penalty Max_P for the current pass',
                'Allocated to least-cost cell inside new winning line',
                'Updated remaining supply and demand balances accurately',
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
              "In our operations research workshops in Barrackpore and Kolkata, I emphasize to Mamata, Mahima, Debangshu, Susmita, and Abhronila that VAM's brilliance lies entirely in its dynamic recalculation! A common mistake made by students under exam pressure is computing penalties once in Pass 1 and reusing those static numbers for the rest of the problem. That completely destroys VAM! Always remember: when a row or column is struck out, the economic reality of the remaining matrix changes. Writing clear margin headers P_R(1), P_R(2), P_R(3)... ensures your solution adapts to the evolving network and guarantees near-optimal results!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Updating Penalties After Allocation FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Updating Penalties After Allocation (Vogel's Approximation Method)"
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
