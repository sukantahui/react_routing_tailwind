// src/components/study/quantitative-analysis/topics/005_006_2xn-and-m-x-2-cases-graphical-and-algebraic-methods/Topic4.jsx
// React 19 Function-based Component
// Module: 005_006_2xn-and-m-x-2-cases-graphical-and-algebraic-methods
// Topic 4: Finding the optimal mixed strategy graphically

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
  const [activeWorkflowStep, setActiveWorkflowStep] = useState(1);

  // 2x4 Matrix (in ₹ Thousands)
  const matrix = [
    [20, 50, 60, 30],
    [40, 10, 30, 50],
  ];

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
      title: '1. Foundry 2x4 Procurement Optimization (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Debangshu in Barrackpore traced the lower envelope of a 2x4 procurement grid. The Maximin peak pinpointed Columns {1, 2}, yielding p* = [0.50, 0.50] and q* = [0.67, 0.33, 0.00, 0.00]^T, locking in ₹30,000 shift margin.',
      lesson: 'Full strategy vector reconstruction ensures flawless enterprise procurement execution.',
    },
    {
      title: '2. Cold-Chain Transport Optimization (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Located the upper envelope trough at Rows {1, 2} in Kolkata, deriving p* = [0.60, 0.40, 0.00]^T and q* = [0.67, 0.33]^T, capping transport costs at ₹24,000.',
      lesson: 'Visual trough identification streamlines multi-depot fleet scheduling.',
    },
    {
      title: '3. Supermarket FMCG Retail Promotional Optimization (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Pinpointed the Maximin peak of a 2x4 retail game in Ichapur, extracting active Columns {1, 2} to establish q* = [0.50, 0.50, 0, 0] and securing ₹32,000.',
      lesson: 'Graphically derived mixed strategies eliminate competitor promotional counter-attacks.',
    },
    {
      title: '4. Educational High-Tech Lab Patent Arbitration (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Identified the Minimax trough of a 4x2 arbitration grid in Jadavpur, extracting Rows {1, 3} to reconstruct p* = [0.70, 0, 0.30, 0] and settling at ₹20 Lakh.',
      lesson: 'Global audit checks prove mathematical fairness to arbitration panels.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes optGlow4 {
          0%, 100% { border-color: rgba(16, 185, 129, 0.3); }
          50% { border-color: rgba(16, 185, 129, 0.8); }
        }
        .glow-opt4 {
          animation: optGlow4 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
              Segment 5 • Module 005_006 • Topic 4
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
              Finding Optimal Strategies Graphically • Vector Reconstruction in ₹
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Finding the Optimal Mixed Strategy Graphically
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive, step-by-step optimization masterclass: <span className="text-emerald-400 font-semibold">Tracing Boundary Envelopes</span>, locating the <span className="text-amber-400 font-semibold">Maximin Peak (2×n)</span> and <span className="text-rose-400 font-semibold">Minimax Trough (m×2)</span>, extracting active 2×2 submatrices, and reconstructing full probability vectors (<span className="text-sky-400 font-mono">p*, q*</span>) in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'optimization-pipeline', label: '1. Optimization Pipeline' },
              { id: 'interactive-engine', label: '2. Optimization Engine Studio' },
              { id: 'global-audit', label: '3. Global Optimality Audit' },
              { id: 'svg-pipeline', label: '4. Graphical Optimization SVG' },
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
              &gt;
                {item.label}
              </button>
            ))}
          </div>
        </header>

        {/* SECTION 1: Optimization Pipeline */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                01
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                The 5-Step Graphical Strategy Optimization Pipeline
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-bold">1. Plot Lines</span>
                <p className="text-slate-300 text-[11px]">Draw all strategy lines across the 1D simplex.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-400 font-bold">2. Trace Envelope</span>
                <p className="text-slate-300 text-[11px]">Construct Lower Envelope (2xn) or Upper Envelope (mx2).</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-rose-400 font-bold">3. Identify Apex</span>
                <p className="text-slate-300 text-[11px]">Pinpoint Maximin peak or Minimax trough (p₁*, v*).</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-purple-300 font-bold">4. Solve 2×2 Submatrix</span>
                <p className="text-slate-300 text-[11px]">Compute exact algebraic closed-form probabilities.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-bold">5. Reconstruct Vectors</span>
                <p className="text-slate-300 text-[11px]">Assign 0.0 to inactive options; verify in ₹.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Optimization Engine Studio */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-opt4">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Graphical Optimization Engine (2×4 Game Workshop)
              </h2>
            </div>

            {/* Workflow Step Buttons */}
            <div className="flex flex-wrap gap-2">
              {[
                { step: 1, label: 'Step 1: Lower Envelope Peak' },
                { step: 2, label: 'Step 2: Active Columns {B₁, B₂}' },
                { step: 3, label: 'Step 3: Solve 2×2 Submatrix' },
                { step: 4, label: 'Step 4: Reconstruct Full Vectors' },
                { step: 5, label: 'Step 5: Global Optimality Audit' },
              ].map((st) => (
                <button
                  key={st.step}
                  onClick={() => setActiveWorkflowStep(st.step)}
                  className={clsx(
                    'px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border',
                    activeWorkflowStep === st.step
                      ? 'bg-emerald-600 text-white border-emerald-400 shadow-md'
                      : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
                  )}
                &gt;
                  {st.label}
                </button>
              ))}
            </div>

            {/* Step Details Display */}
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-4 font-mono text-xs sm:text-sm">
              {activeWorkflowStep === 1 && (
                <div className="flex flex-col space-y-2">
                  <span className="text-amber-400 font-sans font-bold text-base">Step 1: Trace Lower Envelope & Locate Maximin Peak</span>
                  <p className="text-slate-300 font-sans text-xs sm:text-sm">
                    Plotting lines B₁ (−20p₁+40), B₂ (+40p₁+10), B₃ (+30p₁+30), and B₄ (−20p₁+50). The lower envelope floor reaches its highest peak at the intersection of Line B₁ and Line B₂.
                  </p>
                  <div className="p-3 bg-slate-900 rounded-lg text-emerald-300 font-bold">
                    Intersection Equation: 40 − 20p₁ = 10 + 40p₁ ➔ 60p₁ = 30 ➔ p₁* = 0.50
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg text-amber-300 font-bold">
                    Peak Game Value: v* = 40 − 20(0.50) = +₹30k (₹30,000)
                  </div>
                </div>
              )}

              {activeWorkflowStep === 2 && (
                <div className="flex flex-col space-y-2">
                  <span className="text-sky-400 font-sans font-bold text-base">Step 2: Identify Active Columns {`{B₁, B₂}`}</span>
                  <p className="text-slate-300 font-sans text-xs sm:text-sm">
                    Lines B₁ and B₂ intersect at the peak (v* = ₹30k). Columns B₃ (payoff = ₹45k) and B₄ (payoff = ₹40k) sit strictly ABOVE the lower envelope at p₁ = 0.50, so Player B will NEVER play them!
                  </p>
                  <div className="p-3 bg-slate-900 rounded-lg text-rose-300 font-bold">
                    Active Support: supp(q*) = {`{B₁, B₂}`} | Inactive Columns: {`{B₃, B₄}`} ➔ q₃* = 0.0, q₄* = 0.0
                  </div>
                </div>
              )}

              {activeWorkflowStep === 3 && (
                <div className="flex flex-col space-y-2">
                  <span className="text-purple-300 font-sans font-bold text-base">Step 3: Solve Extracted 2×2 Submatrix</span>
                  <p className="text-slate-300 font-sans text-xs sm:text-sm">
                    Extract submatrix A_sub = [[20, 50], [40, 10]]. Compute Player B's optimal probabilities:
                  </p>
                  <div className="p-3 bg-slate-900 rounded-lg text-emerald-300 font-bold flex flex-col space-y-1">
                    <span>Δ = (20 + 10) − (50 + 40) = 30 − 90 = −60</span>
                    <span>q₁* = (a₂₂ − a₁₂) / Δ = (10 − 50) / −60 = −40 / −60 = 2/3 (≈ 0.667)</span>
                    <span>q₂* = (a₁₁ − a₂₁) / Δ = (20 − 40) / −60 = −20 / −60 = 1/3 (≈ 0.333)</span>
                  </div>
                </div>
              )}

              {activeWorkflowStep === 4 && (
                <div className="flex flex-col space-y-2">
                  <span className="text-emerald-400 font-sans font-bold text-base">Step 4: Reconstruct Full Probability Vectors</span>
                  <p className="text-slate-300 font-sans text-xs sm:text-sm">
                    Map the sub-game solution back to the original full dimensions (2 rows for Player A, 4 columns for Player B):
                  </p>
                  <div className="p-3 bg-slate-900 rounded-lg text-rose-300 font-bold">
                    Player A Optimal Strategy: p* = [0.50, 0.50]ᵀ
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg text-sky-300 font-bold">
                    Player B Optimal Strategy: q* = [2/3, 1/3, 0.00, 0.00]ᵀ &nbsp; (66.7%, 33.3%, 0%, 0%)
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg text-emerald-300 font-bold">
                    Equilibrium Game Value: v* = +₹30,000 (Indian Rupees)
                  </div>
                </div>
              )}

              {activeWorkflowStep === 5 && (
                <div className="flex flex-col space-y-2">
                  <span className="text-teal-300 font-sans font-bold text-base">Step 5: Global Optimality Audit</span>
                  <p className="text-slate-300 font-sans text-xs sm:text-sm">
                    Check expected payoffs under p* = [0.5, 0.5] against all 4 original columns:
                  </p>
                  <div className="p-3 bg-slate-900 rounded-lg text-emerald-300 font-bold flex flex-col space-y-1">
                    <span>• Against B₁: 0.5(20) + 0.5(40) = ₹30k = v* ✅ (Active)</span>
                    <span>• Against B₂: 0.5(50) + 0.5(10) = ₹30k = v* ✅ (Active)</span>
                    <span>• Against B₃: 0.5(60) + 0.5(30) = ₹45k &gt; v* ✅ (Inactive column delivers higher payoff to A)</span>
                    <span>• Against B₄: 0.5(30) + 0.5(50) = ₹40k &gt; v* ✅ (Inactive column delivers higher payoff to A)</span>
                    <span>Global Nash Equilibrium 100% Audited & Verified!</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* SECTION 3: Global Optimality Audit */}
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
                Global Optimality Audit Standard
              </h2>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-3 text-xs sm:text-sm font-mono">
              <p className="text-slate-300 font-sans leading-relaxed">
                In academic examinations and industrial auditing, verify that the reconstructed vectors satisfy the minimax inequality across the original unreduced matrix:
              </p>
              <div className="p-3 bg-slate-900 rounded-lg text-emerald-300 font-bold">
                E(p*, B_j) ≥ v* &nbsp; ∀ j ∈ {`{1, ..., n}`} &nbsp; (for 2×n games)
              </div>
              <div className="p-3 bg-slate-900 rounded-lg text-sky-300 font-bold">
                E(A_i, q*) ≤ v* &nbsp; ∀ i ∈ {`{1, ..., m}`} &nbsp; (for m×2 games)
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Graphical Optimization SVG */}
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
                Graphical Optimization Pipeline Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 180"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Step 1 */}
                <rect x="20" y="45" width="120" height="90" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="80" y="70" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">1. Plot Lines</text>
                <text x="80" y="95" fill="#cbd5e1" fontSize="8" textAnchor="middle">n Lines on Simplex</text>
                <text x="80" y="115" fill="#94a3b8" fontSize="7" textAnchor="middle">Endpoints in ₹</text>

                <line x1="140" y1="90" x2="170" y2="90" stroke="#64748b" strokeWidth="2" />

                {/* Step 2 */}
                <rect x="170" y="45" width="130" height="90" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="235" y="70" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">2. Envelope Apex</text>
                <text x="235" y="95" fill="#cbd5e1" fontSize="8" textAnchor="middle">Maximin Peak (2×n)</text>
                <text x="235" y="115" fill="#fde68a" fontSize="7" textAnchor="middle">p₁* = 0.50, v* = ₹30k</text>

                <line x1="300" y1="90" x2="330" y2="90" stroke="#64748b" strokeWidth="2" />

                {/* Step 3 */}
                <rect x="330" y="45" width="130" height="90" rx="8" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
                <text x="395" y="70" fill="#a855f7" fontSize="10" fontWeight="bold" textAnchor="middle">3. Extract 2×2</text>
                <text x="395" y="95" fill="#cbd5e1" fontSize="8" textAnchor="middle">Active Pair {`{B₁, B₂}`}</text>
                <text x="395" y="115" fill="#e9d5ff" fontSize="7" textAnchor="middle">Closed-form Solve</text>

                <line x1="460" y1="90" x2="490" y2="90" stroke="#64748b" strokeWidth="2" />

                {/* Step 4 */}
                <rect x="490" y="45" width="140" height="90" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <text x="560" y="70" fill="#f43f5e" fontSize="10" fontWeight="bold" textAnchor="middle">4. Full Vectors</text>
                <text x="560" y="95" fill="#cbd5e1" fontSize="8" textAnchor="middle">q* = [2/3, 1/3, 0, 0]ᵀ</text>
                <text x="560" y="115" fill="#fca5a5" fontSize="7" textAnchor="middle">p* = [0.5, 0.5]ᵀ</text>

                <line x1="630" y1="90" x2="660" y2="90" stroke="#64748b" strokeWidth="2" />

                {/* Step 5 */}
                <rect x="660" y="45" width="60" height="90" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="690" y="75" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">5. Audit</text>
                <text x="690" y="95" fill="#ffffff" fontSize="9" textAnchor="middle">✅</text>
                <text x="690" y="115" fill="#a7f3d0" fontSize="7" textAnchor="middle">in ₹</text>
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
                Bengal Operations Research Graphical Optimization Case Studies
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
                  trap: 'Assigning Non-Zero Probability to Inactive Columns Outside the Apex',
                  fix: 'Inactive columns lie strictly outside the envelope vertex and must receive exactly 0.0 probability.',
                },
                {
                  trap: 'Forgetting to Reconstruct Full-Dimensional Probability Vectors',
                  fix: 'If the game is 2x4, report full 4D vector q* = [q₁, q₂, 0, 0]ᵀ (never stop at a 2D subvector).',
                },
                {
                  trap: 'Skipping the Global Optimality Audit',
                  fix: 'Always check that E(p*, B_j) ≥ v* for ALL columns in the original matrix.',
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
                  Think of finding the optimal mixed strategy graphically like sighting a mountain peak through binoculars: first spot the highest summit on the skyline (the lower envelope), then read its GPS coordinates (p₁*, v*)!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how solving the active 2x2 submatrix gives q₁ = 2/3 and q₂ = 1/3, which perfectly matches the slope balance of the two intersecting lines!
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
                Student Revision Checklist (Topic 4)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Traced active lower/upper boundary envelopes',
                'Located Maximin peak (2xn) or Minimax trough (mx2)',
                'Extracted the 2 active lines forming the optimal apex',
                'Solved the 2x2 submatrix using exact closed-form algebraic formulas',
                'Reconstructed full probability vectors (p*, q*) with 0.0 for inactive options',
                'Conducted global optimality audits in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: You now know the complete graphical method inside and out! In our next topic (Topic 5), we will explore the Algebraic Method for solving 2×n and m×2 games!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Finding Optimal Mixed Strategy Graphically FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Finding the Optimal Mixed Strategy Graphically"
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
