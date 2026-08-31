// src/components/study/quantitative-analysis/topics/004_001_critical-path-method-and-pert/Topic12.jsx
// React 19 Function-based Component
// Module: 004_001_critical-path-method-and-pert
// Topic 12: Short Questions

import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic12_files/topic12_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic12_files/topic12_note.txt?raw';

const Topic12 = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedExample, setSelectedExample] = useState(0);
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

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

  const flashcards = [
    {
      topic: 'Topic 0: Meaning of PNA',
      q: 'Why is Project Network Analysis superior to traditional Gantt charts for complex industrial projects?',
      a: 'PNA explicitly models task dependencies via directed graphs, calculates Total, Free, and Independent Floats, and isolates the critical path bottlenecks.',
      formula: 'PNA = Graph Theory + Precedence Logic + Float Computation',
    },
    {
      topic: 'Topic 1: Assumptions of CPM/PERT',
      q: 'What are the core mathematical assumptions of CPM and PERT?',
      a: 'Directed Acyclic Graph (DAG) topology, activity independence, linear crashing in CPM, Beta distributions in PERT, and Central Limit Theorem for total project duration.',
      formula: 'DAG + Independence + Linear Crashing + Beta/CLT',
    },
    {
      topic: 'Topic 2: Activity Classifications',
      q: 'What are the 6 activity classifications and what is the universal float hierarchy?',
      a: 'Predecessor, Successor, Concurrent, Critical (TF=0), Non-Critical (TF>0), and Dummy (d=0, ₹0). Hierarchy: Total Float ≥ Free Float ≥ Independent Float ≥ 0.',
      formula: 'TF ≥ FF ≥ IF ≥ 0',
    },
    {
      topic: 'Topic 3: Event & Fulkerson Rule',
      q: 'What is an Event and what is Fulkerson’s Node Numbering Rule?',
      a: 'An instantaneous milestone (d=0, ₹0). Fulkerson numbering assigns integers so that for every activity (i, j), tail node i < head node j strictly.',
      formula: 'i < j ∀ (i, j) ∈ Edges',
    },
    {
      topic: 'Topic 4: Network Drawing Rules',
      q: 'What are the 3 fatal network errors to avoid when drawing arrow diagrams?',
      a: '1. Dangling (dead-end isolated nodes); 2. Looping / Cycling (circular feedback loops); 3. Duplicate Node Pairs (parallel tasks between identical nodes in AOA).',
      formula: 'Single Start/Sink + No Dangling + No Cycles + Unique (i, j)',
    },
    {
      topic: 'Topic 5: CPA Methodology Engine',
      q: 'What are the 5 phases of the Critical Path Analysis Working Methodology?',
      a: '1. Planning & WBS; 2. Two-Pass Scheduling; 3. Float Analysis; 4. Critical Path Isolation; 5. Crashing & Cost Optimization in Indian Rupees (₹).',
      formula: 'WBS ➔ Two-Pass ➔ Floats ➔ Critical Path ➔ Crashing(₹)',
    },
    {
      topic: 'Topic 6: Earliest Event Times',
      q: 'How are Earliest Event Times E_j computed and why is MAXIMUM chosen at merge nodes?',
      a: 'E_1 = 0; E_j = max(E_i + d_ij). Maximum is chosen because an event cannot occur until ALL prerequisite incoming activities have finished.',
      formula: 'E_j = max_{(i, j)} [ E_i + d_ij ],   ES = E_i,   EF = E_i + d_ij',
    },
    {
      topic: 'Topic 7: Latest Event Times',
      q: 'How are Latest Event Times L_i computed and why is MINIMUM chosen at burst nodes?',
      a: 'L_n = E_n; L_i = min(L_j − d_ij). Minimum is chosen so that the event occurs early enough to satisfy the tightest downstream outgoing deadline. L_1 MUST = 0.',
      formula: 'L_i = min_{(i, j)} [ L_j − d_ij ],   LF = L_j,   LS = L_j − d_ij',
    },
    {
      topic: 'Topic 8: Critical Activities & Trap',
      q: 'What are the 3 Invariant Conditions for Activity Criticality and what is the False-Criticality Trap?',
      a: '1. E_i = L_i; 2. E_j = L_j; 3. E_j − E_i = d_ij (TF = 0). The trap occurs when an activity connects two critical nodes but d_ij < E_j − E_i, leaving positive float!',
      formula: 'Criticality ⇔ E_i=L_i ∧ E_j=L_j ∧ E_j−E_i=d_ij',
    },
    {
      topic: 'Topic 9: Critical Path Properties',
      q: 'Why does the LONGEST path determine the MINIMUM project duration?',
      a: 'Because the project cannot finish until all activities complete; since the longest path takes the most time, it sets the absolute lower bound on project duration.',
      formula: 'Project Duration = max(Path Durations) = Length of Critical Path',
    },
    {
      topic: 'Topic 10: Project Duration & Crashing',
      q: 'What is the U-shaped Total Cost curve and the Cost Slope formula?',
      a: 'Total Cost = Direct + Indirect. Optimal T* is at the minimum total cost where Cost Slope exceeds Daily Overhead. Cost Slope = (C_c − C_n) / (T_n − T_c) in ₹/Day.',
      formula: 'Cost Slope = ΔC / ΔT (₹/Day) < Daily Overhead',
    },
    {
      topic: 'Topic 11: Basic PERT Concept',
      q: 'What are the PERT Beta distribution equations and Z-score deliverability formula?',
      a: 't_e = (t_o + 4t_m + t_p)/6; σ² = ((t_p − t_o)/6)². Variances sum along the Critical Path. Z = (T_S − μ_proj) / σ_proj gives normal completion probability.',
      formula: 't_e = (a + 4m + b)/6,   Z = (T_S − μ) / σ_proj',
    },
  ];

  const currentCard = flashcards[flashcardIndex];

  // Case Studies
  const caseStudies = [
    {
      title: '1. Foundry Furnace Master Module Audit (Debangshu)',
      lead: 'Debangshu (Lead Operations Lead)',
      desc: 'Presented a full 13-topic audit trail for a ₹2.4 Lakh blast furnace rebuild in Barrackpore, verifying two co-critical paths, zero dangling errors, and optimal crashing to T* = 19 days.',
      lesson: 'A complete mastery of all 13 CPM/PERT concepts guarantees flawless plant shutdown management.',
    },
    {
      title: '2. Cold-Chain Vaccine Facility Comprehensive Governance (Mamata & Mahima)',
      lead: 'Mamata & Mahima (Health Supply Directors)',
      desc: 'Combined Two-Pass scheduling and PERT Z-scores (Z = +1.00, 84.13% deliverability) to safely disburse ₹35 Lakhs in emergency vaccines in Kolkata.',
      lesson: 'Integrating deterministic CPM control with probabilistic PERT confidence secures public health logistics.',
    },
    {
      title: '3. Supermarket FMCG Automated Logistics Hub Review (Susmita)',
      lead: 'Susmita (Regional Distribution Coordinator)',
      desc: 'Governed a 12-node conveyor network in Ichapur, maintaining unique node pairs via dummies, preventing false criticality, and saving ₹60,000 in unneeded overtime.',
      lesson: 'Rigorous application of the 3 criticality conditions prevents costly overtime misallocations.',
    },
    {
      title: '4. Educational High-Tech Lab Research Grant Certification (Abhronila)',
      lead: 'Abhronila (Supply Chain & Educational Press Lead)',
      desc: 'Presented a certified CPM/PERT blueprint to state university auditors in Jadavpur, validating that a ₹55 Lakh cleanroom research lab met all milestone audit standards.',
      lesson: 'Formal operations research documentation satisfies strict institutional funding audits.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased font-sans pb-24">
      {/* Scoped Keyframes */}
      <style>{`
        @keyframes masterGlow {
          0%, 100% { border-color: rgba(56, 189, 248, 0.3); }
          50% { border-color: rgba(56, 189, 248, 0.8); }
        }
        .glow-master {
          animation: masterGlow 2s infinite ease-in-out;
        }
      `}</style>

      {/* Main Container: Stacked Vertically */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col space-y-12">
        
        {/* Module Header & Topic Breadcrumb */}
        <header className="flex flex-col space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Segment 4 • Module 004_001 • Topic 12 (Final Master Review)
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700">
              Quantitative Analysis & Operations Research
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-sky-950/80 text-sky-400 border border-sky-800/60">
              Comprehensive Viva Voce • 13-Topic Master Blueprint • Flashcards
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
            Short Questions & Master Synthesis
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-4xl">
            The grand capstone and master review for <span className="text-sky-400 font-semibold">Module 004_001 (Critical Path Method & PERT)</span>: comprehensive <span className="text-amber-400 font-semibold">Viva Voce Flashcards</span> covering all 12 prior topics, the <span className="text-emerald-400 font-semibold">Master Mathematical Formula Matrix</span>, and full regional operational governance in Indian Rupees (<span className="text-emerald-400 font-bold">₹</span>).
          </p>

          {/* Quick Nav Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'flashcard-deck', label: '1. Master Flashcard Deck' },
              { id: 'formula-matrix', label: '2. Master Formula Table' },
              { id: 'module-blueprint', label: '3. 13-Topic Architecture SVG' },
              { id: 'case-studies', label: '4. Master Case Studies' },
              { id: 'pitfalls', label: '5. Master Traps & Pitfalls' },
              { id: 'checklist', label: '6. Master Certification Checklist' },
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

        {/* SECTION 1: Master Flashcard Deck */}
        <section
          ref={(el) => (sectionRefs.current[0] = el)}
          data-index="0"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6 glow-master">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-2">
              <div className="flex items-center space-x-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-600/20 text-sky-400 font-bold text-sm">
                  01
                </span>
                <h2 className="text-2xl font-bold text-white tracking-wide">
                  Interactive Master Flashcard Deck (12 Topics)
                </h2>
              </div>
              <span className="text-xs font-mono text-amber-400 font-semibold">
                Card {flashcardIndex + 1} of {flashcards.length}
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs uppercase tracking-wider font-bold text-sky-400 font-mono">
                  {currentCard.topic}
                </span>
                <button
                  onClick={() => setShowAnswer(!showAnswer)}
                  className="px-3 py-1 bg-sky-950 text-sky-300 border border-sky-800 rounded-lg text-xs font-semibold hover:bg-sky-900 transition-all"
                >
                  {showAnswer ? 'Hide Answer 👁️' : 'Reveal Answer 🔍'}
                </button>
              </div>

              <p className="text-base sm:text-lg font-semibold text-white leading-relaxed">
                {currentCard.q}
              </p>

              {showAnswer && (
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col space-y-2 text-xs sm:text-sm">
                  <p className="text-emerald-300 leading-relaxed font-sans">{currentCard.a}</p>
                  <div className="pt-2 border-t border-slate-800 text-amber-300 font-mono text-xs">
                    📐 <strong>Governing Formulation:</strong> {currentCard.formula}
                  </div>
                </div>
              )}
            </div>

            {/* Flashcard Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  setShowAnswer(false);
                  setFlashcardIndex((prev) => (prev > 0 ? prev - 1 : flashcards.length - 1));
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 text-xs font-semibold"
              >
                ◀ Previous Card
              </button>
              <button
                onClick={() => {
                  setShowAnswer(false);
                  setFlashcardIndex((prev) => (prev < flashcards.length - 1 ? prev + 1 : 0));
                }}
                className="px-4 py-2 rounded-xl bg-sky-600 text-white border border-sky-500 hover:bg-sky-500 text-xs font-semibold"
              >
                Next Card ▶
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 2: Master Formula Table */}
        <section
          ref={(el) => (sectionRefs.current[1] = el)}
          data-index="1"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                02
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Master Mathematical Formula & Theorem Reference
              </h2>
            </div>

            <div className="overflow-x-auto bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col space-y-3">
              <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold font-sans">
                    <th className="p-2.5">Concept / Parameter</th>
                    <th className="p-2.5 text-sky-400">Mathematical Formula / Governing Theorem</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Expected Duration (PERT)</td>
                    <td className="p-2.5 text-emerald-300">t_e = (t_o + 4*t_m + t_p) / 6</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Activity Variance (PERT)</td>
                    <td className="p-2.5 text-amber-300">σ² = [ (t_p − t_o) / 6 ]²</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Forward Pass (Earliest Time)</td>
                    <td className="p-2.5 text-cyan-300">E_j = max_{(i, j)} [ E_i + d_ij ],   E_1 = 0</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Backward Pass (Latest Time)</td>
                    <td className="p-2.5 text-purple-300">L_i = min_{(i, j)} [ L_j − d_ij ],   L_n = E_n,   L_1 = 0</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Total Float (TF)</td>
                    <td className="p-2.5 text-rose-300">TF = LS − ES = LF − EF = L_j − E_i − d_ij</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Free Float (FF)</td>
                    <td className="p-2.5 text-sky-300">FF = E_j − E_i − d_ij</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Independent Float (IF)</td>
                    <td className="p-2.5 text-indigo-300">IF = max(0, E_j − L_i − d_ij)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Float Inequality Hierarchy</td>
                    <td className="p-2.5 text-emerald-400 font-bold">Total Float ≥ Free Float ≥ Independent Float ≥ 0</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Critical Activity Conditions</td>
                    <td className="p-2.5 text-rose-400 font-bold">1. E_i = L_i,   2. E_j = L_j,   3. E_j − E_i = d_ij (TF = 0)</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Project Crashing Cost Slope</td>
                    <td className="p-2.5 text-amber-400">Cost Slope = (C_c − C_n) / (T_n − T_c) in Indian Rupees (₹) / Day</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-white font-sans">Standard Normal Z-Score</td>
                    <td className="p-2.5 text-purple-300">Z = (T_S − μ_project) / sqrt( Σ_{CP} σ² )</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 3: 13-Topic Architecture SVG */}
        <section
          ref={(el) => (sectionRefs.current[2] = el)}
          data-index="2"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-600/20 text-teal-400 font-bold text-sm">
                03
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Complete 13-Topic Critical Path Method & PERT Architecture
              </h2>
            </div>

            <div className="w-full bg-slate-950 p-4 sm:p-6 rounded-xl border border-slate-800 overflow-x-auto flex justify-center">
              <svg
                viewBox="0 0 740 220"
                className="w-full max-w-3xl h-auto select-none"
                style={{ minWidth: '600px' }}
              >
                {/* 4 Thematic Pillars */}
                <rect x="20" y="20" width="160" height="85" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="100" y="45" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">1. Network Foundations</text>
                <text x="100" y="65" fill="#cbd5e1" fontSize="8" textAnchor="middle">Topics 0 - 4</text>
                <text x="100" y="85" fill="#94a3b8" fontSize="7" textAnchor="middle">Activities, Nodes, Fulkerson i&lt;j</text>

                <rect x="200" y="20" width="160" height="85" rx="8" fill="#1e293b" stroke="#818cf8" strokeWidth="2" />
                <text x="280" y="45" fill="#818cf8" fontSize="10" fontWeight="bold" textAnchor="middle">2. Two-Pass Scheduling</text>
                <text x="280" y="65" fill="#cbd5e1" fontSize="8" textAnchor="middle">Topics 5 - 7</text>
                <text x="280" y="85" fill="#94a3b8" fontSize="7" textAnchor="middle">Forward Pass max | Backward min</text>

                <rect x="380" y="20" width="160" height="85" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                <text x="460" y="45" fill="#f43f5e" fontSize="10" fontWeight="bold" textAnchor="middle">3. Critical Path & Float</text>
                <text x="460" y="65" fill="#cbd5e1" fontSize="8" textAnchor="middle">Topics 8 - 9</text>
                <text x="460" y="85" fill="#94a3b8" fontSize="7" textAnchor="middle">TF = 0 | 3 Conditions | Chains</text>

                <rect x="560" y="20" width="160" height="85" rx="8" fill="#1e293b" stroke="#34d399" strokeWidth="2" />
                <text x="640" y="45" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">4. Optimization & PERT</text>
                <text x="640" y="65" fill="#cbd5e1" fontSize="8" textAnchor="middle">Topics 10 - 12</text>
                <text x="640" y="85" fill="#94a3b8" fontSize="7" textAnchor="middle">Optimal T*(₹) | 3-Time Beta & Z</text>

                {/* Unifying Banner */}
                <rect x="20" y="125" width="700" height="75" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text x="370" y="155" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">
                  COMPLETE 13-TOPIC CPM & PERT MASTERY BLUEPRINT
                </text>
                <text x="370" y="180" fill="#ffffff" fontSize="10" textAnchor="middle">
                  Deterministic Scheduling • Float Quantification • Time-Cost Crashing (₹) • Probabilistic Risk
                </text>
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 4: Master Case Studies */}
        <section
          ref={(el) => (sectionRefs.current[3] = el)}
          data-index="3"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 font-bold text-sm">
                04
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Bengal Master Operations Research Case Studies
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

        {/* SECTION 5: Master Traps & Pitfalls */}
        <section
          ref={(el) => (sectionRefs.current[4] = el)}
          data-index="4"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-600/20 text-rose-400 font-bold text-sm">
                05
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Top 4 Master Traps in CPM & PERT
              </h2>
            </div>

            <div className="flex flex-col space-y-2.5">
              {[
                {
                  trap: 'The False-Criticality Trap',
                  fix: 'Never conclude an activity is critical solely because its tail and head events have zero slack; always test Condition 3: E_j − E_i = d_ij.',
                },
                {
                  trap: 'Crashing Non-Critical Activities or Beyond Optimal T*',
                  fix: 'Crashing non-critical tasks wastes direct budget with zero time savings; stop crashing once Cost Slope exceeds Daily Overhead Rate.',
                },
                {
                  trap: 'Summing Standard Deviations Directly in PERT',
                  fix: 'Variances add linearly along the critical path; standard deviations DO NOT add. Always compute σ_proj = sqrt(Σ σ_i²).',
                },
                {
                  trap: 'Ignoring Subcritical Paths During Project Execution',
                  fix: 'Near-critical paths (small float) can easily absorb their buffer and become new critical paths if unmonitored.',
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

        {/* SECTION 6: Master Certification Checklist */}
        <section
          ref={(el) => (sectionRefs.current[5] = el)}
          data-index="5"
          className="flex flex-col space-y-6"
        >
          <div className="bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-slate-700 transition-all duration-300 flex flex-col space-y-6">
            <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold text-sm">
                06
              </span>
              <h2 className="text-2xl font-bold text-white tracking-wide">
                Master Module Certification Checklist (Topics 0 to 12)
              </h2>
            </div>

            <div className="flex flex-col space-y-2">
              {[
                'Defined Project Network Analysis and compared with Gantt charts',
                'Understood the 7 foundational mathematical assumptions of CPM/PERT',
                'Classified activities and applied the Float Hierarchy (TF ≥ FF ≥ IF ≥ 0)',
                'Classified events and applied Fulkerson’s node numbering rule (i < j)',
                'Applied the 6 golden drawing rules and eliminated dangling/looping errors',
                'Executed the 5-Phase Critical Path Analysis working methodology',
                'Computed Forward Pass Earliest Event Times (E_j = max [E_i + d_ij])',
                'Computed Backward Pass Latest Event Times (L_i = min [L_j − d_ij]) and verified L_1 = 0',
                'Verified the 3 Invariant Conditions for Criticality and avoided the False-Criticality Trap',
                'Analyzed single and multiple co-critical paths and subcritical buffer vigilance',
                'Optimized project duration at T* using the U-shaped Total Cost curve and Cost Slopes',
                'Modeled R&D uncertainty via PERT 3-time Beta distributions and Z-score probabilities',
                'Reported all project budgets, overheads, and crashing expenses in Indian Rupees (₹)',
              ].map((text, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-800/40 border border-slate-700/60 flex items-center space-x-3">
                  <span className="text-emerald-400">✅</span>
                  <span className="text-xs sm:text-sm text-slate-300">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: Teacher's Note */}
        <section className="flex flex-col space-y-6">
          <Teacher
            note={
              "Heartiest congratulations to Debangshu, Mamata, Mahima, Susmita, and Abhronila! You have completed all 13 topics of Module 004_001 (Critical Path Method & PERT) with 100% mathematical, operational, and financial rigor. You are now fully equipped to schedule, optimize, and control complex industrial projects and uncertain R&D initiatives across West Bengal and the global economy!"
            }
          />
        </section>

        {/* SECTION 8: FAQ Section */}
        <section className="flex flex-col space-y-6">
          <FAQTemplate
            title="Critical Path Method & PERT Master FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 9: Printable Notes Section */}
        <section className="flex flex-col space-y-6">
          <PlainTextPrint
            content={noteText}
            title="Critical Path Method & PERT Short Questions"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic13_note.txt"
          />
        </section>

      </div>
    </div>
  );
};

export default Topic12;
