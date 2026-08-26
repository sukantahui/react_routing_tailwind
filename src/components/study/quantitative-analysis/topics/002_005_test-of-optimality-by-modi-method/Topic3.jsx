// src/components/study/quantitative-analysis/topics/002_005_test-of-optimality-by-modi-method/Topic3.jsx
// React 19 Function-based Component
// Module: 002_005_test-of-optimality-by-modi-method
// Topic 3: Calculating opportunity costs

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic3_files/topic3_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic3_files/topic3_note.txt?raw';

const Topic3 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedCell, setSelectedCell] = useState({ r: 1, c: 0 }); // default to entering cell (2, 1)

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

  // Matrix and potential data
  const matrixData = {
    origins: ['Barrackpore Heavy (S1)', 'Ichapur Casting (S2)', 'Kolkata Yard (S3)'],
    destinations: ['Jadavpur (D1)', 'Salt Lake (D2)', 'Howrah (D3)'],
    u: [0, 5, 2],
    v: [8, 14, 5],
    supplies: [70, 90, 60],
    demands: [60, 80, 80],
    costs: [
      [8, 14, 12],
      [5, 19, 10],
      [11, 13, 7],
    ],
    allocations: [
      { r: 0, c: 0, qty: 60 },
      { r: 0, c: 1, qty: 10 },
      { r: 1, c: 1, qty: 70 },
      { r: 1, c: 2, qty: 20 },
      { r: 2, c: 2, qty: 60 },
    ],
  };

  // Inspect selected cell properties
  const getCellDetails = (r, c) => {
    const cost = matrixData.costs[r][c];
    const uVal = matrixData.u[r];
    const vVal = matrixData.v[c];
    const shadowSum = uVal + vVal;
    const isBasic = matrixData.allocations.some((a) => a.r === r && a.c === c);
    const allocObj = matrixData.allocations.find((a) => a.r === r && a.c === c);
    const dVal = cost - shadowSum;

    return {
      r,
      c,
      cost,
      uVal,
      vVal,
      shadowSum,
      isBasic,
      qty: allocObj ? allocObj.qty : 0,
      dVal,
      isMostNegative: r === 1 && c === 0,
    };
  };

  const inspectedCell = getCellDetails(selectedCell.r, selectedCell.c);

  // Case Studies
  const caseStudies = [
    {
      title: '1. Foundry Opportunity Cost Audit (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Evaluated empty routes for Barrackpore casting shipments. Uncovered d_21 = -₹8 (most negative) and d_32 = -₹3. Shifting 60 tons into cell (2, 1) delivered ₹480 in instant cost savings.',
      lesson: 'The most negative evaluation guarantees the highest immediate marginal return.',
    },
    {
      title: '2. Cold-Chain Vaccine Route Evaluation (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Evaluated unallocated vaccine transport routes. Identified d_13 = -₹3. Shifting 20 boxes into route (1, 3) reduced transport invoices by ₹60 for regional health centers.',
      lesson: 'Evaluating opportunity costs optimizes emergency hospital logistics.',
    },
    {
      title: '3. Supermarket FMCG All-Positive Certification (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Evaluated all 4 empty cells in a 3x3 retail warehouse tableau: d = [+2, +1, +4, +3]. Because every d_ij ≥ 0, certified the plan as globally optimal on Step 1.',
      lesson: 'All d_ij ≥ 0 provides mathematical proof of minimal logistics expenditure.',
    },
    {
      title: '4. Educational Press Alternative Optima Discovery (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Found d_22 = 0 on an unallocated textbook printing route. Recognized an alternative optimal routing plan existed with the exact same minimal cost of ₹9,400.',
      lesson: 'A zero evaluation index indicates alternative optimal routing flexibility.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes oppCostGlow {
          0%, 100% { border-color: rgba(244, 63, 94, 0.3); }
          50% { border-color: rgba(244, 63, 94, 0.8); }
        }
        .glow-opp {
          animation: oppCostGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
              Module 002_005 • Topic 3
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-rose-950/80 text-rose-400 border border-rose-800/60">
              Net Evaluation Index (dᵢⱼ)
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Calculating Opportunity Costs
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive investigation into <span className="text-rose-400 font-semibold">Opportunity Costs / Net Evaluation Indices (dᵢⱼ)</span>: evaluating empty shipping routes using <span className="text-emerald-400 font-mono font-semibold">dᵢⱼ = cᵢⱼ - (uᵢ + vⱼ)</span>, interpreting economic signals (<span className="text-emerald-400 font-mono">&gt;0</span>, <span className="text-amber-400 font-mono">=0</span>, <span className="text-rose-400 font-mono">&lt;0</span>), and selecting the optimal entering candidate.
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'formula', label: '1. Opportunity Cost Formula' },
              { id: 'interactive-grid', label: '2. Interactive Cell Inspector' },
              { id: 'interpretation', label: '3. Economic Sign Meaning' },
              { id: 'svg-diagram', label: '4. Direct vs Shadow Cost SVG' },
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
                    ? 'bg-rose-600 text-white border-rose-500 shadow-md shadow-rose-900/40'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
                )}
              &gt;
                {item.label}
              </button>
            ))}
          </div>
        </header>

        {/* SECTION 1: Opportunity Cost Formula */}
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
                The Net Evaluation Formula & Non-Basic Cell Count
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              For every unoccupied (non-basic) cell <span className="font-mono text-cyan-300">(i, j)</span> in the transportation tableau, its opportunity cost evaluates whether sending cargo directly is cheaper than routing through the current basic network:
            </p>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-2">
              <span className="text-rose-300 font-bold text-sm">Opportunity Cost Formula</span>
              <div className="p-3 bg-slate-900 rounded font-mono text-emerald-300 text-sm sm:text-base">
                dᵢⱼ = cᵢⱼ - (uᵢ + vⱼ) &nbsp;&nbsp;(evaluated for all (m - 1)(n - 1) empty cells)
              </div>
              <p className="text-xs text-slate-400">
                Where <span className="font-mono text-white">cᵢⱼ</span> is direct rate in ₹, and <span className="font-mono text-white">uᵢ + vⱼ</span> is the implied shadow cost of shipping from Origin <span className="font-mono text-purple-300">i</span> to Destination <span className="font-mono text-cyan-300">j</span>.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Interactive Cell Inspector */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-opp">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-600/20 text-rose-400 font-bold text-sm">
                  02
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Interactive Opportunity Cost Cell Inspector
                </h2>
              </div>
              <span className="text-xs text-slate-400">
                💡 Click any cell below to inspect its exact arithmetic & economic evaluation!
              </span>
            </div>

            {/* Tableau */}
            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-4">
              <table className="w-full text-center border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2 text-left font-semibold text-slate-300">Origins \ Dests</th>
                    <th className="p-2 font-semibold text-cyan-300">
                      Jadavpur (D1)<br />
                      <span className="font-mono text-emerald-400 text-xs">v₁ = ₹8</span>
                    </th>
                    <th className="p-2 font-semibold text-cyan-300">
                      Salt Lake (D2)<br />
                      <span className="font-mono text-emerald-400 text-xs">v₂ = ₹14</span>
                    </th>
                    <th className="p-2 font-semibold text-cyan-300">
                      Howrah (D3)<br />
                      <span className="font-mono text-emerald-400 text-xs">v₃ = ₹5</span>
                    </th>
                    <th className="p-2 font-semibold text-amber-300">Supply</th>
                    <th className="p-2 font-semibold text-purple-400">Dual uᵢ</th>
                  </tr>
                </thead>
                <tbody>
                  {matrixData.origins.map((orig, rIdx) => (
                    <tr key={rIdx} className="border-b border-slate-800/60">
                      <td className="p-2.5 text-left font-medium text-slate-200">{orig}</td>
                      {matrixData.costs[rIdx].map((cost, cIdx) => {
                        const isBasic = matrixData.allocations.some((a) => a.r === rIdx && a.c === cIdx);
                        const allocObj = matrixData.allocations.find((a) => a.r === rIdx && a.c === cIdx);
                        const isSelected = selectedCell.r === rIdx && selectedCell.c === cIdx;
                        const dVal = cost - (matrixData.u[rIdx] + matrixData.v[cIdx]);

                        return (
                          <td key={cIdx} className="p-2">
                            <button
                              onClick={() => setSelectedCell({ r: rIdx, c: cIdx })}
                              className={clsx(
                                'w-full p-2 rounded-lg font-mono font-bold transition-all border flex flex-col items-center justify-center cursor-pointer',
                                isSelected
                                  ? 'ring-2 ring-rose-400 border-rose-300 scale-105 shadow-lg'
                                  : isBasic
                                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-600'
                                  : dVal < 0
                                  ? 'bg-rose-950 text-rose-300 border-rose-600 animate-pulse'
                                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-600'
                              )}
                            >
                              {isBasic ? (
                                <span className="text-[10px] font-extrabold bg-slate-950 text-amber-300 px-1.5 py-0.5 rounded mb-1">
                                  x = {allocObj.qty} (Basic)
                                </span>
                              ) : (
                                <span
                                  className={clsx(
                                    'text-[10px] font-extrabold px-1.5 py-0.5 rounded mb-1 border',
                                    dVal < 0
                                      ? 'bg-rose-950 text-rose-200 border-rose-500'
                                      : 'bg-slate-950 text-slate-400 border-slate-700'
                                  )}
                                >
                                  d = {dVal &ge; 0 ? `+₹${dVal}` : `-₹${Math.abs(dVal)}`}
                                </span>
                              )}
                              <span>₹{cost}</span>
                            </button>
                          </td>
                        );
                      })}
                      <td className="p-2 font-mono font-bold text-amber-300">{matrixData.supplies[rIdx]}</td>
                      <td className="p-2 font-mono font-bold text-purple-400">u_{rIdx + 1} = ₹{matrixData.u[rIdx]}</td>
                    </tr>
                  ))}
                  <tr className="bg-slate-900/40 text-slate-300 font-mono">
                    <td className="p-2.5 text-left font-semibold text-amber-300">Demand</td>
                    <td className="p-2 font-bold text-amber-300">60</td>
                    <td className="p-2 font-bold text-amber-300">80</td>
                    <td className="p-2 font-bold text-amber-300">80</td>
                    <td className="p-2 font-bold text-white">∑ 220</td>
                    <td className="p-2 text-slate-600 text-xs">—</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Cell Diagnostic Inspector Card */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2 text-xs sm:text-sm">
              <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-bold text-white text-sm">
                  Inspecting Cell ({inspectedCell.r + 1}, {inspectedCell.c + 1}): {matrixData.origins[inspectedCell.r].split('(')[0]} ➔ {matrixData.destinations[inspectedCell.c].split('(')[0]}
                </span>
                <span
                  className={clsx(
                    'px-2.5 py-0.5 rounded text-xs font-mono font-bold border',
                    inspectedCell.isBasic
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                      : inspectedCell.dVal < 0
                      ? 'bg-rose-950 text-rose-300 border-rose-700'
                      : 'bg-slate-900 text-slate-300 border-slate-700'
                  )}
                >
                  {inspectedCell.isBasic ? 'Occupied Basic Cell' : 'Unoccupied Non-Basic Cell'}
                </span>
              </div>

              {inspectedCell.isBasic ? (
                <div className="text-slate-300 flex flex-col space-y-1">
                  <p>• <strong>Allocation Quantity:</strong> {inspectedCell.qty} tons @ ₹{inspectedCell.cost}/ton.</p>
                  <p>• <strong>Basic Equality Check:</strong> u_{inspectedCell.r + 1} + v_{inspectedCell.c + 1} = {inspectedCell.uVal} + {inspectedCell.vVal} = ₹{inspectedCell.shadowSum} == c = ₹{inspectedCell.cost} (Zero Reduced Cost).</p>
                </div>
              ) : (
                <div className="text-slate-300 flex flex-col space-y-1">
                  <p>• <strong>Calculation Breakdown:</strong> d = c - (u + v) = {inspectedCell.cost} - ({inspectedCell.uVal} + {inspectedCell.vVal}) = {inspectedCell.cost} - {inspectedCell.shadowSum} = <strong className={inspectedCell.dVal < 0 ? 'text-rose-400' : 'text-emerald-400'}>{inspectedCell.dVal &ge; 0 ? `+₹${inspectedCell.dVal}` : `-₹${Math.abs(inspectedCell.dVal)}`}</strong>.</p>
                  <p>• <strong>Economic Assessment:</strong> {inspectedCell.dVal < 0 ? `Direct rate (₹${inspectedCell.cost}) is ₹${Math.abs(inspectedCell.dVal)} CHEAPER than implied network cost (₹${inspectedCell.shadowSum}). Lucrative candidate!` : `Direct rate (₹${inspectedCell.cost}) is ₹${inspectedCell.dVal} more expensive than network path (₹${inspectedCell.shadowSum}). Keep empty.`}</p>
                  {inspectedCell.isMostNegative && (
                    <p className="text-amber-400 font-bold">⭐ WINNING ENTERING VARIABLE: Cell (2, 1) has the global minimum d = -₹8 and enters the basis on the next pivot!</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* SECTION 3: Economic Sign Meaning */}
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
                The Economic Sign Spectrum of dᵢⱼ
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-rose-800/40 flex flex-col space-y-2">
                <span className="text-rose-300 font-bold">1. dᵢⱼ &lt; 0 (Cost-Reducing)</span>
                <p className="text-slate-300">
                  Direct shipping rate is cheaper than the existing network path. Shifting cargo into this route will <strong>decrease total cost Z</strong> by <span className="font-mono text-rose-400">|dᵢⱼ|</span> Rupees per unit.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-emerald-800/40 flex flex-col space-y-2">
                <span className="text-emerald-300 font-bold">2. dᵢⱼ &gt; 0 (Cost-Increasing)</span>
                <p className="text-slate-300">
                  Direct shipping rate is more expensive than using the current active routes. Activating this route would <strong>increase total cost</strong> by <span className="font-mono text-emerald-400">dᵢⱼ</span> Rupees per unit. Keep empty!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-amber-800/40 flex flex-col space-y-2">
                <span className="text-amber-300 font-bold">3. dᵢⱼ = 0 (Alternative Optima)</span>
                <p className="text-slate-300">
                  Direct rate exactly equals the network shadow cost. Shifting flow into this route leaves total cost <strong>completely unchanged</strong>, providing alternative routing options.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Direct vs Shadow Cost SVG */}
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
                Direct Cost vs. Implied Network Shadow Cost
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 260"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Balance Scale Architecture */}
                <rect x="50" y="40" width="300" height="180" rx="10" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <text x="200" y="75" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">Direct Route c₂₁ = ₹5</text>
                <text x="200" y="110" fill="#cbd5e1" fontSize="11" textAnchor="middle">Actual unit freight rate</text>
                <text x="200" y="140" fill="#a7f3d0" fontSize="11" fontFamily="monospace" textAnchor="middle">c₂₁ = ₹5/ton</text>
                <text x="200" y="180" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">DIRECT IS CHEAPER!</text>

                {/* Subtraction Symbol */}
                <circle cx="370" cy="130" r="18" fill="#475569" />
                <text x="370" y="137" fill="#ffffff" fontSize="20" fontWeight="bold" textAnchor="middle">−</text>

                {/* Shadow Cost Box */}
                <rect x="390" y="40" width="300" height="180" rx="10" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <text x="540" y="75" fill="#f43f5e" fontSize="13" fontWeight="bold" textAnchor="middle">Shadow Cost (u₂ + v₁) = ₹13</text>
                <text x="540" y="110" fill="#cbd5e1" fontSize="11" textAnchor="middle">Implied network cost (5 + 8)</text>
                <text x="540" y="140" fill="#fda4af" fontSize="11" fontFamily="monospace" textAnchor="middle">u₂ + v₁ = ₹13/ton</text>
                <text x="540" y="180" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">d₂₁ = 5 − 13 = −₹8 (Saves ₹8/ton)</text>
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
                Bengal Logistics Opportunity Cost Case Studies
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
                  <p className="text-rose-300 font-semibold">💡 <strong>Operations Takeaway:</strong> {cs.lesson}</p>
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
                  trap: 'Reversing the Subtraction Formula as (u + v) - c',
                  fix: 'The formula is strictly d_ij = c_ij - (u_i + v_j). Reversing it flips all negative signs into positive and ruins optimality checks.',
                },
                {
                  trap: 'Calculating Opportunity Costs for Basic Cells',
                  fix: 'Basic cells already satisfy u_i + v_j = c_ij, so their reduced cost is identically 0; evaluate non-basic cells only.',
                },
                {
                  trap: 'Stopping at the First Negative Evaluation Found',
                  fix: 'Evaluate ALL (m-1)(n-1) empty cells to select the MOST negative d_ij, maximizing cost reduction on that pivot.',
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
                  Think about why a negative opportunity cost d_ij = -₹8 is such good news: it proves you just discovered a route that cuts ₹8 off your company's bill for every single ton you transfer into it!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully that in a 3x3 problem there are exactly (3-1)(3-1) = 4 empty cells. Evaluating all 4 takes less than 30 seconds with simple mental subtraction!
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
                Student Revision Checklist (Topic 3)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Memorized the exact formula: d_ij = c_ij - (u_i + v_j)',
                'Calculated d_ij for all (m - 1)(n - 1) non-basic cells',
                'Interpreted d_ij &gt; 0 (keep empty), d_ij = 0 (alt optima), d_ij < 0 (pivot candidate)',
                'Selected entering variable as argmin { d_ij | d_ij < 0 }',
                'Handled double negative arithmetic safely with parentheses',
                'Verified that for basic cells, c_ij - (u_i + v_j) = 0',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: calculating opportunity costs is like turning on the radar screen of your supply chain! Each empty cell has an opportunity cost dᵢⱼ = cᵢⱼ - (uᵢ + vⱼ). If you see a positive number like +₹7, that route is too expensive; let it sleep. But when you spot a negative number like -₹8, your eyes should light up—that is pure profit waiting to be unlocked! Always write your sum (uᵢ + vⱼ) inside parentheses first, and select the most negative value as your entering champion."
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Calculating Opportunity Costs FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Calculating Opportunity Costs (MODI Method)"
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
