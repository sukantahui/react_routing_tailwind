// src/components/study/quantitative-analysis/topics/003_001_hungarian-method-for-assignment-problems/Topic15.jsx
// React 19 Function-based Component
// Module: 003_001_hungarian-method-for-assignment-problems
// Topic 15: Conversion of maximization problems

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic15_files/topic15_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic15_files/topic15_note.txt?raw';

const Topic15 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [currentStep, setCurrentStep] = useState(0); // 0: Raw Profit, 1: Regret Matrix, 2: Hungarian Reduced, 3: Zero Allocation, 4: Final Maximum Profit

  const salesNames = ['Debangshu (S1)', 'Susmita (S2)', 'Mamata (S3)', 'Mahima (S4)'];
  const territoryNames = ['Territory 1', 'Territory 2', 'Territory 3', 'Territory 4'];

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

  const stepsData = [
    {
      step: 0,
      title: 'Step 1: Raw Profit Matrix (P) & M_max Identification',
      badge: 'M_max = ₹41',
      badgeColor: 'bg-indigo-950 text-indigo-300 border-indigo-800',
      description: 'The matrix represents projected sales turnover in Lakhs of Indian Rupees (₹). Largest element across entire matrix is M_max = 41.',
      matrix: [
        ['₹32', '₹38', '₹40', '₹28'],
        ['₹40', '₹24', '₹28', '₹21'],
        ['₹41', '₹27', '₹33', '₹30'],
        ['₹22', '₹38', '₹41', '₹36'],
      ],
      annotations: 'Largest Profit Entry: Cell (3, 1) and Cell (4, 3) = ₹41.',
    },
    {
      step: 1,
      title: 'Step 2: Relative Regret Matrix (C = M_max − P)',
      badge: 'C_regret = 41 − P',
      badgeColor: 'bg-sky-950 text-sky-300 border-sky-800',
      description: 'Subtracting every element from 41 converts the profit matrix into an opportunity loss matrix with all entries ≥ 0.',
      matrix: [
        ['9', '3', '1', '13'],
        ['1', '17', '13', '20'],
        ['0', '14', '8', '11'],
        ['19', '3', '0', '5'],
      ],
      annotations: 'All entries are non-negative. Min regret 0 at (3, 1) and (4, 3).',
    },
    {
      step: 2,
      title: 'Step 3: Hungarian Row & Column Reductions on Regret Matrix',
      badge: 'Regret Reduced',
      badgeColor: 'bg-cyan-950 text-cyan-300 border-cyan-800',
      description: 'Applying standard Hungarian row/col reductions creates zero-cost candidates across all rows and columns.',
      matrix: [
        ['8', '2', '0', '12'],
        ['0', '16', '12', '19'],
        ['0', '14', '8', '11'],
        ['19', '3', '0', '5'],
      ],
      annotations: 'Row & Col reductions complete. Ready for line covering test.',
    },
    {
      step: 3,
      title: 'Step 4: Independent Zero Selection on Regret Matrix',
      badge: '4 Zeros Boxed [0]',
      badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-800',
      description: 'Extracting 4 independent zeros yields optimal coordinates: (S1➔T3), (S2➔T1), (S3➔T4), (S4➔T2).',
      matrix: [
        ['8', '2', '[0] ⭐ (₹40)', '12'],
        ['[0] ⭐ (₹40)', '16', '12', '19'],
        ['(X)', '14', '8', '[0] ⭐ (₹30)'],
        ['19', '[0] ⭐ (₹38)', '(X)', '5'],
      ],
      annotations: 'Minimum Total Regret achieved. Optimal pairing coordinates locked in.',
    },
    {
      step: 4,
      title: 'Step 5: Maximum Total Profit Lookup from Original Matrix',
      badge: 'Max Profit Z* = ₹148',
      badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-800',
      description: 'Pulling original profit rates: S1➔T3 (₹40), S2➔T1 (₹40), S3➔T4 (₹30), S4➔T2 (₹38). Total Profit = ₹148 Lakhs.',
      matrix: [
        ['₹32', '₹38', 'x₁₃ = 1 (₹40)', '₹28'],
        ['x₂₁ = 1 (₹40)', '₹24', '₹28', '₹21'],
        ['₹41', '₹27', '₹33', 'x₃₄ = 1 (₹30)'],
        ['₹22', 'x₄₂ = 1 (₹38)', '₹41', '₹36'],
      ],
      annotations: 'Certified Maximum Profit: Z* = 40 + 40 + 30 + 38 = ₹148 Lakhs.',
    },
  ];

  const currentStepObj = stepsData[currentStep];

  // Case Studies
  const caseStudies = [
    {
      title: '1. Foundry Export Sales Territory Maximization (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Assigned 4 technical sales managers across 4 international casting export territories in Barrackpore, maximizing quarterly turnover at ₹148 Lakhs.',
      lesson: 'Converting profit to regret maximizes total revenue without altering 1-to-1 constraint structures.',
    },
    {
      title: '2. Cold-Chain Vaccine Preventive Health Turnout (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Assigned pediatric medical teams across 4 high-density municipal clinics in Kolkata, maximizing total immunizations to 14,800 doses.',
      lesson: 'Maximizing patient turnout follows the exact same regret transformation protocol.',
    },
    {
      title: '3. Supermarket FMCG Retail Sales Turnover Maximization (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Converted a 4x4 FMCG branch turnover matrix in Ichapur into an opportunity loss matrix, maximizing monthly gross retail sales to ₹148 Lakhs.',
      lesson: 'Opportunity loss formulations ensure stores are matched with their highest-performing directors.',
    },
    {
      title: '4. Educational Press Textbook Production Yield Maximization (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Scheduled 4 textbook printing presses in Jadavpur, maximizing daily binding yield to 14,800 finished school textbooks for West Bengal schools.',
      lesson: 'Yield maximization guarantees maximum utilization of capital machinery.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes maxGlow {
          0%, 100% { border-color: rgba(234, 179, 8, 0.3); }
          50% { border-color: rgba(234, 179, 8, 0.8); }
        }
        .glow-max {
          animation: maxGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-amber-950/80 text-amber-400 border border-amber-800/60">
              Segment 3 • Module 003_001 • Topic 15
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-amber-950/80 text-amber-400 border border-amber-800/60">
              Relative Regret Matrix • M_max − P Inversion
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Conversion of Maximization Problems
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive guide on solving <span className="text-amber-400 font-semibold">Maximization Assignment Problems</span>: identifying the global maximum (<span className="text-cyan-400 font-mono">M_max = max(P)</span>), constructing the <span className="text-emerald-400 font-semibold">Relative Regret Matrix</span> (<span className="text-emerald-400 font-mono">cᵢⱼ = M_max − pᵢⱼ</span>), solving via the 5-step Hungarian solver, and certifying the <span className="text-emerald-400 font-bold">Maximum Total Profit (Z*)</span> in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'conversion-math', label: '1. Regret Transformation Math' },
              { id: 'interactive-stepper', label: '2. Profit-to-Regret Stepper' },
              { id: 'solution-manifest', label: '3. Final Profit Manifest' },
              { id: 'svg-pipeline', label: '4. Regret Pipeline SVG' },
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
                    ? 'bg-amber-600 text-white border-amber-500 shadow-md shadow-amber-900/40'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
                )}
              &gt;
                {item.label}
              </button>
            ))}
          </div>
        </header>

        {/* SECTION 1: Regret Transformation Math */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 font-bold text-sm">
                01
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Relative Regret Transformation Mathematics
              </h2>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2 font-mono text-xs sm:text-sm">
              <span className="text-amber-300 font-bold font-sans text-base">Mathematical Transformation:</span>
              <p className="text-slate-300 font-sans">
                1. Identify largest matrix entry: &nbsp; <span className="font-mono text-cyan-300 font-bold">M_max = max&#123; pᵢⱼ &#125;</span><br />
                2. Form Relative Regret Matrix: &nbsp; <span className="font-mono text-emerald-400 font-bold">cᵢⱼ = M_max − pᵢⱼ</span>
              </p>
              <div className="pt-2 border-t border-slate-800 text-white font-sans">
                <strong>Invariance Proof:</strong> &nbsp; min ∑ (M_max − pᵢⱼ) xᵢⱼ = n · M_max − max ∑ pᵢⱼ xᵢⱼ.<br />
                <span className="text-emerald-300 text-xs">
                  Therefore, minimizing total opportunity loss strictly MAXIMIZES total profit!
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Profit-to-Regret Stepper */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-max">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 font-bold text-sm">
                  02
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Interactive Profit-to-Regret Stepper
                </h2>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[0, 1, 2, 3, 4].map((idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentStep(idx)}
                    className={clsx(
                      'px-2.5 py-1 rounded text-xs font-semibold transition-all border',
                      currentStep === idx
                        ? 'bg-amber-600 text-white border-amber-400 shadow-md'
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                    )}
                  &gt;
                    Step {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-white">{currentStepObj.title}</h3>
                <span className="text-xs text-slate-400">{currentStepObj.description}</span>
              </div>
              <span className={clsx('px-3 py-1 rounded-full text-xs font-mono font-bold border', currentStepObj.badgeColor)}>
                {currentStepObj.badge}
              </span>
            </div>

            {/* Matrix View */}
            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-center border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2 text-left font-semibold text-slate-300 font-sans">Sales Reps \ Territories</th>
                    {territoryNames.map((t, idx) => (
                      <th key={idx} className="p-2 font-semibold text-cyan-300 font-sans">
                        {t}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {salesNames.map((sName, rIdx) => (
                    <tr key={rIdx}>
                      <td className="p-2 text-left font-medium text-slate-200 font-sans">{sName}</td>
                      {currentStepObj.matrix[rIdx].map((cellText, cIdx) => (
                        <td key={cIdx} className="p-2">
                          <div
                            className={clsx(
                              'p-2.5 rounded-lg font-bold transition-all border flex items-center justify-center',
                              cellText.includes('x₁₃') || cellText.includes('x₂₁') || cellText.includes('x₃₄') || cellText.includes('x₄₂') || cellText.includes('[0]')
                                ? 'bg-emerald-950 text-emerald-300 border-emerald-500 shadow-md shadow-emerald-950/60 scale-105 animate-pulse'
                                : cellText === '₹41'
                                ? 'bg-amber-950/80 text-amber-300 border-amber-600'
                                : 'bg-slate-900 text-slate-300 border-slate-800'
                            )}
                          >
                            {cellText}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex items-center justify-between text-xs sm:text-sm">
              <span className="text-amber-300 font-semibold font-mono">⚡ Working Log:</span>
              <span className="text-slate-200">{currentStepObj.annotations}</span>
            </div>

            {/* Next/Prev Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentStep((prev) => (prev > 0 ? prev - 1 : 4))}
                className="px-3.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 text-xs font-semibold"
              >
                ◀ Previous Step
              </button>
              <button
                onClick={() => setCurrentStep((prev) => (prev < 4 ? prev + 1 : 0))}
                className="px-3.5 py-1.5 rounded-lg bg-amber-600 text-white border border-amber-500 hover:bg-amber-500 text-xs font-semibold"
              >
                Next Step ▶
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 3: Final Profit Manifest */}
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
                Maximum Profit Assignment Manifest
              </h2>
            </div>

            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                    <th className="p-2.5">Sales Director</th>
                    <th className="p-2.5">Assigned Territory</th>
                    <th className="p-2.5 text-cyan-300">Matrix Coordinate</th>
                    <th className="p-2.5 text-emerald-300">Projected Turnover (₹ Lakhs)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
                  <tr>
                    <td className="p-2.5 font-medium text-white font-sans">Debangshu (S1)</td>
                    <td className="p-2.5 text-white font-sans">Territory 3</td>
                    <td className="p-2.5 text-cyan-300">Cell (1, 3)</td>
                    <td className="p-2.5 text-emerald-400 font-bold">₹40 Lakhs</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-white font-sans">Susmita (S2)</td>
                    <td className="p-2.5 text-white font-sans">Territory 1</td>
                    <td className="p-2.5 text-cyan-300">Cell (2, 1)</td>
                    <td className="p-2.5 text-emerald-400 font-bold">₹40 Lakhs</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-white font-sans">Mamata (S3)</td>
                    <td className="p-2.5 text-white font-sans">Territory 4</td>
                    <td className="p-2.5 text-cyan-300">Cell (3, 4)</td>
                    <td className="p-2.5 text-emerald-400 font-bold">₹30 Lakhs</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-white font-sans">Mahima (S4)</td>
                    <td className="p-2.5 text-white font-sans">Territory 2</td>
                    <td className="p-2.5 text-cyan-300">Cell (4, 2)</td>
                    <td className="p-2.5 text-emerald-400 font-bold">₹38 Lakhs</td>
                  </tr>
                  <tr className="bg-slate-900/60 text-white font-bold">
                    <td colSpan="3" className="p-3 text-right font-sans text-emerald-300">
                      CERTIFIED MAXIMUM TOTAL PROFIT (Z*):
                    </td>
                    <td className="p-3 text-emerald-400 text-base">₹148 Lakhs</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 4: Regret Pipeline SVG */}
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
                Maximization-to-Regret Transformation Pipeline
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 200"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                <rect x="40" y="40" width="190" height="120" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="135" y="70" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle">1. Raw Profit Matrix P</text>
                <text x="135" y="95" fill="#cbd5e1" fontSize="10" textAnchor="middle">Find M_max = max(P)</text>
                <text x="135" y="120" fill="#fde68a" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">M_max = ₹41</text>

                <line x1="235" y1="100" x2="275" y2="100" stroke="#94a3b8" strokeWidth="2" />
                <polygon points="275,100 265,95 265,105" fill="#94a3b8" />

                <rect x="280" y="40" width="190" height="120" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="375" y="70" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">2. Regret Matrix C</text>
                <text x="375" y="95" fill="#ffffff" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">cᵢⱼ = 41 − pᵢⱼ</text>
                <text x="375" y="120" fill="#a7f3d0" fontSize="10" textAnchor="middle">5-Step Hungarian Solve</text>

                <line x1="475" y1="100" x2="515" y2="100" stroke="#94a3b8" strokeWidth="2" />
                <polygon points="515,100 505,95 505,105" fill="#94a3b8" />

                <rect x="520" y="40" width="180" height="120" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="610" y="70" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">3. Max Total Profit</text>
                <text x="610" y="95" fill="#cbd5e1" fontSize="10" textAnchor="middle">Lookup from Original P</text>
                <text x="610" y="120" fill="#ffffff" fontSize="13" fontFamily="monospace" fontWeight="bold" textAnchor="middle">Z* = ₹148 Lakhs</text>
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
                Bengal Operations Research Maximization Case Studies
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
                  <p className="text-amber-300 font-semibold">💡 <strong>Operations Takeaway:</strong> {cs.lesson}</p>
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
                  trap: 'Finding M_max Row-by-Row Instead of Across the Entire Matrix',
                  fix: 'M_max MUST be the single largest element across the ENTIRE matrix (not row maximums).',
                },
                {
                  trap: 'Summing Values from the Regret Matrix for the Final Answer',
                  fix: 'Always pull the true revenue/profit numbers from the ORIGINAL profit matrix in Indian Rupees (₹).',
                },
                {
                  trap: 'Adding Dummy Lines Before Converting to Regret in Unbalanced Models',
                  fix: 'Always invert to regret first (c_ij = M_max - p_ij), and then add dummy rows/columns with ₹0 regret costs.',
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
                  Think of the Regret Matrix as measuring lost opportunity: if a sales rep can make ₹41 Lakhs in Territory 3, choosing a territory where they make only ₹32 Lakhs creates a regret of ₹9 Lakhs!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully that once you invert to the Regret Matrix, you follow the EXACT same 5 Hungarian steps as any standard minimization problem!
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
                Student Revision Checklist (Topic 15)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Identified global maximum M_max = max(P) across entire matrix',
                'Constructed Relative Regret Matrix: c_ij = M_max - p_ij',
                'Handled unbalanced dimensions by adding dummy lines AFTER regret inversion',
                'Solved the regret matrix using standard 5-step Hungarian Method',
                'Extracted optimal zero coordinates (i, π(i))',
                'Summed original profit rates in Indian Rupees (₹) to compute final maximum profit Z*',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: Converting Maximization problems is one of the most frequently tested topics in competitive and university examinations! Remember: find the largest number M_max across the ENTIRE matrix, subtract everything from M_max, solve your regret matrix using the 5 Hungarian steps, and pull your final maximum profit from the original matrix in Indian Rupees (₹). In our next topic, we will tackle comprehensive Numerical Exercises!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Conversion of Maximization Problems FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Conversion of Maximization Problems (Hungarian Method)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic16_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic15;
