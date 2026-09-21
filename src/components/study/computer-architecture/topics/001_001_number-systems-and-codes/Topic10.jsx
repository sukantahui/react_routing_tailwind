import React, { useState, useEffect, useRef, useMemo } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic10_files/topic10_questions";
import noteText from "./topic10_files/topic10_note.txt?raw";

/**
 * Topic10 – Overflow detection in signed arithmetic
 * Module: 001_001_number-systems-and-codes (Number Systems & Binary Codes)
 * Track: Computer Architecture – From Core Systems to Performance Engineering
 */
const Topic10 = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [valA, setValA] = useState("100");
  const [valB, setValB] = useState("50");
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
    if (num === 0) return { binary: "00000000", isNeg: false };
    const isNeg = num < 0;
    const twosVal = isNeg ? 256 + num : num;
    const bin = twosVal.toString(2).padStart(8, "0");
    return { binary: bin, isNeg };
  };

  // 8-Bit Overflow Analysis Engine
  const overflowData = useMemo(() => {
    const a = parseInt(valA, 10);
    const b = parseInt(valB, 10);

    if (isNaN(a) || isNaN(b) || a < -128 || a > 127 || b < -128 || b > 127) {
      return { error: "Please enter integers between -128 and +127 (8-bit signed limits)", isError: true };
    }

    const binA = toTwosComp(a).binary;
    const binB = toTwosComp(b).binary;

    // Bitwise addition with carry tracking
    let carry = 0;
    let sumBits = [];
    let carries = [0];

    for (let i = 7; i >= 0; i--) {
      const bitA = parseInt(binA[i], 10);
      const bitB = parseInt(binB[i], 10);
      const sum = bitA + bitB + carry;
      sumBits.unshift(sum % 2);
      carry = Math.floor(sum / 2);
      carries.unshift(carry);
    }

    const resultBin = sumBits.join("");
    const endCarry = carry;
    const carryInMSB = carries[1]; // C7: carry into MSB
    const carryOutMSB = carries[0]; // C8: carry out of MSB

    // Decode signed result
    const msb = sumBits[0];
    let decodedDec = -msb * 128;
    for (let i = 1; i < 8; i++) {
      decodedDec += sumBits[i] * Math.pow(2, 7 - i);
    }

    const theoreticalSum = a + b;
    const isOverflow = carryInMSB !== carryOutMSB;
    const signA = parseInt(binA[0], 10);
    const signB = parseInt(binB[0], 10);
    const signRes = msb;

    // Algebraic Sign Rule Check
    let signRuleMessage = "No Overflow: Signs are consistent or opposite";
    if (signA === 0 && signB === 0 && signRes === 1) {
      signRuleMessage = "POSITIVE OVERFLOW! (+A) + (+B) produced a Negative result!";
    } else if (signA === 1 && signB === 1 && signRes === 0) {
      signRuleMessage = "NEGATIVE UNDERFLOW! (-A) + (-B) produced a Positive result!";
    }

    return {
      a,
      b,
      binA,
      binB,
      carries,
      resultBin,
      carryInMSB,
      carryOutMSB,
      endCarry,
      decodedDec,
      theoreticalSum,
      isOverflow,
      signRuleMessage,
      zeroFlag: resultBin === "00000000",
      signFlag: signRes === 1,
      carryFlag: endCarry === 1,
      overflowFlag: isOverflow ? 1 : 0,
      hex: "0x" + parseInt(resultBin, 2).toString(16).toUpperCase().padStart(2, "0"),
      isError: false
    };
  }, [valA, valB]);

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
            <span>Computer Architecture Masterclass · Module 001 · Topic 10</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight mb-4">
            Overflow Detection in Signed Arithmetic
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Understand how digital processors detect when arithmetic results exceed physical register limits: master the Algebraic Sign Rule, the single-gate Carry-XOR detector ($V = C_n \oplus C_{n-1}$), and software exception handling.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-teal-300">
              ⚖️ Algebraic Sign Rule
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-cyan-300">
              ⚡ Hardware 1-Gate Detector (C_n ⊕ C_n-1)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-indigo-300">
              🚩 Carry Flag (CF) vs Overflow Flag (OF)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-amber-300">
              🛡️ Safe Rust / GCC __builtin_add_overflow
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
                Classroom Lecture: The Two Universal Rules of Overflow
              </h2>
              <p className="text-xs text-slate-400">
                Sukanta Hui · Coder &amp; AccoTax · Shibtala Road, Barrackpore
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
            <p>
              In digital silicon, when you add two 8-bit positive numbers like <code className="text-teal-300 font-mono">+100 + +50 = +150</code>, the mathematical answer 150 requires 9 bits. Because the 8-bit register can only reach <code className="text-teal-300 font-mono">+127</code>, the 8th bit spills over into the sign bit, flipping the result to <code className="text-red-400 font-mono font-bold">-106</code>!
            </p>
            <p>
              How does the CPU know this catastrophe happened? Through two mathematically identical methods:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-teal-400 font-bold text-xs uppercase mb-1">Method 1: Algebraic Sign Rule</div>
                <p className="text-xs text-slate-300">
                  • Positive + Positive = Negative → <strong className="text-red-400">OVERFLOW!</strong>
                  <br />
                  • Negative + Negative = Positive → <strong className="text-red-400">UNDERFLOW!</strong>
                  <br />
                  • Opposite signs (+ and -) → <strong className="text-emerald-400">NEVER OVERFLOWS!</strong>
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-cyan-400 font-bold text-xs uppercase mb-1">Method 2: Hardware Carry-XOR Rule</div>
                <p className="text-xs text-slate-300 font-mono">
                  <span className="text-teal-300 font-bold">V = C_n ⊕ C_(n-1)</span>
                  <br />
                  <span className="text-slate-400 font-sans text-xs">
                    A single 2-input XOR gate comparing Carry-In to the MSB and Carry-Out from the MSB detects overflow in sub-nanosecond time!
                  </span>
                </p>
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
                Interactive vector schematics detailing algebraic sign truth tables, single XOR gate detectors, and exception trapping.
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
                1. Algebraic Sign Matrix
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
                2. 1-Gate XOR Detector
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
                3. Software Exception Trapping
              </button>
            </div>
          </div>

          {/* Tab 1: Algebraic Sign Matrix */}
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
                    Algebraic Sign Rule &amp; Overflow Truth Table Matrix
                  </text>

                  {/* 4 Outcome Rows */}
                  <g transform="translate(40, 75)">
                    {/* Row 1: Pos + Pos -> Pos (OK) */}
                    <rect x="0" y="0" width="720" height="50" rx="6" fill="#042f2e" stroke="#0d9488" />
                    <text x="20" y="30" fill="#a7f3d0" fontSize="12" fontWeight="bold">Sign A: 0 (+)</text>
                    <text x="160" y="30" fill="#a7f3d0" fontSize="12" fontWeight="bold">Sign B: 0 (+)</text>
                    <text x="300" y="30" fill="#a7f3d0" fontSize="12" fontWeight="bold">Sum Sign: 0 (+)</text>
                    <text x="480" y="30" fill="#5eead4" fontSize="13" fontWeight="bold">OF = 0 (Valid Positive)</text>

                    {/* Row 2: Pos + Pos -> Neg (Overflow) */}
                    <rect x="0" y="60" width="720" height="50" rx="6" fill="#450a0a" stroke="#dc2626" />
                    <text x="20" y="90" fill="#fca5a5" fontSize="12" fontWeight="bold">Sign A: 0 (+)</text>
                    <text x="160" y="90" fill="#fca5a5" fontSize="12" fontWeight="bold">Sign B: 0 (+)</text>
                    <text x="300" y="90" fill="#ef4444" fontSize="12" fontWeight="bold">Sum Sign: 1 (-)</text>
                    <text x="480" y="90" fill="#f87171" fontSize="13" fontWeight="bold">OF = 1 (POSITIVE OVERFLOW!)</text>

                    {/* Row 3: Neg + Neg -> Pos (Underflow) */}
                    <rect x="0" y="120" width="720" height="50" rx="6" fill="#450a0a" stroke="#dc2626" />
                    <text x="20" y="150" fill="#fca5a5" fontSize="12" fontWeight="bold">Sign A: 1 (-)</text>
                    <text x="160" y="150" fill="#fca5a5" fontSize="12" fontWeight="bold">Sign B: 1 (-)</text>
                    <text x="300" y="150" fill="#6ee7b7" fontSize="12" fontWeight="bold">Sum Sign: 0 (+)</text>
                    <text x="480" y="150" fill="#f87171" fontSize="13" fontWeight="bold">OF = 1 (NEGATIVE UNDERFLOW!)</text>

                    {/* Row 4: Neg + Neg -> Neg (OK) */}
                    <rect x="0" y="180" width="720" height="50" rx="6" fill="#042f2e" stroke="#0d9488" />
                    <text x="20" y="210" fill="#a7f3d0" fontSize="12" fontWeight="bold">Sign A: 1 (-)</text>
                    <text x="160" y="210" fill="#a7f3d0" fontSize="12" fontWeight="bold">Sign B: 1 (-)</text>
                    <text x="300" y="210" fill="#fca5a5" fontSize="12" fontWeight="bold">Sum Sign: 1 (-)</text>
                    <text x="480" y="210" fill="#5eead4" fontSize="13" fontWeight="bold">OF = 0 (Valid Negative)</text>
                  </g>

                  {/* Summary */}
                  <rect x="40" y="315" width="720" height="30" rx="6" fill="#0f172a" stroke="#334155" />
                  <text x="400" y="335" fill="#cbd5e1" fontSize="11" textAnchor="middle">
                    Opposite Sign Additions (0+1 or 1+0) are completely omitted because OF is always 0.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-slate-400">
                💡 <strong>Truth Table Summary:</strong> Overflow only happens in two scenarios: two positives making a negative, or two negatives making a positive!
              </p>
            </div>
          )}

          {/* Tab 2: XOR Detector */}
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
                    Hardware Synthesis: 1-Gate XOR Overflow Detector (V = C_n ⊕ C_n-1)
                  </text>

                  {/* MSB Full Adder Cell */}
                  <rect x="80" y="90" width="220" height="150" rx="8" fill="#042f2e" stroke="#0d9488" strokeWidth="2" />
                  <text x="190" y="120" fill="#5eead4" fontSize="14" fontWeight="bold" textAnchor="middle">
                    MSB FULL ADDER (Bit 7)
                  </text>
                  <text x="100" y="155" fill="#cbd5e1" fontSize="12">Inputs: A₇, B₇</text>
                  <text x="100" y="185" fill="#f59e0b" fontSize="12" fontWeight="bold">Carry-In (C₇)</text>
                  <text x="100" y="215" fill="#f59e0b" fontSize="12" fontWeight="bold">Carry-Out (C₈)</text>

                  {/* Connecting Wires to XOR Gate */}
                  <line x1="300" y1="180" x2="420" y2="180" stroke="#f59e0b" strokeWidth="2.5" />
                  <line x1="300" y1="210" x2="420" y2="210" stroke="#f59e0b" strokeWidth="2.5" />

                  {/* XOR Gate Symbol Box */}
                  <rect x="420" y="160" width="120" height="70" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                  <text x="480" y="200" fill="#c7d2fe" fontSize="18" fontWeight="bold" textAnchor="middle">XOR ⊕</text>

                  {/* Output Wire */}
                  <line x1="540" y1="195" x2="620" y2="195" stroke="#2dd4bf" strokeWidth="3" />

                  {/* Flag Output Box */}
                  <rect x="620" y="165" width="120" height="60" rx="8" fill="#0f172a" stroke="#14b8a6" strokeWidth="2" />
                  <text x="680" y="200" fill="#2dd4bf" fontSize="16" fontWeight="bold" textAnchor="middle">
                    OF FLAG (V)
                  </text>

                  {/* Explanation Footer */}
                  <rect x="40" y="270" width="720" height="70" rx="8" fill="#0f172a" stroke="#334155" />
                  <text x="60" y="295" fill="#38bdf8" fontSize="12" fontWeight="bold">
                    Why XOR Works Universally:
                  </text>
                  <text x="60" y="318" fill="#cbd5e1" fontSize="11">
                    C₇ ⊕ C₈ is 1 if and only if carry into MSB does not match carry out of MSB. 1 gate delay = ~10 picoseconds!
                  </text>
                </svg>
              </div>
              <p className="text-xs text-slate-400">
                ⚡ <strong>Silicon Efficiency:</strong> Instead of checking 3 separate sign bits with multiple gates, CPU designers connect a single XOR gate to the MSB carry lines!
              </p>
            </div>
          )}

          {/* Tab 3: Software Trapping */}
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
                    Software Handling: Conditional Branching, Hardware Trapping &amp; Saturating
                  </text>

                  {/* 3 Handling Methods */}
                  <g transform="translate(40, 75)">
                    {/* Method 1: Branching */}
                    <rect x="0" y="0" width="225" height="170" rx="8" fill="#0f172a" stroke="#334155" />
                    <text x="112" y="25" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">1. CONDITIONAL JUMP</text>
                    <text x="15" y="55" fill="#e2e8f0" fontSize="11" fontFamily="monospace">ADD EAX, EBX</text>
                    <text x="15" y="80" fill="#f59e0b" fontSize="11" fontFamily="monospace">JO overflow_handler</text>
                    <text x="15" y="115" fill="#cbd5e1" fontSize="11">
                      • Explicit branch on OF=1
                    </text>
                    <text x="15" y="140" fill="#94a3b8" fontSize="10">
                      Standard assembly pattern
                    </text>

                    {/* Method 2: Hardware Traps */}
                    <rect x="245" y="0" width="225" height="170" rx="8" fill="#0f172a" stroke="#334155" />
                    <text x="357" y="25" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">2. HARDWARE TRAP</text>
                    <text x="260" y="55" fill="#e2e8f0" fontSize="11" fontFamily="monospace">ADD EAX, EBX</text>
                    <text x="260" y="80" fill="#f59e0b" fontSize="11" fontFamily="monospace">INTO  ; Trap Vector 4</text>
                    <text x="260" y="115" fill="#cbd5e1" fontSize="11">
                      • CPU generates exception
                    </text>
                    <text x="260" y="140" fill="#94a3b8" fontSize="10">
                      Zero branch penalty in normal path
                    </text>

                    {/* Method 3: Saturating Clamp */}
                    <rect x="490" y="0" width="230" height="170" rx="8" fill="#042f2e" stroke="#0d9488" />
                    <text x="605" y="25" fill="#5eead4" fontSize="12" fontWeight="bold" textAnchor="middle">3. SATURATING CLAMP</text>
                    <text x="505" y="55" fill="#e2e8f0" fontSize="11" fontFamily="monospace">PADDSB XMM0, XMM1</text>
                    <text x="505" y="80" fill="#a7f3d0" fontSize="11">
                      • Clamps to +127 or -128
                    </text>
                    <text x="505" y="115" fill="#cbd5e1" fontSize="11">
                      • Never wraps around!
                    </text>
                    <text x="505" y="140" fill="#99f6e4" fontSize="10">
                      Used in DSP, Audio, and GPUs
                    </text>
                  </g>

                  {/* Rust / GCC Note */}
                  <rect x="40" y="265" width="720" height="50" rx="6" fill="#1e1b4b" stroke="#6366f1" />
                  <text x="400" y="295" fill="#c7d2fe" fontSize="12" fontWeight="bold" textAnchor="middle">
                    Modern Compiler Safety: Rust debug panics &amp; GCC __builtin_add_overflow() prevent CVE exploits!
                  </text>
                </svg>
              </div>
              <p className="text-xs text-slate-400">
                🛡️ <strong>Compiler Safety:</strong> In mission-critical software, never allow integer overflows to go undetected. Use compiler built-ins or saturating instructions!
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
                Interactive Signed Overflow &amp; Gate-Level Carry Tracer
              </h2>
              <p className="text-xs text-slate-400">
                Test boundary conditions, inspect C₇ vs C₈ carry bit states, and observe instant Overflow Flag assertions.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Input Controls */}
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
                    placeholder="e.g. 100"
                  />
                  <button
                    onClick={() => { setValA("100"); setValB("50"); }}
                    className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-[11px] font-semibold rounded text-slate-300"
                  >
                    +100 + +50 (Overflow)
                  </button>
                  <button
                    onClick={() => { setValA("-100"); setValB("-50"); }}
                    className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-[11px] font-semibold rounded text-slate-300"
                  >
                    -100 + -50 (Underflow)
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
                    placeholder="e.g. 50"
                  />
                  <button
                    onClick={() => { setValA("127"); setValB("1"); }}
                    className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-[11px] font-semibold rounded text-slate-300"
                  >
                    +127 + +1 (Wrap)
                  </button>
                  <button
                    onClick={() => { setValA("50"); setValB("-20"); }}
                    className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-[11px] font-semibold rounded text-slate-300"
                  >
                    +50 + -20 (Safe)
                  </button>
                </div>
              </div>

              {overflowData.isError ? (
                <div className="p-3 rounded-lg bg-red-950/60 border border-red-700/50 text-red-300 text-xs">
                  {overflowData.error}
                </div>
              ) : (
                <div className={clsx(
                  "p-4 rounded-xl border space-y-2 text-xs",
                  overflowData.isOverflow
                    ? "bg-red-950/40 border-red-500 text-red-300"
                    : "bg-emerald-950/40 border-emerald-500 text-emerald-300"
                )}>
                  <div className="font-bold text-sm">
                    {overflowData.isOverflow ? "⚠️ OVERFLOW DETECTED!" : "✓ ARITHMETIC RESULT VALID"}
                  </div>
                  <div className="text-xs">{overflowData.signRuleMessage}</div>
                </div>
              )}
            </div>

            {/* Right: Gate-Level Trace & Flags */}
            {!overflowData.isError && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-teal-500/40 space-y-3 font-mono text-xs">
                  <div className="text-slate-400 font-sans font-bold uppercase tracking-wider text-[11px]">
                    ALU Carry-XOR Gate &amp; Bit Trace:
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                    <div className="flex justify-between text-amber-400 text-[11px]">
                      <span>Carry-In to MSB (C₇): {overflowData.carryInMSB}</span>
                      <span>Carry-Out of MSB (C₈): {overflowData.carryOutMSB}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>  {overflowData.binA}</span>
                      <span>({overflowData.a})</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>+ {overflowData.binB}</span>
                      <span>({overflowData.b})</span>
                    </div>
                    <div className="border-t border-teal-500 pt-1 flex justify-between font-bold text-sm">
                      <span className="text-white">= {overflowData.resultBin}</span>
                      <span className={overflowData.isOverflow ? "text-red-400" : "text-teal-300"}>
                        {overflowData.decodedDec} ({overflowData.hex})
                      </span>
                    </div>
                    <div className="text-slate-400 text-[11px] pt-1">
                      Theoretical Math Sum: <span className="text-white font-bold">{overflowData.theoreticalSum}</span>
                    </div>
                  </div>

                  {/* XOR Gate Evaluation */}
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-indigo-500/40 text-indigo-300 flex justify-between items-center text-xs">
                    <span>XOR Gate: V = C₈ ⊕ C₇ = {overflowData.carryOutMSB} ⊕ {overflowData.carryInMSB}</span>
                    <span className={clsx(
                      "font-bold font-mono px-2 py-0.5 rounded",
                      overflowData.isOverflow ? "bg-red-900 text-red-200" : "bg-teal-900 text-teal-200"
                    )}>
                      OF = {overflowData.overflowFlag}
                    </span>
                  </div>

                  {/* CPU Flags */}
                  <div className="grid grid-cols-4 gap-2 text-center pt-2 border-t border-slate-800">
                    <div className={clsx(
                      "p-2 rounded border text-xs",
                      overflowData.zeroFlag ? "bg-teal-950 border-teal-500 text-teal-300 font-bold" : "bg-slate-900 border-slate-800 text-slate-500"
                    )}>
                      ZF = {overflowData.zeroFlag ? "1" : "0"}
                      <div className="text-[9px] font-normal">Zero</div>
                    </div>
                    <div className={clsx(
                      "p-2 rounded border text-xs",
                      overflowData.signFlag ? "bg-teal-950 border-teal-500 text-teal-300 font-bold" : "bg-slate-900 border-slate-800 text-slate-500"
                    )}>
                      SF = {overflowData.signFlag ? "1" : "0"}
                      <div className="text-[9px] font-normal">Sign</div>
                    </div>
                    <div className={clsx(
                      "p-2 rounded border text-xs",
                      overflowData.carryFlag ? "bg-amber-950 border-amber-500 text-amber-300 font-bold" : "bg-slate-900 border-slate-800 text-slate-500"
                    )}>
                      CF = {overflowData.carryFlag ? "1" : "0"}
                      <div className="text-[9px] font-normal">Carry</div>
                    </div>
                    <div className={clsx(
                      "p-2 rounded border text-xs font-bold",
                      overflowData.isOverflow ? "bg-red-950 border-red-500 text-red-300" : "bg-slate-900 border-slate-800 text-slate-500"
                    )}>
                      OF = {overflowData.overflowFlag}
                      <div className="text-[9px] font-normal">Overflow</div>
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
              Where overflow detection prevents catastrophic flight disasters, security exploits, and financial losses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Scenario 1: Mamata */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-teal-500/40 transition-all">
              <div className="flex items-center gap-2 text-teal-400 font-semibold text-sm mb-2">
                <span>📍</span>
                <span>Barrackpore: Avionics Rate-of-Climb Variometer Safety</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Mamata</strong> writes flight safety firmware in Barrackpore. When calculating vertical climb velocity, she monitors the CPU's <code className="text-teal-300 font-mono">OF</code> flag. If a sudden jet climb rate exceeds <code className="text-teal-300 font-mono">+127 m/s</code>, the variometer clamps to maximum climb rate rather than wrapping into an erroneous <code className="text-red-400 font-mono">-128 m/s</code> dive indication.
              </p>
            </div>

            {/* Scenario 2: Susmita */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 transition-all">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm mb-2">
                <span>📍</span>
                <span>Ichapur: 64-Bit RISC-V SoC Single-Gate Flag Synthesis</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Susmita</strong> synthesizes an ASIC processor core in Ichapur. She implements the hardware overflow detector with a single XOR gate connected to the 64-bit carry lookahead adder (<code className="text-cyan-300 font-mono">assign OF = C[64] ^ C[63];</code>), keeping ALU branch instruction latency strictly under 0.25 nanoseconds.
              </p>
            </div>

            {/* Scenario 3: Debangshu */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all">
              <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm mb-2">
                <span>📍</span>
                <span>Jadavpur: Compiler Undefined Behavior (UB) Security Auditing</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Debangshu</strong> is auditing C web server code at Jadavpur University. He finds a critical bug where the developer wrote <code className="text-indigo-300 font-mono">if (len + 100 &lt; len) return ERROR;</code>. Modern compilers optimize this entire check away as dead code because signed overflow is undefined behavior. Debangshu refactors the check using <code className="text-amber-300 font-mono">__builtin_add_overflow()</code>.
              </p>
            </div>

            {/* Scenario 4: Mahima */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/40 transition-all">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm mb-2">
                <span>📍</span>
                <span>Kolkata: High-Frequency Stock Trading Currency Settlement</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Mahima</strong> builds zero-copy transaction clearing in Salt Lake, Kolkata. She leverages assembly conditional jump on overflow (<code className="text-amber-300 font-mono">JO</code>) to immediately trap illegal transaction volume spikes, permanently blocking arithmetic wraparound exploits across financial trading portals.
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
                <span><strong>Checking for Overflow After it Occurs in C:</strong> Writing <code className="text-red-300 font-mono">if (a + b &lt; a)</code> is Undefined Behavior and gets deleted by optimizing compilers!</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">•</span>
                <span><strong>Confusing Carry (CF) and Overflow (OF):</strong> Carry Flag is for unsigned numbers; Overflow Flag is for signed 2's complement numbers.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">•</span>
                <span><strong>Thinking Opposite Signs Can Overflow:</strong> Adding a positive and a negative number can NEVER cause an overflow.</span>
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
                <span><strong>Use Compiler Built-ins:</strong> Use <code className="text-teal-300 font-mono">__builtin_add_overflow()</code> in C/C++ or Rust checked arithmetic for guaranteed safety.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">•</span>
                <span><strong>Hardware 1-Gate XOR Detector:</strong> Implement <code className="text-teal-300 font-mono">OF = C_n ^ C_(n-1)</code> in Verilog/VHDL for sub-nanosecond flag generation.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">•</span>
                <span><strong>Use Saturating Math for Media:</strong> In audio DSP and neural networks, use saturating instructions to clamp values rather than wrapping.</span>
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
              <span>Signed Overflow: Pos + Pos = Neg OR Neg + Neg = Pos</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
              <span className="text-teal-400 font-bold">✓</span>
              <span>Opposite sign addition CANNOT overflow</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
              <span className="text-teal-400 font-bold">✓</span>
              <span>Hardware detector: V = C_n ⊕ C_(n-1)</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
              <span className="text-teal-400 font-bold">✓</span>
              <span>CF = Unsigned Overflow; OF = Signed Overflow</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
              <span className="text-teal-400 font-bold">✓</span>
              <span>Assembly: JO / JNO (x86) and BVS / BVC (ARM)</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
              <span className="text-teal-400 font-bold">✓</span>
              <span>Signed overflow is Undefined Behavior (UB) in C/C++</span>
            </div>
          </div>
        </section>

        {/* ─── 8. FAQ Section ─────────────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <FAQTemplate
            title="Overflow Detection in Signed Arithmetic FAQs"
            questions={questions}
          />
        </section>

        {/* ─── 9. Teacher's Note ──────────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <Teacher
            note={
              "Overflow detection is one of the most heavily tested topics in competitive programming and computer architecture exams. Always remember: in an n-bit adder, C_n is the carry OUT of the MSB, and C_(n-1) is the carry INTO the MSB. When asked to design an overflow circuit, write the single XOR equation: V = C_n ⊕ C_(n-1). This single gate provides 100% complete and accurate overflow detection for any bit width!"
            }
          />
        </section>

        {/* ─── 10. Printable Plain Text Document ──────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            title="Topic 10: Overflow Detection in Signed Arithmetic"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note"
            downloadFileName="topic10_overflow_detection_signed_arithmetic_note.txt"
          />
        </section>

      </div>
    </>
  );
};

export default Topic10;
