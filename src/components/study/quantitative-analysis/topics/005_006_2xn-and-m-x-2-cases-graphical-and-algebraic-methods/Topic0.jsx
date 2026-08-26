// src/components/study/quantitative-analysis/topics/005_006_2xn-and-m-x-2-cases-graphical-and-algebraic-methods/Topic0.jsx
// React 19 Function-based Component
// Module: 005_006_2xn-and-m-x-2-cases-graphical-and-algebraic-methods
// Topic 0: 2×n games

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic0_files/topic0_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic0_files/topic0_note.txt?raw';

const Topic0 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);

  // 2x4 Matrix (in ₹ Thousands)
  const [p1, setP1] = useState(0.5);

  const matrix2x4 = [
    [20, 50, 60, 30], // A1
    [40, 10, 30, 50], // A2
  ];

  // Line Calculations
  const e1 = (matrix2x4[0][0] - matrix2x4[1][0]) * p1 + matrix2x4[1][0]; // -20p1 + 40
  const e2 = (matrix2x4[0][1] - matrix2x4[1][1]) * p1 + matrix2x4[1][1]; // +40p1 + 10
  const e3 = (matrix2x4[0][2] - matrix2x4[1][2]) * p1 + matrix2x4[1][2]; // +30p1 + 30
  const e4 = (matrix2x4[0][3] - matrix2x4[1][3]) * p1 + matrix2x4[1][3]; // -20p1 + 50

  const lowerEnvelopeVal = Math.min(e1, e2, e3, e4);

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
      title: '1. Foundry 2x4 Furnace Schedule Evaluation (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Debangshu in Barrackpore evaluated 2 casting processes against 4 alloy market bids. Plotting 4 linear payoff functions revealed that Columns {1, 2} bounded the lower envelope peak, yielding p* = [0.50, 0.50] and locking in ₹30,000 expected profit per shift.',
      lesson: '2xn formulations identify active industrial trade-offs with zero LP overhead.',
    },
    {
      title: '2. Cold-Chain Logistics 2x3 Fleet Corridor Analysis (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Modeled 2 vehicle types against 3 destination hubs in Kolkata. The lower envelope peak identified the 2 active delivery routes and secured a guaranteed ₹24,000 transport baseline.',
      lesson: '2xn lower envelopes protect health logistics against worst-case breakdowns.',
    },
    {
      title: '3. Supermarket FMCG Retail 2x4 Promotion Wars (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Analyzed 2 promotion models against 4 competitor counter-moves in Ichapur. The Maximin lower envelope peak pinpointed the exact 60-40 advertising mix to secure ₹32,000.',
      lesson: '2xn analysis eliminates marketing vulnerabilities against multi-action competitors.',
    },
    {
      title: '4. Educational High-Tech Lab 2x5 Patent Licensing (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Analyzed 2 patent terms against 5 corporate licensing packages in Jadavpur, determining the exact 2x2 core support to guarantee a ₹20 Lakh institutional royalty stream.',
      lesson: 'Parameterizing p1 enables transparent multi-stakeholder royalty negotiations.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes g2nRedGlow {
          0%, 100% { border-color: rgba(56, 189, 248, 0.3); }
          50% { border-color: rgba(56, 189, 248, 0.8); }
        }
        .glow-g2n {
          animation: g2nRedGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Segment 5 • Module 005_006 • Topic 0
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              2×n Games • Parameterization • Expected Payoff Lines in ₹
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            2×n Games (Theoretical Foundations & Parameterization)
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A rigorous formulation of <span className="text-sky-400 font-semibold">2×n Games</span>: parameterizing Player A's strategy (<span className="text-amber-400 font-mono">p = [p₁, 1−p₁]ᵀ</span>), formulating linear expected payoff functions (<span className="text-emerald-400 font-mono">E(p, B_j) = (a₁ⱼ − a₂ⱼ)p₁ + a₂ⱼ</span>), and constructing the Lower Envelope in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'mathematical-formulation', label: '1. Mathematical Formulation' },
              { id: 'interactive-studio', label: '2. 2x4 Payoff Line Studio' },
              { id: 'lower-envelope', label: '3. Lower Envelope Boundary' },
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
                    ? 'bg-sky-600 text-white border-sky-500 shadow-md shadow-sky-900/40'
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
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                01
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                2×n Mathematical Formulation & Linear Functions
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-400 font-sans font-bold">1. Parameterization</span>
                <p className="text-slate-300 text-xs">p = [p₁, 1−p₁]ᵀ</p>
                <span className="text-amber-400 text-[11px]">p₁ ∈ [0, 1] on 1D Simplex</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-sans font-bold">2. Line Equations</span>
                <p className="text-slate-300 text-xs">E(p, B_j) = (a₁ⱼ − a₂ⱼ)p₁ + a₂ⱼ</p>
                <span className="text-sky-400 text-[11px]">Endpoints: (0, a₂ⱼ) to (1, a₁ⱼ)</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-sans font-bold">3. Maximin Criterion</span>
                <p className="text-slate-300 text-xs">v* = max_{`{p₁}`} min_{`{j}`} E(p, B_j)</p>
                <span className="text-emerald-400 text-[11px]">Peak of Lower Envelope in ₹</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: 2x4 Payoff Line Studio */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-g2n">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive 2×4 Linear Payoff Function Studio
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Adjust Player A's probability <span className="text-sky-400 font-mono font-bold">p₁</span>. Observe the live linear evaluations across all 4 column options and the resulting lower envelope value:
            </p>

            {/* Matrix View */}
            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3 font-mono text-xs sm:text-sm">
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
                    <td className="p-2 text-left font-bold text-rose-300">A₁ (p₁ = {p1.toFixed(2)})</td>
                    <td className="p-2">₹20k</td>
                    <td className="p-2">₹50k</td>
                    <td className="p-2">₹60k</td>
                    <td className="p-2">₹30k</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-left font-bold text-rose-300">A₂ (p₂ = {(1 - p1).toFixed(2)})</td>
                    <td className="p-2">₹40k</td>
                    <td className="p-2">₹10k</td>
                    <td className="p-2">₹30k</td>
                    <td className="p-2">₹50k</td>
                  </tr>
                  <tr className="bg-sky-950/20 border-t-2 border-sky-600/40">
                    <td className="p-2 text-left font-bold text-sky-300">Payoffs at p₁:</td>
                    <td className="p-2 font-bold text-sky-300">₹{e1.toFixed(1)}k</td>
                    <td className="p-2 font-bold text-sky-300">₹{e2.toFixed(1)}k</td>
                    <td className="p-2 font-bold text-sky-300">₹{e3.toFixed(1)}k</td>
                    <td className="p-2 font-bold text-sky-300">₹{e4.toFixed(1)}k</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Slider */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2 font-mono text-xs">
              <div className="flex justify-between items-center text-sky-400 font-bold">
                <span>Player A Strategy: p₁ (A₁) = {p1.toFixed(2)}</span>
                <span>p₂ (A₂) = {(1 - p1).toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.02"
                value={p1}
                onChange={(e) => setP1(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
              /&gt;
            </div>

            {/* Lower Envelope Result */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs sm:text-sm">
              <div>
                <span className="font-bold text-white block">Active Lower Envelope Value:</span>
                <span className="font-mono text-xs text-slate-300">
                  min(₹{e1.toFixed(1)}k, ₹{e2.toFixed(1)}k, ₹{e3.toFixed(1)}k, ₹{e4.toFixed(1)}k) = ₹{lowerEnvelopeVal.toFixed(1)}k
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block font-sans">Maximin Peak:</span>
                <span className="font-mono font-bold text-emerald-300 text-lg">
                  v* = +₹30,000 (at p₁* = 0.50)
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Lower Envelope Boundary */}
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
                The Lower Envelope Boundary Concept
              </h2>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-3 text-xs sm:text-sm">
              <p className="text-slate-300 leading-relaxed">
                Why does Player A evaluate the <strong>Lower Envelope</strong>? Because Player B will always choose the column strategy that minimizes Player A's payoff for whatever probability <span className="text-sky-400 font-mono">p₁</span> Player A plays:
              </p>
              <div className="p-3 bg-slate-900 rounded-lg text-center font-mono font-bold text-emerald-300">
                f_lower(p₁) = min_{`{j}`} [ E(p, B_j) ] &nbsp; (in ₹)
              </div>
              <p className="text-slate-400 text-xs">
                Player A’s optimal defense is to locate the highest point (the Maximin Peak) along this lower envelope floor.
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
                2×n Strategy Line Geometry Architecture
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
                <text x="80" y="15" fill="#f87171" fontSize="10" fontWeight="bold" textAnchor="middle">Left Axis: p₁ = 0 (Pure A₂)</text>

                {/* Right Axis */}
                <line x1="660" y1="20" x2="660" y2="160" stroke="#64748b" strokeWidth="2" />
                <text x="660" y="15" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">Right Axis: p₁ = 1 (Pure A₁)</text>

                {/* Line 1 (B1): from (0, 40) to (1, 20) */}
                <line x1="80" y1="60" x2="660" y2="120" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4,4" />
                <text x="50" y="65" fill="#f43f5e" fontSize="9">a₂₁=40</text>
                <text x="670" y="125" fill="#f43f5e" fontSize="9">a₁₁=20</text>

                {/* Line 2 (B2): from (0, 10) to (1, 50) */}
                <line x1="80" y1="140" x2="660" y2="40" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4,4" />
                <text x="50" y="145" fill="#38bdf8" fontSize="9">a₂₂=10</text>
                <text x="670" y="45" fill="#38bdf8" fontSize="9">a₁₂=50</text>

                {/* Intersection Peak */}
                <circle cx="370" cy="90" r="6" fill="#34d399" />
                <text x="370" y="80" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">Maximin Peak (v* = ₹30k)</text>

                {/* Shaded Lower Envelope Indicator */}
                <path d="M 80 140 L 370 90 L 660 120" fill="none" stroke="#34d399" strokeWidth="3" />
                <text x="370" y="125" fill="#a7f3d0" fontSize="9" textAnchor="middle">Thick Line = Lower Envelope Floor</text>
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
                Bengal Operations Research 2×n Game Case Studies
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
                  trap: 'Plotting a₁ⱼ on the Left Axis (p₁=0) Instead of a₂ⱼ',
                  fix: 'At p₁=0, Player A plays pure A₂. The left axis payoff is a₂ⱼ; the right axis (p₁=1) is a₁ⱼ.',
                },
                {
                  trap: 'Constructing the Upper Envelope Instead of the Lower Envelope for 2xn Games',
                  fix: 'Player A is a maximizer facing a minimizer; Player A’s worst-case boundary is the LOWER envelope.',
                },
                {
                  trap: 'Picking an Envelope Peak Formed by Lines with the Same Sign of Slope',
                  fix: 'An interior peak requires lines with OPPOSITE signs of slope (one rising, one falling).',
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
                  Think of plotting 2xn lines like connecting two telephone poles: the left pole at p₁=0 is Row 2's value, and the right pole at p₁=1 is Row 1's value!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how setting p₁ = 0.50 creates an exact balance of ₹30,000 across Lines 1 and 2, which forms the highest point of the lower envelope!
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
                Student Revision Checklist (Topic 0)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Understood 2xn matrix structure and parameterization (p₁, 1−p₁)',
                'Computed linear expected payoff equations E(p, B_j) = (a₁ⱼ − a₂ⱼ)p₁ + a₂ⱼ',
                'Plotted line endpoints on left (p₁=0) and right (p₁=1) vertical axes',
                'Constructed the Lower Envelope representing Player A worst-case defense',
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
              "Welcome to Module 005_006 (2×n and m×2 Cases: Graphical & Algebraic Methods), Debangshu, Mamata, Mahima, Susmita, and Abhronila! 2xn games provide a visual superpower: by plotting linear functions, you can spot the optimal strategy in seconds. In our next topic (Topic 1), we will explore the dual counterpart: m×2 Games!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="2xn Games FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="2×n Games (Game Theory)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic1_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic0;
