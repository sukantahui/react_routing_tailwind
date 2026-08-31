// src/components/study/quantitative-analysis/topics/005_001_payoff-matrix-two-person-zero-sum-game/Topic2.jsx
// React 19 Function-based Component
// Module: 005_001_payoff-matrix-two-person-zero-sum-game
// Topic 2: Payoff concept

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

  // Customizable Matrix Values in ₹
  const [val11, setVal11] = useState(40000);
  const [val12, setVal12] = useState(-10000);
  const [val21, setVal21] = useState(20000);
  const [val22, setVal22] = useState(30000);

  // Mixed Strategy Probabilities
  const [probA1, setProbA1] = useState(0.5);
  const [probB1, setProbB1] = useState(0.5);

  const probA2 = 1 - probA1;
  const probB2 = 1 - probB1;

  // Expected Value Calculation: E(p, q) = p*q*a11 + p*(1-q)*a12 + (1-p)*q*a21 + (1-p)*(1-q)*a22
  const term1 = probA1 * probB1 * Number(val11);
  const term2 = probA1 * probB2 * Number(val12);
  const term3 = probA2 * probB1 * Number(val21);
  const term4 = probA2 * probB2 * Number(val22);

  const expectedPayoffA = term1 + term2 + term3 + term4;
  const expectedPayoffB = -expectedPayoffA;

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
      title: '1. Foundry Supply Contract Payoff Mapping (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Mapped net profit payoffs in ₹ for heavy casting supply agreements in Barrackpore, establishing a 2x2 matrix with payoffs ranging from -₹10,000 to +₹40,000.',
      lesson: 'Quantifying discrete outcomes in Indian Rupees provides unambiguous matrix entries.',
    },
    {
      title: '2. Cold-Chain Vaccine Dispute Resolution Payoffs (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Modeled liquidated delay damages as payoff matrix values in Kolkata, calculating expected settlement payouts of ₹20,000 under mixed negotiation strategies.',
      lesson: 'Expected utility theory enables hospitals to evaluate commercial risk scientifically.',
    },
    {
      title: '3. Supermarket FMCG Retail Margin Payoff Analysis (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Converted retail market share capture percentages into net operating profit payoffs in ₹ Lakhs in Ichapur, evaluating customer acquisition campaigns.',
      lesson: 'Market share gains map directly into financial payoff entries in zero-sum retail competition.',
    },
    {
      title: '4. Educational High-Tech Lab Patent Licensing Royalties (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Analyzed a ₹55 Lakh university research patent licensing dispute in Jadavpur, using expected payoff formulas (p^T A q) to negotiate an optimal cross-licensing royalty.',
      lesson: 'Mathematical expected utility models establish equitable royalty sharing frameworks.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes payoffGlow {
          0%, 100% { border-color: rgba(52, 211, 153, 0.3); }
          50% { border-color: rgba(52, 211, 153, 0.8); }
        }
        .glow-payoff {
          animation: payoffGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
              Segment 5 • Module 005_001 • Topic 2
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
              Utility Theory • Expected Payoff p^T A q • Zero-Sum Balance
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
            Payoff Concept
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A microscopic study of the <span className="text-emerald-400 font-semibold">Payoff Concept</span> in Game Theory: understanding <span className="text-sky-400 font-semibold">Von Neumann-Morgenstern (VNM) Utility Theory</span>, computing the <span className="text-amber-400 font-semibold">Expected Payoff Equation (E(p, q) = pᵀ A q)</span>, interpreting positive, negative, and zero payoffs, and managing strategic rewards in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'payoff-foundations', label: '1. Payoff Foundations' },
              { id: 'interactive-evaluator', label: '2. Expected Payoff Evaluator' },
              { id: 'interpretation-guide', label: '3. Matrix Entry Guide' },
              { id: 'svg-payoffs', label: '4. Payoff Mapping SVG' },
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

        {/* SECTION 1: Payoff Foundations */}
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
                Payoff Formulation & Expected Utility Theory
              </h2>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2 font-mono text-xs sm:text-sm">
              <span className="text-emerald-300 font-bold font-sans text-base">Mathematical Formulation:</span>
              <p className="text-white">
                1. Pure Strategy Payoff: &nbsp; <span className="text-cyan-300 font-bold">u_A(A_i, B_j) = a_ij, &nbsp; u_B(A_i, B_j) = −a_ij</span><br />
                2. Expected Mixed Payoff: &nbsp; <span className="text-emerald-400 font-bold">E(p, q) = Σ_{i=1}^m Σ_{j=1}^n p_i * q_j * a_ij = pᵀ A q</span><br />
                3. Zero-Sum Balance: &nbsp; <span className="text-amber-400 font-bold">E_A(p, q) + E_B(p, q) = ₹0 strictly</span>
              </p>
              <div className="pt-2 border-t border-slate-800 text-slate-300 font-sans text-xs">
                <strong>VNM Axiom:</strong> Rational decision-makers act to maximize mathematical expected utility under probabilistic uncertainty.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Expected Payoff Evaluator */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-payoff">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Payoff Matrix & Expected Value Evaluator
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Customize the 2×2 Payoff Matrix entries (in ₹) and probability sliders to calculate the mathematical expected payoff:
            </p>

            {/* Matrix Input Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <label className="text-[11px] font-semibold text-sky-400">a₁₁ (A₁, B₁) ₹:</label>
                <input
                  type="number"
                  value={val11}
                  onChange={(e) => setVal11(Number(e.target.value))}
                  className="px-2 py-1 bg-slate-900 border border-slate-700 text-white font-mono text-xs rounded"
                />
              </div>

              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <label className="text-[11px] font-semibold text-sky-400">a₁₂ (A₁, B₂) ₹:</label>
                <input
                  type="number"
                  value={val12}
                  onChange={(e) => setVal12(Number(e.target.value))}
                  className="px-2 py-1 bg-slate-900 border border-slate-700 text-white font-mono text-xs rounded"
                />
              </div>

              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <label className="text-[11px] font-semibold text-purple-400">a₂₁ (A₂, B₁) ₹:</label>
                <input
                  type="number"
                  value={val21}
                  onChange={(e) => setVal21(Number(e.target.value))}
                  className="px-2 py-1 bg-slate-900 border border-slate-700 text-white font-mono text-xs rounded"
                />
              </div>

              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <label className="text-[11px] font-semibold text-purple-400">a₂₂ (A₂, B₂) ₹:</label>
                <input
                  type="number"
                  value={val22}
                  onChange={(e) => setVal22(Number(e.target.value))}
                  className="px-2 py-1 bg-slate-900 border border-slate-700 text-white font-mono text-xs rounded"
                />
              </div>
            </div>

            {/* Probability Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-rose-400 font-semibold">Player A: p(A₁) = {(probA1 * 100).toFixed(0)}%</span>
                  <span className="text-slate-400 font-mono">p(A₂) = {(probA2 * 100).toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={probA1}
                  onChange={(e) => setProbA1(Number(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-sky-400 font-semibold">Player B: q(B₁) = {(probB1 * 100).toFixed(0)}%</span>
                  <span className="text-slate-400 font-mono">q(B₂) = {(probB2 * 100).toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={probB1}
                  onChange={(e) => setProbB1(Number(e.target.value))}
                  className="w-full accent-sky-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Algebraic Term Expansion */}
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-slate-300 flex flex-col space-y-1">
              <span className="text-amber-300 font-bold font-sans">Algebraic Term Expansion:</span>
              <p>
                E(p, q) = ({probA1.toFixed(2)}×{probB1.toFixed(2)}×{val11}) + ({probA1.toFixed(2)}×{probB2.toFixed(2)}×{val12}) + ({probA2.toFixed(2)}×{probB1.toFixed(2)}×{val21}) + ({probA2.toFixed(2)}×{probB2.toFixed(2)}×{val22})
              </p>
              <p className="text-cyan-300 font-bold">
                E(p, q) = {term1.toFixed(0)} + ({term2.toFixed(0)}) + {term3.toFixed(0)} + {term4.toFixed(0)}
              </p>
            </div>

            {/* Calculated Result Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs sm:text-sm">
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <span className="text-slate-400 font-sans text-xs">Expected Payoff to Player A:</span>
                <span className={clsx('font-bold text-lg', expectedPayoffA >= 0 ? 'text-emerald-400' : 'text-rose-400')}>
                  {expectedPayoffA >= 0 ? `+₹${expectedPayoffA.toLocaleString(undefined, { maximumFractionDigits: 0 })}` : `−₹${Math.abs(expectedPayoffA).toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
                </span>
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <span className="text-slate-400 font-sans text-xs">Expected Payoff to Player B:</span>
                <span className={clsx('font-bold text-lg', expectedPayoffB >= 0 ? 'text-emerald-400' : 'text-rose-400')}>
                  {expectedPayoffB >= 0 ? `+₹${expectedPayoffB.toLocaleString(undefined, { maximumFractionDigits: 0 })}` : `−₹${Math.abs(expectedPayoffB).toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
                </span>
              </div>

              <div className="p-3.5 bg-emerald-950/60 rounded-xl border border-emerald-600 flex flex-col space-y-1">
                <span className="text-slate-300 font-sans text-xs">Zero-Sum Conservation:</span>
                <span className="text-emerald-300 font-bold text-lg">E_A + E_B = ₹0 ✅</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Matrix Entry Guide */}
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
                Matrix Entry Interpretation Guide
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-bold font-mono text-base">+a_ij &gt; 0 (Positive)</span>
                <p className="text-slate-300 text-xs">Player A GAINS ₹a_ij; Player B PAYS ₹a_ij.</p>
                <span className="text-emerald-400 font-mono text-[11px]">Net transfer from Col to Row.</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-rose-400 font-bold font-mono text-base">−a_ij &lt; 0 (Negative)</span>
                <p className="text-slate-300 text-xs">Player A LOSES ₹|a_ij|; Player B GAINS ₹|a_ij|.</p>
                <span className="text-rose-400 font-mono text-[11px]">Net transfer from Row to Col.</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-400 font-bold font-mono text-base">a_ij = 0 (Zero)</span>
                <p className="text-slate-300 text-xs">Breakeven draw outcome; zero net capital transfer.</p>
                <span className="text-amber-400 font-mono text-[11px]">Neither player gains or loses.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Payoff Mapping SVG */}
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
                Joint Strategy Profile to Payoff Mapping Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 180"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                <rect x="50" y="45" width="180" height="90" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <text x="140" y="75" fill="#f43f5e" fontSize="11" fontWeight="bold" textAnchor="middle">Player A (p)</text>
                <text x="140" y="100" fill="#cbd5e1" fontSize="9" textAnchor="middle">p = (p₁, p₂)</text>

                <rect x="510" y="45" width="180" height="90" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="600" y="75" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Player B (q)</text>
                <text x="600" y="100" fill="#cbd5e1" fontSize="9" textAnchor="middle">q = (q₁, q₂)</text>

                <line x1="230" y1="90" x2="310" y2="90" stroke="#a855f7" strokeWidth="2" />
                <polygon points="310,90 300,85 300,95" fill="#a855f7" />

                <line x1="510" y1="90" x2="430" y2="90" stroke="#a855f7" strokeWidth="2" />
                <polygon points="430,90 440,85 440,95" fill="#a855f7" />

                <rect x="310" y="35" width="120" height="110" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="370" y="65" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">E(p, q)</text>
                <text x="370" y="90" fill="#ffffff" fontSize="10" fontFamily="monospace" textAnchor="middle">pᵀ A q</text>
                <text x="370" y="120" fill="#a7f3d0" fontSize="9" textAnchor="middle">Payoff (₹)</text>
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
                Bengal Operations Research Payoff Case Studies
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
                  trap: 'Assuming Matrix Entries Represent Payoffs to Both Players Simultaneously',
                  fix: 'Matrix entries a_ij ALWAYS represent payoffs to Player A (Row Player); Player B’s payoff is strictly -a_ij.',
                },
                {
                  trap: 'Forgetting that Negative Payoffs Mean Player A Pays Player B',
                  fix: 'A negative value like -₹20,000 means Player A loses ₹20,000 and Player B gains ₹20,000.',
                },
                {
                  trap: 'Treating Third-Party Fee Leakage as a Zero-Sum Game',
                  fix: 'If legal, tax, or transaction fees are paid to third parties, total payoff is no longer conserved (it becomes non-zero-sum).',
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
                  Think of the payoff matrix as a cash settlement table: every rupee won by Player A comes directly out of Player B’s bank account!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how expected payoff E(p, q) is linear in both p and q: this bi-linearity is the key property that powers the Minimax Theorem!
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
                Student Revision Checklist (Topic 2)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Defined Payoff as numerical utility or monetary return in Indian Rupees (₹)',
                'Understood VNM Expected Utility Theory and rational maximization',
                'Computed Expected Payoff for mixed strategies: E(p, q) = pᵀ A q',
                'Verified Zero-Sum Conservation: u_A + u_B = 0 and E_A + E_B = 0',
                'Interpreted positive, negative, and zero matrix payoff entries',
                'Reported strategic payoffs with Indian Rupee (₹) currency symbols',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: The Payoff Concept is the quantitative currency of strategic decision-making! Always remember: matrix entries a_ij are from the perspective of Player A, and E(p, q) = pᵀ A q. In our next topic (Topic 3), we will assemble these payoffs into complete Payoff Matrices!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Payoff Concept FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Payoff Concept (Game Theory)"
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
