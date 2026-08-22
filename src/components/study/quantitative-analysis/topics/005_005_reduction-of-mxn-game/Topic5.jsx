// src/components/study/quantitative-analysis/topics/005_005_reduction-of-mxn-game/Topic5.jsx
// React 19 Function-based Component
// Module: 005_005_reduction-of-mxn-game
// Topic 5: Interpreting the reduced game

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

  // Operational Budget & Days in month
  const [monthlyDays, setMonthlyDays] = useState(30);
  const [monthlyBudgetLakhs, setMonthlyBudgetLakhs] = useState(10);

  // Optimal vector p* = [0.60, 0.00, 0.40, 0.00]
  const pStar = [0.6, 0.0, 0.4, 0.0];
  const vStarDaily = 22000; // in ₹

  // Resource allocations
  const daysStrat1 = Math.round(monthlyDays * pStar[0]);
  const daysStrat2 = Math.round(monthlyDays * pStar[1]);
  const daysStrat3 = Math.round(monthlyDays * pStar[2]);
  const daysStrat4 = Math.round(monthlyDays * pStar[3]);

  const budgetStrat1 = (monthlyBudgetLakhs * pStar[0]).toFixed(2);
  const budgetStrat2 = (monthlyBudgetLakhs * pStar[1]).toFixed(2);
  const budgetStrat3 = (monthlyBudgetLakhs * pStar[2]).toFixed(2);
  const budgetStrat4 = (monthlyBudgetLakhs * pStar[3]).toFixed(2);

  const totalMonthlyReturnLakhs = ((vStarDaily * monthlyDays) / 100000).toFixed(2);

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
      title: '1. Foundry Shift Allocation Governance (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Debangshu in Barrackpore scheduled 18 days for Furnace Shift 1 and 12 days for Shift 3, completely closing down unprofitable Shifts 2 and 4, locking in ₹22,000 daily margin (₹6.6 Lakh monthly profit).',
      lesson: 'Translating strategy vectors into shift schedules eliminates operational dead-weight.',
    },
    {
      title: '2. Cold-Chain Transport Fleet Risk Budgeting (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Interpreted q* = [0.55, 0, 0.45, 0] as fleet dispatch ratios in Kolkata, budgeting ₹24,000 per transit cycle to maintain a 100% reliable vaccine cold chain.',
      lesson: 'Defunding dominated logistical routes frees capital for primary supply corridors.',
    },
    {
      title: '3. Supermarket FMCG Retail Resource Budgeting (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Converted p* = [0.625, 0.375] into marketing expenditure in Ichapur: 62.5% budget to digital promos and 37.5% to weekend flyers, achieving ₹35,000 weekly revenue.',
      lesson: 'Mixed strategy ratios prevent competitor counter-programming.',
    },
    {
      title: '4. Educational High-Tech Lab Royalties Settlement (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Interpreted the reduced 2x2 game value in Jadavpur to convince university trustees that settling the dispute at ₹25 Lakh was mathematically optimal.',
      lesson: 'The Game Value v* provides a rock-solid benchmark for contractual buyouts.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes interpGlow {
          0%, 100% { border-color: rgba(16, 185, 129, 0.3); }
          50% { border-color: rgba(16, 185, 129, 0.8); }
        }
        .glow-interp {
          animation: interpGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
              Segment 5 • Module 005_005 • Topic 5
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
              Managerial Interpretation • Resource Allocation • Valuation in ₹
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Interpreting the Reduced Game
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive study on <span className="text-emerald-400 font-semibold">Managerial & Financial Interpretation of Reduced Games</span>: translating mathematical strategy supports into enterprise resource allocations, defunding operational dead-weight, budgeting guaranteed returns (<span className="text-amber-400 font-mono">v*</span>), and evaluating sensitivity thresholds in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'managerial-dimensions', label: '1. 4 Managerial Dimensions' },
              { id: 'interactive-allocator', label: '2. Resource Allocator Studio' },
              { id: 'sensitivity-analysis', label: '3. Sensitivity Thresholds' },
              { id: 'svg-pipeline', label: '4. Managerial Translation SVG' },
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

        {/* SECTION 1: 4 Managerial Dimensions */}
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
                The 4 Dimensions of Managerial Interpretation
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs sm:text-sm font-mono">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-sans font-bold">1. Strategy Support</span>
                <p className="text-slate-300 text-xs">Surviving rows form supp(p*); allocate budget proportionally.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-rose-400 font-sans font-bold">2. Defund Dead-Weight</span>
                <p className="text-slate-300 text-xs">Eliminated actions get ₹0 funding to prevent margin bleed.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-400 font-sans font-bold">3. Valuation v* in ₹</span>
                <p className="text-slate-300 text-xs">Long-run guaranteed expected profit per operational cycle.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-sans font-bold">4. Sensitivity Limits</span>
                <p className="text-slate-300 text-xs">Threshold changes in payoffs before dominance breaks.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Resource Allocator Studio */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-interp">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Enterprise Resource Allocator Studio (p* = [0.6, 0, 0.4, 0]ᵀ)
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Adjust the total production days and budget. Observe how mathematical probabilities p* translate into tangible operational schedules and financial returns:
            </p>

            {/* Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                <div className="flex justify-between items-center text-emerald-400 font-bold">
                  <span>Production Cycle: {monthlyDays} Days</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="60"
                  step="5"
                  value={monthlyDays}
                  onChange={(e) => setMonthlyDays(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                <div className="flex justify-between items-center text-amber-400 font-bold">
                  <span>Total Capital Budget: ₹{monthlyBudgetLakhs} Lakh</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="50"
                  step="2"
                  value={monthlyBudgetLakhs}
                  onChange={(e) => setMonthlyBudgetLakhs(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>
            </div>

            {/* Allocation Table */}
            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3 font-mono text-xs sm:text-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-sans font-semibold">
                    <th className="p-2">Corporate Strategy</th>
                    <th className="p-2">Probability p_i*</th>
                    <th className="p-2 text-emerald-400">Scheduled Days</th>
                    <th className="p-2 text-amber-400">Allocated Budget</th>
                    <th className="p-2">Operational Directive</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-200">
                  <tr className="bg-emerald-950/20">
                    <td className="p-2 font-bold text-white font-sans">Strategy A₁ (High-Tech Shift)</td>
                    <td className="p-2 text-emerald-300 font-bold">60.0% (0.60)</td>
                    <td className="p-2 text-emerald-300 font-bold">{daysStrat1} Days</td>
                    <td className="p-2 text-amber-300 font-bold">₹{budgetStrat1} Lakh</td>
                    <td className="p-2 text-emerald-400 font-bold">✅ Primary Active Workload</td>
                  </tr>
                  <tr className="line-through text-slate-600 bg-rose-950/20">
                    <td className="p-2 font-bold text-slate-500 font-sans">Strategy A₂ (Inefficient Shift)</td>
                    <td className="p-2 text-slate-600">0.0% (0.00)</td>
                    <td className="p-2 text-slate-600">{daysStrat2} Days</td>
                    <td className="p-2 text-slate-600">₹{budgetStrat2} Lakh</td>
                    <td className="p-2 text-rose-400 font-bold">🚫 Defunded (Dead-Weight)</td>
                  </tr>
                  <tr className="bg-emerald-950/20">
                    <td className="p-2 font-bold text-white font-sans">Strategy A₃ (Flexible Shift)</td>
                    <td className="p-2 text-emerald-300 font-bold">40.0% (0.40)</td>
                    <td className="p-2 text-emerald-300 font-bold">{daysStrat3} Days</td>
                    <td className="p-2 text-amber-300 font-bold">₹{budgetStrat3} Lakh</td>
                    <td className="p-2 text-emerald-400 font-bold">✅ Secondary Active Workload</td>
                  </tr>
                  <tr className="line-through text-slate-600 bg-rose-950/20">
                    <td className="p-2 font-bold text-slate-500 font-sans">Strategy A₄ (Outdated Line)</td>
                    <td className="p-2 text-slate-600">0.0% (0.00)</td>
                    <td className="p-2 text-slate-600">{daysStrat4} Days</td>
                    <td className="p-2 text-slate-600">₹{budgetStrat4} Lakh</td>
                    <td className="p-2 text-rose-400 font-bold">🚫 Defunded (Dead-Weight)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Financial Summary Card */}
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-600 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs sm:text-sm">
              <div>
                <span className="text-slate-300 font-semibold block">Total Guaranteed Operational Valuation:</span>
                <span className="font-mono text-xs text-emerald-300">
                  {monthlyDays} Days × ₹{vStarDaily.toLocaleString('en-IN')}/day (Game Value v*)
                </span>
              </div>
              <div className="font-mono font-extrabold text-2xl text-emerald-300">
                +₹{totalMonthlyReturnLakhs} Lakh
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Sensitivity Thresholds */}
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
                Dominance Breakdown Sensitivity Analysis
              </h2>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-3 text-xs sm:text-sm">
              <p className="text-slate-300 leading-relaxed">
                In Strategy A₂ [20, 5, 25], it is dominated by A₁ [30, 10, 40]. How much must Strategy A₂ improve before it becomes non-dominated?
              </p>
              <div className="p-3 bg-slate-900 rounded-lg text-amber-300 font-mono text-xs flex flex-col space-y-1">
                <span>• Cell a₂₁ must improve by +₹11k (from ₹20k to &gt; ₹30k)</span>
                <span>• OR Cell a₂₂ must improve by +₹6k (from ₹5k to &gt; ₹10k)</span>
                <span>• Until that threshold is crossed, Strategy A₂ remains dead-weight and should receive ₹0 funding!</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Managerial Translation SVG */}
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
                Mathematical Vectors to Enterprise Operations Pipeline
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 180"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Math Vector */}
                <rect x="20" y="45" width="180" height="90" rx="8" fill="#1e293b" stroke="#818cf8" strokeWidth="2" />
                <text x="110" y="70" fill="#818cf8" fontSize="11" fontWeight="bold" textAnchor="middle">Mathematical Vector</text>
                <text x="110" y="95" fill="#cbd5e1" fontSize="9" textAnchor="middle">p* = [0.6, 0, 0.4, 0]ᵀ</text>
                <text x="110" y="115" fill="#c7d2fe" fontSize="8" textAnchor="middle">v* = ₹22,000</text>

                <line x1="200" y1="90" x2="260" y2="90" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="260,90 250,85 250,95" fill="#38bdf8" />

                {/* Managerial Translation */}
                <rect x="260" y="45" width="220" height="90" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="370" y="70" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">Enterprise Translation</text>
                <text x="370" y="90" fill="#cbd5e1" fontSize="8" textAnchor="middle">Shift 1: 18 Days (60%)</text>
                <text x="370" y="105" fill="#fca5a5" fontSize="8" textAnchor="middle">Shifts 2 & 4: 0 Days (Defunded)</text>
                <text x="370" y="120" fill="#cbd5e1" fontSize="8" textAnchor="middle">Shift 3: 12 Days (40%)</text>

                <line x1="480" y1="90" x2="540" y2="90" stroke="#34d399" strokeWidth="2" />
                <polygon points="540,90 530,85 530,95" fill="#34d399" />

                {/* Corporate Return */}
                <rect x="540" y="45" width="180" height="90" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="630" y="75" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">Financial Return</text>
                <text x="630" y="95" fill="#ffffff" fontSize="9" textAnchor="middle">+₹6.6 Lakh / Month</text>
                <text x="630" y="115" fill="#a7f3d0" fontSize="8" textAnchor="middle">Audited in ₹</text>
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
                Bengal Operations Research Managerial Interpretation Case Studies
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
                  trap: 'Allocating Budget or Days to Eliminated/Pruned Strategies',
                  fix: 'Strategies with probability 0.0 must receive exactly ₹0 funding to prevent operational waste.',
                },
                {
                  trap: 'Playing Only the Higher-Weight Strategy Deterministically (e.g. 100% on Strategy 1)',
                  fix: 'Deterministic play leaks information, enabling competitor counter-strategies. Stick to the randomized mix!',
                },
                {
                  trap: 'Ignoring Dominance Sensitivity When Competitor Costs Shift',
                  fix: 'Re-evaluate matrix cells if market conditions shift by more than the sensitivity threshold.',
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
                  Think of the Game Value v* like the guaranteed yield on a treasury bond: it sets the absolute minimum baseline of financial performance your department is guaranteed to deliver!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how multiplying v* = ₹22,000 by 30 days yields exactly ₹6.6 Lakh, providing a crystal-clear quarterly operational budget!
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
                'Translated mathematical probability vectors into enterprise resource allocations',
                'Defunded structurally dominated operational dead-weight',
                'Interpreted Game Value v* as guaranteed long-run cycle profit',
                'Conducted post-optimality sensitivity assessments',
                'Reported all corporate budgets and returns in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: Game theory is only as valuable as its practical interpretation! Never leave your answer as abstract fractions like p = [0.6, 0.4]. Always explain to executive leaders what those numbers mean in terms of shift hours, marketing budgets, and profit in Indian Rupees (₹). In our next topic (Topic 6), we will tackle diverse Numerical Exercises!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Interpreting the Reduced Game FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Interpreting the Reduced Game"
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
