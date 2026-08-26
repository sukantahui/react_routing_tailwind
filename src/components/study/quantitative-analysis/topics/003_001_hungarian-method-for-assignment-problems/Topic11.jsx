// src/components/study/quantitative-analysis/topics/003_001_hungarian-method-for-assignment-problems/Topic11.jsx
// React 19 Function-based Component
// Module: 003_001_hungarian-method-for-assignment-problems
// Topic 11: Making additional reductions when necessary

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic11_files/topic11_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic11_files/topic11_note.txt?raw';

const Topic11 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [activePhase, setActivePhase] = useState(0); // 0: Deadlock L=3, 1: Identify e=1, 2: Apply Matrix Transformation, 3: Re-test Lines L=4

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

  // Matrix States
  // Before Step 4b (Lines: Row 1, Row 2, Col 4)
  const beforeMatrix = [
    [0, 5, 0, 8],
    [1, 0, 0, 4],
    [3, 2, 3, 0],
    [0, 2, 2, 3],
  ];

  // After Step 4b (e = 1 subtracted from uncovered, added to intersections)
  const afterMatrix = [
    [0, 5, 0, 9], // Cell (1, 4) was intersection: 8 + 1 = 9
    [1, 0, 0, 5], // Cell (2, 4) was intersection: 4 + 1 = 5
    [2, 1, 2, 0], // (3, 1) was 3-1=2, (3, 2) was 2-1=1, (3, 3) was 3-1=2, (3, 4) was single-covered 0
    [0, 1, 1, 2], // (4, 1) was single 0, (4, 2) was 2-1=1, (4, 3) was 2-1=1, (4, 4) was 3-1=2
  ];

  const displayedMatrix = activePhase >= 2 ? afterMatrix : beforeMatrix;

  // Case Studies
  const caseStudies = [
    {
      title: '1. Foundry Multi-Pass Reduction (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Encountered an L = 3 line deadlock in Barrackpore. Identified e = ₹1 among uncovered cells, added e to intersections, and unlocked the optimal L = 4 solution at ₹46 total spend.',
      lesson: 'Step 4b systematically resolves line covering deadlocks by creating fresh zero candidates.',
    },
    {
      title: '2. Cold-Chain Vaccine Route Optimization (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Adjusted uncovered hospital clinic transit durations by e = 2 minutes in Kolkata, generating 2 new zero-cost lanes that reduced emergency dispatch transit times.',
      lesson: 'Scalar adjustments on uncovered cells discover hidden alternative zero routes.',
    },
    {
      title: '3. Supermarket FMCG Branch Manager Allocation (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Applied Step 4b with e = ₹10 in Ichapur, shifting dual potentials and saving ₹1,200 in monthly manager relocation allowances.',
      lesson: 'Monotonic dual ascent guarantees mathematical convergence to minimal total expenditure.',
    },
    {
      title: '4. Educational Press Contract Duality Audit (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Presented the exact arithmetic shift Delta W = e * (n - L) = 1 * (4 - 3) = ₹1 to university procurement auditors, satisfying all fiduciary audit standards.',
      lesson: 'Documenting the dual scalar shift e proves 100% adherence to operations research standards.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes reduceGlow {
          0%, 100% { border-color: rgba(234, 179, 8, 0.3); }
          50% { border-color: rgba(234, 179, 8, 0.8); }
        }
        .glow-reduce {
          animation: reduceGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-amber-950/80 text-amber-400 border border-amber-800/60">
              Segment 3 • Module 003_001 • Topic 11
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-amber-950/80 text-amber-400 border border-amber-800/60">
              Step 4b of Hungarian Method • Scalar e Transformation
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Making Additional Reductions
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive procedural guide on <span className="text-amber-400 font-semibold">Step 4b (Additional Reductions)</span>: identifying the smallest uncovered element (<span className="text-emerald-400 font-mono">e = min(uncovered)</span>), subtracting <span className="text-cyan-400 font-mono">e</span> from uncovered cells, adding <span className="text-purple-400 font-mono">e</span> to line intersections, keeping single-covered cells invariant, and proving <span className="text-emerald-400 font-mono">Monotonic Dual Ascent (ΔW &gt; 0)</span>.
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'three-rules', label: '1. The 3-Part Protocol' },
              { id: 'interactive-simulator', label: '2. Step 4b Transformation Simulator' },
              { id: 'dual-ascent', label: '3. Dual Ascent Proof (ΔW)' },
              { id: 'svg-protocol', label: '4. Transformation Protocol SVG' },
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
                    ? 'bg-amber-600 text-white border-amber-500 shadow-md shadow-amber-900/40'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </header>

        {/* SECTION 1: The 3-Part Protocol */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 font-bold text-sm">
                01
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                The 3-Part Transformation Protocol
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-2">
                <span className="text-rose-400 font-bold">1. Uncovered Cells (0 Lines)</span>
                <p className="text-slate-300">
                  Find smallest element <span className="font-mono text-amber-300 font-bold">e = min(uncovered)</span>.
                </p>
                <div className="p-2 bg-slate-950 rounded font-mono text-cyan-300 text-xs">
                  cᵢⱼ′ = cᵢⱼ − e
                </div>
                <p className="text-slate-400 text-xs">Creates at least one brand new zero candidate.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-2">
                <span className="text-purple-400 font-bold">2. Intersection Cells (2 Lines)</span>
                <p className="text-slate-300">
                  Cells covered by BOTH a row line and a col line.
                </p>
                <div className="p-2 bg-slate-950 rounded font-mono text-purple-300 text-xs">
                  cᵢⱼ′ = cᵢⱼ + e
                </div>
                <p className="text-slate-400 text-xs">Compensates for double-coverage dual potential shift.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-2">
                <span className="text-amber-300 font-bold">3. Single-Covered Cells (1 Line)</span>
                <p className="text-slate-300">
                  Cells covered by EXACTLY ONE line.
                </p>
                <div className="p-2 bg-slate-950 rounded font-mono text-emerald-300 text-xs">
                  cᵢⱼ′ = cᵢⱼ (UNCHANGED)
                </div>
                <p className="text-slate-400 text-xs">Net dual adjustment (+e − e) equals exactly zero.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Step 4b Transformation Simulator */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-reduce">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 font-bold text-sm">
                  02
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Interactive Step 4b Transformation Simulator
                </h2>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 0, label: 'Phase 0: L = 3 Deadlock' },
                  { id: 1, label: 'Phase 1: Identify e = 1' },
                  { id: 2, label: 'Phase 2: Apply Step 4b' },
                  { id: 3, label: 'Phase 3: Re-test (L = 4)' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActivePhase(item.id)}
                    className={clsx(
                      'px-2.5 py-1 rounded text-xs font-semibold transition-all border',
                      activePhase === item.id
                        ? 'bg-amber-600 text-white border-amber-400 shadow-md'
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              {activePhase === 0 && '⚠️ Phase 0: All zeros are covered by 3 lines (Row 1, Row 2, Col 4). Since L = 3 < 4, the matrix is not yet optimal.'}
              {activePhase === 1 && '🔍 Phase 1: Scanning all uncovered cells [3, 2, 3, 2, 2, 3] identifies the smallest uncovered element: e = 1.'}
              {activePhase === 2 && '⚡ Phase 2: Transformation executed! Uncovered entries −1, Intersections +1, Single-covered unchanged.'}
              {activePhase === 3 && '⭐ Phase 3: Re-testing lines! Minimum lines required is now L = 4 = n. The matrix is 100% optimal!'}
            </p>

            {/* Matrix View */}
            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-center border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2 text-left font-semibold text-slate-300 font-sans">Technicians \ Jobs</th>
                    {taskNames.map((t, idx) => (
                      <th
                        key={idx}
                        className={clsx(
                          'p-2 font-semibold font-sans',
                          idx === 3 && activePhase < 2 ? 'text-sky-300 bg-sky-950/20' : 'text-slate-400'
                        )}
                      >
                        {t} {idx === 3 && activePhase < 2 && '│ (Col Line)'}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {workerNames.map((wName, rIdx) => {
                    const isRowLine = rIdx < 2 && activePhase < 2;
                    return (
                      <tr key={rIdx} className={isRowLine ? 'bg-rose-950/20' : ''}>
                        <td className="p-2 text-left font-medium text-slate-200 font-sans">
                          {isRowLine && '─ '}
                          {wName}
                        </td>
                        {displayedMatrix[rIdx].map((val, cIdx) => {
                          const isColLine = cIdx === 3 && activePhase < 2;
                          const isIntersection = isRowLine && isColLine;
                          const isSingle = (isRowLine && !isColLine) || (!isRowLine && isColLine);
                          const isUncovered = !isRowLine && !isColLine;

                          return (
                            <td key={cIdx} className="p-2">
                              <div
                                className={clsx(
                                  'p-2.5 rounded-lg font-bold transition-all border flex flex-col items-center justify-center',
                                  activePhase >= 2
                                    ? val === 0
                                      ? 'bg-emerald-950 text-emerald-300 border-emerald-500 shadow-md shadow-emerald-950/60 animate-pulse'
                                      : 'bg-slate-900 text-slate-300 border-slate-800'
                                    : isIntersection
                                    ? 'bg-purple-950 text-purple-300 border-purple-500'
                                    : isSingle
                                    ? 'bg-amber-950/60 text-amber-300 border-amber-700'
                                    : 'bg-rose-950/60 text-rose-300 border-rose-700'
                                )}
                              >
                                <span>{val === 0 ? '0 ⭐' : `₹${val}`}</span>
                                {activePhase < 2 && (
                                  <span className="text-[9px] font-sans font-normal opacity-80">
                                    {isIntersection ? '+e (+1)' : isSingle ? 'UNCHANGED' : '−e (−1)'}
                                  </span>
                                )}
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

            {/* Footer Summary */}
            <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs sm:text-sm">
              <span className="text-slate-300 font-sans">
                Status: <strong className="text-amber-300">{activePhase >= 3 ? 'Optimal (L = 4 = n)' : 'Step 4b In Progress'}</strong>
              </span>
              <div className="font-mono text-emerald-400 font-bold">
                Dual Increase: ΔW = e · (n − L) = 1 · (4 − 3) = ₹1 (Total Dual W = ₹48)
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Dual Ascent Proof */}
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
                Monotonic Dual Ascent Theorem (ΔW &gt; 0)
              </h2>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2 font-mono text-xs sm:text-sm">
              <span className="text-indigo-300 font-bold font-sans">Mathematical Proof:</span>
              <p className="text-slate-300">
                Let r = count of row lines, and c = count of column lines (L = r + c &lt; n).
              </p>
              <p className="text-white">
                Uncovered rows (n − r) experience potential shift: &nbsp; uᵢ ➔ uᵢ + e<br />
                Covered columns (c) experience potential shift: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; vⱼ ➔ vⱼ − e
              </p>
              <p className="text-emerald-300 pt-1 font-sans">
                Net Dual Shift: &nbsp; ΔW = (n − r) · e − c · e = e · (n − (r + c)) = e · (n − L) &gt; 0!
              </p>
              <p className="text-slate-400 font-sans text-xs">
                Because ΔW is strictly positive on a discrete integer grid, the Hungarian algorithm is mathematically proven to terminate in polynomial time!
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Transformation Protocol SVG */}
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
                Step 4b Transformation Protocol Visualizer
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 200"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* 3 Region Action Boxes */}
                <rect x="40" y="40" width="200" height="120" rx="8" fill="#4c0519" stroke="#f43f5e" strokeWidth="2" />
                <text x="140" y="70" fill="#f43f5e" fontSize="12" fontWeight="bold" textAnchor="middle">1. UNCOVERED (0 Lines)</text>
                <text x="140" y="100" fill="#ffffff" fontSize="13" fontFamily="monospace" fontWeight="bold" textAnchor="middle">cᵢⱼ′ = cᵢⱼ − e</text>
                <text x="140" y="130" fill="#fecdd3" fontSize="10" textAnchor="middle">Creates new zeros ⭐</text>

                <rect x="270" y="40" width="200" height="120" rx="8" fill="#451a03" stroke="#fbbf24" strokeWidth="2" />
                <text x="370" y="70" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">2. SINGLE (1 Line)</text>
                <text x="370" y="100" fill="#ffffff" fontSize="13" fontFamily="monospace" fontWeight="bold" textAnchor="middle">cᵢⱼ′ = cᵢⱼ</text>
                <text x="370" y="130" fill="#fde68a" fontSize="10" textAnchor="middle">100% UNCHANGED</text>

                <rect x="500" y="40" width="200" height="120" rx="8" fill="#3b0764" stroke="#c084fc" strokeWidth="2" />
                <text x="600" y="70" fill="#c084fc" fontSize="12" fontWeight="bold" textAnchor="middle">3. INTERSECTIONS (2 Lines)</text>
                <text x="600" y="100" fill="#ffffff" fontSize="13" fontFamily="monospace" fontWeight="bold" textAnchor="middle">cᵢⱼ′ = cᵢⱼ + e</text>
                <text x="600" y="130" fill="#e9d5ff" fontSize="10" textAnchor="middle">Compensates dual shift</text>
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
                Bengal Operations Research Additional Reduction Case Studies
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
                  <p className="text-amber-300 font-semibold">💡 <strong>Operations Takeaway:</strong> {cs.lesson}</p>
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
                  trap: 'Subtracting e from Single-Covered Cells',
                  fix: 'Never alter single-covered cells; only UNCOVERED cells have e subtracted from them.',
                },
                {
                  trap: 'Forgetting to Add e to Line Intersections',
                  fix: 'Every cell covered by 2 lines (horizontal and vertical) MUST have e added to it (c_ij + e).',
                },
                {
                  trap: 'Forgetting to Re-test Lines After Step 4b',
                  fix: 'Immediately after modifying the matrix, return to Step 4 and re-draw the minimum lines L.',
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
                  Think about the mathematical symmetry of Step 4b: subtracting e from uncovered cells creates new zero options, while adding e to intersections prevents double-counting!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully that after Step 4b, the number of lines required to cover all zeros increases toward n.
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
                Student Revision Checklist (Topic 11)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Identified trigger condition: L < n (minimum lines < matrix order)',
                'Found smallest uncovered element e = min(uncovered)',
                'Subtracted e from all uncovered cells: c_ij\' = c_ij - e',
                'Added e to all intersection cells: c_ij\' = c_ij + e',
                'Kept single-covered cells completely unchanged',
                'Re-tested line covering condition until L == n',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: Making Additional Reductions is where most students lose marks in examinations! Remember the golden mantra: 'Subtract e from uncovered, add e to intersections, leave single-covered alone!' If you follow this rule, you will never go wrong. In our next topic, we will execute Step 5: Selecting Independent Zeros!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Making Additional Reductions FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Making Additional Reductions (Hungarian Method)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic12_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic11;
