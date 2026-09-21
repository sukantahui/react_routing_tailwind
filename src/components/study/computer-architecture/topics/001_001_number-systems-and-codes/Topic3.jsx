import React, { useState, useEffect, useRef, useMemo } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

/**
 * Topic3 – Conversion from Decimal to HexaDecimal
 * Module: 001_001_number-systems-and-codes (Number Systems & Binary Codes)
 * Track: Computer Architecture – From Core Systems to Performance Engineering
 */
const Topic3 = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [decInput, setDecInput] = useState("7562");
  const [fracInput, setFracInput] = useState("0.6875");
  const [rgbR, setRgbR] = useState(255);
  const [rgbG, setRgbG] = useState(138);
  const [rgbB, setRgbB] = useState(61);
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

  // Convert decimal integer to hexadecimal with division steps
  const integerDivisionSteps = useMemo(() => {
    const num = parseInt(decInput, 10);
    if (isNaN(num) || num < 0) return { error: "Please enter a valid non-negative integer", steps: [], result: "" };
    if (num === 0) {
      return {
        steps: [{ dividend: 0, quotient: 0, remainder: 0, hexDigit: "0", bit4: "0000" }],
        result: "0",
        binary: "0000",
        num
      };
    }

    const hexMap = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];
    const steps = [];
    let current = num;

    while (current > 0) {
      const quotient = Math.floor(current / 16);
      const remainder = current % 16;
      const hexDigit = hexMap[remainder];
      const bit4 = remainder.toString(2).padStart(4, "0");
      steps.push({
        dividend: current,
        quotient,
        remainder,
        hexDigit,
        bit4
      });
      current = quotient;
    }

    const result = steps.map((s) => s.hexDigit).reverse().join("");
    const binary = steps.map((s) => s.bit4).reverse().join(" ");

    return { steps, result, binary, num };
  }, [decInput]);

  // Convert decimal fraction to hexadecimal with multiplication steps
  const fractionalMultiplicationSteps = useMemo(() => {
    const frac = parseFloat(fracInput);
    if (isNaN(frac) || frac < 0 || frac >= 1) {
      return { error: "Please enter a decimal fraction strictly between 0.0 and 0.9999", steps: [], result: "" };
    }

    const hexMap = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];
    const steps = [];
    let current = frac;
    let iterations = 0;

    while (current > 0.00000001 && iterations < 8) {
      const product = current * 16;
      const intPart = Math.floor(product);
      const newFrac = product - intPart;
      const hexDigit = hexMap[intPart];
      steps.push({
        multiplicand: current,
        product: product.toFixed(4),
        integerPart: intPart,
        hexDigit,
        remainingFraction: newFrac.toFixed(4)
      });
      current = newFrac;
      iterations++;
    }

    const result = "0." + steps.map((s) => s.hexDigit).join("");
    return { steps, result, frac, iterations };
  }, [fracInput]);

  // Hex color representation
  const hexColor = useMemo(() => {
    const toHex = (n) => Math.max(0, Math.min(255, n)).toString(16).toUpperCase().padStart(2, "0");
    return `#${toHex(rgbR)}${toHex(rgbG)}${toHex(rgbB)}`;
  }, [rgbR, rgbG, rgbB]);

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
            <span>Computer Architecture Masterclass · Module 001 · Topic 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight mb-4">
            Conversion from Decimal to HexaDecimal
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Master radix-16 mathematics, the successive division &amp; multiplication algorithms, 4-bit nibble groupings, memory address pointer formats, and true-color hardware encodings.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-teal-300">
              ➗ Successive Division by 16
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-cyan-300">
              ✖️ Fractional Radix-16 Multiplication
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-indigo-300">
              📦 4-Bit Nibble ↔ Hex Digit Mapping
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-amber-300">
              🎨 24-Bit TrueColor RGB / Memory Pointers
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
                Classroom Lecture: The Bridge from Silicon to Human Comprehension
              </h2>
              <p className="text-xs text-slate-400">
                Sukanta Hui · Coder &amp; AccoTax · Shibtala Road, Barrackpore
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
            <p>
              Why do software and hardware engineers use Hexadecimal (Base-16) instead of writing raw binary or pure decimal? The answer lies in the mathematical elegance of powers of two: <code className="text-teal-300 font-mono font-bold">16 = 2⁴</code>.
            </p>
            <p>
              In a 64-bit CPU architecture, a raw memory address is a blinding sequence of 64 ones and zeros:
              <br />
              <code className="text-xs sm:text-sm font-mono text-amber-300 bg-slate-950 px-2 py-1 rounded border border-slate-800 inline-block my-1 break-all">
                0111111111111110101110101111111100000000000000001010110011011110
              </code>
              <br />
              Converting this to decimal produces <code className="text-cyan-300 font-mono">9,222,969,876,243,983,582</code>, which conceals all the underlying bit patterns, byte boundaries, and bus alignment. But when expressed in Hexadecimal, each group of 4 bits collapses into exactly one symbol:
              <br />
              <code className="text-xs sm:text-sm font-mono text-teal-300 bg-slate-950 px-2 py-1 rounded border border-slate-800 inline-block my-1">
                0x7FFE_BAFF_0000_ACDE
              </code>
            </p>
            <p>
              Notice how easily you can read each individual byte: <code className="text-teal-300 font-mono">7F</code>, <code className="text-teal-300 font-mono">FE</code>, <code className="text-teal-300 font-mono">BA</code>, <code className="text-teal-300 font-mono">FF</code>, etc. Hexadecimal is the ultimate human shorthand for binary memory dumps, machine opcodes, hardware register maps, and network packets.
            </p>
          </div>

          {/* Hex Symbol Alphabet Table */}
          <div className="mt-8 overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/80 p-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-3">
              The 16 Hexadecimal Symbols &amp; Their 4-Bit Binary Equivalents
            </h3>
            <div className="grid grid-cols-4 sm:grid-cols-8 md:grid-cols-16 gap-1.5 text-center text-xs">
              {[
                { dec: 0, hex: "0", bin: "0000" },
                { dec: 1, hex: "1", bin: "0001" },
                { dec: 2, hex: "2", bin: "0010" },
                { dec: 3, hex: "3", bin: "0011" },
                { dec: 4, hex: "4", bin: "0100" },
                { dec: 5, hex: "5", bin: "0101" },
                { dec: 6, hex: "6", bin: "0110" },
                { dec: 7, hex: "7", bin: "0111" },
                { dec: 8, hex: "8", bin: "1000" },
                { dec: 9, hex: "9", bin: "1001" },
                { dec: 10, hex: "A", bin: "1010" },
                { dec: 11, hex: "B", bin: "1011" },
                { dec: 12, hex: "C", bin: "1100" },
                { dec: 13, hex: "D", bin: "1101" },
                { dec: 14, hex: "E", bin: "1110" },
                { dec: 15, hex: "F", bin: "1111" }
              ].map((item) => (
                <div
                  key={item.hex}
                  className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-teal-500/50 transition-colors"
                >
                  <div className="text-slate-400 text-[10px]">{item.dec}</div>
                  <div className="text-base font-bold text-teal-300 font-mono my-0.5">{item.hex}</div>
                  <div className="text-[10px] text-cyan-400 font-mono">{item.bin}</div>
                </div>
              ))}
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
                Interactive SVG diagrams detailing hardware radix division, nibble mapping, and fractional multiplication.
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
                1. Division by 16 Ladder
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
                2. Nibble &amp; Byte Architecture
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
                3. Fractional Multiplication
              </button>
            </div>
          </div>

          {/* Tab 1: Division by 16 Ladder */}
          {activeTab === "tab1" && (
            <div className="space-y-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <svg
                  viewBox="0 0 800 380"
                  className="w-full h-auto font-sans"
                  style={{ maxHeight: "420px" }}
                >
                  <defs>
                    <linearGradient id="ladderGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#0d9488" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
                    </linearGradient>
                    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#14b8a6" />
                    </marker>
                  </defs>

                  {/* Title Banner */}
                  <rect x="20" y="15" width="760" height="40" rx="8" fill="#1e293b" />
                  <text x="400" y="40" fill="#2dd4bf" fontSize="14" fontWeight="bold" textAnchor="middle">
                    Division by 16 Ladder: Decimal (7562)₁₀ → (1D8A)₁₆
                  </text>

                  {/* Step 1 */}
                  <rect x="40" y="75" width="460" height="50" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                  <text x="55" y="105" fill="#e2e8f0" fontSize="13" fontFamily="monospace">
                    7562 ÷ 16 = <tspan fill="#38bdf8" fontWeight="bold">472</tspan>
                  </text>
                  <text x="240" y="105" fill="#f59e0b" fontSize="13" fontFamily="monospace">
                    Remainder: 10
                  </text>
                  <rect x="360" y="85" width="120" height="30" rx="6" fill="#134e4a" stroke="#14b8a6" />
                  <text x="420" y="105" fill="#5eead4" fontSize="13" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                    10 → 'A' (LSD)
                  </text>

                  {/* Step 2 */}
                  <rect x="40" y="135" width="460" height="50" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                  <text x="55" y="165" fill="#e2e8f0" fontSize="13" fontFamily="monospace">
                     472 ÷ 16 = <tspan fill="#38bdf8" fontWeight="bold">29</tspan>
                  </text>
                  <text x="240" y="165" fill="#f59e0b" fontSize="13" fontFamily="monospace">
                    Remainder: 8
                  </text>
                  <rect x="360" y="145" width="120" height="30" rx="6" fill="#134e4a" stroke="#14b8a6" />
                  <text x="420" y="165" fill="#5eead4" fontSize="13" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                    8 → '8'
                  </text>

                  {/* Step 3 */}
                  <rect x="40" y="195" width="460" height="50" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                  <text x="55" y="225" fill="#e2e8f0" fontSize="13" fontFamily="monospace">
                      29 ÷ 16 = <tspan fill="#38bdf8" fontWeight="bold">1</tspan>
                  </text>
                  <text x="240" y="225" fill="#f59e0b" fontSize="13" fontFamily="monospace">
                    Remainder: 13
                  </text>
                  <rect x="360" y="205" width="120" height="30" rx="6" fill="#134e4a" stroke="#14b8a6" />
                  <text x="420" y="225" fill="#5eead4" fontSize="13" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                    13 → 'D'
                  </text>

                  {/* Step 4 */}
                  <rect x="40" y="255" width="460" height="50" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                  <text x="55" y="285" fill="#e2e8f0" fontSize="13" fontFamily="monospace">
                       1 ÷ 16 = <tspan fill="#38bdf8" fontWeight="bold">0</tspan>
                  </text>
                  <text x="240" y="285" fill="#f59e0b" fontSize="13" fontFamily="monospace">
                    Remainder: 1
                  </text>
                  <rect x="360" y="265" width="120" height="30" rx="6" fill="#134e4a" stroke="#14b8a6" />
                  <text x="420" y="285" fill="#5eead4" fontSize="13" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                    1 → '1' (MSD)
                  </text>

                  {/* Read Direction Arrow */}
                  <path d="M 520 285 L 520 105" stroke="#14b8a6" strokeWidth="3" fill="none" markerEnd="url(#arrow)" strokeDasharray="4 4" />
                  <text x="540" y="200" fill="#2dd4bf" fontSize="12" fontWeight="bold" transform="rotate(-90 540 200)">
                    READ BOTTOM-TO-TOP (MSD → LSD)
                  </text>

                  {/* Result Box */}
                  <rect x="580" y="125" width="190" height="150" rx="12" fill="#042f2e" stroke="#0d9488" strokeWidth="2" />
                  <text x="675" y="160" fill="#99f6e4" fontSize="12" fontWeight="bold" textAnchor="middle">
                    FINAL HEX RESULT
                  </text>
                  <text x="675" y="205" fill="#ffffff" fontSize="24" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                    0x1D8A
                  </text>
                  <text x="675" y="240" fill="#a7f3d0" fontSize="11" textAnchor="middle">
                    (1×4096 + 13×256 + 8×16 + 10)
                  </text>
                </svg>
              </div>
              <p className="text-xs text-slate-400">
                💡 <strong>Instructor Insight:</strong> The first remainder obtained from the initial division by 16 represents the units digit (<code className="text-teal-300">16⁰</code>), which is the Least Significant Digit (LSD). Never read remainders top-to-bottom for integers!
              </p>
            </div>
          )}

          {/* Tab 2: Nibble & Byte Architecture */}
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
                    Byte Architecture: 1 Byte (8 Bits) = 2 Nibbles (High &amp; Low) = 2 Hex Digits
                  </text>

                  {/* 8-bit Register Box */}
                  <rect x="80" y="80" width="640" height="80" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="2" />

                  {/* 8 Individual Bit Cells */}
                  {[
                    { bit: "1", label: "b7" },
                    { bit: "1", label: "b6" },
                    { bit: "0", label: "b5" },
                    { bit: "1", label: "b4" },
                    { bit: "1", label: "b3" },
                    { bit: "0", label: "b2" },
                    { bit: "0", label: "b1" },
                    { bit: "0", label: "b0" }
                  ].map((b, idx) => (
                    <g key={idx}>
                      <rect
                        x={80 + idx * 80}
                        y="80"
                        width="80"
                        height="80"
                        fill={idx < 4 ? "#1e1b4b" : "#042f2e"}
                        stroke="#475569"
                        strokeWidth="1"
                      />
                      <text
                        x={120 + idx * 80}
                        y="125"
                        fill="#ffffff"
                        fontSize="22"
                        fontWeight="bold"
                        fontFamily="monospace"
                        textAnchor="middle"
                      >
                        {b.bit}
                      </text>
                      <text
                        x={120 + idx * 80}
                        y="150"
                        fill="#94a3b8"
                        fontSize="10"
                        textAnchor="middle"
                      >
                        {b.label}
                      </text>
                    </g>
                  ))}

                  {/* High Nibble Bracket */}
                  <rect x="80" y="180" width="320" height="50" rx="8" fill="#312e81" stroke="#6366f1" strokeWidth="1.5" />
                  <text x="240" y="205" fill="#c7d2fe" fontSize="12" fontWeight="bold" textAnchor="middle">
                    HIGH NIBBLE (Bits 7..4: 1101)
                  </text>
                  <text x="240" y="223" fill="#ffffff" fontSize="14" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                    8 + 4 + 0 + 1 = 13 → Hex 'D'
                  </text>

                  {/* Low Nibble Bracket */}
                  <rect x="400" y="180" width="320" height="50" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                  <text x="560" y="205" fill="#a7f3d0" fontSize="12" fontWeight="bold" textAnchor="middle">
                    LOW NIBBLE (Bits 3..0: 1000)
                  </text>
                  <text x="560" y="223" fill="#ffffff" fontSize="14" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                    8 + 0 + 0 + 0 = 8 → Hex '8'
                  </text>

                  {/* Consolidated Output */}
                  <rect x="250" y="260" width="300" height="60" rx="10" fill="#0f172a" stroke="#14b8a6" strokeWidth="2" />
                  <text x="400" y="295" fill="#2dd4bf" fontSize="20" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                    Byte Value = 0xD8 (216₁₀)
                  </text>
                </svg>
              </div>
              <p className="text-xs text-slate-400">
                📦 <strong>Hardware Structure:</strong> Since every byte in RAM is 8 bits, it can always be represented by exactly two hexadecimal characters without truncation or loss.
              </p>
            </div>
          )}

          {/* Tab 3: Fractional Multiplication */}
          {activeTab === "tab3" && (
            <div className="space-y-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <svg
                  viewBox="0 0 800 340"
                  className="w-full h-auto font-sans"
                  style={{ maxHeight: "380px" }}
                >
                  <defs>
                    <marker id="downArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
                    </marker>
                  </defs>

                  {/* Title */}
                  <rect x="20" y="15" width="760" height="40" rx="8" fill="#1e293b" />
                  <text x="400" y="40" fill="#38bdf8" fontSize="14" fontWeight="bold" textAnchor="middle">
                    Successive Multiplication by 16: Decimal Fraction (0.6875)₁₀ → (0.B)₁₆
                  </text>

                  {/* Calculation Card */}
                  <rect x="40" y="80" width="460" height="90" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                  <text x="60" y="115" fill="#e2e8f0" fontSize="14" fontFamily="monospace">
                    0.6875 × 16 = <tspan fill="#38bdf8" fontWeight="bold">11.0000</tspan>
                  </text>
                  <text x="60" y="145" fill="#f59e0b" fontSize="13">
                    Integer Part = 11 → <tspan fill="#2dd4bf" fontWeight="bold">'B'</tspan> | Remaining Fraction = 0.0000 (Terminated)
                  </text>

                  {/* Second Step Example for (0.3125) */}
                  <rect x="40" y="190" width="460" height="90" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                  <text x="60" y="225" fill="#e2e8f0" fontSize="14" fontFamily="monospace">
                    0.3125 × 16 = <tspan fill="#38bdf8" fontWeight="bold">5.0000</tspan>
                  </text>
                  <text x="60" y="255" fill="#f59e0b" fontSize="13">
                    Integer Part = 5 → <tspan fill="#2dd4bf" fontWeight="bold">'5'</tspan> | Remaining Fraction = 0.0000 (Terminated)
                  </text>

                  {/* Direction Arrow */}
                  <path d="M 520 90 L 520 270" stroke="#38bdf8" strokeWidth="3" fill="none" markerEnd="url(#downArrow)" strokeDasharray="4 4" />
                  <text x="540" y="180" fill="#38bdf8" fontSize="12" fontWeight="bold" transform="rotate(90 540 180)">
                    READ TOP-TO-BOTTOM (MSD → LSD)
                  </text>

                  {/* Result Summary */}
                  <rect x="580" y="100" width="190" height="160" rx="12" fill="#0c4a6e" stroke="#0284c7" strokeWidth="2" />
                  <text x="675" y="135" fill="#bae6fd" fontSize="12" fontWeight="bold" textAnchor="middle">
                    FRACTIONAL CONVERSION
                  </text>
                  <text x="675" y="175" fill="#ffffff" fontSize="22" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                    0.6875 = 0.B₁₆
                  </text>
                  <text x="675" y="210" fill="#ffffff" fontSize="18" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                    0.3125 = 0.5₁₆
                  </text>
                  <text x="675" y="240" fill="#7dd3fc" fontSize="11" textAnchor="middle">
                    11/16 = 0.6875 | 5/16 = 0.3125
                  </text>
                </svg>
              </div>
              <p className="text-xs text-slate-400">
                ⚠️ <strong>Key Rule:</strong> Unlike integers which are read bottom-to-top, fractional bits/digits are read <strong>top-to-bottom</strong> as successive powers of <code className="text-teal-300">16⁻¹</code>, <code className="text-teal-300">16⁻²</code>, etc.
              </p>
            </div>
          )}
        </section>

        {/* ─── 4. Live Interactive Converter Workbench ─────────── */}
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
                Interactive Decimal ↔ Hexadecimal Workbench
              </h2>
              <p className="text-xs text-slate-400">
                Test any decimal number, inspect the dynamic step-by-step division ladder, and preview 24-bit TrueColor Hex codes.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Integer Converter */}
            <div className="space-y-4">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                Enter Decimal Integer:
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="0"
                  max="100000000"
                  value={decInput}
                  onChange={(e) => setDecInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono text-sm focus:border-teal-500 focus:outline-none"
                  placeholder="e.g. 7562"
                />
                <button
                  onClick={() => setDecInput("65535")}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg text-slate-300 transition-colors"
                >
                  65535
                </button>
                <button
                  onClick={() => setDecInput("1048576")}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg text-slate-300 transition-colors"
                >
                  1MB
                </button>
              </div>

              {integerDivisionSteps.error ? (
                <div className="p-3 rounded-lg bg-red-950/60 border border-red-700/50 text-red-300 text-xs">
                  {integerDivisionSteps.error}
                </div>
              ) : (
                <>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-400">Hexadecimal Result:</span>
                      <span className="text-lg font-bold font-mono text-teal-300">
                        0x{integerDivisionSteps.result}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-400">Binary 4-Bit Grouping:</span>
                      <span className="text-xs font-mono text-cyan-300">
                        {integerDivisionSteps.binary}
                      </span>
                    </div>
                  </div>

                  <div className="overflow-x-auto max-h-60 rounded-lg border border-slate-800">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-slate-800 text-slate-300 sticky top-0">
                        <tr>
                          <th className="p-2">Dividend</th>
                          <th className="p-2">÷ 16</th>
                          <th className="p-2">Quotient</th>
                          <th className="p-2">Remainder</th>
                          <th className="p-2 text-teal-300">Hex Digit</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 bg-slate-950/50">
                        {integerDivisionSteps.steps.map((s, idx) => (
                          <tr key={idx} className="hover:bg-slate-900/80">
                            <td className="p-2 text-slate-200">{s.dividend}</td>
                            <td className="p-2 text-slate-400">÷ 16</td>
                            <td className="p-2 text-cyan-300">{s.quotient}</td>
                            <td className="p-2 text-amber-300">{s.remainder}</td>
                            <td className="p-2 font-bold text-teal-300">
                              '{s.hexDigit}' {idx === 0 ? "(LSD)" : idx === integerDivisionSteps.steps.length - 1 ? "(MSD)" : ""}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>

            {/* Right: TrueColor RGB Hex Picker */}
            <div className="space-y-4">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                24-Bit TrueColor RGB ↔ Hex Code Simulator:
              </label>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center gap-4">
                  <div
                    className="w-16 h-16 rounded-xl border-2 border-slate-700 shadow-inner flex-shrink-0 transition-all duration-300"
                    style={{ backgroundColor: hexColor }}
                  />
                  <div>
                    <div className="text-xs text-slate-400">Calculated CSS/Hardware Hex:</div>
                    <div className="text-xl font-bold font-mono text-white tracking-wider">
                      {hexColor}
                    </div>
                    <div className="text-[11px] text-teal-400 font-mono">
                      RGB({rgbR}, {rgbG}, {rgbB})
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
                  <div>
                    <div className="flex justify-between text-slate-400 mb-1">
                      <span>Red Channel (0-255): {rgbR}</span>
                      <span className="font-mono text-red-400">0x{rgbR.toString(16).toUpperCase().padStart(2, "0")}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="255"
                      value={rgbR}
                      onChange={(e) => setRgbR(parseInt(e.target.value, 10))}
                      className="w-full accent-red-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-400 mb-1">
                      <span>Green Channel (0-255): {rgbG}</span>
                      <span className="font-mono text-green-400">0x{rgbG.toString(16).toUpperCase().padStart(2, "0")}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="255"
                      value={rgbG}
                      onChange={(e) => setRgbG(parseInt(e.target.value, 10))}
                      className="w-full accent-green-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-400 mb-1">
                      <span>Blue Channel (0-255): {rgbB}</span>
                      <span className="font-mono text-blue-400">0x{rgbB.toString(16).toUpperCase().padStart(2, "0")}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="255"
                      value={rgbB}
                      onChange={(e) => setRgbB(parseInt(e.target.value, 10))}
                      className="w-full accent-blue-500"
                    />
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
              How students and engineers in Barrackpore, Ichapur, Jadavpur, and Kolkata apply decimal-to-hex conversions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Scenario 1: Mamata */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-teal-500/40 transition-all">
              <div className="flex items-center gap-2 text-teal-400 font-semibold text-sm mb-2">
                <span>📍</span>
                <span>Barrackpore: ARM Cortex-M4 Microcontroller Firmware</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Mamata</strong> is writing bare-metal C drivers for an STM32 microcontroller. The GPIO Port A base address is specified in the technical datasheet as decimal offset <code className="text-teal-300 font-mono">1073872896</code>. Mamata converts this decimal address to hexadecimal <code className="text-teal-300 font-mono">0x40020000</code> to define the memory-mapped I/O pointer: <code className="text-amber-300 font-mono">#define GPIOA_BASE (0x40020000UL)</code>.
              </p>
            </div>

            {/* Scenario 2: Susmita */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 transition-all">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm mb-2">
                <span>📍</span>
                <span>Ichapur: Factory Automation &amp; 24-Bit RGB Display Control</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Susmita</strong> programs an industrial status indicator board. The sensor input indicates an alert color of Red=255, Green=138, Blue=61. By converting each channel (255→FF, 138→8A, 61→3D), she generates the compact 3-byte payload <code className="text-cyan-300 font-mono">0xFF8A3D</code> transmitted over RS-485 serial cables across the plant floor.
              </p>
            </div>

            {/* Scenario 3: Debangshu */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all">
              <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm mb-2">
                <span>📍</span>
                <span>Jadavpur: x86-64 Virtual Memory &amp; Page Table Walking</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Debangshu</strong> is auditing an operating systems kernel crash dump. The faulting address reported by the CPU MMU in decimal is <code className="text-indigo-300 font-mono">140734799806464</code>. Debangshu converts it to <code className="text-indigo-300 font-mono">0x7FFE_3FFF_0000</code>, instantly isolating the 9-bit Level-4 Page Table Index, Directory Index, and 4KB page offset.
              </p>
            </div>

            {/* Scenario 4: Mahima */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/40 transition-all">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm mb-2">
                <span>📍</span>
                <span>Kolkata: High-Speed Network Packet Inspection</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Mahima</strong> develops a zero-copy packet parser at a financial trading desk. When packet headers arrive as raw decimal byte streams, she converts the protocol type identifiers (decimal 2048 to <code className="text-amber-300 font-mono">0x0800</code> for IPv4 and decimal 34525 to <code className="text-amber-300 font-mono">0x86DD</code> for IPv6) to route market telemetry under 50 nanoseconds.
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
                <span><strong>Writing '10' instead of 'A':</strong> In hexadecimal, remainders 10 to 15 must be replaced by symbols A through F. Writing 10 creates two digits instead of one.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">•</span>
                <span><strong>Reversing Integer Read Direction:</strong> For integers, remainders must be read from bottom to top (last remainder = MSD).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">•</span>
                <span><strong>Reversing Fractional Read Direction:</strong> For fractions, products are read from top to bottom (first integer part = MSD after radix point).</span>
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
                <span><strong>Always Use Standard Prefixes:</strong> In code, write <code className="text-teal-300 font-mono">0x2A</code> or <code className="text-teal-300 font-mono">0xFF</code> to avoid compiler ambiguity with decimal integers.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">•</span>
                <span><strong>Align on Byte Boundaries:</strong> Pad hex numbers with leading zeros to match architecture widths: 2 digits for 8-bit, 4 for 16-bit, 8 for 32-bit, 16 for 64-bit.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">•</span>
                <span><strong>Shortcut via Binary Nibbles:</strong> Convert decimal → binary → 4-bit nibbles → hex for rapid mental calculation.</span>
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
              <span>1 Hex Digit = Exactly 4 Binary Bits (1 Nibble)</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
              <span className="text-teal-400 font-bold">✓</span>
              <span>A=10, B=11, C=12, D=13, E=14, F=15</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
              <span className="text-teal-400 font-bold">✓</span>
              <span>Integers: Successive Division by 16 (Bottom-to-Top)</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
              <span className="text-teal-400 font-bold">✓</span>
              <span>Fractions: Successive Multiplication by 16 (Top-to-Bottom)</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
              <span className="text-teal-400 font-bold">✓</span>
              <span>1 Byte = 2 Hex Digits (Max value 0xFF = 255)</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
              <span className="text-teal-400 font-bold">✓</span>
              <span>Always prefix literals with 0x in C/C++/Python/JS</span>
            </div>
          </div>
        </section>

        {/* ─── 8. FAQ Section ─────────────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <FAQTemplate
            title="Conversion from Decimal to HexaDecimal FAQs"
            questions={questions}
          />
        </section>

        {/* ─── 9. Teacher's Note ──────────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <Teacher
            note={
              "Remember: When working on embedded systems, Linux device drivers, or network packet analyzers, you will rarely look at raw binary. Hexadecimal is your day-to-day language. Practice converting powers of 16 (16, 256, 4096, 65536) in your head. When converting fractions, watch out for recurring fractions like 0.1, which produces 0.19999... in hex. Always double-check your remainders 10 through 15 and map them accurately to letters A through F!"
            }
          />
        </section>

        {/* ─── 10. Printable Plain Text Document ──────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            title="Topic 3: Conversion from Decimal to HexaDecimal"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note"
            downloadFileName="topic3_decimal_to_hexadecimal_note.txt"
          />
        </section>

      </div>
    </>
  );
};

export default Topic3;
