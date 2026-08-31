// src/components/study/quantitative-analysis/topics/005_006_2xn-and-m-x-2-cases-graphical-and-algebraic-methods/Topic5.jsx
// React 19 Function-based Component
// Module: 005_006_2xn-and-m-x-2-cases-graphical-and-algebraic-methods
// Topic 5: Algebraic method

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
  const [selectedPairIndex, setSelectedPairIndex] = useState(0);

  // 2x4 Matrix (in ₹ Thousands)
  const matrix2x4 = [
    [20, 50, 60, 30],
    [40, 10, 30, 50],
  ];

  const candidatePairs = [
    {
      pair: '{B₁, B₂}',
      submatrix: '[[20, 50], [40, 10]]',
      delta: -60,
      p1: '0.50 (50%)',
      qSub: '[2/3, 1/3] (66.7%, 33.3%)',
      vStar: '₹30,000',
      isAdmissible: true,
      isGlobalOptimal: true,
      auditDetail: 'vs B₁: ₹30k, vs B₂: ₹30k, vs B₃: ₹45k (≥30k), vs B₄: ₹40k (≥30k). All global constraints satisfied!',
      status: '✅ Optimal Nash Equilibrium',
    },
    {
      pair: '{B₁, B₃}',
      submatrix: '[[20, 60], [40, 30]]',
      delta: -50,
      p1: '0.20 (20%)',
      qSub: '[0.60, 0.40] (60%, 40%)',
      vStar: '₹36,000',
      isAdmissible: true,
      isGlobalOptimal: false,
      auditDetail: 'vs B₂: 0.2(50) + 0.8(10) = ₹18,000 < ₹36,000! Player B can exploit B₂ to lower payoff.',
      status: '❌ Rejected: Global Suboptimality',
    },
    {
      pair: '{B₁, B₄}',
      submatrix: '[[20, 30], [40, 50]]',
      delta: 0,
      p1: 'Undefined (Δ = 0)',
      qSub: 'Undefined',
      vStar: 'Undefined',
      isAdmissible: false,
      isGlobalOptimal: false,
      auditDetail: 'Denominator Δ = (20+50) − (30+40) = 0. Lines are parallel and never intersect.',
      status: '🚫 Discarded: Parallel Lines (Δ = 0)',
    },
    {
      pair: '{B₂, B₃}',
      submatrix: '[[50, 60], [10, 30]]',
      delta: 10,
      p1: '2.00 (200% > 100%)',
      qSub: '[-3.0, 4.0] (Negative)',
      vStar: '₹90,000',
      isAdmissible: false,
      isGlobalOptimal: false,
      auditDetail: 'Probabilities fall outside the unit interval [0, 1]. Inadmissible strategy profile.',
      status: '🚫 Discarded: Probability Violation',
    },
    {
      pair: '{B₂, B₄}',
      submatrix: '[[50, 30], [10, 50]]',
      delta: 60,
      p1: '0.67 (66.7%)',
      qSub: '[0.33, 0.67] (33.3%, 66.7%)',
      vStar: '₹36,667',
      isAdmissible: true,
      isGlobalOptimal: false,
      auditDetail: 'vs B₁: 0.67(20) + 0.33(40) = ₹26,667 < ₹36,667! Player B can exploit B₁ to reduce payoff.',
      status: '❌ Rejected: Global Suboptimality',
    },
    {
      pair: '{B₃, B₄}',
      submatrix: '[[60, 30], [30, 50]]',
      delta: 50,
      p1: '0.40 (40%)',
      qSub: '[0.40, 0.60] (40%, 60%)',
      vStar: '₹42,000',
      isAdmissible: true,
      isGlobalOptimal: false,
      auditDetail: 'vs B₁: 0.4(20) + 0.6(40) = ₹32,000 < ₹42,000! Fails against Column B₁.',
      status: '❌ Rejected: Global Suboptimality',
    },
  ];

  const currentPair = candidatePairs[selectedPairIndex];

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
      title: '1. Foundry 2x4 Submatrix Combinatorial Audit (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Debangshu in Barrackpore evaluated all C(4, 2) = 6 column pairs. Only pair {B1, B2} passed both probability admissibility and global optimality, locking in ₹30,000.',
      lesson: 'Combinatorial enumeration provides programmatic proof of optimality.',
    },
    {
      title: '2. Cold-Chain Transport Route Enumeration (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Evaluated all C(3, 2) = 3 row pairs in Kolkata. Pair {A1, A2} was the sole candidate meeting global minimax bounds, securing ₹24,000.',
      lesson: 'Algebraic filtration eliminates trial-and-error in emergency fleet dispatch.',
    },
    {
      title: '3. Supermarket FMCG Retail Campaign Filter (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Algorithmically filtered 6 candidate 2x2 promo mixes in Ichapur, rejecting 4 due to probability violations and 1 due to global suboptimality, leaving the true ₹32,000 optimum.',
      lesson: 'Automated 2x2 algebraic loops eliminate human calculation fatigue.',
    },
    {
      title: '4. Educational High-Tech Lab Patent Dispute Filter (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Filtered all 6 candidate claim pairs in Jadavpur, proving mathematically to the legal council that pair {A1, A3} yielded the unique stable ₹20 Lakh settlement.',
      lesson: 'Exhaustive algebraic auditing creates rock-solid legal arbitration arguments.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes algGlow5 {
          0%, 100% { border-color: rgba(168, 85, 247, 0.3); }
          50% { border-color: rgba(168, 85, 247, 0.8); }
        }
        .glow-alg5 {
          animation: algGlow5 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-purple-950/80 text-purple-400 border border-purple-800/60">
              Segment 5 • Module 005_006 • Topic 5
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-purple-950/80 text-purple-400 border border-purple-800/60">
              Algebraic Method • Submatrix Enumeration • Global Filtration in ₹
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
            The Algebraic Method (Submatrix Enumeration)
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive study of the <span className="text-purple-400 font-semibold">Algebraic Method for 2×n & m×2 Games</span>: enumerating all <span className="text-amber-400 font-mono">C(n, 2)</span> candidate 2×2 submatrices, testing probability admissibility, and applying <span className="text-emerald-400 font-semibold">Global Minimax Filtration</span> in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'algebraic-theory', label: '1. Submatrix Filtration Theory' },
              { id: 'interactive-studio', label: '2. Combinatorial Studio' },
              { id: 'filtration-criteria', label: '3. 2 Validation Criteria' },
              { id: 'svg-pipeline', label: '4. Algebraic Filtration SVG' },
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

        {/* SECTION 1: Submatrix Filtration Theory */}
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
                Combinatorial Submatrix Enumeration Framework
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-400 font-sans font-bold">1. Combinatorial Pairs</span>
                <p className="text-slate-300 text-xs">C(n, 2) = n(n−1)/2 Column pairs (2×n)</p>
                <p className="text-slate-300 text-xs">C(m, 2) = m(m−1)/2 Row pairs (m×2)</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-rose-400 font-sans font-bold">2. Admissibility Filter</span>
                <p className="text-slate-300 text-xs">0 ≤ p₁* ≤ 1 &nbsp; AND &nbsp; 0 ≤ q₁* ≤ 1</p>
                <span className="text-rose-400 text-[11px]">Discard out-of-bounds probabilities</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-sans font-bold">3. Global Optimality</span>
                <p className="text-slate-300 text-xs">E(p*, B_j) ≥ v* ∀ j (2×n)</p>
                <span className="text-emerald-400 text-[11px]">No opponent exploitation allowed</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Combinatorial Studio */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-alg5">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-600/20 text-purple-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Algebraic Submatrix Enumeration Studio (2×4 Game: 6 Pairs)
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Click any of the <span className="text-purple-400 font-mono font-bold">C(4, 2) = 6</span> candidate column pairs to inspect its algebraic determinant Δ, solved probabilities, game value v*, and global optimality audit:
            </p>

            {/* Candidate Pair Selector Buttons */}
            <div className="flex flex-wrap gap-2">
              {candidatePairs.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedPairIndex(idx)}
                  className={clsx(
                    'px-3.5 py-2 rounded-xl text-xs font-mono font-semibold transition-all border text-left',
                    selectedPairIndex === idx
                      ? 'bg-purple-600 text-white border-purple-400 shadow-md'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  )}
                >
                  {p.pair} ({p.status.split(':')[0]})
                </button>
              ))}
            </div>

            {/* Selected Pair Audit Card */}
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-4 font-mono text-xs sm:text-sm">
              <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-2">
                <span className="text-base font-bold text-white font-sans">
                  Candidate Submatrix {currentPair.pair}: {currentPair.submatrix}
                </span>
                <span className={clsx(
                  'px-3 py-1 rounded-full text-xs font-bold font-sans',
                  currentPair.isGlobalOptimal
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-600'
                    : 'bg-rose-950 text-rose-300 border border-rose-600'
                )}>
                  {currentPair.status}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-slate-400 font-sans text-xs">Determinant Δ:</span>
                  <span className="text-purple-300 font-bold">{currentPair.delta}</span>
                </div>

                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-slate-400 font-sans text-xs">Player A Probability:</span>
                  <span className="text-rose-300 font-bold">{currentPair.p1}</span>
                </div>

                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-slate-400 font-sans text-xs">Player B Probabilities:</span>
                  <span className="text-sky-300 font-bold">{currentPair.qSub}</span>
                </div>

                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-slate-400 font-sans text-xs">Submatrix Game Value:</span>
                  <span className="text-emerald-300 font-bold">{currentPair.vStar}</span>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-300 font-sans font-bold text-xs">Global Minimax Audit Trace:</span>
                <p className="text-slate-300 text-xs leading-relaxed">{currentPair.auditDetail}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: 2 Validation Criteria */}
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
                The 2 Mandatory Validation Criteria
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                <span className="text-rose-400 font-sans font-bold">Criterion 1: Probability Admissibility</span>
                <p className="text-slate-300 text-xs">
                  • 0 ≤ p_i* ≤ 1 &nbsp; and &nbsp; 0 ≤ q_j* ≤ 1
                </p>
                <p className="text-slate-400 text-xs">
                  Eliminates pairs whose lines intersect outside the valid unit probability segment [0, 1].
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                <span className="text-emerald-400 font-sans font-bold">Criterion 2: Global Minimax Optimality</span>
                <p className="text-slate-300 text-xs">
                  • E(p*, B_j) ≥ v* for ALL j ∈ {`{1, ..., n}`}
                </p>
                <p className="text-slate-400 text-xs">
                  Guarantees that the opponent cannot exploit unselected columns to reduce Player A's return.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Algebraic Filtration SVG */}
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
                Algebraic Submatrix Filtration Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 180"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Stage 1 */}
                <rect x="20" y="45" width="140" height="90" rx="8" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
                <text x="90" y="70" fill="#a855f7" fontSize="10" fontWeight="bold" textAnchor="middle">1. Enumerate Pairs</text>
                <text x="90" y="95" fill="#cbd5e1" fontSize="8" textAnchor="middle">C(4, 2) = 6 Candidate Pairs</text>
                <text x="90" y="115" fill="#e9d5ff" fontSize="7" textAnchor="middle">{`{1,2}, {1,3}, {1,4}, ...`}</text>

                <line x1="160" y1="90" x2="200" y2="90" stroke="#64748b" strokeWidth="2" />

                {/* Stage 2 */}
                <rect x="200" y="45" width="150" height="90" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <text x="275" y="70" fill="#f43f5e" fontSize="10" fontWeight="bold" textAnchor="middle">2. Probability Filter</text>
                <text x="275" y="95" fill="#cbd5e1" fontSize="8" textAnchor="middle">Check p₁, q₁ ∈ [0, 1]</text>
                <text x="275" y="115" fill="#fca5a5" fontSize="7" textAnchor="middle">Discard {`{1,4}`}, {`{2,3}`}</text>

                <line x1="350" y1="90" x2="390" y2="90" stroke="#64748b" strokeWidth="2" />

                {/* Stage 3 */}
                <rect x="390" y="45" width="150" height="90" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="465" y="70" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">3. Global Audit</text>
                <text x="465" y="95" fill="#cbd5e1" fontSize="8" textAnchor="middle">E(p*, B_j) ≥ v* ∀ j</text>
                <text x="465" y="115" fill="#fde68a" fontSize="7" textAnchor="middle">Reject {`{1,3}`}, {`{2,4}`}, {`{3,4}`}</text>

                <line x1="540" y1="90" x2="580" y2="90" stroke="#64748b" strokeWidth="2" />

                {/* Stage 4 */}
                <rect x="580" y="45" width="140" height="90" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="650" y="70" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">4. Unique Optimum</text>
                <text x="650" y="95" fill="#ffffff" fontSize="9" textAnchor="middle">Pair {`{B₁, B₂}`} (v* = ₹30k)</text>
                <text x="650" y="115" fill="#a7f3d0" fontSize="7" textAnchor="middle">Audited in ₹</text>
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
                Bengal Operations Research Algebraic Method Case Studies
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
                  trap: 'Accepting an Admissible Submatrix Without Conducting the Global Optimality Audit',
                  fix: 'A submatrix may yield valid probabilities in [0, 1] but still fail if an unselected column yields E(p*, B_j) < v*.',
                },
                {
                  trap: 'Attempting to Solve Pairs Where Determinant Denominator Δ = 0',
                  fix: 'When Δ = 0, strategy lines are parallel and never intersect in the 1D simplex.',
                },
                {
                  trap: 'Stopping After Finding the First Admissible Candidate (Skipping Global Validation)',
                  fix: 'Multiple candidate submatrices can yield valid probabilities; only the true equilibrium satisfies global bounds.',
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
                  Think of the Algebraic Method like a security scanner: each candidate pair passes through two gates (Probability Gate and Global Optimality Gate), and only the true Nash Equilibrium clears both!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how Pair {`{B₁, B₃}`} yields valid probabilities p₁ = 0.20, but fails because against B₂ it yields ₹18,000, which is below the submatrix value of ₹36,000!
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
                'Enumerated all C(n, 2) or C(m, 2) candidate 2x2 submatrices',
                'Computed Δ, p*, q*, and v* for each submatrix',
                'Filtered out inadmissible probabilities outside [0, 1]',
                'Verified global minimax/maximin optimality against all original strategies',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: The Algebraic Method provides a robust analytical alternative when drawing graphs is not convenient. In our next topic (Topic 6), we will focus on Solving Equations for Optimal Probabilities!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Algebraic Method FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="The Algebraic Method (Submatrix Enumeration)"
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
