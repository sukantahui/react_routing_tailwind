// src/components/study/quantitative-analysis/topics/002_005_test-of-optimality-by-modi-method/Topic0.jsx
// React 19 Function-based Component
// Module: 002_005_test-of-optimality-by-modi-method
// Topic 0: Need for testing optimality

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
  const [selectedStagePlan, setSelectedStagePlan] = useState('nwcr'); // 'nwcr', 'least_cost', 'optimal'

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

  // Comparison data between untested IBFS and Certified Optimal Plan
  const planData = {
    nwcr: {
      name: 'Untested NWCR Plan (Cost-Blind Starting Point)',
      badge: 'Untested: Highly Sub-Optimal',
      badgeColor: 'bg-rose-950 text-rose-300 border-rose-800',
      totalCost: '₹2,740',
      statusMessage: '❌ Unaudited Plan: Contains severe negative opportunity costs (d_33 = -₹6, d_21 = -₹4). Overspending by ₹680 (24.8% excess freight bill).',
      allocations: [
        { r: 0, c: 0, qty: 60, cost: 8 },
        { r: 0, c: 1, qty: 10, cost: 14 },
        { r: 1, c: 1, qty: 70, cost: 19 },
        { r: 1, c: 2, qty: 20, cost: 10 },
        { r: 2, c: 2, qty: 60, cost: 7 },
      ],
      opportunityCosts: [
        { r: 0, c: 2, d: '+₹2' },
        { r: 1, c: 0, d: '-₹4' },
        { r: 2, c: 0, d: '+₹5' },
        { r: 2, c: 1, d: '-₹6' },
      ],
    },
    least_cost: {
      name: 'Untested Least Cost Plan (Greedy Starting Point)',
      badge: 'Untested: Moderate Sub-Optimality',
      badgeColor: 'bg-amber-950 text-amber-300 border-amber-800',
      totalCost: '₹2,350',
      statusMessage: '⚠️ Unaudited Plan: Greedy selection trapped capacity. Contains hidden opportunity cost (d_13 = -₹3). Overspending by ₹290.',
      allocations: [
        { r: 1, c: 0, qty: 60, cost: 5 },
        { r: 2, c: 2, qty: 60, cost: 7 },
        { r: 0, c: 1, qty: 70, cost: 14 },
        { r: 1, c: 1, qty: 10, cost: 19 },
        { r: 1, c: 2, qty: 20, cost: 10 },
      ],
      opportunityCosts: [
        { r: 0, c: 0, d: '+₹3' },
        { r: 0, c: 2, d: '-₹3' },
        { r: 2, c: 0, d: '+₹6' },
        { r: 2, c: 1, d: '+₹1' },
      ],
    },
    optimal: {
      name: 'MODI Certified Optimal Plan (Global Minimum)',
      badge: 'Certified Optimal (d_ij ≥ 0)',
      badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-800',
      totalCost: '₹2,060',
      statusMessage: '✅ Certified Global Minimum: All non-basic opportunity costs d_ij ≥ 0. Zero cost-reducing pivots exist; 100% budget efficiency guaranteed.',
      allocations: [
        { r: 1, c: 0, qty: 60, cost: 5 },
        { r: 1, c: 2, qty: 30, cost: 10 },
        { r: 2, c: 2, qty: 50, cost: 7 },
        { r: 2, c: 1, qty: 10, cost: 13 },
        { r: 0, c: 1, qty: 70, cost: 14 },
      ],
      opportunityCosts: [
        { r: 0, c: 0, d: '+₹4' },
        { r: 0, c: 2, d: '+₹2' },
        { r: 1, c: 1, d: '+₹9' },
        { r: 2, c: 0, d: '+₹4' },
      ],
    },
  };

  const currentPlan = planData[selectedStagePlan];

  // Real-World Bengal Case Studies
  const caseStudies = [
    {
      title: '1. Foundry Freight Audit (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Barrackpore heavy foundry started with an untested NWCR plan costing ₹2,740. A MODI test uncovered d_21 = -₹4 and d_33 = -₹6. Shifting volume lowered the final invoice to ₹2,060, saving ₹680 (24.8%) per batch.',
      lesson: 'Never authorize freight payments on an untested starting solution.',
    },
    {
      title: '2. Cold-Chain Vaccine Distribution (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'An initial Matrix Minima allocation gave a budget of ₹2,450. Testing optimality revealed a hidden negative evaluation (d_13 = -₹3). Reallocating 20 boxes reduced total logistics costs to ₹2,190.',
      lesson: 'Testing optimality frees up funds for vital medical inventory.',
    },
    {
      title: '3. Supermarket FMCG Immediate Certification (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Ran VAM on a 3x3 grocery warehouse problem, yielding Z = ₹570. The MODI optimality test confirmed all d_ij ≥ +₹1. Confirmed global optimality on Step 1 with 0 pivots.',
      lesson: 'An optimality test provides undeniable proof of supply chain perfection.',
    },
    {
      title: '4. Educational Press Alternative Optima Discovery (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Auditing textbook distribution revealed d_22 = 0 on an unallocated cell, proving an alternative optimal route existed at the exact same minimal cost of ₹9,400.',
      lesson: 'Zero opportunity cost indicates alternate optimal routing plans.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes auditPulse {
          0%, 100% { border-color: rgba(16, 185, 129, 0.3); }
          50% { border-color: rgba(16, 185, 129, 0.8); }
        }
        .glow-audit {
          animation: auditPulse 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
              Module 002_005 • Topic 0
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-cyan-950/80 text-cyan-400 border border-cyan-800/60">
              Test of Optimality by the MODI Method
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Need for Testing Optimality
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            Why finding an <span className="text-amber-400 font-semibold">Initial Basic Feasible Solution (IBFS)</span> is only half the battle: understanding the vital distinction between feasibility and optimality, the economic role of <span className="text-rose-400 font-semibold">Opportunity Costs (dᵢⱼ)</span>, and how the <span className="text-emerald-400 font-semibold">MODI Method</span> certifies global cost minimization in enterprise logistics.
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'two-stages', label: '1. The 2-Stage Pipeline' },
              { id: 'interactive-audit', label: '2. Interactive Optimality Audit' },
              { id: 'opportunity-costs', label: '3. Opportunity Cost Theory' },
              { id: 'svg-pipeline', label: '4. Optimization Pipeline SVG' },
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

        {/* SECTION 1: The 2-Stage Pipeline */}
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
                The 2-Stage Transportation Optimization Paradigm
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              In linear programming transportation modeling, solving a problem is never a single monolithic step. It is split into two distinct, mathematically rigorous phases:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-5 rounded-xl bg-slate-800/40 border border-amber-800/40 flex flex-col space-y-2">
                <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                  <span className="text-amber-300 font-bold text-base">Stage 1: Construct an IBFS</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-700">
                    Heuristic
                  </span>
                </div>
                <p className="text-slate-300">
                  Find any initial basic solution that satisfies all row supplies (<span className="font-mono text-white">∑ xᵢⱼ = Sᵢ</span>) and column demands (<span className="font-mono text-white">∑ xᵢⱼ = Dⱼ</span>) with <span className="font-mono text-white">m + n - 1</span> non-negative allocations.
                </p>
                <div className="p-2.5 bg-slate-950 rounded font-mono text-slate-400 text-xs mt-1">
                  Methods: NWCR (cost-blind) | Matrix Minima (greedy) | VAM (penalty-regret)
                </div>
                <p className="text-rose-300 text-xs italic">
                  ⚠️ Limitation: Heuristics only provide a feasible starting vertex on the polytope—they CANNOT prove minimal cost!
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-800/40 border border-emerald-800/40 flex flex-col space-y-2">
                <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                  <span className="text-emerald-300 font-bold text-base">Stage 2: Optimality Test & Pivot</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700">
                    Exact Simplex
                  </span>
                </div>
                <p className="text-slate-300">
                  Evaluate all unoccupied (non-basic) shipping routes by computing their opportunity costs <span className="font-mono text-emerald-400">dᵢⱼ = cᵢⱼ - (uᵢ + vⱼ)</span>.
                </p>
                <div className="p-2.5 bg-slate-950 rounded font-mono text-slate-400 text-xs mt-1">
                  Methods: Stepping-Stone Method | MODI (u-v) Distribution Method
                </div>
                <p className="text-emerald-300 text-xs font-semibold">
                  ✅ Guarantee: If all dᵢⱼ ≥ 0, mathematically certified global minimum is achieved. If any dᵢⱼ &lt; 0, pivot flow to reduce total cost Z!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Interactive Optimality Audit */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-audit">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-600/20 text-cyan-400 font-bold text-sm">
                  02
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Interactive Optimality Audit Workbench
                </h2>
              </div>
              <span className={clsx('text-xs font-mono px-3 py-1 rounded-full border', currentPlan.badgeColor)}>
                {currentPlan.badge}
              </span>
            </div>

            {/* Plan Selector */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'nwcr', label: '1. Untested NWCR Plan (₹2,740)' },
                { id: 'least_cost', label: '2. Untested Least Cost Plan (₹2,350)' },
                { id: 'optimal', label: '3. Certified MODI Optimal Plan (₹2,060)' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedStagePlan(item.id)}
                  className={clsx(
                    'px-3.5 py-2 rounded-lg text-xs font-semibold transition-all border text-left',
                    selectedStagePlan === item.id
                      ? 'bg-cyan-600 text-white border-cyan-400 shadow-md'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <p className="text-xs sm:text-sm text-slate-300">
              <strong className="text-white">{currentPlan.name}</strong> — Total Freight Cost: <span className="font-mono text-amber-300 font-bold">{currentPlan.totalCost}</span>
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
                    { name: 'Barrackpore (S1)', costs: [8, 14, 12], s: 70 },
                    { name: 'Ichapur (S2)', costs: [5, 19, 10], s: 90 },
                    { name: 'Kolkata (S3)', costs: [11, 13, 7], s: 60 },
                  ].map((row, rIdx) => (
                    <tr key={rIdx} className="border-b border-slate-800/60">
                      <td className="p-2.5 text-left font-medium text-slate-200">{row.name}</td>
                      {row.costs.map((cost, cIdx) => {
                        const alloc = currentPlan.allocations.find((a) => a.r === rIdx && a.c === cIdx);
                        const oppCost = currentPlan.opportunityCosts.find((o) => o.r === rIdx && o.c === cIdx);
                        const isNegative = oppCost && oppCost.d.includes('-');

                        return (
                          <td key={cIdx} className="p-2">
                            <div
                              className={clsx(
                                'p-2 rounded-lg font-mono font-bold transition-all border flex flex-col items-center justify-center',
                                alloc
                                  ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500 shadow-md'
                                  : isNegative
                                  ? 'bg-rose-950/80 text-rose-300 border-rose-500 animate-pulse'
                                  : 'bg-slate-900 text-slate-400 border-slate-800'
                              )}
                            >
                              {alloc ? (
                                <span className="text-[10px] font-extrabold bg-slate-950 text-amber-300 px-1.5 py-0.5 rounded mb-1">
                                  x = {alloc.qty} tons
                                </span>
                              ) : oppCost ? (
                                <span
                                  className={clsx(
                                    'text-[10px] font-extrabold px-1.5 py-0.5 rounded mb-1 border',
                                    isNegative
                                      ? 'bg-rose-950 text-rose-300 border-rose-600'
                                      : 'bg-slate-950 text-slate-400 border-slate-700'
                                  )}
                                >
                                  d = {oppCost.d}
                                </span>
                              ) : null}
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
                    <td className="p-2 font-bold text-amber-300">80</td>
                    <td className="p-2 font-bold text-amber-300">80</td>
                    <td className="p-2 font-bold text-white">∑ 220</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Audit Status Banner */}
            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700 text-xs sm:text-sm">
              <p className="text-slate-200">{currentPlan.statusMessage}</p>
            </div>
          </div>
        </section>

        {/* SECTION 3: Opportunity Cost Theory */}
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
                Opportunity Cost & The Optimality Criterion
              </h2>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-3">
              <span className="text-purple-300 font-bold text-sm">The Net Evaluation Index Formula</span>
              <div className="p-3 bg-slate-900 rounded font-mono text-emerald-300 text-sm sm:text-base">
                dᵢⱼ = cᵢⱼ - (uᵢ + vⱼ) &nbsp;&nbsp;(for every non-basic cell)
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Where <span className="font-mono text-white">cᵢⱼ</span> is the direct freight rate, and <span className="font-mono text-white">uᵢ + vⱼ</span> is the implied dual shadow cost of shipping from Origin <span className="font-mono text-cyan-300">i</span> to Destination <span className="font-mono text-cyan-300">j</span>.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-rose-800/40 flex flex-col space-y-2">
                <span className="text-rose-300 font-bold">1. dᵢⱼ &lt; 0 (Cost Deficit)</span>
                <p className="text-slate-300">
                  Activating this route will <strong>decrease total cost</strong> by <span className="font-mono text-rose-400">|dᵢⱼ|</span> Rupees per unit. Solution is NOT optimal!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-emerald-800/40 flex flex-col space-y-2">
                <span className="text-emerald-300 font-bold">2. dᵢⱼ &gt; 0 (Cost Barrier)</span>
                <p className="text-slate-300">
                  Activating this route would <strong>increase total cost</strong> by <span className="font-mono text-emerald-400">dᵢⱼ</span> Rupees per unit. Keep this route empty.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-amber-800/40 flex flex-col space-y-2">
                <span className="text-amber-300 font-bold">3. dᵢⱼ = 0 (Alternative Optima)</span>
                <p className="text-slate-300">
                  Activating this route leaves total cost <strong>completely unchanged</strong>, indicating alternative optimal routing solutions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Optimization Pipeline SVG */}
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
                Complete 2-Stage Transportation Optimization Pipeline
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 760 300"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Stage 1 Box */}
                <rect x="30" y="70" width="180" height="90" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="120" y="100" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle">Stage 1: IBFS</text>
                <text x="120" y="125" fill="#cbd5e1" fontSize="10" textAnchor="middle">NWCR / Matrix Min / VAM</text>
                <text x="120" y="145" fill="#94a3b8" fontSize="9" textAnchor="middle">Feasible starting basis</text>

                {/* Arrow */}
                <line x1="210" y1="115" x2="260" y2="115" stroke="#f59e0b" strokeWidth="2" />
                <polygon points="260,115 252,110 252,120" fill="#f59e0b" />

                {/* Stage 2 Decision Diamond / Box */}
                <rect x="260" y="70" width="220" height="90" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="370" y="100" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">Stage 2: MODI Test</text>
                <text x="370" y="125" fill="#34d399" fontSize="10" fontFamily="monospace" textAnchor="middle">dᵢⱼ = cᵢⱼ - (uᵢ + vⱼ)</text>
                <text x="370" y="145" fill="#cbd5e1" fontSize="9" textAnchor="middle">Check all empty cells</text>

                {/* Arrow to Optimal */}
                <line x1="480" y1="115" x2="550" y2="115" stroke="#10b981" strokeWidth="2" />
                <polygon points="550,115 542,110 542,120" fill="#10b981" />
                <text x="515" y="105" fill="#34d399" fontSize="10" textAnchor="middle">All dᵢⱼ ≥ 0</text>

                {/* Terminal Certified Box */}
                <rect x="550" y="70" width="180" height="90" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                <text x="640" y="100" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">Certified Optimal</text>
                <text x="640" y="125" fill="#ffffff" fontSize="10" fontFamily="monospace" textAnchor="middle">Global Minimum Z</text>
                <text x="640" y="145" fill="#a7f3d0" fontSize="9" textAnchor="middle">0 pivots remaining</text>

                {/* Pivot Loop back */}
                <path d="M 370 160 L 370 230 L 120 230 L 120 160" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 4" fill="none" />
                <polygon points="120,160 115,168 125,168" fill="#f43f5e" />
                <text x="245" y="250" fill="#f43f5e" fontSize="10" textAnchor="middle">
                  Any dᵢⱼ &lt; 0: Pivot flow around closed loop & repeat
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
                Bengal Logistics Optimality Audit Case Studies
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
                  trap: 'Assuming an IBFS is "Good Enough" Without Testing',
                  fix: 'Even VAM solutions can hide a 2-5% cost reduction; an optimality test is required to mathematically prove minimal cost.',
                },
                {
                  trap: 'Testing Optimality on a Degenerate Matrix',
                  fix: 'Confirm exactly m + n - 1 basic cells exist; add an epsilon (ε) in a loop-free cell before attempting to compute u_i and v_j.',
                },
                {
                  trap: 'Misinterpreting Negative Opportunity Costs (d_ij < 0)',
                  fix: 'Remember that d_ij < 0 means shipping along route (i, j) DECREASES total cost by |d_ij| Rupees per unit.',
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
                  Think about why human intuition fails in large matrices: shipping along a slightly more expensive route can unlock dramatic savings across three other interconnected routes in the network!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully that the MODI method evaluates all (m-1)(n-1) empty cells simultaneously using simple addition (uᵢ + vⱼ), completely avoiding tedious individual geometric loop drawings.
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
                Student Revision Checklist (Topic 0)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Distinguished between an Initial Basic Feasible Solution (IBFS) and an Optimal Solution',
                'Understood why heuristics (NWCR, Least Cost, VAM) cannot guarantee 100% global optimality',
                'Memorized the Opportunity Cost formula: dᵢⱼ = cᵢⱼ - (uᵢ + vⱼ)',
                'Identified the Global Optimality Criterion: all dᵢⱼ ≥ 0',
                'Understood that dᵢⱼ < 0 triggers flow improvement around a closed loop',
                'Verified non-degeneracy prerequisite (m + n - 1 basic cells) for MODI solving',
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
              "Welcome to Module 002_005! I tell Debangshu, Mamata, Mahima, Susmita, and Abhronila that finding an Initial Basic Feasible Solution is like putting fuel in a truck—it allows the journey to begin, but it doesn't guarantee you took the shortest route! An Initial Solution merely satisfies the supply and demand equations; only an Optimality Test mathematically proves that no hidden route can save you thousands of rupees. In this module, we master the Modified Distribution (MODI) method. Remember: an IBFS gets your trucks moving, but testing optimality ensures your enterprise stays profitable!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Need for Testing Optimality FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Need for Testing Optimality (MODI Method)"
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
