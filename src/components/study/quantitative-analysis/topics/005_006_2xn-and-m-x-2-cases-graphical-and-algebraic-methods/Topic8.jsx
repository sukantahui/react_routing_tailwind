// src/components/study/quantitative-analysis/topics/005_006_2xn-and-m-x-2-cases-graphical-and-algebraic-methods/Topic8.jsx
// React 19 Function-based Component
// Module: 005_006_2xn-and-m-x-2-cases-graphical-and-algebraic-methods
// Topic 8: Numerical exercises

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic8_files/topic8_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic8_files/topic8_note.txt?raw';

const Topic8 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedExIdx, setSelectedExIdx] = useState(0);

  const exercises = [
    {
      title: 'Exercise 1: 2×4 Game (Graphical Lower Envelope)',
      context: 'Debangshu Precision Alloy Procurement in Barrackpore (₹ Thousands)',
      method: 'Graphical Lower Envelope Maximin Peak',
      matrixView: [
        ['A \\ B', 'B₁', 'B₂', 'B₃', 'B₄'],
        ['A₁', '₹20k', '₹50k', '₹60k', '₹30k'],
        ['A₂', '₹40k', '₹10k', '₹30k', '₹50k'],
      ],
      activeSubmatrix: '[[20, 50], [40, 10]] (Columns {B₁, B₂})',
      pStar: '[0.50, 0.50]ᵀ (2D)',
      qStar: '[2/3, 1/3, 0.00, 0.00]ᵀ (4D: 66.7%, 33.3%, 0%, 0%)',
      vStar: '+₹30,000',
      traceSteps: [
        '1. Strategy Line Equations: B₁ (−20p₁+40), B₂ (+40p₁+10), B₃ (+30p₁+30), B₄ (−20p₁+50).',
        '2. Intersection of B₁ and B₂: 40 − 20p₁ = 10 + 40p₁ ➔ 60p₁ = 30 ➔ p₁* = 0.50.',
        '3. Maximin Peak Payoff: v* = 40 − 20(0.50) = ₹30k (+₹30,000).',
        '4. Extract 2×2 Submatrix: A_sub = [[20, 50], [40, 10]]. Δ = −60. q₁* = (10−50)/−60 = 2/3, q₂* = 1/3.',
        '5. Reconstructed 4D Vector: q* = [2/3, 1/3, 0, 0]ᵀ. Inactive B₃ (₹45k) and B₄ (₹40k) verified ≥ ₹30k!',
      ],
    },
    {
      title: 'Exercise 2: 4×2 Game (Graphical Upper Envelope)',
      context: 'Mamata & Mahima Cold-Chain Fleet Corridor in Kolkata (₹ Thousands)',
      method: 'Graphical Upper Envelope Minimax Trough',
      matrixView: [
        ['A \\ B', 'B₁', 'B₂'],
        ['A₁', '₹20k', '₹50k'],
        ['A₂', '₹40k', '₹10k'],
        ['A₃', '₹30k', '₹60k'],
        ['A₄', '₹50k', '₹20k'],
      ],
      activeSubmatrix: '[[20, 50], [40, 10]] (Rows {A₁, A₂})',
      pStar: '[0.50, 0.50, 0.00, 0.00]ᵀ (4D: 50%, 50%, 0%, 0%)',
      qStar: '[2/3, 1/3]ᵀ (2D: 66.7%, 33.3%)',
      vStar: '+₹30,000',
      traceSteps: [
        '1. Strategy Line Equations: A₁ (−30q₁+50), A₂ (+30q₁+10), A₃ (−30q₁+60), A₄ (+30q₁+20).',
        '2. Intersection of A₁ and A₂: 50 − 30q₁ = 10 + 30q₁ ➔ 60q₁ = 40 ➔ q₁* = 2/3 (≈ 0.667).',
        '3. Minimax Trough Payout: v* = 50 − 30(2/3) = ₹30k (+₹30,000).',
        '4. Extract 2×2 Submatrix: A_sub = [[20, 50], [40, 10]]. Δ = −60. p₁* = (10−40)/−60 = 0.50, p₂* = 0.50.',
        '5. Reconstructed 4D Vector: p* = [0.50, 0.50, 0, 0]ᵀ. Inactive A₃ (₹40k) and A₄ (₹40k) verified ≤ ceiling!',
      ],
    },
    {
      title: 'Exercise 3: 2×3 Game (Algebraic Submatrix Enumeration)',
      context: 'Susmita Supermarket Retail Pricing War in Ichapur (₹ Thousands)',
      method: 'Algebraic Enumeration of C(3, 2) = 3 Column Pairs',
      matrixView: [
        ['A \\ B', 'B₁', 'B₂', 'B₃'],
        ['A₁', '₹30k', '₹10k', '₹40k'],
        ['A₂', '₹10k', '₹40k', '₹50k'],
      ],
      activeSubmatrix: '[[30, 10], [10, 40]] (Columns {B₁, B₂})',
      pStar: '[0.60, 0.40]ᵀ (2D: 60%, 40%)',
      qStar: '[0.60, 0.40, 0.00]ᵀ (3D: 60%, 40%, 0%)',
      vStar: '+₹22,000',
      traceSteps: [
        '1. Test Pair {B₁, B₂}: [[30, 10], [10, 40]] ➔ Δ = (30+40) − (10+10) = 50.',
        '2. Solved Probabilities: p₁* = (40−10)/50 = 0.60, q₁* = (40−10)/50 = 0.60 (both admissible in [0, 1]).',
        '3. Game Value: v* = (1200 − 100)/50 = ₹22k (+₹22,000).',
        '4. Global Optimality Audit vs B₃: E(p*, B₃) = 0.6(40) + 0.4(50) = 24 + 20 = ₹44k ≥ ₹22k ✅.',
        '5. Reconstructed Vectors: p* = [0.60, 0.40]ᵀ, q* = [0.60, 0.40, 0.00]ᵀ. Unique Nash Equilibrium!',
      ],
    },
    {
      title: 'Exercise 4: 5×2 Game (Algebraic Submatrix Filtering)',
      context: 'Abhronila Educational Press Patent Arbitration in Jadavpur (₹ Thousands)',
      method: 'Algebraic Enumeration of C(5, 2) = 10 Row Pairs',
      matrixView: [
        ['A \\ B', 'B₁', 'B₂'],
        ['A₁', '₹10k', '₹50k'],
        ['A₂', '₹40k', '₹20k'],
        ['A₃', '₹30k', '₹30k'],
        ['A₄', '₹50k', '₹10k'],
        ['A₅', '₹20k', '₹40k'],
      ],
      activeSubmatrix: '[[10, 50], [40, 20]] (Rows {A₁, A₂})',
      pStar: '[1/3, 2/3, 0.00, 0.00, 0.00]ᵀ (5D: 33.3%, 66.7%, 0%, 0%, 0%)',
      qStar: '[0.50, 0.50]ᵀ (2D: 50%, 50%)',
      vStar: '+₹26,666.67',
      traceSteps: [
        '1. Test Pair {A₁, A₂}: [[10, 50], [40, 20]] ➔ Δ = (10+20) − (50+40) = 30 − 90 = −60.',
        '2. Probabilities: p₁* = (20−40)/−60 = 1/3, q₁* = (20−50)/−60 = 0.50.',
        '3. Game Value: v* = (200 − 2000)/−60 = −1800/−60 = ₹26.67k (+₹26,666.67).',
        '4. Global Audit: vs A₃ = 0.5(30)+0.5(30) = ₹30k; vs A₄ = 0.5(50)+0.5(10) = ₹30k; vs A₅ = ₹30k.',
        '5. Reconstructed 5D Vector: p* = [1/3, 2/3, 0, 0, 0]ᵀ, q* = [0.50, 0.50]ᵀ. Audited in ₹!',
      ],
    },
  ];

  const currentEx = exercises[selectedExIdx];

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
      title: '1. Foundry 2x4 Graphical Solution (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Solved a 2x4 procurement grid in Barrackpore via the lower envelope peak at p1 = 0.50, extracting active Columns {1, 2} and locking in ₹30,000 profit per shift.',
      lesson: '2xn graphical methods identify active competitive tensions in seconds.',
    },
    {
      title: '2. Cold-Chain Logistics 4x2 Minimax Solver (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Solved a 4x2 transport grid in Kolkata via upper envelope trough at q1 = 2/3, extracting active Rows {1, 2} and capping fleet expenditure at ₹30,000.',
      lesson: 'mx2 graphical troughs provide rock-solid liability ceilings.',
    },
    {
      title: '3. Supermarket FMCG 2x3 Algebraic Solver (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Enumerated 3 candidate submatrices in Ichapur, proving that pair {B1, B2} was the unique admissible and globally optimal mix, securing ₹22,000 in revenue.',
      lesson: 'Algebraic enumeration provides audit-proof verification for corporate boards.',
    },
    {
      title: '4. Educational High-Tech Lab 5x2 Patent Solver (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Filtered 10 candidate claim pairs in Jadavpur down to the active submatrix {A1, A2}, guaranteeing an unambiguous ₹26.67 Lakh institutional settlement.',
      lesson: 'Combinatorial filtering breaks multi-party arbitration gridlocks.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes numGlow8 {
          0%, 100% { border-color: rgba(234, 179, 8, 0.3); }
          50% { border-color: rgba(234, 179, 8, 0.8); }
        }
        .glow-num8 {
          animation: numGlow8 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-amber-950/80 text-amber-400 border border-amber-800/60">
              Segment 5 • Module 005_006 • Topic 8
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-amber-950/80 text-amber-400 border border-amber-800/60">
              Worked Numerical Exercises • Graphical & Algebraic • Audited in ₹
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Numerical Exercises (2×n & m×2 Methods)
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive workshop of <span className="text-amber-400 font-semibold">Worked 2×n and m×2 Numerical Exercises</span>: solving 2×4 Lower Envelope Maximin, 4×2 Upper Envelope Minimax, 2×3 Algebraic Enumeration, and 5×2 Submatrix Filtering in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'solution-protocols', label: '1. Solution Protocols' },
              { id: 'interactive-studio', label: '2. Worked Exercises Studio' },
              { id: 'vector-reconstruction', label: '3. Vector Reconstruction Table' },
              { id: 'svg-geometries', label: '4. Exercise Geometries SVG' },
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

        {/* SECTION 1: Solution Protocols */}
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
                2×n and m×2 Solution Frameworks
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                <span className="text-amber-400 font-sans font-bold">Graphical Method Framework:</span>
                <p className="text-slate-300 text-xs">
                  • 2×n: Plot n lines ➔ Trace Lower Envelope ➔ Maximin Peak.
                </p>
                <p className="text-slate-300 text-xs">
                  • m×2: Plot m lines ➔ Trace Upper Envelope ➔ Minimax Trough.
                </p>
                <span className="text-emerald-400 text-xs font-bold">Extract active 2×2 submatrix & solve closed-form!</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                <span className="text-purple-300 font-sans font-bold">Algebraic Method Framework:</span>
                <p className="text-slate-300 text-xs">
                  • Enumerate all C(n, 2) or C(m, 2) candidate 2×2 submatrices.
                </p>
                <p className="text-slate-300 text-xs">
                  • Filter by Admissibility (p, q ∈ [0, 1]) and Global Minimax Bounds.
                </p>
                <span className="text-emerald-400 text-xs font-bold">Reconstruct full probability vectors & audit in ₹!</span>
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
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-num8">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Worked Numerical Exercises Studio
              </h2>
            </div>

            {/* Exercise Tabs */}
            <div className="flex flex-wrap gap-2">
              {exercises.map((ex, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedExIdx(idx)}
                  className={clsx(
                    'px-4 py-2 rounded-xl text-xs font-semibold transition-all border text-left',
                    selectedExIdx === idx
                      ? 'bg-amber-600 text-white border-amber-400 shadow-md'
                      : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
                  )}
                >
                  {ex.title.split(':')[0]}
                </button>
              ))}
            </div>

            {/* Exercise Header */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2 text-xs sm:text-sm">
              <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-2 gap-2">
                <span className="text-white font-bold text-base">{currentEx.title}</span>
                <span className="text-amber-400 font-mono font-semibold">{currentEx.context}</span>
              </div>
              <div className="flex flex-wrap gap-3 text-xs font-mono text-slate-300 pt-1">
                <span>Method: <strong className="text-purple-300">{currentEx.method}</strong></span>
                <span>➔ Active Submatrix: <strong className="text-emerald-400">{currentEx.activeSubmatrix}</strong></span>
              </div>
            </div>

            {/* Matrix View */}
            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-2 font-mono text-xs">
              <table className="w-full text-center border-collapse">
                <tbody>
                  {currentEx.matrixView.map((row, rIdx) => (
                    <tr key={rIdx} className={clsx(rIdx === 0 ? 'border-b border-slate-800 text-slate-400 font-bold' : 'border-b border-slate-800/40 text-slate-200')}>
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className={clsx('p-2', cIdx === 0 && 'text-left font-bold text-rose-300')}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Step-by-Step Solution Trace */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2 text-xs sm:text-sm">
              <span className="text-emerald-400 font-bold text-sm">Full Step-by-Step Mathematical Trace:</span>
              <div className="flex flex-col space-y-1.5 font-mono text-xs">
                {currentEx.traceSteps.map((st, sIdx) => (
                  <div key={sIdx} className="p-2 rounded bg-slate-900 border border-slate-800/80 text-slate-300">
                    {st}
                  </div>
                ))}
              </div>
            </div>

            {/* Solution Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs sm:text-sm">
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <span className="text-slate-400 font-sans text-xs">Full Strategy Vector p*:</span>
                <span className="text-rose-400 font-bold text-xs sm:text-sm">{currentEx.pStar}</span>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <span className="text-slate-400 font-sans text-xs">Full Strategy Vector q*:</span>
                <span className="text-sky-400 font-bold text-xs sm:text-sm">{currentEx.qStar}</span>
              </div>

              <div className="p-3.5 bg-emerald-950/60 rounded-xl border border-emerald-600 flex flex-col space-y-1">
                <span className="text-slate-300 font-sans text-xs">Equilibrium Game Value:</span>
                <span className="text-emerald-300 font-bold text-base">{currentEx.vStar}</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Vector Reconstruction Table */}
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
                Full-Dimensional Strategy Vector Reconstruction
              </h2>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-3 text-xs sm:text-sm font-mono">
              <p className="text-slate-300 font-sans leading-relaxed">
                In examination answers, always present the full-dimensional strategy vectors explicitly:
              </p>
              <div className="p-3 bg-slate-900 rounded-lg text-emerald-300 font-bold">
                p* = [p₁, p₂, ..., p_m]ᵀ &nbsp; with p_i = 0.0 for inactive rows
              </div>
              <div className="p-3 bg-slate-900 rounded-lg text-sky-300 font-bold">
                q* = [q₁, q₂, ..., q_n]ᵀ &nbsp; with q_j = 0.0 for inactive columns
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Exercise Geometries SVG */}
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
                4 Numerical Exercise Solution Geometries
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 180"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Ex 1 */}
                <rect x="20" y="40" width="155" height="90" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="97" y="65" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">1. 2×4 Graphical</text>
                <text x="97" y="85" fill="#cbd5e1" fontSize="8" textAnchor="middle">Lower Envelope Peak</text>
                <text x="97" y="105" fill="#34d399" fontSize="8" textAnchor="middle">p₁*=0.50, v*=₹30k</text>

                {/* Ex 2 */}
                <rect x="200" y="40" width="155" height="90" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <text x="277" y="65" fill="#f43f5e" fontSize="10" fontWeight="bold" textAnchor="middle">2. 4×2 Graphical</text>
                <text x="277" y="85" fill="#cbd5e1" fontSize="8" textAnchor="middle">Upper Envelope Trough</text>
                <text x="277" y="105" fill="#38bdf8" fontSize="8" textAnchor="middle">q₁*=2/3, v*=₹30k</text>

                {/* Ex 3 */}
                <rect x="380" y="40" width="155" height="90" rx="8" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
                <text x="457" y="65" fill="#a855f7" fontSize="10" fontWeight="bold" textAnchor="middle">3. 2×3 Algebraic</text>
                <text x="457" y="85" fill="#cbd5e1" fontSize="8" textAnchor="middle">Pair {`{B₁, B₂}`} (C(3,2))</text>
                <text x="457" y="105" fill="#e9d5ff" fontSize="8" textAnchor="middle">p₁*=0.60, v*=₹22k</text>

                {/* Ex 4 */}
                <rect x="560" y="40" width="155" height="90" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="637" y="65" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">4. 5×2 Filtering</text>
                <text x="637" y="85" fill="#cbd5e1" fontSize="8" textAnchor="middle">Pair {`{A₁, A₂}`} (C(5,2))</text>
                <text x="637" y="105" fill="#a7f3d0" fontSize="8" textAnchor="middle">q₁*=0.50, v*=₹26.67k</text>
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
                Bengal Operations Research Numerical Exercises Case Studies
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
                  trap: 'Reporting Reduced Submatrix Probabilities Instead of Full Strategy Vectors',
                  fix: 'If the matrix is 5x2, report full 5D vector p* = [p₁, p₂, 0, 0, 0]ᵀ with 0.0 for inactive rows.',
                },
                {
                  trap: 'Picking Lower Envelope for mx2 Games Instead of Upper Envelope',
                  fix: '2xn requires the LOWER envelope (Maximin peak); mx2 requires the UPPER envelope (Minimax trough).',
                },
                {
                  trap: 'Skipping the Global Optimality Audit on Inactive Columns / Rows',
                  fix: 'Verify that E(p*, B_j) ≥ v* for ALL columns in 2xn and E(A_i, q*) ≤ v* for ALL rows in mx2.',
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
                  Think of working through numerical exercises like climbing a well-marked mountain trail: follow the 5 steps (Plot, Envelope, Apex, 2x2 Solve, Full Reconstruction), and you will reach the summit every time!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how in Exercise 1 and Exercise 2, both problems reduce to the exact same 2x2 submatrix [[20, 50], [40, 10]] and yield the exact same Game Value v* = +₹30,000!
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
                Student Revision Checklist (Topic 8)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Mastered 2xn lower envelope peak identification and active column extraction',
                'Mastered mx2 upper envelope trough identification and active row extraction',
                'Applied algebraic submatrix combinatorial enumeration and global audits',
                'Reconstructed full-dimensional strategy vectors for both players',
                'Reported all game values and payoffs in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: You have now solved the complete spectrum of 2xn and mx2 numerical problems! In our final topic of Module 005_006 (Topic 9), we will conclude Segment 5 with a master Short Questions and viva voce capstone!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="2xn & mx2 Numerical Exercises FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Numerical Exercises: 2×n and m×2 Games"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic9_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic8;
