// src/components/study/quantitative-analysis/topics/002_005_test-of-optimality-by-modi-method/Topic7.jsx
// React 19 Function-based Component
// Module: 002_005_test-of-optimality-by-modi-method
// Topic 7: Plus-minus allocation pattern

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic7_files/topic7_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic7_files/topic7_note.txt?raw';

const Topic7 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [theta, setTheta] = useState(60); // slider from 0 to 60

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

  // Compute dynamic cell allocations based on theta
  const x11 = 60 - theta;
  const x12 = 10 + theta;
  const x21 = 0 + theta;
  const x22 = 70 - theta;
  const x23 = 20; // unchanged
  const x33 = 60; // unchanged

  // Total cost formula Z = Z_old - 8*theta
  const currentTotalCost = 2740 - (8 * theta);
  const savings = 8 * theta;

  // Case Studies
  const caseStudies = [
    {
      title: '1. Foundry Full Theta Transfer (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Applied plus-minus signs around loop (2,1)[+] ➔ (1,1)[-] ➔ (1,2)[+] ➔ (2,2)[-]. Minus corners were 60 and 70 tons; selected θ = 60 tons, dropping casting freight from ₹2,740 to ₹2,260.',
      lesson: 'Choosing θ = min(x_minus) maximizes cost reduction while strictly maintaining non-negativity.',
    },
    {
      title: '2. Cold-Chain Vaccine Multi-Corner Theta Shift (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Executed a 6-corner loop across Kolkata hospitals with θ = 20 packs. Preserved 100% patient supply at every clinic while trimming ₹60 from emergency hospital freight.',
      lesson: 'Flow conservation (+θ - θ = 0) ensures zero stockouts across healthcare centers.',
    },
    {
      title: '3. Supermarket FMCG Degeneracy Tie-Breaker (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Encountered two minus corners tied at 30 tons. Dropped Cell (1, 2) to non-basic, and retained Cell (2, 3) in the basis with allocation 0, preserving m+n-1=5 basic variables.',
      lesson: 'Drop only one tied minus corner to maintain spanning tree connectivity.',
    },
    {
      title: '4. Educational Press Row-Column Invariance Audit (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Audited row and column totals after plus-minus reallocation. Confirmed all supply and demand sums matched textbook tender specifications to the exact decimal.',
      lesson: 'The plus-minus pattern provides automatic mathematical proof of constraint preservation.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes plusMinusGlow {
          0%, 100% { border-color: rgba(236, 72, 153, 0.3); }
          50% { border-color: rgba(236, 72, 153, 0.8); }
        }
        .glow-pm {
          animation: plusMinusGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
              Module 002_005 • Topic 7
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-pink-950/80 text-pink-400 border border-pink-800/60">
              Flow Redistribution & θ-Pivoting
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Plus-Minus Allocation Pattern
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            The mechanical engine of flow reallocation in the MODI method: understanding the <span className="text-pink-400 font-semibold">Sign Assignment Protocol</span> (<span className="text-emerald-400 font-mono">+θ</span> at enter, alternating <span className="text-rose-400 font-mono">-θ</span>, <span className="text-emerald-400 font-mono">+θ</span>), calculating maximum allowable transfer <span className="text-amber-400 font-mono">θ = min(x_minus)</span>, and determining the leaving variable.
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'protocol', label: '1. Sign Protocol' },
              { id: 'interactive-theta', label: '2. Interactive θ-Pivoting Workbench' },
              { id: 'leaving-variable', label: '3. Leaving Variable & Ties' },
              { id: 'svg-flow', label: '4. Flow Conservation SVG' },
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
                    ? 'bg-pink-600 text-white border-pink-500 shadow-md shadow-pink-900/40'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </header>

        {/* SECTION 1: Sign Protocol */}
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
                The Sign Assignment & Flow Conservation Protocol
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-emerald-800/40 flex flex-col space-y-2">
                <span className="text-emerald-300 font-bold">1. Entering Cell Gets (+θ)</span>
                <p className="text-slate-300">
                  Because the entering route is currently empty (<span className="font-mono">x = 0</span>), assigning <span className="font-mono text-emerald-400">+θ</span> brings it into the basis with positive cargo volume.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-pink-800/40 flex flex-col space-y-2">
                <span className="text-pink-300 font-bold">2. Strict Alternation (+, -, +, -)</span>
                <p className="text-slate-300">
                  Moving consecutively around the closed loop corners, signs alternate strictly. Consecutive corners can never have the same sign.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-cyan-800/40 flex flex-col space-y-2">
                <span className="text-cyan-300 font-bold">3. Conservation (+θ - θ = 0)</span>
                <p className="text-slate-300">
                  Every active row and column has exactly one <span className="font-mono text-emerald-400">+θ</span> and one <span className="font-mono text-rose-400">-θ</span>, ensuring supply <span className="font-mono text-amber-300">Sᵢ</span> and demand <span className="font-mono text-amber-300">Dⱼ</span> are 100% conserved.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Interactive Theta-Pivoting Workbench */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-pm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-pink-600/20 text-pink-400 font-bold text-sm">
                  02
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Interactive θ-Pivoting Workbench
                </h2>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="text-slate-300">θ = {theta} tons</span>
                <span className="text-emerald-400 font-bold">(Saved: ₹{savings})</span>
              </div>
            </div>

            {/* Slider Control */}
            <div className="flex flex-col space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="flex justify-between text-xs text-slate-400 font-mono">
                <span>θ = 0 tons (Initial Plan)</span>
                <span className="text-amber-300 font-bold">Slide to transfer flow ➔</span>
                <span className="text-emerald-400 font-bold">θ = 60 tons (Max Transfer)</span>
              </div>
              <input
                type="range"
                min="0"
                max="60"
                step="5"
                value={theta}
                onChange={(e) => setTheta(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
              />
            </div>

            {/* Tableau Visualizer */}
            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-4">
              <table className="w-full text-center border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2 text-left font-semibold text-slate-300">Origins \ Dests</th>
                    <th className="p-2 font-semibold text-cyan-300">Jadavpur (D1)</th>
                    <th className="p-2 font-semibold text-cyan-300">Salt Lake (D2)</th>
                    <th className="p-2 font-semibold text-cyan-300">Howrah (D3)</th>
                    <th className="p-2 font-semibold text-amber-300">Supply Check</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Row 1 */}
                  <tr className="border-b border-slate-800/60">
                    <td className="p-2.5 text-left font-medium text-slate-200">Barrackpore (S1)</td>
                    <td className="p-2">
                      <div className="p-2 rounded bg-rose-950/80 text-rose-200 border border-rose-600 flex flex-col items-center">
                        <span className="text-[10px] text-rose-300 font-bold">60 - {theta}</span>
                        <span className="font-mono font-bold text-sm text-white">x₁₁ = {x11}</span>
                        <span className="text-[9px] text-rose-400">(-θ Corner)</span>
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="p-2 rounded bg-emerald-950/80 text-emerald-200 border border-emerald-600 flex flex-col items-center">
                        <span className="text-[10px] text-emerald-300 font-bold">10 + {theta}</span>
                        <span className="font-mono font-bold text-sm text-white">x₁₂ = {x12}</span>
                        <span className="text-[9px] text-emerald-400">(+θ Corner)</span>
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="p-2 rounded bg-slate-900 text-slate-500 border border-slate-800">
                        <span>— (Empty)</span>
                      </div>
                    </td>
                    <td className="p-2 font-mono font-bold text-amber-300">{x11 + x12} == 70 ✅</td>
                  </tr>

                  {/* Row 2 */}
                  <tr className="border-b border-slate-800/60">
                    <td className="p-2.5 text-left font-medium text-slate-200">Ichapur (S2)</td>
                    <td className="p-2">
                      <div className="p-2 rounded bg-emerald-950/80 text-emerald-200 border border-emerald-600 flex flex-col items-center">
                        <span className="text-[10px] text-emerald-300 font-bold">0 + {theta}</span>
                        <span className="font-mono font-bold text-sm text-white">x₂₁ = {x21}</span>
                        <span className="text-[9px] text-amber-300">(+θ ENTER ⭐)</span>
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="p-2 rounded bg-rose-950/80 text-rose-200 border border-rose-600 flex flex-col items-center">
                        <span className="text-[10px] text-rose-300 font-bold">70 - {theta}</span>
                        <span className="font-mono font-bold text-sm text-white">x₂₂ = {x22}</span>
                        <span className="text-[9px] text-rose-400">(-θ Corner)</span>
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="p-2 rounded bg-slate-900 text-slate-300 border border-slate-800">
                        <span className="font-mono font-bold">x₂₃ = 20</span>
                      </div>
                    </td>
                    <td className="p-2 font-mono font-bold text-amber-300">{x21 + x22 + x23} == 90 ✅</td>
                  </tr>

                  {/* Row 3 */}
                  <tr className="border-b border-slate-800/60">
                    <td className="p-2.5 text-left font-medium text-slate-200">Kolkata (S3)</td>
                    <td className="p-2">
                      <div className="p-2 rounded bg-slate-900 text-slate-500 border border-slate-800">
                        <span>— (Empty)</span>
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="p-2 rounded bg-slate-900 text-slate-500 border border-slate-800">
                        <span>— (Empty)</span>
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="p-2 rounded bg-slate-900 text-slate-300 border border-slate-800">
                        <span className="font-mono font-bold">x₃₃ = 60</span>
                      </div>
                    </td>
                    <td className="p-2 font-mono font-bold text-amber-300">{x33} == 60 ✅</td>
                  </tr>

                  {/* Demand Check */}
                  <tr className="bg-slate-900/40 text-slate-300 font-mono">
                    <td className="p-2.5 text-left font-semibold text-amber-300">Demand Check</td>
                    <td className="p-2 font-bold text-amber-300">{x11 + x21} == 60 ✅</td>
                    <td className="p-2 font-bold text-amber-300">{x12 + x22} == 80 ✅</td>
                    <td className="p-2 font-bold text-amber-300">{x23 + x33} == 80 ✅</td>
                    <td className="p-2 font-bold text-white">∑ 220 ✅</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Financial Status Summary */}
            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs sm:text-sm">
              <div>
                <span className="text-slate-300 font-semibold">Total Cost Equation:</span>{' '}
                <span className="font-mono text-white">Z = ₹2,740 - (8 × {theta}) = <strong className="text-emerald-400 text-base">₹{currentTotalCost}</strong></span>
              </div>
              <div className="text-pink-300 font-bold">
                {theta === 60 ? '⭐ PIVOT COMPLETE: Cell (1,1) drops to 0 and leaves basis!' : `Transferring ${theta} of 60 max tons...`}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Leaving Variable & Ties */}
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
                Leaving Variable Determination & Tie-Breaking
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-rose-800/40 flex flex-col space-y-2">
                <span className="text-rose-300 font-bold">1. Standard Leaving Variable</span>
                <p className="text-slate-300">
                  The minus corner with <span className="font-mono text-white">x_ij - θ = 0</span> drops to zero and <strong>exits the basis</strong>, becoming an empty non-basic cell.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-amber-800/40 flex flex-col space-y-2">
                <span className="text-amber-300 font-bold">2. Tie-Breaking Protocol</span>
                <p className="text-slate-300">
                  If two minus corners hit zero simultaneously, drop <strong>EXACTLY ONE cell</strong> to empty; keep the other in the basis with allocation <span className="font-mono text-amber-300">x = 0</span> to prevent basis degeneracy!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Flow Conservation SVG */}
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
                Flow Redistribution Around the Closed Loop
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 260"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* 4 Corners */}
                <rect x="80" y="40" width="220" height="80" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <text x="190" y="70" fill="#f43f5e" fontSize="12" fontWeight="bold" textAnchor="middle">Cell (1,1) [Barrackpore ➔ Jadavpur]</text>
                <text x="190" y="95" fill="#ffffff" fontSize="13" fontFamily="monospace" fontWeight="bold" textAnchor="middle">60 − 60 = 0 (Leaves Basis)</text>

                <rect x="440" y="40" width="220" height="80" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <text x="550" y="70" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">Cell (1,2) [Barrackpore ➔ Salt Lake]</text>
                <text x="550" y="95" fill="#ffffff" fontSize="13" fontFamily="monospace" fontWeight="bold" textAnchor="middle">10 + 60 = 70 tons</text>

                <rect x="440" y="150" width="220" height="80" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <text x="550" y="180" fill="#f43f5e" fontSize="12" fontWeight="bold" textAnchor="middle">Cell (2,2) [Ichapur ➔ Salt Lake]</text>
                <text x="550" y="205" fill="#ffffff" fontSize="13" fontFamily="monospace" fontWeight="bold" textAnchor="middle">70 − 60 = 10 tons</text>

                <rect x="80" y="150" width="220" height="80" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="190" y="180" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle">Cell (2,1) [Ichapur ➔ Jadavpur]</text>
                <text x="190" y="205" fill="#ffffff" fontSize="13" fontFamily="monospace" fontWeight="bold" textAnchor="middle">0 + 60 = 60 (Enters Basis ⭐)</text>
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
                Bengal Logistics Plus-Minus Case Studies
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
                  <p className="text-pink-300 font-semibold">💡 <strong>Operations Takeaway:</strong> {cs.lesson}</p>
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
                  trap: 'Picking θ from the Plus (+) Corners',
                  fix: 'θ is strictly the minimum among MINUS (-) corners: θ = min(x_minus). Picking from plus corners causes negative minus allocations.',
                },
                {
                  trap: 'Dropping Multiple Minus Corners During Ties',
                  fix: 'If two minus corners hit zero simultaneously, drop only ONE cell from the basis; retain the other with allocation 0 to preserve m+n-1 basic cells.',
                },
                {
                  trap: 'Modifying Allocations in Non-Loop Cells',
                  fix: 'Only corner vertices of the closed loop receive +θ or -θ. Non-loop cells remain completely unchanged.',
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
                  Think about why the total cost drops by exactly θ × |d_enter|: each unit transferred into the entering route saves |d_enter| Rupees, so moving θ units saves exactly θ × |d_enter|!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully that after completing the flow update, exactly one cell dropped to 0 and left the basis, while the entering cell joined the basis—maintaining exactly m+n-1 basic variables.
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
                Student Revision Checklist (Topic 7)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Assigned (+θ) to the entering cell',
                'Alternated (+, -, +, -) consecutively around the loop corners',
                'Calculated θ = min(allocations at minus corners)',
                'Added θ to plus corners and subtracted θ from minus corners',
                'Left non-loop cells completely untouched',
                'Dropped the leaving variable from the basis',
                'Verified row sums, column sums, and total cost Z in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: the plus-minus pattern is where the actual money is saved! Always start by writing (+θ) on your entering champion. Follow the loop around, alternating (+, -, +, -). Look at your minus corners—find the smallest allocation. That number is your θ! Add θ to the pluses, subtract θ from the minuses, and watch your leaving variable drop cleanly to zero. Your new tableau is now ready for the next MODI audit!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Plus-Minus Allocation Pattern FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Plus-Minus Allocation Pattern (MODI Method)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic8_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic7;
