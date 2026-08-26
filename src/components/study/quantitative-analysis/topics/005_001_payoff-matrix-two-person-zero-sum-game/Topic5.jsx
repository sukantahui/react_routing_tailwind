// src/components/study/quantitative-analysis/topics/005_001_payoff-matrix-two-person-zero-sum-game/Topic5.jsx
// React 19 Function-based Component
// Module: 005_001_payoff-matrix-two-person-zero-sum-game
// Topic 5: Interpretation of payoff entries

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

  // Original Matrix State (in ₹)
  const [origMat, setOrigMat] = useState([
    [40000, -15000],
    [20000, 30000],
  ]);

  // Linear Transformation Parameters: a' = k * a + c
  const [scaleK, setScaleK] = useState(1);
  const [shiftC, setShiftC] = useState(15000); // Default to make all values non-negative

  // Transformed Matrix
  const transMat = origMat.map((row) =>
    row.map((cell) => Number(scaleK) * cell + Number(shiftC))
  );

  // Original Calculations
  const origRowMins = origMat.map((row) => Math.min(...row));
  const origColMaxs = [0, 1].map((c) => Math.max(...origMat.map((row) => row[c])));
  const origMaximin = Math.max(...origRowMins);
  const origMinimax = Math.min(...origColMaxs);

  // Transformed Calculations
  const transRowMins = transMat.map((row) => Math.min(...row));
  const transColMaxs = [0, 1].map((c) => Math.max(...transMat.map((row) => row[c])));
  const transMaximin = Math.max(...transRowMins);
  const transMinimax = Math.min(...transColMaxs);

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
      title: '1. Foundry Warranty Claim Matrix Parsing (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Translated metallurgical defect claims into payoff cells in Barrackpore: a_11 = +₹40k (flawless casting, bonus awarded), a_12 = -₹15k (minor surface inclusion, warranty paid).',
      lesson: 'Proper sign assignment prevents costly inversion of contractual liability.',
    },
    {
      title: '2. Cold-Chain Vaccine Facility Dispute Transformation (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Added a constant c = ₹25,000 to eliminate negative cells in Kolkata, enabling clean algebraic simplex solving while preserving exact negotiation strategies.',
      lesson: 'Positive linear transformations eliminate negative payoffs without altering optimal strategies.',
    },
    {
      title: '3. Supermarket FMCG Price Match Guarantee (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Converted retail price-matching verbal rules into signed matrix cells in Ichapur, identifying the exact cost of aggressive price undercut promotions.',
      lesson: 'Verbal retail promotion rules translate cleanly into signed payoff matrix cells.',
    },
    {
      title: '4. Educational High-Tech Lab Patent Licensing Scale Invariance (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Scaled a ₹55 Lakh university patent licensing matrix in Jadavpur by dividing all values by 1,00,000 (k = 0.00001), simplifying board presentations while maintaining strategy integrity.',
      lesson: 'Scale invariance facilitates high-level executive presentations of multi-crore games.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes entryGlow {
          0%, 100% { border-color: rgba(234, 179, 8, 0.3); }
          50% { border-color: rgba(234, 179, 8, 0.8); }
        }
        .glow-entry {
          animation: entryGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-amber-950/80 text-amber-400 border border-amber-800/60">
              Segment 5 • Module 005_001 • Topic 5
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-amber-950/80 text-amber-400 border border-amber-800/60">
              Sign Conventions • Verbal Parsing • Linear Transformations
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Interpretation of Payoff Entries
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive guide to interpreting and transforming <span className="text-amber-400 font-semibold">Payoff Entries</span>: mastering the <span className="text-emerald-400 font-semibold">Universal Sign Convention</span>, translating real-world verbal conditions into signed numbers, and applying <span className="text-sky-400 font-semibold">Linear Invariance Transformations (a' = k·a + c)</span> in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'sign-conventions', label: '1. Universal Sign Conventions' },
              { id: 'transformation-lab', label: '2. Linear Transformation Workbench' },
              { id: 'verbal-parsing', label: '3. Verbal Translation Guide' },
              { id: 'svg-translation', label: '4. Parsing Architecture SVG' },
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
              &gt;
                {item.label}
              </button>
            ))}
          </div>
        </header>

        {/* SECTION 1: Universal Sign Conventions */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 font-bold text-sm">
                01
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Universal Sign Conventions & Flow of Capital
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-bold font-mono text-base">+a_ij &gt; 0 (Positive)</span>
                <p className="text-slate-300 text-xs">Player A GAINS ₹a_ij; Player B PAYS / LOSES ₹a_ij.</p>
                <span className="text-emerald-400 font-mono text-[11px]">Capital Flow: Col (B) ➔ Row (A).</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-rose-400 font-bold font-mono text-base">−a_ij &lt; 0 (Negative)</span>
                <p className="text-slate-300 text-xs">Player A LOSES ₹|a_ij|; Player B GAINS ₹|a_ij|.</p>
                <span className="text-rose-400 font-mono text-[11px]">Capital Flow: Row (A) ➔ Col (B).</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-400 font-bold font-mono text-base">a_ij = 0 (Zero)</span>
                <p className="text-slate-300 text-xs">Breakeven status quo; zero capital transfer.</p>
                <span className="text-amber-400 font-mono text-[11px]">Capital Flow: Zero net movement.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Linear Transformation Workbench */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-entry">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Linear Transformation Workbench: a' = k·a + c
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <label className="text-xs font-semibold text-sky-400">Scale Factor (k &gt; 0):</label>
                <input
                  type="number"
                  step="0.1"
                  value={scaleK}
                  onChange={(e) => setScaleK(Number(e.target.value))}
                  className="px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-white font-mono text-xs"
                /&gt;
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                <label className="text-xs font-semibold text-amber-400">Constant Shift (c in ₹):</label>
                <input
                  type="number"
                  step="1000"
                  value={shiftC}
                  onChange={(e) => setShiftC(Number(e.target.value))}
                  className="px-2.5 py-1.5 rounded bg-slate-900 border border-slate-700 text-white font-mono text-xs"
                /&gt;
              </div>
            </div>

            {/* Comparison of Matrices */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                <span className="text-xs font-semibold text-rose-400 font-sans">Original Matrix A (₹):</span>
                <table className="w-full text-center border-collapse">
                  <tbody>
                    <tr>
                      <td className="p-2 font-bold text-slate-300">₹{origMat[0][0].toLocaleString()}</td>
                      <td className="p-2 font-bold text-rose-400">₹{origMat[0][1].toLocaleString()}</td>
                      <td className="p-2 text-rose-400 font-bold bg-rose-950/20">Min: ₹{origRowMins[0].toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-bold text-slate-300">₹{origMat[1][0].toLocaleString()}</td>
                      <td className="p-2 font-bold text-slate-300">₹{origMat[1][1].toLocaleString()}</td>
                      <td className="p-2 text-rose-400 font-bold bg-rose-950/20">Min: ₹{origRowMins[1].toLocaleString()}</td>
                    </tr>
                  </tbody>
                </table>
                <span className="text-emerald-400 pt-2 font-sans font-bold">
                  Original Maximin: ₹{origMaximin.toLocaleString()}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                <span className="text-xs font-semibold text-sky-400 font-sans">Transformed Matrix A' = {scaleK}·A + {shiftC} (₹):</span>
                <table className="w-full text-center border-collapse">
                  <tbody>
                    <tr>
                      <td className="p-2 font-bold text-emerald-300">₹{transMat[0][0].toLocaleString()}</td>
                      <td className="p-2 font-bold text-emerald-300">₹{transMat[0][1].toLocaleString()}</td>
                      <td className="p-2 text-emerald-400 font-bold bg-emerald-950/20">Min: ₹{transRowMins[0].toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-bold text-emerald-300">₹{transMat[1][0].toLocaleString()}</td>
                      <td className="p-2 font-bold text-emerald-300">₹{transMat[1][1].toLocaleString()}</td>
                      <td className="p-2 text-emerald-400 font-bold bg-emerald-950/20">Min: ₹{transRowMins[1].toLocaleString()}</td>
                    </tr>
                  </tbody>
                </table>
                <span className="text-sky-400 pt-2 font-sans font-bold">
                  Transformed Maximin: ₹{transMaximin.toLocaleString()} = ({scaleK} × {origMaximin.toLocaleString()}) + {shiftC.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-600 font-mono text-xs sm:text-sm text-center">
              <span className="text-emerald-300 font-bold">Invariance Theorem Verified: </span>
              <span className="text-white">Optimal Strategy Rankings and Saddle Points are 100% PRESERVED! ✅</span>
            </div>
          </div>
        </section>

        {/* SECTION 3: Verbal Translation Guide */}
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
                Verbal Statement Translation Dictionary
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-bold font-mono">"Firm A captures ₹50k in sales from Firm B"</span>
                <p className="text-slate-300 text-xs">➔ Recorded as <strong>+₹50,000</strong></p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-rose-400 font-bold font-mono">"Firm A pays ₹20k liquidated warranty to Firm B"</span>
                <p className="text-slate-300 text-xs">➔ Recorded as <strong>−₹20,000</strong></p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-amber-400 font-bold font-mono">"Both firms maintain equal 50-50 market split"</span>
                <p className="text-slate-300 text-xs">➔ Recorded as <strong>₹0 (Breakeven)</strong></p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-bold font-mono">"Firm A increases market share by 12%"</span>
                <p className="text-slate-300 text-xs">➔ Recorded as <strong>+12% (or equivalent in ₹)</strong></p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Parsing Architecture SVG */}
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
                Verbal Statement to Signed Payoff Cell Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 180"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                <rect x="50" y="45" width="220" height="90" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="160" y="75" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">Verbal Statement</text>
                <text x="160" y="100" fill="#cbd5e1" fontSize="9" textAnchor="middle">"Firm A gains ₹40k from B"</text>

                <line x1="270" y1="90" x2="350" y2="90" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="350,90 340,85 340,95" fill="#38bdf8" />

                <rect x="350" y="35" width="160" height="110" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="430" y="65" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">Parsed Cell Value</text>
                <text x="430" y="95" fill="#ffffff" fontSize="12" fontFamily="monospace" textAnchor="middle">+₹40,000</text>
                <text x="430" y="125" fill="#a7f3d0" fontSize="8" textAnchor="middle">Row Player Perspective</text>

                <line x1="510" y1="90" x2="590" y2="90" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="590,90 580,85 580,95" fill="#38bdf8" />

                <rect x="590" y="45" width="120" height="90" rx="8" fill="#1e293b" stroke="#818cf8" strokeWidth="2" />
                <text x="650" y="75" fill="#818cf8" fontSize="10" fontWeight="bold" textAnchor="middle">Linear Transform</text>
                <text x="650" y="100" fill="#cbd5e1" fontSize="8" textAnchor="middle">a' = k·a + c</text>
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
                Bengal Operations Research Payoff Parsing Case Studies
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
                  trap: 'Reversing Signs of Matrix Entries (Assigning Positive Values to Column Player Gains)',
                  fix: 'Matrix entries a_ij ALWAYS represent payoffs to Player A; positive is gain to A, negative is gain to B.',
                },
                {
                  trap: 'Using a Negative Multiplier (k < 0) in Linear Transformations',
                  fix: 'Negative multipliers invert player roles and destroy game equivalence; only use k > 0.',
                },
                {
                  trap: 'Forgetting to Subtract the Constant Shift c to Recover the True Game Value',
                  fix: 'If you transformed A by adding c, the true game value is v* = v\'* − c.',
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
                  Think of linear transformations like converting temperature from Celsius to Fahrenheit: the weather doesn't change, only the numbers on the thermometer do! Your optimal strategies stay exactly the same.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how adding a constant c shifts every row minimum and column maximum by exactly c, preserving the saddle point location perfectly!
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
                Student Revision Checklist (Topic 5)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Mastered the universal sign convention (+ = gain to A, − = loss to A)',
                'Translated verbal business statements into exact signed matrix entries',
                'Applied positive linear transformations: a\' = k·a + c (k &gt; 0)',
                'Verified that linear transformations preserve optimal strategies and saddle points',
                'Computed the transformed game value: v\'* = k·v* + c',
                'Reported matrix payoffs and values in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: Interpreting Payoff Entries correctly is critical to avoid flipping strategic polarity! Remember: a_ij is from Player A's perspective, and linear transformations (a' = k·a + c) preserve your optimal strategy simplex. In our next topic (Topic 6), we will formulate simple game matrices from real-world problem statements!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Interpretation of Payoff Entries FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Interpretation of Payoff Entries"
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
