// src/components/study/quantitative-analysis/topics/005_006_2xn-and-m-x-2-cases-graphical-and-algebraic-methods/Topic3.jsx
// React 19 Function-based Component
// Module: 005_006_2xn-and-m-x-2-cases-graphical-and-algebraic-methods
// Topic 3: Plotting strategy lines

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

  // Line toggles
  const [showLine1, setShowLine1] = useState(true);
  const [showLine2, setShowLine2] = useState(true);
  const [showLine3, setShowLine3] = useState(true);
  const [showLine4, setShowLine4] = useState(true);

  // Selected intersection pair
  const [pairLineA, setPairLineA] = useState(1);
  const [pairLineB, setPairLineB] = useState(2);

  // 2x4 Line Definitions (a1j, a2j) in ₹ Thousands
  const lines = [
    { id: 1, name: 'B₁ Line', a1: 20, a2: 40, color: '#f43f5e', slope: -20, desc: 'Descending (m = -20)' },
    { id: 2, name: 'B₂ Line', a1: 50, a2: 10, color: '#38bdf8', slope: 40, desc: 'Ascending (m = +40)' },
    { id: 3, name: 'B₃ Line', a1: 60, a2: 30, color: '#a855f7', slope: 30, desc: 'Ascending (m = +30)' },
    { id: 4, name: 'B₄ Line', a1: 30, a2: 50, color: '#fbbf24', slope: -20, desc: 'Descending (m = -20)' },
  ];

  // Calculate intersection between pairLineA and pairLineB
  const lineA = lines.find((l) => l.id === pairLineA);
  const lineB = lines.find((l) => l.id === pairLineB);

  let intersectP1 = null;
  let intersectVal = null;
  let hasValidIntersect = false;

  if (lineA && lineB && lineA.id !== lineB.id) {
    const denom = (lineA.a1 - lineA.a2) - (lineB.a1 - lineB.a2);
    if (denom !== 0) {
      const p = (lineB.a2 - lineA.a2) / denom;
      if (p &ge; 0 && p &le; 1) {
        intersectP1 = p;
        intersectVal = (lineA.a1 - lineA.a2) * p + lineA.a2;
        hasValidIntersect = true;
      }
    }
  }

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
      title: '1. Foundry 2x4 Furnace Tender Plotting (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Debangshu in Barrackpore plotted 4 alloy bidding lines: Line 1 (0, 40) to (1, 20), Line 2 (0, 10) to (1, 50), Line 3 (0, 30) to (1, 60), and Line 4 (0, 50) to (1, 30). Finding the intersection of Lines 1 and 2 at p1 = 0.50 locked in ₹30,000 per shift.',
      lesson: 'Accurate line endpoint plotting prevents misidentification of active strategy pairs.',
    },
    {
      title: '2. Cold-Chain Transport Route Plotting (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Plotted 3 delivery lines over q1 in [0, 1] in Kolkata. Lines 1 and 2 intersected at q1 = 2/3 with a payout of ₹24,000, establishing the minimax trough.',
      lesson: 'Dual vertical axes provide crystal-clear visual slope diagnostics.',
    },
    {
      title: '3. Supermarket FMCG Promotion Plotting (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Plotted 3 weekend promotion retaliation lines in Ichapur. The intersection of Lines 1 and 2 at p1 = 0.625 secured ₹32,000 in promotional margin.',
      lesson: 'Intersection algebra guarantees exact rational valuations.',
    },
    {
      title: '4. Educational High-Tech Lab Patent Dispute Plotting (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Plotted 4 licensing claim lines in Jadavpur, identifying the exact minimax intersection point of ₹20 Lakh between research institutions.',
      lesson: 'Visual line plotting simplifies high-stakes multi-party arbitration.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes plotGlow3 {
          0%, 100% { border-color: rgba(56, 189, 248, 0.3); }
          50% { border-color: rgba(56, 189, 248, 0.8); }
        }
        .glow-plot3 {
          animation: plotGlow3 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Segment 5 • Module 005_006 • Topic 3
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Plotting Strategy Lines • Endpoints • Slopes • Intersections in ₹
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Plotting Strategy Lines (Geometry & Intersection Algebra)
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive tutorial on <span className="text-sky-400 font-semibold">Plotting Strategy Lines</span>: calibrating the dual vertical axes (<span className="text-amber-400 font-mono">p₁ = 0</span> vs <span className="text-emerald-400 font-mono">p₁ = 1</span>), plotting endpoint coordinates (<span className="text-rose-400 font-mono">(0, a₂ⱼ)</span> to <span className="text-sky-400 font-mono">(1, a₁ⱼ)</span>), computing exact intersection points, and evaluating slope geometries in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'plotting-protocol', label: '1. Plotting Protocol' },
              { id: 'interactive-plotter', label: '2. Strategy Line Plotter Studio' },
              { id: 'intersection-algebra', label: '3. Intersection Algebra' },
              { id: 'svg-anatomy', label: '4. Strategy Line Anatomy SVG' },
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
                    ? 'bg-sky-600 text-white border-sky-500 shadow-md shadow-sky-900/40'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
                )}
              &gt;
                {item.label}
              </button>
            ))}
          </div>
        </header>

        {/* SECTION 1: Plotting Protocol */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                01
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                The 4-Step Strategy Line Plotting Protocol
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs sm:text-sm font-mono">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-400 font-sans font-bold">1. Dual Axes Setup</span>
                <p className="text-slate-300 text-xs">Left: p₁=0 (Row 2). Right: p₁=1 (Row 1). Calibrate in ₹.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-sans font-bold">2. Mark Endpoints</span>
                <p className="text-slate-300 text-xs">Left point: (0, a₂ⱼ). Right point: (1, a₁ⱼ).</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-purple-300 font-sans font-bold">3. Slope Classification</span>
                <p className="text-slate-300 text-xs">m = a₁ⱼ − a₂ⱼ (Ascending if &gt;0, Descending if &lt;0).</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-sans font-bold">4. Solve Intersection</span>
                <p className="text-slate-300 text-xs">Equate E_j(p₁) = E_k(p₁) to find exact (p₁*, v*).</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Strategy Line Plotter Studio */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-plot3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                  02
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Interactive Strategy Line Plotter & Intersection Studio
                </h2>
              </div>

              {/* Line Visibility Toggles */}
              <div className="flex flex-wrap gap-1.5 text-xs font-mono">
                <button
                  onClick={() => setShowLine1(!showLine1)}
                  className={clsx(
                    'px-2.5 py-1 rounded-lg border font-semibold transition-all',
                    showLine1 ? 'bg-rose-950 text-rose-300 border-rose-600' : 'bg-slate-950 text-slate-600 border-slate-800'
                  )}
                &gt;
                  B₁ {showLine1 ? 'ON' : 'OFF'}
                </button>
                <button
                  onClick={() => setShowLine2(!showLine2)}
                  className={clsx(
                    'px-2.5 py-1 rounded-lg border font-semibold transition-all',
                    showLine2 ? 'bg-sky-950 text-sky-300 border-sky-600' : 'bg-slate-950 text-slate-600 border-slate-800'
                  )}
                &gt;
                  B₂ {showLine2 ? 'ON' : 'OFF'}
                </button>
                <button
                  onClick={() => setShowLine3(!showLine3)}
                  className={clsx(
                    'px-2.5 py-1 rounded-lg border font-semibold transition-all',
                    showLine3 ? 'bg-purple-950 text-purple-300 border-purple-600' : 'bg-slate-950 text-slate-600 border-slate-800'
                  )}
                &gt;
                  B₃ {showLine3 ? 'ON' : 'OFF'}
                </button>
                <button
                  onClick={() => setShowLine4(!showLine4)}
                  className={clsx(
                    'px-2.5 py-1 rounded-lg border font-semibold transition-all',
                    showLine4 ? 'bg-amber-950 text-amber-300 border-amber-600' : 'bg-slate-950 text-slate-600 border-slate-800'
                  )}
                &gt;
                  B₄ {showLine4 ? 'ON' : 'OFF'}
                </button>
              </div>
            </div>

            {/* Interactive SVG Plot Canvas */}
            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 700 240"
                className="w-full max-w-2xl h-auto select-none"
                style={{ minWidth: '550px' }}
              >
                {/* Axes */}
                <line x1="80" y1="20" x2="80" y2="200" stroke="#64748b" strokeWidth="2" />
                <text x="80" y="15" fill="#f87171" fontSize="10" fontWeight="bold" textAnchor="middle">p₁ = 0 (Left Axis: A₂)</text>

                <line x1="620" y1="20" x2="620" y2="200" stroke="#64748b" strokeWidth="2" />
                <text x="620" y="15" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">p₁ = 1 (Right Axis: A₁)</text>

                {/* Grid Lines */}
                {[0, 20, 40, 60].map((val, idx) => {
                  const y = 200 - (val / 70) * 180;
                  return (
                    <g key={idx}>
                      <line x1="80" y1={y} x2="620" y2={y} stroke="#334155" strokeWidth="0.5" strokeDasharray="3,3" />
                      <text x="70" y={y + 3} fill="#64748b" fontSize="8" textAnchor="end">₹{val}k</text>
                      <text x="630" y={y + 3} fill="#64748b" fontSize="8" textAnchor="start">₹{val}k</text>
                    </g>
                  );
                })}

                {/* Line 1: (0, 40) to (1, 20) */}
                {showLine1 && (
                  <g>
                    <line
                      x1="80"
                      y1={200 - (40 / 70) * 180}
                      x2="620"
                      y2={200 - (20 / 70) * 180}
                      stroke="#f43f5e"
                      strokeWidth="2"
                    />
                    <circle cx="80" cy={200 - (40 / 70) * 180} r="4" fill="#f43f5e" />
                    <circle cx="620" cy={200 - (20 / 70) * 180} r="4" fill="#f43f5e" />
                    <text x="350" y={200 - (30 / 70) * 180 - 8} fill="#f43f5e" fontSize="9" fontWeight="bold">B₁: −20p₁+40</text>
                  </g>
                )}

                {/* Line 2: (0, 10) to (1, 50) */}
                {showLine2 && (
                  <g>
                    <line
                      x1="80"
                      y1={200 - (10 / 70) * 180}
                      x2="620"
                      y2={200 - (50 / 70) * 180}
                      stroke="#38bdf8"
                      strokeWidth="2"
                    />
                    <circle cx="80" cy={200 - (10 / 70) * 180} r="4" fill="#38bdf8" />
                    <circle cx="620" cy={200 - (50 / 70) * 180} r="4" fill="#38bdf8" />
                    <text x="460" y={200 - (40 / 70) * 180 - 8} fill="#38bdf8" fontSize="9" fontWeight="bold">B₂: +40p₁+10</text>
                  </g>
                )}

                {/* Line 3: (0, 30) to (1, 60) */}
                {showLine3 && (
                  <g>
                    <line
                      x1="80"
                      y1={200 - (30 / 70) * 180}
                      x2="620"
                      y2={200 - (60 / 70) * 180}
                      stroke="#a855f7"
                      strokeWidth="2"
                    />
                    <circle cx="80" cy={200 - (30 / 70) * 180} r="4" fill="#a855f7" />
                    <circle cx="620" cy={200 - (60 / 70) * 180} r="4" fill="#a855f7" />
                    <text x="250" y={200 - (40 / 70) * 180 - 8} fill="#a855f7" fontSize="9" fontWeight="bold">B₃: +30p₁+30</text>
                  </g>
                )}

                {/* Line 4: (0, 50) to (1, 30) */}
                {showLine4 && (
                  <g>
                    <line
                      x1="80"
                      y1={200 - (50 / 70) * 180}
                      x2="620"
                      y2={200 - (30 / 70) * 180}
                      stroke="#fbbf24"
                      strokeWidth="2"
                    />
                    <circle cx="80" cy={200 - (50 / 70) * 180} r="4" fill="#fbbf24" />
                    <circle cx="620" cy={200 - (30 / 70) * 180} r="4" fill="#fbbf24" />
                    <text x="200" y={200 - (45 / 70) * 180 - 8} fill="#fbbf24" fontSize="9" fontWeight="bold">B₄: −20p₁+50</text>
                  </g>
                )}

                {/* Active Intersection Point */}
                {hasValidIntersect && (
                  <g>
                    <circle
                      cx={80 + intersectP1 * 540}
                      cy={200 - (intersectVal / 70) * 180}
                      r="6"
                      fill="#34d399"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                    />
                    <text
                      x={80 + intersectP1 * 540}
                      y={200 - (intersectVal / 70) * 180 - 12}
                      fill="#34d399"
                      fontSize="10"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      ({intersectP1.toFixed(2)}, ₹{intersectVal.toFixed(1)}k)
                    </text>
                  </g>
                )}
              </svg>
            </div>

            {/* Line Pair Intersection Inspector */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 font-mono text-xs">
              <div className="flex items-center space-x-3">
                <span className="text-slate-400 font-sans">Select Line Pair:</span>
                <select
                  value={pairLineA}
                  onChange={(e) => setPairLineA(parseInt(e.target.value, 10))}
                  className="bg-slate-900 text-white border border-slate-700 rounded-lg px-2 py-1"
                &gt;
                  {lines.map((l) => (
                    <option key={l.id} value={l.id}>{l.name}</option>
                  ))}
                </select>
                <span className="text-slate-500 font-bold">&</span>
                <select
                  value={pairLineB}
                  onChange={(e) => setPairLineB(parseInt(e.target.value, 10))}
                  className="bg-slate-900 text-white border border-slate-700 rounded-lg px-2 py-1"
                &gt;
                  {lines.map((l) => (
                    <option key={l.id} value={l.id}>{l.name}</option>
                  ))}
                </select>
              </div>

              <div className="text-right">
                <span className="text-slate-400 font-sans block text-xs">Intersection Result:</span>
                {hasValidIntersect ? (
                  <span className="text-emerald-300 font-bold text-sm">
                    p₁* = {intersectP1.toFixed(3)} | Payoff = ₹{(intersectVal * 1000).toLocaleString('en-IN')}
                  </span>
                ) : (
                  <span className="text-rose-400 font-bold text-xs">
                    Lines are parallel or intersect outside [0, 1]
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Intersection Algebra */}
        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          data-index="2"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 font-bold text-sm">
                03
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Closed-Form Line Intersection Formulation
              </h2>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-3 text-xs sm:text-sm font-mono">
              <p className="text-slate-300 font-sans leading-relaxed">
                To find the exact intersection of two strategy lines B_j and B_k:
              </p>
              <div className="p-3 bg-slate-900 rounded-lg text-emerald-300 font-bold">
                p₁ = (a₂ₖ − a₂ⱼ) / [(a₁ⱼ − a₂ⱼ) − (a₁ₖ − a₂ₖ)] = (a₂ₖ − a₂ⱼ) / (m_j − m_k)
              </div>
              <p className="text-slate-400 text-xs">
                Substitute p₁ into either line equation to compute the exact Game Value v* in Indian Rupees (₹).
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Strategy Line Anatomy SVG */}
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
                Strategy Line Plotting Anatomy Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 180"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Left Axis */}
                <line x1="80" y1="20" x2="80" y2="160" stroke="#64748b" strokeWidth="2" />
                <text x="80" y="15" fill="#f87171" fontSize="10" fontWeight="bold" textAnchor="middle">Left: (0, a₂ⱼ)</text>

                {/* Right Axis */}
                <line x1="660" y1="20" x2="660" y2="160" stroke="#64748b" strokeWidth="2" />
                <text x="660" y="15" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">Right: (1, a₁ⱼ)</text>

                {/* Line */}
                <line x1="80" y1="130" x2="660" y2="50" stroke="#38bdf8" strokeWidth="2.5" />
                <circle cx="80" cy="130" r="5" fill="#f87171" />
                <circle cx="660" cy="50" r="5" fill="#38bdf8" />

                <text x="370" y="80" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
                  E_j(p₁) = (a₁ⱼ − a₂ⱼ)p₁ + a₂ⱼ &nbsp; (Slope m = a₁ⱼ − a₂ⱼ)
                </text>
                <text x="370" y="115" fill="#a7f3d0" fontSize="9" textAnchor="middle">
                  Connects Pure Strategy A₂ Payoff on Left to Pure Strategy A₁ Payoff on Right
                </text>
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 5: Bengal Case Studies */}
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
                Bengal Operations Research Strategy Line Plotting Case Studies
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
                  <p className="text-sky-300 font-semibold">💡 <strong>Operations Takeaway:</strong> {cs.lesson}</p>
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
                  trap: 'Reversing Left and Right Coordinates (Placing a₁ⱼ on the Left Axis)',
                  fix: 'Left axis is p₁=0 (Row 2 payoff a₂ⱼ); Right axis is p₁=1 (Row 1 payoff a₁ⱼ).',
                },
                {
                  trap: 'Using Non-Uniform Scale Increments on Left vs Right Axes',
                  fix: 'Both vertical axes must share the exact same scale to ensure correct visual intersection geometry.',
                },
                {
                  trap: 'Calculating Intersection Points for Parallel Lines (m_j = m_k)',
                  fix: 'Parallel lines never intersect; the line with smaller payoff is dominated.',
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
                  Think of plotting strategy lines like connecting string between two parallel rulers: mark the Row 2 number on the left ruler and the Row 1 number on the right ruler, then stretch the string tight!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how equating Line 1 and Line 2 yields p₁ = 0.50, and substituting p₁ = 0.50 gives an exact payoff of ₹30,000!
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
                'Calibrated dual vertical axes (p₁=0 and p₁=1)',
                'Plotted correct endpoints: (0, a₂ⱼ) and (1, a₁ⱼ)',
                'Calculated slopes m_j = a₁ⱼ − a₂ⱼ and classified ascending/descending',
                'Solved exact intersection coordinates algebraically',
                'Reported all coordinates and payoffs in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: Plotting strategy lines with high precision is the cornerstone of the graphical method. In our next topic (Topic 4), we will focus on Finding the Optimal Mixed Strategy Graphically!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Plotting Strategy Lines FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Plotting Strategy Lines (2×n and m×2 Games)"
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
