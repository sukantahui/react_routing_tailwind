// src/components/study/quantitative-analysis/topics/004_001_critical-path-method-and-pert/Topic4.jsx
// React 19 Function-based Component
// Module: 004_001_critical-path-method-and-pert
// Topic 4: Network or arrow diagram

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
  const [constructionStep, setConstructionStep] = useState(0);

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

  const constructionStages = [
    {
      title: 'Stage 1: Precedence Table & Initial Activities',
      badge: 'Start Node 1',
      badgeColor: 'bg-sky-950 text-sky-300 border-sky-800',
      desc: 'Activities A (5 days) and B (4 days) have no predecessors and originate from Initial Event 1.',
      details: 'Node 1 branches out to Node 2 (via A) and Node 3 (via B).',
    },
    {
      title: 'Stage 2: Intermediate Activities & Dummy Precedence',
      badge: 'Dummy Arrow Added',
      badgeColor: 'bg-amber-950 text-amber-300 border-amber-800',
      desc: 'Activity E depends on both A and B. We insert a dashed Dummy Arrow (d = 0, ₹0) from Node 2 to Node 3 to enforce this constraint without parallel node sharing.',
      details: 'Dummy (2 ➔ 3) ensures Activity E receives inputs from both Task A and Task B.',
    },
    {
      title: 'Stage 3: Successor Convergence & Terminal Sink Event',
      badge: 'Single Sink Node 5',
      badgeColor: 'bg-indigo-950 text-indigo-300 border-indigo-800',
      desc: 'Activities C (6 days), D (7 days), and E (3 days) lead into downstream convergence nodes, all culminating at Terminal Sink Event 5.',
      details: 'All paths converge into Node 5 (Outdegree = 0) to avoid any dangling errors.',
    },
    {
      title: 'Stage 4: Complete Network Diagram & Critical Path',
      badge: 'Critical Path = A ➔ C ➔ F (16 Days)',
      badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-800',
      desc: 'The network is fully constructed, satisfying Fulkerson numbering (1 < 2 < 3 < 4 < 5). Longest path is 16 days with zero float.',
      details: 'Project duration = 16 days. Critical path highlighted in emerald.',
    },
  ];

  const currentStageObj = constructionStages[constructionStep];

  // Case Studies
  const caseStudies = [
    {
      title: '1. Foundry Furnace Rebuild Network Diagram (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Synthesized a 14-activity network diagram in Barrackpore, resolving a parallel cooling fan task via a zero-cost dummy arrow and eliminating a dangling test node to lock in a 28-day schedule.',
      lesson: 'Proper network topology guarantees that automated scheduling algorithms find the true critical path.',
    },
    {
      title: '2. Cold-Chain Vaccine Facility Single Sink Validation (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Constructed a 9-node network in Kolkata for deep-freeze storage units, ensuring civil, electrical, and generator lines converged into a single terminal sink event.',
      lesson: 'Single sink validation prevents isolated work streams from delaying final hospital commissioning.',
    },
    {
      title: '3. Supermarket FMCG Conveyor Dummy Disambiguation (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Resolved a complex dependency in Ichapur: task C depended on A and B, while task D depended only on B, correctly placing a dummy arrow from B’s end node to C’s start node.',
      lesson: 'Directional dummy arrows disambiguate multi-task dependencies without adding false constraints.',
    },
    {
      title: '4. Educational High-Tech Lab Fulkerson Numbering Audit (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Audited an 8-activity robotics lab installation in Jadavpur, verifying that all nodes satisfied Fulkerson’s i < j numbering rule across a ₹55 Lakh project budget.',
      lesson: 'Topological node numbering allows straightforward computerized matrix analysis.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes diagGlow {
          0%, 100% { border-color: rgba(56, 189, 248, 0.3); }
          50% { border-color: rgba(56, 189, 248, 0.8); }
        }
        .glow-diag {
          animation: diagGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Segment 4 • Module 004_001 • Topic 4
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Network Construction • 6 Golden Rules • Error Diagnosis
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Network or Arrow Diagram
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A masterclass in synthesizing <span className="text-sky-400 font-semibold">Network and Arrow Diagrams</span>: mastering the <span className="text-amber-400 font-semibold">6 Golden Drawing Rules</span>, eliminating <span className="text-rose-400 font-semibold">Dangling and Looping Errors</span>, placing <span className="text-emerald-400 font-semibold">Dummy Activities</span> with zero cost, and managing project milestones in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'six-rules', label: '1. The 6 Golden Rules' },
              { id: 'interactive-construction', label: '2. Diagram Construction Stepper' },
              { id: 'error-diagnosis', label: '3. Common Network Errors' },
              { id: 'svg-rules', label: '4. Network Rules & Errors SVG' },
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

        {/* SECTION 1: The 6 Golden Rules */}
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
                The 6 Golden Rules of Network Construction
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-sky-300 font-bold">1. Single Start & Sink</span>
                <p className="text-slate-300">Exactly 1 start event (Indegree=0) and 1 sink event (Outdegree=0).</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-emerald-300 font-bold">2. Left-to-Right Flow</span>
                <p className="text-slate-300">Arrows progress chronologically; no backward arrows.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-rose-300 font-bold">3. No Dangling Nodes</span>
                <p className="text-slate-300">Every activity must connect and lead to the terminal sink.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-purple-300 font-bold">4. No Looping / Cycles</span>
                <p className="text-slate-300">Zero closed loops; must remain a Directed Acyclic Graph (DAG).</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-amber-300 font-bold">5. Unique Node Pairs</span>
                <p className="text-slate-300">No two parallel tasks share identical start and end nodes.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-bold">6. Minimize Crossovers</span>
                <p className="text-slate-300">Keep network layout clean; use bridge arcs if lines intersect.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Diagram Construction Stepper */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-diag">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                  02
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Interactive Network Construction Stepper
                </h2>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {constructionStages.map((st, idx) => (
                  <button
                    key={idx}
                    onClick={() => setConstructionStep(idx)}
                    className={clsx(
                      'px-2.5 py-1 rounded text-xs font-semibold transition-all border',
                      constructionStep === idx
                        ? 'bg-sky-600 text-white border-sky-400 shadow-md'
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                    )}
                  >
                    Stage {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">{currentStageObj.title}</h3>
              <span className={clsx('px-3 py-1 rounded-full text-xs font-mono font-bold border', currentStageObj.badgeColor)}>
                {currentStageObj.badge}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2 text-xs sm:text-sm">
              <p className="text-slate-200">{currentStageObj.desc}</p>
              <div className="pt-2 border-t border-slate-800 text-cyan-300 font-mono text-xs">
                🔍 <strong>Topological Action:</strong> {currentStageObj.details}
              </div>
            </div>

            {/* Next/Prev Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setConstructionStep((prev) => (prev > 0 ? prev - 1 : 3))}
                className="px-3.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 text-xs font-semibold"
              >
                ◀ Previous Stage
              </button>
              <button
                onClick={() => setConstructionStep((prev) => (prev < 3 ? prev + 1 : 0))}
                className="px-3.5 py-1.5 rounded-lg bg-sky-600 text-white border border-sky-500 hover:bg-sky-500 text-xs font-semibold"
              >
                Next Stage ▶
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 3: Common Network Errors */}
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
                Diagnosing the 3 Fatal Network Errors
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                <span className="text-rose-400 font-bold">1. Dangling (Dead Ends)</span>
                <p className="text-slate-300 text-xs">
                  Leaving an activity branch disconnected from the terminal sink event.
                </p>
                <span className="text-emerald-400 font-mono text-[11px]">Fix: Connect to final sink node.</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                <span className="text-rose-400 font-bold">2. Looping (Cycles)</span>
                <p className="text-slate-300 text-xs">
                  Drawing circular feedback loops that return to a previously visited node.
                </p>
                <span className="text-emerald-400 font-mono text-[11px]">Fix: Re-structure task flow as DAG.</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                <span className="text-rose-400 font-bold">3. Redundant Dummies</span>
                <p className="text-slate-300 text-xs">
                  Adding unnecessary dummy arrows that clutter the diagram without adding logic.
                </p>
                <span className="text-emerald-400 font-mono text-[11px]">Fix: Remove unnecessary dummy lines.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Network Rules & Errors SVG */}
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
                Network Diagram Rules & Error Topology Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 200"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Valid Diagram Architecture */}
                <circle cx="60" cy="100" r="20" fill="#1e293b" stroke="#34d399" strokeWidth="2" />
                <text x="60" y="105" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">1</text>

                <line x1="80" y1="90" x2="195" y2="50" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="195,50 185,48 190,58" fill="#38bdf8" />

                <line x1="80" y1="110" x2="195" y2="150" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="195,150 190,142 185,152" fill="#38bdf8" />

                <circle cx="215" cy="50" r="20" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="215" y="55" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">2</text>

                <circle cx="215" cy="150" r="20" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="215" y="155" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">3</text>

                {/* Dummy Arrow */}
                <line x1="215" y1="70" x2="215" y2="130" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,4" />
                <polygon points="215,130 210,120 220,120" fill="#f59e0b" />
                <text x="245" y="105" fill="#f59e0b" fontSize="9">Dummy</text>

                <line x1="235" y1="50" x2="350" y2="90" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="350,90 340,88 345,98" fill="#38bdf8" />

                <line x1="235" y1="150" x2="350" y2="110" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="350,110 345,102 340,112" fill="#38bdf8" />

                <circle cx="370" cy="100" r="20" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="370" y="105" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">4</text>

                {/* Error Callouts on the Right */}
                <rect x="440" y="30" width="270" height="140" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="1.5" />
                <text x="575" y="55" fill="#f43f5e" fontSize="12" fontWeight="bold" textAnchor="middle">CRITICAL VALIDATION CHECKS</text>
                <text x="460" y="80" fill="#cbd5e1" fontSize="10">✅ Single Start (Node 1) & Sink (Node 4)</text>
                <text x="460" y="105" fill="#cbd5e1" fontSize="10">✅ No Dangling Dead-End Arcs</text>
                <text x="460" y="130" fill="#cbd5e1" fontSize="10">✅ No Backward Looping Cycles</text>
                <text x="460" y="155" fill="#cbd5e1" fontSize="10">✅ Fulkerson Node Numbering (i &lt; j)</text>
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
                Bengal Operations Research Network Case Studies
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
                  trap: 'Creating Multiple Start Nodes or Multiple Sink Nodes',
                  fix: 'A valid project network MUST have exactly one start event and one terminal sink event.',
                },
                {
                  trap: 'Leaving Dangling Activities (Unconnected Dead Ends)',
                  fix: 'Connect all completed activity paths directly into the terminal sink event.',
                },
                {
                  trap: 'Drawing Circular Feedback Loops (Looping Errors)',
                  fix: 'Project networks must be Directed Acyclic Graphs (DAGs); rework precedence to eliminate cycles.',
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
                  Think of drawing a network diagram like assembling a railway track: trains must start at Station 1 and arrive at the Destination Terminal with no infinite circular loops or derailed dead-ends!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how Dummy activities allow parallel tasks to maintain unique (i, j) node identities without altering the project duration!
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
                Student Revision Checklist (Topic 4)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Mastered the 6 golden rules of network construction',
                'Diagnosed and corrected Dangling errors (isolated nodes)',
                'Diagnosed and corrected Looping/Cycling errors (closed loops)',
                'Handled parallel tasks using dummy activities in AOA diagrams',
                'Enforced Fulkerson’s node numbering algorithm (i < j)',
                'Verified single start event (Indegree = 0) and single sink event (Outdegree = 0)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: Network and Arrow Diagrams are the visual language of modern engineering and operations! Always check your 6 golden rules: 1 start, 1 sink, left-to-right flow, no dangling, no loops, and unique node pairs via dummies. In our next topic (Topic 5), we will explore the complete Working Methodology of Critical Path Analysis!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Network or Arrow Diagram FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Network or Arrow Diagram (CPM & PERT)"
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
