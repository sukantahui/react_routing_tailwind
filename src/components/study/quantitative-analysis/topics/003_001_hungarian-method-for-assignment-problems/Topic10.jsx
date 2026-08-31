// src/components/study/quantitative-analysis/topics/003_001_hungarian-method-for-assignment-problems/Topic10.jsx
// React 19 Function-based Component
// Module: 003_001_hungarian-method-for-assignment-problems
// Topic 10: Covering zeros

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic10_files/topic10_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic10_files/topic10_note.txt?raw';

const Topic10 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);

  // Active Line Toggles (Horizontal Rows 0..3, Vertical Cols 0..3)
  const [activeRowLines, setActiveRowLines] = useState([true, true, false, false]); // Rows 0 and 1
  const [activeColLines, setActiveColLines] = useState([false, false, false, true]); // Col 3

  const matrix = [
    [0, 5, 0, 8],
    [1, 0, 0, 4],
    [3, 2, 3, 0],
    [0, 2, 2, 3],
  ];

  const workerNames = ['Debangshu (W1)', 'Susmita (W2)', 'Mamata (W3)', 'Mahima (W4)'];
  const taskNames = ['Job 1', 'Job 2', 'Job 3', 'Job 4'];

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

  const toggleRow = (idx) => {
    const next = [...activeRowLines];
    next[idx] = !next[idx];
    setActiveRowLines(next);
  };

  const toggleCol = (idx) => {
    const next = [...activeColLines];
    next[idx] = !next[idx];
    setActiveColLines(next);
  };

  // Count total lines L
  const totalLines =
    activeRowLines.filter(Boolean).length + activeColLines.filter(Boolean).length;

  // Check if all zeros are covered
  let allZerosCovered = true;
  let uncoveredZerosCount = 0;

  matrix.forEach((row, rIdx) => {
    row.forEach((val, cIdx) => {
      if (val === 0) {
        const isCovered = activeRowLines[rIdx] || activeColLines[cIdx];
        if (!isCovered) {
          allZerosCovered = false;
          uncoveredZerosCount++;
        }
      }
    });
  });

  // Case Studies
  const caseStudies = [
    {
      title: '1. Foundry Line Test Inspection (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Covered a 4x4 matrix in Barrackpore with 3 lines (Row 1, Row 2, Col 4). Because L = 3 < n = 4, he correctly diagnosed that the matrix required 1 additional reduction.',
      lesson: 'König line test mathematically detects whether a matching can be formed or needs more reduction.',
    },
    {
      title: '2. Cold-Chain Vaccine Instant Optimality (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Covered a 4x4 clinic matrix in Kolkata with 4 lines (L = 4 = n), proving instant optimality and eliminating redundant computational iterations.',
      lesson: 'When L = n, you can proceed directly to zero assignment without further matrix modification.',
    },
    {
      title: '3. Supermarket FMCG Tick-Mark Audit (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Applied the formal tick-marking protocol on a complex 5x5 matrix in Ichapur, avoiding the common student mistake of drawing 5 lines when 4 lines were sufficient.',
      lesson: 'Tick-marking guarantees that the line count L is the true mathematical minimum.',
    },
    {
      title: '4. Educational Press Line Verification (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Verified that 3 horizontal lines covered 3 print press rows in Jadavpur, guaranteeing that 3 independent zeros existed for immediate textbook binding allocation.',
      lesson: 'Visual line covering provides clear confirmation of solution optimality.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes coverGlow {
          0%, 100% { border-color: rgba(244, 63, 94, 0.3); }
          50% { border-color: rgba(244, 63, 94, 0.8); }
        }
        .glow-cover {
          animation: coverGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-rose-950/80 text-rose-400 border border-rose-800/60">
              Segment 3 • Module 003_001 • Topic 10
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-rose-950/80 text-rose-400 border border-rose-800/60">
              Step 4 of Hungarian Method • König’s Line Test
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
            Covering Zeros
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            Mastering <span className="text-rose-400 font-semibold">Dénes Kőnig’s 1931 Line Covering Theorem</span>: drawing the <span className="text-amber-400 font-semibold">Minimum Lines (L)</span> to cover all zeros, classifying cells into <span className="text-red-400 font-semibold">Uncovered</span>, <span className="text-amber-300 font-semibold">Single-Covered</span>, and <span className="text-purple-400 font-semibold">Intersection</span> regions, and testing the <span className="text-emerald-400 font-mono">L = n</span> Optimality Criterion.
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'konig-theorem', label: '1. König’s Theorem' },
              { id: 'interactive-visualizer', label: '2. Interactive Line Visualizer' },
              { id: 'three-regions', label: '3. Three Cell Regions' },
              { id: 'svg-diagram', label: '4. Line Covering Theorem SVG' },
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
              >
                {item.label}
              </button>
            ))}
          </div>
        </header>

        {/* SECTION 1: König’s Theorem */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-600/20 text-rose-400 font-bold text-sm">
                01
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Dénes Kőnig’s Bipartite Line Covering Theorem (1931)
              </h2>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-3 text-xs sm:text-sm">
              <span className="text-rose-400 font-bold text-base font-sans">Theorem Statement:</span>
              <p className="text-slate-300 leading-relaxed font-sans">
                "In any binary matrix of zeros and ones, the <strong>MINIMUM</strong> number of horizontal and vertical lines (<span className="text-amber-400 font-mono font-bold">L</span>) needed to cover all zeros is strictly <strong>EQUAL</strong> to the <strong>MAXIMUM</strong> number of independent zeros (<span className="text-emerald-400 font-mono font-bold">M</span>) that can be selected without sharing any row or column."
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/60 flex flex-col space-y-1">
                  <span className="text-emerald-300 font-bold">Case A: L = n (OPTIMAL! ⭐)</span>
                  <p className="text-slate-300 text-xs">A complete 1-to-1 optimal assignment permutation exists. Proceed to Step 5.</p>
                </div>
                <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-800/60 flex flex-col space-y-1">
                  <span className="text-rose-300 font-bold">Case B: L &lt; n (SUB-OPTIMAL ⚠️)</span>
                  <p className="text-slate-300 text-xs">Fewer than n independent zeros exist. Proceed to Step 4b (Additional Reduction).</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Interactive Line Visualizer */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-cover">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-600/20 text-rose-400 font-bold text-sm">
                  02
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Interactive Minimum Line Covering Workbench
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Total Lines:</span>
                <span className="px-2.5 py-1 rounded bg-slate-950 text-amber-300 font-mono font-bold border border-slate-800">
                  L = {totalLines} (Target n = 4)
                </span>
              </div>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Toggle horizontal row lines and vertical column lines to cover all zeros. Observe how cells are automatically classified into <span className="text-rose-400 font-semibold">Uncovered</span>, <span className="text-amber-300 font-semibold">Single-Covered</span>, and <span className="text-purple-400 font-semibold">Intersection</span> regions!
            </p>

            {/* Line Toggles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-2">
                <span className="text-slate-400 font-semibold">Horizontal Row Lines:</span>
                <div className="flex flex-wrap gap-1.5">
                  {activeRowLines.map((isActive, idx) => (
                    <button
                      key={idx}
                      onClick={() => toggleRow(idx)}
                      className={clsx(
                        'px-2.5 py-1 rounded text-xs font-semibold transition-all border',
                        isActive
                          ? 'bg-rose-600 text-white border-rose-400 shadow-md'
                          : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                      )}
                    >
                      {isActive ? `✓ Row ${idx + 1} Line` : `+ Row ${idx + 1} Line`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-2">
                <span className="text-slate-400 font-semibold">Vertical Column Lines:</span>
                <div className="flex flex-wrap gap-1.5">
                  {activeColLines.map((isActive, idx) => (
                    <button
                      key={idx}
                      onClick={() => toggleCol(idx)}
                      className={clsx(
                        'px-2.5 py-1 rounded text-xs font-semibold transition-all border',
                        isActive
                          ? 'bg-sky-600 text-white border-sky-400 shadow-md'
                          : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                      )}
                    >
                      {isActive ? `✓ Col ${idx + 1} Line` : `+ Col ${idx + 1} Line`}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Matrix View */}
            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-center border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2 text-left font-semibold text-slate-300 font-sans">Workers \ Tasks</th>
                    {taskNames.map((t, idx) => (
                      <th
                        key={idx}
                        className={clsx(
                          'p-2 font-semibold font-sans',
                          activeColLines[idx] ? 'text-sky-300 bg-sky-950/30' : 'text-slate-400'
                        )}
                      >
                        {t} {activeColLines[idx] && '│'}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {workerNames.map((wName, rIdx) => {
                    const isRowLine = activeRowLines[rIdx];
                    return (
                      <tr key={rIdx} className={isRowLine ? 'bg-rose-950/30' : ''}>
                        <td className="p-2 text-left font-medium text-slate-200 font-sans">
                          {isRowLine && '─ '}
                          {wName}
                        </td>
                        {matrix[rIdx].map((val, cIdx) => {
                          const isColLine = activeColLines[cIdx];
                          const linesCount = (isRowLine ? 1 : 0) + (isColLine ? 1 : 0);
                          return (
                            <td key={cIdx} className="p-2">
                              <div
                                className={clsx(
                                  'p-2.5 rounded-lg font-bold transition-all border flex flex-col items-center justify-center',
                                  linesCount === 2
                                    ? 'bg-purple-950 text-purple-300 border-purple-500 shadow-md shadow-purple-950/40' // Intersection
                                    : linesCount === 1
                                    ? 'bg-amber-950/60 text-amber-300 border-amber-600' // Single Covered
                                    : 'bg-slate-900 text-slate-300 border-slate-800' // Uncovered
                                )}
                              >
                                <span>{val === 0 ? '0 ⭐' : `₹${val}`}</span>
                                <span className="text-[9px] font-sans font-normal opacity-80">
                                  {linesCount === 2 ? 'INTERSECTION' : linesCount === 1 ? '1-LINE' : 'UNCOVERED'}
                                </span>
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Live Diagnosis */}
            <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs sm:text-sm">
              <div>
                {allZerosCovered ? (
                  <span className="text-emerald-400 font-bold">
                    ✓ All zero cells are covered by {totalLines} lines!
                  </span>
                ) : (
                  <span className="text-rose-400 font-bold">
                    ⚠️ {uncoveredZerosCount} zero cells remain uncovered! Add lines to cover them.
                  </span>
                )}
              </div>
              <div className="font-mono text-amber-300">
                {totalLines === 4
                  ? 'L = 4 = n ➔ OPTIMAL ASSIGNMENT ACHIEVED! ⭐'
                  : totalLines < 4
                  ? `L = ${totalLines} < 4 ➔ Additional Reduction Required (e = 1)`
                  : 'L > 4 ➔ Sub-optimal line covering; reduce lines to minimum!'}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Three Cell Regions */}
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
                The Three Cell Regions Created by Line Covering
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-rose-400 font-bold">1. Uncovered Cells (0 Lines)</span>
                <p className="text-slate-300">
                  Cells covered by 0 lines. In Step 4b, we find <span className="font-mono text-amber-300 font-bold">e = min(uncovered)</span> and subtract e from these cells.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-amber-300 font-bold">2. Single-Covered Cells (1 Line)</span>
                <p className="text-slate-300">
                  Cells covered by exactly 1 line (either row or col). In Step 4b, these entries remain completely UNCHANGED.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-purple-800/80 flex flex-col space-y-1">
                <span className="text-purple-300 font-bold">3. Intersections (2 Lines)</span>
                <p className="text-slate-300">
                  Cells covered by both a row and column line. In Step 4b, we ADD e to these cells (<span className="font-mono text-emerald-400">cᵢⱼ + e</span>).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Line Covering Theorem SVG */}
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
                König’s Line Covering Theorem Geometry
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 220"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* 4x4 Grid representation */}
                <rect x="50" y="30" width="280" height="160" rx="8" fill="#0f172a" stroke="#334155" />
                
                {/* Horizontal Line 1 across Row 1 */}
                <line x1="40" y1="60" x2="340" y2="60" stroke="#f43f5e" strokeWidth="4" />
                <text x="350" y="64" fill="#f43f5e" fontSize="10" fontWeight="bold">Line 1 (Row 1)</text>

                {/* Horizontal Line 2 across Row 2 */}
                <line x1="40" y1="100" x2="340" y2="100" stroke="#f43f5e" strokeWidth="4" />
                <text x="350" y="104" fill="#f43f5e" fontSize="10" fontWeight="bold">Line 2 (Row 2)</text>

                {/* Vertical Line 3 down Col 4 */}
                <line x1="290" y1="20" x2="290" y2="200" stroke="#38bdf8" strokeWidth="4" />
                <text x="290" y="215" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">Line 3 (Col 4)</text>

                {/* Legend Box */}
                <rect x="440" y="30" width="260" height="160" rx="8" fill="#1e293b" stroke="#475569" />
                <text x="570" y="55" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">König Theorem Diagnosis</text>
                <text x="570" y="85" fill="#f43f5e" fontSize="11" textAnchor="middle">Total Lines Drawn: L = 3</text>
                <text x="570" y="110" fill="#38bdf8" fontSize="11" textAnchor="middle">Matrix Order: n = 4</text>
                <text x="570" y="140" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">L &lt; n ➔ NOT OPTIMAL YET</text>
                <text x="570" y="165" fill="#a7f3d0" fontSize="10" textAnchor="middle">Proceed to Additional Reduction (e)</text>
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
                Bengal Operations Research Line Covering Case Studies
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
                  trap: 'Drawing More Than the Minimum Number of Lines',
                  fix: 'Always ensure your line count L is the absolute mathematical minimum; using non-minimal lines gives a false positive optimality.',
                },
                {
                  trap: 'Drawing Diagonal Lines Across the Matrix',
                  fix: 'Lines must be strictly HORIZONTAL (entire rows) or strictly VERTICAL (entire columns). Diagonal lines are mathematically invalid.',
                },
                {
                  trap: 'Forgetting to Cover All Zeros in the Matrix',
                  fix: 'Every single zero in the matrix must be covered by at least one horizontal or vertical line before counting L.',
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
                  Think of line covering as testing the network throughput of your zero channels: if 3 lines can block all zero pathways in a 4x4 matrix, you cannot yet send 4 independent units of flow!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully that drawing lines creates three distinct zones: uncovered (subtract e), single-covered (do nothing), and intersections (add e).
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
                Student Revision Checklist (Topic 10)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Mastered König’s Theorem: Min Lines (L) == Max Independent Zeros (M)',
                'Drew the absolute minimum number of horizontal and vertical lines covering all zeros',
                'Evaluated optimality criterion: if L = n (Optimal); if L < n (Additional Reduction)',
                'Classified cells into Uncovered (0 lines), Single-Covered (1 line), and Intersections (2 lines)',
                'Followed systematic tick-marking protocol (Unmarked Rows + Marked Cols)',
                'Confirmed that diagonal lines are strictly forbidden',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: Covering Zeros with the minimum number of lines is the true test of an operations researcher! Remember: your goal is to cover all zeros with the FEWEST possible lines. If L = n, you are done! If L < n, you are about to execute the most exciting transformation in the entire algorithm: Step 4b—Making Additional Reductions!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Covering Zeros FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Covering Zeros (Hungarian Method)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic11_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic10;
