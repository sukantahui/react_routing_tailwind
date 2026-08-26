// src/components/study/quantitative-analysis/topics/004_001_critical-path-method-and-pert/Topic9.jsx
// React 19 Function-based Component
// Module: 004_001_critical-path-method-and-pert
// Topic 9: Critical path

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

  // Dynamic Path Duration Simulator State
  const [durA, setDurA] = useState(5);
  const [durB, setDurB] = useState(4);
  const [durC, setDurC] = useState(6);
  const [durD, setDurD] = useState(7);
  const [durE, setDurE] = useState(3);
  const [durF, setDurF] = useState(8);
  const [durG, setDurG] = useState(4);
  const [durH, setDurH] = useState(5);

  const path1Dur = Number(durA) + Number(durC) + Number(durF) + Number(durH);
  const path2Dur = Number(durB) + Number(durD) + Number(durF) + Number(durH);
  const path3Dur = Number(durA) + Number(durE) + Number(durG) + Number(durH);

  const maxProjectDur = Math.max(path1Dur, path2Dur, path3Dur);

  const isPath1Crit = path1Dur === maxProjectDur;
  const isPath2Crit = path2Dur === maxProjectDur;
  const isPath3Crit = path3Dur === maxProjectDur;

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
      title: '1. Foundry Furnace Dual Critical Path Management (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Identified two co-critical paths (24 days each) during a blast furnace overhaul in Barrackpore, coordinating refractory curing and electrical cabling in parallel.',
      lesson: 'Dual critical paths require simultaneous managerial oversight across both branches.',
    },
    {
      title: '2. Cold-Chain Vaccine Facility Subcritical Monitoring (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Tracked a subcritical refrigeration pipe branch (TF = 2 days) in Kolkata, preventing customs clearance delays from converting it into an unexpected bottleneck.',
      lesson: 'Near-critical subcritical paths must be monitored as aggressively as critical paths.',
    },
    {
      title: '3. Supermarket FMCG Conveyor Critical Path Crashing (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Crashed the 16-day conveyor critical path in Ichapur down to 13 days by expediting tasks with the lowest cost slope in ₹/day, saving ₹40,000 in monthly warehouse rent.',
      lesson: 'Project crashing shortens the critical path to minimize combined direct and indirect costs.',
    },
    {
      title: '4. Educational High-Tech Lab Multi-Path Grant Audit (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Presented a certified multi-path analysis to university auditors in Jadavpur, proving that all 3 laboratory installation work streams satisfied the ₹55 Lakh grant timeline.',
      lesson: 'Rigorous multi-path documentation provides clear audit trails for government grants.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes pathGlow {
          0%, 100% { border-color: rgba(244, 63, 94, 0.3); }
          50% { border-color: rgba(244, 63, 94, 0.8); }
        }
        .glow-path {
          animation: pathGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-rose-950/80 text-rose-400 border border-rose-800/60">
              Segment 4 • Module 004_001 • Topic 9
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-rose-950/80 text-rose-400 border border-rose-800/60">
              Longest Path Paradox • Co-Critical Chains • Dynamic Path Shifting
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Critical Path
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive study of the <span className="text-rose-400 font-semibold">Critical Path</span>: understanding why the <span className="text-amber-400 font-semibold">longest path dictates the minimum project duration</span>, managing <span className="text-purple-400 font-semibold">Multiple Co-Critical Paths</span>, monitoring <span className="text-cyan-400 font-semibold">Subcritical Buffer Paths</span>, and controlling budgets in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'path-principles', label: '1. Critical Path Principles' },
              { id: 'path-simulator', label: '2. Multi-Path Simulator' },
              { id: 'path-manifest', label: '3. Multi-Path Manifest' },
              { id: 'svg-paths', label: '4. Critical Path Network SVG' },
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
              &gt;
                {item.label}
              </button>
            ))}
          </div>
        </header>

        {/* SECTION 1: Critical Path Principles */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-600/20 text-rose-400 font-bold text-sm">
                01
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                The 5 Fundamental Properties of the Critical Path
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-rose-300 font-bold">1. Longest Sequential Chain</span>
                <p className="text-slate-300">Determines the minimum duration in which the project can finish.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-rose-300 font-bold">2. Zero Float & Slack</span>
                <p className="text-slate-300">Every activity on the path has TF = 0, FF = 0, and IF = 0.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-amber-300 font-bold">3. Co-Critical Paths</span>
                <p className="text-slate-300">Multiple parallel paths sharing the same max duration.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-bold">4. Subcritical Vigilance</span>
                <p className="text-slate-300">Near-critical paths (TF ≤ 2d) can become critical if delayed.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-purple-300 font-bold">5. Dynamic Path Shifting</span>
                <p className="text-slate-300">Crashing or delays shift the critical path to parallel branches.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-emerald-300 font-bold">6. Crashing Focus</span>
                <p className="text-slate-300">Only crashing critical paths shortens overall project duration.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Multi-Path Simulator */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-path">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-600/20 text-rose-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Multi-Path Criticality & Duration Simulator
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Adjust activity durations to see how the Critical Path dynamically shifts across the network:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <label className="text-[11px] font-semibold text-sky-400">Task A (1➔2):</label>
                <input
                  type="number"
                  value={durA}
                  onChange={(e) => setDurA(Number(e.target.value))}
                  className="px-2 py-1 bg-slate-900 border border-slate-700 text-white font-mono text-xs rounded"
                /&gt;
              </div>

              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <label className="text-[11px] font-semibold text-sky-400">Task B (1➔3):</label>
                <input
                  type="number"
                  value={durB}
                  onChange={(e) => setDurB(Number(e.target.value))}
                  className="px-2 py-1 bg-slate-900 border border-slate-700 text-white font-mono text-xs rounded"
                /&gt;
              </div>

              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <label className="text-[11px] font-semibold text-purple-400">Task C (2➔4):</label>
                <input
                  type="number"
                  value={durC}
                  onChange={(e) => setDurC(Number(e.target.value))}
                  className="px-2 py-1 bg-slate-900 border border-slate-700 text-white font-mono text-xs rounded"
                /&gt;
              </div>

              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <label className="text-[11px] font-semibold text-purple-400">Task D (3➔4):</label>
                <input
                  type="number"
                  value={durD}
                  onChange={(e) => setDurD(Number(e.target.value))}
                  className="px-2 py-1 bg-slate-900 border border-slate-700 text-white font-mono text-xs rounded"
                /&gt;
              </div>

              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <label className="text-[11px] font-semibold text-cyan-400">Task E (2➔5):</label>
                <input
                  type="number"
                  value={durE}
                  onChange={(e) => setDurE(Number(e.target.value))}
                  className="px-2 py-1 bg-slate-900 border border-slate-700 text-white font-mono text-xs rounded"
                /&gt;
              </div>

              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <label className="text-[11px] font-semibold text-emerald-400">Task F (4➔6):</label>
                <input
                  type="number"
                  value={durF}
                  onChange={(e) => setDurF(Number(e.target.value))}
                  className="px-2 py-1 bg-slate-900 border border-slate-700 text-white font-mono text-xs rounded"
                /&gt;
              </div>

              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <label className="text-[11px] font-semibold text-cyan-400">Task G (5➔6):</label>
                <input
                  type="number"
                  value={durG}
                  onChange={(e) => setDurG(Number(e.target.value))}
                  className="px-2 py-1 bg-slate-900 border border-slate-700 text-white font-mono text-xs rounded"
                /&gt;
              </div>

              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <label className="text-[11px] font-semibold text-emerald-400">Task H (6➔7):</label>
                <input
                  type="number"
                  value={durH}
                  onChange={(e) => setDurH(Number(e.target.value))}
                  className="px-2 py-1 bg-slate-900 border border-slate-700 text-white font-mono text-xs rounded"
                /&gt;
              </div>
            </div>

            {/* Path Duration Analysis Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm font-mono">
              <div className={clsx('p-4 rounded-xl border flex flex-col space-y-1', isPath1Crit ? 'bg-rose-950/50 border-rose-600 text-rose-200' : 'bg-slate-950 border-slate-800 text-slate-300')}>
                <span className="font-bold text-sm">Path 1: A ➔ C ➔ F ➔ H</span>
                <span className="text-base font-bold">Duration = {path1Dur} Days</span>
                <span className="text-xs">{isPath1Crit ? '⭐ CRITICAL PATH (TF = 0)' : `Float = ${maxProjectDur - path1Dur} Days`}</span>
              </div>

              <div className={clsx('p-4 rounded-xl border flex flex-col space-y-1', isPath2Crit ? 'bg-rose-950/50 border-rose-600 text-rose-200' : 'bg-slate-950 border-slate-800 text-slate-300')}>
                <span className="font-bold text-sm">Path 2: B ➔ D ➔ F ➔ H</span>
                <span className="text-base font-bold">Duration = {path2Dur} Days</span>
                <span className="text-xs">{isPath2Crit ? '⭐ CRITICAL PATH (TF = 0)' : `Float = ${maxProjectDur - path2Dur} Days`}</span>
              </div>

              <div className={clsx('p-4 rounded-xl border flex flex-col space-y-1', isPath3Crit ? 'bg-rose-950/50 border-rose-600 text-rose-200' : 'bg-slate-950 border-slate-800 text-slate-300')}>
                <span className="font-bold text-sm">Path 3: A ➔ E ➔ G ➔ H</span>
                <span className="text-base font-bold">Duration = {path3Dur} Days</span>
                <span className="text-xs">{isPath3Crit ? '⭐ CRITICAL PATH (TF = 0)' : `Float = ${maxProjectDur - path3Dur} Days`}</span>
              </div>
            </div>

            {/* Total Project Duration Banner */}
            <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-600 flex items-center justify-between font-mono">
              <span className="text-emerald-300 font-sans font-bold text-sm">
                CERTIFIED MINIMUM PROJECT DURATION:
              </span>
              <span className="text-emerald-400 font-bold text-xl">{maxProjectDur} Days</span>
            </div>
          </div>
        </section>

        {/* SECTION 3: Multi-Path Manifest */}
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
                Multi-Path Comparison Manifest
              </h2>
            </div>

            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold font-sans">
                    <th className="p-2.5">Path</th>
                    <th className="p-2.5">Node Sequence</th>
                    <th className="p-2.5">Task Sequence</th>
                    <th className="p-2.5 text-cyan-300">Duration</th>
                    <th className="p-2.5 text-amber-300">Path Float</th>
                    <th className="p-2.5 text-rose-400 font-sans">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr className="bg-rose-950/20">
                    <td className="p-2.5 font-bold text-white font-sans">Path 1</td>
                    <td className="p-2.5">1 ➔ 2 ➔ 4 ➔ 6 ➔ 7</td>
                    <td className="p-2.5 text-slate-300">A ➔ C ➔ F ➔ H</td>
                    <td className="p-2.5 text-cyan-300 font-bold">24 Days</td>
                    <td className="p-2.5 text-amber-300 font-bold">0 Days</td>
                    <td className="p-2.5 text-rose-400 font-bold font-sans">CRITICAL ⭐</td>
                  </tr>
                  <tr className="bg-rose-950/20">
                    <td className="p-2.5 font-bold text-white font-sans">Path 2</td>
                    <td className="p-2.5">1 ➔ 3 ➔ 4 ➔ 6 ➔ 7</td>
                    <td className="p-2.5 text-slate-300">B ➔ D ➔ F ➔ H</td>
                    <td className="p-2.5 text-cyan-300 font-bold">24 Days</td>
                    <td className="p-2.5 text-amber-300 font-bold">0 Days</td>
                    <td className="p-2.5 text-rose-400 font-bold font-sans">CO-CRITICAL ⭐</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Path 3</td>
                    <td className="p-2.5">1 ➔ 2 ➔ 5 ➔ 6 ➔ 7</td>
                    <td className="p-2.5 text-slate-300">A ➔ E ➔ G ➔ H</td>
                    <td className="p-2.5 text-cyan-300 font-bold">17 Days</td>
                    <td className="p-2.5 text-emerald-400 font-bold">7 Days</td>
                    <td className="p-2.5 text-slate-400 font-sans">Non-Critical</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 4: Critical Path Network SVG */}
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
                Critical Path & Co-Critical Chain Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 180"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                <circle cx="50" cy="90" r="20" fill="#1e293b" stroke="#f43f5e" strokeWidth="2.5" />
                <text x="50" y="95" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">1</text>

                {/* Path 1 (Critical) */}
                <line x1="70" y1="80" x2="180" y2="45" stroke="#f43f5e" strokeWidth="3" />
                <polygon points="180,45 170,42 174,52" fill="#f43f5e" />
                <text x="125" y="55" fill="#f43f5e" fontSize="9" fontWeight="bold">A (5d)</text>

                <circle cx="200" cy="45" r="20" fill="#1e293b" stroke="#f43f5e" strokeWidth="2.5" />
                <text x="200" y="50" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">2</text>

                {/* Path 2 (Co-Critical) */}
                <line x1="70" y1="100" x2="180" y2="135" stroke="#f43f5e" strokeWidth="3" />
                <polygon points="180,135 174,128 170,138" fill="#f43f5e" />
                <text x="125" y="125" fill="#f43f5e" fontSize="9" fontWeight="bold">B (4d)</text>

                <circle cx="200" cy="135" r="20" fill="#1e293b" stroke="#f43f5e" strokeWidth="2.5" />
                <text x="200" y="140" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">3</text>

                <line x1="220" y1="45" x2="340" y2="80" stroke="#f43f5e" strokeWidth="3" />
                <polygon points="340,80 330,78 334,88" fill="#f43f5e" />

                <line x1="220" y1="135" x2="340" y2="100" stroke="#f43f5e" strokeWidth="3" />
                <polygon points="340,100 334,92 330,102" fill="#f43f5e" />

                <circle cx="360" cy="90" r="20" fill="#1e293b" stroke="#f43f5e" strokeWidth="2.5" />
                <text x="360" y="95" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">4</text>

                <line x1="380" y1="90" x2="520" y2="90" stroke="#f43f5e" strokeWidth="3" />
                <polygon points="520,90 510,85 510,95" fill="#f43f5e" />
                <text x="450" y="80" fill="#f43f5e" fontSize="9" fontWeight="bold">F (8d)</text>

                <circle cx="540" cy="90" r="20" fill="#1e293b" stroke="#f43f5e" strokeWidth="2.5" />
                <text x="540" y="95" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">6</text>

                <line x1="560" y1="90" x2="660" y2="90" stroke="#f43f5e" strokeWidth="3" />
                <polygon points="660,90 650,85 650,95" fill="#f43f5e" />
                <text x="610" y="80" fill="#f43f5e" fontSize="9" fontWeight="bold">H (5d)</text>

                <circle cx="680" cy="90" r="22" fill="#064e3b" stroke="#34d399" strokeWidth="2.5" />
                <text x="680" y="95" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">7</text>
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 5: Bengal Case Studies */}
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
                Bengal Operations Research Critical Path Case Studies
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
                  trap: 'Crashing Only One of Multiple Parallel Co-Critical Paths',
                  fix: 'In multi-critical networks, shortening project duration requires crashing ALL co-critical paths simultaneously.',
                },
                {
                  trap: 'Ignoring Subcritical Paths (Near-Critical Buffers)',
                  fix: 'Subcritical paths can easily become critical if minor delays occur; monitor them continuously.',
                },
                {
                  trap: 'Assuming the Critical Path is Static Throughout Project Execution',
                  fix: 'The critical path dynamically shifts as tasks are completed early, delayed, or crashed.',
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
                  Think of the critical path as the speed-limiting vehicle in a convoy: no matter how fast other vehicles travel on alternative roads, the convoy arrives only when the slowest path completes!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how crashing a critical activity causes subcritical paths to become co-critical, creating multiple parallel bottlenecks!
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
                'Defined Critical Path as the longest continuous path from start to sink',
                'Understood why the longest path dictates the minimum project duration',
                'Computed total path durations across all alternative network routes',
                'Identified single and multiple (co-critical) critical paths',
                'Monitored subcritical (near-critical) paths with small float buffers',
                'Understood dynamic path shifting during project crashing',
                'Stated project financial budgets in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: The Critical Path is the master compass of operations research! Never forget: the longest path dictates the minimum project duration, and crashing requires managing all co-critical chains simultaneously. In our next topic (Topic 10), we will explore Project Duration and Time-Cost Trade-Offs!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Critical Path FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Critical Path (CPM & PERT)"
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
