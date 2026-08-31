// src/components/study/quantitative-analysis/topics/005_004_mixed-strategy/Topic4.jsx
// React 19 Function-based Component
// Module: 005_004_mixed-strategy
// Topic 4: Determining optimal probabilities

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

  // 2x2 Matrix Payoffs (in ₹ Thousands) - Default: [[50, 20], [10, 60]]
  const [matrix, setMatrix] = useState([
    [50, 20],
    [10, 60],
  ]);

  const updateCell = (r, c, val) => {
    const next = matrix.map((row, ri) =>
      row.map((cell, ci) => (ri === r && ci === c ? Number(val) : cell))
    );
    setMatrix(next);
  };

  const a11 = matrix[0][0];
  const a12 = matrix[0][1];
  const a21 = matrix[1][0];
  const a22 = matrix[1][1];

  // Oddments calculations
  const oddmentRow1 = Math.abs(a21 - a22); // Placed at Row 1 (from Row 2)
  const oddmentRow2 = Math.abs(a11 - a12); // Placed at Row 2 (from Row 1)
  const totalRowOddments = oddmentRow1 + oddmentRow2;

  const oddmentCol1 = Math.abs(a12 - a22); // Placed at Col 1 (from Col 2)
  const oddmentCol2 = Math.abs(a11 - a21); // Placed at Col 2 (from Col 1)
  const totalColOddments = oddmentCol1 + oddmentCol2;

  // Normalized probabilities
  const p1 = totalRowOddments > 0 ? oddmentRow1 / totalRowOddments : 0.5;
  const p2 = totalRowOddments > 0 ? oddmentRow2 / totalRowOddments : 0.5;

  const q1 = totalColOddments > 0 ? oddmentCol1 / totalColOddments : 0.5;
  const q2 = totalColOddments > 0 ? oddmentCol2 / totalColOddments : 0.5;

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
      title: '1. Foundry Shift Ratio via Oddments (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Evaluated matrix [[₹30k, ₹0], [₹0, ₹60k]] in Barrackpore. Row oddments: Row 1 = 60, Row 2 = 30. Total = 90. Optimal ratio p* = [2/3, 1/3], optimizing furnace allocation.',
      lesson: 'The oddments method yields instant fraction ratios for operational resource loading.',
    },
    {
      title: '2. Cold-Chain Logistics Oddments Verification (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Used column oddments on [[₹20k, ₹10k], [₹5k, ₹30k]] in Kolkata. Col oddments: Col 1 = 20, Col 2 = 15. Optimal fleet split q* = [4/7, 3/7], minimizing breakdown variance.',
      lesson: 'Oddments verification provides instant validation of fleet dispatch mixes.',
    },
    {
      title: '3. Supermarket FMCG Retail Promotional Oddments (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Calculated oddments on [[₹50k, ₹20k], [₹10k, ₹60k]] in Ichapur. Row 1 = 50, Row 2 = 30. Total = 80. p* = [5/8, 3/8] (62.5% Friday, 37.5% Sunday), securing retail revenues.',
      lesson: 'Oddments simplify multi-day promotional allocation ratios.',
    },
    {
      title: '4. Educational High-Tech Lab Research Ratios (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Converted patent dispute matrices into oddments ratios in Jadavpur, determining exact 50-50 mixed legal positions to secure ₹15 Lakh in university royalties.',
      lesson: 'Oddments methods enable transparent institutional negotiations.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes oddGlow {
          0%, 100% { border-color: rgba(245, 158, 11, 0.3); }
          50% { border-color: rgba(245, 158, 11, 0.8); }
        }
        .glow-odd {
          animation: oddGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-amber-950/80 text-amber-400 border border-amber-800/60">
              Segment 5 • Module 005_004 • Topic 4
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-amber-950/80 text-amber-400 border border-amber-800/60">
              Oddments Method • Rule of Differences • Cross-Assignment
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
            Determining Optimal Probabilities
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive study of <span className="text-amber-400 font-semibold">Determining Optimal Mixed Probabilities</span>: mastering the classical <span className="text-sky-400 font-semibold">Oddments Method (Rule of Differences)</span>, cross-assigning row and column magnitudes, and normalizing ratios in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'oddments-protocol', label: '1. Oddments Method Protocol' },
              { id: 'interactive-oddments', label: '2. Live Oddments Visualizer' },
              { id: 'invariance-properties', label: '3. Invariance Properties' },
              { id: 'svg-oddments', label: '4. Cross-Assignment Architecture SVG' },
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

        {/* SECTION 1: Oddments Method Protocol */}
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
                The Oddments Method (Rule of Differences) Protocol
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-rose-400 font-bold">1. Row Oddments (Player A)</span>
                <p className="text-slate-300 text-xs">
                  Row 1 oddment = |a₂₁ − a₂₂|; Row 2 oddment = |a₁₁ − a₁₂|.
                </p>
                <span className="text-rose-400 font-mono text-[11px]">Cross-assign row differences</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-bold">2. Column Oddments (Player B)</span>
                <p className="text-slate-300 text-xs">
                  Col 1 oddment = |a₁₂ − a₂₂|; Col 2 oddment = |a₁₁ − a₂₁|.
                </p>
                <span className="text-sky-400 font-mono text-[11px]">Cross-assign col differences</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-bold">3. Sum Equality Law</span>
                <p className="text-slate-300 text-xs">
                  Total Row Oddments (O_A) ALWAYS equals Total Column Oddments (O_B) = |Δ|!
                </p>
                <span className="text-emerald-400 font-mono text-[11px]">O_A == O_B == |Δ|</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Live Oddments Visualizer */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-odd">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Oddments Method Visualizer & Calculator
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Edit the 2x2 matrix cells (in ₹ Thousands). Observe how the row and column differences are cross-assigned and normalized:
            </p>

            {/* Matrix with Oddments Borders */}
            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3 font-mono text-xs sm:text-sm">
              <table className="w-full text-center border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2 text-left">A \ B</th>
                    <th className="p-2 text-sky-400">B₁</th>
                    <th className="p-2 text-sky-400">B₂</th>
                    <th className="p-2 text-rose-400">Row Oddments (Player A)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  <tr>
                    <td className="p-2 text-left font-bold text-rose-300">A₁</td>
                    <td className="p-2">
                      <input
                        type="number"
                        value={a11}
                        onChange={(e) => updateCell(0, 0, e.target.value)}
                        className="w-16 px-2 py-1 text-center bg-slate-900 border border-slate-700 rounded text-emerald-300 font-bold"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        value={a12}
                        onChange={(e) => updateCell(0, 1, e.target.value)}
                        className="w-16 px-2 py-1 text-center bg-slate-900 border border-slate-700 rounded text-emerald-300 font-bold"
                      />
                    </td>
                    <td className="p-2 font-bold text-rose-300 bg-rose-950/20">
                      |{a21} − {a22}| = <span className="text-white text-base">{oddmentRow1}</span> (➔ p₁ = {(p1 * 100).toFixed(1)}%)
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 text-left font-bold text-rose-300">A₂</td>
                    <td className="p-2">
                      <input
                        type="number"
                        value={a21}
                        onChange={(e) => updateCell(1, 0, e.target.value)}
                        className="w-16 px-2 py-1 text-center bg-slate-900 border border-slate-700 rounded text-emerald-300 font-bold"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="number"
                        value={a22}
                        onChange={(e) => updateCell(1, 1, e.target.value)}
                        className="w-16 px-2 py-1 text-center bg-slate-900 border border-slate-700 rounded text-emerald-300 font-bold"
                      />
                    </td>
                    <td className="p-2 font-bold text-rose-300 bg-rose-950/20">
                      |{a11} − {a12}| = <span className="text-white text-base">{oddmentRow2}</span> (➔ p₂ = {(p2 * 100).toFixed(1)}%)
                    </td>
                  </tr>
                  <tr className="border-t-2 border-slate-700 bg-slate-900/40">
                    <td className="p-2 text-left font-bold text-sky-400">Col Oddments (Player B)</td>
                    <td className="p-2 font-bold text-sky-300 bg-sky-950/20">
                      |{a12} − {a22}| = <span className="text-white text-base">{oddmentCol1}</span> (➔ q₁ = {(q1 * 100).toFixed(1)}%)
                    </td>
                    <td className="p-2 font-bold text-sky-300 bg-sky-950/20">
                      |{a11} − {a21}| = <span className="text-white text-base">{oddmentCol2}</span> (➔ q₂ = {(q2 * 100).toFixed(1)}%)
                    </td>
                    <td className="p-2 font-bold text-amber-400 bg-amber-950/20">
                      Total Oddments: O_A = {totalRowOddments}, O_B = {totalColOddments}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                <span className="text-rose-400 font-sans font-bold">Player A Optimal Strategy Vector p*:</span>
                <div className="p-3 bg-slate-900 rounded-lg text-rose-300 font-bold text-center text-base">
                  p* = [{oddmentRow1}/{totalRowOddments}, {oddmentRow2}/{totalRowOddments}]ᵀ = [{(p1 * 100).toFixed(1)}%, {(p2 * 100).toFixed(1)}%]ᵀ
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                <span className="text-sky-400 font-sans font-bold">Player B Optimal Strategy Vector q*:</span>
                <div className="p-3 bg-slate-900 rounded-lg text-sky-300 font-bold text-center text-base">
                  q* = [{oddmentCol1}/{totalColOddments}, {oddmentCol2}/{totalColOddments}]ᵀ = [{(q1 * 100).toFixed(1)}%, {(q2 * 100).toFixed(1)}%]ᵀ
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Invariance Properties */}
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
                Invariance Properties of Optimal Strategy Probabilities
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                <span className="text-emerald-400 font-bold">1. Scale Invariance (Multiplication by k &gt; 0):</span>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Multiplying all matrix entries by a positive scalar k scales both the oddments and the total sum by k, canceling out in p* and q*. The optimal probabilities remain <strong>100% unchanged</strong>!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                <span className="text-cyan-400 font-bold">2. Shift Invariance (Addition of Constant c):</span>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Adding a fixed constant c in ₹ to every entry does not alter the absolute differences |a_ij − a_kl|. The optimal probabilities p* and q* remain <strong>100% unchanged</strong>!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Cross-Assignment Architecture SVG */}
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
                Oddments Cross-Assignment Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 180"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* 2x2 Matrix Block */}
                <rect x="50" y="35" width="220" height="110" rx="8" fill="#1e293b" stroke="#818cf8" strokeWidth="2" />
                <text x="160" y="60" fill="#818cf8" fontSize="11" fontWeight="bold" textAnchor="middle">2 × 2 Matrix</text>
                <text x="160" y="85" fill="#34d399" fontSize="9" textAnchor="middle">Row 1: [50, 20]  ➔  Diff = 30</text>
                <text x="160" y="110" fill="#f87171" fontSize="9" textAnchor="middle">Row 2: [10, 60]  ➔  Diff = 50</text>

                {/* Cross Assignment Arrows */}
                <path d="M 270 85 Q 330 65 390 65" fill="none" stroke="#f59e0b" strokeWidth="2" />
                <polygon points="390,65 380,60 380,70" fill="#f59e0b" />

                <path d="M 270 110 Q 330 130 390 130" fill="none" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="390,130 380,125 380,135" fill="#38bdf8" />

                {/* Output Probabilities */}
                <rect x="390" y="35" width="300" height="110" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="540" y="60" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">Cross-Assigned Probabilities</text>
                <text x="540" y="85" fill="#ffffff" fontSize="9" textAnchor="middle">Row 1 gets Row 2 Diff: p₁* = 50 / 80 = 5/8 (62.5%)</text>
                <text x="540" y="105" fill="#ffffff" fontSize="9" textAnchor="middle">Row 2 gets Row 1 Diff: p₂* = 30 / 80 = 3/8 (37.5%)</text>
                <text x="540" y="125" fill="#fde68a" fontSize="8" textAnchor="middle">Total Sum = 1.0 (100% Normalized)</text>
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
                Bengal Operations Research Oddments Case Studies
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
                  trap: 'Placing Row 1 Difference Directly Opposite Row 1 (Forgetting to Cross-Assign)',
                  fix: 'Row 1 gets the magnitude difference of Row 2; Row 2 gets the magnitude difference of Row 1.',
                },
                {
                  trap: 'Placing Negative Oddments (Taking Signed Differences)',
                  fix: 'Oddments are always positive absolute magnitudes: |a₂₁ − a₂₂| and |a₁₁ − a₁₂|.',
                },
                {
                  trap: 'Using the Oddments Method on a Matrix with a Pure Saddle Point',
                  fix: 'The oddments method is valid ONLY when the game has no saddle point and no dominated strategies.',
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
                  Think of the oddments method like balancing a seesaw: the weight you place on Player A's first strategy is proportional to how volatile Player B's payoffs are in Row 2!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how the sum of row oddments O_A is always exactly equal to the sum of column oddments O_B, confirming mathematical consistency!
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
                'Mastered the Oddments Method for Player A: cross-assign row differences',
                'Mastered the Oddments Method for Player B: cross-assign column differences',
                'Verified that total row oddments O_A equals total column oddments O_B',
                'Verified scale and shift invariance of optimal probabilities',
                'Reported strategy ratios and expected values in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: The Oddments Method is your fastest arithmetic shortcut for 2x2 games! Remember the cross-assignment rule: Row 1 gets Row 2's difference, and Row 2 gets Row 1's difference. In our next topic (Topic 5), we will explore all methods for Finding the Value of the Game v* in Indian Rupees (₹)!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Determining Optimal Probabilities FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Determining Optimal Probabilities"
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
