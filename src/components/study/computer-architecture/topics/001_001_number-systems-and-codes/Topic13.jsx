import React, { useState } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic13_files/topic13_note.txt?raw";
import questions from "./topic13_files/topic13_questions";

export default function Topic13() {
  const [activeTab, setActiveTab] = useState("unified");
  
  // Interactive Workbench State
  const [testVal, setTestVal] = useState(-25);
  const [opA, setOpA] = useState(45);
  const [opB, setOpB] = useState(25);
  const [isSubtract, setIsSubtract] = useState(true);

  // Conversions for comparative workbench
  const getRepresentations = (v) => {
    const val = Math.max(-128, Math.min(127, v));
    const isNeg = val < 0;
    const absVal = Math.abs(val);

    // 1. Sign-Magnitude (8-bit)
    let signMag = "Out of range";
    if (absVal <= 127) {
      const signBit = isNeg ? "1" : "0";
      const magBits = absVal.toString(2).padStart(7, "0");
      signMag = `${signBit} ${magBits}`;
    }

    // 2. 1's Complement (8-bit)
    let onesComp = "Out of range";
    if (absVal <= 127) {
      if (!isNeg) {
        onesComp = val.toString(2).padStart(8, "0");
      } else {
        const posBin = absVal.toString(2).padStart(8, "0");
        onesComp = posBin.split("").map((b) => (b === "0" ? "1" : "0")).join("");
      }
    }

    // 3. 2's Complement (8-bit)
    let twosCompInt = val < 0 ? 256 + val : val;
    let twosComp = (twosCompInt & 0xff).toString(2).padStart(8, "0");

    // 4. Excess-128 (Biased)
    let excess128Int = val + 128;
    let excess128 = (excess128Int & 0xff).toString(2).padStart(8, "0");

    return { val, signMag, onesComp, twosComp, excess128 };
  };

  // ALU Adder/Subtractor Simulation
  const computeAlu = () => {
    const aVal = Math.max(-128, Math.min(127, opA));
    const bVal = Math.max(-128, Math.min(127, opB));
    
    const aBin = ((aVal < 0 ? 256 + aVal : aVal) & 0xff).toString(2).padStart(8, "0");
    const bRawBin = ((bVal < 0 ? 256 + bVal : bVal) & 0xff).toString(2).padStart(8, "0");
    
    // B XOR Sub
    const bXorBin = bRawBin.split("").map(bit => isSubtract ? (bit === "0" ? "1" : "0") : bit).join("");
    const cin = isSubtract ? 1 : 0;

    // Simulate bit by bit addition
    let carry = cin;
    let sumBits = [];
    let carryArray = [cin];

    for (let i = 7; i >= 0; i--) {
      const bitA = parseInt(aBin[i], 10);
      const bitB = parseInt(bXorBin[i], 10);
      const sumBit = bitA ^ bitB ^ carry;
      carry = (bitA & bitB) | (carry & (bitA ^ bitB));
      sumBits.unshift(sumBit);
      carryArray.unshift(carry);
    }

    const sumBin = sumBits.join("");
    const rawSumInt = parseInt(sumBin, 2);
    const signedSum = rawSumInt >= 128 ? rawSumInt - 256 : rawSumInt;
    const cout = carryArray[0];
    const cinMsb = carryArray[1];
    
    // Flags
    const zFlag = rawSumInt === 0 ? 1 : 0;
    const nFlag = sumBits[0];
    const cFlag = cout;
    const vFlag = cinMsb ^ cout;

    return {
      aVal,
      bVal,
      aBin,
      bRawBin,
      bXorBin,
      cin,
      sumBin,
      signedSum,
      cout,
      cinMsb,
      zFlag,
      nFlag,
      cFlag,
      vFlag,
      expected: isSubtract ? aVal - bVal : aVal + bVal
    };
  };

  const compData = getRepresentations(testVal);
  const alu = computeAlu();

  return (
    <div className="dark min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-teal-500/30 selection:text-teal-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        
        {/* Header */}
        <header className="space-y-4 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 bg-teal-500/10 text-teal-400 border border-teal-500/20 text-xs font-semibold uppercase tracking-wider rounded-full">
              Computer Architecture • Module 001.001 • Topic 13
            </span>
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold uppercase tracking-wider rounded-full">
              Silicon Optimization & Datapath Design
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Why 2’s Complement is Preferred in Computer Systems
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-4xl">
            Discover why 2's complement won the computing hardware revolution. Learn how a single unified adder handles both addition and subtraction with zero extra ALU stages, eliminates the duplicate zero logic hazard, and provides deterministic single-gate overflow detection.
          </p>
        </header>

        {/* 3-Tab Architectural Schematics Suite */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-teal-400">⚡</span> Architectural Hardware Schematics & Silicon Comparisons
              </h2>
              <p className="text-sm text-slate-400">
                Visualizing the unified adder/subtractor datapath, zero representation proofs, and gate propagation paths.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTab("unified")}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                  activeTab === "unified"
                    ? "bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                1. Unified ALU Adder/Subtractor
              </button>
              <button
                onClick={() => setActiveTab("zero")}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                  activeTab === "zero"
                    ? "bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                2. The "Dual Zero" Hardware Trap
              </button>
              <button
                onClick={() => setActiveTab("latency")}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                  activeTab === "latency"
                    ? "bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                3. End-Around Carry vs 2's Comp
              </button>
            </div>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center">
            {activeTab === "unified" && (
              <svg viewBox="0 0 850 360" className="w-full max-w-4xl h-auto">
                <defs>
                  <marker id="arrowhead" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
                    <polygon points="0 0, 7 3.5, 0 7" fill="#38bdf8" />
                  </marker>
                </defs>
                <text x="425" y="28" textAnchor="middle" fill="#f8fafc" fontSize="16" fontWeight="bold">
                  Unified N-Bit Binary Adder / Subtractor (Single Circuit Architecture)
                </text>

                {/* Operand A */}
                <g transform="translate(60, 60)">
                  <rect width="140" height="45" rx="6" fill="#1e293b" stroke="#0ea5e9" strokeWidth="1.5" />
                  <text x="70" y="28" textAnchor="middle" fill="#38bdf8" fontSize="13" fontWeight="bold">Operand A (a₇..a₀)</text>
                </g>

                {/* Operand B & XOR block */}
                <g transform="translate(240, 60)">
                  <rect width="140" height="45" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="70" y="28" textAnchor="middle" fill="#fbbf24" fontSize="13" fontWeight="bold">Operand B (b₇..b₀)</text>
                </g>

                {/* SUB Control Line */}
                <g transform="translate(430, 45)">
                  <rect width="170" height="35" rx="6" fill="#0f172a" stroke="#ec4899" strokeWidth="2" />
                  <text x="85" y="22" textAnchor="middle" fill="#f472b6" fontSize="12" fontWeight="bold">SUB Control (0=ADD, 1=SUB)</text>
                </g>

                {/* 8x XOR Gates */}
                <g transform="translate(240, 130)">
                  <rect width="140" height="50" rx="8" fill="#1e293b" stroke="#ec4899" strokeWidth="1.5" />
                  <text x="70" y="25" textAnchor="middle" fill="#f472b6" fontSize="12" fontWeight="bold">8 × XOR Gates</text>
                  <text x="70" y="42" textAnchor="middle" fill="#cbd5e1" fontSize="10">bᵢ ⊕ SUB</text>
                </g>

                {/* Lines to XOR */}
                <line x1="310" y1="105" x2="310" y2="130" stroke="#fbbf24" strokeWidth="2" markerEnd="url(#arrowhead)" />
                <line x1="515" y1="80" x2="515" y2="155" stroke="#ec4899" strokeWidth="2" />
                <line x1="515" y1="155" x2="380" y2="155" stroke="#ec4899" strokeWidth="2" markerEnd="url(#arrowhead)" />

                {/* Carry-In Injection */}
                <line x1="515" y1="155" x2="515" y2="225" stroke="#ec4899" strokeWidth="2" />
                <line x1="515" y1="225" x2="440" y2="225" stroke="#ec4899" strokeWidth="2" markerEnd="url(#arrowhead)" />
                <text x="490" y="215" fill="#f472b6" fontSize="11" fontWeight="bold">C₀ = SUB</text>

                {/* 8-Bit Parallel Full Adder */}
                <g transform="translate(60, 200)">
                  <rect width="380" height="70" rx="10" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                  <text x="190" y="32" textAnchor="middle" fill="#a7f3d0" fontSize="15" fontWeight="bold">
                    8-Bit Parallel Binary Full Adder
                  </text>
                  <text x="190" y="55" textAnchor="middle" fill="#d1fae5" fontSize="11">
                    Computes: A + (B ⊕ SUB) + C₀ (One unified datapath)
                  </text>
                </g>

                {/* Lines into Adder */}
                <line x1="130" y1="105" x2="130" y2="200" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrowhead)" />
                <line x1="310" y1="180" x2="310" y2="200" stroke="#f472b6" strokeWidth="2" markerEnd="url(#arrowhead)" />

                {/* Results & Flags */}
                <g transform="translate(60, 290)">
                  <rect width="250" height="45" rx="6" fill="#0f172a" stroke="#14b8a6" strokeWidth="1.5" />
                  <text x="125" y="28" textAnchor="middle" fill="#2dd4bf" fontSize="13" fontWeight="bold">Sum Output (S₇..S₀)</text>
                </g>
                <line x1="185" y1="270" x2="185" y2="290" stroke="#14b8a6" strokeWidth="2" markerEnd="url(#arrowhead)" />

                <g transform="translate(340, 290)">
                  <rect width="450" height="45" rx="6" fill="#0f172a" stroke="#8b5cf6" strokeWidth="1.5" />
                  <text x="225" y="28" textAnchor="middle" fill="#c084fc" fontSize="12" fontWeight="bold">
                    Direct Status Flags: Z = ~(|S), N = S₇, C = C₈, V = C₈ ⊕ C₇
                  </text>
                </g>
                <line x1="380" y1="270" x2="380" y2="290" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrowhead)" />
              </svg>
            )}

            {activeTab === "zero" && (
              <svg viewBox="0 0 850 360" className="w-full max-w-4xl h-auto">
                <text x="425" y="28" textAnchor="middle" fill="#f8fafc" fontSize="16" fontWeight="bold">
                  The Zero Representation Comparison: Eliminating Redundant Code Points
                </text>

                {/* Sign-Magnitude */}
                <g transform="translate(50, 60)">
                  <rect width="220" height="250" rx="10" fill="#0f172a" stroke="#ef4444" strokeWidth="1.5" />
                  <text x="110" y="30" textAnchor="middle" fill="#f87171" fontSize="13" fontWeight="bold">Sign-Magnitude</text>
                  <rect x="20" y="55" width="180" height="40" rx="6" fill="#1e293b" />
                  <text x="110" y="80" textAnchor="middle" fill="#38bdf8" fontSize="12" fontFamily="monospace">+0: 0000 0000</text>
                  <rect x="20" y="105" width="180" height="40" rx="6" fill="#1e293b" />
                  <text x="110" y="130" textAnchor="middle" fill="#f87171" fontSize="12" fontFamily="monospace">-0: 1000 0000</text>
                  <text x="110" y="170" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="bold">❌ Dual Zero Hazard</text>
                  <text x="110" y="195" textAnchor="middle" fill="#94a3b8" fontSize="10">255 unique values</text>
                  <text x="110" y="215" textAnchor="middle" fill="#94a3b8" fontSize="10">Wastes 1 bit pattern</text>
                  <text x="110" y="235" textAnchor="middle" fill="#ef4444" fontSize="10">Requires 2 zero checks</text>
                </g>

                {/* 1's Complement */}
                <g transform="translate(315, 60)">
                  <rect width="220" height="250" rx="10" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="110" y="30" textAnchor="middle" fill="#fbbf24" fontSize="13" fontWeight="bold">1's Complement</text>
                  <rect x="20" y="55" width="180" height="40" rx="6" fill="#1e293b" />
                  <text x="110" y="80" textAnchor="middle" fill="#38bdf8" fontSize="12" fontFamily="monospace">+0: 0000 0000</text>
                  <rect x="20" y="105" width="180" height="40" rx="6" fill="#1e293b" />
                  <text x="110" y="130" textAnchor="middle" fill="#fbbf24" fontSize="12" fontFamily="monospace">-0: 1111 1111</text>
                  <text x="110" y="170" textAnchor="middle" fill="#fde68a" fontSize="11" fontWeight="bold">❌ Dual Zero Hazard</text>
                  <text x="110" y="195" textAnchor="middle" fill="#94a3b8" fontSize="10">255 unique values</text>
                  <text x="110" y="215" textAnchor="middle" fill="#94a3b8" fontSize="10">Requires end-around carry</text>
                  <text x="110" y="235" textAnchor="middle" fill="#f59e0b" fontSize="10">Extra gate latency</text>
                </g>

                {/* 2's Complement */}
                <g transform="translate(580, 60)">
                  <rect width="220" height="250" rx="10" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                  <text x="110" y="30" textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="bold">2's Complement (Optimal)</text>
                  <rect x="20" y="55" width="180" height="40" rx="6" fill="#022c22" stroke="#059669" />
                  <text x="110" y="80" textAnchor="middle" fill="#86efac" fontSize="12" fontFamily="monospace">0: 0000 0000</text>
                  <rect x="20" y="105" width="180" height="40" rx="6" fill="#022c22" stroke="#059669" />
                  <text x="110" y="130" textAnchor="middle" fill="#a7f3d0" fontSize="12" fontFamily="monospace">-128: 1000 0000</text>
                  <text x="110" y="170" textAnchor="middle" fill="#86efac" fontSize="11" fontWeight="bold">✅ Single Unique Zero!</text>
                  <text x="110" y="195" textAnchor="middle" fill="#d1fae5" fontSize="10">Full 256 unique values</text>
                  <text x="110" y="215" textAnchor="middle" fill="#d1fae5" fontSize="10">Gains extra negative (-128)</text>
                  <text x="110" y="235" textAnchor="middle" fill="#34d399" fontSize="10">Zero test is simple NOR</text>
                </g>

                <text x="425" y="335" textAnchor="middle" fill="#94a3b8" fontSize="12">
                  Negating 00000000 in 2's Comp: ~00000000 + 1 = 11111111 + 1 = [1] 00000000 (Trunked back to 00000000!)
                </text>
              </svg>
            )}

            {activeTab === "latency" && (
              <svg viewBox="0 0 850 360" className="w-full max-w-4xl h-auto">
                <text x="425" y="28" textAnchor="middle" fill="#f8fafc" fontSize="16" fontWeight="bold">
                  Arithmetic Datapath Latency: 1's Complement vs 2's Complement
                </text>

                {/* 1's Complement 2-Pass Flow */}
                <g transform="translate(60, 60)">
                  <rect width="340" height="240" rx="10" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="170" y="30" textAnchor="middle" fill="#fbbf24" fontSize="13" fontWeight="bold">1's Comp: End-Around Carry (2 Passes)</text>
                  
                  <rect x="30" y="55" width="280" height="40" rx="6" fill="#1e293b" />
                  <text x="170" y="80" textAnchor="middle" fill="#cbd5e1" fontSize="12">Pass 1: A + B Addition (Delay T_add)</text>
                  
                  <line x1="170" y1="95" x2="170" y2="120" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  <text x="210" y="112" fill="#fbbf24" fontSize="11">C_out generated</text>

                  <rect x="30" y="125" width="280" height="50" rx="6" fill="#451a03" stroke="#b45309" />
                  <text x="170" y="148" textAnchor="middle" fill="#fed7aa" fontSize="12" fontWeight="bold">End-Around Carry Re-circulation:</text>
                  <text x="170" y="165" textAnchor="middle" fill="#fed7aa" fontSize="11">Pass 2: Partial Sum + C_out into LSB</text>

                  <rect x="30" y="190" width="280" height="30" rx="6" fill="#1e293b" />
                  <text x="170" y="210" textAnchor="middle" fill="#f87171" fontSize="12" fontWeight="bold">Total Latency ≈ 2 × T_add</text>
                </g>

                {/* 2's Complement 1-Pass Flow */}
                <g transform="translate(450, 60)">
                  <rect width="340" height="240" rx="10" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                  <text x="170" y="30" textAnchor="middle" fill="#34d399" fontSize="13" fontWeight="bold">2's Comp: Discard Carry (1 Pass Only)</text>
                  
                  <rect x="30" y="55" width="280" height="50" rx="6" fill="#022c22" stroke="#059669" />
                  <text x="170" y="78" textAnchor="middle" fill="#a7f3d0" fontSize="12" fontWeight="bold">Pass 1: A + (~B) + C₀=1</text>
                  <text x="170" y="95" textAnchor="middle" fill="#d1fae5" fontSize="11">Inversion & +1 happen in parallel</text>

                  <line x1="170" y1="105" x2="170" y2="135" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowhead)" />

                  <rect x="30" y="135" width="280" height="40" rx="6" fill="#022c22" stroke="#059669" />
                  <text x="170" y="160" textAnchor="middle" fill="#86efac" fontSize="12">Discard C_out (Modulo 2^n natural truncation)</text>

                  <rect x="30" y="190" width="280" height="30" rx="6" fill="#022c22" />
                  <text x="170" y="210" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">Total Latency = 1 × T_add (2x Faster!)</text>
                </g>

                <text x="425" y="335" textAnchor="middle" fill="#64748b" fontSize="12">
                  In modern 4 GHz superscalar processors, eliminating the second addition pass is non-negotiable for pipeline throughput.
                </text>
              </svg>
            )}
          </div>
        </section>

        {/* Live Interactive Head-to-Head Number System Workbench */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-indigo-400">🧪</span> Live Interactive Head-to-Head Number System Inspector
            </h2>
            <p className="text-sm text-slate-400">
              Type any integer between -128 and +127 to inspect how it translates across all 4 historical signed formats.
            </p>
          </div>

          {/* Value Slider & Input */}
          <div className="flex flex-wrap items-center gap-4 bg-slate-950/80 border border-slate-800 p-4 rounded-xl">
            <label className="text-xs font-bold uppercase tracking-wider text-teal-400">
              Test Decimal Integer:
            </label>
            <input
              type="number"
              min="-128"
              max="127"
              value={testVal}
              onChange={(e) => setTestVal(parseInt(e.target.value || "0", 10))}
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-base font-mono font-bold text-white w-28 focus:outline-none focus:border-teal-500"
            />
            <input
              type="range"
              min="-128"
              max="127"
              value={testVal}
              onChange={(e) => setTestVal(parseInt(e.target.value, 10))}
              className="flex-1 accent-teal-500 cursor-pointer min-w-[200px]"
            />
          </div>

          {/* 4 Cards Comparison */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-950 border border-rose-500/30 rounded-xl p-4 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400 block">1. Sign-Magnitude</span>
              <div className="text-lg font-mono font-bold text-white bg-slate-900 p-2 rounded text-center border border-slate-800">
                {compData.signMag}
              </div>
              <p className="text-[11px] text-slate-400">
                {compData.val < -127 ? "❌ Underflow! (-128 cannot be represented)" : "MSB is sign bit; lower 7 bits are absolute magnitude."}
              </p>
            </div>

            <div className="bg-slate-950 border border-amber-500/30 rounded-xl p-4 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">2. 1's Complement</span>
              <div className="text-lg font-mono font-bold text-white bg-slate-900 p-2 rounded text-center border border-slate-800">
                {compData.onesComp}
              </div>
              <p className="text-[11px] text-slate-400">
                {compData.val < -127 ? "❌ Underflow! (-128 cannot be represented)" : "Negative formed by bitwise NOT (~X). Requires end-around carry."}
              </p>
            </div>

            <div className="bg-slate-950 border border-teal-500/60 rounded-xl p-4 space-y-2 ring-1 ring-teal-500/40">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400">3. 2's Complement</span>
                <span className="text-[10px] bg-teal-500/20 text-teal-300 px-1.5 py-0.5 rounded font-bold">Standard</span>
              </div>
              <div className="text-lg font-mono font-bold text-teal-300 bg-slate-900 p-2 rounded text-center border border-teal-500/40">
                {compData.twosComp}
              </div>
              <p className="text-[11px] text-slate-400">
                ✅ Single zero (00000000), represents full [-128..+127] range cleanly.
              </p>
            </div>

            <div className="bg-slate-950 border border-indigo-500/30 rounded-xl p-4 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 block">4. Excess-128 (Biased)</span>
              <div className="text-lg font-mono font-bold text-white bg-slate-900 p-2 rounded text-center border border-slate-800">
                {compData.excess128}
              </div>
              <p className="text-[11px] text-slate-400">
                Value + 128 unsigned. Ideal for IEEE-754 exponent comparison.
              </p>
            </div>
          </div>

          {/* Interactive Unified Adder/Subtractor Simulation Box */}
          <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-5 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-3">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <span>⚙️</span> Interactive Hardware Unified ALU Adder/Subtractor Live Trace
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsSubtract(false)}
                  className={`px-3 py-1 rounded text-xs font-bold ${!isSubtract ? "bg-teal-500 text-slate-950" : "bg-slate-800 text-slate-400"}`}
                >
                  ADD Mode (SUB = 0)
                </button>
                <button
                  onClick={() => setIsSubtract(true)}
                  className={`px-3 py-1 rounded text-xs font-bold ${isSubtract ? "bg-pink-600 text-white" : "bg-slate-800 text-slate-400"}`}
                >
                  SUB Mode (SUB = 1)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Operand A (-128 to 127):</label>
                <input
                  type="number"
                  min="-128"
                  max="127"
                  value={opA}
                  onChange={(e) => setOpA(parseInt(e.target.value || "0", 10))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Operand B (-128 to 127):</label>
                <input
                  type="number"
                  min="-128"
                  max="127"
                  value={opB}
                  onChange={(e) => setOpB(parseInt(e.target.value || "0", 10))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono"
                />
              </div>
            </div>

            {/* Signal & Bit Level Trace */}
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 font-mono text-xs space-y-2">
              <div className="flex justify-between text-slate-400 border-b border-slate-800 pb-1">
                <span>Operation: {alu.aVal} {isSubtract ? "-" : "+"} ({alu.bVal})</span>
                <span className="text-teal-300 font-bold">Mathematical Expected: {alu.expected}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-slate-300">
                <div>
                  <p>A (8-bit binary): <span className="text-teal-300 font-bold">{alu.aBin}</span></p>
                  <p>B (raw binary):   <span className="text-amber-300">{alu.bRawBin}</span></p>
                  <p>B ⊕ SUB:          <span className="text-pink-300 font-bold">{alu.bXorBin}</span></p>
                  <p>Carry-In (C₀):    <span className="text-pink-400 font-bold">{alu.cin}</span></p>
                </div>
                <div>
                  <p>Sum Result (S₇..S₀): <span className="text-emerald-400 font-bold text-sm">{alu.sumBin}</span> ({alu.signedSum})</p>
                  <p>Carry-Out (C₈):      <span className="text-slate-300">{alu.cout}</span> (Discarded under modulo 256)</p>
                  <div className="flex gap-2 pt-2">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${alu.zFlag ? "bg-teal-900 text-teal-200 border border-teal-500" : "bg-slate-800 text-slate-500"}`}>Z={alu.zFlag}</span>
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${alu.nFlag ? "bg-blue-900 text-blue-200 border border-blue-500" : "bg-slate-800 text-slate-500"}`}>N={alu.nFlag}</span>
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${alu.cFlag ? "bg-amber-900 text-amber-200 border border-amber-500" : "bg-slate-800 text-slate-500"}`}>C={alu.cFlag}</span>
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${alu.vFlag ? "bg-rose-900 text-rose-200 border border-rose-500" : "bg-slate-800 text-slate-500"}`}>V={alu.vFlag}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Real-World Case Studies */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="p-1.5 bg-teal-500/10 text-teal-400 rounded-md">🎧</span>
              Case Study: Zero DC Drift in Barrackpore Audio DSP
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              When <strong>Mamata</strong> and <strong>Mahima</strong> engineered an audio DSP filter in <strong>Barrackpore</strong>, they evaluated why 1's complement caused audible low-frequency hum.
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Because 1's complement has both <code className="text-rose-400">+0</code> and <code className="text-rose-400">-0</code>, small negative audio signals oscillated between dual zeroes during silence. In <strong>2's complement</strong>, zero is strictly unique (<code className="text-teal-300">00000000</code>), guaranteeing zero DC offset bias and clean acoustic signal reconstruction.
            </p>
          </div>

          <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="p-1.5 bg-indigo-500/10 text-indigo-400 rounded-md">🔬</span>
              Case Study: 40% Silicon Area Reduction at Jadavpur FPGA Lab
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              At the <strong>Jadavpur University</strong> VLSI laboratory, researchers <strong>Debangshu</strong> and <strong>Susmita</strong> synthesized custom 32-bit RISC-V ALUs on FPGA hardware.
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Comparing a sign-magnitude datapath (requiring separate adders, subtractors, and magnitude comparator trees) against a unified <strong>2's complement adder</strong>, the 2's complement architecture cut look-up table (LUT) utilization by 43% and boosted the maximum clock speed from 115 MHz to 195 MHz.
            </p>
          </div>
        </section>

        {/* 30 Curated FAQs */}
        <FAQTemplate questions={questions} />

        {/* Printable Text Notes Component */}
        <PlainTextPrint rawNotes={noteText} />

        {/* Teacher Sukanta Hui Footer / Bio */}
        <Teacher />
      </div>
    </div>
  );
}
