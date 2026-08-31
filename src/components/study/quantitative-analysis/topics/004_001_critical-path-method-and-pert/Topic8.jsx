// src/components/study/quantitative-analysis/topics/004_001_critical-path-method-and-pert/Topic8.jsx
// React 19 Function-based Component
// Module: 004_001_critical-path-method-and-pert
// Topic 8: Critical activities

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

  // Critical Activity Condition Inspector State
  const [ei, setEi] = useState(5);
  const [li, setLi] = useState(5);
  const [ej, setEj] = useState(19);
  const [lj, setLj] = useState(19);
  const [dij, setDij] = useState(8);

  const cond1 = Number(ei) === Number(li);
  const cond2 = Number(ej) === Number(lj);
  const cond3 = Number(ej) - Number(ei) === Number(dij);
  const totalFloat = Number(lj) - Number(ei) - Number(dij);
  const isCritical = cond1 && cond2 && cond3 && totalFloat === 0;
  const isFalseCriticalityTrap = cond1 && cond2 && !cond3;

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

  const activityManifest = [
    { name: 'A', nodes: '(1, 2)', d: 5, es: 0, ef: 5, ls: 0, lf: 5, tf: 0, status: 'CRITICAL ⭐' },
    { name: 'B', nodes: '(1, 3)', d: 4, es: 0, ef: 4, ls: 0, lf: 4, tf: 0, status: 'CRITICAL ⭐' },
    { name: 'C', nodes: '(2, 4)', d: 6, es: 5, ef: 11, ls: 5, lf: 11, tf: 0, status: 'CRITICAL ⭐' },
    { name: 'D', nodes: '(3, 4)', d: 7, es: 4, ef: 11, ls: 4, lf: 11, tf: 0, status: 'CRITICAL ⭐' },
    { name: 'E', nodes: '(2, 5)', d: 3, es: 5, ef: 8, ls: 12, lf: 15, tf: 7, status: 'Non-Critical' },
    { name: 'F', nodes: '(4, 6)', d: 8, es: 11, ef: 19, ls: 11, lf: 19, tf: 0, status: 'CRITICAL ⭐' },
    { name: 'G', nodes: '(5, 6)', d: 4, es: 8, ef: 12, ls: 15, lf: 19, tf: 7, status: 'Non-Critical' },
    { name: 'H', nodes: '(6, 7)', d: 5, es: 19, ef: 24, ls: 19, lf: 24, tf: 0, status: 'CRITICAL ⭐' },
  ];

  // Case Studies
  const caseStudies = [
    {
      title: '1. Foundry Furnace Critical Activity Governance (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Classified refractory bricklaying (d = 6, TF = 0, budget ₹1.8 Lakhs) as critical in Barrackpore, assigning master masons and double-shift supervision to guarantee zero delays.',
      lesson: 'Isolating critical activities focuses managerial oversight where zero delay buffer exists.',
    },
    {
      title: '2. Cold-Chain Vaccine Facility Critical Activity Isolation (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Proved in Kolkata that deep-freeze compressor assembly had TF = 0, while administrative signage had TF = 8 days, redirecting overtime to refrigeration.',
      lesson: 'Float differentiation directs capital and labor where they produce maximum timeline protection.',
    },
    {
      title: '3. Supermarket FMCG Conveyor False-Criticality Trap Avoidance (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Analyzed an emergency bypass conveyor connecting two critical nodes in Ichapur, proving d = 4 < 14 − 5 = 9 (TF = 5 days), avoiding ₹60,000 in unneeded overtime expenditure.',
      lesson: 'Testing Condition 3 prevents wasteful expenditure on pseudo-critical tasks.',
    },
    {
      title: '4. Educational High-Tech Lab Grant Critical Activity Compliance (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Verified that cleanroom HVAC fabrication had TF = 0 across a ₹55 Lakh university research grant in Jadavpur, securing daily progress milestone sign-offs.',
      lesson: 'Zero-float activity monitoring ensures contractual compliance in audited government grants.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes critGlow {
          0%, 100% { border-color: rgba(244, 63, 94, 0.3); }
          50% { border-color: rgba(244, 63, 94, 0.8); }
        }
        .glow-crit {
          animation: critGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-rose-950/80 text-rose-400 border border-rose-800/60">
              Segment 4 • Module 004_001 • Topic 8
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-rose-950/80 text-rose-400 border border-rose-800/60">
              Zero Total Float • The 3 Invariant Conditions • False Criticality Trap
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
            Critical Activities
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive study of <span className="text-rose-400 font-semibold">Critical Activities</span>: mathematical definition (<span className="text-rose-400 font-bold font-mono">TF = 0</span>), the <span className="text-amber-400 font-semibold">3 Invariant Conditions</span> (<span className="text-emerald-400 font-mono">Eᵢ = Lᵢ, Eⱼ = Lⱼ, Eⱼ − Eᵢ = dᵢⱼ</span>), diagnosing the <span className="text-cyan-400 font-semibold">False-Criticality Trap</span>, and managing project milestones in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'three-conditions', label: '1. The 3 Invariant Conditions' },
              { id: 'interactive-inspector', label: '2. Criticality Inspector' },
              { id: 'activity-manifest', label: '3. 8-Activity Manifest' },
              { id: 'svg-conditions', label: '4. Criticality & Trap SVG' },
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

        {/* SECTION 1: The 3 Invariant Conditions */}
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
                The 3 Invariant Mathematical Conditions for Criticality
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-300 font-bold">Condition 1: Tail Event Slack = 0</span>
                <p className="text-slate-300 font-mono text-xs">E_i = L_i (S_i = 0)</p>
                <span className="text-[11px] text-slate-400">Tail event must be on the critical path.</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-purple-300 font-bold">Condition 2: Head Event Slack = 0</span>
                <p className="text-slate-300 font-mono text-xs">E_j = L_j (S_j = 0)</p>
                <span className="text-[11px] text-slate-400">Head event must be on the critical path.</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-300 font-bold">Condition 3: Duration Condition</span>
                <p className="text-slate-300 font-mono text-xs">E_j − E_i = L_j − L_i = d_ij</p>
                <span className="text-[11px] text-slate-400">Duration must exactly bridge the event times (TF = 0).</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Criticality Inspector */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-crit">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-600/20 text-rose-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Critical Activity & False-Criticality Inspector
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Input tail and head event times plus activity duration to test all 3 conditions:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <label className="text-[11px] font-semibold text-sky-400">Tail E_i:</label>
                <input
                  type="number"
                  value={ei}
                  onChange={(e) => setEi(Number(e.target.value))}
                  className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-white font-mono text-xs"
                />
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <label className="text-[11px] font-semibold text-sky-400">Tail L_i:</label>
                <input
                  type="number"
                  value={li}
                  onChange={(e) => setLi(Number(e.target.value))}
                  className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-white font-mono text-xs"
                />
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <label className="text-[11px] font-semibold text-purple-400">Head E_j:</label>
                <input
                  type="number"
                  value={ej}
                  onChange={(e) => setEj(Number(e.target.value))}
                  className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-white font-mono text-xs"
                />
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <label className="text-[11px] font-semibold text-purple-400">Head L_j:</label>
                <input
                  type="number"
                  value={lj}
                  onChange={(e) => setLj(Number(e.target.value))}
                  className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-white font-mono text-xs"
                />
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <label className="text-[11px] font-semibold text-amber-400">Duration (d):</label>
                <input
                  type="number"
                  value={dij}
                  onChange={(e) => setDij(Number(e.target.value))}
                  className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-white font-mono text-xs"
                />
              </div>
            </div>

            {/* Condition Verification Feedback */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div className={clsx('p-3 rounded-xl border', cond1 ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300' : 'bg-rose-950/40 border-rose-800 text-rose-300')}>
                Cond 1: E_i == L_i ({ei} vs {li}) ➔ {cond1 ? 'PASSED ✅' : 'FAILED ❌'}
              </div>
              <div className={clsx('p-3 rounded-xl border', cond2 ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300' : 'bg-rose-950/40 border-rose-800 text-rose-300')}>
                Cond 2: E_j == L_j ({ej} vs {lj}) ➔ {cond2 ? 'PASSED ✅' : 'FAILED ❌'}
              </div>
              <div className={clsx('p-3 rounded-xl border', cond3 ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300' : 'bg-rose-950/40 border-rose-800 text-rose-300')}>
                Cond 3: E_j − E_i == d ({ej - ei} vs {dij}) ➔ {cond3 ? 'PASSED ✅' : 'FAILED ❌'}
              </div>
            </div>

            {/* Final Diagnosis Banner */}
            <div className={clsx('p-4 rounded-xl border flex flex-col space-y-1', isCritical ? 'bg-emerald-950/60 border-emerald-600 text-emerald-200' : isFalseCriticalityTrap ? 'bg-amber-950/60 border-amber-600 text-amber-200' : 'bg-slate-900 border-slate-800 text-slate-300')}>
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm">
                  {isCritical ? '⭐ CERTIFIED CRITICAL ACTIVITY (TF = 0)' : isFalseCriticalityTrap ? '⚠️ FALSE-CRITICALITY TRAP DETECTED!' : 'ℹ️ NON-CRITICAL ACTIVITY'}
                </span>
                <span className="font-mono text-xs font-bold">Total Float = {totalFloat} Days</span>
              </div>
              <p className="text-xs">
                {isCritical
                  ? 'All 3 invariant conditions hold. Zero total float; any delay directly delays the project deadline!'
                  : isFalseCriticalityTrap
                  ? `Nodes are both critical milestones, but activity duration (d=${dij}) is shorter than interval (${ej - ei}), creating ${totalFloat} days of buffer float!`
                  : 'Total float is positive; activity can absorb delays without impacting the project completion date.'}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: 8-Activity Manifest */}
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
                Complete 8-Activity Classification Manifest
              </h2>
            </div>

            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold font-sans">
                    <th className="p-2.5">Task</th>
                    <th className="p-2.5">Nodes</th>
                    <th className="p-2.5">Duration</th>
                    <th className="p-2.5">ES</th>
                    <th className="p-2.5">EF</th>
                    <th className="p-2.5">LS</th>
                    <th className="p-2.5">LF</th>
                    <th className="p-2.5 text-amber-300">Total Float</th>
                    <th className="p-2.5 text-rose-400 font-sans">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {activityManifest.map((row, idx) => (
                    <tr key={idx} className={clsx(row.tf === 0 ? 'bg-rose-950/20' : '')}>
                      <td className="p-2.5 font-bold text-white font-sans">{row.name}</td>
                      <td className="p-2.5 text-slate-400">{row.nodes}</td>
                      <td className="p-2.5 text-white font-bold">{row.d}</td>
                      <td className="p-2.5 text-cyan-300">{row.es}</td>
                      <td className="p-2.5 text-cyan-300">{row.ef}</td>
                      <td className="p-2.5 text-purple-300">{row.ls}</td>
                      <td className="p-2.5 text-purple-300">{row.lf}</td>
                      <td className={clsx('p-2.5 font-bold', row.tf === 0 ? 'text-rose-400' : 'text-emerald-400')}>
                        {row.tf} Days
                      </td>
                      <td className={clsx('p-2.5 font-bold font-sans', row.tf === 0 ? 'text-rose-400' : 'text-slate-400')}>
                        {row.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 4: Criticality & Trap SVG */}
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
                Critical Activity & False-Criticality Trap Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 180"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Critical Activity Arc */}
                <circle cx="80" cy="50" r="22" fill="#1e293b" stroke="#34d399" strokeWidth="2" />
                <text x="80" y="47" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">2</text>
                <text x="80" y="62" fill="#34d399" fontSize="9" fontFamily="monospace" textAnchor="middle">E=5,L=5</text>

                <line x1="102" y1="50" x2="318" y2="50" stroke="#f43f5e" strokeWidth="3" />
                <polygon points="318,50 308,45 308,55" fill="#f43f5e" />
                <text x="210" y="40" fill="#f43f5e" fontSize="11" fontWeight="bold" textAnchor="middle">Critical Task C (d=6, TF=0)</text>

                <circle cx="340" cy="50" r="22" fill="#1e293b" stroke="#34d399" strokeWidth="2" />
                <text x="340" y="47" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">4</text>
                <text x="340" y="62" fill="#34d399" fontSize="9" fontFamily="monospace" textAnchor="middle">E=11,L=11</text>

                {/* False Criticality Trap Arc */}
                <circle cx="80" cy="130" r="22" fill="#1e293b" stroke="#34d399" strokeWidth="2" />
                <text x="80" y="127" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">2</text>
                <text x="80" y="142" fill="#34d399" fontSize="9" fontFamily="monospace" textAnchor="middle">E=5,L=5</text>

                <line x1="102" y1="130" x2="558" y2="130" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5" />
                <polygon points="558,130 548,125 548,135" fill="#f59e0b" />
                <text x="330" y="120" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">Non-Critical Bypass (d=8, TF=6 Days!)</text>

                <circle cx="580" cy="130" r="22" fill="#1e293b" stroke="#34d399" strokeWidth="2" />
                <text x="580" y="127" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">6</text>
                <text x="580" y="142" fill="#34d399" fontSize="9" fontFamily="monospace" textAnchor="middle">E=19,L=19</text>
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 5: Bengal Case Studies */}
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
                Bengal Operations Research Critical Activity Case Studies
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
                  <p className="text-rose-400 font-semibold">💡 <strong>Operations Takeaway:</strong> {cs.lesson}</p>
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
                  trap: 'Falling into the False-Criticality Trap',
                  fix: 'Never conclude an activity is critical solely because its tail and head events have zero slack; always verify Condition 3: E_j − E_i = d_ij.',
                },
                {
                  trap: 'Crashing Non-Critical Activities',
                  fix: 'Crashing a task with positive Total Float only wastes capital; project duration is only compressed by crashing critical activities.',
                },
                {
                  trap: 'Assuming Free Float can be Non-Zero when Total Float is Zero',
                  fix: 'Because TF ≥ FF ≥ IF ≥ 0, if Total Float is zero, Free Float and Independent Float MUST also equal zero.',
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
                  Think of critical activities as a chain of taught ropes: there is no slack whatsoever! Pulling or delaying any link pulls the entire project deadline with it.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how Condition 3 protects you against the False-Criticality Trap: the activity duration must exactly bridge the gap between event milestone times!
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
                'Defined Critical Activity (TF = 0, zero buffer)',
                'Verified Condition 1: E_i = L_i (Tail event critical)',
                'Verified Condition 2: E_j = L_j (Head event critical)',
                'Verified Condition 3: E_j − E_i = d_ij (Duration condition)',
                'Understood and avoided the False-Criticality Trap',
                'Computed Total Float: TF = LS − ES = LF − EF',
                'Verified that Free Float = 0 and Independent Float = 0 for critical tasks',
                'Stated project budgets and crashing costs in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: Critical Activities are the heartbeat of project control! Remember: an activity is critical if and only if Total Float is ZERO. Beware of the False-Criticality Trap: always test Condition 3 (E_j − E_i = d_ij). In our next topic (Topic 9), we will connect these critical activities to master the Critical Path!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Critical Activities FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Critical Activities (CPM & PERT)"
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
