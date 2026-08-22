// src/components/study/quantitative-analysis/topics/005_001_payoff-matrix-two-person-zero-sum-game/Topic6.jsx
// React 19 Function-based Component
// Module: 005_001_payoff-matrix-two-person-zero-sum-game
// Topic 6: Formulating simple game matrices

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
  const [selectedScenario, setSelectedScenario] = useState(0);

  const scenarios = [
    {
      title: '1. Marketing & Media Allocation (Kolkata Retail)',
      playerA: 'Supermarket A (Mamata)',
      playerB: 'Supermarket B (Mahima)',
      rowLabels: ['A₁: Digital Media', 'A₂: TV Broadcast', 'A₃: Newspaper Ads'],
      colLabels: ['B₁: Digital Media', 'B₂: TV Broadcast', 'B₃: Newspaper Ads'],
      matrix: [
        [0, 30, 20],
        [-30, 0, 40],
        [-20, -40, 0],
      ],
      unit: '₹ Thousands',
      desc: 'Symmetric zero-sum marketing competition for urban customer footfall in Kolkata.',
    },
    {
      title: '2. Sealed-Bid Tender Procurement (Barrackpore Foundry)',
      playerA: 'Debangshu (Foundry A)',
      playerB: 'Rival Bidder (Foundry B)',
      rowLabels: ['A₁: High Bid (₹4.8L)', 'A₂: Med Bid (₹4.2L)', 'A₃: Low Bid (₹3.8L)'],
      colLabels: ['B₁: High Bid (₹4.8L)', 'B₂: Med Bid (₹4.2L)', 'B₃: Low Bid (₹3.8L)'],
      matrix: [
        [40, 0, 0],
        [60, 30, 0],
        [40, 40, 20],
      ],
      unit: '₹ Thousands',
      desc: 'Lowest bidder captures the procurement contract profit; equal bids split profit 50-50.',
    },
    {
      title: '3. Retail Price Matching Guarantee (Ichapur Distribution)',
      playerA: 'Store A (Susmita)',
      playerB: 'Store B (Rival Chain)',
      rowLabels: ['A₁: Regular Price', 'A₂: 10% Discount'],
      colLabels: ['B₁: Regular Price', 'B₂: 10% Discount'],
      matrix: [
        [50, -10],
        [30, 20],
      ],
      unit: '₹ Thousands',
      desc: 'Strategic price discount interaction between competing retail outlets.',
    },
    {
      title: '4. Legal Dispute Settlement vs Litigation (Jadavpur Lab)',
      playerA: 'Abhronila (Patentee)',
      playerB: 'Licensee Corporation',
      rowLabels: ['A₁: Settle (₹50k)', 'A₂: Go to Trial'],
      colLabels: ['B₁: Accept Settlement', 'B₂: Fight in Court'],
      matrix: [
        [50, 50],
        [80, -20],
      ],
      unit: '₹ Thousands',
      desc: 'Socio-legal operations research model accounting for courtroom risk and litigation fees.',
    },
  ];

  const currentScen = scenarios[selectedScenario];
  const mat = currentScen.matrix;

  // Computations
  const rMins = mat.map((row) => Math.min(...row));
  const cMaxs = currentScen.colLabels.map((_, cIdx) =>
    Math.max(...mat.map((row) => row[cIdx]))
  );
  const maximin = Math.max(...rMins);
  const minimax = Math.min(...cMaxs);
  const hasSaddle = maximin === minimax;
  const maximinRow = rMins.indexOf(maximin);
  const minimaxCol = cMaxs.indexOf(minimax);

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
      title: '1. Foundry Sealed-Bid Tender Formulation (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Formulated a 3x3 bidding game for a ₹5 Lakh casting tender in Barrackpore: Strategies: High (₹4.8L), Med (₹4.2L), Low (₹3.8L). Matrix analysis isolated the optimal medium-bid pure saddle point.',
      lesson: 'Structured step-by-step matrix formulation eliminates guesswork in competitive bidding.',
    },
    {
      title: '2. Cold-Chain Hospital Supply Tender (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Formulated a 2x2 delivery warranty matrix (Reliable vs Economy transport) in Kolkata, verifying that reliable transport strictly dominated economy transport by ₹40,000.',
      lesson: 'Payoff matrices translate logistics service level agreements into clear mathematical choices.',
    },
    {
      title: '3. Supermarket FMCG Retail Discount Matrix (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Formulated a 2x2 weekend promotional matrix in Ichapur, converting store footfall capture rates into signed net margin cells in ₹.',
      lesson: 'Retail marketing managers use payoff matrices to avoid destructive price wars.',
    },
    {
      title: '4. Educational High-Tech Lab Patent Negotiation Matrix (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Formulated a ₹55 Lakh university patent licensing game in Jadavpur, translating royalty proposals into a 3x3 normal form matrix and identifying an equitable settlement.',
      lesson: 'Matrix modeling provides objective mathematical arbitration in intellectual property disputes.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes formGlow {
          0%, 100% { border-color: rgba(52, 211, 153, 0.3); }
          50% { border-color: rgba(52, 211, 153, 0.8); }
        }
        .glow-form {
          animation: formGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
              Segment 5 • Module 005_001 • Topic 6
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
              4-Step Formulation Pipeline • Multi-Paradigm Studio • Real-World Tenders
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Formulating Simple Game Matrices
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A practical masterclass on <span className="text-emerald-400 font-semibold">Formulating Game Matrices</span> from word problems: following the <span className="text-sky-400 font-semibold">4-Step Formulation Pipeline</span>, defining exhaustive strategy sets, translating revenues and costs into net payoffs in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>), and validating equilibrium.
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: '4step-pipeline', label: '1. 4-Step Formulation Pipeline' },
              { id: 'formulation-studio', label: '2. Multi-Paradigm Formulation Studio' },
              { id: 'paradigm-models', label: '3. Formulation Paradigms' },
              { id: 'svg-pipeline', label: '4. Pipeline Architecture SVG' },
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

        {/* SECTION 1: 4-Step Formulation Pipeline */}
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
                The 4-Step Game Matrix Formulation Pipeline
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-rose-300 font-bold">Step 1: Identify Players</span>
                <p className="text-slate-300">Designate Player A (Row) and Player B (Column).</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-sky-300 font-bold">Step 2: Define Strategies</span>
                <p className="text-slate-300">List exhaustive, mutually exclusive action choices.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-emerald-300 font-bold">Step 3: Quantify Payoffs</span>
                <p className="text-slate-300">Compute Net Revenue − Costs in ₹ for each cell.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-amber-300 font-bold">Step 4: Assemble Matrix</span>
                <p className="text-slate-300">Build m×n table; extract Row Mins and Col Maxs.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Multi-Paradigm Formulation Studio */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-form">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Multi-Paradigm Game Formulation Studio
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {scenarios.map((sc, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedScenario(idx)}
                  className={clsx(
                    'px-4 py-2 rounded-xl text-xs font-semibold transition-all border text-left',
                    selectedScenario === idx
                      ? 'bg-emerald-600 text-white border-emerald-400 shadow-md'
                      : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
                  )}
                >
                  {sc.title}
                </button>
              ))}
            </div>

            {/* Scenario Header Info */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2 text-xs sm:text-sm">
              <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-2 gap-2">
                <span className="text-white font-bold text-base">{currentScen.title}</span>
                <span className="text-amber-400 font-mono font-semibold">Units: {currentScen.unit}</span>
              </div>
              <p className="text-slate-300">{currentScen.desc}</p>
              <div className="flex flex-wrap gap-4 text-xs font-mono pt-1">
                <span className="text-rose-400">Row Player: {currentScen.playerA}</span>
                <span className="text-sky-400">Column Player: {currentScen.playerB}</span>
              </div>
            </div>

            {/* Matrix Display Table */}
            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-center border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2 text-left">{currentScen.playerA} \ {currentScen.playerB}</th>
                    {currentScen.colLabels.map((cl, cIdx) => (
                      <th key={cIdx} className="p-2 text-sky-400">{cl}</th>
                    ))}
                    <th className="p-2 text-rose-400 bg-rose-950/30">Row Min</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-200">
                  {mat.map((row, rIdx) => (
                    <tr key={rIdx}>
                      <td className="p-2 text-left font-bold text-rose-300">{currentScen.rowLabels[rIdx]}</td>
                      {row.map((cell, cIdx) => {
                        const isSaddle = hasSaddle && rIdx === maximinRow && cIdx === minimaxCol;
                        return (
                          <td
                            key={cIdx}
                            className={clsx(
                              'p-2 font-bold',
                              isSaddle
                                ? 'bg-emerald-950 text-emerald-300 border-2 border-emerald-500 rounded'
                                : cell > 0
                                ? 'text-emerald-400'
                                : cell < 0
                                ? 'text-rose-400'
                                : 'text-slate-400'
                            )}
                          >
                            {cell >= 0 ? `+${cell}` : cell}
                          </td>
                        );
                      })}
                      <td className="p-2 font-bold text-rose-400 bg-rose-950/20">{rMins[rIdx]}</td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-slate-700 bg-sky-950/20">
                    <td className="p-2 text-left font-bold text-sky-400">Col Max</td>
                    {cMaxs.map((cm, cIdx) => (
                      <td key={cIdx} className="p-2 font-bold text-sky-300">{cm}</td>
                    ))}
                    <td className="p-2 text-slate-600">—</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Analysis Summary */}
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
                <span className="text-slate-300 font-sans text-xs">Equilibrium Verdict:</span>
                <span className={clsx('font-bold text-sm', hasSaddle ? 'text-emerald-300' : 'text-amber-300')}>
                  {hasSaddle ? `Saddle Point at (A_${maximinRow + 1}, B_${minimaxCol + 1}) = ₹${maximin}k ⭐` : `Mixed Strategy Solution Required 🎲`}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Formulation Paradigms */}
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
                Key Real-World Formulation Paradigms
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-bold">1. Procurement Sealed-Bid Tenders</span>
                <p className="text-slate-300 text-xs">
                  Lowest bid wins contract margin; equal bids split profits. Payoffs represent net operational profit in ₹.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-bold">2. Media & Advertising Allocation</span>
                <p className="text-slate-300 text-xs">
                  Firms allocate marketing capital across digital, TV, and print. Payoffs represent customer acquisition revenue.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-400 font-bold">3. Retail Price Matching & Discounts</span>
                <p className="text-slate-300 text-xs">
                  Firms choose discounting depths. Payoffs model footfall conversion minus gross margin sacrifice.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-purple-400 font-bold">4. Legal Dispute Settlement vs Trial</span>
                <p className="text-slate-300 text-xs">
                  Parties weigh certain negotiated settlement against uncertain trial awards minus court costs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Pipeline Architecture SVG */}
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
                4-Step Game Matrix Formulation Pipeline Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 160"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* 4 Pipeline Stages */}
                <rect x="20" y="40" width="150" height="80" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <text x="95" y="65" fill="#f43f5e" fontSize="10" fontWeight="bold" textAnchor="middle">1. Identify Players</text>
                <text x="95" y="85" fill="#cbd5e1" fontSize="8" textAnchor="middle">Player A (Row)</text>
                <text x="95" y="100" fill="#cbd5e1" fontSize="8" textAnchor="middle">Player B (Col)</text>

                <line x1="170" y1="80" x2="200" y2="80" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="200,80 190,75 190,85" fill="#38bdf8" />

                <rect x="200" y="40" width="150" height="80" rx="8" fill="#1e293b" stroke="#818cf8" strokeWidth="2" />
                <text x="275" y="65" fill="#818cf8" fontSize="10" fontWeight="bold" textAnchor="middle">2. Strategy Sets</text>
                <text x="275" y="85" fill="#cbd5e1" fontSize="8" textAnchor="middle">S_A = {`{A₁...Aₘ}`}</text>
                <text x="275" y="100" fill="#cbd5e1" fontSize="8" textAnchor="middle">S_B = {`{B₁...Bₙ}`}</text>

                <line x1="350" y1="80" x2="380" y2="80" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="380,80 370,75 370,85" fill="#38bdf8" />

                <rect x="380" y="40" width="150" height="80" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="455" y="65" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">3. Net Payoffs (₹)</text>
                <text x="455" y="85" fill="#cbd5e1" fontSize="8" textAnchor="middle">a_ij = Revenue − Cost</text>
                <text x="455" y="100" fill="#cbd5e1" fontSize="8" textAnchor="middle">Row Player View</text>

                <line x1="530" y1="80" x2="560" y2="80" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="560,80 550,75 550,85" fill="#38bdf8" />

                <rect x="560" y="40" width="160" height="80" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="640" y="65" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">4. Matrix Assembly</text>
                <text x="640" y="85" fill="#cbd5e1" fontSize="8" textAnchor="middle">m × n Normal Form</text>
                <text x="640" y="100" fill="#cbd5e1" fontSize="8" textAnchor="middle">Maximin ≤ Minimax</text>
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
                Bengal Operations Research Formulation Case Studies
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
                  trap: 'Forgetting to Deduct Operational Costs from Gross Revenue',
                  fix: 'Payoffs must represent NET economic profit in Indian Rupees (₹): Net Payoff = Revenue − Costs.',
                },
                {
                  trap: 'Formulating Incomplete (Non-Exhaustive) Strategy Sets',
                  fix: 'Ensure strategy sets cover all possible actionable moves available to both players.',
                },
                {
                  trap: 'Mixing Units Across Cells in the Same Matrix',
                  fix: 'Ensure all matrix cells are stated in the exact same financial unit (e.g. ₹ Thousands or ₹ Lakhs).',
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
                  Think of matrix formulation like building a spreadsheet for an executive: every column represents a competitor's move, every row is your choice, and the cell is the bottom-line net profit in ₹!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how in bidding games, bidding lower than your opponent wins the entire contract, but bidding too low sacrifices profit margin: this trade-off is captured perfectly in the payoff matrix!
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
                'Followed the 4-step formulation methodology (Players, Strategies, Payoffs, Matrix)',
                'Ensured strategy sets are mutually exclusive and collectively exhaustive',
                'Computed net financial payoffs in Indian Rupees (₹) from Player A\'s viewpoint',
                'Assembled the m × n rectangular table',
                'Extracted Row Minima and Column Maxima',
                'Verified the invariant inequality: Maximin ≤ Minimax',
                'Reported matrix payoffs and values in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: Formulating game matrices from real-world business and legal situations is the true test of an operations research consultant! Follow the 4-step pipeline rigorously, deduct costs to get net payoffs in ₹, and always verify Maximin ≤ Minimax. In our final master topic for this module (Topic 7), we will conduct a comprehensive Short Questions and viva review!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Formulating Simple Game Matrices FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Formulating Simple Game Matrices"
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
