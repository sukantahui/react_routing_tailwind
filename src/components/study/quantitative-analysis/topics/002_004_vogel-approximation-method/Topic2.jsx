// src/components/study/quantitative-analysis/topics/002_004_vogel-approximation-method/Topic2.jsx
// React 19 Function-based Component
// Module: 002_004_vogel-approximation-method
// Topic 2: Selecting the highest penalty

import React, { useState, useEffect, useRef, useMemo } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic2_files/topic2_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic2_files/topic2_note.txt?raw';

const Topic2 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [interactivePresetIdx, setInteractivePresetIdx] = useState(0);
  const [showTieDetail, setShowTieDetail] = useState(false);

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

  // Presets demonstrating clear winners, row-column ties, and multi-tier tie-breaking
  const presets = [
    {
      name: 'Preset 1: Clear Unambiguous Winner (High-Hazard Line)',
      origins: ['Barrackpore Yard (S1)', 'Ichapur Works (S2)', 'Kolkata Depot (S3)'],
      destinations: ['Jadavpur (D1)', 'Salt Lake (D2)', 'Howrah (D3)'],
      supplies: [60, 90, 50],
      demands: [50, 80, 70],
      matrix: [
        [7, 18, 11],
        [4, 26, 16],
        [9, 12, 5],
      ],
      description: 'Row 2 exhibits a massive penalty P = ₹12 (₹16 - ₹4), clearly dominating all other row and column penalties.',
    },
    {
      name: 'Preset 2: Cross-Tie (Row 2 vs Column 2 at Penalty = ₹5)',
      origins: ['Barrackpore Heavy (S1)', 'Ichapur Casting (S2)'],
      destinations: ['Jadavpur Works (D1)', 'Salt Lake Hub (D2)', 'Howrah Rail (D3)'],
      supplies: [70, 90],
      demands: [60, 80, 20],
      matrix: [
        [8, 14, 12],
        [5, 19, 10],
      ],
      description: 'Row 2 (P = ₹5, min cost ₹5) is tied with Column 2 (P = ₹5, min cost ₹14). Tier 1 tie-breaker chooses Row 2 because ₹5 < ₹14.',
    },
    {
      name: 'Preset 3: Volume Tie-Break (Equal Penalty & Equal Min Cost)',
      origins: ['Depot North (S1)', 'Depot South (S2)'],
      destinations: ['Market East (D1)', 'Market West (D2)'],
      supplies: [80, 30],
      demands: [50, 60],
      matrix: [
        [3, 9],
        [3, 9],
      ],
      description: 'Both rows have P = ₹6 and both have min cost ₹3. Row 1 has supply 80 (volume = 50) while Row 2 has supply 30 (volume = 30). Tier 2 picks Row 1.',
    },
  ];

  const currentPreset = presets[interactivePresetIdx];

  // Live penalty calculation and winner identification
  const calcData = useMemo(() => {
    const mat = currentPreset.matrix;
    const rowPens = mat.map((row, rIdx) => {
      const sorted = [...row].sort((a, b) => a - b);
      const min1 = sorted[0];
      const min2 = sorted.length > 1 ? sorted[1] : sorted[0];
      return {
        rIdx,
        originName: currentPreset.origins[rIdx],
        min1,
        min2,
        penalty: min2 - min1,
        minColIdx: row.indexOf(min1),
      };
    });

    const numCols = mat[0].length;
    const colPens = [];
    for (let c = 0; c < numCols; c++) {
      const colValues = mat.map((r) => r[c]);
      const sorted = [...colValues].sort((a, b) => a - b);
      const min1 = sorted[0];
      const min2 = sorted.length > 1 ? sorted[1] : sorted[0];
      colPens.push({
        cIdx: c,
        destName: currentPreset.destinations[c],
        min1,
        min2,
        penalty: min2 - min1,
        minRowIdx: colValues.indexOf(min1),
      });
    }

    // Find all max penalty lines
    let maxVal = -1;
    rowPens.forEach((rp) => {
      if (rp.penalty > maxVal) maxVal = rp.penalty;
    });
    colPens.forEach((cp) => {
      if (cp.penalty > maxVal) maxVal = cp.penalty;
    });

    const tiedCandidates = [];
    rowPens.forEach((rp) => {
      if (rp.penalty === maxVal) {
        tiedCandidates.push({ type: 'row', idx: rp.rIdx, name: rp.originName, minCost: rp.min1, penalty: rp.penalty });
      }
    });
    colPens.forEach((cp) => {
      if (cp.penalty === maxVal) {
        tiedCandidates.push({ type: 'col', idx: cp.cIdx, name: cp.destName, minCost: cp.min1, penalty: cp.penalty });
      }
    });

    // Apply Tier 1 tie-breaker (lowest unit cost)
    let winner = tiedCandidates[0];
    for (let i = 1; i < tiedCandidates.length; i++) {
      if (tiedCandidates[i].minCost < winner.minCost) {
        winner = tiedCandidates[i];
      }
    }

    return { rowPens, colPens, maxVal, tiedCandidates, winner };
  }, [currentPreset]);

  // Case Studies
  const caseStudies = [
    {
      title: '1. Precision Foundry Supply (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      situation: 'Row 2 (Ichapur) and Column 2 (Salt Lake) tie at maximum penalty P = ₹5.',
      tieBreak: 'Row 2 has minimum cost ₹5 in cell (S2, D1). Column 2 has minimum cost ₹14 in cell (S1, D2). Under Tier 1, Row 2 wins because ₹5 < ₹14.',
      outcome: 'Allocates 60 tons to (S2, D1) @ ₹5/ton, securing the best rate and exhausting Jadavpur demand completely.',
    },
    {
      title: '2. Greater Kolkata Vaccine Distribution (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Chain Directors)',
      situation: 'Row 2 (Barrackpore Bio-Depot) is the clear winner with P = ₹11 (₹15 - ₹4), leaving other lines behind (P_R1 = ₹3, P_C1 = ₹2, P_C2 = ₹7, P_C3 = ₹6).',
      tieBreak: 'No tie-breaking needed. Row 2 is unequivocally selected.',
      outcome: 'Allocates 60 boxes to cell (S2, D1) @ ₹4/box, avoiding a potential ₹11/box regret cost.',
    },
    {
      title: '3. Supermarket FMCG Tie-Break Protocol (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      situation: 'Row 1 (Barrackpore) and Column 3 (Gariahat) share max penalty P = ₹5.',
      tieBreak: 'Column 3 has min cost ₹3 in cell (S3, D3); Row 1 has min cost ₹4 in cell (S1, D1). Column 3 wins by Tier 1 rule (₹3 < ₹4).',
      outcome: 'Allocates 40 pallets to (S3, D3) @ ₹3/pallet, exhausting Kolkata depot inventory.',
    },
    {
      title: '4. Higher Education Paper & Press Network (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      situation: 'Multi-pass selection tracking across iterations 1, 2, and 3.',
      tieBreak: 'Demonstrates how circling winning penalties creates a clear audit trail for students and examiners.',
      outcome: 'Produces an initial basic feasible solution that matches global optimality directly.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes targetGlow {
          0%, 100% { box-shadow: 0 0 10px rgba(16, 185, 129, 0.3); }
          50% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.7); }
        }
        .glow-target {
          animation: targetGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
              Module 002_004 • Topic 2
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-cyan-950/80 text-cyan-400 border border-cyan-800/60">
              Regret Maximization & Tie-Breaking
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Selecting the Highest Penalty
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            Mastering the critical decision stage of Vogel's Approximation Method: identifying the <span className="text-emerald-400 font-semibold">Maximum Penalty Line</span>, applying the <span className="text-cyan-400 font-semibold">Three-Tier Tie-Breaking Hierarchy</span>, and targeting the lowest unit cost cell inside the winning line.
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'rationale', label: '1. Why Highest Penalty?' },
              { id: 'tie-break-rules', label: '2. Tie-Breaking Hierarchy' },
              { id: 'interactive', label: '3. Interactive Selection Simulator' },
              { id: 'decision-svg', label: '4. Decision Flowchart SVG' },
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

        {/* SECTION 1: Why Highest Penalty? */}
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
                The Decision Principle: Why Select the Highest Penalty?
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Once all row penalties <span className="font-mono text-cyan-300">&#123;P₁, ..., P_m&#125;</span> and all column penalties <span className="font-mono text-emerald-300">&#123;P₁, ..., P_n&#125;</span> have been evaluated, VAM compares all <span className="font-mono">m + n</span> values to find the global maximum:
            </p>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-2">
              <span className="text-amber-400 font-mono font-bold text-sm sm:text-base">
                Winning Line L* = argmax &#123; P₁, P₂, ..., P_m, P₁, P₂, ..., P_n &#125;
              </span>
              <p className="text-xs text-slate-400">
                The winning line represents the route with the highest financial vulnerability. Servicing this line immediately prevents its capacity from being locked into an exorbitant secondary rate.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/60 flex items-start space-x-3">
              <span className="text-emerald-400 text-xl font-bold">⭐</span>
              <div className="text-xs sm:text-sm text-slate-200">
                <strong>The Golden Rule of VAM:</strong>
                <div className="font-mono font-bold text-emerald-300 mt-1">
                  "Select the HIGHEST penalty to pick the LINE; select the LOWEST cost to pick the CELL."
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Three-Tier Tie-Breaking Hierarchy */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-600/20 text-cyan-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                The Three-Tier Tie-Breaking Protocol
              </h2>
            </div>

            <div className="flex flex-col space-y-3">
              {/* Tier 1 */}
              <div className="p-4 rounded-xl bg-slate-800/40 border border-cyan-800/40 flex flex-col space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-cyan-300 font-bold text-sm sm:text-base">
                    Tier 1: Lowest Unit Cost Priority (c_min)
                  </span>
                  <span className="text-xs px-2 py-0.5 bg-cyan-950 text-cyan-300 rounded border border-cyan-800">
                    Primary Rule
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300">
                  Compare the minimum active unit cost in each tied line. Select the line containing the smallest unit rate <span className="font-mono text-cyan-400">min(cᵢⱼ)</span>.
                </p>
                <div className="p-2 bg-slate-950 rounded text-xs font-mono text-slate-400">
                  Example: Line A (P=₹8, min cell ₹3) vs Line B (P=₹8, min cell ₹5) ➔ Pick Line A.
                </div>
              </div>

              {/* Tier 2 */}
              <div className="p-4 rounded-xl bg-slate-800/40 border border-amber-800/40 flex flex-col space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-amber-300 font-bold text-sm sm:text-base">
                    Tier 2: Maximum Allocation Volume (Volume Advantage)
                  </span>
                  <span className="text-xs px-2 py-0.5 bg-amber-950 text-amber-300 rounded border border-amber-800">
                    Secondary Rule
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300">
                  If minimum unit costs are also identical, evaluate how many units can be allocated <span className="font-mono text-amber-400">min(Supply, Demand)</span>. Select the cell that accommodates the larger batch size.
                </p>
                <div className="p-2 bg-slate-950 rounded text-xs font-mono text-slate-400">
                  Example: Cell A allows 50 units @ ₹3; Cell B allows 20 units @ ₹3 ➔ Pick Cell A.
                </div>
              </div>

              {/* Tier 3 */}
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300 font-bold text-sm sm:text-base">
                    Tier 3: Arbitrary / Positional Selection
                  </span>
                  <span className="text-xs px-2 py-0.5 bg-slate-950 text-slate-400 rounded border border-slate-800">
                    Tertiary Rule
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300">
                  If penalties, minimum unit costs, and allocation quantities are all equal, select arbitrarily. Any choice preserves mathematical feasibility and near-optimality.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Interactive Selection Simulator */}
        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          data-index="2"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-target">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                  03
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Interactive Selection & Tie-Breaker Engine
                </h2>
              </div>
              <span className="text-xs text-emerald-400 font-mono bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
                Live Resolution
              </span>
            </div>

            {/* Presets */}
            <div className="flex flex-wrap gap-2">
              {presets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => setInteractivePresetIdx(idx)}
                  className={clsx(
                    'px-3.5 py-2 rounded-lg text-xs font-semibold transition-all border text-left',
                    interactivePresetIdx === idx
                      ? 'bg-emerald-600 text-white border-emerald-400 shadow-lg'
                      : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
                  )}
                &gt;
                  {preset.name}
                </button>
              ))}
            </div>

            <p className="text-xs text-slate-400 italic">
              {currentPreset.description}
            </p>

            {/* Tableau */}
            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-4">
              <table className="w-full text-center border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2 text-left font-semibold text-slate-300">Origins \ Dests</th>
                    {currentPreset.destinations.map((d, dIdx) => (
                      <th key={dIdx} className="p-2 font-semibold text-cyan-300">
                        {d}
                      </th>
                    ))}
                    <th className="p-2 font-semibold text-amber-300">Supply</th>
                    <th className="p-2 font-bold text-emerald-400 bg-emerald-950/30 border-l border-slate-800">
                      Row Penalty (Pᵢ)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentPreset.matrix.map((row, rIdx) => {
                    const rd = calcData.rowPens[rIdx];
                    const isWinningRow = calcData.winner.type === 'row' && calcData.winner.idx === rIdx;

                    return (
                      <tr
                        key={rIdx}
                        className={clsx(
                          'border-b border-slate-800/60 transition-colors',
                          isWinningRow ? 'bg-emerald-950/30' : 'hover:bg-slate-900/50'
                        )}
                      >
                        <td className="p-2.5 text-left font-medium text-slate-200 flex items-center gap-1.5">
                          {isWinningRow && <span className="text-emerald-400 text-xs">👑</span>}
                          {currentPreset.origins[rIdx]}
                        </td>
                        {row.map((cost, cIdx) => {
                          const isTargetCell =
                            (isWinningRow && rd.minColIdx === cIdx) ||
                            (calcData.winner.type === 'col' && calcData.winner.idx === cIdx && calcData.colPens[cIdx].minRowIdx === rIdx);

                          return (
                            <td key={cIdx} className="p-2">
                              <div
                                className={clsx(
                                  'p-2 rounded-lg font-mono font-bold transition-all border text-center',
                                  isTargetCell
                                    ? 'bg-emerald-500 text-slate-950 border-emerald-300 shadow-md scale-105 font-extrabold'
                                    : 'bg-slate-900 text-slate-300 border-slate-800'
                                )}
                              >
                                ₹{cost}
                              </div>
                            </td>
                          );
                        })}
                        <td className="p-2 font-mono font-semibold text-amber-300">
                          {currentPreset.supplies[rIdx]}
                        </td>
                        <td
                          className={clsx(
                            'p-2 font-mono font-bold border-l border-slate-800',
                            isWinningRow ? 'text-emerald-300 bg-emerald-950/50 text-sm font-extrabold' : 'text-slate-300'
                          )}
                        >
                          ₹{rd.penalty}
                        </td>
                      </tr>
                    );
                  })}

                  {/* Demand Row */}
                  <tr className="border-b border-slate-800 text-slate-300 bg-slate-900/40">
                    <td className="p-2.5 text-left font-semibold text-amber-300">Demand</td>
                    {currentPreset.demands.map((dm, dmIdx) => (
                      <td key={dmIdx} className="p-2 font-mono font-semibold text-amber-300">
                        {dm}
                      </td>
                    ))}
                    <td className="p-2 font-mono font-bold text-slate-400">
                      ∑ {currentPreset.supplies.reduce((a, b) => a + b, 0)}
                    </td>
                    <td className="p-2 text-slate-600 text-xs border-l border-slate-800">—</td>
                  </tr>

                  {/* Column Penalty Row */}
                  <tr className="bg-emerald-950/20 text-emerald-300 font-mono font-bold">
                    <td className="p-2.5 text-left text-emerald-400 font-bold">
                      Col Penalty (Pⱼ)
                    </td>
                    {calcData.colPens.map((cp, cIdx) => {
                      const isWinningCol = calcData.winner.type === 'col' && calcData.winner.idx === cIdx;
                      return (
                        <td
                          key={cIdx}
                          className={clsx(
                            'p-2 text-center border-t border-slate-800',
                            isWinningCol ? 'bg-emerald-900/40 text-emerald-200 text-sm font-extrabold' : 'text-slate-300'
                          )}
                        >
                          ₹{cp.penalty}
                        </td>
                      );
                    })}
                    <td className="p-2 text-slate-600 text-xs">—</td>
                    <td className="p-2 text-emerald-400 font-bold text-xs bg-emerald-950/50 border-l border-slate-800">
                      MAX = ₹{calcData.maxVal}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Winner Details Card */}
            <div className="p-4 rounded-xl bg-slate-800/40 border border-emerald-800/40 flex flex-col space-y-2 text-xs sm:text-sm">
              <span className="text-emerald-300 font-semibold flex items-center gap-2">
                <span>🏆</span> Winning Line Selected:
              </span>
              <p className="text-slate-300">
                • <strong>Chosen Line:</strong> <span className="text-white font-bold">{calcData.winner.type === 'row' ? `Row ${calcData.winner.idx + 1} (${calcData.winner.name})` : `Column ${calcData.winner.idx + 1} (${calcData.winner.name})`}</span> with Maximum Penalty <span className="font-mono text-emerald-400 font-bold">₹{calcData.maxVal}</span>.
              </p>
              {calcData.tiedCandidates.length &gt; 1 && (
                <p className="text-amber-300">
                  • <strong>Tie-Breaking Applied:</strong> {calcData.tiedCandidates.length} lines were tied at ₹{calcData.maxVal}. Selected line offered the lowest unit cost route at <span className="font-mono font-bold">₹{calcData.winner.minCost}/unit</span>.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* SECTION 4: SVG Decision Flowchart */}
        <section
          ref={(el) => (sectionRefs.current[3] = el)}
          data-index="3"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-violet-600/20 text-violet-400 font-bold text-sm">
                04
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Maximum Penalty Selection Flowchart
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 320"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '620px' }}
              >
                <defs>
                  <linearGradient id="flowGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#60a5fa" />
                  </linearGradient>
                  <linearGradient id="flowGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#34d399" />
                  </linearGradient>
                </defs>

                {/* Box 1: Scan all P */}
                <rect x="30" y="50" width="180" height="70" rx="10" fill="#1e293b" stroke="#334155" strokeWidth="2" />
                <text x="120" y="80" fill="#60a5fa" fontSize="12" fontWeight="bold" textAnchor="middle">1. Scan All Penalties</text>
                <text x="120" y="100" fill="#94a3b8" fontSize="10" textAnchor="middle">Compare all Pᵢ and Pⱼ</text>

                {/* Arrow 1 &rarr; 2 */}
                <line x1="210" y1="85" x2="270" y2="85" stroke="#60a5fa" strokeWidth="2" strokeDasharray="4 4" />
                <polygon points="270,85 262,80 262,90" fill="#60a5fa" />

                {/* Box 2: Max Penalty Check */}
                <rect x="280" y="50" width="190" height="70" rx="10" fill="#1e293b" stroke="#334155" strokeWidth="2" />
                <text x="375" y="80" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle">2. Find Max Penalty</text>
                <text x="375" y="100" fill="#cbd5e1" fontSize="10" fontFamily="monospace" textAnchor="middle">Max_P = max(P_all)</text>

                {/* Arrow 2 &rarr; 3 */}
                <line x1="470" y1="85" x2="530" y2="85" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" />
                <polygon points="530,85 522,80 522,90" fill="#f59e0b" />

                {/* Box 3: Tie Check Decision */}
                <polygon points="630,50 710,85 630,120 550,85" fill="#1e293b" stroke="#8b5cf6" strokeWidth="2" />
                <text x="630" y="88" fill="#a78bfa" fontSize="11" fontWeight="bold" textAnchor="middle">Is there a Tie?</text>

                {/* Branch Down: Tie Breaker */}
                <line x1="630" y1="120" x2="630" y2="190" stroke="#8b5cf6" strokeWidth="2" />
                <polygon points="630,190 625,182 635,182" fill="#8b5cf6" />
                <text x="650" y="155" fill="#a78bfa" fontSize="10">Yes</text>

                <rect x="520" y="200" width="220" height="80" rx="10" fill="#0f172a" stroke="#8b5cf6" strokeWidth="2" />
                <text x="630" y="225" fill="#a78bfa" fontSize="11" fontWeight="bold" textAnchor="middle">Tie-Breaker Protocol</text>
                <text x="630" y="245" fill="#94a3b8" fontSize="10" textAnchor="middle">1. Min cost min(cᵢⱼ)</text>
                <text x="630" y="265" fill="#94a3b8" fontSize="10" textAnchor="middle">2. Max volume min(S, D)</text>

                {/* Branch Left: Winning Target */}
                <line x1="520" y1="240" x2="380" y2="240" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" />
                <polygon points="380,240 388,235 388,245" fill="#10b981" />

                <rect x="160" y="200" width="210" height="80" rx="10" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                <text x="265" y="230" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">Target Cell in L*</text>
                <text x="265" y="250" fill="#ffffff" fontSize="11" fontFamily="monospace" textAnchor="middle">Pick min(c_kl) in L*</text>
                <text x="265" y="268" fill="#a7f3d0" fontSize="10" textAnchor="middle">Allocate max feasible units</text>
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
                Bengal Logistics Case Studies
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
                  <p className="text-cyan-300"><strong>Resolution:</strong> {cs.tieBreak}</p>
                  <p className="text-emerald-300"><strong>Outcome:</strong> {cs.outcome}</p>
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
                  trap: 'Allocating to the Maximum Cost Cell in Winning Line',
                  fix: 'Never pick the largest cost. The winning line is chosen by MAX penalty, but the cell is chosen by MIN unit cost.',
                },
                {
                  trap: 'Arbitrary Guessing on Penalty Ties',
                  fix: 'Always check Tier 1 (minimum unit cost) before guessing arbitrarily.',
                },
                {
                  trap: 'Comparing Only Row Penalties',
                  fix: 'Column penalties have equal authority. Always compare all m rows and all n columns together.',
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
                  Think about why a line with high penalty demands immediate action: if you fail to act now, other allocations will eliminate its best cell and impose the regret cost on your final bill.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how Tier 1 tie-breaking seamlessly prioritizes the line that offers the cheapest absolute shipping rate among the tied contenders.
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
                Student Revision Checklist (Topic 2)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Identified global maximum penalty across all active rows and columns',
                'Circled the winning penalty value on working table',
                'Checked Tier 1 (minimum unit cost) if a penalty tie occurred',
                'Checked Tier 2 (maximum allocation volume) if minimum costs were also tied',
                'Located the lowest unit cost cell inside the winning line',
                'Allocated max feasible capacity x = min(Supply, Demand)',
                'Deducted units from row and column balances before crossing out line',
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
              "When Mamata, Mahima, Debangshu, Susmita, and Abhronila practice VAM calculations in my class, the most common hesitation occurs when two rows or columns tie for maximum penalty. I always remind them: do not panic and do not guess blindly! Check the minimum cost in each tied line (Tier 1). The line offering the lower unit rate is your winner. Remember: Max Penalty selects your LINE of action, but Min Unit Cost selects your CELL of allocation!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Selecting the Highest Penalty FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Selecting the Highest Penalty (Vogel's Approximation Method)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic3_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic2;
