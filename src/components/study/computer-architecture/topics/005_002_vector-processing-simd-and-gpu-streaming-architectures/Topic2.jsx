import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

/**
 * Topic2 – Vector Chaining: Pipeline Overlapping between Vector Multipliers and Adders
 * Module: 005_002_vector-processing-simd-and-gpu-streaming-architectures (Vector Processing, SIMD & GPU Streaming Architectures)
 * Track: Computer Architecture – From Core Systems to Performance Engineering
 *
 * @component
 * @returns {JSX.Element} Interactive tutorial component with multi-tabbed vector schematic suite,
 *                        live simulation workbench, real-world case studies, best practices, FAQs, and printable notes.
 */
const Topic2 = () => {
  const [activeDiagramTab, setActiveDiagramTab] = useState("tab1");
  const [simStep, setSimStep] = useState(1);
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const addRef = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
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
            <span>Computer Architecture Masterclass · Module 002 · Topic 2</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Vector Chaining: Pipeline Overlapping between Vector Multipliers and Adders
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Understand CPU SIMD vectorization (AVX-512), GPU SIMT architectures (CUDA/NVIDIA SMs), warp scheduling, and AI systolic arrays.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-teal-300">
              🔒 Hardware Circuit Schematic
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-cyan-300">
              ⏱️ Timing &amp; Invariants
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-indigo-300">
              🔄 State Transitions &amp; Buses
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-amber-300">
              💾 Production Silicon Synthesis
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
                Teacher's Concept Breakdown: Vector Chaining: Pipeline Overlapping between Vector Multipliers and Adders
              </h2>
              <p className="text-xs text-slate-400">
                Understanding computer architecture fundamentals and silicon-level mechanics from first principles
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5 mb-2">
                  <span>💡</span> Hardware Implementation Reality
                </span>
                <p className="text-sm text-slate-200 leading-relaxed font-medium">
                  In modern digital computer architectures, <strong className="text-teal-300">Vector Chaining: Pipeline Overlapping between Vector Multipliers and Adders</strong> coordinates data flow and signal synchronization across silicon buses and registers with deterministic propagation delays.
                </p>
                <div className="my-2 p-3 rounded-lg bg-teal-950/40 border border-teal-800/60 font-mono text-xs sm:text-sm text-teal-200 text-center font-bold">
                  Zero Glitch Architecture · Deterministic State Transitions
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  By adhering to strict setup/hold times and bus arbitration protocols, hardware guarantees exact execution semantics across millions of concurrent cycles.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-teal-950/30 border border-teal-800/40 text-xs text-teal-200">
                🎯 <strong>Teacher's Law:</strong> <em>"Hardware performance is the product of clean datapath layout, minimal critical path delay, and cache locality!"</em>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-2">
                  <span>🏫</span> Real-World Engineering Analogy
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Imagine an automated railway freight terminal in Barrackpore:
                </p>
                <ul className="text-xs text-slate-400 mt-2 space-y-2 list-disc list-inside">
                  <li>
                    <strong className="text-slate-200">Synchronized Routing:</strong> Trains are switched between parallel tracks strictly according to master clock signals.
                  </li>
                  <li>
                    <strong className="text-slate-200">Interlock Protection:</strong> Hardware lockouts prevent concurrent write conflicts and hazardous race conditions.
                  </li>
                </ul>
              </div>
              <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-800/40 text-xs text-amber-200">
                ✨ <strong>Silicon Advantage:</strong> High instruction throughput with 100% data integrity!
              </div>
            </div>
          </div>
        </section>

        {/* ─── 3. Multi-Tabbed Schematic & Architectural Suite ── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-cyan-400">📐</span> Hardware Schematics &amp; Timing Diagrams
            </h2>
            {/* Tab Selector */}
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1.5 rounded-xl">
              <button
                onClick={() => setActiveDiagramTab("tab1")}
                className={clsx(
                  "px-3 py-1 rounded-lg text-xs font-mono font-bold transition",
                  activeDiagramTab === "tab1"
                    ? "bg-teal-900/80 border border-teal-500 text-teal-200"
                    : "text-slate-400 hover:text-slate-200"
                )}
              &gt;
                1. Multi-Core SMP Topology & Shared L3
              </button>
              <button
                onClick={() => setActiveDiagramTab("tab2")}
                className={clsx(
                  "px-3 py-1 rounded-lg text-xs font-mono font-bold transition",
                  activeDiagramTab === "tab2"
                    ? "bg-teal-900/80 border border-teal-500 text-teal-200"
                    : "text-slate-400 hover:text-slate-200"
                )}
              &gt;
                2. MESI Cache Coherence Protocol FSM
              </button>
              <button
                onClick={() => setActiveDiagramTab("tab3")}
                className={clsx(
                  "px-3 py-1 rounded-lg text-xs font-mono font-bold transition",
                  activeDiagramTab === "tab3"
                    ? "bg-teal-900/80 border border-teal-500 text-teal-200"
                    : "text-slate-400 hover:text-slate-200"
                )}
              &gt;
                3. Vector SIMD & GPU Streaming Datapath
              </button>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl">
            {activeDiagramTab === "tab1" && (
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400 block">
                  1. Multi-Core SMP Topology & Shared L3
                </span>
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 overflow-x-auto">
                  
      <svg viewBox="0 0 940 300" className="w-full h-auto text-xs font-mono select-none">
        {[1, 2, 3, 4].map((core, i) => (
          <g key={i} transform={`translate(${40 + i * 220}, 30)`}>
            <rect width="190" height="140" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
            <text x="95" y="35" fill="#38bdf8" textAnchor="middle" fontWeight="bold" fontSize="14">CPU CORE {core}</text>
            <text x="95" y="65" fill="#ffffff" textAnchor="middle">Out-of-Order Engine</text>
            <text x="95" y="95" fill="#14b8a6" textAnchor="middle" fontSize="11">Private L1 (32KB) &amp; L2 (512KB)</text>
            <text x="95" y="120" fill="#a855f7" textAnchor="middle" fontSize="11">MESI State: [ {i === 0 ? "Modified" : "Shared"} ]</text>
            <line x1="95" y1="140" x2="95" y2="190" stroke="#f59e0b" strokeWidth="3" />
          </g>
        ))}
        {/* Coherent Interconnect Bus */}
        <rect x="40" y="190" width="850" height="80" rx="10" fill="#0f172a" stroke="#f59e0b" strokeWidth="2.5" />
        <text x="465" y="225" fill="#f59e0b" textAnchor="middle" fontWeight="bold" fontSize="15">COHERENT INTERCONNECT BUS &amp; SHARED L3 CACHE (32 MB)</text>
        <text x="465" y="255" fill="#cbd5e1" textAnchor="middle" fontSize="12">Snooping Protocol · BusRd / BusRdX Transactions · Zero Cache Stale Data</text>
      </svg>
                </div>
              </div>
            )}

            {activeDiagramTab === "tab2" && (
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 block">
                  2. MESI Cache Coherence Protocol FSM
                </span>
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 overflow-x-auto">
                  
      <svg viewBox="0 0 940 240" className="w-full h-auto text-xs font-mono select-none">
        <text x="470" y="30" fill="#f59e0b" textAnchor="middle" fontWeight="bold" fontSize="15">MESI Cache Coherence 4-State Finite State Machine</text>
        {[
          { name: "MODIFIED (M)", desc: "Exclusive, Dirty, Valid", color: "#f43f5e", x: 100 },
          { name: "EXCLUSIVE (E)", desc: "Clean, Single Copy", color: "#38bdf8", x: 320 },
          { name: "SHARED (S)", desc: "Clean, Multi Copies", color: "#22c55e", x: 540 },
          { name: "INVALID (I)", desc: "Stale / Not Cached", color: "#94a3b8", x: 760 }
        ].map((st, i) => (
          <g key={i} transform={`translate(${st.x}, 60)`}>
            <circle cx="60" cy="60" r="55" fill="#0f172a" stroke={st.color} strokeWidth="2.5" />
            <text x="60" y="55" fill={st.color} textAnchor="middle" fontWeight="bold" fontSize="11">{st.name.split(' ')[0]}</text>
            <text x="60" y="75" fill="#ffffff" textAnchor="middle" fontWeight="bold" fontSize="10">{st.desc}</text>
          </g>
        ))}
        <text x="470" y="210" fill="#94a3b8" textAnchor="middle" fontSize="11">Deterministic transition between Modified, Exclusive, Shared, and Invalid states</text>
      </svg>
                </div>
              </div>
            )}

            {activeDiagramTab === "tab3" && (
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 block">
                  3. Vector SIMD & GPU Streaming Datapath
                </span>
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 overflow-x-auto">
                  
      <svg viewBox="0 0 940 220" className="w-full h-auto text-xs font-mono select-none">
        <text x="470" y="30" fill="#22c55e" textAnchor="middle" fontWeight="bold" fontSize="14">512-Bit Vector SIMD &amp; GPU Streaming Multiprocessor (FMA)</text>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((lane, i) => (
          <g key={i} transform={`translate(${50 + i * 105}, 60)`}>
            <rect width="90" height="110" rx="8" fill="#1e293b" stroke="#22c55e" strokeWidth="2" />
            <text x="45" y="30" fill="#22c55e" textAnchor="middle" fontWeight="bold">Lane {i}</text>
            <text x="45" y="60" fill="#ffffff" textAnchor="middle" fontSize="11">64-Bit FMA</text>
            <text x="45" y="90" fill="#86efac" textAnchor="middle" fontSize="10">A[{i}]·B[{i}]+C[{i}]</text>
          </g>
        ))}
        <text x="470" y="205" fill="#94a3b8" textAnchor="middle" fontSize="11">8 Simultaneous Double-Precision Floating-Point Operations per Single Clock Cycle</text>
      </svg>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ─── 4. Live Interactive Simulator Workbench ─────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-emerald-400">⚡</span> Live Interactive Architecture Simulator: Vector Chaining: Pipeline Overlapping between Vector Multipliers and Adders
          </h2>
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl">
            
            <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Select Execution Phase / Clock Cycle:
              </span>
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((step) => (
                  <button
                    key={step}
                    onClick={() => setSimStep(step)}
                    className={clsx(
                      "px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold border transition",
                      simStep === step
                        ? "bg-teal-900/80 border-teal-500 text-teal-200 shadow-lg shadow-teal-950/50"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                    )}
                  &gt;
                    Phase {step}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-950 border border-teal-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-teal-950 text-teal-300 font-mono text-xs font-bold border border-teal-800">
                  EXECUTION PHASE {simStep} OF 4
                </span>
                <span className="text-xs text-slate-500 font-mono">Hardware State T+{simStep}</span>
              </div>
              <h3 className="text-base font-bold text-white">
                {simStep === 1 && "Phase 1: Signal Conditioning & Input Ingestion"}
                {simStep === 2 && "Phase 2: Datapath Decoding & Logic Evaluation"}
                {simStep === 3 && "Phase 3: State Storage & Memory Interface Strobe"}
                {simStep === 4 && "Phase 4: Output Stabilization & Verification"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {simStep === 1 && "Signals are ingested from input pins and stabilized against ground bounce and setup timing constraints."}
                {simStep === 2 && "Combinational logic gates and internal buses evaluate control lines to compute intermediate signals."}
                {simStep === 3 && "Bistable registers latch stable binary states on the active clock edge."}
                {simStep === 4 && "Outputs drive downstream data buses and status flags are committed cleanly."}
              </p>
            </div>
          </div>
        </section>

        {/* ─── 5. Real-World Engineering Scenarios ────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-amber-400">🏢</span> Real-World Engineering Scenarios (West Bengal Context)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-amber-950/60 border border-amber-800/60 text-amber-300">
                    BARRACKPORE AUTOMATION
                  </span>
                  <span className="text-xs text-slate-400">Barrackpore Hub</span>
                </div>
                <h3 className="text-base font-bold text-slate-100 mb-2">Industrial Real-Time Process Automation</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Mamata deployed high-reliability industrial controllers in Barrackpore. Implementing hardware synchronization eliminated race conditions across ₹45 Lakh automated assembly lines.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-amber-300">
                100% Deterministic SIL-4 Reliability
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-teal-950/60 border border-teal-800/60 text-teal-300">
                    JADAVPUR EMBEDDED LAB
                  </span>
                  <span className="text-xs text-slate-400">Jadavpur University</span>
                </div>
                <h3 className="text-base font-bold text-slate-100 mb-2">High-Speed Microprocessor Signal Routing</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Debangshu analyzed clock skew across 32-bit register buses on custom FPGA prototypes, ensuring setup and hold times were met at 200 MHz clock frequencies.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-teal-300">
                Sub-Nanosecond Clock Skew Precision
              </div>
            </div>
          </div>
        </section>

        {/* ─── 6. Senior Pitfalls & Best Practices ────────────── */}
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
                <strong className="text-rose-200 block mb-1">• Violating Setup and Hold Time Windows:</strong>
                Changing data inputs too close to the active clock edge traps the storage element in metastability, resulting in unpredictable output oscillations.
              </div>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-rose-200 block mb-1">• Uncontrolled Bus Contention:</strong>
                Enabling multiple tri-state drivers simultaneously causes high short-circuit currents and severe thermal stress on silicon chips.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 space-y-4">
              <h3 className="text-base font-bold text-emerald-300 flex items-center gap-2">
                <span>✓</span> Production Best Practices
              </h3>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-emerald-200 block mb-1">• Synchronous Reset Architectures:</strong>
                Always prefer synchronous reset lines over asynchronous resets to prevent spurious resets triggered by EMI noise spikes.
              </div>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-emerald-200 block mb-1">• Decoupling Capacitors &amp; Power Planes:</strong>
                Place 0.1 µF bypass capacitors adjacent to every IC power pin to suppress switching transients during high-frequency clock edges.
              </div>
            </div>
          </div>
        </section>

        {/* ─── 7. FAQ & Practice Questions ────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <FAQTemplate
            title="Vector Chaining: Pipeline Overlapping between Vector Multipliers and Adders FAQs"
            questions={questions}
            subtitle="Test your comprehension with 30 deep-dive questions"
            showPrint
            showExpandAll
            showSearch
            showProgress
          />
        </section>

        {/* ─── 8. Printable Plain Text Note ───────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <PlainTextPrint
            content={noteText}
            title="Vector Chaining: Pipeline Overlapping between Vector Multipliers and Adders"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic2_note.txt"
          />
        </section>

        {/* ─── 9. Teacher's Note ──────────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <Teacher
            note={
              "In computer architecture and digital systems engineering, hardware diagrams are the blueprints of truth. " +
              "Always trace signal paths from input pins through combinational logic and registers to output buses. When you can visualize the timing diagram in your mind, digital architecture becomes second nature!"
            }
          />
        </section>

        {/* ─── 10. Footer ─────────────────────────────────────── */}
        <footer className="max-w-5xl mx-auto pt-8 border-t border-slate-800 text-center text-xs text-slate-400">
          <span>
            Topic 2 · Vector Chaining: Pipeline Overlapping between Vector Multipliers and Adders · Computer Architecture Masterclass · Coder &amp; AccoTax Barrackpore
          </span>
        </footer>
      </div>
    </>
  );
};

export default Topic2;
