import React, { useState, useEffect, useRef, useMemo } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";

/**
 * Topic8 – Range of numbers in n-bit signed systems
 * Module: 001_001_number-systems-and-codes (Number Systems & Binary Codes)
 * Track: Computer Architecture – From Core Systems to Performance Engineering
 */
const Topic8 = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [selectedBits, setSelectedBits] = useState(8);
  const [targetNumber, setTargetNumber] = useState("500");
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

  // Range calculations for selected bit-width n
  const bitStats = useMemo(() => {
    const n = Math.max(1, Math.min(64, selectedBits));
    const totalStatesBig = 2n ** BigInt(n);
    const uMin = "0";
    const uMax = (totalStatesBig - 1n).toLocaleString();

    const halfStates = 2n ** BigInt(n - 1);
    const twosMin = (-halfStates).toLocaleString();
    const twosMax = (halfStates - 1n).toLocaleString();

    const symMax = (halfStates - 1n).toLocaleString();
    const symMin = (-(halfStates - 1n)).toLocaleString();

    return {
      n,
      totalStates: totalStatesBig.toLocaleString(),
      uMin,
      uMax,
      twosMin,
      twosMax,
      symMin,
      symMax
    };
  }, [selectedBits]);

  // Sizing Calculator: minimum bits needed for a given decimal number D
  const sizingResult = useMemo(() => {
    try {
      const d = BigInt(targetNumber.trim());
      const isNeg = d < 0n;
      const absD = isNeg ? -d : d;

      // Unsigned bits needed
      let uBits = "N/A (Negative)";
      if (!isNeg) {
        let b = 1;
        while (2n ** BigInt(b) <= d) b++;
        uBits = `${b} bits [0 to ${(2n ** BigInt(b) - 1n).toLocaleString()}]`;
      }

      // Signed 2's Complement bits needed
      let sBits = 1;
      if (!isNeg) {
        while (2n ** BigInt(sBits - 1) - 1n < d) sBits++;
      } else {
        while (2n ** BigInt(sBits - 1) < absD) sBits++;
      }
      const sMin = (- (2n ** BigInt(sBits - 1))).toLocaleString();
      const sMax = (2n ** BigInt(sBits - 1) - 1n).toLocaleString();
      const signedRange = `${sBits} bits [${sMin} to ${sMax}]`;

      // Standard Container Recommendation
      let container = "int8_t / uint8_t (8 bits)";
      if (sBits > 8 && sBits <= 16) container = "int16_t / uint16_t (16 bits)";
      else if (sBits > 16 && sBits <= 32) container = "int32_t / uint32_t (32 bits)";
      else if (sBits > 32 && sBits <= 64) container = "int64_t / uint64_t (64 bits)";
      else if (sBits > 64) container = "__int128 / BigInteger (128+ bits)";

      return {
        d: d.toLocaleString(),
        isNeg,
        uBits,
        signedRange,
        container,
        isError: false
      };
    } catch {
      return { error: "Please enter a valid decimal integer", isError: true };
    }
  }, [targetNumber]);

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
            <span>Computer Architecture Masterclass · Module 001 · Topic 8</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight mb-4">
            Range of Numbers in N-Bit Signed Systems
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Master the mathematical dynamic range formulas across Unsigned, Sign-Magnitude, 1's Complement, and 2's Complement systems; calculate minimum bit-width sizing; and explore historic integer overflows like Year 2038 and Ariane 5.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs font-medium text-slate-400">
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-teal-300">
              📊 Range: [-2ⁿ⁻¹ to +2ⁿ⁻¹-1]
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-cyan-300">
              📐 Minimum Bit-Width Sizing Formulas
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-indigo-300">
              ⏳ Unix Year 2038 Timestamp Rollover
            </span>
            <span className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-amber-300">
              🚀 Ariane 5 Spaceflight 501 Overflow
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
                Classroom Lecture: The Mathematics of Dynamic Range &amp; Bit Sizing
              </h2>
              <p className="text-xs text-slate-400">
                Sukanta Hui · Coder &amp; AccoTax · Shibtala Road, Barrackpore
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
            <p>
              In digital hardware engineering, memory is finite. When you design an ASIC, write embedded firmware, or declare variables in high-performance C/C++, you must allocate exactly the right number of bits (<code className="text-teal-300 font-mono">n</code>) to represent your data without wasting memory or causing catastrophic arithmetic overflow!
            </p>
            <p>
              Every additional bit you grant to a register <strong>doubles its representable state space</strong> (<code className="text-cyan-300 font-mono">2ⁿ</code>).
            </p>
            <p>
              Notice the fundamental mathematical differences between systems:
              <br />
              • <strong>Unsigned:</strong> Spans <code className="text-teal-300 font-mono">[0 to 2ⁿ - 1]</code>. All <code className="text-teal-300 font-mono">2ⁿ</code> states are dedicated to positive numbers.
              <br />
              • <strong>Sign-Magnitude &amp; 1's Comp:</strong> Symmetrical ranges <code className="text-amber-300 font-mono">[-(2ⁿ⁻¹ - 1) to +(2ⁿ⁻¹ - 1)]</code>, but waste one state on duplicate zeros (+0 and -0).
              <br />
              • <strong>2's Complement:</strong> Asymmetrical range <code className="text-emerald-400 font-mono">[-2ⁿ⁻¹ to +(2ⁿ⁻¹ - 1)]</code>. It provides a unique zero and grants exactly one extra negative number (<code className="text-red-400 font-mono">-2ⁿ⁻¹</code>), maximizing silicon efficiency!
            </p>
          </div>

          {/* Master Range Table */}
          <div className="mt-8 overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/80 p-4">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-900 text-teal-300 border-b border-slate-800">
                <tr>
                  <th className="p-2.5">Encoding System</th>
                  <th className="p-2.5">General n-bit Range</th>
                  <th className="p-2.5">8-Bit Range</th>
                  <th className="p-2.5">16-Bit Range</th>
                  <th className="p-2.5">32-Bit Range</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr className="hover:bg-slate-900/50">
                  <td className="p-2.5 font-bold text-teal-400 font-sans">Unsigned Binary</td>
                  <td className="p-2.5">[0 to 2ⁿ - 1]</td>
                  <td className="p-2.5 text-white">0 to 255</td>
                  <td className="p-2.5 text-white">0 to 65,535</td>
                  <td className="p-2.5 text-white">0 to ~4.29 Billion</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-2.5 font-bold text-cyan-400 font-sans">2's Complement</td>
                  <td className="p-2.5">[-2ⁿ⁻¹ to +2ⁿ⁻¹ - 1]</td>
                  <td className="p-2.5 text-emerald-300">-128 to +127</td>
                  <td className="p-2.5 text-emerald-300">-32,768 to +32,767</td>
                  <td className="p-2.5 text-emerald-300">-2.14B to +2.14B</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-2.5 font-bold text-amber-400 font-sans">Sign-Magnitude</td>
                  <td className="p-2.5">[-(2ⁿ⁻¹-1) to +(2ⁿ⁻¹-1)]</td>
                  <td className="p-2.5">-127 to +127</td>
                  <td className="p-2.5">-32,767 to +32,767</td>
                  <td className="p-2.5">±2,147,483,647</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-2.5 font-bold text-amber-400 font-sans">1's Complement</td>
                  <td className="p-2.5">[-(2ⁿ⁻¹-1) to +(2ⁿ⁻¹-1)]</td>
                  <td className="p-2.5">-127 to +127</td>
                  <td className="p-2.5">-32,767 to +32,767</td>
                  <td className="p-2.5">±2,147,483,647</td>
                </tr>
              </tbody>
            </table>
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
                Interactive vector schematics detailing dynamic range spectra, the Unix 2038 rollover, and bit capacity curves.
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
                1. 8-Bit Spectrum Comparison
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
                2. Year 2038 Unix Bug
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
                3. Exponential Growth (2ⁿ)
              </button>
            </div>
          </div>

          {/* Tab 1: Spectrum Comparison */}
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
                    8-Bit Range Spectrum &amp; Symmetry Comparison across Encodings
                  </text>

                  {/* 1. Unsigned */}
                  <text x="40" y="85" fill="#38bdf8" fontSize="11" fontWeight="bold">1. UNSIGNED [0 to +255]</text>
                  <rect x="40" y="95" width="720" height="30" rx="6" fill="#042f2e" stroke="#0d9488" />
                  <text x="50" y="115" fill="#99f6e4" fontSize="11" fontWeight="bold">0</text>
                  <text x="400" y="115" fill="#5eead4" fontSize="11" fontWeight="bold" textAnchor="middle">128</text>
                  <text x="750" y="115" fill="#99f6e4" fontSize="11" fontWeight="bold" textAnchor="end">255</text>

                  {/* 2. 2's Complement */}
                  <text x="40" y="150" fill="#10b981" fontSize="11" fontWeight="bold">2. 2'S COMPLEMENT [-128 to +127] (Asymmetric Unique Zero)</text>
                  <g transform="translate(40, 160)">
                    <rect x="0" y="0" width="365" height="30" rx="6" fill="#450a0a" stroke="#dc2626" />
                    <text x="10" y="20" fill="#fca5a5" fontSize="11" fontWeight="bold">-128</text>
                    <text x="355" y="20" fill="#fca5a5" fontSize="11" fontWeight="bold" textAnchor="end">-1</text>
                    <rect x="365" y="0" width="355" height="30" rx="6" fill="#064e3b" stroke="#059669" />
                    <text x="375" y="20" fill="#6ee7b7" fontSize="11" fontWeight="bold">0</text>
                    <text x="710" y="20" fill="#6ee7b7" fontSize="11" fontWeight="bold" textAnchor="end">+127</text>
                  </g>

                  {/* 3. Sign-Magnitude & 1's Complement */}
                  <text x="40" y="215" fill="#f59e0b" fontSize="11" fontWeight="bold">3. SIGN-MAGNITUDE &amp; 1'S COMPLEMENT [-127 to +127] (Symmetric Dual Zero)</text>
                  <g transform="translate(40, 225)">
                    <rect x="0" y="0" width="350" height="30" rx="6" fill="#78350f" stroke="#d97706" />
                    <text x="10" y="20" fill="#fde68a" fontSize="11" fontWeight="bold">-127</text>
                    <text x="340" y="20" fill="#fde68a" fontSize="11" fontWeight="bold" textAnchor="end">-0</text>
                    <rect x="370" y="0" width="350" height="30" rx="6" fill="#064e3b" stroke="#059669" />
                    <text x="380" y="20" fill="#6ee7b7" fontSize="11" fontWeight="bold">+0</text>
                    <text x="710" y="20" fill="#6ee7b7" fontSize="11" fontWeight="bold" textAnchor="end">+127</text>
                  </g>

                  {/* Summary Bar */}
                  <rect x="40" y="280" width="720" height="60" rx="6" fill="#0f172a" stroke="#334155" />
                  <text x="60" y="305" fill="#cbd5e1" fontSize="11">
                    • 2's Complement covers -128 without wasting a slot on -0.
                  </text>
                  <text x="60" y="325" fill="#cbd5e1" fontSize="11">
                    • Sign-Magnitude &amp; 1's Comp have dual zeros (+0 and -0), leaving only 255 unique values.
                  </text>
                </svg>
              </div>
              <p className="text-xs text-slate-400">
                💡 <strong>Dynamic Range Insight:</strong> Look at the middle: 2's complement merges +0 and -0 into a single unique zero, granting that extra saved bit state to <code className="text-red-400">-128</code>!
              </p>
            </div>
          )}

          {/* Tab 2: Year 2038 Bug */}
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
                    The Year 2038 Problem (Y2K38): 32-Bit Signed Unix Timestamp Overflow
                  </text>

                  {/* 1. Max Value Before Crash */}
                  <rect x="40" y="75" width="720" height="95" rx="8" fill="#064e3b" stroke="#059669" strokeWidth="1.5" />
                  <text x="60" y="105" fill="#6ee7b7" fontSize="13" fontWeight="bold">
                    1. PEAK TIME: 2038-01-19 03:14:07 UTC (Maximum Signed 32-Bit Value)
                  </text>
                  <text x="60" y="130" fill="#ffffff" fontSize="14" fontFamily="monospace">
                    Binary: <tspan fill="#6ee7b7">0</tspan>111 1111 1111 1111 1111 1111 1111 1111  (0x7FFFFFFF)
                  </text>
                  <text x="60" y="152" fill="#a7f3d0" fontSize="12">
                    Decimal: +2,147,483,647 seconds elapsed since 1970-01-01 Epoch
                  </text>

                  {/* 2. Overflown State */}
                  <rect x="40" y="185" width="720" height="95" rx="8" fill="#450a0a" stroke="#dc2626" strokeWidth="1.5" />
                  <text x="60" y="215" fill="#fca5a5" fontSize="13" fontWeight="bold">
                    2. OVERFLOW CRASH: 2038-01-19 03:14:08 UTC (+1 Second Later)
                  </text>
                  <text x="60" y="240" fill="#ffffff" fontSize="14" fontFamily="monospace">
                    Binary: <tspan fill="#ef4444" fontWeight="bold">1</tspan>000 0000 0000 0000 0000 0000 0000 0000  (0x80000000)
                  </text>
                  <text x="60" y="262" fill="#fecaca" fontSize="12">
                    Decimal: -2,147,483,648 seconds → Time wraps back to 1901-12-13 20:45:52 UTC!
                  </text>

                  {/* Fix Solution */}
                  <rect x="40" y="295" width="720" height="45" rx="6" fill="#1e1b4b" stroke="#6366f1" />
                  <text x="400" y="323" fill="#c7d2fe" fontSize="12" fontWeight="bold" textAnchor="middle">
                    Permanent Solution: Upgrade to 64-bit signed timestamps (good for 292 Billion years into the future!)
                  </text>
                </svg>
              </div>
              <p className="text-xs text-slate-400">
                ⏳ <strong>Real Engineering Risk:</strong> Any 32-bit embedded system, flight controller, or IoT device still in service on January 19, 2038 will suffer clock wraparound unless patched with 64-bit <code className="text-teal-300">time_t</code>!
              </p>
            </div>
          )}

          {/* Tab 3: Exponential Growth */}
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
                    Exponential Bit Capacity Growth: Power of 2 Scaling (2ⁿ)
                  </text>

                  {/* Bars for Bit Widths */}
                  {[
                    { label: "8-bit", val: "256 states", width: 60, fill: "#0d9488", color: "#5eead4" },
                    { label: "16-bit", val: "65,536 states", width: 140, fill: "#0891b2", color: "#67e8f9" },
                    { label: "32-bit", val: "4.29 Billion states", width: 340, fill: "#4f46e5", color: "#a5b4fc" },
                    { label: "64-bit", val: "18.44 Quintillion states", width: 680, fill: "#059669", color: "#6ee7b7" }
                  ].map((bar, idx) => (
                    <g key={idx} transform={`translate(60, ${75 + idx * 60})`}>
                      <text x="0" y="20" fill="#cbd5e1" fontSize="12" fontWeight="bold">
                        {bar.label}
                      </text>
                      <rect x="80" y="5" width={bar.width} height="30" rx="6" fill={bar.fill} />
                      <text x={90 + bar.width} y="25" fill={bar.color} fontSize="12" fontWeight="bold" fontFamily="monospace">
                        {bar.val}
                      </text>
                    </g>
                  ))}

                  {/* Takeaway */}
                  <rect x="60" y="310" width="680" height="35" rx="6" fill="#0f172a" stroke="#334155" />
                  <text x="400" y="332" fill="#cbd5e1" fontSize="11" textAnchor="middle">
                    Rule: Adding 1 bit doubles states · Adding 8 bits multiplies capacity by 256 · Adding 32 bits multiplies capacity by 4.29 Billion!
                  </text>
                </svg>
              </div>
              <p className="text-xs text-slate-400">
                📈 <strong>Scaling Rule:</strong> Dynamic range grows exponentially with bit-width. That is why 64-bit CPUs can address entire exabytes of RAM with a single flat pointer.
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
                Bit-Width Sizing &amp; Dynamic Range Calculator
              </h2>
              <p className="text-xs text-slate-400">
                Explore any register width (1 to 64 bits) or calculate the minimum bit-width required to store any target decimal number.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Dynamic Range Inspector */}
            <div className="space-y-4">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                Select Register Bit-Width (n): <span className="text-teal-400 font-bold font-mono text-base">{selectedBits} Bits</span>
              </label>

              <input
                type="range"
                min="1"
                max="64"
                value={selectedBits}
                onChange={(e) => setSelectedBits(parseInt(e.target.value, 10))}
                className="w-full accent-teal-500"
              />

              <div className="flex flex-wrap gap-2">
                {[4, 8, 12, 16, 24, 32, 48, 64].map((b) => (
                  <button
                    key={b}
                    onClick={() => setSelectedBits(b)}
                    className={clsx(
                      "px-2.5 py-1 rounded text-xs font-semibold font-mono transition-colors",
                      selectedBits === b ? "bg-teal-500 text-slate-950" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    )}
                  >
                    {b}-bit
                  </button>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs font-mono">
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400 font-sans">Total Binary States (2ⁿ):</span>
                  <span className="text-white font-bold">{bitStats.totalStates}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400 font-sans">Unsigned Range [0 to 2ⁿ-1]:</span>
                  <span className="text-teal-300">{bitStats.uMin} to {bitStats.uMax}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-slate-400 font-sans">2's Complement Range:</span>
                  <span className="text-emerald-400 font-bold">{bitStats.twosMin} to {bitStats.twosMax}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-sans">Sign-Mag / 1's Comp Range:</span>
                  <span className="text-amber-400">{bitStats.symMin} to {bitStats.symMax}</span>
                </div>
              </div>
            </div>

            {/* Right: Minimum Bit-Width Sizing Engine */}
            <div className="space-y-4">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                Minimum Bit-Width Sizing Engine:
              </label>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={targetNumber}
                  onChange={(e) => setTargetNumber(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono text-sm focus:border-teal-500 focus:outline-none"
                  placeholder="e.g. 500 or -500"
                />
                <button
                  onClick={() => setTargetNumber("500")}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg text-slate-300"
                >
                  +500
                </button>
                <button
                  onClick={() => setTargetNumber("-512")}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg text-slate-300"
                >
                  -512
                </button>
                <button
                  onClick={() => setTargetNumber("2147483648")}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg text-slate-300"
                >
                  2.14B
                </button>
              </div>

              {sizingResult.isError ? (
                <div className="p-3 rounded-lg bg-red-950/60 border border-red-700/50 text-red-300 text-xs">
                  {sizingResult.error}
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-slate-950 border border-teal-500/40 space-y-3 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-sans">Target Decimal Value:</span>
                    <span className="text-white font-bold">{sizingResult.d}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-800 pt-1.5">
                    <span className="text-slate-400 font-sans">Unsigned Storage:</span>
                    <span className="text-cyan-300">{sizingResult.uBits}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-800 pt-1.5">
                    <span className="text-slate-400 font-sans">Signed 2's Comp Storage:</span>
                    <span className="text-emerald-400 font-bold">{sizingResult.signedRange}</span>
                  </div>
                  <div className="flex justify-between items-center border-t border-teal-500/50 pt-2 text-sm font-sans font-semibold">
                    <span className="text-slate-300">Recommended C Data Type:</span>
                    <span className="text-teal-300 font-mono font-bold text-xs">
                      {sizingResult.container}
                    </span>
                  </div>
                </div>
              )}
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
              Where bit-width calculations and range boundary sizing prevent crashes and save bandwidth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Scenario 1: Mamata */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-teal-500/40 transition-all">
              <div className="flex items-center gap-2 text-teal-400 font-semibold text-sm mb-2">
                <span>📍</span>
                <span>Barrackpore: Satellite Telemetry Bitfield Packing</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Mamata</strong> designs aerospace communication payloads in Barrackpore. To transmit orbital altitude (<code className="text-teal-300 font-mono">0 to 12,000 meters</code>), she calculates <code className="text-teal-300 font-mono">ceil(log2(12001)) = 14 bits</code>. By packing telemetry into a custom 14-bit struct field instead of a 32-bit integer, she cuts satellite transmitter RF power by 55%.
              </p>
            </div>

            {/* Scenario 2: Susmita */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 transition-all">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm mb-2">
                <span>📍</span>
                <span>Ichapur: Industrial Factory PLC Y2K38 Modernization</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Susmita</strong> audits factory automation controllers at Ichapur. She replaces legacy 32-bit signed timestamps with 64-bit <code className="text-cyan-300 font-mono">int64_t</code>, guaranteeing that automated heavy machinery will operate flawlessly through and beyond the January 19, 2038 rollover milestone.
              </p>
            </div>

            {/* Scenario 3: Debangshu */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all">
              <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm mb-2">
                <span>📍</span>
                <span>Jadavpur: Custom 256-Bit Elliptic Curve Cryptography (ECC) Core</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Debangshu</strong> is synthesizing a hardware security accelerator in Jadavpur. Standard 64-bit registers cannot represent 256-bit prime modulus curves (<code className="text-indigo-300 font-mono">2²⁵⁶ - 2²²⁴ + 2¹⁹² + 2⁹⁶ - 1</code>). He designs a dedicated 256-bit wide ALU datapath capable of processing 78-digit cryptographic keys in single-cycle operations.
              </p>
            </div>

            {/* Scenario 4: Mahima */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/40 transition-all">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm mb-2">
                <span>📍</span>
                <span>Kolkata: Multi-Trillion Rupee (₹) Financial Ledger Safety</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Mahima</strong> architects central settlement ledgers in Salt Lake, Kolkata. Storing transactions in 32-bit signed integers would overflow at ₹21.47 Crores (214.7M paise). By mandating 64-bit signed integers (<code className="text-amber-300 font-mono">int64_t</code>), the ledger supports account balances up to ₹92,233,720,368 Crores with zero overflow risk.
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
                <span><strong>The Signed Sizing Off-by-One Trap:</strong> Storing +256 in signed 2's complement requires 10 bits (not 9 bits), because 9 bits only reaches +255!</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">•</span>
                <span><strong>Assuming 32-bit Timestamps are Safe:</strong> Forgetting that 32-bit signed <code className="text-red-300 font-mono">time_t</code> overflows in January 2038.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">•</span>
                <span><strong>Unchecked Downcasting (Ariane 5 Disaster):</strong> Casting a larger bit-width or float into a smaller signed integer without boundary checks.</span>
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
                <span><strong>Use &lt;stdint.h&gt; Fixed-Width Types:</strong> Write <code className="text-teal-300 font-mono">int32_t</code> or <code className="text-teal-300 font-mono">int64_t</code> instead of ambiguous platform-dependent types like <code className="text-teal-300 font-mono">long</code>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">•</span>
                <span><strong>Apply Ceil-Log2 Formula:</strong> Calculate exact bit requirements for custom network packets and FPGA bitfields using <code className="text-teal-300 font-mono">n = ceil(log2(MAX + 1))</code>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-400 font-bold">•</span>
                <span><strong>Default to 64-bit for Counters:</strong> Use 64-bit integers for event counters, timestamps, file offsets, and financial quantities.</span>
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
              <span>Unsigned Range: [0 to 2ⁿ - 1] (2ⁿ states)</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
              <span className="text-teal-400 font-bold">✓</span>
              <span>2's Comp Range: [-2ⁿ⁻¹ to +2ⁿ⁻¹ - 1] (2ⁿ states)</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
              <span className="text-teal-400 font-bold">✓</span>
              <span>Sign-Mag / 1's Comp: [-(2ⁿ⁻¹-1) to +(2ⁿ⁻¹-1)]</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
              <span className="text-teal-400 font-bold">✓</span>
              <span>Every bit added doubles the state space (2ⁿ)</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
              <span className="text-teal-400 font-bold">✓</span>
              <span>Sizing formula: n = ceil(log2(D + 1))</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center gap-2">
              <span className="text-teal-400 font-bold">✓</span>
              <span>Year 2038 rollover fixed by 64-bit time_t</span>
            </div>
          </div>
        </section>

        {/* ─── 8. FAQ Section ─────────────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <FAQTemplate
            title="Range of Numbers in N-Bit Signed Systems FAQs"
            questions={questions}
          />
        </section>

        {/* ─── 9. Teacher's Note ──────────────────────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-16">
          <Teacher
            note={
              "Memorize your powers of 2 up to 2^16 (2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768, 65536). In exam problems and technical interviews, you will frequently be asked: 'What is the minimum bit width to store +500 in signed 2's complement?' Immediately think: 2^8-1=255 (too small), 2^9-1=511 (fits!), so 10 bits (9 magnitude + 1 sign) are required!"
            }
          />
        </section>

        {/* ─── 10. Printable Plain Text Document ──────────────── */}
        <section ref={addRef} className="reveal-section max-w-5xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            title="Topic 8: Range of Numbers in N-Bit Signed Systems"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note"
            downloadFileName="topic8_range_of_numbers_n_bit_systems_note.txt"
          />
        </section>

      </div>
    </>
  );
};

export default Topic8;
