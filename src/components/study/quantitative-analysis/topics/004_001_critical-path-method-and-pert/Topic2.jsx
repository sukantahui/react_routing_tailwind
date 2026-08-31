// src/components/study/quantitative-analysis/topics/004_001_critical-path-method-and-pert/Topic2.jsx
// React 19 Function-based Component
// Module: 004_001_critical-path-method-and-pert
// Topic 2: Activity, task or job

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic2_files/topic2_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic2_files/topic2_note.txt?raw';

const Topic2 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedClass, setSelectedClass] = useState(0);

  // Float Calculator State
  const [duration, setDuration] = useState(6);
  const [es, setEs] = useState(10);
  const [lf, setLf] = useState(20);
  const [headEj, setHeadEj] = useState(18);
  const [tailLi, setTailLi] = useState(10);

  const ef = Number(es) + Number(duration);
  const ls = Number(lf) - Number(duration);
  const totalFloat = ls - Number(es);
  const freeFloat = Math.max(0, Number(headEj) - Number(es) - Number(duration));
  const indepFloat = Math.max(0, Number(headEj) - Number(tailLi) - Number(duration));

  const isCritical = totalFloat === 0;

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

  const classifications = [
    {
      title: '1. Predecessor Activity',
      badge: 'Upstream Prerequisite',
      badgeColor: 'bg-sky-950 text-sky-300 border-sky-800',
      desc: 'An activity that must be completed BEFORE a subsequent activity can begin.',
      example: 'Pouring foundation concrete must finish before erecting steel columns.',
    },
    {
      title: '2. Successor Activity',
      badge: 'Downstream Dependent',
      badgeColor: 'bg-indigo-950 text-indigo-300 border-indigo-800',
      desc: 'An activity that cannot begin until one or more predecessor activities have finished.',
      example: 'Roof truss installation can only start after load-bearing walls are cured.',
    },
    {
      title: '3. Concurrent / Parallel Activities',
      badge: 'Simultaneous Execution',
      badgeColor: 'bg-cyan-950 text-cyan-300 border-cyan-800',
      desc: 'Activities that can be performed simultaneously during the same timeframe without direct mutual dependency.',
      example: 'HVAC ducting and electrical conduit wiring executed in parallel.',
    },
    {
      title: '4. Critical Activity',
      badge: 'Zero Total Float (TF = 0)',
      badgeColor: 'bg-rose-950 text-rose-300 border-rose-800',
      desc: 'An activity on the critical path whose total float is zero. Any delay delays the final project finish date 1-to-1.',
      example: 'Main blast furnace refractory brick installation (TF = 0).',
    },
    {
      title: '5. Non-Critical Activity',
      badge: 'Positive Total Float (TF > 0)',
      badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-800',
      desc: 'An activity with positive total float that can absorb delays without impacting the final project deadline.',
      example: 'Administrative office painting (TF = 8 days).',
    },
    {
      title: '6. Dummy Activity',
      badge: 'Fictitious (d = 0, Cost = ₹0)',
      badgeColor: 'bg-amber-950 text-amber-300 border-amber-800',
      desc: 'A zero-duration, zero-cost dashed arrow in AOA networks used solely to enforce logical precedence or maintain unique event numbering.',
      example: 'Zero-time dashed line connecting parallel foundation inspections.',
    },
  ];

  const currentClassObj = classifications[selectedClass];

  // Case Studies
  const caseStudies = [
    {
      title: '1. Foundry Blast Furnace Refractory Lining (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Classified refractory bricklaying in Barrackpore as a critical activity (TF = 0, budget ₹1.8 Lakhs) and cooling fan inspection as non-critical (TF = 5 days), ensuring plant uptime.',
      lesson: 'Isolating critical activities focuses managerial oversight where delays cannot be tolerated.',
    },
    {
      title: '2. Cold-Chain Vaccine Facility Concurrent Cabling (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Scheduled compressor assembly and solar backup electrical cabling concurrently in Kolkata, compressing clinic readiness by 15 calendar days.',
      lesson: 'Maximizing concurrent activities reduces overall project duration without extra capital expenditure.',
    },
    {
      title: '3. Supermarket FMCG Conveyor Dummy Disambiguation (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Used a zero-cost dummy activity in an AOA diagram in Ichapur to ensure motor calibration depended on wiring, while sorting software depended only on server installation.',
      lesson: 'Dummy activities prevent logical ambiguity in complex Activity-on-Arrow network diagrams.',
    },
    {
      title: '4. Educational Robotics Lab Precedence Schedule (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Built an activity precedence schedule for a ₹55 Lakh university research laboratory in Jadavpur, calculating free floats for bench fabrication (FF = 3 days).',
      lesson: 'Free float analysis enables smooth contractor coordination without impacting subsequent teams.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes actGlow {
          0%, 100% { border-color: rgba(56, 189, 248, 0.3); }
          50% { border-color: rgba(56, 189, 248, 0.8); }
        }
        .glow-act {
          animation: actGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Segment 4 • Module 004_001 • Topic 2
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Activity Classification • Float Metrics • AOA & AON
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
            Activity, Task or Job
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive study of the fundamental building block in project management: defining <span className="text-sky-400 font-semibold">Activities</span>, classifying predecessors, successors, concurrent, critical, and <span className="text-amber-400 font-semibold">Dummy Activities</span>, calculating <span className="text-emerald-400 font-semibold">Total, Free, and Independent Floats</span>, and managing budgets in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'activity-taxonomy', label: '1. Activity Classifications' },
              { id: 'interactive-classifier', label: '2. Classification Explorer' },
              { id: 'float-calculator', label: '3. Interactive Float Calculator' },
              { id: 'svg-conventions', label: '4. AOA vs AON & Dummy SVG' },
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

        {/* SECTION 1: Activity Classifications */}
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
                Activity Classifications in Project Networks
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-sky-300 font-bold">1. Predecessor Task</span>
                <p className="text-slate-300">Must finish before downstream successor can start.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-indigo-300 font-bold">2. Successor Task</span>
                <p className="text-slate-300">Cannot start until upstream predecessor completes.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-bold">3. Concurrent Tasks</span>
                <p className="text-slate-300">Can be executed in parallel during the same timeframe.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-rose-300 font-bold">4. Critical Task (TF = 0)</span>
                <p className="text-slate-300">Zero float; any delay directly delays project finish.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-emerald-300 font-bold">5. Non-Critical (TF &gt; 0)</span>
                <p className="text-slate-300">Can absorb delays up to available total float.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-amber-300 font-bold">6. Dummy Task (d = 0)</span>
                <p className="text-slate-300">Zero time, zero cost dashed arrow in AOA networks.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Classification Explorer */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-act">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                  02
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Interactive Activity Classification Explorer
                </h2>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {classifications.map((c, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedClass(idx)}
                    className={clsx(
                      'px-2.5 py-1 rounded text-xs font-semibold transition-all border',
                      selectedClass === idx
                        ? 'bg-sky-600 text-white border-sky-400 shadow-md'
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                    )}
                  >
                    Type {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">{currentClassObj.title}</h3>
              <span className={clsx('px-3 py-1 rounded-full text-xs font-mono font-bold border', currentClassObj.badgeColor)}>
                {currentClassObj.badge}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2 text-xs sm:text-sm">
              <p className="text-slate-200 leading-relaxed">{currentClassObj.desc}</p>
              <div className="pt-2 border-t border-slate-800 text-amber-300 font-mono text-xs">
                🔧 <strong>Industrial Example:</strong> {currentClassObj.example}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Interactive Float Calculator */}
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
                Interactive Activity Float & Slack Calculator
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <label className="text-[11px] font-semibold text-slate-400">Duration (d):</label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-white font-mono text-xs"
                />
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <label className="text-[11px] font-semibold text-sky-400">Earliest Start (ES):</label>
                <input
                  type="number"
                  value={es}
                  onChange={(e) => setEs(Number(e.target.value))}
                  className="px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-white font-mono text-xs"
                />
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <label className="text-[11px] font-semibold text-purple-400">Latest Finish (LF):</label>
                <input
                  type="number"
                  value={lf}
                  onChange={(e) => setLf(Number(e.target.value))}
                  className="px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-white font-mono text-xs"
                />
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <label className="text-[11px] font-semibold text-cyan-400">Earliest Head (E_j):</label>
                <input
                  type="number"
                  value={headEj}
                  onChange={(e) => setHeadEj(Number(e.target.value))}
                  className="px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-white font-mono text-xs"
                />
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <label className="text-[11px] font-semibold text-amber-400">Latest Tail (L_i):</label>
                <input
                  type="number"
                  value={tailLi}
                  onChange={(e) => setTailLi(Number(e.target.value))}
                  className="px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-white font-mono text-xs"
                />
              </div>
            </div>

            {/* Calculated Float Output */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 font-mono text-xs sm:text-sm">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-slate-400 font-sans text-xs">Earliest Finish (EF):</span>
                <span className="text-sky-300 font-bold text-base">EF = ES + d = {ef}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-slate-400 font-sans text-xs">Latest Start (LS):</span>
                <span className="text-purple-300 font-bold text-base">LS = LF − d = {ls}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-slate-400 font-sans text-xs">Total Float (TF):</span>
                <span className={clsx('font-bold text-base', isCritical ? 'text-rose-400' : 'text-emerald-400')}>
                  TF = {totalFloat} {isCritical ? '(CRITICAL ⭐)' : 'Days'}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-slate-400 font-sans text-xs">Free & Indep Float:</span>
                <span className="text-amber-300 font-bold">FF = {freeFloat} | IF = {indepFloat}</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: AOA vs AON & Dummy SVG */}
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
                Activity-on-Arrow (AOA) vs Activity-on-Node (AON) Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 200"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* AOA Example */}
                <circle cx="60" cy="70" r="22" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="60" y="75" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">1</text>

                <line x1="82" y1="70" x2="218" y2="70" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="218,70 208,65 208,75" fill="#38bdf8" />
                <text x="150" y="60" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Activity A (d=5)</text>

                <circle cx="240" cy="70" r="22" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="240" y="75" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">2</text>

                {/* Dummy Arrow */}
                <line x1="240" y1="92" x2="240" y2="148" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5" />
                <polygon points="240,148 235,138 245,138" fill="#f59e0b" />
                <text x="275" y="125" fill="#f59e0b" fontSize="10" fontWeight="bold">Dummy (d=0)</text>

                <circle cx="240" cy="170" r="22" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="240" y="175" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle">3</text>

                {/* AON Example Box */}
                <rect x="420" y="45" width="280" height="110" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="560" y="75" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">ACTIVITY-ON-NODE (AON)</text>
                <text x="560" y="105" fill="#ffffff" fontSize="11" fontFamily="monospace" textAnchor="middle">ES: 10 | Task A (d=6) | EF: 16</text>
                <text x="560" y="130" fill="#a7f3d0" fontSize="11" fontFamily="monospace" textAnchor="middle">LS: 14 | Total Float: 4 | LF: 20</text>
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
                Bengal Operations Research Activity Case Studies
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
                  trap: 'Assigning Non-Zero Duration or Non-Zero Cost to Dummy Activities',
                  fix: 'Dummy activities MUST have exactly duration d = 0 and cost = ₹0.',
                },
                {
                  trap: 'Connecting Two Parallel Tasks Between the Exact Same Node Pair in AOA',
                  fix: 'In AOA, every activity must have a unique (i, j) identifier. Use a dummy node and arrow to split parallel tasks.',
                },
                {
                  trap: 'Confusing Total Float with Free Float',
                  fix: 'Total float impacts the final project deadline; free float impacts only the earliest start of immediate successors.',
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
                  Think of activities as consuming real work-energy: they require hours of labor and lakhs of rupees (₹), while dummy activities are pure logical connectors that cost nothing!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully that Total Float ≥ Free Float ≥ Independent Float ≥ 0 always holds in every valid project network!
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
                Student Revision Checklist (Topic 2)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Defined Activity and its 6 major classifications',
                'Understood Dummy activities in AOA diagrams (d = 0, cost = ₹0, dashed arrow)',
                'Computed Earliest Times: ES and EF = ES + d',
                'Computed Latest Times: LF and LS = LF − d',
                'Computed Total Float: TF = LS − ES = LF − EF',
                'Computed Free Float: FF = E_j − E_i − d_ij',
                'Computed Independent Float: IF = max(0, E_j − L_i − d_ij)',
                'Reported project budgets with Indian Rupee (₹) currency symbols',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: mastering activities and their float metrics (Total, Free, Independent) gives you total command over project schedules! Remember: Total Float ≥ Free Float ≥ Independent Float. In our next topic (Topic 3), we will explore the counterpart to activities: Events, Nodes or Connectors!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Activity, Task or Job FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Activity, Task or Job (CPM & PERT)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic3_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic2;
