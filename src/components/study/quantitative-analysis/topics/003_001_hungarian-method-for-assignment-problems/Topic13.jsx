// src/components/study/quantitative-analysis/topics/003_001_hungarian-method-for-assignment-problems/Topic13.jsx
// React 19 Function-based Component
// Module: 003_001_hungarian-method-for-assignment-problems
// Topic 13: Determining the optimal assignment

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic13_files/topic13_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic13_files/topic13_note.txt?raw';

const Topic13 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [activeTab, setActiveTab] = useState('manifest'); // 'manifest', 'duality', 'sensitivity'

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

  const assignmentData = [
    {
      worker: 'Debangshu (W1)',
      task: 'Job 3',
      cell: 'Cell (1, 3)',
      cost: 12,
      maxAllowedIncrease: 2, // can increase by ₹2 before alternative candidate becomes tied
    },
    {
      worker: 'Susmita (W2)',
      task: 'Job 2',
      cell: 'Cell (2, 2)',
      cost: 12,
      maxAllowedIncrease: 1,
    },
    {
      worker: 'Mamata (W3)',
      task: 'Job 4',
      cell: 'Cell (3, 4)',
      cost: 12,
      maxAllowedIncrease: 1,
    },
    {
      worker: 'Mahima (W4)',
      task: 'Job 1',
      cell: 'Cell (4, 1)',
      cost: 11,
      maxAllowedIncrease: 1,
    },
  ];

  const totalCost = assignmentData.reduce((acc, curr) => acc + curr.cost, 0);

  // Case Studies
  const caseStudies = [
    {
      title: '1. Foundry Operations Policy Audit (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Formally published the certified 4x4 casting roster in Barrackpore: W1➔J3, W2➔J2, W3➔J4, W4➔J1 with total expenditure locked at ₹46, verified by strong duality.',
      lesson: 'Structured policy manifests provide legally binding shift assignments.',
    },
    {
      title: '2. Cold-Chain Vaccine Fleet Dispatch Policy (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Dispatched 4 cold-chain vaccine delivery vans across Kolkata, locking in minimal total transit delay (46 minutes) with 100% emergency clinic fulfillment.',
      lesson: 'Operations research assignments ensure zero vehicle duplication in emergency medicine.',
    },
    {
      title: '3. Supermarket FMCG Alternative Optima Resolution (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Resolved alternative optimal ties in Ichapur by selecting the manager allocation that minimized daily travel fatigue, keeping monthly wage costs at ₹35.',
      lesson: 'Alternative optima allow managers to optimize secondary human-centric factors.',
    },
    {
      title: '4. Educational Press Procurement Tender Compliance (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Presented the complete 3-stage mathematical audit report to state education auditors in Jadavpur, verifying zero duality gap (Z* = W* = ₹46).',
      lesson: 'Mathematical audit certificates guarantee 100% compliance with government procurement laws.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes optGlow {
          0%, 100% { border-color: rgba(52, 211, 153, 0.3); }
          50% { border-color: rgba(52, 211, 153, 0.8); }
        }
        .glow-opt {
          animation: optGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
              Segment 3 • Module 003_001 • Topic 13
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
              Policy Synthesis • Strong Duality Audit • Sensitivity Analysis
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Determining the Optimal Assignment
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            Synthesizing the final <span className="text-emerald-400 font-semibold">Optimal Assignment Policy</span>: extracting 1-to-1 dispatch pairings, looking up original rates in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>), executing the <span className="text-sky-400 font-semibold">Strong Duality Verification Suite</span> (<span className="text-cyan-400 font-mono">Z* = W*</span>), and performing <span className="text-amber-400 font-semibold">Sensitivity Analysis</span>.
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'synthesis-protocol', label: '1. Policy Synthesis' },
              { id: 'interactive-suite', label: '2. Optimal Policy & Audit Suite' },
              { id: 'duality-verification', label: '3. Strong Duality Proof' },
              { id: 'svg-pipeline', label: '4. Optimal Pipeline SVG' },
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
              >
                {item.label}
              </button>
            ))}
          </div>
        </header>

        {/* SECTION 1: Policy Synthesis */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                01
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Optimal Policy Synthesis Protocol
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-emerald-300 font-bold">1. Coordinate Extraction</span>
                <p className="text-slate-300">Convert the n boxed zero coordinates [0] into formal (Worker ➔ Task) pairings.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-bold">2. Original Rate Lookup</span>
                <p className="text-slate-300">Look up true monetary rates from the INITIAL cost matrix in Indian Rupees (₹).</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-amber-300 font-bold">3. Duality & Sensitivity Audit</span>
                <p className="text-slate-300">Verify zero duality gap (Z* = W*) and calculate allowable wage fluctuations.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Optimal Policy & Audit Suite */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-opt">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                  02
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Optimal Assignment & Audit Engine
                </h2>
              </div>
              <div className="flex items-center gap-1.5">
                {[
                  { id: 'manifest', label: '1. Policy Manifest' },
                  { id: 'duality', label: '2. Strong Duality Audit' },
                  { id: 'sensitivity', label: '3. Sensitivity Inspector' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={clsx(
                      'px-3 py-1 rounded text-xs font-semibold transition-all border',
                      activeTab === item.id
                        ? 'bg-emerald-600 text-white border-emerald-400 shadow-md'
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab 1: Manifest */}
            {activeTab === 'manifest' && (
              <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                      <th className="p-2.5">Assignee</th>
                      <th className="p-2.5">Assigned Task</th>
                      <th className="p-2.5 text-cyan-300">Matrix Coordinate</th>
                      <th className="p-2.5 text-emerald-300">Original Rate (₹)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
                    {assignmentData.map((row, idx) => (
                      <tr key={idx}>
                        <td className="p-2.5 font-medium text-white font-sans">{row.worker}</td>
                        <td className="p-2.5 text-white font-sans">{row.task}</td>
                        <td className="p-2.5 text-cyan-300">{row.cell}</td>
                        <td className="p-2.5 text-emerald-400 font-bold">₹{row.cost}</td>
                      </tr>
                    ))}
                    <tr className="bg-slate-900/60 text-white font-bold">
                      <td colSpan="3" className="p-3 text-right font-sans text-emerald-300">
                        CERTIFIED MINIMUM TOTAL EXPENDITURE (Z*):
                      </td>
                      <td className="p-3 text-emerald-400 text-base">₹{totalCost}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* Tab 2: Strong Duality */}
            {activeTab === 'duality' && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-3 text-xs sm:text-sm font-mono">
                <span className="text-cyan-300 font-bold font-sans text-base">Strong Duality Arithmetic Proof:</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                    <span className="text-slate-400 font-sans">Row Reductions (u):</span>
                    <span className="text-amber-300 font-bold">10 + 12 + 12 + 11 = ₹45</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                    <span className="text-slate-400 font-sans">Col Reductions (v):</span>
                    <span className="text-sky-300 font-bold">0 + 0 + 2 + 0 = ₹2</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                    <span className="text-slate-400 font-sans">Additional Shifts (ΔW):</span>
                    <span className="text-purple-300 font-bold">1 · (4 − 3) = −₹1</span>
                  </div>
                </div>
                <div className="p-3 bg-emerald-950/40 rounded-lg border border-emerald-800 flex justify-between items-center text-sm">
                  <span className="text-emerald-300 font-sans font-bold">Total Dual Potential W*:</span>
                  <span className="text-emerald-400 font-bold">W* = ₹45 + ₹2 − ₹1 = ₹46 ➔ Z* = ₹46 (GAP = 0 ✅)</span>
                </div>
              </div>
            )}

            {/* Tab 3: Sensitivity */}
            {activeTab === 'sensitivity' && (
              <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
                <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                      <th className="p-2.5 font-sans">Assigned Pairing</th>
                      <th className="p-2.5">Current Rate (₹)</th>
                      <th className="p-2.5 text-amber-300 font-sans">Allowable Cost Increase</th>
                      <th className="p-2.5 text-slate-300 font-sans">Stability Diagnosis</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {assignmentData.map((row, idx) => (
                      <tr key={idx}>
                        <td className="p-2.5 font-medium text-white font-sans">{row.worker} ➔ {row.task}</td>
                        <td className="p-2.5 text-emerald-400 font-bold">₹{row.cost}</td>
                        <td className="p-2.5 text-amber-300">+₹{row.maxAllowedIncrease} / unit</td>
                        <td className="p-2.5 text-xs text-slate-400 font-sans">
                          Cost can rise up to ₹{row.cost + row.maxAllowedIncrease} before solution shifts.
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>

        {/* SECTION 3: Strong Duality Proof */}
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
                Total Unimodularity & Global Optimality
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Because the constraint matrix of the assignment problem is <strong>Totally Unimodular (TUM)</strong>, every basic feasible solution is an extreme point representing a pure binary permutation matrix. The Hungarian Method is mathematically guaranteed to find the absolute global minimum without fractional solutions.
            </p>
          </div>
        </section>

        {/* SECTION 4: Optimal Pipeline SVG */}
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
                Optimal Assignment Synthesis Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 180"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                <rect x="40" y="40" width="200" height="100" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="140" y="70" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">1. Boxed Zeros [0]</text>
                <text x="140" y="95" fill="#cbd5e1" fontSize="10" textAnchor="middle">Coordinates (i, π(i))</text>
                <text x="140" y="115" fill="#a7f3d0" fontSize="9" textAnchor="middle">1-to-1 Bijection</text>

                <line x1="245" y1="90" x2="285" y2="90" stroke="#94a3b8" strokeWidth="2" />
                <polygon points="285,90 275,85 275,95" fill="#94a3b8" />

                <rect x="290" y="40" width="200" height="100" rx="8" fill="#1e293b" stroke="#fbbf24" strokeWidth="2" />
                <text x="390" y="70" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">2. Original Rate Lookup</text>
                <text x="390" y="95" fill="#cbd5e1" fontSize="10" textAnchor="middle">c_{`{i, π(i)}`} in ₹</text>
                <text x="390" y="115" fill="#fde68a" fontSize="9" textAnchor="middle">Pull from Raw Matrix</text>

                <line x1="495" y1="90" x2="535" y2="90" stroke="#94a3b8" strokeWidth="2" />
                <polygon points="535,90 525,85 525,95" fill="#94a3b8" />

                <rect x="540" y="40" width="160" height="100" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="620" y="70" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">3. Certified Z*</text>
                <text x="620" y="95" fill="#ffffff" fontSize="13" fontFamily="monospace" fontWeight="bold" textAnchor="middle">Z* = ₹46</text>
                <text x="620" y="115" fill="#a7f3d0" fontSize="9" textAnchor="middle">Zero Duality Gap</text>
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
                Bengal Operations Research Optimal Policy Case Studies
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
                  trap: 'Forgetting to Lookup Costs in the Original Matrix',
                  fix: 'Never sum the 0s from the reduced matrix; always pull unit rates from the initial cost matrix in Indian Rupees (₹).',
                },
                {
                  trap: 'Failing to Label Dummy Allocations as Idle or Outsourced',
                  fix: 'Explicitly state which real worker is idle or which real task is outsourced in your final conclusion.',
                },
                {
                  trap: 'Skipping the Strong Duality Verification Step',
                  fix: 'Verify that Z* equals the sum of row/col/additional potential shifts (Z* == W*) to guarantee zero duality gap.',
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
                  Think of the optimal policy synthesis as turning mathematical zeros into real-world business value: every boxed zero represents an assignment operating at maximum efficiency!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully that Strong Duality provides a 100% reliable audit trail: if your primal spend in ₹ matches your dual sum W*, your answer is certified correct!
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
                Student Revision Checklist (Topic 13)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Mapped boxed zero coordinates (i, π(i)) to worker-task pairings',
                'Retrieved original cost entries from the initial matrix in Indian Rupees (₹)',
                'Computed certified minimum total cost Z*',
                'Conducted 1-to-1 bijection verification (no double-booking)',
                'Conducted Strong Duality audit (Z* == W*)',
                'Evaluated Sensitivity Analysis on allowable cost increases',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: Determining the Optimal Assignment is where your analysis becomes actionable leadership! Always present your final answer with (1) the pairing manifest, (2) the original rates in Indian Rupees (₹), and (3) the certified total spend Z*. In our next topic, we will explore Minimization Problems in full depth!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Determining Optimal Assignment FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Determining Optimal Assignment (Hungarian Method)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic14_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic13;
