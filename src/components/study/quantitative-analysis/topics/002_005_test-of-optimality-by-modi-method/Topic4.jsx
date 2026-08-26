// src/components/study/quantitative-analysis/topics/002_005_test-of-optimality-by-modi-method/Topic4.jsx
// React 19 Function-based Component
// Module: 002_005_test-of-optimality-by-modi-method
// Topic 4: Optimality condition

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic4_files/topic4_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic4_files/topic4_note.txt?raw';

const Topic4 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [optimalityState, setOptimalityState] = useState('suboptimal'); // 'suboptimal', 'alternative', 'strictly_optimal'

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

  // State configurations for the Interactive Optimality Condition Inspector
  const stateConfigs = {
    suboptimal: {
      name: 'State 1: Sub-Optimal Solution (Negative Evaluations Present)',
      badge: 'Sub-Optimal (Pivot Required)',
      badgeColor: 'bg-rose-950 text-rose-300 border-rose-800',
      totalCost: '₹2,740 (Can be reduced)',
      evaluations: [
        { r: 0, c: 2, d: '+₹7' },
        { r: 1, c: 0, d: '-₹8 (Violates d ≥ 0 ⭐)' },
        { r: 2, c: 0, d: '+₹1' },
        { r: 2, c: 1, d: '-₹3 (Violates d ≥ 0)' },
      ],
      diagnosis: '❌ OPTIMALITY CONDITION VIOLATED: Contains d_21 = -₹8 and d_32 = -₹3. Cell (2, 1) must enter the basis to reduce total cost.',
    },
    alternative: {
      name: 'State 2: Alternative (Multiple) Optima (Zero Evaluation Present)',
      badge: 'Optimal (Multiple Solutions)',
      badgeColor: 'bg-amber-950 text-amber-300 border-amber-800',
      totalCost: '₹2,060 (Global Minimum)',
      evaluations: [
        { r: 0, c: 2, d: '+₹7' },
        { r: 1, c: 0, d: '0 (Alternative Route)' },
        { r: 2, c: 0, d: '+₹4' },
        { r: 2, c: 1, d: '+₹2' },
      ],
      diagnosis: '⚡ OPTIMALITY CONDITION SATISFIED: All d_ij ≥ 0. The presence of d_21 = 0 indicates an alternative routing basis exists at the exact same minimal cost of ₹2,060.',
    },
    strictly_optimal: {
      name: 'State 3: Strictly Optimal Solution (All d_ij > 0)',
      badge: 'Certified Unique Global Minimum',
      badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-800',
      totalCost: '₹2,060 (Certified Minimum)',
      evaluations: [
        { r: 0, c: 2, d: '+₹7' },
        { r: 1, c: 1, d: '+₹9' },
        { r: 2, c: 0, d: '+₹4' },
        { r: 0, c: 0, d: '+₹4' },
      ],
      diagnosis: '✅ STRICTLY OPTIMAL & UNIQUE: Every single non-basic opportunity cost is strictly positive (d_ij > 0). Zero cost-reducing pivots exist; 100% mathematical cost leadership proven!',
    },
  };

  const currentState = stateConfigs[optimalityState];

  // Case Studies
  const caseStudies = [
    {
      title: '1. Foundry Certified Minimum Audit (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Barrackpore casting network reached final MODI iteration with evaluations: d_13 = +7, d_21 = +4, d_22 = +9, d_31 = +4 (all > 0). Debangshu presented this proof to executive management, locking in ₹2,060 minimal freight.',
      lesson: 'Strict positivity (all d_ij > 0) proves the solution is globally unique.',
    },
    {
      title: '2. Cold-Chain Alternative Optima Discovery (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Kolkata vaccine network verified all d_ij ≥ 0 with d_22 = 0 on an empty route. Allowed health directors to switch to an alternative highway route at the exact same minimal cost of ₹2,190.',
      lesson: 'Alternative optima grant operational flexibility without spending extra rupees.',
    },
    {
      title: '3. Supermarket FMCG Iteration 1 Proof (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Evaluated a 3x3 grocery warehouse problem: d = [+2, +1, +4, +3]. Certified optimality immediately on Step 1 with zero subsequent loop pivoting.',
      lesson: 'Near-optimal starting bases (like VAM) frequently satisfy optimality on Iteration 1.',
    },
    {
      title: '4. Educational Press University Tender Proof (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Delivered formal proof of optimality (all d_ij ≥ 0) to state university procurement auditors, confirming that the ₹9,400 textbook freight contract was 100% minimal.',
      lesson: 'The MODI optimality condition is the legal standard for fiduciary compliance in public tenders.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes optConditionGlow {
          0%, 100% { border-color: rgba(16, 185, 129, 0.3); }
          50% { border-color: rgba(16, 185, 129, 0.8); }
        }
        .glow-opt {
          animation: optConditionGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
              Module 002_005 • Topic 4
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
              Global Optimality Theorem
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Optimality Condition
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            The mathematical foundation of global cost minimization: understanding the <span className="text-emerald-400 font-semibold">Optimality Criterion (dᵢⱼ ≥ 0)</span>, proving convergence via <span className="text-cyan-400 font-semibold">Strong Duality</span>, and distinguishing between <span className="text-emerald-400 font-semibold">Strict Optimality</span> and <span className="text-amber-400 font-semibold">Alternative Optima</span>.
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'theorem', label: '1. Global Optimality Theorem' },
              { id: 'interactive-inspector', label: '2. Interactive Condition Inspector' },
              { id: 'strict-vs-alt', label: '3. Strict vs Alternative Optima' },
              { id: 'svg-duality', label: '4. Strong Duality SVG' },
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
              &gt;
                {item.label}
              </button>
            ))}
          </div>
        </header>

        {/* SECTION 1: Global Optimality Theorem */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                01
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                The Global Optimality Theorem & Dual Equivalence
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              In the MODI method, an Initial Basic Feasible Solution is mathematically certified as the absolute <strong>Global Minimum</strong> if and only if every unoccupied route has a non-negative opportunity cost:
            </p>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-3">
              <span className="text-emerald-300 font-bold text-sm">The Fundamental Optimality Criterion</span>
              <div className="p-3 bg-slate-900 rounded font-mono text-emerald-300 text-sm sm:text-base">
                dᵢⱼ = cᵢⱼ - (uᵢ + vⱼ) ≥ 0 &nbsp;&nbsp;(for ALL non-basic cells (i, j))
              </div>
              <p className="text-xs text-slate-400">
                Equivalently: <span className="font-mono text-white">uᵢ + vⱼ ≤ cᵢⱼ</span> for all routes in the matrix, satisfying full Dual Linear Programming Feasibility.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Interactive Condition Inspector */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-opt">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                  02
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Interactive Optimality Condition Inspector
                </h2>
              </div>
              <span className={clsx('text-xs font-mono px-3 py-1 rounded-full border font-bold', currentState.badgeColor)}>
                {currentState.badge}
              </span>
            </div>

            {/* State Selector */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'suboptimal', label: '1. Sub-Optimal State (d < 0)' },
                { id: 'alternative', label: '2. Alternative Optima State (d = 0)' },
                { id: 'strictly_optimal', label: '3. Strictly Optimal State (all d > 0)' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setOptimalityState(item.id)}
                  className={clsx(
                    'px-3.5 py-2 rounded-lg text-xs font-semibold transition-all border text-left',
                    optimalityState === item.id
                      ? 'bg-emerald-600 text-white border-emerald-400 shadow-md'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                  )}
                &gt;
                  {item.label}
                </button>
              ))}
            </div>

            <p className="text-xs sm:text-sm text-slate-300">
              <strong className="text-white">{currentState.name}</strong> — Total Freight Cost: <span className="font-mono text-amber-300 font-bold">{currentState.totalCost}</span>
            </p>

            {/* Evaluation Vector Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
              {currentState.evaluations.map((ev, idx) => {
                const isNegative = ev.d.includes('-');
                const isZero = ev.d.startsWith('0');

                return (
                  <div
                    key={idx}
                    className={clsx(
                      'p-3 rounded-xl border flex items-center justify-between',
                      isNegative
                        ? 'bg-rose-950/80 text-rose-300 border-rose-600 animate-pulse'
                        : isZero
                        ? 'bg-amber-950/80 text-amber-300 border-amber-600'
                        : 'bg-slate-900 text-emerald-300 border-slate-800'
                    )}
                  >
                    <span className="font-semibold text-slate-200">Non-Basic Cell ({ev.r + 1}, {ev.c + 1}):</span>
                    <span className="font-bold">{ev.d}</span>
                  </div>
                );
              })}
            </div>

            {/* Diagnostic Message */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm">
              <p className="text-slate-200">{currentState.diagnosis}</p>
            </div>
          </div>
        </section>

        {/* SECTION 3: Strict vs Alternative Optima */}
        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          data-index="2"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-600/20 text-cyan-400 font-bold text-sm">
                03
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Strict Optimality vs. Alternative Optimal Solutions
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-emerald-800/40 flex flex-col space-y-2">
                <span className="text-emerald-300 font-bold">1. Strict Optimality (Unique Minimum)</span>
                <div className="p-2 bg-slate-950 rounded font-mono text-emerald-300 text-xs">
                  all dᵢⱼ &gt; 0 &nbsp;(Strictly Positive)
                </div>
                <p className="text-slate-300">
                  Every unallocated route is strictly more expensive than the current path. The solution is <strong>unique</strong>; no other routing pattern on Earth can match this minimal total cost.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-amber-800/40 flex flex-col space-y-2">
                <span className="text-amber-300 font-bold">2. Alternative (Multiple) Optima</span>
                <div className="p-2 bg-slate-950 rounded font-mono text-amber-300 text-xs">
                  all dᵢⱼ ≥ 0 &nbsp;and&nbsp; ∃ d_kl = 0
                </div>
                <p className="text-slate-300">
                  Direct rate equals the network shadow cost. Shifting flow into cell <span className="font-mono text-white">(k, l)</span> produces a different allocation matrix with the <strong>exact same minimal total cost Z</strong>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Strong Duality SVG */}
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
                Zero Duality Gap Proof of Optimality
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 260"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Primal Cost Box */}
                <rect x="50" y="40" width="280" height="180" rx="10" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                <text x="190" y="75" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">Primal Total Cost (Z)</text>
                <text x="190" y="110" fill="#cbd5e1" fontSize="11" textAnchor="middle">∑ ∑ cᵢⱼ · xᵢⱼ</text>
                <text x="190" y="145" fill="#ffffff" fontSize="14" fontFamily="monospace" fontWeight="bold" textAnchor="middle">Min Z = ₹2,060</text>
                <text x="190" y="185" fill="#a7f3d0" fontSize="10" textAnchor="middle">Primal Feasible (Ax = b, x ≥ 0)</text>

                {/* Equals Sign */}
                <circle cx="370" cy="130" r="20" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="370" y="137" fill="#38bdf8" fontSize="22" fontWeight="bold" textAnchor="middle">=</text>

                {/* Dual Objective Box */}
                <rect x="410" y="40" width="280" height="180" rx="10" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="2" />
                <text x="550" y="75" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">Dual Objective (W)</text>
                <text x="550" y="110" fill="#cbd5e1" fontSize="11" textAnchor="middle">∑ Sᵢ·uᵢ + ∑ Dⱼ·vⱼ</text>
                <text x="550" y="145" fill="#ffffff" fontSize="14" fontFamily="monospace" fontWeight="bold" textAnchor="middle">Max W = ₹2,060</text>
                <text x="550" y="185" fill="#bae6fd" fontSize="10" textAnchor="middle">Dual Feasible (uᵢ + vⱼ ≤ cᵢⱼ)</text>
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
                Bengal Logistics Optimality Case Studies
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
                  trap: 'Stopping Early When a Negative Evaluation is "Very Small"',
                  fix: 'Even d_ij = -₹0.5 violates optimality; in high-tonnage industrial freight, -₹0.5 saves tens of thousands of rupees.',
                },
                {
                  trap: 'Thinking d_ij = 0 Means the Solution is Sub-Optimal',
                  fix: 'd_ij = 0 satisfies the optimality condition (all d ≥ 0) and indicates alternative optimal solutions at the identical cost.',
                },
                {
                  trap: 'Failing to Write the Formal Conclusion Statement',
                  fix: 'Always state: "Since all d_ij ≥ 0, the optimality condition is satisfied. Minimum Total Cost Z = ₹X,XXX."',
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
                  Think about why the optimality condition is so definitive: by Strong Duality, when Primal Min Cost Z equals Dual Max Objective W, there is literally zero gap left to improve!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully that alternative optimal solutions (when d_kl = 0) give logistics directors precious real-world flexibility to dodge congested city roads without spending a single extra rupee.
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
                Student Revision Checklist (Topic 4)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Stated the Global Optimality Criterion: d_ij = c_ij - (u_i + v_j) ≥ 0',
                'Understood the Dual Feasibility equivalence: u_i + v_j ≤ c_ij',
                'Distinguished between Strict Optimality (all d &gt; 0) and Alternative Optima (d = 0)',
                'Recognized that any d_ij < 0 requires a stepping-stone loop pivot',
                'Proved zero duality gap (Primal Min Z == Dual Max W)',
                'Formatted the final conclusion statement with total cost Z in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: the Optimality Condition is the final judge and jury of your transportation problem! Once you calculate all opportunity costs, look across your matrix. If every single dᵢⱼ is zero or positive (dᵢⱼ ≥ 0), put your pen down with pride—you have achieved the global minimum total cost Z in ₹ Rupees! If you see a zero (d_kl = 0), congratulate yourself on finding alternative routing flexibility. But if you see even one negative number, stay sharp, find the most negative value, and prepare to pivot your stepping-stone loop!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Optimality Condition FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Optimality Condition (MODI Method)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic5_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic4;
