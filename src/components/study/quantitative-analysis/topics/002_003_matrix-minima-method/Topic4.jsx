// Topic4.jsx
import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic4_files/topic4_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic4_files/topic4_note.txt?raw';

const Topic4 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedCase, setSelectedCase] = useState(0);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
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

  const capacityEvolutionSteps = [
    {
      step: 'Initial State',
      desc: 'All factories and retail depots open with 100% capacity.',
      supplies: [{ name: 'Barrackpore (S1)', val: 50, orig: 50, dead: false }, { name: 'Ichapur (S2)', val: 70, orig: 70, dead: false }],
      demands: [{ name: 'Kolkata (D1)', val: 40, orig: 40, dead: false }, { name: 'Jadavpur (D2)', val: 50, orig: 50, dead: false }, { name: 'Salt Lake (D3)', val: 30, orig: 30, dead: false }],
      activeFlow: 120,
      action: 'Search active 2×3 table for global min (₹3 at Ichapur→Jadavpur).',
    },
    {
      step: 'After Step 1 (Alloc: 50 @ ₹3)',
      desc: 'Ichapur ships 50 tons to Jadavpur. Jadavpur demand hits 0!',
      supplies: [{ name: 'Barrackpore (S1)', val: 50, orig: 50, dead: false }, { name: 'Ichapur (S2)', val: 20, orig: 70, dead: false }],
      demands: [{ name: 'Kolkata (D1)', val: 40, orig: 40, dead: false }, { name: 'Jadavpur (D2)', val: 0, orig: 50, dead: true }, { name: 'Salt Lake (D3)', val: 30, orig: 30, dead: false }],
      activeFlow: 70,
      action: 'Column D2 (Jadavpur) crossed out. Submatrix shrinks to 2×2.',
    },
    {
      step: 'After Step 2 (Alloc: 40 @ ₹4)',
      desc: 'Barrackpore ships 40 tons to Kolkata. Kolkata demand hits 0!',
      supplies: [{ name: 'Barrackpore (S1)', val: 10, orig: 50, dead: false }, { name: 'Ichapur (S2)', val: 20, orig: 70, dead: false }],
      demands: [{ name: 'Kolkata (D1)', val: 0, orig: 40, dead: true }, { name: 'Jadavpur (D2)', val: 0, orig: 50, dead: true }, { name: 'Salt Lake (D3)', val: 30, orig: 30, dead: false }],
      activeFlow: 30,
      action: 'Column D1 (Kolkata) crossed out. Only Salt Lake remains.',
    },
    {
      step: 'After Step 3 (Alloc: 20 @ ₹5)',
      desc: 'Ichapur ships remaining 20 tons to Salt Lake. Ichapur supply hits 0!',
      supplies: [{ name: 'Barrackpore (S1)', val: 10, orig: 50, dead: false }, { name: 'Ichapur (S2)', val: 0, orig: 70, dead: true }],
      demands: [{ name: 'Kolkata (D1)', val: 0, orig: 40, dead: true }, { name: 'Jadavpur (D2)', val: 0, orig: 50, dead: true }, { name: 'Salt Lake (D3)', val: 10, orig: 30, dead: false }],
      activeFlow: 10,
      action: 'Row S2 (Ichapur) crossed out. Only Barrackpore→Salt Lake remains.',
    },
    {
      step: 'After Step 4 (Alloc: 10 @ ₹6)',
      desc: 'Final shipment: Barrackpore ships 10 tons to Salt Lake. All balances reach 0!',
      supplies: [{ name: 'Barrackpore (S1)', val: 0, orig: 50, dead: true }, { name: 'Ichapur (S2)', val: 0, orig: 70, dead: true }],
      demands: [{ name: 'Kolkata (D1)', val: 0, orig: 40, dead: true }, { name: 'Jadavpur (D2)', val: 0, orig: 50, dead: true }, { name: 'Salt Lake (D3)', val: 0, orig: 30, dead: true }],
      activeFlow: 0,
      action: 'All lines satisfied. Total cost Z = ₹470. IBFS Complete.',
    },
  ];

  const caseStudies = [
    {
      title: 'Case 1: Heavy Fasteners Logistics (Debangshu)',
      origins: 'Barrackpore (50 tons), Ichapur (70 tons)',
      destinations: 'Kolkata (40), Jadavpur (50), Salt Lake (30)',
      updates: [
        { alloc: 'Ichapur → Jadavpur (50 @ ₹3)', sUpdate: 'Ichapur: 70 → 20', dUpdate: 'Jadavpur: 50 → 0', lineClosed: 'Col D2 Closed' },
        { alloc: 'Barrackpore → Kolkata (40 @ ₹4)', sUpdate: 'Barrackpore: 50 → 10', dUpdate: 'Kolkata: 40 → 0', lineClosed: 'Col D1 Closed' },
        { alloc: 'Ichapur → Salt Lake (20 @ ₹5)', sUpdate: 'Ichapur: 20 → 0', dUpdate: 'Salt Lake: 30 → 10', lineClosed: 'Row S2 Closed' },
        { alloc: 'Barrackpore → Salt Lake (10 @ ₹6)', sUpdate: 'Barrackpore: 10 → 0', dUpdate: 'Salt Lake: 10 → 0', lineClosed: 'All Closed' },
      ],
      totalCost: '₹470',
      lesson: 'Debangshu tracked every inventory deduction in real time, achieving 100% stock fulfillment.',
    },
    {
      title: 'Case 2: Bengal FMCG Delivery (Mamata)',
      origins: 'Kolkata (60), Barrackpore (80), Ichapur (60)',
      destinations: 'Jadavpur (80), Howrah (70), Barasat (50)',
      updates: [
        { alloc: 'Ichapur → Barasat (50 @ ₹1)', sUpdate: 'Ichapur: 60 → 10', dUpdate: 'Barasat: 50 → 0', lineClosed: 'Col D3 Closed' },
        { alloc: 'Kolkata → Jadavpur (60 @ ₹2)', sUpdate: 'Kolkata: 60 → 0', dUpdate: 'Jadavpur: 80 → 20', lineClosed: 'Row S1 Closed' },
        { alloc: 'Barrackpore → Howrah (70 @ ₹3)', sUpdate: 'Barrackpore: 80 → 10', dUpdate: 'Howrah: 70 → 0', lineClosed: 'Col D2 Closed' },
        { alloc: 'Ichapur → Jadavpur (10 @ ₹5)', sUpdate: 'Ichapur: 10 → 0', dUpdate: 'Jadavpur: 20 → 10', lineClosed: 'Row S3 Closed' },
        { alloc: 'Barrackpore → Jadavpur (10 @ ₹6)', sUpdate: 'Barrackpore: 10 → 0', dUpdate: 'Jadavpur: 10 → 0', lineClosed: 'All Closed' },
      ],
      totalCost: '₹490',
      lesson: 'Mamata maintained continuous conservation of flow across all 5 discrete deduction steps.',
    },
    {
      title: 'Case 3: Hospital Oxygen Fleet (Susmita)',
      origins: 'Kolkata Central (100 cyl), Barrackpore Station (150 cyl)',
      destinations: 'Jadavpur Medical (120), Ichapur General (130)',
      updates: [
        { alloc: 'Barrackpore → Ichapur (130 @ ₹5)', sUpdate: 'Barrackpore: 150 → 20', dUpdate: 'Ichapur: 130 → 0', lineClosed: 'Col D2 Closed' },
        { alloc: 'Kolkata → Jadavpur (100 @ ₹6)', sUpdate: 'Kolkata: 100 → 0', dUpdate: 'Jadavpur: 120 → 20', lineClosed: 'Row S1 Closed' },
        { alloc: 'Barrackpore → Jadavpur (20 @ ₹11)', sUpdate: 'Barrackpore: 20 → 0', dUpdate: 'Jadavpur: 20 → 0', lineClosed: 'All Closed' },
      ],
      totalCost: '₹1,470',
      lesson: 'Susmita balanced life-saving oxygen stocks without causing depot shortages.',
    },
    {
      title: 'Case 4: E-Commerce Locker Routing (Abhronila & Mahima)',
      origins: 'Barrackpore Hub (40), Kolkata Mega Center (60)',
      destinations: 'Ichapur (30), Jadavpur (40), Salt Lake (30)',
      updates: [
        { alloc: 'Kolkata → Ichapur (30 @ ₹3)', sUpdate: 'Kolkata: 60 → 30', dUpdate: 'Ichapur: 30 → 0', lineClosed: 'Col D1 Closed' },
        { alloc: 'Barrackpore → Jadavpur (40 @ ₹4)', sUpdate: 'Barrackpore: 40 → 0', dUpdate: 'Jadavpur: 40 → 0', lineClosed: 'Row S1 Closed' },
        { alloc: 'Kolkata → Salt Lake (30 @ ₹5)', sUpdate: 'Kolkata: 30 → 0', dUpdate: 'Salt Lake: 30 → 0', lineClosed: 'All Closed' },
      ],
      totalCost: '₹400',
      lesson: 'Abhronila and Mahima completed courier routing with zero package deficit.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 transition-colors duration-300 font-sans">
      {/* Header Banner */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-b border-slate-800/80">
        <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-blue-500/10 text-blue-400 border border-blue-500/30 mb-4 shadow-sm">
            Quantitative Analysis • Transportation Models • Topic 4
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 bg-gradient-to-r from-amber-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
            Updating Supply and Demand
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
            Understand dynamic capacity state transitions, line elimination invariants, conservation of active flow, and systematic submatrix reduction.
          </p>
        </div>
      </div>

      {/* Main Container - Stacked Vertical Sections */}
      <div className="max-w-4xl mx-auto px-4 py-10 sm:px-6 lg:px-8 flex flex-col space-y-12">
        
        {/* Section 1: Dynamic Balance Updates */}
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
                State Update Mechanics & Conservation Invariant
              </h2>
            </div>

            <p className="text-slate-300 leading-relaxed text-base">
              Every committed allocation <span className="font-mono text-cyan-300">x_kl</span> triggers a dual subtraction that decrements both origin inventory and destination requirement by the exact same physical amount.
            </p>

            {/* Formula Block */}
            <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-sm text-slate-300 flex flex-col space-y-3">
              <div className="text-amber-400 font-semibold">Dual Balance Update Equations:</div>
              <div className="pl-3 border-l-2 border-amber-500 flex flex-col space-y-1">
                <span className="text-white font-bold">S_k(new) = S_k(old) - x_kl</span>
                <span className="text-white font-bold">D_l(new) = D_l(old) - x_kl</span>
              </div>
              <div className="text-xs text-slate-400 pt-2 border-t border-slate-900">
                Conservation Invariant:
                <br />
                <span className="text-emerald-400 font-bold">{"∑_(i ∈ Active) S_i(t) = ∑_(j ∈ Active) D_j(t)"}</span> at every single step <span className="font-mono">t</span>.
              </div>
            </div>

            <div className="flex flex-col space-y-3">
              <h3 className="text-lg font-semibold text-slate-200">The 3 Line Closure Triggers</h3>

              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-amber-400 font-semibold text-sm">1. S_k == 0 (Origin Depleted)</span>
                <p className="text-slate-400 text-xs sm:text-sm">
                  Row <span className="font-mono text-slate-200">k</span> has 0 available inventory and is struck out. It can supply no further destinations.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-teal-400 font-semibold text-sm">2. D_l == 0 (Destination Satisfied)</span>
                <p className="text-slate-400 text-xs sm:text-sm">
                  Column <span className="font-mono text-slate-200">l</span> has received 100% of its required cargo and is struck out. It accepts no further shipments.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-purple-400 font-semibold text-sm">3. S_k == 0 AND D_l == 0 (Degeneracy Guard)</span>
                <p className="text-slate-400 text-xs sm:text-sm">
                  Close only one line and inject an infinitesimal zero (<span className="font-mono text-white font-bold">ε</span>) to preserve the required <span className="font-mono text-cyan-300">m + n - 1</span> basic variables.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Interactive State Evolution */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Interactive Capacity Evolution Tracker
              </h2>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              Step through the state evolution to see remaining capacity meters shrink and closed lines get struck out:
            </p>

            {/* Step Navigation Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {capacityEvolutionSteps.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStepIndex(idx)}
                  className={clsx(
                    'py-2 px-2 rounded-xl text-xs font-semibold transition-all duration-200 border text-center',
                    activeStepIndex === idx
                      ? 'bg-amber-600/30 border-amber-500 text-amber-300 shadow-md font-bold'
                      : 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  )}
                &gt;
                  Step {idx}
                </button>
              ))}
            </div>

            {/* Active Evolution Display */}
            {(() => {
              const cur = capacityEvolutionSteps[activeStepIndex];
              return (
                <div className="p-5 sm:p-6 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col space-y-5">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-slate-800 pb-3 gap-2">
                    <h3 className="text-base font-bold text-white">{cur.step}</h3>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono">
                      Active Flow Balance: {cur.activeFlow} tons
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300">{cur.desc}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Origin Meters */}
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col space-y-3">
                      <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                        Origin Supplies Remaining:
                      </span>
                      {cur.supplies.map((s, i) => (
                        <div key={i} className="flex flex-col space-y-1">
                          <div className="flex justify-between text-xs font-medium">
                            <span className={clsx(s.dead ? 'line-through text-slate-600' : 'text-slate-300')}>
                              {s.name}
                            </span>
                            <span className="font-mono text-amber-300">{s.val} / {s.orig} tons</span>
                          </div>
                          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className={clsx('h-full transition-all duration-300', s.dead ? 'bg-slate-700' : 'bg-amber-500')}
                              style={{ width: `${(s.val / s.orig) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Destination Meters */}
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col space-y-3">
                      <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                        Destination Demands Remaining:
                      </span>
                      {cur.demands.map((d, i) => (
                        <div key={i} className="flex flex-col space-y-1">
                          <div className="flex justify-between text-xs font-medium">
                            <span className={clsx(d.dead ? 'line-through text-slate-600' : 'text-slate-300')}>
                              {d.name}
                            </span>
                            <span className="font-mono text-teal-300">{d.val} / {d.orig} tons</span>
                          </div>
                          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className={clsx('h-full transition-all duration-300', d.dead ? 'bg-slate-700' : 'bg-teal-500')}
                              style={{ width: `${(d.val / d.orig) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-blue-950/30 rounded-xl border border-blue-900/50 text-xs text-blue-300 font-medium">
                    ⚡ {cur.action}
                  </div>
                </div>
              );
            })()}
          </div>
        </section>

        {/* Section 3: 4 Real-World Case Studies */}
        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          data-index="2"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-600/20 text-teal-400 font-bold text-sm">
                03
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                4 Industrial Case Evolution Logs
              </h2>
            </div>

            {/* Case Selector Tabs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {caseStudies.map((cs, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedCase(idx)}
                  className={clsx(
                    'py-3 px-4 rounded-xl text-left text-xs sm:text-sm font-semibold transition-all duration-200 border',
                    selectedCase === idx
                      ? 'bg-teal-600/20 border-teal-500 text-teal-300 shadow-md'
                      : 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  )}
                &gt;
                  {cs.title}
                </button>
              ))}
            </div>

            {/* Active Case Card */}
            {(() => {
              const curCase = caseStudies[selectedCase];
              return (
                <div className="p-5 sm:p-6 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col space-y-5">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-slate-800 pb-3 gap-2">
                    <h3 className="text-lg font-bold text-white">{curCase.title}</h3>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-500/10 text-teal-400 border border-teal-500/30 font-mono">
                      Cost: {curCase.totalCost}
                    </span>
                  </div>

                  {/* Updates Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400 bg-slate-900/40">
                          <th className="py-2 px-3">Committed Allocation</th>
                          <th className="py-2 px-3">Supply Update</th>
                          <th className="py-2 px-3">Demand Update</th>
                          <th className="py-2 px-3">Line Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {curCase.updates.map((u, i) => (
                          <tr key={i} className="hover:bg-slate-900/40">
                            <td className="py-2.5 px-3 font-medium text-slate-200">{u.alloc}</td>
                            <td className="py-2.5 px-3 font-mono text-amber-300">{u.sUpdate}</td>
                            <td className="py-2.5 px-3 font-mono text-teal-300">{u.dUpdate}</td>
                            <td className="py-2.5 px-3 font-bold text-rose-400 text-xs">{u.lineClosed}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <p className="text-xs text-slate-300 italic p-3 bg-slate-900 rounded-xl border border-slate-800">
                    💡 <strong>Summary:</strong> {curCase.lesson}
                  </p>
                </div>
              );
            })()}
          </div>
        </section>

        {/* Section 4: Hints & Conceptual Prompts */}
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
                Pedagogical Hints & Deep Thinking Prompts
              </h2>
            </div>

            <div className="flex flex-col space-y-3">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1 hover:bg-slate-800/70 transition-all duration-200">
                <span className="text-cyan-400 font-semibold text-sm">🤔 Think about...</span>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Why does the total active supply always exactly equal total active demand at every intermediate step? Because subtracting the exact same number from both sides preserves mathematical balance!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1 hover:bg-slate-800/70 transition-all duration-200">
                <span className="text-amber-400 font-semibold text-sm">🔍 Observe carefully...</span>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  When a row is struck out, all other cells in that row become dead. If you find yourself scanning a struck-out row, stop immediately—that warehouse has 0 remaining units!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1 hover:bg-slate-800/70 transition-all duration-200">
                <span className="text-emerald-400 font-semibold text-sm">⚙️ Try changing this...</span>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  At the end of your worksheet, sum all circled numbers in each row. If the row sum does not match the initial supply, you made a subtraction mistake!
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
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 font-bold text-sm">
                05
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Professional Tips & Operational Shortcuts
              </h2>
            </div>

            <div className="flex flex-col space-y-3">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-blue-300 font-semibold text-sm">1. Slash-and-Write Technique</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Draw a single diagonal line through the old capacity figure and write the new balance clearly to the right. Never erase previous balances; they serve as your audit trail.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-blue-300 font-semibold text-sm">2. Check Marginal Sums Early</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  As soon as all lines are closed, perform a quick 10-second check: do all row allocations sum to initial S_i and all column allocations sum to initial D_j?
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-blue-300 font-semibold text-sm">3. Boolean Flag Vector Optimization</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  In code, use `rowActive[k] = false` and `colActive[l] = false` to skip eliminated lines in <span className="font-mono text-cyan-300">O(1)</span> time.
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
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-600/20 text-rose-400 font-bold text-sm">
                06
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Common Mistakes & Conceptual Errors
              </h2>
            </div>

            <div className="flex flex-col space-y-3">
              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 flex flex-col space-y-1">
                <span className="text-rose-400 font-semibold text-sm">❌ One-Sided Subtraction</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Deducting the allocated units from the factory supply but forgetting to deduct from destination demand. This creates an arithmetic imbalance in later steps.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 flex flex-col space-y-1">
                <span className="text-rose-400 font-semibold text-sm">❌ Allocating to Eliminated Lines</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Selecting a low cost in a row that was already eliminated, attempting to ship non-existent stock.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 flex flex-col space-y-1">
                <span className="text-rose-400 font-semibold text-sm">❌ Missing Degeneracy Epsilon</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Crossing out both row and column simultaneously when <span className="font-mono text-slate-200">S_k = D_l</span> without inserting <span className="font-mono text-white">ε</span>.
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
        &gt;
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
                <span className="text-violet-300 font-semibold text-sm">1. Atomic Update Transactions</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Always update supply, demand, line active flags, and running cost inside a single atomic code function.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-violet-300 font-semibold text-sm">2. Non-Negative Balance Assertion</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Add <span className="font-mono text-cyan-300">assert(S[k] >= 0 && D[l] >= 0)</span> after every subtraction to catch negative balances instantly.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 flex flex-col space-y-1">
                <span className="text-violet-300 font-semibold text-sm">3. Basis Validation</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Confirm that total basic variables equal <span className="font-mono text-cyan-300">m + n - 1</span> before moving to MODI calculations.
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
        &gt;
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
                { title: 'Subtracted from Supply', desc: 'Updated S_k = S_k - x_kl' },
                { title: 'Subtracted from Demand', desc: 'Updated D_l = D_l - x_kl' },
                { title: 'Crossed Out Zero Line', desc: 'Eliminated row if S_k=0 or column if D_l=0' },
                { title: 'Preserved Conservation Invariant', desc: 'Verified total active supply = total active demand' },
                { title: 'Checked Final Match', desc: 'Verified S_final === D_final in final allocation' },
                { title: 'Verified Marginal Sums', desc: 'Confirmed all row and column allocations match original totals' },
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
              "In all my operations research classes across Kolkata and Barrackpore, I emphasize to Debangshu, Susmita, Mamata, and Mahima that updating supply and demand is the heartbeat of transportation modeling. If you update both balances accurately, the math takes care of itself. If your final cell does not have equal remaining supply and demand, you made a subtraction mistake earlier. Develop the habit of writing your decremented numbers cleanly next to slashed-out old values!"
            }
          />
        </section>

        {/* Section 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Updating Supply and Demand FAQs"
            questions={questions}
          />
        </section>

        {/* Section 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Updating Supply and Demand"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic4_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic4;
