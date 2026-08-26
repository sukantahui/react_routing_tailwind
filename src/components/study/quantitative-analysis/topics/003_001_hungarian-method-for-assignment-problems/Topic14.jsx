// src/components/study/quantitative-analysis/topics/003_001_hungarian-method-for-assignment-problems/Topic14.jsx
// React 19 Function-based Component
// Module: 003_001_hungarian-method-for-assignment-problems
// Topic 14: Minimization problems

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic14_files/topic14_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic14_files/topic14_note.txt?raw';

const Topic14 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedMetric, setSelectedMetric] = useState('cost'); // 'cost', 'time', 'distance'

  const workerNames = ['Debangshu (W1)', 'Susmita (W2)', 'Mamata (W3)', 'Mahima (W4)'];
  const taskNames = ['Task 1', 'Task 2', 'Task 3', 'Task 4'];

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

  const metricsConfig = {
    cost: {
      unit: '₹',
      unitName: 'Indian Rupees (₹)',
      desc: 'Optimizing direct financial wages, tooling wear, and freight rates.',
      matrix: [
        [10, 15, 12, 18],
        [13, 12, 14, 16],
        [15, 14, 17, 12],
        [11, 13, 15, 14],
      ],
      optimalScore: '₹46',
      unitPrefix: '₹',
      unitSuffix: '',
    },
    time: {
      unit: 'm',
      unitName: 'Machining Minutes',
      desc: 'Optimizing machine cycle times, lab testing durations, and patient transit delays.',
      matrix: [
        [10, 15, 12, 18],
        [13, 12, 14, 16],
        [15, 14, 17, 12],
        [11, 13, 15, 14],
      ],
      optimalScore: '46 mins',
      unitPrefix: '',
      unitSuffix: ' min',
    },
    distance: {
      unit: 'km',
      unitName: 'Delivery Kilometers',
      desc: 'Optimizing courier routes, vaccine van corridors, and fleet fuel consumption.',
      matrix: [
        [10, 15, 12, 18],
        [13, 12, 14, 16],
        [15, 14, 17, 12],
        [11, 13, 15, 14],
      ],
      optimalScore: '46 km',
      unitPrefix: '',
      unitSuffix: ' km',
    },
  };

  const currentCfg = metricsConfig[selectedMetric];

  // Case Studies
  const caseStudies = [
    {
      title: '1. Foundry Cycle Time Minimization (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Minimizing induction furnace processing durations across 4 casting engineers in Barrackpore, cutting total production time from 72 minutes to 46 minutes.',
      lesson: 'Time minimization maximizes overall plant manufacturing capacity.',
    },
    {
      title: '2. Cold-Chain Vaccine Transit Minimization (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Minimizing total vaccine exposure minutes across 4 Kolkata hospital clinics, ensuring zero thermal spoilage of critical immunoglobulin vials (Z* = 46 minutes).',
      lesson: 'Logistics minimization prevents spoilage of temperature-sensitive medical goods.',
    },
    {
      title: '3. Supermarket FMCG Store Manager Wage Minimization (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Minimizing monthly managerial compensation overhead across 4 hypermarkets in Ichapur, locking in a certified minimal labor spend of ₹35,000.',
      lesson: 'Financial cost minimization optimizes retail gross operating margins.',
    },
    {
      title: '4. Educational Press Misprint Rate Minimization (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Minimizing textbook misprint rates across 3 printing presses in Jadavpur, reducing scrap paper waste by 64% across government textbook print runs.',
      lesson: 'Quality minimization directly protects institutional reputation and minimizes waste.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes minGlow {
          0%, 100% { border-color: rgba(56, 189, 248, 0.3); }
          50% { border-color: rgba(56, 189, 248, 0.8); }
        }
        .glow-min {
          animation: minGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Segment 3 • Module 003_001 • Topic 14
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Canonical Formulation • Cost, Time, Distance & Quality
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Minimization Problems
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive study of canonical <span className="text-sky-400 font-semibold">Minimization Models</span>: optimizing <span className="text-emerald-400 font-semibold">Financial Spend (₹)</span>, <span className="text-cyan-400 font-semibold">Machining Time (Minutes)</span>, <span className="text-amber-400 font-semibold">Transit Distance (Km)</span>, and defect penalties across West Bengal industrial networks.
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'canonical-concept', label: '1. Canonical Objective' },
              { id: 'interactive-workbench', label: '2. Multi-Metric Workbench' },
              { id: 'five-metrics', label: '3. 5 Industrial Metrics' },
              { id: 'svg-metrics', label: '4. Minimization Metrics SVG' },
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
              &gt;
                {item.label}
              </button>
            ))}
          </div>
        </header>

        {/* SECTION 1: Canonical Objective */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                01
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Canonical Minimization Formulation
              </h2>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2 font-mono text-xs sm:text-sm">
              <span className="text-sky-300 font-bold font-sans text-base">Mathematical Objective:</span>
              <p className="text-white text-base">
                min Z = ∑ᵢ₌₁ⁿ ∑ⱼ₌₁ⁿ cᵢⱼ · xᵢⱼ
              </p>
              <p className="text-slate-300 font-sans">
                Subject to: &nbsp; ∑ⱼ xᵢⱼ = 1 &nbsp; (∀ i), &nbsp; ∑ᵢ xᵢⱼ = 1 &nbsp; (∀ j), &nbsp; xᵢⱼ ∈ &#123;0, 1&#125;.
              </p>
              <p className="text-emerald-300 pt-1 font-sans text-xs">
                The Hungarian Method is the native solver for this formulation because row and column subtractions directly uncover zero-cost opportunity baselines.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Multi-Metric Workbench */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-min">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                  02
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Multi-Metric Minimization Workbench
                </h2>
              </div>
              <div className="flex items-center gap-1.5">
                {[
                  { id: 'cost', label: '1. Financial Spend (₹)' },
                  { id: 'time', label: '2. Machining Time (Mins)' },
                  { id: 'distance', label: '3. Logistics (Km)' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedMetric(item.id)}
                    className={clsx(
                      'px-3 py-1 rounded text-xs font-semibold transition-all border',
                      selectedMetric === item.id
                        ? 'bg-sky-600 text-white border-sky-400 shadow-md'
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                    )}
                  &gt;
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Operational Metric: <strong className="text-amber-300">{currentCfg.unitName}</strong> — {currentCfg.desc}
            </p>

            {/* Matrix View */}
            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-center border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2 text-left font-semibold text-slate-300 font-sans">Technicians \ Tasks</th>
                    {taskNames.map((t, idx) => (
                      <th key={idx} className="p-2 font-semibold text-cyan-300 font-sans">
                        {t}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {workerNames.map((wName, rIdx) => (
                    <tr key={rIdx}>
                      <td className="p-2 text-left font-medium text-slate-200 font-sans">{wName}</td>
                      {currentCfg.matrix[rIdx].map((val, cIdx) => {
                        const isOptimalPair =
                          (rIdx === 0 && cIdx === 2) ||
                          (rIdx === 1 && cIdx === 1) ||
                          (rIdx === 2 && cIdx === 3) ||
                          (rIdx === 3 && cIdx === 0);

                        return (
                          <td key={cIdx} className="p-2">
                            <div
                              className={clsx(
                                'p-2.5 rounded-lg font-bold transition-all border flex flex-col items-center justify-center',
                                isOptimalPair
                                  ? 'bg-emerald-950 text-emerald-300 border-emerald-500 shadow-md shadow-emerald-950/60 scale-105'
                                  : 'bg-slate-900 text-slate-300 border-slate-800'
                              )}
                            >
                              <span>
                                {currentCfg.unitPrefix}{val}{currentCfg.unitSuffix}
                              </span>
                              {isOptimalPair && (
                                <span className="text-[9px] font-sans font-bold text-emerald-400">
                                  ASSIGNED ⭐
                                </span>
                              )}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs sm:text-sm">
              <span className="text-slate-300 font-sans">
                Assigned: (W1➔T3), (W2➔T2), (W3➔T4), (W4➔T1)
              </span>
              <div className="font-mono text-emerald-400 font-bold">
                Certified Minimum Performance: Z* = {currentCfg.optimalScore}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: 5 Industrial Metrics */}
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
                The 5 Industrial Minimization Dimensions
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-emerald-300 font-bold">1. Financial Expense (₹)</span>
                <p className="text-slate-300">Wages, tool depreciation, subcontracting fees, and fuel costs.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-sky-300 font-bold">2. Cycle Time (Hours/Mins)</span>
                <p className="text-slate-300">Machining durations, patient lab processing, and transit time.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-amber-300 font-bold">3. Logistics Distance (Km)</span>
                <p className="text-slate-300">Fleet route lengths, courier delivery tracks, and warehouse travel.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-rose-300 font-bold">4. Quality & Defect Counts</span>
                <p className="text-slate-300">Textbook misprints, casting porosity scrap, and surgical complications.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1 sm:col-span-2 lg:col-span-2">
                <span className="text-purple-300 font-bold">5. Energy & Carbon Footprint (kWh / kg CO₂)</span>
                <p className="text-slate-300">Furnace electrical load scheduling, data server cooling, and green fleet logistics.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Minimization Metrics SVG */}
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
                Minimization Performance Metrics Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 180"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                <circle cx="90" cy="90" r="50" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="90" y="85" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">Cost (₹)</text>
                <text x="90" y="105" fill="#ffffff" fontSize="9" textAnchor="middle">Wages & Fuel</text>

                <circle cx="230" cy="90" r="50" fill="#082f49" stroke="#38bdf8" strokeWidth="2" />
                <text x="230" y="85" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Time (Mins)</text>
                <text x="230" y="105" fill="#ffffff" fontSize="9" textAnchor="middle">Processing</text>

                <circle cx="370" cy="90" r="50" fill="#451a03" stroke="#fbbf24" strokeWidth="2" />
                <text x="370" y="85" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">Distance (Km)</text>
                <text x="370" y="105" fill="#ffffff" fontSize="9" textAnchor="middle">Fleet Routes</text>

                <circle cx="510" cy="90" r="50" fill="#4c0519" stroke="#f43f5e" strokeWidth="2" />
                <text x="510" y="85" fill="#f43f5e" fontSize="11" fontWeight="bold" textAnchor="middle">Defects</text>
                <text x="510" y="105" fill="#ffffff" fontSize="9" textAnchor="middle">Quality Scrap</text>

                <circle cx="650" cy="90" r="50" fill="#3b0764" stroke="#c084fc" strokeWidth="2" />
                <text x="650" y="85" fill="#c084fc" fontSize="11" fontWeight="bold" textAnchor="middle">Carbon</text>
                <text x="650" y="105" fill="#ffffff" fontSize="9" textAnchor="middle">kg CO₂</text>
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 5: Real-World Bengal Case Studies */}
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
                Bengal Operations Research Minimization Case Studies
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
                  trap: 'Reporting Final Cost Without Engineering Units or Currency',
                  fix: 'Always attach the proper unit (₹, minutes, km, defects) to your final objective value Z*.',
                },
                {
                  trap: 'Executing Hungarian Method on Profit Matrices Without Inverting',
                  fix: 'Hungarian method natively minimizes; to maximize profit, you must convert it to a regret matrix first (Topic 15).',
                },
                {
                  trap: 'Mixing Units in Multi-Criteria Models Without Normalization',
                  fix: 'When combining Rupees and Hours, convert hours to monetary wages using hourly labor rates before summing.',
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
                  Think about how versatile minimization is: whether you are cutting rupees, shaving minutes off an assembly line, or reducing carbon emissions, the exact same 5 Hungarian steps deliver mathematical perfection!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully that because Hungarian reductions naturally preserve 1-to-1 matching, your final total is always the certified global minimum!
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
                Student Revision Checklist (Topic 14)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Formulated canonical minimization objective: Min Z = ∑ c_ij x_ij',
                'Identified operational metric (Rupees ₹, minutes, kilometers, defects, carbon)',
                'Executed 5-step Hungarian Method directly without transformation',
                'Computed certified minimum total cost Z* from original matrix rates',
                'Verified Strong Duality (Z* == W*)',
                'Stated operational conclusions with appropriate engineering/currency units',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: Minimization is the native heart of Operations Research! Every time you reduce a matrix, you are eliminating waste and driving efficiency. But what happens when your goal is to MAXIMIZE sales revenue, profit, or customer satisfaction? In our next topic (Topic 15), we will learn the beautiful technique of converting Maximization problems into minimization format!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Minimization Problems FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Minimization Problems (Hungarian Method)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic15_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic14;
