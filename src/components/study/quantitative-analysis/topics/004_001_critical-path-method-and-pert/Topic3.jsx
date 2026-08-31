// src/components/study/quantitative-analysis/topics/004_001_critical-path-method-and-pert/Topic3.jsx
// React 19 Function-based Component
// Module: 004_001_critical-path-method-and-pert
// Topic 3: Event, node or connector

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic3_files/topic3_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic3_files/topic3_note.txt?raw';

const Topic3 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedEventType, setSelectedEventType] = useState(0);

  // Merge Node Calculator State
  const [path1E, setPath1E] = useState(10);
  const [path1D, setPath1D] = useState(6);

  const [path2E, setPath2E] = useState(8);
  const [path2D, setPath2D] = useState(11);

  const [path3E, setPath3E] = useState(12);
  const [path3D, setPath3D] = useState(5);

  const [downstreamL, setDownstreamL] = useState(25);
  const [downstreamD, setDownstreamD] = useState(6);

  const sum1 = Number(path1E) + Number(path1D);
  const sum2 = Number(path2E) + Number(path2D);
  const sum3 = Number(path3E) + Number(path3D);

  const earliestEj = Math.max(sum1, sum2, sum3);
  const latestLj = Number(downstreamL) - Number(downstreamD);
  const eventSlack = latestLj - earliestEj;
  const isCriticalEvent = eventSlack === 0;

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

  const eventTypes = [
    {
      title: '1. Tail Event (Initial / Start Milestone)',
      badge: 'Indegree = 0',
      badgeColor: 'bg-sky-950 text-sky-300 border-sky-800',
      desc: 'The starting event of a project with NO incoming arrows. By convention, project time begins here (E₁ = 0).',
      example: 'Site Possession & Project Kickoff Milestone (Event 1).',
    },
    {
      title: '2. Head Event (Terminal / Sink Milestone)',
      badge: 'Outdegree = 0',
      badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-800',
      desc: 'The final completion event of a project with NO outgoing arrows. Marks total delivery and handover.',
      example: 'Final Plant Handover & Commercial Launch (Event n).',
    },
    {
      title: '3. Dual-Role Event (Intermediate Milestone)',
      badge: 'Indegree > 0 & Outdegree > 0',
      badgeColor: 'bg-indigo-950 text-indigo-300 border-indigo-800',
      desc: 'Simultaneously marks completion of preceding tasks and commencement of succeeding tasks.',
      example: 'Civil Structure Complete (triggers electrical and plumbing tasks).',
    },
    {
      title: '4. Burst Event (Branching Divergence)',
      badge: 'Outdegree > 1',
      badgeColor: 'bg-amber-950 text-amber-300 border-amber-800',
      desc: 'A single event from which MULTIPLE outgoing activities originate in parallel.',
      example: 'Furnace Foundation Ready (triggers refractory, gas piping, and electrical lines).',
    },
    {
      title: '5. Merge Event (Convergence)',
      badge: 'Indegree > 1',
      badgeColor: 'bg-purple-950 text-purple-300 border-purple-800',
      desc: 'A single event into which MULTIPLE incoming activities converge. Cannot occur until ALL finish.',
      example: 'Pre-Commissioning Inspection (requires civil, mechanical, and safety checks complete).',
    },
    {
      title: '6. Burst-and-Merge Event',
      badge: 'Indegree > 1 & Outdegree > 1',
      badgeColor: 'bg-rose-950 text-rose-300 border-rose-800',
      desc: 'An event where multiple tasks converge and multiple new tasks diverge simultaneously.',
      example: 'Hospital Wing Commissioning (absorbs multiple construction tasks and triggers multiple clinical setups).',
    },
  ];

  const currentEventObj = eventTypes[selectedEventType];

  // Case Studies
  const caseStudies = [
    {
      title: '1. Foundry Furnace Milestone Numbering (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Applied Fulkerson’s rule to number 10 nodes across a Barrackpore blast furnace overhaul, ensuring i < j for all casting tasks and isolating Critical Events 1, 3, 5, 8, 10.',
      lesson: 'Fulkerson numbering enforces topological consistency and eliminates circular dependencies.',
    },
    {
      title: '2. Cold-Chain Vaccine Dispatch Merge Governance (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Managed Merge Event 6 (Hospital Certification) in Kolkata, taking E₆ = max(16, 19, 17) = 19 days to ensure refrigeration, backup power, and safety all converged before vaccine loading.',
      lesson: 'Forward pass maximum selection ensures zero premature milestone sign-offs.',
    },
    {
      title: '3. Supermarket FMCG Warehouse Burst Event Synchronization (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Coordinated Burst Event 4 (Conveyor Delivery) in Ichapur, simultaneously triggering mechanical alignment, optical barcode sensor wiring, and warehouse clerk training.',
      lesson: 'Burst events synchronize parallel contractor work streams from a single milestone.',
    },
    {
      title: '4. Educational High-Tech Lab Terminal Sink Certification (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Tracked Terminal Sink Event 9 in Jadavpur, verifying that E₉ = L₉ = 45 days (Zero Slack) to trigger release of a ₹55 Lakh university research grant completion certificate.',
      lesson: 'Terminal sink zero slack verifies that project was delivered 100% on schedule.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes nodeGlow {
          0%, 100% { border-color: rgba(168, 85, 247, 0.3); }
          50% { border-color: rgba(168, 85, 247, 0.8); }
        }
        .glow-node {
          animation: nodeGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-purple-950/80 text-purple-400 border border-purple-800/60">
              Segment 4 • Module 004_001 • Topic 3
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-purple-950/80 text-purple-400 border border-purple-800/60">
              Event Types • Fulkerson's Rule • E_i & L_i Timing
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
            Event, Node or Connector
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive study of <span className="text-purple-400 font-semibold">Events and Nodes</span> in network models: classifying <span className="text-sky-400 font-semibold">Tail, Head, Dual-Role, Burst, and Merge Events</span>, applying <span className="text-amber-400 font-semibold">Fulkerson’s Node Numbering Algorithm (i &lt; j)</span>, calculating Earliest (<span className="text-cyan-400 font-mono">Eᵢ</span>) and Latest (<span className="text-emerald-400 font-mono">Lᵢ</span>) event times, and managing milestone capital in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'event-taxonomy', label: '1. Event Classifications' },
              { id: 'interactive-explorer', label: '2. Event Type Explorer' },
              { id: 'merge-calculator', label: '3. Merge Node Calculator' },
              { id: 'fulkerson-rule', label: '4. Fulkerson Numbering Rule' },
              { id: 'svg-events', label: '5. Event Topology SVG' },
              { id: 'case-studies', label: '6. Bengal Case Studies' },
              { id: 'pitfalls', label: '7. Common Pitfalls' },
              { id: 'hints', label: '8. Guided Hints' },
              { id: 'checklist', label: '9. Revision Checklist' },
            ].map((item, idx) => (
              <button
                key={item.id}
                onClick={() => {
                  sectionRefs.current[idx]?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={clsx(
                  'px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 border',
                  activeSection === idx
                    ? 'bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-900/40'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </header>

        {/* SECTION 1: Event Classifications */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-600/20 text-purple-400 font-bold text-sm">
                01
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Event Classifications in Network Modeling
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-sky-300 font-bold">1. Tail / Initial Event</span>
                <p className="text-slate-300">Indegree = 0; project start milestone (E₁ = 0).</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-emerald-300 font-bold">2. Head / Sink Event</span>
                <p className="text-slate-300">Outdegree = 0; final project completion milestone.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-indigo-300 font-bold">3. Dual-Role Event</span>
                <p className="text-slate-300">Intermediate milestone (Indegree &gt; 0 & Outdegree &gt; 0).</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-amber-300 font-bold">4. Burst Event</span>
                <p className="text-slate-300">Outdegree &gt; 1; triggers multiple parallel branches.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-purple-300 font-bold">5. Merge Event</span>
                <p className="text-slate-300">Indegree &gt; 1; convergence of multiple incoming tasks.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-rose-300 font-bold">6. Burst-and-Merge</span>
                <p className="text-slate-300">Multiple incoming and multiple outgoing arrows.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Event Type Explorer */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-node">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-600/20 text-purple-400 font-bold text-sm">
                  02
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Interactive Event Type Explorer
                </h2>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {eventTypes.map((et, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedEventType(idx)}
                    className={clsx(
                      'px-2.5 py-1 rounded text-xs font-semibold transition-all border',
                      selectedEventType === idx
                        ? 'bg-purple-600 text-white border-purple-400 shadow-md'
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                    )}
                  >
                    Event {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">{currentEventObj.title}</h3>
              <span className={clsx('px-3 py-1 rounded-full text-xs font-mono font-bold border', currentEventObj.badgeColor)}>
                {currentEventObj.badge}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2 text-xs sm:text-sm">
              <p className="text-slate-200 leading-relaxed">{currentEventObj.desc}</p>
              <div className="pt-2 border-t border-slate-800 text-amber-300 font-mono text-xs">
                🏷️ <strong>Industrial Milestone Example:</strong> {currentEventObj.example}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Merge Node Calculator */}
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
                Interactive Merge Event (Forward Pass) Calculator
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Configure 3 incoming task paths into Merge Node j. The Earliest Event Time is the <strong className="text-emerald-400">MAXIMUM</strong> of all incoming paths:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-2">
                <span className="text-xs font-bold text-sky-400">Incoming Path 1:</span>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={path1E}
                    onChange={(e) => setPath1E(Number(e.target.value))}
                    className="w-1/2 px-2 py-1 bg-slate-900 border border-slate-700 text-white font-mono text-xs rounded"
                    placeholder="E₁"
                  />
                  <input
                    type="number"
                    value={path1D}
                    onChange={(e) => setPath1D(Number(e.target.value))}
                    className="w-1/2 px-2 py-1 bg-slate-900 border border-slate-700 text-white font-mono text-xs rounded"
                    placeholder="d₁"
                  />
                </div>
                <span className="text-[11px] font-mono text-slate-400">Sum = {sum1} Days</span>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-2">
                <span className="text-xs font-bold text-purple-400">Incoming Path 2:</span>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={path2E}
                    onChange={(e) => setPath2E(Number(e.target.value))}
                    className="w-1/2 px-2 py-1 bg-slate-900 border border-slate-700 text-white font-mono text-xs rounded"
                    placeholder="E₂"
                  />
                  <input
                    type="number"
                    value={path2D}
                    onChange={(e) => setPath2D(Number(e.target.value))}
                    className="w-1/2 px-2 py-1 bg-slate-900 border border-slate-700 text-white font-mono text-xs rounded"
                    placeholder="d₂"
                  />
                </div>
                <span className="text-[11px] font-mono text-slate-400">Sum = {sum2} Days</span>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-2">
                <span className="text-xs font-bold text-amber-400">Incoming Path 3:</span>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={path3E}
                    onChange={(e) => setPath3E(Number(e.target.value))}
                    className="w-1/2 px-2 py-1 bg-slate-900 border border-slate-700 text-white font-mono text-xs rounded"
                    placeholder="E₃"
                  />
                  <input
                    type="number"
                    value={path3D}
                    onChange={(e) => setPath3D(Number(e.target.value))}
                    className="w-1/2 px-2 py-1 bg-slate-900 border border-slate-700 text-white font-mono text-xs rounded"
                    placeholder="d₃"
                  />
                </div>
                <span className="text-[11px] font-mono text-slate-400">Sum = {sum3} Days</span>
              </div>
            </div>

            {/* Downstream Path for L_j */}
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs">
              <span className="text-slate-300">Downstream Successor Event (Backward Pass Boundary):</span>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">L_k:</span>
                <input
                  type="number"
                  value={downstreamL}
                  onChange={(e) => setDownstreamL(Number(e.target.value))}
                  className="w-16 px-2 py-1 bg-slate-900 border border-slate-700 text-white font-mono text-xs rounded"
                />
                <span className="text-slate-400">d_jk:</span>
                <input
                  type="number"
                  value={downstreamD}
                  onChange={(e) => setDownstreamD(Number(e.target.value))}
                  className="w-16 px-2 py-1 bg-slate-900 border border-slate-700 text-white font-mono text-xs rounded"
                />
              </div>
            </div>

            {/* Calculated Timing Output */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs sm:text-sm">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-slate-400 font-sans text-xs">Earliest Event Time (E_j):</span>
                <span className="text-emerald-400 font-bold text-base">E_j = max({sum1}, {sum2}, {sum3}) = {earliestEj} Days</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-slate-400 font-sans text-xs">Latest Event Time (L_j):</span>
                <span className="text-purple-300 font-bold text-base">L_j = {downstreamL} − {downstreamD} = {latestLj} Days</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-slate-400 font-sans text-xs">Event Slack (S_j = L_j − E_j):</span>
                <span className={clsx('font-bold text-base', isCriticalEvent ? 'text-rose-400' : 'text-cyan-400')}>
                  S_j = {eventSlack} {isCriticalEvent ? '(CRITICAL EVENT ⭐)' : 'Days'}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Fulkerson Numbering Rule */}
        <section
          ref={(el) => (sectionRefs.current[3] = el)}
          data-index="3"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 font-bold text-sm">
                04
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Fulkerson’s Node Numbering Algorithm (i &lt; j)
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              D.R. Fulkerson (1962) established the universal standard for node labeling to ensure that for every activity arc <span className="font-mono text-cyan-300 font-bold">(i, j)</span>, the starting node number is strictly less than the ending node number (<span className="font-mono text-emerald-400 font-bold">i &lt; j</span>).
            </p>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start space-x-2">
                <span className="text-amber-400 font-bold">Step 1:</span>
                <span>Find initial node with zero incoming arrows (Indegree = 0) and label it '1'.</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-amber-400 font-bold">Step 2:</span>
                <span>Delete all outgoing arrows originating from node '1'.</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-amber-400 font-bold">Step 3:</span>
                <span>Identify newly created nodes with zero incoming arrows and number them consecutively ('2', '3', etc.).</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-amber-400 font-bold">Step 4:</span>
                <span>Repeat until the final terminal sink event is numbered 'n'.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Event Topology SVG */}
        <section
          ref={(el) => (sectionRefs.current[4] = el)}
          data-index="4"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-600/20 text-teal-400 font-bold text-sm">
                05
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Burst and Merge Event Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 200"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Burst Event Example */}
                <circle cx="90" cy="100" r="24" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="90" y="105" fill="#f59e0b" fontSize="13" fontWeight="bold" textAnchor="middle">2</text>
                <text x="90" y="145" fill="#f59e0b" fontSize="10" textAnchor="middle">BURST (Out&gt;1)</text>

                <line x1="114" y1="90" x2="220" y2="50" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="220,50 210,48 215,58" fill="#38bdf8" />
                <text x="170" y="60" fill="#cbd5e1" fontSize="9">Task A</text>

                <line x1="114" y1="110" x2="220" y2="150" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="220,150 215,142 210,152" fill="#38bdf8" />
                <text x="170" y="145" fill="#cbd5e1" fontSize="9">Task B</text>

                {/* Merge Event Example */}
                <circle cx="500" cy="50" r="20" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="500" y="55" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">3</text>

                <circle cx="500" cy="150" r="20" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="500" y="155" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">4</text>

                <line x1="520" y1="55" x2="626" y2="95" stroke="#a855f7" strokeWidth="2" />
                <polygon points="626,95 616,92 620,102" fill="#a855f7" />

                <line x1="520" y1="145" x2="626" y2="105" stroke="#a855f7" strokeWidth="2" />
                <polygon points="626,105 620,98 616,108" fill="#a855f7" />

                <circle cx="650" cy="100" r="24" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
                <text x="650" y="105" fill="#a855f7" fontSize="13" fontWeight="bold" textAnchor="middle">5</text>
                <text x="650" y="145" fill="#a855f7" fontSize="10" textAnchor="middle">MERGE (In&gt;1)</text>
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 6: Bengal Case Studies */}
        <section
          ref={(el) => (sectionRefs.current[5] = el)}
          data-index="5"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 font-bold text-sm">
                06
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Bengal Operations Research Event Case Studies
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
                  <p className="text-purple-300 font-semibold">💡 <strong>Operations Takeaway:</strong> {cs.lesson}</p>
                </div>
              );
            })()}
          </div>
        </section>

        {/* SECTION 7: Common Pitfalls */}
        <section
          ref={(el) => (sectionRefs.current[6] = el)}
          data-index="6"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-600/20 text-rose-400 font-bold text-sm">
                07
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Common Beginner Mistakes
              </h2>
            </div>

            <div className="flex flex-col space-y-2.5">
              {[
                {
                  trap: 'Taking the Minimum Instead of Maximum in the Forward Pass',
                  fix: 'A merge event cannot occur until ALL incoming tasks finish; always take the MAXIMUM: E_j = max(E_i + d_ij).',
                },
                {
                  trap: 'Violating Fulkerson’s Rule (Creating Backward Arrows Where i ≥ j)',
                  fix: 'Re-number nodes systematically so that for every activity (i, j), i < j holds strictly.',
                },
                {
                  trap: 'Assigning Time or Cost to an Event',
                  fix: 'Events are instantaneous milestones with zero duration (d = 0) and zero resource consumption (cost = ₹0).',
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

        {/* SECTION 8: Guided Hints */}
        <section
          ref={(el) => (sectionRefs.current[7] = el)}
          data-index="7"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 font-bold text-sm">
                08
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Guided Hints
              </h2>
            </div>

            <div className="flex flex-col space-y-3">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-amber-300 font-semibold text-sm">💡 Think about…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Think of events as milestone clock chimes: they do not take time to happen, but they signal when one chapter of work closes and the next chapter begins!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how Critical Events have E_i = L_i (Zero Slack): the critical path is simply a chain of zero-slack critical events linked together!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: Revision Checklist */}
        <section
          ref={(el) => (sectionRefs.current[8] = el)}
          data-index="8"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                09
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Student Revision Checklist (Topic 3)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Defined Event / Node / Milestone (d = 0, cost = ₹0)',
                'Classified Tail, Head, Dual-Role, Burst, Merge, and Burst-and-Merge events',
                'Applied Fulkerson’s node numbering algorithm to enforce i < j',
                'Computed Earliest Event Time via Forward Pass: E_j = max(E_i + d_ij)',
                'Computed Latest Event Time via Backward Pass: L_i = min(L_j − d_ij)',
                'Computed Event Slack: S_i = L_i − E_i and identified Critical Events (S_i = 0)',
                'Stated milestone financial investments in Indian Rupees (₹)',
              ].map((text, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-800/40 border border-slate-700/60 flex items-center space-x-3">
                  <span className="text-emerald-400">✅</span>
                  <span className="text-xs sm:text-sm text-slate-300">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 10: Teacher's Note */}
        <section className="flex flex-col space-y-6">
          <Teacher
            note={
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: Events and Nodes are the mathematical skeleton of every project network! Remember: Forward pass takes the MAXIMUM at merge nodes, Backward pass takes the MINIMUM at burst nodes, and Fulkerson's rule guarantees i < j. In our next topic (Topic 4), we will combine activities and events to master Network and Arrow Diagrams!"
            }
          />
        </section>

        {/* SECTION 11: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Event, Node or Connector FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 12: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Event, Node or Connector (CPM & PERT)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic4_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic3;
