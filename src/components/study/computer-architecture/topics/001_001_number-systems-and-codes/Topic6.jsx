import React, { useState, useEffect, useRef, useMemo } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";

/**
 * Topic6 – 1’s Complement representation of negative numbers
 * Module: 001_001_number-systems-and-codes (Number Systems & Binary Codes)
 * Track: Computer Architecture – From Core Systems to Performance Engineering
 */
const Topic6 = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [valA, setValA] = useState("28");
  const [valB, setValB] = useState("-15");
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

  // Convert decimal to 8-bit 1's complement binary
  const toOnesComp = (num) => {
    const isNeg = num < 0;
    const absVal = Math.abs(num);
    const posBin = absVal.toString(2).padStart(8, "0");
    if (!isNeg) return { binary: posBin, isNeg: false };

    // Invert bits
    let inverted = "";
    for (let char of posBin) {
      inverted += char === "0" ? "1" : "0";
    }
    return { binary: inverted, isNeg: true };
  };

  // 1's Complement Addition with End-Around Carry Calculator
  const arithmeticResult = useMemo(() => {
    const a = parseInt(valA, 10);
    const b = parseInt(valB, 10);

    if (isNaN(a) || isNaN(b) || a < -127 || a > 127 || b < -127 || b > 127) {
      return { error: "Please enter integers between -127 and +127 (8-bit limit)", isError: true };
    }

    const binA = toOnesComp(a).binary;
    const binB = toOnesComp(b).binary;

    // Perform raw binary addition
    let carry = 0;
    let intermediateBits = [];
    for (let i = 7; i >= 0; i--) {
      const bitA = parseInt(binA[i], 10);
      const bitB = parseInt(binB[i], 10);
      const sum = bitA + bitB + carry;
      intermediateBits.unshift(sum % 2);
      carry = Math.floor(sum / 2);
    }

    const intermediateBin = intermediateBits.join("");
    const endCarry = carry; // carry out of MSB

    // Add end-around carry
    let finalBits = [];
    let finalCarry = endCarry;
    for (let i = 7; i >= 0; i--) {
      const bit = intermediateBits[i];
      const sum = bit + finalCarry;
      finalBits.unshift(sum % 2);
      finalCarry = Math.floor(sum / 2);
    }

    const finalBin = finalBits.join("");
    const theoreticalSum = a + b;

    // Decode final binary in 1's comp
    let decodedDec = 0;
    if (finalBin[0] === "0") {
      decodedDec = parseInt(finalBin, 2);
    } else {
      let inv = "";
      for (let c of finalBin) inv += c === "0" ? "1" : "0";
      decodedDec = -parseInt(inv, 2);
    }

    const hex = "0x" + parseInt(finalBin, 2).toString(16).toUpperCase().padStart(2, "0");

    return {
      a,
      b,
      binA,
      binB,
      intermediateBin,
      endCarry,
      finalBin,
      theoreticalSum,
      decodedDec,
      hex,
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
            <span>Computer Architecture Masterclass · Module 001 · Topic 6</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight mb-4">
            1’s Complement Representation of Negative Numbers
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Discover the bitwise inversion mechanism, master the End-Around Carry addition rule, explore historic supercomputer architectures (CDC 6600), and understand why the modern Internet uses 1's complement checksums.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-teal-300">
              🔄 Bitwise NOT Inversion
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-cyan-300">
              🔁 End-Around Carry Addition Rule
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-indigo-300">
              ⚡ 0-Delay Negation (Seymour Cray CDC 6600)
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-amber-300">
              🌐 RFC 1071 IPv4 &amp; TCP Checksum
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
                Classroom Lecture: Bit Inversion, End-Around Carry &amp; Internet Protocols
              </h2>
              <p className="text-xs text-slate-400">
                Sukanta Hui · Coder &amp; AccoTax · Shibtala Road, Barrackpore
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
            <p>
              In <strong>1's Complement</strong> representation, forming a negative number is conceptually the simplest operation in digital electronics: you simply invert every bit of the positive number (<code className="text-teal-300 font-mono">0 → 1</code> and <code className="text-teal-300 font-mono">1 → 0</code>). In hardware, this requires only basic inverter gates (NOT gates) with virtually zero logic delay!
            </p>
            <p>
              However, 1's complement arithmetic requires a special rule: <strong>The End-Around Carry</strong>.
              <br />
              Because 1's complement operates mathematically modulo <code className="text-cyan-300 font-mono">(2ⁿ - 1)</code> rather than modulo <code className="text-cyan-300 font-mono">2ⁿ</code>, any carry-out from the Most Significant Bit (MSB) represents a missing <code className="text-amber-300 font-mono">+1</code> that must be routed back and added to the Least Significant Bit (LSB).
            </p>
            <p>
              While 2's complement eventually replaced 1's complement in general-purpose CPU integer ALUs, 1's complement remains alive and essential across the entire global Internet: the <strong>IPv4 Header Checksum, TCP Checksum, and UDP Checksum</strong> all use 16-bit 1's complement addition because it produces identical results regardless of CPU byte endianness!
            </p>
          </div>

          {/* Quick Dual Zero Box */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30">
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
                Positive Zero (+0)
              </div>
              <div className="text-xl font-bold font-mono text-white mb-1">
                0000 0000 (0x00)
              </div>
              <div className="text-xs text-slate-400">Standard all-zeros binary state.</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-red-500/30">
              <div className="text-xs font-bold text-red-400 uppercase tracking-wider mb-1">
                Negative Zero (-0)
              </div>
              <div className="text-xl font-bold font-mono text-white mb-1">
                1111 1111 (0xFF)
              </div>
              <div className="text-xs text-slate-400">All-ones state obtained by inverting +0.</div>
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
                Interactive vector diagrams detailing bit inversion, end-around carry propagation, and RFC 1071 Internet checksums.
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
                1. Bit Inversion &amp; Negation
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
                2. End-Around Carry Circuit
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
                3. RFC 1071 Internet Checksum
              </button>
            </div>
          </div>

          {/* Tab 1: Bit Inversion */}
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
                    Bitwise NOT Inversion: Decimal (+28) → 1's Complement (-28)
                  </text>

                  {/* Positive Binary */}
                  <g transform="translate(60, 75)">
                    <text x="0" y="20" fill="#a7f3d0" fontSize="12" fontWeight="bold">
                      Positive +28 Binary (0x1C):
                    </text>
                    {["0", "0", "0", "1", "1", "1", "0", "0"].map((bit, idx) => (
                      <g key={idx}>
                        <rect x={idx * 80} y="30" width="75" height="50" rx="6" fill="#042f2e" stroke="#0d9488" strokeWidth="1.5" />
                        <text x={37 + idx * 80} y="62" fill="#5eead4" fontSize="20" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                          {bit}
                        </text>
                      </g>
                    ))}
                  </g>

                  {/* Inverter NOT Gates Indicator */}
                  <g transform="translate(60, 170)">
                    <text x="340" y="20" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle">
                      ⬇ BITWISE NOT OPERATION (~ INVERTERS) ⬇
                    </text>
                  </g>

                  {/* Negative 1's Comp Binary */}
                  <g transform="translate(60, 205)">
                    <text x="0" y="20" fill="#fca5a5" fontSize="12" fontWeight="bold">
                      1's Complement -28 (0xE3):
                    </text>
                    {["1", "1", "1", "0", "0", "0", "1", "1"].map((bit, idx) => (
                      <g key={idx}>
                        <rect x={idx * 80} y="30" width="75" height="50" rx="6" fill="#450a0a" stroke="#dc2626" strokeWidth="1.5" />
                        <text x={37 + idx * 80} y="62" fill="#fca5a5" fontSize="20" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                          {bit}
                        </text>
                      </g>
                    ))}
                  </g>

                  {/* Summary */}
                  <rect x="60" y="300" width="680" height="40" rx="6" fill="#0f172a" stroke="#334155" />
                  <text x="400" y="325" fill="#cbd5e1" fontSize="12" textAnchor="middle">
                    Formula: 1's Comp = (2⁸ - 1) - 28 = 255 - 28 = 227 (11100011₂ = 0xE3)
                  </text>
                </svg>
              </div>
              <p className="text-xs text-slate-400">
                💡 <strong>Instructor Insight:</strong> Notice how simple negation is in 1's complement. Every 0 flips to 1, and every 1 flips to 0 with zero arithmetic carry ripple!
              </p>
            </div>
          )}

          {/* Tab 2: End-Around Carry */}
          {activeTab === "tab2" && (
            <div className="space-y-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <svg
                  viewBox="0 0 800 360"
                  className="w-full h-auto font-sans"
                  style={{ maxHeight: "400px" }}
                >
                  <defs>
                    <marker id="loopArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
                    </marker>
                  </defs>

                  {/* Title */}
                  <rect x="20" y="15" width="760" height="40" rx="8" fill="#1e293b" />
                  <text x="400" y="40" fill="#2dd4bf" fontSize="14" fontWeight="bold" textAnchor="middle">
                    The End-Around Carry Addition Rule: (+28) + (-15) = +13
                  </text>

                  {/* Addition Box */}
                  <rect x="60" y="75" width="460" height="170" rx="8" fill="#0f172a" stroke="#334155" />
                  <text x="80" y="105" fill="#5eead4" fontSize="14" fontFamily="monospace">
                      0001 1100  (+28)
                  </text>
                  <text x="80" y="135" fill="#fca5a5" fontSize="14" fontFamily="monospace">
                    + 1111 0000  (-15 in 1's comp)
                  </text>
                  <line x1="80" y1="145" x2="320" y2="145" stroke="#64748b" strokeWidth="2" />
                  <text x="80" y="175" fill="#e2e8f0" fontSize="14" fontFamily="monospace">
                    <tspan fill="#f59e0b" fontWeight="bold">1</tspan> 0000 1100  (Raw Sum with End Carry = 1)
                  </text>
                  <text x="80" y="205" fill="#f59e0b" fontSize="13" fontFamily="monospace">
                    +         1  (End-Around Carry added to LSB)
                  </text>
                  <line x1="80" y1="215" x2="320" y2="215" stroke="#14b8a6" strokeWidth="2" />
                  <text x="80" y="235" fill="#2dd4bf" fontSize="15" fontWeight="bold" fontFamily="monospace">
                      0000 1101  (+13₁₀ verified!)
                  </text>

                  {/* Loop Arrow from MSB Carry to LSB */}
                  <path d="M 120 180 C 40 180, 40 280, 280 280 C 360 280, 360 220, 240 205" stroke="#f59e0b" strokeWidth="2.5" fill="none" markerEnd="url(#loopArrow)" strokeDasharray="5 5" />
                  <text x="200" y="300" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">
                    END-AROUND CARRY FEEDBACK LOOP
                  </text>

                  {/* Explanation Side Panel */}
                  <rect x="540" y="75" width="200" height="250" rx="8" fill="#042f2e" stroke="#0d9488" />
                  <text x="640" y="105" fill="#99f6e4" fontSize="12" fontWeight="bold" textAnchor="middle">
                    HOW IT WORKS
                  </text>
                  <text x="555" y="135" fill="#cbd5e1" fontSize="11">
                    1. When MSB carry = 1, the result is positive.
                  </text>
                  <text x="555" y="175" fill="#cbd5e1" fontSize="11">
                    2. Add the carry bit into the LSB to account for mod (2ⁿ - 1).
                  </text>
                  <text x="555" y="225" fill="#cbd5e1" fontSize="11">
                    3. If no carry occurs, result is negative in 1's complement form.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-slate-400">
                🔁 <strong>Hardware Limitation:</strong> The feedback loop forces the adder to propagate carries twice, which is why 2's complement (which simply discards the end carry) is much faster for CPUs!
              </p>
            </div>
          )}

          {/* Tab 3: RFC 1071 Checksum */}
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
                    Internet Architecture: RFC 1071 16-Bit 1's Complement Checksum (IPv4 / TCP / UDP)
                  </text>

                  {/* Packet Header Diagram */}
                  <rect x="40" y="75" width="720" height="60" rx="8" fill="#0f172a" stroke="#334155" />
                  <text x="60" y="105" fill="#38bdf8" fontSize="12" fontWeight="bold">IPv4 Header 16-Bit Words:</text>
                  <text x="60" y="125" fill="#e2e8f0" fontSize="12" fontFamily="monospace">
                    [0x4500] + [0x003C] + [0x1C46] + [0x4000] + [0x4006] + [0x0000] ...
                  </text>

                  {/* Summation Process */}
                  <rect x="40" y="150" width="720" height="160" rx="8" fill="#042f2e" stroke="#0d9488" strokeWidth="1.5" />
                  <text x="60" y="180" fill="#99f6e4" fontSize="13" fontWeight="bold">
                    Why 1's Complement is Used in Networking:
                  </text>
                  <text x="60" y="210" fill="#cbd5e1" fontSize="12">
                    1. <tspan fill="#5eead4" fontWeight="bold">Endianness Independence:</tspan> 1's complement sum yields identical bytes on Big-Endian (Network) and Little-Endian (x86) CPUs without byte swapping!
                  </text>
                  <text x="60" y="240" fill="#cbd5e1" fontSize="12">
                    2. <tspan fill="#5eead4" fontWeight="bold">Receiver Verification:</tspan> Receiver sums all words + checksum field; valid packets always sum to <tspan fill="#f59e0b" fontWeight="bold">0xFFFF (-0)</tspan>.
                  </text>
                  <text x="60" y="270" fill="#cbd5e1" fontSize="12">
                    3. <tspan fill="#5eead4" fontWeight="bold">Incremental Updates:</tspan> Routers decrement TTL and update the checksum using simple 1's complement math without recalculating the entire header!
                  </text>
                </svg>
              </div>
              <p className="text-xs text-slate-400">
                🌐 <strong>Every Packet on Earth:</strong> Whenever you browse the web, every single IPv4 and TCP packet travelling through Kolkata and global fiber cables is validated using 1's complement addition!
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
                1's Complement Arithmetic &amp; End-Around Carry Workbench
              </h2>
              <p className="text-xs text-slate-400">
                Enter any two signed integers (-127 to +127) and trace the full binary addition with end-around carry feedback.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Controls */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Operand A (-127 to +127):
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="-127"
                    max="127"
                    value={valA}
                    onChange={(e) => setValA(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono text-sm focus:border-teal-500 focus:outline-none"
                    placeholder="e.g. 28"
                  />
                  <button
                    onClick={() => setValA("28")}
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg text-slate-300"
                  >
                    +28
                  </button>
                  <button
                    onClick={() => setValA("-28")}
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg text-slate-300"
                  >
                    -28
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Operand B (-127 to +127):
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="-127"
                    max="127"
                    value={valB}
                    onChange={(e) => setValB(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono text-sm focus:border-teal-500 focus:outline-none"
                    placeholder="e.g. -15"
                  />
                  <button
                    onClick={() => setValB("-15")}
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg text-slate-300"
                  >
                    -15
                  </button>
                  <button
                    onClick={() => setValB("15")}
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg text-slate-300"
                  >
                    +15
                  </button>
                </div>
              </div>

              {arithmeticResult.isError ? (
                <div className="p-3 rounded-lg bg-red-950/60 border border-red-700/50 text-red-300 text-xs">
                  {arithmeticResult.error}
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Operand A Binary:</span>
                    <span className="text-teal-300">{arithmeticResult.binA} ({arithmeticResult.a})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Operand B (1's Comp):</span>
                    <span className="text-teal-300">{arithmeticResult.binB} ({arithmeticResult.b})</span>
                  </div>
                </div>
              )}
            </div>

            {/* Arithmetic Trace & Result */}
            {!arithmeticResult.isError && (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-teal-500/40 space-y-3 font-mono text-xs">
                  <div className="text-slate-400 font-sans font-bold uppercase tracking-wider text-[11px]">
                    Step-by-Step 1's Complement Adder Trace:
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                    <div className="flex justify-between">
                      <span>  {arithmeticResult.binA}</span>
                      <span className="text-slate-400">({arithmeticResult.a})</span>
                    </div>
                    <div className="flex justify-between">
                      <span>+ {arithmeticResult.binB}</span>
                      <span className="text-slate-400">({arithmeticResult.b})</span>
                    </div>
                    <div className="border-t border-slate-700 pt-1 flex justify-between font-bold">
                      <span className="text-amber-300">
                        {arithmeticResult.endCarry === 1 ? "1 " : "  "}{arithmeticResult.intermediateBin}
                      </span>
                      <span className="text-amber-300">
                        {arithmeticResult.endCarry === 1 ? "(End Carry = 1)" : "(No End Carry)"}
                      </span>
                    </div>

                    {arithmeticResult.endCarry === 1 && (
                      <>
                        <div className="text-cyan-300 pt-1">+        1 (Add End Carry to LSB)</div>
                        <div className="border-t border-teal-500 pt-1 text-teal-300 font-bold text-sm">
                          = {arithmeticResult.finalBin}
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-slate-800 text-sm">
                    <span className="text-slate-300 font-sans font-semibold">Decoded 1's Comp Result:</span>
                    <span className="text-lg font-bold text-teal-300 font-mono">
                      {arithmeticResult.decodedDec} ({arithmeticResult.hex})
                    </span>
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
              Applications of 1's complement arithmetic and checksum algorithms across West Bengal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Scenario 1: Mamata */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-teal-500/40 transition-all">
              <div className="flex items-center gap-2 text-teal-400 font-semibold text-sm mb-2">
                <span>📍</span>
                <span>Barrackpore: Wireshark Packet Sniffing &amp; IPv4 Checksum Verification</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Mamata</strong> is building an intrusion detection system in Barrackpore. When raw Ethernet frames arrive, she extracts the 20-byte IPv4 header, sums the 16-bit words using 1's complement addition with end-around carry, and validates that the total equals <code className="text-teal-300 font-mono">0xFFFF</code>. Corrupted packets with bit errors fail the checksum and are dropped instantly.
              </p>
            </div>

            {/* Scenario 2: Susmita */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 transition-all">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm mb-2">
                <span>📍</span>
                <span>Ichapur: High-Speed FPGA Signal Inverter Pipeline</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Susmita</strong> synthesizes an optical signal processing pipeline on a Xilinx FPGA in Ichapur. Generating 1's complement negation requires only routing signals through inverters (<code className="text-cyan-300 font-mono">assign inv_signal = ~signal;</code>) with 0 logic depth, allowing the circuit to run at a blistering 800 MHz clock frequency.
              </p>
            </div>

            {/* Scenario 3: Debangshu */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all">
              <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm mb-2">
                <span>📍</span>
                <span>Jadavpur: Seymour Cray's CDC 6600 Supercomputer Emulation</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Debangshu</strong> is researching historical computer architectures at Jadavpur University. He models the 60-bit 1's complement ALU of the 1964 CDC 6600, studying how Cray achieved world-record supercomputing speeds by avoiding incremental adder stages during register subtraction.
              </p>
            </div>

            {/* Scenario 4: Mahima */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/40 transition-all">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm mb-2">
                <span>📍</span>
                <span>Kolkata: Ultra-Low Latency TCP Checksum NIC Offload</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Mahima</strong> tunes low-latency market order execution engines in Salt Lake, Kolkata. She leverages hardware Network Interface Card (NIC) offloads that compute 16-bit 1's complement TCP checksums directly in silicon ASIC pipelines, saving 400 nanoseconds per financial trade payload.
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
                <span><strong>Forgetting the End-Around Carry:</strong> If an addition generates a carry out of the MSB, you MUST add it back to the LSB, otherwise the result is off by 1!</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">•</span>
                <span><strong>Ignoring Negative Zero:</strong> Forgetting that <code className="text-red-300 font-mono">1111 1111</code> is <code className="text-red-300 font-mono">-0</code> and not <code className="text-red-300 font-mono">-1</code> in 1's complement.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">•</span>
                <span><strong>Confusing with 2's Complement:</strong> 1's complement is just bit inversion (~); 2's complement is bit inversion PLUS 1 (~ + 1).</span>
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
                <span><strong>Master RFC 1071 Checksum:</strong> In networking and backend engineering, know how 1's complement sums guarantee endian-neutral packet integrity.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">•</span>
                <span><strong>Use 2's Comp for ALUs:</strong> Avoid 1's complement for CPU integer arithmetic to eliminate end-around carry delay and dual zeros.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">•</span>
                <span><strong>Fast FPGA Bit Inversion:</strong> Use Verilog `~` operator for instantaneous 0-delay negation blocks.</span>
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
              <span>1's Comp = Bitwise Inversion of Positive Binary</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
              <span className="text-teal-400 font-bold">✓</span>
              <span>Range: [-(2ⁿ⁻¹ - 1) to +(2ⁿ⁻¹ - 1)]</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
              <span className="text-teal-400 font-bold">✓</span>
              <span>Dual Zero: +0 (0000 0000) and -0 (1111 1111)</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
              <span className="text-teal-400 font-bold">✓</span>
              <span>End Carry = 1 → Add +1 to LSB (End-Around Carry)</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
              <span className="text-teal-400 font-bold">✓</span>
              <span>No End Carry → Result is Negative in 1's Comp</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
              <span className="text-teal-400 font-bold">✓</span>
              <span>Standardized in IPv4/TCP/UDP Checksums (RFC 1071)</span>
            </div>
          </div>
        </section>

        {/* ─── 8. FAQ Section ─────────────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <FAQTemplate
            title="1’s Complement Representation FAQs"
            questions={questions}
          />
        </section>

        {/* ─── 9. Teacher's Note ──────────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <Teacher
            note={
              "Students often ask: 'If 2's complement is better, why do we still learn 1's complement?' The answer is twofold: first, 1's complement is the mathematical stepping stone to 2's complement (2's complement is just 1's complement + 1). Second, 1's complement is the fundamental protocol algorithm behind the entire Internet's packet integrity checking (RFC 1071)! Always remember the End-Around Carry rule when solving exam problems."
            }
          />
        </section>

        {/* ─── 10. Printable Plain Text Document ──────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            title="Topic 6: 1’s Complement Representation of Negative Numbers"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note"
            downloadFileName="topic6_ones_complement_representation_note.txt"
          />
        </section>

      </div>
    </>
  );
};

export default Topic6;
