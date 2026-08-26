import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic12_files/topic12_questions";
import noteText from "./topic12_files/topic12_note.txt?raw";

/**
 * Topic12 – Characteristic Table vs Excitation Table: Masterclass Theory, Conversion Algorithms & Live Demonstration
 * Module: 001_003_flipflops-and-sequential-circuits (Flip‑Flops & Sequential Circuits)
 * Track: Computer Architecture – From Core Systems to Performance Engineering
 *
 * @component
 * @returns {JSX.Element} Exhaustive masterclass with side-by-side comparative matrices, step-by-step
 *                        conversion worked examples, interactive circuit probe simulator, and K-Map logic derivations.
 */
const Topic12 = () => {
  const [activeDiagramTab, setActiveDiagramTab] = useState("matrix-view");
  const [selectedExample, setSelectedExample] = useState("sr-to-jk"); // "sr-to-jk", "jk-to-d", "sr-to-d", "d-to-t"
  
  // Interactive Excitation Evaluator State
  const [presentQ, setPresentQ] = useState(0);
  const [nextQ, setNextQ] = useState(1);

  // Live Conversion Circuit Simulator State
  const [simTargetInputs, setSimTargetInputs] = useState({ in1: true, in2: true }); // J,K or D or T
  const [simStoredQ, setSimStoredQ] = useState(0);
  const [simClkPulse, setSimClkPulse] = useState(false);

  const sectionRefs = useRef([]);

  // Compute Excitation Values for Transition (presentQ &rarr; nextQ)
  const getExcitationValues = (qNow, qNext) => {
    let sr = { s: "0", r: "X", desc: "No change (Hold 0,0) or Reset (0,1)" };
    let jk = { j: "0", k: "X", desc: "No change (Hold 0,0) or Reset (0,1)" };
    let d = { d: "0", desc: "Direct Next State Value (D = 0)" };
    let t = { t: "0", desc: "No Toggle Required (State 0 -> 0)" };

    if (qNow === 0 && qNext === 1) {
      sr = { s: "1", r: "0", desc: "Set Condition Required (S=1, R=0)" };
      jk = { j: "1", k: "X", desc: "Set (1,0) or Toggle (1,1)" };
      d = { d: "1", desc: "Direct Next State Value (D = 1)" };
      t = { t: "1", desc: "Toggle Required (State 0 -> 1)" };
    } else if (qNow === 1 && qNext === 0) {
      sr = { s: "0", r: "1", desc: "Reset Condition Required (S=0, R=1)" };
      jk = { j: "X", k: "1", desc: "Reset (0,1) or Toggle (1,1)" };
      d = { d: "0", desc: "Direct Next State Value (D = 0)" };
      t = { t: "1", desc: "Toggle Required (State 1 -> 0)" };
    } else if (qNow === 1 && qNext === 1) {
      sr = { s: "X", r: "0", desc: "No change (Hold 0,0) or Set (1,0)" };
      jk = { j: "X", k: "0", desc: "No change (Hold 0,0) or Set (1,0)" };
      d = { d: "1", desc: "Direct Next State Value (D = 1)" };
      t = { t: "0", desc: "No Toggle Required (State 1 -> 1)" };
    }

    return { sr, jk, d, t };
  };

  const currentExcitations = getExcitationValues(presentQ, nextQ);

  // Live Conversion Simulator Logic
  const triggerConversionClock = () => {
    setSimClkPulse(true);
    setTimeout(() => {
      let nextState = simStoredQ;
      if (selectedExample === "sr-to-jk") {
        const j = simTargetInputs.in1;
        const k = simTargetInputs.in2;
        if (j && k) nextState = simStoredQ === 0 ? 1 : 0;
        else if (j && !k) nextState = 1;
        else if (!j && k) nextState = 0;
      } else if (selectedExample === "jk-to-d" || selectedExample === "sr-to-d") {
        const d = simTargetInputs.in1;
        nextState = d ? 1 : 0;
      } else if (selectedExample === "d-to-t") {
        const t = simTargetInputs.in1;
        if (t) nextState = simStoredQ === 0 ? 1 : 0;
      }
      setSimStoredQ(nextState);
      setSimClkPulse(false);
    }, 350);
  };

  // Intermediate Excitation Signals for Live Circuit Probe
  const getProbedSignals = () => {
    const q = simStoredQ;
    const qBar = q === 0 ? 1 : 0;

    if (selectedExample === "sr-to-jk") {
      const j = simTargetInputs.in1 ? 1 : 0;
      const k = simTargetInputs.in2 ? 1 : 0;
      const s = j & qBar;
      const r = k & q;
      return {
        formula: "S = J · Q̄ , R = K · Q",
        inputLabel1: "J (Set)",
        inputLabel2: "K (Reset)",
        availLabel: "Available SR Flip-Flop",
        probe1: `S = ${j} · ${qBar} = ${s}`,
        probe2: `R = ${k} · ${q} = ${r}`,
        activeAction: j && k ? "Toggle Mode" : j ? "Set Mode" : k ? "Reset Mode" : "Hold Mode"
      };
    } else if (selectedExample === "jk-to-d") {
      const d = simTargetInputs.in1 ? 1 : 0;
      const j = d;
      const k = d === 1 ? 0 : 1;
      return {
        formula: "J = D , K = D̄",
        inputLabel1: "D (Data)",
        inputLabel2: "None (Single Input)",
        availLabel: "Available JK Flip-Flop",
        probe1: `J = D = ${j}`,
        probe2: `K = D̄ = ${k}`,
        activeAction: d ? "Transparent Set (1)" : "Transparent Reset (0)"
      };
    } else if (selectedExample === "sr-to-d") {
      const d = simTargetInputs.in1 ? 1 : 0;
      const s = d;
      const r = d === 1 ? 0 : 1;
      return {
        formula: "S = D , R = D̄",
        inputLabel1: "D (Data)",
        inputLabel2: "None (Single Input)",
        availLabel: "Available SR Flip-Flop",
        probe1: `S = D = ${s}`,
        probe2: `R = D̄ = ${r}`,
        activeAction: d ? "Set Storage (1)" : "Reset Storage (0)"
      };
    } else {
      // d-to-t
      const t = simTargetInputs.in1 ? 1 : 0;
      const d = t ^ q;
      return {
        formula: "D = T ⊕ Q = T · Q̄ + T̄ · Q",
        inputLabel1: "T (Toggle)",
        inputLabel2: "None (Single Input)",
        availLabel: "Available D Flip-Flop",
        probe1: `D = ${t} ⊕ ${q} = ${d}`,
        probe2: "XOR Logic Active",
        activeAction: t ? "Toggle Operation" : "Hold Operation"
      };
    }
  };

  const probed = getProbedSignals();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.1 }
    );
    sectionRefs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const addRef = (el) => {
    if (el && !sectionRefs.current.includes(el)) sectionRefs.current.push(el);
  };

  return (
    <>
      <style>{`
        .reveal-section {
          transform: translateY(0);
          transition: transform 0.4s ease-out;
        }
        .reveal-section.is-visible {
          transform: translateY(0);
        }
      `}</style>

      <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 md:p-12 font-sans selection:bg-teal-500/30 selection:text-teal-200">
        
        {/* ─── 1. Header Section ──────────────────────────────── */}
        <header ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-950/70 border border-teal-700/60 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-4 shadow-lg">
            <span>⚡</span>
            <span>Computer Architecture Masterclass · Module 001_003 · Topic 12</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Characteristic Table vs Excitation Table: Masterclass Theory &amp; Conversion Synthesis
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Gain complete mastery over sequential analysis and synthesis. Explore why excitation tables drive sequential circuit design,
            master the universal 5-step conversion algorithm, and see live signal probing in real-time conversion hardware.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-teal-300">
              📊 Analysis (Forward) vs Synthesis (Reverse)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-cyan-300">
              ⚡ 4-in-1 Master Excitation Matrix (SR, JK, D, T)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-amber-300">
              🎯 Step-by-Step Conversion Engine with K-Maps
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-purple-300">
              🧠 Exam Mnemonics ("01XX / XX10" &amp; XOR Rule)
            </span>
          </div>
        </header>

        {/* ─── 2. Classroom Teacher Masterclass Section ───────── */}
        <section
          ref={addRef}
          className="reveal-section max-w-5xl mx-auto mb-16 rounded-2xl border border-teal-500/30 bg-gradient-to-b from-slate-900/95 to-slate-900/80 p-6 md:p-8 shadow-2xl shadow-teal-950/20"
        >
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/20 text-teal-400 font-bold text-lg">
              👨‍🏫
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Teacher's Concept Breakdown: Forward Analysis vs Reverse Synthesis
              </h2>
              <p className="text-xs text-slate-400">
                Understanding the two foundational perspectives of sequential logic design
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Characteristic Table Breakdown */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5 mb-2">
                  <span>🔍</span> 1. Characteristic Table: Forward Analysis
                </span>
                <p className="text-sm text-slate-200 leading-relaxed font-medium">
                  Answers: <strong className="text-teal-300">"Given the Present State Q(t) and applied Inputs, what will be the Next State Q(t+1)?"</strong>
                </p>
                <div className="my-2 p-3 rounded-lg bg-teal-950/40 border border-teal-800/60 font-mono text-xs text-teal-200 text-center font-bold">
                  [ Inputs + Present State Q(t) ] &rarr; Compute Next State Q(t+1)
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Used by engineers when analyzing an already-built circuit to determine what sequence of states it will produce.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-teal-950/30 border border-teal-800/40 text-xs text-teal-200">
                💡 <strong>Analogy:</strong> <em>"Characteristic table is like reading a map — you are at city Q(t), you follow road (Inputs), and see where you arrive (Q_next)."</em>
              </div>
            </div>

            {/* Excitation Table Breakdown */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5 mb-2">
                  <span>🛠️</span> 2. Excitation Table: Reverse Synthesis
                </span>
                <p className="text-sm text-slate-200 leading-relaxed font-medium">
                  Answers: <strong className="text-cyan-300">"To force a transition from Present State Q(t) to Next State Q(t+1), what Inputs must we excite?"</strong>
                </p>
                <div className="my-2 p-3 rounded-lg bg-cyan-950/40 border border-cyan-800/60 font-mono text-xs text-cyan-200 text-center font-bold">
                  [ Desired Transition Q(t) &rarr; Q(t+1) ] &rarr; Derive Required Inputs
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Used when you want to design a <strong>Counter, Sequence Generator, or CPU Controller</strong> from scratch based on a state diagram.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-800/40 text-xs text-cyan-200">
                🎯 <strong>Teacher's Law:</strong> <em>"In engineering, synthesis is what builds silicon. The excitation table is the exact blueprint for state machine synthesis!"</em>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 3. Multi-Tabbed Hardware Schematics Section ───── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-cyan-400">📐</span> Hardware Schematics &amp; Conversion Synthesis
            </h2>
            {/* Tab Selector */}
            <div className="flex flex-wrap items-center gap-2 bg-slate-900 border border-slate-800 p-1.5 rounded-xl">
              <button
                onClick={() => setActiveDiagramTab("matrix-view")}
                className={clsx(
                  "px-3 py-1 rounded-lg text-xs font-mono font-bold transition",
                  activeDiagramTab === "matrix-view"
                    ? "bg-teal-900/80 border border-teal-500 text-teal-200"
                    : "text-slate-400 hover:text-slate-200"
                )}
              &gt;
                1. 4-in-1 Master Excitation Matrix
              </button>
              <button
                onClick={() => setActiveDiagramTab("sr-to-jk-schematic")}
                className={clsx(
                  "px-3 py-1 rounded-lg text-xs font-mono font-bold transition",
                  activeDiagramTab === "sr-to-jk-schematic"
                    ? "bg-cyan-900/80 border border-cyan-500 text-cyan-200"
                    : "text-slate-400 hover:text-slate-200"
                )}
              &gt;
                2. SR &rarr; JK Conversion Schematic
              </button>
              <button
                onClick={() => setActiveDiagramTab("jk-to-d-schematic")}
                className={clsx(
                  "px-3 py-1 rounded-lg text-xs font-mono font-bold transition",
                  activeDiagramTab === "jk-to-d-schematic"
                    ? "bg-emerald-900/80 border border-emerald-500 text-emerald-200"
                    : "text-slate-400 hover:text-slate-200"
                )}
              &gt;
                3. JK &rarr; D &amp; D &rarr; T Schematics
              </button>
              <button
                onClick={() => setActiveDiagramTab("kmap-synthesis")}
                className={clsx(
                  "px-3 py-1 rounded-lg text-xs font-mono font-bold transition",
                  activeDiagramTab === "kmap-synthesis"
                    ? "bg-amber-900/80 border border-amber-500 text-amber-200"
                    : "text-slate-400 hover:text-slate-200"
                )}
              &gt;
                4. K-Map Grouping &amp; Don't Cares
              </button>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl">
            
            {/* ─── TAB 1: 4-in-1 Master Excitation Matrix ───────── */}
            {activeDiagramTab === "matrix-view" && (
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400 block">
                  Complete Comparative Matrix: Characteristic Equations vs Excitation Requirements
                </span>
                <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-slate-900 border-b border-slate-800 text-slate-400">
                      <tr>
                        <th className="p-3">Q(t) &rarr; Q(t+1)</th>
                        <th className="p-3 text-teal-300">SR (S, R)</th>
                        <th className="p-3 text-cyan-300">JK (J, K)</th>
                        <th className="p-3 text-emerald-300">D (D)</th>
                        <th className="p-3 text-purple-300">T (T)</th>
                        <th className="p-3">Physical State Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-300">
                      <tr className="hover:bg-slate-900/50">
                        <td className="p-3 font-bold text-white">0 &rarr; 0</td>
                        <td className="p-3 text-teal-300 font-semibold">S = 0, R = X</td>
                        <td className="p-3 text-cyan-300 font-bold">J = 0, K = X</td>
                        <td className="p-3 text-emerald-300 font-semibold">D = 0</td>
                        <td className="p-3 text-purple-300 font-semibold">T = 0</td>
                        <td className="p-3 text-slate-400">Hold (0) or Reset</td>
                      </tr>
                      <tr className="hover:bg-slate-900/50">
                        <td className="p-3 font-bold text-white">0 &rarr; 1</td>
                        <td className="p-3 text-teal-300 font-semibold">S = 1, R = 0</td>
                        <td className="p-3 text-cyan-300 font-bold">J = 1, K = X</td>
                        <td className="p-3 text-emerald-300 font-bold">D = 1</td>
                        <td className="p-3 text-purple-300 font-bold">T = 1</td>
                        <td className="p-3 text-emerald-300">Set (1) or Toggle</td>
                      </tr>
                      <tr className="hover:bg-slate-900/50">
                        <td className="p-3 font-bold text-white">1 &rarr; 0</td>
                        <td className="p-3 text-teal-300 font-semibold">S = 0, R = 1</td>
                        <td className="p-3 text-cyan-300 font-bold">J = X, K = 1</td>
                        <td className="p-3 text-emerald-300 font-semibold">D = 0</td>
                        <td className="p-3 text-purple-300 font-bold">T = 1</td>
                        <td className="p-3 text-rose-300">Reset (0) or Toggle</td>
                      </tr>
                      <tr className="hover:bg-slate-900/50">
                        <td className="p-3 font-bold text-white">1 &rarr; 1</td>
                        <td className="p-3 text-teal-300 font-semibold">S = X, R = 0</td>
                        <td className="p-3 text-cyan-300 font-bold">J = X, K = 0</td>
                        <td className="p-3 text-emerald-300 font-bold">D = 1</td>
                        <td className="p-3 text-purple-300 font-semibold">T = 0</td>
                        <td className="p-3 text-slate-400">Hold (1) or Set</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Characteristic Equations Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2 text-xs">
                  <div className="p-3 rounded-lg bg-teal-950/40 border border-teal-800/40 font-mono">
                    <strong className="text-teal-300 block mb-1">SR Equation:</strong>
                    Q(t+1) = S + R̄·Q<br />
                    <span className="text-slate-500 text-[10px]">(Constraint: S·R = 0)</span>
                  </div>
                  <div className="p-3 rounded-lg bg-cyan-950/40 border border-cyan-800/40 font-mono">
                    <strong className="text-cyan-300 block mb-1">JK Equation:</strong>
                    Q(t+1) = J·Q̄ + K̄·Q<br />
                    <span className="text-slate-500 text-[10px]">(Glitch-free Toggle)</span>
                  </div>
                  <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/40 font-mono">
                    <strong className="text-emerald-300 block mb-1">D Equation:</strong>
                    Q(t+1) = D<br />
                    <span className="text-slate-500 text-[10px]">(Direct Transparency)</span>
                  </div>
                  <div className="p-3 rounded-lg bg-purple-950/40 border border-purple-800/40 font-mono">
                    <strong className="text-purple-300 block mb-1">T Equation:</strong>
                    Q(t+1) = T ⊕ Q<br />
                    <span className="text-slate-500 text-[10px]">(Toggle Prescaling)</span>
                  </div>
                </div>
              </div>
            )}

            {/* ─── TAB 2: SR to JK Conversion Schematic ────────── */}
            {activeDiagramTab === "sr-to-jk-schematic" && (
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 block">
                  Detailed Hardware Schematic: Converting Available SR Flip-Flop to JK Flip-Flop
                </span>
                <p className="text-xs text-slate-300">
                  By using two 2-input AND gates feeding inputs <code className="text-teal-300 font-mono">S = J · Q̄</code> and <code className="text-rose-300 font-mono">R = K · Q</code>, the SR flip-flop operates with full toggle functionality and zero invalid states:
                </p>

                <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 overflow-x-auto">
                  <svg viewBox="0 0 920 280" className="w-full h-auto text-xs font-mono select-none">
                    {/* Target External Input J */}
                    <text x="30" y="75" fill="#14b8a6" fontWeight="bold" fontSize="14">Target Input J</text>
                    <line x1="160" y1="70" x2="280" y2="70" stroke="#14b8a6" strokeWidth="2.5" />
                    <circle cx="160" cy="70" r="4" fill="#14b8a6" />

                    {/* Target External Input K */}
                    <text x="30" y="205" fill="#f43f5e" fontWeight="bold" fontSize="14">Target Input K</text>
                    <line x1="160" y1="200" x2="280" y2="200" stroke="#f43f5e" strokeWidth="2.5" />
                    <circle cx="160" cy="200" r="4" fill="#f43f5e" />

                    {/* Combinational AND Gate 1 (Top) */}
                    <g transform="translate(280, 50)">
                      <path d="M 0,0 L 35,0 A 30,30 0 0,1 35,60 L 0,60 Z" fill="#1e293b" stroke="#14b8a6" strokeWidth="2" />
                      <text x="22" y="35" fill="#14b8a6" fontSize="11" textAnchor="middle">AND 1</text>
                    </g>

                    {/* Combinational AND Gate 2 (Bottom) */}
                    <g transform="translate(280, 180)">
                      <path d="M 0,0 L 35,0 A 30,30 0 0,1 35,60 L 0,60 Z" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                      <text x="22" y="35" fill="#f43f5e" fontSize="11" textAnchor="middle">AND 2</text>
                    </g>

                    {/* Intermediate S wire to SR FF */}
                    <line x1="345" y1="80" x2="520" y2="80" stroke="#10b981" strokeWidth="2.5" />
                    <polygon points="520,76 530,80 520,84" fill="#10b981" />
                    <text x="430" y="70" fill="#10b981" textAnchor="middle" fontWeight="bold">S = J · Q̄</text>

                    {/* Intermediate R wire to SR FF */}
                    <line x1="345" y1="210" x2="520" y2="210" stroke="#10b981" strokeWidth="2.5" />
                    <polygon points="520,206 530,210 520,214" fill="#10b981" />
                    <text x="430" y="225" fill="#10b981" textAnchor="middle" fontWeight="bold">R = K · Q</text>

                    {/* Available SR Flip-Flop Block */}
                    <rect x="530" y="40" width="200" height="190" rx="12" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
                    <text x="630" y="70" fill="#38bdf8" textAnchor="middle" fontWeight="bold" fontSize="15">AVAILABLE SR FF</text>
                    <text x="550" y="85" fill="#10b981" fontWeight="bold">S</text>
                    <text x="550" y="215" fill="#10b981" fontWeight="bold">R</text>
                    <text x="550" y="140" fill="#38bdf8" fontWeight="bold">&gt;CLK</text>

                    {/* Outputs */}
                    <line x1="730" y1="80" x2="840" y2="80" stroke="#22c55e" strokeWidth="3" />
                    <circle cx="780" cy="80" r="4" fill="#22c55e" />
                    <text x="850" y="85" fill="#22c55e" fontWeight="bold" fontSize="16">Q</text>

                    <line x1="730" y1="200" x2="840" y2="200" stroke="#a855f7" strokeWidth="3" />
                    <circle cx="780" cy="200" r="4" fill="#a855f7" />
                    <text x="850" y="205" fill="#a855f7" fontWeight="bold" fontSize="16">Q̄</text>

                    {/* Feedback Q to AND 2 */}
                    <polyline points="780,80 780,260 250,260 250,220 280,220" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="3 2" />

                    {/* Feedback Q_bar to AND 1 */}
                    <polyline points="780,200 780,20 250,20 250,90 280,90" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="3 2" />
                  </svg>
                </div>
              </div>
            )}

            {/* ─── TAB 3: JK to D and D to T Schematics ─────────── */}
            {activeDiagramTab === "jk-to-d-schematic" && (
              <div className="space-y-6">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 block">
                  Additional Conversions: JK &rarr; D (Inverter) and D &rarr; T (XOR Gate)
                </span>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* JK to D Conversion */}
                  <div className="rounded-xl border border-slate-800 bg-slate-950 p-5 space-y-3">
                    <span className="text-xs font-bold text-cyan-300 block">
                      A. JK &rarr; D Conversion (J = D, K = D̄)
                    </span>
                    <svg viewBox="0 0 400 160" className="w-full h-auto text-xs font-mono select-none">
                      {/* Input D */}
                      <text x="15" y="45" fill="#14b8a6" fontWeight="bold">Input D</text>
                      <circle cx="80" cy="40" r="3.5" fill="#14b8a6" />
                      <line x1="80" y1="40" x2="200" y2="40" stroke="#14b8a6" strokeWidth="2" />
                      <line x1="110" y1="40" x2="110" y2="110" stroke="#14b8a6" strokeWidth="2" />
                      
                      {/* Inverter */}
                      <polygon points="110,105 125,110 110,115" fill="#1e293b" stroke="#f43f5e" strokeWidth="1.5" />
                      <circle cx="128" cy="110" r="3" fill="#0f172a" stroke="#f43f5e" strokeWidth="1.5" />
                      <line x1="131" y1="110" x2="200" y2="110" stroke="#f43f5e" strokeWidth="2" />

                      {/* JK Box */}
                      <rect x="200" y="20" width="140" height="120" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                      <text x="270" y="45" fill="#38bdf8" textAnchor="middle" fontWeight="bold">JK FF</text>
                      <text x="210" y="45" fill="#14b8a6">J</text>
                      <text x="210" y="115" fill="#f43f5e">K</text>
                      <text x="210" y="80" fill="#cbd5e1">&gt;CLK</text>
                      
                      {/* Output Q */}
                      <line x1="340" y1="40" x2="380" y2="40" stroke="#22c55e" strokeWidth="2.5" />
                      <text x="385" y="45" fill="#22c55e" fontWeight="bold">Q</text>
                    </svg>
                  </div>

                  {/* D to T Conversion */}
                  <div className="rounded-xl border border-slate-800 bg-slate-950 p-5 space-y-3">
                    <span className="text-xs font-bold text-purple-300 block">
                      B. D &rarr; T Conversion (D = T ⊕ Q)
                    </span>
                    <svg viewBox="0 0 400 160" className="w-full h-auto text-xs font-mono select-none">
                      {/* Input T */}
                      <text x="15" y="45" fill="#a855f7" fontWeight="bold">Input T</text>
                      <circle cx="80" cy="40" r="3.5" fill="#a855f7" />
                      <line x1="80" y1="40" x2="130" y2="40" stroke="#a855f7" strokeWidth="2" />

                      {/* XOR Gate */}
                      <g transform="translate(130, 25)">
                        <path d="M 0,0 Q 20,15 0,30 Q 30,30 45,15 Q 30,0 0,0 Z" fill="#1e293b" stroke="#a855f7" strokeWidth="1.5" />
                      </g>
                      <line x1="175" y1="40" x2="220" y2="40" stroke="#10b981" strokeWidth="2" />
                      <text x="195" y="32" fill="#10b981" fontSize="9">D</text>

                      {/* D FF Box */}
                      <rect x="220" y="20" width="120" height="120" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                      <text x="280" y="45" fill="#10b981" textAnchor="middle" fontWeight="bold">D FF</text>
                      <text x="230" y="45" fill="#10b981">D</text>
                      <text x="230" y="80" fill="#cbd5e1">&gt;CLK</text>

                      {/* Output Q */}
                      <line x1="340" y1="40" x2="380" y2="40" stroke="#22c55e" strokeWidth="2.5" />
                      <circle cx="360" cy="40" r="3.5" fill="#22c55e" />
                      <text x="385" y="45" fill="#22c55e" fontWeight="bold">Q</text>

                      {/* Feedback Q to XOR */}
                      <polyline points="360,40 360,140 100,140 100,50 130,50" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="3 2" />
                    </svg>
                  </div>
                </div>
              </div>
            )}

            {/* ─── TAB 4: K-Map Derivation & Synthesis ─────────── */}
            {activeDiagramTab === "kmap-synthesis" && (
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 block">
                  K-Map Minimization for SR to JK Conversion: Grouping Don't-Cares (X)
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* K-Map for S Input */}
                  <div className="rounded-xl border border-slate-800 bg-slate-950 p-5 space-y-3">
                    <span className="text-xs font-bold text-teal-300 block">
                      1. K-Map for Available Input S (in terms of J, K, Q)
                    </span>
                    <div className="overflow-x-auto">
                      <table className="w-full text-center text-xs font-mono border-collapse">
                        <thead>
                          <tr className="border-b border-slate-800 text-slate-400">
                            <th className="p-2">J \ KQ</th>
                            <th className="p-2">00</th>
                            <th className="p-2">01</th>
                            <th className="p-2">11</th>
                            <th className="p-2">10</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800 text-slate-300">
                          <tr>
                            <td className="p-2 font-bold text-slate-400">0</td>
                            <td className="p-2 text-slate-500">0</td>
                            <td className="p-2 text-slate-500">0</td>
                            <td className="p-2 text-rose-400 font-bold">X</td>
                            <td className="p-2 text-rose-400 font-bold">X</td>
                          </tr>
                          <tr className="bg-teal-950/20">
                            <td className="p-2 font-bold text-slate-400">1</td>
                            <td className="p-2 text-emerald-400 font-bold">1</td>
                            <td className="p-2 text-slate-500">0</td>
                            <td className="p-2 text-rose-400 font-bold">X</td>
                            <td className="p-2 text-emerald-400 font-bold">1</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="p-2.5 rounded-lg bg-teal-950/40 border border-teal-800/40 text-xs font-mono text-teal-200">
                      <strong>Minimized Equation:</strong> S = J · Q̄
                    </div>
                  </div>

                  {/* K-Map for R Input */}
                  <div className="rounded-xl border border-slate-800 bg-slate-950 p-5 space-y-3">
                    <span className="text-xs font-bold text-rose-300 block">
                      2. K-Map for Available Input R (in terms of J, K, Q)
                    </span>
                    <div className="overflow-x-auto">
                      <table className="w-full text-center text-xs font-mono border-collapse">
                        <thead>
                          <tr className="border-b border-slate-800 text-slate-400">
                            <th className="p-2">J \ KQ</th>
                            <th className="p-2">00</th>
                            <th className="p-2">01</th>
                            <th className="p-2">11</th>
                            <th className="p-2">10</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800 text-slate-300">
                          <tr>
                            <td className="p-2 font-bold text-slate-400">0</td>
                            <td className="p-2 text-rose-400 font-bold">X</td>
                            <td className="p-2 text-slate-500">0</td>
                            <td className="p-2 text-emerald-400 font-bold">1</td>
                            <td className="p-2 text-slate-500">0</td>
                          </tr>
                          <tr className="bg-rose-950/20">
                            <td className="p-2 font-bold text-slate-400">1</td>
                            <td className="p-2 text-rose-400 font-bold">X</td>
                            <td className="p-2 text-slate-500">0</td>
                            <td className="p-2 text-emerald-400 font-bold">1</td>
                            <td className="p-2 text-slate-500">0</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="p-2.5 rounded-lg bg-rose-950/40 border border-rose-800/40 text-xs font-mono text-rose-200">
                      <strong>Minimized Equation:</strong> R = K · Q
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ─── 4. Live Interactive Synthesis & Circuit Probe Simulator ─ */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-emerald-400">⚡</span> Live Interactive Circuit Probe &amp; Excitation Workbench
          </h2>
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-8 shadow-2xl">
            
            {/* Tool 1: Real-time Excitation Lookup */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    1. Real-Time Transition Excitation Evaluator
                  </h3>
                  <p className="text-xs text-slate-400">
                    Click state buttons to evaluate required excitations across all 4 flip-flop families simultaneously
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setPresentQ(presentQ === 0 ? 1 : 0)}
                    className={clsx(
                      "px-4 py-2 rounded-xl text-xs font-mono font-bold border transition",
                      presentQ === 1 ? "bg-teal-900/80 border-teal-400 text-teal-200" : "bg-slate-950 border-slate-800 text-slate-400"
                    )}
                  &gt;
                    Present Q(t): {presentQ}
                  </button>

                  <span className="text-slate-500 font-bold">&rarr;</span>

                  <button
                    onClick={() => setNextQ(nextQ === 0 ? 1 : 0)}
                    className={clsx(
                      "px-4 py-2 rounded-xl text-xs font-mono font-bold border transition",
                      nextQ === 1 ? "bg-cyan-900/80 border-cyan-400 text-cyan-200" : "bg-slate-950 border-slate-800 text-slate-400"
                    )}
                  &gt;
                    Desired Next Q(t+1): {nextQ}
                  </button>
                </div>
              </div>

              {/* 4 Excitation Results */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-teal-500/40">
                  <span className="text-xs text-teal-400 block mb-1 font-bold">SR Flip-Flop</span>
                  <div className="text-2xl font-mono font-extrabold text-white mb-1">
                    S = {currentExcitations.sr.s} , R = {currentExcitations.sr.r}
                  </div>
                  <span className="text-xs text-slate-400">{currentExcitations.sr.desc}</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/40">
                  <span className="text-xs text-cyan-400 block mb-1 font-bold">JK Flip-Flop</span>
                  <div className="text-2xl font-mono font-extrabold text-white mb-1">
                    J = {currentExcitations.jk.j} , K = {currentExcitations.jk.k}
                  </div>
                  <span className="text-xs text-slate-400">{currentExcitations.jk.desc}</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/40">
                  <span className="text-xs text-emerald-400 block mb-1 font-bold">D Flip-Flop</span>
                  <div className="text-2xl font-mono font-extrabold text-white mb-1">
                    D = {currentExcitations.d.d}
                  </div>
                  <span className="text-xs text-slate-400">{currentExcitations.d.desc}</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-purple-500/40">
                  <span className="text-xs text-purple-400 block mb-1 font-bold">T Flip-Flop</span>
                  <div className="text-2xl font-mono font-extrabold text-white mb-1">
                    T = {currentExcitations.t.t}
                  </div>
                  <span className="text-xs text-slate-400">{currentExcitations.t.desc}</span>
                </div>
              </div>
            </div>

            {/* Tool 2: Live Hardware Circuit Probe Simulator */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    2. Live Hardware Circuit Probe &amp; Clock Execution
                  </h3>
                  <p className="text-xs text-slate-400">
                    Select a conversion circuit, toggle inputs, observe synthesized intermediate gate signals, and pulse the clock
                  </p>
                </div>

                {/* Circuit Selector */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: "sr-to-jk", label: "SR &rarr; JK" },
                    { id: "jk-to-d", label: "JK &rarr; D" },
                    { id: "sr-to-d", label: "SR &rarr; D" },
                    { id: "d-to-t", label: "D &rarr; T" }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedExample(item.id)}
                      className={clsx(
                        "px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition",
                        selectedExample === item.id
                          ? "bg-teal-900/80 border-teal-400 text-teal-200"
                          : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                      )}
                      dangerouslySetInnerHTML={{ __html: item.label }}
                    /&gt;
                  ))}
                </div>
              </div>

              {/* Interactive Signal Controls */}
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSimTargetInputs((prev) => ({ ...prev, in1: !prev.in1 }))}
                      className={clsx(
                        "px-4 py-2 rounded-xl text-xs font-mono font-bold border transition",
                        simTargetInputs.in1
                          ? "bg-teal-900/80 border-teal-400 text-teal-200"
                          : "bg-slate-900 border-slate-800 text-slate-500"
                      )}
                    >
                      {probed.inputLabel1}: {simTargetInputs.in1 ? "1" : "0"}
                    </button>

                    {probed.inputLabel2 !== "None (Single Input)" && (
                      <button
                        onClick={() => setSimTargetInputs((prev) => ({ ...prev, in2: !prev.in2 }))}
                        className={clsx(
                          "px-4 py-2 rounded-xl text-xs font-mono font-bold border transition",
                          simTargetInputs.in2
                            ? "bg-rose-900/80 border-rose-400 text-rose-200"
                            : "bg-slate-900 border-slate-800 text-slate-500"
                        )}
                      >
                        {probed.inputLabel2}: {simTargetInputs.in2 ? "1" : "0"}
                      </button>
                    )}
                  </div>

                  <button
                    onClick={triggerConversionClock}
                    className="px-5 py-2.5 rounded-xl text-xs font-mono font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-900/50 transition flex items-center gap-2"
                  >
                    <span>⏱️</span> PULSE CLOCK (↑)
                  </button>
                </div>

                {/* Circuit Probe Readouts */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
                  <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 font-mono">
                    <span className="text-[10px] text-slate-500 uppercase block mb-1">Synthesized Equations</span>
                    <strong className="text-xs text-cyan-300 block">{probed.formula}</strong>
                  </div>

                  <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 font-mono">
                    <span className="text-[10px] text-slate-500 uppercase block mb-1">Intermediate Probe 1</span>
                    <strong className="text-xs text-teal-300 block">{probed.probe1}</strong>
                  </div>

                  <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 font-mono">
                    <span className="text-[10px] text-slate-500 uppercase block mb-1">Intermediate Probe 2</span>
                    <strong className="text-xs text-rose-300 block">{probed.probe2}</strong>
                  </div>

                  <div className="p-3.5 rounded-lg bg-slate-900 border border-emerald-500/40 font-mono">
                    <span className="text-[10px] text-emerald-400 uppercase block mb-1">Current State Output</span>
                    <strong className="text-base text-white block">Q = {simStoredQ} (Q̄ = {simStoredQ === 0 ? 1 : 0})</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 5. Universal 5-Step Conversion Algorithm ───────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-amber-400">📋</span> The 5-Step Universal Flip-Flop Conversion Algorithm
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs font-mono">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="h-7 w-7 rounded-lg bg-teal-500/20 text-teal-400 font-bold flex items-center justify-center">1</div>
              <strong className="text-slate-100 block">Target Table</strong>
              <p className="text-slate-400 leading-relaxed">Write down the Characteristic Table of the Target Flip-Flop.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="h-7 w-7 rounded-lg bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center">2</div>
              <strong className="text-slate-100 block">Available Excitations</strong>
              <p className="text-slate-400 leading-relaxed">Append excitation columns of available flip-flop for each Q(t)&rarr;Q(t+1).</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="h-7 w-7 rounded-lg bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center">3</div>
              <strong className="text-slate-100 block">Plot K-Maps</strong>
              <p className="text-slate-400 leading-relaxed">Plot K-Maps for available inputs in terms of target inputs and Q.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="h-7 w-7 rounded-lg bg-purple-500/20 text-purple-400 font-bold flex items-center justify-center">4</div>
              <strong className="text-slate-100 block">Group 1s &amp; X</strong>
              <p className="text-slate-400 leading-relaxed">Leverage Don't-Cares (X) to group largest rectangular powers of 2.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="h-7 w-7 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center">5</div>
              <strong className="text-slate-100 block">Build Schematic</strong>
              <p className="text-slate-400 leading-relaxed">Draw combinational logic gates feeding available flip-flop inputs.</p>
            </div>
          </div>
        </section>

        {/* ─── 6. Real-World Engineering Scenarios ────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-amber-400">🏢</span> Real-World Engineering Scenarios (West Bengal Context)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-teal-950/60 border border-teal-800/60 text-teal-300">
                    BARRACKPORE INSTRUMENTATION LAB
                  </span>
                  <span className="text-xs text-slate-400">Eastern Railway</span>
                </div>
                <h3 className="text-base font-bold text-slate-100 mb-2">Retrofitting Legacy SR Chips into D-Registers</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Mamata needed to synthesize 8-bit synchronous data registers using existing warehouse stocks of 74LS279 SR latches. Using excitation conversion (S = D, R = D̄), she added inverters to transform all SR chips into transparent D-registers with 0 additional component purchase cost.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-teal-300">
                100% Inventory Reuse via Mathematical Synthesis
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-cyan-950/60 border border-cyan-800/60 text-cyan-300">
                    JADAVPUR ASIC DESIGN LAB
                  </span>
                  <span className="text-xs text-slate-400">Jadavpur University</span>
                </div>
                <h3 className="text-base font-bold text-slate-100 mb-2">Automated State Machine Synthesis</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Debangshu automated FPGA sequence detector compilation. By computing T flip-flop excitations (T = Q ⊕ Q_next), the synthesis tool generated 35% smaller routing footprints compared to direct unoptimized D flip-flop synthesis.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300">
                35% Smaller Silicon Footprint via Excitation Mapping
              </div>
            </div>
          </div>
        </section>

        {/* ─── 7. Senior Pitfalls & Best Practices ────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-rose-400">🛡️</span> Common Pitfalls &amp; Production Best Practices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-4">
              <h3 className="text-base font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span> Common Beginner Pitfalls
              </h3>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-rose-200 block mb-1">• Confusing Table Directions:</strong>
                Never try to synthesize a counter using a Characteristic Table. You MUST use Excitation Tables because your goal is determining required inputs from desired state transitions.
              </div>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-rose-200 block mb-1">• Ignoring Don't-Care Optimization:</strong>
                Forgetting to include Don't-Cares (X) in K-Maps results in overly complex combinational circuits with extra unnecessary gates!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 space-y-4">
              <h3 className="text-base font-bold text-emerald-300 flex items-center gap-2">
                <span>✓</span> Production Best Practices
              </h3>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-emerald-200 block mb-1">• Verify Invalid State Forbidden Clauses:</strong>
                When converting to SR flip-flops, always verify that your synthesized combinational expressions guarantee S · R = 0 under all input conditions.
              </div>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-emerald-200 block mb-1">• Use D Flip-Flops for FPGA RTL:</strong>
                FPGAs are fundamentally composed of D flip-flops; synthesizing other flip-flop types usually incurs extra LUT lookup logic overhead.
              </div>
            </div>
          </div>
        </section>

        {/* ─── 8. FAQ & Practice Questions ────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <FAQTemplate
            title="Characteristic vs Excitation Table FAQs"
            questions={questions}
            subtitle="Test your comprehension with 30 deep-dive questions"
            showPrint
            showExpandAll
            showSearch
            showProgress
          />
        </section>

        {/* ─── 9. Printable Plain Text Note ───────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <PlainTextPrint
            content={noteText}
            title="Characteristic vs Excitation Tables"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic12_note.txt"
          />
        </section>

        {/* ─── 10. Teacher's Note ─────────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <Teacher
            note={
              "In all semester and competitive GATE examinations at Barrackpore, sequential synthesis questions appear every single year. " +
              "Remember my Golden Mnemonic: For JK, J is '01XX' and K is 'XX10'. For T, it is simply XOR. " +
              "Master this 5-step algorithm and you will be able to convert any flip-flop in under 60 seconds!"
            }
          />
        </section>

        {/* ─── 11. Footer ─────────────────────────────────────── */}
        <footer className="max-w-5xl mx-auto pt-8 border-t border-slate-800 text-center text-xs text-slate-400">
          <span>
            Topic 12 · Characteristic vs Excitation Tables · Computer Architecture Masterclass · Coder &amp; AccoTax Barrackpore
          </span>
        </footer>
      </div>
    </>
  );
};

export default Topic12;
