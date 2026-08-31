// src/components/study/quantitative-analysis/topics/003_001_hungarian-method-for-assignment-problems/Topic0.jsx
// React 19 Function-based Component
// Module: 003_001_hungarian-method-for-assignment-problems
// Topic 0: Introduction to Assignment Problems

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic0_files/topic0_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic0_files/topic0_note.txt?raw';

const Topic0 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);

  // Interactive 3x3 Matching State
  // Workers: Debangshu (W1), Susmita (W2), Mamata (W3)
  // Tasks: Furnace M1 (J1), Clinic M2 (J2), Press M3 (J3)
  const costMatrix = [
    [25, 40, 35], // Debangshu
    [30, 20, 25], // Susmita
    [40, 30, 20], // Mamata
  ];

  const workerNames = ['Debangshu (Barrackpore)', 'Susmita (Ichapur)', 'Mamata (Kolkata)'];
  const taskNames = ['Furnace Job 1', 'Clinic Task 2', 'Press Case 3'];

  // Current permutation: array of column indices chosen for row 0, 1, 2
  const [matching, setMatching] = useState([0, 1, 2]); // W1->J1, W2->J2, W3->J3

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

  // Compute total cost for current permutation
  const currentCost = matching.reduce((sum, taskIdx, workerIdx) => {
    return sum + (taskIdx !== -1 ? costMatrix[workerIdx][taskIdx] : 0);
  }, 0);

  // Check if current matching is a valid 1-to-1 bijection
  const isValidBijection =
    matching.length === 3 &&
    matching.every((t) => t !== -1) &&
    new Set(matching).size === 3;

  // Preset Permutations
  const presetPermutations = [
    { label: 'Permutation 1: Diagonal (1➔1, 2➔2, 3➔3)', p: [0, 1, 2], cost: '₹65 (25+20+20)' },
    { label: 'Permutation 2: Reverse (1➔3, 2➔2, 3➔1)', p: [2, 1, 0], cost: '₹95 (35+20+40)' },
    { label: 'Permutation 3: Optimal Hungarian (1➔1, 2➔2, 3➔3)', p: [0, 1, 2], cost: '₹65 ⭐ Optimal!' },
    { label: 'Permutation 4: Shifted (1➔2, 2➔3, 3➔1)', p: [1, 2, 0], cost: '₹105 (40+25+40)' },
  ];

  // Case Studies
  const caseStudies = [
    {
      title: '1. Foundry Furnace Allocation (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Assigned 4 casting supervisors to 4 foundry furnaces in Barrackpore. Tested 1-to-1 matching constraints, eliminating ₹1,450 in redundant weekly labor overtime.',
      lesson: 'Assignment modeling ensures zero supervisor double-booking and optimal task matching.',
    },
    {
      title: '2. Cold-Chain Vaccine Clinic Dispatch (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Assigned 4 refrigerated vans to 4 emergency health wards across Kolkata, minimizing total travel hours to deliver temperature-sensitive vials in record time.',
      lesson: '1-to-1 vehicle dispatch models preserve critical pharmaceutical cold-chains.',
    },
    {
      title: '3. Supermarket FMCG Store Manager Matching (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Matched 4 regional supermarket managers to 4 new retail hypermarkets in North 24 Parganas, optimizing managerial expertise against branch requirements.',
      lesson: 'Bipartite skill matching maximizes retail operational productivity.',
    },
    {
      title: '4. Educational Press Legal Brief Distribution (Abhronila)',
      lead: 'Abhronila (Supply Chain & Legal Operations Lead)',
      desc: 'Distributed complex legal briefs among Calcutta High Court defense attorneys, guaranteeing strict 1-to-1 workload balance and complete fee transparency.',
      lesson: 'Quantitative assignment provides objective, unassailable legal resource allocation.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes assignGlow {
          0%, 100% { border-color: rgba(99, 102, 241, 0.3); }
          50% { border-color: rgba(99, 102, 241, 0.8); }
        }
        .glow-assign {
          animation: assignGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-indigo-950/80 text-indigo-400 border border-indigo-800/60">
              Segment 3 • Module 003_001 • Topic 0
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-indigo-950/80 text-indigo-400 border border-indigo-800/60">
              Hungarian Method for Assignment Problems
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
            Introduction to Assignment Problems
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            Exploring the foundations of the <span className="text-indigo-400 font-semibold">1-to-1 Bipartite Matching Problem</span>: understanding square cost matrices (<span className="text-cyan-400 font-mono">n × n</span>), binary decision variables (<span className="text-emerald-400 font-mono">xᵢⱼ ∈ &#123;0, 1&#125;</span>), combinatorial <span className="text-rose-400 font-semibold">n! factorial complexity</span>, and why Kuhn's <span className="text-amber-400 font-semibold">Hungarian Method</span> solves assignment problems in polynomial <span className="text-emerald-400 font-mono">O(n³)</span> time.
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'math-model', label: '1. Mathematical Model' },
              { id: 'interactive-matcher', label: '2. 1-to-1 Permutation Simulator' },
              { id: 'complexity-comparison', label: '3. Brute-Force vs Hungarian O(n³)' },
              { id: 'bipartite-svg', label: '4. Bipartite Graph SVG' },
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
              >
                {item.label}
              </button>
            ))}
          </div>
        </header>

        {/* SECTION 1: Mathematical Model */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 font-bold text-sm">
                01
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                The Assignment Problem Mathematical Model
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              An Assignment Problem is an extreme, completely degenerate special case of a transportation problem where every origin has a supply of exactly <span className="font-mono text-amber-300 font-bold">1</span> and every destination has a demand of exactly <span className="font-mono text-cyan-300 font-bold">1</span>:
            </p>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col space-y-3 text-xs sm:text-sm font-mono">
              <div className="text-indigo-300 font-bold">
                Minimize &nbsp; Z = ∑ᵢ₌₁ⁿ ∑ⱼ₌₁ⁿ ( cᵢⱼ · xᵢⱼ )
              </div>
              <div className="text-slate-300 space-y-1">
                <p>• Subject to Row Constraints: &nbsp; ∑ⱼ₌₁ⁿ xᵢⱼ = 1 &nbsp; (for i = 1, 2, ..., n) — [Every worker gets 1 task]</p>
                <p>• Subject to Column Constraints: ∑ᵢ₌₁ⁿ xᵢⱼ = 1 &nbsp; (for j = 1, 2, ..., n) — [Every task assigned to 1 worker]</p>
                <p>• Binary Decision Restriction: &nbsp; xᵢⱼ ∈ &#123;0, 1&#125; &nbsp; (for all i, j)</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-indigo-300 font-bold">1. Square Cost Matrix (n × n)</span>
                <p className="text-slate-300">Requires equal number of resources and tasks (e.g. 4 workers and 4 machines).</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-emerald-300 font-bold">2. Pure Binary Integer (TUM)</span>
                <p className="text-slate-300">Total Unimodularity guarantees solutions are strictly binary 0 or 1 without fractional splits.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-rose-300 font-bold">3. Severe Simplex Degeneracy</span>
                <p className="text-slate-300">Requires (2n - 1) basic variables, but only n are positive, leaving (n - 1) basic cells with 0.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: 1-to-1 Permutation Simulator */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-assign">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 font-bold text-sm">
                  02
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Interactive 1-to-1 Matching Simulator
                </h2>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {presetPermutations.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => setMatching([...preset.p])}
                    className="px-2.5 py-1 rounded text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700 hover:text-white hover:bg-slate-700 transition-all"
                  >
                    Preset {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Click any cell in the 3x3 cost matrix to assign that worker to that task. Notice how selecting a cell updates the row and column checkmarks to enforce strict 1-to-1 bijection!
            </p>

            {/* Interactive Cost Matrix */}
            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-center border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2.5 text-left font-semibold text-slate-300">Assignees \ Tasks</th>
                    {taskNames.map((t, idx) => (
                      <th key={idx} className="p-2.5 font-semibold text-cyan-300">
                        {t}
                      </th>
                    ))}
                    <th className="p-2.5 font-semibold text-amber-300">Row Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {workerNames.map((wName, rIdx) => (
                    <tr key={rIdx}>
                      <td className="p-2.5 text-left font-medium text-slate-200">{wName}</td>
                      {costMatrix[rIdx].map((cost, cIdx) => {
                        const isAssigned = matching[rIdx] === cIdx;
                        return (
                          <td key={cIdx} className="p-2">
                            <button
                              onClick={() => {
                                const next = [...matching];
                                next[rIdx] = cIdx;
                                setMatching(next);
                              }}
                              className={clsx(
                                'w-full p-2.5 rounded-lg font-mono font-bold transition-all border flex flex-col items-center justify-center',
                                isAssigned
                                  ? 'bg-emerald-950 text-emerald-300 border-emerald-500 shadow-md shadow-emerald-950/60 scale-105'
                                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
                              )}
                            >
                              {isAssigned && (
                                <span className="text-[10px] font-extrabold bg-emerald-500 text-slate-950 px-1.5 py-0.5 rounded mb-1">
                                  x = 1 (ASSIGNED)
                                </span>
                              )}
                              <span>₹{cost}</span>
                            </button>
                          </td>
                        );
                      })}
                      <td className="p-2 font-mono text-xs">
                        {matching[rIdx] !== -1 ? (
                          <span className="text-emerald-400 font-bold">✓ 1 Task</span>
                        ) : (
                          <span className="text-rose-400 font-bold">✗ Unassigned</span>
                        )}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-slate-900/60 text-slate-300 font-mono text-xs">
                    <td className="p-2.5 text-left font-semibold text-amber-300">Column Status</td>
                    {[0, 1, 2].map((cIdx) => {
                      const count = matching.filter((t) => t === cIdx).length;
                      return (
                        <td key={cIdx} className="p-2">
                          {count === 1 ? (
                            <span className="text-emerald-400 font-bold">✓ 1 Worker</span>
                          ) : count === 0 ? (
                            <span className="text-amber-400">0 Workers</span>
                          ) : (
                            <span className="text-rose-400 font-bold">⚠️ Double Booked ({count})</span>
                          )}
                        </td>
                      );
                    })}
                    <td className="p-2 text-white font-bold">
                      {isValidBijection ? '✓ Valid Bijection' : '⚠️ Invalid Pairing'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Total Cost & Validity Indicator */}
            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs sm:text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-slate-400 font-medium">Matching Feasibility:</span>
                {isValidBijection ? (
                  <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold font-mono">
                    ✓ Feasible 1-to-1 Assignment (Permutation)
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded bg-rose-950 text-rose-300 border border-rose-800 font-bold font-mono">
                    ⚠️ Infeasible (Double Booking or Missing Task)
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-2 font-mono">
                <span className="text-slate-400">Total Expenditure:</span>
                <span className="text-xl font-extrabold text-emerald-400">₹{currentCost}</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Brute-Force vs Hungarian O(n³) */}
        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          data-index="2"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-600/20 text-purple-400 font-bold text-sm">
                03
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Brute-Force Permutation vs Hungarian O(n³) Complexity
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-300 bg-slate-950">
                    <th className="p-3 font-semibold">Problem Size (n × n)</th>
                    <th className="p-3 font-semibold text-rose-400">Brute-Force Permutations (n!)</th>
                    <th className="p-3 font-semibold text-emerald-400">Hungarian Operations O(n³)</th>
                    <th className="p-3 font-semibold text-cyan-300">Real-World Execution Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300 font-mono">
                  <tr>
                    <td className="p-3 font-medium text-white font-sans">3 × 3 (Classroom)</td>
                    <td className="p-3 text-rose-300">3! = 6 permutations</td>
                    <td className="p-3 text-emerald-400">3³ = 27 operations</td>
                    <td className="p-3 text-slate-300 font-sans">&lt; 0.001 ms (Instant)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-white font-sans">5 × 5 (Small Enterprise)</td>
                    <td className="p-3 text-rose-300">5! = 120 permutations</td>
                    <td className="p-3 text-emerald-400">5³ = 125 operations</td>
                    <td className="p-3 text-slate-300 font-sans">&lt; 0.01 ms</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-white font-sans">10 × 10 (Mid Factory)</td>
                    <td className="p-3 text-rose-300">10! = 3,628,800 permutations</td>
                    <td className="p-3 text-emerald-400">10³ = 1,000 operations</td>
                    <td className="p-3 text-slate-300 font-sans">&lt; 0.1 ms</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-white font-sans">20 × 20 (Large Fleet)</td>
                    <td className="p-3 text-rose-400 font-extrabold">20! ≈ 2.43 × 10¹⁸ (77,000 years!)</td>
                    <td className="p-3 text-emerald-400 font-extrabold">20³ = 8,000 operations</td>
                    <td className="p-3 text-emerald-300 font-sans font-bold">1.2 ms on laptop! ⭐</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 4: Bipartite Graph SVG */}
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
                Bipartite Matching Representation
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 240"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Left Set: Workers */}
                <circle cx="160" cy="50" r="16" fill="#312e81" stroke="#818cf8" strokeWidth="2" />
                <text x="120" y="55" fill="#818cf8" fontSize="11" fontWeight="bold" textAnchor="end">W1: Debangshu</text>

                <circle cx="160" cy="120" r="16" fill="#312e81" stroke="#818cf8" strokeWidth="2" />
                <text x="120" y="125" fill="#818cf8" fontSize="11" fontWeight="bold" textAnchor="end">W2: Susmita</text>

                <circle cx="160" cy="190" r="16" fill="#312e81" stroke="#818cf8" strokeWidth="2" />
                <text x="120" y="195" fill="#818cf8" fontSize="11" fontWeight="bold" textAnchor="end">W3: Mamata</text>

                {/* Right Set: Tasks */}
                <circle cx="580" cy="50" r="16" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="615" y="55" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="start">J1: Furnace</text>

                <circle cx="580" cy="120" r="16" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="615" y="125" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="start">J2: Clinic</text>

                <circle cx="580" cy="190" r="16" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="615" y="195" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="start">J3: Press</text>

                {/* Active Optimal Edges */}
                <line x1="176" y1="50" x2="564" y2="50" stroke="#10b981" strokeWidth="3" />
                <text x="370" y="42" fill="#34d399" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">x₁₁ = 1 (₹25)</text>

                <line x1="176" y1="120" x2="564" y2="120" stroke="#10b981" strokeWidth="3" />
                <text x="370" y="112" fill="#34d399" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">x₂₂ = 1 (₹20)</text>

                <line x1="176" y1="190" x2="564" y2="190" stroke="#10b981" strokeWidth="3" />
                <text x="370" y="182" fill="#34d399" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">x₃₃ = 1 (₹20)</text>
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
                Bengal Logistics Assignment Case Studies
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
                  trap: 'Attempting Brute-Force Factorial Enumeration on Large Problems',
                  fix: 'Never brute force beyond 3x3! Use the Hungarian Method O(n³) to find the global minimum in polynomial time.',
                },
                {
                  trap: 'Allowing Double Booking in Rows or Columns',
                  fix: 'Every row and every column must contain exactly one assignment (x_ij = 1); two 1s in the same row violates capacity.',
                },
                {
                  trap: 'Applying Hungarian Method to Non-Square Matrices Directly',
                  fix: 'If rows ≠ cols, augment with dummy rows/columns with ₹0 costs before starting row reduction.',
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
                  Think about why the Hungarian method is so revolutionary: by subtracting row and column minimums, it creates zero-cost opportunities that reveal the exact optimal matching without evaluating 3.6 million combinations!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully that in an assignment problem, every single decision variable is binary: xᵢⱼ is either 1 (task assigned) or 0 (not assigned).
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
                Student Revision Checklist (Topic 0)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Defined Assignment Problem as square n x n 1-to-1 matching LP',
                'Stated constraints: ∑_j x_ij = 1, ∑_i x_ij = 1, x_ij ∈ {0, 1}',
                'Recognized n! factorial combinatorial explosion for brute-force search',
                'Understood why severe simplex degeneracy (n-1 zero basic cells) causes stalling',
                'Learned Matrix Reduction Theorem: row/col scalar shifts preserve optimal pairings',
                'Recognized Harold Kuhn, Dénes Kőnig, and Jenő Egerváry for the O(n³) Hungarian Method',
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
              "Welcome Debangshu, Mamata, Mahima, Susmita, and Abhronila to Segment 3: Assignment Problems! The assignment problem is one of the most elegant models in all of quantitative management and operations research. Think of it as finding the perfect, harmonious pairing between people and tasks—no one is overburdened, no task is left undone, and the total expenditure is minimal. Over the next 17 topics, we will master the Hungarian Method from row reductions to König's line coverings, unbalanced dummy lines, and maximization conversions. Let us embark on this journey together!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Introduction to Assignment Problems FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Introduction to Assignment Problems (Hungarian Method)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic1_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic0;
