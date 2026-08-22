// src/components/study/quantitative-analysis/topics/002_004_vogel-approximation-method/Topic1.jsx
// React 19 Function-based Component
// Module: 002_004_vogel-approximation-method
// Topic 1: Row and column penalties

import React, { useState, useEffect, useRef, useMemo } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic1_files/topic1_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic1_files/topic1_note.txt?raw';

const Topic1 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [interactivePresetIdx, setInteractivePresetIdx] = useState(0);
  const [activeDirection, setActiveDirection] = useState('both'); // 'row', 'col', 'both'
  const [highlightedRowIdx, setHighlightedRowIdx] = useState(null);
  const [highlightedColIdx, setHighlightedColIdx] = useState(null);

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

  // Presets for interactive matrix explorer
  const presets = [
    {
      name: 'Preset 1: Heavy Foundry Freight (Barrackpore, Ichapur, Kolkata)',
      origins: ['Barrackpore Heavy (S1)', 'Ichapur Casting (S2)', 'Kolkata Depot (S3)'],
      destinations: ['Jadavpur Works (D1)', 'Salt Lake Hub (D2)', 'Howrah Rail (D3)'],
      supplies: [70, 90, 60],
      demands: [60, 80, 80],
      matrix: [
        [8, 14, 12],
        [5, 19, 10],
        [11, 13, 7],
      ],
    },
    {
      name: 'Preset 2: Cold-Chain Pharmaceuticals (Kolkata & Barrackpore)',
      origins: ['Central Cold Bio (S1)', 'Barrackpore Depot (S2)'],
      destinations: ['Howrah Hospital (D1)', 'Barasat Health (D2)', 'Jadavpur Hub (D3)'],
      supplies: [80, 100],
      demands: [60, 70, 50],
      matrix: [
        [6, 18, 9],
        [4, 25, 15],
      ],
    },
    {
      name: 'Preset 3: FMCG Supermarket Tie-Break Scenario',
      origins: ['Barrackpore FMCG (S1)', 'Ichapur Hub (S2)', 'Kolkata Mart (S3)'],
      destinations: ['Shyambazar (D1)', 'Salt Lake V (D2)', 'Gariahat (D3)'],
      supplies: [50, 60, 40],
      demands: [40, 60, 50],
      matrix: [
        [4, 9, 11],
        [7, 5, 8],
        [6, 7, 3],
      ],
    },
  ];

  const currentPreset = presets[interactivePresetIdx];

  // Helper function to calculate row and column penalties
  const calculations = useMemo(() => {
    const mat = currentPreset.matrix;
    const rowDetails = mat.map((row, rIdx) => {
      const indexed = row.map((cost, cIdx) => ({ cost, cIdx }));
      indexed.sort((a, b) => a.cost - b.cost);
      const min1 = indexed[0];
      const min2 = indexed.length > 1 ? indexed[1] : indexed[0];
      return {
        rIdx,
        originName: currentPreset.origins[rIdx],
        costs: row,
        min1Cost: min1.cost,
        min1Col: min1.cIdx,
        min2Cost: min2.cost,
        min2Col: min2.cIdx,
        penalty: min2.cost - min1.cost,
      };
    });

    const numCols = mat[0].length;
    const colDetails = [];
    for (let c = 0; c < numCols; c++) {
      const colValues = mat.map((r, rIdx) => ({ cost: r[c], rIdx }));
      colValues.sort((a, b) => a.cost - b.cost);
      const min1 = colValues[0];
      const min2 = colValues.length > 1 ? colValues[1] : colValues[0];
      colDetails.push({
        cIdx: c,
        destName: currentPreset.destinations[c],
        costs: mat.map((r) => r[c]),
        min1Cost: min1.cost,
        min1Row: min1.rIdx,
        min2Cost: min2.cost,
        min2Row: min2.rIdx,
        penalty: min2.cost - min1.cost,
      });
    }

    let globalMaxP = -1;
    let winningType = null;
    let winningIdx = -1;

    rowDetails.forEach((rd) => {
      if (rd.penalty > globalMaxP) {
        globalMaxP = rd.penalty;
        winningType = 'row';
        winningIdx = rd.rIdx;
      }
    });

    colDetails.forEach((cd) => {
      if (cd.penalty > globalMaxP) {
        globalMaxP = cd.penalty;
        winningType = 'col';
        winningIdx = cd.cIdx;
      }
    });

    return { rowDetails, colDetails, globalMaxP, winningType, winningIdx };
  }, [currentPreset]);

  // Case Studies Data
  const caseStudies = [
    {
      title: '1. Precision Foundry Supply (Ichapur to Kolkata & Jadavpur)',
      lead: 'Debangshu (Logistics Operations Lead)',
      desc: 'Demonstrates horizontal supplier penalties versus vertical buyer penalties. Row 2 (Ichapur) has P = ₹5, but Column 2 (Salt Lake) has P = ₹1, showing high supplier regret and low buyer regret.',
      alloc: 'Allocate 60 tons from Ichapur (S2) to Jadavpur (D1) @ ₹5/ton, exhausting D1 demand completely.',
      savings: 'Locks in the ₹5 route, preventing Jadavpur from receiving Barrackpore steel at ₹8 or Kolkata steel at ₹11.',
    },
    {
      title: '2. Greater Kolkata Vaccine Distribution (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Row 2 (Barrackpore Bio-Depot) exhibits an acute penalty of P = ₹11 (₹15 - ₹4). Meanwhile, Column 1 (Howrah) has P = ₹2. Symmetrically comparing both ensures the urgent ₹11 row is serviced first.',
      alloc: 'Allocate 60 boxes from Barrackpore (S2) to Howrah (D1) @ ₹4/box.',
      savings: 'Saves 60 × ₹11 = ₹660 in potential diversion penalty compared to letting Row 2 overflow onto its ₹25 route.',
    },
    {
      title: '3. Supermarket FMCG Tie-Break Protocol (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Row 1 (Barrackpore) and Column 3 (Gariahat) are TIED at maximum penalty P = ₹5. The tie-breaker inspects min cell: Column 3 has cell (S3, D3) @ ₹3, while Row 1 has cell (S1, D1) @ ₹4. Since ₹3 < ₹4, Column 3 wins.',
      alloc: 'Allocate 40 pallets to (S3, D3) @ ₹3/pallet, exhausting Kolkata depot inventory.',
      savings: 'Resolving the tie via lowest unit cost directly captures the cheapest available rate in the entire matrix.',
    },
    {
      title: '4. Higher Education Paper & Press Network (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Tracks multi-pass penalty recalculation. Once Column 1 is eliminated in Pass 1, remaining column penalties dynamically shift from ₹1 to ₹8, driving Pass 2 decisions with high precision.',
      alloc: 'Demonstrates dynamic margin tracking across Iterations 1, 2, and 3.',
      savings: 'Guarantees the initial feasible solution matches the global optimal LP solution on Step 1.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Inline Scoped Keyframes */}
      <style>{`
        @keyframes pulseBorder {
          0%, 100% { border-color: rgba(56, 189, 248, 0.4); }
          50% { border-color: rgba(56, 189, 248, 0.9); }
        }
        .animate-border-pulse {
          animation: pulseBorder 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
              Module 002_004 • Topic 1
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-cyan-950/80 text-cyan-400 border border-cyan-800/60">
              Directional Regret Dynamics
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Row and Column Penalties
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive investigation into <span className="text-cyan-400 font-semibold">Row Penalties (Pᵢ)</span> and <span className="text-emerald-400 font-semibold">Column Penalties (Pⱼ)</span>. Learn how horizontal supplier regret interacts with vertical buyer regret, how margin annotations are maintained in standard tableaus, and how to execute rapid, error-free penalty calculations.
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'definition', label: '1. Directional Concept' },
              { id: 'math-rules', label: '2. Calculation Rules' },
              { id: 'interactive', label: '3. Interactive Directional Engine' },
              { id: 'margin-notation', label: '4. Margin Layout & Notation' },
              { id: 'svg-diagram', label: '5. Directional Matrix SVG' },
              { id: 'case-studies', label: '6. Bengal Case Studies' },
              { id: 'tie-breaking', label: '7. Tie-Breaking Protocol' },
              { id: 'pitfalls', label: '8. Common Pitfalls' },
              { id: 'hints', label: '9. Guided Hints' },
              { id: 'checklist', label: '10. Revision Checklist' },
            ].map((item, idx) => (
              <button
                key={item.id}
                onClick={() => {
                  sectionRefs.current[idx]?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={clsx(
                  'px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 border',
                  activeSection === idx
                    ? 'bg-cyan-600 text-white border-cyan-500 shadow-md shadow-cyan-900/40'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </header>

        {/* SECTION 1: Directional Concept */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-600/20 text-cyan-400 font-bold text-sm">
                01
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Directional Regret: Supplier Regret vs. Buyer Regret
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              In transportation networks, linear constraints operate symmetrically across supply origins and demand destinations. VAM models this bidirectional tension by calculating two separate sets of penalties:
            </p>

            <div className="flex flex-col space-y-4">
              {/* Row Penalty Card */}
              <div className="p-5 rounded-xl bg-slate-800/50 border border-cyan-800/40 flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-cyan-300 font-bold text-base flex items-center gap-2">
                    <span>➡️</span> Row Penalty (Pᵢ) — Horizontal Supplier Regret
                  </span>
                  <span className="px-2.5 py-0.5 rounded text-xs font-mono bg-cyan-950 text-cyan-400 border border-cyan-800">
                    Horizontal Scan (Across Columns)
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300">
                  Evaluated across a single origin factory (e.g. Barrackpore or Ichapur). Measures how much extra freight cost the <strong>supplier</strong> incurs if their inventory cannot be shipped to their cheapest customer destination and must be diverted to their second-cheapest customer.
                </p>
                <div className="p-2.5 bg-slate-950 rounded font-mono text-xs text-cyan-300">
                  Pᵢ = c_(i, 2nd smallest) - c_(i, 1st smallest)
                </div>
              </div>

              {/* Column Penalty Card */}
              <div className="p-5 rounded-xl bg-slate-800/50 border border-emerald-800/40 flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-emerald-300 font-bold text-base flex items-center gap-2">
                    <span>⬇️</span> Column Penalty (Pⱼ) — Vertical Buyer Regret
                  </span>
                  <span className="px-2.5 py-0.5 rounded text-xs font-mono bg-emerald-950 text-emerald-400 border border-emerald-800">
                    Vertical Scan (Down Rows)
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300">
                  Evaluated down a single destination market (e.g. Jadavpur or Salt Lake). Measures how much extra freight cost the <strong>buyer</strong> must absorb if their demand cannot be supplied by their cheapest factory and must be drawn from their second-cheapest factory.
                </p>
                <div className="p-2.5 bg-slate-950 rounded font-mono text-xs text-emerald-300">
                  Pⱼ = c_(2nd smallest, j) - c_(1st smallest, j)
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Calculation Rules */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Procedural Rules for Penalty Calculation
              </h2>
            </div>

            <div className="flex flex-col space-y-3">
              {[
                {
                  rule: 'Rule 1: Ascending Sort Isolation',
                  desc: 'In any row or column vector of size k, identify the two smallest elements: c_(1) <= c_(2). Disregard all elements c_(3), ..., c_(k) for the immediate step.',
                },
                {
                  rule: 'Rule 2: Duplicate Minimums Yield Zero Penalty',
                  desc: 'If the lowest cost appears multiple times in the same line (e.g. [₹6, ₹14, ₹6, ₹20]), then c_(1) = ₹6 and c_(2) = ₹6. Therefore P = ₹6 - ₹6 = ₹0.',
                },
                {
                  rule: 'Rule 3: Single Active Cell Convention',
                  desc: 'If only one cell remains in a row or column, mark penalty as "—". Allocations to single remaining cells are mandatory to satisfy final balance equations.',
                },
                {
                  rule: 'Rule 4: Symmetry of Evaluation',
                  desc: 'In an m × n matrix, exactly m row penalties and n column penalties must be evaluated in Tableau 1, giving m + n total opportunity cost indicators.',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1 hover:bg-slate-800/70 transition-colors"
                >
                  <span className="text-cyan-300 font-semibold text-sm">{item.rule}</span>
                  <p className="text-xs sm:text-sm text-slate-300">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: Interactive Directional Engine */}
        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          data-index="2"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 animate-border-pulse">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-600/20 text-cyan-400 font-bold text-sm">
                  03
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Interactive Directional Penalty Explorer
                </h2>
              </div>
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                <button
                  onClick={() => setActiveDirection('row')}
                  className={clsx(
                    'px-2.5 py-1 rounded text-xs font-semibold transition-all',
                    activeDirection === 'row' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
                  )}
                >
                  Rows Only (➡️)
                </button>
                <button
                  onClick={() => setActiveDirection('col')}
                  className={clsx(
                    'px-2.5 py-1 rounded text-xs font-semibold transition-all',
                    activeDirection === 'col' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                  )}
                >
                  Cols Only (⬇️)
                </button>
                <button
                  onClick={() => setActiveDirection('both')}
                  className={clsx(
                    'px-2.5 py-1 rounded text-xs font-semibold transition-all',
                    activeDirection === 'both' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                  )}
                >
                  Both (Symmetric)
                </button>
              </div>
            </div>

            {/* Preset Selector */}
            <div className="flex flex-wrap gap-2">
              {presets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInteractivePresetIdx(idx);
                    setHighlightedRowIdx(null);
                    setHighlightedColIdx(null);
                  }}
                  className={clsx(
                    'px-3.5 py-2 rounded-lg text-xs font-semibold transition-all border text-left',
                    interactivePresetIdx === idx
                      ? 'bg-cyan-600 text-white border-cyan-400 shadow-md'
                      : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
                  )}
                >
                  {preset.name}
                </button>
              ))}
            </div>

            {/* Tableau Display */}
            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-4">
              <table className="w-full text-center border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2 text-left font-semibold text-slate-300">Origins \ Dests</th>
                    {currentPreset.destinations.map((d, dIdx) => (
                      <th
                        key={dIdx}
                        onClick={() => setHighlightedColIdx(highlightedColIdx === dIdx ? null : dIdx)}
                        className={clsx(
                          'p-2 font-semibold cursor-pointer transition-colors',
                          highlightedColIdx === dIdx
                            ? 'text-emerald-300 bg-emerald-950/50 rounded-t'
                            : 'text-cyan-300 hover:text-white'
                        )}
                      >
                        {d} ⬇️
                      </th>
                    ))}
                    <th className="p-2 font-semibold text-amber-300">Supply</th>
                    {(activeDirection === 'row' || activeDirection === 'both') && (
                      <th className="p-2 font-bold text-cyan-400 bg-cyan-950/30 border-l border-slate-800">
                        Row Penalty (Pᵢ)
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {currentPreset.matrix.map((row, rIdx) => {
                    const rd = calculations.rowDetails[rIdx];
                    const isWinningRow = calculations.winningType === 'row' && calculations.winningIdx === rIdx;

                    return (
                      <tr
                        key={rIdx}
                        onClick={() => setHighlightedRowIdx(highlightedRowIdx === rIdx ? null : rIdx)}
                        className={clsx(
                          'border-b border-slate-800/60 cursor-pointer transition-colors',
                          highlightedRowIdx === rIdx
                            ? 'bg-cyan-950/40'
                            : isWinningRow
                            ? 'bg-emerald-950/20'
                            : 'hover:bg-slate-900/50'
                        )}
                      >
                        <td className="p-2.5 text-left font-medium text-slate-200 flex items-center gap-1.5">
                          {isWinningRow && <span className="text-emerald-400 text-xs">⭐</span>}
                          {currentPreset.origins[rIdx]} ➡️
                        </td>
                        {row.map((cost, cIdx) => {
                          const isMin1Row = rd.min1Col === cIdx;
                          const isMin2Row = rd.min2Col === cIdx;
                          const cd = calculations.colDetails[cIdx];
                          const isMin1Col = cd.min1Row === rIdx;
                          const isTarget =
                            (isWinningRow && isMin1Row) ||
                            (calculations.winningType === 'col' && calculations.winningIdx === cIdx && isMin1Col);

                          return (
                            <td key={cIdx} className="p-2">
                              <div
                                className={clsx(
                                  'p-2 rounded-lg font-mono font-bold transition-all border text-center',
                                  isTarget
                                    ? 'bg-emerald-500 text-slate-950 border-emerald-300 scale-105 shadow-md shadow-emerald-900/50'
                                    : isMin1Row && (activeDirection === 'row' || activeDirection === 'both')
                                    ? 'bg-cyan-950/80 text-cyan-300 border-cyan-700/60'
                                    : isMin2Row && (activeDirection === 'row' || activeDirection === 'both')
                                    ? 'bg-slate-800 text-slate-300 border-slate-700'
                                    : 'bg-slate-900 text-slate-400 border-slate-800'
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
                        {(activeDirection === 'row' || activeDirection === 'both') && (
                          <td
                            className={clsx(
                              'p-2 font-mono font-bold border-l border-slate-800',
                              isWinningRow ? 'text-emerald-300 bg-emerald-950/40 text-sm' : 'text-slate-300'
                            )}
                          >
                            <div className="flex flex-col items-center">
                              <span>₹{rd.penalty}</span>
                              <span className="text-[10px] text-slate-400 font-normal">
                                ({rd.min2Cost} - {rd.min1Cost})
                              </span>
                            </div>
                          </td>
                        )}
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
                    {(activeDirection === 'row' || activeDirection === 'both') && (
                      <td className="p-2 text-slate-600 text-xs border-l border-slate-800">—</td>
                    )}
                  </tr>

                  {/* Column Penalty Row */}
                  {(activeDirection === 'col' || activeDirection === 'both') && (
                    <tr className="bg-emerald-950/20 text-emerald-300 font-mono font-bold">
                      <td className="p-2.5 text-left text-emerald-400 font-bold">
                        Col Penalty (Pⱼ)
                      </td>
                      {calculations.colDetails.map((cd, cIdx) => {
                        const isWinningCol = calculations.winningType === 'col' && calculations.winningIdx === cIdx;
                        return (
                          <td
                            key={cIdx}
                            className={clsx(
                              'p-2 text-center border-t border-slate-800',
                              isWinningCol ? 'bg-emerald-900/40 text-emerald-200 text-sm font-extrabold' : 'text-slate-300'
                            )}
                          >
                            <div className="flex flex-col items-center">
                              <span>₹{cd.penalty}</span>
                              <span className="text-[10px] text-slate-400 font-normal">
                                ({cd.min2Cost} - {cd.min1Cost})
                              </span>
                            </div>
                          </td>
                        );
                      })}
                      <td className="p-2 text-slate-600 text-xs">—</td>
                      {(activeDirection === 'row' || activeDirection === 'both') && (
                        <td className="p-2 text-emerald-400 font-bold text-xs bg-emerald-950/50 border-l border-slate-800">
                          MAX = ₹{calculations.globalMaxP}
                        </td>
                      )}
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Active Calculation Audit Trail */}
            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-2 text-xs sm:text-sm">
              <span className="text-cyan-300 font-semibold flex items-center gap-2">
                <span>🔍</span> Directional Scan Inspection:
              </span>
              <p className="text-slate-300">
                • <strong>Global Max Penalty:</strong> <span className="font-mono text-emerald-400 font-bold">₹{calculations.globalMaxP}</span> located at <span className="text-white font-semibold">{calculations.winningType === 'row' ? `Row ${calculations.winningIdx + 1}` : `Column ${calculations.winningIdx + 1}`}</span>.
              </p>
              <p className="text-slate-300">
                • <strong>Allocation Cell:</strong> Inside {calculations.winningType === 'row' ? `Row ${calculations.winningIdx + 1}` : `Column ${calculations.winningIdx + 1}`}, the cell with the absolute lowest unit cost is highlighted in <span className="text-emerald-400 font-bold">bright green</span>.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Margin Notation & Examination Layout */}
        <section
          ref={(el) => (sectionRefs.current[3] = el)}
          data-index="3"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-violet-600/20 text-violet-400 font-bold text-sm">
                04
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Standard Examination Margin Layout & Annotation Rules
              </h2>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              When solving VAM problems on paper or in technical reports, professional clarity is maintained by following standard marginal indexing:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-2">
                <span className="text-violet-300 font-semibold">1. Right-Margin Column Headers</span>
                <p className="text-slate-300">
                  Label consecutive penalty passes as <span className="font-mono text-cyan-300">P_R(1)</span>, <span className="font-mono text-cyan-300">P_R(2)</span>, <span className="font-mono text-cyan-300">P_R(3)</span>. When Row k is exhausted, place a dashed line <span className="font-mono text-slate-500">—</span> in all subsequent columns for Row k.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-2">
                <span className="text-emerald-300 font-semibold">2. Bottom-Margin Row Headers</span>
                <p className="text-slate-300">
                  Label consecutive column penalty passes as <span className="font-mono text-emerald-300">P_C(1)</span>, <span className="font-mono text-emerald-300">P_C(2)</span>, <span className="font-mono text-emerald-300">P_C(3)</span>. When Column l is satisfied, place <span className="font-mono text-slate-500">—</span> across that column in subsequent rows.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Directional Matrix SVG Illustration */}
        <section
          ref={(el) => (sectionRefs.current[4] = el)}
          data-index="4"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-600/20 text-teal-400 font-bold text-sm">
                05
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Directional Regret Geometry & Scanning Vectors
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 760 360"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                <defs>
                  <linearGradient id="rowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0284c7" />
                    <stop offset="100%" stopColor="#38bdf8" />
                  </linearGradient>
                  <linearGradient id="colGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#059669" />
                    <stop offset="100%" stopColor="#34d399" />
                  </linearGradient>
                </defs>

                {/* Matrix Background Grid */}
                <rect x="140" y="70" width="380" height="180" rx="10" fill="#1e293b" stroke="#334155" strokeWidth="2" />
                
                {/* Horizontal Scan Vector (Row) */}
                <line x1="60" y1="120" x2="590" y2="120" stroke="url(#rowGrad)" strokeWidth="3" strokeDasharray="6 4">
                  <animate attributeName="stroke-dashoffset" values="20;0" dur="1.5s" repeatCount="indefinite" />
                </line>
                <polygon points="590,120 580,114 580,126" fill="#38bdf8" />
                <rect x="600" y="100" width="130" height="40" rx="8" fill="#0c4a6e" stroke="#0284c7" />
                <text x="665" y="125" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">
                  Row Penalty Pᵢ
                </text>

                {/* Vertical Scan Vector (Column) */}
                <line x1="330" y1="20" x2="330" y2="300" stroke="url(#colGrad)" strokeWidth="3" strokeDasharray="6 4">
                  <animate attributeName="stroke-dashoffset" values="20;0" dur="1.5s" repeatCount="indefinite" />
                </line>
                <polygon points="330,300 324,290 336,290" fill="#34d399" />
                <rect x="265" y="310" width="130" height="40" rx="8" fill="#064e3b" stroke="#059669" />
                <text x="330" y="335" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">
                  Col Penalty Pⱼ
                </text>

                {/* Matrix Cell Blocks */}
                <rect x="160" y="90" width="100" height="60" rx="6" fill="#0f172a" stroke="#475569" />
                <text x="210" y="125" fill="#cbd5e1" fontSize="12" fontFamily="monospace" textAnchor="middle">c_11</text>

                <rect x="280" y="90" width="100" height="60" rx="6" fill="#0369a1" stroke="#38bdf8" strokeWidth="2" />
                <text x="330" y="125" fill="#ffffff" fontSize="12" fontWeight="bold" fontFamily="monospace" textAnchor="middle">c_12 (Target)</text>

                <rect x="400" y="90" width="100" height="60" rx="6" fill="#0f172a" stroke="#475569" />
                <text x="450" y="125" fill="#cbd5e1" fontSize="12" fontFamily="monospace" textAnchor="middle">c_13</text>

                <rect x="160" y="170" width="100" height="60" rx="6" fill="#0f172a" stroke="#475569" />
                <text x="210" y="205" fill="#cbd5e1" fontSize="12" fontFamily="monospace" textAnchor="middle">c_21</text>

                <rect x="280" y="170" width="100" height="60" rx="6" fill="#0f172a" stroke="#475569" />
                <text x="330" y="205" fill="#cbd5e1" fontSize="12" fontFamily="monospace" textAnchor="middle">c_22</text>

                <rect x="400" y="170" width="100" height="60" rx="6" fill="#0f172a" stroke="#475569" />
                <text x="450" y="205" fill="#cbd5e1" fontSize="12" fontFamily="monospace" textAnchor="middle">c_23</text>
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 6: Real-World Bengal Case Studies */}
        <section
          ref={(el) => (sectionRefs.current[5] = el)}
          data-index="5"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 font-bold text-sm">
                06
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Real-World Bengal Logistics Case Studies
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
                <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-4 text-xs sm:text-sm">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <h3 className="font-bold text-white text-base">{cs.title}</h3>
                    <span className="text-amber-400 font-mono">{cs.lead}</span>
                  </div>
                  <p className="text-slate-300">{cs.desc}</p>
                  <div className="p-3 bg-slate-900 rounded-lg flex flex-col space-y-1 border border-slate-800">
                    <span className="text-emerald-400 font-semibold">Allocation & Action:</span>
                    <p className="text-slate-300">{cs.alloc}</p>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg flex flex-col space-y-1 border border-slate-800">
                    <span className="text-cyan-400 font-semibold">Regret Savings Achieved:</span>
                    <p className="text-slate-300">{cs.savings}</p>
                  </div>
                </div>
              );
            })()}
          </div>
        </section>

        {/* SECTION 7: Tie-Breaking Hierarchy */}
        <section
          ref={(el) => (sectionRefs.current[6] = el)}
          data-index="6"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-600/20 text-rose-400 font-bold text-sm">
                07
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Tie-Breaking Protocol for Maximum Penalties
              </h2>
            </div>

            <div className="flex flex-col space-y-3">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex items-start space-x-3">
                <span className="text-rose-400 font-bold text-base mt-0.5">1</span>
                <div>
                  <h4 className="text-sm font-semibold text-white">Compare Minimum Unit Costs</h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    If Row 1 and Column 3 both share the highest penalty (P = ₹8), locate min(cᵢⱼ) in Row 1 and min(cᵢⱼ) in Column 3. Select the line with the smaller unit rate.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex items-start space-x-3">
                <span className="text-rose-400 font-bold text-base mt-0.5">2</span>
                <div>
                  <h4 className="text-sm font-semibold text-white">Compare Allocation Volume Capacity</h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    If the minimum unit costs are also equal, select the cell that allows the largest allocation quantity <span className="font-mono text-emerald-400">max(min(Sᵢ, Dⱼ))</span>.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex items-start space-x-3">
                <span className="text-rose-400 font-bold text-base mt-0.5">3</span>
                <div>
                  <h4 className="text-sm font-semibold text-white">Arbitrary Selection</h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    If minimum cost and allocation quantity are both identical, select arbitrarily. Feasibility and near-optimality are mathematically preserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: Common Pitfalls */}
        <section
          ref={(el) => (sectionRefs.current[7] = el)}
          data-index="7"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 font-bold text-sm">
                08
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Common Beginner Mistakes
              </h2>
            </div>

            <div className="flex flex-col space-y-2.5">
              {[
                {
                  trap: 'Diagonal Subtractions',
                  fix: 'Never calculate differences across diagonal cells. Rows are strictly horizontal; columns are strictly vertical.',
                },
                {
                  trap: 'Forgetting Old Cell Cross-Outs',
                  fix: 'When Row k is crossed out, remove its entries from all columns before finding the new 1st and 2nd minimums.',
                },
                {
                  trap: 'Overlooking Duplicate Minimums',
                  fix: 'In [₹7, ₹7, ₹15], the penalty is ₹7 - ₹7 = ₹0, NOT ₹15 - ₹7 = ₹8.',
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

        {/* SECTION 9: Guided Hints */}
        <section
          ref={(el) => (sectionRefs.current[8] = el)}
          data-index="8"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 font-bold text-sm">
                09
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Guided Hints for Directional Mastery
              </h2>
            </div>

            <div className="flex flex-col space-y-3">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-amber-300 font-semibold text-sm">💡 Think about…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Think about why an origin with supply 10 units but penalty ₹40/unit takes priority over an origin with supply 500 units but penalty ₹1/unit.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully that when only one row remains in the sub-matrix, all column penalties become undefined (—) because there are no second choices left.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 10: Revision Checklist */}
        <section
          ref={(el) => (sectionRefs.current[9] = el)}
          data-index="9"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                10
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Student Revision Checklist (Topic 1)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Row penalties computed horizontally across active columns',
                'Column penalties computed vertically across active rows',
                'All penalties confirmed non-negative (P >= 0)',
                'Duplicate minimum entries assigned penalty of 0',
                'Global maximum penalty selected from combined row and column lists',
                'Tie-breaking hierarchy applied if multiple lines share max penalty',
                'Target cell identified as cheapest route inside the winning line',
                'Exhausted line crossed out and penalties refreshed for next pass',
              ].map((text, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-800/40 border border-slate-700/60 flex items-center space-x-3">
                  <span className="text-emerald-400">✅</span>
                  <span className="text-xs sm:text-sm text-slate-300">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 11: Teacher's Note */}
        <section className="flex flex-col space-y-6">
          <Teacher
            note={
              "In our operations research workshops in Barrackpore and Kolkata, I remind Debangshu, Susmita, Mamata, Mahima, and Abhronila that row and column penalties are the twin pillars of VAM. A common exam trap is getting hypnotized by row penalties and forgetting to compute column penalties! Always remember: supply origins and destination markets exert equal economic pull. When you maintain neat margin columns P_R(1), P_R(2)... on the right and margin rows P_C(1), P_C(2)... at the bottom, your entire solution becomes self-documenting and foolproof!"
            }
          />
        </section>

        {/* SECTION 12: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Row and Column Penalties FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 13: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Row and Column Penalties (Vogel's Approximation Method)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic2_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic1;
