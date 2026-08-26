// src/components/study/quantitative-analysis/topics/005_006_2xn-and-m-x-2-cases-graphical-and-algebraic-methods/Topic2.jsx
// React 19 Function-based Component
// Module: 005_006_2xn-and-m-x-2-cases-graphical-and-algebraic-methods
// Topic 2: Graphical method

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic2_files/topic2_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic2_files/topic2_note.txt?raw';

const Topic2 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [gameType, setGameType] = useState('2xn'); // '2xn' | 'mx2'
  const [probValue, setProbValue] = useState(0.5);

  // 2x4 Matrix (in ₹ Thousands)
  const matrix2x4 = [
    [20, 50, 60, 30],
    [40, 10, 30, 50],
  ];

  // 4x2 Matrix (in ₹ Thousands)
  const matrix4x2 = [
    [20, 50],
    [40, 10],
    [30, 60],
    [50, 20],
  ];

  // 2x4 Line Calculations: E_j(p1) = (a1j - a2j)*p1 + a2j
  const line2x4_1 = (matrix2x4[0][0] - matrix2x4[1][0]) * probValue + matrix2x4[1][0];
  const line2x4_2 = (matrix2x4[0][1] - matrix2x4[1][1]) * probValue + matrix2x4[1][1];
  const line2x4_3 = (matrix2x4[0][2] - matrix2x4[1][2]) * probValue + matrix2x4[1][2];
  const line2x4_4 = (matrix2x4[0][3] - matrix2x4[1][3]) * probValue + matrix2x4[1][3];
  const lowerEnvelopeVal = Math.min(line2x4_1, line2x4_2, line2x4_3, line2x4_4);

  // 4x2 Line Calculations: E_i(q1) = (ai1 - ai2)*q1 + ai2
  const line4x2_1 = (matrix4x2[0][0] - matrix4x2[0][1]) * probValue + matrix4x2[0][1];
  const line4x2_2 = (matrix4x2[1][0] - matrix4x2[1][1]) * probValue + matrix4x2[1][1];
  const line4x2_3 = (matrix4x2[2][0] - matrix4x2[2][1]) * probValue + matrix4x2[2][1];
  const line4x2_4 = (matrix4x2[3][0] - matrix4x2[3][1]) * probValue + matrix4x2[3][1];
  const upperEnvelopeVal = Math.max(line4x2_1, line4x2_2, line4x2_3, line4x2_4);

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
      title: '1. Foundry 2x4 Alloy Tender Selection (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Debangshu in Barrackpore plotted 4 tender options over p1 in [0, 1]. The lower envelope peak occurred at the intersection of Columns {1, 2}, instantly identifying the 2x2 core game and securing v* = ₹30,000 without Simplex LP.',
      lesson: 'The graphical method instantly extracts the active sub-game from multi-option tenders.',
    },
    {
      title: '2. Cold-Chain Transport Line Analysis (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Plotted 3 transport lines over q1 in [0, 1] in Kolkata. Constructing the upper envelope identified the Minimax trough at Rows {1, 2}, capping emergency transport expenditure at ₹24,000.',
      lesson: 'Graphical upper envelope troughs provide auditable risk ceilings.',
    },
    {
      title: '3. Supermarket FMCG Promotional Campaign (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Analyzed 4 competitor retaliation lines across p1 in [0, 1] in Ichapur. The Maximin peak pinpointed the exact 50-50 marketing allocation to guarantee ₹32,000.',
      lesson: '2xn graphical envelopes eliminate competitor retaliation vulnerabilities.',
    },
    {
      title: '4. Educational High-Tech Lab Patent Dispute (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Used the mx2 graphical upper envelope method in Jadavpur on a 4x2 arbitration grid, finding the exact minimax compromise point of ₹20 Lakh between research departments.',
      lesson: 'Graphical line intersections offer visual transparency in high-stakes negotiations.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes graphGlow2 {
          0%, 100% { border-color: rgba(99, 102, 241, 0.3); }
          50% { border-color: rgba(99, 102, 241, 0.8); }
        }
        .glow-graph2 {
          animation: graphGlow2 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-indigo-950/80 text-indigo-400 border border-indigo-800/60">
              Segment 5 • Module 005_006 • Topic 2
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-indigo-950/80 text-indigo-400 border border-indigo-800/60">
              Graphical Method • 1D Simplex • Maximin & Minimax in ₹
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            The Graphical Method (2×n & m×2 Games)
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive study of the <span className="text-indigo-400 font-semibold">Graphical Method</span>: exploring why 1D probability simplices enable 2D straight-line plotting, mastering the <span className="text-amber-400 font-semibold">2×n Lower Envelope Maximin Peak</span> and <span className="text-rose-400 font-semibold">m×2 Upper Envelope Minimax Trough</span>, and extracting active 2×2 sub-games in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'geometric-theory', label: '1. Geometric Simplex Foundation' },
              { id: 'interactive-simulator', label: '2. Dual Graphical Simulator' },
              { id: 'subgame-extraction', label: '3. 2x2 Sub-Game Extraction' },
              { id: 'svg-coordinate-frame', label: '4. Graphical Coordinates SVG' },
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
              &gt;
                {item.label}
              </button>
            ))}
          </div>
        </header>

        {/* SECTION 1: Geometric Simplex Foundation */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 font-bold text-sm">
                01
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Geometric Simplex Foundation of the Graphical Method
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                <span className="text-amber-400 font-sans font-bold">2×n Games (Player A has 2 actions):</span>
                <p className="text-slate-300 text-xs">
                  • Strategy space = 1D Simplex: p₁ + p₂ = 1 ➔ p₂ = 1 − p₁.
                </p>
                <p className="text-slate-300 text-xs">
                  • Construct <strong>Lower Envelope</strong>: min_{`{j}`} E(p, B_j).
                </p>
                <p className="text-emerald-300 font-bold text-xs">
                  • Maximin Peak = highest point on lower envelope!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                <span className="text-rose-400 font-sans font-bold">m×2 Games (Player B has 2 actions):</span>
                <p className="text-slate-300 text-xs">
                  • Strategy space = 1D Simplex: q₁ + q₂ = 1 ➔ q₂ = 1 − q₁.
                </p>
                <p className="text-slate-300 text-xs">
                  • Construct <strong>Upper Envelope</strong>: max_{`{i}`} E(A_i, q).
                </p>
                <p className="text-emerald-300 font-bold text-xs">
                  • Minimax Trough = lowest point on upper envelope!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Dual Graphical Simulator */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-graph2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 font-bold text-sm">
                  02
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Interactive Dual Graphical Method Simulator
                </h2>
              </div>

              {/* Mode Toggle */}
              <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800">
                <button
                  onClick={() => setGameType('2xn')}
                  className={clsx(
                    'px-3 py-1 rounded-lg text-xs font-semibold transition-all',
                    gameType === '2xn'
                      ? 'bg-amber-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  )}
                &gt;
                  2×4 Game (Lower Envelope)
                </button>
                <button
                  onClick={() => setGameType('mx2')}
                  className={clsx(
                    'px-3 py-1 rounded-lg text-xs font-semibold transition-all',
                    gameType === 'mx2'
                      ? 'bg-rose-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  )}
                &gt;
                  4×2 Game (Upper Envelope)
                </button>
              </div>
            </div>

            {/* Matrix View */}
            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3 font-mono text-xs sm:text-sm">
              {gameType === '2xn' ? (
                <table className="w-full text-center border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="p-2 text-left">A \ B</th>
                      <th className="p-2 text-sky-400">B₁: −20p₁ + 40</th>
                      <th className="p-2 text-sky-400">B₂: +40p₁ + 10</th>
                      <th className="p-2 text-sky-400">B₃: +30p₁ + 30</th>
                      <th className="p-2 text-sky-400">B₄: −20p₁ + 50</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-200">
                    <tr>
                      <td className="p-2 text-left font-bold text-rose-300">A₁ (p₁ = {probValue.toFixed(2)})</td>
                      <td className="p-2">₹20k</td>
                      <td className="p-2">₹50k</td>
                      <td className="p-2">₹60k</td>
                      <td className="p-2">₹30k</td>
                    </tr>
                    <tr>
                      <td className="p-2 text-left font-bold text-rose-300">A₂ (p₂ = {(1 - probValue).toFixed(2)})</td>
                      <td className="p-2">₹40k</td>
                      <td className="p-2">₹10k</td>
                      <td className="p-2">₹30k</td>
                      <td className="p-2">₹50k</td>
                    </tr>
                    <tr className="bg-amber-950/20 border-t-2 border-amber-600/40">
                      <td className="p-2 text-left font-bold text-amber-300">Expected Payoffs:</td>
                      <td className="p-2 font-bold text-amber-300">₹{line2x4_1.toFixed(1)}k</td>
                      <td className="p-2 font-bold text-amber-300">₹{line2x4_2.toFixed(1)}k</td>
                      <td className="p-2 font-bold text-amber-300">₹{line2x4_3.toFixed(1)}k</td>
                      <td className="p-2 font-bold text-amber-300">₹{line2x4_4.toFixed(1)}k</td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <table className="w-full text-center border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="p-2 text-left">A \ B</th>
                      <th className="p-2 text-sky-400">B₁ (q₁ = {probValue.toFixed(2)})</th>
                      <th className="p-2 text-sky-400">B₂ (q₂ = {(1 - probValue).toFixed(2)})</th>
                      <th className="p-2 text-rose-400">Expected Payout</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-200">
                    <tr>
                      <td className="p-2 text-left font-bold text-rose-300">A₁: −30q₁ + 50</td>
                      <td className="p-2">₹20k</td>
                      <td className="p-2">₹50k</td>
                      <td className="p-2 font-bold text-rose-300">₹{line4x2_1.toFixed(1)}k</td>
                    </tr>
                    <tr>
                      <td className="p-2 text-left font-bold text-rose-300">A₂: +30q₁ + 10</td>
                      <td className="p-2">₹40k</td>
                      <td className="p-2">₹10k</td>
                      <td className="p-2 font-bold text-rose-300">₹{line4x2_2.toFixed(1)}k</td>
                    </tr>
                    <tr>
                      <td className="p-2 text-left font-bold text-rose-300">A₃: −30q₁ + 60</td>
                      <td className="p-2">₹30k</td>
                      <td className="p-2">₹60k</td>
                      <td className="p-2 font-bold text-rose-300">₹{line4x2_3.toFixed(1)}k</td>
                    </tr>
                    <tr>
                      <td className="p-2 text-left font-bold text-rose-300">A₄: +30q₁ + 20</td>
                      <td className="p-2">₹50k</td>
                      <td className="p-2">₹20k</td>
                      <td className="p-2 font-bold text-rose-300">₹{line4x2_4.toFixed(1)}k</td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>

            {/* Slider */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2 font-mono text-xs">
              <div className="flex justify-between items-center text-indigo-400 font-bold">
                <span>{gameType === '2xn' ? 'Probability p₁ (A₁)' : 'Probability q₁ (B₁)'} = {probValue.toFixed(2)}</span>
                <span>{gameType === '2xn' ? 'p₂ (A₂)' : 'q₂ (B₂)'} = {(1 - probValue).toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.02"
                value={probValue}
                onChange={(e) => setProbValue(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              /&gt;
            </div>

            {/* Envelope Result */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs sm:text-sm">
              <div>
                <span className="font-bold text-white block">
                  {gameType === '2xn' ? 'Active Lower Envelope Floor:' : 'Active Upper Envelope Ceiling:'}
                </span>
                <span className="font-mono text-xs text-slate-300">
                  {gameType === '2xn'
                    ? `min(₹${line2x4_1.toFixed(1)}k, ₹${line2x4_2.toFixed(1)}k, ₹${line2x4_3.toFixed(1)}k, ₹${line2x4_4.toFixed(1)}k) = ₹${lowerEnvelopeVal.toFixed(1)}k`
                    : `max(₹${line4x2_1.toFixed(1)}k, ₹${line4x2_2.toFixed(1)}k, ₹${line4x2_3.toFixed(1)}k, ₹${line4x2_4.toFixed(1)}k) = ₹${upperEnvelopeVal.toFixed(1)}k`}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block font-sans">Solved Optimum:</span>
                <span className="font-mono font-bold text-emerald-300 text-lg">
                  {gameType === '2xn' ? 'Maximin Peak: v* = +₹30,000 (at p₁* = 0.50)' : 'Minimax Trough: v* = +₹30,000 (at q₁* = 0.67)'}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: 2x2 Sub-Game Extraction */}
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
                Sub-Game Extraction Protocol from Envelope Vertices
              </h2>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-3 text-xs sm:text-sm font-mono">
              <p className="text-slate-300 font-sans leading-relaxed">
                The peak of the lower envelope (or trough of the upper envelope) pinpoints the active 2×2 submatrix:
              </p>
              <div className="p-3 bg-slate-900 rounded-lg text-emerald-300 font-bold flex flex-col space-y-1">
                <span>• In 2×4 Game: Active Columns are B₁ and B₂ ➔ A_sub = [[20, 50], [40, 10]]</span>
                <span>• In 4×2 Game: Active Rows are A₁ and A₂ ➔ A_sub = [[20, 50], [40, 10]]</span>
                <span>• Solved Game Value: v* = (200 − 2000)/((20+10) − (50+40)) = −1800/−60 = +₹30,000!</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Graphical Coordinates SVG */}
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
                Graphical Coordinate Frame Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 180"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* 2xn Graphical Panel */}
                <rect x="30" y="20" width="320" height="140" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="190" y="45" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">2 × n Graphical Frame</text>
                <text x="190" y="70" fill="#cbd5e1" fontSize="9" textAnchor="middle">Horizontal: p₁ ∈ [0, 1]</text>
                <text x="190" y="90" fill="#cbd5e1" fontSize="9" textAnchor="middle">Vertical: Expected Payoff E(p, B_j) in ₹</text>
                <circle cx="190" cy="115" r="5" fill="#34d399" />
                <text x="190" y="135" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">Lower Envelope Maximin Peak</text>

                {/* mx2 Graphical Panel */}
                <rect x="390" y="20" width="320" height="140" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <text x="550" y="45" fill="#f43f5e" fontSize="11" fontWeight="bold" textAnchor="middle">m × 2 Graphical Frame</text>
                <text x="550" y="70" fill="#cbd5e1" fontSize="9" textAnchor="middle">Horizontal: q₁ ∈ [0, 1]</text>
                <text x="550" y="90" fill="#cbd5e1" fontSize="9" textAnchor="middle">Vertical: Expected Payout E(A_i, q) in ₹</text>
                <circle cx="550" cy="115" r="5" fill="#38bdf8" />
                <text x="550" y="135" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">Upper Envelope Minimax Trough</text>
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
                Bengal Operations Research Graphical Method Case Studies
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
                  trap: 'Attempting to Use the Graphical Method on 3x3 or 4x4 Games Without Reduction',
                  fix: 'The graphical method strictly requires ONE player to have exactly 2 strategies (1D simplex). 3x3 games require reduction first or Simplex LP.',
                },
                {
                  trap: 'Using Lower Envelope for mx2 Games (Confusing Player Roles)',
                  fix: 'In mx2 games, Player B is a minimizer whose worst-case liability is bounded by the UPPER envelope.',
                },
                {
                  trap: 'Forgetting to Audit Extracted 2x2 Sub-Game Against Unused Strategies',
                  fix: 'Always check that the solved probabilities satisfy E(p*, B_j) ≥ v* for ALL columns.',
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
                  Think of the 1D probability simplex like a tightrope between 0 and 1: as you slide your position, all strategy line values rise and fall in perfect linear harmony!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how the graphical method extracts the exact same 2x2 submatrix whether viewed from the 2x4 perspective or the transposed 4x2 perspective!
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
                'Mastered 1D simplex geometric rationale for 2-action games',
                'Plotted 2xn lines and constructed the Lower Envelope (Maximin Peak)',
                'Plotted mx2 lines and constructed the Upper Envelope (Minimax Trough)',
                'Extracted active 2x2 submatrices from apex intersections',
                'Reported all game values and payoffs in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: The graphical method is an indispensable tool in operations research. It bridges high-level game theory with intuitive visual geometry. In our next topic (Topic 3), we will deep-dive specifically into Plotting Strategy Lines!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Graphical Method FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Graphical Method for 2×n and m×2 Games"
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
