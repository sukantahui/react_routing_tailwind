// src/components/study/quantitative-analysis/topics/004_001_critical-path-method-and-pert/Topic7.jsx
// React 19 Function-based Component
// Module: 004_001_critical-path-method-and-pert
// Topic 7: Latest event times

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic7_files/topic7_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic7_files/topic7_note.txt?raw';

const Topic7 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [backwardStep, setBackwardStep] = useState(0); // 0 to 6 (Nodes 7 down to 1)

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

  const backwardNodesData = [
    {
      node: 7,
      title: 'Node 7: Terminal Sink Initialization',
      badge: 'L₇ = 24 Days',
      badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-800',
      formula: 'L₇ = E₇ = 24',
      desc: 'Anchor the latest completion time of the project to its earliest finish time.',
      outgoing: 'None (Outdegree = 0). Terminal project handover.',
      slack: 'S₇ = L₇ − E₇ = 24 − 24 = 0 (CRITICAL ⭐)',
    },
    {
      node: 6,
      title: 'Node 6: Activity (6, 7) Backward Pass',
      badge: 'L₆ = 19 Days',
      badgeColor: 'bg-indigo-950 text-indigo-300 border-indigo-800',
      formula: 'L₆ = L₇ − d₆₇ = 24 − 5 = 19',
      desc: 'Single outgoing activity to Node 7 with duration 5 days.',
      outgoing: 'Path to Node 7: 24 − 5 = 19 Days.',
      slack: 'S₆ = L₆ − E₆ = 19 − 19 = 0 (CRITICAL ⭐)',
    },
    {
      node: 5,
      title: 'Node 5: Activity (5, 6) Backward Pass',
      badge: 'L₅ = 15 Days',
      badgeColor: 'bg-purple-950 text-purple-300 border-purple-800',
      formula: 'L₅ = L₆ − d₅₆ = 19 − 4 = 15',
      desc: 'Single outgoing activity to Node 6 with duration 4 days.',
      outgoing: 'Path to Node 6: 19 − 4 = 15 Days.',
      slack: 'S₅ = L₅ − E₅ = 15 − 8 = 7 Days (NON-CRITICAL)',
    },
    {
      node: 4,
      title: 'Node 4: Activity (4, 6) Backward Pass',
      badge: 'L₄ = 11 Days',
      badgeColor: 'bg-indigo-950 text-indigo-300 border-indigo-800',
      formula: 'L₄ = L₆ − d₄₆ = 19 − 8 = 11',
      desc: 'Single outgoing activity to Node 6 with duration 8 days.',
      outgoing: 'Path to Node 6: 19 − 8 = 11 Days.',
      slack: 'S₄ = L₄ − E₄ = 11 − 11 = 0 (CRITICAL ⭐)',
    },
    {
      node: 3,
      title: 'Node 3: Activity (3, 4) Backward Pass',
      badge: 'L₃ = 4 Days',
      badgeColor: 'bg-indigo-950 text-indigo-300 border-indigo-800',
      formula: 'L₃ = L₄ − d₃₄ = 11 − 7 = 4',
      desc: 'Single outgoing activity to Node 4 with duration 7 days.',
      outgoing: 'Path to Node 4: 11 − 7 = 4 Days.',
      slack: 'S₃ = L₃ − E₃ = 4 − 4 = 0 (CRITICAL ⭐)',
    },
    {
      node: 2,
      title: 'Node 2: Burst Event (Min Selection)',
      badge: 'L₂ = 5 Days',
      badgeColor: 'bg-amber-950 text-amber-300 border-amber-800',
      formula: 'L₂ = min(L₄ − d₂₄, L₅ − d₂₅) = min(11 − 6, 15 − 3) = min(5, 12) = 5',
      desc: 'Burst event: Must finish by day 5 to satisfy tight Path to Node 4 (taking day 12 would delay Node 4!).',
      outgoing: 'Path to Node 4: 5 Days (Bottleneck!) | Path to Node 5: 12 Days.',
      slack: 'S₂ = L₂ − E₂ = 5 − 5 = 0 (CRITICAL ⭐)',
    },
    {
      node: 1,
      title: 'Node 1: Start Event Sanity Check (L₁ = 0)',
      badge: 'L₁ = 0 Days (Verified ✅)',
      badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-800',
      formula: 'L₁ = min(L₂ − d₁₂, L₃ − d₁₃) = min(5 − 5, 4 − 4) = min(0, 0) = 0',
      desc: 'Initial project kickoff milestone. L₁ = 0 strictly holds, mathematically verifying network integrity.',
      outgoing: 'Path A: 5 − 5 = 0 | Path B: 4 − 4 = 0.',
      slack: 'S₁ = L₁ − E₁ = 0 − 0 = 0 (CRITICAL ⭐)',
    },
  ];

  const currentNodeObj = backwardNodesData[backwardStep];

  // Case Studies
  const caseStudies = [
    {
      title: '1. Foundry Furnace Backward Pass Verification (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Evaluated 10 milestone events in reverse order in Barrackpore, verifying L₁₀ = 28 down to L₁ = 0 to establish latest allowable firing milestones.',
      lesson: 'Backward pass calculations establish the latest allowable bounds to avoid liquidated damages.',
    },
    {
      title: '2. Cold-Chain Vaccine Facility Burst Node Backward Pass (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Calculated L₂ = min(11 − 6, 15 − 3) = 5 days in Kolkata, ensuring civil foundation work concluded early enough to satisfy tight electrical schedules.',
      lesson: 'Burst minima prevent downstream project bottlenecks in medical infrastructure.',
    },
    {
      title: '3. Supermarket FMCG Conveyor Slack Buffer Governance (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Computed event slacks across 12 conveyor nodes in Ichapur, identifying that Node 5 had S₅ = 7 days of slack, allowing electrician shift rescheduling without overtime.',
      lesson: 'Event slack identifies non-critical buffer zones for flexible labor deployment.',
    },
    {
      title: '4. Educational High-Tech Lab Terminal Grant Compliance (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Confirmed that L₁ = 0 and L₉ = 45 days in Jadavpur, verifying that the ₹55 Lakh university research grant project was completely reconciled without deadline breaches.',
      lesson: 'Zero slack at start and terminal events proves that project schedule was fully balanced.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes bwdGlow {
          0%, 100% { border-color: rgba(168, 85, 247, 0.3); }
          50% { border-color: rgba(168, 85, 247, 0.8); }
        }
        .glow-bwd {
          animation: bwdGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-purple-950/80 text-purple-400 border border-purple-800/60">
              Segment 4 • Module 004_001 • Topic 7
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-purple-950/80 text-purple-400 border border-purple-800/60">
              Backward Pass Recursion • Burst Minima • Event Slack S_i
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
            Latest Event Times
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive study of <span className="text-purple-400 font-semibold">Latest Event Times (Lᵢ / T_L)</span> via the Backward Pass: anchoring terminal sink deadlines (<span className="text-cyan-400 font-mono">L_n = E_n</span>), executing <span className="text-amber-400 font-semibold">MINIMUM selection at burst events</span> (<span className="text-emerald-400 font-mono">L_i = min [L_j − d_ij]</span>), validating <span className="text-sky-400 font-mono">L₁ = 0</span>, and computing <span className="text-emerald-400 font-semibold">Event Slack (Sᵢ = Lᵢ − Eᵢ)</span> in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'backward-concept', label: '1. Backward Pass Principles' },
              { id: 'interactive-stepper', label: '2. Node-by-Node Stepper' },
              { id: 'slack-manifest', label: '3. Event Slack Manifest' },
              { id: 'svg-backward', label: '4. Backward Pass SVG' },
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
                    ? 'bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-900/40'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </header>

        {/* SECTION 1: Backward Pass Principles */}
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
                Backward Pass Mathematical Formulation
              </h2>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2 font-mono text-xs sm:text-sm">
              <span className="text-purple-300 font-bold font-sans text-base">Mathematical Algorithm:</span>
              <p className="text-white">
                1. Base Initialization: &nbsp; <span className="text-cyan-300 font-bold">L_n = E_n</span><br />
                2. Recursive Backward Propagation: &nbsp; <span className="text-emerald-400 font-bold">L_i = min&#123; L_j − d_ij &#125; &nbsp; ∀ (i, j) ∈ Outgoing(i)</span><br />
                3. Sanity Verification: &nbsp; <span className="text-amber-400 font-bold">L₁ MUST = 0</span>
              </p>
              <div className="pt-2 border-t border-slate-800 text-slate-300 font-sans text-xs">
                <strong>Why Minimum?</strong> Because an event triggering multiple outgoing branches must occur early enough to satisfy the tightest, most restrictive downstream deadline.
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
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-bwd">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-600/20 text-purple-400 font-bold text-sm">
                  02
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Interactive Node-by-Node Backward Pass Stepper
                </h2>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {backwardNodesData.map((nd, idx) => (
                  <button
                    key={idx}
                    onClick={() => setBackwardStep(idx)}
                    className={clsx(
                      'px-2.5 py-1 rounded text-xs font-semibold transition-all border',
                      backwardStep === idx
                        ? 'bg-purple-600 text-white border-purple-400 shadow-md'
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
              <div className="p-2.5 rounded-lg bg-slate-900 text-purple-300 font-mono text-xs border border-slate-800">
                {currentNodeObj.formula}
              </div>
              <p className="text-slate-300 pt-1">{currentNodeObj.desc}</p>
              <div className="pt-2 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-xs">
                <span className="text-amber-300">📤 <strong>Outgoing Analysis:</strong> {currentNodeObj.outgoing}</span>
                <span className="text-emerald-400 font-mono font-bold">{currentNodeObj.slack}</span>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setBackwardStep((prev) => (prev > 0 ? prev - 1 : 6))}
                className="px-3.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 text-xs font-semibold"
              >
                ◀ Previous Node
              </button>
              <button
                onClick={() => setBackwardStep((prev) => (prev < 6 ? prev + 1 : 0))}
                className="px-3.5 py-1.5 rounded-lg bg-purple-600 text-white border border-purple-500 hover:bg-purple-500 text-xs font-semibold"
              >
                Next Node ▶
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 3: Event Slack Manifest */}
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
                7-Node Event Slack & Critical Status Manifest
              </h2>
            </div>

            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold font-sans">
                    <th className="p-2.5">Node</th>
                    <th className="p-2.5 text-cyan-300">Earliest Time (E_i)</th>
                    <th className="p-2.5 text-purple-300">Latest Time (L_i)</th>
                    <th className="p-2.5 text-amber-300">Event Slack (S_i = L_i − E_i)</th>
                    <th className="p-2.5 text-emerald-300 font-sans">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Node 1</td>
                    <td className="p-2.5 text-cyan-300">0</td>
                    <td className="p-2.5 text-purple-300">0</td>
                    <td className="p-2.5 text-amber-300">0 Days</td>
                    <td className="p-2.5 text-emerald-400 font-bold font-sans">CRITICAL EVENT ⭐</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Node 2</td>
                    <td className="p-2.5 text-cyan-300">5</td>
                    <td className="p-2.5 text-purple-300">5</td>
                    <td className="p-2.5 text-amber-300">0 Days</td>
                    <td className="p-2.5 text-emerald-400 font-bold font-sans">CRITICAL EVENT ⭐</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Node 3</td>
                    <td className="p-2.5 text-cyan-300">4</td>
                    <td className="p-2.5 text-purple-300">4</td>
                    <td className="p-2.5 text-amber-300">0 Days</td>
                    <td className="p-2.5 text-emerald-400 font-bold font-sans">CRITICAL EVENT ⭐</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Node 4</td>
                    <td className="p-2.5 text-cyan-300">11</td>
                    <td className="p-2.5 text-purple-300">11</td>
                    <td className="p-2.5 text-amber-300">0 Days</td>
                    <td className="p-2.5 text-emerald-400 font-bold font-sans">CRITICAL EVENT ⭐</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Node 5</td>
                    <td className="p-2.5 text-cyan-300">8</td>
                    <td className="p-2.5 text-purple-300">15</td>
                    <td className="p-2.5 text-amber-300">7 Days</td>
                    <td className="p-2.5 text-slate-400 font-sans">Non-Critical (7d buffer)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Node 6</td>
                    <td className="p-2.5 text-cyan-300">19</td>
                    <td className="p-2.5 text-purple-300">19</td>
                    <td className="p-2.5 text-amber-300">0 Days</td>
                    <td className="p-2.5 text-emerald-400 font-bold font-sans">CRITICAL EVENT ⭐</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Node 7</td>
                    <td className="p-2.5 text-cyan-300">24</td>
                    <td className="p-2.5 text-purple-300">24</td>
                    <td className="p-2.5 text-amber-300">0 Days</td>
                    <td className="p-2.5 text-emerald-400 font-bold font-sans">CRITICAL EVENT ⭐</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 4: Backward Pass SVG */}
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
                Backward Pass Propagation & Burst Minima Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 180"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                <circle cx="680" cy="90" r="22" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="680" y="85" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">7</text>
                <text x="680" y="102" fill="#a7f3d0" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">L=24</text>

                <line x1="658" y1="90" x2="522" y2="90" stroke="#a855f7" strokeWidth="2" />
                <polygon points="522,90 532,85 532,95" fill="#a855f7" />
                <text x="590" y="80" fill="#cbd5e1" fontSize="9">− 5 Days</text>

                <circle cx="500" cy="90" r="22" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
                <text x="500" y="85" fill="#a855f7" fontSize="11" fontWeight="bold" textAnchor="middle">6</text>
                <text x="500" y="102" fill="#a7f3d0" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">L=19</text>

                <line x1="478" y1="80" x2="362" y2="45" stroke="#a855f7" strokeWidth="2" />
                <polygon points="362,45 372,42 368,52" fill="#a855f7" />

                <circle cx="340" cy="45" r="22" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
                <text x="340" y="40" fill="#a855f7" fontSize="11" fontWeight="bold" textAnchor="middle">4</text>
                <text x="340" y="57" fill="#a7f3d0" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">L=11</text>

                <line x1="478" y1="100" x2="362" y2="135" stroke="#a855f7" strokeWidth="2" />
                <polygon points="362,135 368,128 372,138" fill="#a855f7" />

                <circle cx="340" cy="135" r="22" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
                <text x="340" y="130" fill="#a855f7" fontSize="11" fontWeight="bold" textAnchor="middle">5</text>
                <text x="340" y="147" fill="#a7f3d0" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">L=15</text>

                <line x1="318" y1="45" x2="202" y2="90" stroke="#f59e0b" strokeWidth="2" />
                <polygon points="202,90 212,88 208,98" fill="#f59e0b" />

                <circle cx="180" cy="90" r="24" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="180" y="85" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">2</text>
                <text x="180" y="102" fill="#34d399" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">L=5</text>
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
                Bengal Operations Research Backward Pass Case Studies
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
                  trap: 'Taking the Maximum Instead of Minimum at Burst Nodes in Backward Pass',
                  fix: 'An event triggering multiple tasks must finish early enough to satisfy the tightest outgoing deadline; always take the MINIMUM: L_i = min(L_j − d_ij).',
                },
                {
                  trap: 'Failing to Verify that L_1 = 0 at the Initial Start Node',
                  fix: 'If L_1 ≠ 0, an arithmetic error was made in either the forward or backward pass; re-verify calculations immediately.',
                },
                {
                  trap: 'Confusing Event Slack (L_i − E_i) with Activity Total Float (LF − EF)',
                  fix: 'Event slack belongs to a milestone node; Total Float belongs to a specific activity arc.',
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
                  Think of the backward pass as planning your morning commute from an unmovable meeting time: you subtract transit times in reverse to know the latest possible moment you can leave your door!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how Critical Events have E_i = L_i (Zero Slack): these zero-slack events form the backbone of the critical path!
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
                Student Revision Checklist (Topic 7)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Initialized Backward Pass base condition: L_n = E_n',
                'Computed Latest Event Times: L_i = min(L_j − d_ij) across all outgoing arcs',
                'Verified that L_1 = 0',
                'Derived Latest Finish: LF_ij = L_j',
                'Derived Latest Start: LS_ij = L_j − d_ij',
                'Computed Event Slack: S_i = L_i − E_i and identified Critical Events (S_i = 0)',
                'Stated late penalty rates with Indian Rupee (₹) currency symbols',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: Latest Event Times complete your two-pass scheduling toolkit! Remember: Backward pass takes the MINIMUM at burst nodes, starts at L_n = E_n, and MUST end at L_1 = 0. In our next topic (Topic 8), we will combine E_i and L_i to formally isolate Critical Activities!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Latest Event Times FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Latest Event Times (CPM & PERT)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic8_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic7;
