// src/components/study/quantitative-analysis/topics/004_001_critical-path-method-and-pert/Topic10.jsx
// React 19 Function-based Component
// Module: 004_001_critical-path-method-and-pert
// Topic 10: Project duration

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic10_files/topic10_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic10_files/topic10_note.txt?raw';

const Topic10 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [targetDuration, setTargetDuration] = useState(21); // Default to Optimal

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

  // Time-Cost Data Table (24 down to 18 Days)
  const costSchedule = {
    24: { direct: 120000, indirect: 144000, total: 264000, note: 'Normal Duration (Zero Crashing)' },
    23: { direct: 122500, indirect: 138000, total: 260500, note: 'Crashed Task A (Slope ₹2,500 < ₹6,000)' },
    22: { direct: 125000, indirect: 132000, total: 257000, note: 'Crashed Task A (Slope ₹2,500 < ₹6,000)' },
    21: { direct: 127500, indirect: 126000, total: 253500, note: 'OPTIMAL DURATION T* (Minimum Total Cost! ⭐)' },
    20: { direct: 132500, indirect: 120000, total: 252500, note: 'Crashed Task C (Slope ₹5,000 < ₹6,000)' },
    19: { direct: 137500, indirect: 114000, total: 251500, note: 'Crashed Task C (Slope ₹5,000 < ₹6,000) ⭐ MIN COST' },
    18: { direct: 146000, indirect: 108000, total: 254000, note: 'Crashed Task F (Slope ₹8,500 > ₹6,000! Cost rises!)' },
  };

  const currentData = costSchedule[targetDuration];
  const isOptimal = targetDuration === 19;

  // Case Studies
  const caseStudies = [
    {
      title: '1. Foundry Furnace Crashing Optimization (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Compressed a ₹2.4 Lakh blast furnace overhaul from 24 days to optimal T* = 19 days in Barrackpore, saving ₹30,000 in indirect overhead while spending ₹17,500 on overtime, netting ₹12,500 in profit.',
      lesson: 'Crashing continues profitably as long as marginal cost slope is strictly less than daily overhead.',
    },
    {
      title: '2. Cold-Chain Vaccine Facility Emergency Compression (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Crashed cleanroom compressor wiring in Kolkata at a Cost Slope of ₹4,500/day to beat an incoming monsoon flood, saving ₹35,000 in emergency generator rental penalties.',
      lesson: 'External risk deadlines justify targeted crashing on critical path activities.',
    },
    {
      title: '3. Supermarket FMCG Warehouse Optimal Opening Duration (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Modeled the U-shaped cost curve for an automated parcel hub in Ichapur, identifying T* = 19 days as the exact minimum total cost point of ₹2,51,500.',
      lesson: 'The U-shaped curve accurately identifies the most profitable commercial launch date.',
    },
    {
      title: '4. Educational High-Tech Lab Grant Deadline Compression (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Managed the time-cost curve for a ₹55 Lakh university robotics laboratory in Jadavpur, ensuring equipment delivery crashed just enough to avoid a ₹25,000/day audit delay penalty.',
      lesson: 'Penalty avoidance must be incorporated directly into the total project cost equation.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes durGlow {
          0%, 100% { border-color: rgba(56, 189, 248, 0.3); }
          50% { border-color: rgba(56, 189, 248, 0.8); }
        }
        .glow-dur {
          animation: durGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Segment 4 • Module 004_001 • Topic 10
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Time-Cost Optimization • U-Shaped Cost Curve • Project Crashing
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Project Duration
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive study of <span className="text-sky-400 font-semibold">Project Duration (T)</span> and <span className="text-emerald-400 font-semibold">Time-Cost Optimization</span>: distinguishing Normal vs Crash Durations, understanding the <span className="text-amber-400 font-semibold">U-Shaped Total Cost Curve</span> (<span className="text-cyan-400 font-mono">Direct + Indirect</span>), calculating the <span className="text-purple-400 font-semibold">Cost Slope (ΔC / ΔT)</span>, and minimizing expenditures in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'duration-theory', label: '1. Duration & Cost Drivers' },
              { id: 'time-cost-simulator', label: '2. Time-Cost Optimizer' },
              { id: 'cost-schedule', label: '3. Crashing Cost Schedule' },
              { id: 'svg-curves', label: '4. U-Shaped Cost Curve SVG' },
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

        {/* SECTION 1: Duration & Cost Drivers */}
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
                Direct vs Indirect Cost Drivers & The Optimal Duration T*
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-rose-400 font-bold">1. Direct Costs (C_direct)</span>
                <p className="text-slate-300 text-xs">
                  Labor wages, premium equipment, overtime premiums.
                </p>
                <span className="text-amber-300 font-mono text-[11px]">INCREASES as Duration is Compressed 📈</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-cyan-400 font-bold">2. Indirect Costs (C_indirect)</span>
                <p className="text-slate-300 text-xs">
                  Daily site security, rentals, supervisor fees, utilities.
                </p>
                <span className="text-emerald-400 font-mono text-[11px]">DECREASES as Duration is Compressed 📉</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-bold">3. Total Cost & Optimal T*</span>
                <p className="text-slate-300 text-xs">
                  Total Cost = Direct + Indirect. U-shaped curve reaches minimum at T*.
                </p>
                <span className="text-emerald-400 font-mono text-[11px]">Stop when Cost Slope &gt; Daily Overhead!</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Time-Cost Optimizer */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-dur">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Project Duration & Time-Cost Optimizer
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Slide target project duration from Normal (24 Days) down to Crash Limit (18 Days) (Overhead = <strong className="text-cyan-300">₹6,000 / Day</strong>):
            </p>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-semibold">Target Duration:</span>
                <span className="text-lg font-bold font-mono text-white">{targetDuration} Days</span>
              </div>
              <input
                type="range"
                min="18"
                max="24"
                step="1"
                value={targetDuration}
                onChange={(e) => setTargetDuration(Number(e.target.value))}
                className="w-full accent-sky-500 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>18 Days (Crash Limit)</span>
                <span className="text-emerald-400 font-bold">19 Days (T* Optimal)</span>
                <span>24 Days (Normal)</span>
              </div>
            </div>

            {/* Financial Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs sm:text-sm">
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <span className="text-slate-400 font-sans text-xs">Direct Crashing Cost:</span>
                <span className="text-rose-400 font-bold text-base">₹{currentData.direct.toLocaleString()}</span>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <span className="text-slate-400 font-sans text-xs">Indirect Overhead Cost:</span>
                <span className="text-cyan-300 font-bold text-base">₹{currentData.indirect.toLocaleString()}</span>
              </div>

              <div className={clsx('p-3.5 rounded-xl border flex flex-col space-y-1', isOptimal ? 'bg-emerald-950/60 border-emerald-600' : 'bg-slate-950 border-slate-800')}>
                <span className="text-slate-400 font-sans text-xs">Total Project Cost:</span>
                <span className={clsx('font-bold text-lg', isOptimal ? 'text-emerald-400' : 'text-amber-400')}>
                  ₹{currentData.total.toLocaleString()} {isOptimal ? '⭐ (MINIMUM)' : ''}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 font-sans">
              ℹ️ <strong>Engineering Diagnosis:</strong> {currentData.note}
            </div>
          </div>
        </section>

        {/* SECTION 3: Crashing Cost Schedule */}
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
                Complete Project Duration & Crashing Schedule
              </h2>
            </div>

            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold font-sans">
                    <th className="p-2.5">Duration (T)</th>
                    <th className="p-2.5 text-rose-400">Direct Cost (₹)</th>
                    <th className="p-2.5 text-cyan-300">Indirect Overhead (₹)</th>
                    <th className="p-2.5 text-amber-300">Total Cost (₹)</th>
                    <th className="p-2.5 text-slate-300 font-sans">Crashing Operations Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {Object.entries(costSchedule).reverse().map(([dur, data]) => {
                    const isRowOpt = Number(dur) === 19;
                    return (
                      <tr key={dur} className={clsx(isRowOpt ? 'bg-emerald-950/30' : '')}>
                        <td className="p-2.5 font-bold text-white font-sans">{dur} Days</td>
                        <td className="p-2.5 text-rose-400">₹{data.direct.toLocaleString()}</td>
                        <td className="p-2.5 text-cyan-300">₹{data.indirect.toLocaleString()}</td>
                        <td className={clsx('p-2.5 font-bold', isRowOpt ? 'text-emerald-400' : 'text-amber-400')}>
                          ₹{data.total.toLocaleString()}
                        </td>
                        <td className={clsx('p-2.5 text-xs font-sans', isRowOpt ? 'text-emerald-300 font-bold' : 'text-slate-400')}>
                          {data.note}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 4: U-Shaped Cost Curve SVG */}
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
                Direct, Indirect & Total Cost U-Shaped Curve Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 220"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Axes */}
                <line x1="60" y1="180" x2="680" y2="180" stroke="#475569" strokeWidth="2" />
                <line x1="60" y1="180" x2="60" y2="20" stroke="#475569" strokeWidth="2" />
                <text x="680" y="200" fill="#94a3b8" fontSize="10" textAnchor="end">Project Duration (Days) ➔</text>
                <text x="50" y="25" fill="#94a3b8" fontSize="10" textAnchor="end">Cost (₹) ➔</text>

                {/* Direct Cost Curve (Falling as duration increases) */}
                <path d="M 100,50 Q 250,110 640,140" fill="none" stroke="#f43f5e" strokeWidth="2.5" />
                <text x="640" y="135" fill="#f43f5e" fontSize="10" fontWeight="bold">Direct Cost</text>

                {/* Indirect Cost Line (Rising as duration increases) */}
                <path d="M 100,160 L 640,60" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
                <text x="640" y="55" fill="#38bdf8" fontSize="10" fontWeight="bold">Indirect Overhead</text>

                {/* Total Cost Curve (U-Shaped) */}
                <path d="M 100,40 Q 320,125 640,35" fill="none" stroke="#34d399" strokeWidth="3" />
                <text x="640" y="30" fill="#34d399" fontSize="11" fontWeight="bold">Total Cost Curve</text>

                {/* Optimal Duration Marker T* */}
                <line x1="320" y1="125" x2="320" y2="180" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,4" />
                <circle cx="320" cy="125" r="5" fill="#f59e0b" />
                <text x="320" y="195" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">Optimal T* = 19 Days</text>
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
                Bengal Operations Research Duration Case Studies
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
                  trap: 'Crashing Beyond the Optimal Duration T* Point',
                  fix: 'When the cost slope of the next day exceeds the daily overhead rate, stop crashing; otherwise total project cost increases.',
                },
                {
                  trap: 'Crashing Non-Critical Activities to Accelerate the Project',
                  fix: 'Shortening non-critical tasks only wastes direct budget; project duration is only compressed by crashing critical activities.',
                },
                {
                  trap: 'Ignoring Parallel Co-Critical Paths During Crashing',
                  fix: 'If multiple critical paths exist, you must crash an activity on EACH critical path simultaneously to achieve 1 day of duration reduction.',
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
                  Think of project duration optimization as balancing a scale: expediting overtime adds direct costs, but finishes early and eliminates daily rent and supervisor salaries!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how the U-shaped curve reaches its sweet spot at T*: beyond T*, overtime wages become so expensive that they exceed the daily overhead savings!
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
                Student Revision Checklist (Topic 10)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Defined Project Duration (T = E_n)',
                'Distinguished Normal Project Duration vs Crash Project Duration',
                'Computed Direct Costs, Indirect Costs, and Total Project Cost',
                'Analyzed the U-shaped Total Cost Curve to identify Optimal Duration (T*)',
                'Computed Activity Cost Slope: Delta C / Delta T in Indian Rupees (₹) per Day',
                'Executed multi-pass project crashing on critical activities with lowest cost slope',
                'Reported project budgets and crash rates in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: Managing Project Duration is where operations research delivers massive financial ROI! Always look for the sweet spot T* on the U-shaped cost curve. Crash critical activities with Cost Slope < Daily Overhead, and stop as soon as Cost Slope exceeds daily savings. In our next topic (Topic 11), we will transition from deterministic CPM to probabilistic PERT!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Project Duration FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Project Duration & Time-Cost Optimization (CPM & PERT)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic11_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic10;
