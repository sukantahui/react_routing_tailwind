// src/components/study/quantitative-analysis/topics/005_002_pure-strategy-and-saddle-point/Topic3.jsx
// React 19 Function-based Component
// Module: 005_002_pure-strategy-and-saddle-point
// Topic 3: Saddle point

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

  // 3x3 Payoff Matrix State (in ₹ Thousands) - Default has saddle point at (A2, B1) = ₹30k
  const [matrix, setMatrix] = useState([
    [10, 20, 15],
    [30, 40, 35],
    [20, 25, 22],
  ]);

  const updateCell = (r, c, val) => {
    const next = matrix.map((row, ri) =>
      row.map((cell, ci) => (ri === r && ci === c ? Number(val) : cell))
    );
    setMatrix(next);
  };

  // Computations
  const rowMins = matrix.map((row) => Math.min(...row));
  const colMaxs = [0, 1, 2].map((c) => Math.max(...matrix.map((row) => row[c])));
  const maximin = Math.max(...rowMins);
  const minimax = Math.min(...colMaxs);

  const hasSaddle = maximin === minimax;

  // Find all saddle points
  const saddlePoints = [];
  matrix.forEach((row, rIdx) => {
    row.forEach((cell, cIdx) => {
      if (cell === rowMins[rIdx] && cell === colMaxs[cIdx] && cell === maximin) {
        saddlePoints.push({ r: rIdx, c: cIdx, val: cell });
      }
    });
  });

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
      title: '1. Foundry Induction Furnace Saddle Point (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Analyzed a 3x3 casting tender matrix in ₹ Thousands in Barrackpore: Row Mins = [10, 30, 20]; Col Maxs = [30, 40, 35]. Maximin = Minimax = ₹30,000 at cell (A2, B1), locking in an unshakeable ₹30,000 pure profit.',
      lesson: 'A saddle point represents an unexploitable equilibrium where neither player can gain by deviating.',
    },
    {
      title: '2. Cold-Chain Hospital Vaccine Contract Saddle Point (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Proved that a pure saddle point of ₹25,000 at (A2, B2) in Kolkata established a stable out-of-court settlement, saving ₹50,000 in litigation legal fees.',
      lesson: 'Saddle point identification resolves corporate disputes with objective mathematical clarity.',
    },
    {
      title: '3. Supermarket FMCG Retail Weekend Promotion Saddle Point (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Structured a 3x2 marketing competition matrix in Ichapur, discovering a pure saddle point at (A1, B2) = ₹18,000, eliminating promotional advertising guesswork.',
      lesson: 'Pure strategy saddle points eliminate costly promotional trials.',
    },
    {
      title: '4. Educational High-Tech Lab Patent Licensing Saddle Point (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Evaluated university patent licensing terms in Jadavpur, identifying a pure saddle point of ₹55 Lakh in mutual research value between university and industry partners.',
      lesson: 'Saddle points establish fair and self-enforcing commercial agreements.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes saddleGlow {
          0%, 100% { border-color: rgba(52, 211, 153, 0.3); }
          50% { border-color: rgba(52, 211, 153, 0.8); }
        }
        .glow-saddle {
          animation: saddleGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
              Segment 5 • Module 005_002 • Topic 3
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
              Equilibrium Mechanics • Maximin = Minimax = v* • Nash Stability
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
            Saddle Point
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A microscopic study of the <span className="text-emerald-400 font-semibold">Saddle Point Concept</span>: the fundamental equilibrium condition where <span className="text-amber-400 font-mono">Maximin (α) = Minimax (β) = v*</span>, analyzing row minima and column maxima intersection, unilateral deviation stability, and pure payoffs in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'saddle-theory', label: '1. Saddle Point Criteria' },
              { id: 'interactive-hunter', label: '2. Interactive Saddle Hunter' },
              { id: 'nash-stability', label: '3. Nash Equilibrium Stability' },
              { id: 'svg-saddle', label: '4. Saddle Surface Topography SVG' },
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
              >
                {item.label}
              </button>
            ))}
          </div>
        </header>

        {/* SECTION 1: Saddle Point Criteria */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                01
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Saddle Point Criteria & Governing Equations
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-rose-400 font-bold">1. Minimum in its Row</span>
                <p className="text-slate-300 text-xs">
                  a_i*j* = min_j a_i*j (Worst-case floor for chosen row).
                </p>
                <span className="text-rose-400 font-mono text-[11px]">Row Minima Equality</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-bold">2. Maximum in its Column</span>
                <p className="text-slate-300 text-xs">
                  a_i*j* = max_i a_ij* (Worst-case ceiling for chosen column).
                </p>
                <span className="text-sky-400 font-mono text-[11px]">Column Maxima Equality</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-bold">3. Equilibrium Value v*</span>
                <p className="text-slate-300 text-xs">
                  Maximin (α) == Minimax (β) == v* in Indian Rupees (₹).
                </p>
                <span className="text-emerald-400 font-mono text-[11px]">Exact Value of the Game!</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Interactive Saddle Hunter */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-saddle">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Saddle Point Hunter & Equilibrium Inspector
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Edit the matrix cells below (in ₹ Thousands). The system dynamically evaluates whether a Saddle Point exists, highlights all saddle cells, and reveals the exact Value of the Game:
            </p>

            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-center border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2 text-left">Player A \ Player B</th>
                    <th className="p-2 text-sky-400">B₁</th>
                    <th className="p-2 text-sky-400">B₂</th>
                    <th className="p-2 text-sky-400">B₃</th>
                    <th className="p-2 text-rose-400 font-bold bg-rose-950/30">Row Min</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {matrix.map((row, rIdx) => (
                    <tr key={rIdx}>
                      <td className="p-2 text-left font-bold text-rose-300">A_{rIdx + 1}</td>
                      {row.map((cell, cIdx) => {
                        const isSaddle = saddlePoints.some((sp) => sp.r === rIdx && sp.c === cIdx);
                        return (
                          <td key={cIdx} className="p-2">
                            <input
                              type="number"
                              value={cell}
                              onChange={(e) => updateCell(rIdx, cIdx, e.target.value)}
                              className={clsx(
                                'w-16 px-2 py-1 text-center rounded bg-slate-900 border font-mono text-xs',
                                isSaddle
                                  ? 'bg-emerald-950 border-emerald-400 text-emerald-300 font-bold ring-2 ring-emerald-500 shadow-lg shadow-emerald-900/50'
                                  : 'border-slate-700 text-slate-300'
                              )}
                            />
                          </td>
                        );
                      })}
                      <td className="p-2 font-bold text-rose-400 bg-rose-950/20">₹{rowMins[rIdx]}k</td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-slate-700 bg-sky-950/30">
                    <td className="p-2 text-left font-bold text-sky-400">Col Max</td>
                    {colMaxs.map((cMax, cIdx) => (
                      <td key={cIdx} className="p-2 font-bold text-sky-300">₹{cMax}k</td>
                    ))}
                    <td className="p-2 text-slate-600">—</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Saddle Point Status Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs sm:text-sm">
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <span className="text-slate-400 font-sans text-xs">Maximin (α):</span>
                <span className="text-rose-400 font-bold text-lg">₹{maximin}k</span>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <span className="text-slate-400 font-sans text-xs">Minimax (β):</span>
                <span className="text-sky-400 font-bold text-lg">₹{minimax}k</span>
              </div>

              <div className={clsx('p-3.5 rounded-xl border flex flex-col space-y-1', hasSaddle ? 'bg-emerald-950/60 border-emerald-600' : 'bg-amber-950/60 border-amber-600')}>
                <span className="text-slate-300 font-sans text-xs">Saddle Point Verdict:</span>
                <span className={clsx('font-bold text-sm', hasSaddle ? 'text-emerald-300' : 'text-amber-300')}>
                  {hasSaddle
                    ? `Saddle at ${saddlePoints.map((sp) => `(A_${sp.r + 1}, B_${sp.c + 1})`).join(', ')} = ₹${maximin * 1000} ⭐`
                    : `No Saddle Point (Maximin < Minimax) 🎲`}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Nash Equilibrium Stability */}
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
                Nash Equilibrium Stability Proof
              </h2>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-3 text-xs sm:text-sm font-mono">
              <div className="text-cyan-300 font-bold text-base font-sans">
                Universal Stability Condition at Saddle Point (i*, j*):
              </div>
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-center text-emerald-400 font-bold text-base">
                a_i,j* ≤ a_i*,j* ≤ a_i*,j &nbsp; ∀ i, j
              </div>
              <ul className="text-slate-300 font-sans space-y-1 pt-1 list-disc list-inside text-xs">
                <li>If Player A switches away from row i*, payoff drops: <span className="text-rose-400 font-mono">a_i,j* ≤ v*</span>.</li>
                <li>If Player B switches away from col j*, payout rises: <span className="text-sky-400 font-mono">a_i*,j ≥ v*</span>.</li>
                <li>Therefore, the saddle point is completely self-enforcing and stable!</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 4: Saddle Surface Topography SVG */}
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
                3D Saddle Surface Topography Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 180"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Saddle Curve Representation */}
                <path d="M 120,40 Q 370,140 620,40" fill="none" stroke="#f43f5e" strokeWidth="3" />
                <text x="180" y="30" fill="#f43f5e" fontSize="10" fontWeight="bold">Row Profile: Min at Center</text>

                <path d="M 370,20 Q 370,90 370,160" fill="none" stroke="#38bdf8" strokeWidth="3" />
                <text x="380" y="165" fill="#38bdf8" fontSize="10" fontWeight="bold">Col Profile: Max at Center</text>

                {/* Central Saddle Intersection */}
                <circle cx="370" cy="90" r="9" fill="#34d399" />
                <circle cx="370" cy="90" r="14" fill="none" stroke="#34d399" strokeWidth="1.5" strokeDasharray="3,3" />
                <text x="370" y="115" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">
                  Saddle Point (i*, j*) = v*
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
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 font-bold text-sm">
                05
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Bengal Operations Research Saddle Point Case Studies
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
                  <p className="text-emerald-300 font-semibold">💡 <strong>Operations Takeaway:</strong> {cs.lesson}</p>
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
                  trap: 'Declaring a Cell as Saddle Point Without Testing Both Row Min AND Col Max',
                  fix: 'A cell MUST simultaneously be the smallest element in its row and largest in its column.',
                },
                {
                  trap: 'Assuming Multiple Saddle Points Can Have Different Game Values',
                  fix: 'All saddle points in the same game MUST have the exact same payoff value v*.',
                },
                {
                  trap: 'Using Mixed Strategy Formulas when a Saddle Point Already Exists',
                  fix: 'If Maximin = Minimax, the saddle point gives the exact, optimal pure strategy solution.',
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
                  Think of the saddle point like a ball resting on the center of a saddle: rolling sideways (changing rows) takes it downhill (lower payoff for A), rolling forward (changing columns) takes it uphill (higher payout for B). It is in perfect, stable balance!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how when Maximin equals Minimax, neither player needs to hide their choice or randomize: pure strategies are completely unexploitable!
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
                Student Revision Checklist (Topic 3)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Defined Saddle Point as cell where entry is simultaneously Row Min and Col Max',
                'Verified the Saddle Point condition: Maximin (α) == Minimax (β) == v*',
                'Proved Nash Equilibrium stability: a_i,j* ≤ a_i*,j* ≤ a_i*,j',
                'Understood multiple saddle point interchangeability and value invariance',
                'Reported saddle point game values in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: The Saddle Point is the ultimate pure-strategy destination in zero-sum games! When Maximin = Minimax = v*, you have arrived at a stable Nash equilibrium. In our next topic (Topic 4), we will explore the formal concept of the Value of the Game in even greater detail!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Saddle Point FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Saddle Point (Game Theory)"
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
