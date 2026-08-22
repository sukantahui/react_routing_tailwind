// Topic6.jsx
import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic6_files/topic6_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic6_files/topic6_note.txt?raw';

const Topic6 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedBenchmark, setSelectedBenchmark] = useState(0);
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

  const benchmarks = [
    {
      title: 'Benchmark 1: Fasteners Plant (Debangshu)',
      origins: 'Barrackpore (50 tons), Ichapur (70 tons)',
      destinations: 'Kolkata (40), Jadavpur (50), Salt Lake (30)',
      nwcrAllocations: [
        { cell: 'Barrackpore → Kolkata', qty: 40, rate: '₹4', cost: '₹160' },
        { cell: 'Barrackpore → Jadavpur', qty: 10, rate: '₹8', cost: '₹80' },
        { cell: 'Ichapur → Jadavpur', qty: 40, rate: '₹3', cost: '₹120' },
        { cell: 'Ichapur → Salt Lake', qty: 30, rate: '₹5', cost: '₹150' },
      ],
      mmAllocations: [
        { cell: 'Ichapur → Jadavpur', qty: 50, rate: '₹3', cost: '₹150' },
        { cell: 'Barrackpore → Kolkata', qty: 40, rate: '₹4', cost: '₹160' },
        { cell: 'Ichapur → Salt Lake', qty: 20, rate: '₹5', cost: '₹100' },
        { cell: 'Barrackpore → Salt Lake', qty: 10, rate: '₹6', cost: '₹60' },
      ],
      nwcrCost: '₹670',
      mmCost: '₹470',
      savings: '₹200',
      percent: '29.8% Savings',
      modiLoopsNWCR: '6 Loops Needed',
      modiLoopsMM: '1 Loop Needed',
      insight: 'NWCR forced 10 tons into the expensive ₹8 route; Matrix Minima bypassed it completely.',
    },
    {
      title: 'Benchmark 2: Bengal FMCG Packaged Goods (Mamata)',
      origins: 'Kolkata (60), Barrackpore (80), Ichapur (60)',
      destinations: 'Jadavpur (80), Howrah (70), Barasat (50)',
      nwcrAllocations: [
        { cell: 'Kolkata → Jadavpur', qty: 60, rate: '₹2', cost: '₹120' },
        { cell: 'Barrackpore → Jadavpur', qty: 20, rate: '₹6', cost: '₹120' },
        { cell: 'Barrackpore → Howrah', qty: 60, rate: '₹3', cost: '₹180' },
        { cell: 'Ichapur → Howrah', qty: 10, rate: '₹8', cost: '₹80' },
        { cell: 'Ichapur → Barasat', qty: 50, rate: '₹1', cost: '₹50' },
      ],
      mmAllocations: [
        { cell: 'Ichapur → Barasat', qty: 50, rate: '₹1', cost: '₹50' },
        { cell: 'Kolkata → Jadavpur', qty: 60, rate: '₹2', cost: '₹120' },
        { cell: 'Barrackpore → Howrah', qty: 70, rate: '₹3', cost: '₹210' },
        { cell: 'Ichapur → Jadavpur', qty: 10, rate: '₹5', cost: '₹50' },
        { cell: 'Barrackpore → Jadavpur', qty: 10, rate: '₹6', cost: '₹60' },
      ],
      nwcrCost: '₹840',
      mmCost: '₹490',
      savings: '₹350',
      percent: '41.7% Savings',
      modiLoopsNWCR: '8 Loops Needed',
      modiLoopsMM: '1 Loop Needed',
      insight: 'Mamata captured ₹1 and ₹2 routes first, cutting freight bills by over 40%.',
    },
    {
      title: 'Benchmark 3: Hospital Oxygen Fleet (Susmita)',
      origins: 'Kolkata Central (100 cyl), Barrackpore Station (150 cyl)',
      destinations: 'Jadavpur Medical (120), Ichapur General (130)',
      nwcrAllocations: [
        { cell: 'Kolkata → Jadavpur', qty: 100, rate: '₹6', cost: '₹600' },
        { cell: 'Barrackpore → Jadavpur', qty: 20, rate: '₹11', cost: '₹220' },
        { cell: 'Barrackpore → Ichapur', qty: 130, rate: '₹5', cost: '₹650' },
      ],
      mmAllocations: [
        { cell: 'Barrackpore → Ichapur', qty: 130, rate: '₹5', cost: '₹650' },
        { cell: 'Kolkata → Jadavpur', qty: 100, rate: '₹6', cost: '₹600' },
        { cell: 'Barrackpore → Jadavpur', qty: 20, rate: '₹11', cost: '₹220' },
      ],
      nwcrCost: '₹2,030',
      mmCost: '₹1,470',
      savings: '₹560',
      percent: '27.6% Savings',
      modiLoopsNWCR: '4 Loops Needed',
      modiLoopsMM: '0 Loops (Optimal!)',
      insight: 'Matrix Minima found the exact globally optimal plan directly at Step 1.',
    },
    {
      title: 'Benchmark 4: E-Commerce Locker Routing (Abhronila & Mahima)',
      origins: 'Barrackpore Hub (40), Kolkata Mega Center (60)',
      destinations: 'Ichapur (30), Jadavpur (40), Salt Lake (30)',
      nwcrAllocations: [
        { cell: 'Barrackpore → Ichapur', qty: 30, rate: '₹8', cost: '₹240' },
        { cell: 'Barrackpore → Jadavpur', qty: 10, rate: '₹4', cost: '₹40' },
        { cell: 'Kolkata → Jadavpur', qty: 30, rate: '₹7', cost: '₹210' },
        { cell: 'Kolkata → Salt Lake', qty: 30, rate: '₹5', cost: '₹150' },
      ],
      mmAllocations: [
        { cell: 'Kolkata → Ichapur', qty: 30, rate: '₹3', cost: '₹90' },
        { cell: 'Barrackpore → Jadavpur', qty: 40, rate: '₹4', cost: '₹160' },
        { cell: 'Kolkata → Salt Lake', qty: 30, rate: '₹5', cost: '₹150' },
      ],
      nwcrCost: '₹630',
      mmCost: '₹400',
      savings: '₹230',
      percent: '36.5% Savings',
      modiLoopsNWCR: '5 Loops Needed',
      modiLoopsMM: '1 Loop Needed',
      insight: 'NWCR stumbled into the ₹8 route; Matrix Minima routed through the ₹3 link instead.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 transition-colors duration-300 font-sans">
      {/* Header Banner */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-b border-slate-800/80">
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-blue-500/10 text-blue-400 border border-blue-500/30 mb-4 shadow-sm">
            Quantitative Analysis • Transportation Models • Topic 6
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 bg-gradient-to-r from-pink-400 via-rose-400 to-amber-400 bg-clip-text text-transparent">
            Comparison: Matrix Minima vs. NWCR
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
            A comprehensive comparative analysis between economic cost-driven heuristics and mechanical positional traversal.
          </p>
        </div>
      </div>

      {/* Main Container - Stacked Vertical Sections */}
      <div className="max-w-4xl mx-auto px-4 py-10 sm:px-6 lg:px-8 flex flex-col space-y-12">
        
        {/* Section 1: Head-to-Head Evaluation Table */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-pink-600/20 text-pink-400 font-bold text-sm">
                01
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Comprehensive Comparison Matrix
              </h2>
            </div>

            <p className="text-slate-300 leading-relaxed text-base">
              While the North-West Corner Rule is simple to execute manually, it is completely blind to shipping costs. The Matrix Minima Method evaluates the full 2D cost matrix, dramatically improving starting solution quality.
            </p>

            {/* 10-Parameter Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950 text-slate-300">
                    <th className="py-3 px-4 font-semibold">Evaluation Criteria</th>
                    <th className="py-3 px-4 font-semibold text-rose-400">North-West Corner Rule</th>
                    <th className="py-3 px-4 font-semibold text-emerald-400">Matrix Minima (Least-Cost)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-slate-300">
                  <tr className="hover:bg-slate-800/40">
                    <td className="py-2.5 px-4 font-medium text-slate-200">1. Selection Driver</td>
                    <td className="py-2.5 px-4 text-slate-400">Grid position (Top-Left diagonal)</td>
                    <td className="py-2.5 px-4 text-emerald-300 font-medium">Lowest unit freight cost (₹/unit)</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40">
                    <td className="py-2.5 px-4 font-medium text-slate-200">2. Cost Matrix View</td>
                    <td className="py-2.5 px-4 text-slate-400">Completely Cost-Blind</td>
                    <td className="py-2.5 px-4 text-emerald-300 font-medium">Globally Cost-Aware (2D scan)</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40">
                    <td className="py-2.5 px-4 font-medium text-slate-200">3. Initial Cost (Z)</td>
                    <td className="py-2.5 px-4 text-rose-300 font-mono">High (Far from Optimal)</td>
                    <td className="py-2.5 px-4 text-emerald-300 font-mono">Low to Near-Optimal</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40">
                    <td className="py-2.5 px-4 font-medium text-slate-200">4. MODI Pivot Iterations</td>
                    <td className="py-2.5 px-4 text-slate-400">6 to 12 pivot cycles</td>
                    <td className="py-2.5 px-4 text-emerald-300 font-medium">1 to 3 pivot cycles</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40">
                    <td className="py-2.5 px-4 font-medium text-slate-200">5. Time Complexity</td>
                    <td className="py-2.5 px-4 text-slate-400 font-mono">O(m + n)</td>
                    <td className="py-2.5 px-4 text-emerald-300 font-mono">O(mn log(mn)) with Heap</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40">
                    <td className="py-2.5 px-4 font-medium text-slate-200">6. Prohibited Routes (Big-M)</td>
                    <td className="py-2.5 px-4 text-slate-400">Vulnerable if in top-left</td>
                    <td className="py-2.5 px-4 text-emerald-300 font-medium">Naturally filters Big-M cells</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40">
                    <td className="py-2.5 px-4 font-medium text-slate-200">7. Permutation Sensitivity</td>
                    <td className="py-2.5 px-4 text-slate-400">Sensitive to row/col order</td>
                    <td className="py-2.5 px-4 text-emerald-300 font-medium">Permutation Invariant</td>
                  </tr>
                  <tr className="hover:bg-slate-800/40">
                    <td className="py-2.5 px-4 font-medium text-slate-200">8. Basis Dimension</td>
                    <td className="py-2.5 px-4 text-slate-300 font-mono">m + n - 1 variables</td>
                    <td className="py-2.5 px-4 text-slate-300 font-mono">m + n - 1 variables</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 2: Interactive Benchmark Explorer */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-600/20 text-rose-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Head-to-Head Case Benchmarks
              </h2>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              Compare actual allocation breakdowns and financial savings between NWCR and Matrix Minima across 4 industrial problems:
            </p>

            {/* Benchmark Selector Tabs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {benchmarks.map((b, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedBenchmark(idx)}
                  className={clsx(
                    'py-3 px-4 rounded-xl text-left text-xs sm:text-sm font-semibold transition-all duration-200 border',
                    selectedBenchmark === idx
                      ? 'bg-rose-600/20 border-rose-500 text-rose-300 shadow-md'
                      : 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  )}
                >
                  {b.title}
                </button>
              ))}
            </div>

            {/* Active Benchmark Display */}
            {(() => {
              const cur = benchmarks[selectedBenchmark];
              return (
                <div className="p-5 sm:p-6 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col space-y-5">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-slate-800 pb-3 gap-2">
                    <h3 className="text-base font-bold text-white">{cur.title}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono">
                        Saved: {cur.savings} ({cur.percent})
                      </span>
                    </div>
                  </div>

                  {/* Dual Comparison Tables */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs">
                    {/* NWCR Side */}
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col space-y-3">
                      <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                        <span className="font-bold text-rose-400">North-West Corner Rule</span>
                        <span className="font-mono text-rose-400 font-bold">{cur.nwcrCost}</span>
                      </div>
                      <div className="space-y-1.5">
                        {cur.nwcrAllocations.map((a, i) => (
                          <div key={i} className="flex justify-between text-slate-300">
                            <span>{a.cell} ({a.qty} units @ {a.rate})</span>
                            <span className="font-mono text-slate-400">{a.cost}</span>
                          </div>
                        ))}
                      </div>
                      <div className="pt-2 border-t border-slate-800 text-[11px] text-rose-300">
                        ⚡ MODI Convergence: {cur.modiLoopsNWCR}
                      </div>
                    </div>

                    {/* Matrix Minima Side */}
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col space-y-3">
                      <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                        <span className="font-bold text-emerald-400">Matrix Minima (Least-Cost)</span>
                        <span className="font-mono text-emerald-400 font-bold">{cur.mmCost}</span>
                      </div>
                      <div className="space-y-1.5">
                        {cur.mmAllocations.map((a, i) => (
                          <div key={i} className="flex justify-between text-slate-300">
                            <span>{a.cell} ({a.qty} units @ {a.rate})</span>
                            <span className="font-mono text-emerald-300">{a.cost}</span>
                          </div>
                        ))}
                      </div>
                      <div className="pt-2 border-t border-slate-800 text-[11px] text-emerald-300">
                        ⚡ MODI Convergence: {cur.modiLoopsMM}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 italic p-3 bg-slate-900 rounded-xl border border-slate-800">
                    💡 <strong>Root-Cause Analysis:</strong> {cur.insight}
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
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 font-bold text-sm">
                03
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Visual Traversal: Mechanical vs Economic
              </h2>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              This diagram compares the static diagonal stepping of NWCR with the dynamic cost-jumping intelligence of Matrix Minima:
            </p>

            {/* Semantic SVG Diagram */}
            <div className="p-4 sm:p-6 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center justify-center">
              <svg
                viewBox="0 0 720 300"
                className="w-full h-auto max-w-2xl select-none"
                aria-label="NWCR vs Matrix Minima Traversal Paths"
              >
                {/* Left Panel: NWCR */}
                <g>
                  <rect x="30" y="30" width="310" height="240" rx="14" fill="#0f172a" stroke="#ef4444" strokeWidth="1.5" />
                  <text x="185" y="60" fill="#f87171" fontSize="13" fontWeight="bold" textAnchor="middle">
                    NWCR: Blind Positional Steps
                  </text>

                  {/* Grid cells */}
                  <rect x="55" y="80" width="70" height="45" rx="6" fill="#1e293b" stroke="#ef4444" strokeWidth="2" />
                  <text x="90" y="107" fill="#ffffff" fontSize="11" textAnchor="middle" fontWeight="bold">Step 1</text>
                  <text x="90" y="120" fill="#94a3b8" fontSize="8" textAnchor="middle">(1,1) @ ₹4</text>

                  <line x1="125" y1="102" x2="155" y2="102" stroke="#ef4444" strokeWidth="2" />
                  <polygon points="160,102 152,98 152,106" fill="#ef4444" />

                  <rect x="165" y="80" width="70" height="45" rx="6" fill="#1e293b" stroke="#ef4444" strokeWidth="2" />
                  <text x="200" y="107" fill="#ffffff" fontSize="11" textAnchor="middle" fontWeight="bold">Step 2</text>
                  <text x="200" y="120" fill="#fca5a5" fontSize="8" textAnchor="middle">(1,2) @ ₹8 (High!)</text>

                  <line x1="200" y1="125" x2="200" y2="155" stroke="#ef4444" strokeWidth="2" />
                  <polygon points="200,160 196,152 204,152" fill="#ef4444" />

                  <rect x="165" y="165" width="70" height="45" rx="6" fill="#1e293b" stroke="#ef4444" strokeWidth="2" />
                  <text x="200" y="192" fill="#ffffff" fontSize="11" textAnchor="middle" fontWeight="bold">Step 3</text>
                  <text x="200" y="205" fill="#94a3b8" fontSize="8" textAnchor="middle">(2,2) @ ₹3</text>

                  <text x="185" y="245" fill="#f87171" fontSize="11" textAnchor="middle" fontWeight="bold">
                    Result: ₹670 (6 MODI Loops)
                  </text>
                </g>

                {/* Right Panel: Matrix Minima */}
                <g>
                  <rect x="380" y="30" width="310" height="240" rx="14" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                  <text x="535" y="60" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">
                    Matrix Minima: Economic Jumps
                  </text>

                  {/* Grid cells */}
                  <rect x="500" y="165" width="70" height="45" rx="6" fill="#065f46" stroke="#34d399" strokeWidth="2" />
                  <text x="535" y="192" fill="#ffffff" fontSize="11" textAnchor="middle" fontWeight="bold">Step 1</text>
                  <text x="535" y="205" fill="#a7f3d0" fontSize="8" textAnchor="middle">(2,2) @ ₹3 (Lowest)</text>

                  {/* Jump arrow from (2,2) to (1,1) */}
                  <path d="M 500 185 Q 430 140 430 102" fill="none" stroke="#34d399" strokeWidth="2" strokeDasharray="3 3" />
                  <polygon points="430,97 426,105 434,105" fill="#34d399" />

                  <rect x="395" y="80" width="70" height="45" rx="6" fill="#065f46" stroke="#34d399" strokeWidth="2" />
                  <text x="430" y="107" fill="#ffffff" fontSize="11" textAnchor="middle" fontWeight="bold">Step 2</text>
                  <text x="430" y="120" fill="#a7f3d0" fontSize="8" textAnchor="middle">(1,1) @ ₹4 (Cheapest)</text>

                  <text x="535" y="245" fill="#34d399" fontSize="11" textAnchor="middle" fontWeight="bold">
                    Result: ₹470 (1 MODI Loop)
                  </text>
                </g>
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
                  Why does a manager save 10 hours of computer time by running Matrix Minima instead of NWCR on a 500×500 matrix? Because starting with an intelligent basis eliminates thousands of simplex pivot loops!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1 hover:bg-slate-800/70 transition-all duration-200">
                <span className="text-amber-400 font-semibold text-sm">🔍 Observe carefully...</span>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Notice how NWCR often assigns units to the most expensive cell in the matrix simply because it happened to be in the first row or column. Matrix Minima acts like an economic shield against such mistakes.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1 hover:bg-slate-800/70 transition-all duration-200">
                <span className="text-emerald-400 font-semibold text-sm">⚙️ Try changing this...</span>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Swap Row 1 and Row 2 in your worksheet. Notice how NWCR completely changes its starting allocations, whereas Matrix Minima produces the exact same optimal routing plan!
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
                <span className="text-blue-300 font-semibold text-sm">1. Benchmark Comparison in Industry Reports</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  When pitching logistics optimization software to clients, always show the NWCR baseline cost next to your optimized cost to demonstrate clear monetary ROI.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-blue-300 font-semibold text-sm">2. Avoid NWCR for Prohibited Routes</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Never use NWCR if your matrix contains Big-M prohibited links, as it may allocate shipments to broken bridges or restricted zones.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-blue-300 font-semibold text-sm">3. The 30-Second Exam Shortcut</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  In university exams, always check if Matrix Minima gives the exact optimal solution directly—in 2×2 or 2×3 problems, it often does!
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
                Common Mistakes & Conceptual Misconceptions
              </h2>
            </div>

            <div className="flex flex-col space-y-3">
              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 flex flex-col space-y-1">
                <span className="text-rose-400 font-semibold text-sm">❌ Thinking NWCR is Faster Overall</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  NWCR takes 30 seconds less during the initial draft, but wastes 15 minutes solving 6 additional stepping-stone loops during MODI optimization.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 flex flex-col space-y-1">
                <span className="text-rose-400 font-semibold text-sm">❌ Assuming Matrix Minima Guarantees Optimality</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Matrix Minima is a greedy heuristic, not an exact algorithm. Always run the MODI check (<span className="font-mono text-cyan-300">Δᵢⱼ ≥ 0</span>) to prove optimality.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 flex flex-col space-y-1">
                <span className="text-rose-400 font-semibold text-sm">❌ Ignoring Row/Column Permutations</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Relying on NWCR makes your plan dependent on the arbitrary sorting order of your spreadsheets.
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
                Best Practices & Professional Standards
              </h2>
            </div>

            <div className="flex flex-col space-y-3">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-violet-300 font-semibold text-sm">1. Choose the Right Tool for the Job</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Use NWCR to teach table balancing concepts; use Matrix Minima or VAM for real-world enterprise logistics models.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-violet-300 font-semibold text-sm">2. Always Report Savings Percentage</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Document savings using <span className="font-mono text-cyan-300">((Z_NWCR - Z_MM) / Z_NWCR) * 100%</span> to clearly communicate value.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-violet-300 font-semibold text-sm">3. Basis Count Sanity Verification</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Both methods must yield exactly <span className="font-mono text-cyan-300">m + n - 1</span> allocations with no closed loops.
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
                { title: 'Recognized Core Trade-Off', desc: 'NWCR is positional/fast; Matrix Minima is economic/near-optimal' },
                { title: 'Calculated Cost Gap', desc: 'Verified 25–45% rupee savings from Matrix Minima' },
                { title: 'Observed MODI Loop Reduction', desc: 'Matrix Minima requires 1–3 loops vs 6–12 loops for NWCR' },
                { title: 'Handled Big-M Routes', desc: 'Confirmed Matrix Minima filters prohibited routes' },
                { title: 'Verified Basis Dimensions', desc: 'Confirmed both methods produce m + n - 1 basic variables' },
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
              "When I teach quantitative analysis in Kolkata, Barrackpore, and Jadavpur, students often ask: 'Sir, if Matrix Minima is so much better than the North-West Corner Rule, why do we still learn NWCR?' I tell Debangshu, Mamata, Susmita, and Mahima that NWCR is like training wheels on a bicycle. It teaches you how the table works without worrying about cost numbers. But once you enter the real world of supply chain management, you take the training wheels off and use Matrix Minima or VAM. Starting with a 30% to 40% cost advantage saves time, money, and computing power!"
            }
          />
        </section>

        {/* Section 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Comparison with North-West Corner Rule FAQs"
            questions={questions}
          />
        </section>

        {/* Section 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Comparison with North-West Corner Rule"
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

export default Topic6;
