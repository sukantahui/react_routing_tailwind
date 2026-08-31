// src/components/study/quantitative-analysis/topics/005_004_mixed-strategy/Topic6.jsx
// React 19 Function-based Component
// Module: 005_004_mixed-strategy
// Topic 6: Numerical exercises

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
  const [selectedExerciseIdx, setSelectedExerciseIdx] = useState(0);

  const exercises = [
    {
      title: 'Exercise 1: Symmetric Game with Negative Payoffs',
      context: 'Debangshu Precision Alloy Bidding in Barrackpore (₹ Thousands)',
      matrix: [
        [20, -10],
        [-10, 20],
      ],
      delta: 60,
      pStar: '[0.50, 0.50]ᵀ',
      qStar: '[0.50, 0.50]ᵀ',
      vStarFormatted: '+₹5,000',
      steps: [
        '1. Saddle Check: Row Min = [-10, -10] (α = -10), Col Max = [20, 20] (β = 20). α < β ➔ Mixed game.',
        '2. Denominator: Δ = (20 + 20) − (-10 + -10) = 40 − (-20) = 60.',
        '3. Player A: p₁* = (20 − -10)/60 = 30/60 = 0.50, p₂* = 0.50.',
        '4. Player B: q₁* = (20 − -10)/60 = 30/60 = 0.50, q₂* = 0.50.',
        '5. Game Value: det(A) = 400 − 100 = 300 ➔ v* = 300/60 = +₹5,000.',
        '6. Indifference: vs B₁ = 0.5(20) + 0.5(-10) = ₹5k; vs B₂ = 0.5(-10) + 0.5(20) = ₹5k. Verified!',
      ],
    },
    {
      title: 'Exercise 2: Asymmetric Manufacturing Game',
      context: 'Mamata & Mahima Cold-Chain Vaccine Transport in Kolkata (₹ Thousands)',
      matrix: [
        [40, 10],
        [10, 50],
      ],
      delta: 70,
      pStar: '[4/7, 3/7]ᵀ (57.1%, 42.9%)',
      qStar: '[4/7, 3/7]ᵀ (57.1%, 42.9%)',
      vStarFormatted: '+₹27,142.86',
      steps: [
        '1. Saddle Check: Row Min = [10, 10] (α = 10), Col Max = [40, 50] (β = 40). α < β ➔ Mixed game.',
        '2. Denominator: Δ = (40 + 50) − (10 + 10) = 90 − 20 = 70.',
        '3. Player A: p₁* = (50 − 10)/70 = 40/70 = 4/7 (57.1%), p₂* = 3/7 (42.9%).',
        '4. Player B: q₁* = (50 − 10)/70 = 40/70 = 4/7 (57.1%), q₂* = 3/7 (42.9%).',
        '5. Game Value: det(A) = 2000 − 100 = 1900 ➔ v* = 1900/70 = ₹27,142.86.',
        '6. Indifference: vs B₁ = (4/7)(40) + (3/7)(10) = 190/7 = ₹27.14k. Verified!',
      ],
    },
    {
      title: 'Exercise 3: Zero-Diagonal Constant-Sum Game',
      context: 'Susmita Supermarket Retail Pricing War in Ichapur (₹ Thousands)',
      matrix: [
        [0, 60],
        [40, 0],
      ],
      delta: -100,
      pStar: '[0.40, 0.60]ᵀ',
      qStar: '[0.60, 0.40]ᵀ',
      vStarFormatted: '+₹24,000',
      steps: [
        '1. Saddle Check: Row Min = [0, 0] (α = 0), Col Max = [40, 60] (β = 40). α < β ➔ Mixed game.',
        '2. Denominator: Δ = (0 + 0) − (60 + 40) = -100.',
        '3. Player A: p₁* = (0 − 40)/-100 = 40/100 = 0.40, p₂* = 0.60.',
        '4. Player B: q₁* = (0 − 60)/-100 = 60/100 = 0.60, q₂* = 0.40.',
        '5. Game Value: det(A) = 0 − 2400 = -2400 ➔ v* = -2400/-100 = +₹24,000.',
        '6. Indifference: vs B₁ = 0.4(0) + 0.6(40) = ₹24k; vs B₂ = 0.4(60) + 0.6(0) = ₹24k. Verified!',
      ],
    },
    {
      title: 'Exercise 4: Strictly Fair Game with Negative Entries',
      context: 'Abhronila Educational Press Patent Arbitration in Jadavpur (₹ Thousands)',
      matrix: [
        [15, -30],
        [-15, 30],
      ],
      delta: 90,
      pStar: '[0.50, 0.50]ᵀ',
      qStar: '[2/3, 1/3]ᵀ (66.7%, 33.3%)',
      vStarFormatted: '₹0 (Strictly Fair Game)',
      steps: [
        '1. Saddle Check: Row Min = [-30, -15] (α = -15), Col Max = [15, 30] (β = 15). α < β ➔ Mixed game.',
        '2. Denominator: Δ = (15 + 30) − (-30 + -15) = 45 − (-45) = 90.',
        '3. Player A: p₁* = (30 − -15)/90 = 45/90 = 0.50, p₂* = 0.50.',
        '4. Player B: q₁* = (30 − -30)/90 = 60/90 = 2/3, q₂* = 1/3.',
        '5. Game Value: det(A) = 450 − 450 = 0 ➔ v* = 0/90 = ₹0 (Strictly Fair Game!).',
        '6. Indifference: vs B₁ = 0.5(15) + 0.5(-15) = ₹0; vs B₂ = 0.5(-30) + 0.5(30) = ₹0. Verified!',
      ],
    },
  ];

  const currentEx = exercises[selectedExerciseIdx];

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
      title: '1. Precision Foundry Worked Numerical Solver (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Executed step-by-step 2x2 solution on symmetric bidding matrix in Barrackpore, proving p* = [0.5, 0.5] and securing ₹5,000 expected profit.',
      lesson: 'Structured numerical steps provide transparent audit justification.',
    },
    {
      title: '2. Cold-Chain Transport Routing Numerical Solver (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Solved an asymmetric logistics matrix in Kolkata, finding exact 4/7 to 3/7 route allocations to achieve ₹27,142.86 expected expenditure.',
      lesson: 'Analytical 2x2 solutions prevent operational over-budgeting.',
    },
    {
      title: '3. Supermarket FMCG Retail Promotional Solver (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Solved a zero-diagonal retail game in Ichapur, proving that negative Delta cancels out correctly to yield p* = [0.4, 0.6] and v* = ₹24,000.',
      lesson: 'Negative Delta cases preserve strictly positive strategy probabilities.',
    },
    {
      title: '4. Educational High-Tech Lab Fair Dispute Settlement (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Solved a 2x2 dispute game in Jadavpur with det(A) = 0, proving to trustees that the game is Strictly Fair (v* = ₹0) and creating an equitable settlement.',
      lesson: 'Zero-determinant matrices provide mathematical proof of contractual fairness.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes numGlow {
          0%, 100% { border-color: rgba(234, 179, 8, 0.3); }
          50% { border-color: rgba(234, 179, 8, 0.8); }
        }
        .glow-num {
          animation: numGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-amber-950/80 text-amber-400 border border-amber-800/60">
              Segment 5 • Module 005_004 • Topic 6
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-amber-950/80 text-amber-400 border border-amber-800/60">
              Worked 2x2 Exercises • Asymmetric & Fair Games • Verification
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
            Numerical Exercises (2×2 Mixed Strategy Games)
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive workshop of <span className="text-amber-400 font-semibold">Worked 2×2 Mixed Strategy Numerical Exercises</span>: solving symmetric, asymmetric, zero-diagonal, and Strictly Fair games, verifying Indifference Principles, and calculating Game Values in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'solution-template', label: '1. Master 6-Step Template' },
              { id: 'interactive-studio', label: '2. Worked Exercises Studio' },
              { id: 'indifference-proof', label: '3. Indifference Verification' },
              { id: 'svg-topologies', label: '4. Exercise Topologies Architecture SVG' },
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
              >
                {item.label}
              </button>
            ))}
          </div>
        </header>

        {/* SECTION 1: Master 6-Step Template */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 font-bold text-sm">
                01
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Master 6-Step 2×2 Mixed Strategy Solution Template
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2.5 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-rose-400 font-bold">1. Saddle Check</span>
                <p className="text-slate-300 text-[11px]">Confirm α &lt; β (no pure saddle point).</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-400 font-bold">2. Denominator Δ</span>
                <p className="text-slate-300 text-[11px]">(a₁₁+a₂₂) − (a₁₂+a₂₁).</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-rose-300 font-bold">3. Strategy p*</span>
                <p className="text-slate-300 text-[11px]">p₁* = (a₂₂−a₂₁)/Δ, p₂* = 1−p₁*.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-300 font-bold">4. Strategy q*</span>
                <p className="text-slate-300 text-[11px]">q₁* = (a₂₂−a₁₂)/Δ, q₂* = 1−q₁*.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-bold">5. Value v*</span>
                <p className="text-slate-300 text-[11px]">v* = det(A) / Δ in ₹.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-purple-300 font-bold">6. Verify</span>
                <p className="text-slate-300 text-[11px]">E(p*, B₁) == E(p*, B₂) == v*.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Worked Exercises Studio */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-num">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Worked 2×2 Exercises Studio
              </h2>
            </div>

            {/* Exercise Tabs */}
            <div className="flex flex-wrap gap-2">
              {exercises.map((ex, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedExerciseIdx(idx)}
                  className={clsx(
                    'px-4 py-2 rounded-xl text-xs font-semibold transition-all border text-left',
                    selectedExerciseIdx === idx
                      ? 'bg-amber-600 text-white border-amber-400 shadow-md'
                      : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
                  )}
                >
                  {ex.title.split(':')[0]}
                </button>
              ))}
            </div>

            {/* Exercise Title Header */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2 text-xs sm:text-sm">
              <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-2 gap-2">
                <span className="text-white font-bold text-base">{currentEx.title}</span>
                <span className="text-amber-400 font-mono font-semibold">{currentEx.context}</span>
              </div>
            </div>

            {/* Matrix View */}
            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3 font-mono text-xs sm:text-sm">
              <table className="w-full text-center border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2 text-left">A \ B</th>
                    <th className="p-2 text-sky-400">B₁</th>
                    <th className="p-2 text-sky-400">B₂</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-200">
                  <tr>
                    <td className="p-2 text-left font-bold text-rose-300">A₁</td>
                    <td className="p-2 font-bold">{currentEx.matrix[0][0] >= 0 ? `+${currentEx.matrix[0][0]}` : currentEx.matrix[0][0]}k</td>
                    <td className="p-2 font-bold">{currentEx.matrix[0][1] >= 0 ? `+${currentEx.matrix[0][1]}` : currentEx.matrix[0][1]}k</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-left font-bold text-rose-300">A₂</td>
                    <td className="p-2 font-bold">{currentEx.matrix[1][0] >= 0 ? `+${currentEx.matrix[1][0]}` : currentEx.matrix[1][0]}k</td>
                    <td className="p-2 font-bold">{currentEx.matrix[1][1] >= 0 ? `+${currentEx.matrix[1][1]}` : currentEx.matrix[1][1]}k</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Step-by-Step Numerical Breakdown */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2 text-xs sm:text-sm">
              <span className="text-emerald-400 font-bold text-sm">Full Step-by-Step Solution Breakdown:</span>
              <div className="flex flex-col space-y-1.5 font-mono text-xs">
                {currentEx.steps.map((st, sIdx) => (
                  <div key={sIdx} className="p-2 rounded bg-slate-900 border border-slate-800/80 text-slate-300">
                    {st}
                  </div>
                ))}
              </div>
            </div>

            {/* Solution Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs sm:text-sm">
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <span className="text-slate-400 font-sans text-xs">Player A Strategy p*:</span>
                <span className="text-rose-400 font-bold text-sm">{currentEx.pStar}</span>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <span className="text-slate-400 font-sans text-xs">Player B Strategy q*:</span>
                <span className="text-sky-400 font-bold text-sm">{currentEx.qStar}</span>
              </div>

              <div className="p-3.5 bg-emerald-950/60 rounded-xl border border-emerald-600 flex flex-col space-y-1">
                <span className="text-slate-300 font-sans text-xs">Value of the Game:</span>
                <span className="text-emerald-300 font-bold text-base">{currentEx.vStarFormatted}</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Indifference Verification */}
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
                Indifference Principle Audit Check
              </h2>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-3 text-xs sm:text-sm">
              <p className="text-slate-300 leading-relaxed">
                In every numerical exam question, ALWAYS include the Indifference Verification check:
              </p>
              <div className="p-3 bg-slate-900 rounded-lg text-center font-mono font-bold text-emerald-300">
                E(p*, B₁) == E(p*, B₂) == v* &nbsp;|&nbsp; E(A₁, q*) == E(A₂, q*) == v*
              </div>
              <p className="text-slate-400 text-xs">
                This guarantees that neither player can gain by unilaterally deviating to any pure action.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Exercise Topologies Architecture SVG */}
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
                2×2 Numerical Problem Topologies Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 180"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Symmetric */}
                <rect x="30" y="40" width="150" height="90" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <text x="105" y="65" fill="#f43f5e" fontSize="10" fontWeight="bold" textAnchor="middle">1. Symmetric</text>
                <text x="105" y="85" fill="#cbd5e1" fontSize="8" textAnchor="middle">a₁₁ = a₂₂, a₁₂ = a₂₁</text>
                <text x="105" y="105" fill="#34d399" fontSize="8" textAnchor="middle">p* = q* = [0.5, 0.5]</text>

                {/* Asymmetric */}
                <rect x="210" y="40" width="150" height="90" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="285" y="65" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">2. Asymmetric</text>
                <text x="285" y="85" fill="#cbd5e1" fontSize="8" textAnchor="middle">Distinct matrix cells</text>
                <text x="285" y="105" fill="#fde68a" fontSize="8" textAnchor="middle">Fractional p* & q*</text>

                {/* Zero-Diagonal */}
                <rect x="390" y="40" width="150" height="90" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="465" y="65" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">3. Zero-Diag</text>
                <text x="465" y="85" fill="#cbd5e1" fontSize="8" textAnchor="middle">a₁₁ = a₂₂ = 0 (Δ &lt; 0)</text>
                <text x="465" y="105" fill="#fca5a5" fontSize="8" textAnchor="middle">Sign Cancellation</text>

                {/* Strictly Fair */}
                <rect x="570" y="40" width="140" height="90" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="640" y="65" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">4. Strictly Fair</text>
                <text x="640" y="85" fill="#cbd5e1" fontSize="8" textAnchor="middle">det(A) = 0</text>
                <text x="640" y="105" fill="#a7f3d0" fontSize="8" textAnchor="middle">v* = ₹0 Exactly</text>
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
                Bengal Operations Research Numerical Case Studies
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
                  trap: 'Skipping the Saddle Point Check and Blindly Applying Mixed Formulas',
                  fix: 'If the matrix has a saddle point (α = β), mixed strategy formulas are INVALID! Check saddle point first.',
                },
                {
                  trap: 'Panic When Denominator Δ is Negative',
                  fix: 'When Δ is negative, the numerator will ALSO be negative, and the negative signs cancel out.',
                },
                {
                  trap: 'Reporting Game Values in Abstract Units Without Specifying Rupees (₹)',
                  fix: 'Always report operational payoffs and final game values in Indian Rupees (₹).',
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
                  Think of working through numerical exercises like following a pilot's flight checklist: check saddle ➔ compute Δ ➔ find p* ➔ find q* ➔ find v* ➔ verify indifference!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how verifying that E(p*, B₁) equals E(p*, B₂) takes only 10 seconds and guarantees that your examination answers are 100% correct!
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
                'Mastered the 6-step numerical solution template',
                'Computed Δ, p*, q*, and v* for matrices with negative and positive entries',
                'Handled cases with negative Δ (confirming sign cancellation)',
                'Verified indifference: E(p*, B₁) == E(p*, B₂) == v*',
                'Reported all numerical results in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: Practicing these 4 diverse numerical topologies solidifies your calculation agility! In our final master topic for this module (Topic 7), we will conduct a comprehensive Short Questions and viva review across all mixed strategy concepts!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="2x2 Numerical Exercises FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="2x2 Mixed Strategy Numerical Exercises"
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
