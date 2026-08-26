// src/components/study/quantitative-analysis/topics/002_004_vogel-approximation-method/Topic5.jsx
// React 19 Function-based Component
// Module: 002_004_vogel-approximation-method
// Topic 5: Complete VAM procedure

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
  const [currentStep, setCurrentStep] = useState(1);

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

  // End-to-end full VAM walkthrough passes
  const fullProcedureSteps = [
    {
      step: 1,
      title: 'Pass 1: Balance Check & First Line Allocation',
      details: 'Check: Total Supply (70+90+60 = 220) == Total Demand (60+80+80 = 220) -> Perfectly Balanced!',
      action: 'Max Penalty is Row 2 (Ichapur) with P = ₹5 (★). Lowest cell in Row 2 is (S2, D1) @ ₹5/ton. Allocate x_21 = min(90, 60) = 60 tons. Column 1 is satisfied and crossed out!',
      allocations: [{ r: 1, c: 0, qty: 60, cost: 5, active: true }],
      activeRows: [0, 1, 2],
      activeCols: [1, 2],
      supplies: [70, 30, 60],
      demands: [0, 80, 80],
      cumulativeCost: 300,
    },
    {
      step: 2,
      title: 'Pass 2: Recompute Penalties & Second Line Allocation',
      details: 'Active columns: {D2, D3}. Row 2 penalty surges from ₹5 to ₹9 because ₹5 cell was eliminated!',
      action: 'Max Penalty is Row 2 with P = ₹9 (★). Lowest cell in Row 2 is (S2, D3) @ ₹10/ton. Allocate x_23 = min(30, 80) = 30 tons. Row 2 is exhausted and crossed out!',
      allocations: [
        { r: 1, c: 0, qty: 60, cost: 5, active: false },
        { r: 1, c: 2, qty: 30, cost: 10, active: true },
      ],
      activeRows: [0, 2],
      activeCols: [1, 2],
      supplies: [70, 0, 60],
      demands: [0, 80, 50],
      cumulativeCost: 600,
    },
    {
      step: 3,
      title: 'Pass 3: Third Line Allocation (Row 3 to Col 3)',
      details: 'Active rows: {S1, S3}; Active cols: {D2, D3}. Penalties: P_R1=₹2, P_R3=₹6; P_C2=₹1, P_C3=₹5.',
      action: 'Max Penalty is Row 3 (Kolkata Yard) with P = ₹6 (★). Lowest cell in Row 3 is (S3, D3) @ ₹7/ton. Allocate x_33 = min(60, 50) = 50 tons. Column 3 is satisfied and crossed out!',
      allocations: [
        { r: 1, c: 0, qty: 60, cost: 5, active: false },
        { r: 1, c: 2, qty: 30, cost: 10, active: false },
        { r: 2, c: 2, qty: 50, cost: 7, active: true },
      ],
      activeRows: [0, 2],
      activeCols: [1],
      supplies: [70, 0, 10],
      demands: [0, 80, 0],
      cumulativeCost: 950,
    },
    {
      step: 4,
      title: 'Pass 4: Terminal Single-Column Direct Allocation',
      details: 'Only Column 2 (Salt Lake, Demand = 80) remains active. Direct allocations satisfy the remaining demand.',
      action: 'Allocate remaining 10 tons of S3 to (S3, D2) @ ₹13/ton, and remaining 70 tons of S1 to (S1, D2) @ ₹14/ton.',
      allocations: [
        { r: 1, c: 0, qty: 60, cost: 5, active: false },
        { r: 1, c: 2, qty: 30, cost: 10, active: false },
        { r: 2, c: 2, qty: 50, cost: 7, active: false },
        { r: 2, c: 1, qty: 10, cost: 13, active: true },
        { r: 0, c: 1, qty: 70, cost: 14, active: true },
      ],
      activeRows: [],
      activeCols: [],
      supplies: [0, 0, 0],
      demands: [0, 0, 0],
      cumulativeCost: 2060,
    },
    {
      step: 5,
      title: 'Final Summary: Basis Verification & Total Cost Z',
      details: 'Count of basic cells = 5 (matches m + n - 1 = 3 + 3 - 1 = 5). Non-degenerate & acyclic!',
      action: 'Total Initial Cost Z = (60×5) + (30×10) + (50×7) + (10×13) + (70×14) = ₹300 + ₹300 + ₹350 + ₹130 + ₹980 = ₹2,060.',
      allocations: [
        { r: 1, c: 0, qty: 60, cost: 5, active: true },
        { r: 1, c: 2, qty: 30, cost: 10, active: true },
        { r: 2, c: 2, qty: 50, cost: 7, active: true },
        { r: 2, c: 1, qty: 10, cost: 13, active: true },
        { r: 0, c: 1, qty: 70, cost: 14, active: true },
      ],
      activeRows: [],
      activeCols: [],
      supplies: [0, 0, 0],
      demands: [0, 0, 0],
      cumulativeCost: 2060,
    },
  ];

  const currentPass = fullProcedureSteps[currentStep - 1];

  // Real-world Bengal Case Studies
  const caseStudies = [
    {
      title: '1. Precision Casting Logistics (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Complete 3x3 execution on Bengal foundry network. Resulting initial cost Z = ₹2,060 is 24.8% cheaper than NWCR (₹2,740).',
      basisCheck: '5 basic cells generated, matching m + n - 1 = 3 + 3 - 1 = 5.',
    },
    {
      title: '2. Greater Kolkata Vaccine Distribution (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Complete 2x3 healthcare network execution: x_21 = 60 @ ₹4, x_23 = 40 @ ₹15, x_13 = 10 @ ₹9, x_12 = 70 @ ₹18. Total Cost Z = ₹2,190.',
      basisCheck: '4 basic cells generated, matching m + n - 1 = 2 + 3 - 1 = 4.',
    },
    {
      title: '3. Supermarket FMCG Retail Fleet (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Complete 3x3 supermarket problem. Final allocations: x_33 = 40 @ ₹3, x_11 = 40 @ ₹4, x_12 = 10 @ ₹9, x_22 = 50 @ ₹5, x_23 = 10 @ ₹8. Total Cost Z = ₹570.',
      basisCheck: '5 basic cells generated, matching m + n - 1 = 3 + 3 - 1 = 5.',
    },
    {
      title: '4. Educational Press & University Books (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Complete end-to-end VAM run that directly satisfies all MODI optimality conditions with 0 pivots on step 1.',
      basisCheck: '6 basic cells generated, matching m + n - 1 = 3 + 4 - 1 = 6.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes fullProcGlow {
          0%, 100% { box-shadow: 0 0 15px rgba(16, 185, 129, 0.2); }
          50% { box-shadow: 0 0 25px rgba(16, 185, 129, 0.5); }
        }
        .glow-full {
          animation: fullProcGlow 2.5s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
              Module 002_004 • Topic 5
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-cyan-950/80 text-cyan-400 border border-cyan-800/60">
              End-to-End Methodology
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Complete VAM Procedure
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive, end-to-end execution of Vogel's Approximation Method: from initial balance verification and multi-pass margin audits to <span className="text-emerald-400 font-semibold">Basis Verification (m + n - 1)</span> and total transportation cost computation <span className="text-amber-400 font-mono font-semibold">Z = ∑ ∑ cᵢⱼ · xᵢⱼ</span>.
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'pipeline', label: '1. 6-Phase Pipeline' },
              { id: 'full-stepper', label: '2. Interactive Full Stepper' },
              { id: 'basis-rules', label: '3. Basis Verification & Loops' },
              { id: 'svg-diagram', label: '4. Pipeline Architecture SVG' },
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
              >
                {item.label}
              </button>
            ))}
          </div>
        </header>

        {/* SECTION 1: 6-Phase Pipeline */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                01
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                The 6-Phase Complete VAM Pipeline
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              {[
                { phase: 'Phase 1: Balance Check', desc: 'Confirm ∑ Sᵢ = ∑ Dⱼ; add a ₹0 dummy row or column if unbalanced.' },
                { phase: 'Phase 2: Penalty Computation', desc: 'Compute Pᵢ = c_(i,2) - c_(i,1) and Pⱼ = c_(2,j) - c_(1,j) across all active lines.' },
                { phase: 'Phase 3: Max Penalty Selection', desc: 'Select winning line L* = argmax(P_all); apply Tier 1 / Tier 2 if tied.' },
                { phase: 'Phase 4: Least-Cost Allocation', desc: 'Locate cheapest cell in L* and assign x_kl = min(S_k, D_l).' },
                { phase: 'Phase 5: Strike-Out & Recalculation', desc: 'Deduct capacities, cross out exhausted line, and recompute penalties.' },
                { phase: 'Phase 6: Basis & Cost Audit', desc: 'Verify exactly m + n - 1 basic cells and calculate Z = ∑ ∑ cᵢⱼ · xᵢⱼ in ₹.' },
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                  <span className="text-emerald-300 font-bold">{item.phase}</span>
                  <p className="text-slate-300">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2: Interactive Full Stepper */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                  02
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Interactive End-to-End VAM Stepper
                </h2>
              </div>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((sNum) => (
                  <button
                    key={sNum}
                    onClick={() => setCurrentStep(sNum)}
                    className={clsx(
                      'px-3 py-1 rounded text-xs font-semibold transition-all border',
                      currentStep === sNum
                        ? 'bg-emerald-600 text-white border-emerald-400 shadow-md'
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                    )}
                  >
                    {sNum === 5 ? 'Summary' : `Pass ${sNum}`}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300">
              <strong className="text-white">{currentPass.title}</strong> — {currentPass.details}
            </p>

            {/* Tableau */}
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
                    { name: 'Barrackpore Heavy (S1)', costs: [8, 14, 12] },
                    { name: 'Ichapur Casting (S2)', costs: [5, 19, 10] },
                    { name: 'Kolkata Yard (S3)', costs: [11, 13, 7] },
                  ].map((row, rIdx) => (
                    <tr key={rIdx} className="border-b border-slate-800/60">
                      <td className="p-2.5 text-left font-medium text-slate-200">{row.name}</td>
                      {row.costs.map((cost, cIdx) => {
                        const matchingAlloc = currentPass.allocations.find((a) => a.r === rIdx && a.c === cIdx);

                        return (
                          <td key={cIdx} className="p-2">
                            <div
                              className={clsx(
                                'p-2 rounded-lg font-mono font-bold transition-all border flex flex-col items-center justify-center',
                                matchingAlloc
                                  ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500 shadow-md scale-105'
                                  : 'bg-slate-900 text-slate-400 border-slate-800'
                              )}
                            >
                              {matchingAlloc && (
                                <span className="text-[11px] font-extrabold bg-slate-950 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/50 mb-1">
                                  x = {matchingAlloc.qty} tons
                                </span>
                              )}
                              <span>₹{cost}</span>
                            </div>
                          </td>
                        );
                      })}
                      <td className="p-2 font-mono font-bold text-amber-300">
                        {currentPass.supplies[rIdx]} tons
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-slate-900/40 text-slate-300 font-mono">
                    <td className="p-2.5 text-left font-semibold text-amber-300">Remaining Demand</td>
                    {currentPass.demands.map((dm, dmIdx) => (
                      <td key={dmIdx} className="p-2 font-bold text-amber-300">
                        {dm} tons
                      </td>
                    ))}
                    <td className="p-2 text-slate-600 text-xs">—</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Live Progress Card */}
            <div className="p-4 rounded-xl bg-slate-800/40 border border-emerald-800/40 flex flex-col space-y-2 text-xs sm:text-sm">
              <div className="flex items-center justify-between border-b border-slate-700/60 pb-2">
                <span className="text-emerald-300 font-semibold">⚡ Step Execution:</span>
                <span className="text-amber-400 font-mono font-bold">Cumulative Cost: ₹{currentPass.cumulativeCost}</span>
              </div>
              <p className="text-slate-300">{currentPass.action}</p>
            </div>
          </div>
        </section>

        {/* SECTION 3: Basis Verification & Loop-Free Property */}
        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          data-index="2"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-600/20 text-cyan-400 font-bold text-sm">
                03
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Basis Verification (m + n - 1) & Loop-Free Property
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-2">
                <span className="text-cyan-300 font-semibold">1. Basis Count Criterion</span>
                <p className="text-slate-300">
                  Every basic feasible solution must contain exactly <span className="font-mono text-emerald-400 font-bold">m + n - 1</span> positive allocations. For a 3 × 3 tableau: <span className="font-mono text-white">3 + 3 - 1 = 5 basic cells</span>.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-2">
                <span className="text-emerald-300 font-semibold">2. Acyclic (Loop-Free) Tree Structure</span>
                <p className="text-slate-300">
                  Because VAM eliminates one row or column at each step, allocations form an open spanning tree on the bipartite graph, guaranteeing that no closed loops can form.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Pipeline Architecture SVG */}
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
                Complete Methodological Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 760 300"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                <defs>
                  <linearGradient id="pipeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#059669" />
                    <stop offset="100%" stopColor="#38bdf8" />
                  </linearGradient>
                </defs>

                {/* Stage 1 */}
                <rect x="20" y="80" width="130" height="70" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="2" />
                <text x="85" y="110" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">1. Balance Check</text>
                <text x="85" y="130" fill="#94a3b8" fontSize="9" textAnchor="middle">∑ Sᵢ == ∑ Dⱼ</text>

                <line x1="150" y1="115" x2="170" y2="115" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="170,115 163,110 163,120" fill="#38bdf8" />

                {/* Stage 2 */}
                <rect x="170" y="80" width="130" height="70" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="2" />
                <text x="235" y="110" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">2. Penalties</text>
                <text x="235" y="130" fill="#94a3b8" fontSize="9" textAnchor="middle">P_i & P_j</text>

                <line x1="300" y1="115" x2="320" y2="115" stroke="#34d399" strokeWidth="2" />
                <polygon points="320,115 313,110 313,120" fill="#34d399" />

                {/* Stage 3 */}
                <rect x="320" y="80" width="130" height="70" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="2" />
                <text x="385" y="110" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">3. Max Penalty</text>
                <text x="385" y="130" fill="#94a3b8" fontSize="9" textAnchor="middle">Tie-break check</text>

                <line x1="450" y1="115" x2="470" y2="115" stroke="#fbbf24" strokeWidth="2" />
                <polygon points="470,115 463,110 463,120" fill="#fbbf24" />

                {/* Stage 4 */}
                <rect x="470" y="80" width="130" height="70" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="2" />
                <text x="535" y="110" fill="#a78bfa" fontSize="11" fontWeight="bold" textAnchor="middle">4. Min Cost Alloc</text>
                <text x="535" y="130" fill="#94a3b8" fontSize="9" textAnchor="middle">x = min(S, D)</text>

                <line x1="600" y1="115" x2="620" y2="115" stroke="#a78bfa" strokeWidth="2" />
                <polygon points="620,115 613,110 613,120" fill="#a78bfa" />

                {/* Stage 5 */}
                <rect x="620" y="80" width="120" height="70" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                <text x="680" y="110" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">5. Total Cost Z</text>
                <text x="680" y="130" fill="#ffffff" fontSize="10" fontFamily="monospace" textAnchor="middle">∑ ∑ cᵢⱼ · xᵢⱼ</text>

                {/* Repeat Loop */}
                <path d="M 535 150 L 535 220 L 235 220 L 235 150" stroke="#64748b" strokeWidth="2" strokeDasharray="4 4" fill="none" />
                <polygon points="235,150 230,158 240,158" fill="#64748b" />
                <text x="385" y="240" fill="#94a3b8" fontSize="10" textAnchor="middle">
                  Strike out line & repeat until all S_i = 0, D_j = 0
                </text>
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 5: Real-World Bengal Case Studies */}
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
                Bengal Logistics Complete Procedure Case Studies
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
                  <p className="text-slate-300"><strong>Procedure Execution:</strong> {cs.desc}</p>
                  <p className="text-emerald-300"><strong>Basis Audit:</strong> {cs.basisCheck}</p>
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
                  trap: 'Forgetting to Check Balance Before Starting',
                  fix: 'Always confirm ∑ Sᵢ = ∑ Dⱼ before calculating any penalties.',
                },
                {
                  trap: 'Ending with Fewer than m + n - 1 Basic Cells',
                  fix: 'If S_k and D_l hit zero simultaneously, cross out only ONE line to avoid degeneracy.',
                },
                {
                  trap: 'Arithmetic Slip During Total Cost Z Computation',
                  fix: 'Write down each product (Quantity × Rate) item by item before summing.',
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
                  Think about why VAM's initial basic feasible solution is so close to optimal: each pass systematically protected the network from its highest opportunity cost!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully that the final step simply sums all allocated products ∑ (cᵢⱼ · xᵢⱼ) in Indian Rupees (₹) to provide the baseline for MODI testing.
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
                'Matrix balanced before calculating penalties',
                'Multi-pass margin headers tracked neatly',
                'Maximum penalty circled in each pass',
                'Allocated max feasible units to least-cost cell',
                'Struck out exhausted lines step-by-step',
                'Confirmed exactly m + n - 1 basic cells in final basis',
                'Verified loop-free tree structure',
                'Computed total initial transportation cost Z in Indian Rupees (₹)',
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
              "Congratulations to Debangshu, Mamata, Mahima, Susmita, and Abhronila on mastering the complete VAM procedure! When you look at the final solved tableau, you are looking at an exceptionally refined operations plan. By executing the 6 phases methodically—balance check, penalty calculation, max regret selection, least cost allocation, line strike-out, and basis verification—you have compressed freight costs by up to 35% compared to naive methods. Always state your total cost clearly as Z = ∑ (cᵢⱼ · xᵢⱼ) in ₹ Rupees, and verify your basis count m + n - 1 before handing in your solution!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Complete VAM Procedure FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Complete VAM Procedure (Vogel's Approximation Method)"
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
