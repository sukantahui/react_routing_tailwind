// src/components/study/quantitative-analysis/topics/005_005_reduction-of-mxn-game/Topic4.jsx
// React 19 Function-based Component
// Module: 005_005_reduction-of-mxn-game
// Topic 4: Reduction to 2×n and m×2 cases

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic4_files/topic4_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic4_files/topic4_note.txt?raw';

const Topic4 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [gameMode, setGameMode] = useState('2xn'); // '2xn' | 'mx2'
  const [probSlider, setProbSlider] = useState(0.5);

  // 2x3 Matrix (in ₹ Thousands)
  // Rows A1, A2 vs Cols B1, B2, B3
  const matrix2x3 = [
    [20, 50, 60],
    [40, 10, 30],
  ];

  // 3x2 Matrix (in ₹ Thousands)
  // Rows A1, A2, A3 vs Cols B1, B2
  const matrix3x2 = [
    [20, 50],
    [40, 10],
    [30, 60],
  ];

  // 2x3 Line Calculations: E_j(p1) = p1 * a1j + (1 - p1) * a2j
  const line2x3_1 = probSlider * matrix2x3[0][0] + (1 - probSlider) * matrix2x3[1][0];
  const line2x3_2 = probSlider * matrix2x3[0][1] + (1 - probSlider) * matrix2x3[1][1];
  const line2x3_3 = probSlider * matrix2x3[0][2] + (1 - probSlider) * matrix2x3[1][2];
  const lowerEnvelopeVal = Math.min(line2x3_1, line2x3_2, line2x3_3);

  // 3x2 Line Calculations: E_i(q1) = q1 * ai1 + (1 - q1) * ai2
  const line3x2_1 = probSlider * matrix3x2[0][0] + (1 - probSlider) * matrix3x2[0][1];
  const line3x2_2 = probSlider * matrix3x2[1][0] + (1 - probSlider) * matrix3x2[1][1];
  const line3x2_3 = probSlider * matrix3x2[2][0] + (1 - probSlider) * matrix3x2[2][1];
  const upperEnvelopeVal = Math.max(line3x2_1, line3x2_2, line3x2_3);

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
      title: '1. Foundry 2x4 Alloy Tender Line Analysis (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Debangshu in Barrackpore reduced a 4x4 matrix to a 2x4 game with columns [₹40k, ₹10k], [₹20k, ₹50k], [₹50k, ₹30k], and [₹60k, ₹20k]. Finding the Maximin peak of the lower envelope identified active Columns {1, 2}, yielding p* = [0.67, 0.33] and v* = ₹30,000.',
      lesson: '2xn lower envelopes identify active competitive sub-games visually.',
    },
    {
      title: '2. Cold-Chain Logistics 3x2 Transport Line Analysis (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Reduced an emergency dispatch matrix to a 3x2 game in Kolkata. Constructing the upper envelope identified the Minimax trough at Rows {1, 2}, locking in ₹24,000.',
      lesson: 'mx2 upper envelopes provide liability capping for logistical coordinators.',
    },
    {
      title: '3. Supermarket FMCG Retail 2x3 Weekend Discount Wars (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Reduced a 6x3 retail game to 2x3 in Ichapur, using the lower envelope peak to determine optimal Friday vs Sunday advertising mix and securing ₹32,000.',
      lesson: 'Lower envelope peaks eliminate guess-work in multi-competitor pricing.',
    },
    {
      title: '4. Educational High-Tech Lab 4x2 Patent Dispute (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Used the mx2 graphical upper envelope method in Jadavpur on a 4x2 arbitration grid, finding the exact minimax compromise point of ₹20 Lakh between research departments.',
      lesson: 'Envelope intersections provide auditable arbitration settlements.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes envGlow {
          0%, 100% { border-color: rgba(14, 165, 233, 0.3); }
          50% { border-color: rgba(14, 165, 233, 0.8); }
        }
        .glow-env {
          animation: envGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Segment 5 • Module 005_005 • Topic 4
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              2×n & m×2 Reduction • Lower/Upper Envelopes • Maximin/Minimax in ₹
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Reduction to 2×n and m×2 Cases
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive study of <span className="text-sky-400 font-semibold">Reducing Matrices to 2×n and m×2 Cases</span>: understanding when matrices do not reduce directly to 2×2, mastering the <span className="text-amber-400 font-semibold">2×n Lower Envelope (Maximin Peak)</span> and <span className="text-rose-400 font-semibold">m×2 Upper Envelope (Minimax Trough)</span>, and extracting active sub-games in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'envelopes-theory', label: '1. Lower vs Upper Envelopes' },
              { id: 'interactive-studio', label: '2. Graphical Envelope Studio' },
              { id: 'subgame-extraction', label: '3. 2x2 Active Extraction' },
              { id: 'svg-envelopes', label: '4. Envelopes Architecture SVG' },
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
              >
                {item.label}
              </button>
            ))}
          </div>
        </header>

        {/* SECTION 1: Lower vs Upper Envelopes */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                01
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                2×n Lower Envelope vs m×2 Upper Envelope Principles
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                <span className="text-amber-400 font-sans font-bold">2×n Games (2 Rows, n ≥ 3 Cols):</span>
                <p className="text-slate-300 text-xs">
                  • Parameterize Player A: p = [p₁, 1−p₁]ᵀ.
                </p>
                <p className="text-slate-300 text-xs">
                  • Construct <strong>Lower Envelope</strong>: min_{`{j}`} E(p, B_j).
                </p>
                <p className="text-emerald-300 font-bold text-xs">
                  • Maximin Peak = highest point on lower envelope!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                <span className="text-rose-400 font-sans font-bold">m×2 Games (m ≥ 3 Rows, 2 Cols):</span>
                <p className="text-slate-300 text-xs">
                  • Parameterize Player B: q = [q₁, 1−q₁]ᵀ.
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

        {/* SECTION 2: Graphical Envelope Studio */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-env">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                  02
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Interactive Graphical Envelope Studio
                </h2>
              </div>

              {/* Mode Toggle */}
              <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800">
                <button
                  onClick={() => setGameMode('2xn')}
                  className={clsx(
                    'px-3 py-1 rounded-lg text-xs font-semibold transition-all',
                    gameMode === '2xn'
                      ? 'bg-amber-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  )}
                >
                  2×3 Game (Lower Envelope)
                </button>
                <button
                  onClick={() => setGameMode('mx2')}
                  className={clsx(
                    'px-3 py-1 rounded-lg text-xs font-semibold transition-all',
                    gameMode === 'mx2'
                      ? 'bg-rose-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  )}
                >
                  3×2 Game (Upper Envelope)
                </button>
              </div>
            </div>

            {/* Matrix View */}
            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3 font-mono text-xs sm:text-sm">
              {gameMode === '2xn' ? (
                <table className="w-full text-center border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="p-2 text-left">A \ B</th>
                      <th className="p-2 text-sky-400">B₁ Line: 20p₁ + 40(1−p₁)</th>
                      <th className="p-2 text-sky-400">B₂ Line: 50p₁ + 10(1−p₁)</th>
                      <th className="p-2 text-sky-400">B₃ Line: 60p₁ + 30(1−p₁)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-200">
                    <tr>
                      <td className="p-2 text-left font-bold text-rose-300">A₁ (p₁ = {probSlider.toFixed(2)})</td>
                      <td className="p-2">₹20k</td>
                      <td className="p-2">₹50k</td>
                      <td className="p-2">₹60k</td>
                    </tr>
                    <tr>
                      <td className="p-2 text-left font-bold text-rose-300">A₂ (p₂ = {(1 - probSlider).toFixed(2)})</td>
                      <td className="p-2">₹40k</td>
                      <td className="p-2">₹10k</td>
                      <td className="p-2">₹30k</td>
                    </tr>
                    <tr className="bg-amber-950/20 border-t-2 border-amber-600/40">
                      <td className="p-2 text-left font-bold text-amber-300">Expected Payoffs at p₁:</td>
                      <td className="p-2 font-bold text-amber-300">₹{line2x3_1.toFixed(1)}k</td>
                      <td className="p-2 font-bold text-amber-300">₹{line2x3_2.toFixed(1)}k</td>
                      <td className="p-2 font-bold text-amber-300">₹{line2x3_3.toFixed(1)}k</td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <table className="w-full text-center border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="p-2 text-left">A \ B</th>
                      <th className="p-2 text-sky-400">B₁ (q₁ = {probSlider.toFixed(2)})</th>
                      <th className="p-2 text-sky-400">B₂ (q₂ = {(1 - probSlider).toFixed(2)})</th>
                      <th className="p-2 text-rose-400">Expected Payout at q₁</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-200">
                    <tr>
                      <td className="p-2 text-left font-bold text-rose-300">A₁ (20q₁ + 50q₂)</td>
                      <td className="p-2">₹20k</td>
                      <td className="p-2">₹50k</td>
                      <td className="p-2 font-bold text-rose-300">₹{line3x2_1.toFixed(1)}k</td>
                    </tr>
                    <tr>
                      <td className="p-2 text-left font-bold text-rose-300">A₂ (40q₁ + 10q₂)</td>
                      <td className="p-2">₹40k</td>
                      <td className="p-2">₹10k</td>
                      <td className="p-2 font-bold text-rose-300">₹{line3x2_2.toFixed(1)}k</td>
                    </tr>
                    <tr>
                      <td className="p-2 text-left font-bold text-rose-300">A₃ (30q₁ + 60q₂)</td>
                      <td className="p-2">₹30k</td>
                      <td className="p-2">₹60k</td>
                      <td className="p-2 font-bold text-rose-300">₹{line3x2_3.toFixed(1)}k</td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>

            {/* Slider */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2 font-mono text-xs">
              <div className="flex justify-between items-center text-sky-400 font-bold">
                <span>{gameMode === '2xn' ? 'Player A Probability: p₁' : 'Player B Probability: q₁'} = {probSlider.toFixed(2)}</span>
                <span>{gameMode === '2xn' ? 'p₂' : 'q₂'} = {(1 - probSlider).toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.02"
                value={probSlider}
                onChange={(e) => setProbSlider(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
              />
            </div>

            {/* Envelope Assessment Card */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs sm:text-sm">
              <div>
                <span className="font-bold text-white block">
                  {gameMode === '2xn' ? '2×3 Lower Envelope Value:' : '3×2 Upper Envelope Value:'}
                </span>
                <span className="font-mono text-xs text-slate-300">
                  {gameMode === '2xn'
                    ? `min(₹${line2x3_1.toFixed(1)}k, ₹${line2x3_2.toFixed(1)}k, ₹${line2x3_3.toFixed(1)}k) = ₹${lowerEnvelopeVal.toFixed(1)}k`
                    : `max(₹${line3x2_1.toFixed(1)}k, ₹${line3x2_2.toFixed(1)}k, ₹${line3x2_3.toFixed(1)}k) = ₹${upperEnvelopeVal.toFixed(1)}k`}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block font-sans">Active Optimum:</span>
                <span className="font-mono font-bold text-emerald-300 text-lg">
                  {gameMode === '2xn' ? 'Maximin Peak: v* = +₹30,000 (at p₁* = 0.50)' : 'Minimax Trough: v* = +₹30,000 (at q₁* = 0.67)'}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: 2x2 Active Extraction */}
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
                Sub-Game Extraction from Envelope Vertices
              </h2>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-3 text-xs sm:text-sm font-mono">
              <p className="text-slate-300 font-sans leading-relaxed">
                The optimal peak/trough is formed by the intersection of the two active lines:
              </p>
              <div className="p-3 bg-slate-900 rounded-lg text-emerald-300 font-bold flex flex-col space-y-1">
                <span>• In 2×3 Game: Intersection of Line B₁ (20p₁+40(1-p₁)) and Line B₂ (50p₁+10(1-p₁))</span>
                <span>• Extracted 2×2 Submatrix: A_sub = [[20, 50], [40, 10]]</span>
                <span>• Solved Game Value: v* = (200 − 2000) / ((20+10) − (50+40)) = −1800 / −60 = +₹30,000!</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Envelopes Architecture SVG */}
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
                Lower Envelope (2×n) vs Upper Envelope (m×2) Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 180"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* 2xn Panel */}
                <rect x="30" y="20" width="320" height="140" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="190" y="45" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">2 × n Games (Lower Envelope)</text>
                <text x="190" y="70" fill="#cbd5e1" fontSize="9" textAnchor="middle">Player A parameterizes p₁ ∈ [0, 1]</text>
                <text x="190" y="90" fill="#cbd5e1" fontSize="9" textAnchor="middle">Lower boundary = min expected payoff</text>
                <circle cx="190" cy="115" r="5" fill="#34d399" />
                <text x="190" y="135" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">Maximin Peak ➔ v* in ₹</text>

                {/* mx2 Panel */}
                <rect x="390" y="20" width="320" height="140" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <text x="550" y="45" fill="#f43f5e" fontSize="11" fontWeight="bold" textAnchor="middle">m × 2 Games (Upper Envelope)</text>
                <text x="550" y="70" fill="#cbd5e1" fontSize="9" textAnchor="middle">Player B parameterizes q₁ ∈ [0, 1]</text>
                <text x="550" y="90" fill="#cbd5e1" fontSize="9" textAnchor="middle">Upper boundary = max expected payout</text>
                <circle cx="550" cy="115" r="5" fill="#38bdf8" />
                <text x="550" y="135" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">Minimax Trough ➔ v* in ₹</text>
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 5: Bengal Case Studies */}
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
                Bengal Operations Research 2×n and m×2 Case Studies
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
                  trap: 'Taking the Upper Envelope for a 2xn Game (Confusing Maximin with Minimax)',
                  fix: '2xn games require the LOWER envelope (Player A maximizes over worst-case lower floor).',
                },
                {
                  trap: 'Taking the Lower Envelope for an mx2 Game',
                  fix: 'mx2 games require the UPPER envelope (Player B minimizes over worst-case upper ceiling).',
                },
                {
                  trap: 'Selecting Intersecting Lines with the Same Sign of Slope',
                  fix: 'The optimal envelope vertex is always formed by two lines with OPPOSITE signs of slope.',
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
                  Think of the lower envelope like a tent roof supported by poles: Player A wants to stand under the highest tent peak to maximize headroom (payoff)!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how in the 2x3 game, setting p₁ = 0.50 yields ₹30,000 on Line 1 and ₹30,000 on Line 2, while Line 3 sits higher at ₹45,000!
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
                Student Revision Checklist (Topic 4)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Mastered 2xn graphical solution: Lower Envelope & Maximin Peak',
                'Mastered mx2 graphical solution: Upper Envelope & Minimax Trough',
                'Identified active intersecting lines to extract the solvable 2x2 submatrix',
                'Verified opposite slopes for intersecting boundary lines',
                'Reported all game values and expected returns in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: When an m x n game doesn't reduce all the way to 2x2, don't worry! Reducing to 2xn or mx2 allows you to solve graphically with ease. In our next topic (Topic 5), we will focus on Interpreting the Reduced Game!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="2xn and mx2 Reduction FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Reduction to 2×n and m×2 Cases"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic5_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic4;
