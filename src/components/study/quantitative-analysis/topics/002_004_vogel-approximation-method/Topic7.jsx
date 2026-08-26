// src/components/study/quantitative-analysis/topics/002_004_vogel-approximation-method/Topic7.jsx
// React 19 Function-based Component
// Module: 002_004_vogel-approximation-method
// Topic 7: Degeneracy considerations

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic7_files/topic7_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic7_files/topic7_note.txt?raw';

const Topic7 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [epsilonMode, setEpsilonMode] = useState('degenerate'); // 'degenerate', 'valid_epsilon', 'invalid_loop'

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
      title: '1. Foundry Subset Balance Degeneracy (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      situation: 'Factory S1 supply = 30 tons; Destination D1 demand = 30 tons. Equal subset rim sums caused simultaneous zero balance on Step 1.',
      resolution: 'Crossed out Row 1 only, left Column 1 active with D1 = 0, and allocated x_21 = 0 in Pass 2. Resulted in 4 basic cells (matches 2 + 3 - 1 = 4).',
      lesson: 'Single line cross-out completely eliminated degeneracy without needing artificial epsilon placement.',
    },
    {
      title: '2. Healthcare Vaccine Deficit Epsilon Placement (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      situation: '3x3 healthcare distribution matrix yielded only 4 basic allocations (needs 3 + 3 - 1 = 5).',
      resolution: 'Assigned an infinitesimally small quantity ε to loop-free cell (S1, D3) @ ₹9/box.',
      lesson: 'Epsilon restored the basis count to 5, enabling MODI dual multipliers (u_i, v_j) to be computed seamlessly.',
    },
    {
      title: '3. Supermarket FMCG Zero-Volume Contract Lanes (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      situation: 'Explaining why an explicit 0 allocation is a valid basic variable representing a designated zero-tonnage logistics lane.',
      resolution: 'Documented x_21 = 0 as an active contractual link in the transportation basis.',
      lesson: '0 allocations maintain full basis rank and satisfy linear independence theorems.',
    },
    {
      title: '4. Educational Press Loop Independence Audit (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      situation: 'Auditing candidate cells for epsilon placement using stepping-stone loop tests.',
      resolution: 'Confirmed candidate cell (S2, D2) was 100% acyclic before inserting ε.',
      lesson: 'Loop-free epsilon placement prevents contradictory equations during dual solving.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes degenPulse {
          0%, 100% { border-color: rgba(244, 63, 94, 0.3); }
          50% { border-color: rgba(244, 63, 94, 0.8); }
        }
        .glow-degen {
          animation: degenPulse 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
              Module 002_004 • Topic 7
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-rose-950/80 text-rose-400 border border-rose-800/60">
              Degeneracy & Epsilon Perturbation
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Degeneracy Considerations
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive investigation into <span className="text-rose-400 font-semibold">Degeneracy in Transportation Problems</span>: understanding the <span className="text-amber-400 font-semibold">Subset Rim Condition</span>, avoiding simultaneous line cross-outs, applying the <span className="text-emerald-400 font-mono font-semibold">Epsilon (ε) Perturbation Technique</span>, and verifying loop-free linear independence for MODI optimality tests.
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'definition', label: '1. What is Degeneracy?' },
              { id: 'causes', label: '2. Root Causes & Rim Theorem' },
              { id: 'interactive', label: '3. Interactive Epsilon Simulator' },
              { id: 'placement-rules', label: '4. Epsilon Placement Rules' },
              { id: 'svg-diagram', label: '5. Loop Independence SVG' },
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
                    ? 'bg-rose-600 text-white border-rose-500 shadow-md shadow-rose-900/40'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
                )}
              &gt;
                {item.label}
              </button>
            ))}
          </div>
        </header>

        {/* SECTION 1: What is Degeneracy? */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-600/20 text-rose-400 font-bold text-sm">
                01
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Mathematical Nature of Degeneracy
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              In an <span className="font-mono">m × n</span> transportation problem, a basic feasible solution is <strong>degenerate</strong> if the number of allocated basic cells is strictly less than <span className="font-mono text-emerald-400">m + n - 1</span>, or if one or more basic variables equal zero.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-emerald-800/40 flex flex-col space-y-1.5">
                <span className="text-emerald-300 font-bold">Non-Degenerate Basis (Valid)</span>
                <div className="p-2 bg-slate-950 rounded font-mono text-emerald-300 text-xs">
                  Count(Basic Cells) = m + n - 1 (Acyclic)
                </div>
                <p className="text-slate-300">
                  Exactly m + n - 1 linearly independent equations exist, enabling unique solution of shadow prices <span className="font-mono text-white">uᵢ + vⱼ = cᵢⱼ</span> for MODI optimality tests.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-rose-800/40 flex flex-col space-y-1.5">
                <span className="text-rose-300 font-bold">Degenerate Basis (Deficit)</span>
                <div className="p-2 bg-slate-950 rounded font-mono text-rose-400 text-xs">
                  Count(Basic Cells) &lt; m + n - 1
                </div>
                <p className="text-slate-300">
                  Fewer equations than unknowns (<span className="font-mono">m + n</span> variables). The MODI potential equations become underdetermined and unsolvable without epsilon perturbation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Root Causes & Rim Theorem */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Root Causes & The Subset Rim Theorem
              </h2>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-2">
              <span className="text-amber-300 font-bold text-sm">The Subset Rim Theorem</span>
              <div className="p-3 bg-slate-900 rounded font-mono text-amber-300 text-xs sm:text-sm">
                ∃ I ⊂ &#123;1..m&#125;, J ⊂ &#123;1..n&#125; &nbsp;such that&nbsp; ∑_(i ∈ I) Sᵢ = ∑_(j ∈ J) Dⱼ
              </div>
              <p className="text-xs text-slate-400">
                If the sum of capacities of a sub-group of factories equals the sum of requirements of a sub-group of destinations, the problem splits into an isolated sub-network, guaranteeing simultaneous zero exhaustion on an intermediate step.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: Interactive Epsilon Simulator */}
        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          data-index="2"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-degen">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-600/20 text-rose-400 font-bold text-sm">
                  03
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Interactive Degeneracy & Epsilon Simulator
                </h2>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setEpsilonMode('degenerate')}
                  className={clsx(
                    'px-3 py-1 rounded text-xs font-semibold transition-all border',
                    epsilonMode === 'degenerate' ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-400'
                  )}
                &gt;
                  Degenerate (4 Basic Cells)
                </button>
                <button
                  onClick={() => setEpsilonMode('valid_epsilon')}
                  className={clsx(
                    'px-3 py-1 rounded text-xs font-semibold transition-all border',
                    epsilonMode === 'valid_epsilon' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                  )}
                &gt;
                  Valid ε Placement (5 Cells)
                </button>
                <button
                  onClick={() => setEpsilonMode('invalid_loop')}
                  className={clsx(
                    'px-3 py-1 rounded text-xs font-semibold transition-all border',
                    epsilonMode === 'invalid_loop' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400'
                  )}
                &gt;
                  Invalid Loop Warning
                </button>
              </div>
            </div>

            {/* Matrix Tableau */}
            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-4">
              <table className="w-full text-center border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2 text-left font-semibold text-slate-300">Origins \ Dests</th>
                    <th className="p-2 font-semibold text-cyan-300">Jadavpur (D1)</th>
                    <th className="p-2 font-semibold text-cyan-300">Salt Lake (D2)</th>
                    <th className="p-2 font-semibold text-cyan-300">Howrah (D3)</th>
                    <th className="p-2 font-semibold text-amber-300">Supply</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Barrackpore (S1)', costs: [8, 14, 12], s: 50 },
                    { name: 'Ichapur (S2)', costs: [5, 19, 10], s: 70 },
                    { name: 'Kolkata (S3)', costs: [11, 13, 7], s: 60 },
                  ].map((row, rIdx) => (
                    <tr key={rIdx} className="border-b border-slate-800/60">
                      <td className="p-2.5 text-left font-medium text-slate-200">{row.name}</td>
                      {row.costs.map((cost, cIdx) => {
                        let allocText = null;
                        let isEpsilon = false;
                        let isLoopError = false;

                        if (rIdx === 0 && cIdx === 1) allocText = 'x = 50';
                        if (rIdx === 1 && cIdx === 0) allocText = 'x = 60';
                        if (rIdx === 1 && cIdx === 2) allocText = 'x = 10';
                        if (rIdx === 2 && cIdx === 2) allocText = 'x = 60';

                        // Epsilon conditions
                        if (epsilonMode === 'valid_epsilon' && rIdx === 0 && cIdx === 0) {
                          allocText = 'x = ε';
                          isEpsilon = true;
                        }
                        if (epsilonMode === 'invalid_loop' && rIdx === 1 && cIdx === 1) {
                          allocText = 'x = ε (LOOP!)';
                          isLoopError = true;
                        }

                        return (
                          <td key={cIdx} className="p-2">
                            <div
                              className={clsx(
                                'p-2 rounded-lg font-mono font-bold transition-all border flex flex-col items-center justify-center',
                                isLoopError
                                  ? 'bg-rose-950 text-rose-300 border-rose-500 animate-pulse'
                                  : isEpsilon
                                  ? 'bg-emerald-950 text-emerald-300 border-emerald-400 shadow-md'
                                  : allocText
                                  ? 'bg-slate-800 text-cyan-300 border-cyan-600'
                                  : 'bg-slate-900 text-slate-500 border-slate-800'
                              )}
                            >
                              {allocText && (
                                <span className="text-[10px] font-extrabold bg-slate-950 text-amber-300 px-1.5 py-0.5 rounded mb-1">
                                  {allocText}
                                </span>
                              )}
                              <span>₹{cost}</span>
                            </div>
                          </td>
                        );
                      })}
                      <td className="p-2 font-mono font-bold text-amber-300">{row.s}</td>
                    </tr>
                  ))}
                  <tr className="bg-slate-900/40 text-slate-300 font-mono">
                    <td className="p-2.5 text-left font-semibold text-amber-300">Demand</td>
                    <td className="p-2 font-bold text-amber-300">60</td>
                    <td className="p-2 font-bold text-amber-300">50</td>
                    <td className="p-2 font-bold text-amber-300">70</td>
                    <td className="p-2 font-bold text-white">∑ 180</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Diagnostic Card */}
            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-2 text-xs sm:text-sm">
              {epsilonMode === 'degenerate' && (
                <div className="text-rose-300 flex flex-col space-y-1">
                  <span className="font-bold">⚠️ Degeneracy Detected:</span>
                  <p>Basis contains only <strong>4 basic cells</strong> (formula requires 3 + 3 - 1 = <strong>5 cells</strong>). You cannot compute MODI multipliers u_i and v_j!</p>
                </div>
              )}
              {epsilonMode === 'valid_epsilon' && (
                <div className="text-emerald-300 flex flex-col space-y-1">
                  <span className="font-bold">✅ Epsilon (ε) Placed Successfully:</span>
                  <p>ε placed in cell (S1, D1) @ ₹8. Basis count restored to <strong>5 basic cells</strong>. Cell is 100% loop-free and ready for MODI solving!</p>
                </div>
              )}
              {epsilonMode === 'invalid_loop' && (
                <div className="text-amber-300 flex flex-col space-y-1">
                  <span className="font-bold">🚫 Loop Violation Error:</span>
                  <p>Placing ε in cell (S2, D2) forms a closed 4-corner rectangle with existing basic cells, violating linear independence!</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* SECTION 4: Epsilon Placement Rules */}
        <section
          ref={(el) => (sectionRefs.current[3] = el)}
          data-index="3"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-600/20 text-cyan-400 font-bold text-sm">
                04
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Rules for Mathematically Valid Epsilon Placement
              </h2>
            </div>

            <div className="flex flex-col space-y-3 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex items-start space-x-3">
                <span className="text-emerald-400 font-bold text-base mt-0.5">1</span>
                <div>
                  <h4 className="text-white font-semibold">Strict Loop-Free Requirement</h4>
                  <p className="text-slate-300 mt-0.5">The candidate cell must NOT form a closed horizontal-vertical loop with occupied basic cells.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex items-start space-x-3">
                <span className="text-emerald-400 font-bold text-base mt-0.5">2</span>
                <div>
                  <h4 className="text-white font-semibold">Lowest Unit Cost Priority</h4>
                  <p className="text-slate-300 mt-0.5">Among all loop-free candidate cells, choose the cell with the smallest unit rate min(cᵢⱼ).</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex items-start space-x-3">
                <span className="text-emerald-400 font-bold text-base mt-0.5">3</span>
                <div>
                  <h4 className="text-white font-semibold">Total Cost Invariance</h4>
                  <p className="text-slate-300 mt-0.5">Treat cᵢⱼ · ε as ₹0 when calculating total initial transportation cost Z.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Loop Independence SVG */}
        <section
          ref={(el) => (sectionRefs.current[4] = el)}
          data-index="4"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-600/20 text-teal-400 font-bold text-sm">
                05
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Acyclic Tree vs Closed Loop Geometry
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 280"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Acyclic Tree (Left) */}
                <g>
                  <rect x="50" y="40" width="280" height="200" rx="10" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                  <text x="190" y="70" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">VALID: Acyclic Tree</text>
                  <circle cx="100" cy="110" r="14" fill="#0284c7" />
                  <text x="100" y="114" fill="#ffffff" fontSize="10" textAnchor="middle">S1</text>

                  <circle cx="280" cy="110" r="14" fill="#059669" />
                  <text x="280" y="114" fill="#ffffff" fontSize="10" textAnchor="middle">D1</text>

                  <circle cx="100" cy="190" r="14" fill="#0284c7" />
                  <text x="100" y="194" fill="#ffffff" fontSize="10" textAnchor="middle">S2</text>

                  <circle cx="280" cy="190" r="14" fill="#059669" />
                  <text x="280" y="194" fill="#ffffff" fontSize="10" textAnchor="middle">D2</text>

                  {/* 3 Edges (No loop) */}
                  <line x1="114" y1="110" x2="266" y2="110" stroke="#38bdf8" strokeWidth="2" />
                  <line x1="100" y1="124" x2="100" y2="176" stroke="#38bdf8" strokeWidth="2" />
                  <line x1="114" y1="190" x2="266" y2="190" stroke="#38bdf8" strokeWidth="2" />
                  <text x="190" y="225" fill="#a7f3d0" fontSize="10" textAnchor="middle">Linear Independent (3 edges, 4 nodes)</text>
                </g>

                {/* Closed Loop (Right) */}
                <g>
                  <rect x="410" y="40" width="280" height="200" rx="10" fill="#4c0519" stroke="#f43f5e" strokeWidth="2" />
                  <text x="550" y="70" fill="#fda4af" fontSize="13" fontWeight="bold" textAnchor="middle">INVALID: Closed Loop</text>
                  <circle cx="460" cy="110" r="14" fill="#0284c7" />
                  <text x="460" y="114" fill="#ffffff" fontSize="10" textAnchor="middle">S1</text>

                  <circle cx="640" cy="110" r="14" fill="#059669" />
                  <text x="640" y="114" fill="#ffffff" fontSize="10" textAnchor="middle">D1</text>

                  <circle cx="460" cy="190" r="14" fill="#0284c7" />
                  <text x="460" y="194" fill="#ffffff" fontSize="10" textAnchor="middle">S2</text>

                  <circle cx="640" cy="190" r="14" fill="#059669" />
                  <text x="640" y="194" fill="#ffffff" fontSize="10" textAnchor="middle">D2</text>

                  {/* 4 Edges (Forms a cycle!) */}
                  <line x1="474" y1="110" x2="626" y2="110" stroke="#f43f5e" strokeWidth="2" />
                  <line x1="460" y1="124" x2="460" y2="176" stroke="#f43f5e" strokeWidth="2" />
                  <line x1="474" y1="190" x2="626" y2="190" stroke="#f43f5e" strokeWidth="2" />
                  <line x1="640" y1="124" x2="640" y2="176" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 3" />
                  <text x="550" y="225" fill="#fecdd3" fontSize="10" textAnchor="middle">Singular / Dependent (Cycle Detected!)</text>
                </g>
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 6: Real-World Bengal Case Studies */}
        <section
          ref={(el) => (sectionRefs.current[5] = el)}
          data-index="5"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 font-bold text-sm">
                06
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Bengal Logistics Degeneracy Case Studies
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
                  <p className="text-slate-300"><strong>Scenario:</strong> {cs.situation}</p>
                  <p className="text-emerald-300"><strong>Resolution:</strong> {cs.resolution}</p>
                  <p className="text-cyan-300"><strong>Lesson:</strong> {cs.lesson}</p>
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
        &gt;
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
                  trap: 'Placing Epsilon in a Cell That Forms a Closed Loop',
                  fix: 'Always perform a quick stepping-stone loop check before confirming ε placement.',
                },
                {
                  trap: 'Forgetting to Add Epsilon to Total Cost Calculations',
                  fix: 'Remember that ε contributes ₹0 to total cost Z, but provides an active constraint equation u_i + v_j = c_ij for MODI.',
                },
                {
                  trap: 'Crossing Out Both Row and Column on Simultaneous Zero',
                  fix: 'Strike out only ONE line; leave the second line active with balance 0 to generate the needed basic cell.',
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
        &gt;
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
                  Think about why an epsilon cell acts as an electrical bridge in the network: without it, shadow prices u_i and v_j cannot flow across the entire grid!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully that counting basic cells (m + n - 1) takes only 5 seconds but saves you from getting completely stuck when calculating MODI multipliers.
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
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                09
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Student Revision Checklist (Topic 7)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Counted total basic allocations upon finishing VAM',
                'Confirmed target basic cell count = m + n - 1',
                'Avoided simultaneous row and column cross-outs during VAM passes',
                'If count < m + n - 1, identified lowest-cost unallocated cell',
                'Verified that chosen candidate cell contains NO closed loops',
                'Assigned epsilon (ε) to independent cell',
                'Preserved total cost Z with zero distortion',
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
              "In all my years teaching quantitative analysis in Barrackpore and Kolkata, I've seen students lose easy marks because they forget to check for degeneracy before jumping into the MODI method! Debangshu, Mamata, Mahima, Susmita, and Abhronila know my 5-second sanity check: count your basic cells before doing anything else. If you have 3 origins and 3 destinations, you MUST see 5 allocated cells. If you see only 4, place epsilon (ε) in a loop-free, cheap cell immediately. Epsilon costs zero rupees, but it gives you the exact algebraic key to unlock shadow prices and prove global optimality!"
            }
          />
        </section>

        {/* SECTION 11: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Degeneracy Considerations FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 12: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Degeneracy Considerations (Vogel's Approximation Method)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic8_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic7;
