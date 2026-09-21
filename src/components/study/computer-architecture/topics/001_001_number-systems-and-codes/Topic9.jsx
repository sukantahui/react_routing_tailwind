import React, { useState, useEffect, useRef, useMemo } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic9_files/topic9_questions";
import noteText from "./topic9_files/topic9_note.txt?raw";

/**
 * Topic9 – Binary arithmetic with signed numbers
 * Module: 001_001_number-systems-and-codes (Number Systems & Binary Codes)
 * Track: Computer Architecture – From Core Systems to Performance Engineering
 */
const Topic9 = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [valA, setValA] = useState("45");
  const [valB, setValB] = useState("-20");
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
    if (num === 0) return { binary: "00000000", isNeg: false, hex: "0x00" };
    const isNeg = num < 0;
    const twosVal = isNeg ? 256 + num : num;
    const bin = twosVal.toString(2).padStart(8, "0");
    return {
      binary: bin,
      isNeg,
      hex: "0x" + twosVal.toString(16).toUpperCase().padStart(2, "0")
    };
  };

  // Detailed 8-Bit Signed Arithmetic Trace with Carry-Bit Array
  const arithmeticTrace = useMemo(() => {
    const a = parseInt(valA, 10);
    const b = parseInt(valB, 10);

    if (isNaN(a) || isNaN(b) || a < -128 || a > 127 || b < -128 || b > 127) {
      return { error: "Please enter integers between -128 and +127 (8-bit signed limits)", isError: true };
    }

    const binA = toTwosComp(a).binary;
    const binB = toTwosComp(b).binary;

    // Bit-by-bit addition with carry tracking
    let carry = 0;
    let sumBits = [];
    let carries = [0]; // carries C0 to C8

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
    const carryInMSB = carries[1]; // carry into bit 7
    const carryOutMSB = carries[0]; // carry out of bit 7

    // Decode signed result
    const msb = sumBits[0];
    let decodedDec = -msb * 128;
    for (let i = 1; i < 8; i++) {
      decodedDec += sumBits[i] * Math.pow(2, 7 - i);
    }

    const theoreticalSum = a + b;
    const overflow = carryInMSB !== carryOutMSB;
    const zeroFlag = resultBin === "00000000";
    const signFlag = msb === 1;
    const carryFlag = endCarry === 1;

    // Determine Case Category
    let caseName = "Case 1: Positive + Positive";
    if (a >= 0 && b < 0) {
      caseName = Math.abs(a) >= Math.abs(b) ? "Case 2: Positive + Negative (|A| ≥ |B|)" : "Case 3: Positive + Negative (|A| < |B|)";
    } else if (a < 0 && b >= 0) {
      caseName = Math.abs(b) >= Math.abs(a) ? "Case 2: Positive + Negative (|B| ≥ |A|)" : "Case 3: Positive + Negative (|B| < |A|)";
    } else if (a < 0 && b < 0) {
      caseName = "Case 4: Negative + Negative";
    }

    return {
      a,
      b,
      binA,
      binB,
      carries,
      resultBin,
      endCarry,
      decodedDec,
      theoreticalSum,
      overflow,
      zeroFlag,
      signFlag,
      carryFlag,
      caseName,
      carryInMSB,
      carryOutMSB,
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
            <span>Computer Architecture Masterclass · Module 001 · Topic 9</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight mb-4">
            Binary Arithmetic with Signed Numbers
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Master the four fundamental cases of 2's complement addition and subtraction, trace bit-level carry propagation ($C_0 \dots C_8$), inspect CPU status flags (ZF, SF, CF, OF), and explore multi-word Add-with-Carry (`ADC`) operations.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-teal-300">
              ➕ The 4 Arithmetic Combinations
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-cyan-300">
              🏷️ Status Flags: ZF, SF, CF, OF
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-indigo-300">
              ⛓️ Multi-Precision ADC / SBB Chaining
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-amber-300">
              🗑️ Automatic Discarding of End Carry
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
                Classroom Lecture: The Four Arithmetic Scenarios of Silicon
              </h2>
              <p className="text-xs text-slate-400">
                Sukanta Hui · Coder &amp; AccoTax · Shibtala Road, Barrackpore
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
            <p>
              In digital hardware, every addition or subtraction problem boils down to one of <strong>four fundamental signed combinations</strong>:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-mono my-2">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-teal-400 font-bold">Case 1: (+A) + (+B)</span>
                <p className="text-slate-400 font-sans text-xs mt-1">Both numbers positive. End carry is always 0. Watch out for positive overflow if sum &gt; +127.</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-cyan-400 font-bold">Case 2: (+A) + (-B) where |A| ≥ |B|</span>
                <p className="text-slate-400 font-sans text-xs mt-1">Result is positive or zero. Generates an End Carry = 1 that is simply discarded!</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-amber-400 font-bold">Case 3: (+A) + (-B) where |A| &lt; |B|</span>
                <p className="text-slate-400 font-sans text-xs mt-1">Result is negative. Generates NO End Carry (Carry = 0). Result is in correct 2's comp form.</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-red-400 font-bold">Case 4: (-A) + (-B)</span>
                <p className="text-slate-400 font-sans text-xs mt-1">Both numbers negative. Always generates an End Carry = 1 (discarded). Watch out for negative underflow if sum &lt; -128.</p>
              </div>
            </div>
            <p>
              Regardless of the case, the ALU executes the <strong>exact same binary addition process</strong>. The status flags report the outcome for software decision branches.
            </p>
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
                Interactive vector diagrams detailing ripple-carry additions, carry bit propagation, and multi-word ADC execution.
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
                1. Four Arithmetic Cases
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
                2. Full Adder Carry Chain
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
                3. Multi-Word ADC Operation
              </button>
            </div>
          </div>

          {/* Tab 1: Four Cases */}
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
                    The 4 Fundamental Signed 2's Complement Addition Scenarios
                  </text>

                  {/* 4 Case Cards */}
                  <g transform="translate(40, 75)">
                    {/* Case 1 */}
                    <rect x="0" y="0" width="350" height="115" rx="8" fill="#0f172a" stroke="#334155" />
                    <text x="20" y="25" fill="#38bdf8" fontSize="12" fontWeight="bold">CASE 1: (+45) + (+20) = +65</text>
                    <text x="20" y="50" fill="#e2e8f0" fontSize="12" fontFamily="monospace">  0010 1101 (+45)</text>
                    <text x="20" y="70" fill="#e2e8f0" fontSize="12" fontFamily="monospace">+ 0001 0100 (+20)</text>
                    <line x1="20" y1="78" x2="220" y2="78" stroke="#64748b" />
                    <text x="20" y="98" fill="#2dd4bf" fontSize="13" fontWeight="bold" fontFamily="monospace">= 0011 1101 (+65) | Carry=0</text>

                    {/* Case 2 */}
                    <rect x="370" y="0" width="350" height="115" rx="8" fill="#0f172a" stroke="#334155" />
                    <text x="390" y="25" fill="#10b981" fontSize="12" fontWeight="bold">CASE 2: (+45) + (-20) = +25</text>
                    <text x="390" y="50" fill="#e2e8f0" fontSize="12" fontFamily="monospace">  0010 1101 (+45)</text>
                    <text x="390" y="70" fill="#e2e8f0" fontSize="12" fontFamily="monospace">+ 1110 1100 (-20 in 2's)</text>
                    <line x1="390" y1="78" x2="590" y2="78" stroke="#64748b" />
                    <text x="390" y="98" fill="#2dd4bf" fontSize="13" fontWeight="bold" fontFamily="monospace">= 0001 1001 (+25) | Carry=1 (Drop)</text>

                    {/* Case 3 */}
                    <rect x="0" y="130" width="350" height="115" rx="8" fill="#0f172a" stroke="#334155" />
                    <text x="20" y="155" fill="#f59e0b" fontSize="12" fontWeight="bold">CASE 3: (+20) + (-45) = -25</text>
                    <text x="20" y="180" fill="#e2e8f0" fontSize="12" fontFamily="monospace">  0001 0100 (+20)</text>
                    <text x="20" y="200" fill="#e2e8f0" fontSize="12" fontFamily="monospace">+ 1101 0011 (-45 in 2's)</text>
                    <line x1="20" y1="208" x2="220" y2="208" stroke="#64748b" />
                    <text x="20" y="228" fill="#fca5a5" fontSize="13" fontWeight="bold" fontFamily="monospace">= 1110 0111 (-25) | Carry=0</text>

                    {/* Case 4 */}
                    <rect x="370" y="130" width="350" height="115" rx="8" fill="#0f172a" stroke="#334155" />
                    <text x="390" y="155" fill="#ef4444" fontSize="12" fontWeight="bold">CASE 4: (-20) + (-45) = -65</text>
                    <text x="390" y="180" fill="#e2e8f0" fontSize="12" fontFamily="monospace">  1110 1100 (-20 in 2's)</text>
                    <text x="390" y="200" fill="#e2e8f0" fontSize="12" fontFamily="monospace">+ 1101 0011 (-45 in 2's)</text>
                    <line x1="390" y1="208" x2="590" y2="208" stroke="#64748b" />
                    <text x="390" y="228" fill="#fca5a5" fontSize="13" fontWeight="bold" fontFamily="monospace">= 1011 1111 (-65) | Carry=1 (Drop)</text>
                  </g>
                </svg>
              </div>
              <p className="text-xs text-slate-400">
                💡 <strong>Instructor Insight:</strong> Notice that in Cases 2 and 4, an End Carry of 1 is generated and silently dropped. In Cases 1 and 3, no carry is generated. In all four cases, the result is 100% correct!
              </p>
            </div>
          )}

          {/* Tab 2: Carry Chain */}
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
                    8-Bit Ripple-Carry Adder Stage &amp; Carry Bit Flow ($C_0 \dots C_8$)
                  </text>

                  {/* 8 Full Adder Cells */}
                  <g transform="translate(40, 90)">
                    {[
                      { bit: "FA 7 (MSB)", cIn: "C₇", cOut: "C₈" },
                      { bit: "FA 6", cIn: "C₆", cOut: "C₇" },
                      { bit: "FA 5", cIn: "C₅", cOut: "C₆" },
                      { bit: "FA 4", cIn: "C₄", cOut: "C₅" },
                      { bit: "FA 3", cIn: "C₃", cOut: "C₄" },
                      { bit: "FA 2", cIn: "C₂", cOut: "C₃" },
                      { bit: "FA 1", cIn: "C₁", cOut: "C₂" },
                      { bit: "FA 0 (LSB)", cIn: "C₀", cOut: "C₁" }
                    ].map((cell, idx) => (
                      <g key={idx} transform={`translate(${idx * 90}, 0)`}>
                        <rect x="0" y="0" width="82" height="120" rx="6" fill="#042f2e" stroke="#0d9488" />
                        <text x="41" y="25" fill="#5eead4" fontSize="11" fontWeight="bold" textAnchor="middle">{cell.bit}</text>
                        <text x="41" y="55" fill="#cbd5e1" fontSize="10" textAnchor="middle">A{7 - idx}, B{7 - idx}</text>
                        <text x="41" y="80" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">In: {cell.cIn}</text>
                        <text x="41" y="105" fill="#99f6e4" fontSize="11" fontWeight="bold" textAnchor="middle">Sum {7 - idx}</text>
                      </g>
                    ))}
                  </g>

                  {/* Overflow Detector Box */}
                  <rect x="40" y="240" width="720" height="90" rx="8" fill="#1e1b4b" stroke="#818cf8" />
                  <text x="60" y="268" fill="#c7d2fe" fontSize="12" fontWeight="bold">
                    Hardware Overflow Detector: OF = C₇ ⊕ C₈ (Carry into MSB XOR Carry out of MSB)
                  </text>
                  <text x="60" y="295" fill="#cbd5e1" fontSize="11">
                    • If C₇ = 1 and C₈ = 0: Carry entered the sign bit without leaving → Positive Overflow!
                  </text>
                  <text x="60" y="315" fill="#cbd5e1" fontSize="11">
                    • If C₇ = 0 and C₈ = 1: Carry left the sign bit without entering → Negative Underflow!
                  </text>
                </svg>
              </div>
              <p className="text-xs text-slate-400">
                ⚡ <strong>Carry Propagation:</strong> Carry bits ripple from right to left (C₀ to C₈). The XOR of the last two carries (C₇ and C₈) provides the instant 1-gate hardware overflow detection!
              </p>
            </div>
          )}

          {/* Tab 3: Multi-Word ADC */}
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
                    Multi-Precision 64-Bit Addition on 32-Bit CPU via ADD and ADC
                  </text>

                  {/* Step 1: Lower 32 bits */}
                  <rect x="40" y="75" width="340" height="150" rx="8" fill="#0f172a" stroke="#334155" />
                  <text x="60" y="105" fill="#38bdf8" fontSize="12" fontWeight="bold">STEP 1: ADD LOWER 32 BITS</text>
                  <text x="60" y="130" fill="#e2e8f0" fontSize="12" fontFamily="monospace">ADD EAX, EBX</text>
                  <text x="60" y="155" fill="#cbd5e1" fontSize="11">
                    • Computes Low32(A) + Low32(B)
                  </text>
                  <text x="60" y="180" fill="#f59e0b" fontSize="11" fontWeight="bold">
                    • Sets Carry Flag (CF) = 0 or 1
                  </text>
                  <text x="60" y="205" fill="#94a3b8" fontSize="10">
                    Stores low sum in register EAX
                  </text>

                  {/* Step 2: Upper 32 bits with Carry */}
                  <rect x="420" y="75" width="340" height="150" rx="8" fill="#042f2e" stroke="#0d9488" strokeWidth="1.5" />
                  <text x="440" y="105" fill="#5eead4" fontSize="12" fontWeight="bold">STEP 2: ADD UPPER 32 BITS + CF</text>
                  <text x="440" y="130" fill="#e2e8f0" fontSize="12" fontFamily="monospace">ADC EDX, ECX</text>
                  <text x="440" y="155" fill="#cbd5e1" fontSize="11">
                    • Computes High32(A) + High32(B) + CF
                  </text>
                  <text x="440" y="180" fill="#5eead4" fontSize="11" fontWeight="bold">
                    • Injects carry from Step 1 seamlessly!
                  </text>
                  <text x="440" y="205" fill="#94a3b8" fontSize="10">
                    Stores high sum in register EDX
                  </text>

                  {/* Chaining Summary */}
                  <rect x="40" y="245" width="720" height="70" rx="8" fill="#0f172a" stroke="#14b8a6" />
                  <text x="400" y="275" fill="#2dd4bf" fontSize="13" fontWeight="bold" textAnchor="middle">
                    Result: 64-Bit Precise Sum Stored across [EDX:EAX] Register Pair
                  </text>
                  <text x="400" y="298" fill="#cbd5e1" fontSize="11" textAnchor="middle">
                    This ADC chaining technique can be extended infinitely to 128-bit, 256-bit, and 2048-bit RSA encryption keys!
                  </text>
                </svg>
              </div>
              <p className="text-xs text-slate-400">
                ⛓️ <strong>Infinite Precision:</strong> Using `ADC` and `SBB` instructions, computers can perform signed arithmetic on arbitrary-precision numbers containing thousands of bits!
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
                4-Case Signed Arithmetic Workbench &amp; Carry Bit Tracer
              </h2>
              <p className="text-xs text-slate-400">
                Enter any two signed numbers, trace the complete 8-bit carry propagation array, and inspect live CPU status flags.
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
                    placeholder="e.g. 45"
                  />
                  <button
                    onClick={() => { setValA("45"); setValB("20"); }}
                    className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-[11px] font-semibold rounded text-slate-300"
                  >
                    Case 1 (+/+)
                  </button>
                  <button
                    onClick={() => { setValA("45"); setValB("-20"); }}
                    className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-[11px] font-semibold rounded text-slate-300"
                  >
                    Case 2 (+/- &gt;)
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
                    placeholder="e.g. -20"
                  />
                  <button
                    onClick={() => { setValA("20"); setValB("-45"); }}
                    className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-[11px] font-semibold rounded text-slate-300"
                  >
                    Case 3 (+/- &lt;)
                  </button>
                  <button
                    onClick={() => { setValA("-20"); setValB("-45"); }}
                    className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-[11px] font-semibold rounded text-slate-300"
                  >
                    Case 4 (-/-)
                  </button>
                </div>
              </div>

              {arithmeticTrace.isError ? (
                <div className="p-3 rounded-lg bg-red-950/60 border border-red-700/50 text-red-300 text-xs">
                  {arithmeticTrace.error}
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs font-mono">
                  <div className="text-teal-400 font-sans font-bold uppercase text-[11px]">
                    Identified Scenario:
                  </div>
                  <div className="text-white font-bold">{arithmeticTrace.caseName}</div>
                </div>
              )}
            </div>

            {/* Arithmetic Trace */}
            {!arithmeticTrace.isError && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-teal-500/40 space-y-3 font-mono text-xs">
                  <div className="text-slate-400 font-sans font-bold uppercase tracking-wider text-[11px]">
                    Bit-Level Ripple Addition Trace:
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                    <div className="text-amber-400 text-[11px]">
                      Carries (C₈..C₁): {arithmeticTrace.carries.slice(0, 8).join("")}
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>  {arithmeticTrace.binA}</span>
                      <span>({arithmeticTrace.a})</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>+ {arithmeticTrace.binB}</span>
                      <span>({arithmeticTrace.b})</span>
                    </div>
                    <div className="border-t border-teal-500 pt-1 flex justify-between font-bold text-sm">
                      <span className="text-white">
                        = {arithmeticTrace.resultBin}
                      </span>
                      <span className="text-teal-300">
                        {arithmeticTrace.decodedDec} ({arithmeticTrace.hex})
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 pt-1">
                      End Carry (C₈): <span className="text-amber-400 font-bold">{arithmeticTrace.endCarry} (Discarded)</span>
                    </div>
                  </div>

                  {/* CPU Flags */}
                  <div className="grid grid-cols-4 gap-2 text-center pt-2 border-t border-slate-800">
                    <div className={clsx(
                      "p-2 rounded border text-xs",
                      arithmeticTrace.zeroFlag ? "bg-teal-950 border-teal-500 text-teal-300 font-bold" : "bg-slate-900 border-slate-800 text-slate-500"
                    )}>
                      ZF = {arithmeticTrace.zeroFlag ? "1" : "0"}
                      <div className="text-[9px] font-normal">Zero</div>
                    </div>
                    <div className={clsx(
                      "p-2 rounded border text-xs",
                      arithmeticTrace.signFlag ? "bg-teal-950 border-teal-500 text-teal-300 font-bold" : "bg-slate-900 border-slate-800 text-slate-500"
                    )}>
                      SF = {arithmeticTrace.signFlag ? "1" : "0"}
                      <div className="text-[9px] font-normal">Sign</div>
                    </div>
                    <div className={clsx(
                      "p-2 rounded border text-xs",
                      arithmeticTrace.carryFlag ? "bg-amber-950 border-amber-500 text-amber-300 font-bold" : "bg-slate-900 border-slate-800 text-slate-500"
                    )}>
                      CF = {arithmeticTrace.carryFlag ? "1" : "0"}
                      <div className="text-[9px] font-normal">Carry</div>
                    </div>
                    <div className={clsx(
                      "p-2 rounded border text-xs",
                      arithmeticTrace.overflow ? "bg-red-950 border-red-500 text-red-300 font-bold" : "bg-slate-900 border-slate-800 text-slate-500"
                    )}>
                      OF = {arithmeticTrace.overflow ? "1" : "0"}
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
              Applications of signed binary arithmetic across robotics, compiler optimization, and finance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Scenario 1: Mamata */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-teal-500/40 transition-all">
              <div className="flex items-center gap-2 text-teal-400 font-semibold text-sm mb-2">
                <span>📍</span>
                <span>Barrackpore: Robotics PID Motor Differential Feedback</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Mamata</strong> programs an autonomous AGV robot in Barrackpore. The error term <code className="text-teal-300 font-mono">E = Target_RPM - Actual_RPM</code> is computed using signed 2's complement subtraction. When <code className="text-teal-300 font-mono">Target = 100</code> and <code className="text-teal-300 font-mono">Actual = 120</code>, the ALU computes <code className="text-cyan-300 font-mono">-20</code>, automatically applying reverse regenerative braking.
              </p>
            </div>

            {/* Scenario 2: Susmita */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 transition-all">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm mb-2">
                <span>📍</span>
                <span>Ichapur: Multi-Precision Missile Trajectory Guidance</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Susmita</strong> implements 128-bit numerical trajectory integration on an ARM Cortex processor in Ichapur. By chaining 64-bit <code className="text-cyan-300 font-mono">ADDS</code> and <code className="text-cyan-300 font-mono">ADC</code> instructions, her guidance algorithm accumulates millimeter-level navigation coordinates over a 500-kilometer flight path with zero rounding drift.
              </p>
            </div>

            {/* Scenario 3: Debangshu */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all">
              <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm mb-2">
                <span>📍</span>
                <span>Jadavpur: Compiler Micro-Op Subtraction Optimization</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Debangshu</strong> analyzes LLVM code generation for x86-64 at Jadavpur University. He observes how the compiler maps high-level comparisons (<code className="text-indigo-300 font-mono">if (a &lt; b)</code>) directly to the <code className="text-indigo-300 font-mono">CMP</code> instruction, which evaluates <code className="text-amber-300 font-mono">SF ⊕ OF</code> to execute lightning-fast single-cycle branch decisions.
              </p>
            </div>

            {/* Scenario 4: Mahima */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/40 transition-all">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm mb-2">
                <span>📍</span>
                <span>Kolkata: Real-Time High-Frequency Profit &amp; Loss (P&amp;L) Ledger</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Mahima</strong> develops equity order accounting engines in Salt Lake, Kolkata. Trade profits (+₹54,000) and losses (-₹72,000) are added continuously in a single tight assembly loop without branching, updating net portfolio positions in under 15 nanoseconds per transaction.
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
                <span><strong>Confusing Carry Flag (CF) with Overflow (OF):</strong> CF tracks unsigned wraparound; OF tracks signed range violations. They operate completely independently!</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">•</span>
                <span><strong>Forgetting to Discard End Carry:</strong> In 2's complement addition, always drop the carry out of the MSB.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">•</span>
                <span><strong>Incorrect Sign Interpretation:</strong> If the result has MSB=1, remember that it is in 2's complement form; invert and add 1 to read its true magnitude.</span>
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
                <span><strong>Use ADC for Chained Math:</strong> When building multi-word adders, use <code className="text-teal-300 font-mono">ADD</code> on the lowest word, followed by <code className="text-teal-300 font-mono">ADC</code> for all subsequent words.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">•</span>
                <span><strong>Signed Comparisons use SF ^ OF:</strong> In assembly, evaluate signed less-than with <code className="text-teal-300 font-mono">SF != OF</code> to correctly handle overflowed subtractions.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">•</span>
                <span><strong>Clamp with Saturating Arithmetic:</strong> In audio/DSP pipelines, use saturating addition instructions to avoid audio pops from overflow wrapping.</span>
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
              <span>A - B = A + (~B + 1) (2's complement addition)</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
              <span className="text-teal-400 font-bold">✓</span>
              <span>End Carry out of MSB is always DISCARDED</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
              <span className="text-teal-400 font-bold">✓</span>
              <span>ZF = 1 when result is zero</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
              <span className="text-teal-400 font-bold">✓</span>
              <span>SF = 1 when MSB of result is 1 (negative)</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
              <span className="text-teal-400 font-bold">✓</span>
              <span>CF = Carry out of MSB (Unsigned Overflow)</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
              <span className="text-teal-400 font-bold">✓</span>
              <span>OF = C_in(MSB) ⊕ C_out(MSB) (Signed Overflow)</span>
            </div>
          </div>
        </section>

        {/* ─── 8. FAQ Section ─────────────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <FAQTemplate
            title="Binary Arithmetic with Signed Numbers FAQs"
            questions={questions}
          />
        </section>

        {/* ─── 9. Teacher's Note ──────────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <Teacher
            note={
              "Mastering the 4 cases of signed binary arithmetic is essential for both your university examinations and low-level system software development. Always remember: when calculating 2's complement addition, write down the carry bits clearly above each column. In your exams, explicitly mention: 'The end carry generated out of the MSB is discarded, yielding the correct signed 2's complement result.' This guarantees full marks!"
            }
          />
        </section>

        {/* ─── 10. Printable Plain Text Document ──────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            title="Topic 9: Binary Arithmetic with Signed Numbers"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note"
            downloadFileName="topic9_binary_arithmetic_signed_numbers_note.txt"
          />
        </section>

      </div>
    </>
  );
};

export default Topic9;
