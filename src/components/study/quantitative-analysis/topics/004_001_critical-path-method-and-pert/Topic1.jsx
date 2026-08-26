// src/components/study/quantitative-analysis/topics/004_001_critical-path-method-and-pert/Topic1.jsx
// React 19 Function-based Component
// Module: 004_001_critical-path-method-and-pert
// Topic 1: Assumptions of CPM/PERT

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic1_files/topic1_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic1_files/topic1_note.txt?raw';

const Topic1 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedAssumption, setSelectedAssumption] = useState(0);

  // CLT Z-Score Calculator State
  const [meanCp, setMeanCp] = useState(28);
  const [stdDevCp, setStdDevCp] = useState(2.5);
  const [targetTs, setTargetTs] = useState(30);

  const zScore = ((targetTs - meanCp) / (stdDevCp || 1)).toFixed(2);

  // Approximate standard normal CDF
  const computeNormalCdf = (z) => {
    const numZ = parseFloat(z);
    if (isNaN(numZ)) return 50.0;
    // Standard numerical approximation of Phi(z)
    const t = 1.0 / (1.0 + 0.2316419 * Math.abs(numZ));
    const d = 0.3989423 * Math.exp((-numZ * numZ) / 2.0);
    const prob =
      1.0 -
      d *
        t *
        (0.3193815 +
          t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    const finalProb = numZ &ge; 0 ? prob : 1.0 - prob;
    return (finalProb * 100).toFixed(2);
  };

  const probPercentage = computeNormalCdf(zScore);

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

  const assumptionsData = [
    {
      title: '1. Directed Acyclic Graph (DAG) Topology',
      category: 'Structure',
      badgeColor: 'bg-sky-950 text-sky-300 border-sky-800',
      math: 'G = (V, E) where no path exists such that v_i ➔ ... ➔ v_i',
      desc: 'The project consists of discrete, non-overlapping activities. Precedence relationships form a strict Directed Acyclic Graph with zero backward loops or recursive cycles.',
      impact: 'Guarantees that topological sorting and linear-time forward/backward passes are solvable.',
    },
    {
      title: '2. Statistical Activity Independence',
      category: 'Probability',
      badgeColor: 'bg-purple-950 text-purple-300 border-purple-800',
      math: 'Cov(T_i, T_j) = 0 for all i ≠ j',
      desc: 'The duration and execution of one activity is statistically independent of any other activity in the network. Delays in one task do not alter the duration distribution of unrelated tasks.',
      impact: 'Enables linear variance summation: σ_project² = ∑ σ_i² without complex cross-covariance matrices.',
    },
    {
      title: '3. Deterministic Times & Linear Crashing (CPM)',
      category: 'Cost Modeling',
      badgeColor: 'bg-amber-950 text-amber-300 border-amber-800',
      math: 'Cost Slope = (Crash Cost − Normal Cost) / (Normal Time − Crash Time) = Constant',
      desc: 'In CPM, task durations are known with single-point certainty. Crashing an activity incurs a direct expense that increases strictly linearly with each day shortened.',
      impact: 'Allows formulation of project crashing as a linear programming optimization model.',
    },
    {
      title: '4. Beta Distribution for Task Durations (PERT)',
      category: 'Probability',
      badgeColor: 'bg-purple-950 text-purple-300 border-purple-800',
      math: 't_e = (a + 4m + b) / 6,   σ² = ((b − a) / 6)²',
      desc: 'Individual activity durations in PERT follow a continuous, unimodal Beta distribution parameterized by Optimistic (a), Most Likely (m), and Pessimistic (b) estimates.',
      impact: 'Accommodates positive skewness and finite realistic lower/upper completion bounds.',
    },
    {
      title: '5. Central Limit Theorem & Normal Convergence',
      category: 'Probability',
      badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-800',
      math: 'Total Duration T_cp ~ N(μ_cp, σ_cp²) as path length n increases',
      desc: 'Although individual tasks follow Beta distributions, the total critical path duration converges to a symmetric Normal distribution by the Central Limit Theorem.',
      impact: 'Enables standard normal Z-score calculations: Z = (T_s − μ) / σ to evaluate delivery confidence.',
    },
    {
      title: '6. Unconstrained Initial Resource Availability',
      category: 'Resource Flow',
      badgeColor: 'bg-indigo-950 text-indigo-300 border-indigo-800',
      math: 'Baseline Resource Capacity R(t) = ∞',
      desc: 'Classical CPM/PERT calculates earliest/latest event times assuming unlimited labor, machinery, and capital; physical constraints are handled in secondary leveling phases.',
      impact: 'Separates pure technological precedence from resource-constrained scheduling.',
    },
    {
      title: '7. Single Critical Path Dominance (No Merge Bias)',
      category: 'Risk Analysis',
      badgeColor: 'bg-rose-950 text-rose-300 border-rose-800',
      math: 'Project Completion Variance σ_total² = ∑_{i ∈ CP} σ_i²',
      desc: 'PERT assumes the identified critical path completely dominates total project variance, assuming non-critical paths have sufficient slack that they will not breach the schedule.',
      impact: 'Simplifies variance calculation, though managers must stay alert to near-critical paths.',
    },
  ];

  const currentAssumptionObj = assumptionsData[selectedAssumption];

  // Case Studies
  const caseStudies = [
    {
      title: '1. Foundry Overhaul DAG Verification (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Verified the Directed Acyclic Graph topology of a 14-task furnace rebuild in Barrackpore, detecting and eliminating an accidental recursive cycle between refractory coating and curing.',
      lesson: 'Acyclic verification prevents infinite loops in automated project scheduling software.',
    },
    {
      title: '2. Cold-Chain Vaccine Facility CLT Modeling (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Modeled 8 critical-path installation tasks in Kolkata (mean = 45 days, std dev = 3 days), using the Central Limit Theorem to guarantee 95% confidence of on-time hospital launch.',
      lesson: 'Central Limit Theorem normal convergence allows statistical contractual guarantees.',
    },
    {
      title: '3. Automated Conveyor Beta Distribution Modeling (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Applied the Beta distribution formula t_e = (6 + 4(9) + 18)/6 = 10 days in Ichapur, isolating a variance of 4 days² to evaluate regional warehouse launch risks.',
      lesson: 'Three-time Beta estimates capture positive skewness in complex mechanical engineering.',
    },
    {
      title: '4. Educational High-Tech Lab Precedence Audit (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Audited a ₹55 Lakh university research grant project network in Jadavpur, verifying that task independence held across electrical, civil, and robotics contractor teams.',
      lesson: 'Independent contractor work streams satisfy statistical independence assumptions.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes asmGlow {
          0%, 100% { border-color: rgba(168, 85, 247, 0.3); }
          50% { border-color: rgba(168, 85, 247, 0.8); }
        }
        .glow-asm {
          animation: asmGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-purple-950/80 text-purple-400 border border-purple-800/60">
              Segment 4 • Module 004_001 • Topic 1
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-purple-950/80 text-purple-400 border border-purple-800/60">
              Theoretical Assumptions • Beta Distribution • Central Limit Theorem
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Assumptions of CPM & PERT
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A rigorous exploration of the <span className="text-purple-400 font-semibold">Seven Mathematical and Operational Assumptions</span> underpinning network analysis: Directed Acyclic Graphs (DAG), <span className="text-sky-400 font-semibold">Statistical Activity Independence</span>, the <span className="text-amber-400 font-semibold">Beta Distribution</span> for task durations, and the <span className="text-emerald-400 font-semibold">Central Limit Theorem (CLT)</span> for project delivery confidence.
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'seven-assumptions', label: '1. The 7 Assumptions' },
              { id: 'interactive-inspector', label: '2. Assumptions Inspector' },
              { id: 'clt-simulator', label: '3. CLT Z-Score Simulator' },
              { id: 'svg-clt', label: '4. CLT Convergence SVG' },
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
              &gt;
                {item.label}
              </button>
            ))}
          </div>
        </header>

        {/* SECTION 1: The 7 Assumptions */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-600/20 text-purple-400 font-bold text-sm">
                01
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                The 7 Mathematical Pillars of CPM/PERT
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-sky-300 font-bold">1. Acyclic Graph (DAG)</span>
                <p className="text-slate-300">No recursive loops or feedback cycles.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-purple-300 font-bold">2. Activity Independence</span>
                <p className="text-slate-300">Covariance between activities is zero (Cov = 0).</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-amber-300 font-bold">3. Linear Crashing (CPM)</span>
                <p className="text-slate-300">Direct cost increases linearly as duration drops.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-pink-300 font-bold">4. Beta Distribution (PERT)</span>
                <p className="text-slate-300">Unimodal, skewed durations: t_e = (a + 4m + b)/6.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-emerald-300 font-bold">5. Central Limit Theorem</span>
                <p className="text-slate-300">Sum of critical path tasks follows Normal curve.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-bold">6. Unlimited Baseline Capacity</span>
                <p className="text-slate-300">Resources available as needed; leveled later.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Assumptions Inspector */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-asm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-600/20 text-purple-400 font-bold text-sm">
                  02
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Interactive Assumptions Deep-Dive Inspector
                </h2>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {assumptionsData.map((a, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedAssumption(idx)}
                    className={clsx(
                      'px-2.5 py-1 rounded text-xs font-semibold transition-all border',
                      selectedAssumption === idx
                        ? 'bg-purple-600 text-white border-purple-400 shadow-md'
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                    )}
                  &gt;
                    A{idx + 1}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">{currentAssumptionObj.title}</h3>
              <span className={clsx('px-3 py-1 rounded-full text-xs font-mono font-bold border', currentAssumptionObj.badgeColor)}>
                {currentAssumptionObj.category}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2 text-xs sm:text-sm">
              <span className="text-purple-300 font-mono font-bold">Mathematical Formulation:</span>
              <div className="p-2.5 rounded-lg bg-slate-900 text-cyan-300 font-mono text-xs border border-slate-800">
                {currentAssumptionObj.math}
              </div>
              <p className="text-slate-300 pt-1">{currentAssumptionObj.desc}</p>
              <div className="pt-2 border-t border-slate-800 text-emerald-400 font-semibold text-xs">
                💡 <strong>Operations Impact:</strong> {currentAssumptionObj.impact}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: CLT Z-Score Simulator */}
        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          data-index="2"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                03
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Central Limit Theorem (CLT) Z-Score Simulator
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                <label className="text-xs font-semibold text-sky-400">Expected Duration (μ_cp) [Days]:</label>
                <input
                  type="number"
                  value={meanCp}
                  onChange={(e) => setMeanCp(Number(e.target.value))}
                  className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono text-sm"
                /&gt;
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                <label className="text-xs font-semibold text-purple-400">Standard Deviation (σ_cp) [Days]:</label>
                <input
                  type="number"
                  step="0.1"
                  value={stdDevCp}
                  onChange={(e) => setStdDevCp(Number(e.target.value))}
                  className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono text-sm"
                /&gt;
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                <label className="text-xs font-semibold text-emerald-400">Target Deadline (T_s) [Days]:</label>
                <input
                  type="number"
                  value={targetTs}
                  onChange={(e) => setTargetTs(Number(e.target.value))}
                  className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono text-sm"
                /&gt;
              </div>
            </div>

            {/* Results */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 font-mono text-xs sm:text-sm">
              <div>
                <span className="text-slate-400 font-sans">Formula: </span>
                <span className="text-purple-300 font-bold">Z = (T_s − μ_cp) / σ_cp</span>
                <div className="text-cyan-400 font-bold text-base mt-1">
                  Z-Score = {zScore}
                </div>
              </div>

              <div>
                <span className="text-slate-400 font-sans">Completion Confidence: </span>
                <div className="text-emerald-400 font-bold text-lg mt-1">
                  P(T ≤ {targetTs} Days) = {probPercentage}%
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: CLT Convergence SVG */}
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
                Central Limit Theorem Convergence: Beta to Normal
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 200"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Individual Beta tasks */}
                <rect x="30" y="40" width="180" height="120" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <text x="120" y="70" fill="#f43f5e" fontSize="12" fontWeight="bold" textAnchor="middle">1. Individual Tasks</text>
                <text x="120" y="95" fill="#ffffff" fontSize="11" fontFamily="monospace" textAnchor="middle">Beta(a, m, b)</text>
                <text x="120" y="120" fill="#fecdd3" fontSize="9" textAnchor="middle">Positively Skewed</text>

                <line x1="215" y1="100" x2="275" y2="100" stroke="#94a3b8" strokeWidth="2" />
                <polygon points="275,100 265,95 265,105" fill="#94a3b8" />

                {/* Summation along Critical Path */}
                <rect x="280" y="40" width="180" height="120" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="370" y="70" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">2. Path Summation</text>
                <text x="370" y="95" fill="#ffffff" fontSize="11" fontFamily="monospace" textAnchor="middle">T_cp = ∑ T_i</text>
                <text x="370" y="120" fill="#cbd5e1" fontSize="9" textAnchor="middle">Independence Holds</text>

                <line x1="465" y1="100" x2="525" y2="100" stroke="#94a3b8" strokeWidth="2" />
                <polygon points="525,100 515,95 515,105" fill="#94a3b8" />

                {/* Normal Distribution Result */}
                <rect x="530" y="40" width="180" height="120" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="620" y="70" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">3. Total Project</text>
                <text x="620" y="95" fill="#ffffff" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">Normal N(μ, σ²)</text>
                <text x="620" y="120" fill="#a7f3d0" fontSize="9" textAnchor="middle">CLT Guarantees Z-Score</text>
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
                Bengal Operations Research Assumptions Case Studies
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
                  trap: 'Directly Summing Standard Deviations (σ_total ≠ σ₁ + σ₂)',
                  fix: 'ALWAYS sum variances (σ²) along the critical path, then take the square root to get total project standard deviation.',
                },
                {
                  trap: 'Assuming 50% Probability Mean is a Guarantee',
                  fix: 'In PERT, reaching the expected mean μ_cp only provides a 50% probability of on-time completion.',
                },
                {
                  trap: 'Ignoring Near-Critical Paths with High Variance',
                  fix: 'High variance can push a near-critical task to exceed the critical path during real-world execution.',
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
                  Think of the Central Limit Theorem as a magical blender: no matter how skewed or weird individual task durations are, summing them along the critical path creates a smooth, bell-shaped normal curve!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how the formula Z = (T_s − μ) / σ quantifies delivery risk: a target date 2 standard deviations above the mean provides over 97% confidence!
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
                Student Revision Checklist (Topic 1)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Mastered the 7 foundational assumptions of CPM and PERT',
                'Computed PERT Expected Duration: t_e = (a + 4m + b) / 6',
                'Computed PERT Variance: σ² = ((b − a) / 6)²',
                'Summed variances along the critical path: σ_cp = √(∑ σ_i²)',
                'Computed standard normal Z-scores: Z = (T_s − μ_cp) / σ_cp',
                'Reported project crashing figures with Indian Rupee (₹) currency symbols',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: Understanding the mathematical assumptions behind CPM and PERT prevents costly real-world mistakes! Remember: individual task durations follow the Beta distribution, but total project duration converges to the Normal distribution through the Central Limit Theorem. In our next topic (Topic 2), we will dissect the fundamental building block of every project network: Activity, Task or Job!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Assumptions of CPM/PERT FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Assumptions of CPM/PERT"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic2_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic1;
