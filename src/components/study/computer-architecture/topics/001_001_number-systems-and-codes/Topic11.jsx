import React, { useState, useEffect, useRef, useMemo } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic11_files/topic11_questions";
import noteText from "./topic11_files/topic11_note.txt?raw";

/**
 * Topic11 – Binary arithmetic: addition, subtraction
 * Module: 001_001_number-systems-and-codes (Number Systems & Binary Codes)
 * Track: Computer Architecture – From Core Systems to Performance Engineering
 */
const Topic11 = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [binInputA, setBinInputA] = useState("11011"); // 27
  const [binInputB, setBinInputB] = useState("01110"); // 14
  const [opMode, setOpMode] = useState("add"); // "add" or "sub"
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

  // Binary Arithmetic Calculator
  const calcResult = useMemo(() => {
    const cleanA = binInputA.replace(/[^01]/g, "");
    const cleanB = binInputB.replace(/[^01]/g, "");

    if (!cleanA || !cleanB) {
      return { error: "Please enter valid binary strings containing only 0 and 1", isError: true };
    }

    const decA = parseInt(cleanA, 2);
    const decB = parseInt(cleanB, 2);
    const maxLen = Math.max(cleanA.length, cleanB.length);
    const padA = cleanA.padStart(maxLen, "0");
    const padB = cleanB.padStart(maxLen, "0");

    if (opMode === "add") {
      // Step-by-step addition with carry array
      let carry = 0;
      let sumBits = [];
      let carries = [0];

      for (let i = maxLen - 1; i >= 0; i--) {
        const bitA = parseInt(padA[i], 10);
        const bitB = parseInt(padB[i], 10);
        const sum = bitA + bitB + carry;
        sumBits.unshift(sum % 2);
        carry = Math.floor(sum / 2);
        carries.unshift(carry);
      }

      if (carry > 0) {
        sumBits.unshift(carry);
      }

      const finalBin = sumBits.join("");
      const finalDec = decA + decB;

      return {
        padA,
        padB,
        decA,
        decB,
        carries: carries.join(""),
        finalBin,
        finalDec,
        isError: false,
        op: "Addition (+)"
      };
    } else {
      // Subtraction (Unsigned with borrow or negative check)
      if (decA < decB) {
        // Compute negative difference
        const diff = decA - decB;
        const absDiff = Math.abs(diff);
        const diffBin = absDiff.toString(2).padStart(maxLen, "0");
        return {
          padA,
          padB,
          decA,
          decB,
          finalBin: `-${diffBin}`,
          finalDec: diff,
          isError: false,
          op: "Subtraction (-)",
          isNegativeResult: true
        };
      }

      // Step-by-step subtraction with borrow tracking
      let borrows = [0];
      let diffBits = [];
      let aArray = padA.split("").map((c) => parseInt(c, 10));

      for (let i = maxLen - 1; i >= 0; i--) {
        let bitA = aArray[i];
        const bitB = parseInt(padB[i], 10);
        if (bitA < bitB) {
          // Borrow from higher bit
          let j = i - 1;
          while (j >= 0 && aArray[j] === 0) {
            aArray[j] = 1;
            j--;
          }
          if (j >= 0) aArray[j] = 0;
          bitA += 2;
          borrows.unshift(1);
        } else {
          borrows.unshift(0);
        }
        diffBits.unshift(bitA - bitB);
      }

      const finalBin = diffBits.join("");
      const finalDec = decA - decB;

      return {
        padA,
        padB,
        decA,
        decB,
        borrows: borrows.join(""),
        finalBin,
        finalDec,
        isError: false,
        op: "Subtraction (-)",
        isNegativeResult: false
      };
    }
  }, [binInputA, binInputB, opMode]);

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
            <span>Computer Architecture Masterclass · Module 001 · Topic 11</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight mb-4">
            Binary Arithmetic: Addition &amp; Subtraction
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Master the elemental combinational logic of digital processors: Half Adders, Full Adders, Half Subtractors, Full Subtractors, carry ripple propagation, and hardware circuit synthesis.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-teal-300">
              ➕ Half Adder (XOR/AND) &amp; Full Adder
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-cyan-300">
              ➖ Half Subtractor &amp; Full Subtractor
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-indigo-300">
              ⚡ Carry-Lookahead (CLA) Optimization
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-amber-300">
              🔌 IC 74LS283 4-Bit Binary Adder
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
                Classroom Lecture: The Fundamental Silicon Building Blocks
              </h2>
              <p className="text-xs text-slate-400">
                Sukanta Hui · Coder &amp; AccoTax · Shibtala Road, Barrackpore
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
            <p>
              At the absolute lowest layer of digital hardware, every single instruction in software—from 3D rendering to machine learning tensor products—is compiled down into simple 1-bit binary logic gates:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono my-3">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-teal-400 font-bold uppercase">1. Half Adder Equations</span>
                <div className="mt-2 text-white">Sum = A ⊕ B (XOR Gate)</div>
                <div className="text-amber-300">Carry = A · B (AND Gate)</div>
                <p className="text-slate-400 font-sans text-[11px] mt-2">Adds two 1-bit inputs without a carry-in.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-cyan-400 font-bold uppercase">2. Full Adder Equations</span>
                <div className="mt-2 text-white">Sum = A ⊕ B ⊕ C_in</div>
                <div className="text-amber-300">C_out = (A · B) + (C_in · (A ⊕ B))</div>
                <p className="text-slate-400 font-sans text-[11px] mt-2">Cascades carry bits across multiple columns.</p>
              </div>
            </div>
            <p>
              By cascading <code className="text-teal-300 font-mono">n</code> Full Adders together, an ALU forms an <code className="text-cyan-300 font-mono">n-bit Parallel Adder</code> capable of adding numbers of any size.
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
                Interactive vector schematics detailing gate-level adders, multi-bit column carries, and borrow subtractors.
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
                1. Half Adder &amp; Full Adder Gates
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
                2. Column Addition Carry Ripple
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
                3. Borrow vs 2's Complement
              </button>
            </div>
          </div>

          {/* Tab 1: Half Adder & Full Adder */}
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
                    Logic Gate Schematics: Half Adder vs Full Adder Architecture
                  </text>

                  {/* Half Adder Schematic Box */}
                  <rect x="40" y="75" width="340" height="250" rx="8" fill="#0f172a" stroke="#334155" />
                  <text x="210" y="105" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">
                    1. HALF ADDER (2 Inputs: A, B)
                  </text>

                  <g transform="translate(70, 120)">
                    {/* XOR Gate */}
                    <rect x="50" y="10" width="90" height="45" rx="6" fill="#1e1b4b" stroke="#818cf8" />
                    <text x="95" y="38" fill="#c7d2fe" fontSize="13" fontWeight="bold" textAnchor="middle">XOR ⊕</text>
                    <text x="210" y="38" fill="#5eead4" fontSize="12" fontWeight="bold" fontFamily="monospace">Sum = A ⊕ B</text>

                    {/* AND Gate */}
                    <rect x="50" y="80" width="90" height="45" rx="6" fill="#042f2e" stroke="#0d9488" />
                    <text x="95" y="108" fill="#99f6e4" fontSize="13" fontWeight="bold" textAnchor="middle">AND ·</text>
                    <text x="210" y="108" fill="#f59e0b" fontSize="12" fontWeight="bold" fontFamily="monospace">Carry = A · B</text>
                  </g>

                  {/* Full Adder Schematic Box */}
                  <rect x="420" y="75" width="340" height="250" rx="8" fill="#042f2e" stroke="#0d9488" strokeWidth="2" />
                  <text x="590" y="105" fill="#5eead4" fontSize="13" fontWeight="bold" textAnchor="middle">
                    2. FULL ADDER (3 Inputs: A, B, C_in)
                  </text>

                  <g transform="translate(450, 120)">
                    <rect x="30" y="10" width="220" height="55" rx="6" fill="#0f172a" stroke="#334155" />
                    <text x="140" y="42" fill="#5eead4" fontSize="12" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                      Sum = A ⊕ B ⊕ C_in
                    </text>

                    <rect x="30" y="80" width="220" height="75" rx="6" fill="#0f172a" stroke="#334155" />
                    <text x="140" y="110" fill="#f59e0b" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                      C_out = (A·B) + C_in·(A⊕B)
                    </text>
                    <text x="140" y="135" fill="#94a3b8" fontSize="10" textAnchor="middle">
                      Constructed from 2 Half Adders + 1 OR
                    </text>
                  </g>
                </svg>
              </div>
              <p className="text-xs text-slate-400">
                💡 <strong>Circuit Composition:</strong> A Full Adder is constructed by connecting two Half Adders in series and ORing their partial carries together.
              </p>
            </div>
          )}

          {/* Tab 2: Column Addition */}
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
                    Multi-Bit Column Binary Addition with Carry Ripple Trace: (27 + 14 = 41)
                  </text>

                  {/* Calculation Card */}
                  <rect x="80" y="75" width="640" height="230" rx="8" fill="#0f172a" stroke="#334155" />

                  {/* Carries */}
                  <text x="120" y="115" fill="#f59e0b" fontSize="14" fontWeight="bold" fontFamily="monospace">
                    Carries:    <tspan fill="#ef4444">1</tspan>  1  1  1  0  (Ripples right to left)
                  </text>

                  {/* Operands */}
                  <text x="120" y="150" fill="#e2e8f0" fontSize="16" fontFamily="monospace">
                    Operand A:      1  1  0  1  1  (27₁₀)
                  </text>
                  <text x="120" y="185" fill="#e2e8f0" fontSize="16" fontFamily="monospace">
                  + Operand B:      0  1  1  1  0  (14₁₀)
                  </text>
                  <line x1="120" y1="198" x2="550" y2="198" stroke="#64748b" strokeWidth="2" />

                  {/* Result */}
                  <text x="120" y="235" fill="#2dd4bf" fontSize="20" fontWeight="bold" fontFamily="monospace">
                  = Final Sum:   1  0  1  0  0  1  (41₁₀ verified!)
                  </text>

                  <text x="120" y="275" fill="#94a3b8" fontSize="12">
                    Positional Value Check: 32 + 8 + 1 = 41. 6-bit expanded word accommodates the final carry.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-slate-400">
                ⚡ <strong>Carry Ripple:</strong> Notice how each column generates a carry that feeds into the column immediately to its left, exactly like decimal grade-school arithmetic!
              </p>
            </div>
          )}

          {/* Tab 3: Borrow Subtraction */}
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
                    Direct Borrow Subtraction vs Unified 2's Complement Execution
                  </text>

                  {/* Direct Borrow Method */}
                  <rect x="40" y="75" width="340" height="230" rx="8" fill="#0f172a" stroke="#334155" />
                  <text x="60" y="105" fill="#f59e0b" fontSize="12" fontWeight="bold">METHOD 1: Manual Borrow Subtraction</text>
                  <text x="60" y="135" fill="#e2e8f0" fontSize="13" fontFamily="monospace">
                      1 1 0 0 0  (24₁₀)
                  </text>
                  <text x="60" y="160" fill="#e2e8f0" fontSize="13" fontFamily="monospace">
                    - 0 1 0 1 1  (11₁₀)
                  </text>
                  <line x1="60" y1="170" x2="280" y2="170" stroke="#64748b" />
                  <text x="60" y="195" fill="#2dd4bf" fontSize="14" fontWeight="bold" fontFamily="monospace">
                    = 0 1 1 0 1  (13₁₀)
                  </text>
                  <text x="60" y="235" fill="#94a3b8" fontSize="11">
                    Requires borrowing 2s from leftward 1s. Expensive in hardware logic.
                  </text>

                  {/* 2's Complement Hardware Method */}
                  <rect x="420" y="75" width="340" height="230" rx="8" fill="#042f2e" stroke="#0d9488" strokeWidth="1.5" />
                  <text x="440" y="105" fill="#5eead4" fontSize="12" fontWeight="bold">METHOD 2: 2's Comp Hardware Adder</text>
                  <text x="440" y="135" fill="#e2e8f0" fontSize="13" fontFamily="monospace">
                      1 1 0 0 0  (+24)
                  </text>
                  <text x="440" y="160" fill="#e2e8f0" fontSize="13" fontFamily="monospace">
                    + 1 0 1 0 1  (-11 in 2's comp)
                  </text>
                  <line x1="440" y1="170" x2="660" y2="170" stroke="#64748b" />
                  <text x="440" y="195" fill="#2dd4bf" fontSize="14" fontWeight="bold" fontFamily="monospace">
                    = 1 0 1 1 0 1  (Drop End Carry!)
                  </text>
                  <text x="440" y="235" fill="#a7f3d0" fontSize="11">
                    Uses standard adder + XOR gate. 0 extra subtractor silicon needed!
                  </text>
                </svg>
              </div>
              <p className="text-xs text-slate-400">
                🔌 <strong>Silicon Decision:</strong> Hardware always chooses Method 2 (2's complement addition) because it reuses existing adder logic and eliminates borrow chains!
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
                Binary Addition &amp; Subtraction Visual Workbench
              </h2>
              <p className="text-xs text-slate-400">
                Enter arbitrary binary numbers, select operation, and watch the column-by-column carry/borrow trace update live.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Controls */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Binary Operand A (0s and 1s):
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={binInputA}
                    onChange={(e) => setBinInputA(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-teal-300 font-mono text-sm focus:border-teal-500 focus:outline-none"
                    placeholder="e.g. 11011"
                  />
                  <button
                    onClick={() => { setBinInputA("11011"); setBinInputB("01110"); }}
                    className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-[11px] font-semibold rounded text-slate-300"
                  >
                    27 &amp; 14
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Binary Operand B (0s and 1s):
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={binInputB}
                    onChange={(e) => setBinInputB(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-teal-300 font-mono text-sm focus:border-teal-500 focus:outline-none"
                    placeholder="e.g. 01110"
                  />
                  <button
                    onClick={() => { setBinInputA("11111111"); setBinInputB("00000001"); }}
                    className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-[11px] font-semibold rounded text-slate-300"
                  >
                    255 &amp; 1
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Select Arithmetic Operation:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setOpMode("add")}
                    className={clsx(
                      "p-2.5 rounded-lg text-xs font-bold border transition-all cursor-pointer",
                      opMode === "add"
                        ? "bg-teal-500 text-slate-950 border-teal-400 shadow-lg shadow-teal-500/30"
                        : "bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-900"
                    )}
                  >
                    BINARY ADDITION (+)
                  </button>
                  <button
                    onClick={() => setOpMode("sub")}
                    className={clsx(
                      "p-2.5 rounded-lg text-xs font-bold border transition-all cursor-pointer",
                      opMode === "sub"
                        ? "bg-teal-500 text-slate-950 border-teal-400 shadow-lg shadow-teal-500/30"
                        : "bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-900"
                    )}
                  >
                    BINARY SUBTRACTION (-)
                  </button>
                </div>
              </div>

              {calcResult.isError && (
                <div className="p-3 rounded-lg bg-red-950/60 border border-red-700/50 text-red-300 text-xs">
                  {calcResult.error}
                </div>
              )}
            </div>

            {/* Visual Calculation Trace */}
            {!calcResult.isError && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-teal-500/40 space-y-3 font-mono text-xs">
                  <div className="text-slate-400 font-sans font-bold uppercase tracking-wider text-[11px]">
                    Step-by-Step Column Calculation Trace:
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                    {opMode === "add" && calcResult.carries && (
                      <div className="text-amber-400 text-[11px]">
                        Carries:   {calcResult.carries}
                      </div>
                    )}
                    {opMode === "sub" && calcResult.borrows && (
                      <div className="text-amber-400 text-[11px]">
                        Borrows:   {calcResult.borrows}
                      </div>
                    )}
                    <div className="flex justify-between text-slate-300">
                      <span>  {calcResult.padA}</span>
                      <span>({calcResult.decA}₁₀)</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>{opMode === "add" ? "+" : "-"} {calcResult.padB}</span>
                      <span>({calcResult.decB}₁₀)</span>
                    </div>
                    <div className="border-t border-teal-500 pt-1 flex justify-between font-bold text-sm">
                      <span className="text-white">= {calcResult.finalBin}</span>
                      <span className="text-teal-300">{calcResult.finalDec}₁₀</span>
                    </div>
                  </div>

                  <div className="flex justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                    <span>Operation: {calcResult.op}</span>
                    <span>Hex Result: 0x{Math.abs(calcResult.finalDec).toString(16).toUpperCase()}</span>
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
              Where fundamental binary adders and subtractors are synthesized in laboratory and production circuits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Scenario 1: Mamata */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-teal-500/40 transition-all">
              <div className="flex items-center gap-2 text-teal-400 font-semibold text-sm mb-2">
                <span>📍</span>
                <span>Barrackpore: Breadboard 74LS283 Binary Adder Laboratory</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Mamata</strong> builds a digital trainer kit in Barrackpore. She connects a Texas Instruments 74LS283 4-bit binary adder IC to 74LS86 quad XOR gates, building an interactive hardware ALU that demonstrates real-time column addition and subtraction to engineering students.
              </p>
            </div>

            {/* Scenario 2: Susmita */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 transition-all">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm mb-2">
                <span>📍</span>
                <span>Ichapur: Factory High-Speed Digital Frequency Counter</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Susmita</strong> synthesizes an FPGA pulse accumulator in Ichapur. By chaining 16 Full Adder stages, the circuit increments pulse counts directly from optical sensors at 250 MHz to measure machine turbine rotational speeds.
              </p>
            </div>

            {/* Scenario 3: Debangshu */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all">
              <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm mb-2">
                <span>📍</span>
                <span>Jadavpur: VLSI Carry-Lookahead vs Ripple Adder Timing Simulation</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Debangshu</strong> is simulating 64-bit adder topologies in Verilog at Jadavpur University. He proves that while a 64-bit Ripple-Carry Adder takes 128 gate delays (1.28 ns), a Kogge-Stone Parallel-Prefix Carry-Lookahead Adder completes the addition in just 6 gate delays (0.06 ns).
              </p>
            </div>

            {/* Scenario 4: Mahima */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/40 transition-all">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm mb-2">
                <span>📍</span>
                <span>Kolkata: Cryptographic Mining ASIC Binary Adder Pipeline</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Mahima</strong> designs custom silicon hashing accelerators in Salt Lake, Kolkata. She pipelines 32-bit modulo-2³² binary adders within SHA-256 compression loops, achieving over 140 Terahashes per second on 5nm process technology.
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
                <span><strong>Forgetting that 1+1+1 = 11:</strong> In a full adder, three 1s produce Sum=1 and Carry=1 (decimal 3).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">•</span>
                <span><strong>Borrow Value Confusion:</strong> When borrowing in binary, a borrow from the next column brings a value of 2 (base 2), NOT 10!</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">•</span>
                <span><strong>Misaligning Radix Points:</strong> When adding fractional binary numbers, always align the binary point before adding columns.</span>
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
                <span><strong>Unify Subtractors with Adders:</strong> In FPGA and ASIC design, implement subtraction using XOR inverters + Carry-In=1 to save silicon area.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">•</span>
                <span><strong>Use CLA for Wide Words:</strong> For 32-bit or 64-bit adders, always synthesize Carry-Lookahead (CLA) or Parallel-Prefix trees to avoid carry ripple latency.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">•</span>
                <span><strong>Use Carry-Save for Multipliers:</strong> When summing multiple partial products, use Carry-Save Adders (CSA) to defer carry propagation until the final stage.</span>
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
              <span>Half Adder: Sum = A ⊕ B, Carry = A · B</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
              <span className="text-teal-400 font-bold">✓</span>
              <span>Full Adder: Sum = A ⊕ B ⊕ C_in</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
              <span className="text-teal-400 font-bold">✓</span>
              <span>1 + 1 = 10₂ (Sum 0, Carry 1)</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
              <span className="text-teal-400 font-bold">✓</span>
              <span>1 + 1 + 1 = 11₂ (Sum 1, Carry 1)</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
              <span className="text-teal-400 font-bold">✓</span>
              <span>0 - 1 = 1 with Borrow 1</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
              <span className="text-teal-400 font-bold">✓</span>
              <span>2 Full Adders + 1 OR = 1 Full Adder</span>
            </div>
          </div>
        </section>

        {/* ─── 8. FAQ Section ─────────────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <FAQTemplate
            title="Binary Arithmetic: Addition & Subtraction FAQs"
            questions={questions}
          />
        </section>

        {/* ─── 9. Teacher's Note ──────────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <Teacher
            note={
              "Mastering 1-bit Half Adders and Full Adders is the ultimate foundation for all subsequent topics in computer architecture, including ALUs, Multipliers, Floating-Point Units, and Datapaths. In your digital logic laboratory practicals, make sure you know how to wire the 74LS283 adder IC and understand how the internal fast carry-lookahead logic functions!"
            }
          />
        </section>

        {/* ─── 10. Printable Plain Text Document ──────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            title="Topic 11: Binary Arithmetic: Addition & Subtraction"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note"
            downloadFileName="topic11_binary_arithmetic_addition_subtraction_note.txt"
          />
        </section>

      </div>
    </>
  );
};

export default Topic11;
