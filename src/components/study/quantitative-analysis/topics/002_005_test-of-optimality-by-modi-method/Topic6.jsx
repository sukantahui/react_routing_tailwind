// src/components/study/quantitative-analysis/topics/002_005_test-of-optimality-by-modi-method/Topic6.jsx
// React 19 Function-based Component
// Module: 002_005_test-of-optimality-by-modi-method
// Topic 6: Closed loops

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic6_files/topic6_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic6_files/topic6_note.txt?raw';

const Topic6 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [loopType, setLoopType] = useState('4corner'); // '4corner', '6corner', 'invalid'

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

  // Loop geometry configurations
  const loopConfigs = {
    '4corner': {
      title: 'Standard 4-Corner Loop (Entering Cell 2, 1)',
      path: '(2,1)[+θ] ➔ (1,1)[-θ] ➔ (1,2)[+θ] ➔ (2,2)[-θ] ➔ (2,1)',
      corners: [
        { r: 1, c: 0, sign: '+θ', label: 'Enter (x=0)' },
        { r: 0, c: 0, sign: '-θ', label: 'Basic (x=60)' },
        { r: 0, c: 1, sign: '+θ', label: 'Basic (x=10)' },
        { r: 1, c: 1, sign: '-θ', label: 'Basic (x=70)' },
      ],
      minusCorners: 'Minus corners: Cell (1,1) [60] and Cell (2,2) [70]',
      thetaCalculation: 'θ = min(60, 70) = 60 tons',
      financialSavings: 'Delta Z = 60 tons × (-₹8) = -₹480 (Cost drops to ₹2,260)',
      isValid: true,
    },
    '6corner': {
      title: 'Complex 6-Corner Loop (Entering Cell 3, 1)',
      path: '(3,1)[+θ] ➔ (1,1)[-θ] ➔ (1,3)[+θ] ➔ (2,3)[-θ] ➔ (2,2)[+θ] ➔ (3,2)[-θ] ➔ (3,1)',
      corners: [
        { r: 2, c: 0, sign: '+θ', label: 'Enter (x=0)' },
        { r: 0, c: 0, sign: '-θ', label: 'Basic (x=40)' },
        { r: 0, c: 2, sign: '+θ', label: 'Basic (x=30)' },
        { r: 1, c: 2, sign: '-θ', label: 'Basic (x=20)' },
        { r: 1, c: 1, sign: '+θ', label: 'Basic (x=50)' },
        { r: 2, c: 1, sign: '-θ', label: 'Basic (x=15)' },
      ],
      minusCorners: 'Minus corners: Cell (1,1) [40], Cell (2,3) [20], Cell (3,2) [15]',
      thetaCalculation: 'θ = min(40, 20, 15) = 15 tons',
      financialSavings: 'Delta Z = 15 tons × (-₹6) = -₹90',
      isValid: true,
    },
    invalid: {
      title: 'Invalid Loop Trap (Attempting to Turn at an Empty Cell)',
      path: '(2,1)[+θ] ➔ (2,3)[Empty! ❌] ➔ (3,3)[Basic] ➔ (3,1)[Empty! ❌] ➔ (2,1)',
      corners: [
        { r: 1, c: 0, sign: '+θ', label: 'Enter' },
        { r: 1, c: 2, sign: '-θ', label: 'EMPTY CELL ❌' },
        { r: 2, c: 2, sign: '+θ', label: 'Basic' },
        { r: 2, c: 0, sign: '-θ', label: 'EMPTY CELL ❌' },
      ],
      minusCorners: 'Cannot subtract flow from an empty cell (x = 0 - θ = -θ < 0 violates non-negativity!)',
      thetaCalculation: 'INVALID: θ cannot be determined',
      financialSavings: 'REJECTED: Turning at empty cells breaks flow conservation',
      isValid: false,
    },
  };

  const currentConfig = loopConfigs[loopType];

  // Case Studies
  const caseStudies = [
    {
      title: '1. Foundry 4-Corner Loop Flow Shift (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Traced loop (2,1) ➔ (1,1) ➔ (1,2) ➔ (2,2) ➔ (2,1) in Barrackpore. Reallocated θ = 60 tons of casting freight, reducing total cost from ₹2,740 to ₹2,260 in one seamless pivot.',
      lesson: '4-corner loops are the most common and direct flow reallocation patterns.',
    },
    {
      title: '2. Cold-Chain Vaccine 6-Corner Multi-Turn Loop (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Executed a 6-corner complex loop across 3 hospitals in Kolkata. Reallocated θ = 15 vaccine packs without violating any regional demand constraints.',
      lesson: 'Complex 6-corner loops preserve mass balance across multi-echelon networks.',
    },
    {
      title: '3. Supermarket FMCG Degeneracy Resolution Loop (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Encountered a degenerate matrix with only 4 basic cells. Inserted ε in cell (1, 3) to serve as a legal corner vertex, completing the closed loop and allowing θ = 20 tons to transfer.',
      lesson: 'Epsilon acts as a valid turning vertex in stepping-stone loops.',
    },
    {
      title: '4. Educational Press Acyclic Spanning Verification (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Verified that the final basic network contained zero closed loops among its occupied cells, proving linear independence of the optimal basis.',
      lesson: 'A valid basis is strictly acyclic; closed loops exist only when adding an entering edge.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes loopPulse {
          0%, 100% { border-color: rgba(99, 102, 241, 0.3); }
          50% { border-color: rgba(99, 102, 241, 0.8); }
        }
        .glow-loop {
          animation: loopPulse 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
              Module 002_005 • Topic 6
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-indigo-950/80 text-indigo-400 border border-indigo-800/60">
              Fundamental Cycles & Flow Pivots
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Closed Loops
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            The geometric engine of the transportation simplex method: mastering <span className="text-indigo-400 font-semibold">Stepping-Stone Closed Loops</span>, proving cycle uniqueness on <span className="text-cyan-400 font-semibold">Spanning Trees</span>, applying strict 90° turning rules on basic cells, and preserving <span className="text-emerald-400 font-semibold">Conservation of Flow</span>.
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'definition', label: '1. Definition & Fundamental Cycle' },
              { id: 'interactive-tracer', label: '2. Interactive Loop Tracer' },
              { id: 'geometric-rules', label: '3. Geometric Rules' },
              { id: 'svg-diagram', label: '4. Loop Path Geometry SVG' },
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
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-900/40'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </header>

        {/* SECTION 1: Definition & Fundamental Cycle */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 font-bold text-sm">
                01
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Definition & The Fundamental Cycle Theorem
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              A <strong>Stepping-Stone Closed Loop</strong> is an ordered rectangular polygon in the transportation tableau starting and ending at the entering non-basic cell, with all turning corners lying strictly on occupied basic cells.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-indigo-800/40 flex flex-col space-y-2">
                <span className="text-indigo-300 font-bold">1. Spanning Tree Cycle Uniqueness</span>
                <p className="text-slate-300">
                  Because the <span className="font-mono text-cyan-300">m + n - 1</span> basic cells form an acyclic tree, adding exactly one non-basic entering edge creates <strong>EXACTLY ONE UNIQUE closed cycle</strong>.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-emerald-800/40 flex flex-col space-y-2">
                <span className="text-emerald-300 font-bold">2. Flow Conservation (+θ, -θ)</span>
                <p className="text-slate-300">
                  Every row and column in the loop has exactly one <span className="font-mono text-emerald-400">+θ</span> corner and one <span className="font-mono text-rose-400">-θ</span> corner. Net change is <span className="font-mono text-white">+θ - θ = 0</span>, perfectly preserving all supplies and demands!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Interactive Loop Tracer */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-loop">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 font-bold text-sm">
                  02
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Interactive Stepping-Stone Loop Tracer
                </h2>
              </div>
              <div className="flex items-center gap-1.5">
                {[
                  { id: '4corner', label: '1. Standard 4-Corner Loop' },
                  { id: '6corner', label: '2. Complex 6-Corner Loop' },
                  { id: 'invalid', label: '3. Invalid Loop Trap ❌' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setLoopType(item.id)}
                    className={clsx(
                      'px-3 py-1 rounded text-xs font-semibold transition-all border',
                      loopType === item.id
                        ? item.id === 'invalid'
                          ? 'bg-rose-600 text-white border-rose-400 shadow-md'
                          : 'bg-indigo-600 text-white border-indigo-400 shadow-md'
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col space-y-1">
              <h3 className="text-base font-bold text-indigo-300">{currentConfig.title}</h3>
              <p className="text-xs sm:text-sm text-emerald-300 font-mono">{currentConfig.path}</p>
            </div>

            {/* Tableau Visualizer */}
            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                {[
                  [ { label: 'S1, D1', r: 0, c: 0 }, { label: 'S1, D2', r: 0, c: 1 }, { label: 'S1, D3', r: 0, c: 2 } ],
                  [ { label: 'S2, D1', r: 1, c: 0 }, { label: 'S2, D2', r: 1, c: 1 }, { label: 'S2, D3', r: 1, c: 2 } ],
                  [ { label: 'S3, D1', r: 2, c: 0 }, { label: 'S3, D2', r: 2, c: 1 }, { label: 'S3, D3', r: 2, c: 2 } ],
                ].map((row, rIdx) => (
                  <React.Fragment key={rIdx}>
                    {row.map((cell, cIdx) => {
                      const cornerObj = currentConfig.corners.find((c) => c.r === rIdx && c.c === cIdx);
                      const isCorner = !!cornerObj;

                      return (
                        <div
                          key={cIdx}
                          className={clsx(
                            'p-3 rounded-xl border flex flex-col items-center justify-center transition-all',
                            isCorner
                              ? cornerObj.sign === '+θ'
                                ? 'bg-emerald-950/80 text-emerald-200 border-emerald-500 shadow-md scale-105'
                                : cornerObj.label.includes('EMPTY')
                                ? 'bg-rose-950/80 text-rose-300 border-rose-500 animate-pulse'
                                : 'bg-rose-950/80 text-rose-200 border-rose-500 shadow-md scale-105'
                              : 'bg-slate-900 text-slate-500 border-slate-800'
                          )}
                        >
                          <span className="text-[11px] font-bold">{cell.label}</span>
                          {isCorner && (
                            <span
                              className={clsx(
                                'text-xs font-extrabold px-2 py-0.5 rounded mt-1',
                                cornerObj.sign === '+θ'
                                  ? 'bg-emerald-900 text-white'
                                  : 'bg-rose-900 text-white'
                              )}
                            >
                              {cornerObj.sign} ({cornerObj.label})
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Loop Diagnostics Card */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1.5 text-xs sm:text-sm">
              <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                <span className="font-bold text-white">Loop Analysis & Transfer Flow:</span>
                <span
                  className={clsx(
                    'px-2 py-0.5 rounded text-xs font-bold border',
                    currentConfig.isValid
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                      : 'bg-rose-950 text-rose-300 border-rose-700'
                  )}
                >
                  {currentConfig.isValid ? 'Valid Closed Loop ✅' : 'Invalid Loop Violation ❌'}
                </span>
              </div>
              <p className="text-slate-300">• <strong>Minus Corners:</strong> {currentConfig.minusCorners}</p>
              <p className="text-emerald-300">• <strong>Transfer Calculation:</strong> {currentConfig.thetaCalculation}</p>
              <p className="text-amber-300">• <strong>Financial Savings:</strong> {currentConfig.financialSavings}</p>
            </div>
          </div>
        </section>

        {/* SECTION 3: Geometric Rules */}
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
                Geometric Rules for Constructing Closed Loops
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              {[
                { rule: '1. Strict 90° Turns Only', desc: 'All segments must be strictly horizontal or vertical. Diagonal moves are strictly prohibited.' },
                { rule: '2. Turning Exclusively on Basic Cells', desc: 'Every turning corner must be an occupied basic cell (except the start/end entering cell).' },
                { rule: '3. Skipping Intervening Cells', desc: 'Loop lines can jump over empty or basic cells without turning; vertices exist only at 90° turns.' },
                { rule: '4. Even Number of Corners', desc: 'Every valid loop has an even number of vertices (4, 6, 8...) to allow alternating +θ and -θ.' },
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                  <span className="text-cyan-300 font-bold">{item.rule}</span>
                  <p className="text-slate-300 text-xs">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: Loop Path Geometry SVG */}
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
                Loop Path Geometry & Directional Flow
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 260"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* 4 Corner Vertices */}
                <rect x="100" y="40" width="160" height="70" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <text x="180" y="70" fill="#f43f5e" fontSize="12" fontWeight="bold" textAnchor="middle">Cell (1,1) [x=60]</text>
                <text x="180" y="90" fill="#fda4af" fontSize="11" fontFamily="monospace" textAnchor="middle">MINUS CORNER (-θ)</text>

                <rect x="480" y="40" width="160" height="70" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <text x="560" y="70" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">Cell (1,2) [x=10]</text>
                <text x="560" y="90" fill="#a7f3d0" fontSize="11" fontFamily="monospace" textAnchor="middle">PLUS CORNER (+θ)</text>

                <rect x="480" y="150" width="160" height="70" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <text x="560" y="180" fill="#f43f5e" fontSize="12" fontWeight="bold" textAnchor="middle">Cell (2,2) [x=70]</text>
                <text x="560" y="200" fill="#fda4af" fontSize="11" fontFamily="monospace" textAnchor="middle">MINUS CORNER (-θ)</text>

                <rect x="100" y="150" width="160" height="70" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="180" y="180" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle">Entering Cell (2,1)</text>
                <text x="180" y="200" fill="#fef08a" fontSize="11" fontFamily="monospace" textAnchor="middle">ENTER CORNER (+θ)</text>

                {/* Connecting Arrows */}
                <line x1="180" y1="150" x2="180" y2="110" stroke="#f59e0b" strokeWidth="3" />
                <polygon points="180,110 175,120 185,120" fill="#f59e0b" />

                <line x1="260" y1="75" x2="480" y2="75" stroke="#38bdf8" strokeWidth="3" />
                <polygon points="480,75 470,70 470,80" fill="#38bdf8" />

                <line x1="560" y1="110" x2="560" y2="150" stroke="#38bdf8" strokeWidth="3" />
                <polygon points="560,150 555,140 565,140" fill="#38bdf8" />

                <line x1="480" y1="185" x2="260" y2="185" stroke="#38bdf8" strokeWidth="3" />
                <polygon points="260,185 270,180 270,190" fill="#38bdf8" />
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
                Bengal Logistics Closed Loop Case Studies
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
                  <p className="text-indigo-300 font-semibold">💡 <strong>Operations Takeaway:</strong> {cs.lesson}</p>
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
                  trap: 'Turning at an Empty (Unoccupied) Cell',
                  fix: 'Every 90° turning corner MUST be an occupied basic cell. Turning at an empty cell creates negative allocations (-θ < 0).',
                },
                {
                  trap: 'Drawing Diagonal Lines Across the Tableau',
                  fix: 'Diagonal moves are strictly illegal; all line segments must be purely horizontal or purely vertical.',
                },
                {
                  trap: 'Picking θ from the Plus (+) Corners',
                  fix: 'θ is strictly the MINIMUM of the allocations among the MINUS (-) corners: θ = min(x_minus).',
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
                  Think of the basic cells as stepping stones across a pond: you can jump from stone to stone in straight horizontal or vertical lines, but if you step on empty water, you sink!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully that because every row and column involved has exactly one +θ and one -θ corner, the total supply and total demand remain 100% perfectly balanced after the pivot.
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
                Student Revision Checklist (Topic 6)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Identified entering cell and assigned (+θ)',
                'Traced loop using strictly horizontal and vertical 90° segments',
                'Turned exclusively on occupied basic cells',
                'Alternated signs around vertices: (+θ, -θ, +θ, -θ...)',
                'Calculated θ = min(allocations at minus corners)',
                'Updated cell allocations (+θ to plus corners, -θ to minus corners)',
                'Verified exactly one cell drops to zero and leaves the basis',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: tracing closed loops is an art form! Remember the stepping-stone golden rule: your occupied basic cells are solid rocks in a river. You can leap from one rock to another along straight horizontal or vertical lines, but you must NEVER try to step on an empty cell! Assign (+θ) to your entering champion, alternate (+, -, +, -) around the corners, find the smallest minus corner for θ, and pivot your flow. When you do it right, your supply and demand stay rock-solid while your total cost drops like a stone!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Closed Loops FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Closed Loops (MODI Method)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic7_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic6;
