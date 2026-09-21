import React, { useState, useEffect, useRef, useMemo } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";

/**
 * Topic7 – 2’s Complement representation of negative numbers
 * Module: 001_001_number-systems-and-codes (Number Systems & Binary Codes)
 * Track: Computer Architecture – From Core Systems to Performance Engineering
 */
const Topic7 = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [valA, setValA] = useState("55");
  const [valB, setValB] = useState("25");
  const [operation, setOperation] = useState("sub"); // "add" or "sub"
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

  // Convert decimal to 8-bit 2's complement binary
  const toTwosComp = (num) => {
    const isNeg = num < 0;
    if (num === 0) return { binary: "00000000", isNeg: false, hex: "0x00" };
    if (!isNeg) {
      const bin = num.toString(2).padStart(8, "0");
      return { binary: bin, isNeg: false, hex: "0x" + parseInt(bin, 2).toString(16).toUpperCase().padStart(2, "0") };
    }
    // Negative number in 2's complement: 256 + num
    const twosVal = 256 + num;
    const bin = twosVal.toString(2).padStart(8, "0");
    return { binary: bin, isNeg: true, hex: "0x" + twosVal.toString(16).toUpperCase().padStart(2, "0") };
  };

  // 2's Complement ALU Simulator (Unified Adder/Subtractor)
  const aluTrace = useMemo(() => {
    const a = parseInt(valA, 10);
    const b = parseInt(valB, 10);

    if (isNaN(a) || isNaN(b) || a < -128 || a > 127 || b < -128 || b > 127) {
      return { error: "Please enter integers between -128 and +127 (8-bit signed limits)", isError: true };
    }

    const binA = toTwosComp(a).binary;
    const binB_orig = toTwosComp(b).binary;
    const mode = operation === "sub" ? 1 : 0; // M = 1 for subtract, 0 for add

    // XOR B with Mode M
    let xorB_bits = [];
    for (let i = 0; i < 8; i++) {
      const bitB = parseInt(binB_orig[i], 10);
      xorB_bits.push(bitB ^ mode);
    }
    const xorB = xorB_bits.join("");

    // Add A + xorB + M
    let carry = mode;
    let sumBits = [];
    let carryInMSB = 0;
    let carryOutMSB = 0;

    for (let i = 7; i >= 0; i--) {
      const bitA = parseInt(binA[i], 10);
      const bitX = xorB_bits[i];
      if (i === 0) carryInMSB = carry;
      const sum = bitA + bitX + carry;
      sumBits.unshift(sum % 2);
      carry = Math.floor(sum / 2);
      if (i === 0) carryOutMSB = carry;
    }

    const resultBin = sumBits.join("");
    const endCarry = carry;

    // Decode result in 2's complement
    const msb = sumBits[0];
    let decodedDec = -msb * 128;
    for (let i = 1; i < 8; i++) {
      decodedDec += sumBits[i] * Math.pow(2, 7 - i);
    }

    const theoreticalResult = operation === "sub" ? a - b : a + b;
    const overflow = carryInMSB !== carryOutMSB;
    const zeroFlag = resultBin === "00000000";
    const signFlag = msb === 1;
    const carryFlag = endCarry === 1;

    return {
      a,
      b,
      binA,
      binB_orig,
      mode,
      xorB,
      resultBin,
      endCarry,
      decodedDec,
      theoreticalResult,
      overflow,
      zeroFlag,
      signFlag,
      carryFlag,
      carryInMSB,
      carryOutMSB,
      hex: "0x" + parseInt(resultBin, 2).toString(16).toUpperCase().padStart(2, "0"),
      isError: false
    };
  }, [valA, valB, operation]);

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
            <span>Computer Architecture Masterclass · Module 001 · Topic 7</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight mb-4">
            2’s Complement Representation of Negative Numbers
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            The undisputed king of computer arithmetic: understand the unified adder/subtractor circuit, right-to-left hardware shortcuts, unique zero, and discarded end-carry mechanics.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-teal-300">
              🛠️ Unified Adder/Subtractor (A + ~B + 1)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-cyan-300">
              ✨ Unique Zero (0000 0000)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-indigo-300">
              ⚡ Right-to-Left Hardware Shortcut
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-amber-300">
              🎯 Asymmetric Range [-128 to +127]
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
                Classroom Lecture: The Grand Triumph of 2's Complement
              </h2>
              <p className="text-xs text-slate-400">
                Sukanta Hui · Coder &amp; AccoTax · Shibtala Road, Barrackpore
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
            <p>
              Why does every modern CPU—from the Intel Core i9 in your desktop to the Apple M4 in your laptop and the ARM Cortex in your smartphone—use <strong>2's Complement</strong> for all integer arithmetic?
            </p>
            <p>
              The brilliance of 2's complement is that it transforms <strong>subtraction into addition</strong>:
              <br />
              <code className="text-teal-300 font-mono font-bold bg-slate-950 px-2 py-1 rounded border border-slate-800 inline-block my-1">
                A - B = A + (-B) = A + (1's Complement of B + 1) = A + NOT(B) + 1
              </code>
            </p>
            <p>
              In CPU silicon, an ALU does not need separate subtraction circuits! It simply feeds the second operand through XOR gates (which invert the bits when subtracting) and asserts the adder's <code className="text-cyan-300 font-mono">Carry-In = 1</code>.
            </p>
            <p>
              Even better: whenever an addition produces an end carry out of the MSB, the hardware <strong>simply discards it</strong>! There is zero end-around carry latency and zero dual zero confusion.
            </p>
          </div>

          {/* Positional Formula Card */}
          <div className="mt-8 p-4 rounded-xl border border-slate-800 bg-slate-950/80 font-mono text-xs sm:text-sm space-y-2">
            <div className="text-teal-400 font-bold uppercase tracking-wider">
              Positional Weight Formula:
            </div>
            <div className="text-slate-200">
              V = <span className="text-red-400 font-bold">(-b<sub>n-1</sub> × 2<sup>n-1</sup>)</span> + ∑<sub>i=0</sub><sup>n-2</sup> (b<sub>i</sub> × 2<sup>i</sup>)
            </div>
            <div className="text-slate-400 text-xs">
              Notice that the MSB is the ONLY bit with a negative weight! All lower bits have standard positive weights.
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
                Interactive vector schematics detailing calculation shortcuts, unified ALU circuits, and modular clock rings.
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
                1. Calculation Shortcuts
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
                2. Unified ALU Adder/Subtractor
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
                3. 2's Comp Modular Ring
              </button>
            </div>
          </div>

          {/* Tab 1: Calculation Shortcuts */}
          {activeTab === "tab1" && (
            <div className="space-y-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <svg
                  viewBox="0 0 800 360"
                  className="w-full h-auto font-sans"
                  style={{ maxHeight: "400px" }}
                >
                  {/* Title */}
                  <rect x="20" y="15" width="760" height="40" rx="8" fill="#1e293b" />
                  <text x="400" y="40" fill="#2dd4bf" fontSize="14" fontWeight="bold" textAnchor="middle">
                    Two Methods to Compute 2's Complement for Decimal (+52) → (-52)
                  </text>

                  {/* Method A */}
                  <rect x="40" y="75" width="350" height="210" rx="8" fill="#0f172a" stroke="#334155" />
                  <text x="60" y="105" fill="#38bdf8" fontSize="12" fontWeight="bold">METHOD A: Standard (Invert + 1)</text>
                  <text x="60" y="135" fill="#e2e8f0" fontSize="13" fontFamily="monospace">
                    1. Positive +52:  0011 0100
                  </text>
                  <text x="60" y="165" fill="#e2e8f0" fontSize="13" fontFamily="monospace">
                    2. 1's Comp (~):  1100 1011
                  </text>
                  <text x="60" y="195" fill="#f59e0b" fontSize="13" fontFamily="monospace">
                    3. Add 1 to LSB: +        1
                  </text>
                  <line x1="60" y1="205" x2="360" y2="205" stroke="#64748b" />
                  <text x="60" y="230" fill="#2dd4bf" fontSize="15" fontWeight="bold" fontFamily="monospace">
                    Result (-52):     1100 1100 (0xCC)
                  </text>
                  <text x="60" y="260" fill="#94a3b8" fontSize="11">
                    Positional Check: -128 + 64 + 8 + 4 = -52 ✓
                  </text>

                  {/* Method B */}
                  <rect x="410" y="75" width="350" height="210" rx="8" fill="#042f2e" stroke="#0d9488" strokeWidth="1.5" />
                  <text x="430" y="105" fill="#5eead4" fontSize="12" fontWeight="bold">METHOD B: Right-to-Left Shortcut</text>
                  <text x="430" y="135" fill="#e2e8f0" fontSize="13" fontFamily="monospace">
                    Input:  <tspan fill="#f59e0b">00110</tspan> <tspan fill="#5eead4" fontWeight="bold">100</tspan>
                  </text>
                  <text x="430" y="165" fill="#cbd5e1" fontSize="11">
                    1. Scan from right: copy up to 1st '1'
                  </text>
                  <text x="430" y="185" fill="#5eead4" fontSize="13" fontFamily="monospace">
                    → Trailing bits preserved: <tspan fontWeight="bold">'100'</tspan>
                  </text>
                  <text x="430" y="210" fill="#cbd5e1" fontSize="11">
                    2. Invert all remaining bits to the left:
                  </text>
                  <text x="430" y="230" fill="#fca5a5" fontSize="13" fontFamily="monospace">
                    → Flip '00110' → <tspan fontWeight="bold">'11001'</tspan>
                  </text>
                  <text x="430" y="260" fill="#2dd4bf" fontSize="15" fontWeight="bold" fontFamily="monospace">
                    Result (-52): 1100 1100 (Instant!)
                  </text>

                  {/* Summary Bar */}
                  <rect x="40" y="295" width="720" height="45" rx="6" fill="#1e1b4b" stroke="#6366f1" />
                  <text x="400" y="323" fill="#c7d2fe" fontSize="12" fontWeight="bold" textAnchor="middle">
                    Senior Exam Hack: Use Method B to write 2's complement in under 2 seconds!
                  </text>
                </svg>
              </div>
              <p className="text-xs text-slate-400">
                ⚡ <strong>Pro Shortcut:</strong> Never spend time performing manual long addition for 2's complement. Scan from right to left, keep everything up to the first 1, and flip the rest!
              </p>
            </div>
          )}

          {/* Tab 2: Unified ALU Adder/Subtractor */}
          {activeTab === "tab2" && (
            <div className="space-y-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <svg
                  viewBox="0 0 800 360"
                  className="w-full h-auto font-sans"
                  style={{ maxHeight: "400px" }}
                >
                  {/* Title */}
                  <rect x="20" y="15" width="760" height="40" rx="8" fill="#1e293b" />
                  <text x="400" y="40" fill="#2dd4bf" fontSize="14" fontWeight="bold" textAnchor="middle">
                    Hardware Synthesis: Unified 8-Bit Adder / Subtractor Circuit
                  </text>

                  {/* Mode Control Line */}
                  <rect x="40" y="75" width="720" height="45" rx="6" fill="#1e1b4b" stroke="#818cf8" />
                  <text x="60" y="102" fill="#c7d2fe" fontSize="12" fontWeight="bold">
                    MODE CONTROL SIGNAL (M): <tspan fill="#a7f3d0">M=0 (Addition: A + B)</tspan> | <tspan fill="#fca5a5">M=1 (Subtraction: A - B)</tspan>
                  </text>

                  {/* XOR Inverter Array */}
                  <rect x="40" y="130" width="340" height="120" rx="8" fill="#0f172a" stroke="#334155" />
                  <text x="60" y="155" fill="#38bdf8" fontSize="12" fontWeight="bold">1. XOR GATE ARRAY (B ⊕ M)</text>
                  <text x="60" y="180" fill="#cbd5e1" fontSize="11">
                    • If M = 0: B ⊕ 0 = B (Pass B unchanged)
                  </text>
                  <text x="60" y="205" fill="#cbd5e1" fontSize="11">
                    • If M = 1: B ⊕ 1 = ~B (Invert B to 1's comp)
                  </text>
                  <text x="60" y="230" fill="#f59e0b" fontSize="11" fontFamily="monospace">
                    Hardware Inverter with 0 Multiplexers!
                  </text>

                  {/* Full Adder Core */}
                  <rect x="420" y="130" width="340" height="120" rx="8" fill="#042f2e" stroke="#0d9488" strokeWidth="2" />
                  <text x="440" y="155" fill="#5eead4" fontSize="12" fontWeight="bold">2. 8-BIT PARALLEL FULL ADDER</text>
                  <text x="440" y="180" fill="#cbd5e1" fontSize="11">
                    • Input 1: Operand A
                  </text>
                  <text x="440" y="205" fill="#cbd5e1" fontSize="11">
                    • Input 2: (B ⊕ M)
                  </text>
                  <text x="440" y="230" fill="#99f6e4" fontSize="11" fontFamily="monospace">
                    • Carry-In (C₀): M (Injects +1 when subtracting!)
                  </text>

                  {/* Result Box */}
                  <rect x="40" y="265" width="720" height="70" rx="8" fill="#0f172a" stroke="#14b8a6" />
                  <text x="400" y="295" fill="#2dd4bf" fontSize="14" fontWeight="bold" textAnchor="middle">
                    Unified Formula: Sum = A + (B ⊕ M) + M
                  </text>
                  <text x="400" y="318" fill="#cbd5e1" fontSize="12" textAnchor="middle">
                    When M=1: Sum = A + ~B + 1 = A + 2's_Comp(B) = A - B. End Carry is simply discarded!
                  </text>
                </svg>
              </div>
              <p className="text-xs text-slate-400">
                🛠️ <strong>Silicon Masterpiece:</strong> Notice how a single Mode bit controls both the XOR inverters and the adder's Carry-In. This circuit is inside every computer CPU!
              </p>
            </div>
          )}

          {/* Tab 3: 2's Comp Modular Ring */}
          {activeTab === "tab3" && (
            <div className="space-y-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <svg
                  viewBox="0 0 800 360"
                  className="w-full h-auto font-sans"
                  style={{ maxHeight: "400px" }}
                >
                  {/* Title */}
                  <rect x="20" y="15" width="760" height="40" rx="8" fill="#1e293b" />
                  <text x="400" y="40" fill="#2dd4bf" fontSize="14" fontWeight="bold" textAnchor="middle">
                    The 2's Complement Modular Ring: Arithmetic Modulo 2ⁿ (Discarded Carry)
                  </text>

                  {/* 4-bit Clock Analogy */}
                  <circle cx="220" cy="200" r="110" fill="#0f172a" stroke="#334155" strokeWidth="2" />

                  {/* 0 at Top */}
                  <text x="220" y="115" fill="#6ee7b7" fontSize="12" fontWeight="bold" textAnchor="middle">0 (0000)</text>
                  {/* Positive Right */}
                  <text x="310" y="155" fill="#6ee7b7" fontSize="11" textAnchor="middle">+2 (0010)</text>
                  <text x="325" y="205" fill="#6ee7b7" fontSize="11" textAnchor="middle">+4 (0100)</text>
                  <text x="290" y="265" fill="#6ee7b7" fontSize="11" textAnchor="middle">+7 (0111)</text>

                  {/* Max Negative at Bottom */}
                  <text x="220" y="300" fill="#f87171" fontSize="12" fontWeight="bold" textAnchor="middle">-8 (1000)</text>

                  {/* Negative Left */}
                  <text x="140" y="265" fill="#fca5a5" fontSize="11" textAnchor="middle">-5 (1011)</text>
                  <text x="120" y="205" fill="#fca5a5" fontSize="11" textAnchor="middle">-4 (1100)</text>
                  <text x="140" y="155" fill="#fca5a5" fontSize="11" textAnchor="middle">-1 (1111)</text>

                  {/* Ring Explanations */}
                  <rect x="380" y="80" width="380" height="240" rx="8" fill="#042f2e" stroke="#0d9488" />
                  <text x="400" y="110" fill="#99f6e4" fontSize="13" fontWeight="bold">
                    Why the Ring Works Perfectly:
                  </text>
                  <text x="400" y="135" fill="#cbd5e1" fontSize="11">
                    1. <tspan fill="#5eead4" fontWeight="bold">Continuity:</tspan> Adding 1 moves clockwise (+1).
                  </text>
                  <text x="400" y="155" fill="#cbd5e1" fontSize="11">
                    2. <tspan fill="#5eead4" fontWeight="bold">Subtraction:</tspan> Subtracting 1 moves counter-clockwise.
                  </text>
                  <text x="400" y="180" fill="#cbd5e1" fontSize="11">
                    3. <tspan fill="#5eead4" fontWeight="bold">Overflow Boundary:</tspan> Crossing from +7 (0111) to -8 (1000) causes signed overflow!
                  </text>
                  <text x="400" y="215" fill="#cbd5e1" fontSize="11">
                    4. <tspan fill="#5eead4" fontWeight="bold">Zero Boundary:</tspan> Crossing from -1 (1111) + 1 produces 0000 with carry 1. The carry is discarded because it represents 1 full lap around the ring!
                  </text>
                </svg>
              </div>
              <p className="text-xs text-slate-400">
                🎯 <strong>Modular Ring:</strong> The 2's complement system is a continuous closed mathematical ring modulo 2ⁿ. An end carry is simply a marker that you completed one full cycle around the ring!
              </p>
            </div>
          )}
        </section>

        {/* ─── 4. Live Interactive Workbench ──────────────────── */}
        <section
          ref={addRef}
          className="reveal-section max-w-5xl mx-auto mb-16 rounded-2xl border border-teal-500/30 bg-slate-900/90 p-6 md:p-8 shadow-2xl"
        >
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/20 text-teal-400 font-bold text-lg">
              🧮
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-bold text-teal-300">
                Unified 2's Complement ALU Adder / Subtractor Simulator
              </h2>
              <p className="text-xs text-slate-400">
                Select Add or Subtract, inspect XOR inversion on operand B, observe Carry-In injection, and check hardware CPU flags.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Controls */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Operand A (-128 to +127):
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="-128"
                    max="127"
                    value={valA}
                    onChange={(e) => setValA(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono text-sm focus:border-teal-500 focus:outline-none"
                    placeholder="e.g. 55"
                  />
                  <button
                    onClick={() => setValA("55")}
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg text-slate-300"
                  >
                    +55
                  </button>
                  <button
                    onClick={() => setValA("-55")}
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg text-slate-300"
                  >
                    -55
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Operand B (-128 to +127):
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="-128"
                    max="127"
                    value={valB}
                    onChange={(e) => setValB(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono text-sm focus:border-teal-500 focus:outline-none"
                    placeholder="e.g. 25"
                  />
                  <button
                    onClick={() => setValB("25")}
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg text-slate-300"
                  >
                    +25
                  </button>
                  <button
                    onClick={() => setValB("-25")}
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg text-slate-300"
                  >
                    -25
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Select ALU Operation:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setOperation("add")}
                    className={clsx(
                      "p-2.5 rounded-lg text-xs font-bold border transition-all cursor-pointer",
                      operation === "add"
                        ? "bg-teal-500 text-slate-950 border-teal-400 shadow-lg shadow-teal-500/30"
                        : "bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-900"
                    )}
                  >
                    ADDITION (A + B) [M = 0]
                  </button>
                  <button
                    onClick={() => setOperation("sub")}
                    className={clsx(
                      "p-2.5 rounded-lg text-xs font-bold border transition-all cursor-pointer",
                      operation === "sub"
                        ? "bg-teal-500 text-slate-950 border-teal-400 shadow-lg shadow-teal-500/30"
                        : "bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-900"
                    )}
                  >
                    SUBTRACTION (A - B) [M = 1]
                  </button>
                </div>
              </div>

              {aluTrace.isError && (
                <div className="p-3 rounded-lg bg-red-950/60 border border-red-700/50 text-red-300 text-xs">
                  {aluTrace.error}
                </div>
              )}
            </div>

            {/* Arithmetic Trace & Flags */}
            {!aluTrace.isError && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-teal-500/40 space-y-3 font-mono text-xs">
                  <div className="text-slate-400 font-sans font-bold uppercase tracking-wider text-[11px]">
                    ALU Datapath Trace:
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                    <div className="flex justify-between">
                      <span>Operand A:</span>
                      <span className="text-teal-300">{aluTrace.binA} ({aluTrace.a})</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Operand B (Raw):</span>
                      <span className="text-slate-300">{aluTrace.binB_orig} ({aluTrace.b})</span>
                    </div>
                    <div className="flex justify-between text-cyan-300">
                      <span>B ⊕ M (XORed with {aluTrace.mode}):</span>
                      <span>{aluTrace.xorB}</span>
                    </div>
                    <div className="flex justify-between text-amber-300">
                      <span>Carry-In (C₀ = M):</span>
                      <span>+{aluTrace.mode}</span>
                    </div>
                    <div className="border-t border-teal-500 pt-2 flex justify-between font-bold text-sm">
                      <span className="text-white">ALU Sum Output:</span>
                      <span className="text-teal-300">{aluTrace.resultBin}</span>
                    </div>
                    <div className="flex justify-between text-slate-400 text-[11px] pt-1">
                      <span>End Carry (Discarded):</span>
                      <span className="text-amber-400 font-bold">{aluTrace.endCarry}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                    <span className="text-slate-300 font-sans font-semibold">Decoded Value:</span>
                    <span className="text-lg font-bold text-teal-300 font-mono">
                      {aluTrace.decodedDec} ({aluTrace.hex})
                    </span>
                  </div>

                  {/* CPU Flag Status */}
                  <div className="pt-2 border-t border-slate-800">
                    <div className="text-[11px] text-slate-400 font-sans font-bold uppercase mb-2">
                      Hardware CPU Status Flags:
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-center">
                      <div className={clsx(
                        "p-2 rounded border text-xs",
                        aluTrace.zeroFlag ? "bg-teal-950 border-teal-500 text-teal-300 font-bold" : "bg-slate-900 border-slate-800 text-slate-500"
                      )}>
                        ZF = {aluTrace.zeroFlag ? "1" : "0"}
                        <div className="text-[9px] font-normal">Zero Flag</div>
                      </div>

                      <div className={clsx(
                        "p-2 rounded border text-xs",
                        aluTrace.signFlag ? "bg-teal-950 border-teal-500 text-teal-300 font-bold" : "bg-slate-900 border-slate-800 text-slate-500"
                      )}>
                        SF = {aluTrace.signFlag ? "1" : "0"}
                        <div className="text-[9px] font-normal">Sign Flag</div>
                      </div>

                      <div className={clsx(
                        "p-2 rounded border text-xs",
                        aluTrace.carryFlag ? "bg-amber-950 border-amber-500 text-amber-300 font-bold" : "bg-slate-900 border-slate-800 text-slate-500"
                      )}>
                        CF = {aluTrace.carryFlag ? "1" : "0"}
                        <div className="text-[9px] font-normal">Carry Flag</div>
                      </div>

                      <div className={clsx(
                        "p-2 rounded border text-xs",
                        aluTrace.overflow ? "bg-red-950 border-red-500 text-red-300 font-bold" : "bg-slate-900 border-slate-800 text-slate-500"
                      )}>
                        OF = {aluTrace.overflow ? "1" : "0"}
                        <div className="text-[9px] font-normal">Overflow Flag</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
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
              Applications of 2's complement arithmetic across digital signal processing, chip design, and finance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Scenario 1: Mamata */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-teal-500/40 transition-all">
              <div className="flex items-center gap-2 text-teal-400 font-semibold text-sm mb-2">
                <span>📍</span>
                <span>Barrackpore: Real-Time Digital Audio Equalization</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Mamata</strong> develops high-fidelity digital audio DSP plugins in Barrackpore. Audio samples from studio microphones are encoded as 16-bit 2's complement integers (<code className="text-teal-300 font-mono">-32,768 to +32,767</code>). Because 2's complement has a single zero and symmetrical arithmetic, acoustic waveforms oscillate smoothly without creating audible DC pops or distortion.
              </p>
            </div>

            {/* Scenario 2: Susmita */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 transition-all">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm mb-2">
                <span>📍</span>
                <span>Ichapur: RISC-V 32-Bit ALU Hardware Core Synthesis</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Susmita</strong> synthesizes an open-source RISC-V CPU on an FPGA in Ichapur. By adopting 2's complement, she shares a single 32-bit Carry-Lookahead Adder for both <code className="text-cyan-300 font-mono">ADD</code> and <code className="text-cyan-300 font-mono">SUB</code> instructions using XOR multiplexers, saving over 3,000 logic gates on the chip die.
              </p>
            </div>

            {/* Scenario 3: Debangshu */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all">
              <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm mb-2">
                <span>📍</span>
                <span>Jadavpur: Compiler Security &amp; INT_MIN Negation Exploits</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Debangshu</strong> is auditing a C++ banking backend at Jadavpur University. He finds a critical vulnerability where an attacker submits <code className="text-indigo-300 font-mono">INT_MIN = -2147483648</code>. When the code attempts <code className="text-amber-300 font-mono">x = -x;</code>, 2's complement cannot represent <code className="text-amber-300 font-mono">+2147483648</code>, wrapping back to a negative number and bypassing balance checks!
              </p>
            </div>

            {/* Scenario 4: Mahima */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/40 transition-all">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm mb-2">
                <span>📍</span>
                <span>Kolkata: High-Precision 64-Bit Fixed-Point Trading Engine</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Mahima</strong> builds currency matching engines in Salt Lake, Kolkata. She implements 64-bit 2's complement fixed-point arithmetic, leveraging native CPU sign extension (<code className="text-amber-300 font-mono">MOVSXD</code>) to maintain sub-paise accuracy across billions of rupees in daily financial trades.
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
                <span><strong>The INT_MIN Asymmetry Trap:</strong> In an 8-bit system, <code className="text-red-300 font-mono">-128</code> has no positive counterpart (+128). Negating -128 produces -128!</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">•</span>
                <span><strong>Adding the End Carry:</strong> In 2's complement, you must DISCARD the end carry. Do not add it to the LSB (that is only for 1's complement!).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">•</span>
                <span><strong>Forgetting to Add 1:</strong> 2's complement is NOT just flipping bits; you must add 1 after flipping.</span>
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
                <span><strong>Use the Right-to-Left Shortcut:</strong> For rapid manual conversion, copy trailing zeros and the first '1', then flip everything to the left.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">•</span>
                <span><strong>Detect Overflow via XOR:</strong> In hardware RTL, compute the overflow flag with <code className="text-teal-300 font-mono">OF = C_in_msb ^ C_out_msb</code>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">•</span>
                <span><strong>Widen via Sign Extension:</strong> When casting to larger types (e.g. `int8_t` to `int32_t`), always sign-extend by copying the MSB.</span>
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
              <span>2's Comp = 1's Comp + 1 (or Right-to-Left Shortcut)</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
              <span className="text-teal-400 font-bold">✓</span>
              <span>Dynamic Range: [-2ⁿ⁻¹ to +2ⁿ⁻¹ - 1]</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
              <span className="text-teal-400 font-bold">✓</span>
              <span>Unique Zero: Only 0000 0000 = 0</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
              <span className="text-teal-400 font-bold">✓</span>
              <span>Subtraction Formula: A - B = A + ~B + 1</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
              <span className="text-teal-400 font-bold">✓</span>
              <span>End Carry is always DISCARDED</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
              <span className="text-teal-400 font-bold">✓</span>
              <span>Overflow = C_in(MSB) ⊕ C_out(MSB)</span>
            </div>
          </div>
        </section>

        {/* ─── 8. FAQ Section ─────────────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <FAQTemplate
            title="2’s Complement Representation FAQs"
            questions={questions}
          />
        </section>

        {/* ─── 9. Teacher's Note ──────────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <Teacher
            note={
              "2's Complement is the bedrock of modern computing. Always remember: in 2's complement, you NEVER subtract directly. You invert the second operand, add 1 (achieved in hardware by setting Carry-In = 1), add them together, and discard the end carry! Pay special attention to the asymmetric range: for 8 bits, it is -128 to +127. That extra negative number (-128) is a classic interview question and source of production bugs."
            }
          />
        </section>

        {/* ─── 10. Printable Plain Text Document ──────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            title="Topic 7: 2’s Complement Representation of Negative Numbers"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note"
            downloadFileName="topic7_twos_complement_representation_note.txt"
          />
        </section>

      </div>
    </>
  );
};

export default Topic7;
