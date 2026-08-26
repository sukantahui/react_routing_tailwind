import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

const Topic2 = () => {
  const [enInput, setEnInput] = useState(true);
  const [sInput, setSInput] = useState(false);
  const [rInput, setRInput] = useState(false);
  const [qState, setQState] = useState(false);
  const [qBarState, setQBarState] = useState(true);
  const [isInvalid, setIsInvalid] = useState(false);
  const [activeDiagramTab, setActiveDiagramTab] = useState("nand-schematic");
  const sectionRefs = useRef([]);

  // Intermediate Steering Signals
  const sPrime = !(enInput && sInput);
  const rPrime = !(enInput && rInput);

  useEffect(() => {
    if (!enInput) {
      setIsInvalid(false);
      return; // Hold state when EN is low
    }
    if (sInput && rInput) {
      setIsInvalid(true);
      setQState(true);
      setQBarState(true);
    } else if (sInput && !rInput) {
      setIsInvalid(false);
      setQState(true);
      setQBarState(false);
    } else if (!sInput && rInput) {
      setIsInvalid(false);
      setQState(false);
      setQBarState(true);
    } else {
      setIsInvalid(false);
    }
  }, [enInput, sInput, rInput]);

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
          <span>Computer Architecture Masterclass · Module 001_003 · Topic 2</span>
        </div>
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
          Gated SR Latch (4-NAND Implementation &amp; Enable Control)
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Explore how adding an Enable (EN) gating stage to a cross-coupled NAND latch provides controlled level-sensitive data isolation and memory protection.
        </p>
      </header>

      {/* ─── Diagrams Section ─── */}
      <section ref={addRef} className="max-w-5xl mx-auto mb-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span className="text-cyan-400">📐</span> Hardware Schematics &amp; Level-Sensitive Timing
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
              2. Logic Block Symbol
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
              3. Level Timing Waveforms
            </button>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl">
          {activeDiagramTab === "nand-schematic" && (
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400 block">
                Full 4-NAND Gated SR Latch Gate-Level Schematic
              </span>
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 overflow-x-auto">
                <svg viewBox="0 0 940 340" className="w-full h-auto text-xs font-mono select-none">
                  {/* Pin S */}
                  <text x="25" y="65" fill="#14b8a6" fontWeight="bold" fontSize="14">S (Set)</text>
                  <circle cx="100" cy="60" r="4" fill="#14b8a6" />
                  <line x1="100" y1="60" x2="280" y2="60" stroke={sInput ? "#14b8a6" : "#475569"} strokeWidth="2.5" />

                  {/* Pin EN */}
                  <text x="20" y="160" fill="#38bdf8" fontWeight="bold" fontSize="14">EN (Enable)</text>
                  <circle cx="100" cy="155" r="4" fill="#38bdf8" />
                  <line x1="100" y1="155" x2="140" y2="155" stroke={enInput ? "#38bdf8" : "#475569"} strokeWidth="2.5" />
                  <circle cx="140" cy="155" r="3.5" fill="#38bdf8" />
                  <line x1="140" y1="155" x2="140" y2="85" stroke={enInput ? "#38bdf8" : "#475569"} strokeWidth="2.5" />
                  <line x1="140" y1="85" x2="280" y2="85" stroke={enInput ? "#38bdf8" : "#475569"} strokeWidth="2.5" />
                  <line x1="140" y1="155" x2="140" y2="225" stroke={enInput ? "#38bdf8" : "#475569"} strokeWidth="2.5" />
                  <line x1="140" y1="225" x2="280" y2="225" stroke={enInput ? "#38bdf8" : "#475569"} strokeWidth="2.5" />

                  {/* Pin R */}
                  <text x="25" y="260" fill="#f43f5e" fontWeight="bold" fontSize="14">R (Reset)</text>
                  <circle cx="100" cy="255" r="4" fill="#f43f5e" />
                  <line x1="100" y1="255" x2="280" y2="255" stroke={rInput ? "#f43f5e" : "#475569"} strokeWidth="2.5" />

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

                  {/* S' Wire */}
                  <line x1="355" y1="75" x2="560" y2="75" stroke={sPrime ? "#10b981" : "#e11d48"} strokeWidth="2.5" />
                  <text x="450" y="62" fill={sPrime ? "#10b981" : "#e11d48"} fontWeight="bold" textAnchor="middle">
                    S' = ~(S·EN) [{sPrime ? "1" : "0"}]
                  </text>

                  {/* R' Wire */}
                  <line x1="355" y1="245" x2="560" y2="245" stroke={rPrime ? "#10b981" : "#e11d48"} strokeWidth="2.5" />
                  <text x="450" y="270" fill={rPrime ? "#10b981" : "#e11d48"} fontWeight="bold" textAnchor="middle">
                    R' = ~(R·EN) [{rPrime ? "1" : "0"}]
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

                  {/* Feedback Q to NAND 4 */}
                  <polyline
                    points="720,75 720,130 490,175 490,225 560,225"
                    fill="none"
                    stroke={qState ? "#22c55e" : "#475569"}
                    strokeWidth="2"
                    strokeDasharray="4 2"
                  />

                  {/* Feedback Q_bar to NAND 3 */}
                  <polyline
                    points="700,245 700,190 510,145 510,95 560,95"
                    fill="none"
                    stroke={qBarState ? "#a855f7" : "#475569"}
                    strokeWidth="2"
                    strokeDasharray="4 2"
                  />
                </svg>
              </div>
            </div>
          )}

          {activeDiagramTab === "block-diagram" && (
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 block">
                Standard Logic Block Symbol
              </span>
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 flex justify-center">
                <svg viewBox="0 0 500 240" className="w-full max-w-lg h-auto font-mono select-none">
                  <rect x="150" y="30" width="200" height="180" rx="12" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
                  <text x="250" y="65" fill="#38bdf8" textAnchor="middle" fontWeight="bold" fontSize="16">GATED SR LATCH</text>
                  <line x1="80" y1="70" x2="150" y2="70" stroke="#14b8a6" strokeWidth="2.5" />
                  <text x="60" y="75" fill="#14b8a6" fontWeight="bold">S</text>
                  <line x1="80" y1="120" x2="150" y2="120" stroke="#38bdf8" strokeWidth="2.5" />
                  <text x="50" y="125" fill="#38bdf8" fontWeight="bold">EN</text>
                  <line x1="80" y1="170" x2="150" y2="170" stroke="#f43f5e" strokeWidth="2.5" />
                  <text x="60" y="175" fill="#f43f5e" fontWeight="bold">R</text>
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
                Level-Sensitive Timing Waveform
              </span>
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 overflow-x-auto">
                <svg viewBox="0 0 940 220" className="w-full h-auto text-xs font-mono select-none">
                  <text x="40" y="45" fill="#38bdf8" fontWeight="bold">EN (Clock)</text>
                  <polyline points="150,50 250,50 250,20 400,20 400,50 550,50 550,20 700,20 700,50 850,50" fill="none" stroke="#38bdf8" strokeWidth="2.5" />

                  <text x="40" y="95" fill="#14b8a6" fontWeight="bold">S (Set)</text>
                  <polyline points="150,100 280,100 280,70 380,70 380,100 850,100" fill="none" stroke="#14b8a6" strokeWidth="2.5" />

                  <text x="40" y="145" fill="#f43f5e" fontWeight="bold">R (Reset)</text>
                  <polyline points="150,150 580,150 580,120 680,120 680,150 850,150" fill="none" stroke="#f43f5e" strokeWidth="2.5" />

                  <text x="40" y="195" fill="#22c55e" fontWeight="bold">Q (Output)</text>
                  <polyline points="150,200 280,200 280,170 580,170 580,200 850,200" fill="none" stroke="#22c55e" strokeWidth="3" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ─── Simulator ─── */}
      <section ref={addRef} className="max-w-5xl mx-auto mb-16">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <span className="text-emerald-400">⚡</span> Live Interactive Gated SR Latch Simulator
        </h2>
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Toggle Inputs:</span>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setEnInput(!enInput)}
                className={clsx(
                  "px-4 py-2 rounded-xl text-xs font-mono font-bold border transition",
                  enInput ? "bg-cyan-900/80 border-cyan-400 text-cyan-200 shadow-lg shadow-cyan-950/50" : "bg-slate-950 border-slate-800 text-slate-500"
                )}
              >
                EN (Enable): {enInput ? "1 (ENABLED)" : "0 (LOCKED)"}
              </button>
              <button
                onClick={() => setSInput(!sInput)}
                className={clsx(
                  "px-4 py-2 rounded-xl text-xs font-mono font-bold border transition",
                  sInput ? "bg-teal-900/80 border-teal-400 text-teal-200 shadow-lg shadow-teal-950/50" : "bg-slate-950 border-slate-800 text-slate-500"
                )}
              >
                S (Set): {sInput ? "1" : "0"}
              </button>
              <button
                onClick={() => setRInput(!rInput)}
                className={clsx(
                  "px-4 py-2 rounded-xl text-xs font-mono font-bold border transition",
                  rInput ? "bg-rose-900/80 border-rose-400 text-rose-200 shadow-lg shadow-rose-950/50" : "bg-slate-950 border-slate-800 text-slate-500"
                )}
              >
                R (Reset): {rInput ? "1" : "0"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs text-slate-500 block mb-1">Steering S'</span>
              <div className="text-lg font-mono font-bold text-teal-300">S' = {sPrime ? "1" : "0"}</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs text-slate-500 block mb-1">Steering R'</span>
              <div className="text-lg font-mono font-bold text-rose-300">R' = {rPrime ? "1" : "0"}</div>
            </div>
            <div className={clsx("p-4 rounded-xl bg-slate-950 border transition", isInvalid ? "border-rose-500" : "border-emerald-500/40")}>
              <span className="text-xs text-emerald-400 block mb-1">Stored Q</span>
              <div className="text-2xl font-mono font-extrabold text-white">Q = {qState ? "1" : "0"}</div>
            </div>
            <div className={clsx("p-4 rounded-xl bg-slate-950 border transition", isInvalid ? "border-rose-500" : "border-purple-500/40")}>
              <span className="text-xs text-purple-400 block mb-1">Complement Q̄</span>
              <div className="text-2xl font-mono font-extrabold text-purple-300">Q̄ = {qBarState ? "1" : "0"}</div>
            </div>
          </div>

          {isInvalid && (
            <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-600 text-rose-200 text-xs sm:text-sm flex items-center gap-3 animate-pulse">
              <span className="text-2xl">⚠️</span>
              <div>
                <strong className="block text-rose-300 font-bold">FORBIDDEN STATE ACTIVE!</strong>
                When EN=1 and S=1, R=1, both outputs are forced to 1, violating complementary logic!
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ─── Support Sections ─── */}
      <section ref={addRef} className="max-w-5xl mx-auto mb-16">
        <FAQTemplate title="Gated SR Latch FAQs" questions={questions} />
      </section>

      <section ref={addRef} className="max-w-5xl mx-auto mb-16">
        <PlainTextPrint
          content={noteText}
          title="Gated SR Latch"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Note"
          downloadFileName="topic2_note.txt"
        />
      </section>

      <section ref={addRef} className="max-w-5xl mx-auto mb-16">
        <Teacher note="Gating an SR latch with an Enable signal gives you control over when data can enter the memory element. Always ensure S and R are never simultaneously asserted while Enable is high!" />
      </section>
    </div>
  );
};

export default Topic2;
