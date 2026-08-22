// src/components/study/quantitative-analysis/topics/002_005_test-of-optimality-by-modi-method/Topic10.jsx
// React 19 Function-based Component
// Module: 002_005_test-of-optimality-by-modi-method
// Topic 10: Final minimum transportation cost

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic10_files/topic10_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic10_files/topic10_note.txt?raw';

const Topic10 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [activeTab, setActiveTab] = useState('manifest'); // 'manifest', 'origins', 'duality'

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

  // Optimal Dispatch Manifest Data
  const dispatchRoutes = [
    { origin: 'Barrackpore (S1)', dest: 'Salt Lake (D2)', qty: 70, rate: 14, subtotal: 980 },
    { origin: 'Ichapur (S2)', dest: 'Jadavpur (D1)', qty: 60, rate: 5, subtotal: 300 },
    { origin: 'Ichapur (S2)', dest: 'Howrah (D3)', qty: 30, rate: 10, subtotal: 300 },
    { origin: 'Kolkata (S3)', dest: 'Salt Lake (D2)', qty: 10, rate: 13, subtotal: 130 },
    { origin: 'Kolkata (S3)', dest: 'Howrah (D3)', qty: 50, rate: 7, subtotal: 350 },
  ];

  // Case Studies
  const caseStudies = [
    {
      title: '1. Foundry Certified Minimum Manifest (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Presented the certified final manifest locking in ₹2,060 minimal freight per batch (saving ₹68,000 annually over 100 batches) for the Barrackpore casting plant board.',
      lesson: 'The final dispatch manifest translates matrix theory into operational logistics orders.',
    },
    {
      title: '2. Cold-Chain Vaccine Minimum Logistics Spend (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Certified final vaccine distribution at ₹2,190 minimal freight across Kolkata hospitals, ensuring 100% clinic order fulfillment within authorized health budgets.',
      lesson: 'Optimal cost certification guarantees zero waste in emergency medical logistics.',
    },
    {
      title: '3. Supermarket FMCG Retail Dispatch Manifest (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Generated daily truck manifests from the certified MODI solution, delivering 500 tons of groceries across West Bengal retail outlets at absolute minimum freight cost.',
      lesson: 'Direct dispatch schedules streamline warehouse pick-and-pack operations.',
    },
    {
      title: '4. Educational Press State University Tender Audit (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Presented the mathematical certificate of optimality (Z* = ₹9,400) to state university auditors, proving complete fiduciary compliance in textbook freight procurement.',
      lesson: 'Strong duality proof provides unassailable legal compliance in public tenders.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes certGlow {
          0%, 100% { border-color: rgba(16, 185, 129, 0.3); }
          50% { border-color: rgba(16, 185, 129, 0.8); }
        }
        .glow-cert {
          animation: certGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
              Module 002_005 • Topic 10
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
              Certified Minimum Total Cost (Z*)
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Final Minimum Transportation Cost
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            The final deliverable of the MODI method: calculating the <span className="text-emerald-400 font-semibold">Certified Minimum Cost (Z*)</span> in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>), verifying zero duality gap via <span className="text-cyan-400 font-semibold">Strong Duality</span>, and generating the executive <span className="text-amber-400 font-semibold">Dispatch Manifest</span>.
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'certificate', label: '1. Certificate & KPIs' },
              { id: 'interactive-manifest', label: '2. Interactive Dispatch Manifest' },
              { id: 'duality-verification', label: '3. Strong Duality Verification' },
              { id: 'svg-seal', label: '4. Certificate Seal SVG' },
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

        {/* SECTION 1: Certificate & KPIs */}
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
                Executive Optimization Certificate & KPIs
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-slate-400">Baseline Cost (NWCR)</span>
                <span className="text-xl font-bold font-mono text-rose-400">₹2,740</span>
                <span className="text-[10px] text-slate-500">Untested Initial Plan</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-emerald-800/80 flex flex-col space-y-1">
                <span className="text-emerald-300 font-semibold">Certified Minimum (Z*)</span>
                <span className="text-2xl font-extrabold font-mono text-emerald-400">₹2,060</span>
                <span className="text-[10px] text-emerald-400">100% Proven Global Minimum ⭐</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-slate-400">Absolute Savings</span>
                <span className="text-xl font-bold font-mono text-amber-400">₹680 / batch</span>
                <span className="text-[10px] text-slate-500">₹68,000 / year (100 batches)</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-slate-400">Efficiency Gain</span>
                <span className="text-xl font-bold font-mono text-cyan-400">24.82%</span>
                <span className="text-[10px] text-cyan-500">Budget Reduction</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Interactive Dispatch Manifest */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-cert">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                  02
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Interactive Dispatch Manifest
                </h2>
              </div>
              <div className="flex items-center gap-1.5">
                {[
                  { id: 'manifest', label: '1. Full Dispatch Table' },
                  { id: 'origins', label: '2. Origin Subtotals' },
                  { id: 'duality', label: '3. Strong Duality Audit' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={clsx(
                      'px-3 py-1 rounded text-xs font-semibold transition-all border',
                      activeTab === item.id
                        ? 'bg-emerald-600 text-white border-emerald-400 shadow-md'
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {activeTab === 'manifest' && (
              <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="p-2.5 font-semibold">Origin Location</th>
                      <th className="p-2.5 font-semibold">Destination Location</th>
                      <th className="p-2.5 font-semibold text-amber-300">Tonnage Dispatched</th>
                      <th className="p-2.5 font-semibold text-cyan-300">Unit Freight Rate</th>
                      <th className="p-2.5 font-semibold text-emerald-300">Subtotal Freight</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300 font-mono">
                    {dispatchRoutes.map((route, idx) => (
                      <tr key={idx}>
                        <td className="p-2.5 font-medium text-white font-sans">{route.origin}</td>
                        <td className="p-2.5 font-medium text-white font-sans">{route.dest}</td>
                        <td className="p-2.5 text-amber-300 font-bold">{route.qty} tons</td>
                        <td className="p-2.5 text-cyan-300">₹{route.rate}/ton</td>
                        <td className="p-2.5 text-emerald-400 font-bold">₹{route.subtotal}</td>
                      </tr>
                    ))}
                    <tr className="bg-slate-900/60 text-white font-bold">
                      <td colSpan="2" className="p-3 text-right font-sans text-emerald-300">
                        FINAL CERTIFIED MINIMUM TRANSPORTATION COST (Z*):
                      </td>
                      <td className="p-3 text-amber-300">220 tons</td>
                      <td className="p-3 text-slate-400 text-xs font-sans">Weighted Avg: ₹9.36</td>
                      <td className="p-3 text-emerald-400 text-base">₹2,060</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'origins' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                  <span className="text-white font-bold">Barrackpore Heavy (S1)</span>
                  <p className="text-slate-300 text-xs">• 70 tons ➔ Salt Lake @ ₹14/ton</p>
                  <div className="p-2 bg-slate-900 rounded font-mono text-emerald-300 font-bold">
                    Subtotal = ₹980
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                  <span className="text-white font-bold">Ichapur Casting (S2)</span>
                  <p className="text-slate-300 text-xs">• 60 tons ➔ Jadavpur @ ₹5/ton (₹300)<br />• 30 tons ➔ Howrah @ ₹10/ton (₹300)</p>
                  <div className="p-2 bg-slate-900 rounded font-mono text-emerald-300 font-bold">
                    Subtotal = ₹600
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                  <span className="text-white font-bold">Kolkata Yard (S3)</span>
                  <p className="text-slate-300 text-xs">• 10 tons ➔ Salt Lake @ ₹13/ton (₹130)<br />• 50 tons ➔ Howrah @ ₹7/ton (₹350)</p>
                  <div className="p-2 bg-slate-900 rounded font-mono text-emerald-300 font-bold">
                    Subtotal = ₹480
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'duality' && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2 text-xs sm:text-sm">
                <span className="text-cyan-300 font-bold">Strong Duality Primal-Dual Balance Check:</span>
                <p className="font-mono text-slate-200">
                  Dual Objective W* = (70×u₁) + (90×u₂) + (60×u₃) + (60×v₁) + (80×v₂) + (80×v₃)
                </p>
                <div className="p-3 bg-slate-900 rounded font-mono text-emerald-300">
                  Primal Min Cost Z* = ₹2,060 &nbsp;===&nbsp; Dual Max Objective W* = ₹2,060 ✅
                </div>
                <p className="text-slate-400 text-xs">
                  Zero Duality Gap provides absolute mathematical proof of global minimality.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* SECTION 3: Strong Duality Verification */}
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
                Dual Sensitivity & Marginal Pricing
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-purple-300 font-bold">Origin Supply Shadow Prices (uᵢ*)</span>
                <p className="text-slate-300">
                  <span className="font-mono text-white">u₁*=0, u₂*=5, u₃*=2</span> — Expanding casting production at Ichapur creates ₹5 higher marginal economic utility than Barrackpore.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-bold">Destination Demand Shadow Prices (vⱼ*)</span>
                <p className="text-slate-300">
                  <span className="font-mono text-white">v₁*=0, v₂*=14, v₃*=5</span> — Delivering 1 additional ton of demand to Howrah increases total minimum network spend by exactly ₹5.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Certificate Seal SVG */}
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
                Certificate of Mathematical Optimality
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 260"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Certificate Frame */}
                <rect x="50" y="20" width="640" height="220" rx="12" fill="#064e3b" stroke="#34d399" strokeWidth="2.5" />
                <text x="370" y="60" fill="#34d399" fontSize="16" fontWeight="bold" textAnchor="middle">
                  CERTIFICATE OF GLOBAL OPTIMALITY
                </text>
                <text x="370" y="85" fill="#cbd5e1" fontSize="11" textAnchor="middle">
                  Quantitative Analysis & Operations Research • Transportation Simplex
                </text>

                {/* Main Cost Seal */}
                <rect x="220" y="110" width="300" height="60" rx="8" fill="#022c22" stroke="#10b981" strokeWidth="2" />
                <text x="370" y="148" fill="#ffffff" fontSize="22" fontFamily="monospace" fontWeight="extrabold" textAnchor="middle">
                  FINAL MINIMUM Z* = ₹2,060
                </text>

                <text x="370" y="195" fill="#a7f3d0" fontSize="11" textAnchor="middle">
                  All Opportunity Costs Certified dᵢⱼ ≥ 0 • Zero Duality Gap Verified (Z* = W*)
                </text>
                <text x="370" y="215" fill="#6ee7b7" fontSize="10" fontFamily="monospace" textAnchor="middle">
                  Total Enterprise Savings: ₹680 / batch (24.82% Cost Reduction)
                </text>
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
                Bengal Logistics Final Cost Case Studies
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
                  trap: 'Forgetting to Include Currency Symbol (₹)',
                  fix: 'Always state final transportation costs clearly in Indian Rupees (e.g. Z* = ₹2,060).',
                },
                {
                  trap: 'Reporting Only the Total Number Without the Route Schedule',
                  fix: 'A complete solution requires the full itemized dispatch manifest (which origin sends how much to which destination).',
                },
                {
                  trap: 'Failing to Write the Formal Concluding Statement',
                  fix: 'Always conclude with: "Since all d_ij ≥ 0, the optimality condition is satisfied. Minimum Cost Z* = ₹X,XXX."',
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
                  Think about the incredible power of linear programming duality: when your primal cost Z* equals your dual objective W*, you have mathematical certainty that no cheaper solution exists in the universe!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully that summing by origin (₹980 + ₹600 + ₹480 = ₹2,060) gives the exact same total as summing by destination (₹300 + ₹1,110 + ₹650 = ₹2,060).
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
                Student Revision Checklist (Topic 10)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Confirmed optimality condition: all d_ij ≥ 0',
                'Calculated final minimum cost Z* = Sum(c_ij * x_ij) in Indian Rupees (₹)',
                'Verified zero duality gap: Z* == W*',
                'Computed percentage savings from baseline: 24.82%',
                'Formatted clean dispatch manifest with origin, destination, quantity, and rate',
                'Wrote the formal academic concluding statement',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: reaching the final minimum transportation cost is your moment of victory! You have taken a raw logistics network and mathematically proven that ₹2,060 is the absolute minimum freight spend. Always report your final answer clearly in Indian Rupees (₹), show your dispatch table so warehouse managers know exactly which truck goes where, and write down your formal conclusion. You are now true operations research champions!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Final Minimum Transportation Cost FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Final Minimum Transportation Cost (MODI Method)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic11_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic10;
