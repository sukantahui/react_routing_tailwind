import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

/**
 * Topic0 – Decimal, Binary, Octal, Hexadecimal conversions
 * Module: 001_001_number-systems-and-codes (Number Systems & Binary Codes)
 * Track: Computer Architecture – From Core Systems to Performance Engineering
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial component featuring
 *                        step-by-step radix conversions, visual bit-grouping engines,
 *                        live multi-base calculator, SVG hardware architectures,
 *                        real-world scenarios, and printable revision notes.
 */
const Topic0 = () => {
  const [activeDiagramTab, setActiveDiagramTab] = useState("tab1");
  const [inputValue, setInputValue] = useState("45");
  const [activePreset, setActivePreset] = useState(45);
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

  // Convert input value safely
  const parsedDec = parseInt(inputValue, 10);
  const isValidDec = !isNaN(parsedDec) && parsedDec >= 0 && parsedDec <= 65535;
  const numVal = isValidDec ? parsedDec : 0;

  const binStr = numVal.toString(2);
  const octStr = numVal.toString(8);
  const hexStr = numVal.toString(16).toUpperCase();
  const paddedBin8 = binStr.padStart(Math.ceil(binStr.length / 4) * 4 || 4, "0");

  const presets = [
    { label: "45 (Standard)", val: 45 },
    { label: "128 (Power of 2)", val: 128 },
    { label: "255 (Full Byte / 0xFF)", val: 255 },
    { label: "1000 (0x3E8)", val: 1000 },
    { label: "65535 (16-bit Max)", val: 65535 }
  ];

  const handleSelectPreset = (val) => {
    setActivePreset(val);
    setInputValue(val.toString());
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
            <span>Computer Architecture Masterclass · Module 001 · Topic 0</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Decimal, Binary, Octal &amp; Hexadecimal Conversions
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            The mathematical and electronic bedrock of digital computing. Discover why transistors enforce Binary, why humans think in Decimal, and how Octal and Hexadecimal serve as high-speed human-to-silicon bridges.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-teal-300">
              🔢 Radix &amp; Positional Weights
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-cyan-300">
              ➗ Successive Division &amp; Multiplication
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-indigo-300">
              📦 3-Bit &amp; 4-Bit Nibble Grouping
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-amber-300">
              💾 Memory Pointers &amp; OpCodes
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
                Teacher's Concept Breakdown: Why Computers Don't Use Base-10
              </h2>
              <p className="text-xs text-slate-400">
                Understanding radix systems from transistor physics to high-level memory architecture
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5 mb-2">
                  <span>💡</span> The Physical Transistor Reality
                </span>
                <p className="text-sm text-slate-200 leading-relaxed font-medium">
                  Humans count in <strong className="text-teal-300">Decimal (Base-10)</strong> because we have 10 fingers. But a computer's CPU is built from billions of microscopic silicon MOSFET transistors.
                </p>
                <div className="my-3 p-3 rounded-lg bg-teal-950/40 border border-teal-800/60 font-mono text-xs text-teal-200 text-center font-bold">
                  0V (Cutoff / Logic 0) &nbsp;⟷&nbsp; 1.2V / 3.3V (Saturation / Logic 1)
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Building hardware that distinguishes 10 different voltage levels reliably would require extreme precision and cause constant noise errors. Two discrete voltage states (ON/OFF) provide maximum electronic noise tolerance.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-teal-950/30 border border-teal-800/40 text-xs text-teal-200">
                🎯 <strong>Core Law:</strong> <em>"Binary is the language of physical silicon. Hexadecimal and Octal are the shorthand tools engineers use to read binary without losing their sanity!"</em>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-2">
                  <span>🏫</span> Positional Weight Formulation
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  In every positional number system with radix <span className="text-amber-300 font-mono">r</span>, any number is the sum of its digits multiplied by powers of the base:
                </p>
                <div className="my-2 p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-amber-300 text-center">
                  Value = d<sub>n-1</sub>·r<sup>n-1</sup> + ... + d<sub>1</sub>·r<sup>1</sup> + d<sub>0</sub>·r<sup>0</sup> + d<sub>-1</sub>·r<sup>-1</sup> + ...
                </div>
                <ul className="text-xs text-slate-400 mt-2 space-y-1.5">
                  <li><strong className="text-slate-200">Decimal (r=10):</strong> 0 to 9 &nbsp;[Weights: 1000, 100, 10, 1, 0.1, 0.01]</li>
                  <li><strong className="text-slate-200">Binary (r=2):</strong> 0 and 1 &nbsp;[Weights: 128, 64, 32, 16, 8, 4, 2, 1, 0.5, 0.25]</li>
                  <li><strong className="text-slate-200">Octal (r=8):</strong> 0 to 7 &nbsp;[Weights: 512, 64, 8, 1, 1/8] &nbsp;(1 Octal digit = 3 bits)</li>
                  <li><strong className="text-slate-200">Hex (r=16):</strong> 0-9, A-F &nbsp;[Weights: 4096, 256, 16, 1, 1/16] &nbsp;(1 Hex digit = 4 bits)</li>
                </ul>
              </div>
              <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-800/40 text-xs text-amber-200">
                ✨ <strong>Key Rule:</strong> In any base <em>r</em>, the largest single digit symbol is always <strong>r - 1</strong>.
              </div>
            </div>
          </div>
        </section>

        {/* ─── 3. Multi-Tabbed Schematic & Architectural Suite ── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-cyan-400">📐</span> Hardware Conversion Architecture &amp; Bit Grouping
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
                1. Successive Division Engine
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
                2. Direct Nibble / Octet Grouping
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
                3. 8-Bit Positional Weight Matrix
              </button>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-6 shadow-2xl">
            {activeDiagramTab === "tab1" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400">
                    Successive Radix Division (Integers) &amp; Multiplication (Fractions)
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">Integer: Read ↑ | Fraction: Read ↓</span>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 overflow-x-auto">
                  <svg viewBox="0 0 940 280" className="w-full h-auto text-xs font-mono select-none">
                    {/* Integer Engine */}
                    <rect x="30" y="25" width="410" height="230" rx="12" fill="#0f172a" stroke="#14b8a6" strokeWidth="2" />
                    <text x="235" y="55" fill="#5eead4" textAnchor="middle" fontWeight="bold" fontSize="14">Integer Conversion (Successive Division by r)</text>
                    
                    <rect x="50" y="75" width="370" height="35" rx="6" fill="#1e293b" stroke="#334155" />
                    <text x="65" y="98" fill="#e2e8f0" fontSize="12">45 ÷ 2 = 22 &nbsp; R = <tspan fill="#f59e0b" fontWeight="bold">1</tspan> &nbsp;(First Remainder = LSB / Unit Bit)</text>

                    <rect x="50" y="115" width="370" height="35" rx="6" fill="#1e293b" stroke="#334155" />
                    <text x="65" y="138" fill="#e2e8f0" fontSize="12">22 ÷ 2 = 11 &nbsp; R = <tspan fill="#f59e0b" fontWeight="bold">0</tspan> &nbsp; | &nbsp; 11 ÷ 2 = 5 &nbsp; R = <tspan fill="#f59e0b" fontWeight="bold">1</tspan></text>

                    <rect x="50" y="155" width="370" height="35" rx="6" fill="#1e293b" stroke="#334155" />
                    <text x="65" y="178" fill="#e2e8f0" fontSize="12">5 ÷ 2 = 2 &nbsp; R = <tspan fill="#f59e0b" fontWeight="bold">1</tspan> &nbsp; | &nbsp; 2 ÷ 2 = 1 &nbsp; R = <tspan fill="#f59e0b" fontWeight="bold">0</tspan></text>

                    <rect x="50" y="195" width="370" height="35" rx="6" fill="#1e293b" stroke="#14b8a6" />
                    <text x="65" y="218" fill="#5eead4" fontSize="12">1 ÷ 2 = 0 &nbsp; R = <tspan fill="#22c55e" fontWeight="bold">1</tspan> &nbsp;(Last Remainder = MSB)</text>

                    <line x1="435" y1="218" x2="435" y2="98" stroke="#22c55e" strokeWidth="2.5" markerEnd="url(#arrowUp)" />
                    <text x="350" y="250" fill="#22c55e" fontWeight="bold">Read Upward: (101101)₂</text>

                    {/* Fraction Engine */}
                    <rect x="490" y="25" width="420" height="230" rx="12" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                    <text x="700" y="55" fill="#7dd3fc" textAnchor="middle" fontWeight="bold" fontSize="14">Fraction Conversion (Successive Multiplication by r)</text>

                    <rect x="510" y="75" width="380" height="40" rx="6" fill="#1e293b" stroke="#0284c7" />
                    <text x="525" y="100" fill="#e2e8f0" fontSize="12">0.625 × 2 = <tspan fill="#22c55e" fontWeight="bold">1</tspan>.250 &nbsp;→ Integer Part = <tspan fill="#22c55e" fontWeight="bold">1</tspan> (MSB fraction)</text>

                    <rect x="510" y="125" width="380" height="40" rx="6" fill="#1e293b" stroke="#334155" />
                    <text x="525" y="150" fill="#e2e8f0" fontSize="12">0.250 × 2 = <tspan fill="#f59e0b" fontWeight="bold">0</tspan>.500 &nbsp;→ Integer Part = <tspan fill="#f59e0b" fontWeight="bold">0</tspan></text>

                    <rect x="510" y="175" width="380" height="40" rx="6" fill="#1e293b" stroke="#334155" />
                    <text x="525" y="200" fill="#e2e8f0" fontSize="12">0.500 × 2 = <tspan fill="#f59e0b" fontWeight="bold">1</tspan>.000 &nbsp;→ Integer Part = <tspan fill="#f59e0b" fontWeight="bold">1</tspan> (Fraction=0! Stop)</text>

                    <line x1="900" y1="100" x2="900" y2="200" stroke="#38bdf8" strokeWidth="2.5" />
                    <text x="630" y="245" fill="#38bdf8" fontWeight="bold">Read Downward: (0.101)₂</text>
                  </svg>
                </div>
              </div>
            )}

            {activeDiagramTab === "tab2" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                    Direct Power-of-2 Bit-Grouping Superhighway
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">Bypass Decimal completely!</span>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 overflow-x-auto">
                  <svg viewBox="0 0 940 240" className="w-full h-auto text-xs font-mono select-none">
                    {/* Top Binary Row */}
                    <text x="470" y="30" fill="#cbd5e1" textAnchor="middle" fontWeight="bold" fontSize="13">Raw 12-Bit Binary Stream: 1 1 0 1 0 1 1 0 1 1 1 1</text>
                    
                    {/* Hex grouping */}
                    <rect x="80" y="55" width="220" height="70" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                    <text x="190" y="80" fill="#38bdf8" textAnchor="middle" fontWeight="bold" fontSize="13">Nibble 1: [ 1 1 0 1 ]</text>
                    <text x="190" y="110" fill="#ffffff" textAnchor="middle" fontSize="18" fontWeight="bold">Hex: D (13)</text>

                    <rect x="360" y="55" width="220" height="70" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                    <text x="470" y="80" fill="#38bdf8" textAnchor="middle" fontWeight="bold" fontSize="13">Nibble 2: [ 0 1 1 0 ]</text>
                    <text x="470" y="110" fill="#ffffff" textAnchor="middle" fontSize="18" fontWeight="bold">Hex: 6</text>

                    <rect x="640" y="55" width="220" height="70" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                    <text x="750" y="80" fill="#38bdf8" textAnchor="middle" fontWeight="bold" fontSize="13">Nibble 3: [ 1 1 1 1 ]</text>
                    <text x="750" y="110" fill="#ffffff" textAnchor="middle" fontSize="18" fontWeight="bold">Hex: F (15)</text>

                    {/* Result banner */}
                    <rect x="80" y="150" width="780" height="60" rx="10" fill="#022c22" stroke="#10b981" strokeWidth="2" />
                    <text x="470" y="185" fill="#a7f3d0" textAnchor="middle" fontSize="15" fontWeight="bold">
                      (1101 0110 1111)₂ &nbsp;= &nbsp;0xD6F &nbsp;(Hexadecimal) &nbsp;= &nbsp;(6557)₈ &nbsp;(Octal: 110-101-101-111)
                    </text>
                  </svg>
                </div>
              </div>
            )}

            {activeDiagramTab === "tab3" && (
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 block">
                  8-Bit Unsigned Binary Positional Weight Matrix
                </span>
                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 overflow-x-auto">
                  <svg viewBox="0 0 940 220" className="w-full h-auto text-xs font-mono select-none">
                    <text x="470" y="30" fill="#38bdf8" textAnchor="middle" fontWeight="bold" fontSize="14">
                      8-Bit Byte (Bit 7 MSB to Bit 0 LSB)
                    </text>
                    {[-128, 64, 32, 16, 8, 4, 2, 1].map((_, i) => {
                      const power = 7 - i;
                      const weight = Math.pow(2, power);
                      return (
                        <g key={i} transform={`translate(${45 + i * 108}, 50)`}>
                          <rect width="96" height="110" rx="8" fill="#1e293b" stroke={i === 0 ? "#14b8a6" : "#38bdf8"} strokeWidth="1.5" />
                          <text x="48" y="25" fill="#94a3b8" textAnchor="middle" fontSize="11">Bit {power}</text>
                          <text x="48" y="55" fill="#38bdf8" textAnchor="middle" fontWeight="bold" fontSize="13">2^{power}</text>
                          <text x="48" y="90" fill="#ffffff" textAnchor="middle" fontWeight="bold" fontSize="16">{weight}</text>
                        </g>
                      );
                    })}
                    <text x="470" y="195" fill="#94a3b8" textAnchor="middle" fontSize="12">
                      Decimal Value = (b₇ × 128) + (b₆ × 64) + (b₅ × 32) + (b₄ × 16) + (b₃ × 8) + (b₂ × 4) + (b₁ × 2) + (b₀ × 1)
                    </text>
                  </svg>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ─── 4. Live Interactive Converter Simulator ─────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400">⚡</span> Live Multi-Base Conversion Workbench
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
            {/* Input Row */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Enter Decimal Integer (0 to 65,535):
              </label>
              <input
                type="number"
                min="0"
                max="65535"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  setActivePreset(null);
                }}
                className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-base text-teal-300 focus:outline-none focus:border-teal-500 transition"
              />
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                  Decimal (Base-10)
                </span>
                <p className="text-2xl font-bold text-white font-mono">{numVal}</p>
                <span className="text-[11px] text-slate-400">Human Standard</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-teal-500/40 space-y-1">
                <span className="text-[10px] font-mono uppercase text-teal-400 font-bold block">
                  Binary (Base-2)
                </span>
                <p className="text-xl font-bold text-teal-300 font-mono break-all">{binStr}</p>
                <span className="text-[11px] text-teal-400/80">Padded: {paddedBin8}</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-indigo-500/40 space-y-1">
                <span className="text-[10px] font-mono uppercase text-indigo-400 font-bold block">
                  Octal (Base-8)
                </span>
                <p className="text-2xl font-bold text-indigo-300 font-mono">{octStr}</p>
                <span className="text-[11px] text-slate-400">Prefix: 0o{octStr}</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/40 space-y-1">
                <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block">
                  Hexadecimal (Base-16)
                </span>
                <p className="text-2xl font-bold text-amber-300 font-mono">0x{hexStr}</p>
                <span className="text-[11px] text-slate-400">{Math.ceil(binStr.length / 4)} Nibble(s)</span>
              </div>
            </div>

            {/* Bit-Level Nibble Inspector */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider block">
                Hardware Nibble &amp; Bit Breakdown:
              </span>
              <div className="flex flex-wrap gap-2">
                {paddedBin8.match(/.{1,4}/g)?.map((nibble, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-900 border border-slate-700 font-mono text-center">
                    <span className="text-[10px] text-slate-400 block mb-1">Nibble {idx}</span>
                    <span className="text-sm font-bold text-teal-300 block">{nibble}</span>
                    <span className="text-xs font-bold text-amber-400 block mt-1">0x{parseInt(nibble, 2).toString(16).toUpperCase()}</span>
                  </div>
                ))}
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
                    BARRACKPORE CNC AUTOMATION
                  </span>
                  <span className="text-xs text-slate-400">Industrial Factory Floor</span>
                </div>
                <h3 className="text-base font-bold text-slate-100 mb-2">Microcontroller Register Masking</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Mamata programs 8-bit stepper motor drivers in Barrackpore. Writing <code className="text-teal-300 font-mono">PORTB = 0xF0</code> instantly activates the upper 4 actuator pins (11110000) in a single CPU clock cycle, replacing slow string commands.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-amber-300">
                0xF0 = 0b11110000 (Upper 4 pins HIGH, Lower 4 LOW)
              </div>
            </div>

            <div className="step-card p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-teal-950/60 border border-teal-800/60 text-teal-300">
                    JADAVPUR EMBEDDED LAB
                  </span>
                  <span className="text-xs text-slate-400">System Software &amp; OS</span>
                </div>
                <h3 className="text-base font-bold text-slate-100 mb-2">64-Bit Memory Pointer Inspection</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Debangshu debugs Linux kernel core dumps in Jadavpur. Memory addresses like <code className="text-teal-300 font-mono">0x7FFE_4A10_B2C0</code> allow immediate byte boundary verification, whereas a 64-bit binary string would be impossible to parse visually.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-teal-300">
                1 Hex Character = Exactly 4 Hardware Bus Address Lines
              </div>
            </div>

            <div className="step-card p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-cyan-950/60 border border-cyan-800/60 text-cyan-300">
                    ICHAPUR RAILWAY TELECOM
                  </span>
                  <span className="text-xs text-slate-400">Network Packet Protocol</span>
                </div>
                <h3 className="text-base font-bold text-slate-100 mb-2">Ethernet MAC &amp; Preamble Synchronization</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Susmita inspects Gigabit Ethernet packet frames with preamble byte <code className="text-cyan-300 font-mono">0xAA</code> (10101010), providing alternating square-wave voltage transitions to synchronize receiver clock PLLs.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300">
                0xAA = 10101010 &nbsp;(Perfect Clock Training Pattern)
              </div>
            </div>

            <div className="step-card p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-purple-950/60 border border-purple-800/60 text-purple-300">
                    KOLKATA GRAPHICS STUDIO
                  </span>
                  <span className="text-xs text-slate-400">GPU Framebuffer Rendering</span>
                </div>
                <h3 className="text-base font-bold text-slate-100 mb-2">24-Bit TrueColor RGB Channel Decoding</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  Mahima processes web assets where color <code className="text-purple-300 font-mono">#38BDF8</code> breaks down into Red=0x38 (56), Green=0xBD (189), and Blue=0xF8 (248), mapped directly into 32-bit GPU pixel shaders.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-purple-300">
                #38BDF8 = (R: 56, G: 189, B: 248, A: 255)
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
                <strong className="text-rose-200 block mb-1">• Inverting the Remainder Read Direction:</strong>
                When performing successive division, writing remainders top-down produces the reverse binary sequence. Always read <strong>bottom-up</strong> (last remainder is the MSB).
              </div>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-rose-200 block mb-1">• Incorrect Fractional Zero-Padding:</strong>
                Padding leading zeros on fractions (e.g. converting 0.1 to 0.0001) shifts the decimal value completely. Always pad <strong>trailing zeros</strong> for fractional bits.
              </div>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-rose-200 block mb-1">• Invalid Digits in Base Systems:</strong>
                Writing digit '8' or '9' in an octal number or '2' in a binary number throws instant syntax errors in compilers and assemblers.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 space-y-4">
              <h3 className="text-base font-bold text-emerald-300 flex items-center gap-2">
                <span>✓</span> Production Best Practices
              </h3>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-emerald-200 block mb-1">• Direct Binary Intermediate Highway:</strong>
                Never convert Octal to Hexadecimal through Decimal. Always use Binary (Octal 3-bit groups ⟷ Hex 4-bit nibbles) for instant, error-free conversion.
              </div>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-emerald-200 block mb-1">• Memorize Powers of 2 up to 2¹⁶:</strong>
                Professional engineers instantly know 2⁸=256, 2¹⁰=1024 (1 KB), 2¹⁶=65536 (64 KB), 2³²=4.29 Billion (4 GB).
              </div>
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong className="text-emerald-200 block mb-1">• Use Explicit Hex Literals in Low-Level Code:</strong>
                Write <code className="text-emerald-300 font-mono">0xFF</code> or <code className="text-emerald-300 font-mono">0x00FF</code> with clear byte padding so endianness and bit widths remain self-documenting.
              </div>
            </div>
          </div>
        </section>

        {/* ─── 7. Student Mini Checklist ───────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 md:p-8 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span>📋</span> Student Mastery Checklist (What You Must Remember)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-300">
              {[
                "I can write the positional value formula for any radix r.",
                "I know why computers use Binary (transistor voltage noise margins).",
                "I can perform successive division for integers (read bottom-up).",
                "I can perform successive multiplication for fractions (read top-down).",
                "I can group 3 binary bits into 1 octal digit directly.",
                "I can group 4 binary bits into 1 hexadecimal nibble directly.",
                "I know the hex symbols 10=A, 11=B, 12=C, 13=D, 14=E, 15=F.",
                "I understand why 0.1 decimal causes repeating binary fractions."
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
            title="Decimal, Binary, Octal & Hexadecimal Conversions FAQs"
            questions={questions}
            subtitle="Test your comprehension with 30 deep-dive questions and real-world scenarios"
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
            title="Decimal, Binary, Octal, Hexadecimal Conversions"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic 0 Study Note"
            downloadFileName="topic0_note.txt"
          />
        </section>

        {/* ─── 10. Teacher's Note ─────────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <Teacher
            note={
              "Mastering number systems is not just an academic exercise — it is how you talk directly to computer silicon. " +
              "When you look at a memory address like 0x7FFF or an Ethernet packet byte like 0xAA, you should see the physical bits and voltage levels behind it. " +
              "Remember the golden rule: never convert between Octal and Hexadecimal through Decimal. Always use Binary as your high-speed bridge!"
            }
          />
        </section>

        {/* ─── 11. Footer ─────────────────────────────────────── */}
        <footer className="max-w-5xl mx-auto pt-8 border-t border-slate-800 text-center text-xs text-slate-400">
          <span>
            Topic 0 · Decimal, Binary, Octal, Hexadecimal conversions · Computer Architecture Masterclass · Coder &amp; AccoTax Barrackpore
          </span>
        </footer>
      </div>
    </>
  );
};

export default Topic0;
