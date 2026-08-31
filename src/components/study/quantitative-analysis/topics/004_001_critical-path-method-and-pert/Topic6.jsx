// src/components/study/quantitative-analysis/topics/004_001_critical-path-method-and-pert/Topic6.jsx
// React 19 Function-based Component
// Module: 004_001_critical-path-method-and-pert
// Topic 6: Earliest event times

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
  const [forwardStep, setForwardStep] = useState(0); // 0 to 6 (Nodes 1 to 7)

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

  const forwardNodesData = [
    {
      node: 1,
      title: 'Node 1: Base Initialization (Project Start)',
      badge: 'E₁ = 0 Days',
      badgeColor: 'bg-sky-950 text-sky-300 border-sky-800',
      formula: 'E₁ = 0',
      desc: 'The project clock starts at time t = 0 at the initial milestone event.',
      incoming: 'None (Indegree = 0). Start of project work.',
      derivedTimes: 'Activities (1, 2) and (1, 3) both have ES = 0.',
    },
    {
      node: 2,
      title: 'Node 2: Activity (1, 2) Propagation',
      badge: 'E₂ = 5 Days',
      badgeColor: 'bg-indigo-950 text-indigo-300 border-indigo-800',
      formula: 'E₂ = E₁ + d₁₂ = 0 + 5 = 5',
      desc: 'Single incoming activity from Node 1 with duration 5 days.',
      incoming: 'Path: Node 1 ➔ Activity (1, 2) [d = 5].',
      derivedTimes: 'Outgoing (2, 4) and (2, 5) have ES = 5.',
    },
    {
      node: 3,
      title: 'Node 3: Activity (1, 3) Propagation',
      badge: 'E₃ = 4 Days',
      badgeColor: 'bg-indigo-950 text-indigo-300 border-indigo-800',
      formula: 'E₃ = E₁ + d₁₃ = 0 + 4 = 4',
      desc: 'Single incoming activity from Node 1 with duration 4 days.',
      incoming: 'Path: Node 1 ➔ Activity (1, 3) [d = 4].',
      derivedTimes: 'Outgoing (3, 4) has ES = 4.',
    },
    {
      node: 4,
      title: 'Node 4: Merge Event (Max Selection)',
      badge: 'E₄ = 11 Days',
      badgeColor: 'bg-purple-950 text-purple-300 border-purple-800',
      formula: 'E₄ = max(E₂ + d₂₄, E₃ + d₃₄) = max(5 + 6, 4 + 7) = max(11, 11) = 11',
      desc: 'Merge event with two converging paths. Both paths take 11 days.',
      incoming: 'Path A: 5 + 6 = 11 | Path B: 4 + 7 = 11.',
      derivedTimes: 'Outgoing (4, 6) has ES = 11, EF = 11 + 8 = 19.',
    },
    {
      node: 5,
      title: 'Node 5: Activity (2, 5) Propagation',
      badge: 'E₅ = 8 Days',
      badgeColor: 'bg-cyan-950 text-cyan-300 border-cyan-800',
      formula: 'E₅ = E₂ + d₂₅ = 5 + 3 = 8',
      desc: 'Single incoming activity from Node 2 with duration 3 days.',
      incoming: 'Path: Node 2 ➔ Activity (2, 5) [d = 3].',
      derivedTimes: 'Outgoing (5, 6) has ES = 8, EF = 8 + 4 = 12.',
    },
    {
      node: 6,
      title: 'Node 6: Merge Event (Max Selection)',
      badge: 'E₆ = 19 Days',
      badgeColor: 'bg-purple-950 text-purple-300 border-purple-800',
      formula: 'E₆ = max(E₄ + d₄₆, E₅ + d₅₆) = max(11 + 8, 8 + 4) = max(19, 12) = 19',
      desc: 'Convergence node: Path from Node 4 finishes on day 19, while path from Node 5 finishes on day 12. Must wait until day 19!',
      incoming: 'Path from Node 4: 19 Days (Bottleneck!) | Path from Node 5: 12 Days.',
      derivedTimes: 'Outgoing (6, 7) has ES = 19, EF = 19 + 5 = 24.',
    },
    {
      node: 7,
      title: 'Node 7: Terminal Sink Event (Project Duration)',
      badge: 'E₇ = 24 Days (Total Duration ⭐)',
      badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-800',
      formula: 'E₇ = E₆ + d₆₇ = 19 + 5 = 24',
      desc: 'Final terminal completion milestone. Defines certified minimum project duration.',
      incoming: 'Path: Node 6 ➔ Activity (6, 7) [d = 5].',
      derivedTimes: 'Total Minimum Project Duration = E₇ = 24 Days.',
    },
  ];

  const currentNodeObj = forwardNodesData[forwardStep];

  // Case Studies
  const caseStudies = [
    {
      title: '1. Foundry Furnace Forward Pass Schedule (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Evaluated 10 milestone events sequentially in Barrackpore, computing E₁ = 0 to E₁₀ = 28 days to establish the earliest blast furnace relighting date.',
      lesson: 'Forward pass calculations establish the earliest physical timeline for plant overhauls.',
    },
    {
      title: '2. Cold-Chain Vaccine Facility Merge Node Forward Pass (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Calculated E₆ = max(16, 19, 17) = 19 days in Kolkata, ensuring refrigeration, solar backup, and safety all converged before vaccine loading.',
      lesson: 'Merge maxima prevent premature deployment of temperature-sensitive medical goods.',
    },
    {
      title: '3. Supermarket FMCG Conveyor Earliest Start Matrix (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Computed ES and EF values across 12 conveyor assembly tasks in Ichapur, anchoring optical barcode scanner calibration to E₄ = 14 days.',
      lesson: 'Earliest start times allow suppliers to deliver delicate electronics just-in-time.',
    },
    {
      title: '4. Educational Robotics Lab Milestone Grant Disbursement (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Mapped earliest event times E₁ through E₉ in Jadavpur, linking each Eⱼ to specific capital tranche disbursements under a ₹55 Lakh research grant.',
      lesson: 'Government funding disbursements require audited earliest event time schedules.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes fwdGlow {
          0%, 100% { border-color: rgba(56, 189, 248, 0.3); }
          50% { border-color: rgba(56, 189, 248, 0.8); }
        }
        .glow-fwd {
          animation: fwdGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Segment 4 • Module 004_001 • Topic 6
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Forward Pass Recursion • Merge Maxima • ES & EF Boundaries
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
            Earliest Event Times
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A microscopic study of <span className="text-sky-400 font-semibold">Earliest Event Times (Eᵢ / T_E)</span> via the Forward Pass: base initialization (<span className="text-cyan-400 font-mono">E₁ = 0</span>), the mathematical justification for <span className="text-amber-400 font-semibold">MAXIMUM selection at merge events</span> (<span className="text-emerald-400 font-mono">E_j = max [E_i + d_ij]</span>), and deriving <span className="text-purple-400 font-semibold">Earliest Start (ES)</span> and <span className="text-emerald-400 font-semibold">Earliest Finish (EF)</span> activity bounds in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'forward-concept', label: '1. Forward Pass Principles' },
              { id: 'interactive-stepper', label: '2. Node-by-Node Stepper' },
              { id: 'timing-manifest', label: '3. Earliest Time Manifest' },
              { id: 'svg-forward', label: '4. Forward Pass SVG' },
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

        {/* SECTION 1: Forward Pass Principles */}
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
                Forward Pass Mathematical Formulation
              </h2>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2 font-mono text-xs sm:text-sm">
              <span className="text-sky-300 font-bold font-sans text-base">Mathematical Algorithm:</span>
              <p className="text-white">
                1. Base Initialization: &nbsp; <span className="text-cyan-300 font-bold">E₁ = 0</span><br />
                2. Recursive Propagation: &nbsp; <span className="text-emerald-400 font-bold">E_j = max&#123; E_i + d_ij &#125; &nbsp; ∀ (i, j) ∈ Incoming(j)</span><br />
                3. Total Project Duration: &nbsp; <span className="text-amber-400 font-bold">Duration = E_n</span>
              </p>
              <div className="pt-2 border-t border-slate-800 text-slate-300 font-sans text-xs">
                <strong>Why Maximum?</strong> Because a milestone represents the completion of ALL prerequisite tasks; it cannot occur until the longest incoming path reaches it.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Node-by-Node Stepper */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-fwd">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                  02
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Interactive Node-by-Node Forward Pass Stepper
                </h2>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {forwardNodesData.map((nd, idx) => (
                  <button
                    key={idx}
                    onClick={() => setForwardStep(idx)}
                    className={clsx(
                      'px-2.5 py-1 rounded text-xs font-semibold transition-all border',
                      forwardStep === idx
                        ? 'bg-sky-600 text-white border-sky-400 shadow-md'
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                    )}
                  >
                    Node {nd.node}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">{currentNodeObj.title}</h3>
              <span className={clsx('px-3 py-1 rounded-full text-xs font-mono font-bold border', currentNodeObj.badgeColor)}>
                {currentNodeObj.badge}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2 text-xs sm:text-sm">
              <div className="p-2.5 rounded-lg bg-slate-900 text-emerald-300 font-mono text-xs border border-slate-800">
                {currentNodeObj.formula}
              </div>
              <p className="text-slate-300 pt-1">{currentNodeObj.desc}</p>
              <div className="pt-2 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-xs">
                <span className="text-amber-300">📥 <strong>Incoming Analysis:</strong> {currentNodeObj.incoming}</span>
                <span className="text-cyan-300 font-mono">{currentNodeObj.derivedTimes}</span>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setForwardStep((prev) => (prev > 0 ? prev - 1 : 6))}
                className="px-3.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 text-xs font-semibold"
              >
                ◀ Previous Node
              </button>
              <button
                onClick={() => setForwardStep((prev) => (prev < 6 ? prev + 1 : 0))}
                className="px-3.5 py-1.5 rounded-lg bg-sky-600 text-white border border-sky-500 hover:bg-sky-500 text-xs font-semibold"
              >
                Next Node ▶
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 3: Earliest Time Manifest */}
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
                7-Node Forward Pass Schedule Manifest
              </h2>
            </div>

            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold font-sans">
                    <th className="p-2.5">Node</th>
                    <th className="p-2.5">Event Description</th>
                    <th className="p-2.5 text-cyan-300">Incoming Paths</th>
                    <th className="p-2.5 text-emerald-300">Earliest Event Time (E_j)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {forwardNodesData.map((row, idx) => (
                    <tr key={idx}>
                      <td className="p-2.5 font-bold text-white font-sans">Node {row.node}</td>
                      <td className="p-2.5 font-sans">{row.title.split(':')[1]}</td>
                      <td className="p-2.5 text-cyan-300 text-xs">{row.incoming}</td>
                      <td className="p-2.5 text-emerald-400 font-bold">{row.badge}</td>
                    </tr>
                  ))}
                  <tr className="bg-slate-900/60 text-white font-bold">
                    <td colSpan="3" className="p-3 text-right font-sans text-emerald-300">
                      CERTIFIED MINIMUM TOTAL PROJECT DURATION (E₇):
                    </td>
                    <td className="p-3 text-emerald-400 text-base">24 Days</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 4: Forward Pass SVG */}
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
                Forward Pass Propagation & Merge Maxima Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 180"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                <circle cx="50" cy="90" r="22" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="50" y="85" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">1</text>
                <text x="50" y="102" fill="#34d399" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">E=0</text>

                <line x1="72" y1="80" x2="178" y2="45" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="178,45 168,42 172,52" fill="#38bdf8" />
                <text x="125" y="55" fill="#cbd5e1" fontSize="9">A (d=5)</text>

                <circle cx="200" cy="45" r="22" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="200" y="40" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">2</text>
                <text x="200" y="57" fill="#34d399" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">E=5</text>

                <line x1="72" y1="100" x2="178" y2="135" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="178,135 172,128 168,138" fill="#38bdf8" />
                <text x="125" y="125" fill="#cbd5e1" fontSize="9">B (d=4)</text>

                <circle cx="200" cy="135" r="22" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="200" y="130" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">3</text>
                <text x="200" y="147" fill="#34d399" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">E=4</text>

                <line x1="222" y1="45" x2="338" y2="80" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="338,80 328,78 332,88" fill="#38bdf8" />

                <line x1="222" y1="135" x2="338" y2="100" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="338,100 332,92 328,102" fill="#38bdf8" />

                <circle cx="360" cy="90" r="24" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
                <text x="360" y="85" fill="#a855f7" fontSize="11" fontWeight="bold" textAnchor="middle">4</text>
                <text x="360" y="102" fill="#34d399" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">E=11</text>

                <line x1="384" y1="90" x2="516" y2="90" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="516,90 506,85 506,95" fill="#38bdf8" />
                <text x="450" y="80" fill="#cbd5e1" fontSize="9">Task (d=8)</text>

                <circle cx="540" cy="90" r="24" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="540" y="85" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">6</text>
                <text x="540" y="102" fill="#34d399" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">E=19</text>
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
                Bengal Operations Research Forward Pass Case Studies
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
                  trap: 'Taking the Minimum Instead of Maximum at Merge Nodes in Forward Pass',
                  fix: 'A milestone event cannot occur until ALL incoming tasks finish; always select the MAXIMUM: E_j = max(E_i + d_ij).',
                },
                {
                  trap: 'Setting E_1 to a Non-Zero Number Arbitrarily',
                  fix: 'Standard Forward Pass base condition strictly requires E_1 = 0.',
                },
                {
                  trap: 'Ignoring Dummy Activities in Forward Pass Calculations',
                  fix: 'Dummies have d = 0, but contribute E_tail + 0 to the head event candidate set.',
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
                  Think of the forward pass as water flowing through parallel pipes of different lengths: the basin at the end does not fill until the water from the longest pipe arrives!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully that E_n (the earliest time of the final node) represents the absolute minimum project duration achievable under normal conditions!
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
                'Initialized Forward Pass base condition: E_1 = 0',
                'Computed Earliest Event Times: E_j = max(E_i + d_ij) across all incoming arcs',
                'Derived Earliest Start: ES_ij = E_i',
                'Derived Earliest Finish: EF_ij = E_i + d_ij',
                'Verified that E_n equals total minimum project duration',
                'Stated milestone funding schedules in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: Earliest Event Times are the foundation of all project scheduling! Always start at E_1 = 0, move forward from left to right, and remember: at every merge node, you MUST select the MAXIMUM value because all incoming tasks must be complete. In our next topic (Topic 7), we will master the reverse operation: Latest Event Times via the Backward Pass!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Earliest Event Times FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Earliest Event Times (CPM & PERT)"
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
