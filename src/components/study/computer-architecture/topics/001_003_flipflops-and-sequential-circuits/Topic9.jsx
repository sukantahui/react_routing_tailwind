import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic9_files/topic9_questions";
import noteText from "./topic9_files/topic9_note.txt?raw";

const Topic9 = () => {
  const [jInput, setJInput] = useState(true);
  const [kInput, setKInput] = useState(true);
  const [clk, setClk] = useState(false);
  const [qState, setQState] = useState(false);
  const [qBarState, setQBarState] = useState(true);
  const [activeDiagramTab, setActiveDiagramTab] = useState("nand-schematic");
  const sectionRefs = useRef([]);

  // Trigger Clock Edge (Positive Edge)
  const pulseClock = () => {
    setClk(true);
    setTimeout(() => {
      // Evaluate JK Flip-Flop Logic on Clock Transition
      if (jInput && kInput) {
        // Toggle
        setQState((prev) => !prev);
        setQBarState((prev) => !prev);
      } else if (jInput && !kInput) {
        setQState(true);
        setQBarState(false);
      } else if (!jInput && kInput) {
        setQState(false);
        setQBarState(true);
      }
      setClk(false);
    }, 300);
  };

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
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 md:p-12 font-sans selection:bg-teal-500/30 selection:text-teal-200">
      <header ref={addRef} className="max-w-5xl mx-auto mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-950/70 border border-teal-700/60 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-4 shadow-lg">
          <span>⚡</span>
          <span>Computer Architecture Masterclass · Module 001_003 · Topic 9</span>
        </div>
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
          JK Flip-Flop (NAND Implementation, Toggle Mode &amp; Race Prevention)
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Explore the universal JK Flip-Flop. Discover how 3-input steering NAND gates feed back complementary outputs to create toggle operations and eliminate invalid states.
        </p>
      </header>

      {/* ─── Multi-Diagrams ─── */}
      <section ref={addRef} className="max-w-5xl mx-auto mb-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-cyan-400">📐</span> Hardware Schematics &amp; Toggle Waveforms
          </h2>
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1.5 rounded-xl">
            <button
              onClick={() => setActiveDiagramTab("nand-schematic")}
              className={clsx(
                "px-3 py-1 rounded-lg text-xs font-mono font-bold transition",
                activeDiagramTab === "nand-schematic"
                  ? "bg-teal-900/80 border border-teal-500 text-teal-200"
                  : "text-slate-400 hover:text-slate-200"
              )}
            >
              1. 4-NAND Gate Schematic
            </button>
            <button
              onClick={() => setActiveDiagramTab("block-diagram")}
              className={clsx(
                "px-3 py-1 rounded-lg text-xs font-mono font-bold transition",
                activeDiagramTab === "block-diagram"
                  ? "bg-teal-900/80 border border-teal-500 text-teal-200"
                  : "text-slate-400 hover:text-slate-200"
              )}
            >
              2. IEEE Block Symbol
            </button>
            <button
              onClick={() => setActiveDiagramTab("timing-diagram")}
              className={clsx(
                "px-3 py-1 rounded-lg text-xs font-mono font-bold transition",
                activeDiagramTab === "timing-diagram"
                  ? "bg-teal-900/80 border border-teal-500 text-teal-200"
                  : "text-slate-400 hover:text-slate-200"
              )}
            >
              3. Toggle Waveforms
            </button>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl">
          {activeDiagramTab === "nand-schematic" && (
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400 block">
                Internal 4-NAND Gate Schematic (Two 3-Input Steering NANDs + Cross-Coupled Latch)
              </span>
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 overflow-x-auto">
                <svg viewBox="0 0 940 340" className="w-full h-auto text-xs font-mono select-none">
                  {/* Pin J */}
                  <text x="25" y="65" fill="#14b8a6" fontWeight="bold" fontSize="14">J (Set)</text>
                  <circle cx="100" cy="60" r="4" fill="#14b8a6" />
                  <line x1="100" y1="60" x2="280" y2="60" stroke={jInput ? "#14b8a6" : "#475569"} strokeWidth="2.5" />

                  {/* Pin CLK */}
                  <text x="20" y="160" fill="#38bdf8" fontWeight="bold" fontSize="14">CLK (Clock)</text>
                  <circle cx="100" cy="155" r="4" fill="#38bdf8" />
                  <line x1="100" y1="155" x2="130" y2="155" stroke={clk ? "#38bdf8" : "#475569"} strokeWidth="2.5" />
                  <circle cx="130" cy="155" r="3.5" fill="#38bdf8" />
                  <line x1="130" y1="155" x2="130" y2="80" stroke={clk ? "#38bdf8" : "#475569"} strokeWidth="2.5" />
                  <line x1="130" y1="80" x2="280" y2="80" stroke={clk ? "#38bdf8" : "#475569"} strokeWidth="2.5" />
                  <line x1="130" y1="155" x2="130" y2="230" stroke={clk ? "#38bdf8" : "#475569"} strokeWidth="2.5" />
                  <line x1="130" y1="230" x2="280" y2="230" stroke={clk ? "#38bdf8" : "#475569"} strokeWidth="2.5" />

                  {/* Pin K */}
                  <text x="25" y="260" fill="#f43f5e" fontWeight="bold" fontSize="14">K (Reset)</text>
                  <circle cx="100" cy="255" r="4" fill="#f43f5e" />
                  <line x1="100" y1="255" x2="280" y2="255" stroke={kInput ? "#f43f5e" : "#475569"} strokeWidth="2.5" />

                  {/* 3-Input Steering NAND 1 */}
                  <g transform="translate(280, 45)">
                    <path d="M 0,0 L 35,0 A 30,30 0 0,1 35,60 L 0,60 Z" fill="#1e293b" stroke="#14b8a6" strokeWidth="2" />
                    <circle cx="70" cy="30" r="5" fill="#0f172a" stroke="#14b8a6" strokeWidth="2" />
                    <text x="22" y="35" fill="#94a3b8" fontSize="11" textAnchor="middle">NAND 1</text>
                  </g>

                  {/* 3-Input Steering NAND 2 */}
                  <g transform="translate(280, 215)">
                    <path d="M 0,0 L 35,0 A 30,30 0 0,1 35,60 L 0,60 Z" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                    <circle cx="70" cy="30" r="5" fill="#0f172a" stroke="#f43f5e" strokeWidth="2" />
                    <text x="22" y="35" fill="#94a3b8" fontSize="11" textAnchor="middle">NAND 2</text>
                  </g>

                  {/* Wires to storage stage */}
                  <line x1="355" y1="75" x2="560" y2="75" stroke="#10b981" strokeWidth="2.5" />
                  <text x="450" y="62" fill="#10b981" fontWeight="bold" textAnchor="middle">
                    S' = ~(J·CLK·Q̄)
                  </text>

                  <line x1="355" y1="245" x2="560" y2="245" stroke="#10b981" strokeWidth="2.5" />
                  <text x="450" y="270" fill="#10b981" fontWeight="bold" textAnchor="middle">
                    R' = ~(K·CLK·Q)
                  </text>

                  {/* Storage NAND 3 */}
                  <g transform="translate(560, 45)">
                    <path d="M 0,0 L 35,0 A 30,30 0 0,1 35,60 L 0,60 Z" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                    <circle cx="70" cy="30" r="5" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                    <text x="22" y="35" fill="#94a3b8" fontSize="11" textAnchor="middle">NAND 3</text>
                  </g>

                  {/* Storage NAND 4 */}
                  <g transform="translate(560, 215)">
                    <path d="M 0,0 L 35,0 A 30,30 0 0,1 35,60 L 0,60 Z" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
                    <circle cx="70" cy="30" r="5" fill="#0f172a" stroke="#a855f7" strokeWidth="2" />
                    <text x="22" y="35" fill="#94a3b8" fontSize="11" textAnchor="middle">NAND 4</text>
                  </g>

                  {/* Output Q */}
                  <line x1="635" y1="75" x2="840" y2="75" stroke={qState ? "#22c55e" : "#64748b"} strokeWidth="3" />
                  <circle cx="720" cy="75" r="4" fill="#22c55e" />
                  <text x="855" y="80" fill={qState ? "#22c55e" : "#94a3b8"} fontSize="17" fontWeight="bold">
                    Q = {qState ? "1" : "0"}
                  </text>

                  {/* Output Q_bar */}
                  <line x1="635" y1="245" x2="840" y2="245" stroke={qBarState ? "#a855f7" : "#64748b"} strokeWidth="3" />
                  <circle cx="700" cy="245" r="4" fill="#a855f7" />
                  <text x="855" y="250" fill={qBarState ? "#a855f7" : "#94a3b8"} fontSize="17" fontWeight="bold">
                    Q̄ = {qBarState ? "1" : "0"}
                  </text>

                  {/* Feedback Q back to bottom steering gate NAND 2 */}
                  <polyline points="720,75 720,310 240,310 240,245 280,245" fill="none" stroke="#22c55e" strokeWidth="2" strokeDasharray="4 2" />

                  {/* Feedback Q_bar back to top steering gate NAND 1 */}
                  <polyline points="700,245 700,20 240,20 240,70 280,70" fill="none" stroke="#a855f7" strokeWidth="2" strokeDasharray="4 2" />

                  {/* Internal Latch Cross-Coupling */}
                  <polyline points="660,75 660,130 490,175 490,225 560,225" fill="none" stroke={qState ? "#22c55e" : "#475569"} strokeWidth="2" strokeDasharray="4 2" />
                  <polyline points="640,245 640,190 510,145 510,95 560,95" fill="none" stroke={qBarState ? "#a855f7" : "#475569"} strokeWidth="2" strokeDasharray="4 2" />
                </svg>
              </div>
            </div>
          )}

          {activeDiagramTab === "block-diagram" && (
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 block">
                IEEE Standard JK Flip-Flop Block Symbol
              </span>
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 flex justify-center">
                <svg viewBox="0 0 500 240" className="w-full max-w-lg h-auto font-mono select-none">
                  <rect x="150" y="30" width="200" height="180" rx="12" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
                  <text x="250" y="65" fill="#38bdf8" textAnchor="middle" fontWeight="bold" fontSize="16">JK FLIP-FLOP</text>
                  <line x1="80" y1="70" x2="150" y2="70" stroke="#14b8a6" strokeWidth="2.5" />
                  <text x="60" y="75" fill="#14b8a6" fontWeight="bold">J</text>
                  <line x1="80" y1="120" x2="150" y2="120" stroke="#38bdf8" strokeWidth="2.5" />
                  <polygon points="150,110 165,120 150,130" fill="#38bdf8" />
                  <text x="40" y="125" fill="#38bdf8" fontWeight="bold">&gt;CLK</text>
                  <line x1="80" y1="170" x2="150" y2="170" stroke="#f43f5e" strokeWidth="2.5" />
                  <text x="60" y="175" fill="#f43f5e" fontWeight="bold">K</text>
                  <line x1="350" y1="70" x2="420" y2="70" stroke="#22c55e" strokeWidth="3" />
                  <text x="435" y="75" fill="#22c55e" fontWeight="bold" fontSize="16">Q</text>
                  <line x1="350" y1="170" x2="420" y2="170" stroke="#a855f7" strokeWidth="3" />
                  <text x="435" y="175" fill="#a855f7" fontWeight="bold" fontSize="16">Q̄</text>
                </svg>
              </div>
            </div>
          )}

          {activeDiagramTab === "timing-diagram" && (
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 block">
                Toggle Mode Timing Waveform (J=1, K=1 Divide-by-2)
              </span>
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 overflow-x-auto">
                <svg viewBox="0 0 940 160" className="w-full h-auto text-xs font-mono select-none">
                  <text x="40" y="45" fill="#38bdf8" fontWeight="bold">CLK (Clock)</text>
                  <polyline points="150,50 200,50 200,20 250,20 250,50 300,50 300,20 350,20 350,50 400,50 400,20 450,20 450,50 500,50 500,20 550,20 550,50 600,50 600,20 650,20 650,50 700,50 700,20 750,20 750,50 800,50 800,20 850,20" fill="none" stroke="#38bdf8" strokeWidth="2.5" />

                  <text x="40" y="105" fill="#22c55e" fontWeight="bold">Q (Toggle f/2)</text>
                  <polyline points="150,110 200,110 200,80 300,80 300,110 400,110 400,80 500,80 500,110 600,110 600,80 700,80 700,110 800,110 800,80 850,80" fill="none" stroke="#22c55e" strokeWidth="3" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ─── Simulator ─── */}
      <section ref={addRef} className="max-w-5xl mx-auto mb-16">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <span className="text-emerald-400">⚡</span> Live Interactive JK Flip-Flop Simulator
        </h2>
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Toggle Inputs:</span>
            <div className="flex gap-3">
              <button
                onClick={() => setJInput(!jInput)}
                className={clsx(
                  "px-4 py-2 rounded-xl text-xs font-mono font-bold border transition",
                  jInput ? "bg-teal-900/80 border-teal-400 text-teal-200" : "bg-slate-950 border-slate-800 text-slate-500"
                )}
              >
                J: {jInput ? "1" : "0"}
              </button>
              <button
                onClick={() => setKInput(!kInput)}
                className={clsx(
                  "px-4 py-2 rounded-xl text-xs font-mono font-bold border transition",
                  kInput ? "bg-rose-900/80 border-rose-400 text-rose-200" : "bg-slate-950 border-slate-800 text-slate-500"
                )}
              >
                K: {kInput ? "1" : "0"}
              </button>
              <button
                onClick={pulseClock}
                className="px-5 py-2 rounded-xl text-xs font-mono font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-900/50 transition-all flex items-center gap-2"
              >
                <span>⏱️</span> PULSE CLOCK (↑)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs text-slate-500 block mb-1">Active Mode</span>
              <div className="text-lg font-mono font-bold text-teal-300">
                {jInput && kInput ? "TOGGLE (Q = Q̄)" : jInput && !kInput ? "SET (Q = 1)" : !jInput && kInput ? "RESET (Q = 0)" : "HOLD (Q = Q)"}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs text-slate-500 block mb-1">Clock State</span>
              <div className="text-lg font-mono font-bold text-cyan-300">{clk ? "EDGE ACTIVE (↑)" : "LOW (Idle)"}</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/40">
              <span className="text-xs text-emerald-400 block mb-1">Stored Q</span>
              <div className="text-2xl font-mono font-extrabold text-white">Q = {qState ? "1" : "0"}</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-purple-500/40">
              <span className="text-xs text-purple-400 block mb-1">Complement Q̄</span>
              <div className="text-2xl font-mono font-extrabold text-purple-300">Q̄ = {qBarState ? "1" : "0"}</div>
            </div>
          </div>
        </div>
      </section>

      <section ref={addRef} className="max-w-5xl mx-auto mb-16">
        <FAQTemplate title="JK Flip-Flop FAQs" questions={questions} />
      </section>

      <section ref={addRef} className="max-w-5xl mx-auto mb-16">
        <PlainTextPrint
          content={noteText}
          title="JK Flip-Flop"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Note"
          downloadFileName="topic9_note.txt"
        />
      </section>

      <section ref={addRef} className="max-w-5xl mx-auto mb-16">
        <Teacher note="The JK Flip-Flop is the workhorse of counter and frequency divider circuits. When J=1 and K=1, it divides input clock frequency cleanly by 2!" />
      </section>
    </div>
  );
};

export default Topic9;
