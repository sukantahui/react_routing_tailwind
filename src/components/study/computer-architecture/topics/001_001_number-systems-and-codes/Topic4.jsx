import React, { useState, useEffect, useRef, useMemo } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

/**
 * Topic4 – Unsigned vs Signed number representation
 * Module: 001_001_number-systems-and-codes (Number Systems & Binary Codes)
 * Track: Computer Architecture – From Core Systems to Performance Engineering
 */
const Topic4 = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [bits, setBits] = useState([1, 1, 1, 1, 1, 1, 1, 1]); // default 0xFF = 255 or -1
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

  const toggleBit = (index) => {
    const newBits = [...bits];
    newBits[index] = newBits[index] === 1 ? 0 : 1;
    setBits(newBits);
  };

  // Interpretations
  const interpretations = useMemo(() => {
    const bitString = bits.join("");
    const msb = bits[0];

    // 1. Unsigned: Sum of bit * 2^(7-i)
    let unsignedVal = 0;
    for (let i = 0; i < 8; i++) {
      unsignedVal += bits[i] * Math.pow(2, 7 - i);
    }

    // 2. Signed 2's Complement: -msb * 128 + sum of others
    let signed2sVal = -msb * 128;
    for (let i = 1; i < 8; i++) {
      signed2sVal += bits[i] * Math.pow(2, 7 - i);
    }

    // 3. Sign-Magnitude: MSB is sign, bits 1..7 are magnitude
    let signMagVal = 0;
    for (let i = 1; i < 8; i++) {
      signMagVal += bits[i] * Math.pow(2, 7 - i);
    }
    const signMagDisplay = msb === 1 ? (signMagVal === 0 ? "-0" : `-${signMagVal}`) : `+${signMagVal}`;

    // 4. 1's Complement
    let onesCompDisplay = "";
    if (msb === 0) {
      onesCompDisplay = `+${unsignedVal}`;
    } else {
      let invertedVal = 0;
      for (let i = 1; i < 8; i++) {
        const invertedBit = bits[i] === 1 ? 0 : 1;
        invertedVal += invertedBit * Math.pow(2, 7 - i);
      }
      onesCompDisplay = invertedVal === 0 ? "-0" : `-${invertedVal}`;
    }

    const hexString = "0x" + unsignedVal.toString(16).toUpperCase().padStart(2, "0");

    return {
      bitString,
      msb,
      unsignedVal,
      signed2sVal,
      signMagDisplay,
      onesCompDisplay,
      hexString
    };
  }, [bits]);

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
            <span>Computer Architecture Masterclass · Module 001 · Topic 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight mb-4">
            Unsigned vs Signed Number Representation
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Understand how identical physical voltages in CPU registers are decoded as positive magnitudes or signed quantities, examine range formulas, and prevent silent casting bugs.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-teal-300">
              📊 Dynamic Ranges [0, 2ⁿ-1] vs [-2ⁿ⁻¹, +2ⁿ⁻¹-1]
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-cyan-300">
              🏷️ MSB Sign Bit Interpretation
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-indigo-300">
              🔄 Dual Decoding of Same Bit Pattern
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-amber-300">
              🛡️ C/C++ Casting &amp; Sign Extension Safety
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
              <h2 className="text-lg md:text-xl font-bold text-teal-300">
                Classroom Lecture: The Agnostic Silicon Principle
              </h2>
              <p className="text-xs text-slate-400">
                Sukanta Hui · Coder &amp; AccoTax · Shibtala Road, Barrackpore
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
            <p>
              In digital hardware, a flip-flop or DRAM cell stores only electric charges. When 8 flip-flops in an ALU register hold the bit sequence <code className="text-amber-300 font-mono font-bold bg-slate-950 px-2 py-0.5 rounded border border-slate-800">1111 1111</code>, the silicon does <em>not</em> know what that number means!
            </p>
            <p>
              If your code declares this variable as <code className="text-teal-300 font-mono">uint8_t</code> (unsigned), the CPU treats all 8 bits as positive weights (<code className="text-teal-300 font-mono">+128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = +255</code>).
            </p>
            <p>
              However, if your code declares it as <code className="text-cyan-300 font-mono">int8_t</code> (signed 2's complement), the CPU interprets the Most Significant Bit (MSB, bit 7) as having negative weight <code className="text-cyan-300 font-mono">-128</code>, computing <code className="text-cyan-300 font-mono">-128 + 127 = -1</code>.
            </p>
            <p>
              The bit pattern is 100% identical. Only the <strong>software compiler's choice of CPU instruction opcodes</strong> determines whether it behaves as a positive magnitude or a negative integer!
            </p>
          </div>

          {/* Quick Range Comparison Cards */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-xs font-semibold uppercase tracking-wider text-teal-400 mb-1">8-Bit Register</div>
              <div className="text-xs text-slate-400 mb-2">uint8_t vs int8_t</div>
              <div className="text-xs font-mono text-slate-300">
                <div>Unsigned: <span className="text-teal-300 font-bold">0 to 255</span></div>
                <div>Signed: <span className="text-cyan-300 font-bold">-128 to +127</span></div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-xs font-semibold uppercase tracking-wider text-teal-400 mb-1">16-Bit Register</div>
              <div className="text-xs text-slate-400 mb-2">uint16_t vs int16_t</div>
              <div className="text-xs font-mono text-slate-300">
                <div>Unsigned: <span className="text-teal-300 font-bold">0 to 65,535</span></div>
                <div>Signed: <span className="text-cyan-300 font-bold">-32,768 to +32,767</span></div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-xs font-semibold uppercase tracking-wider text-teal-400 mb-1">32-Bit Register</div>
              <div className="text-xs text-slate-400 mb-2">uint32_t vs int32_t</div>
              <div className="text-xs font-mono text-slate-300">
                <div>Unsigned: <span className="text-teal-300 font-bold">0 to ~4.29 Billion</span></div>
                <div>Signed: <span className="text-cyan-300 font-bold">-2.14B to +2.14B</span></div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-xs font-semibold uppercase tracking-wider text-teal-400 mb-1">64-Bit Register</div>
              <div className="text-xs text-slate-400 mb-2">uint64_t vs int64_t</div>
              <div className="text-xs font-mono text-slate-300">
                <div>Unsigned: <span className="text-teal-300 font-bold">0 to ~18.44 Quintillion</span></div>
                <div>Signed: <span className="text-cyan-300 font-bold">±9.22 Quintillion</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 3. Multi-Tabbed Custom SVG Instructional Suite ─── */}
        <section
          ref={addRef}
          className="reveal-section max-w-5xl mx-auto mb-16 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 md:p-8 shadow-2xl"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <span>📐</span> Architectural Visualizer &amp; Schematics
              </h2>
              <p className="text-xs text-slate-400">
                Interactive SVG diagrams detailing dynamic range scales, MSB sign bit decoding, and type casting mechanics.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTab("tab1")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                  activeTab === "tab1"
                    ? "bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/30"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                )}
              >
                1. Number Line Dynamic Ranges
              </button>
              <button
                onClick={() => setActiveTab("tab2")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                  activeTab === "tab2"
                    ? "bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/30"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                )}
              >
                2. MSB Weight vs Sign Bit
              </button>
              <button
                onClick={() => setActiveTab("tab3")}
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                  activeTab === "tab3"
                    ? "bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/30"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                )}
              >
                3. Sign vs Zero Extension
              </button>
            </div>
          </div>

          {/* Tab 1: Number Line Dynamic Ranges */}
          {activeTab === "tab1" && (
            <div className="space-y-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <svg
                  viewBox="0 0 800 360"
                  className="w-full h-auto font-sans"
                  style={{ maxHeight: "400px" }}
                >
                  {/* Title Banner */}
                  <rect x="20" y="15" width="760" height="40" rx="8" fill="#1e293b" />
                  <text x="400" y="40" fill="#2dd4bf" fontSize="14" fontWeight="bold" textAnchor="middle">
                    8-Bit Range Comparison: Unsigned [0..255] vs Signed 2's Complement [-128..+127]
                  </text>

                  {/* 1. Unsigned Scale */}
                  <text x="50" y="90" fill="#94a3b8" fontSize="12" fontWeight="bold">
                    A. UNSIGNED 8-BIT SCALE (All 256 States in Positive Domain)
                  </text>
                  <rect x="50" y="105" width="700" height="35" rx="6" fill="#042f2e" stroke="#0d9488" strokeWidth="2" />
                  <text x="60" y="127" fill="#99f6e4" fontSize="12" fontWeight="bold">0 (0x00)</text>
                  <text x="400" y="127" fill="#5eead4" fontSize="12" fontWeight="bold" textAnchor="middle">128 (0x80)</text>
                  <text x="735" y="127" fill="#99f6e4" fontSize="12" fontWeight="bold" textAnchor="end">255 (0xFF)</text>

                  {/* 2. Signed 2's Complement Scale */}
                  <text x="50" y="180" fill="#94a3b8" fontSize="12" fontWeight="bold">
                    B. SIGNED 2'S COMPLEMENT SCALE (Half Negative, Half Non-Negative)
                  </text>

                  {/* Negative Half */}
                  <rect x="50" y="195" width="350" height="35" rx="6" fill="#450a0a" stroke="#dc2626" strokeWidth="2" />
                  <text x="60" y="217" fill="#fca5a5" fontSize="12" fontWeight="bold">-128 (0x80)</text>
                  <text x="385" y="217" fill="#fca5a5" fontSize="12" fontWeight="bold" textAnchor="end">-1 (0xFF)</text>

                  {/* Positive Half */}
                  <rect x="405" y="195" width="345" height="35" rx="6" fill="#064e3b" stroke="#059669" strokeWidth="2" />
                  <text x="415" y="217" fill="#6ee7b7" fontSize="12" fontWeight="bold">0 (0x00)</text>
                  <text x="735" y="217" fill="#6ee7b7" fontSize="12" fontWeight="bold" textAnchor="end">+127 (0x7F)</text>

                  {/* Comparison Summary Box */}
                  <rect x="50" y="255" width="700" height="80" rx="8" fill="#0f172a" stroke="#334155" />
                  <text x="70" y="280" fill="#38bdf8" fontSize="12" fontWeight="bold">
                    Key Architectural Takeaway:
                  </text>
                  <text x="70" y="302" fill="#cbd5e1" fontSize="12">
                    • Both systems have exactly 256 unique states (2⁸).
                  </text>
                  <text x="70" y="322" fill="#cbd5e1" fontSize="12">
                    • 2's Complement shifts the number line leftwards by 128 units, sacrificing numbers 128..255 to gain -128..-1.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-slate-400">
                💡 <strong>Instructor Insight:</strong> In 2's complement, the bit pattern <code className="text-teal-300">0x80</code> (10000000) is the most negative number (<code className="text-red-400">-128</code>), while <code className="text-teal-300">0x7F</code> (01111111) is the most positive number (<code className="text-emerald-400">+127</code>).
              </p>
            </div>
          )}

          {/* Tab 2: MSB Weight vs Sign Bit */}
          {activeTab === "tab2" && (
            <div className="space-y-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <svg
                  viewBox="0 0 800 340"
                  className="w-full h-auto font-sans"
                  style={{ maxHeight: "380px" }}
                >
                  {/* Title */}
                  <rect x="20" y="15" width="760" height="40" rx="8" fill="#1e293b" />
                  <text x="400" y="40" fill="#2dd4bf" fontSize="14" fontWeight="bold" textAnchor="middle">
                    Bit Positional Weight Assignment: Unsigned vs 2's Complement
                  </text>

                  {/* Bit Headers */}
                  {[
                    { bit: "b7 (MSB)", uWeight: "+128", sWeight: "-128", isMsb: true },
                    { bit: "b6", uWeight: "+64", sWeight: "+64" },
                    { bit: "b5", uWeight: "+32", sWeight: "+32" },
                    { bit: "b4", uWeight: "+16", sWeight: "+16" },
                    { bit: "b3", uWeight: "+8", sWeight: "+8" },
                    { bit: "b2", uWeight: "+4", sWeight: "+4" },
                    { bit: "b1", uWeight: "+2", sWeight: "+2" },
                    { bit: "b0 (LSB)", uWeight: "+1", sWeight: "+1" }
                  ].map((cell, idx) => (
                    <g key={idx}>
                      {/* Cell Header */}
                      <rect
                        x={40 + idx * 90}
                        y="75"
                        width="85"
                        height="40"
                        rx="6"
                        fill={cell.isMsb ? "#450a0a" : "#1e293b"}
                        stroke={cell.isMsb ? "#ef4444" : "#475569"}
                      />
                      <text
                        x={82 + idx * 90}
                        y="100"
                        fill={cell.isMsb ? "#fca5a5" : "#e2e8f0"}
                        fontSize="12"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        {cell.bit}
                      </text>

                      {/* Unsigned Row */}
                      <rect
                        x={40 + idx * 90}
                        y="125"
                        width="85"
                        height="45"
                        rx="6"
                        fill="#042f2e"
                        stroke="#0d9488"
                      />
                      <text
                        x={82 + idx * 90}
                        y="152"
                        fill="#5eead4"
                        fontSize="13"
                        fontWeight="bold"
                        fontFamily="monospace"
                        textAnchor="middle"
                      >
                        {cell.uWeight}
                      </text>

                      {/* Signed Row */}
                      <rect
                        x={40 + idx * 90}
                        y="180"
                        width="85"
                        height="45"
                        rx="6"
                        fill={cell.isMsb ? "#7f1d1d" : "#0f172a"}
                        stroke={cell.isMsb ? "#f87171" : "#334155"}
                      />
                      <text
                        x={82 + idx * 90}
                        y="207"
                        fill={cell.isMsb ? "#fecaca" : "#38bdf8"}
                        fontSize="13"
                        fontWeight="bold"
                        fontFamily="monospace"
                        textAnchor="middle"
                      >
                        {cell.sWeight}
                      </text>
                    </g>
                  ))}

                  {/* Summary Label */}
                  <rect x="40" y="245" width="720" height="70" rx="8" fill="#0f172a" stroke="#1e293b" />
                  <text x="60" y="272" fill="#f59e0b" fontSize="12" fontWeight="bold">
                    Mathematical Formulation:
                  </text>
                  <text x="60" y="295" fill="#94a3b8" fontSize="12" fontFamily="monospace">
                    V_signed = <tspan fill="#f87171">(-b₇ × 128)</tspan> + (b₆ × 64) + (b₅ × 32) + (b₄ × 16) + (b₃ × 8) + (b₂ × 4) + (b₁ × 2) + (b₀ × 1)
                  </text>
                </svg>
              </div>
              <p className="text-xs text-slate-400">
                🏷️ <strong>Core Formula:</strong> The MSB is simply given a negative positional weight of <code className="text-teal-300">-2^(n-1)</code>. All remaining bits contribute standard positive weights!
              </p>
            </div>
          )}

          {/* Tab 3: Sign vs Zero Extension */}
          {activeTab === "tab3" && (
            <div className="space-y-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <svg
                  viewBox="0 0 800 340"
                  className="w-full h-auto font-sans"
                  style={{ maxHeight: "380px" }}
                >
                  {/* Title */}
                  <rect x="20" y="15" width="760" height="40" rx="8" fill="#1e293b" />
                  <text x="400" y="40" fill="#2dd4bf" fontSize="14" fontWeight="bold" textAnchor="middle">
                    Widening Conversions: Sign Extension (MOVSX) vs Zero Extension (MOVZX)
                  </text>

                  {/* 1. Sign Extension */}
                  <rect x="40" y="75" width="720" height="110" rx="8" fill="#0f172a" stroke="#334155" />
                  <text x="60" y="100" fill="#ef4444" fontSize="12" fontWeight="bold">
                    A. SIGN EXTENSION (Casting int8_t to int16_t for -5):
                  </text>
                  <text x="60" y="125" fill="#e2e8f0" fontSize="12" fontFamily="monospace">
                    8-bit source: <tspan fill="#ef4444" fontWeight="bold">1</tspan>111 1011  (MSB = 1, Value = -5)
                  </text>
                  <text x="60" y="150" fill="#e2e8f0" fontSize="12" fontFamily="monospace">
                    16-bit result: <tspan fill="#ef4444" fontWeight="bold">1111 1111</tspan> 1111 1011 (Copies MSB '1' into all 8 upper bits → Value = -5)
                  </text>
                  <text x="60" y="172" fill="#64748b" fontSize="11">
                    x86 Instruction: MOVSX EAX, AL
                  </text>

                  {/* 2. Zero Extension */}
                  <rect x="40" y="200" width="720" height="110" rx="8" fill="#0f172a" stroke="#334155" />
                  <text x="60" y="225" fill="#10b981" fontSize="12" fontWeight="bold">
                    B. ZERO EXTENSION (Casting uint8_t to uint16_t for 251):
                  </text>
                  <text x="60" y="250" fill="#e2e8f0" fontSize="12" fontFamily="monospace">
                    8-bit source: 1111 1011 (Value = 251)
                  </text>
                  <text x="60" y="275" fill="#e2e8f0" fontSize="12" fontFamily="monospace">
                    16-bit result: <tspan fill="#10b981" fontWeight="bold">0000 0000</tspan> 1111 1011 (Fills upper bits with '0' → Value = 251)
                  </text>
                  <text x="60" y="297" fill="#64748b" fontSize="11">
                    x86 Instruction: MOVZX EAX, AL
                  </text>
                </svg>
              </div>
              <p className="text-xs text-slate-400">
                🛡️ <strong>Compiler Mechanism:</strong> If you accidentally zero-extend a signed negative number, it turns into a massive positive number (<code className="text-amber-300">-5</code> becomes <code className="text-amber-300">+251</code> in 16-bit), destroying your math calculations!
              </p>
            </div>
          )}
        </section>

        {/* ─── 4. Live Interactive Bit-Switchboard & Dual Decoder ─ */}
        <section
          ref={addRef}
          className="reveal-section max-w-5xl mx-auto mb-16 rounded-2xl border border-teal-500/30 bg-slate-900/90 p-6 md:p-8 shadow-2xl"
        >
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/20 text-teal-400 font-bold text-lg">
              🎛️
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-bold text-teal-300">
                Interactive 8-Bit Switchboard &amp; Multi-Standard Decoder
              </h2>
              <p className="text-xs text-slate-400">
                Click any bit below to toggle its state (0 ↔ 1) and watch all 4 hardware interpretations update simultaneously.
              </p>
            </div>
          </div>

          {/* 8-Bit Interactive Switch Bar */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Click any bit cell to toggle:
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setBits([0, 0, 0, 0, 0, 0, 0, 0])}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 cursor-pointer"
                >
                  All 0s (0x00)
                </button>
                <button
                  onClick={() => setBits([1, 1, 1, 1, 1, 1, 1, 1])}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 cursor-pointer"
                >
                  All 1s (0xFF)
                </button>
                <button
                  onClick={() => setBits([0, 1, 1, 1, 1, 1, 1, 1])}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 cursor-pointer"
                >
                  Max Positive (+127)
                </button>
                <button
                  onClick={() => setBits([1, 0, 0, 0, 0, 0, 0, 0])}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 cursor-pointer"
                >
                  Min Negative (-128)
                </button>
              </div>
            </div>

            {/* Bit Cells */}
            <div className="grid grid-cols-8 gap-2">
              {bits.map((bitVal, idx) => {
                const isMsb = idx === 0;
                return (
                  <button
                    key={idx}
                    onClick={() => toggleBit(idx)}
                    className={clsx(
                      "p-3 sm:p-4 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer",
                      bitVal === 1
                        ? isMsb
                          ? "bg-red-950/80 border-red-500 text-red-300 shadow-lg shadow-red-950/40"
                          : "bg-teal-950/80 border-teal-500 text-teal-300 shadow-lg shadow-teal-950/40"
                        : "bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-700"
                    )}
                  >
                    <span className="text-[10px] text-slate-400 font-mono mb-1">
                      {isMsb ? "b7 (Sign)" : `b${7 - idx}`}
                    </span>
                    <span className="text-2xl sm:text-3xl font-bold font-mono">
                      {bitVal}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono mt-1">
                      {isMsb ? (bitVal === 1 ? "-128" : "+0") : `+${Math.pow(2, 7 - idx)}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Real-time Decoder Output Grid */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 1. Unsigned */}
            <div className="p-4 rounded-xl bg-slate-950 border border-teal-500/40">
              <div className="text-xs font-semibold text-teal-400 uppercase tracking-wider mb-1">
                1. Unsigned (uint8_t)
              </div>
              <div className="text-2xl font-bold text-white font-mono my-2">
                +{interpretations.unsignedVal}
              </div>
              <p className="text-[11px] text-slate-400">
                Range: [0 to 255]. All 8 bits contribute positive weight.
              </p>
            </div>

            {/* 2. Signed 2's Complement */}
            <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/40">
              <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">
                2. Signed 2's Complement (int8_t)
              </div>
              <div className={clsx(
                "text-2xl font-bold font-mono my-2",
                interpretations.signed2sVal < 0 ? "text-red-400" : "text-emerald-400"
              )}>
                {interpretations.signed2sVal > 0 ? `+${interpretations.signed2sVal}` : interpretations.signed2sVal}
              </div>
              <p className="text-[11px] text-slate-400">
                Range: [-128 to +127]. Industry standard in all modern microprocessors.
              </p>
            </div>

            {/* 3. Sign-Magnitude */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                3. Sign-Magnitude
              </div>
              <div className="text-2xl font-bold text-slate-200 font-mono my-2">
                {interpretations.signMagDisplay}
              </div>
              <p className="text-[11px] text-slate-400">
                Range: [-127 to +127]. Slower hardware, suffers from dual zero (+0 and -0).
              </p>
            </div>

            {/* 4. 1's Complement */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                4. 1's Complement
              </div>
              <div className="text-2xl font-bold text-slate-200 font-mono my-2">
                {interpretations.onesCompDisplay}
              </div>
              <p className="text-[11px] text-slate-400">
                Range: [-127 to +127]. Requires end-around carry in ALUs.
              </p>
            </div>
          </div>
        </section>

        {/* ─── 5. Real-World Engineering Case Studies ─────────── */}
        <section
          ref={addRef}
          className="reveal-section max-w-5xl mx-auto mb-16 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 md:p-8 shadow-2xl"
        >
          <div className="border-b border-slate-800 pb-4 mb-6">
            <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
              <span>🏭</span> Real-World West Bengal Engineering Scenarios
            </h2>
            <p className="text-xs text-slate-400">
              Practical industry applications of signed and unsigned data types across West Bengal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Scenario 1: Mamata */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-teal-500/40 transition-all">
              <div className="flex items-center gap-2 text-teal-400 font-semibold text-sm mb-2">
                <span>📍</span>
                <span>Barrackpore: Industrial Temperature Calibration</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Mamata</strong> is designing a cold-storage warehouse monitor in Barrackpore. The analog thermocouple outputs an unsigned 12-bit ADC count (<code className="text-teal-300 font-mono">0 to 4095</code>). Mamata converts this raw signal into a signed integer <code className="text-teal-300 font-mono">int16_t</code> to accurately display freezing temperatures down to <code className="text-cyan-300 font-mono">-40°C</code> and heat up to <code className="text-amber-300 font-mono">+125°C</code>.
              </p>
            </div>

            {/* Scenario 2: Susmita */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 transition-all">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm mb-2">
                <span>📍</span>
                <span>Ichapur: Automated Warehouse Inventory Counting</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Susmita</strong> develops the automated spare-parts tracking system at Ichapur Rifle Factory. Stock counts and warehouse slot numbers are strictly defined as <code className="text-cyan-300 font-mono">uint32_t</code>. Since physical components can never be negative, this guarantees double the indexing capacity (up to 4.29 billion parts) and eliminates illegal negative inventory bugs.
              </p>
            </div>

            {/* Scenario 3: Debangshu */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all">
              <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm mb-2">
                <span>📍</span>
                <span>Jadavpur: Compiler Type Safety &amp; Bounds Exploits</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Debangshu</strong> is auditing a C network stack for security vulnerabilities at Jadavpur University. He finds a dangerous bug where a signed packet size <code className="text-indigo-300 font-mono">int32_t len = -1</code> is compared to <code className="text-indigo-300 font-mono">unsigned int max = 1024</code>. The signed-to-unsigned promotion causes <code className="text-amber-300 font-mono">-1</code> to become <code className="text-amber-300 font-mono">4,294,967,295</code>, triggering a massive buffer overflow!
              </p>
            </div>

            {/* Scenario 4: Mahima */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/40 transition-all">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm mb-2">
                <span>📍</span>
                <span>Kolkata: High-Frequency FinTech Margin Accounting</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Mahima</strong> develops high-throughput trade settlement systems in Salt Lake, Kolkata. Account balances are stored in signed 64-bit integers (<code className="text-amber-300 font-mono">int64_t</code> in paise/cents) so negative balances and intraday margin overdrafts are processed naturally in the ALU without separate status flags.
              </p>
            </div>
          </div>
        </section>

        {/* ─── 6. Tips, Pitfalls, Best Practices & Checklist ──── */}
        <section
          ref={addRef}
          className="reveal-section max-w-5xl mx-auto mb-16 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Common Pitfalls */}
          <div className="rounded-2xl border border-red-500/30 bg-slate-900/90 p-6 shadow-xl">
            <h3 className="text-base font-bold text-red-400 flex items-center gap-2 mb-4">
              <span>⚠️</span> Common Beginner Pitfalls
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">•</span>
                <span><strong>The Unsigned Loop Countdown Bug:</strong> <code className="text-red-300 font-mono">for (unsigned int i = 10; i &gt;= 0; i--)</code> never terminates because <code className="text-red-300 font-mono">0 - 1</code> wraps around to <code className="text-red-300 font-mono">4,294,967,295 &gt;= 0</code>!</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">•</span>
                <span><strong>Mixing Signed &amp; Unsigned in Comparisons:</strong> Comparing <code className="text-red-300 font-mono">-5 &lt; 10u</code> evaluates to FALSE because C converts <code className="text-red-300 font-mono">-5</code> to a huge unsigned integer.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">•</span>
                <span><strong>Zero-Extending Negative Numbers:</strong> Padding negative signed numbers with zeros instead of sign-extending turns negative values positive.</span>
              </li>
            </ul>
          </div>

          {/* Professional Best Practices */}
          <div className="rounded-2xl border border-teal-500/30 bg-slate-900/90 p-6 shadow-xl">
            <h3 className="text-base font-bold text-teal-400 flex items-center gap-2 mb-4">
              <span>✨</span> Senior Engineering Best Practices
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">•</span>
                <span><strong>Use Fixed-Width Types:</strong> Always include <code className="text-teal-300 font-mono">&lt;stdint.h&gt;</code> and use <code className="text-teal-300 font-mono">uint32_t</code>, <code className="text-teal-300 font-mono">int32_t</code> rather than raw <code className="text-teal-300 font-mono">int</code> or <code className="text-teal-300 font-mono">unsigned</code>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">•</span>
                <span><strong>Unsigned for Bitmasks &amp; Hardware:</strong> Use unsigned types exclusively for bit manipulation, registers, memory addresses, and sizes.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">•</span>
                <span><strong>Signed for Math &amp; Status Codes:</strong> Use signed types for mathematical differentials, physics coordinates, and functions returning negative error codes.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* ─── 7. Mini Checklist ──────────────────────────────── */}
        <section
          ref={addRef}
          className="reveal-section max-w-5xl mx-auto mb-16 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl"
        >
          <h3 className="text-base font-bold text-amber-400 flex items-center gap-2 mb-4">
            <span>📋</span> Student Memory Checklist
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs text-slate-300">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
              <span className="text-teal-400 font-bold">✓</span>
              <span>Unsigned n-bit Range: [0 to 2ⁿ - 1]</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
              <span className="text-teal-400 font-bold">✓</span>
              <span>Signed 2's Comp Range: [-2ⁿ⁻¹ to +2ⁿ⁻¹ - 1]</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
              <span className="text-teal-400 font-bold">✓</span>
              <span>MSB in 2's comp has negative weight -2ⁿ⁻¹</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
              <span className="text-teal-400 font-bold">✓</span>
              <span>Same bit pattern (0xFF) = 255 unsigned OR -1 signed</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
              <span className="text-teal-400 font-bold">✓</span>
              <span>Signed expansion requires Sign Extension (copy MSB)</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
              <span className="text-teal-400 font-bold">✓</span>
              <span>Never use unsigned types for countdown loops with &gt;= 0</span>
            </div>
          </div>
        </section>

        {/* ─── 8. FAQ Section ─────────────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <FAQTemplate
            title="Unsigned vs Signed Number Representation FAQs"
            questions={questions}
          />
        </section>

        {/* ─── 9. Teacher's Note ──────────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <Teacher
            note={
              "Always remember: Hardware is agnostic. The very same 8 bits 11111111 sitting inside register AL can be passed to a signed multiplication instruction (IMUL) or an unsigned multiplication instruction (MUL). In your C and C++ programs, enable compiler warning flags (-Wall -Wextra -Wsign-compare) to catch accidental signed-unsigned comparisons before they become catastrophic production security flaws!"
            }
          />
        </section>

        {/* ─── 10. Printable Plain Text Document ──────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            title="Topic 4: Unsigned vs Signed Number Representation"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note"
            downloadFileName="topic4_unsigned_vs_signed_representation_note.txt"
          />
        </section>

      </div>
    </>
  );
};

export default Topic4;
