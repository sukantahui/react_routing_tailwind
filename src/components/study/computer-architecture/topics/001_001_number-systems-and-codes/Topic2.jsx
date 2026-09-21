import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

/**
 * Topic2 – Conversion from Decimal to Octal
 * Module: 001_001_number-systems-and-codes (Number Systems & Binary Codes)
 * Track: Computer Architecture – From Core Systems to Performance Engineering
 *
 * @component
 * @returns {JSX.Element} Interactive tutorial component featuring step-by-step
 *                        integer successive division by 8, fractional multiplication by 8,
 *                        live division-step generator, vector hardware schematics,
 *                        Unix permissions simulator, and printable revision notes.
 */
const Topic2 = () => {
  const [activeDiagramTab, setActiveDiagramTab] = useState("tab1");
  const [inputVal, setInputVal] = useState("359");
  const [activePreset, setActivePreset] = useState(359);
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
  const validNum = !isNaN(parsedNum) && parsedNum >= 0 && parsedNum <= 32767 ? parsedNum : 0;

  // Generate successive division by 8 steps dynamically
  const generateOctalDivisionSteps = (n) => {
    if (n === 0) return [{ quotient: 0, remainder: 0, bit: "LSD / MSD" }];
    const steps = [];
    let current = n;
    let index = 0;
    while (current > 0) {
      const q = Math.floor(current / 8);
      const r = current % 8;
      steps.push({
        step: index + 1,
        dividend: current,
        quotient: q,
        remainder: r,
        posWeight: Math.pow(8, index)
      });
      current = q;
      index++;
    }
    return steps;
  };

  const divisionSteps = generateOctalDivisionSteps(validNum);
  const octalOutput = validNum.toString(8);
  const binaryOutput = validNum.toString(2);

  const presets = [
    { label: "64 (8²)", val: 64 },
    { label: "100 (144₈)", val: 100 },
    { label: "255 (377₈)", val: 255 },
    { label: "359 (547₈)", val: 359 },
    { label: "512 (8³ / 1000₈)", val: 512 },
    { label: "4095 (7777₈)", val: 4095 }
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
            <span>Computer Architecture Masterclass · Module 001 · Topic 2</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Conversion from Decimal to Octal (Base-8)
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Understand the Base-8 positional radix system ($r=8$): Successive Division by 8, Fractional Multiplication, 3-bit Binary packaging, and real-world Linux permissions and radar transponder squawk codes.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-teal-300">
              ➗ Division by 8 (Remainders 0–7)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-cyan-300">
              📦 1 Octal Digit = 3 Binary Bits
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-indigo-300">
              🔒 Linux chmod 755 Permissions
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-amber-300">
              ✈️ Aviation Squawk Code Architecture
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
                Teacher's Concept Breakdown: The Power of Radix 8
              </h2>
              <p className="text-xs text-slate-400">
                Understanding why base-8 simplifies binary computing without complex division
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5 mb-2">
                  <span>➗</span> Successive Division by 8
                </span>
                <p className="text-sm text-slate-200 leading-relaxed font-medium">
                  In <strong className="text-teal-300">Base-8</strong>, every division step divides the decimal value by 8, generating remainders in the valid set [0, 1, 2, 3, 4, 5, 6, 7].
                </p>
                <div className="my-3 p-3 rounded-lg bg-teal-950/40 border border-teal-800/60 font-mono text-xs text-teal-200 text-center font-bold">
                  N = 8 · Q + R &nbsp;(0 ≤ R ≤ 7) &nbsp;→&nbsp; Read Remainders Bottom-Up
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>The 8-to-1 Rule:</strong> The remainder cannot exceed 7. If you ever obtain a remainder of 8 or 9, your division contains an arithmetic error!
                </p>
              </div>
              <div className="p-3 rounded-lg bg-teal-950/30 border border-teal-800/40 text-xs text-teal-200">
                🎯 <strong>Counting in Octal:</strong> 0, 1, 2, 3, 4, 5, 6, 7, <strong>10₈</strong> (=8₁₀), 11₈ (=9₁₀) ... 17₈ (=15₁₀), <strong>20₈</strong> (=16₁₀).
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-2">
                  <span>🚀</span> The 3-Bit Grouping Superhighway
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Because $8 = 2^3$, converting Decimal to Binary then grouping in sets of 3 gives Octal immediately without big division:
                </p>
                <div className="my-2 p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-amber-300 text-center">
                  359₁₀ = (101 100 111)₂ = (5 4 7)₈ = 547₈
                </div>
                <ul className="text-xs text-slate-400 mt-2 space-y-1.5">
                  <li><strong className="text-slate-200">Bit Triplet 1 (101):</strong> $4 + 0 + 1 = 5$ (MSD)</li>
                  <li><strong className="text-slate-200">Bit Triplet 2 (100):</strong> $4 + 0 + 0 = 4$</li>
                  <li><strong className="text-slate-200">Bit Triplet 3 (111):</strong> $4 + 2 + 1 = 7$ (LSD)</li>
                </ul>
              </div>
              <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-800/40 text-xs text-amber-200">
                ✨ <strong>Silicon History:</strong> Early supercomputers (CDC 6600, PDP-11) used 12-bit and 36-bit words based on octal architecture!
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
                1. Successive Division by 8 Ladder
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
                2. Powers-of-8 Weight Matrix
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
                3. Linux chmod 755 Permissions
              </button>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl">
            {activeDiagramTab === "tab1" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400">
                    Step-by-Step Division by 8 for Decimal 359
                  </span>
                  <span className="text-[11px] text-emerald-400 font-mono font-bold">Read Result: (547)₈ ↑</span>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 overflow-x-auto">
                  <svg viewBox="0 0 940 220" className="w-full h-auto text-xs font-mono select-none">
                    <rect x="40" y="20" width="860" height="35" rx="6" fill="#1e293b" stroke="#334155" />
                    <text x="120" y="42" fill="#38bdf8" fontWeight="bold">Step</text>
                    <text x="320" y="42" fill="#38bdf8" fontWeight="bold">Dividend ÷ 8 = Quotient</text>
                    <text x="560" y="42" fill="#38bdf8" fontWeight="bold">Remainder (Octal Digit)</text>
                    <text x="780" y="42" fill="#38bdf8" fontWeight="bold">Positional Weight (8^k)</text>

                    {[
                      { step: "Step 1", div: "359 ÷ 8 = 44", rem: "7", wt: "8⁰ = 1 (LSD - Units place)" },
                      { step: "Step 2", div: " 44 ÷ 8 =  5", rem: "4", wt: "8¹ = 8 (Eights place)" },
                      { step: "Step 3", div: "  5 ÷ 8 =  0", rem: "5", wt: "8² = 64 (Sixty-fours place / MSD)" }
                    ].map((row, idx) => (
                      <g key={idx} transform={`translate(0, ${65 + idx * 36})`}>
                        <rect x="40" y="0" width="860" height="30" rx="4" fill={idx % 2 === 0 ? "#0f172a" : "#1e293b"} />
                        <text x="120" y="20" fill="#94a3b8">{row.step}</text>
                        <text x="320" y="20" fill="#e2e8f0">{row.div}</text>
                        <text x="560" y="20" fill={row.rem === "7" ? "#22c55e" : "#f59e0b"} fontWeight="bold" fontSize="14">R = {row.rem}</text>
                        <text x="780" y="20" fill="#94a3b8">{row.wt}</text>
                      </g>
                    ))}

                    <line x1="880" y1="160" x2="880" y2="70" stroke="#22c55e" strokeWidth="3" markerEnd="url(#arrowUp)" />
                    <text x="730" y="195" fill="#22c55e" fontWeight="bold" fontSize="13">Read Bottom-Up: 5 4 7₈</text>
                  </svg>
                </div>
              </div>
            )}

            {activeDiagramTab === "tab2" && (
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 block">
                  Powers-of-8 Positional Weight Matrix
                </span>
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 overflow-x-auto">
                  <svg viewBox="0 0 940 220" className="w-full h-auto text-xs font-mono select-none">
                    <text x="470" y="30" fill="#38bdf8" textAnchor="middle" fontWeight="bold" fontSize="14">
                      Positional Value = d₃·8³ + d₂·8² + d₁·8¹ + d₀·8⁰
                    </text>
                    {[
                      { power: "8⁴", weight: "4096", hexEq: "0x1000", max: "d × 4096" },
                      { power: "8³", weight: "512",  hexEq: "0x200",  max: "d × 512" },
                      { power: "8²", weight: "64",   hexEq: "0x40",   max: "d × 64" },
                      { power: "8¹", weight: "8",    hexEq: "0x8",    max: "d × 8" },
                      { power: "8⁰", weight: "1",    hexEq: "0x1",    max: "d × 1" }
                    ].map((col, idx) => (
                      <g key={idx} transform={`translate(${70 + idx * 165}, 55)`}>
                        <rect width="140" height="110" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                        <text x="70" y="25" fill="#94a3b8" textAnchor="middle" fontSize="12">{col.power}</text>
                        <text x="70" y="58" fill="#ffffff" textAnchor="middle" fontWeight="bold" fontSize="18">{col.weight}</text>
                        <text x="70" y="90" fill="#38bdf8" textAnchor="middle" fontSize="11">{col.hexEq}</text>
                      </g>
                    ))}
                    <text x="470" y="195" fill="#94a3b8" textAnchor="middle" fontSize="12">
                      Example: (547)₈ = (5 × 64) + (4 × 8) + (7 × 1) = 320 + 32 + 7 = 359₁₀
                    </text>
                  </svg>
                </div>
              </div>
            )}

            {activeDiagramTab === "tab3" && (
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 block">
                  Unix chmod 755 File Permissions (3-Bit Octal Translation)
                </span>
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 overflow-x-auto">
                  <svg viewBox="0 0 940 220" className="w-full h-auto text-xs font-mono select-none">
                    {/* User */}
                    <rect x="80" y="40" width="240" height="120" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="200" y="65" fill="#6ee7b7" textAnchor="middle" fontWeight="bold" fontSize="14">Owner / User (7)</text>
                    <text x="200" y="95" fill="#ffffff" textAnchor="middle" fontSize="18" fontWeight="bold">r w x &nbsp;[ 1 1 1 ]₂</text>
                    <text x="200" y="130" fill="#a7f3d0" textAnchor="middle" fontSize="11">Read(4) + Write(2) + Exec(1) = 7</text>

                    {/* Group */}
                    <rect x="350" y="40" width="240" height="120" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                    <text x="470" y="65" fill="#7dd3fc" textAnchor="middle" fontWeight="bold" fontSize="14">Group (5)</text>
                    <text x="470" y="95" fill="#ffffff" textAnchor="middle" fontSize="18" fontWeight="bold">r - x &nbsp;[ 1 0 1 ]₂</text>
                    <text x="470" y="130" fill="#94a3b8" textAnchor="middle" fontSize="11">Read(4) + No-Write(0) + Exec(1) = 5</text>

                    {/* Others */}
                    <rect x="620" y="40" width="240" height="120" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                    <text x="740" y="65" fill="#7dd3fc" textAnchor="middle" fontWeight="bold" fontSize="14">Others / World (5)</text>
                    <text x="740" y="95" fill="#ffffff" textAnchor="middle" fontSize="18" fontWeight="bold">r - x &nbsp;[ 1 0 1 ]₂</text>
                    <text x="740" y="130" fill="#94a3b8" textAnchor="middle" fontSize="11">Read(4) + No-Write(0) + Exec(1) = 5</text>

                    <text x="470" y="195" fill="#fcd34d" textAnchor="middle" fontWeight="bold" fontSize="13">
                      chmod 755 script.sh &nbsp;⟷ &nbsp;Binary Mask: (111 101 101)₂ &nbsp;= &nbsp;Decimal 493₁₀
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
              <span className="text-emerald-400">⚡</span> Live Decimal to Octal Division Generator
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
                Enter Decimal Integer (0 to 32,767):
              </label>
              <input
                type="number"
                min="0"
                max="32767"
                value={inputVal}
                onChange={(e) => {
                  setInputVal(e.target.value);
                  setActivePreset(null);
                }}
                className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-base text-teal-300 focus:outline-none focus:border-teal-500 transition"
              />
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Input Decimal</span>
                <p className="text-2xl font-bold text-white font-mono mt-1">{validNum}₁₀</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-indigo-500/40">
                <span className="text-[10px] font-mono uppercase text-indigo-400 font-bold block">Octal Output</span>
                <p className="text-2xl font-bold text-indigo-300 font-mono mt-1">({octalOutput})₈</p>
                <span className="text-[10px] text-slate-400">C Literal: 0o{octalOutput}</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-teal-500/40">
                <span className="text-[10px] font-mono uppercase text-teal-400 font-bold block">3-Bit Binary Packaging</span>
                <p className="text-xl font-bold text-teal-300 font-mono mt-1 break-all">({binaryOutput})₂</p>
                <span className="text-[10px] text-slate-400">Hex: 0x{validNum.toString(16).toUpperCase()}</span>
              </div>
            </div>

            {/* Step-by-Step Division Table */}
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider block">
                Live Division by 8 Execution Trace:
              </span>
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-4">
                <table className="w-full text-left font-mono text-xs text-slate-300">
                  <thead>
                    <tr className="border-b border-slate-800 text-teal-400 pb-2">
                      <th className="pb-2">Step</th>
                      <th className="pb-2">Dividend</th>
                      <th className="pb-2">÷ 8 Operation</th>
                      <th className="pb-2">Quotient</th>
                      <th className="pb-2 text-indigo-400">Remainder (Octal Digit)</th>
                      <th className="pb-2">Positional Power</th>
                    </tr>
                  </thead>
                  <tbody>
                    {divisionSteps.map((s, idx) => (
                      <tr key={idx} className="border-b border-slate-900/80 hover:bg-slate-900/50 transition">
                        <td className="py-2 text-slate-500">{s.step}</td>
                        <td className="py-2 font-bold text-white">{s.dividend}</td>
                        <td className="py-2 text-slate-400">{s.dividend} ÷ 8</td>
                        <td className="py-2 text-teal-300 font-bold">{s.quotient}</td>
                        <td className="py-2 text-indigo-400 font-bold text-sm">{s.remainder}</td>
                        <td className="py-2 text-slate-400">
                          {idx === 0 ? "8⁰ = 1 (LSD)" : idx === divisionSteps.length - 1 ? `8^${idx} (MSD)` : `8^${idx}`}
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
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-indigo-950/60 border border-indigo-800/60 text-indigo-300">
                    KOLKATA LINUX INFRASTRUCTURE
                  </span>
                  <span className="text-xs text-slate-400">POSIX Security Layer</span>
                </div>
                <h3 className="text-base font-bold text-slate-100 mb-2">Automated Server File Permissions</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Mamata configures production NGINX reverse proxies in Kolkata. Writing <code className="text-teal-300 font-mono">chmod 755</code> sets user=rwx (7), group=r-x (5), other=r-x (5), preventing unauthorized code modifications.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-indigo-300">
                chmod 755 ⟷ (111 101 101)₂ ⟷ Decimal 493₁₀
              </div>
            </div>

            <div className="step-card p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-amber-950/60 border border-amber-800/60 text-amber-300">
                    BARRACKPORE AIR TRAFFIC CONTROL
                  </span>
                  <span className="text-xs text-slate-400">Secondary Surveillance Radar</span>
                </div>
                <h3 className="text-base font-bold text-slate-100 mb-2">Aviation Transponder Squawk Decoders</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Debangshu maintains radar transponder processors near Barrackpore airfield. Aircraft reply pulses transmit 12 bits decoded into 4 octal digits, such as emergency squawk <code className="text-amber-300 font-mono">7700₈</code>.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-amber-300">
                Squawk 7700₈ = (111 111 000 000)₂ = Decimal 4032₁₀
              </div>
            </div>

            <div className="step-card p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-teal-950/60 border border-teal-800/60 text-teal-300">
                    ICHAPUR DEFENSE ORDNANCE
                  </span>
                  <span className="text-xs text-slate-400">Legacy PDP-11 Automation</span>
                </div>
                <h3 className="text-base font-bold text-slate-100 mb-2">16-Bit Word Octal Memory Dumps</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Susmita inspects legacy CNC factory controllers where 16-bit register dumps are displayed as 6 octal digits (<code className="text-teal-300 font-mono">177777₈ = 65535₁₀</code>), grouping 1 top bit and five 3-bit triplets.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-teal-300">
                177777₈ = [1] [111] [111] [111] [111] [111]₂ = 65535₁₀
              </div>
            </div>

            <div className="step-card p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-purple-950/60 border border-purple-800/60 text-purple-300">
                    JADAVPUR UNIX KERNEL LAB
                  </span>
                  <span className="text-xs text-slate-400">System Call File Masks</span>
                </div>
                <h3 className="text-base font-bold text-slate-100 mb-2">C System Programming File Mode Creation</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Mahima invokes Linux system call <code className="text-purple-300 font-mono">open("log.txt", O_CREAT, 0644)</code>, using octal literal <code className="text-purple-300 font-mono">0644</code> for user=rw, group=r, other=r.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-purple-300">
                0644₈ = [110] [100] [100]₂ = Decimal 420₁₀
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
                <strong className="text-rose-200 block mb-1">• Including Illegal Digits 8 or 9:</strong>
                Base-8 only permits digits 0 through 7. Writing $85_8$ or $397_8$ is an invalid mathematical statement.
              </div>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-rose-200 block mb-1">• The C Leading-Zero Trap:</strong>
                In C, C++, and Python 2, writing `int x = 050;` assigns decimal value $40_{10}$ ($5 \\times 8$), NOT fifty!
              </div>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-rose-200 block mb-1">• Top-to-Bottom Remainder Reading:</strong>
                Never write remainders in forward order. The last division produces the Most Significant Octal Digit.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 space-y-4">
              <h3 className="text-base font-bold text-emerald-300 flex items-center gap-2">
                <span>✓</span> Production Best Practices
              </h3>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-emerald-200 block mb-1">• Use 3-Bit Binary as Intermediate Highway:</strong>
                Converting Decimal $\to$ Binary $\to$ 3-bit grouping $\to$ Octal is faster and eliminates multi-digit long division errors.
              </div>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-emerald-200 block mb-1">• Quick Verification with Powers of 8:</strong>
                Verify octal results by summing $d_2 \\times 64 + d_1 \\times 8 + d_0$ in seconds.
              </div>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-emerald-200 block mb-1">• Explicit Python 3 / Modern C Syntax:</strong>
                In modern code, use explicit prefix `0o755` instead of ambiguous legacy `0755`.
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
                "I know the valid digit symbols in Base-8 are 0, 1, 2, 3, 4, 5, 6, 7.",
                "I can perform successive division by 8 and read remainders bottom-up.",
                "I know how successive multiplication by 8 converts decimal fractions.",
                "I know that exactly 1 octal digit corresponds to 3 binary bits (2³ = 8).",
                "I can convert 359₁₀ to 547₈ and verify with 5×64 + 4×8 + 7.",
                "I understand how Linux chmod 755 maps to rwx r-x r-x binary permissions.",
                "I know why leading zero in C literals (e.g. 012) designates an octal number.",
                "I know the powers of 8: 8⁰=1, 8¹=8, 8²=64, 8³=512, 8⁴=4096."
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
            title="Conversion from Decimal to Octal FAQs"
            questions={questions}
            subtitle="Test your comprehension with 30 deep-dive questions and real-world octal challenges"
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
            title="Conversion from Decimal to Octal"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic 2 Study Note"
            downloadFileName="topic2_note.txt"
          />
        </section>

        {/* ─── 10. Teacher's Note ─────────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <Teacher
            note={
              "Octal is the elegant bridge between human-friendly base-10 and silicon base-2. " +
              "Whenever you work in Linux system administration with permissions like chmod 755 or 644, you are using the octal 3-bit packaging system. " +
              "Always remember: in base-8, after 7 comes 10₈ (which equals decimal 8). Master this and base-8 arithmetic will feel completely natural!"
            }
          />
        </section>

        {/* ─── 11. Footer ─────────────────────────────────────── */}
        <footer className="max-w-5xl mx-auto pt-8 border-t border-slate-800 text-center text-xs text-slate-400">
          <span>
            Topic 2 · Conversion from Decimal to Octal · Computer Architecture Masterclass · Coder &amp; AccoTax Barrackpore
          </span>
        </footer>
      </div>
    </>
  );
};

export default Topic2;
