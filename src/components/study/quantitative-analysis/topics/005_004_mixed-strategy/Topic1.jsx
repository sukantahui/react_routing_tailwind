// src/components/study/quantitative-analysis/topics/005_004_mixed-strategy/Topic1.jsx
// React 19 Function-based Component
// Module: 005_004_mixed-strategy
// Topic 1: Probability distribution over strategies

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

  // Mode: 'simplex2' vs 'normalizer3'
  const [activeTab, setActiveTab] = useState('simplex2');

  // Simplex 2 state: p1 in [0, 1]
  const [p1, setP1] = useState(0.6);
  const p2 = 1 - p1;

  // 3-Strategy Normalizer state: raw weights w1, w2, w3
  const [weights, setWeights] = useState([4, 3, 3]);
  const totalWeight = weights.reduce((a, b) => a + b, 0);
  const normalizedP = totalWeight > 0 ? weights.map((w) => w / totalWeight) : [0.33, 0.33, 0.34];

  const updateWeight = (idx, val) => {
    const next = [...weights];
    next[idx] = Math.max(0, parseFloat(val) || 0);
    setWeights(next);
  };

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
      title: '1. Foundry Production Schedule Normalization (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Evaluated 3 furnace shifts in Barrackpore with relative weightings [4, 3, 3]. Normalized probability vector p = [0.40, 0.30, 0.30] ensured optimal resource loading and zero idle fuel costs.',
      lesson: 'Weight normalization converts arbitrary production ratios into rigorous probability vectors.',
    },
    {
      title: '2. Cold-Chain Hospital Logistics Distribution (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Assigned delivery probabilities [0.60, 0.40] across 2 refrigerated routes in Kolkata, keeping inventory damage below ₹5,000.',
      lesson: 'Probability simplex points represent real-world fleet split percentages.',
    },
    {
      title: '3. Supermarket FMCG Promotional Mix (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Normalized relative promotional spend [₹50k, ₹30k, ₹20k] in Ichapur into probability vector p = [0.50, 0.30, 0.20], optimizing customer reach.',
      lesson: 'Budget allocations map directly to probability distributions.',
    },
    {
      title: '4. Educational High-Tech Lab Research Allocation (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Converted university lab grant proposals [2, 5, 3] in Jadavpur into an equitable probability distribution p = [0.20, 0.50, 0.30], securing ₹10 Lakh in funding.',
      lesson: 'Simplex geometry provides fair and auditable allocation rules.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes probGlow {
          0%, 100% { border-color: rgba(147, 51, 234, 0.3); }
          50% { border-color: rgba(147, 51, 234, 0.8); }
        }
        .glow-prob {
          animation: probGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-purple-950/80 text-purple-400 border border-purple-800/60">
              Segment 5 • Module 005_004 • Topic 1
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-purple-950/80 text-purple-400 border border-purple-800/60">
              Probability Vectors • Simplex Geometry • Normalization Axioms
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
            Probability Distribution Over Strategies
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            A mathematical deep-dive into <span className="text-purple-400 font-semibold">Probability Distributions over Strategies</span>: mastering the probability axioms (<span className="text-amber-400 font-mono">Σ p_i = 1.0, p_i ≥ 0</span>), visualizing 1D and 2D probability simplexes (<span className="text-sky-400 font-mono">Δ₁, Δ₂</span>), and normalizing raw weights in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'prob-axioms', label: '1. Probability Axioms' },
              { id: 'interactive-simplex', label: '2. Simplex & Normalizer Studio' },
              { id: 'simplex-geometry', label: '3. Geometry of Simplex (Δ₁, Δ₂)' },
              { id: 'svg-simplex', label: '4. Probability Simplex Architecture SVG' },
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
              >
                {item.label}
              </button>
            ))}
          </div>
        </header>

        {/* SECTION 1: Probability Axioms */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-600/20 text-purple-400 font-bold text-sm">
                01
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Fundamental Axioms of Mixed Strategy Probability Vectors
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-emerald-400 font-bold">1. Normalization Axiom</span>
                <p className="text-slate-300 text-xs">
                  The sum of all probabilities across the pure strategy set must equal exactly 1.0.
                </p>
                <span className="text-emerald-400 font-mono text-[11px]">Σ p_i = 1.0 (100%)</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-rose-400 font-bold">2. Non-Negativity Axiom</span>
                <p className="text-slate-300 text-xs">
                  Every individual strategy probability must be greater than or equal to zero.
                </p>
                <span className="text-rose-400 font-mono text-[11px]">p_i ≥ 0.0 ∀ i</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-1">
                <span className="text-sky-400 font-bold">3. Pure vs Mixed Support</span>
                <p className="text-slate-300 text-xs">
                  Pure strategies are unit basis vectors e_k; interior mixtures have p_i &gt; 0 for all i.
                </p>
                <span className="text-sky-400 font-mono text-[11px]">Support = {'{i | p_i > 0}'}</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Simplex & Normalizer Studio */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-prob">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-600/20 text-purple-400 font-bold text-sm">
                  02
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Interactive Simplex & Normalizer Studio
                </h2>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('simplex2')}
                  className={clsx(
                    'px-3 py-1 rounded-lg text-xs font-semibold border transition-all',
                    activeTab === 'simplex2'
                      ? 'bg-purple-600 text-white border-purple-500'
                      : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
                  )}
                >
                  1. 2-Strategy Simplex (Δ₁)
                </button>
                <button
                  onClick={() => setActiveTab('normalizer3')}
                  className={clsx(
                    'px-3 py-1 rounded-lg text-xs font-semibold border transition-all',
                    activeTab === 'normalizer3'
                      ? 'bg-purple-600 text-white border-purple-500'
                      : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
                  )}
                >
                  2. 3-Strategy Normalizer (Δ₂)
                </button>
              </div>
            </div>

            {activeTab === 'simplex2' ? (
              <div className="flex flex-col space-y-4">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-rose-400 font-bold">p₁ (Strategy A₁) = {p1.toFixed(2)} ({(p1 * 100).toFixed(0)}%)</span>
                  <span className="text-sky-400 font-bold">p₂ (Strategy A₂) = {p2.toFixed(2)} ({(p2 * 100).toFixed(0)}%)</span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={p1}
                  onChange={(e) => setP1(parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />

                {/* 1D Simplex Bar */}
                <div className="h-6 w-full rounded-xl overflow-hidden flex border border-slate-700 font-mono text-xs font-bold text-center">
                  <div
                    style={{ width: `${p1 * 100}%` }}
                    className="bg-rose-600 text-white flex items-center justify-center transition-all duration-150"
                  >
                    {p1 >= 0.15 ? `A₁: ${(p1 * 100).toFixed(0)}%` : ''}
                  </div>
                  <div
                    style={{ width: `${p2 * 100}%` }}
                    className="bg-sky-600 text-white flex items-center justify-center transition-all duration-150"
                  >
                    {p2 >= 0.15 ? `A₂: ${(p2 * 100).toFixed(0)}%` : ''}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm flex flex-col space-y-1">
                  <span className="text-emerald-400 font-sans font-bold">Vector Status:</span>
                  <p className="text-slate-300">
                    p = [{p1.toFixed(2)}, {p2.toFixed(2)}]ᵀ &nbsp;|&nbsp; Sum = {(p1 + p2).toFixed(2)} &nbsp;|&nbsp; Status:{' '}
                    <strong className="text-amber-300">
                      {p1 === 1 ? 'Pure Strategy A₁' : p1 === 0 ? 'Pure Strategy A₂' : 'Mixed Strategy on Simplex Interior'}
                    </strong>
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col space-y-4">
                <p className="text-slate-300 text-xs sm:text-sm">
                  Enter arbitrary positive weights for 3 strategies. The normalizer automatically converts them into a valid probability distribution:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                  {weights.map((w, idx) => (
                    <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col space-y-1">
                      <span className="text-slate-400 font-sans">Raw Weight w_{idx + 1}:</span>
                      <input
                        type="number"
                        min="0"
                        value={w}
                        onChange={(e) => updateWeight(idx, e.target.value)}
                        className="w-full px-2 py-1 bg-slate-900 border border-slate-700 rounded font-mono text-sm text-amber-300"
                      />
                      <span className="text-emerald-400 font-bold text-xs pt-1">
                        p_{idx + 1} = {(normalizedP[idx] * 100).toFixed(1)}% ({normalizedP[idx].toFixed(3)})
                      </span>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm flex flex-col space-y-1">
                  <span className="text-emerald-400 font-sans font-bold">Normalized 3D Vector Result:</span>
                  <p className="text-slate-300">
                    p = [{normalizedP.map((val) => val.toFixed(3)).join(', ')}]ᵀ &nbsp;|&nbsp; Sum = {normalizedP.reduce((a, b) => a + b, 0).toFixed(2)} &nbsp;|&nbsp; Status:{' '}
                    <strong className="text-purple-300">Valid Triangle Simplex Point (Δ₂)</strong>
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* SECTION 3: Geometry of Simplex */}
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
                Geometry of Strategy Spaces (Δ₁ Line Segment & Δ₂ Triangle)
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                <span className="text-sky-400 font-bold">1-Dimensional Simplex (Δ₁):</span>
                <p className="text-slate-300 text-xs leading-relaxed">
                  For 2 strategies, the state space is a 1D line segment connecting corner vertex (1,0) to vertex (0,1). Every point is defined by a single probability p₁ with p₂ = 1 − p₁.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-2">
                <span className="text-purple-400 font-bold">2-Dimensional Simplex (Δ₂):</span>
                <p className="text-slate-300 text-xs leading-relaxed">
                  For 3 strategies, the state space is an equilateral triangle in 3D Euclidean space with vertices at (1,0,0), (0,1,0), and (0,0,1). Interior points represent completely mixed distributions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Probability Simplex Architecture SVG */}
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
                Probability Simplex Geometry Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 180"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* 1D Simplex (Line) */}
                <rect x="30" y="30" width="310" height="120" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="185" y="55" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">1D Simplex Δ₁ (2 Strategies)</text>
                <circle cx="70" cy="95" r="5" fill="#f43f5e" />
                <text x="70" y="115" fill="#f43f5e" fontSize="9" textAnchor="middle">e₁ (1, 0)</text>

                <line x1="75" y1="95" x2="295" y2="95" stroke="#a855f7" strokeWidth="3" />
                <circle cx="185" cy="95" r="6" fill="#fde68a" stroke="#ffffff" strokeWidth="1.5" />
                <text x="185" y="85" fill="#fde68a" fontSize="8" textAnchor="middle">Mixed Point (p₁, 1−p₁)</text>

                <circle cx="300" cy="95" r="5" fill="#38bdf8" />
                <text x="300" y="115" fill="#38bdf8" fontSize="9" textAnchor="middle">e₂ (0, 1)</text>

                {/* 2D Simplex (Triangle) */}
                <rect x="390" y="30" width="320" height="120" rx="8" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
                <text x="550" y="55" fill="#a855f7" fontSize="11" fontWeight="bold" textAnchor="middle">2D Simplex Δ₂ (3 Strategies)</text>
                <polygon points="550,70 450,130 650,130" fill="#4c1d95" stroke="#34d399" strokeWidth="2" opacity="0.6" />
                <text x="550" y="65" fill="#34d399" fontSize="8" textAnchor="middle">e₁ (1,0,0)</text>
                <text x="440" y="140" fill="#34d399" fontSize="8" textAnchor="middle">e₂ (0,1,0)</text>
                <text x="660" y="140" fill="#34d399" fontSize="8" textAnchor="middle">e₃ (0,0,1)</text>
                <circle cx="550" cy="110" r="4" fill="#fde68a" />
                <text x="550" y="105" fill="#fde68a" fontSize="7" textAnchor="middle">Interior Mix</text>
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
                Bengal Operations Research Probability Distribution Case Studies
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
                  trap: 'Specifying Negative Probabilities (e.g. p = [1.2, -0.2])',
                  fix: 'Every probability entry must satisfy non-negativity: p_i ≥ 0.',
                },
                {
                  trap: 'Forgetting Normalization (Probabilities Summing to != 1.0)',
                  fix: 'Always divide raw weights by their total sum so that Σ p_i = 1.0 exactly.',
                },
                {
                  trap: 'Treating Pure Strategies as Separate from Mixed Strategies',
                  fix: 'Pure strategies are simply the extreme boundary corners (basis vectors e_k) of the probability simplex.',
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
                  Think of a mixed strategy like dividing a 1-litre bottle of juice between 2 or 3 cups: no matter how you divide it, the total volume in all cups must add up to exactly 1 litre!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully how changing p₁ immediately adjusts p₂ to keep their sum equal to 1.0, moving your strategy along the simplex line!
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
                Student Revision Checklist (Topic 1)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Mastered the 2 probability axioms: Σ p_i = 1.0 and p_i ≥ 0',
                'Visualized the 1D line segment simplex (Δ₁) and 2D triangular simplex (Δ₂)',
                'Differentiated pure corner strategies from interior mixed strategies',
                'Normalized raw weight vectors into valid probability vectors',
                'Reported strategy probabilities and expected values in Indian Rupees (₹)',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: A probability distribution is your mathematical map on the simplex! Always ensure your probabilities are non-negative and sum to 1.0. In our next topic (Topic 2), we will calculate the Expected Payoff E(p, q) resulting from these strategy distributions!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Probability Distribution Over Strategies FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Probability Distribution Over Strategies"
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
