// src/components/study/quantitative-analysis/topics/004_001_critical-path-method-and-pert/Topic11.jsx
// React 19 Function-based Component
// Module: 004_001_critical-path-method-and-pert
// Topic 11: Basic PERT concept

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic11_files/topic11_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic11_files/topic11_note.txt?raw';

// Standard Normal CDF Approximation (Abramowitz & Stegun formula)
function normalCDF(z) {
  if (z < -6) return 0;
  if (z > 6) return 1;
  const b1 = 0.319381530;
  const b2 = -0.356563782;
  const b3 = 1.781477937;
  const b4 = -1.821255978;
  const b5 = 1.330274429;
  const p = 0.2316419;
  const c = 0.39894228;

  if (z >= 0) {
    const t = 1.0 / (1.0 + p * z);
    return 1.0 - c * Math.exp(-z * z / 2.0) * t * (t * (t * (t * (t * b5 + b4) + b3) + b2) + b1);
  } else {
    const t = 1.0 / (1.0 - p * z);
    return c * Math.exp(-z * z / 2.0) * t * (t * (t * (t * (t * b5 + b4) + b3) + b2) + b1);
  }
}

const Topic11 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);

  // Part 1: Activity 3-Time State
  const [to, setTo] = useState(4);
  const [tm, setTm] = useState(7);
  const [tp, setTp] = useState(16);

  const te = (Number(to) + 4 * Number(tm) + Number(tp)) / 6;
  const sigmaAct = (Number(tp) - Number(to)) / 6;
  const varAct = Math.pow(sigmaAct, 2);

  // Part 2: Project Z-Score State
  const [projMean, setProjMean] = useState(30);
  const [projSigma, setProjSigma] = useState(4);
  const [targetDate, setTargetDate] = useState(34);

  const zScore = projSigma > 0 ? (Number(targetDate) - Number(projMean)) / Number(projSigma) : 0;
  const probability = normalCDF(zScore) * 100;

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
      title: '1. Foundry R&D Alloy Sintering PERT Model (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Used 3-time estimates to model furnace refractory sintering (a=4, m=7, b=16) in Barrackpore, calculating t_e = 8 days and variance = 4 days² across a ₹1.8 Lakh R&D trial.',
      lesson: '3-time estimates absorb technological variance without relying on rigid deterministic dates.',
    },
    {
      title: '2. Cold-Chain Vaccine Facility Delivery Confidence (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Calculated μ_proj = 30 days and σ_proj = 4 days in Kolkata, proving a 84.13% probability of completing emergency cold storage before target day T_S = 34.',
      lesson: 'Z-score deliverability probabilities provide executive confidence for critical public health logistics.',
    },
    {
      title: '3. Supermarket FMCG Conveyor Robotic Automation Risk (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Computed Z = +1.50 (93.3% probability) for automated robotic parcel conveyor calibration in Ichapur, securing a ₹45 Lakh retail grant with zero delivery risk.',
      lesson: 'High Z-scores satisfy institutional financing and milestone assurance requirements.',
    },
    {
      title: '4. Educational High-Tech Lab Research Grant Delivery Assurance (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Presented a certified PERT Z-score report (Z = +2.15, 98.4% confidence) to university finance auditors in Jadavpur for a ₹55 Lakh nanotechnology cleanroom.',
      lesson: 'Statistical confidence intervals prevent contractual liquidated damages in uncertain R&D grants.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes pertGlow {
          0%, 100% { border-color: rgba(56, 189, 248, 0.3); }
          50% { border-color: rgba(56, 189, 248, 0.8); }
        }
        .glow-pert {
          animation: pertGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Segment 4 • Module 004_001 • Topic 11
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Probabilistic Modeling • Beta Distribution • Z-Score Deliverability
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Basic PERT Concept
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive study of the <span className="text-sky-400 font-semibold">Program Evaluation and Review Technique (PERT)</span>: the Three-Time Estimate Model (<span className="text-amber-400 font-mono">t_o, t_m, t_p</span>), the <span className="text-emerald-400 font-semibold">Beta Distribution Equations</span> (<span className="text-cyan-400 font-mono">t_e, σ²</span>), Central Limit Theorem, and <span className="text-purple-400 font-semibold">Standard Normal Z-Score Probability</span> in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'pert-theory', label: '1. PERT 3-Time Model' },
              { id: 'beta-calc', label: '2. Activity Beta Calculator' },
              { id: 'z-score-sim', label: '3. Project Z-Score Simulator' },
              { id: 'cpm-vs-pert', label: '4. CPM vs PERT Matrix' },
              { id: 'svg-curves', label: '5. Beta & Normal Curves SVG' },
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

        {/* SECTION 1: PERT 3-Time Model */}
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
                The Three-Time Estimate Model & Beta Distribution
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-bold">1. Optimistic Time (t_o / a)</span>
                <p className="text-slate-300 text-xs">
                  Best-case scenario under ideal operating conditions (p ≤ 1%).
                </p>
                <span className="text-emerald-400 font-mono text-[11px]">Weight = 1 / 6</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-300 font-bold">2. Most Likely Time (t_m / m)</span>
                <p className="text-slate-300 text-xs">
                  Modal, most probable duration under normal operating circumstances.
                </p>
                <span className="text-amber-300 font-mono text-[11px]">Weight = 4 / 6 (4x Weight!)</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-rose-400 font-bold">3. Pessimistic Time (t_p / b)</span>
                <p className="text-slate-300 text-xs">
                  Worst-case scenario duration under adverse delays (p ≤ 1%).
                </p>
                <span className="text-rose-400 font-mono text-[11px]">Weight = 1 / 6</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Activity Beta Calculator */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-pert">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Activity Beta Distribution Calculator
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <label className="text-xs font-semibold text-emerald-400">Optimistic Time (t_o):</label>
                <input
                  type="number"
                  value={to}
                  onChange={(e) => setTo(Number(e.target.value))}
                  className="px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-white font-mono text-xs"
                />
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <label className="text-xs font-semibold text-amber-300">Most Likely Time (t_m):</label>
                <input
                  type="number"
                  value={tm}
                  onChange={(e) => setTm(Number(e.target.value))}
                  className="px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-white font-mono text-xs"
                />
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <label className="text-xs font-semibold text-rose-400">Pessimistic Time (t_p):</label>
                <input
                  type="number"
                  value={tp}
                  onChange={(e) => setTp(Number(e.target.value))}
                  className="px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-white font-mono text-xs"
                />
              </div>
            </div>

            {/* Calculated Beta Output */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs sm:text-sm">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-slate-400 font-sans text-xs">Expected Duration (t_e):</span>
                <span className="text-sky-300 font-bold text-base">t_e = {te.toFixed(2)} Days</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-slate-400 font-sans text-xs">Standard Deviation (σ):</span>
                <span className="text-purple-300 font-bold text-base">σ = {sigmaAct.toFixed(2)} Days</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-slate-400 font-sans text-xs">Activity Variance (σ²):</span>
                <span className="text-amber-400 font-bold text-base">σ² = {varAct.toFixed(2)} Days²</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Project Z-Score Simulator */}
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
                Project Deliverability Z-Score & Normal Probability Simulator
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <label className="text-xs font-semibold text-cyan-400">Project Mean (μ_proj):</label>
                <input
                  type="number"
                  value={projMean}
                  onChange={(e) => setProjMean(Number(e.target.value))}
                  className="px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-white font-mono text-xs"
                />
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <label className="text-xs font-semibold text-purple-400">Project Std Dev (σ_proj):</label>
                <input
                  type="number"
                  value={projSigma}
                  onChange={(e) => setProjSigma(Number(e.target.value))}
                  className="px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-white font-mono text-xs"
                />
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <label className="text-xs font-semibold text-amber-300">Target Date (T_S):</label>
                <input
                  type="number"
                  value={targetDate}
                  onChange={(e) => setTargetDate(Number(e.target.value))}
                  className="px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-white font-mono text-xs"
                />
              </div>
            </div>

            {/* Z-Score Results */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-slate-400 font-sans text-xs">Standard Normal Z-Score:</span>
                <span className="text-cyan-300 font-bold text-lg">Z = ({targetDate} − {projMean}) / {projSigma} = {zScore.toFixed(2)}</span>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-600 flex flex-col space-y-1">
                <span className="text-slate-300 font-sans text-xs">Completion Probability P(T ≤ T_S):</span>
                <span className="text-emerald-400 font-bold text-xl">{probability.toFixed(2)}% Confidence ⭐</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: CPM vs PERT Matrix */}
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
                Comprehensive CPM vs PERT Comparison Matrix
              </h2>
            </div>

            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                    <th className="p-2.5">Dimension</th>
                    <th className="p-2.5 text-sky-400">Critical Path Method (CPM)</th>
                    <th className="p-2.5 text-emerald-400">PERT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="p-2.5 font-bold text-white">Model Nature</td>
                    <td className="p-2.5 text-sky-300">Deterministic (Known fixed times)</td>
                    <td className="p-2.5 text-emerald-300">Probabilistic (3-Time estimates)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white">Orientation</td>
                    <td className="p-2.5 text-sky-300">Activity-oriented</td>
                    <td className="p-2.5 text-emerald-300">Event-oriented</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white">Distribution</td>
                    <td className="p-2.5 text-sky-300">Fixed Point</td>
                    <td className="p-2.5 text-emerald-300">Beta Distribution (CLT ➔ Normal)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white">Optimization</td>
                    <td className="p-2.5 text-sky-300">Time-Cost Crashing (Cost Slope)</td>
                    <td className="p-2.5 text-emerald-300">Risk Mitigation & Probability</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white">Typical Application</td>
                    <td className="p-2.5 text-sky-300">Civil construction, plant shutdowns</td>
                    <td className="p-2.5 text-emerald-300">R&D, Aerospace, Defense, Tech startups</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white">Financial Units</td>
                    <td className="p-2.5 text-sky-300 font-bold">Indian Rupees (₹)</td>
                    <td className="p-2.5 text-emerald-300 font-bold">Indian Rupees (₹)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 5: Beta & Normal Curves SVG */}
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
                Beta Distribution vs Gaussian Bell Curve Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 200"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Left: Beta Curve */}
                <line x1="50" y1="160" x2="330" y2="160" stroke="#475569" strokeWidth="2" />
                <path d="M 60,160 Q 120,40 180,100 T 320,160" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
                <text x="190" y="30" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">Activity Beta Curve</text>
                <text x="60" y="175" fill="#34d399" fontSize="10">t_o (a)</text>
                <text x="150" y="175" fill="#f59e0b" fontSize="10" fontWeight="bold">t_m (m)</text>
                <text x="320" y="175" fill="#f43f5e" fontSize="10">t_p (b)</text>

                {/* Right: Normal Gaussian Curve */}
                <line x1="410" y1="160" x2="690" y2="160" stroke="#475569" strokeWidth="2" />
                <path d="M 420,160 Q 550,30 680,160" fill="none" stroke="#38bdf8" strokeWidth="3" />
                <text x="550" y="25" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Project Normal Bell Curve (CLT)</text>
                <line x1="550" y1="40" x2="550" y2="160" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3,3" />
                <text x="550" y="175" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">μ_project (50%)</text>
                <line x1="620" y1="80" x2="620" y2="160" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="3,3" />
                <text x="620" y="175" fill="#a855f7" fontSize="10" fontWeight="bold" textAnchor="middle">T_S (+1σ: 84%)</text>
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
                Bengal Operations Research PERT Case Studies
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
                  trap: 'Summing Standard Deviations Directly Across the Critical Path',
                  fix: 'Variances add linearly, but standard deviations DO NOT add; always sum variances first: σ_proj = sqrt(Σ σ_i²).',
                },
                {
                  trap: 'Assuming Probability is 100% when Target Date Equals Expected Duration (T_S = μ)',
                  fix: 'When T_S = μ_project, Z = 0 and completion probability is EXACTLY 50% (never 100%).',
                },
                {
                  trap: 'Including Non-Critical Activities in Project Variance Sums',
                  fix: 'Only activities situated strictly on the Critical Path contribute to the project variance and mean duration.',
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
                  Think of PERT as looking at the weather forecast instead of a fixed clock: the 3-time estimates create a probability distribution that lets you tell stakeholders the exact probability of finishing before storm season!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how the Central Limit Theorem transforms asymmetric individual Beta distributions into a clean Gaussian Normal Bell Curve for total project duration!
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
                Student Revision Checklist (Topic 11)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Estimated Optimistic (a), Most Likely (m), and Pessimistic (b) times',
                'Computed Expected Activity Duration: t_e = (a + 4m + b) / 6',
                'Computed Activity Standard Deviation: σ = (b − a) / 6',
                'Computed Activity Variance: σ² = [ (b − a) / 6 ]²',
                'Summed t_e and variances strictly along the Critical Path',
                'Computed Standard Normal Z-Score: Z = (T_S − μ) / σ_proj',
                'Determined deliverability probability P(T ≤ T_S) using normal distribution',
                'Stated project risk reserves and R&D budgets in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: PERT equips you with probabilistic superpowers when facing real-world R&D and engineering uncertainty! Always remember: t_e = (a + 4m + b)/6, variances add on the critical path (standard deviations do not!), and Z = (T_S − μ)/σ. In our final master topic (Topic 12), we will review the entire CPM & PERT module with comprehensive Short Questions and viva flashcards!"
            }
          />
        </section>

        {/* SECTION 11: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Basic PERT Concept FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 12: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Basic PERT Concept (CPM & PERT)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic12_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic11;
