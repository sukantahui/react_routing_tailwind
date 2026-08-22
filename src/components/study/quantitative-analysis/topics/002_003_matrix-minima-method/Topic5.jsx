// Topic5.jsx
import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic5_files/topic5_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic5_files/topic5_note.txt?raw';

const Topic5 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedCase, setSelectedCase] = useState(0);
  const sectionRefs = useRef([]);

  // Intersection observer for section tracking
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

  const caseStudies = [
    {
      title: 'Case 1: Heavy Fasteners Logistics (Debangshu)',
      origins: 'Barrackpore (50 tons), Ichapur (70 tons)',
      destinations: 'Kolkata (40), Jadavpur (50), Salt Lake (30)',
      totalFlow: '120 tons',
      allocations: [
        { route: 'Ichapur → Jadavpur', qty: '50 tons', rate: '₹3/ton', costNum: 150, costFormatted: '₹150', percent: '31.9%' },
        { route: 'Barrackpore → Kolkata', qty: '40 tons', rate: '₹4/ton', costNum: 160, costFormatted: '₹160', percent: '34.0%' },
        { route: 'Ichapur → Salt Lake', qty: '20 tons', rate: '₹5/ton', costNum: 100, costFormatted: '₹100', percent: '21.3%' },
        { route: 'Barrackpore → Salt Lake', qty: '10 tons', rate: '₹6/ton', costNum: 60, costFormatted: '₹60', percent: '12.8%' },
      ],
      totalCost: '₹470',
      nwcrCost: '₹670',
      savings: '₹200 (29.8% Savings)',
      avgRate: '₹3.92 / ton',
      summary: 'Debangshu achieved a 29.8% cost reduction by anchoring the lowest freight links early.',
    },
    {
      title: 'Case 2: Bengal FMCG Packaged Goods (Mamata)',
      origins: 'Kolkata (60), Barrackpore (80), Ichapur (60)',
      destinations: 'Jadavpur (80), Howrah (70), Barasat (50)',
      totalFlow: '200 crates',
      allocations: [
        { route: 'Ichapur → Barasat', qty: '50 crates', rate: '₹1/crate', costNum: 50, costFormatted: '₹50', percent: '10.2%' },
        { route: 'Kolkata → Jadavpur', qty: '60 crates', rate: '₹2/crate', costNum: 120, costFormatted: '₹120', percent: '24.5%' },
        { route: 'Barrackpore → Howrah', qty: '70 crates', rate: '₹3/crate', costNum: 210, costFormatted: '₹210', percent: '42.9%' },
        { route: 'Ichapur → Jadavpur', qty: '10 crates', rate: '₹5/crate', costNum: 50, costFormatted: '₹50', percent: '10.2%' },
        { route: 'Barrackpore → Jadavpur', qty: '10 crates', rate: '₹6/crate', costNum: 60, costFormatted: '₹60', percent: '12.2%' },
      ],
      totalCost: '₹490',
      nwcrCost: '₹840',
      savings: '₹350 (41.7% Savings)',
      avgRate: '₹2.45 / crate',
      summary: 'Mamata cut retail logistics costs by 41.7%, saving ₹350 on initial dispatch.',
    },
    {
      title: 'Case 3: Hospital Oxygen Fleet (Susmita)',
      origins: 'Kolkata Central (100 cyl), Barrackpore Station (150 cyl)',
      destinations: 'Jadavpur Medical (120), Ichapur General (130)',
      totalFlow: '250 cylinders',
      allocations: [
        { route: 'Barrackpore → Ichapur', qty: '130 cyl', rate: '₹5/cyl', costNum: 650, costFormatted: '₹650', percent: '44.2%' },
        { route: 'Kolkata → Jadavpur', qty: '100 cyl', rate: '₹6/cyl', costNum: 600, costFormatted: '₹600', percent: '40.8%' },
        { route: 'Barrackpore → Jadavpur', qty: '20 cyl', rate: '₹11/cyl', costNum: 220, costFormatted: '₹220', percent: '15.0%' },
      ],
      totalCost: '₹1,470',
      nwcrCost: '₹2,030',
      savings: '₹560 (27.6% Savings)',
      avgRate: '₹5.88 / cylinder',
      summary: 'Susmita fulfilled life-critical hospital quotas while staying well within healthcare budgets.',
    },
    {
      title: 'Case 4: E-Commerce Locker Routing (Abhronila & Mahima)',
      origins: 'Barrackpore Hub (40), Kolkata Mega Center (60)',
      destinations: 'Ichapur (30), Jadavpur (40), Salt Lake (30)',
      totalFlow: '100 parcels',
      allocations: [
        { route: 'Kolkata → Ichapur', qty: '30 parcels', rate: '₹3/parcel', costNum: 90, costFormatted: '₹90', percent: '22.5%' },
        { route: 'Barrackpore → Jadavpur', qty: '40 parcels', rate: '₹4/parcel', costNum: 160, costFormatted: '₹160', percent: '40.0%' },
        { route: 'Kolkata → Salt Lake', qty: '30 parcels', rate: '₹5/parcel', costNum: 150, costFormatted: '₹150', percent: '37.5%' },
      ],
      totalCost: '₹400',
      nwcrCost: '₹630',
      savings: '₹230 (36.5% Savings)',
      avgRate: '₹4.00 / parcel',
      summary: 'Abhronila and Mahima captured exact customer delivery windows with optimal fuel expenditure.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 transition-colors duration-300 font-sans">
      {/* Header Banner */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-b border-slate-800/80">
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-blue-500/10 text-blue-400 border border-blue-500/30 mb-4 shadow-sm">
            Quantitative Analysis • Transportation Models • Topic 5
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400 bg-clip-text text-transparent">
            Calculating Initial Transportation Cost
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
            Understand the objective function formulation, product-sum accumulation, line-item financial audits, and comparative baseline benchmarks.
          </p>
        </div>
      </div>

      {/* Main Container - Stacked Vertical Sections */}
      <div className="max-w-4xl mx-auto px-4 py-10 sm:px-6 lg:px-8 flex flex-col space-y-12">
        
        {/* Section 1: Objective Function Formulation */}
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
                The Objective Function: Z = ∑ ∑ c_ij x_ij
              </h2>
            </div>

            <p className="text-slate-300 leading-relaxed text-base">
              The initial transportation cost <strong className="text-emerald-400 font-semibold">Z</strong> represents the total monetary freight expenditure incurred by executing the Initial Basic Feasible Solution (IBFS).
            </p>

            {/* Formula Block */}
            <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-sm text-slate-300 flex flex-col space-y-3">
              <div className="text-emerald-400 font-semibold">Grand Transportation Cost Formula:</div>
              <div className="pl-3 border-l-2 border-emerald-500 flex flex-col space-y-1">
                <span className="text-white font-bold">Z = ∑ᵢ₌₁ᵐ ∑ⱼ₌₁ⁿ (cᵢⱼ · xᵢⱼ)</span>
                <span className="text-slate-400 text-xs">
                  Where cᵢⱼ = freight rate in ₹/unit, xᵢⱼ = allocated shipment volume
                </span>
              </div>
              <div className="text-xs text-slate-400 pt-2 border-t border-slate-900">
                Average Unit Freight Rate:
                <br />
                <span className="text-cyan-300 font-bold">c_avg = Z / Total Flow (in ₹/unit)</span>
              </div>
            </div>

            <div className="flex flex-col space-y-3">
              <h3 className="text-lg font-semibold text-slate-200">The 3 Mathematical Cost Properties</h3>

              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-emerald-400 font-semibold text-sm">1. Linearity & Additivity</span>
                <p className="text-slate-400 text-xs sm:text-sm">
                  Total cost is strictly additive across all basic cells: <span className="font-mono text-slate-200">Z = Cost₁ + Cost₂ + ... + Costₘ₊ₙ₋₁</span>.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-cyan-400 font-semibold text-sm">2. Non-Basic Routes Contribute ₹0</span>
                <p className="text-slate-400 text-xs sm:text-sm">
                  Any unallocated cell has <span className="font-mono text-slate-200">xᵢⱼ = 0</span>, adding zero freight to the financial ledger.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-purple-400 font-semibold text-sm">3. Upper Bound on Global Optimum</span>
                <p className="text-slate-400 text-xs sm:text-sm">
                  The initial cost <span className="font-mono text-slate-200">Z_IBFS</span> provides a guaranteed upper ceiling for the optimal solution (<span className="font-mono text-purple-300">Z_optimal ≤ Z_IBFS</span>).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Interactive Cost Calculator & Breakdown */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-600/20 text-teal-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Line-Item Cost Audit Dashboard
              </h2>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              Select an industrial scenario to view its line-item multiplication audit, route cost percentages, and financial comparison against baseline methods:
            </p>

            {/* Case Selector Tabs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {caseStudies.map((cs, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedCase(idx)}
                  className={clsx(
                    'py-3 px-4 rounded-xl text-left text-xs sm:text-sm font-semibold transition-all duration-200 border',
                    selectedCase === idx
                      ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300 shadow-md'
                      : 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  )}
                >
                  {cs.title}
                </button>
              ))}
            </div>

            {/* Active Case Card */}
            {(() => {
              const cur = caseStudies[selectedCase];
              return (
                <div className="p-5 sm:p-6 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col space-y-5">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-slate-800 pb-3 gap-2">
                    <div>
                      <h3 className="text-lg font-bold text-white">{cur.title}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">Total Physical Volume: {cur.totalFlow}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono">
                        Grand Total: {cur.totalCost}
                      </span>
                    </div>
                  </div>

                  {/* Line Item Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400 bg-slate-900/40">
                          <th className="py-2 px-3">Active Route Link</th>
                          <th className="py-2 px-3">Quantity</th>
                          <th className="py-2 px-3">Unit Freight Rate</th>
                          <th className="py-2 px-3">Subtotal (₹)</th>
                          <th className="py-2 px-3">Share of Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {cur.allocations.map((a, i) => (
                          <tr key={i} className="hover:bg-slate-900/40">
                            <td className="py-2.5 px-3 font-medium text-slate-200">{a.route}</td>
                            <td className="py-2.5 px-3 font-mono text-cyan-300">{a.qty}</td>
                            <td className="py-2.5 px-3 font-mono text-emerald-400">{a.rate}</td>
                            <td className="py-2.5 px-3 font-mono text-white font-bold">{a.costFormatted}</td>
                            <td className="py-2.5 px-3 font-mono text-amber-400 text-xs">{a.percent}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Financial Summary Box */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block">Matrix Minima Total:</span>
                      <span className="text-base font-extrabold text-emerald-400 font-mono">{cur.totalCost}</span>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block">NWCR Baseline Cost:</span>
                      <span className="text-base font-extrabold text-rose-400 font-mono line-through">{cur.nwcrCost}</span>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block">Weighted Average Freight:</span>
                      <span className="text-base font-extrabold text-cyan-400 font-mono">{cur.avgRate}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 italic p-3 bg-slate-900 rounded-xl border border-slate-800">
                    💡 <strong>Financial Impact:</strong> {cur.summary}
                  </p>
                </div>
              );
            })()}
          </div>
        </section>

        {/* Section 3: Semantic SVG Visualizer */}
        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          data-index="2"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 font-bold text-sm">
                03
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Visual Dot-Product Accumulation
              </h2>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              This diagram illustrates how individual route products flow into the grand total financial ledger:
            </p>

            {/* Semantic SVG Diagram */}
            <div className="p-4 sm:p-6 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center justify-center">
              <svg
                viewBox="0 0 720 320"
                className="w-full h-auto max-w-2xl select-none"
                aria-label="Cost Multiplication and Summation Pipeline"
              >
                <defs>
                  <linearGradient id="grandTotalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#047857" />
                  </linearGradient>
                </defs>

                {/* 4 Route Multipliers (Left) */}
                <g>
                  <rect x="30" y="30" width="220" height="50" rx="8" fill="#0f172a" stroke="#334155" />
                  <text x="40" y="52" fill="#93c5fd" fontSize="10">Ichapur &rarr; Jadavpur</text>
                  <text x="40" y="68" fill="#ffffff" fontSize="11" fontWeight="bold">50 tons × ₹3 = ₹150</text>

                  <rect x="30" y="95" width="220" height="50" rx="8" fill="#0f172a" stroke="#334155" />
                  <text x="40" y="117" fill="#93c5fd" fontSize="10">Barrackpore &rarr; Kolkata</text>
                  <text x="40" y="133" fill="#ffffff" fontSize="11" fontWeight="bold">40 tons × ₹4 = ₹160</text>

                  <rect x="30" y="160" width="220" height="50" rx="8" fill="#0f172a" stroke="#334155" />
                  <text x="40" y="182" fill="#93c5fd" fontSize="10">Ichapur &rarr; Salt Lake</text>
                  <text x="40" y="198" fill="#ffffff" fontSize="11" fontWeight="bold">20 tons × ₹5 = ₹100</text>

                  <rect x="30" y="225" width="220" height="50" rx="8" fill="#0f172a" stroke="#334155" />
                  <text x="40" y="247" fill="#93c5fd" fontSize="10">Barrackpore &rarr; Salt Lake</text>
                  <text x="40" y="263" fill="#ffffff" fontSize="11" fontWeight="bold">10 tons × ₹6 = ₹60</text>
                </g>

                {/* Summation Node (Center) */}
                <g>
                  <circle cx="360" cy="155" r="45" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                  <text x="360" y="150" fill="#38bdf8" fontSize="22" fontWeight="bold" textAnchor="middle">∑</text>
                  <text x="360" y="172" fill="#94a3b8" fontSize="10" textAnchor="middle">Sum Terms</text>

                  {/* Connecting Lines */}
                  <line x1="250" y1="55" x2="315" y2="135" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1="250" y1="120" x2="315" y2="150" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1="250" y1="185" x2="315" y2="160" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1="250" y1="250" x2="315" y2="175" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />
                </g>

                {/* Grand Total Box (Right) */}
                <g>
                  <line x1="405" y1="155" x2="475" y2="155" stroke="#10b981" strokeWidth="3" />
                  <polygon points="480,155 470,149 470,161" fill="#10b981" />

                  <rect x="480" y="95" width="210" height="120" rx="14" fill="url(#grandTotalGrad)" stroke="#34d399" strokeWidth="2" />
                  <text x="585" y="130" fill="#d1fae5" fontSize="11" textAnchor="middle" fontWeight="bold">
                    GRAND TOTAL FREIGHT
                  </text>
                  <text x="585" y="165" fill="#ffffff" fontSize="26" fontWeight="extrabold" textAnchor="middle">
                    ₹470
                  </text>
                  <text x="585" y="192" fill="#ecfdf5" fontSize="10" textAnchor="middle">
                    Avg: ₹3.92 / ton (120 tons)
                  </text>
                </g>

                {/* Bottom Callout */}
                <rect x="140" y="285" width="440" height="28" rx="14" fill="#1e293b" />
                <text x="360" y="303" fill="#cbd5e1" fontSize="10" textAnchor="middle">
                  Z = (50×3) + (40×4) + (20×5) + (10×6) = 150 + 160 + 100 + 60 = ₹470
                </text>
              </svg>
            </div>
          </div>
        </section>

        {/* Section 4: Hints & Conceptual Prompts */}
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
                Pedagogical Hints & Deep Thinking Prompts
              </h2>
            </div>

            <div className="flex flex-col space-y-3">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1 hover:bg-slate-800/70 transition-all duration-200">
                <span className="text-cyan-400 font-semibold text-sm">🤔 Think about...</span>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Why does adding an infinitesimal quantity <span className="font-mono text-cyan-300">ε</span> to resolve degeneracy add exactly ₹0 to the calculated total cost? Because <span className="font-mono text-white">cost × ε → 0</span>!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1 hover:bg-slate-800/70 transition-all duration-200">
                <span className="text-amber-400 font-semibold text-sm">🔍 Observe carefully...</span>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Notice that only the basic allocated cells appear in the cost summation. The remaining cells in the table have zero allocation and add nothing to the total bill.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1 hover:bg-slate-800/70 transition-all duration-200">
                <span className="text-emerald-400 font-semibold text-sm">⚙️ Try changing this...</span>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Multiply every unit cost by 2 (e.g., fuel price doubles). Notice that the total cost Z doubles exactly, while the optimal shipping routes remain unchanged!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Professional Tips */}
        <section
          ref={(el) => (sectionRefs.current[4] = el)}
          data-index="4"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 font-bold text-sm">
                05
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Professional Tips & Practical Tricks
              </h2>
            </div>

            <div className="flex flex-col space-y-3">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-blue-300 font-semibold text-sm">1. Itemized Product Writing</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Always write out each product term explicitly (e.g., <span className="font-mono text-cyan-300">50 × ₹3 = ₹150</span>) before adding. This makes finding arithmetic slips effortless.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-blue-300 font-semibold text-sm">2. Rupee Symbol Formatting</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Always include the Indian Rupee symbol (₹) on financial numbers to clearly separate monetary expenditure from physical cargo tons/crates.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-blue-300 font-semibold text-sm">3. Count Verification Before Adding</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Verify that you are summing exactly <span className="font-mono text-cyan-300">m + n - 1</span> terms before calculating the final total.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Common Pitfalls */}
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
                Common Mistakes & Pitfalls
              </h2>
            </div>

            <div className="flex flex-col space-y-3">
              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 flex flex-col space-y-1">
                <span className="text-rose-400 font-semibold text-sm">❌ Summing Unit Rates Instead of Products</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Adding ₹3 + ₹4 + ₹5 + ₹6 = ₹18 instead of multiplying each rate by its allocated cargo quantity.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 flex flex-col space-y-1">
                <span className="text-rose-400 font-semibold text-sm">❌ Skipping an Allocated Term</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Forgetting one of the basic cells during summation, producing an artificially low total cost.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 flex flex-col space-y-1">
                <span className="text-rose-400 font-semibold text-sm">❌ Using Remaining Balances in Multiplication</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Multiplying by leftover capacity instead of the actual assigned volume <span className="font-mono text-cyan-300">x_kl</span>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Best Practices */}
        <section
          ref={(el) => (sectionRefs.current[6] = el)}
          data-index="6"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-violet-600/20 text-violet-400 font-bold text-sm">
                07
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Best Practices & Coding Guidelines
              </h2>
            </div>

            <div className="flex flex-col space-y-3">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-violet-300 font-semibold text-sm">1. Explicit Array Reduce Implementation</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Compute total cost using <span className="font-mono text-cyan-300">allocations.reduce((sum, a) =&gt; sum + a.qty * a.rate, 0)</span> for clean, functional code.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-violet-300 font-semibold text-sm">2. Sanity Benchmark Assertion</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Assert that <span className="font-mono text-cyan-300">Z_MatrixMinima &lt;= Z_NWCR</span> to catch erroneous cell choices.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-violet-300 font-semibold text-sm">3. Label Currency Units</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Format all monetary outputs with <span className="font-mono text-emerald-300">₹</span> to maintain professional presentation standards.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 8: Mini Checklist */}
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
                Student Revision Checklist
              </h2>
            </div>

            <div className="flex flex-col space-y-2.5">
              {[
                { title: 'Listed Basic Cells', desc: 'Identified all m + n - 1 occupied routes' },
                { title: 'Multiplied Volume × Rate', desc: 'Computed individual product terms x_ij · c_ij in ₹' },
                { title: 'Included Dummy Terms', desc: 'Properly set dummy route contributions to ₹0' },
                { title: 'Summed All Products', desc: 'Calculated grand total Z accurately' },
                { title: 'Added Currency Symbol', desc: 'Labeled total cost with the Indian Rupee (₹) symbol' },
                { title: 'Computed Average Rate', desc: 'Calculated weighted average freight cost per unit (Z / Total Flow)' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60 flex items-start space-x-3 hover:bg-slate-800/70 transition-colors"
                >
                  <span className="text-emerald-400 text-base mt-0.5">✅</span>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200">{item.title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 9: Teacher's Note */}
        <section className="flex flex-col space-y-6">
          <Teacher
            note={
              "Whenever Debangshu, Susmita, Mamata, and Mahima present their final transportation calculations in Kolkata, I always ask them to write down every product term explicitly before adding. Do not rush to compute everything in your head! If you write (50×₹3) + (40×₹4) + (20×₹5) + (10×₹6), you can instantly verify each multiplication. Also, remember that your Matrix Minima cost serves as an upper bound: when we move to the MODI method, our goal is to see if we can push that initial cost even lower!"
            }
          />
        </section>

        {/* Section 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Calculating Initial Transportation Cost FAQs"
            questions={questions}
          />
        </section>

        {/* Section 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Calculating Initial Transportation Cost"
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

export default Topic5;
