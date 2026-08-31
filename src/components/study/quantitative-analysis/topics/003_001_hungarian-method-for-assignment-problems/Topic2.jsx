// src/components/study/quantitative-analysis/topics/003_001_hungarian-method-for-assignment-problems/Topic2.jsx
// React 19 Function-based Component
// Module: 003_001_hungarian-method-for-assignment-problems
// Topic 2: One-to-one allocation

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

  // 4x4 Interactive Assignment Matrix
  // Workers: Debangshu, Susmita, Mamata, Mahima
  // Tasks: Furnace M1, Clinic M2, Store M3, Press M4
  const costMatrix = [
    [25, 40, 35, 20], // Debangshu
    [30, 20, 25, 30], // Susmita
    [40, 30, 20, 15], // Mamata
    [15, 25, 30, 35], // Mahima
  ];

  const workerNames = ['Debangshu (Barrackpore)', 'Susmita (Ichapur)', 'Mamata (Kolkata)', 'Mahima (Jadavpur)'];
  const taskNames = ['Furnace M1', 'Clinic M2', 'Store M3', 'Press M4'];

  // 4x4 binary assignment grid state
  const [grid, setGrid] = useState([
    [1, 0, 0, 0], // Debangshu → M1
    [0, 1, 0, 0], // Susmita → M2
    [0, 0, 1, 0], // Mamata → M3
    [0, 0, 0, 1], // Mahima → M4
  ]);

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

  // Compute row sums, column sums, and total cost
  const rowSums = grid.map((row) => row.reduce((a, b) => a + b, 0));
  const colSums = [0, 1, 2, 3].map((cIdx) => grid.reduce((sum, row) => sum + row[cIdx], 0));

  let totalCost = 0;
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (grid[r][c] === 1) {
        totalCost += costMatrix[r][c];
      }
    }
  }

  const isPerfectMatching =
    rowSums.every((s) => s === 1) &&
    colSums.every((s) => s === 1);

  // Toggle cell assignment
  const toggleCell = (r, c) => {
    const next = grid.map((row, rIdx) =>
      row.map((val, cIdx) => {
        if (rIdx === r && cIdx === c) {
          return val === 1 ? 0 : 1;
        }
        return val;
      })
    );
    setGrid(next);
  };

  // Preset Configurations
  const presets = [
    {
      name: '1. Perfect 1-to-1 Diagonal (Feasible)',
      g: [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1],
      ],
      desc: 'Each worker has 1 task; each task has 1 worker. Total = ₹100.',
    },
    {
      name: '2. Contested Conflict (Double-Booking)',
      g: [
        [1, 1, 0, 0], // Debangshu double-booked
        [0, 0, 0, 0], // Susmita idle
        [0, 0, 1, 0],
        [0, 0, 0, 1],
      ],
      desc: 'Debangshu assigned to M1 and M2; Susmita has zero jobs.',
    },
    {
      name: '3. Optimal Cost Matching (Hungarian Optima)',
      g: [
        [0, 0, 0, 1], // Debangshu → M4 (₹20)
        [0, 1, 0, 0], // Susmita → M2 (₹20)
        [0, 0, 1, 0], // Mamata → M3 (₹20)
        [1, 0, 0, 0], // Mahima → M1 (₹15)
      ],
      desc: 'Provably minimal expenditure matching: Z* = ₹75 ⭐!',
    },
  ];

  // Case Studies
  const caseStudies = [
    {
      title: '1. Foundry Supervisor 1-to-1 Rotation (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Verified that 4 casting supervisors were matched 1-to-1 with 4 melting furnaces, preventing dangerous unsupervised furnace operations and eliminating ₹1,450 in weekly overtime.',
      lesson: '1-to-1 allocations ensure clear operational accountability and safety.',
    },
    {
      title: '2. Cold-Chain Vaccine Dedicated Dispatch (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Enforced strict 1-to-1 routing for 4 refrigerated vans across 4 Kolkata hospital clinics, eliminating routing overlaps and maintaining continuous cold-chain integrity.',
      lesson: 'Dedicated 1-to-1 dispatch eliminates conflicting schedule overlaps in medical logistics.',
    },
    {
      title: '3. Supermarket FMCG Store Manager Allocation (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Structured retail store manager assignments across 4 hypermarket branches in Ichapur and Barrackpore, guaranteeing exactly one store director per retail outlet.',
      lesson: 'One-to-one management matching prevents leadership ambiguity.',
    },
    {
      title: '4. Educational Press Legal Defense Workload (Abhronila)',
      lead: 'Abhronila (Supply Chain & Legal Operations Lead)',
      desc: 'Distributed Calcutta High Court defense briefs among public defenders, guaranteeing strict 1-to-1 case assignment per court session to ensure adequate trial preparation.',
      lesson: '1-to-1 matching safeguards constitutional rights to effective legal representation.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes allocGlow {
          0%, 100% { border-color: rgba(14, 165, 233, 0.3); }
          50% { border-color: rgba(14, 165, 233, 0.8); }
        }
        .glow-alloc {
          animation: allocGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Segment 3 • Module 003_001 • Topic 2
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Bijection Principle & Permutation Matrices
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
            One-to-One Allocation
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            Understanding the fundamental <span className="text-sky-400 font-semibold">Bijection Principle</span>: why each resource must perform exactly one task (<span className="text-cyan-400 font-mono">∑ⱼ xᵢⱼ = 1</span>), each task must be handled by one resource (<span className="text-emerald-400 font-mono">∑ᵢ xᵢⱼ = 1</span>), and how <span className="text-amber-400 font-semibold">Permutation Matrices</span> eliminate scheduling conflicts.
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'bijection-concept', label: '1. Bijection Mechanics' },
              { id: 'interactive-workbench', label: '2. Conflict Resolver Workbench' },
              { id: 'conflict-taxonomy', label: '3. Conflict Taxonomy' },
              { id: 'svg-bijection', label: '4. Bijection vs Conflict SVG' },
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
                    ? 'bg-sky-600 text-white border-sky-500 shadow-md shadow-sky-900/40'
                    : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </header>

        {/* SECTION 1: Bijection Mechanics */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                01
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                The 1-to-1 Bijection Invariant
              </h2>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              In any feasible Assignment Problem solution, every row and every column must contain <span className="text-emerald-400 font-bold">exactly one '1'</span> and <span className="text-slate-400 font-mono">(n − 1) '0's</span>:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-sky-300 font-bold">1. Exact Resource Saturation</span>
                <p className="text-slate-300">∑ⱼ xᵢⱼ = 1 — No worker sits idle; no worker is assigned two simultaneous tasks.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-emerald-300 font-bold">2. Complete Task Fulfillment</span>
                <p className="text-slate-300">∑ᵢ xᵢⱼ = 1 — Every task has dedicated personnel; no task is left unperformed.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-purple-300 font-bold">3. Permutation Matrix Structure</span>
                <p className="text-slate-300">Total non-zero entries = n; matrix sparsity = ((n-1)/n) × 100% zeros.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Conflict Resolver Workbench */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-alloc">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                  02
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Interactive 1-to-1 Conflict Resolver Workbench
                </h2>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {presets.map((pr, idx) => (
                  <button
                    key={idx}
                    onClick={() => setGrid(pr.g)}
                    className="px-2.5 py-1 rounded text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700 hover:text-white hover:bg-slate-700 transition-all"
                  >
                    Preset {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm">
              Click any cell to toggle assignment on/off. Notice how real-time row and column status indicators detect double-booking or unassigned entities!
            </p>

            {/* 4x4 Grid */}
            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-center border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="p-2 text-left font-semibold text-slate-300">Assignees \ Tasks</th>
                    {taskNames.map((t, idx) => (
                      <th key={idx} className="p-2 font-semibold text-cyan-300">
                        {t}
                      </th>
                    ))}
                    <th className="p-2 font-semibold text-amber-300">Row Sum</th>
                    <th className="p-2 font-semibold text-sky-300">Worker Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {workerNames.map((wName, rIdx) => {
                    const rSum = rowSums[rIdx];
                    return (
                      <tr key={rIdx}>
                        <td className="p-2 text-left font-medium text-slate-200">{wName}</td>
                        {grid[rIdx].map((val, cIdx) => (
                          <td key={cIdx} className="p-2">
                            <button
                              onClick={() => toggleCell(rIdx, cIdx)}
                              className={clsx(
                                'w-full p-2.5 rounded-lg font-mono font-bold transition-all border flex flex-col items-center justify-center',
                                val === 1
                                  ? 'bg-emerald-950 text-emerald-300 border-emerald-500 shadow-md shadow-emerald-950/60'
                                  : 'bg-slate-900 text-slate-500 border-slate-800 hover:border-slate-700 hover:text-slate-300'
                              )}
                            >
                              {val === 1 && (
                                <span className="text-[9px] font-extrabold bg-emerald-500 text-slate-950 px-1 py-0.2 rounded mb-0.5">
                                  x = 1
                                </span>
                              )}
                              <span>₹{costMatrix[rIdx][cIdx]}</span>
                            </button>
                          </td>
                        ))}
                        <td className="p-2 font-mono font-bold text-amber-300">{rSum}</td>
                        <td className="p-2 text-xs font-semibold">
                          {rSum === 1 ? (
                            <span className="text-emerald-400">✓ Dedicated (1)</span>
                          ) : rSum > 1 ? (
                            <span className="text-rose-400 font-bold">⚠️ Double-Booked ({rSum})</span>
                          ) : (
                            <span className="text-amber-400">⚠️ Idle (0)</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  <tr className="bg-slate-900/60 text-slate-300 font-mono text-xs">
                    <td className="p-2.5 text-left font-semibold text-amber-300">Col Sum (Tasks)</td>
                    {colSums.map((cSum, cIdx) => (
                      <td key={cIdx} className="p-2 font-bold text-amber-300">
                        {cSum}
                      </td>
                    ))}
                    <td className="p-2 text-white font-bold">∑ {rowSums.reduce((a, b) => a + b, 0)}</td>
                    <td className="p-2 text-xs font-sans text-white">
                      {isPerfectMatching ? '✓ 100% Feasible' : '⚠️ Conflict'}
                    </td>
                  </tr>
                  <tr className="bg-slate-900/40 text-slate-400 text-[11px]">
                    <td className="p-2 text-left font-semibold text-cyan-300">Task Status</td>
                    {colSums.map((cSum, cIdx) => (
                      <td key={cIdx} className="p-1.5">
                        {cSum === 1 ? (
                          <span className="text-emerald-400 font-semibold">✓ Filled</span>
                        ) : cSum > 1 ? (
                          <span className="text-rose-400 font-bold">Contested</span>
                        ) : (
                          <span className="text-amber-400">Vacant</span>
                        )}
                      </td>
                    ))}
                    <td colSpan="2" className="p-1.5 text-right font-mono text-slate-300">
                      Total Cost: <span className="text-emerald-400 font-bold text-sm">₹{totalCost}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Feasibility Alert */}
            <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs sm:text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-slate-400 font-medium">Bijection Status:</span>
                {isPerfectMatching ? (
                  <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold font-mono">
                    ✓ 100% Feasible Permutation Matrix (Pure 1-to-1 Matching)
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded bg-rose-950 text-rose-300 border border-rose-800 font-bold font-mono">
                    ⚠️ Infeasible Assignment (Scheduling Conflicts or Idle Resources)
                  </span>
                )}
              </div>

              <span className="text-slate-400 text-xs">
                Active Ones: {rowSums.reduce((a, b) => a + b, 0)} of 4 Required
              </span>
            </div>
          </div>
        </section>

        {/* SECTION 3: Conflict Taxonomy */}
        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          data-index="2"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-600/20 text-rose-400 font-bold text-sm">
                03
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Assignment Conflict Taxonomy
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-rose-400 font-bold">1. Row Conflict (Double-Booking)</span>
                <p className="text-slate-300">
                  <span className="font-mono text-rose-300">∑ⱼ xᵢⱼ &gt; 1</span> — Worker assigned to two places simultaneously. Operationally infeasible without cloning personnel.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-rose-400 font-bold">2. Column Conflict (Task Contestation)</span>
                <p className="text-slate-300">
                  <span className="font-mono text-rose-300">∑ᵢ xᵢⱼ &gt; 1</span> — Multiple workers fighting over the same machine or legal brief. Creates redundant labor waste.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-amber-400 font-bold">3. Row Deficit (Idle Resource)</span>
                <p className="text-slate-300">
                  <span className="font-mono text-amber-300">∑ⱼ xᵢⱼ = 0</span> — Worker sits idle while drawing payroll. Severe capacity waste.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-amber-400 font-bold">4. Column Deficit (Neglected Task)</span>
                <p className="text-slate-300">
                  <span className="font-mono text-amber-300">∑ᵢ xᵢⱼ = 0</span> — Customer order, delivery run, or medical emergency left unattended.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Bijection vs Conflict SVG */}
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
                Bijection (1-to-1) vs Conflicted Allocation
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 220"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* Left Side: Valid 1-to-1 Bijection */}
                <rect x="40" y="30" width="310" height="160" rx="8" fill="#022c22" stroke="#10b981" strokeWidth="2" />
                <text x="195" y="55" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">VALID 1-TO-1 BIJECTION</text>
                <circle cx="90" cy="90" r="10" fill="#065f46" stroke="#34d399" strokeWidth="1.5" />
                <circle cx="90" cy="140" r="10" fill="#065f46" stroke="#34d399" strokeWidth="1.5" />
                <circle cx="300" cy="90" r="10" fill="#065f46" stroke="#34d399" strokeWidth="1.5" />
                <circle cx="300" cy="140" r="10" fill="#065f46" stroke="#34d399" strokeWidth="1.5" />
                <line x1="100" y1="90" x2="290" y2="90" stroke="#34d399" strokeWidth="2.5" />
                <line x1="100" y1="140" x2="290" y2="140" stroke="#34d399" strokeWidth="2.5" />
                <text x="195" y="175" fill="#a7f3d0" fontSize="10" fontFamily="monospace" textAnchor="middle">Row Sums = 1 • Col Sums = 1</text>

                {/* Right Side: Conflicted Overlap */}
                <rect x="390" y="30" width="310" height="160" rx="8" fill="#4c0519" stroke="#f43f5e" strokeWidth="2" />
                <text x="545" y="55" fill="#fb7185" fontSize="12" fontWeight="bold" textAnchor="middle">INVALID CONFLICTED ALLOCATION</text>
                <circle cx="440" cy="90" r="10" fill="#881337" stroke="#fb7185" strokeWidth="1.5" />
                <circle cx="440" cy="140" r="10" fill="#881337" stroke="#fb7185" strokeWidth="1.5" />
                <circle cx="650" cy="90" r="10" fill="#881337" stroke="#fb7185" strokeWidth="1.5" />
                <circle cx="650" cy="140" r="10" fill="#881337" stroke="#fb7185" strokeWidth="1.5" />
                <line x1="450" y1="90" x2="640" y2="90" stroke="#f43f5e" strokeWidth="2" />
                <line x1="450" y1="90" x2="640" y2="140" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 3" />
                <text x="545" y="175" fill="#fecdd3" fontSize="10" fontFamily="monospace" textAnchor="middle">Double Booking & Idle Worker!</text>
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
                Bengal Logistics One-to-One Case Studies
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
                  <p className="text-sky-300 font-semibold">💡 <strong>Operations Takeaway:</strong> {cs.lesson}</p>
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
                  trap: 'Allowing Multiple 1s in Any Row or Column',
                  fix: 'Every row and column MUST sum to exactly 1; two 1s in a row violates worker capacity.',
                },
                {
                  trap: 'Allowing Unassigned Entities (Zeros in Row/Col Sums)',
                  fix: 'A sum of 0 in any row or column indicates an idle worker or neglected task, making the solution infeasible.',
                },
                {
                  trap: 'Permitting Fractional Split Assignments',
                  fix: 'Standard assignment models require pure binary integer decisions (x_ij ∈ {0, 1}).',
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
                  Think about the game of Rook placement in Chess: placing n rooks on an n × n chessboard so that no two rooks can attack each other is the exact same mathematical problem as finding a 1-to-1 assignment permutation matrix!
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex flex-col space-y-1">
                <span className="text-cyan-300 font-semibold text-sm">🔍 Observe carefully…</span>
                <p className="text-slate-300 text-xs sm:text-sm">
                  Observe carefully that the total number of assigned ones in an n × n problem is ALWAYS exactly n, leaving n² − n inactive zero cells.
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
                Student Revision Checklist (Topic 2)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Understood the 1-to-1 bijection principle: 1 worker ➔ 1 task',
                'Formulated row constraints (∑_j x_ij = 1) and col constraints (∑_i x_ij = 1)',
                'Represented valid assignments as Permutation Matrices (n ones, n²-n zeros)',
                'Identified row conflicts (double-booking) and column conflicts (task contestation)',
                'Verified that n! factorial combinations represent the permutation space',
                'Audited allocation grids for complete feasibility and calculated total spend in ₹',
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
              "To Debangshu, Mamata, Mahima, Susmita, and Abhronila: mastering the 1-to-1 allocation rule is like mastering the rules of harmony in music! If a single musician plays two instruments at once, or an instrument sits silent, the symphony collapses. Always verify that your solution has exactly one checkmark per row and one checkmark per column. In our next topic, we will inspect the Cost Matrix that measures the performance of every potential pairing!"
            }
          />
        </section>

        {/* SECTION 10: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="One-to-One Allocation FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 11: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="One-to-One Allocation (Hungarian Method)"
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
