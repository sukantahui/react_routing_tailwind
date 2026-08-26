// src/components/study/quantitative-analysis/topics/005_006_2xn-and-m-x-2-cases-graphical-and-algebraic-methods/Topic6.jsx
// React 19 Function-based Component
// Module: 005_006_2xn-and-m-x-2-cases-graphical-and-algebraic-methods
// Topic 6: Solving equations for optimal probabilities

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

  // 2x2 Submatrix inputs (in ₹ Thousands)
  const [a11, setA11] = useState(20);
  const [a12, setA12] = useState(50);
  const [a21, setA21] = useState(40);
  const [a22, setA22] = useState(10);

  // Calculations
  const delta = (a11 + a22) - (a12 + a21);
  const isSingular = delta === 0;

  const numP1 = a22 - a21;
  const numQ1 = a22 - a12;

  const p1Val = !isSingular ? numP1 / delta : 0;
  const p2Val = 1 - p1Val;
  const q1Val = !isSingular ? numQ1 / delta : 0;
  const q2Val = 1 - q1Val;

  const vStarVal = !isSingular ? (a11 * a22 - a12 * a21) / delta : 0;

  const isValidSimplex = p1Val &ge; 0 && p1Val &le; 1 && q1Val >= 0 && q1Val <= 1;

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
      title: '1. Foundry 2x2 Sub-Game Balancing (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Debangshu in Barrackpore solved A_sub = [[20, 50], [40, 10]] via indifference equations. Δ = -60, yielding p1* = -30/-60 = 0.50 and q1* = -40/-60 = 2/3, locking in ₹30,000 per shift.',
      lesson: 'Indifference equations protect enterprise margins against competitor espionage.',
    },
    {
      title: '2. Cold-Chain 2x2 Dispatch Balancing (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Solved A_sub = [[10, 50], [40, 20]] with Δ = -60 in Kolkata. Indifference equations gave p1* = -20/-60 = 1/3 and q1* = -30/-60 = 0.50, securing ₹25,000.',
      lesson: 'Equal payoff conditions maintain supply chain stability during price volatility.',
    },
    {
      title: '3. Supermarket FMCG 2x2 Campaign Equation (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Solved A_sub = [[30, 10], [10, 40]] with Δ = 50 in Ichapur, yielding p1* = 30/50 = 0.60 and q1* = 30/50 = 0.60, establishing ₹22,000 revenue.',
      lesson: 'Equating expected payoffs eliminates marketing vulnerability.',
    },
    {
      title: '4. Educational High-Tech Lab 2x2 Patent Equation (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Solved A_sub = [[40, 10], [20, 50]] with Δ = 60 in Jadavpur, yielding p1* = 30/60 = 0.50 and q1* = 40/60 = 2/3, settling institutional royalty at ₹30 Lakh.',
      lesson: 'Algebraic probability equations deliver auditable numbers for licensing contracts.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes eqGlow6 {
          0%, 100% { border-color: rgba(56, 189, 248, 0.3); }
          50% { border-color: rgba(56, 189, 248, 0.8); }
        }
        .glow-eq6 {
          animation: eqGlow6 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Segment 5 • Module 005_006 • Topic 6
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Solving Probability Equations • Indifference Principle • Cramer's Δ in ₹
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Solving Equations for Optimal Probabilities
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive derivation of <span className="text-sky-400 font-semibold">Simultaneous Probability Equations</span>: mastering the <span className="text-amber-400 font-semibold">Indifference Principle (Equal Payoff Condition)</span>, formulating Cramer's determinant (<span className="text-emerald-400 font-mono">Δ = (a₁₁ + a₂₂) − (a₁₂ + a₂₁)</span>), and computing exact mixed strategies in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'indifference-theory', label: '1. Indifference Principle' },
              { id: 'interactive-solver', label: '2. Equation Solver Studio' },
              { id: 'cramers-rule', label: '3. Cramer’s Rule Matrix' },
              { id: 'svg-geometry', label: '4. Determinant Balance SVG' },
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

        {/* SECTION 1: Indifference Principle */}
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
                The Indifference Principle (Equal Payoff Theorem)
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm font-mono">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                <span className="text-amber-400 font-sans font-bold">Player A Indifference Equation:</span>
                <p className="text-slate-300 text-xs">
                  • E(p, B₁) = E(p, B₂) ➔ p₁a₁₁ + (1−p₁)a₂₁ = p₁a₁₂ + (1−p₁)a₂₂
                </p>
                <div className="p-2 bg-slate-900 rounded text-emerald-300 font-bold text-xs">
                  p₁* = (a₂₂ − a₂₁) / Δ &nbsp; (where Δ = (a₁₁+a₂₂) − (a₁₂+a₂₁))
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                <span className="text-rose-400 font-sans font-bold">Player B Indifference Equation:</span>
                <p className="text-slate-300 text-xs">
                  • E(A₁, q) = E(A₂, q) ➔ q₁a₁₁ + (1−q₁)a₁₂ = q₁a₂₁ + (1−q₁)a₂₂
                </p>
                <div className="p-2 bg-slate-900 rounded text-emerald-300 font-bold text-xs">
                  q₁* = (a₂₂ − a₁₂) / Δ &nbsp; (where Δ = (a₁₁+a₂₂) − (a₁₂+a₂₁))
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Equation Solver Studio */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-eq6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Simultaneous Probability Equation Solver Studio
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Adjust the 4 submatrix cells (in <span className="text-emerald-400 font-bold">₹ Thousands</span>). Observe how simultaneous linear equations compute determinant Δ, probabilities p*, q*, and game value v*:
            </p>

            {/* Editable Matrix Grid */}
            <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto font-mono text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <span className="text-slate-400">a₁₁ (A₁ vs B₁):</span>
                <input
                  type="number"
                  value={a11}
                  onChange={(e) => setA11(parseFloat(e.target.value) || 0)}
                  className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white font-bold"
                /&gt;
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <span className="text-slate-400">a₁₂ (A₁ vs B₂):</span>
                <input
                  type="number"
                  value={a12}
                  onChange={(e) => setA12(parseFloat(e.target.value) || 0)}
                  className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white font-bold"
                /&gt;
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <span className="text-slate-400">a₂₁ (A₂ vs B₁):</span>
                <input
                  type="number"
                  value={a21}
                  onChange={(e) => setA21(parseFloat(e.target.value) || 0)}
                  className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white font-bold"
                /&gt;
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <span className="text-slate-400">a₂₂ (A₂ vs B₂):</span>
                <input
                  type="number"
                  value={a22}
                  onChange={(e) => setA22(parseFloat(e.target.value) || 0)}
                  className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-white font-bold"
                /&gt;
              </div>
            </div>

            {/* Solved Results */}
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-3 font-mono text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-slate-400 font-sans text-xs">Game Determinant Δ:</span>
                  <span className="text-purple-300 font-bold">
                    ({a11} + {a22}) − ({a12} + {a21}) = {delta}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-slate-400 font-sans text-xs">Player A Strategy p*:</span>
                  <span className="text-rose-300 font-bold">
                    p₁ = {p1Val.toFixed(3)}, p₂ = {p2Val.toFixed(3)}
                  </span>
                </div>

                <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-800 flex flex-col space-y-1">
                  <span className="text-slate-400 font-sans text-xs">Player B Strategy q*:</span>
                  <span className="text-sky-300 font-bold">
                    q₁ = {q1Val.toFixed(3)}, q₂ = {q2Val.toFixed(3)}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-emerald-950/40 border border-emerald-600 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <span className="text-white font-bold block">Equilibrium Game Value v*:</span>
                  <span className="text-xs text-slate-300">
                    ({a11}×{a22} − {a12}×{a21}) / {delta}
                  </span>
                </div>
                <div className="text-xl font-extrabold text-emerald-300">
                  {isValidSimplex ? `₹${(vStarVal * 1000).toLocaleString('en-IN')}` : 'Invalid Simplex'}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Cramer's Rule Matrix */}
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
                Linear Algebraic & Cramer's Rule Matrix System
              </h2>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-3 text-xs sm:text-sm font-mono">
              <p className="text-slate-300 font-sans leading-relaxed">
                The simultaneous indifference condition and normalization constraint p₁ + p₂ = 1 form the matrix system:
              </p>
              <div className="p-3 bg-slate-900 rounded-lg text-emerald-300 font-bold">
                [ (a₁₁ − a₁₂) &nbsp; (a₂₁ − a₂₂) ] [ p₁ ] = [ 0 ]<br />
                [ &nbsp;&nbsp;&nbsp;&nbsp;1 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ] [ p₂ ] = [ 1 ]
              </div>
              <p className="text-slate-400 text-xs">
                Applying Cramer’s Rule produces det(M) = Δ, with det(M_p1) = a₂₂ − a₂₁, yielding the exact formula p₁* = (a₂₂ − a₂₁) / Δ.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Determinant Balance SVG */}
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
                Indifference Equations & Balance Beam Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 180"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Balance Beam */}
                <polygon points="370,130 350,160 390,160" fill="#64748b" />
                <line x1="120" y1="130" x2="620" y2="130" stroke="#38bdf8" strokeWidth="4" />

                {/* Left Pan */}
                <rect x="70" y="80" width="160" height="50" rx="6" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <text x="150" y="102" fill="#f43f5e" fontSize="9" fontWeight="bold" textAnchor="middle">E(p, B₁) Payoff</text>
                <text x="150" y="118" fill="#cbd5e1" fontSize="8" textAnchor="middle">p₁a₁₁ + (1−p₁)a₂₁</text>

                {/* Equal Sign */}
                <circle cx="370" cy="100" r="14" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="370" y="105" fill="#34d399" fontSize="14" fontWeight="bold" textAnchor="middle">=</text>

                {/* Right Pan */}
                <rect x="510" y="80" width="160" height="50" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="590" y="102" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle">E(p, B₂) Payoff</text>
                <text x="590" y="118" fill="#cbd5e1" fontSize="8" textAnchor="middle">p₁a₁₂ + (1−p₁)a₂₂</text>

                <text x="370" y="45" fill="#fde68a" fontSize="11" fontWeight="bold" textAnchor="middle">
                  INDIFFERENCE PRINCIPLE: BALANCED EXPECTED PAYOFFS AT v*
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
                Bengal Operations Research Probability Equation Case Studies
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
                  trap: 'Swapping the Numerator Terms for p₁* and q₁*',
                  fix: 'Remember: p₁* uses (a₂₂ − a₂₁) (Row 2 column subtraction); q₁* uses (a₂₂ − a₁₂) (Col 2 row subtraction).',
                },
                {
                  trap: 'Forgetting That Negative Numerator Divided by Negative Δ Yields Positive Probability',
                  fix: 'If Δ is negative (e.g. −60), the numerator must also be negative (e.g. −30) so p₁* = −30/−60 = +0.50.',
                },
                {
                  trap: 'Assuming Δ = 0 Means Equal Probabilities',
                  fix: 'When Δ = 0, the equation system is singular and lines are parallel; solve via pure strategy dominance.',
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
                  Think of the indifference principle like balancing two weights on a scale: you adjust the slider (probability) until the scale stays perfectly horizontal regardless of what the opponent does!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how setting p₁ = 0.50 creates an exact payoff of ₹30,000 on Column 1 and ₹30,000 on Column 2, making Player B completely indifferent!
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
                Student Revision Checklist (Topic 6)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Formulated expected payoff indifference equations E(p, B₁) = E(p, B₂)',
                'Computed game determinant Δ = (a₁₁ + a₂₂) − (a₁₂ + a₂₁)',
                'Derived exact closed-form probabilities p₁* and q₁*',
                'Verified probability normalization p₁ + p₂ = 1.0 and q₁ + q₂ = 1.0',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: Solving equations for optimal probabilities unlocks the exact mathematical core of game theory. In our next topic (Topic 7), we will focus on Determining the Value of the Game!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Probability Equations FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Solving Equations for Optimal Probabilities"
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
