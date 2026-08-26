import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

const Topic3 = () => {
  const [enInput, setEnInput] = useState(true);
  const [dInput, setDInput] = useState(false);
  const [qState, setQState] = useState(false);
  const [qBarState, setQBarState] = useState(true);
  const [activeDiagramTab, setActiveDiagramTab] = useState("nand-schematic");
  const sectionRefs = useRef([]);

  const dBar = !dInput;
  const sPrime = !(enInput && dInput);
  const rPrime = !(enInput && dBar);

  useEffect(() => {
    if (enInput) {
      setQState(dInput);
      setQBarState(!dInput);
    }
  }, [enInput, dInput]);

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
          <span>Computer Architecture Masterclass · Module 001_003 · Topic 3</span>
        </div>
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
          D Latch (4-NAND + Inverter Implementation &amp; Data Transparency)
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Master the transparent Data Latch. Understand how complementing the steering inputs eliminates invalid states and creates transparent temporary buffer memory.
        </p>
      </header>

      {/* ─── Diagrams ─── */}
      <section ref={addRef} className="max-w-5xl mx-auto mb-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-cyan-400">📐</span> Hardware Schematics &amp; Transparency Waveforms
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
              1. 4-NAND + Inverter Schematic
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
              2. Logic Symbol
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
              3. Transparency Waveforms
            </button>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl">
          {activeDiagramTab === "nand-schematic" && (
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400 block">
                Internal 4-NAND Gate + Inverter Circuit Schematic
              </span>
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 overflow-x-auto">
                <svg viewBox="0 0 940 340" className="w-full h-auto text-xs font-mono select-none">
                  {/* Pin D */}
                  <text x="25" y="65" fill="#14b8a6" fontWeight="bold" fontSize="14">D (Data)</text>
                  <circle cx="100" cy="60" r="4" fill="#14b8a6" />
                  <line x1="100" y1="60" x2="280" y2="60" stroke={dInput ? "#14b8a6" : "#475569"} strokeWidth="2.5" />

                  {/* D drop to inverter */}
                  <circle cx="170" cy="60" r="3.5" fill="#14b8a6" />
                  <line x1="170" y1="60" x2="170" y2="255" stroke={dInput ? "#14b8a6" : "#475569"} strokeWidth="2.5" />
                  <line x1="170" y1="255" x2="195" y2="255" stroke={dInput ? "#14b8a6" : "#475569"} strokeWidth="2.5" />

                  {/* Inverter */}
                  <polygon points="195,242 225,255 195,268" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                  <circle cx="230" cy="255" r="4" fill="#0f172a" stroke="#f43f5e" strokeWidth="2" />
                  <text x="207" y="259" fill="#f43f5e" fontSize="9" fontWeight="bold" textAnchor="middle">NOT</text>
                  <text x="210" y="285" fill={dBar ? "#f43f5e" : "#64748b"} fontSize="11" fontWeight="bold" textAnchor="middle">
                    D̄ = {dBar ? "1" : "0"}
                  </text>
                  <line x1="235" y1="255" x2="280" y2="255" stroke={dBar ? "#f43f5e" : "#475569"} strokeWidth="2.5" />

                  {/* Pin EN */}
                  <text x="20" y="160" fill="#38bdf8" fontWeight="bold" fontSize="14">EN (Enable)</text>
                  <circle cx="100" cy="155" r="4" fill="#38bdf8" />
                  <line x1="100" y1="155" x2="130" y2="155" stroke={enInput ? "#38bdf8" : "#475569"} strokeWidth="2.5" />
                  <circle cx="130" cy="155" r="3.5" fill="#38bdf8" />
                  <line x1="130" y1="155" x2="130" y2="85" stroke={enInput ? "#38bdf8" : "#475569"} strokeWidth="2.5" />
                  <line x1="130" y1="85" x2="280" y2="85" stroke={enInput ? "#38bdf8" : "#475569"} strokeWidth="2.5" />
                  <line x1="130" y1="155" x2="130" y2="225" stroke={enInput ? "#38bdf8" : "#475569"} strokeWidth="2.5" />
                  <line x1="130" y1="225" x2="280" y2="225" stroke={enInput ? "#38bdf8" : "#475569"} strokeWidth="2.5" />

                  {/* Steering NAND 1 */}
                  <g transform="translate(280, 45)">
                    <path d="M 0,0 L 35,0 A 30,30 0 0,1 35,60 L 0,60 Z" fill="#1e293b" stroke="#14b8a6" strokeWidth="2" />
                    <circle cx="70" cy="30" r="5" fill="#0f172a" stroke="#14b8a6" strokeWidth="2" />
                    <text x="22" y="35" fill="#94a3b8" fontSize="11" textAnchor="middle">NAND 1</text>
                  </g>

                  {/* Steering NAND 2 */}
                  <g transform="translate(280, 215)">
                    <path d="M 0,0 L 35,0 A 30,30 0 0,1 35,60 L 0,60 Z" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
                    <circle cx="70" cy="30" r="5" fill="#0f172a" stroke="#f43f5e" strokeWidth="2" />
                    <text x="22" y="35" fill="#94a3b8" fontSize="11" textAnchor="middle">NAND 2</text>
                  </g>

                  {/* S' and R' Wires */}
                  <line x1="355" y1="75" x2="560" y2="75" stroke={sPrime ? "#10b981" : "#e11d48"} strokeWidth="2.5" />
                  <text x="450" y="62" fill={sPrime ? "#10b981" : "#e11d48"} fontWeight="bold" textAnchor="middle">
                    S' = ~(D·EN) [{sPrime ? "1" : "0"}]
                  </text>

                  <line x1="355" y1="245" x2="560" y2="245" stroke={rPrime ? "#10b981" : "#e11d48"} strokeWidth="2.5" />
                  <text x="450" y="270" fill={rPrime ? "#10b981" : "#e11d48"} fontWeight="bold" textAnchor="middle">
                    R' = ~(D̄·EN) [{rPrime ? "1" : "0"}]
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

                  {/* Feedback Loops */}
                  <polyline points="720,75 720,130 490,175 490,225 560,225" fill="none" stroke={qState ? "#22c55e" : "#475569"} strokeWidth="2" strokeDasharray="4 2" />
                  <polyline points="700,245 700,190 510,145 510,95 560,95" fill="none" stroke={qBarState ? "#a855f7" : "#475569"} strokeWidth="2" strokeDasharray="4 2" />
                </svg>
              </div>
            </div>
          )}

          {activeDiagramTab === "block-diagram" && (
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 block">
                Standard D Latch Logic Symbol
              </span>
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 flex justify-center">
                <svg viewBox="0 0 500 220" className="w-full max-w-lg h-auto font-mono select-none">
                  <rect x="150" y="30" width="200" height="160" rx="12" fill="#0f172a" stroke="#14b8a6" strokeWidth="2.5" />
                  <text x="250" y="65" fill="#14b8a6" textAnchor="middle" fontWeight="bold" fontSize="16">D LATCH</text>
                  <line x1="80" y1="80" x2="150" y2="80" stroke="#14b8a6" strokeWidth="2.5" />
                  <text x="60" y="85" fill="#14b8a6" fontWeight="bold">D</text>
                  <line x1="80" y1="140" x2="150" y2="140" stroke="#38bdf8" strokeWidth="2.5" />
                  <text x="50" y="145" fill="#38bdf8" fontWeight="bold">EN</text>
                  <line x1="350" y1="80" x2="420" y2="80" stroke="#22c55e" strokeWidth="3" />
                  <text x="435" y="85" fill="#22c55e" fontWeight="bold" fontSize="16">Q</text>
                  <line x1="350" y1="140" x2="420" y2="140" stroke="#a855f7" strokeWidth="3" />
                  <text x="435" y="145" fill="#a855f7" fontWeight="bold" fontSize="16">Q̄</text>
                </svg>
              </div>
            </div>
          )}

          {activeDiagramTab === "timing-diagram" && (
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 block">
                Data Transparency Waveform
              </span>
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 overflow-x-auto">
                <svg viewBox="0 0 940 180" className="w-full h-auto text-xs font-mono select-none">
                  <text x="40" y="45" fill="#38bdf8" fontWeight="bold">EN (Enable)</text>
                  <polyline points="150,50 300,50 300,20 600,20 600,50 850,50" fill="none" stroke="#38bdf8" strokeWidth="2.5" />

                  <text x="40" y="95" fill="#14b8a6" fontWeight="bold">D (Data)</text>
                  <polyline points="150,100 200,100 200,70 450,70 450,100 700,100 700,70 850,70" fill="none" stroke="#14b8a6" strokeWidth="2.5" />

                  <text x="40" y="145" fill="#22c55e" fontWeight="bold">Q (Output)</text>
                  <polyline points="150,150 300,150 300,120 450,120 450,150 850,150" fill="none" stroke="#22c55e" strokeWidth="3" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ─── Simulator ─── */}
      <section ref={addRef} className="max-w-5xl mx-auto mb-16">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <span className="text-emerald-400">⚡</span> Live Interactive D Latch Simulator
        </h2>
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Toggle Inputs:</span>
            <div className="flex gap-3">
              <button
                onClick={() => setEnInput(!enInput)}
                className={clsx(
                  "px-4 py-2 rounded-xl text-xs font-mono font-bold border transition",
                  enInput ? "bg-cyan-900/80 border-cyan-400 text-cyan-200 shadow-lg shadow-cyan-950/50" : "bg-slate-950 border-slate-800 text-slate-500"
                )}
              >
                EN (Enable): {enInput ? "1 (TRANSPARENT)" : "0 (LOCKED)"}
              </button>
              <button
                onClick={() => setDInput(!dInput)}
                className={clsx(
                  "px-4 py-2 rounded-xl text-xs font-mono font-bold border transition",
                  dInput ? "bg-teal-900/80 border-teal-400 text-teal-200 shadow-lg shadow-teal-950/50" : "bg-slate-950 border-slate-800 text-slate-500"
                )}
              >
                D (Data Input): {dInput ? "1" : "0"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs text-slate-500 block mb-1">Inverted Data D̄</span>
              <div className="text-lg font-mono font-bold text-rose-300">D̄ = {dBar ? "1" : "0"}</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs text-slate-500 block mb-1">Latching Mode</span>
              <div className="text-lg font-mono font-bold text-cyan-300">{enInput ? "Transparent" : "Memory Hold"}</div>
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
        <FAQTemplate title="D Latch FAQs" questions={questions} />
      </section>

      <section ref={addRef} className="max-w-5xl mx-auto mb-16">
        <PlainTextPrint
          content={noteText}
          title="D Latch"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Note"
          downloadFileName="topic3_note.txt"
        />
      </section>

      <section ref={addRef} className="max-w-5xl mx-auto mb-16">
        <Teacher note="The D Latch is the foundation of all single-bit data registers. By ensuring D and D_bar are complementary, the forbidden state is permanently banished!" />
      </section>
    </div>
  );
};

export default Topic3;
