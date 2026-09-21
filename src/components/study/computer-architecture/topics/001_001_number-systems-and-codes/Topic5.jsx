import React, { useState, useEffect, useRef, useMemo } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";

/**
 * Topic5 – Sign-Magnitude representation of negative numbers
 * Module: 001_001_number-systems-and-codes (Number Systems & Binary Codes)
 * Track: Computer Architecture – From Core Systems to Performance Engineering
 */
const Topic5 = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [inputValue, setInputValue] = useState("-43");
  const [manualSign, setManualSign] = useState("1"); // for dual zero test
  const [manualMag, setManualMag] = useState("0");
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

  // Convert decimal to 8-bit Sign-Magnitude
  const signMagData = useMemo(() => {
    const val = parseInt(inputValue, 10);
    if (isNaN(val) || val < -127 || val > 127) {
      return { error: "Please enter an integer between -127 and +127 (8-bit limit)", isError: true };
    }

    const isNegative = val < 0;
    const signBit = isNegative ? 1 : 0;
    const absVal = Math.abs(val);
    const magBits = absVal.toString(2).padStart(7, "0");
    const fullBinary = `${signBit}${magBits}`;
    const hex = "0x" + parseInt(fullBinary, 2).toString(16).toUpperCase().padStart(2, "0");

    return {
      val,
      isNegative,
      signBit,
      absVal,
      magBits,
      fullBinary,
      hex,
      isError: false
    };
  }, [inputValue]);

  // Dual Zero Tester
  const dualZeroResult = useMemo(() => {
    const s = manualSign === "1" ? 1 : 0;
    const m = Math.min(127, Math.max(0, parseInt(manualMag, 10) || 0));
    const mBits = m.toString(2).padStart(7, "0");
    const binary = `${s}${mBits}`;
    const hex = "0x" + parseInt(binary, 2).toString(16).toUpperCase().padStart(2, "0");
    const displayVal = m === 0 ? (s === 1 ? "-0 (Negative Zero)" : "+0 (Positive Zero)") : (s === 1 ? `-${m}` : `+${m}`);

    return {
      signBit: s,
      magVal: m,
      magBits: mBits,
      binary,
      hex,
      displayVal,
      isZero: m === 0
    };
  }, [manualSign, manualMag]);

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
            <span>Computer Architecture Masterclass · Module 001 · Topic 5</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight mb-4">
            Sign-Magnitude Representation of Negative Numbers
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Understand the intuitive human-style signed binary format, explore the dual zero (+0 / -0) anomaly, analyze hardware ALU addition complexities, and examine its modern role in IEEE-754 floating-point standards.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-teal-300">
              🏷️ 1 Sign Bit + (n-1) Magnitude Bits
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-cyan-300">
              ⚠️ Dual Zero Anomaly (+0 and -0)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-indigo-300">
              ⚖️ ALU Magnitude Comparator Bottleneck
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-amber-300">
              🚀 IEEE-754 Floating-Point Standard
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
                Classroom Lecture: Intuitive to Humans, Complex for Silicon
              </h2>
              <p className="text-xs text-slate-400">
                Sukanta Hui · Coder &amp; AccoTax · Shibtala Road, Barrackpore
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
            <p>
              When human beings write negative numbers on paper, we write a minus sign followed by the positive magnitude (e.g., <code className="text-teal-300 font-mono">-43</code>). The <strong>Sign-Magnitude</strong> format is the direct digital translation of this concept.
            </p>
            <p>
              In an 8-bit register, the Most Significant Bit (MSB, bit 7) acts as the sign flag:
              <br />
              • <code className="text-emerald-400 font-mono font-bold">0</code> = Positive (+)
              <br />
              • <code className="text-red-400 font-mono font-bold">1</code> = Negative (-)
              <br />
              The remaining 7 bits (bits 6..0) represent the true unsigned magnitude (<code className="text-cyan-300 font-mono">0 to 127</code>).
            </p>
            <p>
              While this is very easy for humans to read, it introduces two massive hardware problems:
              <br />
              1. <strong>Dual Zero:</strong> There are two binary patterns for zero (<code className="text-teal-300 font-mono">+0 = 0000 0000</code> and <code className="text-amber-300 font-mono">-0 = 1000 0000</code>).
              <br />
              2. <strong>ALU Inefficiency:</strong> Adding <code className="text-teal-300 font-mono">+5 (0000 0101)</code> and <code className="text-red-400 font-mono">-5 (1000 0101)</code> using a regular binary adder produces <code className="text-red-400 font-mono">1000 1010 (-10)</code>, which is completely wrong! The hardware must use separate magnitude comparators, adders, and subtractors.
            </p>
          </div>

          {/* Key Formula Box */}
          <div className="mt-8 p-4 rounded-xl border border-slate-800 bg-slate-950/80 font-mono text-xs sm:text-sm space-y-2">
            <div className="text-teal-400 font-bold uppercase tracking-wider">
              Mathematical Definition:
            </div>
            <div className="text-slate-200">
              V = (-1)<sup>b<sub>n-1</sub></sup> × ∑<sub>i=0</sub><sup>n-2</sup> (b<sub>i</sub> × 2<sup>i</sup>)
            </div>
            <div className="text-slate-400 text-xs">
              Range for n bits: [ -(2<sup>n-1</sup> - 1) to +(2<sup>n-1</sup> - 1) ] · 8-bit range: [-127 to +127]
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
                Interactive SVG diagrams detailing register bit fields, ALU magnitude comparison logic, and IEEE-754 floating point.
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
                1. Register &amp; Dual Zero
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
                2. ALU Addition Flowchart
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
                3. IEEE-754 Floating-Point
              </button>
            </div>
          </div>

          {/* Tab 1: Register & Dual Zero */}
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
                    8-Bit Sign-Magnitude Register Layout &amp; Dual Zero Anomaly
                  </text>

                  {/* Register Bit Cells */}
                  <g transform="translate(40, 75)">
                    {/* Sign Bit */}
                    <rect x="0" y="0" width="90" height="70" rx="6" fill="#7f1d1d" stroke="#ef4444" strokeWidth="2" />
                    <text x="45" y="30" fill="#fca5a5" fontSize="11" fontWeight="bold" textAnchor="middle">SIGN (b7)</text>
                    <text x="45" y="55" fill="#ffffff" fontSize="18" fontWeight="bold" fontFamily="monospace" textAnchor="middle">0 / 1</text>

                    {/* 7 Magnitude Bits */}
                    {[64, 32, 16, 8, 4, 2, 1].map((weight, idx) => (
                      <g key={idx}>
                        <rect
                          x={95 + idx * 90}
                          y="0"
                          width="85"
                          height="70"
                          rx="6"
                          fill="#042f2e"
                          stroke="#0d9488"
                          strokeWidth="1.5"
                        />
                        <text x={137 + idx * 90} y="30" fill="#99f6e4" fontSize="10" textAnchor="middle">
                          b{6 - idx} (+{weight})
                        </text>
                        <text x={137 + idx * 90} y="55" fill="#5eead4" fontSize="16" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                          Mag
                        </text>
                      </g>
                    ))}
                  </g>

                  {/* Positive Zero Box */}
                  <g transform="translate(40, 165)">
                    <rect x="0" y="0" width="350" height="80" rx="8" fill="#064e3b" stroke="#059669" strokeWidth="2" />
                    <text x="20" y="30" fill="#6ee7b7" fontSize="13" fontWeight="bold">
                      POSITIVE ZERO (+0):
                    </text>
                    <text x="20" y="60" fill="#ffffff" fontSize="18" fontWeight="bold" fontFamily="monospace">
                      <tspan fill="#6ee7b7">0</tspan> 0000000 (0x00)
                    </text>
                  </g>

                  {/* Negative Zero Box */}
                  <g transform="translate(410, 165)">
                    <rect x="0" y="0" width="350" height="80" rx="8" fill="#450a0a" stroke="#dc2626" strokeWidth="2" />
                    <text x="20" y="30" fill="#fca5a5" fontSize="13" fontWeight="bold">
                      NEGATIVE ZERO (-0):
                    </text>
                    <text x="20" y="60" fill="#ffffff" fontSize="18" fontWeight="bold" fontFamily="monospace">
                      <tspan fill="#f87171">1</tspan> 0000000 (0x80)
                    </text>
                  </g>

                  {/* Summary Banner */}
                  <rect x="40" y="260" width="720" height="80" rx="8" fill="#0f172a" stroke="#334155" />
                  <text x="60" y="285" fill="#f59e0b" fontSize="12" fontWeight="bold">
                    Hardware Inefficiency of Dual Zero:
                  </text>
                  <text x="60" y="307" fill="#cbd5e1" fontSize="12">
                    • Wastes 1 distinct encoding slot out of 256 states (yields only 255 unique values: -127 to +127).
                  </text>
                  <text x="60" y="327" fill="#cbd5e1" fontSize="12">
                    • Requires zero-comparator logic to test if (val == 0x00 || val == 0x80) instead of a simple NOR gate.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-slate-400">
                💡 <strong>Instructor Insight:</strong> Notice how <code className="text-teal-300">0x80</code> represents <code className="text-red-400">-0</code> in Sign-Magnitude, but represents <code className="text-teal-300">-128</code> in 2's Complement! Always verify which encoding your architecture uses.
              </p>
            </div>
          )}

          {/* Tab 2: ALU Addition Flowchart */}
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
                    Sign-Magnitude Hardware ALU Addition &amp; Subtraction Logic Path
                  </text>

                  {/* Step 1: Sign Comparison */}
                  <rect x="40" y="75" width="220" height="70" rx="8" fill="#0f172a" stroke="#6366f1" strokeWidth="2" />
                  <text x="150" y="102" fill="#c7d2fe" fontSize="12" fontWeight="bold" textAnchor="middle">1. COMPARE SIGNS</text>
                  <text x="150" y="125" fill="#e2e8f0" fontSize="12" fontFamily="monospace" textAnchor="middle">Sign_A == Sign_B ?</text>

                  {/* Branch A: Same Signs */}
                  <rect x="300" y="75" width="460" height="70" rx="8" fill="#064e3b" stroke="#059669" strokeWidth="1.5" />
                  <text x="320" y="102" fill="#a7f3d0" fontSize="12" fontWeight="bold">IF SAME SIGN: Simple Magnitude Addition</text>
                  <text x="320" y="125" fill="#e2e8f0" fontSize="12" fontFamily="monospace">Mag_Result = Mag_A + Mag_B | Sign_Result = Sign_A</text>

                  {/* Step 2: Different Signs -> Magnitude Comparator */}
                  <rect x="40" y="165" width="220" height="85" rx="8" fill="#7f1d1d" stroke="#ef4444" strokeWidth="2" />
                  <text x="150" y="195" fill="#fca5a5" fontSize="12" fontWeight="bold" textAnchor="middle">2. IF SIGNS DIFFER</text>
                  <text x="150" y="220" fill="#ffffff" fontSize="11" textAnchor="middle">Magnitude Comparator:</text>
                  <text x="150" y="238" fill="#fecaca" fontSize="11" fontFamily="monospace" textAnchor="middle">|Mag_A| vs |Mag_B|</text>

                  {/* Branch B1: |A| >= |B| */}
                  <rect x="300" y="165" width="460" height="85" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                  <text x="320" y="195" fill="#38bdf8" fontSize="12" fontWeight="bold">Case 1: |Mag_A| ≥ |Mag_B|</text>
                  <text x="320" y="215" fill="#e2e8f0" fontSize="12" fontFamily="monospace">Mag_Result = Mag_A - Mag_B</text>
                  <text x="320" y="235" fill="#e2e8f0" fontSize="12" fontFamily="monospace">Sign_Result = Sign_A</text>

                  {/* Branch B2: |A| < |B| */}
                  <rect x="40" y="265" width="720" height="75" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                  <text x="60" y="295" fill="#c7d2fe" fontSize="12" fontWeight="bold">Case 2: |Mag_A| &lt; |Mag_B|</text>
                  <text x="60" y="320" fill="#e2e8f0" fontSize="12" fontFamily="monospace">Mag_Result = Mag_B - Mag_A | Sign_Result = Sign_B</text>
                </svg>
              </div>
              <p className="text-xs text-slate-400">
                ⚖️ <strong>ALU Trade-off:</strong> Look at how many conditional branches and hardware comparators are needed for simple addition! This is why 2's complement replaced Sign-Magnitude in CPU integer ALUs.
              </p>
            </div>
          )}

          {/* Tab 3: IEEE-754 Floating-Point */}
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
                    Modern Survival: IEEE-754 32-Bit Single-Precision Float Uses Sign-Magnitude
                  </text>

                  {/* Float Register Map */}
                  <g transform="translate(40, 80)">
                    {/* Sign Bit */}
                    <rect x="0" y="0" width="70" height="80" rx="6" fill="#7f1d1d" stroke="#ef4444" strokeWidth="2" />
                    <text x="35" y="30" fill="#fca5a5" fontSize="11" fontWeight="bold" textAnchor="middle">SIGN (S)</text>
                    <text x="35" y="55" fill="#ffffff" fontSize="16" fontWeight="bold" fontFamily="monospace" textAnchor="middle">1 bit</text>

                    {/* Exponent Field */}
                    <rect x="75" y="0" width="240" height="80" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                    <text x="195" y="30" fill="#c7d2fe" fontSize="11" fontWeight="bold" textAnchor="middle">BIASED EXPONENT (E)</text>
                    <text x="195" y="55" fill="#ffffff" fontSize="16" fontWeight="bold" fontFamily="monospace" textAnchor="middle">8 bits (Excess-127)</text>

                    {/* Mantissa Fraction */}
                    <rect x="320" y="0" width="400" height="80" rx="6" fill="#042f2e" stroke="#0d9488" strokeWidth="2" />
                    <text x="520" y="30" fill="#99f6e4" fontSize="11" fontWeight="bold" textAnchor="middle">NORMALIZED MANTISSA / FRACTION (M)</text>
                    <text x="520" y="55" fill="#ffffff" fontSize="16" fontWeight="bold" fontFamily="monospace" textAnchor="middle">23 bits (Magnitude)</text>
                  </g>

                  {/* Floating Point Formula */}
                  <rect x="40" y="180" width="720" height="135" rx="8" fill="#0f172a" stroke="#334155" />
                  <text x="60" y="210" fill="#38bdf8" fontSize="13" fontWeight="bold">
                    Value = (-1)ˢ × (1.M) × 2ᴱ⁻¹²⁷
                  </text>
                  <text x="60" y="240" fill="#cbd5e1" fontSize="12">
                    • The sign bit <tspan fill="#fca5a5" fontWeight="bold">S</tspan> represents Sign-Magnitude for the entire real number.
                  </text>
                  <text x="60" y="265" fill="#cbd5e1" fontSize="12">
                    • Multiplying two floating point numbers computes the sign instantly with <tspan fill="#5eead4" fontWeight="bold">Sign_Result = S₁ ⊕ S₂</tspan> (1-gate XOR).
                  </text>
                  <text x="60" y="290" fill="#cbd5e1" fontSize="12">
                    • This is why Sign-Magnitude remains universally used for all GPU graphics &amp; scientific computing floats!
                  </text>
                </svg>
              </div>
              <p className="text-xs text-slate-400">
                🚀 <strong>Industry Application:</strong> GPUs process billions of float calculations per second. Using Sign-Magnitude in IEEE-754 allows lightning-fast sign logic during floating-point multiplication!
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
                Sign-Magnitude Calculator &amp; Dual-Zero Experimenter
              </h2>
              <p className="text-xs text-slate-400">
                Convert integers to 8-bit sign-magnitude format and test the +0 vs -0 anomaly directly.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Decimal to Sign-Mag Encoder */}
            <div className="space-y-4">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                Enter Decimal Integer (-127 to +127):
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="-127"
                  max="127"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono text-sm focus:border-teal-500 focus:outline-none"
                  placeholder="e.g. -43"
                />
                <button
                  onClick={() => setInputValue("+43")}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg text-slate-300 transition-colors"
                >
                  +43
                </button>
                <button
                  onClick={() => setInputValue("-43")}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg text-slate-300 transition-colors"
                >
                  -43
                </button>
                <button
                  onClick={() => setInputValue("-127")}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg text-slate-300 transition-colors"
                >
                  -127
                </button>
              </div>

              {signMagData.isError ? (
                <div className="p-3 rounded-lg bg-red-950/60 border border-red-700/50 text-red-300 text-xs">
                  {signMagData.error}
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                      <div className="text-[11px] text-slate-400">Sign Bit (b7):</div>
                      <div className="text-xl font-bold font-mono text-red-400">
                        {signMagData.signBit} ({signMagData.isNegative ? "Negative (-)" : "Positive (+)"})
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                      <div className="text-[11px] text-slate-400">7-Bit Magnitude:</div>
                      <div className="text-xl font-bold font-mono text-teal-300">
                        {signMagData.magBits} (|{signMagData.absVal}|)
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900 border border-teal-500/40">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-400">Full 8-Bit Sign-Magnitude:</span>
                      <span className="text-lg font-bold font-mono text-white">
                        <span className="text-red-400">{signMagData.signBit}</span> {signMagData.magBits} ({signMagData.hex})
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Dual Zero Experimenter */}
            <div className="space-y-4">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                Dual Zero (+0 vs -0) Bit Field Inspector:
              </label>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Select Sign Bit (b7):</label>
                    <select
                      value={manualSign}
                      onChange={(e) => setManualSign(e.target.value)}
                      className="w-full p-2 rounded bg-slate-900 border border-slate-700 text-white font-mono text-xs"
                    >
                      <option value="0">0 (Positive Sign)</option>
                      <option value="1">1 (Negative Sign)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Set Magnitude (0 to 127):</label>
                    <input
                      type="number"
                      min="0"
                      max="127"
                      value={manualMag}
                      onChange={(e) => setManualMag(e.target.value)}
                      className="w-full p-2 rounded bg-slate-900 border border-slate-700 text-white font-mono text-xs"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Decoded Value:</span>
                    <span className={clsx(
                      "text-base font-bold font-mono",
                      dualZeroResult.isZero ? (dualZeroResult.signBit === 1 ? "text-amber-400" : "text-teal-400") : "text-white"
                    )}>
                      {dualZeroResult.displayVal}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Hex Representation:</span>
                    <span className="font-mono text-slate-200">{dualZeroResult.hex}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Binary Bit Layout:</span>
                    <span className="font-mono text-slate-200">
                      <span className="text-red-400 font-bold">{dualZeroResult.signBit}</span> {dualZeroResult.magBits}
                    </span>
                  </div>
                </div>
              </div>
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
              Where Sign-Magnitude representation is encountered and applied across West Bengal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Scenario 1: Mamata */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-teal-500/40 transition-all">
              <div className="flex items-center gap-2 text-teal-400 font-semibold text-sm mb-2">
                <span>📍</span>
                <span>Barrackpore: IEEE-754 FPU Hardware Coprocessor Design</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Mamata</strong> is designing a high-speed floating-point coprocessor for avionics navigation. Because IEEE-754 encodes the mantissa in Sign-Magnitude form, she calculates the product sign of two 32-bit floats with a single <code className="text-teal-300 font-mono">XOR</code> gate between bit 31 of operand A and bit 31 of operand B, eliminating multi-cycle 2's complement negation overhead.
              </p>
            </div>

            {/* Scenario 2: Susmita */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 transition-all">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm mb-2">
                <span>📍</span>
                <span>Ichapur: Bipolar Pressure Transducer Telemetry</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Susmita</strong> programs a telemetry decoder at an industrial testing facility in Ichapur. The hydraulic transducer outputs a 16-bit Sign-Magnitude packet (Bit 15 = 0 for hydraulic compression, 1 for vacuum tension; Bits 14..0 = PSI magnitude), which she unpacks without complex arithmetic transformations.
              </p>
            </div>

            {/* Scenario 3: Debangshu */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all">
              <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm mb-2">
                <span>📍</span>
                <span>Jadavpur: Historic Mainframe Emulation (IBM 704 / CDC 1604)</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Debangshu</strong> is writing an emulator at Jadavpur University for the historic 1950s vacuum-tube IBM 704 computer. He discovers that legacy scientific code written in FORTRAN I relied on the hardware's Sign-Magnitude accumulator distinguishing between <code className="text-indigo-300 font-mono">+0</code> and <code className="text-indigo-300 font-mono">-0</code> for conditional branching!
              </p>
            </div>

            {/* Scenario 4: Mahima */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/40 transition-all">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm mb-2">
                <span>📍</span>
                <span>Kolkata: 3D Graphics Shader Asymptotic Limit Calculations</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Mahima</strong> writes GLSL shader pipelines in Salt Lake, Kolkata. In IEEE-754 Sign-Magnitude floats, dividing <code className="text-amber-300 font-mono">1.0 / +0.0</code> produces <code className="text-teal-300 font-mono">+Infinity</code>, while <code className="text-amber-300 font-mono">1.0 / -0.0</code> produces <code className="text-red-400 font-mono">-Infinity</code>, enabling smooth camera clipping across projective horizons.
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
                <span><strong>Assuming Regular Adders Work:</strong> You cannot directly add two Sign-Magnitude numbers using standard binary addition circuits; doing so produces completely incorrect numbers!</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">•</span>
                <span><strong>Overlooking the Dual Zero:</strong> Forgetting that <code className="text-red-300 font-mono">1000 0000</code> is <code className="text-red-300 font-mono">-0</code> and not <code className="text-red-300 font-mono">-128</code> in Sign-Magnitude.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">•</span>
                <span><strong>Incorrect Sign Extension:</strong> To expand 8-bit sign-magnitude to 16-bit, you must move the sign bit to bit 15 and zero-pad the magnitude, rather than replicating the MSB.</span>
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
                <span><strong>Use 2's Complement for Integers:</strong> General-purpose integer ALUs should always use 2's complement for silicon efficiency and unique zero.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">•</span>
                <span><strong>Understand IEEE-754 Float Signs:</strong> Recognize that all floating-point numbers in C/C++/Java/Python use Sign-Magnitude under the hood.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">•</span>
                <span><strong>XOR for Fast Float Sign Math:</strong> In FPGA and custom RTL designs, compute float product signs using a single XOR gate.</span>
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
              <span>Bit (n-1) = Sign (0 = +, 1 = -)</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
              <span className="text-teal-400 font-bold">✓</span>
              <span>Bits (n-2)..0 = Unsigned Magnitude</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
              <span className="text-teal-400 font-bold">✓</span>
              <span>Range: [-(2ⁿ⁻¹ - 1) to +(2ⁿ⁻¹ - 1)]</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
              <span className="text-teal-400 font-bold">✓</span>
              <span>Dual Zeros: +0 (0000 0000) and -0 (1000 0000)</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
              <span className="text-teal-400 font-bold">✓</span>
              <span>Requires magnitude comparator before ALU addition</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
              <span className="text-teal-400 font-bold">✓</span>
              <span>Standardized in IEEE-754 floating-point formats</span>
            </div>
          </div>
        </section>

        {/* ─── 8. FAQ Section ─────────────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <FAQTemplate
            title="Sign-Magnitude Representation FAQs"
            questions={questions}
          />
        </section>

        {/* ─── 9. Teacher's Note ──────────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <Teacher
            note={
              "Sign-Magnitude is how our human brains naturally think about signed numbers, but remember why it was abandoned for integer ALUs: having two zeros wastes binary patterns and complicates zero checks, while arithmetic requires complex hardware comparators. However, keep this concept sharp in your mind—you will see it again when we study IEEE-754 Floating Point and digital signal processors!"
            }
          />
        </section>

        {/* ─── 10. Printable Plain Text Document ──────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            title="Topic 5: Sign-Magnitude Representation of Negative Numbers"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note"
            downloadFileName="topic5_sign_magnitude_representation_note.txt"
          />
        </section>

      </div>
    </>
  );
};

export default Topic5;
