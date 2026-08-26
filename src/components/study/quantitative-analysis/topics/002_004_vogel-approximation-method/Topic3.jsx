// src/components/study/quantitative-analysis/topics/002_004_vogel-approximation-method/Topic3.jsx
// React 19 Function-based Component
// Module: 002_004_vogel-approximation-method
// Topic 3: Allocation using the least-cost cell

import React, { useState, useEffect, useRef, useMemo } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic3_files/topic3_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic3_files/topic3_note.txt?raw';

const Topic3 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [allocationStep, setAllocationStep] = useState(1);

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

  // Multi-step Interactive Simulation Data
  const simulationSteps = [
    {
      step: 1,
      title: 'Pass 1: Identifying Max Penalty & Allocating to (S2, D1)',
      winningLine: 'Row 2 (Ichapur Foundry) with Max Penalty P = ₹5',
      targetCell: 'Cell (S2, D1) Jadavpur @ ₹5/ton',
      supplyBefore: 'S2 = 90 tons',
      demandBefore: 'D1 = 60 tons',
      allocatedQty: 60,
      supplyAfter: 'S2 = 30 tons',
      demandAfter: 'D1 = 0 tons (Crossed Out)',
      crossedLine: 'Column 1 (Jadavpur Depot)',
      allocations: [{ r: 1, c: 0, qty: 60, cost: 5, active: true }],
      activeRows: [0, 1, 2],
      activeCols: [1, 2], // Col 0 crossed
      matrixState: [
        { r: 0, s: 70, costs: [8, 14, 12] },
        { r: 1, s: 30, costs: [5, 19, 10] },
        { r: 2, s: 60, costs: [11, 13, 7] },
      ],
      demandState: [0, 80, 80],
    },
    {
      step: 2,
      title: 'Pass 2: New Penalties & Allocating to (S3, D3)',
      winningLine: 'Row 3 (Kolkata Yard) with Max Penalty P = ₹6 (₹13 - ₹7)',
      targetCell: 'Cell (S3, D3) Howrah Rail @ ₹7/ton',
      supplyBefore: 'S3 = 60 tons',
      demandBefore: 'D3 = 80 tons',
      allocatedQty: 60,
      supplyAfter: 'S3 = 0 tons (Crossed Out)',
      demandAfter: 'D3 = 20 tons',
      crossedLine: 'Row 3 (Kolkata Engineering Yard)',
      allocations: [
        { r: 1, c: 0, qty: 60, cost: 5, active: false },
        { r: 2, c: 2, qty: 60, cost: 7, active: true },
      ],
      activeRows: [0, 1], // Row 2 crossed
      activeCols: [1, 2],
      matrixState: [
        { r: 0, s: 70, costs: [8, 14, 12] },
        { r: 1, s: 30, costs: [5, 19, 10] },
        { r: 2, s: 0, costs: [11, 13, 7] },
      ],
      demandState: [0, 80, 20],
    },
    {
      step: 3,
      title: 'Pass 3: Allocating to (S2, D3)',
      winningLine: 'Row 2 (Ichapur Foundry) with remaining 30 tons',
      targetCell: 'Cell (S2, D3) Howrah Rail @ ₹10/ton',
      supplyBefore: 'S2 = 30 tons',
      demandBefore: 'D3 = 20 tons',
      allocatedQty: 20,
      supplyAfter: 'S2 = 10 tons',
      demandAfter: 'D3 = 0 tons (Crossed Out)',
      crossedLine: 'Column 3 (Howrah Rail Depot)',
      allocations: [
        { r: 1, c: 0, qty: 60, cost: 5, active: false },
        { r: 2, c: 2, qty: 60, cost: 7, active: false },
        { r: 1, c: 2, qty: 20, cost: 10, active: true },
      ],
      activeRows: [0, 1],
      activeCols: [1], // Col 2 crossed
      matrixState: [
        { r: 0, s: 70, costs: [8, 14, 12] },
        { r: 1, s: 10, costs: [5, 19, 10] },
        { r: 2, s: 0, costs: [11, 13, 7] },
      ],
      demandState: [0, 80, 0],
    },
    {
      step: 4,
      title: 'Pass 4: Final Fulfillment of Salt Lake (D2)',
      winningLine: 'Final Sub-matrix Fulfillment for Column 2 (Salt Lake)',
      targetCell: 'Allocate 10 tons to (S2, D2) @ ₹19 and 70 tons to (S1, D2) @ ₹14',
      supplyBefore: 'S1 = 70, S2 = 10',
      demandBefore: 'D2 = 80',
      allocatedQty: 80,
      supplyAfter: 'All Supplies = 0',
      demandAfter: 'All Demands = 0',
      crossedLine: 'All Lines Satisfied',
      allocations: [
        { r: 1, c: 0, qty: 60, cost: 5, active: false },
        { r: 2, c: 2, qty: 60, cost: 7, active: false },
        { r: 1, c: 2, qty: 20, cost: 10, active: false },
        { r: 1, c: 1, qty: 10, cost: 19, active: true },
        { r: 0, c: 1, qty: 70, cost: 14, active: true },
      ],
      activeRows: [],
      activeCols: [],
      matrixState: [
        { r: 0, s: 0, costs: [8, 14, 12] },
        { r: 1, s: 0, costs: [5, 19, 10] },
        { r: 2, s: 0, costs: [11, 13, 7] },
      ],
      demandState: [0, 0, 0],
    },
  ];

  const currentSim = simulationSteps[allocationStep - 1];

  // Case Studies
  const caseStudies = [
    {
      title: '1. Precision Foundry Supply (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Inside winning Row 2 (Ichapur), unit costs are Jadavpur (₹5), Howrah (₹10), Salt Lake (₹19). Cell (S2, D1) is the least-cost cell @ ₹5.',
      alloc: 'Allocate min(Supply 90, Demand 60) = 60 tons. Jadavpur demand is fully satisfied, and Column 1 is crossed out.',
      costImpact: '60 tons × ₹5/ton = ₹300 subtotal.',
    },
    {
      title: '2. Greater Kolkata Vaccine Cold-Chain (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Winning Row 2 (Barrackpore Bio-Depot) has candidate routes @ ₹4 (Howrah), ₹15 (Jadavpur), ₹25 (Barasat). Cell (S2, D1) is least cost.',
      alloc: 'Allocate min(100, 60) = 60 boxes to (S2, D1) @ ₹4/box. Exhausts Howrah hospital demand.',
      costImpact: '60 boxes × ₹4/box = ₹240 subtotal.',
    },
    {
      title: '3. Supermarket FMCG Logistics (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Winning Column 3 (Gariahat Supercenter) has supplier rates of ₹11 (Barrackpore), ₹8 (Ichapur), ₹3 (Kolkata Depot). Cell (S3, D3) is least cost.',
      alloc: 'Allocate min(40, 50) = 40 pallets to (S3, D3) @ ₹3/pallet. Exhausts Kolkata depot completely.',
      costImpact: '40 pallets × ₹3/pallet = ₹120 subtotal.',
    },
    {
      title: '4. Educational Press & University Books (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Winning Column 2 (College Street Press) has candidate rates ₹2 (Barrackpore), ₹11 (Kolkata), ₹14 (Ichapur). Cell (S1, D2) is least cost @ ₹2.',
      alloc: 'Allocate min(75, 80) = 75 bundles to (S1, D2) @ ₹2/bundle. Exhausts Barrackpore press.',
      costImpact: '75 bundles × ₹2/bundle = ₹150 subtotal.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes allocPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-alloc {
          animation: allocPulse 1.8s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
              Module 002_004 • Topic 3
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-cyan-950/80 text-cyan-400 border border-cyan-800/60">
              Capacity Dispatch & Line Elimination
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Allocation Using the Least-Cost Cell
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            Executing the core shipment assignment in Vogel's Approximation Method: targeting the <span className="text-emerald-400 font-semibold">Least-Cost Cell</span> inside the winning maximum penalty line, dispatching <span className="text-amber-400 font-semibold">x_kl = min(S_k, D_l)</span>, adjusting capacities, and striking out exhausted lines.
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'allocation-rule', label: '1. Allocation Mathematics' },
              { id: 'simulation', label: '2. Interactive Multi-Pass Simulator' },
              { id: 'strike-out', label: '3. Line Strike-Out Protocol' },
              { id: 'svg-flow', label: '4. Allocation Flow SVG' },
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

        {/* SECTION 1: Allocation Mathematics */}
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
                Mathematical Allocation Formulation
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Once the winning line <span className="font-mono text-emerald-400">L*</span> (Row k or Column l) is selected, VAM determines the allocation coordinates and volume through three governing equations:
            </p>

            <div className="flex flex-col space-y-4">
              {/* Equation 1: Cell Location */}
              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-bold text-sm sm:text-base">
                  1. Target Cell Selection Equation
                </span>
                <div className="p-3 bg-slate-950 rounded-lg font-mono text-cyan-300 text-xs sm:text-sm">
                  (k, l) = argmin &#123; c_ij | cell (i, j) is active in winning line L* &#125;
                </div>
                <p className="text-xs text-slate-400">
                  Selects the route with the cheapest freight rate inside the line facing the highest penalty hazard.
                </p>
              </div>

              {/* Equation 2: Allocation Quantity */}
              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700 flex flex-col space-y-1">
                <span className="text-amber-300 font-bold text-sm sm:text-base">
                  2. Feasible Volume Assignment Equation
                </span>
                <div className="p-3 bg-slate-950 rounded-lg font-mono text-amber-300 text-xs sm:text-sm">
                  x_kl = min( S_k, D_l )
                </div>
                <p className="text-xs text-slate-400">
                  Assigns the maximum possible volume without violating the supplier's capacity S_k or customer's demand D_l.
                </p>
              </div>

              {/* Equation 3: Capacity Decrements */}
              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700 flex flex-col space-y-1">
                <span className="text-emerald-300 font-bold text-sm sm:text-base">
                  3. Capacity Update & Balance Decrement Equations
                </span>
                <div className="p-3 bg-slate-950 rounded-lg font-mono text-emerald-300 text-xs sm:text-sm">
                  S_k ← S_k - x_kl &nbsp;&nbsp;|&nbsp;&nbsp; D_l ← D_l - x_kl
                </div>
                <p className="text-xs text-slate-400">
                  Deducts the assigned shipment immediately from both origin supply and destination demand.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Interactive Multi-Pass Simulator */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                  02
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Step-by-Step Allocation Simulator
                </h2>
              </div>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4].map((stepNum) => (
                  <button
                    key={stepNum}
                    onClick={() => setAllocationStep(stepNum)}
                    className={clsx(
                      'px-3 py-1 rounded text-xs font-semibold transition-all border',
                      allocationStep === stepNum
                        ? 'bg-emerald-600 text-white border-emerald-400 shadow-md'
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                    )}
                  >
                    Pass {stepNum}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-xs text-slate-300">
              <strong className="text-white">{currentSim.title}</strong>
            </p>

            {/* Simulation Tableau */}
            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-4">
              <table className="w-full text-center border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2 text-left font-semibold text-slate-300">Origins \ Dests</th>
                    <th className="p-2 font-semibold text-cyan-300">Jadavpur (D1)</th>
                    <th className="p-2 font-semibold text-cyan-300">Salt Lake (D2)</th>
                    <th className="p-2 font-semibold text-cyan-300">Howrah (D3)</th>
                    <th className="p-2 font-semibold text-amber-300">Remaining Supply</th>
                  </tr>
                </thead>
                <tbody>
                  {currentSim.matrixState.map((rowItem, rIdx) => {
                    const originNames = ['Barrackpore (S1)', 'Ichapur (S2)', 'Kolkata (S3)'];
                    return (
                      <tr key={rIdx} className="border-b border-slate-800/60">
                        <td className="p-2.5 text-left font-medium text-slate-200">
                          {originNames[rIdx]}
                        </td>
                        {rowItem.costs.map((cost, cIdx) => {
                          const matchingAlloc = currentSim.allocations.find((a) => a.r === rIdx && a.c === cIdx);
                          const isTarget = matchingAlloc && matchingAlloc.active;

                          return (
                            <td key={cIdx} className="p-2">
                              <div
                                className={clsx(
                                  'p-2 rounded-lg font-mono font-bold transition-all border flex flex-col items-center justify-center',
                                  isTarget
                                    ? 'bg-emerald-500 text-slate-950 border-emerald-300 scale-105 shadow-lg animate-alloc'
                                    : matchingAlloc
                                    ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60'
                                    : 'bg-slate-900 text-slate-400 border-slate-800'
                                )}
                              >
                                {matchingAlloc && (
                                  <span className="text-[11px] font-extrabold bg-slate-950/80 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/50 mb-1">
                                    Alloc: {matchingAlloc.qty}
                                  </span>
                                )}
                                <span>₹{cost}</span>
                              </div>
                            </td>
                          );
                        })}
                        <td className="p-2 font-mono font-bold text-amber-300">
                          {rowItem.s} tons
                        </td>
                      </tr>
                    );
                  })}
                  {/* Demand Row */}
                  <tr className="bg-slate-900/40 text-slate-300 font-mono">
                    <td className="p-2.5 text-left font-semibold text-amber-300">Remaining Demand</td>
                    {currentSim.demandState.map((dm, dmIdx) => (
                      <td key={dmIdx} className="p-2 font-bold text-amber-300">
                        {dm} tons
                      </td>
                    ))}
                    <td className="p-2 text-slate-600 text-xs">—</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Step Details Audit Card */}
            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-2 text-xs sm:text-sm">
              <div className="flex items-center justify-between border-b border-slate-700/60 pb-2">
                <span className="text-emerald-300 font-semibold">⚡ Action in Pass {currentSim.step}:</span>
                <span className="text-amber-400 font-mono">Line Crossed: {currentSim.crossedLine}</span>
              </div>
              <p className="text-slate-300">• <strong>Winning Line:</strong> {currentSim.winningLine}</p>
              <p className="text-slate-300">• <strong>Target Cell:</strong> {currentSim.targetCell}</p>
              <p className="text-slate-300">• <strong>Allocation:</strong> <span className="text-emerald-400 font-bold font-mono">x = min({currentSim.supplyBefore}, {currentSim.demandBefore}) = {currentSim.allocatedQty} tons</span></p>
              <p className="text-slate-300">• <strong>Updated Balances:</strong> {currentSim.supplyAfter} | {currentSim.demandAfter}</p>
            </div>
          </div>
        </section>

        {/* SECTION 3: Line Strike-Out Protocol */}
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
                Line Strike-Out & Non-Degeneracy Protocol
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-2">
                <span className="text-cyan-300 font-semibold">Standard Elimination</span>
                <p className="text-slate-300">
                  When only one line reaches zero capacity (either <span className="font-mono text-cyan-400">S_k = 0</span> or <span className="font-mono text-cyan-400">D_l = 0</span>), draw a neat line through that satisfied row or column. Its cells are excluded from subsequent penalty checks.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-2">
                <span className="text-rose-300 font-semibold">Simultaneous Zero (Degeneracy Prevention)</span>
                <p className="text-slate-300">
                  If <span className="font-mono text-rose-400">S_k = D_l</span> simultaneously, strike out <strong>ONLY ONE line</strong> (e.g. Row k) and leave the other active with remaining capacity <span className="font-mono text-white">0</span>. This guarantees the mandatory <span className="font-mono text-emerald-400">m + n - 1</span> basic cells.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Allocation Flow SVG */}
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
                Least-Cost Cell Dispatch Mechanics
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 300"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                <defs>
                  <linearGradient id="allocGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#059669" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>

                {/* Supply Origin Box */}
                <rect x="50" y="80" width="160" height="90" rx="10" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="130" y="110" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">Origin Supply S_k</text>
                <text x="130" y="135" fill="#ffffff" fontSize="14" fontWeight="bold" fontFamily="monospace" textAnchor="middle">90 tons</text>

                {/* Demand Destination Box */}
                <rect x="530" y="80" width="160" height="90" rx="10" fill="#1e293b" stroke="#34d399" strokeWidth="2" />
                <text x="610" y="110" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">Dest Demand D_l</text>
                <text x="610" y="135" fill="#ffffff" fontSize="14" fontWeight="bold" fontFamily="monospace" textAnchor="middle">60 tons</text>

                {/* Central Dispatch Box */}
                <rect x="270" y="65" width="200" height="120" rx="12" fill="url(#allocGrad)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.4))" />
                <text x="370" y="95" fill="#0f172a" fontSize="13" fontWeight="extrabold" textAnchor="middle">LEAST-COST CELL (k, l)</text>
                <text x="370" y="120" fill="#ffffff" fontSize="12" textAnchor="middle">Rate: ₹5/ton</text>
                <text x="370" y="145" fill="#0f172a" fontSize="15" fontWeight="extrabold" fontFamily="monospace" textAnchor="middle">x_kl = min(90, 60) = 60</text>
                <text x="370" y="165" fill="#d1fae5" fontSize="10" textAnchor="middle">Subtotal: 60 × ₹5 = ₹300</text>

                {/* Arrows */}
                <line x1="210" y1="125" x2="270" y2="125" stroke="#38bdf8" strokeWidth="3" />
                <polygon points="270,125 260,119 260,131" fill="#38bdf8" />

                <line x1="470" y1="125" x2="530" y2="125" stroke="#34d399" strokeWidth="3" />
                <polygon points="530,125 520,119 520,131" fill="#34d399" />

                {/* Bottom Result text */}
                <text x="370" y="240" fill="#94a3b8" fontSize="11" textAnchor="middle">
                  Result: Demand D_l satisfied completely (0 tons remaining) ➔ Column l struck out!
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
                Bengal Logistics Allocation Case Studies
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
                  <p className="text-slate-300"><strong>Scenario:</strong> {cs.desc}</p>
                  <p className="text-emerald-300"><strong>Allocation:</strong> {cs.alloc}</p>
                  <p className="text-cyan-300"><strong>Freight Expenditure:</strong> {cs.costImpact}</p>
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
                  trap: 'Forgetting to Deduct Capacity from One Balance',
                  fix: 'Always subtract allocated units x_kl from BOTH S_k and D_l simultaneously.',
                },
                {
                  trap: 'Crossing Out Both Row and Column on Ties',
                  fix: 'Never eliminate two lines in one step when S_k = D_l; cross out only one line to avoid degeneracy.',
                },
                {
                  trap: 'Overwriting Unit Cost with Allocated Volume',
                  fix: 'Record allocated units inside a distinct box in the cell, keeping unit cost c_ij clearly visible.',
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
                  Think about what happens to the remaining active sub-matrix after a row is crossed out: all surviving columns now have one fewer choice, which is why penalties must be recalculated immediately!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully that in the final step (Pass 4), when only 1 column is active, allocations are made by direct substitution without needing any further penalty differences.
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
                Student Revision Checklist (Topic 3)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Identified least-cost cell inside winning maximum penalty line',
                'Computed allocation volume x_kl = min(Supply_k, Demand_l)',
                'Recorded allocation quantity clearly in cell box',
                'Deducted allocated units from origin supply',
                'Deducted allocated units from destination demand',
                'Crossed out the exhausted line',
                'Maintained single cross-out rule when supply equals demand',
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
              "During our dispatching labs in Kolkata and Barrackpore, I always advise Debangshu, Mamata, Mahima, Susmita, and Abhronila to keep their tableau clean and legible. When you write an allocation, place the allocated quantity in a distinct bracket or box at the center of the cell, while preserving the original unit cost in the upper-right corner. And remember my golden check: before drawing a line through an exhausted row or column, verify your arithmetic subtraction on both margins. Precision in decrementing S_k and D_l guarantees that your entire VAM execution lands smoothly at optimality!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Allocation Using the Least-Cost Cell FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Allocation Using the Least-Cost Cell (Vogel's Approximation Method)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic4_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic3;
