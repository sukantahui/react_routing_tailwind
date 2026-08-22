// src/components/study/quantitative-analysis/topics/002_005_test-of-optimality-by-modi-method/Topic5.jsx
// React 19 Function-based Component
// Module: 002_005_test-of-optimality-by-modi-method
// Topic 5: Identifying entering cells

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic5_files/topic5_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic5_files/topic5_note.txt?raw';

const Topic5 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedScenarioIdx, setSelectedScenarioIdx] = useState(0);

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

  // Candidate comparison scenarios
  const scenarios = [
    {
      name: 'Scenario A: Clear Winner (Steepest Descent Selection)',
      desc: 'Two negative evaluations: Candidate 1 with d₂₁ = -₹8 vs. Candidate 2 with d₃₂ = -₹3.',
      candidates: [
        { name: 'Cell (2, 1) [Ichapur ➔ Jadavpur]', d: -8, cost: 5, theta: 60, totalSavings: 480, isWinner: true },
        { name: 'Cell (3, 2) [Kolkata ➔ Salt Lake]', d: -3, cost: 13, theta: 10, totalSavings: 30, isWinner: false },
        { name: 'Cell (1, 3) [Barrackpore ➔ Howrah]', d: 7, cost: 12, theta: 0, totalSavings: 0, isWinner: false },
        { name: 'Cell (3, 1) [Kolkata ➔ Jadavpur]', d: 1, cost: 11, theta: 0, totalSavings: 0, isWinner: false },
      ],
      decision: '⭐ Cell (2, 1) wins decisively with the most negative opportunity cost (d₂₁ = -₹8). Shifting θ = 60 tons saves ₹480 in total freight costs.',
    },
    {
      name: 'Scenario B: Multi-Candidate Tie-Break (Equal Rate d = -₹4)',
      desc: 'Tie between Candidate 1 with d₁₃ = -₹4 and Candidate 2 with d₂₁ = -₹4.',
      candidates: [
        { name: 'Cell (1, 3) [Barrackpore ➔ Howrah]', d: -4, cost: 8, theta: 30, totalSavings: 120, isWinner: true },
        { name: 'Cell (2, 1) [Ichapur ➔ Jadavpur]', d: -4, cost: 6, theta: 10, totalSavings: 40, isWinner: false },
        { name: 'Cell (3, 2) [Kolkata ➔ Salt Lake]', d: 2, cost: 14, theta: 0, totalSavings: 0, isWinner: false },
        { name: 'Cell (2, 3) [Ichapur ➔ Howrah]', d: 5, cost: 10, theta: 0, totalSavings: 0, isWinner: false },
      ],
      decision: '⭐ Tier 1 Tie-Break: Both offer -₹4/unit, but Cell (1, 3) allows larger flow transfer (θ = 30 tons ➔ ₹120 savings vs. θ = 10 tons ➔ ₹40 savings). Cell (1, 3) is chosen!',
    },
  ];

  const currentScenario = scenarios[selectedScenarioIdx];

  // Case Studies
  const caseStudies = [
    {
      title: '1. Foundry Steepest Gradient Selection (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Scanned 4 empty routes for Barrackpore casting shipments. Selected cell (2, 1) with d_21 = -₹8 over cell (3, 2) with d_32 = -₹3, achieving an instant ₹480 cost reduction on iteration 1.',
      lesson: 'Prioritizing the steepest negative gradient accelerates convergence toward the optimal basis.',
    },
    {
      title: '2. Cold-Chain Vaccine Tie-Breaker Resolution (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Tied evaluations at d = -₹4 in a vaccine network. Mamata traced both loops and selected cell (1, 3) which allowed 30 boxes (saving ₹120) over cell (2, 1) which allowed only 10 boxes (saving ₹40).',
      lesson: 'Tier 1 volume comparison triples single-step cost reductions during ties.',
    },
    {
      title: '3. Supermarket FMCG Empty Candidate Set (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Scanned a grocery distribution matrix where all opportunity costs were positive (d ≥ +₹1). Recognized the candidate set was empty and declared global optimality immediately.',
      lesson: 'When no d_ij < 0 exists, there is no entering variable; the solution is already optimal.',
    },
    {
      title: '4. Educational Press Highway Rerouting Decision (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Audited university book logistics. Identified entering cell (1, 2) with d_12 = -₹5, systematically shifting freight away from high-cost local lanes.',
      lesson: 'Entering cell selection provides mathematical justification for switching transport corridors.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes enterPulse {
          0%, 100% { border-color: rgba(234, 179, 8, 0.3); }
          50% { border-color: rgba(234, 179, 8, 0.8); }
        }
        .glow-enter {
          animation: enterPulse 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
              Module 002_005 • Topic 5
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-amber-950/80 text-amber-400 border border-amber-800/60">
              Dantzig's Simplex Pivot Rule
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Identifying Entering Cells
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            How the MODI method selects the optimal route to enter the basis: mastering <span className="text-amber-400 font-semibold">Dantzig's Most Negative Opportunity Cost Rule</span> (<span className="text-emerald-400 font-mono">argmin &#123; dᵢⱼ | dᵢⱼ &lt; 0 &#125;</span>), applying multi-tier tie-breakers (<span className="text-cyan-400 font-mono">max θ · |dᵢⱼ|</span>), and initiating closed-loop flow redistribution.
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'selection-rule', label: '1. Selection Rule & Rationale' },
              { id: 'interactive-lab', label: '2. Candidate Comparator Lab' },
              { id: 'tie-breakers', label: '3. Multi-Tier Tie-Breakers' },
              { id: 'svg-steepest', label: '4. Steepest Descent SVG' },
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

        {/* SECTION 1: Selection Rule & Rationale */}
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
                Dantzig's Most Negative Opportunity Cost Rule
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              When the optimality condition is violated (at least one <span className="font-mono text-rose-400">dᵢⱼ &lt; 0</span>), the entering variable is selected as the unoccupied cell that provides the <strong>steepest marginal rate of cost decrease</strong>:
            </p>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-2">
              <span className="text-amber-300 font-bold text-sm">Entering Cell Selection Criterion</span>
              <div className="p-3 bg-slate-900 rounded font-mono text-emerald-300 text-sm sm:text-base">
                Entering Cell (k, l) = argmin &#123; dᵢⱼ | dᵢⱼ &lt; 0 &#125;
              </div>
              <p className="text-xs text-slate-400">
                Selecting the minimum negative value maximizes the per-unit savings <span className="font-mono text-white">|dᵢⱼ|</span> and minimizes the total number of subsequent MODI simplex pivots.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Interactive Candidate Comparator Lab */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-enter">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 font-bold text-sm">
                  02
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Interactive Candidate Comparator Lab
                </h2>
              </div>
              <div className="flex items-center gap-1.5">
                {scenarios.map((sc, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedScenarioIdx(idx)}
                    className={clsx(
                      'px-3 py-1 rounded text-xs font-semibold transition-all border',
                      selectedScenarioIdx === idx
                        ? 'bg-amber-600 text-white border-amber-400 shadow-md'
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                    )}
                  >
                    {sc.name.split(':')[0]}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300">
              <strong className="text-white">{currentScenario.name}</strong> — {currentScenario.desc}
            </p>

            {/* Candidate Table */}
            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2 font-semibold">Candidate Shipping Route</th>
                    <th className="p-2 font-semibold text-rose-300">Opportunity Cost (dᵢⱼ)</th>
                    <th className="p-2 font-semibold text-cyan-300">Direct Rate (cᵢⱼ)</th>
                    <th className="p-2 font-semibold text-amber-300">Transfer Flow (θ)</th>
                    <th className="p-2 font-semibold text-emerald-300">1-Step Savings (θ · |d|)</th>
                    <th className="p-2 font-semibold text-white">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {currentScenario.candidates.map((cand, idx) => (
                    <tr
                      key={idx}
                      className={clsx(
                        cand.isWinner ? 'bg-amber-950/40 text-white font-bold' : ''
                      )}
                    >
                      <td className="p-2 font-medium">{cand.name}</td>
                      <td
                        className={clsx(
                          'p-2 font-mono font-bold',
                          cand.d < 0 ? 'text-rose-400' : 'text-emerald-400'
                        )}
                      >
                        {cand.d < 0 ? `-₹${Math.abs(cand.d)}` : `+₹${cand.d}`}
                      </td>
                      <td className="p-2 font-mono">₹{cand.cost}</td>
                      <td className="p-2 font-mono">{cand.theta > 0 ? `${cand.theta} tons` : '—'}</td>
                      <td className="p-2 font-mono text-emerald-400">{cand.totalSavings > 0 ? `₹${cand.totalSavings}` : '—'}</td>
                      <td className="p-2">
                        {cand.isWinner ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-600">
                            ENTERING VARIABLE ⭐
                          </span>
                        ) : cand.d < 0 ? (
                          <span className="text-slate-400 text-xs">Runner-Up</span>
                        ) : (
                          <span className="text-slate-600 text-xs">Uncompetitive</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Decision Callout */}
            <div className="p-4 rounded-xl bg-slate-800/50 border border-amber-800/60 text-xs sm:text-sm text-amber-200">
              <p>{currentScenario.decision}</p>
            </div>
          </div>
        </section>

        {/* SECTION 3: Multi-Tier Tie-Breakers */}
        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          data-index="2"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-600/20 text-cyan-400 font-bold text-sm">
                03
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Multi-Tier Tie-Breaking Hierarchy
              </h2>
            </div>

            <div className="flex flex-col space-y-3 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex items-start space-x-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-cyan-600/30 text-cyan-300 font-bold text-xs mt-0.5">
                  1
                </span>
                <div>
                  <h4 className="text-white font-semibold">Tier 1: Maximum Total Cost Reduction (θ · |dᵢⱼ|)</h4>
                  <p className="text-slate-300 mt-0.5">Trace the candidate closed loop for both tied cells; select the candidate that allows a larger flow transfer θ, maximizing total one-step financial savings.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex items-start space-x-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-cyan-600/30 text-cyan-300 font-bold text-xs mt-0.5">
                  2
                </span>
                <div>
                  <h4 className="text-white font-semibold">Tier 2: Lowest Direct Unit Cost (min cᵢⱼ)</h4>
                  <p className="text-slate-300 mt-0.5">If total savings are also identical, select the candidate cell with the smaller raw freight rate cᵢⱼ.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex items-start space-x-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-cyan-600/30 text-cyan-300 font-bold text-xs mt-0.5">
                  3
                </span>
                <div>
                  <h4 className="text-white font-semibold">Tier 3: Arbitrary / Bland's Smallest Index Rule</h4>
                  <p className="text-slate-300 mt-0.5">Select the candidate with the smallest row index i (and smallest col index j) to mathematically eliminate theoretical cycling.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Steepest Descent SVG */}
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
                Steepest Descent Gradient Vector on Simplex Polytope
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 260"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Current Vertex */}
                <circle cx="140" cy="130" r="16" fill="#3b82f6" stroke="#93c5fd" strokeWidth="2" />
                <text x="140" y="170" fill="#93c5fd" fontSize="11" fontWeight="bold" textAnchor="middle">Current Basis Vertex (Z = ₹2,740)</text>

                {/* Candidate Path 1 (Steepest - Winner) */}
                <line x1="154" y1="120" x2="580" y2="60" stroke="#f59e0b" strokeWidth="3.5" />
                <polygon points="580,60 568,57 572,66" fill="#f59e0b" />
                <circle cx="590" cy="60" r="14" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                <text x="590" y="90" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">Entering Cell (2,1) [d = −₹8 ⭐]</text>
                <text x="360" y="75" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">Steepest Descent (Saves ₹8/ton ➔ Z drops to ₹2,260)</text>

                {/* Candidate Path 2 (Shallow - Runner-up) */}
                <line x1="154" y1="140" x2="580" y2="200" stroke="#64748b" strokeWidth="2" strokeDasharray="4 4" />
                <polygon points="580,200 570,194 574,204" fill="#64748b" />
                <circle cx="590" cy="200" r="12" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
                <text x="590" y="230" fill="#94a3b8" fontSize="10" textAnchor="middle">Candidate (3,2) [d = −₹3]</text>
                <text x="360" y="195" fill="#94a3b8" fontSize="10" textAnchor="middle">Shallow Descent (Saves only ₹3/ton)</text>
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 5: Real-World Bengal Case Studies */}
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
                Bengal Logistics Entering Cell Case Studies
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
                  trap: 'Confusing -3 as "Smaller" than -8',
                  fix: 'On the real number line, -8 is strictly LESS than -3. Always pick the most negative value: min(-8, -3) = -8.',
                },
                {
                  trap: 'Attempting to Pick an Entering Cell from Basic Cells',
                  fix: 'Basic cells already carry positive allocations and have d_ij = 0; only empty (non-basic) cells can enter.',
                },
                {
                  trap: 'Ignoring Flow Volume θ During Ties',
                  fix: 'When evaluations are tied at -₹4, test the flow transfer θ to choose the candidate that delivers larger total cost savings.',
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
                  Think about why Dantzig's rule chooses the most negative d_ij: in steep mountain terrain, taking the steepest downward path loses altitude the fastest per step!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully that circling the entering cell and writing (+θ) in its center immediately marks the starting anchor for your stepping-stone loop.
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
                Student Revision Checklist (Topic 5)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Memorized the Entering Cell rule: argmin { d_ij | d_ij < 0 }',
                'Scanned all (m - 1)(n - 1) non-basic cells for negative evaluations',
                'Correctly identified the most negative value (e.g. -8 < -3)',
                'Applied Tier 1 tie-breaker (max θ · |d_ij|) on tied evaluations',
                'Marked entering cell with (+θ) and star (★) on the working tableau',
                'Prepared to construct the closed stepping-stone loop around basic cells',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: identifying the entering cell is the spark that ignites the improvement cycle! When you look at your opportunity costs and find negative numbers, do not rush. Scan the entire tableau and pick the cell with the MOST NEGATIVE value. If you have -₹8 and -₹3, -₹8 is your champion! Circle that cell, write (+θ) right in the center, and get ready to draw your stepping-stone loop. Picking the right entering cell saves you iterations and takes you straight to the global minimum!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Identifying Entering Cells FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Identifying Entering Cells (MODI Method)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic6_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic5;
