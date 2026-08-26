// src/components/study/quantitative-analysis/topics/005_006_2xn-and-m-x-2-cases-graphical-and-algebraic-methods/Topic1.jsx
// React 19 Function-based Component
// Module: 005_006_2xn-and-m-x-2-cases-graphical-and-algebraic-methods
// Topic 1: m×2 games

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic1_files/topic1_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic1_files/topic1_note.txt?raw';

const Topic1 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);

  // 4x2 Matrix (in ₹ Thousands)
  const [q1, setQ1] = useState(0.67);

  const matrix4x2 = [
    [20, 50], // A1
    [40, 10], // A2
    [30, 60], // A3
    [50, 20], // A4
  ];

  // Line Calculations: E_i(q1) = (ai1 - ai2) * q1 + ai2
  const e1 = (matrix4x2[0][0] - matrix4x2[0][1]) * q1 + matrix4x2[0][1]; // -30q1 + 50
  const e2 = (matrix4x2[1][0] - matrix4x2[1][1]) * q1 + matrix4x2[1][1]; // +30q1 + 10
  const e3 = (matrix4x2[2][0] - matrix4x2[2][1]) * q1 + matrix4x2[2][1]; // -30q1 + 60
  const e4 = (matrix4x2[3][0] - matrix4x2[3][1]) * q1 + matrix4x2[3][1]; // +30q1 + 20

  const upperEnvelopeVal = Math.max(e1, e2, e3, e4);

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
      title: '1. Foundry 4x2 Furnace Schedule Analysis (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Evaluated 4 alloy batch mixes against 2 power tariff tiers in Barrackpore. Constructing the upper envelope identified the Minimax trough at Rows {1, 2}, yielding q* = [2/3, 1/3] and capping power costs at ₹30,000 per production shift.',
      lesson: 'mx2 upper envelopes protect enterprise operations against peak supplier tariffs.',
    },
    {
      title: '2. Cold-Chain Transport Route Budgeting (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Modeled 3 regional transport corridors against 2 fuel price bands in Kolkata. The upper envelope trough identified the 2 active corridors, securing a guaranteed budget of ₹24,000.',
      lesson: 'mx2 formulations provide solid financial ceilings for fleet risk managers.',
    },
    {
      title: '3. Supermarket FMCG Retail Promotional Defense (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Analyzed 4 discount packages against 2 supplier co-op funding models in Ichapur. The Minimax upper envelope trough determined the optimal 60-40 funding split to lock in ₹35,000.',
      lesson: 'Upper envelope troughs prevent retail promotion margin bleed.',
    },
    {
      title: '4. Educational High-Tech Lab Patent Dispute Settlement (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Analyzed 5 research claim terms against 2 licensing frameworks in Jadavpur, determining the exact 2x2 active compromise to guarantee a ₹22 Lakh institutional payout.',
      lesson: 'Parameterizing q1 provides transparent liability ceilings in legal disputes.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes m2xGlow {
          0%, 100% { border-color: rgba(244, 63, 94, 0.3); }
          50% { border-color: rgba(244, 63, 94, 0.8); }
        }
        .glow-m2x {
          animation: m2xGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-rose-950/80 text-rose-400 border border-rose-800/60">
              Segment 5 • Module 005_006 • Topic 1
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-rose-950/80 text-rose-400 border border-rose-800/60">
              m×2 Games • Parameterization • Expected Payout Lines in ₹
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            m×2 Games (Theoretical Foundations & Parameterization)
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A rigorous formulation of <span className="text-rose-400 font-semibold">m×2 Games</span>: parameterizing Player B's strategy (<span className="text-amber-400 font-mono">q = [q₁, 1−q₁]ᵀ</span>), formulating linear expected payout functions (<span className="text-emerald-400 font-mono">E(A_i, q) = (a_{`{i1}`} − a_{`{i2}`})q₁ + a_{`{i2}`}</span>), and constructing the Upper Envelope in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'mathematical-formulation', label: '1. Mathematical Formulation' },
              { id: 'interactive-studio', label: '2. 4x2 Payout Line Studio' },
              { id: 'upper-envelope', label: '3. Upper Envelope Boundary' },
              { id: 'svg-pipeline', label: '4. Strategy Line Geometry SVG' },
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
              &gt;
                {item.label}
              </button>
            ))}
          </div>
        </header>

        {/* SECTION 1: Mathematical Formulation */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-600/20 text-rose-400 font-bold text-sm">
                01
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                m×2 Mathematical Formulation & Linear Payout Functions
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-400 font-sans font-bold">1. Parameterization</span>
                <p className="text-slate-300 text-xs">q = [q₁, 1−q₁]ᵀ</p>
                <span className="text-amber-400 text-[11px]">q₁ ∈ [0, 1] on 1D Simplex</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-rose-400 font-sans font-bold">2. Line Equations</span>
                <p className="text-slate-300 text-xs">E(A_i, q) = (a_{`{i1}`} − a_{`{i2}`})q₁ + a_{`{i2}`}</p>
                <span className="text-rose-400 text-[11px]">Endpoints: (0, a_{`{i2}`}) to (1, a_{`{i1}`})</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-sans font-bold">3. Minimax Criterion</span>
                <p className="text-slate-300 text-xs">v* = min_{`{q₁}`} max_{`{i}`} E(A_i, q)</p>
                <span className="text-emerald-400 text-[11px]">Trough of Upper Envelope in ₹</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: 4x2 Payout Line Studio */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-m2x">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-600/20 text-rose-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive 4×2 Linear Payout Function Studio
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Adjust Player B's probability <span className="text-rose-400 font-mono font-bold">q₁</span>. Observe the live linear evaluations across all 4 row options and the resulting upper envelope value:
            </p>

            {/* Matrix View */}
            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3 font-mono text-xs sm:text-sm">
              <table className="w-full text-center border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2 text-left">A \ B</th>
                    <th className="p-2 text-sky-400">B₁ (q₁ = {q1.toFixed(2)})</th>
                    <th className="p-2 text-sky-400">B₂ (q₂ = {(1 - q1).toFixed(2)})</th>
                    <th className="p-2 text-rose-400">Expected Payout E(A_i, q)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-200">
                  <tr>
                    <td className="p-2 text-left font-bold text-rose-300">A₁: −30q₁ + 50</td>
                    <td className="p-2">₹20k</td>
                    <td className="p-2">₹50k</td>
                    <td className="p-2 font-bold text-rose-300">₹{e1.toFixed(1)}k</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-left font-bold text-rose-300">A₂: +30q₁ + 10</td>
                    <td className="p-2">₹40k</td>
                    <td className="p-2">₹10k</td>
                    <td className="p-2 font-bold text-rose-300">₹{e2.toFixed(1)}k</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-left font-bold text-rose-300">A₃: −30q₁ + 60</td>
                    <td className="p-2">₹30k</td>
                    <td className="p-2">₹60k</td>
                    <td className="p-2 font-bold text-rose-300">₹{e3.toFixed(1)}k</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-left font-bold text-rose-300">A₄: +30q₁ + 20</td>
                    <td className="p-2">₹50k</td>
                    <td className="p-2">₹20k</td>
                    <td className="p-2 font-bold text-rose-300">₹{e4.toFixed(1)}k</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Slider */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2 font-mono text-xs">
              <div className="flex justify-between items-center text-rose-400 font-bold">
                <span>Player B Strategy: q₁ (B₁) = {q1.toFixed(2)}</span>
                <span>q₂ (B₂) = {(1 - q1).toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.02"
                value={q1}
                onChange={(e) => setQ1(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
              /&gt;
            </div>

            {/* Upper Envelope Result */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs sm:text-sm">
              <div>
                <span className="font-bold text-white block">Active Upper Envelope Value:</span>
                <span className="font-mono text-xs text-slate-300">
                  max(₹{e1.toFixed(1)}k, ₹{e2.toFixed(1)}k, ₹{e3.toFixed(1)}k, ₹{e4.toFixed(1)}k) = ₹{upperEnvelopeVal.toFixed(1)}k
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block font-sans">Minimax Trough:</span>
                <span className="font-mono font-bold text-emerald-300 text-lg">
                  v* = +₹30,000 (at q₁* = 0.67)
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Upper Envelope Boundary */}
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
                The Upper Envelope Boundary Concept
              </h2>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-3 text-xs sm:text-sm">
              <p className="text-slate-300 leading-relaxed">
                Why does Player B evaluate the <strong>Upper Envelope</strong>? Because Player A is a maximizer who will choose the row that maximizes Player A's payoff (maximizing Player B's loss) for whatever probability <span className="text-rose-400 font-mono">q₁</span> Player B plays:
              </p>
              <div className="p-3 bg-slate-900 rounded-lg text-center font-mono font-bold text-emerald-300">
                f_upper(q₁) = max_{`{i}`} [ E(A_i, q) ] &nbsp; (in ₹)
              </div>
              <p className="text-slate-400 text-xs">
                Player B’s optimal liability defense is to locate the lowest point (the Minimax Trough) along this upper envelope ceiling.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Strategy Line Geometry SVG */}
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
                m×2 Strategy Line Geometry Architecture
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
                <text x="80" y="15" fill="#f87171" fontSize="10" fontWeight="bold" textAnchor="middle">Left Axis: q₁ = 0 (Pure B₂)</text>

                {/* Right Axis */}
                <line x1="660" y1="20" x2="660" y2="160" stroke="#64748b" strokeWidth="2" />
                <text x="660" y="15" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">Right Axis: q₁ = 1 (Pure B₁)</text>

                {/* Line 1 (A1): (0, 50) to (1, 20) */}
                <line x1="80" y1="40" x2="660" y2="120" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4,4" />
                <text x="50" y="45" fill="#f43f5e" fontSize="9">a₁₂=50</text>
                <text x="670" y="125" fill="#f43f5e" fontSize="9">a₁₁=20</text>

                {/* Line 2 (A2): (0, 10) to (1, 40) */}
                <line x1="80" y1="140" x2="660" y2="60" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4,4" />
                <text x="50" y="145" fill="#38bdf8" fontSize="9">a₂₂=10</text>
                <text x="670" y="65" fill="#38bdf8" fontSize="9">a₂₁=40</text>

                {/* Trough Point */}
                <circle cx="467" cy="80" r="6" fill="#34d399" />
                <text x="467" y="100" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">Minimax Trough (v* = ₹30k)</text>

                {/* Shaded Upper Envelope Indicator */}
                <path d="M 80 40 L 467 80 L 660 60" fill="none" stroke="#34d399" strokeWidth="3" />
                <text x="370" y="55" fill="#a7f3d0" fontSize="9" textAnchor="middle">Thick Line = Upper Envelope Ceiling</text>
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
                Bengal Operations Research m×2 Game Case Studies
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
                  trap: 'Plotting a_i1 on the Left Axis (q₁=0) Instead of a_i2',
                  fix: 'At q₁=0, Player B plays pure B₂. The left axis payout is a_i2; the right axis (q₁=1) is a_i1.',
                },
                {
                  trap: 'Constructing the Lower Envelope Instead of the Upper Envelope for mx2 Games',
                  fix: 'Player B is a minimizer facing a maximizer; Player B’s worst-case liability boundary is the UPPER envelope.',
                },
                {
                  trap: 'Picking an Envelope Trough Formed by Lines with the Same Sign of Slope',
                  fix: 'An interior trough requires lines with OPPOSITE signs of slope (one falling, one rising).',
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
                  Think of the upper envelope like a suspension bridge cable sagging between two towers: Player B wants to stand at the lowest point of the sag (the Minimax Trough) to minimize liability!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how setting q₁ = 0.67 (2/3) creates an exact payout of ₹30,000 across Rows 1 and 2, which forms the lowest point of the upper envelope ceiling!
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
                Student Revision Checklist (Topic 1)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Understood mx2 matrix structure and parameterization (q₁, 1−q₁)',
                'Computed linear expected payout equations E(A_i, q) = (a_i1 − a_i2)q₁ + a_i2',
                'Plotted line endpoints on left (q₁=0) and right (q₁=1) vertical axes',
                'Constructed the Upper Envelope representing Player B worst-case liability ceiling',
                'Reported all game values and payouts in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: You now master both sides of the 2D geometric coin: 2xn games (Lower Envelope Maximin) and mx2 games (Upper Envelope Minimax). In our next topic (Topic 2), we will explore the Graphical Method in comprehensive detail!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="mx2 Games FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="m×2 Games (Game Theory)"
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
