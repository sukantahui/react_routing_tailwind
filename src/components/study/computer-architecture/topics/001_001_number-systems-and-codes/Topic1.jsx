import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

/**
 * Topic1 – Conversion from Decimal to Binary
 * Module: 001_001_number-systems-and-codes (Number Systems & Binary Codes)
 * Track: Computer Architecture – From Core Systems to Performance Engineering
 *
 * @component
 * @returns {JSX.Element} Interactive tutorial component featuring step-by-step
 *                        integer successive division, fractional multiplication,
 *                        live division-step generator, vector hardware schematics,
 *                        real-world engineering scenarios, and printable revision notes.
 */
const Topic1 = () => {
  const [activeDiagramTab, setActiveDiagramTab] = useState("tab1");
  const [inputVal, setInputVal] = useState("156");
  const [activePreset, setActivePreset] = useState(156);
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
      { threshold: 0.08 }
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

  const parsedNum = parseInt(inputVal, 10);
  const validNum = !isNaN(parsedNum) && parsedNum >= 0 && parsedNum <= 4095 ? parsedNum : 0;

  // Generate successive division steps dynamically
  const generateDivisionSteps = (n) => {
    if (n === 0) return [{ quotient: 0, remainder: 0, bit: "LSB / MSB" }];
    const steps = [];
    let current = n;
    let index = 0;
    while (current > 0) {
      const q = Math.floor(current / 2);
      const r = current % 2;
      steps.push({
        step: index + 1,
        dividend: current,
        quotient: q,
        remainder: r,
        bitPos: index
      });
      current = q;
      index++;
    }
    return steps;
  };

  const divisionSteps = generateDivisionSteps(validNum);
  const binaryOutput = validNum.toString(2);

  const presets = [
    { label: "13 (Classic 4-Bit)", val: 13 },
    { label: "45 (Standard)", val: 45 },
    { label: "156 (8-Bit Master)", val: 156 },
    { label: "255 (Full Byte)", val: 255 },
    { label: "1023 (10-Bit ADC)", val: 1023 }
  ];

  const handleSelectPreset = (val) => {
    setActivePreset(val);
    setInputVal(val.toString());
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
        .step-card {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .step-card:hover {
          transform: translateY(-2px);
        }
      `}</style>

      <div className="dark min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 md:p-12 font-sans selection:bg-teal-500/30 selection:text-teal-200">
        
        {/* ─── 1. Header Section ──────────────────────────────── */}
        <header ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-950/70 border border-teal-700/60 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-4 shadow-lg">
            <span>⚡</span>
            <span>Computer Architecture Masterclass · Module 001 · Topic 1</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Conversion from Decimal to Binary
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Master the core algorithms that transform base-10 numbers into silicon-compatible base-2 bit patterns: Integer Successive Division by 2, Power-of-2 Decomposition, and Fractional Successive Multiplication.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-teal-300">
              ➗ Successive Division (Read Bottom-Up)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-cyan-300">
              ⚖️ Power-of-2 Decomposition Shortcut
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-indigo-300">
              ✖️ Fractional Multiplication (Read Top-Down)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-amber-300">
              📡 ADC &amp; Sensor Calibration
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
                Teacher's Concept Breakdown: The Two Conversion Pathways
              </h2>
              <p className="text-xs text-slate-400">
                Algorithm 1: Division by 2 (Hardware/Software Standard) vs Algorithm 2: Power-of-2 Decomposition (Fast Mental Math)
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5 mb-2">
                  <span>➗</span> Algorithm A: Successive Division by 2
                </span>
                <p className="text-sm text-slate-200 leading-relaxed font-medium">
                  To convert any decimal integer <span className="text-teal-300 font-mono">N</span> to binary, repeatedly divide by 2 and collect the remainders (0 or 1).
                </p>
                <div className="my-3 p-3 rounded-lg bg-teal-950/40 border border-teal-800/60 font-mono text-xs text-teal-200 text-center font-bold">
                  N = 2 · Q + R &nbsp;→&nbsp; First R = LSB ($2^0$), &nbsp;Last R = MSB ($2^{k-1}$)
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>Crucial Rule:</strong> Always write the final binary answer by reading remainders in <strong>reverse order (bottom-up)</strong>, because the highest division quotient generates the most significant bit.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-teal-950/30 border border-teal-800/40 text-xs text-teal-200">
                🎯 <strong>Pro Shortcut:</strong> If a decimal number is <strong>Even</strong>, its binary ends in <strong>0</strong>. If it is <strong>Odd</strong>, its binary ends in <strong>1</strong>.
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-2">
                  <span>⚡</span> Algorithm B: Power-of-2 Decomposition
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  In practical programming and technical interviews, greedy subtraction of powers of 2 ($128, 64, 32, 16, 8, 4, 2, 1$) is 5x faster than paper division:
                </p>
                <div className="my-2 p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-amber-300 text-center">
                  Example: 156 = 128 (yes) + 16 (yes) + 8 (yes) + 4 (yes) = 10011100₂
                </div>
                <ul className="text-xs text-slate-400 mt-2 space-y-1.5">
                  <li><strong className="text-slate-200">Step 1:</strong> Find the largest power of 2 that fits into $N$ (e.g., $128 \le 156$). Place a '1' at bit 7.</li>
                  <li><strong className="text-slate-200">Step 2:</strong> Subtract ($156 - 128 = 28$). Check next powers ($64 \to 0$, $32 \to 0$, $16 \to 1$).</li>
                  <li><strong className="text-slate-200">Step 3:</strong> Repeat until remainder is 0. Fill remaining bits with '0'.</li>
                </ul>
              </div>
              <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-800/40 text-xs text-amber-200">
                ✨ <strong>Silicon Advantage:</strong> Fast bit-masking in firmware and driver development!
              </div>
            </div>
          </div>
        </section>

        {/* ─── 3. Multi-Tabbed Schematic & Architectural Suite ── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-cyan-400">📐</span> Hardware Conversion Schematics &amp; Flowcharts
            </h2>
            {/* Tab Selector */}
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1.5 rounded-xl">
              <button
                onClick={() => setActiveDiagramTab("tab1")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition",
                  activeDiagramTab === "tab1"
                    ? "bg-teal-900/80 border border-teal-500 text-teal-200 shadow"
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                1. Successive Division Ladder
              </button>
              <button
                onClick={() => setActiveDiagramTab("tab2")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition",
                  activeDiagramTab === "tab2"
                    ? "bg-teal-900/80 border border-teal-500 text-teal-200 shadow"
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                2. Power-of-2 Scale Decomposition
              </button>
              <button
                onClick={() => setActiveDiagramTab("tab3")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition",
                  activeDiagramTab === "tab3"
                    ? "bg-teal-900/80 border border-teal-500 text-teal-200 shadow"
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                3. Fractional Multiplication Engine
              </button>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl">
            {activeDiagramTab === "tab1" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400">
                    Step-by-Step Division Ladder for Decimal 156
                  </span>
                  <span className="text-[11px] text-emerald-400 font-mono font-bold">Read Result: (10011100)₂ ↑</span>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 overflow-x-auto">
                  <svg viewBox="0 0 940 300" className="w-full h-auto text-xs font-mono select-none">
                    {/* Header */}
                    <rect x="40" y="20" width="860" height="35" rx="6" fill="#1e293b" stroke="#334155" />
                    <text x="120" y="42" fill="#38bdf8" fontWeight="bold">Step / Divisor</text>
                    <text x="320" y="42" fill="#38bdf8" fontWeight="bold">Dividend ÷ 2 = Quotient</text>
                    <text x="560" y="42" fill="#38bdf8" fontWeight="bold">Remainder (Bit Value)</text>
                    <text x="780" y="42" fill="#38bdf8" fontWeight="bold">Significance / Weight</text>

                    {[
                      { step: "1", div: "156 ÷ 2 = 78", rem: "0", role: "Bit 0 (LSB - Units / 2⁰)" },
                      { step: "2", div: " 78 ÷ 2 = 39", rem: "0", role: "Bit 1 (2¹ = 2)" },
                      { step: "3", div: " 39 ÷ 2 = 19", rem: "1", role: "Bit 2 (2² = 4)" },
                      { step: "4", div: " 19 ÷ 2 =  9", rem: "1", role: "Bit 3 (2³ = 8)" },
                      { step: "5", div: "  9 ÷ 2 =  4", rem: "1", role: "Bit 4 (2⁴ = 16)" },
                      { step: "6", div: "  4 ÷ 2 =  2", rem: "0", role: "Bit 5 (2⁵ = 32)" },
                      { step: "7", div: "  2 ÷ 2 =  1", rem: "0", role: "Bit 6 (2⁶ = 64)" },
                      { step: "8", div: "  1 ÷ 2 =  0", rem: "1", role: "Bit 7 (MSB - Highest / 2⁷)" }
                    ].map((row, idx) => (
                      <g key={idx} transform={`translate(0, ${65 + idx * 26})`}>
                        <rect x="40" y="0" width="860" height="24" rx="4" fill={idx % 2 === 0 ? "#0f172a" : "#1e293b"} />
                        <text x="120" y="16" fill="#94a3b8">Step {row.step} (÷ 2)</text>
                        <text x="320" y="16" fill="#e2e8f0">{row.div}</text>
                        <text x="560" y="16" fill={row.rem === "1" ? "#22c55e" : "#f59e0b"} fontWeight="bold">R = {row.rem}</text>
                        <text x="780" y="16" fill="#94a3b8">{row.role}</text>
                      </g>
                    ))}

                    {/* Upward Arrow */}
                    <line x1="880" y1="260" x2="880" y2="75" stroke="#22c55e" strokeWidth="3" markerEnd="url(#arrowUp)" />
                    <text x="760" y="290" fill="#22c55e" fontWeight="bold" fontSize="13">Read Bottom-Up: 1 0 0 1 1 1 0 0₂</text>
                  </svg>
                </div>
              </div>
            )}

            {activeDiagramTab === "tab2" && (
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 block">
                  Power-of-2 Decomposition Architecture for Decimal 156
                </span>
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 overflow-x-auto">
                  <svg viewBox="0 0 940 220" className="w-full h-auto text-xs font-mono select-none">
                    <text x="470" y="30" fill="#38bdf8" textAnchor="middle" fontWeight="bold" fontSize="14">
                      Target Value = 156₁₀ (Active Powers Sum: 128 + 16 + 8 + 4 = 156)
                    </text>
                    {[
                      { power: "2⁷", weight: "128", active: true, bit: "1" },
                      { power: "2⁶", weight: "64",  active: false, bit: "0" },
                      { power: "2⁵", weight: "32",  active: false, bit: "0" },
                      { power: "2⁴", weight: "16",  active: true, bit: "1" },
                      { power: "2³", weight: "8",   active: true, bit: "1" },
                      { power: "2²", weight: "4",   active: true, bit: "1" },
                      { power: "2¹", weight: "2",   active: false, bit: "0" },
                      { power: "2⁰", weight: "1",   active: false, bit: "0" }
                    ].map((col, idx) => (
                      <g key={idx} transform={`translate(${45 + idx * 108}, 55)`}>
                        <rect
                          width="96"
                          height="105"
                          rx="8"
                          fill={col.active ? "#064e3b" : "#1e293b"}
                          stroke={col.active ? "#10b981" : "#334155"}
                          strokeWidth="2"
                        />
                        <text x="48" y="25" fill="#94a3b8" textAnchor="middle" fontSize="11">{col.power}</text>
                        <text x="48" y="55" fill={col.active ? "#6ee7b7" : "#64748b"} textAnchor="middle" fontWeight="bold" fontSize="14">
                          {col.weight}
                        </text>
                        <text x="48" y="90" fill={col.active ? "#22c55e" : "#f43f5e"} textAnchor="middle" fontWeight="bold" fontSize="18">
                          {col.bit}
                        </text>
                      </g>
                    ))}
                    <text x="470" y="195" fill="#a7f3d0" textAnchor="middle" fontSize="13" fontWeight="bold">
                      Binary Output: [ 1 0 0 1 1 1 0 0 ]₂ = 0x9C
                    </text>
                  </svg>
                </div>
              </div>
            )}

            {activeDiagramTab === "tab3" && (
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 block">
                  Fractional Multiplication Pipeline (0.8125₁₀ × 2)
                </span>
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 overflow-x-auto">
                  <svg viewBox="0 0 940 220" className="w-full h-auto text-xs font-mono select-none">
                    <rect x="50" y="25" width="840" height="40" rx="8" fill="#1e293b" stroke="#334155" />
                    <text x="120" y="50" fill="#38bdf8" fontWeight="bold">Iteration</text>
                    <text x="350" y="50" fill="#38bdf8" fontWeight="bold">Multiplication Step (F × 2)</text>
                    <text x="600" y="50" fill="#38bdf8" fontWeight="bold">Extracted Integer Carry</text>
                    <text x="800" y="50" fill="#38bdf8" fontWeight="bold">Remaining Fraction</text>

                    {[
                      { it: "1", mul: "0.8125 × 2 = 1.6250", carry: "1 (MSB, 2⁻¹)", rem: "0.6250" },
                      { it: "2", mul: "0.6250 × 2 = 1.2500", carry: "1 (2⁻²)", rem: "0.2500" },
                      { it: "3", mul: "0.2500 × 2 = 0.5000", carry: "0 (2⁻³)", rem: "0.5000" },
                      { it: "4", mul: "0.5000 × 2 = 1.0000", carry: "1 (LSB, 2⁻⁴)", rem: "0.0000 (Done!)" }
                    ].map((row, idx) => (
                      <g key={idx} transform={`translate(0, ${75 + idx * 30})`}>
                        <rect x="50" y="0" width="840" height="26" rx="4" fill={idx % 2 === 0 ? "#0f172a" : "#1e293b"} />
                        <text x="120" y="17" fill="#94a3b8">Step {row.it}</text>
                        <text x="350" y="17" fill="#e2e8f0">{row.mul}</text>
                        <text x="600" y="17" fill="#22c55e" fontWeight="bold">{row.carry}</text>
                        <text x="800" y="17" fill="#cbd5e1">{row.rem}</text>
                      </g>
                    ))}
                    <text x="470" y="210" fill="#38bdf8" textAnchor="middle" fontSize="13" fontWeight="bold">
                      Read Top-Down: (0.8125)₁₀ = (0.1101)₂
                    </text>
                  </svg>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ─── 4. Live Interactive Division Workbench ─────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400">⚡</span> Live Decimal to Binary Division Generator
            </h2>
            <div className="flex flex-wrap gap-2">
              {presets.map((p) => (
                <button
                  key={p.val}
                  onClick={() => handleSelectPreset(p.val)}
                  className={clsx(
                    "px-2.5 py-1 rounded-lg text-xs font-mono transition border",
                    activePreset === p.val
                      ? "bg-teal-900/70 border-teal-500 text-teal-200"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
                  )}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Enter any Decimal Integer (0 to 4095):
              </label>
              <input
                type="number"
                min="0"
                max="4095"
                value={inputVal}
                onChange={(e) => {
                  setInputVal(e.target.value);
                  setActivePreset(null);
                }}
                className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-base text-teal-300 focus:outline-none focus:border-teal-500 transition"
              />
            </div>

            {/* Live Result Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Input Decimal</span>
                <p className="text-2xl font-bold text-white font-mono mt-1">{validNum}₁₀</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-teal-500/40">
                <span className="text-[10px] font-mono uppercase text-teal-400 font-bold block">Binary Output</span>
                <p className="text-xl font-bold text-teal-300 font-mono mt-1 break-all">({binaryOutput})₂</p>
                <span className="text-[10px] text-slate-400">Total Bits: {binaryOutput.length}</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/40">
                <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block">Hex Compact Form</span>
                <p className="text-2xl font-bold text-amber-300 font-mono mt-1">0x{validNum.toString(16).toUpperCase()}</p>
                <span className="text-[10px] text-slate-400">Octal: 0o{validNum.toString(8)}</span>
              </div>
            </div>

            {/* Dynamic Step Table */}
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider block">
                Live Division Execution Trace:
              </span>
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-4">
                <table className="w-full text-left font-mono text-xs text-slate-300">
                  <thead>
                    <tr className="border-b border-slate-800 text-teal-400 pb-2">
                      <th className="pb-2">Step</th>
                      <th className="pb-2">Dividend</th>
                      <th className="pb-2">÷ 2 Operation</th>
                      <th className="pb-2">Quotient</th>
                      <th className="pb-2 text-amber-400">Remainder (Bit)</th>
                      <th className="pb-2">Position</th>
                    </tr>
                  </thead>
                  <tbody>
                    {divisionSteps.map((s, idx) => (
                      <tr key={idx} className="border-b border-slate-900/80 hover:bg-slate-900/50 transition">
                        <td className="py-2 text-slate-500">{s.step}</td>
                        <td className="py-2 font-bold text-white">{s.dividend}</td>
                        <td className="py-2 text-slate-400">{s.dividend} ÷ 2</td>
                        <td className="py-2 text-teal-300 font-bold">{s.quotient}</td>
                        <td className="py-2 text-amber-400 font-bold text-sm">{s.remainder}</td>
                        <td className="py-2 text-slate-400">
                          {idx === 0 ? "Bit 0 (LSB)" : idx === divisionSteps.length - 1 ? `Bit ${s.bitPos} (MSB)` : `Bit ${s.bitPos}`}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 5. Real-World Engineering Scenarios ────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-amber-400">🏢</span> Real-World Engineering Scenarios (West Bengal Industry Context)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="step-card p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-amber-950/60 border border-amber-800/60 text-amber-300">
                    BARRACKPORE THERMAL PLANT
                  </span>
                  <span className="text-xs text-slate-400">10-Bit ADC Calibration</span>
                </div>
                <h3 className="text-base font-bold text-slate-100 mb-2">Sensor Digitization to SPI Bus</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Mamata calibrates 10-bit boiler temperature transducers in Barrackpore. When the temperature reads <code className="text-teal-300 font-mono">750°C</code>, the hardware ADC converts it to <code className="text-teal-300 font-mono">1011101110₂</code> before serial transmission to the PLC controller.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-amber-300">
                750₁₀ = 512 + 128 + 64 + 32 + 8 + 4 + 2 = (1011101110)₂
              </div>
            </div>

            <div className="step-card p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-teal-950/60 border border-teal-800/60 text-teal-300">
                    KOLKATA DATA CENTER
                  </span>
                  <span className="text-xs text-slate-400">Network Token Bucket</span>
                </div>
                <h3 className="text-base font-bold text-slate-100 mb-2">Hardware Bandwidth Rate Limiters</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Debangshu configures 10 Gbps Ethernet switches in Kolkata. Rate limiting an enterprise link to <code className="text-teal-300 font-mono">200 Mbps</code> requires loading register <code className="text-teal-300 font-mono">11001000₂</code> into the token bucket countdown timer.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-teal-300">
                200₁₀ = 128 + 64 + 8 = (11001000)₂
              </div>
            </div>

            <div className="step-card p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-cyan-950/60 border border-cyan-800/60 text-cyan-300">
                    ICHAPUR CNC MACHINING
                  </span>
                  <span className="text-xs text-slate-400">Servo Motor Resolvers</span>
                </div>
                <h3 className="text-base font-bold text-slate-100 mb-2">High-Precision Fractional Angular Encoding</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Susmita programs CNC milling arms in Ichapur where rotary tool angles like <code className="text-cyan-300 font-mono">12.375°</code> are converted to fixed-point binary <code className="text-cyan-300 font-mono">1100.011₂</code> to command micro-stepper pulses.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300">
                12.375₁₀ = 1100₂ (Integer 12) + .011₂ (Fraction 3/8)
              </div>
            </div>

            <div className="step-card p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-purple-950/60 border border-purple-800/60 text-purple-300">
                    JADAVPUR VLSI RESEARCH
                  </span>
                  <span className="text-xs text-slate-400">Priority Encoder Design</span>
                </div>
                <h3 className="text-base font-bold text-slate-100 mb-2">Interrupt Request (IRQ) Vector Encoding</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Mahima synthesizes an 8-to-3 priority encoder in Verilog HDL. When hardware interrupt line 7 fires, the encoder outputs binary address <code className="text-purple-300 font-mono">111₂</code> directly onto the CPU datapath bus.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-purple-300">
                Line 7 active → Encoded Vector = (111)₂
              </div>
            </div>
          </div>
        </section>

        {/* ─── 6. Senior Pitfalls & Best Practices ────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-rose-400">🛡️</span> Common Pitfalls &amp; Professional Best Practices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-4">
              <h3 className="text-base font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span> Common Beginner Pitfalls
              </h3>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-rose-200 block mb-1">• Top-to-Bottom Remainder Reading:</strong>
                Writing down division remainders in the order they were produced generates the mirror image of the true binary number. Always read <strong>bottom-up</strong>.
              </div>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-rose-200 block mb-1">• Assuming All Fractions Terminate:</strong>
                Fractions like 0.1, 0.2, and 0.3 generate infinite repeating cycles in base-2. Expect finite bit precision and apply rounding rules.
              </div>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-rose-200 block mb-1">• Miscounting Consecutive 1s:</strong>
                Remember that $2^k - 1$ always yields $k$ consecutive 1s (e.g. $15 = 1111_2$, $31 = 11111_2$, $255 = 11111111_2$).
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 space-y-4">
              <h3 className="text-base font-bold text-emerald-300 flex items-center gap-2">
                <span>✓</span> Production Best Practices
              </h3>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-emerald-200 block mb-1">• Use Power-of-2 Decomposition for Verification:</strong>
                Always verify your division by summing active power-of-2 columns ($128 + 64 + 32 + 16 + 8 + 4 + 2 + 1$).
              </div>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-emerald-200 block mb-1">• Zero-Pad to Byte/Word Boundaries:</strong>
                In firmware and assembly, format 7-bit binary $1101001_2$ as a clean 8-bit byte $01101001_2$ to prevent bit misalignment in registers.
              </div>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-emerald-200 block mb-1">• Utilize Bit Shifts for ×2 and ÷2:</strong>
                In performance-critical C/C++ firmware, replace <code className="text-teal-300">x / 2</code> with <code className="text-teal-300">x &gt;&gt; 1</code> and <code className="text-teal-300">x * 2</code> with <code className="text-teal-300">x &lt;&lt; 1</code> for single-cycle execution.
              </div>
            </div>
          </div>
        </section>

        {/* ─── 7. Student Mini Checklist ───────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span>📋</span> Student Mastery Checklist
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-300">
              {[
                "I know that successive division remainders must be read bottom-up.",
                "I can convert integers using the Power-of-2 decomposition shortcut.",
                "I know how successive multiplication by 2 converts decimal fractions.",
                "I know why even numbers end in 0 and odd numbers end in 1 in binary.",
                "I can convert 255 to 11111111₂ and 1023 to 1111111111₂ instantly.",
                "I understand why 0.2₁₀ produces an infinite repeating binary pattern.",
                "I can pad leading zeros to align binary numbers to 8-bit byte boundaries.",
                "I know how bit shifts (<< 1 and >> 1) multiply and divide by 2."
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                  <span className="text-teal-400 font-bold">☑</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 8. FAQ & Practice Questions ────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <FAQTemplate
            title="Conversion from Decimal to Binary FAQs"
            questions={questions}
            subtitle="Test your comprehension with 30 deep-dive questions and real-world conversion challenges"
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
            title="Conversion from Decimal to Binary"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic 1 Study Note"
            downloadFileName="topic1_note.txt"
          />
        </section>

        {/* ─── 10. Teacher's Note ─────────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <Teacher
            note={
              "Decimal to Binary conversion is the heartbeat of digital computing. " +
              "Whenever you see a decimal number like 156, train your brain to see it as powers of 2: 128 + 16 + 8 + 4 = 10011100₂. " +
              "Once you can decompose numbers into binary powers on sight, hardware design, assembly language, and bitwise programming become effortless!"
            }
          />
        </section>

        {/* ─── 11. Footer ─────────────────────────────────────── */}
        <footer className="max-w-5xl mx-auto pt-8 border-t border-slate-800 text-center text-xs text-slate-400">
          <span>
            Topic 1 · Conversion from Decimal to Binary · Computer Architecture Masterclass · Coder &amp; AccoTax Barrackpore
          </span>
        </footer>
      </div>
    </>
  );
};

export default Topic1;
