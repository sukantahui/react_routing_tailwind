// src/components/study/quantitative-analysis/topics/002_005_test-of-optimality-by-modi-method/Topic2.jsx
// React 19 Function-based Component
// Module: 002_005_test-of-optimality-by-modi-method
// Topic 2: u-v variables

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic2_files/topic2_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic2_files/topic2_note.txt?raw';

const Topic2 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [propStep, setPropStep] = useState(1);
  const [anchorChoice, setAnchorChoice] = useState('u1'); // 'u1', 'v2', 'u2'

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

  // Propagation steps for solving u-v variables (Anchor: u1 = 0)
  const propagationSteps = [
    {
      step: 1,
      title: 'Step 1: Anchor Datum Reference (Set u₁ = 0)',
      equation: 'u₁ = 0 (Reference Datum)',
      details: 'Because there are 6 unknown potentials and only 5 basic equations (1 degree of freedom), we anchor Row 1 by setting u₁ = 0.',
      resolvedU: ['0', '?', '?'],
      resolvedV: ['?', '?', '?'],
      activeCell: null,
    },
    {
      step: 2,
      title: 'Step 2: Solve Column Potentials Connected to Row 1',
      equation: 'u₁ + v₁ = c₁₁ ➔ 0 + v₁ = 8 ➔ v₁ = 8 | u₁ + v₂ = c₁₂ ➔ 0 + v₂ = 14 ➔ v₂ = 14',
      details: 'Basic cell (1,1) gives v₁ = 8; Basic cell (1,2) gives v₂ = 14.',
      resolvedU: ['0', '?', '?'],
      resolvedV: ['8', '14', '?'],
      activeCell: { r: 0, c: 1 },
    },
    {
      step: 3,
      title: 'Step 3: Solve Row Potential u₂ from Column 2',
      equation: 'u₂ + v₂ = c₂₂ ➔ u₂ + 14 = 19 ➔ u₂ = 19 - 14 = 5',
      details: 'Basic cell (2,2) with c₂₂ = ₹19 and known v₂ = 14 unlocks u₂ = 5.',
      resolvedU: ['0', '5', '?'],
      resolvedV: ['8', '14', '?'],
      activeCell: { r: 1, c: 1 },
    },
    {
      step: 4,
      title: 'Step 4: Solve Column Potential v₃ from Row 2',
      equation: 'u₂ + v₃ = c₂₃ ➔ 5 + v₃ = 10 ➔ v₃ = 10 - 5 = 5',
      details: 'Basic cell (2,3) with c₂₃ = ₹10 and known u₂ = 5 unlocks v₃ = 5.',
      resolvedU: ['0', '5', '?'],
      resolvedV: ['8', '14', '5'],
      activeCell: { r: 1, c: 2 },
    },
    {
      step: 5,
      title: 'Step 5: Solve Row Potential u₃ from Column 3',
      equation: 'u₃ + v₃ = c₃₃ ➔ u₃ + 5 = 7 ➔ u₃ = 7 - 5 = 2',
      details: 'Basic cell (3,3) with c₃₃ = ₹7 and known v₃ = 5 unlocks u₃ = 2. All 6 potentials are solved!',
      resolvedU: ['0', '5', '2'],
      resolvedV: ['8', '14', '5'],
      activeCell: { r: 2, c: 2 },
    },
  ];

  const currentStepData = propagationSteps[propStep - 1];

  // Invariance Theorem Demonstrator
  const anchorScenarios = {
    u1: {
      name: 'Anchor: u₁ = 0 (Standard)',
      u: [0, 5, 2],
      v: [8, 14, 5],
      oppCost13: 'd₁₃ = 12 - (0 + 5) = +₹7',
      oppCost21: 'd₂₁ = 5 - (5 + 8) = -₹8',
    },
    v2: {
      name: 'Anchor: v₂ = 0 (Column Anchor)',
      u: [-14, -9, -12],
      v: [22, 0, 19],
      oppCost13: 'd₁₃ = 12 - (-14 + 19) = +₹7',
      oppCost21: 'd₂₁ = 5 - (-9 + 22) = -₹8',
    },
    u2: {
      name: 'Anchor: u₂ = 0 (Row 2 Anchor)',
      u: [-5, 0, -3],
      v: [13, 19, 10],
      oppCost13: 'd₁₃ = 12 - (-5 + 10) = +₹7',
      oppCost21: 'd₂₁ = 5 - (0 + 13) = -₹8',
    },
  };

  const currentAnchor = anchorScenarios[anchorChoice];

  // Case Studies
  const caseStudies = [
    {
      title: '1. Foundry Shadow Price Analysis (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Barrackpore heavy foundry solved u = [0, 5, 2] and v = [8, 14, 5]. Origin S2 has u_2 = 5, revealing that expanding capacity at Ichapur creates ₹5 higher marginal shadow utility per ton than Barrackpore.',
      lesson: 'Dual potentials provide executive intelligence for capacity expansion planning.',
    },
    {
      title: '2. Negative Potential Verification (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Kolkata vaccine network produced a negative column potential (v_3 = -₹4). Demonstrated to trainees that dual potentials are unrestricted in sign and represent relative scalar gradients.',
      lesson: 'Negative potentials are completely normal and mathematically sound.',
    },
    {
      title: '3. Anchor Shift Invariance Experiment (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Solved a retail warehouse tableau using three different starting anchors (u_1 = 0, v_2 = 0, u_2 = 0). Verified that all non-basic evaluations d_ij remained 100% identical.',
      lesson: 'The choice of anchor has zero effect on entering cell selection or total cost.',
    },
    {
      title: '4. Degeneracy Bridge Resolution (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'When a 3x3 matrix was degenerate (4 basic cells), u-v propagation stalled halfway. Inserting ε in independent cell (1, 3) connected the spanning tree and allowed all potentials to be solved.',
      lesson: 'Epsilon acts as an electrical bridge in the dual potential network.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes uvGlow {
          0%, 100% { border-color: rgba(168, 85, 247, 0.3); }
          50% { border-color: rgba(168, 85, 247, 0.8); }
        }
        .glow-uv {
          animation: uvGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
              Module 002_005 • Topic 2
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-purple-950/80 text-purple-400 border border-purple-800/60">
              Dual Multipliers & Shadow Prices
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            u-v Variables
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive guide to <span className="text-purple-400 font-semibold">Dual Potential Multipliers (uᵢ, vⱼ)</span> in the MODI method: mastering the basic cell equality <span className="text-emerald-400 font-mono font-semibold">uᵢ + vⱼ = cᵢⱼ</span>, anchoring reference datums, executing spanning tree propagation, and proving the <span className="text-cyan-400 font-semibold">Invariance Theorem</span>.
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'dual-theory', label: '1. Dual LP Foundation' },
              { id: 'propagation-stepper', label: '2. Interactive Potential Stepper' },
              { id: 'invariance-lab', label: '3. Invariance Theorem Lab' },
              { id: 'svg-network', label: '4. Bipartite Network SVG' },
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
                    ? 'bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-900/40'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
                )}
              &gt;
                {item.label}
              </button>
            ))}
          </div>
        </header>

        {/* SECTION 1: Dual LP Foundation */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-600/20 text-purple-400 font-bold text-sm">
                01
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Linear Programming Duality & Complementary Slackness
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              The variables <span className="font-mono text-purple-400 font-bold">uᵢ</span> (row potentials) and <span className="font-mono text-cyan-400 font-bold">vⱼ</span> (column potentials) are the <strong>shadow prices</strong> of the origin supply and destination demand constraints.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-purple-800/40 flex flex-col space-y-2">
                <span className="text-purple-300 font-bold">1. Complementary Slackness Equality</span>
                <div className="p-2.5 bg-slate-950 rounded font-mono text-emerald-300 text-xs sm:text-sm">
                  uᵢ + vⱼ = cᵢⱼ &nbsp;&nbsp;(for all basic cells where xᵢⱼ &gt; 0)
                </div>
                <p className="text-slate-300">
                  Every basic shipping route satisfies exact dual equality. The sum of origin potential uᵢ and destination potential vⱼ equals unit cost cᵢⱼ.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-cyan-800/40 flex flex-col space-y-2">
                <span className="text-cyan-300 font-bold">2. Degrees of Freedom & Anchor Datum</span>
                <div className="p-2.5 bg-slate-950 rounded font-mono text-cyan-300 text-xs sm:text-sm">
                  Unknowns = m + n | Equations = m + n - 1
                </div>
                <p className="text-slate-300">
                  With 1 degree of freedom, we anchor the relative potential field by arbitrarily setting <span className="font-mono text-white">u₁ = 0</span>, allowing all remaining m + n - 1 variables to be uniquely solved.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Interactive Potential Stepper */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-uv">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-600/20 text-purple-400 font-bold text-sm">
                  02
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Interactive Potential Propagation Stepper
                </h2>
              </div>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((sNum) => (
                  <button
                    key={sNum}
                    onClick={() => setPropStep(sNum)}
                    className={clsx(
                      'px-3 py-1 rounded text-xs font-semibold transition-all border',
                      propStep === sNum
                        ? 'bg-purple-600 text-white border-purple-400 shadow-md'
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                    )}
                  &gt;
                    Step {sNum}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col space-y-1">
              <h3 className="text-base font-bold text-purple-300">{currentStepData.title}</h3>
              <p className="text-xs sm:text-sm text-emerald-300 font-mono">{currentStepData.equation}</p>
              <p className="text-xs text-slate-400">{currentStepData.details}</p>
            </div>

            {/* Tableau */}
            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-4">
              <table className="w-full text-center border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2 text-left font-semibold text-slate-300">Origins \ Dests</th>
                    <th className="p-2 font-semibold text-cyan-300">
                      Jadavpur (D1)<br />
                      <span className="font-mono text-emerald-400 text-xs">v₁ = {currentStepData.resolvedV[0]}</span>
                    </th>
                    <th className="p-2 font-semibold text-cyan-300">
                      Salt Lake (D2)<br />
                      <span className="font-mono text-emerald-400 text-xs">v₂ = {currentStepData.resolvedV[1]}</span>
                    </th>
                    <th className="p-2 font-semibold text-cyan-300">
                      Howrah (D3)<br />
                      <span className="font-mono text-emerald-400 text-xs">v₃ = {currentStepData.resolvedV[2]}</span>
                    </th>
                    <th className="p-2 font-semibold text-amber-300">Supply</th>
                    <th className="p-2 font-semibold text-purple-400">Dual uᵢ</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Barrackpore (S1)', costs: [8, 14, 12], s: 70, u: currentStepData.resolvedU[0] },
                    { name: 'Ichapur (S2)', costs: [5, 19, 10], s: 90, u: currentStepData.resolvedU[1] },
                    { name: 'Kolkata (S3)', costs: [11, 13, 7], s: 60, u: currentStepData.resolvedU[2] },
                  ].map((row, rIdx) => (
                    <tr key={rIdx} className="border-b border-slate-800/60">
                      <td className="p-2.5 text-left font-medium text-slate-200">{row.name}</td>
                      {row.costs.map((cost, cIdx) => {
                        let alloc = null;
                        if (rIdx === 0 && cIdx === 0) alloc = 60;
                        if (rIdx === 0 && cIdx === 1) alloc = 10;
                        if (rIdx === 1 && cIdx === 1) alloc = 70;
                        if (rIdx === 1 && cIdx === 2) alloc = 20;
                        if (rIdx === 2 && cIdx === 2) alloc = 60;

                        const isStepActive = currentStepData.activeCell && currentStepData.activeCell.r === rIdx && currentStepData.activeCell.c === cIdx;

                        return (
                          <td key={cIdx} className="p-2">
                            <div
                              className={clsx(
                                'p-2 rounded-lg font-mono font-bold transition-all border flex flex-col items-center justify-center',
                                isStepActive
                                  ? 'bg-purple-950 text-purple-200 border-purple-400 shadow-md scale-105 animate-pulse'
                                  : alloc !== null
                                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-600'
                                  : 'bg-slate-900 text-slate-500 border-slate-800'
                              )}
                            >
                              {alloc !== null && (
                                <span className="text-[10px] font-extrabold bg-slate-950 text-amber-300 px-1.5 py-0.5 rounded mb-1">
                                  x = {alloc}
                                </span>
                              )}
                              <span>₹{cost}</span>
                            </div>
                          </td>
                        );
                      })}
                      <td className="p-2 font-mono font-bold text-amber-300">{row.s}</td>
                      <td className="p-2 font-mono font-bold text-purple-400">
                        u_{rIdx + 1} = {row.u}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-slate-900/40 text-slate-300 font-mono">
                    <td className="p-2.5 text-left font-semibold text-amber-300">Demand</td>
                    <td className="p-2 font-bold text-amber-300">60</td>
                    <td className="p-2 font-bold text-amber-300">80</td>
                    <td className="p-2 font-bold text-amber-300">80</td>
                    <td className="p-2 font-bold text-white">∑ 220</td>
                    <td className="p-2 text-slate-600 text-xs">—</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 3: Invariance Theorem Lab */}
        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          data-index="2"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-600/20 text-cyan-400 font-bold text-sm">
                03
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                The Invariance Theorem Lab
              </h2>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Switch starting reference anchors below to prove that shifting potentials adds a constant offset but leaves all opportunity costs <span className="font-mono text-emerald-400">dᵢⱼ</span> 100% identical!
            </p>

            <div className="flex flex-wrap gap-2">
              {[
                { id: 'u1', label: 'Anchor: u₁ = 0 (Standard)' },
                { id: 'v2', label: 'Anchor: v₂ = 0 (Column 2)' },
                { id: 'u2', label: 'Anchor: u₂ = 0 (Row 2)' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setAnchorChoice(item.id)}
                  className={clsx(
                    'px-3.5 py-2 rounded-lg text-xs font-semibold transition-all border',
                    anchorChoice === item.id
                      ? 'bg-cyan-600 text-white border-cyan-400 shadow-md'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                  )}
                &gt;
                  {item.label}
                </button>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-3 text-xs sm:text-sm">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
                <span className="text-cyan-300 font-bold">{currentAnchor.name}</span>
                <span className="font-mono text-purple-300">u = [{currentAnchor.u.join(', ')}] | v = [{currentAnchor.v.join(', ')}]</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                <div className="p-2 bg-slate-900 rounded border border-slate-800 text-emerald-300">
                  Cell (1,3): {currentAnchor.oppCost13}
                </div>
                <div className="p-2 bg-slate-900 rounded border border-slate-800 text-rose-300">
                  Cell (2,1): {currentAnchor.oppCost21}
                </div>
              </div>
              <p className="text-slate-400 text-xs italic">
                ✅ Notice: The evaluations d₁₃ = +₹7 and d₂₁ = -₹8 are identical across all anchor choices!
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Bipartite Network SVG */}
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
                Bipartite Dual Potential Network Spanning Tree
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 280"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Origins (Left Nodes) */}
                <circle cx="120" cy="60" r="22" fill="#581c87" stroke="#a855f7" strokeWidth="2" />
                <text x="120" y="64" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">S1 (u₁=0)</text>

                <circle cx="120" cy="140" r="22" fill="#581c87" stroke="#a855f7" strokeWidth="2" />
                <text x="120" y="144" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">S2 (u₂=5)</text>

                <circle cx="120" cy="220" r="22" fill="#581c87" stroke="#a855f7" strokeWidth="2" />
                <text x="120" y="224" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">S3 (u₃=2)</text>

                {/* Destinations (Right Nodes) */}
                <circle cx="620" cy="60" r="22" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="2" />
                <text x="620" y="64" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">D1 (v₁=8)</text>

                <circle cx="620" cy="140" r="22" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="2" />
                <text x="620" y="144" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">D2 (v₂=14)</text>

                <circle cx="620" cy="220" r="22" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="2" />
                <text x="620" y="224" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">D3 (v₃=5)</text>

                {/* 5 Basic Edges (Spanning Tree) */}
                <line x1="142" y1="60" x2="598" y2="60" stroke="#10b981" strokeWidth="2.5" />
                <text x="370" y="52" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">Edge (1,1): 0 + 8 = ₹8</text>

                <line x1="142" y1="60" x2="598" y2="140" stroke="#10b981" strokeWidth="2.5" />
                <text x="330" y="90" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">Edge (1,2): 0 + 14 = ₹14</text>

                <line x1="142" y1="140" x2="598" y2="140" stroke="#10b981" strokeWidth="2.5" />
                <text x="370" y="132" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">Edge (2,2): 5 + 14 = ₹19</text>

                <line x1="142" y1="140" x2="598" y2="220" stroke="#10b981" strokeWidth="2.5" />
                <text x="330" y="195" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">Edge (2,3): 5 + 5 = ₹10</text>

                <line x1="142" y1="220" x2="598" y2="220" stroke="#10b981" strokeWidth="2.5" />
                <text x="370" y="235" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">Edge (3,3): 2 + 5 = ₹7</text>
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 5: Real-World Bengal Case Studies */}
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
                Bengal Logistics Dual Potential Case Studies
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
                  <p className="text-purple-300 font-semibold">💡 <strong>Operations Takeaway:</strong> {cs.lesson}</p>
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
                  trap: 'Forgetting that uᵢ and vⱼ are Unrestricted in Sign',
                  fix: 'Do not panic when encountering negative potentials (e.g. u = -3); potentials are relative scalar gradients.',
                },
                {
                  trap: 'Using Non-Basic Cells to Calculate Potentials',
                  fix: 'Only OCCUPIED (basic) cells satisfy u_i + v_j = c_ij. Unoccupied cells are evaluated later using d_ij = c_ij - (u_i + v_j).',
                },
                {
                  trap: 'Failing to Audit All Basic Cells (uᵢ + vⱼ == cᵢⱼ)',
                  fix: 'Perform a 5-second check confirming u_i + v_j = c_ij on all m+n-1 basic cells before calculating d_ij.',
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
                  Think about why setting u₁ = 0 works so smoothly: since the m+n-1 basic cells form a spanning tree, setting one node potential allows the values to flow through the tree like water through connected pipes!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully that the sum (uᵢ + vⱼ) represents the implied network shadow cost: whenever an empty route has a real cost cᵢⱼ strictly less than (uᵢ + vⱼ), that route is cheaper than the existing network path!
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
                Student Revision Checklist (Topic 2)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Understood u_i and v_j as LP dual shadow price variables',
                'Memorized the governing basic equation: u_i + v_j = c_ij',
                'Anchored the datum reference by setting u_1 = 0',
                'Propagated potentials sequentially across all m rows and n columns',
                'Verified u_i + v_j == c_ij for every single basic cell',
                'Understood that u_i and v_j can be negative numbers',
                'Proved the Invariance Theorem: anchor choice does not alter d_ij',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: mastering the u-v variables is where true linear programming intuition begins! Always start by writing 'u₁ = 0' on your margin. Look at your occupied basic cells and use simple subtraction to solve for intersecting column potentials vⱼ. Then bounce back to find the remaining row potentials uᵢ. It's like playing a game of connect-the-dots across a spanning tree. Audit your basic sums (uᵢ + vⱼ = cᵢⱼ) before moving forward, and you will never make an algebraic slip in your life!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="u-v Variables FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="u-v Variables (MODI Method)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic3_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic2;
