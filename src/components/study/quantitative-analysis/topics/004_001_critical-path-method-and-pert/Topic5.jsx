// src/components/study/quantitative-analysis/topics/004_001_critical-path-method-and-pert/Topic5.jsx
// React 19 Function-based Component
// Module: 004_001_critical-path-method-and-pert
// Topic 5: Working methodology of Critical Path Analysis

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic5_files/topic5_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic5_files/topic5_note.txt?raw';

const Topic5 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [activePhase, setActivePhase] = useState(0);

  // Crashing Simulator State
  const [crashDaysA, setCrashDaysA] = useState(0); // Max 2 days, slope ₹4,000/day
  const [crashDaysC, setCrashDaysC] = useState(0); // Max 2 days, slope ₹6,000/day

  const normalDuration = 16;
  const normalDirectCost = 120000; // ₹1,20,000
  const indirectRatePerDay = 5000; // ₹5,000/day overhead

  const currentDuration = normalDuration - Number(crashDaysA) - Number(crashDaysC);
  const extraCrashCost = Number(crashDaysA) * 4000 + Number(crashDaysC) * 6000;
  const currentDirectCost = normalDirectCost + extraCrashCost;
  const currentIndirectCost = currentDuration * indirectRatePerDay;
  const totalProjectCost = currentDirectCost + currentIndirectCost;

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

  const phases = [
    {
      title: 'Phase 1: Project Planning & WBS Decomposition',
      badge: 'Work Breakdown Structure',
      badgeColor: 'bg-sky-950 text-sky-300 border-sky-800',
      desc: 'Decompose the complex project into distinct, non-overlapping activities with defined durations and strict predecessor dependencies.',
      action: 'Create precedence table and define deterministic time estimates (d_ij).',
    },
    {
      title: 'Phase 2: Two-Pass Scheduling (Forward & Backward)',
      badge: 'E_j (Max) & L_i (Min)',
      badgeColor: 'bg-indigo-950 text-indigo-300 border-indigo-800',
      desc: 'Execute Forward Pass (E_j = max [E_i + d_ij]) and Backward Pass (L_i = min [L_j − d_ij]) across all nodes.',
      action: 'Compute ES, EF, LS, LF boundaries across all activities.',
    },
    {
      title: 'Phase 3: Float & Slack Quantification',
      badge: 'TF, FF & IF Analysis',
      badgeColor: 'bg-cyan-950 text-cyan-300 border-cyan-800',
      desc: 'Calculate Total Float (TF = LS − ES), Free Float (FF = E_j − E_i − d), and Independent Float (IF).',
      action: 'Establish the universal float inequality: TF ≥ FF ≥ IF ≥ 0.',
    },
    {
      title: 'Phase 4: Critical Path Identification',
      badge: 'Path: A ➔ C ➔ F (16 Days)',
      badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-800',
      desc: 'Isolate activities meeting all 3 conditions: E_i = L_i, E_j = L_j, and E_j − E_i = d_ij (TF = 0).',
      action: 'Determines the absolute minimum project duration (16 days).',
    },
    {
      title: 'Phase 5: Crashing & Resource Optimization',
      badge: 'Cost Slope = ΔC / ΔT',
      badgeColor: 'bg-amber-950 text-amber-300 border-amber-800',
      desc: 'Shorten critical path activities at lowest cost slope to find optimal project duration minimizing total cost (Direct + Indirect).',
      action: 'Execute trade-offs between overtime direct costs and daily overhead in Indian Rupees (₹).',
    },
  ];

  const currentPhaseObj = phases[activePhase];

  // Case Studies
  const caseStudies = [
    {
      title: '1. Foundry 5-Phase Blast Furnace Overhaul (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Executed the complete 5-phase CPA framework on a 14-activity furnace rebuild in Barrackpore: Forward Pass (E_10 = 28 days), Backward Pass (L_10 = 28 days), and crashed critical curing by 4 days at ₹12,000/day.',
      lesson: 'Structured 5-phase CPA prevents ad-hoc expediting and optimizes shutdown budgets.',
    },
    {
      title: '2. Cold-Chain Vaccine Facility Two-Pass Execution (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Executed Forward and Backward passes across 9 hospital clinics in Kolkata, isolating Critical Events 1, 2, 4, 7, 9 to ensure 100% emergency medical readiness.',
      lesson: 'Two-pass scheduling guarantees all milestone deadlines align perfectly.',
    },
    {
      title: '3. Supermarket FMCG Automated Conveyor Float Matrix (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Computed Total, Free, and Independent Floats across 12 conveyor installation tasks in Ichapur, leveling electrician shifts without project delay.',
      lesson: 'Float hierarchy provides operational flexibility for labor leveling.',
    },
    {
      title: '4. Educational High-Tech Lab Research Grant Governance (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Presented a certified 5-phase CPA audit trail to university finance auditors in Jadavpur, proving zero float on cleanroom HVAC fabrication to release a ₹55 Lakh grant.',
      lesson: 'Rigorous CPA documentation ensures compliance with strict government tender audits.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes cpaGlow {
          0%, 100% { border-color: rgba(52, 211, 153, 0.3); }
          50% { border-color: rgba(52, 211, 153, 0.8); }
        }
        .glow-cpa {
          animation: cpaGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
              Segment 4 • Module 004_001 • Topic 5
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
              Complete 5-Phase CPA Engine • Two-Pass Scheduling & Crashing
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
            Working Methodology of Critical Path Analysis
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            The complete five-phase master engine of <span className="text-emerald-400 font-semibold">Critical Path Analysis (CPA)</span>: from Work Breakdown Structure (WBS) decomposition and <span className="text-sky-400 font-semibold">Two-Pass Scheduling</span> (<span className="text-cyan-400 font-mono">Eᵢ, Lᵢ</span>) to float hierarchy quantification, critical path isolation, and <span className="text-amber-400 font-semibold">Time-Cost Project Crashing</span> in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'five-phases', label: '1. The 5 CPA Phases' },
              { id: 'interactive-stepper', label: '2. 5-Phase Methodology Stepper' },
              { id: 'crashing-simulator', label: '3. Interactive Crashing Simulator' },
              { id: 'svg-pipeline', label: '4. CPA Pipeline SVG' },
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

        {/* SECTION 1: The 5 CPA Phases */}
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
                The 5 Core Phases of Critical Path Analysis
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-sky-300 font-bold">1. WBS & Planning</span>
                <p className="text-slate-300">Decompose tasks and establish predecessor logic.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-indigo-300 font-bold">2. Two-Pass Scheduling</span>
                <p className="text-slate-300">Forward pass (E_j) and Backward pass (L_i).</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-bold">3. Float Analysis</span>
                <p className="text-slate-300">Quantify Total (TF), Free (FF), and Indep (IF) floats.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-emerald-300 font-bold">4. Critical Path</span>
                <p className="text-slate-300">Isolate zero-slack bottleneck path (TF = 0).</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-amber-300 font-bold">5. Crashing & Cost</span>
                <p className="text-slate-300">Optimize duration vs total cost in Indian Rupees (₹).</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: 5-Phase Methodology Stepper */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-cpa">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                  02
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Interactive 5-Phase CPA Stepper
                </h2>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {phases.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActivePhase(idx)}
                    className={clsx(
                      'px-2.5 py-1 rounded text-xs font-semibold transition-all border',
                      activePhase === idx
                        ? 'bg-emerald-600 text-white border-emerald-400 shadow-md'
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                    )}
                  >
                    Phase {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">{currentPhaseObj.title}</h3>
              <span className={clsx('px-3 py-1 rounded-full text-xs font-mono font-bold border', currentPhaseObj.badgeColor)}>
                {currentPhaseObj.badge}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2 text-xs sm:text-sm">
              <p className="text-slate-200">{currentPhaseObj.desc}</p>
              <div className="pt-2 border-t border-slate-800 text-emerald-400 font-mono text-xs">
                ⚙️ <strong>Operations Execution:</strong> {currentPhaseObj.action}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setActivePhase((prev) => (prev > 0 ? prev - 1 : 4))}
                className="px-3.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 text-xs font-semibold"
              >
                ◀ Previous Phase
              </button>
              <button
                onClick={() => setActivePhase((prev) => (prev < 4 ? prev + 1 : 0))}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-600 text-white border border-emerald-500 hover:bg-emerald-500 text-xs font-semibold"
              >
                Next Phase ▶
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 3: Interactive Crashing Simulator */}
        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          data-index="2"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 font-bold text-sm">
                03
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Phase 5 Project Crashing & Cost Optimization Simulator
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Adjust crash days for critical activities on the 16-day critical path (Overhead rate = <strong className="text-amber-300">₹5,000 / Day</strong>):
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                <label className="text-xs font-semibold text-sky-400">
                  Crash Activity A (Cost Slope = ₹4,000 / Day, Max 2 Days):
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="0"
                    max="2"
                    value={crashDaysA}
                    onChange={(e) => setCrashDaysA(Number(e.target.value))}
                    className="w-full accent-sky-500"
                  />
                  <span className="font-mono text-white text-sm font-bold w-12">{crashDaysA} Days</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                <label className="text-xs font-semibold text-purple-400">
                  Crash Activity C (Cost Slope = ₹6,000 / Day, Max 2 Days):
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="0"
                    max="2"
                    value={crashDaysC}
                    onChange={(e) => setCrashDaysC(Number(e.target.value))}
                    className="w-full accent-purple-500"
                  />
                  <span className="font-mono text-white text-sm font-bold w-12">{crashDaysC} Days</span>
                </div>
              </div>
            </div>

            {/* Crashing Results Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs sm:text-sm">
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <span className="text-slate-400 font-sans text-xs">Project Duration:</span>
                <span className="text-emerald-400 font-bold text-lg">{currentDuration} Days (Compressed from 16)</span>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <span className="text-slate-400 font-sans text-xs">Direct + Indirect Cost:</span>
                <span className="text-cyan-300 font-bold text-sm">₹{currentDirectCost.toLocaleString()} + ₹{currentIndirectCost.toLocaleString()}</span>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <span className="text-slate-400 font-sans text-xs">Total Project Cost:</span>
                <span className="text-amber-400 font-bold text-lg">₹{totalProjectCost.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: CPA Pipeline SVG */}
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
                5-Phase Critical Path Analysis Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 180"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                <rect x="20" y="45" width="130" height="90" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="85" y="75" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">1. Planning & WBS</text>
                <text x="85" y="95" fill="#cbd5e1" fontSize="8" textAnchor="middle">Tasks & Precedence</text>

                <rect x="165" y="45" width="130" height="90" rx="8" fill="#1e293b" stroke="#818cf8" strokeWidth="2" />
                <text x="230" y="75" fill="#818cf8" fontSize="10" fontWeight="bold" textAnchor="middle">2. Two-Pass Sched</text>
                <text x="230" y="95" fill="#cbd5e1" fontSize="8" textAnchor="middle">E_j Max | L_i Min</text>

                <rect x="310" y="45" width="130" height="90" rx="8" fill="#1e293b" stroke="#06b6d4" strokeWidth="2" />
                <text x="375" y="75" fill="#06b6d4" fontSize="10" fontWeight="bold" textAnchor="middle">3. Float Analysis</text>
                <text x="375" y="95" fill="#cbd5e1" fontSize="8" textAnchor="middle">TF ≥ FF ≥ IF ≥ 0</text>

                <rect x="455" y="45" width="130" height="90" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="520" y="75" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">4. Critical Path</text>
                <text x="520" y="95" fill="#a7f3d0" fontSize="8" textAnchor="middle">Zero Slack (TF=0)</text>

                <rect x="600" y="45" width="120" height="90" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="660" y="75" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">5. Crashing & ₹</text>
                <text x="660" y="95" fill="#fde68a" fontSize="8" textAnchor="middle">Cost Slope ΔC/ΔT</text>
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
                Bengal Operations Research Methodology Case Studies
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
                  trap: 'Crashing Non-Critical Activities to Shorten Project Duration',
                  fix: 'Shortening non-critical tasks only increases their surplus float; project duration is only compressed by crashing critical path activities.',
                },
                {
                  trap: 'Assuming Tail and Head Event Zero Slack Guarantees a Critical Activity',
                  fix: 'An activity (i, j) is only critical if E_j − E_i = d_ij as well (Condition 3).',
                },
                {
                  trap: 'Violating Float Hierarchy (TF ≥ FF ≥ IF ≥ 0)',
                  fix: 'If Free Float exceeds Total Float in your calculation, you have made an arithmetic error in the forward or backward pass.',
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
                  Think of the 5-phase CPA framework as a complete engineering cockpit: it shows you exactly where the project bottlenecks are, where you have buffer flexibility, and where spending extra rupees (₹) buys you faster completion!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how project crashing creates an economic trade-off: direct overtime costs increase, but daily indirect overhead costs decrease!
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
                Student Revision Checklist (Topic 5)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Mastered the 5 structured phases of Critical Path Analysis',
                'Computed Forward Pass Earliest Times: E_j = max(E_i + d_ij)',
                'Computed Backward Pass Latest Times: L_i = min(L_j − d_ij)',
                'Computed Total Float: TF = LS − ES = LF − EF',
                'Computed Free Float: FF = E_j − E_i − d_ij',
                'Computed Independent Float: IF = max(0, E_j − L_i − d_ij)',
                'Verified all 3 conditions for Critical Activities: E_i=L_i, E_j=L_j, E_j−E_i=d_ij',
                'Computed Crashing Cost Slope: (C_c − C_n) / (T_n − T_c) in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: The 5-Phase CPA Working Methodology is your executive toolkit for managing complex industrial operations! Master the two-pass calculations, keep your float hierarchy in check (TF ≥ FF ≥ IF ≥ 0), and remember to crash only critical activities with the lowest cost slope. In our next topic (Topic 6), we will dive microscopic into Earliest Event Times!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Critical Path Analysis Methodology FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Working Methodology of Critical Path Analysis"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic6_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic5;
