// src/components/study/quantitative-analysis/topics/004_001_critical-path-method-and-pert/Topic0.jsx
// React 19 Function-based Component
// Module: 004_001_critical-path-method-and-pert
// Topic 0: Meaning of project network analysis

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic0_files/topic0_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic0_files/topic0_note.txt?raw';

const Topic0 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [activeMode, setActiveMode] = useState('cpm'); // 'cpm' vs 'pert'

  // PERT Calculator State
  const [optA, setOptA] = useState(4);
  const [likelyM, setLikelyM] = useState(7);
  const [pessB, setPessB] = useState(16);

  const expectedTime = ((optA + 4 * likelyM + pessB) / 6).toFixed(2);
  const variance = Math.pow((pessB - optA) / 6, 2).toFixed(2);
  const stdDev = Math.sqrt(variance).toFixed(2);

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
      title: '1. Foundry Modernization Project (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Structured a 14-activity blast furnace overhaul in Barrackpore, mapping precedence dependencies and isolating a 28-day critical path that saved ₹18.5 Lakhs in downtime penalties.',
      lesson: 'Deterministic CPM allows exact planning of shutdown overhauls and contractor shifts.',
    },
    {
      title: '2. Hospital Ward Expansion Logistics (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Modeled medical ward construction across Kolkata, managing activity floats to ensure zero interference with 24/7 emergency ambulance routes.',
      lesson: 'Slack analysis protects critical healthcare delivery corridors during infrastructure expansion.',
    },
    {
      title: '3. Automated FMCG Distribution Center Commissioning (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Scheduled a 10-week conveyor installation in Ichapur, using PERT 3-time estimates to achieve a 96.4% statistical confidence of on-time launch before festive sales.',
      lesson: 'Probabilistic PERT models quantify delivery risk for new technology implementations.',
    },
    {
      title: '4. University Robotics Research Lab Setup (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Employed resource leveling on a ₹55 Lakh university research grant in Jadavpur, smoothing specialized electrical technician shifts to eliminate ₹1.2 Lakhs in weekend overtime fees.',
      lesson: 'Resource leveling prevents contractor burnout while strictly protecting the project deadline.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes netGlow {
          0%, 100% { border-color: rgba(56, 189, 248, 0.3); }
          50% { border-color: rgba(56, 189, 248, 0.8); }
        }
        .glow-net {
          animation: netGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Segment 4 • Module 004_001 • Topic 0
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Critical Path Method (CPM) & PERT Fundamentals
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Meaning of Project Network Analysis
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive foundation in <span className="text-sky-400 font-semibold">Project Network Analysis (PNA)</span>: understanding project dynamics versus repetitive manufacturing, the dual origins of <span className="text-amber-400 font-semibold">CPM (Deterministic, 1957)</span> and <span className="text-purple-400 font-semibold">PERT (Probabilistic, 1958)</span>, time-cost trade-offs, and critical path governance in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'foundational-concepts', label: '1. What is a Project?' },
              { id: 'cpm-vs-pert', label: '2. CPM vs PERT Workbench' },
              { id: 'pert-calculator', label: '3. PERT 3-Time Calculator' },
              { id: 'four-pillars', label: '4. The 4 Pillars of PNA' },
              { id: 'svg-lifecycle', label: '5. Network Analysis SVG' },
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
                    ? 'bg-sky-600 text-white border-sky-500 shadow-md shadow-sky-900/40'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </header>

        {/* SECTION 1: What is a Project? */}
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
                What Constitutes a Project in Operations Research?
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Unlike continuous or repetitive manufacturing, a <strong>Project</strong> is a non-routine, temporary endeavor characterized by four defining criteria:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-sky-300 font-bold">1. Unique Scope</span>
                <p className="text-slate-300">Custom deliverables and non-repetitive specifications.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-amber-300 font-bold">2. Definite Start & Finish</span>
                <p className="text-slate-300">Fixed target completion dates and milestone deadlines.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-emerald-300 font-bold">3. Precedence Logic</span>
                <p className="text-slate-300">Activities must follow rigid technical predecessor constraints.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-purple-300 font-bold">4. Budget & Resources</span>
                <p className="text-slate-300">Constrained capital in Indian Rupees (₹), labor, and machinery.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: CPM vs PERT Workbench */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-net">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                  02
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  CPM vs PERT Comparative Workbench
                </h2>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setActiveMode('cpm')}
                  className={clsx(
                    'px-3 py-1 rounded text-xs font-semibold transition-all border',
                    activeMode === 'cpm'
                      ? 'bg-amber-600 text-white border-amber-400 shadow-md'
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                  )}
                >
                  CPM (Deterministic)
                </button>
                <button
                  onClick={() => setActiveMode('pert')}
                  className={clsx(
                    'px-3 py-1 rounded text-xs font-semibold transition-all border',
                    activeMode === 'pert'
                      ? 'bg-purple-600 text-white border-purple-400 shadow-md'
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                  )}
                >
                  PERT (Probabilistic)
                </button>
              </div>
            </div>

            {/* Comparison Overview */}
            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                    <th className="p-2.5">Dimension</th>
                    <th className="p-2.5 text-amber-300">Critical Path Method (CPM)</th>
                    <th className="p-2.5 text-purple-300">PERT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="p-2.5 font-medium text-white">Origin & Year</td>
                    <td className="p-2.5 text-amber-200">DuPont & Remington Rand (1957)</td>
                    <td className="p-2.5 text-purple-200">US Navy Polaris Missile (1958)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-white">Nature of Durations</td>
                    <td className="p-2.5 text-amber-200">DETERMINISTIC (Single known time)</td>
                    <td className="p-2.5 text-purple-200">PROBABILISTIC (3-time estimates: a, m, b)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-white">Primary Focus</td>
                    <td className="p-2.5 text-amber-200">Time-Cost Trade-Offs & Crashing</td>
                    <td className="p-2.5 text-purple-200">Probability of Meeting Target Deadlines</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-white">Network Orientation</td>
                    <td className="p-2.5 text-amber-200">Activity-Oriented (AOA / AON)</td>
                    <td className="p-2.5 text-purple-200">Event-Oriented (Milestone nodes)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-white">Typical Application</td>
                    <td className="p-2.5 text-amber-200">Civil construction, plant maintenance</td>
                    <td className="p-2.5 text-purple-200">R&D, aerospace, defense, software R&D</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 3: PERT 3-Time Calculator */}
        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          data-index="2"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-600/20 text-purple-400 font-bold text-sm">
                03
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive PERT Expected Duration & Variance Calculator
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                <label className="text-xs font-semibold text-sky-400">Optimistic Time (a) [Days]:</label>
                <input
                  type="number"
                  value={optA}
                  onChange={(e) => setOptA(Number(e.target.value))}
                  className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono text-sm"
                />
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                <label className="text-xs font-semibold text-amber-400">Most Likely Time (m) [Days]:</label>
                <input
                  type="number"
                  value={likelyM}
                  onChange={(e) => setLikelyM(Number(e.target.value))}
                  className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono text-sm"
                />
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                <label className="text-xs font-semibold text-rose-400">Pessimistic Time (b) [Days]:</label>
                <input
                  type="number"
                  value={pessB}
                  onChange={(e) => setPessB(Number(e.target.value))}
                  className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono text-sm"
                />
              </div>
            </div>

            {/* Calculated Output */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 font-mono text-xs sm:text-sm">
              <div>
                <span className="text-slate-400 font-sans">Formula: </span>
                <span className="text-purple-300 font-bold">t_e = (a + 4m + b) / 6</span>
                <div className="text-emerald-400 font-bold text-base mt-1">
                  Expected Duration (t_e) = {expectedTime} Days
                </div>
              </div>

              <div>
                <span className="text-slate-400 font-sans">Variance: </span>
                <span className="text-purple-300 font-bold">σ² = ((b − a) / 6)²</span>
                <div className="text-cyan-400 font-bold text-base mt-1">
                  Variance (σ²) = {variance} &nbsp;|&nbsp; σ = {stdDev} Days
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: The 4 Pillars of PNA */}
        <section
          ref={(el) => (sectionRefs.current[3] = el)}
          data-index="3"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 font-bold text-sm">
                04
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                The Four Pillars of Project Network Governance
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-sky-300 font-bold text-sm">1. Time Management & Critical Path</span>
                <p className="text-slate-300">
                  Identifying the sequence of activities with zero total slack that determines the absolute earliest project finish date.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-emerald-300 font-bold text-sm">2. Cost Optimization & Crashing</span>
                <p className="text-slate-300">
                  Trading off direct overtime costs against indirect overhead expenses to minimize total project expenditure in Indian Rupees (₹).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-amber-300 font-bold text-sm">3. Resource Leveling & Smoothing</span>
                <p className="text-slate-300">
                  Shifting non-critical tasks within their allowable float windows to eliminate labor and equipment demand spikes.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-purple-300 font-bold text-sm">4. Risk & Uncertainty Control</span>
                <p className="text-slate-300">
                  Calculating statistical Z-scores and delivery probabilities for contractual compliance under unpredictable project environments.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Network Analysis SVG */}
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
                Project Network Analysis Lifecycle Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 180"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                <rect x="20" y="45" width="160" height="90" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="100" y="75" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">1. WBS & Tasks</text>
                <text x="100" y="100" fill="#cbd5e1" fontSize="9" textAnchor="middle">Decompose Activities</text>
                <text x="100" y="120" fill="#a7f3d0" fontSize="9" textAnchor="middle">Precedence Table</text>

                <rect x="200" y="45" width="160" height="90" rx="8" fill="#1e293b" stroke="#818cf8" strokeWidth="2" />
                <text x="280" y="75" fill="#818cf8" fontSize="11" fontWeight="bold" textAnchor="middle">2. Network Topology</text>
                <text x="280" y="100" fill="#cbd5e1" fontSize="9" textAnchor="middle">Draw AOA / AON Graph</text>
                <text x="280" y="120" fill="#cbd5e1" fontSize="9" textAnchor="middle">Dummy Precedence</text>

                <rect x="380" y="45" width="160" height="90" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <text x="460" y="75" fill="#f43f5e" fontSize="11" fontWeight="bold" textAnchor="middle">3. Forward/Backward</text>
                <text x="460" y="100" fill="#cbd5e1" fontSize="9" textAnchor="middle">Compute E_i and L_j</text>
                <text x="460" y="120" fill="#fecdd3" fontSize="9" textAnchor="middle">Isolate Zero Slack</text>

                <rect x="560" y="45" width="160" height="90" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="640" y="75" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">4. Critical Path & ₹</text>
                <text x="640" y="100" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">Duration & Budget</text>
                <text x="640" y="120" fill="#a7f3d0" fontSize="9" textAnchor="middle">Crash Optimization</text>
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
                Bengal Infrastructure & Operations Case Studies
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
                  trap: 'Confusing CPM (Deterministic) with PERT (Probabilistic)',
                  fix: 'CPM uses known single time durations; PERT uses 3 estimates (a, m, b) parameterized via a Beta distribution.',
                },
                {
                  trap: 'Treating Gantt Charts as a Substitute for Network Analysis',
                  fix: 'Gantt charts do not reveal inter-task dependency ripple effects or compute mathematical critical floats.',
                },
                {
                  trap: 'Assuming Delays on Non-Critical Paths Always Delay the Project',
                  fix: 'Non-critical tasks can be delayed within their available total float without affecting the project completion date.',
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
                  Think of a project network as a flowing river: the critical path is the shallowest, slowest channel that determines how quickly the entire river reaches the ocean!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how the PERT expected formula t_e = (a + 4m + b) / 6 assigns 4 times more weight to the most likely estimate, smoothing out overly optimistic or pessimistic outliers!
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
                Student Revision Checklist (Topic 0)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Defined Project Network Analysis and its 4 core pillars',
                'Differentiated CPM (Deterministic, DuPont 1957) vs PERT (Probabilistic, US Navy 1958)',
                'Computed PERT Expected Duration: t_e = (a + 4m + b) / 6',
                'Computed PERT Variance: σ² = ((b − a) / 6)²',
                'Understood the difference between AOA (Arrow) and AON (Node) diagrams',
                'Reported project costs and crashing rates in Indian Rupees (₹)',
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
              "Welcome to Segment 4 (CPM & PERT), Debangshu, Mamata, Mahima, Susmita, and Abhronila! Project Network Analysis is one of the most practical and high-impact branches of Operations Research. Whether you are managing blast furnace overhauls in Barrackpore, subway extensions in Kolkata, or high-tech labs in Jadavpur, mastering network topology, critical paths, and project crashing will make you an elite operations executive. In our next topic (Topic 1), we will explore the fundamental Assumptions of CPM & PERT!"
            }
          />
        </section>

        {/* SECTION 11: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Project Network Analysis FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 12: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Meaning of Project Network Analysis (CPM & PERT)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic1_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic0;
