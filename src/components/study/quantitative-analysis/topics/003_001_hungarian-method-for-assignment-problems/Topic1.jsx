// src/components/study/quantitative-analysis/topics/003_001_hungarian-method-for-assignment-problems/Topic1.jsx
// React 19 Function-based Component
// Module: 003_001_hungarian-method-for-assignment-problems
// Topic 1: Assignment model

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic1_files/topic1_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic1_files/topic1_note.txt?raw';

const Topic1 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [activeTab, setActiveTab] = useState('primal'); // 'primal', 'dual', 'permutation', 'tum'

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
      title: '1. Foundry LP Model Formulation (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Formulated the 4x4 foundry assignment model with 16 binary variables and 8 constraints, establishing that Total Unimodularity guarantees zero fractional worker splits.',
      lesson: 'Formal LP formulation provides mathematical guarantees for plant automation.',
    },
    {
      title: '2. Cold-Chain Vaccine Dual Price Audit (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Calculated optimal dual variables u* and v* for 4 Kolkata health zones, verifying zero duality gap with the primal minimal budget of ₹45,000.',
      lesson: 'Dual shadow prices reveal the marginal economic value of clinic capacity.',
    },
    {
      title: '3. Supermarket FMCG Permutation Matrix Verification (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Verified that the optimal assignment formed a clean 4x4 permutation matrix with exactly four 1s and twelve 0s, eliminating manager double-booking.',
      lesson: 'Permutation matrices are the algebraic fingerprint of feasible 1-to-1 matching.',
    },
    {
      title: '4. Educational Press Legal Compliance Verification (Abhronila)',
      lead: 'Abhronila (Supply Chain & Legal Operations Lead)',
      desc: 'Formulated the assignment model for Calcutta High Court defense briefs, ensuring row sum and column sum equality constraints met strict bar association regulations.',
      lesson: 'Equational constraints ensure complete equity and fairness in public resource allocation.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes modelGlow {
          0%, 100% { border-color: rgba(99, 102, 241, 0.3); }
          50% { border-color: rgba(99, 102, 241, 0.8); }
        }
        .glow-model {
          animation: modelGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-indigo-950/80 text-indigo-400 border border-indigo-800/60">
              Segment 3 • Module 003_001 • Topic 1
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-indigo-950/80 text-indigo-400 border border-indigo-800/60">
              Mathematical Formulation & LP Duality
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            The Assignment Model
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A comprehensive architectural deep-dive into the <span className="text-indigo-400 font-semibold">Primal LP Model</span>, the <span className="text-cyan-400 font-semibold">Dual LP Formulation</span>, the <span className="text-emerald-400 font-semibold">Total Unimodularity (TUM) Theorem</span>, and how the Hungarian Method exploits Complementary Slackness.
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'model-structure', label: '1. Model Structure' },
              { id: 'interactive-inspector', label: '2. Interactive Model Inspector' },
              { id: 'primal-dual-math', label: '3. Primal vs Dual LP Equations' },
              { id: 'svg-bridge', label: '4. Primal-Dual Bridge SVG' },
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
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-900/40'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
                )}
              &gt;
                {item.label}
              </button>
            ))}
          </div>
        </header>

        {/* SECTION 1: Model Structure */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 font-bold text-sm">
                01
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Assignment Model Anatomy
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-slate-400">Decision Variables</span>
                <span className="text-2xl font-bold font-mono text-indigo-400">n² Variables</span>
                <span className="text-[10px] text-slate-500">x_11 to x_nn binary flags</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-slate-400">Functional Constraints</span>
                <span className="text-2xl font-bold font-mono text-cyan-400">2n Constraints</span>
                <span className="text-[10px] text-slate-500">n row sums + n col sums</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-slate-400">Constraint Matrix Rank</span>
                <span className="text-2xl font-bold font-mono text-amber-400">2n − 1</span>
                <span className="text-[10px] text-slate-500">1 redundant linear dependency</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-emerald-800/80 flex flex-col space-y-1">
                <span className="text-emerald-300 font-semibold">Integrality Property</span>
                <span className="text-xl font-bold font-mono text-emerald-400">TUM Guaranteed</span>
                <span className="text-[10px] text-emerald-400">Pure integer vertices ⭐</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Interactive Model Inspector */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        &gt;
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-model">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 font-bold text-sm">
                  02
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Interactive Model Inspector
                </h2>
              </div>
              <div className="flex items-center gap-1.5">
                {[
                  { id: 'primal', label: '1. Primal LP' },
                  { id: 'dual', label: '2. Dual LP' },
                  { id: 'permutation', label: '3. Permutation Matrix' },
                  { id: 'tum', label: '4. TUM Theorem' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={clsx(
                      'px-3 py-1 rounded text-xs font-semibold transition-all border',
                      activeTab === item.id
                        ? 'bg-indigo-600 text-white border-indigo-400 shadow-md'
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                    )}
                  &gt;
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {activeTab === 'primal' && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-3 font-mono text-xs sm:text-sm">
                <span className="text-indigo-300 font-bold font-sans">Primal Linear Program Formulation (3x3):</span>
                <p className="text-white">
                  Minimize &nbsp; Z = 25x₁₁ + 40x₁₂ + 35x₁₃ + 30x₂₁ + 20x₂₂ + 25x₂₃ + 40x₃₁ + 30x₃₂ + 20x₃₃
                </p>
                <div className="text-slate-300 space-y-1">
                  <p className="text-cyan-300 font-semibold font-sans">Row Availability Constraints (Worker Supply):</p>
                  <p>• x₁₁ + x₁₂ + x₁₃ = 1 &nbsp; (Debangshu)</p>
                  <p>• x₂₁ + x₂₂ + x₂₃ = 1 &nbsp; (Susmita)</p>
                  <p>• x₃₁ + x₃₂ + x₃₃ = 1 &nbsp; (Mamata)</p>
                  <p className="text-amber-300 font-semibold font-sans pt-2">Column Requirement Constraints (Task Demand):</p>
                  <p>• x₁₁ + x₂₁ + x₃₁ = 1 &nbsp; (Furnace Job 1)</p>
                  <p>• x₁₂ + x₂₂ + x₃₂ = 1 &nbsp; (Clinic Task 2)</p>
                  <p>• x₁₃ + x₂₃ + x₃₃ = 1 &nbsp; (Press Case 3)</p>
                  <p className="text-emerald-300 font-semibold font-sans pt-2">Integrality Restrictions:</p>
                  <p>• xᵢⱼ ∈ &#123;0, 1&#125; &nbsp; (for all i=1..3, j=1..3)</p>
                </div>
              </div>
            )}

            {activeTab === 'dual' && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-3 font-mono text-xs sm:text-sm">
                <span className="text-cyan-300 font-bold font-sans">Dual Linear Program Formulation:</span>
                <p className="text-white">
                  Maximize &nbsp; W = (u₁ + u₂ + u₃) + (v₁ + v₂ + v₃)
                </p>
                <div className="text-slate-300 space-y-1">
                  <p className="text-slate-400 font-sans">Subject to 9 Dual Feasibility Inequalities:</p>
                  <p>• u₁ + v₁ ≤ 25 &nbsp;&nbsp;• u₁ + v₂ ≤ 40 &nbsp;&nbsp;• u₁ + v₃ ≤ 35</p>
                  <p>• u₂ + v₁ ≤ 30 &nbsp;&nbsp;• u₂ + v₂ ≤ 20 &nbsp;&nbsp;• u₂ + v₃ ≤ 25</p>
                  <p>• u₃ + v₁ ≤ 40 &nbsp;&nbsp;• u₃ + v₂ ≤ 30 &nbsp;&nbsp;• u₃ + v₃ ≤ 20</p>
                  <p className="text-emerald-300 font-semibold font-sans pt-2">Zero Duality Gap Theorem:</p>
                  <p>Primal Min Z* = Dual Max W* = ₹65 (Optimal matching: x₁₁=1, x₂₂=1, x₃₃=1).</p>
                </div>
              </div>
            )}

            {activeTab === 'permutation' && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-3 text-xs sm:text-sm">
                <span className="text-amber-300 font-bold">The Permutation Matrix Representation (X*):</span>
                <div className="p-4 bg-slate-900 rounded-lg font-mono text-center text-base sm:text-lg text-emerald-300 font-bold border border-slate-800">
                  X* = &nbsp; [ &nbsp; [1, 0, 0], &nbsp; [0, 1, 0], &nbsp; [0, 0, 1] &nbsp; ]
                </div>
                <p className="text-slate-300">
                  Every feasible assignment is a permutation matrix with exactly one 1 per row and column. By Birkhoff's theorem, the set of all doubly stochastic matrices has permutation matrices as its extreme vertices!
                </p>
              </div>
            )}

            {activeTab === 'tum' && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2 text-xs sm:text-sm">
                <span className="text-emerald-300 font-bold">Total Unimodularity (TUM) Theorem:</span>
                <p className="text-slate-300">
                  Because the node-arc incidence constraint matrix of the bipartite graph has determinants in &#123;0, +1, -1&#125;, solving the assignment problem as a continuous LP automatically produces pure integer binary solutions (xᵢⱼ ∈ &#123;0, 1&#125;).
                </p>
                <div className="p-3 bg-slate-900 rounded font-mono text-cyan-300 text-xs">
                  Continuous Relaxation: &#123; x | Ax = 1, 0 ≤ x ≤ 1 &#125; ➔ Vertex Optimum is strictly integer!
                </div>
              </div>
            )}
          </div>
        </section>

        {/* SECTION 3: Primal vs Dual LP Equations */}
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
                Primal-Dual Comparative Matrix
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-300 bg-slate-950">
                    <th className="p-3 font-semibold">Mathematical Property</th>
                    <th className="p-3 font-semibold text-indigo-300">Primal Assignment LP</th>
                    <th className="p-3 font-semibold text-cyan-300">Dual Assignment LP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="p-3 font-medium text-white">Objective Goal</td>
                    <td className="p-3 font-mono text-indigo-300">Minimize Z = ∑∑ cᵢⱼ xᵢⱼ</td>
                    <td className="p-3 font-mono text-cyan-300">Maximize W = ∑ uᵢ + ∑ vⱼ</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-white">Variable Types</td>
                    <td className="p-3 font-mono text-indigo-300">n² Binary Variables (xᵢⱼ ∈ &#123;0, 1&#125;)</td>
                    <td className="p-3 font-mono text-cyan-300">2n Potential Variables (uᵢ, vⱼ unrestricted)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-white">Constraint Bounds</td>
                    <td className="p-3 font-mono text-indigo-300">Row sums = 1, Col sums = 1</td>
                    <td className="p-3 font-mono text-cyan-300">uᵢ + vⱼ ≤ cᵢⱼ (for all i, j)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-white">Complementary Slackness</td>
                    <td colSpan="2" className="p-3 font-mono text-emerald-300 text-center">
                      xᵢⱼ · (cᵢⱼ − uᵢ − vⱼ) = 0 &nbsp; (xᵢⱼ = 1 ➔ cᵢⱼ = uᵢ + vⱼ)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 4: Primal-Dual Bridge SVG */}
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
                The Primal-Dual Bridge
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 220"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Primal Box */}
                <rect x="50" y="40" width="260" height="140" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                <text x="180" y="70" fill="#818cf8" fontSize="13" fontWeight="bold" textAnchor="middle">PRIMAL ASSIGNMENT LP</text>
                <text x="180" y="100" fill="#cbd5e1" fontSize="11" textAnchor="middle">Min Z = ∑∑ cᵢⱼ xᵢⱼ</text>
                <text x="180" y="125" fill="#cbd5e1" fontSize="10" textAnchor="middle">∑ xᵢⱼ = 1 • xᵢⱼ ∈ &#123;0, 1&#125;</text>
                <text x="180" y="155" fill="#a7f3d0" fontSize="11" fontFamily="monospace" textAnchor="middle">Min Z* = ₹65</text>

                {/* Connecting Equilibrium Bridge */}
                <rect x="330" y="80" width="80" height="60" rx="6" fill="#022c22" stroke="#10b981" strokeWidth="2" />
                <text x="370" y="105" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">STRONG</text>
                <text x="370" y="120" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">DUALITY</text>
                <text x="370" y="133" fill="#ffffff" fontSize="9" textAnchor="middle">Z* = W*</text>

                {/* Dual Box */}
                <rect x="430" y="40" width="260" height="140" rx="8" fill="#082f49" stroke="#38bdf8" strokeWidth="2" />
                <text x="560" y="70" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">DUAL POTENTIAL LP</text>
                <text x="560" y="100" fill="#cbd5e1" fontSize="11" textAnchor="middle">Max W = ∑ uᵢ + ∑ vⱼ</text>
                <text x="560" y="125" fill="#cbd5e1" fontSize="10" textAnchor="middle">uᵢ + vⱼ ≤ cᵢⱼ (Dual Feasibility)</text>
                <text x="560" y="155" fill="#a7f3d0" fontSize="11" fontFamily="monospace" textAnchor="middle">Max W* = ₹65</text>
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
                Bengal Operations Research Model Case Studies
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
                  <p className="text-indigo-300 font-semibold">💡 <strong>Operations Takeaway:</strong> {cs.lesson}</p>
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
                  trap: 'Confusing Number of Decision Variables with Constraints',
                  fix: 'An n x n problem has n² variables (e.g. 16 for 4x4) and 2n functional constraints (8 for 4x4).',
                },
                {
                  trap: 'Assuming Dual Variables u and v Must Be Non-Negative',
                  fix: 'Dual variables corresponding to equality constraints are unrestricted in sign and can be negative.',
                },
                {
                  trap: 'Violating Complementary Slackness',
                  fix: 'An optimal assignment can only place x_ij = 1 on cells where the reduced cost c_ij - u_i - v_j is exactly 0.',
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
                  Think about the mathematical beauty of Total Unimodularity: it guarantees that you never have to worry about assigning "half a worker" or "0.33 of a task"—the LP relaxation vertex solutions are naturally and purely binary!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully that the Hungarian Method is nothing more than a dual optimization engine: each row and column reduction adjusts uᵢ and vⱼ while maintaining dual feasibility uᵢ + vⱼ ≤ cᵢⱼ.
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
                Student Revision Checklist (Topic 1)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Formulated Primal LP: Min Z = ∑∑ cᵢⱼ xᵢⱼ s.t. ∑ xᵢⱼ = 1, xᵢⱼ ∈ {0, 1}',
                'Formulated Dual LP: Max W = ∑ uᵢ + ∑ vⱼ s.t. uᵢ + vⱼ ≤ cᵢⱼ',
                'Identified model dimensions: n² variables, 2n constraints, rank 2n-1',
                'Proved integer vertices via Total Unimodularity (TUM) and Birkhoff Theorem',
                'Verified Complementary Slackness: xᵢⱼ = 1 ➔ cᵢⱼ − uᵢ − vⱼ = 0',
                'Confirmed Zero Duality Gap: Primal Min Z* == Dual Max W*',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: understanding the mathematical anatomy of the Assignment Model is your master key! When examiners ask you why the Hungarian method works, explain to them that it is a Primal-Dual algorithm maintaining dual feasibility uᵢ + vⱼ ≤ cᵢⱼ while searching for complementary slackness zeros. Total Unimodularity ensures that you never have to write branch-and-bound trees. Keep these equations clear in your mind!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Assignment Model FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="The Assignment Model (Hungarian Method)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic2_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic1;
